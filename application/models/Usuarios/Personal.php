<?php  
class Personal extends CI_Model
{
	function __construct(){
		parent:: __construct();
	}
	
    /*
    *Nombre:        getAll
    *Parámetros:    {}
    *Descripción:   Retorna todos los registros de personal
    */
	public function getAll(){
        $query = "SELECT * FROM v_getPersonas WHERE id_empresa LIKE '0%' OR id_empresa LIKE '%,0,%' OR id_empresa LIKE ',0%'";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
	}

	 /*
    *Nombre:        getById
    *Parámetros:    {$id} => id de personal
    *Descripción:   Retorna un registro especifico del personal
    */
	public function getById($id){
        $query = "SELECT * FROM v_getPersonas WHERE id = $id";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    public function getImagenesByIdPersonal($id){
        $query = "SELECT * FROM v_getImaganes WHERE id_personal = $id";
        $respuesta = $this->db->query($query)->first_row();
        return [
            'status'    => true,
            'message'   => '',
            'data'      => $respuesta
        ];
    }
    
    /*
    *Nombre:        getByEstatus
    *Parámetros:    {$estatus} => estatus (0 o 1)
    *Descripción:   Retorna todos los registros del personal
    *               base a la especificación del estatus recibido
    */
    public function getByEstatus($estatus = 1){
        $query = "SELECT * FROM v_getPersonas WHERE (id_empresa LIKE '0%' OR id_empresa LIKE '%,0,%' OR id_empresa LIKE ',0%') and estatus = $estatus";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }
    
    /*
    *Nombre:        getByCURP
    *Parámetros:    {$curp} => curp de personal
    *Descripción:   Retorna un registro especifico del personal
    */
    public function getByCURP($curp){
        $query = "SELECT distinct vgp.id, vgp.nombre, vgp.primer_apellido, vgp.segundo_apellido, vgp.nss, vgp.rfc, vgp.id_tipo_sangre,
		vgp.fecha_nacimiento, vgp.edad, vgp.sexo, vgp.id_area, vgp.estatus,vgp.ciudad_nacimiento,
		vgp.curp, vgp.id_nacionalidad, vgp.estado_nacimiento, vgp.id_denominacion, vgp.personalidad,
		vgp.constitucion, vgp.actividad, vgp.estatus_persona, vgp.observaciones, vgp.id_estado_nacimiento,
		vgp.id_tipo_seguro, vgp.id_tipo_aseguradora, vgp.sangre, vgp.id_contacto, vgp.correo, vgp.telefono,
		vgp.id_tipo_contacto, vgp.denominacion, vgp.nacionalidad,vgp.puestos,vgp.id_empresa, vgp.id_domicilio,
		vgp.id_tipo_domicilio,vgp.cp, vgp.id_estado, vgp.id_municipio, vgp.id_colonia,vgp.calle, vgp.n_ext, vgp.n_int,
		vgp.entre_calle_1, vgp.entre_calle_2,
		x.id_imagen_licencia, x.fotografia_licencia, x.numero_licencia, x.fecha_expiracion_licencia, 
		y.id_tipo_identificacion, y.numero_identificacion,
        y.id_imagen_identificacion, y.fotografia_identificacion, y.fecha_expiracion_identificacion,
        z.id_imagen_persona, z.fotografia_persona
        FROM v_getPersonas vgp
        left join (
        	-- Licencia
            SELECT ti.id as id_imagen_licencia,ti.id_personal, CONCAT(ti.link,ti.nombre) as fotografia_licencia,
          	ti.numero_identificacion as numero_licencia, ti.fecha_expiracion as fecha_expiracion_licencia
            FROM tbl_Imagenes ti 
            WHERE ti.id_tipo_toma = 1 and ti.id_personal is not NULL and ti.estatus = 1
        ) x on vgp.id = x.id_personal
        LEFT JOIN (
        	--Identificacion
            SELECT tbl_Imagenes.id as id_imagen_identificacion, CONCAT(tbl_Imagenes.link,tbl_Imagenes.nombre) as fotografia_identificacion, id_personal, 
            tbl_Imagenes.id_tipo_identificacion, tbl_Imagenes.numero_identificacion, fecha_expiracion as fecha_expiracion_identificacion
            FROM tbl_Imagenes
            WHERE id_tipo_toma = 2 and tbl_Imagenes.estatus = 1
        ) as y ON y.id_personal = vgp.id
        LEFT JOIN (
        	--Persona
            SELECT tbl_Imagenes.id as id_imagen_persona, CONCAT(tbl_Imagenes.link,tbl_Imagenes.nombre) as fotografia_persona, id_personal
            FROM tbl_Imagenes
            WHERE id_tipo_toma = 3 and tbl_Imagenes.estatus = 1
        ) as z ON z.id_personal = vgp.id
        WHERE vgp.curp = {$this->db->escape($curp)} and vgp.estatus = 1";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getByNSSPermisoData
    *Parámetros:    {$nss} => nss de personal
    *Descripción:   Retorna un registro especifico del personal
    */
    public function getByNSSPermisoData($nss){
        $query = "SELECT distinct vgp.id, vgp.nombre, vgp.primer_apellido, vgp.segundo_apellido, vgp.nss, vgp.rfc, vgp.id_tipo_sangre,
		vgp.fecha_nacimiento, vgp.edad, vgp.sexo, vgp.id_area, vgp.estatus,vgp.ciudad_nacimiento,
		vgp.curp, vgp.id_nacionalidad, vgp.estado_nacimiento, vgp.id_denominacion, vgp.personalidad,
		vgp.constitucion, vgp.actividad, vgp.estatus_persona, vgp.observaciones, vgp.id_estado_nacimiento,
		vgp.id_tipo_seguro, vgp.id_tipo_aseguradora, vgp.sangre, vgp.id_contacto, vgp.correo, vgp.telefono,
		vgp.id_tipo_contacto, vgp.denominacion, vgp.nacionalidad,vgp.puestos,vgp.id_empresa, vgp.id_domicilio,
		vgp.id_tipo_domicilio,vgp.cp, vgp.id_estado, vgp.id_municipio, vgp.id_colonia,vgp.calle, vgp.n_ext, vgp.n_int,
		vgp.entre_calle_1, vgp.entre_calle_2,
		x.id_imagen_licencia, x.fotografia_licencia, x.numero_licencia, x.fecha_expiracion_licencia, 
		y.id_tipo_identificacion, y.numero_identificacion,
        y.id_imagen_identificacion, y.fotografia_identificacion, y.fecha_expiracion_identificacion,
        z.id_imagen_persona, z.fotografia_persona
        FROM v_getPersonas vgp
        left join (
        	-- Licencia
            SELECT ti.id as id_imagen_licencia,ti.id_personal, CONCAT(ti.link,ti.nombre) as fotografia_licencia,
          	ti.numero_identificacion as numero_licencia, ti.fecha_expiracion as fecha_expiracion_licencia
            FROM tbl_Imagenes ti 
            WHERE ti.id_tipo_toma = 1 and ti.id_personal is not NULL and ti.estatus = 1
        ) x on vgp.id = x.id_personal
        LEFT JOIN (
        	--Identificacion
            SELECT tbl_Imagenes.id as id_imagen_identificacion, CONCAT(tbl_Imagenes.link,tbl_Imagenes.nombre) as fotografia_identificacion, id_personal, 
            tbl_Imagenes.id_tipo_identificacion, tbl_Imagenes.numero_identificacion, fecha_expiracion as fecha_expiracion_identificacion
            FROM tbl_Imagenes
            WHERE id_tipo_toma = 2 and tbl_Imagenes.estatus = 1
        ) as y ON y.id_personal = vgp.id
        LEFT JOIN (
        	--Persona
            SELECT tbl_Imagenes.id as id_imagen_persona, CONCAT(tbl_Imagenes.link,tbl_Imagenes.nombre) as fotografia_persona, id_personal
            FROM tbl_Imagenes
            WHERE id_tipo_toma = 3 and tbl_Imagenes.estatus = 1
        ) as z ON z.id_personal = vgp.id
        WHERE vgp.nss = {$this->db->escape($nss)} and vgp.estatus = 1";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }
    
    /*
    *Nombre:        getByRFC
    *Parámetros:    {$rfc} => rfc de personal
    *Descripción:   Retorna un registro especifico del personal
    */
    public function getByRFC($rfc){
        $query = "SELECT * FROM v_getPersonas WHERE rfc = {$this->db->escape($rfc)} and estatus = 1";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
	}

    /*
    *Nombre:        getByNSS
    *Parámetros:    {$nss} => nss de personal
    *Descripción:   Retorna un registro especifico del personal
    */
    public function getByNSS($nss){
        $query = "SELECT distinct vgp.id, z.id_imagen_persona, z.fotografia_persona
        FROM v_getPersonas vgp
        LEFT JOIN (
        	--Persona
            SELECT tbl_Imagenes.id as id_imagen_persona, CONCAT(tbl_Imagenes.link,tbl_Imagenes.nombre) as fotografia_persona, id_personal
            FROM tbl_Imagenes
            WHERE id_tipo_toma = 3 and tbl_Imagenes.estatus = 1
        ) as z ON z.id_personal = vgp.id
        WHERE vgp.nss = {$this->db->escape($nss)} and vgp.estatus = 1";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }
    
    /*
    *Nombre:        getDomicilio
    *Parámetros:    {$idpersonal} => id de personal
    *Descripción:   Retorna los datos del domicilio del personal de un registro en específico 
    *               en base al id 
    */
    public function getDomicilio($idpersonal){
        $query = "SELECT * FROM v_getDomicilios WHERE id_persona = $idpersonal and id_tipo_domicilio = 2";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }
    
    /*
    *Nombre:        getContacto
    *Parámetros:    {$idpersonal} => id de personal
    *Descripción:   Retorna los datos de contacto del personal de un registro en específico
    *               en base al id
    */
    public function getContacto($idpersonal){
        $query = "SELECT * FROM v_getContactos WHERE id_persona = $idpersonal and id_tipo_contacto = 2";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getContactoSolicitud
    *Parámetros:    {$idpersonal} => id de personal
    *Descripción:   Retorna la información del contacto de una persona de tipo física
    *               en base al id
    */
    public function getContactoSolicitud($idpersonal){
		$query = "SELECT tc.*
		FROM tbl_Personas tblp
		inner join det_Persona_Empresa_Puesto dpppf on tblp.id = dpppf.id_personafisica 
		inner join tbl_Contactos tc on dpppf.id_persona = tc.id_persona
		WHERE dpppf.id_personafisica = $idpersonal and dpppf.id_puesto = -2";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
	}
    
     /*
    *Nombre:        getContacotByCorreo
    *Parámetros:    {$correo} => correo de personal
    *Descripción:   Retorna los datos de contacto del personal de un registro en específico
    *               en base al correo
    */
    public function getContactoByCorreo($correo){
        $query = "SELECT * FROM v_getContactos WHERE correo = ".$this->db->escape($correo);
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }
    
    /*
    *Nombre:        getUniquePersonasUsuario
    *Parámetros:    {} =>
    *Descripción:   Retorna las personas que no se les a asignado un usuario 
    *               para acceder al sistema 
    */
    public function getUniquePersonasUsuario(){
        $query = "SELECT * FROM v_getPersonas WHERE (id_empresa LIKE '0%' OR id_empresa LIKE '%,0,%' OR id_empresa LIKE ',0%') and v_getPersonas.id NOT IN (SELECT id_persona FROM tbl_Usuarios WHERE estatus = 1)";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getUniquePersonasUsuario
    *Parámetros:    {} =>
    *Descripción:   Retorna 
    *               
    */
    public function getDirectorAPI(){
        $query = "SELECT * FROM v_getPersonas WHERE puestos like '%Director general%' and (id_empresa LIKE '0%' OR id_empresa LIKE '%,0,%' OR id_empresa LIKE ',0%')";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }
	
    /*
    *Nombre:        add
    *Parámetros:    {$datos} => array que contiene un array con los indices:
    *                   idpuesto         - id del puesto
    *                   idarea           - id del área
    *                   curp             - curp de la persona
    *                   nombre           - nombre de la persona
    *                   primerapellido   - primer apellido de la persona
    *                   segundoapellido  - segundo apellido de la persona
    *                   fechanacimiento  - fecha de nacimiento de la persona
    *                   edad             - edad de la persona
    *                   sexo             - sexo de la persona
    *                   estadonacimiento - id estaddo de nacimiento
    *                   ciudadnacimiento - ciudad de nacimiento de la persona
    *                   idnacionalidad   - id de nacionalidad
    *                   codigopostal     - código postal del domicilio de la persona
    *                   estado           - estado donde reside la persona
    *                   municipio        - municipio donde reside la persona
    *                   idcolonia        - id de la colonia
    *                   calle            - calle del domicilio de la persona
    *                   numint           - número interior del domicilio de la persona
    *                   numext           - número exterior del domicilio de la persona
    *                   entrecalle1      - entre calle 1 calle del domicilio de la persona
    *                   entrecalle2      - entre calle 2 calle del domicilio de la persona
    *                   correo           - correo de la persona
    *                   telefono         - teléfono de la persona
    *Descripción:   Realiza el almacenamiento de una nueva persona
    */
	public function add($datos){
        $idusuario = 1;
        $numint = ($datos["numint"] == "" ? 0 : $datos["numint"]);
        $sp = "EXEC sp_addPersonas ".$datos["idpuesto"].",
            ".$datos["idarea"].",
            0,
			'".$datos["curp"]."',
			'".$datos["nombre"]."',
			'".$datos["primerapellido"]."',
			'".$datos["segundoapellido"]."',
			'".$datos["fechanacimiento"]."',
			".$datos["edad"].",
			'".$datos["sexo"]."',
			".$datos["estadonacimiento"].",
            '".$datos["ciudadnacimiento"]."',
            ".$datos["idnacionalidad"].",
            ".$datos["iddenominacion"].",
			".$datos["idtiposangre"].",
			".$datos["codigopostal"].",
			".$datos["estado"].",
			".$datos["municipio"].",
			".$datos["idcolonia"].",
			'".$datos["calle"]."',
			$numint,
			".$datos["numext"].",
			'".$datos["entrecalle1"]."',
			'".$datos["entrecalle2"]."',
			'".$datos["correo"]."',
            '".$datos["telefono"]."',
            2,
			$idusuario";
        $respuesta = $this->db->query($sp)->row();
        if($respuesta->Error == 1){
            $response = [
                'status' 	=>  false,
                'message'	=>  'No fue posible realizar el registro',
                'error'     =>  $respuesta,
                'data'		=>  null,
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
    *Parámetros:    {$datos} => array que contiene un array con los indices:
    *                   idpersonal       - id de la persona
    *                   idpuesto         - id del puesto
    *                   idarea           - id del área
    *                   curp             - curp de la persona
    *                   nombre           - nombre de la persona
    *                   primerapellido   - primer apellido de la persona
    *                   segundoapellido  - segundo apellido de la persona
    *                   fechanacimiento  - fecha de nacimiento de la persona
    *                   edad             - edad de la persona
    *                   sexo             - sexo de la persona
    *                   estadonacimiento - id estaddo de nacimiento
    *                   ciudadnacimiento - ciudad de nacimiento de la persona
    *                   idnacionalidad   - id de nacionalidad
    *                   codigopostal     - código postal del domicilio de la persona
    *                   estado           - estado donde reside la persona
    *                   municipio        - municipio donde reside la persona
    *                   idcolonia        - id de la colonia
    *                   calle            - calle del domicilio de la persona
    *                   numint           - número interior del domicilio de la persona
    *                   numext           - número exterior del domicilio de la persona
    *                   entrecalle1      - entre calle 1 calle del domicilio de la persona
    *                   entrecalle2      - entre calle 2 calle del domicilio de la persona
    *                   correo           - correo de la persona
    *                   telefono         - teléfono de la persona
    *Descripción:   Realiza la actualización de los datos de una persona
    */
    public function up($datos){
        $idusuario = 1;
        $numint = ($datos["numint"] == "" ? 0 : $datos["numint"]);
		$sp = "EXEC sp_upPersonas ".$datos["idpuesto"].",
            ".$datos["idarea"].",
            ".$datos["idpersonal"].",
            '".$datos["curp"]."',
            '".$datos["nombre"]."',
            '".$datos["primerapellido"]."',
            '".$datos["segundoapellido"]."',
            '".$datos["fechanacimiento"]."',
            ".$datos["edad"].",
            '".$datos["sexo"]."',
            ".$datos["estadonacimiento"].",
            '".$datos["ciudadnacimiento"]."',
            ".$datos["idnacionalidad"].",
            ".$datos["iddenominacion"].",
            ".$datos["idtiposangre"].",
            ".$datos["iddomicilio"].",
            ".$datos["codigopostal"].",
            ".$datos["estado"].",
            ".$datos["municipio"].",
            ".$datos["idcolonia"].",
            '".$datos["calle"]."',
            $numint,
            ".$datos["numext"].",
            '".$datos["entrecalle1"]."',
            '".$datos["entrecalle2"]."',
            ".$datos["idcontacto"].",
            '".$datos["correo"]."',
            '".$datos["telefono"]."',
            2,
			$idusuario";
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
    *Parámetros:    {$id} => id personal
    *Descripción:   Realiza la inactivacion de una persona en especifico
    */
    public function del($id,$iddomicilio,$idcontacto){
        $idusuario = 1;
        $sp = "EXEC sp_delPersonas $id,$iddomicilio,$idcontacto,$idusuario";
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
    *Parámetros:    {$id} => id personal
    *Descripción:   Realiza la reactivacion de una persona en especifico
    */
    public function en($datos){
        $idusuario = 1;
        $nint = ($datos["nint"] == "" ? 0 : $datos["nint"]);
        $sp = "EXEC sp_revPersonas 
            ".$datos["idpersona"].",
            ".$datos["idpuesto"].",
            ".$datos["idarea"].",
            ".$datos["iddomicilio"].",
            ".$datos["cp"].",
            ".$datos["idestado"].",
            ".$datos["idmunicipio"].",
            ".$datos["idcolonia"].",
           '".$datos["calle"]."',
              $nint,
            ".$datos["next"].",
           '".$datos["entrecalleuno"]."',
           '".$datos["entrecalledos"]."',
            ".$datos["idcontacto"].",
           '".$datos["correo"]."',
           '".$datos["telefono"]."',
            $idusuario";
        
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