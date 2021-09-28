let DTIdentidades
class Aministrador{
    constructor(){
        this.inicio()
        this.obtenerDatosTabla()
    }
    inicio(){
        DTIdentidades = $(tabEquipos).DataTable( {
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
			},
			"order": [[ 0, "asc" ],[3, 'asc']]
        });

        confirmar_baja.addEventListener("click",this.confirmarbaja)
        confirmar_reactivar_registro.addEventListener("click",this.confirmarreactivar)
    }
    obtenerDatosTabla(){
        $.ajax({
			url: base_url+'Credencializacion/Ctrl_Equipos/getAll',
			type: 'GET',
			dataType: 'json',
			success: function(response){
                //if(U || D){
                    response.data.forEach(element => {
                        let consultar = "";
                        let editar = "";
                        let eliminar = "";
                        let autorizar = "";

                        consultar = '<div class="p-1">'+
                            '<a href="#!" title="Consultar">'+
                                '<span class="glyphicon glyphicon-eye-open ver" data-id="'+element.id+'" alt="Papelera">'+'</span>'+
                            '</a>'+
                        '</div>';

                        editar = '<div class="p-1">'+
                            '<a href="#!" title="Modificar">'+
                                '<span class="glyphicon glyphicon-pencil editar" data-id="'+element.id+'" alt="Editar">'+'</span>'+
                            '</a>'+
                        '</div>';

                        eliminar = '<div class="p-1">'+
                            '<a href="#!" titile="Dar de baja">'+
                                '<span class="glyphicon glyphicon-trash eliminar" data-id="'+element.id+'" alt="Editar">'+'</span>'+
                            '</a>'+
                        '</div>';
                            
                        DTIdentidades.row.add([
                            '<center>'+element.tipo_equipo+'</center>',
                            '<center>'+element.modelo+'</center>',
                            '<center>'+element.marca+'</center>',
                            '<center>'+element.numero_serie+'</center>',
                            '<center>'+(element.estatus_me == 1 ? 'Activo' : 'Inactivo') +'</center>',
                            (element.estatus_me == 1) ? '<div class="d-flex justify-content-center" >'+
                                consultar+
                                editar +
                                eliminar +
                                autorizar+
                            '</div>' : '<div class="p-1 text-center">'+
                            '<a href="#!" titile="Reactivar">'+
                                '<span class="glyphicon glyphicon-ok-circle reactivar" aria-hidden="true" data-id="'+element.id_me+'"></span>'+
                            '</a>'+
                        '</div>'
                        ]).draw(false)
                    });
                /*}else{
                    response.data.forEach(element => {
                        DTIdentidades.row.add([
                            element.tipo_equipo,
                            '<center>'+element.modelo+'</center>',
                            '<center>'+element.marca+'</center>',
                            '<center>'+element.numero_serie+'</center>'
                        ]).draw(false)
                    });
                }*/
			}
		});
    }
    ver_registro(ev){
        localStorage.setItem("id_equipo", ev.target.dataset.id);
        window.location.href= base_url + "Credencializacion/Ctrl_Equipos/consultar";
    }
    editar_registro(ev){
        localStorage.setItem("id_equipo", ev.target.dataset.id);
        window.location.href= base_url + "Credencializacion/Ctrl_Equipos/modificar";
    }
    eliminar_registro(ev){
        localStorage.setItem("id_equipo", ev.target.dataset.id);
        pedir_confirmacion_eliminar();
    }
    reactivar_registro(ev){
        localStorage.setItem("id_equipo", ev.target.dataset.id);
        pedir_confirmacion_reactivar();
    }
    confirmarbaja(ev){
        const id_equipo = localStorage.getItem("id_equipo");
		$.ajax({
            url: base_url + 'Credencializacion/Ctrl_Equipos/delete',
            type: "POST",
            data: {
                idequipo: id_equipo,
                [csrf.name] : csrf.value
            },
            beforeSend:function(){
                DTIdentidades.clear().draw();
                $("#modal_confirmar_baja").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    registro_exitoso(data.message);
                    Aministrador.prototype.obtenerDatosTabla();
                }else{
                    peticion_fallida(data.message);
                }
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $("#modal_confirmar_baja").modal("hide");
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        })
    }
    confirmarreactivar(ev){

        const id_equipo = localStorage.getItem("id_equipo");

        $.ajax({
            url: base_url + 'Credencializacion/Ctrl_Equipos/active',
            type: "POST",
            data: {
                idequipo: id_equipo,
                [csrf.name] : csrf.value
            },
            beforeSend:function(){
                DTIdentidades.clear().draw();
                $("#modal_confirmar_reactivar").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    reactivar_exitoso(data.message);
                    Aministrador.prototype.obtenerDatosTabla();
                }else{
                    peticion_fallida(data.message);
                }
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $("#modal_confirmar_reactivar").modal("hide");
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        })
    }
}
const adm = new Aministrador()

$(tabEquipos).on('click', '.ver', function(ev){
    adm.ver_registro(ev);
});

$(tabEquipos).on('click', '.editar', function(ev){
    adm.editar_registro(ev);
});

$(tabEquipos).on('click', '.eliminar', function(ev){
    adm.eliminar_registro(ev);
});

$(tabEquipos).on('click', '.reactivar', function(ev){
    adm.reactivar_registro(ev);
});

$(tabEquipos).on('click', '.atender', function(ev){
    //adm.reactivar_registro(ev);
});