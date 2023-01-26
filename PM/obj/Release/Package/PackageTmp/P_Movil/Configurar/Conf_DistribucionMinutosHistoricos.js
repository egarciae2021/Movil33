//#region Variables Globales
//var tbGridCreacion_Cuentas = true;
//var tbGridCreacion_Orga = true;

var vcNomCuenta = '';
var flagFiltro = true;

////  GRILLA PERIODO
//var WithPeriodo = 880;
//var HeigthPeriodo = 350;
////  GRAFICO
//var WithGrafico = 900;
//var HeigthGrafico = 140;

//var oDatosGrafico;
var oCulturaLocal = window.parent.parent.oCulturaUsuario;

var CuentaSeleccionada = '';
var TipDisSelect = '';
var vCriterio = 'c';
//#endregion

//// GRAFICO
//function Lista_Grafico() {
//
//    $(window).resize(function () {
//        DimPosElementos();
//    });
//
//    var ColModel2 = [];
//    var ColModel_Orga = [];
//    var data = {
//        p_vcCriterio: vCriterio == 'c' ? '' : $("#txtLinea").val(),
//        p_idCuenta: vCriterio == 'l' ? '' : $("#ddlCuenta").val(),
//        p_vcCodInt2: '',
//        p_SinEmpleado: '',
//        p_inMeses: $("#ddlNumeroMeses").val(),
//        p_inTipDis: $("#ddlTipDis").val()
//    }
//    $.ajax({
//        type: "POST",
//        url: "Conf_DistribucionMinutosHistoricos.aspx/Listar_Reporte",
//        data: JSON.stringify(data),
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            var oDatosGrafico = result.d[0];
//            var oDatos = result.d[1];
//            var oDatosGrafico_Orga = result.d[2];
//            var oDatos_Orga = result.d[3];
//            var oDatosGraficoNuevo = result.d[4];
//
//            if ($(oDatosGrafico).length > 0) {
//                $("#dvEmptyHistorico").hide();
//                $("#dvEmptyOrga").hide();
//                if (flagFiltro) {
//                    $("#ddlCuenta").html("");
//                }
//
//                //$("#ddlNumeroMeses").html("");
                //for (var i = 1; i < ($(oDatosGrafico).length); i++) {
                //    $("#ddlNumeroMeses").append($("<option></option>").attr("value", i).text(i));
                //}
//                var inMeses = oDatosGrafico.length;
//                //if (inMeses > 6) inMeses = 6;
                //if (inMeses <= 6) inMeses = inMeses;
                //$("#ddlNumeroMeses").val(inMeses);
