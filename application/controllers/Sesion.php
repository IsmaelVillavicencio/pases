<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sesion extends CI_Controller {
    
    public $validacion_sesion = false;
    private $titulo = array("titulo" => "Contratos");

    public function __construct()
	{
		parent::__construct();

        if(is_null($this->session->_id_user) && is_null($this->session->_id_contrato)){
            if ($this->input->is_ajax_request()) {
				$ruta = explode("/",base_url(uri_string()));
				switch (($ruta[sizeof($ruta)-2])) {
					case 'Ctrl_TiposServicios':
						if($ruta[sizeof($ruta)-1] != 'getByContrato'){
							header('HTTP/1.0 500 Internal Server Error');
							die("Sesion");
						}
						break;
					case 'Ctrl_TiposPersonas':
						if($ruta[sizeof($ruta)-1] != 'getByEstatus'){
							header('HTTP/1.0 500 Internal Server Error');
							die("Sesion");
						}
						break;
					case 'Ctrl_TiposContratos':
						if($ruta[sizeof($ruta)-1] != 'getByEstatus'){
							header('HTTP/1.0 500 Internal Server Error');
							die("Sesion");
						}
						break;
					case 'Ctrl_Personal':
						if($ruta[sizeof($ruta)-1] != 'getByRFC'){
							header('HTTP/1.0 500 Internal Server Error');
							die("Sesion");
						}
						break;
					case 'Ctrl_Empresas':
						if($ruta[sizeof($ruta)-1] != 'getByRFC'){
							header('HTTP/1.0 500 Internal Server Error');
							die("Sesion");
						}
						break;
					default:
						header('HTTP/1.0 500 Internal Server Error');
						die("Sesion");
						break;
				}
			}else{
				header("location:".base_url('Sesiones/Ctrl_Sesiones'));
			    exit;
			}
        }
	}
}
