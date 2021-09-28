var DTOperadores, DTContenedores, DTVehiculos, DTTractos
var datosOperadores = []
var datosContenedores = []
//var datosVehiculos = []
var datosTractos = []

//scanner CURP

let QrScanner
import('../../librerias/QRScanner/qr-scanner.min.js').then((module) => {
    QrScanner = module.default;
    QrScanner.WORKER_PATH = '../../assets/librerias/QRScanner/qr-scanner-worker.min.js';
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
    this.obtener_datos_generales();
    this.obtener_datos_operadores();
    //this.obtener_datos_contenedores();
    //this.obtener_datos_vehiculos();
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
      DTTractos = $(tabTractos).DataTable( {
        "language": {
        "url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
        "order": []
          });
    /* DTVehiculos = $(tabVehiculo).DataTable( {
  "language": {
  "url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
  },
  "order": []
    });*/
    agregarOperador.addEventListener('click',this.agregar_operador)
    agregarContenedor.addEventListener('click',this.agregar_contenedor)
    //agregarVehiculo.addEventListener('click',this.agregar_vehiculo)
    agregarTracto.addEventListener('click',this.agregar_tracto)
    confirmar_guardar.addEventListener('click',this.guardar)
    guardar.addEventListener('click',this.validar_guardar)
    fotoOperador.addEventListener('click',this.ver_imagen)
    fotoIdentificacion.addEventListener('click',this.ver_imagen)
    fotoLicencia.addEventListener('click',this.ver_imagen)
    imagenFactura.addEventListener('click',this.ver_imagen)
    consultarFotos.addEventListener('click',this.ver_imagen)
    //fotovigenciaCaat.addEventListener('click',this.ver_imagen)
    fotoTarjetaCirculacion.addEventListener('click',this.ver_imagen)
    fotoPolizaTracto.addEventListener('click',this.ver_imagen)

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
   /* vehiculosManual.addEventListener('click',(ev)=>{
      divVehiculosManual.style.display = "block"
      divVehiculosExcel.style.display = "none"
    })
    vehiculosExcel.addEventListener('click',(ev)=>{
      divVehiculosManual.style.display = "none"
      divVehiculosExcel.style.display = "block"
    })*/
    tractosManual.addEventListener('click',(ev)=>{
      divTractosManual.style.display = "block"
      divTractosExcel.style.display = "none"
    })
    tractosExcel.addEventListener('click',(ev)=>{
      divTractosManual.style.display = "none"
      divTractosExcel.style.display = "block"
    })
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
    $.ajax({
     // url: url ,
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
      }
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

    $.ajax({
      //  url: url ,
        type: 'POST',
        dataType: 'json',
        data: {
            
        },
        beforeSend: function(){
            
        },
        success: function(response){
           
        }
      })
    
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

function ajuste_altura_modal(mouseEvent) {
  let alturaHeader = 0;
  if (document.body.scrollWidth < 734) {
      alturaHeader = 220;
  } else if (document.body.scrollWidth < 958) {
      alturaHeader = 250;
  } else {
      alturaHeader = 200;
  }
  return (mouseEvent.clientY - mouseEvent.screenY + alturaHeader) + "px";
}

//Debe cambiar porque se llenará el select
function setResult(result) {
  scanner.stop();
  datosEscaneados = result.split("]");
  curp.value = datosEscaneados[0]
  nombre.value = datosEscaneados[4]
  primerApellido.value = datosEscaneados[2]
  segundoApellido.value = datosEscaneados[3]
  $("#modalEscanerCURP").modal("hide");
}