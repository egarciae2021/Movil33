
var JsonDistribucionConceptos = "";

var Ancho = 0;
var Alto = 0;
var num;
var oCulturaUsuario;
var SimMil;
var NumDec;
var SimDec;
var inTotal;

var FCHeight = "300";
var FCWidth = "99%";
var FCHeight_ND = "300px";
var FCWidth_ND = "100%";

var datosUmbrales = 0;
var cont1 = 0;

var datosGraficosSup = 0;
var cont2 = 0;
var solicitudMultipleEspecialista = false;

$(function () {

    solicitudMultipleEspecialista =
        $("#hdfSolicitudesMultipleEspecialista").val() === "True" ? true : false;

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

    if ($('#btAprobacion').val() == "0") {
        $('#dwEstado option[value="2"]').remove();
    }

    if ($('#btProceso').val() == "0") {
        $('#dwEstado option[value="3"]').remove();
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
        $.ajax({
            // ==============================================================================================================================
            type: "POST",
            url: "DashBoard_Facturacion.aspx/Guarda_ParametrosReporte",
            data: "{'p_vcNomGrupo_Para': 'dwDesde','p_vcValor_Para': '" + this.value + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            // ==============================================================================================================================
            success: function (result) {
                // ==============================================================================================================================

                window.parent.$("#dvCargando").show();
                window.location.href = 'DashBoard_Solicitudes.aspx?pe=' + $("#dwDesde").val();
                window.parent.$("#dvCargando").hide();
            }, // ==============================================================================================================================
            error: function (xhr, err, thrErr) {
                // ==============================================================================================================================
                MostrarErrorAjax(xhr, err, thrErr);
                // ==============================================================================================================================
            }

        });
    });

    var strPeriodo = $("#dwDesde option:selected").text();
    $("#lblPeriodo").text(strPeriodo);

    $("#dwEstado").change(function () {
        var estado = $("#dwEstado").val();

        datosGraficosSup = 0;
        cont2 = 0;

        Grafico_Inferior_(estado, 0, 1);
        Grafico_TopTen(estado);

        datosUmbrales = 0;
        cont1 = 0;
        Grafico_Umbrales(estado);

        ListarEstadoPorTipoEstado();
        $("#ddlNroMes").val("6");
        //Grafico_Periodos(estado);
    });

    $("#ddlEstado").change(function () {
        Grafico_Periodos($("#dwEstado").val());
    });

    $("#ddlNroMes").change(function () {
        Grafico_Periodos($("#dwEstado").val());
    });

    datosGraficosSup = 0;
    cont2 = 0;

    ListarEstadoPorTipoEstado();
    Grafico_Inferior_($("#dwEstado").val(), 0, 1);
    Grafico_TopTen($("#dwEstado").val());

    datosUmbrales = 0;
    cont1 = 0;
    Grafico_Umbrales($("#dwEstado").val());

    //Grafico_Periodos($("#dwEstado").val());
    //Grafico_StackedArea();

    $("#btnImprimir").click(function () {
        if ($('#dwEstado > option').length > 1) {
            window.print();
        } else {
            alerta("No hay datos para imprimir");
        }
    });
})

function MostrarOcultarSeccionUmbrales() {
    if (cont1 >= 2) {
        if (datosUmbrales >= 2) {
            $("#dvGraficosUmbrales").hide();
        }
        else {
            $("#dvGraficosUmbrales").show();
        }
    }
}

function MostrarOcultarGraficosSup() {
    if (cont2 >= 2) {
        if (datosGraficosSup >= 2) {
            $("#dvGraficosSuperiores").hide();
        }
        else {
            $("#dvGraficosSuperiores").show();
        }
    }
}

