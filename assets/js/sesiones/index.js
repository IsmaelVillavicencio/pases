class Ses_InicioSesion{
    constructor(){
        const This = this.inicio();
        $("#copyright").addClass("ml-auto")
    }
    
    inicio(){
        iniciarSesion.addEventListener('click', this.envioDatos)
        //spinner.style.visibility="hidden";
    }

    envioDatos(){

        if(usuario.value==""){
            $(errorUsuario).text("Debe ingresar un usuario")
            $(errorUsuario).show()
            return false
        }else{
            $(errorUsuario).hide()
        }

        if(contrasena.value==""){
            $(errorContrasena).text("Debe ingresar una contraseña")
            $(errorContrasena).show()
            return false
        }else{
            $(errorContrasena).hide()
        }
        
		$.ajax({
	      	url: base_url+'Sesiones/Ctrl_Sesiones/validate',
            type: 'POST',
            global: false,
	      	data : {
                correo      : usuario.value,
                contrasena  : contrasena.value,
                [csrf.name] : csrf.value
            },
            beforeSend:function(){
                spinner.style.visibility = 'visible'
            },
			success: (data) => {                 
                //Modal inicio de sesion exitoso
                csrf.value = data.token;
                window.location.href = base_url + 'inicio';
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                spinner.style.visibility = 'hidden'
                peticion_fallida(xhr.responseJSON.message);
                csrf.value = xhr.responseJSON.token;
            }
        });
    }

}

const sesInicio = new Ses_InicioSesion()