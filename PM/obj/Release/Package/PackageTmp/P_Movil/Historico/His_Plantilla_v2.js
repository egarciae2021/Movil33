/// <reference path="../../Common/Scripts/jquery-2.0.0-vsdoc.js" />
var tipoFormatoDuracion = 3; //0=segundos, 1=hh:mm:ss, 2=minutos(decimal), 3=minutos(entero)
var arNombreTipoFormato = ['Duración mostrada en segundos', 'Duración mostrada en formato tipo hh:mm:ss', 'Duración mostrada en minutos decimales', 'Duración mostrada en minutos enteros'];

var contador = 1;
var cantidad = 3;
var granularidad;
var servicio;
var tipo;
var telefonia;
var nivel;
var y;
var x;
var tieneNivel;
var dat;
var myChart1;
var myChart2;
var myChart3;
var myChart4;
//agregado 15-10-2013 wapumayta
//var arDatosExportacion = new Array;
var arDatosExportacion = [];
var datosExportacion = "";
var tipoRep = "";
//configuracion
var vcNomMon = "Soles";
var vcSimMon = "S/.";
var vcNumDec = '2';
var vcSimDec = '.';
var vcSimMil = ' ';
var formatHora = "hh:mm:ss";
//-----------------------
var miVistaActual = 0;// 0=Total | 1=Llamadas | 2=Mensajes | 3=Datos
var misServiciosLlamadas = [
    { value: "LOC", texto: "Fija", selected: true },
    { value: "CEL", texto: "Celular", selected: false },
    //{ value: "DDN", texto: "Nacional", selected: false },
    { value: "DDI", texto: "Internacional", selected: false },
    { value: "TotalLlamadas", texto: "Total", selected: false }
];
var oCulturaUsuario = null;

