const id_credencial = localStorage.getItem("id_credencial");
let QrScanner
var datosPersonal = []

import('../../../librerias/QRScanner/qr-scanner.min.js').then((module) => {
    QrScanner = module.default;
    QrScanner.WORKER_PATH = '../../assets/librerias/QRScanner/qr-scanner-worker.min.js';
});

var scanner;
var datosEscaneados = '';
const video = document.getElementById('qr-video');
const camQrResult = document.getElementById('cam-qr-result');

let errorDocumento = true;
let cntrerrornss = false;
let cntrerrorrfc = false;
let cntrerrortipoident = false;

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
        //this.obtener_datos();
        //this.obtener_datos_imagenes();
    }
    inicio(){
        curp.addEventListener("keyup",(ev) => {
            ev.target.value = ev.target.value.toUpperCase()
        });
        clavepatronal.addEventListener("change",this.validar_clavepatronal)
        SelTipoPersona.addEventListener("change",this.validar_outsorcing);
        selTipoIdentificacion.addEventListener("change",this.validar_tipo_identificacion)
        numidenti.addEventListener("change",this.validar_identificacion)
        numTelefono.addEventListener("change",this.validar_telefono)
        fechaexpiracion.addEventListener("change",this.validar_fechaexpiracion)
        rfc.addEventListener("change",this.validar_rfc)
        nss.addEventListener("change",this.validar_nss)
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
        correoElectronico.addEventListener("change",this.validar_correo);
        btnGuardar.addEventListener("click",this.almacena);
        
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

        let datosValidar = document.getElementsByClassName('validar');
        for (var i = 0; i < datosValidar.length; i++) {
            datosValidar[i].addEventListener('change', (ev) => {
                if(ev.target.value != ""){
                    $("#error"+ev.target.id).hide();
                }
            })
        }

        confirmar_salir_sin_guardar.addEventListener('click',(ev)=> {
            window.location.href = base_url + 'Credencializacion/Ctrl_Personal';
        });

        confirmar_guardar.addEventListener("click",this.guardar)
        btnRegresar.addEventListener("click",this.regresar)
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
        $(".noespecial").on('keydown', function(ev){
            if(ev.keyCode != 16){
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_alphanumeric_s(ev.key,1,50,1);
                if(!resultado.resp){
                    ev.preventDefault();
                }
            }
        });
    }
    obtener_datos(){
        $.ajax({
            url: base_url+'Credencializacion/Ctrl_Personal/getById',
            type: 'GET',
            dataType: 'json',
            data : {
                idcredencial : id_credencial
            },
            success: function(response){
                if(response.status){
                    idpersonal.value = response.data.id
                    idcredencial.value = response.data.id_credencial
                    idcontacto.value = response.data.id_contacto
                    if (response.data.id_empresa){
                        $(".classoutsourcing").show();
                        clavepatronal.value = response.data.clave_patronal
                        empresa.value = response.data.nombre_empresa
                        idempresa.value = response.data.id_empresa
                        empresa.readOnly = true;
                    }
                    errorDocumento = false;
                    curp.value = response.data.curp
                    nss.value = response.data.nss
                    nsscontrol.value = response.data.nss
                    if (response.data.id_tipo_persona)
                        SelTipoPersona.value = response.data.id_tipo_persona
                    nombre.value =  response.data.nombre
                    primer_apellido.value = response.data.primer_apellido
                    segundo_apellido.value = response.data.segundo_apellido
                    //sexo.value = response.data.sexo
                    //fechaNacimiento.value = response.data.fecha_nacimiento
                    rfc.value = response.data.rfc
                    rfccontrol.value = response.data.rfc
                    if (response.data.id_nacionalidad)
                        selNacionalidad.value = response.data.id_nacionalidad
                    if (response.data.nacionalidad == 'Mexicana'){
                        $('#selNacionalidad').attr('disabled', true);
                        $('#selPais').attr('disabled', true);
                    }
                    if (response.data.id_tipo_sangre)
                        tipoSangre.value = response.data.id_tipo_sangre
                    if (response.data.id_tipo_identificacion){
                        selTipoIdentificacion.value = response.data.id_tipo_identificacion
                        numidenti.value = response.data.numero_identificacion
                        if (response.data.tipo_identificacion == 'INE'){
                            $('.spanclaveident').html("Clave de elector");
                            $("#numidenti").attr('maxlength','18');

                        }
                        if (response.data.tipo_identificacion == 'IFE'){
                            $('.spanclaveident').html("Clave de elector");
                            $("#numidenti").attr('maxlength','18');

                        }
                        if (response.data.tipo_identificacion == 'Pasaporte'){
                            $('.spanclaveident').html("Número de pasaporte:");
                            $("#numidenti").attr('maxlength','12');

                        }
                        if (response.data.tipo_identificacion == 'Certificado de Identidad'){
                            $('.spanclaveident').html("Número único de identidad:");
                            $("#numidenti").attr('maxlength','15');

                        }
                        fechaexpiracion.value = response.data.fecha_expiracion
                        if (response.data.exp_status == 0){
                            $("#errorfechaExpiracion").html("Documento vencido");
                            $("#errorfechaExpiracion").show();
                        }
                        if (response.data.img_ife){
                            archIfe.value = response.data.img_ife;
                            $("#Visuzaliarife").attr("data-img","assets/uploads/credencializacion/personal/"+response.data.img_ife);
                            Visuzaliarife.classList.remove("disabled");
                            $("#Visuzaliarife").html('<i class="glyphicon glyphicon-paperclip"></i> Visualizar identificación');
                        }
                        if (response.data.img_perfil){
                            archFoto.value = response.data.img_perfil;
                            $("#Visuzaliarfoto").attr("data-img","assets/uploads/credencializacion/personal/perfil/"+response.data.img_perfil);
                            Visuzaliarfoto.classList.remove("disabled");
                            $("#Visuzaliarfoto").html('<i class="glyphicon glyphicon-paperclip"></i> Visualizar identificación');
                        }
                    }
                    if (response.data.id_puestos)
                        selPuesto.value = response.data.id_puestos;
                    if (response.data.id_area)
                        selArea.value = response.data.id_area
                    correoElectronico.value = response.data.correo
                    numTelefono.value = response.data.telefono
                }
            },
            complete: function(){
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.curp(curp.value);
                if(resultado.resp){
                    fechaNacimiento.value = resultado.fecha_nacimiento;
                    sexo.value = resultado.sexo;
                }
                /*
                Personal.prototype.obtener_puestos();
                Personal.prototype.obtener_areas();
                Personal.prototype.obtener_denominaciones();
                Personal.prototype.obtener_nacionalidades();
                Personal.prototype.obtener_tipo_sangre();
                Personal.prototype.obtener_estados();
                */
            }
        }).fail( function(response) {
            
        });
    }
    /*
    obtener_datos_imagenes(){
        $.ajax({
            url: base_url+'Credencializacion/Ctrl_Personal/getImagenesDocumentoByPersonal',
            type: 'GET',
            dataType: 'json',
            data : {
                idpersonal : id_personal
            },
            success: function(response){
                if(response.status){
                    selTipoIdentificacion.value = response.data.id_tipo_identificacion
                    numidenti.value = response.data.numero_identificacion
                    fechaexpiracion.value = response.data.fecha_expiracion
                    if (response.data.exp_status == 0){
                        $("#errorfechaExpiracion").html("Documento vencido");
                        $("#errorfechaExpiracion").show();
                    }
                    if (response.data.nombre){
                        archIfe.value = response.data.nombre;
                        $("#Visuzaliarife").attr("data-img","assets/uploads/credencializacion/personal/"+response.data.nombre);
                        Visuzaliarife.classList.remove("disabled");
                        $("#Visuzaliarife").html('<i class="glyphicon glyphicon-paperclip"></i> Visualizar identificación');
                    }
                    //identificacion.value = response.data.numero_identificacion;
                    
                }
            }
        }).fail( function(response) {
            
        });
        $.ajax({
            url: base_url+'Credencializacion/Ctrl_Personal/getImagenesPerfilByPersonal',
            type: 'GET',
            dataType: 'json',
            data : {
                idpersonal : id_personal
            },
            success: function(response){
                if(response.status){
                    if (response.data.nombre){
                        archFoto.value = response.data.nombre;
                        $("#Visuzaliarfoto").attr("data-img","assets/uploads/credencializacion/personal/"+response.data.nombre);
                        Visuzaliarfoto.classList.remove("disabled");
                        $("#Visuzaliarfoto").html('<i class="glyphicon glyphicon-paperclip"></i> Visualizar identificación');
                    }
                }
            }
        }).fail( function(response) {
            
        });
    }
    */
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
    obtener_puestos(){
        $.ajax({
            url: base_url_rest + 'catalogos/puestos/estatus/1',
            type: 'GET',
            dataType: 'json',
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
            url: base_url_rest+'catalogos/areas/estatus/1',
            type: 'GET',
            dataType: 'json',
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
                    if (element.nombre == 'México')
                        $(selPais).append('<option value="'+element.id+'" selected>'+element.nombre+'</option>');
                    else
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
    validar_outsorcing(){
        if (SelTipoPersona.value == 2){
            $(".classoutsourcing").show();
            //var empresa = document.getElementById("empresa");
            empresa.classList.add("validar");
            clavepatronal.classList.add("validar");
        }
        else{
            empresa.value = ""
            clavepatronal.value = ""
            empresa.classList.remove("validar");
            clavepatronal.classList.remove("validar");
            $(".classoutsourcing").hide();
        }
    }
    validar_telefono(){
        $("#errornumTel").html('');
        if (!numTelefono.value)
            $("#errornumTel").html('Campo obligatorio');
        else if(numTelefono.value.length != 10){
            $("#errornumTel").html('Información no válida');
        }
    }
    validar_fechaexpiracion(){
        var inputDate = new Date(fechaexpiracion.value);
        var todaysDate = new Date();
        $("#errorfechaExpiracion").html('');
        if (!fechaexpiracion.value){
            $("#errorfechaExpiracion").html('Campo obligatorio');
        }
        if (inputDate.setHours(0,0,0,0) < todaysDate.setHours(0,0,0,0)){
            $("#errorfechaExpiracion").html('Información no válida');
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

        let resultado = this.validaciones.correo(ev.target.value);
        if(!resultado.resp){
            errorDocumento = true
            ev.target.value = "";
            $("#errorcorreoElectronico").html("Información no válida");
            $("#errorcorreoElectronico").show();
        }

    }
    validar_identificacion(){
        cntrerrortipoident = false;
        var valid = this.validaciones = new VALIDACIONES();
        let carvalidentmin = 16;
        let carvalidentmax = 18;
        let tiporango = 1;
        $(errornumidenti).html("");
        let resultado = {resp : true}
        if (!numidenti.value){
            $(errornumidenti).html("Campo obligatorio");
            cntrerrortipoident = true;
        }
        else if ($('#selTipoIdentificacion').find(':selected').data('nombre') == 'INE' || $('#selTipoIdentificacion').find(':selected').data('nombre') == 'IFE'){
            resultado = valid.caracteres_validos_alphanumeric(numidenti.value, carvalidentmin, carvalidentmax, 2);
        }
        else if ($('#selTipoIdentificacion').find(':selected').data('nombre') == 'Pasaporte'){
            carvalidentmin = 12;
            carvalidentmax = 12;
            resultado = valid.caracteres_validos_alphanumeric(numidenti.value, carvalidentmin, carvalidentmax, 1);
        }
        else if ($('#selTipoIdentificacion').find(':selected').data('nombre') == 'Certificado de Identidad'){
            carvalidentmin = 15;
            carvalidentmax = 15;
            resultado = valid.caracteres_validos_alphanumeric(numidenti.value, carvalidentmin, carvalidentmax, 2);
        }
        if (!resultado.resp){
            $(errornumidenti).html("Información no válida");
            cntrerrortipoident = true;
        }
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
    validar_tipo_identificacion(){
        if ($("#SelTipoIdentificacion").val() != ""){
            errorSelTipoIdentificacion.style.display = "none"
        }
        numidenti.value = ""
        fechaexpiracion.value = ""
        archIfe.value = ""
        var span = document.getElementById('Visuzaliarife');
        span.innerHTML = '';
        divVisuzaliarife.style.display = ""                 
        $("#Visuzaliarife").attr("data-img","");
        btnSubirIfe.value = 'Subir documento';
        $('.divclaveelector').show();
        if ($('#selTipoIdentificacion').find(':selected').data('nombre') == 'INE'){
            $('.spanclaveident').html("Clave de elector");
            $("#numidenti").attr('maxlength','18');
        } else if ($('#selTipoIdentificacion').find(':selected').data('nombre') == 'IFE'){
            $('.spanclaveident').html("Clave de elector");
            $("#numidenti").attr('maxlength','18');
        } else if ($('#selTipoIdentificacion').find(':selected').data('nombre') == 'Pasaporte'){
            $('.spanclaveident').html("Númerooooo de pasaporte:");
            $("#numidenti").attr('maxlength','12');
        } else if ($('#selTipoIdentificacion').find(':selected').data('nombre') == 'Certificado de Identidad'){
            $('.spanclaveident').html("Número único de identidad:");
            $("#numidenti").attr('maxlength','15');
        }
        else{
            $('.divclaveelector').hide();
        }
    }
    regresar(){
        pedir_confirmar_regresar();
        return false
    }
    almacena(){
        btnGuardar.removeEventListener("click",Personal.prototype.almacena);
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
                    $("#errornumTel").html('Información no válida');
                    validacion = false;
                }
            }
        }
        $("#errorfechaNacimiento").html('');
        var inputDate = new Date(fechaexpiracion.value);
        var todaysDate = new Date();
        //alert(errorfechaNacimiento.value);
        if (!fechaexpiracion.value){
            $("#errorfechaNacimiento").html('Campo obligatorio');
            validacion = false;
        }
        if (inputDate.setHours(0,0,0,0) < todaysDate.setHours(0,0,0,0)){
            $("#errorfechaNacimiento").html('Información no válida');
            validacion = false;
        }
        if(validacion && !errorDocumento && !cntrerrornss && !cntrerrorrfc && !cntrerrortipoident){
            $("#modal_confirmar_guardar").modal()
        }
        btnGuardar.addEventListener("click",Personal.prototype.almacena);
        return false;
    }
    guardar(){
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
            //fotografiaPlaca         : $("#adjuntarPlacaVehiculo")[0].files[0],
        }
        $.ajax({
            url: base_url + 'Credencializacion/Ctrl_Personal/update',
            type: 'POST',
            data: datos,
            dataType: 'json',
            beforeSend:function(){
                $("#modal_confirmar_guardar").modal("hide");
            },
            success: (data) => {
                console.log(data);
                csrf.value = data.token;
                if(data.status != true){
                    peticion_fallida(data.message);
                }else{
                    registro_exitoso(data.message);
                    Personal.prototype.reiniciar_campos()
                }
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
        //$(".req").val("");
        //$(".reiniciar-vehiculo").val("")
        document.getElementById('btnSubirIfe').value = 'Subir documento'
        document.getElementById('btnSubirFoto').value = 'Subir foto'
        $("#archexporta").val("");
        //document.getElementById('btnSubirVehiculo').value = 'Subir archivo'
    }
    validar_rfc(){
        cntrerrorrfc = false;
        var valid = this.validaciones = new VALIDACIONES();
        $("#errorrfc").hide();
        $("#errorrfc").html("");
        let resultado = valid.rfc(1, rfc.value);
        if(!resultado.resp){
            $("#errorrfc").html('Información no válida');
            $("#errorrfc").show();
            cntrerrorrfc = true;
            //rfc.value = ""
        }
        if (rfc.value != rfccontrol.value){
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
                        $("#errorrfc").show();
                        $("#errorrfc").html("El registro ya existe");
                        cntrerrorrfc = true;
                    }
                }
            }); 
        }
    }
    validar_nss(){
        cntrerrornss = false;
        var valid = this.validaciones = new VALIDACIONES();
        let resultado = valid.caracteres_validos_numericos(nss.value, 11);
        if(!nss.value.length || nss.value.length == 11){
            $(errornss).hide();
        }
        if (!resultado.resp){
            $("#errornss").html('Información no válida');
            $("#errornss").show();
            cntrerrornss = true;
        }
        else if(nss.value.length != 11){
            $("#errornss").html('Información no válida');
            $(errornss).show();
            cntrerrornss = true;
        }
        else if (nss.value != nsscontrol.value){
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
                    console.log(response);
                    if (response.nss == 1){
                        cntrerrornss = true;
                        $("#errornss").show();
                        $("#errornss").html("NSS previamente registrado");
                    }
                }
            }); 
        }
    }
}


const pers = new Personal()
$(document).ready(function(){
    setTimeout(function(){
        Personal.prototype.obtener_datos();
    }, 1000);
});

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
            span.innerHTML = ' <i class="glyphicon glyphicon-paperclip"></i> Ver foto de perfil';
        },
    }
});


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
    $("#modalEscanerCURP").modal("hide");
}


$("#btnCancelarEscaneo").click(function(){
    scanner.stop();
});


$("#enviarfotocorreo").click((e)=>{
    if ($("#enviarfotocorreo").is(':checked')){
        $(".classfotocorreo").hide();
        archFoto.value = "";
        $("#Visuzaliarfoto").attr("data-img","");
        $("#Visuzaliarfoto").html('');
        btnSubirFoto.value = 'Subir foto'
    }
    else
        $(".classfotocorreo").show();
});
