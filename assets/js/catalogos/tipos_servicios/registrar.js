//variables globales
var documentos = [];
let erroresGenerales = true;

//funciones
const enviar_datos = ( obj ) => {
	$(".form-control").val("");
	$("#selDocumento").val("");
	$("#selDocumento").trigger('change');
	 
	$.ajax({
		url: base_url_rest+'catalogos/servicios',
		type: 'POST',
		data: obj,
		beforeSend:function(){
			$("#modal_confirmar_guardar").modal("hide");
		},
		success: (data) => {
			//limpiar formulario
			documentos.forEach( (d) => {
				d.add = false;
			});
			construir_datatable(documentos);
			$(".form-control").val("");
			 

 
			csrf.value = data.token;
			if(data.status != true)
				peticion_fallida(data.message);
			else
				registro_exitoso(data.message);
		},
		error: (xhr, ajaxOptions, thrownError) =>{
			$("#modal_confirmar_guardar").modal("hide");
			$("#selDocumento").val("");
			peticion_fallida(thrownError);
            csrf.value = xhr.responseJSON.token;
		}
	});
}

const cargar_catalogos = () => {
	$.ajax({
		url: base_url_rest+'catalogos/areas/estatus/1',
		type: "GET",
		success: (data) => {
			//se llena el catálogo de contratos
			data.data.forEach( (a) => {
				$("#selArea").append('<option value="'+a.id_area+'">'+a.nombre_area+'</option>');
			});
		},
		error: (xhr, ajaxOptions, thrownError) =>{
			peticion_fallida("Error al cargar catálgo de contratos");
			console.log(thrownError);
		}
	});

	$.ajax({
		url: base_url_rest+'catalogos/contratos/estatus/1',
		type: "GET",
		success: (data) => {
			//se llena el catálogo de contratos
			data.data.forEach( (c) => {
				$("#selTipoContrato").append('<option value="'+c.id+'">'+c.nombre+'</option>');
			});
		},
		error: (xhr, ajaxOptions, thrownError) =>{
			peticion_fallida("Error al cargar catálgo de contratos");
			console.log(thrownError);
		}
	});

	$.ajax({
		url: base_url + 'Catalogos/Ctrl_Documentos/getByTipo',
		type: "GET",
		data: {estatus: 1, idtipo: 2},
		success: (data) => {
			//se llena el catálogo de contratos
			data.data.forEach( (d) => {
				$("#selDocumento").append('<option value="'+d.id_documentos+'">'+d.nombre_documentos+'</option>');
				documentos.push({
					id: d.id_documentos,
					nombre: d.nombre_documentos,
					add: false
				});
				
			});
			
		},complete: function(){
			$("#selDocumento").select2();
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
            },
            {
              title: "Acciones",
              render: (data, type, row) => {
                let eliminar = '<div class="p-1">'+
					'<a title="Eliminar" onclick="eliminar_doc('+row.id+')" name="'+row.id+'">'+
						'<span class="glyphicon glyphicon-trash eliminar" data-toggle="modal"></span>'+
					'</a>'+
                '</div>';
                let desc = '<div class="d-flex justify-content-center">'+eliminar+' </div>'
                return desc;
              }
            }
        ],
        columnDefs: [
            { "width": "80%", "targets": 0 }
        ]
    });
}

const agregar_documento = (id_doc) => {
	let find_d = documentos.find(d => d.id == id_doc);

	//ya está en la lista
	if(find_d.add){
		$("#errorDocumento").html("El documento ya está en lista");
	}else{
		$("#errorDocumento").html("");

		//agregamos el documento
		let index = documentos.indexOf(find_d);
		documentos[index].add = true;
		construir_datatable(documentos);
		$("#selDocumento").val("")
        $("#selDocumento").trigger('change');

	}
}

const eliminar_doc = (id_doc) => {
	let find_doc = documentos.find(doc => doc.id == id_doc);
	let index = documentos.indexOf(find_doc);

	documentos[index].add = false;
	construir_datatable(documentos);
}

//eventos
$(document).ready( () => {
	cargar_catalogos();
	construir_datatable();
});

$("#nombreTipoServicio").keydown(function(ev){
	this.validaciones = new VALIDACIONES();
    let resultado = this.validaciones.caracteres_validos(ev.key,1);
    if(!resultado.resp){
        ev.preventDefault();
    }
});

$("#nombreTipoServicio").keyup(function(){
	$("#btnAñadir").off("click", anadir);
	$("#guardar").off("click", almacenar);
});

