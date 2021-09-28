<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH."controllers/Sesion.php");
class Ctrl_Personal extends Sesion {

	private $titulo = array("titulo" => "Personal");

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Usuarios/Personal');
		$this->load->Model('Sesiones/SubMenu');
		$this->load->Model('Sesiones/Menu');
		$this->load->helper('security');
		$this->load->library('WS');
	}

	public function index()
	{

		$this->carabiner->js(
			array(
				array('usuarios/personal/index.js')
			)
		);

		$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 7);

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
		$this->load->view('usuarios/personal/index', $permisos);
		$this->load->view('modales/confirmar_baja');
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
		$this->load->view('modales/registro_exitoso');
		$this->load->view('template/footer');
    }
    
    public function consultar(){

		$this->carabiner->js(
			array(
				array('usuarios/personal/consultar.js')
			)
		);

		$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 7);

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
		$this->load->view('usuarios/personal/consultar');
		$this->load->view('modales/confirmar_regresar');
		$this->load->view('modales/confirmar_baja');
		$this->load->view('modales/registro_exitoso');
		$this->load->view('modales/error_sesion');
		$this->load->view('template/footer');
	}

	public function reactivar(){

		$this->carabiner->js(
			array(
				array('usuarios/personal/reactivar.js'),
				array('utilidades/validaciones.js'),
			)
		);

		$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 7);

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
		$this->load->view('usuarios/personal/reactivar');
		$this->load->view('modales/confirmar_regresar');
		$this->load->view('modales/confirmar_reactivar');
		$this->load->view('modales/reactivar_exitoso');
		$this->load->view('modales/error_sesion');
		$this->load->view('template/footer');
	}

	public function registrar(){

		$this->carabiner->js(
			array(
				array('utilidades/validaciones.js'),
				array('usuarios/personal/registrar.js')
			)
		);

		$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 7);

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
		$this->load->view('usuarios/personal/registrar');
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
				array('utilidades/validaciones.js'),
				array('usuarios/personal/modificar.js')
			)
		);

		$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 7);

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
		$this->load->view('usuarios/personal/modificar');
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
				$response = $this->Personal->getAll();
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

				$idpersonal = $this->security->xss_clean($this->input->get('idpersonal'));
				$response = $this->Personal->getById($idpersonal);
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
				$response = $this->Personal->getByEstatus($estatus);
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

	public function getByCURP(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null,
			'wsdata'	=> null
		];

		try {
			if ($this->input->is_ajax_request()) {
				if (!$this->input->get()){
					$response['data'] = 'Petición inválida';
					throw new Exception('Petición inválida');
				}
				$curp = $this->security->xss_clean($this->input->get('curp'));
				$response = $this->Personal->getByCURP($curp);
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

	public function getByNSSPermisoData(){
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

				$nss = $this->security->xss_clean($this->input->get('nss'));
				$response = $this->Personal->getByNSSPermisoData($nss);
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

	public function getByRFC(){
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

				$rfc = $this->security->xss_clean($this->input->get('rfc'));
				$response = $this->Personal->getByRFC($rfc);
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

	public function getContactoByCorreo(){
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
				$response = $this->Personal->getContactoByCorreo($correo);
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

	public function getDomicilio(){
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

				$idpersonal = $this->security->xss_clean($this->input->get('idpersonal'));
				$response = $this->Personal->getDomicilio($idpersonal);
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

	public function getContacto(){
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

				$idpersonal = $this->security->xss_clean($this->input->get('idpersonal'));
				$response = $this->Personal->getContacto($idpersonal);
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

	public function getUniquePersonasUsuario(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null
		];

		try {
			if ($this->input->is_ajax_request()) {
				$response = $this->Personal->getUniquePersonasUsuario();
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

                $datos = $this->security->xss_clean($this->input->post());
				$response = $this->Personal->add($datos);
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

                $datos = $this->security->xss_clean($this->input->post());
				$response = $this->Personal->up($datos);
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

				$idpersonal = $this->security->xss_clean($this->input->post('idpersonal'));
				$iddomicilio = $this->security->xss_clean($this->input->post('iddomicilio'));
				$idcontacto = $this->security->xss_clean($this->input->post('idcontacto'));
				$response = $this->Personal->del($idpersonal,$iddomicilio,$idcontacto);
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
				$datos = $this->security->xss_clean($this->input->post());
				$response = $this->Personal->en($datos);
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
}