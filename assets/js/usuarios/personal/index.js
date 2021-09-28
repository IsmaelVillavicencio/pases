var DTPersonal;
class Personal{
	constructor(){
        this.inicio();
        this.obtenerDatosTabla();
	}
	inicio(){
		DTPersonal = $(tabpersonal).DataTable( {
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
			},
			"order": [[ 2, "asc" ],[0, 'asc']]
        });
        confirmar_baja.addEventListener("click",this.confirmarbaja)

    }
    obtenerDatosTabla(){
        $.ajax({
			url: base_url+'Usuarios/Ctrl_Personal/getAll',
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
                                '<span class="glyphicon glyphicon-eye-open ver" data-id="'+element.id+'" data-domicilio="'+element.id_domicilio+'" data-contacto="'+element.id_tipo_contacto+'" ></span>'+
                            '</a>'+
                        '</div>';
                        }
                        if(U){
                            modificar = '<div class="p-1">'+
                            '<a href="#!" title="Modificar">'+
                                '<span class="glyphicon glyphicon-pencil editar" data-id="'+element.id+'" ></span>'+
                            '</a>'+
                        '</div>';
                        }
                        if(D){
                            eliminar = '<div class="p-1">'+
                            '<a href="#!" title="Dar de baja">'+
                                '<span class="glyphicon glyphicon-trash eliminar" data-id="'+element.id+'" data-domicilio="'+element.id_domicilio+'" data-contacto="'+element.id_tipo_contacto+'"></span>'+
                            '</a>'+
                        '</div>';
                        }
                        reactivar = '<div class="p-1">'+
                            '<a href="#!" title="Reactivar">'+
                                '<span class="glyphicon glyphicon-ok-circle reactivar" data-id="'+element.id+'" data-domicilio="'+element.id_domicilio+'" data-contacto="'+element.id_tipo_contacto+'" ></span>'+
                            '</a>'+
                        '</div>';
                        DTPersonal.row.add([
                            '<center>'+element.nombre+' '+element.primer_apellido+' '+element.segundo_apellido+'</center>',
                            '<center>'+(element.puestos ==  null ? '': element.puestos)+'</center>',
                            '<center>'+(element.estatus == 1 ? 'Activo': 'Inactivo')+'</center>',
                            (element.estatus == 1) ? '<div class="d-flex justify-content-center" >'+
                                consultar+
                                modificar+
                                eliminar+                                
                            '</div>' : '<div class="d-flex justify-content-center" >'+ consultar + reactivar + '</div>'+
                            '</div>'
                        ]).draw(false)
                    });
                }else{
                    response.data.forEach(element => {
                        DTPersonal.row.add([
                            '<center>'+element.nombre+' '+element.primer_apellido+' '+element.segundo_apellido+'</center>',
                            '<center>'+(element.puestos ==  null ? '"': element.puestos)+'</center>',
                            '<center>'+(element.estatus == 1 ? 'Activo': 'Inactivo')+'</center>',
                        ]).draw(false)
                    });
                }
			}
		}).fail( function(response) {
			
		});
    }
    ver_registro(ev){
        localStorage.setItem("id_personal", ev.target.dataset.id);
        localStorage.setItem("id_domicilio", ev.target.dataset.domicilio);
        localStorage.setItem("id_contacto", ev.target.dataset.contacto);
        window.location.href= base_url + "Usuarios/Ctrl_Personal/consultar";
    }
	editar_registro(ev){
        localStorage.setItem("id_personal", ev.target.dataset.id);
        window.location.href= base_url + "Usuarios/Ctrl_Personal/modificar";
    }
    eliminar_registro(ev){
        localStorage.setItem("id_personal", ev.target.dataset.id);
        localStorage.setItem("id_domicilio", ev.target.dataset.domicilio);
        localStorage.setItem("id_contacto", ev.target.dataset.contacto);
        pedir_confirmacion_eliminar();
    }
    reactivar_registro(ev){
        localStorage.setItem("id_personal", ev.target.dataset.id);
        localStorage.setItem("id_domicilio", ev.target.dataset.domicilio);
        localStorage.setItem("id_contacto", ev.target.dataset.contacto);
        window.location.href= base_url + "Usuarios/Ctrl_Personal/reactivar";
    }
	confirmarbaja(ev){
        const id_personal = localStorage.getItem("id_personal");
        const id_domicilio = localStorage.getItem("id_domicilio");
        const id_contacto = localStorage.getItem("id_contacto");
		$.ajax({
            url: base_url + 'Usuarios/Ctrl_Personal/delete',
            type: "POST",
            data: {
                idpersonal: id_personal,
                iddomicilio: id_domicilio,
                idcontacto: id_contacto,
                [csrf.name] : csrf.value
            },
            beforeSend:function(){
                DTPersonal.clear().draw();
                $("#modal_confirmar_baja").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    registro_exitoso(data.message);
                    Personal.prototype.obtenerDatosTabla();
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

}

const pers = new Personal()

$(tabpersonal).on('click', '.ver', function(ev){
    pers.ver_registro(ev);
});

$(tabpersonal).on('click', '.editar', function(ev){
    pers.editar_registro(ev);
});

$(tabpersonal).on('click', '.eliminar', function(ev){
    pers.eliminar_registro(ev);
});

$(tabpersonal).on('click', '.reactivar', function(ev){
    pers.reactivar_registro(ev);
});