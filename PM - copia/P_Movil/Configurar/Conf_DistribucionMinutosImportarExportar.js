
function CerrarCarga() {
    window.parent.$("#dvCargando").hide();

    window.parent.$("#dvExportacionImportacion").dialog("close");
    window.parent.fnDistribucionActualizada(true);
    //$("#dvCargando").hide();
}
//        function ExportarArchivo() {
//            location.href = $("#hdfArchivo").val();
//        }
$(function () {

    $("input:checkbox,input:radio,input:file").uniform();
    //$(".btnNormal").button();

    //$("#btnCargar").hide();
    //$("body").css({ "margin": "0px", "padding": "0px" });
    $(".uploader").css("width", "280px");
    $(".filename").css("width", "175px");

    $("#btnCargar").hide();

    $(".btnNormal").button();

    // ==========================================================================================
    //  IMPORTAR
    // ==========================================================================================
    $("#btnCargarCli").click(function () {

        var vcNomArhivo = $("#fuArchivo").val();

        if (vcNomArhivo.length == 0) {
            //alerta("No ha seleccionado archivo");
            $("#lblMensaje").html("No hay Archivo ...");
            //$("#lblMensaje").html("Nombre de Archivo incorrecto ...");
            $("#btnCargarCli").hide();
            return;
        }


        window.parent.$("#dvCargando").show();
        $("#btnCargar").click();

        //var vcPeriodo = $("#hdfvcPeriodo").val();

        //confirmacion("Se va actualizar el periodo " + vcPeriodo + ", desea continuar ?", Cargar_Archivo, otro, "Se requiere confirmación");

    });

    // ==========================================================================================
    //  VALIDAR ARCHIVO IMPORTAR
    // ==========================================================================================
    $("#fuArchivo").change(function () {
        var vcNomArhivo = $("#fuArchivo").val();
        var inPosi = 0;

        for (i = 0; i < vcNomArhivo.length; i++) {
            var vcCaracter = vcNomArhivo.charAt(i);

            if (vcCaracter.charCodeAt(0) == 92) {
                inPosi = i;
            }

        }

        var vcEvaluar = vcNomArhivo.substring(inPosi + 1, vcNomArhivo.length);
        vcEvaluar = vcEvaluar.replace(".xlsx", "");

        var flagValida = false;
        //alert(vcEvaluar.substring(0, 5 + 5));
        if (vcEvaluar.substring(0, 5 + 6) == 'BolsaLinea_') {
            flagValida = true;
        }
        if (vcEvaluar.substring(0, 5 + 12) == 'BolsaCentroCosto_') {
            flagValida = true;
        }
        if (vcEvaluar.substring(0, 5 + 5) == 'BolsaArea_') {
            flagValida = true;
        }
        if (vcEvaluar.substring(0, 5 + 6) == 'BolsaNivel_') {
            flagValida = true;
        }
        if (vcEvaluar.substring(0, 5 + 14) == 'BolsaGrupoEmpleado_') {
            flagValida = true;
        }

        if (!flagValida) {
            $("#lblMensaje").html("Formato de Archivo Incorrecto ...");
            //$("#lblMensaje").html("Nombre de Archivo incorrecto ...");
            $("#btnCargarCli").hide();
        } else {
            $("#lblMensaje").html("");
            $("#btnCargarCli").show();
        }
    });

});

//function otro() { }

//        function Cargar_Archivo() {
//            window.parent.$("#dvCargando").show();
//            $("#btnCargar").click();
//        } 