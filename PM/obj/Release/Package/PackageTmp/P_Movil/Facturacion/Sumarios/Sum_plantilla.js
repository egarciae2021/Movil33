/// <reference path="../../Common/Scripts/jquery-2.0.0-vsdoc.js" />
var tipoFormatoDuracion = 3; //0=segundos, 1=hh:mm:ss, 2=minutos(decimal), 3=minutos(entero)
var arNombreTipoFormato = ['Duración mostrada en segundos', 'Duración mostrada en formato tipo hh:mm:ss', 'Duración mostrada en minutos decimales', 'Duración mostrada en minutos enteros'];

var contador = 1;
var tree;
var idTree = "-1";
var nodos;
//agregado 15-10-2013 wapumayta
var arDatosExportacion = [];
var datosExportacion = "";
var tipoRep = "";
//-----------------------

var miVistaActual = 0; // 0=Total | 1=Llamadas | 2=Mensajes | 3=Datos
var misServiciosLlamadas = [
{ value: "LOC", texto: "Fija", selected: false },
{ value: "CEL", texto: "Celular", selected: false },
//{ value: "DDN", texto: "Nacional", selected: false },
{ value: "DDI", texto: "Internacional", selected: false },
{ value: "Total", texto: "Total", selected: true }
];

var IdTapGlobal = "";
var TapDinamicoSeleccionado = "0";
var DiccionarioServiciosDinamicos = {};
var blnFirstLoad = false;
var datosGraficos;
var vcExpEn = "";

