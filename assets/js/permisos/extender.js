//VARIABLES GLOBALES
const id_permiso = localStorage.getItem("id_permiso");
const estatus_permiso = 0;

let DTVehiculos, DTPersonal, DTEquipoHerramienta, DTMateriales;
var id_empleado, id_empresa, id_persona_fisica, id_equipo, id_vehiculo, id_tipo_permiso, id_actividad, id_recinto, id_fiscalizacion;
var datosPersonal = []
var datosEquipos = []
var datosVehiculos = []
var id_contrato = 0, new_id_permiso;
var idPeticionREPUVE = 0;
var peticionesREPUVE = 0;
let idPeticionARCO = 0;
let peticionesARCO = 0;
let idPeticionSIVEBU = 0;
let peticionesSIVEBU = 0;
var noSerieVehiculovar, noPlacaVehiculo;
var personalAlmacenado = []
var validacionFecha = [];
var validacion = false;
var fotoFacturaEquipo = null
var fotoFacturaVehiculo = null
var fotoLateralVehiculo = null
var fotoPlacaVehiculo = null
var fotoLicencia = null
var fotoIdentificacion = null
var fotoPersona = null

class Permisos{
    constructor(){
        this.inicio()
        this.obtener_tipos_empleados()
        this.obtener_nacionalidades()
        this.obtener_tipos_identificacion()
        this.obtener_vigencias()
        this.obtener_tipos_equipos()
        this.obtener_tipos_documentos()
        this.obtener_aseguradoras()
        this.obtener_tipos_vehiculos()
        this.obtener_tipos_tarjetas_circulacion()
        this.obtener_periodos()
        this.obtener_datos_contrato()
        this.obtenerPersonal()
        this.obtenerEquipoHerramienta()
        this.obtenerVehiculo()
    }
    inicio(){
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

        DTMateriales = $(tabMaterial).DataTable({
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
			}
        });

        vigencia.addEventListener('change',(ev)=>{
            if(ev.target.value == 2){
                divDias.style.display = ""
                dias.setAttribute("class","form-control validar-requerido reiniciar-pase")
                fechaTermino.setAttribute("class","lectura validar-requerido reiniciar-pase")
                fechaTermino.setAttribute("disabled",true)
                //fechaTermino.removeAttribute("disabled")
            }else{
                divDias.style.display = "none"
                dias.setAttribute("class","form-control reiniciar-pase")
                fechaTermino.setAttribute("class","lectura validar-requerido reiniciar-pase")
                fechaTermino.setAttribute("disabled",true)
                fechaTermino.value = FechaInicio.value
            }
        })

