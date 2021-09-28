//variables
const info = JSON.parse(localStorage.getItem("puesto_info"));
//validaciones

if(info.estatus == 1){
    $(".Reactivar").hide()
    $(".Eliminar").show()
}else{
    $(".Reactivar").show()
    $(".Eliminar").hide()
}
if(!info)
	window.location.href = base_url +"Catalogos/Ctrl_Puestos";

//funciones
const llenar_formulario = () => {
	$("#nivel").val(info.id_nivel);
	$("#nombrePuesto").val(info.nombre);
}

const ejecutar_reactivar = () => {   
    $.ajax({
        url: base_url_rest + 'catalogos/puestos/en/' + info.id,
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
                $(".Reactivar").hide()
                $(".Eliminar").show()
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


const ejecutar_baja = () => {
    $.ajax({
        url: base_url_rest + 'catalogos/puestos/' + info.id,
        type: "DELETE",
        data: JSON.stringify({
            ip          : ip_address,
            idusuario   : id_usuario_sesion
        }),
        beforeSend:function(){
            $("#modal_confirmar_baja").modal("hide");
        },
        success: (data) => {
            if(data.status == true){
                registro_exitoso(data.message);
                $(".Reactivar").show()
                $(".Eliminar").hide()
            }
            else
                peticion_fallida(data.message);
        },
        error: (xhr, ajaxOptions, thrownError) =>{
            $("#modal_confirmar_baja").modal("hide");
            peticion_fallida(thrownError);
        }
    })
}

//eventos
$("#confirmar_baja").click( (e) => {
    ejecutar_baja();
});
$("#confirmar_reactivar_registro").click( (e) => {
    ejecutar_reactivar();
});

$(document).ready( () => {
	llenar_formulario();
    spinner.style.visibility = "hidden";
})