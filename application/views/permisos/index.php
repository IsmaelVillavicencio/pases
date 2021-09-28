<style>
    .form-horizontal .control-label {
        text-align: left!important;
    }
    .ml {
        padding-left: 60px;
    }
</style>
<div class="container">
    <div class="row">
        <div class="col-md-12"><h3>Administrar permisos de acceso</h3></div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-12">
            <a class="btn btn-default" id="btnFiltrar" role="button" data-toggle="collapse" href="#collapseFiltro" aria-expanded="false" aria-controls="collapseExample">Filtrar</a>
            <div class="collapse" id="collapseFiltro">
            <br>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="f_fecha_inicio" class="col-sm-5 control-label">Periodo: Fecha inicio:</label>
                    <div class="col-sm-7">
                    <input type="date" class="form-control" id="f_fecha_inicio" name="f_fecha_inicio" >
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="f_fecha_final" class="col-sm-5 control-label ml">Fecha final:</label>
                    <div class="col-sm-7">
                        <input type="date" class="form-control" id="f_fecha_final" name="f_fecha_final" >
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="f_entidad" class="col-sm-5 control-label">Empresas:</label>
                    <div class="col-sm-7">
                    <select name="f_entidad" id="f_entidad" class="form-control">
                        <!--option value="" selected >Seleccione</option-->
                    </select>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
            <div class="form-group">
                    <label for="f_vigencia" class="col-sm-5 control-label ml">Vigencia: </label>
                    <div class="col-sm-7">
                    <select name="f_vigencia" id="f_vigencia" class="form-control">
                        <option value="" selected >Seleccione</option>
                        <option value="1">Evento</option>
                        <option value="2">Día</option>
                    </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="f_tpermiso" class="col-sm-5 control-label">Tipo de permiso:</label>
                    <div class="col-sm-7">
                    <select name="f_tpermiso" id="f_tpermiso" class="form-control">
                        <!--option value="" selected >Seleccione</option-->
                    </select>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
            <div class="form-group">
                    <label for="f_estatus" class="col-sm-5 control-label ml">Estatus: </label>
                    <div class="col-sm-7">
                    <select id="f_estatus" name="f_estatus" class="form-control">
                        <!--option value="" selected>Seleccione</option-->
                    </select>
                    </div>
                </div>
            </div>  
        </div>
        <div class="row mt-4">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="f_noSolicitud" class="col-sm-5 control-label">Número de solicitud:</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control" id="f_noSolicitud" name="f_noSolicitud" >
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="f_nombre" class="col-sm-5 control-label ml">Nombre de persona:</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control" id="f_nombre" name="f_nombre" >
                    </div>
                </div>
            </div>
            <!--div class="col-md-6">
                <div class="form-group">
                    <label for="f_usuario" class="col-sm-5 control-label ml">Usuario: </label>
                    <div class="col-md-4 col-sm-6">
                        <select id="f_usuario" class="form-control">
                            <option value=""></option>
                        </select>
                    </div>
                </div>
            </div-->
        </div>
        <div class="row mt-4">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="f_noPlaca" class="col-sm-5 control-label">Número de placa:</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control" id="f_noPlaca" name="f_noPlaca" >
                    </div>
                </div>
            </div>
        </div>
        <!--div class="row mt-4">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="f_mOrde" class="col-sm-5 control-label">Método de ordenamiento:</label>
                    <div class="col-sm-7">
                    <select name="f_mOrde" id="f_mOrde" class="form-control">
                        <option value="" selected >Seleccione</option>
                        <option value="0">Ascendente</option>
                        <option value="1">Descendente</option>
                    </select>
                    </div>
                </div>
            </div>
        </div-->
        <div class="row mt-4">
            <div class="col-md-10">
                <button class="btn btn-default pull-right" id="limpiarFiltro">Limpiar filtro</button>
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-default pull-right" id="btnFiltrarAplicar">Aplicar</button>
            </div>
        </div>
    
                <!--form class="form-horizontal" id="formFilter"-->
                <!--
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="f_nombre" class="col-sm-5 control-label">Nombre:</label>
                                <div class="col-sm-7">
                                <input type="text" class="form-control" name="f_nombre" id="f_nombre" >
                                </div>
                            </div>
                        </div>
                        -->
                        <!--div class="col-md-6">
                        <div class="form-group">
                                <label for="f_placa" class="col-sm-5 control-label">Placa: </label>
                                <div class="col-sm-7">
                                <input type="text" class="form-control" id="f_placa" name="f_placa" >
                                </div>
                            </div>
                        </div>
                
                    
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="f_noSerie" class="col-sm-5 control-label ml">Número de serie:</label>
                                <div class="col-sm-7">
                                <input type="text" class="form-control" id="f_noSerie" name="f_noSerie" >
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                        <div class="form-group">
                                <label for="f_marca" class="col-sm-5 control-label">Marca: </label>
                                <div class="col-sm-7">
                                <input type="text" class="form-control" id="f_marca" name="f_marca" >
                                </div>
                            </div>
                        </div-->
                        <!--/form-->
            </div>
        </div>
    </div>
    <br>
    <?php if ($permisos['id_area'] == 8) { ?>
    <div class="row">
        <div class="col-md-12" id="btnRegistrar">
            <a href="#!" class="btn btn-default" id="btnRegistrarPermiso">Registrar permiso</a>
        </div>
    </div>  
    <?php } ?>
    <br>
    <div class="row">
        <div class="col-md-12 table-responsive">
            <table id="tabPermisos" class="table table-striped table-bordered" style="width:100%">
                <thead class="Tabla">
                    <tr>
                        <th width=10%>Número de solicitud</th>
                        <th width=30%>Entidad</th>
                        <th width=10%>Fecha Inicio</th>
                        <th width=10%>Fecha Termino</th>
                        <th width=10%>Tipo de permiso</th>
                        <th width=5%>Permiso</th>
                        <th width=15%>Estatus</th>
                        <?php //if ($permisos['U'] || $permisos['D']) { ?>
                        <th width=20%>Acciones</th>
                        <?php //} ?>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
    <div class="d-flex justify-content-between">
        <div class="p-4">
        <a href="<?php echo base_url(); ?>Inicio\index"  role="button" class="btn btn-default" id="regresar">Regresar</a>
        </div>
    </div>
</div>

<script type="text/javascript">
    var R = <?php echo $permisos['R']; ?>;
    var U = <?php echo $permisos['U']; ?>;
    var D = <?php echo $permisos['D']; ?>;
    var Area = <?php echo $permisos['id_area']; ?>;
</script>