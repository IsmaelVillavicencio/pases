//variables globales
var documentos = [];
const id_tipo_servicio = localStorage.getItem('id_servicio');

if(!(id_tipo_servicio > 0))
	window.location.href = base_url + 'Catalogos/Ctrl_TiposServicios';

//funciones

const cargar_informacion = () => {
			$.ajax({
				url: base_url + 'Catalogos/Ctrl_Documentos/getByTipo',
				type: "GET",
				data: {estatus: 1, idtipo: 2},
				success: (data) => {
					//se llena el catálogo de contratos
					data.data.forEach( (d) => {
						//$("#selDocumento").append('<option value="'+d.id_documentos+'">'+d.nombre_documentos+'</option>');
						documentos.push({
							id: d.id_documentos,
							nombre: d.nombre_documentos,
							add: false
						});
					});
					//obtenemos la información:
					$.ajax({
						url: base_url_rest+'catalogos/servicios/'+id_tipo_servicio,
						type: 'GET',
						success: (data) => {
							if(documentos.length > 0){
								if(data.data.ids_documentos != ""){
									let lista = data.data.ids_documentos.split(",");
									lista.forEach( (t_documento_id) => {
										//buscamos el documento
										let doc = documentos.find(d => d.id == t_documento_id);

										//buscamos el index y cambiamos el estatus
										let index = documentos.indexOf(doc);
                                        if(index != -1){
                                            documentos[index].add = true;
                                        }
									} );
								}
							}
                            if(data.data.estatus_servicio==1){
                                $(".Eliminar").show()
                                $(".Reactivar").hide()
                            }
                            else{
                                $(".Eliminar").hide()
                                $(".Reactivar").show()
                            }
							$("#tipoContrato").val(data.data.nombre_contrato);
							$("#nombreTipoServicio").val(data.data.nombre_servicio);
							construir_datatable(documentos);
						},
						error: (xhr, ajaxOptions, thrownError) =>{
							peticion_fallida("Error al cargar la información del tipo de servicio");
							console.log(thrownError);
						}
					})

				},
				error: (xhr, ajaxOptions, thrownError) =>{
					peticion_fallida("Error al cargar catálgo de documentos");
					console.log(thrownError);
				}
			});
}

const construir_datatable = (arr_sin_filtrar = []) =>{
	let arr = arr_sin_filtrar.filter( e => e.add);

	$('#tabNombreDocumento').DataTable({
        destroy: true,
        info: false,
        stateSave: true,
        responsive: true,
        autoWidth: false,
        searching: false,
        bPaginate: false,
        language: {
            url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
        data: arr,
        columns: [

            {
                title: "Documento",
                data: "nombre"
            }
        ],
        columnDefs: [
            { "width": "80%", "targets": 0 }
        ]
    });
}

const eliminar = () => {
    pedir_confirmacion_eliminar();
}

const ejecutar_baja = () => {
    $.ajax({
        url: base_url_rest+'catalogos/servicios/'+id_tipo_servicio,
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
            if(data.status){
                registro_exitoso("Baja exitosa");
                $(".Eliminar").hide()
                $(".Reactivar").show()
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

const ejecutar_reactivar = () => {   
    $.ajax({
        url: base_url_rest+'catalogos/servicios/en/'+id_tipo_servicio,
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
                reactivar_exitoso(data.message);
                $(".Reactivar").hide()
                $(".Eliminar").show()
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

//eventos
$(document).ready( () => {
	cargar_informacion();
});

$("#confirmar_baja").click( (e) => {
    ejecutar_baja();
});
$("#confirmar_reactivar_registro").click( (e) => {
    ejecutar_reactivar();
});
$("#regresar").click( (e) => {
	window.location.href = base_url + 'Catalogos/Ctrl_TipoServicios';
});
