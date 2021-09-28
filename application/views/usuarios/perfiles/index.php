<div class="container">
    <div class="row">
        <div class="col-xs-12"><h3>Administrar perfiles</h3></div>
    </div>
    <br>
    <?php if ($permisos['C']) { ?>
    <div class="row">
        <div class="col-xs-12">
        <a href="<?php echo base_url(); ?>Usuarios/Ctrl_Perfiles/registrar" id="registrarArea" class="btn btn-default">Registrar perfil</a>
        </div>
    </div>  
    <?php } ?>
    <br>
    <div class="row">
        <div class="col-xs-12 table-responsive">
            <table id="tabperfiles" class="table table-striped table-bordered" style="width:100%">
                <thead class="Tabla">
                    <tr>
                        <th width=75%>Nombre del perfil</th>
                        <th width=15%>Estatus</th>
                        <?php if ($permisos['R'] || $permisos['U'] || $permisos['D']) { ?>
                            <th width=10%>Acciones</th>
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