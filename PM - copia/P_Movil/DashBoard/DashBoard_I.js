/*global _comma_separated_list_of_variables_*/
/// <reference path="../../Common/Scripts/jquery-2.0.0-vsdoc.js" />
var myChartPie;
var myChartPieProceso;
var myChartUmbral;

var verProceso = false;
var Nametab;
var Accord;

$(function () {
    //Nametab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
    //Accord = window.parent.$("#" + Nametab);

    FusionCharts.setCurrentRenderer('javascript');
    fnDiseno();
    fnEventos();
    fnDibujarCharts();

    //try {
    //    window.parent.fnCerrarCargaInicial();
    //}
    //catch (e) {
    //    //some err
    //}

    $("#pnlCuerpo").height(fnCalcularAltoAprobacion() + 25);

    obtenerUmbralesAprobados();
    obtenerUmbralesPorAprobar();
    ObtenerUmbrales_deProceso();

    fnMostrarEtiquetasSinDatos();

    $("#ttgInfoEstado_dvToolTip").css({ "margin-top": "-14px" });
    $("#ttginfoHistorico_dvToolTip").css({ "margin-top": "-14px" });
});

function CerroMensaje() {
    BloquearPagina(false);
    //Accord.tabs("remove", Accord.tabs("option", "selected"));
}


function fnDiseno() {
    //    if ($("#divTituloAprobacion").css('display') == "none") {
    //        verProceso = true;
    //        fnMostrarPnlProceso();
    ////        $("#divTituloAprobacion").removeClass("esPrimerTap");
    ////        $("#divTituloProceso").addClass("esPrimerTap");
    //    }

    $('.Tap').hover(function () {
        $(this).addClass("ui-state-active-TAB");
    }, function () {
        if ($(this).hasClass("TapNoSelecionado")) {
            $(this).removeClass("ui-state-active-TAB");
        }
    });

    $('.CuerpoTap').hover(function () {
        if (!$(this).hasClass("esPrimerTap")) {
            $(this).animate({ marginLeft: '10px' }, 200);
        }
    }, function () {
        if (!$(this).hasClass("esPrimerTap")) {
            $(this).animate({ marginLeft: '8px' }, 200);
        }
    });

    switch ($("#hdfTapsMostrar").val()) {
        case "1":
            setTimeout(function () {
                $("#pnlAprobacion").removeClass("esNoVisible");
                $("#pnlProceso").addClass("esNoVisible");
                $("#pnlAprobacion").fadeIn(300);
                $("#pnlCuerpo").height(fnCalcularAltoAprobacion() + 5);
            }, 2000);
            break;
        case "2":
            $("#divTituloAprobacion").hide();
            $("#TapProceso").addClass("ui-state-active-TAB");

            $("#pnlProceso").removeClass("esNoVisible");
            $("#pnlAprobacion").addClass("esNoVisible");
            //$("#pnlCuerpo").height(fnCalcularAltoProceso() + 3);
            if (!verProceso) {
                verProceso = true;
                fnMostrarPnlProceso();
            }

            setTimeout(function () {
                $("#pnlCuerpo").height(fnCalcularAltoProceso() + 3);
            }, 2000);
            break;
        case "3":
            $("#divTituloProceso").hide();
            $("#pnlProceso").addClass("esNoVisible");
            break;
        case "":
            $("#General").hide();
            window.scrollTo(0, 0);
            Mensaje("<br/><h1>No puede acceder a esta página debido a que usted no es un responsable de aprobación ni especialista de solicitudes.</h1><br/>", document, CerroMensaje);
    }

}

