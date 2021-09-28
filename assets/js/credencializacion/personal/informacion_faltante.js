let QrScanner
import('../../../librerias/QRScanner/qr-scanner.min.js').then((module) => {
    QrScanner = module.default;
    QrScanner.WORKER_PATH = '../../assets/librerias/QRScanner/qr-scanner-worker.min.js';
});

var scanner;
var datosEscaneados = '';
const video = document.getElementById('qr-video');
const camQrResult = document.getElementById('cam-qr-result');

var uploaderPersonal = new plupload.Uploader({
    browse_button: 'adjuntarPersonal', // this can be an id of a DOM element or the DOM element itself
    url: base_url+'upload/uploadPersonal',
    chunk_size: '1mb',
    max_file_count: 1,
    multi_selection: false,
    unique_names: true,
    multipart_params: {
        [csrf.name] : csrf.value
    },
    //ADD FILE FILTERS HERE
    filters: {
        max_file_size : '20mb',
        mime_types: [
            { title: "JPG Archivos", extensions: "jpg" },
            { title: "JPEG Archivos", extensions: "jpeg" },
            { title: "PNG Archivos", extensions: "png" },
        ]

    },
    init: {
        PostInit: function () {
            /*document.getElementById('btnAceptarAdjuntarPersonal').onclick = function () {
                uploaderPersonal.start();
                return false;
            }*/
        },
        Error: function(up, err) {
            if(err.code == -600)
                $(erroradjuntarContrato).html("El maximo tamaño de archivo es de 20mb")
        },
        Browse: function (up) {
            // Called when file picker is clicked
            if (up.files.length > 0)
                up.removeFile(up.files[0]); // Delete the last selection if it exists
        },
        FilesAdded: function (up, files) {
            // Called when files are added to queue
            $(erroradjuntarPersonal).html("")
            errorSubirFotografia.innerHTML = ""
            pers.previsualizar_personal(up.files)
        },
        UploadProgress: function (up, file) {
            // Called while file is being uploaded
            //divVisualizarContrato.style.display = ""
            //var span = document.getElementById('visualizarContrato');
            //span.innerHTML = '<span> Cargando archivo: ' + file.percent + '%</span>';
            //visualizarContrato.classList.add("disabled");
        },
        BeforeUpload: function (up, file) {
            // Called right before the upload for a given file starts, can be used to cancel it if required
            //$(modalPersonal).modal('toggle');
        },
        FileUploaded: function (up, file, info) {
            info = JSON.parse(info.response)
            csrf.value = info.token;
            uploaderPersonal.settings.multipart_params[csrf.name] = info.token;
            // Called when file has finished uploading
            let formData = new FormData();
            formData.append("idpersona",idpersona.value)
            formData.append("idimagen", (adjuntarPersonal.dataset.id == "" ? 0 : adjuntarPersonal.dataset.id))
            formData.append("fotografiapersona", file.target_name);

            $.ajax({
                url : base_url+'Credencializacion/Ctrl_Publico/addImagenPersona',
                type : 'POST',
                data : formData,
                global: false,
                processData: false,
                contentType: false,
                beforeSend: function(){
                    $("#modal_confirmar_guardar").modal("hide");
                },
                success : function(response) {
                    csrf.value = response.token;
                    if(response.status){
                        idpersona.value = 0
                        nss.value = ""
                        curp.value = ""

                        divEscaneo.style.display = ""
                        divSubirFotografia.style.display = "none"
                        divBtnGuardar.style.display = "none"

                        adjuntarPersonal.dataset.id = ""
                        adjuntarPersonal.dataset.imagen = ""
                        btnAdjuntarFotografia.value = "Subir fotografiá"

                        registro_exitoso(response.message);
                    }else{
                        peticion_fallida(response.message);
                    }
                    spinner.style.visibility="hidden";
                },
                error: (xhr, ajaxOptions, thrownError) =>{
                    spinner.style.visibility="hidden";
                    peticion_fallida(thrownError);
                    csrf.value = xhr.responseJSON.token;
                }
            })
        },
    }
});

uploaderPersonal.init();

