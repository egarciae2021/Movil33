$(function () {

    //$("#ifReporte").attr("src", "../Adm_Reporte.aspx?vcTab=" + $("#hdfvcTab").val() + "&inCod=" + $("#hdfinCod").val() + "&inTip=" + $("#hdfinTip").val() + "&inTipOri=" + $("#hdfinTipOri").val() + "&vcTipRep=1");

    $(".txtFecha").datepicker({
        changeMonth: true,
        changeYear: true
    });
    $("#imgBorrarFechaInicio").click(function () {
        $("#txtFechaInicio").val("");
    });
    $("#imgBorrarFechaFin").click(function () {
        $("#txtFechaFin").val("");
    });

    $("#btnBuscar").click(function () {
        BuscarGrilla();
    });

    $("#txtFechaInicio,#txtFechaFin").change(function () {
        //BuscarGrilla();
    });
    $("#txtEmpleado").keyup(function () {
        //BuscarGrilla();
    });

    $("#txtEmpleado").focusout(function () {
        $.ajax({
            type: "POST",
            url: "../../../Common/WebService/General.asmx/ListarEmpleado",
            data: "{'maxFilas': '" + 200 + "'," +
                           "'vcNomEmp': '" + $("#txtEmpleado").val().replace(/'/g, "&#39") + "'," +
                           "'incodGrup': '-1'," +
                           "'idCliente': '" + window.parent.parent.idCliente + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if ($(result.d).length == 1) {
                    $("#hdfCodEmpleado").val(result.d[0].P_vcCod);
                    Selecciono = true;
                    //BuscarGrilla();
                }
                else {
                    $("#hdfCodEmpleado").val("");
                    Selecciono = false;
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    $("#txtEmpleado").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../../Common/WebService/General.asmx/ListarEmpleado",
                data: "{'maxFilas': '" + 200 + "'," +
                               "'vcNomEmp': '" + $("#txtEmpleado").val().replace(/'/g, "&#39") + "'," +
                               "'incodGrup': '-1'," +
                               "'idCliente': '" + window.parent.parent.idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.vcNom,
                            vcCodEmp: item.P_vcCod,
                            category: item.Grupo.vcNom,
                            inCodGru: item.Grupo.P_inCod
                        };
                    }));
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtEmpleado").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtEmpleado").val(ui.item.label);
            $("#hdfCodEmpleado").val(ui.item.vcCodEmp);
            //BuscarGrilla();
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodEmpleado").val("");
            }
            return false;
        },
        open: function (event, ui) {
            Selecciono = false;
            return false;
        }
    })
    .data("autocomplete")._renderItem = function (ul, item) {
        return $("<li></li>")
		    .data("item.autocomplete", item)
		    .append("<a>" + item.vcCodEmp + "=" + item.label + "</a>")
		    .appendTo(ul);
    };

    function BuscarGrilla() {
        $("#ifReporte").attr("src", "../Adm_Reporte.aspx?vcTab=" + $("#hdfvcTab").val() + "&inCod=" + $("#hdfinCod").val() + "&inTip=" + $("#hdfinTip").val() + "&inTipOri=" + $("#hdfinTipOri").val() + "&daFecIni=" + $("#txtFechaInicio").val() + "&daFecFin=" + $("#txtFechaFin").val() + "&vcLin=" + $("#txtLinea").val() + "&vcIMEI=" + $("#txtIMEI").val() + "&vcMod=" + $("#txtModelo").val() + "&vcEmp=" + $("#txtEmpleado").val() + "&vcEst=" + $("#txtEstado").val() + "&vcTip=" + $("#txtTipo").val() + "&vcTipRep=1");
    }
});
