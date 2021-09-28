const id_vehiculo = localStorage.getItem("id_vehiculo");
const id_vehiculo_me = localStorage.getItem("id_vehiculo_me"); 

class Consultar{
    constructor(){
		this.obtener_datos();
        this.inicio();
        //this.obtener_tipos_vehiculos()
         $(".eliminar").hide();
        $(".reactivar").hide();
		$(".editar").hide();
		 
    }
    inicio(){
        confirmar_baja.addEventListener("click",this.confirmarbaja) 
		confirmar_reactivar_registro.addEventListener("click",this.confirmareingreso)
    }
	obtener_datos(){
		$.ajax({
            url: base_url+'Credencializacion/Ctrl_Vehiculos/getById',
            type: 'GET',
            dataType: 'json',
            data : {
                id_vehiculo : id_vehiculo
            },
            success: function(response){
                if(response.status){
					noMotor.value = response.data.numero_motor
					noSerieVehiculo.value = response.data.numero_serie
                    noPlaca.value = response.data.numero_placa
                    anio.value = response.data.anio
					marcaVehiculo.value= response.data.marca
					modeloVehicuo.value= response.data.modelo
					tipoVehiculo.value=response.data.tipo_vehiculo
					tipoTarjetaCirculacion.value = response.data.tipo_tarjeta_circulacion
					aseguradora.value = response.data.aseguradora
					periodo.value = response.data.periodo
					color.value = response.data.color
                    tipoVehiculo.value = response.data.tipo_vehiculo                    
                    noTarjeta.value = response.data.numero_tarjeta_circulacion					
                    vigenciaTarjeta.value = response.data.vigencia_tarjeta_circulacion                                       
                    noPoliza.value = response.data.numero_poliza
					vigenciaPoliza.value = response.data.vigencia_poliza
                    periodoCobFechaInicio.value = response.data.fecha_inicio_cobertura
                    periodoCobFechaFin.value = response.data.fecha_fin_cobertura
					
					//estatusVehiculo.value = response.data.estatusvehiculo
					
					if(response.data.estatus_me==1){
                                $(".eliminar").show();
                                $(".reactivar").hide();
								$(".editar").show();
                            }
                            else{
                                $(".eliminar").hide();
                                $(".reactivar").show();
								$(".editar").hide();
                            }
                    
					
				}
			},complete: function(){ 
				
				 
				Consultar.prototype.obtener_tipos_documentos();
				 
            }
		});
	}
	obtener_imagenes(){
		$("#btnSubirFacturaVehiculo").hide();
		$("#foto1").hide();
		$("#foto2").hide();
        $.ajax({
			url: base_url+'Credencializacion/Ctrl_Vehiculos/getImg',
			type: 'GET',
            dataType: 'json',
            data : {
                id_vehiculo : id_vehiculo
            },
            beforeSend: function(){
                 
            },
			success: function(response){
				
				response.data.forEach(element => {
                    if(element.id_tipo_toma == 6){
						$("#btnSubirFacturaVehiculo").show();
                        $("#btnSubirFacturaVehiculo").attr("data-img",element.link+""+element.nombre);
						$("#noFacturaVeh").val(element.numero_identificacion);
						$("#tipodocumentoVeh").val(element.id_tipo_identificacion);
                    }
					if(element.id_tipo_toma == 7){
						$("#foto1").show();
                        $("#foto1").attr("data-img",element.link+""+element.nombre);
                    }
					if(element.id_tipo_toma == 8){
						$("#foto2").show();
                        $("#foto2").attr("data-img",element.link+""+element.nombre);
                    }
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
                $(tipodocumentoVeh).html('');
                $(tipodocumentoVeh).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    if(element.id == 3 || element.id == 4){
                        $(tipodocumentoVeh).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                    }
                });
			},complete: function(){
				Consultar.prototype.obtener_imagenes();
				}
		}).fail( function(response) {
			
		});
	}
    confirmarbaja(ev){
        const id_vehiculo = localStorage.getItem("id_vehiculo");
       
		$.ajax({
            url: base_url + 'Credencializacion/Ctrl_Vehiculos/delete',
            type: "POST",
            data: {
                id_vehiculo: id_vehiculo, 
                [csrf.name] : csrf.value
            },
            beforeSend:function(){
        
                $("#modal_confirmar_baja").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    registro_exitoso(data.message);
                    $(".eliminar").hide()
					$(".reactivar").show()
					$(".editar").hide()
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
	
	confirmareingreso(){
		const id_vehiculo = localStorage.getItem("id_vehiculo_me");
		  $.ajax({
        url: base_url + 'Credencializacion/Ctrl_Vehiculos/active',
        type: "POST",
        data: {
            id_vehiculo: id_vehiculo, 
            [csrf.name] : csrf.value
        },
        beforeSend: function(){
			
            $("#modal_confirmar_reactivar").modal("hide");
        },
        success: (data) => {
            csrf.value = data.token;
            if(data.status == true){
  				  $(".eliminar").show();
					$(".reactivar").hide();
					$(".editar").show();
                registro_exitoso(data.message);
                
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
	
     
}
const cons = new Consultar()

const eliminar = () => {
    pedir_confirmacion_eliminar();
}

$(".fotos").on('click', function(event){
    var img = $(this).attr("data-img");
	if (img != "")
		window.open("/"+img,"_blank");
});
function editar(){ 
	window.location.href= base_url + "Credencializacion/Ctrl_Vehiculos/modificar";
}
function reactivar(){ 
	pedir_confirmacion_reactivar();
}