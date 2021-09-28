<style>
	center{ display: none; }	
</style>
<div class="container">
  <div class="row capamenu">
		<?php $roles = array("4", "5", "6", "7", "8");
    if (in_array($this->session->_permiso_rol, $roles)) {
      if(isset($menu)){
        foreach ($menu as $option) {
          if($option->id_menu == 5){
            if(isset($submenu)){
              foreach ($submenu as $option) {?>
                <div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
                  <a id="autorizar" class="btn bg-transparent" href="<?php echo base_url("Permisos/Ctrl_Permisos"); ?>">
                    <img id="autorizar" src="<?php echo base_url('assets/iconos/Autorizar/AutorizarNIV3Recurso21xhdpi.png'); ?>">
                    <span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
                  </a>
									<h5 id="titleautorizar">Autorizar</h5>
									<div id="textDialogautorizar" class="textDialog" hidden>Autorizar</div>
								</div>
								<?php if($this->session->_permiso_rol != 8){ ?>
								  <div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
                    <a id="misPermisos" class="btn bg-transparent" href="<?php echo base_url("Permisos/Ctrl_Permisos/index_autorizadores"); ?>">
                      <img id="misPermisos" src="<?php echo base_url('assets/iconos/Mis_permisos/MispermisosNIV3Recurso20xhdpi.png'); ?>">
                      <span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
                    </a>
										<h5 id="titlemisPermisos">Mis permisos</h5>
										<div id="textDialogmisPermisos" class="textDialog" hidden>Mis permisos</div>
                  </div>
                <?php }if($this->session->_permiso_rol == 5){ ?>
                  <div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
                    <a id="permisosCabotaje" class="btn bg-transparent" href="<?php echo base_url("Permisos/Ctrl_Cabotaje/index"); ?>">
											<img id="permisosCabotaje" src="<?php echo base_url('assets/iconos/Permisos_cabotaje/PermisosdecabotajeNIV3Recurso22xhdpi.png'); ?>">
                      <span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
                    </a>
                    <h5 id="titlepermisosCabotaje">Permisos cabotaje</h5>
                    <div id="textDialogpermisosCabotaje" class="textDialog" hidden>Permisos cabotaje</div>
                  </div>
                <?php }
              }
            }
          }
        }
      }
    }
    $roles = array("11", "12", "13", "14","15","16","20","23","25","26","27","31");
    if (in_array($this->session->_permiso_rol, $roles)) {
			if(isset($menu)){
        foreach ($menu as $option) {
          if($option->id_menu == 4){
            if(isset($submenu)){ ?>
							<?php if (in_array($this->session->_permiso_rol, array("11","12","14","16","20","25","26","27"))){ ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="buques" class="btn bg-transparent" href="#" onclick="muestraMenu('buques')">
										<img id="imgbuques" src="<?php echo base_url('assets/iconos/Buques/OPERACIONES.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlebuques">Gestión de Buques </h5>
									<div id="textDialogbuques" class="textDialog" hidden>Gestión de Buques </div>
								</div>
							<?php } ?>
							<?php if (in_array($this->session->_permiso_rol, array("11","12","13","14","15","23"))){ ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="capi" class="btn bg-transparent" href="#" onclick="muestraMenu('arribos')">
										<img id="buque_img" src="<?php echo base_url('assets/iconos/Buques/Capitania/CAPITANIA.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titleautorizar">Capitanía</h5>
									<div id="textDialogautorizar" class="textDialog" hidden>Capitanía </div>
								</div>
							<?php } ?>
							<?php if (in_array($this->session->_permiso_rol, array("11","13","14"))){ ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="migracion" class="btn bg-transparent" href="#" onclick="muestraMenu('migracion')">
										<img id="imgmigracion" src="<?php echo base_url('assets/iconos/Buques/Migracion/MIGRACION.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlemigracion">Migración</h5>
									<div id="textDialogmigracion" class="textDialog" hidden>Migración </div>
								</div>
							<?php } ?>
							<?php if (in_array($this->session->_permiso_rol, array("11","14","15"))){ ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="sanidad" class="btn bg-transparent" href="#" onclick="muestraMenu('sanidad')">
										<img id="imgsanidad" src="<?php echo base_url('assets/iconos/Buques/SALUD_NACIONAL.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlesanidad">Sanidad Internacional</h5>
									<div id="textDialogsanidad" class="textDialog" hidden>Sanidad Internacional </div>
								</div>
							<?php } ?>
							<?php if (in_array($this->session->_permiso_rol, array("11","12","14","31",))){ ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="sanidad" class="btn bg-transparent" href="#" onclick="muestraMenu('senasica')">
										<img id="imgsanidad" src="<?php echo base_url('assets/iconos/Buques/Senasica/Senasica-NIV2.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlesanidad">SENASICA</h5>
									<div id="textDialogsanidad" class="textDialog" hidden>SENASICA</div>
								</div>
							<?php }
						}
					}
				}
			}
    } ?>
	</div>

	<div id="capa_arribos" class="row submenu hide">
		<?php if(isset($menu)){
			foreach ($menu as $option) {
				if($option->id_menu == 4){
					if(isset($submenu)){
						foreach ($submenu as $option) { ?>
							<?php if($option->id_submenu == 40 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="notificacion_arribo" class="btn bg-transparent" href="<?php echo base_url("Buques/NotificacionArribo/Ctrl_Notificacion_Arribo"); ?>">
										<img id="img_notificacion_arribo" src="<?php echo base_url('assets/iconos/Buques/Capitania/AVISO_DE_ARRIBOS_A_AUTORIDADES.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlenotificacion_arribo">Notificación de Arribo </h5>
									<div id="textDialognotificacion_arribo" class="textDialog" hidden>Notificación de Arribo </div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 43 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="aviso_arribo" class="btn bg-transparent" href="<?php echo base_url("Buques/AvisoArribo/Ctrl_aviso_Arribo"); ?>">
										<img id="img_aviso_arribo" src="<?php echo base_url('assets/iconos/Buques/Aviso_de_arribo_autoridades/AVISO DE ARRIBO A AUTORIDADES.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titleaviso_arribo">Aviso de Arribo a Autoridades </h5>
									<div id="textDialogaviso_arribo" class="textDialog" hidden>Aviso de Arribo a Autoridades </div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 42 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="actualizar_documentos" class="btn bg-transparent" href="<?php echo base_url("Buques/NotificacionArribo/Ctrl_Documentacion"); ?>">
										<img id="img_actualizar_documentos" src="<?php echo base_url('assets/iconos/Buques/Actualizacion_documentos/ACTUALIZACIONDEDOCUMENTOSDEARRIBOS.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titleactualizar_documentos">Actualización de Documentos</h5>
									<div id="textDialogactualizar_documentos" class="textDialog" hidden>Actualización de Documentos</div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 71 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="unir_documentos" class="btn bg-transparent" href="<?php echo base_url("UnionDocumentos"); ?>">
										<img id="img_unir_documentos" src="<?php echo base_url('assets/iconos/Buques/Capitania/ACTUALIZACION_DE_DOCUMENTOS_DE_ARRIBO.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titleunir_documentos">Unir Documentos</h5>
									<div id="textDialogunir_documentos" class="textDialog" hidden>Unir Documentos</div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 41 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="autorizacion_arribo" class="btn bg-transparent" href="<?php echo base_url("Buques/Ctrl_AutorizacionArribo"); ?>">
										<img id="img_autorizacion_arribo" src="<?php echo base_url('assets/iconos/Buques/Capitania/ARRIBOS.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titleautorizacion_arribo">Solicitud Autorización de Arribo </h5>
									<div id="textDialogautorizaicon_arribo" class="textDialog" hidden>Solicitud Autorización de Arribo</div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 48 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="autorizacion_fondeo" class="btn bg-transparent" href="<?php echo base_url("Buques/Ctrl_AutorizacionFondeo") ;?>">
										<img id="imgautorizacion_fondeo" src="<?php echo base_url('assets/iconos/Buques/FondeoNIV2xhdpi.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span> 
									</a>
									<h5 id="titleautorizacion_fondeo">Solicitud Autorización de Fondeo</h5>  
									<div id="textDialogautorizacion_fondeo" class="textDialog" hidden>Solicitud Autorización de Fondeo </div>
								</div>
							<?php } ?>  
							<?php if($option->id_submenu == 57 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="autorizacion_enmienda" class="btn bg-transparent" href="<?php echo base_url("Buques/Ctrl_AutorizacionEnmienda") ;?>">
										<img id="img_autorizacion_emienda" src="<?php echo base_url('assets/iconos/Buques/EnmiendaNIV2-xhdpi.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titleautorizar">Solicitud Autorización de Enmienda</h5>
									<div id="textDialogautorizar" class="textDialog" hidden> Solicitud Autorización de Enmienda </div>
								</div>
							<?php } ?>								
							<?php if($option->id_submenu == 58 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="autorizacion_despacho" class="btn bg-transparent" href="<?php echo base_url("Buques/Ctrl_AutorizacionDespacho") ;?>">
										<img id="img_autorizacion_despacho" src="<?php echo base_url('assets/iconos/Buques/Capitania/Despacho_NIV2.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titleautorizacion_despacho">Solicitud Autorización de Despacho</h5>
									<div id="textDialogautorizacion_despacho" class="textDialog" hidden>Solicitud Autorización de Despacho </div>
								</div>
							<?php } ?> 
							<!--------------------------------------lo de abajo no se sabe si corresponde al menú------------------------------------------>
							<!--?php if($option->id_submenu == 45 ) { ?> 
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="planeacion_buques" class="btn bg-transparent" href="< ?php echo base_url("Buques/PlaneacionBuques/Ctrl_PlaneacionBuques"); ?>">
										<img id="img_planeacion_buques" src="< ?php echo base_url('assets/iconos/Buques/FondeoNIV2xhdpi.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titleautorizar">Planeación de Operación de Buque</h5>
									<div id="textDialogautorizar" class="textDialog" hidden>Planeación de Operación de Buque </div>
								</div>
							< ?php } -->
						<?php }
					}
				}
			}
		}?>
		<div class="col-xs-12 mt-5">
			<button class="btn btn-default" onclick="regresarMenu('arribos')">Regresar</button>
		</div>
	</div>

	<div id="capa_migracion" class="row submenu hide">
		<?php if(isset($menu)){
      foreach ($menu as $option) {		
        if($option->id_menu == 4){
          if(isset($submenu)){
            foreach ($submenu as $option) { ?>
							<?php if($option->id_submenu == 61 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="solicitud_internacion" class="btn bg-transparent" href="<?php echo base_url("Buques/EnvioListasTP/Ctrl_Envio_Listas_TP/registrar_tripulantes_arribo/"); ?>">
										<img id="img_solicitud_internacion" src="<?php echo base_url('assets/iconos/Buques/Migracion/ENVIO_DE_LISTAS_DE_TRIPULANTES_AL_ZARPE.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlesolicitud_internacion">Envío de Tripulantes al Arribo</h5>
									<div id="textDialogautorizar" class="textDialog" hidden>Envio de Tripulantes al Arribo</div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 62 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="solicitud_internacion" class="btn bg-transparent" href="<?php echo base_url("Buques/EnvioListasTP/Ctrl_Envio_Listas_TP/registrar_pasajeros_arribo"); ?>">
										<img id="img_solicitud_internacion" src="<?php echo base_url('assets/iconos/Buques/Migracion/ENVIO_DE_LISTAS_DE_PASAJEROS_AL_ZARPE.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlesolicitud_internacion">Envío de Pasajeros al Arribo</h5>
									<div id="textDialogautorizar" class="textDialog" hidden>Envio de Pasajeros al Arribo </div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 52 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="solicitud_internacion" class="btn bg-transparent" href="<?php echo base_url("Buques/SolicitudesInternacion/Ctrl_Solicitud_Internacion/"); ?>">
										<img id="img_solicitud_internacion" src="<?php echo base_url('assets/iconos/Buques/Migracion/SOLICITUD_DE_INTERNACION_COMO_VISITANTE.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlesolicitud_internacion">Solicitud de internación como visitante sin permiso para realizar actividades remuneradas</h5>
									<div id="textDialogautorizar" class="textDialog" hidden>Solicitud de internación como visitante sin permiso para realizar actividades remuneradas  </div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 53 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="autorizar" class="btn bg-transparent" href="<?php echo base_url("Buques/SolicitudesInternacion/Ctrl_Solicitud_Internacion/administrar_solicitudes_autorizar"); ?>">
										<img id="autorizar" src="<?php echo base_url('assets/iconos/Buques/Migracion/SOLICITUD_DE_INTERNACION_COMO_VISITANTE.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titleautorizar">Solicitud de internación como visitante sin permiso para realizar actividades remuneradas por Autorizar</h5>
									<div id="textDialogautorizar" class="textDialog" hidden>Solicitud de internación como visitante sin permiso para realizar actividades remuneradas por Autorizar </div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 67 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="solicitud_autorizacion_desembarque" class="btn bg-transparent" href="<?php echo base_url("Buques/SolicitudesDesembarque/Ctrl_Solicitud_Desembarque"); ?>">
										<img id="img_solicitud_autorizacion_desembarque" src="<?php echo base_url('assets/iconos/Buques/Migracion/SOLICITUD_DE_AUTORIZACION_DE_EMBARQUE.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlesolicitud_autorizacion_desembarque">Solicitud de Autorización de Desembarque </h5>
									<div id="textDialogsolicitud_autorizacion_desembarque" class="textDialog" hidden>Solicitud de Autorización de Desembarque </div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 50 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="solicitud_autorizacion_desembarque" class="btn bg-transparent" href="<?php echo base_url("Buques/SolicitudesDesembarque/Ctrl_Solicitud_Desembarque/administrar_solicitudes_autorizar"); ?>">
										<img id="img_solicitud_autorizacion_desembarque" src="<?php echo base_url('assets/iconos/Buques/Migracion/SOLICITUD_DE_AUTORIZACION_DE_EMBARQUE.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlesolicitud_autorizacion_desembarque">Autorización de Desembarque </h5>
									<div id="textDialogsolicitud_autorizacion_desembarque" class="textDialog" hidden>Autorización de Desembarque </div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 66 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="solicitud_internacion" class="btn bg-transparent" href="<?php echo base_url("Buques/SolicitudesEmbarque/Ctrl_Solicitud_Embarque"); ?>">
										<img id="img_solicitud_internacion" src="<?php echo base_url('assets/iconos/Buques/Migracion/SOLICITUD_DE_AUTORIZACION_DE_DESEMBARQUE.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlesolicitud_internacion">Solicitud de Autorización de Embarque</h5>
									<div id="textDialogautorizar" class="textDialog" hidden>Solicitud de Autorización de Embarque</div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 63 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="solicitud_internacion" class="btn bg-transparent" href="<?php echo base_url("Buques/SolicitudesEmbarque/Ctrl_Solicitud_Embarque/administrar_solicitudes_autorizar"); ?>">
										<img id="img_solicitud_internacion" src="<?php echo base_url('assets/iconos/Buques/Migracion/SOLICITUD_DE_AUTORIZACION_DE_DESEMBARQUE.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlesolicitud_internacion">Autorización de Embarque</h5>
									<div id="textDialogautorizar" class="textDialog" hidden>Autorización de Embarque</div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 68 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="acta_arribo_migracion" class="btn bg-transparent" href="<?php echo base_url("Buques/ActaArriboMigracion/Ctrl_ActaArriboMigracion"); ?>">
										<img id="img_acta_arribo_migracion" src="<?php echo base_url('assets/iconos/Buques/Migracion/Acta_de_arribo_NIV3.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titleacta_arribo_migracion">Acta de arribo migración</h5>
									<div id="textDialogacta_arribo_migracion" class="textDialog" hidden>Acta de arribo migración</div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 69 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="solicitud_internacion" class="btn bg-transparent" href="<?php echo base_url("Buques/EnvioListasTP/Ctrl_Envio_Listas_TP/registrar_tripulantes_zarpe/"); ?>">										
										<img id="img_solicitud_internacion" src="<?php echo base_url('assets/iconos/Buques/Migracion/ENVIO_DE_LISTAS_DE_TRIPULANTES_AL_ARRIBO.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlesolicitud_internacion">Envío de Tripulantes al Zarpe</h5>
									<div id="textDialogautorizar" class="textDialog" hidden>Envio de Tripulantes al Zarpe</div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 70 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="solicitud_internacion" class="btn bg-transparent" href="<?php echo base_url("Buques/EnvioListasTP/Ctrl_Envio_Listas_TP/registrar_pasajeros_zarpe"); ?>">
										<img id="img_solicitud_internacion" src="<?php echo base_url('assets/iconos/Buques/Migracion/ENVIO_DE_LISTAS_DE_PASAJEROS_AL_ARRIBO.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlesolicitud_internacion">Envío de Pasajeros al Zarpe</h5>
									<div id="textDialogautorizar" class="textDialog" hidden>Envio de Pasajeros al Zarpe </div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 65 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="solicitud_internacion" class="btn bg-transparent" href="<?php echo base_url("Buques/Ctrl_AvisoSalidaMigracion/"); ?>">
										<img id="img_solicitud_internacion" src="<?php echo base_url('assets/iconos/Buques/Migracion/AVISO_DE_SALIDA_DE_MIGRACION.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlesolicitud_internacion">Aviso de Salida a Migración</h5>
									<div id="textDialogautorizar" class="textDialog" hidden>Aviso de Salida a Migración</div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 74 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="acta_salida_migracion" class="btn bg-transparent" href="<?php echo base_url("Buques/ActaSalidaMigracion/Ctrl_ActaSalidaMigracion"); ?>">
										<img id="img_acta_salida_migracion" src="<?php echo base_url('assets/iconos/Buques/Migracion/Acta_de_salida_NIV3.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top : 46px; left: 1px;"></span>
									</a>
									<h5 id="titleacta_salida_migracion">Acta de salida migración</h5>
									<div id="textDialogacta_salida_migracion" class="textDialog" hidden>Acta de salida migración</div>
								</div>
							<?php } ?>
							
							<?php if($option->id_submenu == 76 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="solicitud_despacho_migracion" class="btn bg-transparent" href="<?php echo base_url("Buques/SolicitudDespachoMigracion/Ctrl_Solicitud_Despacho_Migracion"); ?>">
										<img id="img_acta_salida_migracion" src="<?php echo base_url('assets/iconos/Buques/Migracion/Acta_de_salida_NIV3.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top : 46px; left: 1px;"></span>
									</a>
									<h5 id="titleacta_salida_migracion">Solicitud de Despacho a Migración</h5>
									<div id="textDialogacta_salida_migracion" class="textDialog" hidden>Solicitud de Despacho a Migración<</div>
								</div>
							<?php } ?>
							
							<!--?php if($option->id_submenu == 64 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="aviso_salida" class="btn bg-transparent" href="< ?php echo base_url("Buques/AvisoSalida/Ctrl_AvisoSalida"); ?>">
										<img id="img_aviso_salida" src="< ?php echo base_url('assets/iconos/Buques/Migracion/MIGRACION.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlesolicitud_internacion">Aviso de Salida</h5>
									<div id="textDialogautorizar" class="textDialog" hidden>Aviso de Salida</div>
								</div>
							< ?php } ?-->
							<!--Aquí debería ir ACTA DE SALIDA DE MIGRACIÓN-->
							<!--De aqui hacia abajo no se sabe si pertenece al menú-->
							<!--
							< ?php if($option->id_submenu == 51 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="autorizar" class="btn bg-transparent" href="< ?php echo base_url("Buques/SolicitudesDesembarque/Ctrl_Solicitud_Desembarque/administrar_solicitudes_autorizar"); ?>">
										<img id="autorizar" src="< ?php echo base_url('assets/iconos/Buques/Buques/Buques NIV1-xhdpi.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titleautorizar">Autorización de Desembarque por Autorizar </h5>
									<div id="textDialogautorizar" class="textDialog" hidden>Autorización de Desembarque por Autorizar </div>
								</div>
							< ?php } ?>
							
						-->
				<?php	} 
					}
				}
			}
		}?>
		<div class="col-xs-12 mt-5">
			<button class="btn btn-default" onclick="regresarMenu('migracion')">Regresar</button>
		</div>
	</div>

	<div id="capa_buques" class="row submenu hide">
		<?php if(isset($menu)){
			foreach ($menu as $option) {
				if($option->id_menu == 4){
					if(isset($submenu)){
						foreach ($submenu as $key => $option) {?>
							<?php if($option->id_submenu == 17 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="registro_buque" class="btn bg-transparent" href="<?php echo base_url("Buques/Ctrl_Buques"); ?>">
										<img id="imgregistro_buque" src="<?php echo base_url('assets/iconos/Buques/AltadebuqueNIV2-xhdpi.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titleregistro_buque">Registro de Buque</h5>
									<div id="textDialogregistro_buque" class="textDialog" hidden>Registro de Buque</div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 45 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="planeacion_operacion_buque" class="btn bg-transparent" href="<?php echo base_url("Buques/PlaneacionBuques/Ctrl_PlaneacionBuques") ;?>">
										<img id="imgplaneacion_operacion_buque" src="<?php echo base_url('assets/iconos/Buques/PlaneaciondeoperaciondebuqueNIV2-_1xhdpi.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titleplaneacion_operacion_buque">Planeación de Operación de Buque</h5>
									<div id="textDialogplaneacion_operacion_buque" class="textDialog" hidden>Planeación de Operación de Buque </div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 46 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="marco_operativo" class="btn bg-transparent" href="<?php echo base_url("Buques/MarcoOperativo/Ctrl_MarcoOperativo/") ;?>">
										<img id="imgmarco_operativo" src="<?php echo base_url('assets/iconos/Buques/MarcoOperativoNIV2-_1xhdpi.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlemarco_operativo">Confirmación de Marco Operativo</h5>
									<div id="textDialogmarco_operativo" class="textDialog" hidden>Confirmación de Marco Operativo  </div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 47 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="junta_programcion" class="btn bg-transparent" href="<?php echo base_url("Buques/Ctrl_ProgramacionBuque") ;?>">
										<img id="imgjunta_programcion" src="<?php echo base_url('assets/iconos/Buques/JuntadeprogramacionNIV2-xhdpi.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlejunta_programcion">Junta de Programación</h5>
									<div id="textDialogjunta_programcion" class="textDialog" hidden>Junta de Programación </div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 0 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="movimientos_internos_buques_abastecedores" class="btn bg-transparent" href="<?php echo base_url("Buques/Ctrl_MovimientosInternosBuquesAbastecedores") ;?>">
										<img id="imgmovimientos_internos_buques_abastecedores" src="<?php echo base_url('assets/iconos/Buques/PlaneaciondeoperaciondebuqueNIV2-_1xhdpi.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlemovimientos_internos_buques_abastecedores">Movimientos Internos de Buques Abastecedores</h5>
									<div id="textDialogmovimientos_internos_buques_abastecedores" class="textDialog" hidden>Movimientos Internos de Buques Abastecedores</div>
								</div>
							<?php } ?>
							<!--?php if($option->id_submenu == 50 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="solictud_servicios" class="btn bg-transparent" href="#" onclick="muestraMenu('servicios')">
										<img id="imgsolictud_servicios" src="< ?php echo base_url('assets/iconos/Buques/SolicituddeserviciosNIV2-xhdpi.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlesolictud_servicios">Solicitud de servicios </h5>
									<div id="textDialogsolictud_servicios" class="textDialog" hidden>Solicitud de servicios  </div>
								</div>
							< ?php } ?-->
							<?php if($option->id_submenu == 59 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="arribos_zarpes" class="btn bg-transparent" href="<?php echo base_url("ArrivosZarpes/Ctrl_ArrivosZarpes"); ?>">
										<img id="imgarribos_zarpes" src="<?php echo base_url('assets/iconos/Buques/Arribos_zarpes/ARRIBOSYZARPES.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titleaarribos_zarpes">Arribos y Zarpes</h5>
									<div id="textDialogarribos_zarpes" class="textDialog" hidden>Arribos y Zarpes</div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 73 ) {?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="servicios_portuarios" class="btn bg-transparent" href="<?php echo base_url("Buques/Ctrl_ServiciosPortuarios"); ?>">
										<img id="imgservicios_portuarios" src="<?php echo base_url('assets/iconos/Buques/Servicios_Portuarios/Solicitud_de_servicios_NIV2.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titleaarribos_zarpes">Solicitud de Servicios Portuarios</h5>
									<div id="textDialogarribos_zarpes" class="textDialog" hidden>Solicitud de Servicios Portuarios</div>
								</div>
							<?php } ?>

							<?php if($option->id_submenu == 75 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="informeEmbarque" class="btn bg-transparent" href="<?php echo base_url("Buques/InformacionEmbarqueAutoridades/Ctrl_InformacionEmbarqueAutoridades"); ?>">
										<img id="informeEmbarqueImg" src="<?php echo base_url('assets/iconos/Buques/Captura_informacion/Embarque_autoridades/CapturadeInformacióndeEmbarquedeAutoridades-NIV3.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titleinformeEmbarque">Captura de Información de Embarque de Autoridades </h5>
									<div id="textDialoginformeEmbaque" class="textDialog" hidden>Captura de Información de Embarque de Autoridades </div>
								</div>
							<?php } ?>

							<?php if($option->id_submenu == 0 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="capturaInformacionArrastres" class="btn bg-transparent" href="<?php echo base_url("Buques/Ctrl_Arrastres"); ?>">
										<img id="capturaInformacionArrastresImg" src="<?php echo base_url('assets/iconos/Buques/Captura_informacion/Arrastres/CapturadeInformacióndeArrastres-NIV3.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titleCapturaInformacionArrastres">Captura  de Información de Arrastres </h5>
									<div id="textCapturaInformacionArrastres" class="textDialog" hidden>Captura de Información de Arrastres </div>
								</div>
							<?php } ?>

							<?php if($option->id_submenu == 60 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="capturaInformacionOperacion" class="btn bg-transparent" href="<?php echo base_url("Buques/Operaciones/Ctrl_Operaciones/Registrar"); ?>">
										<img id="capturaInformacionOperacionImg" src="<?php echo base_url('assets/iconos/Buques/Captura_informacion/Operaciones/CapturadeInformacióndeOperaciones-NIV3.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlecapturaInformacionOperacion">Captura de Información de Operaciones</h5>
									<div id="textDialogcapturaInformacionOperacion" class="textDialog" hidden>Captura de Información de Operaciones</div>
								</div>
							<?php } ?>

							<!--------------------------------------lo de abajo no se sabe si corresponde al menú------------------------------------------>
							<!--?php if($option->id_submenu == 38 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="validar_buques" class="btn bg-transparent" href="< ?php echo base_url("Buques/Ctrl_Buques/validar"); ?>">
										<img id="imgvalidar_buques" src="< ?php echo base_url('assets/iconos/Buques/Alta_buques/AltadebuqueNIV2-xhdpi.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlevalidar_buques">Validar Buques</h5>
									<div id="textDialogvalidar_buques" class="textDialog" hidden>Validar Buques </div>
									
								</div>
							< ?php } ?--> 
							<!--?php if($option->id_submenu == 17 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="autorizar" class="btn bg-transparent" href="#" onclick="muestraMenu('arribos')">
										<img id="autorizar" src="< ?php echo base_url('assets/iconos/Buques/ArribosNIV2-xhdpi.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titleautorizar">Arribos</h5>
									<div id="textDialogautorizar" class="textDialog" hidden>Arribos </div>
								</div>
							< ?php } ? -->
						<?php }
					}
				}
			}
		} ?>
		<div class="col-xs-12 mt-5">
			<button class="btn btn-default" onclick="regresarMenu('buques')">Regresar</button>
		</div>
	</div>

	<div id="capa_sanidad" class="row submenu hide">
		<?php if(isset($menu)){
			foreach ($menu as $option) {
				if($option->id_menu == 4){
					if(isset($submenu)){
						foreach ($submenu as $key => $option) {?>
							<?php if($option->id_submenu == 44 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="autorizar_libre_platica" class="btn bg-transparent" href="<?php echo base_url("Buques/SolicitudesLibrePlatica/Ctrl_Solicitud_Libre_Platica/"); ?>">
										<img id="img_autorizar_libre_platica" src="<?php echo base_url('assets/iconos/Buques/Sanidad/Solicitud_de_libre_plática_NIV3.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titleautorizar_libre_platica">Solicitud de Autorización de Libre Plática </h5>
									<div id="textDialogautorizar_libre_platica" class="textDialog" hidden>Solicitud de Autorización de Libre Plática </div>
								</div>
							<?php } ?>
							<?php if($option->id_submenu == 49 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="solicitud_libre_platica" class="btn bg-transparent" href="<?php echo base_url("Buques/SolicitudesLibrePlatica/Ctrl_Solicitud_Libre_Platica/administrar_solicitudes_autorizar"); ?>">
										<img id="img_solicitu_libre_platica" src="<?php echo base_url('assets/iconos/Buques/Sanidad/Solicitud_de_libre_plática_NIV3.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titlesolicitu_libre_platica"> Autorización de Libre Plática </h5>
									<div id="textDialogsolicitud_libre_platica" class="textDialog" hidden> Autorización de Libre Plática </div>
								</div>
							<?php } ?>
							
				<?php 	}
					}
				}
			}
		} ?>
		<div class="col-xs-12 mt-5">
			<button class="btn btn-default" onclick="regresarMenu('sanidad')">Regresar</button>
		</div>
	</div>

	<div id="capa_senasica" class="row submenu hide">
		<?php if(isset($menu)){
			foreach ($menu as $option) {
				if($option->id_menu == 4){
					if(isset($submenu)){
						foreach ($submenu as $key => $option) {?>
							<?php if($option->id_submenu == 56 ) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="autorizar" class="btn bg-transparent" href="<?php echo base_url("Buques/SupervisionDescargaBasura/Ctrl_Supervision_Descarga_Basura"); ?>">
										<img id="autorizar" src="<?php echo base_url('assets/iconos/Buques/Buques/Solicitud_de_Supervisión_de_Descarga_de_BasuraNIV3.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titleautorizar">Supervisión de Descarga de Basura </h5>
									<div id="textDialogautorizar" class="textDialog" hidden>Supervision de Descarga de Basura </div>
								</div>
							<?php } ?>
							
				<?php 	}
					}
				}
			}
		} ?>
		<div class="col-xs-12 mt-5">
			<button class="btn btn-default" onclick="regresarMenu('sanidad')">Regresar</button>
		</div>
	</div>
</div>
<script>
	function muestraMenu(capa){
		$(".capamenu").addClass("hide");
		$(".submenu").addClass("hide");
		$("#capa_"+capa).removeClass("hide");
	}
	function regresarMenu(capa){
		$(".capamenu").removeClass("hide");
		$(".submenu").addClass("hide");
	}
</script>
