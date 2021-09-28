<div class="container">
    <div class="row">
        <div class="col-md-12"><h3>Administrar vehículos</h3></div>
    </div>
    <br>

    <div class="row">
        <div class="col-md-12">
            <a href="<?php echo base_url(); ?>Credencializacion/Ctrl_Vehiculos/registrar" id="registrarDocumento" class="btn btn-default">Nuevo vehículo</a>
        </div>
    </div>

    <br>
    <div class="row">
        <div class="col-md-12 table-responsive">
            <table id="tabVehiculos" class="table table-striped table-bordered" style="width:100%">
                <thead class="Tabla">
                    <tr>
                        <th width=20%>Número de placa</th>
                        <th width=20%>Número de serie</th>
                        <th width=10%>Año</th>
                        <th width=30%>Tipo de vehículo</th>
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


<div class="modal fade" id="modal_registro_exitoso" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false"
    aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Mensaje del sistema</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="mensaje_exito">
            </div>
            <div class="modal-footer">
                <button id="aceptar" type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
            </div>
        </div>
    </div>
</div>
