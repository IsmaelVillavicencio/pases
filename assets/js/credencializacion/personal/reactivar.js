const id_personal = localStorage.getItem("id_personal");
let id_domicilio, id_contacto
let errorDocumento = false;

class Personal{
    constructor(){
         spinner.style.visibility="hidden";
         this.inicio();
         this.obtener_datos();
         this.obtener_domicilio();
         this.obtener_contacto();
    }
    inicio(){
        correoElectronico.addEventListener("change",this.validar_correo);
        codigoPostal.addEventListener("change", this.obtener_colonias);
        btnGuardar.addEventListener("click",this.realizar_almacenamiento);
        btnRegresar.addEventListener("click",this.regresar)

        confirmar_reactivar_registro.addEventListener('click',this.reactivar_registro)

        confirmar_salir_sin_guardar.addEventListener('click',(ev)=> {
            window.location.href = base_url + 'Credencializacion/Ctrl_Personal';
        });

        correoElectronico.addEventListener('keyup',() => {
            btnGuardar.removeEventListener("click",this.realizar_almacenamiento);
        })

        let datosValidar = document.getElementsByClassName('validar');
        for (var i = 0; i < datosValidar.length; i++) {
            datosValidar[i].addEventListener('change', (ev) => {
                if(ev.target.value != ""){
                    $("#error"+ev.target.id).hide();
                    if(ev.target.id == "numTelefono"){
                        $(errornumTelefonoLongitud).hide();
                    }
                }
            })
        }

        let validacionCambio = document.getElementsByClassName('form-control');
            for (var i = 0; i < validacionCambio.length; i++) {
                validacionCambio[i].addEventListener('change', (ev) => {
                    cambios = 1;
                })
            }
    }

