<?php  
class Sesiones extends CI_Model
{
	function __construct(){
		parent:: __construct();
	}

	/*
    *Nombre:        getIdPersona
    *Parámetros:    {$idpersona} id personal
    *Descripción:   Retorna el registro especifico de un usuario 
    */
	public function getIdPersona($idpersona){
        $query = "SELECT * FROM v_getUsuarios WHERE id_persona = $idpersona";
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
	
	/*
    *Nombre:        getByCorreo
    *Parámetros:    {$correo} correo electrónico
    *Descripción:   Retorna el registro especifico de un usuario en base a un correo electrónico
    */
	public function getByCorreo($correo){
        $query = "SELECT tbl_Contactos.correo as usuario, tbl_Usuarios.pwd as contrasena, tbl_Contactos.id_persona, tbl_Usuarios.id_perfil, tbl_Personas.id_area, tbl_Usuarios.estatus
		FROM tbl_Usuarios
		INNER JOIN tbl_Contactos ON tbl_Contactos.id_persona=tbl_Usuarios.id_persona AND tbl_Contactos.estatus = 1
		INNER JOIN tbl_Personas ON tbl_Personas.id = tbl_Contactos.id_persona and tbl_Personas.estatus = 1
		where tbl_Usuarios.estatus = 1 AND tbl_Contactos.correo = ".$this->db->escape($correo);
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

	/*
    *Nombre:        getByCorreoInactive
    *Parámetros:    {$correo} correo electrónico
    *Descripción:   Retorna el registro especifico de un usuario en base a un correo electrónico
    */
	public function getByCorreoInactive($correo){
        $query = "SELECT tbl_Contactos.correo as usuario, tbl_Usuarios.estatus
		FROM tbl_Usuarios
		INNER JOIN tbl_Contactos ON tbl_Contactos.id_persona=tbl_Usuarios.id_persona AND tbl_Contactos.estatus = 1
		INNER JOIN tbl_Personas ON tbl_Personas.id = tbl_Contactos.id_persona and tbl_Personas.estatus = 1
		where tbl_Usuarios.estatus = 0 AND tbl_Contactos.correo = ".$this->db->escape($correo);
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

	/*
    *Nombre:        getContratoVigente
    *Parámetros:    {$idpersona} idpersona 
    *Descripción:   Retorna el contratl vigemte de la persona que a iniciado sesion
    */
	public function getContratoVigente($idpersona){
        $query = "SELECT tp.id,
		CASE WHEN y.id_persona IS NOT NULL THEN y.id_contrato ELSE z.id_contrato END AS id_contrato
		FROM tbl_Personas tp 
		INNER JOIN det_Persona_Empresa_Puesto dpep on tp.id = dpep.id_persona 
		LEFT JOIN (
			SELECT tc.id as id_contrato,tc.id_persona 
			FROM tbl_Contratos tc 
			WHERE tc.id_estatus_contrato in (8,9) and tc.id_tipo_persona = 1
		) y on dpep.id_personafisica = y.id_persona
		LEFT JOIN (
			SELECT tc.id as id_contrato,tc.id_empresa 
			FROM tbl_Contratos tc 
			WHERE tc.id_estatus_contrato in (8,9) and tc.id_tipo_persona = 2
		) z on dpep.id_empresa = z.id_empresa
		WHERE tp.id = $idpersona
		ORDER by id_contrato desc";
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