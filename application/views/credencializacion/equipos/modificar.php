<div class="container">
    <div class="row">
        <div class="col-md-12"><h3>Modificar equipo/herramienta</h3></div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Capturar:</span><br><br>
            <input type="radio" id="capturar">Manualmente
            <input type="radio" id="capturar">Subir en excel
            <span id="errorcapturar" style="color: red;display: none;">Campo obligatorio</span>
        </div>
    </div>
    <br>
    <div class="row">
        <input type="hidden" id="idequipo" value="0">
        <div class="col-md-4 col-sm-6">
            <span style="color:red">*</span><span>Tipo de equipo:</span>
            <select id="tipoEquipo" class="form-control reiniciar-equipo" required>
                <option value="">Seleccione</option>
            </select>
            <span id="errortipoEquipo" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span style="color:red">*</span><span>Número de serie:</span>
            <input type="text" id="noSerieEquipo" class="form-control reiniciar-equipo" value="" maxlength="25" required>
            <span id="errornoSerieEquipo" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span style="color:red">*</span><span>Modelo:</span>
            <input type="text" id="modeloHerramienta" class="form-control reiniciar-equipo" value="" maxlength="25" required>
            <span id="errormodeloHerramienta" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span style="color:red">*</span><span>Marca:</span>
            <input type="text" id="marcaHerramienta" class="form-control reiniciar-equipo" value="" maxlength="25" required>
            <span id="errormarcaHerramienta" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6"> 
            <span style="color:red">*</span><span>Tipo de documento:</span>
            <select id="tipoDocumento" class="form-control reiniciar-equipo" required>
                <option value="">Seleccione</option>
            </select>
            <span id="errortipoDocumento" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span style="color:red">*</span><span>Número de factura:</span>
            <input type="text" id="noFacturaEquipo" class="form-control reiniciar-equipo" value="" maxlength="25" required>
            <span id="errornoFacturaEquipo" class="error"></span>
        </div>
        <div class="col-md-4 col-lg-3 col-xl-3">
            <br>
            <input type="button" class="btn btn-light btn-border btn-block mt-3 mt-md-0 mt-lg-0 mt-xl-0" id="btnSubirEquipo" value="Actualizar documento">
            <span id="errorSubirFacturaEquipo" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-3">
            <a href="<?php echo base_url('Credencializacion/Ctrl_Equipos')?>" class="btn btn-default btn-block mt-3 mt-md-0 mt-lg-0 mt-xl-0">Regresar</a>
        </div>
        <div class="col-md-3">
            <input type="button" class="btn btn-primary btn-block mt-3 mt-md-0 mt-lg-0 mt-xl-0" id="btnGuardar" value="Guardar">
        </div>
    </div>
</div>
<div class="modal" id="modalEquipo" role="dialog">
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
                    <div class="col-xs-12" id="pdfViewerEquipo"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntarEquipo" class="btn btn-sm btn-secondary adjuntarEquipo">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarEquipo" data-id="" data-imagen="" style="display:none;">
                        <span id="erroradjuntarEquipo" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="btnAceptarAdjuntarEquipo">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>