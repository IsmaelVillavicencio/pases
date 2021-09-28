<div class="container">
  <div class="row">
    <div class="col-xs-12"><br><h3>Autorizar permiso de cabotaje</h3></div>
  </div>
  <div class="row" id="navPermisosCabotaje">
    <div class="col-xs-12">
      <br><br><ul class="nav nav-tabs">
        <li class="active"><a class="nav-link" id="generalestab" data-orden="1" data-toggle="tab" href="#general">Datos generales</a></li>
        <li><a class="nav-link" id="operadortab" data-orden="1" data-toggle="tab" href="#operador">Operadores</a></li>
		    <li><a class="nav-link" id="contenedortab" data-orden="2" data-toggle="tab" href="#contenedor">Contenedores</a></li>
        <li><a class="nav-link" id="vehiculotab" data-orden="3" data-toggle="tab" href="#vehiculo">Vehículos</a></li>
        <li><a class="nav-link" id="tractotab" data-orden="4" data-toggle="tab" href="#tracto">Tractos</a></li>
      </ul>
    </div>
    <div class="col-xs-12">
      <div class="tab-content">
        <div class="tab-pane fade in active" id="general">
          <div class="row">
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
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de días del permiso:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Fecha de inicio del permiso:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Fecha de fin de permiso:
              <input type="text" class="lectura">
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="operador">
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de solicitud:
              <input type="text" class="lectura">
            </div>
            <div class="col-md-8 col-sm-6 v-collapse-to-md"></div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>CURP:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Nombre completo:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Estatus:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Verificado por:
              <input type="text" class="lectura">
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="contenedor">
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Verificado por:
              <input type="text" class="lectura">
            </div>
            <div class="col-md-8 col-sm-6 v-collapse-to-md"></div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br><br><table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Número de contenedor</th>
                    <th>Estatus</th>
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
            <div class="col-xs-12">
              <button class="btn btn-light btn-border">Validar</button>
              <button class="btn btn-light btn-border ml-4">Rechazar</button>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="vehiculo">
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de placa:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de serie:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Estatus:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Verificado por:
              <input type="text" class="lectura">
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="tracto">
          <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de placa:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Número de serie:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Estatus:
              <input type="text" class="lectura">
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Verificado por:
              <input type="text" class="lectura">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-sm-6">
      <br><br><button class="btn btn-default btn-border">Regresar</button>
      <button class="btn btn-primary btn-border ml-4">Guardar</button>
    </div>
    <div class="col-xs-12 col-sm-6 text-right">
      <br><br><button class="btn btn-light btn-border">Anterior</button>
      <button class="btn btn-light btn-border ml-4">Siguiente</button>
    </div>
  </div>
</div>