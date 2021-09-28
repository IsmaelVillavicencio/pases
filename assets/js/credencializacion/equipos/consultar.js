const id_equipo = localStorage.getItem("id_equipo");
class Consultar{
    constructor(){
        this.inicio()
        this.obtener_datos()
    }
    inicio(){
        btnSubirEquipo.addEventListener('click',(ev)=>{
            $(modalEquipo).modal()
        })
    }
    obtener_datos(){
        $.ajax({
			url: base_url+'Credencializacion/Ctrl_Equipos/getById',
			type: 'GET',
			dataType: 'json',
            data : {
                idequipo : id_equipo
            },
			success: function(response){
                if(response.data != null){
                    tipoEquipo.value = response.data.tipo_equipo
                    noSerieEquipo.value = response.data.numero_serie
                    modeloHerramienta.value = response.data.modelo
                    marcaHerramienta.value = response.data.marca
                    tipoDocumento.value = response.data.tipo_documento
                    noFacturaEquipo.value = response.data.numero_factura

                    $(pdfViewerEquipo).html('<img width="460" height="200" src="'+base_url+response.data.factura_equipo+'"/>');
                }
			}
		});
    }
}
const cons = new Consultar()