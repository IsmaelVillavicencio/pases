let DTEquipo;
var id_empresa = 0, id_persona_fisica = 0
var datosEquipos = []
var fotoFacturaEquipo = null
let catalogoTiposEquipos = []
let catalogoTiposDocumentos = []

class Registrar{
    constructor(){
        this.inicio()
        this.obtener_tipos_equipos()
        this.obtener_tipos_documentos()
    }
    inicio(){
        let tipoCaptura = document.getElementsByClassName("capturar")
        for (let index = 0; index < tipoCaptura.length; index++) {
            tipoCaptura[index].addEventListener("change",(ev)=>{
                if(ev.target.value == 1){
                    divManual.style.display = ""
                    divExcel.style.display = "none"
                }else{
                    divManual.style.display = "none"
                    divExcel.style.display = ""
                }
            })
        }

        DTEquipo = $(tabEquipoHerramienta).DataTable( {
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
			},
			"order": [ 0, "asc" ]
        });

        noSerieEquipo.addEventListener('change',this.validar_noserie_equipo)
        adjuntarEquipo.addEventListener("change",this.previsualizar_equipo)

        anadirEquipo.addEventListener("click",(ev)=>{
            if(fotoFacturaEquipo){
                Registrar.prototype.agregar_equipo(fotoFacturaEquipo)
            }else{
                Registrar.prototype.agregar_equipo()
            }
        })

        btnAceptarAdjuntarEquipo.addEventListener("click",(ev)=>{
            if(adjuntarEquipo.value != ""){
                btnSubirEquipo.value = "Actualizar documento"                
            }
        })

        btnSubirEquipo.addEventListener('click',(ev)=>{
            adjuntarEquipo.dataset.imagen = '' 
            if(adjuntarEquipo.value == ""){
                pdfViewerEquipo.innerHTML = ''
                erroradjuntarEquipo.innerHTML = ''
            }
            $(modalEquipo).modal()
        })

        btnsubirexcel.addEventListener('click',(ev)=>{
            $(modalExcel).modal()
        })

