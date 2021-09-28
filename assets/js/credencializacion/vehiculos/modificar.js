const id_vehiculo = localStorage.getItem("id_vehiculo");
const id_vehiculo_me = localStorage.getItem("id_vehiculo_me"); 
let  modifico = false;
class Modificar{
    constructor(){
        this.inicio()
		this.obtener_datos(); 
         
    }  
    inicio(){
        confirmar_guardar.addEventListener("click",this.realizar_almacenamiento) 
		guardar.addEventListener('click',this.confirmar_almacenamiento)
		adjuntarVehiculoFactura.addEventListener("change",this.previsualizar_vehiculo_factura)
       // ajuntarLateralVehiculo.addEventListener("change",this.previsualizar_vehiculo)
        //adjuntarPlacaVehiculo.addEventListener("change",this.previsualizar_vehiculo)
		
		btnSubirFacturaVehiculo.addEventListener('click',(ev)=>{
            
            if(adjuntarVehiculoFactura.dataset.imagen){
                $(pdfViewerVehiculoFactura).html('<img width="460" height="200" src="'+base_url+'/'+adjuntarVehiculoFactura.dataset.imagen+'"/>');
            }else{
                pdfViewerVehiculoFactura.innerHTML = ''
                erroradjuntarVehiculoFactura.innerHTML = ''
            }
            $(modalVehiculoFactura).modal()
        })

        btnSubirVehiculo.addEventListener('click',(ev)=>{

            
            $(modalVehiculo).modal()
        })
		
		btnSiguienteAdjuntarVehiculo.addEventListener('click',(ev)=>{

            $(pdfViewerVehiculo).html("");
			$(pdfViewerVehiculo).css("height","0px");
            $(fotografiaLateral).hide();
            $(fotografiaPlaca).removeAttr("style");
             
            /*if(adjuntarPlacaVehiculo.dataset.imagen){    
             
                $(pdfViewerVehiculo).html('<img width="460" height="200" src="'+base_url+'/'+adjuntarPlacaVehiculo.dataset.imagen+'"/>');
                $(btnSiguienteAdjuntarVehiculo).hide();
                $(btnAceptarAdjuntarVechiculo).show();

            }else{
                pdfViewerVehiculo.innerHTML = ''
            }*/
            
        })

    }
	
	realizar_almacenamiento(){
	 
	 var valida = true;
	  
		var sec= this.validaciones = new VALIDACIONES();
		$(".error").html("");
		$(".req").each(function(){		
			$("#error"+this.id).html("");
			if (this.value.trim() == ""){
				$("#error"+this.id).show();
				$("#error"+this.id).html("Campo obligatorio");
				valida = false;
				 
			}
		});
		$(".alfa").each(function(){		
			
			if (this.value != ""){
				var res = valida_num_letras(this.value,0);
				var respu = res.resp ;
				if (respu ==true) {var foo = this.value.split(" ");  if (typeof foo[1] !== 'undefined') {respu =false;}}
						if (respu == false){
							$("#error"+this.id).show();
							$("#error"+this.id).html("Formato invalido");
							valida = false;
					 
							 
						}
			}
		});
	 
		let campos=[];
		 
		
		let formData = new FormData(); 
			formData.append("id_vehiculo",id_vehiculo)
			formData.append("noPlaca",noPlaca.value)
            formData.append("noSerie",noSerieVehiculo.value)
            formData.append("noMotor",noMotor.value)
            formData.append("marca",marcaVehiculo.value)
            formData.append("modelo",modeloVehicuo.value)
            formData.append("anio",anio.value)
            formData.append("color",color.value)
            formData.append("tipoVehiculo",tipoVehiculo.value)
            formData.append("tipoTarCircu",tipoTarjetaCirculacion.value)
            formData.append("noTarjeta",noTarjeta.value)
            formData.append("vigenciaTarjeta",vigenciaTarjeta.value)
            formData.append("tipoDocumento",tipodocumentoVeh.value)
            formData.append("noFactura",noFacturaVeh.value)
            formData.append("aseguradora",aseguradorasVeh.value)
            formData.append("noPoliza",noPoliza.value)
            formData.append("vigenciaPoliza",vigenciaPoliza.value)
            formData.append("periodoPago",periodoPago.value)
            formData.append("periodoFechaInicio",periodoCobFechaInicio.value)
            formData.append("periodoFechaFin",periodoCobFechaFin.value)
            formData.append("estatusVehiculo","") 
			
		 
		if (valida == true){ 
			 $.ajax({
            url: base_url + 'Credencializacion/Ctrl_Vehiculos/update',
            type: 'POST',
			global: false,
			processData: false,
			contentType: false,
            data : formData,
            beforeSend:function(){
                $("#modal_confirmar_guardar").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status != true){
                    peticion_fallida(data.message);
                }else{
                    registro_exitoso(data.message);
                     
                }
				modifico =false;
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $("#modal_confirmar_guardar").modal("hide");
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        })
		
		}
	}
	confirmar_almacenamiento(){
        var valida = true;
		var sec= this.validaciones = new VALIDACIONES();
		$(".error").html("");
		$(".req").each(function(){		
			$("#error"+this.id).html("");
			if (this.value.trim() == ""){
				$("#error"+this.id).show();
				$("#error"+this.id).html("Campo obligatorio");
				valida = false;
			}
		});
		$(".alfa").each(function(){		
		
			if (this.value != ""){
				var res = valida_num_letras(this.value,0);
				var respu = res.resp ;
				if (respu ==true) {var foo = this.value.split(" ");  if (typeof foo[1] !== 'undefined') {respu =false;}}
						if (respu == false){
							$("#error"+this.id).show();
							$("#error"+this.id).html("Formato invalido");
							valida = false;
							 
						}
			}
		}); 
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
            pedir_confirmacion_guardar();
        }
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
					
