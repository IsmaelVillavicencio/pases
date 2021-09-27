<div class="modal fade" id="modal_autorizar_permiso_equipo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title col-11 text-center" id="exampleModalLongTitle">Reporte estatus equipo/herramienta</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-4">
                        <div style="width: 100%;">
                            <div class="col-xs-12" id="pdfViewerfacturaequipo"></div>
                        </div>
                        <div style="width: 100%;">
                            <div class="col-xs-12" id="pdfViewerherramienta"></div>
                        </div>
                        <div style="width: 100%;">
                            <div class="col-xs-12" id="pdfViewerAnexo"></div>
                        </div>
                        <div style="width: 100%;">
                            <div class="col-xs-12" id="pdfViewerRF"></div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-6 col-sm-6">
                                Tipo de equipo:
                                <input type="text" id="tipoEquipo" class="lectura" value="" disabled>
                            </div>
                            <div class="col-md-6 col-sm-6">
                                Número de serie:
                                <input type="text" id="noSerieEquipo" class="lectura" value="" disabled>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-6 col-sm-6">
                                Marca:
                                <input type="text" id="marcaEquipo" class="lectura" value="" disabled>
                            </div>
                            <div class="col-md-6 col-sm-6">
                                Modelo:
                                <input type="text" id="modeloEquipo" class="lectura" value="" disabled>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-12 col-sm-12">
                                Resguardo a favor de:
                                <input type="text" id="resguardo" class="lectura" value="" disabled>
                            </div>
                        </div>
                        <br>
                        <div id="divFactura">
                            <div class="row mt-4">
                                <div class="col-md-6 col-sm-6">
                                    Tipo de documento:
                                    <input type="text" id="tipoDocumentoEquipo" class="lectura" value="" disabled>
                                </div>
                                <div class="col-md-6 col-sm-6">
                                    Número de factura:
                                    <input type="text" id="noFacturaEquipo" class="lectura" value="" disabled>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div id="divOtros" style="display:none;">
                            <div class="row">
                                <div class="col-md-6">
                                    <br>
                                    <span> Anexo 29:</span>
                                    <input type="text" id="anexo29" class="lectura" value="" maxlength="30" disabled>
                                </div>
                                <div class="col-md-6">
                                    <br>
                                    <span> RF:</span>
                                    <input type="text" id="rf" class="lectura" value="" disabled>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <br>
                                    <span> Descripción:</span>
                                    <textarea rows="4" class="lectura" id="descripcionEquipo" maxlength="500"></textarea>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="row mt-4" id="campoobservacionequipo">
                            <div class="col-xs-12">
                                    Observaciones:
                                <textarea name="txtObservacion" id="txtObservacionEquipo" cols="2" rows="3" style="width:100%; resize: none;"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" id="divMotivosRechazo" style="display:none;">
                    <div class="col-md-12">
                        Motivos de rechazo:
                        <select class="form-control" id="motivosRechazo" style="width:100%">
                            <option value=""></option>
                            <option value="1">PERMISO VENCIDO</option>
                            <option value="2">FAVOR DE ACTUALIZAR CARTA FACTURA</option>
                            <option value="3">FAVOR DE ADJUNTAR PEDIMENTO</option>
                            <option value="4">FAVOR DE ADJUNTAR FACTURA Y/O CARTA FACTURA FIRMADA Y DIGITALIZADA</option>
                            <option value="5">FAVOR DE ADJUNTAR CARTA FACTURA ORIGINAL FIRMADA Y DIGITALIZADA</option>
                            <option value="6">LA FECHA DE LA FACTURA ADJUNTA NO CORRESPONDE CON LA FECHA DE LA OPERACIÓN</option>
                            <option value="7">FAVOR DE SOLICITAR SU PERMISO POR EVENTO</option>
                            <option value="8">EL PEDIMENTO ADJUNTO NO AMPARA LA MERCANCÍA DESCRITO EN EL CAMPO DE MOTIVO</option>
                            <option value="9">FAVOR DE ADJUNTAR LA DOCUMENTACION NUEVAMENTE TODA VEZ QUE EL ARCHIVO ADJUNTO SE ENCUENTRA DAÑADO O HA SIDO DEPURADO POR EL SISTEMA.</option>
                            <option value="10">PERMISOS PERSONAL Y/O VEHICULOS: Los permisos de ingreso de personal y/o vehículos se tramitan únicamente ante API.</option>
                            <option value="11">INGRESO DE PERSONAL DE A.A: El personal de las Agencias Aduanales deberá ingresar con su gafete debidamente autorizado y expedido por Aduana.</option>
                            <option value="12">PERMISOS VEHICULOS Y/O MOTOCICLETAS: Los permisos de ingreso de vehículos y/o motocicletas se tramitan únicamente ante API.</option>
                            <option value="13">PERSONAL CON GAFETE: No es necesario tramitar permiso PSP si el personal cuenta con gafete de Aduana. Favor de solicitar su permiso solo ante API.</option>
                            <option value="14">MENCIONAN TAP: Favor de omitir mencionar TAP, toda vez que ya no es recinto fiscalizado.</option>
                            <option value="15">NO INGRESARÁ AL RECINTO PORTUARIO: El personal que no ingresará al recinto portuario no requiere permiso de acceso PSP.</option>
                            <option value="16">INGRESO DE CELULARES: Por cuestiones de seguridad no se permite el ingreso de dichos equipos toda vez que son responsabilidad de la persona que lo porta.</option>
                            <option value="17">ABASTECIMIENTOS: No es necesario permiso de PSP de abastecimiento toda vez que el formato es la Autorización de Aduana.</option>
                            <option value="18">NO COINCIDEN LAS FECHAS: El periodo solicitado en el permiso no concuerda con el manifestado en el campo de motivo.</option>
                            <option value="19">INGRESO A PATIO REGULADOR: favor de omitir mencionar el patio regulador toda vez que no se encuentra dentro del recinto portuario.</option>
                            <option value="20">ETIQUETADOS: PARA LOS PERMISOS DE INGRESO DE MATERIAL PARA ETIQUETADO DEBERÁ MANIFESTAR EN EL CAMPO DE MOTIVO EL LUGAR EN QUE SE REALIZARÁ EL ETIQUETADO, ASÍ COMO MENCIONAR QUE TIPO DE MERCANCÍA SE VA ETIQUETAR, Y SI CUENTA O NO CON INCIDENCIA. ASIMISMO, ADJUNTAR FOTO DE LA MERCANCÍA A ETIQUETAR, PREFORMA DEL PEDIMENTO, BL, IMAGEN DE LA ETIQUETA A COLOCAR, FACTURAS DE LA MERCANCÍA, EQUIPO Y PERSONAS QUE INGRESAN A ETIQUETAR, Y EN CASO DE CONTAR CON INCIDENCIA ADJUNTAR EL OFICIO DE AUTORIZACIÓN DEL ETIQUETADO.</option>
                            <option value="21">ARCHVIO DAÑADO// ERROR: favor de adjuntar factura o carta factura nuevamente toda vez que el archivo adjunto esta dañado o ha sido depurado por el sistema</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="rechazar_equipo" type="button" data-estatus="0" class="btn btn-default ml-4">Rechazar</button>
                <button id="verificar_equipo" type="button" data-estatus="1" class="btn btn-primary ml-4">Verificar</button>
                <button id="cerrar_equipo" type="button" class="btn btn-default" data-dismiss="modal" style="display: none;">Cerrar</button>
            </div>
        </div>
    </div>
</div>