<!--========== NAV ==========-->
<!--div class="navAPI" id="navbarAPI">
	<nav class="nav__container">
		<div>
			<a href="< ?php echo base_url(); ?>" class="nav__link nav__logo">
				<i class='bx bxs-disc nav__icon'></i>
				<span class="nav__logo-name">API MANZANILLO</span>
			</a>

			<div class="nav__list">
				<div class="nav__items">

					< ?php
					if(isset($menu)){
						foreach ($menu as $option) {
							if($option->id_menu == 3){?>
					<div class="nav__dropdown">
						<a href="#" class="nav__link">
							<span class="glyphicon glyphicon-pencil nav__icon" aria-hidden="true"></span>
							<span class="nav__name">Contratos</span>
							<i class='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>
						</a>

						<div class="nav__dropdown-collapse">
							<div class="nav__dropdown-content">
							< ?php
							if(isset($submenu)){
								foreach ($submenu as $option) {
									if($option->id_submenu == 11){?>
								<a href="< ?php echo base_url("Contratos/Ctrl_Contratos"); ?>" class="nav__dropdown-item">Contratos</a>
								< ?php
										}
									}
								}?>
								< ?php
								if(isset($submenu)){
									foreach ($submenu as $option) {
										if($option->id_submenu == 12){?>
								<a href="< ?php echo base_url("Solicitudes/Ctrl_Solicitudes/administrador"); ?>" class="nav__dropdown-item">Solicitudes</a>
								< ?php
										}
									}
								} ?>
								< ?php
								if(isset($submenu)){
									foreach ($submenu as $option) {
										if($option->id_submenu == 13){?>
								<a href="< ?php echo base_url("Solicitudes/Ctrl_Solicitudes/administrador_aprobadas"); ?>" class="nav__dropdown-item">Generar contrato</a>
								< ?php
										}
									}
								}?>
							</div>
						</div>
					</div>

					< ?php
							}
						}
					} ?>

					< ?php
					if(isset($menu)){
						foreach ($menu as $option) {
							if($option->id_menu == 1){?>

					<div class="nav__dropdown">
						<a href="#" class="nav__link">
							<span class="glyphicon glyphicon-list-alt nav__icon" aria-hidden="true"></span>
							<span class="nav__name">Catálogos</span>
							<i class='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>
						</a>

						<div class="nav__dropdown-collapse">
							<div class="nav__dropdown-content">
								< ?php
									if(isset($submenu)){
										foreach ($submenu as $option) {
											if($option->id_submenu == 1){?>
								<a href="< ?php echo base_url("Catalogos/Ctrl_Documentos"); ?>" class="nav__dropdown-item">Documentos</a>
								< ?php
										}
									}
								} ?>

								< ?php
								if(isset($submenu)){
									foreach ($submenu as $option) {
										if($option->id_submenu == 2){?>
								<a href="< ?php echo base_url("Catalogos/Ctrl_TiposDenominacion"); ?>" class="nav__dropdown-item">Grado profesional</a>
								< ?php
										}
									}
								} ?>

								< ?php
								if(isset($submenu)){
									foreach ($submenu as $option) {
										if($option->id_submenu == 3){?>
								<a href="< ?php echo base_url("Catalogos/Ctrl_Areas"); ?>" class="nav__dropdown-item">Áreas</a>
								< ?php
										}
									}
								} ?>

								< ?php
								if(isset($submenu)){
									foreach ($submenu as $option) {
										if($option->id_submenu == 4){?>
								<a href="< ?php echo base_url("Catalogos/Ctrl_Puestos"); ?>" class="nav__dropdown-item">Puestos</a>
								< ?php
										}
									}
								} ?>

								< ?php
								if(isset($submenu)){
									foreach ($submenu as $option) {
										if($option->id_submenu == 5){?>
								<a href="< ?php echo base_url("Catalogos/Ctrl_TiposServicios"); ?>" class="nav__dropdown-item">Tipos de servicio</a>
								< ?php
										}
									}
								} ?>

								< ?php
								if(isset($submenu)){
									foreach ($submenu as $option) {
										if($option->id_submenu == 6){?>
								<a href="< ?php echo base_url("Catalogos/Ctrl_TiposContratos"); ?>" class="nav__dropdown-item">Tipos de contrato</a>
								< ?php
										}
									}
								} ?>

								< ?php
								if(isset($submenu)){
									foreach ($submenu as $option) {
										if($option->id_submenu == 14){?>
								<a href="< ?php echo base_url("Catalogos/Ctrl_Puertos"); ?>" class="nav__dropdown-item">Puertos</a>
								< ?php
										}
									}
								} ?>

								< ?php
								if(isset($submenu)){
									foreach ($submenu as $option) {
										if($option->id_submenu == 15){?>
								<a href="< ?php echo base_url("Catalogos/Ctrl_TiposBuques"); ?>" class="nav__dropdown-item">Tipos de buques</a>
								< ?php
										}
									}
								} ?>

								< ?php
								if(isset($submenu)){
									foreach ($submenu as $option) {
										if($option->id_submenu == 16){?>
								<a href="< ?php echo base_url("Catalogos/Ctrl_Productos"); ?>" class="nav__dropdown-item">Productos</a>
								< ?php
										}
									}
								} ?>

								< ?php
								if(isset($submenu)){
									foreach ($submenu as $option) {
										if($option->id_submenu == 24){?>
								<a href="< ?php echo base_url("Catalogos/Ctrl_Tramo"); ?>" class="nav__dropdown-item">Tramo</a>
								< ?php
										}
									}
								} ?>

								< ?php
								if(isset($submenu)){
									foreach ($submenu as $option) {
										if($option->id_submenu == 25){?>
								<a href="< ?php echo base_url("Catalogos/Ctrl_Banda"); ?>" class="nav__dropdown-item">Banda</a>
								< ?php
										}
									}
								} ?>

								< ?php
								if(isset($submenu)){
									foreach ($submenu as $option) {
										if($option->id_submenu == 26){?>
								<a href="< ?php echo base_url("Catalogos/Ctrl_TiposEmbalajes"); ?>" class="nav__dropdown-item">Embalajes</a>
								< ?php
										}
									}
								} ?>

								< ?php
								if(isset($submenu)){
									foreach ($submenu as $option) {
										if($option->id_submenu == 27){?>
								<a href="< ?php echo base_url("Catalogos/Ctrl_TiposEmpleados"); ?>" class="nav__dropdown-item">Tipos de persona</a>
								< ?php
										}
									}
								} ?>

								< ?php
								if(isset($submenu)){
									foreach ($submenu as $option) {
										if($option->id_submenu == 33){?>
								<a href="< ?php echo base_url("Catalogos/Ctrl_TiposTransportes"); ?>" class="nav__dropdown-item">Tipos de transporte</a>
								< ?php
										}
									}
								} ?>

								< ?php
								if(isset($submenu)){
									foreach ($submenu as $option) {
										if($option->id_submenu == 34){?>
								<a href="< ?php echo base_url("Catalogos/Ctrl_LineasTransportes"); ?>" class="nav__dropdown-item">Lineas de transporte</a>
								< ?php
										}
									}
								} ?>

								< ?php
								if(isset($submenu)){
									foreach ($submenu as $option) {
										if($option->id_submenu == 35){?>
								<a href="< ?php echo base_url("Catalogos/Ctrl_MarcasTransportes"); ?>" class="nav__dropdown-item">Marcas de transporte</a>
								< ?php
										}
									}
								} ?>

								< ?php
								if(isset($submenu)){
									foreach ($submenu as $option) {
										if($option->id_submenu == 36){?>
								<a href="< ?php echo base_url("Catalogos/Ctrl_EstadosTransportes"); ?>" class="nav__dropdown-item">Estados de transporte</a>
								< ?php
										}
									}
								} ?>

								< ?php
								if(isset($submenu)){
									foreach ($submenu as $option) {
										if($option->id_submenu == 37){?>
								<a href="< ?php echo base_url("Catalogos/Ctrl_TiposLicenciaManejo"); ?>" class="nav__dropdown-item">Tipos de licencias de manejo</a>
								< ?php
										}
									}
								} ?>

							</div>
						</div>
					</div>

					< ?php
							}
						}
					} ?>

					< ?php
					if(isset($menu)){
						foreach ($menu as $option) {
							if($option->id_menu == 1){?>

					<div class="nav__dropdown">
						<a href="#" class="nav__link">
							<span class="glyphicon glyphicon-user nav__icon" aria-hidden="true"></span>
							<span class="nav__name">Usuarios</span>
							<i class='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>
						</a>

						<div class="nav__dropdown-collapse">
							<div class="nav__dropdown-content">
								< ?php
									if(isset($submenu)){
										foreach ($submenu as $option) {
											if($option->id_submenu == 7){?>
								<a href="< ?php echo base_url("Usuarios/Ctrl_Personal"); ?>" class="nav__dropdown-item">Personal</a>
								< ?php
										}
									}
								} ?>

								< ?php
									if(isset($submenu)){
										foreach ($submenu as $option) {
											if($option->id_submenu == 8){?>
											<i class='bx bx-compass nav__icon' ></i>
								<a href="< ?php echo base_url("Usuarios/Ctrl_Perfiles"); ?>" class="nav__dropdown-item">Perfiles</a>
								< ?php
											}
										}
									} ?>

								< ?php
									if(isset($submenu)){
										foreach ($submenu as $option) {
											if($option->id_submenu == 9){?>
								<a href="< ?php echo base_url("Usuarios/Ctrl_Directivos"); ?>" class="nav__dropdown-item">Ejecutivos</a>
								< ?php
										}
									}
								} ?>

								< ?php
									if(isset($submenu)){
										foreach ($submenu as $option) {
											if($option->id_submenu == 10){?>
								<a href="< ?php echo base_url("Usuarios/Ctrl_Usuarios"); ?>" class="nav__dropdown-item">Usuarios</a>
								< ?php
										}
									}
								} ?>
							</div>
						</div>
					</div>

					< ?php
							}
						}
					} ?>

					< ?php
					if(isset($menu)){
						foreach ($menu as $option) {
							if($option->id_menu == 6){?>

								<div class="nav__dropdown">
									<a href="#" class="nav__link">
										<span class="nav__icon" aria-hidden="true"><img class="icon_boat" src="< ?php echo base_url('assets/iconos/Buque.png'); ?>" alt=""></span>
										<span class="nav__name">Buques</span>
										<i class='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>
									</a>

									<div class="nav__dropdown-collapse">
										<div class="nav__dropdown-content">
											< ?php
												if(isset($submenu)){
													foreach ($submenu as $option) {
														if($option->id_submenu == 19){?>
											<a href="< ?php echo base_url("Buques/Ctrl_Buques"); ?>" class="nav__dropdown-item">Buques</a>
											< ?php
													}
												}
											} ?>
											< ?php
												if(isset($submenu)){
													foreach ($submenu as $option) { //Falta el permiso
														if($option->id_submenu == 19){?>
											<a href="< ?php echo base_url("Buques/Ctrl_Buques/validar"); ?>" class="nav__dropdown-item">Validar buques</a>
											< ?php
													}
												}
											} ?>
											< ?php
											if(isset($submenu)){
												foreach ($submenu as $option) {
													if($option->id_submenu == 20){?>
											<a href="< ?php echo base_url("Buques/NotificacionArribo/Ctrl_Notificacion_Arribo"); ?>" class="nav__dropdown-item">Notificaciones de arribo</a>
											< ?php
													}
												}
											} ?>
											< ?php
											if(isset($submenu)){
												foreach ($submenu as $option) {
													if($option->id_submenu == 20){?>
											<a href="< ?php echo base_url("Buques/Ctrl_AutorizacionArribo/"); ?>" class="nav__dropdown-item">Autorización de arribo</a>
											< ?php
													}
												}
											} ?>
											< ?php
											if(isset($submenu)){
												foreach ($submenu as $option) {
													if($option->id_submenu == 20){?>
											<a href="< ?php echo base_url("Buques/Ctrl_ArriboBuque/"); ?>" class="nav__dropdown-item">Arribo del buque</a>
											< ?php
													}
												}
											} ?>
											< ?php
											if(isset($submenu)){
												foreach ($submenu as $option) {
													if($option->id_submenu == 20){?>
											<a href="< ?php echo base_url("Buques/Ctrl_DespachoBuque/"); ?>" class="nav__dropdown-item">Despacho de buque</a>
											< ?php
													}
												}
											} ?>
											< ?php
											if(isset($submenu)){
												foreach ($submenu as $option) {
													if($option->id_submenu == 20){?>
											<a href="< ?php echo base_url("Buques/Ctrl_ProgramacionBuque/"); ?>" class="nav__dropdown-item">Junta de programación</a>
											< ?php
													}
												}
											} ?>
											< ?php
											if(isset($submenu)){
												foreach ($submenu as $option) {
													if($option->id_submenu == 20){?>
											<a href="< ?php echo base_url("Buques/SolicitudesDesembarque/Ctrl_Solicitud_Desembarque/"); ?>" class="nav__dropdown-item">Solicitudes desembarque</a>
											< ?php
													}
												}
											} ?>
											< ?php
											if(isset($submenu)){
												foreach ($submenu as $option) {
													if($option->id_submenu == 20){?>
											<a href="< ?php echo base_url("Buques/SolicitudesDesembarque/Ctrl_Solicitud_Desembarque/administrar_solicitudes_autorizar"); ?>" class="nav__dropdown-item">Solicitudes de desembarque por autorizar</a>
											< ?php
													}
												}
											} ?>
											< ?php
											if(isset($submenu)){
												foreach ($submenu as $option) {
													if($option->id_submenu == 20){?>
											<a href="< ?php echo base_url("Buques/SolicitudesEmbarque/Ctrl_Solicitud_Embarque/"); ?>" class="nav__dropdown-item">Solicitudes de embarque</a>
											< ?php
													}
												}
											} ?>
											< ?php
											if(isset($submenu)){
												foreach ($submenu as $option) {
													if($option->id_submenu == 20){?>
											<a href="< ?php echo base_url("Buques/SolicitudesEmbarque/Ctrl_Solicitud_Embarque/administrar_solicitudes_autorizar"); ?>" class="nav__dropdown-item">Solicitudes de embarque por autorizar</a>
											< ?php
													}
												}
											} ?>
											< ?php
											if(isset($submenu)){
												foreach ($submenu as $option) {
													if($option->id_submenu == 20){?>
											<a href="< ?php echo base_url("Buques/SolicitudesLibrePlatica/Ctrl_Solicitud_Libre_Platica/"); ?>" class="nav__dropdown-item">Solicitudes de libre plática</a>
											< ?php
													}
												}
											} ?>< ?php
											if(isset($submenu)){
												foreach ($submenu as $option) {
													if($option->id_submenu == 20){?>
											<a href="< ?php echo base_url("Buques/SolicitudesLibrePlatica/Ctrl_Solicitud_Libre_Platica/administrar_solicitudes_autorizar"); ?>" class="nav__dropdown-item">Solicitudes de libre plática por autorizar</a>
											< ?php
													}
												}
											} ?>
											< ?php
											if(isset($submenu)){
												foreach ($submenu as $option) {
													if($option->id_submenu == 20){?>
											<a href="< ?php echo base_url("Buques/SolicitudesInternacion/Ctrl_Solicitud_Internacion/"); ?>" class="nav__dropdown-item">Solicitudes de internación</a>
											< ?php
													}
												}
											} ?>
											< ?php
											if(isset($submenu)){
												foreach ($submenu as $option) {
													if($option->id_submenu == 20){?>
											<a href="< ?php echo base_url("Buques/SolicitudesInternacion/Ctrl_Solicitud_Internacion/administrar_solicitudes_autorizar"); ?>" class="nav__dropdown-item">Solicitudes de internación por autorizar</a>
											< ?php
													}
												}
											} ?>
											< ?php
											if(isset($submenu)){
												foreach ($submenu as $option) {
													if($option->id_submenu == 20){?>
											<a href="< ?php echo base_url("Buques/Enmienda/Ctrl_Enmienda/"); ?>" class="nav__dropdown-item">Enmienda</a>
											< ?php
													}
												}
											} ?>
											< ?php
											if(isset($submenu)){
												foreach ($submenu as $option) {
													if($option->id_submenu == 20){?>
											<a href="< ?php echo base_url("Buques/Enmienda/Ctrl_Enmienda/administrar_solicitudes_autorizar"); ?>" class="nav__dropdown-item">Solicitudes de enmienda por autorizar</a>
											< ?php
													}
												}
											} ?>
											< ?php
											if(isset($submenu)){
												foreach ($submenu as $option) {
													if($option->id_submenu == 20){?>
											<a href="< ?php echo base_url("Buques/Ctrl_MarcoOperativo/"); ?>" class="nav__dropdown-item">Marco operativo</a>
											< ?php
													}
												}
											} ?>
										</div>
									</div>
								</div>

					< ?php
							}
						}
					} ?>

	
					< ?php
					$roles = array("4", "5", "6", "7", "8");
					if (in_array($this->session->_permiso_rol, $roles)) {
						if(isset($menu)){
							foreach ($menu as $option) {
								if($option->id_menu == 5){?>

						<div class="nav__dropdown">
							<a href="#" class="nav__link">
								<span class="glyphicon glyphicon-credit-card nav__icon" aria-hidden="true"></span>
								<span class="nav__name">Permisos</span>
								<i class='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>
							</a>

							<div class="nav__dropdown-collapse">
								<div class="nav__dropdown-content">
									< ?php
										if(isset($submenu)){
											foreach ($submenu as $option) {
												if($option->id_submenu == 18){?>
									<a href="< ?php echo base_url("Permisos/Ctrl_Permisos"); ?>" class="nav__dropdown-item">< ?php echo ($this->session->_permiso_rol == 8 ? 'Mis permisos' : 'Autorizar')?></a>
									< ?php if($this->session->_permiso_rol != 8){ ?>
										<a href="< ?php echo base_url("Permisos/Ctrl_Permisos/index_autorizadores"); ?>" class="nav__dropdown-item">Mis permisos</a>
										<a href="< ?php echo base_url("Permisos/Ctrl_Permisos/index_solicitud_cabotaje"); ?>" class="nav__dropdown-item">Permisos cabotaje</a>
									< ?php } ?>
									<a href="< ?php echo base_url("Permisos/Ctrl_Permisos/administrar_permisos"); ?>" class="nav__dropdown-item">Administrar permisos</a>
									< ?php
											}
										}
									} ?>
								</div>
							</div>
						</div>

					< ?php
							}
						}
					} 
					} ?>


















					< ?php
					if(isset($menu)){
						foreach ($menu as $option) {
							if($option->id_menu == 6){?>

					<div class="nav__dropdown">
						<a href="#" class="nav__link">
							<span class="glyphicon glyphicon-th-list nav__icon" aria-hidden="true"></span>
							<span class="nav__name">Mi identidad</span>
							<i class='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>
						</a>

						<div class="nav__dropdown-collapse">
							<div class="nav__dropdown-content">
								< ?php
									if(isset($submenu)){
										foreach ($submenu as $option) {
											if($option->id_submenu == 19){?>
								<a href="< ?php echo base_url("Credencializacion/Ctrl_Personal"); ?>" class="nav__dropdown-item">Personal</a>
								< ?php
										}
									}
								} ?>

								< ?php
								if(isset($submenu)){
									foreach ($submenu as $option) {
										if($option->id_submenu == 20){?>
								<a href="< ?php echo base_url("Credencializacion/Ctrl_Equipos"); ?>" class="nav__dropdown-item">Equipos</a>
								< ?php
										}
									}
								} ?>

								< ?php
								if(isset($submenu)){
									foreach ($submenu as $option) {
										if($option->id_submenu == 21){?>
								<a href="< ?php echo base_url("Credencializacion/Ctrl_Vehiculos"); ?>" class="nav__dropdown-item">Vehículos</a>
								< ?php
										}
									}
								} ?>

								< ?php
								if(isset($submenu)){
									foreach ($submenu as $option) {
										if($option->id_submenu == 22){?>
								<a href="< ?php echo base_url("Credencializacion/Ctrl_Credencializacion"); ?>" class="nav__dropdown-item">Credencialización</a>
								< ?php
										}
									}
								} ?>

							</div>
						</div>
					</div>

					< ?php
							}
						}
					} ?>

					< ?php
						if(isset($menu)){
							foreach ($menu as $option) {
								if($option->id_menu == 7){?>
								<a href="< ?php echo base_url("EstadoHechos/Ctrl_EstadoHechos"); ?>" class="nav__link">
									<span class="glyphicon glyphicon-list-alt nav__icon" aria-hidden="true"></span>
									<span class="nav__name">Estado de hechos</span>
								</a>
								< ?php
								}
							}
						} ?>

					< ?php
						if(isset($menu)){
							foreach ($menu as $option) {
								if($option->id_menu == 8){?>
								<a href="< ?php echo base_url("manual/permisos"); ?>" class="nav__link" target="_blank">
									<span class="glyphicon glyphicon-book nav__icon" aria-hidden="true"></span>
									<span class="nav__name">Manual de usuario</span>
								</a>
								< ?php
								}
							}
						} ?>

					< ?php
					if(isset($menu)){
						foreach ($menu as $option) {
							if($option->id_menu == 9){?>

					<div class="nav__dropdown">
						<a href="#" class="nav__link">
							<span class="glyphicon glyphicon-road nav__icon" aria-hidden="true"></span>
							<span class="nav__name">Transportes</span>
							<i class='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>
						</a>

						<div class="nav__dropdown-collapse">
							<div class="nav__dropdown-content">
								< ?php
									if(isset($submenu)){
										foreach ($submenu as $option) {
											if($option->id_submenu == 29){?>
								<a href="< ?php echo base_url("Transportes/Ctrl_Transportes"); ?>" class="nav__dropdown-item">Transportes</a>
								< ?php
										}
									}
								} ?>

								< ?php
									if(isset($submenu)){
										foreach ($submenu as $option) {
											if($option->id_submenu == 30){?>
											<i class='bx bx-compass nav__icon' ></i>
								<a href="< ?php echo base_url("Transportes/Ctrl_Choferes"); ?>" class="nav__dropdown-item">Choferes</a>
								< ?php
											}
										}
									} ?>

								< ?php
									if(isset($submenu)){
										foreach ($submenu as $option) {
											if($option->id_submenu == 31){?>
												<i class='bx bx-compass nav__icon' ></i>
												<a href="< ?php echo base_url("Transportes/Ctrl_Citas"); ?>" class="nav__dropdown-item">Citas transportista</a>
											< ?php }
										}
									} ?>
									< ?php
									if(isset($submenu)){
										foreach ($submenu as $option) {
											if($option->id_submenu == 31){?>
												<i class='bx bx-compass nav__icon' ></i>
												<a href="< ?php echo base_url("Transportes/Ctrl_CitasTerminal"); ?>" class="nav__dropdown-item">Citas terminal</a>
											< ?php }
										}
									} ?>
									< ?php
									if(isset($submenu)){
										foreach ($submenu as $option) {
											if($option->id_submenu == 31){?>
												<i class='bx bx-compass nav__icon' ></i>
												<a href="< ?php echo base_url("Transportes/Ctrl_SolicitudesPermisoCabotaje"); ?>" class="nav__dropdown-item">Solicitudes de permiso de cabotaje</a>
											< ?php }
										}
									} ?>
									< ?php
									if(isset($submenu)){
										foreach ($submenu as $option) {
											if($option->id_submenu == 31){?>
												<i class='bx bx-compass nav__icon' ></i>
												<a href="< ?php echo base_url("Transportes/Ctrl_AutorizarPermisoCabotaje"); ?>" class="nav__dropdown-item">Autorizar permiso de cabotaje</a>
											< ?php }
										}
									} ?>
							</div>
						</div>
					</div>

					< ?php
							}
						}
					} ?>

					< ?php
					if(isset($menu)){
						foreach ($menu as $option) {
							if($option->id_menu == 10){?>

					<div class="nav__dropdown">
						<a href="#" class="nav__link">
							<span class="glyphicon glyphicon-file nav__icon" aria-hidden="true"></span>
							<span class="nav__name">Acuerdo de servicio</span>
							<i class='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>
						</a>

						<div class="nav__dropdown-collapse">
							<div class="nav__dropdown-content">
								< ?php
									if(isset($submenu)){
										foreach ($submenu as $option) { 
											if($option->id_submenu == 29){?>
								<a href="< ?php echo base_url("Convenios/Ctrl_Convenios/administrar_solicitudes"); ?>" class="nav__dropdown-item">Solicitudes de acuerdo de servicio</a>
								< ?php 
										}
									}
								} ?>

								< ?php
									if(isset($submenu)){
										foreach ($submenu as $option) { 
											if($option->id_submenu == 30){?>
											<i class='bx bx-compass nav__icon' ></i>
								<a href="< ?php echo base_url("Convenios/Ctrl_Convenios/administrar_convenios_aprobados"); ?>" class="nav__dropdown-item">Acuerdo de servicio aprobados</a>
								< ?php 
											}
										}
									} ?>

								< ?php
									if(isset($submenu)){
										foreach ($submenu as $option) { 
											if($option->id_submenu == 30){?>
											<i class='bx bx-compass nav__icon' ></i>
								<a href="< ?php echo base_url("Convenios/Ctrl_Convenios/administrar_convenios_registrados"); ?>" class="nav__dropdown-item">Acuerdo de servicio registrados</a>
								< ?php 
											}
										}
									} ?>
								
							</div>
						</div>
					</div>

					< ?php 
							}
						}
					} ?>


				</div>
			</div>
		</div>
	</nav>
</div-->
