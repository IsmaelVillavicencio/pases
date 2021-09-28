<div class="container">
    <div class="row">
        <div class="col-xs-12"><h3>Modificar transporte</h3></div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Placa:</span>
                <input type="text" id="placa" class="form-control" value="" required>
            <span id="errorplaca" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Tipo de placa:</span>
                <select id="tipoPlaca" class="form-control" required></select>
            <span id="errortipoPlaca" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Número de serie:</span>
                <input type="text" id="noSerie" class="form-control" value="" required>
            <span id="errornoSerie" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Número de motor:</span>
                <input type="text" id="noMotor" class="form-control" value="" required>
            <span id="erronoMotor" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Color:</span>
                <select id="color" class="form-control" required></select>
            <span id="errorcolor" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Marca:</span>
                <select id="marca" class="form-control" required></select>
            <span id="errormarca" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Modelo (año):</span>
                <input type="text" id="modelo" class="form-control" value="" required>
            <span id="errormodelo" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Capacidad (toneladas):</span>
                <input type="text" id="capacidad" class="form-control" value="" required>
            <span id="errorcapacidad" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Tipo:</span>
                <select id="tipo" class="form-control" required></select>
            <span id="errortipo" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Número económico:</span>
                <input type="text" id="noEconomico" class="form-control" value="" required>
            <span id="errornoEconomico" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            CAAT:
            <input type="text" id="caat" class="form-control" value="" required>
        </div>
        <div class="col-md-4 col-lg-4 col-xl-3">
            <br>
            <input type="button" class="btn btn-default" id="btnAdjVehiculo" value="Imagen vehículo">
            <span id="errorAdjVehiculo" class="error"></span>
        </div>        
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Tarjeta de circulación:</span>
                <input type="text" id="tarjetaCirculacion" class="form-control" value="" required>
            <span id="errortarjetaCirculacion" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Fecha de expedición:</span>
                <input type="date" id="fechaExp" class="form-control" value="" required>
            <span id="errorfechaExp" class="error"></span>
        </div>
        <div class="col-md-4 col-lg-4 col-xl-3">
            <br>
            <input type="button" class="btn btn-default" id="btnAdjTarjeta" value="Imagen tarjeta">
            <span id="errorAdjTarjeta" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Número de póliza de seguro:</span>
                <input type="text" id="noPolizaSeg" class="form-control" value="" required>
            <span id="errornoPolizaSeg" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Tipo (cobertura):</span>
               <select id="tipoCob" class="form-control" required></select>
            <span id="errortipoCob" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Compañía:</span>
               <select id="compania" class="form-control" required></select>
            <span id="errorcompania" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Fecha de expedición:</span>
                <input type="date" id="fechaExpCob" class="form-control" value="" required>
            <span id="errorfechaExpCob" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Fecha de vencimiento:</span>
                <input type="date" id="fechaVen" class="form-control" value="" required>
            <span id="errorfechaven" class="error"></span>
        </div>
        <div class="col-md-4 col-lg-3 col-xl-3">
            <br>
            <input type="button" class="btn btn-default" id="btnAdjPoliza" value="Imagen póliza">
            <span id="errorAdjPoliza" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-8 col-sm-12">
            <span><span style="color: red;">*</span>Archivos adjuntos:</span>
            <span id="errorarchivosAdj" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-2 col-lg-3 col-xl-2">
            <a href="<?php echo base_url(); ?>Transportes/Ctrl_Transportes/index">
                <input type="button" class="btn btn-default btn-border btn-block" id="btnRegresar" value="Regresar">
            </a>    
        </div>
        <div class="col-md-2 col-lg-3 col-xl-2">
            <input type="button" class="btn btn-primary btn-border btn-block" id="btnGuardar" value="Guardar">
        </div>
    </div>
</div>

<div class="modal" id="modalImgVehiculo" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Equipo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerVehiculo"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntarVehiculo" class="btn btn-sm btn-secondary adjuntarVehiculo">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarVehiculo" data-id="" data-imagen="" style="display:none;">
                        <span id="erroradjuntarVehiculo" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnAceptarAdjuntarVehiculo">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="modalImgTarjeta" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Equipo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerTarjeta"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntarTarjeta" class="btn btn-sm btn-secondary adjuntarTarjeta">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarTarjeta" data-id="" data-imagen="" style="display:none;">
                        <span id="erroradjuntarTarjeta" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnAceptarAdjuntarTarjeta">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="modalImgPoliza" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Equipo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerPoliza"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntarPoliza" class="btn btn-sm btn-secondary adjuntarPoliza">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarPoliza" data-id="" data-imagen="" style="display:none;">
                        <span id="erroradjuntarPoliza" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnAceptarAdjuntarPoliza">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>