<div class="container">
    <div class="row">
        <div class="col-md-12"><h3>Registro de equipo/herramienta</h3></div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br><span class="required">*</span>&nbsp;Capturar:<br><br>
            <input type="radio" name="capturar" class="capturar" value="1" checked>&nbsp; Manualmente &nbsp; &nbsp;
            <input type="radio" name="capturar" class="capturar" value="2">&nbsp; Subir Excel
            <span id="errorcapturar" style="color: red;display: none;">Campo obligatorio</span>
        </div>
    </div>
    <div id="divManual">
        <div class="row">
            <input type="hidden" id="idequipo" value="0">
            <div class="col-md-4 col-sm-6 col-xs-12">
                <br><span class="required">*</span>&nbsp;Tipo de equipo:
                <select id="tipoEquipo" class="form-control reiniciar-equipo" required>
                    <option value="">Seleccione</option>
                </select>
                <span id="errortipoEquipo" class="error"></span>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 col-sm-6 col-xs-12">
                <br><span class="required">*</span>&nbsp;Número de serie:
                <input type="text" id="noSerieEquipo" class="form-control reiniciar-equipo" value="" maxlength="25" required>
                <span id="errornoSerieEquipo" class="error"></span>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
                <br><span class="required">*</span>&nbsp;Marca:
                <input type="text" id="marcaHerramienta" class="form-control reiniciar-equipo" value="" maxlength="25" required>
                <span id="errormarcaHerramienta" class="error"></span>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
                <br><span class="required">*</span>&nbsp;Modelo:
                <input type="text" id="modeloHerramienta" class="form-control reiniciar-equipo" value="" maxlength="25" required>
                <span id="errormodeloHerramienta" class="error"></span>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
                <br><span class="required">*</span>&nbsp;Tipo de documento:
                <select id="tipoDocumento" class="form-control reiniciar-equipo" required>
                    <option value="">Seleccione</option>
                </select>
                <span id="errortipoDocumento" class="error"></span>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
                <br><span class="required">*</span>&nbsp;Número de factura:
                <input type="text" id="noFacturaEquipo" class="form-control reiniciar-equipo" value="" maxlength="25" required>
                <span id="errornoFacturaEquipo" class="error"></span>
            </div>
            <div class="col-md-3 col-sm-4 col-xs-6 mt-md-5">
                <br><input type="button" class="btn btn-light btn-border btn-block" id="btnSubirEquipo" value="Subir documento">
                <span id="erroradjuntarEquipo" class="error"></span>
            </div>
            <div class="col-md-1 col-sm-2 col-xs-6 mt-md-5 content text-right" style="padding-top:2px">
                <br><button title="Agregar" class="btn btn-light btn-border" id="anadirEquipo">+</button>
            </div>
        </div>
    </div>
    <div id="divExcel" style="display:none;">
        <div id="textosube">
            <br>
            <p>Descarga el archivo de excel que sive como guia para la carga masiva de registros <a href="<?php echo base_url('assets/uploads/credencializacion/equipos/excel/plantilla.xlsx')?>" target="_blank">Archivo de guia</a> </p>           
            <input type="button" class="btn btn-default btn-border btn-block mt-3 mt-md-0 mt-lg-0 mt-xl-0" id="btnsubirexcel" value="Subir documento Excel">
            <span id="erroradjuntarExcel" class="error"></span>
            <br>
        </div>
        <div id="procesaexcel"></div>
    </div>
    <div class="row">
        <div class="col-xs-12">
          <span id="errorHerramientaDuplicado" class="error"></span>
        </div>
    </div>
    <br><br>
    <div class="row">
        <div class="col-xs-12 table-responsive">
            <table id="tabEquipoHerramienta" class="table table-striped table-bordered">
                <thead class="Tabla">
                    <tr>
                        <th width=20%>Tipo de equipo</th>
                        <th width=20%>Modelo</th>
                        <th width=25%>Marca</th>
                        <th width=20%>Número de serie</th>
                        <th width=15%>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-3 col-xs-6">
            <a href="<?php echo base_url('Credencializacion/Ctrl_Equipos')?>" class="btn btn-default btn-block">Regresar</a>
        </div>
        <div class="col-md-3 col-xs-6">
            <input type="button" class="btn btn-primary btn-block" id="btnGuardar" value="Guardar">
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
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntarEquipo" class="btn btn-sm btn-secondary adjuntarEquipo">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarEquipo" data-id="" data-imagen="" style="display:none;">
                        <span id="erroradjuntarEquipo" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary ml-4" data-dismiss="modal" id="btnAceptarAdjuntarEquipo">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
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
                <button type="button" class="btn btn-primary ml-4" data-dismiss="modal" id="btnAceptarAdjuntarExcel">Aceptar</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
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
                <button id="confirmar_guardar_exe" type="button" class="btn btn-primary ml-4" >Aceptar</button>
                <button id="close" type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
