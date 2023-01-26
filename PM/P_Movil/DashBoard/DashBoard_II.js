var myChart1;
var myChart2;
var myChart3;
var myChart4;

$(function () {

    if ($("#hdfEsValido").val() == "1") {
        try {
            FusionCharts.setCurrentRenderer('javascript');
            fnDiseno();
            fnDibujarCharts();

            $("#ddlMesesTipo").change(function () {
                fnActualizarTipo();
                fnActualizarAvg();
            });
            $("#ddlNivel").change(function () { fnActualizarAvg(); });
            $("#ddlBolsa").change(function () { fnActualizarIncidencias_porMes(); });
            $("#ddlNivelMeses").change(function () { fnActualizarBolsasPorNivel(); });

            try {
                window.parent.fnCerrarCargaInicial();
            }
            catch (ex) {
                //some err
            }
        }
        catch (e) {
            try {
                window.parent.fnCerrarCargaInicial();
            }
            catch (ex) {
                //some err
            }
        }
    }
    else {
        $("#General").css("display", "none");
        $($("form")[0]).append('<div id="divWait" style="width:90%;height:90%;position:absolute;left:0px;top:0px;background-color:white;z-index:999999; padding:20px; font-size:large; color:Gray;">No hay datos para mostrar.</div>');

        try {
            window.parent.fnCerrarCargaInicial();
        }
        catch (ex) {
            //some err
        }
    }
});