function ListarEstadoPorTipoEstado() {

    if ($("#dwEstado").val() != -1) {
        if ($("#dwEstado").val() == null) {
            $("#ddlEstado").html("");

        } else {
            $.ajax({
                type: "POST",
                url: "Dashboard_Solicitudes.aspx/ListarEstadosPorTipoEstado",
                data: "{'inIdTipoEstado': '" + $("#dwEstado").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    $("#ddlEstado").html("");
                    if ($(result.d).length > 0) {
                        $(result.d).each(function () {

                            $("#ddlEstado").append($("<option></option>").attr("value", this.vcGrupo01.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"')).text(this.vcGrupo05.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"')));

                        });
                    } else {
                        $("#ddlEstado").append($("<option></option>").attr("value", -1).text("--Sin estados--"));
                    }
                    //$("#dwCuenta > option[value='-1']").attr("selected", true);
                    $("#ddlEstado").prop('selectedIndex', 1);
                    Grafico_Periodos($("#dwEstado").val());

                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    } else {
        $("#ddlEstado").html("");
    }
}

// ==============================================================================================================================
//  GRAFICO PIE
// ==============================================================================================================================
function Grafico_Inferior_(inParam, inShowValues, inModo) {

    switch (inParam) {
        case "2":
            Grafico_Pai_Aprobacion(inModo);
            break;
        case "3":
            Grafico_Pai_Proceso(inModo);
            break;
    }
}
function Grafico_TopTen(inParam) {

    switch (inParam) {
        case "2":
            Grafico_TopTen_Aprobacion();
            break;
        case "3":
            Grafico_TopTen_Proceso();
            break;
    }
}
function Grafico_Umbrales(inParam) {

    switch (inParam) {
        case "2":
            Grafico_Umbrales_Aprobados();
            Grafico_Umbrales_PorAprobar();
            break;
        case "3":
            if (!solicitudMultipleEspecialista) {
                $("#dvPanelPorAsignar").show();
                $("#dvPanelUmbralesProceso").removeClass("col-lg-12 col-sm-12").addClass("col-lg-6 col-sm-6");

                Grafico_Umbrales_PorAsignar();
            }
            else {
                $("#dvGraficosUmbrales").show();
                $("#dvPanelPorAsignar").hide();
                $("#dvPanelUmbralesProceso").removeClass("col-lg-6 col-sm-6").addClass("col-lg-12 col-sm-12");
            }
            Grafico_Umbrales_EnProceso();
            break;
    }
}
function Grafico_Periodos(inParam) {

    switch (inParam) {
        case "2":
            Grafico_Periodo_Aprobacion();
            break;
        case "3":
            Grafico_Periodo_Proceso();
            break;
    }
}

function Grafico_Pai_Aprobacion(inModo) {
    var str = $("#dwDesde").val();
    var vcMesInicial = str.substring(3) + '' + str.substring(0, 2);


    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "DashBoard_Solicitudes.aspx/Grafico_Pai_Aprobacion",
        data: "{'vcPeriodo':'" + vcMesInicial + "'," +
            "'vcIdTipSolAprLeer': '" + $("#hdfIdTipSolAprLeer").val() + "'," +
            "'vcIdTipSolAprResp': '" + $("#hdfIdTipSolAprResp").val() + "'," +
            "'vcCodEmp': '" + $("#hdfCodEmp").val() + "'," +
            "'vcCodIntRes': '" + $("#hdfCodIntRes").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            // ==============================================================================================================================
            if ($(result.d).length > 0) {
                var cadena2 = '';
                cadena2 = cadena2 + '{"chart":{';
                cadena2 = cadena2 + '"caption":"DISTRIBUCIÓN POR ESTADO","subCaption":"(Según cantidades de solicitudes)", "subCaptionFontColor":"#9E9C9C","exportFileName":"DistribucionPorConceptos", ';
                cadena2 = cadena2 + '"captionAlignment":"left", "captionFontSize":"16", "subcaptionFontSize":"12", "subcaptionFontBold":"0", "toolTipColor": "ffffff", "exportenabled" : "1","exportShowMenuItem":"1",';
                cadena2 = cadena2 + '"baseFont":"Open Sans","baseFontColor":"6b737c", "bgAlpha":"25", "showShadow":"0", "use3DLighting":"0", "startingAngle": "0", "decimals": "2", ';
                cadena2 = cadena2 + '"toolTipBorderThickness":"0","toolTipBgColor":"#000000","toolTipBgAlpha":"80","toolTipBorderRadius":"2","toolTipPadding":"5",';
                cadena2 = cadena2 + '"showHoverEffect":"1","legendBgColor":"#ffffff", "legendItemFontSize": "12", "paletteColors": "#FFE019,#1D43A4,#78DC27,#0E2443,#1975EA", "legendItemFontColor": "#666666",   ';

                cadena2 = cadena2 + '"numberPrefix": "","legendBorderThickness": "0","legendShadow":"0","legendPosition": "right",';
                cadena2 = cadena2 + '"showPercentValues": "1", "showPercentInTooltip": "0", "enableSmartLabels": "0", "enableMultiSlicing": "0", "decimals": "' + oCulturaUsuario.dcNumDec + '",';
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
                //debugger;
                for (i = 0; i < $(result.d).length; i++) {

                    var item = '{"label": "' + result.d[i].vcGrupo21 + '","alpha": "100","color": "' + result.d[i].vcGrupo05 + '","value": "' + result.d[i].vcGrupo03 + ' ", "issliced" : "0" }';
                    if (i + 1 != $(result.d).length) {
                        item = item + ',';
                    }

                    cadena2 = cadena2 + item;
                }
                cadena2 = cadena2 + '] }';
                if (inModo == 1) {
                    JsonDistribucionConceptos = cadena2;
                    var repositorioChartDur = new FusionCharts("doughnut2d", "chartContainer2_render" + Math.random(), FCWidth, FCHeight, "0");
                    repositorioChartDur.setJSONData(cadena2);
                    repositorioChartDur.setTransparent(true);
                    repositorioChartDur.render("chartContainer2");

                    AlinearTitulosGraficos();

                }
            } else {
                $("#chartContainer2 *").remove();
                $("#chartContainer2").append('<div style="font-size:medium; color:Gray; width: ' + FCWidth_ND + '; height: ' + FCHeight_ND + ';">No hay datos para mostrar.</div> ');
                datosGraficosSup++;
            }
            cont2++;
            MostrarOcultarGraficosSup();

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function Grafico_Pai_Proceso(inModo) {
    var str = $("#dwDesde").val();
    var vcMesInicial = str.substring(3) + '' + str.substring(0, 2);


    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "DashBoard_Solicitudes.aspx/Grafico_Pai_Proceso",
        data: "{'vcPeriodo':'" + vcMesInicial + "'," +
            "'vcIdTipSolTecAsi': '" + $("#hdfIdTipSolTecAsi").val() + "'," +
            "'vcIdTipSolTecPro': '" + $("#hdfIdTipSolTecPro").val() + "'," +
            "'vcIdTipSolTecCulAnu': '" + $("#hdfIdTipSolTecCulAnu").val() + "'," +
            "'vcCodEmp': '" + $("#hdfCodEmp").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            // ==============================================================================================================================
            if ($(result.d).length > 0) {
                var cadena2 = '';
                cadena2 = cadena2 + '{"chart":{';
                cadena2 = cadena2 + '"caption":"DISTRIBUCIÓN POR ESTADO","subCaption":"(Según solicitudes asignadas)", "subCaptionFontColor":"#9E9C9C","exportFileName":"DistribucionPorConceptos", ';
                cadena2 = cadena2 + '"captionAlignment":"left", "captionFontSize":"16", "subcaptionFontSize":"14", "subcaptionFontBold":"0", "toolTipColor": "ffffff", "exportenabled" : "1","exportShowMenuItem":"1",';
                cadena2 = cadena2 + '"baseFont":"Open Sans","baseFontColor":"6b737c", "bgAlpha":"25", "showShadow":"0", "use3DLighting":"0", "startingAngle": "0", "decimals": "2", ';
                cadena2 = cadena2 + '"toolTipBorderThickness":"0","toolTipBgColor":"#000000","toolTipBgAlpha":"80","toolTipBorderRadius":"2","toolTipPadding":"5",';
                cadena2 = cadena2 + '"showHoverEffect":"1","legendBgColor":"#ffffff", "legendItemFontSize": "12", "paletteColors": "#FFE019,#1D43A4,#78DC27,#0E2443,#1975EA", "legendItemFontColor": "#666666",   ';

                cadena2 = cadena2 + '"numberPrefix": "","legendBorderThickness": "0","legendShadow":"0","legendPosition": "right",';
                cadena2 = cadena2 + '"showPercentValues": "1", "showPercentInTooltip": "0", "enableSmartLabels": "0", "enableMultiSlicing": "0", "decimals": "' + oCulturaUsuario.dcNumDec + '",';
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

                //debugger;

                //SE PROCEDE A REALIZAR ESTE CAMBIO CUANDO SE MANEJAN NOMBRES DE ESTADOS IGUALES (PARA CLIENTE DE MEXICO), PERO NO AFECTA PARA OTROS CLIENTES, YA QUE LOS NOMBRES DE ESTADOS EN OTROS CLIENTES SON DISTINTOS. 
                let objDatosPie = []
                var conPos = 0;
                $.each(result.d, function (index, value) {
                    let nombreEstado = value.vcGrupo21.trim();
                    let color = value.vcGrupo05;
                    let posBusqueda = objDatosPie.map(x => x.nombre).indexOf(nombreEstado);
                    if (posBusqueda == -1) {
                        posBusqueda = conPos;
                        objDatosPie[posBusqueda] = {
                            nombre: nombreEstado,
                            color: color,
                            valores: []
                        }
                        conPos++;
                    }
                    objDatosPie[posBusqueda].valores.push({
                        valor: value.vcGrupo03
                    })

                });

                //debugger;
                for (let i = 0; i < objDatosPie.length; i++) {
                    let valor = 0;
                    for (let j = 0; j < objDatosPie[i].valores.length; j++) {
                        valor = valor + parseInt(objDatosPie[i].valores[j].valor)
                    }

                    var item = '{"label": "' + objDatosPie[i].nombre + '","alpha": "100","color": "' + objDatosPie[i].color + '","value": "' + valor.toString() + ' ", "issliced" : "0" }';
                    if (i + 1 != objDatosPie.length) {
                        item = item + ',';
                    }

                    cadena2 = cadena2 + item;
                }

                //var i = 0;
                //for (i = 0; i < $(result.d).length; i++) {

                //    var item = '{"label": "' + result.d[i].vcGrupo21 + '","alpha": "100","color": "' + result.d[i].vcGrupo05 + '","value": "' + result.d[i].vcGrupo03 + ' ", "issliced" : "0" }';
                //    if (i + 1 != $(result.d).length) {
                //        item = item + ',';
                //    }

                //    cadena2 = cadena2 + item;
                //}

                cadena2 = cadena2 + '] }';
                if (inModo == 1) {
                    JsonDistribucionConceptos = cadena2;
                    var repositorioChartDur = new FusionCharts("doughnut2d", "chartContainer2_render" + Math.random(), FCWidth, FCHeight, "0");
                    repositorioChartDur.setJSONData(cadena2);
                    repositorioChartDur.setTransparent(true);
                    repositorioChartDur.render("chartContainer2");

                    AlinearTitulosGraficos();

                }
            } else {
                $("#chartContainer2 *").remove();
                $("#chartContainer2").append('<div style="font-size:medium; color:Gray; width: ' + FCWidth_ND + '; height: ' + FCHeight_ND + ';">No hay datos para mostrar.</div> ');
                datosGraficosSup++;
            }
            cont2++;
            MostrarOcultarGraficosSup();

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function Grafico_TopTen_Aprobacion() {
    var str = $("#dwDesde").val();
    var vcMesInicial = str.substring(3) + '' + str.substring(0, 2);

    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "DashBoard_Solicitudes.aspx/Grafico_TopTen_Aprobacion",
        data: "{'vcPeriodo':'" + vcMesInicial + "'," +
            "'vcIdTipSolAprLeer': '" + $("#hdfIdTipSolAprLeer").val() + "'," +
            "'vcIdTipSolAprResp': '" + $("#hdfIdTipSolAprResp").val() + "'," +
            "'vcIdTipSolTecAsi': '" + $("#hdfIdTipSolTecAsi").val() + "'," +
            "'vcIdTipSolTecPro': '" + $("#hdfIdTipSolTecPro").val() + "'," +
            "'vcIdTipSolTecCulAnu': '" + $("#hdfIdTipSolTecCulAnu").val() + "'," +
            "'vcCodEmp': '" + $("#hdfCodEmp").val() + "'," +
            "'vcCodIntRes': '" + $("#hdfCodIntRes").val() + "'}",
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
                cadena = cadena + '"rotateValues":"1", "sformatnumber":"0", "showHoverEffect":"1", "showShadow":"0", "showXAxisLine":"1", ';
                cadena = cadena + '"showPercentValues":"0","showplotborder":"0", "valueFontColor":"", ';
                cadena = cadena + '"xAxisLineThickness":"1","maxLabelWidthPercent":"30", ';
                cadena = cadena + '"bgAlpha":"100", "canvasBgColor": "#ffffff", "canvasbgAlpha":"0", "canvasBorderAlpha":"0", "showAlternateHGridColor": "0",';
                cadena = cadena + '"captionAlignment":"left","showYAxisLine": "0", "showsyAxisLine": "0","divlineColor": "#999999",';
                cadena = cadena + '"divLineDashLen": "1","divLineDashed": "1","divLineGapLen": "0",';
                cadena = cadena + '"labeldisplay": "0","slantlabels": "1", "maxColWidth": "35", ';

                cadena = cadena + '"subCaption": "(Solicitudes agrupadas por Tipo de Solicitud)",';

                cadena = cadena + '"showYAxisValues": "1","showvalues": "0","seriesnameintooltip": "1","showlegend": "1","caption": "TOP TEN DE TIPO DE SOLICITUDES","xAxisName": "","yAxisName": "","numberPrefix": "",';
                cadena = cadena + '"bgColor": "#ffffff", "showBorder": "0", "showCanvasBorder": "0", "usePlotGradientColor": "0", "plotBorderAlpha": "25","theme": "fusion", "exportenabled" : "1","exportShowMenuItem":"1",';
                cadena = cadena + '"placeValuesInside": "1", "showAxisLines": "1", "xAxisLineColor": "#999999", "yAxisLineColor": "#FFFFFF", "axisLineAlpha": "10","divLineIsDashed": "1",';
                cadena = cadena + '"divLineAlpha": "30", "showAlternateVGridColor": "0", "captionFontSize": "16", "subcaptionFontSize": "12", "subcaptionFontBold": "0","numberscalevalue": "100,100,100",';
                cadena = cadena + '"formatNumberScale": "0", "formatNumber": "1", "forceDecimals": "0", "sdecimals": "0", "decimals": "0",';
                cadena = cadena + '"decimalSeparator": "", "thousandSeparator": ""';
                cadena = cadena + '';
                cadena = cadena + ' }, "categories": [ {"category": [';
                //debugger;
                var tiposolicitud = (result.d).map(item => item.vcGrupo03).filter((value, index, self) => self.indexOf(value) === index)
                var estado = (result.d).map(item => item.vcGrupo05).filter((value, index, self) => self.indexOf(value) === index)

                var i = 0;
                for (i = 0; i < tiposolicitud.length; i++) {
                    var item = '{"label": "' + tiposolicitud[i] + '" }';
                    if (i + 1 != tiposolicitud.length) {
                        item = item + ',';
                    }
                    cadena = cadena + item;
                }
                cadena = cadena + '] } ] , "dataset": [ ';

                for (i = 0; i < estado.length; i++) {

                    var valores = (result.d).filter(function (el) {
                        return el.vcGrupo05 == estado[i];
                    });

                    if (i == 0) {
                        cadena = cadena + ' {"seriesname": "' + valores[0].vcGrupo06 + '", "color":"' + valores[0].vcGrupo08 + '", "data": [';
                    }
                    else {
                        cadena = cadena + '] }, {"seriesname": "' + valores[0].vcGrupo06 + '", "color":"' + valores[0].vcGrupo08 + '", "data": [';
                    }

                    for (var j = 0; j < valores.length; j++) {
                        item = '{"value": "' + valores[j].vcGrupo07 + '", "label":"' + valores[j].vcGrupo06 + '","color": "' + valores[j].vcGrupo08 + '",';
                        item = item + '"alpha":"100",';
                        item = item + '"tooltext":"Cantidad: <b>' + (valores[j].vcGrupo07) + '</b>, Tipo: ' + valores[j].vcGrupo06 + '" }';
                        if (j + 1 != valores.length) {
                            item = item + ',';
                        }
                        cadena = cadena + item;
                    }
                }

                cadena = cadena + '] } ] }';

                JsonTopTenCosto = cadena;
                var valoraleatorio = Math.random();
                var IdGrafico = "chartContainer4_render" + valoraleatorio;

                if (FusionCharts(IdGrafico) === undefined) {
                    var repositorioChartDur = new FusionCharts("StackedBar2D", IdGrafico, FCWidth, FCHeight, "0");
                    repositorioChartDur.setJSONData(cadena);
                    repositorioChartDur.setTransparent(true);
                    repositorioChartDur.render("chartContainer4");
                } else {
                    FusionCharts(IdGrafico).setJSONData(cadena);
                }

                AlinearTitulosGraficos();

            } else {
                $("#chartContainer4 *").remove();
                $("#chartContainer4").append('<div style="font-size:medium; color:Gray; width: ' + FCWidth_ND + '; height: ' + FCHeight_ND + ';">No hay datos para mostrar.</div> ');
                datosGraficosSup++;
            }
            cont2++;
            MostrarOcultarGraficosSup();

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function Grafico_TopTen_Proceso() {
    var str = $("#dwDesde").val();
    var vcMesInicial = str.substring(3) + '' + str.substring(0, 2);

    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "DashBoard_Solicitudes.aspx/Grafico_TopTen_Proceso",
        data: "{'vcPeriodo':'" + vcMesInicial + "'," +
            "'vcIdTipSolAprLeer': '" + $("#hdfIdTipSolAprLeer").val() + "'," +
            "'vcIdTipSolAprResp': '" + $("#hdfIdTipSolAprResp").val() + "'," +
            "'vcIdTipSolTecAsi': '" + $("#hdfIdTipSolTecAsi").val() + "'," +
            "'vcIdTipSolTecPro': '" + $("#hdfIdTipSolTecPro").val() + "'," +
            "'vcIdTipSolTecCulAnu': '" + $("#hdfIdTipSolTecCulAnu").val() + "'," +
            "'vcCodEmp': '" + $("#hdfCodEmp").val() + "'," +
            "'vcCodIntRes': '" + $("#hdfCodIntRes").val() + "'}",
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
                cadena = cadena + '"rotateValues":"1", "sformatnumber":"0", "showHoverEffect":"1", "showShadow":"0", "showXAxisLine":"1", ';
                cadena = cadena + '"showPercentValues":"0","showplotborder":"0", "valueFontColor":"", ';
                cadena = cadena + '"xAxisLineThickness":"1","maxLabelWidthPercent":"30", ';
                cadena = cadena + '"bgAlpha":"100", "canvasBgColor": "#ffffff", "canvasbgAlpha":"0", "canvasBorderAlpha":"0", "showAlternateHGridColor": "0",';
                cadena = cadena + '"captionAlignment":"left","showYAxisLine": "0", "showsyAxisLine": "0","divlineColor": "#999999",';
                cadena = cadena + '"divLineDashLen": "1","divLineDashed": "1","divLineGapLen": "0",';
                cadena = cadena + '"labeldisplay": "0","slantlabels": "1", "maxColWidth": "35", ';

                cadena = cadena + '"subCaption": "(Solicitudes agrupadas por Tipo de Solicitud)",';

                cadena = cadena + '"showYAxisValues": "1","showvalues": "0","seriesnameintooltip": "1","showlegend": "1","caption": "TOP TEN DE TIPO DE SOLICITUDES","xAxisName": "","yAxisName": "","numberPrefix": "",';
                cadena = cadena + '"bgColor": "#ffffff", "showBorder": "0", "showCanvasBorder": "0", "usePlotGradientColor": "0", "plotBorderAlpha": "25","theme": "fusion", "exportenabled" : "1","exportShowMenuItem":"1",';
                cadena = cadena + '"placeValuesInside": "1", "showAxisLines": "1", "xAxisLineColor": "#999999", "yAxisLineColor": "#FFFFFF", "axisLineAlpha": "10","divLineIsDashed": "1",';
                cadena = cadena + '"divLineAlpha": "30", "showAlternateVGridColor": "0", "captionFontSize": "16", "subcaptionFontSize": "12", "subcaptionFontBold": "0","numberscalevalue": "100,100,100",';
                cadena = cadena + '"formatNumberScale": "0", "formatNumber": "1", "forceDecimals": "1", "sdecimals": "0", "decimals": "0",';
                cadena = cadena + '"decimalSeparator": "", "thousandSeparator": ""';
                cadena = cadena + '';
                cadena = cadena + ' }, "categories": [ {"category": [';
                //debugger;
                var tiposolicitud = (result.d).map(item => item.vcGrupo03).filter((value, index, self) => self.indexOf(value) === index)
                var estado = (result.d).map(item => item.vcGrupo05).filter((value, index, self) => self.indexOf(value) === index)

                var i = 0;
                for (i = 0; i < tiposolicitud.length; i++) {
                    var item = '{"label": "' + tiposolicitud[i] + '" }';
                    if (i + 1 != tiposolicitud.length) {
                        item = item + ',';
                    }
                    cadena = cadena + item;
                }
                cadena = cadena + '] } ] , "dataset": [ ';



                //debugger;

                //SE PROCEDE A REALIZAR ESTE CAMBIO CUANDO SE MANEJAN NOMBRES DE ESTADOS IGUALES (PARA CLIENTE DE MEXICO), PERO NO AFECTA PARA OTROS CLIENTES, YA QUE LOS NOMBRES DE ESTADOS EN OTROS CLIENTES SON DISTINTOS. 
                let objDatos = []
                var conPos2 = 0;
                $.each(result.d, function (index, value) {
                    let nombreEstado = value.vcGrupo06.trim();
                    let color = value.vcGrupo08;
                    let posBusqueda = objDatos.map(x => x.nombre).indexOf(nombreEstado);
                    if (posBusqueda == -1) {
                        posBusqueda = conPos2;
                        objDatos[posBusqueda] = {
                            nombre: nombreEstado,
                            color: color,
                            SubTipos: []
                        }
                        conPos2++;
                    }
                    let posBusquedaDet = objDatos[posBusqueda].SubTipos.map(x => x.nombreTipo).indexOf(value.vcGrupo03);
                    let longDet = objDatos[posBusqueda].SubTipos.length;
                    if (posBusquedaDet == -1) {
                        posBusquedaDet = longDet;
                        objDatos[posBusqueda].SubTipos.push({
                            nombreTipo: value.vcGrupo03,
                            valores: []
                        })
                    }

                    objDatos[posBusqueda].SubTipos[posBusquedaDet].valores.push({
                        valor: value.vcGrupo07
                    })


                });

                //debugger;
                for (var i = 0; i < objDatos.length; i++) {
                    if (i == 0) {
                        cadena = cadena + ' {"seriesname": "' + objDatos[i].nombre + '", "color":"' + objDatos[i].color + '", "data": [';
                    }
                    else {
                        cadena = cadena + '] }, {"seriesname": "' + objDatos[i].nombre + '", "color":"' + objDatos[i].color + '", "data": [';
                    }


                    var valores = (objDatos).filter(function (el) {
                        return el.nombre == objDatos[i].nombre;
                    });


                    for (var j = 0; j < valores[0].SubTipos.length; j++) {
                        let valor = 0

                        for (let k = 0; k < valores[0].SubTipos[j].valores.length; k++) {
                            valor = valor + parseInt(valores[0].SubTipos[j].valores[k].valor);
                        }

                        item = '{"value": "' + valor.toString() + '", "label":"' + valores[0].SubTipos[j].nombreTipo + '","color": "' + valores[0].color + '",';
                        item = item + '"alpha":"100",';
                        item = item + '"tooltext":"Cantidad: <b>' + (valor.toString()) + '</b>, Tipo: ' + valores[0].SubTipos[j].nombreTipo + '" }';
                        if (j + 1 != valores[0].SubTipos.length) {
                            item = item + ',';
                        }
                        cadena = cadena + item;
                    }

                    //item = '{"value": "' + valor.toString() + '", "label":"' + objDatos[i].nombre + '","color": "' + objDatos[i].color + '",';
                    //item = item + '"alpha":"100",';
                    //item = item + '"tooltext":"Cantidad: <b>' + (valor.toString()) + '</b>, Tipo: ' + objDatos[i].nombre + '" }';
                    //if (i + 1 != objDatos.length) {
                    //    item = item + ',';
                    //}
                    //cadena = cadena + item;


                }



                //for (i = 0; i < estado.length; i++) {
                //    var valores = (result.d).filter(function (el) {
                //        return el.vcGrupo05 == estado[i];
                //    });
                //    if (i == 0) {
                //        cadena = cadena + ' {"seriesname": "' + valores[0].vcGrupo06 + '", "color":"' + valores[0].vcGrupo08 + '", "data": [';
                //    }
                //    else {
                //        cadena = cadena + '] }, {"seriesname": "' + valores[0].vcGrupo06 + '", "color":"' + valores[0].vcGrupo08 + '", "data": [';
                //    }

                //    for (var j = 0; j < valores.length; j++) {
                //        item = '{"value": "' + valores[j].vcGrupo07 + '", "label":"' + valores[j].vcGrupo06 + '","color": "' + valores[j].vcGrupo08 + '",';
                //        item = item + '"alpha":"100",';
                //        item = item + '"tooltext":"Cantidad: <b>' + (valores[j].vcGrupo07) + '</b>, Tipo: ' + valores[j].vcGrupo06 + '" }';
                //        if (j + 1 != valores.length) {
                //            item = item + ',';
                //        }
                //        cadena = cadena + item;
                //    }

                //}

                cadena = cadena + '] } ] }';

                JsonTopTenCosto = cadena;
                var valoraleatorio = Math.random();
                var IdGrafico = "chartContainer4_render" + valoraleatorio;

                if (FusionCharts(IdGrafico) === undefined) {
                    var repositorioChartDur = new FusionCharts("StackedBar2D", IdGrafico, FCWidth, FCHeight, "0");
                    repositorioChartDur.setJSONData(cadena);
                    repositorioChartDur.setTransparent(true);
                    repositorioChartDur.render("chartContainer4");
                } else {
                    FusionCharts(IdGrafico).setJSONData(cadena);
                }

                AlinearTitulosGraficos();

            } else {
                $("#chartContainer4 *").remove();
                $("#chartContainer4").append('<div style="font-size:medium; color:Gray; width: ' + FCWidth_ND + '; height: ' + FCHeight_ND + ';">No hay datos para mostrar.</div> ');
                datosGraficosSup++;
            }
            cont2++;
            MostrarOcultarGraficosSup();

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function Grafico_Umbrales_Aprobados() {
    var str = $("#dwDesde").val();
    var vcMesInicial = str.substring(3) + '' + str.substring(0, 2);

    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "DashBoard_Solicitudes.aspx/Grafico_Umbrales_Aprobados",
        data: "{'vcPeriodo':'" + vcMesInicial + "'," +
            "'vcIdTipSolAprLeer': '" + $("#hdfIdTipSolAprLeer").val() + "'," +
            "'vcIdTipSolAprResp': '" + $("#hdfIdTipSolAprResp").val() + "'," +
            "'vcCodEmp': '" + $("#hdfCodEmp").val() + "'," +
            "'vcCodIntRes': '" + $("#hdfCodIntRes").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            // ==============================================================================================================================             
            if ($(result.d).length > 0) {

                var PaletaColores = '#01B8AA';
                var valueFontColor = "#FFFFFF'";

                var cadena = '';
                cadena = cadena + '{"chart": {';
                cadena = cadena + '"baseFont":"Open Sans", "baseFontColor": "#6b737c", "legendBorderThickness": "0","legendShadow":"0","exportFileName":"TopTenCosto",';
                cadena = cadena + '"subCaptionFontColor":"#9E9C9C","divlineThickness":"1","canvasbasecolor": "#CCCCCC", "snumberprefix": "",';
                cadena = cadena + '"legendItemFontColor":"#666666", "legendItemFontSize":"10",';
                cadena = cadena + '"rotateValues":"1", "sformatnumber":"0", "showHoverEffect":"1", "showShadow":"0", "showXAxisLine":"1", ';
                cadena = cadena + '"showPercentValues":"0","showplotborder":"0", "valueFontColor":"' + valueFontColor + '", ';
                cadena = cadena + '"xAxisLineThickness":"1","maxLabelWidthPercent":"30", ';
                cadena = cadena + '"bgAlpha":"100", "canvasBgColor": "#ffffff", "canvasbgAlpha":"0", "canvasBorderAlpha":"0", "showAlternateHGridColor": "0",';
                cadena = cadena + '"captionAlignment":"left","showYAxisLine": "0", "showsyAxisLine": "0","divlineColor": "#999999",';
                cadena = cadena + '"divLineDashLen": "1","divLineDashed": "1","divLineGapLen": "0",';
                cadena = cadena + '"labeldisplay": "0","slantlabels": "1", "maxColWidth": "35", ';

                cadena = cadena + '"subCaption": "(Solicitudes agrupadas por Tipo de Solicitud)",';

                cadena = cadena + '"showYAxisValues": "1","showvalues": "0","seriesnameintooltip": "1","showlegend": "1","caption": "UMBRALES APROBADOS","xAxisName": "","yAxisName": "","numberPrefix": "",';
                cadena = cadena + '"bgColor": "#ffffff", "showBorder": "0", "showCanvasBorder": "0", "usePlotGradientColor": "0", "plotBorderAlpha": "25","theme": "fusion", "exportenabled" : "1","exportShowMenuItem":"1",';
                cadena = cadena + '"placeValuesInside": "1", "showAxisLines": "1", "xAxisLineColor": "#999999", "yAxisLineColor": "#FFFFFF", "axisLineAlpha": "10","divLineIsDashed": "1",';
                cadena = cadena + '"divLineAlpha": "30", "showAlternateVGridColor": "0", "captionFontSize": "16", "subcaptionFontSize": "12", "subcaptionFontBold": "0","numberscalevalue": "100,100,100",';
                cadena = cadena + '"formatNumberScale": "0", "formatNumber": "1", "forceDecimals": "1", "sdecimals": "0", "decimals": "0",';
                cadena = cadena + '"decimalSeparator": "' + oCulturaUsuario.vcSimDec + '", "thousandSeparator": "' + oCulturaUsuario.vcSimSepMil + '"';
                cadena = cadena + '';
                cadena = cadena + ' }, "categories": [ {"category": [';

                var tiposolicitud = (result.d).map(item => item.vcGrupo03).filter((value, index, self) => self.indexOf(value) === index)
                var estado = (result.d).map(item => item.vcGrupo05).filter((value, index, self) => self.indexOf(value) === index)

                var i = 0;
                for (i = 0; i < tiposolicitud.length; i++) {
                    var item = '{"label": "' + tiposolicitud[i] + '" }';
                    if (i + 1 != tiposolicitud.length) {
                        item = item + ',';
                    }
                    cadena = cadena + item;
                }
                cadena = cadena + '] } ] , "dataset": [ ';

                for (i = 0; i < estado.length; i++) {

                    var valores = (result.d).filter(function (el) {
                        return el.vcGrupo05 == estado[i];
                    });

                    if (i == 0) {
                        cadena = cadena + ' {"seriesname": "' + valores[0].vcGrupo06 + '", "color":"' + valores[0].vcGrupo08 + '", "data": [';
                    }
                    else {
                        cadena = cadena + '] }, {"seriesname": "' + valores[0].vcGrupo06 + '", "color":"' + valores[0].vcGrupo08 + '", "data": [';
                    }

                    for (var j = 0; j < valores.length; j++) {
                        item = '{"value": "' + valores[j].vcGrupo07 + '", "label":"' + valores[j].vcGrupo06 + '","color": "' + valores[j].vcGrupo08 + '",';
                        item = item + '"alpha":"100",';
                        item = item + '"tooltext":"Cantidad: <b>' + (valores[j].vcGrupo07) + '</b>, Tipo: ' + valores[j].vcGrupo06 + '" }';
                        if (j + 1 != valores.length) {
                            item = item + ',';
                        }
                        cadena = cadena + item;
                    }
                }

                cadena = cadena + '] } ] }';

                JsonTopTenCosto = cadena;
                var valoraleatorio = Math.random();
                var IdGrafico = "chartContainer5_render" + valoraleatorio;

                if (FusionCharts(IdGrafico) === undefined) {
                    var repositorioChartDur = new FusionCharts("stackedcolumn2d", IdGrafico, FCWidth, FCHeight, "0");
                    repositorioChartDur.setJSONData(cadena);
                    repositorioChartDur.setTransparent(true);
                    repositorioChartDur.render("chartContainer5");
                } else {
                    FusionCharts(IdGrafico).setJSONData(cadena);
                }

                AlinearTitulosGraficos();

            } else {
                $("#chartContainer5 *").remove();
                $("#chartContainer5").append('<div style="font-size:medium; color:Gray; width: ' + FCWidth_ND + '; height: ' + FCHeight_ND + ';">No hay datos para mostrar.</div> ');
                datosUmbrales++;
            }
            cont1++;
            MostrarOcultarSeccionUmbrales();

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function Grafico_Umbrales_PorAprobar() {
    var str = $("#dwDesde").val();
    var vcMesInicial = str.substring(3) + '' + str.substring(0, 2);

    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "DashBoard_Solicitudes.aspx/Grafico_Umbrales_PorAprobar",
        data: "{'vcPeriodo':'" + vcMesInicial + "'," +
            "'vcIdTipSolAprLeer': '" + $("#hdfIdTipSolAprLeer").val() + "'," +
            "'vcIdTipSolAprResp': '" + $("#hdfIdTipSolAprResp").val() + "'," +
            "'vcCodEmp': '" + $("#hdfCodEmp").val() + "'," +
            "'vcCodIntRes': '" + $("#hdfCodIntRes").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            // ==============================================================================================================================             
            if ($(result.d).length > 0) {

                var PaletaColores = '#01B8AA';
                var valueFontColor = "#FFFFFF'";

                var cadena = '';
                cadena = cadena + '{"chart": {';
                cadena = cadena + '"baseFont":"Open Sans", "baseFontColor": "#6b737c", "legendBorderThickness": "0","legendShadow":"0","exportFileName":"TopTenCosto",';
                cadena = cadena + '"subCaptionFontColor":"#9E9C9C","divlineThickness":"1","canvasbasecolor": "#CCCCCC", "snumberprefix": "",';
                cadena = cadena + '"legendItemFontColor":"#666666", "legendItemFontSize":"10",';
                cadena = cadena + '"rotateValues":"1", "sformatnumber":"0", "showHoverEffect":"1", "showShadow":"0", "showXAxisLine":"1", ';
                cadena = cadena + '"showPercentValues":"0","showplotborder":"0", "valueFontColor":"' + valueFontColor + '", ';
                cadena = cadena + '"xAxisLineThickness":"1","maxLabelWidthPercent":"30", ';
                cadena = cadena + '"bgAlpha":"100", "canvasBgColor": "#ffffff", "canvasbgAlpha":"0", "canvasBorderAlpha":"0", "showAlternateHGridColor": "0",';
                cadena = cadena + '"captionAlignment":"left","showYAxisLine": "0", "showsyAxisLine": "0","divlineColor": "#999999",';
                cadena = cadena + '"divLineDashLen": "1","divLineDashed": "1","divLineGapLen": "0",';
                cadena = cadena + '"labeldisplay": "0","slantlabels": "1", "maxColWidth": "35", ';

                cadena = cadena + '"subCaption": "(Solicitudes agrupadas por Tipo de Solicitud)",';

                cadena = cadena + '"showYAxisValues": "1","showvalues": "0","seriesnameintooltip": "1","showlegend": "1","caption": "UMBRALES POR APROBAR","xAxisName": "","yAxisName": "","numberPrefix": "",';
                cadena = cadena + '"bgColor": "#ffffff", "showBorder": "0", "showCanvasBorder": "0", "usePlotGradientColor": "0", "plotBorderAlpha": "25","theme": "fusion", "exportenabled" : "1","exportShowMenuItem":"1",';
                cadena = cadena + '"placeValuesInside": "1", "showAxisLines": "1", "xAxisLineColor": "#999999", "yAxisLineColor": "#FFFFFF", "axisLineAlpha": "10","divLineIsDashed": "1",';
                cadena = cadena + '"divLineAlpha": "30", "showAlternateVGridColor": "0", "captionFontSize": "16", "subcaptionFontSize": "12", "subcaptionFontBold": "0","numberscalevalue": "100,100,100",';
                cadena = cadena + '"formatNumberScale": "0", "formatNumber": "1", "forceDecimals": "1", "sdecimals": "0", "decimals": "0",';
                cadena = cadena + '"decimalSeparator": "' + oCulturaUsuario.vcSimDec + '", "thousandSeparator": "' + oCulturaUsuario.vcSimSepMil + '"';
                cadena = cadena + '';
                cadena = cadena + ' }, "categories": [ {"category": [';

                var tiposolicitud = (result.d).map(item => item.vcGrupo03).filter((value, index, self) => self.indexOf(value) === index)
                var estado = (result.d).map(item => item.vcGrupo05).filter((value, index, self) => self.indexOf(value) === index)

                var i = 0;
                for (i = 0; i < tiposolicitud.length; i++) {
                    var item = '{"label": "' + tiposolicitud[i] + '" }';
                    if (i + 1 != tiposolicitud.length) {
                        item = item + ',';
                    }
                    cadena = cadena + item;
                }
                cadena = cadena + '] } ] , "dataset": [ ';

                for (i = 0; i < estado.length; i++) {

                    var valores = (result.d).filter(function (el) {
                        return el.vcGrupo05 == estado[i];
                    });

                    if (i == 0) {
                        cadena = cadena + ' {"seriesname": "' + valores[0].vcGrupo06 + '", "color":"' + valores[0].vcGrupo08 + '", "data": [';
                    }
                    else {
                        cadena = cadena + '] }, {"seriesname": "' + valores[0].vcGrupo06 + '", "color":"' + valores[0].vcGrupo08 + '", "data": [';
                    }

                    for (var j = 0; j < valores.length; j++) {
                        item = '{"value": "' + valores[j].vcGrupo07 + '", "label":"' + valores[j].vcGrupo06 + '","color": "' + valores[j].vcGrupo08 + '",';
                        item = item + '"alpha":"100",';
                        item = item + '"tooltext":"Cantidad: <b>' + (valores[j].vcGrupo07) + '</b>, Tipo: ' + valores[j].vcGrupo06 + '" }';
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
                    var repositorioChartDur = new FusionCharts("stackedcolumn2d", IdGrafico, FCWidth, FCHeight, "0");
                    repositorioChartDur.setJSONData(cadena);
                    repositorioChartDur.setTransparent(true);
                    repositorioChartDur.render("chartContainer6");
                } else {
                    FusionCharts(IdGrafico).setJSONData(cadena);
                }

                AlinearTitulosGraficos();

            } else {
                $("#chartContainer6 *").remove();
                $("#chartContainer6").append('<div style="font-size:medium; color:Gray; width: ' + FCWidth_ND + '; height: ' + FCHeight_ND + ';">No hay datos para mostrar.</div> ');
                datosUmbrales++;
            }
            cont1++;
            MostrarOcultarSeccionUmbrales();

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function Grafico_Umbrales_EnProceso() {
    var str = $("#dwDesde").val();
    var vcMesInicial = str.substring(3) + '' + str.substring(0, 2);

    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "DashBoard_Solicitudes.aspx/Grafico_Umbrales_EnProceso",
        data: "{'vcPeriodo':'" + vcMesInicial + "'," +
            "'vcIdTipSolTecAsi': '" + $("#hdfIdTipSolTecAsi").val() + "'," +
            "'vcIdTipSolTecPro': '" + $("#hdfIdTipSolTecPro").val() + "'," +
            "'vcIdTipSolTecCulAnu': '" + $("#hdfIdTipSolTecCulAnu").val() + "'," +
            "'vcCodEmp': '" + $("#hdfCodEmp").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            // ==============================================================================================================================             
            if ($(result.d).length > 0) {

                var PaletaColores = '#01B8AA';
                var valueFontColor = "#FFFFFF'";

                var cadena = '';
                cadena = cadena + '{"chart": {';
                cadena = cadena + '"baseFont":"Open Sans", "baseFontColor": "#6b737c", "legendBorderThickness": "0","legendShadow":"0","exportFileName":"TopTenCosto",';
                cadena = cadena + '"subCaptionFontColor":"#9E9C9C","divlineThickness":"1","canvasbasecolor": "#CCCCCC", "snumberprefix": "",';
                cadena = cadena + '"legendItemFontColor":"#666666", "legendItemFontSize":"10",';
                cadena = cadena + '"rotateValues":"1", "sformatnumber":"1", "showHoverEffect":"1", "showShadow":"0", "showXAxisLine":"1", ';
                cadena = cadena + '"showPercentValues":"0","showplotborder":"0", "valueFontColor":"' + valueFontColor + '", ';
                cadena = cadena + '"xAxisLineThickness":"1","maxLabelWidthPercent":"30", ';
                cadena = cadena + '"bgAlpha":"100", "canvasBgColor": "#ffffff", "canvasbgAlpha":"0", "canvasBorderAlpha":"0", "showAlternateHGridColor": "0",';
                cadena = cadena + '"captionAlignment":"left","showYAxisLine": "0", "showsyAxisLine": "0","divlineColor": "#999999",';
                cadena = cadena + '"divLineDashLen": "1","divLineDashed": "1","divLineGapLen": "0",';
                cadena = cadena + '"labeldisplay": "0","slantlabels": "1", "maxColWidth": "35", ';

                cadena = cadena + '"subCaption": "(Solicitudes agrupadas por Tipo de Solicitud)",';

                cadena = cadena + '"showYAxisValues": "1","showvalues": "0","seriesnameintooltip": "1","showlegend": "1","caption": "UMBRALES EN PROCESO","xAxisName": "","yAxisName": "","numberPrefix": "",';
                cadena = cadena + '"bgColor": "#ffffff", "showBorder": "0", "showCanvasBorder": "0", "usePlotGradientColor": "0", "plotBorderAlpha": "25","theme": "fusion", "exportenabled" : "1","exportShowMenuItem":"1",';
                cadena = cadena + '"placeValuesInside": "1", "showAxisLines": "1", "xAxisLineColor": "#999999", "yAxisLineColor": "#FFFFFF", "axisLineAlpha": "10","divLineIsDashed": "1",';
                cadena = cadena + '"divLineAlpha": "30", "showAlternateVGridColor": "0", "captionFontSize": "16", "subcaptionFontSize": "12", "subcaptionFontBold": "0","numberscalevalue": "100,100,100",';
                cadena = cadena + '"formatNumberScale": "0", "formatNumber": "1", "forceDecimals": "0", "sdecimals": "0", "decimals": "0",';
                cadena = cadena + '{cantidadMinima}';
                cadena = cadena + '"decimalSeparator": "' + oCulturaUsuario.vcSimDec + '", "thousandSeparator": "' + oCulturaUsuario.vcSimSepMil + '"';
                //cadena = cadena + ',"plotfillpercent": "230",';

                //cadena = cadena + '"maxColWidth": "10"';
                cadena = cadena + '';
                cadena = cadena + ' }, "categories": [ {"category": [';

                var tiposolicitud = (result.d).map(item => item.vcGrupo03).filter((value, index, self) => self.indexOf(value) === index)
                var estado = (result.d).map(item => item.vcGrupo05).filter((value, index, self) => self.indexOf(value) === index)

                var i = 0;
                for (i = 0; i < tiposolicitud.length; i++) {
                    var item = '{"label": "' + tiposolicitud[i] + '" }';
                    if (i + 1 != tiposolicitud.length) {
                        item = item + ',';
                    }
                    cadena = cadena + item;
                }
                cadena = cadena + '] } ] , "dataset": [ ';



                let totalTipoSol = 0;
                let cantMaxUmb1 = 0;
                let cantMaxUmb2 = 0;
                let cantMaxUmb3 = 0;
                //debugger;
                for (i = 0; i < estado.length; i++) {

                    var valores = (result.d).filter(function (el) {
                        return el.vcGrupo05 == estado[i];
                    });

                    if (i == 0) {
                        cadena = cadena + ' {"seriesname": "' + valores[0].vcGrupo06 + '", "color":"' + valores[0].vcGrupo08 + '", "data": [';
                    }
                    else {
                        cadena = cadena + '] }, {"seriesname": "' + valores[0].vcGrupo06 + '", "color":"' + valores[0].vcGrupo08 + '", "data": [';
                    }

                    for (var j = 0; j < valores.length; j++) {
                        item = '{"value": "' + valores[j].vcGrupo07 + '", "label":"' + valores[j].vcGrupo06 + '","color": "' + valores[j].vcGrupo08 + '",';
                        item = item + '"alpha":"100",';
                        item = item + '"tooltext":"Cantidad: <b>' + (valores[j].vcGrupo07) + '</b>, Tipo: ' + valores[j].vcGrupo06 + '" }';
                        if (j + 1 != valores.length) {
                            item = item + ',';
                        }
                        cadena = cadena + item;


                        if (estado[i] == "1") {
                            if (cantMaxUmb1 < parseInt(valores[j].vcGrupo07)) {
                                cantMaxUmb1 = parseInt(valores[j].vcGrupo07)
                            }
                        } else if (estado[i] == "2") {
                            if (cantMaxUmb2 < parseInt(valores[j].vcGrupo07)) {
                                cantMaxUmb2 = parseInt(valores[j].vcGrupo07)
                            }
                        } else if (estado[i] == "3") {
                            if (cantMaxUmb3 < parseInt(valores[j].vcGrupo07)) {
                                cantMaxUmb3 = parseInt(valores[j].vcGrupo07)
                            }
                        }

                    }


                }
                totalTipoSol = cantMaxUmb1 + cantMaxUmb2 + cantMaxUmb3

                cadena = cadena + '] } ] }';
                if (totalTipoSol < 5) {
                    cadena = cadena.replace('{cantidadMinima}', '"YAxisMaxValue":"' + (totalTipoSol + 1).toString() + '", "numDivLines":"' + totalTipoSol.toString() + '", ')
                }
                else {
                    cadena = cadena.replace('{cantidadMinima}', '')
                }
                

                JsonTopTenCosto = cadena;
                var valoraleatorio = Math.random();
                var IdGrafico = "chartContainer6_render" + valoraleatorio;
                //debugger;
                if (FusionCharts(IdGrafico) === undefined) {
                    //var repositorioChartDur = new FusionCharts("stackedcolumn2d", IdGrafico, FCWidth, FCHeight, "0");
                    var repositorioChartDur = new FusionCharts("scrollstackedcolumn2d", IdGrafico, FCWidth, FCHeight, "0");
                    repositorioChartDur.setJSONData(cadena);
                    repositorioChartDur.setTransparent(true);
                    repositorioChartDur.render("chartContainer6");
                } else {
                    FusionCharts(IdGrafico).setJSONData(cadena);
                }
                AlinearTitulosGraficos();

            } else {
                $("#chartContainer6 *").remove();
                $("#chartContainer6").append('<div style="font-size:medium; color:Gray; width: ' + FCWidth_ND + '; height: ' + FCHeight_ND + ';">No hay datos para mostrar.</div> ');
                datosUmbrales++;
            }
            cont1++;
            MostrarOcultarSeccionUmbrales();

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function Grafico_Umbrales_PorAsignar() {
    var str = $("#dwDesde").val();
    var vcMesInicial = str.substring(3) + '' + str.substring(0, 2);

    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "DashBoard_Solicitudes.aspx/Grafico_Umbrales_PorAsignar",
        data: "{'vcPeriodo':'" + vcMesInicial + "'," +
            "'vcIdTipSolTecAsi': '" + $("#hdfIdTipSolTecAsi").val() + "'," +
            "'vcIdTipSolTecPro': '" + $("#hdfIdTipSolTecPro").val() + "'," +
            "'vcIdTipSolTecCulAnu': '" + $("#hdfIdTipSolTecCulAnu").val() + "'," +
            "'vcCodEmp': '" + $("#hdfCodEmp").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            debugger;
            // ==============================================================================================================================             
            if ($(result.d).length > 0) {

                $("#dvPanelPorAsignar").show();
                $("#dvPanelUmbralesProceso").removeClass("col-lg-12 col-sm-12").addClass("col-lg-6 col-sm-6");

                var PaletaColores = '#01B8AA';
                var valueFontColor = "#FFFFFF'";

                var cadena = '';
                cadena = cadena + '{"chart": {';
                cadena = cadena + '"baseFont":"Open Sans", "baseFontColor": "#6b737c", "legendBorderThickness": "0","legendShadow":"0","exportFileName":"TopTenCosto",';
                cadena = cadena + '"subCaptionFontColor":"#9E9C9C","divlineThickness":"1","canvasbasecolor": "#CCCCCC", "snumberprefix": "",';
                cadena = cadena + '"legendItemFontColor":"#666666", "legendItemFontSize":"10",';
                cadena = cadena + '"rotateValues":"1", "sformatnumber":"0", "showHoverEffect":"1", "showShadow":"0", "showXAxisLine":"1", ';
                cadena = cadena + '"showPercentValues":"0","showplotborder":"0", "valueFontColor":"' + valueFontColor + '", ';
                cadena = cadena + '"xAxisLineThickness":"1","maxLabelWidthPercent":"30", ';
                cadena = cadena + '"bgAlpha":"100", "canvasBgColor": "#ffffff", "canvasbgAlpha":"0", "canvasBorderAlpha":"0", "showAlternateHGridColor": "0",';
                cadena = cadena + '"captionAlignment":"left","showYAxisLine": "0", "showsyAxisLine": "0","divlineColor": "#999999",';
                cadena = cadena + '"divLineDashLen": "1","divLineDashed": "1","divLineGapLen": "0",';
                cadena = cadena + '"labeldisplay": "0","slantlabels": "1", "maxColWidth": "35", ';

                cadena = cadena + '"subCaption": "(Solicitudes agrupadas por Tipo de Solicitud)",';

                cadena = cadena + '"showYAxisValues": "1","showvalues": "0","seriesnameintooltip": "1","showlegend": "1","caption": "UMBRALES POR ASIGNAR","xAxisName": "","yAxisName": "","numberPrefix": "",';
                cadena = cadena + '"bgColor": "#ffffff", "showBorder": "0", "showCanvasBorder": "0", "usePlotGradientColor": "0", "plotBorderAlpha": "25","theme": "fusion", "exportenabled" : "1","exportShowMenuItem":"1",';
                cadena = cadena + '"placeValuesInside": "1", "showAxisLines": "1", "xAxisLineColor": "#999999", "yAxisLineColor": "#FFFFFF", "axisLineAlpha": "10","divLineIsDashed": "1",';
                cadena = cadena + '"divLineAlpha": "30", "showAlternateVGridColor": "0", "captionFontSize": "16", "subcaptionFontSize": "12", "subcaptionFontBold": "0","numberscalevalue": "100,100,100",';
                cadena = cadena + '"formatNumberScale": "0", "formatNumber": "1", "forceDecimals": "1", "sdecimals": "0", "decimals": "0",';
                cadena = cadena + '"decimalSeparator": "' + oCulturaUsuario.vcSimDec + '", "thousandSeparator": "' + oCulturaUsuario.vcSimSepMil + '"';
                cadena = cadena + '';
                cadena = cadena + ' }, "categories": [ {"category": [';

                var tiposolicitud = (result.d).map(item => item.vcGrupo03).filter((value, index, self) => self.indexOf(value) === index)
                var estado = (result.d).map(item => item.vcGrupo05).filter((value, index, self) => self.indexOf(value) === index)

                var i = 0;
                for (i = 0; i < tiposolicitud.length; i++) {
                    var item = '{"label": "' + tiposolicitud[i] + '" }';
                    if (i + 1 != tiposolicitud.length) {
                        item = item + ',';
                    }
                    cadena = cadena + item;
                }
                cadena = cadena + '] } ] , "dataset": [ ';

                for (i = 0; i < estado.length; i++) {

                    var valores = (result.d).filter(function (el) {
                        return el.vcGrupo05 == estado[i];
                    });

                    if (i == 0) {
                        cadena = cadena + ' {"seriesname": "' + valores[0].vcGrupo06 + '", "color":"' + valores[0].vcGrupo08 + '", "data": [';
                    }
                    else {
                        cadena = cadena + '] }, {"seriesname": "' + valores[0].vcGrupo06 + '", "color":"' + valores[0].vcGrupo08 + '", "data": [';
                    }

                    for (var j = 0; j < valores.length; j++) {
                        item = '{"value": "' + valores[j].vcGrupo07 + '", "label":"' + valores[j].vcGrupo06 + '","color": "' + valores[j].vcGrupo08 + '",';
                        item = item + '"alpha":"100",';
                        item = item + '"tooltext":"Cantidad: <b>' + (valores[j].vcGrupo07) + '</b>, Tipo: ' + valores[j].vcGrupo06 + '" }';
                        if (j + 1 != valores.length) {
                            item = item + ',';
                        }
                        cadena = cadena + item;
                    }
                }

                cadena = cadena + '] } ] }';

                JsonTopTenCosto = cadena;
                var valoraleatorio = Math.random();
                var IdGrafico = "chartContainer5_render" + valoraleatorio;

                if (FusionCharts(IdGrafico) === undefined) {
                    var repositorioChartDur = new FusionCharts("stackedcolumn2d", IdGrafico, FCWidth, FCHeight, "0");
                    repositorioChartDur.setJSONData(cadena);
                    repositorioChartDur.setTransparent(true);
                    repositorioChartDur.render("chartContainer5");
                } else {
                    FusionCharts(IdGrafico).setJSONData(cadena);
                }

                AlinearTitulosGraficos();

            } else {
                $("#chartContainer5 *").remove();
                $("#chartContainer5").append('<div style="font-size:medium; color:Gray; width: ' + FCWidth_ND + '; height: ' + FCHeight_ND + ';">No hay datos para mostrar.</div> ');
                datosUmbrales++;
                $("#dvPanelPorAsignar").hide();
                $("#dvPanelUmbralesProceso").removeClass("col-lg-6 col-sm-6").addClass("col-lg-12 col-sm-12");
            }
            cont1++;
            MostrarOcultarSeccionUmbrales();

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function Grafico_Periodo_Aprobacion() {
    var str = $("#dwDesde").val();
    var vcMesInicial = str.substring(3) + '' + str.substring(0, 2);
    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "DashBoard_Solicitudes.aspx/Grafico_TotalPeriodo_Aprobacion",
        data: "{'vcPeriodo':'" + vcMesInicial + "'," +
            "'vcTipSolAprLeer': '" + $("#hdfIdTipSolAprLeer").val() + "'," +
            "'vcTipSolAprResp': '" + $("#hdfIdTipSolAprResp").val() + "'," +
            "'vcTipSolTecAsi': '" + $("#hdfIdTipSolTecAsi").val() + "'," +
            "'vcTipSolTecPro': '" + $("#hdfIdTipSolTecPro").val() + "'," +
            "'vcTipSolTecCulAnu': '" + $("#hdfIdTipSolTecCulAnu").val() + "'," +
            "'vcCodEmp': '" + $("#hdfCodEmp").val() + "'," +
            "'vcCodIntRes': '" + $("#hdfCodIntRes").val() + "'," +
            "'vcIdEstado': '" + $("#ddlEstado").val() + "'," +
            "'vcNroMeses': '" + $("#ddlNroMes").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            // ==============================================================================================================================             
            if ($(result.d).length > 0) {

                var PaletaColores = '#01B8AA';
                var valueFontColor = "#FFFFFF'";

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

                cadena = cadena + '"subCaption": "(Solicitudes agrupadas por Tipo de Solicitud)",';

                cadena = cadena + '"drawcrossline": "1", "showsum": "1","showYAxisValues": "1","showvalues": "0","seriesnameintooltip": "1","showlegend": "1","caption": "HISTÓRICO DE CREACIÓN DE SOLICITUDES POR ESTADO","xAxisName": "","yAxisName": "","numberPrefix": "",';
                cadena = cadena + '"bgColor": "#ffffff", "showBorder": "0", "showCanvasBorder": "0", "usePlotGradientColor": "0", "plotBorderAlpha": "25","theme": "fusion", "exportenabled" : "1","exportShowMenuItem":"1",';
                cadena = cadena + '"placeValuesInside": "1", "showAxisLines": "1", "xAxisLineColor": "#999999", "yAxisLineColor": "#FFFFFF", "axisLineAlpha": "10","divLineIsDashed": "1",';
                cadena = cadena + '"divLineAlpha": "30", "showAlternateVGridColor": "0", "captionFontSize": "16", "subcaptionFontSize": "12", "subcaptionFontBold": "0","numberscalevalue": "100,100,100",';
                cadena = cadena + '"formatNumberScale": "0", "formatNumber": "1", "forceDecimals": "1", "sdecimals": "0", "decimals": "0",';
                cadena = cadena + '"decimalSeparator": "", "thousandSeparator": ""';
                cadena = cadena + '';
                cadena = cadena + ' }, "categories": [ {"category": [';

                var periodo = (result.d).map(item => item.vcGrupo01).filter((value, index, self) => self.indexOf(value) === index)
                var tiposolicitud = (result.d).map(item => item.vcGrupo03).filter((value, index, self) => self.indexOf(value) === index);

                const tipoSolicitudes = (result.d).map(item => item.vcGrupo03 + '|' + item.vcGrupo05).filter((value, index, self) => self.indexOf(value) === index);
                fnCargarTipoSolicitud(tipoSolicitudes.map(x => x.split('|')), result.d, periodo, cadena, tiposolicitud, PaletaColores);

                //Obtener tipos localstorage..
                let tiposLocal = localStorage.getItem('s_h_t');
                if (tiposLocal != null) { tiposLocal = tiposLocal.split(";"); } else { tiposLocal = ["-1"]; }
                $("#cboTipoSolicitudHistorico").val(tiposLocal).trigger('change');

                $("#dv_TopTen1").fadeIn(300);

                AlinearTitulosGraficos();

            } else {
                $("#chartContainer7 *").remove();
                $("#chartContainer7").append('<div style="font-size:medium; color:Gray; width: ' + FCWidth_ND + '; height: ' + FCHeight_ND + ';">No hay datos para mostrar.</div> ');

            }

            $('.select2-selection').attr('style', 'border: 1px solid #aaa !important');

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function Grafico_Periodo_Proceso() {
    var str = $("#dwDesde").val();
    var vcMesInicial = str.substring(3) + '' + str.substring(0, 2);

    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "DashBoard_Solicitudes.aspx/Grafico_TotalPeriodo_Proceso",
        data: "{'vcPeriodo':'" + vcMesInicial + "'," +
            "'vcTipSolAprLeer': '" + $("#hdfIdTipSolAprLeer").val() + "'," +
            "'vcTipSolAprResp': '" + $("#hdfIdTipSolAprResp").val() + "'," +
            "'vcTipSolTecAsi': '" + $("#hdfIdTipSolTecAsi").val() + "'," +
            "'vcTipSolTecPro': '" + $("#hdfIdTipSolTecPro").val() + "'," +
            "'vcTipSolTecCulAnu': '" + $("#hdfIdTipSolTecCulAnu").val() + "'," +
            "'vcCodEmp': '" + $("#hdfCodEmp").val() + "'," +
            "'vcCodIntRes': '" + $("#hdfCodIntRes").val() + "'," +
            "'vcIdEstado': '" + $("#ddlEstado").val() + "'," +
            "'vcNroMeses': '" + $("#ddlNroMes").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            // ==============================================================================================================================             
            if ($(result.d).length > 0) {
                var PaletaColores = '#01B8AA';
                var valueFontColor = "#FFFFFF'";

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

                cadena = cadena + '"subCaption": "(Solicitudes agrupadas por Tipo de Solicitud)",';

                cadena = cadena + '"drawcrossline": "1", "showsum": "1","showYAxisValues": "1","showvalues": "0","seriesnameintooltip": "1","showlegend": "1","caption": "HISTÓRICO DE CREACIÓN DE SOLICITUDES POR ESTADO","xAxisName": "","yAxisName": "","numberPrefix": "",';
                cadena = cadena + '"bgColor": "#ffffff", "showBorder": "0", "showCanvasBorder": "0", "usePlotGradientColor": "0", "plotBorderAlpha": "25","theme": "fusion", "exportenabled" : "1","exportShowMenuItem":"1",';
                cadena = cadena + '"placeValuesInside": "1", "showAxisLines": "1", "xAxisLineColor": "#999999", "yAxisLineColor": "#FFFFFF", "axisLineAlpha": "10","divLineIsDashed": "1",';
                cadena = cadena + '"divLineAlpha": "30", "showAlternateVGridColor": "0", "captionFontSize": "16", "subcaptionFontSize": "12", "subcaptionFontBold": "0","numberscalevalue": "100,100,100",';
                cadena = cadena + '"formatNumberScale": "0", "formatNumber": "1", "forceDecimals": "1", "sdecimals": "0", "decimals": "0",';
                cadena = cadena + '"decimalSeparator": "", "thousandSeparator": ""';
                cadena = cadena + '';
                cadena = cadena + ' }, "categories": [ {"category": [';

                var periodo = (result.d).map(item => item.vcGrupo01).filter((value, index, self) => self.indexOf(value) === index)
                var tiposolicitud = (result.d).map(item => item.vcGrupo03).filter((value, index, self) => self.indexOf(value) === index)

                var vcColor = PaletaColores;

                var i = 0;
                for (i = 0; i < periodo.length; i++) {
                    var item = '{"label": "' + periodo[i] + '" }';
                    if (i + 1 != periodo.length) {
                        item = item + ',';
                    }
                    cadena = cadena + item;
                }
                cadena = cadena + '] } ] , "dataset": [ ';

                for (i = 0; i < tiposolicitud.length; i++) {

                    var valores = (result.d).filter(function (el) {
                        return el.vcGrupo03 == tiposolicitud[i];
                    });

                    let initiallyhidden = "";
                    if (valores[0].vcGrupo10 == "0") {
                        initiallyhidden = '"initiallyhidden": "1",'
                    }

                    if (i == 0) {
                        cadena = cadena + ' {"seriesname": "' + valores[0].vcGrupo05 + '", "color":"' + valores[0].vcGrupo09 + '", ' + initiallyhidden + ' "data": [';
                    }
                    else {
                        cadena = cadena + '] }, {"seriesname": "' + valores[0].vcGrupo05 + '", "color":"' + valores[0].vcGrupo09 + '", ' + initiallyhidden + ' "data": [';
                    }

                    for (var j = 0; j < valores.length; j++) {
                        var itemColor = vcColor;
                        item = '{"value": "' + valores[j].vcGrupo08 + '", "label":"' + valores[j].vcGrupo05 + '","color": "' + valores[j].vcGrupo09 + '",';
                        item = item + '"alpha":"100",';
                        item = item + '"tooltext":"Cantidad: <b>' + (valores[j].vcGrupo08) + '</b>, Tipo: ' + valores[j].vcGrupo05 + '" }';
                        if (j + 1 != valores.length) {
                            item = item + ',';
                        }
                        cadena = cadena + item;
                    }
                }

                cadena = cadena + '] } ] }';

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

                $("#dv_TopTen1").fadeIn(300);

                AlinearTitulosGraficos();

            } else {
                $("#chartContainer7 *").remove();
                $("#chartContainer7").append('<div style="font-size:medium; color:Gray; width: ' + FCWidth_ND + '; height: ' + FCHeight_ND + ';">No hay datos para mostrar.</div> ');
            }

            $('.select2-selection').attr('style', 'border: 1px solid #aaa !important');

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function Grafico_StackedArea() {
    const dataSource = {
        chart: {
            caption: "Yearly Energy Production",
            numbersuffix: " TWh",
            formatnumberscale: "0",
            showvalues: "1",
            drawcrossline: "1",
            showsum: "1",
            plottooltext: "$dataValue from $seriesName",
            theme: "fusion"
        },
        categories: [
            {
                category: [
                    {
                        label: "Canada"
                    },
                    {
                        label: "China"
                    },
                    {
                        label: "Russia"
                    },
                    {
                        label: "Australia"
                    },
                    {
                        label: "United States"
                    },
                    {
                        label: "France"
                    }
                ]
            }
        ],
        dataset: [
            {
                seriesname: "Coal",
                data: [
                    {
                        value: "400"
                    },
                    {
                        value: "830"
                    },
                    {
                        value: "500"
                    },
                    {
                        value: "420"
                    },
                    {
                        value: "790"
                    },
                    {
                        value: "380"
                    }
                ]
            },
            {
                seriesname: "Hydro",
                data: [
                    {
                        value: "350"
                    },
                    {
                        value: "620"
                    },
                    {
                        value: "410"
                    },
                    {
                        value: "370"
                    },
                    {
                        value: "720"
                    },
                    {
                        value: "310"
                    }
                ]
            },
            {
                seriesname: "Nuclear",
                data: [
                    {
                        value: "210"
                    },
                    {
                        value: "400"
                    },
                    {
                        value: "450"
                    },
                    {
                        value: "180"
                    },
                    {
                        value: "570"
                    },
                    {
                        value: "270"
                    }
                ]
            },
            {
                seriesname: "Gas",
                data: [
                    {
                        value: "180"
                    },
                    {
                        value: "330"
                    },
                    {
                        value: "230"
                    },
                    {
                        value: "160"
                    },
                    {
                        value: "440"
                    },
                    {
                        value: "350"
                    }
                ]
            },
            {
                seriesname: "Oil",
                data: [
                    {
                        value: "60"
                    },
                    {
                        value: "200"
                    },
                    {
                        value: "200"
                    },
                    {
                        value: "50"
                    },
                    {
                        value: "230"
                    },
                    {
                        value: "150"
                    }
                ]
            }
        ]
    };

    var valoraleatorio = Math.random();
    var IdGrafico = "chartContainer7_render" + valoraleatorio;

    if (FusionCharts(IdGrafico) === undefined) {
        var repositorioChartDur = new FusionCharts("mssplinearea", IdGrafico, "100%", "300", "0");
        repositorioChartDur.setJSONData(dataSource);
        repositorioChartDur.setTransparent(true);
        repositorioChartDur.render("chartContainer7");
    } else {
        FusionCharts(IdGrafico).setJSONData(dataSource);
    }
}


function AlinearTitulosGraficos() {
    //setTimeout(function () {
    //    $('text[fill="#6b737c"][font-size="16px"]').attr("x", "10");
    //    $('text[fill="#9e9c9c"][font-size="12px"]').attr("x", "10");
    //}, 1000);
}


function actualizarGraficoHistorico(resultado, periodo, cadena, tiposolicitud, vcColor, tipos) {

    //actualizar local storage...
    localStorage.setItem('s_h_t', tipos.join(";"));

    var i = 0;
    var _cadena = cadena;
    for (i = 0; i < periodo.length; i++) {
        var item = '{"label": "' + periodo[i] + '" }';
        if (i + 1 != periodo.length) {
            item = item + ',';
        }
        _cadena += item;
    }
    _cadena += '] } ] , "dataset": [ ';


    let primerItem = true;
    for (i = 0; i < tiposolicitud.length; i++) {
        if (tipos.indexOf("-1") >= 0 || tipos.indexOf(tiposolicitud[i]) >= 0) {
            var valores = (resultado).filter(function (el) {
                return el.vcGrupo03 == tiposolicitud[i];
            });
            //debugger;
            let initiallyhidden = "";
            if (valores[0].vcGrupo10 == "0") {
                initiallyhidden = '"initiallyhidden": "1",'
            }

            if (primerItem) {
                _cadena += ' {"seriesname": "' + valores[0].vcGrupo05 + '", "color":"' + valores[0].vcGrupo09 + '", ' + initiallyhidden + ' "data": [';
            }
            else {
                _cadena += '] }, {"seriesname": "' + valores[0].vcGrupo05 + '", "color":"' + valores[0].vcGrupo09 + '", ' + initiallyhidden + ' "data": [';
            }
            for (var j = 0; j < valores.length; j++) {
                var itemColor = vcColor;
                item = '{"value": "' + valores[j].vcGrupo08 + '", "label":"' + valores[j].vcGrupo05 + '","color": "' + valores[j].vcGrupo09 + '",';
                item = item + '"alpha":"100",';
                item = item + '"tooltext":"Cantidad: <b>' + (valores[j].vcGrupo08) + '</b>, Tipo: ' + valores[j].vcGrupo05 + '" }';
                if (j + 1 != valores.length) {
                    item = item + ',';
                }
                _cadena += item;
            }
            primerItem = false;
        }
    }


    _cadena += '] } ] }';

    JsonTopTenCosto = _cadena;
    var valoraleatorio = Math.random();
    var IdGrafico = "chartContainer7_render" + valoraleatorio;

    if (FusionCharts(IdGrafico) === undefined) {
        var repositorioChartDur = new FusionCharts("msline", IdGrafico, FCWidth, FCHeight, "0");
        repositorioChartDur.setJSONData(_cadena);
        repositorioChartDur.setTransparent(true);
        repositorioChartDur.render("chartContainer7");
    } else {
        FusionCharts(IdGrafico).setJSONData(_cadena);
    }

    valorFiltroTipoSolicituAnterior = tipos.join(";");
}

var valorFiltroTipoSolicituAnterior = "";
function fnCargarTipoSolicitud(tipos, resultado, periodo, cadena, tiposolicitud, PaletaColores) {
    //debugger;

    tipos = tipos.sort(function (a, b) { if (a[1] === b[1]) { return 0; } else { return (a[1] < b[1]) ? -1 : 1; } });

    const cboTipoSolicitudHistorico = document.getElementById("cboTipoSolicitudHistorico");
    cboTipoSolicitudHistorico.style.display = "";
    cboTipoSolicitudHistorico.innerHTML = "";
    let options = "<option value='-1'>TODOS</option>";
    tipos.forEach(x => {
        options += "<option value='" + x[0] + "'>" + x[1] + "</option>";
    });
    cboTipoSolicitudHistorico.innerHTML = options;

    var cboTipoSelect2 = $('#cboTipoSolicitudHistorico').select2();
    cboTipoSelect2.on("change", function (e) {
        var tipoSolicitud = $("#cboTipoSolicitudHistorico").val();
        if (tipoSolicitud == null) {
            valorFiltroTipoSolicituAnterior = "-1";
            $("#cboTipoSolicitudHistorico").val("-1").trigger('change');
            return;
        }
        if (tipoSolicitud.length > 1) {
            if (valorFiltroTipoSolicituAnterior == "-1") {
                tipoSolicitud = tipoSolicitud.filter(x => x != "-1");
                valorFiltroTipoSolicituAnterior = tipoSolicitud.join(";");
                $("#cboTipoSolicitudHistorico").val(tipoSolicitud).trigger('change');
            }
            if (tipoSolicitud.indexOf("-1") >= 0) {
                valorFiltroTipoSolicituAnterior = "-1";
                $("#cboTipoSolicitudHistorico").val("-1").trigger('change');
                return;
            }
        }
        actualizarGraficoHistorico(resultado, periodo, cadena, tiposolicitud, PaletaColores, tipoSolicitud);
        //$("#select2-cboTipoSolicitudHistorico-results").hide();
    });

    cboTipoSolicitudHistorico.nextSibling.style.width = "100%";
}