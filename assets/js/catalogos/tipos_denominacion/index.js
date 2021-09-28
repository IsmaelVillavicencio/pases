var DTTiposDenominaciones;
class TiposDenominacion {
    constructor(){
        this.inicio();
        this.datosTabla();
    }
    inicio(){
       DTTiposDenominaciones = $(tabRegistroTipoDenominacion).DataTable({
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                },
                "order": [[ 1, "asc" ],[0, 'asc']]
        });
        confirmar_baja.addEventListener("click",this.confirmarbaja)
        confirmar_reactivar_registro.addEventListener("click",this.confirmarreactivar)
    }
    datosTabla(){
        $.ajax({
			url: base_url_rest+'catalogos/denominacion',
			type: 'GET',
			dataType: 'json',
			success: function(response){
                if(U || D){
                    let eliminar = '';
                    let modificar = '';
                    let reactivar = '';
                    response.data.forEach(element => {
                        if(U){
                            modificar = '<div class="p-1">'+
                            '<a href="#!" title="Modificar">'+
                                '<span class="glyphicon glyphicon-pencil editar" aria-hidden="true" data-id="'+element.id+'" data-nombre="'+element.nombre+'"></span>'+
                            '</a>'+
                        '</div>';
                        }
                        if(D){
                            eliminar = '<div class="p-1">'+
                            '<a href="#!" title="Dar de baja">'+
                                '<span class="glyphicon glyphicon-trash eliminar" aria-hidden="true" data-id="'+element.id+'"></span>'+
                            '</a>'+
                        '</div>';
                        }
                        DTTiposDenominaciones.row.add([
                            '<center>'+element.nombre+'</center>',
                            '<center>'+(element.estatus == 1 ? 'Activo': 'Inactivo')+'</center>',
                            (element.estatus == 1) ? '<div class="d-flex justify-content-center">'+
                                modificar+
                                eliminar+
                            '</div>' : '<div class="p-1 text-center">'+
                                '<a href="#!" title="Reactivar">'+
                                    '<span class="glyphicon glyphicon-ok-circle reactivar" aria-hidden="true" data-id="'+element.id+'"></span>'+
                                '</a>'+
                            '</div>'
                        ]).draw(false)
                    });
                }else{
                    response.data.forEach(element => {
                        DTTiposDenominaciones.row.add([
                            '<tr>'+element.nombre+'</tr>',
                            '<center>'+(element.estatus == 1 ? 'Activo': 'Inactivo')+'</center>',
                        ]).draw(false)
                    });
                }
			}
		}).fail( function(response) {
			
		});
    }
	editar_registro(ev){
        localStorage.setItem("id_TipoDenominacion", ev.target.dataset.id);
        localStorage.setItem("nombre_denominacion", ev.target.dataset.nombre);
        window.location.href= base_url + "Catalogos/Ctrl_TiposDenominacion/modificar";
    }
    eliminar_registro(ev){
        localStorage.setItem("id_TipoDenominacion", ev.target.dataset.id);
        pedir_confirmacion_eliminar();
    }
    reactivar_registro(ev){
        localStorage.setItem("id_TipoDenominacion", ev.target.dataset.id);
        pedir_confirmacion_reactivar();
    }
	confirmarbaja(ev){
        const id_TipoDenominacion = localStorage.getItem("id_TipoDenominacion");
		$.ajax({
            url: base_url_rest+'catalogos/denominacion/'+id_TipoDenominacion,
            type: "DELETE",
            data: JSON.stringify({
                ip          : ip_address,
                idusuario   : id_usuario_sesion
            }),
            beforeSend:function(){
                DTTiposDenominaciones.clear().draw();
                $("#modal_confirmar_baja").modal("hide");
            },
            success: (data) => {
                if(data.status == true){
                    registro_exitoso(data.message);
                    TiposDenominacion.prototype.datosTabla();
                }else {
                    peticion_fallida(data.message);
                }
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $("#modal_confirmar_baja").modal("hide");
                peticion_fallida(thrownError);
            }
        })
    }
    confirmarreactivar(ev){
        const id_TipoDenominacion = localStorage.getItem("id_TipoDenominacion");
		$.ajax({
            url: base_url_rest+'catalogos/denominacion/en/'+id_TipoDenominacion,
            type: "PUT",
            data: JSON.stringify({
                ip          : ip_address,
                idusuario   : id_usuario_sesion
            }),
            beforeSend: function(){
                DTTiposDenominaciones.clear().draw();
                $("#modal_confirmar_reactivar").modal("hide");
            },
            success: (data) => {
                if(data.status == true){
                    reactivar_exitoso(data.message);
                    TiposDenominacion.prototype.datosTabla();
                }else{
                    peticion_fallida(data.message);
                }
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $("#modal_confirmar_reactivar").modal("hide");
                peticion_fallida(thrownError);
            }
        })
	}
}

const tipDen = new TiposDenominacion()

$(tabRegistroTipoDenominacion).on('click', '.editar', function(ev){
    tipDen.editar_registro(ev);
});

$(tabRegistroTipoDenominacion).on('click', '.eliminar', function(ev){
    tipDen.eliminar_registro(ev);
});
$(tabRegistroTipoDenominacion).on('click', '.reactivar', function(ev){
    tipDen.reactivar_registro(ev);
});
