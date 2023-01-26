/// <reference path="../../Common/Scripts/jquery-2.0.0-vsdoc.js" />
var graficos = "";
var contador = 0;
var contAux = 0;
var clickInicial = 0;
var nomOrganizacion = "";
//agregado 15-10-2013 wapumayta
var arDatosExportacion = [];
var datosExportacion = "";
var tipoRep = "";
var vcTab = "";
//configuracion
var vcSimMon = "S/.";
var vcNumDec = '2';
var vcSimDec = '.';
var vcSimMil = ' ';
var formatHora = "hh:mm:ss";
var tipoFormatoDuracion = 3; //0=segundos, 1=hh:mm:ss, 2=minutos(decimal), 3=minutos(entero)
var arNombreTipoFormato = ['Duración mostrada en segundos', 'Duración mostrada en formato tipo hh:mm:ss', 'Duración mostrada en minutos decimales', 'Duración mostrada en minutos enteros / Datos en MB'];
var tipoListEmpleados = 2; //1=lista empleados del area, 2=lista todos los empleados dependientes del area
var biNavegacionBloqueada = false;
var periodo;
var tipo;
var telefonia;
var btOcultarTabAreas = false;
//------------------------

function fnBloquearNavegacion(bloqueado) {
    if (bloqueado) {
        $(".btnSubirNivel").css("cursor", "default");
        $(".btnAccederOrganizacion").css("cursor", "default");
    } else {
        $(".btnSubirNivel").css("cursor", "pointer");
        $(".btnAccederOrganizacion").css("cursor", "pointer");
    }
    biNavegacionBloqueada = bloqueado;
}

