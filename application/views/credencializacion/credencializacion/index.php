<div class="container">
    <div class="row">
        <div class="col-xs-12"><h3>Administrar solicitudes de credenciales por autorizar</h3></div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12">
            <a href="<?php echo base_url(); ?>Credencializacion/Ctrl_Credencializacion/registrar" id="registrarSolicitud" class="btn btn-default">Solicitud de credencial</a>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12 table-responsive">
        <table id="tabAdmSolicitudesCredenciales" class="table table-striped table-bordered" style="width:100%">
                <thead class="Tabla">
                    <tr>
                        <th width=30%>Número de solicitud</th>
                        <th width=30%>Total credenciales</th>
                        <th width=20%>Estatus</th>
                        <th width=20%>Acciones</th>
                    </tr>
                </thead>
            </table>        
        </div>
    </div>
    <br>
</div>