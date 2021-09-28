let erroresGenerales = true;

class Reg_TipoDenominacion{
    constructor(){
        this.inicio();
    }
    inicio(){
        Guardar.addEventListener('click',this.guardar)
        confirmar_guardar.addEventListener('click',this.confirmarGuardar)
        Regresar.addEventListener('click',this.regresar)
        confirmar_salir_sin_guardar.addEventListener('click',(ev)=>{
            location.href = base_url+"Catalogos/Ctrl_TiposDenominacion"; 
        })
        nombreTipoDenominacion.addEventListener('change',this.validar)
        nombreTipoDenominacion.addEventListener('keyup',() => {
            Guardar.removeEventListener("click",this.guardar);
        })
        nombreTipoDenominacion.addEventListener("keydown",(ev) => {
            this.validaciones = new VALIDACIONES();
            let resultado = this.validaciones.caracteres_validos(ev.key,1);
            if(!resultado.resp){
                ev.preventDefault();
            }
        })
        confirmar_reactivar_registro.addEventListener("click",this.confirmarreactivar)
    }
    validar(ev){
        cambios = 1;
        error.innerHTML = ''
        erroresGenerales = false
        $(loadingValidar).show();

        this.validaciones = new VALIDACIONES();
        if(ev.target.value == ""){
            error.innerHTML = 'Campo Obligatorio'
            erroresGenerales = true
        }else{
            let resultado = this.validaciones.caracteres_validos(ev.target.value,2);
            if(!resultado.resp){
                error.innerHTML = 'Información no valida'
                erroresGenerales = true
            }
        }

        if(!erroresGenerales){
            $.ajax({
                url: base_url_rest+'catalogos/denominacion/nombre/'+ev.target.value+'/0',
                type: 'GET',
                global: false,
                success: (data) => {
                    if(data.data.length != 0){
                        error.innerHTML = 'El registro ya existe'
                        erroresGenerales = true
                        if(data.data.estatus == 0){
                            pedir_confirmacion_reactivar("El registro ya existe ¿desea reactivarlo?");
                            localStorage.setItem("iddenominacion",data.data.id)
                        }
                    }
                    Guardar.addEventListener('click',Reg_TipoDenominacion.prototype.guardar);
                    $(loadingValidar).hide();
                },
                error: (xhr, ajaxOptions, thrownError) =>{
                    $("#modal_confirmar_guardar").modal("hide");
                    peticion_fallida(thrownError);
                    Guardar.addEventListener('click',Reg_TipoDenominacion.prototype.guardar);
                    $(loadingValidar).hide();
                }
            });
        }else{
            Guardar.addEventListener('click',Reg_TipoDenominacion.prototype.guardar);
            $(loadingValidar).hide();
        }
    }

    confirmarreactivar(){
        const id_tipo_denominacion = localStorage.getItem("iddenominacion");
		$.ajax({
            url: base_url_rest+'catalogos/denominacion/en/'+id_tipo_denominacion,
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
                        nombreTipoDenominacion.value = ""
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

    guardar(){
        if(nombreTipoDenominacion.value == ""){
            error.innerHTML = 'Campo Obligatorio'
            erroresGenerales = true
        }

        if(!erroresGenerales){
            pedir_confirmacion_guardar();
        }
    }
    confirmarGuardar(){
		$.ajax({
	      	url: base_url_rest+'catalogos/denominacion',
            type: 'POST',
	      	data : JSON.stringify({
                ip          : ip_address,
                idusuario   : id_usuario_sesion,
                nombre : nombreTipoDenominacion.value,
            }),
            beforeSend:function(){
                $("#modal_confirmar_guardar").modal("hide");
            },
			success: (data) => {
                if(data.status != true)
                    peticion_fallida(data.message);
                else
                    registro_exitoso(data.message);
                    nombreTipoDenominacion.value = ""
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $("#modal_confirmar_guardar").modal("hide");
                peticion_fallida(thrownError);
            }
        });
    }
    regresar(){
        if(cambios==1){
            pedir_confirmar_regresar();
        }else{
            location.href = base_url+"Catalogos/Ctrl_TiposDenominacion"; 
        }
    }

}
const regTipDen = new Reg_TipoDenominacion()

$(document).ready(function() {
	spinner.style.visibility = "hidden";
});