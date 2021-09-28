let DTDocumentos;
let datosDocumentos = [];
let errorDocumento = true;

class Documentos{
	constructor(){
        this.inicio();
        this.obtener_tipos();
        this.obtener_personas();
        this.obtener_areas();
	}
	inicio(){
		DTDocumentos = $(tabRegistroDocumentos).DataTable( {
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
			},
			"order": [[ 0, "asc" ]]
        });
        
        SelTipoDocumento.addEventListener('change',function(){
            if(SelTipoDocumento.value != ""){
                $(errorTipoDocumento).hide()
                $(errorDuplicado).hide()
                $(errorListaVacia).hide()
            }

            if(SelTipoDocumento.value == 1){
                $(divTiposPersonas).show();
            }else{
                $(SelTipoPersona).val(3);
                $(divTiposPersonas).hide();
            }
        })

        ckhVigencia.addEventListener('change',function(){
            if (ckhVigencia.checked == true){
                ckhVigencia.value = 1
              } else {
                ckhVigencia.value = 0
              } 
        })
        
        SelEtapa.addEventListener('change',function(){
            if(SelEtapa.value != ""){
                $(errorEtapa).hide()
            }
        })

        confirmar_salir_sin_guardar.addEventListener('click',(ev)=> {
            window.location.href = base_url + 'Catalogos/Ctrl_Documentos';
        });

