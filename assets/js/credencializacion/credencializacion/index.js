let DTCredenciales = []
let datosPersonas = [];
let validacionCurp = true

class Credencializacion{
    constructor(){
        this.inicio()
        this.obtenerDatosTabla()
    }
    inicio(){
        DTCredenciales = $(tabAdmSolicitudesCredenciales).DataTable( {
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
			},
			"order": [[ 0, "asc" ]]
        });

        
    }
    obtenerDatosTabla(){
        $.ajax({
            url: base_url+'Credencializacion/Ctrl_Credencializacion/getAll',
            type: 'GET',
            dataType: 'json',
            success: function(response){
                response.data.forEach(element => {
                    DTCredenciales.row.add([
                        '<center>'+element.numsolicitud+'</center>',
                        '<center>'+element.total+'</center>',
                        '<center>'+(element.estatus == 1 ? 'Activo': 'Inactivo')+'</center>',
                        '<div class="d-flex justify-content-center" >'+
                            '<div class="p-1">'+
                                '<a href="#!" title="Eliminar">'+
                                    '<span class="glyphicon glyphicon-eye-open consultar" aria-hidden="true"></span>'+
                                '</a>'+
                            '</div>'+
                        '</div>'
                    ]).draw(false)
                });
            }
        }).fail( function(response) {
            
        });
    }
}

const reg = new Credencializacion();