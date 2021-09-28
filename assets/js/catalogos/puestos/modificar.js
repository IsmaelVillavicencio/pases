//variables
const id_puesto = localStorage.getItem("id_puesto");
const _nombre_puesto = localStorage.getItem("nombre_puesto");
const _nivel = localStorage.getItem("nivel");
let erroresGenerales = false;

if(!(id_puesto > 0))
    window.location.href= base_url + "Catalogos/Ctrl_Puestos";

//funciones
const enviar_datos = ( obj ) => {
    $.ajax({
        url: base_url_rest+'catalogos/puestos/'+id_puesto,
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

$(document).ready( () => {
    for(var i = 1; i<= 4; i++)
        $("#selNivel").append('<option value="'+i+'">Nivel '+i+'</option>');

    $("#nombrePuesto").val(_nombre_puesto);
    $("#selNivel").val(_nivel);
});

$("#selNivel").change(function(){
	if($("#selNivel").val() != ""){
		$("#error_sel_nivel").html("");
	}else{
		$("#error_sel_nivel").html("Campo obligatorio");
	}
});

$("#nombrePuesto").keydown(function(ev){
	this.validaciones = new VALIDACIONES();
    let resultado = this.validaciones.caracteres_validos(ev.key,1);
    if(!resultado.resp){
        ev.preventDefault();
    }
});

$("#nombrePuesto").keyup(function(){
	$("#guardar").off("click", almacenar);
});

$("#nombrePuesto").change(function(){
	$("#error_nombre_puesto").html('')
	erroresGenerales = false
    $("#loadingValidar").show();

	let validaciones = new VALIDACIONES();
	if($("#nombrePuesto").val() == ""){
		$("#error_nombre_puesto").html('Campo Obligatorio')
		erroresGenerales = true
	}else{
		let resultado = validaciones.caracteres_validos($("#nombrePuesto").val(),2);
		console.log(resultado);
		if(!resultado.resp){
			$("#error_nombre_puesto").html('Información no valida')
			erroresGenerales = true
		}
	}

	if(!erroresGenerales){
		$.ajax({
			url: base_url_rest + 'catalogos/areas/nombre/' + nombrePuesto.value +'/'+ id_puesto,
			type: 'GET',
			global: false,
			success: (data) => {
				if(data.data.length > 0){
					$("#error_nombre_puesto").html('El registro ya existe')
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
//eventos
$("#guardar").on("click", almacenar);

function almacenar(){
    //validaciones
    let flag = true;

    //nombre contrato (validacion)
    if($("#nombrePuesto").val() == ""){
        flag = false;
        $("#error_nombre_puesto").html("Campo obligatorio");
    }

    //Nivel (validacion)
    if($("#selNivel").val() == ""){
        flag = false;
        $("#error_sel_nivel").html("Campo obligatorio");
    }else {
        $("#error_sel_nivel").html("");
    }

    if(flag && !erroresGenerales)
        pedir_confirmacion_guardar();
}

$("#confirmar_guardar").click( (e) => {
    enviar_datos(JSON.stringify({
        nombre      : $("#nombrePuesto").val(),
        nivel       : $("#selNivel").val(),
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
        window.location.href = base_url + 'Catalogos/Ctrl_Puestos';
});

$("#confirmar_salir_sin_guardar").click( (e) => {
    window.location.href = base_url + 'Catalogos/Ctrl_Puestos';
});

$(document).ready(function() {
	spinner.style.visibility = "hidden";
});