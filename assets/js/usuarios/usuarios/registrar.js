let DTPermisos;
let datosSeleccionados = [];
let modulosSeleccionados = [];

class Usuarios {
    constructor() {
        this.inicio();
        this.obtenerPersonal();
        this.obtenerPerfiles();
        this.obtenerModulos();
    }
    inicio() {
        DTPermisos = $(tabpermisos).DataTable({
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            },
            "order": [[0, "asc"], [1, 'asc']]
        });

        selPerfil.addEventListener('change', this.obtenerPerfilInfo)
        selModulos.addEventListener("change", this.obtener_submenu)
        todosModulos.addEventListener("change", this.obtener_todos_submenu)

        confirmar_salir_sin_guardar.addEventListener('click', (ev) => {
            window.location.href = base_url + 'Usuarios/Ctrl_Usuarios';
        });

        guardar.addEventListener("click",this.realizar_almacenamiento)
        confirmar_guardar.addEventListener("click",this.guardar)

        regresar.addEventListener("click", this.regresar)
    }
    obtenerPersonal() {
        $.ajax({
            url: base_url + 'Usuarios/Ctrl_Personal/getUniquePersonasUsuario',
            type: 'GET',
            dataType: 'json',
            data: {
                estatus: 1
            },
            success: function (response) {
                response.data.forEach(element => {
                    $(selPersonal).append('<option value="' + element.id + '">' + element.nombre + ' '+ element.primer_apellido + ' '+ element.segundo_apellido + '</option>');
                });
            },     
            complete: () => {
                $(selPersonal).select2({placeholder: "Seleccione"});
            },
        }).fail(function (response) {

        });
    }
    mostrarDatosPersonal(id) {
        $.ajax({
            url: base_url + 'Usuarios/Ctrl_Personal/getById',
            type: 'GET',
            global: false,
            dataType: 'json',
            data: {
                idpersonal: id
            },
            success: function (response) {
                nombre.value = response.data.nombre
                primerApellido.value = response.data.primer_apellido
                segundoApellido.value = response.data.segundo_apellido
                puesto.value = response.data.puestos
                correoElectronico.value = response.data.correo != null ? response.data.correo : ""

                $.ajax({
                    url: base_url_rest+'catalogos/areas/'+response.data.id_area,
                    type: 'GET',
                    dataType: 'json',
                    global: false,
                    success: function (data) {
                        area.value = data.data.nombre_area
                    }
                }).fail(function (data) {

                });
            }
        }).fail(function (data) {

        });
    }
    obtenerPerfiles() {
        $.ajax({
            url: base_url + 'Usuarios/Ctrl_Perfiles/getByEstatus',
            type: 'GET',
            dataType: 'json',
            data: {
                estatus: 1
            },
            beforeSend: function () {
                $(selPerfil).append('<option value="0">Seleccione</option>');
            },
            success: function (response) {
                response.data.forEach(element => {
                    $(selPerfil).append('<option value="' + element.id + '">' + element.nombre + '</option>');
                });
            }
        }).fail(function (response) {

        });
    }
    obtenerModulos() {
        $.ajax({
            url: base_url + 'Sesiones/Ctrl_Menu/getByEstatus',
            type: "GET",
            global: false,
            data: { estatus: 1 },
            beforeSend: () => {
                $(selModulos).append('<option value="0">Seleccione</option>');
            },
            success: (respuesta) => {
                if (respuesta.data != null) {
                    respuesta.data.forEach(e => {
                        $(selModulos).append('<option value="' + e.id + '">' + e.nombre + '</option>');
                    });
                }
            },
            error: (xhr, ajaxOptions, thrownError) => {
                peticion_fallida();
                console.log(thrownError);
            }
        })
    }
    realizar_almacenamiento(){
        let validacion = true;

        if(selPerfil.value == ""){
            $(errorNombre).show();
            validacion = false
        }

        if(datosSeleccionados.length == 0){
            $(errorPermisos).show()
            validacion = false
        }

        if(validacion){
            $("#modal_confirmar_guardar").modal()
        }
    }
    guardar(){
        $.ajax({
            url: base_url + 'Usuarios/Ctrl_Usuarios/add',
            type: 'POST',
            global: false,
            data: {
                idpersonal  :   selPersonal.value,
                idperfil    :   selPerfil.value,
                permisos    :   datosSeleccionados,
                [csrf.name] :   csrf.value
            },
            beforeSend:function(){
                spinner.style.visibility="visible";
                guardar.disabled = true;
                $("#modal_confirmar_guardar").modal("hide");
            },
            success: (data) => {
                guardar.disabled = false;
                spinner.style.visibility="hidden";
                csrf.value = data.token;
                if(data.status != true){
                    peticion_fallida(data.message);
                }else{
                    DTPermisos.clear().draw();
                    datosSeleccionados = []
                    selPersonal.value = ""
                    nombre.value = ""
                    primerApellido.value = ""
                    segundoApellido.value = ""
                    puesto.value = ""
                    correoElectronico.value = ""
                    area.value = ""
                    selPerfil.value = ""
                    selModulos.value = ""
                    todosModulos.checked = false
                    registro_exitoso(data.message);
                }
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                guardar.disabled = false;
                spinner.style.visibility="hidden";
                $("#modal_confirmar_guardar").modal("hide");
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        })
    }
    regresar(){
        let validacion = true;

        if(selPersonal.value != "" || selPerfil.value != "" || selModulos.value != "" || todosModulos.checked || datosSeleccionados.length > 0){
            validacion = false;
        }

        if(!validacion){
            pedir_confirmar_regresar();
            return false
        }
        window.location.href = base_url + 'Usuarios/Ctrl_Usuarios';
    }

    // Separador
    obtenerPerfilInfo(){
        if(this.value != 0){
            $(todosModulos).prop( "disabled", true );
            $(selModulos).prop( "disabled", true );
        }else{
            $(todosModulos).prop( "disabled", false );
            $(selModulos).prop( "disabled", false );
        }

        $.ajax({
            url: base_url + 'Usuarios/Ctrl_Perfiles/getPermisos',
            type: "GET",
            global: false,
            data: {
                idperfil: selPerfil.value,
                estatus: 1
            },
            beforeSend: () => {
                $(todosModulos).prop( "checked", false );
                DTPermisos.clear().draw();
            },
            success: (respuesta) => {
                if (respuesta.data != null) {
                    datosSeleccionados = []
                    respuesta.data.forEach(e => {

                        let totalcheck = ""

                        if (e.R == 1 && e.U == 1 && e.C == 1 && e.D == 1 && e.A == 1) {
                            totalcheck = "checked"
                        }

                        DTPermisos.row.add([
                            '<center>' + e.menu + '</center>',
                            '<center>' + e.submenu + '</center>',
                            '<center><input type="checkbox" class="seleccion" data-id="' + e.id_submenu + '" data-tipo="v"' + (e.R == 1 ? 'checked' : '') + ' disabled/></center>',
                            '<center><input type="checkbox" class="seleccion" data-id="' + e.id_submenu + '" data-tipo="m"' + (e.U == 1 ? 'checked' : '') + ' disabled/></center>',
                            '<center><input type="checkbox" class="seleccion" data-id="' + e.id_submenu + '" data-tipo="r"' + (e.C == 1 ? 'checked' : '') + ' disabled/></center>',
                            '<center><input type="checkbox" class="seleccion" data-id="' + e.id_submenu + '" data-tipo="e"' + (e.D == 1 ? 'checked' : '') + ' disabled/></center>',
                            '<center><input type="checkbox" class="seleccion" data-id="' + e.id_submenu + '" data-tipo="a"' + (e.A == 1 ? 'checked' : '') + ' disabled/></center>',
                            '<center><input type="checkbox" class="seleccion" data-id="' + e.id_submenu + '" data-tipo="t"' + totalcheck + ' disabled/></center>'
                        ]).draw(false)

                        let dato = {
                            id: ""+e.id_submenu+"",
                            visualizacion: e.R ? 1 : 0,
                            modificacion:  e.U ? 1 : 0,
                            registro:  e.C ? 1 : 0,
                            eliminacion:  e.D ? 1 : 0,
                            reactivar:  e.D ? 1 : 0,
                        }
                        datosSeleccionados.push(dato);
                    });
                }
            },
            error: (xhr, ajaxOptions, thrownError) => {
                peticion_fallida();
                console.log(thrownError);
            }
        })
    }
    obtener_submenu(){

        if(this.value != 0){
            $(selPerfil).prop( "disabled", true );
        }else{
            $(selPerfil).prop( "disabled", false );
        }
        $(errorPermisos).hide()

        let validacion = modulosSeleccionados.find(e => e.modulo === selModulos.value)
        if(typeof validacion === 'undefined' && selModulos.value != ""){
            $.ajax({
                url: base_url + 'Sesiones/Ctrl_SubMenu/getByMenu',
                type: "GET",
                global: false, //detalle
                data: {
                    idmenu : selModulos.value,
                    estatus: 1
                },
                beforeSend: function(){
                    modulosSeleccionados.push({modulo : selModulos.value});
                },
                success: (respuesta) => {
                    if(respuesta.data != null){
                        respuesta.data.forEach(e => {
                            DTPermisos.row.add([
                                '<center>'+e.menu+'</center>',
                                '<center>'+e.submenu+'</center>',
                                '<center><input type="checkbox" class="seleccion" data-id="'+e.id+'" data-tipo="r"/></center>',
                                '<center><input type="checkbox" class="seleccion" data-id="'+e.id+'" data-tipo="v"/></center>',
                                '<center><input type="checkbox" class="seleccion" data-id="'+e.id+'" data-tipo="m"/></center>',
                                '<center><input type="checkbox" class="seleccion" data-id="'+e.id+'" data-tipo="e"/></center>',
                                '<center><input type="checkbox" class="seleccion" data-id="'+e.id+'" data-tipo="a"/></center>',
                                '<center><input type="checkbox" class="seleccion" data-id="'+e.id+'" data-tipo="t"/></center>'
                            ]).draw(false)
                        });
                    }
                },
                error: (xhr, ajaxOptions, thrownError) =>{
                    peticion_fallida();
                    console.log(thrownError);
                }
            }).fail(function(response){
                if(response.responseText=="Sesion"){
                    error_sesion();
                }
            });
        }
    }
    obtener_todos_submenu(ev){
        $(errorPermisos).hide()

        DTPermisos.clear().draw();
        if(ev.target.checked){
            $(selPerfil).prop( "disabled", true );
            $(selModulos).prop( "disabled", true );
            $.ajax({
                url: base_url + 'Sesiones/Ctrl_SubMenu/getByEstatus',
                type: "GET",
                global: false, //detalle
                data: {estatus: 1},
                beforeSend: function(){
                    $(selModulos).attr("disabled",true);
                    datosSeleccionados = []
                },
                success: (respuesta) => {
                    if(respuesta.data != null){
                        respuesta.data.forEach(e => {
                            DTPermisos.row.add([
                                '<center>'+e.menu+'</center>',
                                '<center>'+e.submenu+'</center>',
                                '<center><input type="checkbox" class="seleccion" data-id="'+e.id+'" data-tipo="r" checked/></center>',
                                '<center><input type="checkbox" class="seleccion" data-id="'+e.id+'" data-tipo="v" checked/></center>',
                                '<center><input type="checkbox" class="seleccion" data-id="'+e.id+'" data-tipo="m" checked/></center>',
                                '<center><input type="checkbox" class="seleccion" data-id="'+e.id+'" data-tipo="e" checked/></center>',
                                '<center><input type="checkbox" class="seleccion" data-id="'+e.id+'" data-tipo="a" checked/></center>',
                                '<center><input type="checkbox" class="seleccion" data-id="'+e.id+'" data-tipo="t" checked/></center>'
                            ]).draw(false)

                            datosSeleccionados.push({
                                id              : e.id,
                                visualizacion   : 1,
                                modificacion    : 1,
                                registro        : 1,
                                eliminacion     : 1,
                                reactivar       : 1
                            });
                        });
                    }
                },
                error: (xhr, ajaxOptions, thrownError) =>{
                    peticion_fallida();
                    console.log(thrownError);
                }
            }).fail(function(response){
                if(response.responseText=="Sesion"){
                    error_sesion();
                }
            })
        }else{
            $(selPerfil).prop( "disabled", false );
            $(selModulos).prop( "disabled", false );
        }
    }
    seleccionar_datos(ev){
        $(errorPermisos).hide()

        const index = datosSeleccionados.findIndex(e => e.id == ev.target.dataset.id)
        if(ev.target.checked){
            if(ev.target.dataset.tipo == 't'){
                $(".seleccion[data-id="+ev.target.dataset.id+"][data-tipo='v']").prop( "checked", true );
                $(".seleccion[data-id="+ev.target.dataset.id+"][data-tipo='m']").prop( "checked", true );
                $(".seleccion[data-id="+ev.target.dataset.id+"][data-tipo='r']").prop( "checked", true );
                $(".seleccion[data-id="+ev.target.dataset.id+"][data-tipo='e']").prop( "checked", true );
                $(".seleccion[data-id="+ev.target.dataset.id+"][data-tipo='a']").prop( "checked", true );
            }
            if(index == -1){
                let dato = {
                    id              : ev.target.dataset.id,
                    visualizacion   : (ev.target.dataset.tipo == 'v' || ev.target.dataset.tipo == 't') ? 1 : 0,
                    modificacion    : (ev.target.dataset.tipo == 'm' || ev.target.dataset.tipo == 't') ? 1 : 0,
                    registro        : (ev.target.dataset.tipo == 'r' || ev.target.dataset.tipo == 't') ? 1 : 0,
                    eliminacion     : (ev.target.dataset.tipo == 'e' || ev.target.dataset.tipo == 't') ? 1 : 0,
                    reactivar       : (ev.target.dataset.tipo == 'a' || ev.target.dataset.tipo == 't') ? 1 : 0,
                }
                datosSeleccionados.push(dato);
            }else{
                if(ev.target.dataset.tipo == 'v' || ev.target.dataset.tipo == 't'){
                    datosSeleccionados[index].visualizacion = 1
                }
                if(ev.target.dataset.tipo == 'm' || ev.target.dataset.tipo == 't'){
                    datosSeleccionados[index].modificacion = 1
                }
                if(ev.target.dataset.tipo == 'r' || ev.target.dataset.tipo == 't'){
                    datosSeleccionados[index].registro = 1
                }
                if(ev.target.dataset.tipo == 'e' || ev.target.dataset.tipo == 't'){
                    datosSeleccionados[index].eliminacion = 1
                }
                if(ev.target.dataset.tipo == 'a' || ev.target.dataset.tipo == 't'){
                    datosSeleccionados[index].reactivar = 1
                }
            }
        }else{
            if(ev.target.dataset.tipo == 't'){
                $(".seleccion[data-id="+ev.target.dataset.id+"][data-tipo='v']").prop( "checked", false );
                $(".seleccion[data-id="+ev.target.dataset.id+"][data-tipo='m']").prop( "checked", false );
                $(".seleccion[data-id="+ev.target.dataset.id+"][data-tipo='r']").prop( "checked", false );
                $(".seleccion[data-id="+ev.target.dataset.id+"][data-tipo='e']").prop( "checked", false );
                $(".seleccion[data-id="+ev.target.dataset.id+"][data-tipo='a']").prop( "checked", false );
            }
            if(ev.target.dataset.tipo == 'v' || ev.target.dataset.tipo == 't'){
                datosSeleccionados[index].visualizacion = 0
            }
            if(ev.target.dataset.tipo == 'm' || ev.target.dataset.tipo == 't'){
                datosSeleccionados[index].modificacion = 0
            }
            if(ev.target.dataset.tipo == 'r' || ev.target.dataset.tipo == 't'){
                datosSeleccionados[index].registro = 0
            }
            if(ev.target.dataset.tipo == 'e' || ev.target.dataset.tipo == 't'){
                datosSeleccionados[index].eliminacion = 0
            }
            if(ev.target.dataset.tipo == 'a' || ev.target.dataset.tipo == 't'){
                datosSeleccionados[index].reactivar = 0
            }

            if(datosSeleccionados[index].visualizacion == 0 && datosSeleccionados[index].modificacion == 0 && datosSeleccionados[index].registro == 0 && datosSeleccionados[index].eliminacion == 0 && datosSeleccionados[index].reactivar){
                datosSeleccionados.splice(index, 1); 
            }
        }
    }
}

const usua = new Usuarios()

$(tabpermisos).on('click', '.seleccion', function (ev) {
    usua.seleccionar_datos(ev);
});

$(selPersonal).on('change', () => {
    usua.mostrarDatosPersonal($(selPersonal).val());
});