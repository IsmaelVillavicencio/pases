var DTOperadores, DTContenedores, DTVehiculos, DTTractos
class Autorizar{
    constructor(){
        this.inicio()
        this.obtener_datos_generales();
        this.obtener_datos_operadores();
        this.obtener_datos_contenedores();
        this.obtener_datos_vehiculos();
        this.obtener_datos_tractos();
    }
    inicio(){
        DTOperadores = $(tabOperadores).DataTable( {
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
			},
			"order": []
        });
      DTContenedores = $(tabContenedores).DataTable( {
        "language": {
        "url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
        "order": []
          });
      DTVehiculos = $(tabVehiculo).DataTable( {
        "language": {
        "url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
        "order": []
          });
        DTTractos = $(tabTractos).DataTable( {
          "language": {
          "url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
          },
          "order": []
            });

    }
    obtener_datos_generales(){
        $.ajax({
            //url: url ,
            type: 'GET',
            dataType: 'json',
            data: {
                estatus : 1
            },
            beforeSend: function(){
                
            },
            success: function(response){

                /*
                nombreEmpresas.value = response.data.
                noReferencia.value = response.data.
                imo.value = response.data.
                nombre.value = response.data.
                noViaje.value = response.data.
                toneladas.value = response.data.
                tipoProducto.value = response.data.
                empresaManiobrista.value = response.data.
                ptoDestino.value = response.data.
                tipoPermiso.value = response.data.
                noDias.value = response.data.
                fechaInicioPermiso.value = response.data.
                fechaFinPermiso.value = response.data.
                */
               
            }
          })
    }
    obtener_datos_operadores(){
        $.ajax({
            //url: url ,
            type: 'GET',
            dataType: 'json',
            data: {
                estatus : 1
            },
            beforeSend: function(){
                
            },
            success: function(response){

                /*
                
                response.data.forEach(elemen => {
                    DTOperadores.row.add([
                    '<center>'+datos.curp+'</center>',
                    '<center>'+datos.nombrecompleto+'</center>',
                    '<div class="d-flex justify-content-center" >'+
                        '<div class="p-1">'+
                            '<a href="#!" title="Eliminar">'+
                                '<span class="glyphicon glyphicon-trash eliminarOperador" data-id="'+(datosOperadores.length-1)+'"></span>'+
                            '</a>'+
                        '</div>'+
                    '</div>'
                ]).draw(false)
                })
                  
                */
               
            }
          })
    }
    obtener_datos_contenedores(){
        $.ajax({
            //url: url ,
            type: 'GET',
            dataType: 'json',
            data: {
                estatus : 1
            },
            beforeSend: function(){
                
            },
            success: function(response){

                /*
                
                response.data.forEach(elemen => {
                   DTContenedores.row.add([
                    '<center>'+datos.nombre+'</center>',
                    '<div class="d-flex justify-content-center" >'+
                        '<div class="p-1">'+
                            '<a href="#!" title="Eliminar">'+
                                '<span class="glyphicon glyphicon-trash eliminarContenedor" data-id="'+(datosContenedores.length-1)+'"></span>'+
                            '</a>'+
                        '</div>'+
                    '</div>'
                ]).draw(false)
                })
                  
                */
               
            }
          })
    }
    obtener_datos_vehiculos(){
        $.ajax({
            //url: url ,
            type: 'GET',
            dataType: 'json',
            data: {
                estatus : 1
            },
            beforeSend: function(){
                
            },
            success: function(response){

                /*
                
                response.data.forEach(elemen => {
                DTVehiculos.row.add([
                    '<center>'+datos.tipovehiculo+'</center>',
                    '<center>'+datos.noplaca+'</center>',
                    '<center>'+datos.noserie+'</center>',
                    '<div class="d-flex justify-content-center" >'+
                        '<div class="p-1">'+
                            '<a href="#!" title="Eliminar">'+
                                '<span class="glyphicon glyphicon-trash eliminarVehiculo" data-id="'+(datosVehiculos.length-1)+'"></span>'+
                            '</a>'+
                        '</div>'+
                    '</div>'
                ]).draw(false)
                   
                })
                  
                */
               
            }
          })
    }
    obtener_datos_tractos(){
        $.ajax({
            //url: url ,
            type: 'GET',
            dataType: 'json',
            data: {
                estatus : 1
            },
            beforeSend: function(){
                
            },
            success: function(response){

                /*
                
                response.data.forEach(elemen => {

                DTTractos.row.add([
                    '<center>'+datos.noplaca+'</center>',
                    '<center>'+datos.noserie+'</center>',
                    '<div class="d-flex justify-content-center" >'+
                        '<div class="p-1">'+
                            '<a href="#!" title="Eliminar">'+
                                '<span class="glyphicon glyphicon-trash eliminarTracto" data-id="'+(datosVehiculos.length-1)+'"></span>'+
                            '</a>'+
                        '</div>'+
                    '</div>'
                ]).draw(false)

                   
                })
                  
                */
               
            }
          })
    }
}
const aut = new Autorizar()