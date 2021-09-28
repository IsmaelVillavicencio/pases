<!-- Moment -->
<script  type="text/javascript" src="<?php echo base_url('assets/librerias/moment-with-locales_2.14.1.js'); ?>"></script>
<script> moment.locale("es"); </script>

<!-- DatePicker-->
<link type="text/css" href="<?php echo base_url('assets/librerias/datepicker/css/bootstrap-datepicker.css'); ?>" rel="stylesheet"/>
<script  type="text/javascript" src="<?php echo base_url('assets/librerias/datepicker/bootstrap-datepicker.min.js'); ?>"></script>
<script  type="text/javascript" src="<?php echo base_url('assets/librerias/datepicker/locales/bootstrap-datepicker.es.min.js'); ?>"></script>

<link type="text/css" href="<?php echo base_url('assets/librerias/datetimepicker/bootstrap-datetimepicker.css'); ?>" rel="stylesheet"/>
<script  type="text/javascript" src="<?php echo base_url('assets/librerias/datetimepicker/bootstrap-datetimepicker.min.js'); ?>"></script>

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
                        <div class='input-group date' id='datetimepicker' style="width: 100%;">
                            <input type='text' id="FechaProgramacion" name="FechaProgramacion" class="form-control req"  style="" placeholder="__/__/____ __:__" value="">
                            <span class="input-group-addon RightRound">
                                <span class="fa fa-calendar"></span>
                            </span>
                        </div>
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
        $('#datetimepicker').datetimepicker({
			format: 'DD/MM/YYYY HH:mm',			
			sideBySide: true
		});
    })
</script>