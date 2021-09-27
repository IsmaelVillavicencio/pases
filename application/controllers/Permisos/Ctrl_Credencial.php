<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ctrl_Credencial extends CI_Controller {

	private $titulo = array("titulo" => "Permisos");

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Permisos/Permisos');
		$this->load->model('PDF/PDFpermisos_acceso');
		$this->load->library('QR');
	}

    /*public function permiso(){
		$variable=$this->input->get('variable');

		$data = array(
			'datos' => $this->PDFpermisos_acceso->getAccesoInfo($variable)
		);

		$this->load->view('permisos/vista_previa_permiso_acceso',$data);
	}*/

    public function permiso($id){
		/*$this->load->library('html2pdf');
	    $this->html2pdf->folder('/assets/uploads/permisos/pdf');	    
		$namefile = 'permiso'.time().'.pdf';
		$file = '/assets/uploads/permisos/pdf/' . $namefile;
	    $this->html2pdf->filename($namefile);
	    $this->html2pdf->paper('a4', 'portrait');*/

		$countPersonal = 0;
		$countVechiculo = 0;
		$countHerramienta = 0;
		$countMateriales = 0;

		$data = array(
			'datos' 	=> $this->Permisos->getByIdContrato($id),
			'personal' 	=> $this->Permisos->getPersonalContacto($id),
			'vehiculos'	=> $this->Permisos->getVehiculosChofer($id),
			'herramientas'=> $this->Permisos->getEquiposHerramientas($id),
			'materiales' => $this->Permisos->getMateriales($id),
		);
		
		$rowPersonal = "";
		foreach ($data["personal"]["data"] as $valor) {
			$countPersonal++;
			$rowPersonal .= "<tr style='height:26.25pt'>".
							"<td width=182 	valign=top style='padding:0cm 5.4pt 0cm 5.4pt;height:26.25pt'><p class=FormatoNormal style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-align:center;'><span>$valor->curp		</span></p></td>
							<td width=197	valign=top style='padding:0cm 5.4pt 0cm 5.4pt;height:26.25pt'><p class=FormatoNormal style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-align:center;'><span>$valor->nombre		</span></p></td>
							<td width=87 	valign=top style='padding:0cm 5.4pt 0cm 5.4pt;height:26.25pt'><p class=FormatoNormal style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-align:center;'><span>$valor->tipo_persona</span></p></td>
							<td width=75 	valign=top style='padding:0cm 5.4pt 0cm 5.4pt;height:26.25pt'><p class=FormatoNormal style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-align:center;'><span>$valor->tc_telefono	</span></p></td></tr>";
		};

		$rowVehiculo ="";
		foreach ($data["vehiculos"]["data"] as $valor) {
			$countVechiculo++;
			$rowVehiculo .= "<tr style='height:26.25pt'>".
							"<td width=109 	style='border:none;padding:0cm 5.4pt 0cm 5.4pt;height:26.25pt'><p class='FormatoNormal EstiloGeneral'><span>$valor->marca		</span></p></td>".
							"<td width=109 	style='border:none;padding:0cm 5.4pt 0cm 5.4pt;height:26.25pt'><p class='FormatoNormal EstiloGeneral'><span>$valor->modelo		</span></p></td>".
							"<td width=89 	style='border:none;padding:0cm 5.4pt 0cm 5.4pt;height:26.25pt'><p class='FormatoNormal EstiloGeneral'><span>$valor->color		</span></p></td>".
							"<td width=159 	style='border:none;padding:0cm 5.4pt 0cm 5.4pt;height:26.25pt'><p class='FormatoNormal EstiloGeneral'><span>$valor->numero_serie</span></p></td>".
							"<td width=79 	style='border:none;padding:0cm 5.4pt 0cm 5.4pt;height:26.25pt'><p class='FormatoNormal EstiloGeneral'><span>$valor->numero_placa</span></p></td></tr>";
		};
		$t_vehiculos = "";
		if ($rowVehiculo!=""){
			$t_vehiculos = $this->load->view('permisos/t_vehiculos', array('vehiculos'=> $rowVehiculo), true);
		}

		$rowHerramientas ="";
		foreach ($data["herramientas"]["data"] as $valor) {
			$countHerramienta++;
			$rowHerramientas .= "<tr style='height:26.25pt'>".
								"<td width=70 	style='border:none;padding:0cm 5.4pt 0cm 5.4pt;height:26.25pt'><p class='FormatoNormal EstiloGeneral'><span>$valor->tipo_equipo								</span></p></td>".
								"<td width=70 	style='border:none;padding:0cm 5.4pt 0cm 5.4pt;height:26.25pt'><p class='FormatoNormal EstiloGeneral'><span>$valor->marca									</span></p></td>".
								"<td width=105 	style='border:none;padding:0cm 5.4pt 0cm 5.4pt;height:26.25pt'><p class='FormatoNormal EstiloGeneral'><span style='font-size: 9pt'>$valor->modelo			</span></p></td>".
								"<td width=140 	style='border:none;padding:0cm 5.4pt 0cm 5.4pt;height:26.25pt'><p class='FormatoNormal EstiloGeneral'><span style='font-size: 9pt'>$valor->numero_serie		</span></p></td>".
								"<td width=164 	style='border:none;padding:0cm 5.4pt 0cm 5.4pt;height:26.25pt'><p class='FormatoNormal EstiloGeneral'><span style='font-size: 9pt'>$valor->descripcion		</span></p></td></tr>";
		};
		$t_herramientas = "";
		if ($rowHerramientas!=""){
			$t_herramientas = $this->load->view('permisos/t_herramientas', array('herramientas'=> $rowHerramientas), true);
		}

		//var_dump($data["materiales"]["data"]["info"]->responsable);
		
		$rowMateriales ="";
		foreach ($data["materiales"]["data"]["detail"] as $valor) {
			$countMateriales++;
			$rowMateriales .= "<tr style='height:26.25pt'>".
							"<td width=230 	style='border:none;padding:0cm 5.4pt 0cm 5.4pt;height:26.25pt'><p class='FormatoNormal EstiloGeneral'><span>$valor->descripcion		</span></p></td>".
							"<td width=110 	style='border:none;padding:0cm 5.4pt 0cm 5.4pt;height:26.25pt'><p class='FormatoNormal EstiloGeneral'><span>$valor->tipo_material	</span></p></td>".
							"<td width=110 	style='border:none;padding:0cm 5.4pt 0cm 5.4pt;height:26.25pt'><p class='FormatoNormal EstiloGeneral'><span>$valor->cantidad		</span></p></td>".
							"<td width=110 	style='border:none;padding:0cm 5.4pt 0cm 5.4pt;height:26.25pt'><p class='FormatoNormal EstiloGeneral'><span>$valor->tipo_medida		</span></p></td></tr>";
		};
		$t_materiales = "";

		if ($rowMateriales!=""){
			$t_materiales = $this->load->view('permisos/t_materiales', array('materiales'=> $rowMateriales), true);
		}

		// echo json_encode($t_herramientas);
		//eP|<?php echo $folio."|".($grupal == 1 ? 0 : $persona)."|458913|658712|".$estatus
		$QRCode = 'eP|'.$data["datos"]["data"]->id.'|'.($data["datos"]["data"]->permiso_grupal == 1 ? 0 : $data["personal"]["data"][0]->id).'|'.$data["datos"]["data"]->autorizacion.'|'.$data["datos"]["data"]->autorizacion_aduana.'|'.$data["datos"]["data"]->autorizacion_migracion.'|'.$data['datos']['data']->id_estatus_pase;
		$QRCode = $this->qr->getQRCode($QRCode);
	    $dataPDF = array(
	    	'title' 		=> 'Permisos de Acceso al Recinto Portuario',
	    	'folio' 		=> $data["datos"]["data"]->id,
			'recinto' 		=> $data["datos"]["data"]->tipo_recinto,
			'dias' 			=> $data["datos"]["data"]->dias,
			'fecha_inicio' 	=> $data["datos"]["data"]->fecha_inicio,
			'fecha_termino' => $data["datos"]["data"]->fecha_termino,
			'empresa' 		=> $data["datos"]["data"]->empresa,
			'motivo'		=> $data["datos"]["data"]->motivo,
			'contrato' 		=> $data["datos"]["data"]->numero_contrato,
			'grupal' 		=> $data["datos"]["data"]->permiso_grupal,
			'estatus'		=> $data['datos']['data']->id_estatus_pase,
			'persona'		=> $data["personal"]["data"][0]->id,
			'personal' 		=> $rowPersonal,
			'vehiculos'		=> $t_vehiculos,
			'herramientas'	=> $t_herramientas,
			'materiales'	=> $t_materiales,
			'QRCode'		=> $QRCode->mensaje,
			'numPersonas'	=> $countPersonal,
			'numVechiulos'	=> $countVechiculo,
			'numHerramientas'=> $countHerramienta,
			'numMateriales'	=> $countMateriales,
	    );
	    //Load html view
	    //$this->html2pdf->html($this->load->view('permisos/permiso_acceso', $dataPDF, true));
		//$this->html2pdf->create('download');
		$this->load->view('permisos/vista_previa_permiso_acceso', $dataPDF);
	}

	public function credenciales($idpermiso = null,$idpersona = null){
		$data = array(
			'permiso' => $this->Permisos->getById($idpermiso,$idpersona),
			'persona' => $this->Permisos->getPersonalByPermiso($idpermiso,$idpersona),
			'vehiculo' => $this->Permisos->getVehiculosByPermiso($idpermiso,$idpersona),
			'QRCode'	=> null
		);

		//eP|<?php echo $permiso["data"]->id."|".$persona["data"]->id_persona."|".$permiso["data"]->fecha_termino."|458913|658712|".$permiso["data"]->permiso_grupal
		$QRCode = 'eP|'.$data['permiso']['data']->id.'|'.$data['persona']['data']->id_persona.'|'.$data['permiso']['data']->fecha_termino.'|458913|658712|'.$data['permiso']['data']->permiso_grupal;
		$QRCode = $this->qr->getQRCode($QRCode);

		$data['QRCode'] = $QRCode->mensaje;

		$this->load->view('permisos/vista_previa_credenciales',$data);
    }
}