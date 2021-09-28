<?php  
class Directivos extends CI_Model
{
	function __construct(){
		parent:: __construct();
    }
    
    /*
    *Nombre:        getAll
    *Parámetros:    {}
    *Descripción:   Retorna todos los registros de directivos
    */
    public function getAll(){
        $query = "SELECT * FROM v_getDirectivos";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getById
    *Parámetros:    {$id} => id de area
    *Descripción:   Retorna un registro especifico de directivo
    */
    public function getById($id){
        $query = "SELECT * FROM v_getDirectivos WHERE id = $id";
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
    *Descripción:   Retorna todos los registros de los directivos en
    *               base a la especificación del estatus recibido
    */
    public function getByEstatus($estatus = 1){
        $query = "SELECT * FROM v_getDirectivos WHERE estatus_directivos = $estatus";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getByPersonalRol
    *Parámetros:    {$idpersonal,$idnombramiento, $iddirectivo} => id personal, id nombramiento
    *Descripción:   Retorna un registro especifico en base al idpersonal, idnombramientoi
    *               y opcionalmente un id con el que no se requiera comprobar
    */
    public function getByPersonalRol($idpersonal, $idnombramiento, $iddirectivo){
        $query = "SELECT * FROM v_getDirectivos WHERE id_persona = $idpersonal and id_nombramiento = $idnombramiento";
        ($iddirectivo != 0) ? $query.= " and id_directivo <> $iddirectivo" : "";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        add
    *Parámetros:    {$idpersonal,$idnombramiento,$personalidad} => id personal API, id nombramiento, personalidad jurídica  
    *Descripción:   Realiza el almacenamiento de un nuevo directivo
    */
    public function add($idpersonal,$idnombramiento,$personalidad){
        $idusuario = 1;
        $sp = "EXEC sp_addDirectivo $idpersonal,$idnombramiento,'$personalidad',$idusuario";
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
    *Parámetros:    {$id,$idpersonal,$idnombramiento,$personalidad} => id del directivo, id personal API, id nombramiento, personalidad jurídica  
    *Descripción:   Realiza la actualización de los datos del directivo
    */
    public function up($id,$idpersonal,$idnombramiento,$personalidad){
        $idusuario = 1;
        $sp = "EXEC sp_upDirectivo $id,$idnombramiento,'$personalidad',$idusuario";
        $respuesta = $this->db->query($sp)->row();
        if($respuesta->Error == 1){
            $response = [
                'status' 	=> false,
                'message'	=> 'No fue posible realizar la actualización',
                'error'     => $respuesta,
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
    *Parámetros:    {$id} => id directivo
    *Descripción:   Realiza la inactivacion de un directivo en especifico
    */
    public function del($id){
        $idusuario = 1;
        $sp = "EXEC sp_delDirectivo $id,$idusuario";
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
    *Nombre:        del
    *Parámetros:    {$id} => id directivo
    *Descripción:   Realiza la reactivacion de un directivo en especifico
    */
    public function en($id){
        $idusuario = 1;
        $sp = "EXEC sp_revDirectivo $id,$idusuario";
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