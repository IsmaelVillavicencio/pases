<style type="text/css">
    #modal_programar_visita textarea {
        resize: none;
    }
</style>
<div class="modal fade" id="modal_programar_visita" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Programar Visita</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="mensaje_confirmar_baja">
                <form id="formProgramar">
                    <div class="form-group">
                        <label>Fecha y hora:</label>
                        <input type='datetime-local' id="FechaProgramacion" name="FechaProgramacion" class="form-control req"  style="" placeholder="__/__/____ __:__" value="">                        
                        <span id="errorFechaProgramacion" class="error"></span>
                    </div>
                    <div class="form-group">
                        <label>Observaciones:</label>
                        <textarea name="ObservacionesProgramacion" id="ObservacionesProgramacion" class="form-control" style="width: 100%;height:150px"></textarea>                        
                    </div>
                </form>    
            </div>
            <div class="modal-footer">
                <button id="btnConfirmaProgramar" type="button" class="btn btn-primary ml-4">Programar Visita</button>
                <button id="close" type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $(document).ready(function(){        
    })
</script>