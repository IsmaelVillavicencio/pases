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
        font-size: 14.0pt;
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
        font-size: 12.0pt;
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
        <br>
            <table>
                <tr>
                    <td width=335  style="text-align: center;">
                        <br><br><img style="width: 300px;height: 300px;" src="<?php echo base_url($persona["data"]->link_fotografia.$persona["data"]->fotografia); ?>" alt="logo_manzanillo">
                    </td>
                    <td width=330 style="text-align: center;">
                        <br><qrcode value="<?php echo $QRCode?>" ec="L" style="width: 75mm;"></qrcode>
                    </td>
                </tr>
            </table>
            <br>
            <table>
                <tr>
                    <td class="fuente_Gris" style="text-align: center; width: 675;">
                        <br>EL PRESENTE SE EXPIDE A FAVOR DE: <br>
                        <br><b><?php echo mb_convert_case($persona["data"]->nombre, MB_CASE_UPPER, $encoding); ?> </b><br>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: justify; width: 675; line-height: 1.6; color: red">
                    <br>
                        A fin de que el titular tenga acceso a la <?php echo mb_convert_case($permiso["data"]->tipo_recinto, MB_CASE_UPPER, $encoding); ?>, este instrumento digital NO acredita relación alguna con la Administración Portuaria Integral de Manzanillo S.A de C.V.
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                <td class="fuente_Gris" style="width:225; text-align: center;">
                        <br>NO. DE PASE<br>
                        <br><b><?php echo $permiso["data"]->id?> </b>
                    </td>
                    <td class="fuente_Gris" style="width:225; text-align: center;">
                        <br>FECHA DE EXPEDICIÓN <br>
                        <br><b><?php echo $permiso["data"]->fecha_inicio?> </b>
                    </td>
                    <td class="fuente_Gris" style="width:225; text-align: center;">
                        <br>FECHA DE VENCIMIENTO <br>
                        <br><b style="color:red;"><?php echo $permiso["data"]->fecha_termino?> </b>
                    </td>
                </tr>
            </table>
            <br><br>
            <table>
                <tr>
                    <td class="fuente_Gris" style="text-align: center; width: 675; color: black">
                        ADMINISTRACIÓN PORTUARIA INTEGRAL DE MANZANILLO S.A DE C.V.
                    </td>
                </tr>
            </table>
            <br>
            <table style="background-color:#f7eeda;">
                <tr>
                    <td style="text-align: center; width: 675;">
                        <br>AUTORIZÓ
                        <br><br>
                        <b>SALVADOR GÓMEZ MEILLON</b>
                        <br>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center; width: 675;">
                        <br>PUESTO <br><br>
                        <b>DIRECTOR GENERAL</b>
                        <br><br>
                    </td>
                </tr>
            </table>
  </page>