$("#nombreTipoServicio").change(function(){
	$("#errorTipoServicio").html('')
	erroresGenerales = false
	$("#loadingValidar").show();

	let validaciones = new VALIDACIONES();
	if($("#nombreTipoServicio").val() == ""){
		$("#errorTipoServicio").html('Campo Obligatorio')
		erroresGenerales = true
	}else{
		let resultado = validaciones.caracteres_validos($("#nombreTipoServicio").val(),2);
		console.log(resultado);
		if(!resultado.resp){
			$("#errorTipoServicio").html('Información no valida')
			erroresGenerales = true
		}
	}

	if(!erroresGenerales){
		$.ajax({
			url: base_url_rest+'catalogos/servicios/nombre/'+$("#nombreTipoServicio").val().trim()+'/0',
			type: 'GET',
			global: false,
			success: (data) => {
				if(data.data.length != 0){
					$("#errorTipoServicio").html('El registro ya existe')
					erroresGenerales = true
					if(data.data.estatus_servicio == 0){
						pedir_confirmacion_reactivar("El registro ya existe ¿desea reactivarlo?");
						localStorage.setItem("id_tipo_servicio",data.data.id_servicio)
					}
				}
				$("#btnAñadir").on("click", anadir);
				$("#guardar").on("click", almacenar);
				$("#loadingValidar").hide();
			},
			error: (xhr, ajaxOptions, thrownError) =>{
				$("#modal_confirmar_guardar").modal("hide");
				peticion_fallida(thrownError);
				$("#btnAñadir").on("click", anadir);
				$("#guardar").on("click", almacenar);
				$("#loadingValidar").hide();
			}
		});
	}else{
		$("#btnAñadir").on("click", anadir);
		$("#guardar").on("click", almacenar);
		$("#loadingValidar").hide();
	}
})

	const ejecutar_reactivar = () => {
		const id_tipo_servicio = localStorage.getItem("id_tipo_servicio");
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
					$(".error").html('')
					$("#selTipoContrato").val("")
					$("#nombreTipoServicio").val("")  
					$("#selDocumento").val("")  
					$("#selDocumento").trigger('change');
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

$("#btnAñadir").on("click", anadir);
function anadir(){
	let flag = true;

	//tipo de contrato (validacion)
	if($("#selTipoContrato").val() == ""){
		flag = false;
		$("#errorTipoContrato").html("Campo obligatorio");
	}
	//tipo de servicio (validacion)
	if($("#nombreTipoServicio").val() == ""){
		flag = false;
		$("#errorTipoServicio").html("Campo obligatorio");
	}
	if($("#selDocumento").val() == ""){
		flag = false;
		$("#errorDocumento").html("Campo obligatorio");
	}

	if(erroresGenerales == true){
		flag = false;
	}

	if(flag){
		$("#errorDocumento").html("");
		agregar_documento($("#selDocumento").val());
	}
}

$("#guardar").on("click", almacenar);
function almacenar(){
	//validaciones
	let flag = true;

	//tipo de contrato (validacion)
	if($("#selTipoContrato").val() == ""){
		flag = false;
		$("#errorTipoContrato").html("Campo obligatorio");
	}

	//tipo de servicio (validacion)
	if($("#nombreTipoServicio").val() == ""){
		flag = false;
		$("#errorTipoServicio").html("Campo obligatorio");
	}

	if(flag && !erroresGenerales){
		$("#errorTipoContrato").html("");
		$("#errorTipoServicio").html("");
		$("#errorDocumento").html("");
		pedir_confirmacion_guardar();
	}
}

$("#confirmar_guardar").click( (e) => {
	let lista = documentos.filter( d => d.add == true);
	let ids = [];
	lista.forEach( (e) => {
		ids.push(e.id);
	});
	enviar_datos(JSON.stringify({
		nombre			: $("#nombreTipoServicio").val().trim(),
		idtipocontrato	: $("#selTipoContrato").val(),
		lstdocumentos	: (ids.join() != '' ? ids.join() : 0),
		ip          	: ip_address,
        idusuario   	: id_usuario_sesion
	}));
})

$("#selDocumento").change( (e) => {
	$("#errorDocumento").html("");
});
$("#selTipoContrato").change( (e) => {
	if($("#selTipoContrato").val() == ""){
		$("#errorTipoContrato").html("Campo obligatorio");
	}else {
		$("#errorTipoContrato").html("");
	}
});

$(".form-control").change( (e) => {
	cambios = 1;
});

$("#regresar").click( (e) => {
	if(cambios == 1)
		pedir_confirmar_regresar();
	
	else
		window.location.href = base_url + 'Catalogos/Ctrl_TiposServicios';
});

$("#confirmar_salir_sin_guardar").click( (e) => {
	window.location.href = base_url + 'Catalogos/Ctrl_TiposServicios';
})
$("#confirmar_reactivar_registro").click( (e) => {
	ejecutar_reactivar();
})
