<div class="container">
    <div class="row">
        <div class="col-xs-12"><h3>Registrar solicitud de credenciales</h3></div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br><span class="required">*</span>&nbsp;Motivo de ingreso:
            <select id="motivoIngreso" class="form-control" required></select>
            <span id="errormotivoIngreso" class="error"></span>
        </div>
        <div class="col-xs-12">
            <br><span class="required">*</span>&nbsp;Accesos:
            <div class="checkbox showaccess"></div>
            <span id="erroraccesos" class="error"></span>
        </div>
        <div class="w-100 infoper">
            <input type="hidden" id="idpersona" value="0">
            <div class="col-md-4 col-sm-6 col-xs-12">
                <br><span class="required">*</span>&nbsp;CURP:
                <input type="text" class="form-control" maxlength="18" id="curp">
                <span id="errorcurp" class="error"></span>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12 mt-md-5">
                <br><button class="btn btn-light escanear-camara visible-xs hidden-sm-up hidden-xs-up hidden-md-up">Escanear CURP</button>
                <button class="btn btn-light escanear-escaner hidden-xs hidden-sm-down hidden-md-downk hidden-xl-down">Escanear CURP</button>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12 infoper">
                <br>Número de seguridad social:
                <input id="nss" type="number" class="lectura" value="" disabled>
            </div>
        </div>
        <div class="col-md-8 col-sm-6 col-xs-12">
            <br>Nombre completo:
            <select id="nombreCompleto" class="form-control" multiple="multiple" required></select>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12 infoper">
            <br>Tipo de persona:
            <input type="text" id="tipoPersona" class="lectura" value="" disabled>
        </div>
    </div>
    <div class="row infoper">
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br>Sexo:
            <input type="text" id="sexo" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br>Fecha de nacimiento:
            <input type="text" id="fechaNacimiento" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br>Nacionalidad:
            <input type="text" id="nacionalidad" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br>País:
            <input type="text" id="pais" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br>Tipo de sangre:
            <input type="text" id="tipoSangre" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br>RFC:
            <input type="text" id="rfc" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br>Puesto:
            <input type="text" id="puesto" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br>Área:
            <input type="text" id="area" class="lectura" value="" disabled>
        </div>
        <div class="col-xs-4 v-collapse-to-lg"></div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br>Tipo de identificación:
            <input type="text" id="tipoIdentificacion" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br><span id="idclaveident">Clave de elector:</span>
            <input type="text" id="claveIdentificacion" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br>Fecha de vencimiento:
            <input type="text" id="fechaVencimiento" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br>Correo electrónico:
            <input type="text" id="correo" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br>Número de celular:
            <input type="text" id="numero" class="lectura" value="" disabled>
        </div>
    </div>
    <div class="row" id="divEmpresa">
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br>Clave patronal:
            <input type="text" id="clavePatronal" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br>Empresa
            <input type="text" id="empresa" class="lectura" value="" disabled>
        </div>
        <div class="col-xs-4 v-collapse-to-lg"></div>
        <div class="col-md-4 col-xs-6 mt-md-5">
            <br><input type="button" class="btn btn-default btn-border btn-block" id="btnVerIdent" value="Ver identificación">
        </div>
        <div class="col-md-4 col-xs-6 mt-md-5">
            <br><input type="button" class="btn btn-default btn-border btn-block" id="btnVerFoto" value="Ver foto">
        </div>
        <div class="col-xs-12">
            <br><span id="errordatos" class="error"></span>
        </div>
        <div class="col-xs-12 content text-right" style="padding-top:2px">
            <br><button title="Agregar" class="btn btn-default btn-border" id="btnAdd">+</button>
        </div>
        <div class="col-xs-12 table-responsive">
            <br><table id="tabRegCredenciales" class="table table-striped table-bordered w-100">
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
        <div class="col-xs-12">
            <br><a href="<?php echo base_url(); ?>Credencializacion/Ctrl_Credencializacion/index">
                <input type="button" class="btn btn-default" id="btnRegresar" value="Regresar">
            </a>
            <input type="button" class="btn btn-primary" id="btnGuardar" value="Guardar">
        </div>
    </div>
</div>
<div class="modal" id="modalIdentificacion" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Identificación</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerIdentificacion"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="modalPersonal" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Fotografiá</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerFotografia"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
            </div>
        </div>
    </div>
</div>