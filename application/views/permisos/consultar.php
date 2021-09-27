<div class="container">
    <div class="row">
        <div class="col-xs-12"><br><h3>Consultar solicitud de permiso de acceso</h3></div>
    </div>
    <ul class="nav nav-tabs" id="menuSolicituPermisos">
        <li class="active">
            <a class="nav-link" id="datosGeneralestab" data-toggle="tab" href="#datosGenerales" data-orden="1" role="tab"
                aria-controls="datosGenerales" aria-selected="true">Datos generales</a>
        </li>
        <li>
            <a class="nav-link" id="personaltab" data-toggle="tab" href="#personal" data-orden="2" role="tab"
                aria-controls="personal" aria-selected="false">Personal</a>
        </li>
		<li>
            <a class="nav-link" id="equipoherramientatab" data-toggle="tab" href="#equipoherramienta" data-orden="3" role="tab"
                aria-controls="equipoherramienta" aria-selected="false">Equipo/herramienta</a>
        </li>
        <li>
            <a class="nav-link" id="materialGraneltab" data-toggle="tab" href="#materialGranel" data-orden="4" role="tab"
                aria-controls="materialGranel" aria-selected="false">Material a granel</a>
        </li>
        <li>
            <a class="nav-link" id="vehiculotab" data-toggle="tab" href="#vehiculo" data-orden="5" role="tab"
                aria-controls="vehiculo" aria-selected="false">Vehículo</a>
        </li>
    </ul>
    <div class="tab-content" id="mymenuSolicitudPermisos">
        <div class="tab-pane active" id="datosGenerales" role="tabpanel" aria-labelledby="datosGeneralestab">
            <div class="row">
                <div class="col-md-4 col-xs-12">
                    <br>Número de solicitud:<span class="show-contrato" style="color: #9D2449;font-size: 20px;margin-left: 10px;"></span>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-md-6 col-sm-12">
                    Entidad:
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
            <div class="row mt-4">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>Fecha de inicio:
                    <input type="date" id="fechaIni" class="lectura" value="" disabled>
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
                <div class="col-md-4 col-sm-6 col-xs-12" id="divCURPResp" style="display:none;">
                    Curp de titular del permiso:
                        <input type="text" id="curpResponsable" class="lectura" value="" disabled>
                </div>
            </div>
            <div class="row mt-4" id="divRechazoPase" style="display: none;">
                <div class="col-xs-12">
                    <br>Motivo rechazo permiso:
                    <textarea id="motivo_pase" class="lectura" value="" rows="9" disabled></textarea>
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
                                <th width=20%>Nacionalidad</th>
                                <th width=10%>Estatus</th>
                                <th width=20%>Verificado por</th>
                                <th width=10%>Acciones</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
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
                                <th width=10%>Modelo</th>
                                <th width=20%>Marca</th>
                                <th width=20%>Número de serie</th>
                                <th width=15%>Estatus</th>
                                <th width=20%>Verificado por</th>
                                <th width=10%>Acciones</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="tab-pane" id="materialGranel" role="tabpanel" aria-labelledby="materialGraneltab">
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
            <div class="row mt-4">
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
                        <tbody></tbody>
                    </table>
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
                                <th width=10%>No. Serie</th>
                                <th width=10%>Placa</th>
                                <th width=10%>Marca</th>
                                <th width=10%>Modelo</th>
                                <th width=10%>Año</th>
                                <th width=10%>Color</th>
                                <th width=10%>Estatus</th>
                                <th width=20%>Verificado por</th>
                                <th wiidh=10%>Acciones</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <br><br>
    <div class="d-flex justify-content-between">
        <div class="p-4">
            <a href="#!" role="button" class="btn btn-default" id="regresar">Regresar</a>
        </div>
        <div class="p-4" id="divVistaPrevia" style="display:none;">
            <a href="<?php echo base_url(); ?>Permisos/Ctrl_Permisos/vista_previa"  target="_blank"><input type="button" class="btn btn-light" id="vistaPrevia" value="Visualizar permiso"></a>
        </div>
        <div class="p-4">
            <button class="btn btn-default anterior" style="display: none;" id="anterior">Anterior</button>
            <button class="btn btn-default siguiente" id="siguiente">Siguiente</button>
        </div>
    </div>
    
</div>