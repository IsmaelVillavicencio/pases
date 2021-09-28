<div class="container">
    <div class="row">
        <div class="col-xs-12"><h3>Administrar citas </h3></div>
    </div>
    <br>
    <form>
        <div class="row">
            <div class="col-xs-12 col-md-2 col-sm-6"> 
                No. de cita:
                <input type="text" class="lectura" name="n_cita" id="n_cita" disabled>
            </div>
            <div class="col-xs-12 col-md-2 col-sm-6"> 
                Código:
                <input type="text" class="lectura" name="codigo" id="codigo" disabled>
            </div>
            <div class="col-xs-12 col-md-4 col-sm-6"> 
                Identificador:
                <input type="text" class="lectura" name="identificador" id="identificador" disabled>
            </div>
            <div class="col-xs-12 col-md-4 col-sm-6"> 
                Tipo de pase:
                <input type="text" class="lectura" name="tipo_pase" id="tipo_pase" disabled>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-xs-12 col-md-6 col-sm-6"> 
                Recinto:
                <input type="text" class="lectura" name="recinto" id="recinto" disabled>
            </div>
            <div class="col-xs-12 col-md-6 col-sm-6"> 
                Motivo:
                <input type="text" class="lectura" name="motivo" id="motivo" disabled>
            </div>
        </div>

        <br>
        <div class="row">
            <div class="col-xs-12 col-md-3 col-sm-6"> 
                Fecha de registro:
                <input type="text" class="lectura" name="fecha_registro" id="fecha_registro" disabled>
            </div>
            <div class="col-xs-12 col-md-3 col-sm-6"> 
                Fecha de actualización:
                <input type="text" class="lectura" name="fecha_actualizacion" id="fecha_actualizacion" disabled>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-xs-12"><h4>Período </h4></div>
        </div>
        <br>
        <div class="row">
            <div class="col-xs-12 col-md-3 col-sm-6"> 
                Fecha de inicio:
                <input type="text" class="lectura" name="fecha_inicio" id="fecha_inicio" disabled>
            </div>
            <div class="col-xs-12 col-md-3 col-sm-6"> 
                Fecha de término:
                <input type="text" class="lectura" name="fecha_termino" id="fecha_termino" disabled>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-xs-12 table-responsive">
                <table id="tabMercancias" class="table table-striped table-bordered" style="width:100%">
                </table>
            </div>
        </div>

        <br>
        <div class="row">
            <div class="col-xs-12"><h4>Asignación de operador y transportista </h4></div>
        </div>
        <br>
        <div class="row">
            <div class="col-xs-12 col-md-4 col-sm-6"> 
                Placa:
                <input type="text" class="form-control" name="placa" id="placa">
                <span class="error" id="errorPlaca" style="color:red;"></span>
            </div>
            <div class="col-xs-12 col-md-4 col-sm-6"> 
                Operador:
                <input type="text" class="form-control" name="operador" id="operador">
                <span class="error" id="errorOperador" style="color:red;"></span>
            </div>
            <div class="col-xs-12 col-md-2 col-sm-6"> 
                <a style="margin-top: 11%;" class="btn btn-light" onclick="asignar()"><strong>+</strong></a>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-12">
                <span class="error" id="errorRepeticion" style="color:red;"></span>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-xs-12 table-responsive">
                <table id="tabAsignaciones" class="table table-striped table-bordered" style="width:100%">
                </table>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-2 col-lg-3 col-xl-2">
                <a href="<?php echo base_url(); ?>Transportes/Ctrl_Citas">
                    <input type="button" class="btn btn-default btn-border btn-block" id="btnRegresar" value="Regresar">
                </a>    
            </div>
            <div class="col-md-2 col-lg-3 col-xl-2">
                <input type="button" class="btn btn-primary btn-border btn-block" id="btnGuardar" value="Guardar">
            </div>
        </div>
    </form>
</div>

<script type="text/javascript">
    var R = <?php echo /*$permisos['R'];*/1; ?>;
    var U = <?php echo /*$permisos['U'];*/1; ?>;
    var D = <?php echo /*$permisos['D'];*/1; ?>;
</script>