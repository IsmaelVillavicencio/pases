<div class="container">
    <div class="row">
        <div class="col-xs-12"><h3>Administrar Choferes</h3></div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12">
            <a href="<?php echo base_url(); ?>Transportes/Ctrl_Choferes/registrar" id="registrarChofer" class="btn btn-default">Registrar chofer</a>
        </div>
    </div>  
    <br>
    <div class="row">
        <div class="col-md-12 table-responsive">
            <table id="tabRegistroChofer" class="table table-striped table-bordered" style="width:100%">
                <thead class="Tabla">
                    <tr>
                        <th width=20%>CURP</th>
                        <th width=30%>Nombre</th>
                        <th width=15%>Tipo de licencia</th>
                        <th width=15%>Número de licencia</th>
                        <th width=10%>Estatus</th>
                        <th width=10%>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <div class="row">
                                <div class="col-sm-5 col-lg-4 col-xl-3">
                                    <a href="<?php echo base_url(); ?>Transportes/Ctrl_Choferes/consultar">
                                    <span class="glyphicon glyphicon-eye-open ver" aria-hidden="true"></span>
                                    </a>
                                </div>
                                <div class="col-sm-5 col-lg-4 col-xl-3">
                                    <a href="<?php echo base_url(); ?>Transportes/Ctrl_Choferes/modificar">
                                        <span class="glyphicon glyphicon-pencil editar" aria-hidden="true"></span>
                                    </a>
                                </div>
                                <div class="col-sm-5 col-lg-4 col-xl-3">
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
                        <td>
                            <div class="row">
                                <div class="col-sm-5 col-lg-4 col-xl-3">
                                    <a href="<?php echo base_url(); ?>Transportes/Ctrl_Choferes/consultar">
                                    <span class="glyphicon glyphicon-eye-open ver" aria-hidden="true"></span>
                                    </a>
                                </div>
                                <div class="col-sm-5 col-lg-4 col-xl-3">
                                    <a href="#">
                                        <span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>
                                    </a>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<!--<script type="text/javascript">
    var R = <?php echo $permisos['R']; ?>;
    var U = <?php echo $permisos['U']; ?>;
    var D = <?php echo $permisos['D']; ?>;
</script>-->