var Modal;
var inFilas;
var inAltGrid;
$(function () {

    //#region Inicializando variables

    //inAltGrid = $(window).height() - 168;

    // #endregion

    //#region Defniniendo Controles

    $("#txtPeriodo").keypress(ValidarFecha);
    $("#eegCobrosDevoluciones_btnExportarExcel").button("option", "disabled", true);

    kendo.culture("es-PE");
    $("#txtPeriodo").removeClass("ui-corner-all");
    $("#txtPeriodo").css({
        "border": "none",
        "padding": "0px"
    });
    $("#txtPeriodo").kendoDatePicker({
        culture: "es-PE",
        start: "year",
        depth: "year",
        //        value: fechainicio,
        format: "MM/yyyy",
        footer: false
    }).data("kendoDatePicker");

    $("#txtEmpleado").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: raiz("Common/WebService/General.asmx/ListarEmpleadoPorNombreTipoLinea"),
                data: "{'inMaxFil': '" + 200 + "'," +
                               "'vcNomEmp': '" + $("#txtEmpleado").val().replace(/'/g, "&#39").replace(/\\/g, "&#92") + "'," +
                               "'inTipLin': '" + $("#ddlTipoLinea").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        var itemE = item.split("-");
                        return {
                            label: itemE[1],
                            vcCodEmp: itemE[0],
                            grupOri: itemE[2],
                            vcDni: itemE[3]
                        }
                    }));
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtEmpleado").val(ui.item.vcCodEmp + " - " + ui.item.label);
            return false;
        },
        select: function (event, ui) {
            $("#txtEmpleado").val(ui.item.vcCodEmp + " - " + ui.item.label);
            $("#hdfIdEmpleado").val(ui.item.vcCodEmp);
            $("#txtLinea").val("");
            $("#hdfNumLinea").val("");
            $("#txtCodPedidoSolicitud").val("");
            $("#hdfCodPedidoSolicitud").val("");

            return false;
        },
        change: function (event, ui) {
            if (!ui.item) {
                //if (!Selecciono) {
                $("#hdfIdEmpleado").val("");
                $("#txtEmpleado").val("");
            } else {
                if ($("#txtEmpleado").val() == "") {
                    $("#hdfIdEmpleado").val("");
                } else {
                    $("#txtLinea").val("");
                    $("#hdfNumLinea").val("");
                    $("#txtCodPedidoSolicitud").val("");
                    $("#hdfCodPedidoSolicitud").val("");
                }
            }
            return false;
        },
        open: function (event, ui) {
            return false;
        }
    }).data("autocomplete")._renderItem = function (ul, item) {
        return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.vcCodEmp + "=" + item.label + "</a>").appendTo(ul);
    };

    $("#txtCodPedidoSolicitud").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: raiz("Common/WebService/General.asmx/ListarSolicitudPedidoPorTipoLinea"),
                data: "{'vcCod': '" + $("#txtCodPedidoSolicitud").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                      "'inMaxFil': '" + 200 + "'," +
                      "'inTipLin': '" + $("#ddlTipoLinea").val() + "'," +
                      "'vcIdEmp': '" + $("#hdfIdEmpleado").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {

                    response($.map(result.d, function (item) {
                        var itemL = item.split("|");
                        return {
                            label: itemL[0],
                            vcCodEmp: itemL[1],
                            vcEmp: itemL[2]
                        }
                    }));

                },
                cache: false,
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtCodPedidoSolicitud").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            if ($("#hdfBuscaEmpleado").val() == "1") {
                $("#txtEmpleado").val(ui.item.vcCodEmp + " - " + ui.item.vcEmp);
                $("#hdfIdEmpleado").val(ui.item.vcCodEmp);
            }

            $("#txtCodPedidoSolicitud").val(ui.item.label);
            $("#hdfCodPedidoSolicitud").val(ui.item.label);

            return false;
        },
        change: function (event, ui) {
            //if (!Selecciono) {
            if (!ui.item) {
                $("#hdfCodPedidoSolicitud").val("");
                $("#txtCodPedidoSolicitud").val("");

                if ($("#hdfBuscaEmpleado").val() == "1") {
                    $("#hdfIdEmpleado").val("");
                    $("#txtEmpleado").val("");
                    $("#txtEmpleado").attr("disabled", false);
                }
                //                $("#trEmpleado").hide();

            }
            return false;
        },
        open: function (event, ui) {
            Selecciono = false;
            return false;
        }
    }).data("autocomplete")._renderItem = function (ul, item) {
        return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.label + "</a>").appendTo(ul);
    };

    $("#txtLinea").keypress(ValidarEntero);
    $("#txtLinea").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: raiz("Common/WebService/General.asmx/ListarLineaPorEmpleado"),
                data: "{'vcNum': '" + $("#txtLinea").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                      "'inMaxFil': '" + 200 + "'," +
                      "'inTipLin': '" + $("#ddlTipoLinea").val() + "'," +
                      "'vcIdEmp': '" + $("#hdfIdEmpleado").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {

                    response($.map(result.d, function (item) {
                        var itemL = item.split("-");
                        return {
                            label: itemL[0],
                            vcEmp: itemL[1],
                            vcCodEmp: itemL[2]
                        }
                    }));

                },
                cache: false,
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtLinea").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            if ($("#hdfBuscaEmpleado").val() == "1") {
                $("#txtEmpleado").val(ui.item.vcCodEmp + " - " + ui.item.vcEmp);
                $("#hdfIdEmpleado").val(ui.item.vcCodEmp);
            }

            $("#txtLinea").val(ui.item.label);
            $("#hdfNumLinea").val(ui.item.label);

            return false;
        },
        change: function (event, ui) {
            //if (!Selecciono) {
            if (!ui.item) {
                $("#hdfNumLinea").val("");
                $("#txtLinea").val("");
                $("#txtCodPedidoSolicitud").val("");
                $("#hdfCodPedidoSolicitud").val("");

                if ($("#hdfBuscaEmpleado").val() == "1") {
                    $("#hdfIdEmpleado").val("");
                    $("#txtEmpleado").val("");
                    $("#txtEmpleado").attr("disabled", false);
                }
                //                $("#trEmpleado").hide();

            }
            return false;
        },
        open: function (event, ui) {
            Selecciono = false;
            return false;
        }
    }).data("autocomplete")._renderItem = function (ul, item) {
        return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.label + "</a>").appendTo(ul);
    };

    var tbCronograma = $("#grid").jqGrid({
        sortable: true,
        datatype: "local",
        datatype: function () {
            var dtInicio = new Date();
            $.ajax({
                url: "Comp_Adm_CobrosDevoluciones.aspx/ListarCobrosDevoluciones", //PageMethod
                data: "{'IdEmpleado':'" + $('#hdfIdEmpleado').val() + "'," +
                      "'vcCodPedSol':'" + $('#hdfCodPedidoSolicitud').val() + "'," +
                      "'inTipoLinea':'" + $('#ddlTipoLinea').val() + "'," +
                      "'vcLinea':'" + $('#hdfNumLinea').val() + "'," +
                      "'inVerRegistros':'" + $('#ddlVerRegistros').val() + "'," +
                      "'vcPeriodo':'" + $('#txtPeriodo').val() + "'," +
                      "'inPagTam':'" + $('#grid').getGridParam("rowNum") + "'," +
                      "'inPagAct':'" + parseInt($('#grid').getGridParam("page")) + "'," +
                      "'vcOrdCol':'" + $('#grid').getGridParam("sortname") + "'," + //Nombre de columna ordenado
                      "'vcTipOrdCol':'" + $('#grid').getGridParam("sortorder") + "'}", //Tipo de orden de columna asc, desc
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    $("#grid")[0].addJSONData(result.d);

                    if (result.d.Items.length > 0) {
                        $("#eegCobrosDevoluciones_btnExportarExcel").button("option", "disabled", false);
                        $("#eegCobrosDevoluciones_btnExportarExcel").attr("title", "Exportar a Excel");
                    } else {
                        $("#eegCobrosDevoluciones_btnExportarExcel").button("option", "disabled", true);
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
                {
                root: "Items",
                page: "PaginaActual",
                total: "TotalPaginas",
                records: "TotalRegistros",
                repeatitems: true,
                cell: "Row",
                id: "P_inCodSol"
            },
        colModel: [{ name: 'IdCronogramaPago', label: 'IdCronogramaPago', hidden: true, key: true },
                       { name: 'IdEmpleado', label: 'Cód. Empleado', hidden: false, width: 66, align: 'left', resizable: false },
                       { name: 'NomEmp', label: 'Empleado', hidden: false, width: 230 },
                       { name: 'PedidoSolicitud', label: 'Pedido / Solicitud', hidden: false, width: 100 },
                       { name: 'Linea', label: 'Línea', hidden: false, width: 70, align: "center" },
                       { name: 'TipoProceso', label: 'Tipo de proceso', hidden: false, width: 70, align: "center" },
                       { name: 'Periodo', label: 'Periodo', hidden: false, width: 65, align: "center" },
                       { name: 'Vigente', label: 'Vigente', hidden: false, width: 55, align: "center",
                           formatter: function (value, options, rData) {
                               if (value == "NO")
                                   return "<a href='#' style='color:#08088A;' title='Ver detalles de anulación' onclick='Ver_Detalle(\"" + rData[0] + "\");' style='height:22px'>" + value + "</a>";
                               else
                                   return value
                           }
                       },
   		               { name: 'MontoCuota', label: 'Monto', hidden: false, width: 70, align: "right" },
                       { name: 'TipoDocumento', label: 'Tipo motivo', hidden: false, width: 85, align: "center" },
                       { name: 'Motivo', label: 'Motivo', hidden: false, width: 200 },
                       { name: 'EstadoCobro', label: 'Estado de comprobante', hidden: false, width: 100, align: 'center' },
                       { name: 'NumeroComprobante', label: 'Número de comprobante', hidden: false, width: 125, align: 'center',
                           formatter: function (value, options, rData) {
                               return "<a href='#' style='color:#08088A;' title='Vista Preliminar: " + rData[12] + "' name='" + value + "' id='" + rData[12] + "' onclick='Ver_Reporte(\"" + rData[0] + "\");' style='height:22px'>" + value + "</a>";
                           }
                       },
                       { name: 'NroCom', label: 'NroCom', hidden: true },
                       { name: 'Vig', label: 'Vig', hidden: true },
                       { name: 'IdTipDoc', label: 'IdTipDoc', hidden: true }
                   ],
        viewrecords: true,
        pager: "#pager", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: 15, //$("#hdfTamPag").val(), //"10" PageSize.
        rowList: [15, 30, 50],  //TamanosPaginaSel, //Variable PageSize DropDownList. 
        sortname: "Periodo", //sortname: idTabla, //Default SortColumn
        sortorder: "desc", //Default SortOrder.
        rownumbers: true,
        shrinkToFit: false,
        multiselect: true,
        width: 950,
        gridComplete: function () {
            var grid = $("#grid").getDataIDs();
            for (var i = 0; i < grid.length; i++) {
                var data = $('#grid').jqGrid('getRowData', grid[i]);
                if (data.Vig == "NO") {
                    $("#jqg_grid_" + (grid[i])).hide();
                }
            }
        }
    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });

    //#endregion

    //#region Funciones

    inicioPagina();

    function inicioPagina() {
        DimPosElementos();
    }

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        var AnchoLateral = $(".LateralSplitter");

        inAltGrid = $(window).height() - 250;
        //$("#grid").setGridWidth($("#TabDetalle").width() - 13);
        $("#grid").setGridHeight(inAltGrid);
    }

    function NumeroInicialFilas() {
        var nuAltoFila = 23.04;
        inFilas = Math.floor(inAltGrid / nuAltoFila);
    }

    function fnAnularCobroDevolucion() {
        var ids = $("#grid").jqGrid('getGridParam', 'selarrrow');
        if (ids.length == 0) {
            alerta("Seleccione por lo menos un registro");
            return;
        }

        for (var i = 0; i < ids.length; i++) {
            var datos = $("#grid").jqGrid('getRowData', ids[i]);
            if (datos.NroCom != "") {
                alerta("Sólo se puede anular cobros o devoluciones que no tengan un comprobante o nota de crédito asociados.");
                return;
            } else if (datos.Vig == "NO") {
                alerta("Sólo se puede anular cobros o devoluciones vigentes.");
                return;
            }
        }

        $('#divAnulacion').dialog({
            title: "Anular Cobros / Devoluciones",
            modal: true,
            buttons: {
                "Si": function () {
                    $.ajax({
                        type: "POST",
                        url: "Comp_Adm_CobrosDevoluciones.aspx/AnularCobroDevolucion",
                        data: "{'IdCroPag': '" + ids.toString() + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            if (result.d == "1") {
                                $("#grid").trigger("reloadGrid");
                            } else if (result.d == "0") {
                                alerta("Hubo un error al intentar anular los registros seleccionados, por favor comuníquese con su administrador");
                                return;
                            } else if (result.d == "-1") {
                                alerta("Sólo se puede anular cobros o devoluciones que no tengan un comprobante o nota de crédito asociados.");
                                return;
                            } else if (result.d == "-2") {
                                alerta("Sólo se puede anular cobros o devoluciones vigentes.");
                                return;
                            }
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });

                    $(this).dialog("close");
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            }
        });
    }

    if ($("#hdfBuscaEmpleado").val() == "0") {
        $("#btnNuevaDevolucion").button("option", "disabled", true);
        $("#btnAnularRegistros").button("option", "disabled", true);
    }

    //#endregion

    //#region Acciones

    $(window).resize(function () {
        //        DimPosElementos();
        NumeroInicialFilas();
        TamanioGrilla();
    });


    function TamanioGrilla() {
        var panelwidth = $("#divGrilla").width();
//        alerta(panelwidth);
        var panelheitgh = $("#divGrilla").height();
        $("#grid").setGridWidth($(window).width() - 70);
        $("#grid").setGridHeight($(window).height() - 285);
        if (panelwidth > 502) {
            $("#grid").setGridWidth($(window).width() - 70);
        }
        else {
            $("#grid").setGridWidth(718 - 300);
        }

        $("#grid").setGridHeight($(window).height() - 285);

    }
    TamanioGrilla();


    $("#btnBuscar").click(function () {
        $("#grid").trigger("reloadGrid");
    });

    $("#btnLimpiar").click(function () {
        $("#hdfIdEmpleado").val("");
        $("#txtEmpleado").val("");
        $("#txtCodPedidoSolicitud").val("");
        $("#hdfCodPedidoSolicitud").val("");
        $("#hdfNumLinea").val("");
        $("#txtLinea").val("");
        $("#ddlVerRegistros").val("-1");
//        $("#txtPeriodo").val("");
        if ($("#txtPeriodo").val() == "") {
            var fecha = new Date();
            var mes = fecha.getMonth() + 1;
            var fechaActual = (mes < 10 ? '0' : '') + mes + '/' + fecha.getFullYear();
            $("#txtPeriodo").val(fechaActual);
        }
        $("#grid").trigger("reloadGrid");
    });

    $("#btnNuevaDevolucion").click(function () {
        var wAlto = $(window).height();

        $("#ifDevolucion").attr("width", 704);
        $("#ifDevolucion").attr("height", 586);

        var $Pagina = '../../Administrar/Adm_NuevaSolicitud.aspx?EsModal=1&DefTipoSolicitud=30&EsCulminada=1';
        $("#ifDevolucion").attr("src", $Pagina);
        Modal = $('#divDevolucion').dialog({
            title: "Nueva Devolución",
            width: 690,
            height: 600,
            modal: true,
            resizable: false
        });
    });

    $("#btnAnularRegistros").click(function () {
        fnAnularCobroDevolucion();
    });

    //#endregion

});

//#region Funciones

function Ver_Detalle(id) {
    var row = $("#grid").getRowData(id);
    var titulo = "Detalles " + ((row.IdTipDoc == 1) ? "del cobro anulado" : "de la devolución anulada");

    var pagina = "Comp_Adm_DetalleAnulacion.aspx?IdCroPag=" + id;
    fn_mdl_muestraForm(pagina, null, titulo, 500, 315);
}

function Ver_Reporte(id) {
    var tipoRep = 'RepComprobantePdf';
    var row = $("#grid").getRowData(id);
    $("#ifReporte").hide();
    var pagina = "../../Administrar/Adm_Reporte.aspx?Tipo=" + tipoRep + "&vcPeriodo=" + row.Periodo + "&idEmp=" + row.IdEmpleado + "&nroComp=" + row.NroCom;
    formulario = $('#dvVisPre').dialog({
        title: "Vista Preliminar del Documento",
        width: 880,
        height: $(window).height() - 40,
        modal: true,
        show: true,
        hide: true,
        maxWidth: 880,
        minWidth: 550,
        minHeight: 450,
        position: { my: "center", at: "top", of: window },
        resizable: true,

        buttons: {
            "Cerrar": function () {
                $(this).dialog('close');
            }
        }
    });
    $("#ifReporte").attr("src", pagina);
    //    fn_mdl_muestraForm(pagina, null, "Vista Preliminar", 900, 600);
}

function fn_mdl_muestraForm(pURL, pFuncion, pTitulo, pAncho, pAlto) {
    if (!pTitulo) { pTitulo = ''; }

    $("#dvVisPre").append("<div id='dv_ModalFrame'></div>");
    var strHtml = '<iframe runat="server" id="ifrModal" width="100%" height="100%" frameborder="0" scrolling="auto" marginheight="0" marginwidth="0" src="' + pURL + '"></iframe>';

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
                $(this).dialog('close');
            }
        }
    });
}

function fnShowIframe() {
    $("#ifReporte").show();
}

//#endregion