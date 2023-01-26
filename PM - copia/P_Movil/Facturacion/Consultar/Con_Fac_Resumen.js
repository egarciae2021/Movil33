var Criterio;
var p_mesPer;

var inFilas;
var nuAltoFila = 40.04;
var ArrayPaginacion = [];
var datosExportacion = "";
var vcCue;

var oCulturaUsuario;
var SimMil;
var NumDec;
var SimDec;
function ENT_GEN_ResumenDetalle(p_vcNum, p_vcCodCue, p_vcCodOpe, p_vcPer) {
    this.p_vcNum = p_vcNum;
    this.p_vcCodCue = p_vcCodCue;
    this.p_vcCodOpe = p_vcCodOpe;
    this.p_vcPer = p_vcPer;
}
var ColModelCuentas = [];
$(function () {
    oCulturaUsuario = window.parent.parent.parent.oCulturaUsuario;

    $("#txtLinea").keypress(function (e) {
        if (e.which == 13) {
            $("#btnBuscar").click();
            return false;
        }
    });

    $("#txtCuenta").keypress(function (e) {
        if (e.which == 13) {
            $("#btnBuscar").click();
            return false;
        }
    });

    $("#verDetalle").dialog("destroy");
    if (p_dwPeriodo.length > 0) {
        $("#ddlPeriodo").val(p_dwPeriodo);
    }
    if (p_dwOperador.length > 0) {
        $("#ddlOperador").val(p_dwOperador);
    }

    inicio();
    function inicio() {

        Criterio = new ENT_MOV_IMP_Criterio();


        $("#btnBuscar").button();
        $("#btnBuscar").attr("title", "Buscar por número de línea");

        $("#btnExportar").button("option", "disabled", true);
        $("#btnExportar").attr("title", "No hay datos para mostrar");

        //$("#ddlOperador").val(5109);
    }

    $("#ddlPeriodo").change(function () {

        $.ajax({
            // ==============================================================================================================================
            type: "POST",
            url: "Con_Fac_Resumen.aspx/Guarda_ParametrosReporte",
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

        Criterio.vcTab = null;

        //        $("#dvGrupoLinea").hide();
        //        $("#dvGrupoCuenta").hide();
        $("#dvResumen").hide();

        //$("#ddlOperador").val(5109);
        //        Modelo_TablaCuentas();
        $("#btnExportar").button("option", "disabled", true);
        var selPer = this.value;
        $.ajax({
            // ==============================================================================================================================
            type: "POST",
            url: "Con_Fac_Resumen.aspx/Carga_Periodo",
            data: "{'p_vcNomGrupo_Para': 'dwDesde','p_vcValor_Para': '" + this.value + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                if ($(result.d).length > 0) {

                    var select = $("#ddlPeriodo");
                    select.empty();

                    $.each(result.d, function (index, itemData) {

                        select.append($('<option/>', {
                            value: itemData.IdGrupo,
                            text: itemData.vcGrupo
                        }));
                    });
                    $("#ddlPeriodo").val(selPer);
                }
                fnCargarDatos();
            },
            error: function (xhr, err, thrErr) {
                // ==============================================================================================================================
                MostrarErrorAjax(xhr, err, thrErr);
                // ==============================================================================================================================
            }
        });
    });

    $("#ddlOperador").change(function () {

        $.ajax({
            // ==============================================================================================================================
            type: "POST",
            url: "Con_Fac_Resumen.aspx/Guarda_ParametrosReporte",
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

        fnCargarDatos();

    });



    $("#btnBuscar").click(function () {
        vcCue = "";
        fnCargarDatos();
    });


    $("#btnExportar").button();
    //$("#btnExportar").click(function () {
    //    debugger;
    //    tipoRep = 'RepResumen';
    //    ExportarExcel();
    //});

    $(document).on("click", "#btnExportar", function () {
        //debugger;
        tipoRep = 'RepResumen';
        ExportarExcel();
    });

    $("#btnExportarCuenta").button();
    $(document).on("click", "#btnExportarCuenta", function () {
        //debugger;
        tipoRep = 'RepResumenCuenta';
        ExportarExcel();
    });

    //$("#ExportarExcelResumenFacturacion").button();
    //$(document).on("click", "#btnExportarResumenFacturacion", function () {
    //    debugger;
    //    tipoRep = 'RepResumenFacturacion';
    //    ExportarExcel();
    //});

    $("#btnExportarResumenFacturacion").button();
    $("#btnExportarResumenFacturacion").click(function () {
        //debugger;
        tipoRep = 'RepResumenFacturacion';
        ExportarExcelResumenFacturacion();
    });



    function ExportarExcel() {
        var Linea = $.trim($("#txtLinea").val()).replace(/'/g, "");
        pagina = "../../Administrar/Adm_Reporte.aspx?Tipo=" + tipoRep + "&vcTab=" + Criterio.vcTab + "&vcOpe=" + $("#ddlOperador").val() + "&vcCue=" + vcCue + "&vcPer=" + p_mesPer + "&vcLin=" + Linea;
        $("#ifExcel").attr("src", pagina);
    }

    function ExportarExcelCuenta() {
        var Linea = $.trim($("#txtLinea").val()).replace(/'/g, "");
        pagina = "../../Administrar/Adm_Reporte.aspx?Tipo=" + tipoRep + "&vcTab=" + Criterio.vcTab + "&vcOpe=" + $("#ddlOperador").val() + "&vcCue=" + vcCue + "&vcPer=" + p_mesPer + "&vcLin=" + Linea;
        $("#ifExcel").attr("src", pagina);
    }

    function ExportarExcelResumenFacturacion() {
        //debugger;
        var Linea = $.trim($("#txtLinea").val()).replace(/'/g, "");
        pagina = "../../Administrar/Adm_Reporte.aspx?Tipo=" + tipoRep + "&vcTab=" + Criterio.vcTab + "&vcOpe=" + $("#ddlOperador").val() + "&vcPer=" + p_mesPer;
        $("#ifExcel").attr("src", pagina);
    }

    $(window).resize(function () {
        DimPosElementos();
    });

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();

        NumeroInicialFilas();
        $("#tbCuenta").setGridWidth($(window).width() - 60);

        $("#tbLinea").setGridWidth($(window).width() - 60);
        $("#tbLinea").setGridHeight(300);

    }

    fnCargarDatos();
    NumeroInicialFilas();
});

function Modelo_TablaCuentas() {

    var ColModel1 = [];
    var str = $("#ddlPeriodo").val();
    var vcMesPer = str.substring(0, 2) + "" + str.substring(5);

    var inCodOpe = $("#ddlOperador").val();
    p_mesPer = vcMesPer;

    if ($("#ddlOperador").val() != '-1') {
        
        // ==============================================================================================================================
        $.ajax({
            // ==============================================================================================================================
            type: "POST",
            url: "Con_Fac_Resumen.aspx/Cabecera_ResumenCuenta_x_Periodo",
            data: "{'p_mesPer': '" + vcMesPer + "', 'p_codOpe':'" + inCodOpe + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            // ==============================================================================================================================
            success: function (result) {
                //debugger;
                // ==============================================================================================================================
                if ($(result.d).length > 0) {
                    ColModelCuentas = [];
                    var inTotalReg = $(result.d).length;
                    // ========================================================================================================================
                    // COLUMNAS DINAMICAS - GRILLA # CABECERA
                    // ========================================================================================================================    
                    var i;
                    for (i = 0; i < $(result.d).length; i++) {
                        if (i === 0) {
                            ColModel1.push({
                                //label: result.d[i].vcGrupo01, name: 'vcGrupo01', index: 'vcGrupo01', hidden: result.d[i].btGrupoHidden, align: result.d[i].vcGrupoAlign, width: result.d[i].vcGrupoWidth, search: false, sortable: false, resizable: false
                                label: "Código", name: result.d[i].vcGrupo, index: result.d[i].vcGrupo, hidden: result.d[i].btGrupoHidden, align: result.d[i].vcGrupoAlign, width: result.d[i].vcGrupoWidth, search: false, sortable: true, resizable: false
                            });
                        } else if (i == 1) {
                            ColModel1.push({
                                //label: result.d[i].vcGrupo01, name: 'vcGrupo' + ((i + 1) > 9 ? '' : '0') + (i + 1), index: 'vcGrupo' + ((i + 1) > 9 ? (i + 1) : '0' + (i + 1)), 
                                label: "Cuenta", name: result.d[i].vcGrupo01, index: result.d[i].vcGrupo01, 
                                hidden: result.d[i].btGrupoHidden,
                                resizable: false, align: result.d[i].vcGrupoAlign, width: result.d[i].vcGrupoWidth, search: false, sortable: true, formatter: function (value, options, rData) {
                                    //return "<a href='#' style='color:#08088A;' title='ver Líneas de: " + value + "' name='" + rData.vcGrupo02 + "' id='" + rData.vcGrupo01 + "' onclick='Modelo_TablaLineas(this.id);' style='height:22px'>" + rData.vcGrupo02 + "</a>";
                                    return "<span style='color:#08088A; cursor: pointer; text-decoration: underline; ' title='Ver Líneas de: " + value + "' name='" + rData.Codigo + "' id='" + rData.Codigo + "' onclick='Modelo_TablaLineas(this.id);' style='height:22px'>" + rData.Cuenta + "</span>";
                                },
                                classes: 'vcGrupo' + ((i + 1) > 10 ? (i < inTotalReg - 1 ? i : '00') : '0' + (i < inTotalReg - 1 ? i : '0'))

                            });
                        } else {
                            ColModel1.push({
                                //label: result.d[i].vcGrupo01, name: 'vcGrupo' + ((i + 1) > 9 ? '' : '0') + (i + 1), index: 'vcGrupo' + ((i + 1) > 9 ? (i + 1) : '0' + (i + 1)),
                                label: result.d[i].vcGrupo01, name: result.d[i].vcGrupo01, index: result.d[i].vcGrupo01,
                                hidden: result.d[i].btGrupoHidden,
                                resizable: false,
                                align: result.d[i].vcGrupoAlign,
                                width: result.d[i].vcGrupoWidth,
                                search: false,
                                sortable: true,
                                formatter: function (value, options, rData) {
                                    return value;
                                },
                                //formatter: 'number', 
                                //formatoptions: { decimalSeparator: oCulturaUsuario.vcSimDec, thousandsSeparator: oCulturaUsuario.vcSimSepMil, decimalPlaces: oCulturaUsuario.dcNumDec},
                                classes: 'vcGrupo' + ((i + 1) > 10 ? (i < inTotalReg - 1 ? i : '00') : '0' + (i < inTotalReg - 1 ? i : '0'))
                                , sorttype: 'number'
                            });
                        }
                    }
                    ColModelCuentas = ColModel1;

                    // ========================================================================================================================    
                    try {

                        // ========================================================================================================================
                        // GRILLA # DETALLE
                        // ========================================================================================================================    
//                        var tbGrupoCuenta = $("#tbCuenta").jqGrid({
//                            datatype: "local",
//                            colModel: ColModel1,
//                            sortname: "IdGrupo",
//                            sortorder: "asc",
//                            width: $(window).width() - 60,
//                            height: "auto",
//                            loadtext: 'Cargando datos...',
//                            recordtext: "{0} - {1} de {2} elementos",
//                            emptyrecords: 'No hay resultados',
//                            pgtext: 'Pág: {0} de {1}',
//                            rownumbers: true,
//                            gridview: true,
//                            shrinkToFit: true,
//                            viewrecords: true,
//                            sortable: true,
//                            caption: "Resumen de Facturación: Cuenta(s) de " + $("#ddlOperador option:selected").text() + " - " + $("#ddlPeriodo option:selected").text(),
//                            pager: "#Paginador",
//                            onSelectRow: function (id, select, item) {
//                                var data = $("#tbCuenta").getRowData(id);
//                                vcCue = data.vcGrupo01;
//                                Detalle_Cuenta_(data.vcGrupo01);
//                            },
//                            ondblClickRow: function (rowid, iRow, iCol, e) {
//                                var data = $("#tbCuenta").getRowData(rowid);
//                                vcCue = data.vcGrupo02;
//                                Detalle_Cuenta_(data.vcGrupo01);
//                            }
//                        });

                        // ========================================================================================================================    
                        Listar_Datos_Cuentas_();
                        $("#btnExportarResumenFacturacion").css('visibility', 'visible');
                        // ========================================================================================================================    
                    } catch (e) {
                        alerta(e);
                    }


                } else {
                    $("#tbCuenta").jqGrid('clearGridData');
                    Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);
                    $("#btnExportarResumenFacturacion").css('visibility', 'hidden');
                }
            }, // ==============================================================================================================================
            error: function (xhr, err, thrErr) {
                // ==============================================================================================================================
                MostrarErrorAjax(xhr, err, thrErr);
                // ==============================================================================================================================
            }

        });
    } else {
        $("#dvResumen").hide();
    }

}

function Modelo_TablaLineas(id, _Linea) {

    if (id != vcCue) {
        Criterio.vcTab = null;
    }

    Criterio.Cuentas = [];
    Cuenta = new ENT_MOV_Cuenta();
    Cuenta.P_vcCod = id;
    Criterio.Cuentas.push(Cuenta);

    vcCue = id;

    Criterio.Operadores = [];
    Operador = new ENT_GEN_Operador();
    Operador.P_inCodOpe = $("#ddlOperador").val();
    Criterio.Operadores.push(Operador);

    var ColModel1 = [];

    var str = $("#ddlPeriodo").val();
    var vcMesPer = str.substring(0, 2) + '' + str.substring(5);
    p_mesPer = vcMesPer;

    var pSearch = { multipleSearch: false, recreateFilter: true };

    if ($("#ddlOperador").val() == '-1') {
        alerta("Seleccione un operador..");
        $("#ddlOperador").focus();
    } else {
        $("#tbLinea").GridUnload();
        try {
            $("#dvGrupoLinea").show();
            $("#tbLinea").jqGrid("clearGridData", true).trigger("reloadGrid");

            $.ajax({
                type: "POST",
                url: "Con_Fac_Resumen.aspx/Listar_Cabecera_Linea",
                data: "{'inPagTam': '1','inPagAct':'1','vcOrdCol':'', 'vcTipOrdCol':'', 'oCriterio':'" + JSON.stringify(Criterio) + "', 'p_mesTabla': '" + p_mesPer + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var lista = [];
                    var i;
                    for (i = 0; i < $(result.d).length; i++) {
                        if (i === 0) {
                            ColModel1.push({
                                label: result.d[i].vcGrupo,
                                name: result.d[i].vcGrupo,
                                index: result.d[i].vcGrupo,
                                frozen: true,
                                hidden: true,
                                align: 'center',
                                width: 20,
                                search: false,
                                sortable: false,
                                resizable: true,
                                hidedlg: true
                            });
                        } else if (i == 1) {
                            ColModel1.push({
                                label: 'Línea',
                                name: result.d[i].vcGrupo,
                                index: result.d[i].vcGrupo,
                                frozen: true,
                                hidden: false,
                                align: 'center',
                                width: 100,
                                search: false,
                                resizable: false,
                                hidedlg: true,
                                formatter: function (value, options, rData) {
                                    if (value != rData[2]) {
                                        return "<span style='color:#08088A; cursor: pointer; text-decoration: underline; ' title='Ver Detalle Facturación de: " + value + "' name='" + rData[2] + "' id='" + value + "' onclick='Detalle_Linea(this.id, this);' style='height:22px'>" + value + "</span>";
                                    } else {
                                        return "<label id='lblLin_" + rData[0] + "' style='color:#08088A;'>" + value + "</label>";
                                    }
                                }
                            });
                        } else if (i == 2) {
                            ColModel1.push({
                                label: 'Cuenta',
                                name: result.d[i].vcGrupo,
                                index: result.d[i].vcGrupo,
                                frozen: true,
                                hidden: true,
                                align: 'center',
                                width: 70,
                                search: false,
                                resizable: true,
                                hidedlg: true
                            });
                        } else if (i == 3) {
                            ColModel1.push({
                                label: 'Operador',
                                name: result.d[i].vcGrupo,
                                index: result.d[i].vcGrupo,
                                frozen: true,
                                hidden: false,
                                align: 'left',
                                width: 100,
                                search: false,
                                resizable: false,
                                hidedlg: true
                            });
                        } else if (i == 4) {
                            ColModel1.push({
                                label: 'Empleado',
                                name: result.d[i].vcGrupo,
                                index: result.d[i].vcGrupo,
                                frozen: true,
                                hidden: false,
                                align: 'left',
                                width: 200,
                                search: false,
                                resizable: false,
                                hidedlg: true
                            });
                        } else {
                            ColModel1.push({
                                label: result.d[i].vcGrupo,
                                name: result.d[i].vcGrupo,
                                index: result.d[i].vcGrupo,
                                hidden: false,
                                align: 'right',
                                width: 125,
                                search: false,
                                resizable: false
                            });

                            lista.push({ title: result.d[i].vcGrupo, icon: false, select: true });
                        }

                    }

                    if (lista.length > 0) {
                        $("#dvTreeConceptos").dynatree({
                            checkbox: true,
                            selectMode: 3,
                            children: lista,
                            cookieId: "dynatree-Cb3",
                            idPrefix: "dynatree-Cb3-",
                            fx: { height: "toggle", duration: 200 },
                            onSelect: function (select, node) {
                                node.data.select = select;
                            }
                        });
                    }

                    if (_Linea == null) {
                        _Linea = "";
                    }

                    $("#tbLinea").jqGrid({
                        datatype: function () {
                            var rowId = $("#tbCuenta").jqGrid('getGridParam', 'selrow');
                            $.ajax({
                                url: "Con_Fac_Resumen.aspx/ListarLineas", //PageMethod
                                data: "{'inPagTam':'" + $('#tbLinea').getGridParam("rowNum") + "'," + //Tamaño de pagina
                            "'inPagAct':'" + parseFloat($('#tbLinea').getGridParam("page")) + "'," + //Pagina actual
                            "'vcOrdCol':'" + $('#tbLinea').getGridParam("sortname") + "'," + //Nombre de columna ordenado
                            "'vcTipOrdCol':'" + $('#tbLinea').getGridParam("sortorder") + "'," +
                            "'oCriterio': '" + JSON.stringify(Criterio) + "'," + //Tabla
                            "'vcCuenta': '" + (rowId == null ? "-1" : rowId) + "'," + //Si una cuenta fue seleccionada
                            "'p_mesTabla': '" + p_mesPer + "', 'Linea':'" + $("#txtLinea").val() + "'}", //periodo
                                dataType: "json",
                                type: "post",
                                contentType: "application/json; charset=utf-8",
                                success: function (result) {

                                    //                                    var resultado = JSON.parse(result.d);

                                    //                                    $("#tbLinea")[0].addJSONData(resultado["JQGrid"]);
                                    //                                    Criterio.vcTab = resultado["vcTab"];



                                    try {
                                        if (result.d.Items.length == 0) {
                                            Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);
                                        }

                                        $("#tbLinea")[0].addJSONData(result.d);
                                        $("#btnExportar").show();
                                        $("#btnExportar").button("option", "disabled", false);
                                        $("#btnExportar").attr("title", "Exportar a Excel");

                                    } catch (e) {
                                        Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);
                                    }
                                },
                                error: function (xhr, err, thrErr) {
                                    MostrarErrorAjax(xhr, err, thrErr);
                                }
                            });
                        },
                        jsonReader: {
                            root: "Items",
                            page: "PaginaActual",
                            total: "TotalPaginas",
                            records: "TotalRegistros",
                            repeatitems: true,
                            cell: "Row",
                            id: "ID"
                        },
                        colModel: ColModel1,
                        sortname: "vcNum",
                        sortorder: "asc",
                        rowNum: inFilas,
                        rowList: ArrayPaginacion,
                        width: $(window).width() - 60,
                        //height: $(window).height() - 377 - 100,
                        height: 200,
                        loadtext: 'Cargando datos...',
                        recordtext: "{0} - {1} de {2} elementos",
                        emptyrecords: 'No hay resultados',
                        pgtext: 'Pág: {0} de {1}',
                        rownumbers: true,
                        gridview: true,
                        shrinkToFit: false,
                        multiselect: false,
                        viewrecords: true,
                        headertitles: true,
                        hidegrid: false,
                        sortable: true,
                        caption: "Resumen de Líneas de la cuenta: " + vcCue,
                        pager: "#pagLinea",
                        onSelectRow: function (id, select, item) {
                            //                                var data = $("#tbLinea").getRowData(id);
                            //                                Detalle_Linea_(id);
                        },
                        ondblClickRow: function (rowid, iRow, iCol, e) {
                            var data = $("#tbLinea").getRowData(rowid);
                            var linea = data.vcNum.substring(data.vcNum.indexOf('>') + 1);
                            linea = linea.substring(0, linea.indexOf('<'));
                            Detalle_Linea_(rowid, linea);
                        },
                        gridComplete: function () {

                        },
                        loadComplete: function () {
                        }
                    });
                    //                    $("#tbLinea").jqGrid('setFrozenColumns');
                    $("#tbLinea").jqGrid('navGrid', "#pagLinea", { edit: false, add: false, del: false, refresh: true, view: false, search: false }, {}, {}, {}, pSearch);
                    //debugger;
                    $("#gview_tbLinea > .ui-jqgrid-titlebar").append("<div style='float:right'><div id='btnExportar' class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only' role='button' title='Exportar a Excel'><span class='ui-button-text'><img id='imgExportar' src='../../../Common/Images/Mantenimiento/Excel16.png' style='height:16px;width:16px;'></span></div>");
                    

                    //$("#tbLinea").jqGrid('navButtonAdd', '#pagLinea', { caption: "M/O", buttonicon: "ui-icon-calculator",
                    //    title: "Escoger columnas a mostrar/ocultar",
                    //    onClickButton: function () {
                    //        //                                 $("#tbLinea").jqGrid('columnChooser');
                    //        formulario = $('#dvLista').dialog({
                    //            title: "Mostrar/Ocultar columnas de la grilla",
                    //            width: 400,
                    //            height: 300,
                    //            modal: true,
                    //            show: true,
                    //            hide: true,
                    //            open: function (event, ui) { $(".ui-dialog-titlebar-close", ui.dialog | ui).hide(); },
                    //            resizable: false,
                    //            position: { my: "center", at: "center", of: window },
                    //            buttons: {
                    //                "Aceptar": function () {

                    //                    var i;
                    //                    for (i = 0; i < lista.length; i++) {
                    //                        $("#tbLinea").jqGrid('hideCol', lista[i].title);
                    //                    }

                    //                    var rootNode = $("#dvTreeConceptos").dynatree("getRoot");
                    //                    var selNodes = rootNode.tree.getSelectedNodes();

                    //                    var selKeys = $.map(selNodes, function (node1) {
                    //                        $("#tbLinea").jqGrid('showCol', node1.data.title);
                    //                    });

                    //                    $(this).dialog('close');
                    //                },
                    //                Todos: {
                    //                    text: "Todos",
                    //                    click: function () {

                    //                        $("#dvTreeConceptos").dynatree("getRoot").visit(function (node) {
                    //                            node.select(true);
                    //                        });
                    //                        return false;
                    //                    }
                    //                },
                    //                "Ninguno": function () {

                    //                    $("#dvTreeConceptos").dynatree("getRoot").visit(function (node) {
                    //                        node.select(false);
                    //                    });
                    //                    return false;
                    //                },

                    //                "Cerrar": function () {
                    //                    $(this).dialog('close');
                    //                }
                    //            }
                    //        });
                    //    }
                    //});
                    //.jqGrid('gridResize')
                    //                    $(".myMultiSearch").change(function () {
                    //                        if ($(this).is(':checked')) {
                    //                            pSearch.multipleSearch = true;
                    //                            $(".myMultiSearch").attr("checked", "checked");
                    //                        }
                    //                        else {
                    //                            pSearch.multipleSearch = false;
                    //                            $(".myMultiSearch").removeAttr("checked");
                    //                        }
                    //                    });

                }, error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });

        } catch (e) {
            alerta(e);
        }

    }
}

function Listar_Datos_Cuentas_() {
    var Linea = $.trim($("#txtLinea").val()).replace(/'/g, "");
    var Cuenta = $.trim($("#txtCuenta").val()).replace(/'/g, "");
    var str = $("#ddlPeriodo").val();
    var vcMesPer = str.substring(0, 2) + '' + str.substring(5);
    var inCodOpe = $("#ddlOperador").val();

    $("#tbCuenta").jqGrid('clearGridData');
    var tbGrupoCuenta;
    $.ajax({
        type: "POST",
        url: "Con_Fac_Resumen.aspx/Lista_ResumenCuenta_x_Periodo",
        data: "{'p_mesPer': '" + vcMesPer + "', 'p_codOpe':'" + inCodOpe + "', 'Linea':'" + Linea + "', 'Cuenta':'" + Cuenta + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // ==============================================================================================================================
        success: function (result) {

            var PrimeraCuenta = '';
            
            if ($(result.d).length > 0) {

                PrimeraCuenta = $(result.d)[0].vcGrupo01;
                
//                $.each(result.d, function (index, value) {
//                    $("#tbCuenta").jqGrid('addRowData', value.Id, value);
//                });

                $("#dvResumen").show();
                var cont;
                for (cont = 0; cont < result.d.length - 1; cont++) {
                
                    var columnas = JSON.parse(result.d[0]);
                    var datos = JSON.parse(result.d[1].toString());
                    for (var i = 0; i < datos.length; i++) {
                        PrimeraCuenta = "-1";
                        //PrimeraCuenta = datos[0].Codigo;
                        datos[i].Total = FormatoNumero(datos[i].Total, oCulturaUsuario, false);
                    }

                    if (columnas.length > 0) {
                        var formato = "function (value, options, rData) { return \"<a href=\'#\'name=\'value\' id=\'\" + value + \"\' onclick=\'Modelo_TablaLineas(this.id)\' >\" + value + \"</a>\"; }";
                        if (columnas[1].label == "Cuenta") {
                            columnas[1].formatoptions = formato;
                        }
                    }
                    //debugger;
                    tbGrupoCuenta = $("#tbCuenta").jqGrid({
                        datatype: "local",
                        colModel: ColModelCuentas,
                        data: datos,
                        sortname: "IdGrupo",
                        sortorder: "asc",
                        width: $(window).width() - 60,
                        height: 155,
                        loadtext: 'Cargando datos...',
                        recordtext: "{0} - {1} de {2} elementos",
                        emptyrecords: 'No hay resultados',
                        pgtext: 'Pág: {0} de {1}',
                        rownumbers: true,
                        //gridview: true,
                        //rowNum: 10000,
                        rowList: [5, 10, 15, 100],
                        rowNum: 5,
                        shrinkToFit: true,
                        viewrecords: true,
                        hidegrid: false,
                        sortable: true,
                        caption: "Resumen de Facturación: Cuenta(s) de " + $("#ddlOperador option:selected").text() + " - " + $("#ddlPeriodo option:selected").text(),
                        pager: "#PaginadorCuenta",
                        onSelectRow: function (id, select, item) {
                            $("#txtLinea").val("");
                            //var data = $("#tbCuenta").getRowData(id);
                            ////vcCue = data.vcGrupo01;
                            ////Detalle_Cuenta_(data.vcGrupo01);
                            //
                            //if (vcCue != data.Codigo) {
                            //    //Modelo_TablaLineas(data.Codigo);
                            //    vcCue = data.Codigo;
                            //}
                        },
                        ondblClickRow: function (rowid, iRow, iCol, e) {
                            var data = $("#tbCuenta").getRowData(rowid);
                            //vcCue = data.vcGrupo02;
                            //Detalle_Cuenta_(data.vcGrupo01);
                            vcCue = data.Codigo;
                            Detalle_Cuenta_(data.Codigo);
                        }
                    }).navGrid("#PaginadorCuenta", { edit: false, add: false, search: false, del: false });

                    $("#gview_tbCuenta > .ui-jqgrid-titlebar").append("<div style='float:right'><div id='btnExportarCuenta' class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only' role='button' title='Exportar a Excel'><span class='ui-button-text'><img id='imgExportar' src='../../../Common/Images/Mantenimiento/Excel16.png' style='height:16px;width:16px;'></span></div>");

                }

                if (Linea != null && Linea != '' && PrimeraCuenta != '') {
                    Modelo_TablaLineas(PrimeraCuenta, Linea);
                }

            } else {
                Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);
                //                $("#dvGrupoCuenta").hide();
                //                $("#dvPanel").hide();
                $("#dvResumen").hide();
            }


            //if (Linea != null && Linea != '' && PrimeraCuenta != '') {
            //    Modelo_TablaLineas(PrimeraCuenta, Linea);
            //}

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }

    });
}

function Detalle_Linea(id, span) {
    var cuenta = $(span).attr("name");
    var oResumenDetalle = new ENT_GEN_ResumenDetalle();
    oResumenDetalle.p_vcNum = id;
    oResumenDetalle.p_vcCodCue = vcCue;
    if (cuenta != undefined && cuenta != "") {
        oResumenDetalle.p_vcCodCue = cuenta;
    }
    oResumenDetalle.p_vcCodOpe = $("#ddlOperador").val();
    oResumenDetalle.p_vcPer = p_mesPer;

    $("#hdfCodCue").val(vcCue);
    $("#hdfCodOpe").val(oResumenDetalle.p_vcCodOpe);

    if (id) {
        var pagina = "Con_Fac_ConsultaPrincipal.aspx?p_vcNum=" + oResumenDetalle.p_vcNum + "&p_vcCodCue=" + oResumenDetalle.p_vcCodCue + "&p_vcPer=" + p_mesPer;
//        $("#ifDetalle").attr("src", pagina);
//        $("#dvModal").dialog({
//            title: "Detalle de Facturación: Línea " + id,
//            width: 900,
//            height: 635,
//            modal: true,
//            resizable: false,
//            position: { my: "center", at: "top", of: window },
//            buttons: {
//                "Cerrar": function () {
//                    $(this).dialog('close');
//                }
//            }
//        });
        fn_mdl_muestraForm(pagina, null, "Detalle de Facturación: Línea " + id, 900, 635);
    }
    else {
        alerta("Seleccione un registro");
    }
}

function DetalleLinea_(id) {

    var rowId = $("#tbLinea").jqGrid('getGridParam', 'selrow');
    var rowData = jQuery("#tbLinea").getRowData(id);

    var oResumenDetalle = new ENT_GEN_ResumenDetalle();
    oResumenDetalle.p_vcNum = rowData['vcNum'];
    oResumenDetalle.p_vcCodCue = rowData['Cuenta'];
    oResumenDetalle.p_vcCodOpe = $("#ddlOperador").val();
    oResumenDetalle.p_vcPer = p_mesPer;

    $("#hdfCodCue").val(vcCue);
    $("#hdfCodOpe").val(oResumenDetalle.p_vcCodOpe);

    if (id) {
        var pagina = "Con_Fac_ConsultaPrincipal.aspx?p_vcNum=" + oResumenDetalle.p_vcNum + "&p_vcCodCue=" + oResumenDetalle.p_vcCodCue + "&p_vcPer=" + p_mesPer;

        fn_mdl_muestraForm(pagina, null, "Detalle de Facturación: Línea " + rowData['vcNum'], 900, 635);
    }
    else {
        alerta("Seleccione un registro");
    }
}

function Detalle_Linea_(id, linea) {
    var rowData = jQuery("#tbLinea").getRowData(id);
    var oResumenDetalle = new ENT_GEN_ResumenDetalle();
    oResumenDetalle.p_vcNum = linea;
    oResumenDetalle.p_vcCodCue = rowData['Cuenta'];
    oResumenDetalle.p_vcCodOpe = $("#ddlOperador").val();
    oResumenDetalle.p_vcPer = p_mesPer;

    $("#hdfCodCue").val(vcCue);
    $("#hdfCodOpe").val(oResumenDetalle.p_vcCodOpe);

    if (id) {
        var pagina = "Con_Fac_ConsultaPrincipal.aspx?p_vcNum=" + oResumenDetalle.p_vcNum + "&p_vcCodCue=" + oResumenDetalle.p_vcCodCue + "&p_vcPer=" + p_mesPer;

        fn_mdl_muestraForm(pagina, null, "Detalle de Facturación: Línea " + linea, 900, 635);
    }
    else {
        alerta("Seleccione un registro");
    }
}

function Detalle_Linea_(id, linea) {
    var rowData = jQuery("#tbLinea").getRowData(id);
    var oResumenDetalle = new ENT_GEN_ResumenDetalle();
    oResumenDetalle.p_vcNum = linea;
    oResumenDetalle.p_vcCodCue = rowData['Cuenta'];
    oResumenDetalle.p_vcCodOpe = $("#ddlOperador").val();
    oResumenDetalle.p_vcPer = p_mesPer;

    $("#hdfCodCue").val(vcCue);
    $("#hdfCodOpe").val(oResumenDetalle.p_vcCodOpe);

    if (id) {
        var pagina = "Con_Fac_ConsultaPrincipal.aspx?p_vcNum=" + oResumenDetalle.p_vcNum + "&p_vcCodCue=" + oResumenDetalle.p_vcCodCue + "&p_vcPer=" + p_mesPer;

        fn_mdl_muestraForm(pagina, null, "Detalle de Facturación: Línea " + rowData['vcNum'], 900, 655);
    }
    else {
        alerta("Seleccione un registro");
    }
}

function Detalle_Cuenta_(id) {

    var rowId = $("#tbCuenta").jqGrid('getGridParam', 'selrow');
    var rowData = jQuery("#tbCuenta").getRowData(rowId);

    var str = $("#ddlPeriodo").val();
    var vcMesPer = str.substring(0, 2) + '' + str.substring(5);
    p_mesPer = vcMesPer;
    if (id) {
        var pagina = "Con_Fac_ConsultaPrincipal.aspx?p_vcNum=&p_vcCodCue=" + id + "&p_vcPer=" + p_mesPer;
        fn_mdl_muestraForm(pagina, null, "Detalle de Facturación: " + vcCue, 900, 635);
    } else {
        alerta("Seleccione un registro");
    }
}

function NumeroInicialFilas() {
    //debugger;
    ArrayPaginacion = [];
    //inFilas = Math.floor(($(window).height() - 200) / nuAltoFila);
    inFilas = 6;

    ArrayPaginacion.push(inFilas);
    ArrayPaginacion.push(inFilas + inFilas);
    ArrayPaginacion.push(inFilas + inFilas + inFilas);
}

function fn_mdl_muestraForm(pURL, pFuncion, pTitulo, pAncho, pAlto) {
    if (!pTitulo) { pTitulo = 'VisualSoft'; }

    $("body").append("<div id='dv_ModalFrame' style='overflow:hidden;'></div>");
    var strHtml = '<iframe runat="server" id="ifrModal" width="100%" height="100%" scrolling="no" frameborder="0" style="overflow:hidden;" marginheight="0" marginwidth="0" src="' + pURL + '"></iframe>';

    $("#dv_ModalFrame").html(strHtml);
    $("#dv_ModalFrame").dialog({
        modal: true,
        title: pTitulo,
        width: pAncho,
        height: (pAlto ? pAlto + 35 : 'auto'),
        resizable: false,
        show: true,
        hide: true,
        position: { my: "center", at: "top", of: window },

        buttons: {

            "Cerrar": function () {
                $(this).dialog('close');
            }
        }
    });
}

function fnCargarDatos() {
    //debugger;
    if ($("#ddlOperador").val() == -1) {
        if ($('#ddlOperador > option').length > 2) {
            $("#ddlOperador").val("-1");
        }
    }
    
    if ($("#ddlOperador").val() != "-1") {
        $("#btnExportarResumenFacturacion").css('visibility', 'visible');
    }
    else {
        $("#btnExportarResumenFacturacion").css('visibility', 'hidden');
    }


    $("#tbCuenta").GridUnload();
    //        $("#dvExporta2").hide();
    $("#dvGrupoCuenta").show();

    Criterio.vcTab = null;


    $("#dvResumen").hide();
    Modelo_TablaCuentas();

    $("#btnExportar").button("option", "disabled", true);

    $("#dvGrupoLinea").hide();
}

