<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH."controllers/Sesion.php");
class Ctrl_Empresas extends Sesion {

	private $titulo = array("titulo" => "Empresas");

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Usuarios/Empresas');
		$this->load->helper('security');
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
				$response = $this->Empresas->getByRFC($rfc);
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

	public function getByClave(){
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

				$clave = $this->security->xss_clean($this->input->get('clave'));
				$response = $this->Empresas->getByClave($clave);
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

				$id = $this->security->xss_clean($this->input->get('id'));
				$response = $this->Empresas->getById($id);
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

	public function getByUsuario(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null
		];

		try {
			if ($this->input->is_ajax_request()) {
				$response = $this->Empresas->getAllEmpresasPermisosByUser($this->session->_id_user);
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
    public function getEmpresasPermisos(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null
		];

		try {
			if ($this->input->is_ajax_request()) {
				if($this->session->_permiso_rol == 8){
					$response = $this->Empresas->getById($this->session->_id_empresa);
				}else{
					$response = $this->Empresas->getEmpresasPermisos();
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
    public function getAllEmpresas(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null
		];

		try {
			if ($this->input->is_ajax_request()) {
                $response = $this->Empresas->getAllEmpresas();
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