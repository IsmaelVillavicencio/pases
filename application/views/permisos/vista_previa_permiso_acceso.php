<?php

require $_SERVER['DOCUMENT_ROOT'].'\vendor\autoload.php';

use Spipu\Html2Pdf\Html2Pdf;

ob_start();
require $_SERVER['DOCUMENT_ROOT'].'\application\views\permisos\permiso_acceso.php';
$html = ob_get_clean();
//$file = $_SERVER['DOCUMENT_ROOT'].'\assets\librerias\fuente\arial.ttf';
//$pdf = new Html2Pdf('P','A4','es','true','UTF-8',array(12,20,12,20));
$pdf = new Html2Pdf('P','A4','es','true','UTF-8',array(15,20,15,20));
//$pdf->setDefaultFont('Arial','',14);
//$pdf->SetFont ("Arial", "", 14);
//$pdf->addFont('Arial', '', $file);
$pdf->writeHTML($html);
$pdf->output('permiso_acceso.pdf');

?>