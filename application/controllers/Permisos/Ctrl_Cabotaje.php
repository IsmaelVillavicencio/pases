<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH."controllers/Sesion.php");
include_once './vendor/autoload.php';

class Ctrl_Cabotaje extends Sesion {

	private $titulo = array("titulo" => "Cabotaje");

	public function __construct()
	{
		parent::__construct();
		//$this->load->model('Permisos/Permisos');
		$this->load->Model('Sesiones/SubMenu');
		$this->load->Model('Sesiones/Menu');
		$this->load->helper('security');
		$this->load->library('WS');

		ini_set('memory_limit','256M'); // This also needs to be increased in some cases. Can be changed to a higher value as per need)
		ini_set('sqlsrv.ClientBufferMaxKBSize','524288'); // Setting to 512M
		ini_set('pdo_sqlsrv.client_buffer_max_kb_size','524288');
		set_time_limit(300);
	}

    //SOLICITUDES DE PERMISOS DE CABOTAJE

	public function index(){
		$this->carabiner->js(
			array(
				array('utilidades/validaciones.js?token='.time()),
				array('permisos/solicitudes_permiso_cabotaje/index.js?token='.time())
			)
		);

		$Menu['menu'] = array((object)array('id_menu' => 5));
		$SubMenu['submenu'] = array((object)array('id_submenu' => 18));
		$value["data"] = (object)array('id_usuario' => 0,'id_menu' => 5,'id_submenu' => 18);

		/*$data['permisos'] = json_decode(json_encode($value['data']), true);
		$data['permisos']['id_area'] = $this->session->_permiso_rol;*/

		$this->load->view('template/header',$this->titulo);
		$this->load->view('template/menu', array_merge($Menu, $SubMenu));
		//$this->load->view('permisos/solicitudes_permiso_cabotaje/index', $data);
		$this->load->view('permisos/solicitudes_permiso_cabotaje/index');
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
        $this->load->view('modales/confirmar_registro');
		$this->load->view('modales/registro_exitoso');
        $this->load->view('modales/confirmar_regresar');
		$this->load->view('modales/confirmar_baja_motivo');
		$this->load->view('template/footer');
	}
	public function registrar(){
		$this->carabiner->js(
			array(
				array('utilidades/validaciones.js?token='.time()),
				array('permisos/solicitudes_permiso_cabotaje/registrar.js?token='.time())
			)
		);

		$Menu['menu'] = array((object)array('id_menu' => 5));
		$SubMenu['submenu'] = array((object)array('id_submenu' => 18));
		$value["data"] = (object)array('id_usuario' => 0,'id_menu' => 5,'id_submenu' => 18);

		$this->load->view('template/header',$this->titulo);
		$this->load->view('template/menu', array_merge($Menu, $SubMenu));
		$this->load->view('permisos/solicitudes_permiso_cabotaje/registrar');
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
        $this->load->view('modales/confirmar_registro');
		$this->load->view('modales/registro_exitoso');
        $this->load->view('modales/confirmar_regresar');
		$this->load->view('modales/confirmar_baja_motivo');
		$this->load->view('template/footer');
	}
	public function consultar(){
		$this->carabiner->js(
			array(
				array('utilidades/validaciones.js?token='.time()),
				array('permisos/solicitudes_permiso_cabotaje/consultar.js?token='.time())
			)
		);

		$Menu['menu'] = array((object)array('id_menu' => 5));
		$SubMenu['submenu'] = array((object)array('id_submenu' => 18));
		$value["data"] = (object)array('id_usuario' => 0,'id_menu' => 5,'id_submenu' => 18);

		$this->load->view('template/header',$this->titulo);
		$this->load->view('template/menu', array_merge($Menu, $SubMenu));
		$this->load->view('permisos/solicitudes_permiso_cabotaje/consultar');
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
        $this->load->view('modales/confirmar_registro');
		$this->load->view('modales/registro_exitoso');
        $this->load->view('modales/confirmar_regresar');
		$this->load->view('modales/confirmar_baja_motivo');
		$this->load->view('template/footer');
	}
	public function autorizar_solicitud_cabotaje(){
		$this->carabiner->js(
			array(
				array('utilidades/validaciones.js?token='.time()),
				array('permisos/solicitudes_permiso_cabotaje/autorizar.js?token='.time())
			)
		);

		$Menu['menu'] = array((object)array('id_menu' => 5));
		$SubMenu['submenu'] = array((object)array('id_submenu' => 18));
		$value["data"] = (object)array('id_usuario' => 0,'id_menu' => 5,'id_submenu' => 18);

		$this->load->view('template/header',$this->titulo);
		$this->load->view('template/menu', array_merge($Menu, $SubMenu));
		$this->load->view('permisos/solicitudes_permiso_cabotaje/autorizar');
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
        $this->load->view('modales/confirmar_registro');
		$this->load->view('modales/registro_exitoso');
        $this->load->view('modales/confirmar_regresar');
		$this->load->view('modales/confirmar_baja_motivo');
		$this->load->view('template/footer');
	}
}