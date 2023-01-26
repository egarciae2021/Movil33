
var JsonDistribucionConceptos = "";

var Ancho = 0;
var Alto = 0;
var num;
var oCulturaUsuario;
var SimMil;
var NumDec;
var SimDec;
var inTotal;

var FCHeight="300";
var FCWidth="99%";
var FCHeight_ND="200px";
var FCWidth_ND="100%";

$(function (){

    oCulturaUsuario = window.top.oCulturaUsuario;
    //CargaCultura();

    Ancho = $(window).width();
    Alto = $(window).height();

    try {
        window.parent.fnCerrarCargaInicial();
    }
    catch (e) {
        //some err
    }

    if (p_dwDesde.length > 0) {
        $("#dwDesde").val(p_dwDesde);
    }

    SimMil = $("#hdfSepMiles").val();
    NumDec = $("#hdfNumDecimales").val();
    SimDec = $("#hdfSepDecimal").val();

    function CargaCultura() {
        if (oCulturaUsuario == undefined) {
            $.ajax({
                type: "POST",
                url: "../../Common/WebService/General.asmx/ObtenerCulturaPrincipalUsuario",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    oCulturaUsuario = result.d;
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        } else {
            Inicio();
        }
    }

    $(window).resize(function () {
        DimPosElementos();
    });

    $("#btnColapseFiltros").click(function () {
        setTimeout(function () {
            if ($("#ibtnColapseFiltros").hasClass("fa-angle-down")) {
                $("#ibtnColapseFiltros").removeClass("fa-angle-down");
                $("#ibtnColapseFiltros").addClass("fa-angle-up");

                $("#panel-collapse-filtros").addClass("in");
                $("#panel-collapse-filtros").css("height", "");
            }
            else {
                $("#ibtnColapseFiltros").removeClass("fa-angle-up");
                $("#ibtnColapseFiltros").addClass("fa-angle-down");

                $("#panel-collapse-filtros").removeClass("in");
                $("#panel-collapse-filtros").css("height", "");
            }
        }, 200);
    });
    $("#panel-collapse-filtros").css("height", "");

    $("#dwDesde").change(function () {
        window.parent.$("#dvCargando").show();
        window.location.href = 'DashBoard_Incidencias.aspx?pe=' + $("#dwDesde").val();
        window.parent.$("#dvCargando").hide();
    });

    var strPeriodo = $("#dwDesde option:selected").text();
    $("#lblPeriodo").text(strPeriodo);

    $("#ddlBolsa").change(function () {
        Grafico_CantidadPorMes();
    });

    $("#ddlNroMes").change(function () {
        Grafico_DetallePorMes();
    });

    Grafico_CantidadXTipo();
    Grafico_AVG();
    Grafico_CantidadPorMes();
    Grafico_DetallePorMes();

    $("#btnImprimir").click(function() {
        if ($('#dwDesde > option').length > 1) {
            window.print();
        } else {
            alerta("No hay datos para imprimir");
        }
    });

    var cache_width = $('#pnlGeneral').width(); //Criado um cache do CSS
    var a4 = [595.28, 841.89]; // Widht e Height de uma folha a4

    $(document).on("click", '#btnPrint', function () {
        // Setar o width da div no formato a4
        $("#pnlGeneral").width((a4[0] * 1.33333) - 80).css('max-width', 'none');

        // Aqui ele cria a imagem e cria o pdf
        html2canvas($('#pnlGeneral'), {
            onrendered: function (canvas) {
                var img = canvas.toDataURL("image/jpeg", 1.0);
                //var doc = new jsPDF({ unit: 'px', format: 'a4' });//this line error
                var doc = new jsPDF('landscape'); // default is portrait
                doc.addImage(img, 'JPEG', 20, 20);
                doc.save('NOME-DO-PDF.pdf');
                //Retorna ao CSS normal
                $('#pnlGeneral').width(cache_width);
            }
        });
    }); 
})

function Grafico_CantidadPorMes(){
    var str = $("#dwDesde").val();
    var vcMesInicial = str.substring(3) + '' + str.substring(0, 2);

    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "DashBoard_Incidencias.aspx/Grafico_CantidadPorMes ",
        data: "{'vcPeriodo':'" + vcMesInicial + "'," +
                "'prIdBolsa': '"+ $("#ddlBolsa").val() +"'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            // ==============================================================================================================================             
            if ($(result.d).length > 0) {
                var cadena = '';
                cadena = cadena + '{"chart": {';
                cadena = cadena + '"baseFont":"Open Sans", "baseFontColor": "#6b737c", "legendBorderThickness": "0","legendShadow":"0","exportFileName":"TopTenCosto",';
                cadena = cadena + '"subCaptionFontColor":"#9E9C9C","divlineThickness":"1","canvasbasecolor": "#CCCCCC", "snumberprefix": "",';
                cadena = cadena + '"legendItemFontColor":"#666666", "legendItemFontSize":"10",';
                cadena = cadena + '"rotateValues":"0", "sformatnumber":"0", "showHoverEffect":"1", "showShadow":"0", "showXAxisLine":"1", ';
                cadena = cadena + '"showPercentValues":"0","showplotborder":"0", "valueFontColor":"", ';
                cadena = cadena + '"xAxisLineThickness":"1","maxLabelWidthPercent":"30", ';
                cadena = cadena + '"bgAlpha":"100", "canvasBgColor": "#ffffff", "canvasbgAlpha":"0", "canvasBorderAlpha":"0", "showAlternateHGridColor": "0",';
                cadena = cadena + '"captionAlignment":"left","showYAxisLine": "0", "showsyAxisLine": "0","divlineColor": "#999999",';
                cadena = cadena + '"divLineDashLen": "1","divLineDashed": "1","divLineGapLen": "0",';
                cadena = cadena + '"labeldisplay": "0","slantlabels": "1", "maxColWidth": "35", ';

                cadena = cadena + '"subCaption": "(Según cantidades de incidencias)",';

                cadena = cadena + '"drawcrossline": "1", "showsum": "1","showYAxisValues": "1","showvalues": "0","seriesnameintooltip": "1","showlegend": "1","caption": "INCIDENCIAS POR MES","xAxisName": "","yAxisName": "","numberPrefix": "",';
                cadena = cadena + '"bgColor": "#ffffff", "showBorder": "0", "showCanvasBorder": "0", "usePlotGradientColor": "0", "plotBorderAlpha": "25","theme": "fusion", "exportenabled" : "1","exportShowMenuItem":"1",';
                cadena = cadena + '"placeValuesInside": "1", "showAxisLines": "1", "xAxisLineColor": "#999999", "yAxisLineColor": "#FFFFFF", "axisLineAlpha": "10","divLineIsDashed": "1",';
                cadena = cadena + '"divLineAlpha": "30", "showAlternateVGridColor": "0", "captionFontSize": "16", "subcaptionFontSize": "12", "subcaptionFontBold": "0","numberscalevalue": "100,100,100",';
                cadena = cadena + '"formatNumberScale": "0", "formatNumber": "1", "forceDecimals": "1", "sdecimals": "0", "decimals": "0",';
                cadena = cadena + '"decimalSeparator": "", "thousandSeparator": ""';
                cadena = cadena + '';
                cadena = cadena + ' }, "categories": [ {"category": [';

                var anio = (result.d).map(item => item.vcGrupo01).filter((value, index, self) => self.indexOf(value) === index)
                var mes = (result.d).map(item => item.vcGrupo03).filter((value, index, self) => self.indexOf(value) === index)

                var i = 0;
                for (i = 0; i < mes.length; i++) {
                    var item = '{"label": "' + mes[i] + '" }';
                    if (i + 1 != mes.length) {
                        item = item + ',';
                    }
                    cadena = cadena + item;
                }
                cadena = cadena + '] } ] , "dataset": [ ';

                for (i = 0; i < anio.length; i++) {                    

                    var valores = (result.d).filter(function (el) {
                        return el.vcGrupo01 == anio[i];
                    });

                    if (i==0) {
                        cadena = cadena + ' {"seriesname": "' + valores[0].vcGrupo01 + '", "color":"' + valores[0].vcGrupo06 + '", "data": [';
                    }
                    else
                    {
                        cadena = cadena + '] }, {"seriesname": "' + valores[0].vcGrupo01 + '", "color":"' + valores[0].vcGrupo06 + '", "data": [';
                    }

                    for (var j = 0; j < valores.length; j++) {
                        item = '{"value": "' + valores[j].vcGrupo05 + '", "label":"' + valores[j].vcGrupo01 + '","color": "' + valores[j].vcGrupo06 + '",';
                        item = item + '"alpha":"100",';
                        item = item + '"tooltext":"Cantidad: <b>' + (valores[j].vcGrupo05) + '</b>, Mes: ' + valores[j].vcGrupo01 + '" }';
                        if (j + 1 != valores.length) {
                            item = item + ',';
                        }
                        cadena = cadena + item;
                    }
                }

                cadena = cadena + '] } ] }';

                JsonTopTenCosto = cadena;
                var valoraleatorio = Math.random();
                var IdGrafico = "chartContainer6_render" + valoraleatorio;

                if (FusionCharts(IdGrafico) === undefined) {
                    var repositorioChartDur = new FusionCharts("mssplinearea", IdGrafico, FCWidth, FCHeight, "0");
                    repositorioChartDur.setJSONData(cadena);
                    repositorioChartDur.setTransparent(true);
                    repositorioChartDur.render("chartContainer6");
                } else {
                    FusionCharts(IdGrafico).setJSONData(cadena);
                }

                AlinearTitulosGraficos();

            } else {
                $("#chartContainer6 *").remove();
                $("#chartContainer6").append('<div style="font-size:medium; color:Gray; width: '+ FCWidth_ND +'; height: '+ FCHeight_ND +';">No hay datos para mostrar.</div> ');
            }

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function Grafico_DetallePorMes(){
    $("#dvDetalleFiltro").hide();
    var str = $("#dwDesde").val();
    var vcMesInicial = str.substring(3) + '' + str.substring(0, 2);

    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "DashBoard_Incidencias.aspx/Grafico_DetallePorMes",
        data: "{'vcPeriodo':'" + vcMesInicial + "'," +
              "'vcNroMeses': '"+ $("#ddlNroMes").val() +"'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            // ==============================================================================================================================             
            if ($(result.d).length > 0) {

                var cadena = '';
                cadena = cadena + '{"chart": {';
                cadena = cadena + '"baseFont":"Open Sans", "baseFontColor": "#6b737c", "legendBorderThickness": "0","legendShadow":"0","exportFileName":"TopTenCosto",';
                cadena = cadena + '"subCaptionFontColor":"#9E9C9C","divlineThickness":"1","canvasbasecolor": "#CCCCCC", "snumberprefix": "",';
                cadena = cadena + '"legendItemFontColor":"#666666", "legendItemFontSize":"10",';
                cadena = cadena + '"rotateValues":"0", "sformatnumber":"0", "showHoverEffect":"1", "showShadow":"0", "showXAxisLine":"1", ';
                cadena = cadena + '"showPercentValues":"0","showplotborder":"0", "valueFontColor":"", ';
                cadena = cadena + '"xAxisLineThickness":"1","maxLabelWidthPercent":"30", ';
                cadena = cadena + '"bgAlpha":"100", "canvasBgColor": "#ffffff", "canvasbgAlpha":"0", "canvasBorderAlpha":"0", "showAlternateHGridColor": "0",';
                cadena = cadena + '"captionAlignment":"left","showYAxisLine": "0", "showsyAxisLine": "0","divlineColor": "#999999",';
                cadena = cadena + '"divLineDashLen": "1","divLineDashed": "1","divLineGapLen": "0",';
                cadena = cadena + '"labeldisplay": "0","slantlabels": "1", "maxColWidth": "35", ';

                cadena = cadena + '"subCaption": "(Según cantidades de incidencias)",';

                cadena = cadena + '"drawcrossline": "1", "showsum": "1","showYAxisValues": "1","showvalues": "0","seriesnameintooltip": "1","showlegend": "1","caption": "DETALLE DE INCIDENCIAS POR MES","xAxisName": "","yAxisName": "","numberPrefix": "",';
                cadena = cadena + '"bgColor": "#ffffff", "showBorder": "0", "showCanvasBorder": "0", "usePlotGradientColor": "0", "plotBorderAlpha": "25","theme": "fusion", "exportenabled" : "1","exportShowMenuItem":"1",';
                cadena = cadena + '"placeValuesInside": "1", "showAxisLines": "1", "xAxisLineColor": "#999999", "yAxisLineColor": "#FFFFFF", "axisLineAlpha": "10","divLineIsDashed": "1",';
                cadena = cadena + '"divLineAlpha": "30", "showAlternateVGridColor": "0", "captionFontSize": "16", "subcaptionFontSize": "12", "subcaptionFontBold": "0","numberscalevalue": "100,100,100",';
                cadena = cadena + '"formatNumberScale": "0", "formatNumber": "1", "forceDecimals": "1", "sdecimals": "0", "decimals": "0",';
                cadena = cadena + '"decimalSeparator": "", "thousandSeparator": ""';
                cadena = cadena + '';
                cadena = cadena + ' }, "categories": [ {"category": [';

                var periodo = (result.d).map(item => item.vcGrupo01).filter((value, index, self) => self.indexOf(value) === index)
                var estado = (result.d).map(item => item.vcGrupo03).filter((value, index, self) => self.indexOf(value) === index)

                var i = 0;
                for (i = 0; i < periodo.length; i++) {
                    var item = '{"label": "' + periodo[i] + '" }';
                    if (i + 1 != periodo.length) {
                        item = item + ',';
                    }
                    cadena = cadena + item;
                }
                cadena = cadena + '] } ] , "dataset": [ ';

                for (i = 0; i < estado.length; i++) {                    

                    var valores = (result.d).filter(function (el) {
                        return el.vcGrupo03 == estado[i];
                    });

                    if (i==0) {
                        cadena = cadena + ' {"seriesname": "' + valores[0].vcGrupo04 + '", "color":"' + valores[0].vcGrupo06 + '", "data": [';
                    }
                    else
                    {
                        cadena = cadena + '] }, {"seriesname": "' + valores[0].vcGrupo04 + '", "color":"' + valores[0].vcGrupo06 + '", "data": [';
                    }

                    for (var j = 0; j < valores.length; j++) {
                        item = '{"value": "' + valores[j].vcGrupo05 + '", "label":"' + valores[j].vcGrupo04 + '","color": "' + valores[j].vcGrupo06 + '",';
                        item = item + '"alpha":"100",';
                        item = item + '"tooltext":"Cantidad: <b>' + (valores[j].vcGrupo05) + '</b>, Tipo: ' + valores[j].vcGrupo04 + '" }';
                        if (j + 1 != valores.length) {
                            item = item + ',';
                        }
                        cadena = cadena + item;
                    }
                }

                cadena = cadena + '] } ] }';
                $("#dvDetalleFiltro").show();

                JsonTopTenCosto = cadena;
                var valoraleatorio = Math.random();
                var IdGrafico = "chartContainer7_render" + valoraleatorio;

                if (FusionCharts(IdGrafico) === undefined) {
                    var repositorioChartDur = new FusionCharts("msline", IdGrafico, FCWidth, FCHeight, "0");
                    repositorioChartDur.setJSONData(cadena);
                    repositorioChartDur.setTransparent(true);
                    repositorioChartDur.render("chartContainer7");
                } else {
                    FusionCharts(IdGrafico).setJSONData(cadena);
                }
                AlinearTitulosGraficos();

            } else {
                $("#chartContainer7 *").remove();
                $("#chartContainer7").append('<div style="font-size:medium; color:Gray; width: '+ FCWidth_ND +'; height: '+ FCHeight_ND +';">No hay datos para mostrar.</div> ');
                $("#dvDetalleFiltro").hide();
            }

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function Grafico_CantidadXTipificacion(IdTipo) {
    var str = $("#dwDesde").val();
    var vcMesInicial = str.substring(3) + '' + str.substring(0, 2);

    if (IdTipo != "" || IdTipo != "0") {
        $.ajax({
            type: "POST",
            url: "DashBoard_Incidencias.aspx/Grafico_DistribucionPorTipificacion",
            data: "{'vcPeriodo':'" + vcMesInicial + "', 'prIdTipo':'" + IdTipo + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if ($(result.d).length > 0) {
                    var cadena2 = '';
                    cadena2 = cadena2 + '{"chart":{';
                    cadena2 = cadena2 + '"caption":"DISTRIBUCIÓN POR TIPIFICACION","subCaption":"(Según cantidades de incidencias)", "subCaptionFontColor":"#9E9C9C","exportFileName":"DistribucionPorConceptos", ';
                    cadena2 = cadena2 + '"captionAlignment":"left", "captionFontSize":"16", "subcaptionFontSize":"12", "subcaptionFontBold":"0", "toolTipColor": "ffffff", "exportenabled" : "1","exportShowMenuItem":"1",';
                    cadena2 = cadena2 + '"baseFont":"Open Sans","baseFontColor":"6b737c", "bgAlpha":"25", "showShadow":"0", "use3DLighting":"0", "startingAngle": "0", "decimals": "2", ';
                    cadena2 = cadena2 + '"toolTipBorderThickness":"0","toolTipBgColor":"#000000","toolTipBgAlpha":"80","toolTipBorderRadius":"2","toolTipPadding":"5",';
                    cadena2 = cadena2 + '"showHoverEffect":"1","legendBgColor":"#ffffff", "legendItemFontSize": "12", "paletteColors": "#FFE019,#1D43A4,#78DC27,#0E2443,#1975EA", "legendItemFontColor": "#666666",   ';

                    cadena2 = cadena2 + '"numberPrefix": "","legendBorderThickness": "0","legendShadow":"0","legendPosition": "right",';
                    cadena2 = cadena2 + '"showPercentValues": "1", "showPercentInTooltip": "0", "enableSmartLabels": "0", "enableMultiSlicing": "0", "decimals": "",';
                    cadena2 = cadena2 + '"useroundedges": "0", "showvalues": "1", "showlabels": "1", "labelFontBold":"1", "showLegend": "1", "labelDistance": "0", "slicingDistance": "15",';

                    var Ancho = $(window).width();

                    var pieRadius = "80";
                    if (Ancho < 400) {
                        pieRadius = "40";
                    }
                    else if (Ancho < 1000) {
                        pieRadius = "50";
                    }
                    cadena2 = cadena2 + '"pieRadius": "' + pieRadius + '", "bgColor": "#ffffff", "showBorder": "0", "usePlotGradientColor": "0", "useDataPlotColorForLabels": "1"';
                    cadena2 = cadena2 + '},"legendborderalpha": "0", "data": [';
                    var i = 0;
                    for (i = 0; i < $(result.d).length; i++) {

                        var item = '{"label": "' + result.d[i].vcGrupo01 + '","alpha": "100","color": "' + result.d[i].vcGrupo06 + '","value": "' + result.d[i].vcGrupo05 + ' ", "issliced" : "0" }';
                        if (i + 1 != $(result.d).length) {
                            item = item + ',';
                        }

                        cadena2 = cadena2 + item;
                    }
                    cadena2 = cadena2 + '] }';

                    JsonDistribucionConceptos = cadena2;
                    var repositorioChartDur = new FusionCharts("doughnut2d", "chartContainer3_render" + Math.random(), FCWidth, FCHeight, "0");
                    repositorioChartDur.setJSONData(cadena2);
                    repositorioChartDur.setTransparent(true);
                    repositorioChartDur.render("chartContainer3");

                    AlinearTitulosGraficos();

                } else {
                    $("#chartContainer3 *").remove();
                    $("#chartContainer3").append('<div style="font-size:medium; color:Gray; width: '+ FCWidth_ND +'; height: '+ FCHeight_ND +';">No hay datos para mostrar.</div> ');
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    } else {
        $("#chartContainer3 *").remove();
        $("#chartContainer3").append('<div style="font-size:medium; color:Gray; width: '+ FCWidth_ND +'; height: '+ FCHeight_ND +';">No hay datos para mostrar.</div> ');
    }
}

function Grafico_CantidadXTipo() {
    var str = $("#dwDesde").val();
    var vcMesInicial = str.substring(3) + '' + str.substring(0, 2);

    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "DashBoard_Incidencias.aspx/Grafico_IncidenciaPorTipo",
        data: "{'vcPeriodo':'" + vcMesInicial + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //debugger;
            // ==============================================================================================================================             
            if ($(result.d).length > 0) {

                var PaletaColores = '#01B8AA';

                var cadena = '';
                cadena = cadena + '{"chart": {';
                cadena = cadena + '"baseFont":"Open Sans", "baseFontColor": "#6b737c", "legendBorderThickness": "0","legendShadow":"0","exportFileName":"TopTenCosto",';
                cadena = cadena + '"subCaptionFontColor":"#9E9C9C","divlineThickness":"1","canvasbasecolor": "#CCCCCC", "snumberprefix": "",';
                cadena = cadena + '"legendItemFontColor":"#666666", "legendItemFontSize":"10",';
                cadena = cadena + '"rotateValues":"1", "sformatnumber":"0", "showHoverEffect":"1", "showShadow":"0", "showXAxisLine":"1", ';
                cadena = cadena + '"showPercentValues":"0","showplotborder":"0", "valueFontColor":"", ';
                cadena = cadena + '"xAxisLineThickness":"1","maxLabelWidthPercent":"30", ';
                cadena = cadena + '"bgAlpha":"100", "canvasBgColor": "#ffffff", "canvasbgAlpha":"0", "canvasBorderAlpha":"0", "showAlternateHGridColor": "0",';
                cadena = cadena + '"captionAlignment":"left","showYAxisLine": "0", "showsyAxisLine": "0","divlineColor": "#999999",';
                cadena = cadena + '"divLineDashLen": "1","divLineDashed": "1","divLineGapLen": "0",';
                cadena = cadena + '"labeldisplay": "0","slantlabels": "1", "maxColWidth": "35", ';

                cadena = cadena + '"subCaption": "(Según cantidades de incidencias)",';

                cadena = cadena + '"showYAxisValues": "1","showvalues": "0","seriesnameintooltip": "1","showlegend": "1","caption": "INCIDENCIAS POR TIPO","xAxisName": "Tipos","yAxisName": "Incidencias","numberPrefix": "",';
                cadena = cadena + '"bgColor": "#ffffff", "showBorder": "0", "showCanvasBorder": "0", "usePlotGradientColor": "0", "plotBorderAlpha": "25","theme": "fusion", "exportenabled" : "1","exportShowMenuItem":"1",';
                cadena = cadena + '"placeValuesInside": "1", "showAxisLines": "1", "xAxisLineColor": "#999999", "yAxisLineColor": "#FFFFFF", "axisLineAlpha": "10","divLineIsDashed": "1",';
                cadena = cadena + '"divLineAlpha": "30", "showAlternateVGridColor": "0", "captionFontSize": "16", "subcaptionFontSize": "12", "subcaptionFontBold": "0","numberscalevalue": "100,100,100",';
                cadena = cadena + '"formatNumberScale": "0", "formatNumber": "1", "forceDecimals": "1", "sdecimals": "0", "decimals": "0",';
                cadena = cadena + '"decimalSeparator": "", "thousandSeparator": ""';
                cadena = cadena + '';
                cadena = cadena + ' }, ';
                var i = 0;

                cadena = cadena + ' "data": [';
                for (i = 0; i < $(result.d).length; i++) {
                    item = '{"value": "' + result.d[i].vcGrupo05 + '", "label":"' + result.d[i].vcGrupo01 + '","color": "' + result.d[i].vcGrupo06 + '","link": "j-clickChart_h-' + result.d[i].vcGrupo02 + '",';
                    item = item + '"alpha":"100",';
                    item = item + '"tooltext":"Tipo: ' + result.d[i].vcGrupo01 + ', Cantidad: ' + (result.d[i].vcGrupo05) + '" }';
                    if (i + 1 != $(result.d).length) {
                        item = item + ',';
                    }
                    cadena = cadena + item;
                }
                cadena = cadena + '] }';

                JsonTopTenCosto = cadena;
                var valoraleatorio = Math.random();
                var IdGrafico = "chartContainer2_render" + valoraleatorio;

                if (FusionCharts(IdGrafico) === undefined) {
                    var repositorioChartDur = new FusionCharts("column2d", IdGrafico, FCWidth, FCHeight, "0");
                    repositorioChartDur.setJSONData(cadena);
                    repositorioChartDur.setTransparent(true);
                    repositorioChartDur.render("chartContainer2");
                } else {
                    FusionCharts(IdGrafico).setJSONData(cadena);
                }

                Grafico_CantidadXTipificacion(result.d[0].vcGrupo02);

            } else {
                $("#chartContainer2 *").remove();
                $("#chartContainer2").append('<div style="font-size:medium; color:Gray; width: '+ FCWidth_ND +'; height: '+ FCHeight_ND +';">No hay datos para mostrar.</div> ');

                Grafico_CantidadXTipificacion("0");
            }

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function Grafico_AVG() {
    $("#dvSVGFiltro").show();
    var str = $("#dwDesde").val();
    var vcMesInicial = str.substring(3) + '' + str.substring(0, 2);
    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "DashBoard_Incidencias.aspx/Grafico_AVG",
        data: "{'vcPeriodo':'" + vcMesInicial + "'," +
                "'prIdNivel': '"+ $("#ddlNivel").val() +"'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            // ==============================================================================================================================             
            if ($(result.d).length > 0) {

                var cadena = '';
                cadena = cadena + '{"chart": {';
                cadena = cadena + '"baseFont":"Open Sans", "baseFontColor": "#6b737c", "legendBorderThickness": "0","legendShadow":"0","exportFileName":"TopTenCosto",';
                cadena = cadena + '"subCaptionFontColor":"#9E9C9C","divlineThickness":"1","canvasbasecolor": "#CCCCCC", "snumberprefix": "",';
                cadena = cadena + '"legendItemFontColor":"#666666", "legendItemFontSize":"10",';
                cadena = cadena + '"rotateValues":"0", "sformatnumber":"0", "showHoverEffect":"1", "showShadow":"0", "showXAxisLine":"1", ';
                cadena = cadena + '"showPercentValues":"0","showplotborder":"0", "valueFontColor":"", ';
                cadena = cadena + '"xAxisLineThickness":"1","maxLabelWidthPercent":"30", ';
                cadena = cadena + '"bgAlpha":"100", "canvasBgColor": "#ffffff", "canvasbgAlpha":"0", "canvasBorderAlpha":"0", "showAlternateHGridColor": "0",';
                cadena = cadena + '"captionAlignment":"left","showYAxisLine": "0", "showsyAxisLine": "0","divlineColor": "#999999",';
                cadena = cadena + '"divLineDashLen": "1","divLineDashed": "1","divLineGapLen": "0",';
                cadena = cadena + '"labeldisplay": "0","slantlabels": "1", "maxColWidth": "35", ';

                cadena = cadena + '"subCaption": "(Según cantidades de incidencias)",';

                cadena = cadena + '"plottooltext":"Tiempo: <b>$dataValue</b>, Tipo: $label","drawcrossline": "1", "showsum": "1","showYAxisValues": "1","showvalues": "0","seriesnameintooltip": "1","showlegend": "1","caption": "PROMEDIO DE RESOLUCIÓN DE INCIDENCIAS","xAxisName": "","yAxisName": "","numberPrefix": "",';
                cadena = cadena + '"bgColor": "#ffffff", "showBorder": "0", "showCanvasBorder": "0", "usePlotGradientColor": "0", "plotBorderAlpha": "25","theme": "fusion", "exportenabled" : "1","exportShowMenuItem":"1",';
                cadena = cadena + '"placeValuesInside": "1", "showAxisLines": "1", "xAxisLineColor": "#999999", "yAxisLineColor": "#FFFFFF", "axisLineAlpha": "10","divLineIsDashed": "1",';
                cadena = cadena + '"divLineAlpha": "30", "showAlternateVGridColor": "0", "captionFontSize": "16", "subcaptionFontSize": "12", "subcaptionFontBold": "0","numberscalevalue": "60,60", "numberscaleunit":" Min, Hr", "scaleseparator": " ", "scalerecursively": "1", "maxscalerecursion": "-1", "defaultnumberscale": " Sec", "drawcrossline": "1", ';
                cadena = cadena + '"decimalSeparator": "", "thousandSeparator": "", "adjustdiv": "0", "numdivlines": "5"';
                cadena = cadena + '';
                cadena = cadena + ' }, "categories": [ {"category": [';

                var bolsa = (result.d).map(item => item.vcGrupo01).filter((value, index, self) => self.indexOf(value) === index)
                var promedio = (result.d).map(item => item.vcGrupo03).filter((value, index, self) => self.indexOf(value) === index)

                var i = 0;
                for (i = 0; i < bolsa.length; i++) {
                    var item = '{"label": "' + bolsa[i] + '" }';
                    if (i + 1 != bolsa.length) {
                        item = item + ',';
                    }
                    cadena = cadena + item;
                }
                cadena = cadena + '] } ] , "dataset": [ ';

                for (i = 0; i < promedio.length; i++) {                    

                    var valores = (result.d).filter(function (el) {
                        return el.vcGrupo03 == promedio[i];
                    });

                    if (i==0) {
                        cadena = cadena + ' {"seriesname": "' + valores[0].vcGrupo04 + '", "color":"' + valores[0].vcGrupo06 + '", "data": [';
                    }
                    else
                    {
                        cadena = cadena + '] }, {"seriesname": "' + valores[0].vcGrupo04 + '", "color":"' + valores[0].vcGrupo06 + '", "data": [';
                    }

                    for (var j = 0; j < valores.length; j++) {
                        item = '{"value": "' + valores[j].vcGrupo05 + '", "label":"' + valores[j].vcGrupo04 + '","color": "' + valores[j].vcGrupo06 + '",';
                        item = item + '"alpha":"100"}';
                        //item = item + '"tooltext":"Tiempo: <b>' + new Date(valores[j].vcGrupo05 * 1000).toISOString().substr(8, 11) + '</b>, Tipo: ' + valores[j].vcGrupo04 + '" }';
                        if (j + 1 != valores.length) {
                            item = item + ',';
                        }
                        cadena = cadena + item;
                    }
                }

                cadena = cadena + '] } ] }';
                $("#dvSVGFiltro").show();

                JsonTopTenCosto = cadena;
                var valoraleatorio = Math.random();
                var IdGrafico = "chartContainer4_render" + valoraleatorio;

                if (FusionCharts(IdGrafico) === undefined) {
                    var repositorioChartDur = new FusionCharts("mscolumn2d", IdGrafico, FCWidth, FCHeight, "0");
                    repositorioChartDur.setJSONData(cadena);
                    repositorioChartDur.setTransparent(true);
                    repositorioChartDur.render("chartContainer4");
                } else {
                    FusionCharts(IdGrafico).setJSONData(cadena);
                }

                $("#dv_TopTen1").fadeIn(300);

                AlinearTitulosGraficos();

            } else {
                $("#chartContainer4 *").remove();
                $("#chartContainer4").append('<div style="font-size:medium; color:Gray; width: '+ FCWidth_ND +'; height: '+ FCHeight_ND +';">No hay datos para mostrar.</div> ');
                $("#dvSVGFiltro").hide();
            }

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function clickChart_h(p) {
    var str = $("#dwDesde").val();
    var vcMesInicial = str.substring(3) + '' + str.substring(0, 2);

    if (p) {
        Grafico_CantidadXTipificacion(p);

    } else {
        alerta("Seleccione un periodo.");
    }
}

function AlinearTitulosGraficos() {
    //setTimeout(function () {
    //    $('text[fill="#6b737c"][font-size="16px"]').attr("x", "10");
    //    $('text[fill="#9e9c9c"][font-size="12px"]').attr("x", "10");
    //}, 1000);
}