<?php  
class Empresas extends CI_Model
{
	function __construct(){
		parent:: __construct();
	}
	
    /*
    *Nombre:        getByRFC
    *Parámetros:    {$rfc} => rfc de la empresa
    *Descripción:   Retorna un registro especifico por medio del rfc de la empresa
    */
    public function getByRFC($rfc){
        $query = "SELECT * FROM tbl_Empresas WHERE rfc = ".$this->db->escape($rfc);
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
	}

	/*
    *Nombre:        getByClave
    *Parámetros:    {$clave} => clave de la empresa
    *Descripción:   Retorna un registro especifico por medio del clave de la empresa
    */
    public function getByClave($clave){
        $query = "SELECT * FROM tbl_Empresas WHERE clave_patronal = ".$this->db->escape($clave);
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
	}

	/*
    *Nombre:        getById
    *Parámetros:    {$idempresa} => id de la empresa
    *Descripción:   Retorna un registro especifico de los registros de empresas
    */
	public function getById($idempresa){
        $query = "SELECT * FROM tbl_Empresas WHERE id = $idempresa";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
	}

	/*
    *Nombre:        getByIdREST
    *Parámetros:    {$idempresarest} => id de la empresa
    *Descripción:   Retorna un registro especifico de los registros de empresas
    */
	public function getByIdREST($idempresarest){
        $query = "SELECT * FROM tbl_Empresas WHERE id_empresa_rest = $idempresarest";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
	}

    public function getAllEmpresasPermisosByUser($idusuario){
        $query = "SELECT te.id,te.nombre 
        from tbl_Empresas te 
        inner join (
            SELECT tp.id_empresa
            FROM tbl_Pases tp 
            WHERE tp.id_usuario_registro = $idusuario
            group by tp.id_empresa
        ) tp on te.id = tp.id_empresa";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
	}

    public function getEmpresasPermisos(){
        $query = "SELECT DISTINCT tbl_Empresas.id, nombre
        FROM tbl_Empresas
        JOIN tbl_Pases ON tbl_Pases.id_empresa = tbl_Empresas.id";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
	}
    
    public function getAllEmpresasPermisos(){
        $query = "SELECT te.id,te.nombre 
        from tbl_Empresas te 
        inner join (
            SELECT tp.id_empresa
            FROM tbl_Pases tp 
            group by tp.id_empresa
        ) tp on te.id = tp.id_empresa";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
	}
    
	
	/*
    *Nombre:        addEmpresaREST
    *Parámetros:    {$nombre,$idempresarest} => nombre, id de la empresa
    *Descripción:   
    */
	public function addEmpresaREST($nombre,$idempresarest){
		$idusuario = 1;
        $sp = "EXEC sp_addEmpresa 'nombre','$nombre',0,$idusuario,''";
        $respuesta = $this->db->query($sp)->row();
        if($respuesta->Error == 1){
            $response = [
                'status' 	=> false,
                'message'	=> 'No fue posible realizar el almacenamiento',
                'data'		=> null
            ];
        }else{
			$sp = "EXEC sp_upEmpresa 'id_empresa_rest','',$idempresarest,".$respuesta->id_empresa.",$idusuario,''";
        	$this->db->query($sp)->row();
            $response = [
                'status' 	=> true,
                'message'	=> 'Registro exitoso',
                'data'		=> (object)["id_empresa" => $respuesta->id_empresa]
            ];
        }
        return $response;
	}

    /*
    *Nombre:        getAllEmpresas
    *Parámetros:    
    *Descripción:   Obtiene el listado de todas las empresas activas
    */
    public function getAllEmpresas(){
        $query = "SELECT id, nombre 
        FROM tbl_Empresas  
        WHERE estatus = 1 and id_empresa_rest is not null";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
	} 
}