<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH."controllers/Sesion.php");
class Ctrl_Perfiles extends Sesion {

	private $titulo = array("titulo" => "Perfiles");

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Usuarios/Perfiles');
		$this->load->Model('Sesiones/SubMenu');
		$this->load->Model('Sesiones/Menu');
		$this->load->helper('security');
	}

	public function index()
	{

		$this->carabiner->js(
			array(
				array('usuarios/perfiles/index.js')
			)
		);

		$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 8);

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
		$this->load->view('usuarios/perfiles/index', $permisos);
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
				array('usuarios/perfiles/consultar.js')
			)
		);

		$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 8);

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
		$this->load->view('usuarios/perfiles/consultar');
		$this->load->view('modales/confirmar_regresar');
		$this->load->view('modales/error_sesion');
		$this->load->view('template/footer');
	}

	public function registrar(){

		$this->carabiner->js(
			array(
				array('usuarios/perfiles/registrar.js')
			)
		);

		$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 8);

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
		$this->load->view('usuarios/perfiles/registrar');
		$this->load->view('modales/confirmar_registro');
		$this->load->view('modales/confirmar_regresar');
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
		$this->load->view('modales/registro_exitoso');
		$this->load->view('template/footer');
	}

	public function modificar(){
		if(!$this->session->_id_user){
			header("location:".base_url('Sesiones/Ctrl_Sesiones'));
		}
		
		$this->carabiner->js(
			array(
				array('usuarios/perfiles/modificar.js')
			)
		);

		$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 8);

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
		$this->load->view('usuarios/perfiles/modificar');
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
				$response = $this->Perfiles->getAll();
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

				$idperfil = $this->security->xss_clean($this->input->get('idperfil'));
				$response = $this->Perfiles->getById($idperfil);
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
				$response = $this->Perfiles->getByEstatus($estatus);
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

				$idperfil = $this->security->xss_clean($this->input->get('idperfil'));
				$estatus = $this->security->xss_clean($this->input->get('estatus'));
				$response = $this->Perfiles->getPermisos($idperfil,$estatus);
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

	public function getPermisosProfileModule(){
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

				$idperfil = $this->security->xss_clean($this->input->get('idperfil'));
				$idmodulo = $this->security->xss_clean($this->input->get('idmodulo'));
				$estatus = $this->security->xss_clean($this->input->get('estatus'));
				$response = $this->Perfiles->getPermisosProfileByModule($idperfil, $idmodulo, $estatus);
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
                $permisos = $this->security->xss_clean($this->input->post('permisos'));
				$response = $this->Perfiles->add($nombre,$permisos);
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

				$idperfil = $this->security->xss_clean($this->input->post('idperfil'));
				$nombre = $this->security->xss_clean($this->input->post('nombre'));
                $permisos = $this->security->xss_clean($this->input->post('permisos'));
				$response = $this->Perfiles->up($idperfil,$nombre,$permisos);
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

				$idperfil = $this->security->xss_clean($this->input->post('idperfil'));
				$response = $this->Perfiles->del($idperfil);
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

				$idperfil = $this->security->xss_clean($this->input->post('idperfil'));
				$response = $this->Perfiles->en($idperfil);
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