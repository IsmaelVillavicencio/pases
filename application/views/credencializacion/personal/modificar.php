<div class="container">
    <div class="row">
        <div class="col-xs-12"><br><h3>Modificar personal</h3></div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span> Tipo de persona:</span>
            <select id="SelTipoPersona" class="form-control validar"></select>
            <span id="errorSelTipoPersona" style="color: red;display: none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 classoutsourcing" style="display: none">
            <br><span><span style="color: red;">*</span> Clave patronal:</span>
            <input type="text" class="form-control noespecial" id="clavepatronal" maxlength="11">
            <span id="errorclavepatronal" style="color: red;display: none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 classoutsourcing" style="display: none">
            <br><span><span style="color: red;">*</span> Empresa:</span>
            <input type="text" class="form-control noespecial" id="empresa" >
            <span id="errorempresa" style="color: red;display: none;">Campo obligatorio</span>
        </div>
        <input type="hidden" id="idempresa" value="0">
    </div>
    <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span>Número de seguridad social:</span>
            <input type="number" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==11) return false;" onkeydown="javascript: return event.keyCode == 69 ? false : true" id="nss" maxlength="11" class="form-control" >
            <input type="hidden" id="nsscontrol" value="">
            <span id="errornss" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> CURP:</span>
            <input type="text" class="form-control" id="curp" readonly="true">
            <input type="hidden" id="idpersonal" value="0">
            <input type="hidden" id="idcontacto" value="0">
            <input type="hidden" id="idcredencial" value="0">
        </div>
        <div class="col-xs-4 v-collapse-to-lg"></div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Nombre:</span>
            <input type="text" class="form-control noespecial validar letra" id="nombre" maxlength="50" >
            <span id="errornombre" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Primer apellido:</span>
            <input type="text" class="form-control noespecial validar letra" id="primer_apellido" maxlength="50" >
            <span id="errorprimer_apellido" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Segundo apellido:
            <input type="text" class="form-control noespecial letra" id="segundo_apellido" maxlength="50" >
            <span id="errorsegundo_apellido"style="color:red; display:none;">Formato incorrecto</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span>Sexo:</span>
            <input type="text" id="sexo" class="form-control validar" value="" readonly>
            <span id="errorsexo" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span>Fecha de nacimiento:</span>
            <input type="date" id="fechaNacimiento" class="form-control validar" value="" readonly>
            <span id="errorfechaNacimiento" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Nacionalidad:</span>
            <select id="selNacionalidad" class="form-control validar" ></select>
            <span id="errorselNacionalidad" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span>Pais:</span>
            <select class="form-control validar" id="selPais" >
            <option value="">Seleccione</option></select>
            <span id="errorselPais" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Tipo de sangre:
            <select id="tipoSangre" class="form-control"></select>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span>RFC:</span>
            <input type="text" id="rfc" class="form-control" >
            <input type="hidden" id="rfccontrol" value="">
            <span id="errorrfc" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span>Puesto:</span>
            <select id="selPuesto" class="form-control validar"></select>
            <span id="errorselPuesto" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span>Área:</span>
            <select id="selArea" class="form-control validar"></select>
            <span id="errorselArea" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Tipo de identificación:</span>
            <select class="form-control" id="selTipoIdentificacion">
                <option value="">Seleccione</option>
            </select>
            <span id="errorSelTipoIdentificacion" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span style="color:red;">*</span><span class="spanclaveident">Clave de elector:</span>
            <input type="text" id="numidenti" class="form-control" >
            <span id="errornumidenti" style="color:red;"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span>Fecha de vencimiento:</span>
            <input type="date" id="fechaexpiracion" min="<?php echo date('Y-m-d')?>" class="form-control" value="">
            <span id="errorfechaExpiracion" style="color:red;"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 mt-md-5">
            <br>
            <input type="button" class="btn btn-default btn-border btn-block" id="btnSubirIfe" value="Subir documento">
            <span id="errorSubirIfe" class="error"></span>
            <input type="hidden" id="archIfe" value="">
            <div id="divVisuzaliarife">
                <a target="_blank" style="cursor: pointer;" class="fotos" id="Visuzaliarife"></a>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Correo electrónico:</span>
            <div class="input-group">
                <input type="email" id="correoElectronico" class="form-control validar">
            </div>
            <span id="errorcorreoElectronico" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Número de teléfono:</span>
            <input type="number" id="numTelefono" class="form-control validar" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==10) return false;">
            <span id="errornumTel" style="color:red;"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 mt-md-5">
            <br>
            <div class="checkbox">
                <label><input type="checkbox" id="enviarfotocorreo" >Solicitar foto por correo</label>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 classfotocorreo">
            <br><input type="button" class="btn btn-default btn-border btn-block" id="btnSubirFoto" value="Subir foto">
            <span id="errorSubirFoto" class="error"></span>
            <input type="hidden" id="archFoto" value="">
            <div id="divVisuzaliarfoto">
                <a target="_blank" class="fotos" id="Visuzaliarfoto" style="cursor: pointer;"></a>
            </div>
        </div>
    </div>
    <br><br>
    <div class="row">
        <div class="col-xs-12">
            <input type="button" class="btn btn-default" id="btnRegresar" value="Regresar">
            <input type="button" class="btn btn-primary ml-4" id="btnGuardar" value="Guardar">
        </div>
    </div>
</div>
<div class="modal" id="modalIfe" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Fecha de vencimiento</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerIfe"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntarIfe" class="btn btn-sm btn-secondary adjuntarIfe">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarIfe" data-id="" data-imagen="" style="display:none;">
                        <input id="auxAdjuntarIfe" type="hidden" >
                        <span id="erroradjuntarIfe" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary ml-4" data-dismiss="modal" id="btnAceptarAdjuntarIfe">Aceptar</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="modalFoto" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Fecha de vencimiento</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerFoto"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntarFoto" class="btn btn-sm btn-secondary adjuntarFoto">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarFoto" data-id="" data-imagen="" style="display:none;">
                        <input id="auxAdjuntarFoto" type="hidden" >
                        <span id="erroradjuntarFoto" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary ml-4" data-dismiss="modal" id="btnAceptarAdjuntarFoto">Aceptar</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<br>
