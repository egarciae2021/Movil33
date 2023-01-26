/// <reference path="../../Common/Scripts/jquery-2.0.0-vsdoc.js" />
var verTapLlamadas = false;
var verTapMensajes = false;
var verTapNavegacion = false;
var verTapTotal = false;
var myChart1;
var myChart2;
var myChart3;
var myChart4;
var myChart5;

var myChart6;
var myChart7;
var myChart8;
var myChart9;

var myChart10;
var myChart11;
var myChart12;

var myChartHist1;
var myChartHist2;
var myChartHist3;
var myChartHist4;
var myChartHist5;
var myChartHist6;
var myChartHist7;
var myChartHist8;
var myChartHist9;
var myChartHist10;

var ale = true;
var seLLama = true;
var idTapTipoServ = 0;
var Nivel;
var TipOpc;

var oCulturaUsuario;

var IdDinamico = "";

var CargandoTaps = [0, 0, 0];

var contador = 0;

$(function () {
    oCulturaUsuario = window.parent.parent.oCulturaUsuario;

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

    var strPeriodo = $("#ddlPeriodo option:selected").text();
    $("#lblPeriodo").text(strPeriodo);

    $("#ttgInfoServicios_dvToolTip").css({ "margin-top": "-15px" });

    fnCargarDisenos();

    window.parent.$("#dvCargando").hide();
    fnAgregarTapsTipoServicio();
    //FusionCharts.setCurrentRenderer('javascript');
    fnDiseno();
    //$("#pnlLlamadas").addClass("esNoVisible");
    $("#pnlMensajes").addClass("esNoVisible");
    $("#pnlNavegacion").addClass("esNoVisible");
    $("#pnlTotal").addClass("esNoVisible");

    //tab llamadas mostrado al cargar la pagina //04-11-2014 wapumayta 
    $('.Tap').removeClass("ui-state-active-TAB");
    $('.Tap').addClass("TapNoSelecionado");
    $("#TapTotal").removeClass("TapNoSelecionado");
    $("#TapTotal").addClass("ui-state-active-TAB");

    if (idTapTipoServ == 0) {
        var miId = "TapTotal";
        $("#pnlMensajes").addClass("esNoVisible");
        $("#pnlNavegacion").addClass("esNoVisible");
        $("#pnlTotal").addClass("esNoVisible");
        $('.Tap').removeClass("ui-state-active-TAB");
        $('.Tap').addClass("TapNoSelecionado");
        $('#TapTotal').removeClass("TapNoSelecionado");
        $('#TapTotal').addClass("ui-state-active-TAB");

        CargandoTaps[0] = 1;
        CargandoTaps[1] = 1;
        CargandoTaps[2] = 1;

        switch (miId.toString().toLowerCase()) {
            case ("TapTotal").toLowerCase():
                if ($("#pnlTotal").hasClass("esNoVisible")) {
                    $(".DivDinamico").addClass("esNoVisible");
                    $("#pnlTotal").removeClass("esNoVisible");
                    $("#pnlLlamadas").addClass("esNoVisible");
                    $("#pnlMensajes").addClass("esNoVisible");
                    $("#pnlNavegacion").addClass("esNoVisible");
                    if ($("#hdfCodOrganizacion").val() == '') {
                        $("#pnlCuerpo").height(305);
                    } else {
                        $("#pnlCuerpo").height(620);
                    }
                    if (!verTapTotal) {
                        verTapTotal = true;
                        dibujarHistorico(idTapTipoServ);
                        dibujarTopTenArea(idTapTipoServ);
                        dibujarTopTenEmpleado(idTapTipoServ);
                    }
                    else {
                        CargandoTaps[0] = 0;
                        CargandoTaps[1] = 0;
                        CargandoTaps[2] = 0;
                    }
                }
                else {
                    CargandoTaps[0] = 0;
                    CargandoTaps[1] = 0;
                    CargandoTaps[2] = 0;
                }
                break;

            default:
                IdDinamico = miId;
                idTapTipoServ = $(this).attr("cod");
                $("#pnlCuerpo > div").addClass("esNoVisible");
                if ($("#DvPnl_" + miId).length > 0) {
                    //$("#DvPnl_" + miId).show();
                    $("#DvPnl_" + miId).removeClass("esNoVisible");

                    CargandoTaps[0] = 0;
                    CargandoTaps[1] = 0;
                    CargandoTaps[2] = 0;
                }
                else {
                    $("#pnlCuerpo").append(fnObtenerCuerpoTapGenerico(miId));
                    fnNuevasInstanciasDinamicas(miId);

                    dibujarHistorico(idTapTipoServ);
                    dibujarTopTenArea(idTapTipoServ);
                    dibujarTopTenEmpleado(idTapTipoServ);

                }
                break;

        }

    }

    if ($("#hdfOpcionPrincipal").val() == 0) {
        $("#ddlTipoLinea").removeAttr("disabled");
    } else {
        $("#ddlTipoLinea").attr("disabled", "disabled");
    }

    try {
        window.parent.fnCerrarCargaInicial();
    }
    catch (e) {
        //some err
    }

    //    $("#ddlOperador option[value=" + $("#hdfCodOperador").val() + "]").attr("selected", "selected");
    //    $("#ddlOperador").val("5109");

    //$("#ddlOperador").prop("selectedIndex", 0);
    //$("#ddlOperador").attr('disabled', false);






    $(".pnlCantidades").click(function () {
        var nombre = $(this).attr("id");
        AbrirTab("EstadoSolicitudes", "Estado solicitudes", "P_Movil/Administrar/Solicitudes/Adm_Solicitudes.aspx?nom=" + nombre);
    });

    $("#selectTipo").change(function () {
        var valorAnterior = $("#selectServicio").val();
        $('#selectServicio').html('');
        if ($("#selectTipo").val() == 'Costo') {
            //            $('#selectServicio').append(new Option('Local', 'LOC'));
            //            $('#selectServicio').append(new Option('Celular', 'CEL'));
            //            $('#selectServicio').append(new Option('Nacional', 'DDN'));
            //            $('#selectServicio').append(new Option('Internacional', 'DDI'));
            //            $('#selectServicio').append(new Option('Total', 'TOTAL'));
            $('#selectServicio').append('<option value="LOC">Fija</option>');
            $('#selectServicio').append('<option value="CEL">Celular</option>');
            //$('#selectServicio').append('<option value="DDN">Nacional</option>');
            $('#selectServicio').append('<option value="DDI">Internacional</option>');
            $('#selectServicio').append('<option value="TOTAL" selected="selected">Total</option>');

        }
        else {
            //            $('#selectServicio').append(new Option('Local', 'LOC'));
            //            $('#selectServicio').append(new Option('Celular', 'CEL'));
            //            $('#selectServicio').append(new Option('Nacional', 'DDN'));
            //            $('#selectServicio').append(new Option('Internacional', 'DDI'));
            //            $('#selectServicio').append(new Option('Total', 'TOTAL'));
            $('#selectServicio').append('<option value="LOC">Fija</option>');
            $('#selectServicio').append('<option value="CEL">Celular</option>');
            //$('#selectServicio').append('<option value="DDN">Nacional</option>');
            $('#selectServicio').append('<option value="DDI">Internacional</option>');
            $('#selectServicio').append('<option value="TOTAL" selected="selected">Total</option>');
        }

        $("#selectServicio").val(valorAnterior);

        dibujarHistorico(idTapTipoServ);
        dibujarTopTenArea(idTapTipoServ);
        dibujarTopTenEmpleado(idTapTipoServ);
    });

    $("#ddlMesesAtrasLlamadas, #ddlMesesAtrasNavegacion, #ddlMesesAtrasMensaje, #ddlMesesAtrasTotal").change(function () {
        dibujarHistorico(idTapTipoServ);
    });

    $("#selectServicio").change(function () {
        dibujarHistorico(idTapTipoServ);
        dibujarTopTenArea(idTapTipoServ);
        dibujarTopTenEmpleado(idTapTipoServ);
    });

    $("#selectTipoMensaje").change(function () {
        dibujarHistorico(idTapTipoServ);
        dibujarTopTenArea(idTapTipoServ);
        dibujarTopTenEmpleado(idTapTipoServ);
    });

    $("#selectTipoNavegacion").change(function () {
        dibujarHistorico(idTapTipoServ);
        dibujarTopTenArea(idTapTipoServ);
        dibujarTopTenEmpleado(idTapTipoServ);
    });

    $("#selectTipoTotal").change(function () {
        dibujarHistorico(idTapTipoServ);
        dibujarTopTenArea(idTapTipoServ);
        dibujarTopTenEmpleado(idTapTipoServ);
    });

    $('#ddlNivel').change(function () {
        dibujarTopTenArea(idTapTipoServ);

        dibujarTopTenEmpleado(idTapTipoServ);
    });

    $('#ddlNivelMensajes').change(function () {
        dibujarTopTenArea(idTapTipoServ);

        dibujarTopTenEmpleado(idTapTipoServ);
    });

    $('#ddlNivelTotal').change(function () {
        dibujarTopTenArea(idTapTipoServ);

        dibujarTopTenEmpleado(idTapTipoServ);
    });

    $('#ddlNivelNavegacion').change(function () {
        dibujarTopTenArea(idTapTipoServ);

        dibujarTopTenEmpleado(idTapTipoServ);
    });

    $("#ddlPeriodo").change(function () {
        window.parent.$("#dvCargando").show();
        $("#hdfTipoTopArea").val($("#cmbTipoAreas").val());
        $("#hdfTipoTopEmpleado").val($("#cmbTipoEmpleados").val());
        window.location.href = 'BienvenidaMovil2.aspx?pe=' + $("#ddlPeriodo").val() + '&Ope= ' + $("#ddlOperador").val() + '&TipLin=' + $("#ddlTipoLinea").val() + '&Pag = ' + TipOpc;
        window.parent.fnCerrarCargaInicial();
    });

    $("#ddlOperador").change(function () {
        window.parent.$("#dvCargando").show();
        $("#hdfTipoTopArea").val($("#cmbTipoAreas").val());
        $("#hdfTipoTopEmpleado").val($("#cmbTipoEmpleados").val());
        window.location.href = 'BienvenidaMovil2.aspx?pe=' + $("#ddlPeriodo").val() + '&Ope= ' + $("#ddlOperador").val() + '&TipLin=' + $("#ddlTipoLinea").val() + '&Pag = ' + TipOpc;
        window.parent.fnCerrarCargaInicial();
    });

    $("#ddlTipoLinea").change(function () {
        window.parent.$("#dvCargando").show();
        $("#hdfTipoTopArea").val($("#cmbTipoAreas").val());
        $("#hdfTipoTopEmpleado").val($("#cmbTipoEmpleados").val());
        window.location.href = 'BienvenidaMovil2.aspx?pe=' + $("#ddlPeriodo").val() + '&Ope= ' + $("#ddlOperador").val() + '&TipLin=' + $("#ddlTipoLinea").val() + '&Pag = ' + TipOpc;
        window.parent.fnCerrarCargaInicial();
    });

    //dibujarHistorico(jsDatosHistorico);
    //MostrarHistorico(jsonDatosHistorico);
    MostrarPie(jsonDatosPie);

    $("#divEquipo").click(function () {
        var gg = $("#ddlDispositivo option");
        $("#divEquipo").attr("disabled", "disabled");
        if (gg.length == 0) {
            // MJARAMILLO
            alerta("Usted no cuenta con dispositivos", "", null, "warning");
            return;
        }
        if ($("#lblEquipo").text() == "Mis equipos") {
            TipOpc = 1;
            $("#dvTitulo").css("margin-left", "135px");
            $("#pnlDdl").hide();

            $("#txtTitulo").text("Mis Equipos");
            $("#txtTitulo").css("margin-left", "450px");

            $(".tdDashMovil").hide();
            //$("#lblEquipo").text("Información");//cambio Primero Cel
            $("#lblEquipo").text("Consumo de llamadas"); //cambio Primero Cel

            if ($("#ddlDispositivo").val() != "-1") {
                //document.getElementById('divTabs').style.display = 'inherit';
                ObtenerCodigoModelo($("#hdfEmpleado").val(), $("#ddlDispositivo").val());
                $("#ifDetalleDispositivo").attr("src", "Administrar/Mantenimiento/Mnt_DetalleDispositivo.aspx?CodDis=" + $("#ddlDispositivo").val());
            }
            else {
                $("#ifDetalleDispositivo").attr("src", "");
                $("#ifNuevoEquipo").attr("src", "");
            }
            $("#prueba").hide(0, function () {
                $("#GeneralEquipo").show("drop", 500, function () {
                    $("#divEquipo").removeAttr("disabled");
                });
            });
        }
        else {
            TipOpc = 2;
            $("#dvTitulo").css("margin-left", "0px");

            $("#txtTitulo").text("Información Resumida");
            $("#txtTitulo").css("margin-left", "0px");
            $("#pnlDdl").show();
            $(".tdDashMovil").show();
            $("#lblEquipo").text("Mis equipos");
            $("#GeneralEquipo").hide(0, function () {
                $("#prueba").show("drop", 300, function () {
                    if ($("#hdfAdmin").val() != 1) {//cambio Primero Cel
                        MostrarHistorico(jsonDatosHistorico); //cambio Primero Cel
                        MostrarPie(jsonDatosPie); //cambio Primero Cel
                    } //cambio Primero Cel
                    $("#divEquipo").removeAttr("disabled");
                });
            });
        }
    });

    if ($("#hdfAdmin").val() == 1) {
        //dibujarTopTenArea();
        MostrarTopTenArea(jsonTopTenArea);
        MostrarTopTenEmpleado(jsonTopTenEmpleado);
        //$("#divEquipo").hide();
    }
    else {
        if ($("#hdfCodOrganizacion").val() == '') {
            $(".pnlTop").hide();
            $("#General").css("height", "610px");
            $("#pnlCuerpo").css("height", "305px");
            if ($("#hdfTipoOpcion").val() == "1") {
                $("#divEquipo").click(); //cambio Primero Cel
            }

        }
        else {
            MostrarTopTenArea(jsonTopTenArea);
            MostrarTopTenEmpleado(jsonTopTenEmpleado);
        }
    }

    $("#ddlDispositivo").change(function () {
        if ($("#ddlDispositivo").val() != "-1") {
            //document.getElementById('divTabs').style.display = 'inherit';
            ObtenerCodigoModelo($("#hdfEmpleado").val(), $("#ddlDispositivo").val());
            $("#ifDetalleDispositivo").attr("src", "Administrar/Mantenimiento/Mnt_DetalleDispositivo.aspx?CodDis=" + $("#ddlDispositivo").val());
        }
        else {
            $("#ifDetalleDispositivo").attr("src", "");
            $("#ifNuevoEquipo").attr("src", "");
        }
    });

    diseno();
    //dibujarHistorico(idTapTipoServ);

    /*
    if ($("#ddlOperador option").length == 2) {
        $("#ddlOperador").prop("selectedIndex", 1);
        $("#ddlOperador").attr('disabled', true);
        $("#ddlOperador").change();
    }
    */
});

