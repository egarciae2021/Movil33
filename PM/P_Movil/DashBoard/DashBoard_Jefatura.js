///////SOLICITUDES/////////
var IdNotaSeleccionada = '';
var vcTodos = "0";
var vcTipos = "0"; //General
var inFiltro = 2;
var vcFiltro = '';
var vcFiltro2 = '';
var vcVista = "General";
var vcRangoFechaIni = "";
var vcRangoFechaFin = "";
var TamanoPagina = [10, 20, 30];
var vcFileName = "";
var oCulturaUsuario;
var CarpetaDominio = '';

var inFilas;
var nuAltoFila = 40.04;
var ArrayPaginacion = [];
///////////////////////////

var rowsGrillaIncidencias;
var rowsGrillaSolicitudes;

var hayData = 0;
var hayDataSol = 0;
var EsAdmin = false;
var hayDatosFact = "0"



var language_Datatable = {
    "paginate": {
        "previous": 'Anterior',
        "next": 'Siguiente'
    },
    "lengthMenu": "_MENU_ registros por página",
    "zeroRecords": "No hay datos para mostrar",
    "info": "Página _PAGE_ de _PAGES_",
    "infoEmpty": "",
    "infoFiltered": "(filtered from _MAX_ total records)",
    "sSearch": "Buscar",
};

$(function () {
    EsAdmin = $("#hdfAdmin").val() == "1" ? true : false;

    CarpetaDominio = window.top.$("#hdfCodigoDominio").val() != '' ? '/' + window.top.$("#hdfCodigoDominio").val() : '';
    ///Modelo_TablaLineas();

    //window.parent.$("#dvCargando").hide();
    $(".btnNormal").button({});
    $(".btnNormal").button();
    $(".boton").button();
    //window.parent.fnCerrarCargaInicial();
    //FusionCharts.setCurrentRenderer('javascript');
    oCulturaUsuario = window.top.oCulturaUsuario;


    //MostrarPie(jsonDatosPie);
    //MostrarHistorico(jsonDatosHistorico);
    //MostrarPieResumen(jsonDatosPieResumen);
    //MostrarHistoricoResumen(jsonDatosHistoricoResumen);
    //if ($("#hdfAdmin").val() == "1") {
    //    vcTodos = "1";
    //}
    //if ($("#hdfTecnico").val() == "1") {
    //    vcTodos = "1";
    //}
    //if ($("#hdfResApr").val() == "1") {
    //    vcTodos = "1";
    //}

    $("#ddlPeriodo").change(function () {
        //debugger;
        //window.parent.$("#dvCargando").show();
        fnObtenerDatosDashboardJefatura();

        //window.location.href = 'DashBoard_Resumen.aspx?pe=' + $("#ddlPeriodo").val() + '&inCodTip=' + $("#ddlTipoLinea").val();
        //window.parent.$("#dvCargando").hide();
    });

    //$("#ddlTipoLinea").change(function () {
    //    window.parent.$("#dvCargando").show();
    //    window.location.href = 'DashBoard_Resumen.aspx?pe=' + $("#ddlPeriodo").val() + '&inCodTip=' + $("#ddlTipoLinea").val();
    //    window.parent.$("#dvCargando").hide();
    //});

    //vcTipos = $("#hdfGruTipSol").val(); //General

    //if ($("#hdfOpcionPrincipal").val() != "0") {
    //    $("#ddlTipoLinea").attr("disabled", "disabled");
    //} else {
    //    $("#ddlTipoLinea").removeAttr("disabled");
    //}

    $("#btnImprimir").click(function () {
        if ($('#ddlPeriodo > option').length > 1) {
            window.print();
        } else {
            alerta("No hay datos para imprimir");
        }
    });

    
    //fnObtenerDatosDashboardJefatura();

    $(window).resize(function () {
        DimPosElementos();
        //fnLateralSplitterDinamic();
    });
    DimPosElementos();

    $("#ddlPeriodo").change();


    //botones de erportar excel
    $("#ImagenConceptos").click(function () {
        exportTableToExcel("tableConceptos", "Conceptos"); 
    });

    $("#ImagenCuentas").click(function () {
        exportTableToExcel("tableCuentas", "Cuentas"); 
    });

    $("#ImagenPlanes").click(function () {
        exportTableToExcel("tablePlanes", "Planes"); 
    });
});

 //funcion exportar
