
	<style>
		/* Font Definitions */
		@font-face {
			font-family: "Open Sans";
		}

		/* Style Definitions */
		p.FormatoNormal,
		li.FormatoNormal,
		div.FormatoNormal {
			margin-top: 0cm;
			margin-right: 0cm;
			margin-bottom: 8.0pt;
			margin-left: 0cm;
			line-height: 107%;
			font-size: 10.0pt;
		}
		tr.CabeceraTabla{
			border:none;
			background:#CCCCCC;
			padding:0cm 5.4pt 0cm 5.4pt;
		}
		span.EstiloGeneral{
			font-family:"Open Sans",sans-serif;
			color:black
		}
		.EstiloGeneral {
			margin-top:6.0pt !important;
			margin-bottom:6.0pt;
			text-align:center;
			line-height:normal;
		}
        .tamanoImg1{
            width: 200px;
            height: 60px;
            margin: 10px;
        }
        .tamanoImg2{
            width: 225;
            height: 60px;
            margin: 10px;
        }
	</style>

<page lang=ES-MX style='word-wrap:break-word'>

	<table width=666 style='width:530.15pt;border-collapse:collapse;border:none'>
		<tr style='height:45.0pt'>
			<td width=320 valign=top style='width:225.85pt;background:#6A1C32;padding:0cm 5.4pt 0cm 5.4pt;height:45.0pt'>
                <img class="tamanoImg1" style="" src="<?php echo base_url('assets/logotipos/SEMAR500.png'); ?>" alt="logo_manzanillo">
			</td>
			<td width=320 valign=top style='text-align: right;width:225.85pt;background:#6A1C32;padding:0cm 5.4pt 0cm 5.4pt;height:45.0pt'>
                <img class="tamanoImg2" src="<?php echo base_url('assets/logotipos/LogoManzanillo.png'); ?>" alt="logo_manzanillo">
			</td>
		</tr>
		<tr style='height:74.6pt'>
			<td width=640 colspan=2 style='width:499.85pt;background:#545454;padding:0cm 5.4pt 0cm 5.4pt;  height:74.6pt'>
				<p class=FormatoNormal style='margin-bottom:0cm;text-align:center;  line-height:normal;'>
					<b>
						<span style='font-size:16.0pt;color:white'>Permiso Provisional de Acceso a <?= $recinto ?></span>
					</b>
				</p>
			</td>
		</tr>
	</table>

	<table style='width:530.15pt;border-collapse:collapse;border:none'>
		<tr style='height:25.45pt'>
			<td width=54 style='width:77.75pt;padding:0cm 5.4pt 0cm 5.4pt;height:25.45pt'>
				<p class="FormatoNormal EstiloGeneral" style='margin-bottom:0cm;text-align:center;line-height:normal;'>
					<b>
						<span style='font-size:12.0pt;color:#4F5155'>
							FOLIO
						</span>
					</b>
				</p>
			</td>
			<td width=198 style='width:148.8pt;padding:0cm 5.4pt 0cm 5.4pt;height:25.45pt'>
				<p class="FormatoNormal EstiloGeneral" style='margin-bottom:0cm;text-align:center;line-height:normal;'>
					<b>
						<span style='font-size:12.0pt;color:#4F5155'>
							FECHA DE EXPEDICIÓN
						</span>
					</b>
				</p>
			</td>
			<td width=217 style='width:163.05pt;padding:0cm 5.4pt 0cm 5.4pt;height:25.45pt'>
				<p class="FormatoNormal EstiloGeneral" style='margin-bottom:0cm;text-align:center;line-height:normal;'>
					<b>
						<span style='font-size:12.0pt;color:#4F5155'>
							FECHA DE VENCIMIENTO
						</span>
					</b>
				</p>
			</td>
			<td width=115 rowspan=2 style='width:108.5pt;padding:0cm 5.4pt 0cm 5.4pt;height:25.45pt'>
				<p class="FormatoNormal EstiloGeneral" style='margin-bottom:0cm;text-align:center;line-height:normal;'>
					<b>
						<span style='font-size:12.0pt;color:#4F5155'>
                            <qrcode value="<?php echo $QRCode?>" ec="L" style="width: 30mm;"></qrcode>
						</span>
					</b>
				</p>
			</td>
		</tr>
		<tr style='height:27.25pt'>
			<td width=54 style='width:77.75pt;padding:0cm 5.4pt 0cm 5.4pt;height:27.25pt'>
				<p class="FormatoNormal EstiloGeneral" style='margin-bottom:0cm;text-align:center;line-height:normal;'>
					<b>
						<span style='font-size:12.0pt;color:#4F5155'>
                            <?= str_pad($folio, 5, '0', STR_PAD_LEFT); ?>
						</span>
					</b>
				</p>
			</td>
			<td width=198 style='width:148.8pt;padding:0cm 5.4pt 0cm 5.4pt;height:27.25pt'>
				<p class="FormatoNormal EstiloGeneral" style='margin-bottom:0cm;text-align:center;line-height:normal;'>
					<b>
						<span style='font-size:12.0pt;color:#4F5155'>
                            <?= $fecha_inicio ?>
						</span>
					</b>
				</p>
			</td>
			<td width=217 style='width:163.05pt;padding:0cm 5.4pt 0cm 5.4pt;height:27.25pt'>
				<p class="FormatoNormal EstiloGeneral" style='margin-bottom:0cm;text-align:center;line-height:normal;'>
					<b>
						<span style='font-size:12.0pt;color:#C00000'>
							<?= $fecha_termino ?>
						</span>
					</b>
				</p>
			</td>
		</tr>
	</table>

	<p class=FormatoNormal style='margin-bottom:12.0pt;text-align:justify;line-height:normal;'>
		<span style='font-size:9.5pt;color:#4F5155;text-align:justify;'>
			Para que 
            <?php if($numPersonas > 1) echo 'las personas'; else echo 'la persona'; ?>
            <?php if($numVechiulos > 0 && $numHerramientas > 0) echo ','; else echo 'y';?>
            <?php if($numVechiulos == 0) echo ''; else if($numVechiulos > 1) echo 'vehiculos'; else echo 'vehiculo'; ?>  
            <?php if($numHerramientas > 0) echo 'y'; ?>
            <?php if($numHerramientas == 0) echo ''; else if($numHerramientas > 1) echo 'equipos'; else echo 'equipo'; ?>
            que se <?php if($numHerramientas == 0 && $numVechiulos == 0 && $numPersonas == 1) echo 'enlista'; else echo 'enlistan'; ?>
			a continuacion <?php if($numPersonas > 1) echo 'realicen'; else echo 'realice'; ?>  labores relacionados con la actividad comercial de la
			empresa <b><?= $empresa ?></b>, comprometiendose a cumplir con todas las
			regulaciones del Puerto y de las Autoridades Federales aplicables dentro del
			mismo, en el entendido de que este dejará de surtir efectos al causar Baja al
			titular del permiso o por la terminación de la vigencia del mismo.
		</span>
	</p>

	<table width=664 style='width:530.15pt;border-collapse:collapse;border:none'>
		<tr style='height:25.65pt'>
			<td width=662 colspan=4 valign=top style='width:500.15pt;padding:0cm 5.4pt 0cm 5.4pt;height:28.65pt'>
				<p class="FormatoNormal EstiloGeneral">
					<b>
						<span style='font-size:12.0pt;'>
							PERSONAS
						</span>
					</b>
				</p>
			</td>
		</tr>
		<tr class="CabeceraTabla" style='height:13.8pt'>
			<td width=182 valign=top style='height:13.8pt'>
				<p class=FormatoNormal style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-align:center;'>
					<b>
						<span>
							CURP
						</span>
					</b>
				</p>
			</td>
			<td width=197 valign=top style='height:13.8pt'>
				<p class=FormatoNormal style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-align:center;'>
					<b>
						<span>
							NOMBRE
						</span>
					</b>
				</p>
			</td>
			<td width=87 valign=top style='height:13.8pt'>
				<p class=FormatoNormal style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-align:center;'>
					<b>
						<span>
							PUESTO
						</span>
					</b>
				</p>
			</td>
			<td width=75 valign=top style='height:13.8pt'>
				<p class=FormatoNormal style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-align:center;'>
					<b>
						<span>
							TEL. CEL.
						</span>
					</b>
				</p>
			</td>
		</tr>
		<?= $personal ?>
	</table>

    <?= $vehiculos ?>
    <?= $herramientas ?>

	<p class="FormatoNormal EstiloGeneral">
		<b>
			<span style='font-size:12.0pt;'>
				MOTIVO:
			</span>
		</b>
	</p>

	<p class=FormatoNormal style='margin-bottom:12.0pt;text-align:justify;line-height:normal;'>
		<span style='font-size:11.0pt;color:#4F5155;text-align:justify;'>
			<?= $motivo ?>
		</span>
	</p>

