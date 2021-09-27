<div class="modal fade" id="modal_confirmar_baja_motivo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Mensaje del sistema</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="mensaje_confirmar_baja_motivo">
                <div class="row" id="textoModal">
                    Motivo por el que desea eliminar el permiso.
                </div>
                <br>
                <div class="row">
                    <textarea name="motivo_baja" id="observacionMotivo" style="width: 100%; resize: none;" rows="5"></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button id="confirmar_baja" type="button" class="btn btn-primary ml-4">Aceptar</button>
                <button id="close" type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>