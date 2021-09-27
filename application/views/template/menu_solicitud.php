<!--========== NAV ==========-->
<div class="navAPI" id="navbarAPI">
	<nav class="nav__container">
		<div>
			<a href="<?php echo base_url(); ?>" class="nav__link nav__logo">
				<i class='bx bxs-disc nav__icon'></i>
				<span class="nav__logo-name">API MANZANILLO</span>
			</a>
			<div class="nav__list">
				<div class="nav__items">
	
					<a href="<?php echo base_url(); ?>Solicitudes/Ctrl_Solicitudes/index" id="indexSol" class="nav__link">
						<span class="icon-home nav__icon" aria-hidden="true"></span>
						<span class="nav__name">Inicio</span>
					</a>

					<a href="<?php echo ($this->session->_aviso_privacidad == 0 || !in_array($this->session->_estatus,[1,3,4,6,7])) ? '#!' : base_url('Solicitudes/Ctrl_Solicitudes/requisitos');?>" <?php if($this->session->_aviso_privacidad == 0){echo 'data-toggle="modal" data-target="#modal_aviso_privacidad"';}elseif(!in_array($this->session->_estatus,[1,3,4,6,7])){ echo 'data-toggle="modal" data-target="#modal_solicitud_enviada"';}?> id="requisitosSol" class="nav__link">
						<span class="glyphicon glyphicon-list-alt nav__icon" aria-hidden="true"></span>
						<span class="nav__name">Requisitos</span>
					</a>

					<a href="<?php echo ($this->session->_aviso_privacidad == 0 || !in_array($this->session->_estatus,[1,3,4,6,7])) ? '#!' : base_url('Solicitudes/Ctrl_Solicitudes/datos');?>" <?php if($this->session->_aviso_privacidad == 0){echo 'data-toggle="modal" data-target="#modal_aviso_privacidad"';}elseif(!in_array($this->session->_estatus,[1,3,4,6,7])){ echo 'data-toggle="modal" data-target="#modal_solicitud_enviada"';}?> id="datosSol" class="nav__link">
						<span class="glyphicon glyphicon-list nav__icon" aria-hidden="true"></span>
						<span class="nav__name">Datos generales</span>
					</a>

					<a href="<?php echo ($this->session->_aviso_privacidad == 0 || !in_array($this->session->_estatus,[1,3,4,6,7])) ? '#!' : base_url('Solicitudes/Ctrl_Solicitudes/documentos');?>" <?php if($this->session->_aviso_privacidad == 0){echo 'data-toggle="modal" data-target="#modal_aviso_privacidad"';}elseif(!in_array($this->session->_estatus,[1,3,4,6,7])){ echo 'data-toggle="modal" data-target="#modal_solicitud_enviada"';}?> id="documentosSol" class="nav__link">
						<span class="glyphicon glyphicon-file nav__icon" aria-hidden="true"></span>
						<span class="nav__name">Documentación</span>
					</a>

					<a href="<?php echo ($this->session->_aviso_privacidad == 0 || !in_array($this->session->_estatus,[1,3,4,6,7])) ? '#!' : base_url('Solicitudes/Ctrl_Solicitudes/envio');?>" <?php if($this->session->_aviso_privacidad == 0){echo 'data-toggle="modal" data-target="#modal_aviso_privacidad"';}elseif(!in_array($this->session->_estatus,[1,3,4,6,7])){ echo 'data-toggle="modal" data-target="#modal_solicitud_enviada"';}?> id="envioSol" class="nav__link">
						<span class="glyphicon glyphicon-envelope nav__icon" aria-hidden="true"></span>
						<span class="nav__name">Enviar</span>
					</a>

				</div>
			</div>
		</div>
	</nav>
</div>