var IdTapGlobal = "";
var TapDinamicoSeleccionado = "0";
var DiccionarioServiciosDinamicos = {};
var vcExpEn = "";
var vGlobalChart = ''; //05-11-2014 wapumayta
$(function () {
    oCulturaUsuario = window.parent.oCulturaUsuario;
    vcSimDec = oCulturaUsuario.vcSimDec;
    vcSimMil = oCulturaUsuario.vcSimSepMil;
    vcNumDec = oCulturaUsuario.dcNumDec.toString();
    vcSimMon = oCulturaUsuario.Moneda.vcSimMon;
    vcNomMon = oCulturaUsuario.Moneda.vcNomLar;

    fnAgregarTapsTipoServicio();
    //cargar datos de cultura
    //vcNumDec = $("#hdfNumDec").val();
    //vcSimDec = $("#hdfSimDec").val();
    //vcSimMil = $("#hdfSimMil").val();
    //vcSimMon = $("#hdfSimMon").val();
    //vcNomMon = $("#hdfNomMon").val();

    //nuevos filtros de busqueda en grilla agregado 14-10-2013 wapumayta
    $("#btnExportar").button();
    $("#btnExportar").click(function () {
        tipoRep = 'RepHistorico';
        ExportarExcel();
    });
    function ExportarExcel() {
        //alert(datosExportacion);
        pagina = raiz("P_Movil/Administrar/Adm_Reporte.aspx?Tipo=" + tipoRep + "&vcTab=" + $("#hdf_Tabla").val() + "&Detalle=" + datosExportacion);
        //pagina = raiz("P_Movil/Administrar/Adm_Reporte.aspx?Tipo=" + tipoRep + "&vcTab=" + $("#hdf_Tabla").val() + "&Detalle=1");
        //alert(pagina);
        $("#ifExcel").attr("src", pagina);

    }
    //22-10-2013 wapumayta
    $("#txtFiltro").live("keypress", function (e) {
        if (e.keyCode == 13) {
            load();
        } else {
            return ValidarAlfaNumericoConEspacios(e);
        }
    });
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
        //for (var m = 0; m < chartImg.length; m++) {
        //    var chartId = $(chartImg[m]).attr("id");
        //    var tituloChart = $("span[id=" + chartId + "] g[class ^= red-caption] tspan");
        //    var tituloText = $(tituloChart).text();
        //    $("#tbGraficos").append('<tr><td>' + tituloText + '</td><td align="right"><select id="ddl-' + chartId + '"><option value="NO" selected="selected">No Descargar</option><option value="PNG">Descargar como PNG</option><option value="JPG">Descargar como JPG</option><option value="PDF">Descargar como PDF</option></select></td></tr>');
        //    arDescImg.push({ value: chartId, text: tituloText });
        //};
        var chartId = $(chartImg[0]).attr("id");
        var tituloChart = $("span[id=" + chartId + "] g[class ^= red-caption] tspan");
        var tituloText = $(tituloChart).text();
        $("#tbGraficos").append('<tr><td>' + tituloText + '</td><td align="right"><select id="ddl-' + chartId + '"><option value="NO" selected="selected">No Descargar</option><option value="PNG">Descargar como PNG</option><option value="JPG">Descargar como JPG</option><option value="PDF">Descargar como PDF</option></select></td></tr>');
        arDescImg.push({ value: chartId, text: tituloText });

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
        }
        return result;
    }
    //fin exportar imagenes

    $("#panelBusqueda").css("padding", "0px");

    $("#beginning").button({
        text: false,
        icons: {
            primary: "ui-icon-seek-start"
        }
    });

    $("#beginning").click(function () {
        $("#hisFilBody div").hide();
        $("#hisFilBody div:first").fadeIn(200);
        $("#hisFil #toolbar #content").text($("#hisFilBody div:first").attr("name"));
    });

    //$("#eliChart").button({
    //    text: false,
    //    icons: {
    //        primary: "ui-icon-close"
    //    }
    //});

    $("#CloseHisFil").button({
        text: false,
        icons: {
            primary: "ui-icon-circle-close"
        }
    });

    //$("#eliChart").click(function () {

    //    var id = $("#hisFilBody div:visible").attr("id");
    //    var div = $("#hisFilBody div");

    //    if (div.length == 1) {
    //        $("#hisFilBody div:visible").remove();
    //        $("#CloseHisFil").click();
    //    }
    //    else {
    //        $("#hisFilBody div:visible").remove();
    //        $("#hisFilBody div:first").fadeIn(200);
    //    }

    //});

    $("#rewind").button({
        text: false,
        icons: {
            primary: "ui-icon-seek-prev"
        }
    });

    $("#rewind").click(function () {

        var id = $("#hisFilBody div:visible").attr("id");
        var div = $("#hisFilBody div");
        var index;
        var i;
        for (i = 0; i < div.length; i++) {
            if (id == div[i]["id"]) {
                index = i;
            }
        }

        if (index != 0) {
            $("#" + id).hide();
            $("#" + div[index - 1]["id"]).show(300);
            $("#hisFil #toolbar #content").text($("#" + div[index - 1]["id"]).attr("name"));
        }
    });

    $("#forward").button({
        text: false,
        icons: {
            primary: "ui-icon-seek-next"
        }
    });

    $("#forward").click(function () {

        var id = $("#hisFilBody div:visible").attr("id");
        $("#hisFilBody div:visible + div").show(300, function () {
            $("#" + id).hide();
            $("#hisFil #toolbar #content").text($("#hisFilBody div:visible").attr("name"));
        });

    });
    $("#end").button({
        text: false,
        icons: {
            primary: "ui-icon-seek-end"
        }
    });
    $("#end").click(function () {
        $("#hisFilBody div").hide();
        $("#hisFilBody div:last").show(300);
        $("#hisFil #toolbar #content").text($("#hisFilBody div:last").attr("name"));
    });

    tieneNivel = $("#hdf_Tabla").val() == 'M_ORGA';
    if (!tieneNivel) {
        $("#filaNivel").hide();
    }

    if ($("#hdf_conFiltro").val() == "1") {
        $("#radioPorMaestro").show();
    }
    else {
        $("#radioPorMaestro").hide();
    }

    //FusionCharts.setCurrentRenderer('javascript');

    $(".boton").button();
    $("#radio").buttonset();
    $("#radioPorMaestro").buttonset();
    $("#RadioChar-1").buttonset();
    $("#RadioChar-2").buttonset();
    //$("#btnBuscar").button({ icons: { secondary: "ui-icon-signal"} });
    $("#btnBuscar").button();

    $("#btnBuscar").click(function () {
        //FusionCharts("myChartId-1").print()
        load();
    });

    $("#RadioChar-1").click(function () {
        dibujarChart1(obtenerDatosGrilla());
    });

    $("#RadioChar-2").click(function () {
        dibujarChart2(obtenerDatosGrilla2());
    });

    $("#radio1").click(function () {
        $("#lblPor").hide(0, function () {
            $("#lblPor").html("Últimos Años:");
            $("#lblPor").show(200);
        });
    });

    $("#radio2").click(function () {
        $("#lblPor").hide(0, function () {
            $("#lblPor").html("Últimos Meses:");
            $("#lblPor").show(200);
        });
    });

    $("#ddlTipoVista").change(function () {
        if ($("#ddlTipoVista").val() == '1') {
            dibujarChart1(obtenerDatosGrilla());
            dibujarChart2(obtenerDatosGrilla2());
        } else {
            dibujarChart1(obtenerDatosGrillaTotalizado());
        }
    });

    $("#ddlTipoChart-1").change(function () { dibujarChart1(obtenerDatosGrilla()); });

    $("#ddlTipoChart-2").change(function () { dibujarChart2(obtenerDatosGrilla()); });

    $("#btnMostrarPanel").click(function () { $("#panelBusqueda").toggle(500); });

    //    $('#chart-1').bind('contextmenu', function (e) {
    //        // evito que se ejecute el evento
    //        e.preventDefault();
    //        // conjunto de acciones a realizar
    //        

    //        //alert(e.pageX + ', ' + e.pageY);
    //        $("#menu").css('left', e.pageX - 20);
    //        $("#menu").css('top', e.pageY - 20);
    //        $("#menu").hide(0, function () {
    //            $("#menu").show(300);
    //        });
    //    })

    $("#menu").mouseleave(function () {
        $("#menu").hide();
        $("#descEle").hide();
    });
    $(".boton").mouseleave(function () {
        $("#descEle").hide();
    });

    $(document).mousemove(function (e) {
        x = e.pageX;
        y = e.pageY;
    });

    $(".boton").click(function () {
        var click = $(this).attr("id");

        if ($("#hisFil").css("display") == "none") {
            $("#descEle").hide(0, function () {
                $("#menu").hide(0, function () {
                    $("#gen").hide(0, function () {

                        var and;
                        if ($("#hdf_F_Codigo").val() == 'CODINT_VC') {

                            and = "and substring(CODINT_VC,1," + ($("#elecod").text().length / 3).toString() + "*3) = |" + $("#elecod").text() + "|";
                        }
                        else {
                            and = "and " + $("#hdf_F_Codigo").val() + "= |" + $("#elecod").text() + "|";
                        }

                        //var nom = "-" + click.split('-')[0] + "-" + telefonia + "-" + tipo + "-" + $("#descEle #eleSer").text() + "-" + $("#descEle #elePer").text(); //comentado 05-11-2014 wapumayta
                        var velser = $("#descEle #eleSer").text() == "Total" ? '' : ' ' + $("#descEle #eleSer").text();
                        var nom = "-" + click.split('-')[0] + "-" + telefonia + "-" + tipo + "-" + vGlobalChart + "-" + $("#descEle #elePer").text() + velser;


                        nom = nom.replace(/\s/g, "");

                        $("#hisFilBody div").hide();

                        var di = $("#hisFilBody div");

                        var existe = false;
                        var i;
                        for (i = 0; i < di.length; i++) {
                            if (di[i]['id'] == "d" + nom) {
                                existe = true;
                                break;
                            }
                        }

                        if (existe) {
                            $("#d" + nom).show();
                        }
                        else {

                            $.ajax({
                                type: "POST",
                                url: "His_Plantilla.aspx/listarGenericoFiltro",
                                data: "{'prCodigo': '" + click.split('-')[0] + "'," +
                                    "'prDescripcion': '" + click.split('-')[1] + "'," +
                                    "'prTelefonia': '" + telefonia + "'," +
                                    "'prTipo': '" + tipo + "'," +
                                    //"'prGlobal': '" + $("#descEle #eleSer").text() + "'," +
                                    "'prGlobal': '" + vGlobalChart + "'," +
                                    //"'prFiltro': '" + $("#descEle #elePer").text() + "'," +
                                    "'prFiltro': '" + $("#descEle #elePer").text() + velser + "'," +
                                    "'prGranulidad': '" + '' + "'," +
                                    "'prFiltroPer': '" + and + "'}",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (resultado) {

                                    var resul = resultado.d;
                                    var columnas = JSON.parse(resul[0]);
                                    var datos = JSON.parse(resul[1]);

                                    var eleme = $("#descEle #eleEle").text().replace(/\s/g, "");
                                    $("#hisFilBody").append('<div id="d' + nom + '" name="' + $("#descEle").text() + '" style="width:830px; height:500px; border:0px dotted gray; margin:auto;"></div>');

                                    var cadenaJson;
                                    if (tipo == "DURACION") {
                                        cadenaJson = '{"chart": {"caption" : "" ,"xAxisName" : "' + eleme + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","scaleRecursively":"1","defaultNumberScale":"s", "numberscalevalue":"60,60", "numberscaleunit":"Min,Hr"},"data" :[';
                                    }
                                    else {
                                        cadenaJson = '{"chart": {"caption" : "" ,"xAxisName" : "' + eleme + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","numberscalevalue":"1000,1000,1000", "numberScaleUnit":"Mls,Mll,Bll"},"data" :[';
                                    }
                                    //                                    switch (tipo) {
                                    //                                        case "DURACION":
                                    //                                            cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "","useroundedges":"1","showvalues": "1","scaleRecursively":"1","defaultNumberScale":"s", "numberscalevalue":"60,60","scaleSeparator":"","numberscaleunit":"m,h"},';
                                    //                                            break;
                                    //                                        case "MONTO", "COSTO":
                                    //                                            //cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + vcSimMon + '","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"0","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},';
                                    //                                            cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + ' (' + vcSimMon + ')","numberPrefix" : "","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"0","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},';
                                    //                                            break;
                                    //                                        case "LLAMADAS":
                                    //                                            cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "thousandSeparator":"' + vcSimMil + '"},';
                                    //                                            break;
                                    //                                        default:
                                    //                                            cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","numberscalevalue":"1000,1000,1000", "numberscaleunit":"Mls,Mll,Bll"},';
                                    //                                            break;
                                    //                                    }

                                    var filas = []; //CloseHisFil

                                    if (datos.length == 0) {
                                        alerta("No hay datos");
                                        $("#CloseHisFil").click();
                                        return;
                                    }




                                    var i;
                                    for (i = 0; i < datos.length; i++) {

                                        if (tipo == "DURACION") {
                                            if (click.split('-')[0] == "NUMERO") {
                                                filas.push('{ "label" : "' + datos[i]["DESCRIPCION"] + "(" + datos[i]["CODIGO"] + ")" + '", "value" : "' + obtenerSegundosDeTime(datos[i][tipo]) + '", "link": "j-clickChart-' + datos[i]["DESCRIPCION"] + ',' + datos[i][tipo] + ',' + datos[i]["CODIGO"] + ',' + click.split('-')[0] + '" }');
                                            }
                                            else {

                                                if (click.split('-')[0] == "CODINT_VC") {
                                                    filas.push('{ "label" : "' + datos[i]["DESCRIPCION"] + '", "value" : "' + obtenerSegundosDeTime(datos[i][tipo]) + '", "link": "j-clickChart-' + datos[i]["DESCRIPCION"] + ',' + datos[i][tipo] + ',' + (datos[i]["CODIGOX"] == undefined ? datos[i]["CODIGO"] : datos[i]["CODIGOX"]) + ',' + click.split('-')[0] + '" }');
                                                }
                                                else if (click.split('-')[0] == "codext") {
                                                    filas.push('{ "label" : "' + datos[i]["DESCRIPCION"] + "<br />" + datos[i].CODIGO + '", "value" : "' + obtenerSegundosDeTime(datos[i][tipo]) + '", "link": "j-clickChart-' + datos[i]["DESCRIPCION"] + ',' + datos[i][tipo] + ',' + datos[i]["CODIGO"] + ',' + click.split('-')[0] + '" }');
                                                }
                                                else {
                                                    filas.push('{ "label" : "' + datos[i]["DESCRIPCION"] + '", "value" : "' + obtenerSegundosDeTime(datos[i][tipo]) + '", "link": "j-clickChart-' + datos[i]["DESCRIPCION"] + ',' + datos[i][tipo] + ',' + datos[i]["CODIGO"] + ',' + click.split('-')[0] + '" }');
                                                }
                                            }
                                        }
                                        else {
                                            if (click.split('-')[0] == "NUMERO") {
                                                filas.push('{ "label" : "' + datos[i]["DESCRIPCION"] + "(" + datos[i]["CODIGO"] + ")" + '", "value" : "' + datos[i][tipo] + '", "link": "j-clickChart-' + datos[i]["DESCRIPCION"] + ',' + datos[i][tipo] + ',' + datos[i]["CODIGO"] + ',' + click.split('-')[0] + '" }');
                                            }
                                            else {

                                                if (click.split('-')[0] == "CODINT_VC") {
                                                    filas.push('{ "label" : "' + datos[i]["DESCRIPCION"] + '", "value" : "' + datos[i][tipo] + '", "link": "j-clickChart-' + datos[i]["DESCRIPCION"] + ',' + datos[i][tipo] + ',' + (datos[i]["CODIGOX"] == undefined ? datos[i]["CODIGO"] : datos[i]["CODIGOX"]) + ',' + click.split('-')[0] + '" }');
                                                }
                                                else if (click.split('-')[0] == "codext") {
                                                    filas.push('{ "label" : "' + datos[i]["DESCRIPCION"] + "<br />" + datos[i].CODIGO + '", "value" : "' + datos[i][tipo] + '", "link": "j-clickChart-' + datos[i]["DESCRIPCION"] + ',' + datos[i][tipo] + ',' + datos[i]["CODIGO"] + ',' + click.split('-')[0] + '" }');
                                                }
                                                else {
                                                    filas.push('{ "label" : "' + datos[i]["DESCRIPCION"] + '", "value" : "' + datos[i][tipo] + '", "link": "j-clickChart-' + datos[i]["DESCRIPCION"] + ',' + datos[i][tipo] + ',' + datos[i]["CODIGO"] + ',' + click.split('-')[0] + '" }');
                                                }
                                            }
                                        }



                                    }

                                    cadenaJson = cadenaJson + filas.join(",") + "]}";

                                    var JSON_chart = JSON.parse(cadenaJson);
                                    JSON_chart.legendBorderThickness = "0";
                                    JSON_chart.legendShadow = "0";
                                    JSON_chart.chart.useroundedges = "0";
                                    if (JSON_chart.data) {
                                        if (JSON_chart.data.length > 0) {
                                            for (var i in JSON_chart.data) {
                                                JSON_chart.data[i].color = "#FD8943";
                                                JSON_chart.data[i].alpha = "100";
                                            }
                                        }
                                    }
                                    //myChart1 = new FusionCharts("MSCombiDY2D", "ch" + nom, "100%", "550", "0");
                                    myChart1 = new FusionCharts("Column2D", "ch" + nom, "100%", "550", "0");

                                    myChart1.setJSONData(JSON_chart);
                                    myChart1.setTransparent(true);
                                    myChart1.render("d" + nom);

                                    $("#hisFil #toolbar #content").text($("#d" + nom).attr("name"));


                                },
                                error: function (xhr, err, thrErr) {
                                    MostrarErrorAjax(xhr, err, thrErr);
                                }
                            });
                        }

                        $("#hisFil").fadeIn(200, function () {
                            var ee = $("#hisFilBody").position();
                            //$("#eliChart").css("left", ee.left + 800);

                        });
                    });
                });
            });
        }
        else {

            //AUMENTAR GRAFICOS

            $("#descEle").hide(0, function () {
                $("#menu").hide(0, function () {
                    var id = $("#hisFilBody div:visible").attr("id").split("-");
                    var nom = "-" + click.split('-')[0] + "-" + id[2] + "-" + id[3] + "-" + id[4] + "-" + id[5];

                    var fil = $("#menu").attr("name");

                    var and;
                    if (fil.split(',')[3] == 'CODINT_VC') {
                        and = "and substring(CODINT_VC,1," + (fil.split(',')[2].length / 3).toString() + "*3) = |" + fil.split(',')[2] + "|";
                    }
                    else {
                        and = "and " + fil.split(',')[3] + "= |" + fil.split(',')[2] + "|";
                    }

                    $("#hisFilBody div").hide();

                    var di = $("#hisFilBody div");

                    var existe = false;
                    var i;
                    for (i = 0; i < di.length; i++) {
                        if (di[i]['id'] == "d" + nom) {
                            existe = true;
                            break;
                        }
                    }

                    if (existe) {
                        $("#d" + nom).show();
                    }
                    else {

                        var peri = id[5];
                        if (peri.length > 4) {
                            peri = peri.substr(0, 3) + " " + peri.substr(3);

                        }

                        $.ajax({
                            type: "POST",
                            url: "His_Plantilla.aspx/listarGenericoFiltro",
                            data: "{'prCodigo': '" + click.split('-')[0] + "'," +
                                "'prDescripcion': '" + click.split('-')[1] + "'," +
                                "'prTelefonia': '" + id[2] + "'," +
                                "'prTipo': '" + id[3] + "'," +
                                "'prGlobal': '" + id[4] + "'," +
                                "'prFiltro': '" + peri + "'," +
                                "'prGranulidad': '" + '' + "'," +
                                "'prFiltroPer': '" + and + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (resultado) {
                                var resul = resultado.d;
                                var columnas = JSON.parse(resul[0]);
                                var datos = JSON.parse(resul[1]);

                                var eleme = $("#descEle #eleEle").text().replace(/\s/g, "");
                                $("#hisFilBody").append('<div id="d' + nom + '" name="' + $("#descEle").text() + '" style="width:830px; height:500px; border:0px dotted gray; margin:auto;"></div>');

                                var cadenaJson;
                                if (tipo == "DURACION") {
                                    cadenaJson = '{"chart": {"caption" : "" ,"xAxisName" : "' + eleme + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","scaleRecursively":"1","defaultNumberScale":"s", "numberscalevalue":"60,60", "numberscaleunit":"Min,Hr"},"data" :[';
                                }
                                else {
                                    cadenaJson = '{"chart": {"caption" : "" ,"xAxisName" : "' + eleme + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","numberscalevalue":"1000,1000,1000", "numberscaleunit":"Mls,Mll,Bll"},"data" :[';
                                }


                                if (datos.length == 0) {
                                    alerta("No hay datos");
                                    //$("#eliChart").click();
                                    return;
                                }


                                var filas = [];

                                var i;
                                for (i = 0; i < datos.length; i++) {

                                    if (tipo == "DURACION") {
                                        if (click.split('-')[0] == "NUMERO") {
                                            filas.push('{ "label" : "' + datos[i]["DESCRIPCION"] + "(" + datos[i]["CODIGO"] + ")" + '", "value" : "' + obtenerSegundosDeTime(datos[i][tipo]) + '", "link": "j-clickChart-' + datos[i]["DESCRIPCION"] + ',' + datos[i][tipo] + ',' + datos[i]["CODIGO"] + ',' + click.split('-')[0] + '" }');
                                        }
                                        else {

                                            if (click.split('-')[0] == "CODINT_VC") {
                                                filas.push('{ "label" : "' + datos[i]["DESCRIPCION"] + '", "value" : "' + obtenerSegundosDeTime(datos[i][tipo]) + '", "link": "j-clickChart-' + datos[i]["DESCRIPCION"] + ',' + datos[i][tipo] + ',' + (datos[i]["CODIGOX"] == undefined ? datos[i]["CODIGO"] : datos[i]["CODIGOX"]) + ',' + click.split('-')[0] + '" }');
                                            }
                                            else if (click.split('-')[0] == "codext") {
                                                filas.push('{ "label" : "' + datos[i]["DESCRIPCION"] + "<br />" + datos[i].CODIGO + '", "value" : "' + obtenerSegundosDeTime(datos[i][tipo]) + '", "link": "j-clickChart-' + datos[i]["DESCRIPCION"] + ',' + datos[i][tipo] + ',' + datos[i]["CODIGO"] + ',' + click.split('-')[0] + '" }');
                                            }
                                            else {
                                                filas.push('{ "label" : "' + datos[i]["DESCRIPCION"] + '", "value" : "' + obtenerSegundosDeTime(datos[i][tipo]) + '", "link": "j-clickChart-' + datos[i]["DESCRIPCION"] + ',' + datos[i][tipo] + ',' + datos[i]["CODIGO"] + ',' + click.split('-')[0] + '" }');
                                            }
                                        }
                                    }
                                    else {
                                        if (click.split('-')[0] == "NUMERO") {
                                            filas.push('{ "label" : "' + datos[i]["DESCRIPCION"] + "(" + datos[i]["CODIGO"] + ")" + '", "value" : "' + datos[i][tipo] + '", "link": "j-clickChart-' + datos[i]["DESCRIPCION"] + ',' + datos[i][tipo] + ',' + datos[i]["CODIGO"] + ',' + click.split('-')[0] + '" }');
                                        }
                                        else {

                                            if (click.split('-')[0] == "CODINT_VC") {
                                                filas.push('{ "label" : "' + datos[i]["DESCRIPCION"] + '", "value" : "' + datos[i][tipo] + '", "link": "j-clickChart-' + datos[i]["DESCRIPCION"] + ',' + datos[i][tipo] + ',' + (datos[i]["CODIGOX"] == undefined ? datos[i]["CODIGO"] : datos[i]["CODIGOX"]) + ',' + click.split('-')[0] + '" }');
                                            }
                                            else if (click.split('-')[0] == "codext") {
                                                filas.push('{ "label" : "' + datos[i]["DESCRIPCION"] + "<br />" + datos[i].CODIGO + '", "value" : "' + datos[i][tipo] + '", "link": "j-clickChart-' + datos[i]["DESCRIPCION"] + ',' + datos[i][tipo] + ',' + datos[i]["CODIGO"] + ',' + click.split('-')[0] + '" }');
                                            }
                                            else {
                                                filas.push('{ "label" : "' + datos[i]["DESCRIPCION"] + '", "value" : "' + datos[i][tipo] + '", "link": "j-clickChart-' + datos[i]["DESCRIPCION"] + ',' + datos[i][tipo] + ',' + datos[i]["CODIGO"] + ',' + click.split('-')[0] + '" }');
                                            }
                                        }
                                    }
                                }

                                cadenaJson = cadenaJson + filas.join(",") + "]}";


                                var JSON_chart = JSON.parse(cadenaJson);
                                JSON_chart.legendBorderThickness = "0";
                                JSON_chart.legendShadow = "0";
                                JSON_chart.chart.useroundedges = "0";
                                if (JSON_chart.data) {
                                    if (JSON_chart.data.length > 0) {
                                        for (var i in JSON_chart.data) {
                                            JSON_chart.data[i].color = "#FD8943";
                                            JSON_chart.data[i].alpha = "100";
                                        }
                                    }
                                }

                                //if (!(FusionCharts("c" + nom))) {
                                //    myChart2 = new FusionCharts("../../Common/Scripts/FusionCharts/Column3D.swf", "c" + nom, "800", "550", "0");
                                //}
                                myChart2 = new FusionCharts("Column2D", "c" + nom, "100%", "550", "0");

                                myChart2.setJSONData(JSON_chart);
                                myChart2.setTransparent(true);
                                myChart2.render("d" + nom);

                                $("#hisFil #toolbar #content").text($("#d" + nom).attr("name"));


                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });

                    }

                });
            });

        }

    });

    $("#CloseHisFil").click(function () {
        $("#hisFil").hide(0, function () {
            $("#hisFilBody div").remove();
            $("#gen").fadeIn(200);
        });
    });

    //agregado 25-09-2013 wapumayta
    $("#selectTelefonia").change(function () {
        //if (miVistaActual != 0) {
        //    if ($("#selectTelefonia").val() == 'ENT') {
        //        $("#selectTipo option[value=COSTO]").remove();
        //    } else {
        //        $("#selectTipo option[value=COSTO]").remove();
        //        $("#selectTipo").append('<option value="COSTO" selected="selected">Monto</option>');
        //    }
        //}
    });


    //debugger;
    var tablaHis = $("#hdf_Tabla").val();
    if (tablaHis == "M_NUME") {
        //$("#tdTipoLlamada").hide();
        //$("#selectServicio").html("");
        $("#selectTipo").html("");
        //$("#lblTelefonia").html("Dirección")
        //$("#selectServicio").append("<option value=\"Datos\" selected=\"selected\">Datos</option>");
        $("#selectTipo").append("<option value=\"LLAMADAS\" selected=\"selected\">Cantidad</option>");
        $("#selectTipo").append("<option value=\"DURACION\" selected=\"selected\">Consumo</option>");
    }


    load();

    //OCULTAR ICONO DE EXPORTAR IMAGEN - MOTIVO .- PARA EXPORTAR HAY QUE CONECTARSE A LOS SERVIDORES DE FUSIONCHARTS - GEIG
    $("#btnExportarImagen").css("display", "none");
    //
});

