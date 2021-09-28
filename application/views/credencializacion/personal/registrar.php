<div class="container">
    <div class="row">
        <div class="col-md-12"><h3>Registro de personal</h3></div>
    </div>
    <br>
    <div class="row">
            <span><span style="color: red;">*</span>Capturar:</span><br><br>
            <div class="col-md-4 col-sm-6"><input type="radio" name="tiporegistro" id="registromanual" checked><label for="registromanual">&nbsp;Manualmente</label></div>
            <div class="col-md-4 col-sm-6"><input type="radio" name="tiporegistro" id="registroexcel"><label for="registroexcel">&nbsp;Subir excel</label></div>
            <span id="errorcapturar" style="color: red;display: none;">Campo obligatorio</span>
    </div>
    <div class="classregexcel" style="display: none;">
        <div id="textosube">
            <br><br>
            <p>Descarga el archivo de excel que sive como guia para la carga masiva de registros <a href='../../assets/uploads/credencializacion/personal/excel/plantilla.xlsx' target="_blank">Archivo de guia</a> </p>           
            <input type="button" class="btn btn-default btn-border btn-block mt-3 mt-md-0 mt-lg-0 mt-xl-0" id="btnsubirexcel" value="Subir documento Excel">
            <span id="erroradjuntarExcel" class="error"></span>
            <br><br>
        </div>
            <div id="procesaexcel"></div>
            <br><br>
            <div class="row">
                <div id='errorImportar'>
                </div>
                <div class="col-md-12 table-responsive" id="capaImportar">
                    <div class="todosmsj" style="display: none"><p>Todos los registros cumplen con la validación del sistema, si desea importar los registros, solo debe dar click en el botón "Guardar" </p></div>
                    <div class="algunosmsj" style="display: none"><p>Algunos registros no cumplen con la validación del sistema, si desea importar los registros que si cumplen, solo debe dar click en el botón "Guardar"</p></div>
                    <br> 
                    <table id="tabImportar" class="table table-striped table-bordered  no-footer">
                        <thead class="Tabla">
                            <tr>
                                <th width=33%>CURP</th>
                                <th width=34%>NOMBRE</th>
                                <th width=33%>ESTATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <br> 
                    <br> 
                    <input type="button" id="btnGuardarExcel" class="btn btn-primary" value="Guardar">
                    <br>
                    <br>
                </div>
            </div>
    </div>
    <div class="classregmanual">
        <br>
        <input type="text" class="form-control" id="controlatodo">
        <div class="row">
            <div class="col-md-4">
                <span style="color:red;">*</span>Tipo de persona:
                <select id="selTipoPersona" class="form-control validar">
                    <option value="" selected="true" readonly>Seleccione</option>
                </select>
                <span id="errorSelTipoPersona" style="color: red;display: none;">Campo obligatorio</span>
            </div>
            <div class="col-md-4 classoutsourcing" style="display: none">
                <span><span style="color: red;">*</span>RFC empresarial:</span>
                <input type="text" class="form-control noespecial" id="rfcempresa" maxlength="13">
                <input type="hidden" id="rfcempresacontrol" value="0">
                <span id="errorrfcempresa" style="color: red;display: none;">Campo obligatorio</span>
            </div>
            <div class="col-md-4 classoutsourcingclave" style="display: none">
                <span><span style="color: red;">*</span>Clave patronal:</span>
                <input type="text" class="form-control noespecial" id="clavepatronal" maxlength="11">
                <input type="hidden" id="clavepatronalcontrol" value="0">
                <span id="errorclavepatronal" style="color: red;display: none;">Campo obligatorio</span>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-4 classoutsourcingempresa" style="display: none">
                <span><span style="color: red;">*</span>Empresa:</span>
                <input type="text" class="form-control" id="nombreEmpresa" >
                <span id="errornombreEmpresa" style="color: red;display: none;">Campo obligatorio</span>
            </div>
            <div class="col-md-4 classnombrepf" style="display: none">
                <span style="color:red;">*</span><span>Nombre:</span>
                <input type="text" class="form-control" id="nombrePersonaFisica" >
            </div>
            
            <div class="col-md-4 classnombrepf" style="display: none">
                <span style="color:red;">*</span><span>Primer apellido:</span>
                <input type="text" class="form-control" id="primerApellidoPersonaFisica" >
            </div>
            <div class="col-md-4 classnombrepf" style="display: none">
                <span style="color:red;">*</span><span>Segundo apellido:</span>
                <input type="text" class="form-control" id="segundoApellidoPersonaFisica" >
            </div>
            <input type="hidden" id="idempresa" value="0">
            <input type="hidden" id="idPersonaFisica" value="0">
        </div>
        <br>
        <div class="row">
            <div class="col-md-4">
                <span style="color:red;">*</span><span>CURP:</span>
                <input type="text" class="form-control validar" maxlength="18" id="curp">
                <span id="errorcurp" style="color:red; display:none;">Campo obligatorio</span>
                <span id="errorcurp2" style="color:red; display:none;"></span>
                <input type="hidden" id="idpersonal" value="0">
                <input type="hidden" id="idcontacto" value="0">
                <input type="hidden" id="idcredencial" value="0">
            </div>
            <div class="col-md-4">
                <span style="color:red;">*</span><span>Número de seguridad social:</span>
                <input type="number" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==11) return false;" onkeydown="javascript: return event.keyCode == 69 ? false : true" id="nss" class="form-control" maxlength="11" value="" >
                <span id="errornss" style="color:red; display:none;"></span>
            </div>
            <div class="col-md-4">
                <br>
                <button class="btn btn-light escanear-camara visible-xs hidden-sm-up hidden-xs-up hidden-md-up">Escanear CURP</button>
                <button class="btn btn-light escanear-escaner hidden-xs hidden-sm-down hidden-md-downk hidden-xl-down">Escanear CURP</button>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-4">
                <span style="color:red;">*</span><span>Nombre:</span>
                <input type="text" class="form-control" id="nombre" readonly="true" >
            </div>
            <div class="col-md-4">
                <span style="color:red;">*</span><span>Primer apellido:</span>
                <input type="text" class="form-control" id="primer_apellido" readonly="true" >
            </div>
            <div class="col-md-4">
                Segundo apellido:
                <input type="text" class="form-control" id="segundo_apellido" readonly="true" >
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-4">
                <span>Sexo:</span>
                <input type="text" id="sexo" class="form-control" value="" readonly="true">
                <span id="errorsexo" style="color:red; display:none;"></span>
            </div>
            <div class="col-md-4">
                <span>Fecha de nacimiento:</span>
                <input type="date" id="fechaNacimiento" class="form-control" value="" readonly="true">
                <span id="errorfechaNacimiento" style="color:red; display:none;"></span>
            </div>
            <div class="col-md-4">
                <span style="color:red;">*</span><span>Nacionalidad:</span>
                <select id="selNacionalidad" class="form-control">
                </select>
                <span id="errorselNacionalidad" style="color:red; display:none;">Campo obligatorio</span>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-4">
                <span>País:</span>
                <select class="form-control" id="selPais">
                <option value="">Seleccione</option>
                </select>
                <span id="errorselPais" style="color:red; display:none;"></span>
            </div>
            <div class="col-md-4">
                <span style="color:red;">*</span><span>Tipo de sangre:</span>
                <select id="tipoSangre" class="form-control">
                </select>
                <span id="errortipoSangre" style="color:red; display:none;"></span>
            </div>
            <div class="col-md-4">
                <span style="color:red;">*</span><span>RFC:</span>
                <input type="text" maxlength="13" id="rfc" class="form-control" >
                <span id="errorrfc" style="color:red; display:none;"></span>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-4">
                <span style="color:red;">*</span><span>Puesto:</span>
                <select id="selPuesto" class="form-control">
                </select>
                <span id="errorselPuesto" style="color:red; display:none;"></span>
            </div>
            <div class="col-md-4">
                <span style="color:red;">*</span><span>Área:</span>
                <select id="selArea" class="form-control">
                </select>
                <span id="errorselArea" style="color:red; display:none;"></span>
            </div>
            <div class="col-md-4">
                <span style="color:red;">*</span><span>Tipo de identificación:</span>
                <select class="form-control" id="selTipoIdentificacion">
                    <option value="">Seleccione</option>
                </select>
                <span id="errorSelTipoIdentificacion" style="color:red; display:none;">Campo obligatorio</span>
            </div>
        </div>
        <br>
        <div class="divclaveelector" style="display: none;">
            <div class="row">
                <div class="col-md-4">
                    <span style="color:red;">*</span><span class="spanclaveident">Clave de elector:</span>
                    <input type="text" id="numidenti" maxlength="18" pattern="^[0-9]*$" class="form-control" >
                    <span id="errornumidenti" style="color:red;"></span>
                </div>
                <div class="col-md-4">
                    <span style="color:red;">*</span><span>Fecha de vencimiento:</span>
                    <input type="date" id="fechaexpiracion" min="<?php echo date('Y-m-d')?>" class="form-control" value="">
                    <span id="errorfechaExpiracion" style="color:red; display:none;"></span>
                </div>
                <div class="col-md-4">
                    <br>
                    <input type="button" class="btn btn-default btn-border btn-block mt-3 mt-md-0 mt-lg-0 mt-xl-0" id="btnSubirIfe" value="Subir documento">
                    <span id="errorSubirIfe" class="error"></span>
                    <input type="hidden" id="archIfe" value="">
                    <div id="divVisuzaliarife">
                        <a target="_blank" class="fotos" style="cursor: pointer;" id="Visuzaliarife">  </a>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-3">
                <span style="color:red;">*</span><span>Correo electrónico:</span>
                <div class="input-group">
                    <input type="text" id="correoElectronico" class="form-control">
                </div>
                <span id="errorcorreoElectronico" style="color:red; display:none;">Campo obligatorio</span>
            </div>
            <div class="col-md-3">
                <span style="color:red;">*</span><span>Número de teléfono:</span>
                <input type="number" id="numTelefono" class="form-control validar" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==10) return false;">
                <span id="errornumTelefono" style="color:red; display:none;">Campo obligatorio</span>
                <span id="errornumTelefonoLongitud" style="color:red; display:none;">Información no válida</span>
            </div>
            <div class="col-md-3">
                <br>
                <div class="checkbox">
                    <label><input type="checkbox" id="enviarfotocorreo" >Solicitar foto por correo</label>
                </div>
            </div>
            <div class="col-md-3">
                    <br>
                <div class="classfotocorreo">
                    <input type="button" class="btn btn-default btn-border btn-block mt-3 mt-md-0 mt-lg-0 mt-xl-0" id="btnSubirFoto" value="Subir foto">
                    <span id="errorSubirFoto" class="error"></span>
                    <input type="hidden" id="archFoto" value="">
                    <div id="divVisuzaliarfoto">
                        <a target="_blank" class="fotos" style="cursor: pointer;" id="Visuzaliarfoto">  </a>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class="row">
        </div>
        <br>

        <div class="row">
            <div class="col-md-1 content" style="padding-top:2px">
                <br>
                <button class="btn btn-default btn-border" id="btnAdd">+</button>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-12 table-responsive">
                <table id="tabPersonas" class="table table-striped table-bordered" style="width:100%">
                    <thead class="Tabla">
                        <tr>
                            <th width=30%>Tipo de persona</th>
                            <th width=30%>Nombre completo</th>
                            <th width=20%>CURP</th>
                            <th width=20%>Acciones</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-lg-6">
                <input type="button" class="btn btn-default" id="btnRegresar" value="Regresar">
                <input type="button" class="btn btn-primary" id="btnGuardar" value="Guardar">
            </div>
        </div>
    </div>
