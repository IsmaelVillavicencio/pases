<div class="container">
    <div class="row">
        <div class="col-xs-12"><h3>Registrar chofer</h3></div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12">
            <span><span style="color: red;">*</span>Capturar:</span>
            <span id="errorcapturar" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-2 col-sm-6">
            <input type="radio" name="capturar" value="" checked>Manualmente
        </div>
        <div class="col-md-2 col-sm-6">
            <a href="<?php echo base_url();?>Transportes/Ctrl_Choferes/registrar_excel">
                <input type="radio" name="capturar" value="">
            </a>Subir en excel
        </div> 
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>CURP:</span>
                <input type="text" id="curp" class="form-control upper " value="" maxlength="18" required>
            <span id="errorcurp" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
			<button class="btn btn-light escanear-camara visible-xs hidden-sm-up hidden-xs-up hidden-md-up">Escanear CURP</button>
			<button class="btn btn-light escanear-escaner hidden-xs hidden-sm-down hidden-md-downk hidden-xl-down mt-md-5">Escanear CURP</button>
		</div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Número de seguro social:</span>
            <input type="number" id="noSeguroSocial" class="form-control longitud-exacta"  pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==11) return false;" data-longitud="11" value="" required>
            <span id="errornoSeguroSocial" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Nombre:</span>
                <input type="text" id="nombre" class="form-control caracteres_validos" value="" maxlength="50" required>
            <span id="errornombre" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Primer apellido:</span>
                <input type="text" id="primerApellido" class="form-control caracteres_validos" value="" maxlength="50" required>
            <span id="errorprimerApellido" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            Segundo apellido:
            <input type="text" id="segundoApellido" class="form-control caracteres_validos" value="" maxlength="50">
            <span id="errorsegundoApellido" class="error"></span>
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
                <input type="text" id="rfc" class="form-control upper" value="" maxlength="13" required>
            <span id="errorrfc" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Fecha de examen médico:</span>
            <input type="date" id="fechaExamen" class="form-control" value="" min="<?php echo date('Y-m-d')?>" required>
            <span id="errorfechaExamen" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-lg-4 col-xl-3">
            <br>
            <input type="button" class="btn btn-default" id="btnAdjuntarOperador" value="Subir operador">
            <span id="errorbtnAdjuntarOperador" class="error"></span>
            <br><span id="processbtnAdjuntarOperador" class="info"></span>
        </div>  
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Tipo de identificación:</span>
                <select  id="tipoIdentificacion" class="form-control" required></select>
            <span id="errortipoIdentificacion" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6" id="divClaveElector" style="display:none;">
            Clave de elector:
                <input type="text" id="claveElector" class="form-control" maxlength="18" value="">
            <span id="errorclaveElector" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6" id="divPasaporte" style="display:none">
            Pasaporte:
                <input type="text" id="pasaporte" class="form-control" maxlength="12" value="">
            <span id="errorpasaporte" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6" id="divNumIdentidad" style="display:none">
            Número único de identidad:
                <input type="text" id="numeroIdentidad" class="form-control" maxlength="15" value="">
            <span id="errornumeroIdentidad" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Fecha de vencimiento:</span>
                <input type="date" id="fechaVencimientoIdent" class="form-control" value="" min="<?php echo date("Y-m-d",strtotime(date('Y-m-d')."+ 1 days"))?>" required>
            <span id="errorfechaVencimientoIdent" class="error"></span>
        </div>
        <div class="col-md-4 col-lg-4 col-xl-3">
            <br>
            <input type="button" class="btn btn-default" id="btnAdjuntarIdentificacion" value="Subir identificación">
            <span id="errorbtnAdjuntarIdentificacion" class="error"></span>
            <br><span id="processbtnAdjuntarIdentificacion" class="info"></span>
        </div>  
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Tipo de licencia:</span>
                <select id="tipoLicencia" class="form-control" required>
                    <option value="">Seleccione</option>
                    <option value="1">Chofer clase 1</option>
                    <option value="2">Chofer clase 2</option>
                    <option value="3">Tipo A</option>
                    <option value="4">Tipo B</option>
                    <option value="5">Tipo C</option>
                    <option value="6">Tipo D</option>
                    <option value="7">Tipo E</option>
                    <option value="8">Tipo F</option>
                </select>
            <span id="errortipoLicencia" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Número de licencia:</span>
                <input type="number" id="noLicencia" class="form-control longitud-exacta" value="" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==6) return false;" data-longitud="6" required>
            <span id="errornoLicencia" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Fecha de expedición:</span>
                <input type="date" id="fechaExpedicion" class="form-control" value="" max="<?php echo date('Y-m-d')?>" required>
            <span id="errorfechaExpedicion" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Fecha de vencimiento:</span>
                <input type="date" id="fechaVencimientoLic" class="form-control" value="" min="<?php echo date("Y-m-d",strtotime(date('Y-m-d')."+ 1 days"))?>" required>
            <span id="errorfechaVencimientoLic" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <br>
            <input type="button" class="btn btn-default" id="btnAdjuntarLicencia" value="Subir licencia">
            <span id="errorbtnAdjuntarLicencia" class="error"></span>
            <br><span id="processbtnAdjuntarLicencia" class="info"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Correo electrónico:</span>
            <input type="email" id="correo" class="form-control" value="" required>
            <span id="errorcorreo" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span><span style="color: red;">*</span>Número de teléfono:</span>
            <input type="number" id="noTelefono" class="form-control longitud-exacta" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==10) return false;" data-longitud="10" value="" required>
            <span id="errornoTelefono" class="error"></span>
        </div>
        <div class="col-md-2 col-sm-3">
            Enviar correo: <br>
            <input type="checkbox" id="enviarCorreo" value="">
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
        <div class="col-md-12 table-responsive">
            <table id="tabChoferes" class="table table-striped table-bordered" style="width:100%">
                <thead class="Tabla">
                    <tr>
                        <th width=20%>CURP</th>
                        <th width=30%>Nombre</th>
                        <th width=15%>Tipo de licencia</th>
                        <th width=15%>Número de licencia</th>
                        <th width=10%>Acciones</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
    <br>
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
                <input type="hidden" id="fotografiaOperador" value="">
                <input type="hidden" id="fotografiaIdentificacion" value="">
                <input type="hidden" id="fotografiaLicencia" value="">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewer"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntar" class="btn btn-sm btn-secondary">Seleccionar archivo</label>
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