function load() {
    vGlobalChart = $("#selectServicio").val(); //05-11-2014 wapumayta
    $("#lblMensaje").hide(0);
    $("#general").hide(0, function () {
        $("#chart-1").hide(0);
        $("#chart-2").hide(0);
        cantidad = $("#selectPor").val();
        granularidad = "MONTH";
        if ($('#radio1').is(':checked')) { granularidad = "YEAR"; }
        servicio = $("#selectServicio").val();
        tipo = ($("#selectTipo").val() == "MONTO" ? "COSTO" : $("#selectTipo").val());
        telefonia = $("#selectTelefonia").val();
        nivel = $("#ddlNivel").val();
        var vcfiltro = $("#txtFiltro").val();
        if (!tieneNivel) {
            nivel = -1;
        }

        if (TapDinamicoSeleccionado == 17 || TapDinamicoSeleccionado == 15) {
            vcExpEn = "Mb";
        } else {
            vcExpEn = "";
        }

        //inicio datos exportacion agregado 15-10-2013 wapumayta
        arDatosExportacion = [];
        arDatosExportacion.push(cantidad);
        arDatosExportacion.push($("#hdf_Tabla").val());
        arDatosExportacion.push($("#hdf_P_Codigo").val());
        arDatosExportacion.push($("#hdf_F_Codigo").val());
        arDatosExportacion.push($("#hdf_Desc").val());
        arDatosExportacion.push($("#hdf_F_Desc").val());
        arDatosExportacion.push(granularidad);
        arDatosExportacion.push(tipo == "LLAMADAS" && TapDinamicoSeleccionado == 17 ? "DURACION" : tipo);
        arDatosExportacion.push(telefonia);
        arDatosExportacion.push(servicio);
        arDatosExportacion.push(nivel);
        arDatosExportacion.push($('#radio7').is(':checked'));
        arDatosExportacion.push(vcfiltro);
        arDatosExportacion.push($("#hdf_Sucursal").val());
        arDatosExportacion.push($("#hdfEmpleado").val());
        arDatosExportacion.push(TapDinamicoSeleccionado);
        arDatosExportacion.push(tipoFormatoDuracion);
        datosExportacion = arDatosExportacion.join(',');
        //fin datos exportacion

        agregarOpcionesSelect(servicio == "Total");

        $.ajax({
            type: "POST",
            url: "His_Plantilla.aspx/listarGenerico",
            data: "{'prCantidad': '" + cantidad + "'," +
                "'prTabla': '" + $("#hdf_Tabla").val() + "'," +
                "'prP_Codigo': '" + $("#hdf_P_Codigo").val() + "'," +
                "'prF_Codigo': '" + $("#hdf_F_Codigo").val() + "'," +
                "'prDesc': '" + $("#hdf_Desc").val() + "'," +
                "'prF_Desc': '" + $("#hdf_F_Desc").val() + "'," +
                "'prGranularidad': '" + granularidad + "'," +
                "'prTipo': '" + (tipo == "LLAMADAS" && vcExpEn.toString().toLowerCase() == 'mb' ? "DURACION" : tipo) + "'," +
                "'prTelefonia': '" + telefonia + "'," +
                "'prServicio': '" + servicio + "'," +
                "'prNivel': '" + nivel + "'," +
                "'esConMaestro': " + $('#radio7').is(':checked') + "," +
                "'vcFiltro': '" + vcfiltro + "'," +
                "'prTipoServicio': " + TapDinamicoSeleccionado + "," +
                "'inTipLin': '" + $("#hdfCodLinTip_X_User").val() + "'," +
                "'prFormatoDuracion': " + tipoFormatoDuracion + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {
                var resul = resultado.d;
                var columnas = JSON.parse(resul[0]);
                var datos = JSON.parse(resul[1]);
                var datosTotalizados = JSON.parse(resul[2]);
                $("#ddlTipoVista").val(0);
                if ($("#hdf_Tabla").val() == "PCS_TRF_Servicio") {
                    if (miVistaActual == 1) {
                        var i;
                        for (i = 0; i < datos.length; i++) {
                            if (datos[i].CODIGO == "SMS" || datos[i].CODIGO == "DATOS") {
                                datos.splice(i, 1);
                            }
                        }
                    }
                    //                    else {

                    //                        if (miVistaActual == 2) {
                    //                            for (var i = 0; i < datos.length; i++) {
                    //                                for (var k = 0; k < MisServiciosMensajes.length; k++) {
                    //                                    alert(MisServiciosMensajes[k].CodigoServicio);
                    //                                    if (datos[i].CODIGO != MisServiciosMensajes[k].CodigoServicio) {
                    //                                        datos.splice(i, 1);
                    //                                        break;
                    //                                    }
                    //                                }
                    //                            }
                    //                        }
                    //                    }
                }


                //agregado wapumayta 23/07/2014
                if (nivel == "-1") {
                    $("#lblFiltro").text("Filtrar por " + $.trim(columnas[0].label) + "/" + $.trim(columnas[1].label) + ":");
                } else { //para historico de organización
                    $("#lblFiltro").text("Filtrar por " + $.trim(columnas[0].label) + "/" + $.trim(columnas[2].label) + ":");
                }

                if (datos.length > 0) {
                    $("#pnlFiltroChart").show();
                    contador = 1;
                    var ancho;
                    var alto;
                    var filasMostrar;
                    if (cantidad > 3) {
                        $("#grids").css('width', '1040');
                        ancho = '1000';
                        $("#grids").width = 1040;

                        if (datos.length < 10) {
                            alto = 500 / (10 - datos.length);
                        } else {
                            alto = '250'; //'190';
                        }

                        filasMostrar = 10;
                    }
                    else {
                        $("#grids").css('width', '640');
                        //$("#grids").css('width', '1000');


                        alto = datos.length * 13 + 55; // 21; //(1000 / (30 - datos.length)) + 0;
                        ancho = '1000';
                        $("#grids").css("width", "1000px");
                        $("#charts").css("width", "1000px");
                        $("#charts > div").addClass("dvPanel");
                        filasMostrar = 10;

                        if (datos.length < 30) {
                            //alert(datos.length);
                            //alto = '190' //datos.length * 13 + 21; //(1000 / (30 - datos.length)) + 0;
                            alto = datos.length * 13 + 55; // 21; //(1000 / (30 - datos.length)) + 0;
                            ancho = '1000';
                            $("#grids").css("width", "1000px");
                            $("#charts").css("width", "1000px");
                            $("#charts > div").addClass("dvPanel");
                            filasMostrar = 10;
                        }
                        else {
                            //if ($("#hdf_Tabla").val() == "M_NUME") {
                            alto = '300';
                            ancho = '600';
                            $("#grids").width = 640;
                            filasMostrar = 10;

                            //filasMostrar = 10;
                            //} else {
                            //    alto = '190';
                            //    ancho = '600';
                            //    $("#grids").width = 620;
                            //    //filasMostrar = 30;
                            //    filasMostrar = 10;
                            //}
                        }
                    }

                    console.log("columnas", columnas);
                    var tablaHis = $("#hdf_Tabla").val();
                    if (tablaHis == "M_NUME") {
                        //columnas = columnas.filter(x => x.name != "DESCRIPCION");
                        columnas[1].width = "560"; //Nombre
                        columnas[1].label = "Aplicación";
                        //columnas[1].width = "0"; //Nombre
                    }
                    //


                    $("#grids").empty();
                    $("#gridsTotal").empty();
                    $("#grids").append('<table id="tbEstadisticas-' + contador.toString() + '"></table><div id="pagerEstadisticas-' + contador.toString() + '"></div> ');
                    $("#gridsTotal").append('<table id="tbTotalizados-' + contador.toString() + '"></table><div id="pagerTotalizados-' + contador.toString() + '"></div> ');
                    //alert(filasMostrar);
                    $("#tbEstadisticas-" + contador.toString()).jqGrid({
                        datatype: "local",
                        colModel: columnas,
                        data: datos,
                        rowNum: filasMostrar,
                        rowList: [10, 20, 30],
                        pager: '#pagerEstadisticas-' + contador.toString(),
                        gridview: true,
                        emptyrecords: "No hay datos que mostrar",
                        viewrecords: true,
                        width: 1000, //ancho,
                        height: "100%",
                        rownumbers: false,
                        shrinkToFit: false,
                        caption: "",
                        sortable: true, //agregado 14-10-2013
                        onSelectRow: function () { if ($("#ddlTipoVista").val() == '1') { dibujarCharts(); } },
                        gridComplete: function () {
                            $("#general").fadeIn(200);
                            $("#tbEstadisticas-" + contador.toString()).setSelection(1);
                            //dibujarCharts()

                        },
                        onPaging: function (pgButton) {
                            if (pgButton == "user") {
                                var requestedPage = $("#tbEstadisticas-" + contador.toString()).getGridParam("page");
                                var lastPage = $("#tbEstadisticas-" + contador.toString()).getGridParam("lastpage");
                                if (requestedPage > lastPage) {
                                    $("#tbEstadisticas-" + contador.toString()).setGridParam({ page: lastPage }).trigger("reloadGrid");
                                }
                            }
                        }
                    });


                    $("#tbEstadisticas-" + contador.toString()).jqGrid('hideCol', "CODIGO");

                    $("#tbTotalizados-" + contador.toString()).jqGrid({
                        datatype: "local",
                        colModel: columnas,
                        data: datosTotalizados,
                        rowNum: filasMostrar,
                        rowList: [10, 20, 30],
                        pager: '#pagerTotalizados-' + contador.toString(),
                        gridview: true,
                        emptyrecords: "No hay datos que mostrar",
                        viewrecords: true,
                        width: 1000, //ancho,
                        height: "100%",
                        rownumbers: false,
                        shrinkToFit: false,
                        caption: "",
                        sortable: true, //agregado 14-10-2013
                        onSelectRow: function () { dibujarCharts(); },
                        gridComplete: function () {
                            $("#general").fadeIn(200);
                            $("#tbTotalizados-" + contador.toString()).setSelection(1);
                            //dibujarCharts()

                        },
                        onPaging: function (pgButton) {
                            if (pgButton == "user") {
                                var requestedPage = $("#tbTotalizados-" + contador.toString()).getGridParam("page");
                                var lastPage = $("#tbTotalizados-" + contador.toString()).getGridParam("lastpage");
                                if (requestedPage > lastPage) {
                                    $("#tbTotalizados-" + contador.toString()).setGridParam({ page: lastPage }).trigger("reloadGrid");
                                }
                            }
                        }
                    });

                    //agregado 18/07/2014 - wapumayta
                    $("#btnExportar").button("option", "disabled", false);
                    $("#txtFiltro").attr("disabled", false);
                    $("#btnExportar").attr("title", "Exportar a Excel");
                } else {
                    //                    $("#grids").empty();
                    //                    $("#grids").append('<div>No hay datos para mostrar</div> ');
                    //                    $("#charts").hide();
                    $("#pnlFiltroChart").hide();
                    $("#lblMensaje").fadeIn(200);
                    //agregado 18/07/2014 - wapumayta
                    $("#btnExportar").button("option", "disabled", true);
                    //$("#txtFiltro").attr("disabled", true);
                    $("#btnExportar").attr("title", "No hay datos para mostrar");
                }




            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

}

function dibujarCharts() {
    //var datos = obtenerDatosGrilla();
    dibujarChart1(obtenerDatosGrilla());
    dibujarChart2(obtenerDatosGrilla2());
}

function obtenerDatosGrillaTotalizado() {
    if ($("#selectServicio").val() == "Total") {
        return obtenerDatosChartDataset_AnioXSer_Totalizados();
    }
    else {
        $("#RadioChar-1").hide();
        $("#RadioChar-2").hide();
        return obtenerDatosChartTotalizados();
    }
}

function obtenerDatosGrilla() {
    //return obtenerDatosChartSimple2()

    //debugger;

    if ($("#selectServicio").val() == "Total") {
        //$("#RadioChar-1").show();
        //$("#RadioChar-2").show();
        //
        //if (($('#radio3').is(':checked'))){
        //    return obtenerDatosChartDataset_SerXAnio();
        //}
        //else{
        return obtenerDatosChartDataset_AnioXSer();
        //}
    }
    else {
        $("#RadioChar-1").hide();
        $("#RadioChar-2").hide();
        return obtenerDatosChartSimple2();
    }

}

function obtenerDatosGrilla2() {
    //return obtenerDatosChartSimple2()
    if ($("#selectServicio").val() == "Total") {
        //$("#RadioChar-1").show();
        //$("#RadioChar-2").show();
        //if (($('#radio5').is(':checked'))){
        //    return obtenerDatosChartDataset_SerXAnio();
        //}
        //else{
        return obtenerDatosChartDataset_AnioXSer();
        //}
    }
    else {
        $("#RadioChar-1").hide();
        $("#RadioChar-2").hide();
        return obtenerDatosChartSimple2();
    }

}

var contadorGrafico = 0;
function dibujarChart1(datos) {

    var jsDatos = JSON.parse(datos);
    //console.log("jsDatos-0: ", jsDatos);
    jsDatos.chart.baseFont = "Open Sans";
    jsDatos.chart.baseFontColor = "#6b737c";
    jsDatos.chart.showCanvasBorder = "0";
    jsDatos.chart.usePlotGradientColor = "0";
    jsDatos.chart.plotBorderAlpha = "25";
    jsDatos.chart.exportenabled = "1";
    jsDatos.chart.exportShowMenuItem = "1";
    jsDatos.chart.valueFontColor = "#FFFFFF";
    jsDatos.chart.placeValuesInside = "1";
    jsDatos.chart.showAxisLines = "1";
    jsDatos.chart.xAxisLineColor = "#999999";
    jsDatos.chart.yAxisLineColor = "#FFFFFF";
    jsDatos.chart.axisLineAlpha = "10";
    jsDatos.chart.divLineIsDashed = "1";
    jsDatos.chart.divLineAlpha = "30";
    jsDatos.chart.showAlternateVGridColor = "0";
    jsDatos.chart.captionFontSize = "16";
    jsDatos.chart.subcaptionFontSize = "12";
    jsDatos.chart.subcaptionFontBold = "0";

    jsDatos.chart.legendBorderThickness = "0";
    jsDatos.chart.legendShadow = "0";
    jsDatos.chart.exportFileName = "Histórico";
    jsDatos.chart.subCaptionFontColor = "#9E9C9C";
    jsDatos.chart.divlineThickness = "1";
    jsDatos.chart.canvasbasecolor = "#CCCCCC";
    jsDatos.chart.snumberprefix = "";
    jsDatos.chart.legendItemFontColor = "#666666";
    jsDatos.chart.legendItemFontSize = "10";
    jsDatos.chart.paletteColors = "#01B8AA";
    jsDatos.chart.rotateValues = "1";
    jsDatos.chart.sformatnumber = "0";
    jsDatos.chart.showHoverEffect = "1";
    jsDatos.chart.showShadow = "0";
    jsDatos.chart.showXAxisLine = "1";
    jsDatos.chart.showPercentValues = "0";
    jsDatos.chart.showplotborder = "0";
    jsDatos.chart.valueFontColor = "#FFFFFF";
    jsDatos.chart.xAxisLineThickness = "1";
    jsDatos.chart.maxLabelWidthPercent = "30";
    jsDatos.chart.bgAlpha = "100";
    jsDatos.chart.canvasBgColor = "#FFFFFF";
    jsDatos.chart.canvasbgAlpha = "0";
    jsDatos.chart.canvasBorderAlpha = "0";
    jsDatos.chart.showAlternateHGridColor = "0";
    jsDatos.chart.captionAlignment = "left";
    jsDatos.chart.showYAxisLine = "0";
    jsDatos.chart.divlineColor = "#999999";
    jsDatos.chart.divLineDashLen = "1";
    jsDatos.chart.divLineDashed = "1";
    jsDatos.chart.divLineGapLen = "0";
    jsDatos.chart.labeldisplay = "0";
    jsDatos.chart.slantlabels = "1";
    jsDatos.chart.maxColWidth = "35";
    jsDatos.chart.showYAxisValues = "1";
    jsDatos.chart.showvalues = "0";
    jsDatos.chart.seriesnameintooltip = "1";
    jsDatos.chart.showlegend = "1";
    jsDatos.chart.bgColor = "#FFFFFF";
    jsDatos.chart.showBorder = "0";
    jsDatos.chart.showCanvasBorder = "0";
    jsDatos.chart.useroundedges = "0";

    //var Labels = jsDatos.categories[0].category;
    var mColores = ["#26A69A", "#177BBB", "#EFD45A", "#FD8943", "#807362"];
    if (jsDatos.dataset) {
        for (var j = 0; j < jsDatos.dataset.length; j++) {
            for (var i in jsDatos.dataset[j].data) {
                jsDatos.dataset[j].data[i].color = mColores[j];
            }
        }
    }

    //console.log("jsDatos-1: ", jsDatos);

    contadorGrafico++;
    //if (!(FusionCharts("myChartId-1Historico"))) {
    $("#chart-1").empty();
    $("#chart-1").append('<div id="chartContainerCol-' + contador.toString() + '"></div> ');
    //if (cantidad > 3) {
    //    myChart3 = new FusionCharts("../../Common/Scripts/FusionCharts/" + $('#ddlTipoChart-1').val() + ".swf", "myChartId-1Historico", "1000", "300", "0");

    //}
    //else {
    //    myChart3 = new FusionCharts("../../Common/Scripts/FusionCharts/" + $('#ddlTipoChart-1').val() + ".swf", "myChartId-1Historico", "900", "300", "0");
    //}

    //debugger;
    var tipoGrafico = ((IdTapGlobal == "" || IdTapGlobal == "TapTotal") ? "mscolumn2d" : "Column2D");
    myChart3 = new FusionCharts(tipoGrafico, "myChartId-1Historico" + contadorGrafico.toString(), "100%", "300", "0");

    //alert(datos);
    //console.log("jsDatos", jsDatos);

    var tablaHis = $("#hdf_Tabla").val();
    if (tablaHis == "M_NUME") {
        try {
            jsDatos.chart.caption = jsDatos.chart.caption.replace("LLAMADAS por ", "Cantidad por ");
            jsDatos.chart.caption = jsDatos.chart.caption.replace("DURACION por ", "Consumo por ");
            jsDatos.chart.yAxisName = jsDatos.chart.yAxisName.replace("LLAMADAS", "CANTIDAD");
            jsDatos.chart.yAxisName = jsDatos.chart.yAxisName.replace("DURACION", "MB");
            jsDatos.chart.numberscaleunit = jsDatos.chart.numberscaleunit.replace("Min", "");
        } catch (e) {
        }
    }

    myChart3.setJSONData(jsDatos);
    myChart3.setTransparent(true);
    myChart3.render("chartContainerCol-" + contador.toString());
    //}
    //else {
    //    var g = "../../Common/Scripts/FusionCharts/" + $('#ddlTipoChart-1').val();

    //    if (cantidad > 3) {
    //        $("#chartContainerCol-1").updateFusionCharts({ swfUrl: g, dataSource: datos, dataFormat: "json", width: "1000", height: "300" });
    //    }
    //    else {
    //        //$("#chartContainerCol-1").updateFusionCharts({ swfUrl: g, dataSource: datos, dataFormat: "json", width: "400", height: "300" });
    //        $("#chartContainerCol-1").updateFusionCharts({ swfUrl: g, dataSource: datos, dataFormat: "json", width: "900", height: "300" });
    //    }
    //}
    //debugger;
}

function dibujarChart2(datos) {
}

function obtenerDatosChartSimple2() {
    var id = $("#tbEstadisticas-" + contador.toString()).jqGrid('getGridParam', 'selrow');
    if (id) {

        var datos = $("#tbEstadisticas-" + contador.toString()).jqGrid('getRowData', id);
        var columnas = $("#tbEstadisticas-" + contador.toString()).jqGrid('getGridParam', 'colModel');

        var peri = 'AÑOS';
        if (granularidad == 'MONTH') { peri = 'MESES'; }


        var cadenaJson = '{"chart": {"caption" : "' + (tipo == "LLAMADAS" && (IdTapGlobal == "17" || IdTapGlobal == "15") ? "Cantidad (Mb)" : (tipo == "LLAMADAS" && (IdTapGlobal == "18" || IdTapGlobal == "14") ? "Cantidad (Msj)" : tipo)) + ' por ' + peri + ' de ';
        var filas = [];

        var i;
        for (i = 0; i < columnas.length; i++) {

            var bl = columnas[i]["hidden"];
            if (!bl) {

                var v = columnas[i]["index"];
                if (v == "DESCRIPCION") {
                    if (tipo == "DURACION") {
                        //cadenaJson = cadenaJson + datos[v] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","scaleRecursively":"1","defaultNumberScale":"s", "numberscalevalue":"60,60", "numberscaleunit":"Min,Hr"},"data" :[';
                        if (tipoFormatoDuracion == 0) {
                            cadenaJson = cadenaJson + datos[v] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "numberscaleunit":" Seg","formatNumber":"1","decimals":"0","forceDecimals":"0","thousandSeparator":"' + vcSimMil + '"},"data" :['; //mostra la duracion en minutos
                        } else if (tipoFormatoDuracion == 1) {
                            cadenaJson = cadenaJson + datos[v] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","showvalues": "1","formatNumberScale":"1","numberscalevalue":"60,60","numberscaleunit":"m,h","scaleRecursively":"1","scaleSeparator":" ","defaultNumberScale":"s","formatNumber":"1","decimals":"0","forceDecimals":"0","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},"data" :[';
                        } else if (tipoFormatoDuracion == 2) {
                            cadenaJson = cadenaJson + datos[v] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","formatNumberScale":"1","scaleRecursively":"0", "numberscalevalue":"1", "numberscaleunit":" Min","formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"1","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},"data" :['; //mostra la duracion en minutos
                        } else if (tipoFormatoDuracion == 3) {
                            cadenaJson = cadenaJson + datos[v] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "numberscalevalue":"1", "numberscaleunit":" Min","formatNumber":"1","decimals":"0","forceDecimals":"0","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},"data" :['; //mostra la duracion en minutos
                        }
                    }
                    else if (tipo == "COSTO" || tipo == "MONTO") {
                        cadenaJson = cadenaJson + datos[v] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","formatNumberScale":"1","scaleRecursively":"0", "numberscalevalue":"1", "numberscaleunit":"","formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"1","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},"data" :['; //mostra la duracion en minutos
                    }
                    else {
                        //alert(vcNumDec + "; " + vcSimDec + "; " + vcSimMil);
                        //                        cadenaJson = cadenaJson + datos[v] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + (tipo == "LLAMADAS" && (IdTapGlobal == "17" || IdTapGlobal == "15") ? "Cantidad (Mb)" : (tipo == "LLAMADAS" && (IdTapGlobal == "18" || IdTapGlobal == "14") ? "Cantidad (Msj)" : tipo)) + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "formatNumber":"1","decimals":"' + (tipo == "LLAMADAS" && (IdTapGlobal == "17" || IdTapGlobal == "15") ? 2 : vcNumDec) + '","forceDecimals":"1","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},"data" :[';
                        cadenaJson = cadenaJson + datos[v] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + (tipo == "LLAMADAS" && (IdTapGlobal == "17" || IdTapGlobal == "15") ? "Cantidad (Mb)" : (tipo == "LLAMADAS" && (IdTapGlobal == "18" || IdTapGlobal == "14") ? "Cantidad (Msj)" : tipo)) + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "formatNumber":"1","decimals":"' + (tipo == "LLAMADAS" && (IdTapGlobal == "17" || IdTapGlobal == "15") ? vcNumDec : 0) + '","forceDecimals":"1","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},"data" :[';

                    }
                    //                    switch (tipo) {
                    //                        case "DURACION":
                    //                            cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "","useroundedges":"1","showvalues": "1","scaleRecursively":"1","defaultNumberScale":"s", "numberscalevalue":"60,60","scaleSeparator":"","numberscaleunit":"m,h"},';
                    //                            break;
                    //                        case "MONTO", "COSTO":
                    //                            //cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + vcSimMon + '","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"0","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},';
                    //                            cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + ' (' + vcSimMon + ')","numberPrefix" : "","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"0","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},';
                    //                            break;
                    //                        case "LLAMADAS":
                    //                            cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "thousandSeparator":"' + vcSimMil + '"},';
                    //                            break;
                    //                        default:
                    //                            cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","numberscalevalue":"1000,1000,1000", "numberscaleunit":"Mls,Mll,Bll"},';
                    //                            break;
                    //                    }
                }
                else {
                    if (v != "CODIGO" && v != "Total") {
                        if (tipo == "DURACION") {
                            //filas.push('{ "label" : "' + v + '", "value" : "' + obtenerSegundosDeTime(datos[v]) + '", "link": "j-clickChart-' + v + ',' + obtenerSegundosDeTime(datos[v]) + '" }')
                            if (tipoFormatoDuracion == 1) {
                                filas.push('{ "label" : "' + v + '", "value" : "' + (parseInt(datos[v].split(":")[0]) * 60 * 60 + parseInt(datos[v].split(":")[1]) * 60 + parseInt(datos[v].split(":")[2])).toString() + '", "link": "j-clickChart-' + v + ',' + datos[v] + '" }');
                            } else {
                                filas.push('{ "label" : "' + v + '", "value" : "' + datos[v] + '", "link": "j-clickChart-' + v + ',' + datos[v] + '" }');
                            }
                        }
                        else {
                            filas.push('{ "label" : "' + v + '", "value" : "' + datos[v] + '", "link": "j-clickChart-' + v + ',' + datos[v] + '" }');
                        }

                    }
                }
            }
        }

        cadenaJson = cadenaJson + filas.join(",") + "]}";
        //alerta(cadenaJson);
        return cadenaJson;
    }
    else {
        alerta("seleccione un registro");
    }

}

function obtenerDatosChartDataset_SerXAnio() {
    var id = $("#tbEstadisticas-" + contador.toString()).jqGrid('getGridParam', 'selrow');
    if (id) {

        var datos = $("#tbEstadisticas-" + contador.toString()).jqGrid('getRowData', id);
        var columnas = $("#tbEstadisticas-" + contador.toString()).jqGrid('getGridParam', 'colModel');
        var categorias = '"categories":[{"category":[';
        var datasets = '"dataset":[';

        var peri = 'AÑOS';
        if (granularidad == 'MONTH') { peri = 'MESES'; }
        //var cadenaJson = '{"chart": {"caption" : "' + tipo + ' por ' + peri + ' de ';
        var cadenaJson = '{"chart": {"exportenabled" : "1","exportShowMenuItem":"0","caption" : "' + tipo + ' por ' + peri + ' de '; //agregado 18-10-2013 wapumayta
        var filas = [];
        var filascategorias = [];

        var columna;
        for (columna in columnas) {
            var bl = columnas[columna]["hidden"];
            if (bl) {
                if (columnas[columna]["index"] != "CODIGOX") {

                    var s = columnas[columna]["index"].toString().split(' ')[0];

                    if (s.indexOf("Total") > -1) {
                        filascategorias.push('{ "label" : "' + s.replace("Total", "") + '"}');
                    }


                }
            }

        }

        filascategorias = filascategorias.unique();


        var listaSet = [];
        var key;
        for (key in datos) {

            if (key == "DESCRIPCION") {
                //if (tipo == "DURACION") {
                //    cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","scaleRecursively":"1","defaultNumberScale":"s", "numberscalevalue":"60,60", "numberscaleunit":"m,h"},';
                //}
                //else {
                //    cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","numberscalevalue":"1000,1000,1000", "numberscaleunit":"Mls,Mll,Bll"},';
                //}
                switch (tipo) {
                    case "DURACION":
                        cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "","useroundedges":"1","showvalues": "1","scaleRecursively":"1","defaultNumberScale":"s", "numberscalevalue":"60,60","scaleSeparator":"","numberscaleunit":"m,h"},';
                        break;
                    case "MONTO":
                        //cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + vcSimMon + '","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"0","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},';
                        cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + ' (' + vcSimMon + ')","numberPrefix" : "","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"1","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},';
                        break;
                    case "COSTO":
                        //cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + vcSimMon + '","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"0","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},';
                        cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + ' (' + vcSimMon + ')","numberPrefix" : "","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"1","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},';
                        break;
                    case "LLAMADAS":
                        cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "thousandSeparator":"' + vcSimMil + '"},';
                        break;
                    default:
                        cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","numberscalevalue":"1000,1000,1000", "numberscaleunit":"Mls,Mll,Bll"},';
                        break;
                }
            }

            if (key != "DESCRIPCION") {

                if (key != "CODIGO") {
                    if (key != "CODIGOX") {

                        if (key.split(' ')[0] != "Total") {

                            if (key.split(' ')[0].indexOf("Total") > -1) {

                                var g = key.substr(key.indexOf(" ") + 1);
                                listaSet.push(g);

                            }
                        } else {
                            if (key.split(' ')[0].indexOf("Total") > -1) {

                                g = key.substr(key.indexOf(" ") + 1);
                                listaSet.push(g);

                            }
                        }
                    }
                }
            }
        }
        listaSet = listaSet.unique();

        var listaSeriesName = [];
        var dat = [];

        var i;
        for (i = 0; i < listaSet.length; i++) {
            dat = [];
            for (key in datos) {
                if (key != "DESCRIPCION") {
                    if (key != "CODIGO") {
                        if (key != "CODIGOX") {
                            if (key.split(' ')[0] != "Total") {

                                if (key.split(' ')[0].indexOf("Total") > -1) {

                                    var h = key.substr(key.indexOf(" ") + 1);

                                    if (listaSet[i] == h) {
                                        if (tipo == "DURACION") {
                                            dat.push('{"value":"' + obtenerSegundosDeTime(datos[key]) + '", "link": "j-clickChart-' + key + ',' + obtenerSegundosDeTime(datos[key]) + '" }');
                                        }
                                        else {
                                            dat.push('{"value":"' + datos[key] + '", "link": "j-clickChart-' + key + ',' + datos[key] + '" }');
                                        }
                                    }
                                }
                            } else {
                                if (key.split(' ')[0].indexOf("Total") > -1) {

                                    h = key.substr(key.indexOf(" ") + 1);

                                    if (listaSet[i] == h) {
                                        if (tipo == "DURACION") {
                                            dat.push('{"value":"' + obtenerSegundosDeTime(datos[key]) + '", "link": "j-clickChart-' + key + ',' + obtenerSegundosDeTime(datos[key]) + '" }');
                                        }
                                        else {
                                            dat.push('{"value":"' + datos[key] + '", "link": "j-clickChart-' + key + ',' + datos[key] + '" }');
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            listaSeriesName.push('{"seriesname":"' + listaSet[i] + '","data":[' + dat.join(",") + ']}');
        }

        datasets = datasets + listaSeriesName.join(",") + ']}';

        categorias = categorias + filascategorias.join(",") + ']}],';

        cadenaJson = cadenaJson + categorias + datasets;

        return cadenaJson;
    }
    else {
        alerta("seleccione un registro");
    }


}

function obtenerDatosChartDataset_AnioXSer() {
    var id = $("#tbEstadisticas-" + contador.toString()).jqGrid('getGridParam', 'selrow');
    if (id) {

        var datos = $("#tbEstadisticas-" + contador.toString()).jqGrid('getRowData', id);
        var columnas = $("#tbEstadisticas-" + contador.toString()).jqGrid('getGridParam', 'colModel');
        var categorias = '"categories":[{"category":[';
        var datasets = '"dataset":[';

        var peri = 'AÑOS';
        if (granularidad == 'MONTH') { peri = 'MESES'; }

        //var cadenaJson = '{"chart": {"caption" : "' + tipo + ' por ' + peri + ' de ';
        var cadenaJson = '{"chart": {"exportenabled" : "1","exportShowMenuItem":"0","caption" : "' + tipo + ' por ' + peri + ' de '; //agregado 18-10-2013 wapumayta

        var listaSet = [];
        var key;
        for (key in datos) {

            if (key == "DESCRIPCION") {
                //if (tipo == "DURACION") {
                //    cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","scaleRecursively":"1","defaultNumberScale":"s", "numberscalevalue":"60,60", "numberscaleunit":"m,h"},';
                //}
                //else {
                //    cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","numberscalevalue":"1000,1000,1000", "numberscaleunit":"Mls,Mll,Bll"},';
                //}
                switch (tipo) {
                    case "DURACION":
                        //cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "","useroundedges":"1","showvalues": "1","scaleRecursively":"1","defaultNumberScale":"s", "numberscalevalue":"60,60","scaleSeparator":"","numberscaleunit":"m,h"},';
                        cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "","useroundedges":"1","showvalues": "1","scaleRecursively":"1", "numberscalevalue":"60","scaleSeparator":"","numberscaleunit":" Min"},'; //mostra la duración en minutos
                        break;
                    case "MONTO":
                        //cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + vcSimMon + '","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"0","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},';
                        cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + vcSimMon + '","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"1","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},';
                        break;
                    case "COSTO":
                        //cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + vcSimMon + '","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"0","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},';
                        cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + vcSimMon + '","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"1","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},';
                        break;
                    case "LLAMADAS":
                        cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "thousandSeparator":"' + vcSimMil + '"},';
                        break;
                    default:
                        cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","numberscalevalue":"1000,1000,1000", "numberscaleunit":"Mls,Mll,Bll"},';
                        break;
                }

            }

            if (key != "DESCRIPCION" && key != "Total") {

                if (key != "CODIGO") {
                    if (key != "CODIGOX") {
                        var g;
                        if (key.split(' ')[0] != "Total") {
                            g = key.substr(key.indexOf(" ") + 1);
                            listaSet.push('{ "label" : "' + g + '"}');
                        } else {
                            g = key.substr(key.indexOf(" ") + 1);
                            listaSet.push('{ "label" : "' + g + '"}');
                        }
                    }
                }
            }
        }
        listaSet = listaSet.unique();
        categorias = categorias + listaSet.join(",") + ']}],';
        listaSet = [];

        //var listaSeriesName = ["LOC", "CEL", "DDN", "DDI", "SRCEL"];
        //var listaSeriesName = ["TotalLlamadas", "TotalDatos", "TotalSms", "Total"];
        var listaSeriesName = ["Total"];

        var dat = [];

        var i;
        for (i = 0; i < listaSeriesName.length; i++) {
            dat = [];
            //var key;
            for (key in datos) {
                if (key != "DESCRIPCION" && key != "Total") {
                    if (key != "CODIGO") {
                        if (key != "CODIGOX") {

                            var f = key.split(' ')[0];
                            if (f != "Total") {
                                if (listaSeriesName[i] == f) {
                                    if (tipo == "DURACION") {
                                        dat.push('{"value":"' + obtenerSegundosDeTime(datos[key]) + '", "link": "j-clickChart-' + key + ',' + obtenerSegundosDeTime(datos[key]) + '" }');
                                    }
                                    else {
                                        dat.push('{"value":"' + datos[key] + '", "link": "j-clickChart-' + key + ',' + datos[key] + '" }');
                                    }
                                }
                            } else {
                                if (listaSeriesName[i] == f) {
                                    if (tipo == "DURACION") {
                                        dat.push('{"value":"' + obtenerSegundosDeTime(datos[key]) + '", "link": "j-clickChart-' + key + ',' + obtenerSegundosDeTime(datos[key]) + '" }');
                                    }
                                    else {
                                        dat.push('{"value":"' + datos[key] + '", "link": "j-clickChart-' + key + ',' + datos[key] + '" }');
                                    }
                                }
                            }
                        }
                    }
                }
            }

            listaSet.push('{"seriesname":"' + listaSeriesName[i].replace("Total", "") + '","data":[' + dat.join(",") + ']}');
        }

        datasets = datasets + listaSet.join(",") + ']}';

        cadenaJson = cadenaJson + categorias + datasets;

        return cadenaJson;
    }
    else {
        alerta("seleccione un registro");
    }

}

function obtenerDatosChartTotalizados() {
    var id = $("#tbTotalizados-" + contador.toString()).jqGrid('getGridParam', 'selrow');
    if (id) {

        var datos = $("#tbTotalizados-" + contador.toString()).jqGrid('getRowData', id);
        var columnas = $("#tbTotalizados-" + contador.toString()).jqGrid('getGridParam', 'colModel');

        var peri = 'AÑOS';
        if (granularidad == 'MONTH') { peri = 'MESES'; }


        var cadenaJson = '{"chart": {"caption" : "' + (tipo == "LLAMADAS" && (IdTapGlobal == "17" || IdTapGlobal == "15") ? "Cantidad (Mb)" : (tipo == "LLAMADAS" && (IdTapGlobal == "18" || IdTapGlobal == "14") ? "Cantidad (Msj)" : tipo)) + ' TOTAL por ' + peri + ' ';
        var filas = [];

        var i;
        for (i = 0; i < columnas.length; i++) {

            var bl = columnas[i]["hidden"];
            if (!bl) {

                var v = columnas[i]["index"];
                if (v == "DESCRIPCION") {
                    if (tipo == "DURACION") {
                        //cadenaJson = cadenaJson + datos[v] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","scaleRecursively":"1","defaultNumberScale":"s", "numberscalevalue":"60,60", "numberscaleunit":"Min,Hr"},"data" :[';
                        if (tipoFormatoDuracion == 0) {
                            cadenaJson = cadenaJson + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + ' TOTAL","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "numberscaleunit":" Seg","formatNumber":"1","decimals":"0","forceDecimals":"0","thousandSeparator":"' + vcSimMil + '"},"data" :['; //mostra la duracion en minutos
                        } else if (tipoFormatoDuracion == 1) {
                            cadenaJson = cadenaJson + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + ' TOTAL","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","showvalues": "1","formatNumberScale":"1","numberscalevalue":"60,60","numberscaleunit":"m,h","scaleRecursively":"1","scaleSeparator":" ","defaultNumberScale":"s","formatNumber":"1","decimals":"0","forceDecimals":"0","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},"data" :[';
                        } else if (tipoFormatoDuracion == 2) {
                            cadenaJson = cadenaJson + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + ' TOTAL","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","formatNumberScale":"1","scaleRecursively":"0", "numberscalevalue":"1", "numberscaleunit":" Min","formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"1","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},"data" :['; //mostra la duracion en minutos
                        } else if (tipoFormatoDuracion == 3) {
                            cadenaJson = cadenaJson + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + ' TOTAL","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "numberscalevalue":"1", "numberscaleunit":" Min","formatNumber":"1","decimals":"0","forceDecimals":"0","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},"data" :['; //mostra la duracion en minutos
                        }
                    } else if (tipo == "COSTO" || tipo == "MONTO") {
                        cadenaJson = cadenaJson + datos[v] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","formatNumberScale":"1","scaleRecursively":"0", "numberscalevalue":"1", "numberscaleunit":"","formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"1","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},"data" :['; //mostra la duracion en minutos
                    }
                    else {
                        //alert(vcNumDec + "; " + vcSimDec + "; " + vcSimMil);
                        //cadenaJson = cadenaJson + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + (tipo == "LLAMADAS" && (IdTapGlobal == "17" || IdTapGlobal == "15") ? "Cantidad (Mb)" : (tipo == "LLAMADAS" && (IdTapGlobal == "18" || IdTapGlobal == "14") ? "Cantidad (Msj)" : tipo)) + ' TOTAL ","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "formatNumber":"1","decimals":"' + (tipo == "LLAMADAS" && (IdTapGlobal == "17" || IdTapGlobal == "15") ? 2 : vcNumDec) + '","forceDecimals":"1","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},"data" :[';
                        cadenaJson = cadenaJson + datos[v] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + (tipo == "LLAMADAS" && (IdTapGlobal == "17" || IdTapGlobal == "15") ? "Cantidad (Mb)" : (tipo == "LLAMADAS" && (IdTapGlobal == "18" || IdTapGlobal == "14") ? "Cantidad (Msj)" : tipo)) + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "formatNumber":"1","decimals":"' + (tipo == "LLAMADAS" && (IdTapGlobal == "17" || IdTapGlobal == "15") ? vcNumDec : 0) + '","forceDecimals":"1","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},"data" :[';
                    }
                    //                    switch (tipo) {
                    //                        case "DURACION":
                    //                            cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "","useroundedges":"1","showvalues": "1","scaleRecursively":"1","defaultNumberScale":"s", "numberscalevalue":"60,60","scaleSeparator":"","numberscaleunit":"m,h"},';
                    //                            break;
                    //                        case "MONTO", "COSTO":
                    //                            //cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + vcSimMon + '","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"0","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},';
                    //                            cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + ' (' + vcSimMon + ')","numberPrefix" : "","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"0","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},';
                    //                            break;
                    //                        case "LLAMADAS":
                    //                            cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "thousandSeparator":"' + vcSimMil + '"},';
                    //                            break;
                    //                        default:
                    //                            cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","numberscalevalue":"1000,1000,1000", "numberscaleunit":"Mls,Mll,Bll"},';
                    //                            break;
                    //                    }
                }
                else {
                    if (v != "CODIGO" && v != "Total") {
                        if (tipo == "DURACION") {
                            //filas.push('{ "label" : "' + v + '", "value" : "' + obtenerSegundosDeTime(datos[v]) + '", "link": "j-clickChart-' + v + ',' + obtenerSegundosDeTime(datos[v]) + '" }')
                            if (tipoFormatoDuracion == 1) {
                                filas.push('{ "label" : "' + v + '", "value" : "' + (parseInt(datos[v].split(":")[0]) * 60 * 60 + parseInt(datos[v].split(":")[1]) * 60 + parseInt(datos[v].split(":")[2])).toString() + '", "link": "j-clickChart-' + v + ',' + datos[v] + '" }');
                            } else {
                                filas.push('{ "label" : "' + v + '", "value" : "' + datos[v] + '", "link": "j-clickChart-' + v + ',' + datos[v] + '" }');
                            }
                        }
                        else {
                            filas.push('{ "label" : "' + v + '", "value" : "' + datos[v] + '", "link": "j-clickChart-' + v + ',' + datos[v] + '" }');
                        }

                    }
                }
            }
        }

        cadenaJson = cadenaJson + filas.join(",") + "]}";
        //alerta(cadenaJson);
        return cadenaJson;
    }
    else {
        alerta("seleccione un registro");
    }

}

function obtenerDatosChartDataset_AnioXSer_Totalizados() {
    var id = $("#tbTotalizados-" + contador.toString()).jqGrid('getGridParam', 'selrow');
    if (id) {

        var datos = $("#tbTotalizados-" + contador.toString()).jqGrid('getRowData', id);
        var columnas = $("#tbTotalizados-" + contador.toString()).jqGrid('getGridParam', 'colModel');
        var categorias = '"categories":[{"category":[';
        var datasets = '"dataset":[';

        var peri = 'AÑOS';
        if (granularidad == 'MONTH') { peri = 'MESES'; }

        //var cadenaJson = '{"chart": {"caption" : "' + tipo + ' por ' + peri + ' de ';
        var cadenaJson = '{"chart": {"exportenabled" : "1","exportShowMenuItem":"0","caption" : "' + tipo + ' TOTAL por ' + peri + ' '; //agregado 18-10-2013 wapumayta

        var listaSet = [];
        var key;
        for (key in datos) {


            if (key == "DESCRIPCION") {
                //if (tipo == "DURACION") {
                //    cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","scaleRecursively":"1","defaultNumberScale":"s", "numberscalevalue":"60,60", "numberscaleunit":"m,h"},';
                //}
                //else {
                //    cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","numberscalevalue":"1000,1000,1000", "numberscaleunit":"Mls,Mll,Bll"},';
                //}
                switch (tipo) {
                    case "DURACION":
                        //cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "","useroundedges":"1","showvalues": "1","scaleRecursively":"1","defaultNumberScale":"s", "numberscalevalue":"60,60","scaleSeparator":"","numberscaleunit":"m,h"},';
                        cadenaJson = cadenaJson + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "","useroundedges":"1","showvalues": "1","scaleRecursively":"1", "numberscalevalue":"60","scaleSeparator":"","numberscaleunit":" Min"},'; //mostra la duración en minutos
                        break;
                    case "MONTO":
                        //cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + vcSimMon + '","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"0","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},';
                        cadenaJson = cadenaJson + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + ' (' + vcSimMon + ')","numberPrefix" : "","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"1","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},';
                        break;
                    case "COSTO":
                        //cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + vcSimMon + '","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"0","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},';
                        cadenaJson = cadenaJson + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + ' (' + vcSimMon + ')","numberPrefix" : "","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "formatNumber":"1","decimals":"' + vcNumDec + '","forceDecimals":"1","decimalSeparator":"' + vcSimDec + '","thousandSeparator":"' + vcSimMil + '"},';
                        break;
                    case "LLAMADAS":
                        cadenaJson = cadenaJson + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "","useroundedges":"1","showvalues": "1","formatNumberScale":"0", "thousandSeparator":"' + vcSimMil + '"},';
                        break;
                    default:
                        cadenaJson = cadenaJson + ' " ,"xAxisName" : "' + peri + '","yAxisName" : "' + tipo + '","numberPrefix" : "' + obtenerPrefijoPorTipo(tipo) + '","useroundedges":"1","showvalues": "1","numberscalevalue":"1000,1000,1000", "numberscaleunit":"Mls,Mll,Bll"},';
                        break;
                }
            }

            if (key != "DESCRIPCION" && key != "Total") {

                if (key != "CODIGO") {
                    if (key != "CODIGOX") {
                        var g;
                        if (key.split(' ')[0] != "Total") {
                            g = key.substr(key.indexOf(" ") + 1);
                            listaSet.push('{ "label" : "' + g + '"}');
                        } else {
                            g = key.substr(key.indexOf(" ") + 1);
                            listaSet.push('{ "label" : "' + g + '"}');
                        }
                    }
                }
            }
        }
        listaSet = listaSet.unique();
        categorias = categorias + listaSet.join(",") + ']}],';
        listaSet = [];

        //var listaSeriesName = ["LOC", "CEL", "DDN", "DDI", "SRCEL"];
        //var listaSeriesName = ["TotalLlamadas", "TotalDatos", "TotalSms", "Total"];
        var listaSeriesName = ["Total"];

        var dat = [];

        var i;
        for (i = 0; i < listaSeriesName.length; i++) {
            dat = [];
            //var key;
            for (key in datos) {
                if (key != "DESCRIPCION" && key != "Total") {
                    if (key != "CODIGO") {
                        if (key != "CODIGOX") {

                            var f = key.split(' ')[0];
                            if (f != "Total") {
                                if (listaSeriesName[i] == f) {
                                    if (tipo == "DURACION") {
                                        dat.push('{"value":"' + obtenerSegundosDeTime(datos[key]) + '", "link": "j-clickChart-' + key + ',' + obtenerSegundosDeTime(datos[key]) + '" }');
                                    }
                                    else {
                                        dat.push('{"value":"' + datos[key] + '", "link": "j-clickChart-' + key + ',' + datos[key] + '" }');
                                    }
                                }
                            } else {
                                if (listaSeriesName[i] == f) {
                                    if (tipo == "DURACION") {
                                        dat.push('{"value":"' + obtenerSegundosDeTime(datos[key]) + '", "link": "j-clickChart-' + key + ',' + obtenerSegundosDeTime(datos[key]) + '" }');
                                    }
                                    else {
                                        dat.push('{"value":"' + datos[key] + '", "link": "j-clickChart-' + key + ',' + datos[key] + '" }');
                                    }
                                }
                            }
                        }
                    }
                }
            }

            listaSet.push('{"seriesname":"' + listaSeriesName[i].replace("Total", "") + '","data":[' + dat.join(",") + ']}');
        }

        datasets = datasets + listaSet.join(",") + ']}';

        cadenaJson = cadenaJson + categorias + datasets;

        return cadenaJson;
    }
    else {
        alerta("seleccione un registro");
    }

}

Array.prototype.unique = function (a) {
    return function () {
        return this.filter(a);
    };
}
    (function (a, b, c) {
        return c.indexOf(a, b + 1) < 0;
    });

function agregarOpcionesSelect(esSimple) {

    if (!esSimple) {
        $('#ddlTipoChart-1').empty();
        $('#ddlTipoChart-1').append('<option value="Area2D">Área</option>');
        $('#ddlTipoChart-1').append('<option value="Pareto2D">Pareto 2D</option>');                     //14-02-2014
        $('#ddlTipoChart-1').append('<option value="Pareto3D">Pareto 3D</option>'); //14-02-2014
        $('#ddlTipoChart-1').append('<option value="Column2D">Columna 2D</option>');
        $('#ddlTipoChart-1').append('<option value="Column3D" selected="selected">Columna 3D</option>');
        $('#ddlTipoChart-1').append('<option value="Doughnut2D">Dona 2D</option>');
        $('#ddlTipoChart-1').append('<option value="Doughnut3D">Dona 3D</option>');
        $('#ddlTipoChart-1').append('<option value="Line">Línea</option>');
        $('#ddlTipoChart-1').append('<option value="Pie2D">Pie 2D</option>');
        $('#ddlTipoChart-1').append('<option value="Pie3D">Pie 3D</option>');
        $('#ddlTipoChart-1').append('<option value="SSGrid">Grilla</option>');

        $('#ddlTipoChart-2').empty();
        $('#ddlTipoChart-2').append('<option value="Area2D">Área</option>');
        $('#ddlTipoChart-2').append('<option value="Pareto2D">Pareto 2D</option>'); //14-02-2014
        $('#ddlTipoChart-2').append('<option value="Pareto3D">Pareto 3D</option>'); //14-02-2014
        $('#ddlTipoChart-2').append('<option value="Column2D">Columna 2D</option>');
        $('#ddlTipoChart-2').append('<option value="Column3D">Columna 3D</option>');
        $('#ddlTipoChart-2').append('<option value="Doughnut2D">Dona 2D</option>');
        $('#ddlTipoChart-2').append('<option value="Doughnut3D">Dona 3D</option>');
        $('#ddlTipoChart-2').append('<option value="Line">Línea</option>');
        $('#ddlTipoChart-2').append('<option value="Pie2D">Pie 2D</option>');
        $('#ddlTipoChart-2').append('<option value="Pie3D">Pie 3D</option>');
        $('#ddlTipoChart-2').append('<option value="SSGrid" selected="selected">Grilla</option>');
    }
    else {
        $('#ddlTipoChart-1').empty();
        $('#ddlTipoChart-1').append('<option value="ScrollArea2D">Área</option>');
        $('#ddlTipoChart-1').append('<option value="ScrollStackedColumn2D">Columna apilada</option>');
        $('#ddlTipoChart-1').append('<option value="MSColumn2D">Columna 2D</option>');
        $('#ddlTipoChart-1').append('<option value="MSColumn3D" selected="selected">Columna 3D</option>');
        $('#ddlTipoChart-1').append('<option value="MSBar2D">Barra 2D</option>');
        $('#ddlTipoChart-1').append('<option value="MSBar3D">Barra 3D</option>');
        $('#ddlTipoChart-1').append('<option value="ScrollLine2D">Línea</option>');
        //$('#ddlTipoChart-1').append('<option value="Marimekko">Marimekko</option>');
        //$('#ddlTipoChart-1').append('<option value="ZoomLine">ZoomLine</option>');

        $('#ddlTipoChart-2').empty();
        $('#ddlTipoChart-2').append('<option value="ScrollArea2D" selected="selected">Área</option>');
        $('#ddlTipoChart-2').append('<option value="ScrollStackedColumn2D">Columna apilada</option>');
        $('#ddlTipoChart-2').append('<option value="MSColumn2D">Columna 2D</option>');
        $('#ddlTipoChart-2').append('<option value="MSColumn3D">Columna 3D</option>');
        $('#ddlTipoChart-2').append('<option value="MSBar2D">Barra 2D</option>');
        $('#ddlTipoChart-2').append('<option value="MSBar3D">Barra 3D</option>');
        $('#ddlTipoChart-2').append('<option value="ScrollLine2D">Línea</option>');
        //$('#ddlTipoChart-2').append('<option value="Marimekko">Marimekko</option>');
        //$('#ddlTipoChart-2').append('<option value="ZoomLine">ZoomLine</option>');
    }

}

function clickChart(a) {
    //alert(a);
    if ($("#ddlTipoVista").val() == '1') {
        $("#menu").css('left', x - 20);
        $("#menu").css('top', y - 20);

        $("#menu").attr("name", a);


        $("#menu").hide(0, function () {
            $("#menu").show(0, function () {
                $("#descEle").hide(0, function () {
                    $(".boton").mouseover(function () {


                        var pos = $(this).offset();
                        $("#descEle").css('left', pos.left + 100);
                        $("#descEle").css('top', pos.top - 20);

                        if ($("#hisFil").css("display") == "none") {

                            var id = $("#tbEstadisticas-" + contador.toString()).jqGrid('getGridParam', 'selrow');
                            if (id) {
                                var datos = $("#tbEstadisticas-" + contador.toString()).jqGrid('getRowData', id);
                                $("#eleEle").text($(this).text());
                                $("#eleSelec").text(datos['DESCRIPCION']);
                                if ($("#hdf_F_Codigo").val() == 'CODINT_VC') {
                                    $("#elecod").text(datos['CODIGOX']);
                                }
                                else {
                                    $("#elecod").text(datos['CODIGO']);
                                }


                                var sele = a.split(',')[0].split(' ');

                                if (sele.length == 3) {
                                    $("#elePer").text(sele[2] + ' ' + sele[1]);
                                    $("#eleSer").text(sele[0]);
                                }
                                else {
                                    $("#elePer").text(sele[1]);
                                    $("#eleSer").text(sele[0]);
                                }

                            }
                            else {
                                alerta("seleccione un registro");
                            }


                        }
                        else {
                            //alert(a);
                            $("#eleEle").text($(this).text());
                            $("#eleSelec").text($("#menu").attr("name").split(",")[0]);
                            $("#elecod").text($("#menu").attr("name").split(",")[2]);

                            //var id;
                            id = $("#hisFilBody div:visible").attr("id");


                            $("#elePer").text(id.split("-")[5]);
                            $("#eleSer").text(id.split("-")[4]);

                        }

                        $("#descEle").show();
                    });

                });

            });
        });

    }
}

function obtenerSegundosDeTime(hhmmss) {
    //var arreglo = hhmmss.split(":");
    //var seg = (parseInt(arreglo[0]) * 3600) + (parseInt(arreglo[1]) * 60) + parseInt(arreglo[2]);
    //return seg.toString();
    return hhmmss;
}

function obtenerPrefijoPorTipo(tip) {
    switch (tip) {
        case "LLAMADAS":
            return "";
        case "DURACION":
            return "";
        default:
            return vcSimMon;
    }
}

function fnDisenio() {
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

    $('.Tap').click(function () {
        $('.Tap').removeClass("ui-state-active-TAB");
        $('.Tap').addClass("TapNoSelecionado");
        $(this).removeClass("TapNoSelecionado");
        $(this).addClass("ui-state-active-TAB");

        //IdTapGlobal = $(this).attr("id");
        IdTapGlobal = $(this).attr("cod") == "0" ? $(this).attr("id") : $(this).attr("cod"); //04-11-2014 wapumayta

        switch (IdTapGlobal.toLowerCase()) {
            case ("TapTotal").toLowerCase():
                //                if ($("#pnlTotal").hasClass("esNoVisible")) {
                //                    $("#pnlTotal").removeClass("esNoVisible");
                //                    $("#pnlLlamadas").addClass("esNoVisible");
                //                    $("#pnlMensajes").addClass("esNoVisible");
                //                    $("#pnlNavegacion").addClass("esNoVisible");
                //                }
                TapDinamicoSeleccionado = $(this).attr("cod");
                if (miVistaActual != 0) {
                    miVistaActual = 0;
                    fnVistaTotal();
                }

                break;
            //case ("TapLlamadas").toLowerCase(): 
            case "16":
                //idTapTipoServ = $(this).attr("cod");
                //                if ($("#pnlLlamadas").hasClass("esNoVisible")) {
                //                    $("#pnlLlamadas").removeClass("esNoVisible");
                //                    $("#pnlTotal").addClass("esNoVisible");
                //                    $("#pnlMensajes").addClass("esNoVisible");
                //                    $("#pnlNavegacion").addClass("esNoVisible");
                //                }
                TapDinamicoSeleccionado = $(this).attr("cod");
                if (miVistaActual != 1) {
                    miVistaActual = 1;
                    fnVistaLlamadas();
                }

                break;
            //case ("TapMensajes").toLowerCase(): 
            case "18":
                //idTapTipoServ = $(this).attr("cod");
                //                if ($("#pnlMensajes").hasClass("esNoVisible")) {
                //                    $("#pnlMensajes").removeClass("esNoVisible");
                //                    $("#pnlTotal").addClass("esNoVisible");
                //                    $("#pnlLlamadas").addClass("esNoVisible");
                //                    $("#pnlNavegacion").addClass("esNoVisible");
                //                }
                TapDinamicoSeleccionado = $(this).attr("cod");
                if (miVistaActual != 2) {
                    miVistaActual = 2;
                    fnVistaMensajes();
                }

                break;
            //case ("TapDatos").toLowerCase(): 
            case "17":
                //idTapTipoServ = $(this).attr("cod");
                //                if ($("#pnlNavegacion").hasClass("esNoVisible")) {
                //                    $("#pnlNavegacion").removeClass("esNoVisible");
                //                    $("#pnlTotal").addClass("esNoVisible");
                //                    $("#pnlLlamadas").addClass("esNoVisible");
                //                    $("#pnlMensajes").addClass("esNoVisible");
                //                }
                TapDinamicoSeleccionado = $(this).attr("cod");
                if (miVistaActual != 3) {
                    miVistaActual = 3;
                    fnVistaDatos();
                }

                break;
            default:
                //if (miVistaActual != 4) {
                miVistaActual = 4;
                fnVistaDinamica(this);
                //}
                break;
        }
    });
}

function fnVistaDinamica(prTap) {
    if (TapDinamicoSeleccionado != $(prTap).attr("cod")) {
        TapDinamicoSeleccionado = $(prTap).attr("cod");

        $("#selectServicio").html("");
        $("#selectTipo").html("");

        $("#selectTipo").append("<option value=\"LLAMADAS\" >Cantidad</option>");
        //$("#selectTipo").append("<option value=\"COSTO\" selected=\"selected\">Monto</option>");
        $("#filaServicio").show();

        if (DiccionarioServiciosDinamicos["serv_" + TapDinamicoSeleccionado] == undefined) {

            $.ajax({
                type: "POST",
                url: "His_Plantilla.aspx/obtenerServiciosPorTipoServicio",
                data: "{'prIdTipoServicio': '" + TapDinamicoSeleccionado + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var res = result.d;

                    if (res.length == 0) {
                        $("#pnlFiltroChart").hide();
                        $("#lblMensaje").fadeIn(200);
                        //agregado 18/07/2014 - wapumayta
                        $("#btnExportar").button("option", "disabled", true);
                        $("#btnExportar").attr("title", "No hay datos para mostrar");
                        $("#general").hide();
                        return;
                    }

                    var i;
                    for (i = 0; i < res.length; i++) {
                        if (i == 0) {
                            $("#selectServicio").append("<option value=\"" + res[i].CodigoServicio + "\" selected=\"selected\">" + res[i].NombreServicio + "</option>");
                            vcExpEn = res[i].ExpresadoEn;
                        }
                        else {
                            $("#selectServicio").append("<option value=\"" + res[i].CodigoServicio + "\" >" + res[i].NombreServicio + "</option>");
                            vcExpEn = res[i].ExpresadoEn;
                        }
                    }
                    //                    if (res.length > 1) {
                    //                        $("#selectServicio").append("<option value=\"Total\" >Total</option>");
                    //                    }

                    DiccionarioServiciosDinamicos["serv_" + TapDinamicoSeleccionado] = res;
                    $("#btnBuscar").click();
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });

        }
        else {
            var res = DiccionarioServiciosDinamicos["serv_" + TapDinamicoSeleccionado];
            var i;
            for (i = 0; i < res.length; i++) {
                if (i == 0) {
                    $("#selectServicio").append("<option value=\"" + res[i].CodigoServicio + "\" selected=\"selected\">" + res[i].NombreServicio + "</option>");
                }
                else {
                    $("#selectServicio").append("<option value=\"" + res[i].CodigoServicio + "\" >" + res[i].NombreServicio + "</option>");
                }
            }
            //            if (res.length > 1) {
            //                $("#selectServicio").append("<option value=\"TotalSms\" >Total</option>");
            //            }
            $("#btnBuscar").click();
        }
    }
}

function fnVistaTotal() {
    $("#selectServicio").html("");
    $("#selectTipo").html("");
    $("#selectServicio").append("<option value=\"Total\" selected=\"selected\">Total</option>");
    $("#selectTipo").append("<option value=\"LLAMADAS\" selected=\"selected\">Cantidad</option>");
    $("#filaServicio").hide();
    $("#btnBuscar").click();
}



function fnVistaLlamadas() {
    $("#selectServicio").html("");
    $("#selectTipo").html("");
    var i;
    for (i = 0; i < misServiciosLlamadas.length; i++) {
        if (misServiciosLlamadas[i].selected) {
            $("#selectServicio").append("<option value=\"" + misServiciosLlamadas[i].value + "\" selected=\"selected\">" + misServiciosLlamadas[i].texto + "</option>");
        }
        else {
            $("#selectServicio").append("<option value=\"" + misServiciosLlamadas[i].value + "\" >" + misServiciosLlamadas[i].texto + "</option>");
        }
    }

    $("#selectTipo").append("<option value=\"LLAMADAS\" >Llamadas</option>");
    $("#selectTipo").append("<option value=\"DURACION\" >Duración</option>");
    //$("#selectTipo").append("<option value=\"COSTO\" selected=\"selected\">Monto</option>");


    $("#filaServicio").show();
    $("#btnBuscar").click();
}

function fnVistaMensajes() {
    $("#selectServicio").html("");
    $("#selectTipo").html("");
    var i;
    for (i = 0; i < MisServiciosMensajes.length; i++) {
        if (i == 0) {
            $("#selectServicio").append("<option value=\"" + MisServiciosMensajes[i].CodigoServicio + "\" selected=\"selected\">" + MisServiciosMensajes[i].NombreServicio + "</option>");
        }
        else {
            $("#selectServicio").append("<option value=\"" + MisServiciosMensajes[i].CodigoServicio + "\" >" + MisServiciosMensajes[i].NombreServicio + "</option>");
        }
    }

    if (MisServiciosMensajes.length > 1) {
        $("#selectServicio").append("<option value=\"TotalSms\" >Total</option>");
    }

    $("#selectTipo").append("<option value=\"LLAMADAS\" >Cantidad</option>");
    //$("#selectTipo").append("<option value=\"COSTO\" selected=\"selected\">Monto</option>");
    $("#filaServicio").show();
    $("#btnBuscar").click();
}

function fnVistaDatos() {
    $("#selectServicio").html("");
    $("#selectTipo").html("");
    var i;
    for (i = 0; i < MisServiciosDatos.length; i++) {
        if (i == 0) {
            $("#selectServicio").append("<option value=\"" + MisServiciosDatos[i].CodigoServicio + "\" selected=\"selected\">" + MisServiciosDatos[i].NombreServicio + "</option>");
        }
        else {
            $("#selectServicio").append("<option value=\"" + MisServiciosDatos[i].CodigoServicio + "\" >" + MisServiciosDatos[i].NombreServicio + "</option>");
        }
    }

    if (MisServiciosDatos.length > 1) {
        $("#selectServicio").append("<option value=\"TotalDatos\" >Total</option>");
    }

    $("#selectTipo").append("<option value=\"LLAMADAS\" >Cantidad</option>");
    //$("#selectTipo").append("<option value=\"COSTO\" selected=\"selected\">Monto</option>");
    $("#filaServicio").show();
    $("#btnBuscar").click();
}

function fnAgregarTapsTipoServicio() {
    //$("#pnlTap").html("");

    var sumarioTipo = $("#hdf_Tabla").val();

    if (sumarioTipo != "M_NUME" && misTiposServicios.length > 0) {


        var AnchoTotal = 1024; //$("#prueba").width();
        var AnchoUnidad = (AnchoTotal / (misTiposServicios.length + 1)) - 25;

        var i;
        for (i = 0; i < misTiposServicios.length; i++) {
            if (i == 0) {
                $("#pnlTap").append('<div  class="CuerpoTap esPrimerTap"><div id="Tap' + misTiposServicios[i].vcNom + '" cod="' + misTiposServicios[i].P_inCod + '" class="Tap TapNoSelecionado" style="width: ' + AnchoUnidad.toString() + 'px; text-align: center;"><span class="textTab">' + misTiposServicios[i].vcNom + '</span></div></div>');
            }
            else {
                $("#pnlTap").append('<div  class="CuerpoTap"><div id="Tap' + misTiposServicios[i].vcNom + '" cod="' + misTiposServicios[i].P_inCod + '" class="Tap TapNoSelecionado" style="width: ' + AnchoUnidad.toString() + 'px; text-align: center;"><span class="textTab">' + misTiposServicios[i].vcNom + '</span></div></div>');
            }
        }
        $("#pnlTap").append('<div  class="CuerpoTap"><div id="TapTotal" cod="0" class="Tap ui-state-active-TAB" style="width: ' + AnchoUnidad.toString() + 'px; text-align: center;"><span class="textTab">Total</span></div></div>');

    }
    else {
        $("#pnlTap").append('<div  class="CuerpoTap"><div id="TapTotal" cod="0" class="Tap ui-state-active-TAB" style="width: 256px; text-align: center;"><span class="textTab">Total</span></div></div>');

    }

    fnDisenio();
}
