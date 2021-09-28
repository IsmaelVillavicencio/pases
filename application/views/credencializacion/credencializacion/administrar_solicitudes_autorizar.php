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
                        <th width=20%>Número de solicitud</th>
                        <th width=20%>Referencia</th>
                        <th width=20%>Cantidad credenciales</th>
                        <th width=20%>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <div class="d-flex justify-content-center" >
                                <div class="p-1">
                                    <a href="<?php echo base_url(); ?>Credencializacion/Ctrl_Credencializacion/consultar">
                                        <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                                    </a>
                                </div>
                                <div class="p-1">
                                    <a href="<?php echo base_url(); ?>Credencializacion/Ctrl_Credencializacion/atender">
                                        <span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span>
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
</div>