<style>
	center {
		display: none;
	}
</style>
<div class="container">
	<div class="row capamenu">
		<?php $roles = array("4", "5", "6", "7", "8");
		if (in_array($this->session->_permiso_rol, $roles)) {
			if (isset($menu)) {
				foreach ($menu as $option) {
					if ($option->id_menu == 5) {
						if (isset($submenu)) {
							foreach ($submenu as $option) { ?>
								<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
									<a id="autorizar" class="btn bg-transparent" href="<?php echo base_url("Permisos/Ctrl_Permisos"); ?>">
										<img id="autorizar" src="<?php echo base_url('/assets/iconos/AutorizarNIV3/AutorizarNIV3Recurso21xhdpi.png'); ?>">
										<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
									</a>
									<h5 id="titleautorizar">Autorizar</h5>
									<div id="textDialogautorizar" class="textDialog" hidden>Autorizar</div>
								</div>
								<?php if ($this->session->_permiso_rol != 8) { ?>
									<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
										<a id="misPermisos" class="btn bg-transparent" href="<?php echo base_url("Permisos/Ctrl_Permisos/index_autorizadores"); ?>">
											<img id="misPermisos" src="<?php echo base_url('/assets/iconos/MispermisosNIV3/MispermisosNIV3Recurso20xhdpi.png'); ?>">
											<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
										</a>
										<h5 id="titlemisPermisos">Mis permisos</h5>
										<div id="textDialogmisPermisos" class="textDialog" hidden>Mis permisos</div>
									</div>
								<?php }
								if ($this->session->_permiso_rol == 5) { ?>
									<div class="col-md-3 col-sm-4 col-xs-6 text-center mt-5">
										<a id="permisosCabotaje" class="btn bg-transparent" href="<?php echo base_url("Permisos/Ctrl_Cabotaje/index"); ?>">
											<img id="permisosCabotaje" src="<?php echo base_url('assets/iconos/Permisos_cabotaje/PermisosdecabotajeNIV3Recurso22xhdpi.png'); ?>">
											<span class="p-ink" style="height: 228px; width: 228px; top: 46px; left: 1px;"></span>
										</a>
										<h5 id="titlepermisosCabotaje">Permisos cabotaje</h5>
										<div id="textDialogpermisosCabotaje" class="textDialog" hidden>Permisos cabotaje</div>
									</div>
								<?php
								}
							}
						}
					}
				}
			}
		}
		?>
	</div>
	<script>
		function muestraMenu(capa) {
			$(".capamenu").addClass("hide");
			$(".submenu").addClass("hide");
			$("#capa_" + capa).removeClass("hide");
		}

		function regresarMenu(capa) {
			$(".capamenu").removeClass("hide");
			$(".submenu").addClass("hide");
		}
	</script>