<div class="container">
    <div class="row">
        <div class="col-xs-12"><h3>Modificar de vehículos</h3></div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Número de placa:</span>
            <input type="text" id="noPlaca" class="form-control reiniciar-vehiculo req alfa" maxlength="10" value="" readonly>
            <span id="errornoPlaca" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span>Número de serie:</span>
            <input type="text" id="noSerieVehiculo" class="form-control reiniciar-vehiculo alfa" maxlength="17" value="" readonly>
            <span id="errornoSerieVehiculo" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Número de motor:
            <input type="text" id="noMotor" class="form-control reiniciar-vehiculo alfa" minlength="6" maxlength="10" value="">
            <span id="errornoMotor" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Marca:
            <input type="text" id="marcaVehiculo" class="lectura reiniciar-vehiculo " value="" disabled>
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
            <input type="text" id="color" class="lectura reiniciar-vehiculo " value="" disabled>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Tipo de vehículo:</span>
            <select id="tipoVehiculo" class="form-control reiniciar-vehiculo" required>
                <option value="">Seleccione</option>
            </select>
            <span id="errortipoVehiculo" class="error"></span>
        </div>
        <div class="col-xs-4 v-collapse-to-lg"></div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Tipo de tarjeta de circulación:</span>
            <select id="tipoTarjetaCirculacion" class="form-control reiniciar-vehiculo req" required>
                <option value="">Seleccione</option>
            </select>
            <span id="errortipoTarjetaCirculacion" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Número de tarjeta:</span>
            <input type="text" id="noTarjeta" class="form-control reiniciar-vehiculo req alfa" value="" required>
            <span id="errornoTarjeta" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Vigencia de tarjeta de circulación:</span>
            <input type="date" id="vigenciaTarjeta" class="form-control reiniciar-vehiculo req"  value="" min="<?php echo date('Y-m-d')?>"  required>
            <span id="errorvigenciaTarjeta" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Tipo de documento:</span>
            <select id="tipodocumentoVeh" class="form-control reiniciar-vehiculo req ">
                <option value="">Seleccione</option>
            </select>
            <span id="errortipodocumentoVeh" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span> <span>Número de factura:</span>
            <input type="text" id="noFacturaVeh" class="form-control reiniciar-vehiculo   alfa req" value="" onKeyPress="if(this.value.length==20) return false;" required>
            <span id="errornoFacturaVeh" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 mt-md-5">
            <br><input type="button" class="btn btn-default btn-border btn-block" id="btnSubirFacturaVehiculo" value="Actualizar documento">
            <span id="errorSubirFacturaVehiculo" class="error"></span>
			<div id="divVisuzaliarfactura">
                <a href="#!" target="_blank" class="fotos" id="Visuzaliarfactura"> <i class='glyphicon glyphicon-paperclip'></i> Visualizar factura</a>
			</div>
              <!--input type="button" class=" btn btn-default btn-border  " id="foto3" value="Ver archivo"-->
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Aseguradora:</span>
            <select id="aseguradorasVeh" class="form-control reiniciar-vehiculo req " required>
                <option value="">Seleccione</option>
            </select>
            <span id="erroraseguradorasVeh" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Número de póliza:</span>
            <input type="text" id="noPoliza" class="form-control reiniciar-vehiculo req alfa" value="" onKeyPress="if(this.value.length==20) return false;" required>
            <span id="errornoPoliza" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Vigencia de póliza:</span>
            <input type="date" id="vigenciaPoliza" class="form-control reiniciar-vehiculo req   " value="" min="<?php echo date('Y-m-d')?>" required>
            <span id="errorvigenciaPoliza" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Período de pago:</span>
            <select id="periodoPago" class="form-control reiniciar-vehiculo req" required>
                <option value="">Seleccione</option>
            </select>
            <span id="errorperiodoPago" class="error"></span>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12">
            <br>Período de cobertura:
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Fecha inicio:</span>
            <input type="date" id="periodoCobFechaInicio" class="form-control reiniciar-vehiculo req" value="" max="<?php echo date('Y-m-d')?>"   max="<?php echo date('Y-m-d')?>"required>
            <span id="errorperiodoCobFechaInicio" class="error"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span class="required">*</span><span> Fecha fin:</span>
            <input type="date" id="periodoCobFechaFin" class="form-control reiniciar-vehiculo req" value="" min="<?php echo date('Y-m-d')?>" min="<?php echo date('Y-m-d')?>" required>
            <span id="errorperiodoCobFechaFin" class="error"></span>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12">
            <br><span class="required">*</span><span> Subir fotografías:</span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <br><input type="button" class="btn btn-default btn-border btn-block" id="btnSubirVehiculo" value="Actualizar archivo">
            <span id="errorSubirFotoVehiculo" class="error"></span>
			<div id="divVisuzaliarvehiculo">
                <a href="#!" target="_blank" class="fotos" id="Visuzaliarveh1"> <i class='glyphicon glyphicon-paperclip'></i> Archivo 1 </a>
			  <a href="#!" target="_blank" class="fotos" id="Visuzaliarveh2"> <i class='glyphicon glyphicon-paperclip'></i> Archivo 2</a>
			</div>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-6 col-md-3">
            <a href="#!" id="regresar"  class="btn btn-default btn-block">Regresar</a>
        </div>
        <div class="col-xs-6 col-md-3">
            <input type="button" class="btn btn-primary btn-block" id="guardar" value="Guardar">
        </div>
    </div>
</div>
<div class="modal" id="modalVehiculoFactura" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Factura</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerVehiculoFactura"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <!--label for="adjuntarVehiculoFactura" class="btn btn-sm btn-secondary adjuntarVehiculoFactura">Seleccionar archivo</label-->
                        <!--input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarVehiculoFactura" data-id="0" data-imagen="" style="display:none;"-->
						<input type="button" class="btn btn-sm btn-secondary adjuntarVehiculoFactura" id="adjuntarVehiculoFactura" value="Seleccionar archivo">

                        <span id="erroradjuntarVehiculoFactura" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary ml-4" data-dismiss="modal" id="btnAceptarAdjuntarVehiculoFactura">Aceptar</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="modalVehiculo" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Vehículo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerVehiculo"></div>
					<div class="col-xs-12" id="fotografiaLateral" style="margin-top:7px">
                        <label>Adjuntar fotografía lateral</label><br>
                        <!--label for="ajuntarLateralVehiculo" class="btn btn-sm btn-secondary ajuntarLateralVehiculo">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="ajuntarLateralVehiculo" data-id="0" data-imagen="" style="display:none;"-->
						<input type="button" class="btn btn-sm btn-secondary adjuntarVehiculofoto"  id="adjuntarVehiculoLate" value="Seleccionar archivo">
                    </div>
					<div class="col-xs-12" id="fotografiaPlaca" style="display:none;margin-top:10px">
                        <label>Adjuntar fotografía placa</label><br>
                        <input type="button" class="btn btn-sm btn-secondary adjuntarVehiculofoto" id="adjuntarVehiculoPla" value="Seleccionar archivo">
                    </div>
					<div class="col-xs-12">
						<span id="errorFotografiasVehiculos" class="error"></span>
					</div>
                </div>
            </div>
            <div class="modal-footer">
				<button type="button" class="btn btn-secondary ml-4" id="btnSiguienteAdjuntarVehiculo" style="display:none;">Siguiente</button>
                <button type="button" class="btn btn-primary btnAceptarAdjuntarVechiculo ml-4" data-dismiss="modal" id="btnAceptarAdjuntarVechiculo" style="display:none">Aceptar</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
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
