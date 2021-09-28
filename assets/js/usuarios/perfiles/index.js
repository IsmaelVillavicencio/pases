var DTPerfiles;
class Perfiles{
	constructor(){
        this.inicio();
        this.obtenerDatosTabla();
	}
	inicio(){
		DTPerfiles = $(tabperfiles).DataTable( {
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
			},
			"order": [[ 1, "asc" ],[0, 'asc']]
        });
        confirmar_baja.addEventListener("click",this.confirmarbaja)
        confirmar_reactivar_registro.addEventListener("click",this.confirmarreactivar)
    }
    obtenerDatosTabla(){
        $.ajax({
			url: base_url+'Usuarios/Ctrl_Perfiles/getAll',
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
                                '<span class="glyphicon glyphicon-eye-open ver" data-id="'+element.id+'"></span>'+
                            '</a>'+
                        '</div>';
                        }
                        if(U){
                            modificar = '<div class="p-1">'+
                            '<a href="#!" title="Modificar">'+
                                '<span class="glyphicon glyphicon-pencil editar" data-id="'+element.id+'"></span>'+
                            '</a>'+
                        '</div>';
                        }
                        if(D){
                            eliminar = '<div class="p-1">'+
                            '<a href="#!" title="Dar de baja">'+
                                '<span class="glyphicon glyphicon-trash eliminar" data-id="'+element.id+'"></span>'+
                            '</a>'+
                        '</div>';
                        }
                        reactivar = '<div class="p-1">'+
                            '<a href="#!" title="Reactivar">'+
                                '<span class="glyphicon glyphicon-ok-circle reactivar" data-id="'+element.id+'"></span>'+
                            '</a>'+
                        '</div>';
                        DTPerfiles.row.add([
                            '<center>'+element.nombre+'</center>',
                            '<center>'+(element.estatus == 1 ? 'Activo': 'Inactivo')+'</center>',
                            (element.estatus == 1) ? '<div class="d-flex justify-content-center">'+
                                consultar+
                                modificar+
                                eliminar+ 
                            '</div>' : '<div class="d-flex justify-content-center">'+ consultar + reactivar + '</div>'+
                            '</div>'
                        ]).draw(false)
                    });
                }else{
                    response.data.forEach(element => {
                        DTPerfiles.row.add([
                            '<center>'+element.nombre+'</center>',
                            '<center>'+(element.estatus == 1 ? 'Activo': 'Inactivo')+'</center>',
                        ]).draw(false)
                    });
                }
			}
		}).fail( function(response) {
			
		});
    }
    ver_registro(ev){
        localStorage.setItem("id_perfil", ev.target.dataset.id);
        window.location.href= base_url + "Usuarios/Ctrl_Perfiles/consultar";
    }
	editar_registro(ev){
        localStorage.setItem("id_perfil", ev.target.dataset.id);
        window.location.href= base_url + "Usuarios/Ctrl_Perfiles/modificar";
    }
    eliminar_registro(ev){
        localStorage.setItem("id_perfil", ev.target.dataset.id);
        pedir_confirmacion_eliminar();
    }
    reactivar_registro(ev){
        localStorage.setItem("id_perfil", ev.target.dataset.id);
        pedir_confirmacion_reactivar();
    }

	confirmarbaja(ev){
        const id_perfil = localStorage.getItem("id_perfil");
		$.ajax({
            url: base_url + 'Usuarios/Ctrl_Perfiles/delete',
            type: "POST",
            data: {
                idperfil: id_perfil,
                [csrf.name] : csrf.value
            },
            beforeSend:function(){
                DTPerfiles.clear().draw();
                $("#modal_confirmar_baja").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    registro_exitoso(data.message);
                    Perfiles.prototype.obtenerDatosTabla();
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
        const id_perfil = localStorage.getItem("id_perfil");
		$.ajax({
            url: base_url + 'Usuarios/Ctrl_Perfiles/active',
            type: "POST",
            data: {
                idperfil: id_perfil,
                [csrf.name] : csrf.value,
            },
            beforeSend: function(){
                DTPerfiles.clear().draw();
                $("#modal_confirmar_reactivar").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    reactivar_exitoso(data.message);
                    Perfiles.prototype.obtenerDatosTabla();
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

const perf = new Perfiles()

$(tabperfiles).on('click', '.ver', function(ev){
    perf.ver_registro(ev);
});

$(tabperfiles).on('click', '.editar', function(ev){
    perf.editar_registro(ev);
});

$(tabperfiles).on('click', '.eliminar', function(ev){
    perf.eliminar_registro(ev);
});
$(tabperfiles).on('click', '.reactivar', function(ev){
    perf.reactivar_registro(ev);
});