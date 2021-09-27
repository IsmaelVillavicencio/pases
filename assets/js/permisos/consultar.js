//VARIABLES GLOBALES
const id_permiso = localStorage.getItem("id_permiso");
const url_regreso = localStorage.getItem("url_regreso");
var estatus_permiso = 0;

let DTVehiculos, DTPersonal, DTEquipoHerramienta, DTMaterial, DTDocAdicionales;
var id_empleado, id_empresa, id_persona_fisica, id_equipo, id_vehiculo;
var idPeticionREPUVE = 0;
var peticionesREPUVE = 0;
let idPeticionARCO = 0;
let peticionesARCO = 0;
let idPeticionSIVEBU = 0;
let peticionesSIVEBU = 0;
var noSerieVehiculo, noPlacaVehiculo;

let cargaPestanaPersonal = false;
let cargaPestanaEquipo = false;
let cargaPestanaVehiculo = false;
let cargaPestanaMateriales = false;

class Permisos{
    constructor(){
        this.inicio()
        this.obtener_datos_contrato()
    }
    inicio(){

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

        regresar.setAttribute("href", base_url+url_regreso);
        //rechazar_persona.addEventL
        //verificar_personal.addEventL
    }
    obtener_datos_contrato(){
        $.ajax({
			url: base_url+'Permisos/Ctrl_Permisos/getById',
			type: 'GET',
            dataType: 'json',
            data : {
                idpermiso : id_permiso
            },
            beforeSend: () => {
                spinner.style.visibility="visible";
            },
			success: function(response){

                if(response.data!=""){
                    if(response.data.estatus == 1){
                        vistaPrevia.style.display = 'none';
                    }else{
                        vistaPrevia.style.display = 'block';
                    }
                    if(response.data.estatus_permiso == 3){
                        divVistaPrevia.style.display = 'block'
                    }else{
                        divVistaPrevia.style.display = 'none'
                    }

                    entidad.value = response.data.empresa
                    //referencia.value = response.data.numero_contrato
                    tipoPermiso.value = response.data.tipo_permiso
                    clientetEntidad.value = response.data.visita
                    actividad.value = response.data.actividad
                    vigencia.value = response.data.vigencia
                    dias.value = response.data.dias
                    fechaIni.value = response.data.fecha_inicio
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
                }
            },
            complete: function(){
                
            }   
		}).fail( function(response) {
            
		}); 

        $.ajax({
			url: base_url+'Permisos/Ctrl_Permisos/getObservacionesPermisos',
			type: 'GET',
            dataType: 'json',
            data : {
                idpermiso : id_permiso
            },
			success: function(response){
                if(response.data != ""){
                    let observaciones_rechazo = ''

                    if((observaciones_rechazo != '' || response.data.Estatus_personales != '' || response.data.Estatus_equipos != '' || response.data.Estatus_materiales != '' || response.data.Estatus_vehiculos != '' || response.data.Observacion_pase != '') && (response.data.id_estatus_pase == 12 || response.data.id_estatus_pase == 13)){
                        divRechazoPase.style.display = ''
                        observaciones_rechazo += (response.data.Observacion_pase != '') ? 'Estatus pase: \n\n' + response.data.Observacion_pase+'\n\n' : ''
                        observaciones_rechazo += (response.data.Observacion_personales != '') ? response.data.Estatus_personales + '\n\n' + response.data.Observacion_personales+'\n\n' : ''
                        observaciones_rechazo += (response.data.Observacion_equipos != '') ? response.data.Estatus_equipos + '\n\n' + response.data.Observacion_equipos+'\n\n' : ''
                        observaciones_rechazo += (response.data.Observacion_materiales != '') ?response.data.Estatus_materiales + '\n\n' + response.data.Observacion_materiales+'\n\n' : ''
                        observaciones_rechazo += (response.data.Observacion_vehiculos != '') ?response.data.Estatus_vehiculos + '\n\n' + response.data.Observacion_vehiculos : ''
                        motivo_pase.value = observaciones_rechazo
                    }
                }
            },
            complete: function(){
                
            }   
		}).fail( function(response) {
            
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

                            consultar = '<div class="p-1">'+
                                '<a href="#" title="Consultar">'+
                                    '<span class="glyphicon glyphicon-eye-open ver fz-regular" data-id="'+element.id+'"></span'+
                                '</a>'+
                            '</div>';

                        DTPersonal.row.add([
                            '<center>'+element.tipo_persona+'</center>',
                            '<center>'+element.nombre+'</center>',
                            '<center>'+element.nacionalidad+'</center>',
                            '<center><span class="fz-regular" id="estatus_validarPersona'+element.id+'">'+element.estatus+'</span></center>',
                            '<center><span class="fz-regular" id="nombre_validarPersona'+element.id+'">'+element.validadopor+'</span></center>',
                            '<div class="d-flex justify-content-center">'+
                                consultar+
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

                            consultar = '<div class="p-1">'+
                                '<a href="#" title="Consultar">'+
                                    '<span class="glyphicon glyphicon-eye-open ver fz-regular" data-id="'+element.id+'"></span'+
                                '</a>'+
                            '</div>';

                        DTEquipoHerramienta.row.add([
                            '<center>'+element.tipo_equipo+'</center>',
                            '<center>'+element.modelo+'</center>',
                            '<center>'+element.marca+'</center>',
                            '<center>'+element.numero_serie+'</center>',
                            '<center><span style="font-size: 12px;" id="estatus_validarEquipo'+element.id+'">'+element.estatus+'</span></center>',
                            '<center><span style="font-size: 12px;" id="nombre_validarEquipo'+element.id+'">'+element.validadopor+'</span></center>',
                            '<div class="d-flex justify-content-center">'+
                                consultar+
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
                    responsableMaterial.value = response.data.info.responsable
                    estatus_validarMaterial.value = response.data.info.estatus
                    nombre_validarMaterial.value = response.data.info.validadopor

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
    obtenerVehiculo(){
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

                            consultar = '<div class="p-1">'+
                                '<a href="#" title="Consultar">'+
                                    '<span class="glyphicon glyphicon-eye-open ver fz-regular" data-id="'+element.id+'"></span'+
                                '</a>'+
                            '</div>';

                        DTVehiculos.row.add([
                            '<center>'+element.numero_serie+'</center>',
                            '<center>'+(element.numero_placa != '' ? element.numero_placa : element.tv_placa)+'</center>',
                            '<center>'+element.marca+'</center>',
                            '<center>'+element.modelo+'</center>',
                            '<center>'+element.anio+'</center>',
                            '<center>'+(element.color != '' ? element.color : element.tv_color)+'</center>',
                            '<center><span style="font-size: 12px;" id="estatus_validarVehiculo'+element.id+'">'+element.estatus+'</span></center>',
                            '<center><span style="font-size: 12px;" id="nombre_validarVehiculo'+element.id+'">'+element.validadopor+'</span></center>',
                            '<div class="d-flex justify-content-center">'+
                                consultar+
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
                    txtObservacionPersonal.classList.add("lectura");
                    txtObservacionPersonal.disabled = true
                    let mensaje_observacion = ''
                    if(response.data.estatus_pase != 6){
                        mensaje_observacion += 'API: '+response.data.observacion
                    }
                    if(response.data.estatus_pase != 6 && (response.data.estatus_pase_migracion != 9 && response.data.estatus_pase_migracion != null)){
                        mensaje_observacion += "\n\n"
                    }
                    if(response.data.estatus_pase_migracion != 9 && response.data.estatus_pase_migracion != null){
                        mensaje_observacion += 'Migración: '+response.data.observacion_migracion
                    }
                    txtObservacionPersonal.value = mensaje_observacion
                    txtObservacionPersonal.style.cssText = "border-bottom:0px !important"
                    
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
                        divIdentificacion.style.display = 'none';
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
                            $(pdfViewerFotografiaIdentificacion).html('<object> <embed src="'+base_url+ response.data.identificacion+'" width="100%" height="300px"/></object><br><center><a href="'+base_url+ response.data.identificacion+'"target="_blank">Visualizar</a></center>');
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
                            $(pdfViewerFotografiaLicencia).html('<object> <embed src="'+base_url+ response.data.licencia+'" width="100%" height="300px"/></object><br><center><a href="'+base_url+ response.data.licencia+'"target="_blank">Visualizar</a></center>');
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
                    txtObservacionEquipo.classList.add("lectura");
                    txtObservacionEquipo.disabled = true
                    if(response.data.estatus_pase != 3){
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
                
                    if(response.data.observacion != null){
                        txtObservacionVehiculo.value = response.data.observacion
                        txtObservacionVehiculo.disabled = true
                    }
                    else{
                        txtObservacionVehiculo.value = ''
                        txtObservacionVehiculo.disabled = true
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
                noserie  : noSerieVehiculo,
                noplaca : noPlacaVehiculo
            },
            success: function(response){
                 
                if(response.data != null){ 
                    console.log(response.data)       
                    $(noPlaca).val(response.data[0].placa)
                    $(noSerie).val(response.data[0].serie)
                    marca.value = response.data[0].marca
                    submodelo.value = response.data[0].submarca
                    modelo.value = response.data[0].modelo
                    color.value = response.data[0].color
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
                noserie  : noSerieVehiculo,
                noplaca  : ""
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
                noplaca : ""
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
}
const  permiso = new Permisos();


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

//Control de cambio de pestañas
    
    $('.siguiente').click(function () {
        $('.nav-tabs > .nav-item > .active').parent().next('li').find('a').trigger('click');
    });

    $('.anterior').click(function () {
        $('.nav-tabs > .nav-item > .active').parent().prev('li').find('a').trigger('click');
    });

    $('.nav-link').click(function(){


        if(siguiente > 1){
            $('.anterior').show();
        }else{
            $('.anterior').hide();
        }

        if(siguiente == 5){
            $('.siguiente').hide();
        }else{
            $('.siguiente').show();
        }
    });