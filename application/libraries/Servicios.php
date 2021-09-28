<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Servicios {
    private $url = 'https://api-busquedas.azurewebsites.net/api/';
    private $usuarioREST = array('usuario' => 'gosorio', 'password' => 'gosorio');
    private $token;

    public $parametros;
    public $endpoint;

    public function __construct(){
        set_time_limit(120);
    }

    public function login(){
        $urlREST = $this->url."Usuario/login";
        $dataString = json_encode($this->usuarioREST);

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $urlREST,
            CURLOPT_ENCODING => "",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => $dataString,
            CURLOPT_HTTPHEADER => array(
                'Content-type: application/json', 
                'Content-length: '.strlen($dataString),
                'Accept: */*',
                'Accept-Encoding: gzip, deflate, br',
                'Connection: keep-alive'
            ),
        ));

        $response = curl_exec($curl);
        $error = curl_error($curl);
        curl_close($curl);

        $respuesta = array('status' => false, 'message' => '');
        if ($error) {
            $respuesta['status'] = true;
            $respuesta['message'] = "Error inesperado al conectarse con el REST API";
        } else {
            $response = json_decode($response);
            if($response->error){
                $respuesta['status'] = true;
                $respuesta['message'] = "Error inesperado al obtener el token";
            }else{
                $this->token = $response->mensaje;
                $respuesta['message'] = "Token de sesión obtenido correctamente";
            }
        }
        return $respuesta;
    }

    public function obtener_datos(){
        $urlREST = $this->url.$this->endpoint;
        $dataString = json_encode($this->parametros);

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $urlREST,
            CURLOPT_ENCODING => "",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => $dataString,
            CURLOPT_HTTPHEADER => array(
                'Content-type: application/json', 
                'Content-length: '.strlen($dataString),
                'Accept: */*',
                'Accept-Encoding: gzip, deflate, br',
                'Connection: keep-alive',
                'Authorization: Bearer '.$this->token
            ),
        ));

        $response = curl_exec($curl);
        $error = curl_error($curl);
        curl_close($curl);

        $respuesta = array('status' => false, 'message' => '', 'respuesta_rest' => []);
        if ($error) {
            $respuesta['status'] = true;
            $respuesta['message'] = "Error inesperado al conectarse con el REST API";
        } else {
            $response = json_decode($response);
            if(is_null($response)){
                $respuesta['status'] = true;
                $respuesta['message'] = "Error inesperado al ejecutar el endpoint";
            }else{
                $respuesta['status'] = $response->error;
                $respuesta['message'] = $response->mensaje;
                $respuesta['respuesta_rest'] = $response;
            }
        }
        return $respuesta;
    }
}