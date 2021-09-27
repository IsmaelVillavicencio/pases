<?php

require $_SERVER['DOCUMENT_ROOT'].'\vendor\autoload.php';

use Spipu\Html2Pdf\Html2Pdf;

ob_start();
if($persona["data"]->chofer == 1 && !is_null($vehiculo["data"])){
    require $_SERVER['DOCUMENT_ROOT'].'\application\views\permisos\credencial_chofer.php';   
}else{
    require $_SERVER['DOCUMENT_ROOT'].'\application\views\permisos\credencial_personal.php';   
}
$html = ob_get_clean();
//$file = $_SERVER['DOCUMENT_ROOT'].'\assets\librerias\fuente\arial.ttf';
//$pdf = new Html2Pdf('P','A4','es','true','UTF-8',array(12,20,12,20));
$pdf = new Html2Pdf('P','A4','es');
//$pdf->setDefaultFont('Arial','',14);
//$pdf->SetFont ("Arial", "", 14);
//$pdf->addFont('Arial', '', $file);
//$pdf->setTestTdInOnePage(false);
$pdf->writeHTML($html);
$pdf->output('credencial.pdf');

?>