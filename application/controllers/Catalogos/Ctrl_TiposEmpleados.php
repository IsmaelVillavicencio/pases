<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH."controllers/Sesion.php");
class Ctrl_TiposEmpleados extends Sesion {

	private $titulo = array("titulo" => "Tipos de personas");

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Catalogos/TiposEmpleados');
		$this->load->Model('Sesiones/SubMenu');
		$this->load->Model('Sesiones/Menu');
		$this->load->helper('security');
	}

	public function index()
	{
		$this->carabiner->js(
			array(
				array('catalogos/tipos_persona/index.js')
			)
		);

		$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 27);

		$this->load->view('template/header',$this->titulo);
		$this->load->view('template/menu', array_merge($Menu, $SubMenu));
		$this->load->view('catalogos/tipos_persona/index');
		$this->load->view('modales/confirmar_baja');
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
		$this->load->view('template/footer');
	}

	public function registrar()
	{
		$this->carabiner->js(
			array(
				array('catalogos/tipos_persona/registrar.js')
			)
		);

		$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 27);

		$this->load->view('template/header',$this->titulo);
		$this->load->view('template/menu', array_merge($Menu, $SubMenu));
		$this->load->view('catalogos/tipos_persona/registrar');
		$this->load->view('modales/confirmar_baja');
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
		$this->load->view('template/footer');
	}

	public function Modificar()
	{
		$this->carabiner->js(
			array(
				array('catalogos/tipos_persona/modificar.js')
			)
		);

		$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 27);

		$this->load->view('template/header',$this->titulo);
		$this->load->view('template/menu', array_merge($Menu, $SubMenu));
		$this->load->view('catalogos/tipos_persona/modificar');
		$this->load->view('modales/confirmar_baja');
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
		$this->load->view('template/footer');
	}

	public function getAll(){
		$response = [
			'status'	=> false,
			'message'   =>'',
			'data'		=> null
		];

		try{
			if($this->input->is_ajax_request()){
				$response = $this->TiposEmpleados->getAll();
			}else{
				$response['data'] = 'Petición inválida';
				throw new Exception('Petición inválida');
			}
		}
		catch (Exception $e){
			header("HTTP/1.0 400 " . utf8_decode($e->getMessage()));
		}
		
		header('Content-type: application/json');
		echo json_encode($response);
		exit;
	}

	public function getById(){
		$response = [
			'status'  => false,
			'message' => '',
			'data'    => null
		];

		try {
			if ($this->input->is_ajax_request()) {
				if (!$this->input->get()){
					$response['data'] = 'Petición inválida';
					throw new Exception('Petición inválida');
				}

				$idtipopersona = $this->security->xss_clean($this->input->get('idtipopersona'));
				$response = $this->TiposEmpleados->getById($idtipopersona);
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
				$response = $this->TiposEmpleados->getByEstatus($estatus);
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

				$nombre = $this->security->xss_clean($this->input->post('nombre'));
				$nombrecorto = $this->security->xss_clean($this->input->post('nombrecorto'));
				$response = $this->TiposEmpleados->add($nombre,$nombrecorto);
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

				$idtipopersona = $this->security->xss_clean($this->input->post('idtipopersona'));
				$nombre = $this->security->xss_clean($this->input->post('nombre'));
				$nombrecorto = $this->security->xss_clean($this->input->post('nombrecorto'));
				$response = $this->TiposEmpleados->up($idtipopersona,$nombre,$nombrecorto);
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

				$idtipopersona = $this->security->xss_clean($this->input->post('idtipopersona'));
				$response = $this->TiposEmpleados->del($idarea);
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

				$idtipopersona = $this->security->xss_clean($this->input->post('idtipopersona'));
				$response = $this->TiposEmpleados->en($idtipopersona);
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