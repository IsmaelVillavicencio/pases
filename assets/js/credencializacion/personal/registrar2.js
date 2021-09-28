let QrScanner
let DTIdentidades;
let DTImportar;
var datosPersonal = []

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
        this.obtener_puestos();
        this.obtener_areas();
        this.obtener_nacionalidades();
        this.obtener_paises();
        this.obtener_tipo_sangre();
        this.obtener_tipos_empleados();
        this.obtener_tipo_identificacion();
    }
    inicio(){
        DTIdentidades = $(tabPersonas).DataTable( {
            "language": {
            "url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            }
        });
        DTImportar = $(tabImportar).DataTable( {
            "language": {
            "url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            },
            "order": [[ 0, "asc" ]]
        });
        curp.addEventListener("keyup",(ev) => {
            ev.target.value = ev.target.value.toUpperCase()
        });
        rfc.addEventListener("keyup",(ev) => {
            ev.target.value = ev.target.value.toUpperCase()
        });
        
        curp.addEventListener("change",this.validar_curp)
        rfc.addEventListener("change",this.validar_rfc)
        nss.addEventListener("change",this.validar_nss)
        numidenti.addEventListener("change",this.validar_identificacion)
        numTelefono.addEventListener("change",this.validar_telefono)
        selTipoIdentificacion.addEventListener("change",this.validar_tipo_identificacion)
        clavepatronal.addEventListener("change",this.validar_clavepatronal)
        fechaexpiracion.addEventListener("change",this.validar_fechaexpiracion)
        SelTipoPersona.addEventListener("change",this.validar_outsorcing);
        //adjuntarIfe.addEventListener("change",this.previsualizar_ife);
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
        /*
        */
        $(".noespecial").on('keydown', function(ev){
            if(ev.keyCode != 16){
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_alphanumeric_s(ev.key,1,50,1);
                if(!resultado.resp){
                    ev.preventDefault();
                }
            }
        });
        
        correoElectronico.addEventListener("change",this.validar_correo);
        correoElectronico.addEventListener('keyup',() => {
            //btnGuardar.removeEventListener("click",this.almacena);
        })
        /*
        */
        
        btnAceptarAdjuntarIfe.addEventListener('click',(ev)=>{
            if(auxAdjuntarIfe.value != ""){
                btnSubirIfe.value = 'Actualizar documento'
            }
            
        })
        btnAceptarAdjuntarFoto.addEventListener('click',(ev)=>{
            if(auxAdjuntarFoto.value != ""){
                btnSubirFoto.value = 'Actualizar foto'
            }
            
        })
        btnsubirexcel.addEventListener('click',(ev)=>{
            /*
            $(modealExcel).modal();
            */
            $(modalExcel).modal()
        })
        btnSubirIfe.addEventListener('click',(ev)=>{
        /*
            if(adjuntarIfe.dataset.imagen){
                $(pdfViewerIfe).html('<img width="460" height="200" src="'+base_url+'/'+adjuntarIfe.dataset.imagen+'"/>');
            }else{
                pdfViewerIfe.innerHTML = ''
                erroradjuntarIfe.innerHTML = ''
            }
        */
            $(modalIfe).modal()
        })
        btnSubirFoto.addEventListener('click',(ev)=>{
            /*
            if(adjuntarFoto.dataset.imagen){
                $(pdfViewerFoto).html('<img width="460" height="200" src="'+base_url+'/'+adjuntarFoto.dataset.imagen+'"/>');
            }else{
                pdfViewerFoto.innerHTML = ''
                erroradjuntarFoto.innerHTML = ''
            }
            */
            $(modalFoto).modal()
        })
        btnGuardarExcel.addEventListener('click',(ev)=>{
            $(modal_confirmar_guardar_exe).modal();
        });

        let datosValidar = document.getElementsByClassName('validar');
        for (var i = 0; i < datosValidar.length; i++) {
            datosValidar[i].addEventListener('change', (ev) => {
                if(ev.target.value != ""){
                    $("#error"+ev.target.id).hide();
                }
            })
        }
        $(".noespecial").on('change', function(ev){
            let id = ev.target.id
            let valor = $("#"+id).val();
            let resultado = this.validaciones.caracteres_validos_alphanumeric_s(valor,1,50,1);
            if (!resultado.resp){
                let error = "error"+id;
                $("#"+error).show();
                $("#"+error).html("Información no válida");
            }
        });

        confirmar_salir_sin_guardar.addEventListener('click',(ev)=> {
            window.location.href = base_url + 'Credencializacion/Ctrl_Personal';
        });
        confirmar_guardar_exe.addEventListener('click',this.upload_excel)

        btnAdd.addEventListener("click",this.almacena)
        btnGuardar.addEventListener("click",this.confirmar_almacenamiento)
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
    previsualizar_archivo(files,capa){
        var num = (files.length)-1;
        var fileReader = new FileReader();
        var file = files[num].getNative();
        $("#pdfViewer"+capa).html('<div></div>');
        fileReader.onload = () => {
            var TheFileContents = fileReader.result;
            if (file.type == 'application/pdf') {
                $("#pdfViewer"+capa).css({"overflow":"", "height":"", "overflow-y":""});
                $("#pdfViewer"+capa).html('<object> <embed src="'+TheFileContents+'" width="100%" height="300px"/></object>');
            } else {
                $("#pdfViewer"+capa).css({"overflow":"hidden", "height":"300px", "overflow-y":"scroll"});
                $("#pdfViewer"+capa).html('<div class="img-zoom-container"><img id="myimage" width="100%" src="' + TheFileContents + '"/>');
                myimage.onload = function(){
                    imageZoom(this.width,this.height);
                }
            }
        };
        fileReader.readAsDataURL(file);
    }
    previsualizar_ife(){
        /*
        var fileReader = new FileReader();
        pdfViewerIfe.innerHTML = ''
        erroradjuntarIfe.innerHTML = ''

        var extencion = $(this)[0].files[0].name;
        if(extencion != ''){
            extencion = extencion.split(".");
            extencion = extencion[extencion.length-1];
        }


        var permitidos = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];
        if(!permitidos.includes($(this)[0].files[0].type) || extencion == 'jfif'){
            erroradjuntarIfe.innerHTML = "El archivo a subir debe ser un documento en PDF o imagen PNG o JPG"
            return false;
        }

        if(($(this)[0].files[0].size/1000000) > 2){
            erroradjuntarIfe.innerHTML = "El tamaño máximo permitido es de 2 MB"
            return false;
        }

        fileReader.onload = function() {
            var TheFileContents = fileReader.result;    
            $(pdfViewerIfe).html('<img width="460" height="200" src="'+TheFileContents+'"/>');
        };
        fileReader.readAsDataURL($(this)[0].files[0]);

        btnAceptarAdjuntarIfe.onclick = function() {
            if(fileReader != ""){
                $(errorSubirIfe).html("")
            }
        }
        */
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
                    $(selPuesto).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                });
            }
        }).fail( function(response) {
            
        });
    }
    obtener_areas(){
        $.ajax({
            url: base_url+'Catalogos/Ctrl_Areas/getByEstatus',
            type: 'GET',
            dataType: 'json',
            data : {
                estatus : 1
            },
            beforeSend: function(){
                $(selArea).append('<option value="">Seleccione</option>');
            },
            success: function(response){
                response.data.forEach(element => {
                    $(selArea).append('<option value="'+element.id_area+'">'+element.nombre_area+'</option>');
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
                    $(selNacionalidad).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                });
            }
        }).fail( function(response) {
            
        });
    }
    obtener_paises(){
        $.ajax({
            url: base_url+'Catalogos/Ctrl_Nacionalidades/getPaises',
            type: 'GET',
            dataType: 'json',
            data : {
                estatus : 1
            },
            success: function(response){
                response.data.forEach(element => {
                    $(selPais).append('<option value="'+element.id+'">'+element.nombre+'</option>');
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
                    $(tipoSangre).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                });
            }
        }).fail( function(response) {
            
        });
    }
    obtener_tipo_identificacion(){
        $.ajax({
            url: base_url+'Catalogos/Ctrl_TiposIdentificacion/getByEstatusCredencializacion',
            type: 'GET',
            dataType: 'json',
            global: false,
            data : {
                estatus : 1
            },
            success: function(response){
                response.data.forEach(element => {
                    $(selTipoIdentificacion).append('<option value="'+element.id+'" '+($(selTipoIdentificacion).data("id") == element.id ? 'selected' : '')+' data-nombre="'+element.nombre+'" >'+element.nombre+'</option>');
                });
            },
            complete: function(){
                if(selTipoIdentificacion.value == 1){
                    $(divClaveElector).show();
                    $(divPasaporte).hide();
                }else if(selTipoIdentificacion.value == 2){
                    $(divClaveElector).hide();
                    $(divPasaporte).show();
                }
            }
        }).fail(function(response){
            if(response.responseText=="Sesion"){
                error_sesion();
            }
        })
    }
    obtener_tipos_empleados(){
        $.ajax({
            url: base_url+'Catalogos/Ctrl_TiposEmpleados/getByEstatus',
            type: 'GET',
            dataType: 'json',
            data : {
                estatus : 1
            },
            success: function(response){
                response.data.forEach(element => {
                    if([1,2].includes(element.id)){
                        $(SelTipoPersona).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                    }
                });
            }
        }).fail( function(response) {
            
        });
    }
    validar_tipo_identificacion(){
        if ($("#SelTipoIdentificacion").val() != ""){
            errorSelTipoIdentificacion.style.display = "none"
            //alert('hola ');
        }
        numidenti.value = ""
        fechaexpiracion.value = ""
        archIfe.value = ""
        $('.divclaveelector').show();
        if ($('#selTipoIdentificacion').find(':selected').data('nombre') == 'INE'){
            $('.spanclaveident').html(" Clave de elector");
            $("#numidenti").attr('maxlength','18');
        } else if ($('#selTipoIdentificacion').find(':selected').data('nombre') == 'IFE'){
            $('.spanclaveident').html(" Clave de elector");
            $("#numidenti").attr('maxlength','18');
        } else if ($('#selTipoIdentificacion').find(':selected').data('nombre') == 'Pasaporte'){
            $('.spanclaveident').html(" Número de pasaporte:");
            $("#numidenti").attr('maxlength','12');
        } else if ($('#selTipoIdentificacion').find(':selected').data('nombre') == 'Certificado de Identidad'){
            $('.spanclaveident').html(" Número único de identidad:");
            $("#numidenti").attr('maxlength','15');
        }
        else{
            $('.divclaveelector').hide();
        }
    }
    validar_outsorcing(){
        if (SelTipoPersona.value == 2){
            $(".classoutsourcing").show();
            //var empresa = document.getElementById("empresa");
            empresa.classList.add("validar");
            clavepatronal.classList.add("validar");
        }
        else{
            clavepatronal.readOnly = false;
            empresa.readOnly = false;
            empresa.value = ""
            clavepatronal.value = ""
            empresa.classList.remove("validar");
            clavepatronal.classList.remove("validar");
            $(".classoutsourcing").hide();
        }
    }
    validar_clavepatronal(){
        $.ajax({
            url: base_url+'Credencializacion/Ctrl_Personal/getByClavePatronal',
            type: 'GET',
            dataType: 'json',
            global: false,
            data : {
                clave_patronal : clavepatronal.value
            },
            success: function(response){
                console.log(response);
                if(response.data == null){
                    empresa.readOnly = false
                    empresa.value = ''
                    idempresa.value = 0
                }
                else{
                    idempresa.value = response.data.id
                    empresa.value = response.data.nombre
                    empresa.readOnly = true;
                }
                /*
                if(response.data == null){
                    this.validaciones = new VALIDACIONES();

                    $("#errorcurp").html("Campo obligatorio");
                    $("#errorcurp").hide();
                    $("#errorfechaNacimiento").hide();
                    $("#errorsexo").hide();
                    $("#errorselNacionalidad").hide();
            
                    let resultado = this.validaciones.curp(curp.value);
                    if(!resultado.resp){
                        $("#errorcurp").html(resultado.message);
                        $("#errorcurp").show();
                        fechaNacimiento.value=""
                        sexo.value=""
                        selNacionalidad.value=""
                        return false;
                    }
                    fechaNacimiento.value = resultado.fecha_nacimiento;
                    sexo.value = resultado.sexo;
                    if(!resultado.nacionalidad){
                        $(selNacionalidad).removeAttr("disabled");
                        $(selPais).removeAttr("disabled");
                    }
                    else
                        selNacionalidad.value = resultado.nacionalidad;
                }else{
                    curp.value="";
                    nombre.value = "";
                    primer_apellido.value = "";
                    segundo_apellido.value = "";

                    $("#errorcurp").html("Ya existe un registro asociado a la CURP");
                    $("#errorcurp").show();
                }
                */
            }
        }).fail( function(response) {
            if(response.responseText=="Sesion"){
                error_sesion();
            }
        }); 
    }
    validar_telefono(){
        if(numTelefono.value.length != 10){
            $(errornumTelefonoLongitud).show();
        }
    }
    validar_rfc(){
        var valid = this.validaciones = new VALIDACIONES();
        $("#errorrfc2").hide();
        $("#errorrfc2").html("");
        let resultado = valid.rfc(1, rfc.value);
        if(!resultado.resp){
            $("#errorrfc2").html('Información no válida');
            $("#errorrfc2").show();
            rfc.value = ""
        }
        $.ajax({
            url: base_url+'Credencializacion/Ctrl_Personal/validarDatos',
            type: 'GET',
            dataType: 'json',
            global: false,
            data : {
                curp : curp.value,
                nss : nss.value,
                rfc : rfc.value
            },
            success: function(response){
                if (response.rfc == 1){
                    $("#errorrfc2").show();
                    $("#errorrfc2").html("RFC previamente registrado");
                }
            }
        }); 
    }
    validar_identificacion(){
        var valid = this.validaciones = new VALIDACIONES();
        let carvalidentmin = 16;
        let carvalidentmax = 18;
        let tiporango = 1;
        $(errornumidenti).html("");
        let resultado = {resp : true}
        if (!numidenti.value){
            $(errornumidenti).html("Campo obligatorio");
        }
        else if ($('#selTipoIdentificacion').find(':selected').data('nombre') == 'INE' || $('#selTipoIdentificacion').find(':selected').data('nombre') == 'IFE'){
            resultado = valid.caracteres_validos_alphanumeric(numidenti.value, carvalidentmin, carvalidentmax, 2);
        }
        else if ($('#selTipoIdentificacion').find(':selected').data('nombre') == 'Pasaporte'){
            carvalidentmin = 0;
            carvalidentmax = 12;
            resultado = valid.caracteres_validos_alphanumeric(numidenti.value, carvalidentmin, carvalidentmax, 1);
        }
        else if ($('#selTipoIdentificacion').find(':selected').data('nombre') == 'Certificado de Identidad'){
            carvalidentmin = 0;
            carvalidentmax = 15;
            resultado = valid.caracteres_validos_alphanumeric(numidenti.value, carvalidentmin, carvalidentmax, 1);
        }
        if (!resultado.resp)
            $(errornumidenti).html("Información no válida");
        //caracteres_validos_alphanumeric(valor, long_min, long_max, tipo_rango){

        /*
        else if ($('#selTipoIdentificacion').find(':selected').data('nombre') == 'INE')
            carvalident = 11;
        else if ($('#selTipoIdentificacion').find(':selected').data('nombre') == 'INE')
            carvalident = 11;
        else if ($('#selTipoIdentificacion').find(':selected').data('nombre') == 'INE')
            carvalident = 11;
        else if ($('#selTipoIdentificacion').find(':selected').data('nombre') == 'INE')
            carvalident = 11;
        $(errornumidenti).html("");
        */




        /*
        if (!resultado.resp){
            $("#errornss").html('Información no válida');
            $(errornss).show();
        }
        else if(nss.value.length != 11){
            $("#errornss").html('Información no válida');
            $(errornss).show();
        }
        */
    }
    validar_fechaexpiracion(){
        var inputDate = new Date(fechaexpiracion.value);
        var todaysDate = new Date();
        //alert(errorfechaNacimiento2.value);
        $("#errorfechaNacimiento2").html('');
        if (!fechaexpiracion.value){
            $("#errorfechaNacimiento2").html('Campo obligatorio');
        }
        if (inputDate.setHours(0,0,0,0) < todaysDate.setHours(0,0,0,0)){
            $("#errorfechaNacimiento2").html('Información no válida');
        }
    }
    validar_nss(){
        /*
        if(!nss.value.length || nss.value.length == 11){
            $(errornss).hide();
        }
        if(nss.value.length != 11){
            $("#errornss").html('El formato no es válido');
            $(errornss).show();
        }
        */
        var valid = this.validaciones = new VALIDACIONES();
        let resultado = valid.caracteres_validos_numericos(nss.value, 11);
        if(!nss.value.length || nss.value.length == 11){
            $(errornss).hide();
        }
        if (!resultado.resp){
            $("#errornss").html('Información no válida');
            $(errornss).show();
        }
        else if(nss.value.length != 11){
            $("#errornss").html('Información no válida');
            $(errornss).show();
        }
        $.ajax({
            url: base_url+'Credencializacion/Ctrl_Personal/validarDatos',
            type: 'GET',
            dataType: 'json',
            global: false,
            data : {
                curp : curp.value,
                nss : nss.value,
                rfc : rfc.value
            },
            success: function(response){
                if (response.nss == 1){
                    $("#errornss").show();
                    $("#errornss").html("NSS previamente registrado");
                }
            }
        }); 
    }
    validar_curp(){
        var valid = this.validaciones = new VALIDACIONES();
        idpersonal.value = '0';
        idcontacto.value = '0';
        fechaNacimiento.value=""
        sexo.value=""
        $("#errorcurp2").hide();
        $("#errorfechaNacimiento").hide();
        $("#errorsexo").hide();
        $("#errorselNacionalidad").hide();
        let resultado = valid.curp(curp.value);
        if(!resultado.resp){
            $("#errorcurp2").html(resultado.message);
            $("#errorcurp2").show();
            return false;
        }
        else{
            fechaNacimiento.value = resultado.fecha_nacimiento;
            sexo.value = resultado.sexo;
        }
        if(!resultado.nacionalidad){
            $(selNacionalidad).removeAttr("disabled");
            $(selPais).removeAttr("disabled");
            selNacionalidad.value = 2;
        }
        else{
            $(selNacionalidad).prop( "disabled", true );
            $(selPais).prop( "disabled", true );
            $(selPais).val(121).change();
            selNacionalidad.value = resultado.nacionalidad;
        }
        $.ajax({
            url: base_url+'Credencializacion/Ctrl_Personal/getByCURP',
            type: 'GET',
            dataType: 'json',
            global: false,
            data : {
                curp : curp.value,
                nss : nss.value,
                rfc : rfc.value
            },
            success: function(response){
                console.log(response);
                if (response.exist == 1){
                    $("#errorcurp2").show();
                    $("#errorcurp2").html("CURP previamente registrada");
                }
                else if(response.data != null){
                    idpersonal.value = response.data.id;
                    idcontacto.value = response.data.id_contacto;
                    curp.value = response.data.curp;
                    nss.value = response.data.nss ?? nss.value;

                    nombre.value = response.data.nombre ?? nombre.value;
                    primer_apellido.value = response.data.primer_apellido ?? primer_apellido.value;
                    segundo_apellido.value = response.data.segundo_apellido ?? segundo_apellido.value;
                    rfc.value = response.data.rfc ?? rfc.value;
                    //selNacionalidad.value = response.data.id_nacionalidad ?? selNacionalidad.value;
                    //tipoSangre.value = response.data.id_tipo_sangre ?? tipoSangre.value;
                    selArea.value = response.data.id_area ?? selArea.value;
                    //selTipoIdentificacion.value = response.data.id_tipo_identificacion ?? selTipoIdentificacion.value;
                    correoElectronico.value = response.data.correo ?? correoElectronico.value;
                    
                    numTelefono.value = response.data.telefono ?? numTelefono.value;

                    if (nss.value)
                        $("#errornss").hide();
                    if (nombre.value)
                        $("#errornombre").hide();
                    if (primer_apellido.value)
                        $("#errorprimer_apellido").hide();
                    if (segundo_apellido.value)
                        $("#errorsegundo_apellido").hide();
                    if (rfc.value)
                        $("#errorrfc").hide();
                    if (correoElectronico.value)
                        $("#errorcorreoElectronico").hide();
                    if (numTelefono.value)
                        $("#errornumTelefono").hide();
                    /*
                    if (response.data.id_empresa)
                        $(".classoutsourcing").show();
                    empresa.value = response.data.id_empresa ?? empresa.value;
                    */
                }
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

        //errorDocumento = false

        let resultado = this.validaciones.correo(ev.target.value);
        if(!resultado.resp){
            errorDocumento = true
            ev.target.value = "";
            $("#errorcorreoElectronico").html("Información no válida");
            $("#errorcorreoElectronico").show();
        }

    }
    regresar(){
        let validacion = true;
        let datosValidar = document.getElementsByClassName('form-control');
        for (var i = 0; i < datosValidar.length; i++) {
            if(datosValidar[i].value != ""){
                //alert(datosValidar[i].value);
                validacion = false;
            }
        }

        if(!validacion){
            pedir_confirmar_regresar();
            return false
        }
        window.location.href = base_url + 'Credencializacion/Ctrl_Personal';
    }
    upload_excel(){
        let formData = new FormData();
        var valor = $("#archexporta").val();
        formData.append("archivo",valor);
        if (valor != ""){
            $("#confirmar_guardar_exe").attr("disabled","true");
            $.ajax({
                url : base_url+'Credencializacion/Ctrl_Personal/importar_excel',
                type : 'POST',
                data : formData,
                global: false,
                processData: false,
                contentType: false,
                success : function(response) {
                    $("#modal_confirmar_guardar_exe").modal("hide");
                    csrf.value = response.token;
                    console.log(response);
                    if(response.status){
                        Personal.prototype.reiniciar_campos()
                        registro_exitoso(response.message);
                    }else{
                        peticion_fallida(response.message);
                        $("#archexporta").val("");
                    }
                    $("#confirmar_guardar_exe").attr("disabled","false");
                    $("#modal_confirmar_guardar_exe").modal("hide");
                    Personal.prototype.reiniciar_campos()
                },
                error: (xhr, ajaxOptions, thrownError) =>{
                    $("#confirmar_guardar_exe").attr("disabled",false);
                    peticion_fallida(thrownError);
                    csrf.value = xhr.responseJSON.token; 
                    $("#modal_confirmar_guardar_exe").modal("hide");
                }
            }).fail(function(response){
                
                if(response.responseText=="Sesion"){
                    error_sesion();
                }
            })
        }
    }
    almacena(){
        $("#errorcurp2").hide();
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
        //alert(fechaexpiracion.value);
        $("#errorfechaNacimiento2").html('');
        var inputDate = new Date(fechaexpiracion.value);
        var todaysDate = new Date();
        //alert(errorfechaNacimiento2.value);
        if (!fechaexpiracion.value){
            $("#errorfechaNacimiento2").html('Campo obligatorio');
            validacion = false;
        }
        if (inputDate.setHours(0,0,0,0) < todaysDate.setHours(0,0,0,0)){
            $("#errorfechaNacimiento2").html('Información no válida');
            validacion = false;
        }
        $("#errorselPais").hide();
        if (selNacionalidad.value == 2 && !selPais.value){
            $("#errorselPais").html('Campo obligatorio');
            $("#errorselPais").show();
            validacion = false;
        }
        //alert($('#nss').val());
        $("#errornss").hide();
        $("#errornss").html("");
        if (!$('#nss').val()){
            $("#errornss").html('Campo obligatorio');
            $("#errornss").show();
            validacion = false;
        }
        else if ($("#nss").val().length != 11){
            $("#errornss").show();
            $("#errornss").html('Información no válida');
            validacion = false;
        }
        if ($('#selTipoIdentificacion').find(':selected').data('nombre') == 'INE'){
            if (!$('#numidenti').val()){
                $("#errornumidenti").show();
                $("#errornumidenti").html('Campo obligatorio')
                validacion = false;
            }
            else if ($("#numidenti").val().length != 16 && $("#numidenti").val().length != 18){
                $("#errornumidenti").show();
                $("#errornumidenti").html('Información no válida');
                validacion = false;
            }
        } if ($('#selTipoIdentificacion').find(':selected').data('nombre') == 'IFE'){
            if (!$('#numidenti').val()){
                $("#errornumidenti").show();
                $("#errornumidenti").html('Campo obligatorio')
                validacion = false;
            }
            else if ($("#numidenti").val().length != 16 && $("#numidenti").val().length != 18){
                $("#errornumidenti").show();
                $("#errornumidenti").html('Información no válida');
                validacion = false;
            }
        } else if ($('#selTipoIdentificacion').find(':selected').data('nombre') == 'Pasaporte'){
            if (!$('#numidenti').val()){
                $("#errornumidenti").show();
                $("#errornumidenti").html('Campo obligatorio')
                validacion = false;
            }
            else if ($("#numidenti").val().length != 12){
                $("#errornumidenti").show();
                $("#errornumidenti").html('Información no válida');
                validacion = false;
            }
        } else if ($('#selTipoIdentificacion').find(':selected').data('nombre') == 'Certificado de Identidad'){
            if (!$('#numidenti').val()){
                $("#errornumidenti").show();
                $("#errornumidenti").html('Campo obligatorio')
                validacion = false;
            }
            else if ($("#numidenti").val().length != 15){
                $("#errornumidenti").show();
                $("#errornumidenti").html('Información no válida');
                validacion = false;
            }
        }
        if (!selTipoIdentificacion.value){
            errorSelTipoIdentificacion.style.display = ""
            validacion = false;
        }
        var sec = this.validaciones = new VALIDACIONES();    
        let resultado = sec.curp(curp.value);
        $("#errorcurp").hide();
        if (!curp.value){
            $("#errorcurp").html('Campo obligatorio');
            $("#errorcurp").show();
        }
        else if(!resultado.resp){
            $("#errorcurp").html(resultado.message);
            $("#errorcurp").show();
            validacion = false;
        }
        $("#errorrfc2").hide();
        $("#errorrfc2").html("");
        let resultado2 = sec.rfc(1, rfc.value);
        if (!$('#rfc').val()){
            $("#errorrfc2").html('Campo obligatorio');
            $("#errorrfc2").show();
            validacion = false;
        }
        else if(!resultado2.resp){
            $("#errorrfc2").html('Información no válida');
            $("#errorrfc2").show();
            validacion = false;
        }
        let resultado3 = sec.caracteres_validos_numericos(nss.value, 1);
        if($('#nss').val() && !resultado3.resp){
            $("#errornss").show();
            $("#errornss").html('Información no válida');
            validacion = false;
        }
        $(".letra").each(function(){        
            if (this.value!= ""){
                var res = sec.caracteres_validos(this.value,0);
                if (res.resp == false){
                    $("#error"+this.id).show();$("#error"+this.id).text("Información no válida");
                    validacion = false;
                } 
            }           
        });
        $(".espe").each(function(){     
            if (this.value!= ""){
                var res = sec.caracteres_validos(this.value,0);
                if (res.resp == false){
                    $("#error"+this.id).show();$("#error"+this.id).text("Información no válida");
                    validacion = false;
                } 
            }           
        });
        let curpenv = curp.value
        let nssenv = nss.value
        let rfcenv = rfc.value
        $.ajax({
            url: base_url+'Credencializacion/Ctrl_Personal/validarDatos',
            type: 'GET',
            dataType: 'json',
            data : {
                curp : curp.value,
                nss : nss.value,
                rfc : rfc.value
            },
            success: function(response){
                if (response.curp == 1){
                    $("#errorcurp2").show();
                    $("#errorcurp2").html('CURP previamente registrada');
                }
                if (response.nss == 1){
                    $("#errornss").show();
                    $("#errornss").html("NSS previamente registrado");
                }
                if (response.rfc == 1){
                    $("#errorrfc2").show();
                    $("#errorrfc2").html("RFC previamente registrado");
                }
                if (response.curp == 0 && response.rfc == 0 && response.nss == 0){
                    if(validacion && !errorDocumento){
                        let datos = {
                            id_credencial           : idcredencial.value,
                            id_tipo_persona         : SelTipoPersona.value,
                            id_empresa              : idempresa.value,
                            nombre_empresa          : empresa.value,
                            clave_patronal          : clavepatronal.value,
                            id_personal             : idpersonal.value,
                            nss                     : nss.value,
                            curp                    : curp.value,
                            nombre                  : nombre.value,
                            primer_apellido         : primer_apellido.value,
                            segundo_apellido        : segundo_apellido.value,
                            sexo                    : sexo.value,
                            fecha_nacimiento        : fechaNacimiento.value,
                            id_nacionalidad         : selNacionalidad.value,
                            id_tipo_pais            : selPais.value,
                            id_tipo_sangre          : tipoSangre.value,
                            rfc                     : rfc.value,
                            id_puesto               : selPuesto.value,
                            id_area                 : selArea.value,
                            id_contacto             : idcontacto.value,
                            correo                  : correoElectronico.value,
                            telefono                : numTelefono.value,
                            id_tipo_identificacion  : selTipoIdentificacion.value,
                            numero_identificacion   : numidenti.value,
                            fecha_expiracion        : fechaexpiracion.value,
                            archivo_ident           : archIfe.value,
                            archivo_perfil          : archFoto.value,
                            addestatus              : 1
                            //fotografiaPlaca         : $("#adjuntarPlacaVehiculo")[0].files[0],
                        }
                        var checkingreso = 0;
                        datosPersonal.forEach(function(res){
                            if ((res.addestatus == 1) && res.curp == datos.curp) checkingreso = 1;
                            if ((res.addestatus == 1) && res.nss == datos.nss) checkingreso = 2;
                            if ((res.addestatus == 1) && res.rfc == datos.rfc) checkingreso = 3;
                        });
                        /*
                        */
                        if (checkingreso == 0){
                            //$(".errorVehiculoDuplicado").html("");
                            datosPersonal.push(datos);
                            var etipoper = document.getElementById("SelTipoPersona");
                            var texttipoper=etipoper.options[etipoper.selectedIndex].text;
                            DTIdentidades.row.add([
                                '<center>'+texttipoper+'</center>',
                                '<center>'+datos.nombre+' '+datos.primer_apellido+' '+datos.segundo_apellido+'</center>',
                                '<center>'+datos.curp+'</center>',
                                '<div class="d-flex justify-content-center" >'+                            
                                    '<div class="p-1">'+
                                      '<a href="#!" title="Modificar">'+
                                          '<span class="glyphicon glyphicon-pencil editar" data-id="'+(datosPersonal.length-1)+'" alt="Editar">'+'</span>'+
                                      '</a>'+
                                    '</div>'+
                                    '<div class="p-1">'+
                                      '<a href="#!" title="Eliminar">'+
                                          '<span class="glyphicon glyphicon-trash eliminar" data-id="'+(datosPersonal.length-1)+'" alt="Papelera">'+'</span>'+
                                      '</a>'+
                                    '</div>'+
                                '</div>'        
                            ]).draw(false);

                            $('.cleartd').remove();
                            $('#nss').val('');
                            $('#curp').val('');
                            $('#nombre').val('');
                            $('#primer_apellido').val('');
                            $('#segundo_apellido').val('');
                            $('#sexo').val('');
                            $('#fechaNacimiento').val('');
                            $('#tipoSangre').val('');
                            $('#rfc').val('');
                            $('#numidenti').val('');
                            $('#fechavencimiento').val('');
                            $('#correoElectronico').val('');
                            $('#numTelefono').val('');
                            $('#archIfe').val('');
                            $('#archFoto').val('');
                            $('#auxAdjuntarIfe').val('');
                            $('#auxAdjuntarFoto').val('');
                            $("#pdfViewerIfe").css("height","0px");
                            $("#pdfViewerIfe").html('');
                            $("#pdfViewerFoto").css("height","0px");
                            $("#pdfViewerFoto").html('');
                            $("#selNacionalidad").val('');
                            $("#selPais").val('');
                            $("#tipoSangre").val('');
                            $("#selPuesto").val('');
                            $("#selArea").val('');
                            $("#selTipoIdentificacion").val('');
                            if ($("#SelTipoPersona").val() != 2)
                                $("#SelTipoPersona").val('');
                            btnSubirIfe.value = 'Subir documento'
                            btnSubirFoto.value = 'Subir foto'
                            Visuzaliarife.innerHTML = '';
                            Visuzaliarfoto.innerHTML = '';


                        }else {
                            if (checkingreso == 1){
                                errorcurp.innerHTML = "Existe ya un registro en la lista";
                                $("#errorcurp").show();
                            }
                            else if (checkingreso == 2){
                                errornss.innerHTML = "Existe ya un registro en la lista";
                                $("#errornss").show();
                            }
                            else if (checkingreso == 3){
                                errorrfc.innerHTML = "Existe ya un registro en la lista";
                                $("#errorrfc").show();
                            }
                        }
                    }
                }
            }
        });
        return false;
    }
    confirmar_almacenamiento(){
        let formData = new FormData();
        
        for (let index = 0; index < datosPersonal.length; index++) if(datosPersonal[index].addestatus == 1){
            formData.append("id_credencial["+index+"]",datosPersonal[index].id_credencial)
            formData.append("id_tipo_persona["+index+"]",datosPersonal[index].id_tipo_persona)
            formData.append("id_empresa["+index+"]",datosPersonal[index].id_empresa)
            formData.append("nombre_empresa["+index+"]",datosPersonal[index].nombre_empresa)
            formData.append("clave_patronal["+index+"]",datosPersonal[index].clave_patronal)
            formData.append("id_personal["+index+"]",datosPersonal[index].id_personal)
            formData.append("nss["+index+"]",datosPersonal[index].nss)
            formData.append("curp["+index+"]",datosPersonal[index].curp)
            formData.append("nombre["+index+"]",datosPersonal[index].nombre)
            formData.append("primer_apellido["+index+"]",datosPersonal[index].primer_apellido)
            formData.append("segundo_apellido["+index+"]",datosPersonal[index].segundo_apellido)
            formData.append("sexo["+index+"]",datosPersonal[index].sexo)
            formData.append("fecha_nacimiento["+index+"]",datosPersonal[index].fecha_nacimiento)
            formData.append("id_nacionalidad["+index+"]",datosPersonal[index].id_nacionalidad)
            formData.append("id_tipo_pais["+index+"]",datosPersonal[index].id_tipo_pais)
            formData.append("id_tipo_sangre["+index+"]",datosPersonal[index].id_tipo_sangre)
            formData.append("rfc["+index+"]",datosPersonal[index].rfc)
            formData.append("id_puesto["+index+"]",datosPersonal[index].id_puesto)
            formData.append("id_area["+index+"]",datosPersonal[index].id_area)
            formData.append("id_contacto["+index+"]",datosPersonal[index].id_contacto)
            formData.append("correo["+index+"]",datosPersonal[index].correo)
            formData.append("telefono["+index+"]",datosPersonal[index].telefono)
            formData.append("id_tipo_identificacion["+index+"]",datosPersonal[index].id_tipo_identificacion)
            formData.append("numero_identificacion["+index+"]",datosPersonal[index].numero_identificacion)
            formData.append("fecha_expiracion["+index+"]",datosPersonal[index].fecha_expiracion)
            formData.append("archivo_ident["+index+"]",datosPersonal[index].archivo_ident)
            formData.append("archivo_perfil["+index+"]",datosPersonal[index].archivo_perfil)
        }
        $.ajax({
            url: base_url + 'Credencializacion/Ctrl_Personal/add',
            type: 'POST',
            data : formData,
            global: false,
            processData: false,
            contentType: false,
            dataType: 'json',
            success: (response) => {
                csrf.value = response.token;
                if(response.status){
                    Personal.prototype.reiniciar_campos()
                    registro_exitoso(response.message);
                    //spinner.style.visibility="hidden";
                }else{
                    peticion_fallida(response.message);
                    //spinner.style.visibility="hidden";
                }
                $("#confirmar_guardar").attr("disabled","false");
                $("#modal_confirmar_guardar").modal("hide");

            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $("#modal_confirmar_guardar").modal("hide");
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        })
        
    }
    reiniciar_campos(){
        datosPersonal = []     
        DTIdentidades.clear().draw()
        DTImportar.clear().draw()

        idempresa.value = "0"
        idpersonal.value = "0"
        idcontacto.value = "0"
        selTipoIdentificacion.value = ""
        fechaexpiracion.value = ""
        //$(".req").val("");
        //$(".reiniciar-vehiculo").val("")
        document.getElementById('btnSubirIfe').value = 'Subir documento'
        document.getElementById('btnSubirFoto').value = 'Subir foto'
        $("#archexporta").val("");
        //document.getElementById('btnSubirVehiculo').value = 'Subir archivo'
    }
}

const pers = new Personal()

$(".fotos").on('click', function(event){
    var img = $(this).attr("data-img");
    if (img != "")
        window.open("/"+img,"_blank");
});

var upIfe = new plupload.Uploader({
    browse_button: 'adjuntarIfe', // this can be an id of a DOM element or the DOM element itself
    url: base_url+'upload/uploadIdentificacion',
    chunk_size: '1mb',
    max_file_count: 1,
    multi_selection: false,
    unique_names: true,
    multipart_params: {
        [csrf.name] : csrf.value
    },
    //ADD FILE FILTERS HERE
    filters: {
        max_file_size : '20mb',
        mime_types: [
            { title: "JPG Archivos", extensions: "jpg" },            { title: "JPEG Archivos", extensions: "jpeg" },            { title: "PNG Archivos", extensions: "png" },            { title: "PDF Archivos", extensions: "pdf" },
        ]
    },
    init: {
        PostInit: function () {
            console.log("post init");
            document.getElementById('btnAceptarAdjuntarIfe').onclick = function () {
                upIfe.start();
                return false;
            }
        },
        Error: function(up, err) {
            console.log("error");
            if(err.code == -600)
                $(erroradjuntarContrato).html("El maximo tamaño de archivo es de 20mb")
        },
        Browse: function (up) {
            console.log("up");
            if (up.files.length > 0)
                up.removeFile(up.files[0]); // Delete the last selection if it exists
        },
        FilesAdded: function (up, files) {
            console.log("Files Added");
            auxAdjuntarIfe.value = up.files[0]['name'] ?? '';
            pers.previsualizar_archivo(up.files,"Ife");
        },
        UploadProgress: function (up, file) {
            console.log("Upload Progress");
            // Called while file is being uploaded
            divVisuzaliarife.style.display = ""
            var span = document.getElementById('Visuzaliarife');
            span.innerHTML = '<span> Cargando archivo: ' + file.percent + '%</span>';
            Visuzaliarife.classList.add("disabled");
        },
        BeforeUpload: function (up, file) {
            console.log("Before Upload");
            $(modalIfe).modal('toggle');
        },
        FileUploaded: function (up, file, info) {
            console.log("File Uploaded");
            info = JSON.parse(info.response)
            csrf.value = info.token;
            upIfe.settings.multipart_params[csrf.name] = info.token;
            $("#archIfe").val(file.target_name);
            var span = document.getElementById('Visuzaliarife');
            divVisuzaliarife.style.display = ""                 
            $("#Visuzaliarife").attr("data-img","assets/uploads/credencializacion/personal/"+file.target_name) 
            Visuzaliarife.classList.remove("disabled");
            span.innerHTML = ' <i class="glyphicon glyphicon-paperclip"></i> Ver identificación';
        },
    }
});
var upFoto = new plupload.Uploader({
    browse_button: 'adjuntarFoto', // this can be an id of a DOM element or the DOM element itself
    url: base_url+'upload/uploadPerfil',
    chunk_size: '1mb',
    max_file_count: 1,
    multi_selection: false,
    unique_names: true,
    multipart_params: {
        [csrf.name] : csrf.value
    },
    //ADD FILE FILTERS HERE
    filters: {
        max_file_size : '20mb',
        mime_types: [
            { title: "JPG Archivos", extensions: "jpg" },            { title: "JPEG Archivos", extensions: "jpeg" },            { title: "PNG Archivos", extensions: "png" },            { title: "PDF Archivos", extensions: "pdf" },
        ]
    },
    init: {
        PostInit: function () {
            console.log("post init");
            document.getElementById('btnAceptarAdjuntarFoto').onclick = function () {
                upFoto.start();
                return false;
            }
        },
        Error: function(up, err) {
            console.log("error");
            if(err.code == -600)
                $(erroradjuntarContrato).html("El maximo tamaño de archivo es de 20mb")
        },
        Browse: function (up) {
            console.log("up");
            if (up.files.length > 0)
                up.removeFile(up.files[0]); // Delete the last selection if it exists
        },
        FilesAdded: function (up, files) {
            console.log("Files Added");
            auxAdjuntarFoto.value = up.files[0]['name'] ?? '';
            pers.previsualizar_archivo(up.files,"Foto");
        },
        UploadProgress: function (up, file) {
            console.log("Upload Progress");
            // Called while file is being uploaded
            divVisuzaliarfoto.style.display = ""
            var span = document.getElementById('Visuzaliarfoto');
            span.innerHTML = '<span> Cargando archivo: ' + file.percent + '%</span>';
            Visuzaliarfoto.classList.add("disabled");
        },
        BeforeUpload: function (up, file) {
            console.log("Before Upload");
            $(modalFoto).modal('toggle');
        },
        FileUploaded: function (up, file, info) {
            console.log("File Uploaded");
            info = JSON.parse(info.response)
            csrf.value = info.token;
            upFoto.settings.multipart_params[csrf.name] = info.token;
            $("#archFoto").val(file.target_name);
            var span = document.getElementById('Visuzaliarfoto');
            divVisuzaliarfoto.style.display = ""                 
            $("#Visuzaliarfoto").attr("data-img","assets/uploads/credencializacion/personal/perfil/"+file.target_name) 
            Visuzaliarfoto.classList.remove("disabled");
            span.innerHTML = ' <i class="glyphicon glyphicon-paperclip"></i> Ver identificación';
        },
    }
});
var upExcel = new plupload.Uploader({
    browse_button: 'adjuntarExcel', // this can be an id of a DOM element or the DOM element itself
    url: base_url+'upload/uploadPersonalExcel',
    chunk_size: '1mb',
    max_file_count: 1,
    multi_selection: false,
    unique_names: true,
    multipart_params: {
        [csrf.name] : csrf.value
    },
    //ADD FILE FILTERS HERE
    filters: {max_file_size : '3mb',  mime_types: [ { title: "XLS Archivos", extensions: "xls" },            { title: "XLSX Archivos", extensions: "xlsx" } ] },
    init: {
        PostInit: function () {
            console.log("post init excel");
            txterrorarchivoadjunto.innerHTML = "";
            document.getElementById('btnAceptarAdjuntarExcel').onclick = function () {
                upExcel.start();
                return false;
            }
        },
        Error: function(up, err) {
            txterrorarchivoadjunto.innerHTML = "";
            console.log("error excel");
            //$(modalExcel).modal('toggle');
            if(err.code == -600)
                txterrorarchivoadjunto.innerHTML = "El maximo tamaño de archivo es de 3mb";
            if(err.code == -601)
                txterrorarchivoadjunto.innerHTML = "El tipo de archivo debe ser .xls o .xlsx";
        },
        Browse: function (up) {
            console.log("up excel");
            txterrorarchivoadjunto.innerHTML = "";
            if (up.files.length > 0)
                up.removeFile(up.files[0]); // Delete the last selection if it exists
        },
        FilesAdded: function (up, files) {
            console.log("files added");
            txterrorarchivoadjunto.innerHTML = "";
            txtarchivoadjunto.innerHTML = up.files[0]['name'];
        },
        UploadProgress: function (up, file) {
            txterrorarchivoadjunto.innerHTML = "";
            console.log("Upload Progress excel");
            // Called while file is being uploaded
            var span = document.getElementById('procesaexcel');
            span.innerHTML = '<a href="#!"> Cargando archivo: ' + file.percent + '%</a>';
            $("#btnsubirdocumento").hide();
        },
        BeforeUpload: function (up, file) {
            console.log("Before Upload excel");
            $(modalExcel).modal('toggle');
        },
        FileUploaded: function (up, file, info) {
            txterrorarchivoadjunto.innerHTML = "";
            $("#procesaexcel").html("<a>Validando archivo, espere.... </a>");
            let formData = new FormData();
            formData.append("archivo",file.target_name)
            $("#archexporta").val("");
            DTImportar.clear().draw();
            $('.todosmsj').hide();
            $('.algunosmsj').hide();
            $.ajax({
                url : base_url+'Credencializacion/Ctrl_Personal/importar',
                type : 'POST',
                data : formData,
                global: false,
                processData: false,
                contentType: false,
                success : function(response) {
                    console.log(response);
                    csrf.value = response.token;
                    $("#procesaexcel").html("");
                    btnsubirexcel.value = 'Modificar documento';
                    //$("#textosube").addClass("hide");
                    /*
                    $("#btnImportar").addClass("hide");
                    */
                    $('.todosmsj').show();
                    $.each( response.tabla, function( index, exe ) {
                        if (exe.estatus){
                            DTImportar.row.add(["<center>"+exe.data.curp+"</center>","<center>"+exe.data.nombre+"<center>","<center><span style='color: blue'>REGISTRO VÁLIDO</span><center>"]).draw(false);
                        }
                        else{
                            DTImportar.row.add(["<center>"+exe.data.curp+"</center>","<center>"+exe.data.nombre+"<center>","<center><span style='color: red'>REGISTRO INVÁLIDO: "+exe.error+"</span><center>"]).draw(false);
                            $('.todosmsj').hide();
                            $('.algunosmsj').show();
                        }
                        console.log(exe.data.curp);
                    });
                    /*
                    $("#capaImportar").removeClass("hide");
                    $("#btnImportar").removeClass("hide");
                    */
                    $("#archexporta").val(file.target_name);
                },
                error: (xhr, ajaxOptions, thrownError) =>{
                    spinner.style.visibility="hidden";
                    span.innerHTML = 'Error al cargar documento';
                    peticion_fallida(thrownError);
                    csrf.value = xhr.responseJSON.token;
                }
            }).fail(function(response){
                spinner.style.visibility="hidden";
                if(response.responseText=="Sesion"){
                    error_sesion();
                }
            })
        },
    }
});


upExcel.init();
upIfe.init();
upFoto.init();

function imageZoom(sizex, sizey) {
    var img, lens, result, cx, cy;
    img = document.getElementById("myimage");
    /*create lens:*/
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    /*insert lens:*/
    img.parentElement.insertBefore(lens, img);
    /*calculate the ratio between result DIV and lens:*/
    cx = lens.offsetWidth/60;
    cy = lens.offsetHeight/60;
    /*set background properties for the result DIV:*/
    lens.style.backgroundImage = "url('" + img.src + "')";
    lens.style.backgroundSize = sizex * cx + "px " + sizey * cy + "px";
    /*execute a function when someone moves the cursor over the image, or the lens:*/
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /*and also for touch screens:*/
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
    function moveLens(e) {
        var pos, x, y;
        /*prevent any other actions that may occur when moving over the image:*/
        e.preventDefault();
        /*get the cursor's x and y positions:*/
        pos = getCursorPos(e);
        /*calculate the position of the lens:*/
        x = pos.x - lens.offsetWidth / 2;
        y = pos.y - lens.offsetHeight / 2;
        /*prevent the lens from being positioned outside the image:*/
        if (x > img.width - lens.offsetWidth) {
            x = img.width - lens.offsetWidth;
        }
        if (x < 0) {
            x = 0;
        }
        if (y > img.height - lens.offsetHeight) {
            y = img.height - lens.offsetHeight;
        }
        if (y < 0) {
            y = 0;
        }
        /*set the position of the lens:*/
        lens.style.left = x + "px";
        lens.style.top = y + "px";
        /*display what the lens "sees":*/
        lens.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
    }
    function getCursorPos(e) {
        var a,
            x = 0,
            y = 0;
        e = e || window.event;
        /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }
}

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });
    return indexed_array;
}

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

