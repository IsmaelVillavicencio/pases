<div class="modal fade" id="modal_autorizar_permiso_vehiculo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title col-11 text-center" id="exampleModalLongTitle">Reporte estatus vehículo</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6 col-sm-6">
                        Número de motor:
                        <input type="text" id="noMotor" class="lectura" value="" disabled>
                    </div>
                    <div class="col-md-6 col-sm-6">
                        Año:
                        <input type="text" id="anio" class="lectura" value="" disabled>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-md-6 col-sm-6">
                        Tipo de vehículo:
                        <input type="text" id="tipoVehiculo" class="lectura" value="" disabled>
                    </div>
                    <div class="col-md-6 col-sm-6">
                        Tipo de tarjeta:
                        <input type="text" id="tipoTarjeta" class="lectura" value="" disabled>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-md-6 col-sm-6">
                        Número de tajeta:
                        <input type="text" id="noTarjeta" class="lectura" value="" disabled>
                    </div>
                    <!--div class="col-md-6 col-sm-6">
                        Vigencia de tajeta:
                        <input type="text" id="vigenciaTarjeta" class="lectura" value="" disabled>
                    </div-->
                </div>
                <div class="row mt-4" style="display: none;">
                    <div class="col-md-6 col-sm-6">
                        Tipo de documento:
                        <input type="text" id="tipoDocumento" class="lectura" value="" disabled>
                    </div>
                    <div class="col-md-6 col-sm-6">
                        Número de factura:
                        <input type="text" id="noFacturaVehiculo" class="lectura" value="" disabled>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-md-6 col-sm-6">
                        Aseguradora:
                        <input type="text" id="aseguradora" class="lectura" value="" disabled>
                    </div>
                    <div class="col-md-6 col-sm-6">
                        Número de póliza:
                        <input type="text" id="noPolizaVehiculo" class="lectura" value="" disabled>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-md-6 col-sm-6">
                        Fecha inicio:
                        <input type="text" id="fechaInicio" class="lectura" value="" disabled>
                    </div>
                    <div class="col-md-6 col-sm-6">
                        Fecha fin:
                        <input type="text" id="fechaFin" class="lectura" value="" disabled>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-md-6 col-sm-6">
                        Chofer:
                        <input type="text" id="chofer" class="lectura" value="" disabled>
                    </div>
                </div>
                <div id="divRepuve">
                    <div class="row mt-4">
                        <div class="col-xs-12">
                            <h4>REPUVE estatal/nacional</h4>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-md-6 col-sm-6">
                            Número de serie:
                            <input type="text" id="noSerie" class="lectura" value="" disabled>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            Número de placa:
                            <input type="text" id="noPlaca" class="lectura" value="" disabled>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-md-6 col-sm-6">
                            Marca:
                            <input type="text" id="marca" class="lectura" value="" disabled>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            Submodelo:
                            <input type="text" id="submodelo" class="lectura" value="" disabled>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-md-6 col-sm-6">
                            Modelo:
                            <input type="text" id="modelo" class="lectura" value="" disabled>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            Color:
                            <input type="text" id="color" class="lectura" value="" disabled>
                        </div>
                    </div>
                </div>
                <div id="divSivebu">
                    <div class="row mt-4">
                        <div class="col-xs-12">
                            <h4>SIVEBU</h4>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-md-6 col-sm-6">
                            Reporte:
                            <input type="text" id="reporte" class="lectura" value="" disabled>
                        </div>
                    </div>
                </div>
                <div id="divArco">
                    <div class="row mt-4">
                        <div class="col-xs-12">
                            <h4>Arco</h4>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-xs-12 table-responsive">
                            <table id="tabmodalVehiculo" class="table table-striped table-bordered">
                                <thead class="Tabla">
                                    <tr>
                                        <th width=15%>Fecha</th>
                                        <th width=15%>Municipio</th>
                                        <th width=15%>PMI</th>
                                        <th width=20%>Rumbo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-md-3"></div>
                    <div class="col-md-3">
                        <h4>Placa</h4>
                    </div>
                    <div class="col-md-3">
                        <h4>Vehículo</h4>
                    </div>
                    <div class="col-md-3"></div>
                </div>
                <div class="row mt-4">
                    <div class="col-md-2"></div>
                    <div style="width: 240px;">
                            <div class="col-xs-12" id="pdfViewerplaca"></div>
                        </div>
                        <div style="width: 240px;">
                            <div class="col-xs-12" id="pdfViewerlateral"></div>
                        </div>
                    <div class="col-md-2"></div>
                </div>
                <div class="row mt-4" id="campoobservacionvehiculo">
                    <div class="col-xs-12">
                            Observaciones:
                        <textarea name="txtObservacion" id="txtObservacionVehiculo" cols="2" rows="3" style="width:100%; resize: none;"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="rechazar_vehiculo" type="button" class="btn btn-danger ml-4">Rechazar</button>
                    <button id="verificar_vehiculo" type="button" class="btn btn-primary ml-4">Verificar</button>
                    <button id="cerrar_vechiculo" type="button" class="btn btn-default" data-dismiss="modal" style="display: none;">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</div>