//
//                //var inMeses = $("#ddlNumeroMeses").val();
//                //Generar_Grafico(inMeses, $(oDatosGrafico), oDatosGrafico);
//                Generar_Grafico(oDatosGraficoNuevo.length, $(oDatosGrafico), oDatosGraficoNuevo); //nuevo
//
//                // COLUMNAS CUENTA BOLSA
//                var vcPeriodo = '';
//                for (var i = 0; i < (inMeses); i++) {
//                    if (i == 0) {
//                        ColModel2.push({
//                            label: 'Cuenta Bolsa',
//                            name: 'vcNombre',
//                            index: 'vcNombre',
//                            hidden: false,
//                            align: 'left',
//                            width: '300',
//                            search: false,
//                            sortable: false
//                        });
//                        vcPeriodo = oDatosGrafico[i].vcPeriodo;
//                        ColModel2.push({
//                            label: FormatoMesPeriodo(oDatosGrafico[i].vcPeriodo),
//                            name: oDatosGrafico[i].vcPeriodo,
//                            index: oDatosGrafico[i].vcPeriodo,
//                            hidden: false,
//                            align: 'right',
//                            width: '85',
//                            search: false,
//                            sortable: false,
//                            formatter: function (value_, options_, rData_) {
//                                value_ = (value_ == null ? 0 : value_);
//                                return FormatoNumero(value_, oCulturaLocal, true);
//                            }
//                        });
//                    } else {
//                        if (vcPeriodo != oDatosGrafico[i].vcPeriodo) {
//                            vcPeriodo = oDatosGrafico[i].vcPeriodo;
//                            ColModel2.push({
//                                label: FormatoMesPeriodo(oDatosGrafico[i].vcPeriodo),
//                                name: oDatosGrafico[i].vcPeriodo,
//                                index: oDatosGrafico[i].vcPeriodo,
//                                hidden: false,
//                                align: 'right', width: '85', search: false,
//                                sortable: false,
//                                formatter: function (value, options, rData) {
//                                    value = (value == null ? 0 : value);
//                                    return FormatoNumero(value, oCulturaLocal, true);
//                                }
//                            });
//                        }
//                    }
//                }
//
//                // COLUMNAS ORGANIZACION
//                vcPeriodo = '';
//                var ii = 0;
//                for (var i = 0; i < ($(oDatosGrafico_Orga).length); i++) {
//                    if (i == 0) {
//                        ColModel_Orga.push({
//                            label: 'Organizaciónes',
//                            name: 'vcNombre',
//                            index: 'vcNombre',
//                            hidden: false,
//                            align: 'left',
//                            width: '300',
//                            search: false,
//                            sortable: false
//                        });
//                        vcPeriodo = oDatosGrafico_Orga[i].vcPeriodo;
//                        ColModel_Orga.push({
//                            label: FormatoMesPeriodo(oDatosGrafico_Orga[i].vcPeriodo),
//                            name: oDatosGrafico_Orga[i].vcPeriodo,
//                            index: oDatosGrafico_Orga[i].vcPeriodo,
//                            hidden: false,
//                            align: 'right',
//                            width: '85',
//                            search: false,
//                            sortable: false,
//                            formatter: fnFormatoColModel
//                        });
//                    } else {
//                        if (vcPeriodo != oDatosGrafico_Orga[i].vcPeriodo) {
//                            if (ii < inMeses - 1) {
//                                ii += 1;
//                                vcPeriodo = oDatosGrafico_Orga[i].vcPeriodo;
//                                ColModel_Orga.push({
//                                    label: FormatoMesPeriodo(oDatosGrafico_Orga[i].vcPeriodo),
//                                    name: oDatosGrafico_Orga[i].vcPeriodo,
//                                    index: oDatosGrafico_Orga[i].vcPeriodo,
//                                    hidden: false,
//                                    align: 'right',
//                                    width: '85',
//                                    search: false,
//                                    sortable: false,
//                                    formatter: function (value, options, rData) {
//                                        value = (value == null ? 0 : value);
//                                        return FormatoNumero(value, oCulturaLocal, true);
//                                    }
//                                });
//                            }
//                        }
//                    }
//                }
//
//                //grilla cuetnas
//                var Ancho = $(window).width();
//                try {
//                    if (!tbGridCreacion_Cuentas) {
//                        $("#tbHistorico").GridUnload();
//                    } else {
//                        tbGridCreacion_Cuentas = false;
//                    }
//                    var tbHistorico = $("#tbHistorico").jqGrid({
//                        datatype: "local",
//                        colModel: ColModel2,
//                        caption: "Distribución de " + CuentaSeleccionada,
//                        //sortname: "IdGrupo", //Default SortColumn
                        //sortorder: "asc", //Default SortOrder.
                        //caption: "Distribución Cuenta Bolsa",
//                        width: Ancho - 55,
//                        height: 95,
//                        emptyrecords: 'No hay resultados',
//                        shrinkToFit: false,
//                        rownumbers: true,
//                        beforeSelectRow: function () {
//                            return false;
//                        },
//                        gridComplete: function () {
//                            // $(".btnNormal").button();
//                        }
//                    });
//                    $("#tbHistorico").closest(".ui-jqgrid").find(".ui-jqgrid-titlebar>.ui-jqgrid-titlebar-close>.ui-icon-circle-triangle-n").removeClass("ui-icon ui-icon-circle-triangle-n");
//                } catch (e) {
//                    alerta(e);
//                }
//
//                //grilla organizacion
//                try {
//                    if (!tbGridCreacion_Orga) {
//                        $("#tbOrga").GridUnload();
//                    } else {
//                        tbGridCreacion_Orga = false;
//                    }
//                    var tbOrga = $("#tbOrga").jqGrid({
//                        datatype: "local",
//                        colModel: ColModel_Orga,
//                        //caption: "Distribución por Organización de " + CuentaSeleccionada,
//                        caption: "Distribución por " + TipDisSelect + " de " + CuentaSeleccionada,
//                        //sortname: "IdGrupo", //Default SortColumn
                        //sortorder: "asc", //Default SortOrder.
                        //caption: "Distribución Organización",
