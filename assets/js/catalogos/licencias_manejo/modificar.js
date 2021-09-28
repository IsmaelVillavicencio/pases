//VARIABLES GLOBALES
const id_licencia = localStorage.getItem("id_licencia"),
  _nombre_licencia = localStorage.getItem("nombre_licencia");
let erroresGenerales = false;

//VALIDACIÓN DE ID
if(id_licencia <= 0) {
  window.location.href = base_url + 'Catalogos/Ctrl_TiposLicenciaManejo'
}

//AUTOCOMPLETACIÓN DE FORMULARIO
$(document).ready(() => {
  $('#nombre').val(_nombre_licencia);
});

//FUNCIONES
const enviar_datos = ( obj ) => {
  $.ajax({
    url: base_url_rest+'catalogos/licencia/'+id_licencia,
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
			url: base_url_rest + 'catalogos/licencia/nombre/' + nombre.value + '/' + id_licencia,
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

//EVENTO
$("#btnGuardar").on("click", almacenar);

//CONFIRMACIÓN DE GUARDADO
$("#confirmar_guardar").click( (e) => {
  enviar_datos(JSON.stringify({
    id          : id_licencia,
    nombre      : $("#nombre").val(),
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
		window.location.href = base_url + 'Catalogos/Ctrl_TiposLicenciaManejo';
});

$("#confirmar_salir_sin_guardar").click( (e) => {
	window.location.href = base_url + 'Catalogos/Ctrl_TiposLicenciaManejo';
})