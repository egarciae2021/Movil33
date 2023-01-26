var extArray = [".jpg", ".jpeg", ".bmp", ".png", ".gif"];

$(function () {    
    //ValidarExtencion();    
});


function ValidarExtencion() {
    var ok = true;

    if ($.trim($("#fuArchivo").val()) == "") {
        alerta("Seleccione un archivo del tipo imagen(jpg, jpeg, bmp, png, gif)");
        $("#fuArchivo").focus();
        ok = false;
    }
    else{
        if (!ValidaExtensionImagen()) {
            alerta("Seleccione un archivo del tipo imagen(jpg, jpeg, bmp, png, gif)");
            $("#fuArchivo").focus();
            ok = false;
        } else {
            ok = true;
        }
    }
    return ok;
    //$("#btnCargar").click();
}

function ValidaExtensionImagen() {
    var Archivo = $("#fuArchivo").val();
    var ext = Archivo.slice(Archivo.lastIndexOf(".")).toLowerCase();
    if (Archivo == "") {
        return true;
    }
    //alert($('#hdfArchivo').val());
    var i = 0;
    for (i = 0; i < extArray.length; i++) {
        if (extArray[i] == ext) {
            return true;
        }
    }
    location.reload();
    return false;
}

function LimpiarCampos() {
    
}