        btnGuardar.addEventListener("click",this.realizar_almacenamiento)
        confirmar_guardar.addEventListener("click",this.guardar)
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
                catalogoTiposEquipos= response.data
				response.data.forEach(element => {
                    $(tipoEquipo).append('<option value="'+element.id+'">'+element.nombre+'</option>');
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
                catalogoTiposDocumentos = response.data
				response.data.forEach(element => {
                    if(element.id == 3 || element.id == 4){
                        $(tipoDocumento).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                    }
                });
			}
		}).fail( function(response) {
			
		});
    }

    validar_noserie_equipo(){
        $(errorHerramientaDuplicado).html("")
            $.ajax({
                url: base_url+'Credencializacion/Ctrl_Equipos/getEquipoBySerie',
                type: 'GET',
                dataType: 'json',
                global: false,
                data:{
                    noserie: noSerieEquipo.value
                },
                beforeSend: function(){
                    campos_formulario();
                },
                success: function(response){
                    if(response.data != null){
                        $(errornoSerieEquipo).html("El registro ya existe")
                        campos_formulario(response.data);
                    }
                },

            }).fail(function(response){
                if(response.responseText=="Sesion"){
                    error_sesion();
                } 
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
        };
        fileReader.readAsDataURL($(this)[0].files[0]);
        
        btnAceptarAdjuntarEquipo.onclick = function() {
            if(fileReader != ""){
                $(erroradjuntarEquipo).html("")
            }
        }
    }
    agregar_equipo(fotoFacturaEquipo){
        let validacion = validacion_almacenar();
        if(validacion){
            let datos = {
                tipoEquipo          : tipoEquipo.value,
                modelo              : modeloHerramienta.value,
                marca               : marcaHerramienta.value,
                noSerie             : noSerieEquipo.value,
                tipoDocumento       : tipoDocumento.value,
                noFactura           : noFacturaEquipo.value,
                idimagenfactura     : (adjuntarEquipo.dataset.id != "") ? adjuntarEquipo.dataset.id : 0,
                fotografiaFactura   : (fotoFacturaEquipo) ? fotoFacturaEquipo :  $("#adjuntarEquipo")[0].files[0]
                //fotografiaFactura   : $("#adjuntarEquipo")[0].files[0]
            }

            datosEquipos.forEach(element => {
                if(element["noSerie"] == datos["noSerie"] && validacion == true){
                    validacion = false;
                }
            })
  
            if(!validacion){
                $(errorHerramientaDuplicado).html("El registro ya existe el la lista")
                return validacion;
            }else{
                $(errorHerramientaDuplicado).html("")
            }
  
            datosEquipos.push(datos)
          
            DTEquipo.row.add([
                '<center>'+tipoEquipo.options[tipoEquipo.selectedIndex].text+'</center>',
                '<center>'+datos.modelo+'</center>',
                '<center>'+datos.marca+'</center>',
                '<center>'+datos.noSerie+'</center>',
                '<div class="d-flex justify-content-center" >'+
                    '<div class="p-1">'+
                        '<a href="#!" title="Modificar">'+
                            '<span class="glyphicon glyphicon-pencil editar" data-id="'+(datosEquipos.length-1)+'" alt="Editar">'+'</span>'+
                        '</a>'+
                    '</div>'+
                    '<div class="p-1">'+
                        '<a href="#!" titile="Eliminar">'+
                            '<span class="glyphicon glyphicon-trash eliminar" data-id="'+(datosEquipos.length-1)+'" alt="Papelera">'+'</span>'+
                        '</a>'+
                    '</div>'+
                '</div>'
            ]).draw(false)
            //Reincio de modales de carga de documentos
            adjuntarEquipo.value = ''
            //Reinicio de campos mostrados a inicio
            //Reinicio de valores de campos
            $(".reiniciar-equipo").val("")
            document.getElementById('btnSubirEquipo').value = 'Subir documento'
            fotoFacturaEquipo = null
        }
    }

    previsualizar(fotoFacturaEquipo){

        var fileReader = new FileReader();
        pdfViewerEquipo.innerHTML = ''
        erroradjuntarEquipo.innerHTML = ''

        fileReader.onload = function() {
            var TheFileContents = fileReader.result;    
            $(pdfViewerEquipo).html('<img width="460" height="200" src="'+TheFileContents+'"/>');
            adjuntarEquipo.dataset.imagen = TheFileContents
        };
        fileReader.readAsDataURL(fotoFacturaEquipo);
        
        btnAceptarAdjuntarEquipo.onclick = function() {
            if(fileReader != ""){
                $(erroradjuntarEquipo).html("")
            }
        }
    }
    realizar_almacenamiento(){
        if(validacion_almacenar(true)){
            if (DTEquipo.row().data() == undefined)
                peticion_fallida("Debe haber al menos un equipo/herramienta en el listado para poder guardar el registro");
            else
                $("#modal_confirmar_guardar").modal()
        }
    }
    guardar(){
        let formData = new FormData();
        for (let index = 0; index < datosEquipos.length; index++) {
            formData.append("idempresa["+index+"]",id_empresa)
            formData.append("idpersonafisica["+index+"]",id_persona_fisica)
            formData.append("idequipo["+index+"]",0)
            formData.append("tipoEquipo["+index+"]",datosEquipos[index].tipoEquipo)
            formData.append("modelo["+index+"]",datosEquipos[index].modelo)
            formData.append("marca["+index+"]",datosEquipos[index].marca)
            formData.append("noSerie["+index+"]",datosEquipos[index].noSerie)
            formData.append("tipoDocumento["+index+"]",datosEquipos[index].tipoDocumento)
            formData.append("noFactura["+index+"]",datosEquipos[index].noFactura)
            formData.append("idimagenfactura["+index+"]",datosEquipos[index].idimagenfactura)
            formData.append("fotografiaFactura-"+index,datosEquipos[index].fotografiaFactura);
            //formData.append("fotografia-"+index,datosEquipos[index].fotografia);
            formData.append([csrf.name], csrf.value);
        }
        $.ajax({
            url : base_url+'Credencializacion/Ctrl_Equipos/addEquipos',
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
                    Registrar.prototype.reiniciar_campos()
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
    reiniciar_campos(){
        id_empresa = 0
        id_persona_fisica = 0
        fotoFacturaEquipo = null

        datosEquipos = []
        DTEquipo.clear().draw()
        $(".reiniciar-equipo").val("")
    }
}
const reg = new Registrar()

function campos_formulario(data = null) {
    llenar_campos_formulario([tipoEquipo , data == null ? "" : data.id_tipo_equipo,
        marcaHerramienta, data == null ? "" : data.marca, modeloHerramienta, data == null ? "" : data.modelo,
        tipoDocumento, data == null ? "" : data.id_tipo_documento, noFacturaEquipo, data == null ? "" : data.numero_factura],
        data);

    if (data == null) {
        $(btnSubirEquipo).attr('disabled', false)
        $(anadirEquipo).attr('disabled', false)
    } else {
        $(btnSubirEquipo).attr('disabled', true)
        $(anadirEquipo).attr('disabled', true)
    }
}

function llenar_campos_formulario(campos = [], data) {
    for (let index = 0; index < campos.length; index = index + 2) {
        if (data == null) {
            if (campos[index].id != 'tipoEquipo')
                $(campos[index]).val('');
            $(campos[index]).addClass('form-control')
            $(campos[index]).removeClass('lectura')
        } else {
            $(campos[index]).val(campos[index + 1]);
            $(campos[index]).addClass('lectura')
            $(campos[index]).removeClass('form-control')
        }
    }
}

function validacion_almacenar(guardar = false){
    if (guardar && DTEquipo.row().data() != undefined)
        return true;

    $(erroradjuntarEquipo).html("")

    let validacion = validacion_campos([tipoEquipo, noSerieEquipo, modeloHerramienta,
        marcaHerramienta, tipoDocumento, noFacturaEquipo, adjuntarEquipo]);

    return validacion;
};

function validacion_campos(campos = [], validacion = true) {
    this.validaciones = new VALIDACIONES();

    campos.forEach(campo => {
        if (campo.value == "" && campo.dataset.imagen == undefined) {
            validacion = mensaje_error_campos(campo, 'Campo obligatorio');
        } else if (campo.value == "" && campo.dataset.imagen == "") {
            validacion = mensaje_error_campos(campo, 'Campo obligatorio');
        } else if (campo.nodeName == "INPUT" && campo.type == "text") {
            this.resultado = this.validaciones.caracteres_validos_alphanumeric(campo.value, 1, 25, 1);
            if(!resultado.resp)
                validacion = mensaje_error_campos(campo, 'Información no válida');
        }
    });
    return validacion
}

function mensaje_error_campos(campo, mensaje) {
    $('#error' + campo.id).html(mensaje);
    return false;
}
$(tabEquipoHerramienta).on('click', '.eliminar', function(ev){
    datosEquipos.splice(ev.target.dataset.id, 1); 
    DTEquipo.row($(this).parents('tr')).remove().draw();
});

$(tabEquipoHerramienta).on('click', '.editar', function(ev){
    
         tipoEquipo.value        = datosEquipos[ev.target.dataset.id].tipoEquipo
         noSerieEquipo.value     = datosEquipos[ev.target.dataset.id].noSerie
         modeloHerramienta.value = datosEquipos[ev.target.dataset.id].modelo
         marcaHerramienta.value  = datosEquipos[ev.target.dataset.id].marca
         tipoDocumento.value     = datosEquipos[ev.target.dataset.id].tipoDocumento
         noFacturaEquipo.value   = datosEquipos[ev.target.dataset.id].noFactura
         fotoFacturaEquipo       = datosEquipos[ev.target.dataset.id].fotografiaFactura
         btnSubirEquipo.value    = "Actualizar documento"
         
         $(btnSubirEquipo).on('click',function(ev){
            reg.previsualizar(fotoFacturaEquipo)
        })
         
    datosEquipos.splice(ev.target.dataset.id, 1); 
    DTEquipo.row($(this).parents('tr')).remove().draw();
    
});

$(".form-control").change( (ev) => {
	cambios = 1;
    if(ev .target.value != ""){
        if(![""].includes(ev.target.id)){
            $("#error"+ev.target.id).html('')
        }
    }
});

var upExcel = new plupload.Uploader({
    browse_button: 'adjuntarExcel', // this can be an id of a DOM element or the DOM element itself
    url: base_url+'Upload/equiposExcel/',
    chunk_size: '1mb',
    max_file_count: 1,
    multi_selection: false,
    unique_names: true,
    multipart_params: {
        [csrf.name] : csrf.value
    },
    //ADD FILE FILTERS HERE
    filters: {max_file_size : '3mb',  mime_types: [ { title: "XLS Archivos", extensions: "xls" },            { title: "XLSX Archivos", extensions: "xlsx" } ] },
    init: {
        PostInit: function () {
            txterrorarchivoadjunto.innerHTML = "";
            document.getElementById('btnAceptarAdjuntarExcel').onclick = function () {
                upExcel.start();
                return false;
            }
        },
        Error: function(up, err) {
            txterrorarchivoadjunto.innerHTML = "";
            if(err.code == -600)
                txterrorarchivoadjunto.innerHTML = "El maximo tamaño de archivo es de 3mb";
            if(err.code == -601)
                txterrorarchivoadjunto.innerHTML = "El tipo de archivo debe ser .xls o .xlsx";
        },
        Browse: function (up) {
            txterrorarchivoadjunto.innerHTML = "";
            if (up.files.length > 0)
                up.removeFile(up.files[0]); // Delete the last selection if it exists
        },
        FilesAdded: function (up, files) {
            txterrorarchivoadjunto.innerHTML = "";
            txtarchivoadjunto.innerHTML = up.files[0]['name'];
        },
        UploadProgress: function (up, file) {
            txterrorarchivoadjunto.innerHTML = "";
            console.log("Upload Progress excel");
            // Called while file is being uploaded
            var span = document.getElementById('procesaexcel');
            span.innerHTML = '<a href="#!"> Cargando archivo: ' + file.percent + '%</a>';
            $("#btnsubirdocumento").hide();
        },
        BeforeUpload: function (up, file) {
            $(modalExcel).modal('toggle');
        },
        FileUploaded: function (up, file, info) {
            txterrorarchivoadjunto.innerHTML = "";
            $("#procesaexcel").html("<a>Validando archivo, espere.... </a>");
            let formData = new FormData();
            formData.append("archivo",file.target_name)
            
            $.ajax({
                url : base_url+'Credencializacion/Ctrl_Equipos/importar',
                type : 'POST',
                data : formData,
                global: false,
                processData: false,
                contentType: false,
                beforeSend: function(){
                    DTEquipo.clear().draw();
                    datosEquipos = []
                },
                success : function(response) {
                    csrf.value = response.token;
                    $("#procesaexcel").html("");
                    btnsubirexcel.value = 'Modificar documento';
                    response.data.forEach(function(element, index){
                        let indexTipoEquipo = catalogoTiposEquipos.findIndex(e => e.nombre == element.tipoEquipo)
                        let indexTipoDocumento = catalogoTiposDocumentos.findIndex(e => e.nombre == element.tipoDocumento)

                        console.log([indexTipoEquipo,indexTipoDocumento])

                        let datos = {
                            tipoEquipo          : catalogoTiposEquipos[indexTipoEquipo].id,
                            modelo              : element.modelo,
                            marca               : element.marca,
                            noSerie             : element.noSerie,
                            tipoDocumento       : catalogoTiposDocumentos[indexTipoDocumento].id,
                            noFactura           : element.noFactura,
                            idimagenfactura     : 0,
                            fotografiaFactura   : $("#adjuntarEquipo")[0].files[0] 
                            //fotografiaFactura   : $("#adjuntarEquipo")[0].files[0]
                        }
                        datosEquipos.push(datos)
                        
                        DTEquipo.row.add([
                            '<center>'+element.tipoEquipo+'</center>',
                            '<center>'+element.modelo+'</center>',
                            '<center>'+element.marca+'</center>',
                            '<center>'+element.noSerie+'</center>',
                            '<div class="d-flex justify-content-center" >'+
                                '<div class="p-1">'+
                                    '<a href="#!" title="Modificar">'+
                                        '<span class="glyphicon glyphicon-pencil editar" data-id="'+index+'" alt="Editar">'+'</span>'+
                                    '</a>'+
                                '</div>'+
                                '<div class="p-1">'+
                                    '<a href="#!" titile="Eliminar">'+
                                        '<span class="glyphicon glyphicon-trash eliminar" data-id="'+index+'" alt="Papelera">'+'</span>'+
                                    '</a>'+
                                '</div>'+
                            '</div>'
                        ]).draw(false)
                    });
                    $("#archexporta").val(file.target_name);
                },
                error: (xhr, ajaxOptions, thrownError) =>{
                    spinner.style.visibility="hidden";
                    span.innerHTML = 'Error al cargar documento';
                    peticion_fallida(thrownError);
                    csrf.value = xhr.responseJSON.token;
                }
            }).fail(function(response){
                spinner.style.visibility="hidden";
                if(response.responseText=="Sesion"){
                    error_sesion();
                }
            })
        },
    }
});


upExcel.init();