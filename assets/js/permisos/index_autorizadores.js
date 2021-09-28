var DTPermisos;
let fecha_catual = new Date().toISOString().split("T")[0];

class Permisos{
	constructor(){
        this.inicio();
        this.obtenerDatosTabla();
        this.obtener_estatus_permisos();
        this.obtener_tipos_permisos();
        this.obtener_empresa();
	}
	inicio(){
        f_noSolicitud.addEventListener('keydown',(ev)=>{
            if (ev.keyCode == 219)
                ev.preventDefault();
        })
        f_nombre.addEventListener('keydown',(ev)=>{
            if (ev.keyCode == 219)
                ev.preventDefault();
        })
        limpiarFiltro.addEventListener('click',(ev)=>{
            Permisos.prototype.obtenerDatosTabla();
            f_fecha_inicio.value = ""
            f_fecha_final.value = ""
            f_noSolicitud.value = ""
            f_nombre.value = ""
            f_vigencia.value = ""
            f_tpermiso.value = ""
            f_estatus.value = ""
            //f_mOrde.value = ""
            //f_placa.value = ""
            //f_marca.value = ""
            //f_noSerie.value = ""
        })
		DTPermisos = $(tabPermisos).DataTable( {
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
			},
			"order": [[ 0, "desc" ]]
        });
        confirmar_baja.addEventListener("click",this.confirmarbaja)
        if(idcontratovigenteusuario == 0){
            btnRegistrar.style.display = 'none'
        }
        btnFiltrarAplicar.addEventListener('click',this.obtenerDatosTabla)
        if(typeof btnRegistrarPermiso !== 'undefined'){
            btnRegistrarPermiso.addEventListener("click",()=>{
                localStorage.setItem("url_regreso", 'Permisos/Ctrl_Permisos/index_autorizadores');
                window.location.href = base_url + 'Permisos/Ctrl_Permisos/registrar';
            })
        }
    }

    obtener_empresa(){
        $.ajax({
            url: base_url + 'Usuarios/Ctrl_Empresas/getByUsuario',
            type: 'GET',
            dataType: 'json',
            data:{
                estatus : 1
            },
            beforeSend: function () {
            },
            success: function (response) {
                response.data.forEach(element => {
                    $(f_entidad).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                    f_entidad.disabled = true;
                });
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
    obtener_tipos_permisos(){
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
        DTPermisos.clear().draw();
        $.ajax({
			url: base_url+'Permisos/Ctrl_Permisos/getAllAutorizadores',
			type: 'GET',
			dataType: 'json',
            data: {
                fechainicio:    f_fecha_inicio.value,
                fechatermino:   f_fecha_final.value, 
                nosolicitud:    f_noSolicitud.value,
                idempresa:      f_entidad.value, 
                idvigencia:     f_vigencia.value, 
                idtipopermiso:  f_tpermiso.value, 
                idestatuspase:  f_estatus.value, 
                nombrepersona:  f_nombre.value,
                noplaca:        f_noPlaca.value
            },
			success: function(response){
                    response.data.forEach(element => {
                        let consultar = "";
                        let eliminar = "";
                        let extender = "";
                        let duplicar = "";
                        let imprimir = "";
                        let enviar = "";
                        let enviar_whats = "";

                                consultar = '<div class="p-1">'+
                                    '<a href="#!" title="Consultar">'+
                                        '<span class="glyphicon glyphicon-eye-open ver" data-id="'+element.id+'"></span>'+
                                    '</a>'+
                                '</div>';
                                if(element.id_estatus_pase != 13 && element.id_estatus_pase != 14){
                                    eliminar = '<div class="p-1">'+
                                        '<a href="#!" title="Dar de baja">'+
                                            '<span class="glyphicon glyphicon-trash eliminar" data-id="'+element.id+'"></span>'+
                                        '</a>'+
                                    '</div>';
                                }
                                if(element.id_estatus_pase != 1 && element.id_estatus_pase != 2 && element.id_estatus_pase != 3 && element.id_estatus_pase != 4){
                                    /*duplicar = '<div class="p-1">'+
                                        '<a href="#!"  title="Duplicar">'+
                                            '<span class="glyphicon glyphicon-repeat duplicar" data-id="'+element.id+'"></span>'+
                                        '</a>'+
                                    '</div>';*/
                                }
                                if(element.id_estatus_pase == 11){
                                    /*if(element.bext){
                                        extender = '<div class="p-1">'+
                                        '<a href="#!" title="Extender">'+
                                            '<span class="icon-calendar extender" data-id="'+element.id+'"></span>'+
                                        '</a>'+
                                    '</div>';
                                    }*/
                                    imprimir = '<div class="p-1">'+
                                        '<a href="#!" title="Imprimir">'+
                                            '<span class="glyphicon glyphicon-print imprimir" data-id="'+element.id+'"></span>'+
                                        '</a>'+
                                    '</div>';
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
                            '<center>'+element.estatus_nombre+'</center>',
                            '<div class="d-flex justify-content-center" >'+
                                enviar+
                                enviar_whats+
                                imprimir +
                                extender +
                                duplicar+
                                consultar+
                                eliminar+
                            '</div>'
                        ]).draw(false)
                    });
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
    eliminar_registro(ev){
        localStorage.setItem("id_permiso", ev.target.dataset.id);
        pedir_confirmacion_eliminar_motivo();
    }
    consultar_registro(ev){
        localStorage.setItem("id_permiso", ev.target.dataset.id);
        localStorage.setItem("url_regreso", 'Permisos/Ctrl_Permisos/index_autorizadores');
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
}

const per = new Permisos()

$(tabPermisos).on('click', '.ver', function(ev){
    per.consultar_registro(ev);
});
$(tabPermisos).on('click', '.eliminar', function(ev){
    per.eliminar_registro(ev);
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