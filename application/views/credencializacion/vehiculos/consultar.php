<div class="container">
    <div class="row">
        <div class="col-xs-12"><h3>Consultar de vehículos</h3></div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Número de placa:</span>
            <input type="text" id="noPlaca" class="lectura reiniciar-vehiculo" maxlength="10" value="" disabled>
            <span id="errornoPlaca" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Número de serie:</span>
            <input type="text" id="noSerieVehiculo" class="lectura reiniciar-vehiculo" maxlength="17" value="" disabled>
            <span id="errornoSerieVehiculo" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Número de motor:
            <input type="text" id="noMotor" class="lectura reiniciar-vehiculo" minlength="6" maxlength="8" value="" disabled>
            <span id="errornoMotor" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Marca:
            <input type="text" id="marcaVehiculo" class="lectura reiniciar-vehiculo" value="" disabled>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Modelo:
            <input type="text" id="modeloVehicuo" class="lectura reiniciar-vehiculo" value="" disabled>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Año:
            <input type="text" id="anio" class="lectura reiniciar-vehiculo" value="" disabled>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Color:
            <input type="text" id="color" class="lectura reiniciar-vehiculo" value="" disabled>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Tipo de vehículo:</span>
			<input type="text" id="tipoVehiculo" class="lectura reiniciar-vehiculo" value="" disabled>
        </div>
        <div class="col-xs-4 v-collapse-to-lg"></div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Tipo de tarjeta de circulación:</span>
			<input type="text" id="tipoTarjetaCirculacion" class="lectura reiniciar-vehiculo" value="" disabled>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Número de tarjeta:</span>
            <input type="text" id="noTarjeta" class="lectura reiniciar-vehiculo" value="" disabled>
            <span id="errornoTarjeta" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Vigencia de tarjeta de circulación:</span>
            <input type="date" id="vigenciaTarjeta" class="lectura reiniciar-vehiculo"  value="" disabled>
            <span id="errorvigenciaTarjeta" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Tipo de documento:</span>
            <select id="tipodocumentoVeh" class="lectura reiniciar-vehiculo" disabled></select>
            <span id="errortipodocumentoVeh" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span> <span>Número de factura:</span>
            <input type="text" id="noFacturaVeh" class="lectura reiniciar-vehiculo" value="" onKeyPress="if(this.value.length==20) return false;" disabled>
            <span id="errornoFacturaVeh" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 mt-md-5">
            <br><input type="button" class="fotos btn btn-default btn-border btn-block mt-3" id="btnSubirFacturaVehiculo" value="Ver documento">
            <span id="errorSubirFacturaVehiculo" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Aseguradora:</span>
            <input type="text" id="aseguradora" class="lectura reiniciar-vehiculo" value="" disabled>
            <span id="erroraseguradorasVeh" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Número de póliza:</span>
            <input type="text" id="noPoliza" class="lectura reiniciar-vehiculo" value="" onKeyPress="if(this.value.length==20) return false;" disabled>
            <span id="errornoPoliza" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Vigencia de póliza:</span>
            <input type="date" id="vigenciaPoliza" class="lectura reiniciar-vehiculo" value="" min="<?php echo date('Y-m-d')?>" disabled>
            <span id="errorvigenciaPoliza" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Período de pago:</span>
			<input type="text" id="periodo" class="lectura reiniciar-vehiculo" value="" disabled>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12">
            <br>Período de cobertura:
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Fecha inicio:</span>
            <input type="date" id="periodoCobFechaInicio" class="lectura reiniciar-vehiculo" value="" max="<?php echo date('Y-m-d')?>" disabled>
            <span id="errorperiodoCobFechaInicio" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Fecha fin:</span>
            <input type="date" id="periodoCobFechaFin" class="lectura reiniciar-vehiculo" value="" min="<?php echo date('Y-m-d')?>" disabled>
            <span id="errorperiodoCobFechaFin" class="error"></span>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12">
            <br><span class="required">*</span><span> Fotografías:</span> <br>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <br><input type="button" class="fotos btn btn-default btn-block" id="foto1" value="Ver archivo 1">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <br><input type="button" class="fotos btn btn-default btn-block" id="foto2" value="Ver archivo 2">
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-10">
            <a href="<?php echo base_url('Credencializacion/Ctrl_Vehiculos')?>" class="btn btn-default ">Regresar</a>
        </div>
        <div class="col-xs-2 d-flex justify-content-end">
            <div class="Reactivar p-1">
                <a title="Reactivar" onclick="pedir_confirmacion_reactivar()">
                    <span class="glyphicon glyphicon-ok-circle reactivar"></span>
                 </a>
            </div>
            <div class="Editar p-1">
                <a title="Modificar" onclick="editar()">
                    <span class="glyphicon glyphicon-edit editar"></span>
                 </a>
            </div>
            <div class="Eliminar p-1">
                <a title="Dar de baja" onclick="eliminar()">
                    <span class="glyphicon glyphicon-trash eliminar"></span>
                 </a>
            </div>
        </div>
    </div>
</div>


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
