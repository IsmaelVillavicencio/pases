<div class="modal fade" id="modal_autorizar_permiso_personal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title col-11 text-center" id="exampleModalLongTitle">Reporte estatus personal</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-4">
                        <div style="width: 100%;">
                            <div class="col-xs-12" id="pdfViewerFotografiaPersonal"></div>
                        </div>
                        <br>
                        <div style="width: 100%;">
                            <div class="col-xs-12" id="pdfViewerFotografiaIdentificacion"></div>
                        </div>
                        <br>
                        <div style="width: 100%;">
                            <div class="col-xs-12" id="pdfViewerFotografiaLicencia"></div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-6 col-sm-6">
                                NSS:
                                <input type="text" id="nss" class="lectura" value="" disabled>
                            </div>
                            <div class="col-md-6 col-sm-6">
                                Nombre:
                                <input type="text" id="nombre" class="lectura" value="" disabled>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-6 col-sm-6">
                                CURP:
                                <input type="text" id="curp" class="lectura" value="" disabled>
                            </div>
                            <div class="col-md-6 col-sm-6">
                                Lugar de nacimiento:
                                <input type="text" id="lugarNacimiento" class="lectura" value="" disabled>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-6 col-sm-6">
                                Fecha de nacimiento:
                                <input type="text" id="fechaNacimiento" class="lectura" value="" disabled>
                            </div>
                            <div class="col-md-6 col-sm-6">
                                Nacionalidad:
                                <input type="text" id="nacionalidad" class="lectura" value="" disabled>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-6 col-sm-6">
                                Edad:
                                <input type="text" id="edad" class="lectura" value="" disabled>
                            </div>
                            <div class="col-md-6 col-sm-6">
                                Sexo:
                                <input type="text" id="sexo" class="lectura" value="" disabled>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-12 col-sm-12">
                                Correo electrónico:
                                <input type="text" id="correo" class="lectura" value="" disabled>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-6 col-sm-6">
                                Teléfono:
                                <input type="text" id="telefono" class="lectura" value="" disabled>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-6 col-sm-6">
                                Empresa:
                                <input type="text" id="empresa" class="lectura" value="" disabled>
                            </div>
                            <div class="col-md-6 col-sm-6">
                                Clave patronal:
                                <input type="text" id="clavePatronal" class="lectura" value="" disabled>
                            </div>
                        </div>
                        <!--div class="row mt-4">
                            <div class="col-md-6 col-sm-6">
                                Estatus:
                                <input type="text" id="estatus" class="lectura" value="" disabled>
                            </div>
                        </div-->
                        <div id="divIdentificacion">
                            <div class="row mt-4">
                                <div class="col-md-6 col-sm-6">
                                    Identificación:
                                    <input type="text" id="txtidentificacion" class="lectura" value="" disabled>
                                </div>
                            </div>
                            <div class="row mt-4" id="espacioidentificacion">
                                <div class="col-md-6 col-sm-6">
                                    Número Identificación:
                                    <input type="text" id="txtNumeroidentificacion" class="lectura" value="" disabled>
                                </div>
                                <div class="col-md-6 col-sm-6">
                                    Vence:
                                    <input type="text" id="venceIdentificacion" class="lectura" value="" disabled>
                                </div>
                            </div>
                        </div>
                        <div id="divlicencia">
                            <div class="row mt-4">
                                <div class="col-md-6 col-sm-6">
                                    Licencia:
                                    <input type="input" id="txtlicencia" class="lectura" value="" disabled>
                                </div>
                                <div class="col-md-6 col-sm-6">
                                    Vence:
                                    <input type="input" id="venceLicencia" class="lectura" value="" disabled>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-4" id="campoobservacionpersona">
                            <div class="col-xs-12">
                                    Observaciones:
                                <textarea name="txtObservacion" id="txtObservacionPersonal" cols="2" rows="10" style="width:100%; resize: none;"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="rechazar_persona" type="button" data-estatus="0" class="btn btn-danger ml-4">Rechazar</button>
                <button id="verificar_persona" type="button" data-estatus="1" class="btn btn-primary ml-4">Verificar</button>
                <button id="cerrar_persona" type="button" class="btn btn-default" data-dismiss="modal" style="display: none;">Cerrar</button>
            </div>
        </div>
    </div>
</div>