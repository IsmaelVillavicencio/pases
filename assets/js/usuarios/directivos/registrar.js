let validacionDirectivo = true; 

class Directivos{
    constructor(){
        this.inicio();
        this.obtenerPersonal();
        this.obtenerNombramiento();
        
    }
    inicio(){        
   
        var inpPersonalidad = document.getElementById('personalidad');
            inpPersonalidad.onpaste = function(e) {
                e.preventDefault();
        }
        
        selNombramiento.addEventListener('change',function(){
            if(selNombramiento.value != ""){
                $(errorNombramiento).hide()
            }
        })
        personalidad.addEventListener('change',function(){
            if(personalidad.value != ""){
                $(errorPersonalidad).hide()
            }
        })
        personalidad.addEventListener("keydown",(ev) => {
            if(ev.keyCode != 16){
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_especial(ev.key,1);
                if(!resultado.resp){
                    ev.preventDefault();
                }
            }
        })
        confirmar_salir_sin_guardar.addEventListener('click',(ev)=> {
            window.location.href = base_url + 'Usuarios/Ctrl_Directivos';
        });
        confirmar_guardar.addEventListener('click',this.confirmarGuardar)
        confirmar_reactivar_registro.addEventListener('click',this.confirmarreactivar)
        selNombramiento.addEventListener('change',this.obtenerPersonalRol)
        btnGuardar.addEventListener('click',this.guardar);
        
    }
    obtenerPersonal(){
        $.ajax({
			url: base_url+'Usuarios/Ctrl_Personal/getByEstatus',
			type: 'GET',
            dataType: 'json',
            data : {
                estatus : 1
            },
			success: function(response){
				response.data.forEach(element => {
                    if(element.segundo_apellido == null){
                        $(selPersonal).append('<option value="'+element.id+'">'+element.nombre+' '+element.primer_apellido+' '+'"'+'</option>');  
                    }else{
                        $(selPersonal).append('<option value="'+element.id+'">'+element.nombre+' '+element.primer_apellido+' '+element.segundo_apellido+'</option>');
                    }
                    
                });

            },
            complete: function(){
                $(selPersonal).select2({placeholder: "Seleccione"});
            }
		}).fail( function(response) {
			
        }); 
    }
    obtenerNombramiento(){
        $.ajax({
			url: base_url+'Catalogos/Ctrl_Nombramientos/getByEstatus',
			type: 'GET',
            dataType: 'json',
            data : {
                estatus : 1
            },
            beforeSend: function(){
                $(selNombramiento).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(selNombramiento).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {
			
        }); 
    }
    obtenerPersonalRol(){
        error.innerHTML = ''
		
        if($("#selPersonal").val() != "" && selNombramiento.value != "" ){
			$("#error").html("<span style='color:#000;'><i>Validando ...</i> </span>");
			validacionDirectivo = false;
		
            $.ajax({
                url: base_url+'Usuarios/Ctrl_Directivos/getByPersonalRol',
                type: 'GET',
                dataType: 'json',
                data : {
                    idpersonal : $("#selPersonal").val(),
                    idnombramiento : selNombramiento.value, 
                    iddirectivo : 0
                },
                beforeSend: function(){

                },
                success: function(response){
						$("#error").html("");                    
                        if(response.data != null){
                            if(response.data.estatus_directivos == 0){
                                error.innerHTML = 'El registro ya existe'
                                pedir_confirmacion_reactivar("El registro ya existe ¿desea reactivarlo?")  
                                validacionDirectivo = false                              
                            }else{
                                error.innerHTML = 'El registro ya existe'               
                                validacionDirectivo = false
                            }
                        }else{
                            validacionDirectivo = true
                        }
                }

            }).fail( function(response) {
                
            }); 
        }
    }

    guardar(){
        let validacion = true;

        if(selPersonal.value == ""){
            error.innerHTML = 'Campo obligatorio'
            validacion = false
        }
        if(selNombramiento.value == ""){
            $(errorNombramiento).show()
            validacion = false
        }
        if(personalidad.value == ""){
            $(errorPersonalidad).show()
            validacion = false
        }
        if(validacion && validacionDirectivo){
            $("#modal_confirmar_guardar").modal()
        }
    }

    confirmarreactivar(ev){
        const id_directivo = localStorage.getItem("id_directivo");
		$.ajax({
            url: base_url + 'Usuarios/Ctrl_Directivos/active',
            type: "POST",
            data: {
                iddirectivo: id_directivo,
                [csrf.name] : csrf.value,
            },
            beforeSend: function(){
                $("#modal_confirmar_reactivar").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    reactivar_exitoso(data.message);
                    error.innerHTML = ''
                    selPersonal.value = ""
                    $(selPersonal).trigger('change');
                    selNombramiento.value = ""
                    personalidad.value = ""
                    cambios = 0
                }
                else
                    peticion_fallida(data.message);
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $("#modal_confirmar_reactivar").modal("hide");
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        })
	}

    confirmarGuardar(){
        $.ajax({
            url: base_url + 'Usuarios/Ctrl_Directivos/add',
            type: 'POST',
            data: {
                idpersonal : selPersonal.value,
                idnombramiento : selNombramiento.value,
                personalidad : personalidad.value,
                [csrf.name] :   csrf.value
            },
            beforeSend:function(){
                $("#modal_confirmar_guardar").modal("hide");
                console.log(personalidad.value)
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status != true)
                    peticion_fallida(data.message);
                else
                    selPersonal.value = ""
                    selNombramiento.value = ""
                    personalidad.value = ""
                    error.innerHTML = ''
                    $(selPersonal).trigger('change');
                    registro_exitoso();
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $("#modal_confirmar_guardar").modal("hide");
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        })
    }
}

const dir = new Directivos()

$("#selPersonal").change( (e) => {
    dir.obtenerPersonalRol();
});

$(".form-control").change( (e) => {
    cambios = 1
});
$("#btnRegresar").click( (e) => {
	if(cambios == 1)
		pedir_confirmar_regresar();
	else
        window.location.href = base_url + 'Usuarios/Ctrl_Directivos';
});


