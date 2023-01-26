/// <reference path="../../../Common/Scripts/jquery-2.0.0-vsdoc.js" />

//agregado 15-10-2013 wapumayta
var arDatosExportacion = [];
var datosExportacion = "";
var tipoRep = "";
//-----------------------

var DiccionarioServiciosDinamicos = {};
var blnFirstLoad = false;
var datosGraficos;


function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();


    $("#ifReporteDevExpress").css("height", Alto - 20);

}

$(function () {

    //MPAJUELO_3.0.4_20161104
    //Ajustar anchos reporte devexpress...
    $(".dxeEditArea_Office2003Blue.dxeEditAreaSys").css("width", "30px");
    $(window).resize(function () {
        DimPosElementos();
    });
    DimPosElementos();

    $("#AccordionJQ1").accordion("option", "active", 1);
    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false,
        active: false
    });

    $("#txtFiltro").live("keypress", function (e) {
        if (e.keyCode == 13) {
            load();
        } else {
            return ValidarAlfaNumericoConEspacios(e);
        }
    });

    $("#txtFiltro").datepicker("destroy");

    //fin formato filtro
    FusionCharts.setCurrentRenderer('javascript');

    //nuevos exportar agregado 15-10-2013 wapumayta
    $("#btnExportar").button();
    $("#btnExportar").click(function () {
        tipoRep = 'RepAgrupacionLineaDispositivo';
        ExportarExcel();
    });

    //MPAJUELO_3.0.4_20161104
    $("#btnVistaPrevia").button();
    $("#btnVistaPrevia").click(function () {
        GenerarReporteDevExpress();
    });
    function GenerarReporteDevExpress() {
        pagina = "ReporteDevExpress.aspx?Tipo=ReporteOrganizacional&Detalle=" + datosExportacion;
        $("#ifReporteDevExpress").attr("src", pagina);
        $("#dvVistaPrincipal").fadeToggle();
        setTimeout(function () {
            $("#dvReporteDevExpress_Organizacional").fadeIn();
        }, 1500);
    }
    //$("#btnRegresar").button();
    $("#btnRegresar").click(function () {
        $("#dvReporteDevExpress_Organizacional").fadeToggle();
        $("#dvVistaPrincipal").fadeIn();
    });




    function ExportarExcel() {
        pagina = "../../Adm_Reporte.aspx?Tipo=" + tipoRep + "&Detalle=" + datosExportacion;
        $("#ifExcel").attr("src", pagina);
    }
    //fin nuevos filtros

    //exportar imagenes agregado 18-10-2013
    $("#btnExportarImagen").button();
    $("#btnDescargarSelec").button();
    $("#btnCerrarDialogDesc").button();
    var arDescImg = [];

    $("#btnExportarImagen").click(function () {
        $("#tdReportesGraficos").html('');
        $("#tdReportesGraficos").html('<table id="tbGraficos" width="100%"></table>');
        var chartImg = $("span[id ^= myChart]");
        arDescImg = [];
        var m;
        for (m = 0; m < chartImg.length; m++) {
            var chartId = $(chartImg[m]).attr("id");
            var tituloChart = $("span[id=" + chartId + "] g[class ^= red-caption] tspan");
            var tituloText = $(tituloChart).text();
            $("#tbGraficos").append('<tr><td>' + tituloText + '</td><td align="right"><select id="ddl-' + chartId + '"><option value="NO" selected="selected">No Descargar</option><option value="PNG">Descargar como PNG</option><option value="JPG">Descargar como JPG</option><option value="PDF">Descargar como PDF</option></select></td></tr>');
            arDescImg.push({ value: chartId, text: tituloText });
        }

        exportarImg = $("#divExportarImagenes").dialog({
            modal: true,
            width: 380,
            heigth: 150,
            resizable: false,
            title: 'Descargar reportes gráficos'
        });
    });

    $("#btnDescargarSelec").click(function () {
        if (validarDescargar()) {
            var h;
            for (h = 0; h < arDescImg.length; h++) {
                var formatoDesc = $("#ddl-" + arDescImg[h].value).val();
                var tituloDesc = arDescImg[h].text;
                var chartImageExp = getChartFromId(arDescImg[h].value);
                if (chartImageExp.hasRendered() && formatoDesc != 'NO') {
                    chartImageExp.exportChart({ exportAtClient: '1', exportFileName: tituloDesc, exportFormat: formatoDesc });
                }
            }
            exportarImg.dialog('close');
        } else {
            alerta("No ha seleccionado ningun formato de descargar");
        }
    });
    $("#btnCerrarDialogDesc").click(function () { exportarImg.dialog('close'); });

    function validarDescargar() {
        var result = 0;
        var i;
        for (i = 0; i < arDescImg.length; i++) {
            if ($("#ddl-" + arDescImg[i].value).val() == "NO") {
                result = result + 0;
            } else {
                result = result + 1;
            }
        }
        return result;
    }
    //fin exportar imagenes

    $("#btnBuscar").button({
        text: false
    });

    if ($("#cboTipoAgrupacion").val() != 'Area') {
        $("#filaNivel").hide();
    }

    $("#btnBuscar").click(function () {
        load();
    });


    $("#cboTipoAgrupacion").change(function () {

        if ($("#cboTipoAgrupacion").val() == "Area") {
            $("#filaNivel").show();
        }
        else {
            $("#filaNivel").hide();
        }
    });


    //ValidarNumeroEnCajaTexto("txtTop", ValidarEnteroPositivo);
    ValidarNumeroEnCajaTexto("txtTop", function (e) {
        if (e.keyCode == 13) {
            load();
        } else {
            return ValidarEnteroPositivo(e);
        }
    });

    load();

    //OCULTAR ICONO DE EXPORTAR IMAGEN - MOTIVO .- PARA EXPORTAR HAY QUE CONECTARSE A LOS SERVIDORES DE FUSIONCHARTS - GEIG
    $("#btnExportarImagen").css("display", "none");
    //
});

