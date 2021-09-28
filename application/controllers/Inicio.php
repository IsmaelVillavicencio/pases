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
            '_id_user'       => $resultado->valor->usuario_Id,
            '_id_sistema'     => $resultado->valor->usuario_Id,
            '_id_empresa'  => $resultado->valor->empresa_Id,
            '_empresa'    => $resultado->valor->empresa_Nombre,
            //'_id_empresa'    => $response['data']->id,
            //'_empresa'      => $resultado->valor->empresa_Nombre,
            '_id_contrato'     => $resultado->valor->contrato_Id,
            '_numero_contrato'   => $resultado->valor->contrato_Numero,
            '_permiso_rol'    => $resultado->valor->idRolApp,
            '_token'      => $resultado->mensaje,
            '_correo_usuario'   => trim($resultado->valor->usuario_Usuario),
            '_nombre_usuario'   => trim($resultado->valor->usuario_Nombre)
          );
          $this->session->set_userdata($sesion_info); 
        }else{
          $this->session->set_userdata('_id_user', $resultado->valor->usuario_Id);
          $this->session->set_userdata('_id_sistema', $resultado->valor->usuario_Id);
          $this->session->set_userdata('_id_empresa', $resultado->valor->empresa_Id);
          $this->session->set_userdata('_empresa', $resultado->valor->empresa_Nombre);
          //$this->session->set_userdata('_id_empresa', $response['data']->id);
          //$this->session->set_userdata('_empresa', $resultado->valor->empresa_Nombre);
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
 
    /*$myWS = new WS();
        //$myWS->url = 'https://api.telegram.org/bot1879347405:AAGuOUdaquRpauOoHPGcycge19yCunJBhS0/sendMessage?chat_id=-533315678&text=InicioSesion';
        //$dataWS = $myWS->peticion_get();
        //$dataWS;/*$Menu['menu'] = $this->Menu->getMenuPermisosbyUser($this->session->_id_sistema);
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

    }else if (in_array($this->session->_permiso_rol, array("21", "22"))) {
      //ESTADO DE HECHOS
      //General Operador(21)
      //Validador(22)
      $Menu['menu'] = array((object)array('id_menu' => 7));
      $SubMenu['submenu'] = array((object)array());
      header("location:".base_url('EstadoHechos/Ctrl_EstadoHechos'));
      return;
    }else if (in_array($this->session->_permiso_rol, array("11", "12", "13", "14","15","16","20","25","26","27","31"))) {
      //BUQUES
      $Menu['menu'] = array((object)array('id_menu' => 4));
      if (in_array($this->session->_permiso_rol, array("11"))) {  // Perfil General , ve todo
       
        $SubMenu['submenu'] = array(
          //Buques
          (object)array('id_submenu' =>17), // Registro de Buque
          (object)array('id_submenu' =>45), // Planeación Operación Buque
          (object)array('id_submenu' =>46), // Confirmación de Marco Operativo
          (object)array('id_submenu' =>47), // Junta de Programacion
          (object)array('id_submenu' =>59), // Arribos y zarpes
          (object)array('id_submenu' =>73), // Solicitud Servicios portuarios
          (object)array('id_submenu' =>75), // Información de embarque de autoridades
          (object)array('id_submenu' =>60), // Capturar Información de Operacion
		      
          //Capitania
          (object)array('id_submenu' =>40), // Notificacion Arribo
          (object)array('id_submenu' =>43), // Aviso de Arribo a Autoridades
          (object)array('id_submenu' =>42), // Actualizacion Documentos
          (object)array('id_submenu' =>71), // Unir Documentos
          (object)array('id_submenu' =>41), // Solicitud Autorización de Arribo
          (object)array('id_submenu' =>48), // Solicitud Autorización de Fondeo
          (object)array('id_submenu' =>57), // Solicitud Autorización de Enmienda
          (object)array('id_submenu' =>58), // Solicitud Autorización de Despacho

          //Migracion
          (object)array('id_submenu' =>61), //Envío de Tripulantes al Arribo
          (object)array('id_submenu' =>62), //Envío de Pasajeros al Arribo
          (object)array('id_submenu' =>52), // Solicitud de internación como visitante sin permiso para realizar actividades remuneradas Autorizacioón de Internacion
          (object)array('id_submenu' =>53), // Solicitud de internación como visitante sin permiso para realizar actividades remuneradas Autorizacioón de Internacion por Autorizar
          (object)array('id_submenu' =>67), // Solicitud de Autorización de Desembarque
          (object)array('id_submenu' =>50), // Autorización de Desembarque
          (object)array('id_submenu' =>66), // Solicitud de Autorización de Embarque
          (object)array('id_submenu' =>63), // Autorización de Embarque
          (object)array('id_submenu' =>68), // Acta de arribo migración
          (object)array('id_submenu' =>69), //Envío de Tripulantes al Zarpe
          (object)array('id_submenu' =>70), //Envío de Pasajeros al Zarpe
          (object)array('id_submenu' =>65), // Aviso de Salida a Migración
          (object)array('id_submenu' =>74), // Acta de salida migración
          (object)array('id_submenu' =>76), // Solicitud de Despaco a Migracion

          //Sanidad
          (object)array('id_submenu' =>44), // Solicitud de Autorización de Libre Plática
          (object)array('id_submenu' =>49), // Autorización de Libre Plática

          //Senasica
          (object)array('id_submenu' =>56), // Supervisión de Descarga de Basura
		  //(object)array('id_submenu' =>38), // Validar Buque
          //(object)array('id_submenu' =>51), // Autorización de Desembarque
          //(object)array('id_submenu' =>60), //Operaciones
        );
      
	}else if (in_array($this->session->_permiso_rol, array("12"))) { //perfil operaciones(12)
	  $SubMenu['submenu'] = array(
		//Buques
		(object)array('id_submenu' =>17), // Registro de Buque
		(object)array('id_submenu' =>45), // Planeación Operación Buque
		(object)array('id_submenu' =>46), // Confirmación de Marco Operativo
		(object)array('id_submenu' =>47), // Junta de Programacion
		(object)array('id_submenu' =>59), // Arribos y zarpes
		(object)array('id_submenu' =>73), // Solicitud Servicios portuarios
    (object)array('id_submenu' =>75), // Información de embarque de autoridades
    (object)array('id_submenu' =>60), // Capturar Información de Operacion
		
		//Capitania
		(object)array('id_submenu' =>40), // Notificacion Arribo
		(object)array('id_submenu' =>43), // Aviso de Arribo a Autoridades
		(object)array('id_submenu' =>42), // Actualizacion Documentos
		(object)array('id_submenu' =>41), // Solicitud Autorización de Arribo
		(object)array('id_submenu' =>48), // Solicitud Autorización de Fondeo
		(object)array('id_submenu' =>57), // Solicitud Autorización de Enmienda
		(object)array('id_submenu' =>58), // Solicitud Autorización de Despacho

    //Senasica
    (object)array('id_submenu' =>56) // Supervisión de Descarga de Basura
		
	  );
	}else if (in_array($this->session->_permiso_rol, array("13"))) { //perfil migración(13)
	  $SubMenu['submenu'] = array(
		//Capitania
		(object)array('id_submenu' =>43), // Aviso de Arribo a Autoridades

		//Migracion
		(object)array('id_submenu' =>53), // Solicitud de internación como visitante sin permiso para realizar actividades remuneradas Autorizacioón de Internacion por Autorizar
		(object)array('id_submenu' =>50), // Autorización de Desembarque
		(object)array('id_submenu' =>63), // Autorización de Embarque
		(object)array('id_submenu' =>68), // Acta de arribo migración
		(object)array('id_submenu' =>65), // Aviso de Salida a Migración
		(object)array('id_submenu' =>74), // Acta de salida migración
    (object)array('id_submenu' =>76), // Solicitud de Despaco a Migracion
		
	  );
	  
	}else if (in_array($this->session->_permiso_rol, array("14"))) {  // Consignatarias  y Navieras      
	  $SubMenu['submenu'] = array(
		//Buques
		(object)array('id_submenu' =>17), // Registro de Buque
		(object)array('id_submenu' =>45), // Planeación Operación Buque
		(object)array('id_submenu' =>73), // Solicitud Servicios portuarios

		//Capitania
		(object)array('id_submenu' =>40), // Notificacion Arribo
		(object)array('id_submenu' =>43), // Aviso de Arribo a Autoridades
		(object)array('id_submenu' =>42), // Actualizacion Documentos
		(object)array('id_submenu' =>41), // Solicitud Autorización de Arribo
		(object)array('id_submenu' =>48), // Solicitud Autorización de Fondeo
		(object)array('id_submenu' =>57), // Solicitud Autorización de Enmienda
		(object)array('id_submenu' =>58), // Solicitud Autorización de Despacho//Migracion
		(object)array('id_submenu' =>61), //Envío de Tripulantes al Arribo
		(object)array('id_submenu' =>62), //Envío de Pasajeros al Arribo
		(object)array('id_submenu' =>52), // Solicitud de internación como visitante sin permiso para realizar actividades remuneradas Autorizacioón de Internacion
		(object)array('id_submenu' =>67), // Solicitud de Autorización de Desembarque
		(object)array('id_submenu' =>66), // Solicitud de Autorización de Embarque
		(object)array('id_submenu' =>69), //Envío de Tripulantes al Zarpe
		(object)array('id_submenu' =>70), //Envío de Pasajeros al Zarpe
		(object)array('id_submenu' =>65), // Aviso de Salida a Migración
		(object)array('id_submenu' =>76), // Solicitud de Despaco a Migracion

		//Sanidad
		(object)array('id_submenu' =>44), // Solicitud de Autorización de Libre Plática     
    
    //Senasica
    (object)array('id_submenu' =>56) // Supervisión de Descarga de Basura
	  );
	}else if (in_array($this->session->_permiso_rol, array("15"))) { //perfil sanidad(15)
	  $SubMenu['submenu'] = array(
		//Capitania
		(object)array('id_submenu' =>43), // Aviso de Arribo a Autoridades

		//Sanidad
		(object)array('id_submenu' =>49) // Autorización de Libre Plática

	  ); 
	}else if (in_array($this->session->_permiso_rol, array("16"))) { //perfil Operadora(16)
	  $SubMenu['submenu'] = array(
		//Buques
		(object)array('id_submenu' =>46) // Confirmación de Marco Operativo

	  );
	}else if (in_array($this->session->_permiso_rol, array("20"))) { //perfil CCTM(20)
	  $SubMenu['submenu'] = array(
		//Buques
		(object)array('id_submenu' =>59) // Arribos y zarpes
	  ); 
	}else if (in_array($this->session->_permiso_rol, array("23"))) { //perfil Aduana(23)
	  $SubMenu['submenu'] = array(
		//Capitania
		(object)array('id_submenu' =>43), // Aviso de Arribo a Autoridades
	  ); 
	}else if (in_array($this->session->_permiso_rol, array("25"))) { //perfil Capitania(25)
	  $SubMenu['submenu'] = array(
		//Buques
		(object)array('id_submenu' =>73) // Solicitud Servicios portuarios
	  );
	}else if (in_array($this->session->_permiso_rol, array("26"))) { //perfil Supervisor operaciones(26)
	  $SubMenu['submenu'] = array(
      //Buques
      (object)array('id_submenu' => 73) // Arribos y Zarpes
    ); 
	}else if (in_array($this->session->_permiso_rol, array("27"))) { //Cesionarios(27)
    $SubMenu['submenu'] = array(
    //Buques
    (object)array('id_submenu' =>46), // Confirmación de Marco Operativo
    (object)array('id_submenu' =>47), // Junta de Programacion
    (object)array('id_submenu' =>59) // Arribos y zarpes
    );
  }else if (in_array($this->session->_permiso_rol, array("31"))) { //SENASICA(31)
    $SubMenu['submenu'] = array(
    //Capitania
    (object)array('id_submenu' =>40), // Notificacion Arribo
    (object)array('id_submenu' =>43), // Aviso de Arribo a Autoridades

    //Senasica
    (object)array('id_submenu' =>56) // Supervisión de Descarga de Basura
    );
  }
	
	
  }else{
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