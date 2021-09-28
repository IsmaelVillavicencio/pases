<div class="container">
    <div class="row">
        <div class="col-xs-12"><h3>Administrar usuarios</h3></div>
    </div>
    <br>
    <?php if ($permisos['C']) { ?>
    <div class="row">
        <div class="col-xs-12">
        <a href="<?php echo base_url(); ?>Usuarios/Ctrl_Usuarios/registrar" id="registrarUsuario" class="btn btn-default">Registrar usuario</a>
        </div>
    </div>  
    <?php } ?>
    <br>
    <div class="row">
        <div class="col-xs-12 table-responsive">
        <table id="tabRegistroUsuario" class="table table-striped table-bordered" style="width:100%">
                <thead class="Tabla">
                    <tr>
                        <th width=45%>Nombre</th>
                        <th width=25%>Puesto</th>
                        <th width=15%>Estatus</th>
                        <?php if ($permisos['R'] || $permisos['U'] || $permisos['D']) { ?>
                            <th width=15%>Acciones</th>
                        <?php } ?>
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