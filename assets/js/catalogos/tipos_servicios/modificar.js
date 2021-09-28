//variables globales
var documentos = [];
//guardamos la lista original para posteriormente hacer una comparación y enviar las áreas de bajas
var documentos_originales = [];

const id_tipo_servicio = localStorage.getItem('id_servicio');
let erroresGenerales = false;

if(!(id_tipo_servicio > 0))
	window.location.href = base_url + 'Catalogos/Ctrl_TiposServicios';

//funciones
const enviar_datos = ( obj ) => {
	$.ajax({
		url: base_url_rest+'catalogos/servicios/'+id_tipo_servicio,
		type: 'PUT',
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
			if(data.status != true)
				peticion_fallida(data.message);
			else
				registro_exitoso(data.message);
				cargar_informacion();
		},
		error: (xhr, ajaxOptions, thrownError) =>{
			$("#modal_confirmar_guardar").modal("hide");
			peticion_fallida(thrownError);
		}
	});
}

const cargar_informacion = () => {
	$.ajax({
		url: base_url_rest+'catalogos/contratos/estatus/1',
		type: "GET",
		beforeSend: function(){
			$("#selTipoContrato").html('');
			$("#selTipoContrato").append('<option value="">Seleccione</option>');
		},
		success: (data) => {
			//se llena el catálogo de contratos
			data.data.forEach( (c) => {
				$("#selTipoContrato").append('<option value="'+c.id+'">'+c.nombre+'</option>');
			});

			$.ajax({
				url: base_url + 'Catalogos/Ctrl_Documentos/getByTipo',
				type: "GET",
				data: {estatus: 1, idtipo: 2},
				beforeSend: function(){
					$("#selDocumento").html('');
					$("#selDocumento").append('<option value="">Seleccione</option>');
				},
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

					
					$.ajax({
						url: base_url_rest+'catalogos/servicios/'+id_tipo_servicio,
						type: 'GET',
						success: (data) => {
							//llenamos los catalogos
							$("#selTipoContrato").val(data.data.id_contrato);
							$("#nombreTipoServicio").val(data.data.nombre_servicio);

							//validamos los documentos
							let ids_doc = data.data.ids_documentos.split(',');
							ids_doc.forEach( (d)=> {
								let id = parseInt(d);
								let doc = documentos.find( doc => doc.id == id);
								if(typeof doc !== "undefined") {
									//hacemos la modificación
									let index = documentos.indexOf(doc);
									documentos[index].add = true;
									console.log("documentos segun la validacion en el tipo de servicio")
									console.log(documentos[index].id)
									
									documentos_originales.push(documentos[index].id);	

								}
							});
							//inicializamos la tabla de documentos
							construir_datatable(documentos);

						},
						error: (xhr, ajaxOptions, thrownError) =>{
							peticion_fallida("Error al cargar la información del tipo de servicio");
							console.log(thrownError);
						}
					})

				},complete:function(){
					$("#selDocumento").select2();
				},
				error: (xhr, ajaxOptions, thrownError) =>{
					peticion_fallida("Error al cargar catálgo de documentos");
					console.log(thrownError);
				}
			});
		},
		error: (xhr, ajaxOptions, thrownError) =>{
			peticion_fallida("Error al cargar catálgo de contratos");
			console.log(thrownError);
		}
	});
}

const construir_datatable = (arr_sin_filtrar = []) =>{
	let arr = arr_sin_filtrar.filter( e => e.add);
	console.log("datatable")
	console.log(arr)

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
                let eliminar = '<div class="p1">'+
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

	if(erroresGenerales == true){
		return;
	}else{
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
			cambios=1
		}
	}
}

const eliminar_doc = (id_doc) => {
	let find_doc = documentos.find(doc => doc.id == id_doc);
	let index = documentos.indexOf(find_doc);

	documentos[index].add = false;
	cambios=1
	construir_datatable(documentos);
}

//eventos
$(document).ready( () => {
	cargar_informacion();
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
			url: base_url_rest+'catalogos/servicios/nombre/'+$("#nombreTipoServicio").val().trim()+'/'+id_tipo_servicio,
			type: 'GET',
			global: false,
			success: (data) => {
				if(data.data.length != 0){
					$("#errorTipoServicio").html('El registro ya existe')
					erroresGenerales = true
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

$("#btnAñadir").on("click", anadir);
function anadir(){
	if($("#selDocumento").val() == ""){
		$("#errorDocumento").html("Campo obligatorio");
	}else {
		if(erroresGenerales == true){
			return;
		}

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
	
	let bajas = []
	let lista = [];
	let altas  = [];

	documentos.forEach((d) =>{ 
		if(d.add){
			lista.push(d.id)
		}
	})
	altas = lista.filter(x =>! documentos_originales.includes (x));
			
	bajas = documentos_originales.filter(x =>! lista.includes (x));

	enviar_datos(JSON.stringify({
		nombre				: $("#nombreTipoServicio").val().trim(),
		idtipocontrato		: $("#selTipoContrato").val(),
		lstdocumentos		: (altas.toString() != '' ? altas.toString() :0),
		lstdocumentosbaja	: (bajas.toString() != '' ? bajas.toString() : 0),
		ip          		: ip_address,
        idusuario   		: id_usuario_sesion
	}));
	
})

$(".form-control").change( (e) => {
	cambios = 1;
});

$("#regresar_btn").click( (e) => {
	if(cambios == 1)
		pedir_confirmar_regresar();
	
	else
		window.location.href = base_url + 'Catalogos/Ctrl_TiposServicios/';
});

$("#confirmar_salir_sin_guardar").click( (e) => {
	window.location.href = base_url + 'Catalogos/Ctrl_TiposServicios/';
})