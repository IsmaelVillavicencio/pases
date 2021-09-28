
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ctrl_Sesiones extends CI_Controller {

	public function __construct() {
        parent:: __construct();

		//$this->load->helper('url'); 
		$this->load->library('session');
		//$this->load->helper('cookie');
    }

	private $titulo = array("titulo" => "Inicio de sesión");

	public function index()
	{
		$this->carabiner->js(
			array(
				array('sesiones/index.js')
			)
		);
		
		$this->load->view('template/header',$this->titulo);
		$this->load->view('sesiones/index');
		$this->load->view('modales/error');
		$this->load->view('template/footer');
	}

	public function validate(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null,
			'token' 	=> $this->security->get_csrf_hash()
		];

		try {
			if ($this->input->is_ajax_request()) {

				if(!is_null($this->session->_id_tipo_contrato)){
					$response["status"] = false;
					$response['message'] = 'No es posible iniciar sesión, debido a que se a iniciado sesión como prestador de servicios.';
					$response["data"] = null;
					throw new Exception('No es posible iniciar sesión, debido a que se a iniciado sesión como prestador de servicios.');
				}else{
					$this->load->model("Sesiones/Sesiones");
					$correo = $this->security->xss_clean($this->input->post('correo'));
					$contrasena = $this->security->xss_clean($this->input->post('contrasena'));
					$response = $this->Sesiones->getbyCorreo($correo);
					if(!$response["status"]){
						$desactivado = $this->Sesiones->getByCorreoInactive($correo);
						if($desactivado['data']){
							$response["status"] = false;
							$response['message'] = 'Usuario inactivo';
							$response["data"] = null;
							$response["token"] = $this->security->get_csrf_hash();
							throw new Exception('Usuario inactivo');
						}
						$response["status"] = false;
						$response['message'] = 'Usuario no registrado';
						$response["data"] = null;
						$response["token"] = $this->security->get_csrf_hash();
						throw new Exception('Usuario no registrado');
					}else{
						//Creacion de sesion para el usuario
						//Generar datos de sesion de id,nombre,area,puesto
						//Generar datos de sesion para el menu que el usuario puede acceder
						
						$contrasena = hash('md5',$contrasena);
						if($contrasena != $response["data"]->contrasena){
							$response["status"] = false;
							$response['message'] = 'Contraseña incorrecta';
							$response["data"] = null;
							$response["token"] = $this->security->get_csrf_hash();
							throw new Exception('Contraseña incorrecta');
						}else{
							$response = $this->Sesiones->getIdPersona($response["data"]->id_persona);
							$sesion_info = array(
								'_id_user' => $response["data"]->id_persona,
								'_id_sistema' => $response["data"]->id_usuario,
								'_id_perfil' => $response["data"]->id_perfil,
								'_id_area' => $response["data"]->id_area,
								'_id_contrato' => 0
							);

							$responseContrato = $this->Sesiones->getContratoVigente($response["data"]->id_persona);
							if(isset($responseContrato['data']->id_contrato)){
								$sesion_info['_id_contrato'] = $responseContrato['data']->id_contrato;
							}
							$this->session->set_userdata($sesion_info);

							$response["status"] = true;
							$response['message'] = 'Inicio de sesion correctos';
							$response["data"] = null;
							$response["token"] = $this->security->get_csrf_hash();
						}
					}
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

	public function cerrar(){
		if(!is_null($this->session->_id_user)){
			$this->session->sess_destroy();
		}
		header("location:".base_url());
	}
}