<div class="container">
    <div class="row">
        <div class="col-xs-12"><br><h3>Modificar usuario</h3></div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Personal API:
            <input type="text" id="personalAP" class="lectura" disabled value="">
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Nombre:
            <input type="text" class="lectura" id="nombre" disabled value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Primer apellido:
            <input type="text" class="lectura" id="primerApellido" disabled value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Segundo apellido:
            <input type="text" class="lectura" id="segundoApellido" disabled value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Puesto:
            <input type="text" class="lectura" id="puesto" disabled value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Área:
            <input type="text" class="lectura" id="area" disabled value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Correo electrónico:
            <input type="text" class="lectura" id="correoElectronico" disabled value="">
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Perfil:
            <select id="selPerfil" class="form-control"></select>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Módulos:
            <select id="selModulos" class="form-control"></select>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 mt-md-5">
            <br>Seleccionar todos los módulos:
            <input type="checkbox" id="todosModulos" value="">
        </div>
    </div>
    <br><br>
    <div class="row">
        <div class="col-md-12">
            <span id="errorPermisos"style="color:red; display:none;">Es necesario agregar al menos un permiso para registrar el usuario</span>
        </div>
        <div class="col-md-12 table-responsive">
            <table class="table table-striped table-bordered" id="tabpermisos">
                <thead>
                    <tr>
                        <th>Menú</th>
                        <th>Submenú</th>
                        <th>Consultar</th>
                        <th>Modificar</th>
                        <th>Registrar</th>
                        <th>Dar de baja</th>
                        <th>Reactivar</th>
                        <th>Todas</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="col-xs-12">
            <br>
            <input type="button" class="btn btn-default" id="regresar" value="Regresar">
            <input type="button" class="btn btn-primary" id="guardar" value="Guardar">
        </div>
    </div>
</div>