<div class="container">
    <div class="row">
        <div class="col-xs-12"><h3>Reactivar personal ejecutivo</h3></div>
    </div>
    <br><br>
    <div class="row">
        <div class="col-xs-12"><h5><b>Datos generales</b></h5></div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4">
          <span style="color:red;">*</span><span>Puesto:</span> 
            <select id="selPuesto" class="form-control validar">
            </select>
            <span id="errorselPuesto"style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-md-4">
        <span style="color:red;">*</span><span>Área:</span>
            <select id="selArea" class="form-control validar">
            </select>
             <span id="errorselArea" style="color:red; display:none;">Campo obligatorio</span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4">
            CURP:
            <input type="text" class="form-control" maxlength="18" id="curp" disabled>
        </div>
        <div class="col-md-4">
            Grado profesional:
            <select id="selDenominacion" class="form-control" disabled>
            </select>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4">
            Nombre:
            <input type="text" class="form-control" id="nombre" value="" disabled>
        </div>
        <div class="col-md-4">
            Primer apellido:
            <input type="text" class="form-control" id="primer_apellido" value="" disabled>
        </div>
        <div class="col-md-4">
            Segundo apellido:
            <input type="text" class="form-control" id="segundo_apellido" value="" disabled>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4">
        Fecha de nacimiento:
            <input type="date" id="fechaNacimiento" class="form-control" value="" readonly>
        </div>
        <div class="col-md-4">
        Edad:
            <input type="number" id="edad" class="form-control" value="" readonly>
        </div>
        <div class="col-md-4">
        Sexo:
            <input type="text" id="sexo" class="form-control" value="" readonly>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4">
            Nacionalidad:
            <select id="selNacionalidad" class="form-control" disabled>
                <option value="">Seleccione</option>
            </select>
        </div>
        <div class="col-md-4">
            Estado de nacimiento:
            <select class="form-control" id="estadonacimiento" disabled>
            </select>
        </div>
        <div class="col-md-4">
            Ciudad de nacimiento:
            <select class="form-control" id="ciudadnacimiento" disabled>
                <option value="">Seleccione</option>
            </select>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4">
            Tipo de sangre:
            <select id="tipoSangre" class="form-control" disabled>
            </select>
        </div>
    </div>
    <br><br>
    <div class="row">
        <div class="col-xs-12"><h5><b>Domicilio</b></h5></div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            <span style="color:red;">*</span><span>Código postal:</span>
            <input type="number" id="codigoPostal" class="form-control validar" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==5) return false;" value="" required>
            <span id="errorcodigoPostal" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span style="color:red;">*</span><span>Estado:</span>
            <input type="text" id="estado" class="form-control validar" value="" required disabled>
            <span id="errorestado" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-md-4 col-sm-6">
            <span style="color:red;">*</span><span>Municipio:</span>
            <input type="text" id="municipio" class="form-control validar" value="" required disabled> 
            <span id="errormunicipio" style="color:red; display:none;">Campo obligatorio</span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
        <span style="color:red;">*</span><span>Colonia:</span>
            <select id="selColonia" class="form-control validar" required>
                <option value="">Seleccione</option>
            </select>
            <span id="errorselColonia" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-md-4 col-sm-6">
        <span style="color:red;">*</span><span>Calle:</span>
            <input type="text" id="calle" class="form-control validar" value="" required>
            <span id="errorcalle" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-md-2 col-sm-3">
        <span style="color:red;">*</span><span>No. Exterior:</span>
            <input type="number" id="noExterior" class="form-control validar" value="" required>
            <span id="errornoExterior" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-md-2 col-sm-3">
            No. Interior:
            <input type="number" id="noInterior" class="form-control" value="" required>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4 col-sm-6">
            Entre calle 1:
            <input type="text" id="entreCalle1" class="form-control" value="" required>
        </div>
        <div class="col-md-4 col-sm-6">
            Entre calle 2:
            <input type="text" id="entreCalle2" class="form-control" value="" required>
        </div>
    </div>
    <br><br>
    <div class="row">
        <div class="col-xs-12"><h5><b>Datos de contacto</b></h5></div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-4">
            <span style="color:red;">*</span><span>Correo electrónico:</span>
            <div class="input-group">
                <input type="email" id="correoElectronico" class="form-control validar" value="">
                <div class="input-group-prepend" style="display:none;" id="loadingValidar">
                    <span class="input-group-text">
                        <div class="spinner-border spinner-border-sm" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </span>
            </div>
            <span id="errorcorreoElectronico" style="color:red; display:none;">Campo obligatorio</span>
        </div>
        <div class="col-md-4">
            <span style="color:red;">*</span><span>Número de teléfono:</span>
            <input type="number" id="numTelefono" class="form-control validar" value="" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==10) return false;">
            <span id="errornumTelefono" style="color:red; display:none;">Campo obligatorio</span>
            <span id="errornumTelefonoLongitud" style="color:red; display:none;">Longitud no valida</span>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-2 col-lg-3 col-xl-2">
            <a href="#!" id="btnRegresar" class="btn btn-light btn-border btn-block mt-3 mt-md-0 mt-lg-0 mt-xl-0">Regresar</a>
        </div>
        <div class="col-md-2 col-lg-3 col-xl-2">
            <input type="button" class="btn btn-light btn-border btn-block mt-3 mt-md-0 mt-lg-0 mt-xl-0" id="btnGuardar" value="Guardar">
        </div>
    </div>
<br>
</div>