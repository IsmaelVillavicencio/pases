var DTPermisos;
let permisosCancelar = []
let datosFiltro = {}
let fecha_catual = new Date().toISOString().split("T")[0];
const url_regreso = localStorage.getItem("url_regreso");
/*const cons = localStorage.getItem("consulta")
console.log(cons)
console.log(url_regreso)*/

class Permisos{
	constructor(){
        this.inicio();
        this.obtenerDatosTabla();
        /*this.obtener_estatus_permisos();
        this.obtener_tipos_permisos();
        this.obtener_personas();
        this.obtener_empresas();*/
	}
	inicio(){

        //if(Area != 8){
            Permisos.prototype.obtener_estatus_permisos();
            Permisos.prototype.obtener_tipos_permisos();
            Permisos.prototype.obtener_personas();
            Permisos.prototype.obtener_empresas();
        //}

        //if(Area != 8){

        f_noSolicitud.addEventListener('keydown',(ev)=>{
            if (ev.keyCode == 219)
                ev.preventDefault();
        })
        /*f_usuario.addEventListener('keydown',(ev)=>{
            if (ev.keyCode == 219)
                ev.preventDefault();
        })*/
        limpiarFiltro.addEventListener('click',(ev)=>{
            Permisos.prototype.obtenerDatosTabla();
            f_fecha_inicio.value = ""
            f_fecha_final.value = ""
            f_noSolicitud.value = ""
            //f_usuario.value = ""
            f_entidad.value = ""
            f_vigencia.value = ""
            f_tpermiso.value = ""
            f_estatus.value = ""
            //f_mOrde.value = ""
            //f_placa.value = ""
            //f_marca.value = ""
            //f_noSerie.value = ""
        })
    //}
        var urlAnterior = document.referrer;

		DTPermisos = $(tabPermisos).DataTable( {
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
			},
			//"order": [[ 0, "desc" ]]
        });
        confirmar_baja.addEventListener("click",this.confirmarbaja)
        if(typeof btnRegistrar !== 'undefined' && idcontratovigenteusuario == 0){
            btnRegistrar.style.display = 'none'
        }
        let elementos = document.getElementsByClassName('form-control')
        for (let i = 0; i < elementos.length; i++) {
             elementos[i].addEventListener('keydown',(ev)=>{
                if(ev.keyCode == 219){
                    ev.preventDefault()
                }
             });
            
        }
        //if(Area != 8){
            btnFiltrarAplicar.addEventListener('click',()=>{
                busqueda()
            })
        //}
        if(typeof btnRegistrarPermiso !== 'undefined'){
            btnRegistrarPermiso.addEventListener("click",()=>{
                localStorage.setItem("url_regreso", 'Permisos/Ctrl_Permisos');
                window.location.href = base_url + 'Permisos/Ctrl_Permisos/registrar';
            })
        }

