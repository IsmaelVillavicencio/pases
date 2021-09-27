<style>
* {
  box-sizing: border-box;
}

.img-zoom-container {
  position: relative;
}

.img-zoom-lens {
  position: absolute;
  border: 1px solid #d4d4d4;
  /*set the size of the lens:*/
  width: 100px;
  height: 100px;
}

.img-zoom-result {
  z-index: 99;
  /*set the size of the result div:*/
  width: 200px;
  height: 200px;
  position: fixed;
  /*display: none;*/
}
</style>
<div class="container">
    <div class="row">
        <div class="col-xs-12"><br><h3>Autorizar solicitud de permiso de acceso</h3></div>
    </div>
    <ul class="nav nav-tabs" id="menuSolicituPermisos">
        <li class="active">
            <a class="nav-link" id="datosGeneralestab" data-orden="1" data-toggle="tab" href="#datosGenerales" role="tab" aria-controls="datosGenerales" aria-selected="true">Datos generales</a>
        </li>
        <li>
            <a class="nav-link" id="personaltab" data-orden="2" data-toggle="tab" href="#personal" role="tab" aria-controls="personal" aria-selected="false">Personal</a>
        </li>
		<li>
            <a class="nav-link" id="equipoherramientatab" data-orden="3" data-toggle="tab" href="#equipoherramienta" role="tab" aria-controls="equipoherramienta" aria-selected="false">Equipo/herramienta</a>
        </li>
        <li>
            <a class="nav-link" id="materialGraneltab" data-orden="4" data-toggle="tab" href="#materialGranel" role="tab" aria-controls="vehiculo" aria-selected="false">Material a granel</a>
        </li>
        <li>
            <a class="nav-link" id="vehiculotab" data-orden="5" data-toggle="tab" href="#vehiculo" role="tab" aria-controls="vehiculo" aria-selected="false">Vehículo</a>
        </li>
    </ul>
    <div class="tab-content" id="mymenuSolicitudPermisos">
        <div class="tab-pane active" id="datosGenerales" role="tabpanel" aria-labelledby="datosGeneralestab">
            <div class="row">
                <div class="col-md-4 col-xs-12">
                    <br>Número de solicitud:<span class="show-contrato" style="color: #9D2449;font-size: 20px;margin-left: 10px;"></span>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-xs-12">
                    <br>Entidad:
                    <input type="text" id="entidad" class="lectura" value="" disabled>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>Referencia:
                    <input type="text" id="referencia" class="lectura" value="" disabled>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>Tipo de permiso:
                    <input type="text" id="tipoPermiso" class="lectura" value="" disabled>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>Cliente, entidad u oficina a visitar:
                    <input type="text" id="clientetEntidad" class="lectura" value="" disabled>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>Actividad a realizar:
                    <input id="actividad" class="lectura" value="" disabled>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>Vigencia:
                    <input id="vigencia" class="lectura" value="" disabled>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12" id="divDias" style="display:none;">
                    <br>Días:
                    <input type="number" id="dias" class="lectura" value="" disabled>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>Fecha de inicio:
                    <input type="date" id="fechaInicio" class="lectura" value="" disabled>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>Fecha de término:
                    <input type="date" id="fechaTermino" class="lectura" value="" disabled>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>Recinto a ingresar:
                    <input id="recinto" class="lectura" value="" disabled>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12" id="divrecinto">
                    <br>Nombre del recinto a visitar:
                    <input id="nombreRecinto" class="lectura" value="" disabled>
                </div>
                <div class="col-xs-12">
                    <br>Motivo:
                    <textarea id="motivo" class="lectura" value="" disabled></textarea>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <div class="checkbox">
                        <br><label><input type="checkbox" id="permisoGrupal" value="" disabled>Permiso grupal</label>
                    </div>
                </div>
                <div class="col-md-4 col-sm-6" id="divCURPResp" style="display:none;">
                    <br>Curp del responsable:
                    <input type="text" id="curpResponsable" class="lectura" value="" disabled>
                </div>
            </div>
        </div>
        <div class="tab-pane" id="personal" role="tabpanel" aria-labelledby="personaltab">
            <div class="row">
                <div class="col-md-4 col-xs-12">
                    <br>Número de solicitud:<span class="show-contrato" style="color: #9D2449;font-size: 20px;margin-left: 10px;"></span>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-xs-12 table-responsive">
                    <table id="tabPersonal" class="table table-striped table-bordered">
                        <thead class="Tabla">
                            <tr>
                                <th width=20%>Tipo de persona</th>
                                <th width=20%>Nombre</th>
                                <th width=10%>Nacionalidad</th>
                                <th width=10%>Estatus</th>
                                <th width=20%>Verificado por</th>
                                <th width=10%>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="tab-pane" id="equipoherramienta" role="tabpanel" aria-labelledby="equipoherramientatab">
            <div class="row">
                <div class="col-md-4 col-xs-12">
                    <br>Número de solicitud:<span class="show-contrato" style="color: #9D2449;font-size: 20px;margin-left: 10px;"></span>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-xs-12 table-responsive">
                    <table id="tabEquipoHerramienta" class="table table-striped table-bordered">
                        <thead class="Tabla">
                            <tr>
                                <th width=20%>Tipo de equipo</th>
                                <th width=15%>Modelo</th>
                                <th width=15%>Marca</th>
                                <th width=20%>Número de serie</th>
                                <th width=15%>Estatus</th>
                                <th width=20%>Verificado por</th>
                                <th width=10%>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="tab-pane" id="materialGranel" aria-labelledby="materialGraneltab">
            <div class="row">
                <div class="col-md-4 col-xs-12">
                    <br>Número de solicitud:<span class="show-contrato" style="color: #9D2449;font-size: 20px;margin-left: 10px;"></span>
                </div>
            </div>
            <br>
            <div class="d-flex justify-content-between">
                <div class="p-4">
                    <div class="col-md-12 col-sm-12">
                        Responsable:
                        <input type="text" id="responsableMaterial" class="lectura" value="" disabled>
                    </div>
                </div>
                <div class="p-4">
                    <div class="col-md-12 col-sm-12">
                        Estatus:
                        <input type="text" id="estatus_validarMaterial" class="lectura" value="" disabled>
                    </div>
                </div>
                <div class="p-4">
                    <div class="col-md-12 col-sm-12">
                        Validado por:
                        <input type="text" id="nombre_validarMaterial" class="lectura" value="" disabled>
                    </div>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-xs-12 table-responsive">
                    <table id="tabMaterial" class="table table-striped table-bordered">
                        <thead class="Tabla">
                            <tr>
                                <th width=20%>Tipo de material</th>
                                <th width=30%>Descripción</th>
                                <th width=20%>Cantidad</th>
                                <th width=20%>Tipo de medida</th>
                                <th width=20%>Documento</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <br>
            <div class="row" id="divValidarMaterial" style="display: none;">
                <div class="d-flex justify-content-between">
                    <div class="p-4">
                        <button class="btn btn-default validar" id="validar_material">Validar</button>
                    </div>
                    <div class="p-4">
                        <button class="btn btn-default rechazar" id="rechazar_material">Rechazar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-pane" id="vehiculo" role="tabpanel" aria-labelledby="vehiculotab">
            <div class="row">
                <div class="col-md-4 col-xs-12">
                    <br>Número de solicitud:<span class="show-contrato" style="color: #9D2449;font-size: 20px;margin-left: 10px;"></span>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-xs-12 table-responsive">
                    <table id="tabVehiculos" class="table table-striped table-bordered">
                        <thead class="Tabla">
                            <tr>
                                <th width=15%>No. Serie</th>
                                <th width=10%>Placa</th>
                                <th width=10%>Marca</th>
                                <th width=10%>Modelo</th>
                                <th width=10%>Año</th>
                                <th width=10%>Color</th>
                                <th width=10%>Estatus</th>
                                <th width=15%>Verificado por</th>
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
    <br><br>
    <div class="d-flex justify-content-between">
        <div class="p-4">
            <a href="<?php echo base_url(); ?>Permisos/Ctrl_Permisos/index"><input type="button" class="btn btn-default" id="regresar" value="Regresar"></a>
        </div>
        <div class="p-4">
            <button class="btn btn-danger" id="rechazar_permiso">Rechazar permiso</button>
            <button class="btn btn-primary" id="validar_permiso" data-columna="autorizacion" disabled>Autorizar permiso</button>
            <!--<label id="labelEnviarMigracion"><input type="checkbox" id="enviar_migracion"> Enviar Migracion</label>-->
        </div>
        <div class="p-4">
            <button class="btn btn-default anterior" style="display: none;">Anterior</button>
            <button class="btn btn-default siguiente">Siguiente</button>
        </div>
    </div>
</div>
<script type="text/javascript">
    var Area = <?php echo $permisos['id_area']; ?>;
</script>