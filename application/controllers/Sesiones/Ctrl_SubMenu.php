<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ctrl_SubMenu extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Sesiones/SubMenu');
		$this->load->helper('security');
	}

	public function getAll(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null
		];

		try {
			if ($this->input->is_ajax_request()) {
				$response = $this->SubMenu->getAll();
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
				$response = $this->SubMenu->getById();
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
				$response = $this->SubMenu->getByEstatus($estatus);
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
    
    public function getByMenu(){
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

                $idmenu = $this->security->xss_clean($this->input->get('idmenu'));
				$estatus = $this->security->xss_clean($this->input->get('estatus'));
				$response = $this->SubMenu->getByMenu($idmenu,$estatus);
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