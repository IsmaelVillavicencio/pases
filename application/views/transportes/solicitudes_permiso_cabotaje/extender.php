<div class="container">
  <div class="row">
    <div class="col-xs-12"><br><h3>Permiso de cabotaje</h3></div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br>Nombre de la empresa:
      <input type="text" class="lectura">
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br>Número de referencia:
      <input type="text" class="lectura">
    </div>
    <div class="col-md-4 v-collapse-to-lg"></div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br>IMO:
      <input type="text" class="lectura">
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br>Nombre:
      <input type="text" class="lectura">
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br>Número de viaje:
      <input type="text" class="lectura">
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br>Toneladas a cargar:
      <input type="text" class="lectura">
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br>Tipo de producto:
      <input type="text" class="lectura">
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br>Empresa maniobrista:
      <input type="text" class="lectura">
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br>Puerto destino:
      <input type="text" class="lectura">
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br>Tipo de permiso:
      <select class="lectura"></select>
      <span class="error"></span>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br><span class="required">*</span>&nbsp;Número de días del permiso:
      <input type="text" class="form-control" required>
      <span class="error"></span>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br><span class="required">*</span>&nbsp;Fecha de inicio del permiso:
      <input type="text" class="form-control" required>
      <span class="error"></span>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4">
      <br><span class="required">*</span>&nbsp;Fecha de final del permiso:
      <input type="text" class="form-control" required>
      <span class="error"></span>
    </div>
  </div>
  <div class="row" id="navPermisosCabotaje">
    <div class="col-xs-12">
      <br><br><ul class="nav nav-tabs">
        <li class="active"><a class="nav-link" id="operadortab" data-orden="1" data-toggle="tab" href="#operador">Operadores</a></li>
		    <li><a class="nav-link" id="contenedortab" data-orden="2" data-toggle="tab" href="#contenedor">Contenedores</a></li>
        <li><a class="nav-link" id="vehiculotab" data-orden="3" data-toggle="tab" href="#vehiculo">Vehículos</a></li>
        <li><a class="nav-link" id="tractotab" data-orden="4" data-toggle="tab" href="#tracto">Tractos</a></li>
      </ul>
    </div>
    <div class="col-xs-12">
      <div class="tab-content">
        <div class="tab-pane fade in active" id="operador">
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de solicitud:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Estatus:
              <input type="text" class="lectura">
            </div>
            <div class="col-md-4 v-collapse-to-lg"></div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>CURP:
              <input type="text" class="lectura">
            </div>
            <div class="col-md-8 v-collapse-to-lg"></div>
            <div class="col-xs-12 col-md-8">
              <br>Nombre completo:
              <input type="text" class="lectura">
            </div>
            <div class="col-md-4 v-collapse-to-lg"></div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de seguro social:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Fecha de nacimiento:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>RFC:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Fecha de examen médico:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Foto del operador:<br>
              <button class="btn btn-light btn-border">Ver archivo</button>
            </div>
            <div class="col-md-4 col-sm-6 v-collapse-to-md"></div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Tipo de identificación:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de identificación:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Fecha de vencimiento:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Imagen de identificación:<br>
              <button class="btn btn-light btn-border">Ver archivo</button>
            </div>
            <div class="col-md-8 v-collapse-to-lg"></div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Tipo de licencia:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de licencia:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Fecha de expedición:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Fecha de vencimiento:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Imagen de la licencia:<br>
              <button class="btn btn-light btn-border">Ver archivo</button>
            </div>
            <div class="col-md-4 col-sm-6 v-collapse-to-md"></div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Correo electrónico:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de teléfono:
              <input type="text" class="lectura">
            </div>
          </div>
          <div class="col-xs-12 col-md-10">
            <br><br><table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>CURP</th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="tab-pane fade" id="contenedor">
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de solicitud:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Estatus:
              <input type="text" class="lectura">
            </div>
            <div class="col-md-4 v-collapse-to-lg"></div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de contenedor:
              <input type="text" class="lectura">
            </div>
            <div class="col-md-8 col-sm-6 v-collapse-to-md"></div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br><br><table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="vehiculo">
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de solicitud:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Estatus:
              <input type="text" class="lectura">
            </div>
            <div class="col-md-4 v-collapse-to-lg"></div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de placa:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de serie:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de motor:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Marca:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Modelo:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Año:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Color:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Tipo de vehículo:
              <input type="text" class="lectura">
            </div>
            <div class="col-md-4 v-collapse-to-lg"></div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Tipo de tarjeta de circulación:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de tarjeta:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Vigencia de tarjeta de circulación:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Tipo de documento:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de factura:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 mt-md-5">
              <br><button class="btn btn-light btn-border">Ver documento</button>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Aseguradora:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de póliza:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Vigencia de póliza:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Período de póliza:
              <input type="text" class="lectura">
            </div>
            <div class="col-md-8 v-collapse-to-lg"></div>
            <div class="col-xs-12">
              <br>Período de cobertura:
            </div>
            <div class="col-xs-6 col-md-4">
              Fecha inicio:
              <input type="text" class="lectura w-inherit">
            </div>
            <div class="col-xs-6 col-md-4">
              Fecha fin:
              <input type="text" class="lectura w-inherit">
            </div>
            <div class="col-md-4 v-collapse-to-lg"></div>
            <div class="col-xs-6 col-md-4">
              <br>Fotografías:<br>
              <button class="btn btn-light btn-border">Ver archivo</button>
            </div>
            <div class="col-xs-12">
              <br><br><table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Tipo de vehículo</th>
                    <th>Número de placa</th>
                    <th>Número de serie</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="tracto">
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de solicitud:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Estatus:
              <input type="text" class="lectura">
            </div>
            <div class="col-md-4 v-collapse-to-lg"></div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Placa:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Tipo de placa:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de serie:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de motor:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Color:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Marca:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Modelo (año):
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Capacidad (toneladas):
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Tipo de transporte:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número económico:
              <input type="text" class="lectura">
            </div>
            <div class="col-md-8 v-collapse-to-lg"></div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>CAAT:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Vigencia del CAAT:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Foto:<br>
              <button class="btn btn-ligth">Ver archivo</button>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Tarjeta de circulación:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Fecha de expedición:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Imagen:<br>
              <button class="btn btn-ligth">Ver archivo</button>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de póliza de seguro:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Tipo (cobertura):
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Fecha de expedición:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Fecha de vencimiento:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Compañía:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-6 col-md-4">
              <br>Imagen:<br>
              <button class="btn btn-ligth">Ver archivo</button>
            </div>
            <div class="col-xs-12 col-md-6">
              <br><br><table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Tipo de vehículo</th>
                    <th>Número de serie</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-sm-6">
      <br><button class="btn btn-default btn-border">Regresar</button>
      <button class="btn btn-primary btn-border ml-4">Guardar</button>
    </div>
    <div class="col-xs-12 col-sm-6 text-right">
      <br><button class="btn btn-light btn-border">Anterior</button>
      <button class="btn btn-light btn-border ml-4">Siguiente</button>
    </div>
  </div>
</div>