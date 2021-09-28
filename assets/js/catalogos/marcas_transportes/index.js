var marcas = [];

const construir_datatable = (arr = []) => {
  if(U || D) {
    $('#tabRegistroMarcaTransporte').DataTable({
      destroy: true,
      stateSave: true,
      responsive: true,
      language: {
        url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
      },
      data: arr,
      columns: [
        {
          title: "Código",
          data: "id",
          className: 'dt-body-center'
        },
        {
          title: "Nombre",
          data: "nombre"
        },
        {
          title: "Estatus",
          render: (data, type, row) => {
            return (row.estatus == 1 ? 'Activo' : 'Inactivo');
          },
          className: 'dt-body-center'
        },
        {
          title: "Acciones",
          render: (data, type, row) => {
            let eliminar = "", modificar = "", reactivar = "";
            if(row.estatus == 1){
              if(D) {
                eliminar = '<div class="p-1">'+
                  '<a title="Dar de baja" onclick="eliminar('+ row.id +')" name="'+ row.id +'">'+
                    '<span class="glyphicon glyphicon-trash eliminar" aria-hidden="true" data-toggle="modal"></span>'+
                  '</a>'+
                '</div>';
              }
              if(U) {
                modificar = '<div class="p-1">'+
                  '<a title="Modificar" onclick="modificar('+ row.id +')" name="'+ row.id +'">'+
                    '<span class="glyphicon glyphicon-pencil editar" aria-hidden="true"></span>'+
                  '</a>'+
                '</div>';
              }
            } else {
              reactivar = '<div class="p-1">'+
                '<a title="Reactivar" onclick="reactivar('+ row.id +')" name="'+ row.id+ '">'+
                  '<span class="glyphicon glyphicon-ok-circle reactivar" aria-hidden="true" data-toggle="modal"></span>'+
                '</a>'+
              '</div>';
            }
          let desc = '<div class="d-flex justify-content-center">'+ modificar + eliminar + reactivar +' </div>'
          return desc;
          }
        }
      ],
      columnDefs: [
          { "width": "20%", "targets": 0 },
          { "width": "50%", "tagrets": 1 },
          { "width": "20%", "targets": 2 },
          { "width": "10%", "targets": 3 }
      ],
      "order": [[ 2, "asc" ],[0, 'asc']]
    });
  } else {
    $('#tabRegistroMarcaTransporte').DataTable({
      destroy: true,
      stateSave: true,
      responsive: true,
      language: {
        url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
      },
      data: arr,
      columns: [
        {
          title: "Código",
          data: "id",
          className: 'dt-body-center'
        },
        {
          title: "Nombre",
          data: "nombre"
        },
        {
          title: "Estatus",
          render: (data, type, row) => {
            return (row.estatus == 1 ? 'Activo' : 'Inactivo');
          },
          className: 'dt-body-center'
        },
      ],
      columnDefs: [
          { "width": "20%", "targets": 0 },
          { "width": "60%", "tagrets": 1 },
          { "width": "20%", "targets": 2 }
      ],
      "order": [[ 2, "asc" ],[0, 'asc']]
    });
  }
}

const obtener_registros = () => {
	$.ajax({
		url: base_url_rest + 'catalogos/marca',
		type: 'GET',
		success: (data) => {
			if(data.status != true)
				peticion_fallida(data.message);
			else{
        marcas = data.data;
				construir_datatable(marcas);
      }
		},
		error: (xhr, ajaxOptions, thrownError) =>{
			peticion_fallida();
			console.log(thrownError);
		}
	});
}

const modificar = (id) => {
  localStorage.setItem("id_marca", id);
  let marca = marcas.find(marca => marca.id == id);
  localStorage.setItem("nombre_marca", marca.nombre);
  window.location.href= base_url + "Catalogos/Ctrl_marcasTransportes/modificar";
}

const eliminar = (id) => {
  localStorage.setItem("id_marca", id);
  pedir_confirmacion_eliminar();
}

const ejecutar_baja = (id) => {
  $.ajax({
    url: base_url_rest + 'catalogos/marca/' + id,
    type: "DELETE",
    data: JSON.stringify({
      ip          : ip_address,
      idusuario   : id_usuario_sesion
    }),
    beforeSend: function() {
      $("#modal_confirmar_baja").modal("hide");
    },
    success: (data) => {
      if(data.status == true) {
        registro_exitoso("Baja exitosa");
        let registro = marcas.find(marca => marca.id == id),
          index = marcas.indexOf(registro);
        marcas[index].estatus = 0;
        construir_datatable(marcas);
        registro_exitoso(data.message);
      } else {
        peticion_fallida(data.message);
      }
    },
    error: (xhr, ajaxOptions, thrownError) => {
      $("#modal_confirmar_baja").modal("hide");
      peticion_fallida(thrownError);
    }
  })
}

const reactivar = (id) => {
  localStorage.setItem("id_marca", id);
  pedir_confirmacion_reactivar();
}

const ejecutar_reactivar = (id) => {
  $.ajax({
    url: base_url_rest + 'catalogos/marca/en/' + id,
    type: "PUT",
    data: JSON.stringify({
      ip          : ip_address,
      idusuario   : id_usuario_sesion
    }),
    beforeSend: function() {
      $("#modal_confirmar_reactivar").modal("hide");
    },
    success: (data) => {
      if(data.status == true) {
        let reactivar = marcas.find(marca => marca.id == id),
          index = marcas.indexOf(reactivar);
        marcas[index].estatus = 1;
        construir_datatable(marcas);
        reactivar_exitoso(data.message);
      } else {
        peticion_fallida(data.message);
      }
    },
    error: (xhr, ajaxOptions, thrownError) => {
      $("#modal_confirmar_reactivar").modal("hide");
      peticion_fallida(thrownError);
    }
  })
}

$("#confirmar_baja").click( (e) => {
  ejecutar_baja(localStorage.getItem("id_marca"));
});

$("#confirmar_reactivar_registro").click( (e) => {
  ejecutar_reactivar(localStorage.getItem("id_marca"));
});

$(document).ready( (e) => {
  localStorage.clear();
  obtener_registros();
});