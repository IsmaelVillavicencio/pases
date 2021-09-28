<div class="container">
    <div class="row">
        <div class="col-xs-12"><br><h3>Modificar ejecutivo</h3></div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>
            <span class="required">*</span><span> Personal API:</span>
            <select id="selPersonal" class="form-control" style="width:100%" disabled>
                <option value=""></option>
            </select>
            <span id="error" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>
            <span class="required">*</span><span> Rol:</span>
            <select id="selNombramiento" class="form-control form-control-sm"></select>
            <span id="errorNombramiento" style="color: red; display: none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-md-8">
            <br>
            <span class="required">*</span><span> Personalidad Jurídica:</span>
            <textarea id="personalidad" class="form-control espe" rows="4" value=""></textarea>
            <span id="errorPersonalidad" style="color: red; display: none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12">
            <br>
            <input type="button" class="btn btn-default" id="btnRegresar" value="Regresar">
            <input type="button" class="btn btn-primary" id="btnGuardar" value="Guardar">
        </div>
    </div>
</div>
