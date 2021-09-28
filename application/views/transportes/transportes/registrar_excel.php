<div class="container" id="v_registro">
    <div class="row">
        <div class="col-xs-12"><h3>Registrar transporte</h3></div>
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
        <a href="<?php echo base_url();?>Transportes/Ctrl_Transportes/registrar">
                <input type="radio" id="manualmente" value="">
            </a>Manualmente
        </div>
        <div class="col-md-2 col-sm-6">
        <a href="<?php echo base_url();?>Transportes/Ctrl_Transportes/registrar_excel">
                <input type="radio" id="subirExcel" value="">Subir en excel
        </div> 
    </div>
    <br>
    <form id="importar_csv_trans" autocomplete="off" @submit.prevent="importar_csv_transporte" class="form-horizontal form-element col-12" enctype="multipart/form-data">
    <div class="row">
   
    
        <div class="col-md-4 col-lg-3 col-xl-3">
            <br>
            <a data-toggle="tooltip" title="Descarga el archivo para el reporte" href='<?php echo base_url().'/assets/uploads/transportes/transportista/registro_transportista.csv' ?>' class='btn btn-danger'><i class='fa fa-download'></i> Descargar Archivo</a>
            <span id="btnDescargarArchivo" class="error"></span>
        </div>

        <div class="col-md-4 col-lg-3 col-xl-3">
            <br>
            <span><span style="color: red;">*</span>Precarga del archivo:</span>
            <input type="file"  id="tarch" accept=".csv" name="tarch" value="Subir archivo" required>
            <span id="btnSubirArchivo" class="error"></span>
        </div>
       
        <div class="col-md-4 col-lg-3 col-xl-3">
            <br>
            <input type="submit" class="btn btn-default" id="btnSubirArchivo" value="Subir archivo">
            <span id="btnSubirArchivo" class="error"></span>
        </div>
        
    </div>  
   </form>
    <br>
    <div class="row">
        <div class="col-md-1 col-lg-1 col-xl-1">
            <br>
            <input type="button" class="btn btn-default" id="btnanadir" value="+">
            <span id="btnDanadir" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-12 table-responsive">
            <?php ?>
            <table id="tabRegTransporteExcel" class="table table-striped table-bordered" style="width:100%">
                <thead class="Tabla">
                    <tr>
                        <th>Placas</th>
                        <th>Tipo de placa</th>
                        <th>Número de serie</th>
                        <th>Número de motor</th>
                        <th>Color</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Capacidad</th>
                        <th>Tipo</th>
                        <th>Número económico</th>
                        <th>Propietario</th>
                        <th>Transportista</th>
                        <th>CAAT</th>
                        <th>Tarjeta de circulación</th>
                        <th>Fecha de expedición</th>
                        <th>Número de póliza de seguro</th>
                        <th>Tipo (cobertura)</th>
                        <th>Fecha de expedición</th>
                        <th>Fecha de vencimiento</th>
                        <th>compañía</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="csv_registros in csv_registros">
                        <td>{{csv_registros.placas}}</td>
                        <td>{{csv_registros.tipo_placa}}</td>
                        <td>{{csv_registros.num_serie}}</td>
                        <td>{{csv_registros.num_motor}}</td>
                        <td>{{csv_registros.color}}</td>
                        <td>{{csv_registros.marca}}</td>
                        <td>{{csv_registros.modelo}}</td>
                        <td>{{csv_registros.capacidad}}</td>
                        <td>{{csv_registros.tipo}}</td>
                        <td>{{csv_registros.num_economico}}</td>
                        <td>{{csv_registros.propietario}}</td>
                        <td>{{csv_registros.transportista}}</td>
                        <td>{{csv_registros.CAAT}}</td>
                        <td>{{csv_registros.tarjeta_circulacion}}</td>
                        <td>{{csv_registros.fecha_expedicion_circulacion}}</td>
                        <td>{{csv_registros.num_poliza_segura}}</td>
                        <td>{{csv_registros.tipo_cobertura}}</td>
                        <td>{{csv_registros.fecha_expedicion_poliza}}</td>
                        <td>{{csv_registros.fecha_vencimiento}}</td>
                        <td>{{csv_registros.companIa}}</td>
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