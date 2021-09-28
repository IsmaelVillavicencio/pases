var servicios = [];

const construir_datatable = (arr = []) => {
    if(R || U || D){
        $('#tabRegistroServicios').DataTable({
            destroy: true,
            stateSave: true,
            responsive: true,
            language: {
                url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            },
            data: arr,
            columns: [

                {
                    title: "Tipo de servicio",
                    data: "nombre_servicio"
                },
                            {
                    title: "Tipo de contrato",
                    data: "nombre_contrato"
                },
                {
                    title: "Estatus",
                    render: (data, type, row) => {
                        return (row.estatus_servicio == 1 ? '<center>Activo</center>' : '<center>Inactivo</center>');
                    }
                },
                {
                    title: "Acciones",
                    render: (data, type, row) => {
                        let eliminar = "<div class='p-1'></div>";
                        let modificar = "<div class='p-1'></div>";
                        let consultar = "<div class='p-1'></div>";
                        let reactivar = "<div class='p-1'></div>";
                        if(R){
                            consultar = '<div class="p-1">'+
                                            '<a title="Consultar" onclick="consultar('+row.id_servicio+')">'+
                                                '<span class="glyphicon glyphicon-eye-open" aria-hidden="true" data-toggle="modal"></span>'+
                                            '</a>'+
                                        '</div>';
                        }
                        if(row.estatus_servicio == 1){
                            if(D){
                                eliminar = '<div class="p-1">'+
                                        '<a title="Dar de baja" onclick="eliminar('+row.id_servicio+')" name="'+row.id_servicio+'">'+
                                            '<span class="glyphicon glyphicon-trash" aria-hidden="true" data-toggle="modal"></span>'+
                                        '</a>'+
                                    '</div>';
                            }
                            if(U){
                                modificar = '<div class="p-1">'+
                                        '<a title="Modificar" onclick="modificar('+row.id_servicio+')" name="'+row.id_servicio+'">'+
                                            '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>'+
                                        '</a>'+
                                    '</div>';
                            }
                        }else{
                            reactivar = '<div class="p-1">'+
                                        '<a title="Reactivar" onclick="reactivar('+row.id_servicio+')" name="'+row.id_servicio+'">'+
                                            '<span class="glyphicon glyphicon-ok-circle" aria-hidden="true" data-toggle="modal"></span>'+
                                        '</a>'+
                                    '</div>';
                        }

                        if(row.estatus_servicio == 1){
                            let desc = '<div class="d-flex justify-content-center">'+consultar+modificar+eliminar+'</div>'
                            return desc;
                        }else{
                            let desc = '<div class="d-flex justify-content-center">'+consultar+reactivar+'</div>'
                            return desc;
                        }

                    }
                }
            ],
            columnDefs: [
                { "width": "50%", "targets": 0 },
                { "width": "25%", "targets": 1, className: 'dt-body-center' },
                { "width": "10%", "targets": 2 },
                { "width": "15%", "targets": 3 }
            ],
            "order": [[ 2, "asc" ],[0, 'asc']]
        });
    }else{
        $('#tabRegistroServicios').DataTable({
            dom: 'Bfrtip',
            destroy: true,
            info: false,
            stateSave: true,
            responsive: true,
            language: {
                url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            },
            data: arr,
            columns: [

                {
                    title: "Tipo de servicio",
                    data: "nombre_servicio"
                },
                            {
                    title: "Tipo de contrato",
                    data: "nombre_contrato"
                },
                {
                    title: "Estatus",
                    render: (data, type, row) => {
                        return (row.estatus_servicio == 1 ? '<center>Activo</center>' : '<center>Inactivo</center>');
                    }
                },
            ],
            columnDefs: [
                { "width": "50%", "targets": 0 },
                { "width": "30%", "targets": 1 },
                { "width": "20%", "targets": 2 },
            ],
            "order": [[ 2, "asc" ],[0, 'asc']]
        });
    }
}

const consultar = (id) => {
    localStorage.setItem("id_servicio", id);
    window.location.href = base_url + 'Catalogos/Ctrl_TiposServicios/consultar'
}

const modificar = (id) => {

    localStorage.setItem("id_servicio", id);

    window.location.href= base_url + "Catalogos/Ctrl_TiposServicios/modificar";
}

const eliminar = (id) => {
    localStorage.setItem("id_servicio", id);
    pedir_confirmacion_eliminar();
}
const reactivar = (id) => {
    localStorage.setItem("id_servicio", id);
    pedir_confirmacion_reactivar();
}

const ejecutar_baja = (id) => {
    $.ajax({
        url: base_url_rest+'catalogos/servicios/'+id,
        type: "DELETE",
        global: false,
        data: JSON.stringify({
            ip          : ip_address,
            idusuario   : id_usuario_sesion
        }),
        beforeSend:function(){
            $("#modal_confirmar_baja").modal("hide");
        },
        success: (data) => {
            if(data.status == true){
                registro_exitoso("Baja exitosa");
                let registro = servicios.find(servicio => servicio.id_servicio == id);
                let index = servicios.indexOf(registro);
                servicios[index].estatus_servicio = 0;

                construir_datatable(servicios);
                registro_exitoso(data.message);
            }else{
                peticion_fallida(data.message);
            }
        },
        error: (xhr, ajaxOptions, thrownError) =>{
            $("#modal_confirmar_baja").modal("hide");
            peticion_fallida(thrownError);
        }
    })
}

const ejecutar_reactivar = (id) => {
    $.ajax({
        url: base_url_rest+'catalogos/servicios/en/'+id,
        type: "PUT",
        data: JSON.stringify({
            ip          : ip_address,
            idusuario   : id_usuario_sesion
        }),
        beforeSend: function(){
            $("#modal_confirmar_reactivar").modal("hide");
        },
        success: (data) => {
            csrf.value = data.token;
            if(data.status == true){
                let reactivar = servicios.find(servicio => servicio.id_servicio == id);
                let index = servicios.indexOf(reactivar);
                servicios[index].estatus_servicio = 1;

                construir_datatable(servicios);
                reactivar_exitoso(data.message);
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

const obtener_registros = () => {
    $.ajax({
        url: base_url_rest+'catalogos/servicios',
        type: 'GET',
        success: (data) => {
            if(data.status != true)
                peticion_fallida(data.message);
            else{
                servicios = data.data;
                construir_datatable(data.data);
            }
        },
        error: (xhr, ajaxOptions, thrownError) =>{
            peticion_fallida();
            console.log(thrownError);
        }
    });
}

$("#confirmar_baja").click( (e) => {
    ejecutar_baja(localStorage.getItem("id_servicio"));
});

$("#confirmar_reactivar_registro").click((e) => {
    ejecutar_reactivar(localStorage.getItem("id_servicio"));
});

$(document).ready( (e) => {
    localStorage.clear();
    obtener_registros();
});