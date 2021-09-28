<div class="container">
    <div class="row">
        <div class="col-xs-12"><h3>Registrar citas</h3></div>
    </div>
    <br>
    <div class="row">
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
            <span><span style="color:red;">*</span>IMO:</span>
                <input type="number" id="imo" class="form-control caracteres_validos_numericos" value="" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==7) return false;" required>
            <span id="errorimo" class="error"></span>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <span><span style="color:red;">*</span>Nombre del buque:</span>
                <input type="text" id="nombreBuque" class="form-control caracteres_validos" value="" required>
            <span id="errornombreBuque" class="error"></span>
        </div>
        <div class="col-md-3 col-sm-5 col-xs-12 mt-md-5">
            <button class="btn btn-default btn-border btn-block" id="btnDetalleBuque">Detalles del buque</button>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12 col-md-4 col-sm-6">
            Tipo de pase:
            <input type="text"  id="tipoPase" class="lectura" value="Transporte de carga" disabled>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <span><span style="color:red;">*</span>Vigencia por días:</span>
                <input type="number" id="vigencia" class="form-control caracteres_validos_numericos" value="" pattern="/^-?\d+\.?\d*$/" required>
            <span id="errorvigencia" class="error"></span>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <span><span style="color:red;">*</span>Fecha de inicio:</span>
                <input type="date" id="fechaInicio" class="form-control" value="" min="<?php echo date("Y-m-d")?>" required>
            <span id="errorfechaInicio" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12 col-md-4 col-sm-6">
            <span><span style="color:red;">*</span>Hora de inicio:</span>
                <input type="time" id="horaInicio" class="form-control" value="" required>
            <span id="errorhoraInicio" class="error"></span>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            Fecha de término:
            <input type="date" id="fechaTermino" class="lectura" min="<?php echo date('Y-m-d')?>" value="" disabled>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <span><span style="color:red;">*</span>Hora de término:</span>
                <input type="time" id="horaTermino" class="form-control" value="" required>
            <span id="errorhoraTermino" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12">
            <span><span style="color:red;">*</span>Motivo de ingreso:</span>
                <textarea  id="motivoIngreso" class="form-control" value="" rows="3" maxlength="500" required></textarea>
            <span id="errormotivoIngreso" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12 col-md-4 col-sm-6">
            <span><span style="color:red;">*</span>Recinto:</span>
                <select id="recinto" class="form-control" required></select>
            <span id="errorrecinto" class="error"></span>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <span><span style="color:red;">*</span>Entrada:</span>
                <select id="entrada" class="form-control" required></select>
            <span id="errorentrada" class="error"></span>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            Tipo de contenedor:
            <select  id="tipoContenedor" class="form-control"></select>
        </div>
    </div>
    <br>
    <div class="row">
    <div class="col-xs-12 col-md-4 col-sm-6">
            Número de serie contenedor:
            <input type="text" id="noSerieContenedor" class="form-control" value="">
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <span><span style="color:red;">*</span>Estado contenedor:</span>
                <select id="estadoContenededor" class="form-control" required></select>
            <span id="errorestadoContenededor" class="error"></span>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <span><span style="color:red;">*</span>Tipo de maniobra:</span>
                <select id="tipoManiobra" class="form-control" required></select>
            <span id="errortipoManiobra" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12 col-md-4 col-sm-6">
            <span><span style="color:red;">*</span>Tipo de producto:</span>
                <select id="tipoProducto" class="form-control" required></select>
            <span id="errortipoProducto" class="error"></span>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            Peso(KG):
            <input type="number" id="peso" class="form-control caracteres_validos_numericos" pattern="/^-?\d+\.?\d*$/" value="">
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            Tipo de despacho:
            <select  id="tipoDespacho" class="form-control"></select>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12 col-md-4 col-sm-6">
            Número de transacción:
            <input type="text" id="noTransaccion" class="form-control" value="">
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <span><span style="color:red;">*</span>Agencia aduanal:</span>
                <select id="agencia" class="form-control" required></select>
            <span id="erroragencia" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12 col-md-4 col-sm-6">
            Tipo carrusel:<br>
            <input type="checkbox" id="tipoCarrusel" value="">
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12 col-md-4 col-sm-6">
            <span><span style="color:red;">*</span>Transportista:</span>
                <select id="transportista" class="form-control campos-listado">
                    <option value="">Seleccione</option>
                    <option value="0">Propios</option>
                    <option value="1">Lorem Ipsum Dolor Sit</option>
                </select>
            <span id="errortransportista" class="error"></span>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6" id="divCantidadTractos" style="display:none;">
            <span><span style="color:red;">*</span>Cantidad de tractos:</span>
                <input type="number" id="cantidadTractos" class="form-control campos-listado caracteres_validos_numericos" pattern="/^-?\d+\.?\d*$/" value="">
            <span id="errorcantidadTractos" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12 col-md-4 col-sm-6" id="divNoPlaca" style="display:none;">
            <span><span style="color:red;">*</span>Número de placa:</span>
                <input type="text" id="noPlaca" class="form-control campos-listado" value="">
            <span id="errornoPlaca" class="error"></span>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6" id="divOperador" style="display:none;">
            <span><span style="color:red;">*</span>Operador:</span>
                <select id="operador" class="form-control campos-listado">
                    <option value="">Seleccione</option>
                    <option value="1">Lorem Ipsum Dolor Sit</option>
                    <option value="2">Lorem Dolor  Sit</option>
                </select>
            <span id="erroroperador" class="error"></span>
        </div>
        <div class="col-md-1 col-lg-1 col-xl-1">
            <br>
            <input type="button" class="btn btn-default" id="btnAgregar" value="+">
        </div> 
    </div>
    <br>
    <div class="row">
        <div class="col-md-12">
            <span id="errorDatos" class="error"></span>
        </div>
    </div>
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
                                <th width=10%>Acciones</th>
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
                                <th width=10%>Acciones</th>
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
        <div class="col-md-2 col-lg-3 col-xl-2">
            <input type="button" class="btn btn-primary btn-border btn-block" id="btnGuardar" value="Guardar">
        </div>
    </div>
</div>
    

<div class="modal" id="modalDetalleBuque" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Detalles del buque</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
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



