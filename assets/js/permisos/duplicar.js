const id_permiso = localStorage.getItem("id_permiso");
const url_regreso = localStorage.getItem("url_regreso");

var DTPersonal, DTEquipo, DTVehiculo, DTMaterial, DTDocAdicionales;
var errorEstructuraCURP = false;
var errorEstructuraCorreo = false;
var errorEstructuraNSS = false;
var errorEstructuraINEIFE = false;
var errorEstructuraPasaporte = false;
var fotoFacturaEquipo = null
var fotoEquipoAnexo = null
var fotoEquipoRF = null
var fotoMaterial = null
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
var id_empresa = 0;
var id_persona_fisica = 0;
var id_contrato = 0;
var datosPersonal = []
var documentosAdicionales = []
var documentosAdicionalesAux = []
var documentosAdicionalesEliminar = []
var datosEquipos = []
var datosVehiculos = []
var datosMaterial = []
var datosPase = []
var actualizarDatosPersonas = []
var actualizarDatosVehiculos = []
var cambios = 0
var choferes = 0
var estatus_pase = 0
var id_personal_rest = 0
var posicionIndex = -1

var edicion_personal = 0
var edicion_equipo = 0
var edicion_material = 0
var edicion_vehiculo = 0

var tmplat = "";
var tmppla = "";
var tmpfac = "";
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

        this.obtener_info_pase()
    }
    inicio() {
        id_empresa = _id_empresa_rest
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

        DTDocAdicionales = $(tabDocumentosAdicionales).DataTable({
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            },
            "lengthChange": false,
            "searching": false,
            "pageLength": 5,
            "columns": [
                { "width": "80%" },
                null
              ]
        });

        aceptar.addEventListener('click',(ev)=>{
            window.location.href = base_url + url_regreso;
        })

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
        motivo.addEventListener("change",(ev)=>{
            if(motivo.value != ""){
                errormotivo.innerHTML = ''
            }else{
                errormotivo.innerHTML = 'Campo obligatorio'
            }
        })

        /*motivo.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16) {
                if (ev.keyCode == 219)
                    ev.preventDefault();
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_apostrofe(ev.key, 1);
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
                let resultado = this.validaciones.caracteres_validos_apostrofe(ev.target.value, 2);
                if (!resultado.resp) {
                    elementError.innerHTML = 'Información no valida'
                }
            }
        })*/

       /* empresa.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })*/
        let elemento_formulario = document.getElementsByClassName("form-control")
      
        for (let i = 0; i < elemento_formulario.length; i++) {
            elemento_formulario[i].addEventListener("change",function(){
                if(elemento_formulario[i].value != ""){
                    let elementError = document.getElementById("error" + elemento_formulario[i].id)
                    if(elementError != null){
                        elementError.innerHTML = ""
                    }
                }
            })
        }
        empresa.addEventListener("keydown",(ev)=>{
            if(ev.keyCode == 219){
                ev.preventDefault()
            }
        })
        empresa.addEventListener("change", (ev) => {
            let elementError = document.getElementById("error" + ev.target.id)
            elementError.innerHTML = ''
            if (ev.target.value == "") {
                elementError.innerHTML = 'Campo Obligatorio'
            } else { 
                elementError.innerHTML = ''
            }
        })

        curp.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16 && ev.keyCode != 17 && ev.keyCode != 8 && ev.keyCode != 9 && ev.keyCode != 86) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_especial(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })
        clavePatronal.addEventListener("change", (ev) => {
            if (ev.keyCode != 16) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_sin_acentos_con_numero(ev.target.value,1);
                if (!resultado.resp) {
                    errorclavePatronal.innerHTML = "Información no valida"
                }else{
                    errorclavePatronal.innerHTML = ""
                }
            }
        })
        empresa_rfc.addEventListener("change", (ev) => {
            if (ev.keyCode != 16) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_sin_acentos_con_numero(ev.target.value,1);
                if (!resultado.resp) {
                    errorempresa_rfc.innerHTML = "Información no valida"
                }else{
                    errorempresa_rfc.innerHTML = ""
                }
            }
        })
        empresa_rfc.addEventListener("change",this.validar_rfc)
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
            if (ev.keyCode != 16 && ev.keyCode != 17 && ev.keyCode != 8 && ev.keyCode != 9 && ev.keyCode != 86) {
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
            }else {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_numericos(ev.target.value, 1);
                if (!resultado.resp) {
                    $(errornumtelefono).html("El formato no es correcto")
                }
            }
        })

        numSeguroSocial.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16 && ev.keyCode != 17 && ev.keyCode != 8 && ev.keyCode != 9 && ev.keyCode != 86) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_numericos(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        numSeguroSocial.addEventListener("change", (ev) => {
            this.validaciones = new VALIDACIONES();
            let resultado = this.validaciones.caracteres_validos_numericos(ev.target.value, 1);
            if (!resultado.resp) {
                $(errornumSeguroSocial).html("El formato no es correcto")
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
            if (ev.target.value.length < 4) {
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
            if(ev.keyCode == 219){
                ev.preventDefault()
            }
        })

        modeloHerramienta.addEventListener("change", (ev) => {
            let elementError = document.getElementById("error" + ev.target.id)
            elementError.innerHTML = ''
        })

        marcaHerramienta.addEventListener("keydown", (ev) => {
            if(ev.keyCode == 219){
                ev.preventDefault()
            }
        })

        marcaHerramienta.addEventListener("change", (ev) => {
            let elementError = document.getElementById("error" + ev.target.id)
            elementError.innerHTML = ''
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
        noPlaca.addEventListener('change',(ev)=>{
            if(noPlaca.value != ""){
                Permisos.prototype.peticion_vehiculo()
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

        /*noFacturaVeh.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_especial(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })*/

        noPoliza.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_especial_sin_comillas(ev.key, 1);
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

            if((ev.target.value*1) > 60){
                elementError.innerHTML = 'La vigencia máxima es de 60 días'
            }

            if((ev.target.value*1) == 0){
                elementError.innerHTML = 'Información no valida'
            }

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
            if(fechaInicio.value != "" && ev.target.value == 1){
                tipoEmpleado.removeAttribute("disabled")
            } 
        })

        dias.addEventListener("change", () => {
            if (vigencia.value == 2 && fechaInicio.value != "" && (dias.value*1) > 0) {
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

                if (vigencia.value == 2 && (dias.value*1) > 0) {
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
              //tipoEmpleado.removeAttribute("disabled")
            } else {
                let length = 0
                datosPersonal.forEach(element => {
                    if(element.opcion != 3){
                        length++
                    }
                });
                if (length <= 1) {
                    curpResponsable.value = ""
                    errorcurpResponsable.innerHTML = ""
                    divCURPResp.style.display = "none"
                    curpResponsable.setAttribute("class", "form-control reiniciar-pase")
                    $(errorcurpResponsable).html("")
                    /*tipoEmpleado.setAttribute("disabled", true)*/
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
            elementos[i].addEventListener("click", (ev) => {
                $(modalEscanerCURP).css("margin-top", ajuste_altura_modal(ev))
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
            elementos[i].addEventListener("click", (ev) => {
                $(modalEscanerCURP).css("margin-top", ajuste_altura_modal(ev))
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

        //clavePatronal.addEventListener("change", this.validar_clave_patronal)
        curp.addEventListener("keyup", (ev) => {
            ev.target.value = ev.target.value.toUpperCase()
            $(errorPersonalDuplicado).html("")
        });
       
       curp.addEventListener("change", this.validar_curp)

        claveElector.addEventListener("keyup", (ev) => {
            ev.target.value = ev.target.value.toUpperCase()
            if (!errorEstructuraINEIFE) {
                $(errorclaveElectoral).html("")
            }
        });

        claveElector.addEventListener("change", this.INE_IFE)

        noPasaporte.addEventListener("keyup", (ev) => {
            ev.target.value = ev.target.value.toUpperCase()
          //  $(errornumPasaporte).html("")
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
            $("#pdfViewerLicencia").css("height","0px");
			$("#pdfViewerLicencia").html("");
            var tmp= $("#val_licencia").val();		
			if (typeof tmp  !== "undefined"){ 
				var capa = "pdfViewerLicencia";
				$("#"+capa).css({"overflow":"hidden", "height":"300px", "overflow-y":"scroll"});
                $("#"+capa).html('<div class="img-zoom-container"><img id="myimage" width="100%" src="/assets/uploads/permisos/personal/' + tmp + '"/>');
			} 
            $(modalLicencia).css("margin-top", ajuste_altura_modal(ev))
            $(modalLicencia).modal()
        })
        adjuntarLicencia.addEventListener("change", this.previsualizar_licencia)

        btnSubirIdentificacion.addEventListener("click", (ev) => {
            $("#pdfViewerIdentificacion").css("height","0px");
			$("#pdfViewerIdentificacion").html("");
            var tmp= $("#val_identificacion").val();		
			if (typeof tmp  !== "undefined"){ 
				var capa = "pdfViewerIdentificacion";
				$("#"+capa).css({"overflow":"hidden", "height":"300px", "overflow-y":"scroll"});
                $("#"+capa).html('<div class="img-zoom-container"><img id="myimage" width="100%" src="/assets/uploads/permisos/personal/' + tmp + '"/>');
			} 
            $(modalIdentificacion).css("margin-top", ajuste_altura_modal(ev))
            $(modalIdentificacion).modal()
        })
        adjuntarIdentificacion.addEventListener("change", this.previsualizar_identificacion)

        btnSubirPersonal.addEventListener("click", (ev) => {
            $("#pdfViewerPersonal").css("height","0px");
			$("#pdfViewerPersonal").html("");
            var tmp= $("#val_personal").val();		
			if (typeof tmp  !== "undefined"){ 
				var capa = "pdfViewerPersonal";
				$("#"+capa).css({"overflow":"hidden", "height":"300px", "overflow-y":"scroll"});
                $("#"+capa).html('<div class="img-zoom-container"><img id="myimage" width="100%" src="/assets/uploads/permisos/personal/' + tmp + '"/>');
			} 
            $(modalPersonal).css("margin-top", ajuste_altura_modal(ev))
            $(modalPersonal).modal()
        })

        btnSubirAdicional.addEventListener("click", (ev) => {
            $("#pdfViewerAdicionales").css("height","0px");
			$("#pdfViewerAdicionales").html("");
            var tmp= $("#val_adicional").val();		
			if (typeof tmp  !== "undefined"){ 
				var capa = "pdfViewerAdicionales";
				$("#"+capa).css({"overflow":"hidden", "height":"300px", "overflow-y":"scroll"});
                $("#"+capa).html('<div class="img-zoom-container"><img id="myimage" width="100%" src="/assets/uploads/permisos/personal/' + tmp + '"/>');
			} 
            $(modalAdicionales).css("margin-top", ajuste_altura_modal(ev))
            $(modalAdicionales).modal()
        })

        adjuntarEquipo.addEventListener("change", this.previsualizar_equipo)

        btnSubirEquipo.addEventListener('click', (ev) => {
			$("#pdfViewerEquipo").css("height","0px");
			$("#pdfViewerEquipo").html("");
            var tmp= $("#val_equipo").val();		
			if (typeof tmp  !== "undefined"){ 
				var capa = "pdfViewerEquipo";
				$("#"+capa).css({"overflow":"hidden", "height":"300px", "overflow-y":"scroll"});
                $("#"+capa).html('<div class="img-zoom-container"><img id="myimage" width="100%" src="/assets/uploads/permisos/equipos/' + tmp + '"/>');
			} 
            $(modalEquipo).css("margin-top", ajuste_altura_modal(ev))
            $(modalEquipo).modal()
        })

        adjuntarEquipoAnexo.addEventListener("change", this.previsualizar_equipo_anexo)

        btnSubirEquipoAnexo.addEventListener('click', (ev) => {
			$("#pdfViewerEquipoAnexo").css("height","0px");
			$("#pdfViewerEquipoAnexo").html("");
            var tmp= $("#val_equipo_anexo").val();		
			if (typeof tmp  !== "undefined"){ 
				var capa = "pdfViewerEquipoAnexo";
				$("#"+capa).css({"overflow":"hidden", "height":"300px", "overflow-y":"scroll"});
                $("#"+capa).html('<div class="img-zoom-container"><img id="myimage" width="100%" src="/assets/uploads/permisos/equipos/' + tmp + '"/>');
			} 
            $(modalEquipoAnexo).css("margin-top", ajuste_altura_modal(ev))
            $(modalEquipoAnexo).modal()
        })

        adjuntarEquipoRF.addEventListener("change", this.previsualizar_equipo_rf)

        btnSubirEquipoRF.addEventListener('click', (ev) => {
			$("#pdfViewerEquipoRF").css("height","0px");
			$("#pdfViewerEquipoRF").html("");
            var tmp= $("#val_equipo_rf").val();		
			if (typeof tmp  !== "undefined"){ 
				var capa = "pdfViewerEquipoRF";
				$("#"+capa).css({"overflow":"hidden", "height":"300px", "overflow-y":"scroll"});
                $("#"+capa).html('<div class="img-zoom-container"><img id="myimage" width="100%" src="/assets/uploads/permisos/equipos/' + tmp + '"/>');
			} 
            $(modalEquipoRf).css("margin-top", ajuste_altura_modal(ev))
            $(modalEquipoRf).modal()
        })

        adjuntarMaterial.addEventListener("change", this.previsualizar_material)

        btnSubirMaterial.addEventListener('click', (ev) => {
			$("#pdfViewerMaterial").css("height","0px");
			$("#pdfViewerMaterial").html("");
            var tmp= $("#val_material").val();		
			if (typeof tmp  !== "undefined"){ 
				var capa = "pdfViewerMaterial";
				$("#"+capa).css({"overflow":"hidden", "height":"300px", "overflow-y":"scroll"});
                $("#"+capa).html('<div class="img-zoom-container"><img id="myimage" width="100%" src="/assets/uploads/permisos/materiales/' + tmp + '"/>');
			} 
            $(modalMaterial).css("margin-top", ajuste_altura_modal(ev))
            $(modalMaterial).modal()
        })

        //adjuntarVehiculoFactura.addEventListener("change", this.previsualizar_vehiculo_factura)
			
        /*btnSubirFacturaVehiculo.addEventListener('click', (ev) => {
			$("#pdfViewerVehiculoFactura").css("height","0px");
			$("#pdfViewerVehiculoFactura").html("");
			var tmp= $("#tab_factura").attr("href");			
			if (typeof tmp  !== "undefined"){ 
				var capa = "pdfViewerVehiculoFactura";
				$("#"+capa).css({"overflow":"hidden", "height":"300px", "overflow-y":"scroll"});
                $("#"+capa).html('<div class="img-zoom-container"><img id="myimage" width="100%" src="' + tmp + '"/>');
			} 
			
			
            $(modalVehiculoFactura).modal()
        })*/

        btnSubirVehiculo.addEventListener('click', (ev) => {
            $(btnSiguienteAdjuntarVehiculo).hide();
            $(btnAceptarAdjuntarVechiculo).hide();

			$("#pdfViewerVehiculo").css("height","0px");
			$("#pdfViewerVehiculo").html("");

            $(fotografiaLateral).show();
            $(fotografiaPlaca).hide();
            
			var tmp= $("#tab_lateral").attr("href");			
			if (typeof tmp  !== "undefined"){ 
				var capa = "pdfViewerVehiculo";
				$("#"+capa).css({"overflow":"hidden", "height":"300px", "overflow-y":"scroll"});
                $("#"+capa).html('<div class="img-zoom-container"><img id="myimage" width="100%" src="' + tmp + '"/>');
			} 
            $(modalVehiculo).css("margin-top", ajuste_altura_modal(ev))
            $(modalVehiculo).modal()
        })
        btnSiguienteAdjuntarVehiculo.addEventListener('click', (ev) => {

            $(pdfViewerVehiculo).html("");
            $(fotografiaLateral).hide();
            $(fotografiaPlaca).removeAttr("style");
            $(btnSiguienteAdjuntarVehiculo).hide();
            $(btnAceptarAdjuntarVechiculo).hide();
			
			var tmp= $("#tab_placa").attr("href");		
			if (typeof tmp  !== "undefined"){ 
		 
				var capa = "pdfViewerVehiculo";
				$("#"+capa).css({"overflow":"hidden", "height":"300px", "overflow-y":"scroll"});
                $("#"+capa).html('<div class="img-zoom-container"><img id="myimage" width="100%" src="' + tmp + '"/>');
			} 
		 

            /*if (adjuntarPlacaVehiculo.dataset.imagen) {

                $(pdfViewerVehiculo).html('<img width="460" height="200" src="' + base_url + '/' + adjuntarPlacaVehiculo.dataset.imagen + '"/>');
                $(btnAceptarAdjuntarVechiculo).show();

            } else {
                pdfViewerVehiculo.innerHTML = ''
            }*/

        })


        adjuntarPersonal.addEventListener("change", this.previsualizar_personal)

        anadirPersona.addEventListener("click", (ev) => {
            if (fotoIdentificacion && fotoIdentificacion && fotoPersona) {
                Permisos.prototype.agregar_personas(fotoLicencia, fotoIdentificacion, fotoPersona)
            } else {
                Permisos.prototype.agregar_personas()
            }

            let length = 0
            datosPersonal.forEach(element => {
                if(element.opcion != 3){
                    length++
                }
            });

            if(length <= 1 && !permisoGrupal.checked){
                permisoGrupal.checked = false
                curpResponsable.value = ""
                divCURPResp.style.display = "none"
            }else{
                permisoGrupal.checked = true
                divCURPResp.style.display = ""
            }
        })
        anadirEquipo.addEventListener("click", (ev) => {
            if (fotoFacturaEquipo) {
                Permisos.prototype.agregar_equipo(fotoFacturaEquipo, fotoEquipoAnexo, fotoEquipoRF)
            } else {
                Permisos.prototype.agregar_equipo()
            }
        })
        anadirMaterial.addEventListener("click", ()=>{
            if (fotoMaterial) {
                Permisos.prototype.agregar_material(fotoMaterial)
            } else {
                Permisos.prototype.agregar_material()
            }
        })
        anadirVehiculo.addEventListener("click", (ev) => {
            if (fotoLateralVehiculo && fotoPlacaVehiculo) {
                Permisos.prototype.agregar_vehiculo(fotoLateralVehiculo, fotoPlacaVehiculo)
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

        noPlaca.addEventListener("change", this.peticion_vehiculo)
        noSerieVehiculo.addEventListener("change",this.peticion_no_serie)

        ajuntarLateralVehiculo.addEventListener("change", this.previsualizar_vehiculo)
        adjuntarPlacaVehiculo.addEventListener("change", this.previsualizar_vehiculo)

        confirmar_salir_sin_guardar.addEventListener('click', (ev) => {
            window.location.href = base_url + url_regreso;
        });
        btnGuardar.addEventListener('click', (ev => {
            this.confirmar_almacenamiento(ev)
        }))
        confirmar_guardar.addEventListener('click', (ev) => {
            this.realizar_almacenamiento_pases(ev)
        })

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
        btnAceptarAdjuntarEquipoAnexo.addEventListener('click', (ev) => {
            if (adjuntarEquipoAnexo.value != "") {
                document.getElementById('btnSubirEquipoAnexo').value = 'Actualizar Anexo'
            }
        })
        btnAceptarAdjuntarEquipoRF.addEventListener('click', (ev) => {
            if (adjuntarEquipoRF.value != "") {
                document.getElementById('btnSubirEquipoRF').value = 'Actualizar RF'
            }
        })
        btnAceptarAdjuntarMaterial.addEventListener('click', (ev) => {
            if (adjuntarMaterial.value != "") {
                document.getElementById('btnSubirMaterial').value = 'Actualizar documento'
            }
        })
        /*btnAceptarAdjuntarVehiculoFactura.addEventListener('click', (ev) => {
            if (adjuntarVehiculoFactura.value != "") {
                document.getElementById('btnSubirFacturaVehiculo').value = 'Actualizar documento'
            }

        })*/
        btnAceptarAdjuntarVechiculo.addEventListener('click', (ev) => {
            if (ajuntarLateralVehiculo.value != "" && adjuntarPlacaVehiculo.value != "") {
                document.getElementById('btnSubirVehiculo').value = 'Actualizar archivo'
            }

        })
        //noSerieEquipo.addEventListener('change', this.validar_noserie_equipo)

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
        actividad.addEventListener('change',(ev)=>{
            if(actividad.value != ""){
                erroractividad.innerHTML = ""
            }
        })
        recinto.addEventListener('change',(ev)=>{
            if(recinto.value != ""){
                errorrecinto.innerHTML = ""
            }
        })
        tipoIdentificacion.addEventListener('change',(ev)=>{
            errortipoIdentificacion.innerHTML = ""
        })
        entidadGobierno.addEventListener('change',(ev)=>{
            errorentidadGobierno.innerHTML = ""
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

        periodoCobFechaInicio.addEventListener('change', (ev) => {
            $(errorperiodoCobFechaInicio).html("")
            if ((periodoCobFechaInicio.value > fechaInicio.value) && periodoCobFechaInicio.value != "") {
                $(errorperiodoCobFechaInicio).html("Debe estar vigente durante el periodo")
                periodoCobFechaInicio.value = ""
            }
        })

        periodoCobFechaFin.addEventListener('change', (ev) => {
            $(errorperiodoCobFechaFin).html("")
            if ((periodoCobFechaFin.value < fechaTermino.value) && periodoCobFechaFin.value != "") {
                $(errorperiodoCobFechaFin).html("Debe estar vigente durante el periodo")
                periodoCobFechaFin.value = ""
            }
        })

        //noSerieVehiculo.addEventListener('change',this.validar_numero_caracteres)

        noSerieVehiculo.addEventListener('change', (ev) => {
            if (noSerieVehiculo.value.length != 17) {
                $(errornoSerieVehiculo).html("Deben ser 17 caracteres")
            } else {
                $(errornoSerieVehiculo).html("")
                //Permisos.prototype.peticion_repuve();
            }
        })

        noMotor.addEventListener('change', (ev) => {
            if (noMotor.value.length < 4 || noMotor.value.length > 25) {
                $(errornoMotor).html("Deben ser entre 4 y 25 caracteres")
            } else {
                $(errornoMotor).html("")
            }
        })

        /*tipoVehiculo.addEventListener('change', (ev) => {
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
        })*/

        anio.addEventListener("keydown", (ev) => {
            if (ev.keyCode != 16 && ev.keyCode != 8 && ev.keyCode != 9) {
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_numericos(ev.key, 1);
                if (!resultado.resp) {
                    ev.preventDefault();
                }
            }
        })

        anio.addEventListener("change", (ev) => {
            let elementError = document.getElementById("error" + ev.target.id)
            elementError.innerHTML = ''

            if(anio.value>'2022'){
                elementError.innerHTML = 'Información no valida'
                return
            }

            this.validaciones = new VALIDACIONES();
            let resultado = this.validaciones.caracteres_validos_numericos(ev.target.value, 1);
            if (!resultado.resp) {
                elementError.innerHTML = 'Información no valida'
            }
        })

    }
    validar_rfc(ev) {
        if (ev.target.value != '') {
            $.ajax({
                url: base_url_rest + 'empresas/rfc/'+ ev.target.value,
                type: 'GET',
                dataType: 'json',
                global: false,
                headers: {"Authorization": 'Bearer '+_token},
                beforeSend: function () {
                    idempresa.value = 0
                },
                success: function (response) {
                    if (response.data != null) {
                        idempresa.value = response.data.id_empresa
                        errorempresa.innerHTML = ''
                        clavePatronal.setAttribute("disabled", true)
                        empresa.setAttribute("disabled", true)
                        if(response.data.siglas != null){
                            empresa.value = response.data.nombre 
                        }else{
                            empresa.value = response.data.siglas
                        }
                    }else{
                        clavePatronal.removeAttribute("disabled")
                        empresa.removeAttribute("disabled")
                    }
                }
            }).fail(function (response) {
                if (response.responseText == "Sesion") {
                    error_sesion();
                }
            });
        }
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
        $(errortipoSeguro).html("")
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
        divCURP.style.display = ''
        divAnadir.style.display = ''
        divDocumentacionAdicional.style.display = ''
        divSubirAdicional.style.display = ''
        errorcurp.innerHTML = ''

        if (nacionalidad.value == 1) {
            //divCURP.style.display = ""
            $(tipoIdentificacion).data("nacional", 1)
            curpMexicana.style.display = ""
        } else {
            //divCURP.style.display = "none"
            $(tipoIdentificacion).data("nacional", 0)
            curpMexicana.style.display = "none"
            if(tipoEmpleado.value == 1){
                curpMexicana.style.display = ""
            }
        }
    

        /*if(nacionalidad.value == 2 && tipoEmpleado.value == 1){
            divCURP.style.display = ''
        }*/

        /*if(nacionalidad.value == 2 && tipoEmpleado.value == 4){
            divCURP.style.display = ''
        }*/

        if(nacionalidad.value == 2 && tipoEmpleado.value == 4){
            divEntidad.style.display = 'none'
        }

        if ((tipoEmpleado.value == 1 || tipoEmpleado.value == 6 || tipoEmpleado.value == 7) || tipoEmpleado.value == '') {
            divEmpresa.style.display = "none"
            divClavePatronal.style.display = "none"
            divRfc.style.display = "none"
            /*divNoIssste.style.display = 'none'
            if(tipoEmpleado.value == 1){    
                divNoSeguroSocial.style.display = ""
            }else{    
                divNoSeguroSocial.style.display = "none"
            }*/
        } else {
            divEmpresa.style.display = ""
            divClavePatronal.style.display = ""
            divRfc.style.display = ""
        }

        if (tipoEmpleado.value == 5) {
            if (nacionalidad.value == 1) {
                divEntidad.style.display = ""
                divClavePatronal.style.display = ""
                divRfc.style.display = ""
                /*divNoSeguroSocial.style.display = "none"
                divNoIssste.style.display = ""
                divNoSeguro.style.display = "none"
                divAseguradora.style.display = "none"*/
            } else if (nacionalidad.value == 2) {
                divEntidad.style.display = "none"
                divClavePatronal.style.display = ""
                divRfc.style.display = ""
                /*divNoSeguroSocial.style.display = "none"
                divNoIssste.style.display = ""
                divNoSeguro.style.display = "none"
                divAseguradora.style.display = "none"*/
            } else {
                divEntidad.style.display = "none"
                divClavePatronal.style.display = "none"
                divRfc.style.display = "none"
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
            divRfc.style.display = ""
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
            divDocumentacionAdicional.style.display = ""
            divSubirAdicional.style.display = ""
        } else {
            divEmpresa.style.display = "none"
            divClavePatronal.style.display = "none"
            divRfc.style.display = "none"

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

        if (tipoEmpleado.value != '' && tipoEmpleado.value != 1 && nacionalidad.value == 2){
            nombre.removeAttribute("disabled")
            primerApellido.removeAttribute("disabled")
            segundoApellido.removeAttribute("disabled")
        }else{
            nombre.setAttribute("disabled", true)
            primerApellido.setAttribute("disabled", true)
            segundoApellido.setAttribute("disabled", true)
        }

    }
    /*validar_clave_patronal(ev) {
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
    }*/
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
        if(ev.target.value != ""){
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
                        nombre.value = ""
                        primerApellido.value = ""
                        segundoApellido.value = ""
                        numtelefono.value = ""
                        correo.value = ""
                        aseguradoras.value = ""
                        numSeguroSocial.value = ""
                        noIssste.value = ""
                        noSeguro.value = ""
                        noLicencia.value = ""
                        fechaVenciminetoLic.value = ""
                        tipoIdentificacion.value = ""
                        claveElector.value = ""
                        noPasaporte.value = ""
                        libretaMar.value = ""
                        itinerario.value = ""
                        fechaVenciminetoIdent.value = ""
                        fotoLicencia = ""
                        fotoPersona = ""
                        fotoIdentificacion = ""
                        
                        idpersona.value = 0
                        idcontacto.value = 0

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
    
                        $("#errorSubirIdentificacion").html("");			 
                        $("#errorSubirPersonal").html("");			
                        $("#errorSubirLicencia").html("");

                        documentosAdicionales = []
                        documentosAdicionalesEliminar = []
                        DTDocAdicionales.clear().draw()
                        errorEstructuraCURP = false
                        errorEstructuraCorreo = false
                        errorEstructuraINEIFE = false
                        errorEstructuraPasaporte = false
                        errorEstructuraNSS = false
                    },
                    success: function (response) {
                        
                        if (response.data != null) {
                            divFechaVencimiento.style.display = ""
                            divSubirDocumento.style.display = ""
                            divSubirfoto.style.display = ""
                            //id_persona_rest.value = 0
                            idpersona.value = response.data.id
                            idcontacto.value = (response.data.id_contacto == null ? 0 : response.data.id_contacto)

                            if (nacionalidad.value == 2) {
                                if(response.data.nombre != ''){
                                    nombre.disabled = true
                                    primerApellido.disabled = true
                                    segundoApellido.disabled = true
                                }
                            }

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
                                divNoSeguro.style.display = 'none'
                                divAseguradora.style.display = 'none'
                                divNoSeguroSocial.style.display = 'none'
                                errornoIssste.innerHTML = ''
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
                                    errornumPasaporte.innerHTML = ""

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
                                    fechaVenciminetoIdent.value = response.data.fecha_expiracion_identificacion
                                    break;
                                case 4:
                                    divClaveElector.style.display = "none"
                                    divPasaporte.style.display = ""
                                    divLibretaMar.style.display = "none"
                                    divItinerario.style.display = "none"
                                    noPasaporte.value = response.data.numero_identificacion
                                    fechaVenciminetoIdent.value = response.data.fecha_expiracion_identificacion
                                    break;
                                case 5:
                                    divClaveElector.style.display = "none"
                                    divPasaporte.style.display = "none"
                                    divLibretaMar.style.display = "none"
                                    divItinerario.style.display = ""
                                    itinerario.value = response.data.numero_identificacion
                                    fechaVenciminetoIdent.value = response.data.fecha_expiracion_identificacion
                                    break;
                            }

                            $(errornombre).html("")
                            $(errorprimerApellido).html("")
                            $(errornumtelefono).html("")
                            $(errorcorreo).html("")
                            $(errornumSeguroSocial).html("")
                            $(errortipoIdentificacion).html("")
                            errortipoSeguro.innerHTML = ""
                            
                            var temp = response.data.fotografia_identificacion;
                            var archivo = temp;
                            var arc = temp.split("/");temp = arc[4];
                            var txt = "<input type='hidden' id='val_identificacion' value ='"+temp+"' data-id='"+response.data.id_imagen_identificacion+"'>";  
                            $("#errorSubirIdentificacion").html("<span class='color:#000'><a href='/"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
                            
                            var temp = response.data.fotografia_persona;
                            var archivo = temp;
                            var arc = temp.split("/");temp = arc[4];
                            var txt = "<input type='hidden' id='val_personal' value ='"+temp+"' data-id='"+response.data.id_imagen_persona+"'>";  
                            $("#errorSubirPersonal").html("<span class='color:#000'><a href='/"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
                            
                            var temp = response.data.fotografia_licencia;
                            if (temp != null){
                                var archivo = temp;
                                var arc = temp.split("/");temp = arc[4]; 
                                var txt = "<input type='hidden' id='val_licencia' value ='"+temp+"' data-id='"+response.data.id_imagen_licencia+"'>"; 
                                $("#errorSubirLicencia").html("<span class='color:#000'><a href='/"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);
                            }

                            response.data.documentos_adicionales.forEach(function (element, index) {
                                DTDocAdicionales.row.add([
                                    '<center><a href="'+base_url+element.link+element.nombre+'" target="_blank" style="font-size: 18px;">Visualizar archivo</a></center>',
                                    '<div class="d-flex justify-content-center" >' +
                                        '<div class="p-1">' +
                                            '<a href="#!" title="Eliminar">' +
                                                '<span class="glyphicon glyphicon-trash eliminar" data-id="' + index + '" data-idimagen="'+element.id+'" data-nombre="'+element.nombre+'"></span>' +
                                            '</a>' +
                                        '</div>' +
                                    '</div>'
                                ]).draw(false)
                            });
                        }else{
                            chofer.checked = false
                            divLicencia.style.display = 'none'
                            divAseguradora.style.display = 'none'
                            divNoSeguroSocial.style.display = 'none'
                            divNoIssste.style.display = 'none'
                            divNoSeguro.style.display = 'none'
                            divClaveElector.style.display = 'none'
                            divPasaporte.style.display = 'none'
                            divLibretaMar.style.display = 'none'
                            divItinerario.style.display = 'none'
                            tipoSeguro.value = ""
                            tipoIdentificacion.value = ""
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
                                }else if(nombre.value == ''){
                                    errorcurp.innerHTML = "Información no encontrada"
                                    nombre.disabled = false
                                    primerApellido.disabled = false
                                    segundoApellido.disabled = false
                                    curp.value = ""
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
    /*validar_noserie_equipo(ev) {

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
					$("#errorSubirFacturaEquipo").html("");
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
						
						var temp = response.data.factura_equipo;
						var archivo = temp;
						var arc = temp.split("/");temp = arc[4];
						var txt = "<input type='hidden' id='val_equipo' value ='"+temp+"'>";  
						$("#errorSubirFacturaEquipo").html("<span class='color:#000'><a href='/"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
						

                    }
                },

            }).fail(function (response) {
                if (response.responseText == "Sesion") {
                    error_sesion();
                }
            });

        }
    }*/
    previsualizar_licencia() {
        var fileReader = new FileReader();
        //pdfViewerLicencia.innerHTML = ''
        erroradjuntarLicencia.innerHTML = ''

        var extencion = $(this)[0].files[0].name;//
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
        //pdfViewerIdentificacion.innerHTML = ''
        erroradjuntarIdentificacion.innerHTML = ''

        var extencion = $(this)[0].files[0].name;
        if (extencion != '') {
            extencion = extencion.split(".");
            extencion = extencion[extencion.length - 1];
        }

        var permitidos = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];
        if (!permitidos.includes($(this)[0].files[0].type) || extencion == 'jfif') {
            erroradjuntarIdentificacion.innerHTML = "El archivo a subir debe ser un documento en imagen en PDF o imagen PNG o JPG"
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
        //pdfViewerPersonal.innerHTML = ''
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

        /*var fileReader = new FileReader();
        //pdfViewerLicencia.innerHTML = ''
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
        }*/
    }
    previsualizar_modificar_identificacionPersona(fotoIdentificacion) {

        var fileReader = new FileReader();
        //pdfViewerIdentificacion.innerHTML = ''
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
        //pdfViewerPersonal.innerHTML = ''
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
        //pdfViewerEquipo.innerHTML = ''
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
    previsualizar_equipo_anexo() {
        var fileReader = new FileReader();
        //pdfViewerEquipo.innerHTML = ''
        erroradjuntarEquipoAnexo.innerHTML = ''

        var extencion = $(this)[0].files[0].name;
        if (extencion != '') {
            extencion = extencion.split(".");
            extencion = extencion[extencion.length - 1];
        }

        var permitidos = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];
        if (!permitidos.includes($(this)[0].files[0].type) || extencion == 'jfif') {
            erroradjuntarEquipoAnexo.innerHTML = "El archivo a subir debe ser un documento en PDF o imagen PNG o JPG"
            return false;
        }

        if (($(this)[0].files[0].size / 1000000) > 5) {
            erroradjuntarEquipoAnexo.innerHTML = "El tamaño máximo permitido es de 5 MB"
            return false;
        }
        var tipoarchivo = $(this)[0].files[0].type
        fileReader.onload = function () {
            var TheFileContents = fileReader.result;
            if (tipoarchivo == 'application/pdf') {
                $(pdfViewerEquipoAnexo).html('<object> <embed src="' + TheFileContents + '" width="100%" height="300px"/></object>');
            } else {
                $(pdfViewerEquipoAnexo).html('<img width="460" height="200" src="' + TheFileContents + '"/>');
            }
        };
        fileReader.readAsDataURL($(this)[0].files[0]);

        btnAceptarAdjuntarEquipoAnexo.onclick = function () {
            if (fileReader != "") {
                $(errorSubirEquipoAnexo).html("")
            }
        }
    }
    previsualizar_equipo_rf() {
        var fileReader = new FileReader();
        //pdfViewerEquipo.innerHTML = ''
        erroradjuntarEquipoRF.innerHTML = ''

        var extencion = $(this)[0].files[0].name;
        if (extencion != '') {
            extencion = extencion.split(".");
            extencion = extencion[extencion.length - 1];
        }

        var permitidos = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];
        if (!permitidos.includes($(this)[0].files[0].type) || extencion == 'jfif') {
            erroradjuntarEquipoRF.innerHTML = "El archivo a subir debe ser un documento en PDF o imagen PNG o JPG"
            return false;
        }

        if (($(this)[0].files[0].size / 1000000) > 5) {
            erroradjuntarEquipoRF.innerHTML = "El tamaño máximo permitido es de 5 MB"
            return false;
        }
        var tipoarchivo = $(this)[0].files[0].type
        fileReader.onload = function () {
            var TheFileContents = fileReader.result;
            if (tipoarchivo == 'application/pdf') {
                $(pdfViewerEquipoRF).html('<object> <embed src="' + TheFileContents + '" width="100%" height="300px"/></object>');
            } else {
                $(pdfViewerEquipoRF).html('<img width="460" height="200" src="' + TheFileContents + '"/>');
            }
        };
        fileReader.readAsDataURL($(this)[0].files[0]);

        btnAceptarAdjuntarEquipoRF.onclick = function () {
            if (fileReader != "") {
                $(errorSubirEquipoRF).html("")
            }
        }
    }
    previsualizar_material() {
        var fileReader = new FileReader();
        //pdfViewerEquipo.innerHTML = ''
        erroradjuntarMaterial.innerHTML = ''

        var extencion = $(this)[0].files[0].name;
        if (extencion != '') {
            extencion = extencion.split(".");
            extencion = extencion[extencion.length - 1];
        }

        var permitidos = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];
        if (!permitidos.includes($(this)[0].files[0].type) || extencion == 'jfif') {
            erroradjuntarMaterial.innerHTML = "El archivo a subir debe ser un documento en PDF o imagen PNG o JPG"
            return false;
        }

        if (($(this)[0].files[0].size / 1000000) > 5) {
            erroradjuntarMaterial.innerHTML = "El tamaño máximo permitido es de 5 MB"
            return false;
        }
        var tipoarchivo = $(this)[0].files[0].type
        fileReader.onload = function () {
            var TheFileContents = fileReader.result;
            if (tipoarchivo == 'application/pdf') {
                $(pdfViewerMaterial).html('<object> <embed src="' + TheFileContents + '" width="100%" height="300px"/></object>');
            } else {
                $(pdfViewerMaterial).html('<img width="460" height="200" src="' + TheFileContents + '"/>');
            }
        };
        fileReader.readAsDataURL($(this)[0].files[0]);

        btnAceptarAdjuntarMaterial.onclick = function () {
            if (fileReader != "") {
                $(errorSubirMaterial).html("")
            }
        }
    }
    previsualizar_modificar_equipo_rf(fotoEquipoRF) {

        var fileReader = new FileReader();
        //pdfViewerEquipo.innerHTML = ''
        erroradjuntarEquipoRF.innerHTML = ''

        fileReader.onload = function () {
            var TheFileContents = fileReader.result;
            $(pdfViewerEquipoRF).html('<img width="460" height="200" src="' + TheFileContents + '"/>');
        };
        fileReader.readAsDataURL(fotoEquipoRF);

        btnAceptarAdjuntarEquipoRF.onclick = function () {
            if (fileReader != "") {
                $(errorSubirEquipoRF).html("")
            }
        }
    }
    previsualizar_modificar_material(fotoMaterial) {

        var fileReader = new FileReader();
        //pdfViewerEquipo.innerHTML = ''
        erroradjuntarMaterial.innerHTML = ''

        fileReader.onload = function () {
            var TheFileContents = fileReader.result;
            $(pdfViewerMaterial).html('<img width="460" height="200" src="' + TheFileContents + '"/>');
        };
        fileReader.readAsDataURL(fotoMaterial);

        btnAceptarAdjuntarMaterial.onclick = function () {
            if (fileReader != "") {
                $(errorSubirMaterial).html("")
            }
        }
    }
    previsualizar_modificar_equipo_anexo(fotoEquipoAnexo) {

        var fileReader = new FileReader();
        //pdfViewerEquipo.innerHTML = ''
        erroradjuntarEquipoAnexo.innerHTML = ''

        fileReader.onload = function () {
            var TheFileContents = fileReader.result;
            $(pdfViewerEquipoAnexo).html('<img width="460" height="200" src="' + TheFileContents + '"/>');
        };
        fileReader.readAsDataURL(fotoEquipoAnexo);

        btnAceptarAdjuntarEquipoAnexo.onclick = function () {
            if (fileReader != "") {
                $(errorSubirEquipoAnexo).html("")
            }
        }
    }
    previsualizar_modificar_equipo(fotoFacturaEquipo) {

        var fileReader = new FileReader();
        //pdfViewerEquipo.innerHTML = ''
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
    /*previsualizar_vehiculo_factura() {
        var fileReader = new FileReader();
        //pdfViewerVehiculoFactura.innerHTML = ''
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
    }*/
    /*previsualizar_modificar_facturaVehiculo(fotoFacturaVehiculo) {

        var fileReader = new FileReader();
        //pdfViewerVehiculoFactura.innerHTML = ''
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
    }*/
    previsualizar_vehiculo(ev) {
        var fileReader = new FileReader();
        //pdfViewerVehiculo.innerHTML = ''
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
            $(btnAceptarAdjuntarVechiculo).hide();
        } else {
            $(btnSiguienteAdjuntarVehiculo).show();
        }
    }
    previsualizar_modificar_lateralVehiculo(fotoLateralVehiculo) {

        var fileReader = new FileReader();
        //pdfViewerVehiculo.innerHTML = ''
        errorFotografiasVehiculos.innerHTML = ''

        //$(btnSiguienteAdjuntarVehiculo).show();

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
    /*previsualizar_modificar_placaVehiculo(fotoPlacaVehiculo) {

        //3 lineas a prueba
        //$(pdfViewerVehiculo).html("");
        $(fotografiaLateral).hide();
        $(fotografiaPlaca).removeAttr("style");
        //$(btnSiguienteAdjuntarVehiculo).hide();
        //$(btnAceptarAdjuntarVechiculo).show();

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
    }*/
    obtener_info_pase(){
        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/getInfoDuplicar',
            type: 'GET',
            dataType: 'json',
            data: {
                idPermiso: id_permiso
            },
            success: function (response) {
                if (response.data != "") {

                    let mensajeFechas = ''

                    let per = 0
                    let equ = 0
                    let mat = 0
                    let veh = 0
    
                    //General
                    if (response.data.info.data != "") {
    
                        id_empresa = response.data.info.data.id_empresa
                        id_persona_fisica = response.data.info.data.id_persona_fisica
                        id_contrato = response.data.info.data.id_contrato
    
                        tipoPermiso.value = response.data.info.data.id_tipo_permiso
                        clientetEntidad.value = response.data.info.data.visita
                        actividad.value = response.data.info.data.id_actividad
                        /*vigencia.value = response.data.info.data.id_vigencia
    
                        if(response.data.info.data.id_vigencia == 2){
                            divDias.style.display = ''
                            dias.value = response.data.info.data.dias
                        }
    
                        fechaInicio.value = response.data.info.data.fecha_inicio
                        fechaTermino.value = response.data.info.data.fecha_termino*/
    
                        recinto.value = response.data.info.data.id_tipo_recinto
                        
                        if(response.data.info.data.id_recinto_fiscalizado != null){
                            $.ajax({
                                url: base_url + 'Catalogos/Ctrl_Recintos_Fiscalizados/getFilteridRecinto',
                                type: 'GET',
                                dataType: 'json',
                                data: {
                                    estatus: 1,
                                    recinto: response.data.info.data.id_tipo_recinto
                                },
                                beforeSend: function () {
                                    $(nombreRecinto).html('');
                                    $(nombreRecinto).append('<option value="">Seleccione</option>');
                                },
                                success: function (response) {
                                    response.data.forEach(element => {
                                        $(nombreRecinto).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                                    });
                                },
                                complete: function(){
                                    divRecinto.style.display = ''
                                    nombreRecinto.value = response.data.info.data.id_recinto_fiscalizado
                                }
                            }).fail(function (response) {
            
                            });
                        }
    
                        motivo.value = response.data.info.data.motivo
    
                        if(response.data.info.data.permiso_grupal != 0){
                            permisoGrupal.checked = true
                            divCURPResp.style.display = ''
                            curpResponsable.value = response.data.info.data.curp_responsable
                        }
                    }
    
                    //Personas
    
                    if(response.data.personal.data != ""){

                        let con_actu = 0
                        let color = ''

                        btnGuardar.disabled = false
                        response.data.personal.data.forEach( function(element, index) {
                            documentosAdicionalesAux = []
                            documentosAdicionales = []
                            let info
                            response.data.personal.adicional[index].data.forEach(elements => {
                                if(elements.id_adicional != null){
                                    
                                    info = {
                                        idimagen: elements.id_adicional,
                                        fotografia: elements.adicional_fotografia
                                    }

                                    documentosAdicionalesAux.push(info)
                                }
                            })

                            let datos = {
                                idempresa: element.id_personal_pase_empresa,
                                idpersona: element.id,
                                id_personal_rest: element.id_personal_rest,
                                idcontacto: element.id_contacto,
                                tipoEmpleado: element.id_tipo_empleado,
                                nacionalidad: element.id_nacionalidad,
                                entidadGobierno: element.id_tipo_entidad_gobierno,
                                empresa: element.nombre_personal_pase_empresa,
                                clavePatronal: element.clave_personal_pase_empresa,
                                rfc: empresa_rfc.value,
                                tipoSeguro: element.id_tipo_seguro,
                                numSeguroSocial: (element.id_tipo_seguro == 1 ? element.nss : ''),
                                noIssste: (element.id_tipo_seguro == 2 ? element.nss : ''),
                                noSeguro: (element.id_tipo_seguro == 3 ? element.nss : ''),
                                aseguradora: element.id_tipo_aseguradora,
                                curp: element.curp,
                                nombre: element.nombre,
                                primerApellido: element.primer_apellido,
                                segundoApellido: element.segundo_apellido,
                                numtelefono: element.telefono,
                                correo: element.correo,
                                chofer: (element.licencia_numero != null ? 1 : 0),
                                noLicencia: element.licencia_numero,
                                fechaVenciminetoIdent: element.identificacion_fecha_expedicion,
                                tipoIdentificacion: element.identificacion_id_tipo,
                                claveElector: ((element.identificacion_id_tipo == 7 || element.identificacion_id_tipo == 8) ? element.identificacion_numero : ''),
                                noPasaporte: (element.identificacion_id_tipo == 2 ? element.identificacion_numero : ''),
                                libretaMar: (element.identificacion_id_tipo == 3 ? element.identificacion_numero : ''),
                                itinerario: (element.identificacion_id_tipo == 5 ? element.identificacion_numero : ''),
                                fechaVenciminetoLic: element.licencia_fecha_expiracion,
                                fotografiaLicencia: element.licencia_fotografia,
                                fotografiaIdentificacion: element.identificacion_fotografia,
                                fotografiapersona: element.personal_fotografia,

                                fotografiasAdicionales: documentosAdicionales,
                                idseliminar: '',

                                tablafotografias: documentosAdicionalesAux,

                                opcion: 1,
                            }
                            
                            color = '#393C3E'

                            if(datos.fechaVenciminetoLic < actual || datos.fechaVenciminetoIdent < actual){
                                con_actu++
                                let datos = {
                                    'nombre' : element.nombre + ' ' + element.primer_apellido + ' ' + element.segundo_apellido + ''
                                }
                                actualizarDatosPersonas.push(datos)
                                color = '#9D2449'
                                if(con_actu == 1){
                                    mensajeFechas += 'Se requiere actualizar la informacion de las siguientes personas:<br>'
                                }
                                if(con_actu == 21){
                                    mensajeFechas += '<br>....<br><br> Resaltados en rojo en pestaña de personas'
                                }
                                if(con_actu < 21){
                                    mensajeFechas += '<br>' + element.nombre + ' ' + element.primer_apellido + ' ' + element.segundo_apellido + ''
                                }
                            }

                            documentosAdicionales = []
                            documentosAdicionalesAux = []
    
                            datosPersonal.push(datos)
    
                            DTPersonal.row.add([
                                '<center style="color: '+color+' !important">' + element.tipo_empleado + '</center>',
                                '<center style="color: '+color+' !important">' + datos.nombre + ' ' + datos.primerApellido + ' ' + datos.segundoApellido + '</center>',
                                '<center style="color: '+color+' !important">' + element.nacionalidad + '</center>',
                                '<div class="d-flex justify-content-center" >' +
                                '<div class="p-1">' +
                                '<a href="#!" title="Modificar">' +
                                '<span class="glyphicon glyphicon-pencil modificar-persona" style="color: '+color+' !important" data-idIndexTBLModPersonas="' + per + '"></span' +
                                '</a>' +
                                '</div>' +
                                '<div class="p-1">' +
                                '<a href="#!" title="Eliminar">' +
                                '<span class="glyphicon glyphicon-trash eliminar" style="color: '+color+' !important" data-idIndexTBLDelPersonas="' + per + '"></span' +
                                '</a>' +
                                '</div>' +
                                '</div>'
                            ]).draw(false)

                            per++
                        });

                        mensajeFechas += '<br><br>'
                    }

                    Permisos.prototype.obtener_personal()
    
                    //Equipos
    
                    if (response.data.equipo.data != "") {
                        response.data.equipo.data.forEach(element => {
                            let select = $('*[data-idpersonaequipo='+element.id+']');

                            let datos = {
                                idequipo: element.id,
                                tipoEquipo: element.id_tipo_equipo,
                                modelo: element.modelo,
                                marca: element.marca,
                                noSerie: element.numero_serie,
                                tipoDocumento: element.id_tipo_documento,
                                noFactura: element.numero_factura,
                                resguardo: 0,
                                idimagenfactura: element.id_imagen_factura,
                                fotografiaFactura: element.factura_equipo,
                                idimagenAnexo: element.id_imagen_anexo,
                                fotografiaAnexo: element.equipo_anexo,
                                idimagenRF: element.id_imagen_rf,
                                fotografiaRF: element.equipo_rf,
                                anexo29: anexo29.value,
                                descripcionEquipo : descripcionEquipo.value,
                                opcion: 1,
                            } 
                
                            datosEquipos.push(datos)
                            
                            DTEquipo.row.add([
                                '<center>' + element.tipo_equipo + '</center>',
                                '<center>' + element.modelo + '</center>',
                                '<center>' + element.marca + '</center>',
                                '<center>' + element.numero_serie + '</center>',
                                '<div class="d-flex justify-content-center" >' +
                                '<div class="p-1">' +
                                '<a href="#!" title="Modificar">' +
                                '<span class="glyphicon glyphicon-pencil modificar-equipo" data-idIndexTBLModEquipos="' + equ + '"></span' +
                                '</a>' +
                                '</div>' +
                                '<div class="p-1">' +
                                '<a href="#!" title="Eliminar">' +
                                '<span class="glyphicon glyphicon-trash eliminar" data-idIndexTBLDelEquipo="' + equ+ '"></span>' +
                                '</a>' +
                                '</div>' +
                                '</div>'
                            ]).draw(false)

                            equ ++
                        });
                    }
    
                    //Materiales
    
                    if (response.data.material.data != "") {
                        response.data.material.data.detail.forEach(element => {
                            let select = $('*[data-idpersonamaterial='+response.data.material.data.info.id_responsable+']');

                            let datos = {
                                responsable: 0,
                                tipomaterial: element.id_tipo_material,
                                tipomedida: element.id_tipo_medida,
                                cantidad: element.cantidad,
                                descripcion: element.descripcion,
                                idimagen: 0,
                                fotografiaMaterial: element.material_fotografia,
                                opcion: 1,
                            }
    
                            datosMaterial.push(datos)
                            
                            DTMaterial.row.add([
                                '<center>' + element.tipo_material + '</center>',
                                '<center>' + element.cantidad + '</center>',
                                '<center>' + element.tipo_medida + '</center>',
                                '<center>' + element.descripcion + '</center>',
                                '<div class="d-flex justify-content-center" >' +
                                '<div class="p-1">' +
                                '<a href="#!" title="Modificar">' +
                                '<span class="glyphicon glyphicon-pencil modificar-material" data-idIndexTBLModMaterial="' + mat + '"></span' +
                                '</a>' +
                                '</div>' +
                                '<div class="p-1">' +
                                '<a href="#!" title="Eliminar">' +
                                '<span class="glyphicon glyphicon-trash eliminar" data-idIndexTBLDelMaterial="' + mat + '"></span>' +
                                '</a>' +
                                '</div>' +
                                '</div>'
                            ]).draw(false)

                            mat ++
                        });
                    }
    
                    //Vehiculos
    
                    if (response.data.vehiculo.data != "") {

                        let con_actu = 0
                        let color = ''

                        response.data.vehiculo.data.forEach(element => {
                            let datos = {
                                idvehiculo: element.id,
                                noPlaca: (element.empresa_numero_placa != null ? element.empresa_numero_placa : ''),
                                noSerie: element.numero_serie,
                                noMotor: (element.empresa_numero_motor != null ? element.empresa_numero_motor : element.numero_motor),
                                marca: (element.empresa_numero_motor != null ? element.empresa_numero_motor : element.numero_motor),
                                modelo: element.modelo,
                                anio: element.anio,
                                color:(element.empresa_color != null ? element.empresa_color : element.color),
                                tipoVehiculo: element.id_tipo_vehiculo,
                                tipoTarCircu: (element.empresa_id_tipo_tarjeta_circulacion != null ? element.empresa_id_tipo_tarjeta_circulacion : element.id_tipo_aseguradora),
                                noTarjeta: (element.empresa_numero_tarjeta_circulacion != null ? element.empresa_numero_tarjeta_circulacion : element.numero_poliza),
                                aseguradora: (element.empresa_id_tipo_aseguradora != null ? element.empresa_id_tipo_aseguradora : element.id_tipo_aseguradora),
                                noPoliza: (element.empresa_numero_poliza != null ? element.empresa_numero_poliza : element.numero_poliza),
                                vigenciaPoliza: (element.empresa_vigencia_poliza != null ? element.empresa_vigencia_poliza : element.vigencia_poliza),
                                periodoPago: (element.empresa_id_tipo_periodo != null ? element.empresa_id_tipo_periodo : element.id_tipo_periodo),
                                periodoFechaInicio: (element.empresa_fecha_inicio_cobertura != null ? element.empresa_fecha_inicio_cobertura : element.fecha_inicio_cobertura),
                                periodoFechaFin: (element.empresa_fecha_fin_cobertura != null ? element.empresa_fecha_fin_cobertura : element.fecha_fin_cobertura),
                                idfotografiaLateral:  0,
                                fotografiaLateral: element.vehiculo_fotografia_lateral,
                                idfotografiaPlaca:  0,
                                fotografiaPlaca: element.vehiculo_fotografia_placa,
                                opcion:1,
                            }

                            color = '#393C3E'

                            if(datos.vigenciaPoliza < actual || datos.periodoFechaFin < actual){
                                con_actu++
                                let datos = {
                                    'noserie' : element.noSerie
                                }
                                actualizarDatosVehiculos.push(datos)
                                color = '#9D2449'

                                if(con_actu == 1){
                                    mensajeFechas += 'Se requiere actualizar la informacion de los siguientes vehiculos:<br>'
                                }
                                if(con_actu == 15){
                                    mensajeFechas += '<br>....<br><br> Resaltados en rojo en pestaña de vehiculos'
                                }
                                if(con_actu < 15){
                                    mensajeFechas += '<br>' + element.noSerie + ''
                                }
                            }
                            
                            datosVehiculos.push(datos)
    
                            DTVehiculo.row.add([
                                '<center style="color: '+color+' !important">' + datos.noPlaca + '</center>',
                                '<center style="color: '+color+' !important">' + datos.noSerie + '</center>',
                                '<center style="color: '+color+' !important">' + datos.marca + '</center>',
                                '<center style="color: '+color+' !important">' + datos.anio + '</center>',
                                '<center style="color: '+color+' !important">' + element.nombre + '</center>',
                                '<center style="color: '+color+' !important">' + (datos.chofer != null ? 'SI' : 'NO') + '</center>',
                                '<div class="d-flex justify-content-center" >' +
                                '<div class="p-1">' +
                                '<a href="#!" title="Modificar">' +
                                '<span class="glyphicon glyphicon-pencil modificar-vehiculo" style="color: '+color+' !important" data-idIndexTBLModVehiculos="' + veh + '"></span' +
                                '</a>' +
                                '</div>' +
                                '<div class="p-1">' +
                                '<a href="#!" title="Eliminar">' +
                                '<span class="glyphicon glyphicon-trash eliminar" style="color: '+color+' !important" data-idIndexTBLDelVehiculo="' + veh + '"></span>' +
                                '</a>' +
                                '</div>' +
                                '</div>'
                            ]).draw(false)

                            veh++
                        });
                    }

                    if((actualizarDatosPersonas.length > 0 && actualizarDatosPersonas.length < 20) || (actualizarDatosVehiculos.length > 0 && actualizarDatosPersonas.length < 15)){
                        peticion_fallida(mensajeFechas)
                    }
                }
            }
        }).fail(function (response) {
    
        });
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
                    if (($(tipoIdentificacion).data('nacional') == '1' && element.sistema == 1)) {
                        if (element.id != 1)
                            $(tipoIdentificacion).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                    }
                    if (($(tipoIdentificacion).data('nacional') == '0' && (element.sistema == 2 || element.id == 2))) {
                        if (element.id != 1)
                            $(tipoIdentificacion).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                    }
                });
            }
        }).fail(function (response) {

        });
    }
    obtener_tipos_identificacion_modificar(data) {
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
                    if (($(tipoIdentificacion).data('nacional') == '1' && element.sistema == 1)) {
                        if (element.id != 1)
                            $(tipoIdentificacion).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                    }
                    if (($(tipoIdentificacion).data('nacional') == '0' && (element.sistema == 2 || element.id == 2))) {
                        if (element.id != 1)
                            $(tipoIdentificacion).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                    }
                });
            },
            complete: function () {
                tipoIdentificacion.value = data.tipoIdentificacion
                fechaVenciminetoIdent.value = data.fechaVenciminetoIdent
                fotoIdentificacion = data.fotografiaIdentificacion
                btnSubirIdentificacion.value = "Actualizar identificación"
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
                /*$(tipodocumentoVeh).append('<option value="">Seleccione</option>');*/
            },
            success: function (response) {
                response.data.forEach(element => {
                    if (element.id == 3 || element.id == 4) {
                        $(tipoDocumento).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                        /*$(tipodocumentoVeh).append('<option value="' + element.id + '">' + element.nombre + '</option>');*/
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
        //$(selChofer).html('');
        $(resguardo).html('');
        $(responsableMaterial).html('');
        //$(selChofer).append('<option value="">Seleccione</option>');
        $(resguardo).append('<option value="">Seleccione</option>');
        $(responsableMaterial).append('<option value="">Seleccione</option>');
        let length = 0
        datosPersonal.forEach(element => {
            if(element.opcion != 3){
                length++
            }
        });
        for (let index = 0; index < datosPersonal.length; index++) {
            let selection = ''
            if (length == 1) {
                selection = 'Selected'
                resguardo.disabled = true
                responsableMaterial.disabled = true
            } else {
                resguardo.disabled = false
                responsableMaterial.disabled = false
            }
            if(datosPersonal[index].opcion != 3){
                $(resguardo).append('<option value="' + index + '"' + selection + ' data-idpersonaequipo="'+datosPersonal[index].idpersona+'">' + datosPersonal[index].nombre + ' ' + datosPersonal[index].primerApellido + ' ' + datosPersonal[index].segundoApellido + '</option>');
                $(responsableMaterial).append('<option value="' + index + '"' + selection + ' data-idpersonamaterial="'+datosPersonal[index].idpersona+'">' + datosPersonal[index].nombre + ' ' + datosPersonal[index].primerApellido + ' ' + datosPersonal[index].segundoApellido + '</option>');
            }
            /*if (datosPersonal[index].chofer == 1) {
                choferes++
                if (choferes == 1) {
                    selection = 'Selected'
                    selChofer.disabled = true
                } else {
                    selChofer.disabled = false
                }
                $(selChofer).append('<option value="' + index + '"' + selection + '>' + datosPersonal[index].nombre + ' ' + datosPersonal[index].primerApellido + ' ' + datosPersonal[index].segundoApellido + '</option>');
            }*/
        }
    }

    //PLACA / NUMERO DE SERIE / EMPRESA
    peticion_vehiculo(ev){
        $.ajax({
            url: base_url_rest+'vehiculos/placa/'+id_empresa+'/'+noPlaca.value,
            type: 'GET',
            dataType: 'json',
            global: false,
           /* data: {
                estatus : 1
            },*/
            beforeSend: function () {
                idvehiculo.value = 0
                //adjuntarVehiculoFactura.dataset.imagen = ""
                //adjuntarVehiculoFactura.dataset.id = ""
                ajuntarLateralVehiculo.dataset.imagen = ""
                ajuntarLateralVehiculo.dataset.id = ""
                adjuntarPlacaVehiculo.dataset.imagen = ""
                adjuntarPlacaVehiculo.dataset.id = ""
				$("#errorSubirFotoPla").html("");
				$("#errorSubirFotoLat").html("");
				//$("#errorSubirFacturaVehiculo").html("");

                //$(marcaVehiculo).attr("class","reiniciar-vehiculo lectura")
                //$(modeloVehicuo).attr("class","reiniciar-vehiculo lectura")
                //$(anio).attr("class","reiniciar-vehiculo lectura")
                //$(color).attr("class","reiniciar-vehiculo lectura")

                //$(marcaVehiculo).attr("disabled","true")
                //$(modeloVehicuo).attr("disabled","true")
                //$(anio).attr("disabled","true")
                //$(color).attr("disabled","true")
            },
            success: function (response) {
                if (response.data != null) {
                    let vehiculo = response.data['vehiculo']
                    let imagenes = response.data['imagenes']

                    if(vehiculo[0].placa != '' && noPlaca.value == ''){
                        noPlaca.value = vehiculo[0].placa;
                    }
                    noSerieVehiculo.value = vehiculo[0].numero_serie
                    marcaVehiculo.value = vehiculo[0].marca
                    modeloVehicuo.value = vehiculo[0].modelo
                    anio.value = vehiculo[0].anio
                    color.value = vehiculo[0].color

                    //noPlaca.setAttribute("class","lectura")
                    //noPlaca.setAttribute("disabled",true)
                    noSerieVehiculo.setAttribute("class","lectura")
                    noSerieVehiculo.setAttribute("disabled",true)

                    modeloVehicuo.setAttribute("class","lectura")
                    modeloVehicuo.setAttribute("disabled",true)
                    marcaVehiculo.setAttribute("class","lectura")
                    marcaVehiculo.setAttribute("disabled",true)
                    anio.setAttribute("class","lectura")
                    anio.setAttribute("disabled",true)

                    //if (response.data_interna != null) {
                        idvehiculo.value = vehiculo[0].id_vehiculo
                        noMotor.value = vehiculo[0].numero_motor
                        tipoVehiculo.value = vehiculo[0].id_tipo_vehiculo
                        tipoTarjetaCirculacion.value = vehiculo[0].id_tipo_tarjeta_circulacion
                        noTarjeta.value = vehiculo[0].numero_tarjeta_circulacion
                        //vigenciaTarjeta.value = response.data_interna.vigencia_tarjeta_circulacion
                        //tipodocumentoVeh.value = response.data_interna.id_tipo_documento
                        //noFacturaVeh.value = response.data_interna.numero_factura
                        aseguradorasVeh.value = vehiculo[0].id_tipo_aseguradora
                        noPoliza.value = vehiculo[0].numero_poliza
                        vigenciaPoliza.value = vehiculo[0].vigencia_poliza
                        periodoPago.value = vehiculo[0].id_tipo_periodo
                        periodoCobFechaInicio.value = vehiculo[0].fecha_inicio_cobertura
                        periodoCobFechaFin.value = vehiculo[0].fecha_fin_cobertura
                        //estatusVehiculo.value = response.data_interna.estatusvehiculo

                        $(errornoMotor).html("")
                        $(errortipoVehiculo).html("")
                        $(errortipoTarjetaCirculacion).html("")
                        $(errornoTarjeta).html("")
                        //$(errortipodocumentoVeh).html("")
                        $(erroraseguradorasVeh).html("")
                        $(errornoPoliza).html("")
                        $(errorperiodoPago).html("")
                        $(errorperiodoCobFechaInicio).html("")
                        $(errorperiodoCobFechaFin).html("")
                        //$(errorestatusVehiculo).html("")

                        /*adjuntarVehiculoFactura.dataset.id = (response.data_interna.id_fotografia_factura != null) ? response.data_interna.id_fotografia_factura : ""
                        adjuntarVehiculoFactura.dataset.imagen = response.data_interna.fotografia_factura
                        btnSubirFacturaVehiculo.value = "Actualizar documento"
                        $(errorSubirFacturaVehiculo).html("")*/

                        ajuntarLateralVehiculo.dataset.id = (imagenes[0].id != null) ? imagenes[0].id : ""
                        ajuntarLateralVehiculo.dataset.imagen = imagenes[0].link+imagenes[0].nombre
                        adjuntarPlacaVehiculo.dataset.id = (imagenes[1].id != null) ? imagenes[1].id : ""
                        adjuntarPlacaVehiculo.dataset.imagen = imagenes[1].link+imagenes[1].nombre
                        btnSubirVehiculo.value = "Actualizar foto"
                        $(errorSubirFotoVehiculo).html("")

                         
                        if (fechaTermino.value > vehiculo[0].vigencia_poliza) {
                            $(errorvigenciaPoliza).html("Debe estar vigente durante el periodo")
                        } else {
                            vigenciaPoliza.value = vehiculo[0].vigencia_poliza
                            $(errorvigenciaPoliza).html("")
                        }
                        
                        /*var temp = response.data_interna.fotografia_factura;var archivo = temp;var arc = temp.split("/");temp = arc[4];
                        var txt = "<input type='hidden' id='val_factura' value ='"+temp+"'>";  
                        $("#errorSubirFacturaVehiculo").html("<span class='color:#000'><a  id='tab_factura' href='/"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);	*/		
                        
                        var temp = imagenes[0].link+imagenes[0].nombre;
                        var archivo = temp;
                        var arc = temp.split("/");temp = arc[4];
                        var txt = "<input type='hidden' id='val_lateral' value ='"+temp+"'>";  
                        $("#errorSubirFotoLat").html("<span class='color:#000'><a id='tab_lateral' href='/"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
                        
                        var temp = imagenes[1].link+imagenes[1].nombre;
                        var archivo = temp;
                        var arc = temp.split("/");temp = arc[4];
                        var txt = "<input type='hidden' id='val_placa' value ='"+temp+"'>";  
                        $("#errorSubirFotoPla").html("<span class='color:#000'><a id='tab_placa' href='/"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
                        
                        
                        errorSubirFotoLat
                    //}

                    /*if(noMotor.value != ''){
                        noMotor.setAttribute("class", "lectura")
                        noMotor.setAttribute("disabled", true)
                    }*/

                    $(errornoPlaca).html("")
                    $(errornoSerieVehiculo).html("")
                }else{
                    $(noSerieVehiculo).attr("class","form-control reiniciar-vehiculo")
                    $(marcaVehiculo).attr("class","form-control reiniciar-vehiculo")
                    $(modeloVehicuo).attr("class","form-control reiniciar-vehiculo")
                    $(anio).attr("class","form-control reiniciar-vehiculo")
                    //$(color).attr("class","reiniciar-vehiculo form-control")

                    noSerieVehiculo.removeAttribute("disabled")
                    marcaVehiculo.removeAttribute("disabled")
                    modeloVehicuo.removeAttribute("disabled")
                    anio.removeAttribute("disabled")
                    //color.removeAttribute("disabled")
                }
    
            },
            /*complete: function(){
                if(localStorage.getItem("f_entidad") != ""){
                    f_entidad.value = localStorage.getItem("f_entidad")
                }
            }*/
        });
    }

    peticion_no_serie(ev){
        $.ajax({
            url: base_url_rest+'vehiculos/noserie/'+noSerieVehiculo.value,
            type: 'GET',
            dataType: 'json',
            global: false,
            beforeSend: function () {
                idvehiculo.value = 0

                //$(marcaVehiculo).attr("class","reiniciar-vehiculo lectura")
                //$(modeloVehicuo).attr("class","reiniciar-vehiculo lectura")
                //$(anio).attr("class","reiniciar-vehiculo lectura")

                //$(marcaVehiculo).attr("disabled","true")
                //$(modeloVehicuo).attr("disabled","true")
                //$(anio).attr("disabled","true")
            },
            success: function (response) {
                if (response.data != null) {

                    noSerieVehiculo.value = response.data[0].numero_serie
                    marcaVehiculo.value = response.data[0].marca
                    modeloVehicuo.value = response.data[0].modelo
                    anio.value = response.data[0].anio
                    noSerieVehiculo.setAttribute("class","lectura")
                    noSerieVehiculo.setAttribute("disabled",true)
                    idvehiculo.value = response.data[0].id_vehiculo
                        
                    $(errornoSerieVehiculo).html("")

                    modeloVehicuo.setAttribute("class","lectura")
                    modeloVehicuo.setAttribute("disabled",true)
                    marcaVehiculo.setAttribute("class","lectura")
                    marcaVehiculo.setAttribute("disabled",true)
                    anio.setAttribute("class","lectura")
                    anio.setAttribute("disabled",true)
                }else{
                    $(marcaVehiculo).attr("class","form-control reiniciar-vehiculo")
                    $(modeloVehicuo).attr("class","form-control reiniciar-vehiculo")
                    $(anio).attr("class","form-control reiniciar-vehiculo")

                    marcaVehiculo.removeAttribute("disabled")
                    modeloVehicuo.removeAttribute("disabled")
                    anio.removeAttribute("disabled")
                }
    
            },
            /*complete: function(){
                if(localStorage.getItem("f_entidad") != ""){
                    f_entidad.value = localStorage.getItem("f_entidad")
                }
            }*/
        });
    }
    
    /*peticion_repuve(ev) {

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
					$("#errorSubirFotoPla").html("");
					$("#errorSubirFotoLat").html("");
					$("#errorSubirFacturaVehiculo").html("");

                    $(marcaVehiculo).attr("class","reiniciar-vehiculo lectura")
                    $(modeloVehicuo).attr("class","reiniciar-vehiculo lectura")
                    $(anio).attr("class","reiniciar-vehiculo lectura")
                    $(color).attr("class","reiniciar-vehiculo lectura")

                    $(marcaVehiculo).attr("disabled","true")
                    $(modeloVehicuo).attr("disabled","true")
                    $(anio).attr("disabled","true")
                    $(color).attr("disabled","true")
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
                        noSerieVehiculo.setAttribute("disabled",true)

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

                             
                            if (fechaTermino.value > response.data_interna.vigencia_poliza) {
                                $(errorvigenciaPoliza).html("Debe estar vigente durante el periodo")
                            } else {
                                vigenciaPoliza.value = response.data_interna.vigencia_poliza
                                $(errorvigenciaPoliza).html("")
                            }
							
							var temp = response.data_interna.fotografia_factura;var archivo = temp;var arc = temp.split("/");temp = arc[4];
							var txt = "<input type='hidden' id='val_factura' value ='"+temp+"'>";  
							$("#errorSubirFacturaVehiculo").html("<span class='color:#000'><a  id='tab_factura' href='/"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
							
							var temp = response.data_interna.fotografia_lateral;var archivo = temp;var arc = temp.split("/");temp = arc[4];
							var txt = "<input type='hidden' id='val_lateral' value ='"+temp+"'>";  
							$("#errorSubirFotoLat").html("<span class='color:#000'><a id='tab_lateral' href='/"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
							
							var temp = response.data_interna.fotografia_placa;var archivo = temp;var arc = temp.split("/");temp = arc[4];
							var txt = "<input type='hidden' id='val_placa' value ='"+temp+"'>";  
							$("#errorSubirFotoPla").html("<span class='color:#000'><a id='tab_placa' href='/"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
							
							
							errorSubirFotoLat
                        }

                        if(noMotor.value != ''){
                            noMotor.setAttribute("class", "lectura")
                            noMotor.setAttribute("disabled", true)
                        }

                        $(errornoPlaca).html("")
                        $(errornoSerieVehiculo).html("")
                    }else{
                        $(marcaVehiculo).attr("class","reiniciar-vehiculo form-control")
                        $(modeloVehicuo).attr("class","reiniciar-vehiculo form-control")
                        $(anio).attr("class","reiniciar-vehiculo form-control")
                        $(color).attr("class","reiniciar-vehiculo form-control")

                        marcaVehiculo.removeAttribute("disabled")
                        modeloVehicuo.removeAttribute("disabled")
                        anio.removeAttribute("disabled")
                        color.removeAttribute("disabled")
                    }
                }
            }).fail(function (response) {
                if (response.responseText == "Sesion") {
                    error_sesion();
                }
            })
        }
    }*/
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
        $(errornombre).html("")
        $(errorprimerApellido).html("")
        $(errornumtelefono).html("")
        $(errornoLicencia).html("")
        $(errorfechaVenciminetoLic).html("")
        
        $(errortipoIdentificacion).html("")
        $(errorclaveElectoral).html("")
        //$(errornumPasaporte).html("")
        $(errorlibretaMar).html("")
        $(errorfechaVenciminetoIdent).html("")
        //$(errorSubirIdentificacion).html("")
        //$(errorSubirPersonal).html("")
		//$(errorSubirLicencia).html("")
		
		var varlicencia = "";

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
        if (nacionalidad.value == 1 && curp.value == "" || nacionalidad.value == 2 && tipoEmpleado.value == 1 && curp.value == "") {
            $(errorcurp).html("Campo obligatorio")
            validacion = false
        }
        if(nacionalidad.value == 2){
            if (nombre.value == "") {
                $(errornombre).html("Campo obligatorio")
                validacion = false
            }
            if (primerApellido.value == "") {
                $(errorprimerApellido).html("Campo obligatorio")
                validacion = false
            }
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

			var tmp= $("#val_licencia").val();		
			if (typeof tmp  !== "undefined"){
                varlicencia = $("#val_licencia").val();
            }else {
				$(errorSubirLicencia).html("Campo obligatorio"); validacion = false;
			} 
		
            /*if (adjuntarLicencia.value == "" && adjuntarLicencia.dataset.imagen == "" && fotoLicencia == null) {
                $(errorSubirLicencia).html("Campo obligatorio")
                validacion = false
            }*/
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
        } else if ((tipoIdentificacion.value == 2 || tipoIdentificacion.value == 4) && noPasaporte.value == "") {
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
		
		var tmp= $("#val_identificacion").val();		
		if (typeof tmp  !== "undefined"){}else {
			$(errorSubirIdentificacion).html("Campo obligatorio"); validacion = false;
		}
		
		var tmp= $("#val_personal").val();		
		if (typeof tmp  !== "undefined"){}else {
			$(errorSubirPersonal).html("Campo obligatorio"); validacion = false;
		}
        if(![1,7].includes(parseInt(tipoEmpleado.value))){
            if(clavePatronal.value == ""){
                errorclavePatronal.innerHTML = "Campo obligatorio"
                validacion = false
            }
            if(empresa.value == ""){
                errorempresa.innerHTML = "Campo obligatorio"
                validacion = false
            }
            if(empresa_rfc.value == ""){
                errorempresa_rfc.innerHTML = "Campo obligatorio"
                validacion = false
            }
        }
        /*if (tipoIdentificacion.value != "" && adjuntarIdentificacion.value == "" && adjuntarIdentificacion.dataset.imagen == "" && fotoIdentificacion == null) {
            $(errorSubirIdentificacion).html("Campo obligatorio")
            validacion = false
        }

        if (tipoIdentificacion.value != "" && adjuntarPersonal.value == "" && adjuntarPersonal.dataset.imagen == "" && fotoPersona == null) {
            $(errorSubirPersonal).html("Campo obligatorio")
            validacion = false
        }
		*/

        if(tipoIdentificacion.value == '7' || tipoIdentificacion.value == '8'){
            if(claveElector.value.length != 16 && claveElector.value.length != 18){
                $(errorclaveElectoral).html("El formato no es correcto")
                validacion = false
            }
        }

        if (!validacion || errorEstructuraCURP || errorEstructuraCorreo || errorEstructuraINEIFE || errorEstructuraPasaporte) {
              return false
        }
		 
        let datos = {
			idempresa:(empresa.value != "" ? idempresa.value : id_empresa),
            idpersona: idpersona.value,
            id_personal_rest: id_personal_rest,
            idcontacto: idcontacto.value,
            tipoEmpleado: tipoEmpleado.value,
            nacionalidad: nacionalidad.value,
            entidadGobierno: (entidadGobierno.value == '' ? 0 : entidadGobierno.value),
            empresa: empresa.value,
            clavePatronal: clavePatronal.value,
            tipoSeguro: tipoSeguro.value,
            numSeguroSocial: numSeguroSocial.value,
            noIssste: noIssste.value,
            noSeguro: noSeguro.value,
            aseguradora: (aseguradoras.value == '' ? 0 : aseguradoras.value) ,
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
            fotografiaLicencia: (typeof $("#val_licencia").val() !== 'undefined') ? val_licencia.value : '',
            fotografiaIdentificacion: (typeof $("#val_identificacion").val() !== 'undefined' ? val_identificacion.value : ''),
            fotografiapersona: (typeof $("#val_personal").val() !== 'undefined' ? val_personal.value : ''),
            fotografiasAdicionales: documentosAdicionales,
            idseliminar: documentosAdicionalesEliminar.join(),
            opcion: 1,
        }
		 
        datosPersonal.forEach(element => {
            
            //VALIDACION PENDIENTE PARA REGISTROS SIN CURP  
            /*if(nacionalidad.value == 1 || nacionalidad.value == 2 && tipoEmpleado.value == 1){
                if(element["curp"] == datos["curp"] && validacion == true) {
                    validacion = false;
                }  
            }else{
                if(element["nombre"] == datos["nombre"] && element["primerApellido"] == datos["primerApellido"] && validacion == true){
                    validacion = false;
                }
            }*/
            if (element["curp"] == datos["curp"] && validacion == true) {
                validacion = false;
                if(element["opcion"] == 2){
                    validacion = true
                }else if (element["opcion"] == 3) {
                    element["opcion"] == 1
                    validcion = true 
                }
            }
        })

        if (chofer.checked) {
            vehiculotab.disabled = false
        }

        if (!validacion) {
            $(errorPersonalDuplicado).html("El registro ya existe el la lista")
            return validacion;
        } else (
            $(errorPersonalDuplicado).html("")
        )
        if(posicionIndex != -1){
            datosPersonal[posicionIndex]["idempresa"] = (empresa.value != "" ? idempresa.value : id_empresa)
            datosPersonal[posicionIndex]["idpersona"] = idpersona.value
            datosPersonal[posicionIndex]["id_personal_rest"] = id_personal_rest
            datosPersonal[posicionIndex]["idcontacto"] = idcontacto.value
            datosPersonal[posicionIndex]["tipoEmpleado"] = tipoEmpleado.value
            datosPersonal[posicionIndex]["nacionalidad"] = nacionalidad.value
            datosPersonal[posicionIndex]["entidadGobierno"] = (entidadGobierno.value == '' ? 0 : entidadGobierno.value)
            datosPersonal[posicionIndex]["empresa"] = empresa.value
            datosPersonal[posicionIndex]["clavePatronal"] = clavePatronal.value
            datosPersonal[posicionIndex]["tipoSeguro"] = tipoSeguro.value
            datosPersonal[posicionIndex]["numSeguroSocial"] = numSeguroSocial.value
            datosPersonal[posicionIndex]["noIssste"] = noIssste.value
            datosPersonal[posicionIndex]["noSeguro"] = noSeguro.value
            datosPersonal[posicionIndex]["aseguradora"] = (aseguradoras.value == '' ? 0 : aseguradoras.value)
            datosPersonal[posicionIndex]["curp"] = curp.value
            datosPersonal[posicionIndex]["nombre"] = nombre.value
            datosPersonal[posicionIndex]["primerApellido"] = primerApellido.value
            datosPersonal[posicionIndex]["segundoApellido"] = segundoApellido.value
            datosPersonal[posicionIndex]["numtelefono"] = numtelefono.value
            datosPersonal[posicionIndex]["correo"] = correo.value
            datosPersonal[posicionIndex]["chofer"] = (chofer.checked ? 1 : 0)
            datosPersonal[posicionIndex]["noLicencia"] = noLicencia.value
            datosPersonal[posicionIndex]["fechaVenciminetoIdent"] = fechaVenciminetoIdent.value
            datosPersonal[posicionIndex]["tipoIdentificacion"] = tipoIdentificacion.value
            datosPersonal[posicionIndex]["claveElector"] = claveElector.value
            datosPersonal[posicionIndex]["noPasaporte"] = noPasaporte.value
            datosPersonal[posicionIndex]["libretaMar"] = libretaMar.value
            datosPersonal[posicionIndex]["itinerario"] = itinerario.value
            datosPersonal[posicionIndex]["fechaVenciminetoLic"] = fechaVenciminetoLic.value
            datosPersonal[posicionIndex]["fotografiaLicencia"] = (typeof $("#val_licencia").val() !== 'undefined') ? val_licencia.value : ''
            datosPersonal[posicionIndex]["fotografiaIdentificacion"] = (typeof $("#val_identificacion").val() !== 'undefined' ? val_identificacion.value : '')
            datosPersonal[posicionIndex]["fotografiapersona"] = (typeof $("#val_personal").val() !== 'undefined' ? val_personal.value : '')
            datosPersonal[posicionIndex]["fotografiasAdicionales"] = documentosAdicionales
            datosPersonal[posicionIndex]["idseliminar"] = documentosAdicionalesEliminar.join()
            datosPersonal[posicionIndex]["opcion"] = 1
        }else{
            datosPersonal.push(datos)
        }
        /*if (permisoGrupal.checked == false && datosPersonal.length == 1) {
            tipoEmpleado.setAttribute("disabled", true)
        }*/

		$("#errorSubirIdentificacion").html("");
		$("#errorSubirPersonal").html("");
		$("#errorSubirLicencia").html("");
        Permisos.prototype.obtener_personal()
        if (posicionIndex != -1) {
            let thistemp = $("span[data-idIndexTBLModPersonas="+posicionIndex+"]")[0];
            $(thistemp).parents('tr').closest('tr').removeClass('hide');
        }else{
            DTPersonal.row.add([
                '<center>' + tipoEmpleado.options[tipoEmpleado.selectedIndex].text + '</center>',
                '<center>' + datos.nombre + ' ' + datos.primerApellido + ' ' + datos.segundoApellido + '</center>',
                '<center>' + nacionalidad.options[nacionalidad.selectedIndex].text + '</center>',
                '<div class="d-flex justify-content-center" >' +
                '<div class="p-1">' +
                '<a href="#!" title="Modificar">' +
                '<span class="glyphicon glyphicon-pencil modificar-persona" data-idIndexTBLModPersonas="' + (datosPersonal.length - 1) + '"></span' +
                '</a>' +
                '</div>' +
                '<div class="p-1">' +
                '<a href="#!" title="Eliminar">' +
                '<span class="glyphicon glyphicon-trash eliminar" data-idIndexTBLDelPersonas="' + (datosPersonal.length - 1) + '"></span' +
                '</a>' +
                '</div>' +
                '</div>'
            ]).draw(false)
        }

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
        divRfc.style.display = "none"
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
        divDocumentacionAdicional.style.display = "none"
        divSubirAdicional.style.display = "none"
        btnGuardar.disabled = false;
        nacionalidad.disabled = false
        curp.disabled = false
        tipoSeguro.disabled = false
        numSeguroSocial.disabled = false
        noIssste.disabled = false
        noSeguro.disabled = false
        aseguradoras.disabled = false

        //Reinicio de valores de campos
        idpersona.value = 0
        idcontacto.value = 0
        idempresa.value = 0
        idpersona.value = 0
        id_personal_rest = 0
        posicionIndex = -1
        $(".reiniciar-personal").val("")

        document.getElementById('btnAdjuntarLicencia').value = 'Subir documento'
        document.getElementById('btnSubirIdentificacion').value = 'Subir identificación'
        document.getElementById('btnSubirPersonal').value = 'Subir foto'

        documentosAdicionales = []
        documentosAdicionalesAux = []
        documentosAdicionalesEliminar = []
        DTDocAdicionales.clear().draw()
        
        fotoLicencia = null
        fotoIdentificacion = null 
        fotoPersona = null

        errorEstructuraCURP = false
        errorEstructuraCorreo = false
        errorEstructuraINEIFE = false
        errorEstructuraPasaporte = false
        errorEstructuraNSS = false
    }
    agregar_equipo(fotoFacturaEquipo, fotoEquipoAnexo, fotoEquipoRF) {

        let validacion = true;

       // $(errorSubirFacturaEquipo).html("")

        if (tipoEquipo.value == "") {
            $(errortipoEquipo).html("Campo obligatorio")
            validacion = false
        }
    
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
        if (resguardo.value == "") {
            $(errorresguardo).html("Campo obligatorio")
            validacion = false
        }

        if (noFacturaEquipo.value == "") {
            $(errornoFacturaEquipo).html("Campo obligatorio")
            validacion = false
        }

        let fa = ''
        let an = ''
        let rf = ''
        
        var tmp= $("#val_equipo").val();		
        if (typeof tmp  !== "undefined"){
            fa = tmp
        }else {
            $(errorSubirFacturaEquipo).html("Campo obligatorio"); validacion = false;
        }

        var tmp= $("#val_equipo_anexo").val();		
        if (typeof tmp  !== "undefined"){
            an = tmp
        }

        var tmp= $("#val_equipo_rf").val();		
        if (typeof tmp  !== "undefined"){
            rf = tmp
        }


        if(tipoEquipo.value == 5){
            if(descripcionEquipo.value == ""){
                $(errordescripcionEquipo).html("Campo obligatorio")
                validacion = false
            }
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
                fotografiaFactura: fa,
                idimagenAnexo: (adjuntarEquipoAnexo.dataset.id != "") ? adjuntarEquipoAnexo.dataset.id : 0,
                fotografiaAnexo: an,
                idimagenRF: (adjuntarEquipoRF.dataset.id != "") ? adjuntarEquiporRF.dataset.id : 0,
                fotografiaRF: rf,
                //fotografia          : $("#adjuntarEquipo")[0].files[0],
                anexo29: anexo29.value,
                descripcionEquipo : descripcionEquipo.value,
                opcion:1,
            } 
            datosEquipos.forEach(element => {
                if(datos["tipoEquipo"] != 5){
                    if (element["noSerie"] == datos["noSerie"] && validacion == true) {
                        validacion = false;
                        if(element["opcion"] == 3){
                            element["opcion"] = 1
                            validacion = true
                        }
                    }
                }
            })

            if (!validacion) {
                $(errorHerramientaDuplicado).html("El registro ya existe el la lista")
                return validacion;
            } else (
                $(errorHerramientaDuplicado).html("")
            )
			$("#errorSubirFacturaEquipo").html(""); 
			$("#errorSubirEquipoAnexo").html(""); 
			$("#errorSubirEquipoRF").html(""); 

            /*

            '<div class="p-1">' +
                '<a href="#!" title="Modificar">' +
                '<span class="glyphicon glyphicon-pencil modificar-equipo" data-id="' + (datosEquipos.length - 1) + '"></span>' +
                '</a>' +
                '</div>' +

                */
            if(posicionIndex != -1){
                datosEquipos[posicionIndex]["idequipo"] = idequipo.value
                datosEquipos[posicionIndex]["tipoEquipo"] = tipoEquipo.value
                datosEquipos[posicionIndex]["modelo"] = modeloHerramienta.value
                datosEquipos[posicionIndex]["marca"] = marcaHerramienta.value
                datosEquipos[posicionIndex]["noSerie"] = noSerieEquipo.value
                datosEquipos[posicionIndex]["tipoDocumento"] = tipoDocumento.value
                datosEquipos[posicionIndex]["noFactura"] = noFacturaEquipo.value
                datosEquipos[posicionIndex]["resguardo"] = resguardo.value
                datosEquipos[posicionIndex]["idimagenfactura"] = (adjuntarEquipo.dataset.id != "") ? adjuntarEquipo.dataset.id : 0
                datosEquipos[posicionIndex]["fotografiaFactura"] = fa
                datosEquipos[posicionIndex]["idimagenAnexo"] = (adjuntarEquipoAnexo.dataset.id != "") ? adjuntarEquipoAnexo.dataset.id : 0
                datosEquipos[posicionIndex]["fotografiaAnexo"] = an
                datosEquipos[posicionIndex]["idimagenRF"] = (adjuntarEquipoRF.dataset.id != "") ? adjuntarEquiporRF.dataset.id : 0
                datosEquipos[posicionIndex]["fotografiaRF"] = rf
                //datosEquipos[posicionIndex]["fotografia"] = $("#adjuntarEquipo")[0].files[0]
                datosEquipos[posicionIndex]["anexo29"] = anexo29.value
                datosEquipos[posicionIndex]["descripcionEquipo"] = descripcionEquipo.value
                datosEquipos[posicionIndex]["opcion"] =1
            }else{
                datosEquipos.push(datos)
            }
            if(posicionIndex != -1){
                let thistemp = $("span[data-idIndexTBLModEquipos="+posicionIndex+"]")[0];
                $(thistemp).parents('tr').closest('tr').removeClass('hide');
            }else{
                DTEquipo.row.add([
                    '<center>' + tipoEquipo.options[tipoEquipo.selectedIndex].text + '</center>',
                    '<center>' + datos.modelo + '</center>',
                    '<center>' + datos.marca + '</center>',
                    '<center>' + datos.noSerie + '</center>',
                    '<div class="d-flex justify-content-center" >' +
                    '<div class="p-1">' +
                    '<a href="#!" title="Modificar">' +
                    '<span class="glyphicon glyphicon-pencil modificar-equipo" data-idIndexTBLModEquipos="' + (datosEquipos.length - 1) + '"></span>' +
                    '</a>' +
                    '</div>' +
                    '<div class="p-1">' +
                    '<a href="#!" title="Eliminar">' +
                    '<span class="glyphicon glyphicon-trash eliminar" data-idIndexTBLDelEquipos="' + (datosEquipos.length - 1) + '"></span>' +
                    '</a>' +
                    '</div>' +
                    '</div>'
                ]).draw(false)
            }
            edicion_equipo = 0
            //Reincio de modales de carga de documentos
            adjuntarEquipo.value = ''
            adjuntarEquipoAnexo.value = ''
            adjuntarEquipoRF.value = ''
            //Reinicio de campos mostrados a inicio
            divCaracteristicas.style.display = "none"
            divDocumento1.style.display = "none"
            divResguardo.style.display = "none"
            divOtros.style.display = "none"
            idequipo.value = 0
            //Reinicio de valores de campos
            posicionIndex = -1
            let length = 0
            datosPersonal.forEach(element => {
                if(element.opcion != 3){
                    length++
                }
            });
            if (length == 1) {
                resguardo.classList.remove("reiniciar-equipo")
            }else{
                resguardo.classList.add("reiniciar-equipo")
            }
            $(".reiniciar-equipo").val("")
            document.getElementById('btnSubirEquipo').value = 'Subir documento'
            document.getElementById('btnSubirEquipoAnexo').value = 'Subir Anexo'
            document.getElementById('btnSubirEquipoRF').value = 'Subir RF'
            document.getElementById('btnSubirMaterial').value = 'Subir documento'
            fotoFacturaEquipo = null
            fotoEquipoAnexo = null
            fotoEquipoRF = null
        }
    }
    agregar_material(fotoMaterial) {
        let validacion = true

        /*if(responsableMaterial.value == ""){
            $(errorresponsableMaterial).html("campo obligatorio")
            validacion = false
        }*/

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

        if(tipoMedida.value == ""){
            $(errortipoMedida).html("Campo obligatorio")
            validacion = false
        }

        let fa = ''
        var tmp= $("#val_material").val();		
        if (typeof tmp  !== "undefined"){
            fa = tmp
        }else {
            $(errorSubirFacturaEquipo).html("Campo obligatorio"); validacion = false;
        }

        if (validacion) {
            let datos = {
                responsable: responsableMaterial.value,
                tipomaterial: tipoMaterial.value,
                tipomedida:(tipoMedida.value == '' ? 0 : tipoMedida.value)   ,
                cantidad: cantidad.value,
                descripcion: descripcion.value,
                idimagen: (adjuntarMaterial.dataset.id != "") ? adjuntarMaterial.dataset.id : 0,
                fotografiaMaterial: fa,
                opcion: 1,
            }

            if(posicionIndex != -1){
                datosMaterial[posicionIndex]["responsable"] = responsableMaterial.value
                datosMaterial[posicionIndex]["tipomaterial"] = tipoMaterial.value
                datosMaterial[posicionIndex]["tipomedida"] =(tipoMedida.value == '' ? 0 : tipoMedida.value)   
                datosMaterial[posicionIndex]["cantidad"] = cantidad.value
                datosMaterial[posicionIndex]["descripcion"] = descripcion.value
                datosMaterial[posicionIndex]["idimagen"] = (adjuntarMaterial.dataset.id != "") ? adjuntarMaterial.dataset.id : 0
                datosMaterial[posicionIndex]["fotografiaMaterial"] = fa
                datosMaterial[posicionIndex]["opcion"] = 1
            }else{
                datosMaterial.push(datos)
            }
            if(posicionIndex != -1){
                let thistemp = $("span[data-idIndexTBLModMaterial="+posicionIndex+"]")[0];
                $(thistemp).parents('tr').closest('tr').removeClass('hide');
            }else{
                DTMaterial.row.add([
                    '<center>' + tipoMaterial.options[tipoMaterial.selectedIndex].text + '</center>',
                    '<center>' + cantidad.value + '</center>',
                    '<center>' +  tipoMedida.options[tipoMedida.selectedIndex].text + '</center>',
                    '<center>' + descripcion.value + '</center>',
                    '<div class="d-flex justify-content-center" >' +
                    '<div class="p-1">' +
                    '<a href="#!" title="Modificar">' +
                    '<span class="glyphicon glyphicon-pencil modificar-material" data-idIndexTBLModMaterial="' + (datosMaterial.length - 1) + '"></span>' +
                    '</a>' +
                    '</div>' +
                    '<div class="p-1">' +
                    '<a href="#!" title="Eliminar">' +
                    '<span class="glyphicon glyphicon-trash eliminar" data-idIndexTBLDelMaterial="' + (datosMaterial.length - 1) + '"></span>' +
                    '</a>' +
                    '</div>' +
                    '</div>'
                ]).draw(false)
            }
            edicion_material = 0

            //responsableMaterial.value = ""
            tipoMaterial.value = ""
            tipoMedida.value = ""
            cantidad.value = ""
            descripcion.value = ""
            posicionIndex = -1

            responsableMaterial.disabled = true;
            fotoMaterial = null

            $("#errorSubirMaterial").html(""); 
        }
    }
    agregar_vehiculo(fotoLateralVehiculo, fotoPlacaVehiculo) {
        let validacion = true
        //$(errorSubirFacturaVehiculo).html("")
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
       /* if (tipodocumentoVeh.value == "") {
            $(errortipodocumentoVeh).html("Campo obligatorio")
            validacion = false
        }*/
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
        /*if (selChofer.value == "") {
            $(errorselChofer).html("Campo obligatorio")
            validacion = false
        }*/
		
		/*var tmp= $("#val_factura").val();		
			if (typeof tmp  !== "undefined"){}else {
				$(errorSubirFacturaVehiculo).html("Campo obligatorio"); validacion = false;
			}*/
			
        /*if (adjuntarVehiculoFactura.value == "" && adjuntarVehiculoFactura.dataset.imagen == "" && fotoFacturaVehiculo == null) {
            $(errorSubirFacturaVehiculo).html("Campo obligatorio")
            validacion = false
        }
		*/
		
        /*if (ajuntarLateralVehiculo.value == "" && ajuntarLateralVehiculo.dataset.imagen == "" && fotoLateralVehiculo == null) {
            $(errorSubirFotoVehiculo).html("Campo obligatorio")
            validacion = false
        }
        if (adjuntarPlacaVehiculo.value == "" && adjuntarPlacaVehiculo.dataset.imagen == "" && fotoPlacaVehiculo == null) {
            $(errorSubirFotoVehiculo).html("Campo obligatorio")
            validacion = false
        }*/
		
		var tmp= $("#val_lateral").val();		
			if (typeof tmp  !== "undefined"){}else {
				$(errorSubirFotoVehiculo).html("Campo obligatorio"); validacion = false;
			}
			

        if (noSerieVehiculo.value.length != 17 && noSerieVehiculo.value != "") {
            $(errornoSerieVehiculo).html("Deben ser 17 caracteres")
            validacion = false
        }
        if (noMotor.value != "") {
            if (noMotor.value.length < 4 || noMotor.value.length > 25) {
                $(errornoMotor).html("Deben ser entre 4 y 25 caracteres")
                validacion = false
            }
        }

        if(anio.value>'2022'){
            erroranio.innerHTML = 'Información no valida'
            return
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
                anio: (anio.value == '' ? 0 : anio.value),
                color: color.value,
                tipoVehiculo: tipoVehiculo.value,
                tipoTarCircu: tipoTarjetaCirculacion.value,
                noTarjeta: noTarjeta.value,
                //vigenciaTarjete: vigenciaTarjeta.value,
                //tipoDocumento: tipodocumentoVeh.value,
                //noFactura: noFacturaVeh.value,
                //idimagenfactura:  0,
                //documentoFactura: $("#val_factura").val(),
                //documentoFactura        : $("#adjuntarVehiculoFactura")[0].files[0],
                aseguradora: aseguradorasVeh.value,
                noPoliza: noPoliza.value,
                vigenciaPoliza: vigenciaPoliza.value,
                periodoPago: periodoPago.value,
                periodoFechaInicio: periodoCobFechaInicio.value,
                periodoFechaFin: periodoCobFechaFin.value,
                //estatusVehiculo         : estatusVehiculo.value,
                //chofer: selChofer.value,
                idfotografiaLateral:  0,
                fotografiaLateral: $("#val_lateral").val(),
                //fotografiaLateral       : $("#ajuntarLateralVehiculo")[0].files[0],
                idfotografiaPlaca:  0,
                //fotografiaPlaca         : $("#adjuntarPlacaVehiculo")[0].files[0],
                fotografiaPlaca: $("#val_placa").val(),
                opcion:1,
            }

            datosVehiculos.forEach(element => {
                if (element["noPlaca"] == datos["noPlaca"] && validacion == true) {
                    validacion = false;
                    if(element["opcion"] == 3){
                        element["opcion"] = 1
                        validacion = true
                    }
                }
            })
			
			

            if (!validacion) {
                $(errorVehiculoDuplicado).html("El registro ya existe el la lista")
                return validacion;
            } else (
                $(errorVehiculoDuplicado).html("")
            )
			$("#errorSubirFacturaVehiculo").html("");			
			$("#errorSubirFotoVehiculo").html(""); 
			$("#errorSubirFotoLat").html(""); 
			$("#errorSubirFotoPla").html(""); 
			
                /*

                '<div class="p-1">' +
                '<a href="#!" title="Modificar">' +
                '<span class="glyphicon glyphicon-pencil modificar-vehiculo" data-id="' + (datosVehiculos.length - 1) + '"></span>' +
                '</a>' +
                '</div>' +

                */
            if(posicionIndex != -1){
                datosVehiculos[posicionIndex]["idvehiculo"] =  idvehiculo.value
                datosVehiculos[posicionIndex]["noPlaca"] =  noPlaca.value
                datosVehiculos[posicionIndex]["noSerie"] =  noSerieVehiculo.value
                datosVehiculos[posicionIndex]["noMotor"] =  noMotor.value
                datosVehiculos[posicionIndex]["marca"] =  marcaVehiculo.value
                datosVehiculos[posicionIndex]["modelo"] =  modeloVehicuo.value
                datosVehiculos[posicionIndex]["anio"] =  (anio.value == '' ? 0 : anio.value)
                datosVehiculos[posicionIndex]["color"] =  color.value
                datosVehiculos[posicionIndex]["tipoVehiculo"] =  tipoVehiculo.value
                datosVehiculos[posicionIndex]["tipoTarCircu"] =  tipoTarjetaCirculacion.value
                datosVehiculos[posicionIndex]["noTarjeta"] =  noTarjeta.value
                datosVehiculos[posicionIndex]["aseguradora"] =  aseguradorasVeh.value
                datosVehiculos[posicionIndex]["noPoliza"] =  noPoliza.value
                datosVehiculos[posicionIndex]["vigenciaPoliza"] =  vigenciaPoliza.value
                datosVehiculos[posicionIndex]["periodoPago"] =  periodoPago.value
                datosVehiculos[posicionIndex]["periodoFechaInicio"] =  periodoCobFechaInicio.value
                datosVehiculos[posicionIndex]["periodoFechaFin"] =  periodoCobFechaFin.value
                datosVehiculos[posicionIndex]["idfotografiaLateral"] =   0
                datosVehiculos[posicionIndex]["fotografiaLateral"] =  $("#val_lateral").val()
                datosVehiculos[posicionIndex]["idfotografiaPlaca"] =   0
                datosVehiculos[posicionIndex]["fotografiaPlaca"] =  $("#val_placa").val()
                datosVehiculos[posicionIndex]["opcion"] = 1
            }else{
                datosVehiculos.push(datos)
            }
            if (posicionIndex != -1){
                let thistemp = $("span[data-idIndexTBLModVehiculos="+posicionIndex+"]")[0];
                $(thistemp).parents('tr').closest('tr').removeClass('hide');
            }else{
                DTVehiculo.row.add([
                    '<center>' + datos.noPlaca + '</center>',
                    '<center>' + datos.noSerie + '</center>',
                    '<center>' + datos.marca + '</center>',
                    '<center>' + datos.anio + '</center>',
                    '<center>' + tipoVehiculo.options[tipoVehiculo.selectedIndex].text + '</center>',
                    '<div class="d-flex justify-content-center" >' +
                    '<div class="p-1">' +
                    '<a href="#!" title="Modificar">' +
                    '<span class="glyphicon glyphicon-pencil modificar-vehiculo" data-idIndexTBLModVehiculos="' + (datosVehiculos.length - 1) + '"></span>' +
                    '</a>' +
                    '</div>' +
                    '<div class="p-1">' +
                    '<a href="#!" title="Eliminar">' +
                    '<span class="glyphicon glyphicon-trash eliminar" data-idIndexTBLDelVehiculos="' + (datosVehiculos.length - 1) + '"></span>' +
                    '</a>' +
                    '</div>' +
                    '</div>'
                ]).draw(false)
            }
            edicion_vehiculo = 0
            //Reincio de modales de carga de documentos
            //adjuntarVehiculoFactura.value = ''
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
            noSerieVehiculo.removeAttribute("disabled")
            marcaVehiculo.setAttribute("class","form-control reiniciar-vehiculo")
            modeloVehicuo.setAttribute("class","form-control reiniciar-vehiculo")
            anio.setAttribute("class","form-control reiniciar-vehiculo")

            marcaVehiculo.removeAttribute("disabled")
            modeloVehicuo.removeAttribute("disabled")
            anio.removeAttribute("disabled")
            //noSerieVehiculo.setAttribute("class", "form-control reiniciar-vehiculo")
            //noMotor.removeAttribute("disabled")
            //Reinicio de valores de campos
            idvehiculo.value = 0
            $(".reiniciar-vehiculo").val("")
            //document.getElementById('btnSubirFacturaVehiculo').value = 'Subir documento'
            document.getElementById('btnSubirVehiculo').value = 'Subir archivo'

            fotoFacturaVehiculo = null
            fotoLateralVehiculo = null
            fotoPlacaVehiculo = null
        }
    }
    confirmar_almacenamiento(ev) {
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

        let length = 0
        datosPersonal.forEach(element => {
            if(element.opcion != 3){
                length++
            }
        });
        if (length == 0) {
            $(modal_error).css('margin-top', ajuste_altura_modal(ev));
            peticion_fallida('Debe haber al menos una persona en el listado para poder guardar el permiso.');
            Permisos.prototype.agregar_personas();
            validacion = false
        }

        if (permisoGrupal.checked) {
            if(curpResponsable.value != ""){
                let indexPersonal = datosPersonal.findIndex(e => e.curp === curpResponsable.value)
                if (indexPersonal == -1) {
                    $(modal_error).css('margin-top', ajuste_altura_modal(ev));
                    peticion_fallida("La CURP del titular del permiso debe coincidir con alguna persona registrada.")
                    validacion = false
                    $(curpResponsable).focus()
                }else{
                    errorcurpResponsable.innerHTML = ""
                }
            }else{
                validacion = false
                $(curpResponsable).focus()
                errorcurpResponsable.innerHTML = "Campo obligatorio"
            }
            if(length < 2){
                $(modal_error).css('margin-top', ajuste_altura_modal(ev));
                peticion_fallida("Para un permiso grupal, es requerido mas de una persona en registrada.")
                validacion = false
            }
        }

        if (vigencia.value == '2') {
            if((dias.value*1) > 60){
                errordias.innerHTML = 'La vigencia máxima es de 60 días'
                validacion = false
            }
    
            if((dias.value*1) == 0){
                errordias.innerHTML = 'Información no valida'
                validacion = false
            }
        }

        if (validacion && (actualizarDatosPersonas.length > 0 || actualizarDatosVehiculos.length > 0)) {
            $(modal_error).css('margin-top', ajuste_altura_modal(ev));
            peticion_fallida("Se requiere que se actualice la informacion en personas y/o vehiculos")
            validacion = false
        }

        if (validacion) {
            $(modal_confirmar_guardar).css('margin-top', ajuste_altura_modal(ev))
            pedir_confirmacion_guardar();
            //document.getElementById("confirmar_guardar").focus();
        } /*else {
            $(tipoPermiso).focus()
        }*/
    }
    realizar_almacenamiento_pases(ev) {
        confirmar_guardar.disabled = true;
        btnGuardar.disabled = true;
        estatus_pase = 1
        if ((datosEquipos.length > 0 || datosMaterial.length > 0) && ![2,3,4].includes(recinto.value)) {
            estatus_pase = 2
        }

        if(actividad.value == 17 && ![2,3,4].includes(recinto.value)){
            estatus_pase = 2
        }

        if(enviar_migracion.checked){
            if(estatus_pase == 1){
                estatus_pase = 3
            }else{
                estatus_pase = 4
            }
        }
        //let formData = new FormData();
		/*
		  let datos = {

            idpersona: idpersona.value,
		*/

        let length = 0
        datosPersonal.forEach(element => {
            if(element.opcion != 3){
                length++
            }
        });

        if(length > 1 ){
            var index = datosPersonal.findIndex(function(element) {
                return element.curp == curpResponsable.value
            });
        }else{
            var index = 0
        }

        length = 0
        datosEquipos.forEach(element => {
            if(element.opcion != 3){
                length++
            }
        });

        if(length > 0 ){
            datosEquipos.forEach(element => {
                element.resguardo = index
            });
        }

        length = 0
        datosMaterial.forEach(element => {
            if(element.opcion != 3){
                length++
            }
        });

        if(length > 0 ){
            datosMaterial.forEach(element => {
                element.responsable = index
            });
        }

		var dat = {
            idempresa       : id_empresa,
            idpersona       : id_persona_fisica,
            idcontratos     : id_contrato,
            idtipopermiso   : tipoPermiso.value,
            visita          : clientetEntidad.value,
            idtipoactividad : actividad.value,
            idtipovigencia  : vigencia.value,
            dias            :(dias.value == "" ? 0 : dias.value),
            fechainicio     :fechaInicio.value,
            fechatermino    : fechaTermino.value,
            idrecinto       :recinto.value,
            idfiscalizado   : (nombreRecinto.value == '' ? 0 : nombreRecinto.value),
            motivo          : motivo.value,
            permisogrupal   :(permisoGrupal.checked ? 1 : 0),
            estatus         : estatus_pase,
            curpresponsable : curpResponsable.value,
		}

        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/addPermiso',
            type: 'POST',
            data: {
                datos : JSON.stringify({
                    "permiso":dat,
                    "persona":( datosPersonal), 
                    "equipo": (datosEquipos),
                    "material": (datosMaterial),
                    "vehiculo": (datosVehiculos)
                })
            },
			beforeSend: function () {
                $("#modal_confirmar_guardar").modal("hide");
                spinner_buttons('btnGuardar', 'Enviar solicitud', true);
            },			
            success: function (response) {
                if (response.status) {
                    Permisos.prototype.reiniciar_campos()
                    $(modal_registro_exitoso).css('margin-top', ajuste_altura_modal(ev));
                    registro_exitoso(response.message+": Número de solicitud "+response.data.idpermiso);
                } else {
                    confirmar_guardar.disabled = false;
                    btnGuardar.disabled = false;
                    $(modal_error).css('margin-top', ajuste_altura_modal(ev));
                    peticion_fallida(response.message);
                }
                spinner_buttons('btnGuardar', 'Enviar solicitud', false);
            },
            error: (xhr, ajaxOptions, thrownError) => {
                confirmar_guardar.disabled = false;
                btnGuardar.disabled = false;
                $(modal_error).css('margin-top', ajuste_altura_modal(ev));
                spinner_buttons('btnGuardar', 'Enviar solicitud', false);
                peticion_fallida(thrownError);
            }
        }).fail(function (response) {
            spinner_buttons('btnGuardar', 'Enviar solicitud', false);
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
        $(".form-control").val("")
    }
}
const per = new Permisos()

$(tabPersonal).on('click', '.eliminar', function (ev) {
    //datosPersonal.splice(ev.target.dataset.id, 1);
    datosPersonal[ev.target.dataset.idindextbldelpersonas].opcion = 3
    //DTPersonal.row($(this).parents('tr')).remove().draw();
    $(this).parents('tr').closest('tr').addClass('hide');
    let length = 0
    datosPersonal.forEach(element => {
        if(element.opcion != 3){
            length++
        }
    });

    if (length == 0) {
        btnGuardar.disabled = true;
    }
    per.obtener_personal()
    tipoEmpleado.removeAttribute("disabled")
    $(errorcurpResponsable).html("")
    if(length <= 1){
        permisoGrupal.checked = false
        curpResponsable.value = ""
        divCURPResp.style.display = "none"
    }else{
        permisoGrupal.checked = true
        divCURPResp.style.display = ""
    }
});
$(tabEquipoHerramienta).on('click', '.eliminar', function (ev) {
    //datosEquipos.splice(ev.target.dataset.id, 1);
    datosEquipos[ev.target.dataset.idindextbldelequipos].opcion = 3
    //DTPersonal.row($(this).parents('tr')).remove().draw();
    $(this).parents('tr').closest('tr').addClass('hide');
});
$(tabDocumentosAdicionales).on('click', '.eliminar', function (ev) {
    if(ev.target.dataset.idimagen != ""){
        documentosAdicionalesEliminar.push(ev.target.dataset.idimagen)
    }
    //documentosAdicionales.splice(ev.target.dataset.id, 1);
    documentosAdicionalesAux.splice(ev.target.dataset.id, 1);

    if(documentosAdicionales.length > 0 ){
        var index = documentosAdicionales.findIndex(function(element) {
            return element.fotografia == ev.target.dataset.nombre
        });

        documentosAdicionales.splice(index, 1)
    }

    DTDocAdicionales.row($(this).parents('tr')).remove().draw();
});
$(tabVehiculos).on('click', '.eliminar', function (ev) {
   //datosVehiculos.splice(ev.target.dataset.id, 1);
    datosVehiculos[ev.target.dataset.idindextbldelvehiculo].opcion = 3
    //DTVehiculo.row($(this).parents('tr')).remove().draw();
    $(this).parents('tr').closest('tr').addClass('hide');
});
$(tabMaterial).on('click', '.eliminar', function (ev) {
    //datosMaterial.splice(ev.target.dataset.id, 1);
    datosMaterial[ev.target.dataset.idindextbldelmaterial].opcion = 3
    //DTMaterial.row($(this).parents('tr')).remove().draw();
    $(this).parents('tr').closest('tr').addClass('hide');
});

$(tabPersonal).on('click', '.modificar-persona', function (ev) {
    if(edicion_personal == 1){
        $(modal_error).css('margin-top', ajuste_altura_modal(ev));
        peticion_fallida("Se encuentra en edición otro registro");
        return false
    }
    edicion_personal = 1 

    nacionalidad.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].nacionalidad

    if (nacionalidad.value == 1) {
        $(tipoIdentificacion).data("nacional", 1)
    } else {
        $(tipoIdentificacion).data("nacional", 0)
    }

    idempresa.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].idempresa
    idpersona.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].idpersona
    id_personal_rest = datosPersonal[ev.target.dataset.idindextblmodpersonas].id_personal_rest * 1
    idcontacto,value = datosPersonal[ev.target.dataset.idindextblmodpersonas].idcontacto

    Permisos.prototype.obtener_tipos_identificacion_modificar(datosPersonal[ev.target.dataset.idindextblmodpersonas]);


    tipoEmpleado.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].tipoEmpleado
    tipoEmpleado.disabled = false

    nacionalidad.disabled = true

    entidadGobierno.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].entidadGobierno
    empresa.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].empresa
    clavePatronal.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].clavePatronal
    empresa_rfc.value = datosPersonal[ev.target.dataset.id].rfc
    tipoSeguro.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].tipoSeguro
    tipoSeguro.disabled = true

    if (tipoSeguro.value == 1) {
        divTipoSeguro.style.display = ''
        divNoSeguroSocial.style.display = ''
        numSeguroSocial.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].numSeguroSocial
        numSeguroSocial.disabled = true
        noIssste.value = ''
        noSeguro.value = ''
        aseguradoras.vaalue = ''
        divNoSeguro.style.display = 'none'
        divAseguradora.style.display = 'none'
        divNoIssste.style.display = 'none'
    }

    if (tipoSeguro.value == 2) {
        divTipoSeguro.style.display = ''
        divNoIssste.style.display = ''
        noIssste.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].noIssste
        noIssste.disabled = true
        numSeguroSocial.value = ''
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
        noSeguro.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].noSeguro
        aseguradoras.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].aseguradora
        noSeguro.disabled = true
        aseguradoras.disabled = true
        numSeguroSocial.value = ''
        divNoIssste.style.display = 'none'
        divNoSeguroSocial.style.display = 'none'
    }

    curp.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].curp

    divbtnCurp.style.display = 'none'
    curp.disabled = true
    
    nombre.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].nombre
    primerApellido.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].primerApellido
    segundoApellido.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].segundoApellido
    numtelefono.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].numtelefono
    correo.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].correo

    let nombre_aux = nombre.value + ' ' + primerApellido.value + ' ' + segundoApellido.value

    if(actualizarDatosPersonas.length > 0 ){
        var index = actualizarDatosPersonas.findIndex(function(element) {
            return element.nombre == nombre_aux
        });

        actualizarDatosPersonas.splice(index, 1)
    }

    Permisos.prototype.validar_tipoPersona_nacionalidad(datosPersonal[ev.target.dataset.idindextblmodpersonas].nacionalidad)

    if (datosPersonal[ev.target.dataset.idindextblmodpersonas].chofer == 1) {
        chofer.checked = true
        chofer.value = 1
        noLicencia.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].noLicencia
        fechaVenciminetoLic.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].fechaVenciminetoLic
        fotoLicencia = datosPersonal[ev.target.dataset.idindextblmodpersonas].fotografiaLicencia
        btnAdjuntarLicencia.value = "Actualizar licencia"
        $(divLicencia).show()
        $(errornoLicencia).html("")

    } else {
        chofer.checked = false
        chofer.value = 0
    }

    fotoPersona = datosPersonal[ev.target.dataset.idindextblmodpersonas].fotografiapersona
    btnSubirPersonal.value = "Actualizar foto"

    divFechaVencimiento.style.display = ""
    divSubirDocumento.style.display = ""
    divSubirfoto.style.display = ""

    let switch_var = datosPersonal[ev.target.dataset.idindextblmodpersonas].tipoIdentificacion + '' 

    switch (switch_var) {
        case "7":
            divClaveElector.style.display = ""
            divPasaporte.style.display = "none"
            divLibretaMar.style.display = "none"
            divItinerario.style.display = "none"
            claveElector.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].claveElector
            break;
        case "8":
            divClaveElector.style.display = ""
            divPasaporte.style.display = "none"
            divLibretaMar.style.display = "none"
            divItinerario.style.display = "none"
            claveElector.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].claveElector
            break;
        case "2":
            divClaveElector.style.display = "none"
            divPasaporte.style.display = ""
            divLibretaMar.style.display = "none"
            divItinerario.style.display = "none"
            noPasaporte.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].noPasaporte
            break;
        case "3":
            divClaveElector.style.display = "none"
            divPasaporte.style.display = "none"
            divLibretaMar.style.display = ""
            divItinerario.style.display = "none"
            libretaMar.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].libretaMar
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
            itinerario.value = datosPersonal[ev.target.dataset.idindextblmodpersonas].itinerario
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
    $(errorempresa_rfc).html("")
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
	
	var temp = datosPersonal[ev.target.dataset.idindextblmodpersonas].fotografiaIdentificacion;
	var archivo = "/assets/uploads/permisos/personal/"+temp;
	var txt = "<input type='hidden' id='val_identificacion' value ='"+temp+"'>";
	$("#errorSubirIdentificacion").html("<span class='color:#000'><a href='"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
	
	var temp = datosPersonal[ev.target.dataset.idindextblmodpersonas].fotografiapersona;
	var archivo = "/assets/uploads/permisos/personal/"+temp;
	var txt = "<input type='hidden' id='val_personal' value ='"+temp+"'>";
	$("#errorSubirPersonal").html("<span class='color:#000'><a href='"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
	
	var temp = datosPersonal[ev.target.dataset.idindextblmodpersonas].fotografiaLicencia;
	if (temp != ""){
		var archivo = "/assets/uploads/permisos/personal/"+temp;
		var txt = "<input type='hidden' id='val_licencia' value ='"+temp+"'>";
		$("#errorSubirLicencia").html("<span class='color:#000'><a href='"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);
	}

    documentosAdicionales = []
    documentosAdicionalesAux = []
    datosPersonal[ev.target.dataset.idindextblmodpersonas].tablafotografias.forEach(element => {        
        let datos = {
            idimagen: element.idimagen,
            fotografia: element.fotografia
        }
        documentosAdicionalesAux.push(datos)

        DTDocAdicionales.row.add([
            '<center><a href="'+base_url+'assets/uploads/permisos/personal/'+element.fotografia+'" target="_blank" style="font-size: 18px;">Visualizar archivo</a></center>',
            '<div class="d-flex justify-content-center" >' +
                '<div class="p-1">' +
                    '<a href="#!" title="Eliminar">' +
                        '<span class="glyphicon glyphicon-trash eliminar" data-id="' + (documentosAdicionalesAux.length - 1) + '" data-idimagen="'+element.idimagen+'" data-nombre="'+element.fotografia+'"></span>' +
                    '</a>' +
                '</div>' +
            '</div>'
        ]).draw(false)
    });

	
    $(btnAdjuntarLicencia).on('click', function (ev) {
        per.previsualizar_modificar_licenciaPersona(fotoLicencia)
    })
    $(btnSubirIdentificacion).on('click', function (ev) {
        per.previsualizar_modificar_identificacionPersona(fotoIdentificacion)
    })
    $(btnSubirPersonal).on('click', function (ev) {
        per.previsualizar_modificar_fotoPersona(fotoPersona)
    })

    //datosPersonal.splice(ev.target.dataset.idindextblmodpersonas, 1);
    datosPersonal[ev.target.dataset.idindextblmodpersonas].opcion = 2
    posicionIndex = ev.target.dataset.idindextblmodpersonas
    let length = 0
    datosPersonal.forEach(element => {
        if(element.opcion != 3){
            length++
        }
    });
    if (length == 0) {
        btnGuardar.disabled = true;
    }
    tr = $(this).parents('tr').closest('tr').addClass('hide');
    //DTPersonal.row($(this).parents('tr')).remove().draw();

    /*let elements = $('.modificar-persona');
    for (let index = ev.target.dataset.idindextblmodpersonas; index < elements.length; index++) {
        num = elements[index].dataset.id;
        if (num != 0)
            num = num - 1;
        elements[index].dataset.id = num;
    };*/
})
$(tabEquipoHerramienta).on('click', '.modificar-equipo', function (ev) {
    if(edicion_equipo == 1){
        $(modal_error).css('margin-top', ajuste_altura_modal(ev));
        peticion_fallida("Se encuentra en edición otro registro");
        return false
    }
    edicion_equipo = 1

    tipoEquipo.value = datosEquipos[ev.target.dataset.idIndextblmodequipos].tipoEquipo
    modeloHerramienta.value = datosEquipos[ev.target.dataset.idIndextblmodequipos].modelo
    marcaHerramienta.value = datosEquipos[ev.target.dataset.idIndextblmodequipos].noSerie
    noSerieEquipo.value = datosEquipos[ev.target.dataset.idIndextblmodequipos].marca
    tipoDocumento.value = datosEquipos[ev.target.dataset.idIndextblmodequipos].tipoDocumento
    noFacturaEquipo.value = datosEquipos[ev.target.dataset.idIndextblmodequipos].noFactura
    fotoFacturaEquipo = datosEquipos[ev.target.dataset.idIndextblmodequipos].fotografiaFactura
    fotoEquipoAnexo = datosEquipos[ev.target.dataset.idIndextblmodequipos].fotografiaAnexo
    fotoEquipoRF = datosEquipos[ev.target.dataset.idIndextblmodequipos].fotografiaRF
    resguardo.value = datosEquipos[ev.target.dataset.idIndextblmodequipos].resguardo
    btnSubirEquipo.value = "Actualizar documento"
    btnSubirEquipoAnexo.value = "Actualizar documento"
    btnSubirEquipoRF.value = "Actualizar documento"
    btnSubirMaterial.value = "Actualizar documento"

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
    $(errorSubirEquipoAnexo).html("")
    $(errorSubirEquipoRF).html("")
	
	var temp = datosEquipos[ev.target.dataset.idIndextblmodequipos].fotografiaFactura;
	var archivo = "/assets/uploads/permisos/equipos/"+temp;
	var txt = "<input type='hidden' id='val_equipo' value ='"+temp+"'>";
	$("#errorSubirFacturaEquipo").html("<span class='color:#000'><a href='"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
	
    var temp = datosEquipos[ev.target.dataset.idIndextblmodequipos].fotografiaAnexo;
	var archivo = "/assets/uploads/permisos/equipos/"+temp;
	var txt = "<input type='hidden' id='val_equipo_anexo' value ='"+temp+"'>";
	$("#errorSubirEquipoAnexo").html("<span class='color:#000'><a href='"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);

    var temp = datosEquipos[ev.target.dataset.idIndextblmodequipos].fotografiaRF;
	var archivo = "/assets/uploads/permisos/equipos/"+temp;
	var txt = "<input type='hidden' id='val_equipo_rf' value ='"+temp+"'>";
	$("#errorSubirEquipoRF").html("<span class='color:#000'><a href='"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
	

    $(btnSubirEquipo).on('click', function (ev) {
        $(btnSubirEquipo).val("Actualizar documento")
        per.previsualizar_modificar_equipo(fotoFacturaEquipo)
    })

    $(btnSubirEquipoAnexo).on('click', function (ev) {
        $(btnSubirEquipoAnexo).val("Actualizar Anexo")
        per.previsualizar_modificar_equipo_anexo(fotoEquipoAnexo)
    })

    $(btnSubirEquipoRF).on('click', function (ev) {
        $(btnSubirEquipoRF).val("Actualizar RF")
        per.previsualizar_modificar_equipo_rf(fotoEquipoRF)
    })

    datosEquipos.splice(ev.target.dataset.idIndextblmodequipos, 1);
    DTEquipo.row($(this).parents('tr')).remove().draw();

    let elements = $('.modificar-equipo');
    for (let index = ev.target.dataset.idIndextblmodequipos; index < elements.length; index++) {
        num = elements[index].dataset.id;
        if (num != 0)
            num = num - 1;
        elements[index].dataset.id = num;
    };
})
$(tabMaterial).on('click', '.modificar-material', function (ev) {
    if(edicion_material == 1){
        $(modal_error).css('margin-top', ajuste_altura_modal(ev));
        peticion_fallida("Se encuentra en edición otro registro");
        return false
    }
    edicion_material = 1

    responsableMaterial.value = datosMaterial[ev.target.dataset.idIndextblmodmaterial].responsable
    tipoMaterial.value = datosMaterial[ev.target.dataset.idIndextblmodmaterial].tipomaterial
    tipoMedida.value = datosMaterial[ev.target.dataset.idIndextblmodmaterial].tipomedida
    cantidad.value = datosMaterial[ev.target.dataset.idIndextblmodmaterial].cantidad
    descripcion.value = datosMaterial[ev.target.dataset.idIndextblmodmaterial].descripcion
    fotoMaterial = datosMaterial[ev.target.dataset.idIndextblmodmaterial].fotografiaMaterial

    //datosMaterial.splice(ev.target.dataset.idIndextblmodmaterial, 1);
    datosMaterial[ev.target.dataset.idIndextblmodmaterial].opcion = 2
    tr = $(this).parents('tr').closest('tr').addClass('hide');
    //DTMaterial.row($(this).parents('tr')).remove().draw();
    posicionIndex = ev.target.dataset.idIndextblmodmaterial

    /*let elements = $('.modificar-material');
    for (let index = ev.target.dataset.idIndextblmodmaterial; index < elements.length; index++) {
        num = elements[index].dataset.id;
        if (num != 0)
            num = num - 1;
        elements[index].dataset.id = num;
    };*/

    $(btnSubirMaterial).on('click', function (ev) {
        $(btnSubirMaterial).val("Actualizar documento")
        per.previsualizar_modificar_material(fotoMaterial)
    })

    $(errortipoMaterial).html("")
    $(errortipoMedida).html("")
    $(errorcantidad).html("")
    $(errordescripcion).html("")
})
$(tabVehiculos).on('click', '.modificar-vehiculo', function (ev) {
    if(edicion_vehiculo == 1){
        $(modal_error).css('margin-top', ajuste_altura_modal(ev));
        peticion_fallida("Se encuentra en edición otro registro");
        return false
    }
    edicion_vehiculo = 1
    
    noPlaca.value = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].noPlaca
    noSerieVehiculo.value = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].noSerie
    noMotor.value = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].noMotor
    marcaVehiculo.value = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].marca
    modeloVehicuo.value = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].modelo
    anio.value = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].anio
    color.value = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].color
    tipoVehiculo.value = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].tipoVehiculo
    tipoTarjetaCirculacion.value = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].tipoTarCircu
    noTarjeta.value = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].noTarjeta
    //vigenciaTarjeta.value = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].vigenciaTarjete
    //tipodocumentoVeh.value = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].tipoDocumento
    //noFacturaVeh.value = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].noFactura
    //fotoFacturaVehiculo = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].documentoFactura
    aseguradorasVeh.value = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].aseguradora
    noPoliza.value = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].noPoliza
    vigenciaPoliza.value = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].vigenciaPoliza
    periodoPago.value = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].periodoPago
    periodoCobFechaInicio.value = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].periodoFechaInicio
    periodoCobFechaFin.value = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].periodoFechaFin
    //estatusVehiculo.value        = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].estatusVehiculo
    //selChofer.value = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].chofer
    fotoLateralVehiculo = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].fotografiaLateral
    fotoPlacaVehiculo = datosVehiculos[ev.target.dataset.idIndextblmodvehiculos].fotografiaPlaca
    //btnSubirFacturaVehiculo.value = "Actualizar documento"
    btnSubirVehiculo.value = "Actualizar foto"

    /*var temp = fotoFacturaVehiculo;var archivo = temp;var arc = temp.split("/");temp = arc[4];
	var txt = "<input type='hidden' id='val_factura' value ='"+temp+"'>";  
	$("#errorSubirFacturaVehiculo").html("<span class='color:#000'><a  id='tab_factura' href='/"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);	*/		
	
	var temp = fotoLateralVehiculo;var archivo = temp;var arc = temp.split("/");temp = arc[4];
	var txt = "<input type='hidden' id='val_lateral' value ='"+temp+"'>";  
	$("#errorSubirFotoLat").html("<span class='color:#000'><a id='tab_lateral' href='/"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
	
	var temp = fotoPlacaVehiculo;var archivo = temp;var arc = temp.split("/");temp = arc[4];
	var txt = "<input type='hidden' id='val_placa' value ='"+temp+"'>";  
	$("#errorSubirFotoPla").html("<span class='color:#000'><a id='tab_placa' href='/"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);

    /*$(btnSubirFacturaVehiculo).on('click', function (ev) {
        per.previsualizar_modificar_facturaVehiculo(fotoFacturaVehiculo)
    })*/
    $(btnSubirVehiculo).on('click', function (ev) {
        per.previsualizar_modificar_lateralVehiculo(fotoLateralVehiculo)
    })
    $(btnSiguienteAdjuntarVehiculo).on('click', function (ev) {
        per.previsualizar_modificar_placaVehiculo(fotoPlacaVehiculo)
    })

    if(actualizarDatosVehiculos.length > 0 ){
        var index = actualizarDatosVehiculos.findIndex(function(element) {
            return element.serie == noSerieVehiculo.value
        });
        actualizarDatosVehiculos.splice(index, 1)
    }

    datosVehiculos[ev.target.dataset.idindextbldelvehiculo].opcion = 2
    posicionIndex = ev.target.dataset.idindextbldelvehiculo
    //datosVehiculos.splice(ev.target.dataset.idIndextblmodvehiculos, 1);
    tr = $(this).parents('tr').closest('tr').addClass('hide');
    //DTVehiculo.row($(this).parents('tr')).remove().draw();

    /*let elements = $('.modificar-vehiculo');
    for (let index = ev.target.dataset.idIndextblmodvehiculos; index < elements.length; index++) {
        num = elements[index].dataset.id;
        if (num != 0)
            num = num - 1;
        elements[index].dataset.id = num;
    };*/

    $(errornoPlaca).html("")
    $(errornoSerieVehiculo).html("")
    $(errornoMotor).html("")
    $(errortipoVehiculo).html("")
    $(errortipoTarjetaCirculacion).html("")
    $(errornoTarjeta).html("")
    //$(errorvigenciaTarjeta).html("")
    //$(errortipodocumentoVeh).html("")
    //$(erroradjuntarVehiculoFactura).html("")
    $(erroraseguradorasVeh).html("")
    $(errornoPoliza).html("")
    $(errorvigenciaPoliza).html("")
    $(errorperiodoPago).html("")
    $(errorperiodoCobFechaInicio).html("")
    $(errorperiodoCobFechaFin).html("")
    //$(errorestatusVehiculo).html("")
    //$(errorselChofer).html("")
    //$(errorSubirFacturaVehiculo).html("")
    $(errorSubirFotoVehiculo).html("")

})

