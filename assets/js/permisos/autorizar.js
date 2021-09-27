//VARIABLES GLOBALES
const id_permiso = localStorage.getItem("id_permiso");
let DTVehiculos, DTPersonal, DTEquipoHerramienta, DTMaterial, DTDocAdicionales;
var id_empleado, id_empresa, id_persona_fisica, id_equipo, id_vehiculo, id_lista, var_id_estatus_pase;
var noSerieVehiculo, noPlacaVehiculo;

let cargaPestanaPersonal = false;
let cargaPestanaEquipo = false;
let cargaPestanaVehiculo = false;
let cargaPestanaMateriales = false;

class Permisos {
    constructor() {
        this.inicio()
        this.validar_faltantes()
        this.obtener_datos_contrato()
    }
    inicio() {

        textoModal.innerHTML = 'Motivo por el cual desea rechazar el permiso'

        var inputs = $(".show-contrato");
        for(var i = 0; i < inputs.length; i++){
            $(inputs[i]).text(id_permiso);
        }

        DTVehiculos = $(tabVehiculos).DataTable({
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
			}
        });

        DTPersonal = $(tabPersonal).DataTable({
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
			}
        });

        DTEquipoHerramienta = $(tabEquipoHerramienta).DataTable({
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
            "columnDefs": [
                { "width": "100%", "targets": 0 }
            ]
        });
        //Modal persona
        rechazar_persona.addEventListener('click', (ev) => {
            this.rechazar_persona(ev);
        });
        verificar_persona.addEventListener('click', (ev) => {
            this.verificar_persona(ev);
        });
        //Modal equipo
        //rechazar_equipo.addEventListener('click', this.rechazar_equipo)
        rechazar_equipo.addEventListener('click', (ev) => {
            this.habilitar_motivos(ev);
        });
        verificar_equipo.addEventListener('click', (ev) => {
            this.verificar_equipo(ev);
        });
        //Modal vehiuclos
        rechazar_vehiculo.addEventListener('click', (ev) => {
            this.rechazar_vehiculo(ev);
        });
        verificar_vehiculo.addEventListener('click',(ev) => {
            this.verificar_vehiculo(ev);
        });
        //Modal vehiuclos
        rechazar_material.addEventListener('click', (ev) => {
            this.rechazar_material(ev);
        });
        validar_material.addEventListener('click', (ev) => {
            this.verificar_material(ev);
        });
        //Boton validar permiso
        validar_permiso.addEventListener('click', (ev) => {
            this.solicitud_validada(ev);
        });
        //enviar_migracion.addEventListener('click', this.solicitud_migracion)
        rechazar_permiso.addEventListener('click', (ev) => {
            this.confirmar_rechazo(ev);
        });
        
        confirmar_baja.addEventListener('click', (ev) => {
            this.solicitud_rechazada(ev);
        });

        aceptar_autorizaciones.addEventListener('click', ()=>{
            window.location.href = base_url + 'Permisos/Ctrl_Permisos';
        })

        $(motivosRechazo).select2({placeholder : 'Seleccione'});
        //$('#selArea').val(areas).trigger('change');

        /*if(Area == 6 || Area == 7){
            labelEnviarMigracion.style.display = 'none'
        }*/
    }
    obtener_datos_contrato() {
        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/getById',
            type: 'GET',
            dataType: 'json',
            data: {
                idpermiso: id_permiso
            },
            beforeSend: () => {
                spinner.style.visibility = "visible";
            },
            success: function (response) {
                if (response.data != "") {
                    entidad.value = response.data.empresa
                    //referencia.value = response.data.numero_contrato // Validacion: Numero de contrato
                    tipoPermiso.value = response.data.tipo_permiso
                    clientetEntidad.value = response.data.visita
                    actividad.value = response.data.actividad
                    vigencia.value = response.data.vigencia
                    dias.value = response.data.dias
                    $(fechaInicio).val(response.data.fecha_inicio)
                    fechaTermino.value = response.data.fecha_termino
                    recinto.value = response.data.tipo_recinto
                    if(response.data.recinto_fiscalizado == null){
                        divrecinto.style.display = 'none'
                    }else{
                        divrecinto.style.display = 'block'
                    }
                    nombreRecinto.value = response.data.recinto_fiscalizado
                    motivo.value = response.data.motivo
                    permisoGrupal.checked = (response.data.permiso_grupal == 1 ? true : false)
                    curpResponsable.value = response.data.curp_responsable

                    if(response.data.id_tipo_vigencia == 2){
                        divDias.style.display = ""
                    }

                    if(response.data.permiso_grupal == 1){
                        divCURPResp.style.display = ""
                    }
                    var_id_estatus_pase = response.data.id_estatus_pase

                    /*if(response.data.id_estatus_pase != 1 && response.data.id_estatus_pase != 2){
                        labelEnviarMigracion.style.display = 'none'
                    }*/
                }
            }
        }).fail(function (response) {

        });
    }
    obtenerPersonal(){
        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/getPersonal',
            type: 'GET',
            dataType: 'json',
            data: {
                idpermiso: id_permiso
            },
            beforeSend: () => {
                DTPersonal.clear().draw();
                spinner.style.visibility = "visible";
            },
            success: function (response) {
                if (response.data != "") {
                    response.data.forEach(element => {
                        let consultar = "";
                        let validar = "";

                            consultar = '<div class="p-1">'+
                                '<a href="#" title="Consultar">'+
                                    '<span class="glyphicon glyphicon-eye-open ver fz-regular" data-id="'+element.id+'"></span'+
                                '</a>'+
                            '</div>';
                        if((Area == 5 && element.estatus_pase == 6) || (Area == 7 && element.estatus_pase_migracion == 9)){
                            validar = '<div class="p-1" id="validarPersona'+element.id+'">'+
                                '<a href="#" title="Verificar">'+
                                    '<span class="glyphicon glyphicon-ok-circle icono_validar fz-regular" data-id="'+element.id+'">'+
                                '</a>'+
                            '</div>';
                        }

                        DTPersonal.row.add([
                            '<center>'+element.tipo_persona+'</center>',
                            '<center>'+element.nombre+'</center>',
                            '<center>'+element.nacionalidad+'</center>',
                            '<center><span class="fz-regular" id="estatus_validarPersona'+element.id+'">'+element.estatus+'</span></center>',
                            '<center><span class="fz-regular" id="nombre_validarPersona'+element.id+'">'+element.validadopor+'</span></center>',
                            '<div class="d-flex justify-content-center">'+
                                consultar+
                                validar+
                            '</div>'
                        ]).draw(false)
                    })
                }
            },
            complete: function () {
                cargaPestanaPersonal = true;
            }
        }).fail(function (response) {

        });
    }
    obtenerEquipoHerramienta(){
        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/getEquiposHerramientas',
            type: 'GET',
            dataType: 'json',
            data: {
                idpermiso: id_permiso
            },
            beforeSend: () => {
                DTEquipoHerramienta.clear().draw();
                spinner.style.visibility = "visible";
            },
            success: function (response) {
                if (response.data != "") {
                    response.data.forEach(element => {
                        let consultar = "";
                        let validar = "";

                            consultar = '<div class="p-1">'+
                                '<a href="#" title="Consultar">'+
                                    '<span class="glyphicon glyphicon-eye-open ver fz-regular" data-id="'+element.id+'"></span'+
                                '</a>'+
                            '</div>';
                        if(Area == 6 && element.estatus_pase == 3){
                            validar = '<div class="p-10" id="validarEquipo'+element.id+'">'+
                                '<a href="#" title="Verificar">'+
                                    '<span class="glyphicon glyphicon-ok-circle icono_validar fz-regular" data-id="'+element.id+'">'+
                                '</a>'+
                            '</div>';
                        }

                        DTEquipoHerramienta.row.add([
                            '<center>'+element.tipo_equipo+'</center>',
                            '<center>'+element.modelo+'</center>',
                            '<center>'+element.marca+'</center>',
                            '<center>'+element.numero_serie+'</center>',
                            '<center><span class="fz-regular" id="estatus_validarEquipo'+element.id+'">'+element.estatus+'</span></center>',
                            '<center><span class="fz-regular" id="nombre_validarEquipo'+element.id+'">'+element.validadopor+'</span></center>',
                            '<div class="d-flex justify-content-center">'+
                                consultar+
                                validar+
                            '</div>'
                        ]).draw(false)
                    })
                }
            },
            complete: function () {
                cargaPestanaEquipo = true;
            }
        }).fail(function (response) {

        });
    }
    obtenerMaterial(){
        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/getMateriales',
            type: 'GET',
            dataType: 'json',
            data: {
                idpermiso: id_permiso
            },
            beforeSend: () => {
                DTMaterial.clear().draw();
                spinner.style.visibility = "visible";
            },
            success: function (response) {
                if (response.data.info != null) {
                    id_lista = response.data.info.id_lista
                    responsableMaterial.value = response.data.info.responsable
                    estatus_validarMaterial.value = response.data.info.estatus
                    nombre_validarMaterial.value = response.data.info.validadopor
                    if(Area == 6 &&response.data.info.estatus_pase == 3){
                        divValidarMaterial.style.display = ''
                    }
                    response.data.detail.forEach(element => {
                        DTMaterial.row.add([
                            '<center>'+element.tipo_material+'</center>',
                            '<center>'+element.descripcion+'</center>',
                            '<center>'+element.cantidad+'</center>',
                            '<center>'+(element.tipo_medida == null ? '' : element.tipo_medida)+'</center>',
                            '<center><a href="'+base_url+'assets/uploads/permisos/materiales/'+element.material_fotografia+'" target="_blank">Visualizar archivo</center>'
                        ]).draw(false)
                    })
                }
            },
            complete: function () {
                cargaPestanaMateriales = true;
            }
        }).fail(function (response) {

        });
    }
    obtenerVehiculo(ev){
        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/getVehiculos',
            type: 'GET',
            dataType: 'json',
            data: {
                idpermiso: id_permiso
            },
            beforeSend: () => {
                DTVehiculos.clear().draw();
                spinner.style.visibility = "visible";
            },
            success: function (response) {
                if (response.data != "") {
                    response.data.forEach(element => {
                        let consultar = "";
                        let validar = "";

                            consultar = '<div class="p-1">'+
                                '<a href="#" title="Consultar">'+
                                    '<span class="glyphicon glyphicon-eye-open ver fz-regular" data-id="'+element.id+'"></span'+
                                '</a>'+
                            '</div>';
                        if(Area == 5 && element.estatus_pase == 6){
                            validar = '<div class="p-1" id="validarVehiculo'+element.id+'">'+
                                '<a href="#" title="Verificar">'+
                                    '<span class="glyphicon glyphicon-ok-circle icono_validar fz-regular" data-id="'+element.id+'">'+
                                '</a>'+
                            '</div>';
                        }

                        DTVehiculos.row.add([
                            '<center>'+element.numero_serie+'</center>',
                            '<center>'+(element.numero_placa != '' ? element.numero_placa : element.tv_placa)+'</center>',
                            '<center>'+element.marca+'</center>',
                            '<center>'+element.modelo+'</center>',
                            '<center>'+element.anio+'</center>',
                            '<center>'+(element.color != '' ? element.color : element.tv_color)+'</center>',
                            '<center><span class="fz-regular" id="estatus_validarVehiculo'+element.id+'">'+element.estatus+'</span></center>',
                            '<center><span class="fz-regular" id="nombre_validarVehiculo'+element.id+'">'+element.validadopor+'</span></center>',
                            '<div class="d-flex justify-content-center">'+
                                consultar+
                                validar+
                            '</div>'
                        ]).draw(false)
                    })
                }
            },
            complete: function () {
                cargaPestanaVehiculo = true;
            }
        }).fail(function (response) {

        });
    }
        getPersonal(ev) {
            $.ajax({
                url: base_url + 'Permisos/Ctrl_Permisos/getPersonalById',
            type: 'GET',
            dataType: 'json',
            data: {
                id: ev.target.dataset.id,
                idpermiso : id_permiso
            },
            beforeSend: () => {
                spinner.style.visibility = "visible";
                $(pdfViewerFotografiaPersonal).html('')
                $(pdfViewerFotografiaIdentificacion).html('')
                $(pdfViewerFotografiaLicencia).html('')

                DTDocAdicionales.clear().draw()
            },
            success: function (response) {
                if (response.data != "") {

                    if(Area == 6){
                        campoobservacionpersona.style.display = 'none';
                        rechazar_persona.style.display = 'none';
                        verificar_persona.style.display = 'none';
                        cerrar_persona.style.display = 'block';
                    }

                    if(response.data.id_tipo_seguro == 1){
                        labelSeguro.innerHTML = 'NSS:'
                    }
                    if(response.data.id_tipo_seguro == 2){
                        labelSeguro.innerHTML = 'ISSSTE:'
                    }
                    if(response.data.id_tipo_seguro == 3){
                        labelSeguro.innerHTML = 'No. Seguro:'
                    }

                    nss.value = response.data.nss
                    nombre.value = response.data.nombre
                    curp.value = response.data.curp
                    lugarNacimiento.value = response.data.ciudad_nacimiento
                    nacionalidad.value = response.data.nacionalidad
                    correo.value = response.data.correo
                    telefono.value = response.data.telefono
                    empresa.value = response.data.empresa
                    clavePatronal.value = response.data.clave_patronal
                    //estatus.value = (response.data.estatus == 1 ? 'Activo' : 'Inactiva')
                    let mensaje_observacion = ''
                    txtObservacionPersonal.classList.remove("lectura");
                    txtObservacionPersonal.disabled = false
                    if(response.data.estatus_pase != 6 && response.data.estatus_pase_migracion != 9){
                        if(response.data.estatus_pase != 6){
                            txtObservacionPersonal.classList.add("lectura");
                            txtObservacionPersonal.disabled = true
                            mensaje_observacion += 'API: '+response.data.observacion
                        }
                        if(response.data.estatus_pase != 6 && (response.data.estatus_pase_migracion != 9 && response.data.estatus_pase_migracion != null)){
                            mensaje_observacion += "\n"
                        }
                        if(response.data.estatus_pase_migracion != 9 && response.data.estatus_pase_migracion != null){
                            txtObservacionPersonal.classList.add("lectura");
                            txtObservacionPersonal.disabled = true
                            mensaje_observacion += 'Migración: '+response.data.observacion_migracion
                        }
                    }
                    txtObservacionPersonal.value = mensaje_observacion
                    
                    this.validaciones = new VALIDACIONES();
                    let resultado = this.validaciones.curp(response.data.curp);
                    
                    fechaNacimiento.value = resultado.fecha_nacimiento
                    edad.value = resultado.edad
                    sexo.value = resultado.sexo

                    $.ajax({
                        url: base_url + 'Catalogos/Ctrl_Estados/getByClave',
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            clave: resultado.estado_nacimiento
                        },
                        success: function (data) {
                            lugarNacimiento.value = data.data.nombre
                        }
                    }).fail(function (response) {

                    });

                    if(response.data.tipo_identificacion == null){
                        txtidentificacion.style.display = 'none';
                    }
                    txtidentificacion.value = response.data.tipo_identificacion
                    txtNumeroidentificacion.value = response.data.numero_identificacion
                    venceIdentificacion.value = response.data.venceIdentificacion

                    if(response.data.numero_licencia == null){
                        divlicencia.style.display = 'none';
                    }
                    txtlicencia.value = response.data.numero_licencia
                    venceLicencia.value = response.data.venceLicencia

                    if(response.data.fotopersonal != null){
                        let ext = response.data.fotopersonal.split('.').pop();
                        if(ext == 'pdf'){
                            $(pdfViewerFotografiaPersonal).html('<object> <embed src="'+base_url+ response.data.fotopersonal+'" width="100%" height="300px"/></object>');
                        }else{
                            $(pdfViewerFotografiaPersonal).html('<div></div>');
                            $(pdfViewerFotografiaPersonal).html('<a href="'+base_url+ response.data.fotopersonal+'"target="_blank"><div class="img-zoom-container"><img id="fotografiapersonal" width="100%" src="' + base_url + response.data.fotopersonal + '"/></a>');
    
                            fotografiapersonal.onload = function(){
                                //imageZoom(this.width,this.height,fotografiapersonal.id);
                                fotografiapersonal.id
                            }
                        }
                    }
                    if(response.data.identificacion != null){
                        let ext = response.data.identificacion.split('.').pop();
                        if(ext == 'pdf'){
                            $(pdfViewerFotografiaIdentificacion).html('<object> <embed src="'+base_url+ response.data.identificacion+'" width="100%" height="300px"/></object><br><center><a href="'+base_url+ response.data.identificacion+'"target="_blank"><div class="img-zoom-container">Visualizar</a></center>');
                        }else{
                            $(pdfViewerFotografiaIdentificacion).html('<div></div>');
                            $(pdfViewerFotografiaIdentificacion).html('<a href="'+base_url+ response.data.identificacion+'"target="_blank"><div class="img-zoom-container"><img id="fotografiaidentificacion" width="100%" src="' + base_url + response.data.identificacion + '"/></a>');

                            fotografiaidentificacion.onload = function(){
                                //imageZoom(this.width,this.height,fotografiaidentificacion.id);
                                fotografiaidentificacion.id
                            }
                        }
                    }
                    if(response.data.licencia != ''){
                        let ext = response.data.licencia.split('.').pop();
                        if(ext == 'pdf'){
                            $(pdfViewerFotografiaLicencia).html('<object> <embed src="'+base_url+ response.data.licencia+'" width="100%" height="300px"/></object><br><center><a href="'+base_url+ response.data.licencia+'"target="_blank"><div class="img-zoom-container">Visualizar</a></center>');
                        }else{
                            $(pdfViewerFotografiaLicencia).html('<div></div>');
                            $(pdfViewerFotografiaLicencia).html('<a href="'+base_url+ response.data.licencia+'"target="_blank"><div class="img-zoom-container"><img id="fotografialicencia" width="100%" src="' + base_url + response.data.licencia + '"/></a>');

                            fotografialicencia.onload = function(){
                                //imageZoom(this.width,this.height,fotografialicencia.id);
                                fotografialicencia.id
                            }
                        }
                    }

                    response.data.documentos_adicionales.forEach(element => {
                        DTDocAdicionales.row.add([
                            '<center><a href="'+base_url+element.link+element.nombre+'" target="_blank" style="font-size: 18px;">Visualizar archivo</a></center>'
                        ]).draw(false)	
                    });

                    id_empleado = response.data.id_persona
                    id_empresa = response.data.id_empresa
                    id_persona_fisica = response.data.id_persona_fisica
                }
            },
            complete: function () {
                $(modal_autorizar_permiso_personal).css('margin-top', ajuste_altura_modal(ev));
                $(modal_autorizar_permiso_personal).modal('show');
            }
        }).fail(function (response) {

        });

    }
    getEquipoHerramienta(ev) {
        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/getEquiposHerramientasById',
            type: 'GET',
            dataType: 'json',
            data: {
                id: ev.target.dataset.id,
                permiso: id_permiso
            },
            beforeSend: () => {
                spinner.style.visibility = "visible";
                divOtros.style.display = "none";
                
                tipoEquipo.value = ""
                noSerieEquipo.value = ""
                marcaEquipo.value = ""
                modeloEquipo.value = ""
                resguardo.value = ""
                tipoDocumentoEquipo.value = ""
                noFacturaEquipo.value = ""
                anexo29.value = ""
                rf.value = ""
                descripcionEquipo.value = ""
                txtObservacionEquipo.val = ""

                $(pdfViewerfacturaequipo).html('');
                $(pdfViewerherramienta).html('');
                $(pdfViewerAnexo).html('');
                $(pdfViewerAnexo).html('');
            },
            success: function (response) {
                if (response.data != "") {
                    tipoEquipo.value = response.data.tipo_equipo
                    noSerieEquipo.value = response.data.numero_serie
                    marcaEquipo.value = response.data.marca
                    modeloEquipo.value = response.data.modelo
                    resguardo.value = response.data.resguardo
                    id_equipo = response.data.id
                    let mensaje_observacion = ''
                    if(Area != 6){
                        txtObservacionEquipo.classList.add("lectura");
                        txtObservacionEquipo.disabled = true
                    }
                    if(response.data.estatus_pase != 3){
                        txtObservacionEquipo.classList.add("lectura");
                        txtObservacionEquipo.disabled = true
                        mensaje_observacion += 'ADUANA: '+response.data.observacion
                    }
                    txtObservacionEquipo.value = mensaje_observacion
                    /*tipoDocumentoEquipo.value = 
                    noFacturaEquipo.value = */



                    if(response.data.imagen_factura != null){
                        let ext = response.data.imagen_factura.split('.').pop();
                        if(ext == 'pdf'){
                            $(pdfViewerfacturaequipo).html('<object> <embed src="'+base_url+ response.data.imagen_factura+'" width="100%" height="300px"/></object><br><center><a href="'+base_url+ response.data.imagen_factura+'"target="_blank">Visualizar</a></center>');
                        }else{
                            $(pdfViewerfacturaequipo).html('<div></div>');
                            $(pdfViewerfacturaequipo).html('<a href="'+base_url+ response.data.imagen_factura+'"target="_blank"><div class="img-zoom-container"><img id="fotografiaequipo" width="100%" src="' + base_url + response.data.imagen_factura + '"/></a>');
                        }
                        divFactura.style.display = ''
                        tipoDocumentoEquipo.value = response.data.documento_factura
                        noFacturaEquipo.value = response.data.numero_factura
                    }

                    if(response.data.numero_equipo != null){
                        let ext = response.data.imagen_equipo.split('.').pop();
                        if(ext == 'pdf'){
                            $(pdfViewerherramienta).html('<object> <embed src="'+base_url+ response.data.imagen_equipo+'" width="100%" height="300px"/></object><br><center><a href="'+base_url+ response.data.imagen_equipo+'"target="_blank">Visualizar</a></center>');
                        }else{
                            $(pdfViewerherramienta).html('<div></div>');
                            $(pdfViewerherramienta).html('<a href="'+base_url+ response.data.imagen_equipo+'"target="_blank"><div class="img-zoom-container"><img id="fotografiaherramiento" width="100%" src="' + base_url + response.data.imagen_equipo + '"/></a>');
                        }
                    }

                    if(response.data.imagen_anexo != ""){
                        let ext = response.data.imagen_anexo.split('.').pop();
                        if(ext == 'pdf'){
                            $(pdfViewerAnexo).html('<object> <embed src="'+base_url+ response.data.imagen_anexo+'" width="100%" height="300px"/></object><br><center><a href="'+base_url+ response.data.imagen_anexo+'"target="_blank">Visualizar</a></center>');
                        }else{
                            $(pdfViewerAnexo).html('<div></div>');
                            $(pdfViewerAnexo).html('<a href="'+base_url+ response.data.imagen_anexo+'"target="_blank"><div class="img-zoom-container"><img id="fotografiaherramiento" width="100%" src="' + base_url + response.data.imagen_anexo + '"/></a>');
                        }
                    }

                    if(response.data.imagen_rf != ""){
                        let ext = response.data.imagen_rf.split('.').pop();
                        if(ext == 'pdf'){
                            $(pdfViewerRF).html('<object> <embed src="'+base_url+ response.data.imagen_rf+'" width="100%" height="300px"/></object><br><center><a href="'+base_url+ response.data.imagen_rf+'"target="_blank">Visualizar</a></center>');
                        }else{
                            $(pdfViewerRF).html('<div></div>');
                            $(pdfViewerRF).html('<a href="'+base_url+ response.data.imagen_rf+'"target="_blank"><div class="img-zoom-container"><img id="fotografiaherramiento" width="100%" src="' + base_url + response.data.imagen_rf + '"/></a>');
                        }
                    }

                    if(response.data.id_tipo_equipo == 5){
                        divOtros.style.display = ""

                        anexo29.value = response.data.anexo_29
                        rf.value = response.data.rf
                        descripcionEquipo.value = response.data.descripcion
                    }
                    $(modal_autorizar_permiso_equipo).css('margin-top', ajuste_altura_modal(ev));
                    $(modal_autorizar_permiso_equipo).modal('show');
                }
            },
            complete: function () {

            }
        }).fail(function (response) {

        });
    }
    getVehiculo(ev, action) {
        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/getVehiculosById',
            type: 'GET',
            dataType: 'json',
            data: {
                id: ev.target.dataset.id
            },
            beforeSend: () => {
                spinner.style.visibility = "visible";
            },
            success: function (response) {
                if (response.data != "") {
                    noMotor.value = response.data.numero_motor
                    anio.value = response.data.anio
                    tipoVehiculo.value = response.data.tipo_vehiculo
                    tipoTarjeta.value = response.data.tipo_tarjeta_circulacion
                    noTarjeta.value = response.data.numero_tarjeta_circulacion
                    //vigenciaTarjeta.value = response.data.vigencia_tarjeta_circulacion
                    //tipoDocumento.value = response.data.tipo_factura
                    //noFacturaVehiculo.value = response.data.numero_factura
                    aseguradora.value = response.data.tipo_aseguradora
                    noPolizaVehiculo.value = response.data.numero_poliza
                    fechaInicio.value = response.data.fecha_inicio_cobertura
                    fechaFin.value = response.data.fecha_fin_cobertura

                    if(Area != 5){
                        txtObservacionEquipo.classList.add("lectura");
                        txtObservacionEquipo.disabled = true
                    }
                    if(response.data.observacion != null){
                        txtObservacionVehiculo.value = response.data.observacion
                        txtObservacionVehiculo.disabled = true
                    }
                    else{
                        txtObservacionVehiculo.value = ''
                        txtObservacionVehiculo.disabled = false
                    }
                    
                    id_vehiculo = response.data.id

                    noSerieVehiculo = response.data.noSerieVehiculo
                    noPlacaVehiculo = response.data.noPlaca

                    if(response.data.imagen_lateral){
                        $(pdfViewerlateral).html('<div></div>');
                        $(pdfViewerlateral).html('<a href="'+base_url+ response.data.imagen_lateral+'"target="_blank"><div class="img-zoom-container"><img id="fotografialateral" width="100%" src="' + base_url + response.data.imagen_lateral + '"/></a>');

                    }
                    if(response.data.imagen_placa){
                        $(pdfViewerplaca).html('<div></div>');
                        $(pdfViewerplaca).html('<a href="'+base_url+ response.data.imagen_placa+'"target="_blank"><div class="img-zoom-container"><img id="fotografiaplaca" width="100%" src="' + base_url + response.data.imagen_placa + '"/></a>');

                    }

                    $(modal_autorizar_permiso_vehiculo).css('margin-top', ajuste_altura_modal(ev));
                    $(modal_autorizar_permiso_vehiculo).modal('show');
                }
            },
            complete: function () {
                if(action == 1){
                    divRepuve.style.display = ''
                    divSivebu.style.display = ''
                    divArco.style.display = ''
                    Permisos.prototype.peticion_repuve();
                    Permisos.prototype.peticion_arco();
                    Permisos.prototype.peticion_sivebu();
                }else{
                    divRepuve.style.display = 'none'
                    divSivebu.style.display = 'none'
                    divArco.style.display = 'none'
                }
            }
        }).fail(function (response) {

        });
    }
    peticion_repuve(){
        $.ajax({
            async: false,
            url: base_url+'Utilidades/Ctrl_Servicios/getDatosVehiculos',
            type: 'GET',
            dataType: 'json',
            global: false,
            data:{
                endpoint : "repuvenacional",
                noserie : noSerieVehiculo,
                noplaca : noPlacaVehiculo
            },
            success: function(response){
                if(response.data != null){
                    $(noPlaca).val(response.data[0].placa)
                    $(noSerie).val(response.data[0].serie)
                    marca.value = response.data[0].marca
                    modelo.value = response.data[0].submarca
                    anio.value = response.data[0].modelo
                    color.value = response.data[0].color
                    submodelo.value = response.data[0].submarca
                }
            }
        }).fail(function(response){
            if(response.responseText=="Sesion"){
                error_sesion();
            }
        })
    }
    peticion_arco(){
        $.ajax({
            async: false,
			url: base_url+'Utilidades/Ctrl_Servicios/getDatosVehiculos',
			type: 'GET',
            dataType: 'json',
            global: false,
            data:{
                endpoint : "arcos",
                noserie : noSerieVehiculo,
                noplaca : noPlacaVehiculo
            },
            beforeSend: () => {
                $(tabmodalVehiculo).html('');
            },
			success: function(response){
                if(response.data != null){
                    response.data.forEach(element => {
                        $(tabmodalVehiculo).append("<tr><td>"+element.fecha+"</td><td>"+element.municipio+"</td><td>"+element.pmi+"</td><td>"+element.rumbo+"</td></tr>")
                    });
                }
			}
		}).fail(function(response){
            if(response.responseText=="Sesion"){
                error_sesion();
            }
        })
    }
    peticion_sivebu(){
        $.ajax({
            async: false,
			url: base_url+'Utilidades/Ctrl_Servicios/getDatosVehiculos',
			type: 'GET',
            dataType: 'json',
            global: false,
            data:{
                endpoint : "sivebu",
                noserie : noSerieVehiculo,
                noplaca : noPlacaVehiculo
            },
			success: function(response){
                reporte.value = response.message
			}
		}).fail(function(response){
            if(response.responseText=="Sesion"){
                error_sesion();
            }
        })
    }
    rechazar_persona(ev){
        let estatus_validacion
        let mensage_validacion = ''
        if(Area == 5){
            estatus_validacion = 5
            mensage_validacion = 'Rechazado API'
        }
        if(Area == 7){
            estatus_validacion = 8
            mensage_validacion = 'Rechazado Migración'
        }

        if(txtObservacionPersonal.value == ''){
            
        }
        let datos = {
            id_permiso: id_permiso,
            id_empleado: id_empleado,
            estatus_empleado: estatus_validacion,
            observaciones: txtObservacionPersonal.value,
            [csrf.name] : csrf.value
        }

        $.ajax({
            url: base_url+'Permisos/Ctrl_Permisos/upPersonalVerificacion',
            type: 'POST',
            dataType: 'json',
            global: false,
            data: datos,
            success: function(response){
                csrf.value = response.token;
                txtObservacionPersonal.value = ''
                validar_permiso.style.display = 'none'
                //labelEnviarMigracion.style.display = 'none'
                rechazar_permiso.style.display = 'none'
                let element1 = document.getElementById('validarPersona'+id_empleado)
                let element2 = document.getElementById('estatus_validarPersona'+id_empleado)
                let element3 = document.getElementById('nombre_validarPersona'+id_empleado)

                element1.style.display = 'none'
                element2.innerHTML = mensage_validacion
                if(response.data.nombre != null)
                    element3.innerHTML += response.data.nombre
                $(modal_autorizar_permiso_personal).css('margin-top', ajuste_altura_modal(ev));
                $(modal_autorizar_permiso_personal).modal('toggle');
                $(modal_registro_exitoso).css('margin-top', ajuste_altura_modal(ev));
                registro_exitoso();
                Permisos.prototype.validar_faltantes();
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $(modal_error).css('margin-top', ajuste_altura_modal(ev));
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        }).fail(function(response){
            if(response.responseText=="Sesion"){
                error_sesion();
            }
        })
    }
    verificar_persona(ev){
        let estatus_validacion
        let mensage_validacion = ''
        if(Area == 5){
            estatus_validacion = 4
            mensage_validacion = 'Validado API'
        }
        if(Area == 7){
            estatus_validacion = 7
            mensage_validacion = 'Validado Migración'
        }
        let datos = {
            id_permiso: id_permiso,
            id_empleado: id_empleado,
            estatus_empleado: estatus_validacion,
            observaciones: txtObservacionPersonal.value,
            [csrf.name] : csrf.value
        }

        $.ajax({
            url: base_url+'Permisos/Ctrl_Permisos/upPersonalVerificacion',
            type: 'POST',
            dataType: 'json',
            global: false,
            data: datos,
            success: function(response){
                csrf.value = response.token;
                txtObservacionPersonal.value = ''
                let element1 = document.getElementById('validarPersona'+id_empleado)
                let element2 = document.getElementById('estatus_validarPersona'+id_empleado)
                let element3 = document.getElementById('nombre_validarPersona'+id_empleado)

                element1.style.display = 'none'
                element2.innerHTML = mensage_validacion
                if(response.data.nombre != null)
                    element3.innerHTML += response.data.nombre
                $(modal_autorizar_permiso_personal).css('margin-top', ajuste_altura_modal(ev));
                $(modal_autorizar_permiso_personal).modal('toggle');
                $(modal_registro_exitoso).css('margin-top', ajuste_altura_modal(ev));
                registro_exitoso();
                Permisos.prototype.validar_faltantes();
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $(modal_error).css('margin-top', ajuste_altura_modal(ev));
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        }).fail(function(response){
            if(response.responseText=="Sesion"){
                error_sesion();
            }
        })
    }
    habilitar_motivos(ev){
        divMotivosRechazo.style.display=""
        rechazar_equipo.removeEventListener('click',Permisos.prototype.habilitar_motivos)
        rechazar_equipo.addEventListener('click', Permisos.prototype.rechazar_equipo(ev))
    }
    rechazar_equipo(ev){
        let mensage_validacion = 'Rechazado Aduana'
        let datos = {
            id_permiso: id_permiso,
            id_equipo: id_equipo,
            estatus_equipo: 2,
            observaciones: txtObservacionEquipo.value,
            [csrf.name] : csrf.value
        }

        $.ajax({
            url: base_url+'Permisos/Ctrl_Permisos/upEquipoVerificacion',
            type: 'POST',
            dataType: 'json',
            global: false,
            data: datos,
            success: function(response){
                csrf.value = response.token;
                txtObservacionEquipo.value = ''
                validar_permiso.style.display = 'none'
                //labelEnviarMigracion.style.display = 'none'
                rechazar_permiso.style.display = 'none'
                let element1 = document.getElementById('validarEquipo'+id_equipo)
                let element2 = document.getElementById('estatus_validarEquipo'+id_equipo)
                let element3 = document.getElementById('nombre_validarEquipo'+id_equipo)
                
                element1.style.display = 'none'
                element2.innerHTML = mensage_validacion
                if(response.data.nombre != null)
                element3.innerHTML = response.data.nombre
                $(modal_autorizar_permiso_equipo).css('margin-top', ajuste_altura_modal(ev));
                $(modal_autorizar_permiso_equipo).modal('toggle');
                $(modal_registro_exitoso).css('margin-top', ajuste_altura_modal(ev));
                registro_exitoso();
                Permisos.prototype.validar_faltantes();
            },
            complete:function(){
                divMotivosRechazo.style.display="none"
                rechazar_equipo.removeEventListener('click',Permisos.prototype.rechazar_equipo)
                rechazar_equipo.addEventListener('click', Permisos.prototype.habilitar_motivos)
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $(modal_error).css('margin-top', ajuste_altura_modal(ev));
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        }).fail(function(response){
            if(response.responseText=="Sesion"){
                error_sesion();
            }
        })
    }
    verificar_equipo(ev){
        let mensage_validacion = 'Validado Aduana'
        let datos = {
            id_permiso: id_permiso,
            id_equipo: id_equipo,
            estatus_equipo: 1,
            observaciones: txtObservacionEquipo.value,
            [csrf.name] : csrf.value
        }

        $.ajax({
            url: base_url+'Permisos/Ctrl_Permisos/upEquipoVerificacion',
            type: 'POST',
            dataType: 'json',
            global: false,
            data: datos,
            success: function(response){
                csrf.value = response.token;
                txtObservacionEquipo.value = ''
                let element1 = document.getElementById('validarEquipo'+id_equipo)
                let element2 = document.getElementById('estatus_validarEquipo'+id_equipo)
                let element3 = document.getElementById('nombre_validarEquipo'+id_equipo)
                
                element1.style.display = 'none'
                element2.innerHTML = mensage_validacion
                if(response.data.nombre != null)
                element3.innerHTML = response.data.nombre
                $(modal_autorizar_permiso_equipo).css('margin-top', ajuste_altura_modal(ev));
                $(modal_autorizar_permiso_equipo).modal('toggle');
                $(modal_registro_exitoso).css('margin-top', ajuste_altura_modal(ev));
                registro_exitoso();
                Permisos.prototype.validar_faltantes();
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $(modal_error).css('margin-top', ajuste_altura_modal(ev));
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        }).fail(function(response){
            if(response.responseText=="Sesion"){
                error_sesion();
            }
        })
    }
    rechazar_material(ev){
        let mensage_validacion = 'Rechazado Aduana'
        let datos = {
            id_permiso: id_permiso,
            id_lista: id_lista,
            estatus_material: 2,
            [csrf.name] : csrf.value
        }

        $.ajax({
            url: base_url+'Permisos/Ctrl_Permisos/upMaterialVerificacion',
            type: 'POST',
            dataType: 'json',
            global: false,
            data: datos,
            success: function(response){
                csrf.value = response.token;
                //txtObservacionMaterial.value = ''
                validar_permiso.style.display = 'none'
                //labelEnviarMigracion.style.display = 'none'
                rechazar_permiso.style.display = 'none'
                estatus_validarMaterial.value = mensage_validacion
                if(response.data.nombre != null)
                nombre_validarMaterial.value = response.data.nombre
                divValidarMaterial.style.display = 'none'
                $(modal_registro_exitoso).css('margin-top', ajuste_altura_modal(ev));
                registro_exitoso();
                Permisos.prototype.validar_faltantes();
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $(modal_error).css('margin-top', ajuste_altura_modal(ev));
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        }).fail(function(response){
            if(response.responseText=="Sesion"){
                error_sesion();
            }
        })
    }
    verificar_material(ev){
        let mensage_validacion = 'Validado Aduana'
        let datos = {
            id_permiso: id_permiso,
            id_lista: id_lista,
            estatus_material: 1,
            [csrf.name] : csrf.value
        }

        $.ajax({
            url: base_url+'Permisos/Ctrl_Permisos/upMaterialVerificacion',
            type: 'POST',
            dataType: 'json',
            global: false,
            data: datos,
            success: function(response){
                csrf.value = response.token;
                estatus_validarMaterial.value = mensage_validacion
                if(response.data.nombre != null)
                nombre_validarMaterial.value = response.data.nombre
                divValidarMaterial.style.display = 'none'
                $(modal_registro_exitoso).css('margin-top', ajuste_altura_modal(ev));
                registro_exitoso();
                Permisos.prototype.validar_faltantes();
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $(modal_error).css('margin-top', ajuste_altura_modal(ev));
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        }).fail(function(response){
            if(response.responseText=="Sesion"){
                error_sesion();
            }
        })
    }
    rechazar_vehiculo(ev){
        let mensage_validacion = 'Rechazado API'
        let datos = {
            id_permiso: id_permiso,
            id_vehiculo: id_vehiculo,
            estatus_vehiculo: 5,
            observaciones: txtObservacionVehiculo.value,
            [csrf.name] : csrf.value
        }

        $.ajax({
            url: base_url+'Permisos/Ctrl_Permisos/upVehiculosVerificacion',
            type: 'POST',
            dataType: 'json',
            global: false,
            data: datos,
            success: function(response){
                csrf.value = response.token;
                txtObservacionVehiculo.value = ''
                validar_permiso.style.display = 'none'
                //labelEnviarMigracion.style.display = 'none'
                rechazar_permiso.style.display = 'none'
                let element1 = document.getElementById('validarVehiculo'+id_vehiculo)
                let element2 = document.getElementById('estatus_validarVehiculo'+id_vehiculo)
                let element3 = document.getElementById('nombre_validarVehiculo'+id_vehiculo)

                element1.style.display = 'none'
                element2.innerHTML = mensage_validacion
                if(response.data.nombre != null)
                element3.innerHTML = response.data.nombre
                $(modal_autorizar_permiso_vehiculo).css('margin-top', ajuste_altura_modal(ev));
                $(modal_autorizar_permiso_vehiculo).modal('toggle');
                $(modal_registro_exitoso).css('margin-top', ajuste_altura_modal(ev));
                registro_exitoso();
                Permisos.prototype.validar_faltantes();
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $(modal_error).css('margin-top', ajuste_altura_modal(ev));
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        }).fail(function(response){
            if(response.responseText=="Sesion"){
                error_sesion();
            }
        })
    }
    verificar_vehiculo(ev){
        let mensage_validacion = 'Validado API'
        let datos = {
            id_permiso: id_permiso,
            id_vehiculo: id_vehiculo,
            estatus_vehiculo: 4,
            observaciones: txtObservacionVehiculo.value,
            [csrf.name] : csrf.value
        }

        $.ajax({
            url: base_url+'Permisos/Ctrl_Permisos/upVehiculosVerificacion',
            type: 'POST',
            dataType: 'json',
            global: false,
            data: datos,
            success: function(response){
                csrf.value = response.token;
                txtObservacionVehiculo.value = ''
                let element1 = document.getElementById('validarVehiculo'+id_vehiculo)
                let element2 = document.getElementById('estatus_validarVehiculo'+id_vehiculo)
                let element3 = document.getElementById('nombre_validarVehiculo'+id_vehiculo)

                element1.style.display = 'none'
                element2.innerHTML = mensage_validacion
                if(response.data.nombre != null)
                element3.innerHTML = response.data.nombre
                $(modal_autorizar_permiso_vehiculo).css('margin-top', ajuste_altura_modal(ev));
                $(modal_autorizar_permiso_vehiculo).modal('toggle');
                $(modal_registro_exitoso).css('margin-top', ajuste_altura_modal(ev));
                registro_exitoso();
                Permisos.prototype.validar_faltantes();
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $(modal_error).css('margin-top', ajuste_altura_modal(ev));
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        }).fail(function(response){
            if(response.responseText=="Sesion"){
                error_sesion();
            }
        })
    }
    validar_faltantes(ev){
        let personas = false
        let vechiculos = false
        let equipos = false
        let materiales = false
        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/getEstatusValidacion',
            type: 'GET',
            dataType: 'json',
            global: false,
            data: {
                idpermiso: id_permiso
            },
            success: function(response){
                if(Area == 5){
                    if(response.data[1].pendientes_personas_api == 0 && response.data[1].validados_personas_api > 0){
                        personas = true
                    }
                    if(response.data[4].pendientes_vechiculos == 0){
                        vechiculos = true
                    }
                    if(personas && vechiculos){
                        validar_permiso.disabled = false;
                    }
                }
                if(Area == 6) {
                    if(response.data[2].pendientes_equipos == 0){
                        equipos = true
                    }
                    if(response.data[3].pendientes_material == 0){
                        materiales = true
                    }
                    if(equipos && materiales){
                        validar_permiso.disabled = false
                    }
                }
                if(Area == 7){
                    if(response.data[0].pendientes_personas_migracion == 0 && response.data[0].validados_personas_migracion > 0){
                        personas = true
                    }
                    if(personas){
                        validar_permiso.disabled = false
                    }
                }
                csrf.value = response.token;
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        }).fail(function(response){
            if(response.responseText=="Sesion"){
                error_sesion();
            }
        })
    }
    solicitud_validada(ev){
        let datos = {
            idpermiso: id_permiso,
            idarea : Area,
            estatus : 1,
            [csrf.name] : csrf.value
        }

        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/upPermiso',
            type: 'POST',
            dataType: 'json',
            global: false,
            data: datos,
            success: function(response){
                csrf.value = response.token;
                $(modal_registro_exitoso_autorizaciones).css('margin-top', ajuste_altura_modal(ev));
                registro_exitoso_autorizaciones();
                validar_permiso.style.display = 'none'
                //labelEnviarMigracion.style.display = 'none'
                //enviar_migracion.disabled = true
                rechazar_permiso.style.display = 'none'
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $(modal_error).css('margin-top', ajuste_altura_modal(ev));
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        }).fail(function(response){
            if(response.responseText=="Sesion"){
                error_sesion();
            }
        })
    }
    confirmar_rechazo(ev){
        $("#modal_confirmar_baja_motivo").css('margin-top', ajuste_altura_modal(ev));
        pedir_confirmacion_eliminar_motivo()
    }
    solicitud_rechazada(ev){
        let datos = {
            idpermiso: id_permiso,
            idarea : Area,
            observacion: observacionMotivo.value,
            [csrf.name] : csrf.value
        }

        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/upPermisoMotivos',
            type: 'POST',
            dataType: 'json',
            global: false,
            data: datos,
            beforeSend: function(){
                $("#modal_confirmar_baja_motivo").modal('hide');
            },
            success: function(response){
                csrf.value = response.token;
                $(modal_registro_exitoso_autorizaciones).css('margin-top', ajuste_altura_modal(ev));
                registro_exitoso_autorizaciones();
                validar_permiso.style.display = 'none'
                //labelEnviarMigracion.style.display = 'none'
                rechazar_permiso.style.display = 'none'
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $(modal_error).css('margin-top', ajuste_altura_modal(ev));
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        }).fail(function(response){
            if(response.responseText=="Sesion"){
                error_sesion();
            }
        })
    }
    /*solicitud_migracion(ev){
        let datos = {
            idpermiso: id_permiso,
            [csrf.name] : csrf.value
        }

        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/upPermisoMigracion',
            type: 'POST',
            dataType: 'json',
            global: false,
            data: datos,
            success: function(response){
                csrf.value = response.token;
                registro_exitoso("Se ha enviado a migracion");
                //labelEnviarMigracion.style.display = 'none'
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        }).fail(function(response){
            if(response.responseText=="Sesion"){
                error_sesion();
            }
        })
    }*/
}
const permiso = new Permisos();

$(tabPersonal).on('click', '.icono_validar', function (ev) {
    //campoobservacionpersona.style.display = 'block';
    rechazar_persona.style.display = 'block';
    verificar_persona.style.display = 'block';
    cerrar_persona.style.display = 'none';
    permiso.getPersonal(ev);
});

$(tabEquipoHerramienta).on('click', '.icono_validar', function (ev) {
    //campoobservacionequipo.style.display = 'block';
    rechazar_equipo.style.display = 'block';
    verificar_equipo.style.display = 'block';
    cerrar_equipo.style.display = 'none';
    permiso.getEquipoHerramienta(ev);
});

$(tabVehiculos).on('click', '.icono_validar', function (ev) {
    //campoobservacionvehiculo.style.display = 'block';
    rechazar_vehiculo.style.display = 'block';
    verificar_vehiculo.style.display = 'block';
    cerrar_vechiculo.style.display = 'none';

    permiso.getVehiculo(ev, 1);
});

$(tabPersonal).on('click', '.ver', function (ev) {
    //campoobservacionpersona.style.display = 'none';
    rechazar_persona.style.display = 'none';
    verificar_persona.style.display = 'none';
    cerrar_persona.style.display = 'block';
    permiso.getPersonal(ev);
});

$(tabEquipoHerramienta).on('click', '.ver', function (ev) {
    //campoobservacionequipo.style.display = 'none';
    rechazar_equipo.style.display = 'none';
    verificar_equipo.style.display = 'none';
    cerrar_equipo.style.display = 'block';
    permiso.getEquipoHerramienta(ev);
});

$(tabVehiculos).on('click', '.ver', function (ev) {
    //campoobservacionvehiculo.style.display = 'none';
    rechazar_vehiculo.style.display = 'none';
    verificar_vehiculo.style.display = 'none';
    cerrar_vechiculo.style.display = 'block';
    permiso.getVehiculo(ev, 0);
});

$(personaltab).click(function(){
    if(!cargaPestanaPersonal){
        permiso.obtenerPersonal()
    }
})
$(equipoherramientatab).click(function(){
    if(!cargaPestanaEquipo){
        permiso.obtenerEquipoHerramienta()
    }
})
$(materialGraneltab).click(function(){
    if(!cargaPestanaMateriales){
        permiso.obtenerMaterial()
    }
})
$(vehiculotab).click(function(){
    if(!cargaPestanaVehiculo){
        permiso.obtenerVehiculo()
    }
})

var images = $(".image");

$(images).on("error", function(event) {
    $(event.target).css("display", "none");
});

//Control de cambio de pestañas
$(".nav-link").click(function(){
    let siguiente = $(this).data("orden")
    if(siguiente > 1){
        $(".anterior").show();
    }else{
        $(".anterior").hide();
    }

    if(siguiente == 5){
        $(".siguiente").hide();
    }else{
        $(".siguiente").show();
    }
});

$('.siguiente').click(function () {
    $('.nav-tabs > .active').next('li').find('a').trigger('click');
});

$('.anterior').click(function () {
    $('.nav-tabs > .active').prev('li').find('a').trigger('click');
});

// Zoom image functions

function imageZoom(sizex, sizey, idfotografia) {
    var img, lens, result, cx, cy;
    img = document.getElementById(idfotografia);
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