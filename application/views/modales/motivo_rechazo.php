<style type="text/css">
    #modal_motivo_rechazo textarea {
        resize: none;
    }
</style>
<div class="modal fade" id="modal_motivo_rechazo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Mensaje del sistema</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="mensaje_confirmar_baja">
                <form id="formRechazo">
                    <label>Motivo del rechazo:</label>
                    <textarea name="MotivoRechazo" id="MotivoRechazo" class="form-control req" style="width: 100%;height:150px;text-align: justify;"></textarea>
                    <span id="errorMotivoRechazo" class="error"></span>
                </form>    
            </div>
            <div class="modal-footer">
                <button id="btnConfirmaRechazar" type="button" class="btn btn-primary ml-4">Rechazar</button>
                <button id="close" type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>