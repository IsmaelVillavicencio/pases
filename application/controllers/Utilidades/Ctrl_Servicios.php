<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH."controllers/Sesion.php");
class Ctrl_Servicios extends Sesion {

	public function __construct(){
		parent::__construct();
        $this->load->library('Servicios');
    }

    /*
    *Obtener datos de vehiculos en base a placa o serie del REST de C5
    *parametros
    *endpoint : opciones => repuvenacional,repuveestatal,sivebu,arcos
    *noserie
    *noplaca
    */
    public function getDatosVehiculos(){
		$response = [
			'status' 		=> false,
			'message'		=> '',
			'data'			=> null,
			'data_interna' 	=> null,
			'token' 		=> $this->security->get_csrf_hash()
		];

		try {
			if ($this->input->is_ajax_request()) {
				$endpoint = $this->security->xss_clean($this->input->get('endpoint'));
				$noserie = $this->security->xss_clean($this->input->get('noserie'));
				$noplaca = $this->security->xss_clean($this->input->get('noplaca'));
				
				$respLogin = $this->servicios->login();
				$response["status"] = $respLogin["status"];
				$response["message"] = $respLogin["message"];
				
				if(!$respLogin["status"]){
					if($noserie != ''){
						$datos = array('tipo' => 'SERIE', 'dato' => $noserie);
					}else{
						$datos = array('tipo' => 'PLACA', 'dato' => $noplaca);
					}
					$this->servicios->parametros = $datos;
					$this->servicios->endpoint = "Vehiculo/c5/".$endpoint;
					$respuesta = $this->servicios->obtener_datos();
					
					$response["status"] = $respuesta["status"];
					$response["message"] = $respuesta["message"];

					if($respuesta["respuesta_rest"]->error){
						$response["status"] = $respuesta["respuesta_rest"]->error;
						$response["message"] = $respuesta["respuesta_rest"]->mensaje;
					}else{
						$response["data"] = $respuesta["respuesta_rest"]->datos;
						if(isset($respuesta["respuesta_rest"]->datos[0]->placa)){
							$this->load->model('Permisos/Permisos');
							$respuestaVehiculo = $this->Permisos->getVehiculosByPlaca($respuesta["respuesta_rest"]->datos[0]->placa);
							$response["data_interna"] = $respuestaVehiculo["data"];
						}
					}
				}else{
					throw new Exception($response["message"]);
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

	/*
    *Obtener datos de personas en base a nombre o curp del REST de C5
    *parametros
    *endpoint : opciones => licencias,mandamientos,repuve
	*tipo : opciones => NOMBRE, CURP
    *nombre 
    *paterno
	*materno
	*curp
    */
    public function getDatosPersonas(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null,
			'token' 	=> $this->security->get_csrf_hash()
		];

		try {
			if ($this->input->is_ajax_request()) {
				$endpoint = $this->security->xss_clean($this->input->get('endpoint'));
				$nombre = $this->security->xss_clean($this->input->get('nombre'));
				$paterno = $this->security->xss_clean($this->input->get('paterno'));
				$materno = $this->security->xss_clean($this->input->get('materno'));
				$curp = $this->security->xss_clean($this->input->get('curp'));
				
				$respLogin = $this->servicios->login();
				$response["status"] = $respLogin["status"];
				$response["message"] = $respLogin["message"];
				
				if(!$respLogin["status"]){
					if($nombre != ''){
						$datos = array('tipo' => 'NOMBRE', 'nombre' => $nombre, 'paterno' => $paterno, 'materno' => $materno);
					}else{
						$datos = array('tipo' => 'CURP', 'curp' => $curp);
					}
					$this->servicios->parametros = $datos;
					$this->servicios->endpoint = "Persona/c5/".$endpoint;
					$respuesta = $this->servicios->obtener_datos();
					
					$response["status"] = $respuesta["status"];
					$response["message"] = $respuesta["message"];

					if($respuesta["respuesta_rest"]->error){
						$response["status"] = $respuesta["respuesta_rest"]->error;
						$response["message"] = $respuesta["respuesta_rest"]->mensaje;
						throw new Exception($response["message"]);
					}else{
						$response["data"] = $respuesta["respuesta_rest"]->datos;
					}
				}else{
					throw new Exception($response["message"]);
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
}