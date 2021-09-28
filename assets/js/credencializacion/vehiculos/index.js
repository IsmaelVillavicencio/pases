let DTIdentidades
class Aministrador{
    constructor(){
		this.inicio();
        this.obtenerDatosTabla(); 
	}
	inicio (){
        DTIdentidades = $(tabVehiculos).DataTable( {
			"language": {
			"url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json" 
			},
			"order": [[ 4, "asc" ],[0, 'asc']]
        });

        spinner.style.visibility="hidden";
		confirmar_baja.addEventListener("click",this.confirmarbaja)
		confirmar_reactivar_registro.addEventListener("click",this.confirmareingreso)
    }
	obtenerDatosTabla(){
	 
	
	$.ajax({
			url: base_url+'Credencializacion/Ctrl_Vehiculos/getAll',
			type: 'GET',
			dataType: 'json',
			success: function(response){
				let modificar = ""; 
				let consultar = "";
				let eliminar = "";
				let reactivar = "";
				response.data.forEach(element => {
					
					if (element.estatus_me  === null){}else {
					 
					consultar = '<div class="p-1">'+
                            '<a href="#!" title="Consultar">'+
                                '<span class="glyphicon glyphicon-eye-open ver" data-id="'+element.id+'" data-id_me="'+element.id_me+'"  ></span> '+
                            '</a>'+
                        '</div>';
					if (element.estatus_me == 1){
						eliminar = "<div class='p-1'><a href='#!' title='Dar de baja'><span class='glyphicon glyphicon-trash eliminar' data-id='"+element.id+"' data-id_me='"+element.id_me+"'></span>";
					}else eliminar = "";
					 
					reactivar = '<div class="p-1"><a href="#!" title="Reactivar"><span class="glyphicon glyphicon-ok-circle reactivar" data-id="'+element.id+'" data-id_me="'+element.id_me+'"></span></a></div>';
					modificar = '<div class="p-1"> <a href="#!" title="Modificar"> <span class="glyphicon glyphicon-pencil editar" data-id="'+element.id+'" ></span> </a> </div>';
						
						
					DTIdentidades.row.add([
                            '<center>'+element.numero_placa+'</center>',
                            '<center>'+(element.numero_serie ==  null ? '': element.numero_serie)+'</center>',
                            '<center>'+(element.anio ==  null ? '': element.anio)+'</center>',
							'<center>'+(element.tipo_vehiculo ==  null ? '': element.tipo_vehiculo)+'</center>',
                            '<center>'+(element.estatus_me == 1 ? 'Activo': 'Inactivo')+'</center>', 
                            (element.estatus_me == 1) ? '<div class="d-flex justify-content-center" >'+
                                consultar+
                                modificar+
                                eliminar+                                
                            '</div>' : '<div class="d-flex justify-content-center" >'+ consultar + reactivar + '</div>'+
                            '</div>'
                        ]).draw(false);
					}
				});					
			}
	});
	}
	ver_registro(ev){
        localStorage.setItem("id_vehiculo", ev.target.dataset.id); 
		localStorage.setItem("id_vehiculo_me", ev.target.dataset.id_me);
        window.location.href= base_url + "Credencializacion/Ctrl_Vehiculos/consultar";
    }
	editar_registro(ev){
        localStorage.setItem("id_vehiculo", ev.target.dataset.id);
        window.location.href= base_url + "Credencializacion/Ctrl_Vehiculos/modificar";
    }
	eliminar_registro(ev){
        localStorage.setItem("id_vehiculo", ev.target.dataset.id);
		localStorage.setItem("id_vehiculo_me", ev.target.dataset.id_me);
        pedir_confirmacion_eliminar();
    }
	reactivar(ev){
		 
        localStorage.setItem("id_vehiculo", ev.target.dataset.id);
		localStorage.setItem("id_vehiculo_me", ev.target.dataset.id_me);
		
        pedir_confirmacion_reactivar();
    }
	
	confirmarbaja(ev){
        const id_vehiculo = localStorage.getItem("id_vehiculo");
     
		$.ajax({
            url: base_url + 'Credencializacion/Ctrl_Vehiculos/delete',
            type: "POST",
            data: {
                id_vehiculo: id_vehiculo, 
                [csrf.name] : csrf.value
            },
            beforeSend:function(){
                DTIdentidades.clear().draw();
                $("#modal_confirmar_baja").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    registro_exitoso(data.message);
                    Aministrador.prototype.obtenerDatosTabla();
                }
                else
                    peticion_fallida(data.message);
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $("#modal_confirmar_baja").modal("hide");
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        })
	}
	
	confirmareingreso(){
		const id_vehiculo = localStorage.getItem("id_vehiculo_me");
		  $.ajax({
        url: base_url + 'Credencializacion/Ctrl_Vehiculos/active',
        type: "POST",
        data: {
            id_vehiculo: id_vehiculo, 
            [csrf.name] : csrf.value
        },
        beforeSend: function(){
			DTIdentidades.clear().draw();
            $("#modal_confirmar_reactivar").modal("hide");
        },
        success: (data) => {
            csrf.value = data.token;
            if(data.status == true){
                registro_exitoso(data.message);
                Aministrador.prototype.obtenerDatosTabla();
            }
            else
                peticion_fallida(data.message);


        },
        error: (xhr, ajaxOptions, thrownError) =>{
            $("#modal_confirmar_reactivar").modal("hide");
            peticion_fallida(thrownError);
            csrf.value = xhr.responseJSON.token;
        }
    })
	}
	
	
}
const adm = new Aministrador();
$(tabVehiculos).on('click', '.ver', function(ev){
    adm.ver_registro(ev);
});
$(tabVehiculos).on('click', '.editar', function(ev){
    adm.editar_registro(ev);
});
$(tabVehiculos).on('click', '.eliminar', function(ev){
    adm.eliminar_registro(ev);
});
$(tabVehiculos).on('click', '.reactivar', function(ev){  
    adm.reactivar(ev);
});
