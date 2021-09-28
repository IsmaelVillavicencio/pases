const id_perfil = localStorage.getItem("id_perfil");

let DTPermisos;

class Perfiles{
	constructor(){
        this.inicio();
        this.obtener_datos();
        this.obtener_permisos();
	}
	inicio(){
        DTPermisos = $(tabpermisos).DataTable( {
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
			},
			"order": [[ 0, "asc" ],[1, 'asc']]
        });

        btnRegresar.addEventListener("click",this.regresar)
    }
    obtener_datos(){
        $.ajax({
            url: base_url + 'Usuarios/Ctrl_Perfiles/getById',
            type: "GET",
            data: {idperfil: id_perfil},
            success: (respuesta) => {
                if(respuesta.status){
                    nombre.value = respuesta.data.nombre
                }
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                peticion_fallida();
                console.log(thrownError);
            }
        })
    }
    obtener_permisos(){
        $.ajax({
            url: base_url + 'Usuarios/Ctrl_Perfiles/getPermisos',
            type: "GET",
            data: {
                idperfil : id_perfil,
                estatus  :1
            },
            success: (respuesta) => {
                if(respuesta.data != null){
                    respuesta.data.forEach(e => {
                        DTPermisos.row.add([
                            '<center>'+e.menu+'</center>',
                            '<center>'+e.submenu+'</center>',
                            '<center><input type="checkbox" '+(e.R == 1 ? 'checked' : '')+' disabled/></center>',
                            '<center><input type="checkbox" '+(e.C == 1 ? 'checked' : '')+' disabled/></center>',
                            '<center><input type="checkbox" '+(e.U == 1 ? 'checked' : '')+' disabled/></center>',
                            '<center><input type="checkbox" '+(e.D == 1 ? 'checked' : '')+' disabled/></center>',
                            '<center><input type="checkbox" '+(e.A == 1 ? 'checked' : '')+' disabled/></center>'
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
    regresar(){
        window.location.href = base_url + 'Usuarios/Ctrl_Perfiles';
    }
}
const perf = new Perfiles()