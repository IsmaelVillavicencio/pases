                </div>
            </section>
            <section>
                <!--<div id="copyright" class="end_mains">
                    <br><span>© 2020 - <?php echo date("Y"); ?> TODOS LOS DERECHOS RESERVADOS - API MANZANILLO</span>
                </div>-->
                <script>
                $(document).ajaxStart(() => {
                    spinner.style.visibility="visible";
                });
                $(document).ajaxStop(() => {
                    spinner.style.visibility="hidden";
                });
                $( document ).ajaxError((qXHR, textStatus, errorThrown) => {
                    spinner.style.visibility="hidden";
                    if(textStatus.responseText == "Sesion"){
                        $("#mensaje_error_sesion").html("La sesión ha caducado, vuelva a iniciar sesión");            
                        $("#modal_error_sesion").modal("show");
                    }
                });
                $("#aceptar_error_sesion").click( (e) => {
                    window.location.href = base_url + 'Sesiones/Ctrl_Sesiones';
                })
		function ajuste_altura_modal(mouseEvent) {
                	let alturaHeader = 0;
                	if (document.body.scrollWidth < 734) {
                			alturaHeader = 230;
                	} else if (document.body.scrollWidth < 958) {
                			alturaHeader = 260;
                	} else {
                			alturaHeader = 210;
                	}
                	return (mouseEvent.clientY - mouseEvent.screenY + alturaHeader) + "px";
                }
                </script>
                <!--Font Awesome Icons-->
                <script src="https://kit.fontawesome.com/4e5016ef48.js" crossorigin="anonymous"></script>

                <script src="<?php echo base_url('assets/js/menu/menu.js');?>"></script>
                <script src="<?php echo base_url("assets/js/constantes.js"); ?> "></script>
                <script src="<?php echo base_url('assets/librerias/plupload/plupload.full.min.js'); ?>"></script>
                <?php $this->carabiner->display('js');?>
            </section>
		</div>
    </main>