					tipoTarjetaCirculacion.value = response.data.tipo_tarjeta_circulacion
					//obtener_aseguradoras.value = response.data.aseguradora
					//periodo.value = response.data.periodo
					color.value = response.data.color
                    tipoVehiculo.value = response.data.tipo_vehiculo                    
                    noTarjeta.value = response.data.numero_tarjeta_circulacion					
                    vigenciaTarjeta.value = response.data.vigencia_tarjeta_circulacion                                       
                    noPoliza.value = response.data.numero_poliza
					vigenciaPoliza.value = response.data.vigencia_poliza
                    periodoCobFechaInicio.value = response.data.fecha_inicio_cobertura
                    periodoCobFechaFin.value = response.data.fecha_fin_cobertura					
 					
					$(tipoVehiculo).data("valor",response.data.id_tipo_vehiculo);
					$(tipoTarjetaCirculacion).data("valor",response.data.id_tipo_tarjeta_circulacion);
					$(tipoTarjetaCirculacion).data("valor",response.data.id_tipo_tarjeta_circulacion);
					$(aseguradorasVeh).data("valor",response.data.id_tipo_aseguradora);
					$(periodoPago).data("valor",response.data.id_tipo_periodo);
					
					
					                    

					
					if(response.data.estatus==1){
                                $(".eliminar").show();
                                $(".reactivar").hide();
                            }
                            else{
                                $(".eliminar").hide();
                                $(".reactivar").show();
                            }
                    
					
				}
			},complete: function(){ 
				
				Modificar.prototype.obtener_tipos_vehiculos();
				Modificar.prototype.obtener_tipos_tarjetas_circulacion();
				Modificar.prototype.obtener_tipos_documentos();
				Modificar.prototype.obtener_aseguradoras();
				Modificar.prototype.obtener_periodos();
            }
		});
	}
	obtener_imagenes(){
		$("#Visuzaliarfactura").html("");
		$("#Visuzaliarveh1").html("");
		$("#Visuzaliarveh2").html("");
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
                        $("#Visuzaliarfactura").attr("data-img",element.link+""+element.nombre);
						$("#noFacturaVeh").val(element.numero_identificacion);
						$("#tipodocumentoVeh").val(element.id_tipo_identificacion);						
						$("#Visuzaliarfactura").attr("data-id",element.id);
						if (element.nombre !="Factura"){
							$("#Visuzaliarfactura").html("<i class='glyphicon glyphicon-paperclip'></i> Visualizar factura");	
						}
						
                    }
					if(element.id_tipo_toma == 7){
                        $("#Visuzaliarveh1").attr("data-img",element.link+""+element.nombre);
						$("#Visuzaliarveh1").attr("data-id",element.id);
						$("#Visuzaliarveh1").html("<i class='glyphicon glyphicon-paperclip'></i> Archivo 1");
                    }
					if(element.id_tipo_toma == 8){
                        $("#Visuzaliarveh2").attr("data-img",element.link+""+element.nombre);
						$("#Visuzaliarveh2").attr("data-id",element.id);
						$("#Visuzaliarveh2").html("<i class='glyphicon glyphicon-paperclip'></i> Archivo 2");
                    }
                });
				
			}
		}).fail( function(response) {
			
		});
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
                    $(tipoVehiculo).append('<option value="'+element.id+'" '+($(tipoVehiculo).data("valor") == element.id ? 'selected' : '')+'>'+element.nombre+'</option>');
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
                    $(tipoTarjetaCirculacion).append('<option value="'+element.id+'" '+($(tipoTarjetaCirculacion).data("valor") == element.id ? 'selected' : '')+'>'+element.nombre+'</option>');
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
				Modificar.prototype.obtener_imagenes();
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
                    $(aseguradorasVeh).append('<option value="'+element.id+'" '+($(aseguradorasVeh).data("valor") == element.id ? 'selected' : '')+'>'+element.nombre+'</option>');
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
                    $(periodoPago).append('<option value="'+element.id+'" '+($(periodoPago).data("valor") == element.id ? 'selected' : '')+'>'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {
			
		});
    }
	previsualizar_vehiculo_factura(){
        var fileReader = new FileReader();
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
			$("#pdfViewerVehiculoFactura").css("height","0px");
            if(fileReader != ""){
                $(errorSubirFacturaVehiculo).html("")
            }
        }
    }
    previsualizar_vehiculo(ev){
        var fileReader = new FileReader();
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
            
            if(fileReader != ""){
                $(errorSubirFotoVehiculo).html("")
            }
        }
    }
	previsualizar_archivo(files,capa){
        var fileReader = new FileReader();
        var file = files[0].getNative();
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
const mod = new Modificar()
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
					$("#error"+this.id).show();$("#error"+this.id).html("* Formato invalido");
				}
	}
});