function exportTableToExcel(nombre_tabla, titulo = '') {
    //debugger;
    var downloadLink;
    let uri = 'data:application/vnd.ms-excel;base64,';
    var tablatexhtml = document.getElementById(nombre_tabla + "div").innerHTML;
    const inicio = tablatexhtml.indexOf('<thead>');
    const fin = tablatexhtml.indexOf('</thead>');
    let head = ""
    let dtDatos = $('#' + nombre_tabla).DataTable().data();
    let html = '';
    let htmlDatos = '';

    for (let i = inicio; i < fin + 8; i++) {
        head += tablatexhtml[i];
    }
    for (let i = 0; i < dtDatos.length; i++) {
        htmlDatos += '<tr role="row">'
        for (let j = 0; j < dtDatos[i].length; j++) {
            htmlDatos += '<td class="dt-right">' + dtDatos[i][j].toString() + '</td>'
        }
        htmlDatos += '</tr>'
    }

    html = '<table id="tableCuentas" class="demo-dt-selection table table-striped dataTable no-footer dtr-inline" cellspacing="0" width="100%" role="grid" style="width: 100%;">' + head + '<tbody>' + htmlDatos + '</tbody></table>'

    var nombrearchivo = titulo ? titulo + '.xls' : 'ExelReport.xls';
    downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    let template = `<html  
      xmlns:o="urn:schemas-microsoft-com:office:office" 
      xmlns:x="urn:schemas-microsoft-com:office:excel" 
      xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="UTF-8">
        <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
        <x:Name>${titulo}</x:Name>
        <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
        </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        </head><body>${html}</body></html>`;
    downloadLink.href = uri + base64(template);
    downloadLink.download = nombrearchivo;
    downloadLink.click();

}
// Codificación base64 de salida
function base64(s) { return window.btoa(unescape(encodeURIComponent(s))) }




function BloqueoEnCarga() {
    $("#ddlPeriodo").attr("disabled", "disabled");
    $("#btnImprimir").prop("disabled", true);
}
function DesbloqueoEnCarga() {
    $("#ddlPeriodo").removeAttr("disabled");
    $("#btnImprimir").prop("disabled", false);
}

