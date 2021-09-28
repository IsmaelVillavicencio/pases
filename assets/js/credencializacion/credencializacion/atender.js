var DTCredenciales;
class Credenciales{
    constructor(){
        this.inicio();
        this.obtenerDatosTabla();
    }
    inicio(){
        DTCredenciales = $(tabRegCredenciales).DataTable( {
            "language": {
            "url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            },
            "order": [[ 2, "asc" ],[0, 'asc']]
        });
        //confirmar_baja.addEventListener("click",this.confirmarbaja)
        //confirmar_reactivar_registro.addEventListener("click",this.confirmarreactivar)

    }
    obtenerDatosTabla(){
        $.ajax({
            url: base_url+'Credencializacion/Ctrl_Credencializacion/getCredencialesPendientes',
            type: 'GET',
            dataType: 'json',
            success: function(response){
                console.log(response.data); return;
                let consultar = '';
                let autorizar = '';
                let rechazar = '';
                response.data.forEach(element => {
                    consultar = '<div class="p-1">'+
                    '<a href="#!" title="Consultar">'+
                        '<span class="glyphicon glyphicon-eye-open ver" data-id="'+element.id_credencial+'" ></span>'+
                    '</a>'+
                '</div>';
                    autorizar = '<div class="p-1">'+
                    '<a href="#!" title="Autorizar">'+
                        '<span class="glyphicon glyphicon-pencil editar" data-id="'+element.id_credencial+'" ></span>'+
                    '</a>'+
                '</div>';
                    rechazar = '<div class="p-1">'+
                    '<a href="#!" title="Rechazar">'+
                        '<span class="glyphicon glyphicon-trash eliminar" data-id="'+element.id_credencial+'" ></span>'+
                    '</a>'+
                '</div>';
                    
                    DTPersonal.row.add([
                        '<center>'+element.nombre+' '+element.primer_apellido+' '+element.segundo_apellido+'</center>',
                        '<center>'+(element.curp ==  null ? '': element.curp)+'</center>',
                        '<center>'+(element.tipo_persona ==  null ? '': element.tipo_persona)+'</center>',
                        '<center>'+(element.estatus_me == 1 ? 'Activo': 'Inactivo')+'</center>',
                        '<div class="d-flex justify-content-center" >'+
                            consultar+
                            autorizar+
                            rechazar+                                
                        '</div>'
                    ]).draw(false)
                });
            }
        }).fail( function(response) {
            
        });
    }
    ver_registro(ev){
        localStorage.setItem("id_credencial", ev.target.dataset.id);
        window.location.href= base_url + "Credencializacion/Ctrl_Personal/consultar";
    }
    editar_registro(ev){
        localStorage.setItem("id_credencial", ev.target.dataset.id);
        window.location.href= base_url + "Credencializacion/Ctrl_Personal/modificar";
    }
    eliminar_registro(ev){
        localStorage.setItem("id_credencial", ev.target.dataset.id);
        pedir_confirmacion_eliminar();
    }
    reactivar_registro(ev){
        localStorage.setItem("id_credencial", ev.target.dataset.id);
        pedir_confirmacion_reactivar();
    }
    confirmarbaja(ev){
        const id_credencial = localStorage.getItem("id_credencial");
        $.ajax({
            url: base_url + 'Credencializacion/Ctrl_Personal/delete',
            type: "POST",
            data: {
                idcredencial: id_credencial,
                [csrf.name] : csrf.value
            },
            beforeSend:function(){
                DTPersonal.clear().draw();
                $("#modal_confirmar_baja").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    registro_exitoso(data.message);
                    Personal.prototype.obtenerDatosTabla();
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
    confirmarreactivar(ev){
        const id_credencial = localStorage.getItem("id_credencial");
        $.ajax({
            url: base_url + 'Credencializacion/Ctrl_Personal/reactivar',
            type: "POST",
            data: {
                idcredencial: id_credencial,
                [csrf.name] : csrf.value
            },
            beforeSend:function(){
                DTPersonal.clear().draw();
                $("#modal_confirmar_reactivar").modal("hide");
            },
            success: (data) => {
                csrf.value = data.token;
                if(data.status == true){
                    registro_exitoso(data.message);
                    Personal.prototype.obtenerDatosTabla();
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

const pers = new Credenciales()

$(tabRegCredenciales).on('click', '.ver', function(ev){
    pers.ver_registro(ev);
});

$(tabRegCredenciales).on('click', '.editar', function(ev){
    pers.editar_registro(ev);
});

$(tabRegCredenciales).on('click', '.eliminar', function(ev){
    pers.eliminar_registro(ev);
});

$(tabRegCredenciales).on('click', '.reactivar', function(ev){
    pers.reactivar_registro(ev);
});