var oCulturaUsuario;
$(function () {

    oCulturaUsuario = window.top.fnObtenerWindowPlantillaTab().oCulturaUsuario;

    fnAgregarTapsTipoServicio();
    //formato filtro - agregado 21-10-2013 wapumayta


    $("#txtFiltro").live("keypress", function (e) {
        if (e.keyCode == 13) {
            load();
        } else {
            return ValidarAlfaNumericoConEspacios(e);
        }
    });

    if ($("#hdfTipoSumario").val() == "FECHA") {
        $("#txtFiltro").datepicker({
            dateFormat: "dd/mm/yy",
            monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        });
    } else {
        $("#txtFiltro").datepicker("destroy");
    }

    if ($("#ddlMes").val() != "") {
        var mload = $("#ddlMes").val().substring(0, 2);
        var yload = '20' + $("#ddlMes").val().substring(2, 4);
        var firstDayload = new Date(yload, mload - 1, 1);
        var lastDayload = new Date(yload, mload, 0);
        $("#txtFiltro").datepicker("option", "minDate", firstDayload);
        $("#txtFiltro").datepicker("option", "maxDate", lastDayload);
    }

    $("#ddlMes").change(function () {
        var curMonth = $("#ddlMes").val().substring(0, 2);
        var curYear = '20' + $("#ddlMes").val().substring(2, 4);
        var firstDay = new Date(curYear, curMonth - 1, 1);
        var lastDay = new Date(curYear, curMonth, 0);
        $("#txtFiltro").datepicker("option", "minDate", firstDay);
        $("#txtFiltro").datepicker("option", "maxDate", lastDay);
    });
    //fin formato filtro

    FusionCharts.setCurrentRenderer('javascript');

    //nuevos exportar agregado 15-10-2013 wapumayta
    $("#btnExportar").button();
    $("#btnExportar").click(function () {
        tipoRep = 'RepFacturacionSumario';
        ExportarExcel();
    });
    function ExportarExcel() {
        pagina = "../../Administrar/Adm_Reporte.aspx?Tipo=" + tipoRep + "&vcTab=" + $("#hdfTipoSumario").val() + "&Detalle=" + datosExportacion;
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

    $("#btnAbrirTreeOrganizacion").hide(10, function () {
        if ($("#hdfTipoSumario").val() == "M_EMPL") {
            $("#btnAbrirTreeOrganizacion *").remove();
            $("#btnAbrirTreeOrganizacion").css("left", "0px");
            //$("#btnAbrirTreeOrganizacion").css("top", "50%");
            //$("#btnAbrirTreeOrganizacion").text("Elegir organización")
            $("#btnAbrirTreeOrganizacion").append('<img src="../../../Common/Images/arrow_right.png" alt="Ocultar Organización"/>');
            $("#btnAbrirTreeOrganizacion").css("width", "40px");
            $("#btnAbrirTreeOrganizacion").css("height", "31px");
            $("#btnAbrirTreeOrganizacion").show("drop", 300);
        }
    });

    //    if ($("#hdfTipoSumario").val() == "M_EMPL")
    //        $("#btnAbrirTreeOrganizacion").show();
    //    else
    //        $("#btnAbrirTreeOrganizacion").hide();

    $("#btnBuscar").button({
        text: false
    });

    $("#btnAbrirTreeOrganizacion").button({
        text: true
        //        icons: {
        //            primary: "ui-icon-circle-triangle-e"
        //        }
    });

    $("#btnAbrirTreeOrganizacion").click(function () {

        var estaAbierto = $("#panelTree").css("display") == "block";

        if (estaAbierto) {
            $("#panelCheck").hide(200);
            $(this).hide("drop", 300, function () {
                $("#panelTree").hide("drop", 300, function () {

                    $("#btnAbrirTreeOrganizacion").button({
                        text: true
                        //                        icons: {
                        //                            primary: "ui-icon-circle-triangle-e"
                        //                        }
                    });
                    $("#btnAbrirTreeOrganizacion *").remove();
                    $("#btnAbrirTreeOrganizacion").css("left", "0px");
                    //$("#btnAbrirTreeOrganizacion").css("top", "50%");
                    //$("#btnAbrirTreeOrganizacion").text("Elegir organización")
                    $("#btnAbrirTreeOrganizacion").append('<img src="../../../Common/Images/arrow_right.png" alt="Ocultar Organización"/>');
                    $("#btnAbrirTreeOrganizacion").css("width", "40px");
                    $("#btnAbrirTreeOrganizacion").css("height", "31px");
                    $("#btnAbrirTreeOrganizacion").show("drop", 300);
                });
            });

        }
        else {

            $(this).hide("drop", 300, function () {
                $("#panelTree").show("drop", 300, function () {
                    $("#panelCheck").show();
                    $("#btnAbrirTreeOrganizacion").button({
                        text: true
                        //                        icons: {
                        //                            primary: "ui-icon-circle-triangle-w"
                        //                        }
                    });
                    $("#btnAbrirTreeOrganizacion *").remove();
                    $("#btnAbrirTreeOrganizacion").css("left", "300px");
                    //$("#btnAbrirTreeOrganizacion").css("top", "80%");
                    $("#btnAbrirTreeOrganizacion").text("");
                    $("#btnAbrirTreeOrganizacion").append('<img src="../../../Common/Images/arrow_left.png" alt="Ocultar Organización"/>');
                    $("#btnAbrirTreeOrganizacion").css("width", "40px");
                    $("#btnAbrirTreeOrganizacion").css("height", "31px");
                    $("#btnAbrirTreeOrganizacion").show("drop", 300);
                });

            });
        }

    });

    $("#panelBusqueda").css("padding", "0px");

    if ($("#hdfTipoSumario").val() != 'M_ORGA') {
        $("#filaNivel").hide();
    }

    $("#btnBuscar").click(function () {
        load();
    });

    $("#chkDependencias").change(function () {
        if (idTree != "-1") {
            loadTree();
        }
    });

    $('#selectTipo').change(function () {
        fnCargarConceptos();
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
    CrearTreeOrganizacion();

    //OCULTAR ICONO DE EXPORTAR IMAGEN - MOTIVO .- PARA EXPORTAR HAY QUE CONECTARSE A LOS SERVIDORES DE FUSIONCHARTS - GEIG
    $("#btnExportarImagen").css("display", "none");
    //

    $(window).resize(function () {
        DimPosElementos();
    });
    DimPosElementos();

});

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();

    $("#tbSumario").setGridWidth(Ancho - 20);

}

function CrearTreeOrganizacion() {

    tree = new dhtmlXTreeObject("panelTree", "100%", "100%", 0);
    tree.setImagePath("../../../Common/Images/Controles/dhtmlx/TreeView/");
    tree.setOnClickHandler(CargarDependecia);

    $.ajax({
        type: "POST",
        url: "../../Consultar/Con_SeleccionArea.aspx/ListarPrincipal",
        data: "{'vcCodInt': '" + "" + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            tree.loadJSArray(result.d);

            $(result.d).each(function () {
                fixImage(this[0]);
            });
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function CargarDependecia() {
    if (idTree != tree.getSelectedItemId()) {
        $.ajax({
            type: "POST",
            url: "../../Consultar/Con_SeleccionArea.aspx/ListarOrganizacion",
            data: "{'vcCodInt': '" + tree.getSelectedItemId() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                var idtree = tree.getSelectedItemId();
                var texto = tree.getAllChildless();

                $(result.d).each(function () {
                    if (texto.indexOf(this.vcCodInt) == -1) {
                        tree.insertNewItem(idtree, this.vcCodInt, this.vcNomOrg, 0, 0, 0, 0, '');
                        fixImage(this.vcCodInt);
                    }
                    else {
                        return false;
                    }
                });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
        if (idTree != "-1") {
            loadTree();
        }
    }
    idTree = tree.getSelectedItemId();
}

function cargarSumario() {

    var sss = tree.getSelectedItemId();
}

function fixImage(id) {
    //Cerrar, abrir, cerrar
    var Archivo = 'Niveles/' + (id.length / 3).toString() + '.ico';
    if (id.length != 3) {
        tree.setItemImage2(id, Archivo, Archivo, Archivo);
    }
}

function loadTree() {
    //$("#Datos").hide(0);
    var codOrg = tree.getSelectedItemId();
    var and = ""; /// <reference path="Sum_plantilla.js" />
    var nomOrg = tree.getSelectedItemText();
    var codnivel = codOrg.length / 3 - 1;
    var nomNivel = $('#ddlNivel option').eq(codnivel).text();

    var filtroBusquedaTree = $("#txtFiltro").val();
    if ($("#chkDependencias").prop("checked")) {
        and = " AND SUBSTRING(H.RE_vcCODINT2,1," + codOrg.length.toString() + ") like |" + codOrg + "%| ";
    }
    else {
        and = " AND H.RE_vcCODINT2 like |" + codOrg + "%| ";
    }


   

    $.ajax({
        type: "POST",
        url: "Sum_plantilla.aspx/obtenerSumario",
        data: "{'prNomtabla': '" + obtenerNombreTabla() + "'," +
                "'prTipo': '" + $("#hdfTipoSumario").val() + "'," +
                "'prTipoConsulta': '" + obtenerColumnasPorTipo() + "'," +
                "'prTop': '" + $("#txtTop").val() + "'," +
                "'prNivel': '" + ($("#hdfTipoSumario").val() == "M_ORGA" ? $('#ddlNivel').val() : "-1") + "'," +
                "'prPeriodo': '" + $('#ddlMes option:selected').text() + "'," +
                "'prServicio': '" + $('#selectServicio option:selected').text() + "'," +
                "'prDescTipo': '" + $('#selectTipo option:selected').text() + "'," +
                "'prNombreSumario': '" + $("#hdfTipoSumario").val() + "'," +
                "'prFiltro': '" + filtroBusquedaTree + "'," +
                "'prAnd': '" + and + "'," +
                "'prTablaConsulta': '" + $("#hdfTipoSumario").val() + "'," +
                "'prP_Codigo': '" + $("#hdf_P_Codigo").val() + "'," +
                "'prF_Codigo': '" + $("#hdf_F_Codigo").val() + "'," +
                "'prP_Desc': '" + $("#hdf_Desc").val() + "'," +
                "'prF_Desc': '" + $("#hdf_F_Desc").val() + "'," +
                "'prServicioTap': '" + fnTipoFuente() + "'," +
        //"'prTipoFuente': '" + $('#selectTipo').val() + "'," +
                "'prTipoFuente': '" + ($('#selectTipo').val() == "LLAMADAS" && vcExpEn.toString().toLowerCase() == 'mb' ? "DURACION" : $('#selectTipo').val()) + "'," +
                "'prServicioValue': '[" + $('#selectServicio option:selected').text() + "]'," +
                "'prIdTipoServicio': '" + TapDinamicoSeleccionado + "'," +
                "'inTipLin': '" + $('#hdfCodLinTip_X_User').val() + "'," +
                "'prFormatoDuracion': '" + tipoFormatoDuracion + "'}",
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
            } else {
                //agregado 18/07/2014 - wapumayta
                $("#Chart").show();
                $("#btnExportar").button("option", "disabled", false);
                $("#btnExportar").attr("title", "Exportar a Excel");

                var columnas = JSON.parse(resul[0]);
                var datos = JSON.parse(resul[1]);
                var datosChart = resul[2];
                var datosChart2 = resul[3];
                datosGraficos = datosChart2;
                //                alerta("loadTree: " + datosChart2);
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

                var TituloSumario = "";
                if ($("#hdfTipoSumario").val() == "M_EMPL") {
                    TituloSumario = nomNivel + ": " + nomOrg;
                }

                var Ancho = $(window).width() - 20;
                $("#tbSumario").jqGrid({
                    datatype: "local",
                    colModel: columnas,
                    data: datos,
                    caption: TituloSumario,
                    rowNum: 10,
                    rowList: [10, 20, 30],
                    pager: '#pagerTbSumario',
                    gridview: true,
                    emptyrecords: "No hay datos que mostrar",
                    viewrecords: true,
                    width: Ancho, //"100%", //1420
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
                    }
                });

                //$("#Chart").empty();
                //$("#Chart").append('<div id="chartContainer"></div> ');

                var jsDatos = JSON.parse(datosChart2);
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
                if (TituloSumario != "") {
                    jsDatos.chart.subCaption = jsDatos.chart.subCaption + " (" + TituloSumario + ")";
                }

                if (!(FusionCharts("myChartIdX"))) {
                    myChart = new FusionCharts("../../Common/Scripts/FusionCharts/bar2.swf", "myChartIdX", "1000", "400", "0");
                    myChart.setJSONData(jsDatos);
                    myChart.setTransparent(true);
                    myChart.render("chartContainer");
                } else {
                    $("#chartContainer").updateFusionCharts({ dataSource: jsDatos, dataFormat: "json" });
                }
                $("#myChartIdX").css('left', '15px');
            }
            //$("#Datos").show(300);
            $("#Datos").css("display", "block");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function load() {

    if (idTree != "-1") {
        loadTree();
        return;
    }

    //$("#Datos").hide(0);
    var and = "";
    var filtroBusqueda = $("#txtFiltro").val(); //agregado 21-10-2013 wapumayta
    //inicio datos exportacion agregado 15-10-2013 wapumayta
    arDatosExportacion = [];
    arDatosExportacion.push(obtenerNombreTabla());
    arDatosExportacion.push($("#hdfTipoSumario").val());
    arDatosExportacion.push(obtenerColumnasPorTipo());
    arDatosExportacion.push($('#txtTop').val());

    if ($("#hdfTipoSumario").val() == "M_ORGA") {
        arDatosExportacion.push($('#ddlNivel').val());
    }
    else {
        arDatosExportacion.push("-1");
    }

    if (TapDinamicoSeleccionado == 17 || TapDinamicoSeleccionado == 15) {
        vcExpEn = "Mb";
    } else {
        vcExpEn = "";
    }

    arDatosExportacion.push($('#ddlMes option:selected').text());
    arDatosExportacion.push($('#selectServicio option:selected').text());
    //arDatosExportacion.push($('#selectTipo option:selected').text());
    arDatosExportacion.push($('#selectTipo').val());
    arDatosExportacion.push($("#hdfTipoSumario").val());
    arDatosExportacion.push(and);
    arDatosExportacion.push(filtroBusqueda); //agregado 21-10-2013 wapumayta

    arDatosExportacion.push($("#hdfTipoSumario").val());
    arDatosExportacion.push($("#hdf_P_Codigo").val());
    arDatosExportacion.push($("#hdf_F_Codigo").val());
    arDatosExportacion.push($("#hdf_Desc").val());
    arDatosExportacion.push($("#hdf_F_Desc").val());
    arDatosExportacion.push(fnTipoFuente());
    arDatosExportacion.push($('#selectTipo').val() == "LLAMADAS" && TapDinamicoSeleccionado == 17 ? "DURACION" : $('#selectTipo').val());
    arDatosExportacion.push($('#selectServicio').val());
    arDatosExportacion.push(TapDinamicoSeleccionado);
    arDatosExportacion.push(tipoFormatoDuracion);

    datosExportacion = arDatosExportacion.join('*');
    //fin datos exportacion

    $.ajax({
        type: "POST",
        url: "Sum_plantilla.aspx/obtenerSumario",
        data: "{'prNomtabla': '" + obtenerNombreTabla() + "'," +
                "'prTipo': '" + $("#hdfTipoSumario").val() + "'," +
                "'prTipoConsulta': '" + obtenerColumnasPorTipo() + "'," +
                "'prTop': '" + $('#txtTop').val() + "'," +
                "'prNivel': '" + ($("#hdfTipoSumario").val() == "M_ORGA" ? $('#ddlNivel').val() : "-1") + "'," +
                "'prPeriodo': '" + $('#ddlMes option:selected').text() + "'," +
                "'prServicio': '" + $('#selectServicio option:selected').text() + "'," +
                "'prDescTipo': '" + $('#selectTipo option:selected').text() + "'," +
                "'prNombreSumario': '" + $("#hdfTipoSumario").val() + "'," +
                "'prFiltro': '" + filtroBusqueda + "'," + //agregado 21-10-2013 wapumayta
                "'prAnd': '" + and + "'," +
                "'prTablaConsulta': '" + $("#hdfTipoSumario").val() + "'," +
                "'prP_Codigo': '" + $("#hdf_P_Codigo").val() + "'," +
                "'prF_Codigo': '" + $("#hdf_F_Codigo").val() + "'," +
                "'prP_Desc': '" + $("#hdf_Desc").val() + "'," +
                "'prF_Desc': '" + $("#hdf_F_Desc").val() + "'," +
                "'prServicioTap': '" + fnTipoFuente() + "'," +
                "'prTipoFuente': '" + ($('#selectTipo').val() == "LLAMADAS" && vcExpEn.toString().toLowerCase() == 'mb' ? "DURACION" : $('#selectTipo').val()) + "'," +
                "'prServicioValue': '[" + $('#selectServicio option:selected').text() + "]'," +
                "'prIdTipoServicio': '" + TapDinamicoSeleccionado + "'," +
                "'inTipLin': '" + $('#hdfCodLinTip_X_User').val() + "'," +
                "'prFormatoDuracion': '" + tipoFormatoDuracion + "'}",
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
            }
            else {
                //agregado 18/07/2014 - wapumayta
                $("#Chart").show();
                $("#btnExportar").button("option", "disabled", false);
                $("#btnExportar").attr("title", "Exportar a Excel");
                //contador = 1;
                var columnas = JSON.parse(resul[0]);
                var datos = JSON.parse(resul[1]);
                var datosChart = resul[2];
                var datosChart2 = resul[3];
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

                var Ancho = $(window).width() - 20;
                var AnchoColumnas = 0;
                for (var i = 0; i < columnas.length; i++) {
                    AnchoColumnas += parseFloat(columnas[i].width);
                }
                var anchoAdicional = 0;
                for (var i = 0; i < columnas.length; i++) {
                    anchoAdicional = (parseFloat(columnas[i].width) / AnchoColumnas) * (Ancho - AnchoColumnas);
                    if (anchoAdicional > 0) {
                        columnas[i].width = parseFloat(columnas[i].width) + anchoAdicional - 5;
                    }
                }

                $("#tbSumario").jqGrid({
                    datatype: "local",
                    colModel: columnas,
                    caption: "",
                    data: datos,
                    shrinkToFit: false,
                    rowNum: 10,
                    rowList: [10, 20, 30],
                    pager: '#pagerTbSumario',
                    gridview: true,
                    emptyrecords: "No hay datos que mostrar",
                    viewrecords: true,
                    width: Ancho, //"100%", //1420,
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
    //console.log("datosChart2: ", datosChart2);
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
    //jsDatos.chart.decimals = oCulturaUsuario.dcNumDec;
    //jsDatos.chart.numberSuffix = " Min";

    //$("#Chart").empty();
    //$("#Chart").append('<div id="chartContainer"></div> ');
    if (!(FusionCharts("myChartIdX"))) {
        myChart = new FusionCharts("../../Common/Scripts/FusionCharts/bar2d.swf", "myChartIdX", "1000", "350", "0"); //,\"exportenabled\":\"1\",\"exportShowMenuItem\":\"0\",\"bgcolor\":\"FFFFFF\",\"bordercolor\":\"FFFFFF\"

        myChart.setJSONData(jsDatos);
        myChart.setTransparent(true);
        myChart.render("chartContainer");
        blnFirstLoad = true;
    } else {
        $("#chartContainer").updateFusionCharts({ dataSource: jsDatos, dataFormat: "json" });
        blnFirstLoad = false;
        //         $("#Chart").show();
    }
    $("#myChartIdX").css('left', '0px');
}

function buscar() {
    $("#grilla").fadeOut(0);
    var and = "";
    //alert("buscar");
    alert(vcExpEn);
    $.ajax({
        type: "POST",
        url: "Sum_plantilla.aspx/obtenerSumario",
        data: "{'prNomtabla': '" + obtenerNombreTabla() + "'," +
                "'prTipo': '" + $("#hdfTipoSumario").val() + "'," +
                "'prTipoConsulta': '" + obtenerColumnasPorTipo() + "'," +
                "'prTop': '" + $('#txtTop').val() + "'," +
                "'prNivel': '" + ($("#hdfTipoSumario").val() == "M_ORGA" ? $('#ddlNivel').val() : "-1") + "'," +
                "'prPeriodo': '" + $('#ddlMes option:selected').text() + "'," +
                "'prServicio': '" + $('#selectServicio option:selected').text() + "'," +
                "'prDescTipo': '" + $('#selectTipo option:selected').text() + "'," +
                "'prNombreSumario': '" + $("#hdfTipoSumario").val() + "'," +
                "'prAnd': '" + and + "'," +
                "'prTablaConsulta': '" + $("#hdfTipoSumario").val() + "'," +
                "'prP_Codigo': '" + $("#hdf_P_Codigo").val() + "'," +
                "'prF_Codigo': '" + $("#hdf_F_Codigo").val() + "'," +
                "'prP_Desc': '" + $("#hdf_Desc").val() + "'," +
                "'prF_Desc': '" + $("#hdf_F_Desc").val() + "'," +
                "'prServicioTap': '" + fnTipoFuente() + "'," +
        //"'prTipoFuente': '" + $('#selectTipo').val() + "'," +
                "'prTipoFuente': '" + ($('#selectTipo').val() == "LLAMADAS" && vcExpEn.toString().toLowerCase() == 'mb' ? "DURACION" : $('#selectTipo').val()) + "'," +
                "'prServicioValue': '[" + $('#selectServicio option:selected').text() + "]'," +
                "'prIdTipoServicio': '" + TapDinamicoSeleccionado + "'," +
                "'inTipLin': '" + $('#hdfCodLinTip_X_User').val() + "'," +
                "'prFormatoDuracion': '" + tipoFormatoDuracion + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;

            if (resul[0] == "1") {
                $("#grilla *").remove();
                $("#Chart *").remove();
                $("#grilla").empty();
                $("#grilla").append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
                //agregado 18/07/2014 - wapumayta
                $("#Chart").hide();
                $("#btnExportar").button("option", "disabled", true);
                $("#btnExportar").attr("title", "No hay datos para mostrar");
            } else {
                //agregado 18/07/2014 - wapumayta
                $("#Chart").show();
                $("#btnExportar").button("option", "disabled", false);
                $("#btnExportar").attr("title", "Exportar a Excel");

                var columnas = JSON.parse(resul[0]);
                var datos = JSON.parse(resul[1]);
                var datosChart = resul[2];
                var datosChart2 = resul[3];
                alerta("buscar: " + datosChart2);
                $("#grilla *").remove();
                //$("#Chart *").remove();

                var alto;
                if (datos.length < 10) {
                    alto = datos.length * 13 + 55;
                }
                else {
                    alto = '250';
                }


                $("#grilla").empty();
                $("#grilla").append('<table id="tbSumario"></table><div id="pagerTbSumario"></div> ');

                var Ancho = $(window).width() - 20;
                //console.log("columnas: ", columnas);

                $("#tbSumario").jqGrid({
                    datatype: "local",
                    colModel: columnas,
                    data: datos,
                    rowNum: 10,
                    rowList: [10, 20, 30],
                    pager: '#pagerTbSumario',
                    gridview: true,
                    emptyrecords: "No hay datos que mostrar",
                    viewrecords: true,
                    width: Ancho, // "100%", //1420,
                    height: alto,
                    rownumbers: false
                });

                //                $("#Chart").empty();
                //                $("#Chart").append('<div id="chartContainer"></div> ');

                //                myChart = new FusionCharts("../../Common/Scripts/FusionCharts/Column3D.swf", "myChartId", "1000", "290", "0");

                //                myChart.setJSONData(datosChart);
                //                myChart.setTransparent(true);
                //                myChart.render("chartContainer");
            }



            $("#grilla").fadeIn(300);

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function obtenerNombreTabla() {
    return 'V_RES_MC_L_' + $("#ddlMes").val();
}

function obtenerColumnasPorTipo() {
    switch ($("#selectTipo").val()) {
        case "CONSUMO":
            switch ($("#hdfTipoSumario").val()) {

                case "M_EMPL":
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]"; //agregado 04/08/2014
                    break;
                case "M_CENT_COST":
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]"; //agregado 04/08/2014
                    break;
                case "M_ORGA":
                    return "ISNULL(SUM(X.DUR_LOC),0) FIJA,ISNULL(SUM(X.DUR_CEL),0) CEL,ISNULL(SUM(X.DUR_DDI),0) DDI,ISNULL(SUM(X.DUR_TOTAL),0) TOTAL";
                    break;
                case "M_SUCU":
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]"; //agregado 04/08/2014
                    break;
                case "M_COMP":
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]"; //agregado 04/08/2014
                    break;
                case "SERVICIO":
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]"; //agregado 04/08/2014
                    break;
                case "M_PAIS":
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]"; //agregado 04/08/2014
                    break;
                case "M_CIUD":
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]";
                    break;
                default:
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]"; //agregado 04/08/2014
                    break;
            }
            break;
        default:
            switch ($("#hdfTipoSumario").val()) {
                case "M_EMPL":
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]";
                    break;
                case "M_CENT_COST":
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]";
                    break;
                case "M_ORGA":
                    return "ISNULL(SUM(X.COS_LOC),0) FIJA,ISNULL(SUM(X.COS_CEL),0) CEL, ISNULL(SUM(X.COS_DDI),0) DDI,ISNULL(SUM(X.COS_TOTAL),0) TOTAL";
                    break;
                case "M_SUCU":
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]";
                    break;
                case "M_COMP":
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]";
                    break;
                case "SERVICIO":
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]";
                    break;
                case "M_PAIS":
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]";
                    break;
                case "M_CIUD":
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]"; //agreagdo 04/08/2014 // geig(taps)
                    break;
                default:
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]";
                    break;
            }
            break;
    }
}

