<?php  
class TiposEmpleados extends CI_Model
{
	function __construct(){
		parent:: __construct();
    $this->idusuario = $this->session->_id_user;
    }
    
    /*
    *Nombre:        getAll
    *Parámetros:    {}
    *Descripción:   Retorna todos los registros del catalogo de tipos de empleado
    */
    public function getAll(){
      $query = "SELECT * FROM v_getTipoEmpleado";
      $respuesta = $this->db->query($query)->result();
      return [
        'status' 	=> true,
        'message'	=> '',
        'data'		=> $respuesta
      ];
    }

     /*
    *Nombre:        getById
    *Parámetros:    {$id} => id de tipo empleado
    *Descripción:   Retorna un registro especifico del catalogo de tipos empleado
    */
    public function getById($id){
      $query = "SELECT * FROM v_getTipoEmpleado WHERE id_tipo_empleado = $id";
      $respuesta = $this->db->query($query)->row();
      return [
        'status' 	=> true,
        'message'	=> '',
        'data'		=> $respuesta
      ];
    }

    /*
    *Nombre:        getByEstatus
    *Parámetros:    {$estatus} => estatus (0 o 1)
    *Descripción:   Retorna todos los registros del catalogo de tipos de empleado en 
    *               base a la especificación del estatus recibido
    */
    public function getByEstatus($estatus = 1){
        $query = "SELECT * FROM cat_tipo_Empleado WHERE estatus = $estatus";
        $respuesta = $this->db->query($query)->result();
        return [
          'status' 	=> true,
          'message'	=> '',
          'data'		=> $respuesta
        ];
    }

     /*
    *Nombre:        add
    *Parámetros:    {$nombre, $nombrecorto} => nombre, nombre corto
    *Descripción:   Realiza el almacenamiento de un nuevo tipo de empleado
    */
    public function add($nombre,$nombrecorto){
      $sp = "EXEC sp_addTipoEmpleado '$nombre','$nombrecorto',".$this->idusuario;
      $respuesta = $this->db->query($sp)->row();
      if($respuesta->Error == 1){
          $response = [
              'status' 	=> false,
              'message'	=> 'No fue posible realizar el registro',
              'data'		=> null,
              'token' 	=> $this->security->get_csrf_hash()
          ];
      }else{
          $response = [
              'status' 	=> true,
              'message'	=> 'Registro Exitoso',
              'data'		=> null,
              'token' 	=> $this->security->get_csrf_hash()
          ];
      }
      return $response;
  }

  /*
    *Nombre:        up
    *Parámetros:    {$id,$nombre, $nombrecorto} => id tipo empleado, nombre, nombre corto
    *Descripción:   Realiza la actualización de los datos de un tipo de empleado en especifico
    */
    public function up($id,$nombre,$nombrecorto){
      $sp = "EXEC sp_upTipoEmpleado $id,'$nombre','$nombrecorto',".$this->idusuario;
      $respuesta = $this->db->query($sp)->row();
      if($respuesta->Error == 1){
          $response = [
              'status' 	=> false,
              'message'	=> 'No fue posible realizar la actualización',
              'data'		=> null,
              'token' 	=> $this->security->get_csrf_hash()
          ];
      }else{
          $response = [
              'status' 	=> true,
              'message'	=> 'Registro Exitoso',
              'data'		=> null,
              'token' 	=> $this->security->get_csrf_hash()
          ];
      }
      return $response;
  }

  /*
    *Nombre:        del
    *Parámetros:    {$id} => id tipo empleado
    *Descripción:   Realiza la inactivacion de un tipo de empleado en especifico
    */
    public function del($id){
      $sp = "EXEC sp_delTipoEmpleado $id,".$this->idusuario;
      $respuesta = $this->db->query($sp)->row();
      if($respuesta->Error == 1){
          $response = [
              'status' 	=> false,
              'message'	=> 'No fue posible realizar la eliminación',
              'data'		=> null,
              'token' 	=> $this->security->get_csrf_hash()
          ];
      }else{
          $response = [
              'status' 	=> true,
              'message'	=> 'Baja exitosa',
              'data'		=> null,
              'token' 	=> $this->security->get_csrf_hash()
          ];
      }
      return $response;
  }

  /*
    *Nombre:        en
    *Parámetros:    {$id} => id tipo empleado
    *Descripción:   Realiza la reactivacion de un tipo de empleado en especifico
    */
    public function en($id){
      $sp = "EXEC sp_revTipoEmpleado $id,".$this->idusuario;
      $respuesta = $this->db->query($sp)->row();
      if($respuesta->Error == 1){
          $response = [
              'status' 	=> false,
              'message'	=> 'No fue posible realizar la activación',
              'data'		=> null,
              'token' 	=> $this->security->get_csrf_hash()
          ];
      }else{
          $response = [
              'status' 	=> true,
              'message'	=> 'Reactivación exitosa',
              'data'		=> null,
              'token' 	=> $this->security->get_csrf_hash()
          ];
      }
      return $response;
  }

















}