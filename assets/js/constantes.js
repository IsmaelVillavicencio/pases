const base_url = $("#base_url").val();
const base_url_rest = $("#base_url_rest").val();
const id_usuario_sesion = $("#id_usuario").val();
const ip_address = $("#ip_address").val();
const idcontratovigenteusuario = $("#idcontratovigenteusuario").val();
const idempresavigenteusuario = $("#idempresavigenteusuario").val();
const app_path = $("#app_path").val();
const _token = $("#token").val();
const _empresa = $("#empresa").val();
const _numero_contrato = $("#numerocontrato").val();

var cambios = 0;
//FUNCIONES CONSTANTES (modales)

const registro_exitoso = (mensaje = "") => {
	if(mensaje == "")
		$("#mensaje_exito").html("Registro exitoso");
	else
		$("#mensaje_exito").html(mensaje);

	$("#modal_registro_exitoso").modal("show");
	cambios = 0;

	return true;
}

const registro_exitoso_autorizaciones = (mensaje = "") => {
	if(mensaje == "")
		$("#mensaje_exito_autorizaciones").html("Registro exitoso");
	else
		$("#mensaje_exito_autorizaciones").html(mensaje);

	$("#modal_registro_exitoso_autorizaciones").modal("show");
	cambios = 0;

	return true;
}

const reactivar_exitoso = (mensaje = "") => {
	if(mensaje == "")
		$("#mensaje_reactivar_exito").html("Reactivación exitosa");
	else
		$("#mensaje_reactivar_exito").html(mensaje);

	$("#modal_reactivar_exitoso").modal("show");
	cambios = 0;

	return true;
}

const error_sesion = (mensaje= "") => {
	if(mensaje == "")
		$("#mensaje_error_sesion").html("La sesión ha caducado, vuelva a iniciar sesión");
	else
		$("#mensaje_error_sesion").html(mensaje);
	$("#modal_error_sesion").modal("show");
}

const peticion_fallida = (mensaje = "") => {
	if(mensaje == "")
		$("#mensaje_error").html("Ocurrió un error, verifique su conexión a internet o consulte al administrador");
	else
		$("#mensaje_error").html(mensaje);
	$("#modal_error").modal("show");
}

const pedir_confirmacion_guardar = (mensaje = "") => {
	if(mensaje != "")
		$("#mensaje_confirmar_guardar").html(mensaje);

	$("#modal_confirmar_guardar").modal("show");
}

const pedir_confirmacion_eliminar = (mensaje = "") => {
	if(mensaje != "")
		$("#mensaje_confirmar_baja").html(mensaje);

	$("#modal_confirmar_baja").modal("show");
}

const pedir_confirmacion_eliminar_motivo = (mensaje = "") => {
	if(mensaje != "")
		$("#mensaje_confirmar_baja_motivo").html(mensaje);

	$("#modal_confirmar_baja_motivo").modal("show");
}

const pedir_confirmar_regresar = (mensaje = "") => {
	if(mensaje != "")
		$("#mensaje_regresar").html(mensaje);

	$("#modal_confirmar_regresar").modal("show");
}
const pedir_confirmacion_reactivar = (mensaje = "") => {
	if(mensaje != "")
		$("#mensaje_confirmar_reactivar").html(mensaje)

	$("#modal_confirmar_reactivar").modal("show");
}
const pedir_confirmacion_uppassword = (mensaje = "") => {
	if(mensaje != "")
		$("#mensaje_confirmar_uppassword").html(mensaje)

	$("#modal_confirmar_uppassword").modal("show");
}
const fecha_obligatoria = (mensaje = "") => {
	if(mensaje != "")
		$("#mensaje_fecha_obligatoria").html(mensaje);

	$("#modal_fecha_obligatoria").modal("show");
}
//efectos
const mouseOverVer = (obj) => {
  obj.src= base_url+"assets/iconos/Ver_02.png";
}

const MouseoutVer = (obj) => {
  obj.src=base_url+"assets/iconos/Ver_01.png";
}

const mouseOverEditar = (obj) => {
  obj.src= base_url+"assets/iconos/Editar_02.png";
}

const MouseoutEditar = (obj) => {
  obj.src=base_url+"assets/iconos/Editar_01.png";
}

const mouseOverPapelera = (obj) => {
	obj.src= base_url+"assets/iconos/Papelera_02.png";
}

const MouseoutPapelera = (obj) => {
	obj.src=base_url+"assets/iconos/Papelera_01.png";
}

const mouseOverReactivar = (obj) => {
	obj.src= base_url+"assets/iconos/Reactivar_02.png";
}

const MouseoutReactivar = (obj) => {
	obj.src=base_url+"assets/iconos/Reactivar_01.png";
}

const mouseOverValidar = (obj) => {
	obj.src= base_url+"assets/iconos/Validar_02.png";
}

const MouseoutValidar = (obj) => {
	obj.src=base_url+"assets/iconos/Validar_01.png";
}