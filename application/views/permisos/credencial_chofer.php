<style type="text/Css">
    page.tipofuente{
        font-family: "Arial", sans-serif;
    }
    div.rojo{
        height: 10%;
        background: #691C32;
    }
    div.verde{
        height: 5%;
        background: #10312B;
        font-size: 12.0pt;
        padding: 10px 10px;    
        text-align:center;
        color:#ffffff;
    }
    .vdecorto{ 
        background: #10312B;
        /*border-radius: 0px 0px 45px 0px;*/
        text-align:center;
        color:#ffffff;
    }
    .gris{
        text-align:center;
        background: #6f7271;
    }
    .fuente_Gris{
        color: #6f7271;
        font-size: 11.0pt;
    }
    .tamanoImg{
        width: 200px;
        height: 60px;
        margin:20px 20px 0px 10px;
    }

</style>
    <?php $encoding = 'UTF-8'; ?>
  <page class="tipofuente"backtop="7mm" backbottom="7mm" backleft="10mm" backright="10mm">
  
        <div class="rojo" style="display: flex;">
            <table>
                <tr>
                    <td><img class="tamanoImg" style="" src="<?php echo base_url('assets/logotipos/SEMAR500.png'); ?>" alt="logo_manzanillo"></td>
                    <td width=410 style="text-align: right;"><img class="tamanoImg" src="<?php echo base_url('assets/logotipos/LogoManzanillo.png'); ?>" alt="logo_manzanillo"></td>
                </tr>
            </table>
        </div>
        
        <div class="verde">
            <?php 
                $fecha1= new DateTime(date('Y-m-d'));
                $fecha2= new DateTime($permiso["data"]->fecha_termino);
                $diff = $fecha1->diff($fecha2);
            ?>
            <br>PERMISO DE ACCESO<br>
            <br><?php echo mb_convert_case($permiso["data"]->tipo_recinto, MB_CASE_UPPER, $encoding); ?> 
        </div>
            <table>
                <tr>
                    <td width=335 class="vdecorto">
                            <br>DATOS DEL TRANSPORTISTA
                    </td>
                    <td class="gris" width=330>
                        <br>NO. DE PASE: <b><?php echo $permiso["data"]->id?></b>     
                    </td>
                </tr>
            </table> 
            <table>
                <tr>
                    <td width=410 style="text-align: left;">
                        <img style="width: 225;height: 225;" src="<?php echo base_url($vehiculo["data"]->link_fotografia_chofer.$vehiculo["data"]->fotografia_chofer); ?>" alt="logo_manzanillo">
                    </td>
                    <td class="fuente_Gris" style="text-align: left;">
                            NOMBRE:
                            <br> <?php echo $vehiculo["data"]->nombre_chofer." ".$vehiculo["data"]->primer_apellido_chofer." ".$vehiculo["data"]->segundo_apellido_chofer?>
                            <br><br> CURP:
                            <br> <?php echo $vehiculo["data"]->curp_chofer?>
                            <br><br> NSS:
                            <br> <?php echo $vehiculo["data"]->nss_chofer?>
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td width=335 class="vdecorto">
                         <br>DATOS DEL VEHÍCULO
                    </td>
                    <td class="gris" width=330>
                        <br>PLACAS: <b><?php echo $vehiculo["data"]->numero_placa?></b>    
                    </td>
                </tr>
            </table>     
            <table>
                <tr>
                    <td width=410 style="text-align: left;">
                        <br><img style="float: left;width: 250;height: 200;" src="<?php echo base_url($vehiculo["data"]->link_fotografia_vehiculo.$vehiculo["data"]->fotografia_vehiculo); ?>" alt="logo_manzanillo">
                    </td>
                    <td class="fuente_Gris" style="text-align: left;">
                            SERIE:
                            <br> <?php echo $vehiculo["data"]->numero_serie?>
                            <br><br> MARCA:
                            <br> <?php echo $vehiculo["data"]->marca?>
                            <br><br> MODELO:     
                            <br> <?php echo $vehiculo["data"]->modelo?>
                            <br><br>Año:
                            <br> <?php echo $vehiculo["data"]->anio?> 
                            <br><br>COLOR:
                            <br> <?php echo $vehiculo["data"]->color?>                  
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td class="fuente_Gris" style="width: 400px">
                        <br><br> TIPO DE PASE:    
                        <br> <?php echo $permiso["data"]->tipo_permiso?>  
                        <br><br>RECINTO:   
                        <br> <?php echo $permiso["data"]->tipo_recinto?>  
                        <br><br>PERIODO:
                        <br> <?php echo $permiso["data"]->fecha_inicio." a ".$permiso["data"]->fecha_termino?>
                    </td>
                    <td>
                        <qrcode value="<?php echo $QRCode?> " ec="L" style="width: 45mm;"></qrcode>
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td style="text-align: justify; width: 675; line-height: 1.6; color: red">
                    <br>
                        A fin de que el titular tenga acceso a la <?php echo mb_convert_case($permiso["data"]->tipo_recinto, MB_CASE_UPPER, $encoding); ?>, este instrumento digital NO acredita relación alguna con la administración portuaria integral de manzanillo s.a de c.v.
                    </td>
                </tr>
            </table>
  </page>

  <page class="tipofuente"backtop="7mm" backbottom="7mm" backleft="10mm" backright="10mm">
        <table>
            <tr>
                <td class="fuente_Gris" style="width: 675px">
                    <br><br>MOTIVO:
                    <br> <?php echo $permiso["data"]->motivo?>  
                </td>
            </tr>
        </table>
  </page>