function spinner_buttons(id, mensaje, activo = false) {
    if (activo) {
        document.getElementById(id).innerHTML = '<span class="spinner-border-button" role="status" aria-hidden="true"></span>&nbsp;' + mensaje;
    } else {
        document.getElementById(id).innerHTML = mensaje;
    }
}

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
        window.location.href = base_url + '/Permisos/Ctrl_Permisos/index_autorizadores';
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
    let indexPersonal = datosPersonal.findIndex(e => e.chofer === 1)
    let siguiente = $(this).data('orden')
    if ((siguiente != 1 && datosPersonal.length == 0) || (indexPersonal == -1 && siguiente == 4)) {
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

function previsualizar_archivo(files,capa){
	
		var num = (files.length)-1;
		
        var fileReader = new FileReader();
        var file = files[num].getNative();
        $("#"+capa).html('<div></div>');
        fileReader.onload = () => {
            var TheFileContents = fileReader.result;
            if (file.type == 'application/pdf') {
                $("#"+capa).css({"overflow":"", "height":"", "overflow-y":""});
                $("#"+capa).html('<object> <embed src="'+TheFileContents+'" width="100%" height="300px"/></object>');
            } else {
                $("#"+capa).css({"overflow":"hidden", "height":"300px", "overflow-y":"scroll"});
                $("#"+capa).html('<div class="img-zoom-container"><img id="myimage" width="100%" src="' + TheFileContents + '"/>');
 
            }
        };
        fileReader.readAsDataURL(file);
}
        

 
var upDoc = new plupload.Uploader({
    browse_button: 'adjuntarIdentificacion', // this can be an id of a DOM element or the DOM element itself
    url: base_url+'upload/uploadPermisos/personal',
    chunk_size: '1mb',
    max_file_count: 1,
    multi_selection: false,
    unique_names: true,
    multipart_params: {     [csrf.name] : csrf.value  },
    filters: {max_file_size : '20mb', mime_types: [{ title: "Jpg", extensions: "jpg" },{ title: "PNG", extensions: "png" },{ title: "Pdf", extensions: "pdf" },{ title: "Jpeg", extensions: "jpeg" }]},
    init: {
        PostInit: function () { document.getElementById('btnAceptarAdjuntarIdentificacion').onclick = function () { upDoc.start();return false;}},
        Error: function(up, err) {if(err.code == -600)$(erroradjuntarContrato).html("El maximo tamañ±o de archivo es de 20mb")},
        Browse: function (up) { if (up.files.length > 0) up.removeFile(up.files[0]);         },
        FilesAdded: function (up, files) {  previsualizar_archivo(up.files,"pdfViewerIdentificacion"); },			
        UploadProgress: function (up, file) {			
            var span = document.getElementById('errorSubirIdentificacion'); //Capa muestra avance
            span.innerHTML = '<span style="color:#000;"> Cargando archivo: ' + file.percent + '%</span>';            
        },
		BeforeUpload: function (up, file) {
             
        },
        FileUploaded: function (up, file, info) {
			var archivo = "/assets/uploads/permisos/personal/"+file.target_name;
			var txt = "<input type='hidden' id='val_identificacion' value ='"+file.target_name+"'>";
			$("#errorSubirIdentificacion").html("<span class='color:#000'><a href='"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
            info = JSON.parse(info.response)	
        },
    }
});upDoc.init();


// Upload Subir PErsonal
var uppersona = new plupload.Uploader({
    browse_button: 'adjuntarPersonal', // this can be an id of a DOM element or the DOM element itself
    url: base_url+'upload/uploadPermisos/personal',
    chunk_size: '1mb',
    max_file_count: 1,
    multi_selection: false,
    unique_names: true,
    multipart_params: {     [csrf.name] : csrf.value  },
    filters: {max_file_size : '20mb', mime_types: [{ title: "Jpg", extensions: "jpg" },{ title: "PNG", extensions: "png" }]},
    init: {
        PostInit: function () { document.getElementById('btnAceptarAdjuntarPersonal').onclick = function () { uppersona.start();return false;}},
        Error: function(up, err) {if(err.code == -600)$(erroradjuntarContrato).html("El maximo tamañ±o de archivo es de 20mb")},
        Browse: function (up) { if (up.files.length > 0)                up.removeFile(up.files[0]);         },
        FilesAdded: function (up, files) {  previsualizar_archivo(up.files,"pdfViewerPersonal"); },			
        UploadProgress: function (up, file) {			
            var span = document.getElementById('errorSubirPersonal'); //Capa muestra avance
            span.innerHTML = '<span style="color:#000;"> Cargando archivo: ' + file.percent + '%</span>';            
        },
        FileUploaded: function (up, file, info) {
			var archivo = "/assets/uploads/permisos/personal/"+file.target_name;
			var txt = "<input type='hidden' id='val_personal' value ='"+file.target_name+"'>";
			$("#errorSubirPersonal").html("<span class='color:#000'><a href='"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
            info = JSON.parse(info.response)	
        },
    }
});uppersona.init();

// Upload Subir Licencia
var uplicencia = new plupload.Uploader({
    browse_button: 'adjuntarLicencia', // this can be an id of a DOM element or the DOM element itself
    url: base_url+'upload/uploadPermisos/personal',
    chunk_size: '1mb',
    max_file_count: 1,
    multi_selection: false,
    unique_names: true,
    multipart_params: {     [csrf.name] : csrf.value  },
    filters: {max_file_size : '20mb', mime_types: [{ title: "Jpg", extensions: "jpg" },{ title: "PNG", extensions: "png" }]},
    init: {
        PostInit: function () { document.getElementById('btnAceptarAdjuntarLicencia').onclick = function () { uplicencia.start();return false;}},
        Error: function(up, err) {if(err.code == -600)$(erroradjuntarContrato).html("El maximo tamañ±o de archivo es de 20mb")},
        Browse: function (up) { if (up.files.length > 0)                up.removeFile(up.files[0]);         },
        FilesAdded: function (up, files) {  previsualizar_archivo(up.files,"pdfViewerLicencia"); },			
        UploadProgress: function (up, file) {			
            var span = document.getElementById('errorSubirLicencia'); //Capa muestra avance
            span.innerHTML = '<span style="color:#000;"> Cargando archivo: ' + file.percent + '%</span>';            
        },
        FileUploaded: function (up, file, info) {
			var archivo = "/assets/uploads/permisos/personal/"+file.target_name;
			var txt = "<input type='hidden' id='val_licencia' value ='"+file.target_name+"'>";
			$("#errorSubirLicencia").html("<span class='color:#000'><a href='"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
            info = JSON.parse(info.response)	
        },
    }
});uplicencia.init();

var upadicional = new plupload.Uploader({
    browse_button: 'adjuntarAdicional', // this can be an id of a DOM element or the DOM element itself
    url: base_url+'upload/uploadPermisos/personal',
    chunk_size: '1mb',
    max_file_count: 1,
    multi_selection: false,
    unique_names: true,
    multipart_params: {     [csrf.name] : csrf.value  },
    filters: {max_file_size : '20mb', mime_types: [{ title: "Jpg", extensions: "jpg" },{ title: "PNG", extensions: "png"}, {extensions: "pdf"}, {extensions: "PDF"}]},
    init: {
        PostInit: function () { document.getElementById('btnAceptarAdjuntarAdicional').onclick = function () { upadicional.start();return false;}},
        Error: function(up, err) {if(err.code == -600)$(erroradjuntarContrato).html("El maximo tamañ±o de archivo es de 20mb")},
        Browse: function (up) { if (up.files.length > 0)                up.removeFile(up.files[0]);         },
        FilesAdded: function (up, files) {  previsualizar_archivo(up.files,"pdfViewerAdicionales"); },			
        UploadProgress: function (up, file) {			
            var span = document.getElementById('errorSubirAdicional'); //Capa muestra avance
            span.innerHTML = '<span style="color:#000;"> Cargando archivo: ' + file.percent + '%</span>';            
        },
        FileUploaded: function (up, file, info) {
            let datos = {
                idimagen: 0,
                fotografia: file.target_name
            }
            documentosAdicionales.push(datos)
            documentosAdicionalesAux.push(datos)
            DTDocAdicionales.row.add([
                '<center><a href="'+base_url+'assets/uploads/permisos/personal/'+file.target_name+'" target="_blank" style="font-size: 18px;">Visualizar archivo</a></center>',
                '<div class="d-flex justify-content-center" >' +
                    '<div class="p-1">' +
                        '<a href="#!" title="Eliminar">' +
                            '<span class="glyphicon glyphicon-trash eliminar" data-id="' + (documentosAdicionalesAux.length - 1) + '" data-idimagen="" data-nombre="'+file.target_name+'"></span>' +
                        '</a>' +
                    '</div>' +
                '</div>'
            ]).draw(false)		
            $("#errorSubirAdicional").html("")
            info = JSON.parse(info.response)	
        },
    }
});upadicional.init()


// Upload Subir Equipo
var upequiepo = new plupload.Uploader({
    browse_button: 'adjuntarEquipo', // this can be an id of a DOM element or the DOM element itself
    url: base_url+'upload/uploadPermisos/equipos',
    chunk_size: '1mb',
    max_file_count: 1,
    multi_selection: false,
    unique_names: true,
    multipart_params: {     [csrf.name] : csrf.value  },
    filters: {max_file_size : '20mb', mime_types: [{ title: "Jpg", extensions: "jpg" },{ title: "PNG", extensions: "png"}, {extensions: "pdf"}, {extensions: "PDF"}]},
    init: {
        PostInit: function () { document.getElementById('btnAceptarAdjuntarEquipo').onclick = function () { upequiepo.start();return false;}},
        Error: function(up, err) {if(err.code == -600)$(erroradjuntarContrato).html("El maximo tamañ±o de archivo es de 20mb")},
        Browse: function (up) { if (up.files.length > 0)                up.removeFile(up.files[0]);         },
        FilesAdded: function (up, files) {  previsualizar_archivo(up.files,"pdfViewerEquipo"); },			
        UploadProgress: function (up, file) {			
            var span = document.getElementById('errorSubirFacturaEquipo'); //Capa muestra avance
            span.innerHTML = '<span style="color:#000;"> Cargando archivo: ' + file.percent + '%</span>';            
        },
        FileUploaded: function (up, file, info) {
			var archivo = "/assets/uploads/permisos/equipos/"+file.target_name;
			var txt = "<input type='hidden' id='val_equipo' value ='"+file.target_name+"'>";
			$("#errorSubirFacturaEquipo").html("<span class='color:#000'><a href='"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
            info = JSON.parse(info.response)	
        },
    }
});upequiepo.init();

// Upload Subir Equipo Anexo
var upequiepoAnexo = new plupload.Uploader({
    browse_button: 'adjuntarEquipoAnexo', // this can be an id of a DOM element or the DOM element itself
    url: base_url+'upload/uploadPermisos/equipos',
    chunk_size: '1mb',
    max_file_count: 1,
    multi_selection: false,
    unique_names: true,
    multipart_params: {     [csrf.name] : csrf.value  },
    filters: {max_file_size : '20mb', mime_types: [{ title: "Jpg", extensions: "jpg" },{ title: "PNG", extensions: "png"}, {extensions: "pdf"}, {extensions: "PDF"}]},
    init: {
        PostInit: function () { document.getElementById('btnAceptarAdjuntarEquipoAnexo').onclick = function () { upequiepoAnexo.start();return false;}},
        Error: function(up, err) {if(err.code == -600)$(erroradjuntarContrato).html("El maximo tamañ±o de archivo es de 20mb")},
        Browse: function (up) { if (up.files.length > 0)                up.removeFile(up.files[0]);         },
        FilesAdded: function (up, files) {  previsualizar_archivo(up.files,"pdfViewerEquipoAnexo"); },			
        UploadProgress: function (up, file) {			
            var span = document.getElementById('errorSubirEquipoAnexo'); //Capa muestra avance
            span.innerHTML = '<span style="color:#000;"> Cargando archivo: ' + file.percent + '%</span>';            
        },
        FileUploaded: function (up, file, info) {
			var archivo = "/assets/uploads/permisos/equipos/"+file.target_name;
			var txt = "<input type='hidden' id='val_equipo_anexo' value ='"+file.target_name+"'>";
			$("#errorSubirEquipoAnexo").html("<span class='color:#000'><a href='"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
            info = JSON.parse(info.response)	
        },
    }
});upequiepoAnexo.init();

// Upload Subir Equipo RF
var upequiepoRF = new plupload.Uploader({
    browse_button: 'adjuntarEquipoRF', // this can be an id of a DOM element or the DOM element itself
    url: base_url+'upload/uploadPermisos/equipos',
    chunk_size: '1mb',
    max_file_count: 1,
    multi_selection: false,
    unique_names: true,
    multipart_params: {     [csrf.name] : csrf.value  },
    filters: {max_file_size : '20mb', mime_types: [{ title: "Jpg", extensions: "jpg" },{ title: "PNG", extensions: "png"}, {extensions: "pdf"}, {extensions: "PDF"}]},
    init: {
        PostInit: function () { document.getElementById('btnAceptarAdjuntarEquipoRF').onclick = function () { upequiepoRF.start();return false;}},
        Error: function(up, err) {if(err.code == -600)$(erroradjuntarContrato).html("El maximo tamañ±o de archivo es de 20mb")},
        Browse: function (up) { if (up.files.length > 0)                up.removeFile(up.files[0]);         },
        FilesAdded: function (up, files) {  previsualizar_archivo(up.files,"pdfViewerEquipoRF"); },			
        UploadProgress: function (up, file) {			
            var span = document.getElementById('errorSubirEquipoRF'); //Capa muestra avance
            span.innerHTML = '<span style="color:#000;"> Cargando archivo: ' + file.percent + '%</span>';            
        },
        FileUploaded: function (up, file, info) {
			var archivo = "/assets/uploads/permisos/equipos/"+file.target_name;
			var txt = "<input type='hidden' id='val_equipo_rf' value ='"+file.target_name+"'>";
			$("#errorSubirEquipoRF").html("<span class='color:#000'><a href='"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
            info = JSON.parse(info.response)	
        },
    }
});upequiepoRF.init()

// Upload Subir Material
var upmaterial = new plupload.Uploader({
    browse_button: 'adjuntarMaterial', // this can be an id of a DOM element or the DOM element itself
    url: base_url+'upload/uploadPermisos/materiales',
    chunk_size: '1mb',
    max_file_count: 1,
    multi_selection: false,
    unique_names: true,
    multipart_params: {     [csrf.name] : csrf.value  },
    filters: {max_file_size : '20mb', mime_types: [{ title: "Jpg", extensions: "jpg" },{ title: "PNG", extensions: "png"}, {extensions: "pdf"}, {extensions: "PDF"}]},
    init: {
        PostInit: function () { document.getElementById('btnAceptarAdjuntarMaterial').onclick = function () { upmaterial.start();return false;}},
        Error: function(up, err) {if(err.code == -600)$(erroradjuntarContrato).html("El maximo tamañ±o de archivo es de 20mb")},
        Browse: function (up) { if (up.files.length > 0)                up.removeFile(up.files[0]);         },
        FilesAdded: function (up, files) {  previsualizar_archivo(up.files,"pdfViewerMaterial"); },			
        UploadProgress: function (up, file) {			
            var span = document.getElementById('errorSubirMaterial'); //Capa muestra avance
            span.innerHTML = '<span style="color:#000;"> Cargando archivo: ' + file.percent + '%</span>';            
        },
        FileUploaded: function (up, file, info) {
			var archivo = "/assets/uploads/permisos/materiales/"+file.target_name;
			var txt = "<input type='hidden' id='val_material' value ='"+file.target_name+"'>";
			$("#errorSubirMaterial").html("<span class='color:#000'><a href='"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
            info = JSON.parse(info.response)	
        },
    }
});upmaterial.init()


// Upload Subir Factura
/*var upfactura = new plupload.Uploader({
    browse_button: 'adjuntarVehiculoFactura', // this can be an id of a DOM element or the DOM element itself
    url: base_url+'upload/uploadPermisos/vehiculos',
    chunk_size: '1mb',
    max_file_count: 1,
    multi_selection: false,
    unique_names: true,
    multipart_params: {     [csrf.name] : csrf.value  },
    filters: {max_file_size : '20mb', mime_types: [{ title: "Jpg", extensions: "jpg" },{ title: "PNG", extensions: "png" }]},
    init: {
        PostInit: function () { document.getElementById('btnAceptarAdjuntarVehiculoFactura').onclick = function () { upfactura.start();return false;}},
        Error: function(up, err) {if(err.code == -600)$(erroradjuntarContrato).html("El maximo tamañ±o de archivo es de 20mb")},
        Browse: function (up) { if (up.files.length > 0)                up.removeFile(up.files[0]);         },
        FilesAdded: function (up, files) {  previsualizar_archivo(up.files,"pdfViewerVehiculoFactura"); },			
        UploadProgress: function (up, file) {			
            var span = document.getElementById('errorSubirFacturaVehiculo'); //Capa muestra avance
            span.innerHTML = '<span style="color:#000;"> Cargando archivo: ' + file.percent + '%</span>';            
        },
        FileUploaded: function (up, file, info) {
			var archivo = "/assets/uploads/permisos/vehiculos/"+file.target_name;
			var txt = "<input type='hidden' id='val_factura' value ='"+file.target_name+"'>";
			$("#errorSubirFacturaVehiculo").html("<span class='color:#000'><a  id='tab_factura' href='"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
            info = JSON.parse(info.response)	
        },
    }
});upfactura.init();*/

 
// Upload VEhiculo lateral
var uplate = new plupload.Uploader({
    browse_button: 'ajuntarLateralVehiculo', // this can be an id of a DOM element or the DOM element itself
    url: base_url+'upload/uploadPermisos/vehiculos',
    chunk_size: '1mb',
    max_file_count: 1,
    multi_selection: false,
    unique_names: true,
    multipart_params: {     [csrf.name] : csrf.value  },
    filters: {max_file_size : '20mb', mime_types: [{ title: "Jpg", extensions: "jpg" },{ title: "PNG", extensions: "png" }]},
    init: {
        PostInit: function () { $(btnSiguienteAdjuntarVehiculo).hide(); document.getElementById('btnAceptarAdjuntarVechiculo').onclick = function () { uplate.start();return false;}},
        Error: function(up, err) {if(err.code == -600)$(erroradjuntarContrato).html("El maximo tamañ±o de archivo es de 20mb")},
        Browse: function (up) { if (up.files.length > 0)                up.removeFile(up.files[0]);         },
        FilesAdded: function (up, files) {  $(btnSiguienteAdjuntarVehiculo).show(); previsualizar_archivo(up.files,"pdfViewerVehiculo"); },		
			BeforeUpload: function (up, file) {
            // Called right before the upload for a given file starts, can be used to cancel it if required
            $(modalVehiculo).modal('toggle');
			        },		
        UploadProgress: function (up, file) {			
            var span = document.getElementById('errorSubirFotoLat'); //Capa muestra avance
            span.innerHTML = '<span style="color:#000;"> Cargando archivo: ' + file.percent + '%</span>';            
        },
        FileUploaded: function (up, file, info) {
			var archivo = "/assets/uploads/permisos/vehiculos/"+file.target_name;
			var txt = "<input type='hidden' id='val_lateral' value ='"+file.target_name+"'>";
			$("#errorSubirFotoLat").html("<span class='color:#000'><a id='tab_lateral' href='"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
            info = JSON.parse(info.response)	
        },
    }
});uplate.init();


// Upload VEhiculo placa
var upplaca = new plupload.Uploader({
    browse_button: 'adjuntarPlacaVehiculo', // this can be an id of a DOM element or the DOM element itself
    url: base_url+'upload/uploadPermisos/vehiculos',
    chunk_size: '1mb',
    max_file_count: 1,
    multi_selection: false,
    unique_names: true,
    multipart_params: {     [csrf.name] : csrf.value  },
    filters: {max_file_size : '20mb', mime_types: [{ title: "Jpg", extensions: "jpg" },{ title: "PNG", extensions: "png" }]},
    init: {
        PostInit: function () { $(btnAceptarAdjuntarVechiculo).hide(); $( "#btnAceptarAdjuntarVechiculo" ).click(function() {

                upplaca.start();
                return false;
            });},
        Error: function(up, err) {if(err.code == -600)$(erroradjuntarContrato).html("El maximo tamañ±o de archivo es de 20mb")},
        Browse: function (up) { if (up.files.length > 0)                up.removeFile(up.files[0]);         },
        FilesAdded: function (up, files) {   $(btnSiguienteAdjuntarVehiculo).hide();
            $(btnAceptarAdjuntarVechiculo).show(); previsualizar_archivo(up.files,"pdfViewerVehiculo"); },			
        UploadProgress: function (up, file) {			
            var span = document.getElementById('errorSubirFotoPla'); //Capa muestra avance
            span.innerHTML = '<span style="color:#000;"> Cargando archivo: ' + file.percent + '%</span>';            
        },
        FileUploaded: function (up, file, info) {
			var archivo = "/assets/uploads/permisos/vehiculos/"+file.target_name;
			var txt = "<input type='hidden' id='val_placa' value ='"+file.target_name+"'>";
			$("#errorSubirFotoPla").html("<span class='color:#000'><a id='tab_placa' href='"+archivo+"' target='_blank'><i class='glyphicon glyphicon-cloud-download'> </i> &nbsp; Visualizar archivo</a></span>"+txt);			
            info = JSON.parse(info.response)	
        },
    }
});upplaca.init();
