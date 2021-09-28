const id_usuario = localStorage.getItem("id_usuario");

let DTPermisos;

class Usuarios{
	constructor(){
        this.inicio();
        this.obtener_datos();
	}
	inicio(){
        DTPermisos = $(tabpermisos).DataTable( {
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
			},
			"order": [[ 0, "asc" ],[1, 'asc']]
        });

        regresar.addEventListener("click",this.regresar)
    }
    obtener_datos(){
        $.ajax({
            url: base_url + 'Usuarios/Ctrl_Usuarios/getById',
            type: "GET",
            global: false,
            data: {
                idusuario : id_usuario,
                estatus   : 1
            },
            success: (response) => {

                //Personal API
                personalAP.value = response.data.nombre_completo

                $.ajax({
                    url: base_url + 'Usuarios/Ctrl_Personal/getById',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        idpersonal: response.data.id_persona
                    },
                    success: function (responsePersonaInfo) {
                        nombre.value = responsePersonaInfo.data.nombre
                        primerApellido.value = responsePersonaInfo.data.primer_apellido
                        segundoApellido.value = responsePersonaInfo.data.segundo_apellido
                        puesto.value = responsePersonaInfo.data.puestos
                        correoElectronico.value = responsePersonaInfo.data.correo
        
                        $.ajax({
                            url: base_url_rest+'catalogos/areas/'+responsePersonaInfo.data.id_area,
                            type: 'GET',
                            dataType: 'json',
                            success: function (responseArea) {
                                area.value = responseArea.data.nombre_area
                            }
                        }).fail(function (responseArea) {
        
                        });
                    }
                }).fail(function (responsePersonaInfo) {
        
                });

                if (response.data.id_perfil != null){
                    $.ajax({
                        url: base_url + 'Usuarios/Ctrl_Perfiles/getById',
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            idperfil: response.data.id_perfil
                        },
                        success: function (data) {
                            perfil.value = data.data.nombre
                        }
                    }).fail(function (data) {
    
                    });
                    
                    $.ajax({
                        url: base_url + 'Usuarios/Ctrl_Perfiles/getPermisos',
                        type: "GET",
                        global: false,
                        data: {
                            idperfil: response.data.id_perfil,
                            estatus: 1
                        },
                        beforeSend: () => {
                            DTPermisos.clear().draw();
                            personalAP.value = response.data.id_perfil
                        },
                        success: (respuesta) => {
                            if (respuesta.data != null) {

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
                                });
                            }
                        },
                        error: (xhr, ajaxOptions, thrownError) => {
                            peticion_fallida();
                            console.log(thrownError);
                        }
                    })
                }else{
                    $.ajax({
                        url: base_url + 'Usuarios/Ctrl_Usuarios/getPermisos',
                        type: "GET",
                        global: false,
                        data: {
                            idusuario : id_usuario,
                            estatus  :1
                        },
                        success: (respuesta) => {
                            if(respuesta.data != null){
                                respuesta.data.forEach(e => {
                                    let totalcheck = ""
            
                                    if (e.R == 1 && e.U == 1 && e.C == 1 && e.D == 1 && e.A == 1) {
                                        totalcheck = "checked"
                                    }
                                    DTPermisos.row.add([
                                        '<center>' + e.menu + '</center>',
                                        '<center>' + e.submenu + '</center>',
                                        '<center><input type="checkbox" class="seleccion" data-id="' + e.id_submenu + '" data-tipo="v"' + (e.R == 1 ? 'checked' : '') + '/></center>',
                                        '<center><input type="checkbox" class="seleccion" data-id="' + e.id_submenu + '" data-tipo="m"' + (e.U == 1 ? 'checked' : '') + '/></center>',
                                        '<center><input type="checkbox" class="seleccion" data-id="' + e.id_submenu + '" data-tipo="r"' + (e.C == 1 ? 'checked' : '') + '/></center>',
                                        '<center><input type="checkbox" class="seleccion" data-id="' + e.id_submenu + '" data-tipo="e"' + (e.D == 1 ? 'checked' : '') + '/></center>',
                                        '<center><input type="checkbox" class="seleccion" data-id="' + e.id_submenu + '" data-tipo="a"' + (e.A == 1 ? 'checked' : '') + '/></center>',
                                        '<center><input type="checkbox" class="seleccion" data-id="' + e.id_submenu + '" data-tipo="t"' + totalcheck + '/></center>'
                                    ]).draw(false)
                                });
                            }
                        },
                        error: (xhr, ajaxOptions, thrownError) =>{
                            peticion_fallida();
                            console.log(thrownError);
                        }
                    })
                }

            },
            error: (xhr, ajaxOptions, thrownError) =>{
                peticion_fallida();
                console.log(thrownError);
            }
        })
    }
    regresar(){
        window.location.href = base_url + 'Usuarios/Ctrl_Usuarios';
    }
}
const usua = new Usuarios()