function fnEventos() {

    $('.Tap').click(function () {
        $("#pnlProceso").addClass("esNoVisible");
        $('.Tap').removeClass("ui-state-active-TAB");
        $('.Tap').addClass("TapNoSelecionado");
        $(this).removeClass("TapNoSelecionado");
        $(this).addClass("ui-state-active-TAB");

        switch ($(this).attr("id")) {
            case "TapAprobacion":

                if ($("#pnlAprobacion").hasClass("esNoVisible")) {
                    $("#pnlAprobacion").removeClass("esNoVisible");
                    $("#pnlProceso").addClass("esNoVisible");
                    $("#pnlAprobacion").fadeIn(300);
                    $("#pnlCuerpo").height(fnCalcularAltoAprobacion() + 5);
                }

                break;
            case "TapProceso":
                if ($("#pnlProceso").hasClass("esNoVisible")) {
                    $("#pnlProceso").removeClass("esNoVisible");
                    $("#pnlAprobacion").addClass("esNoVisible");
                    $("#pnlCuerpo").height(fnCalcularAltoProceso() + 3);
                    if (!verProceso) {
                        verProceso = true;
                        fnMostrarPnlProceso();
                    }

                }
                break;
            default:

        }
    });


    $("#ddlPeriodo").change(function () {

        //fnActualizarPie(); 
        window.location.href = 'DashBoard_I.aspx?pe=' + $(this).val();

    });
    $("#ddlPeriodoProceso").change(function () {
        // fnActualizarPieProceso(); 
        window.location.href = 'DashBoard_I.aspx?pe=' + $(this).val();
    });
    $("#ddlTipoUmbral").change(function () { fnActualizarUmbrales(); });
}

function fnDibujarCharts() {
    var re = JSON.parse(Solicitudes_Pie);
    if (re.data[0].value == "") {
        $("#contentChartPie").append('<div style="font-size:medium; color:Gray; ">No hay datos para mostrar.</div> ');
    }
    else {
        for (var i in re.data) {
            re.data[i].alpha = "25";
        }
        myChartPie = new FusionCharts("../../Common/Scripts/FusionCharts/doughnut2d.swf", "chartSolicitudesPie", "400", "190", "0");
        myChartPie.setJSONData(re);
        myChartPie.setTransparent(true);
        myChartPie.render("contentChartPie");
    }

    myChartUmbral = new FusionCharts("../../Common/Scripts/FusionCharts/MSCombi3D.swf", "chartUmbrales", "980", "227", "0");
    myChartUmbral.setJSONData(Solicitudes_Umbrales);
    myChartUmbral.setTransparent(true);
    myChartUmbral.render("contentChartUmbral");
    $("#chartIncidenciasMeses").css('left', '30px');
}

function fnMostrarPnlProceso() {
    var re2 = JSON.parse(Solicitudes_Pie_Proceso);

    if (re2.data[0].value == "") {
        $("#contentChartPieProceso").append('<div style="font-size:medium; color:Gray; ">No hay datos para mostrar.</div> ');
    }
    else {
        for (var i in re2.data) {
            re2.data[i].alpha = "25";
        }
        myChartPieProceso = new FusionCharts("../../Common/Scripts/FusionCharts/doughnut2d.swf", "chartSolicitudesPieProceso", "400", "190", "0");
        myChartPieProceso.setJSONData(re2);
        myChartPieProceso.setTransparent(true);
        myChartPieProceso.render("contentChartPieProceso");
    }


}

