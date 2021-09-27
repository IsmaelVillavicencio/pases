var DTOperadores, DTContenedores, DTTractos // DTVehiculos
var datosOperadores = []
var datosContenedores = []
var datosTractos = []
var nombreDocumentoExcel = ''
//var datosVehiculos = []

//scanner CURP
let QrScanner
import('../../../librerias/QRScanner/qr-scanner.min.js').then((module) => {
  QrScanner = module.default;
  QrScanner.WORKER_PATH = '../../../assets/librerias/QRScanner/qr-scanner-worker.min.js';
});

var scanner;
var datosEscaneados = '';
const video = document.getElementById('qr-video'); 
const camQrResult = document.getElementById('cam-qr-result');

//FALTA LA CONFIGURACIÓN PARA SUBIR LOS DOCUMENTOS POR EXCEL

class Registrar{
  constructor(){
    this.inicio();
    this.tipo_producto();
    this.empresa_maniobrista();
    this.tipo_permiso();
    this.nombre_completo_operador();
    //this.obtener_datos_generales();
    this.obtener_datos_operadores();
  //this.obtener_datos_contenedores();
    this.obtener_datos_tractos();
    //this.abrir_excel();
  //this.obtener_datos_vehiculos()
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
      DTTractos = $(tabTractos).DataTable( {
        "language": {
        "url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
        "order": []
          });
    /* 
      DTVehiculos = $(tabVehiculo).DataTable( {
        "language": {
        "url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
        "order": []
      });
    */
    imo_matricula.addEventListener('change',this.obtener_datos_generales)
    agregarOperador.addEventListener('click',this.agregar_operador)
    agregarContenedor.addEventListener('click',this.agregar_contenedor)
    agregarTracto.addEventListener('click',this.agregar_tracto)
    confirmar_guardar.addEventListener('click',this.guardar)
    guardar.addEventListener('click',this.validar_guardar)
    fotoOperador.addEventListener('click',this.ver_imagen)
    fotoIdentificacion.addEventListener('click',this.ver_imagen)
    fotoLicencia.addEventListener('click',this.ver_imagen)
    fotoTarjetaCirculacion.addEventListener('click',this.ver_imagen)
    fotoPolizaTracto.addEventListener('click',this.ver_imagen)
    fotoVigenciaCaat.addEventListener('click',this.ver_imagen)
    curp.addEventListener('change',this.obtener_datos_operadores)
    //imagenFactura.addEventListener('click',this.ver_imagen)
    //consultarFotos.addEventListener('click',this.ver_imagen)
    //agregarVehiculo.addEventListener('click',this.agregar_vehiculo)

    operadoresManual.addEventListener('click',(ev)=>{
      divOperadoresManual.style.display = "block"
      divOperadoresExcel.style.display = "none"
    })
    operadoresExcel.addEventListener('click',(ev)=>{
      divOperadoresManual.style.display = "none"
      divOperadoresExcel.style.display = "block"
    })
    contenedoresManual.addEventListener('click',(ev)=>{
      divContenedoresManual.style.display = "block"
      divContenedoresExcel.style.display = "none"
    })
    contenedoresExcel.addEventListener('click',(ev)=>{
      divContenedoresManual.style.display = "none"
      divContenedoresExcel.style.display = "block"
    })
    tractosManual.addEventListener('click',(ev)=>{
      divTractosManual.style.display = "block"
      divTractosExcel.style.display = "none"
    })
    tractosExcel.addEventListener('click',(ev)=>{
      divTractosManual.style.display = "none"
      divTractosExcel.style.display = "block"
    })
    /*
    vehiculosManual.addEventListener('click',(ev)=>{
      divVehiculosManual.style.display = "block"
      divVehiculosExcel.style.display = "none"
    })
    vehiculosExcel.addEventListener('click',(ev)=>{
      divVehiculosManual.style.display = "none"
      divVehiculosExcel.style.display = "block"
    })
    */
    nombre.addEventListener("keydown",(ev) => {
      if(ev.keyCode != 16){
          this.validaciones = new VALIDACIONES();
          let resultado = this.validaciones.caracteres_validos(ev.key,1);
          if(!resultado.resp){
              ev.preventDefault();
          }
      }
    })
    curp.addEventListener('change',(ev)=>{
      errorcurp.innerHTML = ""
      this.validaciones = new VALIDACIONES();
      let resultado = this.validaciones.curp(ev.target.value);
      if(!resultado.resp){
          errorcurp.innerHTML = 'Información no valida'
      }
    })
    cerrarModal.addEventListener('click',(ev)=>{
      modalImagen.style.display = "none"
    })
    let elementos = document.getElementsByClassName("escanear-camara");
        for (var i = 0; i < elementos.length; i++) {
            elementos[i].addEventListener("click", (ev) => {
                $(modalEscanerCURP).css("margin-top", ajuste_altura_modal(ev))
                $(modalEscanerCURP).modal();
                QrScanner.hasCamera().then(hasCamera => {
                    if (hasCamera) {
                        scanner = new QrScanner(video, result => setResult(result), error => {
                            camQrResult.textContent = "Código QR no encontrado";
                        });
                        scanner.start();
                    }
                });
            })
        }
    elementos = document.getElementsByClassName("escanear-escaner");
        for (var i = 0; i < elementos.length; i++) {
            elementos[i].addEventListener("click", (ev) => {
                $(modalEscanerCURP).css("margin-top", ajuste_altura_modal(ev))
                $(modalEscanerCURP).modal();
                $(escaneoQR).val("");
                $(escaneoQR).focus()
            })
        }
        let timeout
        escaneoQR.addEventListener("keydown", (ev) => {
            spinner.style.visibility = 'visible'
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                let datosCURP = ev.target.value
                datosCURP = datosCURP.split("]")
                curp.value = datosCURP[0]
                nombre.value = datosCURP[4]
                primerApellido.value = datosCURP[2]
                segundoApellido.value = datosCURP[3]

                $(modalEscanerCURP).modal('hide');
                spinner.style.visibility = 'hidden'
                clearTimeout(timeout)
            }, 1000)
        })
        subirArchivoOperador.addEventListener('click',(ev)=>{
          $(modalExcel).modal();
          nombreDocumentoExcel = ev.target.id.toString()
          errordocExcel.innerHTML = "";
          archivoadjunto.innerHTML = "";
          console.log(ev.target.id)
        })
        subirArchivoContenedor.addEventListener('click',(ev)=>{
          $(modalExcel).modal();
          nombreDocumentoExcel = ev.target.id.toString()
          errordocExcel.innerHTML = "";
          archivoadjunto.innerHTML = "";
          console.log(ev.target.id)
        })
        subirArchivoTracto.addEventListener('click',(ev)=>{
          $(modalExcel).modal();
          nombreDocumentoExcel = ev.target.id.toString()
          errordocExcel.innerHTML = "";
          archivoadjunto.innerHTML = "";
          console.log(ev.target.id)
        })
       /* cerrarModalExcel.addEventListener('click',(ev)=>{
          $(modalExcel).modal('hide');
        })*/
  }
  previsualizador(){
    var fileReader = new FileReader();
        var file = files[0].getNative();
        console.log(file)
        $(excelOperador).html('<div></div>');
        fileReader.onload = () => {
            var TheFileContents = fileReader.result;
            $(excelOperador).html('<object> <embed src="'+TheFileContents+'" width="100%" height="300px"/></object>');
        };
        fileReader.readAsDataURL(file);
        console.log("file reader")
        console.log(fileReader)
}
  tipo_producto(){
    $.ajax({
      url: base_url_rest+'catalogos/tipoproductos/estatus/1',
      type: 'GET',
      dataType: 'json',
      beforeSend: function(){
        $(tipoProducto).append('<option value="">Seleccione</option>')
      },
      success: function(response){
        response.data.forEach(element => {
          $(tipoProducto).append('<option value="'+element.id+'">'+element.nombre+'</option>')
        });
      }
    })
  }
  empresa_maniobrista(){
    $.ajax({
      //cambiar la consulta de las empresas
//      url: base_url+'Usuarios/Ctrl_Empresas/get----',
      type: 'GET',
      dataType: 'json',
      global: false,
      data: {
        estatus: 1
      },
      beforeSend: function(){
        $(empresaManiobrista).append('<option value="">Seleccione</option>')
      },
      success: function(response){
        response.data.forEach(element => {
          $(empresaManiobrista).append('<option value="'+element.id+'">'+element.nombre+'</option>')
        });
      }
    })
  }
  tipo_permiso(){
    $.ajax({
      url: base_url+'Catalogos/Ctrl_tiposPermisos/getByEstatus',
      type: 'GET',
      dataType: 'json',
      global: false,
      data: {
          estatus: 1,
      },
      beforeSend: function(){
        $(tipoPermiso).append('<option value="">Seleccione</option>')
      },
      success: function(response){
        response.data.forEach(element => {
          $(tipoPermiso).append('<option value="'+element.id+'">'+element.nombre+'</option>')
        });
      }
    })
  }
  nombre_completo_operador(){
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
         
      }
    })
  }
  obtener_datos_generales(){
    console.log("entró a datos generales")
    $.ajax({
      //cambiar valor 1 para imo 2 para matricula
      url: base_url_rest+ "buques/autorizacion/2/"+imo_matricula.value,
      type: 'GET',
      dataType: 'json',
      data: {
          estatus : 1
      },
      beforeSend: function(){
          
      },
      success: function(response){
        console.log(response)
      
      if(response.status == true){
          //nombreEmpresas.value = response.data.
          //noReferencia.value = response.data.
          //imo_matricula.value = response.data
          nombre.value = response.data[0].nombre_buque
          noViaje.value = response.data[0].numero_viaje
          console.log(response.data[0].nombre_buque)
          console.log(response.data[0].numero_viaje)
         /* toneladas.value = response.data.
          tipoProducto.value = response.data.
          empresaManiobrista.value = response.data.
          ptoDestino.value = response.data.
          tipoPermiso.value = response.data.
          noDias.value = response.data.
          fechaInicioPermiso.value = response.data.
          fechaFinPermiso.value = response.data.*/
        }  
      }
    })
  }
  obtener_datos_operadores(){
    console.log("datos operadores")
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
        if(response.data != null){
          curp.value = response.data.
          nombreCompleto.value = response.data.
          noss.value = response.data.
          fechaNacimiento.value = response.data.
          rfc.value = response.data.
          fechaExamenMedico.value = response.data.
          fotoOperador.value = response.data.
          tipoIentificacion.value = response.data.
          noIdentificacion.value = response.data.
          fechaVencimiento.value = response.data.
          fotoIdentificacion.value = response.data.
          noLicencia.value = response.data.
          fechaExpLicencia.value = response.data.
          fechaVencimientoLic.value = response.data.
          fotoLicencia.value = response.data.
          correo.value = response.data.
          noTelefono.value = response.data.
        }
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
        if(response.data != null){
          placaTracto.value = response.data.
          tipoPlacaTracto.value = response.data.
          noSerieTracto.value = response.data.
          noMotorTracto.value = response.data.
          colorTracto.value = response.data.
          marcaTracto.value = response.data.
          modeloTracto.value = response.data.
          capacidadTracto.value = response.data.
          tipoTransporteTracto.value = response.data.
          noEconomico.value = response.data.
          caat.value = response.data.
          vigenciaCaat.value = response.data.
          fotoVigenciaCaat.value = response.data.
          tarjetaCirculacionTracto.value = response.data.
          fechaExpTarjetaTracto.value = response.data.
          fotoTarjetaCirculacion.value = response.data.
          noPolizaTracto.value = response.data.
          tipoCoberturaTracto.value = response.data.
          fechaExpPolizaTracto.value = response.data.
          fechaVenPolizaTracto.value = response.data.
          compania.value = response.data.
          fotoPolizaTracto.value = response.data.
        }
        
        */
      }
    })
  }
 /* obtener_datos_vehiculos(){
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

      
        if(response.data != null){
            noPlaca.value = response.data.
            noSerie.value = response.data.
            noMotor.value = response.data.
            marca.value = response.data.
            modelo.value = response.data.
            anio.value = response.data.
            color.value = response.data.
            tipoVehiculo.value = response.data.
            tipoTajetaCirculacion.value = response.data.
            noTarjeta.value = response.data.
            vigenciaTarjeta.value = response.data.
            tipoDocumento.value = response.data.
            noFactura.value = response.data.
            aseguradora.value = response.data.
            noPoliza.value = response.data.
            vigenciaPoliza.value = response.data.
            periodoPoliza.value = response.data.
            fechaIniCobertura.value = response.data.
            fechaFinCobertura.value = response.data.
            consultarFotos.value = response.data.  
        }
          
      
      }
    })
  }*/
  ver_imagen(){
   
    modalImagen.style.display = "block"
   /*
    $(pdfViewer).html('<div></div>');
    $(pdfViewer).html('<object><a href="'+urlImagen+'" target="_blank"><embed src="'+urlImagen+'" width="100%" height="300px"/></a></object>');  

    var fileReader = new FileReader();
    //urlImagen.getNative();
    fileReader.onload = function() {
        var TheFileContents = fileReader.result;    
        $(pdfViewer).html('<img width="460" height="200" src="'+TheFileContents+'"/>');
    };
    fileReader.readAsDataURL(urlImagen);
    */
  }
  obtener_autorizacion_arribo(){
    
  }
  agregar_operador(){

    let validacion = true

    if(curp.value == ""){
       errorcurp.innerHTML = "Campo obligatorio"
       validacion = false
    }
    if(nombreCompleto.value == ""){
      errornombreCompleto.innerHTML = "Campo obligatorio"
      validacion = false
    }
    if(validacion){
      let datos = {
        curp                : curp.value,
        nombreCompleto      : nombreCompleto.value,
        noss                : noss.value,
        fechaNacimiento     : fechaNacimiento.value,
        rfc                 : rfc.value,
        fechaExamenMedico   : fechaNacimiento.value,
        fotoOperador        : fotoOperador.value,
        tipoIdentificacion  : tipoIdentificacion.value,
        noIdentificacion    : noIdentificacion.value,
        fotoIdentificacion  : fotoIdentificacion.value,
        tipoLicencia        : tipoLicencia.value,
        noLicencia          : noLicencia.value,
        fechaExpLicencia    : fechaExpLicencia.value,
        fechaVencimientoLic : fechaVencimientoLic.value,
        fotoLicencia        : fotoLicencia.value,
        correo              : correo.value,
        noTelefono          : noTelefono.value
      }
      datosOperadores.push(datos)
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
    }
   
  }
  agregar_contenedor(){
    let validacion = true 

    if(noContenedor.value == ""){
      errornoContenedor.innerHTML = "Campo obligatorio"
      validacion = false
    }
    
    if(validacion){
      let datos = {
          noContenedor : noContenedor.value,

      }
      datosContenedores.push(datos)
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

    }
  }
  /*agregar_vehiculo(){
    let validacion = true 

    //falta ver si serán obligatorios
    if(noPlaca.value == ""){
      validacion = false
    }
    if(noSerie.value == ""){
      validacion = false
    }
    
    if(validacion){

      let datos = {

      }
      datosVehiculos.push(datos)
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

    }
   
  }*/
  agregar_tracto(){
    let validacion = true 

    if(placaTracto.value == ""){
      errorplacaTracto.innerHTML = "Campo obligatorio"
      validacion = false
    }
    if(noSerieTracto.value == ""){
      errornoSerieTracto.innerHTML = "Campo obligatorio"
      validacion = false
    }
    
    if(validacion){
      let datos = {
        placaTracto              : placaTracto.value,
        tipoPlacaTracto          : tipoPlacaTracto.value,
        noSerieTracto            : noSerieTracto.value,
        noMotorTracto            : noMotorTracto.value,
        colorTracto              : colorTracto.value,
        marcaTracto              : marcaTracto.value,
        modeloTracto             : modeloTracto.value,
        capacidadTracto          : capacidadTracto.value,
        tipoTransporteTracto     : tipoTransporteTracto.value,
        noEconomico              : noEconomico.value,
        caat                     : caat.value,
        vigenciaCaat             : vigenciaCaat.value,
        fotoVigenciaCaat         : fotoVigenciaCaat.value,
        tarjetaCirculacionTracto : tarjetaCirculacionTracto.value,
        fechaExpTarjetaTracto    : fechaExpTarjetaTracto.value,
        fotoTarjetaCirculacion   : fotoTarjetaCirculacion.value,
        noPolizaTracto           : noPolizaTracto.value,
        tipoCoberturaTracto      : tipoCoberturaTracto.value,
        fechaExpPolizaTracto     : fechaExpPolizaTracto.value,
        fechaVenPolizaTracto     : fechaVenPolizaTracto.value,
        compania                 : compania.value,
        fotoPolizaTracto         : fotoPolizaTracto.value
      }
      datosTractos.push(datos)
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

    }
  }
  /*abrir_excel(){
    console.log("entrando excel")
    var url = "C:/xampp_2/htdocs/Proyecto-API/assets/uploads/permisos_cabotaje/operadores.xlsx"
  var documentoExcel  = new XMLHttpRequest();
  documentoExcel.open('GET', url, true);
  documentoExcel.responseType = "arraybuffer";

  documentoExcel.onload = function(e){
    var info=readData();
    console.log(info);

      function readData(){
          var arraybuffer = documentoExcel.response;

          var data = new Uint8Array(arraybuffer);
          var arr = new Array();
          for (let i = 0; i != data.length.length; i++) array[i] = String.fromCharCode(data[i]);
          var bstr = arr.join("");
          
          var workbook = XLSX.read(bstr, {type:"binary"});
          
          var first_sheet_name = workbook.SheetNames[0];
          var woorksheet = workbook.Sheets[first_sheet_name];
          var info = XLSX.utils.sheet_to_json(woorksheet,{raw:true});

          return info
      }

  }
  }*/
  validar_guardar(){

    let validacion = true

    if(imo.value == ""){
      errorimo.innerHTML = 'Campo obligatorio'
      validacion = false
    }
    if(nombre.value == ""){
      errornombre.innerHTML = 'Campo obligatorio'
      validacion = false
    }
    if(noViaje.value == ""){
      errornoViaje.innerHTML = 'Campo obligatorio'
      validacion = false
    }
    if(toneladas.value == ""){
      errortoneladas.innerHTML = 'Campo obligatorio'
      validacion = false
    }
    if(tipoProducto.value == ""){
      errortipoProducto.innerHTML = 'Campo obligatorio'
      validacion = false
    }
    if(empresaManiobrista.value == ""){
      errorempresaManiobrista.innerHTML = 'Campo obligatorio'
      validacion = false
    }
    if(tipoPermiso.value == ""){
      errortipoPermiso.innerHTML = 'Campo obligatorio'
      validacion = false
    }
    if(noDias.value == ""){
      errornoDias.innerHTML = 'Campo obligatorio'
      validacion = false
    }
    if(fechaInicioPermiso.value == ""){
      errorfechaInicioPermiso.innerHTML = 'Campo obligatorio'
      validacion = false
    }
    if(motivo.value == ""){
      errormotivo.innerHTML = 'Campo obligatorio'
      validacion = false
    }
    if(datosOperadores == "" || datosContenedores == "" || datosTractos == ""){
      registro_exitoso("Debe haber al menos un operador, un contenedor y un tracto en cada uno de los listados para poder guardar el permiso")
      validacion = false
    }
    if(validacion){
      pedir_confirmacion_guardar()
    }
     
  }
  guardar(){

    var datos = {
      nombreEmpresas     : nombreEmpresas.value,
      noReferencia       : noReferencia.value,
      imo_matricula      : imo_matricula.value,
      nombre             : nombre.value,
      noViaje            : noViaje.value,
      toneladas          : toneladas.value,
      tipoProducto       : tipoProducto.value,
      empresaManiobrista : empresaManiobrista.value,
      ptoDestino         : ptoDestino.value,
      tipoPermiso        : tipoPermiso.value,
      noDias             : noDias.value,
      fechaInicioPermiso : fechaInicioPermiso.value,
      fechaFinPermiso    : fechaInicioPermiso.value,
      motivo             : motivo.value
    }

    $.ajax({
        url: url ,
        type: 'POST',
        data: {
            datos: JSON.stringify({
              "permiso":     datos,
              "operador":   (datosOperadores),
              "contenedor": (datosContenedores),
              "tracto":     (datosTractos)
            })
        },
        beforeSend: function(){
         
        },
        success: function(response){
          datosOperadores = ""
          datosContenedores = ""
          datosTractos = ""
        /*  if (response.status) {
            $(modal_registro_exitoso).css('margin-top', ajuste_altura_modal(ev));
            registro_exitoso();
          } else {
              $(modal_error).css('margin-top', ajuste_altura_modal(ev));
              peticion_fallida(response.message);
          }*/

        },
      })
    
  } 
  leer_excel(){
  //var XLSX = 'xlsx'
  var url = excelOperador.value
  var oReq  = new XMLHttpRequest();
  oReq.open("GET", url, true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function(e){
    var info=readData();
    console.log(info);

      function readData(){
          var arraybuffer = oReq.response;

          var data = new Uint8Array(arraybuffer);
          var arr = new Array();
          for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
          var bstr = arr.join("");
          console.log(bstr)
          //var workbook = XLSX.write(bstr, {bookType:'xlsx',  type: 'binary'})
          var workbook = XLSX.read(bstr, {
            type:"binary"
          });
          console.log(workbook)
          var first_sheet_name = workbook.SheetNames[0];
          
          var worksheet = workbook.Sheets[first_sheet_name];
          var info = XLSX.utils.sheet_to_json(worksheet,{raw:true});

          return info;
      }
  }
    oReq.send();
  }
}
const reg = new Registrar()

