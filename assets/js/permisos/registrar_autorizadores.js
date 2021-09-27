var DTPersonal, DTEquipo, DTVehiculo, DTMaterial;
var errorEstructuraCURP = false;
var errorEstructuraCorreo = false;
var errorEstructuraNSS = false;
var errorEstructuraINEIFE = false;
var errorEstructuraPasaporte = false;
var fotoFacturaEquipo = null
var fotoFacturaVehiculo = null
var fotoLateralVehiculo = null
var fotoPlacaVehiculo = null
var fotoLicencia = null
var fotoIdentificacion = null
var fotoPersona = null
var date = new Date();
var actual = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
var nacionalidadMod = 0
var personalAlmacenado = []
var id_permiso = 0;
var id_empresa = 0;
var id_persona_fisica = 0;
var id_contrato = 0;
var datosPersonal = []
var datosEquipos = []
var datosVehiculos = []
var datosMaterial = []
var cambios = 0
var choferes = 0
var estatus_pase = 0
var id_personal_rest = 0

var edicion_personal = 0
var edicion_equipo = 0
var eidicion_material = 0
var edicion_vehiculo = 0

let QrScanner
import('../../librerias/QRScanner/qr-scanner.min.js').then((module) => {
    QrScanner = module.default;
    QrScanner.WORKER_PATH = '../../assets/librerias/QRScanner/qr-scanner-worker.min.js';
});

var scanner;
var datosEscaneados = '';
const video = document.getElementById('qr-video');
const camQrResult = document.getElementById('cam-qr-result');

class Permisos {
    constructor() {
        this.inicio();
        this.obtener_datos_contrato()
        this.obtener_tipos_permisos()
        this.obtener_actividades_realizar()
        this.obtener_vigencias()
        this.obtener_recintos()
        this.obtener_tipos_empleados()
        this.obtener_nacionalidades()
        this.obtener_estados()
        this.obtener_aseguradoras()

        this.obtener_tipos_equipos()
        this.obtener_tipos_documentos()
        this.obtener_tipos_materiales()
        this.obtener_tipos_medidas()
        this.obtener_tipos_vehiculos()
        this.obtener_tipos_tarjetas_circulacion()
        this.obtener_periodos()
    }
    inicio() {
        id_empresa = idempresavigenteusuario
        id_contrato = idcontratovigenteusuario
        btnGuardar.disabled = true;
        DTPersonal = $(tabPersonal).DataTable({
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            }
        });