        if(Area == 8){
            regresar.addEventListener("click",()=>{
                window.top.location.href = "https://puertointeligenteseguro.com.mx/#/home/dashboard"; 
            })
        }

    }
    obtener_empresas() {
        /*var controlador
        if(Area == 8){
            controlador = 'getByUsuario'
        }else{
            controlador = 'getEmpresasPermisos'
            base_url + 'Usuarios/Ctrl_Empresas/'+controlador,
        }*/
        $.ajax({
            url: base_url + 'Usuarios/Ctrl_Empresas/getEmpresasPermisos',
            type: 'GET',
            dataType: 'json',
            data:{
                estatus : 1
            },
            beforeSend: function () {
                $(f_entidad).append('<option value="">Seleccione</option>');
            },
            success: function (response) {
                if(Area != 8){
                    response.data.forEach(element => {
                        $(f_entidad).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                    });
                }else{
                    $(f_entidad).append('<option value="' + response.data.id + '" selected>' + response.data.nombre + '</option>');
                    f_entidad.disabled = true;
                }
            },
        });
    }
    obtener_estatus_permisos(){
        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/getStatusPermisosByUser',
            //url: base_url + 'Permisos/Ctrl_Permisos/getAllStatusPermisos',
            type: 'GET',
            dataType: 'json',
            data: {
                id: Area
            },
            beforeSend: function () {
                $(f_estatus).append('<option value="0">Seleccione</option>');
            },
            success: function (response) {
                response.data.forEach(element => {
                    $(f_estatus).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                });
            },
        });
    }
    obtener_personas(){    
        $('#f_usuario').select2({
            ajax: {
                url: function () {
                    return base_url+'Permisos/Ctrl_Permisos/getByNombrePersona'
                },
                data: function(params){
                    nombre : params.term
                },
                processResults: function (data) {
                    console.log(data.data)
                    return {
                        results: $.map(data.data, function(obj) {
                            return { id: obj.id, text: obj.nombre };
                        })
                    };
                }
            },        
        })
    }
    obtener_tipos_permisos() {
        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/getAllTipoPermiso',
            type: 'GET',
            dataType: 'json',
            data: {
                estatus: 1
            },
            beforeSend: function () {
                $(f_tpermiso).append('<option value="">Seleccione</option>');
            },
            success: function (response) {
                response.data.forEach(element => {
                    $(f_tpermiso).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                });
            },
        });
    }
    obtenerDatosTabla(){
        DTPermisos.clear().draw()
        $.ajax({
			url: base_url+'Permisos/Ctrl_Permisos/getAll',
			type: 'GET',
			dataType: 'json',
			success: function(response){
                //if(U || D){
                if(response != null){
                    response.data.forEach(element => {
                        let consultar = "";
                        let eliminar = "";
                        let autorizar = "";
                        let extender = "";
                        let duplicar = "";
                        let imprimir = "";
                        let enviar = "";
                        let enviar_whats = "";

                        let estatus_message = ''
                        let api = true, aduana = true, migracion = true;

                        if(element.id_estatus_pase == 2){
                            if(element.autorizacion != null){
                                estatus_message += 'Autorizado API'
                                api = false
                            }else{
                                estatus_message += 'Pendiente API'
                            }
                            estatus_message += ', '
                            if(element.autorizacion_aduana != null){
                                estatus_message += 'Autorizado Aduana'
                                aduana = false
                            }else{
                                estatus_message += 'Pendiente Aduana'
                            }
                        }

                        if(element.id_estatus_pase == 3){
                            if(element.autorizacion != null){
                                estatus_message += 'Autorizado API'
                                api = false
                            }else{
                                estatus_message += 'Pendiente API'
                            }
                            estatus_message += ', '
                            if(element.autorizacion_migracion != null){
                                estatus_message += 'Autorizado Migracion'
                                migracion = false
                            }else{
                                estatus_message += 'Pendiente Migracion'
                            }
                        }

                        if(element.id_estatus_pase == 4){
                            if(element.autorizacion != null){
                                estatus_message += 'Autorizado API'
                                api = false
                            }else{
                                estatus_message += 'Pendiente API'
                            }
                            estatus_message += ', '
                            if(element.autorizacion_aduana != null){
                                estatus_message += 'Autorizado Aduana'
                                aduana = false
                            }else{
                                estatus_message += 'Pendiente Aduana'
                            }
                            estatus_message += ', '
                            if(element.autorizacion_migracion != null){
                                estatus_message += 'Autorizado Migracion'
                                migracion = false
                            }else{
                                estatus_message += 'Pendiente Migracion'
                            }
                        }

                                consultar = '<div class="p-1">'+
                                    '<a href="#!" title="Consultar">'+
                                        '<span class="glyphicon glyphicon-eye-open ver" data-id="'+element.id+'"></span>'+
                                    '</a>'+
                                '</div>';
                            if(Area == 6){
                                if(element.id_estatus_pase != 13 &&element.id_estatus_pase != 12 && element.id_estatus_pase != 11 && element.id_estatus_pase != 6 && element.id_estatus_pase != 8 && element.id_estatus_pase != 10){
                                    eliminar = '<div class="p-1">'+
                                        '<a href="#!" title="Dar de baja">'+
                                            '<span class="glyphicon glyphicon-trash eliminar" data-id="'+element.id+'"></span>'+
                                        '</a>'+
                                    '</div>';
                                }
                            }
                            if(Area == 5){
                                if(element.id_estatus_pase == 11){
                                    eliminar = '<div class="p-1">'+
                                        '<a href="#!" title="Dar de baja">'+
                                            '<span class="glyphicon glyphicon-trash eliminar" data-id="'+element.id+'"></span>'+
                                        '</a>'+
                                    '</div>';
                                }
                            }
                            if(element.id_estatus_pase != 13 && element.id_estatus_pase != 14){
                                eliminar = '<div class="p-1">'+
                                    '<a href="#!" title="Dar de baja">'+
                                        '<span class="glyphicon glyphicon-trash eliminar" data-id="'+element.id+'"></span>'+
                                    '</a>'+
                                '</div>';
                            }
                            if(Area == 8){
                                if(element.id_estatus_pase == 11 || element.id_estatus_pase == 12){
                                    /*duplicar = '<div class="p-1">'+
                                            '<a href="#!"  title="Duplicar">'+
                                                '<span class="glyphicon glyphicon-repeat duplicar" data-id="'+element.id+'"></span>'+
                                            '</a>'+
                                        '</div>';*/
                                }
                            }
                            if((Area == 5 && element.id_estatus_pase == 1) || ((Area == 5 || Area == 6) && element.id_estatus_pase == 2) || ((Area == 5 || Area == 7) && element.id_estatus_pase == 3) || ((Area == 5 || Area == 6 || Area == 7) && element.id_estatus_pase == 4)){
                               if((Area == 5 && api) || (Area == 6 && aduana) || (Area == 7 && migracion)){
                                autorizar = '<div class="p-1">'+
                                    '<a href="#!" title="Autorizar">'+
                                        '<span class="glyphicon glyphicon-list-alt editar" data-id="'+element.id+'"></span>'+
                                    '</a>'+
                                '</div>';
                               }
                            }
                            if( (Area == 4 || Area == 8) && element.id_estatus_pase == 11){
                                    /*extender = '<div class="p-1">'+
                                        '<a href="#!" title="Extender">'+
                                            '<span class="icon-calendar extender" data-id="'+element.id+'"></span>'+
                                        '</a>'+
                                    '</div>';
                                    duplicar = '<div class="p-1">'+
                                        '<a href="#!"  title="Duplicar">'+
                                            '<span class="glyphicon glyphicon-repeat duplicar" data-id="'+element.id+'"></span>'+
                                        '</a>'+
                                    '</div>';*/
                                    imprimir = '<div class="p-1">'+
                                        '<a href="#!" title="Imprimir">'+
                                            '<span class="glyphicon glyphicon-print imprimir" data-id="'+element.id+'"></span>'+
                                        '</a>'+
                                    '</div>';
                            }
                            if(element.id_estatus_pase == 11){
                                enviar = '<div class="p-1">'+
                                    '<a href="#!" title="Enviar correo">'+
                                        '<span class="glyphicon glyphicon-envelope enviar" data-id="'+element.id+'"></span>'+
                                    '</a>'+
                                '</div>';

                                enviar_whats = '<div class="p-1">'+
                                    '<a href="#!" title="Enviar whatsapp" style="color:#000000">'+
                                        '<i class="fa fa-whatsapp enviar_whatsapp" aria-hidden="true" data-id="'+element.id+'"></i>'+
                                    '</a>'+
                                '</div>';
                            }
                            
                        DTPermisos.row.add([
                            '<center>'+element.id+'</center>',
                            '<center>'+(element.empresa == null ? '' : element.empresa)+'</center>',
                            '<center>'+element.fecha_inicio+'</center>',
                            '<center>'+element.fecha_termino+'</center>',
                            '<center>'+element.tipo_permiso+'</center>',
                            '<center>'+(element.permiso_grupal == 1 ? 'Grupal' : 'Personal')+'</center>',
                            '<center>'+(estatus_message == '' ? element.estatus_nombre : estatus_message)+'</center>',
                            '<div class="d-flex justify-content-center" >'+
                                enviar+
                                enviar_whats+
                                imprimir +
                                extender +
                                duplicar+
                                autorizar+
                                consultar+
                                eliminar+
                            '</div>'
                        ]).draw(false)
                    });
                /*}else{
                    response.data.forEach(element => {
                        DTPermisos.row.add([
                            element.id_permiso,
                            '<center>'+element.referencia+'</center>',
                            '<center>'+element.tipo_permiso+'</center>',
                            '<center>'+element.permiso+'</center>',
                            '<center>'+element.estatus_permiso+'</center>'
                        ]).draw(false)
                    });
                }*/
              }
			},
		}).fail( function(response) {
	
		});
    }
	imprimir_registro(ev){
        window.open(base_url + "Permisos/Ctrl_Credencial/permiso/"+ev.target.dataset.id);
    }
    enviar_correo(ev){
        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/enviar_correo',
            type: "POST",
            data: {
                idpermiso: ev.target.dataset.id,
                [csrf.name] : csrf.value,
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    registro_exitoso(data.message);
                }else{
                    peticion_fallida(data.message);
                }
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        })
    }
    enviar_whatsapp(ev){
        $.ajax({
            url : base_url + 'Permisos/Ctrl_Permisos/getPersonal',
            type : 'GET',
            data: {
                idpermiso: ev.target.dataset.id,
                [csrf.name] : csrf.value,
            },
            dataType: 'json',
            success : function(response) {
                response.data.forEach(element => {
                    const estructura_mensaje = new whatsappPermisos(element)
                    let mensaje = estructura_mensaje.mensaje
                    let telefonos = element.telefonos.split(",")

                    window.open("https://api.whatsapp.com/send?phone=52"+telefonos[0]+"&text="+mensaje, "_blank");
                });
            }
        });
    }
    autorizar_registro(ev){
        localStorage.setItem("id_permiso", ev.target.dataset.id);
        window.location.href= base_url + "Permisos/Ctrl_Permisos/autorizar";
    }
    eliminar_registro(ev){
        localStorage.setItem("id_permiso", ev.target.dataset.id);
        pedir_confirmacion_eliminar_motivo();
    }
    consultar_registro(ev){
        localStorage.setItem("id_permiso", ev.target.dataset.id);
        localStorage.setItem("url_regreso", 'Permisos/Ctrl_Permisos');
        window.location.href= base_url + "Permisos/Ctrl_Permisos/consultar";
    }
    extender_registro(ev){
        localStorage.setItem("id_permiso", ev.target.dataset.id);
        window.location.href= base_url + "Permisos/Ctrl_Permisos/extender";
    }
    duplicar_registro(ev){
        localStorage.setItem("id_permiso", ev.target.dataset.id);
        window.location.href= base_url + "Permisos/Ctrl_Permisos/duplicar";
    }
	confirmarbaja(ev){
		$.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/delete',
            type: "POST",
            data: {
                idpermiso: localStorage.getItem("id_permiso"),
                observacion: observacionMotivo.value,
                [csrf.name] : csrf.value,
            },
            beforeSend: function(){
                DTPermisos.clear().draw();
                $("#modal_confirmar_baja_motivo").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    registro_exitoso(data.message);
                    Permisos.prototype.obtenerDatosTabla();
                }
                else
                    peticion_fallida(data.message);
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $("#modal_confirmar_baja_motivo").modal("hide");
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        })
	}
    cancelar_permisos_vencidos(){
        for (let index = 0; index < permisosCancelar.length; index++) {
            $.ajax({
                url: base_url + 'Permisos/Ctrl_Permisos/delete_vencidos',
                type: "POST",
                async: false,
                data: {
                    idpermiso: permisosCancelar[index]
                },
                success: (data) => {

                }
            })
        }

        permisosCancelar = []
        DTPermisos.clear().draw();
        Permisos.prototype.obtenerDatosTabla();
    }
}

