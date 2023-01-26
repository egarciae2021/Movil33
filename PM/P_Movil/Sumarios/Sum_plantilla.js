/// <reference path="../../Common/Scripts/jquery-2.0.0-vsdoc.js" />
var tipoFormatoDuracion = 3; //0=segundos, 1=hh:mm:ss, 2=minutos(decimal), 3=minutos(entero)
var arNombreTipoFormato = ['Duración mostrada en segundos', 'Duración mostrada en formato tipo hh:mm:ss', 'Duración mostrada en minutos decimales', 'Duración mostrada en minutos enteros'];

var contador = 0;
var tree;
var idTree = "-1";
var nodos;
//agregado 15-10-2013 wapumayta
var arDatosExportacion = [];
var datosExportacion = "";
var tipoRep = "";
//-----------------------

var miVistaActual = 0;// 0=Total | 1=Llamadas | 2=Mensajes | 3=Datos
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

$(function () {
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

    //FusionCharts.setCurrentRenderer('javascript');

    //nuevos exportar agregado 15-10-2013 wapumayta
    $("#btnExportar").button();
    $("#btnExportar").click(function () {
        tipoRep = 'RepSumario';
        ExportarExcel();
    });
    function ExportarExcel() {
        pagina = "../Administrar/Adm_Reporte.aspx?Tipo=" + tipoRep + "&vcTab=" + $("#hdfTipoSumario").val() + "&Detalle=" + datosExportacion;
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
            $("#btnAbrirTreeOrganizacion").append('<img src="../../Common/Images/arrow_right.png" alt="Ocultar Organización"/>');
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
                    $("#btnAbrirTreeOrganizacion").append('<img src="../../Common/Images/arrow_right.png" alt="Ocultar Organización"/>');
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
                    $("#btnAbrirTreeOrganizacion").append('<img src="../../Common/Images/arrow_left.png" alt="Ocultar Organización"/>');
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
    //if ($("#hdfTipoSumario").val() == 'M_EMPL' || $("#hdfTipoSumario").val() == 'M_CENT_COST' || $("#hdfTipoSumario").val() == 'M_ORGA' || $("#hdfTipoSumario").val() == 'M_COMP' || $("#hdfTipoSumario").val() == 'M_PAIS' || $("#hdfTipoSumario").val() == 'M_CIUD' || $("#hdfTipoSumario").val() == 'PCS_TRF_Servicio') {
    //    //load();
    //}

    //agregado 25-09-2013 wapumayta
    $("#selectTelefonia").change(function () {
        if (miVistaActual == 0) {
            $("#selectTipo option[value=COSTO]").remove();
            if ($("#selectTelefonia").val() == 'ENT') {
                $("#selectTipo").append('<option value="COSTO" selected="selected">Monto</option>');
            } else {
                $("#selectTipo").append('<option value="COSTO" selected="selected">Monto</option>');
            }
        } else {
            if ($("#selectTelefonia").val() == 'ENT') {
                $("#selectTipo option[value=COSTO]").remove();
            } else {
                $("#selectTipo").append('<option value="COSTO" selected="selected">Monto</option>');
            }
        }
    });

    //OCULTAR ICONO DE EXPORTAR IMAGEN - MOTIVO .- PARA EXPORTAR HAY QUE CONECTARSE A LOS SERVIDORES DE FUSIONCHARTS - GEIG
    $("#btnExportarImagen").css("display", "none");
    //
});

function CrearTreeOrganizacion() {

    tree = new dhtmlXTreeObject("panelTree", "100%", "100%", 0);
    tree.setImagePath("../../Common/Images/Controles/dhtmlx/TreeView/");
    tree.setOnClickHandler(CargarDependecia);

    $.ajax({
        type: "POST",
        url: "../Consultar/Con_SeleccionArea.aspx/ListarPrincipal",
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
            url: "../Consultar/Con_SeleccionArea.aspx/ListarOrganizacion",
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
    var and = "";/// <reference path="Sum_plantilla.js" />

    var filtroBusquedaTree = $("#txtFiltro").val(); //agregado 21-10-2013 wapumayta
    var tipoServicio = fnTipoFuente();

    if (tipoServicio != "Total") {
        if ($("#chkDependencias").prop("checked")) {
            and = " AND SUBSTRING(V.CODINT_VC,1," + codOrg.length.toString() + ") like |" + codOrg + "%| ";
        }
        else {
            and = " AND V.CODINT_VC like |" + codOrg + "%| ";
        }
    }
    else {
        if ($("#chkDependencias").prop("checked")) {
            and = " AND SUBSTRING(H.CODINT_VC,1," + codOrg.length.toString() + ") like |" + codOrg + "%| ";
        }
        else {
            and = " AND H.CODINT_VC like |" + codOrg + "%| ";
        }
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
                "'prFiltro': '" + filtroBusquedaTree + "'," + //agregado 21-10-2013 wapumayta
                "'prAnd': '" + and + "'," +
                "'prTablaConsulta': '" + $("#hdfTipoSumario").val() + "'," +
                "'prP_Codigo': '" + $("#hdf_P_Codigo").val() + "'," +
                "'prF_Codigo': '" + $("#hdf_F_Codigo").val() + "'," +
                "'prP_Desc': '" + $("#hdf_Desc").val() + "'," +
                "'prF_Desc': '" + $("#hdf_F_Desc").val() + "'," +
                "'prServicioTap': '" + fnTipoFuente() + "'," +
                //"'prTipoFuente': '" + $('#selectTipo').val() + "'," +
                "'prTipoFuente': '" + ($('#selectTipo').val() == "LLAMADAS" && vcExpEn.toString().toLowerCase() == 'mb' ? "DURACION" : $('#selectTipo').val()) + "'," +
                "'prServicioValue': '" + $('#selectServicio').val() + "'," +
                "'prIdTipoServicio': '" + TapDinamicoSeleccionado + "'," +
                "'inTipLin': '" + $('#hdfCodLinTip_X_User').val() + "'," +
                "'prFormatoDuracion': '" + tipoFormatoDuracion + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {

            var resul = resultado.d;
            contador++;
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
                    }
                });


                var jsDatos = JSON.parse(datosChart2);
                jsDatos.chart.baseFont = "Open Sans";
                jsDatos.chart.baseFontColor = "#6b737c";
                jsDatos.chart.showCanvasBorder = "0";
                jsDatos.chart.usePlotGradientColor = "0";
                jsDatos.chart.plotBorderAlpha = "25";
                jsDatos.chart.exportenabled = "1";
                jsDatos.chart.exportShowMenuItem = "1";
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
                var Labels = jsDatos.categories[0].category;
                for (var i in jsDatos.dataset[0].data) {
                    jsDatos.dataset[0].data[i].color = "#01B8AA";
                    jsDatos.dataset[0].data[i].alpha = "100";
                    jsDatos.dataset[0].data[i].label = Labels[i].label;
                    jsDatos.dataset[0].data[i].tooltext = Labels[i].label;
                }

                //if (!(FusionCharts("myChartIdX"))) {
                //myChart = new FusionCharts("../../Common/Scripts/FusionCharts/bar2d.swf", "myChartIdX", "1000", "400", "0");
                myChart = new FusionCharts("StackedBar2D", "myChart" + contador.toString(), "100%", "400", "0");
                myChart.setJSONData(jsDatos);
                myChart.setTransparent(true);
                myChart.render("chartContainer");
                //} else {
                //    alert('falta');
                //    //$("#chartContainer").updateFusionCharts({ dataSource: jsDatos, dataFormat: "json" });
                //}
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
                "'prServicioValue': '" + $('#selectServicio').val() + "'," +
                "'prIdTipoServicio': '" + TapDinamicoSeleccionado + "'," +
                "'inTipLin': '" + $('#hdfCodLinTip_X_User').val() + "'," +
                "'prFormatoDuracion': '" + tipoFormatoDuracion + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;
            contador++;
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
                var columnas = JSON.parse(resul[0]);
                var datos = JSON.parse(resul[1]);
                var datosChart = resul[2];
                var datosChart2 = resul[3];
                datosGraficos = datosChart2;
                //if ($("#hdfTipoSumario").val() == "FECHA") {
                //    $("#lblFiltro").text("Filtrar por " + $.trim(columnas[0].label) + ":");
                //} else {
                //    $("#lblFiltro").text("Filtrar por " + $.trim(columnas[0].label) + "/" + $.trim(columnas[1].label) + ":");
                //}

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
    //$("#Chart").empty();
    //$("#Chart").append('<div id="chartContainer"></div> ');

    var jsDatos = JSON.parse(datosChart2);
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
    var Labels = jsDatos.categories[0].category;
    for (var i in jsDatos.dataset[0].data) {
        jsDatos.dataset[0].data[i].color = "#01B8AA";
        jsDatos.dataset[0].data[i].alpha = "100";
        jsDatos.dataset[0].data[i].label = Labels[i].label;
        jsDatos.dataset[0].data[i].tooltext = Labels[i].label;
    }

    //if (!(FusionCharts("myChartIdX"))) {
        //myChart = new FusionCharts("../../Common/Scripts/FusionCharts/bar2D.swf", "myChartIdX", "1000", "350", "0"); 
        myChart = new FusionCharts("StackedBar2D", "myChart" + contador.toString(), "600", "350", "0");
        myChart.setJSONData(jsDatos);
        myChart.setTransparent(true);
        myChart.render("chartContainer");
        blnFirstLoad = false;
    //} else {
    //    alert('falta');
    //    //$("#chartContainer").updateFusionCharts({ dataSource: jsDatos, dataFormat: "json" });
    //    blnFirstLoad = false;
    //}
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
                "'prServicioValue': '" + $('#selectServicio').val() + "'," +
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
                    width: 1000,
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
    if ($("#selectTelefonia").val() == "SAL") {
        return 'V_SUM_SC_' + $("#ddlMes").val();
    } else {
        return 'V_SUM_EC_' + $("#ddlMes").val();
    }

    var telefoniaselected;
    if ($("#selectTelefonia").val() == "SAL") {
        telefoniaselected = "SC";
    } else {
        telefoniaselected = "EC";
    }

    switch ($("#hdfTipoSumario").val()) {

        case "M_EMPL":
            return "V_ACUM_" + telefoniaselected + "_" + $("#ddlMes").val();
            break;
        case "M_CENT_COST":
            return "V_ACUM_" + telefoniaselected + "_" + $("#ddlMes").val();
            break;
        case "M_ORGA":
            //return "V_ACUM_SC_" + $("#ddlMes").val();
            return "V_ACUM_" + telefoniaselected + "_" + $("#ddlMes").val();//agregado 25-09-2013 wapumayta
            break;
        case "M_SUCU":
            return "V_ACUM_" + telefoniaselected + "_" + $("#ddlMes").val();
            break;
        case "M_COMP":
            return "V_ACUM_OPER_" + telefoniaselected + "_" + $("#ddlMes").val();
            break;
        case "SERVICIO":
            return "V_ACUM_OPER_" + telefoniaselected + "_" + $("#ddlMes").val();
            break;
        case "M_PAIS":
            return "V_ACUM_PAIS_" + telefoniaselected + "_" + $("#ddlMes").val();
            break;
        case "M_CIUD":
            return "V_ACUM_PAIS_" + telefoniaselected + "_" + $("#ddlMes").val();
            break;
        case "FECHA": //agregado 25-09-2013 wapumayta
            return "V_ACUM_" + telefoniaselected + "_" + $("#ddlMes").val();
            break;
        default:
            return "V_ACUM_SC_" + $("#ddlMes").val();
            break;
    }

}

function obtenerColumnasPorTipo() {
    switch ($("#selectTipo").val()) {
        case "LLAMADAS":
            switch ($("#hdfTipoSumario").val()) {
                case "M_EMPL":
                    //return "sum(ISNULL(ACUM_inLLALOC,0)) LOC, sum(ISNULL(ACUM_inLLACEL,0)) CEL, sum(ISNULL(ACUM_inLLADDN,0)) DDN, sum(ISNULL(ACUM_inLLADDI,0)) DDI, sum(ISNULL(ACUM_inLLATOT,0)) TOTAL";
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN 1 ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN 1 ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN 1 ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN 1 ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] = |LOC| OR V.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN 1 ELSE 0 END),0)[TOTAL]";
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN 1 ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN 1 ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN 1 ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] = |LOC| OR V.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN 1 ELSE 0 END),0)[TOTAL]";
                    break;
                case "M_CENT_COST":
                    //return "sum(ISNULL(ACUM_inLLALOC,0)) LOC, sum(ISNULL(ACUM_inLLACEL,0)) CEL, sum(ISNULL(ACUM_inLLADDN,0)) DDN, sum(ISNULL(ACUM_inLLADDI,0)) DDI, sum(ISNULL(ACUM_inLLATOT,0)) TOTAL";
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN 1 ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN 1 ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN 1 ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN 1 ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] = |LOC| OR V.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN 1 ELSE 0 END),0)[TOTAL]";
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN 1 ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN 1 ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN 1 ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] = |LOC| OR V.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN 1 ELSE 0 END),0)[TOTAL]";
                    break;
                case "M_ORGA":
                    //return "IsNull(Sum(X.ACUM_inLLALOC),0) LOC, IsNull(Sum(X.ACUM_inLLACEL),0) CEL, IsNull(Sum(X.ACUM_inLLADDN),0) DDN, IsNull(Sum(X.ACUM_inLLADDI),0) DDI, IsNull(Sum(X.ACUM_inLLATOT),0) TOTAL";
                    //return "ISNULL(SUM(X.LLA_LOC),0) LOC,ISNULL(SUM(X.LLA_CEL),0) CEL,ISNULL(SUM(X.LLA_DDN),0) DDN,ISNULL(SUM(X.LLA_DDI),0) DDI,ISNULL(SUM(X.LLA_TOTAL),0) TOTAL";
                    return "ISNULL(SUM(X.LLA_LOC),0) FIJA,ISNULL(SUM(X.LLA_CEL),0) CEL,ISNULL(SUM(X.LLA_DDI),0) DDI,ISNULL(SUM(X.LLA_TOTAL),0) TOTAL";
                    break;
                case "M_SUCU":
                    //return "IsNull(Sum(ACUM_inLLALOC),0) LOC, IsNull(Sum(ACUM_inLLACEL),0) CEL, IsNull(Sum(ACUM_inLLADDN),0) DDN, IsNull(Sum(ACUM_inLLADDI),0) DDI, IsNull(Sum(ACUM_inLLATOT),0) TOTAL";
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN 1 ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN 1 ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN 1 ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN 1 ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] = |LOC| OR V.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN 1 ELSE 0 END),0)[TOTAL]";
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN 1 ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN 1 ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN 1 ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] = |LOC| OR V.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN 1 ELSE 0 END),0)[TOTAL]";
                    break;
                case "M_COMP":
                    //return "ISNULL(Sum(case s.vcGlo  when |LOC| THEN ACOP_inLLA ELSE 0 END),0) LOC, ISNULL(Sum(case s.vcGlo  when |CEL| THEN ACOP_inLLA ELSE 0 END),0) CEL, ISNULL(Sum(case s.vcGlo  when |DDN| THEN ACOP_inLLA ELSE 0 END),0) DDN, ISNULL(Sum(case s.vcGlo  when |DDI| THEN ACOP_inLLA ELSE 0 END),0) DDI, ISNULL(Sum(ACOP_inLLA ),0) TOTAL"; //total suma servicios, incorrecto
                    //return "ISNULL(Sum(case s.vcGlo  when |LOC| THEN ACOP_inLLA ELSE 0 END),0) LOC, ISNULL(Sum(case s.vcGlo  when |CEL| THEN ACOP_inLLA ELSE 0 END),0) CEL, ISNULL(Sum(case s.vcGlo  when |DDN| THEN ACOP_inLLA ELSE 0 END),0) DDN, ISNULL(Sum(case s.vcGlo  when |DDI| THEN ACOP_inLLA ELSE 0 END),0) DDI, ISNULL(SUM(CASE WHEN s.vcGlo = |LOC| OR s.vcGlo = |CEL| OR s.vcGlo = |DDN| OR s.vcGlo = |DDI| THEN ACOP_inLLA ELSE 0 END),0) TOTAL"; //agregado 01/08/2014 wapumayta
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN 1 ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN 1 ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN 1 ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN 1 ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] = |LOC| OR V.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN 1 ELSE 0 END),0)[TOTAL]";
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN 1 ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN 1 ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN 1 ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] = |LOC| OR V.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN 1 ELSE 0 END),0)[TOTAL]";
                    break;
                case "SERVICIO":
                    //return "ISNULL(Sum(case s.vcGlo  when |LOC| THEN ACOP_inLLA ELSE 0 END),0) LOC, ISNULL(Sum(case s.vcGlo  when |CEL| THEN ACOP_inLLA ELSE 0 END),0) CEL, ISNULL(Sum(case s.vcGlo  when |DDN| THEN ACOP_inLLA ELSE 0 END),0) DDN, ISNULL(Sum(case s.vcGlo  when |DDI| THEN ACOP_inLLA ELSE 0 END),0) DDI, ISNULL(Sum(ACOP_inLLA ),0) TOTAL";
                    //return "ISNULL(Sum(case s.vcGlo  when |LOC| THEN ACOP_inLLA ELSE 0 END),0) LOC, ISNULL(Sum(case s.vcGlo  when |CEL| THEN ACOP_inLLA ELSE 0 END),0) CEL, ISNULL(Sum(case s.vcGlo  when |DDN| THEN ACOP_inLLA ELSE 0 END),0) DDN, ISNULL(Sum(case s.vcGlo  when |DDI| THEN ACOP_inLLA ELSE 0 END),0) DDI, ISNULL(SUM(CASE WHEN s.vcGlo = |LOC| OR s.vcGlo = |CEL| OR s.vcGlo = |DDN| OR s.vcGlo = |DDI| THEN ACOP_inLLA ELSE 0 END),0) TOTAL";                    
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN 1 ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN 1 ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN 1 ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN 1 ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] = |LOC| OR V.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN 1 ELSE 0 END),0)[TOTAL]";
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN 1 ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN 1 ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN 1 ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] = |LOC| OR V.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN 1 ELSE 0 END),0)[TOTAL]";
                    break;
                case "M_PAIS":
                    //return "ISNULL(Sum(ACPA_inLLA),0) TOTAL";
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN 1 ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN 1 ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN 1 ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN 1 ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] = |LOC| OR V.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN 1 ELSE 0 END),0)[TOTAL]";
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN 1 ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN 1 ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN 1 ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] = |LOC| OR V.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN 1 ELSE 0 END),0)[TOTAL]";
                    break;
                case "M_CIUD":
                    //return "ISNULL(Sum(ACPA_inLLA),0) TOTAL";
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN 1 ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN 1 ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN 1 ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN 1 ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] = |LOC| OR V.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN 1 ELSE 0 END),0)[TOTAL]";
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN 1 ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN 1 ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN 1 ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] = |LOC| OR V.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN 1 ELSE 0 END),0)[TOTAL]";
                    break;
                default:
                    //return "IsNull(Sum(ACUM_inLLALOC),0) LOC, IsNull(Sum(ACUM_inLLACEL),0) CEL, IsNull(Sum(ACUM_inLLADDN),0) DDN, IsNull(Sum(ACUM_inLLADDI),0) DDI, IsNull(Sum(ACUM_inLLATOT),0) TOTAL"
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN 1 ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN 1 ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN 1 ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN 1 ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] = |LOC| OR V.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN 1 ELSE 0 END),0)[TOTAL]";
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN 1 ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN 1 ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN 1 ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] = |LOC| OR V.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN 1 ELSE 0 END),0)[TOTAL]";
                    break;
            }

            break;
        case "DURACION":
            switch ($("#hdfTipoSumario").val()) {

                case "M_EMPL":
                    //return "sum(ISNULL(ACUM_inCONLOC,0)) LOC, sum(ISNULL(ACUM_inCONCEL,0)) CEL, sum(ISNULL(ACUM_inCONDDN,0)) DDN, sum(ISNULL(ACUM_inCONDDI,0)) DDI, sum(ISNULL(ACUM_inCONTOT,0)) TOTAL";
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.DURACION ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]"; //agregado 04/08/2014
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]"; //agregado 04/08/2014
                    break;
                case "M_CENT_COST":
                    //return "sum(ISNULL(ACUM_inCONLOC,0)) LOC, sum(ISNULL(ACUM_inCONCEL,0)) CEL, sum(ISNULL(ACUM_inCONDDN,0)) DDN, sum(ISNULL(ACUM_inCONDDI,0)) DDI, sum(ISNULL(ACUM_inCONTOT,0)) TOTAL";
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.DURACION ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]"; //agregado 04/08/2014
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]"; //agregado 04/08/2014
                    break;
                case "M_ORGA":
                    //return "IsNull(Sum(X.ACUM_inCONLOC),0) LOC, IsNull(Sum(X.ACUM_inCONCEL),0) CEL, IsNull(Sum(X.ACUM_inCONDDN),0) DDN, IsNull(Sum(X.ACUM_inCONDDI),0) DDI, IsNull(Sum(X.ACUM_inCONTOT),0) TOTAL";
                    //return "ISNULL(SUM(X.DUR_LOC),0) LOC,ISNULL(SUM(X.DUR_CEL),0) CEL,ISNULL(SUM(X.DUR_DDN),0) DDN,ISNULL(SUM(X.DUR_DDI),0) DDI,ISNULL(SUM(X.DUR_TOTAL),0) TOTAL";
                    return "ISNULL(SUM(X.DUR_LOC),0) FIJA,ISNULL(SUM(X.DUR_CEL),0) CEL,ISNULL(SUM(X.DUR_DDI),0) DDI,ISNULL(SUM(X.DUR_TOTAL),0) TOTAL";
                    break;
                case "M_SUCU":
                    //return "IsNull(Sum(ACUM_inCONLOC),0) LOC, IsNull(Sum(ACUM_inCONCEL),0) CEL, IsNull(Sum(ACUM_inCONDDN),0) DDN, IsNull(Sum(ACUM_inCONDDI),0) DDI, IsNull(Sum(ACUM_inCONTOT),0) TOTAL";
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.DURACION ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]"; //agregado 04/08/2014
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]"; //agregado 04/08/2014
                    break;
                case "M_COMP":
                    //return "ISNULL(Sum(case s.vcGlo  when |LOC| THEN ACOP_inCON ELSE 0 END),0) LOC, ISNULL(Sum(case s.vcGlo  when |CEL| THEN ACOP_inCON ELSE 0 END),0) CEL, ISNULL(Sum(case s.vcGlo  when |DDN| THEN ACOP_inCON ELSE 0 END),0) DDN, ISNULL(Sum(case s.vcGlo  when |DDI| THEN ACOP_inCON ELSE 0 END),0) DDI, ISNULL(Sum(ACOP_inCON ),0) TOTAL"; //suma duracion de servicios incorrecto
                    //return "ISNULL(Sum(case s.vcGlo  when |LOC| THEN ACOP_inCON ELSE 0 END),0) LOC, ISNULL(Sum(case s.vcGlo  when |CEL| THEN ACOP_inCON ELSE 0 END),0) CEL, ISNULL(Sum(case s.vcGlo  when |DDN| THEN ACOP_inCON ELSE 0 END),0) DDN, ISNULL(Sum(case s.vcGlo  when |DDI| THEN ACOP_inCON ELSE 0 END),0) DDI, ISNULL(SUM(CASE WHEN s.vcGlo = |LOC| OR s.vcGlo = |CEL| OR s.vcGlo = |DDN| OR s.vcGlo = |DDI| THEN ACOP_inCON ELSE 0 END),0) TOTAL"; //agreagdo 01/08/2014 wapumayta
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.DURACION ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]"; //agregado 04/08/2014
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]"; //agregado 04/08/2014
                    break;
                case "SERVICIO":
                    //return "ISNULL(Sum(case s.vcGlo  when |LOC| THEN ACOP_inCON ELSE 0 END),0) LOC, ISNULL(Sum(case s.vcGlo  when |CEL| THEN ACOP_inCON ELSE 0 END),0) CEL, ISNULL(Sum(case s.vcGlo  when |DDN| THEN ACOP_inCON ELSE 0 END),0) DDN, ISNULL(Sum(case s.vcGlo  when |DDI| THEN ACOP_inCON ELSE 0 END),0) DDI, ISNULL(Sum(ACOP_inCON ),0) TOTAL";
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.DURACION ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]"; //agregado 04/08/2014
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]"; //agregado 04/08/2014
                    break;
                case "M_PAIS":
                    //return "ISNULL(Sum(ACPA_inCON),0) TOTAL";
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.DURACION ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]"; //agregado 04/08/2014
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]"; //agregado 04/08/2014
                    break;
                case "M_CIUD":
                    //return "ISNULL(Sum(ACPA_inCON),0) TOTAL";
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.DURACION ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]"; //agregado 04/08/2014
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]";
                    break;
                default:
                    //return "IsNull(Sum(ACUM_inCONLOC),0) LOC, IsNull(Sum(ACUM_inCONCEL),0) CEL, IsNull(Sum(ACUM_inCONDDN),0) DDN, IsNull(Sum(ACUM_inCONDDI),0) DDI, IsNull(Sum(ACUM_inCONTOT),0) TOTAL";
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.DURACION ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]"; //agregado 04/08/2014
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.DURACION ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.DURACION ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.DURACION ELSE 0 END),0)[DDI],ISNULL(SUM(CASE when V.[GLOBAL] = |LOC| OR v.[GLOBAL] = |CEL| OR V.[GLOBAL] = |DDN| OR V.[GLOBAL] = |DDI| THEN V.DURACION ELSE 0 END),0)[TOTAL]"; //agregado 04/08/2014
                    break;
            }
            break;
        default:
            switch ($("#hdfTipoSumario").val()) {
                case "M_EMPL":
                    //return "sum(ISNULL(ACUM_nuCOSLOC,0)) LOC,    sum(ISNULL(ACUM_nuCOSCEL,0)) CEL,    sum(ISNULL(ACUM_nuCOSDDN,0)) DDN,    sum(ISNULL(ACUM_nuCOSDDI,0)) DDI,    sum(ISNULL(ACUM_nuSRCCOS,0)) SRCCOS, sum(ISNULL(ACUM_nuCOSTOT,0)) TOTAL";
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.COSTO ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE V.[GLOBAL] WHEN |SRCEL| THEN V.COSTO ELSE 0 END),0)[SRCCOS],ISNULL(SUM(V.COSTO),0)[TOTAL]"; //agreagdo 04/08/2014 //geig(taps)
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.COSTO ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]";
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]";
                    break;
                case "M_CENT_COST":
                    //return "sum(ISNULL(ACUM_nuCOSLOC,0)) LOC,    sum(ISNULL(ACUM_nuCOSCEL,0)) CEL,    sum(ISNULL(ACUM_nuCOSDDN,0)) DDN,    sum(ISNULL(ACUM_nuCOSDDI,0)) DDI,    sum(ISNULL(ACUM_nuSRCCOS,0)) SRCCOS, sum(ISNULL(ACUM_nuCOSTOT,0)) TOTAL";
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.COSTO ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE V.[GLOBAL] WHEN |SRCEL| THEN V.COSTO ELSE 0 END),0)[SRCCOS],ISNULL(SUM(V.COSTO),0)[TOTAL]"; //agreagdo 04/08/2014 // geig(taps)
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.COSTO ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]";
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]";
                    break;
                case "M_ORGA":
                    //return "IsNull(Sum(X.ACUM_nuCOSLOC),0) LOC,    IsNull(Sum(X.ACUM_nuCOSCEL),0) CEL,    IsNull(Sum(X.ACUM_nuCOSDDN),0) DDN,    IsNull(Sum(X.ACUM_nuCOSDDI),0) DDI,    IsNull(Sum(X.ACUM_nuSRCCOS),0) SRCCOS, IsNull(Sum(X.ACUM_nuCOSTOT),0) TOTAL";
                    //return "ISNULL(SUM(X.COS_LOC),0) LOC,ISNULL(SUM(X.COS_CEL),0) CEL,ISNULL(SUM(X.COS_DDN),0) DDN,ISNULL(SUM(X.COS_DDI),0) DDI,ISNULL(SUM(X.COS_SRCOS),0) SRCCOS ,ISNULL(SUM(X.COS_TOTAL),0) TOTAL";//geig(taps)
                    //return "ISNULL(SUM(X.COS_LOC),0) LOC,ISNULL(SUM(X.COS_CEL),0) CEL,ISNULL(SUM(X.COS_DDN),0) DDN,ISNULL(SUM(X.COS_DDI),0) DDI,ISNULL(SUM(X.COS_TOTAL),0) TOTAL";
                    return "ISNULL(SUM(X.COS_LOC),0) FIJA,ISNULL(SUM(X.COS_CEL),0) CEL, ISNULL(SUM(X.COS_DDI),0) DDI,ISNULL(SUM(X.COS_TOTAL),0) TOTAL";
                    break;
                case "M_SUCU":
                    //return "IsNull(Sum(ACUM_nuCOSLOC),0) LOC,    IsNull(Sum(ACUM_nuCOSCEL),0) CEL,    IsNull(Sum(ACUM_nuCOSDDN),0) DDN,    IsNull(Sum(ACUM_nuCOSDDI),0) DDI,    IsNull(Sum(ACUM_nuSRCCOS),0) SRCCOS, IsNull(Sum(ACUM_nuCOSTOT),0) TOTAL";
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.COSTO ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE V.[GLOBAL] WHEN |SRCEL| THEN V.COSTO ELSE 0 END),0)[SRCCOS],ISNULL(SUM(V.COSTO),0)[TOTAL]"; //agreagdo 04/08/2014 // geig(taps)
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.COSTO ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]"; 
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]";
                    break;
                case "M_COMP":
                    //return "ISNULL(Sum(case s.vcGlo  when |LOC| THEN ACOP_nuCOS ELSE 0 END),0) LOC, ISNULL(Sum(case s.vcGlo  when |CEL| THEN ACOP_nuCOS ELSE 0 END),0) CEL, ISNULL(Sum(case s.vcGlo  when |DDN| THEN ACOP_nuCOS ELSE 0 END),0) DDN, ISNULL(Sum(case s.vcGlo  when |DDI| THEN ACOP_nuCOS ELSE 0 END),0) DDI, ISNULL(Sum(case s.vcGlo  when |SRCEL| THEN ACOP_nuCOS ELSE 0 END),0) SRCCOS, ISNULL(Sum(ACOP_nuCOS ),0) TOTAL";
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.COSTO ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE V.[GLOBAL] WHEN |SRCEL| THEN V.COSTO ELSE 0 END),0)[SRCCOS],ISNULL(SUM(V.COSTO),0)[TOTAL]"; //agreagdo 04/08/2014 // geig(taps)
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.COSTO ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]";
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]";
                    break;
                case "SERVICIO":
                    //return "ISNULL(Sum(case s.vcGlo  when |LOC| THEN ACOP_nuCOS ELSE 0 END),0) LOC, ISNULL(Sum(case s.vcGlo  when |CEL| THEN ACOP_nuCOS ELSE 0 END),0) CEL, ISNULL(Sum(case s.vcGlo  when |DDN| THEN ACOP_nuCOS ELSE 0 END),0) DDN, ISNULL(Sum(case s.vcGlo  when |DDI| THEN ACOP_nuCOS ELSE 0 END),0) DDI, ISNULL(Sum(case s.vcGlo  when |SRCEL| THEN ACOP_nuCOS ELSE 0 END),0) SRCCOS, ISNULL(Sum(ACOP_nuCOS ),0) TOTAL";
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.COSTO ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE V.[GLOBAL] WHEN |SRCEL| THEN V.COSTO ELSE 0 END),0)[SRCCOS],ISNULL(SUM(V.COSTO),0)[TOTAL]"; //agreagdo 04/08/2014 // geig(taps)
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.COSTO ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]";
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]";
                    break;
                case "M_PAIS":
                    //return "ISNULL(Sum(ACPA_nuCOS),0) TOTAL";
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.COSTO ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE V.[GLOBAL] WHEN |SRCEL| THEN V.COSTO ELSE 0 END),0)[SRCCOS],ISNULL(SUM(V.COSTO),0)[TOTAL]"; //agreagdo 04/08/2014 // geig(taps)
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.COSTO ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]";
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]";
                    break;
                case "M_CIUD":
                    //return "ISNULL(Sum(ACPA_nuCOS),0) TOTAL";
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.COSTO ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE V.[GLOBAL] WHEN |SRCEL| THEN V.COSTO ELSE 0 END),0)[SRCCOS],ISNULL(SUM(V.COSTO),0)[TOTAL]"; //agreagdo 04/08/2014 // geig(taps)
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.COSTO ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]"; //agreagdo 04/08/2014 // geig(taps)
                    return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[FIJA],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]"; //agreagdo 04/08/2014 // geig(taps)
                    break;
                default:
                    //return "IsNull(Sum(ACUM_nuCOSLOC),0) LOC,    IsNull(Sum(ACUM_nuCOSCEL),0) CEL,    IsNull(Sum(ACUM_nuCOSDDN),0) DDN,    IsNull(Sum(ACUM_nuCOSDDI),0) DDI,    IsNull(Sum(ACUM_nuSRCCOS),0) SRCCOS, IsNull(Sum(ACUM_nuCOSTOT),0) TOTAL";
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.COSTO ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE V.[GLOBAL] WHEN |SRCEL| THEN V.COSTO ELSE 0 END),0)[SRCCOS],ISNULL(SUM(V.COSTO),0)[TOTAL]"; //agreagdo 04/08/2014 // geig(taps)
                    //return "ISNULL(SUM(CASE V.[GLOBAL] WHEN |LOC| THEN V.COSTO ELSE 0 END),0)[LOC],ISNULL(SUM(CASE V.[GLOBAL] WHEN |CEL| THEN V.COSTO ELSE 0 END),0)[CEL],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDN| THEN V.COSTO ELSE 0 END),0)[DDN],ISNULL(SUM(CASE V.[GLOBAL] WHEN |DDI| THEN V.COSTO ELSE 0 END),0)[DDI],ISNULL(SUM(CASE WHEN V.[GLOBAL] <> |SRCEL| THEN V.COSTO ELSE 0 END),0)[TOTAL]";
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
                TapDinamicoSeleccionado = $(this).attr("cod");
                if (miVistaActual != 0) {
                    miVistaActual = 0;
                    fnVistaTotal();
                }
                break;
                //case ("TapLlamadas").toLowerCase():
            case "16":
                TapDinamicoSeleccionado = $(this).attr("cod");
                if (miVistaActual != 1) {
                    miVistaActual = 1;
                    fnVistaLlamadas();
                }
                break;
                //case ("TapMensajes").toLowerCase(): 
            case "18":
                TapDinamicoSeleccionado = $(this).attr("cod");
                if (miVistaActual != 2) {
                    miVistaActual = 2;
                    fnVistaMensajes();
                }
                break;
                //case ("TapDatos").toLowerCase(): 
            case "17":
                TapDinamicoSeleccionado = $(this).attr("cod");
                if (miVistaActual != 3) {
                    miVistaActual = 3;
                    fnVistaDatos(this);
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
    if (TapDinamicoSeleccionado != $(prTap).attr("cod")) {
        TapDinamicoSeleccionado = $(prTap).attr("cod");

        $("#selectServicio").html("");
        $("#selectTipo").html("");

        if ($(prTap).attr("id").indexOf("Mens") > 0) {
            $("#selectTipo").append("<option value=\"CANTIDAD\" >Cantidad</option>");
            $("#selectTipo").append("<option value=\"COSTO\" selected=\"selected\">Monto</option>");
        }
        else {
            $("#selectTipo").append("<option value=\"LLAMADAS\" >Cantidad</option>");
            $("#selectTipo").append("<option value=\"COSTO\" selected=\"selected\">Monto</option>");
        }

        $("#filaServicio").show();

        if (DiccionarioServiciosDinamicos["serv_" + TapDinamicoSeleccionado] == undefined) {

            $.ajax({
                type: "POST",
                url: "Sum_plantilla.aspx/obtenerServiciosPorTipoServicio",
                data: "{'prIdTipoServicio': '" + TapDinamicoSeleccionado + "'}",
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

function fnAgregarTapsTipoServicio() {
    //$("#pnlTap").html("");
    if (misTiposServicios.length > 0) {

        var AnchoTotal = 1024; //$("#prueba").width();
        var AnchoUnidad = (AnchoTotal / (misTiposServicios.length + 1)) - 25;

        var i;
        for (i = 0; i < misTiposServicios.length; i++) {
            if (i == 0) {
                $("#pnlTap").append('<div  class="CuerpoTap esPrimerTap"><div id="Tap' + misTiposServicios[i].vcNom + '" cod="' + misTiposServicios[i].P_inCod + '" unidad="' + misTiposServicios[i].vcExpEn + '" class="Tap TapNoSelecionado" style="width: ' + AnchoUnidad.toString() + 'px; text-align: center;"><span class="textTab">' + misTiposServicios[i].vcNom + '</span></div></div>');
            }
            else {
                $("#pnlTap").append('<div  class="CuerpoTap"><div id="Tap' + misTiposServicios[i].vcNom + '" cod="' + misTiposServicios[i].P_inCod + '" unidad="' + misTiposServicios[i].vcExpEn + '" class="Tap TapNoSelecionado" style="width: ' + AnchoUnidad.toString() + 'px; text-align: center;"><span class="textTab">' + misTiposServicios[i].vcNom + '</span></div></div>');
            }
        }
    }
    $("#pnlTap").append('<div  class="CuerpoTap"><div id="TapTotal" cod="0" class="Tap ui-state-active-TAB" style="width: ' + AnchoUnidad.toString() + 'px; text-align: center;"><span class="textTab">Total</span></div></div>');
    fnDiseño();
}

function fnVistaTotal() {
    $("#selectServicio").html("");
    $("#selectTipo").html("");
    $("#selectServicio").append("<option value=\"Total\" selected=\"selected\">Total</option>");
    $("#selectTipo").append("<option value=\"COSTO\" selected=\"selected\">Monto</option>");
    $("#filaServicio").hide();
    $("#dvUnidad").hide();
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
    $("#selectTipo").append("<option value=\"COSTO\" selected=\"selected\">Monto</option>");


    $("#filaServicio").show();
    $("#dvUnidad").hide();


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
        $("#selectServicio").append("<option value=\"Total\" >Total</option>");
    }

    $("#selectTipo").append("<option value=\"LLAMADAS\" >Cantidad</option>");
    $("#selectTipo").append("<option value=\"COSTO\" selected=\"selected\">Monto</option>");
    $("#filaServicio").show();


    $("#dvUnidad").hide();
    $("#btnBuscar").click();
}

function fnVistaDatos(e) {
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
        $("#selectServicio").append("<option value=\"Total\" >Total</option>");
    }

    $("#selectTipo").append("<option value=\"LLAMADAS\" >Cantidad</option>");
    $("#selectTipo").append("<option value=\"COSTO\" selected=\"selected\">Monto</option>");
    $("#filaServicio").show();

    $("#dvUnidad").text("(*) Unidades medidas en " + $(e).attr("unidad").toString());

    $("#dvUnidad").show();

    $("#btnBuscar").click();
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
