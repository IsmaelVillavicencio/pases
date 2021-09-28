<div class="container">
  <div class="row">
    <div class="col-xs-12"><br><h3>Registrar permiso de cabotaje</h3></div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br>Nombre de la empresa:
      <input type="text" id="nombreEmpresas" class="lectura" disabled>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br>Número de referencia:
      <input type="text" id="noReferencia" class="lectura" disabled>
    </div>
    <div class="col-md-4 v-collapse-to-lg"></div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br><span class="required">*</span>&nbsp;IMO:
      <input type="number" id="imo" class="form-control" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==7) return false;" onPaste="if(this.value.length==7) return false;" required>
      <span id="errorimo" class="error"></span>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br><span class="required">*</span>&nbsp;Nombre:
      <input type="text" id="nombre" class="form-control" maxlength="50" required>
      <span id="errornombre" class="error"></span>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br><span class="required">*</span>&nbsp;Número de viaje:
      <select id="noViaje" class="form-control" required></select>
      <span id="errornoViaje" class="error"></span>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br><span class="required">*</span>&nbsp;Toneladas a cargar:
      <input type="number" id="toneladas" class="form-control" onKeyPress="if(this.value.length==3) return false;" onPaste="if(this.value.length==3) return false;" required>
      <span id="errortoneladas" class="error"></span>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br><span class="required">*</span>&nbsp;Tipo de producto:
      <select id="tipoProducto" class="form-control" required></select>
      <span id="errortipoProducto" class="error"></span>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br><span class="required">*</span>&nbsp;Empresa maniobrista:
      <select id="empresaManiobrista" class="form-control" required></select>
      <span id="errorempresaManiobrista" class="error"></span>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br>Puerto destino:
      <input id="ptoDestino" type="text" class="lectura" disabled>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br><span class="required">*</span>&nbsp;Tipo de permiso:
      <select id="tipoPermiso" class="form-control" required></select>
      <span id="errortipoPermiso" class="error"></span>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br><span class="required">*</span>&nbsp;Número de días del permiso:
      <input id="noDias" type="number" class="form-control" onKeyPress="if(this.value.length==3) return false;" onPaste="if(this.value.length==3) return false;" required>
      <span id="errornoDias" class="error"></span>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br><span class="required">*</span>&nbsp;Fecha de inicio del permiso:
      <input id="fechaInicioPermiso" type="date" class="form-control" required>
      <span id="errorfechaInicioPermiso" class="error"></span>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br>Fecha final del permiso:
      <input id="fechaFinPermiso" type="date" class="lectura" disabled>
    </div>
    <div class="col-md-12">
      <br><span class="required">*</span>&nbsp;Motivo:
      <textarea id="motivo" class="form-control" rows="5" required value=""></textarea>
      <span id="errormotivo" class="error"></span>
      </div>
  </div>
  <div class="row" id="navPermisosCabotaje">
    <div class="col-xs-12">
      <br><br><ul class="nav nav-tabs">
        <li class="active"><a class="nav-link" id="operadortab" data-orden="1" data-toggle="tab" href="#operador">Operadores</a></li>
		    <li><a class="nav-link" id="contenedortab" data-orden="2" data-toggle="tab" href="#contenedor">Contenedores</a></li>
        <li><a class="nav-link" id="tractotab" data-orden="3" data-toggle="tab" href="#tracto">Tractos</a></li>
        <!--li><a class="nav-link" id="vehiculotab" data-orden="4" data-toggle="tab" href="#vehiculo">Vehículos</a></li-->
      </ul>
    </div>
    <div class="col-xs-12">
      <div class="tab-content">
        <div class="tab-pane fade in active" id="operador">
          <div class="row">
            <div class="col-xs-12">
              <br><span class="required">*</span>&nbsp;Capturar:
              <div class="radio">
                <label for="operadoresManual"><input type="radio" name="capturaOperadores" id="operadoresManual" checked="checked">Manualmente</label>
                <label for="operadoresExcel" class="ml-4"><input type="radio" name="capturaOperadores" id="operadoresExcel">Subir excel</label>
              </div>
            </div>
            <div class="row m-0" id="divOperadoresManual">
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br><span class="required">*</span>&nbsp;CURP:
                <input type="text" id="curp" class="form-control" required>
                <span id="errorcurp" class="error"></span>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4 mt-md-5">
                <br>
              <button class="btn btn-default escanear-escaner hidden-xs visible-md visible-lg visible-xl">Escanear CURP</button>
                <!--br><button class="btn btn-default" id="escanear">Escanear</button-->
              </div>
              <div class="col-md-4 v-collapse-to-lg"></div>
              <div class="col-xs-12 col-md-8">
                <br><span class="required">*</span>&nbsp;Nombre completo:
                <select id="nombreCompleto" class="form-control"></select>
                <span id="errornombreCompleto" class="error"></span>
              </div>
              <div class="col-md-4 v-collapse-to-lg"></div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Número de seguro social:
                <input type="text" id="noss" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Fecha de nacimiento:
                <input type="text" id="fechaNacimiento" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>RFC:
                <input type="text" id="rfc" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Fecha de examen médico:
                <input type="text" id="fechaExamenMedico" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Foto del operador:<br>
                <button class="btn btn-default" id="fotoOperador">Ver archivo</button>
              </div>
              <div class="col-md-4 col-sm-6 v-collapse-to-md"></div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Tipo de identificación:
                <input type="text" id="tipoIentificacion" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Número de identificación:
                <input type="text" id="noIdentificacion" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Fecha de vencimiento:
                <input type="text" id="fechaVencimiento" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Imagen de identificación:<br>
                <button class="btn btn-default" id="fotoIdentificacion">Ver archivo</button>
              </div>
              <div class="col-md-8 v-collapse-to-lg"></div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Tipo de licencia:
                <input type="text" id="tipoLicencia" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Número de licencia:
                <input type="text" id="noLicencia" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Fecha de expedición:
                <input type="text" id="fechaExpLicencia" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Fecha de vencimiento:
                <input type="text" id="fechaVencimientoLic" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Imagen de la licencia:<br>
                <button class="btn btn-default" id="fotoLicencia">Ver archivo</button>
              </div>
              <div class="col-md-4 col-sm-6 v-collapse-to-md"></div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Correo electrónico:
                <input type="text" id="correo" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Número de teléfono:
                <input type="text" id="noTelefono" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4 mt-md-5">
                <br><button title="Agregar" id="agregarOperador" class="btn btn-default">+</button>
              </div>
            </div>
            <div class="row m-0" hidden id="divOperadoresExcel">
              <div class="col-xs-12">
                <br><br>Descargue el archivo para capturar la información necesaria para el registro de operadores:<br><br>
                <a href="<?php echo base_url(); ?>assets\uploads\permisos_cabotaje\operadores\operadores.xlsx" class="btn btn-default">Descargar archivo</a>
              </div>
              <div class="col-xs-12">
                <br><br>Subir documentos excel<br><br>
                <button class="btn btn-default" id="subirArchivoOperador">Subir archivo</button>
              </div>
            </div>
            <div class="col-xs-12">
              <br><br><table id="tabOperadores" class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th width="45%">CURP</th>
                    <th width="45%">Nombre</th>
                    <th width="10%">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="contenedor">
          <div class="row">
            <div class="col-xs-12">
              <br><span class="required">*</span>&nbsp;Capturar:
              <div class="radio">
                <label for="contenedoresManual"><input type="radio" name="capturaContenedores" id="contenedoresManual" checked="checked">Manualmente</label>
                <label for="contenedoresExcel" class="ml-4"><input type="radio" name="capturaContenedores" id="contenedoresExcel">Subir excel</label>
              </div>
            </div>
            <div class="row m-0 w-100" id="divContenedoresManual">
              <div class="col-xs-10 col-md-4">
                <br><span class="required">*</span>&nbsp;Número de contenedor:
                <input type="text" id="noContenedor" class="form-control" onKeyPress="if(this.value.length==20) return false;" onPaste="if(this.value.length==20) return false;">
                <span id="errornoContenedor" class="error"></span>
              </div>
              <div class="col-xs-2 col-md-4 mt-5">
                <br><button title="Agregar" id="agregarContenedor" class="btn btn-default">+</button>
              </div>
            </div>
            <div class="row m-0" id="divContenedoresExcel" hidden>
              <div class="col-xs-12">
                <br><br>Descargue el archivo para capturar la información necesaria para el registro de contenedores:<br><br>
                <a href="<?php echo base_url(); ?>assets\uploads\permisos_cabotaje\contenedores\contenedores.xlsx" class="btn btn-default">Descargar archivo</a>
              </div>
              <div class="col-xs-12">
                <br><br>Subir documentos excel<br><br>
                <button class="btn btn-default">Subir archivo</button>
              </div>
            </div>
            <div class="col-xs-12 col-md-8">
              <br><br><table id="tabContenedores" class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th width="80%">Nombre</th>
                    <th width="20%">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="tracto">
          <div class="row">
            <div class="col-xs-12">
              <br><span class="required">*</span>&nbsp;Capturar:
              <div class="radio">
                <label for="tractosManual"><input type="radio" name="capturaTractos" id="tractosManual" checked="checked">Manualmente</label>
                <label for="tractosExcel" class="ml-4"><input type="radio" name="capturaTractos" id="tractosExcel">Subir excel</label>
              </div>
            </div>
            <div class="row m-0 w-100" id="divTractosManual">
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br><span class="required">*</span>&nbsp;Placa:
                <input type="text" id="placaTracto" class="form-control" onKeyPress="if(this.value.length==10) return false;" onPaste="if(this.value.length==10) return false;" required>
                <span id="errorplacaTracto" class="error"></span>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Tipo de placa:
                <input type="text" id="tipoPlacaTracto" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br><span class="required">*</span>&nbsp;Número de serie:
                <input type="text" id="noSerieTracto" class="form-control" onKeyPress="if(this.value.length==17) return false;" onPaste="if(this.value.length==17) return false;" required>
                <span id="errornoSerieTracto" class="error"></span>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Número de motor:
                <input type="text" id="noMotorTracto" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Color:
                <input type="text" id="colorTracto" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Marca:
                <input type="text" id="marcaTracto" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Modelo (año):
                <input type="text" id="modeloTracto" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Capacidad (toneladas):
                <input type="text" id="capacidadTracto" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Tipo de transporte:
                <input type="text" id="tipoTransporteTracto" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Número económico:
                <input type="text"  id="noEconomico" class="lectura" disabled>
              </div>
              <div class="col-md-8 v-collapse-to-lg"></div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>CAAT:
                <input type="text" id="caat" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Vigencia del CAAT:
                <input type="text" id="vigenciaCaat" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Foto:<br>
                <button class="btn btn-default" id="fotoVigenciaCaat">Ver archivo</button>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Tarjeta de circulación:
                <input type="text" id="tarjetaCirculacionTracto" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Fecha de expedición:
                <input type="text" id="fechaExpTarjetaTracto" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Imagen:<br>
                <button class="btn btn-default" id="fotoTarjetaCirculacion">Ver archivo</button>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Número de póliza de seguro:
                <input type="text" id="noPolizaTracto" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Tipo (cobertura):
                <input type="text" id="tipoCoberturaTracto" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Fecha de expedición:
                <input type="text" id="fechaExpPolizaTracto" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Fecha de vencimiento:
                <input type="text" id="fechaVenPolizaTracto" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Compañía:
                <input type="text" id="compania" class="lectura" disabled>
              </div>
              <div class="col-xs-6 col-md-3">
                <br>Imagen:<br>
                <button class="btn btn-default" id="fotoPolizaTracto">Ver archivo</button>
              </div>
              <div class="col-xs-6 col-md-1 mt-5">
                <br><button title="Agregar" id="agregarTracto" class="btn btn-default">+</button>
              </div>
            </div>
            <div class="row m-0" id="divTractosExcel" hidden>
              <div class="col-xs-12">
                <br><br>Descargue el archivo para capturar la información necesaria para el registro de tractos:<br><br>
                <a href="<?php echo base_url(); ?>assets\uploads\permisos_cabotaje\tractos\tractos.xlsx" class="btn btn-default">Descargar archivo</a>
              </div>
              <div class="col-xs-12">
                <br><br>Subir documentos excel<br><br>
                <button class="btn btn-default" id="subirArchivoTracto">Subir archivo</button>
              </div>
            </div>
            <div class="col-xs-12 col-md-8">
              <br><br><table id="tabTractos" class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th width="45%">Número de placa</th>
                    <th width="45%">Número de serie</th>
                    <th width="10%">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!--div class="tab-pane fade" id="vehiculo">
          <div class="row">
            <div class="col-xs-12">
              <br><span class="required">*</span>&nbsp;Capturar:
              <div class="radio">
                <label for="vehiculosManual"><input type="radio" name="capturaVehiculos" id="vehiculosManual" checked="checked">Manualmente</label>
                <label for="vehiculosExcel" class="ml-4"><input type="radio" name="capturaVehiculos" id="vehiculosExcel">Subir excel</label>
              </div>
            </div>
            <div class="row m-0 w-100" id="divVehiculosManual">
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Número de placa:
                <input type="text" id="noPlaca" class="form-control" onKeyPress="if(this.value.length==10) return false;" onPaste="if(this.value.length==10) return false;">
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Número de serie:
                <input type="text" id="noSerie" class="form-control" onKeyPress="if(this.value.length==17) return false;" onPaste="if(this.value.length==17) return false;">
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Número de motor:
                <input type="text" id="noMotor" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Marca:
                <input type="text" id="marca" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Modelo:
                <input type="text" id="modelo" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Año:
                <input type="text" id="anio" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Color:
                <input type="text" id="color" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Tipo de vehículo:
                <input type="text" id="tipoVehiculo" class="lectura" disabled>
              </div>
              <div class="col-md-4 v-collapse-to-lg"></div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Tipo de tarjeta de circulación:
                <input type="text" id="tipoTajetaCirculacion" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Número de tarjeta:
                <input type="text" id="noTarjeta" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Vigencia de tarjeta de circulación:
                <input type="text" id="vigenciaTarjeta" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Tipo de documento:
                <input type="text" id="tipoDocumento" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Número de factura:
                <input type="text" id="noFactura" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4 mt-md-5">
                <br><button class="btn btn-default" id="imagenFactura">Ver documento</button>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Aseguradora:
                <input type="text" id="aseguradora" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Número de póliza:
                <input type="text" id="noPoliza" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Vigencia de póliza:
                <input type="text" id="vigenciaPoliza" class="lectura" disabled>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <br>Período de póliza:
                <input type="text" id="periodoPoliza" class="lectura" disabled>
              </div>
              <div class="col-md-8 v-collapse-to-lg"></div>
              <div class="col-xs-12">
                <br>Período de cobertura:
              </div>
              <div class="col-xs-6 col-md-4">
                Fecha inicio:
                <input type="text" id="fechaIniCobertura" class="lectura w-inherit" disabled>
              </div>
              <div class="col-xs-6 col-md-4">
                Fecha fin:
                <input type="text" id="fechaFinCobertura" class="lectura w-inherit" disabled>
              </div>
              <div class="col-md-4 v-collapse-to-lg"></div>
              <div class="col-xs-6 col-md-3">
                <br>Consultar fotografías:<br>
                <button class="btn btn-default" id="consultarFotos">Ver archivo</button>
              </div>
              <div class="col-xs-6 col-md-1 mt-5">
                <br><button title="Agregar" id="agregarVehiculo" class="btn btn-default">+</button>
              </div>
            </div>
            <div class="row m-0" id="divVehiculosExcel" hidden>
              <div class="col-xs-12">
                <br><br>Descargue el archivo para capturar la información necesaria para el registro de vehículos:<br><br>
                <a href="<?php echo base_url(); ?>assets\uploads\permisos_cabotaje\vehiculos\vehiculos.xlsx" class="btn btn-default">Descargar archivo</a>
              </div>
              <div class="col-xs-12">
                <br><br>Subir documentos excel<br><br>
                <button class="btn btn-default" id="subirArchivoVehiculo">Subir archivo</button>
              </div>
            </div>
            <div class="col-xs-12">
              <br><br><table id="tabVehiculo" class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th width="30%">Tipo de vehículo</th>
                    <th width="30%">Número de placa</th>
                    <th width="30%">Número de serie</th>
                    <th width="10%">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
        </div-->
        
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12">
      <br><button class="btn btn-default" id="regresar">Regresar</button>
      <button class="btn btn-primary ml-4" id="guardar">Guardar</button>
    </div>
  </div>
</div>

<div class="modal" id="modalImagen" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Imagen</h5>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerVehiculo"></div>
					<div class="col-xs-12" id="imagen" style="margin-top:7px">
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="verImagen" data-id="" data-imagen="" style="display:none;">
                    </div>
					<div class="col-xs-12">
						<span id="errorverImagen" class="error"></span>
					</div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" id="cerrarModal">Aceptar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalEscanerCURP" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Escaneo QR de la CURP</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
				<div class="hidden-md hidden-lg hidden-xl">
					<div class="row">
						<div class="col-md-12">
							<video class="col-md-12" id="qr-video" width="100%"></video>
						</div>
					</div>
					<div class="row">
						<b>Estado de escaneo de QR: </b>
						<span id="cam-qr-result">No permitido</span>
					</div>
				</div>
				<div class="hidden-xs hidden-sm">
					<div class="row">
						<div class="col-md-12">
							<label>Realice el escaneo de la QR</label><br>
							<input type="text" id="escaneoQR" class="form-control"/>
						</div>
					</div>
				</div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary visible-xs visible-sm" data-dismiss="modal" id="btnCancelarEscaneo">Cancelar</button>
				<button type="button" class="btn btn-secondary visible-md visible-lg visible-xl" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>