function fnObtenerDatosDashboardJefatura() {
    //debugger;
    //$("#skLoadingJef").show();
    var Anio = '20' + $("#ddlPeriodo").val().substring(2,4);
    var Mes = $("#ddlPeriodo").val().substring(0,2);
    var Dia = '1';

   
    $("#iIndicadorUp").hide();
    $("#iIndicadorDown").hide();

    $("#dvContenidoPrincipal").hide();
    $("#dvNoHayDatos").hide();

    $("#dvContenidoMantenimiento").hide();
    $("#dvContenidoFacturacion").hide();


    BloqueoEnCarga();

    $.ajax({
        type: "POST",
        url: "DashBoard_Jefatura.aspx/ObtenerDashboardGeneral",
        data: "{'Anio':'" + Anio + "'," +
            "'Mes':'" + Mes + "'," +
            "'Dia':'" + Dia + "'," + 
            "'DatosMostrar':'0'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            
            $("#dvHistFact").hide();
            $("#dvpanelConceptosFacturacion").hide();
            $("#dvpanelCuentas").hide();
            $("#dvpanelPlanes").hide();

            var lista = result.d.split('¬');
            if (lista.length != 10) {
                $("#dvContenidoMantenimiento").hide();
                $("#dvNoHayDatos").show();
                DesbloqueoEnCarga();
                return;
            }
            //console.log("lista: ", lista);
            hayDatosFact = "1";//lista[2];
            $("#dvContenidoPrincipal").show();
            $("#dvContenidoMantenimiento").show();
            $("#dvNoHayDatos").hide();

            $("#spTotalAnual").html(kFormatter(lista[0], oCulturaUsuario, true));
            $("#spPromedio03Meses").html(kFormatter(lista[1], oCulturaUsuario, true));
            $("#spMontoPeriodo").html(kFormatter(lista[2], oCulturaUsuario, true));

            //if (lista[0] == "0" && lista[1] == "0" && lista[2] == "0") {
            //    $("#dvMontosFacturacion").parent().removeClass("col-lg-6").addClass("col-lg-12");
            //    $("#dvMontosFacturacion").parent().hide();

            //    $("#spTotalCuentas").parent().parent().parent().removeClass("col-lg-1").addClass("col-lg-2");
            //    $("#spTotalPlanes").parent().parent().parent().removeClass("col-lg-1").addClass("col-lg-2");
            //    $("#spTotalModelos").parent().parent().parent().removeClass("col-lg-1").addClass("col-lg-2");
            //    $("#spTotalLineas").parent().parent().parent().removeClass("col-lg-1").addClass("col-lg-2");
            //    $("#spTotalDispositivos").parent().parent().parent().removeClass("col-lg-1").addClass("col-lg-2");
            //    $("#spTotalUsuarios").parent().parent().parent().removeClass("col-lg-1").addClass("col-lg-2");


            //}
            //else {
            //    $("#dvMontosFacturacion").parent().removeClass("col-lg-12").addClass("col-lg-6");
            //    $("#dvMontosFacturacion").parent().show();

            //    $("#spTotalCuentas").parent().parent().parent().removeClass("col-lg-2").addClass("col-lg-1");
            //    $("#spTotalPlanes").parent().parent().parent().removeClass("col-lg-2").addClass("col-lg-1");
            //    $("#spTotalModelos").parent().parent().parent().removeClass("col-lg-2").addClass("col-lg-1");
            //    $("#spTotalLineas").parent().parent().parent().removeClass("col-lg-2").addClass("col-lg-1");
            //    $("#spTotalDispositivos").parent().parent().parent().removeClass("col-lg-2").addClass("col-lg-1");
            //    $("#spTotalUsuarios").parent().parent().parent().removeClass("col-lg-2").addClass("col-lg-1");
            //}

            if (parseFloat(lista[2]) < parseFloat(lista[3])) {
                $("#iIndicadorDown").show();
            }
            else if (parseFloat(lista[2]) > parseFloat(lista[3])) {
                $("#iIndicadorUp").show();
            }
            else {
                $("#iIndicadorIgual").show();
            }
            $("#lblPeriodoActual").html($("#ddlPeriodo option:selected").text());
            $(".lblPeriodoActual").html(" - " + $("#ddlPeriodo option:selected").text());


            $("#spTotalCuentas").html(lista[4]);
            $("#spTotalPlanes").html(lista[5]);
            $("#spTotalModelos").html(lista[6]);
            $("#spTotalLineas").html(lista[7]);
            $("#spTotalDispositivos").html(lista[8]);
            $("#spTotalUsuarios").html(lista[9]);

            if (EsAdmin) {
                $("#dvMontosFacturacion").parent().removeClass("col-lg-6").addClass("col-lg-12");
                $("#spTotalCuentas").parent().parent().parent().parent().removeClass("col-lg-6").addClass("col-lg-12");

                $("#spTotalCuentas").parent().parent().parent().show();
                $("#spTotalPlanes").parent().parent().parent().show();
                $("#spTotalModelos").parent().parent().parent().show();
                $("#spTotalUsuarios").parent().parent().parent().show();

                $("#spTotalLineas").parent().parent().parent().removeClass("col-sm-6 col-lg-6").addClass("col-sm-2 col-lg-2");
                $("#spTotalDispositivos").parent().parent().parent().removeClass("col-sm-6 col-lg-6").addClass("col-sm-2 col-lg-2");
            }
            else {
                $("#dvMontosFacturacion").parent().removeClass("col-lg-12").addClass("col-lg-6");
                $("#spTotalCuentas").parent().parent().parent().parent().removeClass("col-lg-12").addClass("col-lg-6");

                $("#spTotalCuentas").parent().parent().parent().hide();
                $("#spTotalPlanes").parent().parent().parent().hide();
                $("#spTotalModelos").parent().parent().parent().hide();
                $("#spTotalUsuarios").parent().parent().parent().hide();

                $("#spTotalLineas").parent().parent().parent().removeClass("col-sm-2 col-lg-2").addClass("col-sm-6 col-lg-6");
                $("#spTotalDispositivos").parent().parent().parent().removeClass("col-sm-2 col-lg-2").addClass("col-sm-6 col-lg-6");
            }

            $.ajax({
                type: "POST",
                url: "DashBoard_Jefatura.aspx/ObtenerDashboardGeneral",
                data: "{'Anio':'" + Anio + "'," +
                    "'Mes':'" + Mes + "'," +
                    "'Dia':'" + Dia + "'," +
                    "'DatosMostrar':'1'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) { 

                    var lista = result.d.split('¬');
                    if (lista.length != 7) {
                        $("#dvContenidoFacturacion").hide();
                        DesbloqueoEnCarga();
                        return;
                    }

                    $("#dvContenidoFacturacion").show();

                    var totalSolicitudes = lista[1].split(';').reduce(add, 0);
                    var totalIncidencias = lista[0].split(';').reduce(add, 0);
                    function add(a, b) {
                        return parseFloat(a) + parseFloat(b);
                    }

                    var areaSparkSolicitudes = function () {
                        $('#splSolicitudes').sparkline(lista[1].split(';'), {
                            type: 'line',
                            width: '100%',
                            height: '70',
                            spotRadius: 3,
                            lineWidth: 2,
                            lineColor: '#ffffff',
                            fillColor: false,
                            minSpotColor: false,
                            maxSpotColor: false,
                            highlightLineColor: '#ffffff',
                            highlightSpotColor: '#ffffff',
                            tooltipChartTitle: '# Solicitudes',
                            tooltipSuffix: ' '
                        });
                    };
                    var areaSparkIncidencias = function () {
                        $('#splIncidencias').sparkline(lista[0].split(';'), {
                            type: 'line',
                            width: '100%',
                            height: '70',
                            spotRadius: 3,
                            lineWidth: 2,
                            lineColor: '#ffffff',
                            fillColor: false,
                            minSpotColor: false,
                            maxSpotColor: false,
                            highlightLineColor: '#ffffff',
                            highlightSpotColor: '#ffffff',
                            tooltipChartTitle: '# Incidencias',
                            tooltipSuffix: ' '
                        });
                    };

                    areaSparkSolicitudes();
                    areaSparkIncidencias();
                    $("#spTotalIncidencias").html(totalIncidencias);
                    $("#spTotalSolicitudes").html(totalSolicitudes);

                    $("#dvHistFact").show();
                    $("#dvpanelConceptosFacturacion").show();
                    $("#dvpanelCuentas").show();
                    $("#dvpanelPlanes").show();

                    //MostrarHistoricoResumen(lista[2]);
                    CargarGrillaDataTables(lista); 
                    cargarPieSolicitudesProceso(lista[6]);

                    if (hayData == 0) {
                        $("#dvHistFact").removeClass("col-md-6").addClass("col-md-12");
                        $("#dvSolInc").removeClass("col-md-6").addClass("col-md-12");
                        $("#dvHistFact").hide();
                    }
                    else {
                        $("#dvHistFact").removeClass("col-md-12").addClass("col-md-6");
                        $("#dvSolInc").removeClass("col-md-12").addClass("col-md-6");
                        $("#dvHistFact").show();
                    }

                    if (hayDataSol == 0) {
                        $("#dvHistFact").removeClass("col-md-6").addClass("col-md-12");
                        $("#dvSolInc").removeClass("col-md-6").addClass("col-md-12");
                        $("#dvSolInc").hide();
                    }
                    else {
                        $("#dvHistFact").removeClass("col-md-12").addClass("col-md-6");
                        $("#dvSolInc").removeClass("col-md-12").addClass("col-md-6");
                        $("#dvSolInc").show();
                    }

                    if (hayDatosFact == "0") {
                        $("#panelConceptos").hide();
                        $("#panelCuentas").hide();
                        $("#panelPlanes").hide();
                        $("#paneGeneral").show();

                        $("#dvHistFact").removeClass("col-md-6").addClass("col-md-12");
                        $("#dvSolInc").removeClass("col-md-6").addClass("col-md-12");

                        $("#dvpanelConceptosFacturacion").removeClass("col-xs-12 col-lg-12 col-xl-4").addClass("col-xs-12 col-lg-12 col-xl-12");

                    }
                    else {
                        $("#panelConceptos").show();
                        $("#panelCuentas").show();
                        $("#panelPlanes").show();
                        $("#paneGeneral").hide();

                        $("#dvpanelConceptosFacturacion").removeClass("col-xs-12 col-lg-12 col-xl-12").addClass("col-xs-12 col-lg-12 col-xl-4");
                    }

                    DesbloqueoEnCarga();
                    $("#skLoadingJef").hide();

                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                    $("#skLoadingJef").hide();
                    DesbloqueoEnCarga();
                }
            });
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
            $("#skLoadingJef").hide();
            DesbloqueoEnCarga();
        }
    });




}

