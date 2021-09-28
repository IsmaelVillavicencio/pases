let erroresGenerales = true;

//funciones
const enviar_datos = ( obj ) => {
	$.ajax({
		url: base_url_rest+'catalogos/areas',
		type: 'POST',
		data: obj,
		beforeSend: function(){
			$("#modal_confirmar_guardar").modal("hide");
		},
		success: (data) => {
			if(data.status != true)
				peticion_fallida(data.message);
			else
				$("#nombreArea").val("");
				$("#cat_area").val("");
				$("#cat_area").html("");
				$("#cat_area").html('<option value="">Seleccione</option>');
				registro_exitoso(data.message);
				obtener_registros();
		},
		error: (xhr, ajaxOptions, thrownError) =>{
			$("#modal_confirmar_guardar").modal("hide");
			peticion_fallida(thrownError);
		}
	});
}

const obtener_registros = () => {
	$.ajax({
		url: base_url_rest+'catalogos/areas/estatus/1',
		type: 'GET',
		success: (data) => {
			if(data.status != true)
				peticion_fallida(data.message);
			else{
                data.data.forEach( (a) => {
                	$("#cat_area").append('<option value="'+a.id_area+'">'+a.nombre_area+'</option>');
                });
            }
		},
		error: (xhr, ajaxOptions, thrownError) =>{
			peticion_fallida();
			console.log(thrownError);
		}
	});
}

//eventos
$(document).ready( (e) => {
	obtener_registros();
})

$("#nombreArea").keydown(function(ev){
	this.validaciones = new VALIDACIONES();
    let resultado = this.validaciones.caracteres_validos(ev.key,1);
    if(!resultado.resp){
        ev.preventDefault();
    }
});

$("#nombreArea").keyup(function(){
	$("#guardar").off("click", almacenar);
});

$("#nombreArea").change(function(){
	$("#errorNombreArea").html('')
	erroresGenerales = false
	$("#loadingValidar").show();

	let validaciones = new VALIDACIONES();
	if($("#nombreArea").val() == ""){
		$("#errorNombreArea").html('Campo Obligatorio')
		erroresGenerales = true
	}else{
		let resultado = validaciones.caracteres_validos($("#nombreArea").val(),2);
		if(!resultado.resp){
			$("#errorNombreArea").html('Información no valida')
			erroresGenerales = true
		}
	}

	if(!erroresGenerales){
		$.ajax({
			url: base_url_rest+'catalogos/areas/nombre/'+nombreArea.value+'/0',
			type: 'GET',
			global: false,
			success: (data) => {
				if(data.data.length != 0){
					$("#errorNombreArea").html('El registro ya existe')
					erroresGenerales = true
					if(data.data.estatus_area == 0){
						pedir_confirmacion_reactivar("El registro ya existe ¿desea reactivarlo?");
						localStorage.setItem("id", data.data.id_area)
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

const ejecutar_reactivar = () => {

        const id = localStorage.getItem("id");
		$.ajax({
            url: base_url_rest+'catalogos/areas/en/'+id,
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
					$("#nombreArea").val("")
					$("#cat_area").val("")  
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

$("#guardar").on("click", almacenar);

function almacenar(){
	//validaciones
	let flag = true;

	//nombre area (validacion)
	if($("#nombreArea").val() == ""){
		flag = false;
		$("#errorNombreArea").html("Campo obligatorio");
	}

	if(flag && !erroresGenerales)
		pedir_confirmacion_guardar();
}

$("#confirmar_guardar").click( (e) => {
	enviar_datos(JSON.stringify({
		nombre		: $("#nombreArea").val(),
		idareasup	: ($("#cat_area").val() == '' ? 0 : $("#cat_area").val()),
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
		window.location.href = base_url + 'Catalogos/Ctrl_Areas';
});

$("#confirmar_salir_sin_guardar").click( (e) => {
	window.location.href = base_url + 'Catalogos/Ctrl_Areas';
})
$("#confirmar_reactivar_registro").click( (e) => {   
	ejecutar_reactivar();
});