    regresar(){
        if(cambios == 1){
            pedir_confirmar_regresar();
            return false
        }
        window.location.href = base_url + 'Credencializacion/Ctrl_Personal';
    }
    obtener_datos() {
        $.ajax({
			url: base_url+'Usuarios/Ctrl_Personal/getById',
			type: 'GET',
            dataType: 'json',
            data : {
                idpersonal : id_personal
            },
			success: function(response){
				if(response.status){
                    $(selPuesto).data("puesto",response.data.puestos);
                    $(selArea).data("id",response.data.id_area);
                    $(selNacionalidad).data("id",response.data.id_nacionalidad);
                    $(tipoSangre).data("id",response.data.id_tipo_sangre);
                    $(estadonacimiento).data("id",response.data.id_estado_nacimiento);
                    $(ciudadnacimiento).data("nombre",response.data.ciudad_nacimiento);
                    curp.value = response.data.curp
                    nombre.value =  response.data.nombre
                    primer_apellido.value = response.data.primer_apellido
                    segundo_apellido.value = response.data.segundo_apellido
                    fechaNacimiento.value = response.data.fecha_nacimiento
                    edad.value = response.data.edad
                    sexo.value = response.data.sexo
                }
            },
            complete: function(){
                Personal.prototype.obtener_puestos();
                Personal.prototype.obtener_areas();
                Personal.prototype.obtener_denominaciones();
                Personal.prototype.obtener_nacionalidades();
                Personal.prototype.obtener_tipo_sangre();
                Personal.prototype.obtener_estados();
            }
		}).fail( function(response) {
		});
    }
    obtener_puestos(){
        $.ajax({
			url: base_url_rest + 'catalogos/puestos/estatus/1',
			type: 'GET',
            dataType: 'json',
            data : {
                estatus : 1
            },
            beforeSend: function(){
                $(selPuesto).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(selPuesto).append('<option value="'+element.id+'" '+($(selPuesto).data("puesto") == element.nombre ? 'selected' : '')+'>'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {
			
		});
    }
    obtener_areas(){
        $.ajax({
			url: base_url_rest+'catalogos/areas/estatus/1',
			type: 'GET',
            dataType: 'json',
            beforeSend: function(){
                $(selArea).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(selArea).append('<option value="'+element.id_area+'" '+($(selArea).data("id") == element.id_area ? 'selected' : '')+'>'+element.nombre_area+'</option>');
                    
                });
			}
		}).fail( function(response) {
			
		});
    }
    obtener_denominaciones(){
        $.ajax({
			url: base_url_rest+'catalogos/denominacion/estatus/1',
			type: 'GET',
            dataType: 'json',
            beforeSend: function(){
                $(selDenominacion).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(selDenominacion).append('<option value="'+element.id+'" '+($(selDenominacion).data("id") == element.id_area ? 'selected' : '')+'>'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {
			
		});
    }
    obtener_nacionalidades(){
        $.ajax({
			url: base_url_rest+'catalogos/nacionalidades/estatus/1',
			type: 'GET',
            dataType: 'json',
            beforeSend: function(){
                $(selNacionalidad).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(selNacionalidad).append('<option value="'+element.id+'" '+($(selNacionalidad).data("id") == element.id ? 'selected' : '')+'>'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {
			
		});
    }
    obtener_tipo_sangre(){
        $.ajax({
			url: base_url_rest+'catalogos/tiposangre/estatus/1',
			type: 'GET',
            dataType: 'json',
            beforeSend: function(){
                $(tipoSangre).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(tipoSangre).append('<option value="'+element.id+'" '+($(tipoSangre).data("id") == element.id ? 'selected' : '')+'>'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {
			
		});
    }
    obtener_estados(){
        $.ajax({
			url: base_url_rest+'catalogos/estados/1',
			type: 'GET',
            dataType: 'json',
            beforeSend: function(){
                $(estadonacimiento).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(estadonacimiento).append('<option value="'+element.clave+'" data-id="'+element.id+'" '+($(estadonacimiento).data('id') == element.id ? 'selected' : '')+'>'+element.nombre+'</option>')
                    
                    
                });
			},
            complete: function(){
                Personal.prototype.obtener_municipios();
            }
		}).fail( function(response) {
			
		});
    }
    obtener_municipios(){
        $.ajax({
			url: base_url_rest+'catalogos/municipios/'+estadonacimiento.value+'/1',
			type: 'GET',
            dataType: 'json',
            global: false,
            beforeSend: function(){
                $(ciudadnacimiento).html('');
                $(ciudadnacimiento).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(ciudadnacimiento).append('<option value="'+element.id+'" '+($(ciudadnacimiento).data('nombre') == element.nombre ? 'selected' : '')+'>'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {
			
		});
    }
    obtener_colonias(){
        $.ajax({
			url: base_url_rest+'catalogos/colonias/'+codigoPostal.value,
			type: 'GET',
            dataType: 'json',
            global: false, //detalle
            data : {
                cp : codigoPostal.value
            },
            beforeSend: function(){
                $(estado).val('');
                $(municipio).val('');
                $(selColonia).html('');

                $(estado).data('id',null);
                $(municipio).data('id',null);

                $(selColonia).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				if(response.data.length > 0){
                    $(estado).val(response.data[0].nombre_estado);
                    $(municipio).val(response.data[0].nombre_municipio);

                    $(estado).data('id',response.data[0].id_estado);
                    $(municipio).data('id',response.data[0].id_municipio);

                    $("#errorestado").html("")
                    $("#errormunicipio").html("")
                }

                response.data.forEach(element => {
                    $(selColonia).append('<option value="'+element.id+'" '+($(selColonia).data("id") == element.id ? 'selected' : '')+'>'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {
            if(response.responseText=="Sesion"){
                error_sesion();   
            }
		});
    }
    validar_correo(ev){
        this.validaciones = new VALIDACIONES();

        $("#errorcorreoElectronico").html("Campo obligatorio");
        $("#errorcorreoElectronico").hide();

        errorDocumento = false
        $(loadingValidar).show();

        let resultado = this.validaciones.correo(ev.target.value);
        if(!resultado.resp){
            errorDocumento = true
            ev.target.value = "";
            $("#errorcorreoElectronico").html("El formato no es correcto");
            $("#errorcorreoElectronico").show();
        }

        if(!errorDocumento){
            $.ajax({
                url: base_url+'Usuarios/Ctrl_Usuarios/getByCorreo',
                type: 'GET',
                global: false,
                data : {
                    correo : ev.target.value.trim(),
                    idpersonal : id_personal
                },
                success: (data) => {
                    if(data.data != null){
                        $("#errorcorreoElectronico").html("El registro ya existe");
                        $("#errorcorreoElectronico").show();
                        errorDocumento = true
                    }
                     btnGuardar.addEventListener('click',Personal.prototype.realizar_almacenamiento);
                    $(loadingValidar).hide();
                },
                error: (xhr, ajaxOptions, thrownError) =>{
                    peticion_fallida(thrownError);
                   // btnGuardar.addEventListener('click',Personal.prototype.realizar_almacenamiento);
                    $(loadingValidar).hide();
                }
            });
        }else{
            btnGuardar.addEventListener('click',Personal.prototype.realizar_almacenamiento);
            $(loadingValidar).hide();
        }
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
                    $(selColonia).data("id",response.data.id_colonia);
                    $(estado).data('id',response.data.id_estado);
                    $(municipio).data('id',response.data.id_municipio);
                    id_domicilio = response.data.id
                    codigoPostal.value = response.data.cp
                    estado.value = response.data.estado
                    municipio.value = response.data.municipio
                    calle.value = response.data.calle
                    noExterior.value = response.data.n_ext
                    noInterior.value = (response.data.n_int == 0 ? '' : response.data.n_int)
                    entreCalle1.value = response.data.entre_calle_1
                    entreCalle2.value = response.data.entre_calle_2
                }
            },
            complete: function(){
                Personal.prototype.obtener_colonias();
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
                    id_contacto = response.data.id;      
                    correoElectronico.value = response.data.correo
                    numTelefono.value = response.data.telefono
                }
            }
		}).fail( function(response) {
			
		});
    }
    realizar_almacenamiento(){

        console.log("guardar")
        let validacion = true;
        let datosValidar = document.getElementsByClassName('validar');
        for (var i = 0; i < datosValidar.length; i++) {
            if(datosValidar[i].value == ""){
                $("#error"+datosValidar[i].id).show();
                validacion = false;
            }else if(datosValidar[i].id == "numTelefono"){
                if(datosValidar[i].value.length != 10){
                    $(errornumTelefonoLongitud).show();
                    validacion = false;
                }
            }
        }

        if(validacion && !errorDocumento){
            $("#modal_confirmar_reactivar").modal()
        }
    }

    reactivar_registro(){
        
		$.ajax({
            url: base_url + 'Usuarios/Ctrl_Personal/active',
            type: "POST",
            data: {
                idpersona     : id_personal,
                idpuesto      : selPuesto.value,
                idarea        : selArea.value,
                iddomicilio   : id_domicilio,
                cp            : codigoPostal.value,
                idestado      : $(estado).data('id'),
                idmunicipio   : $(municipio).data('id'),
                idcolonia     : selColonia.value,
                calle         : calle.value,
                nint          : noInterior.value,
                next          : noExterior.value,
                entrecalleuno : entreCalle1.value,
                entrecalledos : entreCalle2.value,
                idcontacto    : id_contacto,
                correo        : correoElectronico.value,
                telefono      : numTelefono.value,
                [csrf.name]   : csrf.value
            },
            beforeSend: function(){
                $("#modal_confirmar_reactivar").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                console.log("si está activo")
                if(data.status == true){

                    reactivar_exitoso(data.message);
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
}
const personal = new Personal();

$(document).ready(function (e) {

    $("#aceptar").on('click', function(){
		$("#btnGuardar").hide();
        localStorage.setItem("id_personal", id_personal);
        window.location.href= base_url + "Usuarios/Ctrl_Personal/consultar";
     }); 
});