<?php
defined('BASEPATH') OR exit('No direct script access allowed');

//require_once(APPPATH."controllers/Sesion.php");
class Inicio extends CI_Controller {
	
	private $titulo = array("titulo" => "Inicio");

	public function __construct()
	{
		parent::__construct();
		//$this->load->Model('Sesiones/SubMenu');
		//$this->load->Model('Sesiones/Menu');
		//$this->load->model('Usuarios/Empresas');
		$this->load->model('Permisos/Permisos');
		$this->load->library('WS');
	}

	public function index()
	{  
		$token = $this->input->get('token');
		if(!is_null($token)){
			$myWS = new  WS();
			$myWS->url = BASE_URL_REST_LOGIN;
			$myWS->endpoint = 'Validar/permisos';
			$myWS->token = $token;
			$myWS->parametros = array();
			$resultado = json_decode($myWS->obtener_datos()); 

			if(isset($resultado->valor->empresa_Id)){
				/*$response = $this->Empresas->getByIdREST($resultado->valor->empresa_Id);
				if(!isset($response['data']->id)){
					$this->Empresas->addEmpresaREST($resultado->valor->empresa_Nombre, $resultado->valor->empresa_Id);
					$response = $this->Empresas->getByIdREST($resultado->valor->empresa_Id);
				}*/

				if (is_null($this->session->_id_sistema)){
					$sesion_info = array(
						'_id_user' 			=> $resultado->valor->usuario_Id,
						'_id_sistema' 		=> $resultado->valor->usuario_Id,
						'_id_perfil' 		=> 0,
						'_id_area' 			=> 0,
						'_id_empresa_rest'	=> $resultado->valor->empresa_Id,
						'_empresa_rest'		=> $resultado->valor->empresa_Nombre,
						'_id_empresa'		=> $resultado->valor->empresa_Id,
						'_empresa'		=> $resultado->valor->empresa_Nombre,
						'_id_contrato' 		=> $resultado->valor->contrato_Id,
						'_numero_contrato' 	=> $resultado->valor->contrato_Numero,
						'_permiso_rol'		=> $resultado->valor->idRolApp,
						'_token'			=> $resultado->mensaje,
						'_correo_usuario'   => trim($resultado->valor->usuario_Usuario),
						'_nombre_usuario'   => trim($resultado->valor->usuario_Nombre)
					);
					$this->session->set_userdata($sesion_info); 
				}else{
					$this->session->set_userdata('_id_user', $resultado->valor->usuario_Id);
					$this->session->set_userdata('_id_sistema', $resultado->valor->usuario_Id);
					$this->session->set_userdata('_id_perfil', $resultado->valor->idRolApp);
					$this->session->set_userdata('_id_area', 0);
					$this->session->set_userdata('_id_empresa_rest', $resultado->valor->empresa_Id);
					$this->session->set_userdata('_empresa_rest', $resultado->valor->empresa_Nombre);
					$this->session->set_userdata('_id_empresa', $resultado->valor->empresa_Id);
					$this->session->set_userdata('_empresa', $resultado->valor->empresa_Nombre);
					$this->session->set_userdata('_id_contrato', $resultado->valor->contrato_Id);
					$this->session->set_userdata('_numero_contrato', $resultado->valor->contrato_Numero);
					$this->session->set_userdata('_permiso_rol', $resultado->valor->idRolApp);
					$this->session->set_userdata('_token', $resultado->mensaje);
					
					$this->session->set_userdata('_correo_usuario', trim($resultado->valor->usuario_Usuario));
					$this->session->set_userdata('_nombre_usuario', trim($resultado->valor->usuario_Nombre));
					
				}
			}else if(isset($resultado->mensaje)){
				echo '<center>'.$resultado->mensaje.'</center>';
			}else{
				echo '<center>Usuario no autorizado</center>';
			}
		}else if(is_null($this->session->_id_sistema)){
			echo '<center>Acceso denegado</center>';
		}

		if(!$this->session->_id_user){
			return;
		}
 
		//$myWS = new WS();
        //$myWS->url = 'https://api.telegram.org/bot1879347405:AAGuOUdaquRpauOoHPGcycge19yCunJBhS0/sendMessage?chat_id=-533315678&text=InicioSesion';
        //$dataWS = $myWS->peticion_get();
        //$dataWS;

		/*$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);*/

		if (in_array($this->session->_permiso_rol, array("4", "5", "6", "7", "8"))) {
			$Menu['menu'] = array((object)array('id_menu' => 5));
			$SubMenu['submenu'] = array((object)array('id_submenu' => 18));
			if($this->session->_permiso_rol == "8"){
				header("location:".base_url('Permisos/Ctrl_Permisos'));
				return;
			}
			if (in_array($this->session->_permiso_rol, array("4", "5", "6", "7"))) {
				//Dar de baja los permisos vencidos
				$this->Permisos->PasesVencidos();
			}
		}
		else{
			$Menu['menu'] = array((object)array());
			$SubMenu['submenu'] = array((object)array());
		}
	 
		$this->carabiner->js(
			array(
				array('inicio.js')
			)
		);

		$this->load->view('template/header',$this->titulo);
		$this->load->view('inicio', array_merge($Menu, $SubMenu));
		$this->load->view('template/footer');
	}
}
