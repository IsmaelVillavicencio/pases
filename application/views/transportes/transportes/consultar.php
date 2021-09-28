<div class="container">
    <div class="row">
        <div class="col-xs-12"><h3>Consultar transporte</h3></div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            Placa:
            <input type="text" id="placa" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            Tipo de placa:
            <input type="text" id="tipoPlaca" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            Número de serie:
            <input type="text" id="noSerie" class="lectura" value="" disabled>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            Número de motor:
            <input type="text" id="noMotor" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            Color:
            <input type="text" id="color" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            Marca:
            <input type="text" id="marca" class="lectura" value="" disabled>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            Modelo (año):
            <input type="text" id="modelo" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            Capacidad (toneladas):
            <input type="text" id="capacidad" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            Tipo:
            <input type="text" id="tipo" class="lectura" value="" disabled>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            Número económico:
            <input type="text" id="noEconomico" class="lectura" value="" disabled>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            CAAT:
            <input type="text" id="caat" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-lg-4 col-xl-3">
            <br>
            <input type="button" class="btn btn-default" id="btnAdjVehiculo" value="Ver imagen vehículo">
        </div>        
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            Tarjeta de circulación:
            <input type="text" id="tarjetaCirculacion" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            Fecha de expedición:
            <input type="date" id="fechaExp" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-lg-4 col-xl-3">
            <br>
            <input type="button" class="btn btn-default" id="btnAdjTarjeta" value="Ver imagen tarjeta">
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            Número de póliza de seguro:
            <input type="text" id="noPolizaSeg" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            Tipo (cobertura):
            <input type="text" id="tipoCob" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            Compañía:
            <input type="text" id="compania" class="lectura" value="" disabled>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            Fecha de expedición:
            <input type="date" id="fechaExpCob" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            Fecha de vencimiento:
            <input type="date" id="fechaVen" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-lg-3 col-xl-3">
            <br>
            <input type="button" class="btn btn-default" id="btnAdjPoliza" value="Ver imagen póliza">
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-12">
            Archivos adjuntos:
            <br>
            <input type="button" class="btn btn-default" id="btnAdjuntos" value="Ver archivos">
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-2 col-lg-3 col-xl-2">
            <a href="<?php echo base_url(); ?>Transportes/Ctrl_Transportes/index">
                <input type="button" class="btn btn-default btn-border btn-block" id="btnRegresar" value="Regresar">
            </a>    
        </div>
    </div>
</div>

<div class="modal" id="modalImgVehiculo" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Equipo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerVehiculo"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntarVehiculo" class="btn btn-sm btn-secondary adjuntarVehiculo">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarVehiculo" data-id="" data-imagen="" style="display:none;">
        
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
                	<span aria-hidden="true">&times;
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerTarjeta"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntarTarjeta" class="btn btn-sm btn-secondary adjuntarTarjeta">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarTarjeta" data-id="" data-imagen="" style="display:none;">
        
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
                	<span aria-hidden="true">&times;
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerPoliza"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntarPoliza" class="btn btn-sm btn-secondary adjuntarPoliza">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarPoliza" data-id="" data-imagen="" style="display:none;">
        
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