function fnDiseño() {
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
            $(this).css('height', '48px');
        }
    }, function () {
        if (!$(this).hasClass("esPrimerTap")) {
            $(this).animate({ marginLeft: '8px' }, 200);
            $(this).css('height', '48px');
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
                TapDinamicoSeleccionado = $(this).attr("cod");
                if (miVistaActual != 0) {
                    miVistaActual = 0;
                    fnVistaTotal();
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
    $("#dvUnidad").css("display", "none");
    var tipo;
    if (TapDinamicoSeleccionado != $(prTap).attr("cod")) {
        TapDinamicoSeleccionado = $(prTap).attr("cod");

        $("#selectServicio").html("");
        $("#selectTipo").html("");
        
        switch (TapDinamicoSeleccionado) {
            case "1":
            case "2":
                $("#selectTipo").append("<option value=\"COSTO\" selected=\"selected\">Monto</option>");
                break;
            case "3":
            case "5":
                $("#selectTipo").append("<option value=\"RE_nuCON\" >Consumo</option>");
                $("#selectTipo").append("<option value=\"COSTO\" selected=\"selected\">Monto</option>");
                break;
            case "4":
                $("#selectTipo").append("<option value=\"RE_nuCON\" >Cantidad</option>");
                $("#selectTipo").append("<option value=\"COSTO\" selected=\"selected\">Monto</option>");
                break;
            default:
                $("#selectTipo").append("<option value=\"RE_nuCON\" >Consumo</option>");
                $("#selectTipo").append("<option value=\"COSTO\" selected=\"selected\">Monto</option>");
                break;
        }
        //$("#filaServicio").css("display", "block");
        $("#filaServicio").show();

        if ($("#selectTipo").val().toUpperCase() == "COSTO") {
            tipo = 1;
        } else {
            tipo = 2;
        }

        if (DiccionarioServiciosDinamicos["serv_" + TapDinamicoSeleccionado] == undefined) {

            $.ajax({
                type: "POST",
                url: "Sum_plantilla.aspx/obtenerConceptosPorGrupo",
                data: "{'prIdTipoGrupo': '" + TapDinamicoSeleccionado + "','pTipo':'" + tipo + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var res = result.d;

                    if (res.length == 0) {
                        $("#grilla *").remove();
                        //$("#Chart *").remove();
                        $("#grilla").empty();
                        $("#grilla").append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
                        //agregado 18/07/2014 - wapumayta
                        $("#Chart").hide();
                        $("#btnExportar").button("option", "disabled", true);
                        $("#btnExportar").attr("title", "No hay datos para mostrar");
                        return;
                    }

                    var i;

                    $("#selectServicio").append("<option value=\"TOTAL\" selected=\"selected\" >Total</option>");

                    for (i = 0; i < res.length; i++) {
                        $("#selectServicio").append("<option value=\"" + res[i].P_inCodCon + "\" >" + res[i].vcNomCon + "</option>");
                        vcExpEn = res[i].ExpresadoEn;
                    }

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
            $("#selectServicio").append("<option value=\"TOTAL\" selected=\"selected\" >Total</option>");
            var i;
            for (i = 0; i < res.length; i++) {
                $("#selectServicio").append("<option value=\"" + res[i].P_inCodCon + "\" >" + res[i].vcNomCon + "</option>");
            }

            $("#btnBuscar").click();
        }
    }
}

function fnAgregarTapsTipoServicio() {
    //$("#pnlTap").html("");
    if (misTiposServicios.length > 0) {

        var AnchoTotal = 1024; //$("#prueba").width();
        AnchoTotal = $(window).width() - 100;
        var AnchoUnidad = (AnchoTotal / (misTiposServicios.length + 1)) - 25;

        var i;
        for (i = 0; i < misTiposServicios.length; i++) {
            if (i == 0) {
                $("#pnlTap").append('<div  class="CuerpoTap esPrimerTap" style="margin-left: 8px; height: 48px;"><div id="Tap' + misTiposServicios[i].vcNomGruSer + '" cod="' + misTiposServicios[i].P_in_CodGruSer + '" unidad="' + misTiposServicios[i].vcNomAbrv + '" class="Tap TapNoSelecionado" style="width: ' + AnchoUnidad.toString() + 'px; text-align: center; height: 40px;"><span class="textTab">' + misTiposServicios[i].vcNomGruSer + '</span></div></div>');
            }
            else {
                $("#pnlTap").append('<div  class="CuerpoTap" style="margin-left: 8px; height: 48px;"><div id="Tap' + misTiposServicios[i].vcNomGruSer + '" cod="' + misTiposServicios[i].P_in_CodGruSer + '" unidad="' + misTiposServicios[i].vcNomAbrv + '" class="Tap TapNoSelecionado" style="width: ' + AnchoUnidad.toString() + 'px; text-align: center; height: 40px;"><span class="textTab">' + misTiposServicios[i].vcNomGruSer + '</span></div></div>');
            }
        }
    }
    $("#pnlTap").append('<div  class="CuerpoTap" style="margin-left: 8px; height: 48px;"><div id="TapTotal" cod="0" class="Tap ui-state-active-TAB" style="width: ' + AnchoUnidad.toString() + 'px; text-align: center; height: 40px;"><span class="textTab">Total</span></div></div>');
    fnDiseño();
}

function fnVistaTotal() {
    $("#selectServicio").html("");
    $("#selectTipo").html("");
    $("#selectServicio").append("<option value=\"Total\" selected=\"selected\">Total</option>");
    $("#selectTipo").append("<option value=\"COSTO\" selected=\"selected\">Monto</option>");
    //$("#filaServicio").css("display", "none");
    $("#filaServicio").hide();
    $("#dvUnidad").css("display", "none");
    $("#btnBuscar").click();
}

function fnVistaSoloMonto() {

    $("#dvUnidad").css("display", "none");
    var tipo;
    if (TapDinamicoSeleccionado != $(prTap).attr("cod")) {
        TapDinamicoSeleccionado = $(prTap).attr("cod");

        $("#selectServicio").html("");
        $("#selectTipo").html("");

        $("#selectTipo").append("<option value=\"COSTO\" selected=\"selected\">Monto</option>");

        //$("#filaServicio").css("display", "block");
        $("#filaServicio").show();

        if ($("#selectTipo").val().toUpperCase() == "COSTO") {
            tipo = 1;
        } else {
            tipo = 2;
        }

        if (DiccionarioServiciosDinamicos["serv_" + TapDinamicoSeleccionado] == undefined) {

            $.ajax({
                type: "POST",
                url: "Sum_plantilla.aspx/obtenerConceptosPorGrupo",
                data: "{'prIdTipoGrupo': '" + TapDinamicoSeleccionado + "','pTipo':'" + tipo + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var res = result.d;

                    if (res.length == 0) {
                        $("#grilla *").remove();
                        //$("#Chart *").remove();
                        $("#grilla").empty();
                        $("#grilla").append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
                        //agregado 18/07/2014 - wapumayta
                        $("#Chart").hide();
                        $("#btnExportar").button("option", "disabled", true);
                        $("#btnExportar").attr("title", "No hay datos para mostrar");
                        return;
                    }

                    var i;

                    $("#selectServicio").append("<option value=\"TOTAL\" selected=\"selected\" >Total</option>");

                    for (i = 0; i < res.length; i++) {
                        $("#selectServicio").append("<option value=\"" + res[i].P_inCodCon + "\" >" + res[i].vcNomCon + "</option>");
                        vcExpEn = res[i].ExpresadoEn;
                    }

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
            $("#selectServicio").append("<option value=\"TOTAL\" selected=\"selected\" >Total</option>");
            var i;
            for (i = 0; i < res.length; i++) {
                $("#selectServicio").append("<option value=\"" + res[i].P_inCodCon + "\" >" + res[i].vcNomCon + "</option>");
            }

            $("#btnBuscar").click();
        }
    }
}

function fnTipoFuente() {

    switch (miVistaActual) {//0=Total | 1=Llamadas | 2=Mensajes | 3=Datos
        case 0:
            return "Total";
            break;
        case 1:
            return "Llamadas";
            break;
        case 2:
            return "Mensajes";
            break;
        case 3:
            return "Datos";
            break;
        default:
            return "Dinamico";
            break;
    }

}

function fnCargarConceptos() {
    var tipo;
    if ($("#selectTipo").val().toUpperCase() == "COSTO") {
        tipo = 1;
    } else {
        tipo = 2;
    }
    $.ajax({
        type: "POST",
        url: "Sum_plantilla.aspx/obtenerConceptosPorGrupo",
        data: "{'prIdTipoGrupo': '" + TapDinamicoSeleccionado + "','pTipo':'" + tipo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var res = result.d;

            var i;
            $("#selectServicio").html("");
            //if (tipo == 1) {
            $("#selectServicio").append("<option value=\"TOTAL\" selected=\"selected\" >Total</option>");
            //}
            for (i = 0; i < res.length; i++) {
                $("#selectServicio").append("<option value=\"" + res[i].P_inCodCon + "\" >" + res[i].vcNomCon + "</option>");
                vcExpEn = res[i].ExpresadoEn;
            }
            $("#btnBuscar").click();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}