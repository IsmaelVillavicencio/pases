<?php  
class Recintos_Fiscalizados extends CI_Model
{
	function __construct(){
		parent:: __construct();
    }
    
    /*
    *Nombre:        getFilteridRecinto
    *Parámetros:    {$Recinto, $estatus} => id recinto, estatus (0 o 1),
    *Descripción:   Retorna todos los registros del catalogo de tipos de recintos en 
    *               base a la especificación del id recinto recibido
    */
    public function getFilteridRecinto($recinto, $estatus = 1){
      if($recinto == 6 ) $recinto = "'%Norte%'";
      if($recinto == 7 ) $recinto = "'%Sur%'";
      $query = "SELECT * FROM cat_tipo_Fiscalizados WHERE estatus = $estatus and zona_operacion like $recinto";
        $respuesta = $this->db->query($query)->result();
        return [
          'status' 	=> true,
          'message'	=> '',
          'data'		=> $respuesta
        ];
    }
}