<div class="container">
    <div class="row">
        <div class="col-xs-12"><h3>Consultar chofer</h3></div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            CURP:
            <input type="text" id="curp" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            Número de seguro social:
            <input type="text" id="noSeguroSocial" class="lectura" value="" disabled>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            Nombre:
            <input type="text" id="nombre" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            Primer apellido:
            <input type="text" id="primerApellido" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            Segundo apellido:
            <input type="text" id="segundoApellido" class="lectura" value="" disabled>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            Fecha de nacimiento:
            <input type="date" id="fechaNacimiento" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            RFC:
            <input type="text" id="rfc" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            Fecha de examen médico:
            <input type="date" id="fechaExamen" class="lectura" value="" disabled>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-lg-4 col-xl-3">
            <br>
            <input type="button" class="btn btn-default" id="btnAdjFotoOperador" value="Ver foto del operador">
        </div>  
        <div class="col-md-4 col-sm-6">
            Tipo de identificación:
            <input type="text" id="tipoIdentificacion" class="lectura" value="" disabled>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6" id="divIneIfe" style="">
            INE/IFE:
            <input type="text" id="ineIfe" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6" id="divPasaporte" style="display:none">
            Pasaporte:
            <input type="text" id="pasaporte" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            Fecha de vencimiento:
            <input type="date" id="fechaVencimientoIdent" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-lg-4 col-xl-3">
            <br>
            <input type="button" class="btn btn-default" id="btnImgIdent" value="Ver identificación">
        </div>  
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            Tipo de licencia:
            <input type="text" id="tipoLicencia" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            Número de licencia:
            <input type="text" id="noLicencia" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            Fecha de expedición:
            <input type="date" id="fechaExpedicion" class="lectura" value="" disabled>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            Fecha de vencimiento:
            <input type="date" id="fechaVencimientoLic" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            <br>
            <input type="button" class="btn btn-default" id="btnImgLic" value="Ver licencia">
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            Correo electrónico:
            <input type="email" id="correo" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            Número de teléfono:
                <input type="phone" id="noTelefono" class="lectura" value="" disabled>
        </div>
    </div>
    <br><br>
    <div class="row">
        <div class="col-md-2 col-lg-3 col-xl-2">
            <a href="<?php echo base_url(); ?>Transportes/Ctrl_Choferes/index">
                <input type="button" class="btn btn-default btn-border btn-block" id="btnRegresar" value="Regresar">
            </a>    
        </div>
    </div>
</div>
<div class="modal" id="modalFotoOperador" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Foto del operador</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerFotoOperador"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntarFotoOperador" class="btn btn-sm btn-secondary adjuntarFotoOperador">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarFotoOperador" data-id="" data-imagen="" style="display:none;">
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
                	<span aria-hidden="true">&times;
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerImgIdent"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntarImgIdent" class="btn btn-sm btn-secondary adjuntarImgIdent">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarImgIdent" data-id="" data-imagen="" style="display:none;">
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
                	<span aria-hidden="true">&times;
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerImgLic"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntarImgLic" class="btn btn-sm btn-secondary adjuntarImgLic">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarImgLic" data-id="" data-imagen="" style="display:none;">
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