$(tabOperadores).on('click', '.eliminarOperador', function(ev){
  datosOperadores.splice(ev.target.dataset.id, 1); 
  DTOperadores.row($(this).parents('tr')).remove().draw();
});
$(tabContenedores).on('click', '.eliminarContenedor', function(ev){
  datosContenedores.splice(ev.target.dataset.id, 1); 
  DTContenedores.row($(this).parents('tr')).remove().draw();
});
$(tabTractos).on('click', '.eliminarTracto', function(ev){
  datosTractos.splice(ev.target.dataset.id, 1); 
  DTTractos.row($(this).parents('tr')).remove().draw();
});
/*$(tabVehiculo).on('click', '.eliminarVehiculo', function(ev){
  datosVehiculos.splice(ev.target.dataset.id, 1); 
  DTVehiculos.row($(this).parents('tr')).remove().draw();
});*/
$(".form-control").change( (ev) => {
	cambios = 1;
    if(ev.target.value != ""){
        if(!["curp"].includes(ev.target.id)){
            $("#error"+ev.target.id).html('')
        }
    }
});

//Debe cambiar porque se llenará el select
function setResult(result) {
  scanner.stop();
  datosEscaneados = result.split("]");
  curp.value = datosEscaneados[0]
  /*nombre.value = datosEscaneados[4]
  primerApellido.value = datosEscaneados[2]
  segundoApellido.value = datosEscaneados[3]*/
  $("#modalEscanerCURP").modal("hide");
}

