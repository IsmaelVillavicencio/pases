let erroresGenerales = true;

const obtener_areas = () => {
	$.ajax({
		url: base_url_rest+'catalogos/areas/estatus/1',
		type: 'GET',
		dataType: 'json',
		success: function(response){
			response.data.forEach(element => {
				$(selArea).append('<option value="'+element.id_area+'">'+element.nombre_area+'</option>')
			});
		},
		complete: function(){
			$(selArea).select2({placeholder: 'Seleccione'});
			cambios = 0
		}
	})
	
}
//funciones
const enviar_datos = ( obj ) => {
	$.ajax({
		url: base_url_rest+'catalogos/contratos',
		type: 'POST',
		data: obj,
		beforeSend:function(){
			$("#modal_confirmar_guardar").modal("hide");
		},
		success: (data) => {
			if(data.status != true)
				peticion_fallida(data.message);
			else
				$("#nombre_contrato").val("");
				$(selArea).val("")
				$('#selArea').val("").trigger('change');
				registro_exitoso(data.message);
		},
		error: (xhr, ajaxOptions, thrownError) =>{
			$("#modal_confirmar_guardar").modal("hide");
			peticion_fallida(thrownError);
		}
	});
}

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
			url: base_url_rest+'catalogos/contratos/nombre/'+nombre_contrato.value+'/0',
			type: 'GET',
			global: false,
			success: (data) => {
				if(data.data.length != 0){
					$("#error_nombre_contrato").html('El registro ya existe')
					erroresGenerales = true
					if(data.data.estatus == 0){
						pedir_confirmacion_reactivar("El registro ya existe ¿desea reactivarlo?");
						localStorage.setItem("id_tipo_contrato", data.data.id)
					}
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

const ejecutar_reactivar = () => {
	const id_tipo_contrato = localStorage.getItem("id_tipo_contrato");
	$.ajax({
		url: base_url_rest+'catalogos/contratos/en/'+id_tipo_contrato,
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
				$(".error").hide()
				$("#nombre_contrato").val("")
				$(selArea).val("")

				$('#selArea').val("").trigger('change');
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
$("#confirmar_reactivar_registro").click( (e) => {
	ejecutar_reactivar();
})

$(document).ready(function() {
	obtener_areas()
});