        dias.addEventListener("change",()=>{
            if(vigencia.value == 2 && FechaInicio.value != ""){
                let termino_tmp = new Date(FechaInicio.value+" 00:00:00")
                termino_tmp.setDate(termino_tmp.getDate() + (parseInt(dias.value) > 0 ? parseInt(dias.value)-1 : 0));
                fechaTermino.value = new Date(termino_tmp.getTime() - (termino_tmp.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
                $(errorfechaTermino).html("")
                Permisos.prototype.validar_vigencias()
                tipoEmpleado.removeAttribute("disabled")
            }
        })

        FechaInicio.addEventListener('change',(ev)=>{
            if(ev.target.value == ""){
                fechaTermino.value = ""
                fechaTermino.setAttribute("min",actual)
            }else{
                fechaTermino.setAttribute("min",ev.target.value)

                if(vigencia.value == 2){
                    let termino_tmp = new Date(ev.target.value+" 00:00:00")
                    termino_tmp.setDate(termino_tmp.getDate() + (parseInt(dias.value) > 0 ? parseInt(dias.value)-1 : 0));
                    fechaTermino.value = new Date(termino_tmp.getTime() - (termino_tmp.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
                    Permisos.prototype.validar_vigencias()
                    tipoEmpleado.removeAttribute("disabled")
                    
                }
            }

            if(vigencia.value == 1){
                fechaTermino.value = ev.target.value
                tipoEmpleado.removeAttribute("disabled")
            }
        })

        nacionalidad.addEventListener("change",this.validar_tipoPersona_nacionalidad)
        tipoEmpleado.addEventListener("change",this.validar_tipoPersona_nacionalidad)
        noPlaca.addEventListener("change",this.peticion_repuve)

        extenderPermiso.addEventListener('click',this.confirmar_almacenamiento)
        confirmar_guardar.addEventListener('click',this.realizar_actualizacion_datos_pase)
    }
    obtener_tipos_empleados(){
        $.ajax({
			url: base_url+'Catalogos/Ctrl_TiposEmpleados/getByEstatus',
			type: 'GET',
            dataType: 'json',
            data : {
                estatus : 1
            },
            beforeSend: function(){
                $(tipoEmpleado).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(tipoEmpleado).append('<option value="'+element.id+'">'+element.nombre+'</option>');
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
                $(nacionalidad).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(nacionalidad).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {
			
		});
    }
    obtener_tipos_identificacion(){
        $.ajax({
			url: base_url_rest+'catalogos/tipoidentificacion/estatus/1',
			type: 'GET',
            dataType: 'json',
            beforeSend: function(){
                $(tipoIdentificacion).html('');
                $(tipoIdentificacion).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(tipoIdentificacion).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {
			
		});
    }
    obtener_vigencias(){
        $.ajax({
			url: base_url+'Catalogos/Ctrl_Vigencias/getByEstatus',
			type: 'GET',
            dataType: 'json',
            data : {
                estatus : 1
            },
            beforeSend: function(){
                $(vigencia).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(vigencia).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {
			
		});
    }
    obtener_tipos_equipos(){
        $.ajax({
			url: base_url+'Catalogos/Ctrl_TiposEquipos/getByEstatus',
			type: 'GET',
            dataType: 'json',
            data : {
                estatus : 1
            },
            beforeSend: function(){
                $(tipoEquipo).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(tipoEquipo).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {
			
		});
    }
    obtener_tipos_documentos(){
        $.ajax({
			url: base_url+'Catalogos/Ctrl_TiposDocumentos/getByEstatus',
			type: 'GET',
            dataType: 'json',
            data : {
                estatus : 1
            },
            beforeSend: function(){
                $(tipoDocumento).append('<option value="">Seleccione</option>');
                $(tipodocumentoVeh).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    if(element.id == 3 || element.id == 4){
                        $(tipoDocumento).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                        $(tipodocumentoVeh).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                    }
                });
			}
		}).fail( function(response) {
			
		});
    }
    obtener_aseguradoras(){
        $.ajax({
			url: base_url_rest+'catalogos/tipoaseguradora/estatus/1',
			type: 'GET',
            dataType: 'json',
            beforeSend: function(){
                $(aseguradoras).append('<option value="">Seleccione</option>');
                $(aseguradorasVeh).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(aseguradoras).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                    $(aseguradorasVeh).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {
			
		});
    }
    obtener_tipos_vehiculos(){
        $.ajax({
			url: base_url_rest+'catalogos/tipovehiculo/estatus/1',
			type: 'GET',
            dataType: 'json',
            beforeSend: function(){
                $(tipoVehiculo).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(tipoVehiculo).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {
			
		});
    }
    obtener_tipos_tarjetas_circulacion(){
        $.ajax({
			url: base_url_rest+'catalogos/tipotarjetascirculacion/estatus/1',
			type: 'GET',
            dataType: 'json',
            beforeSend: function(){
                $(tipoTarjetaCirculacion).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(tipoTarjetaCirculacion).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {
			
		});
    }
    obtener_periodos(){
        $.ajax({
			url: base_url+'Catalogos/Ctrl_TiposPeriodo/getByEstatus',
			type: 'GET',
            dataType: 'json',
            data : {
                estatus : 1
            },
            beforeSend: function(){
                $(periodoPago).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(periodoPago).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {
			
		});
    }
    validar_tipoPersona_nacionalidad(nacionalidadMod){
            
        divNacionalidad.style.display = ""

        if(nacionalidad.value == 1){
            divCURP.style.display = ""
            $(tipoIdentificacion).data("nacional",1)
        }else{
            divCURP.style.display = "none"
            $(tipoIdentificacion).data("nacional",0)
        }

        if(tipoEmpleado.value == 1 || tipoEmpleado.value == ''){
            divEmpresa.style.display = "none"
            divClavePatronal.style.display = "none"
            if(tipoEmpleado.value == 1){    
                divNoSeguroSocial.style.display = ""
            }else{    
                divNoSeguroSocial.style.display = "none"
            }
        }else{
            divEmpresa.style.display = "none"
            divClavePatronal.style.display = "none"
        }

        if(tipoEmpleado.value == 5){
            if(nacionalidad.value == 1){    
                divEntidad.style.display = ""
                divClavePatronal.style.display = ""
                divNoSeguroSocial.style.display = "none"
                divNoIssste.style.display = ""
                divNoSeguro.style.display = "none"
                divAseguradora.style.display = "none"
            }else if(nacionalidad.value == 2){    
                divEntidad.style.display = "none"
                divClavePatronal.style.display = "none"
                divNoSeguroSocial.style.display = "none"
                divNoIssste.style.display = "none"
                divNoSeguro.style.display = ""
                divAseguradora.style.display = ""
            }else{    
                divEntidad.style.display = "none"
                divClavePatronal.style.display = "none"
                divNoSeguroSocial.style.display = "none"
                divNoIssste.style.display = "none"
                divNoSeguro.style.display = "none"
                divAseguradora.style.display = "none"
            }
        } 
        if(tipoEmpleado.value == 1){
            if(nacionalidad.value == 1){
                divAseguradora.style.display = "none"
                divNoSeguro.style.display = "none"
            }else{
                divNoSeguroSocial.style.display = "none"
            }
        }

        if(tipoEmpleado.value != 1 && tipoEmpleado.value != 5 && nacionalidad.value == 2){
            divClavePatronal.style.display = "none"
            divNoSeguroSocial.style.display = "none"
            divNoIssste.style.display = "none"
            divNoSeguro.style.display = ""
            divAseguradora.style.display = ""
        }

        if(tipoEmpleado.value != 1 && tipoEmpleado.value != 5 && nacionalidad.value == 1){
            divNoSeguroSocial.style.display = ""
            divNoIssste.style.display = "none"
            divNoSeguro.style.display = "none"
            divAseguradora.style.display = "none"
        }

        if(nacionalidad.value != ""){
            divNombreApellidos.style.display = ""
            divTelefono.style.display = ""
            divCorreo.style.display = ""
            divChofer.style.display = ""
            divTipoIdentificacion.style.display = ""
            divAnadir.style.display = ""
        }else{
            divEmpresa.style.display = "none"
            divClavePatronal.style.display = "none"

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
    obtener_datos_contrato(){
        $.ajax({
			url: base_url+'Permisos/Ctrl_Permisos/getDates',
			type: 'GET',
            dataType: 'json',
            data : {
                idpermiso : id_permiso
            },
            beforeSend: () => {
                spinner.style.visibility="visible";
            },
			success: function(response){
                validacionFecha = response.data;
            },
		}).fail( function(response) {
            
		}); 
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
                    id_contrato = response.data.id_contrato
                    id_persona_fisica = response.data.id_persona_fisica
                    id_empresa = response.data.id_empresa
                    id_tipo_permiso = response.data.id_tipo_permiso
                    id_actividad = response.data.id_tipo_actividad
                    id_recinto = response.data.id_recinto
                    id_fiscalizacion = response.data.id_fiscalizado

                    entidad.value = response.data.empresa
                    referencia.value = response.data.numero_contrato
                    tipoPermiso.value = response.data.tipo_permiso
                    clientetEntidad.value = response.data.visita
                    actividad.value = response.data.actividad
                    /*vigencia.value = response.data.id_vigencia
                    dias.value = response.data.dias

                    FechaInicio.value =  response.data.fecha_termino
                    fechaTermino.value =  response.data.fecha_termino*/
                    FechaInicio.setAttribute("min",  response.data.fecha_termino)

                    /*if(response.data.id_tipo_vigencia == 1){
                        let dateArr = response.data.fecha_termino.split('-');
                        let tempDate = new Date();
                        let mm = dateArr[1] - 1; //Javascript considers 0 as Jan
                        tempDate.setFullYear(dateArr[0]);
                        tempDate.setMonth(mm);
                        tempDate.setDate(dateArr[2]);
                        tempDate.setDate(tempDate.getDate(dateArr[2]) + 1);//Add's one day

                        let userFriendlyMonth = (Number(tempDate.getMonth()) + 1); //user considers 1 as Jan
                        if (userFriendlyMonth.toString().length < 2) {
                            userFriendlyMonth = "0" + userFriendlyMonth;
                        }

                        let userFriendlyDay = (Number(tempDate.getDate()));
                        if (userFriendlyDay.toString().length < 2) {
                            userFriendlyDay = "0" + userFriendlyDay;
                        }
                        let dateadd = tempDate.getFullYear() + '-' + userFriendlyMonth + '-' + userFriendlyDay;
    
                        FechaInicio.value = dateadd
                        fechaTermino.value = dateadd
                        FechaInicio.setAttribute("min", dateadd)
                    }*/
                    
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
    }
    cargar_personal(){
        $(selChofer).html('');
        $(resguardo).html('');
        $(selChofer).append('<option value="">Seleccione</option>');
        $(resguardo).append('<option value="">Seleccione</option>');
        for (let index = 0; index < datosPersonal.length; index++) {
            $(selChofer).append('<option value="'+index+'" data-id="'+datosPersonal[index].idpersona+'">'+datosPersonal[index].nombre+' '+datosPersonal[index].primerApellido+' '+datosPersonal[index].segundoApellido+'</option>');
            $(resguardo).append('<option value="'+index+'" data-id="'+datosPersonal[index].idpersona+'">'+datosPersonal[index].nombre+' '+datosPersonal[index].primerApellido+' '+datosPersonal[index].segundoApellido+'</option>');
        }
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
                spinner.style.visibility = "visible";
            },
            success: function (response) {
                if (response.data != "") {
                    response.data.forEach(element => {
                        $.ajax({
                            url: base_url+'Usuarios/Ctrl_Personal/getByCURP',
                            type: 'GET',
                            dataType: 'json',
                            global: false,
                            data : {
                                curp : element.curp
                            },
                            beforeSend: function(){
                                idpersona.value = 0
                                adjuntarLicencia.dataset.imagen = ""
                                adjuntarLicencia.dataset.id = ""
                                adjuntarPersonal.dataset.imagen = ""
                                adjuntarPersonal.dataset.id = ""
                                adjuntarIdentificacion.dataset.imagen = ""
                                adjuntarIdentificacion.dataset.id = ""
                            },
                            success: function(response){
            
                                if(response.data != null){
                                    tipoEmpleado.value = element.id_empleado
                                    curp.value = element.curp
                                    empresa.value = '0'
                                    clavePatronal.value = '0'

                                    Permisos.prototype.validar_tipoPersona_nacionalidad(response.data.id_nacionalidad)

                                    nacionalidad.value = response.data.id_nacionalidad
                                    
                                    idpersona.value = response.data.id
                                    idcontacto.value = response.data.id_contacto
            
                                    nombre.value = response.data.nombre
                                    primerApellido.value = response.data.primer_apellido
                                    segundoApellido.value = response.data.segundo_apellido
            
                                    numtelefono.value = response.data.telefono
                                    correo.value = response.data.correo
                                    numSeguroSocial.value = response.data.nss
            
                                    adjuntarLicencia.dataset.id = (response.data.id_imagen_licencia != null) ? response.data.id_imagen_licencia : ""
                                    adjuntarIdentificacion.dataset.id = (response.data.id_imagen_identificacion != null) ? response.data.id_imagen_identificacion : ""
                                    adjuntarPersonal.dataset.id = (response.data.id_imagen_persona != null) ? response.data.id_imagen_persona : ""
            
                                    if(response.data.numero_licencia != null && nacionalidad.value == 1){
                                    
                                        noLicenica.value = response.data.numero_licencia
                                        chofer.checked = true
                                        $(divLicencia).show()
                                        $(errornoLicencia).html("")
                                               
                                        if(fechaTermino.value > response.data.fecha_expiracion_licencia){
                                           $(errorfechaVenciminetoLic).html("Debe estar vigente durante el periodo") 
                                        }else{
                                            fechaVenciminetoLic.value = response.data.fecha_expiracion_licencia
                                            adjuntarLicencia.dataset.imagen = response.data.fotografia_licencia
                                            btnAdjuntarLicencia.value = 'Actualizar licencia'
                                            $(errorSubirLicencia).html("")
                                            $(errorfechaVenciminetoLic).html("")
                                        }
             
                                    }else{
                                        chofer.checked = false
                                        $(divLicencia).hide()
                                    }
                                    
                                    if(response.data.id_imagen_persona != null){
                                        adjuntarPersonal.dataset.imagen = response.data.fotografia_persona
                                        btnSubirPersonal.value = 'Actualizar foto'
                                        $(errorSubirPersonal).html("")
                                    }
            
                                    tipoIdentificacion.value = response.data.id_tipo_identificacion
            
                                    divFechaVencimiento.style.display = ""
                                    divSubirDocumento.style.display = ""
                                    divSubirfoto.style.display = ""
                                    
                                    switch (response.data.id_tipo_identificacion) {
                                        case 1:
                                            divClaveElector.style.display = ""
                                            divPasaporte.style.display = "none"
                                            divLibretaMar.style.display = "none"
                                            divItinerario.style.display ="none"
                                            claveElector.value = response.data.numero_identificacion
            
                                            if(fechaTermino.value > response.data.fecha_expiracion_identificacion){
                                                $(errorfechaVenciminetoIdent).html("Debe estar vigente durante el periodo")    
                                            }else{
                                                fechaVenciminetoIdent.value = response.data.fecha_expiracion_identificacion
                                                $(errorfechaVenciminetoIdent).html("")
                                               
                                                if(response.data.id_imagen_identificacion != null){
                                                    adjuntarIdentificacion.dataset.imagen = response.data.fotografia_identificacion
                                                    divSubirDocumento.style.display = ""
                                                    btnSubirIdentificacion.value = 'Actualizar identificación'
                                                    $(errorSubirIdentificacion).html("")
                                                }
                                            }
            
                                            $(errorine).html("")
            
                                            break;
                                        case 2:
                                            
                                            divClaveElector.style.display = "none"
                                            divPasaporte.style.display = ""
                                            divLibretaMar.style.display = "none"
                                            divItinerario.style.display ="none"
                                            noPasaporte.value = response.data.numero_identificacion
            
                                            if(fechaTermino.value > response.data.fecha_expiracion_identificacion){
                                                $(errorfechaVenciminetoIdent).html("Debe estar vigente durante el periodo")                                    
                                              //  fechaVenciminetoIdent.value = ""
                                            }else{
                                                fechaVenciminetoIdent.value = response.data.fecha_expiracion_identificacion
                                                $(errorfechaVenciminetoIdent).html("")
                
                                                if(response.data.id_imagen_identificacion != null){
                                                    adjuntarIdentificacion.dataset.imagen = response.data.fotografia_identificacion
                                                    divSubirDocumento.style.display = ""
                                                    btnSubirIdentificacion.value = 'Actualizar identificación'
                                                    $(errorSubirIdentificacion).html("")
                                                }
                                            }
                                            
                                            //$(errornoPasaporte).html("")
            
                                            break;
                                        case 3:
                                            divClaveElector.style.display = "none"
                                            divPasaporte.style.display = "none"
                                            divLibretaMar.style.display = ""
                                            divItinerario.style.display ="none"
                                            libretaMar.value = response.data.numero_identificacion
                                            break;
                                        case 4: 
                                            divClaveElector.style.display = "none"
                                            divPasaporte.style.display = "none"
                                            divLibretaMar.style.display = "none"
                                            divItinerario.style.display ="none"
                                            break;
                                        case 5:
                                            divClaveElector.style.display = "none"
                                            divPasaporte.style.display = "none"
                                            divLibretaMar.style.display = "none"
                                            divItinerario.style.display =""
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
                            complete: function (){
                                if(fotoIdentificacion && fotoIdentificacion && fotoPersona){
                                    Permisos.prototype.agregar_personas(fotoLicencia,fotoIdentificacion,fotoPersona)
                                }else{
                                    Permisos.prototype.agregar_personas()
                                }
                                divpersonal.style.display = 'none'
                            }
                        }).fail( function(response) {
                            if(response.responseText=="Sesion"){
                                error_sesion();
                            }
                        });
                    })
                }
            },
            complete: function () {

            },
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
                spinner.style.visibility = "visible";
            },
            success: function (response) {
                if (response.data != "") {
                    response.data.forEach(element => {
                        $.ajax({
                            url: base_url+'Permisos/Ctrl_Permisos/getEquipoBySerie',
                            type: 'GET',
                            dataType: 'json',
                            global: false,
                            data:{
                                noserie: element.numero_serie
                            },
                            beforeSend: function(){
                                idequipo.value = 0
                                adjuntarEquipo.dataset.imagen = ""
                                adjuntarEquipo.dataset.id = ""
                            },
                            success: function(response){
                                if(response.data != null){

                                    divCaracteristicas.style.display = ""
                                    divDocumento1.style.display = ""
                                    divResguardo.style.display = ""
                                    noSerieEquipo.value = element.numero_serie

                                  idequipo.value = response.data.id
                                  tipoEquipo.value = response.data.id_tipo_equipo
                                  modeloHerramienta.value = response.data.modelo
                                  marcaHerramienta.value = response.data.marca
                                  tipoDocumento.value = response.data.id_tipo_documento
                                  noFacturaEquipo.value = response.data.numero_factura
                                  adjuntarEquipo.dataset.id = (response.data.id_imagen_factura != null) ? response.data.id_imagen_factura : ""
                                  adjuntarEquipo.dataset.imagen = response.data.factura_equipo
                                  btnSubirEquipo.value = 'Actualizar documento'
                                  //resguardo.value = response.data.id_personal
                                  $("#resguardo option[data-id='" + response.data.id_personal +"']").attr("selected","selected");
            
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
                            complete: function (){
                                if(fotoFacturaEquipo){
                                    Permisos.prototype.agregar_equipo(fotoFacturaEquipo)
                                }else{
                                    Permisos.prototype.agregar_equipo()
                                }
                                divequipoherramienta.style.display = 'none'
                            }
                        }).fail(function(response){
                            if(response.responseText=="Sesion"){
                                error_sesion();
                            } 
                        });
                    })
                }
            },
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
                        $.ajax({
                            async: false,
                            url: base_url+'Permisos/Ctrl_Permisos/getVehiculosByPlacaPermiso',
                            type: 'GET',
                            dataType: 'json',
                            global: false,
                            data:{
                                placa  : element.numero_placa,
                                permiso  : id_permiso
                            },
            
                            beforeSend: function(){
                                idvehiculo.value = 0
                                adjuntarVehiculoFactura.dataset.imagen= ""
                                adjuntarVehiculoFactura.dataset.id= ""
                                ajuntarLateralVehiculo.dataset.imagen= ""
                                ajuntarLateralVehiculo.dataset.id= ""
                                adjuntarPlacaVehiculo.dataset.imagen= ""
                                adjuntarPlacaVehiculo.dataset.id= ""
                            },
                            success: function(response){
                                
                                if(response.data != null){
                                    
                                    noPlaca.value = response.data.numero_placa
                                    noSerieVehiculo.value = response.data.numero_serie
                                    marcaVehiculo.value = response.data.marca
                                    modeloVehicuo.value = response.data.modelo
                                    anio.value = response.data.anio
                                    color.value = response.data.color
            
                                    noPlaca.setAttribute("class","lectura")
                                    noPlaca.setAttribute("disabled",true)
                                    noSerieVehiculo.setAttribute("class","lectura")
                                    noSerieVehiculo.setAttribute("disabled",true)
            
                                    $(errornoPlaca).html("")
                                    $(errornoSerieVehiculo).html("")
            
                                    idvehiculo.value = response.data.id
                                    noMotor.value = response.data.numero_motor
                                    tipoVehiculo.value = response.data.id_tipo_vehiculo
                                    tipoTarjetaCirculacion.value = response.data.id_tipo_tarjeta_circulacion
                                    noTarjeta.value = response.data.numero_tarjeta_circulacion
                                    vigenciaTarjeta.value = response.data.vigencia_tarjeta_circulacion
                                    tipodocumentoVeh.value = response.data.id_tipo_documento
                                    noFacturaVeh.value = response.data.numero_factura
                                    aseguradorasVeh.value = response.data.id_tipo_aseguradora
                                    noPoliza.value = response.data.numero_poliza
                                    vigenciaPoliza.value = response.data.vigencia_poliza
                                    periodoPago.value = response.data.id_tipo_periodo
                                    periodoCobFechaInicio.value = response.data.fecha_inicio_cobertura
                                    periodoCobFechaFin.value = response.data.fecha_fin_cobertura
                                    estatusVehiculo.value = response.data.estatusvehiculo
                                    //selChofer.value = response.data.id_chofer
                                    $("#selChofer option[data-id='" + response.data.id_chofer +"']").attr("selected","selected");

                                    $(errortipoVehiculo).html("")
                                    $(errortipoTarjetaCirculacion).html("")
                                    $(errornoTarjeta).html("")
                                    $(errortipodocumentoVeh).html("")
                                    $(erroraseguradorasVeh).html("")
                                    $(errornoPoliza).html("")
                                    $(errorperiodoPago).html("")
                                    $(errorperiodoCobFechaInicio).html("")
                                    $(errorperiodoCobFechaFin).html("")
                                    $(errorestatusVehiculo).html("")
        
                                    adjuntarVehiculoFactura.dataset.id = (response.data.id_fotografia_factura != null) ? response.data.id_fotografia_factura : ""
                                    adjuntarVehiculoFactura.dataset.imagen = response.data.fotografia_factura
                                    btnSubirFacturaVehiculo.value = "Actualizar documento"
                                    $(errorSubirFacturaVehiculo).html("")
        
                                    ajuntarLateralVehiculo.dataset.id = (response.data.id_fotografia_lateral != null) ? response.data.id_fotografia_lateral : ""
                                    ajuntarLateralVehiculo.dataset.imagen = response.data.fotografia_lateral
                                    adjuntarPlacaVehiculo.dataset.id = (response.data.id_fotografia_placa != null) ? response.data.id_fotografia_placa : ""
                                    adjuntarPlacaVehiculo.dataset.imagen = response.data.fotografia_placa
                                    btnSubirVehiculo.value = "Actualizar foto"
                                    $(errorSubirFotoVehiculo).html("")
        
                                    /*if(fechaTermino.value > response.data.vigencia_tarjeta_circulacion){
                                        $(errorvigenciaTarjeta).html("Debe estar vigente durante el periodo")    
                                    }else{
                                        vigenciaTarjeta.value = response.data.vigencia_tarjeta_circulacion
                                        $(errorvigenciaTarjeta).html("")    
                                    }
                                    if(fechaTermino.value > response.data.vigencia_poliza){
                                        $(errorvigenciaPoliza).html("Debe estar vigente durante el periodo")
                                    }else{
                                        vigenciaPoliza.value = response.data.vigencia_poliza
                                        $(errorvigenciaPoliza).html("")
                                    }*/
                                }
                              },
                              complete: function (){
                                  if(fotoFacturaVehiculo && fotoLateralVehiculo && fotoPlacaVehiculo){
                                      Permisos.prototype.agregar_vehiculo(fotoFacturaVehiculo,fotoLateralVehiculo,fotoPlacaVehiculo)
                                  }else{
                                      Permisos.prototype.agregar_vehiculo()
                                  }
                                divvehiculo.style.display = 'none'
                            }
                        }).fail(function(response){
                            if(response.responseText=="Sesion"){
                                error_sesion();
                            }
                        })
                    })
                }
            }
        }).fail(function (response) {

        });
    }
    agregar_personas(fotoLicencia,fotoIdentificacion,fotoPersona){

        let validacion = true

        $(errorPersonalDuplicado).html("")
        $(errornacionalidad).html("")
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
        $(errorine).html("")
        $(errornoPasaporte).html("")
        $(errorlibretaMar).html("")
        $(errorfechaVenciminetoIdent).html("")
        $(errorSubirIdentificacion).html("")
        $(errorSubirPersonal).html("")

        if(nacionalidad.value == ""){
            $(errornacionalidad).html("Campo obligatorio")
            validacion = false
        }

        if(nacionalidad.value == 1 && curp.value == ""){
            $(errorcurp).html("Campo obligatorio")
            validacion = false
        }

        if(tipoEmpleado.value != 5 && nacionalidad.value == 1 && numSeguroSocial.value == ""){
            $(errornumSeguroSocial).html("Campo obligatorio")
            validacion = false
        }

        if(tipoEmpleado.value == 5 && nacionalidad.value == 1 && noIssste.value == ""){
            $(errornoIssste).html("Campo obligatorio")
            validacion = false
        }

        if(tipoEmpleado.value != 1 && nacionalidad.value == 2 && noSeguro.value == 2){
            $(errornoSeguro).html("Campo obligatorio")
            validacion = false
        }

        if(tipoEmpleado.value == 5 && nacionalidad.value == 1 && entidadGobierno.value == ""){
            $(errorentidadGobierno).html("Campo obligatorio")
            validacion = false
        }

        if(tipoEmpleado.value != 1 && empresa.value == ""){
            $(errorempresa).html("Campo obligatorio")
            validacion = false
        }

        if(tipoEmpleado.value != 1 && nacionalidad.value == 1 && clavePatronal.value == ""){
            $(errorclavePatronal).html("Campo obligatorio")
            validacion = false
        }

        if(nombre.value == ""){
            $(errornombre).html("Campo obligatorio")
            validacion = false
        }

        if(primerApellido.value == ""){
            $(errorprimerApellido).html("Campo obligatorio")
            validacion = false
        }

        if(numtelefono.value == ""){
            $(errornumtelefono).html("Campo obligatorio")
            validacion = false
        }

        if(correo.value == ""){
            $(errorcorreo).html("Campo obligatorio")
            validacion = false
        }

        if(chofer.checked == true){
            
            if(noLicenica.value == ""){
                $(errornoLicencia).html("Campo obligatorio")
                validacion = false
            }

            if(fechaVenciminetoLic.value == ""){
                $(errorfechaVenciminetoLic).html("Campo obligatorio")
                validacion = false
            }

            if(adjuntarLicencia.value == "" && adjuntarLicencia.dataset.imagen == "" && fotoLicencia == null){
                $(errorSubirLicencia).html("Campo obligatorio")
                validacion = false
            }
        }
        
        if(fechaTermino.value > fechaVenciminetoIdent.value){
            validacion = false
        }

        if(tipoIdentificacion.value == ""){
            $(errortipoIdentificacion).html("Campo obligatorio")
            validacion = false
        }else if(tipoIdentificacion.value == 1 && claveElector.value == ""){
            $(errorine).html("Campo obligatorio")
            validacion = false
        }else if(tipoIdentificacion.value == 2 && noPasaporte.value == ""){
            $(errornoPasaporte).html("Campo obligatorio")
            validacion = false
        }else if(tipoIdentificacion.value == 3 && libretaMar.value == ""){
            $(errorlibretaMar).html("Campo obligatorio")
            validacion = false
        }
        if(tipoIdentificacion.value != "" && fechaVenciminetoIdent.value == ""){
            $(errorfechaVenciminetoIdent).html("Campo obligatorio")
            validacion = false
        }

        if(tipoIdentificacion.value != "" && adjuntarIdentificacion.value == "" && adjuntarIdentificacion.dataset.imagen == "" && fotoIdentificacion == null){
            $(errorSubirIdentificacion).html("Campo obligatorio")
            validacion = false
        }

        if(tipoIdentificacion.value != "" && adjuntarPersonal.value == "" && adjuntarPersonal.dataset.imagen == "" && fotoPersona == null){
            $(errorSubirPersonal).html("Campo obligatorio")
            validacion = false
        }

        if(!validacion /*|| errorEstructuraCURP || errorEstructuraCorreo*/){
            return false
        }
        let datos = {

            idpersona                   : idpersona.value,
            tipoEmpleado                : tipoEmpleado.value,
            nacionalidad                : nacionalidad.value,
            entidadGobierno             : entidadGobierno.value,
            empresa                     : empresa.value,
            clavePatronal               : clavePatronal.value,
            numSeguroSocial             : numSeguroSocial.value,
            noIssste                    : noIssste.value,
            noSeguro                    : noSeguro.value,
            aseguradora                 : aseguradoras.value,
            curp                        : curp.value,
            nombre                      : nombre.value,
            primerApellido              : primerApellido.value,
            segundoApellido             : segundoApellido.value,
            numtelefono                 : numtelefono.value,
            correo                      : correo.value,
            chofer                      : (chofer.checked ? 1 : 0),
            noLicenica                  : noLicenica.value,
            fechaVenciminetoIdent       : fechaVenciminetoIdent.value,
            tipoIdentificacion          : tipoIdentificacion.value,
            claveElector                : claveElector.value,
            noPasaporte                 : noPasaporte.value,
            libretaMar                  : libretaMar.value,
            itinerario                  : itinerario.value,
            fechaVenciminetoLic         : fechaVenciminetoLic.value,
            
            idimagenlicencia            : (adjuntarLicencia.dataset.id != "") ? adjuntarLicencia.dataset.id : 0,
            fotografiaLicencia          : (fotoLicencia) ? fotoLicencia : $("#adjuntarLicencia")[0].files[0],

            idimagenidentificacion      : (adjuntarIdentificacion.dataset.id != "") ? adjuntarIdentificacion.dataset.id : 0,
            fotografiaIdentificacion    : (fotoIdentificacion) ? fotoIdentificacion : $("#adjuntarIdentificacion")[0].files[0],
            
            idimagenpersona             : (adjuntarPersonal.dataset.id != "") ? adjuntarPersonal.dataset.id : 0,
            fotografiapersona           : (fotoPersona) ? fotoPersona : $("#adjuntarPersonal")[0].files[0]

        }
            
        /*datosPersonal.forEach(element => {
            if(element["curp"] == datos["curp"] && validacion == true){
                validacion = false;
            }
        })

        if(!validacion){
            $(errorPersonalDuplicado).html("El registro ya existe el la lista")
            return validacion;
        }else(
            $(errorPersonalDuplicado).html("")
        )*/
        datosPersonal.push(datos)
        Permisos.prototype.cargar_personal()
        DTPersonal.row.add([
            '<center>'+tipoEmpleado.options[tipoEmpleado.selectedIndex].text+'</center>',
            '<center>'+datos.nombre+' '+datos.primerApellido+' '+datos.segundoApellido+'</center>',
            '<center>'+nacionalidad.options[nacionalidad.selectedIndex].text+'</center>',
        ]).draw(false)
        //Reincio de modales de carga de documentos
        adjuntarPersonal.value = ''
        adjuntarIdentificacion.value = ''
        //Reinicio de campos mostrados a inicio
        chofer.checked = false
        divNacionalidad.style.display = "none"
        divEntidad.style.display = "none"
        divEmpresa.style.display = "none"
        divClavePatronal.style.display = "none"
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
        //Reinicio de valores de campos
        idpersona.value = 0
        $(".reiniciar-personal").val("")
        
        document.getElementById('btnAdjuntarLicencia').value = 'Subir documento'
        document.getElementById('btnSubirIdentificacion').value = 'Subir identificación'
        document.getElementById('btnSubirPersonal').value = 'Subir foto'
        /*errorEstructuraCURP = false
        errorEstructuraCorreo = false*/
    }
    agregar_equipo(fotoFacturaEquipo){
       
      let validacion = true;

      $(errorSubirFacturaEquipo).html("")

        if(tipoEquipo.value == ""){
            $(errortipoEquipo).html("Campo obligatorio")
            validacion = false
        }
        if(noSerieEquipo.value == ""){
            $(errornoSerieEquipo).html("Campo obligatorio")
            validacion = false
        }
        if(modeloHerramienta.value == ""){
            $(errormodeloHerramienta).html("Campo obligatorio")
            validacion = false
        }
        if(marcaHerramienta.value == ""){
            $(errormarcaHerramienta).html("Campo obligatorio")
            validacion = false
        }
        if(tipoDocumento.value == ""){
            $(errortipoDocumento).html("Campo obligatorio")
            validacion = false
        }
        if(noFacturaEquipo.value == ""){
            $(errornoFacturaEquipo).html("Campo obligatorio")
            validacion = false
        }
        if(resguardo.value == ""){
            $(errorresguardo).html("Campo obligatorio")
            validacion = false
        }
        if(adjuntarEquipo.value == "" && adjuntarEquipo.dataset.imagen == "" && fotoFacturaEquipo == null){
            $(errorSubirFacturaEquipo).html("Campo obligatorio")
            validacion = false
        }

        if(validacion){

        let datos = {
            idequipo            : idequipo.value,
            tipoEquipo          : tipoEquipo.value,
            modelo              : modeloHerramienta.value,
            marca               : marcaHerramienta.value,
            noSerie             : noSerieEquipo.value,
            tipoDocumento       : tipoDocumento.value,
            noFactura           : noFacturaEquipo.value,
            resguardo           : resguardo.value,
            idimagenfactura     : (adjuntarEquipo.dataset.id != "") ? adjuntarEquipo.dataset.id : 0,
            fotografiaFactura   : (fotoFacturaEquipo) ? fotoFacturaEquipo :  $("#adjuntarEquipo")[0].files[0] 
            //fotografia          : $("#adjuntarEquipo")[0].files[0]
        }

        datosEquipos.forEach(element => {
            if(element["noSerie"] == datos["noSerie"] && validacion == true){
                validacion = false;
            }
        })

        if(!validacion){
            $(errorHerramientaDuplicado).html("El registro ya existe el la lista")
            return validacion;
        }else(
            $(errorHerramientaDuplicado).html("")
        )

        datosEquipos.push(datos)
        DTEquipoHerramienta.row.add([
            '<center>'+tipoEquipo.options[tipoEquipo.selectedIndex].text+'</center>',
            '<center>'+datos.modelo+'</center>',
            '<center>'+datos.marca+'</center>',
            '<center>'+datos.noSerie+'</center>',
        ]).draw(false)
        //Reincio de modales de carga de documentos
        adjuntarEquipo.value = ''
        //Reinicio de campos mostrados a inicio
        divCaracteristicas.style.display = "none"
        divDocumento1.style.display = "none"
        divResguardo.style.display = "none"
        idequipo.value = 0
        //Reinicio de valores de campos
        $(".reiniciar-equipo").val("")
        document.getElementById('btnSubirEquipo').value = 'Subir documento'
        }
    }
    agregar_vehiculo(fotoFacturaVehiculo,fotoLateralVehiculo,fotoPlacaVehiculo){
        
        let validacion = true
        $(errorSubirFacturaVehiculo).html("")
        $(errorSubirFotoVehiculo).html("")

        if(noPlaca.value == ""){
            $(errornoPlaca).html("campo obligatorio")
            validacion = false
        }
        if(noSerieVehiculo.value == ""){
            $(errornoSerieVehiculo).html("Campo obligatorio")
            validacion = false
        }
        if(tipoVehiculo.value == ""){
            $(errortipoVehiculo).html("Campo obligatorio")
            validacion = false
        }
        if(tipoTarjetaCirculacion.value == ""){
            $(errortipoTarjetaCirculacion).html("Campo obligatorio")
            validacion = false
        }
        if(noTarjeta.value == ""){
            $(errornoTarjeta).html("Campo obligatorio")
            validacion = false
        }
        if(vigenciaTarjeta.value == ""){
            $(errorvigenciaTarjeta).html("Campo obligatorio")
            validacion = false
        }
        if(tipodocumentoVeh.value == ""){
            $(errortipodocumentoVeh).html("Campo obligatorio")
            validacion = false
        }
        /*if(noFacturaVeh.value == ""){
            $(errornoFacturaVeh).html("Campo obligatorio")
            validacion = false
        }*/
        if(aseguradorasVeh.value == ""){
            $(erroraseguradorasVeh).html("Campo obligatorio")
            validacion = false
        }
        if(noPoliza.value == ""){
            $(errornoPoliza).html("Campo obligatorio")
            validacion = false
        }
        if(vigenciaPoliza.value == ""){
            $(errorvigenciaPoliza).html("Campo obligatorio")
            validacion = false
        }
        if(periodoPago.value == ""){
            $(errorperiodoPago).html("Campo obligatorio")
            validacion = false
        }
        if(periodoCobFechaInicio.value == ""){
            $(errorperiodoCobFechaInicio).html("Campo obligatorio")
            validacion = false
        }
        if(periodoCobFechaFin.value == ""){
            $(errorperiodoCobFechaFin).html("Campo obligatorio")
            validacion = false
        }
        if(estatusVehiculo.value == ""){
            $(errorestatusVehiculo).html("Campo obligatorio")
            validacion = false
        }
        if(selChofer.value == ""){
            $(errorselChofer).html("Campo obligatorio")
            validacion = false
        }
        if(adjuntarVehiculoFactura.value == "" && adjuntarVehiculoFactura.dataset.imagen == "" && fotoFacturaVehiculo == null){
            $(errorSubirFacturaVehiculo).html("Campo obligatorio")
            validacion = false
        }
        if(ajuntarLateralVehiculo.value == "" && ajuntarLateralVehiculo.dataset.imagen == "" && fotoLateralVehiculo == null){
            $(errorSubirFotoVehiculo).html("Campo obligatorio")
            validacion = false
        }
        if(adjuntarPlacaVehiculo.value == "" && adjuntarPlacaVehiculo.dataset.imagen == "" && fotoPlacaVehiculo == null){
            $(errorSubirFotoVehiculo).html("Campo obligatorio")
            validacion = false
        }

        if(noSerieVehiculo.value.length != 17 && noSerieVehiculo.value != ""){
            $(errornoSerieVehiculo).html("Deben ser 17 caracteres")
            validacion = false
        }  
        if(noMotor.value != ""){
            if(noMotor.value.length < 6 || noMotor.value.length > 9 ){
                $(errornoMotor).html("Deben ser entre 6 y 9 caracteres")
                validacion = false
            }
        }
        /*if(noMotor.value == ""){
            $(errornoMotor).html("Campo obligatorio")
            validacion = false
        }*/

        if(validacion){
        let datos = {
            idvehiculo              : idvehiculo.value,
            noPlaca                 : noPlaca.value,
            noSerie                 : noSerieVehiculo.value,
            noMotor                 : noMotor.value,
            marca                   : marcaVehiculo.value,
            modelo                  : modeloVehicuo.value,
            anio                    : anio.value,
            color                   : color.value,
            tipoVehiculo            : tipoVehiculo.value,
            tipoTarCircu            : tipoTarjetaCirculacion.value,
            noTarjeta               : noTarjeta.value,
            vigenciaTarjete         : vigenciaTarjeta.value,
            tipoDocumento           : tipodocumentoVeh.value,
            noFactura               : noFacturaVeh.value,
            idimagenfactura         : (adjuntarVehiculoFactura.dataset.id != "") ? adjuntarVehiculoFactura.dataset.id : 0,
            documentoFactura        : (fotoFacturaVehiculo) ? fotoFacturaVehiculo : $("#adjuntarVehiculoFactura")[0].files[0],
            //documentoFactura        : $("#adjuntarVehiculoFactura")[0].files[0],
            aseguradora             : aseguradorasVeh.value,
            noPoliza                : noPoliza.value,
            vigenciaPoliza          : vigenciaPoliza.value,
            periodoPago             : periodoPago.value,
            periodoFechaInicio      : periodoCobFechaInicio.value,
            periodoFechaFin         : periodoCobFechaFin.value,
            estatusVehiculo         : estatusVehiculo.value,
            chofer                  : selChofer.value,
            idfotografiaLateral     : (ajuntarLateralVehiculo.dataset.id != "") ? ajuntarLateralVehiculo.dataset.id : 0,
            fotografiaLateral       : (fotoLateralVehiculo) ? fotoLateralVehiculo : $("#ajuntarLateralVehiculo")[0].files[0],
            //fotografiaLateral       : $("#ajuntarLateralVehiculo")[0].files[0],
            idfotografiaPlaca       : (adjuntarPlacaVehiculo.dataset.id != "") ? adjuntarPlacaVehiculo.dataset.id : 0, 
            //fotografiaPlaca         : $("#adjuntarPlacaVehiculo")[0].files[0],
            fotografiaPlaca         : (fotoPlacaVehiculo) ? fotoPlacaVehiculo : $("#adjuntarPlacaVehiculo")[0].files[0]
        }

        /*datosVehiculos.forEach(element => {
            if(element["noPlaca"] == datos["noPlaca"] && validacion == true){
                validacion = false;
            }
        })

        if(!validacion){
            $(errorVehiculoDuplicado).html("El registro ya existe el la lista")
            return validacion;
        }else(
            $(errorVehiculoDuplicado).html("")
        )*/
        
        datosVehiculos.push(datos)
        DTVehiculos.row.add([
            '<center>'+datos.noPlaca+'</center>',
            '<center>'+datos.noSerie+'</center>',
            '<center>'+datos.marca+'</center>',
            '<center>'+datos.anio+'</center>',
            '<center>'+tipoVehiculo.options[tipoVehiculo.selectedIndex].text+'</center>',
            '<center>'+(datos.chofer == 1 ? 'SI' : 'NO')+'</center>',
        ]).draw(false)
        //Reincio de modales de carga de documentos
        adjuntarVehiculoFactura.value = ''
        ajuntarLateralVehiculo.value = ''
        adjuntarPlacaVehiculo.value = ''
        fotografiaLateral.style.display = ""
        fotografiaPlaca.style.display = "none"
        btnSiguienteAdjuntarVehiculo.style.display = "none"
        btnAceptarAdjuntarVechiculo.style.display = "none"
        //Reinicio de campos mostrados a inicio
        noPlaca.setAttribute("class","form-control reiniciar-vehiculo")
        noPlaca.removeAttribute("disabled")
        noSerieVehiculo.setAttribute("class","form-control reiniciar-vehiculo")
        noSerieVehiculo.removeAttribute("disabled")
        //Reinicio de valores de campos
        idvehiculo.value = 0
        $(".reiniciar-vehiculo").val("")
        document.getElementById('btnSubirFacturaVehiculo').value = 'Subir documento'
        document.getElementById('btnSubirVehiculo').value = 'Subir archivo'
        }
    }
    confirmar_almacenamiento(){
        pedir_confirmacion_guardar();
    }
    realizar_actualizacion_datos_pase(ev){
        let formData = new FormData();
        formData.append("idempresa",id_empresa)
        formData.append("idpersona",id_persona_fisica)
        formData.append("idcontrato",id_contrato)
        formData.append("idtipopermiso",id_tipo_permiso)
        formData.append("visita",clientetEntidad.value)
        formData.append("idtipoactividad",id_actividad)
        formData.append("idtipovigencia",vigencia.value)
        formData.append("dias",(dias.value == "" ? 0 : dias.value))
        formData.append("fechainicio",FechaInicio.value)
        formData.append("fechatermino",fechaTermino.value)
        formData.append("idrecinto",id_recinto)
        formData.append("idfiscalizado",(id_fiscalizacion == '' ? null : id_fiscalizacion))
        formData.append("motivo",motivo.value)
        formData.append("permisogrupal",(permisoGrupal.checked ? 1 : 0))
        formData.append("estatus",((datosEquipos.length > 0) ? 5 : 1))
        formData.append("curpresponsable",curpResponsable.value)
        formData.append([csrf.name], csrf.value)

        $.ajax({
            url : base_url+'Permisos/Ctrl_Permisos/addPermiso',
            type : 'POST',
            data : formData,
            global: false,
            processData: false,
            contentType: false,
            beforeSend: function(){
                $("#modal_confirmar_guardar").modal("hide");
                spinner.style.visibility="visible";
            },
            success : function(response) {
                csrf.value = response.token;
                if(response.status){
                    extenderPermiso.disabled = false;
                    new_id_permiso = response.data.id
                    Permisos.prototype.realizar_almacenamiento_personal()
                }else{
                    confirmar_guardar.disabled = false;
                    extenderPermiso.disabled = false;
                    peticion_fallida(response.message);
                    spinner.style.visibility="hidden";
                }
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                spinner.style.visibility="hidden";
                confirmar_guardar.disabled = false;
                extenderPermiso.disabled = false;
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        }).fail(function(response){
            spinner.style.visibility="hidden";
            confirmar_guardar.disabled = false;
            extenderPermiso.disabled = false;
            if(response.responseText=="Sesion"){
                error_sesion();
            }
        })
    }
    realizar_almacenamiento_personal(){
        let formData = new FormData();
        for (let index = 0; index < datosPersonal.length; index++) {
            formData.append("idpermiso["+index+"]",new_id_permiso)
            formData.append("idpersonafisica["+index+"]",id_persona_fisica)
            formData.append("idempresa["+index+"]",(empresa.value != "" ? idempresa.value: id_empresa))
            formData.append("idpersonal["+index+"]",datosPersonal[index].idpersona)
            formData.append("idcontacto["+index+"]",0)
            formData.append("tipoEmpleado["+index+"]",datosPersonal[index].tipoEmpleado)
            formData.append("nacionalidad["+index+"]",datosPersonal[index].nacionalidad)
            formData.append("entidadGobierno["+index+"]",(datosPersonal[index].entidadGobierno == "" ? null : datosPersonal[index].entidadGobierno))
            formData.append("empresa["+index+"]",datosPersonal[index].empresa)
            formData.append("clavePatronal["+index+"]",datosPersonal[index].clavePatronal) 
            formData.append("numSeguroSocial["+index+"]",datosPersonal[index].numSeguroSocial)  
            formData.append("noIssste["+index+"]",datosPersonal[index].noIssste)   
            formData.append("noSeguro["+index+"]",datosPersonal[index].noSeguro) 
            formData.append("aseguradora["+index+"]",(datosPersonal[index].aseguradora =="" ? null : datosPersonal[index].aseguradora))  
            formData.append("curp["+index+"]",datosPersonal[index].curp)   
            formData.append("nombre["+index+"]",datosPersonal[index].nombre) 
            formData.append("primerApellido["+index+"]",datosPersonal[index].primerApellido) 
            formData.append("segundoApellido["+index+"]",datosPersonal[index].segundoApellido) 
            formData.append("numtelefono["+index+"]",datosPersonal[index].numtelefono) 
            formData.append("correo["+index+"]",datosPersonal[index].correo) 
            formData.append("chofer["+index+"]",datosPersonal[index].chofer) 
            formData.append("noLicenica["+index+"]",datosPersonal[index].noLicenica) 
            formData.append("fechaVenciminetoLic["+index+"]",datosPersonal[index].fechaVenciminetoLic) 
            formData.append("fechaVenciminetoIdent["+index+"]",datosPersonal[index].fechaVenciminetoIdent) 
            formData.append("tipoIdentificacion["+index+"]",datosPersonal[index].tipoIdentificacion)
            formData.append("claveElector["+index+"]",datosPersonal[index].claveElector)
            formData.append("noPasaporte["+index+"]",datosPersonal[index].noPasaporte)
            formData.append("libretaMar["+index+"]",datosPersonal[index].libretaMar)
            formData.append("itinerario["+index+"]",datosPersonal[index].itinerario)
            formData.append("idimagenlicencia["+index+"]",datosPersonal[index].idimagenlicencia);
            formData.append("fotografiaLicencia-"+index,datosPersonal[index].fotografiaLicencia);
            formData.append("idimagenidentificacion["+index+"]",datosPersonal[index].idimagenidentificacion);
            formData.append("fotografiaIdentificacion-"+index,datosPersonal[index].fotografiaIdentificacion);
            formData.append("idimagenpersona["+index+"]",datosPersonal[index].idimagenpersona);
            formData.append("fotografiapersona"+index,datosPersonal[index].fotografiapersona);
            formData.append([csrf.name], csrf.value);
        }

        $.ajax({
            url : base_url+'Permisos/Ctrl_Permisos/addPersonal',
            type : 'POST',
            data : formData,
            global: false,
            processData: false,
            contentType: false,
            success : function(response) {
                csrf.value = response.token;
                if(response.status){
                    personalAlmacenado = response.data
                    if(datosEquipos.length > 0){
                        Permisos.prototype.realizar_almacenamiento_equipos()
                    }else if(datosVehiculos.length >0){
                        Permisos.prototype.realizar_almacenamiento_vehiculos()
                    }else{
                        extenderPermiso.disabled = false;
                        registro_exitoso(response.message);
                        spinner.style.visibility="hidden";
                    }
                }else{
                    confirmar_guardar.disabled = false;
                    extenderPermiso.disabled = false;
                    peticion_fallida(response.message);
                    spinner.style.visibility="hidden";
                }
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                spinner.style.visibility="hidden";
                confirmar_guardar.disabled = false;
                extenderPermiso.disabled = false;
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        }).fail(function(response){
            spinner.style.visibility="hidden";
            if(response.responseText=="Sesion"){
                error_sesion();
            }
        })
    }
    realizar_almacenamiento_equipos(){
        let formData = new FormData();
        for (let index = 0; index < datosEquipos.length; index++) {
            console.log(personalAlmacenado);
            console.log(datosEquipos[index].resguardo);
            formData.append("idpermiso["+index+"]",new_id_permiso)
            formData.append("idempresa["+index+"]",id_empresa)
            formData.append("idpersonafisica["+index+"]",id_persona_fisica)
            formData.append("idequipo["+index+"]",datosEquipos[index].idequipo)
            formData.append("tipoEquipo["+index+"]",datosEquipos[index].tipoEquipo)
            formData.append("modelo["+index+"]",datosEquipos[index].modelo)
            formData.append("marca["+index+"]",datosEquipos[index].marca)
            formData.append("noSerie["+index+"]",datosEquipos[index].noSerie)
            formData.append("tipoDocumento["+index+"]",datosEquipos[index].tipoDocumento)
            formData.append("noFactura["+index+"]",datosEquipos[index].noFactura)
            formData.append("resguardo["+index+"]",personalAlmacenado[datosEquipos[index].resguardo])
            formData.append("idimagenfactura["+index+"]",datosEquipos[index].idimagenfactura)
            formData.append("fotografiaFactura-"+index,datosEquipos[index].fotografiaFactura);
            //formData.append("fotografia-"+index,datosEquipos[index].fotografia);
            formData.append([csrf.name], csrf.value);
        }
        $.ajax({
            url : base_url+'Permisos/Ctrl_Permisos/addEquipos',
            type : 'POST',
            data : formData,
            global: false,
            processData: false,
            contentType: false,
            success : function(response) {
                csrf.value = response.token;
                if(response.status){
                    if(datosVehiculos.length >0){
                        Permisos.prototype.realizar_almacenamiento_vehiculos()
                    }else{
                        extenderPermiso.disabled = false;
                        registro_exitoso(response.message);
                        spinner.style.visibility="hidden";
                    }
                }else{
                    confirmar_guardar.disabled = false;
                    extenderPermiso.disabled = false;
                    peticion_fallida(response.message);
                    spinner.style.visibility="hidden";
                }
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                confirmar_guardar.disabled = false;
                extenderPermiso.disabled = false;
                spinner.style.visibility="hidden";
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        }).fail(function(response){
            spinner.style.visibility="hidden";
            if(response.responseText=="Sesion"){
                error_sesion();
            }
        })
    }
    realizar_almacenamiento_vehiculos(){
        let formData = new FormData();
        for (let index = 0; index < datosVehiculos.length; index++) {
            //formData.append("idvehiculo["+index+"]",id_vehiciulo)
            formData.append("idvehiculo["+index+"]",idvehiculo)
            formData.append("idpermiso["+index+"]",new_id_permiso)
            formData.append("idempresa["+index+"]",id_empresa)
            formData.append("idpersonafisica["+index+"]",id_persona_fisica)
            formData.append("idvehiculo["+index+"]",0)
            formData.append("noPlaca["+index+"]",datosVehiculos[index].noPlaca)
            formData.append("noSerie["+index+"]",datosVehiculos[index].noSerie)
            formData.append("noMotor["+index+"]",datosVehiculos[index].noMotor)
            formData.append("marca["+index+"]",datosVehiculos[index].marca)
            formData.append("modelo["+index+"]",datosVehiculos[index].modelo)
            formData.append("anio["+index+"]",datosVehiculos[index].anio)
            formData.append("color["+index+"]",datosVehiculos[index].color)
            formData.append("tipoVehiculo["+index+"]",datosVehiculos[index].tipoVehiculo)
            formData.append("tipoTarCircu["+index+"]",datosVehiculos[index].tipoTarCircu)
            formData.append("noTarjeta["+index+"]",datosVehiculos[index].noTarjeta)
            formData.append("vigenciaTarjete["+index+"]",datosVehiculos[index].vigenciaTarjete)
            formData.append("tipoDocumento["+index+"]",datosVehiculos[index].tipoDocumento)
            formData.append("noFactura["+index+"]",datosVehiculos[index].noFactura)
            formData.append("aseguradora["+index+"]",datosVehiculos[index].aseguradora)
            formData.append("noPoliza["+index+"]",datosVehiculos[index].noPoliza)
            formData.append("vigenciaPoliza["+index+"]",datosVehiculos[index].vigenciaPoliza)
            formData.append("periodoPago["+index+"]",datosVehiculos[index].periodoPago)
            formData.append("periodoFechaInicio["+index+"]",datosVehiculos[index].periodoFechaInicio)
            formData.append("periodoFechaFin["+index+"]",datosVehiculos[index].periodoFechaFin)
            formData.append("estatusVehiculo["+index+"]",datosVehiculos[index].estatusVehiculo)
            formData.append("chofer["+index+"]",personalAlmacenado[datosVehiculos[index].chofer])
            formData.append("idimagenfactura["+index+"]",datosPersonal[index].idimagenfactura);
            formData.append("fotografiaFactura-"+index,datosVehiculos[index].documentoFactura);
            formData.append("idfotografiaLateral["+index+"]",datosPersonal[index].idfotografiaLateral);
            formData.append("fotografiaLateral-"+index,datosVehiculos[index].fotografiaLateral);
            formData.append("idfotografiaPlaca["+index+"]",datosPersonal[index].idfotografiaPlaca);
            formData.append("fotografiaPlaca-"+index,datosVehiculos[index].fotografiaPlaca);
            formData.append([csrf.name], csrf.value);
        }

        $.ajax({
            url : base_url+'Permisos/Ctrl_Permisos/addVehiculos',
            type : 'POST',
            data : formData,
            global: false,
            processData: false,
            contentType: false,
            success : function(response) {
                csrf.value = response.token;
                if(response.status){
                    extenderPermiso.disabled = false;
                    registro_exitoso(response.message);
                    spinner.style.visibility="hidden";
                }else{
                    confirmar_guardar.disabled = false;
                    extenderPermiso.disabled = false;
                    peticion_fallida(response.message);
                    spinner.style.visibility="hidden";
                }
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                spinner.style.visibility="hidden";
                confirmar_guardar.disabled = false;
                extenderPermiso.disabled = false;
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        }).fail(function(response){
            spinner.style.visibility="hidden";
            if(response.responseText=="Sesion"){
                error_sesion();
            }
        })
    }
}
const  permiso = new Permisos();

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