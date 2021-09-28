<div class="container">
    <div class="row">
        <div class="col-md-12"><h3>Registro de datos pendientes</h3></div>
    </div>
    <br>
    <div class="row">
        <input type="hidden" id="idpersona" value="0">
        <div class="col-md-4">
            <span style="color:red;">*</span><span>Número de seguridad social:</span>
            <input type="text" id="nss" class="form-control" value="" disabled>
            <span id="errornss" class="error"></span>
        </div>
        <div class="col-md-4">
            <span style="color:red;">*</span><span>CURP:</span>
            <input type="text" id="curp" class="form-control" value="" disabled>
            <span id="errorcurp" class="error"></span>
        </div>
        <div class="col-md-3" id="divEscaneo" style="margin-top:10px">
			<button class="btn btn-default btn-block escanear-camara visible-xs visible-sm">Escanear NSS</button>
			<button class="btn btn-default btn-block escanear-escaner visible-md visible-lg visible-xl">Escanear NSS</button>
		</div>
    </div>
    <div class="row" id="divSubirFotografia" style="display:none;margin-top:10px">
        <div class="col-md-4 col-lg-3 col-xl-3">
        <input type="button" class="btn btn-default btn-block" id="btnAdjuntarFotografia" value="Subir fotografiá">
        <span id="errorSubirFotografia" class="error"></span>
        </div>
    </div>
    <div class="row" id="divBtnGuardar" style="display:none;margin-top:10px">
        <div class="col-md-3">
            <input type="button" class="btn btn-default btn-block" id="btnGuardar" value="Guardar">
        </div>
    </div>
</div>
<div class="modal" id="modalEscanerCURP" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Escaneo QR del número de seguridad social</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
				<div class="hidden-md hidden-lg hidden-xl">
					<div class="row">
						<div class="col-md-12">
							<video class="col-md-12" id="qr-video" width="100%"></video>
						</div>
					</div>
					<div class="row">
						<b>Estado de escaneo de QR: </b>
						<span id="cam-qr-result">No permitido</span>
					</div>
				</div>
				<div class="hidden-xs hidden-sm">
					<div class="row">
						<div class="col-md-12">
							<label>Realice el escaneo de la QR</label><br>
							<input type="text" id="escaneoQR" class="form-control"/>
						</div>
					</div>
				</div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary visible-xs visible-sm" data-dismiss="modal" id="btnCancelarEscaneo">Cancelar</button>
				<button type="button" class="btn btn-secondary visible-md visible-lg visible-xl" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="modalPersonal" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Personal</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12" id="pdfViewerPersonal"></div>
                    <div class="col-md-12" style="margin-top:10px">
                        <label>Adjuntar fotografía</label><br>
                        <input type="button" class="btn btn-sm btn-secondary adjuntarPersonal" id="adjuntarPersonal" value="Seleccionar archivo">
                        <span id="erroradjuntarPersonal" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="btnAceptarAdjuntarPersonal">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>