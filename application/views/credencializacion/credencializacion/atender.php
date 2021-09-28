<div class="container">
    <div class="row">
        <div class="col-xs-12"><h3>Atender solicitud de credenciales</h3></div>
    </div>
    <br>
    
    <div class="row">
        <div class="col-xs-12 table-responsive">
        <table id="tabRegCredenciales" class="table table-striped table-bordered" style="width:100%">
                <thead class="Tabla">
                    <tr>
                        <th width=20%>Tipo de persona</th>
                        <th width=20%>Nombre completo</th>
                        <th width=20%>CURP</th>
                        <th width=20%>Estatus</th>
                        <th width=20%>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <div class="d-flex justify-content-center" >
                                <div class="p-1">
                                    <a href="#!">
                                        <span class="glyphicon glyphicon-eye-open ver" aria-hidden="true"></span>
                                    </a>
                                </div>
                                <div class="p-1">
                                    <a href="#!">
                                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                                    </a>
                                </div>
                                <div class="p-1">
                                    <a href="#!">
                                        <span class="glyphicon glyphicon-remove-circle cancelar" aria-hidden="true"></span>
                                    </a>
                                </div>
                                
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>        
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-lg-6">
            <a href="<?php echo base_url(); ?>Credencializacion/Ctrl_Credencializacion/index">
                <input type="button" class="btn btn-default" id="btnRegresar" value="Regresar">
            </a>
        </div>
    </div>
</div>


<div class="modal" id="modalConsultarCrendencial" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
<div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
        <div class="modal-header">
                <h4 class="modal-title col-11 text-center" id="exampleModalLongTitle">Consultar credencial</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        Motivo de ingreso:
                        <input type="text" id="motivoIngreso" class="lectura" value="" disabled>
                    </div>
                    <div class="col-md-6">
                        Accesos:
                        <input type="text" id="accesos" class="lectura" value="" disabled>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6">
                        CURP:
                        <input type="text" id="curp" class="lectura" value="" disabled>
                    </div>
                    <div class="col-md-6">
                        Número de seguridad social:
                        <input type="text" id="nss" class="lectura" value="" disabled>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6">
                        Nombre completo:        
                        <input type="text" id="nombrecompleto" class="lectura" value="" disabled>
                    </div>
                    <div class="col-md-6">
                        Tipo de persona:
                        <input type="text" id="tipoPersona" class="lectura" value="" disabled>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6">
                        Sexo:    
                        <input type="text" id="sexo" class="lectura" value="" disabled>
                    </div>
                    <div class="col-md-6">
                        Fecha de nacimiento:
                        <input type="date" id="fechaNacimiento" class="lectura" value="" disabled>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6">
                          Nacionalidad:      
                        <input type="text" id="nacionalidad" class="lectura" value="" disabled>
                    </div>
                    <div class="col-md-6">
                        País:
                        <input type="text" id="pais" class="lectura" value="" disabled>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6">
                        Tipo de sangre:  
                        <input type="text" id="tipoSangre" class="lectura" value="" disabled>
                    </div>
                    <div class="col-md-6">
                        RFC:
                        <input type="text" id="rfc" class="lectura" value="" disabled>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6">
                        Puesto:  
                        <input type="text" id="puesto" class="lectura" value="" disabled>
                    </div>
                    <div class="col-md-6">
                        Área:
                        <input type="text" id="area" class="lectura" value="" disabled>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6">
                        Tipo de identificación:
                        <input type="text" id="tipoIdentiicacion" class="lectura" value="" disabled>
                    </div>
                    <div class="col-md-6" id="divclaveElector">
                        Clave de elector:
                        <input type="text" id="claveElector" class="lectura" value="" disabled>
                    </div>
                    <div class="col-md-6" id="divnoPasaporte" style="display:none">
                        Número de pasaporte:
                        <input type="text" id="noPasaporte" class="lectura" value="" disabled>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6">
                        Fecha de vencimiento:    
                        <input type="text" id="fechaVencimiento" class="lectura" value="" disabled>
                    </div>
                    <div class="col-md-6">
                        Correo electrónico:
                        <input type="text" id="correo" class="lectura" value="" disabled>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6">
                        Número de teléfono:
                        <input type="text" id="telefono" class="lectura" value="" disabled>
                    </div>
                    <div class="col-md-6">
                        Empresa:
                        <input type="text" id="empresa" class="lectura" value="" disabled>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6">
                        Clave patronal:
                        <input type="text" id="clavePatronal" class="lectura" value="" disabled>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6">
                        <div style="width: 240px;">
                            <img class="image" id="" src="#" alt="" style="width: 100%; height: 100%;">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div style="width: 240px;">
                            <img class="image" id="" src="#" alt="" style="width: 100%; height: 100%;">
                        </div>
                    </div>
                </div>
                <br>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnAutorizar">Autorizar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btnRechazar">Rechazar</button>
            </div>
        </div>
    </div>
</div>