<?php  
class PDF extends CI_Model
{
	function __construct(){
		parent:: __construct();
    }

    public function getContrato($id_contrato){
        $query = "EXEC sp_v_Contrato $id_contrato";
        $respuesta = $this->db->query($query);
        
        return $respuesta->result_array();
        /*return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];*/
    }

    public function add($datos){
        $idusuario = 1;
        $sp = "EXEC sp_addSolicitudContrato
            ".$datos['idtipopersona'].",
            ".$datos['idempresa'].",
            '".$datos['empresa']."',
            ".$datos['idpersona'].",
            '".$datos['nombre']."',
            '".$datos['primerapellido']."',
            '".$datos['segundoapellido']."',
            '".$datos['rfc']."',
            ".$datos['idtipocontrato'].",
            ".$datos['idtiposervicio'].",
            '".$datos['nombrerep']."',
            '".$datos['primerapellidorep']."',
            '".$datos['segundo_apellidorep']."',
            '".$datos['nombrecont']."',
            '".$datos['primerapellidocont']."',
            '".$datos['segundoapellidocont']."',
            '".$datos['correocont']."',
            '".$datos['numerotelefonocont']."',
            '".$datos['descripcion']."',
            '".$datos['observaciones']."',
            $idusuario
        ";
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
                'data'		=> ["clave_envio" => $respuesta->id_contrato],
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }
        return $response;
    }

}