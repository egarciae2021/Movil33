function CerrarCarga() {
    window.parent.$("#dvCargando").hide();
}
function ExportarArchivo() {
    location.href = $("#hdfArchivo").val();
}
$(function () {
    $("#btnCargar").hide();
    $("#btnEnvio").hide();
    var extArray = new Array(".xls", ".xlsx");
    $(".txtFecha").datepicker({
        changeMonth: true,
        changeYear: true
    });

    $(".txtFecha").keypress(ValidarFecha);

    $(".btnNormal").button();

    function ValidaExtension() {
        var Archivo = $("#fuArchivo").val();
        var ext = Archivo.slice(Archivo.lastIndexOf(".")).toLowerCase();
        if (Archivo == "") {
            return true;
        }
        alert($('#hdfArchivo').val());
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

    $(".txtFecha").bind('paste', function (e) {
        return false;
    });

    $("#rlstDatosReporte").change(function () {
        if ($("input[name='rlstDatosReporte']:checked").val() == "1") {
            $("#dvDias").hide();
        }
        else if ($("input[name='rlstDatosReporte']:checked").val() == "2") {
            $("#dvDias").show();
        }
    });
    $("#rlstTipoDeEnvio").change(function () {
        if ($("input[name='rlstTipoDeEnvio']:checked").val() == "1") {
            $("#dvCorreo").hide();
        }
        else if ($("input[name='rlstTipoDeEnvio']:checked").val() == "2") {
            $("#dvCorreo").show();
        }
        else if ($("input[name='rlstTipoDeEnvio']:checked").val() == "3") {
            $("#dvCorreo").show();
        }
    });

    function ValidarEnvio() {
        if ($("input[name='rlstDatosReporte']:checked").val() == "2") {
            if ($("#txtDiaInicial").val() == "") {
                alerta("Ingrese la fecha de inicio de cambios de distribución");
                $("#txtDiaInicial").focus();
                return false;
            }
            if ($("#txtDiaFinal").val() == "") {
                alerta("Ingrese la fecha final de cambios de distribución");
                $("#txtDiaFinal").focus();
                return false;
            }
        }
        if ($("input[name='rlstTipoDeEnvio']:checked").val() == "2" || $("input[name='rlstTipoDeEnvio']:checked").val() == "3") {
            if ($("#txtAsunto").val() == "") {
                alerta("Ingrese un asunto para el envío del correo");
                $("#txtAsunto").focus();
                return false;
            }
            if ($("#txtCorreo").val() == "") {
                alerta("Ingrese por lo menos un correo");
                $("#txtCorreo").focus();
                return false;
            }
            if (!validarEmail2($("#txtCorreo").val())) {
                alerta("Ingrese un correo válido");
                $('#txtCorreo').focus();
                return;
            }
        }
        return true;
    }

    $("#btnEnvioCli").click(function () {
        if (ValidarEnvio()) {
            window.parent.$("#dvCargando").show();
            window.parent.$("#dvExportacionImportacion").dialog("close");
            $("#btnEnvio").click();
        }
    });
});   

