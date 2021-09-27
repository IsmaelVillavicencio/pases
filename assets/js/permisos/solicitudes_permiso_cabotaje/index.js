var DTSolicitudesPermiso
class Administrar{
    constructor(){
        this.inicio();
        this.obtener_datos_tabla();
    }
    inicio(){
        DTSolicitudesPermiso = $(tabSolicitudesPermiso).DataTable( {
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
			},
			"order": []
        });
        confirmar_baja.addEventListener('click',this.cancelar)
    }
    obtener_datos_tabla(){
        $.ajax({
			url: base_url,
			type: 'GET',
			dataType: 'json',
			success: function(response){
                    let consultar = ";"
                    let extender = "";
                    let cancelar = "";
                    let enviar = "";
                    let imprimir = "";
                    response.data.forEach(element => {
                        
                        consultar = '<div class="p-1">'+
                            '<a href="#!" title="Consultar">'+
                                '<span class="glyphicon glyphicon-eye-open ver" data-id="'+element.id+'"></span>'+
                            '</a>'+
                        '</div>';
                        autorizar = '<div class="p-1">'+
                            '<a href="#!" title="Autorizar">'+
                                '<span class="glyphicon glyphicon-list-alt autorizar" data-id="'+element.id+'"></span>'+
                            '</a>'+
                        '</div>';    
                        cancelar = '<div class="p-1">'+
                            '<a href="#!" title="Dar de baja">'+
                                '<span class="glyphicon glyphicon-trash cancelar" data-id="'+element.id+'"></span>'+
                            '</a>'+
                        '</div>';
                        enviar = '<div class="p-1">'+
                            '<a href="#!" title="Reactivar">'+
                                '<span class="glyphicon glyphicon-envelope enviar" data-id="'+element.id+'"></span>'+
                            '</a>'+
                        '</div>';
                        imprimir = '<div class="p-1">'+
                            '<a href="#!" title="Reactivar">'+
                                '<span class="glyphicon glyphicon-print imprimir" data-id="'+element.id+'"></span>'+
                            '</a>'+
                        '</div>';
                        DTSolicitudesPermiso.row.add([
                            '<center>'+element.oooooo+'</center>',
                            '<center>'+element.oooooo+'</center>',
                            '<center>'+element.oooooo+'</center>',
                            '<center>'+(element.estatus == 1 ? 'Activo': 'Inactivo')+'</center>',
                            (element.estatus_directivos == 1) ? '<div class="d-flex justify-content-center">'+
                             consultar+
                             autorizar+
                             cancelar+
                             enviar+
                             imprimir+
                            '</div>' :  '<div class="d-flex justify-content-center">'+ consultar + enviar + '</div>'+
                            '</div>'
                        ]).draw(false)
                    });
               
           }
		}).fail( function(response) {
			
		}); 
    }
    consultar_solicitud(ev){
        localStorage.setItem("id_solicitud",ev.target,dataset.id)
        window.location.href = base_url + 'Transportes/Ctrl_SolicitudesPermisoCabotaje/consultar'
    }
    autorizar_solicitud(ev){
        localStorage.setItem("id_solicitud",ev.target,dataset.id)
        window.location.href = base_url + 'Transportes/Ctrl_SolicitudesPermisoCabotaje/autorizar'
    }
    cancelar_solicitud(ev){
        localStorage.setItem("id_solicitud",ev.target,dataset.id)
        pedir_confirmacion_eliminar_motivo()
    }
    imprimir_solicitud(ev){
        localStorage.setItem("id_solicitud",ev.target,dataset.id)
    }
    enviar(ev){
        localStorage.setItem("id_solicitud",ev.target,dataset.id)
    }

    cancelar(ev){
        const id_solicitud = localStorage.getItem("id_solicitud");
		$.ajax({
            //url: base_url + '',
            type: "POST",
            data: {
                id: id_solicitud,
                [csrf.name] : csrf.value
            },
            beforeSend:function(){
                DTSolicitudesPermiso.clear().draw();
                $("#modal_confirmar_baja_motivo").modal("hide");
            },
            success: function(data) {
                csrf.value = data.token;
                if(data.status == true){
                    registro_exitoso(data.message);
                    Administrar.prototype.obtener_datos_tabla();
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
const admin = new Administrar()

$(tabSolicitudesPermiso).on('click', '.consultar', function(ev){
    admin.consultar_solicitud(ev)
  });
$(tabSolicitudesPermiso).on('click', '.extender', function(ev){
    admin.autorizar_solicitud(ev)
})
$(tabSolicitudesPermiso).on('click', '.cancelar', function(ev){
    admin.cancelar_solicitud(ev)
})
$(tabSolicitudesPermiso).on('click', '.enviar', function(ev){
    admin.enviar_solicitud(ev)
})
$(tabSolicitudesPermiso).on('click', '.imprimir', function(ev){
    admin.imprimir_solicitud(ev)
})