$("#registroexcel").click((e)=>{
    $(".classregmanual").hide();
    $(".classregexcel").show();
});
$("#registromanual").click((e)=>{
    $(".classregmanual").show();
    $(".classregexcel").hide();
});
$("#enviarfotocorreo").click((e)=>{
    if ($("#enviarfotocorreo").is(':checked')){
        $(".classfotocorreo").hide();
        archFoto.value = "";
    }
    else
        $(".classfotocorreo").show();
});
$(tabPersonas).on('click', '.editar', function(ev){
    if (datosPersonal[ev.target.dataset.id].id_tipo_persona == 1)
        $(".classoutsourcing").hide();
    else
        $(".classoutsourcing").show();
    idcredencial.value              = datosPersonal[ev.target.dataset.id].id_credencial
    idpersonal.value                = datosPersonal[ev.target.dataset.id].id_personal
    idempresa.value                 = datosPersonal[ev.target.dataset.id].id_empresa
    idcontacto.value                = datosPersonal[ev.target.dataset.id].id_contacto
    empresa.value                   = datosPersonal[ev.target.dataset.id].nombre_empresa
    clavepatronal.value             = datosPersonal[ev.target.dataset.id].clave_patronal
    nss.value                       = datosPersonal[ev.target.dataset.id].nss
    curp.value                      = datosPersonal[ev.target.dataset.id].curp
    nombre.value                    = datosPersonal[ev.target.dataset.id].nombre
    primer_apellido.value           = datosPersonal[ev.target.dataset.id].primer_apellido
    segundo_apellido.value          = datosPersonal[ev.target.dataset.id].segundo_apellido
    sexo.value                      = datosPersonal[ev.target.dataset.id].sexo
    fechaNacimiento.value           = datosPersonal[ev.target.dataset.id].fecha_nacimiento
    selNacionalidad.value           = datosPersonal[ev.target.dataset.id].id_nacionalidad
    selPais.value                   = datosPersonal[ev.target.dataset.id].id_tipo_pais
    tipoSangre.value                = datosPersonal[ev.target.dataset.id].id_tipo_sangre
    rfc.value                       = datosPersonal[ev.target.dataset.id].rfc
    selPuesto.value                 = datosPersonal[ev.target.dataset.id].id_puesto
    selArea.value                   = datosPersonal[ev.target.dataset.id].id_area
    correoElectronico.value         = datosPersonal[ev.target.dataset.id].correo
    numTelefono.value               = datosPersonal[ev.target.dataset.id].telefono
    selTipoIdentificacion.value     = datosPersonal[ev.target.dataset.id].id_tipo_identificacion
    numidenti.value                 = datosPersonal[ev.target.dataset.id].numero_identificacion
    fechaexpiracion.value           = datosPersonal[ev.target.dataset.id].fecha_expiracion
    archIfe.value                   = datosPersonal[ev.target.dataset.id].archivo_ident
    archFoto.value                  = datosPersonal[ev.target.dataset.id].archivo_perfil

    datosPersonal[ev.target.dataset.id].addestatus = 0

    if (archIfe.value){
        $("#Visuzaliarife").attr("data-img","assets/uploads/credencializacion/personal/"+archIfe.value);
        Visuzaliarife.classList.remove("disabled");
        $("#Visuzaliarife").html('<i class="glyphicon glyphicon-paperclip"></i> Visualizar identificación');
    }
    if (archFoto.value){
        $("#Visuzaliarfoto").attr("data-img","assets/uploads/credencializacion/personal/"+archFoto.value);
        Visuzaliarfoto.classList.remove("disabled");
        $("#Visuzaliarfoto").html('<i class="glyphicon glyphicon-paperclip"></i> Visualizar identificación');
    }

    DTIdentidades.row($(this).parents('tr')).remove().draw();
});
