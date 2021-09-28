<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class QR {
    private $url = 'https://pis-apppermisos-qa.azurewebsites.net/api/Codificar/v0/';

    public function __construct(){
        set_time_limit(120);
    }

    public function getQRCode($string = null){
        $url = "https://pis-apppermisos-qa.azurewebsites.net/api/Codificar/v0/".$string."/21*ZzZC0d1qr!*";

        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        //for debug only!
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

        $resp = curl_exec($curl);
        curl_close($curl);
        $respuesta = json_decode($resp);
        
        return $respuesta;
    }
}