function diseno() {

    $("#divSoli").click(function () {
        //        $("#ctndCantidad").toggle(300);
        AbrirTab("tbPrincipal_TabJQ3_AccordionProd3_Item1_tab", "Solicitudes", "P_Movil/Administrar/Solicitudes/Adm_ListadoSolicitudes.aspx?inFiltro=7");
        seLLama = false;
    });
    $("#divSoliPorAprobar").click(function () {
        //        $("#ctndCantidad").toggle(300);
        AbrirTab("Solicitudes", "Solicitudes", "P_Movil/Administrar/Solicitudes/Adm_ListadoSolicitudes.aspx?inFiltro=7");
        seLLama = false;
    });
    if ($("#lbltotal").text().split(" ")[0] != "0") {
        fnalerta();
    }
}

function fnalerta() {
    setTimeout(function () {
        $("#divSoli").toggleClass("ui-state-error", ale);
        //$("#divSoliPorAprobar").toggleClass("ui-state-error", ale);
        ale = !ale;
        if (seLLama) {
            fnalerta();
        }
        else {
            $("#divSoli").removeClass("ui-state-error");
            //$("#divSoliPorAprobar").removeClass("ui-state-error");
        }
    }, 1000);
}

function AbrirTab(tab, descripcion, pagina) {
    var Nametab = "tbPrincipalProducto"; //window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
    var Accord = window.parent.$("#" + Nametab);
    var Id = "#" + tab;
    var $panel = Accord.find(Id);
    if (!$panel.length) {//En el caso que no exista el tab, lo crea
        var Titulo = descripcion;
        window.parent.pagina = pagina;
        Accord.tabs("add", Id, Titulo);
        window.parent.$(Id).css("width", "99%");
        window.parent.$(Id).css("height", "94%");
        window.parent.$(Id).css("margin-top", "0px");
        window.parent.$(Id).css("margin-left", "0px");
        window.parent.$(Id).css("margin-bottom", "0px");
        window.parent.$(Id).css("margin-right", "0px");
        window.parent.$(Id).css("padding-top", "0px");
        window.parent.$(Id).css("padding-left", "0px");
        window.parent.$(Id).css("padding-bottom", "0px");
        window.parent.$(Id).css("padding-right", "0px");
    }
    else { //En el caso que exista lo muestra
        Accord.tabs('select', Id);
    }
}

