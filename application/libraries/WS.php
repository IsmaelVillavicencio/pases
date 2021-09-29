<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class WS {
    public $url = 'https://pis-rest.kioscoweb.mx/api_puertov1/public/';
    private $usuarioREST = array('usuario' => 'gosorio', 'password' => 'gosorio');
    public $token;

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
        return $response;
    }

    public function actualizar_datos(){
        $urlREST = $this->url.$this->endpoint;
        $dataString = json_encode($this->parametros);

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $urlREST,
            CURLOPT_ENCODING => "",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => "PUT",
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
        return $response;
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
            CURLOPT_CUSTOMREQUEST => "GET",
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
        return $response;
    }

    public function peticion_post(){
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

    public function peticion_get(){
        $urlREST = $this->url.$this->endpoint;
        $dataString = json_encode($this->parametros);

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $urlREST,
            CURLOPT_ENCODING => "",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_CUSTOMREQUEST => "GET",
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
        return $response;
    }

    public function peticion_oscar_omar($datos){
        $username = "";
        $password = "";
        $data_string = json_encode((object)$datos);

        $result = file_get_contents('https://pis-apiman-restfinav1.azurewebsites.net/api/trace', null, stream_context_create(array(
            'http' => array(
                'method' => 'POST',
                'header' => 'Authorization: Basic ' . base64_encode("$username:$password"). "\r\n"
                            . 'Content-Type: application/json ' . "\r\n"
                            . 'user_agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:53.0) Gecko/20100101 Firefox/53.0 ' . "\r\n"
                            . 'Content-Length: ' . strlen($data_string) . "\r\n",
                'content' => $data_string,
            ),
        )));
        return json_decode($result);
    }

    public function peticion_post_rest(){
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
        $response = json_decode($response);
        return $response->data;
    }
}