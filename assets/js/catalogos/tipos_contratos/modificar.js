//VARIABLES GLOBALES
const id_contrato = localStorage.getItem("id_contrato");
let nombre_contrato = localStorage.getItem("nombre_contrato");
let id_area = localStorage.getItem("id_area");
let erroresGenerales = false;

//VALIDACION AL ID VALIDO
if(!(id_contrato > 0))
	window.location.href = base_url +"Catalogos/Ctrl_TiposContratos";

const obtener_areas = () => {
	$.ajax({
		url: base_url_rest+'catalogos/areas/estatus/1',
		type: 'GET',
		dataType: 'json',
		success: function(response){
			response.data.forEach(element => {
				$(selArea).append('<option value="'+element.id_area+'" '+(id_area == element.id_area ? 'selected' : '')+'>'+element.nombre_area+'</option>')
			});
		},
		complete: function(){
			$(selArea).select2({placeholder: 'Seleccione'});
			cambios = 0
		}
	})	
}
//FUNCIONES
const enviar_datos = ( obj ) => {
	$.ajax({
		url: base_url_rest+'catalogos/contratos/'+id_contrato,
		type: 'PUT',
		data: obj,
		beforeSend:function(){
			$("#modal_confirmar_guardar").modal("hide");
		},
		success: (data) => {
			if(data.status != true)
				peticion_fallida(data.message);
			else
				registro_exitoso(data.message);
		},
		error: (xhr, ajaxOptions, thrownError) =>{
			$("#modal_confirmar_guardar").modal("hide");
			peticion_fallida(thrownError);
		}
	});
}


//EVENTOS
$(window).ready( (e) => {
	$("#nombre_contrato").val(nombre_contrato);
	obtener_areas()
});

$("#nombre_contrato").keydown(function(ev){
	this.validaciones = new VALIDACIONES();
    let resultado = this.validaciones.caracteres_validos(ev.key,1);
    if(!resultado.resp){
        ev.preventDefault();
    }
});

$("#nombre_contrato").keyup(function(){
	$("#guardar").off("click", almacenar);
});

$("#nombre_contrato").change(function(){
	$("#error_nombre_contrato").html('')
	erroresGenerales = false
	$("#loadingValidar").show();

	let validaciones = new VALIDACIONES();
	if($("#nombre_contrato").val() == ""){
		$("#error_nombre_contrato").html('Campo Obligatorio')
		erroresGenerales = true
	}else{
		let resultado = validaciones.caracteres_validos($("#nombre_contrato").val(),2);
		console.log(resultado);
		if(!resultado.resp){
			$("#error_nombre_contrato").html('Información no valida')
			erroresGenerales = true
		}
	}

	if(!erroresGenerales){
		$.ajax({
			url: base_url_rest+'catalogos/contratos/nombre/'+$("#nombre_contrato").val()+'/'+id_contrato,
			type: 'GET',
			global: false,
			success: (data) => {
				if(data.data.length != 0){
					$("#error_nombre_contrato").html('El registro ya existe')
					erroresGenerales = true
				}
				$("#guardar").on("click", almacenar);
				$("#loadingValidar").hide();
			},
			error: (xhr, ajaxOptions, thrownError) =>{
				$("#modal_confirmar_guardar").modal("hide");
				peticion_fallida(thrownError);
				$("#guardar").on("click", almacenar);
				$("#loadingValidar").hide();
			}
		});
	}else{
		$("#guardar").on("click", almacenar);
		$("#loadingValidar").hide();
	}
})

$("#selArea").change( (e) => {
    if($("#selArea").val() != ""){
		$("#error_selArea").html('')
	}
});

//eventos
$("#guardar").on("click", almacenar);

function almacenar(){
	//validaciones
	let flag = true;

	//nombre contrato (validacion)
	if($("#nombre_contrato").val() == ""){
		flag = false;
		$("#error_nombre_contrato").html("Campo obligatorio");
	}

	//Area
	if($(selArea).val() == ""){
		flag = false;
		$("#error_selArea").html("Campo obligatorio");
	}

	if(flag && !erroresGenerales)
		pedir_confirmacion_guardar();
}

$("#confirmar_guardar").click( (e) => {
	enviar_datos(JSON.stringify({
		nombre		: $("#nombre_contrato").val(),
		idarearev	: $(selArea).val(),
		ip          : ip_address,
        idusuario   : id_usuario_sesion
	}));
})

//validar regresar sin guardar
$(".form-control").change( (e) => {
	cambios = 1;
});

$("#regresar").click( (e) => {
	if(cambios == 1)
		pedir_confirmar_regresar();
	
	else
		window.location.href = base_url + 'Catalogos/Ctrl_TiposContratos';
});

$("#confirmar_salir_sin_guardar").click( (e) => {
	window.location.href = base_url + 'Catalogos/Ctrl_TiposContratos';
})

$(document).ready(function() {
	spinner.style.visibility = "hidden";
});