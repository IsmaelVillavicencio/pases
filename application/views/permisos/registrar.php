<div class="container" autocomplete="off">
    <div class="row">
        <div class="col-xs-12"><br><h3>Solicitud de permiso de acceso</h3></div>
        <div class="col-md-8 col-xs-12">
            <br>Entidad:
            <input autocomplete="off" type="text" id="entidad" class="lectura" value="" disabled>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br>Referencia:
            <input autocomplete="off" type="text" id="referencia" class="lectura" value="" disabled>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br>
            <span class="required">*</span><span> Tipo de permiso:</span>
                <select id="tipoPermiso" class="form-control validar-requerido reiniciar-pase" required></select>
            <span id="errortipoPermiso" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br>
            <span class="required">*</span><span> Cliente, entidad u oficina a visitar:</span>
                <input autocomplete="off" type="text" id="clientetEntidad" class="form-control validar-requerido  reiniciar-pase" value="" required>
            <span id="errorclientetEntidad" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br>
            <span class="required">*</span><span> Actividad a realizar:</span>
                <select id="actividad" class="form-control validar-requerido reiniciar-pase" required></select>
            <span id="erroractividad" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br>
            <span class="required">*</span><span> Vigencia:</span>
                <select id="vigencia" class="form-control validar-requerido reiniciar-pase" required></select>
            <span id="errorvigencia" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12" id="divDias" style="display:none;">
            <br>
            <span class="required">*</span><span> Días:</span>
                <input autocomplete="off" type="text" id="dias" class="form-control reiniciar-pase" value="" required minlength="1">
            <span id="errordias" class="error"></span>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br>
            <span class="required">*</span><span> Fecha de inicio:</span>
            <input autocomplete="off" type="date" id="fechaInicio" class="form-control validar-requerido reiniciar-pase" value="" min="<?php echo date('Y-m-d')?>" required>
            <span id="errorfechaInicio" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br>
            <span class="required">*</span><span> Fecha de término:</span>
            <input autocomplete="off" type="date" id="fechaTermino" class="lectura validar-requerido reiniciar-pase" value="" min="<?php echo date('Y-m-d')?>" disabled>
            <span id="errorfechaTermino" class="error"></span>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <br>
            <span class="required">*</span><span> Recinto a ingresar:</span>
                <select id="recinto" class="form-control validar-requerido reiniciar-pase" required></select>
            <span id="errorrecinto" class="error"></span>
        </div>
        <div class="col-md-6 col-sm-6 col-xs-12" id="divRecinto" style="display:none;">
            <br>
            <span class="required">*</span><span> Nombre del recinto a visitar:</span>
                <select id="nombreRecinto" class="form-control reiniciar-pase" required></select>
            <span id="errornombreRecinto" class="error"></span>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <br>
            <span class="required">*</span><span> Motivo:</span>
                <textarea id="motivo" class="form-control validar-requerido reiniciar-pase" value="" rows="18" required></textarea>
            <span id="errormotivo" class="error"></span>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4 col-sm-6 col-xs-12">
            <div class="checkbox">
                <br>
                <label><input autocomplete="off" type="checkbox" id="enviar_migracion"> Enviar Migración</label>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4 col-sm-6 col-xs-12">
            <div class="checkbox">
                <label><input autocomplete="off" type="checkbox" id="permisoGrupal" value="">Permiso grupal</label>
            </div>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12" id="divCURPResp" style="display:none;">
            <br>
            <span class="required">*</span><span> CURP del titular del permiso:</span>
            <input autocomplete="off" type="text" id="curpResponsable" class="form-control reiniciar-pase" value="" maxlength="18" required>
            <span id="errorcurpResponsable" class="error"></span>
        </div>
    </div>
    <br><br>
    <ul class="nav nav-tabs">
        <li class="active"><a class="nav-link" id="personaltab" data-orden="1" data-toggle="tab" href="#personal">Personal</a></li>
		<li><a class="nav-link" id="equipoherramientatab" data-orden="2" data-toggle="tab" href="#equipoherramienta">Equipo/herramienta</a></li>
        <li><a class="nav-link" id="materialGraneltab" data-orden="3" data-toggle="tab" href="#materialGranel">Material a granel</a></li>
        <li><a class="nav-link" id="vehiculotab" data-orden="4" data-toggle="tab" href="#vehiculo">Vehículo</a></li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane fade in active" id="personal">
            <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Tipo de persona:</span>
                        <input autocomplete="off" type="hidden" id="id_personal_rest" value="0">
                        <select id="tipoEmpleado" class="form-control reiniciar-personal" required></select>
                    <span id="errortipoEmpleado" class="error"></span>
                </div>               
                <div class="col-md-4 col-sm-6 col-xs-12" id="divNacionalidad" style="display:none;">
                    <br>
                    <span class="required">*</span><span> Nacionalidad:</span>
                        <select id="nacionalidad" class="form-control reiniciar-personal" required></select>
                    <span id="errornacionalidad" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12" id="divEntidad" style="display:none;">
                    <br>
                    <span class="required">*</span><span> Entidad de gobierno federal:</span>
                        <select id="entidadGobierno" class="form-control reiniciar-personal" required></select>
                    <span id="errorentidadGobierno" class="error"></span>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12" id="divRFC" style="display:none;">
                    <br>
                    <span class="required">*</span><span> RFC:</span>
                        <input autocomplete="off" type="text" id="empresa_rfc" class="form-control reiniciar-personal" value="" required>
                    <span id="errorempresa_rfc" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12" id="divClavePatronal" style="display:none;">
                    <br>
                    <span class="required"></span><span> Clave patronal:</span>
                        <input autocomplete="off" type="text" id="clavePatronal" class="form-control reiniciar-personal" value="" maxlength="11" required>
                    <span id="errorclavePatronal" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12" id="divEmpresa" style="display:none;">
                    <br>
                    <span class="required">*</span><span> Empresa:</span>
                        <input type="hidden" id="idempresa" value="0">
                        <input autocomplete="off" type="text" id="empresa" class="form-control reiniciar-personal" value="" required>
                    <span id="errorempresa" class="error"></span>
                </div>
            </div>
            <div class="row" id="divCURP" style="display:none;">
                <input autocomplete="off" type="hidden" id="idpersona" value="0">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required" id="curpMexicana">*</span><span>CURP:</span>
                    <input autocomplete="off" type="text" id="curp" class="form-control reiniciar-personal" value="" maxlength="18" required>
                    <span id="errorcurp" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12 mt-md-5" style="display: none;">
                    <br>
                    <button class="btn btn-default escanear-camara visible-xs visible-sm">Escanear CURP</button>
				    <button class="btn btn-default escanear-escaner visible-md visible-lg visible-xl">Escanear CURP</button>
                </div>
            </div>
            <div class="row" id="divNombreApellidos" style="display:none;">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Nombre:</span>
                    <input autocomplete="off" type="text" id="nombre" class="form-control reiniciar-personal" value="" required disabled>
                    <span id="errornombre" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Primer apellido:</span>
                    <input autocomplete="off" type="text" id="primerApellido" class="form-control reiniciar-personal" value="" required disabled>
                    <span id="errorprimerApellido" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>Segundo apellido:
                    <input autocomplete="off" type="text" id="segundoApellido" class="form-control reiniciar-personal" value="" disabled>
                    <span id="errorsegundoApellido" class="error"></span>
                </div>
                <input autocomplete="off" type="hidden" id="idcontacto" value="0">
                <div class="col-md-4 col-sm-6 col-xs-12" id="divTelefono" style="display:none;">
                    <br>
                    <span class="required">*</span><span> Número de teléfono:</span>
                    <input autocomplete="off" type="tel" id="numtelefono" class="form-control reiniciar-personal" value="" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==10) return false;" required>
                    <span id="errornumtelefono" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12" id="divCorreo" style="display:none;">
                    <br>
                    <span class="required">*</span><span> Correo electrónico:</span>
                    <input autocomplete="off" type="email" id="correo" class="form-control reiniciar-personal" value="" required>
                    <span id="errorcorreo" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12" id="divChofer" style="display:none;">
                    <br>
                    <div class="checkbox">
                        <label><input autocomplete="off" type="checkbox" id="chofer" value="">Chofer</label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12" id="divTipoSeguro" style="display: none">
                    <br>
                    <span class="required">*</span><span> Tipo de seguro:</span>
                        <select id="tipoSeguro" class="form-control reiniciar-personal" required>
                        <option value="">Seleccione</option>
                        <option value="1">Número de IMSS</option>
                        <option value="2">Número de ISSSTE</option>
                        <option value="3">Aseguradora</option>
                        </select>
                    <span id="errortipoSeguro" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12" id="divAseguradora" style="display:none;">
                    <br>Aseguradora:
                    <select id="aseguradoras" class="form-control reiniciar-personal" required></select>
                    <span id="erroraseguradoras" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12" id="divNoSeguroSocial" style="display:none;">
                    <br>
                    <span class="required">*</span><span> Número de seguridad social:</span>
                    <input autocomplete="off" type="text" id="numSeguroSocial" class="form-control reiniciar-personal" maxlength="11" value="" required>
                    <span id="errornumSeguroSocial" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12" id="divNoIssste" style="display:none;">
                    <br>
                    <span class="required">*</span><span> Número de ISSSTE:</span>
                        <input autocomplete="off" type="text" id="noIssste" class="form-control reiniciar-personal" maxlength="11" value="" required>
                    <span id="errornoIssste" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12" id="divNoSeguro" style="display:none;">
                    <br>Número de póliza:
                    <input autocomplete="off" type="text" id="noSeguro" class="form-control reiniciar-personal" maxlength="20" value="">
                    <span id="errornoSeguro" class="error"></span>
                </div>
            </div>
            <div class="row" id="divLicencia" style="display:none;">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Número de licencia:</span>
                    <input autocomplete="off" type="text" id="noLicencia" class="form-control reiniciar-personal" value="" maxlength="8" required>
                    <span id="errornoLicencia" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Fecha de vencimiento:</span>
                    <input autocomplete="off" type="date" id="fechaVenciminetoLic" class="form-control reiniciar-personal" min="<?php echo date('Y-m-d')?>" value="" required>
                    <span id="errorfechaVenciminetoLic" class="error"></span>
                </div>
                <div class="col-md-4 col-xl-3 col-xl-3 mt-md-5">
                    <br>
                    <input autocomplete="off" type="button" class="btn btn-default" id="btnAdjuntarLicencia" value="Subir licencia">
                    <br>
                    <span id="errorSubirLicencia" class="error"></span>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12" id="divTipoIdentificacion" style="display:none;">
                    <br>
                    <span class="required">*</span><span> Tipo de identificación:</span>
                        <select id="tipoIdentificacion" class="form-control reiniciar-personal" required></select>
                    <span id="errortipoIdentificacion" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12" id="divClaveElector" style="display:none;">
                    <br>
                    <span class="required">*</span><span> Clave de elector:</span>
                        <input autocomplete="off" type="text" id="claveElector" class="form-control reiniciar-personal" value="" maxlength="18" required>
                    <span id="errorclaveElectoral" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12" id="divPasaporte" style="display:none;">
                    <br>
                    <span class="required">*</span><span> Número de pasaporte:</span>
                        <input autocomplete="off" type="text" id="noPasaporte" class="form-control reiniciar-personal" value="" maxlength="12" required>
                    <span id="errornumPasaporte" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12" id="divLibretaMar" style="display:none;">
                    <br>
                    <span class="required">*</span><span> Libreta de mar:</span>
                        <input autocomplete="off" type="text" id="libretaMar" class="form-control reiniciar-personal" value="" maxlength="10" required>
                    <span id="errorlibretaMar" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12" id="divItinerario" style="display:none;">
                    <br>Itinerario de viaje:
                    <input autocomplete="off" type="text" id="itinerario" class="form-control reiniciar-personal" value="">
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12" id="divFechaVencimiento" style="display:none;">
                    <br>
                    <span class="required">*</span><span> Fecha de vencimiento:</span>
                    <input autocomplete="off" type="date" id="fechaVenciminetoIdent" class="form-control reiniciar-personal" value="" min="<?php echo date('Y-m-d')?>" required>
                    <span id="errorfechaVenciminetoIdent" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12 mt-md-5" id="divSubirDocumento" style="display:none;">
                    <br>
                    <input autocomplete="off" type="button" class="btn btn-default btn-border btn-block" id="btnSubirIdentificacion" value="Subir identificación">
                    <span id="errorSubirIdentificacion" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12 mt-md-5" id="divSubirfoto" style="display:none;">
                    <br>
                    <input autocomplete="off" type="button" class="btn btn-default btn-border btn-block" id="btnSubirPersonal" value="Subir foto">
                    <span id="errorSubirPersonal" class="error"></span>
                </div>
                <div class="col-xs-12 text-right content" id="divAnadir" style="display:none;">
                    <br>
                    <button class="btn btn-default btn-border" id="anadirPersona">Agregar a la lista</button>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <br>
                    <span id="errorPersonalDuplicado" class="error"></span>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-xs-12 table-responsive">
                    <table id="tabPersonal" class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th width=20%>Tipo de persona</th>
                                <th width=30%>Nombre</th>
                                <th width=20%>Nacionalidad</th>
                                <th width=10%>Acciones</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="equipoherramienta">
            <div class="row">
                <input autocomplete="off" type="hidden" id="idequipo" value="0">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Tipo de equipo:</span>
                    <select id="tipoEquipo" class="form-control reiniciar-equipo" required></select>
                    <span id="errortipoEquipo" class="error"></span>
                </div>
            </div>
            <div class="row" id="divCaracteristicas" style="display:none;">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Número de serie:</span>
                    <input autocomplete="off" type="text" id="noSerieEquipo" class="form-control reiniciar-equipo" value="" maxlength="25" required>
                    <span id="errornoSerieEquipo" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Modelo:</span>
                    <input autocomplete="off" type="text" id="modeloHerramienta" class="form-control reiniciar-equipo" value="" maxlength="25" required>
                    <span id="errormodeloHerramienta" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Marca:</span>
                    <input autocomplete="off" type="text" id="marcaHerramienta" class="form-control reiniciar-equipo" value="" maxlength="25" required>
                    <span id="errormarcaHerramienta" class="error"></span>
                </div>
            </div>
            <div class="row" id="divDocumento1" style="display:none;">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Tipo de documento:</span>
                    <select id="tipoDocumento" class="form-control reiniciar-equipo" required></select>
                    <span id="errortipoDocumento" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Número de factura:</span>
                    <input autocomplete="off" type="text" id="noFacturaEquipo" class="form-control reiniciar-equipo" value="" maxlength="25" required>
                    <span id="errornoFacturaEquipo" class="error"></span>
                </div>
                <div class="col-md-4 col-xl-3 col-sm-6 col-xs-12 mt-md-5">
                    <br>
                    <input autocomplete="off" type="button" class="btn btn-default btn-border btn-block" id="btnSubirEquipo" value="Subir documento">
                    <span id="errorSubirFacturaEquipo" class="error"></span>
                </div>
            </div>
            <div id="divOtros" style="display:none;">
                <div class="row">
                    <div class="col-md-8 col-sm-12 col-xs-12">
                        <br>
                        <span> Anexo 29:</span>
                        <input autocomplete="off" type="text" id="anexo29" class="form-control reiniciar-equipo" value="" maxlength="250" required>
                        <span id="erroranexo29" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                        <br>
                        <br>
                        <input autocomplete="off" type="button" class="btn btn-default btn-border btn-block" id="btnSubirEquipoAnexo" value="Subir Anexo">
                        <span id="errorSubirEquipoAnexo" class="error"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 col-sm-6 col-xs-12">
                        <br>
                        <span class="required">*</span><span> Descripción:</span>
                        <textarea rows="4" class="form-control reiniciar-equipo" id="descripcionEquipo" maxlength="500"></textarea>
                        <span id="errordescripcionEquipo" class="error"></span>
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12">
                        <br>
                        <br>
                        <input autocomplete="off" type="button" class="btn btn-default btn-border btn-block" id="btnSubirEquipoRF" value="Subir RF">
                        <span id="errorSubirEquipoRF" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="row" id="divResguardo" style="display:none;">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Resguardo a favor de:</span>
                    <select id="resguardo" class="form-control reiniciar-equipo" required></select>
                    <span id="errorresguardo" class="error"></span>
                </div>
                <div class="col-xs-12 content text-right" style="padding-top:2px">
                    <br>
                    <button class="btn btn-default btn-border" id="anadirEquipo">Agregar a la lista</button>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <br>
                    <span id="errorHerramientaDuplicado" class="error"></span>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-xs-12 table-responsive">
                    <table id="tabEquipoHerramienta" class="table table-striped table-bordered">
                        <thead class="Tabla">
                            <tr>
                                <th width=20%>Tipo de equipo</th>
                                <th width=20%>Modelo</th>
                                <th width=25%>Marca</th>
                                <th width=25%>Número de serie</th>
                                <th width=10%>Acciones</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="materialGranel">
            <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Responsable:</span>
                    <select id="responsableMaterial" class="form-control" required></select>
                    <span id="errorresponsableMaterial" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Tipo de material:</span>
                    <select id="tipoMaterial" class="form-control" required></select>
                    <span id="errortipoMaterial" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12" id="divMedidas">
                    <br>
                    <span class="required">*</span><span> Tipo de medida:</span>
                    <select id="tipoMedida" class="form-control" required></select>
                    <span id="errortipoMedida" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Cantidad:</span>
                    <input autocomplete="off" type="text" id="cantidad" class="form-control" value="" minlength="1" required>
                    <span id="errorcantidad" class="error"></span>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Descripción:</span>
                        <textarea id="descripcion" class="form-control" value="" maxlength="500" required></textarea>
                    <span id="errordescripcion" class="error"></span>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 content text-right" style="padding-top:2px">
                    <br>
                    <button class="btn btn-default btn-border" id="anadirMaterial">Agregar a la lista</button>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <br>
                    <span id="errorMaterialDuplicado" class="error"></span>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-xs-12 table-responsive">
                    <table id="tabMaterial" class="table table-striped table-bordered">
                        <thead class="Tabla">
                            <tr>
                                <th width=20%>Tipo de material</th>
                                <th width=20%>Cantidad</th>
                                <th width=20%>Tipo de medida</th>
                                <th width=20%>Descripcion</th>
                                <th width=20%>Acciones</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="vehiculo">
            <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Tipo de vehículo:</span>
                    <select id="tipoVehiculo" class="form-control reiniciar-vehiculo" required></select>
                    <span id="errortipoVehiculo" class="error"></span>
                </div>
                <br><br>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <button type="button" id="limpiarFormulario" class="btn btn-default">Limpiar</button>
                </div>
            </div>
            <div class="row">
                <input autocomplete="off" type="hidden" id="idvehiculo" value="0">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Número de placa:</span>
                    <input autocomplete="off" type="text" id="noPlaca" class="form-control reiniciar-vehiculo" maxlength="10" value="">
                    <span id="errornoPlaca" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Número de serie:</span>
                    <input autocomplete="off" type="text" id="noSerieVehiculo" class="form-control reiniciar-vehiculo" maxlength="17" value="">
                    <span id="errornoSerieVehiculo" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>Número de motor:
                    <input autocomplete="off" type="text" id="noMotor" class="form-control reiniciar-vehiculo" minlength="4" maxlength="25" value="">
                    <span id="errornoMotor" class="error"></span>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>Marca:
                    <input autocomplete="off" type="text" id="marcaVehiculo" class="form-control reiniciar-vehiculo" value="" maxlength="50">
                     <span id="errormarcaVehiculo" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>Modelo:
                    <input autocomplete="off" type="text" id="modeloVehicuo" class="form-control reiniciar-vehiculo" value="" maxlength="50">
                     <span id="errormodeloVehicuo" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>Año:
                    <input autocomplete="off" type="text" id="anio" class="form-control reiniciar-vehiculo" value="" maxlength="4">
                     <span id="erroranio" class="error"></span>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>Color:
                    <input autocomplete="off" type="text" id="color" class="form-control reiniciar-vehiculo" value="" maxlength="100">
                     <span id="errorcolor" class="error"></span>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Tipo de tarjeta de circulación:</span>
                    <select id="tipoTarjetaCirculacion" class="form-control reiniciar-vehiculo" required></select>
                    <span id="errortipoTarjetaCirculacion" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Número de tarjeta:</span>
                    <input autocomplete="off" type="text" id="noTarjeta" class="form-control reiniciar-vehiculo" value=""  onKeyPress="if(this.value.length==20) return false;" required>
                    <span id="errornoTarjeta" class="error"></span>
                </div>
                <!--div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Vigencia de tarjeta de circulación:</span>
                    <input autocomplete="off" type="date" id="vigenciaTarjeta" class="form-control reiniciar-vehiculo"  value="" required>
                    <span id="errorvigenciaTarjeta" class="error"></span>
                </div-->
            </div>
            <!--div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span>Tipo de documento:</span>
                    <select id="tipodocumentoVeh" class="form-control reiniciar-vehiculo"></select>
                    <span id="errortipodocumentoVeh" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span>Número de factura:</span>
                    <input autocomplete="off" type="text" id="noFacturaVeh" class="form-control reiniciar-vehiculo" value="" onKeyPress="if(this.value.length==20) return false;" required>
                    <span id="errornoFacturaVeh" class="error"></span>
                </div>
                <div class="col-md-4 col-xl-3 col-sm-6 col-xs-12 mt-md-5">
                    <br>
                    <input autocomplete="off" type="button" class="btn btn-default btn-border btn-block" id="btnSubirFacturaVehiculo" value="Subir factura/carta factura">
                    <span id="errorSubirFacturaVehiculo" class="error"></span>
                </div>
            </div-->
            <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Aseguradora:</span>
                    <select id="aseguradorasVeh" class="form-control reiniciar-vehiculo" required></select>
                    <span id="erroraseguradorasVeh" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Número de póliza:</span>
                    <input autocomplete="off" type="text" id="noPoliza" class="form-control reiniciar-vehiculo" value="" onKeyPress="if(this.value.length==20) return false;" required>
                    <span id="errornoPoliza" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Vigencia de póliza:</span>
                    <input autocomplete="off" type="date" id="vigenciaPoliza" class="form-control reiniciar-vehiculo" value="" min="<?php echo date('Y-m-d')?>" required>
                    <span id="errorvigenciaPoliza" class="error"></span>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Período de pago:</span>
                        <select id="periodoPago" class="form-control reiniciar-vehiculo" required></select>
                    <span id="errorperiodoPago" class="error"></span>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <br>Período de cobertura:
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Fecha inicio:</span>
                    <input autocomplete="off" type="date" id="periodoCobFechaInicio" class="form-control reiniciar-vehiculo" value="" max="<?php echo date('Y-m-d')?>" required>
                    <span id="errorperiodoCobFechaInicio" class="error"></span>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Fecha fin:</span>
                    <input autocomplete="off" type="date" id="periodoCobFechaFin" class="form-control reiniciar-vehiculo" value="" min="<?php echo date('Y-m-d')?>" required>
                    <span id="errorperiodoCobFechaFin" class="error"></span>
                </div>
            </div>
            <div class="row">
                <!--div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Estatus:</span>
                    <input autocomplete="off" type="text" id="estatusVehiculo" class="form-control reiniciar-vehiculo" value="" required>
                    <span id="errorestatusVehiculo" class="error"></span>
                </div-->
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <br>
                    <span class="required">*</span><span> Chofer:</span>
                    <select id="selChofer" class="form-control reiniciar-vehiculo" required></select>
                    <span id="errorselChofer" class="error"></span>
                </div>
                <div class="col-md-4 col-xl-3 col-xl-3">
                    <br>
                    <span class="required">*</span><span> Subir fotografías:</span>
                    <input autocomplete="off" type="button" class="btn btn-default btn-border btn-block" id="btnSubirVehiculo" value="Subir archivo">
                    <span id="errorSubirFotoVehiculo" class="error"></span>
                    <span id="errorSubirFotoLat" class="error"></span> <br> 
                    <span id="errorSubirFotoPla" class="error"></span> 

                </div>
                <div class="col-xs-12 text-right content">
                    <br>
                    <button class="btn btn-default btn-border" id="anadirVehiculo">Agregar a la lista</button>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <br>
                    <span id="errorVehiculoDuplicado" class="error"></span>
                </div>
            </div>
            <br>
            <div class="row">
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
                                <th width=10%>Acciones</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-6 col-sm-4 col-lg-3 col-xl-2">
            <input autocomplete="off" type="button" class="btn btn-default btn-border btn-block" id="btnRegresar" value="Regresar">
        </div>
        <div class="col-xs-6 col-sm-4 col-lg-3 col-xl-2">
            <input autocomplete="off" type="button" class="btn btn-primary btn-border btn-block" id="btnGuardar" value="Enviar solicitud">
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
						<div class="col-xs-12">
							<video class="col-xs-12" id="qr-video"></video>
						</div>
					</div>
					<div class="row">
						<b>Estado de escaneo de QR: </b>
						<span id="cam-qr-result">No permitido</span>
					</div>
				</div>
				<div class="d-none d-md-block d-lg-block d-xl-block">
					<div class="row">
						<div class="col-xs-12">
							<label>Realice el escaneo de la QR</label><br>
							<input autocomplete="off" type="text" id="escaneoQR" class="form-control"/>
						</div>
					</div>
				</div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default d-block d-sm-block d-md-none" data-dismiss="modal" id="btnCancelarEscaneo">Cancelar</button>
				<button type="button" class="btn btn-default d-none d-md-block d-lg-block d-xl-block" data-dismiss="modal">Cancelar</button>
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
                    <br>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <input autocomplete="off" type="file"  style="color: transparent" accept="image/jpg, image/jpeg, image/png" id="adjuntarLicencia" data-id="" data-imagen="" >
                        <span id="erroradjuntarLicencia" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary ml-4" data-dismiss="modal" id="btnAceptarAdjuntarLicencia">Aceptar</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="modalIdentificacion" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Identificación</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerIdentificacion"></div>
                    <br>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <input autocomplete="off" type="file" style="color: transparent" accept="image/jpg, image/jpeg, image/png" id="adjuntarIdentificacion" data-id="" data-imagen="" value="">
                        <span id="erroradjuntarIdentificacion" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary ml-4" data-dismiss="modal" id="btnAceptarAdjuntarIdentificacion">Aceptar</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
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
                    <br>
                    <div class="col-xs-12">
                        <label>Adjuntar fotografía</label><br>
                        <!--label for="adjuntarPersonal" class="btn btn-sm btn-secondary adjuntarPersonal">Seleccionar archivo</label-->
                        <input autocomplete="off" style="color: transparent" type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarPersonal" data-id="" data-imagen="" value="">
                        <span id="erroradjuntarPersonal" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary ml-4" data-dismiss="modal" id="btnAceptarAdjuntarPersonal">Aceptar</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="modalEquipo" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Factura / Carta factura</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerEquipo"></div>
                    <br>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <input autocomplete="off" style="color: transparent" type="file" accept="image/jpg, image/jpeg, image/png, application/pdf" id="adjuntarEquipo" data-id="" data-imagen="" >
                        <span id="erroradjuntarEquipo" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary ml-4" data-dismiss="modal" id="btnAceptarAdjuntarEquipo">Aceptar</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="modalEquipoAnexo" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Anexo 29</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerEquipoAnexo"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <input autocomplete="off" style="color: transparent" type="file" accept="image/jpg, image/jpeg, image/png, application/pdf" id="adjuntarEquipoAnexo" data-id="" data-imagen="" >
                        <span id="erroradjuntarEquipoAnexo" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary ml-4" data-dismiss="modal" id="btnAceptarAdjuntarEquipoAnexo">Aceptar</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="modalEquipoRf" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Documento RF</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12" id="pdfViewerEquipoRF"></div>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <input autocomplete="off" style="color: transparent" type="file" accept="image/jpg, image/jpeg, image/png, application/pdf" id="adjuntarEquipoRF" data-id="" data-imagen="" >
                        <span id="erroradjuntarEquipoRF" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary ml-4" data-dismiss="modal" id="btnAceptarAdjuntarEquipoRF">Aceptar</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<!--div class="modal" id="modalVehiculoFactura" role="dialog">
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
                    <br>
                    <div class="col-xs-12" style="margin-top:7px">
                        <label>Adjuntar fotografía</label><br>
                        <input autocomplete="off" style="color: transparent" type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarVehiculoFactura" data-id="" data-imagen="" >
                        <span id="erroradjuntarVehiculoFactura" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary ml-4" data-dismiss="modal" id="btnAceptarAdjuntarVehiculoFactura">Aceptar</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div-->
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
                    <br>
					<div class="col-xs-12" id="fotografiaLateral" style="margin-top:7px">
                        <label>Adjuntar fotografía lateral</label><br>
                        <input autocomplete="off" style="color: transparent" type="file" accept="image/jpg, image/jpeg, image/png" id="ajuntarLateralVehiculo" data-id="" data-imagen="" >
                    </div>
					<div class="col-xs-12" id="fotografiaPlaca" style="display:none;">
                    <br>
                        <label>Adjuntar fotografía placa</label><br>
                        <input autocomplete="off" style="color: transparent" type="file" accept="image/jpg, image/jpeg, image/png" id="adjuntarPlacaVehiculo" data-id="" data-imagen="" >
                    </div>
					<div class="col-xs-12">
						<span id="errorFotografiasVehiculos" class="error"></span>
					</div>
                </div>
            </div>
            <div class="modal-footer">
				<button type="button" class="btn btn-secondary ml-4" id="btnSiguienteAdjuntarVehiculo" style="display:none;">Siguiente</button>
                <button type="button" class="btn btn-primary ml-4" data-dismiss="modal" id="btnAceptarAdjuntarVechiculo" style="display:none">Aceptar</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<br>
<br>