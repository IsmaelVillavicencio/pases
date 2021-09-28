<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH."controllers/Sesion.php");
include_once './vendor/autoload.php';

class Ctrl_Usuarios extends Sesion {

	private $titulo = array("titulo" => "Usuarios");

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Usuarios/Usuarios');
		$this->load->Model('Sesiones/SubMenu');
		$this->load->Model('Sesiones/Menu');
		$this->load->helper('security');
	}

	public function index()
	{

		$this->carabiner->js(
			array(
				array('usuarios/usuarios/index.js')
			)
		);

		$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 10);

		if(!$value['data']){
			header("location:".base_url('inicio'));
			return;
		}
		
		if(!$value['data']->C && !$value['data']->R && !$value['data']->U && !$value['data']->D){
			header("location:".base_url('inicio'));
			return;
		}

		$permisos['permisos'] = json_decode(json_encode($value['data']), true);

		$this->load->view('template/header',$this->titulo);
		$this->load->view('template/menu', array_merge($Menu, $SubMenu));
		$this->load->view('usuarios/usuarios/index', $permisos);
		$this->load->view('modales/confirmar_baja');
		$this->load->view('modales/confirmar_reactivar');
		$this->load->view('modales/confirmar_up_password');
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
		$this->load->view('modales/registro_exitoso');
		$this->load->view('modales/reactivar_exitoso');
		$this->load->view('template/footer');
    }
    
    public function consultar(){

		$this->carabiner->js(
			array(
				array('usuarios/usuarios/consultar.js')
			)
		);

		$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 10);

		if(!$value['data']){
			header("location:".base_url('inicio'));
			return;
		}
		
		if(!$value['data']->R){
			header("location:".base_url('inicio'));
			return;
		}

		$this->load->view('template/header',$this->titulo);
		$this->load->view('template/menu', array_merge($Menu, $SubMenu));
		$this->load->view('usuarios/usuarios/consultar');
		$this->load->view('modales/confirmar_regresar');
		$this->load->view('modales/error_sesion');
		$this->load->view('template/footer');
	}

	public function registrar(){

		$this->carabiner->js(
			array(
				array('usuarios/usuarios/registrar.js')
			)
		);

		$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 10);

		if(!$value['data']){
			header("location:".base_url('inicio'));
			return;
		}
		
		if(!$value['data']->C){
			header("location:".base_url('inicio'));
			return;
		}

		$this->load->view('template/header',$this->titulo);
		$this->load->view('template/menu', array_merge($Menu, $SubMenu));
		$this->load->view('usuarios/usuarios/registrar');
		$this->load->view('modales/confirmar_registro');
		$this->load->view('modales/confirmar_regresar');
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
		$this->load->view('modales/registro_exitoso');
		$this->load->view('template/footer');
	}

	public function modificar(){
		
		$this->carabiner->js(
			array(
				array('usuarios/usuarios/modificar.js')
			)
		);

		$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 10);

		if(!$value['data']){
			header("location:".base_url('inicio'));
			return;
		}
		
		if(!$value['data']->U){
			header("location:".base_url('inicio'));
			return;
		}

		$this->load->view('template/header',$this->titulo);
		$this->load->view('template/menu', array_merge($Menu, $SubMenu));
		$this->load->view('usuarios/usuarios/modificar');
		$this->load->view('modales/confirmar_registro');
		$this->load->view('modales/confirmar_regresar');
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
		$this->load->view('modales/registro_exitoso');
		$this->load->view('template/footer');
	}

	public function getAll(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null
		];

		try {
			if ($this->input->is_ajax_request()) {
				$response = $this->Usuarios->getAll();
			}else{
				$response['data'] = 'Petición inválida';
				throw new Exception('Petición inválida');
			}
		} 
		catch (Exception $e) {
			header("HTTP/1.0 400 " . utf8_decode($e->getMessage()));
		}
		
		header('Content-type: application/json');
		echo json_encode($response);
		exit;
	}

	public function getById(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null
		];

		try {
			if ($this->input->is_ajax_request()) {
				if (!$this->input->get()){
					$response['data'] = 'Petición inválida';
					throw new Exception('Petición inválida');
				}

				$idusuario = $this->security->xss_clean($this->input->get('idusuario'));
				$response = $this->Usuarios->getById($idusuario);
			}else{
				$response['data'] = 'Petición inválida';
				throw new Exception('Petición inválida');
			}
		} 
		catch (Exception $e) {
			header("HTTP/1.0 400 " . utf8_decode($e->getMessage()));
		}
		
		header('Content-type: application/json');
		echo json_encode($response);
		exit;
	}

	public function getByEstatus(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null
		];

		try {
			if ($this->input->is_ajax_request()) {
				if (!$this->input->get()){
					$response['data'] = 'Petición inválida';
					throw new Exception('Petición inválida');
				}

				$estatus = $this->security->xss_clean($this->input->get('estatus'));
				$response = $this->Usuarios->getByEstatus($estatus);
			}else{
				$response['data'] = 'Petición inválida';
				throw new Exception('Petición inválida');
			}
		} 
		catch (Exception $e) {
			header("HTTP/1.0 400 " . utf8_decode($e->getMessage()));
		}
		
		header('Content-type: application/json');
		echo json_encode($response);
		exit;
	}

	public function getPermisos(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null
		];

		try {
			if ($this->input->is_ajax_request()) {
				if (!$this->input->get()){
					$response['data'] = 'Petición inválida';
					throw new Exception('Petición inválida');
				}

				$idusuario = $this->security->xss_clean($this->input->get('idusuario'));
				$estatus = $this->security->xss_clean($this->input->get('estatus'));
				$response = $this->Usuarios->getPermisos($idusuario,$estatus);
			}else{
				$response['data'] = 'Petición inválida';
				throw new Exception('Petición inválida');
			}
		} 
		catch (Exception $e) {
			header("HTTP/1.0 400 " . utf8_decode($e->getMessage()));
		}
		
		header('Content-type: application/json');
		echo json_encode($response);
		exit;
	}

	public function getByCorreo(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null
		];

		try {
			if ($this->input->is_ajax_request()) {
				if (!$this->input->get()){
					$response['data'] = 'Petición inválida';
					throw new Exception('Petición inválida');
				}

				$correo = $this->security->xss_clean($this->input->get('correo'));
				$idpersonal = $this->security->xss_clean($this->input->get('idpersonal'));
				$response = $this->Usuarios->getByCorreo($correo,$idpersonal);
			}else{
				$response['data'] = 'Petición inválida';
				throw new Exception('Petición inválida');
			}
		} 
		catch (Exception $e) {
			header("HTTP/1.0 400 " . utf8_decode($e->getMessage()));
		}
		
		header('Content-type: application/json');
		echo json_encode($response);
		exit;
	}

	public function add(){
		$response = [
			'status' 	=> false,
			'message'	=> 'Error al registrar un usuario',
			'data'		=> null,
			'token' 	=> $this->security->get_csrf_hash()
		];

		try {
			if ($this->input->is_ajax_request()) {
				if (!$this->input->post()){
					$response['data'] = 'Petición inválida';
					throw new Exception('Petición inválida');
				}

                $idpersonal = $this->security->xss_clean($this->input->post('idpersonal'));
				$idperfil = $this->security->xss_clean($this->input->post('idperfil'));

				if($idperfil == null){
					$idperfil = 0;
				}

				$permisos = $this->security->xss_clean($this->input->post('permisos'));
				$response = $this->Usuarios->add($idpersonal,$idperfil,$permisos);
				if($response["status"]){
					$responseemail = $this->sendEmailSendGrid($response['data']['nombre'], $response['data']['correo'], $response['pwd'], 1);
					$response = [
						'status' 	=> true,
						'message'	=> 'Usuario registrado con éxito. '.$responseemail["message"],
						'data'		=> null,
						'token' 	=> $this->security->get_csrf_hash()
					];
                }
			}else{
				$response['data'] = 'Petición inválida';
				throw new Exception('Petición inválida');
			}
		} 
		catch (Exception $e) {
			header("HTTP/1.0 400 " . utf8_decode($e->getMessage()));
		}
		
		header('Content-type: application/json');
		echo json_encode($response);
		exit;
	}

	public function update(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null,
			'token' 	=> $this->security->get_csrf_hash()
		];

		try {
			if ($this->input->is_ajax_request()) {
				if (!$this->input->post()){
					$response['data'] = 'Petición inválida';
					throw new Exception('Petición inválida');
				}

				$idusuario = $this->security->xss_clean($this->input->post('idusuario'));
				$idperfil = $this->security->xss_clean($this->input->post('idperfil'));

				if($idperfil == null){
					$idperfil = 0;
				}

                $permisos = $this->security->xss_clean($this->input->post('permisos'));
				$response = $this->Usuarios->up($idusuario,$idperfil,$permisos);
			}else{
				$response['data'] = 'Petición inválida';
				throw new Exception('Petición inválida');
			}
		} 
		catch (Exception $e) {
			header("HTTP/1.0 400 " . utf8_decode($e->getMessage()));
		}
		
		header('Content-type: application/json');
		echo json_encode($response);
		exit;
	}

	public function updatePassword(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null,
			'token' 	=> $this->security->get_csrf_hash()
		];

		try {
			if ($this->input->is_ajax_request()) {
				if (!$this->input->post()){
					$response['data'] = 'Petición inválida';
					throw new Exception('Petición inválida');
				}

				$errorPermisos = 0;
				$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
				//Temporal pwd
				$length = 10;
				$charactersLength = strlen($characters);
				$randomString = '';
				for ($i = 0; $i < $length; $i++) {
					$randomString .= $characters[rand(0, $charactersLength - 1)];
				}
				//end temporal pwd
				$pwd =  md5($randomString);

				$idusuario = $this->security->xss_clean($this->input->post('idusuario'));
				$datosUsuario = $this->Usuarios->getById($idusuario);
				$response = $this->Usuarios->upPassword($idusuario,$pwd,(is_null($datosUsuario['data']->id_perfil) ? 0 : $datosUsuario['data']->id_perfil));
				if($response["status"]){
					$responseemail = $this->sendEmailSendGrid($datosUsuario['data']->nombre_completo, $datosUsuario['data']->correo, $randomString, 2);
					$response = [
						'status' 	=> true,
						'message'	=> 'Contraseña actualizada con éxito. '.$responseemail["message"],
						'data'		=> null,
						'token' 	=> $this->security->get_csrf_hash()
					];
				}
			}else{
				$response['data'] = 'Petición inválida';
				throw new Exception('Petición inválida');
			}
		} 
		catch (Exception $e) {
			header("HTTP/1.0 400 " . utf8_decode($e->getMessage()));
		}
		
		header('Content-type: application/json');
		echo json_encode($response);
		exit;
	}

	public function delete(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null,
			'token' 	=> $this->security->get_csrf_hash()
		];

		try {
			if ($this->input->is_ajax_request()) {
				if (!$this->input->post()){
					$response['data'] = 'Petición inválida';
					throw new Exception('Petición inválida');
				}

				$idusuario = $this->security->xss_clean($this->input->post('idusuario'));
				$response = $this->Usuarios->del($idusuario);
			}else{
				$response['data'] = 'Petición inválida';
				throw new Exception('Petición inválida');
			}
		} 
		catch (Exception $e) {
			header("HTTP/1.0 400 " . utf8_decode($e->getMessage()));
		}
		
		header('Content-type: application/json');
		echo json_encode($response);
		exit;
	}

	public function active(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null,
			'token' 	=> $this->security->get_csrf_hash()
		];

		try {
			if ($this->input->is_ajax_request()) {
				if (!$this->input->post()){
					$response['data'] = 'Petición inválida';
					throw new Exception('Petición inválida');
				}

				$idusuario = $this->security->xss_clean($this->input->post('idusuario'));
				$response = $this->Usuarios->en($idusuario);
			}else{
				$response['data'] = 'Petición inválida';
				throw new Exception('Petición inválida');
			}
		} 
		catch (Exception $e) {
			header("HTTP/1.0 400 " . utf8_decode($e->getMessage()));
		}
		
		header('Content-type: application/json');
		echo json_encode($response);
		exit;
	}

	/*public function sendEmail($nombre, $correo, $clave, $tipo = 1){
		$this->load->library('Phpmailer_lib');

		// PHPMailer object
		$mail = $this->phpmailer_lib->load();

		$mail->CharSet = 'UTF-8';
		$mail->IsSMTP();
		$mail->SMTPDebug  = 0;
		$mail->SMTPAuth = true;
		$mail->SMTPSecure = 'ssl';
		$mail->Host = 'smtp.gmail.com';
		$mail->Port = 465;

		$mail->Username = "PISMANZANILLO@GMAIL.COM";
		$mail->Password = "pISmANZANILLO";
		
		$mail->setFrom('PISMANZANILLO@GMAIL.COM', 'Puerto inteligente seguro');
		//$mail->AddReplyTo('aorozco@zonazero.info', 'Araceli Orozco Vadillo');
		$mail->AddBCC($correo, $nombre);
		$mail->AddAddress($correo, $nombre);
		if($tipo = 1){
			$mail->Subject = "Registro de usuario";
		}else{
			$mail->Subject = "Actualización de acceso";
		}

		$meses[1] = 'Enero';
		$meses[2] = 'Febrero';
		$meses[3] = 'Marzo';
		$meses[4] = 'Abril';
		$meses[5] = 'Mayo';
		$meses[6] = 'Junio';
		$meses[7] = 'Julio';
		$meses[8] = 'Agosto';
		$meses[9] = 'Septiembre';
		$meses[10] = 'Octubre';
		$meses[11] = 'Noviembre';
		$meses[12] = 'Diciembre';
		
		$dia = date('d');
		$mes = $meses[((int)date('m'))];
		$anio = date('Y');

		$mensaje = "<label>Colima, Col., $dia de $mes de $anio</label>";
		$mensaje .= "<h4>Apreciable $nombre:</h4>";

		if($tipo ==1){
			$mensaje .= "<label>Se le ha otorgado el acceso al sistema de puerto inteligente seguro<br>
			los datos para acceder al sistema son los siguientes:</label><br>
			<h4>Correo: $correo</h4>
			<h4>Contraseña: $clave</h4>
			<label>El acceso es a través de la liga: ".base_url()."</label>";
		}else{
			$mensaje .= "<label>Hubo una actualización en sus datos de acceso<br>
			los nuevos datos para acceder al sistema son los siguientes:</label><br>
			<h4>Correo: $correo</h4>
			<h4>Contraseña: $clave</h4>
			<label>El acceso es a través de la liga: ".base_url()."</label>";
		}

		$mail->MsgHTML($mensaje);

		if(!$mail->Send()){
            return [
				'status' 	=> false,
				'message'	=> 'No fue posible realizar el envió del correo electrónico',
				'data'		=> null
			];
		}else{
			return [
				'status' 	=> true,
				'message'	=> 'Correo electrónico enviado con éxito',
				'data'		=> null
			];
		}
	}*/

	public function sendEmailSendGrid($nombre, $correo, $clave, $tipo = 1){
		$meses[1] = 'Enero';
		$meses[2] = 'Febrero';
		$meses[3] = 'Marzo';
		$meses[4] = 'Abril';
		$meses[5] = 'Mayo';
		$meses[6] = 'Junio';
		$meses[7] = 'Julio';
		$meses[8] = 'Agosto';
		$meses[9] = 'Septiembre';
		$meses[10] = 'Octubre';
		$meses[11] = 'Noviembre';
		$meses[12] = 'Diciembre';

		$dia = date('d');
		$mes = $meses[((int)date('m'))];
		$anio = date('Y');

		$mensaje = "<label>Colima, Col., $dia de $mes de $anio</label>";
		$mensaje .= "<h4>Apreciable $nombre:</h4>";

		if($tipo = 1){
			$Subject = "Registro de usuario";
			$mensaje .= "<label>Se le ha otorgado el acceso al sistema de puerto inteligente seguro<br>
			los datos para acceder al sistema son los siguientes:</label><br>
			<h4>Correo: $correo</h4>
			<h4>Contraseña: $clave</h4>
			<label>El acceso es a través de la liga: ".base_url()."</label>";
		}else{
			$Subject = "Actualización de acceso";
			$mensaje .= "<label>Hubo una actualización en sus datos de acceso<br>
			los nuevos datos para acceder al sistema son los siguientes:</label><br>
			<h4>Correo: $correo</h4>
			<h4>Contraseña: $clave</h4>
			<label>El acceso es a través de la liga: ".base_url()."</label>";
		}

		$email = new \SendGrid\Mail\Mail();
		$email->setFrom("pis-manzanillo@puertointeligenteseguro.mx","Puerto Inteligente Seguro");
		$email->setSubject($Subject);
		$email->addTo($correo, $nombre);
		$email->addBcc("pismanzanillo@gmail.com", "PIS-COPY");
		$email->addContent("text/html",$mensaje);

		$sendgrid = new \SendGrid(SENDGRID_KEY);
		try {
			$response = $sendgrid->send($email);
			if($response->statusCode() == "202"){
				$response = [
					'status' 	=> true,
					'message'	=> 'Correo electrónico enviado con éxito',
					'data'		=> null
				];
			}else{
				$response = [
					'status' 	=> false,
					'message'	=> 'No fue posible realizar el envió del correo electrónico',
					'data'		=> null
				];
			}
		} catch (\Exception $ex) {
			$response = [
				'status' 	=> false,
				'message'	=> "SendGrid ".$ex->getMessage(),
				'data'		=> null
			];
		}
		return $response;
	}
}