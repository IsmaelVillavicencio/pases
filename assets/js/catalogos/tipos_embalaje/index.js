var areas = [];
var U = " ", D = " ";
const construir_datatable = (arr = []) => {

    if(true){
        $('#tblTipoEmbalaje').DataTable({
            destroy: true,
            stateSave: true,
            responsive: true,
            language: {
                url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            },
            data: arr,
            columns: [

                {
                    title: "Nombre",
                    data: "nombre",
                    className: 'dt-body-center'
                },

                {
                    title: "Descripción",
                    render: (data, type, row) => {
                        return "dato no disponible";
                    }
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
                        let reactivar = "<div class='p-1r'></div>";

                        if(row.estatus == 1){
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
                            reactivar = '<div class="p-1 text-center">'+
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
        $('#tblTipoEmbalaje').DataTable({
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
                    title: "Nombre",
                    data: "nombre",
                    className: 'dt-body-center'
                },

                {
                    title: "Descripción",
                    render: (data, type, row) => {
                        return "dato no disponible";
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
                { "width": "70%", "targets": 0 },
                { "width": "30%", "targets": 1 },
            ],
            "order": [[ 1, "asc" ],[0, 'asc']]
        });
    }
}

const obtener_registros = () => {
	$.ajax({
		url: base_url_rest+'catalogos/tipoembalajes',
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
$(document).ready( (e) => {
    localStorage.clear();
	obtener_registros();
});