function MostrarHistoricoResumen(datos) {
    var myChart9;
    var mValores = datos.split(';');
    var mValor;
    var Categorias = '[';
    var DataCosto = '[';
    for (var i = 0; i < mValores.length; i++) {
        mValor = mValores[i].split('|');
        Categorias += '{"label": "' + ObtenerNombreMes(mValor[0].substring(4, 6)) + mValor[0].substring(2, 4) + '"},';
        DataCosto += '{"value": "' + mValor[1] + '","alpha": "100", "color" : "#01B8AA" },';
    }
    if (mValores.length > 0) {
        Categorias = Categorias.substring(0, Categorias.length - 1);
        DataCosto = DataCosto.substring(0, DataCosto.length - 1);
    }
    Categorias += ']';
    DataCosto += ']';

    //oCulturaUsuario.Moneda.vcSimMon

    datos = '{"chart": {"baseFont":"Open Sans", "baseFontColor": "#6b737c", "caption": "HISTÓRICO DE FACTURACIÓN", "subCaption": "(Últimos 12 meses)","xaxisname": "","pyaxisname": "Costo", "syaxisname": "Líneas","legendBorderThickness": "0","legendShadow":"0","subCaptionFontColor":"#9E9C9C","captionFontSize":"16","subcaptionFontSize": "12","divlineThickness":"0","exportenabled" : "1","exportShowMenuItem":"1","legendItemFontColor":"#666666", "legendItemFontSize":"10", "legendShadow":"0", "placeValuesInside":"1", "paletteColors": "#01B8AA","rotateValues":"1", "sformatnumber":"0", "showHoverEffect":"1", "showShadow":"0", "showXAxisLine":"1", "showYAxisValues":"1","showPercentValues":"0","showplotborder":"0", "subcaptionFontBold":"0", "showAlternateVGridColor":"0", "valueFontColor":"#FFFFFF", "xAxisLineThickness":"1","maxLabelWidthPercent":"30", "bgColor": "#ffffff", "bgAlpha":"100", "showCanvasBorder":"0","canvasBgColor": "#ffffff", "canvasbgAlpha":"0", "canvasBorderAlpha":"0", "plotBorderAlpha": "25","showAlternateHGridColor": "0","usePlotGradientColor": "0","captionAlignment":"left","showAxisLines": "1", "showYAxisLine": "0", "showsyAxisLine": "0","xAxisLineColor": "#999999","axisLineAlpha": "10","divlineColor": "#999999","divLineIsDashed": "1","divLineDashLen": "0","divLineDashed": "0","divLineGapLen": "0","labeldisplay": "0","slantlabels": "1", "maxColWidth": "35", "animation": "0","formatnumberscale": "0","showvalues": "0", "seriesnameintooltip": "1", "thousandseparator": ",", "sdecimals": "0", "decimals": "0", "decimalseparator": ".", "forcedecimals": "1","showborder": "0", "canvasbasecolor": "#CCCCCC", "snumberprefix": "","numberprefix":"' + oCulturaUsuario.Moneda.vcSimMon + '" }, "categories": [{"category": ' + Categorias + ' } ] , "dataset": [ { "seriesname": "Costo", "data": ' + DataCosto + '}  ] }';

    var re = JSON.parse(datos);
    if (re.dataset.length > 0) {

        var JSON_chart = JSON.parse(datos);
        //JSON_chart.legendBorderThickness = "0";
        //JSON_chart.legendShadow = "0";


        JSON_chart.chart.anchorBorderThickness = "1";
        JSON_chart.chart.anchorRadius = "12";
        JSON_chart.chart.baseFont = "Open Sans";
        JSON_chart.chart.baseFontColor = "#6b737c";
        JSON_chart.chart.caption = "HISTÓRICO DE FACTURACIÓN";
        JSON_chart.chart.captionAlignment = "left";
        JSON_chart.chart.captionFontSize = "16";
        JSON_chart.chart.decimals = "0";
        JSON_chart.chart.divlineThickness = "0";
        JSON_chart.chart.drawAnchors = "1";
        JSON_chart.chart.exportenabled = "1";
        JSON_chart.chart.exportFileName = "HistoricoFacturacion";
        JSON_chart.chart.exportShowMenuItem = "1";
        JSON_chart.chart.legendItemFontColor = "#666666";
        JSON_chart.chart.legendItemFontSize = "10";
        JSON_chart.chart.legendShadow = "0";
        JSON_chart.chart.subcaption = "(Últimos 12 meses)";
        JSON_chart.chart.subCaptionFontColor = "#9E9C9C";
        JSON_chart.chart.subcaptionFontSize = "12";
        JSON_chart.chart.subcaptionFontBold = "0";
        JSON_chart.chart.maxLabelWidthPercent = "30";
        JSON_chart.chart.paletteColors = "#01B8AA";
        JSON_chart.chart.placeValuesInside = "1";
        JSON_chart.chart.rotateValues = "1";
        JSON_chart.chart.sdecimals = "0";
        JSON_chart.chart.showlegend = "0";
        JSON_chart.chart.slantlabels = "0";
        JSON_chart.chart.sformatnumber = "0";
        JSON_chart.chart.showAlternateVGridColor = "0";
        JSON_chart.chart.showHoverEffect = "1";
        JSON_chart.chart.showPercentValues = "0";
        JSON_chart.chart.showplotborder = "0";
        JSON_chart.chart.showShadow = "0";
        JSON_chart.chart.showXAxisLine = "1";
        JSON_chart.chart.showYAxisValues = "1";
        JSON_chart.chart.valueFontColor = "#FFFFFF";
        JSON_chart.chart.xAxisLineThickness = "1";

        JSON_chart.dataset.splice(1, 1);

        var elemento;
        hayData = 0;

        var serieLinea = JSON.parse(JSON.stringify(JSON_chart.dataset[0]));
        JSON_chart.dataset.push(serieLinea);
        //  [0].renderas = "column";
        JSON_chart.dataset[1].renderas = "line";
        JSON_chart.dataset[1].alpha = "0";
        JSON_chart.dataset[1].color = "#B2B6B9";


        for (var i = 0; i < JSON_chart.dataset[0].data.length; i++) {
            elemento = JSON_chart.dataset[0].data[i];
            elemento.color = '#01B8AA';
            elemento.alpha = '100';
        }

        for (var i = 0; i < JSON_chart.dataset[1].data.length; i++) {
            elemento = JSON_chart.dataset[1].data[i];
            elemento.alpha = '0';

            if (parseFloat(elemento.value) == 0) {
                elemento.drawAnchors = '0';
                continue;
            }
            else {
                hayData = 1;
            }

            if (i > 0 && parseFloat(JSON_chart.dataset[1].data[i - 1].value) > 0) {
                if (parseFloat(elemento.value) > parseFloat(JSON_chart.dataset[1].data[i - 1].value)) {
                    elemento.anchorImageUrl = 'images/sube.png';
                }
                else if (parseFloat(elemento.value) < parseFloat(JSON_chart.dataset[1].data[i - 1].value)) {
                    elemento.anchorImageUrl = 'images/baja.png';
                }
                else {
                    elemento.anchorImageUrl = 'images/igual.png';
                }
            }
            else {
                elemento.drawAnchors = '0';
            }
        }



        var chartHistoricoResumen = 'chartHistoricoResumen_' + ((Math.random() * 100000) + 1).toString();
        //if (!(FusionCharts("chartHistoricoResumen"))) {

        var Alto = $("#dvFilaInicial").height() - 60;
        Alto = 330;
        myChart9 = new FusionCharts("MSCombi2D", chartHistoricoResumen, "100%", Alto, "0");
        //var repositorioChartDur = new FusionCharts();

        myChart9.setJSONData(JSON_chart);
        myChart9.setTransparent(true);
        myChart9.render("ctndCharHisFact");
        //}
        //else {
        //    $("#chartHistoricoResumen").updateFusionCharts({ dataSource: JSON_chart, dataFormat: "json" });
        //    //$("#chartHistorico").css('left', '15px');
        //}

    }
    else {
        $("#ctndCharHisFact").append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
    }

}

