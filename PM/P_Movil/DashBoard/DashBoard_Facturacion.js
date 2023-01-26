var Color_Alpha = 25;
var JsonHistoricoPeriodo = "";
var JsonDistribucionConceptos = "";
var JsonTopTenCosto = "";
var JsonTopTenConsumo = "";

var vcPer, vcNum, vcCodCue, vcCodOpe, vcCodGru;

var dialog;
var dialog2;
var flagMModoActivo = 'Grupo';

var widthGrid = 900;
var heigthGrid = 210;

var Graficowidth = 455;
var Graficoheigth = 160;

var Graficowidth_inf = 920;
var Graficoheigth_inf = 230;

var vcNomGrupo = '';
var vcNomMes = '';
var vcNomOperador = '';
var vcNomCuenta = '';

var vcCodCuenta = '';

var HeightGrid_Grupo = 28; //26
var tabEstadoAprobacion;

//var valGrupoOcultos = "";
var idGrupoOculto;

//#region Colores Graficos
var vcGrupo00 = 'white';
var vcGrupo01 = '#81BEF7'; //
var vcGrupo02 = '#81F79F'; //
var vcGrupo03 = '#FC2424'; //
var vcGrupo04 = '#FF7F00'; //
var vcGrupo05 = '#04B4AE'; //
var vcGrupo06 = '#E6E6FA'; //
var vcGrupo07 = '#EEE8AA';
var vcGrupo08 = '#87CEEB'; //
var vcGrupo09 = '#F4A460'; //
var vcGrupo10 = '#D2B48C'; //
var vcGrupo11 = '#6991FF'; //
var vcGrupo12 = '#CC8136';
var vcGrupo13 = '#8F8FBD';
var vcGrupo14 = '#CFB53B'; // 
var vcGrupo15 = '#'; //
var vcGrupo16 = '#'; //
var vcGrupo17 = '#'; //
var vcGrupo18 = '#'; //
var vcGrupo19 = '#'; //
var vcGrupo20 = '#'; //
// #endregion

var Ancho = 0;
var Alto = 0;
var num;
var oCulturaUsuario;
var SimMil;
var NumDec;
var SimDec;
var inTotal;
let codAreaSeleccionada = '';
var CantOperadores = 0;
 


