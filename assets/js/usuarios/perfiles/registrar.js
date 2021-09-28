let DTPermisos;
let datosSeleccionados = [];
let modulosSeleccionados = [];

class Perfiles{
	constructor(){
        this.inicio();
        this.obtener_modulos();
	}
	inicio(){
        DTPermisos = $(tabpermisos).DataTable( {
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
			},
			"order": [[ 0, "asc" ],[1, 'asc']]
        });

        nombre.addEventListener("change", (ev) => {
            if(ev.target.value != ""){
                $(errorNombre).hide();
            }
        });
        selModulos.addEventListener("change",this.obtener_submenu);
        todosModulos.addEventListener("change",this.obtener_todos_submenu);
        btnGuardar.addEventListener("click",this.realizar_almacenamiento)
        confirmar_guardar.addEventListener("click",this.guardar)
        btnRegresar.addEventListener("click",this.regresar)

        confirmar_salir_sin_guardar.addEventListener('click',(ev)=> {
            window.location.href = base_url + 'Usuarios/Ctrl_Perfiles';
        });
    }
    obtener_modulos(){
        $.ajax({
            url: base_url + 'Sesiones/Ctrl_Menu/getByEstatus',
            type: "GET",
            data: {estatus: 1},
            success: (respuesta) => {
                if(respuesta.data != null){
                    respuesta.data.forEach(e => {
                        $(selModulos).append('<option value="'+e.id+'">'+e.nombre+'</option>');
                    });
                }
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                peticion_fallida();
                console.log(thrownError);
            }
        })
    }
    obtener_submenu(){
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
            $(selModulos).removeAttr("disabled");
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
    realizar_almacenamiento(){
        let validacion = true;
        if(nombre.value == ""){
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
            url: base_url + 'Usuarios/Ctrl_Perfiles/add',
            type: 'POST',
            data: {
                nombre      :   nombre.value,
                permisos    :   datosSeleccionados,
                [csrf.name] :   csrf.value
            },
            beforeSend:function(){
                $("#modal_confirmar_guardar").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status != true){
                    peticion_fallida(data.message);
                }else{
                    DTPermisos.clear().draw();
                    datosSeleccionados = []
                    modulosSeleccionados = []
                    nombre.value = ""
                    selModulos.value = ""
                    todosModulos.checked = false
                    $(selModulos).removeAttr("disabled");
                    registro_exitoso(data.message);
                }
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $("#modal_confirmar_guardar").modal("hide");
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        })
    }
    regresar(){
        let validacion = true;

        if(nombre.value != "" || selModulos.value != "" || todosModulos.checked || datosSeleccionados.length > 0){
            validacion = false;
        }

        if(!validacion){
            pedir_confirmar_regresar();
            return false
        }
        window.location.href = base_url + 'Usuarios/Ctrl_Perfiles';
    }
}
const perf = new Perfiles()

$(tabpermisos).on('click', '.seleccion', function(ev){
    perf.seleccionar_datos(ev);
});