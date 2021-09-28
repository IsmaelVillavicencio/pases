var contratos = [];

const construir_datatable = (arr = []) => {
    if(U || D){
        $('#tabRegistroContratos').DataTable({
            destroy: true,
            stateSave: true,
            responsive: true,
            language: {
                url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            },
            data: arr,
            columns: [

                {
                    title: "Tipo de contrato",
                    data: "nombre"
                },
                {
                    title: "Estatus",
                    render: (data, type, row) => {
                        return (row.estatus == 1 ? '<center>Activo</center>' : '<center>Inactivo</center>');
                    }
                },
                {
                    title: "Acciones",
                    render: (data, type, row) => {
                        let eliminar = "<div class='p-1'></div>";
                        let modificar = "<div class='p-1'></div>";
                        let reactivar = "<div class='p-1'></div>";

                        if(row.estatus == 1){
                            if(D){
                                eliminar = '<div class="p-1">'+
                                        '<a title="Dar de baja" onclick="eliminar('+row.id+')" name="'+row.id+'">'+
                                            '<span class="glyphicon glyphicon-trash" aria-hidden="true" data-toggle="modal"></span>'+
                                        '</a>'+
                                    '</div>';
                            }
                            if(U){
                                modificar = '<div class="p-1">'+
                                        '<a title="Modificar" onclick="modificar('+row.id+')" name="'+row.id+'">'+
                                            '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>'+
                                        '</a>'+
                                    '</div>';
                            }
                        }else{
                            reactivar = '<div class="p-1">'+
                                        '<a title="Reactivar" onclick="reactivar('+row.id+')" name="'+row.id+'">'+
                                            '<span class="glyphicon glyphicon-ok-circle" aria-hidden="true" data-toggle="modal"></span>'+
                                        '</a>'+
                                        '</a>'+
                                    '</div>';
                        }

                        if(row.estatus == 1){
                            let desc = '<div class="d-flex justify-content-center">'+modificar+eliminar+'</div>'
                            return desc;
                        }else{
                            let desc = '<div class="d-flex justify-content-center">'+reactivar+'</div>'
                            return desc;
                        }

                        return desc;
                    }
                }
            ],
            columnDefs: [
                { "width": "70%", "targets": 0 },
                { "width": "15%", "targets": 1 },
                { "width": "15%", "targets": 2 }
            ],
            "order": [[ 1, "asc" ],[0, 'asc']]
        });
    }else{
        $('#tabRegistroContratos').DataTable({
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
                    title: "Tipo de contrato",
                    data: "nombre"
                },
                {
                    title: "Estatus",
                    render: (data, type, row) => {
                        return (row.estatus == 1 ? '<center>Activo</center>' : '<center>Inactivo</center>');
                    }
                },
            ],
            columnDefs: [
                { "width": "70%", "targets": 0 },
                { "width": "30%", "targets": 1 },
            ],
            "order": [[ 1, "asc" ],[0, 'asc']]
        });
    }
}

const modificar = (id) => {

    localStorage.setItem("id_contrato", id);

    let contrato = contratos.find(contrato => contrato.id == id);

    localStorage.setItem("nombre_contrato", contrato.nombre);
    localStorage.setItem("id_area", contrato.id_area_revision);

    window.location.href= base_url + "Catalogos/Ctrl_TiposContratos/modificar";
}

const eliminar = (id) => {
    localStorage.setItem("id_contrato", id);
    pedir_confirmacion_eliminar();
}

const reactivar = (id) => {
    localStorage.setItem("id_contrato", id);
    pedir_confirmacion_reactivar();
}

const ejecutar_baja = (id) => {
    $.ajax({
        url: base_url_rest+'catalogos/contratos/'+id,
        type: "DELETE",
        data: JSON.stringify({
            ip          : ip_address,
            idusuario   : id_usuario_sesion
        }),
        beforeSend:function(){
            $("#modal_confirmar_baja").modal("hide");
        },
        success: (data) => {
            if(data.status == true){
                let registro = contratos.find(contrato => contrato.id == id);
                let index = contratos.indexOf(registro);
                contratos[index].estatus = 0;

                construir_datatable(contratos);
                registro_exitoso("Baja exitosa");
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
        url: base_url_rest+'catalogos/contratos/en/'+id,
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
                let reactivar = contratos.find(contrato => contrato.id == id);
                let index = contratos.indexOf(reactivar);
                contratos[index].estatus = 1;

                construir_datatable(contratos);
                reactivar_exitoso(data.message);
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

const obtener_registros = () => {
    $.ajax({
        url: base_url_rest+'catalogos/contratos',
        type: 'GET',
        success: (data) => {
            if(data.status != true)
                peticion_fallida(data.message);
            else{
                contratos = data.data;
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
    ejecutar_baja(localStorage.getItem("id_contrato"));
});

$("#confirmar_reactivar_registro").click( (e) => {
    ejecutar_reactivar(localStorage.getItem("id_contrato"));
});

$(document).ready( (e) => {
    localStorage.clear();
    obtener_registros();
});