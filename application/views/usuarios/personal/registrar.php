<div class="container">
    <div class="row">
        <div class="col-xs-12"><br><br><h3>Registrar personal ejecutivo</h3></div>
    </div>
    <div class="row">
        <div class="col-xs-12"><br><h5><b>Datos generales</b></h5></div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>
            <span class="required">*</span><span> Puesto:</span>
            <select id="selPuesto" class="form-control validar"></select>
            <span id="errorselPuesto"style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>
            <span class="required">*</span><span> Área:</span>
            <select id="selArea" class="form-control validar"></select>
            <span id="errorselArea" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-4 v-collapse-to-lg"></div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>
            <span class="required">*</span><span> CURP:</span>
            <input type="text" class="form-control validar" maxlength="18" id="curp">
            <span id="errorcurp" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
			<br>
			<button class="btn btn-light escanear-camara visible-xs hidden-sm-up hidden-xs-up hidden-md-up">Escanear CURP</button>
			<button class="btn btn-light escanear-escaner hidden-xs hidden-sm-down hidden-md-downk hidden-xl-down mt-md-5">Escanear CURP</button>
		</div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>
            <span class="required">*</span><span> Grado profesional:</span>
            <select id="selDenominacion" class="form-control validar"></select>
            <span id="errorselDenominacion" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>
            <span class="required">*</span><span> Nombre:</span>
            <input type="text" class="form-control validar letra" id="nombre" value="">
            <span id="errornombre" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>
            <span class="required">*</span><span> Primer apellido:</span>
            <input type="text" class="form-control validar letra" id="primer_apellido" value="">
            <span id="errorprimer_apellido" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Segundo apellido:
            <input type="text" class="form-control letra" id="segundo_apellido" value="">
            <span id="errorsegundo_apellido"style="color:red; display:none;">Formato incorrecto</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>
            <span class="required">*</span><span> Fecha de nacimiento:</span>
            <input type="date" id="fechaNacimiento" class="form-control validar" value="" readonly>
            <span id="errorfechaNacimiento" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>
            <span class="required">*</span><span> Edad:</span>
            <input type="number" id="edad" class="form-control validar" value="" readonly>
            <span id="erroredad" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>
            <span class="required">*</span><span> Sexo:</span>
            <input type="text" id="sexo" class="form-control validar" value="" readonly>
            <span id="errorsexo" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>
            <span class="required">*</span><span> Nacionalidad:</span>
            <select id="selNacionalidad" class="form-control validar" disabled></select>
            <span id="errorselNacionalidad" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>
            <span class="required">*</span><span> Estado de nacimiento:</span>
            <select id="estadonacimiento" class="form-control validar"></select>
            <span id="errorestadonacimiento" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>
            <span class="required">*</span><span> Ciudad de nacimiento:</span>
            <!--<input type="text" class="form-control validar" id="ciudadnacimiento" value="">-->
            <select class="form-control validar" id="ciudadnacimiento">
                <option value="">Seleccione</option>
            </select>
            <span id="errorciudadnacimiento" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Tipo de sangre:
            <select id="tipoSangre" class="form-control"></select>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12"><br><br><h5><b>Domicilio</b></h5></div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>
            <span class="required">*</span><span> Código postal:</span>
            <input type="number" id="codigoPostal" class="form-control validar" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==5) return false;" value="" required>
            <span id="errorcodigoPostal" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>
            <span class="required">*</span><span> Estado:</span>
            <input type="text" id="estado" class="form-control validar" value="" required disabled>
            <span id="errorestado" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>
            <span class="required">*</span><span> Municipio:</span>
            <input type="text" id="municipio" class="form-control validar" value="" required disabled>
            <span id="errormunicipio" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>
            <span class="required">*</span><span> Colonia:</span>
            <select id="selColonia" class="form-control validar" required>
                <option value="">Seleccione</option>
            </select>
            <span id="errorselColonia" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>
            <span class="required">*</span><span> Calle:</span>
            <input type="text" id="calle" class="form-control validar espe" value="" required>
            <span id="errorcalle" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-md-2 col-sm-3">
            <br>
            <span class="required">*</span><span> No. Exterior:</span>
            <input type="number" id="noExterior" class="form-control validar" value="" required>
            <span id="errornoExterior" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-md-2 col-sm-3">
            <br>No. Interior:
            <input type="number" id="noInterior" class="form-control" value="" required>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Entre calle 1:
            <input type="text" id="entreCalle1" class="form-control espe" value="" required>
            <span id="errorentreCalle1" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Entre calle 2:
            <input type="text" id="entreCalle2" class="form-control espe" value="" required>
            <span id="errorentreCalle2" style="color:red; display:none;">Campo obligatorio</span>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12"><br><br><h5><b>Datos de contacto</b></h5></div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Correo electrónico:</span>
            <div class="input-group">
                <input type="email" id="correoElectronico" class="form-control validar" value="">
                <div class="input-group-prepend" style="display:none;" id="loadingValidar">
                    <span class="input-group-text">
                        <div class="spinner-border spinner-border-sm" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </span>
                </div>
            </div>
            <span id="errorcorreoElectronico" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>
            <span class="required">*</span><span> Número de teléfono:</span>
            <input type="number" id="numTelefono" class="form-control validar" value="" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==10) return false;">
            <span id="errornumTelefono" style="color:red; display:none;">Campo obligatorio</span>
            <span id="errornumTelefonoLongitud" style="color:red; display:none;">Longitud no valida</span>
        </div>
    </div>
    <br><br>
    <div class="row">
        <div class="col-xs-12">
            <br>
            <input type="button" class="btn btn-default" id="btnRegresar" value="Regresar">
            <input type="button" class="btn btn-primary" id="btnGuardar" value="Guardar">
        </div>
    </div>
</div>
<div class="modal" id="modalEscanerCURP" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Escaneo QR de la CURP</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
				<div class="hidden-xs hidden-sm-down hidden-md-downk hidden-xl-down">
					<div class="row">
						<div class="col-md-12">
							<video class="col-md-12" id="qr-video"></video>
						</div>
					</div>
					<div class="row">
						<b>Estado de escaneo de QR: </b>
						<span id="cam-qr-result">No permitido</span>
					</div>
				</div>
				<div class="visible-xs hidden-sm-up hidden-xs-up hidden-md-up">
					<div class="row mt-4">
						<div class="col-md-12">
							<label>Realice el escaneo de la QR</label><br>
							<input type="text" id="escaneoQR" class="form-control"/>
						</div>
					</div>
				</div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary hidden-xs hidden-sm-down hidden-md-downk hidden-xl-down" data-dismiss="modal" id="btnCancelarEscaneo">Cancelar</button>
				<button type="button" class="btn btn-secondary visible-xs hidden-sm-up hidden-xs-up hidden-md-up" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
