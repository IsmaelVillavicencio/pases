let DTPersonas = []
let datosPersonas = [];
let validacionCurp = true

class Credencializacion{
    constructor(){
        this.inicio()
        this.obtener_actividades_realizar()
        this.obtener_personal()
        this.obtener_accesos()
    }
    inicio(){
        DTPersonas = $(tabRegCredenciales).DataTable( {
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
			},
			"order": [[ 0, "asc" ],[3, 'asc']]
        });

        curp.addEventListener("change",this.obtener_datos_persona_curp)

        btnVerIdent.addEventListener('click',(ev)=>{
            $(modalIdentificacion).modal()
        })

        btnVerFoto.addEventListener('click',(ev)=>{
            $(modalPersonal).modal()
        })

        btnAdd.addEventListener("click",this.agregar_datos)
        btnGuardar.addEventListener("click",this.realizar_almacenamiento)
        confirmar_guardar.addEventListener("click",this.guardar)
    }
    obtener_actividades_realizar(){
        $.ajax({
			url: base_url+'Credencializacion/Ctrl_Credencializacion/getTipoActividad',
			type: 'GET',
            dataType: 'json',
            beforeSend: function(){
                $(motivoIngreso).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(motivoIngreso).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {
			
		});
    }
    obtener_personal(){
        $.ajax({
			url: base_url+'Credencializacion/Ctrl_Credencializacion/getPersonalCredencializacion',
			type: 'GET',
            dataType: 'json',
            data : {
                estatus : 1
            },
            beforeSend: function(){
                $(nombreCompleto).append('<option value="all">Seleccionar todos</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(nombreCompleto).append('<option data-tipo="'+element.tipo_persona+'" data-curp="'+element.curp+'" data-nombre="'+element.nombre+' '+element.primer_apellido+' '+element.segundo_apellido+'" value="'+element.id+'">'+element.nombre+' '+element.primer_apellido+' '+element.segundo_apellido+'</option>');
                });
			},
            complete: function(){
                $(nombreCompleto).select2({
                    width: '100%'
                });
            }
		}).fail( function(response) {
			
		});
    }
    obtener_datos_persona(ev){
        if(ev.target.value == ""){
            return false
        }
        $.ajax({
			url: base_url+'Credencializacion/Ctrl_Credencializacion/getVistaPersonasMEById',
			type: 'GET',
            dataType: 'json',
            data : {
                idpersonal : ev.target.value
            },
            beforeSend: function(){
                idpersona.value = 0
                $(pdfViewerIdentificacion).html('');
                $(pdfViewerFotografia).html('');
            },
			success: function(response){

                if(response.data != null){
                    $('.infoper').show();
                    idpersona.value = response.data.id
                    curp.value = response.data.curp
                    nss.value = response.data.nss

                    this.validaciones = new VALIDACIONES();
                    /*
                    let resultado = this.validaciones.curp(response.data.curp);
                    if(resultado.resp){
                        sexo.value = resultado.sexo;
                        fechaNacimiento.value = resultado.fecha_nacimiento;
                        if(resultado.nacionalidad == 1){
                            nacionalidad.value = 'Mexicana';
                        }else{
                            nacionalidad.value = 'Extranjera';
                        }
                    }else if(!resultado.resp){
                        validacionCurp = false
                    }
                    */

                    sexo.value = response.data.sexo;
                    fechaNacimiento.value = response.data.fecha_nacimiento;
                    nacionalidad.value = response.data.nacionalidad;
                    pais.value = response.data.tipo_pais;
                    tipoSangre.value = response.data.sangre
                    rfc.value = response.data.rfc
                    puesto.value = response.data.nombre_puestos
                    area.value = response.data.area
                    tipoIdentificacion.value = response.data.tipo_identificacion

                    if (response.data.tipo_identificacion == 'INE/IFE')
                        idclaveident.innerHTML = 'Clave de elector:'
                    else if (response.data.tipo_identificacion == 'Pasaporte')
                        idclaveident.innerHTML = 'Número de pasaporte:'
                    else if (response.data.tipo_identificacion == 'Certificado de Identidad')
                        idclaveident.innerHTML = 'Número único de identidad:'

                    if (response.data.clave_patronal){
                        $(divEmpresa).show();
                        clavePatronal.value = response.data.clave_patronal
                        empresa.value = response.data.nombre_empresa
                    }


                    tipoPersona.value = response.data.tipo_persona
                    claveIdentificacion.value = response.data.numero_identificacion
                    fechaVencimiento.value = response.data.fecha_expiracion
                    correo.value = response.data.correo
                    numero.value = response.data.telefono
                    $(pdfViewerIdentificacion).html('<img width="460" height="200" src="'+base_url+'/assets/uploads/credencializacion/personal/'+response.data.img_ife+'"/>');
                    $(pdfViewerFotografia).html('<img width="460" height="200" src="'+base_url+'/assets/uploads/credencializacion/personal/'+response.data.img_perfil+'"/>');
                }
			},
            complete: function(){
                $(nombreCompleto).select2({
                    width: '100%'
                });
            }
		}).fail( function(response) {
			
		});
    }
    obtener_accesos(){
        $.ajax({
            url: base_url+'Credencializacion/Ctrl_Credencializacion/getAccesos',
            type: 'GET',
            dataType: 'json',
            success: function(response){
                response.data.forEach(element => {
                    $('.showaccess').append('<label><input type="checkbox" name="accesos[]" value="'+element.id+'"> '+element.nombre+'</label><br>');
                });
            }
        }).fail( function(response) {
            
        });
    }
    obtener_datos_persona_curp(ev){
        $(errorcurp).html("")
        $(errormotivoIngreso).html("")


        $(nss).val("");
        $('#nombreCompleto').val(null).trigger("change")
        $(tipoPersona).val("");
        $(sexo).val("");
        $(fechaNacimiento).val("");
        $(nacionalidad).val("");
        $(pais).val("");
        $(tipoSangre).val("");
        $(rfc).val("");
        $(puesto).val("");
        $(area).val("");
        $(tipoIdentificacion).val("");
        $(claveIdentificacion).val("");
        $(correo).val("");
        $(numero).val("");
        $(clavePatronal).val("");
        $(empresa).val("");
        $(pdfViewerIdentificacion).html('');
        $(pdfViewerFotografia).html('');



        if(!ev.target.value)
            return false
        
        $.ajax({
			url: base_url+'Credencializacion/Ctrl_Personal/getByCURP',
			type: 'GET',
            dataType: 'json',
            data : {
                curp : ev.target.value
            },
            beforeSend: function(){
                idpersona.value = 0
                $(pdfViewerIdentificacion).html('');
                $(pdfViewerFotografia).html('');
            },
			success: function(response){
                if(response.data != null){
                    idpersona.value = response.data.id
                    curp.value = response.data.curp
                    nss.value = response.data.nss

                    $('#nombreCompleto').val(response.data.id).trigger('change');

                    this.validaciones = new VALIDACIONES();
                    let resultado = this.validaciones.curp(response.data.curp);
                    if(resultado.resp){
                        sexo.value = resultado.sexo;
                        fechaNacimiento.value = resultado.fecha_nacimiento;
                        if(resultado.nacionalidad == 1){
                            nacionalidad.value = 'Mexicana';
                        }else{
                            nacionalidad.value = 'Extranjera';
                        }
                    }else if(!resultado.resp){
                        validacionCurp = false
                    }

                    tipoSangre.value = response.data.sangre
                    rfc.value = response.data.rfc
                    puesto.value = response.data.puestos
                    area.value = response.data.area
                    tipoIdentificacion.value = response.data.tipo_identificacion
                    claveIdentificacion.value = response.data.numero_identificacion
                    fechaVencimiento.value = response.data.fecha_expiracion_identificacion
                    correo.value = response.data.correo
                    numero.value = response.data.telefono

                    $(pdfViewerIdentificacion).html('<img width="460" height="200" src="'+base_url+response.data.fotografia_identificacion+'"/>');
                    $(pdfViewerFotografia).html('<img width="460" height="200" src="'+base_url+response.data.fotografia_persona+'"/>');
                }
			},
            complete: function(){
                $(nombreCompleto).select2({
                    width: '100%'
                });
            }
		}).fail( function(response) {
			
		});
    }
    agregar_datos(){
        let validacion = true;
        $(errormotivoIngreso).html("")
        $(erroraccesos).html("")
        $(errordatos).html("")

        let listaccesos = "";
        $('input[type=checkbox]').each(function () {
            if (this.checked)
                listaccesos += $(this).val()+",";
        });
        if (listaccesos)
            listaccesos = listaccesos.slice(0, -1);
        else{
            $(erroraccesos).html("Campo obligatorio")
            validacion = false 
        }

        if(motivoIngreso.value == ""){
            $(errormotivoIngreso).html("Campo obligatorio")
            validacion = false 
        }
        if (validacion){
            let all = $("#nombreCompleto option[value='all']").is(':selected');
            let optionval = (all) ? $('#nombreCompleto > option') : $('#nombreCompleto > option:selected');
            optionval.each(function(){
                var tipo = (!$(this).data('tipo') || $(this).data('tipo') == 'undefined') ? '' : $(this).data('tipo');
                var curp = (!$(this).data('curp') || $(this).data('curp') == 'undefined') ? '' : $(this).data('curp');
                var nombre = (!$(this).data('nombre') || $(this).data('nombre') == 'undefined') ? '' : $(this).data('nombre');
                //alert(nombre);
                var id = $(this).val();
                var aux2 = 0;
                let datos = {
                    id : id,
                    tipo : tipo,
                    curp : curp,
                    nombre : nombre,
                    listaccesos : listaccesos,
                    motivo : motivoIngreso.value,
                    addestatus : 1
                }
                if (datosPersonas){
                    datosPersonas.forEach(function(res){
                        if (res.id == datos.id){
                            aux2 = 1;
                        }
                    });
                }
                if (aux2 == 0){
                    datosPersonas.push(datos);
                    DTPersonas.row.add([
                        '<center>'+tipo+'</center>',
                        '<center>'+nombre+'</center>',
                        '<center>'+curp+'</center>',
                        '<div class="d-flex justify-content-center" >'+
                            '<div class="p-1">'+
                                '<a href="#!" title="Eliminar">'+
                                    '<span class="glyphicon glyphicon-trash eliminar" aria-hidden="true"></span>'+
                                '</a>'+
                            '</div>'+
                        '</div>'
                    ]).draw(false)
                }
                else{
                    $(errordatos).html("Algunos datos estaban previamente en la lista");
                }
            });
            $('#nombreCompleto').val(null).trigger("change")
            //$('#nombreCompleto').val("").trigger('change');
        }
    }
    realizar_almacenamiento(){
        let validacion = false;
        for (let index = 0; index < datosPersonas.length; index++) if(datosPersonas[index].addestatus == 1){
            validacion = true;
        }
        
        if(validacion){
            $("#modal_confirmar_guardar").modal()
        }
    }
    guardar(){


        let formData = new FormData();
        
        for (let index = 0; index < datosPersonas.length; index++) if(datosPersonas[index].addestatus == 1){
            formData.append("id_personal["+index+"]",datosPersonas[index].id)
            formData.append("id_motivo_ingreso["+index+"]",datosPersonas[index].motivo)
            formData.append("ids_accesos["+index+"]",datosPersonas[index].listaccesos)
            $("#nombreCompleto option[value='"+datosPersonas[index].id+"']").remove();
        }
        $("#confirmar_guardar").attr("disabled","true");
        $.ajax({
            url: base_url + 'Credencializacion/Ctrl_Credencializacion/add',
            type: 'POST',
            data : formData,
            global: false,
            processData: false,
            contentType: false,
            dataType: 'json',
            success: (response) => {
                console.log(response);
                $("#modal_confirmar_guardar").modal("hide");
                datosPersonas = []     
                DTPersonas.clear().draw()
                csrf.value = response.token;
                if(response.status){
                    registro_exitoso('Registro exitoso');
                }else{
                    peticion_fallida(response.message);
                }
                $("#confirmar_guardar").attr("disabled","false");

            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $("#modal_confirmar_guardar").modal("hide");
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        })
        /*
        */

        /*$.ajax({
			url: base_url+'Credencializacion/Ctrl_Credencializacion/addCredencial',
			type: 'GET',
            dataType: 'json',
            data : {
                estatus : 1
            },
            beforeSend: function(){
                $(nombreCompleto).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				
			},
            complete: function(){
                idpersona.value = 0
                $('.form-control').val("")
                $('.lectura').val("")
                $('#nombreCompleto').val("").trigger('change');
            }
		}).fail( function(response) {
			
		});*/
    }
}
const reg = new Credencializacion();


$("#nombreCompleto").change( (ev) => {
    let all = $("#nombreCompleto option[value='all']").is(':selected');
    if (all){
        $("#nombreCompleto option").prop("selected", false);
        $("#nombreCompleto option[value='all']").prop("selected", true);
    }

    var count = 0;
    for (var i=0; i < ev.target.length; i++) {
        if (ev.target[i].selected) count++;
    }
    $('.infoper').show();
    if (count == 1 && !(all)){
        reg.obtener_datos_persona(ev)
    }
    else if (count > 1 || all)
        $('.infoper').hide();
});