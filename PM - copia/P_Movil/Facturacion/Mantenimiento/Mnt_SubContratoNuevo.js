var indiceTab = window.parent.tab.tabs("option", "selected");
$(document).on('ready', function () {

    $("#TextBox1").hide();
    $("#txtDiaCorte").removeClass("ui-corner-all");
    $("#txtDiaCorte").css("padding", "0px");
    $("#txtDiaCorte").css({ "border": "none" });

    $("#txtDiaPago").removeClass("ui-corner-all");
    $("#txtDiaPago").css("padding", "0px");
    $("#txtDiaPago").css({ "border": "none" });
    $("#txtDiaCorte").kendoNumericTextBox({
        format: "{0:n0}",
        min: 1,
        max: 28,
        step: 1
    });

    $("#txtDiaPago").kendoNumericTextBox({
        format: "{0:n0}",
        min: 1,
        max: 30,
        step: 1
    });


    Inicio();
    function Inicio() {
        kendo.culture("es-PE");


        $("#txtFechaInicio").removeClass("ui-corner-all");
        $("#txtFechaInicio").css("padding", "0px");
        $("#txtFechaInicio").css({ "border": "none" });

        $("#txtFechaFin").removeClass("ui-corner-all");
        $("#txtFechaFin").css("padding", "0px");
        $("#txtFechaFin").css({ "border": "none" });

        var Nuevo = $("#hdfCodigo").val();
        var Estado = $("#hdfEstado").val();
        var DiaCorte = $("#txtDiaCorte").data("kendoNumericTextBox");
        var DiaPago = $("#txtDiaPago").data("kendoNumericTextBox");

        if ($("#hdfEstado").val() == "1") {
            $("#btnGuardar").button("option", "disabled", true);
        }

        if (Estado == 1) {
            $("#txtEmpleado").attr("disabled", true);
            $("#txtDescripcion").attr("disabled", true);
            DiaCorte.enable(false);
            DiaPago.enable(false);
            $("#spMensaje").text("No se puede modificar porque ya existe por lo menos un cronograma de pago generado.");
        }
        else {
            $("#spMensaje").text("");
        }
    }

    $("#btnGuardar").click(function () {

        var _codEmpleado = $("#hdfTecnicoResponsable").val();
        var _diaCorte = $("#txtDiaCorte").data("kendoNumericTextBox");
        var _diaPago = $("#txtDiaPago").data("kendoNumericTextBox");
        var _estado = "0";

        if (_codEmpleado == "") {
            alerta('Ingrese el empleado');
            $("#txtEmpleado").focus();
            return;
        }
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


        $.ajax({
            type: "post",
            url: "Mnt_SubContratoNuevo.aspx/Guardar",
            data: JSON.stringify({
                "IdSubContrato": $("#hdfCodigo").val(),
                "IdEmpleado": _codEmpleado,
                "diaCorte": _diaCorte.value(),
                "diaPago": _diaPago.value(),
                "estado": _estado,
                "inTipOri": $("#hdfinTipOri").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);

                if (data.d == "Se guardo correctamente") {
                    window.parent.ActualizarGrilla();
                    $("#spMensaje").text("");
                    Mensaje("<br/><h1>" + data.d + "</h1><br/>", document, CerroMensaje);
                }
                else {
                    alerta(data.d);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }


        });


    });

    function CerroMensaje() {

        if ($("#hdfCodigo").val() == "") {

        }
        else {
            var delay = 1000; //1 seconds
            setTimeout(function () {
                window.parent.tab.tabs("remove", indiceTab);
            }, delay);
        }
    }
    //    if ($("#txtEmpleado").length > 0) {

    //        $("#txtEmpleado").autocomplete({
    //            minLength: 0,
    //            source: function (request, response) {
    //                $.ajax({
    //                    type: "POST",

    //                    url: raiz("Common/WebService/General.asmx/ListarEmpleado"),
    //                    data: "{'maxFilas': '" + 200 + "'," +
    //                               "'vcNomEmp': '" + $("#txtEmpleado").val().replace(/'/g, "&#39").replace(/"/g, "&#34") + "'," +
    //                               "'incodGrup': '-1'," +
    //                               "'idCliente': '" + window.parent.parent.parent.idCliente + "'}",
    //                    contentType: "application/json; charset=utf-8",
    //                    dataType: "json",
    //                    success: function (result) {
    //                        response($.map(result.d, function (item) {
    //                            return {
    //                                label: item.vcNom,
    //                                vcCodEmp: item.P_vcCod,
    //                                category: item.Grupo.vcNom
    //                            }
    //                        }));
    //                    },
    //                    error: function (xhr, err, thrErr) {
    //                        MostrarErrorAjax(xhr, err, thrErr);
    //                    }
    //                });
    //            },
    //            focus: function (event, ui) {
    //                $("#txtEmpleado").val(ui.item.label);
    //                return false;
    //            },
    //            select: function (event, ui) {
    //                Selecciono = true;
    //                $("#txtEmpleado").val(ui.item.vcCodEmp + " - " + ui.item.label);
    //                $("#hdfEmpleado").val(ui.item.vcCodEmp);
    //                return false;
    //            },
    //            change: function (event, ui) {
    //                if (!Selecciono) {
    //                    $("#hdfEmpleado").val("");
    //                }
    //                return false;
    //            },
    //            open: function (event, ui) {
    //                Selecciono = false;
    //                return false;
    //            }
    //        })
    //            .data("autocomplete")._renderItem = function (ul, item) {
    //                return $("<li></li>")
    //			        .data("item.autocomplete", item)
    //			        .append("<a>" + item.vcCodEmp + "=" + item.label + "</a>")
    //			        .appendTo(ul);
    //            };
    //    }

    $("#btnCerrar").click(function (event) {
        window.parent.tab.tabs("remove", indiceTab);
    });

});

function fnMostrarDatos(valor) {
    $("#hdfTecnicoResponsable").val(valor);
}