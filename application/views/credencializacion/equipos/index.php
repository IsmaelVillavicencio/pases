<div class="container">
    <div class="row">
        <div class="col-md-12"><h3>Administrar equipo/herramienta</h3></div>
    </div>
    <br>

    <div class="row">
        <div class="col-md-12">
            <a href="<?php echo base_url(); ?>Credencializacion/Ctrl_Equipos/registrar" id="registrarDocumento" class="btn btn-default">Nuevo equipo/herramienta</a>
        </div>
    </div>  

    <br>
    <div class="row">
        <div class="col-md-12 table-responsive">
            <table id="tabEquipos" class="table table-striped table-bordered" style="width:100%">
                <thead class="Tabla">
                    <tr>
                        <th width=30%>Tipo de equipo/herramienta</th>
                        <th width=20%>Modelo</th>
                        <th width=20%>Marca</th>
                        <th width=10%>Número de serie</th>
                        <th width=10%>Estatus</th>
                        <th width=10%>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script type="text/javascript">
    var R = <?php echo $permisos['R']; ?>;
    var U = <?php echo $permisos['U']; ?>;
    var D = <?php echo $permisos['D']; ?>;
</script>