<!DOCTYPE html>
<html lang="es">

<head>
	<!-- Required meta tags -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="icon" href="<?php echo base_url("assets/iconos/logoPIS.png"); ?>">
	<title>API</title>

	<!-- Jquery 3.3.1-->
	<script src="<?php echo base_url("assets/librerias/jquery-3-3-1/jquery.js"); ?>"></script>

	<!-- DataTables -->
	<link rel="stylesheet" href="//cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
	<link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.7.0/css/buttons.dataTables.min.css">	
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>

	<!-- Datatable -->
	<script src="//cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
	<script src="https://cdn.datatables.net/buttons/1.7.0/js/dataTables.buttons.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
	<script src="https://cdn.datatables.net/buttons/1.7.0/js/buttons.html5.min.js"></script>
	<script src="https://cdn.datatables.net/buttons/1.7.0/js/buttons.print.min.js"></script>

	<!--Excel-->
	<script src="<?php echo base_url("assets/librerias/excel/xlsx.full.min.js"); ?>"></script>
	<!--PDF-->
	<script src="<?php echo base_url("assets/librerias/jsPDF-1-3-2/dist/jspdf.min.js"); ?>"></script>

	<!--Scripts del bootstrap-->
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.js"></script>
	<!-- Select2-->
	<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
	<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
	<!-- Libreria español -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/i18n/es.js"></script>
	<!--Datetimepicker -->
		<link href="https://pis-contratos-qa.kioscoweb.mx/assets/librerias/datetimepicker/bootstrap-datetimepicker.min.css" rel="stylesheet">
		<script src="https://pis-contratos-qa.kioscoweb.mx/assets/librerias/datetimepicker/bootstrap-datetimepicker.min.js"></script>

	<!--Estilos personalizados-->
	<!--link rel="stylesheet" href="<php echo base_url("assets/css/estilos.css"); ?>" type="text/css"-->
	<link rel="stylesheet" href="<?php echo base_url("assets/css/estilosMenu.css"); ?>" type="text/css">
	<link rel="stylesheet" href="<?php echo base_url("assets/css/estilos.css"); ?>" type="text/css">

	<link href="https://framework-gb.cdn.gob.mx/assets/styles/main.css" rel="stylesheet">
	<!-- time picker -->
	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css">
	<script src="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js"></script>
	<!-- date picker -->
	<link id="bsdp-css" href="https://unpkg.com/bootstrap-datepicker@1.9.0/dist/css/bootstrap-datepicker3.min.css" rel="stylesheet">
  	<script src="https://unpkg.com/bootstrap-datepicker@1.9.0/dist/js/bootstrap-datepicker.min.js"></script>
  	<script src="https://unpkg.com/bootstrap-datepicker@1.9.0/dist/locales/bootstrap-datepicker.es.min.js" charset="UTF-8"></script>
	<!-- Respond.js soporte de media queries para Internet Explorer 8 -->
    <!-- ie8.js EventTarget para cada nodo en Internet Explorer 8 -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/ie8/0.2.2/ie8.js"></script>
    <![endif]-->

	 <!-- JS -->
	 <!--<script src="https://framework-gb.cdn.gob.mx/gobmx.js"></script>-->


	 <!-- FILE INPUT BOOTSTRAP -->
	 <link href="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.2.2/css/fileinput.min.css" media="all" rel="stylesheet" type="text/css" />
	 <script src="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.2.2/js/fileinput.min.js"></script>
	 <script src="<?php echo base_url("assets/js/utilidades/jquery.form.js"); ?>"></script>
	 <script src="<?php echo base_url("assets/js/utilidades/what-input.js"); ?>"></script>	 

</head>

<body>
	
	<input type="hidden" id="application_url" value="<?php echo APPPATH; ?>">
	<input type="hidden" id="base_url" value="<?php echo base_url(); ?>">
	<input type="hidden" id="base_url_rest" value="<?php echo BASE_URL_REST; ?>">
	<input type="hidden" id="id_usuario" value="<?php echo $this->session->_id_sistema; ?>">
	<input type="hidden" id="ip_address" value="<?php echo IP_ADDRESS; ?>">
	<input type="hidden" id="idcontratovigenteusuario" value="<?php echo $this->session->_id_contrato ?>">
	<input type="hidden" id="idempresavigenteusuario" value="<?php echo $this->session->_id_empresa ?>">
	<input type="hidden" id="token" value="<?php echo $this->session->_token; ?>"> 
	<input type="hidden" id="_id_empresa_rest" value="<?php echo $this->session->_id_empresa_rest; ?>"> 
	<input type="hidden" id="id_rol" value="<?php echo $this->session->_permiso_rol; ?>"> 
	<input type="hidden" id="csrf" name="<?php echo $this->security->get_csrf_token_name();?>" value="<?php echo $this->security->get_csrf_hash();?>">


	<div class="spinner h-100 justify-content-center align-items-center" id="spinner">
		<div class="spinner-border text-muted" style="width: 3rem; height: 3rem;"></div>
	</div>
	<div class="spinner h-100 justify-content-center align-items-center" id="grow">
		<div class="spinner-grow text-muted" style="width: 3rem; height: 3rem; animation-delay: 0s !important"></div>
		<div class="spinner-grow text-muted" style="width: 3rem; height: 3rem; animation-delay: 0.25s !important"></div>
		<div class="spinner-grow text-muted" style="width: 3rem; height: 3rem; animation-delay: 0.50s !important"></div>
		<div style="padding-top: 10%; position: fixed; font-size: 2rem;">
			Validando información
		</div>
	</div>

	<main class="page" id="page">
		<div class="paginated">
			<!--<section>
				<nav class="navbar navbar-inverse sub-navbar navbar-fixed-top">
					<div class="container">
						<div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#subenlaces">
							<span class="sr-only">Interruptor de Navegación</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<img class="navbar-brand navbar_logos" src="<?php //echo base_url(); ?>\assets\logotipos/Semar.png" alt="Semar">
						<img class="navbar-brand navbar_logos" src="<?php //echo base_url(); ?>\assets\logotipos/API_man.png" alt="API">
						<img class="navbar-brand navbar_logos" src="<?php //echo base_url(); ?>\assets\logotipos/PIS_man.png" alt="PIS">
						</div>
						<div class="collapse navbar-collapse" id="subenlaces">
						<ul class="nav navbar-nav navbar-right">
							<li><a href="<?php //echo base_url(); ?>"><span class="glyphicon glyphicon-home" aria-hidden="true">&nbsp</span>Home</a></li>
							<?php /*
							if(isset($this->session->_id_user)){
								echo '<li class="dropdown">
									<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Usuario<span class="caret"></span></a>
									<ul class="dropdown-menu" role="menu">
										<li><a href="#">Opciones</a></li>
										<li class="divider"></li>
										<li><a href="'; echo base_url("Sesiones/Ctrl_Sesiones/cerrar"); echo '">Cerrar sesion</a></li>
									</ul>
								</li>';
							} */
							?>
						</ul>
						</div>
					</div>
				</nav>
			</section>-->
			<section class="flag-banner" id="section-body">
				<div class="d-flex">
