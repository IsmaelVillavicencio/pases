<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH."controllers/Sesion.php");
class Ctrl_Recintos_Fiscalizados extends Sesion {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Catalogos/Recintos_Fiscalizados');
		$this->load->helper('security');
	}

	public function getFilteridRecinto(){
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
				$recinto = $this->security->xss_clean($this->input->get('recinto'));
				$response = $this->Recintos_Fiscalizados->getFilteridRecinto($recinto, $estatus);
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