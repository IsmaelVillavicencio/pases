const id_credencial = localStorage.getItem("id_credencial");


class Personal{
    constructor(){
        this.inicio();
        this.obtener_datos();
    }
    inicio(){
        confirmar_baja.addEventListener("click",this.confirmarbaja)
        confirmar_reactivar_registro.addEventListener("click",this.confirmarreactivar)
    }
    obtener_datos(){
        $.ajax({
            url: base_url+'Credencializacion/Ctrl_Personal/getVistaPersonasME',
            type: 'GET',
            dataType: 'json',
            data : {
                idcredencial : id_credencial
            },
            success: function(response){
                console.log(response);
                if(response.status){
                    //alert(response.data.id_credencial);
                    //localStorage.setItem("id_credencial", response.data.id_credencial);
                    nss.value = response.data.nss
                    curp.value = response.data.curp
                    nombre.value = response.data.nombre
                    primer_apellido.value = response.data.primer_apellido
                    segundo_apellido.value = response.data.segundo_apellido
                    sexo.value = response.data.sexo
                    fecha_nacimiento.value = response.data.fecha_nacimiento
                    nacionalidad.value = response.data.nacionalidad
                    tipo_pais.value = response.data.tipo_pais
                    sangre.value = response.data.sangre
                    rfc.value = response.data.rfc
                    area.value = response.data.area
                    correo.value = response.data.correo
                    telefono.value = response.data.telefono
                    puesto.value = response.data.nombre_puestos
                    //tipopersona.value = response.data.tipo_persona
                    tipopersona.value = response.data.tipo_persona
                    //alert(response.data.clave_patronal);
                    if (response.data.clave_patronal){
                        $('.classoutsourcing').show();
                        clavepatronal.value = response.data.clave_patronal
                        nombreempresa.value = response.data.nombre_empresa
                    }

                    identificacion.value = response.data.tipo_identificacion ?? ""
                    if (response.data.tipo_identificacion == 'INE/IFE')
                        idclaveident.innerHTML = 'Clave de elector:'
                    else if (response.data.tipo_identificacion == 'Pasaporte')
                        idclaveident.innerHTML = 'Número de pasaporte:'
                    else if (response.data.tipo_identificacion == 'Certificado de Identidad')
                        idclaveident.innerHTML = 'Número único de identidad:'
                    numidenti.value = response.data.numero_identificacion ?? ""
                    fechaexpiracion.value = response.data.fecha_expiracion ?? ""
                    if (response.data.img_ife){
                        var span = document.getElementById('Visuzaliarife');
                        $("#Visuzaliarife").attr("data-img","assets/uploads/credencializacion/personal/"+response.data.img_ife)
                        span.innerHTML = ' <i class="glyphicon glyphicon-paperclip"></i> Ver identificación';
                    }
                    if (response.data.img_perfil){
                        var span = document.getElementById('Visuzaliarfoto');
                        $("#Visuzaliarfoto").attr("data-img","assets/uploads/credencializacion/personal/perfil/"+response.data.img_perfil)
                        span.innerHTML = ' <i class="glyphicon glyphicon-paperclip"></i> Ver foto de perfill';
                    }




                    //if (response.data.tipo_identificacion)

                    /*
                    edad.value = response.data.edad

                    area.value = response.data.area
                    denominacion.value = response.data.denominacion
                    curp.value = response.data.curp
                    nombre.value =  response.data.nombre
                    primer_apellido.value = response.data.primer_apellido
                    segundo_apellido.value = response.data.segundo_apellido
                    fechaNacimiento.value = response.data.fecha_nacimiento
                    edad.value = response.data.edad
                    sexo.value = response.data.sexo
                    nacionalidad.value = response.data.nacionalidad
                    estadoNacimiento.value = response.data.estado_nacimiento
                    ciudadNacimiento.value = response.data.ciudad_nacimiento
                    tipoSangre.value = response.data.sangre
                    */
                    if(response.data.estatus_me == 1){
                        $(".Reactivar").hide()
                        $(".Eliminar").show()
                    }else{
                        $(".Reactivar").show()
                        $(".Eliminar").hide()
                    }
                }
                
            }
        }).fail( function(response) {
            
        });
    }
    /*
    obtener_perfil(){
        $.ajax({
            url: base_url+'Credencializacion/Ctrl_Personal/getImagenesDocumentoByPersonal',
            type: 'GET',
            dataType: 'json',
            data : {
                idpersonal : id_personal
            },
            success: function(response){
                if(response.status){
                    //identificacion.value = response.data.numero_identificacion;
                    if(response.data.estatus == 1){
                        $(".Reactivar").hide()
                        $(".Eliminar").show()
                    }else{
                        $(".Reactivar").show()
                        $(".Eliminar").hide()
                    }
                }
            }
        }).fail( function(response) {
            //alert('fail');
        });
    }
    obtener_domicilio(){
        $.ajax({
            url: base_url+'Credencializacion/Ctrl_Personal/getDomicilio',
            type: 'GET',
            dataType: 'json',
            data : {
                idpersonal : id_personal
            },
            success: function(response){
                if(response.data != null){
                    codigoPostal.value = response.data.cp
                    estado.value = response.data.estado
                    municipio.value = response.data.municipio
                    colonia.value = response.data.colonia
                    calle.value = response.data.calle
                    noExterior.value = response.data.n_ext
                    noInterior.value = (response.data.n_int == 0 ? '' : response.data.n_int)
                    entreCalle1.value = response.data.entre_calle_1
                    entreCalle2.value = response.data.entre_calle_2
                }
            }
        }).fail( function(response) {
            
        });
    }
    obtener_contacto(){
        $.ajax({
            url: base_url+'Credencializacion/Ctrl_Personal/getContacto',
            type: 'GET',
            dataType: 'json',
            data : {
                idpersonal : id_personal
            },
            success: function(response){
                if(response.data != null){
                    correoElectronico.value = response.data.correo
                    numTelefono.value = response.data.telefono
                }
            }
        }).fail( function(response) {
            
        });
    }
    */
    confirmarbaja(ev){
        const id_credencial = localStorage.getItem("id_credencial");
        $.ajax({
            url: base_url + 'Credencializacion/Ctrl_Personal/delete',
            type: "POST",
            data: {
                idcredencial: id_credencial,
                [csrf.name] : csrf.value
            },
            beforeSend:function(){
                $("#modal_confirmar_baja").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    registro_exitoso(data.message);
                    $(".Reactivar").show()
                    $(".Eliminar").hide()
                }
                else
                    peticion_fallida(data.message);
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $("#modal_confirmar_baja").modal("hide");
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        })
    }
    confirmarreactivar(ev){
        const id_credencial = localStorage.getItem("id_credencial");
        $.ajax({
            url: base_url + 'Credencializacion/Ctrl_Personal/reactivar',
            type: "POST",
            data: {
                idcredencial: id_credencial,
                [csrf.name] : csrf.value
            },
            beforeSend:function(){
                $("#modal_confirmar_reactivar").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    registro_exitoso(data.message);
                    $(".Reactivar").hide()
                    $(".Eliminar").show()
                }
                else
                    peticion_fallida(data.message);
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $("#modal_confirmar_reactivar").modal("hide");
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        })
    }
    regresar(){
        if(cambio == 1){
            pedir_confirmar_regresar();
            return false
        }
        window.location.href = base_url + 'Credencializacion/Ctrl_Personal';
    }
}

const pers = new Personal()

$(".fotos").on('click', function(event){
    var img = $(this).attr("data-img");
    if (img != "")
        window.open("/"+img,"_blank");
});

