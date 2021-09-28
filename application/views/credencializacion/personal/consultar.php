<div class="container">
    <div class="row">
        <div class="col-xs-12"><h3>Consultar Personal ejecutivo</h3></div>
        <div class="col-xs-12"><br><br><h5><b>Datos generales</b></h5></div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Tipo de persona:
            <input type="text" id="tipopersona" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 classoutsourcing" style="display:none;">
            <br>Clave patronal:
            <input type="text" id="clavepatronal" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 classoutsourcing" style="display:none;">
            <br>Empresa:
            <input type="text" id="nombreempresa" class="lectura" disabled value="">
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Numero de seguridad social:
            <input type="text" id="nss" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>CURP:
            <input type="text" id="curp" class="lectura" disabled value="">
        </div>
        <div class="col-xs-4 v-collapse-to-lg"></div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Nombre:
            <input type="text" class="lectura" disabled id="nombre" value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Primer apellido:
            <input type="text" class="lectura" disabled id="primer_apellido" value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Segundo apellido:
            <input type="text" class="lectura" disabled id="segundo_apellido" value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Sexo:
            <input type="text" id="sexo" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Fecha de nacimiento:
            <input type="date" id="fecha_nacimiento" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Nacionalidad:
            <input type="text" id="nacionalidad" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Pais:
            <input type="text" id="tipo_pais" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Tipo de sangre:
            <input type="text" id="sangre" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>RFC:
            <input type="text" id="rfc" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Puesto:
            <input type="text" id="puesto" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Área:
            <input type="text" id="area" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Tipo de identificación:
            <input type="text" id="identificacion" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span id="idclaveident">Clave de elector:</span>
            <input type="text" id="numidenti" class="lectura" disabled value="">
            <span id="errornumidenti" style="color:red; display:none;"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br><span>Fecha de vencimiento:</span>
            <input type="text" id="fechaexpiracion" class="lectura" disabled value="">
            <span id="errorfechaNacimiento" style="color:red; display:none;"></span>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>
            <a target="_blank" class="fotos" style="cursor:pointer;" id="Visuzaliarife"></a>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Correo electrónico:
            <input type="text" id="correo" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Teléfono:
            <input type="text" id="telefono" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>
            <a target="_blank" class="fotos" style="cursor:pointer;" id="Visuzaliarfoto"></a>
        </div>
    </div>
    <br><br>
    <div class="row">
        <div class="col-xs-10">
            <a href="<?php echo base_url(); ?>Credencializacion/Ctrl_Personal">
                <input type="button" class="btn btn-default" id="btnRegresar" value="Regresar">
            </a>
        </div>
        <div class="col-xs-2 d-flex justify-content-end">
            <div class="Reactivar p-1">
                <a title="Reactivar" onclick="pedir_confirmacion_reactivar()">
                    <span class="glyphicon glyphicon-ok-circle reactivar">
                </a>
            </div>
            <div class="Eliminar p-1">
                <a title="Dar de baja" onclick="pedir_confirmacion_eliminar()">
                    <span class="glyphicon glyphicon-trash eliminar">
                </a>
            </div>
        </div>
    </div>
</div>