var DTUsuarios;
class Usuarios{
	constructor(){
        this.inicio();
        this.obtenerDatosTabla();
	}
	inicio(){
		DTUsuarios = $(tabRegistroUsuario).DataTable( {
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
			},
			"order": [[ 1, "asc" ],[0, 'asc']],
        });
        confirmar_baja.addEventListener("click",this.confirmarbaja)
        confirmar_reactivar_registro.addEventListener("click",this.confirmarreactivar)
        confirmar_uppassword.addEventListener('click',this.confirmaractualizarPassword)
    }
    obtenerDatosTabla(){
        $.ajax({
			url: base_url+'Usuarios/Ctrl_Usuarios/getAll',
			type: 'GET',
			dataType: 'json',
			success: function(response){
                if(R || U || D){
                    let eliminar = '';
                    let modificar = '';
                    let consultar = '';
                    let reactivar = '';
                    let uppassword = '';
                    response.data.forEach(element => {
                        if(R){
                            consultar = '<div class="p-1">'+
                            '<a href="#!" title="Consultar">'+
                                '<span class="glyphicon glyphicon-eye-open ver" data-id="'+element.id_usuario+'"></span>'+
                            '</a>'+
                        '</div>';
                        }
                        if(U){
                            modificar = '<div class="p-1">'+
                            '<a href="#!" title="Modificar">'+
                                '<span class="glyphicon glyphicon-pencil editar" data-id="'+element.id_usuario+'"></span>'+
                            '</a>'+
                        '</div>';
                        }
                        if(D){
                            eliminar = '<div class="p-1">'+
                            '<a href="#!" title="Dar de baja">'+
                                '<span class="glyphicon glyphicon-trash eliminar" data-id="'+element.id_usuario+'"></span>'+
                            '</a>'+
                        '</div>';
                        }
                        reactivar = '<div class="p-1">'+
                            '<a href="#!" title="Reactivar">'+
                                '<span class="glyphicon glyphicon-ok-circle reactivar" data-id="'+element.id_usuario+'"></span>'+
                            '</a>'+
                        '</div>';
                        uppassword = '<div class="p-1">'+
                            '<a href="#!" title="Password">'+
                                '<span class="glyphicon glyphicon-lock updatepassword" data-id="'+element.id_usuario+'"></span>'+
                            '</a>'+
                        '</div>';

                        DTUsuarios.row.add([
                            '<center>'+element.nombre_completo+'</center>',
                            '<center>'+ (element.puesto == null ? '' : element.puesto ) +'</center>',
                            '<center>'+(element.estatus_usuario == 1 ? 'Activo': 'Inactivo')+'</center>',
                            (element.estatus_usuario == 1) ? '<div class="d-flex justify-content-center">'+ 
                                consultar+
                                modificar+
                                eliminar+
                                uppassword+  
                            '</div>' : '<div class="d-flex justify-content-center">'+ consultar + reactivar + '</div>'+
                            '</div>'
                        ]).draw(false)
                    });
                }else{
                    response.data.forEach(element => {
                        DTUsuarios.row.add([
                            '<center>'+element.nombre_completo+'</center>',
                            '<center>'+'puesto'+'</center>',
                            '<center>'+(element.estatus_usuario == 1 ? 'Activo': 'Inactivo')+'</center>',
                        ]).draw(false)
                    });
                }
			}
		}).fail( function(response) {
			
		});
    }
    ver_registro(ev){
        localStorage.setItem("id_usuario", ev.target.dataset.id);
        window.location.href= base_url + "Usuarios/Ctrl_Usuarios/consultar";
    }
	editar_registro(ev){
        localStorage.setItem("id_usuario", ev.target.dataset.id);
        window.location.href= base_url + "Usuarios/Ctrl_Usuarios/modificar";
    }
    eliminar_registro(ev){
        localStorage.setItem("id_usuario", ev.target.dataset.id);
        pedir_confirmacion_eliminar();
    }
    reactivar_registro(ev){
        localStorage.setItem("id_usuario", ev.target.dataset.id);
        pedir_confirmacion_reactivar();
    }
    actualizar_password(ev){
        localStorage.setItem("id_usuario", ev.target.dataset.id);
        pedir_confirmacion_uppassword();
    }

    confirmaractualizarPassword(ev){    
        const id_usuario = localStorage.getItem("id_usuario");
        console.log(id_usuario)
        $.ajax({
            url: base_url + 'Usuarios/Ctrl_Usuarios/updatePassword',
            type: "POST",
            global: false,
            data: {
                idusuario: id_usuario,
                [csrf.name] : csrf.value
            },
            beforeSend:function(){
                DTUsuarios.clear().draw();
                $("#modal_confirmar_uppassword").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    registro_exitoso(data.message);
                    Usuarios.prototype.obtenerDatosTabla();
                    console.log(response.data)
                }
                else
                    peticion_fallida(data.message);
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $("#modal_confirmar_uppassword").modal("hide");
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        })



    }

	confirmarbaja(ev){
        const id_usuario = localStorage.getItem("id_usuario");
		$.ajax({
            url: base_url + 'Usuarios/Ctrl_Usuarios/delete',
            type: "POST",
            global: false,
            data: {
                idusuario: id_usuario,
                [csrf.name] : csrf.value
            },
            beforeSend:function(){
                DTUsuarios.clear().draw();
                $("#modal_confirmar_baja").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    registro_exitoso(data.message);
                    Usuarios.prototype.obtenerDatosTabla();
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
        const id_usuario = localStorage.getItem("id_usuario");
		$.ajax({
            url: base_url + 'Usuarios/Ctrl_Usuarios/active',
            type: "POST",
            data: {
                idusuario: id_usuario,
                [csrf.name] : csrf.value,
            },
            beforeSend: function(){
                DTUsuarios.clear().draw();
                $("#modal_confirmar_reactivar").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    reactivar_exitoso(data.message);
                    Usuarios.prototype.obtenerDatosTabla();
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

const usua = new Usuarios()

$(tabRegistroUsuario).on('click', '.ver', function(ev){
    usua.ver_registro(ev);
});
$(tabRegistroUsuario).on('click', '.editar', function(ev){
    usua.editar_registro(ev);
});
$(tabRegistroUsuario).on('click', '.eliminar', function(ev){
    usua.eliminar_registro(ev);
});
$(tabRegistroUsuario).on('click', '.reactivar', function(ev){
    usua.reactivar_registro(ev);
});
$(tabRegistroUsuario).on('click', '.updatepassword', function(ev){
    usua.actualizar_password(ev);
});