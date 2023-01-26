var altoPagina = 0;
var cPeriodo;
var oCultura = null;
$(document).on("ready", function () {
    oCultura = window.parent.oCulturaUsuario;

    kendo.culture("es-PE");
    altoPagina = $(window).height();
    var AltoGrilla = 0;
    AltoGrilla = altoPagina - 320;
    if (AltoGrilla <= 0) {
        AltoGrilla = 250;
    }

    Inicio();

    $(".bordeui").removeClass("ui-corner-all");
    $(".bordeui").css({
        "border": "none",
        "padding": "2px 0px 2px 0px"
    });

    var date = new Date();
    var fechainicio = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var fechafin = new Date(date.getFullYear(), date.getMonth() + 6, 0);
    $("#txtFechaInicio").keypress(ValidarFecha);

    cPeriodo = $("#txtFechaInicio").kendoDatePicker({
        culture: "es-PE",
        start: "year",
        depth: "year",
        value: fechainicio,
        format: "MM/yyyy",
        footer: false
    }).data("kendoDatePicker");

    cPeriodo = $("#txtFechaFin").kendoDatePicker({
        culture: "es-PE",
        start: "year",
        depth: "year",
        value: fechafin,
        format: "MM/yyyy",
        footer: false
    }).data("kendoDatePicker");

    function Inicio() {
        $("#tbExportar").hide();
        $("#btnPdf").hide();
    }

    $("#crono").kendoGrid({
        dataSource: {},
        groupable: false,
        sortable: true,
        navigatable: true,

        columns: [
                    { field: "InNumCuota", title: "N°", width: "20px", attributes: { style: "text-align: center;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center;"} },
                    { field: "Periodo1", hidden: true, title: "Periodo1", width: "100px", attributes: { style: "text-align: center;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center;"} },
                    { field: "VcPeriodo", title: "Periodo", width: "100px", attributes: { style: "text-align: center;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center;"} },
                    { field: "FechaSolicitud", title: "Fecha de Pago", width: "100px", attributes: { style: "text-align: center;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center;"} },
                    { field: "DcSaldoInicial", hidden: true, title: "Saldo", width: "100px", attributes: { style: "text-align: right;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center;"} },
                    { field: "DcAmortizacion", hidden: true, title: "Amortización", width: "100px", attributes: { style: "text-align: right;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center;"} },
                    { field: "DcInteres", hidden: true, title: "Interés", width: "100px", attributes: { style: "text-align: right;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center;"} },
                    { field: "DcMontoCuota", hidden: false, title: "Monto Periodo (" + oCultura.Moneda.vcSimMon + ")", width: "200px", attributes: { style: "text-align: right;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center;"} }
                 ],
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
        detailInit: CargarSubgrilla,
        height: AltoGrilla
    });


    $(window).resize(function () {
        resizeGridKendo();
    });

    resizeGridKendo();

    $("#btnCerrar").click(function () {
        var Nametab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        var Accord = window.parent.$("#" + Nametab);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    });

    $("#btnPdf").click(function (e) {

        var admin = $("#hdfAdmin").val();

        if (admin == 0) {
            CodigoEmpleado = $("#hdfEmpleado").val();
        }
        else {
            CodigoEmpleado = $("#hdfTecnicoResponsable").val();
            if (CodigoEmpleado == "") {
                $("#spMensaje").text("Debe Seleccionar un empleado antes de exportar.");
                return;
            }
        }
        var FechaInicio = $("#txtFechaInicio").val();
        var FechaFin = $("#txtFechaFin").val();


        if (FechaInicio == "") {
            $("#spMensaje").text("Ingrese una fecha de inicio");
            return;
        }
        else {
            if (FechaInicio.length != 7 || FechaInicio.indexOf("/") != 2 || FechaInicio.split("/").length != 2) {
                $("#spMensaje").text("Ingrese un formato de fecha válido, mm/yyyy");
                return;
            }
        }

        if (FechaFin == "") {
            $("#spMensaje").text("Ingrese una fecha de fin");
            return;
        }
        else {
            if (FechaFin.length != 7 || FechaFin.indexOf("/") != 2 || FechaFin.split("/").length != 2) {
                $("#spMensaje").text("Ingrese un formato de fecha válido, mm/yyyy");
                return;
            }
        }

        $.ajax({
            type: "POST",
            url: "CronogramaPagos.aspx/ExportarPdf",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.d.length > 0) {
                    var vIdDominio = $("#hdfIdDominio").val();
                    var file = data.d;
                    window.location.href = "../Common/Controladores/DescargarArchivo.ashx?archivo=Temporal/Cronogramas/" + file;
                    //window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=Temporal/Cronogramas/" + RutaFinal + "&Dominio=" + vIdDominio + "&RutaNuevaDescarga=" + RutaPdf);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    $("#btnBuscar").click(function () {
        var IdEmpleado = $("#hdfEmpleado").val();
        $("#spMensaje").text("");


        if (IdEmpleado == "" || $("#bpTecnicoResponsable_txtValorBusqueda").val() == "") {
            $("#spMensaje").text("Seleccione un empleado");
            return;
        }

        var FechaInicio = $("#txtFechaInicio").val();
        var FechaFin = $("#txtFechaFin").val();


        if (FechaInicio == "") {
            $("#spMensaje").text("Ingrese una fecha de inicio.");

            return;
        }
        else {
            if (FechaInicio.length != 7 || FechaInicio.indexOf("/") != 2 || FechaInicio.split("/").length != 2) {
                $("#spMensaje").text("Ingrese un formato de fecha válido, mm/yyyy");
                return;
            }
        }

        if (FechaFin == "") {
            $("#spMensaje").text("Ingrese una fecha de fin");
            return;
        }
        else {
            if (FechaFin.length != 7 || FechaFin.indexOf("/") != 2 || FechaFin.split("/").length != 2) {
                $("#spMensaje").text("Ingrese un formato de fecha válido, mm/yyyy");
                return;
            }
        }
        var d = new Date();
        var fechaInicio = new Date(parseInt(FechaInicio.substr(3, 4)), parseInt(FechaInicio.substr(0, 2)) - 1, d.getDate());
        var fechaFin = new Date(parseInt(FechaFin.substr(3, 4)), parseInt(FechaFin.substr(0, 2)) - 1, d.getDate());
        if (fechaInicio > fechaFin) {
            $("#spMensaje").text("Periodo de Inicio no debe ser mayor al periodo Fin");
            return;
        }
        load(IdEmpleado);

    });

    $("#btnBuscar").click();

});


function load(_IdEmpleado) {

    $("#crono").data("kendoGrid").dataSource.data([]);

    if ($("#txtFechaInicio").val() == "") {
        return;
    }

    if ($("#txtFechaFin").val() == "") {
        return;
    }

    $.ajax({
        type: "POST",
        url: "CronogramaPagos.aspx/ListarCronogramaPagos",
        data: JSON.stringify({
            'IdEmpleado': _IdEmpleado,
            "fechaInicio": $("#txtFechaInicio").val(),
            "fechaFin": $("#txtFechaFin").val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d.length > 0) {
                var AltoGrilla = 0;
                AltoGrilla = altoPagina - 320;
                if (AltoGrilla <= 0) {
                    AltoGrilla = 250;
                }

                var dataSource = new kendo.data.DataSource({
                    data: data.d,
                    pageSize: PageSize(data)
                });


                var gridele = $("#crono").data("kendoGrid");
                gridele.setDataSource(dataSource);

                var DeutaTotal = 0;
                var NumCuotas = data.d.length;
                var Moneda = oCultura.Moneda.vcNomLar + " (" + oCultura.Moneda.vcSimMon + ")";
                var i;
                for (i = 0; i < data.d.length; i++) {
                    if (data.d[i].DcMontoCuota.indexOf(",") >= 0) {
                        DeutaTotal = DeutaTotal + parseFloat(data.d[i].DcMontoCuota.replace(',', ''));
                    }
                    else {
                        DeutaTotal = DeutaTotal + parseFloat(data.d[i].DcMontoCuota);
                    }
                }
                $("#lblMoneda").text(Moneda);
                $("#lblNumCuotas").text(NumCuotas);
                //$("#lblDeuda").text(kendo.toString(DeutaTotal, "c" + window.parent.oCulturaUsuario.dcNumDec.toString()));
                $("#lblDeuda").text(kendo.toString(formatNumberDecimal.newo(parseFloat(DeutaTotal).toFixed(2), oCultura.Moneda.vcSimMon + " ")));
                var FechaSolicitud = data.d[0].FechaSolicitud;
                var DesSolicitud = data.d[0].DesSolicitud;
                $("#lblFechaSol").text(FechaSolicitud);
                $("#lblDesSol").text(DesSolicitud);

                //descomentar para mostrar
                //$("#tbExportar").show();
                //$("#btnPdf").show();

                resizeGridKendo();

            }
            else {
                var admin = $("#hdfAdmin").val();
                if (admin == 0) {
                    $("#spMensaje").text("Usted no tiene un cronograma de  pagos programado");
                }
                else { $("#spMensaje").text("El empleado no tiene un cronograma de  pagos programado"); }

                $("#tbExportar").hide();
                $("#btnPdf").hide();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}


function resizeGridKendo() {

    var alto;
    alto = $(window).height() - 300;
    
    if (alto > 140 && alto < 330)
    { alto = alto - 10; }
    if (alto >= 330)
    { alto = 320; }
    else if (alto < 150)
    { alto = 140; }


    var gridElement = $("#crono");
    var dataArea = gridElement.find(".k-grid-content");
    var newHeight = alto; //gridElement.parent().innerHeight() - 2;
    var diff = gridElement.innerHeight() - dataArea.innerHeight();
    gridElement.height(newHeight);
    dataArea.height(newHeight - diff);

    var TamanioPagina = Math.floor(alto / 37);

    var grilla = $("#crono").data("kendoGrid");
    var data = grilla.dataSource.data();

    var registros = data.length;

    if (registros <= 5) {
        TamanioPagina = 5;
    }
    else if (registros <= 10) {
        TamanioPagina = 10;
    }
    else {
        TamanioPagina = 20;
    }
}

function CargarSubgrilla(e) {

    var IdEmpleado = $("#hdfEmpleado").val();
    $.ajax({
        type: "POST",
        url: "CronogramaPagos.aspx/ListarCronogramaPagosDetalle",
        data: JSON.stringify({
            'Periodo': e.data.Periodo1,
            'IdEmpleado': IdEmpleado
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("<div/>").appendTo(e.detailCell).kendoGrid({
                dataSource: data.d,
                columns: [
                    { field: "DesSolicitud", title: "Descripción", width: "250px", headerAttributes: { "class": "table-header-cell", style: "text-align: center;" } },
                    { field: "Imei", title: "IMEI", width: "80px", headerAttributes: { "class": "table-header-cell", style: "text-align: center;" } },
                    { field: "DcAmortizacion", hidden: true, title: "Amortización", width: "80px", attributes: { style: "text-align: right;" } },
                    { field: "DcInteres", hidden: true, title: "Interés", width: "80px", attributes: { style: "text-align: right;" } },
                    { field: "DcMontoCuota", title: "Monto Cuota", width: "80px", attributes: { style: "text-align: right;" }, headerAttributes: { "class": "table-header-cell", style: "text-align: center;" } }
                ],
                height: 150
            });
        },

        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}


function PageSize(data) {

    var registros = data.d.length;

    if (registros <= 5) {
        TamanioPagina = 5;
    }
    else if (registros <= 10) {
        TamanioPagina = 10;
    }
    else {
        TamanioPagina = 20;
    }

    return TamanioPagina;

}