$(".reiniciar-vehiculo").change(function() {
		modifico=true;
	
});
$("#regresar").click( (e) => {
	if(modifico == 1)
		pedir_confirmar_regresar();	
	else
		window.location.href = base_url + 'Credencializacion/Ctrl_Vehiculos';
});
$("#confirmar_salir_sin_guardar").click( (e) => {
	window.location.href = base_url + 'Credencializacion/Ctrl_Vehiculos';
})

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
            mod.previsualizar_archivo(up.files,"Vehiculo");
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
            // Called when file has finished uploading
            let formData = new FormData();
            formData.append("id_vehiculo",id_vehiculo)
			formData.append("no_foto",7);
            formData.append("nombre", file.target_name);
			formData.append("tipo_documento", "");
			formData.append("numero_documento", "");
			formData.append("id_imagen", $("#Visuzaliarveh1").attr("data-id"));
            formData.append([csrf.name], csrf.value);
            
            var span = document.getElementById('Visuzaliarveh1');

            $.ajax({
                url : base_url+'Credencializacion/Ctrl_Vehiculos/updateimg',
                type : 'POST',
                data : formData,
                global: false,
                processData: false,
                contentType: false,
                success : function(response) {
					$(btnSiguienteAdjuntarVehiculo).show();
                    csrf.value = response.token;
                    divVisuzaliarvehiculo.style.display = ""					
                    $("#Visuzaliarveh1").attr("data-img","assets/uploads/credencializacion/vehiculos/"+file.target_name) 
                    Visuzaliarveh1	.classList.remove("disabled");
                    span.innerHTML = 'Archivo 1 &nbsp; ';
					$("#Visuzaliarveh1").attr("data-id",response.data.id) 
					$("#errorSubirFotoVehiculo").html("");
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
            mod.previsualizar_archivo(up.files,"Vehiculo");
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
            // Called when file has finished uploading
            let formData = new FormData();
            formData.append("id_vehiculo",id_vehiculo)
			formData.append("no_foto",8);
            formData.append("nombre", file.target_name);
			formData.append("tipo_documento", "");
			formData.append("numero_documento", "");
			formData.append("id_imagen", $("#Visuzaliarveh2").attr("data-id"));
            formData.append([csrf.name], csrf.value);
            
            var span = document.getElementById('Visuzaliarveh2');

            $.ajax({
                url : base_url+'Credencializacion/Ctrl_Vehiculos/updateimg',
                type : 'POST',
                data : formData,
                global: false,
                processData: false,
                contentType: false,
                success : function(response) {					
                    csrf.value = response.token;
                    divVisuzaliarvehiculo.style.display = ""					
                    $("#Visuzaliarveh2").attr("data-img","assets/uploads/credencializacion/vehiculos/"+file.target_name) 
                    Visuzaliarveh2	.classList.remove("disabled");
                    span.innerHTML = ' Archivo 2 ';
					$("#Visuzaliarveh2").attr("data-id",response.data.id) 
					$("#errorSubirFotoVehiculo").html("");
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
            // Called when file picker is clicked
            if (up.files.length > 0)
                up.removeFile(up.files[0]); // Delete the last selection if it exists
        },
        FilesAdded: function (up, files) {
      
      //      $(error_archivo).html("")
            mod.previsualizar_archivo(up.files,"VehiculoFactura");
        },
        UploadProgress: function (up, file) {
            // Called while file is being uploaded
            divVisuzaliarfactura.style.display = ""
            var span = document.getElementById('Visuzaliarfactura');
            span.innerHTML = '<span> Cargando archivo: ' + file.percent + '%</span>';
            Visuzaliarfactura.classList.add("disabled");
        },
        BeforeUpload: function (up, file) {
            // Called right before the upload for a given file starts, can be used to cancel it if required
            $(modalVehiculoFactura).modal('toggle');
        },
        FileUploaded: function (up, file, info) {
            info = JSON.parse(info.response)
            csrf.value = info.token;
            upFact.settings.multipart_params[csrf.name] = info.token;
            // Called when file has finished uploading
            let formData = new FormData();
            formData.append("id_vehiculo",id_vehiculo)
			formData.append("no_foto",6);
            formData.append("nombre", file.target_name);
			formData.append("tipo_documento", $("#tipodocumentoVeh").val());
			formData.append("numero_documento", $("#noFacturaVeh").val());
			formData.append("id_imagen", $("#Visuzaliarfactura").attr("data-id"));
            formData.append([csrf.name], csrf.value);
            
            var span = document.getElementById('Visuzaliarfactura');

            $.ajax({
                url : base_url+'Credencializacion/Ctrl_Vehiculos/updateimg',
                type : 'POST',
                data : formData,
                global: false,
                processData: false,
                contentType: false,
                success : function(response) {
                    csrf.value = response.token;
                    divVisuzaliarfactura.style.display = ""					
                    $("#Visuzaliarfactura").attr("data-img","assets/uploads/credencializacion/vehiculos/"+file.target_name) 
					$("#Visuzaliarfactura").attr("data-id",response.data.id) 
                    Visuzaliarfactura.classList.remove("disabled");
                    span.innerHTML = 'Visualizar factura';
					$("#errorSubirFacturaVehiculo").html("");
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
$( ".alfa" ).keydown(function(ev) { 
				let resultado = {resp : true}
				var valor = ev.key 
				var longitud_min = 1;
			if (!(/^[0-9a-zA-Z\s]+$/.test(valor)) || valor.length < longitud_min){
				resultado.resp = false
			}
			
                if(!resultado.resp || ev.key==" "){
                    ev.preventDefault();
                }
    

});

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