//                        width: Ancho - 55,
//                        height: 125,
//                        emptyrecords: 'No hay resultados',
//                        shrinkToFit: false,
//                        rownumbers: true,
//                        beforeSelectRow: function () {
//                            return false;
//                        },
//                        gridComplete: function () {
//                            // $(".btnNormal").button();
//                        }
//                    });
//                    $("#tbOrga").closest(".ui-jqgrid").find(".ui-jqgrid-titlebar>.ui-jqgrid-titlebar-close>.ui-icon-circle-triangle-n").removeClass("ui-icon ui-icon-circle-triangle-n");
//                } catch (e) {
//                    alerta(e);
//                }
//
//                // DATOS
//                var vcPeriodo_Ant = '';
//                var vcPeriodo_Nue = '';
//
//                //var oDatos = result.d;
//                if (flagFiltro) {
//                    $("#ddlCuenta").append($("<option></option>").attr("value", "").text("< Todos >"));
//                }
//
//                var vcCuenta = '';
//
//                for (var i = 0; i < $(oDatos).length; i++) {
//
//                    if (i == 0)
//                        vcCuenta = oDatos[i].Cuenta.vcNom;
//
//                    //var vcCuenta = oDatos[i].Cuenta.vcNom; 
                    //var vcPeriodo = oDatos[i].vcPeriodo;
//                    if (vcCuenta != oDatos[i].Cuenta.vcNom || i == 0) {
//
//                        vcCuenta = oDatos[i].Cuenta.vcNom;
//
//                        var oNuevaFila = '[{"vcNombre": "' + vcCuenta + '",';
//
//                        //alert(vcCuenta+' - '+vcPeriodo);
//
//                        for (var count = 0; count < $(oDatosGrafico).length; count++) {
//                            var inVAlor = 0;
//
//                            // CUENTA y PERIODO
//                            var p_vcNom = oDatosGrafico[count].Cuenta.vcNom;
//                            var p_vcPer = oDatosGrafico[count].vcPeriodo;
//
//                            // lo encontro
//                            if (p_vcNom == vcCuenta) {
//                                // VALOR
//                                inVAlor = (p_vcNom == vcCuenta ? oDatosGrafico[count].Cuenta.dcMon : -1);
//
//                                // NUEVA FILA
//                                oNuevaFila = oNuevaFila + '"' + p_vcPer + '": "' + inVAlor + '",';
//                            }
//                        }
//
//                        oNuevaFila = oNuevaFila + '}]';
//                        oNuevaFila = oNuevaFila.replace(',}]', '}]');
//                        if (flagFiltro) {
//                            //alert("agregado a ddlcuenta: " + oDatos[i].Cuenta.P_vcCod + " - " + vcCuenta);
//                            $("#ddlCuenta").append($("<option></option>").attr("value", oDatos[i].Cuenta.P_vcCod).text(vcCuenta));
//                        }
//
//                        //alert(oNuevaFila);
//                        $("#tbHistorico").jqGrid('addRowData', vcCuenta, JSON.parse(oNuevaFila));
//                    }
//                }
//
//                // ========================================================================================================================
                // DATOS
                // ========================================================================================================================
//
//                vcPeriodo_Ant = '';
//                vcPeriodo_Nue = '';
//
//                vcCuenta = '';
//                var contador = 0;
//
//                for (var i = 0; i < $(oDatos_Orga).length; i++) {
//
//                    if (i == 0)
//                        vcCuenta = oDatos_Orga[i].Cuenta.vcNom;
//
//                    if (vcCuenta != oDatos_Orga[i].Cuenta.vcNom || i == 0) {
//
//                        vcCuenta = oDatos_Orga[i].Cuenta.vcNom;
//
//                        var oNuevaFila = '[{"vcNombre": "' + vcCuenta + '",';
//
//                        //alert(vcCuenta+' - '+vcPeriodo);
//
//                        for (var count = 0; count < $(oDatosGrafico_Orga).length; count++) {
//                            var inVAlor_ = -2;
//
//                            // CUENTA y PERIODO
//                            var p_vcNom_ = oDatosGrafico_Orga[count].Cuenta.vcNom;
//                            var p_vcPer_ = oDatosGrafico_Orga[count].vcPeriodo;
//
//                            // lo encontro
//                            if (p_vcNom_ == vcCuenta) {
//                                //contador+=1;
                                // VALOR
