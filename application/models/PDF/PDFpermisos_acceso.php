<?php  
class PDFpermisos_acceso extends CI_Model
{
	function __construct(){
		parent:: __construct();
    }

    public function getAccesoInfo($variable){
        $query = "$variable";
        $respuesta = (object) ['result' => '0'];//$this->db->query($query);
        
        return $respuesta;
    }

}