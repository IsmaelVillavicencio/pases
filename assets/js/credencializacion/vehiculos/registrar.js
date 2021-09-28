let DTIdentidades; 
let DTImportar;
var dataExportar=[]
var dataRepuve=[]

var datosVehiculos = []
var fotoFactura = null
var fotoPlaca = null
var fotoLateral

let totaVehiculos=0;
let buscaVehiculos=0;
 
class Registrar{
    constructor(){ 
        this.inicio()
        this.obtener_tipos_vehiculos()
        this.obtener_tipos_tarjetas_circulacion()
        this.obtener_tipos_documentos()
        this.obtener_aseguradoras() 
        this.obtener_periodos()
    }
    inicio(){
        DTIdentidades = $(tabVehiculos).DataTable( {
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
			},
			"order": [[ 0, "asc" ],[3, 'asc']]
        });
		DTImportar = $(tabImportar).DataTable( {
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
			},
			"order": [[ 0, "asc" ],[3, 'asc']]
        });
		
        noPlaca.addEventListener('change',this.peticion_repuve)
        noSerieVehiculo.addEventListener('change',this.peticion_repuve)
        adjuntarVehiculoFactura.addEventListener("change",this.previsualizar_vehiculo_factura)
		
		anadirVehiculo.addEventListener("click",this.almacena);
		guardar.addEventListener('click',this.confirmar_almacenamiento)
		confirmar_guardar_exe.addEventListener('click',this.si_sube_excel)
		
		confirmar_guardar.addEventListener('click',this.realizar_almacenamiento);

        btnAceptarAdjuntarVehiculoFactura.addEventListener('click',(ev)=>{
            if(adjuntarVehiculoFactura.value != ""){
                document.getElementById('btnSubirFacturaVehiculo').value = 'Actualizar documento'
            }
            
        })
        btnsubirdocumento.addEventListener('click',(ev)=>{
            $(modealExcel).modal();
        });
		sisaveexcel.addEventListener('click',(ev)=>{
            $(modal_confirmar_guardar_exe).modal();
        });

        btnSubirFacturaVehiculo.addEventListener('click',(ev)=>{
			$("#pdfViewerVehiculoFactura").css("height","0px");
            $(modalVehiculoFactura).modal();
        })
		


        btnSubirVehiculo.addEventListener('click',(ev)=>{
			pdfViewerVehiculo.innerHTML = ''
			$("#pdfViewerVehiculo").css("height","0px");
            $(modalVehiculo).modal();
			$("#fotografiaLateral").show();
			$("#fotografiaPlaca").hide();
			$("#btnAceptarAdjuntarVechiculo").hide();
        })

        btnSiguienteAdjuntarVehiculo.addEventListener('click',(ev)=>{

            $(pdfViewerVehiculo).html("");
            $(fotografiaLateral).hide();
            $(fotografiaPlaca).removeAttr("style");
            $("#pdfViewerVehiculo").css("height","0px"); 
             
            
            
        })

    }

    obtener_tipos_vehiculos(){
        $.ajax({
			url: base_url_rest+'catalogos/tipovehiculo/estatus/1',
			type: 'GET',
            dataType: 'json',
            beforeSend: function(){
                $(tipoVehiculo).html('');
                $(tipoVehiculo).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(tipoVehiculo).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {
			
		});
    }
    obtener_tipos_tarjetas_circulacion(){
        $.ajax({
			url: base_url_rest+'catalogos/tipotarjetascirculacion/estatus/1',
			type: 'GET',
            dataType: 'json',
            beforeSend: function(){
                $(tipoTarjetaCirculacion).html('');
                $(tipoTarjetaCirculacion).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(tipoTarjetaCirculacion).append('<option value="'+element.id+'">'+element.nombre+'</option>');
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
			}
		}).fail( function(response) {
			
		});
    }
    obtener_aseguradoras(){
        $.ajax({
			url: base_url_rest+'catalogos/tipoaseguradora/estatus/1',
			type: 'GET',
            dataType: 'json',
            beforeSend: function(){
                $(aseguradorasVeh).html('');
                $(aseguradorasVeh).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(aseguradorasVeh).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {
			
		});
    }
    obtener_periodos(){
        $.ajax({
			url: base_url+'Catalogos/Ctrl_TiposPeriodo/getByEstatus',
			type: 'GET',
            dataType: 'json',
            data : {
                estatus : 1
            },
            beforeSend: function(){
                $(periodoPago).html('');
                $(periodoPago).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(periodoPago).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {
			
		});
    }


	
	peticion_repuve(ev){
		
		 var entrar = true;
		 
		 
		 $.ajax({
			url: base_url+'Credencializacion/Ctrl_Vehiculos/getVehiculo',
			type: 'GET',
            dataType: 'json',
            data : {
                noserie  : noSerieVehiculo.value,
                noplaca  : noPlaca.value
            },
			
			success: function(response){
				
				response.data.forEach(elem => {
					var capa = "errornoPlaca";
					if (elem.numero_serie == noSerieVehiculo.value &&  noSerieVehiculo.value != "") capa = "errornoSerieVehiculo";
					$("#"+capa).html("El registro ya existe");
					$("#"+capa).show();
					entrar = false;
					$(".reiniciar-vehiculo").attr("readonly",true);
					$("#noPlaca").attr("readonly",false);
					$("#noSerieVehiculo").attr("readonly",false);
					$("#anadirVehiculo").hide();
					
				});
				if (entrar== true){ 
						
				
					$(".reiniciar-vehiculo").attr("readonly",false);
					$("#anadirVehiculo").show();
					if(ev.target.value != ""){
								$.ajax({
									async: false,
									url: base_url+'Utilidades/Ctrl_Servicios/getDatosVehiculos',
									type: 'GET',
									dataType: 'json',
									global: false,
									data:{
										endpoint : "repuvenacional",
										noserie  : noSerieVehiculo.value,
										noplaca  : noPlaca.value
									}, 
									beforeSend: function(){
										adjuntarVehiculoFactura.dataset.imagen= ""
										adjuntarVehiculoFactura.dataset.id= ""
										//ajuntarLateralVehiculo.dataset.imagen= ""
										//ajuntarLateralVehiculo.dataset.id= ""
										//adjuntarPlacaVehiculo.dataset.imagen= ""
										//adjuntarPlacaVehiculo.dataset.id= ""

									},
									success: function(response){
										if(response.data != null){											
											noPlaca.value = response.data[0].placa
											noSerieVehiculo.value = response.data[0].serie
											marcaVehiculo.value = response.data[0].marca
											modeloVehicuo.value = response.data[0].submarca
											anio.value = response.data[0].modelo
											color.value = response.data[0].color

											noPlaca.setAttribute("class","lectura")
											noPlaca.setAttribute("disabled",true)
											noSerieVehiculo.setAttribute("class","lectura")
											noSerieVehiculo.setAttribute("disabled",true)

											$(errornoPlaca).html("")
											$(errornoSerieVehiculo).html("")

											if(response.data_interna != null){

												//idvehiculo.value = response.data_interna.id
												noMotor.value = response.data_interna.numero_motor
												tipoVehiculo.value = response.data_interna.id_tipo_vehiculo
												tipoTarjetaCirculacion.value = response.data_interna.id_tipo_tarjeta_circulacion
												noTarjeta.value = response.data_interna.numero_tarjeta_circulacion
												vigenciaTarjeta.value = response.data_interna.vigencia_tarjeta_circulacion
												tipodocumentoVeh.value = response.data_interna.id_tipo_documento
												noFacturaVeh.value = response.data_interna.numero_factura
												aseguradorasVeh.value = response.data_interna.id_tipo_aseguradora
												noPoliza.value = response.data_interna.numero_poliza
												vigenciaPoliza.value = response.data_interna.vigencia_poliza
												periodoPago.value = response.data_interna.id_tipo_periodo
												periodoCobFechaInicio.value = response.data_interna.fecha_inicio_cobertura
												periodoCobFechaFin.value = response.data_interna.fecha_fin_cobertura
												//estatusVehiculo.value = response.data_interna.estatusvehiculo

												$(errornoMotor).html("")
												$(errortipoVehiculo).html("")
												$(errortipoTarjetaCirculacion).html("")
												$(errornoTarjeta).html("")
												$(errortipodocumentoVeh).html("")
												$(erroraseguradorasVeh).html("")
												$(errornoPoliza).html("")
												$(errorperiodoPago).html("")
												$(errorperiodoCobFechaInicio).html("")
												$(errorperiodoCobFechaFin).html("")
												//$(errorestatusVehiculo).html("")

												adjuntarVehiculoFactura.dataset.id = (response.data_interna.id_fotografia_factura != null) ? response.data_interna.id_fotografia_factura : ""
												adjuntarVehiculoFactura.dataset.imagen = response.data_interna.fotografia_factura
												btnSubirFacturaVehiculo.value = "Actualizar documento"
												$(errorSubirFacturaVehiculo).html("")

												ajuntarLateralVehiculo.dataset.id = (response.data_interna.id_fotografia_lateral != null) ? response.data_interna.id_fotografia_lateral : ""
												ajuntarLateralVehiculo.dataset.imagen = response.data_interna.fotografia_lateral
												adjuntarPlacaVehiculo.dataset.id = (response.data_interna.id_fotografia_placa != null) ? response.data_interna.id_fotografia_placa : ""
												adjuntarPlacaVehiculo.dataset.imagen = response.data_interna.fotografia_placa
												btnSubirVehiculo.value = "Actualizar foto"
												$(errorSubirFotoVehiculo).html("")

											}
										}else{
											if (noPlaca.value == "" || noSerieVehiculo.value =="")
												registro_exitoso("No se encontró registro del vehículo ");
										}
									}
								}).fail(function(response){
									if(response.responseText=="Sesion"){
										error_sesion();
									}
								})
							}
						
		
				}
				
			}
		}).fail( function(response) {
			
		});
		
	}
	almacena(){
		$(".error").html("");
		var valida = true;
		var sec= this.validaciones = new VALIDACIONES();
		$(".req").each(function(){		
			$("#error"+this.id).html("");
			if (this.value.trim() == ""){
				$("#error"+this.id).show();
				$("#error"+this.id).html(" Campo obligatorio");
				valida = false;
			}
		});
		 
		$(".alfa").each(function(){		
		
			if (this.value != ""){
				var res = valida_num_letras(this.value,0);
				var respu = res.resp ;
				if (respu ==true) {var foo = this.value.split(" ");  if (typeof foo[1] !== 'undefined') {respu =false;}}
						if (respu == false){ 
							$("#error"+this.id).show();$("#error"+this.id).html("Información no válida");
							valida = false;
						}
			}
		});
		
		if(archFact.value == ""){
            $(errorSubirFacturaVehiculo).html("Campo obligatorio")
            valida = false
        }
        if(archPla.value == "" || archLate.value == "" ){
            $(errorSubirFotoVehiculo).html("Campo obligatorio")
            valida = false
        } 
		
		var d = new Date();
		var fecha = new Date(d.getFullYear(),d.getMonth(),d.getDate());
		
		//// Poliza 
		var temp = $("#vigenciaPoliza").val().split("-"); 
		var pol = new Date(parseInt(temp[0],10),parseInt(temp[1],10)-1,parseInt(temp[2],10)); 		
		var resultado = fecha.getTime() <= pol.getTime();		
		if (resultado == false && $("#vigenciaPoliza").val() != ""){ valida == false ; $("#errorvigenciaPoliza").html("Información  no válida");}
		
		//// vigenciaTarjeta 
		var temp = $("#vigenciaTarjeta").val().split("-"); 
		var pol = new Date(parseInt(temp[0],10),parseInt(temp[1],10)-1,parseInt(temp[2],10)); 		
		var resultado = fecha.getTime() <= pol.getTime();		
		if (resultado == false && $("#vigenciaTarjeta").val() != ""){ valida == false ; $("#errorvigenciaTarjeta").html("Información  no válida");}
		
		//// periodoCobFechaFin 
		var temp = $("#periodoCobFechaFin").val().split("-"); 
		var pol = new Date(parseInt(temp[0],10),parseInt(temp[1],10)-1,parseInt(temp[2],10)); 		
		var resultado = fecha.getTime() <= pol.getTime();		
		if (resultado == false && $("#periodoCobFechaFin").val() != ""){ valida == false ; $("#errorperiodoCobFechaFin").html("Información  no válida");}
		
		//// periodoCobFechaInicio 
		var temp = $("#periodoCobFechaInicio").val().split("-"); 
		var pol = new Date(parseInt(temp[0],10),parseInt(temp[1],10)-1,parseInt(temp[2],10)); 		
		var resultado = fecha.getTime() >= pol.getTime();		
		if (resultado == false && $("#vigenciaPoliza").val() != ""){ valida == false ; $("#errorperiodoCobFechaInicio").html("Información  no válida");}
		
	 
		
		if (valida == true){
				 let datos = {
					
					noPlaca                 : noPlaca.value,
					noSerie                 : noSerieVehiculo.value,
					noMotor                 : noMotor.value,
					marca                   : marcaVehiculo.value,
					modelo                  : modeloVehicuo.value,
					anio                    : anio.value, 
					color                   : color.value,
					tipoVehiculo            : tipoVehiculo.value,
					tipoTarCircu            : tipoTarjetaCirculacion.value,
					noTarjeta               : noTarjeta.value,
					vigenciaTarjeta         : vigenciaTarjeta.value,
					tipoDocumento           : tipodocumentoVeh.value,
					noFactura               : noFacturaVeh.value,					
					aseguradora             : aseguradorasVeh.value,
					noPoliza                : noPoliza.value,
					vigenciaPoliza          : vigenciaPoliza.value, 
					periodoPago             : periodoPago.value,
					periodoFechaInicio      : periodoCobFechaInicio.value,
					periodoFechaFin         : periodoCobFechaFin.value,
					estatusVehiculo         : "",
					imgLateral       		: $("#archLate").val(),
					imgPlaca         		: $("#archPla").val(),
					imgFactura              : $("#archFact").val(),
				}
				
				var sientra = true ;
				datosVehiculos.forEach(function(res){
					if (res.noPlaca == datos.noPlaca && res.noSerie == datos.noSerie) sientra =false;
					 
				});
				
				if (sientra == true){
					$(".errorVehiculoDuplicado").html("");
					 datosVehiculos.push(datos);
					 
					 DTIdentidades.row.add([
						'<center>'+datos.noPlaca+'</center>',
						'<center>'+datos.noSerie+'</center>',
						'<center>'+datos.marca+'</center>',
						'<center>'+datos.anio+'</center>',
						'<center>'+tipoVehiculo.options[tipoVehiculo.selectedIndex].text+'</center>',
						'<div class="d-flex justify-content-center" >'+
							'<div class="p-1">'+
								'<a href="#!" title="Modificar">'+
									'<span class="glyphicon glyphicon-pencil editar" data-id="'+(datosVehiculos.length-1)+'" alt="Editar">'+'</span>'+
								'</a>'+
						  '</div>'+		
							'<div class="p-1">'+
								'<a href="#!" title="Eliminar">'+
									'<span class="glyphicon glyphicon-trash eliminar" data-id="'+(datosVehiculos.length-1)+'" alt="Papelera">'+'</span>'+
								'</a>'+
						  '</div>'+
						'</div>'		
					]).draw(false);
					$("#noSerieVehiculo").attr("disabled",false);
					$("#noSerieVehiculo").addClass("form-control reiniciar-vehiculo alfa req");
					$("#noSerieVehiculo").removeClass("lectura");
					$("#noPlaca").attr("disabled",false);
					$("#noPlaca").addClass("form-control reiniciar-vehiculo alfa req");
					$("#noPlaca").removeClass("lectura");
					
					
					$(btnSiguienteAdjuntarVehiculo).hide();
					
					$("#fotografiaLateral").show();
					$("#fotografiaPlaca").hide();
					$("#btnAceptarAdjuntarVechiculo").hide();
					$(".req").val("");
					$(".reiniciar-vehiculo").val("");
					$("#archFact").val(""); $("#archLate").val(""); $("#archPla").val("");$(".fotos").html("");
					document.getElementById('btnSubirFacturaVehiculo').value = 'Subir documento'
					document.getElementById('btnSubirVehiculo').value = 'Subir archivo'
					fotoFactura =null
					fotoLateral= null
					fotoPlaca = null 
				}else {
					$(".errorVehiculoDuplicado").html("Existe un registro en la lista");
				}
		
		}			
		
	}
	confirmar_almacenamiento(){
         var total = datosVehiculos.length;
		 if (total > 0)
            pedir_confirmacion_guardar();
		else {
			peticion_fallida("Debe haber al menos un vehículo  en el listado para poder guardar el registro");
		}
        
}
	si_sube_excel(){
		let formData = new FormData();
		var valor = $("#archexporta").val();
		formData.append("archivo",valor); 
		
        for (let index = 0; index < dataRepuve.length; index++) {
			
            formData.append("placa["+index+"]",dataRepuve[index].placa)
			formData.append("serie["+index+"]",dataRepuve[index].serie)
			formData.append("modelo["+index+"]",dataRepuve[index].modelo)
			formData.append("anio["+index+"]",dataRepuve[index].anio)
			formData.append("color["+index+"]",dataRepuve[index].color)
			formData.append("marca["+index+"]",dataRepuve[index].marca)
		}
		 
					
		if (valor != ""){
		$("#confirmar_guardar_exe").attr("disabled","true");
			 $.ajax({
				url : base_url+'Credencializacion/Ctrl_Vehiculos/siImporta',
				type : 'POST',
				data : formData,
				global: false,
				processData: false,
				contentType: false,
				success : function(response) {
					
					$("#confirmar_guardar_exe").attr("disabled",false);
					csrf.value = response.token;
					if(response.status){
						Registrar.prototype.reiniciar_campos()
						registro_exitoso(response.message);
						spinner.style.visibility="hidden";
						datosVehiculos = [] 
					}else{
						peticion_fallida(response.message);
						spinner.style.visibility="hidden";
						$("#archexporta").val("");
						
					}
					$("#confirmar_guardar").attr("disabled","false");
					$("#modal_confirmar_guardar_exe").modal("hide");
					Registrar.prototype.reiniciar_campos()
				},
				error: (xhr, ajaxOptions, thrownError) =>{
					$("#confirmar_guardar_exe").attr("disabled",false);
					spinner.style.visibility="hidden";
					peticion_fallida(thrownError);
					csrf.value = xhr.responseJSON.token; 
					$("#modal_confirmar_guardar_exe").modal("hide");
				}
			}).fail(function(response){
				spinner.style.visibility="hidden";
				
				if(response.responseText=="Sesion"){
					error_sesion();
				}
			})
		}
	}
	realizar_almacenamiento(){
		let formData = new FormData();
		
        for (let index = 0; index < datosVehiculos.length; index++) {
			
            formData.append("noPlaca["+index+"]",datosVehiculos[index].noPlaca)
            formData.append("noSerie["+index+"]",datosVehiculos[index].noSerie)
            formData.append("noMotor["+index+"]",datosVehiculos[index].noMotor)
            formData.append("marca["+index+"]",datosVehiculos[index].marca)
            formData.append("modelo["+index+"]",datosVehiculos[index].modelo)
            formData.append("anio["+index+"]",datosVehiculos[index].anio)
            formData.append("color["+index+"]",datosVehiculos[index].color)
            formData.append("tipoVehiculo["+index+"]",datosVehiculos[index].tipoVehiculo)
            formData.append("tipoTarCircu["+index+"]",datosVehiculos[index].tipoTarCircu)
            formData.append("noTarjeta["+index+"]",datosVehiculos[index].noTarjeta)
            formData.append("vigenciaTarjete["+index+"]",datosVehiculos[index].vigenciaTarjeta)
            formData.append("tipoDocumento["+index+"]",datosVehiculos[index].tipoDocumento)
            formData.append("noFactura["+index+"]",datosVehiculos[index].noFactura)
            formData.append("aseguradora["+index+"]",datosVehiculos[index].aseguradora)  
            formData.append("noPoliza["+index+"]",datosVehiculos[index].noPoliza)
            formData.append("vigenciaPoliza["+index+"]",datosVehiculos[index].vigenciaPoliza)
            formData.append("periodoPago["+index+"]",datosVehiculos[index].periodoPago)
            formData.append("periodoFechaInicio["+index+"]",datosVehiculos[index].periodoFechaInicio)
            formData.append("periodoFechaFin["+index+"]",datosVehiculos[index].periodoFechaFin)
            formData.append("estatusVehiculo["+index+"]",datosVehiculos[index].estatusVehiculo)
			
            formData.append("imgFactura["+index+"]",datosVehiculos[index].imgFactura);            		
            formData.append("imgLateral["+index+"]",datosVehiculos[index].imgLateral);            
            formData.append("imgPlaca["+index+"]",datosVehiculos[index].imgPlaca);
            
			
            formData.append([csrf.name], csrf.value); 
			 
					
		}
			$("#confirmar_guardar").attr("disabled","true");
			 $.ajax({
				url : base_url+'Credencializacion/Ctrl_Vehiculos/addVehiculos',
				type : 'POST',
				data : formData,
				global: false,
				processData: false,
				contentType: false,
				success : function(response) {
					csrf.value = response.token;
					if(response.status){
						Registrar.prototype.reiniciar_campos()
						registro_exitoso(response.message);
						spinner.style.visibility="hidden";
					}else{
						peticion_fallida(response.message);
						spinner.style.visibility="hidden";
					}
					$("#confirmar_guardar").attr("disabled","false");
					$("#modal_confirmar_guardar").modal("hide");
				},
				error: (xhr, ajaxOptions, thrownError) =>{
					spinner.style.visibility="hidden";
					peticion_fallida(thrownError);
					csrf.value = xhr.responseJSON.token;
					$("#confirmar_guardar").attr("disabled","false");
					$("#modal_confirmar_guardar").modal("hide");
				}
			}).fail(function(response){
				spinner.style.visibility="hidden";
				
				if(response.responseText=="Sesion"){
					error_sesion();
				}
			})
		
		
        
	}
	
    previsualizar_vehiculo_factura(){
		
       /* var fileReader = new FileReader();
        pdfViewerVehiculoFactura.innerHTML = ''
        erroradjuntarVehiculoFactura.innerHTML = ''

        var extencion = $(this)[0].files[0].name;
        if(extencion != ''){
            extencion = extencion.split(".");
            extencion = extencion[extencion.length-1];
        }

        var permitidos = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];
        if(!permitidos.includes($(this)[0].files[0].type) || extencion == 'jfif'){
            erroradjuntarVehiculoFactura.innerHTML = "El archivo a subir debe ser un documento en PDF o imagen PNG o JPG"
            return false;
        }

        if(($(this)[0].files[0].size/1000000) > 3){
            erroradjuntarVehiculoFactura.innerHTML = "El tamaño máximo permitido es de 3 MB"
            return false;
        }

        fileReader.onload = function() {
            var TheFileContents = fileReader.result;    
            $(pdfViewerVehiculoFactura).html('<img width="460" height="200" src="'+TheFileContents+'"/>');
        };
        fileReader.readAsDataURL($(this)[0].files[0]);

        btnAceptarAdjuntarVehiculoFactura.onclick = function() {
            if(fileReader != ""){
                $(errorSubirFacturaVehiculo).html("")
            }
        }*/
    }
    previsualizar_vehiculo(ev){
       /* var fileReader = new FileReader();
        pdfViewerVehiculo.innerHTML = ''
        errorFotografiasVehiculos.innerHTML = ''

        var extencion = $(this)[0].files[0].name;
        if(extencion != ''){
            extencion = extencion.split(".");
            extencion = extencion[extencion.length-1];
        }

        var permitidos = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];
        if(!permitidos.includes($(this)[0].files[0].type) || extencion == 'jfif'){
            errorFotografiasVehiculos.innerHTML = "El archivo a subir debe ser un documento en PDF o imagen PNG o JPG";
            return false;
        }

        if(($(this)[0].files[0].size/1000000) > 2){
            errorFotografiasVehiculos.innerHTML = "El tamaño máximo permitido es de 2 MB";
            return false;
        }

        fileReader.onload = function() {
            var TheFileContents = fileReader.result;    
            $(pdfViewerVehiculo).html('<img width="460" height="200" src="'+TheFileContents+'"/>');
        };
        fileReader.readAsDataURL($(this)[0].files[0]);

        if(ev.target.id == "adjuntarPlacaVehiculo"){
            $(btnSiguienteAdjuntarVehiculo).hide();
            $(btnAceptarAdjuntarVechiculo).show();
        }else{
            $(btnSiguienteAdjuntarVehiculo).show();
        }

        btnAceptarAdjuntarVechiculo.onclick = function() {
            console.log(fileReader)
            if(fileReader != ""){
                $(errorSubirFotoVehiculo).html("")
            }
        }*/
    }
	limpia(){
		$(".req").val("");
		$(".reiniciar-vehiculo").val("");
	}
	reiniciar_campos(){
        datosVehiculos = []     
        DTIdentidades.clear().draw()  
		DTImportar.clear().draw();
		$("#capaImportar").addClass("hide");
		$("#textosube").removeClass("hide");
		$("#btnsubirdocumento").show();
		$("#archexporta").val("");
		$(".req").val("");
        $(".reiniciar-vehiculo").val("");
		$("#errorImportar").html("");
		document.getElementById('btnSubirFacturaVehiculo').value = 'Subir documento'
		document.getElementById('btnSubirVehiculo').value = 'Subir archivo'


    }
	
	previsualizar(fotoFacturaEquipo){
        var fileReader = new FileReader();
        pdfViewerVehiculoFactura.innerHTML = ''
        erroradjuntarVehiculoFactura.innerHTML = ''
        fileReader.onload = function() {
            var TheFileContents = fileReader.result;    
            $(pdfViewerVehiculoFactura).html('<img width="460" height="200" src="'+TheFileContents+'"/>');
            adjuntarVehiculoFactura.dataset.imagen = TheFileContents
        };
        fileReader.readAsDataURL(fotoFacturaEquipo);        
    }
	previsualizarLat(fotoFacturaEquipo){
        var fileReader = new FileReader();
        pdfViewerVehiculo.innerHTML = ''
        errorFotografiasVehiculos.innerHTML = ''
        fileReader.onload = function() {
            var TheFileContents = fileReader.result;    
            $(pdfViewerVehiculoFactura).html('<img width="460" height="200" src="'+TheFileContents+'"/>');
            ajuntarLateralVehiculo.dataset.imagen = TheFileContents
        };
        fileReader.readAsDataURL(fotoFacturaEquipo);        
    }
	previsualizarPla(fotoFacturaEquipo){
        var fileReader = new FileReader();
        pdfViewerVehiculoFactura.innerHTML = ''
        errorFotografiasVehiculos.innerHTML = ''
        fileReader.onload = function() {
            var TheFileContents = fileReader.result;    
            adjuntarPlacaVehiculo.dataset.imagen = TheFileContents
        };
        fileReader.readAsDataURL(fotoFacturaEquipo);        
    }
	
	previsualizar_archivo(files,capa){
		
		var num = (files.length)-1;
		
        var fileReader = new FileReader();
        var file = files[num].getNative();
        $("#pdfViewer"+capa).html('<div></div>');
        fileReader.onload = () => {
            var TheFileContents = fileReader.result;
            if (file.type == 'application/pdf') {
                $("#pdfViewer"+capa).css({"overflow":"", "height":"", "overflow-y":""});
                $("#pdfViewer"+capa).html('<object> <embed src="'+TheFileContents+'" width="100%" height="300px"/></object>');
            } else {
                $("#pdfViewer"+capa).css({"overflow":"hidden", "height":"300px", "overflow-y":"scroll"});
                $("#pdfViewer"+capa).html('<div class="img-zoom-container"><img id="myimage" width="100%" src="' + TheFileContents + '"/>');

                myimage.onload = function(){
                    imageZoom(this.width,this.height);
                }
            }
        };
        fileReader.readAsDataURL(file);
    }
	
}
const reg = new Registrar();

$(".fotos").on('click', function(event){
    var img = $(this).attr("data-img");
	if (img != "")
		window.open("/"+img,"_blank");
});


var sec= this.validaciones = new VALIDACIONES();
$(".alfa").change(function() {
	$("#error"+this.id).html("");
	if (this.value != ""){		
		var res = valida_num_letras(this.value,0);
		var respu = res.resp ;
		if (respu ==true) {var foo = this.value.split(" ");  if (typeof foo[1] !== 'undefined') {respu =false;}}
				if (respu == false){
					$("#error"+this.id).show();$("#error"+this.id).html(" Información no válida");
				}
	}
});

function validaPer(){
	var fec1 = $("#periodoCobFechaInicio").val();
	var fec2 = $("#periodoCobFechaFin").val();
	if (fec1 != "" && fec2 !=""){		
		if (fec1> fec2) return false ;
		else 	return true;
	}return null;
}

$(tabVehiculos).on('click', '.eliminar', function(ev){
    datosVehiculos.splice(ev.target.dataset.id, 1); 
	
    DTIdentidades.row($(this).parents('tr')).remove().draw();
  
});

$(tabVehiculos).on('click', '.editar', function(ev){
		
		anio.value                   = datosVehiculos[ev.target.dataset.id].anio
		aseguradorasVeh.value        = datosVehiculos[ev.target.dataset.id].aseguradora
		color.value                  = datosVehiculos[ev.target.dataset.id].color
		//estatusVehiculo.value        = datosVehiculos[ev.target.dataset.id].estatusVehiculo
		marcaVehiculo.value          = datosVehiculos[ev.target.dataset.id].marca
		modeloVehicuo.value          = datosVehiculos[ev.target.dataset.id].modelo
		noFacturaVeh.value           = datosVehiculos[ev.target.dataset.id].noFactura
		noMotor.value                = datosVehiculos[ev.target.dataset.id].noMotor
		noPlaca.value                = datosVehiculos[ev.target.dataset.id].noPlaca
		noPoliza.value               = datosVehiculos[ev.target.dataset.id].noPoliza
		noSerieVehiculo.value        = datosVehiculos[ev.target.dataset.id].noSerie
		noTarjeta.value              = datosVehiculos[ev.target.dataset.id].noTarjeta
		periodoCobFechaFin.value     = datosVehiculos[ev.target.dataset.id].periodoFechaFin
		periodoCobFechaInicio.value  = datosVehiculos[ev.target.dataset.id].periodoFechaInicio
		periodoPago.value            = datosVehiculos[ev.target.dataset.id].periodoPago
		tipodocumentoVeh.value       = datosVehiculos[ev.target.dataset.id].tipoDocumento
		tipoTarjetaCirculacion.value = datosVehiculos[ev.target.dataset.id].tipoTarCircu
		tipoVehiculo.value           = datosVehiculos[ev.target.dataset.id].tipoVehiculo
		vigenciaPoliza.value         = datosVehiculos[ev.target.dataset.id].vigenciaPoliza
		vigenciaTarjeta.value        = datosVehiculos[ev.target.dataset.id].vigenciaTarjeta									
		
		archFact.value =   datosVehiculos[ev.target.dataset.id].imgFactura 
		archLate.value =   datosVehiculos[ev.target.dataset.id].imgLateral 
		archPla.value  =   datosVehiculos[ev.target.dataset.id].imgPlaca 
		
		
		$("#Visuzaliarfactura").attr("data-img","assets/uploads/credencializacion/vehiculos/"+archFact.value); Visuzaliarfactura.classList.remove("disabled");
        $("#Visuzaliarfactura").html(' <i class="glyphicon glyphicon-paperclip"></i> Visualizar factura');
		
		$("#Visuzaliarveh1").attr("data-img","assets/uploads/credencializacion/vehiculos/"+archLate.value); Visuzaliarveh1.classList.remove("disabled");
        $("#Visuzaliarveh1").html('<i class="glyphicon glyphicon-paperclip"></i> Archivo 1');
		
		$("#Visuzaliarveh2").attr("data-img","assets/uploads/credencializacion/vehiculos/"+archPla.value); Visuzaliarveh2.classList.remove("disabled");
        $("#Visuzaliarveh2").html('<i class="glyphicon glyphicon-paperclip"></i> Archivo 2');
			
			
		btnSubirFacturaVehiculo.value    = "Actualizar documento"	
		btnSubirVehiculo.value    = "Actualizar documento"	
		
		datosVehiculos.splice(ev.target.dataset.id, 1); 
		DTIdentidades.row($(this).parents('tr')).remove().draw();
    
});



var upLate = new plupload.Uploader({
    browse_button: 'adjuntarVehiculoLate', // this can be an id of a DOM element or the DOM element itself
    url: base_url+'upload/uploadVehiculos',
    chunk_size: '1mb',
    max_file_count: 1,
    multi_selection: false,
    unique_names: true,
    multipart_params: {
        [csrf.name] : csrf.value
    },
    //ADD FILE FILTERS HERE
    filters: {
        max_file_size : '20mb',
        mime_types: [
            { title: "JPG Archivos", extensions: "jpg" },            { title: "JPEG Archivos", extensions: "jpeg" },            { title: "PNG Archivos", extensions: "png" },            { title: "PDF Archivos", extensions: "pdf" },
        ]

    },
    init: {
        PostInit: function () {
            document.getElementById('btnAceptarAdjuntarVechiculo').onclick = function () {
                upLate.start();
                return false;
            }
        },
        Error: function(up, err) {
            if(err.code == -600)
                $(erroradjuntarContrato).html("El maximo tamaño de archivo es de 20mb")
        },
        Browse: function (up) {
            // Called when file picker is clicked
            if (up.files.length > 0)
                up.removeFile(up.files[0]); // Delete the last selection if it exists
        },
        FilesAdded: function (up, files) {
            reg.previsualizar_archivo(up.files,"Vehiculo");
			$(btnSiguienteAdjuntarVehiculo).show();
			
        },
        UploadProgress: function (up, file) {
            // Called while file is being uploaded
            divVisuzaliarvehiculo.style.display = ""
            var span = document.getElementById('Visuzaliarveh1');
            span.innerHTML = '<span> Cargando archivo: ' + file.percent + '%</span>';
            Visuzaliarveh1.classList.add("disabled");
        },
        BeforeUpload: function (up, file) {
            // Called right before the upload for a given file starts, can be used to cancel it if required
            $(modalVehiculo).modal('toggle');
			        },
        FileUploaded: function (up, file, info) {
					info = JSON.parse(info.response)
					csrf.value = info.token;
					upFact.settings.multipart_params[csrf.name] = info.token;
                     var span = document.getElementById('Visuzaliarveh1');
					$(btnSiguienteAdjuntarVehiculo).show();
                    divVisuzaliarvehiculo.style.display = ""					
                    $("#Visuzaliarveh1").attr("data-img","assets/uploads/credencializacion/vehiculos/"+file.target_name) 
                    Visuzaliarveh1	.classList.remove("disabled");
                    span.innerHTML = 'Archivo 1 &nbsp; ';
					$("#archLate").val(file.target_name);
					
					$("#errorSubirFotoVehiculo").html("");
                 
			
        },
    }
});

var upPla = new plupload.Uploader({
    browse_button: 'adjuntarVehiculoPla', // this can be an id of a DOM element or the DOM element itself
    url: base_url+'upload/uploadVehiculos',
    chunk_size: '1mb',
    max_file_count: 1,
    multi_selection: false,
    unique_names: true,
    multipart_params: {
        [csrf.name] : csrf.value
    },
    //ADD FILE FILTERS HERE
    filters: {
        max_file_size : '20mb',
        mime_types: [
            { title: "JPG Archivos", extensions: "jpg" },            { title: "JPEG Archivos", extensions: "jpeg" },            { title: "PNG Archivos", extensions: "png" },            { title: "PDF Archivos", extensions: "pdf" },
        ]

    },
    init: {
        PostInit: function () {
            
				$( "#btnAceptarAdjuntarVechiculo" ).click(function() {

                upPla.start();
                return false;
            });
        },
        Error: function(up, err) {
            if(err.code == -600)
                $(erroradjuntarContrato).html("El maximo tamaño de archivo es de 20mb")
        },
        Browse: function (up) {
            // Called when file picker is clicked
            if (up.files.length > 0)
                up.removeFile(up.files[0]); // Delete the last selection if it exists
        },
        FilesAdded: function (up, files) {
            reg.previsualizar_archivo(up.files,"Vehiculo");
			$(btnSiguienteAdjuntarVehiculo).hide();
			$(btnAceptarAdjuntarVechiculo).show();
        },
        UploadProgress: function (up, file) {
            // Called while file is being uploaded
            divVisuzaliarvehiculo.style.display = ""
            var span = document.getElementById('Visuzaliarveh2');
            span.innerHTML = '<span> Cargando archivo: ' + file.percent + '%</span>';
            Visuzaliarveh2.classList.add("disabled");
        },
        BeforeUpload: function (up, file) {
            // Called right before the upload for a given file starts, can be used to cancel it if required
            //$(modalVehiculoFactura).modal('toggle');
			        },
        FileUploaded: function (up, file, info) {
            info = JSON.parse(info.response)
            csrf.value = info.token;
            upFact.settings.multipart_params[csrf.name] = info.token;                   
            var span = document.getElementById('Visuzaliarveh2');

			divVisuzaliarvehiculo.style.display = ""					
			$("#Visuzaliarveh2").attr("data-img","assets/uploads/credencializacion/vehiculos/"+file.target_name) 
			Visuzaliarveh2	.classList.remove("disabled");
			span.innerHTML = ' Archivo 2 ';
			$("#archPla").val(file.target_name);
			$("#errorSubirFotoVehiculo").html("");
        },
    }
});



var upFact = new plupload.Uploader({
    browse_button: 'adjuntarVehiculoFactura', // this can be an id of a DOM element or the DOM element itself
    url: base_url+'upload/uploadVehiculos',
    chunk_size: '1mb',
    max_file_count: 1,
    multi_selection: false,
    unique_names: true,
    multipart_params: {
        [csrf.name] : csrf.value
    },
    //ADD FILE FILTERS HERE
    filters: {
        max_file_size : '20mb',
        mime_types: [
            { title: "JPG Archivos", extensions: "jpg" },            { title: "JPEG Archivos", extensions: "jpeg" },            { title: "PNG Archivos", extensions: "png" },            { title: "PDF Archivos", extensions: "pdf" },
        ]
    },
    init: {
        PostInit: function () {
            document.getElementById('btnAceptarAdjuntarVehiculoFactura').onclick = function () {
                upFact.start();
                return false;
            }
        },
        Error: function(up, err) {
            if(err.code == -600)
                $(erroradjuntarContrato).html("El maximo tamaño de archivo es de 20mb")
        },
        Browse: function (up) {
			
            if (up.files.length > 0)
                up.removeFile(up.files[0]); // Delete the last selection if it exists
        },
        FilesAdded: function (up, files) {
      		
            reg.previsualizar_archivo(up.files,"VehiculoFactura");
        },
        UploadProgress: function (up, file) {
            // Called while file is being uploaded
            divVisuzaliarfactura.style.display = ""
            var span = document.getElementById('Visuzaliarfactura');
            span.innerHTML = '<span> Cargando archivo: ' + file.percent + '%</span>';
            Visuzaliarfactura.classList.add("disabled");
        },
        BeforeUpload: function (up, file) {
            
            $(modalVehiculoFactura).modal('toggle');
        },
        FileUploaded: function (up, file, info) {
            info = JSON.parse(info.response)
            csrf.value = info.token;
            upFact.settings.multipart_params[csrf.name] = info.token;
			$("#archFact").val(file.target_name);
            var span = document.getElementById('Visuzaliarfactura');
			divVisuzaliarfactura.style.display = ""					
            $("#Visuzaliarfactura").attr("data-img","assets/uploads/credencializacion/vehiculos/"+file.target_name) 
            Visuzaliarfactura.classList.remove("disabled");
            span.innerHTML = ' <i class="glyphicon glyphicon-paperclip"></i> Visualizar factura';
			$("#errorSubirFacturaVehiculo").html("");

           
		   
			
        },
    }
});

upFact.init();
upLate.init();
upPla.init();


function imageZoom(sizex, sizey) {
    var img, lens, result, cx, cy;
    img = document.getElementById("myimage");
    /*create lens:*/
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    /*insert lens:*/
    img.parentElement.insertBefore(lens, img);
    /*calculate the ratio between result DIV and lens:*/
    cx = lens.offsetWidth/60;
    cy = lens.offsetHeight/60;
    /*set background properties for the result DIV:*/
    lens.style.backgroundImage = "url('" + img.src + "')";
    lens.style.backgroundSize = sizex * cx + "px " + sizey * cy + "px";
    /*execute a function when someone moves the cursor over the image, or the lens:*/
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /*and also for touch screens:*/
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
    function moveLens(e) {
        var pos, x, y;
        /*prevent any other actions that may occur when moving over the image:*/
        e.preventDefault();
        /*get the cursor's x and y positions:*/
        pos = getCursorPos(e);
        /*calculate the position of the lens:*/
        x = pos.x - lens.offsetWidth / 2;
        y = pos.y - lens.offsetHeight / 2;
        /*prevent the lens from being positioned outside the image:*/
        if (x > img.width - lens.offsetWidth) {
            x = img.width - lens.offsetWidth;
        }
        if (x < 0) {
            x = 0;
        }
        if (y > img.height - lens.offsetHeight) {
            y = img.height - lens.offsetHeight;
        }
        if (y < 0) {
            y = 0;
        }
        /*set the position of the lens:*/
        lens.style.left = x + "px";
        lens.style.top = y + "px";
        /*display what the lens "sees":*/
        lens.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
    }
    function getCursorPos(e) {
        var a,
            x = 0,
            y = 0;
        e = e || window.event;
        /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }
}
$("input[type=radio][name=capturar]").change(function() {
	var valor= $(this).val();	
	if (valor == "excel"){		
		$("#upmanual").addClass("hide");
		$("#upexcel").removeClass("hide");
	}else{
		$("#upexcel").addClass("hide");
		$("#upmanual").removeClass("hide");
	}
});

var upExcel = new plupload.Uploader({
    browse_button: 'adjuntarExcel', // this can be an id of a DOM element or the DOM element itself
    url: base_url+'upload/uploadVehiculos',
    chunk_size: '1mb',
    max_file_count: 1,
    multi_selection: false,
    unique_names: true,
    multipart_params: {  [csrf.name] : csrf.value },
    filters: {max_file_size : '20mb',  mime_types: [ { title: "XLS Archivos", extensions: "xls" },            { title: "XLSX Archivos", extensions: "xlsx" } ] },
    init: {
        PostInit: function () {
            document.getElementById('btnProcesaExcel').onclick = function () {
                upExcel.start();
                return false;
            }
        },
        Error: function(up, err) {
            if(err.code == -600)
                $(erroradjuntarExcel).html("El maximo tamaño de archivo es de 20mb")
        },
        Browse: function (up) {			
            if (up.files.length > 0)
                up.removeFile(up.files[0]); // Delete the last selection if it exists
        },
        FilesAdded: function (up, files) {      		
        },
        UploadProgress: function (up, file) {
            // Called while file is being uploaded
            divVisuzaliarfactura.style.display = ""
            var span = document.getElementById('procesaexcel');
            span.innerHTML = '<a href="#!"> Cargando archivo: ' + file.percent + '%</a>';
			$("#btnsubirdocumento").hide();
            
        },
        BeforeUpload: function (up, file) {
            
        },
        FileUploaded: function (up, file, info) {
           $("#procesaexcel").html("<a href='#!'>Validando archivo, espere.... </a>");
		   
		   let formData = new FormData();
			formData.append("archivo",file.target_name)
			$("#archexporta").val("");
			$("#si_manda").addClass("hide");
		   buscaVehiculos =0;
		   totaVehiculos =0;
		   $.ajax({
                url : base_url+'Credencializacion/Ctrl_Vehiculos/importar',
                type : 'POST',
                data : formData,
                global: false,
                processData: false,
                contentType: false,
                success : function(response) {
                    csrf.value = response.token;
					$("#procesaexcel").html("");
					$("#textosube").addClass("hide");
					$("#btnImportar").addClass("hide");
					
                  	if (response.errores != ""){
						var mas = "<br> <input type='button' class='btn btn-default' value='Subir otro archivo' onclick='Registrar.prototype.reiniciar_campos();'>";
						$("#errorImportar").html("<div class='error'>Los siguienes campos tienen errores de captura: </div><br>"+response.errores+""+mas);
						$("#capaImportar").addClass("hide");
					}else{		
						var busca={};
						$.each( response.tabla, function( index, exe ) {
							var sep= (exe[0].trim()).split(" "); var placa = sep[0];
							var sep= (exe[1].trim()).split(" "); var serie = sep[0];
							var error= exe[14];
							var txt = '<span class="errorvehi" style="color:red">Información invalida</span>';
							
							if (error == 0){								
								busca[placa]=serie;
								totaVehiculos++;
								txt = '<span class="errorvehi"></span>';
							}
							var trash = "<i class='glyphicon glyphicon-trash eliminar_exe' data-placa='"+placa+"' data-serie='"+serie+"'></i>";
							
							DTImportar.row.add(['<div id="cap_'+placa+'_'+serie+'" >'+txt+'</div>',
							"<center>"+exe[0]+"</center>",exe["1"],exe["2"],
							'<div id="cap_'+placa+'_'+serie+'_marca"> </div>',
							'<div id="cap_'+placa+'_'+serie+'_modelo"> </div>',
							'<div id="cap_'+placa+'_'+serie+'_anio"> </div>',
							'<div id="cap_'+placa+'_'+serie+'_color"> </div>',
							exe["3"],exe["4"],exe["5"],exe["6"],exe["7"],exe["8"],exe["9"],exe["10"],exe["11"],exe["12"],exe["13"],trash ]).draw(false);							 
						});		
 				
						
						$("#capaImportar").removeClass("hide");
						$("#btnImportar").removeClass("hide");
						$("#archexporta").val(file.target_name);
						
						$.each( busca, function( placa, serie ) {
							console.log(placa);
							buscaRepuve(placa,serie) ;
						});
			
					}
                    
                },
                error: (xhr, ajaxOptions, thrownError) =>{
                    spinner.style.visibility="hidden";
                    span.innerHTML = 'Error al cargar documento';
                    peticion_fallida(thrownError);
                    csrf.value = xhr.responseJSON.token;
                }
            }).fail(function(response){
                spinner.style.visibility="hidden";
                if(response.responseText=="Sesion"){
                    error_sesion();
                }
            })
        },
    }
});

upExcel.init();

$( ".alfa" ).keydown(function(ev) { 				
				var valor = ev.key 
				var longitud_min = 1;			
				let resultado = valida_num_letras(ev.key,1);
                if(!resultado.resp || ev.key==" "){
                    ev.preventDefault();
                }
    

});

function valida_num_letras(valor, longitud_min){
	let resultado = {resp : true}
	if (!(/^[0-9a-zA-Z\s]+$/.test(valor)) || valor.length < longitud_min){
		resultado.resp = false
	}
	return resultado;
}

function buscaRepuve(placa, serie){
	var capa = String(""+placa+"_"+serie);
	$("#sisaveexcel").attr("disabled","true");
 
	$("#cap_"+capa).html("<span class='errorvehi'>espere...</span>");
	$("#capabusca").html("<div class='alert alert-info'>Buscando en REPUVE "+buscaVehiculos+" de "+totaVehiculos+"</div>");
	$.ajax({
			url: base_url+'Utilidades/Ctrl_Servicios/getDatosVehiculos',			
			type: 'GET',
            dataType: 'json',
            data : {
				endpoint: "repuvenacional",
                noserie  : serie,
                noplaca  : placa
            },
			success: function(response){
				buscaVehiculos++;
				$("#capabusca").html("<div class='alert alert-info'>Buscando en REPUVE "+buscaVehiculos+" de "+totaVehiculos+"</div>");
				if(response.data != null){	 
					$("#cap_"+capa).html("<span style='color:green;'>Encontrado</span>");
					$("#cap_"+capa+"_modelo").html(response.data[0].submarca);
					$("#cap_"+capa+"_anio").html(response.data[0].modelo);
					$("#cap_"+capa+"_color").html(response.data[0].color);
					$("#cap_"+capa+"_marca").html(response.data[0].marca);
					let date= {placa:placa,
					serie: serie, 
					modelo:response.data[0].submarca,
					anio:response.data[0].modelo,
					color:response.data[0].color,
					marca:response.data[0].marca }
					dataRepuve.push(date);
 				}else 
					$("#cap_"+capa).html("<span style='color:red;' class='errorvehi'>No encontrado</span>");
					if (buscaVehiculos == totaVehiculos){
						$("#capabusca").html("");
						habilitaExe();
					}
			}
	});
}

  
$(tabImportar).on('click', '.eliminar_exe', function(ev){
    
	let date= {placa:ev.target.dataset.placa, serie: ev.target.dataset.serie}
	dataExportar.push(date);
    DTImportar.row($(this).parents('tr')).remove().draw();
	
	habilitaExe();
	
});

function habilitaExe(){
	var total = $('.errorvehi').length;
	
	if (total == 0){$("#sisaveexcel").removeAttr("disabled"); $("#si_manda").removeClass("hide");} 	
}

 
		
$("#vigenciaPoliza").change(function() {
	var d = new Date();var fecha = new Date(d.getFullYear(),d.getMonth(),d.getDate());$("#errorvigenciaPoliza").html("");
	var temp = $("#vigenciaPoliza").val().split("-"); 
	var pol = new Date(parseInt(temp[0],10),parseInt(temp[1],10)-1,parseInt(temp[2],10)); 		
	var resultado = fecha.getTime() <= pol.getTime();		
	if (resultado == false && $("#vigenciaPoliza").val() != ""){  $("#errorvigenciaPoliza").html("Información  no válida");}
		
});

$("#vigenciaTarjeta").change(function() {
	var d = new Date();var fecha = new Date(d.getFullYear(),d.getMonth(),d.getDate());$("#errorvigenciaTarjeta").html("");
	var temp = $("#vigenciaTarjeta").val().split("-"); 
	var pol = new Date(parseInt(temp[0],10),parseInt(temp[1],10)-1,parseInt(temp[2],10)); 		
	var resultado = fecha.getTime() <= pol.getTime();		
	if (resultado == false && $("#vigenciaTarjeta").val() != ""){  $("#errorvigenciaTarjeta").html("Información  no válida");}
		
});

$("#periodoCobFechaFin").change(function() {
	var d = new Date();var fecha = new Date(d.getFullYear(),d.getMonth(),d.getDate());$("#errorperiodoCobFechaFin").html("");
	var temp = $("#periodoCobFechaFin").val().split("-"); 
	var pol = new Date(parseInt(temp[0],10),parseInt(temp[1],10)-1,parseInt(temp[2],10)); 		
	var resultado = fecha.getTime() <= pol.getTime();		
	if (resultado == false && $("#periodoCobFechaFin").val() != ""){   $("#errorperiodoCobFechaFin").html("Información  no válida");}
		
});

$("#periodoCobFechaInicio").change(function() {
	var d = new Date();var fecha = new Date(d.getFullYear(),d.getMonth(),d.getDate());$("#errorperiodoCobFechaInicio").html("");
	var temp = $("#periodoCobFechaInicio").val().split("-"); 
	var pol = new Date(parseInt(temp[0],10),parseInt(temp[1],10)-1,parseInt(temp[2],10)); 		
	var resultado = fecha.getTime() >= pol.getTime();		
	if (resultado == false && $("#periodoCobFechaInicio").val() != ""){   $("#errorperiodoCobFechaInicio").html("Información  no válida");}
		
});