//                                inVAlor_ = oDatosGrafico_Orga[count].Cuenta.dcMon;
//
//                                // NUEVA FILA
//                                oNuevaFila = oNuevaFila + '"' + p_vcPer_ + '": "' + inVAlor_ + '",';
//                            }
//
//
//
//                        }
//
//                        oNuevaFila = oNuevaFila + '}]';
//                        oNuevaFila = oNuevaFila.replace(',}]', '}]');
//
//                        //alert(oNuevaFila);
//                        $("#tbOrga").jqGrid('addRowData', vcCuenta, JSON.parse(oNuevaFila));
//                    }
//                }
//            } else {
//                $("#Div11").html('No hay datos disponibles...');
//                $("#Div11").css("font-size", "medium").css("color", "Gray");
//                $(".ui-jqgrid-bdiv").hide();
//                $("#dvEmptyHistorico").show();
//                $("#dvEmptyOrga").show();
//            }
//        },
//        error: function (xhr, err, thrErr) {
//            // ========================================================================
//            MostrarErrorAjax(xhr, err, thrErr);
//            // ========================================================================
//        }
//
//    });
//    
//
//};

//function Generar_Grafico(nMeses,oDatos,result){
//    
//        var cadena = '{' +
//                            ' "chart": {"formatNumberScale":"0",' +
//                                '"palette":"2","showvalues": "1","numvdivlines": "10","divlinealpha": "30","drawanchors": "0","labelpadding": "10",' +
//                                ' "yaxisvaluespadding": "10","useroundedges": "1","legendborderalpha": "0","showborder": "1","legendshadow": "1","showLegend":"1" ,"legendPosition":"RIGHT"},' +
//                            ' "categories" : [ {  "category": [';
//
//
//        cadena = '{ "chart": {"caption": "","yaxisname": "","formatNumberScale": "0","numberprefix": "","bgcolor": "#FFFFFF","showalternatehgridcolor": "0",' +
//                        ' "showvalues": "0","labeldisplay": "WRAP","divlinecolor": "#CCCCCC","divlinealpha": "70","useroundedges": "1","canvasbgcolor": "#FFFFFF",' +
//                        ' "canvasbasecolor": "#CCCCCC","showcanvasbg": "0","animation": "0","showborder": "0","legendPosition":"RIGHT"}, "categories" : [ {  "category": [';
//
//        for (var i = 0; i < nMeses; i++) {
//            cadena = cadena + '{ "label": "' + FormatoMesPeriodo(result[i].vcPeriodo) + '" }' + (i + 1 < nMeses ? ',' : '');
//        }
//
//        cadena = cadena + ' ] }], "dataset": [ { "seriesname": "Asignado","color": "#DBA901","data": [ ';
//
//        for (var i = 0; i < nMeses; i++) {
//            cadena = cadena + '{ "value": "' + result[i].Cuenta.dcMon + '" }' + (i + 1 < nMeses ? ',' : '');
//        }
//
//        cadena = cadena + ']},{ "seriesname": "Consumido","color": "#39BDE5","data": [ ';
//
//        for (var i = 0; i < nMeses; i++) {
//            cadena = cadena + '{ "value": "' + result[i].Cuenta.dcMonReal + '" }' + (i + 1 < nMeses ? ',' : '');
//        }
//
//        cadena = cadena + ']}]}';
//
//         //alerta(cadena);
//        //if (myChart4 ==null)
//        myChart4 = new FusionCharts("../../Common/Scripts/FusionCharts/MSColumn3D.swf", "myChartId"+Math.random(), 900,170 );
//        myChart4.setJSONData(cadena);
//        myChart4.render("Div11");
//}