        btnAñadir.addEventListener("click",this.agregar_documento)
        btnGuardar.addEventListener("click",this.realizar_almacenamiento)
        confirmar_guardar.addEventListener("click",this.guardar)
        nombreDocumento.addEventListener("change",this.validar)
        nombreDocumento.addEventListener('keyup',() => {
            btnAñadir.removeEventListener("click",this.agregar_documento);
            btnGuardar.removeEventListener("click",this.realizar_almacenamiento);
        })
        nombreDocumento.addEventListener("keydown",(ev) => {
            if(ev.keyCode != 16){
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_especial(ev.key,1);
                if(!resultado.resp){
                    ev.preventDefault();
                }
            }
        })
        ckhVigencia.checked = true;
        confirmar_reactivar_registro.addEventListener("click",this.confirmarreactivar)
    }

    validar(ev){
        $(errorDuplicado).hide()
        error.innerHTML = ''
        errorDocumento = false
        $(loadingValidar).show();

        this.validaciones = new VALIDACIONES();
        if(ev.target.value == ""){
            error.innerHTML = 'Campo Obligatorio'
            errorDocumento = true
        }else{
            let resultado = this.validaciones.caracteres_validos_especial(ev.target.value,2);
            if(!resultado.resp){
                error.innerHTML = 'Información no valida'
                errorDocumento = true
            }
        }

        if(!errorDocumento){
            $.ajax({
                url: base_url+'Catalogos/Ctrl_Documentos/getByNombre',
                type: 'GET',
                global: false,
                data : {
                    nombre : ev.target.value.trim(),
                    iddocumento : 0
                },
                success: (data) => {
                    if(data.data != null){
                        error.innerHTML = 'El registro ya existe'
                        errorDocumento = true
                        if(data.data.estatus_documentos == 0){
                            pedir_confirmacion_reactivar("El registro ya existe ¿desea reactivarlo?");
                            localStorage.setItem("id_documento",data.data.id_documentos)
                        }
                    }
                    btnAñadir.addEventListener('click',Documentos.prototype.agregar_documento);
                    btnGuardar.addEventListener('click',Documentos.prototype.realizar_almacenamiento);
                    $(loadingValidar).hide();
                },
                error: (xhr, ajaxOptions, thrownError) =>{
                    peticion_fallida(thrownError);
                    btnAñadir.addEventListener('click',Documentos.prototype.agregar_documento);
                    btnGuardar.addEventListener('click',Documentos.prototype.realizar_almacenamiento);
                    $(loadingValidar).hide();
                }
            });
        }else{
            btnAñadir.addEventListener('click',Documentos.prototype.agregar_documento);
            btnGuardar.addEventListener('click',Documentos.prototype.realizar_almacenamiento);
            $(loadingValidar).hide();
        }
    }

    
    obtener_tipos(){
        $.ajax({
			url: base_url+'Catalogos/Ctrl_TiposDocumentos/getByEstatus',
			type: 'GET',
            dataType: 'json',
            data : {
                estatus : 1
            },
            beforeSend: function(){
                $(SelTipoDocumento).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(SelTipoDocumento).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {
			
		});
    }
    obtener_personas(){
        $.ajax({
			url: base_url+'Catalogos/Ctrl_TiposPersonas/getAllByEstatus',
			type: 'GET',
            dataType: 'json',
            data : {
                estatus : 1
            },
			success: function(response){
				response.data.forEach(element => {
                    $(SelTipoPersona).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                });
            },
            complete: function(){
                $(SelTipoPersona).val(3);
            }
		}).fail( function(response) {
			
		});
    }

    obtener_areas(){
        $.ajax({
            url: base_url_rest+'catalogos/areas/estatus/1',
            type: 'GET',
            dataType: 'json',
            success: function(response){
                response.data.forEach(element => {
                    $(selArea).append('<option value="'+element.id_area+'">'+element.nombre_area+'</option>')
                });
            },
            complete: function(){
                $(selArea).select2({placeholder: 'Seleccione'});
            }
        })
    }

    agregar_documento(){
        let validacion = true;

        $(errorTipoDocumento).hide()
        $(errorDuplicado).hide()
        $(errorListaVacia).hide()
        $(errorEtapa).hide()

        if(SelTipoDocumento.value == ""){
            $(errorTipoDocumento).show()
            validacion = false
        }

        if(nombreDocumento.value == ""){
            error.innerHTML = 'Campo Obligatorio'
            validacion = false
        }
        if(errorDocumento == true){
            validacion = false
        }

        if(SelEtapa.value == ""){
            $(errorEtapa).show()
            validacion = false
        }

        if(validacion){
            let datos = {
                idtipodocumento : SelTipoDocumento.value,
                idtipopersona   : SelTipoPersona.value,
                nombre          : nombreDocumento.value.trim(),
                etapa           : SelEtapa.value,
                areas           : $("#selArea").val().toString(),
                vigencia        : ckhVigencia.value

            }

            datosDocumentos.forEach(element => {
                if(element["nombre"] == datos["nombre"] && validacion == true){
					validacion = false;
				}
            });
            
            if(!validacion){
                $(errorDuplicado).show()
                return false;
            }

            DTDocumentos.row.add([
                '<center>'+nombreDocumento.value+'</center>',
                '<center>'+SelTipoDocumento.options[SelTipoDocumento.selectedIndex].text+'</center>',
                '<center>'+SelTipoPersona.options[SelTipoPersona.selectedIndex].text+'</center>', 
                '<center>'+$("#selArea option:selected").toArray().map(item => item.text).join()+'</center>',
                '<center>'+SelEtapa.options[SelEtapa.selectedIndex].text+'</center>',
                '<div class="row" id="eliminar-'+datosDocumentos.length+'">'+
                    '<div class="col-lg-12">'+
                        '<a href="#!" title="Eliminar">'+
                         '<center>'+'<span class="glyphicon glyphicon-trash eliminar" data-id="'+datosDocumentos.length+'"></span>'+'</center>'+
                        '</a>'+
                    '</div>'+
                '</div>'
            ]).draw(false)

            nombreDocumento.value = ""
            SelEtapa.value = ""
            $("#selArea").val("")
            $(selArea).trigger('change');
            
            
            datosDocumentos.push(datos)
        }
    }

    eliminar_registro(ev,_this){
        DTDocumentos.row($(_this).parents('tr')).remove().draw();
        datosDocumentos.splice(ev.target.dataset.id,1)
    }
    realizar_almacenamiento(){
        if(datosDocumentos.length == 0){
            $(errorListaVacia).show()
            return false
        }

        $("#modal_confirmar_guardar").modal()

    }

    confirmarreactivar(){
   
        const id_documento = localStorage.getItem("id_documento");
		$.ajax({
            url: base_url + 'Catalogos/Ctrl_Documentos/active',
            type: "POST",
            data: {
                iddocumento: id_documento,
                [csrf.name] : csrf.value,
            },
            beforeSend: function(){
                $("#modal_confirmar_reactivar").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    reactivar_exitoso(data.message);
                        $(".error").hide()
                        SelTipoDocumento.value = ""
                        SelTipoPersona.value = ""
                        nombreDocumento.value = ""
                        SelEtapa.value = ""
                        $("#selArea").val("")
                        $(selArea).trigger('change');
                        ckhVigencia.checked = true 
                        cambios = 0
                }
                else
                    peticion_fallida(data.message);
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $("#modal_confirmar_reactivar").modal("hide");
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        })
	}

    guardar(){
        $.ajax({
            url: base_url + 'Catalogos/Ctrl_Documentos/add',
            type: 'POST',
            data: {
                datos : datosDocumentos,
                [csrf.name] : csrf.value
            },
            beforeSend: function(){
                $("#modal_confirmar_guardar").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status != true)
                    peticion_fallida(data.message);
                else
                    datosDocumentos = [];
                    DTDocumentos.clear().draw();
                    SelTipoDocumento.value = ""
                    SelTipoPersona.value = " "
                    nombreDocumento.value = ""
                    selArea.value = ""
                    $(selArea).trigger('change');
                    SelEtapa.value = ""
                    ckhVigencia.checked = false
                    registro_exitoso();
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                spinner.style.visibility="hidden";
                $("#modal_confirmar_guardar").modal("hide");
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        })
    }
}

const doc = new Documentos()

$(tabRegistroDocumentos).on('click', '.eliminar', function(ev){
    doc.eliminar_registro(ev,this);
});

$(".form-control").change( (e) => {
	cambios = 1;
});

$("#btnRegresar").click( (e) => {
	if(cambios == 1)
		pedir_confirmar_regresar();
	
	else
		window.location.href = base_url + 'Catalogos/Ctrl_Documentos';
});