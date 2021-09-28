<div class="container">
    <div class="row">
        <div class="col-xs-12"><h3>Consultar citas</h3></div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12 col-md-4 col-sm-6">
            Número de solicitud:
            <input type="text" id="noSolicitud" class="lectura" value="" disabled>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            Entidad:
            <input type="text" id="entidad" class="lectura" value="" disabled>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            Referencia:
            <input type="text" id="referencia" class="lectura" value="" disabled>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12 col-md-4 col-sm-6">
            IMO:
            <input type="text" id="imo" class="lectura" value="" disabled>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            Nombre del buque:
            <input type="text" id="nombreBuque" class="lectura" value="" disabled>
        </div>
        <div class="col-md-3 col-sm-5 col-xs-12 mt-md-5">
            <button class="btn btn-default btn-border btn-block" id="btnDetalleBuque">Detalles del buque</button>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12 col-md-4 col-sm-6">
            Tipo de pase:
            <input type="text"  id="tipoPase" class="lectura" value="" disabled>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            Vigencia por días:
            <input type="number" id="vigencia" class="lectura" value="" disabled>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            Fecha de inicio:
            <input type="date" id="fechaInicio" class="lectura" value="" disabled>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12 col-md-4 col-sm-6">
            Hora de inicio:
            <input type="time" id="horaInicio" class="lectura" value="" disabled>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            Fecha de término:
            <input type="date" id="fechaTermino" class="lectura" value="" disabled>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            Hora de término:
            <input type="time" id="horaTermino" class="lectura" value="" disabled>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12">
            Motivo de ingreso:
            <textarea  id="motivoIngreso" class="lectura" value="" rows="3" disabled></textarea>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12 col-md-4 col-sm-6">
            Recinto:
            <input type="text" id="recinto" class="lectura" value="" disabled>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            Entrada:
            <input type="text" id="entrada" class="lectura" value="" disabled>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            Tipo de contenedor:
            <input type="text"  id="tipoContenedor" class="lectura" value="" disabled>
        </div>
    </div>
    <br>
    <div class="row">
    <div class="col-xs-12 col-md-4 col-sm-6">
            Número de serie contenedor:
            <input type="text" id="noSerieContenedor" class="lectura" value="" disabled>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            Estado contenedor:
            <input type="text" id="estadoContenededor" class="lectura" value="" disabled>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            Tipo de maniobra:
            <input type="text" id="tipoManiobra" class="lectura" value="" disabled>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12 col-md-4 col-sm-6">
            Tipo de producto:
            <input type="text" id="tipoProducto" class="lectura" value="" disabled>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            Peso(KG):
            <input type="number" id="peso" class="lectura" value="" disabled>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            Tipo de despacho:
            <input type="text"  id="tipoDespacho" class="lectura" value="" disabled>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12 col-md-4 col-sm-6">
            Número de transacción:
            <input type="text" id="noTransaccion" class="lectura" value="" disabled>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            Agencia aduanal:
            <input type="text" id="agencia" class="lectura" value="" disabled>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12 col-md-4 col-sm-6">
            Tipo carrusel:<br>
            <input type="checkbox" id="tipoCarrusel" value="" disabled>
        </div>
    </div>
    <br>
    <ul class="nav nav-tabs">
        <li class="nav-item active"><a class="nav-link" id="propiostab" data-orden="1" data-toggle="tab" href="#propios">Propios</a></li>
        <li class="nav-item"><a class="nav-link" id="otrostab" data-orden="2" data-toggle="tab" href="#otros">Otros</a></li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane fade in active" id="propios">
            <div class="row">
                <div class="col-xs-12 table-responsive">
                    <table id="tabPropios" class="table table-striped table-bordered" style="width:100%">
                        <thead class="Tabla">
                            <tr>
                                <th width=20%>Número de placa</th>
                                <th width=25%>Operador</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="otros">
            <div class="row">
                <div class="col-xs-12 table-responsive">
                    <table id="tabTransportista" class="table table-striped table-bordered" style="width:100%">
                        <thead class="Tabla">
                            <tr>
                                <th width=60%>Transportista</th>
                                <th width=30%>Cantidad de tractos</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <br><br>
    <div class="row">
        <div class="col-md-2 col-lg-3 col-xl-2">
            <a href="<?php echo base_url(); ?>Transportes/Ctrl_CitasTerminal">
                <input type="button" class="btn btn-default btn-border btn-block" id="btnRegresar" value="Regresar">
            </a>    
        </div>
    </div>
</div>
    

<div class="modal" id="modalDetalleBuque" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Detalles del buque</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;
                </button>
            </div>
            <div class="modal-body">
                    <div class="row">
                        <div class="col-xs-12 col-md-6 col-sm-6">
                            IMO:
                            <input type="text" id="imoMod" class="lectura" value="" disabled>
                        </div>
                        <div class="col-xs-12 col-md-6 col-sm-6">
                            Nombre del buque:
                            <input type="text" id="nombreBuqueMod" class="lectura" value="" disabled>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-xs-12 col-md-6 col-sm-6">
                            Fecha de arribo:
                            <input type="date" id="fechaArriboMod" class="lectura" value="" disabled>
                        </div>
                        <div class="col-xs-12 col-md-6 col-sm-6">
                            Inicio de operaciones:
                            <input type="date" id="iniOperMod" class="lectura" value="" disabled>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-xs-12 col-md-6 col-sm-6">
                            Término de operaciones:
                            <input type="date" id="terOperMod" class="lectura" value="" disabled>
                        </div>
                        <div class="col-xs-12 col-md-6 col-sm-6">
                            Producto:
                            <input type="text" id="productoMod" class="lectura" value="" disabled>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-xs-12 col-md-6 col-sm-6">
                            Tramo:
                            <input type="text" id="tramoMod" class="lectura" value="" disabled>
                        </div>
                        <div class="col-xs-12 col-md-6 col-sm-6">
                            Cantidad de contenedores:
                            <input type="text" id="cantConteMod" class="lectura" value="" disabled>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-xs-12 col-md-6 col-sm-6">
                            Tipo de tráfico:
                            <input type="text" id="tipoTraficoMod" class="lectura" value="" disabled>
                        </div>
                    </div>
                </div>           
        </div>
    </div>
</div>



