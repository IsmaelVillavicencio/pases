<div class="container">
    <div class="row">
        <div class="col-xs-12"><h3>Administrar citas </h3></div>
    </div>
    <br>
    <?php if ($permisos['C']) { ?>
    <div class="row">
        <div class="col-xs-12">
            <a href="<?php echo base_url(); ?>Transportes/Ctrl_CitasTerminal/registrar" id="registrarSolCita" class="btn btn-default">Registrar solicitud de cita</a>
        </div>
    </div>  
    <?php } ?>
    <br>
    <div class="row">
        <div class="col-xs-12 table-responsive">
            <table id="tabSolicitudCitas" class="table table-striped table-bordered" style="width:100%">
                <thead class="Tabla">
                    <tr>
                        <th width=15%>Número solicitud</th>
                        <th width=15%>Empresa transportista</th>
                        <th width=15%>Maniobra</th>
                        <th width=15%>Fecha inicio</th>
                        <th width=15%>Fecha fin</th>
                        <th width=10%>Estatus</th>
                        <th width=15%>Acciones</th>
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