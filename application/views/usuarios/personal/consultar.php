<div class="container">
    <div class="row">
        <div class="col-xs-12"><br><br><h3>Consultar Personal ejecutivo</h3></div>
    </div>
    <div class="row">
        <div class="col-xs-12"><br><br><h5><b>Datos generales</b></h5></div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Puesto:
            <input type="text" id="puesto" class="lectura" disabled disabled value="">
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Área:
            <input type="text" id="area" class="lectura" disabled disabled value="">
        </div>
        <div class="col-xs-4 v-collapse-to-lg"></div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>CURP:
            <input type="text" class="lectura" disabled id="curp" value="">
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Grado profesional:
            <input type="text" class="lectura" disabled id="denominacion" value="">
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Nombre:
            <input type="text" class="lectura" disabled id="nombre" value="">
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Primer apellido:
            <input type="text" class="lectura" disabled id="primer_apellido" value="">
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Segundo apellido:
            <input type="text" class="lectura" disabled id="segundo_apellido" value="">
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Fecha de nacimiento:
            <input type="date" id="fechaNacimiento" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Edad:
            <input type="number" id="edad" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Sexo:
            <input type="text" id="sexo" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Nacionalidad:
            <input type="text" id="nacionalidad" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Estado de nacimiento:
            <input type="text" id="estadoNacimiento" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Ciudad de nacimiento:
            <input type="text" id="ciudadNacimiento" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Tipo de sangre:
            <input type="text" id="tipoSangre" class="lectura" disabled value="">
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12"><br><br><h5><b>Domicilio</b></h5></div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Código postal:
            <input type="number" id="codigoPostal" class="lectura" disabled value="" required>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Estado:
            <input type="text" id="estado" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Municipio:
            <input type="text" id="municipio" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Colonia:
            <input type="text" id="colonia" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Calle:
            <input type="text" id="calle" class="lectura" disabled value="" required>
        </div>
        <div class="col-xs-12 col-md-2 col-sm-3">
            <br>No. Exterior:
            <input type="text" id="noExterior" class="lectura" disabled value="" required>
        </div>
        <div class="col-xs-12 col-md-2 col-sm-3">
            <br>No. Interior:
            <input type="text" id="noInterior" class="lectura" disabled value="" required>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Entre calle 1:
            <input type="text" id="entreCalle1" class="lectura" disabled value="" required>
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Entre calle 2:
            <input type="text" id="entreCalle2" class="lectura" disabled value="" required>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12"><br><br><h5><b>Datos de contacto</b></h5></div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Correo electrónico:
            <input type="email" id="correoElectronico" class="lectura" disabled value="">
        </div>
        <div class="col-xs-12 col-md-4 col-sm-6">
            <br>Número de teléfono:
            <input type="number" id="numTelefono" class="lectura" disabled value="">
        </div>
    </div>
    <br><br>
    <div class="row">
        <div class="col-xs-10">
            <input type="button" class="btn btn-default" id="regresar" value="Regresar">
        </div>
        <div class="col-xs-2 d-flex justify-content-end">
            <div class="Reactivar p-1">
                <a title="Reactivar" href="<?php echo base_url(); ?>Usuarios/Ctrl_Personal/reactivar">
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
<br>