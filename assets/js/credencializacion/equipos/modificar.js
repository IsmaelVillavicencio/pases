const id_equipo = localStorage.getItem("id_equipo");
var id_empresa = 0, id_persona_fisica = 0

class Modificar{
    constructor(){
        this.inicio()
        this.obtener_datos()
    }
    inicio(){
        adjuntarEquipo.addEventListener("change",this.previsualizar_equipo)
        btnSubirEquipo.addEventListener('click',(ev)=>{
            if(adjuntarEquipo.dataset.imagen != ""){
                $(pdfViewerEquipo).html('<img width="460" height="200" src="'+base_url+'/'+adjuntarEquipo.dataset.imagen+'"/>');
            }else if(adjuntarEquipo.value == ""){
                pdfViewerEquipo.innerHTML = ''
                erroradjuntarEquipo.innerHTML = ''
            }
            $(modalEquipo).modal()
        })

        btnGuardar.addEventListener("click",this.realizar_almacenamiento)
        confirmar_guardar.addEventListener("click",this.guardar)
    }
    obtener_datos(){
        $.ajax({
			url: base_url+'Credencializacion/Ctrl_Equipos/getById',
			type: 'GET',
			dataType: 'json',
            data : {
                idequipo : id_equipo
            },
			success: function(response){
                if(response.data != null){
                    tipoEquipo.dataset.id = response.data.id_tipo_equipo
                    tipoDocumento.dataset.id = response.data.id_tipo_documento

                    noSerieEquipo.value = response.data.numero_serie
                    modeloHerramienta.value = response.data.modelo
                    marcaHerramienta.value = response.data.marca
                    noFacturaEquipo.value = response.data.numero_factura

                    adjuntarEquipo.dataset.id = response.data.id_imagen_factura
                    adjuntarEquipo.dataset.imagen = response.data.factura_equipo
                }
			},
            complete: function(){
                Modificar.prototype.obtener_tipos_equipos()
                Modificar.prototype.obtener_tipos_documentos()
            }
		});
    }
    obtener_tipos_equipos(){
        $.ajax({
			url: base_url+'Catalogos/Ctrl_TiposEquipos/getByEstatus',
			type: 'GET',
            dataType: 'json',
            data : {
                estatus : 1
            },
            beforeSend: function(){
                $(tipoEquipo).html('');
                $(tipoEquipo).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(tipoEquipo).append('<option value="'+element.id+'" '+(tipoEquipo.dataset.id == element.id ? 'selected' : '')+'>'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {
			
		});
    }
    obtener_tipos_documentos(){
        $.ajax({
			url: base_url+'Catalogos/Ctrl_TiposDocumentos/getByEstatus',
			type: 'GET',
            dataType: 'json',
            data : {
                estatus : 1
            },
            beforeSend: function(){
                $(tipoDocumento).html('');
                $(tipoDocumento).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    if(element.id == 3 || element.id == 4){
                        $(tipoDocumento).append('<option value="'+element.id+'" '+(tipoDocumento.dataset.id == element.id ? 'selected' : '')+'>'+element.nombre+'</option>');
                    }
                });
			}
		}).fail( function(response) {
			
		});
    }
    previsualizar_equipo(){
        var fileReader = new FileReader();
        pdfViewerEquipo.innerHTML = ''
        erroradjuntarEquipo.innerHTML = ''

        var extencion = $(this)[0].files[0].name;
        if(extencion != ''){
            extencion = extencion.split(".");
            extencion = extencion[extencion.length-1];
        }

        var permitidos = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];
        if(!permitidos.includes($(this)[0].files[0].type) || extencion == 'jfif'){
            erroradjuntarEquipo.innerHTML = "El archivo a subir debe ser un documento en PDF o imagen PNG o JPG"
            return false;
        }

        if(($(this)[0].files[0].size/1000000) > 2){
            erroradjuntarEquipo.innerHTML = "El tamaño máximo permitido es de 2 MB"
            return false;
        }

        fileReader.onload = function() {
            var TheFileContents = fileReader.result;    
            $(pdfViewerEquipo).html('<img width="460" height="200" src="'+TheFileContents+'"/>');
            adjuntarEquipo.dataset.imagen = ""
        };
        fileReader.readAsDataURL($(this)[0].files[0]);
        
        btnAceptarAdjuntarEquipo.onclick = function() {
            if(fileReader != ""){
                $(errorSubirFacturaEquipo).html("")
            }
        }
    }
    realizar_almacenamiento(){
        let validacion = true;

        if(validacion){
            $("#modal_confirmar_guardar").modal()
        }
    }
    guardar(){
        let formData = new FormData();
        formData.append("idempresa",id_empresa)
        formData.append("idpersonafisica",id_persona_fisica)
        formData.append("idequipo",id_equipo)
        formData.append("tipoEquipo",tipoEquipo.value)
        formData.append("modelo",modeloHerramienta.value)
        formData.append("marca",marcaHerramienta.value)
        formData.append("noSerie",noSerieEquipo.value)
        formData.append("tipoDocumento",tipoDocumento.value)
        formData.append("noFactura",noFacturaEquipo.value)
        formData.append("idimagenfactura",(adjuntarEquipo.dataset.id != "") ? adjuntarEquipo.dataset.id : 0)
        formData.append("fotografiaFactura",(adjuntarEquipo.dataset.imagen == "") ? $("#adjuntarEquipo")[0].files[0] : '');
        //formData.append("fotografia",datosEquipos[index].fotografia);
        formData.append([csrf.name], csrf.value);

        $.ajax({
            url : base_url+'Credencializacion/Ctrl_Equipos/upEquipos',
            type : 'POST',
            data : formData,
            global: false,
            processData: false,
            contentType: false,
            beforeSend: function(){
                $("#modal_confirmar_guardar").modal("hide")
            },
            success : function(response) {
                csrf.value = response.token;
                if(response.status){
                    registro_exitoso(response.message);
                }else{
                    peticion_fallida(response.message);
                }
                spinner.style.visibility="hidden";
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                spinner.style.visibility="hidden";
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        }).fail(function(response){
            spinner.style.visibility="hidden";
            if(response.responseText=="Sesion"){
                error_sesion();
            }
        })
    }
}
const mod = new Modificar()