const per = new Permisos()

$(tabPermisos).on('click', '.ver', function(ev){
    per.consultar_registro(ev);
});
$(tabPermisos).on('click', '.eliminar', function(ev){
    per.eliminar_registro(ev);
});
$(tabPermisos).on('click', '.editar', function(ev){
    per.autorizar_registro(ev);
});
$(tabPermisos).on('click', '.imprimir', function(ev){
    per.imprimir_registro(ev);
});
$(tabPermisos).on('click', '.enviar', function(ev){
    per.enviar_correo(ev);
});
$(tabPermisos).on('click', '.enviar_whatsapp', function (ev) {
    per.enviar_whatsapp(ev)
});
$(tabPermisos).on('click', '.extender', function(ev){
    per.extender_registro(ev);
});
$(tabPermisos).on('click', '.duplicar', function(ev){
    per.duplicar_registro(ev);
});


function busqueda(){
    $.ajax({
        url : base_url + 'Permisos/Ctrl_Permisos/getFiltro',
        type : 'GET',
        data: {
            fechainicio: f_fecha_inicio.value,
            fechatermino: f_fecha_final.value, 
            nosolicitud: f_noSolicitud.value,
            identidad: f_entidad.value, 
            idvigencia: f_vigencia.value, 
            idtipopermiso: f_tpermiso.value, 
            idestatuspase:  f_estatus.value, 
            nombrepersona: f_nombre.value,
            noplaca: f_noPlaca.value
        },
        dataType: 'json',
        success : function(response) {
           if(response.data == ""){
                peticion_fallida("No se encontraron registros con los criterios de búsqueda")
                per.obtenerDatosTabla()
           }else{
            //if(response.data != null){
                DTPermisos.clear().draw();
                response.data.forEach(element => {
                    let consultar = "";
                    let eliminar = "";
                    let autorizar = "";
                    let extender = "";
                    let duplicar = "";
                    let imprimir = "";
                    let enviar = "";
                    let enviar_whats = "";

                    let estatus_message = ''
                    let api = true, aduana = true, migracion = true;

                    if(element.id_estatus_pase == 2){
                        if(element.autorizacion != null){
                            estatus_message += 'Autorizado API'
                            api = false
                        }else{
                            estatus_message += 'Pendiente API'
                        }
                        estatus_message += ', '
                        if(element.autorizacion_aduana != null){
                            estatus_message += 'Autorizado Aduana'
                            aduana = false
                        }else{
                            estatus_message += 'Pendiente Aduana'
                        }
                    }

                    if(element.id_estatus_pase == 3){
                        if(element.autorizacion != null){
                            estatus_message += 'Autorizado API'
                            api = false
                        }else{
                            estatus_message += 'Pendiente API'
                        }
                        estatus_message += ', '
                        if(element.autorizacion_migracion != null){
                            estatus_message += 'Autorizado Migracion'
                            migracion = false
                        }else{
                            estatus_message += 'Pendiente Migracion'
                        }
                    }

                    if(element.id_estatus_pase == 4){
                        if(element.autorizacion != null){
                            estatus_message += 'Autorizado API'
                            api = false
                        }else{
                            estatus_message += 'Pendiente API'
                        }
                        estatus_message += ', '
                        if(element.autorizacion_aduana != null){
                            estatus_message += 'Autorizado Aduana'
                            aduana = false
                        }else{
                            estatus_message += 'Pendiente Aduana'
                        }
                        estatus_message += ', '
                        if(element.autorizacion_migracion != null){
                            estatus_message += 'Autorizado Migracion'
                            migracion = false
                        }else{
                            estatus_message += 'Pendiente Migracion'
                        }
                    }

                            consultar = '<div class="p-1">'+
                                '<a href="#!" title="Consultar">'+
                                    '<span class="glyphicon glyphicon-eye-open ver" data-id="'+element.id+'"></span>'+
                                '</a>'+
                            '</div>';
                        if(Area == 6){
                            if(element.id_estatus_pase != 13 &&element.id_estatus_pase != 12 && element.id_estatus_pase != 11 && element.id_estatus_pase != 6 && element.id_estatus_pase != 8 && element.id_estatus_pase != 10){
                                eliminar = '<div class="p-1">'+
                                    '<a href="#!" title="Dar de baja">'+
                                        '<span class="glyphicon glyphicon-trash eliminar" data-id="'+element.id+'"></span>'+
                                    '</a>'+
                                '</div>';
                            }
                        }
                        if(Area == 5){
                            if(element.id_estatus_pase == 11){
                                eliminar = '<div class="p-1">'+
                                    '<a href="#!" title="Dar de baja">'+
                                        '<span class="glyphicon glyphicon-trash eliminar" data-id="'+element.id+'"></span>'+
                                    '</a>'+
                                '</div>';
                            }
                        }
                        if(Area == 8){
                            if(element.id_estatus_pase != 13 || element.id_estatus_pase != 14){
                                eliminar = '<div class="p-1">'+
                                    '<a href="#!" title="Dar de baja">'+
                                        '<span class="glyphicon glyphicon-trash eliminar" data-id="'+element.id+'"></span>'+
                                    '</a>'+
                                '</div>';
                            }
                        }
                        if(Area == 8){
                            if(element.id_estatus_pase == 11 || element.id_estatus_pase == 12){
                            }
                        }
                        if((Area == 5 && element.id_estatus_pase == 1) || ((Area == 5 || Area == 6) && element.id_estatus_pase == 2) || ((Area == 5 || Area == 7) && element.id_estatus_pase == 3) || ((Area == 5 || Area == 6 || Area == 7) && element.id_estatus_pase == 4)){
                        if((Area == 5 && api) || (Area == 6 && aduana) || (Area == 7 && migracion)){
                            autorizar = '<div class="p-1">'+
                                '<a href="#!" title="Autorizar">'+
                                    '<span class="glyphicon glyphicon-list-alt editar" data-id="'+element.id+'"></span>'+
                                '</a>'+
                            '</div>';
                        }
                        }
                        if(Area == 4 || Area == 8){
                            if(element.id_estatus_pase == 11){
                                imprimir = '<div class="p-1">'+
                                    '<a href="#!" title="Imprimir">'+
                                        '<span class="glyphicon glyphicon-print imprimir" data-id="'+element.id+'"></span>'+
                                    '</a>'+
                                '</div>';
                            }
                        }
                        if(Area == 8 && element.id_estatus_pase == 11){
                            /*duplicar = '<div class="p-1">'+
                                '<a href="#!"  title="Duplicar">'+
                                    '<span class="glyphicon glyphicon-repeat duplicar" data-id="'+element.id+'"></span>'+
                                '</a>'+
                            '</div>';*/
                            enviar = '<div class="p-1">'+
                                '<a href="#!" title="Enviar correo">'+
                                    '<span class="glyphicon glyphicon-envelope enviar" data-id="'+element.id+'"></span>'+
                                '</a>'+
                            '</div>';

                            enviar_whats = '<div class="p-1">'+
                                '<a href="#!" title="Enviar whatsapp" style="color:#000000">'+
                                    '<i class="fa fa-whatsapp enviar_whatsapp" aria-hidden="true" data-id="'+element.id+'"></i>'+
                                '</a>'+
                            '</div>';
                        }
                        
                    DTPermisos.row.add([
                        '<center>'+element.id+'</center>',
                        '<center>'+(element.empresa == null ? '' : element.empresa)+'</center>',
                        '<center>'+element.fecha_inicio+'</center>',
                        '<center>'+element.fecha_termino+'</center>',
                        '<center>'+element.tipo_permiso+'</center>',
                        '<center>'+(element.permiso_grupal == 1 ? 'Grupal' : 'Personal')+'</center>',
                        '<center>'+(estatus_message == '' ? element.estatus_nombre : estatus_message)+'</center>',
                        '<div class="d-flex justify-content-center" >'+
                            enviar+
                            enviar_whats+
                            imprimir +
                            extender +
                            duplicar+
                            autorizar+
                            consultar+
                            eliminar+
                        '</div>'
                    ]).draw(false)

                    if(element.fecha_termino < fecha_catual && ![6,8,10,12,13,14].includes(element.id_estatus_pase)){
                        permisosCancelar.push(element.id)
                    }
                });
            }/*else{
                peticion_fallida("No se encontraron registros con los criterios de búsqueda")
            }*/
        }
    });
}