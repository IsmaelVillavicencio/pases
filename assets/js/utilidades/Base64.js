class base64 {
    constructor(idFile){
        this.id = idFile
    }
    get format(){
        return this.convert()
    }
    convert (){
        let response = {
            error : true,
            data  : []
        }

        let reader = new FileReader();
        reader.readAsDataURL(this.id);
        reader.onload = function () {
            response.error = false
            response.data = render.result
        };
        return response
    }
}