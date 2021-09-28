<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH."controllers/Sesion.php");
include_once './vendor/autoload.php';

class Ctrl_Permisos extends Sesion {

	private $titulo = array("titulo" => "Permisos");

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Permisos/Permisos');
		$this->load->Model('Sesiones/SubMenu');
		$this->load->Model('Sesiones/Menu');
		$this->load->helper('security');
		$this->load->library('WS');

		ini_set('memory_limit','256M'); // This also needs to be increased in some cases. Can be changed to a higher value as per need)
		ini_set('sqlsrv.ClientBufferMaxKBSize','524288'); // Setting to 512M
		ini_set('pdo_sqlsrv.client_buffer_max_kb_size','524288');
		set_time_limit(300);
	}

	public function index(){
		$this->carabiner->js(
			array(
				array('utilidades/WhatsappPermisos.js?token='.time()),
				array('permisos/index.js?token='.time())
			)
		);

		/*$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 18);*/
		$Menu['menu'] = array((object)array('id_menu' => 5));
		$SubMenu['submenu'] = array((object)array('id_submenu' => 18));
		$value["data"] = (object)array('id_usuario' => 0,'id_menu' => 5,'id_submenu' => 18,'C' => 1,'R' => 1,'U' => 1,'D' => 1,'A' => 1);

		/*if(!$value['data']){
			header("location:".base_url('inicio'));
			return;
		}
		
		if(!$value['data']->C && !$value['data']->R && !$value['data']->U && !$value['data']->D){
			header("location:".base_url('inicio'));
			return;
		}*/

		$data['permisos'] = json_decode(json_encode($value['data']), true);
		$data['permisos']['id_area'] = $this->session->_permiso_rol;

		$this->load->view('template/header',$this->titulo);
		$this->load->view('template/menu', array_merge($Menu, $SubMenu));
		$this->load->view('permisos/index', $data);
		$this->load->view('modales/confirmar_baja_motivo');
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
		$this->load->view('modales/registro_exitoso');
		$this->load->view('template/footer');
	}

	public function index_autorizadores(){
		$this->carabiner->js(
			array(
				array('utilidades/WhatsappPermisos.js?token='.time()),
				array('permisos/index_autorizadores.js?token='.time())
			)
		);

		$Menu['menu'] = array((object)array('id_menu' => 5));
		$SubMenu['submenu'] = array((object)array('id_submenu' => 18));
		$value["data"] = (object)array('id_usuario' => 0,'id_menu' => 5,'id_submenu' => 18,'C' => 1,'R' => 1,'U' => 1,'D' => 1,'A' => 1);

		$data['permisos'] = json_decode(json_encode($value['data']), true);
		$data['permisos']['id_area'] = $this->session->_permiso_rol;

		$this->load->view('template/header',$this->titulo);
		$this->load->view('template/menu', array_merge($Menu, $SubMenu));
		$this->load->view('permisos/index_autorizadores', $data);
		$this->load->view('modales/confirmar_baja_motivo');
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
		$this->load->view('modales/registro_exitoso');
		$this->load->view('template/footer');
	}

	public function registrar(){

		$this->carabiner->js(
			array(
				array('utilidades/validaciones.js?token='.time()),
				array('permisos/registrar.js?token='.time())
			)
		);

		/*$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 5);*/
		$Menu['menu'] = array((object)array('id_menu' => 5));
		$SubMenu['submenu'] = array((object)array('id_submenu' => 18));
		$value["data"] = (object)array('id_usuario' => 0,'id_menu' => 5,'id_submenu' => 18,'C' => 1,'R' => 1,'U' => 1,'D' => 1,'A' => 1);

		/*if(!$value['data']){
			header("location:".base_url('inicio'));
			return;
		}
		
		if((!$value['data']->C || $value['data']->C) && !$value['data']->R && !$value['data']->U && !$value['data']->D){
			header("location:".base_url('inicio'));
			return;
		}

		$permisos['permisos'] = json_decode(json_encode($value['data']), true);*/

		$this->load->view('template/header',$this->titulo);
		$this->load->view('template/menu', array_merge($Menu, $SubMenu));
		$this->load->view('permisos/registrar');
		$this->load->view('modales/confirmar_registro');
		$this->load->view('modales/confirmar_regresar');
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
		$this->load->view('modales/registro_exitoso');
		$this->load->view('template/footer');
    }

	public function consultar(){

		$this->carabiner->js(
			array(
				array('utilidades/validaciones.js?token='.time()),
				array('permisos/consultar.js?token='.time())
			)
		);

		/*$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 5);*/
		$Menu['menu'] = array((object)array('id_menu' => 5));
		$SubMenu['submenu'] = array((object)array('id_submenu' => 18));
		$value["data"] = (object)array('id_usuario' => 0,'id_menu' => 5,'id_submenu' => 18,'C' => 1,'R' => 1,'U' => 1,'D' => 1,'A' => 1);

		/*if(!$value['data']){
			header("location:".base_url('inicio'));
			return;
		}
		
		if(!$value['data']->R && !$value['data']->D){
			header("location:".base_url('inicio'));
			return;
		}*/

		$permisos['permisos'] = json_decode(json_encode($value['data']), true);

		$this->load->view('template/header',$this->titulo);
		$this->load->view('template/menu', array_merge($Menu, $SubMenu));
		$this->load->view('permisos/consultar', $permisos);
		$this->load->view('modales/confirmar_baja');
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
		$this->load->view('modales/registro_exitoso');
		$this->load->view('modales/autorizar_permiso_personal');
		$this->load->view('modales/autorizar_permiso_equipo');
		$this->load->view('modales/autorizar_permiso_vehiculo');
		$this->load->view('modales/confirmar_regresar');
		$this->load->view('template/footer');

	}

	public function extender(){

		$this->carabiner->js(
			array(
				array('utilidades/validaciones.js?token='.time()),
				array('permisos/extender.js?token='.time())
			)
		);

		/*$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 5);*/
		$Menu['menu'] = array((object)array('id_menu' => 5));
		$SubMenu['submenu'] = array((object)array('id_submenu' => 18));
		$value["data"] = (object)array('id_usuario' => 0,'id_menu' => 5,'id_submenu' => 18,'C' => 1,'R' => 1,'U' => 1,'D' => 1,'A' => 1);

		/*if(!$value['data']){
			header("location:".base_url('inicio'));
			return;
		}
		
		if(!$value['data']->R && !$value['data']->D){
			header("location:".base_url('inicio'));
			return;
		}*/

		$permisos['permisos'] = json_decode(json_encode($value['data']), true);

		$this->load->view('template/header',$this->titulo);
		$this->load->view('template/menu', array_merge($Menu, $SubMenu));
		$this->load->view('permisos/extender', $permisos);
		$this->load->view('modales/confirmar_registro');
		$this->load->view('modales/confirmar_regresar');
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
		$this->load->view('modales/registro_exitoso');
		$this->load->view('template/footer');

	}

	public function duplicar(){

		$this->carabiner->js(
			array(
				array('utilidades/validaciones.js?token='.time()),
				array('permisos/duplicar.js?token='.time())
			)
		);

		/*$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 5);*/
		$Menu['menu'] = array((object)array('id_menu' => 5));
		$SubMenu['submenu'] = array((object)array('id_submenu' => 18));
		$value["data"] = (object)array('id_usuario' => 0,'id_menu' => 5,'id_submenu' => 18,'C' => 1,'R' => 1,'U' => 1,'D' => 1,'A' => 1);

		/*if(!$value['data']){
			header("location:".base_url('inicio'));
			return;
		}
		
		if(!$value['data']->R && !$value['data']->D){
			header("location:".base_url('inicio'));
			return;
		}*/

		$permisos['permisos'] = json_decode(json_encode($value['data']), true);

		$this->load->view('template/header',$this->titulo);
		$this->load->view('template/menu', array_merge($Menu, $SubMenu));
		$this->load->view('permisos/duplicar', $permisos);
		$this->load->view('modales/confirmar_registro');
		$this->load->view('modales/confirmar_regresar');
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
		$this->load->view('modales/registro_exitoso');
		$this->load->view('template/footer');

	}

	public function autorizar(){

		$this->carabiner->js(
			array(
				array('utilidades/validaciones.js?token='.time()),
				array('permisos/autorizar.js?token='.time())
			)
		);

		/*$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
		$SubMenu['submenu'] = $this->SubMenu->getSubmenuPermisosbyUser($this->session->_id_sistema);
		$value = $this->SubMenu->getPermisosbyView($this->session->_id_sistema, 18);*/
		$Menu['menu'] = array((object)array('id_menu' => 5));
		$SubMenu['submenu'] = array((object)array('id_submenu' => 18));
		$value["data"] = (object)array('id_usuario' => 0,'id_menu' => 5,'id_submenu' => 18,'C' => 1,'R' => 1,'U' => 1,'D' => 1,'A' => 1);

		/*if(!$value['data']){
			header("location:".base_url('inicio'));
			return;
		}
		
		if(!$value['data']->R && !$value['data']->D){
			header("location:".base_url('inicio'));
			return;
		}*/

		$permisos['permisos'] = json_decode(json_encode($value['data']), true);
		$permisos['permisos']['id_area'] = $this->session->_permiso_rol;

		$this->load->view('template/header',$this->titulo);
		$this->load->view('template/menu', array_merge($Menu, $SubMenu));
		$this->load->view('permisos/autorizar', $permisos);
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
		$this->load->view('modales/autorizar_permiso_personal');
		$this->load->view('modales/autorizar_permiso_equipo');
		$this->load->view('modales/autorizar_permiso_vehiculo');
		$this->load->view('modales/registro_exitoso');
		$this->load->view('modales/confirmar_regresar');
		$this->load->view('modales/confirmar_baja_motivo');
		$this->load->view('template/footer');
	}
	public function administrar_permisos(){

		$this->carabiner->js(
			array(
				array('utilidades/validaciones.js?token='.time()),
				array('permisos/administrar_permisos.js?token='.time())
			)
		);

		$Menu['menu'] = array((object)array('id_menu' => 5));
		$SubMenu['submenu'] = array((object)array('id_submenu' => 18));
		$value["data"] = (object)array('id_usuario' => 0,'id_menu' => 5,'id_submenu' => 18,'C' => 1,'R' => 1,'U' => 1,'D' => 1,'A' => 1);

		/*if(!$value['data']){
			header("location:".base_url('inicio'));
			return;
		}
		
		if(!$value['data']->R && !$value['data']->D){
			header("location:".base_url('inicio'));
			return;
		}*/

		$permisos['permisos'] = json_decode(json_encode($value['data']), true);
		$permisos['permisos']['id_area'] = $this->session->_permiso_rol;

		$this->load->view('template/header',$this->titulo);
		$this->load->view('template/menu', array_merge($Menu, $SubMenu));
		$this->load->view('permisos/administrar_permisos', $permisos);
		//$this->load->view('permisos/administrar_permisos');
		$this->load->view('modales/confirmar_baja');
		$this->load->view('modales/error');
		$this->load->view('modales/error_sesion');
		$this->load->view('modales/registro_exitoso');
		$this->load->view('modales/confirmar_regresar');
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
				$idpermiso = $this->input->get("idpermiso");

				if($this->session->_permiso_rol == 4 ||$this->session->_permiso_rol == 5){
					$response = $this->Permisos->getAll($idpermiso);

					$empresa_name = '';

					foreach ($response['data'] as $value) {
						if($value->id_empresa != null){
							$dataWS = $this->getEmpressName($value->id_empresa);
							$empresa_name = $dataWS['data']['nombre'];
						}
						$value->empresa = $empresa_name;
						$empresa_name = '';
					}

					echo json_encode($response);
					return;
				}
				if($this->session->_permiso_rol == 8){
					$response = $this->Permisos->getAllByUser($idpermiso);
				}
				if($this->session->_permiso_rol == 6){
					$response = $this->Permisos->getAllAduana($idpermiso);
				}
				if($this->session->_permiso_rol == 7){
					$response = $this->Permisos->getAllMigracion($idpermiso);
				}
				if($this->session->_permiso_rol != 5 && $this->session->_permiso_rol != 6 && $this->session->_permiso_rol != 7 && $this->session->_permiso_rol != 8)
					$response = $this->Permisos->getAllByEstatus($idpermiso);


				$empresa_name = '';

				foreach ($response['data'] as $value) {
					if($value->id_empresa != null){
						$dataWS = $this->getEmpressName($value->id_empresa);
						$empresa_name = $dataWS['data']['nombre'];
					}
					$value->empresa = $empresa_name;
					$empresa_name = '';
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

	public function getAllAutorizadores(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null
		];

		try {
			if ($this->input->is_ajax_request()) {
				$datos = array(
					'nosolicitud'   => $this->input->get('nosolicitud'),
					'idvigencia'    => $this->input->get('idvigencia'),
					'noplaca'		=> $this->input->get('noplaca'),
					'nombrepersona' => $this->input->get('nombrepersona'),
					'fechainicio'	=> $this->input->get('fechainicio'),
					'fechatermino'	=> $this->input->get('fechatermino'),
					'idtipopermiso'	=> $this->input->get('idtipopermiso'),
					'idestatuspase'	=> $this->input->get('idestatuspase'),
					'idempresa'		=> $this->session->_id_empresa_rest,
					'permiso_rol'	=> 8
				);

				$response = $this->Permisos->getGridPermisos($datos);

				$empresa_name = '';

				foreach ($response['data'] as $value) {
					if($value->id_empresa != null){
						$dataWS = $this->getEmpressName($value->id_empresa);
						$empresa_name = $dataWS['data']['nombre'];
					}
					$value->empresa = $empresa_name;
					$empresa_name = '';
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

	public function getAllFiltro(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null
		];

		try {
			if ($this->input->is_ajax_request()) {
				$datos = array(
					'nombrepersona' => $this->input->get('nombrepersona'),
					'fechainicio'	=> $this->input->get('fechainicio'),
					'fechatermino'	=> $this->input->get('fechatermino'),
					'idtipopermiso'	=> $this->input->get('idtipopermiso'),
					'idestatuspase'	=> $this->input->get('idestatuspase'),
					'idempresa'		=> $this->input->get('idempresa')
				);
				$response = $this->Permisos->getAllFiltro($datos);
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

	public function getFiltro(){

		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null
		];

		try {
			if ($this->input->is_ajax_request()) {

				$datos = array(
					//'idarea'        => $this->input->get('idarea'),
					'fechainicio'	=> $this->input->get('fechainicio'),
					'fechatermino'	=> $this->input->get('fechatermino'),
					'nosolicitud'   => $this->input->get('nosolicitud'),
				    //'usuario'       => $this->input->get('usuario'),
					'identidad'     => $this->input->get('identidad'),
					'idvigencia'    => $this->input->get('idvigencia'),
					'idtipopermiso'	=> $this->input->get('idtipopermiso'),
					'idestatuspase'	=> $this->input->get('idestatuspase'),
					'nombrepersona'	=> $this->input->get('nombrepersona'),
					'noplaca'		=> $this->input->get('noplaca')
				);

				if($this->session->_permiso_rol == 4 ||$this->session->_permiso_rol == 5){
					$response = $this->Permisos->getFiltro($datos);
				}
				if($this->session->_permiso_rol == 6){
					$response = $this->Permisos->getFiltroAduana($datos);
				}
				if($this->session->_permiso_rol == 7){
					$response = $this->Permisos->getFiltroMigracion($datos);
				}
				if($this->session->_permiso_rol == 8){
					$response = $this->Permisos->getFiltroByUser($datos);
				}
			}
			/*if ($this->input->is_ajax_request()) {
				$datos = array(
					'idarea'        => $this->input->get('idarea'),
					'fechainicio'	=> $this->input->get('fechainicio'),
					'fechatermino'	=> $this->input->get('fechatermino'),
					'nosolicitud'   => $this->input->get('nosolicitud'),
					//'usuario'       => $this->input->get('usuario'),
					'identidad'     => $this->input->get('identidad'),
					'idvigencia'    => $this->input->get('idvigencia'),
					'idtipopermiso'	=> $this->input->get('idtipopermiso'),
					'idestatuspase'	=> $this->input->get('idestatuspase'),
	
				);
				$response = $this->Permisos->getFiltro($datos);
			}*/else{
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

	public function getDates(){
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

				$idpermiso = $this->security->xss_clean($this->input->get('idpermiso'));
				$response = $this->Permisos->getDates($idpermiso);
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

    public function getStatusPermisosByUser(){
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
				$response = $this->Permisos->getStatusPermisosByUser($id);
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

				$idpermiso = $this->security->xss_clean($this->input->get('idpermiso'));
				$response = $this->Permisos->getById($idpermiso);
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
				$response = $this->Permisos->getByEstatus($estatus);
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

	public function getPersonal(){
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

				$idpermiso = $this->security->xss_clean($this->input->get('idpermiso'));
				$response = $this->Permisos->getPersonalValidacion($idpermiso);
				$validado_por = '';

				foreach ($response['data'] as $value) {
					if($value->id_usuario_registro != null){
						$dataWS1 = $this->getValidatorName($value->id_usuario_registro);
						$validado_por .= $dataWS1['valor'];
					}
					if($value->id_usuario_registro != null && $value->id_usuario_registro_migracion != null){
						$validado_por .= ', ';
					}
					if($value->id_usuario_registro_migracion != null){
						$dataWS2 = $this->getValidatorName($value->id_usuario_registro_migracion);
						$validado_por .= $dataWS2['valor'];
					}
					$value->validadopor = $validado_por;
					$validado_por = '';
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

	public function getEquiposHerramientas(){
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

				$idpermiso = $this->security->xss_clean($this->input->get('idpermiso'));
				$response = $this->Permisos->getEquiposHerramientas($idpermiso);

				$validado_por = '';

				foreach ($response['data'] as $value) {
					if($value->id_usuario_registro != null){
						$dataWS = $this->getValidatorName($value->id_usuario_registro);
						$validado_por .= $dataWS['valor'];
					}
					$value->validadopor = $validado_por;
					$validado_por = '';
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

	public function getMateriales(){
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

				$idpermiso = $this->security->xss_clean($this->input->get('idpermiso'));
				$response = $this->Permisos->getMateriales($idpermiso);
				$validado_por = '';

				if($response['data']['info']->id_usuario_registro != null){
					$dataWS = $this->getValidatorName($response['data']['info']->id_usuario_registro);
					$validado_por .= $dataWS['valor'];
				}
				
				$response['data']['info']->validadopor = $validado_por;

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

	public function getVehiculos(){
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

				$idpermiso = $this->security->xss_clean($this->input->get('idpermiso'));
				$response = $this->Permisos->getVehiculos($idpermiso);

				$validado_por = '';

				foreach ($response['data'] as $value) {
					if($value->id_usuario_registro != null){
						$dataWS = $this->getValidatorName($value->id_usuario_registro);
						$validado_por .= $dataWS['valor'];
					}
					$value->validadopor = $validado_por;
					$validado_por = '';
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

	public function getPersonalById(){
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
				$idpermiso = $this->security->xss_clean($this->input->get('idpermiso'));
				$response = $this->Permisos->getPersonalById($id,$idpermiso);
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

	public function getEquiposHerramientasById(){
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
				$permiso = $this->security->xss_clean($this->input->get('permiso'));
				$response = $this->Permisos->getEquiposHerramientasById($id, $permiso);
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

	public function getVehiculosById(){
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
				$response = $this->Permisos->getVehiculosById($id);
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

	public function getVehiculosByPlacaPermiso(){
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

				$placa = $this->security->xss_clean($this->input->get('placa'));
				$permiso = $this->security->xss_clean($this->input->get('permiso'));
				$response = $this->Permisos->getVehiculosByPlacaPermiso($placa, $permiso);
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

	public function getEquipoBySerie(){
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

				$noserie = $this->security->xss_clean($this->input->get('noserie'));
				$response = $this->Permisos->getEquipoBySerie($noserie);
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

	public function getStatusPermisos(){
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
				$response = $this->Permisos->getStatusPermisos();
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

	public function addPermiso(){
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

				$datos = $this->security->xss_clean($this->input->post("datos"));
				$datos = json_decode($datos,true);
				$response = $this->Permisos->procesarDatos($datos);
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

	public function addPersonaGeneral($datos){
        $myWS = new WS();
        $myWS->url = 'https://pis-api-personas-qa.azurewebsites.net/';
		$myWS->token = $this->session->_token;
        //$resp = $myWS->login();

        $myWS->endpoint = 'api/Personas/v1';
        $myWS->parametros = $datos;
        $dataWS = $myWS->peticion_post();
        return $dataWS;
    }

	public function getEmpressName($userId){
        $myWS = new WS();
        $myWS->url = BASE_URL_REST;
		$myWS->token = $this->session->_token;
        //$resp = $myWS->login();

        $myWS->endpoint = 'empresas/'.$userId;
        $dataWS = $myWS->obtener_datos();
        return json_decode($dataWS, true);
    }

	public function getValidatorName($userId){
        $myWS = new WS();
        $myWS->url = BASE_URL_REST_LOGIN;
		$myWS->token = $this->session->_token;
        //$resp = $myWS->login();

        $myWS->endpoint = '/Usuario/v1/'.$userId.'/nombre';
        $dataWS = $myWS->obtener_datos();
        return json_decode($dataWS, true);
    }

	public function addPersonal(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null,
			'token' 	=> $this->security->get_csrf_hash()
		];

		//try {
			if ($this->input->is_ajax_request()) {
				if (!$this->input->post()){
					$response['data'] = 'Petición inválida';
					throw new Exception('Petición inválida');
				}

				$datos = $this->security->xss_clean($this->input->post());
				$datosResp = array();
				for ($i=0; $i < sizeof($datos['idpermiso']); $i++) {

					if($datos['id_personal_rest'][$i] == 0){
						$datosREST =  array(
							"nombre" => $datos['nombre'][$i],
							"apellido1" => $datos['primerApellido'][$i],
							"apellido2" => $datos['segundoApellido'][$i],
							"curp" => $datos['curp'][$i],
							"rfc" => "",
							"ssno" => $datos['numSeguroSocial'][$i],
							"tipoSanguineo" => "",
							"idLenel" => 0,
							"foto" => "",
							"idEmpresa" => $datos['idempresa'][$i],
							"empresa" => "",
							"enrolar" => false
						);
						$dataRESTPersona = $this->addPersonaGeneral($datosREST);

						if(!$dataRESTPersona['status']){
							$datos['id_personal_rest'][$i] = $dataRESTPersona["respuesta_rest"]->datos->id;
						}
					}

					$datos["tiposeguro"][$i] = 3;
					$datos["numeroseguro"][$i] = ($datos["noSeguro"][$i] != "") ? $datos["noSeguro"][$i] : '';

					if($datos["numSeguroSocial"][$i] != ""){
						$datos["tiposeguro"][$i] = 1;
						$datos["numeroseguro"][$i] = $datos["numSeguroSocial"][$i];
					}else if($datos["noIssste"][$i] != ""){
						$datos["tiposeguro"][$i] = 2;
						$datos["numeroseguro"][$i] = $datos["noIssste"][$i];
					}
					$response = $this->Permisos->addPersonal($datos,$i);
					if(isset($response['data']['id'])){
						//Cargar imagenes al servidor
						$config['allowed_types'] = "*";
						$config['max_size'] = "50000";
						$config['max_width'] = "2000";
						$config['max_height'] = "2000";
						$config['upload_path'] = "assets/uploads/permisos/personal";
						$this->load->library('upload', $config);
						
						//licencia
						if($datos["chofer"][$i] == 1){
							$mi_archivo = 'fotografiaLicencia-'.$i;
							if(isset($_FILES[$mi_archivo]['name'])){
								$datoLic = array(
									'idpersonal' => $response['data']['id'],
									//'idimagen' => 0,
									'idimagen' => $datos["idimagenlicencia"][$i],
									'idtipoidentificacion' => 'null',
									'numeroidentificacion' => $datos["noLicenica"][$i],
									'fechaexpiracion' => $datos["fechaVenciminetoLic"][$i],
									'tipo' => 1//Licencia
								);
	
								
								$config['file_name'] = date('YmdHis').$i.'1'.$response["data"]["id"];
								$dname = explode(".", $_FILES[$mi_archivo]['name']);
								$ext = end($dname);
	
								$this->upload->initialize($config);
								if ($this->upload->do_upload($mi_archivo)) {
									$datoLic['nombrearchivo'] = $config['file_name'].".".$ext;
									$datoLic['link'] = 'assets/uploads/permisos/personal/';
									$this->Permisos->addImagenesPersonal($datoLic);
								}
							}
						}
						//Identificacion
						$mi_archivo = 'fotografiaIdentificacion-'.$i;
						if(isset($_FILES[$mi_archivo]['name'])){
							$datoIdent = array(
								'idpersonal' => $response['data']['id'],
								'idimagen' => $datos["idimagenidentificacion"][$i],
								'idtipoidentificacion' => $datos["tipoIdentificacion"][$i],
								'numeroidentificacion' => '',
								'fechaexpiracion' => $datos["fechaVenciminetoIdent"][$i],
								'tipo' => 2//Identificacion
							);
	
							if($datos["claveElector"][$i] != ""){
								$datoIdent['numeroidentificacion'] = $datos["claveElector"][$i];
							}
							if($datos["noPasaporte"][$i] != ""){
								$datoIdent['numeroidentificacion'] = $datos["noPasaporte"][$i];
							}
							if($datos["libretaMar"][$i] != ""){
								$datoIdent['numeroidentificacion'] = $datos["libretaMar"][$i];
							}
							if($datos["itinerario"][$i] != ""){
								$datoIdent['numeroidentificacion'] = $datos["itinerario"][$i];
							}
	
							$config['file_name'] = date('YmdHis').$i.'2'.$response["data"]["id"];
							$dname = explode(".", $_FILES[$mi_archivo]['name']);
							$ext = end($dname);
	
							$this->upload->initialize($config);
							if ($this->upload->do_upload($mi_archivo)) {
								$datoIdent['nombrearchivo'] = $config['file_name'].".".$ext;
								$datoIdent['link'] = 'assets/uploads/permisos/personal/';
								$this->Permisos->addImagenesPersonal($datoIdent);
							}
						}

						//Fotografia
						$mi_archivo = 'fotografiapersona'.$i;
						if(isset($_FILES[$mi_archivo]['name'])){
							$datpPer = array(
								'idpersonal' => $response['data']['id'],
								//'idimagen' => 0,
								'idimagen' => $datos["idimagenpersona"][$i],
								//'idtipoidentificacion' => 'null',
								//'numeroidentificacion' => null,
								'idtipoidentificacion' => $datos["tipoIdentificacion"][$i],
								'numeroidentificacion' => '',
								'fechaexpiracion' => null,
								'tipo' => 3//Fotografia personal
							);
	
							$config['file_name'] = date('YmdHis').$i.'3'.$response["data"]["id"];
							$dname = explode(".", $_FILES[$mi_archivo]['name']);
							$ext = end($dname);
	
							$this->upload->initialize($config);
							if ($this->upload->do_upload($mi_archivo)) {
								$datpPer['nombrearchivo'] = $config['file_name'].".".$ext;
								$datpPer['link'] = 'assets/uploads/permisos/personal/';
								$this->Permisos->addImagenesPersonal($datpPer);
							}
						}
						$datosResp[$i] = $response['data']['id'];
					}
				}
				$response['data'] = $datosResp;
			}else{
				$response['data'] = 'Petición inválida';
				throw new Exception('Petición inválida');
			}
		//} 
		//catch (Exception $e) {
			//header("HTTP/1.0 400 " . utf8_decode($e->getMessage()));
		//}
		
		header('Content-type: application/json');
		echo json_encode($response);
		exit;
	}

	public function addEquipos(){
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

				$datos = $this->security->xss_clean($this->input->post());
				for ($i=0; $i < sizeof($datos['idpermiso']); $i++) {
					$response = $this->Permisos->addEquipos($datos,$i);
					if(isset($response['data']['id'])){
						$mi_archivo = 'fotografiaFactura-'.$i;
						if(isset($_FILES[$mi_archivo]['name'])){
							//Cargar imagenes al servidor
							$config['allowed_types'] = "*";
							$config['max_size'] = "50000";
							$config['max_width'] = "2000";
							$config['max_height'] = "2000";
							$config['upload_path'] = "assets/uploads/permisos/equipos";
							$this->load->library('upload', $config);
							//Factura Herramienta/Equipo
							$datEqFac = array(
								'idequipo' => $response['data']['id'],
								'idimagen' => $datos["idimagenfactura"][$i],
								'idtipodocumentovehiculo' => $datos["tipoDocumento"][$i],
								'numerodocumentovehiculo' => $datos["noFactura"][$i],
								'fechaexpiracion' => null,
								'tipo' => 4//Herramienta/Equipo
							);

							$config['file_name'] = date('YmdHis').$i.'4'.$response["data"]["id"];
							$dname = explode(".", $_FILES[$mi_archivo]['name']);
							$ext = end($dname);

							$this->upload->initialize($config);
							if ($this->upload->do_upload($mi_archivo)) {
								$datEqFac['nombre'] = $config['file_name'].".".$ext;
								$datEqFac['link'] = 'assets/uploads/permisos/equipos/';
								$this->Permisos->addImagenesEquipo($datEqFac);
							}
						}
						//Fotografia Equipo
						/*$datEquImg = array(
							'idequipo' => $response['data']['id'],
							'idimagen' => 0,
							'nombre' => '',
							'link' => '',
							'idtipodocumentovehiculo' => 'null',
							'numerodocumentovehiculo' => null,
							'fechaexpiracion' => null,
							'tipo' => 5//Herramienta/Equipo
						);

						$mi_archivo = 'fotografia-'.$i;
						$config['file_name'] = date('YmdHis').$i.'5'.$response["data"]["id"];
						$dname = explode(".", $_FILES[$mi_archivo]['name']);
						$ext = end($dname);

						$this->upload->initialize($config);
						if ($this->upload->do_upload($mi_archivo)) {
							$datEquImg['nombre'] = $config['file_name'].".".$ext;
							$datEquImg['link'] = 'assets/uploads/permisos/personal/';
							$this->Permisos->addImagenesEquipo($datEquImg);
						}*/
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

	public function addMateriales(){
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

				$datos = $this->security->xss_clean($this->input->post());
				$response = $this->Permisos->addListaMateriales($datos);
				$lista = $response['data']['id'];
				if(isset($response['data']['id'])){
					for ($i=0; $i < sizeof($datos['idpermiso']); $i++) {
						$response = $this->Permisos->addMateriales($datos,$i,$lista);
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

	public function addVehiculos(){
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

				$datos = $this->security->xss_clean($this->input->post());
				for ($i=0; $i < sizeof($datos['idpermiso']); $i++) { 
					$response = $this->Permisos->addVehiculos($datos,$i);
					if(isset($response['data']['id'])){
						//Cargar imagenes al servidor
						$config['allowed_types'] = "*";
						$config['max_size'] = "50000";
						$config['max_width'] = "2000";
						$config['max_height'] = "2000";
						$config['upload_path'] = "assets/uploads/permisos/vehiculos";
						$this->load->library('upload', $config);

						$mi_archivo = 'fotografiaFactura-'.$i;
						if(isset($_FILES[$mi_archivo]['name'])){
							//Factura Vehiculo
							$datVehFact = array(
								'idvehiculo' => $response['data']['id'],
								'idimagen' => 0,
								'idtipodocumentovehiculo' => $datos["tipoDocumento"][$i],
								'numerodocumentovehiculo' => $datos["noFactura"][$i],
								'fechaexpiracion' => null,
								'tipo' => 6//Factura vehiculo
							);

							$config['file_name'] = date('YmdHis').$i.'6'.$response["data"]["id"];
							$dname = explode(".", $_FILES[$mi_archivo]['name']);
							$ext = end($dname);

							$this->upload->initialize($config);
							if ($this->upload->do_upload($mi_archivo)) {
								$datVehFact['nombre'] = $config['file_name'].".".$ext;
								$datVehFact['link'] = 'assets/uploads/permisos/vehiculos/';
								$this->Permisos->addImagenesVehiculo($datVehFact);
							}
						}

						$mi_archivo = 'fotografiaLateral-'.$i;
						if(isset($_FILES[$mi_archivo]['name'])){
							//Fotografia Equipo
							$datVehLat = array(
								'idvehiculo' => $response['data']['id'],
								'idimagen' => 0,
								'idtipodocumentovehiculo' => 'null',
								'numerodocumentovehiculo' => null,
								'fechaexpiracion' => null,
								'tipo' => 7//Vehiculo lateral
							);

							$config['file_name'] = date('YmdHis').$i.'7'.$response["data"]["id"];
							$dname = explode(".", $_FILES[$mi_archivo]['name']);
							$ext = end($dname);

							$this->upload->initialize($config);
							if ($this->upload->do_upload($mi_archivo)) {
								$datVehLat['nombre'] = $config['file_name'].".".$ext;
								$datVehLat['link'] = 'assets/uploads/permisos/vehiculos/';
								$this->Permisos->addImagenesVehiculo($datVehLat);
							}
						}

						$mi_archivo = 'fotografiaPlaca-'.$i;
						if(isset($_FILES[$mi_archivo]['name'])){
							//Fotografia Placa
							$datVehPlaca = array(
								'idvehiculo' => $response['data']['id'],
								'idimagen' => 0,
								'idtipodocumentovehiculo' => 'null',
								'numerodocumentovehiculo' => null,
								'fechaexpiracion' => null,
								'tipo' => 8//Vehiculo lateral
							);

							$config['file_name'] = date('YmdHis').$i.'8'.$response["data"]["id"];
							$dname = explode(".", $_FILES[$mi_archivo]['name']);
							$ext = end($dname);

							$this->upload->initialize($config);
							if ($this->upload->do_upload($mi_archivo)) {
								$datVehPlaca['nombre'] = $config['file_name'].".".$ext;
								$datVehPlaca['link'] = 'assets/uploads/permisos/vehiculos/';
								$this->Permisos->addImagenesVehiculo($datVehPlaca);
							}
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

	public function addPeticionRepuve(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null,
			'token' 	=> $this->security->get_csrf_hash()
		];

		try {
			if ($this->input->is_ajax_request()) {
				$noserie = $this->security->xss_clean($this->input->get('noserie'));
				$noplaca = $this->security->xss_clean($this->input->get('noplaca'));

				if($noserie != ''){
					$datos = array('tipo' => 'SERIE', 'dato' => $noserie);
				}else{
					$datos = array('tipo' => 'PLACA', 'dato' => $noplaca);
				}
				$datos = json_encode($datos);

				$response = $this->Permisos->addPeticiones(1,$datos);
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

	public function upPersonalVerificacion(){
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

				$datos = $this->security->xss_clean($this->input->post());
				if($this->session->_permiso_rol == 5){
					$response = $this->Permisos->upPersonalVerificacion($datos);
				}
				if($this->session->_permiso_rol == 7){
					$response = $this->Permisos->upPersonalVerificacionMigracion($datos);
				}

				$validado_por = '';

				if($response['data']['id_usuario_registro'] != null){
					$dataWS = $this->getValidatorName($response['data']['id_usuario_registro']);
					$validado_por .= $dataWS['valor'];
				}
				
				$response['data']['nombre'] = $validado_por;

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

	public function upEquipoVerificacion(){
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
				$datos = $this->security->xss_clean($this->input->post());

				$response = $this->Permisos->upEquipoVerificacion($datos);

				$validado_por = '';

				if($response['data']['id_usuario_registro'] != null){
					$dataWS = $this->getValidatorName($response['data']['id_usuario_registro']);
					$validado_por .= $dataWS['valor'];
				}
				
				$response['data']['nombre'] = $validado_por;

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

	public function upMaterialVerificacion(){
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
				$datos = $this->security->xss_clean($this->input->post());
				$response = $this->Permisos->upMaterialVerificacion($datos);

				$validado_por = '';

				if($response['data']['id_usuario_registro'] != null){
					$dataWS = $this->getValidatorName($response['data']['id_usuario_registro']);
					$validado_por .= $dataWS['valor'];
				}
				
				$response['data']['nombre'] = $validado_por;

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

	public function upVehiculosVerificacion(){
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

				$datos = $this->security->xss_clean($this->input->post());
				$response = $this->Permisos->upVehiculosVerificacion($datos);

				$validado_por = '';

				if($response['data']['id_usuario_registro'] != null){
					$dataWS = $this->getValidatorName($response['data']['id_usuario_registro']);
					$validado_por .= $dataWS['valor'];
				}
				
				$response['data']['nombre'] = $validado_por;

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

	public function getPeticion(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null
		];

		try {
			if ($this->input->is_ajax_request()) {
				$response = $this->Permisos->getPeticiones($this->security->xss_clean($this->input->get('idpeticion')));
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

	public function addPeticionARCOS(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null,
			'token' 	=> $this->security->get_csrf_hash()
		];

		try {
			if ($this->input->is_ajax_request()) {
				$this->load->model('Catalogos/Documentos');

				$noserie = $this->security->xss_clean($this->input->get('noserie'));
				$datos = array('tipo' => 'SERIE', 'dato' => $noserie);
				$datos = json_encode($datos);

				$response = $this->Permisos->addPeticiones(3,$datos);
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

	public function addPeticionSIVEBU(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null,
			'token' 	=> $this->security->get_csrf_hash()
		];

		try {
			if ($this->input->is_ajax_request()) {
				$this->load->model('Catalogos/Documentos');

				$noserie = $this->security->xss_clean($this->input->get('noserie'));
				$datos = array('tipo' => 'SERIE', 'dato' => $noserie);
				$datos = json_encode($datos);

				$response = $this->Permisos->addPeticiones(5,$datos);
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

                $idpermiso = $this->security->xss_clean($this->input->post('idpermiso'));
                $observacion = $this->security->xss_clean($this->input->post('observacion'));
				$response = $this->Permisos->del($idpermiso, $observacion);
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

	public function delete_vencidos(){
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

                $idpermiso = $this->security->xss_clean($this->input->post('idpermiso'));
				$response = $this->Permisos->del_vencidos($idpermiso);
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

	public function upPermiso(){
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

				$datos = $this->security->xss_clean($this->input->post());
                $response = $this->Permisos->up($datos);
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

	public function upPermisoMigracion(){
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

				$datos = $this->security->xss_clean($this->input->post());
                $response = $this->Permisos->upPermisoMigracion($datos);
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

	public function updatePermiso(){
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

				$permiso = $this->security->xss_clean($this->input->post('permiso'));
				$columna = $this->security->xss_clean($this->input->post('columna'));
				$valortxt = $this->security->xss_clean($this->input->post('valortxt'));
				$valorint = $this->security->xss_clean($this->input->post('valorint'));
				if(is_numeric($valortxt) == 1){
					$valortxt = '';
					$valorint = $this->security->xss_clean($this->input->post('valortxt'));
				}else{
					$valortxt = $this->security->xss_clean($this->input->post('valortxt'));;
					$valorint = 0;
				}
				if($columna == 'autorizacion'){
					if($this->session->_permiso_rol == 5){
						$columna == 'autorizacion';
					}
					if($this->session->_permiso_rol == 6){
						$columna == 'autorizacion_aduana';
					}
					$valorint = mt_rand(100000, 999999);
					$valortxt = '';
				}
				$idusuario = $this->session->_id_user;
				$response = $this->Permisos->updatePermiso($permiso,$columna,$valortxt,$valorint,$idusuario);
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

	public function upPermisoMotivos(){
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

				$datos = $this->security->xss_clean($this->input->post());
                $response = $this->Permisos->rechazoMotivo($datos);
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

	public function getEstatusValidacion(){
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null
		];

		try {
			if ($this->input->is_ajax_request()) {
				$response = $this->Permisos->getEstatusValidacion($this->security->xss_clean($this->input->get('idpermiso')));
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

	public function enviar_correo(){
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

				//$this->load->library('Phpmailer_lib');

				// PHPMailer object
				/*$mail = $this->phpmailer_lib->load();

				$mail->CharSet = 'UTF-8';
				$mail->IsSMTP();
				$mail->SMTPDebug  = 0;
				$mail->SMTPAuth = true;
				$mail->SMTPSecure = 'ssl';
				$mail->Host = 'smtp.gmail.com';
				$mail->Port = 465;

				$mail->Username = "PISMANZANILLO@GMAIL.COM";
				$mail->Password = "pISmANZANILLO";*/


				$idpermiso = $this->security->xss_clean($this->input->post('idpermiso'));
                $response = $this->Permisos->getPersonal($idpermiso);
				foreach ($response["data"] as $row) {

					$email = new \SendGrid\Mail\Mail();
					$email->setFrom("pis-manzanillo@puertointeligenteseguro.mx","Puerto Inteligente Seguro");
					$email->setSubject("Permiso de acceso y credencial");
					
					//$mail->setFrom('PISMANZANILLO@GMAIL.COM', 'Puerto inteligente seguro');
					//$mail->AddReplyTo('aorozco@zonazero.info', 'Araceli Orozco Vadillo');
					//$mail->AddBCC($row->correo, $row->nombre);
					//$mail->AddAddress($row->correo, $row->nombre);
					//$mail->Subject = "Permiso de acceso y credencial";

					$meses[1] = 'Enero';
					$meses[2] = 'Febrero';
					$meses[3] = 'Marzo';
					$meses[4] = 'Abril';
					$meses[5] = 'Mayo';
					$meses[6] = 'Junio';
					$meses[7] = 'Julio';
					$meses[8] = 'Agosto';
					$meses[9] = 'Septiembre';
					$meses[10] = 'Octubre';
					$meses[11] = 'Noviembre';
					$meses[12] = 'Diciembre';
					
					$dia = date('d');
					$mes = $meses[((int)date('m'))];
					$anio = date('Y');

					$mensaje = "<h4>Colima, Col., $dia de $mes de $anio</h4>";
					$mensaje .= "<h4><b>".$row->nombre."<br>Presente</b></h4><br>";
					$mensaje .= "<h4><b>Apreciable ".$row->nombre_persona.":</b></h4>";
					
					$mensaje .= "<h4>Se ha autorizado el permiso de acceso<br>
					a continuacion se anexan los link donde podra consultar el permiso y la credencial:<br>
					Permiso de acceso: ".base_url('Permisos/Ctrl_Credencial/permiso/'.$row->id_pase)."<br>
					Credencial: ".base_url('Permisos/Ctrl_Credencial/credenciales/'.$row->id_pase.'/'.$row->id)."</h4>";

					/*$mail->MsgHTML($mensaje);

					if(!$mail->Send()){
						$response = [
							'status' 	=> false,
							'message'	=> 'No fue posible realizar el envió del correo electrónico',
							'data'		=> null
						];
					}else{
						$response = [
							'status' 	=> true,
							'message'	=> 'Correo electrónico enviado con éxito',
							'data'		=> null
						];
					}*/

					$email->addTo($row->correo, $row->nombre);
					$email->addTo("pismanzanillo@gmail.com", "PIS-COPY");
					$email->addContent("text/html",$mensaje);
					
					$sendgrid = new \SendGrid(SENDGRID_KEY);
					try {
						$response = $sendgrid->send($email);
						if($response->statusCode() == "202"){
							$response = [
								'status' 	=> true,
								'message'	=> 'Correo electrónico enviado con éxito',
								'data'		=> null
							];
						}else{
							$response = [
								'status' 	=> false,
								'message'	=> 'No fue posible realizar el envió del correo electrónico',
								'data'		=> null
							];
						}
					} catch (\Exception $ex) {
						$response = [
							'status' 	=> false,
							'message'	=> "SendGrid ".$ex->getMessage(),
							'data'		=> null
						];
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

	public function getObservacionesPermisos(){
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

				$idpermiso = $this->security->xss_clean($this->input->get('idpermiso'));
				$response = $this->Permisos->getObservacionesPermisos($idpermiso);
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
    *Nombre:        getAllTipoPermiso
    *Parámetros:    
    *Descripción:   Obtiene la lista de tipos de permiso
    */
    public function getAllTipoPermiso()
    {
        $response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null
		];

		try {
			if ($this->input->is_ajax_request()) {
                $response = $this->Permisos->getAllTipoPermiso();
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

	public function getAllStatusPermisos()
	{
		$response = [
			'status' 	=> false,
			'message'	=> '',
			'data'		=> null
		];

		try {
			if ($this->input->is_ajax_request()) {
				$response = $this->Permisos->getStatusPermisos();
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
	public function getFilter()
	{
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

				$data = $this->security->xss_clean($this->input->get());
				$response = $this->Permisos->getDataFilter($data);
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

	//SOLICITUDES DE PERMISOS DE CABOTAJE

	public function index_solicitud_cabotaje(){
		$this->carabiner->js(
			array(
				array('utilidades/validaciones.js'),
				array('permisos/solicitudes_permiso_cabotaje/index.js')
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
	public function registrar_solicitud_cabotaje(){
		$this->carabiner->js(
			array(
				array('utilidades/validaciones.js'),
				array('permisos/solicitudes_permiso_cabotaje/registrar.js')
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
	public function consultar_solicitud_cabotaje(){
		$this->carabiner->js(
			array(
				array('utilidades/validaciones.js'),
				array('permisos/solicitudes_permiso_cabotaje/consultar.js')
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
				array('utilidades/validaciones.js'),
				array('permisos/solicitudes_permiso_cabotaje/autorizar.js')
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