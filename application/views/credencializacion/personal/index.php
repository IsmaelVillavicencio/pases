<div class="container">
    <div class="row">
        <div class="col-xs-12"><h3>Administrar personal</h3></div>
    </div>
    <br>
    <?php if ($permisos['C']) { ?>
    <div class="row">
        <div class="col-xs-12">
        <a href="<?php echo base_url(); ?>Credencializacion/Ctrl_Personal/registrar" id="registrarArea" class="btn btn-default">Nuevo personal</a>
        </div>
    </div>  
    <?php } ?>
    <br>
    <div class="row">
        <div class="col-xs-12 table-responsive">
        <table id="tabpersonal" class="table table-striped table-bordered" style="width:100%">
                <thead class="Tabla">
                    <tr>
                        <th width=40%>Nombre</th>
                        <th width=20%>CURP</th>
                        <th width=15%>Tipo de persona</th>
                        <th width=15%>Estatus</th>
                        <th width=10%>
                        <?php if ($permisos['R'] || $permisos['U'] || $permisos['D']) { ?>
                            Acciones
                        <?php } ?>
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>

<script type="text/javascript">
    var R = <?php echo $permisos['R']; ?>;
    var U = <?php echo $permisos['U']; ?>;
    var D = <?php echo $permisos['D']; ?>;
</script>