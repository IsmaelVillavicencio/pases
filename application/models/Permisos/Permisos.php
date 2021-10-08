<?php  
class Permisos extends CI_Model
{
	private $idusuario;
    private $idLogEventos = 0;

	function __construct(){
		parent:: __construct();
        $this->idusuario = $this->session->_id_user;
        $this->idempresa = $this->session->_id_empresa;

        ini_set('memory_limit','256M');
		ini_set('sqlsrv.ClientBufferMaxKBSize','524288');
		ini_set('pdo_sqlsrv.client_buffer_max_kb_size','524288');
		set_time_limit(300);
    }

    /*
    *Nombre:        getStatusPermisos
    *Parámetros:    {}
    *Descripción:   Retorna todos los registros de permisos
    */
    public function getStatusPermisos(){
        $query = "SELECT * FROM cat_estatus_Pases";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }
    public function getStatusPermisosByUser($id){
        if($id == 4 || $id == 5 || $id == 8){ //API administrador 
            $query = "SELECT * FROM cat_estatus_Pases WHERE id NOT IN (6,8,10)";
        }
        if($id == 6){ //Aduana
            $query = "SELECT * FROM cat_estatus_Pases WHERE id IN (2,4,5,11,12,13,14)" ;
        }
        if($id == 7){ // migración
            $query = "SELECT * FROM cat_estatus_Pases WHERE id IN (3,4,9,11,12,13,14)" ;
        }
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }
    /*
    *Nombre:        getAll
    *Parámetros:    {}
    *Descripción:   Retorna todos los registros de permisos
    */
    public function getAll($idpermiso){
        if($idpermiso != ""){
            $query = "SELECT tp.*, te.nombre as empresa, ctp.nombre as tipo_permiso, cep.nombre as estatus_nombre, tp.autorizacion, tp.autorizacion_aduana
            FROM tbl_Pases tp
            left JOIN tbl_Empresas te on tp.id_empresa = te.id
            LEFT JOIN cat_tipo_Permiso ctp on tp.id_tipo_permiso = ctp.id
            LEFT JOIN cat_estatus_Pases cep ON tp.id_estatus_pase = cep.id
            WHERE tp.id > 19999 and tp.id_estatus_pase <> 14 ".($idpermiso  != '' ? " AND tp.id = $idpermiso" : "")."
            ORDER BY CASE WHEN cep.id = 1 THEN 0 WHEN cep.id = 2 THEN 0 ELSE 1 END, cep.id, cep.nombre";
        }else{
            $query = "SELECT * FROM v_getAllPases";
        }
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> "",
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getAllFiltro
    *Parámetros:    {}
    *Descripción:   Retorna todos los registros de permisos
    */
    public function getAllFiltro($datos){
        $query = "SELECT tp.*, te.nombre as empresa, ctp.nombre as tipo_permiso, cep.nombre as estatus_nombre, tp.autorizacion, tp.autorizacion_aduana
        FROM tbl_Pases tp
        left JOIN tbl_Empresas te on tp.id_empresa = te.id
        LEFT JOIN cat_tipo_Permiso ctp on tp.id_tipo_permiso = ctp.id
        LEFT JOIN cat_estatus_Pases cep ON tp.id_estatus_pase = cep.id";
        if($datos["nombrepersona"] != ""){
            $query .= "
            INNER JOIN (
                SELECT dpp.id_permiso 
                FROM tbl_Personas tpe
                INNER JOIN det_Pase_Personal dpp on tpe.id = dpp.id_personal 
                WHERE tpe.nombre like '%".$datos["nombrepersona"]."%'
                GROUP BY dpp.id_permiso 
            ) z on tp.id = z.id_permiso";
        }
        $query .= " WHERE tp.id > 19999 and 1 = 1";
        if($datos["fechainicio"] != "" && $datos["fechatermino"] != ""){
            $query .= " AND tp.fecha_inicio  BETWEEN '".$datos["fechainicio"]."' AND '".$datos["fechatermino"]."'";
            $query .= " AND tp.fecha_termino  BETWEEN '".$datos["fechainicio"]."' AND '".$datos["fechatermino"]."'";
        }
        if($datos["idtipopermiso"] != 0){
            $query .= " AND tp.id_tipo_permiso = ".$datos["idtipopermiso"];
        }
        if($datos["idestatuspase"] != 0){
            $query .= " AND tp.id_estatus_pase = ".$datos["idestatuspase"];
        }
        if($datos["idempresa"] != 0){
            $query .= " AND tp.id_empresa = ".$datos["idempresa"];
        }
        $query.= " ORDER BY CASE WHEN cep.id = 1 THEN 0 WHEN cep.id = 2 THEN 0 ELSE 1 END, cep.id, cep.nombre";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    public function getFiltro($datos){

        $query = "SELECT tp.*, ctp.nombre as tipo_permiso, cep.nombre as estatus_nombre, te.nombre as empresa
        FROM tbl_Pases tp
        LEFT JOIN cat_tipo_Permiso ctp ON tp.id_tipo_permiso = ctp.id
        LEFT JOIN tbl_Empresas te on tp.id_empresa = te.id
        LEFT JOIN cat_estatus_Pases cep ON tp.id_estatus_pase = cep.id";

        $query .= " WHERE tp.id > 19999 and 1 = 1 ";

        if($datos["fechainicio"] != "" && $datos["fechatermino"] != ""){
            $query .= " AND tp.fecha_inicio  BETWEEN '".$datos["fechainicio"]."' AND '".$datos["fechatermino"]."'";
            $query .= " AND tp.fecha_termino  BETWEEN '".$datos["fechainicio"]."' AND '".$datos["fechatermino"]."'";
        }
        if($datos["nosolicitud"] != 0){
            $query .= " AND tp.id = ".$datos["nosolicitud"];
        }
        if($datos["idestatuspase"] != 0){
            if($datos["idestatuspase"] == 7){
                $query .= " AND tp.autorizacion is not null AND tp.id_estatus_pase not in (11,12,13,14)";
            }else if ($datos["idestatuspase"] == 5){
                $query .= " AND tp.autorizacion_aduana is not null AND tp.id_estatus_pase not in (11,12,13,14)";
            }else if ($datos["idestatuspase"] == 9){
                $query .= " AND tp.autorizacion_migracion is not null AND tp.id_estatus_pase not in (11,12,13,14)";
            }else if ($datos["idestatuspase"] == 11 || $datos["idestatuspase"] == 12 || $datos["idestatuspase"] == 13 || $datos["idestatuspase"] == 14){
                $query .= " AND tp.id_estatus_pase = ".$datos["idestatuspase"];
            }else if($datos["idestatuspase"] != 5 && $datos["idestatuspase"] != 7 && $datos["idestatuspase"] != 9){
                $query .= " AND tp.id_estatus_pase = ".$datos["idestatuspase"];
            }
        }
        if($datos["identidad"] != 0){
            $query .= " AND tp.id_empresa = ".$datos["identidad"];
        }
        if($datos["idvigencia"] != 0){
            $query .= " AND tp.id_tipo_vigencia = ".$datos["idvigencia"];
        }
        if($datos["idtipopermiso"] != 0){
            $query .= " AND tp.id_tipo_permiso = ".$datos["idtipopermiso"];
        }
        if($datos["nombrepersona"] != ""){
            $query .= " AND tp.id in (
                SELECT dtp.id_permiso
                FROM det_Pase_Personal dtp
                INNER JOIN tbl_Personas tp ON dtp.id_personal = tp.id
                WHERE tp.nombre like '%".$datos["nombrepersona"]."%'
                GROUP BY dtp.id_permiso
            )";
        }
        if($datos["noplaca"] != ""){
            $query .= " AND tp.id in (
                SELECT dtv.id_permiso
                FROM det_Pase_Vehiculo dtv
                INNER JOIN tbl_Vehiculos tv on dtv.id_vehiculo = tv.id
                WHERE tv.numero_placa = '".$datos["noplaca"]."'
                GROUP BY dtv.id_permiso
            )";
        }

        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    public function getFiltroByUser($datos){
        $query = "SELECT tp.*, te.nombre as empresa, ctp.nombre as tipo_permiso, cep.nombre as estatus_nombre, tp.autorizacion, tp.autorizacion_aduana
        FROM tbl_Pases tp
        left JOIN tbl_Empresas te on tp.id_empresa = te.id
        LEFT JOIN cat_tipo_Permiso ctp on tp.id_tipo_permiso = ctp.id
        LEFT JOIN cat_estatus_Pases cep ON tp.id_estatus_pase = cep.id
        WHERE tp.id > 19999 and 1 = 1";

        if($datos["fechainicio"] != "" && $datos["fechatermino"] != ""){
            $query .= " AND tp.fecha_inicio  BETWEEN '".$datos["fechainicio"]."' AND '".$datos["fechatermino"]."'";
            $query .= " AND tp.fecha_termino  BETWEEN '".$datos["fechainicio"]."' AND '".$datos["fechatermino"]."'";
        }
        if($datos["nosolicitud"] != 0){
            $query .= " AND tp.id = ".$datos["nosolicitud"];
        }
        if($datos["idestatuspase"] != 0){
            if($datos["idestatuspase"] == 7){
                $query .= " AND tp.autorizacion is not null AND tp.id_estatus_pase not in (11,12,13,14)";
            }else if ($datos["idestatuspase"] == 5){
                $query .= " AND tp.autorizacion_aduana is not null AND tp.id_estatus_pase not in (11,12,13,14)";
            }else if ($datos["idestatuspase"] == 9){
                $query .= " AND tp.autorizacion_migracion is not null AND tp.id_estatus_pase not in (11,12,13,14)";
            }else if ($datos["idestatuspase"] == 11 || $datos["idestatuspase"] == 12 || $datos["idestatuspase"] == 13 || $datos["idestatuspase"] == 14){
                $query .= " AND tp.id_estatus_pase = ".$datos["idestatuspase"];
            }else if($datos["idestatuspase"] != 5 && $datos["idestatuspase"] != 7 && $datos["idestatuspase"] != 9){
                $query .= " AND tp.id_estatus_pase = ".$datos["idestatuspase"];
            }
        }
        if($datos["identidad"] != 0){
            $query .= " AND tp.id_empresa = ".$datos["identidad"];
        }
        if($datos["idvigencia"] != 0){
            $query .= " AND tp.id_tipo_vigencia = ".$datos["idvigencia"];
        }
        if($datos["idtipopermiso"] != 0){
            $query .= " AND tp.id_tipo_permiso = ".$datos["idtipopermiso"];
        }
        if($datos["nombrepersona"] != ""){
            $query .= " AND tp.id in (
                SELECT dtp.id_permiso
                FROM det_Pase_Personal dtp
                INNER JOIN tbl_Personas tp ON dtp.id_personal = tp.id
                WHERE tp.nombre like '%".$datos["nombrepersona"]."%'
                GROUP BY dtp.id_permiso
            )";
        }
        if($datos["noplaca"] != ""){
            $query .= " AND tp.id in (
                SELECT dtv.id_permiso
                FROM det_Pase_Vehiculo dtv
                INNER JOIN tbl_Vehiculos tv on dtv.id_vehiculo = tv.id
                WHERE tv.numero_placa = '".$datos["noplaca"]."'
                GROUP BY dtv.id_permiso
            )";
        }

        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    public function getFiltroAduana($datos){
        $query = "SELECT tp.*,  te.nombre as empresa, ctp.nombre as tipo_permiso, TT.numequipos, TT2.nummaterial, cep.nombre as estatus_nombre, tp.autorizacion, tp.autorizacion_aduana
            FROM tbl_Pases tp
            left JOIN tbl_Empresas te on tp.id_empresa = te.id
            LEFT JOIN cat_tipo_Permiso ctp on tp.id_tipo_permiso = ctp.id
            LEFT JOIN cat_estatus_Pases cep ON tp.id_estatus_pase = cep.id
            LEFT JOIN (SELECT COUNT(id_permiso) as numequipos, id_permiso
            FROM det_Pase_Equipo
            GROUP BY id_permiso) as TT
            ON TT.id_permiso = tp.id
            LEFT JOIN (SELECT COUNT(id_permiso) as nummaterial, id_permiso
            FROM det_Pase_Materiales
            GROUP BY id_permiso) as TT2
            ON TT2.id_permiso = tp.id
            WHERE tp.id > 19999 and tp.id_estatus_pase <> 14 and tp.id_recinto <> 3 and ((TT.numequipos is not null or TT2.nummaterial is not null) or (TT.numequipos is null and TT2.nummaterial is null and tp.id_estatus_pase in (2,4)))";

           /* if($datos["idestatuspase"] == 0){
                $query .= " AND tp.id_estatus_pase <> 14 and ((TT.numequipos is not null or TT2.nummaterial is not null) or (TT.numequipos is null and TT2.nummaterial is null and tp.id_estatus_pase in (2,4)))";
            }else{
                $query .= " AND tp.id_estatus_pase = ".$datos["idestatuspase"];
            }*/

            switch ($datos["idestatuspase"]) {
                case 5:
                    $query .= " AND tp.autorizacion is null AND tp.autorizacion_aduana is not null AND tp.id_estatus_pase not in (1,11,12,13,14)";
                    break;
                case 4:
                    $query .= " AND tp.id_estatus_pase = ".$datos["idestatuspase"];
                    break;
                case 2:
                    $query .= " AND tp.id_estatus_pase = ".$datos["idestatuspase"];
                    break;
                case 11:
                    $query .= " AND tp.autorizacion_aduana is not null AND tp.autorizacion is not null AND tp.id_estatus_pase not in (1,12,13,14)";
                    break;
                case 12:
                    $query .= " AND tp.id_estatus_pase = ".$datos["idestatuspase"];
                    break;
                case 13:
                    $query .= " AND tp.id_estatus_pase = ".$datos["idestatuspase"];
                    break;
                case 14:
                    $query .= " AND tp.id_estatus_pase = ".$datos["idestatuspase"];
                    break;
                default:
                
                    break;
            }

            /*if($datos["idestatuspase"] != 0){
               if ($datos["idestatuspase"] == 5){
                    $query .= " AND tp.autorizacion is null AND tp.autorizacion_aduana is not null AND tp.id_estatus_pase not in (1,11,12,13,14)";
                }else if($datos["idestatuspase"] == 4){
                    $query .= " AND tp.id_estatus_pase = ".$datos["idestatuspase"];
                }else if ($datos["idestatuspase"] == 2){
                    $query .= " AND tp.id_estatus_pase = ".$datos["idestatuspase"];
                }else if ($datos["idestatuspase"] == 11){
                    $query .= " AND tp.autorizacion_aduana is not null AND tp.autorizacion is not null AND tp.id_estatus_pase not in (1,12,13,14)";
                }else if ($datos["idestatuspase"] == 12){
                    $query .= " AND tp.id_estatus_pase = ".$datos["idestatuspase"];
                }else if ($datos["idestatuspase"] == 13){
                    $query .= " AND tp.id_estatus_pase = ".$datos["idestatuspase"];
                }else if ($datos["idestatuspase"] == 14){
                    $query .= " AND tp.id_estatus_pase = ".$datos["idestatuspase"];
                }
            }*/
            if($datos["fechainicio"] != "" && $datos["fechatermino"] != ""){
                $query .= " AND tp.fecha_inicio  BETWEEN '".$datos["fechainicio"]."' AND '".$datos["fechatermino"]."'";
                $query .= " AND tp.fecha_termino  BETWEEN '".$datos["fechainicio"]."' AND '".$datos["fechatermino"]."'";
            }
            if($datos["nosolicitud"] != 0){
                $query .= " AND tp.id = ".$datos["nosolicitud"];
            }
            if($datos["identidad"] != 0){
                $query .= " AND tp.id_empresa = ".$datos["identidad"];
            }
            if($datos["idvigencia"] != 0){
                $query .= " AND tp.id_tipo_vigencia = ".$datos["idvigencia"];
            }
            if($datos["idtipopermiso"] != 0){
                $query .= " AND tp.id_tipo_permiso = ".$datos["idtipopermiso"];
            }
            if($datos["nombrepersona"] != ""){
                $query .= " AND tp.id in (
                    SELECT dtp.id_permiso
                    FROM det_Pase_Personal dtp
                    INNER JOIN tbl_Personas tp ON dtp.id_personal = tp.id
                    WHERE tp.nombre like '%".$datos["nombrepersona"]."%'
                    GROUP BY dtp.id_permiso
                )";
            }
            if($datos["noplaca"] != ""){
                $query .= " AND tp.id in (
                    SELECT dtv.id_permiso
                    FROM det_Pase_Vehiculo dtv
                    INNER JOIN tbl_Vehiculos tv on dtv.id_vehiculo = tv.id
                    WHERE tv.numero_placa = '".$datos["noplaca"]."'
                    GROUP BY dtv.id_permiso
                )";
            }
            /*WHERE tp.id_estatus_pase <> 14 and ((TT.numequipos is not null or TT2.nummaterial is not null) or (TT.numequipos is null and TT2.nummaterial is null and tp.id_estatus_pase in (2,4)))
            ORDER BY CASE WHEN cep.id = 1 THEN 0 ELSE 1 END, cep.id, cep.nombre";*/
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    public function getFiltroMigracion($datos){
        $query = "SELECT tp.*,  te.nombre as empresa, ctp.nombre as tipo_permiso, cep.nombre as estatus_nombre, tp.autorizacion, tp.autorizacion_aduana, TT.numpersonas
            FROM tbl_Pases tp
            left JOIN tbl_Empresas te on tp.id_empresa = te.id
            LEFT JOIN cat_tipo_Permiso ctp on tp.id_tipo_permiso = ctp.id
            LEFT JOIN cat_estatus_Pases cep ON tp.id_estatus_pase = cep.id
            LEFT JOIN (SELECT COUNT(id_permiso) as numpersonas, id_permiso
            FROM det_Pase_Personal
            WHERE det_Pase_Personal.estatus_pase_migracion IN (7,8,9)
            GROUP BY id_permiso) as TT
            ON TT.id_permiso = tp.id
            WHERE tp.id > 19999 and (TT.numpersonas > 0 or (TT.numpersonas is null and tp.id_estatus_pase in (3,4)))";

            /*if($datos["idestatuspase"] == 0){
                $query .= " AND (TT.numpersonas > 0 or (TT.numpersonas is null and tp.id_estatus_pase in (3,4)))";
            }else{
                $query .= " AND tp.id_estatus_pase = ".$datos["idestatuspase"];
            }*/
            if($datos["idestatuspase"] != 0){
                if($datos["idestatuspase"] == 3){
                    $query .= " AND tp.id_estatus_pase = ".$datos["idestatuspase"];
                }else if ($datos["idestatuspase"] == 4){
                    $query .= " AND tp.id_estatus_pase = ".$datos["idestatuspase"];
                }else if ($datos["idestatuspase"] == 11){
                    $query .= " AND tp.autorizacion_migracion is not null AND tp.autorizacion is not null";
                }else if ($datos["idestatuspase"] == 9){
                    $query .= " AND tp.autorizacion_migracion is not null AND tp.autorizacion is null AND tp.id_estatus_pase not in (11,12,13,14)";
                }else if ($datos["idestatuspase"] == 12 || $datos["idestatuspase"] == 13 || $datos["idestatuspase"] == 14){
                    $query .= " AND tp.id_estatus_pase = ".$datos["idestatuspase"];
                }/*else if($datos["idestatuspase"] != 5 && $datos["idestatuspase"] != 7 && $datos["idestatuspase"] != 9){
                    $query .= " AND tp.id_estatus_pase = ".$datos["idestatuspase"];
                }*/
            }
            if($datos["fechainicio"] != "" && $datos["fechatermino"] != ""){
                $query .= " AND tp.fecha_inicio  BETWEEN '".$datos["fechainicio"]."' AND '".$datos["fechatermino"]."'";
                $query .= " AND tp.fecha_termino  BETWEEN '".$datos["fechainicio"]."' AND '".$datos["fechatermino"]."'";
            }
            if($datos["nosolicitud"] != 0){
                $query .= " AND tp.id = ".$datos["nosolicitud"];
            }
            if($datos["identidad"] != 0){
                $query .= " AND tp.id_empresa = ".$datos["identidad"];
            }
            if($datos["idvigencia"] != 0){
                $query .= " AND tp.id_tipo_vigencia = ".$datos["idvigencia"];
            }
            if($datos["idtipopermiso"] != 0){
                $query .= " AND tp.id_tipo_permiso = ".$datos["idtipopermiso"];
            }
            if($datos["nombrepersona"] != ""){
                $query .= " AND tp.id in (
                    SELECT dtp.id_permiso
                    FROM det_Pase_Personal dtp
                    INNER JOIN tbl_Personas tp ON dtp.id_personal = tp.id
                    WHERE tp.nombre like '%".$datos["nombrepersona"]."%'
                    GROUP BY dtp.id_permiso
                )";
            }
            if($datos["noplaca"] != ""){
                $query .= " AND tp.id in (
                    SELECT dtv.id_permiso
                    FROM det_Pase_Vehiculo dtv
                    INNER JOIN tbl_Vehiculos tv on dtv.id_vehiculo = tv.id
                    WHERE tv.numero_placa = '".$datos["noplaca"]."'
                    GROUP BY dtv.id_permiso
                )";
            }
            /*WHERE tp.id_estatus_pase <> 14 and ((TT.numequipos is not null or TT2.nummaterial is not null) or (TT.numequipos is null and TT2.nummaterial is null and tp.id_estatus_pase in (2,4)))
            ORDER BY CASE WHEN cep.id = 1 THEN 0 ELSE 1 END, cep.id, cep.nombre";*/
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }
    /*
    *Nombre:        getById
    *Parámetros:    {$id} => id de permiso
    *Descripción:   Retorna un registro especifico de permisos
    */
    public function getById($id){
        $query = "SELECT te.nombre as empresa,tp.*, ctp.nombre as tipo_permiso, ctp.id as id_tipo_permiso, cta.nombre as actividad,  cta.id as id_actividad,
		ctv.nombre as vigencia, ctv.id as id_vigencia, ctr.nombre as tipo_recinto, ctr.id as id_tipo_recinto, ctr2.nombre as recinto_fiscalizado, ctr2.id as id_recinto_fiscalizado,
        tp.autorizacion, tp.autorizacion_aduana
        FROM tbl_Pases tp
        left JOIN tbl_Empresas te on tp.id_empresa = te.id
        LEFT JOIN cat_tipo_Permiso ctp on tp.id_tipo_permiso = ctp.id
        LEFT JOIN cat_tipo_Actividad cta on tp.id_tipo_actividad = cta.id
        LEFT JOIN cat_tipo_Vigencia ctv on tp.id_tipo_vigencia = ctv.id
        LEFT JOIN cat_tipo_Recintos ctr on tp.id_recinto = ctr.id
        LEFT JOIN cat_tipo_Fiscalizados ctr2 on tp.id_fiscalizado = ctr2.id
        WHERE tp.id = $id";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getByIdContrato
    *Parámetros:    {$id} => id de permiso
    *Descripción:   Retorna un registro especifico de permisos, se agrego el numero de contrato
    */
    public function getByIdContrato($id){
        $query = "SELECT te.nombre as empresa, tp.*, ctp.nombre as tipo_permiso, cta.nombre as actividad,
		ctv.nombre as vigencia, ctr.nombre as tipo_recinto, ctr2.nombre as recinto_fiscalizado, vs.numero_contrato
        FROM tbl_Pases tp
        LEFT JOIN tbl_Empresas te on tp.id_empresa = te.id 
        LEFT JOIN v_getSolicitudContratos vs on tp.id_contrato = vs.id_contrato
        LEFT JOIN cat_tipo_Permiso ctp on tp.id_tipo_permiso = ctp.id
        LEFT JOIN cat_tipo_Actividad cta on tp.id_tipo_actividad = cta.id
        LEFT JOIN cat_tipo_Vigencia ctv on tp.id_tipo_vigencia = ctv.id
        LEFT JOIN cat_tipo_Recintos ctr on tp.id_recinto = ctr.id
        LEFT JOIN cat_tipo_Recintos ctr2 on tp.id_fiscalizado = ctr2.id
        WHERE tp.id = $id";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }
    
    /*
    *Nombre:        getByEstatus
    *Parámetros:    {$estatus} => estatus (0 o 1)
    *Descripción:   Retorna todos los registros de permisos en 
    *               base a la especificación del estatus recibido
    */
    public function getByEstatus($estatus = 1){
        $query = "SELECT * FROM tbl_Pases WHERE estatus = $estatus";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getByEstatus
    *Parámetros:    {$estatus} => estatus (0 o 1)
    *Descripción:   Retorna todos los registros de permisos en 
    *               base a la especificación del estatus recibido
    */
    public function getAllByEstatus($idpermiso){
        $query = "SELECT tp.*, te.nombre as empresa, ctp.nombre as tipo_permiso, cep.nombre as estatus_nombre
        FROM tbl_Pases tp
        left JOIN tbl_Empresas te on tp.id_empresa = te.id
        LEFT JOIN cat_tipo_Permiso ctp on tp.id_tipo_permiso = ctp.id
        LEFT JOIN cat_estatus_Pases cep ON tp.id_estatus_pase = cep.id
        WHERE tp.id > 19999 and (tp.estatus = 1 OR tp.estatus = 2) ".($idpermiso  != '' ? " AND tp.id = $idpermiso" : "");
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getAllByArea
    *Parámetros:    {}
    *Descripción:   Retorna todos los registros de permisos en 
    *               base a la especificación del estatus recibido
    */
    public function getAllByUser($idpermiso){
        $query = "SELECT TOP 100 tp.*, te.nombre as empresa, ctp.nombre as tipo_permiso, cep.nombre as estatus_nombre, tp.autorizacion, tp.autorizacion_aduana
        FROM tbl_Pases tp
        left JOIN tbl_Empresas te on tp.id_empresa = te.id
        LEFT JOIN cat_tipo_Permiso ctp on tp.id_tipo_permiso = ctp.id
        LEFT JOIN cat_estatus_Pases cep ON tp.id_estatus_pase = cep.id
        WHERE tp.id > 19999 and tp.id_empresa = ".$this->idempresa."
        ORDER BY tp.id desc";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> "",
			'data'		=> $respuesta,
            'query'     => $query
		];
    }

    /*
    *Nombre:        getAllAduana
    *Parámetros:    {}
    *Descripción:   Retorna todos los registros de permisos en 
    *               base a la especificación del estatus recibido
    */
    public function getAllAduana($idpermiso){
        $query = "SELECT TOP 100 tp.*,  te.nombre as empresa, ctp.nombre as tipo_permiso, TT.numequipos, TT2.nummaterial, cep.nombre as estatus_nombre, tp.autorizacion, tp.autorizacion_aduana
            FROM tbl_Pases tp
            left JOIN tbl_Empresas te on tp.id_empresa = te.id
            LEFT JOIN cat_tipo_Permiso ctp on tp.id_tipo_permiso = ctp.id
            LEFT JOIN cat_estatus_Pases cep ON tp.id_estatus_pase = cep.id
            LEFT JOIN (SELECT COUNT(id_permiso) as numequipos, id_permiso
            FROM det_Pase_Equipo
            GROUP BY id_permiso) as TT
            ON TT.id_permiso = tp.id
            LEFT JOIN (SELECT COUNT(id_permiso) as nummaterial, id_permiso
            FROM det_Pase_Materiales
            GROUP BY id_permiso) as TT2
            ON TT2.id_permiso = tp.id
            WHERE tp.id > 19999 and tp.id_estatus_pase <> 14 and ((TT.numequipos is not null or TT2.nummaterial is not null) or (TT.numequipos is null and TT2.nummaterial is null and tp.id_estatus_pase in (2,4))) ".($idpermiso  != '' ? " AND tp.id = $idpermiso" : "")."
            ORDER BY CASE WHEN cep.id = 1 THEN 0 ELSE 1 END, cep.id, cep.nombre";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta,
            'info'      => $query
		];
    }

    /*
    *Nombre:        getAllMigracion
    *Parámetros:    {}
    *Descripción:   Retorna todos los registros de permisos en 
    *               base a la especificación del estatus recibido
    */
    public function getAllMigracion($idpermiso){
        $query = "SELECT TOP 100 tp.*,  te.nombre as empresa, ctp.nombre as tipo_permiso, cep.nombre as estatus_nombre, tp.autorizacion, tp.autorizacion_aduana, TT.numpersonas
            FROM tbl_Pases tp
            left JOIN tbl_Empresas te on tp.id_empresa = te.id
            LEFT JOIN cat_tipo_Permiso ctp on tp.id_tipo_permiso = ctp.id
            LEFT JOIN cat_estatus_Pases cep ON tp.id_estatus_pase = cep.id
            LEFT JOIN (SELECT COUNT(id_permiso) as numpersonas, id_permiso
            FROM det_Pase_Personal
            WHERE det_Pase_Personal.estatus_pase_migracion IN (7,8,9)
            GROUP BY id_permiso) as TT
            ON TT.id_permiso = tp.id
            WHERE tp.id > 19999 and (TT.numpersonas > 0 or (TT.numpersonas is null and tp.id_estatus_pase in (3,4))) ".($idpermiso  != '' ? " AND tp.id = $idpermiso" : "")."
            ORDER BY CASE WHEN cep.id = 1 THEN 0 ELSE 1 END, cep.id, cep.nombre";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    public function getGridPermisos($datos){
        if($this->session->_permiso_rol == 8){
            $idempresa = $this->session->_id_empresa_rest;
        }else if($datos['permiso_rol'] == 8){
            $idempresa = $datos['idempresa'];
        }else{
            $idempresa = ($datos['idempresa'] == '' ? 0 : $datos['idempresa']);
        }

        $idtipovigencia = ($datos['idvigencia'] == '' ? 0 : $datos['idvigencia']);
        $idtipopermiso = ($datos['idtipopermiso'] == '' ? 0 : $datos['idtipopermiso']);
        $idestatuspase = ($datos['idestatuspase'] == '' ? 0 : $datos['idestatuspase']);
        $nosolicitud = ($datos['nosolicitud'] == '' ? 0 : $datos['nosolicitud']);

        $query = "EXEC sp_grdPermisos ".$datos['permiso_rol'].", 
            $idempresa, 
            '".$datos['fechainicio']."', 
            '".$datos['fechatermino']."',
            $idtipovigencia, 
            $idtipopermiso, 
            $idestatuspase, 
            $nosolicitud, 
            '".$datos['nombrepersona']."', 
            '".$datos['noplaca']."'";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }
    
    /*
    *Nombre:        getPersonal
    *Parámetros:    {$idpermiso} => 
    *Descripción:   Obtiene Personal del pase consultado
    */
    public function getPersonal($idpermiso){
        $query = "SELECT tbl_Pases.id as id_pase, cat_tipo_empleado.nombre as tipo_persona,
            CONCAT(tbl_Personas.nombre,' ',tbl_Personas.primer_apellido,' ',tbl_Personas.segundo_apellido) as nombre,
            tbl_Personas.nombre as nombre_persona,
            cat_tipo_Nacionalidad.nombre as nacionalidad,
            cat_tipo_Nacionalidad.id as id_nacionalidad,
            det_Persona_Empresa_Puesto.estatus_empleado,
            cat_tipo_Empleado.id as id_empleado,
            tbl_Personas.id, x.correo,x.telefono,
            tbl_Personas.curp
            FROM tbl_Pases
            JOIN det_Pase_Personal
            ON det_Pase_Personal.id_permiso = tbl_Pases.id
            JOIN det_Persona_Empresa_Puesto
            ON det_Persona_Empresa_Puesto.id_persona = det_Pase_Personal.id_personal
            AND det_Persona_Empresa_Puesto.id_empresa = det_Pase_Personal.id_empresa
            AND det_Persona_Empresa_Puesto.id_puesto = -3
            JOIN tbl_Personas
            ON tbl_Personas.id = det_Pase_Personal.id_personal
            JOIN cat_tipo_Nacionalidad
            ON cat_Tipo_Nacionalidad.id = tbl_Personas.id_nacionalidad
            JOIN cat_tipo_Empleado
            ON cat_tipo_empleado.id = det_pase_personal.id_tipo_persona
            LEFT JOIN (
            	SELECT distinct id_persona, correo,telefono
            	FROM tbl_Contactos
            	WHERE estatus = 1
            ) x ON det_Pase_Personal.id_personal = x.id_persona
            WHERE tbl_Pases.id = $idpermiso";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getPersonalContacto
    *Parámetros:    {$idpermiso} => 
    *Descripción:   Obtiene Personal del pase consultado, se agrego telefono y correo del ultimo registro.
    */
    public function getPersonalContacto($idpermiso){
        $query = "SELECT cat_tipo_empleado.nombre as tipo_persona,
                    CONCAT(tbl_Personas.nombre,' ',tbl_Personas.primer_apellido,' ',tbl_Personas.segundo_apellido) as nombre,
                    cat_tipo_Nacionalidad.nombre as nacionalidad,
                    det_Persona_Empresa_Puesto.estatus_empleado,
                    tbl_Personas.id,
                    tbl_Personas.curp,
                    vw_ContactoPersona.tc_telefono,vw_ContactoPersona.tc_correo
                    FROM tbl_Pases
                    JOIN det_Pase_Personal
                    ON det_Pase_Personal.id_permiso = tbl_Pases.id
                    JOIN det_Persona_Empresa_Puesto
                    ON det_Persona_Empresa_Puesto.id_persona = det_Pase_Personal.id_personal
                    AND det_Persona_Empresa_Puesto.id_empresa = det_Pase_Personal.id_empresa
                    AND det_Persona_Empresa_Puesto.id_puesto = -3
                    JOIN tbl_Personas
                    ON tbl_Personas.id = det_Pase_Personal.id_personal
                    JOIN cat_tipo_Nacionalidad
                    ON cat_Tipo_Nacionalidad.id = tbl_Personas.id_nacionalidad
                    JOIN cat_tipo_Empleado
                    ON cat_tipo_empleado.id = det_pase_personal.id_tipo_persona
                    JOIN vw_ContactoPersona
                    ON vw_ContactoPersona.tc_id_persona = tbl_Personas.id
                    WHERE tbl_Pases.id = $idpermiso";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    public function getPersonalByPermiso($idpermiso, $idusuario){
        $query = "SELECT tbl_Personas.id as id_persona,cat_tipo_empleado.nombre as tipo_persona, tbl_Personas.curp, tbl_Personas.nss,
        CONCAT(tbl_Personas.nombre, ' ', tbl_Personas.primer_apellido, ' ' , tbl_Personas.segundo_apellido) as nombre, 
        case when tbl_Imagenes.id is null then 0 else 1 end as chofer,
        tbli.link as link_fotografia, tbli.nombre as fotografia
        FROM tbl_Pases
        JOIN det_Pase_Personal ON det_Pase_Personal.id_permiso = tbl_Pases.id
        JOIN tbl_Personas ON tbl_Personas.id = det_Pase_Personal.id_personal
        JOIN cat_tipo_Empleado ON cat_tipo_empleado.id = det_pase_personal.id_tipo_persona
        LEFT JOIN tbl_Imagenes ON tbl_Personas.id = tbl_Imagenes.id_personal and tbl_Imagenes.id_tipo_toma = 1 and tbl_Imagenes.estatus = 1
        LEFT JOIN tbl_Imagenes tbli on tbl_Personas.id = tbli.id_personal and tbli.id_tipo_toma = 3 and tbli.estatus = 1
        WHERE tbl_Pases.id = $idpermiso and det_Pase_Personal.id_personal = $idusuario";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getEquiposHerramientas
    *Parámetros:    {$didpermiso} => 
    *Descripción:   Obtiene EquiposHerramientas del pase consultado
    */
    public function getEquiposHerramientas($idpermiso){
        $query = "SELECT cat_tipo_Equipo.nombre as tipo_equipo,
            tbl_equipos.modelo,
            tbl_equipos.marca,
            tbl_equipos.descripcion,
            tbl_equipos.numero_serie,
            tbl_Equipos.id,
            cat_estatus_Registro_Pases.nombre as estatus,
            det_Pase_Equipo.estatus_pase,
            det_Pase_Equipo.id_usuario_registro,
            CONCAT(tbl_Personas.nombre, ' ', tbl_Personas.primer_apellido, ' ' , tbl_Personas.segundo_apellido) as responsable
            FROM tbl_Pases
            JOIN det_Pase_Equipo
            ON det_Pase_Equipo.id_permiso = tbl_Pases.id
            JOIN tbl_Equipos
            ON tbl_Equipos.id = det_Pase_Equipo.id_equipo
            JOIN tbl_Personas
            ON tbl_Personas.id = det_Pase_Equipo.id_personal
            JOIN cat_tipo_Equipo
            ON cat_Tipo_equipo.id = tbl_Equipos.id_tipo_equipo
            JOIN cat_estatus_Registro_Pases
            ON cat_estatus_Registro_Pases.id = det_Pase_Equipo.estatus_pase
            WHERE tbl_Pases.id = $idpermiso";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getMateriales
    *Parámetros:    {$didpermiso} => 
    *Descripción:   Obtiene Materiales del pase consultado
    */
    public function getMateriales($idpermiso){
        $query2 = "SELECT det_Pase_Materiales.id_lista,
            det_Pase_Materiales.estatus_pase,
            det_Pase_Materiales.observacion,
            det_Pase_Materiales.estatus_pase,
            det_Pase_Materiales.id_usuario_registro,
            cat_estatus_Registro_Pases.nombre as estatus,
            concat(tbl_Personas.nombre,' ', tbl_Personas.primer_apellido,' ', tbl_Personas.segundo_apellido) as responsable
            FROM tbl_Pases
            JOIN det_Pase_Materiales
            ON det_Pase_Materiales.id_permiso = tbl_Pases.id
            JOIN tbl_Lista_Material
            ON tbl_Lista_Material.id = det_Pase_Materiales.id_lista
            JOIN cat_estatus_Registro_Pases
            ON cat_estatus_Registro_Pases.id = det_Pase_Materiales.estatus_pase
            JOIN tbl_Personas
            On tbl_Personas.id = tbl_Lista_Material.id_personal
            WHERE tbl_Pases.id = $idpermiso";

        $query = "SELECT det_Lista_Materiales.cantidad,
        det_Lista_Materiales.descripcion,
        cat_tipo_Materiales.nombre as tipo_material,
        cat_tipo_Medidas.nombre as tipo_medida
        FROM tbl_Pases
        JOIN det_Pase_Materiales
        ON det_Pase_Materiales.id_permiso = tbl_Pases.id
        JOIN tbl_Lista_Material
        ON tbl_Lista_Material.id = det_Pase_Materiales.id_lista
        JOIN det_Lista_Materiales
        ON det_Lista_Materiales.id_lista = tbl_Lista_Material.id
        JOIN cat_tipo_Materiales
        ON cat_tipo_Materiales.id = det_Lista_Materiales.id_material
        LEFT JOIN cat_tipo_Medidas
        ON cat_tipo_Medidas.id = det_Lista_Materiales.id_medida
        WHERE tbl_Pases.id = $idpermiso";

        $respuesta = $this->db->query($query)->result();
        $respuesta2 = $this->db->query($query2)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> ['info' => $respuesta2, 'detail' => $respuesta]
		];
    }

    public function getEquipoBySerie($noserie){
        $query = "SELECT tbl_Equipos.id, tbl_Equipos.id_tipo_equipo,
        cat_tipo_Equipo.nombre as tipo_equipo,
        tbl_Equipos.id_personal,
        tbl_equipos.modelo,tbl_equipos.marca,tbl_equipos.numero_serie,
        tbl_Imagenes.id_tipo_identificacion as id_tipo_documento,
        tbl_Imagenes.numero_identificacion as numero_factura,
        tbl_Imagenes.id as id_imagen_factura,
        CONCAT(tbl_Imagenes.link,tbl_Imagenes.nombre) as factura_equipo
        FROM tbl_Pases
        JOIN det_Pase_Equipo ON det_Pase_Equipo.id_permiso = tbl_Pases.id
        JOIN tbl_Equipos ON tbl_Equipos.id = det_Pase_Equipo.id_equipo
        JOIN cat_tipo_Equipo ON cat_Tipo_equipo.id = tbl_Equipos.id_tipo_equipo
        LEFT JOIN tbl_Imagenes ON tbl_Equipos.id = tbl_Imagenes.id_equipo and tbl_Imagenes.estatus = 1
        where tbl_Equipos.numero_serie = '$noserie'";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getVehiculos
    *Parámetros:    {$didpermiso} => 
    *Descripción:   Obtiene Vehiculos del pase consultado
    */
    public function getVehiculos($idpermiso){
        $query = "SELECT tbl_Vehiculos.id,
            tbl_Vehiculos.numero_serie,
            det_Vehiculo_Empresa.numero_placa,
            tbl_Vehiculos.marca,
            tbl_Vehiculos.modelo,
            tbl_Vehiculos.anio,
            det_Vehiculo_Empresa.color,
            cat_estatus_Registro_Pases.nombre as estatus,
            det_Pase_Vehiculo.estatus_pase,
            det_Pase_Vehiculo.id_usuario_registro
            FROM tbl_Pases
            JOIN det_Pase_Vehiculo
            ON det_Pase_Vehiculo.id_permiso = tbl_Pases.id
            JOIN tbl_Vehiculos
            ON tbl_Vehiculos.id = det_Pase_Vehiculo.id_vehiculo
            JOIN det_Vehiculo_Empresa
            ON det_Vehiculo_Empresa.id_vehiculo = tbl_Vehiculos.id
            JOIN cat_estatus_Registro_Pases
            ON cat_estatus_Registro_Pases.id = det_Pase_Vehiculo.estatus_pase
            WHERE tbl_Pases.id = $idpermiso";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getVehiculosChofer
    *Parámetros:    {$didpermiso} => 
    *Descripción:   Obtiene Vehiculos del pase consultado recupera el nombre del chofer
    */
    public function getVehiculosChofer($idpermiso){
        $query = "SELECT numero_serie, det_Vehiculo_Empresa.numero_placa, marca, anio, modelo, det_Vehiculo_Empresa.color,
        CASE CONCAT(tbl_Personas.nombre, ' ', tbl_Personas.primer_apellido, ' ' , tbl_Personas.segundo_apellido) 
            WHEN '' THEN 'Sin responsable'
            ELSE CONCAT(tbl_Personas.nombre, ' ', tbl_Personas.primer_apellido, ' ' , tbl_Personas.segundo_apellido)
        END as chofer 
        FROM tbl_Pases
        JOIN det_Pase_Vehiculo
        ON det_Pase_Vehiculo.id_permiso = tbl_Pases.id
        JOIN tbl_Vehiculos
        ON tbl_Vehiculos.id = det_Pase_Vehiculo.id_vehiculo
        JOIN det_Vehiculo_Empresa 
        ON tbl_Vehiculos.id = det_Vehiculo_Empresa.id_Vehiculo 
        LEFT JOIN tbl_Personas
        ON tbl_Personas.id = det_Pase_Vehiculo.id_chofer
        WHERE tbl_Pases.id = $idpermiso";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    public function getVehiculosByPermiso($idpermiso,$idusuario){
        $query = "SELECT tbl_Vehiculos.id, tbl_Vehiculos.id_tipo_vehiculo, tbl_Vehiculos.numero_serie, tbl_Vehiculos.marca, tbl_Vehiculos.modelo, tbl_Vehiculos.anio,
        cat_tipo_Tarjeta_Circulacion.nombre as tipo_tarjeta_circulacion, 
        det_Vehiculo_Empresa.id_empresa, det_Vehiculo_Empresa.numero_placa, det_Vehiculo_Empresa.color, det_Vehiculo_Empresa.id_tipo_tarjeta_circulacion, det_Vehiculo_Empresa.numero_tarjeta_circulacion,
        det_Vehiculo_Empresa.id_tipo_aseguradora, det_Vehiculo_Empresa.numero_poliza, det_Vehiculo_Empresa.vigencia_poliza, det_Vehiculo_Empresa.id_tipo_periodo,
        det_Vehiculo_Empresa.fecha_inicio_covertura, det_Vehiculo_Empresa.fecha_fin_covertura,
        tbl_Personas.nombre as nombre_chofer, tbl_Personas.primer_apellido as primer_apellido_chofer,
        tbl_Personas.segundo_apellido as segundo_apellido_chofer, tbl_Personas.curp as curp_chofer, tbl_Personas.nss as nss_chofer,
        tbl_Imagenes.link as link_fotografia_chofer, tbl_Imagenes.nombre as fotografia_chofer,
        ti.link as link_fotografia_vehiculo, ti.nombre as fotografia_vehiculo
        FROM tbl_Pases
        JOIN det_Pase_Vehiculo ON det_Pase_Vehiculo.id_permiso = tbl_Pases.id
        JOIN tbl_Vehiculos ON tbl_Vehiculos.id = det_Pase_Vehiculo.id_vehiculo
        JOIN det_Vehiculo_Empresa ON tbl_Vehiculos.id = det_Vehiculo_Empresa.id_Vehiculo 
        JOIN tbl_Personas ON det_Pase_Vehiculo.id_chofer = tbl_Personas.id
        LEFT JOIN cat_tipo_Tarjeta_Circulacion on det_Vehiculo_Empresa.id_tipo_tarjeta_circulacion = cat_tipo_Tarjeta_Circulacion.id
        LEFT JOIN tbl_Imagenes on tbl_Personas.id = tbl_Imagenes.id_personal and tbl_Imagenes.id_tipo_toma = 3 and tbl_Imagenes.estatus = 1
        LEFT JOIN tbl_Imagenes ti on tbl_Vehiculos.id = ti.id_vehiculo and ti.id_tipo_toma = 7 and ti.estatus = 1
        WHERE tbl_Pases.id = $idpermiso and det_Pase_Vehiculo.id_chofer = $idusuario";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getPersonalById
    *Parámetros:    {id} => 
    *Descripción:   Obtiene Personal del pase consultado
    */
    public function getPersonalById($id,$idpermiso){
        $query = "SELECT tbl_Personas.nss,
        CONCAT(tbl_Personas.nombre, ' ', tbl_Personas.primer_apellido, ' ' , tbl_Personas.segundo_apellido) as nombre,
            tbl_Personas.curp,
            tbl_Personas.edad,
            tbl_Personas.ciudad_nacimiento,
            tbl_Personas.fecha_nacimiento,
            tbl_Personas.sexo,
            tbl_Contactos.correo,
            tbl_Contactos.telefono,
            cat_Tipo_Nacionalidad.id as id_nacionalidad,
            cat_Tipo_Nacionalidad.nombre as nacionalidad,
            tbl_Empresas.nombre as empresa,
            tbl_Empresas.clave_patronal,
            det_Pase_Personal.estatus_pase,
            det_Pase_Personal.observacion,
            det_Pase_Personal.estatus_pase_migracion,
            det_Pase_Personal.observacion_migracion,
            det_Pase_Personal.id_empresa as id_empresa,
            tbl_personas.id as id_persona,
            F1.licencia,
            F1.numero_licencia,
            F1.fecha_expiracion as venceLicencia,
            F2.numero_identificacion,
            F2.identificacion,
            F2.tipo_identificacion,
            F2.fecha_expiracion as venceIdentificacion,
            F3.fotopersonal
            FROM tbl_Pases
            JOIN det_Pase_Personal
            ON tbl_Pases.id = det_Pase_Personal.id_permiso 
            JOIN tbl_Personas 
            ON det_Pase_Personal.id_personal = tbl_Personas.id 
            JOIN cat_tipo_Nacionalidad
            ON cat_Tipo_Nacionalidad.id = tbl_Personas.id_nacionalidad
            JOIN det_Persona_Empresa_Puesto
            ON det_Persona_Empresa_Puesto.id_persona = tbl_Personas.id
            AND det_Persona_Empresa_Puesto.id_puesto = -3
            AND det_Persona_Empresa_Puesto.id_empresa = det_Pase_Personal.id_empresa
            left JOIN tbl_Contactos
            ON tbl_Contactos.id_persona = tbl_personas.id and tbl_Contactos.estatus = 1 --AND tbl_Contactos.id_empresa = det_Persona_Empresa_Puesto.id_empresa
            LEFT JOIN tbl_Empresas
            ON tbl_Empresas.id = det_Persona_Empresa_Puesto.id_empresa
            LEFT JOIN (
                SELECT CONCAT(tbl_Imagenes.link,tbl_Imagenes.nombre) as licencia, id_personal, numero_identificacion as numero_licencia, fecha_expiracion
                FROM tbl_Imagenes
                WHERE id_tipo_toma = 1 and estatus = 1) as F1
            ON F1.id_personal = tbl_personas.id
            LEFT JOIN (
                SELECT CONCAT(tbl_Imagenes.link,tbl_Imagenes.nombre) as identificacion, id_personal, cat_tipo_Identificacion.nombre as tipo_identificacion, numero_identificacion, fecha_expiracion
                FROM tbl_Imagenes
                JOIN cat_tipo_Identificacion
                ON cat_tipo_Identificacion.id = tbl_Imagenes.id_tipo_identificacion
                WHERE id_tipo_toma = 2 and tbl_Imagenes.estatus = 1) as F2
            ON F2.id_personal = tbl_personas.id
            LEFT JOIN (
                SELECT CONCAT(tbl_Imagenes.link,tbl_Imagenes.nombre) as fotopersonal, id_personal
                FROM tbl_Imagenes
                WHERE id_tipo_toma = 3 and estatus = 1) as F3
            ON F3.id_personal = tbl_personas.id
            WHERE tbl_Personas.id = $id AND det_Pase_personal.id_permiso = $idpermiso";
        $respuesta = $this->db->query($query)->Row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getEquiposHerramientasById
    *Parámetros:    {$id} => 
    *Descripción:   Obtiene EquiposHerramientas del pase consultado
    */
    public function getEquiposHerramientasById($id, $permiso){
                $query = "SELECT tbl_Equipos.id_tipo_equipo,
                    cat_Tipo_Equipo.nombre as tipo_equipo,
                    tbl_Equipos.anexo_29,
                    tbl_Equipos.descripcion,
                    tbl_Equipos.numero_serie,
                    tbl_Equipos.marca,
                    tbl_Equipos.modelo,
                    CONCAT(tbl_Personas.nombre, ' ', tbl_Personas.primer_apellido, ' ' , tbl_Personas.segundo_apellido) as resguardo,
                    det_Pase_Equipo.estatus_pase,
                    det_Pase_Equipo.observacion,
                    tbl_Equipos.id,
                    CONCAT(ti.link,'', ti.nombre) as imagen_factura,
                    ti.numero_identificacion as numero_factura,
                    ti.fecha_expiracion as fecha_factura,
                    ctd.nombre as documento_factura,
                    CONCAT(ti2.link,'',ti2.nombre) as imagen_equipo,
                    ti2.numero_identificacion as numero_equipo,
                    ti2.fecha_expiracion as fecha_equipo,
                    ctd2.nombre as documento_equipo,
                    CONCAT(ti3.link,'',ti3.nombre) as imagen_anexo,
                    ti3.numero_identificacion as anexo_29,
                    CONCAT(ti4.link,'',ti4.nombre) as imagen_rf,
                    ti4.numero_identificacion as rf
                    FROM tbl_Equipos
                    JOIN det_Pase_Equipo ON det_Pase_equipo.id_equipo = tbl_Equipos.id
                    JOIN cat_tipo_Equipo ON cat_Tipo_Equipo.id = tbl_Equipos.id_tipo_equipo
                    LEFT JOIN tbl_Imagenes ti ON ti.id_equipo = det_Pase_Equipo.id_equipo AND ti.id_tipo_toma = 4 AND ti.estatus = 1
                    LEFT JOIN tbl_Imagenes ti2 ON ti2.id_equipo = det_Pase_Equipo.id_equipo AND ti2.id_tipo_toma = 5 AND ti2.estatus = 1
                    LEFT JOIN tbl_Imagenes ti3 ON ti3.id_equipo = det_Pase_Equipo.id_equipo AND ti3.id_tipo_toma = 9 AND ti3.estatus = 1
                    LEFT JOIN tbl_Imagenes ti4 ON ti4.id_equipo = det_Pase_Equipo.id_equipo AND ti4.id_tipo_toma = 10 AND ti3.estatus = 1
                    LEFT JOIN tbl_Personas ON tbl_Personas.id = det_Pase_equipo.id_personal
                    LEFT JOIN cat_tipo_Documentos ctd ON ctd.id = ti.id_tipo_identificacion
                    LEFT JOIN cat_tipo_Documentos ctd2 ON ctd2.id = ti2.id_tipo_identificacion
                    WHERE tbl_Equipos.id = $id AND det_Pase_Equipo.id_permiso = $permiso";
        $respuesta = $this->db->query($query)->Row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getVehiculosById
    *Parámetros:    {$id} => 
    *Descripción:   Obtiene Vehiculos del pase consultado
    */
    public function getVehiculosById($id){
        $query = "SELECT tbl_Vehiculos.numero_motor,
            tbl_Vehiculos.anio,
            cat_tipo_vehiculo.nombre as tipo_vehiculo,
            cat_tipo_tarjeta_circulacion.nombre as tipo_tarjeta_circulacion,
            det_Vehiculo_Empresa.numero_tarjeta_circulacion,
            cat_tipo_Aseguradoras.nombre as tipo_aseguradora,
            det_Vehiculo_Empresa.numero_poliza,
            det_Vehiculo_Empresa.fecha_inicio_cobertura,
            det_Vehiculo_Empresa.fecha_fin_cobertura,
            CONCAT(tbl_Personas.nombre, ' ', tbl_Personas.primer_apellido, ' ' , tbl_Personas.segundo_apellido) as chofer,
            tbl_Vehiculos.numero_serie as noSerieVehiculo,
            det_Vehiculo_Empresa.numero_placa as noPlaca,
            tbl_Vehiculos.id,
            det_Pase_Vehiculo.observacion,
            CONCAT(ti.link,'',ti.nombre) as imagen_factura,
            ctt.nombre as tipo_factura,
            ti.numero_identificacion as numero_factura,
            CONCAT(ti2.link,'',ti2.nombre) as imagen_lateral, 
            CONCAT(ti3.link,'',ti3.nombre) as imagen_placa
            FROM tbl_Vehiculos
            JOIN cat_tipo_Vehiculo
            ON cat_tipo_vehiculo.id = tbl_Vehiculos.id_tipo_vehiculo
            JOIN det_Vehiculo_Empresa
            ON det_Vehiculo_Empresa.id_vehiculo = tbl_Vehiculos.id
            JOIN cat_tipo_Tarjeta_Circulacion
            ON cat_tipo_tarjeta_circulacion.id = det_Vehiculo_Empresa.id_tipo_tarjeta_circulacion
            JOIN cat_tipo_Aseguradoras
            ON cat_tipo_Aseguradoras.id = det_Vehiculo_Empresa.id_tipo_aseguradora
            JOIN det_Pase_Vehiculo
            ON det_Pase_Vehiculo.id_vehiculo = tbl_vehiculos.id
            LEFT JOIN det_Vehiculo_Verificacion
            ON det_Vehiculo_Verificacion.id_vehiculo = tbl_Vehiculos.id
            LEFT JOIN tbl_Imagenes ti ON ti.id_vehiculo = det_Pase_Vehiculo.id_vehiculo AND ti.id_tipo_toma = 6 AND ti.estatus = 1
            LEFT JOIN tbl_Imagenes ti2 ON ti2.id_vehiculo = det_Pase_Vehiculo.id_vehiculo AND ti2.id_tipo_toma = 7 AND ti2.estatus = 1
            LEFT JOIN tbl_Imagenes ti3 ON ti3.id_vehiculo = det_Pase_Vehiculo.id_vehiculo AND ti3.id_tipo_toma = 8 AND ti3.estatus = 1
            LEFT JOIN cat_tipo_toma ctt ON ctt.id = ti.id_tipo_toma
            LEFT JOIN cat_tipo_toma ctt2 ON ctt2.id = ti2.id_tipo_toma
            LEFT JOIN cat_tipo_toma ctt3 ON ctt3.id = ti3.id_tipo_toma
            LEFT JOIN tbl_Personas
            ON tbl_Personas.id = det_Pase_Vehiculo.id_chofer
            WHERE tbl_Vehiculos.id = $id";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getVehiculosByPlaca
    *Parámetros:    {$placa} => 
    *Descripción:   Obtiene Vehiculos del pase consultado
    */
    public function getVehiculosByPlaca($placa){
        $query = "SELECT
        tbl_Vehiculos.id,
        tbl_Vehiculos.numero_motor,
        tbl_Vehiculos.id_tipo_vehiculo,
        tbl_Vehiculos.id_tipo_tarjeta_circulacion,
        tbl_Vehiculos.numero_tarjeta_circulacion,
        f1.id_tipo_documento,
        f1.numero_factura,
        f1.id_fotografia_factura,
        f1.fotografia_factura,
        tbl_Vehiculos.id_tipo_aseguradora,
        tbl_Vehiculos.numero_poliza,
        tbl_Vehiculos.vigencia_poliza,
        tbl_Vehiculos.id_tipo_periodo,
        tbl_Vehiculos.fecha_inicio_cobertura,
        tbl_Vehiculos.fecha_fin_cobertura,
        tbl_Vehiculos.estatusvehiculo,
        f2.id_fotografia_lateral,
        f2.fotografia_lateral,
        f3.id_fotografia_placa,
        f3.fotografia_placa
        FROM tbl_Vehiculos
        LEFT JOIN det_Vehiculo_Verificacion
        ON det_Vehiculo_Verificacion.id_vehiculo = tbl_Vehiculos.id
        LEFT JOIN (
            SELECT id as id_fotografia_factura, CONCAT(tbl_Imagenes.link,tbl_Imagenes.nombre) as fotografia_factura, id_vehiculo,
            id_tipo_identificacion as id_tipo_documento, numero_identificacion as numero_factura
            FROM tbl_Imagenes
            WHERE id_tipo_toma = 6 and estatus = 1) as F1
        ON F1.id_vehiculo = tbl_Vehiculos.id
        LEFT JOIN (
            SELECT id as id_fotografia_lateral, CONCAT(tbl_Imagenes.link,tbl_Imagenes.nombre) as fotografia_lateral, id_vehiculo
            FROM tbl_Imagenes
            WHERE id_tipo_toma = 7 and estatus = 1) as F2
        ON F2.id_vehiculo = tbl_Vehiculos.id
        LEFT JOIN (
            SELECT id as id_fotografia_placa, CONCAT(tbl_Imagenes.link,tbl_Imagenes.nombre) as fotografia_placa, id_vehiculo
            FROM tbl_Imagenes
            WHERE id_tipo_toma = 8 and estatus = 1) as F3
        ON F3.id_vehiculo = tbl_Vehiculos.id
        WHERE tbl_Vehiculos.numero_placa = '$placa'";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }
    /*
    *Nombre:        getVehiculosByPlacaPermiso
    *Parámetros:    {$placa, Permiso} => 
    *Descripción:   Obtiene Vehiculos del pase consultado
    */
    public function getVehiculosByPlacaPermiso($placa, $permiso){
        $query = "SELECT
        tbl_Vehiculos.id,
        tbl_Vehiculos.numero_motor,
        tbl_Vehiculos.id_tipo_vehiculo,
        tbl_Vehiculos.id_tipo_tarjeta_circulacion,
        tbl_Vehiculos.numero_tarjeta_circulacion,
        tbl_vehiculos.numero_placa,
        tbl_vehiculos.numero_serie,
        tbl_vehiculos.marca,
        tbl_vehiculos.modelo,
        tbl_vehiculos.anio,
        tbl_vehiculos.color,
        f1.id_tipo_documento,
        f1.numero_factura,
        f1.id_fotografia_factura,
        f1.fotografia_factura,
        tbl_Vehiculos.id_tipo_aseguradora,
        tbl_Vehiculos.numero_poliza,
        tbl_Vehiculos.vigencia_poliza,
        tbl_Vehiculos.id_tipo_periodo,
        tbl_Vehiculos.fecha_inicio_cobertura,
        tbl_Vehiculos.fecha_fin_cobertura,
        tbl_Vehiculos.estatusvehiculo,
        f2.id_fotografia_lateral,
        f2.fotografia_lateral,
        f3.id_fotografia_placa,
        f3.fotografia_placa,
        det_Pase_Vehiculo.id_chofer
        FROM tbl_Vehiculos
        JOIN det_Pase_Vehiculo
        ON det_Pase_Vehiculo.id_vehiculo = tbl_vehiculos.id
        LEFT JOIN det_Vehiculo_Verificacion
        ON det_Vehiculo_Verificacion.id_vehiculo = tbl_Vehiculos.id
        LEFT JOIN (
            SELECT id as id_fotografia_factura, CONCAT(tbl_Imagenes.link,tbl_Imagenes.nombre) as fotografia_factura, id_vehiculo,
            id_tipo_identificacion as id_tipo_documento, numero_identificacion as numero_factura
            FROM tbl_Imagenes
            WHERE id_tipo_toma = 6 and estatus = 1) as F1
        ON F1.id_vehiculo = tbl_Vehiculos.id
        LEFT JOIN (
            SELECT id as id_fotografia_lateral, CONCAT(tbl_Imagenes.link,tbl_Imagenes.nombre) as fotografia_lateral, id_vehiculo
            FROM tbl_Imagenes
            WHERE id_tipo_toma = 7 and estatus = 1) as F2
        ON F2.id_vehiculo = tbl_Vehiculos.id
        LEFT JOIN (
            SELECT id as id_fotografia_placa, CONCAT(tbl_Imagenes.link,tbl_Imagenes.nombre) as fotografia_placa, id_vehiculo
            FROM tbl_Imagenes
            WHERE id_tipo_toma = 8 and estatus = 1) as F3
        ON F3.id_vehiculo = tbl_Vehiculos.id
        WHERE tbl_Vehiculos.numero_placa = '$placa' and det_Pase_Vehiculo.id_permiso = $permiso";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }


    public function procesarDatos($datos){
        $error = true;
        $idpermiso = 0;
        $personal = [];
        $personalWS = [];

        $this->db->trans_begin();
        
        try{
            $respuestaPermisos = $this->addPermiso($datos['permiso']);
            if($respuestaPermisos->Error == 0){
                $idpermiso = $respuestaPermisos->id_pase;
                //Si todo bien aqui sigue el proceso para mandar llamar los metodos para almacenar los datos de personas, equipos, vehiculos,materiales 
                //y hacer el almacenamiento de imagenes y todo el rollo
                for($i = 0; $i < sizeof($datos['persona']); $i++){
                    /*if($datos['persona'][$i]['id_personal_rest'] == 0){
                        $datosREST =  array(
                            "nombre"        => $datos['persona'][$i]['nombre'],
                            "apellido1"     => $datos['persona'][$i]['primerApellido'],
                            "apellido2"     => $datos['persona'][$i]['segundoApellido'],
                            "curp"          => $datos['persona'][$i]['curp'],
                            "rfc"           => "",
                            "ssno"          => $datos['persona'][$i]['numSeguroSocial'],
                            "tipoSanguineo" => "",
                            "idLenel"       => 0,
                            "foto"          => "",
                            "idEmpresa"     => $datos['persona'][$i]['idempresa'],
                            "empresa"       => "",
                            "enrolar"       => false
                        );
                        $dataRESTPersona = $this->addPersonaGeneral($datosREST);

                        if(isset($dataRESTPersona["respuesta_rest"]->datos->id)){
                            $datos['persona'][$i]['id_personal_rest'] = $dataRESTPersona["respuesta_rest"]->datos->id;
                        }else{
                            $error = false;
                        }
                        array_push($personalWS,$dataRESTPersona);
                    }*/

                    if($datos['persona'][$i]['idempresa'] == 0){
                        $datosREST =  array(
                            "rfc"               => $datos['persona'][$i]['rfc'],
                            "nombre"           => $datos['persona'][$i]['empresa'],
                            "clave_patronal"    => $datos['persona'][$i]['clavePatronal'],
                        );
                        $dataRESTEmpresa = $this->addEmpresas($datosREST);
                        if(isset($dataRESTEmpresa->id)){
                            $datos['persona'][$i]['idempresa'] = $dataRESTEmpresa->id;
                        }else{
                            $error = false;
                        }
                    }

                    if($error){
                        $datos['persona'][$i]["tiposeguro"] = 3;
                        $datos['persona'][$i]["numeroseguro"] = ($datos['persona'][$i]["noSeguro"] != "") ? $datos['persona'][$i]["noSeguro"] : '';

                        if($datos['persona'][$i]["numSeguroSocial"] != ""){
                            $datos['persona'][$i]["tiposeguro"] = 1;
                            $datos['persona'][$i]["numeroseguro"] = $datos['persona'][$i]["numSeguroSocial"];
                        }else if($datos['persona'][$i]["noIssste"] != ""){
                            $datos['persona'][$i]["tiposeguro"] = 2;
                            $datos['persona'][$i]["numeroseguro"] = $datos['persona'][$i]["noIssste"];
                        }

                        $respuestaPersonal = $this->addPersonal($idpermiso,$datos['persona'][$i],$datos['permiso']["estatus"]);
                        if($respuestaPersonal->Error == 0){
                            array_push($personal,$respuestaPersonal->id_personal);
                            //Cargar imagenes al servidor
                            //licencia
                            if($datos['persona'][$i]["chofer"] == 1){
                                if($datos['persona'][$i]["fotografiaLicencia"] != ""){
                                    $datoLic = array(
                                        'idpersonal'            => $respuestaPersonal->id_personal,
                                        'idimagen'              => $datos['persona'][$i]["idimagenlicencia"],
                                        'idtipoidentificacion'  => 'null',
                                        'numeroidentificacion'  => $datos['persona'][$i]["noLicencia"],
                                        'fechaexpiracion'       => $datos['persona'][$i]["fechaVenciminetoLic"],
                                        'tipo'                  => 1//Licencia
                                    );
        
                                    $datoLic['nombrearchivo'] = $datos['persona'][$i]["fotografiaLicencia"];
                                    $datoLic['link'] = 'assets/uploads/permisos/personal/';
                                    $respuestaImgLicencia = $this->addImagenesPersonal($datoLic);
                                    if(!$respuestaImgLicencia['status']){
                                        $error = false;
                                    }
                                }
                            }
                            //Identificacion
                            if($datos['persona'][$i]["fotografiaIdentificacion"] != ""){
                                $datoIdent = array(
                                    'idpersonal'            => $respuestaPersonal->id_personal,
                                    'idimagen'              => $datos['persona'][$i]["idimagenidentificacion"],
                                    'idtipoidentificacion'  => $datos['persona'][$i]["tipoIdentificacion"],
                                    'numeroidentificacion'  => '',
                                    'fechaexpiracion'       => $datos['persona'][$i]["fechaVenciminetoIdent"],
                                    'tipo'                  => 2//Identificacion
                                );
        
                                if($datos['persona'][$i]["claveElector"] != ""){
                                    $datoIdent['numeroidentificacion'] = $datos['persona'][$i]["claveElector"];
                                }
                                if($datos['persona'][$i]["noPasaporte"] != ""){
                                    $datoIdent['numeroidentificacion'] = $datos['persona'][$i]["noPasaporte"];
                                }
                                if($datos['persona'][$i]["libretaMar"] != ""){
                                    $datoIdent['numeroidentificacion'] = $datos['persona'][$i]["libretaMar"];
                                }
                                if($datos['persona'][$i]["itinerario"] != ""){
                                    $datoIdent['numeroidentificacion'] = $datos['persona'][$i]["itinerario"];
                                }

                                $datoIdent['nombrearchivo'] = $datos['persona'][$i]["fotografiaIdentificacion"];
                                $datoIdent['link'] = 'assets/uploads/permisos/personal/';
                                $respuestaImgIdentificacion = $this->addImagenesPersonal($datoIdent);
                                if(!$respuestaImgIdentificacion['status']){
                                    $error = false;
                                }
                            }
                            //Fotografia
                            if($datos['persona'][$i]["fotografiapersona"] != ""){
                                $datpPer = array(
                                    'idpersonal'            => $respuestaPersonal->id_personal,
                                    'idimagen'              => $datos['persona'][$i]["idimagenpersona"],
                                    'idtipoidentificacion'  => $datos['persona'][$i]["tipoIdentificacion"],
                                    'numeroidentificacion'  => '',
                                    'fechaexpiracion'       => null,
                                    'tipo'                  => 3//Fotografia personal
                                );

                                $datpPer['nombrearchivo'] = $datos['persona'][$i]["fotografiapersona"];
                                $datpPer['link'] = 'assets/uploads/permisos/personal/';
                                $respuestaImgFotografia = $this->addImagenesPersonal($datpPer);
                                if(!$respuestaImgFotografia['status']){
                                    $error = false;
                                }
                            }
                        }else{
                            $this->sendTelegram("Registro personal: ".json_encode($respuestaPersonal));
                            $error = false;
                        } 
                    }
                }
                
                if($error){
                    if(isset($datos['equipo'])){
                        for($i = 0; $i < sizeof($datos['equipo']); $i++){
                            $respuestaEquipo = $this->addEquipos($idpermiso,$personal,$datos['equipo'][$i]);
                            if($respuestaEquipo->Error == 0){
                                //Cargar imagenes al servidor
                                //Factura
                                if($datos['equipo'][$i]["fotografiaFactura"] != ""){
                                    $datEqFac = array(
                                        'idequipo'                  => $respuestaEquipo->id_equipo,
                                        'idimagen'                  => $datos['equipo'][$i]["idimagenfactura"],
                                        'idtipodocumentovehiculo'   => $datos['equipo'][$i]["tipoDocumento"],
                                        'numerodocumentovehiculo'   => $datos['equipo'][$i]["noFactura"],
                                        'fechaexpiracion'           => null,
                                        'tipo'                      => 4//Herramienta/Equipo
                                    );

                                    $datEqFac['nombre'] = $datos['equipo'][$i]["fotografiaFactura"];
								    $datEqFac['link'] = 'assets/uploads/permisos/equipos/';
                                    $respuestaImgLicencia = $this->addImagenesEquipo($datEqFac);
                                    if(!$respuestaImgLicencia['status']){
                                        $error = false;
                                    }
                                }
                                //Anexxo
                                if($datos['equipo'][$i]["fotografiaAnexo"] != ""){
                                    $datEqFac = array(
                                        'idequipo'                  => $respuestaEquipo->id_equipo,
                                        'idimagen'                  => $datos['equipo'][$i]["idimagenAnexo"],
                                        'idtipodocumentovehiculo'   => 9,
                                        'numerodocumentovehiculo'   => $datos['equipo'][$i]["noFactura"],
                                        'fechaexpiracion'           => null,
                                        'tipo'                      => 9//Herramienta/Equipo Anexo
                                    );

                                    $datEqFac['nombre'] = $datos['equipo'][$i]["fotografiaAnexo"];
								    $datEqFac['link'] = 'assets/uploads/permisos/equipos/';
                                    $respuestaImgLicencia = $this->addImagenesEquipo($datEqFac);
                                    if(!$respuestaImgLicencia['status']){
                                        $error = false;
                                    }
                                }
                                //RF
                                if($datos['equipo'][$i]["fotografiaRF"] != ""){
                                    $datEqFac = array(
                                        'idequipo'                  => $respuestaEquipo->id_equipo,
                                        'idimagen'                  => $datos['equipo'][$i]["idimagenAnexo"],
                                        'idtipodocumentovehiculo'   => 9,
                                        'numerodocumentovehiculo'   => $datos['equipo'][$i]["noFactura"],
                                        'fechaexpiracion'           => null,
                                        'tipo'                      => 10//Herramienta/Equipo RF
                                    );

                                    $datEqFac['nombre'] = $datos['equipo'][$i]["fotografiaRF"];
								    $datEqFac['link'] = 'assets/uploads/permisos/equipos/';
                                    $respuestaImgLicencia = $this->addImagenesEquipo($datEqFac);
                                    if(!$respuestaImgLicencia['status']){
                                        $error = false;
                                    }
                                }
                            }else{
                                $this->sendTelegram("Registro equipos: ".json_encode($respuestaEquipo));
                                $error = false;
                            }
                        }
                    }

                    if(isset($datos['material'])){
                        for($i = 0; $i < sizeof($datos['material']); $i++){
                            $respuestaEquipo = $this->Permisos->addListaMateriales($idpermiso,$personal,$datos['material'][0]);
                            if(isset($respuestaEquipo->id_registro)){
                                $lista = $respuestaEquipo->id_registro;
                                for ($i=0; $i < sizeof($datos['material']); $i++) {
                                    $respuestaEquipo = $this->Permisos->addMateriales($idpermiso,$datos['material'][$i],$lista);
                                    if($respuestaEquipo->Error == 1){
                                        $error = false;
                                    }
                                }
                            }else{
                                $this->sendTelegram("Registro material: ".json_encode($respuestaEquipo));
                                $error = false;
                            }
                        }
                    }

                    if(isset($datos['vehiculo'])){
                        for($i = 0; $i < sizeof($datos['vehiculo']); $i++){
                            $respuestaVehisulo = $this->Permisos->addVehiculos($idpermiso,$personal,$datos['permiso'],$datos['vehiculo'][$i]);
                            if(isset($respuestaVehisulo->id_vehiculo)){
                                //Cargar imagenes al servidor
                                /*if($datos['vehiculo'][$i]["documentoFactura"] != ""){
                                    //Factura Vehiculo
                                    $datVehFact = array(
                                        'idvehiculo' => $respuestaVehisulo->id_vehiculo,
                                        'idimagen' => 0,
                                        'idtipodocumentovehiculo' => $datos['vehiculo'][$i]["tipoDocumento"],
                                        'numerodocumentovehiculo' => $datos['vehiculo'][$i]["noFactura"],
                                        'fechaexpiracion' => null,
                                        'tipo' => 6//Factura vehiculo
                                    );
            
                                    $datVehFact['nombre'] = $datos['vehiculo'][$i]["documentoFactura"];
                                    $datVehFact['link'] = 'assets/uploads/permisos/vehiculos/';
                                    $respuestaImgFactVehiculo = $this->Permisos->addImagenesVehiculo($datVehFact);
                                    if(!$respuestaImgFactVehiculo['status']){
                                        $error = false;
                                    }
                                }*/
            
                                if($datos['vehiculo'][$i]["fotografiaLateral"] != ""){
                                    $datVehLat = array(
                                        'idvehiculo' => $respuestaVehisulo->id_vehiculo,
                                        'idempresa' => $datos['permiso']['idempresa'],
                                        'idtipodocumentovehiculo' => 'null',
                                        'numerodocumentovehiculo' => null,
                                        'fechaexpiracion' => null,
                                        'tipo' => 7//Vehiculo lateral
                                    );
            
                                    $datVehLat['nombre'] = $datos['vehiculo'][$i]["fotografiaLateral"];
                                    $datVehLat['link'] = 'assets/uploads/permisos/vehiculos/';
                                    $respuestaImgLateral = $this->Permisos->addImagenesVehiculo($datVehLat);
                                    if(!$respuestaImgLateral['status']){
                                        $error = false;
                                    }
                                }
            
                                if($datos['vehiculo'][$i]["fotografiaPlaca"] != ""){
                                    $datVehPlaca = array(
                                        'idvehiculo' => $respuestaVehisulo->id_vehiculo,
                                        'idempresa' => $datos['permiso']['idempresa'],
                                        'idtipodocumentovehiculo' => 'null',
                                        'numerodocumentovehiculo' => null,
                                        'fechaexpiracion' => null,
                                        'tipo' => 8//Vehiculo placa
                                    );
            
                                    $datVehPlaca['nombre'] = $datos['vehiculo'][$i]["fotografiaPlaca"];
                                    $datVehPlaca['link'] = 'assets/uploads/permisos/vehiculos/';
                                    $respuestaImgPlaca = $this->Permisos->addImagenesVehiculo($datVehPlaca);
                                    if(!$respuestaImgPlaca['status']){
                                        $error = false;
                                    }
                                }
                            }else{
                                $this->sendTelegram("Registro material: ".json_encode($respuestaVehisulo));
                                $error = false;
                            }
                        }
                    }
                }
            }else{
                $this->sendTelegram("Registro Permiso: ".json_encode($respuestaPermisos));
                $error = false;
            }
        }catch(\Exception $e){
            $error = false;
            $this->sendTelegram(json_encode($e));
        }

        if ($this->db->trans_status() === FALSE || !$error){
            $this->db->trans_rollback();
            $response = [
                'status' 	=> false,
                'message'	=> 'No fue posible realizar el registro',
                'data'		=> [$datos],
                'token' 	=> null,
            ];
        }else{
            $this->db->trans_commit();
            $response = [
                'status' 	=> true,
                'message'	=> 'Registro Exitoso',
                'data'		=> ['idpermiso' => $idpermiso, 'personal' => $personal],
                'token' 	=> null
            ];
        }
        return $response;
    }

    /*
    *Nombre:        addPermiso
    *Parámetros:    {$datos} => 
    *Descripción:   Realiza el almacenamiento de una nuevo permiso
    */
    public function addPermiso($datos){
        $datosLOG = $datos;
        $datosLOG['tiposp']     = "PERMISO";
        $datosLOG['idlog']      = "0";
        $datosLOG['idusuario']  = $this->idusuario;
        $respuestaLog = $this->addRespaldoInformacion($datosLOG);
        if(isset($respuestaLog[0]->message)){
            $this->idLogEventos = $respuestaLog[0]->message;
            $spSeguimiento = "EXEC sp_addSeguimiento 
                ".$datosLOG['idempresa'].", 
                ".$datosLOG['idusuario'].", 
                ".$this->idLogEventos;
            $this->db->query($spSeguimiento)->row();
        }

        $sp = "EXEC sp_addPases 
            ".$datos['idempresa'].",
            ".$datos['idpersona'].",
            ".$datos['idcontratos'].",
            ".$this->idusuario.",
            ".$datos['idtipopermiso'].",
            '".$datos['visita']."',
            ".$datos['idtipoactividad'].",
            ".$datos['idtipovigencia'].",
            ".$datos['dias'].",
            '".$datos['fechainicio']."',
            '".$datos['fechatermino']."',
            ".$datos['idrecinto'].",
            ".$datos['idfiscalizado'].",
            ".$this->db->escape($datos['motivo']).",
            ".$datos['permisogrupal'].",
            '".$datos['curpresponsable']."',
            ".$datos['estatus'];
        return $this->db->query($sp)->row();
    }

    public function addPersonaGeneral($datos){
        $myWS = new WS();
        $myWS->url = 'https://pis-api-personas-qa.azurewebsites.net/';
		$myWS->token = $this->session->_token;
        //$resp = $myWS->login();

        $myWS->endpoint = 'api/Personas/v1';
        $myWS->parametros = $datos;
        $dataWS = $myWS->peticion_post();
        return $dataWS;
    }
    public function addEmpresas($datos){
        $myWS = new WS();
        $myWS->url = BASE_URL_REST;
		$myWS->token = $this->session->_token;
        //$resp = $myWS->login();

        $myWS->endpoint = 'empresas';
        $myWS->parametros = $datos;
        $dataWS = $myWS->peticion_post_rest();
        return $dataWS;
    }

    public function addRespaldoInformacion($datos){
        $myWS = new WS();
        $myWS->url = 'https://pis-apiman-restfinav1.azurewebsites.net/api/trace';

        //$myWS->parametros = $datos;
        $dataWS = $myWS->peticion_oscar_omar($datos);
        return $dataWS;
    }

    public function sendTelegram($error){
        $myWS = new WS();
        $myWS->url = 'https://api.telegram.org/bot1879347405:AAGuOUdaquRpauOoHPGcycge19yCunJBhS0/sendMessage?chat_id=-533315678&text='.$error;

        //$myWS->parametros = $datos;
        $dataWS = $myWS->peticion_get();
        return $dataWS;
    }

    /*
    *Nombre:        addPersonal
    *Parámetros:    {$datos} => 
    *Descripción:   Realiza el almacenamiento del personal de un permiso
    */
    public function addPersonal($idpermiso,$datos,$estatus){
        $datosLOG = $datos;
        $datosLOG['tiposp']         = "PERSONA";
        $datosLOG['idlog']          = $this->idLogEventos;
        $datosLOG['idusuario']      = $this->idusuario;
        $datosLOG['idempresarest']  = $this->session->_id_empresa_rest;
        $datosLOG['estatus']        = $estatus;
        $datosLOG['idpermiso']      = $idpermiso;
        $respuestaLog = $this->addRespaldoInformacion($datosLOG);

        $sp = "EXEC sp_addPersonalPermisos $idpermiso,
            ".$datos['tipoEmpleado'].",
            ".$datos['entidadGobierno'].",
            ".$datos['idempresa'].",
            ".$estatus.",
            '".$datos['empresa']."',
            '".$datos['clavePatronal']."',
            ".$datos['idpersona'].",
            ".$datos['id_personal_rest'].",
            '".$datos['nombre']."',
            '".$datos['primerApellido']."',
            '".$datos['segundoApellido']."',
            '".$datos['curp']."',
            null,
            null,
            ".$datos['nacionalidad'].",
            ".$datos['tiposeguro'].",
            '".$datos['numeroseguro']."',
            ".$datos['aseguradora'].",
            null,
            null,
            ".$datos['idcontacto'].",
            '".$datos['correo']."',
            '".$datos['numtelefono']."',
            ".$this->idusuario;
        return $this->db->query($sp)->row();
    }

    public function addImagenesPersonal($datos,$idusuario = null){
        $datosLOG = $datos;
        $datosLOG['tiposp']         = "IMAGEN PERSONA";
        $datosLOG['idlog']          = $this->idLogEventos;
        $datosLOG['idusuario']      = (is_null($idusuario) ? $this->idusuario : $idusuario);
        $respuestaLog = $this->addRespaldoInformacion($datosLOG);

        $sp = "EXEC sp_addImagenesPersonal ".$datos['idpersonal'].",
            ".$datos['idimagen'].",
            ".$datos['idtipoidentificacion'].",
            '".$datos['numeroidentificacion']."',
            '".$datos['fechaexpiracion']."',
            '".$datos['nombrearchivo']."',
            '".$datos['link']."',
            ".$datos['tipo'].",
            ".(is_null($idusuario) ? $this->idusuario : $idusuario).",
            '127.0.0.1'";
        $respuesta = $this->db->query($sp)->row();
        if($respuesta->Error == 1){
            $response = [
                'status' 	=> false,
                'message'	=> 'No fue posible realizar el registro',
                'data'		=> null,
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }else{
            $response = [
                'status' 	=> true,
                'message'	=> 'Registro Exitoso',
                'data'		=> ['id' => $respuesta->id_imagen],
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }
        return $response;
    }

    /*
    *Nombre:        addEquipos
    *Parámetros:    {$datos} => 
    *Descripción:   Realiza el almacenamiento del personal de un permiso
    */
    public function addEquipos($idpermiso,$personal,$datos){
        $datosLOG = $datos;
        $datosLOG['tiposp']         = "EQUIPO";
        $datosLOG['idlog']          = $this->idLogEventos;
        $datosLOG['idusuario']      = $this->idusuario;
        $datosLOG['resguardo']      = (isset($personal[$datos['resguardo']]) ? $personal[$datos['resguardo']] : '');
        $datosLOG['idpermiso']      = $idpermiso;
        $respuestaLog = $this->addRespaldoInformacion($datosLOG);

        $sp = "EXEC sp_addEquipoPermisos ".$idpermiso.",
            ".$datos['idequipo'].",
            ".$datos['tipoEquipo'].",
            '".$datos['modelo']."',
            '".$datos['marca']."',
            '".$datos['noSerie']."',
            ".$personal[$datos['resguardo']].",
            '".$datos['anexo29']."',
            ".$this->db->escape($datos['descripcionEquipo']).",
            ".$this->idusuario;
        return $this->db->query($sp)->row();
    }

    public function addImagenesEquipo($datos){
        $datosLOG = $datos;
        $datosLOG['tiposp']         = "IMAGEN EQUIPO";
        $datosLOG['idlog']          = $this->idLogEventos;
        $datosLOG['idusuario']      = $this->idusuario;
        $respuestaLog = $this->addRespaldoInformacion($datosLOG);

        $sp = "EXEC sp_addImagenesEquipo ".$datos['idequipo'].",
            ".$datos['idimagen'].",
            '".$datos['nombre']."',
            '".$datos['link']."',
            ".$datos['idtipodocumentovehiculo'].",
            '".$datos['numerodocumentovehiculo']."',
            '".$datos['fechaexpiracion']."',
            ".$datos['tipo'].",
            ".$this->idusuario;
        $respuesta = $this->db->query($sp)->row();
        if($respuesta->Error == 1){
            $response = [
                'status' 	=> false,
                'message'	=> 'No fue posible realizar el registro',
                'data'		=> null,
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }else{
            $response = [
                'status' 	=> true,
                'message'	=> 'Registro Exitoso',
                'data'		=> ['id' => $respuesta->id_imagen],
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }
        return $response;
    }

    /*
    *Nombre:        addMateriales
    *Parámetros:    {$datos} => 
    *Descripción:   Realiza el almacenamiento del personal de un permiso
    */
    public function addListaMateriales($idpermiso,$personal,$datos){
        $datosLOG = $datos;
        $datosLOG['tiposp']         = "LISTA MATERIALES";
        $datosLOG['idlog']          = $this->idLogEventos;
        $datosLOG['idusuario']      = $this->idusuario;
        $datosLOG['idpermiso']      = $idpermiso;
        $datosLOG['responsable']    = ((isset($personal[$datos['responsable']]) && $datos['responsable'] != "") ? $personal[$datos['responsable']] : $personal[0]);
        $respuestaLog = $this->addRespaldoInformacion($datosLOG);

        if(isset($personal[$datos['responsable']]) && $datos['responsable'] != ""){
            $idpersona = $personal[$datos['responsable']];
        }else{
            $idpersona = $personal[0];
        }

        $sp = "EXEC sp_addListaMateriales ".$personal[$datos['responsable']].",
        ".$idpermiso.",
        ".$this->idusuario;
        return $this->db->query($sp)->row();
    }

    public function addMateriales($idpermiso,$datos,$lista){
        $datosLOG = $datos;
        $datosLOG['tiposp']         = "MATERIALES";
        $datosLOG['idlog']          = $this->idLogEventos;
        $datosLOG['idusuario']      = $this->idusuario;
        $datosLOG['idpermiso']      = $idpermiso;
        $datosLOG['lista']          = $lista;
        $datosLOG['idmaterial']     = "0";
        $respuestaLog = $this->addRespaldoInformacion($datosLOG);

        $sp = "EXEC sp_addMaterialesPermisos ".$idpermiso.",
            0,
            ".$lista.",
            ".$datos['tipomaterial'].",
            ".$datos['tipomedida'].",
            ".$datos['cantidad'].",
            ".$this->db->escape($datos['descripcion']).",
            ".$this->idusuario;
        return $this->db->query($sp)->row();
    }

    /*
    *Nombre:        addVehiculos
    *Parámetros:    {$datos} => 
    *Descripción:   Realiza el almacenamiento del personal de un permiso
    */
    public function addVehiculos($idpermiso,$personal,$permiso,$datos){
        $datosLOG = $datos;
        $datosLOG['tiposp']         = "VEHICULOS";
        $datosLOG['idlog']          = $this->idLogEventos;
        $datosLOG['idusuario']      = $this->idusuario;
        $datosLOG['idpermiso']      = $idpermiso;
        $datosLOG['idempresa']      = (isset($permiso['idempresa']) ? $permiso['idempresa'] : '');
        $datosLOG['chofer']         = (isset($personal[$datos['chofer']]) ? $personal[$datos['chofer']] : '');
        $respuestaLog = $this->addRespaldoInformacion($datosLOG);

        $sp = "EXEC sp_addVehiculosPermisos ".$permiso['idempresa'].",
            ".$datos['idvehiculo'].",
            '".$datos['noPlaca']."',
            '".$datos['noSerie']."',
            '".$datos['noMotor']."',
            '".$datos['marca']."',
            '".$datos['modelo']."',
            ".$datos['anio'].",
            '".$datos['color']."',
            ".$datos['tipoVehiculo'].",
            ".$datos['tipoTarCircu'].",
            '".$datos['noTarjeta']."',
            ".$datos['aseguradora'].",
            '".$datos['noPoliza']."',
            '".$datos['vigenciaPoliza']."',
            ".$datos['periodoPago'].",
            '".$datos['periodoFechaInicio']."',
            '".$datos['periodoFechaFin']."',
            ".$idpermiso.",
            ".$personal[$datos['chofer']].",
            ".$this->idusuario;
        return $this->db->query($sp)->row();
    }

    public function addImagenesVehiculo($datos){
        $datosLOG = $datos;
        $datosLOG['tiposp']         = "IMAGENES VEHICULOS";
        $datosLOG['idlog']          = $this->idLogEventos;
        $datosLOG['idusuario']      = $this->idusuario;
        $respuestaLog = $this->addRespaldoInformacion($datosLOG);

        $sp = "EXEC sp_addImagenesVehiculo ".$datos['idvehiculo'].",
            ".$datos['idempresa'].",
            '".$datos['nombre']."',
            '".$datos['link']."',
            ".$datos['tipo'].",
            ".$this->idusuario;
        $respuesta = $this->db->query($sp)->row();
        if($respuesta->Error == 1){
            $response = [
                'status' 	=> false,
                'message'	=> 'No fue posible realizar el registro',
                'data'		=> null,
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }else{
            $response = [
                'status' 	=> true,
                'message'	=> 'Registro Exitoso',
                'data'		=> ['id' => $respuesta->id_imagen],
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }
        return $response;
    }

    /*
    *Nombre:        addPeticiones
    *Parámetros:    {$tipo,$datos} => tipo de la petición, datos de la petición
    *Descripción:   realiza el almacenamiento de una nueva petición al servicio de consumo de web service
    */
    public function addPeticiones($tipo,$datos){
        $sp = "EXEC sp_addPeticion $tipo,'".$datos."'";
        $respuesta = $this->db->query($sp)->row();
        if($respuesta->Error == 1){
            $response = [
                'status' 	=> false,
				'message'	=> 'No fue posible realizar el registro',
                'data'		=> null,
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }else{
            $response = [
                'status' 	=> true,
                'message'	=> 'Almacenado con éxito',
                'data'		=> ["id_peticion" => $respuesta->id_peticion],
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }
        return $response;
    }

    /*
    *Nombre:        upPersonalVerificacion
    *Parámetros:    {$datos} => 
    *Descripción:   Realiza el almacenamiento del la observacion y la validacion de los accesos
    */
    public function upPersonalVerificacion($datos){
		$sp = "EXEC sp_upPersonalVerificacion ".$datos['id_permiso'].",
            ".$datos['id_empleado'].",
            ".$datos['estatus_empleado'].",
            '".$datos['observaciones']."',
            ".$this->idusuario."";
        $respuesta = $this->db->query($sp)->row();
        if($respuesta->Error == 1){
            $response = [
                'status' 	=> false,
                'message'	=> 'No fue posible realizar el registro',
                'data'		=> null,
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }else{
            $response = [
                'status' 	=> true,
                'message'	=> 'Registro Exitoso',
                'data'		=> ['id_usuario_registro' => $this->idusuario],
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }
        return $response;
	}

    /*
    *Nombre:        upPersonalVerificacionMigracion
    *Parámetros:    {$datos} => 
    *Descripción:   Realiza el almacenamiento del la observacion y la validacion de los accesos
    */
    public function upPersonalVerificacionMigracion($datos){
		$sp = "EXEC sp_upPersonalVerificacionMigracion ".$datos['id_permiso'].",
            ".$datos['id_empleado'].",
            ".$datos['estatus_empleado'].",
            '".$datos['observaciones']."',
            ".$this->idusuario."";
        $respuesta = $this->db->query($sp)->row();
        if($respuesta->Error == 1){
            $response = [
                'status' 	=> false,
                'message'	=> 'No fue posible realizar el registro',
                'data'		=> null,
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }else{
            $response = [
                'status' 	=> true,
                'message'	=> 'Registro Exitoso',
                'data'		=> ['id_usuario_registro' => $this->idusuario],
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }
        return $response;
	}

    /*
    *Nombre:        upEquipoVerificacion
    *Parámetros:    {$datos} => 
    *Descripción:   Realiza el almacenamiento del la observacion y la validacion de los accesos
    */
	public function upEquipoVerificacion($datos){
		$sp = "EXEC sp_upEquipoVerificacion  ".$datos['id_permiso'].",
            ".$datos['id_equipo'].",
            ".$datos['estatus_equipo'].",
            '".$datos['observaciones']."',
            ".$this->idusuario."";
        $respuesta = $this->db->query($sp)->row();
        if($respuesta->Error == 1){
            $response = [
                'status' 	=> false,
                'message'	=> 'No fue posible realizar el registro',
                'data'		=> null,
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }else{
            $response = [
                'status' 	=> true,
                'message'	=> 'Registro Exitoso',
                'data'		=> ['id_usuario_registro' => $this->idusuario],
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }
        return $response;
	}

    /*
    *Nombre:        upMaterialVerificacion
    *Parámetros:    {$datos} => 
    *Descripción:   Realiza el almacenamiento del la observacion y la validacion de los accesos
    */
	public function upMaterialVerificacion($datos){
		$sp = "EXEC sp_upMaterialVerificacion  ".$datos['id_permiso'].",
            ".$datos['id_lista'].",
            ".$datos['estatus_material'].",
            ".$this->idusuario."";
        $respuesta = $this->db->query($sp)->row();
        if($respuesta->Error == 1){
            $response = [
                'status' 	=> false,
                'message'	=> 'No fue posible realizar el registro',
                'data'		=> null,
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }else{
            $response = [
                'status' 	=> true,
                'message'	=> 'Registro Exitoso',
                'data'		=> ['id_usuario_registro' => $this->idusuario],
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }
        return $response;
	}


    /*
    *Nombre:        upVehiculosVerificacion
    *Parámetros:    {$datos} => 
    *Descripción:   Realiza el almacenamiento del la observacion y la validacion de los accesos
    */
	public function upVehiculosVerificacion($datos){
		$sp = "EXEC sp_upVehiculosVerificacion  ".$datos['id_permiso'].",
            ".$datos['id_vehiculo'].",
            ".$datos['estatus_vehiculo'].",
            '".$datos['observaciones']."',
            ".$this->idusuario."";
        $respuesta = $this->db->query($sp)->row();
        if($respuesta->Error == 1){
            $response = [
                'status' 	=> false,
                'message'	=> 'No fue posible realizar el registro',
                'data'		=> null,
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }else{
            $response = [
                'status' 	=> true,
                'message'	=> 'Registro Exitoso',
                'data'		=> ['id_usuario_registro' => $this->idusuario],
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }
        return $response;
	}

     /*
    *Nombre:        getPeticiones
    *Parámetros:    {$id} => id peticion
    *Descripción:   Retorna todos los registros de las peticiones al web service en 
    *               base a la especificación del id
    */
    public function getPeticiones($id){
		$query = "SELECT datos_respuesta FROM v_getPeticiones WHERE id = $id";
		$respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> ($respuesta->datos_respuesta == null) ? $respuesta : ['datos_respuesta' => json_decode($respuesta->datos_respuesta)]
		];
	}

     /*
    *Nombre:        del
    *Parámetros:    {$id} => id permiso
    *Descripción:   Realiza la inactivacion de permiso
    */
    public function del($id, $observacion){
        $sp = "EXEC sp_delPases $id,'".$observacion."' ,".$this->idusuario."";
        $respuesta = $this->db->query($sp)->row();
        if($respuesta->Error == 1){
            $response = [
                'status' 	=> false,
                'message'	=> 'No fue posible realizar la cancelacion',
                'data'		=> null,
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }else{
            $response = [
                'status' 	=> true,
                'message'	=> 'Registro cancelado con éxito',
                'data'		=> null,
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }
        return $response;
    }

    /*
    *Nombre:        del_vencidos
    *Parámetros:    {$id} => id permiso
    *Descripción:   Realiza la inactivacion de permiso por vencimiento
    */
    public function del_vencidos($id){
        $sp = "EXEC sp_delPasesVencidos $id,".$this->idusuario."";
        $respuesta = $this->db->query($sp)->row();
        if($respuesta->Error == 1){
            $response = [
                'status' 	=> false,
                'message'	=> 'No fue posible realizar la cancelacion',
                'data'		=> null,
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }else{
            $response = [
                'status' 	=> true,
                'message'	=> 'Registro cancelado con éxito',
                'data'		=> null,
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }
        return $response;
    }

    /*
    *Nombre:        up
    *Parámetros:    {$datos} => datos a actualizar
    *Descripción:   Realiza la actualización de la revisión en una solicitud
    */
    public function up($datos){
        $codigo = mt_rand(100000, 999999);
        $sp = "EXEC sp_upPaseEstatus ".$datos['idpermiso'].", ".$codigo.",  ".$datos['idarea'].", ".$datos['estatus'].", ".$this->idusuario."";
        $respuesta = $this->db->query($sp)->row();
        if($respuesta->Error == 1){
            $response = [
                'status' 	=> false,
                'message'	=> 'No fue posible realizar la actualización',
                'data'		=> null,
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }else{
            $response = [
                'status' 	=> true,
                'message'	=> 'Registro Exitoso',
                'data'		=> null,
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }
        return $response;
    }

    /*
    *Nombre:        REchazoMotivo
    *Parámetros:    {$datos} => datos a actualizar
    *Descripción:   Realiza la actualización de la revisión en una solicitud
    */
    public function rechazoMotivo($datos){
        $sp = "EXEC sp_upPaseEstatusMotivo ".$datos['idpermiso'].", ".$datos['idarea'].", '".$datos['observacion']."', ".$this->idusuario."";
        $respuesta = $this->db->query($sp)->row();
        if($respuesta->Error == 1){
            $response = [
                'status' 	=> false,
                'message'	=> 'No fue posible realizar la actualización',
                'data'		=> null,
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }else{
            $response = [
                'status' 	=> true,
                'message'	=> 'Registro Exitoso',
                'data'		=> null,
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }
        return $response;
    }

    /*
    *Nombre:        upPermisoMigracion
    *Parámetros:    {$datos} => datos a actualizar
    *Descripción:   Realiza la actualización de la revisión en una solicitud
    */
    public function upPermisoMigracion($datos){
        $sp = "EXEC sp_upPaseEstatusMigracion ".$datos['idpermiso'].", ".$this->idusuario."";
        $respuesta = $this->db->query($sp)->row();
        if($respuesta->Error == 1){
            $response = [
                'status' 	=> false,
                'message'	=> 'No fue posible realizar la actualización',
                'data'		=> null,
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }else{
            $response = [
                'status' 	=> true,
                'message'	=> 'Registro Exitoso',
                'data'		=> null,
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }
        return $response;
    }

    /*
    *Nombre:        updatePermiso
    *Parámetros:    {id,$columna,$valortxt,$valorint,$idusuario} => id permiso, columna a actualizar, valor a actualizar texto, valor a actualizar numerico
    *Descripción:   Realiza la actualización del pase de acesso 
    */
    public function updatePermiso($id,$columna,$valortxt,$valorint,$idusuario){
        $sp = "EXEC sp_upPase $id,'$columna','$valortxt',$valorint,'$idusuario'";
        $respuesta = $this->db->query($sp)->row();
        if($respuesta->Error == 1){
            $response = [
                'status' 	=> false,
				'message'	=> 'No fue posible realizar el registro',
                'data'		=> null,
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }else{
            $response = [
                'status' 	=> true,
                'message'	=> 'Registro Exitoso',
                'data'		=> null,
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }
        return $response;
    }
    /*
    *Nombre:        getDates
    *Parámetros:    {id} => id permiso
    *Descripción:   Obtiene fechas del detallado del pase
    */
    public function getDates($permiso){
        $sp = "SELECT dpp.id_personal, ti.fecha_expiracion
        FROM tbl_Pases tp
        JOIN det_Pase_Personal dpp on dpp.id_permiso = tp.id
        JOIN tbl_Imagenes ti on ti.id_personal = dpp.id_personal
        WHERE tp.id = $permiso and (ti.id_tipo_toma = 1 or ti.id_tipo_toma = 2)";

        $sp2 = " SELECT tv.id as id_vehiculo, tv.vigencia_poliza, tv.fecha_fin_cobertura
        FROM tbl_Pases tp
        JOIN det_Pase_Vehiculo dpv on dpv.id_permiso = tp.id
        JOIN tbl_Vehiculos tv on tv.id = dpv.id_vehiculo
        WHERE tp.id = $permiso";

        $respuesta[] = $this->db->query($sp)->result();
        $respuesta[] = $this->db->query($sp2)->result();

        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    public function getPersonalValidacion($idpermiso){
        $query = "SELECT tbl_Pases.id as id_pase,
        tbl_Personas.id,
        cat_tipo_empleado.nombre as tipo_persona,
        CONCAT(tbl_Personas.nombre,' ',tbl_Personas.primer_apellido,' ',tbl_Personas.segundo_apellido) as nombre,
        tbl_Personas.nombre as nombre_persona,
        cat_tipo_Nacionalidad.nombre as nacionalidad,
        det_Pase_Personal.estatus_pase,
        det_Pase_Personal.id_usuario_registro,
        det_Pase_Personal.id_usuario_registro_migracion,
        det_Pase_Personal.estatus_pase_migracion,
        ISNULL(STUFF((
            SELECT ', '+convert(varchar,cerp.nombre)
            FROM det_Pase_Personal dpp
            INNER JOIN cat_estatus_Registro_Pases cerp
            ON dpp.estatus_pase = cerp.id or dpp.estatus_pase_migracion = cerp.id
            WHERE dpp.id_personal = tbl_Personas.id
            AND dpp.id_permiso = $idpermiso
            AND dpp.estatus = 1
            FOR XML PATH('')
        ), 1, 2, ''),'') as estatus,
        ISNULL(STUFF((
            SELECT ', '+convert(varchar, tc.telefono)
            FROM tbl_Contactos tc
            WHERE tc.id_persona = tbl_Personas.id
            FOR XML PATH('')
        ), 1, 2, ''),'') as telefonos
        FROM tbl_Pases
        JOIN det_Pase_Personal
        ON det_Pase_Personal.id_permiso = tbl_Pases.id
        JOIN tbl_Personas
        ON tbl_Personas.id = det_Pase_Personal.id_personal
        JOIN cat_tipo_Nacionalidad
        ON cat_Tipo_Nacionalidad.id = tbl_Personas.id_nacionalidad 
        JOIN cat_tipo_Empleado
        ON cat_tipo_empleado.id = det_pase_personal.id_tipo_persona
        WHERE tbl_Pases.id = $idpermiso";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    public function getEstatusValidacion($idpermiso){

        $query0 = "SELECT 
        COUNT(CASE WHEN det_Pase_Personal.estatus_pase_migracion=8 THEN 1 WHEN det_Pase_Personal.estatus_pase_migracion=7 THEN 1 ELSE NULL END) as 'validados_personas_migracion',
        COUNT(CASE WHEN det_Pase_Personal.estatus_pase_migracion=9 THEN 1 ELSE NULL END) as 'pendientes_personas_migracion'
        FROM det_Pase_Personal
        WHERE det_Pase_Personal.id_permiso = $idpermiso";

        $query1 = "SELECT 
        COUNT(CASE WHEN det_Pase_Personal.estatus_pase=4 THEN 1 WHEN det_Pase_Personal.estatus_pase=5 THEN 1 ELSE NULL END) as 'validados_personas_api',
        COUNT(CASE WHEN det_Pase_Personal.estatus_pase=6 THEN 1 ELSE NULL END) as 'pendientes_personas_api'
        FROM det_Pase_Personal
        WHERE det_Pase_Personal.id_permiso = $idpermiso";

        $query2 = "SELECT
        COUNT(CASE WHEN det_Pase_Equipo.estatus_pase != 3 THEN 1 ELSE NULL END) as 'validados_equipos',
        COUNT(CASE WHEN det_Pase_Equipo.estatus_pase = 3 THEN 1 ELSE NULL END) as 'pendientes_equipos'
        FROM det_Pase_Equipo
        WHERE det_Pase_Equipo.id_permiso = $idpermiso";

        $query3 = "SELECT COUNT(CASE WHEN det_Pase_Materiales.estatus_pase = 3 THEN 1 ELSE NULL END) as 'pendientes_material'
        FROM det_Pase_Materiales
        WHERE det_Pase_Materiales.id_permiso = $idpermiso";

        $query4 = "SELECT
        COUNT(CASE WHEN det_Pase_Vehiculo.estatus_pase!=6 THEN 1 ELSE NULL END) as 'validados_vechiculos',
        COUNT(CASE WHEN det_Pase_Vehiculo.estatus_pase = 6 THEN 1 ELSE NULL END) as 'pendientes_vechiculos'
        FROM det_Pase_Vehiculo
        WHERE det_Pase_Vehiculo.id_permiso = $idpermiso";

        $respuesta[] = $this->db->query($query0)->row();
        $respuesta[] = $this->db->query($query1)->row();
        $respuesta[] = $this->db->query($query2)->row();
        $respuesta[] = $this->db->query($query3)->row();
        $respuesta[] = $this->db->query($query4)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getObservacionesPermisos
    *Parámetros:    {$id} => id permiso
    *Descripción:   Obtiene las observaciones del permiso
    */
    public function getObservacionesPermisos($id){
        $query = "SELECT * FROM v_getPersonalEstatusPermiso WHERE id = $id";
        $respuesta = $this->db->query($query)->row();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    /*
    *Nombre:        getAllTipoPermiso
    *Parámetros:    
    *Descripción:   Obtiene la lista de tipos de permiso
    */
    public function getAllTipoPermiso(){
        $query = "SELECT * FROM cat_tipo_Permiso WHERE estatus = 1";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }

    public function getDataFilter($data){

        $fecha_inicio = !empty($data['f_fecha_inicio']) ? '\''.$data['f_fecha_inicio'].'\'' : 'null' ;
        $fecha_final = !empty($data['f_fecha_final']) ? '\''.$data['f_fecha_final'].'\'' : 'null' ;
        $noSolicitud = !empty($data['f_noSolicitud']) ? $data['f_noSolicitud'] : 'null' ;
        $usuario = !empty($data['f_usuario']) ? $data['f_usuario'] : 'null' ;
        $entidad = !empty($data['f_entidad']) ? $data['f_entidad'] : 'null' ;
        $vigencia = !empty($data['f_vigencia']) ? $data['f_vigencia'] : 'null' ;
        $tpermiso = !empty($data['f_tpermiso']) ? $data['f_tpermiso'] : 'null' ;
        $estatus = !empty($data['f_estatus']) ? $data['f_estatus'] : 'null' ;
        /*$placa = !empty($data['f_placa']) ? $data['f_placa'] : 'null' ;
        $noSerie = !empty($data['f_noSerie']) ? $data['f_noSerie'] : 'null' ;
        $marca = !empty($data['f_marca']) ? $data['f_marca'] : 'null' ;*/
        $mOrde = !empty($data['f_mOrde']) ? $data['f_mOrde'] : 'null' ;

        $sp = "EXEC sp_getDatosPasesFiltro 
        @FechaInicio = $fecha_inicio, 
        @FechaTermino = $fecha_final,
        @IdPase = $noSolicitud,
        @IdUsuario = $usuario,
        @IdEmpresa = $entidad,
        @IdTipoVigencia = $vigencia,
        @IdTipoPermiso = $tpermiso,
        @IdEstatusPase = $estatus,
        @OrderBy = $mOrde
        ";

        /*
        @Placa= $placa,
        @NoSerie= $noSerie,
        @Marca= $marca,
        */ 

        $query = $this->db->query($sp);
        if($query->num_rows() > 0){
            return [
                'status' 	=> true,
                'message'	=> '',
                'data'		=> $query->result(),
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }else {
            return [
                'status' 	=> false,
                'message'	=> 'No existen coincidencias',
                'data'		=> null,
                'token' 	=> $this->security->get_csrf_hash()
            ];
        }
    }

    /*
    *Nombre:        PasesVencidos
    *Parámetros:    {} => 
    *Descripción:   Se utiliza para dar de baja los permisos que han vencido
    */
    public function PasesVencidos(){
        $query = "EXEC sp_PasesVencidos";
        $respuesta = $this->db->query($query)->result();
        return [
			'status' 	=> true,
			'message'	=> '',
			'data'		=> $respuesta
		];
    }
}