class Personal{
	constructor(){
        this.inicio();
	}
	inicio(){
        let elementos = document.getElementsByClassName("escanear-camara");
        for (var i = 0; i < elementos.length; i++) {
            elementos[i].addEventListener("click", () =>{
                $(modalEscanerCURP).modal();
                QrScanner.hasCamera().then(hasCamera =>{
                    if(hasCamera){
                        scanner = new QrScanner(video, result => setResult(result), error => {
                            camQrResult.textContent = "Código QR no encontrado";
                        });
                        scanner.start();
                    }
                });
            })
        }

        elementos = document.getElementsByClassName("escanear-escaner");
        for (var i = 0; i < elementos.length; i++) {
            elementos[i].addEventListener("click",()=>{
                $(modalEscanerCURP).modal();
                $(escaneoQR).val("");
                $(escaneoQR).focus()
            })
        }

        let timeout
        escaneoQR.addEventListener("keydown",(ev)=>{
            spinner.style.visibility = 'visible'
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                let datosEscaneados = ev.target.value
                datosEscaneados = datosEscaneados.split("]")
                let indexNSS = datosEscaneados[2]
                indexNSS = indexNSS.split(" ")
                if(indexNSS[indexNSS.length-1] == ""){
                    nss.value = indexNSS[indexNSS.length-2]
                }else{
                    nss.value = indexNSS[indexNSS.length-1]
                }

                let indexCURP = datosEscaneados[4]
                indexCURP = indexCURP.split(" ")
                curp.value = indexCURP[indexCURP.length-1]

                Personal.prototype.verificar_existencia_persona()
                $(modalEscanerCURP).modal('hide');
                clearTimeout(timeout)
            },1000)
        })

        btnAdjuntarFotografia.addEventListener("click",(ev)=>{
            if(adjuntarPersonal.dataset.imagen != ""){
                $(pdfViewerPersonal).html('<img width="100%" height="200" src="'+base_url+'/'+adjuntarPersonal.dataset.imagen+'"/>');
            }else if(adjuntarPersonal.value == ""){
                pdfViewerPersonal.innerHTML = ''
                erroradjuntarPersonal.innerHTML = ''
            }
            $(modalPersonal).modal()
        })
        //adjuntarPersonal.addEventListener("change",this.previsualizar_personal)

        confirmar_salir_sin_guardar.addEventListener('click',(ev)=> {
            window.location.href = base_url + 'Credencializacion/Ctrl_Personal';
        });

        btnGuardar.addEventListener("click",this.realizar_almacenamiento)
        confirmar_guardar.addEventListener("click",this.guardar)
    }
    verificar_existencia_persona(){
        if(curp.value == ""){
            return false
        }
        $.ajax({
            url: base_url+'Credencializacion/Ctrl_Publico/getByCURP',
            type: 'GET',
            dataType: 'json',
            global: false,
            data : {
                curp : curp.value
            },
            beforeSend: function(){
                idpersona.value = 0

                divEscaneo.style.display = ""
                divSubirFotografia.style.display = "none"
                divBtnGuardar.style.display = "none"

                adjuntarPersonal.dataset.id = ""
                adjuntarPersonal.dataset.imagen = ""
                btnAdjuntarFotografia.value = "Subir fotografiá"

                errornss.innerHTML = ""
            },
            success: function(response){
                if(response.data != null){
                    idpersona.value = response.data.id
                    divEscaneo.style.display = "none"
                    divSubirFotografia.style.display = ""
                    divBtnGuardar.style.display = ""

                    if(response.data.id_imagen_persona != null){
                        adjuntarPersonal.dataset.id = response.data.id_imagen_persona
                        adjuntarPersonal.dataset.imagen = response.data.fotografia_persona
                        btnAdjuntarFotografia.value = "Actualizar fotografiá"
                    }
                }else{
                    errornss.innerHTML = "No se encuentra registrado"
                }
            }
        })
    }
    previsualizar_personal(files){

        var fileReader = new FileReader();
        var file = files[0].getNative();
        $(pdfViewerPersonal).html('<div></div>');
        fileReader.onload = () => {
            var TheFileContents = fileReader.result;
            $(pdfViewerPersonal).css({"overflow":"hidden", "height":"300px", "overflow-y":"scroll"});
            $(pdfViewerPersonal).html('<div class="img-zoom-container"><img id="myimage" width="100%" src="' + TheFileContents + '"/>');
        };
        fileReader.readAsDataURL(file);
    }
    realizar_almacenamiento(){
        let validacion = true;
        if(idpersona.value == 0){
            errornss.innerHTML = "No se encuentra registrado"
            validacion = false
        }

        if(uploaderPersonal.files.length == 0){
            errorSubirFotografia.innerHTML = "Campo obligatorio"
            validacion = false
        }

        if(validacion){
            $("#modal_confirmar_guardar").modal()
        }
    }
    guardar(){
        uploaderPersonal.start();
    }
}

const pers = new Personal()

function setResult(result) {
    scanner.stop();
    datosEscaneados = result.split("|");
    let indexNSS = datosEscaneados[2]
    indexNSS = indexNSS.split(" ")
    if(indexNSS[indexNSS.length-1] == ""){
        nss.value = indexNSS[indexNSS.length-2]
    }else{
        nss.value = indexNSS[indexNSS.length-1]
    }

    let indexCURP = datosEscaneados[4]
    indexCURP = indexCURP.split(" ")
    curp.value = indexCURP[indexCURP.length-1]

    pers.verificar_existencia_persona()
    $(modalEscanerCURP).modal("hide");
}

$("#btnCancelarEscaneo").click(function(){
    scanner.stop();
});