//var tabOpciones;
//var tree = null;
//var idTree = "-1";

//function CargarDependecia() {
//                    if (tree != null) {
//                    
//                        if (idTree != tree.getSelectedItemId()) {
//                            $.ajax({
//                                type: "POST",
//                                url: "../Consultar/Con_SeleccionArea.aspx/ListarOrganizacion",
//                                data: "{'vcCodInt': '" + tree.getSelectedItemId() + "'}",
//                                contentType: "application/json; charset=utf-8",
//                                dataType: "json",
//                                success: function (result) {
//                                    var idtree = tree.getSelectedItemId();
//                                    var texto = tree.getAllChildless();
//
//                                    $(result.d).each(function () {
//                                        if (texto.indexOf(this.vcCodInt) == -1) {
//                                            tree.insertNewItem(idtree, this.vcCodInt, this.vcNomOrg, 0, 0, 0, 0, '');
//                                            //fixImage(this.vcCodInt);
//                                        }
//                                        else {
//                                            return false;
//                                        }
//                                    });
//                                },
//                                error: function (xhr, err, thrErr) {
//                                    MostrarErrorAjax(xhr, err, thrErr);
//                                }
//                            });
//                            //alert(idTree);
//                            //if (idTree != "-1") {
//                           // CargarDetalle(0);
//                            //}
//                        }
//                        idTree = tree.getSelectedItemId();
//                    }
//                }

//function fixImage(id) {
//    //Cerrar, abrir, cerrar
//    var Archivo = 'Niveles/' + (id.length / 3).toString() + '.ico'
//    tree.setItemImage2(id, Archivo, Archivo, Archivo);
//}

//LOAD
$(function () {
    //#region Valores Iniciales
    $("#txtLinea").live("keypress", ValidarEnteroPositivo);

    fnCargarMeses(12, 6);
    //Lista_Grafico();
    ListarDatosDistribucion();

    $("#lblTituloHistorico3").html("Todas las cuentas");
    CuentaSeleccionada = "Todas las cuentas";
    TipDisSelect = $("#ddlTipDis option:selected").text();

    //#endregion

    //#region Eventos

    $(window).resize(function () {
        DimPosElementos();
    });

    $("#btnFiltrarHist").live("click", function () {
        flagFiltro = false;
        $("#tbHistorico").jqGrid('clearGridData');
        $("#tbOrga").jqGrid('clearGridData');
        vcNomCuenta = $("#ddlCuenta option:selected").text() == '< Todos >' ? "Todas las cuentas" : $("#ddlCuenta option:selected").text();
        vcNomTipDis = $("#ddlTipDis option:selected").text();
        //$("#lblTituloHistorico1").html(vcNomCuenta);
        //$("#lblTituloHistorico2").html(vcNomCuenta);
        $("#lblTituloHistorico3").html(vcNomCuenta);
        CuentaSeleccionada = vcNomCuenta;
        TipDisSelect = vcNomTipDis;
        //Lista_Grafico();
        ListarDatosDistribucion();
    });

    $("#imCambiarCriterio").click(function () {
        if (vCriterio == 'c') {
            $("#tdCriterioCuenta").hide();
            $("#tdCriterioLinea").show();
            $("#txtLinea").focus();
            vCriterio = 'l';
        } else {
            $("#tdCriterioCuenta").show();
            $("#tdCriterioLinea").hide();
            vCriterio = 'c';
        }
    });

    $("#txtLinea").live("keypress", function (event) {
        if (event.keyCode == 13) {
            //Lista_Grafico();
            ListarDatosDistribucion();
        }
    });
    //#endregion
});

//function isNumberKey(evt)
//{      
//    var charCode = (evt.which) ? evt.which : event.keyCode         
//    if (charCode > 31 && (charCode < 47 || charCode > 57))         
//        return false;
// 
//    return true;
//}
//function otro() { }

