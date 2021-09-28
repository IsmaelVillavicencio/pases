<div class="container">
  <div class="row">
    <div class="col-xs-12"><h3>Registro de vehículos</h3></div>
    <div class="col-xs-12">
      <br><span><span class="required">*</span> Capturar:</span>
    </div>
		<div class="col-xs-6 col-md-4">
			<br><input type="radio" id="capturar" value="manual" checked name="capturar">&nbsp;Manualmente
		</div>
		<div class="col-xs-6 col-md-4">
			<br><input type="radio" id="capturar" value="excel" name="capturar">&nbsp;Subir Excel
		</div>
  </div>
	<div id="upexcel" class="hide">



    <div id="textosube">
      <br>
     <p> Descargue el archivo para capturar la información necesaria para el registro de vehículos
        <a href='../../assets/uploads/credencializacion/vehiculos/Plantilla Vehículo V2.xlsx' target="_blank" >Descargar archivo</a> </p>
        <br>
     <p> Subir documento de excel</p>
     <input type="button" class="btn btn-default btn-border  mt-3 mt-md-0  " id="btnsubirdocumento" value="Subir archivo">
     <span id="erroradjuntarExcel" class="error"></span>
     <br>

   </div>
    <br>
    <br>
     <div id="procesaexcel"></div>


     <div class="row">
       <div id='errorImportar'>
       </div>
       <div class="col-md-12  " id="capaImportar">
         <div id='capabusca'></div>
         <br>
         <div class="table-responsive ">
         <table id="tabImportar" class="table table-striped table-bordered  no-footer">
           <thead class="Tabla">
             <tr>
               <th> </th>
               <th >Número de placa</th>
               <th >Número de serie </th>
               <th> Número de motor</th>
               <th> Marca </th>
               <th> Modelo </th>
               <th> Año </th>
               <th> Color </th>
               <th> Tipo de vehículo </th>
               <th> Tipo de tarjeta de circulación</th>
               <th> Número tarjeta de circulación </th>
               <th> Vigencia tarjeta de circulación </th>
               <th> Tipo de documento</th>
               <th> Número de factura</th>
               <th> Aseguradora</th>
               <th> Número de póliza </th>
               <th> Vigencia de póliza </th>
               <th> Período de pago </th>
               <th> Período de cobertura </th>
               <th> Acciones </th>
             </tr>
           </thead>
           <tbody>
           </tbody>
         </table>
       </div>


       <div class="hide" id="btnImportar">
         <br>
           <p id="si_manda" class="hide">Todos los registros cumplen con la validación del sistema, si desea importar los registros, solo debe dar click en el botón "Guardar" </p>
           <div class="col-md-3">
             <a href="<?php echo base_url('Credencializacion/Ctrl_Vehiculos')?>" class="btn btn-default btn-block mt-3 mt-md-0 mt-lg-0 mt-xl-0">Regresar</a>
           </div>
           <div class="col-md-3">
             <input type="button" id="sisaveexcel" class="btn btn-primary btn-block" value="Guardar">
           </div>
       </div>

       </div>
     </div>



	</div>
	<div id="upmanual">
		<div class="row">
			<div class="col-xs-12 col-sm-6 col-md-4">
				<br><span class="required">*</span><span> Número de placa:</span>
				<input type="text" id="noPlaca" class="form-control reiniciar-vehiculo alfa req" maxlength="10" value="">
				<span id="errornoPlaca" class="error"></span>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-4">
				<br><span class="required">*</span><span> Número de serie:</span>
				<input type="text" id="noSerieVehiculo" class="form-control reiniciar-vehiculo alfa req" maxlength="17" value="">
				<span id="errornoSerieVehiculo" class="error"></span>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-4">
				<br>Número de motor:
				<input type="text" id="noMotor" class="form-control reiniciar-vehiculo alfa" minlength="6" maxlength="10" value=""  onKeyPress="if(this.value.length==20) return false;" >
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
				<select id="tipoVehiculo" class="form-control reiniciar-vehiculo req" required>
					<option value="">Seleccione</option>
				</select>
				<span id="errortipoVehiculo" class="error"></span>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12 col-sm-6 col-md-4">
				<br><span class="required">*</span><span> Tipo de tarjeta de circulación:</span>
				<select id="tipoTarjetaCirculacion" class="form-control reiniciar-vehiculo req" required>
					<option value="">Seleccione</option>
				</select>
				<span id="errortipoTarjetaCirculacion" class="error"></span>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-4">
				<br><span class="required">*</span><span> Número de tarjeta:</span>
				<input type="text" id="noTarjeta" class="form-control reiniciar-vehiculo alfa req" value="" maxlength="20"  onKeyPress="if(this.value.length==20) return false;"  required>
				<span id="errornoTarjeta" class="error"></span>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-4">
				<br><span class="required">*</span><span> Vigencia de tarjeta de circulación:</span>
				<input type="date" id="vigenciaTarjeta" class="form-control reiniciar-vehiculo  req"  value="" min="<?php echo date('Y-m-d')?>" required>
				<span id="errorvigenciaTarjeta" class="error"></span>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-4">
				<br><span class="required">*</span><span> Tipo de documento:</span>
				<select id="tipodocumentoVeh" class="form-control reiniciar-vehiculo req">
					<option value="">Seleccione</option>
				</select>
				<span id="errortipodocumentoVeh" class="error"></span>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-4">
				<br><span class="required">*</span> <span>Número de factura:</span>
				<input type="text" id="noFacturaVeh" class="form-control reiniciar-vehiculo req alfa" value="" onKeyPress="if(this.value.length==20) return false;" maxlength="20" required>
				<span id="errornoFacturaVeh" class="error"></span>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 mt-md-5">
				<br><input type="button" class="btn btn-default btn-border btn-block" id="btnSubirFacturaVehiculo" value="Subir documento">
				<span id="errorSubirFacturaVehiculo" class="error"></span>
				<input type="hidden" id="archFact" value="">
				<div id="divVisuzaliarfactura">
					  <a href="#!" target="_blank" class="fotos" id="Visuzaliarfactura">  </a>
				</div>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-4">
				<br><span class="required">*</span><span> Aseguradora:</span>
				<select id="aseguradorasVeh" class="form-control reiniciar-vehiculo req" required>
					<option value="">Seleccione</option>
				</select>
				<span id="erroraseguradorasVeh" class="error"></span>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-4">
				<br><span class="required">*</span><span> Número de póliza:</span>
				<input type="text" id="noPoliza" class="form-control reiniciar-vehiculo alfa req" value="" onKeyPress="if(this.value.length==20) return false;" maxlength="20" required>
				<span id="errornoPoliza" class="error"></span>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-4">
				<br><span class="required">*</span><span> Vigencia de póliza:</span>
				<input type="date" id="vigenciaPoliza" class="form-control reiniciar-vehiculo req" value="" min="<?php echo date('Y-m-d')?>" required>
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
			<div class="col-xs-6 col-md-4">
				<br><span class="required">*</span><span> Fecha inicio:</span>
				<input type="date" id="periodoCobFechaInicio" class="form-control reiniciar-vehiculo req fechsep" value="" max="<?php echo date('Y-m-d')?>" required>
				<span id="errorperiodoCobFechaInicio" class="error"></span>
			</div>
			<div class="col-xs-6 col-md-4">
				<br><span class="required">*</span><span> Fecha fin:</span>
				<input type="date" id="periodoCobFechaFin" class="form-control reiniciar-vehiculo req fechsep" value="" min="<?php echo date('Y-m-d')?>" required>
				<span id="errorperiodoCobFechaFin" class="error"></span>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<br><span class="required">*</span><span> Subir fotografías:</span>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
				<br><input type="button" class="btn btn-default btn-border btn-block" id="btnSubirVehiculo" value="Subir archivo">
				<span id="errorSubirFotoVehiculo" class="error"></span>
				<input type="hidden" id="archLate" value="">
				<input type="hidden" id="archPla" value="">
				<div id="divVisuzaliarvehiculo">
					<a href="#!" target="_blank" class="fotos" id="Visuzaliarveh1"></a>
					<a href="#!" target="_blank" class="fotos" id="Visuzaliarveh2"></a>
				</div>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-8 col-lg-9 content text-right" style="padding-top:2px">
				<br><button class="btn btn-default btn-border" id="anadirVehiculo">+</button>
			</div>
			<div class="col-xs-12">
				<span  class="error errorVehiculoDuplicado"></span>
			</div>
		</div>
		<br><br>
		<div class="row">
			<div class="col-xs-12 table-responsive">
				<table id="tabVehiculos" class="table table-striped table-bordered">
					<thead>
						<tr>
							<th width=25%>No. Placa</th>
							<th width=25%>No. Serie</th>
							<th width=15%>Marca</th>
							<th width=15%>Año</th>
							<th width=15%>Tipo de vehículo</th>
							<th width=15%>Acciones</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</div>
		<br>
		<div class="row">
			<div class="col-xs-6 col-md-3">
				<a href="<?php echo base_url('Credencializacion/Ctrl_Vehiculos')?>" class="btn btn-default btn-block">Regresar</a>
			</div>
			<div class="col-xs-6 col-md-3">
				<input type="button" class="btn btn-primary btn-block" id="guardar" value="Guardar">
			</div>
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
                        <label for="adjuntarVehiculoFactura" class="btn btn-sm btn-secondary adjuntarVehiculoFactura">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarVehiculoFactura" data-id="" data-imagen="" style="display:none;">
                        <span id="erroradjuntarVehiculoFactura" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="btnAceptarAdjuntarVehiculoFactura">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
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

						<input type="button" class="btn btn-sm btn-secondary adjuntarVehiculofoto"  id="adjuntarVehiculoLate" value="Seleccionar archivo">
                    </div>
					<div class="col-xs-12" id="fotografiaPlaca" style="display:none;margin-top:10px">
                        <label>Adjuntar fotografía placa</label><br>

                        <input type="button" class="btn btn-sm btn-secondary adjuntarVehiculofoto" id="adjuntarVehiculoPla" value="Seleccionar archivo">                    </div>
					<div class="col-xs-12">
						<span id="errorFotografiasVehiculos" class="error"></span>

					</div>
                </div>
            </div>
            <div class="modal-footer">
				<button type="button" class="btn btn-secondary" id="btnSiguienteAdjuntarVehiculo" style="display:none;">Siguiente</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="btnAceptarAdjuntarVechiculo" style="display:none">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>


<div class="modal" id="modealExcel" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Importar archivo de Excel</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar archivo</label><br>
                        <label for="adjuntarExcel" class="btn btn-sm btn-secondary adjuntarExcel">Seleccionar archivo</label>
                        <input type="file" id="adjuntarExcel" data-id="" data-imagen="" style="display:none;">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal"  id="btnProcesaExcel">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" id="modal_confirmar_guardar_exe" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Importar </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="mensaje_confirmar_guardar">
                ¿Está seguro que desea guardar el registro?
				<input type='hidden' id='archexporta' value=''>
            </div>
            <div class="modal-footer">
                <button id="confirmar_guardar_exe" type="button" class="btn btn-primary" >Aceptar</button>
                <button id="close" type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
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