function fnActualizarPie() {
    $.ajax({
        type: "POST",
        url: "DashBoard_I.aspx/ActualizarPie",
        data: "{'prPeriodo': '" + $("#ddlPeriodo").val() + "'," +
                "'prIdUsuario': '" + $("#hdfIdUsuarioLogeado").val() + "'," +
                "'vcTipSolAprLeer': '" + $("#hdfIdTipSolAprLeer").val() + "'," +
                "'vcTipSolAprResp': '" + $("#hdfIdTipSolAprResp").val() + "'," +
                "'vcCodEmp': '" + $("#hdfCodEmp").val() + "'," +
                "'vcCodIntRes': '" + $("#hdfCodIntRes").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;
            $("#contentChartPie").updateFusionCharts({ dataSource: resul, dataFormat: "json" });
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnActualizarPieProceso() {
    $.ajax({
        type: "POST",
        url: "DashBoard_I.aspx/ActualizarPieProceso",
        data: "{'prPeriodo': '" + $("#ddlPeriodoProceso").val() + "'," +
        "'prIdUsuario': '" + $("#hdfIdUsuarioLogeado").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;
            $("#contentChartPieProceso").updateFusionCharts({ dataSource: resul, dataFormat: "json" });
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnActualizarUmbrales() {
    $.ajax({
        type: "POST",
        url: "DashBoard_I.aspx/ActualizarUmbrales",
        data: "{'prTipoUmbral': '" + $("#ddlTipoUmbral").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;
            $("#contentChartUmbral").updateFusionCharts({ dataSource: resul, dataFormat: "json" });
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnCalcularAltoAprobacion() {
    //return parseInt($("#pnlPie").height()) + parseInt($("#pnlBarras").height()) + parseInt($("#pnlGridAprobacion").height()) + parseInt($("#pnlGridPeriodo").height());
    return parseInt($("#pnlPie").height()) + parseInt($("#pnlGridAprobacion").height()) + parseInt($("#pnlGridPeriodo").height()) + parseInt($("#pnlUmbralesAprobados").height());
}
function fnCalcularAltoProceso() {
    //return parseInt($("#pnlPieProceso").height()) + parseInt($("#pnlBarrasProceso").height()) + parseInt($("#pnlGridProceso").height()) + parseInt($("#pnlGridPeriodoProceso").height());
    return parseInt($("#pnlPieProceso").height()) + parseInt($("#pnlGridProceso").height()) + parseInt($("#pnlGridPeriodoProceso").height()) + parseInt($("#pnlUmbralesProceso").height());
}


function fnSetAltoCuerpoAprobacion() {
    $("#pnlCuerpo").height(fnCalcularAltoAprobacion() + 5);
}




function obtenerUmbralesAprobados() {

    $("#gridUmbralesAprobados").jqGrid({
        datatype: function () {

            $.ajax({
                type: "POST",
                url: "DashBoard_I.aspx/obtenerUmbralesAprobados",
                data: "{'inPagTam':'" + $('#gridUmbralesAprobados').getGridParam("rowNum") + "'," + //Tamaño de pagina
                       "'inPagAct':'" + $('#gridUmbralesAprobados').getGridParam("page") + "'," + //FiltroRegistro
                        "'prPeriodo': '" + $("#ddlPeriodo").val() + "'," +
                        "'vcTipSolAprLeer': '" + $("#hdfIdTipSolAprLeer").val() + "'," +
                        "'vcTipSolAprResp': '" + $("#hdfIdTipSolAprResp").val() + "'," +
                        "'vcCodIntRes': '" + $("#hdfCodIntRes").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.d.Items.length == 0) {
                        $("#dvUmbralesAprobados").html("");
                        $("#dvUmbralesAprobados").append('<div style="font-size:medium; color:Gray; height:100Px; " runat="server">No hay datos para mostrar.</div>');
                    }
                    else {
                        $("#gridUmbralesAprobados")[0].addJSONData(result.d);
                    }

                    $("#pnlCuerpo").height(fnCalcularAltoAprobacion() + 15);
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
        {
            root: "Items",
            page: "PaginaActual",
            total: "TotalPaginas",
            records: "TotalRegistros",
            repeatitems: true,
            cell: "Row",
            id: "Id"
        },
        colModel: [
                    { name: 'Id', index: 'Id', label: 'Id', hidden: true },
                    { name: 'TipoSolicitud', index: 'TipoSolicitud', label: 'Tipo de Solicitud', width: "160px" },
                    { name: 'MenorObjetivo', index: 'MenorObjetivo', label: '<img src="../../Common/Images/Semaforos/Verde_16x16.png" />', width: "80px", align: 'right' },
                    { name: 'EntreObjetivoMaximo', index: 'EntreObjetivoMaximo', label: '<img src="../../Common/Images/Semaforos/Ambar_16x16.png" />', width: "80px", align: 'right' },
                    { name: 'MayorQueMaximo', index: 'MayorQueMaximo', label: '<img src="../../Common/Images/Semaforos/Rojo_16x16.png" />', width: "80px", align: 'right' },
                    { name: 'Total', index: 'Total', label: 'Total', width: "80px", align: 'right', classes: 'colTotal' }
        ],

        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        pgtext: 'Pág: {0} de {1}',
        shrinkToFit: false,
        width: 510,
        gridview: true,
        viewrecords: true,
        emptyrecords: "No hay umbrales que mostrar",
        height: "100%",
        beforeSelectRow: function (rowid, e) {
        },
        gridComplete: function () {
            $("#pnlCuerpo").height(fnCalcularAltoAprobacion() + 25);
        }
    });



}


function obtenerUmbralesPorAprobar() {

    $("#gridUmbralesPorAprobar").jqGrid({
        datatype: function () {

            $.ajax({
                type: "POST",
                url: "DashBoard_I.aspx/ObtenerUmbralesPorAprobar",
                data: "{'inPagTam':'" + $('#gridUmbralesPorAprobar').getGridParam("rowNum") + "'," + //Tamaño de pagina
                       "'inPagAct':'" + $('#gridUmbralesPorAprobar').getGridParam("page") + "'," + //FiltroRegistro
                        "'vcTipSolAprLeer': '" + $("#hdfIdTipSolAprLeer").val() + "'," +
                        "'vcTipSolAprResp': '" + $("#hdfIdTipSolAprResp").val() + "'," +
                        "'vcCodIntRes': '" + $("#hdfCodIntRes").val() + "'," +
                        "'prPeriodo': '" + $("#ddlPeriodo").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.d.Items.length == 0) {
                        $("#dvUmbralesPorAprobar").html("");
                        $("#dvUmbralesPorAprobar").append('<div style="font-size:medium; color:Gray; height:100Px; " runat="server">No hay datos para mostrar.</div>');
                    }
                    else {
                        $("#gridUmbralesPorAprobar")[0].addJSONData(result.d);
                    }

                    $("#pnlCuerpo").height(fnCalcularAltoAprobacion() + 15);
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
        {
            root: "Items",
            page: "PaginaActual",
            total: "TotalPaginas",
            records: "TotalRegistros",
            repeatitems: true,
            cell: "Row",
            id: "Id"
        },
        colModel: [
                    { name: 'Id', index: 'Id', label: 'Id', hidden: true },
                    { name: 'TipoSolicitud', index: 'TipoSolicitud', label: 'Tipo de Solicitud', width: "160px" },
                    { name: 'MenorObjetivo', index: 'MenorObjetivo', label: '<img src="../../Common/Images/Semaforos/Verde_16x16.png" />', width: "80px", align: 'right' },
                    { name: 'EntreObjetivoMaximo', index: 'EntreObjetivoMaximo', label: '<img src="../../Common/Images/Semaforos/Ambar_16x16.png" />', width: "80px", align: 'right' },
                    { name: 'MayorQueMaximo', index: 'MayorQueMaximo', label: '<img src="../../Common/Images/Semaforos/Rojo_16x16.png" />', width: "80px", align: 'right' },
                    { name: 'Total', index: 'Total', label: 'Total', width: "80px", align: 'right', classes: 'colTotal' }
        ],

        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        pgtext: 'Pág: {0} de {1}',
        shrinkToFit: false,
        width: 509,
        gridview: true,
        viewrecords: true,
        emptyrecords: "No hay umbrales que mostrar",
        height: "100%",
        beforeSelectRow: function (rowid, e) {
        },
        gridComplete: function () {
            $("#pnlCuerpo").height(fnCalcularAltoAprobacion() + 25);
        }
    });



}


function ObtenerUmbrales_deProceso() {

    $("#gridUmbralesProceso").jqGrid({
        datatype: function () {

            $.ajax({
                type: "POST",
                url: "DashBoard_I.aspx/ObtenerUmbrales_deProceso",
                data: "{'inPagTam':'" + $('#gridUmbralesProceso').getGridParam("rowNum") + "'," + //Tamaño de pagina
                       "'inPagAct':'" + $('#gridUmbralesProceso').getGridParam("page") + "'}", //FiltroRegistro
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.d.Items.length == 0) {
                        $("#dvUmbralesProceso").html("");
                        $("#dvUmbralesProceso").append('<div style="font-size:medium; color:Gray; height:100Px; " runat="server">No hay datos para mostrar.</div>');
                    } else {
                        $("#gridUmbralesProceso")[0].addJSONData(result.d);
                    }
                    $("#pnlCuerpo").height(fnCalcularAltoProceso() + 3);
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
        {
            root: "Items",
            page: "PaginaActual",
            total: "TotalPaginas",
            records: "TotalRegistros",
            repeatitems: true,
            cell: "Row",
            id: "Id"
        },
        colModel: [
                    { name: 'Id', index: 'Id', label: 'Id', hidden: true },
                    { name: 'TipoSolicitud', index: 'TipoSolicitud', label: 'Tipo de Solicitud', width: "214px" },

                    { name: 'MenorObjetivo_Pendiente', index: 'MenorObjetivo_Pendiente', label: '<img src="../../Common/Images/Semaforos/Verde_16x16.png" />', width: "95px", align: 'right' },
                    { name: 'EntreObjetivoMaximo_Pendiente', index: 'EntreObjetivoMaximo_Pendiente', label: '<img src="../../Common/Images/Semaforos/Ambar_16x16.png" />', width: "95px", align: 'right' },
                    { name: 'MayorQueMaximo_Pendiente', index: 'MayorQueMaximo_Pendiente', label: '<img src="../../Common/Images/Semaforos/Rojo_16x16.png" />', width: "95px", align: 'right' },
                    { name: 'Total_Pendientes', index: 'Total_Pendientes', label: 'Total Por Asignar', width: "95px", align: 'right', classes: 'colTotal' },

                    { name: 'MenorObjetivo_EnProceso', index: 'MenorObjetivo_EnProceso', label: '<img src="../../Common/Images/Semaforos/Verde_16x16.png" />', width: "95px", align: 'right' },
                    { name: 'EntreObjetivoMaximo_EnProceso', index: 'EntreObjetivoMaximo_EnProceso', label: '<img src="../../Common/Images/Semaforos/Ambar_16x16.png" />', width: "95px", align: 'right' },
                    { name: 'MayorQueMaximo_EnProceso', index: 'MayorQueMaximo_EnProceso', label: '<img src="../../Common/Images/Semaforos/Rojo_16x16.png" />', width: "95px", align: 'right' },
                    { name: 'Total_EnProceso', index: 'Total_EnProceso', label: 'Total En Proceso', width: "95px", align: 'right', classes: 'colTotal' }
        ],

        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        pgtext: 'Pág: {0} de {1}',
        shrinkToFit: false,
        width: 1020,
        gridview: true,
        viewrecords: true,
        emptyrecords: "No hay umbrales que mostrar",
        height: "100%",
        beforeSelectRow: function (rowid, e) {
        },
        gridComplete: function () {
            $("#pnlCuerpo").height(fnCalcularAltoAprobacion() + 25);
        }
    }).jqGrid('setGroupHeaders', {
        useColSpanStyle: false,
        groupHeaders: [
                { startColumnName: 'MenorObjetivo_Pendiente', numberOfColumns: 4, titleText: 'Solicitudes Por Asignar' },
                { startColumnName: 'MenorObjetivo_EnProceso', numberOfColumns: 4, titleText: 'Solicitudes En Proceso' }
        ]
    });
}


function fnMostrarEtiquetasSinDatos() {

    if ($("#ASPxPivotGrid1").length == 0) {
        $("#NHD_ASPxPivotGrid1").css("display", "block");
    }

    if ($("#ASPxPivotGrid2").length == 0) {
        $("#NHD_ASPxPivotGrid2").css("display", "block");
    }

    if ($("#ASPxPivotGrid3").length == 0) {
        $("#NHD_ASPxPivotGrid3").css("display", "block");
    }

    if ($("#DevPivotSolicitudesPeriodo").length == 0) {
        $("#NHD_DevPivotSolicitudesPeriodo").css("display", "block");
    }

    if ($("#DevPivotSolicitudesResponsable").length == 0) {
        $("#NHD_DevPivotSolicitudesResponsable").css("display", "block");
    }

    if ($("#DevPivotSolicitudesTotalPeriodo").length == 0) {
        $("#NHD_DevPivotSolicitudesTotalPeriodo").css("display", "block");
    }

    //    setTimeout(function () {
    //        //if ($("#pnlAprobacion").hasClass("esNoVisible")) {
    //            $("#pnlAprobacion").removeClass("esNoVisible");
    //            $("#pnlProceso").addClass("esNoVisible");
    //            $("#pnlAprobacion").fadeIn(300);
    //            $("#pnlCuerpo").height(fnCalcularAltoAprobacion() + 5);
    //        //}
    //    }, 1000);
}