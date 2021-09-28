<?php  
class Perfiles extends CI_Model
{
	function __construct(){
		parent:: __construct();
    }

    /*
    *Nombre:        getAll
    *Parámetros:    {}
    *Descripción:   Retorna todos los registros de perfiles
    */
    public function getAll(){
        $query = "SELECT * FROM v_getPerfiles";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getById
    *Parámetros:    {$id} => id del perfil
    *Descripción:   Retorna un registro especifico en los registros de perfiles
    */
    public function getById($id){
        $query = "SELECT * FROM v_getPerfiles WHERE id = $id";
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
    *Descripción:   Retorna todos los registros de los perfiles en 
    *               base a la especificación del estatus recibido
    */
    public function getByEstatus($estatus){
        $query = "SELECT * FROM v_getPerfiles WHERE estatus = $estatus";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }
    
    /*
    *Nombre:        getPermisos
    *Parámetros:    {$id,$estatus} => id del perfil, estatus (0 o 1)
    *Descripción:   Retorna los permisos que tiene asigando el perfil
    *               
    */
    public function getPermisos($id,$estatus){
        $query = "SELECT * FROM v_getPerfilPermisos WHERE id_perfil = $id";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }
    
    /*
    *Nombre:        getPermisosProfileByModule
    *Parámetros:    {$idperfil,$idmodulo,$estatus} => id del perfil, id del módulo, estatus (0 o 1)
    *Descripción:   Retorna los permisos del perfil de un módulo específico 
    *               
    */
    public function getPermisosProfileByModule($idperfil, $idmodulo, $estatus){
        $query = "SELECT * FROM v_getPerfilPermisos  WHERE id_perfil = $idperfil AND id_menu = $idmodulo";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }
	
    /*
    *Nombre:        add
    *Parámetros:    {$nombre,$permisos} => nombre del perfil y array permisos que contiene un array con los indices:
                        id            - id modulo
                        visualizacion - si tiene permisos de visualización (1,0)
                        registro      - si tiene permisos de registro (1,0)
                        modificacion  - si tiene permisos de modificación (1,0)
                        eliminacion   - si tiene permisos de dar de baja (1,0)
                        reactivar     - si tiene permisos de reactivar (1,0)
    *Descripción:   Realiza el almacenamiento de un nuevo perfil
    */
	public function add($nombre,$permisos){
        $idusuario = 1;
        $errores = 0;
        $datos = "<ul>";
        for ($i = 0; $i < sizeof($permisos); $i++) {
            $sp = "EXEC sp_addPerfilPermisos '$nombre',
                ".$permisos[$i]["id"].",
                ".$permisos[$i]["visualizacion"].",
                ".$permisos[$i]["registro"].",
                ".$permisos[$i]["modificacion"].",
                ".$permisos[$i]["eliminacion"].",
                ".$permisos[$i]["reactivar"].",
                $idusuario";
            $respuesta = $this->db->query($sp)->row();
            if($respuesta->Error == 1){
                $datos .= "<li>No. ".$permisos[$i]["id"]."</li>";
                $errores = 1;
            }
        }
        $datos .= "</ul>";
        
        if($errores == 1){
            $response = [
                'status' 	=> false,
                'message'	=> 'No fue posible realizar el registro de los siguientes permisos<br>'.$datos,
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
    *Parámetros:    {$id,$nombre,$permisos} => id del perfil,nombre del perfil y array permisos que contiene un array con los indices:
                        id            - id modulo
                        visualizacion - si tiene permisos de visualización (1,0)
                        registro      - si tiene permisos de registro (1,0)
                        modificacion  - si tiene permisos de modificación (1,0)
                        eliminacion   - si tiene permisos de dar de baja (1,0)
                        reactivar     - si tiene permisos de reactivar (1,0)
    *Descripción:   Realiza la actualización de los datos del perfil
    */
    public function up($id,$nombre,$permisos){
        $idusuario = 1;
        $errores = 0;
        $datos = "<ul>";
        for ($i = 0; $i < sizeof($permisos); $i++) {
            $sp = "EXEC sp_upPerfilPermisos $id,
                '$nombre',
                ".$permisos[$i]["id"].",
                ".$permisos[$i]["visualizacion"].",
                ".$permisos[$i]["registro"].",
                ".$permisos[$i]["modificacion"].",
                ".$permisos[$i]["eliminacion"].",
                ".$permisos[$i]["reactivar"].",
                $idusuario";
            $respuesta = $this->db->query($sp)->row();
            if($respuesta->Error == 1){
                $datos .= "<li>No. ".$permisos[$i]["id"]."</li>";
                $errores = 1;
            }
        }
        $datos .= "</ul>";
        
        if($errores == 1){
            $response = [
                'status' 	=> false,
                'message'	=> 'No fue posible realizar la actualización de los siguientes permisos<br>'.$datos,
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
    *Parámetros:    {$id} => id perfil
    *Descripción:   Realiza la inactivacion de un perfil en especifico
    */
    public function del($id){
        $idusuario = 1;
        $sp = "EXEC sp_delPerfil $id,$idusuario";
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
    *Parámetros:    {$id} => id perfil
    *Descripción:   Realiza la reactivacion de un perfil en especifico
    */
    public function en($id){
        $idusuario = 1;
        $sp = "EXEC sp_enPerfiles $id,$idusuario";
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