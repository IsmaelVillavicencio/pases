<div class="container">
  <div class="row">
    <div class="col-xs-12"><br><h3>Autorizar permiso de cabotaje</h3></div>    
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
            <br>Fecha de inicio del permiso:
            <input type="date" id="fechaInicioPermiso" class="lectura" disabled>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Fecha de final del permiso:
            <input type="date" id="fechaFinPermiso" class="lectura" disabled>
          </div>
        </div>
        <div class="tab-pane fade" id="operador">
          <div class="col-xs-12 col-md-12">
            <br><br><table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th width=25%>CURP</th>
                  <th width=30%>Nombre</th>
                  <th width=20%>Verificado por</th>
                  <th width=15%>Estatus</th>
                  <th width=10%>Acciones</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
        <div class="tab-pane fade" id="contenedor">
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-4">
              <br>Autorizado por:
              <input type="text" id="autorizadoPor" class="lectura" disabled>
              </div>
            </div>
            <div class="col-md-8 v-collapse-to-lg"></div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <br><br><table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Nombre</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
            <!--div class="col-md-5 v-collapse-to-lg"></div-->
            <!--div class="row"-->
            <div class="col-md-8 v-collapse-to-lg"></div>
              <div class="col-xs-12 col-sm-6">
                <br><button class="btn btn-default" id="rechazarContenedor">Rechazar</button>
                <button class="btn btn-default ml-4" id="VerificarContenedor">Verificar</button>
              </div>
            <!--/div-->
        </div>
        <div class="tab-pane fade" id="tracto">
            <div class="col-xs-12 col-md-12">
              <br><br><table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th width=25%>Tipo de vehículo</th>
                    <th width=25%>Número de serie</th>
                    <th width=30%>Verificado por</th>
                    <th width=10%>Estatus</th>
                    <th width=10%>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-pane fade" id="vehiculo">
            <div class="col-xs-12">
              <br><br><table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th width=20%>Tipo de vehículo</th>
                    <th width=20%>Número de placa</th>
                    <th width=20%>Número de serie</th>
                    <th width=20%>Verificado por</th>
                    <th width=10%>Estatus</th>
                    <th width=10%>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
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
      <br><button class="btn btn-default">Anterior</button>
      <button class="btn btn-default ml-4">Siguiente</button>
    </div>
  </div>
</div>