function DimPosElementos() {
    //var ancho = $(window).width();
    //console.log("ancho :", ancho);
    //if (rowsGrillaSolicitudes) {
    //    if (ancho < 500) {
    //        var column = rowsGrillaSolicitudes.column("Código");
    //        column.visible(false);
    //    }
    //    else {
    //        var column = rowsGrillaSolicitudes.column("Código");
    //        column.visible(true);
    //    }
    //}
     

}

function CargarGrillaDataTables(lista) {
    //debugger;
    var mConceptos, mCuentas, mPlanes;

    mConceptos = lista[3].split(';');
    mCuentas = lista[4].split(';');
    mPlanes = lista[5].split(';');
    var dataSetConceptos = [];
    var dataSetCuentas = [];
    var dataSetPlanes = [];
    for (var i = 0; i < mConceptos.length; i++) {
        dataSetConceptos.push(mConceptos[i].split('|'));
    }
    for (var i = 0; i < mCuentas.length; i++) {
        dataSetCuentas.push(mCuentas[i].split('|'));
    }
    for (var i = 0; i < mPlanes.length; i++) {
        dataSetPlanes.push(mPlanes[i].split('|'));
    }

    dataSetConceptos.sort(function (a, b) { return +b[2] - +a[2] });
    dataSetCuentas.sort(function (a, b) { return +b[2] - +a[2] });
    dataSetPlanes.sort(function (a, b) { return +b[2] - +a[2] });
    //debugger;
    var rowsGrillaConceptos = $('#tableConceptos').DataTable({ 
        data: dataSetConceptos,
        responsive: true,
        searching: false,
        ordering: false,
        paging: true,
        bDestroy: true,
        info: false,
        columnDefs: [
              //{ className: "dt-right", "targets": [1, 2] }
            { "targets": 0 },
            { "targets": 1 , className: "dt-right" },
            { "targets": 2 , className: "dt-right" },
        ],
        columns: [
            {
                title: "Grupo Concepto", "render": function (data, type, row, meta) {
                    //debugger;
                    let result = "";
                    let inPosId = data.indexOf("*");
                    if (inPosId > -1) {
                        let strIdGrupoConcepto = data.substring(0, inPosId);
                        let strNomGrupoConcepto = data.substring(inPosId + 1);
                        result = strNomGrupoConcepto + ' <a onclick="fnMostrarModalGrupoConcepto(this,\'' + strIdGrupoConcepto + '\')" style="cursor: pointer;"><i class="fa fa-info-circle" aria-hidden="true"></i></a>';
                    }
                    else {
                        result = data;
                    }
                    return result;
                },
            },
            {
                title: "Líneas", "render": function (data, type, row, meta) {
                    if (type === 'display') {
                        data = FormatoNumero(data, oCulturaUsuario, true);
                    }
                    else if (type === 'sort') {
                        if (data == undefined) {
                            return "";
                        }
                        else {
                            return data;
                        }
                    }
                    else {
                        data = "";
                    }
                    return data;
                },
            },
            {
                title: "Total", "render": function (data, type, row, meta) {
                    if (type === 'display') {
                        data = FormatoNumero(data, oCulturaUsuario, false);
                    }
                    else if (type === 'sort') {
                        if (data == undefined) {
                            return "";
                        }
                        else {
                            return data;
                        }
                    }
                    else {
                        data = "";
                    }
                    return data;
                },
            },
        ],
        "language": language_Datatable,
    });

    var rowsGrillaCuentas = $('#tableCuentas').DataTable({
        data: dataSetCuentas,
        pageLength: 10,
        responsive: true,
        searching: false,
        ordering: false,
        paging: true,
        info: false,
        bDestroy: true,
        "columnDefs": [
            { "targets": 0 },
            { "targets": 1,  className: "dt-right" },
            { "targets": 2,  className: "dt-right" },
              //{ className: "dt-right", "targets": [1, 2] }
        ],
        columns: [
            { title: "Cuenta" },
            {
                title: "Líneas", "render": function (data, type, row, meta) {
                    if (type === 'display') {
                        data = FormatoNumero(data, oCulturaUsuario, true);
                    }
                    else if (type === 'sort') {
                        if (data == undefined) {
                            return "";
                        }
                        else {
                            return data;
                        }
                    }
                    else {
                        data = "";
                    }
                    return data;
                }
            },
            {
                title: "Total", "render": function (data, type, row, meta) {
                    if (type === 'display') {
                        data = FormatoNumero(data, oCulturaUsuario, false);
                    }
                    else if (type === 'sort') {
                        if (data == undefined) {
                            return "";
                        }
                        else {
                            return data;
                        }
                    }
                    else {
                        data = "";
                    }
                    return data;
                }
            },
        ],
        "language": language_Datatable,
    });

    var rowsGrillaPlanes = $('#tablePlanes').DataTable({
        data: dataSetPlanes,
        responsive: true,
        searching: false,
        bDestroy: true,
        ordering: false,
        paging: true,
        info: false,
        "columnDefs": [
              { className: "dt-right", "targets": [1, 2] }
        ],
        columns: [
            { title: "Plan" },
            {
                title: "Líneas", "render": function (data, type, row, meta) {
                    if (type === 'display') {
                        data = FormatoNumero(data, oCulturaUsuario, true);
                    }
                    else if (type === 'sort') {
                        if (data == undefined) {
                            return "";
                        }
                        else {
                            return data;
                        }
                    }
                    else {
                        data = "";
                    }
                    return data;
                }
            },
            {
                title: "Total", "render": function (data, type, row, meta) {
                    if (type === 'display') {
                        data = FormatoNumero(data, oCulturaUsuario, false);
                    }
                    else if (type === 'sort') {
                        if (data == undefined) {
                            return "";
                        }
                        else {
                            return data;
                        }
                    }
                    else {
                        data = "";
                    }
                    return data;
                }
            },
        ],
        "language": language_Datatable,
    });



    $(".dataTables_length").hide();
    $(".dataTables_paginate").parent().removeClass("col-sm-7");
}

 
   
 


