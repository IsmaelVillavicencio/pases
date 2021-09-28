//VARIABLES GLOBALES
const id_transporte = localStorage.getItem("id_transporte"),
  _nombre_transporte = localStorage.getItem("nombre_transporte"),
  _nombre_corto_transporte = localStorage.getItem("nombre_corto_transporte");
let erroresGenerales = false;

//VALIDACIÓN DE ID
if(id_transporte <= 0) {
  window.location.href = base_url + 'Catalogos/Ctrl_TiposTransportes'
}

//AUTOCOMPLETACIÓN DE FORMULARIO
$(document).ready(() => {
  $('#nombre').val(_nombre_transporte);
  $('#nombreCorto').val(_nombre_corto_transporte);
});

//FUNCIONES
const enviar_datos = ( obj ) => {
  $.ajax({
    url: base_url_rest+'catalogos/transporte/'+id_transporte,
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
    error: (xhr, ajaxOptions, thrownError) => {
      $("#modal_confirmar_guardar").modal("hide");
      peticion_fallida(thrownError);
    }
  });
}

function almacenar() {
	let flag = true;

	//VALIDACIÓN
	if($("#nombre").val() == ""){
		flag = false;
		$("#errorNombre").html("Campo obligatorio");
	}

  if($("#nombreCorto").val() == ""){
		flag = false;
		$("#errornombreCorto").html("Campo obligatorio");
	}

	if(flag && !erroresGenerales)
		pedir_confirmacion_guardar();
}

//VALIDACIÓN DE CAMPOS
$("#nombre").keydown(function(ev) {
	this.validaciones = new VALIDACIONES();
  let resultado = this.validaciones.caracteres_validos(ev.key,1);
  if(!resultado.resp) {
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
	if($("#nombre").val() == ""){
		$("#errornombre").html('Campo Obligatorio')
		erroresGenerales = true
	} else {
		let resultado = validaciones.caracteres_validos($("#nombre").val(),2);
		if(!resultado.resp) {
			$("#errornombre").html('Información no valida')
			erroresGenerales = true
		}
	}
  if(!erroresGenerales) {
		$.ajax({
			url: base_url_rest + 'catalogos/transporte/nombre/' + nombre.value + '/' + id_transporte,
			type: 'GET',
			global: false,
			success: (data) => {
				if(data.data.length != 0) {
					$("#errornombre").html('El registro ya existe')
					erroresGenerales = true
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
});


$("#nombreCorto").keydown(function(ev) {
	this.validaciones = new VALIDACIONES();
  let resultado = this.validaciones.caracteres_validos(ev.key,1);
  if(!resultado.resp) {
    ev.preventDefault();
  }
});

$("#nombreCorto").keyup(function() {
	$("#btnGuardar").off("click", almacenar);
});

$("#nombreCorto").change(function() {
	$("#errornombreCorto").html('')
	erroresGenerales = false
	$("#loadingValidar").show();
	let validaciones = new VALIDACIONES();
	if($("#nombreCorto").val() == ""){
		$("#errornombreCorto").html('Campo Obligatorio')
		erroresGenerales = true
	} else {
		let resultado = validaciones.caracteres_validos($("#nombreCorto").val(),2);
		if(!resultado.resp) {
			$("#errornombreCorto").html('Información no valida')
			erroresGenerales = true
		}
	}
  if(!erroresGenerales) {
		$.ajax({
			url: base_url_rest + 'catalogos/transporte/nombrecorto/' + nombreCorto.value + '/' + id_transporte,
			type: 'GET',
			global: false,
			success: (data) => {
				if(data.data.length != 0) {
					$("#errornombreCorto").html('El registro ya existe')
					erroresGenerales = true
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
});


//EVENTO
$("#btnGuardar").on("click", almacenar);

//CONFIRMACIÓN DE GUARDADO
$("#confirmar_guardar").click( (e) => {
  enviar_datos(JSON.stringify({
    id          : id_transporte,
    nombre      : $("#nombre").val(),
    nombre_corto: $("#nombreCorto").val(),
    ip          : ip_address,
    idusuario   : id_usuario_sesion
	}));
})

//VALIDACIÓN DE SALIR SIN GUARDAR
$(".form-control").change( (e) => {
	cambios = 1;
});

$("#btnRegresar").click( (e) => {
	if(cambios == 1)
		pedir_confirmar_regresar();
	else
		window.location.href = base_url + 'Catalogos/Ctrl_TiposTransportes';
});

$("#confirmar_salir_sin_guardar").click( (e) => {
	window.location.href = base_url + 'Catalogos/Ctrl_TiposTransportes';
})