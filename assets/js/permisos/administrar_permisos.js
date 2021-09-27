var DTHistorial 

const consulta = localStorage.getItem("vista_consulta")
console.log(consulta)

/*var nombreL = localStorage.getItem("nombre")
var fechaIniL = localStorage.getItem("fechainicio")
var fechaTerL= localStorage.getItem("fechatermino")
var tipoPerL = localStorage.getItem("tipopermiso")
var estatusPerL = localStorage.getItem("estatuspermiso")
var empresaL = localStorage.getItem("empresa")*/

var id_empresa = idempresavigenteusuario

class Historial{
    constructor(){
        this.inicio();
        this.obtener_tipos_permisos();
        this.obtener_estatus();
        this.obtener_empresas();
        this.obtener_nombre();
    }
    inicio(){

       // localStorage.clear();

        DTHistorial = $(tabHistorial).DataTable({
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                },
                "order": []
        })
        errortabHistorial.innerHTML = ""

        buscar.addEventListener('click',(ev)=>{
           let elementFiltro = document.getElementsByClassName('filtro')
                for (let index = 0; index < elementFiltro.length; index++) {
                    const element = elementFiltro[index];
                    element.style.display = "none"
                }
            Historial.prototype.buscar()
        })
        filtrar.addEventListener('click',(ev)=>{
        
            let elementFiltro = document.getElementsByClassName('filtro')
                for (let index = 0; index < elementFiltro.length; index++) {
                    const element = elementFiltro[index];
                    if(element.style.display == "none"){
                        element.style.display = "block"
                    }else{
                        element.style.display = "none"
                      }
                }
            
            errortabHistorial.innerHTML = ""
        })
        limpiarFiltro.addEventListener('click',(ev) =>{
            let elementos = document.getElementsByClassName('form-control')
            for (let i = 0; i < elementos.length; i++) {
                 elementos[i].value = "";
            }
            errortabHistorial.innerHTML = ""
        })
        /*if(nombreL != null || fechaIniL != null || fechaTerL != null || tipoPerL != null || estatusPerL != null ||  empresaL != null){
            
            nombre.value = (nombreL != "" ? nombreL : "" )
            fechaInicio.value = (fechaIniL != "" ? fechaIniL : "")
            fechaFin.value = (fechaTerL != "" ? fechaTerL : "")
            tipoPermiso.value = (tipoPerL != "" ? tipoPerL : "")
            estatusPermiso.value = (estatusPerL != "" ? estatusPerL : "")
            empresa.value = (empresaL != "" ? empresaL : "")
            
            Historial.prototype.buscar()
        }*/
        
    }
    obtener_tipos_permisos(){
        $.ajax({
			url: base_url+'Catalogos/Ctrl_TiposPermisos/getByEstatus',
			type: 'GET',
            dataType: 'json',
            data : {
                estatus : 1
            },
            beforeSend: function(){
                $(tipoPermiso).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(tipoPermiso).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {

		});
    }
    obtener_estatus(){
        $.ajax({
			url: base_url+'Permisos/Ctrl_Permisos/getStatusPermisos',
			type: 'GET',
            dataType: 'json',
            data : {
                estatus : 1
            },
            beforeSend: function(){
                $(estatusPermiso).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(estatusPermiso).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                });
			}
		}).fail( function(response) {

		});
    }
    obtener_empresas(){
        if(typeof selEmpresa !== 'undefined'){
            $.ajax({
                url: base_url+'Usuarios/Ctrl_Empresas/getByUsuario',
                type: 'GET',
                dataType: 'json',
                data : {
                    estatus : 1
                },
                beforeSend: function(){
                    $(selEmpresa).append('<option value="">Seleccione</option>');
                },
                success: function(response){
                    response.data.forEach(element => {
                        $(selEmpresa).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                    });
                }
            })
        }else{
            $.ajax({
                url: base_url+'Usuarios/Ctrl_Empresas/getById',
                type: 'GET',
                dataType: 'json',
                data : {
                    id : id_empresa
                },
                success: function(response){
                    empresa.dataset = response.data.id
                    empresa.value = response.data.nombre
                }
            })
        }
    }
    obtener_nombre(){
      
    }
    buscar(){
        DTHistorial.clear().draw();
        if(tipoPermiso.value == "" && estatusPermiso.value == "" && empresa.value == "" &&
            fechaInicio.value == "" && fechaFin.value == "" && nombre.value == ""){
                errortabHistorial.innerHTML = "Debe elegir al menos un criterio de búsqueda"
            }else{
                $.ajax({
                    url: base_url+'Permisos/Ctrl_Permisos/getAllFiltro',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                      nombrepersona : nombre.value,
                      fechainicio : fechaInicio.value,
                      fechatermino : fechaFin.value,
                      idtipopermiso : (tipoPermiso.value != "" ? tipoPermiso.value : 0),
                      idestatuspermiso : (estatusPermiso.value != "" ? estatusPermiso.value : 0),
                   // idempresa : (empresa.value != "" ? empresa.value : 0)
                      idempresa : idempresavigenteusuario
                    },
                    success: function(response){
                        if(response.data != ""){
                            response.data.forEach(element =>{
                                DTHistorial.row.add([
                                    '<center>'+element.id+'</center>',
                                    '<center>'+element.empresa+'</center>',
                                    '<center>'+element.tipo_permiso+'</center>',
                                    '<center>'+(element.permiso_grupal == 1 ? 'Grupal' : 'Personal')+'</center>',
                                    '<center>'+element.estatus_nombre+'</center>',
                                    '<center>'+'<a href="#!" title="Consultar">'+
                                        '<span class="glyphicon glyphicon-eye-open ver" data-id="'+element.id+'"></span>'+
                                        '</a>'+'</div>'+
                                    '</center>'
                                ]).draw(false)   
                            }); 
                        }else{
                            registro_exitoso("No se encontraron registros con los datos ingresados")
                        }
                     /*   localStorage.setItem("nombre",nombre.value)
                        localStorage.setItem("fechainicio",fechaInicio.value)
                        localStorage.setItem("fechatermino",fechaFin.value)
                        localStorage.setItem("tipopermiso",(tipoPermiso.value != "" ? tipoPermiso.value : 0))
                        localStorage.setItem("estatuspermiso",(estatusPermiso.value != "" ? estatusPermiso.value : 0))
                        localStorage.setItem("empresa",(empresa.value != "" ? empresa.value : 0))*/
                        errortabHistorial.innerHTML = ""
                            let elementos = document.getElementsByClassName('form-control')
                            for (let i = 0; i < elementos.length; i++) {
                                elementos[i].value = "";
                            }
                    }
            })
        }
    }
    consultar_registro(ev){
        localStorage.setItem("id_permiso", ev.target.dataset.id);
        localStorage.setItem("url_regreso","Permisos/Ctrl_Permisos/administrar_permisos")
        window.location.href= base_url + "Permisos/Ctrl_Permisos/consultar";
                   
    }
}
const admin = new Historial() 

$(tabHistorial).on('click', '.ver', function(ev){
    admin.consultar_registro(ev);
});