function fnDiseno() {

    $('.Tap').hover(function () {
        $(this).addClass("ui-state-active");
    }, function () {
        if ($(this).hasClass("TapNoSelecionado")) {
            $(this).removeClass("ui-state-active");
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


}

function fnDibujarCharts() {

    var JSON_Incidencias_mes = JSON.parse(Incidencias_mes);
    JSON_Incidencias_mes.chart.bordercolor = "#FFFFFF";
    JSON_Incidencias_mes.chart.useroundedges = "0";
    JSON_Incidencias_mes.chart.showvalues = "0";
    JSON_Incidencias_mes.chart.bgcolor = "#ffffff";
    JSON_Incidencias_mes.chart.showCanvasBorder = "0";
    JSON_Incidencias_mes.chart.canvasBgColor = "#ffffff";
    JSON_Incidencias_mes.chart.plotBorderAlpha = "25";
    JSON_Incidencias_mes.chart.showAlternateHGridColor = "0";
    JSON_Incidencias_mes.chart.usePlotGradientColor = "0";
    JSON_Incidencias_mes.chart.showAxisLines = "1";
    JSON_Incidencias_mes.chart.xAxisLineColor = "#A9A9A9";
    JSON_Incidencias_mes.chart.yAxisLineColor = "#FFFFFF";
    JSON_Incidencias_mes.chart.axisLineAlpha = "10";
    JSON_Incidencias_mes.chart.divlineColor = "#999999";
    JSON_Incidencias_mes.chart.divLineIsDashed = "1";
    JSON_Incidencias_mes.chart.divLineDashLen = "1";
    JSON_Incidencias_mes.chart.divLineGapLen = "1";
    JSON_Incidencias_mes.chart.labeldisplay = "0";
    JSON_Incidencias_mes.chart.slantlabels = "1",
    JSON_Incidencias_mes.chart.palette = "1";
    JSON_Incidencias_mes.chart.animation = "0";
    JSON_Incidencias_mes.chart.showborder = "0";
    JSON_Incidencias_mes.chart.canvasbasecolor = "#CCCCCC";
    JSON_Incidencias_mes.legendBorderThickness = "0";
    JSON_Incidencias_mes.legendShadow = "0";
    for (var i in JSON_Incidencias_mes.categories[0].category) {
        JSON_Incidencias_mes.categories[0].category[i].alpha = "25";
    }
    myChart1 = new FusionCharts("../../Common/Scripts/FusionCharts/MSCombi2D.swf", "chartIncidenciasMeses", "980", "227", "0");
    myChart1.setJSONData(JSON_Incidencias_mes);
    myChart1.setTransparent(true);
    myChart1.render("contentChartMeses");
    $("#chartIncidenciasMeses").css('left', '15px');


    var JSON_Incidencias_AVG = JSON.parse(Incidencias_AVG);
    JSON_Incidencias_AVG.chart.bordercolor = "#FFFFFF";
    JSON_Incidencias_AVG.chart.useroundedges = "0";
    JSON_Incidencias_AVG.chart.showvalues = "0";
    JSON_Incidencias_AVG.chart.bgcolor = "#ffffff";
    JSON_Incidencias_AVG.chart.showCanvasBorder = "0";
    JSON_Incidencias_AVG.chart.canvasBgColor = "#ffffff";
    JSON_Incidencias_AVG.chart.plotBorderAlpha = "25";
    JSON_Incidencias_AVG.chart.showAlternateHGridColor = "0";
    JSON_Incidencias_AVG.chart.usePlotGradientColor = "0";
    JSON_Incidencias_AVG.chart.showAxisLines = "1";
    JSON_Incidencias_AVG.chart.xAxisLineColor = "#A9A9A9";
    JSON_Incidencias_AVG.chart.yAxisLineColor = "#FFFFFF";
    JSON_Incidencias_AVG.chart.axisLineAlpha = "10";
    JSON_Incidencias_AVG.chart.divlineColor = "#999999";
    JSON_Incidencias_AVG.chart.divLineIsDashed = "1";
    JSON_Incidencias_AVG.chart.divLineDashLen = "1";
    JSON_Incidencias_AVG.chart.divLineGapLen = "1";
    JSON_Incidencias_AVG.chart.labeldisplay = "0";
    JSON_Incidencias_AVG.chart.slantlabels = "1",
    JSON_Incidencias_AVG.chart.palette = "1";
    JSON_Incidencias_AVG.chart.animation = "0";
    JSON_Incidencias_AVG.chart.showborder = "0";
    JSON_Incidencias_AVG.chart.canvasbasecolor = "#CCCCCC";
    JSON_Incidencias_AVG.legendBorderThickness = "0";
    JSON_Incidencias_AVG.legendShadow = "0";
    for (var i in JSON_Incidencias_AVG.categories[0].category) {
        JSON_Incidencias_AVG.categories[0].category[i].alpha = "25";
    }

    myChart2 = new FusionCharts("../../Common/Scripts/FusionCharts/MSCombi2D.swf", "chartIncidenciasAVG", "980", "227", "0");
    myChart2.setJSONData(JSON_Incidencias_AVG);
    myChart2.setTransparent(true);
    myChart2.render("contentChartAVG");
    $("#chartIncidenciasAVG").css('left', '15px');


    var JSON_Incidencias_Tipo = JSON.parse(Incidencias_Tipo);
    JSON_Incidencias_Tipo.chart.bordercolor = "#FFFFFF";
    JSON_Incidencias_Tipo.chart.useroundedges = "0";
    JSON_Incidencias_Tipo.chart.showvalues = "0";
    JSON_Incidencias_Tipo.chart.bgcolor = "#ffffff";
    JSON_Incidencias_Tipo.chart.showCanvasBorder = "0";
    JSON_Incidencias_Tipo.chart.canvasBgColor = "#ffffff";
    JSON_Incidencias_Tipo.chart.plotBorderAlpha = "25";
    JSON_Incidencias_Tipo.chart.showAlternateHGridColor = "0";
    JSON_Incidencias_Tipo.chart.usePlotGradientColor = "0";
    JSON_Incidencias_Tipo.chart.showAxisLines = "1";
    JSON_Incidencias_Tipo.chart.xAxisLineColor = "#A9A9A9";
    JSON_Incidencias_Tipo.chart.yAxisLineColor = "#FFFFFF";
    JSON_Incidencias_Tipo.chart.axisLineAlpha = "10";
    JSON_Incidencias_Tipo.chart.divlineColor = "#999999";
    JSON_Incidencias_Tipo.chart.divLineIsDashed = "1";
    JSON_Incidencias_Tipo.chart.divLineDashLen = "1";
    JSON_Incidencias_Tipo.chart.divLineGapLen = "1";
    JSON_Incidencias_Tipo.chart.labeldisplay = "0";
    JSON_Incidencias_Tipo.chart.slantlabels = "1",
    JSON_Incidencias_Tipo.chart.palette = "1";
    JSON_Incidencias_Tipo.chart.animation = "0";
    JSON_Incidencias_Tipo.chart.showborder = "0";
    JSON_Incidencias_Tipo.chart.canvasbasecolor = "#CCCCCC";
    JSON_Incidencias_Tipo.legendBorderThickness = "0";
    JSON_Incidencias_Tipo.legendShadow = "0";
    for (var i in JSON_Incidencias_Tipo.data) {
        JSON_Incidencias_Tipo.data[i].alpha = "25";
    }

    myChart3 = new FusionCharts("../../Common/Scripts/FusionCharts/Column2D.swf", "chartIncidenciasTipo", "490", "260", "0");
    myChart3.setJSONData(JSON_Incidencias_Tipo);
    myChart3.setTransparent(true);
    myChart3.render("contentChartTipo");

    var re2 = JSON.parse(Incidencias_Tipificacion);

    if (re2.data[0].value == "0") {
        $("#nohayDatosTipi").show(300);
    }
    else {
        $("#nohayDatosTipi").hide(300);
    }

    for (var i in re2.data) {
        re2.data[i].alpha = "25";
    }

    myChart4 = new FusionCharts("../../Common/Scripts/FusionCharts/doughnut2d.swf", "chartIncidenciasTipificacion", "500", "260", "0");
    myChart4.setJSONData(re2);
    myChart4.setTransparent(true);
    myChart4.render("contentChartTipificacion");

    return;
}


function fnClickChart(a) {
    fnActualizarTipificacion(a);
}

function fnActualizarTipificacion(IdTipo) {
    $.ajax({
        type: "POST",
        url: "DashBoard_II.aspx/ActualizarTipificacion",
        data: "{'prAnoMes': '" + $("#ddlMesesTipo").val() + "'," +
                                "'prIdTipo': '" + IdTipo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            //var resul = resultado.d;
            var re2 = JSON.parse(resultado.d);

            if (re2.data[0].value == "0") {
                //$("#contentChartTipificacion").append('<div style="font-size:medium; color:Gray; ">No hay datos para mostrar.</div> ');
                $("#nohayDatosTipi").show(300);
            }
            else {
                $("#nohayDatosTipi").hide(300);
            }

            for (var i in re2.data) {
                re2.data[i].alpha = "25";
            }

            if (!(FusionCharts("chartIncidenciasTipificacion"))) {
                myChart4 = new FusionCharts("../../Common/Scripts/FusionCharts/doughnut2d.swf", "chartIncidenciasTipificacion", "500", "260", "0");
                myChart4.setJSONData(re2);
                myChart4.setTransparent(true);
                myChart4.render("contentChartTipificacion");
            }
            else {
                $("#contentChartTipificacion").updateFusionCharts({ dataSource: re2, dataFormat: "json" });
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function fnActualizarTipo() {
    $.ajax({
        type: "POST",
        url: "DashBoard_II.aspx/ActualizarTipo",
        data: "{'prAnoMes': '" + $("#ddlMesesTipo").val() + "'}" ,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;
            $("#contentChartTipo").updateFusionCharts({ dataSource: resul[0], dataFormat: "json" });
            //$("#contentChartTipificacion").updateFusionCharts({ dataSource: resul[1], dataFormat: "json" });

            var re2 = JSON.parse(resul[1]);

            if (re2.data[0].value == "0") {
                //$("#contentChartTipificacion").append('<div style="font-size:medium; color:Gray; ">No hay datos para mostrar.</div> ');
                $("#nohayDatosTipi").show(300);
            }
            else {
                $("#nohayDatosTipi").hide(300);
            }

            for (var i in re2.data) {
                re2.data[i].alpha = "25";
            }

            if (!(FusionCharts("chartIncidenciasTipificacion"))) {
                myChart4 = new FusionCharts("../../Common/Scripts/FusionCharts/doughnut2d.swf", "chartIncidenciasTipificacion", "500", "260", "0");
                myChart4.setJSONData(re2);
                myChart4.setTransparent(true);
                myChart4.render("contentChartTipificacion");
            }
            else {
                $("#contentChartTipificacion").updateFusionCharts({ dataSource: re2, dataFormat: "json" });
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnActualizarAvg() {
    $.ajax({
        type: "POST",
        url: "DashBoard_II.aspx/ActualizarAVG",
        data: "{'prIdNivel': '" + $("#ddlNivel").val() + "'," +
                "'prAnoMes': '" + $("#ddlMesesTipo").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            //debugger;
            var resul = resultado.d;
            $("#contentChartAVG").updateFusionCharts({ dataSource: resul, dataFormat: "json" });
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnActualizarIncidencias_porMes() {
    $.ajax({
        type: "POST",
        url: "DashBoard_II.aspx/ActualizarIncidencias_porMes",
        data: "{'prIdBolsa': '" + $("#ddlBolsa").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;
            $("#contentChartMeses").updateFusionCharts({ dataSource: resul, dataFormat: "json" });
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnActualizarBolsasPorNivel() {

    $.ajax({
        type: "POST",
        url: "DashBoard_II.aspx/ListarBolsa",
        data: "{'prIdNivel': '" + $("#ddlNivelMeses").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;

            $("#ddlBolsa").html("");
            var i = 0;
            for (i = 0; i < resul.length; i++) {
                $("#ddlBolsa").append("<option value=" + resul[i].IdBolsa + ">" + resul[i].Nombre + "</option>");
            }
            fnActualizarIncidencias_porMes();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}