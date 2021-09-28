<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		echo "inicio";
		try { 

			$url = "https://cp.semar.gob.mx/cp/WSPSP/services/ConsultaSolicitud?wsdl";
			$url2 = "https://cp.semar.gob.mx/cp/WSPSP/services/CatTipoServicio?wsdl";
			$url3 = "https://cp.semar.gob.mx/cp/WSPSP/services/CatTipoServicio?wsdl";

			$contextOptions = array(
				'ssl' => array(
				'verify_peer' => false,
				'verify_peer_name' => false,
				'allow_self_signed' => true
				),
				'http' => array(
					'user_agent' => 'PHPSoapClient'
				));
			
			$sslContext = stream_context_create($contextOptions);

			// $soapClientOptions = array(
			// 	"trace" => true, 
			// 	'soap_version'=>SOAP_1_2,
			// 	"exception" => true, 
			// 	"location" => $url2, 
			// 	'cache_wsdl' => WSDL_CACHE_NONE,
			// 	'stream_context' => stream_context_create(
			// 		[
			// 			'ssl' => array(
			// 				'verify_peer' => false,
			// 				'verify_peer_name' => false
			// 			)
			// 		])
			// 			);

			$soapClientOptions = array(
				'encoding' => 'UTF-8',
				'verifypeer' => false,
				'verifyhost' => false,
				'soap_version' => SOAP_1_2,
				"location" => $url2,
				'trace' => 1,
				'exceptions' => 1,
				'cache_wsdl' => 0,
				'connection_timeout' => 30,
    			'cache_wsdl' => WSDL_CACHE_NONE,
    			'stream_context' => $sslContext
			);
			
			$client     = new SoapClient($url2,  $soapClientOptions );

			$params =  array(
			  "cContrasena" => "4piM4nz42107",   "cUsuario" => "usrapimanzanillo",
			  "iEjercicio" => 2021,
			  "iNumSolicitud" => 122993
			);

			$params2 =  array(
				"cContrasena" => "4piM4nz42107",   
				"cUsuario" => "usrapimanzanillo"
			  );
	
			  
			$data = $client->getCatTipoServicio($params2);
			// $data = $client->CatPaises($params2);
			echo $url2;
			// $myXMLData = $data->consultarEstatusSolicitudReturn;
			print_r($data) ;
		}
		catch (Exception $e) {
			echo 'Excepción capturada: ',  $e->getMessage(), "\n";
		}

		// try {
		// 	$opts = array(
		// 		'https' => array(
		// 			'user_agent' => 'PHPSoapClient'
		// 		)
		// 	);
		// 	$context = stream_context_create($opts);
		
		// 	$wsdlUrl = 'https://cp.semar.gob.mx/cp/WSPSP/services/ConsultaSolicitud?wsdl';
		// 	$soapClientOptions = array(
		// 		'stream_context' => $context,
		// 		'cache_wsdl' => WSDL_CACHE_NONE
		// 	);

		// 	$params =  array(
		// 			  "cContrasena" => "4piM4nz42107",   "cUsuario" => "usrapimanzanillo",
		// 			  "iEjercicio" => 2021,
		// 			  "iNumSolicitud" => 122993
		// 	);
	
		
		// 	$client = new SoapClient($wsdlUrl, $soapClientOptions);
		
		
		// 	$result = $client->consultarEstatusSolicitud($params);
		// 	print_r($result);
		// }
		// catch(Exception $e) {
		// 	echo $e->getMessage();
		// }

		echo file_get_contents($url2);
		echo "\r\n fin12";
	}
}