function dibujarHistorico(TipServ) {
    var and = "";
    var tipo = "";
    var miMesesAtras = "6";

    if ($("#hdfAdmin").val() != "1") {
        and = "and codempleado = |" + $("#hdfEmpleado").val() + "|";
    }

    if (TipServ == 16) {
        tipo = $("#selectTipo").val();
        miMesesAtras = $("#ddlMesesAtrasLlamadas").val();
    }
    else if (TipServ == 17) {
        tipo = $("#selectTipoNavegacion").val();
        miMesesAtras = $("#ddlMesesAtrasNavegacion").val();
    }
    else if (TipServ == 0) {
        tipo = $("#selectTipoTotal").val();
        miMesesAtras = $("#ddlMesesAtrasTotal").val();
    }
    else if (TipServ == 18) {
        //tipo = $("#selectTipoTotal").val();
        tipo = $("#selectTipoMensaje").val();
        miMesesAtras = $("#ddlMesesAtrasMensaje").val();
    }
    else {
        tipo = $("#selectTipo_" + IdDinamico).val();
        miMesesAtras = $("#ddlMesesAtras_" + IdDinamico).val();
        //tipo = "Costo";
    }

    $.ajax({
        type: "POST",
        //url: "BienvenidaMovil2.aspx/obtenerHistoricoDash",
        url: "BienvenidaMovil2.aspx/obtenerHistoricoDash_Movil",
        data: "{'prPeriodo': '" + ObtenerSelectPeriodo() + "'," +
                "'prMesesAtras': '" + miMesesAtras + "'," +
                "'prGlobal': '" + $("#selectServicio").val() + "'," +
                "'prAnd': '" + and + "'," +
                "'inNivel': '" + ($.trim($("#hdfCodOrganizacion").val()) == '' ? 2 : 1) + "'," +
                "'prValor': '" + ($.trim($("#hdfCodOrganizacion").val()) == '' ? $.trim($("#hdfEmpleado").val()) : $.trim($("#hdfCodOrganizacion").val())) + "'," +
                "'prusuario': '" + $.trim($("#hdfCodUsuario").val()) + "'," +
                "'inAdmin': '" + $.trim($("#hdfAdmin").val()) + "'," +
                "'inCodTipServ': '" + TipServ + "'," +
                "'prCodOperador': '" + $("#ddlOperador").val() + "'," +
                "'prObjetivo': '" + $("#lblObjetivo").text() + "'," +
                "'prAbrevMoneda': '" + $("#hdfTipoMoneda").val() + "'," +
                "'prSepDec': '" + $("#hdfSepDecimal").val() + "'," +
                "'prSepMil': '" + $("#hdfSepMiles").val() + "'," +
                "'inNumDec': '" + $("#hdfNumDecimales").val() + "'," +
                "'Tipo':'" + tipo + "'," +
                "'inCodTip':'" + $("#ddlTipoLinea").val() + "'," +
                "'prCodSuc': '" + $("#hdfCodSucursal").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            contador++;
            if (TipServ == 16) {
                MostrarHistorico(resultado.d);
            }
            else if (TipServ == 17) {
                MostrarHistoricoNavegacion(resultado.d);
            }
            else if (TipServ == 18) {
                MostrarHistoricoMensajes(resultado.d);
            }
            else if (TipServ == 0) {
                MostrarHistoricoTotal(resultado.d);
            }
            else {
                MostrarHistoricoDinamico(resultado.d);
            }

            CargandoTaps[0] = 0;
        },
        error: function (xhr, err, thrErr) {
            CargandoTaps[0] = 0;
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function MostrarHistorico(result) {
    var re = JSON.parse(result);
    if (re.dataset.length > 0) {


        var JSON_chart = JSON.parse(result);

        JSON_chart.chart.caption = "HISTÓRICO DE CONSUMO";
        JSON_chart.chart.subcaption = "(Últimos 12 meses)";
        JSON_chart.chart.baseFont = "Open Sans";
        JSON_chart.chart.baseFontColor = "#6b737c";
        JSON_chart.chart.subCaptionFontColor = "#9E9C9C";
        JSON_chart.chart.captionFontSize = "16";
        JSON_chart.chart.subcaptionFontSize = "12";
        JSON_chart.chart.subcaptionFontBold = "0";
        JSON_chart.chart.captionAlignment = "left";
        JSON_chart.chart.exportFileName = "HistoricoConsumo";


        JSON_chart.chart.paletteColors = "#01B8AA";
        JSON_chart.chart.sdecimals = "0";
        JSON_chart.chart.decimals = "0";

        JSON_chart.chart.slantlabels = "0";
        JSON_chart.chart.showlegend = "0";
        JSON_chart.chart.exportenabled = "1";
        JSON_chart.chart.exportShowMenuItem = "1";
        JSON_chart.chart.subCaptionFontColor = "#9E9C9C";
        JSON_chart.chart.captionFontSize = "16";
        JSON_chart.chart.subcaptionFontSize = "12";
        JSON_chart.chart.divlineThickness = "0";
        JSON_chart.chart.legendItemFontColor = "#666666";
        JSON_chart.chart.legendItemFontSize = "10";
        JSON_chart.chart.legendShadow = "0";
        JSON_chart.chart.placeValuesInside = "1";
        JSON_chart.chart.rotateValues = "1";
        JSON_chart.chart.sformatnumber = "0";
        JSON_chart.chart.showHoverEffect = "1";
        JSON_chart.chart.showShadow = "0";
        JSON_chart.chart.showXAxisLine = "1";
        JSON_chart.chart.showYAxisValues = "1";
        JSON_chart.chart.showPercentValues = "0";
        JSON_chart.chart.showplotborder = "0";
        JSON_chart.chart.subcaptionFontBold = "0";
        JSON_chart.chart.showAlternateVGridColor = "0";
        JSON_chart.chart.valueFontColor = "#FFFFFF";
        JSON_chart.chart.xAxisLineThickness = "1";
        JSON_chart.chart.maxLabelWidthPercent = "30";

        JSON_chart.dataset.splice(1, 1);

        //var JSON_chart = JSON.parse(result[0]);
        JSON_chart.legendBorderThickness = "0";
        JSON_chart.legendShadow = "0";
        if (JSON_chart.dataset) {
            if (JSON_chart.dataset.length > 0) {
                for (var i in JSON_chart.dataset[0].data) {
                    JSON_chart.dataset[0].data[i].color = "#01B8AA";
                    JSON_chart.dataset[0].data[i].alpha = "100";
                }
            }
        }

        $("#pnlDdlHistorico").show(500, function () {
            //if ((FusionCharts("chartHistorico"))) {
            //    myChartHist1.dispose();
            //}
            myChartHist1 = new FusionCharts("MSCombi2D", "chartHistorico" + contador.toString(), "980", "227", "0");
            myChartHist1.setJSONData(JSON_chart);
            myChartHist1.setTransparent(true);
            myChartHist1.render("ctndCharHis");
            $("chartHistorico").css('left', '15px');
        });
    }
    else {
        //$("#pnlDdlHistorico").hide();
        $("#ctndCharHis *").remove();
        $("#ctndCharHis").append('<div style="font-size:medium; color:Gray; width: 980px; height: 227px;">No hay datos para mostrar.</div> ');
    }
    try {
        window.parent.fnCerrarCargaInicial();
    }
    catch (e) {
        //some err
    }
}

function MostrarHistoricoMensajes(result) {
    var re = JSON.parse(result);
    if (re.dataset.length > 0) {
        $("#pnlDdlHistoricoMensajes").show(500, function () {


            var JSON_chart = JSON.parse(result);

            JSON_chart.chart.caption = "HISTÓRICO DE CONSUMO";
            JSON_chart.chart.subcaption = "(Últimos 12 meses)";
            JSON_chart.chart.baseFont = "Open Sans";
            JSON_chart.chart.baseFontColor = "#6b737c";
            JSON_chart.chart.subCaptionFontColor = "#9E9C9C";
            JSON_chart.chart.captionFontSize = "16";
            JSON_chart.chart.subcaptionFontSize = "12";
            JSON_chart.chart.subcaptionFontBold = "0";
            JSON_chart.chart.captionAlignment = "left";
            JSON_chart.chart.exportFileName = "HistoricoConsumo";


            JSON_chart.chart.paletteColors = "#01B8AA";
            JSON_chart.chart.sdecimals = "0";
            JSON_chart.chart.decimals = "0";

            JSON_chart.chart.slantlabels = "0";
            JSON_chart.chart.showlegend = "0";
            JSON_chart.chart.exportenabled = "1";
            JSON_chart.chart.exportShowMenuItem = "1";
            JSON_chart.chart.subCaptionFontColor = "#9E9C9C";
            JSON_chart.chart.captionFontSize = "16";
            JSON_chart.chart.subcaptionFontSize = "12";
            JSON_chart.chart.divlineThickness = "0";
            JSON_chart.chart.legendItemFontColor = "#666666";
            JSON_chart.chart.legendItemFontSize = "10";
            JSON_chart.chart.legendShadow = "0";
            JSON_chart.chart.placeValuesInside = "1";
            JSON_chart.chart.rotateValues = "1";
            JSON_chart.chart.sformatnumber = "0";
            JSON_chart.chart.showHoverEffect = "1";
            JSON_chart.chart.showShadow = "0";
            JSON_chart.chart.showXAxisLine = "1";
            JSON_chart.chart.showYAxisValues = "1";
            JSON_chart.chart.showPercentValues = "0";
            JSON_chart.chart.showplotborder = "0";
            JSON_chart.chart.subcaptionFontBold = "0";
            JSON_chart.chart.showAlternateVGridColor = "0";
            JSON_chart.chart.valueFontColor = "#FFFFFF";
            JSON_chart.chart.xAxisLineThickness = "1";
            JSON_chart.chart.maxLabelWidthPercent = "30";

            JSON_chart.dataset.splice(1, 1);

            //var JSON_chart = JSON.parse(result[0]);
            JSON_chart.legendBorderThickness = "0";
            JSON_chart.legendShadow = "0";
            if (JSON_chart.dataset) {
                if (JSON_chart.dataset.length > 0) {
                    for (var i in JSON_chart.dataset[0].data) {
                        JSON_chart.dataset[0].data[i].color = "#01B8AA";
                        JSON_chart.dataset[0].data[i].alpha = "100";
                    }
                }
            }


            //if ((FusionCharts("chartHistoricoMensaje"))) {
            //    //myChart1 = new FusionCharts("../Common/Scripts/FusionCharts/MSCombi2D.swf", "chartHistoricoMensaje", "980", "227", "0");
            //    myChartHist2.dispose();
            //}
            myChartHist2 = new FusionCharts("MSCombi2D", "chartHistoricoMensaje" + contador.toString(), "980", "227", "0");
            myChartHist2.setJSONData(JSON_chart);
            myChartHist2.setTransparent(true);
            myChartHist2.render("ctndCharHisMensajes");
            $("#chartHistoricoMensaje").css('left', '15px');
        });
    }
    else {
        //$("#pnlDdlHistoricoMensajes").hide();
        $("#ctndCharHisMensajes *").remove();
        $("#ctndCharHisMensajes").append('<div style="font-size:medium; color:Gray; width: 980px; height: 227px;">No hay datos para mostrar.</div> ');
    }
    try {
        window.parent.fnCerrarCargaInicial();
    }
    catch (e) {
        //some err
    }
}

function MostrarHistoricoTotal(result) {
    var re = JSON.parse(result);
    if (re.dataset.length > 0) {
        $("#pnlDdlHistoricoTotal").show(500, function () {

            var JSON_chart = JSON.parse(result);

            JSON_chart.chart.caption = "HISTÓRICO DE CONSUMO";
            JSON_chart.chart.subcaption = "(Últimos 12 meses)";
            JSON_chart.chart.baseFont = "Open Sans";
            JSON_chart.chart.baseFontColor = "#6b737c";
            JSON_chart.chart.subCaptionFontColor = "#9E9C9C";
            JSON_chart.chart.captionFontSize = "16";
            JSON_chart.chart.subcaptionFontSize = "12";
            JSON_chart.chart.subcaptionFontBold = "0";
            JSON_chart.chart.captionAlignment = "left";
            JSON_chart.chart.exportFileName = "HistoricoConsumo";


            JSON_chart.chart.paletteColors = "#01B8AA";
            JSON_chart.chart.sdecimals = "0";
            JSON_chart.chart.decimals = "0";

            JSON_chart.chart.slantlabels = "0";
            JSON_chart.chart.showlegend = "0";
            JSON_chart.chart.exportenabled = "1";
            JSON_chart.chart.exportShowMenuItem = "1";
            JSON_chart.chart.subCaptionFontColor = "#9E9C9C";
            JSON_chart.chart.captionFontSize = "16";
            JSON_chart.chart.subcaptionFontSize = "12";
            JSON_chart.chart.divlineThickness = "0";
            JSON_chart.chart.legendItemFontColor = "#666666";
            JSON_chart.chart.legendItemFontSize = "10";
            JSON_chart.chart.legendShadow = "0";
            JSON_chart.chart.placeValuesInside = "1";
            JSON_chart.chart.rotateValues = "1";
            JSON_chart.chart.sformatnumber = "0";
            JSON_chart.chart.showHoverEffect = "1";
            JSON_chart.chart.showShadow = "0";
            JSON_chart.chart.showXAxisLine = "1";
            JSON_chart.chart.showYAxisValues = "1";
            JSON_chart.chart.showPercentValues = "0";
            JSON_chart.chart.showplotborder = "0";
            JSON_chart.chart.subcaptionFontBold = "0";
            JSON_chart.chart.showAlternateVGridColor = "0";
            JSON_chart.chart.valueFontColor = "#FFFFFF";
            JSON_chart.chart.xAxisLineThickness = "1";
            JSON_chart.chart.maxLabelWidthPercent = "30";

            JSON_chart.dataset.splice(1, 1);


            //var JSON_chart = JSON.parse(result[0]);
            JSON_chart.legendBorderThickness = "0";
            JSON_chart.legendShadow = "0";
            if (JSON_chart.dataset) {
                if (JSON_chart.dataset.length > 0) {
                    for (var i in JSON_chart.dataset[0].data) {
                        JSON_chart.dataset[0].data[i].color = "#01B8AA";
                        JSON_chart.dataset[0].data[i].alpha = "100";
                    }
                }
            }

            //if ((FusionCharts("chartHistoricoTotal"))) {
            //    //myChart1 = new FusionCharts("../Common/Scripts/FusionCharts/MSCombi2D.swf", "chartHistoricoTotal", "980", "227", "0");
            //    myChartHist3.dispose();
            //}
            myChartHist3 = new FusionCharts("MSCombi2D", "chartHistoricoTotal" + contador.toString(), "980", "227", "0");
            myChartHist3.setJSONData(JSON_chart);
            myChartHist3.setTransparent(true);
            myChartHist3.render("ctndCharHisTotal");
            $("#chartHistoricoTotal").css('left', '15px');
        });
    }
    else {
        //$("#pnlDdlHistoricoTotal").hide();
        $("#ctndCharHisTotal *").remove();
        $("#ctndCharHisTotal").append('<div style="font-size:medium; color:Gray; width: 980px; height: 227px;">No hay datos para mostrar.</div> ');
    }
    try {
        window.parent.fnCerrarCargaInicial();
    }
    catch (e) {
        //some err
    }
}

function MostrarHistoricoNavegacion(result) {
    var re = JSON.parse(result);
    if (re.dataset.length > 0) {
        $("#pnlDdlHistoricoNavegacion").show(500, function () {

            var JSON_chart = JSON.parse(result);

            JSON_chart.chart.caption = "HISTÓRICO DE CONSUMO";
            JSON_chart.chart.subcaption = "(Últimos 12 meses)";
            JSON_chart.chart.baseFont = "Open Sans";
            JSON_chart.chart.baseFontColor = "#6b737c";
            JSON_chart.chart.subCaptionFontColor = "#9E9C9C";
            JSON_chart.chart.captionFontSize = "16";
            JSON_chart.chart.subcaptionFontSize = "12";
            JSON_chart.chart.subcaptionFontBold = "0";
            JSON_chart.chart.captionAlignment = "left";
            JSON_chart.chart.exportFileName = "HistoricoConsumo";


            JSON_chart.chart.paletteColors = "#01B8AA";
            JSON_chart.chart.sdecimals = "0";
            JSON_chart.chart.decimals = "0";

            JSON_chart.chart.slantlabels = "0";
            JSON_chart.chart.showlegend = "0";
            JSON_chart.chart.exportenabled = "1";
            JSON_chart.chart.exportShowMenuItem = "1";
            JSON_chart.chart.subCaptionFontColor = "#9E9C9C";
            JSON_chart.chart.captionFontSize = "16";
            JSON_chart.chart.subcaptionFontSize = "12";
            JSON_chart.chart.divlineThickness = "0";
            JSON_chart.chart.legendItemFontColor = "#666666";
            JSON_chart.chart.legendItemFontSize = "10";
            JSON_chart.chart.legendShadow = "0";
            JSON_chart.chart.placeValuesInside = "1";
            JSON_chart.chart.rotateValues = "1";
            JSON_chart.chart.sformatnumber = "0";
            JSON_chart.chart.showHoverEffect = "1";
            JSON_chart.chart.showShadow = "0";
            JSON_chart.chart.showXAxisLine = "1";
            JSON_chart.chart.showYAxisValues = "1";
            JSON_chart.chart.showPercentValues = "0";
            JSON_chart.chart.showplotborder = "0";
            JSON_chart.chart.subcaptionFontBold = "0";
            JSON_chart.chart.showAlternateVGridColor = "0";
            JSON_chart.chart.valueFontColor = "#FFFFFF";
            JSON_chart.chart.xAxisLineThickness = "1";
            JSON_chart.chart.maxLabelWidthPercent = "30";

            JSON_chart.dataset.splice(1, 1);

            //var JSON_chart = JSON.parse(result[0]);
            JSON_chart.legendBorderThickness = "0";
            JSON_chart.legendShadow = "0";
            if (JSON_chart.dataset) {
                if (JSON_chart.dataset.length > 0) {
                    for (var i in JSON_chart.dataset[0].data) {
                        JSON_chart.dataset[0].data[i].color = "#01B8AA";
                        JSON_chart.dataset[0].data[i].alpha = "100";
                    }
                }
            }


            if ((FusionCharts("chartHistoricoNavegacion"))) {
                //myChart1 = new FusionCharts("../Common/Scripts/FusionCharts/MSCombi2D.swf", "chartHistoricoNavegacion", "980", "227", "0");
                myChartHist4.dispose();
            }
            myChartHist4 = new FusionCharts("MSCombi2D", "chartHistoricoNavegacion" + contador.toString(), "980", "227", "0");
            myChartHist4.setJSONData(JSON_chart);
            myChartHist4.setTransparent(true);
            myChartHist4.render("ctndCharHisNavegacion");
            $("#chartHistoricoNavegacion").css('left', '15px');
        });
    }
    else {
        //$("#pnlDdlHistoricoNavegacion").hide();
        //$("#ctndCharHisNavegacion").hide();
        $("#ctndCharHisNavegacion *").remove();
        $("#ctndCharHisNavegacion").append('<div style="font-size:medium; color:Gray; width: 980px; height: 227px;">No hay datos para mostrar.</div> ');
    }
    try {
        window.parent.fnCerrarCargaInicial();
    }
    catch (e) {
        //some err
    }
}

function dibujarTopTenArea(TipServ) {
    var prConsulta = '';
    var and = "";

    if (TipServ == 16) {        //LLAMADAS
        tipo = $("#selectTipo").val();
        Nivel = $('#ddlNivel').val();
        if (tipo == "Costo") {
            prConsulta = "Sum(X.COSTOS) TOTAL, ";
        } else if (tipo == "Llamadas") {
            prConsulta = "Sum(X.LLAMADAS) TOTAL, ";
        }
        else {
            prConsulta = "Sum(X.DURACION) / 60 TOTAL, ";
        }
    }
    else if (TipServ == 17) {        //NAVEGACION
        tipo = $("#selectTipoNavegacion").val();
        Nivel = $('#ddlNivelNavegacion').val();
        if (tipo == "Costo") {
            prConsulta = "Sum(X.COSTOS) TOTAL, ";
        } else {
            prConsulta = "Sum(X.DURACION) TOTAL, ";
        }
    }
    else if (TipServ == 18) {        //MENSAJES
        tipo = $("#selectTipoMensaje").val();
        Nivel = $('#ddlNivelMensajes').val();
        if (tipo == "Costo") {
            prConsulta = "Sum(X.COSTOS) TOTAL, ";
        } else {
            prConsulta = "Sum(X.LLAMADAS) TOTAL, ";
        }
    }
    else if (TipServ == 0) {        //MENSAJES
        tipo = $("#selectTipoTotal").val();
        Nivel = $('#ddlNivelTotal').val();
        if (tipo == "Costo") {
            prConsulta = "Sum(X.COSTOS) TOTAL, ";
        }
    }
    else {
        tipo = $("#selectTipo_" + IdDinamico).val();
        Nivel = $('#ddlNivel_' + IdDinamico).val();
        if (tipo == "Costo") {
            prConsulta = "Sum(X.COSTOS) TOTAL, ";
        } else {
            prConsulta = "Sum(X.LLAMADAS) TOTAL, ";
        }
    }


    $.ajax({
        type: "POST",
        url: "BienvenidaMovil2.aspx/obtenerSumarioDashboardTopTenJS",
        data: "{'prNomtabla': '" + "V_SUM_SC_" + $("#ddlPeriodo").val() + "'," +
              "'prTipo': '" + "M_ORGA" + "'," +
              "'prTipoConsulta': '" + prConsulta + "'," +
              "'prTop': '" + "10" + "'," +
              "'prNivel': '" + Nivel + "'," +
              "'prPeriodo': '" + $('#ddlPeriodo option:selected').val() + "'," +
              "'prServicio': '" + "Total" + "'," +
              "'prDescTipo': '" + "Costo (S/.)" + "'," +
              "'prNombreSumario': '" + "M_ORGA" + "'," +
              "'prTipoObj': '" + tipo + "'," +
              "'prTipoServ': '" + TipServ + "'," +
              "'prCodOperador': '" + $("#ddlOperador").val() + "'," +
              "'prcodGlobal': '" + ($("#selectServicio").val() == "TOTAL" ? "TOTAL" : $("#selectServicio").val()) + "'," +
              "'prAbrevMoneda': '" + $("#hdfTipoMoneda").val() + "'," +
              "'TipoLinea': '" + $("#ddlTipoLinea").val() + "'," +
              "'prSepDec': '" + $("#hdfSepDecimal").val() + "'," +
              "'prSepMil': '" + $("#hdfSepMiles").val() + "'," +
              "'inNumDec': '" + $("#hdfNumDecimales").val() + "'," +
              "'prCodSuc': '" + $("#hdfCodSucursal").val() + "'," +
              "'prAnd': '" + and + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;

            if (TipServ == 16) {
                MostrarTopTenArea(resul);
            }
            else if (TipServ == 17) {
                MostrarTopTenAreaNavegacion(resul);
            }
            else if (TipServ == 18) {
                MostrarTopTenAreaMensajes(resul);
            }
            else if (TipServ == 0) {
                MostrarTopTenAreaTotal(resul);
            }
            else {
                MostrarTopTenAreaDinamico(resul);
            }

            CargandoTaps[1] = 0;


            if (window.top.$("#hfModoCloud").val() == "0") {
                var Nametab = "tbPrincipalProducto"; //window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
                var tabPrincipal = window.parent.$("#" + Nametab);
                var indiceTab = tabPrincipal.tabs("option", "selected");
                var tabHijo = tabPrincipal.find("a")[indiceTab].hash;
                if ($("#hdfLicencia").val() == "4GVBGsuwXJDBuD3LFODkzQA=") {
                    alertaTab("No cuenta con licencia para ingresar al módulo.", null, function () {
                        tabPrincipal.tabs("remove", tabHijo);
                    });
                    setTimeout(function () {
                        tabPrincipal.tabs("remove", tabHijo);
                    }, 5000);
                }
            }

        },
        error: function (xhr, err, thrErr) {
            CargandoTaps[1] = 0;
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function MostrarTopTenArea(resul) {
    if (resul[0] == "1") {
        $("#ctndCharTA *").remove();
        $("#ctndCharTA").append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
        //$("#dvNivelLlam").hide();
    }
    else {
        var datosChart = resul[2];
        var JSON_grafico = JSON.parse(datosChart);
        var nodo = $("#ddlNivelTotal").children("option:selected")[0].text;
        JSON_grafico.chart.caption = "TOP TEN ÁREAS";
        JSON_grafico.chart.subcaption = "(NIVEL: " + nodo + " | SERVICIO: LLAMADAS)";
        JSON_grafico.chart.baseFont = "Open Sans";
        JSON_grafico.chart.baseFontColor = "#6b737c";
        JSON_grafico.chart.subCaptionFontColor = "#9E9C9C";
        JSON_grafico.chart.captionFontSize = "16";
        JSON_grafico.chart.subcaptionFontSize = "12";
        JSON_grafico.chart.subcaptionFontBold = "0";
        JSON_grafico.chart.captionAlignment = "left";
        JSON_grafico.chart.exportFileName = "Grafico";

        JSON_grafico.chart.bordercolor = "#FFFFFF";
        JSON_grafico.chart.useroundedges = "0";
        JSON_grafico.chart.showvalues = "0";
        JSON_grafico.chart.bgcolor = "#ffffff";
        JSON_grafico.chart.showCanvasBorder = "0";
        JSON_grafico.chart.canvasBgColor = "#ffffff";
        JSON_grafico.chart.plotBorderAlpha = "25";
        JSON_grafico.chart.showAlternateHGridColor = "0";
        JSON_grafico.chart.usePlotGradientColor = "0";
        JSON_grafico.chart.showAxisLines = "1";
        JSON_grafico.chart.xAxisLineColor = "#A9A9A9";
        JSON_grafico.chart.yAxisLineColor = "#FFFFFF";
        JSON_grafico.chart.axisLineAlpha = "10";
        JSON_grafico.chart.divlineColor = "#999999";
        JSON_grafico.chart.divLineIsDashed = "1";
        JSON_grafico.chart.divLineDashLen = "1";
        JSON_grafico.chart.divLineGapLen = "1";
        JSON_grafico.chart.labeldisplay = "0";
        JSON_grafico.chart.slantlabels = "1",
        JSON_grafico.chart.palette = "1";
        JSON_grafico.chart.animation = "0";
        JSON_grafico.chart.showborder = "0";
        JSON_grafico.chart.canvasbasecolor = "#CCCCCC";
        JSON_grafico.legendBorderThickness = "0";
        JSON_grafico.legendShadow = "0";
        for (var i in JSON_grafico.dataset[0].data) {
            JSON_grafico.dataset[0].data[i].alpha = "100";
            JSON_grafico.dataset[0].data[i].color = "#01B8AA";
            JSON_grafico.dataset[0].data[i].label = JSON_grafico.categories[0].category[i].label;

        }

        //if ((FusionCharts("myChartIdA"))) {
        //    myChart2.dispose();
        //}
        myChart2 = new FusionCharts("StackedBar2D", "myChartIdA" + contador.toString(), "512", "290", "0");
        myChart2.setJSONData(JSON_grafico);
        myChart2.setTransparent(true);
        myChart2.render("ctndCharTA");
        $("#dvNivelLlam").show();
    }
    $("#ctndCharTA").fadeIn(300);
}

function MostrarTopTenAreaNavegacion(resul) {
    if (resul[0] == "1") {
        $("#ctndCharTANavegacion *").remove();
        $("#ctndCharTANavegacion").append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
        //$("#dvNivelNav").hide();
    }
    else {
        var datosChart = resul[2];
        var JSON_grafico = JSON.parse(datosChart);
        var nodo = $("#ddlNivelTotal").children("option:selected")[0].text;
        JSON_grafico.chart.caption = "TOP TEN ÁREAS";
        JSON_grafico.chart.subcaption = "(NIVEL: " + nodo + " | SERVICIO: DATOS)";
        JSON_grafico.chart.baseFont = "Open Sans";
        JSON_grafico.chart.baseFontColor = "#6b737c";
        JSON_grafico.chart.subCaptionFontColor = "#9E9C9C";
        JSON_grafico.chart.captionFontSize = "16";
        JSON_grafico.chart.subcaptionFontSize = "12";
        JSON_grafico.chart.subcaptionFontBold = "0";
        JSON_grafico.chart.captionAlignment = "left";
        JSON_grafico.chart.exportFileName = "Grafico";

        JSON_grafico.chart.bordercolor = "#FFFFFF";
        JSON_grafico.chart.useroundedges = "0";
        JSON_grafico.chart.showvalues = "0";
        JSON_grafico.chart.bgcolor = "#ffffff";
        JSON_grafico.chart.showCanvasBorder = "0";
        JSON_grafico.chart.canvasBgColor = "#ffffff";
        JSON_grafico.chart.plotBorderAlpha = "25";
        JSON_grafico.chart.showAlternateHGridColor = "0";
        JSON_grafico.chart.usePlotGradientColor = "0";
        JSON_grafico.chart.showAxisLines = "1";
        JSON_grafico.chart.xAxisLineColor = "#A9A9A9";
        JSON_grafico.chart.yAxisLineColor = "#FFFFFF";
        JSON_grafico.chart.axisLineAlpha = "10";
        JSON_grafico.chart.divlineColor = "#999999";
        JSON_grafico.chart.divLineIsDashed = "1";
        JSON_grafico.chart.divLineDashLen = "1";
        JSON_grafico.chart.divLineGapLen = "1";
        JSON_grafico.chart.labeldisplay = "0";
        JSON_grafico.chart.slantlabels = "1",
        JSON_grafico.chart.palette = "1";
        JSON_grafico.chart.animation = "0";
        JSON_grafico.chart.showborder = "0";
        JSON_grafico.chart.canvasbasecolor = "#CCCCCC";
        JSON_grafico.legendBorderThickness = "0";
        JSON_grafico.legendShadow = "0";
        for (var i in JSON_grafico.dataset[0].data) {
            JSON_grafico.dataset[0].data[i].alpha = "100";
            JSON_grafico.dataset[0].data[i].color = "#01B8AA";
            JSON_grafico.dataset[0].data[i].label = JSON_grafico.categories[0].category[i].label;

        }

        //if ((FusionCharts("myChartIdANav"))) {
        //    //myChart6 = new FusionCharts("../Common/Scripts/FusionCharts/bar2D.swf", "myChartIdANav", "500", "290", "0");
        //    myChart6.dispose();
        //}
        myChart6 = new FusionCharts("StackedBar2D", "myChartIdANav" + contador.toString(), "500", "290", "0");
        myChart6.setJSONData(JSON_grafico);
        myChart6.setTransparent(true);
        myChart6.render("ctndCharTANavegacion");
        $("#dvNivelNav").show();

        //if (!(FusionCharts("myChartIdANav"))) {
        //    myChart6 = new FusionCharts("../Common/Scripts/FusionCharts/bar2D.swf", "myChartIdANav", "500", "290", "0");
        //    myChart6.setJSONData(JSON_grafico);
        //    myChart6.setTransparent(true);
        //    myChart6.render("ctndCharTANavegacion");
        //    $("#ctndCharTANavegacion").fadeIn(300);
        //    $("#dvNivelNav").show();
        //}
        //else {
        //    $("#ctndCharTANavegacion").updateFusionCharts({ dataSource: datosChart, dataFormat: "json" });
        //    $("#dvNivelNav").show();
        //}
    }
    $("#ctndCharTANavegacion").fadeIn(300);
}

function MostrarTopTenAreaMensajes(resul) {
    if (resul[0] == "1") {
        $("#ctndCharTAMensajes *").remove();
        $("#ctndCharTAMensajes").append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
        //$("#dvNivelSMS").hide();
    }
    else {
        var datosChart = resul[2];
        var JSON_grafico = JSON.parse(datosChart);
        var nodo = $("#ddlNivelTotal").children("option:selected")[0].text;
        JSON_grafico.chart.caption = "TOP TEN ÁREAS";
        JSON_grafico.chart.subcaption = "(NIVEL: " + nodo + " | SERVICIO: MENSAJES)";
        JSON_grafico.chart.baseFont = "Open Sans";
        JSON_grafico.chart.baseFontColor = "#6b737c";
        JSON_grafico.chart.subCaptionFontColor = "#9E9C9C";
        JSON_grafico.chart.captionFontSize = "16";
        JSON_grafico.chart.subcaptionFontSize = "12";
        JSON_grafico.chart.subcaptionFontBold = "0";
        JSON_grafico.chart.captionAlignment = "left";
        JSON_grafico.chart.exportFileName = "Grafico";

        JSON_grafico.chart.bordercolor = "#FFFFFF";
        JSON_grafico.chart.useroundedges = "0";
        JSON_grafico.chart.showvalues = "0";
        JSON_grafico.chart.bgcolor = "#ffffff";
        JSON_grafico.chart.showCanvasBorder = "0";
        JSON_grafico.chart.canvasBgColor = "#ffffff";
        JSON_grafico.chart.plotBorderAlpha = "25";
        JSON_grafico.chart.showAlternateHGridColor = "0";
        JSON_grafico.chart.usePlotGradientColor = "0";
        JSON_grafico.chart.showAxisLines = "1";
        JSON_grafico.chart.xAxisLineColor = "#A9A9A9";
        JSON_grafico.chart.yAxisLineColor = "#FFFFFF";
        JSON_grafico.chart.axisLineAlpha = "10";
        JSON_grafico.chart.divlineColor = "#999999";
        JSON_grafico.chart.divLineIsDashed = "1";
        JSON_grafico.chart.divLineDashLen = "1";
        JSON_grafico.chart.divLineGapLen = "1";
        JSON_grafico.chart.labeldisplay = "0";
        JSON_grafico.chart.slantlabels = "1",
        JSON_grafico.chart.palette = "1";
        JSON_grafico.chart.animation = "0";
        JSON_grafico.chart.showborder = "0";
        JSON_grafico.chart.canvasbasecolor = "#CCCCCC";
        JSON_grafico.legendBorderThickness = "0";
        JSON_grafico.legendShadow = "0";
        for (var i in JSON_grafico.dataset[0].data) {
            JSON_grafico.dataset[0].data[i].alpha = "100";
            JSON_grafico.dataset[0].data[i].color = "#01B8AA";
            JSON_grafico.dataset[0].data[i].label = JSON_grafico.categories[0].category[i].label;

        }

        //if ((FusionCharts("myChartIdAMen"))) {
        //    //myChart7 = new FusionCharts("../Common/Scripts/FusionCharts/bar2D.swf", "myChartIdAMen", "500", "290", "0");
        //    myChart7.dispose();
        //}
        myChart7 = new FusionCharts("StackedBar2D", "myChartIdAMen" + contador.toString(), "500", "290", "0");
        myChart7.setJSONData(JSON_grafico);
        myChart7.setTransparent(true);
        myChart7.render("ctndCharTAMensajes");
        $("#dvNivelSMS").show();

    }
    $("#ctndCharTAMensajes").fadeIn(300);
}

function MostrarTopTenAreaTotal(resul) {
    if (resul[0] == "1") {
        $("#ctndCharTATotal *").remove();
        $("#ctndCharTATotal").append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
        //$("#dvNivelTotal").hide();
    }

    else {
        var datosChart = resul[2];
        var JSON_grafico = JSON.parse(datosChart);
        //debugger;
        var nodo = $("#ddlNivelTotal").children("option:selected")[0].text;
        JSON_grafico.chart.caption = "TOP TEN ÁREAS";
        JSON_grafico.chart.subcaption = "(NIVEL: " + nodo + " | SERVICIO: TOTAL)";
        JSON_grafico.chart.baseFont = "Open Sans";
        JSON_grafico.chart.baseFontColor = "#6b737c";
        JSON_grafico.chart.subCaptionFontColor = "#9E9C9C";
        JSON_grafico.chart.captionFontSize = "16";
        JSON_grafico.chart.subcaptionFontSize = "12";
        JSON_grafico.chart.subcaptionFontBold = "0";
        JSON_grafico.chart.captionAlignment = "left";
        JSON_grafico.chart.exportFileName = "Grafico";

        JSON_grafico.chart.bordercolor = "#FFFFFF";
        JSON_grafico.chart.useroundedges = "0";
        JSON_grafico.chart.showvalues = "0";
        JSON_grafico.chart.bgcolor = "#ffffff";
        JSON_grafico.chart.showCanvasBorder = "0";
        JSON_grafico.chart.canvasBgColor = "#ffffff";
        JSON_grafico.chart.plotBorderAlpha = "25";
        JSON_grafico.chart.showAlternateHGridColor = "0";
        JSON_grafico.chart.usePlotGradientColor = "0";
        JSON_grafico.chart.showAxisLines = "1";
        JSON_grafico.chart.xAxisLineColor = "#A9A9A9";
        JSON_grafico.chart.yAxisLineColor = "#FFFFFF";
        JSON_grafico.chart.axisLineAlpha = "10";
        JSON_grafico.chart.divlineColor = "#999999";
        JSON_grafico.chart.divLineIsDashed = "1";
        JSON_grafico.chart.divLineDashLen = "1";
        JSON_grafico.chart.divLineGapLen = "1";
        JSON_grafico.chart.labeldisplay = "0";
        JSON_grafico.chart.slantlabels = "1",
        JSON_grafico.chart.palette = "1";
        JSON_grafico.chart.animation = "0";
        JSON_grafico.chart.showborder = "0";
        JSON_grafico.chart.canvasbasecolor = "#CCCCCC";
        JSON_grafico.legendBorderThickness = "0";
        JSON_grafico.legendShadow = "0";
        for (var i in JSON_grafico.dataset[0].data) {
            JSON_grafico.dataset[0].data[i].alpha = "100";
            JSON_grafico.dataset[0].data[i].color = "#01B8AA";
            JSON_grafico.dataset[0].data[i].label = JSON_grafico.categories[0].category[i].label;

        }

        //if ((FusionCharts("myChartIdATot"))) {
        //    //myChart11 = new FusionCharts("../Common/Scripts/FusionCharts/bar2D.swf", "myChartIdATot", "500", "290", "0");
        //    myChart11.dispose();
        //}
        myChart11 = new FusionCharts("StackedBar2D", "myChartIdATot" + contador.toString(), "500", "290", "0");
        $("#dvNivelTotal").show();
        myChart11.setJSONData(JSON_grafico);
        myChart11.setTransparent(true);
        myChart11.render("ctndCharTATotal");
        $("#dvTotalEmpleados").show();
    }
    $("#ctndCharTATotal").fadeIn(300);
}

function dibujarTopTenEmpleado(TipServ) {
    var prConsulta = '';
    var and = "";

    if (TipServ == 16) {        //LLAMADAS
        tipo = $("#selectTipo").val();
        Nivel = $('#ddlNivel').val();

        if (tipo == "Costo") {
            prConsulta = "Sum(X.COSTO) TOTAL, ";
        } else if (tipo == "Llamadas") {
            prConsulta = "Sum(X.LLAMADAS) TOTAL, ";
        }
        else {
            prConsulta = "Sum(X.DURACION) / 60 TOTAL, ";
        }
    }
    else if (TipServ == 17) {        //NAVEGACION
        tipo = $("#selectTipoNavegacion").val();
        Nivel = $('#ddlNivelNavegacion').val();

        if (tipo == "Costo") {
            prConsulta = "Sum(X.COSTO) TOTAL, ";
        } else {
            prConsulta = "Sum(X.DURACION) TOTAL, ";
        }
    }
    else if (TipServ == 18) {        //MENSAJES
        tipo = $("#selectTipoMensaje").val();
        Nivel = $('#ddlNivelMensajes').val();

        if (tipo == "Costo") {
            prConsulta = "Sum(X.COSTO) TOTAL, ";
        } else {
            prConsulta = "Sum(X.LLAMADAS) TOTAL, ";
        }
    }
    else if (TipServ == 0) {        //MENSAJES
        tipo = $("#selectTipoTotal").val();
        Nivel = $('#ddlNivelTotal').val();

        if (tipo == "Costo") {
            prConsulta = "Sum(X.COSTO) TOTAL, ";
        }
    }
    else {
        tipo = $("#selectTipo_" + IdDinamico).val();
        Nivel = $('#ddlNivel_' + IdDinamico).val();

        if (tipo == "Costo") {
            prConsulta = "Sum(X.COSTO) TOTAL, ";
        } else {
            prConsulta = "Sum(X.LLAMADAS) TOTAL, ";
        }
    }

    $.ajax({
        type: "POST",
        url: "BienvenidaMovil2.aspx/obtenerSumarioDashboardTopTenJS",
        data: "{'prNomtabla': '" + "V_SUM_SC_" + $("#ddlPeriodo").val() + "'," +
              "'prTipo': '" + "M_EMPL" + "'," +
              "'prTipoConsulta': '" + prConsulta + "'," +
              "'prTop': '" + "10" + "'," +
              "'prNivel': '" + Nivel + "'," +
              "'prPeriodo': '" + $('#ddlPeriodo option:selected').val() + "'," +
              "'prServicio': '" + "Total" + "'," +
              "'prDescTipo': '" + "Monto (" + $("#hdfTipoMoneda").val() + ")" + "'," +
              "'prNombreSumario': '" + "M_EMPL" + "'," +
              "'prTipoObj': '" + tipo + "'," +
              "'prTipoServ': '" + TipServ + "'," +
              "'prCodOperador': '" + $("#ddlOperador").val() + "'," +
              "'prcodGlobal': '" + ($("#selectServicio").val() == "TOTAL" ? "TOTAL" : $("#selectServicio").val()) + "'," +
              "'prAbrevMoneda': '" + $("#hdfTipoMoneda").val() + "'," +
              "'prSepDec': '" + $("#hdfSepDecimal").val() + "'," +
              "'TipoLinea': '" + $("#ddlTipoLinea").val() + "'," +
              "'prSepMil': '" + $("#hdfSepMiles").val() + "'," +
              "'inNumDec': '" + $("#hdfNumDecimales").val() + "'," +
              "'prCodSuc': '" + $("#hdfCodSucursal").val() + "'," +
              "'prAnd': '" + and + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;
            if (TipServ == 16) {
                MostrarTopTenEmpleado(resul);
            }
            else if (TipServ == 17) {
                MostrarTopTenEmpleadoNavegacion(resul);
            }
            else if (TipServ == 18) {
                MostrarTopTenEmpleadoMensajes(resul);
            }
            else if (TipServ == 0) {
                MostrarTopTenEmpleadoTotal(resul);
            }
            else {
                MostrarTopTenEmpleadoDinamico(resul);
            }
            CargandoTaps[2] = 0;
        },
        error: function (xhr, err, thrErr) {
            CargandoTaps[2] = 0;
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function MostrarTopTenEmpleado(resul) {
    if (resul[0] == "1") {
        $("#ctndCharTE *").remove();
        $("#ctndCharTE").append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
        $("#dvLlamadasEmple").hide();
    }
    else {
        var datosChart = resul[2];
        var JSON_grafico = JSON.parse(datosChart);
        var nodo = $("#ddlNivelTotal").children("option:selected")[0].text;

        JSON_grafico.chart.caption = "TOP TEN EMPLEADOS";
        JSON_grafico.chart.subcaption = "(NIVEL: " + nodo + " | SERVICIO: LLAMADAS)";
        JSON_grafico.chart.baseFont = "Open Sans";
        JSON_grafico.chart.baseFontColor = "#6b737c";
        JSON_grafico.chart.subCaptionFontColor = "#9E9C9C";
        JSON_grafico.chart.captionFontSize = "16";
        JSON_grafico.chart.subcaptionFontSize = "12";
        JSON_grafico.chart.subcaptionFontBold = "0";
        JSON_grafico.chart.captionAlignment = "left";
        JSON_grafico.chart.exportFileName = "Grafico";

        JSON_grafico.chart.bordercolor = "#FFFFFF";
        JSON_grafico.chart.useroundedges = "0";
        JSON_grafico.chart.showvalues = "0";
        JSON_grafico.chart.bgcolor = "#ffffff";
        JSON_grafico.chart.showCanvasBorder = "0";
        JSON_grafico.chart.canvasBgColor = "#ffffff";
        JSON_grafico.chart.plotBorderAlpha = "25";
        JSON_grafico.chart.showAlternateHGridColor = "0";
        JSON_grafico.chart.usePlotGradientColor = "0";
        JSON_grafico.chart.showAxisLines = "1";
        JSON_grafico.chart.xAxisLineColor = "#A9A9A9";
        JSON_grafico.chart.yAxisLineColor = "#FFFFFF";
        JSON_grafico.chart.axisLineAlpha = "10";
        JSON_grafico.chart.divlineColor = "#999999";
        JSON_grafico.chart.divLineIsDashed = "1";
        JSON_grafico.chart.divLineDashLen = "1";
        JSON_grafico.chart.divLineGapLen = "1";
        JSON_grafico.chart.labeldisplay = "0";
        JSON_grafico.chart.slantlabels = "1",
        JSON_grafico.chart.palette = "1";
        JSON_grafico.chart.animation = "0";
        JSON_grafico.chart.showborder = "0";
        JSON_grafico.chart.canvasbasecolor = "#CCCCCC";
        JSON_grafico.legendBorderThickness = "0";
        JSON_grafico.legendShadow = "0";
        for (var i in JSON_grafico.dataset[0].data) {
            JSON_grafico.dataset[0].data[i].alpha = "100";
            JSON_grafico.dataset[0].data[i].color = "#01B8AA";
            JSON_grafico.dataset[0].data[i].label = JSON_grafico.categories[0].category[i].label;
        }

        //if ((FusionCharts("myChartIdE"))) {
        //    //myChart3 = new FusionCharts("../Common/Scripts/FusionCharts/bar2D.swf", "myChartIdE", "512", "290", "0");
        //    myChart3.dispose();
        //}
        myChart3 = new FusionCharts("StackedBar2D", "myChartIdE" + contador.toString(), "512", "290", "0");
        myChart3.setJSONData(JSON_grafico);
        myChart3.setTransparent(true);
        myChart3.render("ctndCharTE");
        $("#dvLlamadasEmple").show();
    }
    $("#ctndCharTE").fadeIn(300);
}

function MostrarTopTenEmpleadoNavegacion(resul) {
    if (resul[0] == "1") {
        $("#ctndCharTENavegacion *").remove();
        $("#ctndCharTENavegacion").append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
        $("#dvDatosEmpleados").hide();
    }
    else {
        var datosChart = resul[2];
        var JSON_grafico = JSON.parse(datosChart);
        var nodo = $("#ddlNivelTotal").children("option:selected")[0].text;

        JSON_grafico.chart.caption = "TOP TEN EMPLEADOS";
        JSON_grafico.chart.subcaption = "(NIVEL: " + nodo + " | SERVICIO: DATOS)";
        JSON_grafico.chart.baseFont = "Open Sans";
        JSON_grafico.chart.baseFontColor = "#6b737c";
        JSON_grafico.chart.subCaptionFontColor = "#9E9C9C";
        JSON_grafico.chart.captionFontSize = "16";
        JSON_grafico.chart.subcaptionFontSize = "12";
        JSON_grafico.chart.subcaptionFontBold = "0";
        JSON_grafico.chart.captionAlignment = "left";
        JSON_grafico.chart.exportFileName = "Grafico";

        JSON_grafico.chart.bordercolor = "#FFFFFF";
        JSON_grafico.chart.useroundedges = "0";
        JSON_grafico.chart.showvalues = "0";
        JSON_grafico.chart.bgcolor = "#ffffff";
        JSON_grafico.chart.showCanvasBorder = "0";
        JSON_grafico.chart.canvasBgColor = "#ffffff";
        JSON_grafico.chart.plotBorderAlpha = "25";
        JSON_grafico.chart.showAlternateHGridColor = "0";
        JSON_grafico.chart.usePlotGradientColor = "0";
        JSON_grafico.chart.showAxisLines = "1";
        JSON_grafico.chart.xAxisLineColor = "#A9A9A9";
        JSON_grafico.chart.yAxisLineColor = "#FFFFFF";
        JSON_grafico.chart.axisLineAlpha = "10";
        JSON_grafico.chart.divlineColor = "#999999";
        JSON_grafico.chart.divLineIsDashed = "1";
        JSON_grafico.chart.divLineDashLen = "1";
        JSON_grafico.chart.divLineGapLen = "1";
        JSON_grafico.chart.labeldisplay = "0";
        JSON_grafico.chart.slantlabels = "1",
        JSON_grafico.chart.palette = "1";
        JSON_grafico.chart.animation = "0";
        JSON_grafico.chart.showborder = "0";
        JSON_grafico.chart.canvasbasecolor = "#CCCCCC";
        JSON_grafico.legendBorderThickness = "0";
        JSON_grafico.legendShadow = "0";
        for (var i in JSON_grafico.dataset[0].data) {
            JSON_grafico.dataset[0].data[i].alpha = "100";
            JSON_grafico.dataset[0].data[i].color = "#01B8AA";
            JSON_grafico.dataset[0].data[i].label = JSON_grafico.categories[0].category[i].label;
        }

        //if ((FusionCharts("myChartIdENav"))) {
        //    //myChart9 = new FusionCharts("../Common/Scripts/FusionCharts/bar2D.swf", "myChartIdENav", "512", "290", "0");
        //    myChart9.dispose();
        //}
        myChart9 = new FusionCharts("StackedBar2D", "myChartIdENav" + contador.toString(), "512", "290", "0");
        myChart9.setJSONData(JSON_grafico);
        myChart9.setTransparent(true);
        myChart9.render("ctndCharTENavegacion");
        $("#dvDatosEmpleados").show();
    }
    $("#ctndCharTENavegacion").fadeIn(300);
}

function MostrarTopTenEmpleadoMensajes(resul) {
    if (resul[0] == "1") {
        $("#ctndCharTEMensajes *").remove();
        $("#ctndCharTEMensajes").append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
        $("#dvSMSEmpleados").hide();
    }
    else {
        var datosChart = resul[2];
        var JSON_grafico = JSON.parse(datosChart);
        var nodo = $("#ddlNivelTotal").children("option:selected")[0].text;

        JSON_grafico.chart.caption = "TOP TEN EMPLEADOS";
        JSON_grafico.chart.subcaption = "(NIVEL: " + nodo + " | SERVICIO: MENSAJES)";
        JSON_grafico.chart.baseFont = "Open Sans";
        JSON_grafico.chart.baseFontColor = "#6b737c";
        JSON_grafico.chart.subCaptionFontColor = "#9E9C9C";
        JSON_grafico.chart.captionFontSize = "16";
        JSON_grafico.chart.subcaptionFontSize = "12";
        JSON_grafico.chart.subcaptionFontBold = "0";
        JSON_grafico.chart.captionAlignment = "left";
        JSON_grafico.chart.exportFileName = "Grafico";

        JSON_grafico.chart.bordercolor = "#FFFFFF";
        JSON_grafico.chart.useroundedges = "0";
        JSON_grafico.chart.showvalues = "0";
        JSON_grafico.chart.bgcolor = "#ffffff";
        JSON_grafico.chart.showCanvasBorder = "0";
        JSON_grafico.chart.canvasBgColor = "#ffffff";
        JSON_grafico.chart.plotBorderAlpha = "25";
        JSON_grafico.chart.showAlternateHGridColor = "0";
        JSON_grafico.chart.usePlotGradientColor = "0";
        JSON_grafico.chart.showAxisLines = "1";
        JSON_grafico.chart.xAxisLineColor = "#A9A9A9";
        JSON_grafico.chart.yAxisLineColor = "#FFFFFF";
        JSON_grafico.chart.axisLineAlpha = "10";
        JSON_grafico.chart.divlineColor = "#999999";
        JSON_grafico.chart.divLineIsDashed = "1";
        JSON_grafico.chart.divLineDashLen = "1";
        JSON_grafico.chart.divLineGapLen = "1";
        JSON_grafico.chart.labeldisplay = "0";
        JSON_grafico.chart.slantlabels = "1",
        JSON_grafico.chart.palette = "1";
        JSON_grafico.chart.animation = "0";
        JSON_grafico.chart.showborder = "0";
        JSON_grafico.chart.canvasbasecolor = "#CCCCCC";
        JSON_grafico.legendBorderThickness = "0";
        JSON_grafico.legendShadow = "0";
        for (var i in JSON_grafico.dataset[0].data) {
            JSON_grafico.dataset[0].data[i].alpha = "100";
            JSON_grafico.dataset[0].data[i].color = "#01B8AA";
            JSON_grafico.dataset[0].data[i].label = JSON_grafico.categories[0].category[i].label;
        }

        //if ((FusionCharts("myChartIdEMen"))) {
        //    //myChart8 = new FusionCharts("../Common/Scripts/FusionCharts/bar2D.swf", "myChartIdEMen", "512", "290", "0");
        //    myChart8.dispose();
        //}
        myChart8 = new FusionCharts("StackedBar2D", "myChartIdEMen" + contador.toString(), "512", "290", "0");
        myChart8.setJSONData(JSON_grafico);
        myChart8.setTransparent(true);
        myChart8.render("ctndCharTEMensajes");
        $("#dvSMSEmpleados").show();
    }
    $("#ctndCharTEMensajes").fadeIn(300);
}

function MostrarTopTenEmpleadoTotal(resul) {

    if (resul[0] == "1") {
        $("#ctndCharTETotal *").remove();
        $("#ctndCharTETotal").append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
        $("#dvTotalEmpleados").hide();
    }
    else {
        var datosChart = resul[2];
        var JSON_grafico = JSON.parse(datosChart);
        //debugger;k
        var nodo = $("#ddlNivelTotal").children("option:selected")[0].text;

        JSON_grafico.chart.caption = "TOP TEN EMPLEADOS";
        JSON_grafico.chart.subcaption = "(NIVEL: " + nodo + " | SERVICIO: TOTAL)";
        JSON_grafico.chart.baseFont = "Open Sans";
        JSON_grafico.chart.baseFontColor = "#6b737c";
        JSON_grafico.chart.subCaptionFontColor = "#9E9C9C";
        JSON_grafico.chart.captionFontSize = "16";
        JSON_grafico.chart.subcaptionFontSize = "12";
        JSON_grafico.chart.subcaptionFontBold = "0";
        JSON_grafico.chart.captionAlignment = "left";
        JSON_grafico.chart.exportFileName = "Grafico";

        JSON_grafico.chart.bordercolor = "#FFFFFF";
        JSON_grafico.chart.useroundedges = "0";
        JSON_grafico.chart.showvalues = "0";
        JSON_grafico.chart.bgcolor = "#ffffff";
        JSON_grafico.chart.showCanvasBorder = "0";
        JSON_grafico.chart.canvasBgColor = "#ffffff";
        JSON_grafico.chart.plotBorderAlpha = "25";
        JSON_grafico.chart.showAlternateHGridColor = "0";
        JSON_grafico.chart.usePlotGradientColor = "0";
        JSON_grafico.chart.showAxisLines = "1";
        JSON_grafico.chart.xAxisLineColor = "#A9A9A9";
        JSON_grafico.chart.yAxisLineColor = "#FFFFFF";
        JSON_grafico.chart.axisLineAlpha = "10";
        JSON_grafico.chart.divlineColor = "#999999";
        JSON_grafico.chart.divLineIsDashed = "1";
        JSON_grafico.chart.divLineDashLen = "1";
        JSON_grafico.chart.divLineGapLen = "1";
        JSON_grafico.chart.labeldisplay = "0";
        JSON_grafico.chart.slantlabels = "1",
        JSON_grafico.chart.palette = "1";
        JSON_grafico.chart.animation = "0";
        JSON_grafico.chart.showborder = "0";
        JSON_grafico.chart.canvasbasecolor = "#CCCCCC";
        JSON_grafico.legendBorderThickness = "0";
        JSON_grafico.legendShadow = "0";
        for (var i in JSON_grafico.dataset[0].data) {
            JSON_grafico.dataset[0].data[i].alpha = "100";
            JSON_grafico.dataset[0].data[i].color = "#01B8AA";
            JSON_grafico.dataset[0].data[i].label = JSON_grafico.categories[0].category[i].label;

        }

        //if ((FusionCharts("myChartIdETot"))) {
        //    //myChart10 = new FusionCharts("../Common/Scripts/FusionCharts/bar2d.swf", "myChartIdETot", "512", "290", "0");
        //    myChart10.dispose(); 
        //}
        myChart10 = new FusionCharts("StackedBar2D", "myChartIdETot" + contador.toString(), "512", "290", "0");
        myChart10.setJSONData(JSON_grafico);
        myChart10.setTransparent(true);
        myChart10.render("ctndCharTETotal");
        $("#dvTotalEmpleados").show();
    }
    $("#ctndCharTETotal").fadeIn(300);
}

function dibujarPie() {
    var nomTabla = "V_SUM_SC_";

    $.ajax({
        type: "POST",
        url: "BienvenidaMovil2.aspx/obtenerPieDash",
        data: "{'prNomTabla': '" + nomTabla + $("#ddlPeriodo").val() + "'," +
                "'prCodOperador': '" + $("#ddlOperador").val() + "'," +
                "'prCodsuc': '" + $("#hdfCodSucursal").val() + "'," +
                "'prEsAdmin': '" + $("#hdfAdmin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            MostrarPie(resultado.d);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}
function MostrarPie(resul) {
    if (resul[0] == "1") {
        $("#ctndGrilla *").remove();
        $("#ctndCharPie *").remove();
        $("#ctndGrilla").empty();
        $("#ctndCharPie").append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
        $("#ctndGrilla").append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
    }
    else {
        var columnas = JSON.parse(resul[0]);
        var datos = JSON.parse(resul[1]);
        var datosChart = resul[2];

        var JSON_chart = JSON.parse(datosChart);

        JSON_chart.chart.caption = "DISTRIBUCIÓN DE COSTO (" + oCulturaUsuario.Moneda.vcSimMon + ") POR TIPO DE SERVICIO (%)";
        JSON_chart.chart.subcaption = "(Según montos asignados)";
        JSON_chart.chart.baseFont = "Open Sans";
        JSON_chart.chart.baseFontColor = "#6b737c";
        JSON_chart.chart.subCaptionFontColor = "#9E9C9C";
        JSON_chart.chart.captionFontSize = "16";
        JSON_chart.chart.subcaptionFontSize = "12";
        JSON_chart.chart.subcaptionFontBold = "0";
        JSON_chart.chart.captionAlignment = "left";
        JSON_chart.chart.exportFileName = "DistribucionCosto";

        JSON_chart.chart.numberPrefix = oCulturaUsuario.Moneda.vcSimMon;
        JSON_chart.chart.numberSuffix = "";
        JSON_chart.chart.showvalues = "1";
        JSON_chart.chart.showlabels = "0";
        JSON_chart.chart.slantlabels = "0";
        JSON_chart.chart.legendBorderThickness = "0";
        JSON_chart.chart.legendPosition = "right";
        JSON_chart.chart.legendBgColor = "#ffffff";
        JSON_chart.chart.showlegend = "1";
        JSON_chart.chart.exportenabled = "1";
        JSON_chart.chart.exportShowMenuItem = "1";
        JSON_chart.chart.subCaptionFontColor = "#9E9C9C";
        JSON_chart.chart.divlineThickness = "0";
        JSON_chart.chart.legendItemFontColor = "#666666";
        JSON_chart.chart.legendItemFontSize = "13";
        JSON_chart.chart.legendShadow = "0";
        JSON_chart.chart.placeValuesInside = "1";
        JSON_chart.chart.rotateValues = "1";
        JSON_chart.chart.sformatnumber = "0";
        JSON_chart.chart.showHoverEffect = "1";
        JSON_chart.chart.showShadow = "0";
        JSON_chart.chart.showXAxisLine = "1";
        JSON_chart.chart.showYAxisValues = "1";
        JSON_chart.chart.showPercentValues = "1";
        JSON_chart.chart.showplotborder = "0";
        JSON_chart.chart.showAlternateVGridColor = "0";
        JSON_chart.chart.valueFontColor = "#FFFFFF";
        JSON_chart.chart.xAxisLineThickness = "1";
        JSON_chart.chart.maxLabelWidthPercent = "30";
        JSON_chart.chart.toolTipColor = "#ffffff";
        JSON_chart.chart.use3DLighting = "0";
        JSON_chart.chart.startingAngle = "0";
        JSON_chart.chart.decimals = "2";
        JSON_chart.chart.toolTipBorderThickness = "0";
        JSON_chart.chart.toolTipBgColor = "#000000";
        JSON_chart.chart.toolTipBgAlpha = "80";
        JSON_chart.chart.toolTipBorderRadius = "2";
        JSON_chart.chart.toolTipPadding = "5";
        JSON_chart.chart.paletteColors = "#FFE019,#1D43A4,#78DC27,#0E2443,#1975EA";
        JSON_chart.chart.useroundedges = "0";
        JSON_chart.chart.slicingDistance = "15";
        JSON_chart.chart.pieRadius = "75";

        //cadena2 = cadena2 + '"numberPrefix": "' + oCulturaUsuario.Moneda.vcSimMon + '","legendBorderThickness": "0","legendShadow":"0","legendPosition": "right",';
        //cadena2 = cadena2 + '"showPercentValues": "1", "showPercentInTooltip": "0", "enableSmartLabels": "0", "enableMultiSlicing": "0", "decimals": "' + oCulturaUsuario.dcNumDec + '",';
        //cadena2 = cadena2 + '"": "0", "showvalues": "1", "showlabels": "0", "showLegend": "1", "labelDistance": "0", "": "15",';
        //cadena2 = cadena2 + '"": "50", "bgColor": "#ffffff", "showBorder": "0", "usePlotGradientColor": "0", "useDataPlotColorForLabels": "1"';
        //cadena2 = cadena2 + '},"legendborderalpha": "0", "data": [';

        var elemento;
        for (var i = 0; i < JSON_chart.data.length; i++) {
            vcColor = '';
            if (i == 0) { vcColor = "#01B8AA"; }
            if (i == 1) { vcColor = "#FE6260"; }
            if (i == 2) { vcColor = "#EDC911"; }
            if (i == 3) { vcColor = "#8CD4E1"; }
            if (i == 4) { vcColor = "#7687A6"; }
            if (i == 5) { vcColor = "#A66999"; }
            if (i == 6) { vcColor = "#7990FF"; }
            if (i == 7) { vcColor = "#B687AC"; }

            elemento = JSON_chart.data[i];
            if (vcColor != '') {
                elemento.color = vcColor;
            }
            elemento.alpha = '100';

            elemento.value = elemento.value.replace(",", ".");

        }

        $("#ctndGrilla *").remove();
        $("#ctndCharPie *").remove();


        $("#ctndGrilla").empty();
        $("#ctndGrilla").append('<table id="tbSumario"></table>');

        $("#tbSumario").jqGrid({
            datatype: "local",
            colModel: columnas,
            data: datos,
            gridview: true,
            emptyrecords: "No hay datos que mostrar",
            viewrecords: true,
            width: 340,
            height: 200,
            rownumbers: false,
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pagerTbSumario'
        });

        $("#ctndCharPie").empty();

        if (!(FusionCharts("myChartIdPie"))) {
            //myChart4 = new FusionCharts("../Common/Scripts/FusionCharts/doughnut2d.swf", "myChartIdPie", "545", "200", "0");
            var myChart4 = new FusionCharts("doughnut2d", "myChartIdPie", "100%", "295", "0");
        }
        
        myChart4.setJSONData(JSON_chart);
        myChart4.setTransparent(true);
        myChart4.render("ctndCharPie");

    }

    $("#ctndCharPie").fadeIn(300);
    $("#ctndGrilla").fadeIn(300);
}

//function ObtenerCodigoModelo(codEmp, CodIMEI) {
//    var vcTipSol = $("#hdfSolicitud").val();
//    $.ajax({
//        type: "POST",
//        url: "Administrar/Adm_SolicitarDispositivo.aspx/ObtenerCodigoModelo",
//        data: "{'vcCodEmp': '" + codEmp + "'," +
//                    "'vcCodIMEI': '" + CodIMEI + "'," +
//                    "'vcTipSol': '" + "1" + "'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            $("#hdfNuevoDispositivo").val(result.d);

//            $.ajax({
//                type: "POST",
//                url: "Adm_SolicitarDispositivo.aspx/ObtenerCantidadDispositivos",
//                data: "{'vcCodEmp': '" + codEmp + "'}",
//                contentType: "application/json; charset=utf-8",
//                dataType: "json",
//                success: function (res) {
//                    document.getElementById('divTabs').style.display = '';
//                    document.getElementById('trFrames').style.display = '';
//                    if (result.d == 0) {
//                        if (res.d == 0) {//Varios elementos
//                            $("#ifNuevoEquipo").attr("src", "");
//                            if ($("#hdfSolicitud").val() == "2") {
//                                document.getElementById('divTabs').style.display = 'none';
//                                document.getElementById('trFrames').style.display = 'none';
//                            }
//                        }
//                        else if (res.d > 0) {//un solo elemento y se esta enviando el id del modelo
//                            $("#hdfNuevoDispositivo").val(res.d);
//                            $("#ifNuevoEquipo").attr("src", "Mantenimiento/Mnt_NuevoDispositivo.aspx?CodDis=" + res.d);
//                            $("#btnSolicitar").val("Enviar");
//                        }
//                        else {//valor -1 indica que no existen elementos
//                            $("#ifNuevoEquipo").attr("src", "");
//                            if ($("#hdfSolicitud").val() == "2") {
//                                $("#lblMensaje").html("No existen modelos a elegir");
//                                $("#btnSolicitar").button("option", "disabled", true);
//                                document.getElementById('divTabs').style.display = 'none';
//                                document.getElementById('trFrames').style.display = 'none';
//                            }
//                        }
//                    }
//                    else {
//                        $("#ifNuevoEquipo").attr("src", "Mantenimiento/Mnt_NuevoDispositivo.aspx?CodDis=" + $("#hdfNuevoDispositivo").val());
//                    }
//                },
//                error: function (xhr, err, thrErr) {
//                    MostrarErrorAjax(xhr, err, thrErr);
//                }
//            });
//        },
//        error: function (xhr, err, thrErr) {
//            MostrarErrorAjax(xhr, err, thrErr);
//        }
//    });
//}

function fnDiseno() {
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


}

function fnEventos() {
    $('.Tap').click(function () {
        if (VerificarCargando()) {
            return;
        }
        var miId = $(this).attr("id");
        $("#pnlMensajes").addClass("esNoVisible");
        $("#pnlNavegacion").addClass("esNoVisible");
        $("#pnlTotal").addClass("esNoVisible");
        $('.Tap').removeClass("ui-state-active-TAB");
        $('.Tap').addClass("TapNoSelecionado");
        $(this).removeClass("TapNoSelecionado");
        $(this).addClass("ui-state-active-TAB");

        CargandoTaps[0] = 1;
        CargandoTaps[1] = 1;
        CargandoTaps[2] = 1;

        switch (miId.toString().toLowerCase()) {
            //case "TapLLAMADAS":
            //case "TapLlamadas":
            case "tap16":
                idTapTipoServ = $(this).attr("cod");
                if ($("#pnlLlamadas").hasClass("esNoVisible")) {
                    //$(".DivDinamico").hide();
                    $(".DivDinamico").addClass("esNoVisible");
                    $("#pnlLlamadas").removeClass("esNoVisible");
                    $("#pnlMensajes").addClass("esNoVisible");
                    $("#pnlNavegacion").addClass("esNoVisible");
                    $("#pnlTotal").addClass("esNoVisible");
                    if ($("#hdfCodOrganizacion").val() == '') {
                        //$("#pnlLlamadas").fadeIn(300);
                        $("#pnlCuerpo").height(305);
                    } else {
                        //$("#pnlLlamadas").fadeIn(300);
                        $("#pnlCuerpo").height(620);
                    }
                    if (!verTapLlamadas) {
                        verTapLlamadas = true;
                        dibujarHistorico(idTapTipoServ);
                        dibujarTopTenArea(idTapTipoServ);
                        dibujarTopTenEmpleado(idTapTipoServ);
                    }
                    else {
                        CargandoTaps[0] = 0;
                        CargandoTaps[1] = 0;
                        CargandoTaps[2] = 0;
                    }
                }
                else {
                    CargandoTaps[0] = 0;
                    CargandoTaps[1] = 0;
                    CargandoTaps[2] = 0;
                }

                break;
                //case "TapMENSAJES":
                //case "TapMensajes":
            case "tap18":
                idTapTipoServ = $(this).attr("cod");
                if ($("#pnlMensajes").hasClass("esNoVisible")) {
                    //$(".DivDinamico").hide();
                    $(".DivDinamico").addClass("esNoVisible");
                    $("#pnlMensajes").removeClass("esNoVisible");
                    $("#pnlLlamadas").addClass("esNoVisible");
                    $("#pnlNavegacion").addClass("esNoVisible");
                    $("#pnlTotal").addClass("esNoVisible");
                    if ($("#hdfCodOrganizacion").val() == '') {
                        //$("#pnlLlamadas").fadeIn(300);
                        $("#pnlCuerpo").height(305);
                    } else {
                        //$("#pnlLlamadas").fadeIn(300);
                        $("#pnlCuerpo").height(620);
                    }
                    //$("#pnlCuerpo").height(620);
                    if (!verTapMensajes) {
                        verTapMensajes = true;
                        dibujarHistorico(idTapTipoServ);
                        dibujarTopTenArea(idTapTipoServ);
                        dibujarTopTenEmpleado(idTapTipoServ);
                    }
                    else {
                        CargandoTaps[0] = 0;
                        CargandoTaps[1] = 0;
                        CargandoTaps[2] = 0;
                    }
                    //                    $("#pnlCuerpo").height(fnCalcularAltoProceso() + 3);
                }
                else {
                    CargandoTaps[0] = 0;
                    CargandoTaps[1] = 0;
                    CargandoTaps[2] = 0;
                }
                break;
                //case "TapDATOS":
                //case "TapDatos":
            case "tap17":
                idTapTipoServ = $(this).attr("cod");
                if ($("#pnlNavegacion").hasClass("esNoVisible")) {
                    //$(".DivDinamico").hide();
                    $(".DivDinamico").addClass("esNoVisible");
                    $("#pnlNavegacion").removeClass("esNoVisible");
                    $("#pnlLlamadas").addClass("esNoVisible");
                    $("#pnlMensajes").addClass("esNoVisible");
                    $("#pnlTotal").addClass("esNoVisible");
                    if ($("#hdfCodOrganizacion").val() == '') {
                        //$("#pnlLlamadas").fadeIn(300);
                        $("#pnlCuerpo").height(305);
                    } else {
                        //$("#pnlLlamadas").fadeIn(300);
                        $("#pnlCuerpo").height(620);
                    }
                    //$("#pnlCuerpo").height(620);
                    if (!verTapNavegacion) {
                        verTapNavegacion = true;
                        dibujarHistorico(idTapTipoServ);
                        dibujarTopTenArea(idTapTipoServ);
                        dibujarTopTenEmpleado(idTapTipoServ);
                    }
                    else {
                        CargandoTaps[0] = 0;
                        CargandoTaps[1] = 0;
                        CargandoTaps[2] = 0;
                    }
                    //                    $("#pnlCuerpo").height(fnCalcularAltoProceso() + 3);                    
                }
                else {
                    CargandoTaps[0] = 0;
                    CargandoTaps[1] = 0;
                    CargandoTaps[2] = 0;
                }
                break;

            case ("TapTotal").toLowerCase():
                idTapTipoServ = $(this).attr("cod");
                if ($("#pnlTotal").hasClass("esNoVisible")) {
                    //$(".DivDinamico").hide();
                    $(".DivDinamico").addClass("esNoVisible");
                    $("#pnlTotal").removeClass("esNoVisible");
                    $("#pnlLlamadas").addClass("esNoVisible");
                    $("#pnlMensajes").addClass("esNoVisible");
                    $("#pnlNavegacion").addClass("esNoVisible");
                    if ($("#hdfCodOrganizacion").val() == '') {
                        //$("#pnlLlamadas").fadeIn(300);
                        $("#pnlCuerpo").height(305);
                    } else {
                        //$("#pnlLlamadas").fadeIn(300);
                        $("#pnlCuerpo").height(620);
                    }
                    //$("#pnlCuerpo").height(620);
                    if (!verTapTotal) {
                        verTapTotal = true;
                        dibujarHistorico(idTapTipoServ);
                        dibujarTopTenArea(idTapTipoServ);
                        dibujarTopTenEmpleado(idTapTipoServ);
                    }
                    else {
                        CargandoTaps[0] = 0;
                        CargandoTaps[1] = 0;
                        CargandoTaps[2] = 0;
                    }
                    //                    $("#pnlCuerpo").height(fnCalcularAltoProceso() + 3);                    
                }
                else {
                    CargandoTaps[0] = 0;
                    CargandoTaps[1] = 0;
                    CargandoTaps[2] = 0;
                }
                break;

            default:
                IdDinamico = miId;
                idTapTipoServ = $(this).attr("cod");
                $("#pnlCuerpo > div").addClass("esNoVisible");
                if ($("#DvPnl_" + miId).length > 0) {
                    //$("#DvPnl_" + miId).show();
                    $("#DvPnl_" + miId).removeClass("esNoVisible");

                    CargandoTaps[0] = 0;
                    CargandoTaps[1] = 0;
                    CargandoTaps[2] = 0;
                }
                else {
                    $("#pnlCuerpo").append(fnObtenerCuerpoTapGenerico(miId));
                    fnNuevasInstanciasDinamicas(miId);

                    dibujarHistorico(idTapTipoServ);
                    dibujarTopTenArea(idTapTipoServ);
                    dibujarTopTenEmpleado(idTapTipoServ);

                }
                break;

        }
    });
}

function ObtenerCodigoModelo(codEmp, CodIMEI) {
    $.ajax({
        type: "POST",
        url: "Administrar/Adm_SolicitarDispositivo.aspx/ObtenerCodigoModelo",
        data: "{'vcCodEmp': '" + codEmp + "'," +
                    "'vcCodIMEI': '" + CodIMEI + "'," +
                    "'vcTipSol': '" + "1" + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#hdfNuevoDispositivo").val(result.d);
            $.ajax({
                type: "POST",
                url: "Administrar/Adm_SolicitarDispositivo.aspx/ObtenerCantidadDispositivos",
                data: "{'vcCodEmp': '" + codEmp + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (res) {

                    if (result.d == 0) {
                        if (res.d == 0) {//Varios elementos
                            $("#ifNuevoEquipo").attr("src", "");
                        }
                        else if (res.d > 0) {//un solo elemento y se esta enviando el id del modelo
                            $("#ifNuevoEquipo").attr("src", "Administrar/Mantenimiento/Mnt_NuevoDispositivo.aspx?CodDis=" + res.d);
                        }
                        else {//valor -1 indica que no existen elementos
                            $("#ifNuevoEquipo").attr("src", "");
                        }
                    }
                    else {
                        $("#ifNuevoEquipo").attr("src", "Administrar/Mantenimiento/Mnt_NuevoDispositivo.aspx?CodDis=" + $("#hdfNuevoDispositivo").val());
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnAgregarTapsTipoServicio() {
    $("#pnlTap").html("");
    if (misTiposServicios.length > 0) {

        var AnchoTotal = 1024; //$("#prueba").width();
        var AnchoUnidad = (AnchoTotal / (misTiposServicios.length + 1)) - 25;
        var i = 0;
        for (i = 0; i < misTiposServicios.length; i++) {
            if (i == 0) {
                //$("#pnlTap").append('<div  class="CuerpoTap esPrimerTap"><div id="Tap' + misTiposServicios[i].vcNom.replace(/ /g, "_") + '" cod="' + misTiposServicios[i].P_inCod + '" class="Tap ui-state-active-TAB" style="width: ' + AnchoUnidad.toString() + 'px; text-align: center;"><span class="textTab">' + misTiposServicios[i].vcNom + '</span></div></div>'); //comentado 04-11-2014 wapumayta
                $("#pnlTap").append('<div  class="CuerpoTap esPrimerTap"><div id="Tap' + misTiposServicios[i].P_inCod + '" cod="' + misTiposServicios[i].P_inCod + '" class="Tap ui-state-active-TAB" style="width: ' + AnchoUnidad.toString() + 'px; text-align: center;"><span class="textTab">' + misTiposServicios[i].vcNom + '</span></div></div>');
            }
            else {
                //$("#pnlTap").append('<div  class="CuerpoTap"><div id="Tap' + misTiposServicios[i].vcNom.replace(/ /g, "_") + '" cod="' + misTiposServicios[i].P_inCod + '" class="Tap TapNoSelecionado" style="width: ' + AnchoUnidad.toString() + 'px; text-align: center;"><span class="textTab">' + misTiposServicios[i].vcNom + '</span></div></div>'); //comentado 04-11-2014 wapumayta
                $("#pnlTap").append('<div  class="CuerpoTap"><div id="Tap' + misTiposServicios[i].P_inCod + '" cod="' + misTiposServicios[i].P_inCod + '" class="Tap TapNoSelecionado" style="width: ' + AnchoUnidad.toString() + 'px; text-align: center;"><span class="textTab">' + misTiposServicios[i].vcNom + '</span></div></div>');
            }
        }
    }
    $("#pnlTap").append('<div  class="CuerpoTap"><div id="TapTotal" cod="0" class="Tap TapNoSelecionado" style="width: ' + AnchoUnidad.toString() + 'px; text-align: center;"><span class="textTab">Total</span></div></div>');
    fnEventos();
}

function fnObtenerCuerpoTapGenerico(ID) {
    var cadena = "";
    cadena = cadena + "<div id='DvPnl_" + ID + "' class='AnchoTotal DivDinamico'>";

    cadena = cadena + "<div id='pnlHistorico_" + ID + "'>";
    //cadena = cadena + "<div class='pnlTit  ui-state-active' style='text-align: center;'>Hist&oacute;rico Consumo</div>";
    cadena = cadena + "<div style='height: 10px;'></div>";
    cadena = cadena + "<div id='pnlDdlHistorico_" + ID + "'>";
    cadena = cadena + "&nbsp;&nbsp;&nbsp;Tipo:&nbsp;<select id='selectTipo_" + ID + "' style='height: 24px;'>";
    cadena = cadena + "<option value='Costo' selected='selected'>Costo</option>";
    cadena = cadena + "<option value='Llamadas'>Cantidad</option>";
    cadena = cadena + "</select>";
    cadena = cadena + "&nbsp;&nbsp;&nbsp;Meses Atras:&nbsp;<select id='ddlMesesAtras_" + ID + "' style='height: 24px;'>";
    cadena = cadena + "<option value='1'>1</option>";
    cadena = cadena + "<option value='2'>2</option>";
    cadena = cadena + "<option value='3'>3</option>";
    cadena = cadena + "<option value='4'>4</option>";
    cadena = cadena + "<option value='5'>5</option>";
    cadena = cadena + "<option value='6' selected='selected'>6</option>";
    cadena = cadena + "<option value='7'>7</option>";
    cadena = cadena + "<option value='8'>8</option>";
    cadena = cadena + "<option value='9'>9</option>";
    cadena = cadena + "<option value='10'>10</option>";
    cadena = cadena + "<option value='11'>11</option>";
    cadena = cadena + "<option value='12'>12</option>";
    cadena = cadena + "</select>";
    cadena = cadena + "</div>";
    cadena = cadena + "<div id='ctndCharHis_" + ID + "'></div>";
    cadena = cadena + "</div>";

    cadena = cadena + "<div id='pnlTopAreas_" + ID + "' class='pnlTop'>";
    cadena = cadena + '<li class="list-header">Top Ten Áreas</li><hr class="hr" style="margin-left: 15px;" />';
    cadena = cadena + "<div id='dvNivel_" + ID + "'>";
    cadena = cadena + "&nbsp;&nbsp;&nbsp;Nivel:&nbsp;<select id='ddlNivel_" + ID + "' style='height: 24px;'>";
    cadena = cadena + "</select>";
    cadena = cadena + "</div>";
    cadena = cadena + "<div id='ctndCharTA_" + ID + "'></div>";
    cadena = cadena + "</div>";

    cadena = cadena + "<div id='pnlTopEmpleados_" + ID + "' class='pnlTop'>";
    cadena = cadena + '<li class="list-header">Top Ten Empleados</li><hr class="hr" style="margin-left: 15px;" />';

    cadena = cadena + "<div id='ctndCharTE_" + ID + "'></div>";
    cadena = cadena + "</div>";

    cadena = cadena + "</div>";

    return cadena;
}

function fnNuevasInstanciasDinamicas(ID) {

    $("#selectTipo_" + ID).addClass("ui-corner-all");
    $("#selectTipo_" + ID).css("padding", "4px");
    $("#selectTipo_" + ID).css({ "border": "1px solid #DDDDDD" });

    $("#ddlNivel_" + ID).addClass("ui-corner-all");
    $("#ddlNivel_" + ID).css("padding", "4px");
    $("#ddlNivel_" + ID).css({ "border": "1px solid #DDDDDD" });

    $("#ddlMesesAtras_" + ID).addClass("ui-corner-all");
    $("#ddlMesesAtras_" + ID).css("padding", "4px");
    $("#ddlMesesAtras_" + ID).css({ "border": "1px solid #DDDDDD" });

    var MisOpciones = $("#ddlNivel option");
    var i = 0;
    for (i = 0; i < MisOpciones.length; i++) {
        if (i == 0) {
            $("#ddlNivel_" + ID).append('<option value="' + $(MisOpciones[i]).val() + '" selected="selected">' + $(MisOpciones[i]).text() + '</option>');
        }
        else {
            $("#ddlNivel_" + ID).append('<option value="' + $(MisOpciones[i]).val() + '">' + $(MisOpciones[i]).text() + '</option>');
        }
    }

    if (MisOpciones.length > 1) {
        $("#ddlNivel_" + ID + " option").eq(1).prop('selected', true);
    }

    $("#selectTipo_" + ID).change(function () {
        EventoClickNivel = true;
        dibujarHistorico(idTapTipoServ);
        dibujarTopTenArea(idTapTipoServ);
        dibujarTopTenEmpleado(idTapTipoServ);
    });

    $("#ddlMesesAtras_" + ID).change(function () {
        dibujarHistorico(idTapTipoServ);
        //       dibujarTopTenArea(idTapTipoServ);
        //        dibujarTopTenEmpleado(idTapTipoServ);
    });

    $("#ddlNivel_" + ID).change(function () {
        EventoClickNivel = true;
        dibujarTopTenArea(idTapTipoServ);
        dibujarTopTenEmpleado(idTapTipoServ);
    });
}

var EventoClickNivel = false;
function MostrarHistoricoDinamico(result) {
    var re = JSON.parse(result);
    if (re.dataset.length > 0) {


        var JSON_chart = JSON.parse(result);

        JSON_chart.chart.caption = "HISTÓRICO DE CONSUMO";
        JSON_chart.chart.subcaption = "(Últimos 12 meses)";
        JSON_chart.chart.baseFont = "Open Sans";
        JSON_chart.chart.baseFontColor = "#6b737c";
        JSON_chart.chart.subCaptionFontColor = "#9E9C9C";
        JSON_chart.chart.captionFontSize = "16";
        JSON_chart.chart.subcaptionFontSize = "12";
        JSON_chart.chart.subcaptionFontBold = "0";
        JSON_chart.chart.captionAlignment = "left";
        JSON_chart.chart.exportFileName = "HistoricoConsumo";


        JSON_chart.chart.paletteColors = "#01B8AA";
        JSON_chart.chart.sdecimals = "0";
        JSON_chart.chart.decimals = "0";

        JSON_chart.chart.slantlabels = "0";
        JSON_chart.chart.showlegend = "0";
        JSON_chart.chart.exportenabled = "1";
        JSON_chart.chart.exportShowMenuItem = "1";
        JSON_chart.chart.subCaptionFontColor = "#9E9C9C";
        JSON_chart.chart.captionFontSize = "16";
        JSON_chart.chart.subcaptionFontSize = "12";
        JSON_chart.chart.divlineThickness = "0";
        JSON_chart.chart.legendItemFontColor = "#666666";
        JSON_chart.chart.legendItemFontSize = "10";
        JSON_chart.chart.legendShadow = "0";
        JSON_chart.chart.placeValuesInside = "1";
        JSON_chart.chart.rotateValues = "1";
        JSON_chart.chart.sformatnumber = "0";
        JSON_chart.chart.showHoverEffect = "1";
        JSON_chart.chart.showShadow = "0";
        JSON_chart.chart.showXAxisLine = "1";
        JSON_chart.chart.showYAxisValues = "1";
        JSON_chart.chart.showPercentValues = "0";
        JSON_chart.chart.showplotborder = "0";
        JSON_chart.chart.subcaptionFontBold = "0";
        JSON_chart.chart.showAlternateVGridColor = "0";
        JSON_chart.chart.valueFontColor = "#FFFFFF";
        JSON_chart.chart.xAxisLineThickness = "1";
        JSON_chart.chart.maxLabelWidthPercent = "30";

        JSON_chart.dataset.splice(1, 1);


        //var JSON_chart = JSON.parse(result[0]);
        JSON_chart.legendBorderThickness = "0";
        JSON_chart.legendShadow = "0";
        if (JSON_chart.dataset) {
            if (JSON_chart.dataset.length > 0) {
                for (var i in JSON_chart.dataset[0].data) {
                    JSON_chart.dataset[0].data[i].color = "#01B8AA";
                    JSON_chart.dataset[0].data[i].alpha = "100";
                }
            }
        }


        //if ((FusionCharts("chartHistorico_" + IdDinamico))) {
        //    //myChart1 = new FusionCharts("../Common/Scripts/FusionCharts/MSCombi2D.swf", "chartHistorico_" + IdDinamico, "980", "227", "0");
        //    myChartHist5.dispose();
        //}
        myChartHist5 = new FusionCharts("MSCombi2D", "chartHistorico_" + IdDinamico + contador.toString(), "980", "227", "0");
        myChartHist5.setJSONData(JSON_chart);
        myChartHist5.setTransparent(true);
        myChartHist5.render("ctndCharHis_" + IdDinamico);
        $("#chartHistorico_" + IdDinamico).css('left', '15px');

    }
    else {
        //$("#pnlDdlHistoricoTotal").hide();
        $("#ctndCharHis_" + IdDinamico + " *").remove();
        $("#ctndCharHis_" + IdDinamico).append('<div style="font-size:medium; color:Gray; width: 980px; height: 227px;">No hay datos para mostrar.</div> ');
    }
    try {
        window.parent.fnCerrarCargaInicial();
    }
    catch (e) {
        //some err
    }
}

function MostrarTopTenAreaDinamico(resul) {
    if (resul[0] == "1") {
        $("#ctndCharTA_" + IdDinamico + " *").remove();
        $("#ctndCharTA_" + IdDinamico).append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
        if (!EventoClickNivel) {
            //$("#dvNivel_" + IdDinamico).hide();
        }
        else {
            $("#dvNivel_" + IdDinamico).show();
            EventoClickNivel = false;
        }
    }
    else {
        var datosChart = resul[2];
        var JSON_grafico = JSON.parse(datosChart);
        JSON_grafico.chart.bordercolor = "#FFFFFF";
        JSON_grafico.chart.useroundedges = "0";
        JSON_grafico.chart.showvalues = "0";
        JSON_grafico.chart.bgcolor = "#ffffff";
        JSON_grafico.chart.showCanvasBorder = "0";
        JSON_grafico.chart.canvasBgColor = "#ffffff";
        JSON_grafico.chart.plotBorderAlpha = "25";
        JSON_grafico.chart.showAlternateHGridColor = "0";
        JSON_grafico.chart.usePlotGradientColor = "0";
        JSON_grafico.chart.showAxisLines = "1";
        JSON_grafico.chart.xAxisLineColor = "#A9A9A9";
        JSON_grafico.chart.yAxisLineColor = "#FFFFFF";
        JSON_grafico.chart.axisLineAlpha = "10";
        JSON_grafico.chart.divlineColor = "#999999";
        JSON_grafico.chart.divLineIsDashed = "1";
        JSON_grafico.chart.divLineDashLen = "1";
        JSON_grafico.chart.divLineGapLen = "1";
        JSON_grafico.chart.labeldisplay = "0";
        JSON_grafico.chart.slantlabels = "1",
        JSON_grafico.chart.palette = "1";
        JSON_grafico.chart.animation = "0";
        JSON_grafico.chart.showborder = "0";
        JSON_grafico.chart.canvasbasecolor = "#CCCCCC";
        JSON_grafico.legendBorderThickness = "0";
        JSON_grafico.legendShadow = "0";
        for (var i in JSON_grafico.dataset[0].data) {
            JSON_grafico.dataset[0].data[i].alpha = "100";
            JSON_grafico.dataset[0].data[i].color = "#EFC235";
            JSON_grafico.dataset[0].data[i].label = JSON_grafico.categories[0].category[i].label;
        }

        //console.log("myChartIdA_", JSON_grafico);
        
        $("#dvNivel_" + IdDinamico).show();
        //if ((FusionCharts("myChartIdA_" + IdDinamico))) {
        //    //myChart7 = new FusionCharts("../Common/Scripts/FusionCharts/bar2D.swf", "myChartIdA_" + IdDinamico, "500", "290", "0");
            
        //    //            $("#ctndCharTAMensajes").fadeIn(300);
        //    //            $("#dvNivelSMS").show();
        //    myChart7.dispose();
        //}
        myChart7 = new FusionCharts("StackedBar2D", "myChartIdA_" + IdDinamico + contador.toString(), "500", "290", "0");
        myChart7.setJSONData(JSON_grafico);
        myChart7.setTransparent(true);
        myChart7.render("ctndCharTA_" + IdDinamico);
        
    }
    //$("#ctndCharTAMensajes").fadeIn(300);
}

function MostrarTopTenEmpleadoDinamico(resul) {
    if (resul[0] == "1") {
        $("#ctndCharTE_" + IdDinamico + " *").remove();
        $("#ctndCharTE_" + IdDinamico).append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
        //$("#dvLlamadasEmple").hide();
    }
    else {
        var datosChart = resul[2];
        var JSON_grafico = JSON.parse(datosChart);
        JSON_grafico.chart.bordercolor = "#FFFFFF";
        JSON_grafico.chart.useroundedges = "0";
        JSON_grafico.chart.showvalues = "0";
        JSON_grafico.chart.bgcolor = "#ffffff";
        JSON_grafico.chart.showCanvasBorder = "0";
        JSON_grafico.chart.canvasBgColor = "#ffffff";
        JSON_grafico.chart.plotBorderAlpha = "25";
        JSON_grafico.chart.showAlternateHGridColor = "0";
        JSON_grafico.chart.usePlotGradientColor = "0";
        JSON_grafico.chart.showAxisLines = "1";
        JSON_grafico.chart.xAxisLineColor = "#A9A9A9";
        JSON_grafico.chart.yAxisLineColor = "#FFFFFF";
        JSON_grafico.chart.axisLineAlpha = "10";
        JSON_grafico.chart.divlineColor = "#999999";
        JSON_grafico.chart.divLineIsDashed = "1";
        JSON_grafico.chart.divLineDashLen = "1";
        JSON_grafico.chart.divLineGapLen = "1";
        JSON_grafico.chart.labeldisplay = "0";
        JSON_grafico.chart.slantlabels = "1",
        JSON_grafico.chart.palette = "1";
        JSON_grafico.chart.animation = "0";
        JSON_grafico.chart.showborder = "0";
        JSON_grafico.chart.canvasbasecolor = "#CCCCCC";
        JSON_grafico.legendBorderThickness = "0";
        JSON_grafico.legendShadow = "0";
        for (var i in JSON_grafico.dataset[0].data) {
            JSON_grafico.dataset[0].data[i].alpha = "100";
            JSON_grafico.dataset[0].data[i].color = "#EFC235";
            JSON_grafico.dataset[0].data[i].label = JSON_grafico.categories[0].category[i].label;
        }

        //if ((FusionCharts("myChartIdE_" + IdDinamico))) {
        //    //myChart8 = new FusionCharts("../Common/Scripts/FusionCharts/bar2D.swf", "myChartIdE_" + IdDinamico, "512", "290", "0");
        //    myChart8.dispose();
        //}
        myChart8 = new FusionCharts("StackedBar2D", "myChartIdE_" + IdDinamico + contador.toString(), "512", "290", "0");
        myChart8.setJSONData(JSON_grafico);
        myChart8.setTransparent(true);
        myChart8.render("ctndCharTE_" + IdDinamico);
        //$("#dvLlamadasEmple").show();
    }
    //$("#ctndCharTE_" + IdDinamico).fadeIn(300);



    //if (resul[0] == "1") {
    //    $("#ctndCharTE_" + IdDinamico + " *").remove();
    //    $("#ctndCharTE_" + IdDinamico).append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
    //    //$("#dvSMSEmpleados").hide();
    //}
    //else {
    //    var datosChart = resul[2];
    //    //        $("#ctndCharTEMensajes *").remove();
    //    //        $("#ctndCharTEMensajes").empty();

    //    var JSON_grafico = JSON.parse(datosChart);
    //    JSON_grafico.chart.bordercolor = "#FFFFFF";
    //    JSON_grafico.chart.useroundedges = "0";
    //    JSON_grafico.chart.showvalues = "0";
    //    JSON_grafico.chart.bgcolor = "#ffffff";
    //    JSON_grafico.chart.showCanvasBorder = "0";
    //    JSON_grafico.chart.canvasBgColor = "#ffffff";
    //    JSON_grafico.chart.plotBorderAlpha = "25";
    //    JSON_grafico.chart.showAlternateHGridColor = "0";
    //    JSON_grafico.chart.usePlotGradientColor = "0";
    //    JSON_grafico.chart.showAxisLines = "1";
    //    JSON_grafico.chart.xAxisLineColor = "#A9A9A9";
    //    JSON_grafico.chart.yAxisLineColor = "#FFFFFF";
    //    JSON_grafico.chart.axisLineAlpha = "10";
    //    JSON_grafico.chart.divlineColor = "#999999";
    //    JSON_grafico.chart.divLineIsDashed = "1";
    //    JSON_grafico.chart.divLineDashLen = "1";
    //    JSON_grafico.chart.divLineGapLen = "1";
    //    JSON_grafico.chart.labeldisplay = "0";
    //    JSON_grafico.chart.slantlabels = "1",
    //    JSON_grafico.chart.palette = "1";
    //    JSON_grafico.chart.animation = "0";
    //    JSON_grafico.chart.showborder = "0";
    //    JSON_grafico.chart.canvasbasecolor = "#CCCCCC";
    //    JSON_grafico.legendBorderThickness = "0";
    //    JSON_grafico.legendShadow = "0";
    //    for (var i in JSON_grafico.dataset[0].data) {
    //        JSON_grafico.dataset[0].data[i].alpha = "100";
    //        JSON_grafico.dataset[0].data[i].color = "#EFC235";
    //        JSON_grafico.dataset[0].data[i].label = JSON_grafico.categories[0].category[i].label;
    //    }
    //    console.log("ctndCharTE_", JSON_grafico);

    //    if (!(FusionCharts("myChartIdE_" + IdDinamico))) {
    //        myChart8 = new FusionCharts("../Common/Scripts/FusionCharts/bar2D.swf", "myChartIdE_" + IdDinamico, "500", "290", "0");
    //        myChart8.setJSONData(JSON_grafico);

    //        myChart8.setTransparent(true);
    //        myChart8.render("ctndCharTE_" + IdDinamico);
    //    }
    //    else {
    //        myChart8 = FusionCharts("myChartIdE_" + IdDinamico);
    //        $("#ctndCharTE_" + IdDinamico).updateFusionCharts({ dataSource: datosChart, dataFormat: "json" });
    //        myChart8.render("ctndCharTE_" + IdDinamico);
    //    }

    //    //$("#dvSMSEmpleados").show();
    //}
    ////$("#ctndCharTEMensajes").fadeIn(300);
}

function ObtenerSelectPeriodo() {
    var resul;
    resul = $("#ddlPeriodo option:selected").html().split(' ')[1] + $("#ddlPeriodo").val().substring(0, 2);
    return resul;
}

function VerificarCargando() {
    var resul = false;

    if (CargandoTaps[0] == 1) {
        resul = true;
    }
    else {
        if (CargandoTaps[1] == 1) {
            resul = true;
        }
        else {
            if (CargandoTaps[2] == 1) {
                resul = true;
            }
        }
    }
    return resul;
}


function fnCargarDisenos() {

    $('.chart').easyPieChart({
        barColor: "#3983C2",
        scaleColor: "#3D3D3D",
        lineCap: 'butt',
        scaleColor: false,
        lineWidth: 10,
        size: 30
    });

}