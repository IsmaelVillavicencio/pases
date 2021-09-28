<div class="container">
    <div class="row">
        <div class="col-xs-12"><br><h3>Consultar ejecutivo</h3></div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Personal API:
            <input id="selPersonal" class="lectura" disabled>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Rol:
            <input id="selNombramiento" class="lectura" disabled>
        </div>
        <div class="col-xs-12 col-md-8">
            <br>Personalidad jurídica:
            <textarea id="personalidad" class="lectura" rows="4" value="" disabled></textarea>
        </div>
        <br>
        <div class="col-xs-10">
            <input type="button" class="btn btn-default" id="regresar" value="Regresar">
        </div>
        <div class="col-xs-2 d-flex justify-content-end">
            <div class="Reactivar p-1">
                <a title="Reactivar" href="<?php echo base_url(); ?>Usuarios/Ctrl_Personal/reactivar">
                    <span class="glyphicon glyphicon-ok-circle reactivar">
                </a>
            </div>
            <div class="Eliminar p-1">
                <a title="Dar de baja" onclick="pedir_confirmacion_eliminar()">
                    <span class="glyphicon glyphicon-trash eliminar">
                </a>
            </div>
        </div>
    </div>
</div>