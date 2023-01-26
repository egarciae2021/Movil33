var vcCodCue, vcNum, vcPer;
var blCargarConceptoInicio = false;
var widthGrid = 920;
var heigthGrid = 210;

var Graficowidth = 355;
var Graficoheigth = 130;

var Graficowidth_inf = 920;
var Graficoheigth_inf = 230;

var vcGrupo00 = 'white';

var vcGrupo01 = '#01B8AA'; // #9EDAED'
var vcGrupo02 = '#7FBBB1'; //
var vcGrupo03 = '#99CC32'; //
var vcGrupo04 = '#FF7F00'; //
var vcGrupo05 = '#FC2424'; //
var vcGrupo06 = '#429A3D'; //
var vcGrupo07 = '#EF6C98';
var vcGrupo08 = '#D64DD6'; //
var vcGrupo09 = '#CFB53B'; //
var vcGrupo10 = '#957552'; //
var vcGrupo11 = '#6991FF'; //
var vcGrupo12 = '#CC8136';
var vcGrupo13 = '#8F8FBD';

var vcGrupo14 = '#'; // 
var vcGrupo15 = '#'; //
var vcGrupo16 = '#'; //
var vcGrupo17 = '#'; //
var vcGrupo18 = '#'; //
var vcGrupo19 = '#'; //
var vcGrupo20 = '#'; //

var Ancho = 0;
var Alto = 0;
var oCulturaUsuario;


