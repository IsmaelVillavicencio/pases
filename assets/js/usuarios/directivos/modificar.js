let validacionDirectivo = true;
const id_directivo = localStorage.getItem("id_directivo")
const id_nombramiento = localStorage.getItem("id_nombramiento")
const personalidadtxt = localStorage.getItem("personalidad")
const id_persona = localStorage.getItem("id_persona")
var iniPersonal=id_persona
var iniNombramiento=id_nombramiento
var iniPersonalidad=personalidadtxt


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
        selNombramiento.addEventListener('change',this.obtenerPersonalRol)
        btnGuardar.addEventListener('click',this.guardar);
        personalidad.value = personalidadtxt
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
                    $(selPersonal).append('<option value="'+element.id+'">'+element.nombre+' '+element.primer_apellido+' '+element.segundo_apellido+'</option>');
					if (element.id == id_persona) personalidad.value = element.personalidad;
                });
            },
            complete: function(){
                selPersonal.value = id_persona
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
            },
            complete: function(){
                selNombramiento.value = id_nombramiento
            }
		}).fail( function(response) {
			
        }); 
    }

    obtenerPersonalRol(){
        error.innerHTML = '' 
		$("#error").html("<span style='color:#000;'><i>Validando ...</i> </span>");
		validacionDirectivo = false;
        if($("#selPersonal").val() != "" && selNombramiento.value != "" ){

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
						if (selNombramiento.value == id_nombramiento){
							validacionDirectivo = true;
 						}
                        else if(response.data != null){
                            error.innerHTML = 'El registro ya existe'
                            validacionDirectivo = false
                                /*if(validacionDirectivo){
                                    btnGuardar.addEventListener('click',Directivos.prototype.guardar);
                                } */    
                        }else{
                            validacionDirectivo = true
                        }
						$("#btnGuardar").show();
                }
            }).fail( function(response) {
                $("#btnGuardar").show();
            }); 
        }
    }

    guardar(){
        let validacion = true;

        if(selNombramiento.value == ""){
            $(errorNombramiento).show();
            validacion = false
        }
        if(personalidad.value == ""){
            $(errorPersonalidad).show();$(errorPersonalidad).text("Campo obligatorio");
            validacion = false
        }
		var sec= this.validaciones = new VALIDACIONES();
		$(".espe").each(function(){		
			if (this.value!= ""){
				var res = sec.caracteres_validos_especial(this.value,0);
				if (res.resp == false){
					console.log(this.value.length);
					$("#errorPersonalidad").show();
					$("#errorPersonalidad").text("Formato incorrecto");
					validacion = false;
				} 
			}			
		});
		
        if(validacion && validacionDirectivo){
            $("#modal_confirmar_guardar").modal()
        }
    }
    confirmarGuardar(){
        console.log(personalidad.value)
        $.ajax({
            url: base_url + 'Usuarios/Ctrl_Directivos/update',
            type: 'POST',
            data: {
                iddirectivo : id_directivo,
                idpersonal : selPersonal.value,
                idnombramiento : selNombramiento.value,
                personalidad : personalidad.value,
                [csrf.name] :   csrf.value
            },
            beforeSend:function(){
                $("#modal_confirmar_guardar").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status != true)
                    peticion_fallida(data.message);
                else
                    registro_exitoso(data.message);
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
//desactiva el clic derecho del mouse
$("body").on("contextmenu",function(e){
    return false;
});
//descativa los comandos ctrl+c +v y +x
$('body').bind('cut copy paste', function (e) {
    e.preventDefault();
});