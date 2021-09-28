<div class="container">
  <div class="row">
    <div class="col-xs-12"><br><h3>Consultar permiso de cabotaje</h3></div>
  </div>
  <div class="row" id="navPermisosCabotaje">
    <div class="col-xs-12">
      <br><br><ul class="nav nav-tabs">
        <li class="active"><a class="nav-link" id="generaltab" data-orden="1" data-toggle="tab" href="#general">Datos generales</a></li>
        <li><a class="nav-link" id="operadortab" data-orden="2" data-toggle="tab" href="#operador">Operadores</a></li>
		    <li><a class="nav-link" id="contenedortab" data-orden="3" data-toggle="tab" href="#contenedor">Contenedores</a></li>
        <li><a class="nav-link" id="tractotab" data-orden="4" data-toggle="tab" href="#tracto">Tractos</a></li>
        <li><a class="nav-link" id="vehiculotab" data-orden="5" data-toggle="tab" href="#vehiculo">Vehículos</a></li>
      </ul>
    </div>
    <div class="col-xs-12">
      <div class="tab-content">
        <div class="tab-pane fade in active" id="general">
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Nombre de la empresa:
              <input type="text" id="nombreEmpresa" class="lectura" disabled>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de referencia:
              <input type="text" id="noReferencia" class="lectura" disabled>
            </div>
            <div class="col-md-4 v-collapse-to-lg"></div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>IMO:
              <input type="text" id="imo" class="lectura" disabled>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Nombre:
              <input type="text" id="nombre" class="lectura" disabled>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de viaje:
              <input type="text" id="noViaje" class="lectura" disabled>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Toneladas a cargar:
              <input type="text" id="toneladas" class="lectura" disabled>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Tipo de producto:
              <input type="text" id="noProducto" class="lectura" disabled>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Empresa maniobrista:
              <input type="text" id="empresaManiobrista" class="lectura" disabled>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Puerto destino:
              <input type="text" id="ptoDestino" class="lectura" disabled>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Tipo de permiso:
              <input type="text" id="tipoPermiso" class="lectura" disabled>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de días del permiso:
              <input type="number" id="noDias" class="lectura" disabled>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>;Fecha de inicio del permiso:
              <input type="date" id="fechaInicioPermiso" class="lectura" disabled>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Fecha de final del permiso:
              <input type="date" id="fechaFinPermiso" class="lectura" disabled>
            </div>
            <div class="col-xs-12 text-right">
              <br><a href="#!" title="Imprimir"><span class="glyphicon glyphicon-print imprimir"></span></a>
            </div>
          </div>
        </div>
        <div class="tab-pane" id="operador">
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
          <div class="col-xs-12 text-right">
            <a href="#!" title="Imprimir"><span class="glyphicon glyphicon-print imprimir"></span></a>
          </div>
        </div>
        <div class="tab-pane fade" id="contenedor">
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br><br><table class="table table-striped table-bordered">
                <thead>
                  <tr><th>Nombre</th></tr>
                </thead>
                <tbody>
                  <tr><td>&nbsp;</td></tr>
                  <tr><td>&nbsp;</td></tr>
                </tbody>
              </table>
            </div>
            <div class="col-xs-12 text-right">
              <a href="#!" title="Imprimir"><span class="glyphicon glyphicon-print imprimir"></span></a>
            </div>
        </div>
        <div class="tab-pane fade" id="tracto">
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
            <div class="col-xs-12 text-right">
              <a href="#!" title="Imprimir"><span class="glyphicon glyphicon-print imprimir"></span></a>
            </div>
          </div>
        <div class="tab-pane fade" id="vehiculo">
            <div class="col-xs-12 col-md-10">
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
                </tbody>
              </table>
            </div>
            <div class="col-xs-12 text-right">
              <a href="#!" title="Imprimir"><span class="glyphicon glyphicon-print imprimir"></span></a>
            </div>
        </div>
    </div>
  </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-sm-6">
      <br><br><button class="btn btn-default">Regresar</button>
      <button class="btn btn-primary ml-4">Guardar</button>
    </div>
    <div class="col-xs-12 col-sm-6 text-right">
      <br><br><button class="btn btn-default">Anterior</button>
      <button class="btn btn-default ml-4">Siguiente</button>
    </div>
  </div>
</div>