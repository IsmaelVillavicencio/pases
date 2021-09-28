const id_documento = localStorage.getItem("id_documento");
const id_tipo_documento = localStorage.getItem("id_tipo_documento");
const id_tipo_persona = localStorage.getItem("id_tipo_persona");
const nombre_documento = localStorage.getItem("nombre_documento");
let areas = localStorage.getItem("areas");
areas = areas.split(",");
const etapa = localStorage.getItem("etapa");
const vigencia = localStorage.getItem("vigencia");
var iniSelDocumento = id_tipo_documento
var iniNomDocumento = nombre_documento
var areas_baja = []
var areas_alta = []
let errorDocumento = false;


class Documentos{
	constructor(){
        this.inicio();
        this.obtener_tipos();
        this.obtener_personas();
        this.obtener_areas();
	}
	inicio(){
        
        SelTipoDocumento.addEventListener('change',function(){
            if(SelTipoDocumento.value != ""){
                $(errorTipoDocumento).hide()
            }else{
                $(errorTipoDocumento).show()
            }

            if(SelTipoDocumento.value == 1){
                $(divTiposPersonas).show();
            }else{
                $(SelTipoPersona).val(3);
                $(divTiposPersonas).hide();
            }
        })

        ckhVigencia.addEventListener('change',function(){
            if (ckhVigencia.checked == true){
                ckhVigencia.value = 1
              } else {
                ckhVigencia.value = 0
              } 
        })

        SelEtapa.addEventListener('change',function(){
            if(SelEtapa.value != ""){
                $(errorEtapa).hide()
            }else{
                $(errorEtapa).show()
            }
        })

        if(id_tipo_documento == 1){
            $(divTiposPersonas).show();
        }

        confirmar_salir_sin_guardar.addEventListener('click',(ev)=> {
            window.location.href = base_url + 'Catalogos/Ctrl_Documentos';
        });

        btnGuardar.addEventListener("click",this.realizar_almacenamiento)
        confirmar_guardar.addEventListener("click",this.guardar)

        nombreDocumento.value = nombre_documento
        SelEtapa.value = etapa
        ckhVigencia.value = vigencia

        if(vigencia == 1){
            ckhVigencia.checked = true
        }else{
            ckhVigencia.checked = false
        }

        ckhVigencia.addEventListener('change',function(){
            if (ckhVigencia.checked == true){
                ckhVigencia.value = 1
              } else {
                ckhVigencia.value = 0
              } 
        })
        nombreDocumento.addEventListener("change",this.validar)
        nombreDocumento.addEventListener('keyup',() => {
            btnGuardar.removeEventListener("click",this.realizar_almacenamiento);
        })

        nombreDocumento.addEventListener("keydown",(ev) => {
            if(ev.keyCode != 16){
                this.validaciones = new VALIDACIONES();
                let resultado = this.validaciones.caracteres_validos_especial(ev.key,1);
                if(!resultado.resp){
                    ev.preventDefault();
                }
            }
        })
    }

    validar(ev){

        error.innerHTML = ''
        errorDocumento = false
        $(loadingValidar).show();

        this.validaciones = new VALIDACIONES();
        if(ev.target.value == ""){
            error.innerHTML = 'Campo Obligatorio'
            errorDocumento = true
        }else{
            let resultado = this.validaciones.caracteres_validos_especial(ev.target.value,2);
            if(!resultado.resp){
                error.innerHTML = 'Información no valida'
                errorDocumento = true
            }
        }

        if(!errorDocumento){
            $.ajax({
                url: base_url+'Catalogos/Ctrl_Documentos/getByNombre',
                type: 'GET',
                global: false,
                data : {
                    nombre : ev.target.value.trim(),
                    iddocumento : id_documento
                },
                success: (data) => {
                    if(data.data != null){
                        error.innerHTML = 'El registro ya existe'
                        errorDocumento = true
                    }
                    btnGuardar.addEventListener('click',Documentos.prototype.realizar_almacenamiento);
                    $(loadingValidar).hide();
                },
                error: (xhr, ajaxOptions, thrownError) =>{
                    peticion_fallida(thrownError);
                    btnGuardar.addEventListener('click',Documentos.prototype.realizar_almacenamiento);
                    $(loadingValidar).hide();
                }
            });
        }else{
            btnGuardar.addEventListener('click',Documentos.prototype.realizar_almacenamiento);
            $(loadingValidar).hide();
        }
        
    }