//function FormatoMesPeriodo(p_vcNomPeriodo){
//
//        var inMes = p_vcNomPeriodo.substring(0,2);
//        var vcMes = '';
//
//        if(inMes=='01')vcMes = 'ENE';
//        if(inMes=='02')vcMes = 'FEB';
//        if(inMes=='03')vcMes = 'MAR';
//        if(inMes=='04')vcMes = 'ABR';
//        if(inMes=='05')vcMes = 'MAY';
//        if(inMes=='06')vcMes = 'JUN';
//        if(inMes=='07')vcMes = 'JUL';
//        if(inMes=='08')vcMes = 'AGO';
//        if(inMes=='09')vcMes = 'SET';
//        if(inMes=='10')vcMes = 'OCT';
//        if(inMes=='11')vcMes = 'NOV';
//        if(inMes=='12')vcMes = 'DIC';
//
//        return p_vcNomPeriodo.replace(inMes,vcMes).replace('/','-');
//    
//}

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    //tabla de periodos
    $("#tbVerGrafico").width(Ancho - 55);
    $("#tbCuentas").setGridWidth(Ancho - 55);
    $("#tbAgrupacion").setGridWidth(Ancho - 55);
    
}

function fnCargarMeses(t, d) {
    var i = 1;
    for (i = 1; i <= t; i++) {
        $("#ddlNumeroMeses").append($("<option></option>").attr("value", i).text(i));
    }
    $("#ddlNumeroMeses").val(d);
}

