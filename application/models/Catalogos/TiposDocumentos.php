<?php  
class TiposDocumentos extends CI_Model
{
	function __construct(){
		parent:: __construct();
    }
    
    /*
    *Nombre:        getByEstatus
    *Parámetros:    {$estatus} => estatus (0 o 1)
    *Descripción:   Retorna todos los registros del catalogo de tipos de documentos en 
    *               base a la especificación del estatus recibido
    */
    public function getByEstatus($estatus = 1){
        $query = "SELECT * FROM cat_tipo_Documentos WHERE estatus = $estatus";
        $respuesta = $this->db->query($query)->result();
        return [
          'status' 	=> true,
          'message'	=> '',
          'data'		=> $respuesta
        ];
    }
}