</div>
<div class="modal" id="modalIfe" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Adjuntar foto de identificación</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12" id="pdfViewerIfe"></div>
                    <div class="col-12" style="margin-top:7px">
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
                <h5 class="modal-title">Adjuntar foto de perfil</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12" id="pdfViewerFoto"></div>
                    <div class="col-12" style="margin-top:7px">
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
<div class="modal" id="modalExcel" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Adjuntar excel</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12" id="pdfViewerExcel"></div>
                    <div class="col-12" style="margin-top:7px">
                        <label>Adjuntar excel</label><br>
                        <label for="adjuntarExcel" class="btn btn-sm btn-secondary adjuntarExcel">Seleccionar archivo</label>
                        <span style="color: blue" id="txtarchivoadjunto"></span>
                        <span style="color: red" id="txterrorarchivoadjunto"></span>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarExcel" data-id="" data-imagen="" style="display:none;">
                        <input id="auxAdjuntarExcel" type="hidden" >
                        <span id="erroradjuntarExcel" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnAceptarAdjuntarExcel">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<br>
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
<div class="modal fade" id="modal_confirmar_guardar_exe" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Importar los registros válidos</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="mensaje_confirmar_guardar">
                ¿Está seguro que desea guardar el registro?
                <input type='hidden' id='archexporta' value=''>
            </div>
            <div class="modal-footer">
                <button id="confirmar_guardar_exe" type="button" class="btn btn-primary" >Aceptar</button>
                <button id="close" type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