var subirExcel = new plupload.Uploader({
  browse_button: 'docExcel', // this can be an id of a DOM element or the DOM element itself
  url: base_url+'Upload/dinamico',
  chunk_size: '1mb',
  max_file_count: 1,
  multi_selection: false,
  unique_names: true,
  multipart_params: {
      [csrf.name] : csrf.value,
      tipo        : 0
  },
  //ADD FILE FILTERS HERE
  filters: {max_file_size : '3mb',  mime_types: [ 
    {title: "XLS Archivos", extensions: "xls" }, { title: "XLSX Archivos", extensions: "xlsx" } ,
   ] },
  init: {
      PostInit: function () {
        console.log("post init");
        document.getElementById('aceptarSubirExcel').onclick = function () {
            subirExcel.start();
            return false;
        }
      },
      Error: function(up, err) {
          errordocExcel.innerHTML = "";
          if(err.code == -600)
              errordocExcel.innerHTML = "El máximo tamaño de archivo es de 3mb";
          if(err.code == -601)
              errordocExcel.innerHTML = "El tipo de archivo debe ser .xls o .xlsx";
      },
      Browse: function (up) {
          errordocExcel.innerHTML = "";
          if (up.files.length > 0)
              up.removeFile(up.files[0]);
      },
      FilesAdded: function (up, files) {
        console.log("filesadded")
        console.log(up)
        console.log(files)
          errordocExcel.innerHTML = "";
          switch (nombreDocumentoExcel) {
              case "subirArchivoOperador":
                  subirExcel.settings.multipart_params.tipo = 7;
                  console.log(nombreDocumentoExcel)
                  break;
              case "subirArchivoContenedor":
                  subirExcel.settings.multipart_params.tipo = 8;
                  console.log(nombreDocumentoExcel)
                  break;
              case "subirArchivoTracto":
                  subirExcel.settings.multipart_params.tipo = 9;
                  console.log(nombreDocumentoExcel)
                  break;
              default:
                  subirExcel.settings.multipart_params.tipo = 0;
                  break;
          }
          if (up.files.length > 1){
              up.removeFile(up.files[0]);
          }
          archivoadjunto.innerHTML = up.files[0].name;
          console.log(up.files[0].name)
      },
      UploadProgress: function (up, file) {
          errordocExcel.innerHTML = "";
          var span = document.getElementById('process');
          span.innerHTML = '<a href="#!"> Cargando archivo: ' + file.percent + '%</a>';
      },
      BeforeUpload: function (up, file) {
        console.log("before")
          $(modalExcel).modal('toggle');
      },
      FileUploaded: function (up, file, info) {
        var span = document.getElementById('process');
        span.innerHTML = '';
         console.log("FILERUPLOADED")
          let respuesta = JSON.parse(info.response)
          switch (nombreDocumentoExcel) {
              case "subirArchivoOperador":
                console.log("ultima parte")
                  excelOperador.value = base_url+respuesta.link+'/'+file.target_name;
                  console.log(excelOperador.value)
                  reg.leer_excel()
                 // btnAdjuntarOperador.value = "Actualizar operador"
                  break;
              case "subirArchivoContenedor":
                  excelContenedor.value = base_url+respuesta.link+'/'+file.target_name;
                  console.log(excelContenedor.value)
                  //btnAdjuntarIdentificacion.value = "Actualizar identificación"
                  break;
              case "subirArchivoTracto":
                  excelTractos.value = base_url+respuesta.link+'/'+file.target_name;
                  console.log(excelTractos.value)
                  //btnAdjuntarLicencia.value = "Actualizar licencia"
                  break;
          }
      },
  }
});
subirExcel.init();


  //divOperadoresManual.style.display = "block"
  //divOperadoresExcel.style.display = "none"

  

