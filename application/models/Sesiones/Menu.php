<?php  
class Menu extends CI_Model
{
	function __construct(){
		parent:: __construct();
    }
    
    /*
    *Nombre:        getAll
    *Parámetros:    {}
    *Descripción:   Retorna todos los registros del menu
    */
    public function getAll(){
        $query = "SELECT * FROM tbl_Menu";
        $respuesta = $this->db->query($query)->result();
        return [
          'status' 	=> true,
          'message'	=> '',
          'data'		=> $respuesta
        ];
    }

    /*
    *Nombre:        getById
    *Parámetros:    {$id} => id de menu
    *Descripción:   Retorna un registro especifico del menu
    */
    public function getById($id){
        $query = "SELECT * FROM tbl_Menu WHERE id = $id";
        $respuesta = $this->db->query($query)->result();
        return [
          'status' 	=> true,
          'message'	=> '',
          'data'		=> $respuesta
        ];
    }

    /*
    *Nombre:        getByEstatus
    *Parámetros:    {$estatus} => estatus (0 o 1)
    *Descripción:   Retorna todos los registros del menu en 
    *               base a la especificación del estatus recibido
    */
    public function getByEstatus($estatus = 1){
        $query = "SELECT * FROM tbl_Menu WHERE estatus = $estatus";
        $respuesta = $this->db->query($query)->result();
        return [
          'status' 	=> true,
          'message'	=> '',
          'data'		=> $respuesta
        ];
    }

    /*
    *Nombre:        getMenuPermisosbyUser
    *Parámetros:    {$id_usuario} => id usuario del sistema
    *Descripción:   Retorna el id del menu al que el usuario tiene permiso acceder
    */
    public function getMenuPermisosbyUser($id_usuario){
        $query = "SELECT DISTINCT id_menu FROM v_getPermisos WHERE id_submenu IN (SELECT DISTINCT id_submenu FROM v_getPermisos WHERE id_usuario = $id_usuario AND estatus = 1 AND (\"C\" = 1 OR \"R\" = 1 OR \"U\" = 1 OR \"D\" = 1))";
		    $respuesta = $this->db->query($query)->result();
        return $respuesta;
    }
}