$(function () {
    //alert(arNombreTipoFormato[tipoFormatoDuracion]);
    //cargar datos de cultura
    vcNumDec = $("#hdfNumDec").val();
    vcSimDec = $("#hdfSimDec").val();
    vcSimMil = $("#hdfSimMil").val();
    vcSimMon = $("#hdfSimMon").val();
    periodo = $("#ddlMes").val();
    tipo = $("#selectTipo").val();
    telefonia = $("#selectTelefonia").val();

    //nuevos exportar agregado 15-10-2013 wapumayta
    $("#btnExportar").button();
    $("#btnExportar").click(function () {
        tipoRep = 'RepSumario';
        vcTab = 'M_NAV';
        ExportarExcel();
    });
    function ExportarExcel() {
        pagina = "../Administrar/Adm_Reporte.aspx?Tipo=" + tipoRep + "&vcTab=" + vcTab + "&Detalle=" + datosExportacion;
        $("#ifExcel").attr("src", pagina);
    }
    //fin nuevos filtros

    //exportar imagenes agregado 18-10-2013
    $("#btnExportarImagen").hide();
    $("#btnExportarImagen").button();
    $("#btnDescargarSelec").button();
    $("#btnCerrarDialogDesc").button();
    var arDescImg = [];

    $("#btnExportarImagen").click(function () {
        //myChart01,myChart11,myChartId1
        var chartTab;
        if ($("#tops").tabs("option", "selected") == 1) {
            chartTab = 'myChart11';
        } else {
            chartTab = 'myChart01';
        }
        $("#tdReportesGraficos").html('');
        $("#tdReportesGraficos").html('<table id="tbGraficos" width="100%"></table>');
        var chartImg = $("span[id ^= myChart]");
        arDescImg = [];
        var m;
        for (m = 0; m < chartImg.length; m++) {
            var chartId = $(chartImg[m]).attr("id");
            var tituloChart = $("span[id=" + chartId + "] g[class ^= red-caption] tspan");
            var tituloText = $(tituloChart).text();
            if (chartId == chartTab || chartId == 'myChartId1') {
                $("#tbGraficos").append('<tr><td>' + tituloText + '</td><td align="right"><select id="ddl-' + chartId + '"><option value="NO" selected="selected">No Descargar</option><option value="PNG">Descargar como PNG</option><option value="JPG">Descargar como JPG</option><option value="PDF">Descargar como PDF</option></select></td></tr>');
                arDescImg.push({ value: chartId, text: tituloText });
            }

            //alerta("id -> " + chartId + ", titulo -> " + tituloText);
        }

        exportarImg = $("#divExportarImagenes").dialog({
            modal: true,
            width: 380,
            heigth: 200,
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
                    chartImageExp.exportChart({ exportFileName: tituloDesc, exportFormat: formatoDesc });
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
            //alert(result);
        }
        return result;
    }
    //fin exportar imagenes

    //FusionCharts.setCurrentRenderer('javascript');

    $("#btnBuscar").button();
    $("#tops").tabs();

    $("#btnBuscar").click(function () {
        $("#nivelOrg").val($("#nivelOrgOrigen").val());
        periodo = $("#ddlMes").val();
        tipo = $("#selectTipo").val();
        telefonia = $("#selectTelefonia").val();
        load();
    });

    //    $("#ddlMes").change(function () {
    //        //alert($("#ddlMes").val());
    //        $("#nivelOrg").val($("#nivelOrgOrigen").val());
    //        load();
    //    });


    load();

    $("#tops").tabs({
        show: function (event, ui) {
            graficar($("#tops").tabs("option", "selected"));
        }
    });

    //agregado 25-09-2013 wapumayta
    $("#selectTelefonia").change(function () {
        //if ($("#selectTelefonia").val() == 'EC') {
        //    $("#selectTipo option[value=MONTO]").remove();
        //} else {
        //    $("#selectTipo").append('<option value="MONTO" selected="selected">Monto</option>');
        //}
        $("#selectTipo option[value=MONTO]").remove();
    });
});

function load() {

    $('#divCargando').dialog({
        title: 'Cargando...',
        height: 110,
        modal: true,
        resizable: false
    });

    var servicio = $("#selectServicio").val();
    //var tipo = $("#selectTipo").val();
    //var telefonia = $("#selectTelefonia").val();
    var nivel = $("#nivelOrg").val();
    //periodo = $("#ddlMes").val();
    clickInicial = 0;
    graficos = "";
    //inicio datos exportacion agregado 15-10-2013 wapumayta
    arDatosExportacion = [];
    arDatosExportacion.push(periodo);
    arDatosExportacion.push(nivel);
    arDatosExportacion.push(tipo);
    arDatosExportacion.push(telefonia);
    arDatosExportacion.push(tipoFormatoDuracion);
    arDatosExportacion.push(tipoListEmpleados);
    datosExportacion = arDatosExportacion.join('-');
    //fin datos exportacion
    $.ajax({
        type: "POST",
        url: "Sum_Navegacion.aspx/listar",
        data: "{'prPeriodo': '" + periodo + "'," +
            "'prTipo': '" + tipo + "'," +
            "'prTelefonia': '" + telefonia + "'," +
            "'prCodigo': '" + nivel + "'," +
            "'prFormatoDuracion': '" + tipoFormatoDuracion + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            contAux = contAux + 1;
            var existenDatos = 0;
            var datDistribucion = resultado.d[2].toString();

            var cont;
            for (cont = 0; cont < resultado.d.length - 1; cont++) {
                var resul = resultado.d[cont].toString().split("],");
                var columnas = JSON.parse(resul[0].toString() + "]");
                var datos = JSON.parse(resul[1]);
                existenDatos = resul[1].toString().split(',').length;
                if (existenDatos > 3) {
                    $("#grids-" + cont).empty();
                    $("#grids-" + cont).append('<table id="tbEstadisticas-' + cont.toString() + '"></table><div id="pagerEstadisticas-' + cont.toString() + '"></div> ');
                    $("#emptyDatos").addClass("ocultar");
                    $("#datosNavegacion").removeClass("ocultar");

                    try {
                        columnas[1].width = "570"; //Nombre
                        columnas[2].width = "120"; //Fija
                        columnas[3].width = "120"; //Celular
                        columnas[4].width = "120"; //Internacional
                        columnas[5].width = "120"; //Otros
                        columnas[6].width = "120"; //Total
                        columnas[7].width = "120"; //Total

                        //columnas = columnas.filter(x => x.name != "Total" && x.name != "Objetivo");
                    } catch (e) {
                    }


                    //console.log("columnas xxx", columnas);

                    //alert(cont.toString());

                    var sWidth = "900";
                    //alert(columnas.length);
                    //if (cont == 0) {
                    //    if (columnas.length == 7) {
                    //        sWidth = "900";
                    //    }
                    //    else {
                    //        sWidth = "780";
                    //    }
                    //}
                    //else {
                    //    if (columnas.length == 8) {
                    //        sWidth = "1025";
                    //    }
                    //    else {
                    //        sWidth = "900";
                    //    }
                    //}

                    //console.log("columnas", columnas);

                    columnas = columnas.filter(x => x.name != "Internacional" &&
                        x.name != "Nacional" &&
                        x.name != "Total" &&
                        x.name != "Otros" &&
                        x.name != "Objetivo" &&
                        x.name != "Fija");

                    columnas = columnas.map(x => {
                        if (x.name == "Celular")
                            x.label = "Móvil";
                        return x;
                    });

                    $("#tbEstadisticas-" + cont.toString()).jqGrid({
                        datatype: "local",
                        colModel: columnas,
                        data: datos,
                        shrinkToFit: false,
                        rowNum: 25,
                        rowList: [5, 15, 25],
                        pager: cont == 1 ? "#pagerEstadisticas-" + cont.toString() : '#pagerAnio-' + cont.toString(),
                        gridview: true,
                        emptyrecords: "No hay registros que mostrar",
                        viewrecords: true,
                        width: sWidth,
                        height: "auto",
                        rownumbers: false,
                        caption: cont == 1 ? "RESUMEN" : "SUMARIO",
                        onSelectRow: function () {
                            if (cont == 0) {
                                dibujarCharts(datDistribucion);
                            }
                        },
                        gridComplete: function () {
                            $("#tbEstadisticas-" + cont.toString()).setSelection(1);
                        },
                        onPaging: function (pgButton) {
                            if (pgButton == "user") {
                                var requestedPage = $("#tbEstadisticas-" + cont.toString()).getGridParam("page");
                                var lastPage = $("#tbEstadisticas-" + cont.toString()).getGridParam("lastpage");
                                if (requestedPage > lastPage) {
                                    $("#tbEstadisticas-" + cont.toString()).setGridParam({ page: lastPage }).trigger("reloadGrid");
                                }
                            }
                        }
                    });

                    $(".ui-jqgrid-title").css({ 'margin-left': '410px' });
                    //agregado 21/07/2014 - wapumayta
                    $("#btnExportar").button("option", "disabled", false);
                    $("#btnExportarImagen").button("option", "disabled", false);
                } else {
                    $("#datosNavegacion").addClass("ocultar");
                    $("#emptyDatos").removeClass("ocultar");
                    cont = resultado.d.length - 1;
                    //agregado 21/07/2014 - wapumayta
                    $("#btnExportar").button("option", "disabled", true);
                    $("#btnExportarImagen").button("option", "disabled", true);
                }

            }
            if (existenDatos > 1) {
                $("#grids-1 tr td img").parent().css("text-aling", "center");
                dibujarChartsTopTen();
            }
            else {
                $('#divCargando').dialog("close");
            }
            fnBloquearNavegacion(false);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
            fnBloquearNavegacion(false);
        }
    });
}

function dibujarCharts(dataDistribucion) {
    var info = "";
    info = dataDistribucion.toString().split("]")[0];
    info = info.replace(/\[/g, '').replace(/\]/g, '');

    if (info.length > 0) {
        var tipo = $("#selectTipo").val();
        nomOrganizacion = dataDistribucion.toString().split("]")[1];
        nomOrganizacion = nomOrganizacion.replace(/\,/g, '');
        var cadenaJson = '{"chart": { "palette": "4","pieyscale": "90","bgangle": "30",';
        cadenaJson += '"showPercentValues": "1", "showPercentInTooltip": "0", "enableMultiSlicing": "0",';
        cadenaJson += '"useroundedges": "0", "showvalues": "1", "showlabels": "0", "labelDistance": "0", "slicingDistance": "15",';
        cadenaJson += '"pieRadius": "50", "bgColor": "#ffffff", "showBorder": "0", "usePlotGradientColor": "0", "useDataPlotColorForLabels": "1",';
        cadenaJson += '"subCaptionFontColor":"#9E9C9C","exportFileName":"DistribucionPorServicios", ';
        cadenaJson += '"captionAlignment":"left", "captionFontSize":"16", "subcaptionFontSize":"14", "subcaptionFontBold":"0", "toolTipColor": "ffffff",  "exportShowMenuItem":"1",';
        cadenaJson += '"baseFont":"Open Sans","baseFontColor":"6b737c", "bgAlpha":"25", "showShadow":"0", "use3DLighting":"0", "startingAngle": "0", "decimals": "2", ';
        cadenaJson += '"toolTipBorderThickness":"0","toolTipBgColor":"#000000","toolTipBgAlpha":"80","toolTipBorderRadius":"2","toolTipPadding":"5",';
        cadenaJson += '"showHoverEffect":"1","legendBgColor":"Fffffff", "legendItemFontSize": "13", "paletteColors": "#FFE019,#1D43A4,#78DC27,#0E2443,#1975EA", "legendItemFontColor": "#666666",   ';
        cadenaJson += '"numberPrefix": "' + vcSimMon + '","legendBorderThickness": "0","legendShadow":"0","legendPosition": "right",';
        cadenaJson += '"showPercentInTooltip": "0", "enableSmartLabels": "0", "decimals": "' + vcNumDec + '",';
        cadenaJson += '"showLegend": "1",';
        cadenaJson += '"exportenabled":"1","showExportDialog":"1","caption":"DISTRIBUCIÓN POR SERVICIOS","subCaption" : "Área';

        //cadenaJson += '},"legendborderalpha": "0", "data": [';


        switch (tipo) {
            case "MONTO":
                cadenaJson += ' - ' + nomOrganizacion + ' " ,"xAxisName" : "' + tipo.toString() + '","yAxisName" : "","numberPrefix" : "' + vcSimMon + '","formatNumberScale":"0","formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"1","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '","showlegend":"1"},"data" :';
                break;
            case "LLAMADAS":
                cadenaJson += ' - ' + nomOrganizacion + ' " ,"xAxisName" : "' + tipo.toString() + '","yAxisName" : "","numberPrefix" : " ","thousandSeparator":"' + vcSimMil + '","formatNumberScale":"0","decimals":"0","forceDecimals":"1","defaultNumberScale":" Llam.","numberscalevalue":"1000000", "numberscaleunit":"Millón de","showlegend":"1"},"data" :';
                break;
            case ("DURACION"):
            case ("DURACIÓN"):
                if (tipoFormatoDuracion == 0) {
                    cadenaJson += ' - ' + nomOrganizacion + ' " ,"xAxisName" : "' + tipo.toString() + '","yAxisName" : "","formatNumberScale":"0","showlegend":"1"},"data" :';
                } else if (tipoFormatoDuracion == 1) { //tipo de formato hh:mm:ss
                    cadenaJson += ' - ' + nomOrganizacion + ' " ,"xAxisName" : "' + tipo.toString() + '","yAxisName" : "","formatNumberScale":"1","defaultNumberScale":"s","numberscalevalue":"60,60","numberScaleUnit":"m,h","scaleRecursively":"1","scaleSeparator":"","showlegend":"1"},"data" :';
                } else if (tipoFormatoDuracion == 2) { //aplicar formato numero a los tipos minutos(dec), segundos
                    cadenaJson += ' - ' + nomOrganizacion + ' " ,"xAxisName" : "' + tipo.toString() + '","yAxisName" : "","formatNumberScale":"1","numberscalevalue":"60","numberScaleUnit":" Min","forceDecimals":"1","decimals":"' + vcNumDec + '","showlegend":"1"},"data" :';
                } else if (tipoFormatoDuracion == 3) { //minutos(ent)
                    cadenaJson += ' - ' + nomOrganizacion + ' " ,"xAxisName" : "' + tipo.toString() + '","yAxisName" : "","formatNumberScale":"1","numberscalevalue":"60","numberScaleUnit":" Min","decimals":"' + "0" + '","showlegend":"1"},"data" :';
                }
                break;
            default:
                cadenaJson += ' - ' + nomOrganizacion + ' " ,"xAxisName" : "' + tipo.toString() + '","yAxisName" : "","numberPrefix" : " ","numberscalevalue":"1000,1000,1000", "numberscaleunit":"Mls,Mll,Bll","showlegend":"1"},"data" :';
                break;
        }
        cadenaJson = cadenaJson + "[" + info + "]}";



        //debugger;

        //cadenaJson = cadenaJson.replace('"Fija",', '"FIJ","Color":"#01B8AA",');
        cadenaJson = cadenaJson.replace('"Celular",', '"Móvil","Color":"#01B8AA",'); //FE6260",');
        //cadenaJson = cadenaJson.replace('"Internacional",', '"DDI","Color":"#EDC911",');
        cadenaJson = cadenaJson.replace('"Otros",', '"Datosx","Color":"#01B8AA",'); //8CD4E1

        //console.log("info: ", info);
        // { "label" : "Fija", "value" :"415"},{ "label" : "Celular", "value" :"0"},{ "label" : "Internacional", "value" :"0"},{ "label" : "Otros", "value" :"0"}


        $("#charts").empty();
        var vTop = '45px';
        if ($("#selectTipo").val() == 'DURACIÓN') {
            $("#charts").append('<label id="lblFormatoDuracion" style="float:right; margin-right:18%; font-weight:bold; font-style:italic; font-size:11px; color:#4297d7;">* ' + arNombreTipoFormato[tipoFormatoDuracion] + '</label>');
            vTop = '33px';
        }
        $("#charts").append('<div id="chartContainerPie-' + contador.toString() + '" style="float:left;top:' + vTop + ';position:relative;"></div> ');

        try {
            //var myChartServicio = new FusionCharts("../../Common/Scripts/FusionCharts/doughnut2d.swf", "myChartId" + contAux.toString(), "400", "300", "0");
            var myChartServicio = new FusionCharts("doughnut2d", "myChartId" + contAux.toString(), "400", "300", "0");
            var JSONCadena = JSON.parse(cadenaJson);

            JSONCadena.data = JSONCadena.data.filter(x => x.label != "Fija" && x.label != "Internacional");

            //console.log("JSONCadena", JSONCadena)

            for (var i in JSONCadena.data) {
                JSONCadena.data[i].alpha = "100";
            }
            myChartServicio.setJSONData(JSONCadena);
            myChartServicio.render("chartContainerPie-" + contador.toString());
        }
        catch (e) {
            //some err..
        }
    }
    else {
        alerta("seleccione un registro");
    }
}

/* grafica los top ten */
function graficar(contador) {
    if (graficos == undefined || graficos == "") {
        return;
    }

    var tipo = $("#selectTipo").val();
    var result = graficos[contador].toString();


    //var jsonResult = JSON.stringify(eval("{" + result + "]}"));
    //
    ////Limpiar valores Miles al resultado...

    //    var result = graficos[contador].toString().split("],");
    //    result = (result[0]).toString().replace(/\[/g, '').replace(/\]/g, '');

    if (result == "") {
        contador = contador == 0 ? 1 : 0;
    }

    if (FusionCharts("myChart" + contador.toString() + contAux.toString())) {
        if (FusionCharts("myChart" + contador.toString() + (contAux - 1).toString())) {
            //alert('se destruye: ' + "myChart" + contador.toString() + (contAux - 1).toString());
            FusionCharts("myChart" + contador.toString() + (contAux - 1).toString()).dispose();
        }
        //alert('x');
        return;
    }
    else {
        //alert('Se crea: ' + "myChart" + contador.toString() + contAux.toString());
    }

    tipo = $("#selectTipo").val();
    var nombreOrg;
    var contadorAux = 0;

    //    result = "";
    //    result = graficos[contador].toString().split("],");
    //    result = (result[0]).toString().replace(/\[/g, '').replace(/\]/g, '');

    if (result == "") {
        clickInicial = 0;
        $("#tabTob-" + contador.toString()).hide();
        if (contador == 0) {
            $("#tabTob-1").click();
        }
        else {
            $("#tabTob-0").click();
        }
    }
    else {
        clickInicial = 1;
        $("#tabTob-" + contador.toString()).click();
    }


    var PaletaColores = '#01B8AA';
    var valueFontColor = "#FFFFFF'";
    var cadenaJson = '{"chart": {';
    cadenaJson += '"baseFont":"Open Sans", "baseFontColor": "#6b737c", "legendBorderThickness": "0","legendShadow":"0","exportFileName":"TopTenCosto",';
    cadenaJson += '"subCaptionFontColor":"#9E9C9C","divlineThickness":"1","canvasbasecolor": "#CCCCCC", "snumberprefix": "",';
    cadenaJson += '"legendItemFontColor":"#666666", "legendItemFontSize":"10", "paletteColors": "' + PaletaColores + '",';
    cadenaJson += '"rotateValues":"1", "sformatnumber":"0", "showHoverEffect":"1", "showShadow":"0", "showXAxisLine":"1", ';
    cadenaJson += '"showPercentValues":"0","showplotborder":"0", "valueFontColor":"' + valueFontColor + '", ';
    cadenaJson += '"xAxisLineThickness":"1","maxLabelWidthPercent":"30", ';
    cadenaJson += '"bgAlpha":"100", "canvasBgColor": "#ffffff", "canvasbgAlpha":"0", "canvasBorderAlpha":"0", "showAlternateHGridColor": "0",';
    cadenaJson += '"captionAlignment":"left","showYAxisLine": "0", "showsyAxisLine": "0","divlineColor": "#999999",';
    cadenaJson += '"divLineDashLen": "1","divLineDashed": "1","divLineGapLen": "0",';
    cadenaJson += '"labeldisplay": "0","slantlabels": "1", "maxColWidth": "35", ';
    cadenaJson += '"showYAxisValues": "1","showvalues": "0","seriesnameintooltip": "1","showlegend": "0","caption": "","xAxisName": "","yAxisName": "","numberPrefix": "' + vcSimMon + '",';
    cadenaJson += '"bgColor": "#ffffff", "showBorder": "0", "showCanvasBorder": "0", "usePlotGradientColor": "0", "plotBorderAlpha": "25","theme": "fusion", "exportenabled" : "1","exportShowMenuItem":"1",';
    cadenaJson += '"placeValuesInside": "1", "showAxisLines": "1", "xAxisLineColor": "#999999", "yAxisLineColor": "#FFFFFF", "axisLineAlpha": "10","divLineIsDashed": "1",';
    cadenaJson += '"divLineAlpha": "30", "showAlternateVGridColor": "0", "captionFontSize": "16", "subcaptionFontSize": "12", "subcaptionFontBold": "0","numberscalevalue": "100,100,100",';
    cadenaJson += '"formatNumberScale": "0", "formatNumber": "1", "forceDecimals": "1", "sdecimals": "0", "decimals": "0",';
    cadenaJson += '"decimalSeparator": "' + vcSimDec + '", "thousandSeparator": "' + vcSimMil + '",';
    cadenaJson += '"subCaption" : "Top Ten por Agrupados por ';
    if (contador > 0) {
        cadenaJson += "Empleados ";
    }
    else {
        cadenaJson += "Organización ";
    }
    //CONFIGURACIOIN DE CHART SEGUN TIPO
    switch (tipo) {
        case "MONTO":
            cadenaJson += ' - ' + nomOrganizacion + ' " ,"xAxisName" : "' + tipo.toString() + '","yAxisName" : "' + //","numberPrefix" : "' + vcSimMon +
                '","decimals":"' + vcNumDec + '","forceDecimals":"1","decimalSeparator":"' + vcSimDec +
                '","numberScaleValue":"1000,1000,1000", "numberScaleUnit":"Mls,Mll,Bll", "thousandSeparator":"' + vcSimMil + '"},';
            break;
        case ("DURACION"):
        case ("DURACIÓN"):
            //cadenaJson += ' - ' + nomOrganizacion + ' " ,"xAxisName" : "' + tipo.toString() + '","yAxisName" : "","numberPrefix" : " ","numberscalevalue":"1000,1000,1000", "numberscaleunit":"Mls,Mll,Bll"},';
            if (tipoFormatoDuracion == 0 || tipoFormatoDuracion == 3) {//segundos, minutos entero
                cadenaJson += ' - ' + nomOrganizacion + ' " ,"xAxisName" : "Consumo","yAxisName" : "","numberPrefix" : " ","formatNumberScale":"0","formatNumber":"1","decimals":"0","forceDecimals":"1","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},';
            } else if (tipoFormatoDuracion == 2) { //minutos decimal
                cadenaJson += ' - ' + nomOrganizacion + ' " ,"xAxisName" : "Consumo","yAxisName" : "","numberPrefix" : " ","formatNumberScale":"0","formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"1","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},';
            } else if (tipoFormatoDuracion == 1) { //hh:mm:ss
                cadenaJson += ' - ' + nomOrganizacion + ' " ,"xAxisName" : "Consumo","yAxisName" : "","numberPrefix" : " ","formatNumberScale":"0","formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"1","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},';
            }
            break;
        case ("LLAMADAS"):
            cadenaJson += ' - ' + nomOrganizacion + ' " ,"xAxisName" : "Cantidad","yAxisName" : "","numberPrefix" : " ","formatNumberScale":"0","formatNumber":"1","decimals":"0","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},';
            break;
        default:
            cadenaJson += ' - ' + nomOrganizacion + ' " ,"xAxisName" : "Cantidad","yAxisName" : "","numberPrefix" : " ","numberscalevalue":"1000,1000,1000", "numberscaleunit":"Mls,Mll,Bll","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '","decimals":"' + vcNumDec + '"},';
            break;
    }
    cadenaJson = cadenaJson + result + "]}";

    //alert(cadenaJson);

    try {
        //alert('Objeto creado: ' + "myChart" + contador.toString() + contAux.toString());
        if (FusionCharts("myChart" + contador.toString() + contAux.toString())) {
            return;
        }
        //var myChart = new FusionCharts("../../Common/Scripts/FusionCharts/bar2D.swf", "myChart" + contador.toString() + contAux.toString(), "475", "300", "0");
        var myChart = new FusionCharts("StackedBar2D", "myChart" + contador.toString() + contAux.toString(), "100%", "300", "0");


        //console.log(cadenaJson);

        var JSONCadena = JSON.parse(cadenaJson);
        var Labels = JSONCadena.categories[0].category;
        for (var i in JSONCadena.dataset[0].data) {
            JSONCadena.dataset[0].data[i].color = "#01B8AA";
            JSONCadena.dataset[0].data[i].alpha = "100";
            JSONCadena.dataset[0].data[i].label = Labels[i].label;
            JSONCadena.dataset[0].data[i].tooltext = Labels[i].label;
        }

        myChart.setJSONData(JSONCadena);
        myChart.render("tob-" + contador.toString());
    }
    catch (e) {
        //some err..
    }

    $('#divCargando').dialog("close");

}

function dibujarChartsTopTen() {
    //var tipo = $("#selectTipo").val();
    //var telefonia = $("#selectTelefonia").val();
    var nivel = $("#nivelOrg").val();
    //var periodo = $("#ddlMes").val();

    var topTenEmpleadosOrganizacion_Data = {
        prPeriodo: periodo,
        prTipo: tipo,
        prTelefonia: telefonia,
        prCodigo: nivel,
        prFormatDur: tipoFormatoDuracion,
        prTipEmp: tipoListEmpleados
    };

    $.ajax({
        type: "POST",
        url: "Sum_Navegacion.aspx/topTenEmpleadosOrganizacion",
        data: JSON.stringify(topTenEmpleadosOrganizacion_Data),
        //data: "{'prPeriodo': '" + periodo + "'," +
        //        "'prTipo': '" + tipo + "'," +
        //        "'prTelefonia': '" + telefonia + "'," +
        //        "'prCodigo': '" + nivel + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var result = "", result2 = "", aux = 0;
            graficos = resultado.d;
            var i;
            for (i = 0; i < graficos.length; i++) {
                result = graficos[i].toString().split("}]},");
                result = (result[0]).toString().replace(/\[/g, '').replace(/\]/g, '');

                if (result != "") { $("#tabTob-" + i.toString()).show(); aux = 1; }
                else { $("#tabTob-" + i.toString()).hide(); }
            }

            if (aux > 0) {
                graficar(0);
            }
            else {
                $('#divCargando').dialog("close");
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function acceder(codigo) {
    if (biNavegacionBloqueada) {
        return;
    }

    fnBloquearNavegacion(true);

    var codOrganizacion = 0;
    codigo = codigo.toString().replace(/\//g, '');

    if (codigo[0] != 'e') {
        $("#nivelOrg").val(codigo);
        load();
        contAux = contAux + 1;
        clickInicial = 0;
    } else {
        fnBloquearNavegacion(false);
    }
}

function subirNivel(codigo) {
    if (biNavegacionBloqueada) {
        return;
    }
    if ($(".btnSubirNivel").length == 0) {
        return;
    }

    fnBloquearNavegacion(true);
    var codOrganizacion = 0;
    codOrganizacion = $("#nivelOrg").val();
    $("#nivelOrg").val(codOrganizacion.substring(0, codOrganizacion.length - 3));
    load();
}

/*  Permite obtener el nombre de la columna y el codigo del nivel 
*   Para mostrar los detalles del mismo.                       **/
function mtrDetalle(datos) {
    //var tipo = $("#selectTipo").val();
    //var telefonia = $("#selectTelefonia").val();
    //var periodo = $("#ddlMes").val();
    var tipoCodigo = "";
    var nomEmpleYOrganizacion = "";
    datos = datos.toString().replace(/\//g, '');
    datos = datos.split(',');

    debugger;

    datos[0] = datos[0].toString() == "Local" ? "LOC" : datos[0].toString();
    datos[0] = datos[0].toString() == "Nacional" ? "DDN" : datos[0].toString();
    datos[0] = datos[0].toString() == "Internacional" ? "DDI" : datos[0].toString();
    datos[0] = datos[0].toString() == "Celular" ? "CEL" : datos[0].toString();
    nomEmpleYOrganizacion = datos[2].toString();

    var DetallePorGlobal_Data = {
        prPeriodo: periodo,
        prCodigo: datos[1].toString(),
        prTipo: tipo,
        prTelefonia: telefonia,
        prGlobal: datos[0].toString(),
        prFormatoDuracion: tipoFormatoDuracion
    };
    $.ajax({
        type: "POST",
        url: "Sum_Navegacion.aspx/DetallePorGlobal",
        data: JSON.stringify(DetallePorGlobal_Data),
        //data: "{'prPeriodo': '" + periodo + "'," +
        //        "'prCodigo': '" + datos[1].toString() + "'," +
        //        "'prTipo': '" + tipo + "'," +
        //        "'prTelefonia': '" + telefonia + "'," +
        //        "'prGlobal': '" + datos[0].toString() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var contador;
            for (contador = 0; contador < 1; contador++) {
                var resul = resultado.d[contador].toString().split("],");

                var columnas = JSON.parse(resul[0].toString() + "]");
                var datos = JSON.parse(resul[1]);

                try {
                    columnas[1].width = "475"; //Nombre
                    columnas[2].width = "100"; //Cantidad
                    columnas[3].width = "100"; //Consumo
                    columnas[4].width = "100"; //Monto
                } catch (e) {

                }

                $("#detGlobal").empty();
                $("#detGlobal").append('<table id="tbDetGlobal-' + contador.toString() + '"></table><div id="pagerDetGlobal-' + contador.toString() + '"></div> ');

                $("#tbDetGlobal-" + contador.toString()).jqGrid({
                    datatype: "local",
                    colModel: columnas,
                    data: datos,
                    rowNum: 25,
                    shrinkToFit: false,
                    rowList: [5, 15, 25],
                    pager: '#pagerDetGlobal-' + contador.toString(),
                    gridview: true,
                    emptyrecords: "No hay registros que mostrar",
                    viewrecords: true,
                    width: "680",
                    height: "180",
                    rownumbers: false,
                    caption: "Detalle de registros por servicio.",
                    gridComplete: function () {
                        modalImagenUsuario = $("#detGlobal").dialog({
                            title: nomEmpleYOrganizacion,
                            width: 700,
                            height: 300,
                            modal: true,
                            resizable: false
                        });
                    },
                    onPaging: function (pgButton) {
                        if (pgButton == "user") {
                            var requestedPage = $("#tbDetGlobal-" + contador.toString()).getGridParam("page");
                            var lastPage = $("#tbDetGlobal-" + contador.toString()).getGridParam("lastpage");
                            if (requestedPage > lastPage) {
                                $("#tbDetGlobal-" + contador.toString()).setGridParam({ page: lastPage }).trigger("reloadGrid");
                            }
                        }
                    }
                });
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}








