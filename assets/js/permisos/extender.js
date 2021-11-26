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
        this.obtener_vigencias()
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

        //btnRegresar.setAttribute("href", base_url+url_regreso);

        btnGuardar.addEventListener('click', (ev => {
            this.confirmar_almacenamiento(ev)
        }))

        confirmar_guardar.addEventListener('click', (ev) => {
            this.realizar_almacenamiento_pases(ev)
        })

        //Validaciones

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

        vigencia.addEventListener('change', (ev) => {
            if (ev.target.value == 2) {
                divDias.style.display = ""
                dias.setAttribute("class", "form-control validar-requerido reiniciar-pase")
                fechaTermino.setAttribute("class", "lectura validar-requerido reiniciar-pase")
                fechaTermino.setAttribute("disabled", true)
                //fechaTermino.removeAttribute("disabled")
                dias.value = ''
            } else {
                divDias.style.display = "none"
                dias.setAttribute("class", "form-control reiniciar-pase")
                fechaTermino.setAttribute("class", "lectura validar-requerido reiniciar-pase")
                fechaTermino.setAttribute("disabled", true)
                fechaTermino.value = fechaInicio.value
                dias.value = ''
            }
        })

        dias.addEventListener("change", () => {
            if (vigencia.value == 2 && fechaInicio.value != "" && (dias.value*1) > 0) {
                let termino_tmp = new Date(fechaInicio.value + " 00:00:00")
                termino_tmp.setDate(termino_tmp.getDate() + (parseInt(dias.value) > 0 ? parseInt(dias.value) - 1 : 0));
                fechaTermino.value = new Date(termino_tmp.getTime() - (termino_tmp.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
                $(errorfechaTermino).html("")
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
                    termino_tmp.setDate(termino_tmp.getDate() + (parseInt((dias.value*1)) > 0 ? parseInt((dias.value*1)) - 1 : 0));
                    fechaTermino.value = new Date(termino_tmp.getTime() - (termino_tmp.getTimezoneOffset() * 60000)).toISOString().split("T")[0];

                }
            }
            if (vigencia.value == 1) {
                fechaTermino.value = ev.target.value
            }
        })

        fechaInicio.addEventListener("change", (ev) => {
            let actual_tmp = new Date().toISOString().split("T")[0];
            errorfechaInicio.innerHTML = ""
            if (ev.target.value < actual_tmp) {
                errorfechaInicio.innerHTML = "Fecha fuera de rango"
            }
        })
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

                    entidad.value = response.data.empresa
                    //referencia.value = response.data.numero_contrato
                    tipoPermiso.value = response.data.tipo_permiso
                    clientetEntidad.value = response.data.visita
                    actividad.value = response.data.actividad
                    vigencia.value = response.data.vigencia
                    dias.value = '' //response.data.dias
                    fechaInicio.value = response.data.fecha_termino
                    fechaInicio.setAttribute("min", response.data.fecha_termino)
                    fechaTermino.value = ''
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

                    //if(response.data.id_tipo_vigencia == 2){
                        divDias.style.display = "none"
                   // }

                    if(response.data.permiso_grupal == 1){
                        divCURPResp.style.display = ""
                    }
					$(vigencia).val('').trigger('change');
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

                        DTPersonal.row.add([
                            '<center>'+element.tipo_persona+'</center>',
                            '<center>'+element.nombre+'</center>',
                            '<center>'+element.nacionalidad+'</center>',
                            '<center><span class="fz-regular" id="estatus_validarPersona'+element.id+'">'+element.estatus+'</span></center>',
                            '<center><span class="fz-regular" id="nombre_validarPersona'+element.id+'">'+element.validadopor+'</span></center>'
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

                        DTEquipoHerramienta.row.add([
                            '<center>'+element.tipo_equipo+'</center>',
                            '<center>'+element.modelo+'</center>',
                            '<center>'+element.marca+'</center>',
                            '<center>'+element.numero_serie+'</center>',
                            '<center><span style="font-size: 12px;" id="estatus_validarEquipo'+element.id+'">'+element.estatus+'</span></center>',
                            '<center><span style="font-size: 12px;" id="nombre_validarEquipo'+element.id+'">'+element.validadopor+'</span></center>'
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

                        DTVehiculos.row.add([
                            '<center>'+element.numero_serie+'</center>',
                            '<center>'+(element.numero_placa != '' ? element.numero_placa : element.tv_placa)+'</center>',
                            '<center>'+element.marca+'</center>',
                            '<center>'+element.modelo+'</center>',
                            '<center>'+element.anio+'</center>',
                            '<center>'+(element.color != '' ? element.color : element.tv_color)+'</center>',
                            '<center><span style="font-size: 12px;" id="estatus_validarVehiculo'+element.id+'">'+element.estatus+'</span></center>',
                            '<center><span style="font-size: 12px;" id="nombre_validarVehiculo'+element.id+'">'+element.validadopor+'</span></center>'
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
    confirmar_almacenamiento(ev) {
        let validacion = true
        let actual_tmp = new Date().toISOString().split("T")[0];

        if (fechaInicio.value < actual_tmp) {
            errorfechaInicio.innerHTML = "Fecha fuera de rango"
            validacion = false
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
		$(modal_confirmar_guardar).css('margin-top', ajuste_altura_modal(ev))
        pedir_confirmacion_guardar();
		/*
        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/FechasExtenderPermiso',
            type: 'POST',
            data: {
                id_permiso : id_permiso,
                fecha : fechaTermino.value,
            },
			beforeSend: function () {
                $("#modal_confirmar_guardar").modal("hide");
                spinner.style.visibility = "visible";
                spinner_buttons('btnGuardar', 'Enviar solicitud', true);
            },			
            success: function (response) {
                if (response.data.validacion) {
                    if (validacion) {
                        $(modal_confirmar_guardar).css('margin-top', ajuste_altura_modal(ev))
                        pedir_confirmacion_guardar();
                    }
                } else {
                    confirmar_guardar.disabled = false;
                    btnGuardar.disabled = false;
                    $(modal_error).css('margin-top', ajuste_altura_modal(ev));
                    peticion_fallida("Se requiere actualizar los documentos para la fecha seleccionada");
                }
                spinner_buttons('btnGuardar', 'Enviar solicitud', false);
            },
            error: (xhr, ajaxOptions, thrownError) => {
                confirmar_guardar.disabled = false;
                btnGuardar.disabled = false;
                $(modal_error).css('margin-top', ajuste_altura_modal(ev));
                peticion_fallida(thrownError);
                spinner_buttons('btnGuardar', 'Enviar solicitud', false);
            }
        }).fail(function (response) {
            spinner_buttons('btnGuardar', 'Enviar solicitud', false);
            if (response.responseText == "Sesion") {
                error_sesion();
            }
        })
		*/
    }
    realizar_almacenamiento_pases(ev) {
        confirmar_guardar.disabled = true;
        btnGuardar.disabled = true;
        
        $.ajax({
            url: base_url + 'Permisos/Ctrl_Permisos/ExtenderPermiso',
            type: 'POST',
            data: {
                id_permiso : id_permiso,
                fini : fechaInicio.value,
                ffin :fechaTermino.value
            },
			beforeSend: function () {
                $("#modal_confirmar_guardar").modal("hide");
                spinner.style.visibility = "visible";
                spinner_buttons('btnGuardar', 'Enviar solicitud', true);
            },			
            success: function (response) {
                if (response.status) {
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
                peticion_fallida(thrownError);
                spinner_buttons('btnGuardar', 'Enviar solicitud', false);
            }
        }).fail(function (response) {
            spinner_buttons('btnGuardar', 'Enviar solicitud', false);
            if (response.responseText == "Sesion") {
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

    function ajuste_altura_modal(mouseEvent) {
        let alturaHeader = 0;
        if (document.body.scrollWidth < 734) {
            alturaHeader = 220;
        } else if (document.body.scrollWidth < 958) {
            alturaHeader = 250;
        } else {
            alturaHeader = 200;
        }
        return (mouseEvent.clientY - mouseEvent.screenY + alturaHeader) + "px";
    }

    function spinner_buttons(id, mensaje, activo = false) {
        if (activo) {
            document.getElementById(id).innerHTML = '<span class="spinner-border-button" role="status" aria-hidden="true"></span>&nbsp;' + mensaje;
        } else {
            document.getElementById(id).innerHTML = mensaje;
        }
    }

    $("#btnRegresar").click((e) => {
            window.location.href = base_url + url_regreso;
    });