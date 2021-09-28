<?php  
class SubMenu extends CI_Model
{
	function __construct(){
		parent:: __construct();
    }
    
	/*
    *Nombre:        getAll
    *Parámetros:    {}
    *Descripción:   Retorna todos los registros del submenu
    */
    public function getAll(){
        $query = "SELECT * FROM tbl_Submenu";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

	/*
    *Nombre:        getById
    *Parámetros:    {$id} => id de submenu
    *Descripción:   Retorna un registro especifico del submenu
    */
    public function getById($id){
        $query = "SELECT * FROM tbl_Submenu WHERE id = $id";
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
    *Descripción:   Retorna todos los registros del submenu en 
    *               base a la especificación del estatus recibido
    */
    public function getByEstatus($estatus = 1){
        $query = "SELECT ts.id,ts.nombre as submenu,ts.link,ts.id_menu,ts.estatus,tm.nombre as menu
		FROM tbl_Submenu ts
		INNER JOIN tbl_Menu tm on ts.id_menu = tm.id 
		WHERE ts.estatus = $estatus";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
	}

	/*
    *Nombre:        getByMenu
    *Parámetros:    {$id,$estatus} => id del menu, estatus (0 o 1)
    *Descripción:   Retorna todos los registros del submenu en 
    *               base a la especificación del id del menu y estatus recibido
    */
	public function getByMenu($id,$estatus = 1){
        $query = "SELECT ts.id,ts.nombre as submenu,ts.link,ts.id_menu,ts.estatus,tm.nombre as menu
		FROM tbl_Submenu ts
		INNER JOIN tbl_Menu tm on ts.id_menu = tm.id 
		WHERE id_menu = $id and ts.estatus = $estatus";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
	}

	/*
    *Nombre:        getSubmenuPermisosbyUser
    *Parámetros:    {$id_usuario} => id usuario del sistema
    *Descripción:   Retorna el id del sub menu al que el usuario tiene permiso acceder
    */
	public function getSubmenuPermisosbyUser($id_usuario){
        $query = "SELECT DISTINCT id_submenu FROM v_getPermisos WHERE id_usuario = $id_usuario AND estatus = 1 AND (\"C\" = 1 OR \"R\" = 1 OR \"U\" = 1 OR \"D\" = 1)";
		$respuesta = $this->db->query($query)->result();
        return $respuesta;
	}
	
	/*
    *Nombre:        getPermisosbyView
    *Parámetros:    {$id_usuario,$id_view} => id usuario del sistema, id de la vista
    *Descripción:   Retorna el id del sub menu al que el usuario tiene permiso acceder
    */
	public function getPermisosbyView($id_usuario, $submenu){
		$query = "SELECT * FROM v_getPermisos WHERE id_usuario = $id_usuario AND id_submenu = $submenu AND estatus = 1";
		$respuesta = $this->db->query($query)->row();
        if(!$respuesta){
			return [
				'status' 	=> false,
				'message'	=> '',
				'data'		=> null
			];
		}else{
			return [
				'status' 	=> true,
				'message'	=> '',
				'data'		=> $respuesta
			];
		}
	}
}