var transportes = [];

const construir_datatable = (arr = []) => {
  if(U || D) {
    $('#tabRegistroTipoTransporte').DataTable({
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
          width: "10%",
          className: "dt-body-center"
        },
        {
          title: "Nombre",
          data: "nombre",
          width: "40%"
        },
        {
          title: "Nombre corto",
          data : "nombre_corto",
          width: "30%",
          className: "dt-body-center"
        },
        {
          title: "Estatus",
          render: (data, type, row) => {
            return (row.estatus == 1 ? 'Activo' : 'Inactivo');
          },
          width: "10%",
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
          },
          width: "10%",
        }
      ],
      "order": [[ 3, "asc" ],[0, 'asc']]
    });
  } else {
    $('#tabRegistroTipoTransporte').DataTable({
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
          width: "15%",
          className: 'dt-body-center'
        },
        {
          title: "Nombre",
          data: "nombre",
          width: "40%"
        },
        {
          title: "Nombre corto",
          data : "nombre_corto",
          width: "30%",
          className: "dt-body-center"
        },
        {
          title: "Estatus",
          render: (data, type, row) => {
            return (row.estatus == 1 ? 'Activo' : 'Inactivo');
          },
          width: "15%",
          className: 'dt-body-center'
        },
      ],
      "order": [[ 2, "asc" ],[0, 'asc']]
    });
  }
}

const obtener_registros = () => {
	$.ajax({
		url: base_url_rest + 'catalogos/transporte',
		type: 'GET',
		success: (data) => {
			if(data.status != true)
				peticion_fallida(data.message);
			else{
        transportes = data.data;
				construir_datatable(transportes);
      }
		},
		error: (xhr, ajaxOptions, thrownError) =>{
			peticion_fallida();
			console.log(thrownError);
		}
	});
}

const modificar = (id) => {
  localStorage.setItem("id_transporte", id);
  let transporte = transportes.find(transporte => transporte.id == id);
  localStorage.setItem("nombre_transporte", transporte.nombre);
  localStorage.setItem("nombre_corto_transporte", transporte.nombre_corto);
  window.location.href= base_url + "Catalogos/Ctrl_TiposTransportes/modificar";
}

const eliminar = (id) => {
  localStorage.setItem("id_transporte", id);
  pedir_confirmacion_eliminar();
}

const ejecutar_baja = (id) => {
  $.ajax({
    url: base_url_rest + 'catalogos/transporte/' + id,
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
        let registro = transportes.find(transporte => transporte.id == id),
          index = transportes.indexOf(registro);
        transportes[index].estatus = 0;
        construir_datatable(transportes);
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
  localStorage.setItem("id_transporte", id);
  pedir_confirmacion_reactivar();
}

const ejecutar_reactivar = (id) => {
  $.ajax({
    url: base_url_rest + 'catalogos/transporte/en/' + id,
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
        let reactivar = transportes.find(transporte => transporte.id == id),
          index = transportes.indexOf(reactivar);
        transportes[index].estatus = 1;
        construir_datatable(transportes);
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
  ejecutar_baja(localStorage.getItem("id_transporte"));
});

$("#confirmar_reactivar_registro").click( (e) => {
  ejecutar_reactivar(localStorage.getItem("id_transporte"));
});

$(document).ready( (e) => {
  localStorage.clear();
  obtener_registros();
});