// #region LOAD
$(function () {

    $(".lblGrupo").text(": TOTAL");

    oCulturaUsuario = window.parent.parent.parent.oCulturaUsuario;

    CargaCultura();


    //    FusionCharts.setCurrentRenderer('javascript');
    //    //alert(JSON.stringify(oCulturaUsuario));
    //  
    //    vcCodCue = $("#hdfCodCue").val();
    //    vcNum = $("#hdfNumCel").val();
    //    vcPer = $("#hfdMesPer").val();


    //    Modelo_ResumenConcepto_();

    //    Listar_Resumen_Grupo_(vcNum);

    //    Grafico_Pie_Grupo_();

    function CargaCultura() {
        if (oCulturaUsuario == undefined) {
            $.ajax({
                type: "POST",
                url: "../../../Common/WebService/General.asmx/ObtenerCulturaPrincipalUsuario",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    oCulturaUsuario = result.d;

                    Inicio();
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        } else {
            Inicio();
        }
    }
    function Inicio() {
        FusionCharts.setCurrentRenderer('javascript');

        vcCodCue = $("#hdfCodCue").val();
        vcNum = $("#hdfNumCel").val();
        vcPer = $("#hfdMesPer").val();

        Modelo_ResumenConcepto_();

        Listar_Resumen_Grupo_(vcNum);

        //Grafico_Pie_Grupo_();
    }

});
// #endregion LOAD

function Listar_Resumen_Grupo_(p_vcNum) {

    var p_mesPer = $("#hdfPer").val();
    //    var p_vcNum  = $("#hdfNumCel").val();
    var p_codCue = $("#hdfCodCue").val();
    var p_codOpe = $("#hdfCodOpe").val();

    var tbGrupo = $("#tbGrupo").jqGrid({
        sortable: false,
        loadonce: true,
        loadui: 'disable',
        datatype: "local",
        height: '122',
        width: '445',
        sortname: 'id',
        sortorder: "asc",
        colNames: ['id', 'Grupo', 'Total', 'IdGrupo', 'vcGrupo10', 'vcGrupo11'],
        colModel: [{ name: 'id', index: 'id', hidden: true, width: 10, formatter: function (value, options, rData) { return rData[0]; } },
                   {
                       name: 'vcGrupo01', index: 'vcGrupo01', width: 285, align: "left", sortable: true, resizable: false, formatter: function (value, options, rData) {
                           var Nombre = '"' + rData.vcGrupo01 + '"';
                           return "<span title='Ver Conceptos: " + rData.vcGrupo01 + "' name='" + rData.vcGrupo01 + "' id='" + rData.IdGrupo + "' onclick='Listar_ResumenDetalle_(this.id);Grafico_Pie_DetallexGrupo_(this.id, " + Nombre + ");Grafico_Historico_Linea_x_Grupo_(this.id," + Nombre + ");cambiarDetalleTitulo(" + Nombre + ");' style='height:22px; cursor:hand; cursor:pointer; cursor:hand; text-decoration: underline; '>" + rData.vcGrupo01 + "</span>";
                       }
                   },
                   {
                       name: 'vcGrupo04', index: 'vcGrupo04', width: 130, align: "right", sortable: true, resizable: false, sorttype: 'number'
                       , formatter: 'number', formatoptions: { decimalSeparator: oCulturaUsuario.vcSimDec, thousandsSeparator: oCulturaUsuario.vcSimSepMil, decimalPlaces: oCulturaUsuario.dcNumDec }
                   },
                   { name: 'IdGrupo', index: 'IdGrupo', hidden: true, width: 10 },
                   { name: 'vcGrupo10', index: 'vcGrupo10', hidden: true, width: 10, formatter: function (value, options, rData) { return rData.IdGrupo; } },
                   { name: 'vcGrupo11', index: 'vcGrupo11', hidden: true, width: 10, formatter: function (value, options, rData) { return rData.vcGrupo01; } },
        ],
        viewrecords: true,
        shrinkToFit: true, // wa, corrección de diseño
        rownumbers: false,
        footerrow: true,
        forceFit: true,
        gridview: true,
        //beforeSelectRow: function (rowid, e) {
        //    alert(rowid);
        //},
        //datatype: function () {
        //},
        onSelectRow: function (id) {
            var rowId = $("#tbGrupo").jqGrid('getGridParam', 'selrow');
            var rowData = jQuery("#tbGrupo").getRowData(rowId);
            var Id = rowData.vcGrupo10;
            var Nombre = rowData.vcGrupo11;

            Listar_ResumenDetalle_(Id);
            Grafico_Pie_DetallexGrupo_(Id, Nombre);
            Grafico_Historico_Linea_x_Grupo_(Id, Nombre);
            cambiarDetalleTitulo(Nombre);
        }
    });

    //Cargar Grilla
    CargarGrillaPrincipal(p_mesPer, p_vcNum, p_codCue, p_codOpe);
}


function CargarGrillaPrincipal(p_mesPer, p_vcNum, p_codCue, p_codOpe) {
    $.ajax({
        type: "POST",
        url: "Con_Fac_ConsultaPrincipal.aspx/ListarResumenLinea",
        data: "{'p_mesPer':'" + p_mesPer + "','p_vcNum':'" + p_vcNum + "','p_codCue':'" + p_codCue + "','p_codOpe':'" + p_codOpe +
              "','p_inCodGrupo':'" + $("#hdfCodGrupo").val() + "','p_inCodConcepto':'" + $("#hdfCodConcepto").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            // ==============================================================================================================================
            $("#tbGrupo").jqGrid('clearGridData');

            var totalIm = 0;
            var i;

            for (i = 0; i < $(result.d).length; i++) {
                //totalIm = totalIm + parseFloat(result.d[i].vcGrupo03);
                totalIm = totalIm + parseFloat(result.d[i].vcGrupo04);
                //totalIm = totalIm + parseFloat(ParseFloatMultiPais(result.d[i].vcGrupo04, oCulturaUsuario));
            }

            //vcGrupo10

            //$("#tbGrupo").jqGrid("footerData", "set", { vcGrupo01: "TOTAL", vcGrupo03: totalIm.toFixed(2) });
            $("#tbGrupo").jqGrid("footerData", "set", { vcGrupo01: "TOTAL", vcGrupo04: totalIm }); //FormatoNumero(totalIm, oCulturaUsuario, false) });
            if ($(result.d).length > 0) {
                for (i = 0; i < $(result.d).length; i++) {
                    $("#tbGrupo").jqGrid('addRowData', result.d[i].IdGrupo, result.d[i]);
                }
            }

            setTimeout(function () {
                if (!blCargarConceptoInicio) {
                    blCargarConceptoInicio = true;
                    Listar_ResumenDetalle_("-1");
                    Grafico_Pie_DetallexGrupo_("-1", "TOTAL");
                    Grafico_Historico_Linea_();
                }
            }, 600);

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function cambiarDetalleTitulo(name) {
    if (name == 'undefined') {
        $(".lblGrupo").text("");
    } else {
        $(".lblGrupo").text(": " + name);
    }
}

function Listar_ResumenDetalle_(id) {
    if (id == 'undefined') {
        id = -1;
        $("#hdfCodGrupo").val("-1");
    }
    if (id == 'undefined') {
        $("#tbConcepto").jqGrid('clearGridData');
        $("#tbConcepto").jqGrid("footerData", "set", { vcGrupo01: "Total", vcGrupo03: "0.00" });
        id = -1;
        $("#hdfCodGrupo").val("-1");
    } else {
        var p_mesPer = $("#hdfPer").val();
        var p_vcNum = $("#hdfNumCel").val();
        var p_codCue = $("#hdfCodCue").val();
        var p_codOpe = $("#hdfCodOpe").val();
        $("#hdfCodGrupo").val(id);
        $.ajax({
            type: "POST",
            url: "Con_Fac_ConsultaPrincipal.aspx/ListarResumenConceptos",
            data: "{'p_idGru': '" + id + "', 'p_mesPer':'" + p_mesPer + "','p_vcNum':'" + p_vcNum + "','p_codCue':'" + p_codCue + "','p_codOpe':'" + p_codOpe +
                  "','p_inCodGrupo':'" + $("#hdfCodGrupo").val() + "','p_inCodConcepto':'" + $("#hdfCodConcepto").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                // ==============================================================================================================================
                $("#tbConcepto").jqGrid('clearGridData');

                var totalIm = 0;
                var i;
                for (i = 0; i < $(result.d).length; i++) {
                    totalIm = totalIm + parseFloat(result.d[i].vcGrupo03);
                }

                //$("#tbConcepto").jqGrid("footerData", "set", { vcGrupo01: "Total", vcGrupo03: FormatoNumero(totalIm, oCulturaUsuario, false) });
                $("#tbConcepto").jqGrid("footerData", "set", { vcGrupo01: "Total", _vcGrupo03: totalIm });

                if ($(result.d).length > 0) {
                    for (i = 0; i < result.d.length; i++) {
                        result.d[i].vcGrupo03 = FormatoNumero(result.d[i].vcGrupo03, oCulturaUsuario, false);
                    }
                    for (i = 0; i < $(result.d).length; i++) {
                        $("#tbConcepto").jqGrid('addRowData', result.d[i].IdGrupo, result.d[i]);
                    }
                }

            }, // ==============================================================================================================================
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                // ==============================================================================================================================
            }
        });
    }

}

function Modelo_ResumenConcepto_() {

    $("#tbConcepto").jqGrid({
        sortable: false,
        loadonce: true,
        loadui: 'disable',
        datatype: "local",
        height: '80',
        width: '445',
        sortname: 'vcGrupo01',
        sortorder: "asc",
        colNames: ['Concepto', 'Cantidad', 'Monto',''],
        colModel: [
            { name: 'vcGrupo01', index: 'vcGrupo01', width: 210, align: "left", resizable: true, sortable: true },
            {
                name: 'vcGrupo02', index: 'vcGrupo02', width: 100, align: "right", resizable: false, sortable: true, sorttype: 'number',
                formatter: 'number', formatoptions: { decimalSeparator: oCulturaUsuario.vcSimDec, thousandsSeparator: oCulturaUsuario.vcSimSepMil, decimalPlaces: 0 }
            },
            {
                name: '_vcGrupo03', index: '_vcGrupo03', width: 100, align: "right", resizable: false, sortable: true, sorttype: 'number',
                formatter: 'number', formatoptions: { decimalSeparator: oCulturaUsuario.vcSimDec, thousandsSeparator: oCulturaUsuario.vcSimSepMil, decimalPlaces: oCulturaUsuario.dcNumDec }
            },
            { name: 'vcGrupo04', index: 'vcGrupo04', width: 10, align: "left", resizable: false, sortable: true },
        ],
        viewrecords: true,
        shrinkToFit: true, // wa, corrección de diseño
        rownumbers: false,
        footerrow: true,
        forceFit: true,
        gridview: true,
        beforeSelectRow: function (rowid, e) {
        }
    });
}

function Grafico_Pie_Grupo_() {

    var p_vcNum = $("#hdfNumCel").val();
    var p_mesPer = $("#hdfPer").val();
    var p_codCue = $("#hdfCodCue").val();
    var p_codOpe = $("#hdfCodOpe").val();


    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "Con_Fac_ConsultaPrincipal.aspx/GraficoSuperior",
        data: "{'p_mesPer':'" + p_mesPer + "','p_vcNum':'" + p_vcNum + "','p_codCue':'" + p_codCue + "','p_codOpe':'" + p_codOpe + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var vcTotalGrupo = 0;
            var i;
            for (i = 0; i < $(result.d).length; i++) {
                //vcTotalGrupo = parseFloat(vcTotalGrupo) + parseFloat(DevuelveNumeroSinFormato2(result.d[i].vcGrupo03));
                vcTotalGrupo = parseFloat(vcTotalGrupo) + parseFloat(result.d[i].vcGrupo03);
            }
            if (parseFloat(vcTotalGrupo) != 0) {
                if ($(result.d).length > 0) {


                    var cadena = '';
                    cadena = cadena + '{"chart": {';
                    cadena = cadena + '"showYAxisValues": "0","showvalues": "1","showlegend": "0","caption": "","subCaption": "","xAxisName": "","yAxisName": "Costo","numberPrefix": "' + oCulturaUsuario.Moneda.vcSimMon + '",';
                    cadena = cadena + '"bgColor": "#ffffff", "showBorder": "0", "showCanvasBorder": "0", "usePlotGradientColor": "0", "plotBorderAlpha": "15","exportenabled" : "0","exportShowMenuItem":"0",';
                    cadena = cadena + '"placeValuesInside": "1", "showAxisLines": "1", "xAxisLineColor": "#A9A9A9", "yAxisLineColor": "#FFFFFF", "axisLineAlpha": "10","divLineIsDashed": "1",';
                    cadena = cadena + '"divLineAlpha": "30", "showAlternateVGridColor": "0", "captionFontSize": "14", "subcaptionFontSize": "14", "subcaptionFontBold": "0","numberscalevalue": "100,100,100",';
                    cadena = cadena + '"formatNumberScale": "0", "formatNumber": "1", "forceDecimals": "1", "decimals": "' + oCulturaUsuario.dcNumDec + '",';
                    cadena = cadena + '"decimalSeparator": "' + oCulturaUsuario.vcSimDec + '", "thousandSeparator": "' + oCulturaUsuario.vcSimSepMil + '"';
                    cadena = cadena + '';
                    cadena = cadena + ' }, "categories": [ {"category": [';
                    var i = 0;
                    for (i = 0; i < $(result.d).length; i++) {
                        var item = '{"label": "' + result.d[i].vcGrupo01 +'" }';
                        if (i + 1 != $(result.d).length) {
                            item = item + ',';
                        }
                        cadena = cadena + item;
                    }
                    cadena = cadena + '] } ] , "dataset": [ {"seriesname": "' + ($("#ddlGrupo1 option:selected").text() == "<Todos>" ? "Todos" : $("#ddlGrupo1 option:selected").text()) + '", "data": [';
                    for (i = 0; i < $(result.d).length; i++) {
                        var vcColor = '#EFC235';
                        var itemColor = vcColor;
                        item = '{"value": "' + result.d[i].vcGrupo03 + '", "label":"' + result.d[i].vcGrupo02 + '", "color": "' + itemColor + '",';
                        item = item + '"alpha":"25",';
                        item = item + '"tooltext":"Área: ' + result.d[i].vcGrupo02 + ', Costo: ' + oCulturaUsuario.Moneda.vcSimMon + FormatoNumero(result.d[i].vcGrupo03, oCulturaUsuario, false) + '" }';

                        if (i + 1 != $(result.d).length) {
                            item = item + ',';
                        }
                        cadena = cadena + item;
                    }
                    cadena = cadena + '] } ] }';


                    //var cadena2 = '';
                    //cadena2 = cadena2 + '{"chart":{';
                    //cadena2 = cadena2 + '"numberPrefix": "' + oCulturaUsuario.Moneda.vcSimMon + '",';
                    //cadena2 = cadena2 + '"showPercentValues": "1", "showPercentInTooltip": "0", "enableSmartLabels": "1", "enableMultiSlicing": "0", "decimals": "' + oCulturaUsuario.dcNumDec + '",';
                    //cadena2 = cadena2 + '"useroundedges": "0", "showvalues": "1", "showlabels": "0", "showLegend": "1", "labelDistance": "0", "slicingDistance": "15",';
                    //cadena2 = cadena2 + '"pieRadius": "50", "bgColor": "#ffffff", "showBorder": "0", "usePlotGradientColor": "0", "useDataPlotColorForLabels": "1"';
                    //cadena2 = cadena2 + '},"legendborderalpha": "0", "data": [';
                    //for (i = 0; i < $(result.d).length; i++) {
                    //    var item2 = '';
                    //    item2 = '{"label": "' + result.d[i].vcGrupo02 + '","color": "' + vcColor + '","alpha" : "' + window.top.Color_Alpha + '","value": "' + result.d[i].vcGrupo03 + ' ", "issliced" : "0" }';
                    //    if (i + 1 != $(result.d).length) {
                    //        item2 = item2 + ',';
                    //    }
                    //    cadena2 = cadena2 + item2;
                    //}
                    //cadena2 = cadena2 + '] }';

                    var myChart2 = new FusionCharts("../../../Common/Scripts/FusionCharts/bar2d.swf", "myChartId2" + Math.random(), Graficowidth + 39, Graficoheigth + 95);
                    myChart2.setJSONData(cadena);
                    myChart2.render("dvGrafPieLinea");
                }
                else {
                    $("#dvGrafPieLinea *").remove();
                    $("#dvGrafPieLinea").append('<div style="font-size:medium; color:Gray; width: 394px; height: 225px; border: 1px solid #a6c9e2;">No hay datos para mostrar.</div> ');
                }
            } else {
                $("#dvGrafPieLinea *").remove();
                $("#dvGrafPieLinea").append('<div style="font-size:medium; color:Gray; width: 394px; height: 225px; border: 1px solid #a6c9e2;">No hay datos para mostrar.</div> ');
            }
            Grafico_Historico_Linea_();
        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function Grafico_Pie_DetallexGrupo_(val, p_nomGrupo) {
    if (val == 'undefined') {
        val = -1;
    }
    var p_vcNum = $("#hdfNumCel").val();
    var p_mesPer = $("#hdfPer").val();
    var p_codCue = $("#hdfCodCue").val();
    var p_codOpe = $("#hdfCodOpe").val();

    if (val != 'undefined') {
        $.ajax({
            // ==============================================================================================================================
            type: "POST",
            url: "Con_Fac_ConsultaPrincipal.aspx/GraficoSuperiorxGrupo",
            data: "{'p_vcCriterio':'" + val + "', 'p_mesPer':'" + p_mesPer + "','p_vcNum':'" + p_vcNum + "','p_codCue':'" + p_codCue + "','p_codOpe':'" + p_codOpe +
                  "','p_inCodGrupo':'" + $("#hdfCodGrupo").val() + "','p_inCodConcepto':'" + $("#hdfCodConcepto").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var vcTotalGrupo = 0;
                var i;
                var cont_conceptos = 0;
                var dcValueOtros = 0.0;
                var item2 = '';

                for (i = 0; i < $(result.d).length; i++) {
                    //vcTotalGrupo = parseFloat(vcTotalGrupo) + parseFloat(DevuelveNumeroSinFormato2(result.d[i].vcGrupo03));
                    if (parseFloat(result.d[i].vcGrupo03) > 0) {
                        vcTotalGrupo = parseFloat(vcTotalGrupo) + parseFloat(result.d[i].vcGrupo03);
                    }
                }

                // ==============================================================================================================================
                if (parseFloat(vcTotalGrupo) != 0) {
                    if ($(result.d).length > 0) {


                        var cadena = '';
                        cadena = cadena + '{"chart": {';
                        cadena = cadena + '"showYAxisValues": "0","showvalues": "1","showlegend": "0","caption": "","subCaption": "","xAxisName": "","yAxisName": "Costo","numberPrefix": "' + oCulturaUsuario.Moneda.vcSimMon + '",';
                        cadena = cadena + '"bgColor": "#ffffff", "showBorder": "0", "showCanvasBorder": "0", "usePlotGradientColor": "0", "plotBorderAlpha": "15","exportenabled" : "0","exportShowMenuItem":"0",';
                        cadena = cadena + '"placeValuesInside": "1", "showAxisLines": "1", "xAxisLineColor": "#A9A9A9", "yAxisLineColor": "#FFFFFF", "axisLineAlpha": "10","divLineIsDashed": "1",';
                        cadena = cadena + '"divLineAlpha": "30", "showAlternateVGridColor": "0", "captionFontSize": "14", "subcaptionFontSize": "14", "subcaptionFontBold": "0","numberscalevalue": "100,100,100",';
                        cadena = cadena + '"formatNumberScale": "0", "formatNumber": "1", "forceDecimals": "1", "decimals": "' + oCulturaUsuario.dcNumDec + '",';
                        cadena = cadena + '"decimalSeparator": "' + oCulturaUsuario.vcSimDec + '", "thousandSeparator": "' + oCulturaUsuario.vcSimSepMil + '"';
                        cadena = cadena + '';
                        cadena = cadena + ' }, "categories": [ {"category": [';
                        var i = 0;
                        for (i = 0; i < $(result.d).length; i++) {
                            var item = '{"label": "' + result.d[i].vcGrupo01 + '" }';
                            if (i + 1 != $(result.d).length) {
                                item = item + ',';
                            }
                            cadena = cadena + item;
                        }
                        cadena = cadena + '] } ] , "dataset": [ {"seriesname": "' + ($("#ddlGrupo1 option:selected").text() == "<Todos>" ? "Todos" : $("#ddlGrupo1 option:selected").text()) + '", "data": [';
                        for (i = 0; i < $(result.d).length; i++) {
                            if (i > 9) {
                                break;
                            }
                            var vcColor = '#EFC235';
                            var itemColor = vcColor;
                            item = '{"value": "' + DevuelveNumeroSinFormato(result.d[i].vcGrupo03, oCulturaUsuario, false) + '", "label":"' + result.d[i].vcGrupo02 + '", "color": "' + itemColor + '",';
                            item = item + '"alpha":"25",';
                            item = item + '"tooltext":"Área: ' + result.d[i].vcGrupo02 + ', Costo: ' + oCulturaUsuario.Moneda.vcSimMon + FormatoNumero(result.d[i].vcGrupo03, oCulturaUsuario, false) + '" }';

                            if (i + 1 != $(result.d).length && (i < 9)) {
                                item = item + ',';
                            }
                            cadena = cadena + item;
                        }
                        cadena = cadena + '] } ] }';
                         
                       
                        //var cadena2 = '';
                        //cadena2 = cadena2 + '{"chart":{';
                        //cadena2 = cadena2 + '"numberPrefix": "' + oCulturaUsuario.Moneda.vcSimMon + '",';
                        //cadena2 = cadena2 + '"showPercentValues": "1", "showPercentInTooltip": "0", "enableSmartLabels": "1", "enableMultiSlicing": "0", "decimals": "' + oCulturaUsuario.dcNumDec + '",';
                        //cadena2 = cadena2 + '"useroundedges": "0", "showvalues": "1", "showlabels": "0", "showLegend": "1", "labelDistance": "0", "slicingDistance": "15",';
                        //cadena2 = cadena2 + '"pieRadius": "50", "bgColor": "#ffffff", "showBorder": "0", "usePlotGradientColor": "0", "useDataPlotColorForLabels": "1"';
                        //cadena2 = cadena2 + '},"legendborderalpha": "0", "data": [';

                        //cont_conceptos = $(result.d).length;
                        //for (i = 0; i < $(result.d).length; i++) {
                        //    if (parseFloat(result.d[i].vcGrupo03) < 0) {
                        //        continue;
                        //    }
                        //    var vcColor = '';
                        //    if (i < 9) {
                        //        if (parseFloat(result.d[i].vcGrupo03) > 0) {
                        //            var Valor = result.d[i].vcGrupo03; //El dato viene formateado con la cultura configurada desde el servidor.
                        //            var TextoFiltro = "\\" + oCulturaUsuario.vcSimSepMil;
                        //            if (Valor.indexOf(oCulturaUsuario.vcSimSepMil) >= 0) {
                        //                Valor = Valor.replace(new RegExp(TextoFiltro, 'g'), '');
                        //            }
                        //            item2 = '{"label": "' + result.d[i].vcGrupo02 + '","color": "' + vcColor + '","alpha" : "' + window.top.Color_Alpha + '","value": "' + Valor + ' ", "issliced" : "0" }';
                        //            cadena2 = cadena2 + item2 + ',';
                        //        }
                        //    }
                        //    else {
                        //        dcValueOtros += parseFloat(result.d[i].vcGrupo03);
                        //    }
                        //}

                        //if (dcValueOtros > 0) {
                        //    item2 = '{"label": "Otros","color": "' + vcGrupo11 + '","alpha" : "' + window.top.Color_Alpha + '","value": "' + dcValueOtros + ' ", "issliced" : "0" }';
                        //    cadena2 = cadena2 + item2 + ',';
                        //}

                        //cadena2 = cadena2.substr(0, cadena2.length - 1) + '] }';

                        //Edgar Garcia- agrege +10
                        var myChart2 = new FusionCharts("../../../Common/Scripts/FusionCharts/bar2d.swf",
                                                        "myChartId5" + Math.random(), Graficowidth + 39, Graficoheigth + 95 - 10 - 50 + 10);
                        myChart2.setJSONData(cadena);
                        myChart2.render("dvGrafPieLinea");

                    } else {
                        $("#dvGrafPieLinea *").remove();
                        $("#dvGrafPieLinea").append('<div style="font-size:medium; color:Gray; width: 394px; height: 225px; border: 1px solid #a6c9e2;">No hay datos para mostrar.</div>');
                    }
                } else {
                    $("#dvGrafPieLinea *").remove();
                    $("#dvGrafPieLinea").append('<div style="font-size:medium; color:Gray; width: 394px; height: 225px; border: 1px solid #a6c9e2;">No hay datos para mostrar.</div> ');
                }

            }, // ==============================================================================================================================
            error: function (xhr, err, thrErr) {
                // ==============================================================================================================================
                MostrarErrorAjax(xhr, err, thrErr);
                // ==============================================================================================================================
            }
        });
    } else {
        Grafico_Pie_Grupo_();
    }
}

function Grafico_Historico_Linea_() {
    //debugger;
    var p_mesPer = $("#hdfPer").val();
    var p_codOpe = $("#hdfCodOpe").val();
    var p_codCue = $("#hdfCodCue").val();
    var p_vcNum = $("#hdfNumCel").val();
    var p_vcMes = $("#hfdMesPer").val();

    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "Con_Fac_ConsultaPrincipal.aspx/Grafico_Historico_Linea",
        data: "{'p_criterio':'0', 'p_mesPer':'" + p_mesPer +
            "','p_codOpe':'" + p_codOpe +
            "','p_codCue':'" + p_codCue +
            "','p_vcNum':'" + p_vcNum +
            "','p_vcMes': '" + p_vcMes +
            "','p_inCodGrupo':'" + $("#hdfCodGrupo").val() +
            "','p_inCodConcepto':'" + $("#hdfCodConcepto").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {


            // ==============================================================================================================================
            var i;
            var vcTotalGrupo = 0;
            var inTotalNeg = 0;
            for (i = 0; i < $(result.d).length; i++) {
                //vcTotalGrupo = parseFloat(vcTotalGrupo) + parseFloat(ParseFloatMultiPais(result.d[i].vcGrupo03, oCulturaUsuario));
                vcTotalGrupo = parseFloat(vcTotalGrupo) + parseFloat(result.d[i].vcGrupo03);
                //if (parseFloat(DevuelveNumeroSinFormato2(result.d[i].vcGrupo03, oCulturaUsuario, false)) < 0) {
                if (parseFloat(result.d[i].vcGrupo03) < 0) {
                    inTotalNeg++;
                }
            }
            var flagPreNeg = false;
            if ($(result.d).length == inTotalNeg) {
                flagPreNeg = true;
            }

            if (parseFloat(vcTotalGrupo) != 0) {
                if ($(result.d).length > 0) {
                    var jsonData = {};
                    jsonData.chart = {};
                    jsonData.chart.anchorBorderThickness = "1";
                    jsonData.chart.anchorRadius = "12";
                    //jsonData.chart.animation = "0";
                    //jsonData.chart.axisLineAlpha = "0";
                    jsonData.chart.bgColor = "#ffffff";
                    jsonData.chart.canvasbasecolor = "#CCCCCC";
                    jsonData.chart.canvasBgColor = "#ffffff";
                    jsonData.chart.caption = "";
                    jsonData.chart.decimals = oCulturaUsuario.dcNumDec;
                    jsonData.chart.decimalseparator = oCulturaUsuario.vcSimDec;
                    //jsonData.chart.divlineColor = "#999999";
                    //jsonData.chart.divLineDashed = "0";
                    //jsonData.chart.divLineDashLen = "1";
                    //jsonData.chart.divLineIsDashed = "1";
                    //jsonData.chart.divLineGapLen = "1";
                    jsonData.chart.divlineThickness = "0";
                    jsonData.chart.drawAnchors = "1";
                    jsonData.chart.forcedecimals = "1";
                    jsonData.chart.formatnumberscale = "0";
                    //jsonData.chart.labeldisplay = "0";
                    //jsonData.chart.legendItemFontColor = "#666666";
                    //jsonData.chart.legendItemFontSize = "10";
                    //jsonData.chart.legendShadow = "0";
                    //jsonData.chart.maxColWidth = "35";
                    jsonData.chart.maxLabelWidthPercent = "30";
                    jsonData.chart.numberprefix = oCulturaUsuario.Moneda.vcSimMon;
                    //jsonData.chart.palette = "1";
                    jsonData.chart.paletteColors = "#01B8AA";
                    jsonData.chart.placeValuesInside = "1";
                    jsonData.chart.rotateValues = "1";
                    //jsonData.chart.plotBorderAlpha = "25";
                    jsonData.chart.pyaxisname = "Costo";
                    jsonData.chart.sdecimals = "0";
                    jsonData.chart.seriesnameintooltip = "1";
                    jsonData.chart.slantlabels = "1";
                    jsonData.chart.showAlternateHGridColor = "0";
                    jsonData.chart.showAxisLines = "0";
                    jsonData.chart.showXAxisLine = "1";
                    //jsonData.chart.showYAxisValues = "1";
                    jsonData.chart.showborder = "0";
                    //jsonData.chart.showCanvasBorder = "0";
                    jsonData.chart.showlegend = "0";
                    jsonData.chart.showplotborder = "0";
                    jsonData.chart.showShadow = "0";
                    jsonData.chart.showvalues = "0";
                    jsonData.chart.syaxisname = "Líneas";
                    jsonData.chart.thousandseparator = oCulturaUsuario.vcSimSepMil;
                    jsonData.chart.usePlotGradientColor = "0";
                    //jsonData.chart.xaxisname = "";
                    jsonData.chart.xAxisLineColor = "#A9A9A9";
                    jsonData.chart.xAxisLineThickness = "1";
                    jsonData.chart.yAxisLineColor = "#FFFFFF";
                    

                    jsonData.categories = [];
                    jsonData.categories[0] = {};
                    jsonData.categories[0].category = [];
                    jsonData.dataset = [];
                    jsonData.dataset[0] = {};
                    jsonData.dataset[0].seriesname = "Costo";
                    jsonData.dataset[0].data = [];
                    //jsonData.dataset[1] = {};
                    //jsonData.dataset[1].seriesname = "Costo";
                    //jsonData.dataset[1].data = [];
                    //jsonData.dataset[1].renderas = "line";
                    //jsonData.dataset[1].alpha = "0";
                    //jsonData.dataset[1].color = "#B2B6B9";

                    var item1 = {};
                    for (i = 0; i < $(result.d).length; i++) {

                        item1 = {};
                        item1.label = result.d[i].vcGrupo05.substring(0);
                        jsonData.categories[0].category.push(item1);
                    }

                    for (i = 0; i < $(result.d).length; i++) {
                        var vcColor = vcGrupo01;

                        var img = "";
                        if (i > 0 && parseFloat(result.d[i - 1].vcGrupo03) > 0) {
                            if (parseFloat(result.d[i].vcGrupo03) > parseFloat(result.d[i - 1].vcGrupo03)) {
                                img = "../../DashBoard/images/sube.png";
                            }
                            else if (parseFloat(result.d[i].vcGrupo03) < parseFloat(result.d[i - 1].vcGrupo03)) {
                                img = "../../DashBoard/images/baja.png";
                            }
                            else {
                                img = "../../DashBoard/images/igual.png";
                            }
                        }

                        item1 = {};
                        item1.color = vcColor;
                        item1.alpha = window.top.Color_Alpha;
                        item1.value = parseFloat(result.d[i].vcGrupo03);
                        jsonData.dataset[0].data.push(item1);

                        itemIndicadores = {};
                        itemIndicadores.color = vcColor;
                        itemIndicadores.alpha = '0';
                        itemIndicadores.value = result.d[i].vcGrupo03;
                        itemIndicadores.drawAnchors = img == '' ? '0' : '1';
                        itemIndicadores.anchorImageUrl = img;
                        //jsonData.dataset[1].data.push(itemIndicadores);
                    }
                    //var myChart = new FusionCharts("../../../Common/Scripts/FusionCharts/MSCombi2D.swf", "myChartId" + Math.random(), Graficowidth + 39, Graficoheigth + 75 + 10 - 30, '0');
                    var myChart = new FusionCharts("MSCombi2D.swf", "myChartId" + Math.random(), Graficowidth + 39, Graficoheigth + 75 + 10 - 30, '0');
                    myChart.setJSONData(jsonData);

                    //alert('y');

                    myChart.render("dvGrafHisLinea");
                    $("#dvGrafHisLinea").css("margin-top", "15px");

                } else {
                    $("#dvGrafHisLinea *").remove();
                    $("#dvGrafHisLinea").append('<div style="font-size:medium; color:Gray; width: 394px; height: 205px; border: 1px solid #a6c9e2;">No hay datos para mostrar.</div>');
                }
            } else {
                $("#dvGrafHisLinea *").remove();
                $("#dvGrafHisLinea").append('<div style="font-size:medium; color:Gray; width: 394px; height: 205px; border: 1px solid #a6c9e2;">No hay datos para mostrar.</div> ');
            }
        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function Grafico_Historico_Linea_x_Grupo_(p_criterio, p_nomGrupo) {
    //debugger;
    var p_mesPer = $("#hdfPer").val();
    var p_codOpe = $("#hdfCodOpe").val();
    var p_codCue = $("#hdfCodCue").val();
    var p_vcNum = $("#hdfNumCel").val();
    var p_vcMes = $("#hfdMesPer").val();

    //if ($("#hdfCodGrupo").val() == "") {
    if (p_criterio != "") {
        $("#hdfCodGrupo").val((p_criterio == 'undefined' ? '-1' : p_criterio));
    }
    //}


    if (p_criterio != 'undefined') {

        $.ajax({
            // ==============================================================================================================================
            type: "POST",
            url: "Con_Fac_ConsultaPrincipal.aspx/Grafico_Historico_Linea",
            data: "{'p_criterio': '" + p_criterio + "', 'p_mesPer':'" + p_mesPer +
                "','p_codOpe':'" + p_codOpe +
                "','p_codCue':'" + p_codCue +
                "','p_vcNum':'" + p_vcNum +
                "','p_vcMes': '" + p_vcMes +
                "','p_inCodGrupo':'" + $("#hdfCodGrupo").val() +
                "','p_inCodConcepto':'" + $("#hdfCodConcepto").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                // ==============================================================================================================================
                var vcTotalGrupo = 0;
                var inTotalNeg = 0;
                var i;
                for (i = 0; i < $(result.d).length; i++) {
                    vcTotalGrupo = parseFloat(vcTotalGrupo) + parseFloat(DevuelveNumeroSinFormato2(result.d[i].vcGrupo03));
                    if (parseFloat(DevuelveNumeroSinFormato2(result.d[i].vcGrupo03, oCulturaUsuario, false)) <= 0) {
                        inTotalNeg++;
                    }
                }
                var flagPreNeg = false;
                if ($(result.d).length == inTotalNeg) {
                    flagPreNeg = true;
                }

                var p = ',"drawAnchors":"1","anchorRadius":"12","anchorBorderThickness":"1","divlineThickness":"0","divLineDashed":"0"';
                if (parseFloat(vcTotalGrupo) != 0) {
                    if ($(result.d).length > 0) {
                        var cadena = '{"chart": {"caption": "","xaxisname": "","pyaxisname": "Costo", "syaxisname": "Líneas",';
                        cadena = cadena + '"bgColor": "#ffffff","showCanvasBorder":"0","canvasBgColor": "#ffffff","plotBorderAlpha": "25","showlegend": "0","showAlternateHGridColor": "0","usePlotGradientColor": "0",';
                        cadena = cadena + '"showAxisLines": "1","xAxisLineColor": "#A9A9A9","yAxisLineColor": "#FFFFFF","axisLineAlpha": "10","divlineColor": "#999999","divLineIsDashed": "1",';
                        cadena = cadena + '"divLineDashLen": "0","divLineGapLen": "0",';
                        cadena = cadena + '"labeldisplay": "0","slantlabels": "1", "maxColWidth": "35", ' +
                            '"palette": "1","animation": "0","formatnumberscale": "0","showvalues": "0", "seriesnameintooltip": "1", ' +
                            '"thousandseparator": "' + oCulturaUsuario.vcSimSepMil + '", "sdecimals": "0", "decimals": "' + oCulturaUsuario.dcNumDec + '", "decimalseparator": "' + oCulturaUsuario.vcSimDec + '", "forcedecimals": "1",' +
                            '"showborder": "0", "canvasbasecolor": "#CCCCCC", "numberprefix":"' + oCulturaUsuario.Moneda.vcSimMon + '"' + p + ' }, "categories": [{"category": [';

                        for (i = 0; i < $(result.d).length; i++) {
                            var item = '{"label": "' + result.d[i].vcGrupo05.substring(0) + '"}';
                            if (i + 1 != $(result.d).length) {
                                item = item + ',';
                            }
                            cadena = cadena + item;
                        }
                        cadena = cadena + '] } ] , "dataset": [ { "seriesname": "Costo", "data": [';
                        var cadenaIndicadores = ',{ "seriesname": "Costo", "data": [';

                        for (i = 0; i < $(result.d).length; i++) {
                            var vcColor = vcGrupo01;
                            //if (i === 0) { vcColor = vcGrupo01; }
                            //if (i == 1) { vcColor = vcGrupo02; }
                            //if (i == 2) { vcColor = vcGrupo03; }
                            //if (i == 3) { vcColor = vcGrupo04; }
                            //if (i == 4) { vcColor = vcGrupo05; }
                            //if (i == 5) { vcColor = vcGrupo06; }
                            //if (i == 6) { vcColor = vcGrupo07; }
                            //if (i == 7) { vcColor = vcGrupo08; }
                            //if (i == 8) { vcColor = vcGrupo09; }
                            //if (i == 9) { vcColor = vcGrupo10; }
                            //if (i == 10) { vcColor = vcGrupo11; }
                            //if (i == 11) { vcColor = vcGrupo12; }
                            //if (i == 12) { vcColor = vcGrupo13; }
                            //if (i == 13) { vcColor = vcGrupo14; }
                            //if (i == 14) { vcColor = vcGrupo15; }
                            //if (i == 15) { vcColor = vcGrupo16; }
                            //if (i == 16) { vcColor = vcGrupo17; }
                            //if (i == 17) { vcColor = vcGrupo18; }
                            //if (i == 18) { vcColor = vcGrupo19; }
                            //if (i == 19) { vcColor = vcGrupo20; }

                            var item = '{"color": "' + vcColor + '","alpha":"' + window.top.Color_Alpha + '","value": "' + result.d[i].vcGrupo03 + '"}';

                            var itemIndicadores = '{"color": "' + vcColor + '","alpha":"' + window.top.Color_Alpha + '","value": "' + result.d[i].vcGrupo03 + '"';
                            if (i > 0 && parseFloat(result.d[i - 1].vcGrupo03) > 0) {
                                if (parseFloat(result.d[i].vcGrupo03) > parseFloat(result.d[i - 1].vcGrupo03)) {
                                    itemIndicadores += ',"anchorImageUrl":"../../DashBoard/images/sube.png"';
                                }
                                else if (parseFloat(result.d[i].vcGrupo03) < parseFloat(result.d[i - 1].vcGrupo03)) {
                                    itemIndicadores += ',"anchorImageUrl":"../../DashBoard/images/baja.png"';
                                }
                                else {
                                    itemIndicadores += ',"anchorImageUrl":"../../DashBoard/images/igual.png"';
                                }
                            }
                            itemIndicadores += '}';
                            if (i + 1 != $(result.d).length) {
                                item = item + ',';
                                itemIndicadores += ',';
                            }
                            cadena = cadena + item;
                            cadenaIndicadores += itemIndicadores;
                        }
                        cadena = cadena + ']}';
                        cadena = cadena + cadenaIndicadores + '],"renderas":"line","alpha":"0","color":"#B2B6B9"}';
                        cadena = cadena + ']}';
                        //debugger;
                        var myChart = new FusionCharts("../../../Common/Scripts/FusionCharts/mscombi2d.swf", "myChartId4" + Math.random(), Graficowidth + 39, Graficoheigth + 75);
                        //alert('x');
                        myChart.setJSONData(cadena);
                        myChart.render("dvGrafHisLinea");

                    } else {
                        $("#dvGrafHisLinea *").remove();
                        //$("#dvGrafHisLinea").append('<div style="font-size:medium; color:Gray; width: 300px; height: 180px; border: 1px solid #a6c9e2;">No hay datos para mostrar.</div> ');
                        $("#dvGrafHisLinea").append('<div style="font-size:medium; color:Gray; width: 394px; height: 205px; border: 1px solid #a6c9e2;">No hay datos para mostrar.</div> ');
                    }
                } else {
                    $("#dvGrafHisLinea *").remove();
                    $("#dvGrafHisLinea").append('<div style="font-size:medium; color:Gray; width: 394px; height: 205px; border: 1px solid #a6c9e2;">No hay datos para mostrar.</div> ');
                }

            }, // ==============================================================================================================================
            error: function (xhr, err, thrErr) {
                // ==============================================================================================================================
                MostrarErrorAjax(xhr, err, thrErr);
                // ==============================================================================================================================
            }
        });
    } else {
        Grafico_Historico_Linea_();
    }

}
