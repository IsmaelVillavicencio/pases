<div class="container">
    <div class="row">
        <div class="col-md-12"><h3>Consultar equipo/herramienta</h3></div>
    </div>
    <br>
    <br>
    <div class="row">
        <input type="hidden" id="idequipo" value="0">
        <div class="col-md-4 col-sm-6">
            <span style="color:red">*</span><span>Tipo de equipo:</span>
            <input type="text" id="tipoEquipo" class="lectura reiniciar-equipo" value="" disabled>
            <span id="errortipoEquipo" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span style="color:red">*</span><span>Número de serie:</span>
            <input type="text" id="noSerieEquipo" class="lectura reiniciar-equipo" value="" maxlength="25" disabled>
            <span id="errornoSerieEquipo" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span style="color:red">*</span><span>Modelo:</span>
            <input type="text" id="modeloHerramienta" class="lectura reiniciar-equipo" value="" maxlength="25" disabled>
            <span id="errormodeloHerramienta" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span style="color:red">*</span><span>Marca:</span>
            <input type="text" id="marcaHerramienta" class="lectura reiniciar-equipo" value="" maxlength="25" disabled>
            <span id="errormarcaHerramienta" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6"> 
            <span style="color:red">*</span><span>Tipo de documento:</span>
            <input type="text" id="tipoDocumento" class="lectura reiniciar-equipo" value="" disabled>
            <span id="errortipoDocumento" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span style="color:red">*</span><span>Número de factura:</span>
            <input type="text" id="noFacturaEquipo" class="lectura reiniciar-equipo" value="" maxlength="25" disabled>
            <span id="errornoFacturaEquipo" class="error"></span>
        </div>
        <div class="col-md-4 col-lg-3 col-xl-3">
            <br>
            <input type="button" class="btn btn-light btn-border btn-block mt-3 mt-md-0 mt-lg-0 mt-xl-0" id="btnSubirEquipo" value="Ver documento">
            <span id="errorSubirFacturaEquipo" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-3">
            <a href="<?php echo base_url('Credencializacion/Ctrl_Equipos')?>" class="btn btn-default btn-block mt-3 mt-md-0 mt-lg-0 mt-xl-0">Regresar</a>
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
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="btnAceptarAdjuntarEquipo">Aceptar</button>
            </div>
        </div>
    </div>
</div>