// #region LOAD
$(function () {
    CantOperadores = $("#dwOperador option").length;
    if (CantOperadores == 2) {
        $("#dwOperador option").each(function () {
            if ($(this).attr('value') != "-1") {
                p_dwOperador = $(this).attr('value');
                //break;
            }
        });
    }

    $("#btnAgregarOrga").click(function () {
        var $width = 740;
        var $height = 505;
        var $Pagina = '../../P_Movil/Consultar/Con_SeleccionArea.aspx?Tipo=1&Multiple=0';
        $("#ifArea").attr("src", $Pagina);
        Modal = $('#dvArea').dialog({
            title: "Seleccionar área",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    });

    

    $('#dwCuenta').select2();

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

    //FusionCharts.setCurrentRenderer('javascript');


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
    if (p_dwHasta.length > 0) {
        $("#dwHasta").val(p_dwHasta);
    }
    //seccion organización
    if (p_NombreOrga.length > 0) {
        $("#txtNomOrganizacion").val(p_NombreOrga);
    }
    if (p_CodigoOrga.length > 0) {
        $("#hdfCodOrganizacion").val(p_CodigoOrga);
        if (p_CodigoOrga != "-1") {
            codAreaSeleccionada = p_CodigoOrga.toString();
            $('#hdfCodigoAreaSeleccionada').val(p_CodigoOrga);
        }
    }

    if (p_dwOperador.length > 0) {
        $("#dwOperador").val(p_dwOperador);
        ListarCuentaPlanesPorOperador();
    }
    else {
        Grafico_Historico_Periodo(0, 1, 1);
    }

    if (p_dwExpresado.length > 0) {
        $("#dwExpresado").val(p_dwExpresado);
    }
    //if (p_dwTipoLinea.length > 0) {
    //    $("#dwTipoLinea").val(p_dwTipoLinea);
    //}

    //$("#dwTipoLinea").val(1);
    //$("#dwTipoLinea").prop("disabled", true);

    // ==============================================================================================================================
    // INICIALIZA USUARIO
    // ==============================================================================================================================

    //    SimMil = oCulturaUsuario.vcSimSepMil;
    //    NumDec = oCulturaUsuario.dcNumDec;
    //    SimDec = oCulturaUsuario.vcSimDec;
    SimMil = $("#hdfSepMiles").val();
    NumDec = $("#hdfNumDecimales").val();
    SimDec = $("#hdfSepDecimal").val();

    if ($("#ddlNivel").val() == "1") {
        $("#ddlNivel").val("2");
    }

    $("#ddlNivel").change(function () {
        Grafico_TopTen_Costo_();
        //TopTen_Consumo_();
        Grafico_TopTen_Servicio_();
    });


    $("#cboTipoTopTenCosto").change(function () {
        Grafico_TopTen_Costo_();
    });
    $("#cboTipoTopTenConsumo").change(function () {
        //TopTen_Consumo_();
        Grafico_TopTen_Servicio_();
    });


    $("#dwDesde").change(function () {
         
        // ==============================================================================================================================
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
                //debugger;
                let nombreArea = $("#txtNomOrganizacion").val().replace(/</g, "*60*").replace(/>/g, "*62*").toString();
                let codigoArea = $("#hdfCodOrganizacion").val().toString();
                window.parent.$("#dvCargando").show();
                window.location.href = 'DashBoard_Facturacion.aspx?pe=' + $("#dwDesde").val() + '&nombreArea=' + nombreArea + '&codigoArea=' + codigoArea; //Jpareja agregar parametro de organizacion
                window.parent.$("#dvCargando").hide(); 
                 
                 
            }, // ==============================================================================================================================
            error: function (xhr, err, thrErr) {
                // ==============================================================================================================================
                MostrarErrorAjax(xhr, err, thrErr);
                // ==============================================================================================================================
            }

        });

        Cabecera_GrupoServicio_();
        Grafico_Historico_Periodo(0, 1, 1);

    });

    $("#dwOperador").change(function () {

        $("#dwDesde").prop('disabled', true);
        $("#dwCuenta").prop('disabled', true);
        $("#dwOperador").prop('disabled', true);
        $("#dwTipoLinea").prop('disabled', true);
        // ==============================================================================================================================
        $.ajax({
            // ==============================================================================================================================
            type: "POST",
            url: "DashBoard_Facturacion.aspx/Guarda_ParametrosReporte",
            data: "{'p_vcNomGrupo_Para': 'dwOperador','p_vcValor_Para': '" + this.value + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            // ==============================================================================================================================
            success: function (result) {
                // ==============================================================================================================================

            }, // ==============================================================================================================================
            error: function (xhr, err, thrErr) {
                // ==============================================================================================================================
                MostrarErrorAjax(xhr, err, thrErr);
                // ==============================================================================================================================
            }

        });

        ListarCuentaPlanesPorOperador();

    });

    $("#dwTipoLinea").change(function () {
        // ==============================================================================================================================
        $("#dwDesde").prop('disabled', true);
        $("#dwCuenta").prop('disabled', true);
        $("#dwOperador").prop('disabled', true);
        $("#dwTipoLinea").prop('disabled', true);

        $.ajax({
            // ==============================================================================================================================
            type: "POST",
            url: "DashBoard_Facturacion.aspx/Guarda_ParametrosReporte",
            data: "{'p_vcNomGrupo_Para': 'dwTipoLinea','p_vcValor_Para': '" + this.value + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            // ==============================================================================================================================
            success: function (result) {
                // ==============================================================================================================================

            }, // ==============================================================================================================================
            error: function (xhr, err, thrErr) {
                // ==============================================================================================================================
                MostrarErrorAjax(xhr, err, thrErr);
                // ==============================================================================================================================
            }

        });
        Cabecera_GrupoServicio_();
        Grafico_Historico_Periodo(0, 1, 1);
    });

    $("#ddlGrupo1").change(function () {

        Grafico_TopTen_Costo_();
        if ($(this).val() != '-1') {
            $("#lblTopCosto").text(": " + $("#ddlGrupo1 option:selected").text());
        }
        else {
            $("#lblTopCosto").text("");
        }

    });

    $("#ddlGrupo2").change(function () {

        //TopTen_Consumo_();
        Grafico_TopTen_Servicio_();
        if ($(this).val() != '-1') {
            $("#lblTopConsumo").text(": " + $("#ddlGrupo2 option:selected").text());
        } else {
            $("#lblTopConsumo").text("");
        }
    });

    $("#dwCuenta").change(function () {

        //        if ($(this).val() != '-1') {
        $("#dwDesde").prop('disabled', true);
        $("#dwCuenta").prop('disabled', true);
        $("#dwOperador").prop('disabled', true);
        $("#dwTipoLinea").prop('disabled', true);

        Cabecera_GrupoServicio_();
        Grafico_Historico_Periodo(0, 1, 1);
        //        }
    });

    var vcDiv = '<div id="btnRefrescar" class="Refrescar" title="Volver a cargar página" width="5px" style="display:none; cursor: pointer; height: !important;">';
    vcDiv = vcDiv + '<img src="../../Common/Images/Mantenimiento/Refresh_22x22.png" width="20" height="20">';
    vcDiv = vcDiv + '</div>';
    $("#dvRefrescar").append(vcDiv);

    $("#btnRefrescar").click(function () {
        window.location.href = 'DashBoard_Facturacion.aspx?pe=' + $("#dwDesde").val();
    });
    $(".detalleGrupo").live('mouseenter', function (e) {
        //$("#dvDetalleGrupo").css({ "left": e.pageX + 10, "top": e.pageY + 10, "display": "block" });
        $(this).mousemove(function (e) {
            $("#dvDetalleGrupo").css({ "left": e.pageX + 10, "top": e.pageY + 10, "display": "block" });
        });
    });
    $(".detalleGrupo").live('mouseout', function () {
        $("#dvDetalleGrupo").css("display", "none");
    });

    function CargaCultura() {
        if (oCulturaUsuario == undefined) {
            $.ajax({
                type: "POST",
                url: "../../Common/WebService/General.asmx/ObtenerCulturaPrincipalUsuario",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    oCulturaUsuario = result.d;

                    //Inicio();
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
        //fnLateralSplitterDinamic();
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

    var strPeriodo = $("#dwDesde option:selected").text();
    $("#lblPeriodo").text(strPeriodo);

    $("#btnImprimir").click(function () {
        if ($('#dwDesde > option').length > 1) {
            window.print();
        } else {
            alerta("No hay datos para imprimir");
        }
    });
});
// #endregion LOAD

function IngresarAreaUnico(area) {//Carga el area seleccionadade
    $("#txtNomOrganizacion").val(area.vcNomOrg.split("=")[1]); 
    $("#hdfCodOrganizacion").val(area.P_inCodOrg);
    codAreaSeleccionada = area.P_inCodOrg;
    $('#hdfCodigoAreaSeleccionada').val(codAreaSeleccionada);
     ListarCuentaPlanesPorOperador();
}

function Cabecera_GrupoServicio_() {

    var ColModel1 = [];

    var idExpresado = $("#dwExpresado").val();

    var str = $("#dwDesde").val();
    var vcMesInicial = str.substring(0, 2) + '' + str.substring(5);

    $("#lblTituloConceptosGenerales").html("Conceptos Generales (" + oCulturaUsuario.Moneda.vcSimMon + ")");
    $("#ulConceptosFacturacion").empty();

    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "DashBoard_Facturacion.aspx/Cabecera_GrupoServicio",
        data: "{'p_vcModo': 'Grupo_Servicio','p_vcCriterio':'','p_idExpresado':'" + idExpresado + "','p_vcMesInicial':'" + vcMesInicial + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // ==============================================================================================================================
        success: function (result) {

            // ==============================================================================================================================
            if ($(result.d).length > 0) {
                //debugger;
                $("#tbGrupoServicio").jqGrid("GridUnload");
                // ========================================================================================================================
                // COLUMNAS DINAMICAS - GRILLA # CABECERA
                // ========================================================================================================================    
                var i = 0;
                inTotal = 0;
                for (i = 0; i < $(result.d).length; i++) {

                    ColModel1.push({
                        label: result.d[i].vcGrupo, name: 'vcGrupo' + pad(i + 1, 2), index: 'vcGrupo' + pad(i + 1, 2), hidden: false,
                        id: result.d[i].vcGrupo01,
                        align: result.d[i].vcGrupoAlign, width: result.d[i].vcGrupoWidth, sortable: false, resizable: false,
                        //,formatter: 'number', formatoptions: { decimalSeparator: oCulturaUsuario.vcSimDec, thousandsSeparator: oCulturaUsuario.vcSimSepMil, decimalPlaces: oCulturaUsuario.dcNumDec }
                        formatter: function (value, options, rData) {
                            if (value !== null) {
                                var ArregloValue = value.split("*");
                                return ArregloValue[1];
                            } else {
                                return "";
                            }
                        }

                    });
                }
                //$("#tbGrupoServicio").jqGrid('setCell', 1, 'Total', inTotal);

                // ========================================================================================================================    
                try {

                    // ========================================================================================================================
                    // GRILLA # DETALLE
                    // ========================================================================================================================    

                    var tbGrupoServicio = $("#tbGrupoServicio").jqGrid({
                        datatype: "local",
                        colModel: ColModel1,
                        rowNum: 1,
                        sortname: "IdGrupo", //Default SortColumn
                        sortorder: "asc", //Default SortOrder.
                        width: widthGrid,
                        height: HeightGrid_Grupo,
                        shrinkToFit: true,
                        autowidth: true,
                        rownumbers: false,
                        viewrecords: true,
                        gridComplete: function () {
                            //$("#tbGrupoServicio").setSelection(1);
                            //$(".btnNormal").button();
                            var i;
                            var colModels = $("#tbGrupoServicio").getGridParam("colModel");
                            for (i = 0; i < colModels.length; i++) {
                                if (colModels[i].label == "...") {
                                    idGrupoOculto = colModels[i].name;
                                }
                            }
                            $(".ui-jqgrid-sortable").removeClass('ui-jqgrid-sortable');
                        },
                        beforeSelectRow: function (rowid, aData) {
                            //$('#tbGrupoServicio').css({ height: 35 });
                            return false;
                        }
                    });


                    //debugger;
                    var ContenidoConcepto = '';
                    var iTotalConceptos = 0;
                    for (var i = 0; i < ColModel1.length; i++) {
                        if (ColModel1[i].hidden == false) {
                            if (ColModel1[i].label != "Total") {
                                iTotalConceptos++;
                                ContenidoConcepto += '<li class="col-md-{sizeMD} col-sm-{sizeSM} col-xs-{sizeXS}" style="margin-top: 10px !important;">';
                                ContenidoConcepto += '<span class="text-1x text-semibold-400 text-main">{' + ColModel1[i].label + '}</span>';
                                if (ColModel1[i].id != "18") {
                                    ContenidoConcepto += '<p class="text-md text-muted mar-no">' + ColModel1[i].label + ' <a onclick="fnMostrarModalGrupoConcepto(this,\'' + ColModel1[i].id + '\')" style="cursor: pointer;"><i class="fa fa-info-circle" aria-hidden="true"></i></a></p>';
                                }
                                else {
                                    ContenidoConcepto += '<p class="text-md text-muted mar-no">' + ColModel1[i].label + '</p>';
                                }
                                ContenidoConcepto += '</li>';
                            }
                        }
                    }

                    //Determinando ancho concepto
                    ContenidoConcepto = ContenidoConcepto.replace(/{sizeMD}/g, "3");
                    ContenidoConcepto = ContenidoConcepto.replace(/{sizeSM}/g, "4");
                    ContenidoConcepto = ContenidoConcepto.replace(/{sizeXS}/g, "6");


                    // ========================================================================================================================    
                    Listar_GrupoServicio(ContenidoConcepto);
                    // ========================================================================================================================    
                } catch (e) {
                    alerta(e);
                }

                if (inNoMostrarGrupo > 0) {
                    //                    $('#jqgh_tbGrupoServicio_vcGrupo01').prop('title', "Grupos: " + strGruposAgrup);
                    $('#jqgh_tbGrupoServicio_' + idGrupoOculto).removeClass("ui-jqgrid-sortable");
                    $('#jqgh_tbGrupoServicio_' + idGrupoOculto).addClass("detalleGrupo");
                    $('#jqgh_tbGrupoServicio_' + idGrupoOculto).css("cursor", "pointer");
                    $("#dvDetalleGrupo").html(strGruposAgrup);


                }
            }

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }

    });

}

function fnMostrarModalGrupoConcepto(e, id) {
    //debugger;
    var $width = 740;
    var $height = 505;

    var $tituloModal = 'Detalle Grupo Servicio - ' + e.parentElement.textContent;

    Modal = $('#dvGrupoServicioDetalle').dialog({
        title: $tituloModal,
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
    let str = $("#dwDesde").val();
    let p_vcMesInicial = str.substring(0, 2) + '' + str.substring(5);
    let p_idGrupo = id;
    let p_idOperador = $("#dwOperador").val();
    let p_vcCodCue = ObtenerCuentas();

    $("#tbGrupoServicioDet").jqGrid('clearGridData');

    //$("#tbGrupoServicio").jqGrid('clearGridData');
    // ==============================================================================================================================
    $.ajax({
        type: "POST",
        url: "DashBoard_Facturacion.aspx/ListarDetalleGrupoServicio",
        data: "{'p_vcMesInicial': '" + p_vcMesInicial + "','p_idGrupo': '" + p_idGrupo + "'," +
            "'p_idOperador': '" + p_idOperador + "'," +
            "'p_vcCodCue': '" + p_vcCodCue + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //debugger;
            // ==============================================================================================================================
            if ($(result.d).length > 0) {

                $("#tbGrupoServicioDet").jqGrid("GridUnload");

                var datos = [];
                for (let i = 0; i < result.d.length; i++) {
                    datos.push({ Grupo_Servicio: result.d[i].vcGrupo02, Concepto: result.d[i].vcGrupo03, Total_por_Concepto: result.d[i].vcGrupo07 });
                }

                var tbGrupoServicioDet = $("#tbGrupoServicioDet").jqGrid({
                    datatype: "local",
                    colModel: [
                        { label: "Grupo Servicio", name: "Grupo_Servicio", index: "0", hidden: false, resizable: false, sortable: false, width: "60", align: "left" },
                        { label: "Concepto", name: "Concepto", index: "1", hidden: false, resizable: false, sortable: false, width: "130", align: "left" },
                        { label: "Total por Concepto", name: "Total_por_Concepto", index: "2", hidden: false, resizable: false, sortable: false, width: "50", align: "right" },
                    ],
                    data: datos,
                    //sortname: "IdGrupo",
                    //sortorder: "asc",
                    width: 700,
                    height: 375,
                    loadtext: 'Cargando datos...',
                    recordtext: "{0} - {1} de {2} elementos",
                    emptyrecords: 'No hay resultados',
                    pgtext: 'Pág: {0} de {1}',
                    rownumbers: true,
                    gridview: true,
                    rowNum: 10000,
                    rowList: [12, 24, 48],
                    rowNum: 12,
                    shrinkToFit: true,
                    viewrecords: true,
                    hidegrid: false,
                    sortable: true,
                    //caption: "Resumen de Facturación: Cuenta(s) ",
                    pager: "#PaginadorGrupoServicioDet",

                }).navGrid("#PaginadorGrupoServicioDet", { edit: false, add: false, search: false, del: false });

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

function Listar_GrupoServicio(_ContenidoConcepto) {

    var str = $("#dwDesde").val();
    var vcMesInicial = str.substring(0, 2) + '' + str.substring(5);
    //Cambio
    var vcMesFin = $("#dwDesde").val();
    var idOperador = $("#dwOperador").val();
    var idExpresado = $("#dwExpresado").val();

    var p_inTipLin = $("#dwTipoLinea").val();
    var p_vcCodCuenta = ObtenerCuentas(); // $("#dwCuenta").val();
    // ==============================================================================================================================
    $("#tbGrupoServicio").jqGrid('clearGridData');
    // ==============================================================================================================================
    $.ajax({
        type: "POST",
        url: "DashBoard_Facturacion.aspx/Listar_GrupoServicio",
        data: "{'p_vcMesInicial': '" + vcMesInicial + "','p_vcMesFin': '" + vcMesFin +
                "','p_idOperador': '" + idOperador + "','p_idExpresado': '" + idExpresado + "', 'p_inTipLin':'" + p_inTipLin +
                "', 'p_vcCodCuenta': '" + p_vcCodCuenta + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //Limpia campo total
            $("#lblMontoTotal").html("");
            // ==============================================================================================================================
            if ($(result.d).length > 0) {
                var i = 0;
                var NombreColumna = '';
                var ValorColumna = '';
                for (var i = 0; i < 20; i++) {
                    NombreColumna = "vcGrupo" + Right("0" + i.toString(), 2);
                    if (typeof result.d[0][NombreColumna] != 'undefined' && result.d[0][NombreColumna] != null) {
                        ValorColumna = result.d[0][NombreColumna].split('*')[1];
                        NombreColumna = result.d[0][NombreColumna].split('*')[0];
                        if (NombreColumna == "Total") {
                            $("#lblMontoTotal").html(oCulturaUsuario.Moneda.vcSimMon + ValorColumna);
                        }
                        _ContenidoConcepto = _ContenidoConcepto.replace("{" + NombreColumna + "}", ValorColumna);
                    }
                }


                for (i = 0; i < $(result.d).length; i++) {
                    // ==============================================================================================================================
                    $("#tbGrupoServicio").jqGrid('addRowData', result.d[i].IdGrupo, result.d[i]);
                    // ==============================================================================================================================
                }

                $("#ulConceptosFacturacion").append(_ContenidoConcepto);

            } else {
                Mensaje("<br/><h1>No existe datos en el periodo y/u operador seleccionado(s).</h1>", document, null);
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
    // ==============================================================================================================================
}


// ==============================================================================================================================
// GRAFICO HISTORICO PERIODOS
// ==============================================================================================================================
function Grafico_Historico_Periodo(inParam, inShowValues, inModo) {
    var str = $("#dwDesde").val();
    var vcMesInicial = str.substring(0, 2) + '' + str.substring(5);

    var vcMesFin = $("#dwDesde").val();

    var idOperador = $("#dwOperador").val();
    var idExpresado = $("#dwExpresado").val();
    var inTipLin = $("#dwTipoLinea").val();
    var vcCodCuenta = ObtenerCuentas(); // $("#dwCuenta").val();

    JsonHistoricoPeriodo = "";
    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "DashBoard_Facturacion.aspx/Grafico_Historico_Periodo",
        data: "{'vcNomGrupo':'" + (vcNomGrupo.length === 0 ? '0' : vcNomGrupo) +
            "','vcNomMes':'" + (vcNomMes.length === 0 ? '0' : vcNomMes) +
            "','inTipLin':'" + inTipLin +
           "','vcNomCuenta':'" + vcCodCuenta +
            "','p_vcMesInicial': '" + vcMesInicial + "','p_vcMesFin': '" + vcMesFin +
            "','p_idOperador': '" + idOperador + "','p_idExpresado': '" + idExpresado + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //debugger;
            // ==============================================================================================================================
            if ($(result.d).length > 0) {
                var PaletaColores = '#01B8AA'; //'#78DC27';
                var valueFontColor = "#FFFFFF'";


                var cadena3 = '{"chart": {"baseFont":"Open Sans", "baseFontColor": "#6b737c", "caption": "HISTÓRICO DE FACTURACIÓN", "subCaption": "(Últimos 06 meses)","xaxisname": "","pyaxisname": "Costo", "syaxisname": "Líneas","legendBorderThickness": "0","legendShadow":"0","exportFileName":"HistoricoFacturacion",';
                cadena3 = cadena3 + '"subCaptionFontColor":"#9E9C9C","captionFontSize":"16","subcaptionFontSize": "12","divlineThickness":"0","exportenabled" : "1","exportShowMenuItem":"1",';
                cadena3 = cadena3 + '"legendItemFontColor":"#666666", "legendItemFontSize":"10", "legendShadow":"0", "placeValuesInside":"1", "paletteColors": "' + PaletaColores + '",';
                cadena3 = cadena3 + '"rotateValues":"1", "showHoverEffect":"1", "showShadow":"0", "showXAxisLine":"1", "showYAxisValues":"1",';
                cadena3 = cadena3 + '"showPercentValues":"0","showplotborder":"0", "subcaptionFontBold":"0", "showAlternateVGridColor":"0", "valueFontColor":"' + valueFontColor + '", ';
                cadena3 = cadena3 + '"xAxisLineThickness":"1","maxLabelWidthPercent":"30", ';
                cadena3 = cadena3 + '"bgColor": "#ffffff", "bgAlpha":"100", "showCanvasBorder":"0","canvasBgColor": "#ffffff", "canvasbgAlpha":"0", "canvasBorderAlpha":"0", "plotBorderAlpha": "25","showAlternateHGridColor": "0","usePlotGradientColor": "0",';
                cadena3 = cadena3 + '"captionAlignment":"left","showAxisLines": "1", "showYAxisLine": "0", "showsyAxisLine": "0","xAxisLineColor": "#999999","axisLineAlpha": "10","divlineColor": "#999999","divLineIsDashed": "1",';
                cadena3 = cadena3 + '"divLineDashLen": "0","divLineDashed": "0","divLineGapLen": "0",';
                cadena3 = cadena3 + '"labeldisplay": "0","slantlabels": "1", "maxColWidth": "35", ' +
                    '"animation": "0","formatnumberscale": "0","showvalues": "0", "seriesnameintooltip": "1", ' +
                    '"thousandseparator": "' + SimMil + '", "sDecimals": "0", "sForceDecimals": "0", "decimalseparator": "' + SimDec + '",' +
                    '"showborder": "0", "canvasbasecolor": "#CCCCCC", "snumberprefix": "","numberprefix":"' + oCulturaUsuario.Moneda.vcSimMon + '" }, "categories": [{"category": [';

                var i = 0;
                for (i = 0; i < $(result.d).length; i++) {
                    item3 = '{"label": "' + result.d[i].vcGrupo05 + '"}';
                    if (i + 1 != $(result.d).length) {
                        item3 = item3 + ',';
                    }
                    cadena3 = cadena3 + item3;

                    //item = {};
                    //item.label = result.d[i].vcGrupo05;
                    //jsonData.categories[0].category.push(item);
                }

                cadena3 = cadena3 + '] } ] , "dataset": [ { "seriesname": "Costo", "data": [';
                vcColor = PaletaColores; //vcGrupo01;
                for (i = 0; i < $(result.d).length; i++) {
                    //debugger
                    var item3 = '{"value": "' + result.d[i].vcGrupo03 + '","alpha": "100", "color" : "' + vcColor + '","link": "j-clickChart_h-' + result.d[i].vcGrupo10 + '" }';
                    if (i + 1 != $(result.d).length) {
                        item3 = item3 + ',';
                    }
                    cadena3 = cadena3 + item3;
                }

                cadena3 = cadena3 + ']} ,{"seriesname": "Líneas", "showvalues": "0", "color":"#747F81","parentYAxis": "S", "renderas": "Line", "data": [ ';
                for (i = 0; i < $(result.d).length; i++) {
                    item3 = '{"value": "' + result.d[i].vcGrupo07 + '","label":"x" }';
                    if (i + 1 != $(result.d).length) {
                        item3 = item3 + ',';
                    }
                    cadena3 = cadena3 + item3;
                }
                cadena3 = cadena3 + '] } ] }';


                if (inModo == 1) {
                    //Combi DY2D
                    //mscombi2d,MSCombiDY2D

                    var _Graficowidth = ($(window).width() / 4) - 10;
                    Graficoheigth = 220;

                    //var myChart = new FusionCharts("../../Common/Scripts/FusionCharts/MSCombiDY2D.swf", "myChartId" + Math.random(),
                    //                              _Graficowidth, Graficoheigth + 40);
                    //myChart.setJSONData(cadena3);

                    //myChart.render("dv_TopTen");
                    
                    JsonHistoricoPeriodo = cadena3;

                    var repositorioChartDur = new FusionCharts("MSCombiDY2D", "dv_TopTen_render" + Math.random(), "100%", "295", "0");
                    repositorioChartDur.setJSONData(cadena3);
                    repositorioChartDur.setTransparent(true);
                    repositorioChartDur.render("dv_TopTen");

                    AlinearTitulosGraficos();

                }

            } else {
                $("#dv_TopTen *").remove();
                $("#dv_TopTen").append('<div style="font-size:medium; color:Gray; width: 450px; height: 200px;">No hay datos para mostrar.</div> ');

            }

            //            Grafico_Superior_(0, 1, 1, Ancho, Alto);
            Grafico_Inferior_(0, 0, 1);
            Grafico_TopTen_Costo_();
            //TopTen_Consumo_();
            Grafico_TopTen_Servicio_();

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function clickChart_h(p) {
    var idOperador = $("#dwOperador").val();
    var codCuenta = ObtenerCuentas(); // $("#dwCuenta").val();
    if (p) {
        if (codCuenta != '-1' && codCuenta.split('|').length == 3 & codCuenta != '|0000000000|') {
            $.ajax({
                type: "POST",
                url: "Dashboard_Facturacion.aspx/Datos_Periodo",
                data: "{'p_vcPer': '" + p + "', 'p_idOperador': '" + idOperador + "', 'p_vcCodCue':'" + codCuenta + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if ($(result.d).length > 0) {
                        var pagina = "../Facturacion/Consultar/Con_Fac_ConsultaPrincipal.aspx?p_vcNum=&p_vcCodCue=" + codCuenta + "&p_vcPer=" + p;
                        fn_mdl_muestraForm(pagina, null, "Detalle de Facturación: " + result.d[0].vcGrupo02, 910, 655);
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        } else {
            //            alerta("Seleccione una cuenta.");
            Mensaje("<br/><h1>Debe seleccionar una cuenta</h1>", document, null);
            $("#dwCuenta").focus();
        }

    } else {
        alerta("Seleccione un periodo.");
    }
}

function Grafico_TopTen_Costo_() {
    var str = $("#dwDesde").val();
     
    var vcMesInicial = str.substring(0, 2) + '' + str.substring(5);

    var idOperador = $("#dwOperador").val();

    var idGrupo = $("#ddlGrupo1").val();
    var idTipLin = $("#dwTipoLinea").val();
    var vcCodCue = ObtenerCuentas(); // $("#dwCuenta").val();

    var TipoTopTenCosto = $("#cboTipoTopTenCosto").val();

    var Nivel = $("#ddlNivel").val();

    ObtenerCuentas();

    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "DashBoard_Facturacion.aspx/Grafico_TopTen_Costo",
        data: "{'p_vcMesInicial':'" + vcMesInicial + "','p_idGrupo':'" + idGrupo + "','TipoTopTenCosto':'" + TipoTopTenCosto + "','p_idOperador':'" + idOperador +
              "', 'p_inTipLin': '" + idTipLin + "', 'p_vcCodCue': '" + vcCodCue + "','Nivel':'" + Nivel + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            // ==============================================================================================================================             
            if ($(result.d).length > 0) {

                var PaletaColores = '#01B8AA'; //'#78DC27';
                var valueFontColor = "#FFFFFF'";
                //var cadena3 = '{"chart": {"baseFont":"Open Sans", "baseFontColor": "#6b737c", "caption": "HISTÓRICO DE FACTURACIÓN", "subCaption": "(Últimos 06 meses)","xaxisname": "","pyaxisname": "Costo", "syaxisname": "Líneas","legendBorderThickness": "0","legendShadow":"0",';
                //cadena3 = cadena3 + '"subCaptionFontColor":"#9E9C9C","captionFontSize":"16","subcaptionFontSize": "12","divlineThickness":"0",';
                //cadena3 = cadena3 + '"legendItemFontColor":"#666666", "legendItemFontSize":"10", "legendShadow":"0", "placeValuesInside":"1", "paletteColors": "' + PaletaColores + '",';
                //cadena3 = cadena3 + '"rotateValues":"1", "sformatnumber":"0", "showHoverEffect":"1", "showShadow":"0", "showXAxisLine":"1", "showYAxisValues":"0",';
                //cadena3 = cadena3 + '"showPercentValues":"0","showplotborder":"0", "subcaptionFontBold":"0", "showAlternateVGridColor":"0", "valueFontColor":"' + valueFontColor + '", ';
                //cadena3 = cadena3 + '"xAxisLineThickness":"1","maxLabelWidthPercent":"30", ';
                //cadena3 = cadena3 + '"bgColor": "#ffffff", "bgAlpha":"100", "showCanvasBorder":"0","canvasBgColor": "#ffffff", "canvasbgAlpha":"0", "canvasBorderAlpha":"0", "plotBorderAlpha": "25","showAlternateHGridColor": "0","usePlotGradientColor": "0",';
                //cadena3 = cadena3 + '"captionAlignment":"left","showAxisLines": "1", "showYAxisLine": "0", "showsyAxisLine": "0","xAxisLineColor": "#999999","axisLineAlpha": "10","divlineColor": "#999999","divLineIsDashed": "1",';
                //cadena3 = cadena3 + '"divLineDashLen": "0","divLineDashed": "0","divLineGapLen": "0",';
                //cadena3 = cadena3 + '"labeldisplay": "0","slantlabels": "1", "maxColWidth": "35", ' +
                //    '"animation": "0","formatnumberscale": "0","showvalues": "1", "seriesnameintooltip": "1", ' +
                //    '"thousandseparator": "' + SimMil + '", "sdecimals": "0", "decimals": "0", "decimalseparator": "' + SimDec + '", "forcedecimals": "1",' +
                //    '"showborder": "0", "canvasbasecolor": "#CCCCCC", "snumberprefix": "","numberprefix":"' + oCulturaUsuario.Moneda.vcSimMon + '" }, "categories": [{"category": [';

                var cadena = '';
                cadena = cadena + '{"chart": {';
                cadena = cadena + '"baseFont":"Open Sans", "baseFontColor": "#6b737c", "legendBorderThickness": "0","legendShadow":"0","exportFileName":"TopTenCosto",';
                cadena = cadena + '"subCaptionFontColor":"#9E9C9C","divlineThickness":"1","canvasbasecolor": "#CCCCCC", "snumberprefix": "",';
                cadena = cadena + '"legendItemFontColor":"#666666", "legendItemFontSize":"10", "paletteColors": "' + PaletaColores + '",';
                cadena = cadena + '"rotateValues":"1", "sformatnumber":"0", "showHoverEffect":"1", "showShadow":"0", "showXAxisLine":"1", ';
                cadena = cadena + '"showPercentValues":"0","showplotborder":"0", "valueFontColor":"' + valueFontColor + '", ';
                cadena = cadena + '"xAxisLineThickness":"1","maxLabelWidthPercent":"30", ';
                cadena = cadena + '"bgAlpha":"100", "canvasBgColor": "#ffffff", "canvasbgAlpha":"0", "canvasBorderAlpha":"0", "showAlternateHGridColor": "0",';
                cadena = cadena + '"captionAlignment":"left","showYAxisLine": "0", "showsyAxisLine": "0","divlineColor": "#999999",';
                cadena = cadena + '"divLineDashLen": "1","divLineDashed": "1","divLineGapLen": "0",';
                cadena = cadena + '"labeldisplay": "0","slantlabels": "1", "maxColWidth": "35", ';

                if (TipoTopTenCosto == "Empleado") {
                    cadena = cadena + '"subCaption": "(Costos agrupados por Empleados)",';
                }
                else {
                    cadena = cadena + '"subCaption": "(Costos agrupados por Líneas)",';
                }

                cadena = cadena + '"showYAxisValues": "1","showvalues": "0","seriesnameintooltip": "1","showlegend": "0","caption": "TOP TEN DE COSTO","xAxisName": "","yAxisName": "","numberPrefix": "' + oCulturaUsuario.Moneda.vcSimMon + '",';
                cadena = cadena + '"bgColor": "#ffffff", "showBorder": "0", "showCanvasBorder": "0", "usePlotGradientColor": "0", "plotBorderAlpha": "25","theme": "fusion", "exportenabled" : "1","exportShowMenuItem":"1",';
                cadena = cadena + '"placeValuesInside": "1", "showAxisLines": "1", "xAxisLineColor": "#999999", "yAxisLineColor": "#FFFFFF", "axisLineAlpha": "10","divLineIsDashed": "1",';
                cadena = cadena + '"divLineAlpha": "30", "showAlternateVGridColor": "0", "captionFontSize": "16", "subcaptionFontSize": "12", "subcaptionFontBold": "0","numberscalevalue": "100,100,100",';
                cadena = cadena + '"formatNumberScale": "0", "formatNumber": "1", "forceDecimals": "1", "sdecimals": "0", "decimals": "0",';
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
                var vcColor = PaletaColores; //'#EFC235';
                for (i = 0; i < $(result.d).length; i++) {
                    var itemColor = vcColor;
                    item = '{"value": "' + result.d[i].vcGrupo07 + '", "label":"' + result.d[i].vcGrupo01 + '","color": "' + itemColor + '",';
                    if (TipoTopTenCosto != "Empleado") {
                        item = item + '"link":"j-clickChart-' + result.d[i].vcGrupo01 + '",';
                    }
                    item = item + '"alpha":"100",';

                    console.log(oCulturaUsuario.Moneda.vcSimMon + FormatoNumero(result.d[i].vcGrupo07, oCulturaUsuario, false));
                    console.log("-----");
                    console.log(oCulturaUsuario.Moneda.vcSimMon + result.d[i].vcGrupo07);

                    item = item + '"tooltext":"Área: ' + result.d[i].vcGrupo01 + ', Costo: ' + oCulturaUsuario.Moneda.vcSimMon + FormatoNumero(result.d[i].vcGrupo07, oCulturaUsuario, false) + '" }';
                    if (i + 1 != $(result.d).length) {
                        item = item + ',';
                    }
                    cadena = cadena + item;
                }
                cadena = cadena + '] } ] }';

                $("#dvTop1Grupo1").show();
                $("#dvTop1Grupo2").show();

                JsonTopTenCosto = cadena;
                var valoraleatorio = Math.random();
                var IdGrafico = "dv_TopTen1_render" + valoraleatorio;

                if (FusionCharts(IdGrafico) === undefined) {
                    var repositorioChartDur = new FusionCharts("StackedBar2D", IdGrafico, "100%", "300", "0");
                    repositorioChartDur.setJSONData(cadena);
                    repositorioChartDur.setTransparent(true);
                    repositorioChartDur.render("dv_TopTen1");
                } else {
                    FusionCharts(IdGrafico).setJSONData(cadena);
                }

                $("#dv_TopTen1").fadeIn(300);

                AlinearTitulosGraficos();

            } else {
                $("#dv_TopTen1 *").remove();
                $("#dv_TopTen1").append('<div style="font-size:medium; color:Gray; width: 450px; height: 200px;">No hay datos para mostrar.</div> ');
                //$("#dvTop1Grupo1").hide();
                //$("#dvTop1Grupo2").hide();
            }

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function ObtenerCuentas() {
    var optVals = [];
    if ($('#dwCuenta').val() == "-1") {
        $('#dwCuenta option').each(function () {
            optVals.push($(this).attr('value').replace("-1", "0000000000"));
        });
    }
    else {
        optVals.push($('#dwCuenta').val());
    }
    return "|" + optVals.join("|,|") + "|";
}

function TopTen_Consumo_() {
    var str = $("#dwDesde").val();
    var vcMesInicial = str.substring(0, 2) + '' + str.substring(5);
    var idOperador = $("#dwOperador").val();
    var idGrupo = $("#ddlGrupo2").val();
    var idTipLin = $("#dwTipoLinea").val();
    var vcCodCue = ObtenerCuentas(); //$("#dwCuenta").val();    
    var Nivel = $("#ddlNivel").val();
    var TipoTopTenConsumo = $("#cboTipoTopTenConsumo").val();

    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "DashBoard_Facturacion.aspx/Grafico_TopTen_Consumo",
        data: "{'p_vcMesInicial':'" + vcMesInicial + "','p_idGrupo':'" + idGrupo + "','TipoTopTenConsumo':'" + TipoTopTenConsumo + "', 'p_idOperador': '" + idOperador +
              "', 'p_inTipLin': '" + idTipLin + "', 'p_vcCodCue': '" + vcCodCue + "','Nivel':'" + Nivel + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            // ==============================================================================================================================
            if ($(result.d).length > 0) {
                var cadena = '';
                cadena = cadena + '{"chart": {';

                //exportEnabled 
                var PaletaColores = '#FFB300';
                var valueFontColor = "#FFFFFF'";
                cadena = cadena + '"baseFont":"Open Sans", "baseFontColor": "#6b737c", "legendBorderThickness": "0","legendShadow":"0","exportFileName":"TopTenConsumo",';
                cadena = cadena + '"subCaptionFontColor":"#9E9C9C","divlineThickness":"1","canvasbasecolor": "#CCCCCC", "snumberprefix": "",';
                cadena = cadena + '"legendItemFontColor":"#666666", "legendItemFontSize":"10", "paletteColors": "' + PaletaColores + '",';
                cadena = cadena + '"rotateValues":"1", "sformatnumber":"0", "showHoverEffect":"1", "showShadow":"0", "showXAxisLine":"1", ';
                cadena = cadena + '"showPercentValues":"0","showplotborder":"0", "valueFontColor":"' + valueFontColor + '", ';
                cadena = cadena + '"xAxisLineThickness":"1","maxLabelWidthPercent":"30", ';
                cadena = cadena + '"bgAlpha":"100", "canvasBgColor": "#ffffff", "canvasbgAlpha":"0", "canvasBorderAlpha":"0", "showAlternateHGridColor": "0",';
                cadena = cadena + '"captionAlignment":"left","showYAxisLine": "1", "showsyAxisLine": "1","divlineColor": "#999999",';
                cadena = cadena + '"divLineDashLen": "1","divLineDashed": "1","divLineGapLen": "0",';
                cadena = cadena + '"labeldisplay": "0","slantlabels": "1", "maxColWidth": "35", ';

                if (TipoTopTenConsumo == "Empleado") {
                    cadena = cadena + '"subCaption": "(Consumos agrupados por Empleados)",';
                }
                else {
                    cadena = cadena + '"subCaption": "(Consumos agrupados por Líneas)",';
                }

                cadena = cadena + '"showYAxisValues": "1","showvalues": "0","showlegend": "0","caption": "TOP TEN DE CONSUMO","xAxisName": "","yAxisName": "",'; //' + oCulturaUsuario.Moneda.vcSimMon + '
                cadena = cadena + '"bgColor": "#ffffff", "showBorder": "0", "showCanvasBorder": "0", "usePlotGradientColor": "0", "plotBorderAlpha": "15","exportenabled" : "1","exportShowMenuItem":"1",';
                cadena = cadena + '"placeValuesInside": "1", "showAxisLines": "1", "xAxisLineColor": "#A9A9A9", "yAxisLineColor": "#FFFFFF", "axisLineAlpha": "10","divLineIsDashed": "1",';
                cadena = cadena + '"divLineAlpha": "30", "showAlternateVGridColor": "0", "captionFontSize": "16", "subcaptionFontSize": "12", "subcaptionFontBold": "0",';
                cadena = cadena + '"formatNumberScale": "0", "formatNumber": "1", "forceDecimals": "0", "decimals": "0",';
                cadena = cadena + '"decimalSeparator": "' + oCulturaUsuario.vcSimDec + '", "thousandSeparator": "' + oCulturaUsuario.vcSimSepMil + '"';
                cadena = cadena + '';

                //console.log("idGrupo: ", idGrupo);


                switch (idGrupo) {
                    case "3": //VOZ
                        cadena += ',"numberSuffix": " Min"'; //Prefix
                        break;
                    case "4": //SMS
                        cadena += ',"numberSuffix": " Msj"'; //Prefix
                        break;
                    case "5": //DATOS
                        cadena += ',"numberSuffix": " KB","defaultNumberScale":"KB","numberScaleValue":"1024,1024,1024","numberScaleUnit":"MB,GB,TB"';
                        break;
                    default:
                        cadena += ',"numberscalevalue": "100,100,100"';
                        break;
                }
                cadena = cadena + ' }, "categories": [ {"category": [';
                var i = 0;
                for (i = 0; i < $(result.d).length; i++) {
                    var item = '{"label": "' + result.d[i].vcGrupo01 + '"}';
                    if (i + 1 != $(result.d).length) {
                        item = item + ',';
                    }
                    cadena = cadena + item;
                }

                cadena = cadena + '] } ] , "dataset": [ {"seriesname": "' + $("#ddlGrupo2 option:selected").text() + '", "data": [';
                var vcColor = '#F2C03A';
                var itemColor = PaletaColores; //vcColor;
                for (i = 0; i < $(result.d).length; i++) {
                    item = '{"value": "' + result.d[i].vcGrupo07 + '", "Color": "' + itemColor + '",';
                    item += '"alpha":"100",';
                    item += '"label":"' + result.d[i].vcGrupo01 + '",';
                    item += '"tooltext":"Empleado: ' + result.d[i].vcGrupo01 + ', ' + FormatoNumero(result.d[i].vcGrupo07, oCulturaUsuario, false) + '" }';

                    if (i + 1 != $(result.d).length) {
                        item = item + ',';
                    }
                    cadena = cadena + item;
                }

                cadena = cadena + '] } ] }';

                $("#dvTop2Grupo1").show();
                $("#dvTop2Grupo2").show();

                var valoraleatorio = Math.random();
                JsonTopTenConsumo = cadena;
                var repositorioChartDur = new FusionCharts("StackedBar2D", "dv_TopTen2_render" + valoraleatorio, "100%", "300", "0");
                repositorioChartDur.setJSONData(cadena);
                repositorioChartDur.setTransparent(true);
                repositorioChartDur.render("dv_TopTen2");


                if (TipoTopTenConsumo != "Empleado") {
                    FusionCharts('dv_TopTen2_render' + valoraleatorio).configureLink({
                        width: '100%',
                        height: '100%',
                        id: 'linked-chart',
                        renderAt: "dv_Dialog1",
                        overlayButton: { show: false }
                    }, 0
                    );
                    FusionCharts('dv_TopTen2_render' + valoraleatorio).addEventListener('BeforeLinkedItemOpen', function () {
                        dialog.dialog('open');
                    }
                    );
                }

                AlinearTitulosGraficos();


            } else {
                $("#dv_TopTen2 *").remove();
                $("#dv_TopTen2").append('<div style="font-size:medium; color:Gray; width: 450px; height: 200px;">No hay datos para mostrar.</div> ');
                $("#dvTop2Grupo1").hide();
                $("#dvTop2Grupo2").hide();
            }

            $("#dwDesde").prop('disabled', false);
            $("#dwCuenta").prop('disabled', false);
            if (CantOperadores > 2) {
                $("#dwOperador").prop('disabled', false);
            }
            if ($("#hdfCodLinTip_X_User").val() == "0") {
                $("#dwTipoLinea").prop('disabled', false);
            }

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function Grafico_TopTen_Servicio_() {
    var str = $("#dwDesde").val();
    var vcMesInicial = str.substring(0, 2) + '' + str.substring(5);

    var idOperador = $("#dwOperador").val();

    var idGrupo = $("#ddlGrupo2").val();
    var idTipLin = $("#dwTipoLinea").val();
    var vcCodCue = ObtenerCuentas(); // $("#dwCuenta").val();

    var TipoTopTenCosto = $("#cboTipoTopTenServicio").val();

    var Nivel = $("#ddlNivel").val();

    ObtenerCuentas();

    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "DashBoard_Facturacion.aspx/Grafico_TopTen_Servicio",
        data: "{'p_vcMesInicial':'" + vcMesInicial + "','p_idGrupo':'" + idGrupo + "','TipoTopTenCosto':'" + TipoTopTenCosto + "','p_idOperador':'" + idOperador +
              "', 'p_inTipLin': '" + idTipLin + "', 'p_vcCodCue': '" + vcCodCue + "','Nivel':'" + Nivel + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            // ==============================================================================================================================             
            if ($(result.d).length > 0) {

                var PaletaColores = '#01B8AA'; //'#78DC27';
                var valueFontColor = "#FFFFFF'";

                var cadena = '';
                cadena = cadena + '{"chart": {';
                cadena = cadena + '"baseFont":"Open Sans", "baseFontColor": "#6b737c", "legendBorderThickness": "0","legendShadow":"0","exportFileName":"TopTenCosto",';
                cadena = cadena + '"subCaptionFontColor":"#9E9C9C","divlineThickness":"1","canvasbasecolor": "#CCCCCC", "snumberprefix": "",';
                cadena = cadena + '"legendItemFontColor":"#666666", "legendItemFontSize":"10", "paletteColors": "' + PaletaColores + '",';
                cadena = cadena + '"rotateValues":"1", "sformatnumber":"0", "showHoverEffect":"1", "showShadow":"0", "showXAxisLine":"1", ';
                cadena = cadena + '"showPercentValues":"0","showplotborder":"0", "valueFontColor":"' + valueFontColor + '", ';
                cadena = cadena + '"xAxisLineThickness":"1","maxLabelWidthPercent":"30", ';
                cadena = cadena + '"bgAlpha":"100", "canvasBgColor": "#ffffff", "canvasbgAlpha":"0", "canvasBorderAlpha":"0", "showAlternateHGridColor": "0",';
                cadena = cadena + '"captionAlignment":"left","showYAxisLine": "0", "showsyAxisLine": "0","divlineColor": "#999999",';
                cadena = cadena + '"divLineDashLen": "1","divLineDashed": "1","divLineGapLen": "0",';
                cadena = cadena + '"labeldisplay": "0","slantlabels": "1", "maxColWidth": "35", ';

                if (TipoTopTenCosto == "Servicio") {
                    cadena = cadena + '"subCaption": "(Costos agrupados por Servicio)",';
                }

                cadena = cadena + '"showYAxisValues": "1","showvalues": "0","seriesnameintooltip": "1","showlegend": "0","caption": "TOP TEN DE SERVICIO","xAxisName": "","yAxisName": "","numberPrefix": "' + oCulturaUsuario.Moneda.vcSimMon + '",';
                cadena = cadena + '"bgColor": "#ffffff", "showBorder": "0", "showCanvasBorder": "0", "usePlotGradientColor": "0", "plotBorderAlpha": "25","theme": "fusion", "exportenabled" : "1","exportShowMenuItem":"1",';
                cadena = cadena + '"placeValuesInside": "1", "showAxisLines": "1", "xAxisLineColor": "#999999", "yAxisLineColor": "#FFFFFF", "axisLineAlpha": "10","divLineIsDashed": "1",';
                cadena = cadena + '"divLineAlpha": "30", "showAlternateVGridColor": "0", "captionFontSize": "16", "subcaptionFontSize": "12", "subcaptionFontBold": "0","numberscalevalue": "100,100,100",';
                cadena = cadena + '"formatNumberScale": "0", "formatNumber": "1", "forceDecimals": "1", "sdecimals": "0", "decimals": "0",';
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
                cadena = cadena + '] } ] , "dataset": [ {"seriesname": "' + ($("#ddlGrupo2 option:selected").text() == "<Todos>" ? "Todos" : $("#ddlGrupo2 option:selected").text()) + '", "data": [';
                var vcColor = PaletaColores; //'#EFC235';
                for (i = 0; i < $(result.d).length; i++) {
                    var itemColor = vcColor;
                    item = '{"value": "' + result.d[i].vcGrupo07 + '", "label":"' + result.d[i].vcGrupo01 + '","color": "' + itemColor + '",';
                    if (TipoTopTenCosto != "Servicio") {
                        item = item + '"link":"j-clickChart-' + result.d[i].vcGrupo01 + '",';
                    }
                    item = item + '"alpha":"100",';
                    item = item + '"tooltext":"Área: ' + result.d[i].vcGrupo01 + ', Costo: ' + oCulturaUsuario.Moneda.vcSimMon + FormatoNumero(result.d[i].vcGrupo07, oCulturaUsuario, false) + '" }';
                    if (i + 1 != $(result.d).length) {
                        item = item + ',';
                    }
                    cadena = cadena + item;
                }
                cadena = cadena + '] } ] }';

                JsonTopTenCosto = cadena;
                var valoraleatorio = Math.random();
                var IdGrafico = "dv_TopTen2_render" + valoraleatorio;

                if (FusionCharts(IdGrafico) === undefined) {
                    var repositorioChartDur = new FusionCharts("StackedBar2D", IdGrafico, "97%", "300", "0");
                    repositorioChartDur.setJSONData(cadena);
                    repositorioChartDur.setTransparent(true);
                    repositorioChartDur.render("dv_TopTen2");
                } else {
                    FusionCharts(IdGrafico).setJSONData(cadena);
                }

                $("#dv_TopTen2").fadeIn(300);

                AlinearTitulosGraficos();

            } else {
                $("#dv_TopTen2 *").remove();
                $("#dv_TopTen2").append('<div style="font-size:medium; color:Gray; width: 450px; height: 200px;">No hay datos para mostrar.</div> ');
            }


            $("#dwDesde").prop('disabled', false);
            $("#dwCuenta").prop('disabled', false);
            if (CantOperadores > 2) {
                $("#dwOperador").prop('disabled', false);
            }
            if ($("#hdfCodLinTip_X_User").val() == "0") {
                $("#dwTipoLinea").prop('disabled', false);
            }

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }

    });
}

function clickChart(a) {
    $("#tbConcepto").jqGrid("clearGridData", true).trigger("reloadGrid");
    if (a.indexOf('(') >= 0) {
        a = $.trim(a.substring(0, a.indexOf('(') - 1));
    }
    Detalle_Linea_(a);
}

function Detalle_Linea_(id) {

    if (id) {
        var p_vcNum = id;
        var str = $("#dwDesde").val();
        var vcMesPer = str.substring(0, 2) + '' + str.substring(5);

        $.ajax({
            type: "POST",
            url: "Dashboard_Facturacion.aspx/Datos_Modal",
            data: "{'p_vcNum': '" + p_vcNum + "', 'p_mesPer': '" + vcMesPer + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                if ($(result.d).length > 0) {

                    var codCue = result.d[0].vcGrupo06;

                    var pagina = "../Facturacion/Consultar/Con_Fac_ConsultaPrincipal.aspx?p_vcNum=" + id + "&p_vcCodCue=" + codCue + "&p_vcPer=" + vcMesPer;

                    fn_mdl_muestraForm(pagina, null, "Detalle de Facturación: Línea " + id, 900, 655);

                }

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    } else {
        alerta("Seleccione un registro");
    }
}

function fn_mdl_muestraForm(pURL, pFuncion, pTitulo, pAncho, pAlto) {
    if (!pTitulo) { pTitulo = ''; }
    //$("body").append("<div id='dv_ModalFrame'></div>");
    //var strHtml = '<iframe runat="server" id="ifrModal" width="100%" height="100%" frameborder="0" scrolling="auto" marginheight="0" marginwidth="0" src="' + pURL + '"></iframe>';
    //window.parent.
    $("body").append("<div id='dv_ModalFrame' style='overflow-y: hidden;'></div>");
    var strHtml = '<iframe runat="server" id="ifrModal" style="overflow-y: hidden;" width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="' + pURL + '"></iframe>';
    $("#dv_ModalFrame").html(strHtml);
    $("#dv_ModalFrame").dialog({
        modal: true,
        title: pTitulo,
        width: pAncho,
        height: (pAlto ? pAlto : 'auto'),
        resizable: false,
        show: true,
        hide: true,
        position: { my: "center", at: "top", of: window },
        buttons: {
            "Cerrar": function () {
                $("#dv_ModalFrame").dialog('close');
            }
        }
    });
}


// ==============================================================================================================================
//  GRAFICO PIE
// ==============================================================================================================================
function Grafico_Inferior_(inParam, inShowValues, inModo) {

    var str = $("#dwDesde").val();
    var vcMesInicial = str.substring(0, 2) + '' + str.substring(5);

    var vcMesFin = $("#dwDesde").val();
    var idOperador = $("#dwOperador").val();
    var idExpresado = $("#dwExpresado").val();
    var inTipLin = $("#dwTipoLinea").val();
    var vcCodCuenta = ObtenerCuentas(); // $("#dwCuenta").val();

    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "DashBoard_Facturacion.aspx/Grafico_Inferior",
        data: "{'vcNomGrupo':'" + (vcNomGrupo.length == 0 ? '0' : vcNomGrupo) +
            "','vcNomMes':'" + (vcNomMes.length == 0 ? '0' : vcNomMes) +
            "','inTipLin':'" + inTipLin +
             "','vcNomCuenta':'" + vcCodCuenta +
            "','p_vcMesInicial': '" + vcMesInicial + "','p_vcMesFin': '" + vcMesFin +
            "','p_idOperador': '" + idOperador + "','p_idExpresado': '" + idExpresado + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            // ==============================================================================================================================
            if ($(result.d).length > 0) {

                var cadena2 = '';
                cadena2 = cadena2 + '{"chart":{';
                cadena2 = cadena2 + '"caption":"DISTRIBUCIÓN POR CONCEPTOS","subCaption":"(Según montos asignados)", "subCaptionFontColor":"#9E9C9C","exportFileName":"DistribucionPorConceptos", ';
                cadena2 = cadena2 + '"captionAlignment":"left", "captionFontSize":"16", "subcaptionFontSize":"14", "subcaptionFontBold":"0", "toolTipColor": "ffffff", "exportenabled" : "1","exportShowMenuItem":"1",';
                cadena2 = cadena2 + '"baseFont":"Open Sans","baseFontColor":"6b737c", "bgAlpha":"25", "showShadow":"0", "use3DLighting":"0", "startingAngle": "0", "decimals": "2", ';
                cadena2 = cadena2 + '"toolTipBorderThickness":"0","toolTipBgColor":"#000000","toolTipBgAlpha":"80","toolTipBorderRadius":"2","toolTipPadding":"5",';
                cadena2 = cadena2 + '"showHoverEffect":"1","legendBgColor":"Fffffff", "legendItemFontSize": "12", "paletteColors": "#FFE019,#1D43A4,#78DC27,#0E2443,#1975EA", "legendItemFontColor": "#666666",   ';

                cadena2 = cadena2 + '"numberPrefix": "' + oCulturaUsuario.Moneda.vcSimMon + '","legendBorderThickness": "0","legendShadow":"0","legendPosition": "right",';
                cadena2 = cadena2 + '"showPercentValues": "1", "showPercentInTooltip": "0", "enableSmartLabels": "0", "enableMultiSlicing": "0", "decimals": "' + oCulturaUsuario.dcNumDec + '",';
                cadena2 = cadena2 + '"useroundedges": "0", "showvalues": "1", "showlabels": "0", "showLegend": "1", "labelDistance": "0", "slicingDistance": "15",';

                var Ancho = $(window).width();
                //debugger;
                var pieRadius = "80";
                if (Ancho < 400) {
                    pieRadius = "40";
                }
                else if (Ancho < 1000) {
                    pieRadius = "50";
                }
                cadena2 = cadena2 + '"pieRadius": "' + pieRadius + '", "bgColor": "#ffffff", "showBorder": "0", "usePlotGradientColor": "0", "useDataPlotColorForLabels": "1"';
                cadena2 = cadena2 + '},"legendborderalpha": "0", "data": [';

                //var cadena2 = ' {"chart":{"caption": "","yaxisname": "",  "showpercentvalues": "1", "decimals": "' + NumDec + '", "forceDecimals":"1", "decimalSeparator":"' + SimDec + '", "bgcolor": "#FFFFFF", "showalternatehgridcolor": "0",' +
                //                ' "showvalues": "1","startingangle": "120","labeldisplay": "WRAP","divlinecolor": "#CCCCCC","divlinealpha": "70","useroundedges": "0","canvasbgcolor": "#FFFFFF", "pieRadius":"60", ' +
                //                ' "canvasbasecolor": "#CCCCCC", "showcanvasbg": "1","animation": "0","showborder": "0","showlegend": "0","slicingdistance": "15","enablemultislicing": "1","theme": "fint" },"legendborderalpha": "0", "data": [ ';
                var i = 0;
                // ==============================================================================================================================
                for (i = 0; i < $(result.d).length; i++) {
                    // ==============================================================================================================================

                    var vcColor = '';
                    if (i == 0) { vcColor = "#01B8AA"; }
                    if (i == 1) { vcColor = "#FE6260"; }
                    if (i == 2) { vcColor = "#EDC911"; }
                    if (i == 3) { vcColor = "#8CD4E1"; }
                    if (i == 4) { vcColor = "#7687A6"; }
                    if (i == 5) { vcColor = "#A66999"; }
                    if (i == 6) { vcColor = "#7990FF"; }
                    if (i == 7) { vcColor = "#B687AC"; }
                    //if (i == 5) { vcColor = vcGrupo06; }
                    //if (i == 6) { vcColor = vcGrupo07; }
                    //if (i == 7) { vcColor = vcGrupo08; }
                    if (i == 8) { vcColor = vcGrupo09; }
                    if (i == 9) { vcColor = vcGrupo10; }
                    if (i == 10) { vcColor = vcGrupo11; }
                    if (i == 11) { vcColor = vcGrupo12; }
                    if (i == 12) { vcColor = vcGrupo13; }
                    if (i == 13) { vcColor = vcGrupo14; }
                    if (i == 14) { vcColor = vcGrupo15; }

                    if (i == 15) { vcColor = vcGrupo16; }
                    if (i == 16) { vcColor = vcGrupo17; }
                    if (i == 17) { vcColor = vcGrupo18; }
                    if (i == 18) { vcColor = vcGrupo19; }
                    if (i == 19) { vcColor = vcGrupo20; }

                    var item = '{"label": "' + result.d[i].vcGrupo01.substring(0, 3) + '","color": "' + vcColor + '","value": "' + result.d[i].vcGrupo03 + '"}';
                    var item2 = '{"label": "' + result.d[i].vcGrupo01.substring(0, 3) + '","color": "' + vcColor + '","value": "' + result.d[i].vcGrupo03 + '"}';
                    item2 = '{"label": "' + result.d[i].vcGrupo21 + '","alpha": "100","color": "' + vcColor + '","value": "' + result.d[i].vcGrupo03 + ' ", "issliced" : "0" }';
                    if (i + 1 != $(result.d).length) {
                        item = item + ',';
                        item2 = item2 + ',';
                    }

                    cadena2 = cadena2 + item2;
                }
                cadena2 = cadena2 + '] }';
                if (inModo == 1) {
                    //var myChart8 = new FusionCharts("../../Common/Scripts/FusionCharts/doughnut2d.swf", "myChartId8" + Math.random(), Graficowidth, Graficoheigth + 40);
                    //myChart8.setJSONData(cadena2);
                    //myChart8.render("chartContainer2");

                    JsonDistribucionConceptos = cadena2;
                    var repositorioChartDur = new FusionCharts("doughnut2d", "chartContainer2_render" + Math.random(), "97%", "295", "0");
                    repositorioChartDur.setJSONData(cadena2);
                    repositorioChartDur.setTransparent(true);
                    repositorioChartDur.render("chartContainer2");

                    AlinearTitulosGraficos();

                }
            } else {
                $("#chartContainer2 *").remove();
                $("#chartContainer2").append('<div style="font-size:medium; color:Gray; width: 450px; height: 200px;">No hay datos para mostrar.</div> ');
            }

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function ListarCuentaPlanesPorOperador() {
    if ($("#dwOperador").val() != -1) {
        if ($("#dwOperador").val() == null) {
            $("#dwCuenta").html("");
            $("#dwCuenta").append($("<option></option>").attr("value", -1).text("<Todas>"));
            $("#dwOperador > option[value='-1']").attr("selected", true);
            $("#dwCuenta > option[value='-1']").attr("selected", true);

            Cabecera_GrupoServicio_();
            Grafico_Historico_Periodo(0, 1, 1);
            
        } else {
            $.ajax({
                type: "POST",
                url: "Dashboard_Facturacion.aspx/ListarCuentaPorOperador",
                data: "{'inCodOpe': '" + $("#dwOperador").val() + "', 'codAreaSeleccionada': '"+ codAreaSeleccionada +"'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //debugger;
                    $("#dwCuenta").html("");
                    if ($(result.d).length > 0) {
                        $("#dwCuenta").append($("<option></option>").attr("value", -1).text("<Todas>"));
                        $(result.d).each(function () {

                            $("#dwCuenta").append($("<option></option>").attr("value", this.P_vcCod.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"')).text(this.vcNom.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"')));

                        });
                    } else {
                        $("#dwCuenta").append($("<option></option>").attr("value", -2).text("--Sin cuenta--"));
                    }
                    $("#dwCuenta > option[value='-1']").attr("selected", true);


                    $("input[name='dwCuenta_input']").attr("disabled", "disabled");

                    Cabecera_GrupoServicio_();
                    Grafico_Historico_Periodo(0, 1, 1);

                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
             
        }
    } else {
        $("#dwCuenta").html("");
        $("#dwCuenta").append($("<option></option>").attr("value", -1).text("<Todas>"));
        $("#dwOperador > option[value='-1']").attr("selected", true);
        $("#dwCuenta > option[value='-1']").attr("selected", true);

        Cabecera_GrupoServicio_();
        Grafico_Historico_Periodo(0, 1, 1);
    }
}

function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}


function DimPosElementos() {

    AlinearTitulosGraficos();

}

function AlinearTitulosGraficos() {
    //setTimeout(function () {
    //    $('text[fill="#6b737c"][font-size="16px"]').attr("x", "10");
    //    $('text[fill="#9e9c9c"][font-size="12px"]').attr("x", "10");
    //}, 1000);
}