let erroresGenerales = true;
//funciones
const enviar_datos = ( obj ) => {
	$.ajax({
		url: base_url_rest + 'catalogos/linea',
		type: 'POST',
		data: obj,
		beforeSend:function() {
			$("#modal_confirmar_guardar").modal("hide");
		},
		success: (data) => {
			if(data.status != true)
				peticion_fallida(data.message);
			else
				$("#nombre").val("");
				registro_exitoso(data.message);
		},
		error: (xhr, ajaxOptions, thrownError) => {
			$("#modal_confirmar_guardar").modal("hide");
			peticion_fallida(thrownError);
		}
	});
}

$("#nombre").keydown(function(ev) {
	this.validaciones = new VALIDACIONES();
    let resultado = this.validaciones.caracteres_validos(ev.key,1);
    if(!resultado.resp){
        ev.preventDefault();
    }
});

$("#nombre").keyup(function() {
	$("#btnGuardar").off("click", almacenar);
});

$("#nombre").change(function() {
	$("#errornombre").html('')
	erroresGenerales = false
	$("#loadingValidar").show();

	let validaciones = new VALIDACIONES();
	if($("#nombre").val() == "") {
		$("#errornombre").html('Campo Obligatorio')
		erroresGenerales = true
	} else {
		let resultado = validaciones.caracteres_validos($("#nombre").val(),2);
		if(!resultado.resp){
			$("#errornombre").html('Información no valida')
			erroresGenerales = true
		}
	}

	if(!erroresGenerales) {
		$.ajax({
			url: base_url_rest + 'catalogos/linea/nombre/' + nombre.value + '/0',
			type: 'GET',
			global: false,
			success: (data) => {
				if(data.data.length != 0) {
					$("#errornombre").html('El registro ya existe')
					erroresGenerales = true
					if(data.data.estatus == 0) {
						pedir_confirmacion_reactivar("El registro ya existe ¿desea reactivarlo?");
						localStorage.setItem("id_linea", data.data.id)
					}
				}
				$("#btnGuardar").on("click", almacenar);
				$("#loadingValidar").hide();
			},
			error: (xhr, ajaxOptions, thrownError) => {
				$("#modal_confirmar_guardar").modal("hide");
				peticion_fallida(thrownError);
				$("#btnGuardar").on("click", almacenar);
				$("#loadingValidar").hide();
			}
		});
	} else {
		$("#btnGuardar").on("click", almacenar);
		$("#loadingValidar").hide();
	}
})

const ejecutar_reactivar = () => {
	const id_linea = localStorage.getItem("id_linea");
	$.ajax({
		url: base_url_rest+'catalogos/linea/en/'+id_linea,
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
					$("#nombre").val("")
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

//eventos
$("#btnGuardar").on("click", almacenar);

function almacenar() {
	//validaciones
	let flag = true;

	//nombre contrato (validacion)
	if($("#nombre").val() == "") {
		flag = false;
		$("#errornombre").html("Campo obligatorio");
	}

	if(flag && !erroresGenerales)
		pedir_confirmacion_guardar();
}

$("#confirmar_guardar").click( (e) => {
	enviar_datos(JSON.stringify({
		nombre      : $("#nombre").val(),
    ip          : ip_address,
    idusuario   : id_usuario_sesion
	}));
})

$(".form-control").change( (e) => {
	cambios = 1;
});

$("#btnRegresar").click( (e) => {
	if(cambios == 1)
		pedir_confirmar_regresar();
	else
		window.location.href = base_url + 'Catalogos/Ctrl_LineasTransportes';
});

$("#confirmar_salir_sin_guardar").click( (e) => {
	window.location.href = base_url + 'Catalogos/Ctrl_LineasTransportes';
});

$("#confirmar_reactivar_registro").click( (e) => {
	ejecutar_reactivar();
});

$(document).ready(function() {
	spinner.style.visibility = "hidden";
});