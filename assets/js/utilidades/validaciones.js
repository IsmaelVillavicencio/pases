class VALIDACIONES{
	curp(valor){
        let resultado = {
            resp                : true,
            message             : '',
            fecha_nacimiento    : '',
            edad                : 0,
            sexo                : '',
            nacionalidad        : '1',
            estado_nacimiento   : 0
        };
        if(!(/^[A-Z]{1}[AEIOUX]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/.test(valor))){
            resultado.resp = false;
            resultado.message = 'Información no válida';
        }else{
            var anio = valor.substr(4, 2);
			var mes = valor.substr(6, 2);
			var dia = valor.substr(8, 2);
			var caracter = valor.substr(16,1);
			let ascii = caracter.toUpperCase().charCodeAt(0);
			if( ascii > 64 && ascii < 91 ){
                resultado.fecha_nacimiento = '20'+anio+'-'+mes+'-'+dia;
			}else{
                resultado.fecha_nacimiento = '19'+anio+'-'+mes+'-'+dia;
            }
            
            var fecha = new Date();
			var anio_actual = fecha.getFullYear();

			if( ascii > 64 && ascii < 91 ){
				anio = '20' + anio;
			}else{
				anio = '19' + anio;
            }
            
            var fechaNace = new Date(resultado.fecha_nacimiento);
            var fechaActual = new Date()

            var mes = fechaActual.getMonth();
            var dia = fechaActual.getDate();
            var año = fechaActual.getFullYear();

            fechaActual.setDate(dia);
            fechaActual.setMonth(mes);
            fechaActual.setFullYear(año);
        
            resultado.edad = Math.floor(((fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365));

            if(resultado.edad < 0 || resultado.edad > 100){
                resultado.resp = false;
                resultado.message = 'El formato no es válido';
                resultado.fecha_nacimiento    = '';
                resultado.edad = 0;
                resultado.sexo = '';
                resultado.nacionalidad = '1';
                resultado.estado_nacimiento = 0;
            }else if(resultado.edad < 18){
                resultado.resp = false;
                resultado.message = 'Es necesario que sea mayor de edad';
                resultado.fecha_nacimiento    = '';
                resultado.edad = 0;
                resultado.sexo = '';
                resultado.nacionalidad = '1';
                resultado.estado_nacimiento = 0;
            }

            resultado.sexo = (valor.slice(10,11) == "H") ? "Masculino" : "Femenino";
            resultado.estado_nacimiento = valor.slice(11,13);
            if(resultado.estado_nacimiento == "NE"){
                resultado.nacionalidad = ""
            }
        }
        return resultado;
    }
    rfc(tipo,valor){
        let resultado = {resp : true};
        if(!(/^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$/.test(valor))){
            resultado.resp = false;
        }

        if(tipo == 1 && valor.length != 13){
            resultado.resp = false;
        }

        if(tipo == 2 && valor.length != 12){
            resultado.resp = false;
        }
        return resultado
    }
    INE_IFE(valor){
        let resultado = {resp : true};
        if(!(/^(?:[A-Z\d]{16}|[A-Z\d]{18})$/.test(valor))){
            resultado.resp = false;
        }
        return resultado
    }
    pasaporte(valor){
        let resultado = {resp : true};
        if(!(/^[A-Z\d]{3,13}$/.test(valor))){
            resultado.resp = false;
        }
        return resultado
    }
    alfanumericos_11(valor){
        let resultado = {resp : true};
        if(!(/^[A-Z\d]{11}$/.test(valor))){
            resultado.resp = false;
        }
        return resultado
    }
    alfanumericos_10(valor){
        let resultado = {resp : true};
        if(!(/^[A-Z\d]{10}$/.test(valor))){
            resultado.resp = false;
        }
        return resultado
    }
    caracteres_validos_sin_acentos_con_numero(valor,longitud_min){
        let resultado = {resp : true}
        if (!(/^[a-zA-ZñÑ0-9]+$/.test(valor)) || valor.length < longitud_min){
            resultado.resp = false
        }
        return resultado
    }
    correo(valor){
        let resultado = {resp : true};
        if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(valor))){
            resultado.resp = false;
        }
        return resultado
    }
    caracteres_validos(valor,longitud_min){
        let resultado = {resp : true}
        if (!(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ.\s]+$/.test(valor)) || valor.length < longitud_min){
            resultado.resp = false
        }
        return resultado
    }
    caracteres_validos_apostrofe(valor,longitud_min){
        let resultado = {resp : true}
        if (!(/^[0-9a-zA-ZáéíóúÁÉÍÓÚñÑ\.\,\!\#\$\%\&\?\¿\¡\+\{\}\[\]\;\_\-\(\)\/\"\s]+$/.test(valor)) ){
            resultado.resp = false
        }
        return resultado
    }
    caracteres_validos_sin_acentos(valor,longitud_min){
        let resultado = {resp : true}
        if (!(/^[a-zA-ZñÑ.\s]+$/.test(valor)) || valor.length < longitud_min){
            resultado.resp = false
        }
        return resultado
    }
    caracteres_validos_especial(valor,longitud_min){
        let resultado = {resp : true}
        if (!(/^[0-9a-zA-ZáéíóúÁÉÍÓÚñÑ\.,\-\(\)\/\"\'\s]+$/.test(valor)) ){
            resultado.resp = false
        }
        return resultado
    }
    caracteres_validos_numericos(valor,longitud_min){
        let resultado = {resp : true}
        if (!(/^[0-9]+$/.test(valor)) || valor.length < longitud_min){
            resultado.resp = false
        }
        return resultado
    }
    caracteres_validos_alphanumeric(valor, long_min, long_max, tipo_rango){
        let resultado = {resp : true}
        if (!(/^[0-9a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/.test(valor)) || valor.length < long_min || valor.length > long_max){
            resultado.resp = false
        }
        if (tipo_rango == 2 && valor.length != long_min && valor.length != long_max){
            resultado.resp = false
        }
        return resultado
    }
    caracteres_validos_alphanumeric_s(valor, long_min, long_max, tipo_rango){
        let resultado = {resp : true}
        if (!(/^[0-9a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) || valor.length < long_min || valor.length > long_max){
            resultado.resp = false
        }
        if (tipo_rango == 2 && valor.length != long_min && valor.length != long_max){
            resultado.resp = false
        }
        return resultado
    }
}