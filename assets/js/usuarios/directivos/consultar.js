const id_directivo = localStorage.getItem("id_directivo")
const id_nombramiento = localStorage.getItem("id_nombramiento")
const personalidadtxt = localStorage.getItem("personalidad")
const estatus_directivo = localStorage.getItem("estatus_directivo")
console.log(estatus_directivo)
const id_persona = localStorage.getItem("id_persona")

class Directivos{
    constructor(){
        this.inicio();
        this.obtenerPersonal();
        this.obtenerNombramiento();
       
    }
    inicio(){        
        
        confirmar_salir_sin_guardar.addEventListener('click',(ev)=> {
            window.location.href = base_url + 'Usuarios/Ctrl_Directivos';
        });
       
        btnRegresar.addEventListener('click',this.regresar)
        confirmar_baja.addEventListener("click",this.confirmarbaja)
        confirmar_reactivar_registro.addEventListener("click",this.confirmarreactivar)
       
        
        personalidad.value = personalidadtxt

        if(estatus_directivo == 0){
            $(".Eliminar").hide()
            $(".Reactivar").show()
        }else{
            $(".Eliminar").show()
            $(".Reactivar").hide()
        }
    }
   
    obtenerPersonal(){
        $.ajax({
			url: base_url+'Usuarios/Ctrl_Personal/getById',
			type: 'GET',
            dataType: 'json',
            data : {
                idpersonal : id_persona
            },
    
			success: function(response){
                if(response.status){
                selPersonal.value =	response.data.nombre+" "+response.data.primer_apellido+" "+response.data.segundo_apellido
                }
            }
           
		}).fail( function(response) {
			
        }); 
    }
    obtenerNombramiento(){
        $.ajax({
			url: base_url+'Catalogos/Ctrl_Nombramientos/getById',
			type: 'GET',
            dataType: 'json',
            data : {
                idnombramiento : id_nombramiento
            },
            beforeSend: function(){
        
            },
			success: function(response){
                if(response.status){
                    selNombramiento.value =	response.data.nombre
                }
            }
		}).fail( function(response) {
			
        }); 
    }

    confirmarbaja(ev){
        const id_directivo = localStorage.getItem("id_directivo");
		$.ajax({
            url: base_url + 'Usuarios/Ctrl_Directivos/delete',
            type: "POST",
            data: {
                iddirectivo: id_directivo,
                [csrf.name] : csrf.value
            },
            beforeSend:function(){
                $("#modal_confirmar_baja").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    registro_exitoso(data.message);
                    $(".Eliminar").hide()
                    $(".Reactivar").show()
                }
                else
                    peticion_fallida(data.message);
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $("#modal_confirmar_baja").modal("hide");
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        })
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
                    $(".Eliminar").show()
                    $(".Reactivar").hide()
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

    regresar(){    
        window.location.href = base_url + 'Usuarios/Ctrl_Directivos';
    }
    
    
}

const dir = new Directivos()