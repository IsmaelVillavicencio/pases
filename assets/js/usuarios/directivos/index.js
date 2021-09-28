var DTDirectivos;
class Directivos{
    constructor(){
        this.inicio();
        this.obtener_datos();
    }
    inicio(){
        DTDirectivos = $(tabRegistroDirectivo).DataTable( {
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
			},
			"order": [[ 2, "asc" ],[0, 'asc']]
        });
        confirmar_baja.addEventListener("click",this.confirmarbaja)
        confirmar_reactivar_registro.addEventListener("click",this.confirmarreactivar)
    }
    obtener_datos(){
        $.ajax({
			url: base_url+'Usuarios/Ctrl_Directivos/getAll',
			type: 'GET',
			dataType: 'json',
			success: function(response){
                if(R || U || D){
                    let eliminar = '';
                    let modificar = '';
                    let consultar = '';
                    let reactivar = '';
                    response.data.forEach(element => {
                        if(R){
                            consultar = '<div class="p-1">'+
                            '<a href="#!" title="Consultar">'+
                                '<span class="glyphicon glyphicon-eye-open ver" data-id="'+element.id_directivo+'" data-idpersona="'+element.id_persona+'" data-idnombramiento="'+element.id_nombramiento+'" data-personalidad="'+element.personalidad+'" data-estatus="'+element.estatus_directivos+'"></span>'+
                            '</a>'+
                        '</div>';
                        }
                        if(U){
                            modificar = '<div class="p-1">'+
                            '<a href="#!" title="Modificar">'+
                                '<span class="glyphicon glyphicon-pencil editar" data-id="'+element.id_directivo+'" data-idpersona="'+element.id_persona+'" data-idnombramiento="'+element.id_nombramiento+'" data-personalidad="'+element.personalidad+'"></span>'+
                            '</a>'+
                        '</div>';
                        }
                        if(D){
                            eliminar = '<div class="p-1">'+
                            '<a href="#!" title="Dar de baja">'+
                                '<span class="glyphicon glyphicon-trash eliminar" data-id="'+element.id_directivo+'"></span>'+
                            '</a>'+
                        '</div>';
                        }
                        reactivar = '<div class="p-1">'+
                            '<a href="#!" title="Reactivar">'+
                                '<span class="glyphicon glyphicon-ok-circle reactivar" data-id="'+element.id_directivo+'"></span>'+
                            '</a>'+
                        '</div>';
                        DTDirectivos.row.add([
                            '<center>'+element.personal+'</center>',
                            '<center>'+element.nombramiento+'</center>',
                            '<center>'+(element.estatus_directivos == 1 ? 'Activo': 'Inactivo')+'</center>',
                            (element.estatus_directivos == 1) ? '<div class="d-flex justify-content-center">'+
                                consultar+
                                modificar+
                                eliminar+
                            '</div>' :  '<div class="d-flex justify-content-center">'+ consultar + reactivar + '</div>'+
                            '</div>'
                        ]).draw(false)
                    });
                }else{
                    response.data.forEach(element => {
                        DTDirectivos.row.add([
                            '<center>'+element.personal+'</center>',
                            '<center>'+element.nombramiento+'</center>',
                            
                            '<center>'+(element.estatus_directivos == 1 ? 'Activo': 'Inactivo')+'</center>',
                        ]).draw(false)
                    });
                }
			}
		}).fail( function(response) {
			
		}); 
    }

    editar_registro(ev){
        localStorage.setItem("id_directivo", ev.target.dataset.id);
        localStorage.setItem("id_persona", ev.target.dataset.idpersona);
        localStorage.setItem("personalidad", ev.target.dataset.personalidad);
        localStorage.setItem("id_nombramiento", ev.target.dataset.idnombramiento);
        window.location.href= base_url + "Usuarios/Ctrl_Directivos/modificar";
 
    }
    consultar_registro(ev){
        localStorage.setItem("id_directivo", ev.target.dataset.id);
        localStorage.setItem("id_persona", ev.target.dataset.idpersona);
        localStorage.setItem("personalidad", ev.target.dataset.personalidad);
        localStorage.setItem("id_nombramiento", ev.target.dataset.idnombramiento);
        localStorage.setItem("estatus_directivo", ev.target.dataset.estatus);
        window.location.href= base_url + "Usuarios/Ctrl_Directivos/consultar";
 
    }
    eliminar_registro(ev){
        localStorage.setItem("id_directivo", ev.target.dataset.id);
        pedir_confirmacion_eliminar();
    }

    reactivar_registro(ev){
        localStorage.setItem("id_directivo", ev.target.dataset.id);
        pedir_confirmacion_reactivar();
    }

    confirmarbaja(ev){
        const id_directivo = localStorage.getItem("id_directivo");
		$.ajax({
            url: base_url + 'Usuarios/Ctrl_Directivos/delete',
            type: "POST",
            data: {
                iddirectivo: id_directivo,
                [csrf.name] : csrf.value
            },
            beforeSend:function(){
                DTDirectivos.clear().draw();
                $("#modal_confirmar_baja").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    registro_exitoso(data.message);
                    Directivos.prototype.obtener_datos();
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
        const id_directivo = localStorage.getItem("id_directivo");
		$.ajax({
            url: base_url + 'Usuarios/Ctrl_Directivos/active',
            type: "POST",
            data: {
                iddirectivo: id_directivo,
                [csrf.name] : csrf.value,
            },
            beforeSend: function(){
                DTDirectivos.clear().draw();
                $("#modal_confirmar_reactivar").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    reactivar_exitoso(data.message);
                    Directivos.prototype.obtener_datos();
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
const dir = new Directivos()

$(tabRegistroDirectivo).on('click', '.editar', function(ev){
    dir.editar_registro(ev);
});
$(tabRegistroDirectivo).on('click', '.ver', function(ev){
    dir.consultar_registro(ev);
});
$(tabRegistroDirectivo).on('click', '.eliminar', function(ev){
    dir.eliminar_registro(ev);
});
$(tabRegistroDirectivo).on('click', '.reactivar', function(ev){
    dir.reactivar_registro(ev);
});