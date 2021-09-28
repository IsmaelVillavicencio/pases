var DTDocumentos;
class Documentos{
	constructor(){
        this.inicio();
        this.obtenerDatosTabla();
	}
	inicio(){
		DTDocumentos = $(tabRegistroDocumentos).DataTable( {
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
			},
			"order": [[ 5, "asc" ],[0, 'asc']]
        });
        confirmar_baja.addEventListener("click",this.confirmarbaja)
        confirmar_reactivar_registro.addEventListener("click",this.confirmarreactivar)
    }
    obtenerDatosTabla(){
        $.ajax({
			url: base_url+'Catalogos/Ctrl_Documentos/getAll',
			type: 'GET',
			dataType: 'json',
			success: function(response){
                if(U || D){
                    let eliminar = '';
                    let modificar = '';
                    response.data.forEach(element => {
                        if(U){
                            modificar = '<div class="p-1">'+
                            '<a href="#!" title="Modificar">'+
                                '<span class="glyphicon glyphicon-pencil editar" aria-hidden="true" data-id="'+element.id_documentos+'" data-idtipo="'+element.id_tipo_documentos+'" data-idtipopersona="'+element.id_persona+'" data-nombre="'+element.nombre_documentos+'" data-areas="'+element.ids_area_supervisor+'" data-etapa="'+element.estatus_revision+'" data-vigencia="'+element.estatus_captura_vigencia+'"></span>'+
                            '</a>'+
                        '</div>';
                        }
                        if(D){
                            eliminar = '<div class="p-1">'+
                            '<a href="#!" title="Dar de baja">'+
                                '<span class="glyphicon glyphicon-trash eliminar" aria-hidden="true" data-id="'+element.id_documentos+'"></span>'+
                            '</a>'+
                        '</div>';
                        }

                        let areas = (element.area_supervisor != "") ? element.area_supervisor.replace(/,/g,", ") : '';
                        DTDocumentos.row.add([
                            element.nombre_documentos,
                            '<center>'+element.nombre_tipo_documentos+'</center>',
                            '<center>'+(element.tipo_persona == null ? '' : element.tipo_persona)+'</center>',
                            '<center>'+areas+'</center>',
                            '<center>'+(element.estatus_revision == 1 ? 'Etapa 1': 'Etapa 2' ) +'</center>',
                            '<center>'+(element.estatus_documentos == 1 ? 'Activo': 'Inactivo')+'</center>',
                            (element.estatus_documentos == 1) ? '<div class="d-flex justify-content-center" >'+
                                modificar+
                                eliminar+
                            '</div>' : '<div class="p-1 text-center">'+
                            '<a href="#!" title="Reactivar">'+
                                '<span class="glyphicon glyphicon-ok-circle reactivar" aria-hidden="true" data-id="'+element.id_documentos+'"></span>'+
                            '</a>'+
                        '</div>'
                        ]).draw(false)
                    });
                }else{
                    response.data.forEach(element => {
                        DTDocumentos.row.add([
                            element.nombre_documentos,
                            '<center>'+element.nombre_tipo_documentos+'</center>',
                            '<center>'+(element.tipo_persona == null ? '' : element.tipo_persona)+'</center>',
                            '<center>'+areas+'</center>',
                            '<center>'+element.estatus_revision+'</center>',
                            '<center>'+(element.estatus_documentos == 1 ? 'Activo': 'Inactivo')+'</center>'
                        ]).draw(false)
                    });
                }
			}
		}).fail( function(response) {
	
		});
    }

	editar_registro(ev){
        localStorage.setItem("id_documento", ev.target.dataset.id);
        localStorage.setItem("id_tipo_documento", ev.target.dataset.idtipo);
        localStorage.setItem("id_tipo_persona", ev.target.dataset.idtipopersona);
        localStorage.setItem("nombre_documento", ev.target.dataset.nombre);
        localStorage.setItem("areas", ev.target.dataset.areas);
        localStorage.setItem("etapa", ev.target.dataset.etapa);
        localStorage.setItem("vigencia", ev.target.dataset.vigencia)
        window.location.href= base_url + "Catalogos/Ctrl_Documentos/modificar";
    }
    eliminar_registro(ev){
        localStorage.setItem("id_documento", ev.target.dataset.id);
        pedir_confirmacion_eliminar();
    }
    reactivar_registro(ev){
        localStorage.setItem("id_documento", ev.target.dataset.id);
        pedir_confirmacion_reactivar();

    }
	confirmarbaja(ev){
        const id_documento = localStorage.getItem("id_documento");
		$.ajax({
            url: base_url + 'Catalogos/Ctrl_Documentos/delete',
            type: "POST",
            data: {
                iddocumento: id_documento,
                [csrf.name] : csrf.value,
            },
            beforeSend: function(){
                DTDocumentos.clear().draw();
                $("#modal_confirmar_baja").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    registro_exitoso(data.message);
                    Documentos.prototype.obtenerDatosTabla();
                }
                else
                    peticion_fallida(data.message);
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $("#modal_confirmar_baja").modal("hide");
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        })
	}

    confirmarreactivar(ev){
        const id_documento = localStorage.getItem("id_documento");
		$.ajax({
            url: base_url + 'Catalogos/Ctrl_Documentos/active',
            type: "POST",
            data: {
                iddocumento: id_documento,
                [csrf.name] : csrf.value,
            },
            beforeSend: function(){
                DTDocumentos.clear().draw();
                $("#modal_confirmar_reactivar").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    reactivar_exitoso(data.message);
                    Documentos.prototype.obtenerDatosTabla();
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

}

const doc = new Documentos()

$(tabRegistroDocumentos).on('click', '.editar', function(ev){
    doc.editar_registro(ev);
});

$(tabRegistroDocumentos).on('click', '.eliminar', function(ev){
    doc.eliminar_registro(ev);
});

$(tabRegistroDocumentos).on('click', '.reactivar', function(ev){
    doc.reactivar_registro(ev);
});