function cargarPieSolicitudesProceso(Solicitudes_Pie_Proceso) {
    //debugger;
    var existeData = Solicitudes_Pie_Proceso != '';
    if (existeData) {
        var Anio = '20' + $("#ddlPeriodo").val().substring(2, 4);
        var Mes = $("#ddlPeriodo").val().substring(0, 2);

        var jsonData_SolicitudesProceso = JSON.parse(Solicitudes_Pie_Proceso);

        var nuevoFormato = {};
        nuevoFormato.chart = {};
        nuevoFormato.chart.caption = "DISTRIBUCIÓN DE SOLICITUDES";
        nuevoFormato.chart.subCaption = "(Periodo " + Anio + "/" + Mes + ")";
        nuevoFormato.chart.subCaptionFontColor = "#9E9C9C";
        nuevoFormato.chart.exportFileName = "SolicitudesProceso_" + Anio + "_" + Mes;
        nuevoFormato.chart.captionAlignment = "left";
        nuevoFormato.chart.captionFontSize = "16";
        nuevoFormato.chart.subcaptionFontSize = "14";
        nuevoFormato.chart.subcaptionFontBold = "0";
        nuevoFormato.chart.toolTipColor = "ffffff";
        nuevoFormato.chart.exportenabled = "1";
        nuevoFormato.chart.exportShowMenuItem = "1";
        nuevoFormato.chart.baseFont = "Open Sans";
        nuevoFormato.chart.baseFontColor = "6b737c";
        nuevoFormato.chart.bgAlpha = "25";
        nuevoFormato.chart.showShadow = "0";
        nuevoFormato.chart.use3DLighting = "0";
        nuevoFormato.chart.startingAngle = "0";
        nuevoFormato.chart.decimals = "0";
        nuevoFormato.chart.toolTipBorderThickness = "0";
        nuevoFormato.chart.toolTipBgColor = "#000000";
        nuevoFormato.chart.toolTipBgAlpha = "80";
        nuevoFormato.chart.toolTipBorderRadius = "2";
        nuevoFormato.chart.toolTipPadding = "5";
        nuevoFormato.chart.showHoverEffect = "1";
        nuevoFormato.chart.legendBgColor = "Fffffff";
        nuevoFormato.chart.legendItemFontSize = "13";
        //nuevoFormato.chart.paletteColors = "#FFE019,#1D43A4,#78DC27,#0E2443,#1975EA";
        //nuevoFormato.chart.paletteColors = "#01B8AA,#FE6260,#EDC911,#8CD4E1,#7687A6";
        nuevoFormato.chart.paletteColors = "#EDC911,#01B8AA,#7687A6,#FE6260,#8CD4E1";
        nuevoFormato.chart.legendItemFontColor = "#666666";
        nuevoFormato.chart.numberPrefix = "";
        nuevoFormato.chart.legendBorderThickness = "0";
        nuevoFormato.chart.legendShadow = "0";
        nuevoFormato.chart.legendPosition = "right";
        nuevoFormato.chart.showPercentValues = "1";
        nuevoFormato.chart.showPercentInTooltip = "0";
        nuevoFormato.chart.enableSmartLabels = "0";
        nuevoFormato.chart.enableMultiSlicing = "0";
        nuevoFormato.chart.useroundedges = "0";
        nuevoFormato.chart.showvalues = "1";
        nuevoFormato.chart.showlabels = "0";
        nuevoFormato.chart.showLegend = "1";
        nuevoFormato.chart.labelDistance = "0";
        nuevoFormato.chart.slicingDistance = "15";
        nuevoFormato.chart.pieRadius = "80";
        nuevoFormato.chart.bgColor = "#ffffff";
        nuevoFormato.chart.showBorder = "0";
        nuevoFormato.chart.usePlotGradientColor = "0";
        nuevoFormato.chart.useDataPlotColorForLabels = "1";
        nuevoFormato.legendborderalpha = "0";
        nuevoFormato.data = jsonData_SolicitudesProceso.data;

        let totalDatos = 0;
        for (let i = 0; i < jsonData_SolicitudesProceso.data.length; i++) {
            if (jsonData_SolicitudesProceso.data[i].value != "") {
                totalDatos += parseInt(jsonData_SolicitudesProceso.data[i].value);
            }
        }
        if (totalDatos > 0) {
            hayDataSol = 1;
        }

        var solicitudesProceso = new FusionCharts("doughnut2d", "dvPieSolicitudesProceso_render" + Math.random(), "100%", "330", "0");

        solicitudesProceso.options.dataEmptyMessage = "No hay datos de solicitudes o incidencias para mostrar.";
        solicitudesProceso.options.baseChartMessageFont = "Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif";
        solicitudesProceso.options.baseChartMessageColor = "#808080";
        solicitudesProceso.options.baseChartMessageFontSize = "16"

        solicitudesProceso.setJSONData(nuevoFormato);
        solicitudesProceso.setTransparent(true);
        solicitudesProceso.render("dvPieSolicitudesProceso");
    } else {
        $("#dvPieSolicitudesProceso *").remove();
        $("#dvPieSolicitudesProceso").append('<div style="font-size:medium; color:Gray; width: 450px; height: 200px;">No hay datos de solicitudes o incidencias para mostrar.</div> ');
    }
}

