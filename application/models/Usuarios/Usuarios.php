<?php  
class Usuarios extends CI_Model
{
    private $idusuario;

	function __construct(){
		parent:: __construct();
        $this->idusuario = $this->session->_id_user;
    }
    
    /*
    *Nombre:        getAll
    *Parámetros:    {}
    *Descripción:   Retorna todos los registros de los usuarios
    */
    public function getAll(){
        $query = "SELECT * FROM v_getUsuarios WHERE id_usuario not in (1,38,50,51,52,57)";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getById
    *Parámetros:    {$id} => id de usuario
    *Descripción:   Retorna un registro especifico un usuario
    */
    public function getById($id){
        $query = "SELECT * FROM v_getUsuarios WHERE id_usuario = $id";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

     /*
    *Nombre:        getByIdPersona
    *Parámetros:    {$id} => id personal
    *Descripción:   Retorna los datos de una persona en específico en
    *               base a la especificación del id de personal
    */
    public function getByIdPersona($id){
        $query = "SELECT * FROM v_getUsuarios WHERE id_persona = $id";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    public function getByEstatus($estatus){
        $query = "SELECT * FROM v_getUsuarios WHERE estatus = $estatus";
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
    *Descripción:   Retorna todos los registros de los usuarios en
    *               base a la especificación del estatus recibido
    */
    public function getPermisos($id,$estatus){
        $query = "SELECT * FROM v_getPermisos WHERE id_usuario = $id AND estatus = $estatus";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getByCorreo
    *Parámetros:    {$correo, $idpersonal} => correo, id de personal
    *Descripción:   Retorna un registro especifico en base al correo electronico
    *               y opcionalmente un id con el que no se requiera comprobar
    */
    public function getByCorreo($correo,$idpersonal){
        $query = "SELECT tc.*
        from tbl_Usuarios tu 
        inner join tbl_Contactos tc on tu.id_persona = tc.id_persona 
        where tc.correo = '$correo'";
        ($idpersonal != 0) ? $query.= " and tu.id_persona <> $idpersonal" : "";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }
	
     /*
    *Nombre:        add
    *Parámetros:    {$idpersonal,$idperfil,$permisos} => id del personal, id del perfil, permisos del usuario
    *Descripción:   Realiza el almacenamiento de un nuevo usuario
    */
	public function add($idpersonal,$idperfil,$permisos){
        $errorPermisos = 0;
        $idusuario = 1;
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        //Temporal pwd
        $length = 10;
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        //end temporal pwd
        $pwd =  md5($randomString);

        $sp = "EXEC sp_addUsuarios $idpersonal,'$pwd',$idperfil,$idusuario";
        $respuesta = $this->db->query($sp)->row();
        if($respuesta->Error == 1){
             return $response = [
                'status' 	=> false,
                'message'	=> 'No fue posible realizar el registro',
                'data'		=> null
            ];
        }

        if($idperfil == 0){
            $datos = "<ul>";
            for ($i = 0; $i < sizeof($permisos); $i++) {
                $sp = "EXEC sp_addPermisos '$respuesta->id_usuario',
                    ".$permisos[$i]["id"].",
                    ".$permisos[$i]["registro"].",
                    ".$permisos[$i]["visualizacion"].",
                    ".$permisos[$i]["modificacion"].",
                    ".$permisos[$i]["eliminacion"].",
                    ".$permisos[$i]["reactivar"].",
                    $idusuario";
                $respuestaPermisos = $this->db->query($sp)->row();
                if($respuestaPermisos->Error == 1){
                    $datos .= "<li>No. ".$permisos[$i]["id"]."</li>";
                    $errorPermisos = 1;
                }
            }
            if($errorPermisos == 1){
                return $response = [
                    'status' 	=> false,
                    'message'	=> 'No fue posible realizar el registro de los siguientes permisos<br>'.$datos,
                    'data'		=> null,
                    'token' 	=> $this->security->get_csrf_hash()
                ];
            }
        }
        
        $datosemail = [
            'nombre' => $respuesta->nombre_completo,
            'correo' => $respuesta->correo
        ];

        $response = [
            'status' 	=> true,
            'message'	=> 'Registro Exitoso',
            'data'		=> $datosemail,
            'pwd'       => $randomString,
            'token' 	=> $this->security->get_csrf_hash()
        ];
        
        return $response;
    }

    /*
    *Nombre:        up
    *Parámetros:    {$id,$idperfil,$permisos} => id del usuario, id del perfil, permisos del usuario
    *Descripción:   Realiza la actualización de los datos del usuario
    */
    public function up($id,$idperfil,$permisos){

        $response = [
            'status' 	=> true,
            'message'	=> 'Registro Exitoso',
            'data'		=> null,
            'token' 	=> $this->security->get_csrf_hash()
        ];

        $errorPermisos = 0;
        $idusuario = 1;
        $pwd =  0;
        $sp = "EXEC sp_upUsuarios $id,'$pwd',$idperfil,$idusuario";
        $respuesta = $this->db->query($sp)->row();
        if($respuesta->Error == 1){
            return $response = [
                'status' 	=> false,
                'message'	=> 'No fue posible realizar el registro',
                'data'		=> null
            ];
        }

        if($respuesta->id_perfil == null && $idperfil == 0){
            $datos = "<ul>";
            for ($i = 0; $i < sizeof($permisos); $i++) {
                $sp = "EXEC sp_upPermisos '$id',
                    ".$permisos[$i]["id"].",
                    ".$permisos[$i]["registro"].",
                    ".$permisos[$i]["visualizacion"].",
                    ".$permisos[$i]["modificacion"].",
                    ".$permisos[$i]["eliminacion"].",
                    ".$permisos[$i]["reactivar"].",
                    $idusuario";
                $respuestaPermisos = $this->db->query($sp)->row();
                if($respuestaPermisos->Error == 1){
                    $datos .= "<li>No. ".$permisos[$i]["id"]."</li>";
                    $errorPermisos = 1;
                }
            }
            if($errorPermisos == 1){
                return $response = [
                    'status' 	=> false,
                    'message'	=> 'No fue posible realizar el registro de los siguientes permisos<br>'.$datos,
                    'data'		=> null,
                    'token' 	=> $this->security->get_csrf_hash()
                ];
            }
        }

        if($respuesta->id_perfil != null && $idperfil == 0){
            $datos = "<ul>";
            for ($i = 0; $i < sizeof($permisos); $i++) {
                $sp = "EXEC sp_addPermisos '$id',
                    ".$permisos[$i]["id"].",
                    ".$permisos[$i]["registro"].",
                    ".$permisos[$i]["visualizacion"].",
                    ".$permisos[$i]["modificacion"].",
                    ".$permisos[$i]["eliminacion"].",
                    ".$permisos[$i]["reactivar"].",
                    $idusuario";
                $respuestaPermisos = $this->db->query($sp)->row();
                if($respuestaPermisos->Error == 1){
                    $datos .= "<li>No. ".$permisos[$i]["id"]."</li>";
                    $errorPermisos = 1;
                }
            }
            if($errorPermisos == 1){
                return $response = [
                    'status' 	=> false,
                    'message'	=> 'No fue posible realizar el registro de los siguientes permisos<br>'.$datos,
                    'data'		=> null,
                    'token' 	=> $this->security->get_csrf_hash()
                ];
            }
        }
        return $response;
    }

    public function upPassword($id, $pwd,$idperfil){
        $response = [
            'status' 	=> true,
            'message'	=> 'Contraseña actualizada con éxito',
            'data'		=> null,
            'token' 	=> $this->security->get_csrf_hash()
        ];

        $sp = "EXEC sp_upUsuarios $id,'$pwd',$idperfil,".$this->idusuario;
        $respuesta = $this->db->query($sp)->row();
        if($respuesta->Error == 1){
            return $response = [
                'status' 	=> false,
                'message'	=> 'No fue posible realizar la actualizacion de la contraseña',
                'data'		=> null
            ];
        }

        return $response;
    }

    /*
    *Nombre:        del
    *Parámetros:    {$id} => id usuario
    *Descripción:   Realiza la inactivacion de un usuario en específico
    */
    public function del($id){
        $idusuario = 1;
        $sp = "EXEC sp_delUsuarios $id,$idusuario";
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
    *Parámetros:    {$id} => id usuario
    *Descripción:   Realiza la reactivacion de un usuario en específico
    */
    public function en($id){
        $idusuario = 1;
        $sp = "EXEC sp_enUsuarios $id,$idusuario";
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