<div class="container">
    <div class="row">
        <div class="col-xs-12"><br><h3>Modificar perfil</h3></div>
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>
            <span class="required">*</span> Nombre del perfil:
            <input type="text" class="form-control" id="nombre" value="">
            <span id="errorNombre"style="color:red; display:none;">Campo obligatorio</span>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-4">
            <br>Módulos:
            <select id="selModulos" class="form-control">
                <option value="">Seleccione</option>
            </select>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 mt-md-5">
            <br>Seleccionar todos los módulos
            <input type="checkbox" id="todosModulos"/>
        </div>
    </div>
    <br><br>
    <div class="row">
        <div class="col-xs-12">
            <span id="errorPermisos"style="color:red; display:none;">Es necesario agregar al menos una permiso para registrar el perfil</span>
        </div>
        <div class="col-xs-12 mt-3 table-responsive">
            <table class="table table-striped table-bordered" id="tabpermisos">
                <thead>
                    <tr>
                        <th>Menú</th>
                        <th>Submenú</th>
                        <th>Registrar</th>
                        <th>Consultar</th>
                        <th>Modificar</th>
                        <th>Dar de baja</th>
                        <th>Reactivar</th>
                        <th>Todas</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-xs-12">
            <input type="button" class="btn btn-default" id="btnRegresar" value="Regresar">
            <input type="button" class="btn btn-primary" id="btnGuardar" value="Guardar">
        </div>
    </div>
</div>