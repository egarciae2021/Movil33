function CerrarCarga() {
    window.parent.$("#dvCargando").hide();
}
function ExportarArchivo() {
    location.href = $("#hdfArchivo").val();
}
$(function () {

    $(".MESANHO").removeClass("ui-widget-content ui-corner-all");
    $(".MESANHO").css("padding", "0px");
    $(".MESANHO").css("margin", "0px");
    $(".MESANHO").kendoDatePicker({
        culture: "es-ES",
        animation: false,
        start: "year",
        depth: "year",
        format: "MM/yyyy"
    });

    $("input:checkbox,input:radio,input:file").uniform();
    //$(".btnNormal").button();

    //$("#btnCargar").hide();
    //$("body").css({ "margin": "0px", "padding": "0px" });
    $(".uploader").css("width", "280px");
    $(".filename").css("width", "175px");

    $("#btnCargar").hide();
    var extArray = new Array(".xls", ".xlsx");

    $(".btnNormal").button();

    function ValidaExtension() {
        var Archivo = $("#fuArchivo").val();
        var ext = Archivo.slice(Archivo.lastIndexOf(".")).toLowerCase();
        if (Archivo == "") {
            return true;
        }
        var i = 0;
        for (i = 0; i < extArray.length; i++) {
            if (extArray[i] == ext) {
                return true;
            }
        }

        return false;
    }

    $("#btnCargarCli").click(function () {
        if (!ValidaExtension()) {
            alerta("Seleccione un archivo del tipo Hoja de calculo(xls o xlsx)");
            $("#fuArchivo").focus();
            return;
        }
        window.parent.$("#dvCargando").show();
        window.parent.$("#dvExportacionImportacion").dialog("close");
        $("#btnCargar").click();
    });
}); 