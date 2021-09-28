<div class="container">
    <div class="row">
        <div class="col-xs-12"><h3>Registrar chofer</h3></div>
    </div>
    <br>
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
        <a href="<?php echo base_url();?>Transportes/Ctrl_Choferes/registrar">
                <input type="radio" id="manualmente" value="">
            </a>Manualmente
        </div>
        <div class="col-md-2 col-sm-6">
                <input type="radio" id="subirExcel" value="">Subir en excel
        </div> 
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12">
            Descargue el archivo para capturar la información necesaria para el registro de choferes
        </div>
    </div>
    <div class="row">
        <div class="col-md-4 col-lg-3 col-xl-3">
            <br>
            <input type="button" class="btn btn-default" id="btnDescargarArchivo" value="Descargar archivo">
            <span id="btnDescargarArchivo" class="error"></span>
        </div>
    </div> 
    <br>
    <div class="row">
        <div class="col-xs-12">
            Subir documentos de excel
        </div>
    </div>
    <div class="row">
        <div class="col-md-4 col-lg-3 col-xl-3">
            <br>
            <input type="button" class="btn btn-default" id="btnSubirArchivo" value="Subir archivo">
            <span id="btnSubirArchivo" class="error"></span>
        </div>
    </div> 
    <br>
    <div class="row">
        <div class="col-md-12 table-responsive">
            <table id="tabRegChoferExcel" class="table table-striped table-bordered" style="width:100%">
                <thead class="Tabla">
                    <tr>
                        <th>CURP</th>
                        <th>Número seguro social</th>
                        <th>Nombre</th>
                        <th>Primer apellido</th>
                        <th>Segundo apellido</th>
                        <th>Fecha de nacimiento</th>
                        <th>RFC</th>
                        <th>Fecha de examen médico</th>
                        <th>Tipo de identificación</th>
                        <th>Número de identificación</th>
                        <th>Fecha de vencimiento</th>
                        <th>Tipo de licencia</th>
                        <th>Número de licencia</th>
                        <th>Fecha de expedición</th>
                        <th>Fecha de vencimiento</th>
                        <th>Correo electrónico</th>
                        <th>Número de teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <div class="row">
                                <div class="col-sm-6 col-lg-12 col-xl-3">
                                    <a href="#!">
                                        <span class="glyphicon glyphicon-trash eliminar" aria-hidden="true"></span>
                                    </a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <div class="row">
                                <div class="col-sm-6 col-lg-12 col-xl-3">
                                    <a href="#!">
                                        <span class="glyphicon glyphicon-trash eliminar" aria-hidden="true"></span>
                                    </a>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-2 col-lg-3 col-xl-2">
            <a href="<?php echo base_url(); ?>Transportes/Ctrl_Transportes/index">
                <input type="button" class="btn btn-default btn-border btn-block" id="btnRegresar" value="Regresar">
            </a>    
        </div>
        <div class="col-md-2 col-lg-3 col-xl-2">
            <input type="button" class="btn btn-primary btn-border btn-block" id="btnGuardar" value="Guardar">
        </div>
    </div>
</div>

<!--<script type="text/javascript">
    var R = <?php echo $permisos['R']; ?>;
    var U = <?php echo $permisos['U']; ?>;
    var D = <?php echo $permisos['D']; ?>;
</script>-->