    obtener_tipos(){
        $.ajax({
			url: base_url+'Catalogos/Ctrl_TiposDocumentos/getByEstatus',
			type: 'GET',
            dataType: 'json',
            data : {
                estatus : 1
            },
            beforeSend: function(){
                $(SelTipoDocumento).append('<option value="">Seleccione</option>');
            },
			success: function(response){
				response.data.forEach(element => {
                    $(SelTipoDocumento).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                });
            },
            complete: function(){
                SelTipoDocumento.value = id_tipo_documento
            }
		}).fail( function(response) {
			
		});
        
    }

    obtener_areas(){
        $.ajax({
            url: base_url_rest+'catalogos/areas/estatus/1',
            type: 'GET',
            dataType: 'json',
            success: function(response){
                response.data.forEach(element => {
                    $(selArea).append('<option value="'+element.id_area+'">'+element.nombre_area+'</option>')
                });
            },
            complete: function(){
                
                $(selArea).select2();
                $('#selArea').val(areas).trigger('change');
                cambios = 0
                
            }
        })
        
    }

    obtener_personas(){
        $.ajax({
			url: base_url+'Catalogos/Ctrl_TiposPersonas/getAllByEstatus',
			type: 'GET',
            dataType: 'json',
            data : {
                estatus : 1
            },
			success: function(response){
				response.data.forEach(element => {
                    $(SelTipoPersona).append('<option value="'+element.id+'">'+element.nombre+'</option>');
                });
            },
            complete: function(){
                SelTipoPersona.value = id_tipo_persona
            }
		}).fail( function(response) {
			
		});
        
    }
    realizar_almacenamiento(){
        let validacion = true;

        $(errorTipoDocumento).hide()
    

        if(SelTipoDocumento.value == ""){
            $(errorTipoDocumento).show()
            validacion = false
        }

        if(nombreDocumento.value == ""){
            error.innerHTML = 'Campo obligatorio'
            validacion = false
        }
        
        if(errorDocumento == true){
            validacion = false
        }

        if(SelEtapa.value == ""){
            $(errorEtapa).show()
            validacion = false
        }

        if(validacion){
            $("#modal_confirmar_guardar").modal()
        }

        var areas_actual = [];
        areas_alta = [];

        areas_actual = $("#selArea").val();

        //áreas para alta
        let areaAlta = areas_actual.filter(x =>! areas.includes (x));
        areas_alta.push(areaAlta)

        //áreas para baja
        let areaBaja = areas.filter(x =>! areas_actual.includes (x));
        areas_baja.push(areaBaja)

    }

    guardar(){

        $.ajax({
            url: base_url + 'Catalogos/Ctrl_Documentos/update',
            type: 'POST',
            data: {
                iddocumento     : id_documento,
                idtipodocumento : SelTipoDocumento.value,
                idtipopersona   : SelTipoPersona.value,
                nombre          : nombreDocumento.value.trim(),
                ids_areas_alta   : areas_alta.toString(),
                ids_areas_baja   : areas_baja.toString(),
                etapa           : SelEtapa.value,
                vigencia        : ckhVigencia.value,
                [csrf.name] : csrf.value

            },
            beforeSend: function(){
                $("#modal_confirmar_guardar").modal("hide");
            },
            success: (data) => {
                cambios = 0;

                csrf.value = data.token;
                if(data.status != true)
                    peticion_fallida(data.message);
                else
                    registro_exitoso(data.message);
            },
            error: (xhr, ajaxOptions, thrownError) =>{
                $("#modal_confirmar_guardar").modal("hide");
                peticion_fallida(thrownError);
                csrf.value = xhr.responseJSON.token;
            }
        })
    }
}

$(".form-control").change( (e) => {
	cambios = 1;
});

$("#btnRegresar").click( (e) => {
	if(cambios == 1)
		pedir_confirmar_regresar();
	else
		window.location.href = base_url + 'Catalogos/Ctrl_Documentos';
});

const doc = new Documentos()