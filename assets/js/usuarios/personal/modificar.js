const id_personal = localStorage.getItem("id_personal");
let id_domicilio, id_contacto;
let cambio = 0;

let QrScanner
import('../../../librerias/QRScanner/qr-scanner.min.js').then((module) => {
    QrScanner = module.default;
    QrScanner.WORKER_PATH = '../../assets/librerias/QRScanner/qr-scanner-worker.min.js';
});

var scanner;
var datosEscaneados = '';
const video = document.getElementById('qr-video');
const camQrResult = document.getElementById('cam-qr-result');

let errorDocumento = false;

class Personal{
	constructor(){
        this.inicio();
        this.obtener_datos();
        this.obtener_domicilio();
        this.obtener_contacto();
	}
	inicio(){
        curp.addEventListener("keyup",(ev) => {
            ev.target.value = ev.target.value.toUpperCase()
        });
        curp.addEventListener("change",this.validar_curp)

        nombre.addEventListener("keydown",(ev) => {
            if(ev.keyCode != 16){
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos(ev.key,1);
                if(!resultado.resp){
                    ev.preventDefault();
                }
            }
        })
        nombre.addEventListener("keydown",(ev) => {
            if(ev.keyCode != 16){
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos(ev.key,1);
                if(!resultado.resp){
                    ev.preventDefault();
                }
            }
        })
        primer_apellido.addEventListener("keydown",(ev) => {
            if(ev.keyCode != 16){
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos(ev.key,1);
                if(!resultado.resp){
                    ev.preventDefault();
                }
            }
        })
        segundo_apellido.addEventListener("keydown",(ev) => {
            if(ev.keyCode != 16){
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos(ev.key,1);
                if(!resultado.resp){
                    ev.preventDefault();
                }
            }
        })
        calle.addEventListener("keydown",(ev) => {
            if(ev.keyCode != 16){
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos(ev.key,1);
                if(!resultado.resp){
                    ev.preventDefault();
                }
            }
        })
        entreCalle1.addEventListener("keydown",(ev) => {
            if(ev.keyCode != 16){
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos(ev.key,1);
                if(!resultado.resp){
                    ev.preventDefault();
                }
            }
        })
        entreCalle2.addEventListener("keydown",(ev) => {
            if(ev.keyCode != 16){
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos(ev.key,1);
                if(!resultado.resp){
                    ev.preventDefault();
                }
            }
        })

        codigoPostal.addEventListener("change", this.obtener_colonias);

        correoElectronico.addEventListener("change",this.validar_correo);
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
                cambio = 1;
            })
        }

        confirmar_salir_sin_guardar.addEventListener('click',(ev)=> {
            window.location.href = base_url + 'Usuarios/Ctrl_Personal';
        });

        btnGuardar.addEventListener("click",this.realizar_almacenamiento)
        confirmar_guardar.addEventListener("click",this.guardar)
        btnRegresar.addEventListener("click",this.regresar)

        let elementos = document.getElementsByClassName("escanear-camara");
        for (var i = 0; i < elementos.length; i++) {
            elementos[i].addEventListener("click", () =>{
                $(modalEscanerCURP).modal();
                QrScanner.hasCamera().then(hasCamera =>{
                    if(hasCamera){
                        scanner = new QrScanner(video, result => setResult(result), error => {
                            camQrResult.textContent = "Código QR no encontrado";
                        });
                        scanner.start();
                    }
                });
            })
        }

        elementos = document.getElementsByClassName("escanear-escaner");
        for (var i = 0; i < elementos.length; i++) {
            elementos[i].addEventListener("click",()=>{
                $(modalEscanerCURP).modal();
                $(escaneoQR).val("");
                $(escaneoQR).focus()
            })
        }

        let timeout
        escaneoQR.addEventListener("keydown",(ev)=>{
            spinner.style.visibility = 'visible'
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                let datosCURP = ev.target.value
                datosCURP = datosCURP.split("]")

                curp.value = datosCURP[0]
                nombre.value = datosCURP[4]
                primer_apellido.value = datosCURP[2]
                segundo_apellido.value = datosCURP[3]
                
                Personal.prototype.validar_curp();
                $(modalEscanerCURP).modal('hide');
                spinner.style.visibility = 'hidden'
                clearTimeout(timeout)
            },1000)
        })
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
                    $(selPuesto).data("puesto",response.data.puestos);
                    $(selArea).data("id",response.data.id_area);
					$(selDenominacion).data("id",response.data.id_denominacion);
                    $(selNacionalidad).data("id",response.data.id_nacionalidad);
                    $(tipoSangre).data("id",response.data.id_tipo_sangre);
                    $(estadonacimiento).data("id",response.data.id_estado_nacimiento);
                    $(ciudadnacimiento).data("nombre",response.data.ciudad_nacimiento);

                    if(response.data.curp != null){
                        curp.readOnly = true;
                        let elementos = document.getElementsByClassName("escanear-escaner");
                        elementos[0].style.visibility="hidden";
                    }
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
                     $(selDenominacion).append('<option value="'+element.id+'" '+($(selDenominacion).data("id") == element.id ? 'selected' : '')+'>'+element.nombre+'</option>');
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
                    $(estadonacimiento).append('<option value="'+element.clave+'" data-id="'+element.id+'" '+($(estadonacimiento).data('id') == element.id ? 'selected' : '')+'>'+element.nombre+'</option>');
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
    validar_curp(){
        $.ajax({
			url: base_url+'Usuarios/Ctrl_Personal/getByCURP',
			type: 'GET',
            dataType: 'json',
            global: false, //detalle
            data : {
                curp : curp.value
            },
            beforeSend: function(){

            },
			success: function(response){
                if(response.data == null){
                    this.validaciones = new VALIDACIONES();

                    $("#errorcurp").html("Campo obligatorio");
                    $("#errorcurp").hide();
                    $("#errorfechaNacimiento").hide();
                    $("#erroredad").hide();
                    $("#errorsexo").hide();
                    $("#errorselNacionalidad").hide();
            
                    let resultado = this.validaciones.curp(curp.value);
                    if(!resultado.resp){
                        $("#errorcurp").html(resultado.message);
                        $("#errorcurp").show();
                        fechaNacimiento.value=""
                        edad.value=""
                        sexo.value=""
                        selNacionalidad.value=""
                        return false;
                    }
                    fechaNacimiento.value = resultado.fecha_nacimiento;
                    edad.value = resultado.edad;
                    sexo.value = resultado.sexo;
                    estadonacimiento.value = resultado.estado_nacimiento;
                    if(resultado.nacionalidad == ""){
                        $(selNacionalidad).removeAttr("readonly");
                    }
                    selNacionalidad.value = resultado.nacionalidad;
                    $(estadonacimiento).trigger('change');
                }else{
                    curp.value="";
                    nombre.value = "";
                    primer_apellido.value = "";
                    segundo_apellido.value = "";

                    $("#errorcurp").html("Ya existe un registro asociado a la CURP");
                    $("#errorcurp").show();
                }
			}
		}).fail( function(response) {
            if(response.responseText=="Sesion"){
                error_sesion();
            }
		}); 

    }
    obtener_colonias(){
        $.ajax({
			url: base_url_rest+'catalogos/colonias/'+codigoPostal.value,
			type: 'GET',
            dataType: 'json',
            global: false, //detalle
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
                    btnGuardar.addEventListener('click',Personal.prototype.realizar_almacenamiento);
                    $(loadingValidar).hide();
                }
            });
        }else{
            btnGuardar.addEventListener('click',Personal.prototype.realizar_almacenamiento);
            $(loadingValidar).hide();
        }
    }
    regresar(){
        if(cambio == 1){
            pedir_confirmar_regresar();
            return false
        }
        window.location.href = base_url + 'Usuarios/Ctrl_Personal';
    }
    realizar_almacenamiento(){
        let validacion = true;
        let datosValidar = document.getElementsByClassName('validar');
		
		$("input[type='text']").each(function(){
			$("#error"+this.id).hide();
		});
        for (var i = 0; i < datosValidar.length; i++) {
			$("#error"+datosValidar[i].id).hide();
            if(datosValidar[i].value == ""){
                $("#error"+datosValidar[i].id).show();
				$("#error"+datosValidar[i].id).text("Campo obligatorio");
                validacion = false;
            }else if(datosValidar[i].id == "numTelefono"){
                if(datosValidar[i].value.length != 10){
                    $(errornumTelefonoLongitud).show();
                    validacion = false;
                }
            }
        }
		var sec= this.validaciones = new VALIDACIONES();	
		$(".letra").each(function(){		
			if (this.value!= ""){
				var res = sec.caracteres_validos(this.value,0);
				console.log(res.resp);
				if (res.resp == false){
					console.log(this.value.length);
					$("#error"+this.id).show();$("#error"+this.id).text("Formato incorrecto");
					validacion = false;
				} 
			}			
		});
		$(".espe").each(function(){		
			if (this.value!= ""){
				var res = sec.caracteres_validos(this.value,0);
				console.log(res.resp);
				if (res.resp == false){
					console.log(this.value.length);
					$("#error"+this.id).show();$("#error"+this.id).text("Formato incorrecto");
					validacion = false;
				} 
			}			
		});
		

        if(validacion && !errorDocumento){
            $("#modal_confirmar_guardar").modal()
        }
    }
    guardar(){
        $.ajax({
            url: base_url + 'Usuarios/Ctrl_Personal/update',
            type: 'POST',
            data: {
                idpuesto            :   selPuesto.value,
                idarea              :   selArea.value,
                iddenominacion      :   selDenominacion.value,
                idpersonal          :   id_personal,
                curp                :   curp.value,
                nombre              :   nombre.value,
                primerapellido      :   primer_apellido.value,
                segundoapellido     :   segundo_apellido.value,
                fechanacimiento     :   fechaNacimiento.value,
                edad                :   edad.value,
                sexo                :   sexo.value,
                idnacionalidad      :   selNacionalidad.value,
                estadonacimiento    :   $("#estadonacimiento option:selected" ).data('id'),
                ciudadnacimiento    :   $("#ciudadnacimiento option:selected" ).text(),
                idtiposangre        :   tipoSangre.value,
                iddomicilio         :   id_domicilio,
                codigopostal        :   codigoPostal.value,
                estado              :   $(estado).data('id'),
                municipio           :   $(municipio).data('id'),
                idcolonia           :   selColonia.value,
                calle               :   calle.value,
                numext              :   noExterior.value,
                numint              :   noInterior.value,
                entrecalle1         :   entreCalle1.value,
                entrecalle2         :   entreCalle2.value,
                idcontacto          :   id_contacto,
                correo              :   correoElectronico.value,
                telefono            :   numTelefono.value,
                [csrf.name]         :   csrf.value
            },
            beforeSend:function(){
                $("#modal_confirmar_guardar").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status != true){
                    peticion_fallida(data.message);
                }else{
                    registro_exitoso(data.message);
                    cambio = 0;
                }
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $("#modal_confirmar_guardar").modal("hide");
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        })
    }
}

const pers = new Personal()

function setResult(result) {
    scanner.stop();
    datosEscaneados = result.split("|");

    curp.value = datosEscaneados[0]
    nombre.value = datosEscaneados[4]
    primer_apellido.value = datosEscaneados[2]
    segundo_apellido.value = datosEscaneados[3]
    Personal.prototype.validar_curp();
    $("#modalEscanerCURP").modal("hide");
}

$("#btnCancelarEscaneo").click(function(){
    scanner.stop();
});

$(estadonacimiento).change(function(){
    pers.obtener_municipios();
});