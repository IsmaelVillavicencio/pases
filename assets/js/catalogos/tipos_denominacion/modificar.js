const id_TipoDenominacion = localStorage.getItem("id_TipoDenominacion");
const nombre_denominacion = localStorage.getItem("nombre_denominacion");
let erroresGenerales = false;

class TiposDenominacion{
	constructor(){
        this.inicio();
	}
	inicio(){
        nombreTipoDenominacion.value = nombre_denominacion

        Guardar.addEventListener("click",this.guardar)
        confirmar_guardar.addEventListener("click",this.confirmarGuardar)
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
                url: base_url_rest+'catalogos/denominacion/nombre/'+ev.target.value+'/'+id_TipoDenominacion,
                type: 'GET',
                global: false,
                success: (data) => {
                    if(data.data.length != 0){
                        error.innerHTML = 'El registro ya existe'
                        erroresGenerales = true
                    }
                    Guardar.addEventListener('click',TiposDenominacion.prototype.guardar);
                    $(loadingValidar).hide();
                },
                error: (xhr, ajaxOptions, thrownError) =>{
                    $("#modal_confirmar_guardar").modal("hide");
                    peticion_fallida(thrownError);
                    Guardar.addEventListener('click',TiposDenominacion.prototype.guardar);
                    $(loadingValidar).hide();
                }
            });
        }else{
            Guardar.addEventListener('click',TiposDenominacion.prototype.guardar);
            $(loadingValidar).hide();
        }
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
            url: base_url_rest+'catalogos/denominacion/'+id_TipoDenominacion,
            type: 'PUT',
            data: JSON.stringify({
                ip          : ip_address,
                idusuario   : id_usuario_sesion,
                nombre      : nombreTipoDenominacion.value,
            }),
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
        })
    }
    regresar(){
        if(cambios==1){
            pedir_confirmar_regresar();
        }else{
            location.href = base_url+"Catalogos/Ctrl_TiposDenominacion"; 
        }
    }
}

const doc = new TiposDenominacion()

$(document).ready(function() {
	spinner.style.visibility = "hidden";
});