<div class="container">
    <div class="row">
        <div class="col-xs-12"><h3>Modificar chofer</h3></div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            CURP:
            <input type="text" id="curp" class="lectura" value="" disabled>
            <span id="errorcurp" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
			<button class="btn btn-light escanear-camara visible-xs hidden-sm-up hidden-xs-up hidden-md-up">Escanear CURP</button>
			<button class="btn btn-light escanear-escaner hidden-xs hidden-sm-down hidden-md-downk hidden-xl-down mt-md-5">Escanear CURP</button>
		</div>
        <div class="col-md-4 col-sm-6">
            Número de seguro social:
            <input type="text" id="noSeguroSocial" class="lectura" value="" disabled>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Nombre:</span>
                <input type="text" id="nombre" class="form-control" value="" required>
            <span id="errornombre" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Primer apellido:</span>
                <input type="text" id="primerApellido" class="form-control" value="" required>
            <span id="errorprimerApellido" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            Segundo apellido:
            <input type="text" id="segundoApellido" class="form-control" value="" required>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            Fecha de nacimiento:
            <input type="date" id="fechaNacimiento" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>RFC:</span>
                <input type="text" id="rfc" class="form-control" value="" required>
            <span id="errorrfc" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            Fecha de examen médico:
            <input type="date" id="fechaExamen" class="form-control" value="">
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-lg-4 col-xl-3">
            <br>
            <input type="button" class="btn btn-default" id="btnAdjFotoOperador" value="Actualizar foto del operador">
            <span id="errorAdjFotoOperador" class="error"></span>
        </div>  
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Tipo de identificación:</span>
                <select  id="tipoIdentificacion" class="form-control" required></select>
            <span id="errortipoIdentificacion" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6" id="divIneIfe" style="">
            <span><span style="color: red;">*</span>INE/IFE:</span>
                <input type="text" id="ineIfe" class="form-control" value="" required>
            <span id="errorineIfe" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6" id="divPasaporte" style="display:none">
            <span><span style="color: red;">*</span>Pasaporte:</span>
                <input type="text" id="pasaporte" class="form-control" value="" required>
            <span id="errorpasaporte" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Fecha de vencimiento:</span>
                <input type="date" id="fechaVencimientoIdent" class="form-control" value="" required>
            <span id="errorfechaVencimientoIdent" class="error"></span>
        </div>
        <div class="col-md-4 col-lg-4 col-xl-3">
            <br>
            <input type="button" class="btn btn-default" id="btnImgIdent" value="Actualizar identificación">
            <span id="errorImgIdent" class="error"></span>
        </div>  
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Tipo de licencia:</span>
                <select id="tipoLicencia" class="form-control" required></select>
            <span id="errortipoLicencia" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Número de licencia:</span>
                <input type="text" id="noLicencia" class="form-control" value="" required>
            <span id="errornoLicencia" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Fecha de expedición:</span>
                <input type="date" id="fechaExpedicion" class="form-control" value="" required>
            <span id="errorfechaExpedicion" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Fecha de vencimiento:</span>
                <input type="date" id="fechaVencimientoLic" class="form-control" value="" required>
            <span id="errorfechaVencimientoLic" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <br>
            <input type="button" class="btn btn-default" id="btnImgLic" value="Actualizar licencia">
            <span id="errorImgLic" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            Correo electrónico:
            <input type="email" id="correo" class="form-control" value="" required>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Número de teléfono:</span>
                <input type="phone" id="noTelefono" class="form-control" value="" required>
            <span id="errornoTelefono" class="error"></span>
        </div>
        <div class="col-md-2 col-sm-3">
            Enviar correo: <br>
            <input type="checkbox" id="enviarCorreo" value="">
        </div> 
    </div>
    <br><br>
    <div class="row">
        <div class="col-md-2 col-lg-3 col-xl-2">
            <a href="<?php echo base_url(); ?>Transportes/Ctrl_Choferes/index">
                <input type="button" class="btn btn-default btn-border btn-block" id="btnRegresar" value="Regresar">
            </a>    
        </div>
        <div class="col-md-2 col-lg-3 col-xl-2">
            <input type="button" class="btn btn-primary btn-border btn-block" id="btnGuardar" value="Guardar">
        </div>
    </div>
</div>
<div class="modal" id="modalFotoOperador" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Foto del operador</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerFotoOperador"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntarFotoOperador" class="btn btn-sm btn-secondary adjuntarFotoOperador">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarFotoOperador" data-id="" data-imagen="" style="display:none;">
                        <span id="erroradjuntarFotoOperador" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnAceptarAdjuntarFotoOperador">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="modalImgIdent" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Imagen de la identificación:</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerImgIdent"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntarImgIdent" class="btn btn-sm btn-secondary adjuntarImgIdent">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarImgIdent" data-id="" data-imagen="" style="display:none;">
                        <span id="erroradjuntarImgIdent" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnAceptarAdjuntarImgIdent">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="modalImgLic" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Foto del operador</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerImgLic"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntarImgLic" class="btn btn-sm btn-secondary adjuntarImgLic">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarImgLic" data-id="" data-imagen="" style="display:none;">
                        <span id="erroradjuntarImgLic" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnAceptarAdjuntarImgLic">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>