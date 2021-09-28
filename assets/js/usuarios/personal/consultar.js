const id_personal = localStorage.getItem("id_personal");
const id_domicilio = localStorage.getItem("id_domicilio");
const id_contacto = localStorage.getItem("id_contacto");

class Personal{
	constructor(){
        this.inicio();
        this.obtener_datos();
        this.obtener_domicilio();
        this.obtener_contacto();
	}
	inicio(){
        confirmar_baja.addEventListener("click",this.confirmarbaja)
    }
    obtener_datos(){
        $.ajax({
			url: base_url+'Usuarios/Ctrl_Personal/getById',
			type: 'GET',
            dataType: 'json',
            data : {
                idpersonal : id_personal
            },
			success: function(response){
				if(response.status){
                    puesto.value = response.data.puestos
                    area.value = response.data.area
                    denominacion.value = response.data.denominacion
                    curp.value = response.data.curp
                    nombre.value =  response.data.nombre
                    primer_apellido.value = response.data.primer_apellido
                    segundo_apellido.value = response.data.segundo_apellido
                    fechaNacimiento.value = response.data.fecha_nacimiento
                    edad.value = response.data.edad
                    sexo.value = response.data.sexo
                    nacionalidad.value = response.data.nacionalidad
                    estadoNacimiento.value = response.data.estado_nacimiento
                    ciudadNacimiento.value = response.data.ciudad_nacimiento
                    tipoSangre.value = response.data.sangre
                    if(response.data.estatus == 1){
                        $(".Reactivar").hide()
                        $(".Eliminar").show()
                    }else{
                        $(".Reactivar").show()
                        $(".Eliminar").hide()
                    }
                }
                console.log(response.data)
            }
		}).fail( function(response) {
			
		});
    }
    obtener_domicilio(){
        $.ajax({
			url: base_url+'Usuarios/Ctrl_Personal/getDomicilio',
			type: 'GET',
            dataType: 'json',
            data : {
                idpersonal : id_personal
            },
			success: function(response){
				if(response.data != null){
                    codigoPostal.value = response.data.cp
                    estado.value = response.data.estado
                    municipio.value = response.data.municipio
                    colonia.value = response.data.colonia
                    calle.value = response.data.calle
                    noExterior.value = response.data.n_ext
                    noInterior.value = (response.data.n_int == 0 ? '' : response.data.n_int)
                    entreCalle1.value = response.data.entre_calle_1
                    entreCalle2.value = response.data.entre_calle_2
                }
            }
		}).fail( function(response) {
			
		});
    }
    obtener_contacto(){
        $.ajax({
			url: base_url+'Usuarios/Ctrl_Personal/getContacto',
			type: 'GET',
            dataType: 'json',
            data : {
                idpersonal : id_personal
            },
			success: function(response){
				if(response.data != null){
                    correoElectronico.value = response.data.correo
                    numTelefono.value = response.data.telefono
                }
            }
		}).fail( function(response) {
			
		});
    }
    confirmarbaja(ev){
		$.ajax({
            url: base_url + 'Usuarios/Ctrl_Personal/delete',
            type: "POST",
            data: {
                idpersonal: id_personal,
                iddomicilio: id_domicilio,
                idcontacto: id_contacto,
                [csrf.name] : csrf.value
            },
            beforeSend:function(){
                $("#modal_confirmar_baja").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
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
                csrf.value = xhr.responseJSON.token;
            }
        })
	}
    regresar(){
        if(cambio == 1){
            pedir_confirmar_regresar();
            return false
        }
        window.location.href = base_url + 'Usuarios/Ctrl_Personal';
    }
}

const pers = new Personal()

$("#regresar").click(function(){
	 window.location.href = base_url + 'Usuarios/Ctrl_Personal';
})