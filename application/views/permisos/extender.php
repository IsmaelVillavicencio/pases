<div class="container">
    <div class="row">
        <div class="col-xs-12">
            <h3>Extender solicitud de permiso de acceso</h3>
        </div>
    </div>
    <br>

    <div class="row mt-4">
        <div class="col-md-6 col-sm-12">
            Entidad:
            <input type="text" id="entidad" class="lectura" value="" disabled>
        </div>
    </div>
    <div class="row mt-4">
        <div class="col-md-4 col-sm-6">
            Referencia:
            <input type="text" id="referencia" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            Tipo de permiso:
            <input type="text" id="tipoPermiso" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            Cliente, entidad u oficina a visitar:
            <input type="text" id="clientetEntidad" class="lectura" value="" disabled>
        </div>
    </div>
    <div class="row mt-4">
        <div class="col-md-4 col-sm-6">
            Actividad a realizar:
            <input id="actividad" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6">
            <span style="color:red">*</span><span>Vigencia:</span>
            <select id="vigencia" class="form-control validar-requerido reiniciar-pase" required></select>
            <span id="errorvigencia" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6" id="divDias" style="display:none;">
            <span style="color:red">*</span><span>Días:</span>
            <input type="number" id="dias" class="form-control reiniciar-pase" value="1" min="0" required>
            <span id="errordias" class="error"></span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span style="color:red">*</span><span>Fecha de inicio:</span>
            <input type="date" id="FechaInicio" class="form-control validar-requerido reiniciar-pase" value="" required>
            <span id="errorfechaInicio" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span style="color:red">*</span><span>Fecha de término:</span>
            <input type="date" id="fechaTermino" class="lectura validar-requerido reiniciar-pase" value="" disabled>
            <span id="errorfechaTermino" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6">
            Recinto a ingresar:
            <input id="recinto" class="lectura" value="" disabled>
        </div>
    </div>
    <div class="row mt-4">
        <div class="col-md-4 col-sm-6" id="divrecinto">
            Nombre del recinto a visitar:
            <input id="nombreRecinto" class="lectura" value="" disabled>
        </div>
    </div>
    <div class="row mt-4">
        <div class="col-md-12">Motivo:
            <textarea id="motivo" class="lectura" value="" disabled></textarea>
        </div>
    </div>
    <div class="row mt-4">
        <div class="col-md-2 col-sm-3">
            Permiso grupal
            <br>
            <input type="checkbox" id="permisoGrupal" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6" id="divCURPResp" style="display:none;">
            Curp del responsable:
            <input type="text" id="curpResponsable" class="lectura" value="" disabled>
        </div>
    </div>
    <br><br>
    <ul class="nav nav-tabs">
        <li class="active"><a class="nav-link" id="personaltab" data-orden="1" data-toggle="tab" href="#personal">Personal</a></li>
        <li ><a class="nav-link" id="equipoherramientatab" data-orden="2" data-toggle="tab" href="#equipoherramienta">Equipo/herramienta</a></li>
        <li ><a class="nav-link" id="materialGrandeltab" data-orden="3" data-toggle="tab" href="#materialGranel">Material a granel</a></li>
        <li ><a class="nav-link" id="vehiculotab" data-orden="4" data-toggle="tab" href="#vehiculo">Vehículo</a></li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane fade in active" id="personal">
            <div id="divpersonal" style="display: none;">
                <div class="row" style="margin-top:10px">
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Tipo de persona:</span>
                        <select id="tipoEmpleado" class="form-control reiniciar-personal" required></select>
                        <span id="errortipoEmpleado" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6" id="divNacionalidad" style="display:none;">
                        <span style="color:red">*</span><span>Nacionalidad:</span>
                        <select id="nacionalidad" class="form-control reiniciar-personal" required></select>
                        <span id="errornacionalidad" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6" id="divEntidad" style="display:none;">
                        <span style="color:red">*</span><span>Entidad de gobierno federal:</span>
                        <select id="entidadGobierno" class="form-control reiniciar-personal" required></select>
                        <span id="errorentidadGobierno" class="error"></span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4 col-sm-6" id="divEmpresa" style="display:none;margin-top:10px">
                        <span style="color:red">*</span><span>Empresa:</span>
                        <input type="hidden" id="idempresa" value="0">
                        <input type="text" id="empresa" class="form-control reiniciar-personal" value="" required>
                        <span id="errorempresa" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6" id="divClavePatronal" style="display:none;margin-top:10px">
                        <span style="color:red">*</span><span>Clave patronal:</span>
                        <input type="text" id="clavePatronal" class="form-control reiniciar-personal" value="" maxlength="11" required>
                        <span id="errorclavePatronal" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6" id="divNoSeguroSocial" style="display:none;margin-top:10px">
                        <span style="color:red">*</span><span>Número de seguridad social:</span>
                        <input type="number" id="numSeguroSocial" class="form-control reiniciar-personal" value="" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==11) return false;" required>
                        <span id="errornumSeguroSocial" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6" id="divNoIssste" style="display:none;margin-top:10px">
                        <span style="color:red">*</span><span>Número de ISSSTE:</span>
                        <input type="number" id="noIssste" class="form-control reiniciar-personal" value="" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==11) return false;" required>
                        <span id="errornoIssste" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6" id="divNoSeguro" style="display:none;margin-top:10px">
                        Número de seguro:
                        <input type="number" id="noSeguro" class="form-control reiniciar-personal" maxlength="20" value="">
                        <span id="errornoSeguro" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6" id="divAseguradora" style="display:none;margin-top:10px">
                        Aseguradora:
                        <select id="aseguradoras" class="form-control reiniciar-personal" required></select>
                    </div>
                </div>

                <div class="row" id="divCURP" style="display:none;margin-top:10px">
                    <input type="hidden" id="idpersona" value="0">
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>CURP:</span>
                        <input type="text" id="curp" class="form-control reiniciar-personal" value="" maxlength="18" required>
                        <span id="errorcurp" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <br>
                        <button class="btn btn-default escanear-camara visible-xs visible-sm">Escanear CURP</button>
                        <button class="btn btn-default escanear-escaner visible-md visible-lg visible-xl">Escanear CURP</button>
                    </div>
                </div>

                <div class="row" id="divNombreApellidos" style="display:none;margin-top:10px">
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Nombre:</span>
                        <input type="text" id="nombre" class="form-control reiniciar-personal" value="" required>
                        <span id="errornombre" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Primer apellido:</span>
                        <input type="text" id="primerApellido" class="form-control reiniciar-personal" value="" required>
                        <span id="errorprimerApellido" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        Segundo apellido:
                        <input type="text" id="segundoApellido" class="form-control reiniciar-personal" value="">
                    </div>
                </div>

                <div class="row">
                    <input type="hidden" id="idcontacto" value="0">
                    <div class="col-md-4 col-sm-6" id="divTelefono" style="display:none;margin-top:10px">
                        <span style="color:red">*</span><span>Número de teléfono:</span>
                        <input type="tel" id="numtelefono" class="form-control reiniciar-personal" value="" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==10) return false;" required>
                        <span id="errornumtelefono" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6" id="divCorreo" style="display:none;margin-top:10px">
                        <span style="color:red">*</span><span>Correo electrónico:</span>
                        <input type="email" id="correo" class="form-control reiniciar-personal" value="" required>
                        <span id="errorcorreo" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6" id="divChofer" style="display:none;margin-top:10px">
                        Chofer:
                        <br>
                        <input type="checkbox" id="chofer" value="">
                    </div>
                </div>

                <div class="row" id="divLicencia" style="display:none;margin-top:10px">
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Número de licencia:</span>
                        <input type="text" id="noLicenica" class="form-control reiniciar-personal" value="" required>
                        <span id="errornoLicencia" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Fecha de vencimiento:</span>
                        <input type="date" id="fechaVenciminetoLic" class="form-control reiniciar-personal" min="<?php echo date('Y-m-d') ?>" value="" required>
                        <span id="errorfechaVenciminetoLic" class="error"></span>
                    </div>
                    <div class="col-md-4 col-lg-3 col-xl-3">
                        <br>
                        <input type="button" class="btn btn-default" id="btnAdjuntarLicencia" value="Subir documento">
                        <span id="errorSubirLicencia" class="error"></span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4 col-sm-6" id="divTipoIdentificacion" style="display:none;margin-top:10px">
                        <span style="color:red">*</span><span>Tipo de identificación:</span>
                        <select id="tipoIdentificacion" class="form-control reiniciar-personal" required></select>
                        <span id="errortipoIdentificacion" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6" id="divClaveElector" style="display:none;margin-top:10px">
                        <span style="color:red">*</span><span>Clave de elector:</span>
                        <input type="text" id="claveElector" class="form-control reiniciar-personal" value="" maxlength="18" required>
                        <span id="errorine" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6" id="divPasaporte" style="display:none;margin-top:10px">
                        <span style="color:red">*</span><span>Número de pasaporte:</span>
                        <input type="text" id="noPasaporte" class="form-control reiniciar-personal" value="" maxlength="12" required>
                        <span id="errornoPasaporte" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6" id="divLibretaMar" style="display:none;margin-top:10px">
                        <span style="color:red">*</span><span>Libreta de mar:</span>
                        <input type="text" id="libretaMar" class="form-control reiniciar-personal" value="" maxlength="10" required>
                        <span id="errorlibretaMar" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6" id="divItinerario" style="display:none;margin-top:10px">
                        Itinerario de viaje:
                        <input type="text" id="itinerario" class="form-control reiniciar-personal" value="">
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4 col-sm-6" id="divFechaVencimiento" style="display:none;margin-top:10px">
                        <span style="color:red">*</span><span>Fecha de vencimiento:</span>
                        <input type="date" id="fechaVenciminetoIdent" class="form-control reiniciar-personal" value="" min="<?php echo date('Y-m-d') ?>" required>
                        <span id="errorfechaVenciminetoIdent" class="error"></span>
                    </div>
                    <div class="col-md-4 col-lg-3 col-xl-3" id="divSubirDocumento" style="display:none;margin-top:10px">
                        <br>
                        <input type="button" class="btn btn-default btn-border btn-block" id="btnSubirIdentificacion" value="Subir identificación">
                        <span id="errorSubirIdentificacion" class="error"></span>
                    </div>
                    <div class="col-md-4 col-lg-3 col-xl-3" id="divSubirfoto" style="display:none;margin-top:10px">
                        <br>
                        <input type="button" class="btn btn-default btn-border btn-block" id="btnSubirPersonal" value="Subir foto">
                        <span id="errorSubirPersonal" class="error"></span>
                    </div>
                    <div class="col-md-1 content" id="divAnadir" style="display:none;margin-top:10px">
                        <br>
                        <button class="btn btn-default btn-border" id="anadirPersona">+</button>
                    </div>
                </div>
                <div class="row" style="margin-top:10px">
                    <div class="col-xs-12">
                        <span id="errorPersonalDuplicado" class="error"></span>
                    </div>
                </div>
                <br>
            </div>
            <div class="row" style="margin-top:10px">
                <div class="col-xs-12 table-responsive">
                    <table id="tabPersonal" class="table table-striped table-bordered">
                        <thead class="Tabla">
                            <tr>
                                <th width=20%>Tipo de persona</th>
                                <th width=30%>Nombre</th>
                                <th width=20%>Nacionalidad</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="equipoherramienta">
            <div id="divequipoherramienta" style="display: none;">
                <div class="row" style="margin-top:10px">
                    <input type="hidden" id="idequipo" value="0">
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Tipo de equipo:</span>
                        <select id="tipoEquipo" class="form-control reiniciar-equipo" required></select>
                        <span id="errortipoEquipo" class="error"></span>
                    </div>
                </div>

                <div class="row" id="divCaracteristicas" style="display:none;margin-top:10px">
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Número de serie:</span>
                        <input type="text" id="noSerieEquipo" class="form-control reiniciar-equipo" value="" maxlength="25" required>
                        <span id="errornoSerieEquipo" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Modelo:</span>
                        <input type="text" id="modeloHerramienta" class="form-control reiniciar-equipo" value="" maxlength="25" required>
                        <span id="errormodeloHerramienta" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Marca:</span>
                        <input type="text" id="marcaHerramienta" class="form-control reiniciar-equipo" value="" maxlength="25" required>
                        <span id="errormarcaHerramienta" class="error"></span>
                    </div>
                </div>

                <div class="row" id="divDocumento1" style="display:none;margin-top:10px">
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Tipo de documento:</span>
                        <select id="tipoDocumento" class="form-control reiniciar-equipo" required></select>
                        <span id="errortipoDocumento" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Número de factura:</span>
                        <input type="text" id="noFacturaEquipo" class="form-control reiniciar-equipo" value="" maxlength="25" required>
                        <span id="errornoFacturaEquipo" class="error"></span>
                    </div>
                    <div class="col-md-4 col-lg-3 col-xl-3">
                        <br>
                        <input type="button" class="btn btn-default btn-border btn-block" id="btnSubirEquipo" value="Subir documento">
                        <span id="errorSubirFacturaEquipo" class="error"></span>
                    </div>
                </div>

                <div class="row" id="divResguardo" style="display:none;margin-top:10px">
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Resguardo a favor de:</span>
                        <select id="resguardo" class="form-control reiniciar-equipo" required></select>
                        <span id="errorresguardo" class="error"></span>
                    </div>
                    <div class="col-md-1 content" style="padding-top:2px">
                        <br>
                        <button class="btn btn-default btn-border" id="anadirEquipo">+</button>
                    </div>
                </div>
                <div class="row" style="margin-top:10px">
                    <div class="col-xs-12">
                        <span id="errorHerramientaDuplicado" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="row" style="margin-top:10px">
                <div class="col-xs-12 table-responsive">
                    <table id="tabEquipoHerramienta" class="table table-striped table-bordered">
                        <thead class="Tabla">
                            <tr>
                                <th width=20%>Tipo de equipo</th>
                                <th width=20%>Modelo</th>
                                <th width=25%>Marca</th>
                                <th width=25%>Número de serie</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="tab-pane" id="materialGranel" aria-labelledby="materialGraneltab">
            <div class="row mt-4">
                <div class="col-xs-12 table-responsive">
                    <table id="tabMaterial" class="table table-striped table-bordered">
                        <thead class="Tabla">
                            <tr>
                                <th width=20%>Tipo de material</th>
                                <th width=20%>Cantidad</th>
                                <th width=15%>Tipo de medida</th>
                                <th width=20%>Responsable</th>
                                <th width=15%>Estatus</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="vehiculo">
            <div id="divvehiculo" style="display: none;">
                <div class="row" style="margin-top:10px">
                    <input type="hidden" id="idvehiculo" value="0">
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Número de placa:</span>
                        <input type="text" id="noPlaca" class="form-control reiniciar-vehiculo" maxlength="10" value="">
                        <span id="errornoPlaca" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Número de serie:</span>
                        <input type="text" id="noSerieVehiculo" class="form-control reiniciar-vehiculo" maxlength="17" value="">
                        <span id="errornoSerieVehiculo" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        Número de motor:
                        <input type="text" id="noMotor" class="form-control reiniciar-vehiculo" minlength="6" maxlength="8" value="">
                        <span id="errornoMotor" class="error"></span>
                    </div>
                </div>

                <div class="row" style="margin-top:10px">
                    <div class="col-md-4 col-sm-6">
                        Marca:
                        <input type="text" id="marcaVehiculo" class="lectura reiniciar-vehiculo" value="" disabled>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        Modelo:
                        <input type="text" id="modeloVehicuo" class="lectura reiniciar-vehiculo" value="" disabled>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        Año:
                        <input type="text" id="anio" class="lectura reiniciar-vehiculo" value="" disabled>
                    </div>
                </div>

                <div class="row" style="margin-top:10px">
                    <div class="col-md-4 col-sm-6">
                        Color:
                        <input type="text" id="color" class="lectura reiniciar-vehiculo" value="" disabled>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Tipo de vehículo:</span>
                        <select id="tipoVehiculo" class="form-control reiniciar-vehiculo" required></select>
                        <span id="errortipoVehiculo" class="error"></span>
                    </div>
                </div>

                <div class="row" style="margin-top:10px">
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Tipo de tarjeta de circulación:</span>
                        <select id="tipoTarjetaCirculacion" class="form-control reiniciar-vehiculo" required></select>
                        <span id="errortipoTarjetaCirculacion" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Número de tarjeta:</span>
                        <input type="text" id="noTarjeta" class="form-control reiniciar-vehiculo" value="" required>
                        <span id="errornoTarjeta" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Vigencia de tarjeta de circulación:</span>
                        <input type="date" id="vigenciaTarjeta" class="form-control reiniciar-vehiculo" value="" required>
                        <span id="errorvigenciaTarjeta" class="error"></span>
                    </div>
                </div>

                <div class="row" style="margin-top:10px">
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Tipo de documento:</span>
                        <select id="tipodocumentoVeh" class="form-control reiniciar-vehiculo"></select>
                        <span id="errortipodocumentoVeh" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <span>Número de factura:</span>
                        <input type="text" id="noFacturaVeh" class="form-control reiniciar-vehiculo" value="" onKeyPress="if(this.value.length==20) return false;" required>
                        <span id="errornoFacturaVeh" class="error"></span>
                    </div>
                    <div class="col-md-4 col-lg-3 col-xl-3">
                        <br>
                        <input type="button" class="btn btn-default btn-border btn-block" id="btnSubirFacturaVehiculo" value="Subir documento">
                        <span id="errorSubirFacturaVehiculo" class="error"></span>
                    </div>
                </div>

                <div class="row" style="margin-top:10px">
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Aseguradora:</span>
                        <select id="aseguradorasVeh" class="form-control reiniciar-vehiculo" required></select>
                        <span id="erroraseguradorasVeh" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Número de póliza:</span>
                        <input type="text" id="noPoliza" class="form-control reiniciar-vehiculo" value="" onKeyPress="if(this.value.length==20) return false;" required>
                        <span id="errornoPoliza" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Vigencia de póliza:</span>
                        <input type="date" id="vigenciaPoliza" class="form-control reiniciar-vehiculo" value="" min="<?php echo date('Y-m-d') ?>" required>
                        <span id="errorvigenciaPoliza" class="error"></span>
                    </div>
                </div>

                <div class="row" style="margin-top:10px">
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Período de pago:</span>
                        <select id="periodoPago" class="form-control reiniciar-vehiculo" required></select>
                        <span id="errorperiodoPago" class="error"></span>
                    </div>
                </div>

                <div class="row" style="margin-top:10px">
                    <div class="col-xs-12">
                        Período de cobertura:
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Fecha inicio:</span>
                        <input type="date" id="periodoCobFechaInicio" class="form-control reiniciar-vehiculo" value="" max="<?php echo date('Y-m-d') ?>" required>
                        <span id="errorperiodoCobFechaInicio" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Fecha fin:</span>
                        <input type="date" id="periodoCobFechaFin" class="form-control reiniciar-vehiculo" value="" min="<?php echo date('Y-m-d') ?>" required>
                        <span id="errorperiodoCobFechaFin" class="error"></span>
                    </div>
                </div>

                <div class="row" style="margin-top:10px">
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Estatus:</span>
                        <input type="text" id="estatusVehiculo" class="form-control reiniciar-vehiculo" value="" required>
                        <span id="errorestatusVehiculo" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <span style="color:red">*</span><span>Chofer:</span>
                        <select id="selChofer" class="form-control reiniciar-vehiculo" required></select>
                        <span id="errorselChofer" class="error"></span>
                    </div>
                    <div class="col-md-4 col-lg-3 col-xl-3">
                        <span style="color:red">*</span><span>Subir fotografías:</span>
                        <input type="button" class="btn btn-default btn-border btn-block" id="btnSubirVehiculo" value="Subir archivo">
                        <span id="errorSubirFotoVehiculo" class="error"></span>
                    </div>
                    <div class="col-md-1 content" style="padding-top:2px">
                        <br>
                        <button class="btn btn-default btn-border" id="anadirVehiculo">+</button>
                    </div>
                </div>
                <div class="row" style="margin-top:10px">
                    <div class="col-xs-12">
                        <span id="errorVehiculoDuplicado" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="row" style="margin-top:10px">
                <div class="col-xs-12 table-responsive">
                    <table id="tabVehiculos" class="table table-striped table-bordered">
                        <thead class="Tabla">
                            <tr>
                                <th width=25%>No. Placa</th>
                                <th width=25%>No. Serie</th>
                                <th width=15%>Marca</th>
                                <th width=15%>Año</th>
                                <th width=15%>Tipo de vehículo</th>
                                <th width=20%>Chofer</th>
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
            <a href="<?php echo base_url(); ?>Permisos/Ctrl_Permisos/index"><input type="button" class="btn btn-light" id="regresar" value="Regresar"></a>
        </div>
        <div class="p-4">
            <button class="btn btn-primary" id="extenderPermiso">Guardar</button>
        </div>
        <div class="p-4">
            <button class="btn btn-light anterior" style="display: none;">Anterior</button>
            <button class="btn btn-light siguiente">Siguiente</button>
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
                <div class="d-block d-sm-block d-md-none">
                    <div class="row">
                        <div class="col-md-12">
                            <video class="col-md-12" id="qr-video"></video>
                        </div>
                    </div>
                    <div class="row">
                        <b>Estado de escaneo de QR: </b>
                        <span id="cam-qr-result">No permitido</span>
                    </div>
                </div>
                <div class="d-none d-md-block d-lg-block d-xl-block">
                    <div class="row" style="margin-top:10px">
                        <div class="col-md-12">
                            <label>Realice el escaneo de la QR</label><br>
                            <input type="text" id="escaneoQR" class="form-control" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary d-block d-sm-block d-md-none" data-dismiss="modal" id="btnCancelarEscaneo">Cancelar</button>
                <button type="button" class="btn btn-secondary d-none d-md-block d-lg-block d-xl-block" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="modalLicencia" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Licencia</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerLicencia"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntarLicencia" class="btn btn-sm btn-secondary adjuntarLicencia">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarLicencia" data-id="" data-imagen="" style="display:none;">
                        <span id="erroradjuntarLicencia" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnAceptarAdjuntarLicencia">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="modalIdentificacion" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Identificacion</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerIdentificacion"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntarIdentificacion" class="btn btn-sm btn-secondary adjuntarIdentificacion">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarIdentificacion" data-id="" data-imagen="" style="display:none;" value="">
                        <span id="erroradjuntarIdentificacion" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnAceptarAdjuntarIdentificacion">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="modalPersonal" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Personal</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerPersonal"></div>
                    <div class="col-xs-12" style="margin-top:10px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntarPersonal" class="btn btn-sm btn-secondary adjuntarPersonal">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarPersonal" data-id="" data-imagen="" style="display:none;" value="">
                        <span id="erroradjuntarPersonal" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnAceptarAdjuntarPersonal">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="modalEquipo" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Equipo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerEquipo"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntarEquipo" class="btn btn-sm btn-secondary adjuntarEquipo">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarEquipo" data-id="" data-imagen="" style="display:none;">
                        <span id="erroradjuntarEquipo" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnAceptarAdjuntarEquipo">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="modalVehiculoFactura" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Factura</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerVehiculoFactura"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <label for="adjuntarVehiculoFactura" class="btn btn-sm btn-secondary adjuntarVehiculoFactura">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarVehiculoFactura" data-id="" data-imagen="" style="display:none;">
                        <span id="erroradjuntarVehiculoFactura" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnAceptarAdjuntarVehiculoFactura">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="modalVehiculo" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Vehículo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerVehiculo"></div>
                    <div class="col-xs-12" id="fotografiaLateral" style="margin-top:7px">
                        <label>Adjuntar fotografía lateral</label><br>
                        <label for="ajuntarLateralVehiculo" class="btn btn-sm btn-secondary ajuntarLateralVehiculo">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="ajuntarLateralVehiculo" data-id="" data-imagen="" style="display:none;">
                    </div>
                    <div class="col-xs-12" id="fotografiaPlaca" style="display:none;margin-top:10px">
                        <label>Adjuntar fotografía placa</label><br>
                        <label for="adjuntarPlacaVehiculo" class="btn btn-sm btn-secondary adjuntarPlacaVehiculo">Seleccionar archivo</label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarPlacaVehiculo" data-id="" data-imagen="" style="display:none;">
                    </div>
                    <div class="col-xs-12">
                        <span id="errorFotografiasVehiculos" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="btnSiguienteAdjuntarVehiculo" style="display:none;">Siguiente</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnAceptarAdjuntarVechiculo" style="display:none">Aceptar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>