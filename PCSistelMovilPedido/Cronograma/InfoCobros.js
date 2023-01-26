var oCultura = null;
$(document).ready(function () {
    oCultura = window.parent.oCulturaUsuario;

    $(".bordeui").removeClass("ui-corner-all");
    $(".bordeui").css({
        "border": "none",
        "padding": "2px 0px 2px 0px"
    });

    kendo.culture("es-PE");
    function startChange() {
        var startDate = start.value();

        if (startDate) {
            startDate = new Date(startDate);
            startDate.setDate(startDate.getDate() + 1);
            end.min(startDate);


        }
    }

    function endChange() {
        var endDate = end.value();

        if (endDate) {
            endDate = new Date(endDate);
            endDate.setDate(endDate.getDate() - 1);
            start.max(endDate);

        }
    }

    var start = $("#txtFechaInicio").kendoDatePicker({
        change: startChange
    }).data("kendoDatePicker");

    var end = $("#txtFechaFin").kendoDatePicker({
        change: endChange
    }).data("kendoDatePicker");

    start.max(end.value());

    end.min(start.value());

    $("#gridPagos").kendoGrid({
        dataSource: {},
        groupable: false,
        sortable: true,
        navigatable: true,
        height: 350,
        width: 800,
        selectable: "single",
        reorderable: false,
        resizable: true,
        pageable: {
            refresh: false,
            pageSizes: true,
            messages: {
                itemsPerPage: "ítems por página",
                display: "{0}-{1} de {2} ítems",
                empty: "",
                first: "Ir a primera página",
                last: "Ir a última página",
                next: "Ir a página siguiente",
                previous: "Ir a página anterior"
            }
        },
        columns: [
                {
                    field: "OEmpleado.P_vcCod",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: center;"
                    },
                    width: "60px",
                    title: "Código"
                },
                {
                    field: "OEmpleado.vcNom",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: left;"
                    },
                    width: "200px",
                    title: "Empleado"
                },
                {
                    field: "VcFecha",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: center;"
                    },
                    width: "60px",
                    title: "Fecha"
                },
                {
                    field: "VcConceptoPago",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: left;"
                    },
                    width: "200px",
                    title: "Concepto Pago"
                },
                {
                    field: "VcPeriodo",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: center;"
                    },
                    width: "50px",
                    title: "Periodo"
                },
                {
                    field: "DcMontoPagado",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: right;"
                    },
                    width: "60px",
                    title: "Monto (" + oCultura.Moneda.vcSimMon + ")"
                }]

    });

    $("#btnBuscar").click(function () {
        var _MontoMayora = '';
        var _MontoMenora = '';

        var _fechaInicio = $("#txtFechaInicio").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
        var _fechaFin = $("#txtFechaFin").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");

        if (_fechaInicio.length < 10) {
            $("#spMensaje").text("La fecha de inicio no tiene el formato correcto dd/MM/YYYY .");
            return;
        }
        if (_fechaFin.length < 10) {
            $("#spMensaje").text("La fecha de fin no tiene el formato correcto dd/MM/YYYY .");
            return;
        }
        var dI = _fechaInicio.substr(0, 2);
        var mI = _fechaInicio.substr(3, 2);
        var yI = _fechaInicio.substr(6, 4);
        if (!checkdate(mI, dI, yI)) {
            $("#spMensaje").text("La fecha de inicio es inválida.");
            return;
        }
        var dF = _fechaFin.substr(0, 2);
        var mF = _fechaFin.substr(3, 2);
        var yF = _fechaFin.substr(6, 4);
        if (!checkdate(mF, dF, yF)) {
            $("#spMensaje").text("La fecha de fin es inválida.");
            return;
        }
        else {
            $("#spMensaje").text("");
        }

        var fecIni = new Date(yI + "-" + mI + '-' + dI);

        var fecFin = new Date(yF + "-" + mF + '-' + dF);

        if (fecIni > fecFin) {
            $("#spMensaje").text("La fecha inicial debe ser menor o igual a la fecha final.");
            return;
        }
        else {
            $("#spMensaje").text("");
        }

        var diff = fecFin - fecIni;
        diff = Math.round(diff / 1000 / 60 / 60 / 24);

        if (diff > 730) {
            $("#spMensaje").text("La diferencia entre la fecha final y la fecha de inicio, no puede ser mayor a 24 meses.");
            return;
        }
        else {
            $("#spMensaje").text("");
        }

        $.ajax({
            type: "POST",
            url: "InfoCobros.aspx/GetListaCobros",
            data: JSON.stringify({
                'FechaInicio': _fechaInicio,
                'FechaFin': _fechaFin,
                'valor': $("#hdfEmpleado").val(),
                'montoMenora': _MontoMenora,
                'montoMayora': _MontoMayora,
                "inTipOri": 1
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.d.length > 0) {
                    var dataSource = new kendo.data.DataSource({
                        data: data.d,
                        pageSize: 10
                    });
                    var grilla = $("#gridPagos").data("kendoGrid");
                    grilla.setDataSource(dataSource);
                    //$("#tbExportar").show();
                    $("#spMensaje").text("");
                }
                else {
                    dataSource = new kendo.data.DataSource({
                        data: {},
                        pageSize: 10
                    });
                    grilla = $("#gridPagos").data("kendoGrid");
                    grilla.setDataSource(dataSource);
                    $("#tbExportar").hide();
                    $("#spMensaje").text("No Existen pagos que cumplan estos parámetros de búsqueda.");
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    Inicio();
});

function Inicio() {
    $("#tbExportar").hide();
    $("#btnBuscar").click();    
}

function checkdate(m, d, y) {
    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0))
    .getDate();
}