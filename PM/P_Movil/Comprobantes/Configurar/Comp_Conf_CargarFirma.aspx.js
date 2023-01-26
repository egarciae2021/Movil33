var extArray = [".jpg", ".jpeg", ".bmp", ".png", ".gif"];

$(function () {

});

function ValidarExtencion() {
    var ok = true;
    $("#lblmensaje").html("")
    //$("#hdfEstado").val("ok");
    if ($.trim($("#flUpload").val()) == "") {
        alert("Seleccione un archivo del tipo imagen(jpg, jpeg, bmp, png, gif)");
        $("#lblmensaje").html("Seleccione un archivo del tipo imagen(jpg, jpeg, bmp, png, gif)")
        
        $("#flUpload").focus();
        $("#hdfEstado").val("error");
        
        ok = false;        
    }
    else {
        if (!ValidaExtensionImagen()) {
            alert("Seleccione un archivo del tipo imagen(jpg, jpeg, bmp, png, gif)");
            $("#lblmensaje").html("Seleccione un archivo del tipo imagen(jpg, jpeg, bmp, png, gif)")
            $("#flUpload").focus();
            $("#hdfEstado").val("error");
            ok = false;
           
        } else {
            ok = true;
        };
    }


    if (!ok) {
        return ok;
    }
    else {
       
        $('#btnsubir').click();
    }
   
    //$("#btnCargar").click();
};

function ValidaExtensionImagen() {
    var Archivo = $("#flUpload").val();
    var ext = Archivo.slice(Archivo.lastIndexOf(".")).toLowerCase();
    if (Archivo == "") {
        return true;
    }
    //alert($('#hdfArchivo').val());
    for (var i = 0; i < extArray.length; i++) {
        if (extArray[i] == ext) {
            return true;
        }
    }
    //location.reload();
    return false;
};

function LimpiarCampos() {

};