function load() {

    var filtroBusqueda = " AND 1=1 ";
    var EstadoLinea = $("#ddlEstadoLinea").val();
    var EstadoDispositivo = $("#ddlEstadoDispositivo").val();
    var FiltroCodigoDescripcion = $.trim($("#txtFiltro").val());
    FiltroCodigoDescripcion = FiltroCodigoDescripcion.replace(/'/g, "");

    if (EstadoLinea != "-1") {
        filtroBusqueda += ' AND NomEstadoLinea = "' + EstadoLinea + '"';
    }
    if (EstadoDispositivo != "-1") {
        filtroBusqueda += ' AND NomEstadoDispositivo = "' + EstadoDispositivo + '"';
    }
    if (FiltroCodigoDescripcion != "") {
        filtroBusqueda += ' AND (xCampoCodigox LIKE "%' + FiltroCodigoDescripcion + '%" OR xCampoDescripcionx LIKE "%' + FiltroCodigoDescripcion + '%")';
    }

    //inicio datos exportacion agregado 15-10-2013 wapumayta
    arDatosExportacion = [];
    arDatosExportacion.push($('#cboTipoAgrupacion').val());
    arDatosExportacion.push(($("#cboTipoAgrupacion").val() == "Area" ? $('#ddlNivel').val() : "-1"));
    arDatosExportacion.push($('#txtTop').val());
    arDatosExportacion.push($('#selectTipo').val());
    arDatosExportacion.push(filtroBusqueda);
    datosExportacion = arDatosExportacion.join('*');
    //fin datos exportacion

    $.ajax({
        type: "POST",
        url: "Mnt_AgruLinDis.aspx/ObtenerDatos",
        data: "{'prTipoAgrupacion': '" + $('#cboTipoAgrupacion').val() + "'," +
                "'prNivel': '" + ($("#cboTipoAgrupacion").val() == "Area" ? $('#ddlNivel').val() : "-1") + "'," +
                "'prTop': '" + $('#txtTop').val() + "'," +
                "'prCampoTipo': '" + $('#selectTipo').val() + "'," +
                "'prFiltro': '" + filtroBusqueda + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;
            if (resul[0] == "1") {
                $("#grilla *").remove();
                //$("#Chart *").remove();
                $("#grilla").empty();
                $("#grilla").append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
                //agregado 18/07/2014 - wapumayta
                $("#Chart").hide();
                $("#btnExportar").button("option", "disabled", true);
                $("#btnExportar").attr("title", "No hay datos para mostrar");
                $("#btnVistaPrevia").button("option", "disabled", true);
                $("#btnVistaPrevia").attr("title", "No hay datos para mostrar");
            }
            else {
                //agregado 18/07/2014 - wapumayta
                $("#Chart").show();
                $("#btnExportar").button("option", "disabled", false);
                $("#btnExportar").attr("title", "Exportar a Excel");
                $("#btnVistaPrevia").button("option", "disabled", false);
                $("#btnVistaPrevia").attr("title", "Vista Previa");

                //contador = 1;
                var columnas = JSON.parse(resul[0]);
                var datos = JSON.parse(resul[1]);
                var datosChart = resul[2];
                var datosChart2 = resul[3];
                var TituloPrincial = resul[4];
                $("#lblTituloPrincipal").html("EMPLEADOS, LÍNEAS Y DISPOSITIVOS AGRUPADOS POR " + TituloPrincial);

                datosGraficos = datosChart2;
                if ($("#hdfTipoSumario").val() == "FECHA") {
                    $("#lblFiltro").text("Filtrar por " + $.trim(columnas[0].label) + ":");
                } else {
                    $("#lblFiltro").text("Filtrar por " + $.trim(columnas[0].label) + "/" + $.trim(columnas[1].label) + ":");
                }

                $("#grilla *").remove();
                //$("#Chart *").remove();

                var alto;
                if (datos.length < 10) {
                    alto = datos.length * 13 + 21;
                }
                else {
                    alto = '250';
                }

                $("#grilla").empty();
                $("#grilla").append('<table id="tbSumario"></table><div id="pagerTbSumario"></div> ');
                //$("#grids").append('<table id="tbEstadisticas-' + contador.toString() + '"></table><div id="pagerEstadisticas-' + contador.toString() + '"></div> ');


                //alert(columnas.length);

                try {
                    if (columnas.length == 11) {
                        columnas[1].width = "150"; //Nombre
                    }
                    else if (columnas.length == 6) {
                        columnas[1].width = "500"; //Nombre
                    }
                    else if (columnas.length == 5) {
                        columnas[1].width = "700"; //Nombre
                    }
                } catch (e) {
                }

                $("#tbSumario").jqGrid({
                    datatype: "local",
                    colModel: columnas,
                    data: datos,
                    shrinkToFit: false,
                    rowNum: 10,
                    rowList: [10, 20, 30],
                    pager: '#pagerTbSumario',
                    gridview: true,
                    emptyrecords: "No hay datos que mostrar",
                    viewrecords: true,
                    width: 1020,
                    height: "100%",
                    rownumbers: false,
                    //shrinkToFit: false,
                    onPaging: function (pgButton) {
                        if (pgButton == "user") {
                            var requestedPage = $("#tbSumario").getGridParam("page");
                            var lastPage = $("#tbSumario").getGridParam("lastpage");
                            if (requestedPage > lastPage) {
                                $("#tbSumario").setGridParam({ page: lastPage }).trigger("reloadGrid");
                            }
                        }
                    },
                    gridComplete: function () {
                        $("#tbSumario").css("width", "1018px !important");
                    }
                });

                CargarGrafico(datosChart2);

            }
            $("#Datos").css("display", "block");
            if (blnFirstLoad) {
                CargarGrafico(datosChart2);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function CargarGrafico(datosChart2) {


    console.log("datosChart2: ", datosChart2);
    var jsDatos = JSON.parse(datosChart2);
    //jsDatos.chart.showBorder = "0";
    jsDatos.chart.baseFontColor = "#555555";
    jsDatos.chart.showCanvasBorder = "0";
    jsDatos.chart.usePlotGradientColor = "0";
    jsDatos.chart.plotBorderAlpha = "15";
    jsDatos.chart.exportenabled = "0";
    jsDatos.chart.exportShowMenuItem = "0";
    jsDatos.chart.placeValuesInside = "1";
    jsDatos.chart.showAxisLines = "1";
    jsDatos.chart.xAxisLineColor = "#A9A9A9";
    jsDatos.chart.yAxisLineColor = "#FFFFFF";
    jsDatos.chart.axisLineAlpha = "10";
    jsDatos.chart.divLineIsDashed = "1";
    jsDatos.chart.divLineAlpha = "30";
    jsDatos.chart.showAlternateVGridColor = "0";
    jsDatos.chart.captionFontSize = "14";
    jsDatos.chart.subcaptionFontSize = "14";
    jsDatos.chart.subcaptionFontBold = "0";
    var Labels = jsDatos.categories[0].category;
    for (var i in jsDatos.dataset[0].data) {
        jsDatos.dataset[0].data[i].color = "#EFC235";
        jsDatos.dataset[0].data[i].alpha = "25";
        jsDatos.dataset[0].data[i].label = Labels[i].label;
        jsDatos.dataset[0].data[i].tooltext = Labels[i].label;
    }
    jsDatos.chart.numberscaleunit = "";
    jsDatos.chart.forceDecimals = "0";
    jsDatos.chart.yAxisMaxValue = "5";


    if (!(FusionCharts("myChartIdX"))) {
        myChart = new FusionCharts("../../../../Common/Scripts/FusionCharts/bar2d.swf", "myChartIdX", "1000", "350", "0"); //,\"exportenabled\":\"1\",\"exportShowMenuItem\":\"0\",\"bgcolor\":\"FFFFFF\",\"bordercolor\":\"FFFFFF\"
        myChart.setJSONData(jsDatos);
        myChart.setTransparent(true);
        myChart.render("chartContainer");
        blnFirstLoad = true;
    } else {
        $("#chartContainer").updateFusionCharts({ dataSource: jsDatos, dataFormat: "json" });
        blnFirstLoad = false;
    }
    $("#myChartIdX").css('left', '0px');



}

function fnVistaTotal() {
    $("#selectServicio").html("");
    $("#selectTipo").html("");
    $("#selectServicio").append("<option value=\"Total\" selected=\"selected\">Total</option>");
    $("#selectTipo").append("<option value=\"COSTO\" selected=\"selected\">Monto</option>");
    $("#filaServicio").css("display", "none");
    $("#dvUnidad").css("display", "none");
    $("#btnBuscar").click();
}

function fnTipoFuente() {
    return "Total";
}