</page>

 <?php if($numMateriales > 0 ) { ?>
<page lang=ES-MX style='word-wrap:break-word'>

	<table width=666 style='width:530.15pt;border-collapse:collapse;border:none'>
		<tr style='height:45.0pt'>
			<td width=320 valign=top style='width:225.85pt;background:#6A1C32;padding:0cm 5.4pt 0cm 5.4pt;height:45.0pt'>
                <img class="tamanoImg1" style="" src="<?php echo base_url('assets/logotipos/SEMAR500.png'); ?>" alt="logo_manzanillo">
			</td>
			<td width=320 valign=top style='text-align: right;width:225.85pt;background:#6A1C32;padding:0cm 5.4pt 0cm 5.4pt;height:45.0pt'>
                <img class="tamanoImg2" src="<?php echo base_url('assets/logotipos/LogoManzanillo.png'); ?>" alt="logo_manzanillo">
			</td>
		</tr>
		<tr style='height:74.6pt'>
			<td width=640 colspan=2 style='width:499.85pt;background:#545454;padding:0cm 5.4pt 0cm 5.4pt;  height:74.6pt'>
				<p class=FormatoNormal style='margin-bottom:0cm;text-align:center;  line-height:normal;'>
					<b>
						<span style='font-size:16.0pt;color:white'>Permiso Provisional de Acceso a <?= $recinto ?></span>
					</b>
				</p>
			</td>
		</tr>
	</table>

    <?= $materiales ?>

</page>

<?php } ?>