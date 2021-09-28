var puestos = [];

const construir_datatable = (arr = []) => {
    if(R || U || D){
        $('#tabRegistroPuestos').DataTable({
            destroy: true,
            stateSave: true,
            responsive: true,
            language: {
                url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            },
            data: arr,
            columns: [

                {
                    title: "Nombre del puesto",
                    data: "nombre"
                },
                {
                    title: "Nivel",
                    render: (data, type, row) => {
                        return "Nivel "+ row.id_nivel;
                    },
                    className: 'dt-body-center'
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
                        let eliminar  = "<div class='p-1'></div>";
                        let modificar = "<div class='p-1'></div>";
                        let consultar = "<div class='p-1'></div>";
                        let reactivar   = "<div class='p-1'></div>";

                        if(R){
                            consultar = '<div class="p-1">'+
                                            '<a title="Consultar" onclick="consultar('+row.id+')">'+
                                                '<span class="glyphicon glyphicon-eye-open" aria-hidden="true" data-toggle="modal"></span>'+
                                            '</a>'+
                                        '</div>';
                        }
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
                                    '</div>';
                        }

                        if(row.estatus == 1){
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
                { "width": "20%", "targets": 1 },
                { "width": "20%", "targets": 2 },
                { "width": "10%", "targets": 3 }
            ],
            "order": [[ 2, "asc" ],[0, 'asc']]
        });
    }else{
        $('#tabRegistroPuestos').DataTable({
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
                    title: "Nombre del puesto",
                    data: "nombre"
                },
                {
                    title: "Nivel",
                    render: (data, type, row) => {
                        return "Nivel "+ row.id_nivel;
                    }
                },
                {
                    title: "Estatus",
                    render: (data, type, row) => {
                        return (row.estatus == 1 ? '<center>Activo</center>' : '<center>Inactivo</center>');
                    }
                },
            ],
            columnDefs: [
                { "width": "50%", "targets": 0 },
                { "width": "25%", "targets": 1 },
                { "width": "25%", "targets": 2 },
            ],
            "order": [[ 2, "asc" ],[0, 'asc']]
        });
    }
}

const consultar = (id) => {
    const p = puestos.find(e => e.id == id);
    localStorage.setItem("puesto_info", JSON.stringify(p));
    window.location.href = base_url + 'Catalogos/Ctrl_Puestos/consultar'
}

const modificar = (id) => {
    let puesto = puestos.find( p => p.id == id);

    localStorage.setItem("id_puesto", id);
    localStorage.setItem("nombre_puesto", puesto.nombre);
    localStorage.setItem("nivel", puesto.id_nivel);

    window.location.href= base_url + "Catalogos/Ctrl_Puestos/modificar";
}

const eliminar = (id) => {
    localStorage.setItem("id_puesto", id);
    pedir_confirmacion_eliminar();
}
const reactivar = (id) => {
    localStorage.setItem("id_puesto", id);
    pedir_confirmacion_reactivar();
}

const ejecutar_baja = (id) => {
    $.ajax({
        url: base_url_rest + 'catalogos/puestos/' + id,
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
                registro_exitoso("Baja exitosa");
                let registro = puestos.find(nombre => nombre.id == id);
                let index = puestos.indexOf(registro);
                puestos[index].estatus = 0;

                construir_datatable(puestos);
                registro_exitoso(data.message);
            }
            else
                peticion_fallida(data.message);
        },
        error: (xhr, ajaxOptions, thrownError) =>{
            $("#modal_confirmar_baja").modal("hide");
            peticion_fallida(thrownError);
        }
    })
}

const ejecutar_reactivar = (id) => {
    $.ajax({
        url: base_url_rest + 'catalogos/puestos/en/' + id,
        type: "PUT",
        data: JSON.stringify({
            ip          : ip_address,
            idusuario   : id_usuario_sesion
        }),
        beforeSend: function(){
            $("#modal_confirmar_reactivar").modal("hide");
        },
        success: (data) => {
            if(data.status == true){
                let reactivar = puestos.find(nombre => nombre.id == id);
                let index = puestos.indexOf(reactivar);
                puestos[index].estatus = 1;

                construir_datatable(puestos);
                reactivar_exitoso(data.message);
            }
            else
                peticion_fallida(data.message);
        },
        error: (xhr, ajaxOptions, thrownError) =>{
            $("#modal_confirmar_reactivar").modal("hide");
            peticion_fallida(thrownError);
        }
    })

}

const obtener_registros = () => {
    $.ajax({
        url: base_url_rest + 'catalogos/puestos',
        type: 'GET',
        success: (data) => {
            if(data.status != true)
                peticion_fallida(data.message);
            else{
                puestos = data.data;
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
    ejecutar_baja(localStorage.getItem("id_puesto"));
});

$("#confirmar_reactivar_registro").click( (e) => {
    ejecutar_reactivar(localStorage.getItem("id_puesto"));
});

$(document).ready( (e) => {
    localStorage.clear();
    obtener_registros();
});