let meses = []
meses[1] = "Enero"
meses[2] = "Febrero"
meses[3] = "Marzo"
meses[4] = "Abril"
meses[5] = "Mayo"
meses[6] = "Junio"
meses[7] = "Julio"
meses[8] = "Agosto"
meses[9] = "Septiembre"
meses[10] = "Octubre"
meses[11] = "Noviembre"
meses[12] = "Diciembre"

class whatsappPermisos {
    constructor(datos){
        this.id_pase = datos.id_pase
        this.id = datos.id
        this.nombre_pila = datos.nombre_persona
        this.nombre = datos.nombre

        const fecha_actual = new Date()
        let mes = fecha_actual.getMonth() + 1
        let dia = fecha_actual.getDate()
        let anio = fecha_actual.getFullYear()

        return {
            mensaje : 'Colima, Col., '+dia+' de '+meses[mes]+' del '+anio+' %0A%0A'+
                this.nombre+"%0A"+
                "Presente%0A%0A"+
                "Apreciable "+this.nombre_pila+"%0A%0A"+
                "Se ha autorizado el permiso de acceso:%0A"+
                "a continuacion se anexan los link donde podra consultar el permiso y la credencial:%0A"+
                "%0APermiso de acceso: "+base_url+'Permisos/Ctrl_Credencial/permiso/'+this.id_pase+
                "%0ACredencial: "+base_url+'Permisos/Ctrl_Credencial/credenciales/'+this.id_pase+'/'+this.id
        }
    }
}