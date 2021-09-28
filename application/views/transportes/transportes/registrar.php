<div  id="v_registro" class="container" >
    <div class="row" id="manual">
        <div class="col-xs-12"><h3>Registrar transporte</h3></div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12">
            <span><span style="color: red;">*</span> Capturar: </span>
            <span id="errorcapturar" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
    
        <div class="col-md-2 col-sm-6">
            <input type="radio" name="capturar" value="1" checked>Manualmente
        </div>
        <div class="col-md-2 col-sm-6">
            <a href="<?php echo base_url();?>Transportes/Ctrl_Transportes/registrar_excel">
                <input type="radio" name="capturar" value="2">
            </a>Subir en excel
        </div> 
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Placa:</span>
                <input type="text" id="placa" class="form-control longitud" value="" maxlength="10" data-longitud="10" required>
            <span id="errorplaca" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Tipo de placa:</span>
                <select id="tipoPlaca" class="form-control" required></select>
            <span id="errortipoPlaca" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Número de serie:</span>
                <input type="text" id="noSerie" class="form-control longitud-exacta" value="" maxlength="17" data-longitud="17" required>
            <span id="errornoSerie" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Número de motor:</span>
                <input type="text" id="noMotor" class="form-control" value="" maxlength="10" required>
            <span id="errornoMotor" class="error"></span>
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
            <input type="number" id="modelo" class="form-control longitud-exacta" value="" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==4) return false;" data-longitud="4" required>
            <span id="errormodelo" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Capacidad (toneladas):</span>
                <input type="number" id="capacidad" class="form-control longitud" value="" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==4) return false;" data-longitud="4" required>
            <span id="errorcapacidad" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Tipo:</span>
                <select id="tipoTracto" class="form-control" required></select>
            <span id="errortipoTracto" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Número económico:</span>
                <input type="text" id="noEconomico" class="form-control longitud" value="" maxlength="10" data-longitud="10" required>
            <span id="errornoEconomico" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            CAAT:
            <input type="text" id="caat" class="form-control" value="" required>
            <span id="errorcaat" class="error"></span>
        </div>
        <div class="col-md-4 col-lg-4 col-xl-3">
            <br>
            <input type="button" class="btn btn-default" id="btnAdjuntarVehiculo" value="Subir vehículo">
            <span id="errorbtnAdjuntarVehiculo" class="error"></span>
            <br><span id="processbtnAdjuntarVehiculo" class="info"></span>
        </div>        
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Tarjeta de circulación:</span>
                <input type="text" id="tarjetaCirculacion" class="form-control longitud" value="" maxlength="20" data-longitud="20" required>
            <span id="errortarjetaCirculacion" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Fecha de expedición:</span>
                <input type="date" id="fechaExpTarCirc" class="form-control" value="" max="<?php echo date('Y-m-d')?>" required>
            <span id="errorfechaExpTarCirc" class="error"></span>
        </div>
        <div class="col-md-4 col-lg-4 col-xl-3">
            <br>
            <input type="button" class="btn btn-default" id="btnAdjuntarTarjeta" value="Subir tarjeta">
            <span id="errorbtnAdjuntarTarjeta" class="error"></span>
            <br><span id="processbtnAdjuntarTarjeta" class="info"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Número de póliza de seguro:</span>
                <input type="text" id="noPolizaSeg" class="form-control longitud" value="" maxlength="20" data-longitud="20" required>
            <span id="errornoPolizaSeg" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Tipo (cobertura):</span>
               <select id="tipoCobertura" class="form-control" required></select>
            <span id="errortipoCobertura" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Compañía:</span>
               <select id="tipoAseguradora" class="form-control" required></select>
            <span id="errortipoAseguradora" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Fecha de expedición:</span>
                <input type="date" id="fechaExpPoliza" class="form-control" value="" max="<?php echo date('Y-m-d')?>" required>
            <span id="errorfechaExpPoliza" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Fecha de vencimiento:</span>
                <input type="date" id="fechaVencPoliza" class="form-control" value="" min="<?php echo date("Y-m-d",strtotime(date('Y-m-d')."+ 1 days"))?>" required>
            <span id="errorfechaVencPoliza" class="error"></span>
        </div>
        <div class="col-md-3 col-lg-3 col-xl-3">
            <br>
            <input type="button" class="btn btn-default" id="btnAdjuntarPoliza" value="Subir póliza">
            <span id="errorbtnAdjuntarPoliza" class="error"></span>
            <br><span id="processbtnAdjuntarPoliza" class="info"></span>
        </div>
        <div class="col-md-1 content" style="padding-top:2px">
            <br>
            <button class="btn btn-light btn-border" id="btnAgregar">+</button>
        </div>
    </div>
    <br><br>
    <div class="row">
        <div class="col-md-12">
            <span id="errorDatos" class="error"></span>
        </div>
        <div class="col-md-12 table-responsive">
            <table id="tabTransportes" class="table table-striped table-bordered" style="width:100%">
                <thead class="Tabla">
                    <tr>
                        <th width=10%>Placas</th>
                        <th width=15%>Número de serie</th>
                        <th width=15%>Marca</th>
                        <th width=15%>Tipo de vehículo</th>
                        <th width=20%>Propietario</th>
                        <th width=10%>Acciones</th>
                    </tr>
                </thead>
            </table>
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

<div class="modal" id="modalAdjuntar" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tituloAdjuntar"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="fotografiaVehiculo" value="">
                <input type="hidden" id="fotografiaTarjeta" value="">
                <input type="hidden" id="fotografiaPoliza" value="">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewer"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntar" class="btn btn-sm btn-secondary adjuntar">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png, application/pdf" id="adjuntar" data-executa="" style="display:none;">
                        <span id="erroradjuntar" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnAceptarAdjuntar">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>