function fnMostrarModalGrupoConcepto(e, id) {
    //debugger;
    var $width = 740;
    var $height = 533;

    var $tituloModal = 'Detalle Grupo Servicio';

    Modal = $('#dvGrupoServicioDetalle').dialog({
        title: $tituloModal,
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
    let str = $("#ddlPeriodo").val();
    let p_vcMesInicial = str;
    let p_idGrupo = id;
    let p_idOperador = '-1';
    let p_vcCodCue = '-1';

    // ==============================================================================================================================
    $.ajax({
        type: "POST",
        url: "DashBoard_Jefatura.aspx/ListarDetalleGrupoServicio",
        data: "{'p_vcMesInicial': '" + p_vcMesInicial + "','p_idGrupo': '" + p_idGrupo + "'," +
            "'p_idOperador': '" + p_idOperador + "'," +
            "'p_vcCodCue': '" + p_vcCodCue + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //debugger;
            // ==============================================================================================================================
            if ($(result.d).length > 0) {
                var dataSetDetGrupoConcepto = [];
                for (let i = 0; i < result.d.length; i++) {
                    dataSetDetGrupoConcepto.push([result.d[i].vcGrupo02, result.d[i].vcGrupo03, result.d[i].vcGrupo07]);
                }

                var rowsGrillaDetalleGrupo = $('#tbGrupoServicioDet').DataTable({
                    data: dataSetDetGrupoConcepto,
                    responsive: true,
                    searching: false,
                    ordering: false,
                    paging: true,
                    bDestroy: true,
                    info: false,
                    columnDefs: [
                        //{ className: "dt-right", "targets": [1, 2] }
                        { "targets": 0 },
                        { "targets": 1 },
                        { "targets": 2, className: "dt-right" },
                    ],
                    columns: [
                        {
                            title: "Grupo Servicio",
                        },
                        {
                            title: "Concepto",
                        },
                        {
                            title: "Total por Concepto", "render": function (data, type, row, meta) {
                                if (type === 'display') {
                                    data = FormatoNumero(data, oCulturaUsuario, false);
                                }
                                else if (type === 'sort') {
                                    if (data == undefined) {
                                        return "";
                                    }
                                    else {
                                        return data;
                                    }
                                }
                                else {
                                    data = "";
                                }
                                return data;
                            },
                        },
                    ],
                    "language": language_Datatable,
                });

                if (dataSetDetGrupoConcepto.length < 10) {
                    $("#dvGrupoServicioDetalle").css("height", "auto");
                }

            } else {
                $('#dvGrupoServicioDetalle').dialog('close')
                alerta("No hay datos para mostrar")
            }

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            //MostrarErrorAjax(xhr, err, thrErr);

            Mensaje("<br/><h1>No hay datos, con los criterios ingresados</h1>", document, null);

            // ==============================================================================================================================
        }
        // ==============================================================================================================================
    });

}