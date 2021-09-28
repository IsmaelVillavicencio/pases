<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH."controllers/Sesion.php");
class Ctrl_Directivos extends Sesion {

	private $titulo = array("titulo" => "Directivos");

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Usuarios/Directivos');
		$this->load->Model('Sesiones/SubMenu');
		$this->load->Model('Sesiones/Menu');
		$this->load->helper('security');
	}

	public function index()
	{

		$this->carabiner->js(
			array(
				array('usuarios/directivos/index.js')
			)
		);

		$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 9);

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
		$this->load->view('usuarios/directivos/index', $permisos);
		$this->load->view('modales/confirmar_baja');
		$this->load->view('modales/confirmar_reactivar');
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
		$this->load->view('modales/registro_exitoso');
		$this->load->view('modales/reactivar_exitoso');
		$this->load->view('template/footer');
    }
    
    public function consultar(){

		$this->carabiner->js(
			array(
				array('usuarios/directivos/consultar.js')
			)
		);

		$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 9);

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
		$this->load->view('usuarios/directivos/consultar');
		$this->load->view('modales/confirmar_baja');
		$this->load->view('modales/confirmar_regresar');
		$this->load->view('modales/confirmar_reactivar');
		$this->load->view('modales/registro_exitoso');
		$this->load->view('modales/reactivar_exitoso');
		$this->load->view('modales/error_sesion');
		$this->load->view('template/footer');
	}

	public function registrar(){

		$this->carabiner->js(
			array(
				array('utilidades/validaciones.js'),
				array('usuarios/directivos/registrar.js')
			)
		);

		$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 9);

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
		$this->load->view('usuarios/directivos/registrar');
		$this->load->view('modales/confirmar_registro');
		$this->load->view('modales/confirmar_regresar');
		$this->load->view('modales/confirmar_reactivar');
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
		$this->load->view('modales/registro_exitoso');
		$this->load->view('modales/reactivar_exitoso');
		$this->load->view('template/footer');
	}

	public function modificar(){
		
		$this->carabiner->js(
			array(
				array('utilidades/validaciones.js'),
				array('usuarios/directivos/modificar.js')
			)
		);

		$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 9);

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
		$this->load->view('usuarios/directivos/modificar');
		$this->load->view('modales/confirmar_registro');
		$this->load->view('modales/confirmar_regresar');
		$this->load->view('modales/confirmar_reactivar');
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
		$this->load->view('modales/registro_exitoso');
		$this->load->view('modales/reactivar_exitoso');
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
				$response = $this->Directivos->getAll();
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

				$idtipo = $this->security->xss_clean($this->input->get('idtipo'));
				$response = $this->Directivos->getById($idtipo);
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
				$response = $this->Directivos->getByEstatus($estatus);
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

	public function getByPersonalRol(){
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
				$idnombramiento = $this->security->xss_clean($this->input->get('idnombramiento'));
				$iddirectivo = $this->security->xss_clean($this->input->get('iddirectivo'));
				$response = $this->Directivos->getByPersonalRol($idpersonal,$idnombramiento,$iddirectivo);
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

                $idpersonal = $this->security->xss_clean($this->input->post('idpersonal'));
                $idnombramiento = $this->security->xss_clean($this->input->post('idnombramiento'));
                $personalidad = $this->security->xss_clean($this->input->post('personalidad'));
				$response = $this->Directivos->add($idpersonal,$idnombramiento,$personalidad);
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

				$iddirectivo = $this->security->xss_clean($this->input->post('iddirectivo'));
				$idpersonal = $this->security->xss_clean($this->input->post('idpersonal'));
                $idnombramiento = $this->security->xss_clean($this->input->post('idnombramiento'));
                $personalidad = $this->security->xss_clean($this->input->post('personalidad'));
				$response = $this->Directivos->up($iddirectivo,$idpersonal,$idnombramiento,$personalidad);
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

				$iddirectivo = $this->security->xss_clean($this->input->post('iddirectivo'));
				$response = $this->Directivos->del($iddirectivo);
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

				$iddirectivo = $this->security->xss_clean($this->input->post('iddirectivo'));
				$response = $this->Directivos->en($iddirectivo);
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