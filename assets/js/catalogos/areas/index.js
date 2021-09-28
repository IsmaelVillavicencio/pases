var areas = [];

const construir_datatable = (arr = []) => {
    if(U || D){
        $('#tabRegistroArea').DataTable({
            destroy: true,
            stateSave: true,
            responsive: true,
            language: {
                url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            },
            data: arr,
            columns: [

                {
                    title: "Nombre de área de adscripción",
                    data: "nombre_area",
                    className: 'dt-body-center'
                },
                {
                    title: "Área superior inmediata",
                    render: (data, type, row) => {
                        return (row.nombre_area_supervisor == null ? '<center></center>' : '<center>'+row.nombre_area_supervisor+'</center>');
                    }
                },
                {
                    title: "Estatus",
                    render: (data, type, row) => {
                        return (row.estatus_area == 1 ? '<center>Activo</center>' : '<center>Inactivo</center>');
                    }
                },
                {
                    title: "Acciones",
                    render: (data, type, row) => {
                        let eliminar = "<div class=''></div>";
                        let modificar = "<div class=''></div>";
                        let reactivar = "<div class=''></div>";

                        if(row.estatus_area == 1){
                            if(D){
                            eliminar = '<div class="p-1">'+
                                        '<a title="Dar de baja" onclick="eliminar('+row.id_area+')" name="'+row.id_area+'">'+
                                            '<span class="glyphicon glyphicon-trash" aria-hidden="true" data-toggle="modal"></span>'+
                                        '</a>'+
                                    '</div>';
                            }
                            if(U){
                            modificar = '<div class="p-1">'+
                                        '<a title="Modificar" onclick="modificar('+row.id_area+')" name="'+row.id_area+'">'+
                                            '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>'+
                                        '</a>'+
                                    '</div>';
                            }
                        }else{
                            reactivar = '<div class="p-1">'+
                                '<a title="Reactivar" onclick="reactivar('+row.id_area+')" name="'+row.id_area+'">'+
                                    '<span class="glyphicon glyphicon-ok-circle" aria-hidden="true" data-toggle="modal"></span>'+
                                '</a>'+
                            '</div>';
                        }

                        let desc = '<div class="d-flex justify-content-center">'+modificar+eliminar+reactivar+' </div>'

                        return desc;
                    }
                }
            ],
            columnDefs: [
                { "width": "35%", "targets": 0 },
                { "width": "35%", "tagrets": 1 },
                { "width": "15%", "targets": 2 },
                { "width": "15%", "targets": 3 }
            ],
            "order": [[ 2, "asc" ],[0, 'asc']]
        });
    }else{
        $('#tabRegistroArea').DataTable({
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
                    title: "Nombre de área de adscripción",
                    data: "nombre_area"
                },
                {
                    title: "Área superior inmediata",
                    render: (data, type, row) => {
                        return (row.nombre_area_supervisor == null ? '<center></center>' : '<center>'+row.nombre_area_supervisor+'</center>');
                    }

                },
                {
                    title: "Estatus",
                    render: (data, type, row) => {
                        return (row.estatus_area == 1 ? '<center>Activo</center>' : '<center>Inactivo</center>');
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
    localStorage.setItem("id_area", id);
    let area = areas.find(area => area.id_area == id);
    localStorage.setItem("nombre_area", area.nombre_area);
    localStorage.setItem("id_area_supervision", area.id_area_supervisor);
    window.location.href= base_url + "Catalogos/Ctrl_Areas/modificar";
}

const eliminar = (id) => {
    localStorage.setItem("id_area", id);
    pedir_confirmacion_eliminar();
}
const reactivar = (id) => {
    localStorage.setItem("id_area", id);
    pedir_confirmacion_reactivar();
}

const ejecutar_baja = (id) => {
    $.ajax({
        url: base_url_rest+'catalogos/areas/'+id,
        type: "DELETE",
        data: JSON.stringify({
            ip          : ip_address,
            idusuario   : id_usuario_sesion
        }),
        beforeSend: function(){
            $("#modal_confirmar_baja").modal("hide");
        },
        success: (data) => {
            if(data.status == true){
                registro_exitoso("Baja exitosa");
                let registro = areas.find(area => area.id_area == id);
                let index = areas.indexOf(registro);
                areas[index].estatus_area = 0;

                construir_datatable(areas);
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
            url: base_url_rest+'catalogos/areas/en/'+id,
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
                    let reactivar = areas.find(area => area.id_area == id);
                    let index = areas.indexOf(reactivar);
                    areas[index].estatus_area = 1;
    
                    construir_datatable(areas);
                    reactivar_exitoso(data.message);
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

const obtener_registros = () => {
	$.ajax({
		url: base_url_rest+'catalogos/areas',
		type: 'GET',
		success: (data) => {
			if(data.status != true)
				peticion_fallida(data.message);
			else{
                areas = data.data;
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
    ejecutar_baja(localStorage.getItem("id_area"));
});
$("#confirmar_reactivar_registro").click( (e) => {
    ejecutar_reactivar(localStorage.getItem("id_area"));
});

$(document).ready( (e) => {
    localStorage.clear();
	obtener_registros();
});