        DTEquipo = $(tabEquipoHerramienta).DataTable({
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            }
        });

        DTVehiculo = $(tabVehiculos).DataTable({
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            }
        });

        DTMaterial = $(tabMaterial).DataTable({
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            }
        });

        clientetEntidad.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_especial(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        clientetEntidad.addEventListener("change", (ev) => {
            let elementError = document.getElementById("error" + ev.target.id)
            elementError.innerHTML = ''

            this.validaciones = new VALIDACIONES();
            if (ev.target.value == "") {
                elementError.innerHTML = 'Campo Obligatorio'
            } else {
                let resultado = this.validaciones.caracteres_validos_especial(ev.target.value, 2);
                if (!resultado.resp) {
                    elementError.innerHTML = 'Información no valida'
                }
            }
        })

        motivo.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        motivo.addEventListener("change", (ev) => {
            let elementError = document.getElementById("error" + ev.target.id)
            elementError.innerHTML = ''

            this.validaciones = new VALIDACIONES();
            if (ev.target.value == "") {
                elementError.innerHTML = 'Campo Obligatorio'
            } else {
                let resultado = this.validaciones.caracteres_validos_especial(ev.target.value, 2);
                if (!resultado.resp) {
                    elementError.innerHTML = 'Información no valida'
                }
            }
        })

        empresa.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })
        empresa.addEventListener("change", (ev) => {
            let elementError = document.getElementById("error" + ev.target.id)
            elementError.innerHTML = ''

            this.validaciones = new VALIDACIONES();
            if (ev.target.value == "") {
                elementError.innerHTML = 'Campo Obligatorio'
            } else {
                let resultado = this.validaciones.caracteres_validos(ev.target.value, 2);
                if (!resultado.resp) {
                    elementError.innerHTML = 'Información no valida'
                }
            }
        })

        curp.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_especial(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        clavePatronal.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_especial(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        nombre.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        nombre.addEventListener("change", (ev) => {
            let elementError = document.getElementById("error" + ev.target.id)
            elementError.innerHTML = ''

            this.validaciones = new VALIDACIONES();
            if (ev.target.value == "") {
                elementError.innerHTML = 'Campo Obligatorio'
            } else {
                let resultado = this.validaciones.caracteres_validos(ev.target.value, 2);
                if (!resultado.resp) {
                    elementError.innerHTML = 'Información no valida'
                }
            }
        })

        primerApellido.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        primerApellido.addEventListener("change", (ev) => {
            let elementError = document.getElementById("error" + ev.target.id)
            elementError.innerHTML = ''

            this.validaciones = new VALIDACIONES();
            if (ev.target.value == "") {
                elementError.innerHTML = 'Campo Obligatorio'
            } else {
                let resultado = this.validaciones.caracteres_validos(ev.target.value, 2);
                if (!resultado.resp) {
                    elementError.innerHTML = 'Información no valida'
                }
            }
        })

        segundoApellido.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        segundoApellido.addEventListener("change", (ev) => {
            let elementError = document.getElementById("error" + ev.target.id)
            elementError.innerHTML = ''

            this.validaciones = new VALIDACIONES();
            let resultado = this.validaciones.caracteres_validos(ev.target.value, 1);
            if (!resultado.resp) {
                elementError.innerHTML = 'Información no valida'
            }
        })

        numtelefono.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16 && ev.keyCode != 8 && ev.keyCode != 9) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_numericos(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        numtelefono.addEventListener("change", (ev) => {
            $(errornumtelefono).html("")
            if (ev.target.value.length < 10) {
                $(errornumtelefono).html("El formato no es correcto")
            }
        })

        numSeguroSocial.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16 && ev.keyCode != 8 && ev.keyCode != 9) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_numericos(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        noIssste.addEventListener("keyup", (ev) => {
            ev.target.value = ev.target.value.toUpperCase()
            $(errornoIssste).html("")
        });

        noIssste.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16 && ev.keyCode != 8 && ev.keyCode != 9) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_sin_acentos_con_numero(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        noIssste.addEventListener('change', this.ISSSTE)

        /*correo.addEventListener("keydown",(ev) => {
            if(ev.keyCode != 16){
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos(ev.key,1);
                if(!resultado.resp){
                    ev.preventDefault();
                }
            }
        })*/

        noLicencia.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16 && ev.keyCode != 8 && ev.keyCode != 9) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_sin_acentos_con_numero(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        noLicencia.addEventListener("change", (ev) => {
            let elementError = document.getElementById("error" + ev.target.id)
            elementError.innerHTML = ''

            this.validaciones = new VALIDACIONES();
            if (ev.target.value.length < 8) {
                elementError.innerHTML = 'El formato no es correcto'
            } else {
                let resultado = this.validaciones.caracteres_validos_sin_acentos_con_numero(ev.target.value, 1);
                if (!resultado.resp) {
                    elementError.innerHTML = 'Información no valida'
                }
            }
        })

        libretaMar.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_sin_acentos_con_numero(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        libretaMar.addEventListener("change", (ev) => {
            let elementError = document.getElementById("error" + ev.target.id)
            elementError.innerHTML = ''

            this.validaciones = new VALIDACIONES();
            if (ev.target.value.length < 10) {
                elementError.innerHTML = 'El formato no es correcto'
            } else {
                let resultado = this.validaciones.caracteres_validos_sin_acentos_con_numero(ev.target.value, 1);
                if (!resultado.resp) {
                    elementError.innerHTML = 'Información no valida'
                }
            }
        })

        noSerieEquipo.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16 && ev.keyCode != 8 && ev.keyCode != 9) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_sin_acentos_con_numero(ev.key, 0);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        noSerieEquipo.addEventListener("change", (ev) => {
            let elementError = document.getElementById("error" + ev.target.id)
            elementError.innerHTML = ''

            this.validaciones = new VALIDACIONES();
            let resultado = this.validaciones.caracteres_validos_sin_acentos_con_numero(ev.target.value, 1);
            if (!resultado.resp) {
                elementError.innerHTML = 'Información no valida'
            }
        })

        modeloHerramienta.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16 && ev.keyCode != 8 && ev.keyCode != 9) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_sin_acentos_con_numero(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        modeloHerramienta.addEventListener("change", (ev) => {
            let elementError = document.getElementById("error" + ev.target.id)
            elementError.innerHTML = ''

            this.validaciones = new VALIDACIONES();
            let resultado = this.validaciones.caracteres_validos_sin_acentos_con_numero(ev.target.value, 1);
            if (!resultado.resp) {
                elementError.innerHTML = 'Información no valida'
            }
        })

        marcaHerramienta.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16 && ev.keyCode != 8 && ev.keyCode != 9) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_sin_acentos_con_numero(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        marcaHerramienta.addEventListener("change", (ev) => {
            let elementError = document.getElementById("error" + ev.target.id)
            elementError.innerHTML = ''

            this.validaciones = new VALIDACIONES();
            let resultado = this.validaciones.caracteres_validos_sin_acentos_con_numero(ev.target.value, 1);
            if (!resultado.resp) {
                elementError.innerHTML = 'Información no valida'
            }
        })

        noFacturaEquipo.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16 && ev.keyCode != 8 && ev.keyCode != 9) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_sin_acentos_con_numero(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        noFacturaEquipo.addEventListener("change", (ev) => {
            let elementError = document.getElementById("error" + ev.target.id)
            elementError.innerHTML = ''

            this.validaciones = new VALIDACIONES();
            let resultado = this.validaciones.caracteres_validos_sin_acentos_con_numero(ev.target.value, 1);
            if (!resultado.resp) {
                elementError.innerHTML = 'Información no valida'
            }
        })

        noPlaca.addEventListener("keydown", (ev) => {
            if(tipoVehiculo.value != 2 && tipoVehiculo.value != 7){
                //noSerieVehiculo.value = ''
                //noMotor.value = ''
            }
            if (ev.keyCode != 16) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_especial(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        noSerieVehiculo.addEventListener("keydown", (ev) => {
            if(tipoVehiculo.value != 2 && tipoVehiculo.value != 7){
                //noPlaca.value = ''
                //noMotor.value = ''
            }
            if (ev.keyCode != 16) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_especial(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        noMotor.addEventListener("keydown", (ev) => {
            if(tipoVehiculo.value != 2 && tipoVehiculo.value != 7){
                //noPlaca.value = ''
                //noSerieVehiculo.value = ''
            }
            if (ev.keyCode != 16) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_especial(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        noTarjeta.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_especial(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        noFacturaVeh.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_especial(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        noPoliza.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_especial(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        /*estatusVehiculo.addEventListener("keydown",(ev) => {
            if(ev.keyCode != 16){
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_especial(ev.key,1);
                if(!resultado.resp){
                    ev.preventDefault();
                }
            }
        })*/

        dias.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16 && ev.keyCode != 8 && ev.keyCode != 9) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_numericos(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        dias.addEventListener("change", (ev) => {
            let elementError = document.getElementById("error" + ev.target.id)
            elementError.innerHTML = ''

            this.validaciones = new VALIDACIONES();
            let resultado = this.validaciones.caracteres_validos_numericos(ev.target.value, 1);
            if (!resultado.resp) {
                elementError.innerHTML = 'Información no valida'
            }
        })

        cantidad.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16 && ev.keyCode != 8 && ev.keyCode != 9) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_numericos(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        cantidad.addEventListener("change", (ev) => {
            let elementError = document.getElementById("error" + ev.target.id)
            elementError.innerHTML = ''

            this.validaciones = new VALIDACIONES();
            if (ev.target.value == "") {
                elementError.innerHTML = 'Campo Obligatorio'
            } else {
                let resultado = this.validaciones.caracteres_validos_numericos(ev.target.value, 1);
                if (!resultado.resp) {
                    elementError.innerHTML = 'Información no valida'
                }
            }
        })

        descripcion.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_especial(ev.key, 0);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        descripcion.addEventListener("change", (ev) => {
            let elementError = document.getElementById("error" + ev.target.id)
            elementError.innerHTML = ''

            this.validaciones = new VALIDACIONES();
            let resultado = this.validaciones.caracteres_validos_especial(ev.target.value, 1);
            if (!resultado.resp) {
                elementError.innerHTML = 'Información no valida'
            }
        })

        fechaInicio.addEventListener("change", (ev) => {
            let actual_tmp = new Date().toISOString().split("T")[0];
            errorfechaInicio.innerHTML = ""
            if (ev.target.value < actual_tmp) {
                errorfechaInicio.innerHTML = "Fecha fuera de rango"
            }
        })

        vigencia.addEventListener('change', (ev) => {
            if (ev.target.value == 2) {
                divDias.style.display = ""
                dias.setAttribute("class", "form-control validar-requerido reiniciar-pase")
                fechaTermino.setAttribute("class", "lectura validar-requerido reiniciar-pase")
                fechaTermino.setAttribute("disabled", true)
                //fechaTermino.removeAttribute("disabled")
            } else {
                divDias.style.display = "none"
                dias.setAttribute("class", "form-control reiniciar-pase")
                fechaTermino.setAttribute("class", "lectura validar-requerido reiniciar-pase")
                fechaTermino.setAttribute("disabled", true)
                fechaTermino.value = fechaInicio.value
            }
        })

        dias.addEventListener("change", () => {
            if (vigencia.value == 2 && fechaInicio.value != "") {
                let termino_tmp = new Date(fechaInicio.value + " 00:00:00")
                termino_tmp.setDate(termino_tmp.getDate() + (parseInt(dias.value) > 0 ? parseInt(dias.value) - 1 : 0));
                fechaTermino.value = new Date(termino_tmp.getTime() - (termino_tmp.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
                $(errorfechaTermino).html("")
                Permisos.prototype.validar_vigencias()
                tipoEmpleado.removeAttribute("disabled")
            }
        })

        fechaInicio.addEventListener('change', (ev) => {
            if (ev.target.value == "") {
                fechaTermino.value = ""
                fechaTermino.setAttribute("min", actual)
            } else {
                fechaTermino.setAttribute("min", ev.target.value)

                if (vigencia.value == 2) {
                    let termino_tmp = new Date(ev.target.value + " 00:00:00")
                    termino_tmp.setDate(termino_tmp.getDate() + (parseInt(dias.value) > 0 ? parseInt(dias.value) - 1 : 0));
                    fechaTermino.value = new Date(termino_tmp.getTime() - (termino_tmp.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
                    Permisos.prototype.validar_vigencias()
                    tipoEmpleado.removeAttribute("disabled")

                }
            }

            if (vigencia.value == 1) {
                fechaTermino.value = ev.target.value
                tipoEmpleado.removeAttribute("disabled")
            }
        })

        recinto.addEventListener('change', (ev) => {
            if (ev.target.value == 6 || ev.target.value == 7) {
                divRecinto.style.display = ''
                nombreRecinto.setAttribute("class", "form-control validar-requerido reiniciar-pase")

                $.ajax({
                    url: base_url + 'Catalogos/Ctrl_Recintos_Fiscalizados/getFilteridRecinto',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        estatus: 1,
                        recinto: ev.target.value
                    },
                    beforeSend: function () {
                        $(nombreRecinto).html('');
                        $(nombreRecinto).append('<option value="">Seleccione</option>');
                    },
                    success: function (response) {
                        response.data.forEach(element => {
                            $(nombreRecinto).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                        });
                    }
                }).fail(function (response) {

                });

            } else {
                divRecinto.style.display = 'none'
                nombreRecinto.setAttribute("class", "form-control reiniciar-pase")
            }
        })

        permisoGrupal.addEventListener('change', (ev) => {

            if (ev.target.checked) {
                divCURPResp.style.display = ""
                curpResponsable.setAttribute("class", "form-control validar-requerido reiniciar-pase")
                $(errorcurpResponsable).html("")
                tipoEmpleado.removeAttribute("disabled")
            } else {
                if (datosPersonal.length <= 1) {
                    curpResponsable.value = ""
                    errorcurpResponsable.innerHTML = ""
                    divCURPResp.style.display = "none"
                    curpResponsable.setAttribute("class", "form-control reiniciar-pase")
                    $(errorcurpResponsable).html("")
                    tipoEmpleado.setAttribute("disabled", true)
                } else {
                    $(errorcurpResponsable).html("Debe haber sólo un registro en la tabla")
                    permisoGrupal.checked = true
                }
            }
        })

        curpResponsable.addEventListener("keyup", (ev) => {
            ev.target.value = ev.target.value.toUpperCase()
        });
        curpResponsable.addEventListener("change", this.validar_curp)

        let elementos = document.getElementsByClassName("escanear-camara");
        for (var i = 0; i < elementos.length; i++) {
            elementos[i].addEventListener("click", () => {
                $(modalEscanerCURP).modal();
                QrScanner.hasCamera().then(hasCamera => {
                    if (hasCamera) {
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
            elementos[i].addEventListener("click", () => {
                $(modalEscanerCURP).modal();
                $(escaneoQR).val("");
                $(escaneoQR).focus()
            })
        }

        let timeout
        escaneoQR.addEventListener("keydown", (ev) => {
            spinner.style.visibility = 'visible'
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                let datosCURP = ev.target.value
                datosCURP = datosCURP.split("]")
                curp.value = datosCURP[0]
                nombre.value = datosCURP[4]
                primerApellido.value = datosCURP[2]
                segundoApellido.value = datosCURP[3]

                $(modalEscanerCURP).modal('hide');
                spinner.style.visibility = 'hidden'
                clearTimeout(timeout)
            }, 1000)
        })
        noSerieEquipo.addEventListener('change', (ev) => {
            $(errorHerramientaDuplicado).html("")
        })
        noPlaca.addEventListener('change', (ev) => {
            $(errorVehiculoDuplicado).html("")
        })
        anexo29.addEventListener('change', (ev) => {
            $(erroranexo29).html("")
        })
        descripcionEquipo.addEventListener('change', (ev) => {
            $(errordescripcionEquipo).html("")
        })

        nacionalidad.addEventListener("change", this.validar_tipoPersona_nacionalidad)
        tipoEmpleado.addEventListener("change", this.validar_tipoPersona_nacionalidad)
        tipoSeguro.addEventListener("change", this.validar_seguro)

        clavePatronal.addEventListener("change", this.validar_clave_patronal)
        curp.addEventListener("keyup", (ev) => {
            ev.target.value = ev.target.value.toUpperCase()
            $(errorPersonalDuplicado).html("")
        });
        curp.addEventListener("change", this.validar_curp)

        claveElector.addEventListener("keyup", (ev) => {
            ev.target.value = ev.target.value.toUpperCase()
            $(errorclaveElectoral).html("")
        });

        claveElector.addEventListener("change", this.INE_IFE)

        noPasaporte.addEventListener("keyup", (ev) => {
            ev.target.value = ev.target.value.toUpperCase()
            $(errornumPasaporte).html("")
        });

        noPasaporte.addEventListener("change", this.validar_pasaporte)

        chofer.addEventListener('change', (ev) => {
            if (ev.target.checked) {
                divLicencia.style.display = ""
            } else {
                divLicencia.style.display = "none"
            }
        })

        correo.addEventListener('change', this.validar_correo)

        tipoIdentificacion.addEventListener('change', (ev) => {
            if (ev.target.value != "") {
                divFechaVencimiento.style.display = ""
                divSubirfoto.style.display = ""
                divSubirDocumento.style.display = ""
                switch (ev.target.value) {
                    case "7":
                        divClaveElector.style.display = ""
                        divPasaporte.style.display = "none"
                        divLibretaMar.style.display = "none"
                        divItinerario.style.display = "none"
                        break;
                    case "8":
                        divClaveElector.style.display = ""
                        divPasaporte.style.display = "none"
                        divLibretaMar.style.display = "none"
                        divItinerario.style.display = "none"
                        break;
                    case "2":
                        divClaveElector.style.display = "none"
                        divPasaporte.style.display = ""
                        divLibretaMar.style.display = "none"
                        divItinerario.style.display = "none"
                        break;
                    case "3":
                        divClaveElector.style.display = "none"
                        divPasaporte.style.display = "none"
                        divLibretaMar.style.display = ""
                        divItinerario.style.display = "none"
                        break;
                    case "4":
                        divClaveElector.style.display = "none"
                        divPasaporte.style.display = ""
                        divLibretaMar.style.display = "none"
                        divItinerario.style.display = "none"
                        break;
                    case "5":
                        divClaveElector.style.display = "none"
                        divPasaporte.style.display = "none"
                        divLibretaMar.style.display = "none"
                        divItinerario.style.display = ""
                        break;
                }
            } else {
                divFechaVencimiento.style.display = "none"
                divSubirfoto.style.display = "none"
                divSubirDocumento.style.display = "none"

                divClaveElector.style.display = "none"
                divPasaporte.style.display = "none"
                divLibretaMar.style.display = "none"
                divItinerario.style.display = "none"
            }
        })

        btnAdjuntarLicencia.addEventListener("click", (ev) => {
            if (adjuntarLicencia.dataset.imagen) {
                $(pdfViewerLicencia).html('<img width="460" height="200" src="' + base_url + '/' + adjuntarLicencia.dataset.imagen + '"/>');
            } else {
                pdfViewerLicencia.innerHTML = ''
                erroradjuntarLicencia.innerHTML = ''
            }
            $(modalLicencia).modal()
        })
        adjuntarLicencia.addEventListener("change", this.previsualizar_licencia)

        btnSubirIdentificacion.addEventListener("click", (ev) => {
            if (adjuntarIdentificacion.dataset.imagen) {
                $(pdfViewerIdentificacion).html('<img width="460" height="200" src="' + base_url + '/' + adjuntarIdentificacion.dataset.imagen + '"/>');
            } else {
                pdfViewerIdentificacion.innerHTML = ''
                erroradjuntarIdentificacion.innerHTML = ''
            }
            $(modalIdentificacion).modal()
        })
        adjuntarIdentificacion.addEventListener("change", this.previsualizar_identificacion)

        btnSubirPersonal.addEventListener("click", (ev) => {
            if (adjuntarPersonal.dataset.imagen) {
                $(pdfViewerPersonal).html('<img width="460" height="200" src="' + base_url + '/' + adjuntarPersonal.dataset.imagen + '"/>');
            } else {
                pdfViewerPersonal.innerHTML = ''
                erroradjuntarPersonal.innerHTML = ''
            }
            $(modalPersonal).modal()
        })

        adjuntarEquipo.addEventListener("change", this.previsualizar_equipo)

        tipoMaterial.addEventListener("change", (ev) => {
            divMedidas.style.display = "none"
            if (ev.target.value == 1 || tipoMaterial.value == 3) {
                divMedidas.style.display = ""
            }
        })

        anadirMaterial.addEventListener("click", this.agregar_material)

        btnSubirEquipo.addEventListener('click', (ev) => {
            if (adjuntarEquipo.dataset.imagen) {
                $(pdfViewerEquipo).html('<img width="460" height="200" src="' + base_url + '/' + adjuntarEquipo.dataset.imagen + '"/>');
            } else {
                pdfViewerEquipo.innerHTML = ''
                erroradjuntarEquipo.innerHTML = ''
            }
            $(modalEquipo).modal()
        })

        adjuntarVehiculoFactura.addEventListener("change", this.previsualizar_vehiculo_factura)

        btnSubirFacturaVehiculo.addEventListener('click', (ev) => {
            if (adjuntarVehiculoFactura.dataset.imagen) {
                $(pdfViewerVehiculoFactura).html('<img width="460" height="200" src="' + base_url + '/' + adjuntarVehiculoFactura.dataset.imagen + '"/>');
            } else {
                pdfViewerVehiculoFactura.innerHTML = ''
                erroradjuntarVehiculoFactura.innerHTML = ''
            }
            $(modalVehiculoFactura).modal()
        })

        btnSubirVehiculo.addEventListener('click', (ev) => {

            if (ajuntarLateralVehiculo.dataset.imagen) {
                $(pdfViewerVehiculo).html('<img width="460" height="200" src="' + base_url + '/' + ajuntarLateralVehiculo.dataset.imagen + '"/>');
                $(btnSiguienteAdjuntarVehiculo).show();
                $(fotografiaLateral).removeAttr("style");
                $(fotografiaPlaca).hide();

            } else {
                pdfViewerVehiculo.innerHTML = ''
            }
            $(modalVehiculo).modal()
        })
        btnSiguienteAdjuntarVehiculo.addEventListener('click', (ev) => {

            $(pdfViewerVehiculo).html("");
            $(fotografiaLateral).hide();
            $(fotografiaPlaca).removeAttr("style");
            $(btnSiguienteAdjuntarVehiculo).hide();

            if (adjuntarPlacaVehiculo.dataset.imagen) {

                $(pdfViewerVehiculo).html('<img width="460" height="200" src="' + base_url + '/' + adjuntarPlacaVehiculo.dataset.imagen + '"/>');
                $(btnAceptarAdjuntarVechiculo).show();

            } else {
                pdfViewerVehiculo.innerHTML = ''
            }

        })


        adjuntarPersonal.addEventListener("change", this.previsualizar_personal)

        anadirPersona.addEventListener("click", (ev) => {
            if (fotoIdentificacion && fotoIdentificacion && fotoPersona) {
                Permisos.prototype.agregar_personas(fotoLicencia, fotoIdentificacion, fotoPersona)
            } else {
                Permisos.prototype.agregar_personas()
            }
        })
        anadirEquipo.addEventListener("click", (ev) => {
            if (fotoFacturaEquipo) {
                Permisos.prototype.agregar_equipo(fotoFacturaEquipo)
            } else {
                Permisos.prototype.agregar_equipo()
            }
        })
        anadirVehiculo.addEventListener("click", (ev) => {
            if (fotoFacturaVehiculo && fotoLateralVehiculo && fotoPlacaVehiculo) {
                Permisos.prototype.agregar_vehiculo(fotoFacturaVehiculo, fotoLateralVehiculo, fotoPlacaVehiculo)
            } else {
                Permisos.prototype.agregar_vehiculo()
            }
        })

        tipoEquipo.addEventListener('change', (ev) => {
            if (ev.target.value != "") {
                divCaracteristicas.style.display = ""

                divDocumento1.style.display = ""
                divResguardo.style.display = ""
                if(ev.target.value == 5){
                    divOtros.style.display = ""
                }else{
                    divOtros.style.display = "none"
                }
            } else {
                divCaracteristicas.style.display = "none"
                divDocumento1.style.display = "none"
                divResguardo.style.display = "none"
                divOtros.style.display = "none"
            }
        })

        noPlaca.addEventListener("change", this.peticion_repuve)
        //noSerieVehiculo.addEventListener("change",this.peticion_repuve)

        ajuntarLateralVehiculo.addEventListener("change", this.previsualizar_vehiculo)
        adjuntarPlacaVehiculo.addEventListener("change", this.previsualizar_vehiculo)

        confirmar_salir_sin_guardar.addEventListener('click', (ev) => {
            window.location.href = base_url + 'Permisos/Ctrl_Permisos/index_autorizadores';
        });
        btnGuardar.addEventListener('click', this.confirmar_almacenamiento)
        confirmar_guardar.addEventListener('click', this.realizar_almacenamiento_pases)

        btnAceptarAdjuntarLicencia.addEventListener('click', (ev) => {
            if (adjuntarLicencia.value != "") {
                document.getElementById('btnAdjuntarLicencia').value = 'Actualizar documento'
            }
        })
        btnAceptarAdjuntarIdentificacion.addEventListener('click', (ev) => {
            if (adjuntarIdentificacion.value != "") {
                document.getElementById('btnSubirIdentificacion').value = 'Actualizar identificación'
            }
        })
        btnAceptarAdjuntarPersonal.addEventListener('click', (ev) => {
            if (adjuntarPersonal.value != "") {
                document.getElementById('btnSubirPersonal').value = 'Actualizar foto'
            }
        })
        btnAceptarAdjuntarEquipo.addEventListener('click', (ev) => {
            if (adjuntarEquipo.value != "") {
                document.getElementById('btnSubirEquipo').value = 'Actualizar documento'
            }
        })
        btnAceptarAdjuntarVehiculoFactura.addEventListener('click', (ev) => {
            if (adjuntarVehiculoFactura.value != "") {
                document.getElementById('btnSubirFacturaVehiculo').value = 'Actualizar documento'
            }

        })
        btnAceptarAdjuntarVechiculo.addEventListener('click', (ev) => {
            if (ajuntarLateralVehiculo.value != "" && adjuntarPlacaVehiculo.value != "") {
                document.getElementById('btnSubirVehiculo').value = 'Actualizar archivo'
            }

        })
        noSerieEquipo.addEventListener('change', this.validar_noserie_equipo)

        tipoEmpleado.setAttribute("disabled", true)

        fechaVenciminetoLic.addEventListener('change', (ev) => {
            $(errorfechaVenciminetoLic).html("")
            if ((fechaVenciminetoLic.value < fechaInicio.value || fechaVenciminetoLic.value < fechaTermino.value) && fechaVenciminetoLic.value != "") {
                $(errorfechaVenciminetoLic).html("Debe estar vigente durante el periodo")
                btnAdjuntarLicencia.value = "Subir licencia"
                fechaVenciminetoLic.value = ""
            }
        })
        fechaVenciminetoIdent.addEventListener('change', (ev) => {
            $(errorfechaVenciminetoIdent).html("")
            if ((fechaVenciminetoIdent.value < fechaInicio.value || fechaVenciminetoIdent.value < fechaTermino.value) && fechaVenciminetoIdent.value != "") {
                $(errorfechaVenciminetoIdent).html("Debe estar vigente durante el periodo")
                btnSubirIdentificacion.value = "Subir Identificación"
                fechaVenciminetoIdent.value = ""
            }
        })
        /*vigenciaTarjeta.addEventListener('change', (ev) => {
            if ((vigenciaTarjeta.value < fechaInicio.value || vigenciaTarjeta.value < fechaTermino.value) && vigenciaTarjeta.value != "") {
                $(errorvigenciaTarjeta).html("Debe estar vigente durante el periodo")
                vigenciaTarjeta.value = ""
            }
        })*/
        vigenciaPoliza.addEventListener('change', (ev) => {
            $(errorvigenciaPoliza).html("")
            if ((vigenciaPoliza.value < fechaInicio.value || vigenciaPoliza.value < fechaTermino.value) && vigenciaPoliza.value != "") {
                $(errorvigenciaPoliza).html("Debe estar vigente durante el periodo")
                vigenciaPoliza.value = ""
            }
        })
        //noSerieVehiculo.addEventListener('change',this.validar_numero_caracteres)

        noSerieVehiculo.addEventListener('change', (ev) => {
            if (noSerieVehiculo.value.length != 17) {
                $(errornoSerieVehiculo).html("Deben ser 17 caracteres")
            } else {
                $(errornoSerieVehiculo).html("")
                Permisos.prototype.peticion_repuve();
            }
        })

        noMotor.addEventListener('change', (ev) => {
            if (noMotor.value.length < 6 || noMotor.value.length > 8) {
                $(errornoMotor).html("Deben ser entre 6 y 8 caracteres")
            } else {
                $(errornoMotor).html("")
            }
            if ((noMotor.value.length < 5 || noMotor.value.length > 6) && tipoVehiculo.value == 8) {
                $(errornoMotor).html("Deben ser entre 6 y 8 caracteres")
            } else {
                $(errornoMotor).html("")
            }
        })

        tipoVehiculo.addEventListener('change', (ev) => {
            if(ev.target.value != 2 && ev.target.value != 7){
                marcaVehiculo.classList.remove("lectura")
                marcaVehiculo.classList.add("form-control")
                marcaVehiculo.disabled = false
                modeloVehicuo.classList.remove("lectura")
                modeloVehicuo.classList.add("form-control")
                modeloVehicuo.disabled = false
                anio.classList.remove("lectura")
                anio.classList.add("form-control")
                anio.disabled = false
                color.classList.remove("lectura")
                color.classList.add("form-control")
                color.disabled = false
            }else{
                marcaVehiculo.classList.add("lectura")
                marcaVehiculo.classList.remove("form-control")
                marcaVehiculo.disabled = true
                modeloVehicuo.classList.add("lectura")
                modeloVehicuo.classList.remove("form-control")
                modeloVehicuo.disabled = true
                anio.classList.add("lectura")
                anio.classList.remove("form-control")
                anio.disabled = true
                color.classList.add("lectura")
                color.classList.remove("form-control")
                color.disabled = true
            }
        })

    }
    validar_vigencias() {
        $(errorfechaVenciminetoLic).html("")
        $(errorfechaVenciminetoIdent).html("")
        if ((fechaVenciminetoLic.value < fechaInicio.value || fechaVenciminetoLic.value < fechaTermino.value) && fechaVenciminetoLic.value != "") {
            $(errorfechaVenciminetoLic).html("Debe estar vigente durante el periodo")
            btnAdjuntarLicencia.value = "Subir licencia"
            fechaVenciminetoLic.value = ""
        }
        if ((fechaVenciminetoIdent.value < fechaInicio.value || fechaVenciminetoIdent.value < fechaTermino.value) && fechaVenciminetoIdent.value != "") {
            $(errorfechaVenciminetoIdent).html("Debe estar vigente durante el periodo")
            btnSubirIdentificacion.value = "Subir Identificación"
            fechaVenciminetoIdent.value = ""
        }
        /*if ((vigenciaTarjeta.value < fechaInicio.value || vigenciaTarjeta.value < fechaTermino.value) && vigenciaTarjeta.value != "") {
            $(errorvigenciaTarjeta).html("Debe estar vigente durante el periodo")
            vigenciaTarjeta.value = ""
        }*/
        $(errorvigenciaPoliza).html("")
        if ((vigenciaPoliza.value < fechaInicio.value || vigenciaPoliza.value < fechaTermino.value) && vigenciaPoliza.value != "") {
            $(errorvigenciaPoliza).html("Debe estar vigente durante el periodo")
            vigenciaPoliza.value = ""
        }
    }
    validar_seguro() {
        switch (tipoSeguro.value) {
            case "1":
                divAseguradora.style.display = 'none'
                divNoSeguroSocial.style.display = ''
                divNoIssste.style.display = 'none'
                divNoSeguro.style.display = 'none'
                numSeguroSocial.value = ''
                errornumSeguroSocial.innerHTML = ''
                noIssste.value = ''
                errornoIssste.innerHTML = ''
                noSeguro.value = ''
                errornoSeguro.innerHTML = ''
                aseguradoras.vaalue = ''
                break;
            case "2":
                divAseguradora.style.display = 'none'
                divNoSeguroSocial.style.display = 'none'
                divNoIssste.style.display = ''
                divNoSeguro.style.display = 'none'
                numSeguroSocial.value = ''
                errornumSeguroSocial.innerHTML = ''
                noIssste.value = ''
                errornoIssste.innerHTML = ''
                noSeguro.value = ''
                errornoSeguro.innerHTML = ''
                aseguradoras.vaalue = ''
                aseguradoras.vaalue = ''
                break;
            case "3":
                divAseguradora.style.display = ''
                divNoSeguroSocial.style.display = 'none'
                divNoIssste.style.display = 'none'
                divNoSeguro.style.display = ''
                numSeguroSocial.value = ''
                errornumSeguroSocial.innerHTML = ''
                noIssste.value = ''
                errornoIssste.innerHTML = ''
                noSeguro.value = ''
                errornoSeguro.innerHTML = ''
                aseguradoras.vaalue = ''
                break;
            default:
                divAseguradora.style.display = 'none'
                divNoSeguroSocial.style.display = 'none'
                divNoIssste.style.display = 'none'
                divNoSeguro.style.display = 'none'
                numSeguroSocial.value = ''
                errornumSeguroSocial.innerHTML = ''
                noIssste.value = ''
                errornoIssste.innerHTML = ''
                noSeguro.value = ''
                errornoSeguro.innerHTML = ''
                aseguradoras.vaalue = ''
                break;
        }
    }
    validar_tipoPersona_nacionalidad(nacionalidadMod) {

        divNacionalidad.style.display = ""

        if (nacionalidad.value == 1) {
            divCURP.style.display = ""
            $(tipoIdentificacion).data("nacional", 1)
        } else {
            divCURP.style.display = "none"
            $(tipoIdentificacion).data("nacional", 0)
        }

        if(nacionalidad.value == 2 && tipoEmpleado.value == 1){
            divCURP.style.display = ''
        }

        if(nacionalidad.value == 2 && tipoEmpleado.value == 4){
            divCURP.style.display = ''
        }

        if(nacionalidad.value == 2 && tipoEmpleado.value == 4){
            divEntidad.style.display = 'none'
        }

        if ((tipoEmpleado.value == 1 || tipoEmpleado.value == 6 || tipoEmpleado.value == 7) || tipoEmpleado.value == '') {
            divEmpresa.style.display = "none"
            divClavePatronal.style.display = "none"
            /*divNoIssste.style.display = 'none'
            if(tipoEmpleado.value == 1){    
                divNoSeguroSocial.style.display = ""
            }else{    
                divNoSeguroSocial.style.display = "none"
            }*/
        } else {
            divEmpresa.style.display = ""
            divClavePatronal.style.display = ""
        }

        if (tipoEmpleado.value == 5) {
            if (nacionalidad.value == 1) {
                divEntidad.style.display = ""
                divClavePatronal.style.display = ""
                /*divNoSeguroSocial.style.display = "none"
                divNoIssste.style.display = ""
                divNoSeguro.style.display = "none"
                divAseguradora.style.display = "none"*/
            } else if (nacionalidad.value == 2) {
                divEntidad.style.display = "none"
                divClavePatronal.style.display = ""
                /*divNoSeguroSocial.style.display = "none"
                divNoIssste.style.display = ""
                divNoSeguro.style.display = "none"
                divAseguradora.style.display = "none"*/
            } else {
                divEntidad.style.display = "none"
                divClavePatronal.style.display = "none"
                /*divNoSeguroSocial.style.display = "none"
                divNoIssste.style.display = "none"
                divNoSeguro.style.display = "none"
                divAseguradora.style.display = "none"*/
            }
        } else {
            divEntidad.style.display = 'none'
        }
        if (tipoEmpleado.value == 1 || tipoEmpleado.value == 6 || tipoEmpleado.value == 7) {
            //divNoSeguroSocial.style.display = ""
            if (nacionalidad.value == 2) {
                /*divAseguradora.style.display = "none"
                divNoSeguro.style.display = "none"
                divNoIssste.style.display = "none"*/
                divEntidad.style.display = 'none'
            }
        }

        if (tipoEmpleado.value != 1 && tipoEmpleado.value != 5 && tipoEmpleado.value != 6 && tipoEmpleado.value != 7 && nacionalidad.value == 2) {
            divClavePatronal.style.display = ""
            //divEntidad.style.display = ''
            /*divNoSeguroSocial.style.display = "none"
            divNoIssste.style.display = "none"
            divNoSeguro.style.display = ""
            divAseguradora.style.display = ""*/
        }

        /*if(tipoEmpleado.value != 1 && tipoEmpleado.value != 5 && nacionalidad.value == 1){
            divNoSeguroSocial.style.display = ""
            divNoIssste.style.display = "none"
            divNoSeguro.style.display = "none"
            divAseguradora.style.display = "none"
        }*/

        if (nacionalidad.value != "") {
            divNombreApellidos.style.display = ""
            divTelefono.style.display = ""
            divCorreo.style.display = ""
            divChofer.style.display = ""
            divTipoIdentificacion.style.display = ""
            divAnadir.style.display = ""
            divTipoSeguro.style.display = ''
        } else {
            divEmpresa.style.display = "none"
            divClavePatronal.style.display = "none"

            divTipoSeguro.style.display = 'none'
            divEntidad.style.display = "none"
            divNoSeguroSocial.style.display = "none"
            divNoIssste.style.display = "none"
            divNoSeguro.style.display = "none"
            divAseguradora.style.display = "none"

            divCURP.style.display = "none"
            divNombreApellidos.style.display = "none"
            divTelefono.style.display = "none"
            divCorreo.style.display = "none"
            divChofer.style.display = "none"
            divTipoIdentificacion.style.display = "none"

            divChofer.style.display = "none"
            divLicencia.style.display = "none"
            chofer.checked = false
        }
    }
    validar_clave_patronal(ev) {
        if (ev.target.value != '') {
            $.ajax({
                url: base_url + 'Usuarios/Ctrl_Empresas/getByClave',
                type: 'GET',
                dataType: 'json',
                global: false,
                data: {
                    clave: ev.target.value
                },
                beforeSend: function () {
                    idempresa.value = 0
                },
                success: function (response) {
                    if (response.data != null) {
                        idempresa.value = response.data.id
                        empresa.value = response.data.nombre
                        errorempresa.innerHTML = ''
                    }
                }
            }).fail(function (response) {
                if (response.responseText == "Sesion") {
                    error_sesion();
                }
            });
        }
    }
    INE_IFE(ev) {
        this.validaciones = new VALIDACIONES();
        let resultado = this.validaciones.INE_IFE(ev.target.value);
        if (!resultado.resp) {
            $(errorclaveElectoral).html("El formato no es correcto")
            errorEstructuraINEIFE = true
            return
        } else {
            $(errorclaveElectoral).html("")
            errorEstructuraINEIFE = false
        }
    }
    ISSSTE(ev) {
        this.validaciones = new VALIDACIONES();
        let resultado = this.validaciones.alfanumericos_11(ev.target.value);
        if (!resultado.resp) {
            errornoIssste.innerHTML = "El formato no es correcto"
            return
        } else {
            $(errornoIssste).html("")
        }
    }
    validar_pasaporte(ev) {
        this.validaciones = new VALIDACIONES();
        let resultado = this.validaciones.pasaporte(ev.target.value);
        if (!resultado.resp) {
            $(errornumPasaporte).html("El formato no es correcto")
            errorEstructuraPasaporte = true
            return
        } else {
            $(errornumPasaporte).html("")
            errorEstructuraPasaporte = false
        }
    }
    validar_curp(ev) {
        let elementError = document.getElementById("error" + ev.target.id)
        elementError.innerHTML = ''

        this.validaciones = new VALIDACIONES();
        let resultado = this.validaciones.curp(ev.target.value);
        if (!resultado.resp) {
            elementError.innerHTML = resultado.message
            errorEstructuraCURP = true
            return
        } else {
            errorEstructuraCURP = false
        }
            

        if (ev.target.id == "curp") {
            $.ajax({
                url: base_url + 'Usuarios/Ctrl_Personal/getByCURP',
                type: 'GET',
                dataType: 'json',
                global: false,
                data: {
                    curp: ev.target.value
                },
                beforeSend: function () {
                    //idpersona.value = 0
                    //idcontacto.value = 0

                    /*nombre.value = ""
                    primerApellido.value = ""
                    segundoApellido.value = ""

                    numtelefono.value = ""
                    correo.value = ""
                    numSeguroSocial.value = ""

                    chofer.checked = false
                    noLicencia.value = ""
                    fechaVenciminetoLic.value = ""
                    $(divLicencia).hide()
                    
                    tipoIdentificacion.value = ""
                    fechaVenciminetoIdent.value = ""

                    divFechaVencimiento.style.display = ""
                    divSubirDocumento.style.display = ""
                    divSubirfoto.style.display = ""

                    divClaveElector.style.display = "none"
                    divPasaporte.style.display = "none"
                    divLibretaMar.style.display = "none"
                    divItinerario.style.display ="none"

                    claveElector.value = ""
                    noPasaporte.value = ""
                    libretaMar.value = ""
                    itinerario.value = ""*/

                    adjuntarLicencia.dataset.imagen = ""
                    adjuntarLicencia.dataset.id = ""
                    adjuntarPersonal.dataset.imagen = ""
                    adjuntarPersonal.dataset.id = ""
                    adjuntarIdentificacion.dataset.imagen = ""
                    adjuntarIdentificacion.dataset.id = ""

                    btnAdjuntarLicencia.value = 'Subir licencia'
                    btnSubirIdentificacion.value = 'Subir identificación'
                    btnSubirPersonal.value = 'Subir foto'
                },
                success: function (response) {
					console.log(response)
                    if (response.data != null) {
                        divFechaVencimiento.style.display = ""
                        divSubirDocumento.style.display = ""
                        divSubirfoto.style.display = ""
						//id_persona_rest.value = 0
                        idpersona.value = response.data.id
                        idcontacto.value = response.data.id_contacto

                        nombre.value = response.data.nombre
                        primerApellido.value = response.data.primer_apellido
                        segundoApellido.value = response.data.segundo_apellido

                        numtelefono.value = response.data.telefono
                        correo.value = response.data.correo

                        if (response.data.id_tipo_seguro == 1) {
                            divTipoSeguro.style.display = ''
                            divNoSeguroSocial.style.display = ''
                            tipoSeguro.value = response.data.id_tipo_seguro
                            numSeguroSocial.value = response.data.nss
                            divNoSeguro.style.display = 'none'
                            divAseguradora.style.display = 'none'
                            divNoIssste.style.display = 'none'
                        }

                        if (response.data.id_tipo_seguro == 2) {
                            divTipoSeguro.style.display = ''
                            divNoIssste.style.display = ''
                            tipoSeguro.value = response.data.id_tipo_seguro
                            noIssste.value = response.data.nss
                            divTipoSeguro.style.display = 'none'
                            divNoSeguro.style.display = 'none'
                            divAseguradora.style.display = 'none'
                            divNoSeguroSocial.style.display = 'none'
                        }

                        if (response.data.id_tipo_seguro == 3) {
                            divTipoSeguro.style.display = ''
                            divNoSeguro.style.display = ''
                            divAseguradora.style.display = ''
                            tipoSeguro.value = response.data.id_tipo_seguro
                            aseguradoras.value = response.data.id_tipo_aseguradora
                            noSeguro.value = response.data.nss
                            divNoIssste.style.display = 'none'
                            divNoSeguroSocial.style.display = 'none'
                        }

                        adjuntarLicencia.dataset.id = (response.data.id_imagen_licencia != null) ? response.data.id_imagen_licencia : ""
                        adjuntarIdentificacion.dataset.id = (response.data.id_imagen_identificacion != null) ? response.data.id_imagen_identificacion : ""
                        adjuntarPersonal.dataset.id = (response.data.id_imagen_persona != null) ? response.data.id_imagen_persona : ""

                        if (response.data.numero_licencia != null && nacionalidad.value == 1) {

                            noLicencia.value = response.data.numero_licencia
                            chofer.checked = true
                            $(divLicencia).show()
                            $(errornoLicencia).html("")

                            if (fechaTermino.value > response.data.fecha_expiracion_licencia) {
                                $(errorfechaVenciminetoLic).html("Debe estar vigente durante el periodo")
                            } else {
                                fechaVenciminetoLic.value = response.data.fecha_expiracion_licencia
                                adjuntarLicencia.dataset.imagen = response.data.fotografia_licencia
                                btnAdjuntarLicencia.value = 'Actualizar licencia'
                                $(errorSubirLicencia).html("")
                                $(errorfechaVenciminetoLic).html("")
                            }

                        } else {
                            chofer.checked = false
                            $(divLicencia).hide()
                        }

                        if (response.data.id_imagen_persona != null) {
                            adjuntarPersonal.dataset.imagen = response.data.fotografia_persona
                            btnSubirPersonal.value = 'Actualizar foto'
                            $(errorSubirPersonal).html("")
                        }

                        tipoIdentificacion.value = response.data.id_tipo_identificacion

                        switch (response.data.id_tipo_identificacion) {
                            case 7:
                                divClaveElector.style.display = ""
                                divPasaporte.style.display = "none"
                                divLibretaMar.style.display = "none"
                                divItinerario.style.display = "none"
                                claveElector.value = response.data.numero_identificacion

                                if (fechaTermino.value > response.data.fecha_expiracion_identificacion) {
                                    $(errorfechaVenciminetoIdent).html("Debe estar vigente durante el periodo")
                                } else {
                                    fechaVenciminetoIdent.value = response.data.fecha_expiracion_identificacion
                                    $(errorfechaVenciminetoIdent).html("")

                                    if (response.data.id_imagen_identificacion != null) {
                                        adjuntarIdentificacion.dataset.imagen = response.data.fotografia_identificacion
                                        divSubirDocumento.style.display = ""
                                        btnSubirIdentificacion.value = 'Actualizar identificación'
                                        $(errorSubirIdentificacion).html("")
                                    }
                                }

                                $(errorclaveElectoral).html("")

                                break;
                            case 8:
                                divClaveElector.style.display = ""
                                divPasaporte.style.display = "none"
                                divLibretaMar.style.display = "none"
                                divItinerario.style.display = "none"
                                claveElector.value = response.data.numero_identificacion

                                if (fechaTermino.value > response.data.fecha_expiracion_identificacion) {
                                    $(errorfechaVenciminetoIdent).html("Debe estar vigente durante el periodo")
                                } else {
                                    fechaVenciminetoIdent.value = response.data.fecha_expiracion_identificacion
                                    $(errorfechaVenciminetoIdent).html("")

                                    if (response.data.id_imagen_identificacion != null) {
                                        adjuntarIdentificacion.dataset.imagen = response.data.fotografia_identificacion
                                        divSubirDocumento.style.display = ""
                                        btnSubirIdentificacion.value = 'Actualizar identificación'
                                        $(errorSubirIdentificacion).html("")
                                    }
                                }

                                $(errorclaveElectoral).html("")

                                break;
                            case 2:

                                divClaveElector.style.display = "none"
                                divPasaporte.style.display = ""
                                divLibretaMar.style.display = "none"
                                divItinerario.style.display = "none"
                                noPasaporte.value = response.data.numero_identificacion

                                if (fechaTermino.value > response.data.fecha_expiracion_identificacion) {
                                    $(errorfechaVenciminetoIdent).html("Debe estar vigente durante el periodo")
                                    //  fechaVenciminetoIdent.value = ""
                                } else {
                                    fechaVenciminetoIdent.value = response.data.fecha_expiracion_identificacion
                                    $(errorfechaVenciminetoIdent).html("")

                                    if (response.data.id_imagen_identificacion != null) {
                                        adjuntarIdentificacion.dataset.imagen = response.data.fotografia_identificacion
                                        divSubirDocumento.style.display = ""
                                        btnSubirIdentificacion.value = 'Actualizar identificación'
                                        $(errorSubirIdentificacion).html("")
                                    }
                                }

                                //$(errornumPasaporte).html("")

                                break;
                            case 3:
                                divClaveElector.style.display = "none"
                                divPasaporte.style.display = "none"
                                divLibretaMar.style.display = ""
                                divItinerario.style.display = "none"
                                libretaMar.value = response.data.numero_identificacion
                                break;
                            case 4:
                                divClaveElector.style.display = "none"
                                divPasaporte.style.display = "none"
                                divLibretaMar.style.display = "none"
                                divItinerario.style.display = "none"
                                break;
                            case 5:
                                divClaveElector.style.display = "none"
                                divPasaporte.style.display = "none"
                                divLibretaMar.style.display = "none"
                                divItinerario.style.display = ""
                                itinerario.value = response.data.numero_identificacion
                                break;
                        }

                        $(errornombre).html("")
                        $(errorprimerApellido).html("")
                        $(errornumtelefono).html("")
                        $(errorcorreo).html("")
                        $(errornumSeguroSocial).html("")
                        $(errortipoIdentificacion).html("")
                    }
                },
                complete: function() {
                    $.ajax({
                        url: base_url_rest+'personas/curp/'+ev.target.value,
                        type: 'GET',
                        dataType: 'json',
                        global: false,
                        beforeSend: function name(params) {
                            id_personal_rest = 0
                        },
                        success: function (response) {
                            if (response.data.length != 0) {
                                id_personal_rest = response.data.id_persona_rest
                                if(nombre.value == ''){
                                    nombre.value = response.data.nombre
                                    primerApellido.value = response.data.primer_apellido
                                    segundoApellido.value = response.data.segundo_apellido
                                }
                            }
                        }
                    }).fail(function (response) {
                        if (response.responseText == "Sesion") {
                            error_sesion();
                        }
                    });
                }
            }).fail(function (response) {
                if (response.responseText == "Sesion") {
                    error_sesion();
                }
            });
        }
    }
    validar_correo(ev) {
        let elementError = document.getElementById("error" + ev.target.id)
        elementError.innerHTML = ''

        this.validaciones = new VALIDACIONES();
        let resultado = this.validaciones.correo(ev.target.value);
        if (!resultado.resp) {
            elementError.innerHTML = "El formato no es correcto"
            errorEstructuraCorreo = true
        } else {
            errorEstructuraCorreo = false
        }
    }
    validar_noserie_equipo(ev) {

        if (ev.target.id == "noSerieEquipo") {
            $.ajax({
                url: base_url + 'Permisos/Ctrl_Permisos/getEquipoBySerie',
                type: 'GET',
                dataType: 'json',
                global: false,
                data: {
                    noserie: ev.target.value
                },
                beforeSend: function () {
                    idequipo.value = 0
                    adjuntarEquipo.dataset.imagen = ""
                    adjuntarEquipo.dataset.id = ""
                },
                success: function (response) {
                    if (response.data != null) {

                        idequipo.value = response.data.id
                        tipoEquipo.value = response.data.id_tipo_equipo
                        modeloHerramienta.value = response.data.modelo
                        marcaHerramienta.value = response.data.marca
                        tipoDocumento.value = response.data.id_tipo_documento
                        noFacturaEquipo.value = response.data.numero_factura
                        adjuntarEquipo.dataset.id = (response.data.id_imagen_factura != null) ? response.data.id_imagen_factura : ""
                        adjuntarEquipo.dataset.imagen = response.data.factura_equipo
                        btnSubirEquipo.value = 'Actualizar documento'

                        $(errortipoEquipo).html("")
                        $(errornoSerieEquipo).html("")
                        $(errormodeloHerramienta).html("")
                        $(errormarcaHerramienta).html("")
                        $(errortipoDocumento).html("")
                        $(errornoFacturaEquipo).html("")
                        $(errorHerramientaDuplicado).html("")
                        $(errorSubirFacturaEquipo).html("")
                        $(errorresguardo).html("")

                    }
                },

            }).fail(function (response) {
                if (response.responseText == "Sesion") {
                    error_sesion();
                }
            });

        }
    }
    previsualizar_licencia() {
        var fileReader = new FileReader();
        pdfViewerLicencia.innerHTML = ''
        erroradjuntarLicencia.innerHTML = ''

        var extencion = $(this)[0].files[0].name;
        if (extencion != '') {
            extencion = extencion.split(".");
            extencion = extencion[extencion.length - 1];
        }

        var permitidos = ["image/jpg", "image/jpeg", "image/png"];
        if (!permitidos.includes($(this)[0].files[0].type) || extencion == 'jfif') {
            erroradjuntarLicencia.innerHTML = "El archivo a subir debe ser un documento en imagen PNG o JPG"
            return false;
        }

        if (($(this)[0].files[0].size / 1000000) > 2) {
            erroradjuntarLicencia.innerHTML = "El tamaño máximo permitido es de 2 MB"
            return false;
        }

        fileReader.onload = function () {
            var TheFileContents = fileReader.result;
            $(pdfViewerLicencia).html('<img width="460" height="200" src="' + TheFileContents + '"/>');
        };
        fileReader.readAsDataURL($(this)[0].files[0]);

        btnAceptarAdjuntarLicencia.onclick = function () {
            if (fileReader != "") {
                $(errorSubirLicencia).html("")
            }
        }
    }
    previsualizar_identificacion() {
        var fileReader = new FileReader();
        pdfViewerIdentificacion.innerHTML = ''
        erroradjuntarIdentificacion.innerHTML = ''

        var extencion = $(this)[0].files[0].name;
        if (extencion != '') {
            extencion = extencion.split(".");
            extencion = extencion[extencion.length - 1];
        }

        var permitidos = ["image/jpg", "image/jpeg", "image/png"];
        if (!permitidos.includes($(this)[0].files[0].type) || extencion == 'jfif') {
            erroradjuntarIdentificacion.innerHTML = "El archivo a subir debe ser un documento en imagen PNG o JPG"
            return false;
        }

        if (($(this)[0].files[0].size / 1000000) > 2) {
            erroradjuntarIdentificacion.innerHTML = "El tamaño máximo permitido es de 2 MB"
            return false;
        }

        fileReader.onload = function () {
            var TheFileContents = fileReader.result;
            $(pdfViewerIdentificacion).html('<img width="460" height="200" src="' + TheFileContents + '"/>');
        };
        fileReader.readAsDataURL($(this)[0].files[0]);

        btnAceptarAdjuntarIdentificacion.onclick = function () {
            if (fileReader != "") {
                $(errorSubirIdentificacion).html("")
            }
        }

    }
    previsualizar_personal() {
        var fileReader = new FileReader();
        pdfViewerPersonal.innerHTML = ''
        erroradjuntarPersonal.innerHTML = ''

        var extencion = $(this)[0].files[0].name;
        if (extencion != '') {
            extencion = extencion.split(".");
            extencion = extencion[extencion.length - 1];
        }

        var permitidos = ["image/jpg", "image/jpeg", "image/png"];
        if (!permitidos.includes($(this)[0].files[0].type) || extencion == 'jfif') {
            erroradjuntarPersonal.innerHTML = "El archivo a subir debe ser un documento en imagen PNG o JPG"
            return false;
        }

        if (($(this)[0].files[0].size / 1000000) > 2) {
            erroradjuntarPersonal.innerHTML = "El tamaño máximo permitido es de 2 MB"
            return false;
        }

        fileReader.onload = function () {
            var TheFileContents = fileReader.result;
            $(pdfViewerPersonal).html('<img width="460" height="200" src="' + TheFileContents + '"/>');
        };
        fileReader.readAsDataURL($(this)[0].files[0]);

        btnAceptarAdjuntarPersonal.onclick = function () {
            if (fileReader != "") {
                $(errorSubirPersonal).html("")
            }
        }

    }
    previsualizar_modificar_licenciaPersona(fotoLicencia) {

        var fileReader = new FileReader();
        pdfViewerLicencia.innerHTML = ''
        erroradjuntarLicencia.innerHTML = ''

        fileReader.onload = function () {
            var TheFileContents = fileReader.result;
            $(pdfViewerLicencia).html('<img width="460" height="200" src="' + TheFileContents + '"/>');
        };
        fileReader.readAsDataURL(fotoLicencia);


        btnAceptarAdjuntarLicencia.onclick = function () {
            if (fileReader != "") {
                $(errorSubirLicencia).html("")
            }
        }
    }
    previsualizar_modificar_identificacionPersona(fotoIdentificacion) {

        var fileReader = new FileReader();
        pdfViewerIdentificacion.innerHTML = ''
        erroradjuntarIdentificacion.innerHTML = ''

        fileReader.onload = function () {
            var TheFileContents = fileReader.result;
            $(pdfViewerIdentificacion).html('<img width="460" height="200" src="' + TheFileContents + '"/>');
        };
        fileReader.readAsDataURL(fotoIdentificacion);


        btnAceptarAdjuntarIdentificacion.onclick = function () {
            if (fileReader != "") {
                $(errorSubirIdentificacion).html("")
            }
        }
    }
    previsualizar_modificar_fotoPersona(fotoPersona) {

        var fileReader = new FileReader();
        pdfViewerPersonal.innerHTML = ''
        erroradjuntarPersonal.innerHTML = ''

        fileReader.onload = function () {
            var TheFileContents = fileReader.result;
            $(pdfViewerPersonal).html('<img width="460" height="200" src="' + TheFileContents + '"/>');
        };
        fileReader.readAsDataURL(fotoPersona);


        btnAceptarAdjuntarPersonal.onclick = function () {
            if (fileReader != "") {
                $(errorSubirPersonal).html("")
            }
        }
    }
    previsualizar_equipo() {
        var fileReader = new FileReader();
        pdfViewerEquipo.innerHTML = ''
        erroradjuntarEquipo.innerHTML = ''

        var extencion = $(this)[0].files[0].name;
        if (extencion != '') {
            extencion = extencion.split(".");
            extencion = extencion[extencion.length - 1];
        }

        var permitidos = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];
        if (!permitidos.includes($(this)[0].files[0].type) || extencion == 'jfif') {
            erroradjuntarEquipo.innerHTML = "El archivo a subir debe ser un documento en PDF o imagen PNG o JPG"
            return false;
        }

        if (($(this)[0].files[0].size / 1000000) > 5) {
            erroradjuntarEquipo.innerHTML = "El tamaño máximo permitido es de 5 MB"
            return false;
        }
        var tipoarchivo = $(this)[0].files[0].type
        fileReader.onload = function () {
            var TheFileContents = fileReader.result;
            if (tipoarchivo == 'application/pdf') {
                $(pdfViewerEquipo).html('<object> <embed src="' + TheFileContents + '" width="100%" height="300px"/></object>');
            } else {
                $(pdfViewerEquipo).html('<img width="460" height="200" src="' + TheFileContents + '"/>');
            }
        };
        fileReader.readAsDataURL($(this)[0].files[0]);

        btnAceptarAdjuntarEquipo.onclick = function () {
            if (fileReader != "") {
                $(errorSubirFacturaEquipo).html("")
            }
        }
    }
    previsualizar_modificar_equipo(fotoFacturaEquipo) {

        var fileReader = new FileReader();
        pdfViewerEquipo.innerHTML = ''
        erroradjuntarEquipo.innerHTML = ''

        fileReader.onload = function () {
            var TheFileContents = fileReader.result;
            $(pdfViewerEquipo).html('<img width="460" height="200" src="' + TheFileContents + '"/>');
        };
        fileReader.readAsDataURL(fotoFacturaEquipo);

        btnAceptarAdjuntarEquipo.onclick = function () {
            if (fileReader != "") {
                $(errorSubirFacturaEquipo).html("")
            }
        }
    }
    previsualizar_vehiculo_factura() {
        var fileReader = new FileReader();
        pdfViewerVehiculoFactura.innerHTML = ''
        erroradjuntarVehiculoFactura.innerHTML = ''

        var extencion = $(this)[0].files[0].name;
        if (extencion != '') {
            extencion = extencion.split(".");
            extencion = extencion[extencion.length - 1];
        }

        var permitidos = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];
        if (!permitidos.includes($(this)[0].files[0].type) || extencion == 'jfif') {
            erroradjuntarVehiculoFactura.innerHTML = "El archivo a subir debe ser un documento en PDF o imagen PNG o JPG"
            return false;
        }

        if (($(this)[0].files[0].size / 1000000) > 2) {
            erroradjuntarVehiculoFactura.innerHTML = "El tamaño máximo permitido es de 2 MB"
            return false;
        }

        fileReader.onload = function () {
            var TheFileContents = fileReader.result;
            $(pdfViewerVehiculoFactura).html('<img width="460" height="200" src="' + TheFileContents + '"/>');
        };
        fileReader.readAsDataURL($(this)[0].files[0]);

        btnAceptarAdjuntarVehiculoFactura.onclick = function () {
            if (fileReader != "") {
                $(errorSubirFacturaVehiculo).html("")
            }
        }
    }
    previsualizar_modificar_facturaVehiculo(fotoFacturaVehiculo) {

        var fileReader = new FileReader();
        pdfViewerVehiculoFactura.innerHTML = ''
        erroradjuntarVehiculoFactura.innerHTML = ''

        fileReader.onload = function () {
            var TheFileContents = fileReader.result;
            $(pdfViewerVehiculoFactura).html('<img width="460" height="200" src="' + TheFileContents + '"/>');
        };
        fileReader.readAsDataURL(fotoFacturaVehiculo);

        btnAceptarAdjuntarVehiculoFactura.onclick = function () {
            if (fileReader != "") {
                $(errorSubirFacturaVehiculo).html("")
            }
        }
    }
    previsualizar_vehiculo(ev) {
        var fileReader = new FileReader();
        pdfViewerVehiculo.innerHTML = ''
        errorFotografiasVehiculos.innerHTML = ''

        var extencion = $(this)[0].files[0].name;
        if (extencion != '') {
            extencion = extencion.split(".");
            extencion = extencion[extencion.length - 1];
        }

        var permitidos = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];
        if (!permitidos.includes($(this)[0].files[0].type) || extencion == 'jfif') {
            errorFotografiasVehiculos.innerHTML = "El archivo a subir debe ser un documento en PDF o imagen PNG o JPG";
            return false;
        }

        if (($(this)[0].files[0].size / 1000000) > 2) {
            errorFotografiasVehiculos.innerHTML = "El tamaño máximo permitido es de 2 MB";
            return false;
        }

        fileReader.onload = function () {
            var TheFileContents = fileReader.result;
            $(pdfViewerVehiculo).html('<img width="460" height="200" src="' + TheFileContents + '"/>');
        };
        fileReader.readAsDataURL($(this)[0].files[0]);

        if (ev.target.id == "adjuntarPlacaVehiculo") {
            $(btnSiguienteAdjuntarVehiculo).hide();
            $(btnAceptarAdjuntarVechiculo).show();
        } else {
            $(btnSiguienteAdjuntarVehiculo).show();
        }

        btnAceptarAdjuntarVechiculo.onclick = function () {
            if (fileReader != "") {
                $(errorSubirFotoVehiculo).html("")
            }
        }
    }
    previsualizar_modificar_lateralVehiculo(fotoLateralVehiculo) {

        var fileReader = new FileReader();
        pdfViewerVehiculo.innerHTML = ''
        errorFotografiasVehiculos.innerHTML = ''

        $(btnSiguienteAdjuntarVehiculo).show();

        fileReader.onload = function () {
            var TheFileContents = fileReader.result;
            $(pdfViewerVehiculo).html('<img width="460" height="200" src="' + TheFileContents + '"/>');
            //ajuntarLateralVehiculo.dataset.imagen = TheFileContents
        };
        fileReader.readAsDataURL(fotoLateralVehiculo);


        btnAceptarAdjuntarVehiculoFactura.onclick = function () {
            if (fileReader != "") {
                $(errorSubirFacturaVehiculo).html("")
            }
        }
    }
    previsualizar_modificar_placaVehiculo(fotoPlacaVehiculo) {

        //3 lineas a prueba
        $(pdfViewerVehiculo).html("");
        $(fotografiaLateral).hide();
        $(fotografiaPlaca).removeAttr("style");
        $(btnSiguienteAdjuntarVehiculo).hide();
        $(btnAceptarAdjuntarVechiculo).show();

        var fileReader = new FileReader();
        pdfViewerVehiculo.innerHTML = ''
        errorFotografiasVehiculos.innerHTML = ''

        fileReader.onload = function () {
            var TheFileContents = fileReader.result;
            $(pdfViewerVehiculo).html('<img width="460" height="200" src="' + TheFileContents + '"/>');
            //adjuntarPlacaVehiculo.dataset.imagen = TheFileContents
        };
        fileReader.readAsDataURL(fotoPlacaVehiculo);


        btnAceptarAdjuntarVehiculoFactura.onclick = function () {
            if (fileReader != "") {
                $(errorSubirFacturaVehiculo).html("")
            }
        }
    }
    obtener_datos_contrato() {
        if(id_empresa != 0){
            $.ajax({
                url: base_url + 'Usuarios/Ctrl_Empresas/getById',
                type: 'GET',
                dataType: 'json',
                data: {
                    id: id_empresa
                },
                beforeSend: () => {
                    spinner.style.visibility = "visible";
                },
                success: function (response) {
                    if (response.data != "") {
                        entidad.value = response.data.nombre
                    }
                },
                complete: function () {
    
                }
            }).fail(function (response) {
    
            });
        }

        /*if(id_contrato != 0){
            $.ajax({
                url: base_url + 'Contratos/Ctrl_Contratos/getById',
                type: 'GET',
                dataType: 'json',
                data: {
                    idcontrato: id_contrato
                },
                beforeSend: () => {
                    spinner.style.visibility = "visible";
                },
                success: function (response) {
                    if (response.data != "") {
                        entidad.value = response.data.empresa
                        referencia.value = response.data.numero_contrato
                    }
                },
                complete: function () {
    
                }
            }).fail(function (response) {
    
            });
        }*/
    }
    obtener_tipos_permisos() {
        $.ajax({
            url: base_url + 'Catalogos/Ctrl_TiposPermisos/getByEstatus',
            type: 'GET',
            dataType: 'json',
            data: {
                estatus: 1
            },
            beforeSend: function () {
                $(tipoPermiso).append('<option value="">Seleccione</option>');
            },
            success: function (response) {
                response.data.forEach(element => {
                    $(tipoPermiso).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                });
            }
        }).fail(function (response) {

        });
    }
    obtener_actividades_realizar() {
        $.ajax({
            url: base_url + 'Catalogos/Ctrl_Actividades/getByEstatus',
            type: 'GET',
            dataType: 'json',
            data: {
                estatus: 1
            },
            beforeSend: function () {
                $(actividad).append('<option value="">Seleccione</option>');
            },
            success: function (response) {
                response.data.forEach(element => {
                    $(actividad).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                });
            }
        }).fail(function (response) {

        });
    }
    obtener_vigencias() {
        $.ajax({
            url: base_url + 'Catalogos/Ctrl_Vigencias/getByEstatus',
            type: 'GET',
            dataType: 'json',
            data: {
                estatus: 1
            },
            beforeSend: function () {
                $(vigencia).append('<option value="">Seleccione</option>');
            },
            success: function (response) {
                response.data.forEach(element => {
                    $(vigencia).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                });
            }
        }).fail(function (response) {

        });
    }
    obtener_recintos() {
        $.ajax({
            url: base_url + 'Catalogos/Ctrl_Recintos/getByEstatus',
            type: 'GET',
            dataType: 'json',
            data: {
                estatus: 1
            },
            beforeSend: function () {
                $(recinto).append('<option value="">Seleccione</option>')
            },
            success: function (response) {
                response.data.forEach(element => {
                    $(recinto).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                });
            }
        }).fail(function (response) {

        });
    }
    obtener_tipos_empleados() {
        $.ajax({
            url: base_url + 'Catalogos/Ctrl_TiposEmpleados/getByEstatus',
            type: 'GET',
            dataType: 'json',
            data: {
                estatus: 1
            },
            beforeSend: function () {
                $(tipoEmpleado).append('<option value="">Seleccione</option>');
            },
            success: function (response) {
                response.data.forEach(element => {
                    $(tipoEmpleado).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                });
            }
        }).fail(function (response) {

        });
    }
    obtener_nacionalidades() {
        $.ajax({
            url: base_url_rest + 'catalogos/nacionalidades/estatus/1',
            type: 'GET',
            dataType: 'json',
            beforeSend: function () {
                $(nacionalidad).append('<option value="">Seleccione</option>');
            },
            success: function (response) {
                response.data.forEach(element => {
                    $(nacionalidad).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                });
            }
        }).fail(function (response) {

        });
    }
    obtener_estados() {
        $.ajax({
            url: base_url_rest + 'catalogos/estados/1',
            type: 'GET',
            dataType: 'json',
            beforeSend: function () {
                $(entidadGobierno).append('<option value="">Seleccione</option>');
            },
            success: function (response) {
                response.data.forEach(element => {
                    if (element.id != 33)
                        $(entidadGobierno).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                });
            }
        }).fail(function (response) {

        });
    }
    obtener_aseguradoras() {
        $.ajax({
            url: base_url_rest + 'catalogos/tipoaseguradora/estatus/1',
            type: 'GET',
            dataType: 'json',
            beforeSend: function () {
                $(aseguradoras).append('<option value="">Seleccione</option>');
                $(aseguradorasVeh).append('<option value="">Seleccione</option>');
            },
            success: function (response) {
                response.data.forEach(element => {
                    $(aseguradoras).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                    $(aseguradorasVeh).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                });
            }
        }).fail(function (response) {

        });
    }
    obtener_tipos_identificacion() {
        $.ajax({
            url: base_url_rest + 'catalogos/tipoidentificacion/estatus/1',
            type: 'GET',
            dataType: 'json',
            beforeSend: function () {
                $(tipoIdentificacion).html('');
                $(tipoIdentificacion).append('<option value="">Seleccione</option>');
            },
            success: function (response) {
                response.data.forEach(element => {
                    if (($(tipoIdentificacion).data('nacional') == 1 && element.sistema == 1)) {
                        if (element.id != 1)
                            $(tipoIdentificacion).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                    }
                    if (($(tipoIdentificacion).data('nacional') == 0 && (element.sistema == 2 || element.id == 2))) {
                        if (element.id != 1)
                            $(tipoIdentificacion).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                    }
                });
            }
        }).fail(function (response) {

        });
    }
    obtener_tipos_equipos() {
        $.ajax({
            url: base_url + 'Catalogos/Ctrl_TiposEquipos/getByEstatus',
            type: 'GET',
            dataType: 'json',
            data: {
                estatus: 1
            },
            beforeSend: function () {
                $(tipoEquipo).append('<option value="">Seleccione</option>');
            },
            success: function (response) {
                response.data.forEach(element => {
                    $(tipoEquipo).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                });
            }
        }).fail(function (response) {

        });
    }
    obtener_tipos_documentos() {
        $.ajax({
            url: base_url + 'Catalogos/Ctrl_TiposDocumentos/getByEstatus',
            type: 'GET',
            dataType: 'json',
            data: {
                estatus: 1
            },
            beforeSend: function () {
                $(tipoDocumento).append('<option value="">Seleccione</option>');
                $(tipodocumentoVeh).append('<option value="">Seleccione</option>');
            },
            success: function (response) {
                response.data.forEach(element => {
                    if (element.id == 3 || element.id == 4) {
                        $(tipoDocumento).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                        $(tipodocumentoVeh).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                    }
                });
            }
        }).fail(function (response) {

        });
    }
    obtener_tipos_materiales() {
        $.ajax({
            url: base_url + 'Catalogos/Ctrl_TiposMateriales/getByEstatus',
            type: 'GET',
            dataType: 'json',
            data: {
                estatus: 1
            },
            beforeSend: function () {
                $(tipoMaterial).append('<option value="">Seleccione</option>');
            },
            success: function (response) {
                response.data.forEach(element => {
                    $(tipoMaterial).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                });
            }
        }).fail(function (response) {

        });
    }
    obtener_tipos_medidas() {
        $.ajax({
            url: base_url + 'Catalogos/Ctrl_TiposMedidas/getByEstatus',
            type: 'GET',
            dataType: 'json',
            data: {
                estatus: 1
            },
            beforeSend: function () {
                $(tipoMedida).append('<option value="">Seleccione</option>');
            },
            success: function (response) {
                response.data.forEach(element => {
                    $(tipoMedida).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                });
            }
        }).fail(function (response) {

        });
    }
    obtener_tipos_vehiculos() {
        $.ajax({
            url: base_url_rest + 'catalogos/tipovehiculo/estatus/1',
            type: 'GET',
            dataType: 'json',
            beforeSend: function () {
                $(tipoVehiculo).append('<option value="">Seleccione</option>');
            },
            success: function (response) {
                response.data.forEach(element => {
                    $(tipoVehiculo).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                });
            }
        }).fail(function (response) {

        });
    }
    obtener_tipos_tarjetas_circulacion() {
        $.ajax({
            url: base_url_rest + 'catalogos/tipotarjetascirculacion/estatus/1',
            type: 'GET',
            dataType: 'json',
            beforeSend: function () {
                $(tipoTarjetaCirculacion).append('<option value="">Seleccione</option>');
            },
            success: function (response) {
                response.data.forEach(element => {
                    $(tipoTarjetaCirculacion).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                });
            }
        }).fail(function (response) {

        });
    }
    obtener_periodos() {
        $.ajax({
            url: base_url + 'Catalogos/Ctrl_TiposPeriodo/getByEstatus',
            type: 'GET',
            dataType: 'json',
            data: {
                estatus: 1
            },
            beforeSend: function () {
                $(periodoPago).append('<option value="">Seleccione</option>');
            },
            success: function (response) {
                response.data.forEach(element => {
                    $(periodoPago).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                });
            }
        }).fail(function (response) {

        });
    }
    obtener_personal() {
        choferes = 0
        $(selChofer).html('');
        $(resguardo).html('');
        $(responsableMaterial).html('');
        $(selChofer).append('<option value="">Seleccione</option>');
        $(resguardo).append('<option value="">Seleccione</option>');
        $(responsableMaterial).append('<option value="">Seleccione</option>');
        for (let index = 0; index < datosPersonal.length; index++) {
            let selection = ''
            if (datosPersonal.length == 1) {
                selection = 'Selected'
                resguardo.disabled = true
                responsableMaterial.disabled = true
            } else {
                resguardo.disabled = false
                responsableMaterial.disabled = false
            }
            $(resguardo).append('<option value="' + index + '"' + selection + '>' + datosPersonal[index].nombre + ' ' + datosPersonal[index].primerApellido + ' ' + datosPersonal[index].segundoApellido + '</option>');
            $(responsableMaterial).append('<option value="' + index + '"' + selection + '>' + datosPersonal[index].nombre + ' ' + datosPersonal[index].primerApellido + ' ' + datosPersonal[index].segundoApellido + '</option>');
            if (datosPersonal[index].chofer == 1) {
                choferes++
                if (choferes == 1) {
                    selection = 'Selected'
                    selChofer.disabled = true
                } else {
                    selChofer.disabled = false
                }
                $(selChofer).append('<option value="' + index + '"' + selection + '>' + datosPersonal[index].nombre + ' ' + datosPersonal[index].primerApellido + ' ' + datosPersonal[index].segundoApellido + '</option>');
            }
        }
    }
    peticion_repuve(ev) {

        if(tipoVehiculo.value == 2 || tipoVehiculo.value == 7){
            $.ajax({
                async: false,
                url: base_url + 'Utilidades/Ctrl_Servicios/getDatosVehiculos',
                type: 'GET',
                dataType: 'json',
                global: false,
                data: {
                    endpoint: "repuvenacional",
                    noserie: noSerieVehiculo.value,
                    noplaca: noPlaca.value
                },

                beforeSend: function () {
                    idvehiculo.value = 0
                    adjuntarVehiculoFactura.dataset.imagen = ""
                    adjuntarVehiculoFactura.dataset.id = ""
                    ajuntarLateralVehiculo.dataset.imagen = ""
                    ajuntarLateralVehiculo.dataset.id = ""
                    adjuntarPlacaVehiculo.dataset.imagen = ""
                    adjuntarPlacaVehiculo.dataset.id = ""
                },
                success: function (response) {

                    if (response.data != null) {

                        if(response.data[0].placa != '' && noPlaca.value == ''){
                            noPlaca.value = response.data[0].placa
                        }
                        noSerieVehiculo.value = response.data[0].serie
                        marcaVehiculo.value = response.data[0].marca
                        modeloVehicuo.value = response.data[0].submarca
                        anio.value = response.data[0].modelo
                        color.value = response.data[0].color

                        /*noPlaca.setAttribute("class","lectura")
                        noPlaca.setAttribute("disabled",true)
                        noSerieVehiculo.setAttribute("class","lectura")
                        noSerieVehiculo.setAttribute("disabled",true)*/

                        if (response.data_interna != null) {

                            idvehiculo.value = response.data_interna.id
                            noMotor.value = response.data_interna.numero_motor
                            tipoVehiculo.value = response.data_interna.id_tipo_vehiculo
                            tipoTarjetaCirculacion.value = response.data_interna.id_tipo_tarjeta_circulacion
                            noTarjeta.value = response.data_interna.numero_tarjeta_circulacion
                            //vigenciaTarjeta.value = response.data_interna.vigencia_tarjeta_circulacion
                            tipodocumentoVeh.value = response.data_interna.id_tipo_documento
                            noFacturaVeh.value = response.data_interna.numero_factura
                            aseguradorasVeh.value = response.data_interna.id_tipo_aseguradora
                            noPoliza.value = response.data_interna.numero_poliza
                            //vigenciaPoliza.value = response.data_interna.vigencia_poliza
                            periodoPago.value = response.data_interna.id_tipo_periodo
                            periodoCobFechaInicio.value = response.data_interna.fecha_inicio_cobertura
                            periodoCobFechaFin.value = response.data_interna.fecha_fin_cobertura
                            //estatusVehiculo.value = response.data_interna.estatusvehiculo

                            $(errornoMotor).html("")
                            $(errortipoVehiculo).html("")
                            $(errortipoTarjetaCirculacion).html("")
                            $(errornoTarjeta).html("")
                            $(errortipodocumentoVeh).html("")
                            $(erroraseguradorasVeh).html("")
                            $(errornoPoliza).html("")
                            $(errorperiodoPago).html("")
                            $(errorperiodoCobFechaInicio).html("")
                            $(errorperiodoCobFechaFin).html("")
                            //$(errorestatusVehiculo).html("")

                            adjuntarVehiculoFactura.dataset.id = (response.data_interna.id_fotografia_factura != null) ? response.data_interna.id_fotografia_factura : ""
                            adjuntarVehiculoFactura.dataset.imagen = response.data_interna.fotografia_factura
                            btnSubirFacturaVehiculo.value = "Actualizar documento"
                            $(errorSubirFacturaVehiculo).html("")

                            ajuntarLateralVehiculo.dataset.id = (response.data_interna.id_fotografia_lateral != null) ? response.data_interna.id_fotografia_lateral : ""
                            ajuntarLateralVehiculo.dataset.imagen = response.data_interna.fotografia_lateral
                            adjuntarPlacaVehiculo.dataset.id = (response.data_interna.id_fotografia_placa != null) ? response.data_interna.id_fotografia_placa : ""
                            adjuntarPlacaVehiculo.dataset.imagen = response.data_interna.fotografia_placa
                            btnSubirVehiculo.value = "Actualizar foto"
                            $(errorSubirFotoVehiculo).html("")

                            /*if (fechaTermino.value > response.data_interna.vigencia_tarjeta_circulacion) {
                                $(errorvigenciaTarjeta).html("Debe estar vigente durante el periodo")
                            } else {
                                vigenciaTarjeta.value = response.data_interna.vigencia_tarjeta_circulacion
                                $(errorvigenciaTarjeta).html("")
                            }*/
                            if (fechaTermino.value > response.data_interna.vigencia_poliza) {
                                $(errorvigenciaPoliza).html("Debe estar vigente durante el periodo")
                            } else {
                                vigenciaPoliza.value = response.data_interna.vigencia_poliza
                                $(errorvigenciaPoliza).html("")
                            }
                        }

                        if(noMotor.value != ''){
                            noMotor.setAttribute("class", "lectura")
                            noMotor.setAttribute("disabled", true)
                        }

                        $(errornoPlaca).html("")
                        $(errornoSerieVehiculo).html("")
                    }
                }
            }).fail(function (response) {
                if (response.responseText == "Sesion") {
                    error_sesion();
                }
            })
        }
    }
    agregar_personas(fotoLicencia, fotoIdentificacion, fotoPersona) {
        let validacion = true

        if (!errorEstructuraCURP) {
            $(errorcurp).html("")
        }
        if (!errorEstructuraCorreo) {
            $(errorcorreo).html("")
        }
        if (!errorEstructuraINEIFE) {
            $(errorclaveElectoral).html("")
        }
        if (!errorEstructuraPasaporte) {
            $(errornumPasaporte).html("")
        }

        $(errorPersonalDuplicado).html("")
        $(errornacionalidad).html("")
        $(errortipoSeguro).html("")
        $(errornumSeguroSocial).html("")
        $(errornoIssste).html("")
        $(errornoSeguro).html("")
        $(errorentidadGobierno).html("")
        $(errorempresa).html("")
        $(errorclavePatronal).html("")
        $(errornombre).html("")
        $(errorprimerApellido).html("")
        $(errornumtelefono).html("")
        $(errornoLicencia).html("")
        $(errorfechaVenciminetoLic).html("")
        $(errorSubirLicencia).html("")
        $(errortipoIdentificacion).html("")
        $(errorclaveElectoral).html("")
        $(errornumPasaporte).html("")
        $(errorlibretaMar).html("")
        $(errorfechaVenciminetoIdent).html("")
        $(errorSubirIdentificacion).html("")
        $(errorSubirPersonal).html("")

        if (nacionalidad.value == "") {
            $(errornacionalidad).html("Campo obligatorio")
            validacion = false
        }

        if (tipoSeguro.value == "") {
            $(errortipoSeguro).html("Campo obligatorio")
            validacion = false
        } else if (tipoSeguro.value == 1 && numSeguroSocial.value == '') {
            $(errornumSeguroSocial).html("Campo obligatorio")
            validacion = false
        } else if (tipoSeguro.value == 2 && noIssste.value == '') {
            $(errornoIssste).html("Campo obligatorio")
            validacion = false
        } else if (tipoSeguro.value == 3) {
            if (aseguradoras.value == '') {
                $(erroraseguradoras).html("Campo obligatorio")
                validacion = false
            }
            if (noSeguro.value == '') {
                $(errornoSeguro).html("Campo obligatorio")
                validacion = false
            }
        }

        if (nacionalidad.value == 1 && curp.value == "") {
            $(errorcurp).html("Campo obligatorio")
            validacion = false
        }

        /*(tipoEmpleado.value != 5 && nacionalidad.value == 1 && numSeguroSocial.value == ""){
            $(errornumSeguroSocial).html("Campo obligatorio")
            validacion = false
        }

        if(tipoEmpleado.value != 5 && nacionalidad.value == 1 && numSeguroSocial.value != "" && numSeguroSocial.value.length < 11){
            $(errornumSeguroSocial).html("El formato no es correcto")
            validacion = false
        }

        if(tipoEmpleado.value == 5 && nacionalidad.value == 1 && noIssste.value == ""){
            $(errornoIssste).html("Campo obligatorio")
            validacion = false
        }

        if(tipoEmpleado.value != 1 && nacionalidad.value == 2 && noSeguro.value == 2){
            $(errornoSeguro).html("Campo obligatorio")
            validacion = false
        }*/

        if (tipoEmpleado.value == 5 && nacionalidad.value == 1 && entidadGobierno.value == "") {
            $(errorentidadGobierno).html("Campo obligatorio")
            validacion = false
        }

        /*if(tipoEmpleado.value != 1 && empresa.value == ""){
            $(errorempresa).html("Campo obligatorio")
            validacion = false
        }

        if(tipoEmpleado.value != 1 && nacionalidad.value == 1 && clavePatronal.value == ""){
            $(errorclavePatronal).html("Campo obligatorio")
            validacion = false
        }*/

        if (nombre.value == "") {
            $(errornombre).html("Campo obligatorio")
            validacion = false
        }

        if (primerApellido.value == "") {
            $(errorprimerApellido).html("Campo obligatorio")
            validacion = false
        }

        if (numtelefono.value == "") {
            $(errornumtelefono).html("Campo obligatorio")
            validacion = false
        }

        if (numtelefono.value != "" && numtelefono.value.length < 10) {
            $(errornumtelefono).html("El formato no es correcto")
            validacion = false
        }

        if (correo.value == "") {
            $(errorcorreo).html("Campo obligatorio")
            validacion = false
        }

        if (chofer.checked == true) {

            if (noLicencia.value == "") {
                $(errornoLicencia).html("Campo obligatorio")
                validacion = false
            }

            if (fechaVenciminetoLic.value == "") {
                $(errorfechaVenciminetoLic).html("Campo obligatorio")
                validacion = false
            }

            if (adjuntarLicencia.value == "" && adjuntarLicencia.dataset.imagen == "" && fotoLicencia == null) {
                $(errorSubirLicencia).html("Campo obligatorio")
                validacion = false
            }
        }

        if (fechaTermino.value > fechaVenciminetoIdent.value) {
            validacion = false
        }

        if (tipoIdentificacion.value == "") {
            $(errortipoIdentificacion).html("Campo obligatorio")
            validacion = false
        } else if ((tipoIdentificacion.value == 7 || tipoIdentificacion.value == 8) && claveElector.value == "") {
            $(errorclaveElectoral).html("Campo obligatorio")
            validacion = false
        } else if (tipoIdentificacion.value == 2 && noPasaporte.value == "") {
            $(errornumPasaporte).html("Campo obligatorio")
            validacion = false
        } else if (tipoIdentificacion.value == 3 && libretaMar.value == "") {
            $(errorlibretaMar).html("Campo obligatorio")
            validacion = false
        }
        if (tipoIdentificacion.value != "" && fechaVenciminetoIdent.value == "") {
            $(errorfechaVenciminetoIdent).html("Campo obligatorio")
            validacion = false
        }

        if (tipoIdentificacion.value != "" && adjuntarIdentificacion.value == "" && adjuntarIdentificacion.dataset.imagen == "" && fotoIdentificacion == null) {
            $(errorSubirIdentificacion).html("Campo obligatorio")
            validacion = false
        }

        if (tipoIdentificacion.value != "" && adjuntarPersonal.value == "" && adjuntarPersonal.dataset.imagen == "" && fotoPersona == null) {
            $(errorSubirPersonal).html("Campo obligatorio")
            validacion = false
        }

        if (!validacion || errorEstructuraCURP || errorEstructuraCorreo || errorEstructuraINEIFE || errorEstructuraPasaporte) {
            return false
        }
        let datos = {

            idpersona: idpersona.value,
            id_personal_rest: id_personal_rest,
            idcontacto: idcontacto.value,
            tipoEmpleado: tipoEmpleado.value,
            nacionalidad: nacionalidad.value,
            entidadGobierno: entidadGobierno.value,
            empresa: empresa.value,
            clavePatronal: clavePatronal.value,
            tipoSeguro: tipoSeguro.value,
            numSeguroSocial: numSeguroSocial.value,
            noIssste: noIssste.value,
            noSeguro: noSeguro.value,
            aseguradora: aseguradoras.value,
            curp: curp.value,
            nombre: nombre.value,
            primerApellido: primerApellido.value,
            segundoApellido: segundoApellido.value,
            numtelefono: numtelefono.value,
            correo: correo.value,
            chofer: (chofer.checked ? 1 : 0),
            noLicencia: noLicencia.value,
            fechaVenciminetoIdent: fechaVenciminetoIdent.value,
            tipoIdentificacion: tipoIdentificacion.value,
            claveElector: claveElector.value,
            noPasaporte: noPasaporte.value,
            libretaMar: libretaMar.value,
            itinerario: itinerario.value,
            fechaVenciminetoLic: fechaVenciminetoLic.value,
            
            idimagenlicencia: (adjuntarLicencia.dataset.id != "") ? adjuntarLicencia.dataset.id : 0,
            fotografiaLicencia: (fotoLicencia) ? fotoLicencia : $("#adjuntarLicencia")[0].files[0],

            idimagenidentificacion: (adjuntarIdentificacion.dataset.id != "") ? adjuntarIdentificacion.dataset.id : 0,
            fotografiaIdentificacion: (fotoIdentificacion) ? fotoIdentificacion : $("#adjuntarIdentificacion")[0].files[0],

            idimagenpersona: (adjuntarPersonal.dataset.id != "") ? adjuntarPersonal.dataset.id : 0,
            fotografiapersona: (fotoPersona) ? fotoPersona : $("#adjuntarPersonal")[0].files[0]
        }

        datosPersonal.forEach(element => {
            if (element["curp"] == datos["curp"] && validacion == true) {
                validacion = false;
            }
        })

        if (chofer.checked) {
            vehiculotab.disabled = false
        } else {
            vehiculotab.disabled = true
        }

        if (!validacion) {
            $(errorPersonalDuplicado).html("El registro ya existe el la lista")
            return validacion;
        } else (
            $(errorPersonalDuplicado).html("")
        )
        datosPersonal.push(datos)

        if (permisoGrupal.checked == false && datosPersonal.length == 1) {
            tipoEmpleado.setAttribute("disabled", true)
        }

        Permisos.prototype.obtener_personal()
        DTPersonal.row.add([
            '<center>' + tipoEmpleado.options[tipoEmpleado.selectedIndex].text + '</center>',
            '<center>' + datos.nombre + ' ' + datos.primerApellido + ' ' + datos.segundoApellido + '</center>',
            '<center>' + nacionalidad.options[nacionalidad.selectedIndex].text + '</center>',
            '<div class="d-flex justify-content-center" >' +
            '<div class="p-1">' +
            '<a href="#!" title="Modificar">' +
            '<span class="glyphicon glyphicon-pencil modificar-persona" data-id="' + (datosPersonal.length - 1) + '"></span' +
            '</a>' +
            '</div>' +
            '<div class="p-1">' +
            '<a href="#!" title="Eliminar">' +
            '<span class="glyphicon glyphicon-trash eliminar" data-id="' + (datosPersonal.length - 1) + '"></span' +
            '</a>' +
            '</div>' +
            '</div>'
        ]).draw(false)
        edicion_personal = 0
        //Reincio de modales de carga de documentos
        adjuntarPersonal.value = ''
        adjuntarIdentificacion.value = ''
        //Reinicio de campos mostrados a inicio
        chofer.checked = false
        divNacionalidad.style.display = "none"
        divEntidad.style.display = "none"
        divEmpresa.style.display = "none"
        divClavePatronal.style.display = "none"
        divTipoSeguro.style.display = "none"
        divNoSeguroSocial.style.display = "none"
        divNoIssste.style.display = "none"
        divNoSeguro.style.display = "none"
        divAseguradora.style.display = "none"
        divCURP.style.display = "none"
        divNombreApellidos.style.display = "none"
        divTelefono.style.display = "none"
        divCorreo.style.display = "none"
        divChofer.style.display = "none"
        divLicencia.style.display = "none"
        divTipoIdentificacion.style.display = "none"
        divClaveElector.style.display = "none"
        divPasaporte.style.display = "none"
        divLibretaMar.style.display = "none"
        divItinerario.style.display = "none"
        divFechaVencimiento.style.display = "none"
        divSubirfoto.style.display = "none"
        divSubirDocumento.style.display = "none"
        divAnadir.style.display = "none"
        btnGuardar.disabled = false;
        //Reinicio de valores de campos
        idpersona.value = 0
        idcontacto.value = 0
        $(".reiniciar-personal").val("")

        document.getElementById('btnAdjuntarLicencia').value = 'Subir documento'
        document.getElementById('btnSubirIdentificacion').value = 'Subir identificación'
        document.getElementById('btnSubirPersonal').value = 'Subir foto'

        fotoLicencia = null
        fotoIdentificacion = null 
        fotoPersona = null

        errorEstructuraCURP = false
        errorEstructuraCorreo = false
        errorEstructuraINEIFE = false
        errorEstructuraPasaporte = false
    }
    agregar_equipo(fotoFacturaEquipo) {

        let validacion = true;

        $(errorSubirFacturaEquipo).html("")

        if (tipoEquipo.value == "") {
            $(errortipoEquipo).html("Campo obligatorio")
            validacion = false
        }

        if(tipoEquipo.value != 5){
            if (noSerieEquipo.value == "") {
                $(errornoSerieEquipo).html("Campo obligatorio")
                validacion = false
            }
            if (modeloHerramienta.value == "") {
                $(errormodeloHerramienta).html("Campo obligatorio")
                validacion = false
            }
            if (marcaHerramienta.value == "") {
                $(errormarcaHerramienta).html("Campo obligatorio")
                validacion = false
            }
            if (tipoDocumento.value == "") {
                $(errortipoDocumento).html("Campo obligatorio")
                validacion = false
            }
            if (noFacturaEquipo.value == "") {
                $(errornoFacturaEquipo).html("Campo obligatorio")
                validacion = false
            }
            if (resguardo.value == "") {
                $(errorresguardo).html("Campo obligatorio")
                validacion = false
            }
            if (adjuntarEquipo.value == "" && adjuntarEquipo.dataset.imagen == "" && fotoFacturaEquipo == null) {
                $(errorSubirFacturaEquipo).html("Campo obligatorio")
                validacion = false
            }
        }else if(descripcionEquipo.value == ""){
            $(errordescripcionEquipo).html("Campo obligatorio")
            validacion = false
        }

        if (validacion) {
            let datos = {
                idequipo: idequipo.value,
                tipoEquipo: tipoEquipo.value,
                modelo: modeloHerramienta.value,
                marca: marcaHerramienta.value,
                noSerie: noSerieEquipo.value,
                tipoDocumento: tipoDocumento.value,
                noFactura: noFacturaEquipo.value,
                resguardo: resguardo.value,
                idimagenfactura: (adjuntarEquipo.dataset.id != "") ? adjuntarEquipo.dataset.id : 0,
                fotografiaFactura: (fotoFacturaEquipo) ? fotoFacturaEquipo : $("#adjuntarEquipo")[0].files[0],
                //fotografia          : $("#adjuntarEquipo")[0].files[0]
                anexo29: anexo29.value,
                descripcionEquipo : descripcionEquipo.value
            }

            datosEquipos.forEach(element => {
                if (element["noSerie"] == datos["noSerie"] && validacion == true) {
                    validacion = false;
                }
            })

            if (!validacion) {
                $(errorHerramientaDuplicado).html("El registro ya existe el la lista")
                return validacion;
            } else (
                $(errorHerramientaDuplicado).html("")
            )
            datosEquipos.push(datos)
            DTEquipo.row.add([
                '<center>' + tipoEquipo.options[tipoEquipo.selectedIndex].text + '</center>',
                '<center>' + datos.modelo + '</center>',
                '<center>' + datos.marca + '</center>',
                '<center>' + datos.noSerie + '</center>',
                '<div class="d-flex justify-content-center" >' +
                '<div class="p-1">' +
                '<a href="#!" title="Modificar">' +
                '<span class="glyphicon glyphicon-pencil modificar-equipo" data-id="' + (datosEquipos.length - 1) + '"></span>' +
                '</a>' +
                '</div>' +
                '<div class="p-1">' +
                '<a href="#!" title="Eliminar">' +
                '<span class="glyphicon glyphicon-trash eliminar" data-id="' + (datosEquipos.length - 1) + '"></span>' +
                '</a>' +
                '</div>' +
                '</div>'
            ]).draw(false)
            edicion_equipo = 0
            //Reincio de modales de carga de documentos
            adjuntarEquipo.value = ''
            //Reinicio de campos mostrados a inicio
            divCaracteristicas.style.display = "none"
            divDocumento1.style.display = "none"
            divResguardo.style.display = "none"
            idequipo.value = 0
            //Reinicio de valores de campos
            if (datosPersonal.length == 1) {
                resguardo.classList.remove("reiniciar-equipo")
            }else{
                resguardo.classList.add("reiniciar-equipo")
            }
            $(".reiniciar-equipo").val("")
            document.getElementById('btnSubirEquipo').value = 'Subir documento'
            fotoFacturaEquipo = null
        }
    }
    agregar_material() {
        let validacion = true

        /*if(responsableMaterial.value == ""){
            $(errorresponsableMaterial).html("campo obligatorio")
            validacion = false
        }*/

        responsableMaterial.disabled = true;

        if (tipoMaterial.value == "") {
            $(errortipoMaterial).html("Campo obligatorio")
            validacion = false
        }

        if (tipoMaterial.value == 1 && tipoMedida.value == "") {
            $(errortipoMedida).html("Campo obligatorio")
            validacion = false
        }

        if (cantidad.value == "") {
            $(errorcantidad).html("Campo obligatorio")
            validacion = false
        }

        if (descripcion.value == "") {
            $(errordescripcion).html("Campo obligatorio")
            validacion = false
        }

        if (validacion) {
            let datos = {
                responsable: responsableMaterial.value,
                tipomaterial: tipoMaterial.value,
                tipomedida: tipoMedida.value,
                cantidad: cantidad.value,
                descripcion: descripcion.value
            }

            datosMaterial.push(datos)
            DTMaterial.row.add([
                '<center>' + tipoMaterial.options[tipoMaterial.selectedIndex].text + '</center>',
                '<center>' + cantidad.value + '</center>',
                '<center>' + (tipoMaterial.value != 2 ? tipoMedida.options[tipoMedida.selectedIndex].text : '') + '</center>',
                '<center>' + descripcion.value + '</center>',
                '<div class="d-flex justify-content-center" >' +
                '<div class="p-1">' +
                '<a href="#!" title="Modificar">' +
                '<span class="glyphicon glyphicon-pencil modificar-material" data-id="' + (datosMaterial.length - 1) + '"></span>' +
                '</a>' +
                '</div>' +
                '<div class="p-1">' +
                '<a href="#!" title="Eliminar">' +
                '<span class="glyphicon glyphicon-trash eliminar" data-id="' + (datosMaterial.length - 1) + '"></span>' +
                '</a>' +
                '</div>' +
                '</div>'
            ]).draw(false)
            eidicion_material = 0

            //responsableMaterial.value = ""
            tipoMaterial.value = ""
            tipoMedida.value = ""
            cantidad.value = ""
            descripcion.value = ""
            divMedidas.style.display = "none"
        }
    }
    agregar_vehiculo(fotoFacturaVehiculo, fotoLateralVehiculo, fotoPlacaVehiculo) {
        let validacion = true
        $(errorSubirFacturaVehiculo).html("")
        $(errorSubirFotoVehiculo).html("")

        if (noPlaca.value == "") {
            $(errornoPlaca).html("Campo obligatorio")
            validacion = false
        }
        if (noSerieVehiculo.value == "") {
            $(errornoSerieVehiculo).html("Campo obligatorio")
            validacion = false
        }
        if (tipoVehiculo.value == "") {
            $(errortipoVehiculo).html("Campo obligatorio")
            validacion = false
        }
        if (tipoTarjetaCirculacion.value == "") {
            $(errortipoTarjetaCirculacion).html("Campo obligatorio")
            validacion = false
        }
        if (noTarjeta.value == "") {
            $(errornoTarjeta).html("Campo obligatorio")
            validacion = false
        }
        /*if (vigenciaTarjeta.value == "") {
            $(errorvigenciaTarjeta).html("Campo obligatorio")
            validacion = false
        }*/
        if (tipodocumentoVeh.value == "") {
            $(errortipodocumentoVeh).html("Campo obligatorio")
            validacion = false
        }
        /*if(noFacturaVeh.value == ""){
            $(errornoFacturaVeh).html("Campo obligatorio")
            validacion = false
        }*/
        if (aseguradorasVeh.value == "") {
            $(erroraseguradorasVeh).html("Campo obligatorio")
            validacion = false
        }
        if (noPoliza.value == "") {
            $(errornoPoliza).html("Campo obligatorio")
            validacion = false
        }
        if (vigenciaPoliza.value == "") {
            $(errorvigenciaPoliza).html("Campo obligatorio")
            validacion = false
        }
        if (periodoPago.value == "") {
            $(errorperiodoPago).html("Campo obligatorio")
            validacion = false
        }
        if (periodoCobFechaInicio.value == "") {
            $(errorperiodoCobFechaInicio).html("Campo obligatorio")
            validacion = false
        }
        if (periodoCobFechaFin.value == "") {
            $(errorperiodoCobFechaFin).html("Campo obligatorio")
            validacion = false
        }
        /*if(estatusVehiculo.value == ""){
            $(errorestatusVehiculo).html("Campo obligatorio")
            validacion = false
        }*/
        if (selChofer.value == "") {
            $(errorselChofer).html("Campo obligatorio")
            validacion = false
        }
        if (adjuntarVehiculoFactura.value == "" && adjuntarVehiculoFactura.dataset.imagen == "" && fotoFacturaVehiculo == null) {
            $(errorSubirFacturaVehiculo).html("Campo obligatorio")
            validacion = false
        }
        if (ajuntarLateralVehiculo.value == "" && ajuntarLateralVehiculo.dataset.imagen == "" && fotoLateralVehiculo == null) {
            $(errorSubirFotoVehiculo).html("Campo obligatorio")
            validacion = false
        }
        if (adjuntarPlacaVehiculo.value == "" && adjuntarPlacaVehiculo.dataset.imagen == "" && fotoPlacaVehiculo == null) {
            $(errorSubirFotoVehiculo).html("Campo obligatorio")
            validacion = false
        }

        if (noSerieVehiculo.value.length != 17 && noSerieVehiculo.value != "") {
            $(errornoSerieVehiculo).html("Deben ser 17 caracteres")
            validacion = false
        }
        if (noMotor.value != "") {
            if (noMotor.value.length < 6 || noMotor.value.length > 10) {
                $(errornoMotor).html("Deben ser entre 6 y 10 caracteres")
                validacion = false
            }
        }
        /*if(noMotor.value == ""){
            $(errornoMotor).html("Campo obligatorio")
            validacion = false
        }*/

        if (validacion) {
            let datos = {
                idvehiculo: idvehiculo.value,
                noPlaca: noPlaca.value,
                noSerie: noSerieVehiculo.value,
                noMotor: noMotor.value,
                marca: marcaVehiculo.value,
                modelo: modeloVehicuo.value,
                anio: anio.value,
                color: color.value,
                tipoVehiculo: tipoVehiculo.value,
                tipoTarCircu: tipoTarjetaCirculacion.value,
                noTarjeta: noTarjeta.value,
                //vigenciaTarjete: vigenciaTarjeta.value,
                tipoDocumento: tipodocumentoVeh.value,
                noFactura: noFacturaVeh.value,
                idimagenfactura: (adjuntarVehiculoFactura.dataset.id != "") ? adjuntarVehiculoFactura.dataset.id : 0,
                documentoFactura: (fotoFacturaVehiculo) ? fotoFacturaVehiculo : $("#adjuntarVehiculoFactura")[0].files[0],
                //documentoFactura        : $("#adjuntarVehiculoFactura")[0].files[0],
                aseguradora: aseguradorasVeh.value,
                noPoliza: noPoliza.value,
                vigenciaPoliza: vigenciaPoliza.value,
                periodoPago: periodoPago.value,
                periodoFechaInicio: periodoCobFechaInicio.value,
                periodoFechaFin: periodoCobFechaFin.value,
                //estatusVehiculo         : estatusVehiculo.value,
                chofer: selChofer.value,
                idfotografiaLateral: (ajuntarLateralVehiculo.dataset.id != "") ? ajuntarLateralVehiculo.dataset.id : 0,
                fotografiaLateral: (fotoLateralVehiculo) ? fotoLateralVehiculo : $("#ajuntarLateralVehiculo")[0].files[0],
                //fotografiaLateral       : $("#ajuntarLateralVehiculo")[0].files[0],
                idfotografiaPlaca: (adjuntarPlacaVehiculo.dataset.id != "") ? adjuntarPlacaVehiculo.dataset.id : 0,
                //fotografiaPlaca         : $("#adjuntarPlacaVehiculo")[0].files[0],
                fotografiaPlaca: (fotoPlacaVehiculo) ? fotoPlacaVehiculo : $("#adjuntarPlacaVehiculo")[0].files[0]
            }

            datosVehiculos.forEach(element => {
                if (element["noPlaca"] == datos["noPlaca"] && validacion == true) {
                    validacion = false;
                }
            })

            if (!validacion) {
                $(errorVehiculoDuplicado).html("El registro ya existe el la lista")
                return validacion;
            } else (
                $(errorVehiculoDuplicado).html("")
            )

            datosVehiculos.push(datos)
            DTVehiculo.row.add([
                '<center>' + datos.noPlaca + '</center>',
                '<center>' + datos.noSerie + '</center>',
                '<center>' + datos.marca + '</center>',
                '<center>' + datos.anio + '</center>',
                '<center>' + tipoVehiculo.options[tipoVehiculo.selectedIndex].text + '</center>',
                '<center>' + (datos.chofer != null ? 'SI' : 'NO') + '</center>',
                '<div class="d-flex justify-content-center" >' +
                '<div class="p-1">' +
                '<a href="#!" title="Modificar">' +
                '<span class="glyphicon glyphicon-pencil modificar-vehiculo" data-id="' + (datosVehiculos.length - 1) + '"></span>' +
                '</a>' +
                '</div>' +
                '<div class="p-1">' +
                '<a href="#!" title="Eliminar">' +
                '<span class="glyphicon glyphicon-trash eliminar" data-id="' + (datosVehiculos.length - 1) + '"></span>' +
                '</a>' +
                '</div>' +
                '</div>'
            ]).draw(false)
            edicion_vehiculo = 0
            //Reincio de modales de carga de documentos
            adjuntarVehiculoFactura.value = ''
            ajuntarLateralVehiculo.value = ''
            adjuntarPlacaVehiculo.value = ''
            fotografiaLateral.style.display = ""
            fotografiaPlaca.style.display = "none"
            btnSiguienteAdjuntarVehiculo.style.display = "none"
            btnAceptarAdjuntarVechiculo.style.display = "none"
            //Reinicio de campos mostrados a inicio
            noPlaca.setAttribute("class", "form-control reiniciar-vehiculo")
            //noPlaca.removeAttribute("disabled")
            noSerieVehiculo.setAttribute("class", "form-control reiniciar-vehiculo")
            //noSerieVehiculo.removeAttribute("disabled")
            noSerieVehiculo.setAttribute("class", "form-control reiniciar-vehiculo")
            noMotor.removeAttribute("disabled")
            //Reinicio de valores de campos
            idvehiculo.value = 0
            $(".reiniciar-vehiculo").val("")
            document.getElementById('btnSubirFacturaVehiculo').value = 'Subir documento'
            document.getElementById('btnSubirVehiculo').value = 'Subir archivo'

            fotoFacturaVehiculo = null
            fotoLateralVehiculo = null
            fotoPlacaVehiculo = null
        }
    }
    confirmar_almacenamiento() {
        let validacion = true
        let actual_tmp = new Date().toISOString().split("T")[0];
        let requeridos = document.getElementsByClassName('validar-requerido')

        for (let index = 0; index < requeridos.length; index++) {
            if (requeridos[index].value == "") {
                $("#error" + requeridos[index].id).html('Campo obligatorio')
                validacion = false
            }
        }

        if (fechaInicio.value < actual_tmp) {
            errorfechaInicio.innerHTML = "Fecha fuera de rango"
            validacion = false
        }

        if (datosPersonal.length == 0) {
            peticion_fallida('Debe haber al menos una persona en el listado para poder guardar el permiso.');
            Permisos.prototype.agregar_personas();
            validacion = false
        }

        if (curpResponsable.value != "" && permisoGrupal.checked) {
            let indexPersonal = datosPersonal.findIndex(e => e.curp === curpResponsable.value)
            if (indexPersonal == -1) {
                peticion_fallida("El titular del permiso no se encuentra registrado en el listado del personal")
                validacion = false
            }
        }

        if (validacion) {
            pedir_confirmacion_guardar();
        } else {
            $(tipoPermiso).focus()
        }
    }
    realizar_almacenamiento_pases() {
        confirmar_guardar.disabled = true;
        btnGuardar.disabled = true;
        estatus_pase = 1
        if (datosEquipos.length > 0 || datosMaterial.length > 0) {
            estatus_pase = 2
        }

        let formData = new FormData();
        formData.append("idempresa", id_empresa)
        formData.append("idpersona", id_persona_fisica)
        formData.append("idcontrato", id_contrato)
        formData.append("idtipopermiso", tipoPermiso.value)
        formData.append("visita", clientetEntidad.value)
        formData.append("idtipoactividad", actividad.value)
        formData.append("idtipovigencia", vigencia.value)
        formData.append("dias", (dias.value == "" ? 0 : dias.value))
        formData.append("fechainicio", fechaInicio.value)
        formData.append("fechatermino", fechaTermino.value)
        formData.append("idrecinto", recinto.value)
        formData.append("idfiscalizado", (nombreRecinto.value == '' ? null : nombreRecinto.value))
        formData.append("motivo", motivo.value)
        formData.append("permisogrupal", (permisoGrupal.checked ? 1 : 0))
        formData.append("estatus", estatus_pase)
        formData.append("curpresponsable", curpResponsable.value)
        formData.append([csrf.name], csrf.value)

        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/addPermiso',
            type: 'POST',
            data: formData,
            global: false,
            processData: false,
            contentType: false,
            beforeSend: function () {
                $("#modal_confirmar_guardar").modal("hide");
                spinner.style.visibility = "visible";
            },
            success: function (response) {
                csrf.value = response.token;
                if (response.status) {
                    id_permiso = response.data.id
                    Permisos.prototype.realizar_almacenamiento_personal()
                } else {
                    confirmar_guardar.disabled = false;
                    btnGuardar.disabled = false;
                    peticion_fallida(response.message);
                    spinner.style.visibility = "hidden";
                }
            },
            error: (xhr, ajaxOptions, thrownError) => {
                spinner.style.visibility = "hidden";
                confirmar_guardar.disabled = false;
                btnGuardar.disabled = false;
                peticion_fallida(thrownError);
                // csrf.value = xhr.responseJSON.token;
            }
        }).fail(function (response) {
            spinner.style.visibility = "hidden";
            confirmar_guardar.disabled = false;
            btnGuardar.disabled = false;
            if (response.responseText == "Sesion") {
                error_sesion();
            }
        })
    }
    realizar_almacenamiento_personal() {
        $('#personaltab').trigger('click')
        let formData = new FormData();
        for (let index = 0; index < datosPersonal.length; index++) {
            formData.append("idpermiso[" + index + "]", id_permiso)
            formData.append("idpersonafisica[" + index + "]", id_persona_fisica)
            formData.append("idempresa[" + index + "]", (empresa.value != "" ? idempresa.value : id_empresa))
            formData.append("estatus_pase[" + index + "]", estatus_pase)
            formData.append("idpersonal[" + index + "]", datosPersonal[index].idpersona)
            formData.append("id_personal_rest[" + index + "]", datosPersonal[index].id_personal_rest)
            formData.append("idcontacto[" + index + "]", datosPersonal[index].idcontacto)
            formData.append("tipoEmpleado[" + index + "]", datosPersonal[index].tipoEmpleado)
            formData.append("nacionalidad[" + index + "]", datosPersonal[index].nacionalidad)
            formData.append("entidadGobierno[" + index + "]", (datosPersonal[index].entidadGobierno == "" ? null : datosPersonal[index].entidadGobierno))
            formData.append("empresa[" + index + "]", datosPersonal[index].empresa)
            formData.append("clavePatronal[" + index + "]", datosPersonal[index].clavePatronal)
            formData.append("numSeguroSocial[" + index + "]", datosPersonal[index].numSeguroSocial)
            formData.append("noIssste[" + index + "]", datosPersonal[index].noIssste)
            formData.append("noSeguro[" + index + "]", datosPersonal[index].noSeguro)
            formData.append("aseguradora[" + index + "]", (datosPersonal[index].aseguradora == "" ? null : datosPersonal[index].aseguradora))
            formData.append("curp[" + index + "]", datosPersonal[index].curp)
            formData.append("nombre[" + index + "]", datosPersonal[index].nombre)
            formData.append("primerApellido[" + index + "]", datosPersonal[index].primerApellido)
            formData.append("segundoApellido[" + index + "]", datosPersonal[index].segundoApellido)
            formData.append("numtelefono[" + index + "]", datosPersonal[index].numtelefono)
            formData.append("correo[" + index + "]", datosPersonal[index].correo)
            formData.append("chofer[" + index + "]", datosPersonal[index].chofer)
            formData.append("noLicenica[" + index + "]", datosPersonal[index].noLicencia)
            formData.append("fechaVenciminetoLic[" + index + "]", datosPersonal[index].fechaVenciminetoLic)
            formData.append("fechaVenciminetoIdent[" + index + "]", datosPersonal[index].fechaVenciminetoIdent)
            formData.append("tipoIdentificacion[" + index + "]", datosPersonal[index].tipoIdentificacion)
            formData.append("claveElector[" + index + "]", datosPersonal[index].claveElector)
            formData.append("noPasaporte[" + index + "]", datosPersonal[index].noPasaporte)
            formData.append("libretaMar[" + index + "]", datosPersonal[index].libretaMar)
            formData.append("itinerario[" + index + "]", datosPersonal[index].itinerario)
            formData.append("idimagenlicencia[" + index + "]", datosPersonal[index].idimagenlicencia);
            formData.append("fotografiaLicencia-" + index, datosPersonal[index].fotografiaLicencia);
            formData.append("idimagenidentificacion[" + index + "]", datosPersonal[index].idimagenidentificacion);
            formData.append("fotografiaIdentificacion-" + index, datosPersonal[index].fotografiaIdentificacion);
            formData.append("idimagenpersona[" + index + "]", datosPersonal[index].idimagenpersona);
            formData.append("fotografiapersona" + index, datosPersonal[index].fotografiapersona);
            formData.append([csrf.name], csrf.value);
        }

        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/addPersonal',
            type: 'POST',
            data: formData,
            global: false,
            processData: false,
            contentType: false,
            success: function (response) {
                csrf.value = response.token;
                if (response.status) {
                    personalAlmacenado = response.data
                    if (datosEquipos.length > 0) {
                        Permisos.prototype.realizar_almacenamiento_equipos()
                    } else if (datosMaterial.length > 0) {
                        Permisos.prototype.realizar_almacenamiento_materiales()
                    } else if (datosVehiculos.length > 0) {
                        Permisos.prototype.realizar_almacenamiento_vehiculos()
                    } else {
                        Permisos.prototype.reiniciar_campos()
                        registro_exitoso(response.message);
                        spinner.style.visibility = "hidden";
                    }
                } else {
                    confirmar_guardar.disabled = false;
                    btnGuardar.disabled = false;
                    peticion_fallida(response.message);
                    spinner.style.visibility = "hidden";
                }
            },
            error: (xhr, ajaxOptions, thrownError) => {
                spinner.style.visibility = "hidden";
                confirmar_guardar.disabled = false;
                btnGuardar.disabled = false;
                peticion_fallida(thrownError);
                // csrf.value = xhr.responseJSON.token;
            }
        }).fail(function (response) {
            spinner.style.visibility = "hidden";
            if (response.responseText == "Sesion") {
                error_sesion();
            }
        })
    }
    realizar_almacenamiento_equipos() {
        let formData = new FormData();
        for (let index = 0; index < datosEquipos.length; index++) {
            formData.append("idpermiso[" + index + "]", id_permiso)
            formData.append("idempresa[" + index + "]", id_empresa)
            formData.append("idpersonafisica[" + index + "]", id_persona_fisica)
            formData.append("idequipo[" + index + "]", datosEquipos[index].idequipo)
            formData.append("tipoEquipo[" + index + "]", datosEquipos[index].tipoEquipo)
            formData.append("modelo[" + index + "]", datosEquipos[index].modelo)
            formData.append("marca[" + index + "]", datosEquipos[index].marca)
            formData.append("noSerie[" + index + "]", datosEquipos[index].noSerie)
            formData.append("tipoDocumento[" + index + "]", datosEquipos[index].tipoDocumento)
            formData.append("noFactura[" + index + "]", datosEquipos[index].noFactura)
            formData.append("resguardo[" + index + "]", personalAlmacenado[datosEquipos[index].resguardo])
            formData.append("idimagenfactura[" + index + "]", datosEquipos[index].idimagenfactura)
            formData.append("fotografiaFactura-" + index, datosEquipos[index].fotografiaFactura);
            //formData.append("fotografia-"+index,datosEquipos[index].fotografia);
            formData.append("anexo29[" + index + "]", datosEquipos[index].anexo29)
            formData.append("descripcionEquipo[" + index + "]", datosEquipos[index].descripcionEquipo)
            formData.append([csrf.name], csrf.value);
        }
        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/addEquipos',
            type: 'POST',
            data: formData,
            global: false,
            processData: false,
            contentType: false,
            success: function (response) {
                csrf.value = response.token;
                if (response.status) {
                    if (datosMaterial.length > 0) {
                        Permisos.prototype.realizar_almacenamiento_materiales()
                    } else {
                        Permisos.prototype.reiniciar_campos()
                        registro_exitoso(response.message);
                        spinner.style.visibility = "hidden";
                    }
                } else {
                    confirmar_guardar.disabled = false;
                    btnGuardar.disabled = false;
                    peticion_fallida(response.message);
                    spinner.style.visibility = "hidden";
                }
            },
            error: (xhr, ajaxOptions, thrownError) => {
                confirmar_guardar.disabled = false;
                btnGuardar.disabled = false;
                spinner.style.visibility = "hidden";
                peticion_fallida(thrownError);
                // csrf.value = xhr.responseJSON.token;
            }
        }).fail(function (response) {
            spinner.style.visibility = "hidden";
            if (response.responseText == "Sesion") {
                error_sesion();
            }
        })
    }
    realizar_almacenamiento_materiales() {
        let formData = new FormData();
        for (let index = 0; index < datosMaterial.length; index++) {
            formData.append("idpermiso[" + index + "]", id_permiso)
            formData.append("idmaterial[" + index + "]", 0)
            formData.append("idpersonal[" + index + "]", personalAlmacenado[datosMaterial[index].responsable])
            formData.append("idtipomaterial[" + index + "]", datosMaterial[index].tipomaterial)
            formData.append("idtipomedida[" + index + "]", (datosMaterial[index].tipomedida != "" ? datosMaterial[index].tipomedida : null))
            formData.append("cantidad[" + index + "]", datosMaterial[index].cantidad)
            formData.append("descripcion[" + index + "]", datosMaterial[index].descripcion)
            formData.append("responsable", personalAlmacenado[datosMaterial[index].responsable])
            formData.append("id_permiso", id_permiso)
            formData.append([csrf.name], csrf.value);
        }

        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/addMateriales',
            type: 'POST',
            data: formData,
            global: false,
            processData: false,
            contentType: false,
            success: function (response) {
                csrf.value = response.token;
                if (response.status) {
                    if (datosVehiculos.length > 0) {
                        Permisos.prototype.realizar_almacenamiento_vehiculos()
                    } else {
                        Permisos.prototype.reiniciar_campos()
                        registro_exitoso(response.message);
                        spinner.style.visibility = "hidden";
                    }
                } else {
                    confirmar_guardar.disabled = false;
                    btnGuardar.disabled = false;
                    peticion_fallida(response.message);
                    spinner.style.visibility = "hidden";
                }
            },
            error: (xhr, ajaxOptions, thrownError) => {
                confirmar_guardar.disabled = false;
                btnGuardar.disabled = false;
                spinner.style.visibility = "hidden";
                peticion_fallida(thrownError);
                // csrf.value = xhr.responseJSON.token;
            }
        }).fail(function (response) {
            spinner.style.visibility = "hidden";
            if (response.responseText == "Sesion") {
                error_sesion();
            }
        })
    }
    realizar_almacenamiento_vehiculos() {
        let formData = new FormData();
        for (let index = 0; index < datosVehiculos.length; index++) {
            //formData.append("idvehiculo["+index+"]",id_vehiciulo)
            formData.append("idvehiculo[" + index + "]", datosVehiculos[index].idvehiculo)
            formData.append("idpermiso[" + index + "]", id_permiso)
            formData.append("idempresa[" + index + "]", id_empresa)
            formData.append("id_empresa_rest[" + index + "]", id_empresa)
            formData.append("idpersonafisica[" + index + "]", id_persona_fisica)
            formData.append("idvehiculo[" + index + "]", 0)
            formData.append("noPlaca[" + index + "]", datosVehiculos[index].noPlaca)
            formData.append("noSerie[" + index + "]", datosVehiculos[index].noSerie)
            formData.append("noMotor[" + index + "]", datosVehiculos[index].noMotor)
            formData.append("marca[" + index + "]", datosVehiculos[index].marca)
            formData.append("modelo[" + index + "]", datosVehiculos[index].modelo)
            formData.append("anio[" + index + "]", datosVehiculos[index].anio)
            formData.append("color[" + index + "]", datosVehiculos[index].color)
            formData.append("tipoVehiculo[" + index + "]", datosVehiculos[index].tipoVehiculo)
            formData.append("tipoTarCircu[" + index + "]", datosVehiculos[index].tipoTarCircu)
            formData.append("noTarjeta[" + index + "]", datosVehiculos[index].noTarjeta)
            //formData.append("vigenciaTarjete[" + index + "]", datosVehiculos[index].vigenciaTarjete)
            formData.append("tipoDocumento[" + index + "]", datosVehiculos[index].tipoDocumento)
            formData.append("noFactura[" + index + "]", datosVehiculos[index].noFactura)
            formData.append("aseguradora[" + index + "]", datosVehiculos[index].aseguradora)
            formData.append("noPoliza[" + index + "]", datosVehiculos[index].noPoliza)
            formData.append("vigenciaPoliza[" + index + "]", datosVehiculos[index].vigenciaPoliza)
            formData.append("periodoPago[" + index + "]", datosVehiculos[index].periodoPago)
            formData.append("periodoFechaInicio[" + index + "]", datosVehiculos[index].periodoFechaInicio)
            formData.append("periodoFechaFin[" + index + "]", datosVehiculos[index].periodoFechaFin)
            //formData.append("estatusVehiculo["+index+"]",datosVehiculos[index].estatusVehiculo)
            formData.append("chofer[" + index + "]", personalAlmacenado[datosVehiculos[index].chofer])
            formData.append("idimagenfactura[" + index + "]", datosPersonal[index].idimagenfactura);
            formData.append("fotografiaFactura-" + index, datosVehiculos[index].documentoFactura);
            formData.append("idfotografiaLateral[" + index + "]", datosPersonal[index].idfotografiaLateral);
            formData.append("fotografiaLateral-" + index, datosVehiculos[index].fotografiaLateral);
            formData.append("idfotografiaPlaca[" + index + "]", datosPersonal[index].idfotografiaPlaca);
            formData.append("fotografiaPlaca-" + index, datosVehiculos[index].fotografiaPlaca);
            formData.append([csrf.name], csrf.value);
        }

        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/addVehiculos',
            type: 'POST',
            data: formData,
            global: false,
            processData: false,
            contentType: false,
            success: function (response) {
                csrf.value = response.token;
                if (response.status) {
                    Permisos.prototype.reiniciar_campos()
                    registro_exitoso(response.message);
                    spinner.style.visibility = "hidden";
                } else {
                    confirmar_guardar.disabled = false;
                    btnGuardar.disabled = false;
                    peticion_fallida(response.message);
                    spinner.style.visibility = "hidden";
                }
            },
            error: (xhr, ajaxOptions, thrownError) => {
                spinner.style.visibility = "hidden";
                confirmar_guardar.disabled = false;
                btnGuardar.disabled = false;
                peticion_fallida(thrownError);
                // csrf.value = xhr.responseJSON.token;
            }
        }).fail(function (response) {
            spinner.style.visibility = "hidden";
            if (response.responseText == "Sesion") {
                error_sesion();
            }
        })
    }
    reiniciar_campos() {
        datosPersonal = []
        datosEquipos = []
        datosVehiculos = []
        DTPersonal.clear().draw()
        DTEquipo.clear().draw()
        DTVehiculo.clear().draw()
        DTMaterial.clear().draw()

        divDias.style.display = "none"
        divRecinto.style.display = "none"
        divCURPResp.style.display = "none"

        permisoGrupal.checked = false
        confirmar_guardar.disabled = false;
        btnGuardar.disabled = false;
        $(".reiniciar-pase").val("")
    }
}
const per = new Permisos()

$(tabPersonal).on('click', '.eliminar', function (ev) {
    datosPersonal.splice(ev.target.dataset.id, 1);
    DTPersonal.row($(this).parents('tr')).remove().draw();
    if (datosPersonal.length == 0) {
        btnGuardar.disabled = true;
    }
    per.obtener_personal()
    tipoEmpleado.removeAttribute("disabled")
    $(errorcurpResponsable).html("")
});
$(tabEquipoHerramienta).on('click', '.eliminar', function (ev) {
    datosEquipos.splice(ev.target.dataset.id, 1);
    DTEquipo.row($(this).parents('tr')).remove().draw();
});
$(tabVehiculos).on('click', '.eliminar', function (ev) {
    datosVehiculos.splice(ev.target.dataset.id, 1);
    DTVehiculo.row($(this).parents('tr')).remove().draw();
});
$(tabMaterial).on('click', '.eliminar', function (ev) {
    datosMaterial.splice(ev.target.dataset.id, 1);
    DTMaterial.row($(this).parents('tr')).remove().draw();
});
$(tabEquipoHerramienta).on('click', '.modificar-equipo', function (ev) {
    if(edicion_equipo == 1){
        peticion_fallida("Se encuentra en edición otro registro");
        return false
    }
    edicion_equipo = 1

    tipoEquipo.value = datosEquipos[ev.target.dataset.id].tipoEquipo
    modeloHerramienta.value = datosEquipos[ev.target.dataset.id].modelo
    marcaHerramienta.value = datosEquipos[ev.target.dataset.id].noSerie
    noSerieEquipo.value = datosEquipos[ev.target.dataset.id].marca
    tipoDocumento.value = datosEquipos[ev.target.dataset.id].tipoDocumento
    noFacturaEquipo.value = datosEquipos[ev.target.dataset.id].noFactura
    fotoFacturaEquipo = datosEquipos[ev.target.dataset.id].fotografiaFactura
    resguardo.value = datosEquipos[ev.target.dataset.id].resguardo
    btnSubirEquipo.value = "Actualizar documento"

    divCaracteristicas.style.display = ""
    divDocumento1.style.display = ""
    divResguardo.style.display = ""

    $(errortipoEquipo).html("")
    $(errornoSerieEquipo).html("")
    $(errormodeloHerramienta).html("")
    $(errormarcaHerramienta).html("")
    $(errortipoDocumento).html("")
    $(errornoFacturaEquipo).html("")
    $(errorresguardo).html("")
    $(errorSubirFacturaEquipo).html("")

    $(btnSubirEquipo).on('click', function (ev) {
        per.previsualizar_modificar_equipo(fotoFacturaEquipo)
    })

    datosEquipos.splice(ev.target.dataset.id, 1);
    DTEquipo.row($(this).parents('tr')).remove().draw();

    let elements = $('.modificar-equipo');
    for (let index = ev.target.dataset.id; index < elements.length; index++) {
        num = elements[index].dataset.id;
        if (num != 0)
            num = num - 1;
        elements[index].dataset.id = num;
    };
})
$(tabVehiculos).on('click', '.modificar-vehiculo', function (ev) {
    if(edicion_vehiculo == 1){
        peticion_fallida("Se encuentra en edición otro registro");
        return false
    }
    edicion_vehiculo = 1
    
    noPlaca.value = datosVehiculos[ev.target.dataset.id].noPlaca
    noSerieVehiculo.value = datosVehiculos[ev.target.dataset.id].noSerie
    noMotor.value = datosVehiculos[ev.target.dataset.id].noMotor
    marcaVehiculo.value = datosVehiculos[ev.target.dataset.id].marca
    modeloVehicuo.value = datosVehiculos[ev.target.dataset.id].modelo
    anio.value = datosVehiculos[ev.target.dataset.id].anio
    color.value = datosVehiculos[ev.target.dataset.id].color
    tipoVehiculo.value = datosVehiculos[ev.target.dataset.id].tipoVehiculo
    tipoTarjetaCirculacion.value = datosVehiculos[ev.target.dataset.id].tipoTarCircu
    noTarjeta.value = datosVehiculos[ev.target.dataset.id].noTarjeta
    //vigenciaTarjeta.value = datosVehiculos[ev.target.dataset.id].vigenciaTarjete
    tipodocumentoVeh.value = datosVehiculos[ev.target.dataset.id].tipoDocumento
    noFacturaVeh.value = datosVehiculos[ev.target.dataset.id].noFactura
    fotoFacturaVehiculo = datosVehiculos[ev.target.dataset.id].documentoFactura
    aseguradorasVeh.value = datosVehiculos[ev.target.dataset.id].aseguradora
    noPoliza.value = datosVehiculos[ev.target.dataset.id].noPoliza
    vigenciaPoliza.value = datosVehiculos[ev.target.dataset.id].vigenciaPoliza
    periodoPago.value = datosVehiculos[ev.target.dataset.id].periodoPago
    periodoCobFechaInicio.value = datosVehiculos[ev.target.dataset.id].periodoFechaInicio
    periodoCobFechaFin.value = datosVehiculos[ev.target.dataset.id].periodoFechaFin
    //estatusVehiculo.value        = datosVehiculos[ev.target.dataset.id].estatusVehiculo
    selChofer.value = datosVehiculos[ev.target.dataset.id].chofer
    fotoLateralVehiculo = datosVehiculos[ev.target.dataset.id].fotografiaLateral
    fotoPlacaVehiculo = datosVehiculos[ev.target.dataset.id].fotografiaPlaca
    btnSubirFacturaVehiculo.value = "Actualizar documento"
    btnSubirVehiculo.value = "Actualizar foto"

    $(btnSubirFacturaVehiculo).on('click', function (ev) {
        per.previsualizar_modificar_facturaVehiculo(fotoFacturaVehiculo)
    })
    $(btnSubirVehiculo).on('click', function (ev) {
        per.previsualizar_modificar_lateralVehiculo(fotoLateralVehiculo)
    })
    $(btnSiguienteAdjuntarVehiculo).on('click', function (ev) {
        per.previsualizar_modificar_placaVehiculo(fotoPlacaVehiculo)
    })

    datosVehiculos.splice(ev.target.dataset.id, 1);
    DTVehiculo.row($(this).parents('tr')).remove().draw();

    let elements = $('.modificar-vechiculo');
    for (let index = ev.target.dataset.id; index < elements.length; index++) {
        num = elements[index].dataset.id;
        if (num != 0)
            num = num - 1;
        elements[index].dataset.id = num;
    };

    $(errornoPlaca).html("")
    $(errornoSerieVehiculo).html("")
    $(errornoMotor).html("")
    $(errortipoVehiculo).html("")
    $(errortipoTarjetaCirculacion).html("")
    $(errornoTarjeta).html("")
    //$(errorvigenciaTarjeta).html("")
    $(errortipodocumentoVeh).html("")
    $(erroradjuntarVehiculoFactura).html("")
    $(erroraseguradorasVeh).html("")
    $(errornoPoliza).html("")
    $(errorvigenciaPoliza).html("")
    $(errorperiodoPago).html("")
    $(errorperiodoCobFechaInicio).html("")
    $(errorperiodoCobFechaFin).html("")
    //$(errorestatusVehiculo).html("")
    $(errorselChofer).html("")
    $(errorSubirFacturaVehiculo).html("")
    $(errorSubirFotoVehiculo).html("")

})
$(tabPersonal).on('click', '.modificar-persona', function (ev) {
    if(edicion_personal == 1){
        peticion_fallida("Se encuentra en edición otro registro");
        return false
    }
    edicion_personal = 1

    tipoEmpleado.value = datosPersonal[ev.target.dataset.id].tipoEmpleado
    tipoEmpleado.disabled = false
    nacionalidad.value = datosPersonal[ev.target.dataset.id].nacionalidad
    entidadGobierno.value = datosPersonal[ev.target.dataset.id].entidadGobierno
    empresa.value = datosPersonal[ev.target.dataset.id].empresa
    clavePatronal.value = datosPersonal[ev.target.dataset.id].clavePatronal
    tipoSeguro.value = datosPersonal[ev.target.dataset.id].tipoSeguro

    if (tipoSeguro.value == 1) {
        divTipoSeguro.style.display = ''
        divNoSeguroSocial.style.display = ''
        numSeguroSocial.value = datosPersonal[ev.target.dataset.id].numSeguroSocial
        noIssste = ''
        noSeguro.value = ''
        aseguradoras.vaalue = ''
        divNoSeguro.style.display = 'none'
        divAseguradora.style.display = 'none'
        divNoIssste.style.display = 'none'
    }

    if (tipoSeguro.value == 2) {
        divTipoSeguro.style.display = ''
        divNoIssste.style.display = ''
        noIssste.value = datosPersonal[ev.target.dataset.id].noIssste
        numSeguroSocial = ''
        noSeguro.value = ''
        aseguradoras.vaalue = ''
        divTipoSeguro.style.display = 'none'
        divNoSeguro.style.display = 'none'
        divAseguradora.style.display = 'none'
        divNoSeguroSocial.style.display = 'none'
    }

    if (tipoSeguro.value == 3) {
        divTipoSeguro.style.display = ''
        divNoSeguro.style.display = ''
        divAseguradora.style.display = ''
        noSeguro.value = datosPersonal[ev.target.dataset.id].noSeguro
        eguradoras.value = datosPersonal[ev.target.dataset.id].aseguradora
        numSeguroSocial = ''
        noSeguro.value = ''
        divNoIssste.style.display = 'none'
        divNoSeguroSocial.style.display = 'none'
    }

    curp.value = datosPersonal[ev.target.dataset.id].curp
    nombre.value = datosPersonal[ev.target.dataset.id].nombre
    primerApellido.value = datosPersonal[ev.target.dataset.id].primerApellido
    segundoApellido.value = datosPersonal[ev.target.dataset.id].segundoApellido
    numtelefono.value = datosPersonal[ev.target.dataset.id].numtelefono
    correo.value = datosPersonal[ev.target.dataset.id].correo

    Permisos.prototype.validar_tipoPersona_nacionalidad(datosPersonal[ev.target.dataset.id].nacionalidad)

    if (datosPersonal[ev.target.dataset.id].chofer == 1) {
        chofer.checked = true
        chofer.value = 1
        noLicencia.value = datosPersonal[ev.target.dataset.id].noLicencia
        fechaVenciminetoLic.value = datosPersonal[ev.target.dataset.id].fechaVenciminetoLic
        fotoLicencia = datosPersonal[ev.target.dataset.id].fotografiaLicencia
        btnAdjuntarLicencia.value = "Actualizar licencia"
        $(divLicencia).show()
        $(errornoLicencia).html("")

    } else {
        chofer.checked = false
        chofer.value = 0
    }

    tipoIdentificacion.value = datosPersonal[ev.target.dataset.id].tipoIdentificacion
    fechaVenciminetoIdent.value = datosPersonal[ev.target.dataset.id].fechaVenciminetoIdent
    fotoIdentificacion = datosPersonal[ev.target.dataset.id].fotografiaIdentificacion
    btnSubirIdentificacion.value = "Actualizar identificación"

    fotoPersona = datosPersonal[ev.target.dataset.id].fotografiapersona
    btnSubirPersonal.value = "Actualizar foto"

    divFechaVencimiento.style.display = ""
    divSubirDocumento.style.display = ""
    divSubirfoto.style.display = ""

    switch (datosPersonal[ev.target.dataset.id].tipoIdentificacion) {
        case "7":
            divClaveElector.style.display = ""
            divPasaporte.style.display = "none"
            divLibretaMar.style.display = "none"
            divItinerario.style.display = "none"
            claveElector.value = datosPersonal[ev.target.dataset.id].claveElector
            break;
        case "8":
            divClaveElector.style.display = ""
            divPasaporte.style.display = "none"
            divLibretaMar.style.display = "none"
            divItinerario.style.display = "none"
            claveElector.value = datosPersonal[ev.target.dataset.id].claveElector
            break;
        case "2":
            divClaveElector.style.display = "none"
            divPasaporte.style.display = ""
            divLibretaMar.style.display = "none"
            divItinerario.style.display = "none"
            noPasaporte.value = datosPersonal[ev.target.dataset.id].noPasaporte
            break;
        case "3":
            divClaveElector.style.display = "none"
            divPasaporte.style.display = "none"
            divLibretaMar.style.display = ""
            divItinerario.style.display = "none"
            libretaMar.value = datosPersonal[ev.target.dataset.id].libretaMar
            break;
        case "4":
            divClaveElector.style.display = "none"
            divPasaporte.style.display = "none"
            divLibretaMar.style.display = "none"
            divItinerario.style.display = "none"
            break;
        case "5":
            divClaveElector.style.display = "none"
            divPasaporte.style.display = "none"
            divLibretaMar.style.display = "none"
            divItinerario.style.display = ""
            itinerario.value = datosPersonal[ev.target.dataset.id].itinerario
            break;
    }

    $(errorPersonalDuplicado).html("")
    $(errornacionalidad).html("")
    $(errornumSeguroSocial).html("")
    $(errortipoSeguro).html("")
    $(errornoIssste).html("")
    $(errornoSeguro).html("")
    $(errorentidadGobierno).html("")
    $(errorempresa).html("")
    $(errorclavePatronal).html("")
    $(errornombre).html("")
    $(errorprimerApellido).html("")
    $(errornumtelefono).html("")
    $(errornoLicencia).html("")
    $(errorfechaVenciminetoLic).html("")
    $(errorSubirLicencia).html("")
    $(errortipoIdentificacion).html("")
    $(errorclaveElectoral).html("")
    $(errornumPasaporte).html("")
    $(errorlibretaMar).html("")
    $(errorfechaVenciminetoIdent).html("")
    $(errorSubirIdentificacion).html("")
    $(errorSubirPersonal).html("")

    $(btnAdjuntarLicencia).on('click', function (ev) {
        per.previsualizar_modificar_licenciaPersona(fotoLicencia)
    })
    $(btnSubirIdentificacion).on('click', function (ev) {
        per.previsualizar_modificar_identificacionPersona(fotoIdentificacion)
    })
    $(btnSubirPersonal).on('click', function (ev) {
        per.previsualizar_modificar_fotoPersona(fotoPersona)
    })

    datosPersonal.splice(ev.target.dataset.id, 1);
    if (datosPersonal.length == 0) {
        btnGuardar.disabled = true;
    }
    DTPersonal.row($(this).parents('tr')).remove().draw();

    let elements = $('.modificar-persona');
    for (let index = ev.target.dataset.id; index < elements.length; index++) {
        num = elements[index].dataset.id;
        if (num != 0)
            num = num - 1;
        elements[index].dataset.id = num;
    };
})
$(tabMaterial).on('click', '.modificar-material', function (ev) {
    if(eidicion_material == 1){
        peticion_fallida("Se encuentra en edición otro registro");
        return false
    }
    eidicion_material = 1

    responsableMaterial.value = datosMaterial[ev.target.dataset.id].responsable
    tipoMaterial.value = datosMaterial[ev.target.dataset.id].tipomaterial
    if (tipoMaterial.value == 1 || tipoMaterial.value == 3) {
        divMedidas.style.display = ""
        tipoMedida.value = datosMaterial[ev.target.dataset.id].tipomedida
    } else {
        divMedidas.style.display = "none"
    }
    cantidad.value = datosMaterial[ev.target.dataset.id].cantidad
    descripcion.value = datosMaterial[ev.target.dataset.id].descripcion

    datosMaterial.splice(ev.target.dataset.id, 1);
    DTMaterial.row($(this).parents('tr')).remove().draw();

    let elements = $('.modificar-material');
    for (let index = ev.target.dataset.id; index < elements.length; index++) {
        num = elements[index].dataset.id;
        if (num != 0)
            num = num - 1;
        elements[index].dataset.id = num;
    };

    $(errortipoMaterial).html("")
    $(errortipoMedida).html("")
    $(errorcantidad).html("")
    $(errordescripcion).html("")
})

function setResult(result) {
    scanner.stop();
    datosEscaneados = result.split("]");
    curp.value = datosEscaneados[0]
    nombre.value = datosEscaneados[4]
    primerApellido.value = datosEscaneados[2]
    segundoApellido.value = datosEscaneados[3]
    $("#modalEscanerCURP").modal("hide");
}

$("#btnCancelarEscaneo").click(function () {
    scanner.stop();
});

$("#fechaInicio").change((ev) => {
    if ($("#fechaInicio").val() != "") {
        $("#errorfechaTermino").html('');
    }
});

$("#fechaTermino").change((ev) => {
    if (ev.target.value != "") {
        $("#error" + ev.target.id).html('')
    }
});

$("#btnRegresar").click((e) => {
    if (cambios == 1)
        pedir_confirmar_regresar();
    else
        window.location.href = base_url + 'Permisos/Ctrl_Permisos/index_autorizadores';
});

$("#nacionalidad").change(function () {
    Permisos.prototype.obtener_tipos_identificacion();
    divClaveElector.style.display = "none"
    divPasaporte.style.display = "none"
    divLibretaMar.style.display = "none"
    divItinerario.style.display = "none"

    divFechaVencimiento.style.display = "none"
    divSubirDocumento.style.display = "none"
    divSubirfoto.style.display = "none"

    $("#claveElector").val('');
    $("#noPasaporte").val('');
    $("#libretaMar").val('');
    $("#itinerario").val('');
    $("#fechaVenciminetoIdent").val('');
});

$("#tipoIdentificacion").change(function () {
    $("#claveElector").val('');
    $("#noPasaporte").val('');
    $("#libretaMar").val('')
    $("#itinerario").val('');
    $("#fechaVenciminetoIdent").val('');
});

$('.nav-link').click(function () {
    let siguiente = $(this).data('orden')
    if (siguiente != 1 && datosPersonal.length == 0) {
        return false
    }
});

$(".nav-link").click(function () {
    let siguiente = $(this).data("orden")

    if (siguiente != 1 && datosPersonal.length == 0) {
        return false
    } else {
        if (siguiente > 1) {
            $(".anterior").show();
        } else {
            $(".anterior").hide();
        }

        if (siguiente == 5) {
            $(".siguiente").hide();
        } else {
            $(".siguiente").show();
        }
    }
});

$('.siguiente').click(function () {
    $('.nav-tabs > .active').next('li').find('a').trigger('click');
});

$('.anterior').click(function () {
    $('.nav-tabs > .active').prev('li').find('a').trigger('click');
});