//optimizando página
function ListarDatosDistribucion() {
    //var vColModelCuentas = [];
    var Ancho = $(window).width();
    var tbCuentas, tbAgrupacion;
    var vLinea = $("#txtLinea").val() == null ? '' : $("#txtLinea").val();
    var vCuenta = $("#ddlCuenta").val() == null ? '' : $("#ddlCuenta").val();

    var Listar_Reporte_2_Data = {
        p_vcCriterio: vCriterio == 'c' ? '' : vLinea,
        p_idCuenta: vCriterio == 'l' ? '' : vCuenta,
        p_vcCodInt2: '',
        p_SinEmpleado: '',
        p_inMeses: $("#ddlNumeroMeses").val(),
        p_inTipDis: $("#ddlTipDis").val()
    };

    $.ajax({
        type: "POST",
        url: "Conf_DistribucionMinutosHistoricos.aspx/Listar_Reporte_2",
        data: JSON.stringify(Listar_Reporte_2_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var vColModelCuentas = JSON.parse(result.d[0]);
            var vColModelAgrupacion = JSON.parse(result.d[1]);
            var arDatosCuentas = JSON.parse(result.d[2]);
            var arDatosAgrupacion = JSON.parse(result.d[3]);
            var arMesesGrafico = JSON.parse(result.d[4]);
            var arDatosGrafico = result.d[5];

            if (flagFiltro) {
                $("#ddlCuenta").html("");
                $("#ddlCuenta").append($("<option></option>").attr("value", "").text("< Todos >"));
                var i = 0;
                for (i = 0; i < arDatosCuentas.length; i++) {
                    $("#ddlCuenta").append($("<option></option>").attr("value", arDatosCuentas[i].vcCod).text(arDatosCuentas[i].vcNom));
                }
            }

            $("#dvGrillaCuentas").empty();
            $("#dvGrillaAgrupacion").empty();
            if (arDatosCuentas.length > 0) {
                $("#dvEmptyCuentas").hide();
                $("#dvEmptyAgrupacion").hide();
                $("#dvTituloGrafico").show();

                $("#dvGrillaCuentas").append('<table id="tbCuentas"></table><div id="pagerCuentas"></div>');
                tbCuentas = $("#tbCuentas").jqGrid({
                    datatype: "local",
                    data: arDatosCuentas,
                    colModel: vColModelCuentas,
                    caption: "Distribución de " + CuentaSeleccionada,
                    width: Ancho - 55,
                    height: 95,
                    emptyrecords: 'No hay resultados',
                    shrinkToFit: false,
                    rownumbers: true,
                    rowList: [5, 10, 15],
                    pager: '#pagerCuentas',
                    viewrecords: true,
                    beforeSelectRow: function () {
                        return false;
                    },
                    hidegrid: false,
                    loadtext: 'Cargando cuentas...',
                    onRightClickRow: function () {
                        tbCuentas.jqGrid('resetSelection');
                        return false;
                    }
                });

                $("#dvGrillaAgrupacion").append('<table id="tbAgrupacion"></table><div id="pagerAgrupacion"></div>');
                tbAgrupacion = $("#tbAgrupacion").jqGrid({
                    datatype: "local",
                    data: arDatosAgrupacion,
                    colModel: vColModelAgrupacion,
                    caption: "Distribución por " + TipDisSelect + " de " + CuentaSeleccionada,
                    width: Ancho - 55,
                    height: 125,
                    emptyrecords: 'No hay resultados',
                    shrinkToFit: false,
                    rownumbers: true,
                    rowList: [10, 20, 30],
                    pager: '#pagerAgrupacion',
                    viewrecords: true,
                    beforeSelectRow: function () {
                        return false;
                    },
                    hidegrid: false,
                    loadtext: 'Cargando agrupación...',
                    onRightClickRow: function () {
                        tbAgrupacion.jqGrid('resetSelection');
                        return false;
                    }
                });

                GenerarGraficoBolsa(arMesesGrafico, arDatosGrafico);
            } else {
                $("#dvEmptyCuentas").show();
                $("#dvTituloGrafico").hide();
                $("#dvGrafico").empty();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function GenerarGraficoBolsa(arMeses, arDatosGrafico) {
    var cdn, chart, categories, dataset, serieAsignado, serieConsumido, objChart;
    chart = '"chart": {';
    chart = chart + '"caption": "",';
    chart = chart + '"yaxisname": "",';
    chart = chart + '"formatNumberScale": "0",';
    chart = chart + '"numberprefix": "",';
    chart = chart + '"bgcolor": "#FFFFFF",';
    chart = chart + '"showalternatehgridcolor": "0",';
    chart = chart + '"showvalues": "0",';
    chart = chart + '"labeldisplay": "WRAP",';
    chart = chart + '"divlinecolor": "#CCCCCC",';
    chart = chart + '"divlinealpha": "70",';
    chart = chart + '"useroundedges": "1",';
    chart = chart + '"canvasbgcolor": "#FFFFFF",';
    chart = chart + '"canvasbasecolor": "#CCCCCC",';
    chart = chart + '"showcanvasbg": "0",';
    chart = chart + '"animation": "0",';
    chart = chart + '"showborder": "0",';
    chart = chart + '"legendPosition":"RIGHT"';
    chart = chart + '}';

    categories = '"categories":[{"category":[';
    var i = 0;
    for (i = 0; i < arMeses.length; i++) {
        if (i == 0) {
            categories = categories + '{"label":"' + arMeses[i].vcPeriodo + '"}';
        } else {
            categories = categories + ',{"label":"' + arMeses[i].vcPeriodo + '"}';
        }
    }
    categories = categories + ']}]';

    dataset = '"dataset":[';

    serieAsignado = '{"seriesname":"Asignado","color":"#DBA901","data":[';
    serieConsumido = '{"seriesname":"Consumido","color":"#39BDE5","data":[';
    var i = 0;
    for (i = 0; i < arDatosGrafico.length; i++) {
        if (i == 0) {
            serieAsignado = serieAsignado + '{"value":"' + arDatosGrafico[i].Cuenta.dcMon + '"}';
            serieConsumido = serieConsumido + '{"value":"' + arDatosGrafico[i].Cuenta.dcMonReal + '"}';
        } else {
            serieAsignado = serieAsignado + ',{"value":"' + arDatosGrafico[i].Cuenta.dcMon + '"}';
            serieConsumido = serieConsumido + ',{"value":"' + arDatosGrafico[i].Cuenta.dcMonReal + '"}';
        }
    }
    serieAsignado = serieAsignado + ']}';
    serieConsumido = serieConsumido + ']}';
    
    dataset = dataset + serieAsignado + ',' + serieConsumido;
    dataset = dataset + ']';

    cdn = '{' + chart + ',' + categories + ',' + dataset + '}';

    objChart = new FusionCharts("../../Common/Scripts/FusionCharts/MSColumn3D.swf", "myChartId" + Math.random(), 900, 170);
    objChart.setJSONData(cdn);
    objChart.render("dvGrafico");
}

//function fnFormatoColModel(value_, options_, rData_) {
//    value_ = (value_ == null ? 0 : value_);
//    return FormatoNumero(value_, oCulturaLocal, true);
//}