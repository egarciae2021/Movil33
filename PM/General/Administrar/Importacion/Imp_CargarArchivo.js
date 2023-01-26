var codConfig;
$(function () {
    codConfig = window.parent.codConfig;
    $("#hdfCodConfig").val(codConfig);
    $("#btnSubir").hide();
    $(".btnNormal").button();
    $(".uploader").css("width", "280px");
    $(".filename").css("width", "175px");
    if (mostrarAlerta) {

        window.parent.NombreArchivo(textoAlerta);
        window.parent.Ejecutar();
//        mostrarAlerta = false;
    } else {
        window.parent.NombreArchivo("");
        if (textoAlerta != "") {
            window.parent.alerta(textoAlerta);
        }
    }

//    $("#btnCargar").click(function () {
//        codConfig = window.parent.codConfig;
//        $("#hdfCodConfig").val(codConfig);
//        $("#btnSubir").click();
//    });

    $("#btnSubirArchivo").click(function () {
        codConfig = window.parent.codConfig;
        $("#hdfCodConfig").val(codConfig);
    });

});