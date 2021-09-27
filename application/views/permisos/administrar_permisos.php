<div class="container">
    <div class="row">
        <div class="col-md-12"><h3>Historial de permisos de acceso</h3></div>
    </div>
    <br>
    <div class="row" style="display:none;">
        <div class="col-xs-12"><a href="#!"><input type="button" class="btn btn-default" id="filtrar" value="Filtrar"></a></div>
    </div>
    <div class="row filtro mt-4" style="display:none;">
        <div class="col-xs-12 col-md-4 col-sm-6">Periodo</div>
    </div>
    <div class="row filtro mt-4" style="display:none;">
        <div class="col-xs-12 col-md-3 col-sm-6">
            Fecha inicio:
            <input type="date" id="fechaInicio" class="form-control" value="">  
        </div>
        <div class="col-xs-12 col-md-3 col-sm-6">
            Fecha fin:
            <input type="date" id="fechaFin" class="form-control" value="">
        </div>
        <div class="col-xs-12 col-md-3 col-sm-6">
            Tipo de permiso:
            <select id="tipoPermiso" class="form-control"></select>  
        </div>
        <div class="col-xs-12 col-md-3 col-sm-6">
            Estatus:
            <select id="estatusPermiso" class="form-control"></select>
        </div>
    </div>
    <div class="row filtro mt-4" style="display:none;">
        <div class="col-xs-12 col-md-3 col-sm-6">
            Nombre:
            <!--select id="nombre" class="form-control"></select-->
            <input type="text" id="nombre" class="form-control" value="">
        </div>
        <div class="col-xs-12 col-md-5 col-sm-6">
            Empresa:
            <?php if ($permisos['id_area'] == 8) { ?>
            <input type="text" id="empresa" class="lectura" disabled>
            <?php }else{ ?>
            <select class="form-control" id="selEmpresa">
            </select>
            <?php } ?>
        </div>
        <div class="col-xs-12 col-md-2 col-sm-3">
        <br>
            <a href="#!"><input type="button" class="btn btn-default" id="limpiarFiltro" value="Limpiar filtro"></a>
        </div>
        <div class="col-xs-12 col-md-2 col-sm-3">
        <br>
            <a href="#!"><input type="button" class="btn btn-default" id="buscar" value="Buscar"></a>
        </div>
    </div>
    <div class="row mt-4">
        <div class="col-xs-12">
            <span id="errortabHistorial" class="error"></span>
        </div>
    </div>
    <div class="row mt-4">
        <div class="col-md-12 table-responsive">
            <table id="tabHistorial" class="table table-striped table-bordered" style="width:100%">
                <thead class="Tabla">
                    <tr>
                        <th width=15%>Número de solicitud</th>
                        <th width=30%>Entidad</th>
                        <th width=15%>Tipo de permiso</th>
                        <th width=15%>Permiso</th>
                        <th width=15%>Estatus</th>
                        <?php //if ($permisos['U'] || $permisos['D']) { ?>
                        <th width=10%>Acciones</th>
                        <?php //} ?>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</div>