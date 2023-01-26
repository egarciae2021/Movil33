$(document).on('ready', function () {
    kendo.culture("es-PE");
    $("select").removeClass("ui-corner-all");
    $("select").css("padding", "0px");
    $("select").css({ "border": "none" });

    //$("input:text").addClass("ui-widget-content ui-corner-all");
    $("input:text").removeClass("ui-corner-all");
    $("input:text").css("padding", "0px");
    $("input:text").css({ "border": "none" });

    $("#txtDiaCorte").kendoNumericTextBox({
        format: "{0:n0}",
        min: 1,
        max: 28,
        step: 1
    });

    // Inicializando Minuto
    $("#txtDiaPago").kendoNumericTextBox({
        //format: "p0",
        //decimals: 0,
        format: "{0:n0}",
        min: 1,
        max: 30,
        step: 1
    });

    Inicio();

    function Inicio() {

        var DiaCorte = $("#txtDiaCorte").data("kendoNumericTextBox");
        var DiaPago = $("#txtDiaPago").data("kendoNumericTextBox");

        if ($("#hdfEstado").val() == "1") {
            $("#btnGuardar").button("option", "disabled", true);
            DiaCorte.enable(false);
            DiaPago.enable(false);
            //$("#spMensaje").text("No se puede modificar. Si ya existen cronogramas de pago.");
            $("#spMensaje").text("Esta configuración no puede ser modificada porque ya existen cronogramas.");
        }
        else {
            $("#spMensaje").text("");
        }


    }



    $("#btnGuardar").click(function () {
        var _diaCorte = $("#txtDiaCorte").data("kendoNumericTextBox");
        var _diaPago = $("#txtDiaPago").data("kendoNumericTextBox");

        //        var _estado = "1";

        //        if ($('#chkEstado').is(":checked")) {
        //            _estado = "1";
        //        }
        //        else {
        //            _estado = "0";
        //        }
        if (_diaCorte.value() == null) {
            alerta('Ingrese el día de corte');
            $("#txtDiaCorte").focus();
            return;
        }

        if (_diaPago.value() == null) {
            alerta('Ingrese el día de pago');
            $("#txtDiaCorte").focus();
            return;
        }

        if (_diaCorte.value() == _diaPago.value()) {
            alerta('El día de corte debe ser diferente al día de pago');
            $("#txtDiaCorte").focus();
            return;
        }
        //        if ($("#hdfEstado").val() == 1 && _estado == 0) {
        //            if (!confirm('Esta apunto de cambiar el estado a inactivo, esta accion podria tener efectos criticos. Desea continuar ?')) {
        //                return;
        //            }
        //        }
        $.ajax({
            type: "post",
            url: "Fac_Conf_Contrato.aspx/Guardar",
            data: JSON.stringify({
                "diaCorte": _diaCorte.value(),
                "diaPago": _diaPago.value(),
                //                "estado": _estado,
                "inTipOri": $("#hdfinTipOri").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                Mensaje("<br/><h1>Se guardó Correctamente.</h1><br/>", document);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });




    $("#btnCerrar").click(function (event) {
        var Nametab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        var Accord = window.parent.$("#" + Nametab);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    });

});