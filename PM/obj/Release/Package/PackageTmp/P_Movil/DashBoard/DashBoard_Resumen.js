///////SOLICITUDES/////////
var IdNotaSeleccionada = '';
var vcTodos = "0";
var vcTipos = "0"; //General
var inFiltro = 2;
var vcFiltro = '';
var vcFiltro2 = '';
var vcVista = "General";
var vcRangoFechaIni = "";
var vcRangoFechaFin = "";
var TamanoPagina = [10, 20, 30];
var vcFileName = "";
var oCulturaUsuario;
var CarpetaDominio = '';

var inFilas;
var nuAltoFila = 40.04;
var ArrayPaginacion = [];
///////////////////////////

var rowsGrillaIncidencias;
var rowsGrillaSolicitudes;

var language_Datatable = {
    "paginate": {
        "previous": 'Anterior',
        "next": 'Siguiente'
    },
    "lengthMenu": "_MENU_ registros por página",
    "zeroRecords": "No hay datos para mostrar",
    "info": "Página _PAGE_ de _PAGES_",
    "infoEmpty": "",
    "infoFiltered": "(filtered from _MAX_ total records)",
    "sSearch": "Buscar",
};


function ENT_GEN_ResumenDetalle(p_vcNum, p_vcCodCue, p_vcCodOpe, p_vcPer) {
    this.p_vcNum = p_vcNum;
    this.p_vcCodCue = p_vcCodCue;
    this.p_vcCodOpe = p_vcCodOpe;
    this.p_vcPer = p_vcPer;
}

$(function () {
    //#region Notas Incidencias 05/06/2015 wapumayta
    const mostrarTablaInsidencia = $('#hdfMostrarTablaInsidencias').val();

    if (mostrarTablaInsidencia !== 'True') {
        $('#div-tabla-solicitudes').hide();
    }


    $(".usu").hide();
    $("#pnlAdjuntar").hide();
    $('#txtNotaEnviar').live("keypress", function (e) {
        if (e.keyCode == 13) {
            if ($("#hdfIdTecnico").val().toString() == "-1") {
                registrarNota_usuario();
            }
            else {
                registrarNota();
            }
        }
        //        else {
        //            return ValidarAlfaNumericoConEspacios(e);
        //        }
    });
    //#endregion

    CarpetaDominio = window.top.$("#hdfCodigoDominio").val() != '' ? '/' + window.top.$("#hdfCodigoDominio").val() : '';

    ///Modelo_TablaLineas();

    //window.parent.$("#dvCargando").hide();
    $(".btnNormal").button({});
    $(".btnNormal").button();
    $(".boton").button();
    window.parent.fnCerrarCargaInicial();
    //FusionCharts.setCurrentRenderer('javascript');
    oCulturaUsuario = window.parent.parent.oCulturaUsuario;
    //if ($("#hdfTieneEmpleado").val() != "1") {
    //    alert(1);
    //    //$("#pnlCuerpoFloat").hide();
    //    //$("#dvSinEmpleado").show();
    //} else {
    MostrarPie(jsonDatosPie);
    MostrarHistorico(jsonDatosHistorico);
    MostrarPieResumen(jsonDatosPieResumen);
    MostrarHistoricoResumen(jsonDatosHistoricoResumen);
    if ($("#hdfAdmin").val() == "1") {
        vcTodos = "1";
    }
    if ($("#hdfTecnico").val() == "1") {
        vcTodos = "1";
    }
    if ($("#hdfResApr").val() == "1") {
        vcTodos = "1";
    }

    $("#ddlPeriodo").change(function () {
        window.parent.$("#dvCargando").show();
        window.location.href = 'DashBoard_Resumen.aspx?pe=' + $("#ddlPeriodo").val() + '&inCodTip=' + $("#ddlTipoLinea").val();
        window.parent.$("#dvCargando").hide();
    });

    $("#ddlTipoLinea").change(function () {
        window.parent.$("#dvCargando").show();
        window.location.href = 'DashBoard_Resumen.aspx?pe=' + $("#ddlPeriodo").val() + '&inCodTip=' + $("#ddlTipoLinea").val();
        window.parent.$("#dvCargando").hide();
    });

    vcTipos = $("#hdfGruTipSol").val(); //General

    if ($("#hdfOpcionPrincipal").val() != "0") {
        $("#ddlTipoLinea").attr("disabled", "disabled");
    } else {
        $("#ddlTipoLinea").removeAttr("disabled");
    }


    fnObtenerLineas();
    obtenerTickets();
    obtenerSolicitudes();


    if ($("#hdfVerSolicitud").val() == "1") { $("#dvGrid").show(); } else { $("#dvGrid").hide(); }

    if ($("#hdfVerIncidencia").val() == "1") { $("#dvgridSolicitud").show(); } else { $("#dvgridSolicitud").hide(); }

    //if ($("#hdfVerDetalle").val() == "1") { $("#dvDetalle").show(); } else { $("#dvDetalle").hide(); }
    if ($("#hdfVerDetalle").val() == "1") { $("#dvDetalle").hide(); } else { $("#dvDetalle").hide(); }

    if ($("#hdfVerResumen").val() == "1") { $("#dvFacturacion").show(); } else { $("#dvFacturacion").hide(); }


    $("#dvAgregarSolicitud").click(function () {
        //var vcTab = "tbPrincipal_TabJQ3_AccordionProd3_Item1_tab";
        //var vcTab = window.parent.DevolverTabSolicitudes();
        var vcTab = "modulo_4"; // window.top.fnObtenerWindowPlantillaTab().DevolverTabSolicitudes();
        var vcTitulo = "Solicitudes";
        //var vcPagina = "P_Movil/Administrar/Solicitudes/Adm_ListadoSolicitudes.aspx?inCod=4&amp;isAccessAdd=1&amp;inTip=2&amp;inTipOri=1";
        var vcPagina = "P_Movil/Administrar/Solicitudes/Adm_ListadoSolicitudes.aspx?inCod=4&isAccessAdd=1&inTip=2&inTipOri=1";
        AbrirTab(vcTab, vcTitulo, vcPagina, false);
    });

    $("#btnRegistraNota").click(function () {
        if ($("#hdfIdTecnico").val().toString() == "-1") {
            registrarNota_usuario();
        }
        else {
            registrarNota();
        }
    });

    $("#dvAgregarIncidencia").click(function () {
        //var vcTab = "tbPrincipal_TabJQ3_AccordionProd3_Item6_Item0_tab";
        var vcTab = "opcion_79"; // window.parent.DevolverTabRegistrarIncidencias();
        var vcTitulo = "Registrar Ticket";
        var vcPagina = "P_Movil/AdministrarTickets/AdmTck_RegistrarTicket.aspx?inCod=79&amp;inTip=3&amp;inTipOri=1";
        AbrirTab(vcTab, vcTitulo, vcPagina, false);
    });

    //$("#dvAgregarSolicitud").hover(function () {
    //    var pos = $(this).offset();
    //    var width = $(this).width();
    //    var title = $(this).attr("data-tooltip");
    //    if (title != '') {
    //        $("#miToolTip").html(title);
    //        $("#miToolTip").css("left", pos.left + $(this).width() + 35);
    //        $("#data-tooltip-triangle").css("left", pos.left + $(this).width() - 35);
    //        $("#miToolTip").css("top", pos.top + 34);
    //        $("#data-tooltip-triangle").css("top", pos.top + 28);
    //        $("#miToolTip").show();
    //        $("#data-tooltip-triangle").show();
    //    }
    //},
    //function () {
    //    $("#miToolTip").hide();
    //    $("#data-tooltip-triangle").hide();
    //});

    $("#btnImprimir").click(function () {
        if ($('#ddlPeriodo > option').length > 1) {
            window.print();
        } else {
            alerta("No hay datos para imprimir");
        }
    });

    $("#dvAgregarIncidencia").hover(function () {
        var pos = $(this).offset();
        var width = $(this).width();
        var title = $(this).attr("data-tooltip");
        if (title != '') {
            $("#miToolTip").html(title);
            $("#miToolTip").css("left", pos.left + $(this).width() + 35);
            $("#data-tooltip-triangle").css("left", pos.left + $(this).width() - 35);
            $("#miToolTip").css("top", pos.top + 34);
            $("#data-tooltip-triangle").css("top", pos.top + 28);
            $("#miToolTip").show();
            $("#data-tooltip-triangle").show();
        }
    },
    function () {
        $("#miToolTip").hide();
        $("#data-tooltip-triangle").hide();
    });

    $(".ConLink").live("click", function () {
        var vcCodIMEI = $(this).attr("codIMEI");
        $("#ifDetalleDispositivo").css({ "width": "600px", "height": "470px" });
        $("#ifDetalleDispositivo").attr("src", "../Administrar/Mantenimiento/Mnt_DetalleDispositivo.aspx?vcOpc='N' &CodDis=" + vcCodIMEI);

        $('#dvDetalleDispositivo').dialog({
            title: "Detalle de Dispositivo",
            modal: true,
            resizable: false,
            width: 640,
            height: 600,
            buttons: {
                "Cerrar": function () {
                    $(this).dialog("close");
                }
            }
        });

        $("#dvDetalleDispositivo").css("overflow", "none");

        //        var datos = $("#grid").jqGrid('getRowData', id);
        //        $('#ifNota').attr("src", "Adm_SolicitudNota.aspx?IdSolicitud=" + id + "&IdEstApr=" + datos.F_inEstSol_Apr + "&IdEstPro=" + datos.F_inEstSol);
        //        formulario = $('#dvNota').dialog({
        //            title: "Notas de la Solicitud: " + datos.vcCodigo,
        //            height: 520,
        //            width: 703,
        //            modal: true
        //        });

        //        $("#imgNueNot_" + id).hide();
    });


    function Modelo_TablaCuentas() {

        var ColModel1 = [];
        var str = $("#ddlPeriodo").val();
        var vcMesPer = str.substring(0, 2) + "" + str.substring(5);

        var inCodOpe = $("#ddlOperador").val();

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
                                    label: "Código", name: result.d[i].vcGrupo, index: result.d[i].vcGrupo, hidden: result.d[i].btGrupoHidden, align: result.d[i].vcGrupoAlign, width: result.d[i].vcGrupoWidth, search: false, sortable: false, resizable: false
                                });
                            } else if (i == 1) {
                                ColModel1.push({
                                    //label: result.d[i].vcGrupo01, name: 'vcGrupo' + ((i + 1) > 9 ? '' : '0') + (i + 1), index: 'vcGrupo' + ((i + 1) > 9 ? (i + 1) : '0' + (i + 1)), 
                                    label: "Cuenta", name: result.d[i].vcGrupo01, index: result.d[i].vcGrupo01,
                                    hidden: result.d[i].btGrupoHidden,
                                    resizable: false, align: result.d[i].vcGrupoAlign, width: result.d[i].vcGrupoWidth, search: false, sortable: false, formatter: function (value, options, rData) {
                                        //return "<a href='#' style='color:#08088A;' title='ver Líneas de: " + value + "' name='" + rData.vcGrupo02 + "' id='" + rData.vcGrupo01 + "' onclick='Modelo_TablaLineas(this.id);' style='height:22px'>" + rData.vcGrupo02 + "</a>";
                                        return "<a href='#' style='color:#08088A;' title='ver Líneas de: " + value + "' name='" + rData.Codigo + "' id='" + rData.Codigo + "' onclick='Modelo_TablaLineas(this.id);' style='height:22px'>" + rData.Cuenta + "</a>";
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
                                    sortable: false,
                                    formatter: function (value, options, rData) {
                                        return value;
                                    },
                                    //formatter: 'number', 
                                    //formatoptions: { decimalSeparator: oCulturaUsuario.vcSimDec, thousandsSeparator: oCulturaUsuario.vcSimSepMil, decimalPlaces: oCulturaUsuario.dcNumDec},
                                    classes: 'vcGrupo' + ((i + 1) > 10 ? (i < inTotalReg - 1 ? i : '00') : '0' + (i < inTotalReg - 1 ? i : '0'))

                                });
                            }
                        }
                        ColModelCuentas = ColModel1;

                        // ========================================================================================================================    
                        try {

                            // ========================================================================================================================    
                            Listar_Datos_Cuentas_();
                            // ========================================================================================================================    
                        } catch (e) {
                            alerta(e);
                        }


                    } else {
                        $("#tbCuenta").jqGrid('clearGridData');
                        Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);
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



    function Modelo_TablaLineas() {
        var ColModel1 = [];

        var vcMesPer = $("#ddlPeriodo").val();

        var pSearch = { multipleSearch: false, recreateFilter: true };

        $("#gridLineas_Resumen").GridUnload();
        try {
            //$("#dvGrupoLinea").show();
            $("#gridLineas_Resumen").jqGrid("clearGridData", true).trigger("reloadGrid");

            $.ajax({
                type: "POST",
                url: "DashBoard_Resumen.aspx/Listar_Cabecera_Linea",
                data: "{'inPagTam': '1','inPagAct':'1','vcOrdCol':'', 'vcTipOrdCol':'', 'isAdmin':'" + $("#hdfAdmin").val() + "', 'p_mesTabla': '" + vcMesPer + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var lista = [];
                    var i;
                    if ($(result.d).length == 0) {
                        $("#ctndCharResumenLinea *").remove();
                        $("#ctndCharResumenLinea").append('<div style="font-size:medium; color:Gray; width: 980px; height: 227px;">No hay datos para mostrar.</div> ');
                    } else {
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
                                    width: 70,
                                    search: false,
                                    resizable: false,
                                    hidedlg: true,
                                    formatter: function (value, options, rData) {
                                        if (value != rData[2]) {
                                            return "<a href='#' style='color:#08088A;' title='ver Detalle Facturación de: " + value + "' name='" + rData[2] + "' id='" + value + "' onclick='Detalle_Linea(this.id, this.name);' style='height:22px'>" + value + "</a>";
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
                                    width: 70,
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
                                    width: 58,
                                    search: false,
                                    resizable: false
                                });

                                lista.push({ title: result.d[i].vcGrupo, icon: false, select: true });
                            }
                        }

                        $("#gridLineas_Resumen").jqGrid({
                            datatype: function () {
                                var rowId = $("#tbCuenta").jqGrid('getGridParam', 'selrow');
                                $.ajax({
                                    url: "DashBoard_Resumen.aspx/ListarLineas", //PageMethod
                                    data: "{'inPagTam':'" + $('#gridLineas_Resumen').getGridParam("rowNum") + "'," + //Tamaño de pagina
                                            "'inPagAct':'" + parseFloat($('#gridLineas_Resumen').getGridParam("page")) + "'," + //Pagina actual
                                            "'vcOrdCol':'" + $('#gridLineas_Resumen').getGridParam("sortname") + "'," + //Nombre de columna ordenado
                                            "'vcTipOrdCol':'" + $('#gridLineas_Resumen').getGridParam("sortorder") + "'," +
                                            "'isAdmin': '" + $("#hdfAdmin").val() + "'," + //Tabla
                                            "'p_mesTabla': '" + vcMesPer + "'}", //periodo
                                    dataType: "json",
                                    type: "post",
                                    contentType: "application/json; charset=utf-8",
                                    success: function (result) {

                                        try {
                                            if (result.d.Items.length == 0) {
                                                Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);
                                            }
                                            $("#gridLineas_Resumen")[0].addJSONData(result.d);
                                            //$("#btnExportar").show();
                                            //$("#btnExportar").button("option", "disabled", false);
                                            //$("#btnExportar").attr("title", "Exportar a Excel");

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
                            width: $(window).width() - 150,
                            height: $(window).height() - 377,
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
                            pager: "#gridLineas_Resumen_Pager",
                            onSelectRow: function (id, select, item) {

                            },
                            ondblClickRow: function (rowid, iRow, iCol, e) {
                                var data = $("#gridLineas_Resumen").getRowData(rowid);
                                var linea = data.vcNum.substring(data.vcNum.indexOf('>') + 1);
                                linea = linea.substring(0, linea.indexOf('<'));
                                Detalle_Linea_(rowid, linea);
                            },
                            gridComplete: function () {

                            },
                            loadComplete: function () {
                            }
                        });
                        $("#gridLineas_Resumen").jqGrid('navGrid', "#gridLineas_Resumen_Pager", { edit: false, add: false, del: false, refresh: true, view: false, search: false }, {}, {}, {}, pSearch);

                    }
                }, error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });

        } catch (e) {
            alerta(e);
        }
    }

    $(window).resize(function () {
        DimPosElementos();
        //fnLateralSplitterDinamic();
    });
    DimPosElementos();
});
function Detalle_Linea(id, cuenta) {
    var oResumenDetalle = new ENT_GEN_ResumenDetalle();
    oResumenDetalle.p_vcNum = id;
    //oResumenDetalle.p_vcCodCue = vcCue;
    if (cuenta != undefined && cuenta != "") {
        oResumenDetalle.p_vcCodCue = cuenta;
    }
    //oResumenDetalle.p_vcCodOpe = $("#ddlOperador").val();
    oResumenDetalle.p_vcPer = $("#ddlPeriodo").val();

    $("#hdfCodCue").val(oResumenDetalle.p_vcCodCue);
    //$("#hdfCodOpe").val(oResumenDetalle.p_vcCodOpe);

    if (id) {
        var pagina = "../Facturacion/Consultar/Con_Fac_ConsultaPrincipal.aspx?p_vcNum=" + oResumenDetalle.p_vcNum + "&p_vcCodCue=" + oResumenDetalle.p_vcCodCue + "&p_vcPer=" + $("#ddlPeriodo").val();

        fn_mdl_muestraForm(pagina, null, "Detalle de Facturación: Línea " + oResumenDetalle.p_vcNum, 900, 635);
    }
    else {
        alerta("Seleccione un registro");
    }

    //var oResumenDetalle = new ENT_GEN_ResumenDetalle();
    //oResumenDetalle.p_vcNum = id;
    //oResumenDetalle.p_vcCodCue = vcCue;
    //if (cuenta != undefined && cuenta != "") {
    //    oResumenDetalle.p_vcCodCue = cuenta;
    //}
    //oResumenDetalle.p_vcCodOpe = $("#ddlOperador").val();
    //oResumenDetalle.p_vcPer = p_mesPer;
    //
    //$("#hdfCodCue").val(vcCue);
    //$("#hdfCodOpe").val(oResumenDetalle.p_vcCodOpe);
    //
    //if (id) {
    //    var pagina = "Con_Fac_ConsultaPrincipal.aspx?p_vcNum=" + oResumenDetalle.p_vcNum + "&p_vcCodCue=" + oResumenDetalle.p_vcCodCue + "&p_vcPer=" + p_mesPer;
    //
    //    fn_mdl_muestraForm(pagina, null, "Detalle de Facturación: Línea " + id, 900, 635);
    //}
    //else {
    //    alerta("Seleccione un registro");
    //}
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



function ObtenerIdLicencia(vcLicencia) {
    var idLicencia;
    switch (vcLicencia) {
        case "BASIC":
            idLicencia = 1;
            break;
        case "PREMIUM":
            idLicencia = 2;
            break;
        case "STANDARD":
            idLicencia = 3;
            break;
        default:
            idLicencia = 0;
            break;
    }
    return idLicencia;
}

function AbrirTab(tab, descripcion, pagina, VerDetalle) {
    var Nametab = "tbPrincipalProducto"; //window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
    var Accord = window.parent.$("#" + Nametab);
    var Id = "#" + tab;
    var $panel = Accord.find(Id);
    var Titulo = descripcion;

    if (!$panel.length) {//En el caso que no exista el tab, lo crea
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
        if (VerDetalle) {
            Accord.tabs('remove', $panel.index() - 3);
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
        } else {
            Accord.tabs('select', Id);

        }
    }
}

function GenerarBotones(id, biNueNot) {
    var vcBotones = '<img id="btnNota_' + id + '" src="../../Common/Images/Chat/write.png" alt="Ver Notas" style="margin-left:15px;" class="imgBtn ConImgSol" title="Ver Notas"/>';
    if (biNueNot == "0" || biNueNot == "False") {
        vcBotones += '<img id="imgNueNot_' + id + '" src="../../Common/Images/Chat/Mail.png" alt="Nueva Nota" style="margin-left:5px;" title="Nueva Nota"/> ';
    }
    else {
        vcBotones += '';
    }
    return '' + vcBotones + '';
}

function GenerarBotonesIncidencias(id, int_usu, int_tec) {
    if ($("#hdfIdTecnico").val().toString() == "-1") {
        if (int_usu > 0) {
            return '      <img id="btnCon' + id + '" src="../../Common/Images/Chat/write.png" alt="Ver Conversación" style="margin-left:15px !important;" class="imgBtn ConImg imgBtnn" title="Ver Conversación"/><img id="btnCon' + id + 'Let" src="../../Common/Images/Chat/mail.png" style="margin-left:5px;" alt="Ver Conversación" class="imgBtn m_left imgBtnn letter" title="Ver Conversación"/>';
        }
        else {
            return '      <img id="btnCon' + id + '" src="../../Common/Images/Chat/write.png" alt="Ver Conversación" style="margin-left:15px !important;" class="imgBtn ConImg imgBtnn" title="Ver Conversación"/>';
        }

    }
    else {
        if (int_tec > 0) {
            return '      <img id="btnCon' + id + '" src="../../Common/Images/Chat/write.png" style="margin-left:15px !important;" alt="Ver Conversación" class="imgBtn ConImg imgBtnn" title="Ver Conversación"/><img style="margin-left:5px;" id="btnCon' + id + 'Let" src="../../Common/Images/Chat/mail.png" alt="Ver Conversación" class="imgBtn m_left imgBtnn letter" title="Ver Conversación"/>';
        }
        else {
            return '      <img id="btnCon' + id + '" src="../../Common/Images/Chat/write.png" style="margin-left:15px !important;" alt="Ver Conversación" class="imgBtn ConImg imgBtnn" title="Ver Conversación"/>';
        }
    }

}

function CrearBotonesSemaforo(id, vcUmbral) {
    if (vcUmbral != "") {
        return '<img src="../../Common/Images/Semaforos/' + vcUmbral + '_16x16.png" />';
    }
    else {
        return '';
    }
}

function obtenerTickets() {


    var miIdBolsa;
    var miCodEstado;
    var miIDTipificacion;
    var miCodigoTicket = '000000000000';
    //            var miFechaInicio = $("#ddlPeriodo").val();
    //            var miFechaFin = $("#ddlPeriodo").val();
    var miFechaInicio = "-1";
    var miFechaFin = "-1";
    var miIdUsuario = "-1";
    var miTec = "-1";

    var miNombreEmpleado = "-1";
    var miCodigoEmpledo = "-1";

    //if ($("#hdfIdTecnico").val().toString() == "-1") {
    miIdUsuario = $("#hdfIdUsuarioLogeado").val().toString();
    miIdBolsa = "-1";
    //            }
    //            else {
    //                miIdBolsa = $("#ddlBolsa").val().split('-')[0];
    //                miTec = $("#ddlTecnicos").val();
    //            }

    //if ($("#ddlEstado").val() == "Todos")
    //miCodEstado = "-1";
    miCodEstado = "|PEN|,|ACT|,|EXT|";
    //            else
    //                miCodEstado = $("#ddlEstado").val();

    //if ($("#ddlTipo").val() == "Todos")
    miIDTipificacion = "-1";
    //            else
    //                miIDTipificacion = obtenerTipificaciones_porTipo();

    //            if (miIDTipificacion == "") {
    //                miIDTipificacion = "-1";
    //            }

    //            switch ($("#ddlTipoFiltro").val()) {
    //                case "1":
    //                    if ($.trim($("#txtCodigoTicket").val()) == "") {
    //                        miCodigoTicket = '000000000000';
    //                    }
    //                    else {
    //                        miCodigoTicket = $.trim($("#txtCodigoTicket").val());
    //                    }
    //                    break;
    //                case "2":
    //                    miCodigoEmpledo = $.trim($("#txtCodigoTicket").val());
    //                    break;
    //                case "3":
    //                    miNombreEmpleado = $.trim($("#txtCodigoTicket").val());
    //                    break;
    //                default:
    //                    break;
    //            }

    //            miFechaInicio = $("#txtFechaInicio").datepicker("getDate");
    //            miFechaFin = $("#txtFechaFin").datepicker("getDate");

    //            if (miFechaInicio == undefined) {
    //                miFechaInicio = "-1";
    //            }
    //            else {
    //                var DiaInicio = miFechaInicio.getDate().toString();
    //                var MesInicio = (parseInt(miFechaInicio.getMonth()) + 1).toString();
    //                var AnoInicio = miFechaInicio.getFullYear().toString();

    //                if (DiaInicio.length < 2)
    //                    DiaInicio = "0" + DiaInicio;

    //                if (MesInicio.length < 2)
    //                    MesInicio = "0" + MesInicio;

    //                miFechaInicio = AnoInicio + MesInicio + DiaInicio;
    //            }

    //            if (miFechaFin == undefined) {
    //                miFechaFin = "-1";
    //            }
    //            else {
    //                var DiaFin = miFechaFin.getDate().toString();
    //                var MesFin = (parseInt(miFechaFin.getMonth()) + 1).toString();
    //                var AnoFin = miFechaFin.getFullYear().toString();

    //                if (DiaFin.length < 2)
    //                    DiaFin = "0" + DiaFin;

    //                if (MesFin.length < 2)
    //                    MesFin = "0" + MesFin;

    //                miFechaFin = AnoFin + MesFin + DiaFin;
    //            }



    var inPagTam = 1000;
    var inPagAct = 1;
    var Columnas = [
                {
                    name: 'opAccion', index: 'opAccion', title: 'Notas', visible: true, width: "50px", align: 'left',
                    formatter: function (value, options, rData) { return GenerarBotonesInci(rData["IdTicket"], rData["vcUmbral"], rData["LeidoTecnico"]); },
                    "render": function (data, type, row, meta) {
                        if (type === 'display') {
                            data = GenerarBotonesInci(row[9], row[5], row[10], row[0]);
                        }
                        else {
                            data = "";
                        }
                        return data;
                    }
                    //formatter: function (value, options, rData) { return GenerarBotonesIncidencias(rData[1], rData[22], rData[23]); }
                },
                { name: 'CodigoTicket', index: 'CodigoTicket', title: 'Código', width: "90px" },
                {
                    name: 'FechaRegistro', index: 'FechaRegistro', title: 'Fecha', width: "105px",
                    formatter: function (value, options, rData) { return rData["FechaRegistro"]; }
                },
                { name: 'NombreTipificacion', index: 'NombreTipificacion', title: 'Tipificación', width: "225px" },
                { name: 'NombreEstado', index: 'NombreEstado', title: 'Estado', width: "90px", align: 'center' },
                {
                    name: 'opUmbral', index: 'opUmbral', title: 'Umbral', visible: true, width: 50, align: 'center', sortable: false, resizable: false,
                    //formatter: function (value, options, rData) { return CrearBotonesSemaforo(rData["IdTicket"], rData["vcUmbral"]); },
                    "render": function (data, type, row, meta) {

                        if (type === 'display') {
                            data = CrearBotonesSemaforo(row[9], row[5]);
                        }
                        return data;
                    }
                },
                { name: 'inDiaTra', index: 'inDiaTra', title: 'Tiempo', visible: true, align: 'center', width: 80, sortable: true },

                { name: 'Asunto', index: 'Asunto', title: 'Asunto', width: "224px" },
                { name: 'Descripcion', index: 'Descripcion', title: 'Descripción', width: 150, width: "250px", visible: true },
                { name: 'IdTicket', index: 'IdTicket', title: 'IdTicket', visible: false },
                { name: 'LeidoTecnico', index: 'LeidoTecnico', title: 'LeidoTecnico', visible: false },
                { name: 'Estado', index: 'Estado', title: 'Estado', visible: false },
    ];

    $.ajax({
        type: "POST",
        url: "../SolicitudesAtencion/SOA_Adm_Solicitudes.aspx/obtenerTicket_administracion",
        data: "{'inPagTam':'" + inPagTam + "'," + //Tamaño de pagina
               "'inPagAct':'" + inPagAct + "'," + //FiltroRegistro                
                "'prIdTicket': '" + '-1' + "'," +
                "'prCodTicket': '" + miCodigoTicket + "'," +
                "'prIdUsuario': '" + miIdUsuario + "'," +
                "'prIdUsuarioRegistro': '" + '-1' + "'," +
                "'prIdUsuarioTecnico': '" + miTec + "'," +
                "'prCodEstado': '" + miCodEstado + "'," +
                "'prIdMedioContacto': '-1'," +
                "'prIdTipificacion': '" + miIDTipificacion + "'," +
                "'prIdBolsa': '" + miIdBolsa + "'," +
                "'prFechaInicio': '" + miFechaInicio + "'," +
                "'prFechaFin': '" + miFechaFin + "', " +
                "'prNombreEmpleado': '" + miNombreEmpleado + "'," +
                "'prCodigoEmpleado': '" + miCodigoEmpledo + "', " +
                "'prEsSupervisor': '1'," +
                "'sortorder': 'DESC'," +
                "'sortname': 'IdTicket'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //$("#gridSolicitud")[0].addJSONData(result.d);


            var dataSet = [];
            var fila = [];
            for (var i = 0; i < result.d.Items.length; i++) {
                //result.d.Items[i].Row.splice(0, 1);
                var row = result.d.Items[i].Row;
                fila = [];
                fila.push(i); //Notas
                fila.push(row[2]); //Código
                fila.push(row[12]); //Fecha
                fila.push(row[16]); //NombreTipificacion
                fila.push(row[11]); //Estado
                fila.push(row[23]); //Umbral
                fila.push(row[14]); //Tiempo
                fila.push(row[17]); //Asunto
                fila.push(row[18]); //Descripcion
                fila.push(row[1]); //IdTicket
                fila.push(row[24]); //LeidoTecnico
                fila.push(row[10]); //Estado
                dataSet.push(fila);
            }

            //$("#gridSolicitud").jqGrid("clearGridData", true);

            ////var datarow;
            ////var i = 0;
            ////for (i = 0; i < result.d.Items.length; i++) {
            ////    var row = result.d.Items[i].Row;
            ////    datarow = {
            ////        opAccion: row[0], IdTicket: row[1], CodigoTicket: row[2], LeidoPorUsuario: row[3],
            ////        IdUsuario: row[4], NombreUsuario: row[5], vcUsu: row[6], IdUsuarioRegistro: row[7], NombreUsuarioRegistro: row[8],
            ////        vcUsuRegistro: row[9], CodEstado: row[10], NombreEstado: row[11], FechaRegistro: row[12], opUmbral: row[13],
            ////        inDiaTra: row[14], IdTipificacion: row[15], NombreTipificacion: row[16], Asunto: row[17], Descripcion: row[18],
            ////        EsChat: row[19], IdBolsa: row[20], CodEmp: row[21], vcUmbral: row[23], Leido_Usuario: row[23], LeidoTecnico: row[24]
            ////    };
            ////    //jQuery("#gridSolicitud").jqGrid('addRowData', i, datarow);
            ////}


            rowsGrillaIncidencias = $('#tableMisIncidencias').DataTable({
                data: dataSet,
                responsive: true,
                searching: false,
                paging: false,
                info: false,
                columns: Columnas,
                language: language_Datatable,
                fnCreatedRow: function (nRow, aData, iDataIndex) {
                    $(nRow).attr('id', 'fila_' + aData[9]); // IdIncidencia
                },
            });
            try {
                new $.fn.dataTable.FixedHeader(rowsGrillaIncidencias);
            } catch (e) {
            }
            

            ////if (result.d.Items == 0) {
            ////    $("#gridSolicitud").setGridHeight(5);
            ////}
            ////else {
            ////    $("#gridSolicitud").setGridHeight(180);
            ////}

            $(".ConImgInci").click(function () {
                //var indice = $(this).attr("indice");
                var id = $(this).attr("id").substr(6);
                IdNotaSeleccionada = id;
                //var datos = $("#grid").jqGrid('getRowData', id);
                mostrarDetalleTicket($(this).attr("id").substr(6), $(this).attr("id"));
            });


        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });














    ////$("#gridSolicitud").jqGrid({
    ////    datatype: function () {

    ////    },
    ////    jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
    ////    {
    ////        root: "Items",
    ////        page: "PaginaActual",
    ////        total: "TotalPaginas",
    ////        records: "TotalRegistros",
    ////        repeatitems: true,
    ////        cell: "Row",
    ////        id: "IdTicket"
    ////    },
    ////    colModel: [
    ////                {
    ////                    name: 'opAccion', index: 'opAccion', label: 'Notas', hidden: false, width: "50px", align: 'left',
    ////                    formatter: function (value, options, rData) { return GenerarBotonesInci(rData["IdTicket"], rData["vcUmbral"], rData["LeidoTecnico"]); }
    ////                    //formatter: function (value, options, rData) { return GenerarBotonesIncidencias(rData[1], rData[22], rData[23]); }
    ////                },
    ////                { name: 'IdTicket', index: 'IdTicket', label: 'IdTicket', hidden: true },
    ////                { name: 'CodigoTicket', index: 'CodigoTicket', label: 'Código', width: "90px" },
    ////                { name: 'LeidoPorUsuario', index: 'LeidoPorUsuario', label: 'LeidoPorUsuario', hidden: true },
    ////                { name: 'IdUsuario', index: 'IdUsuario', label: 'IdUsuario', hidden: true },
    ////                { name: 'NombreUsuario', index: 'NombreUsuario', label: 'Usuario', width: "220px", hidden: true },
    ////                { name: 'vcUsu', index: 'vcUsu', label: 'Codigo Usuario', hidden: true },
    ////                { name: 'IdUsuarioRegistro', index: 'IdUsuarioRegistro', label: 'IdUsuarioRegistro', hidden: true },
    ////                { name: 'NombreUsuarioRegistro', index: 'NombreUsuarioRegistro', label: 'Usuario Registro', width: "220px", hidden: true },
    ////                { name: 'vcUsuRegistro', index: 'vcUsuRegistro', label: 'Codigo Usuario Registro', hidden: true },
    ////                { name: 'CodEstado', index: 'CodEstado', label: 'CodEstado', hidden: true },

    ////                {
    ////                    name: 'FechaRegistro', index: 'FechaRegistro', label: 'Fecha', width: "105px",
    ////                    formatter: function (value, options, rData) { return rData["FechaRegistro"]; }
    ////                },

    ////                { name: 'IdTipificacion', index: 'IdTipificacion', label: 'IdTipificacion', hidden: true },
    ////                { name: 'NombreTipificacion', index: 'NombreTipificacion', label: 'Tipificación', width: "225px" },
    ////                { name: 'NombreEstado', index: 'NombreEstado', label: 'Estado', width: "90px", align: 'center' },
    ////                {
    ////                    name: 'opUmbral', index: 'opUmbral', label: 'Umbral', hidden: false, width: 50, align: 'center', sortable: false, resizable: false,
    ////                    formatter: function (value, options, rData) { return CrearBotonesSemaforo(rData["IdTicket"], rData["vcUmbral"]); }
    ////                },
    ////                { name: 'inDiaTra', index: 'inDiaTra', label: 'Tiempo', hidden: false, align: 'center', width: 80, sortable: true },

    ////                { name: 'Asunto', index: 'Asunto', label: 'Asunto', width: "224px" },
    ////                { name: 'Descripcion', index: 'Descripcion', label: 'Descripción', width: 150, width: "250px", hidden: true },
    ////    //{ name: 'FechaRegistro', index: 'FechaRegistro', label: 'Fecha Registro', width: "100px" },
    ////                { name: 'EsChat', index: 'EsChat', label: 'EsChat', hidden: true },
    ////                { name: 'IdBolsa', index: 'IdBolsa', label: 'IdBolsa', hidden: true }//,
    ////    //{ name: 'opUmbral', index: 'opUmbral', label: 'Umbral', hidden: false, width: 50, align: 'center', sortable: false, resizable: false,
    ////    //    formatter: function (value, options, rData) { return CrearBotonesSemaforoInci(rData[1], rData[21]); }
    ////    //},
    ////    //{ name: 'inDiaTra', index: 'inDiaTra', label: 'Días Transc.', hidden: false, align: 'center', width: 50, sortable: false }
    ////    ],
    ////    pager: "#pagerSolicitud",
    ////    loadtext: 'Cargando datos...',
    ////    //    recordtext: "{0} - {1} de {2} elementos",
    ////    recordtext: "{2} elementos",
    ////    pgtext: 'Pág: {0} de 1',
    ////    sortname: "FechaRegistro", //sortname: idTabla, //Default SortColumn
    ////    sortorder: "desc", //Default SortOrder.
    ////    //rownumbers: true,
    ////    shrinkToFit: true,
    ////    gridview: true,
    ////    // width: ($("#dvgridSolicitud").width()*0.5 - 23),
    ////    //width: '100%',
    ////    height: 180,
    ////    viewrecords: true,
    ////    emptyrecords: "No hay tickets que mostrar",
    ////    rowNum: 10,
    ////    gridComplete: function () {
    ////        var filas = $("#gridSolicitud tr");
    ////        var i = 1;
    ////        for (i = 1; i < filas.length; i++) {
    ////            if ($($(filas[i]).find("td")[9]).text() == "Resuelto" || $($(filas[i]).find("td")[9]).text() == "Anulado") {
    ////                $($(filas[i]).find("td")[9]).text("Cerrado");
    ////                $($(filas[i]).find("td")[9]).css("font-weight", "bold");
    ////            }
    ////        }
    ////        $("#pagerSolicitud_center").hide();
    ////    },
    ////    ondblClickRow: function (rowid, aData, rowelem) {
    ////        //        var vcTab = "tbPrincipal_TabJQ3_AccordionProd3_Item1_tab"
    ////        //        var vcTitulo = "Solicitudes"
    ////        //        var vcPagina = "P_Movil/Administrar/Solicitudes/Adm_ListadoSolicitudes.aspx?inCod=4&isAccessAdd=0&IdSol=" + rowid + "&amp;inTip=2&amp;inTipOri=1"
    ////        //        AbrirTab(vcTab, vcTitulo, vcPagina, true);
    ////        var datos = $("#gridSolicitud").jqGrid('getRowData', rowid);

    ////        //var vcTab = "tbPrincipal_TabJQ3_AccordionProd3_Item2_Item1_tab";
    ////        var vcTab = window.parent.DevolverTabMisIncidencias();
    ////        var vcTitulo = "Mis incidencias";
    ////        var vcPagina = "P_Movil/SolicitudesAtencion/SOA_Adm_Solicitudes.aspx?EsUsuario=1&?inCod=222&inTip=3&inTipOri=1&CodTicket=" + datos.CodigoTicket;
    ////        AbrirTab(vcTab, vcTitulo, vcPagina, false);

    ////    }

    ////}).navGrid("#pagerSolicitud", { edit: false, add: false, search: false, del: false });
}

function registrarNota_usuario() {

    if ($.trim($("#txtNotaEnviar").val()) != "") {
        var IdTicket;
        var idDominio = -1;
        //var id = $("#gridSolicitud").jqGrid('getGridParam', 'selrow');
        var id = IdNotaSeleccionada;
        if (id) {
            //var datos = $("#gridSolicitud").jqGrid('getRowData', id);
            var dataRow = rowsGrillaIncidencias.row("#fila_" + id).data();
            IdTicket = dataRow[9]; //idticked.....
            if (dataRow[11] == "EXT" && window.top.$("#hdfCodigoDominio").val() != "") {
                //if (datos.CodEstado == "EXT" ) {
                idDominio = window.top.$("#hdfCodigoDominio").val();
                //idDominio = 15;
            }
        }
        else {
            return;
        }

        $.ajax({
            type: "POST",
            url: "../SolicitudesAtencion/SOA_Adm_Solicitudes.aspx/registrarDetalleTicket_Usuario",
            data: "{'prIdTicket': '" + IdTicket + "'," +
                        "'prIdUsuario': '" + $("#hdfIdUsuarioLogeado").val() + "'," +
                        "'prNota': '" + $("#txtNotaEnviar").val().replace(/'/g, "&#39") + "'," +
                        "'pIdDominio': '" + idDominio + "'," +
                        "'vcFileName': '" + vcFileName + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                var resultado = result.d;
                //var id = $("#gridSolicitud").jqGrid('getGridParam', 'selrow');
                $("#txtNotaEnviar").val("");
                //var datos = $("#gridSolicitud").jqGrid('getRowData', id);
                var iid = IdTicket; //datos['IdTicket'];
                if (vcFileName != "") {
                    DeleteFile(vcFileName);
                }
                $.ajax({
                    type: "POST",
                    url: "../SolicitudesAtencion/SOA_Adm_Solicitudes.aspx/obtenerDetalleTicket_Usuario",
                    data: "{'prIdTicket': '" + iid + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        notas = result.d;
                        var mensaje;
                        $("#dvMensajes").html("");

                        $("#dvEnviar").css("display", "block");
                        var i = 0;
                        for (i = 0; i < notas.length; i++) {

                            if (notas[i].NombreArchivo == '') {
                                mensaje = '<div class="dvNotaContenedor"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                                    notas[i].FechaRegistro + ' a las ' + notas[i].HoraRegistro + ' por ' + notas[i].IdUsuario + '</div></div><div style="clear:both; height:5px;"></div><div class="mensajeNota"> ' +
                                    notas[i].Descripcion + '</div></div>';
                            }
                            else {
                                mensaje = '<div class="dvNotaContenedor bordeAdjunto"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                                    notas[i].FechaRegistro + ' a las ' + notas[i].HoraRegistro + ' por ' + notas[i].IdUsuario + '</div></div><div style="clear:both; height:5px;"></div><div class="mensajeNotaConAdjunto"> ' +
                                    notas[i].Descripcion + '</div><div class="mensajeAdjunto"><div class="imagenArchivoAdjunto"></div> <span class="linkDescarga" onclick="fnDescargarArchivo(\'' + notas[i].NombreArchivo + '\',2,' + notas[i].P_inCod + ')">' + notas[i].NombreArchivo + ' </span></div></div>';
                            }

                            $("#dvMensajes").append(mensaje);
                        }

                        $('#dvConversacion').dialog({
                            title: "Detalles de conversación",
                            height: 520,
                            width: 740,
                            modal: true,
                            close: function (event, ui) {
                                $("#dvEnvioSupervisor").css("display", "block");
                            }
                        });

                        $("#dvMensajes").animate({ scrollTop: document.getElementById("dvMensajes").scrollHeight }, 0);

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
}


function registrarNota() {
    if ($.trim($("#txtNotaEnviar").val()) != "") {
        var origen = $("#ddlOrigen").val();
        var IdTicket;
        var IdTicketEscalamiento;
        var EsAyuda;
        var esSupervisor = 0;
        var codEstado;
        var idDominio = -1;
        var id = $("#gridSolicitud").jqGrid('getGridParam', 'selrow');
        if (id) {
            var datos = $("#gridSolicitud").jqGrid('getRowData', id);
            IdTicket = datos['IdTicket'];
            codEstado = datos['CodEstado'];
        }
        else {
            return;
        }

        if (origen == "0") {
            IdTicketEscalamiento = notas.EscalamientoInicial;
        }
        else {
            IdTicketEscalamiento = notas.EscalamientoFinal;
            if (codEstado == "EXT" && window.top.$("#hdfCodigoDominio").val() != "") {
                //if (codEstado == "EXT" ) {
                idDominio = window.top.$("#hdfCodigoDominio").val();
                //idDominio = 15;
            }
        }

        if ($("#ddlTecnicos option").length > 1) {

        }
        else {
            IngresadoPor = '2';
        }

        if ($("#dvEnvioSupervisor").css("display") != "none") {
            if ($("#chkEnvioSupervisor").attr("checked") == "checked") {
                EsAyuda = 1;
            }
            else {
                EsAyuda = 0;
            }
        }
        else {
            EsAyuda = 0;
        }

        if ($("#ddlTecnicos option:selected").text().indexOf("(Supervisor)") < 0) {
            esSupervisor = 1;
        }

        $.ajax({
            type: "POST",
            url: "../SolicitudesAtencion/SOA_Adm_Solicitudes.aspx/registrarDetalleTicket_Tecnico",
            data: "{'prIdTicket': '" + IdTicket + "'," +
            "'prIdTicketEscalamiento': '" + IdTicketEscalamiento + "'," +
            "'prIdUsuario': '" + $("#hdfIdUsuarioLogeado").val() + "'," +
            "'prNota': '" + $("#txtNotaEnviar").val().replace(/'/g, "&#39") + "'," +
            "'vcFileName': '" + vcFileName + "'," +
            "'prEsParaSupervisor': '" + EsAyuda + "', " +
            "'psEsSupervisor': '" + esSupervisor + "'," +
            "'pIdDominio': '" + idDominio + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                var resultado = result.d;
                var mensaje;


                //                    var mensaje = '<div class="dvNotaContenedor bordeAdjunto"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                //                    resultado.FechaRegistro + ' a las ' + resultado.HoraRegistro + ' por ' + resultado.IdUsuario + '</div></div><div style="clear:both; height:5px;"></div><div class="mensajeNotaConAdjunto"> ' +
                //                    resultado.Descripcion + '</div><div class="mensajeAdjunto"><div class="imagenArchivoAdjunto"></div> <span class="linkDescarga" onclick="fnDescargarArchivo(\'' + vcFileName + '\',2,' + resultado.P_inCod + ')">' + vcFileName + ' </span></div></div>';


                if (vcFileName != "") {
                    if (resultado.EsAyuda) {
                        mensaje = '<div class="dvNotaContenedor bordeAdjunto ui-state-highlight"><div class="tituloNota"><div class="imagenEsAyuda"></div><div class="subTituloNota">Nota creada el ' +
                            resultado.FechaRegistro + ' a las ' + resultado.HoraRegistro + ' por ' + resultado.IdUsuario + '</div></div><div style="clear:both; height:5px;"></div><div class="mensajeNotaConAdjunto"> ' +
                            resultado.Descripcion + '</div><div class="mensajeAdjunto"><div class="imagenArchivoAdjunto"></div> <span class="linkDescarga" onclick="fnDescargarArchivo(\'' + vcFileName + '\',2,' + resultado.P_inCod + ')">' + vcFileName + ' </span></div></div>';
                    }
                    else {
                        mensaje = '<div class="dvNotaContenedor bordeAdjunto"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                            resultado.FechaRegistro + ' a las ' + resultado.HoraRegistro + ' por ' + resultado.IdUsuario + '</div></div><div style="clear:both; height:5px;"></div><div class="mensajeNotaConAdjunto"> ' +
                            resultado.Descripcion + '</div><div class="mensajeAdjunto"><div class="imagenArchivoAdjunto"></div> <span class="linkDescarga" onclick="fnDescargarArchivo(\'' + vcFileName + '\',2,' + resultado.P_inCod + ')">' + vcFileName + ' </span></div></div>';
                    }
                    DeleteFile(vcFileName);
                }
                else {
                    if (resultado.EsAyuda) {
                        mensaje = '<div class="dvNotaContenedor ui-state-highlight"><div class="tituloNota"><div class="imagenEsAyuda"></div><div class="subTituloNota">Nota creada el ' +
                            resultado.FechaRegistro + ' a las ' + resultado.HoraRegistro + ' por ' + resultado.IdUsuario + '</div></div><div style="clear:both; height:5px;"></div><div class="mensajeNota"> ' +
                            resultado.Descripcion + '</div></div>';
                    }
                    else {
                        mensaje = '<div class="dvNotaContenedor"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                            resultado.FechaRegistro + ' a las ' + resultado.HoraRegistro + ' por ' + resultado.IdUsuario + '</div></div><div style="clear:both; height:5px;"></div><div class="mensajeNota"> ' +
                            resultado.Descripcion + '</div></div>';
                    }


                }


                $("#txtNotaEnviar").val("");
                $("#txtNotaEnviar").focus();

                $("#dvMensajes").append(mensaje);

                $("#dvMensajes").animate({ scrollTop: document.getElementById("dvMensajes").scrollHeight }, 2000);

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
}

function mostrarDetalleTicket(id, letter) {
    $("#" + letter + "Let").css("display", "none");
    $("#imgNueNot_" + id).hide();
    $("#chkMostrarOnlyMsjSupervi").removeAttr("checked");
    $("#chkEnvioSupervisor").removeAttr("disabled");

    if ($("#hdfIdTecnico").val().toString() == "-1") {

        $.ajax({
            type: "POST",
            url: "../SolicitudesAtencion/SOA_Adm_Solicitudes.aspx/obtenerDetalleTicket_Usuario",
            data: "{'prIdTicket': '" + id + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#dvEnvioSupervisor").css("display", "none");
                notas = result.d;
                var mensaje;
                $("#dvMensajes").html("");

                $("#dvEnviar").css("display", "block");

                var i = 0;
                for (i = 0; i < notas.length; i++) {
                    if (notas[i].NombreArchivo == '') {
                        mensaje = '<div class="dvNotaContenedor"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                                    notas[i].FechaRegistro + ' a las ' + notas[i].HoraRegistro + ' por ' + notas[i].IdUsuario + '</div></div><div style="clear:both; height:5px;"></div><div class="mensajeNota"> ' +
                                    notas[i].Descripcion + '</div></div>';
                    }
                    else {
                        mensaje = '<div class="dvNotaContenedor bordeAdjunto"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                                    notas[i].FechaRegistro + ' a las ' + notas[i].HoraRegistro + ' por ' + notas[i].IdUsuario + '</div></div><div style="clear:both; height:5px;"></div><div class="mensajeNotaConAdjunto"> ' +
                                    notas[i].Descripcion + '</div><div class="mensajeAdjunto"><div class="imagenArchivoAdjunto"></div> <span class="linkDescarga" onclick="fnDescargarArchivo(\'' + notas[i].NombreArchivo + '\',2,' + notas[i].P_inCod + ')">' + notas[i].NombreArchivo + ' </span></div></div>';
                    }

                    $("#dvMensajes").append(mensaje);
                }

                $('#dvConversacion').dialog({
                    title: "Notas de Ticket",
                    height: 460,
                    width: 740,
                    modal: true,
                    resizable: false,
                    close: function (event, ui) {
                        $("#dvEnvioSupervisor").css("display", "block");
                    }
                });

                //var iid = $("#gridSolicitud").jqGrid('getGridParam', 'selrow');
                var dataRow = rowsGrillaIncidencias.row("#fila_" + id).data();
                try {
                    if (dataRow[11] == "RES" || dataRow[11] == "ANU" || dataRow[11] == "DEV") {
                        $("#dvEscribir").hide();
                    }
                    else {
                        $("#dvEscribir").show();
                    }
                } catch (e) {
                    $("#dvEscribir").hide();
                }


                //if (iid) {
                //    var datos = $("#gridSolicitud").jqGrid('getRowData', iid);

                //    if (datos['CodEstado'] == "RES" || datos['CodEstado'] == "ANU" || datos['CodEstado'] == "DEV") {
                //        $("#dvEscribir").hide();
                //    }
                //    else {
                //        $("#dvEscribir").show();
                //    }
                //}
                //else {
                //    //alerta("Seleccione un registro");
                //}

                $("#dvMensajes").animate({ scrollTop: document.getElementById("dvMensajes").scrollHeight }, 1500);

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
    else {
        var SSUpervisor = 0;

        if ($("#ddlTecnicos option:selected").text().indexOf("(Supervisor)") < 0) {
            SSUpervisor = 1;
        }

        $.ajax({
            type: "POST",
            url: "../SolicitudesAtencion/SOA_Adm_Solicitudes.aspx/obtenerDetalleTicket_Tecnico",
            data: "{'prIdTicket': '" + id + "'," +
                    "'prEsSupervisor': '" + SSUpervisor + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                notas = result.d;
                $("#dvMensajes").html("");

                $($('#ddlOrigen option')[0]).attr('selected', 'selected');
                $("#dvEnviar").css("display", "block");

                if ($("#hdfMostrarMsjPrivado").val() == "1") {
                    $("#chkMostrarOnlyMsjSupervi").removeAttr("disabled");
                    $("#chkEnvioSupervisor").removeAttr("disabled");
                }
                else {
                    $("#chkMostrarOnlyMsjSupervi").attr("disabled", "disabled");
                    $("#chkEnvioSupervisor").attr("disabled", "disabled");
                }
                var i = 0;
                for (i = 0; i < notas.NotasInicial.length; i++) {
                    var mensaje;
                    if (notas.NotasInicial[i].NombreArchivo == '') {
                        if (notas.NotasInicial[i].EsAyuda) {
                            mensaje = '<div class="dvNotaContenedor ui-state-highlight"><div class="tituloNota"><div class="imagenEsAyuda"></div><div class="subTituloNota">Nota creada el ' +
                            notas.NotasInicial[i].FechaRegistro + ' a las ' + notas.NotasInicial[i].HoraRegistro + ' por ' + notas.NotasInicial[i].IdUsuario + '</div></div><div style="clear:both; height:5px;"></div><div class="mensajeNota"> ' +
                            notas.NotasInicial[i].Descripcion + '</div></div>';
                        }
                        else {
                            mensaje = '<div class="dvNotaContenedor"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                            notas.NotasInicial[i].FechaRegistro + ' a las ' + notas.NotasInicial[i].HoraRegistro + ' por ' + notas.NotasInicial[i].IdUsuario + '</div></div><div style="clear:both; height:5px;"></div><div class="mensajeNota"> ' +
                            notas.NotasInicial[i].Descripcion + '</div></div>';
                        }

                    }
                    else {
                        if (notas.NotasInicial[i].EsAyuda) {
                            mensaje = '<div class="dvNotaContenedor bordeAdjunto ui-state-highlight"><div class="tituloNota"><div class="imagenEsAyuda"></div><div class="subTituloNota">Nota creada el ' +
                            notas.NotasInicial[i].FechaRegistro + ' a las ' + notas.NotasInicial[i].HoraRegistro + ' por ' + notas.NotasInicial[i].IdUsuario + '</div></div><div style="clear:both; height:5px;"></div><div class="mensajeNotaConAdjunto"> ' +
                            notas.NotasInicial[i].Descripcion + '</div><div class="mensajeAdjunto"><div class="imagenArchivoAdjunto"></div> <span class="linkDescarga" onclick="fnDescargarArchivo(\'' + notas.NotasInicial[i].NombreArchivo + '\',2,' + notas.NotasInicial[i].P_inCod + ')">' + notas.NotasInicial[i].NombreArchivo + ' </span></div></div>';
                        }
                        else {
                            mensaje = '<div class="dvNotaContenedor bordeAdjunto"><div class="tituloNota"><div class="imagenNota"></div><div class="subTituloNota">Nota creada el ' +
                            notas.NotasInicial[i].FechaRegistro + ' a las ' + notas.NotasInicial[i].HoraRegistro + ' por ' + notas.NotasInicial[i].IdUsuario + '</div></div><div style="clear:both; height:5px;"></div><div class="mensajeNotaConAdjunto"> ' +
                            notas.NotasInicial[i].Descripcion + '</div><div class="mensajeAdjunto"><div class="imagenArchivoAdjunto"></div> <span class="linkDescarga" onclick="fnDescargarArchivo(\'' + notas.NotasInicial[i].NombreArchivo + '\',2,' + notas.NotasInicial[i].P_inCod + ')">' + notas.NotasInicial[i].NombreArchivo + ' </span></div></div>';
                        }

                    }


                    $("#dvMensajes").append(mensaje);
                }

                $('#dvConversacion').dialog({
                    title: "Detalles de conversación",
                    height: 540,
                    width: 740,
                    modal: true,
                    resizable: false,
                    close: function (event, ui) {
                        $("#dvEnvioSupervisor").css("display", "block");
                    }
                });

                var iid = $("#gridSolicitud").jqGrid('getGridParam', 'selrow');
                if (iid) {
                    var datos = $("#gridSolicitud").jqGrid('getRowData', iid);

                    if (datos['CodEstado'] == "AYU") {
                        esMensajeAyuda = 1;
                        //$("#dvEnvioSupervisor").css("display", "block");
                    }
                    else {
                        esMensajeAyuda = 0;
                        //$("#dvEnvioSupervisor").css("display", "none");
                        if (datos['CodEstado'] == "RES" || datos['CodEstado'] == "ANU" || datos['CodEstado'] == "DEV") {
                            $("#dvEscribir").hide();
                        }
                        else {
                            $("#dvEscribir").show();
                        }
                    }
                }
                else {
                    //alerta("Seleccione un registro");
                }

                $("#dvMensajes").animate({ scrollTop: document.getElementById("dvMensajes").scrollHeight }, 1500);

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

}
//    var vcBotones = '      <img id="btnNota_' + id + '" src="../../Common/Images/Chat/write.png" alt="Ver Notas" class="imgBtn ConImgSol" title="Ver Notas"/>';
//    if (biNueNot == "0")
//        vcBotones += '   <img id="imgNueNot_' + id + '" src="../../Common/Images/Chat/Mail.png" alt="Nueva Nota" title="Nueva Nota"/>';
//    else
//        vcBotones += '';

//    return vcBotones;

function GenerarBotonesInci(id, int_usu, LeidoTecnico, indice) {
    //if ($("#hdfIdTecnico").val().toString() == "-1") {
    var Botones = '';


    if (int_usu > 0) {
        Botones = ' <img id="btnCon' + id + '" src="../../Common/Images/Chat/write.png" alt="Ver Conversación" style="margin-left:15px !important;" class="imgBtn ConImgInci" indice=' + indice + ' title="Ver Conversación"/>'; //<img id="btnCon' + id + 'Let" src="../../Common/Images/Chat/mail.png" alt="Ver Conversación" class="imgBtn m_left letter" title="Ver Conversación"/>';
    }
    else {
        Botones = ' <img id="btnCon' + id + '" src="../../Common/Images/Chat/write.png" alt="Ver Conversación" style="margin-left:15px !important;" class="imgBtn ConImgInci" indice=' + indice + ' title="Ver Conversación"/>';
    }

    if (LeidoTecnico != "0") {
        Botones += ' <img id="imgNueNot_' + id + '" src="../../Common/Images/Chat/Mail.png" alt="Nueva Nota" style="margin-left:5px !important;" title="Nueva Nota"/>';
    } else {
        Botones += '';
    }


    return Botones;
    //    }
    //    else {
    //        if (int_tec > 0) {
    //            return '<img id="btnCon' + id + '" src="../../Common/Images/Chat/write.png" alt="Ver Conversación" class="imgBtn ConImg imgBtnn" title="Ver Conversación"/><img id="btnCon' + id + 'Let" src="../../Common/Images/Chat/mail.png" alt="Ver Conversación" class="imgBtn m_left imgBtnn letter" title="Ver Conversación"/>';
    //        }
    //        else {
    //            return '<img id="btnCon' + id + '" src="../../Common/Images/Chat/write.png" alt="Ver Conversación" class="imgBtn ConImg imgBtnn" title="Ver Conversación"/>';
    //        }
    //    }

}

function CrearBotonesSemaforoInci(id, vcUmbral) {
    if (vcUmbral != "") {
        return '<img src="../../Common/Images/Semaforos/' + vcUmbral + '_16x16.png" />';
    }
    else {
        return '';
    }
}

function CrearLinkIMEI(vcIMEI) {
    if (vcIMEI != "SIN EQUIPO") {
        return '<span class="imgBtn ConLink" style="color:Blue; text-decoration: underline; cursor: pointer;" codIMEI = "' + vcIMEI + '" >' + vcIMEI + "</span>";
    }
    else {
        return vcIMEI;
    }
}

function fnObtenerLineas() {

    var inPagTam = 1000;
    var inPagAct = 1;

    $.ajax({
        type: "POST",
        url: "DashBoard_Resumen.aspx/ListarByEmpleado_Dash",
        data: "{'inPagTam':'" + inPagTam + "'," + //Tamaño de pagina
              "'inCodTip':'" + $("#ddlTipoLinea").val() + "'," +
              "'vcIsAdmin':'" + $("#hdfAdmin").val() + "'," +
               "'inPagAct':'" + inPagAct + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            var dataSet = [];
            for (var i = 0; i < result.d.Items.length; i++) {
                dataSet.push(result.d.Items[i].Row);
            }
            var rowsGrilla = $('#tableMisEquipos').DataTable({
                data: dataSet,
                responsive: true,
                searching: false,
                paging: false,
                info: false,
                columns: [
                    { title: "Dispositivo" },
                    { title: "Línea" },
                    {
                        title: "IMEI", "render": function (data, type, row, meta) {
                            if (type === 'display') {
                                data = CrearLinkIMEI(data);
                            }
                            return data;
                        }
                    },
                    { title: "Fecha Alta" },
                    { title: "Tipo Servicio" },
                    { title: "Soporta Línea" }
                ],
                "language": language_Datatable,
            });

            try {
                new $.fn.dataTable.FixedHeader(rowsGrilla);
            } catch (e) {
            }           


        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });













    ////$("#gridLineas").jqGrid({
    ////    datatype: function () {
    ////    },
    ////    jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
    ////    {
    ////        root: "Items",
    ////        page: "PaginaActual",
    ////        total: "TotalPaginas",
    ////        records: "TotalRegistros",
    ////        repeatitems: true,
    ////        cell: "Row",
    ////        id: "Linea"
    ////    },
    ////    colModel: [
    ////                { name: 'Dispositivo', index: 'IdTiDispositivocket', label: 'Dispositivo', hidden: false, width: "280px", sortable: false },
    ////                { name: 'Linea', index: 'Linea', label: 'Línea', hidden: false, width: "100px", sortable: false },
    ////                //{ name: 'IMEI', index: 'IMEI', label: 'IMEI', hidden: false, width: "100px" },
    ////                {
    ////                    name: 'IMEI', index: 'IMEI', label: 'IMEI', hidden: false, sortable: false, width: "184px",
    ////                    formatter: function (value, options, rData) {
    ////                        return CrearLinkIMEI(rData[2]);
    ////                    }
    ////                },
    ////                { name: 'FechaRegistro', index: 'FechaRegistro', label: 'Fecha Alta', hidden: false, width: "134px", align: "center", sortable: false },
    ////                { name: 'TipoServicio', index: 'TipoServicio', label: 'Tipo Servicio', hidden: false, width: "120px", align: "center", sortable: false },
    ////                { name: 'SoportaLinea', index: 'SoportaLinea', label: 'Soporta Línea', hidden: true, width: "100px", align: "center", sortable: false }
    ////    ],
    ////    pager: "#gridLineaspager",
    ////    loadtext: 'Cargando datos...',
    ////    recordtext: "{0} - {1} de {2} elementos",
    ////    pgtext: 'Pág: {0} de {1}',
    ////    rownumbers: true,
    ////    sortname: "Linea",
    ////    sortorder: "desc",
    ////    gridview: true,
    ////    //width: ($("#dvGridLineas").width()*0.5 - 23),
    ////    //width: '100%',
    ////    height: 160,
    ////    viewrecords: true,
    ////    emptyrecords: "No hay Equipos que mostrar",
    ////    rowNum: 5,
    ////    shrinkToFit: true,
    ////    beforeRequest: function () {
    ////        responsive_jqgrid($(".jqGrid"));
    ////    }
    ////}).navGrid("#gridLineaspager", { edit: false, add: false, search: false, del: false });
}

function responsive_jqgrid(jqgrid) {
    jqgrid.find('.ui-jqgrid').addClass('clear-margin span12').css('width', '');
    jqgrid.find('.ui-jqgrid-view').addClass('clear-margin span12').css('width', '');
    jqgrid.find('.ui-jqgrid-view > div').eq(1).addClass('clear-margin span12').css('width', '').css('min-height', '0');
    jqgrid.find('.ui-jqgrid-view > div').eq(2).addClass('clear-margin span12').css('width', '').css('min-height', '0');
    jqgrid.find('.ui-jqgrid-sdiv').addClass('clear-margin span12').css('width', '');
    jqgrid.find('.ui-jqgrid-pager').addClass('clear-margin span12').css('width', '');
}


function MostrarPie(resul) {
    var myChart4;
    if (resul[0] == "1") {
        $("#ctndCharPie").append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
        $("#Div2").css("height", "225px");
    }
    else {
        var columnas = JSON.parse(resul[0]);
        var datos = JSON.parse(resul[1]);
        var datosChart = resul[2];


        if (!(FusionCharts("myChartIdPie"))) {
            myChart4 = new FusionCharts("../../Common/Scripts/FusionCharts/Pie3D.swf", "myChartIdPie", "345", "200", "0");
        }

        myChart4.setJSONData(datosChart);
        myChart4.setTransparent(true);
        myChart4.render("ctndCharPie");
    }

    //$("#General").css("height", $("#pnlCuerpo").height())

}

function MostrarHistorico(result) {
    var myChart1;
    var re = JSON.parse(result);
    if (re.dataset.length > 0) {

        if (!(FusionCharts("chartHistorico"))) {

            myChart1 = new FusionCharts("MSCombi2D", "chartHistorico", "345", "200", "0");
            myChart1.setJSONData(result[0]);
            myChart1.setTransparent(true);
            myChart1.render("ctndCharHis");
            //$("#chartHistorico").css('left', '15px');
        }
        else {
            $("#ctndCharHis").updateFusionCharts({ dataSource: result[0], dataFormat: "json" });
            //$("#chartHistorico").css('left', '15px');
        }

    }
    else {
        $("#ctndCharHis").append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
    }

}

function fnMostrarDatos(valor) {
    if (valor != "") {
        cargar_DatosEmpleado(valor);
    } else {
        cargarDatosDesconocido();
    }
}

function cargarDatosDesconocido() {
    //    $("#lblCodigoEmpleado").text("(Desconocido)");
    //    $("#lblNombreEmpleado").text("(Desconocido)");
    //    $("#lblArea").text("(Desconocido)");
    //    $("#lblCCosto").text("(Desconocido)");
    //    $("#spMensaje").text("Los filtros no coinciden");
    //    $("#spMensaje").css({ color: '#CC0000' });

    var admin = $("#hdfAdmin").val();
}

function cargar_DatosEmpleado(_valor) {
    $.ajax({
        type: "POST",
        url: "DashBoard_Resumen.aspx/ObtenerEmpleadoAsignado",
        data: JSON.stringify({
            'IdEmpleado': _valor,
            "inTipOri": 1
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d.P_vcCod != null) {
                alert(1);
                //                $("#spMensaje").text("");
                //                $("#lblCodigoEmpleado").text(data.d.P_vcCod);
                //                $("#lblNombreEmpleado").text(data.d.vcNom);
                //                $("#lblArea").text(data.d.Area.vcNomOrg);
                //                $("#lblCCosto").text(data.d.CentroCosto.vcNomCenCos);
                //                CargarInfoSaldo();
                //                CargarGrilla();

                //                if (data.d.btVig == true){
                //                    $("#spMensaje").text("Empleado activo");
                //                    $("#spMensaje").css({ color: '#003F59' }); //#4297d7
                //                } else{
                //                    $("#spMensaje").text("Empleado cesado");
                //                    $("#spMensaje").css({ color: '#CC0000' });
                //                }
            }
            else {
                cargarDatosDesconocido();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function MostrarPieResumen(resul) {
    var myChart8;
    if (resul[0] == "1") {
        $("#ctndCharPieFact").append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
        $("#Div4").css("height", 180);
    }
    else {
        var columnas = JSON.parse(resul[0]);
        var datos = JSON.parse(resul[1]);
        var datosChart = resul[2];

        var JSON_chart = JSON.parse(datosChart);

        JSON_chart.chart.caption = "DISTRIBUCIÓN DE COSTO";
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

        //

        var Alto = $("#dvFilaInicial").height() - 60;
        Alto = 265;

        if (!(FusionCharts("myChartIdPieResumen"))) {
            //myChart8 = new FusionCharts("../../Common/Scripts/FusionCharts/doughnut2d.swf", "myChartIdPieResumen", "390", "200", "0");
            //var repositorioChartDur = new FusionCharts("doughnut2d", "chartContainer2_render" + Math.random(), "100%", "295", "0");
            myChart8 = new FusionCharts("doughnut2d", "chartContainer2_render", "100%", Alto, "0");
        }

        myChart8.setJSONData(JSON_chart);
        myChart8.setTransparent(true);
        myChart8.render("ctndCharPieFact");
    }
}

//function MostrarHistoricoResumen(result) {
//    var myChart9;
//    var re = JSON.parse(result);
//    if (re.dataset.length > 0) {

//        var JSON_chart = JSON.parse(result[0]);
//        //JSON_chart.legendBorderThickness = "0";
//        //JSON_chart.legendShadow = "0";

//        JSON_chart.chart.caption = "HISTÓRICO DE FACTURACIÓN";
//        JSON_chart.chart.subcaption = "(Últimos 12 meses)";
//        JSON_chart.chart.baseFont = "Open Sans";
//        JSON_chart.chart.baseFontColor = "#6b737c";
//        JSON_chart.chart.subCaptionFontColor = "#9E9C9C";
//        JSON_chart.chart.captionFontSize = "16";
//        JSON_chart.chart.subcaptionFontSize = "12";
//        JSON_chart.chart.subcaptionFontBold = "0";
//        JSON_chart.chart.captionAlignment = "left";


//        JSON_chart.chart.paletteColors = "#01B8AA";
//        JSON_chart.chart.sdecimals = "0";
//        JSON_chart.chart.decimals = "0";

//        JSON_chart.chart.slantlabels = "0";
//        JSON_chart.chart.showlegend = "0";
//        JSON_chart.chart.exportenabled = "1";
//        JSON_chart.chart.exportShowMenuItem = "1";
//        JSON_chart.chart.subCaptionFontColor = "#9E9C9C";
//        JSON_chart.chart.captionFontSize = "16";
//        JSON_chart.chart.subcaptionFontSize = "12";
//        JSON_chart.chart.divlineThickness = "0";
//        JSON_chart.chart.legendItemFontColor = "#666666";
//        JSON_chart.chart.legendItemFontSize = "10";
//        JSON_chart.chart.legendShadow = "0";
//        JSON_chart.chart.placeValuesInside = "1";
//        JSON_chart.chart.rotateValues = "1";
//        JSON_chart.chart.sformatnumber = "0";
//        JSON_chart.chart.showHoverEffect = "1";
//        JSON_chart.chart.showShadow = "0";
//        JSON_chart.chart.showXAxisLine = "1";
//        JSON_chart.chart.showYAxisValues = "1";
//        JSON_chart.chart.showPercentValues = "0";
//        JSON_chart.chart.showplotborder = "0";
//        JSON_chart.chart.subcaptionFontBold = "0";
//        JSON_chart.chart.showAlternateVGridColor = "0";
//        JSON_chart.chart.valueFontColor = "#FFFFFF";
//        JSON_chart.chart.xAxisLineThickness = "1";
//        JSON_chart.chart.maxLabelWidthPercent = "30";



//        //cadena3 = cadena3 + '"bgColor": "#ffffff", "bgAlpha":"100", "showCanvasBorder":"0","canvasBgColor": "#ffffff", "canvasbgAlpha":"0", "canvasBorderAlpha":"0", "plotBorderAlpha": "25","showAlternateHGridColor": "0","usePlotGradientColor": "0",';
//        //cadena3 = cadena3 + '"captionAlignment":"left","showAxisLines": "1", "showYAxisLine": "0", "showsyAxisLine": "0","xAxisLineColor": "#999999","axisLineAlpha": "10","divlineColor": "#999999","divLineIsDashed": "1",';
//        //cadena3 = cadena3 + '"divLineDashLen": "0","divLineDashed": "0","divLineGapLen": "0",';
//        //cadena3 = cadena3 + '"labeldisplay": "0","slantlabels": "1", "maxColWidth": "35", ' +

//        JSON_chart.dataset.splice(1, 1);

//        var elemento;
//        for (var i = 0; i < JSON_chart.dataset[0].data.length; i++) {
//            elemento = JSON_chart.dataset[0].data[i];
//            elemento.color = '#01B8AA';
//            elemento.alpha = '100';
//        }

//        for (var i = 0; i < JSON_chart.dataset[0].data.length; i++) {
//            elemento = JSON_chart.dataset[0].data[i];
//            elemento.alpha = '0';

//            if (parseFloat(elemento.value) == 0) {
//                elemento.drawAnchors = '0';
//                continue;
//            }

//            if (i > 0 && parseFloat(JSON_chart.dataset[0].data[i - 1].value) > 0) {
//                if (parseFloat(elemento.value) > parseFloat(JSON_chart.dataset[0].data[i - 1].value)) {
//                    elemento.anchorImageUrl = 'images/sube.png';
//                }
//                else if (parseFloat(elemento.value) < parseFloat(JSON_chart.dataset[0].data[i - 1].value)) {
//                    elemento.anchorImageUrl = 'images/baja.png';
//                }
//                else {
//                    elemento.anchorImageUrl = 'images/igual.png';
//                }
//            }
//            else {
//                elemento.drawAnchors = '0';
//            }
//        }



//        if (!(FusionCharts("chartHistoricoResumen"))) {

//            var Alto = $("#dvFilaInicial").height() - 60;
//            Alto = 265;
//            //myChart9 = new FusionCharts("../../Common/Scripts/FusionCharts/MSCombi2D.swf", "chartHistoricoResumen", "445", "200", "0");
//            myChart9 = new FusionCharts("MSCombi2D", "chartHistoricoResumen", "100%", Alto, "0");
//            //var repositorioChartDur = new FusionCharts();
//            myChart9.setJSONData(JSON_chart);
//            myChart9.setTransparent(true);
//            myChart9.render("ctndCharHisFact");
//        }
//        else {
//            $("#ctndCharHisFact").updateFusionCharts({ dataSource: JSON_chart, dataFormat: "json" });
//            //$("#chartHistorico").css('left', '15px');
//        }

//    }
//    else {
//        $("#ctndCharHisFact").append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
//    }

//}

function MostrarHistoricoResumen(result) {
    var myChart9;

    var re = JSON.parse(result);
    if (re.dataset.length > 0) {

        var JSON_chart = JSON.parse(result);
        //JSON_chart.legendBorderThickness = "0";
        //JSON_chart.legendShadow = "0";

        JSON_chart.chart.caption = "HISTÓRICO DE FACTURACIÓN";
        JSON_chart.chart.subcaption = "(Últimos 12 meses)";
        JSON_chart.chart.baseFont = "Open Sans";
        JSON_chart.chart.baseFontColor = "#6b737c";
        JSON_chart.chart.subCaptionFontColor = "#9E9C9C";
        JSON_chart.chart.captionFontSize = "16";
        JSON_chart.chart.subcaptionFontSize = "12";
        JSON_chart.chart.subcaptionFontBold = "0";
        JSON_chart.chart.captionAlignment = "left";
        JSON_chart.chart.exportFileName = "HistoricoFacturacion";


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

        var elemento;

        JSON_chart.chart.drawAnchors = "1";
        JSON_chart.chart.anchorRadius = "12";
        JSON_chart.chart.anchorBorderThickness = "1";

        var serieLinea = JSON.parse(JSON.stringify(JSON_chart.dataset[0]));
        JSON_chart.dataset.push(serieLinea);
        //  [0].renderas = "column";
        JSON_chart.dataset[1].renderas = "line";
        JSON_chart.dataset[1].alpha = "0";
        JSON_chart.dataset[1].color = "#B2B6B9";


        for (var i = 0; i < JSON_chart.dataset[0].data.length; i++) {
            elemento = JSON_chart.dataset[0].data[i];
            elemento.color = '#01B8AA';
            elemento.alpha = '100';
        }

        for (var i = 0; i < JSON_chart.dataset[1].data.length; i++) {
            elemento = JSON_chart.dataset[1].data[i];
            elemento.alpha = '0';

            if (parseFloat(elemento.value) == 0) {
                elemento.drawAnchors = '0';
                continue;
            }

            if (i > 0 && parseFloat(JSON_chart.dataset[1].data[i - 1].value) > 0) {
                if (parseFloat(elemento.value) > parseFloat(JSON_chart.dataset[1].data[i - 1].value)) {
                    elemento.anchorImageUrl = 'images/sube.png';
                }
                else if (parseFloat(elemento.value) < parseFloat(JSON_chart.dataset[1].data[i - 1].value)) {
                    elemento.anchorImageUrl = 'images/baja.png';
                }
                else {
                    elemento.anchorImageUrl = 'images/igual.png';
                }
            }
            else {
                elemento.drawAnchors = '0';
            }
        }

        var chartHistoricoResumen = 'chartHistoricoResumen_' + ((Math.random() * 100000) + 1).toString();
        //if (!(FusionCharts("chartHistoricoResumen"))) {

        var Alto = $("#dvFilaInicial").height() - 60;
        Alto = 265;
        myChart9 = new FusionCharts("MSCombi2D", chartHistoricoResumen, "100%", Alto, "0");
        //var repositorioChartDur = new FusionCharts();
        myChart9.setJSONData(JSON_chart);
        myChart9.setTransparent(true);
        myChart9.render("ctndCharHisFact");
        //}
        //else {
        //    $("#chartHistoricoResumen").updateFusionCharts({ dataSource: JSON_chart, dataFormat: "json" });
        //    //$("#chartHistorico").css('left', '15px');
        //}

    }
    else {
        $("#ctndCharHisFact").append('<div style="font-size:medium; color:Gray;">No hay datos para mostrar.</div> ');
    }

}



function fnDescargarArchivo(NomArc, tipo, inIdDet) {
    //Descargar adjunto antes de grabar nota
    if (tipo == 1) {
        var filePath = "P_Movil/Administrar/Temporal/Incidencias" + CarpetaDominio + "/" + NomArc;
        $.ajax({
            url: raiz(filePath),
            success: function (data) {
                window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + filePath);
            },
            error: function (data) {
                alerta('No se encontró el archivo a descargar.');
                $('#UploadedFile').html("");
                $("#UploadButton").show();
                vcFileName = "";
            }
        });
    }
        //Descargar adjunto de nota grabada
    else if (tipo == 2) {
        $.ajax({
            type: "POST",
            url: "../SolicitudesAtencion/SOA_Adm_Solicitudes.aspx/DescargarArchivoBD",
            data: "{'inIdDet': '" + inIdDet + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                //var filePath = "P_Movil/Administrar/Temporal/Incidencias/" + NomArc;
                var filePath = "P_Movil/Administrar/Temporal/Incidencias" + CarpetaDominio + "/" + result.d[1];

                if (NomArc.split('.')[1] == 'doc' || NomArc.split('.')[1] == 'docx' || NomArc.split('.')[1] == 'xls' || NomArc.split('.')[1] == 'xlsx') {
                    window.location.href = raiz(filePath);
                    return;
                }

                $.ajax({
                    url: raiz(filePath),
                    success: function (data) {
                        window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + filePath);
                    },
                    error: function (data) {
                        alerta('No se encontró el archivo a descargar.');
                        $('#UploadedFile').html("");
                        $("#UploadButton").show();
                        vcFileName = "";
                    }
                });
            },
            error: function (xhr, err) {
                $("#dvCargando").hide();
                alerta("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
            }
        });
    }

}


function DimPosElementos() {
    var ancho = $(window).width();
    $(".table-responsive-resumen").css("max-width", (ancho - 10).toString() + "px");
    $(".table-responsive-resumen").css("width", (ancho - 100).toString() + "px");
    $("#tableMisSolicitudes").css("width", "100%");
    $("#tableMisIncidencias").css("width", "100%");
    $("#tableMisEquipos").css("width", "100%");
}


function obtenerSolicitudes() {


    var Columnas = [
                   {
                       name: 'Visto', title: 'Notas', hidden: false, width: 60, align: 'left', resizable: false,
                       formatter: function (value, options, rData) {
                           return GenerarBotones(rData[0], rData[22], rData[23]);
                       },
                       "render": function (data, type, row, meta) {
                           if (type === 'display') {
                               data = GenerarBotones(row[9], row[10], "");
                           }
                           return data;
                       }
                   },
                   { name: 'vcCodigo', title: 'Código', visible: true, width: 115 },
                   {
                       name: 'dtFecSol', title: 'Fecha', hidden: false, width: 105, align: 'center',
                       formatter: function (value, options, rData) { return rData[4].substring(0, 10); }
                   },
                   { name: 'vcNomTipSol', title: 'Tipo Solicitud', hidden: false, width: 130, align: 'center' },
                   { name: 'vcNomEst', title: 'Estado', hidden: false, width: 90, align: 'center' },
                   {
                       name: 'opUmbral', title: 'Umbral', hidden: false, width: 50, align: 'center', sortable: false, resizable: false,
                       formatter: function (value, options, rData) {
                           return CrearBotonesSemaforo(rData[0], rData[15], rData[30]);
                       },
                       "render": function (data, type, row, meta) {
                           if (type === 'display') {
                               data = CrearBotonesSemaforo("", row[5], "");
                           }
                           return data;
                       }
                   },
                   { name: 'inDiaTra', title: 'Tiempo', hidden: false, align: 'center', width: 80, sortable: true },
                   { name: 'Técnico', title: 'Especialista', hidden: false, align: 'center', width: 80, sortable: true },
                   {
                       name: 'dcMonto', index: 'dcMonto', title: 'Monto', hidden: true, width: 70, align: 'right', visible: false
                       //,formatter: 'number', formatoptions: { decimalSeparator: oCulturaUsuario.vcSimDec, thousandsSeparator: oCulturaUsuario.vcSimSepMil, decimalPlaces: oCulturaUsuario.dcNumDec}
                   },
                   { name: 'IdSolicitud', title: 'IdSolicitud', visible: false },
                   { name: 'biEscalamiento', title: 'biEscalamiento', visible: false },
                   { name: 'IdEstadoApr', title: 'IdEstadoApr', visible: false },
                   { name: 'IdEstadoPro', title: 'IdEstadoPro', visible: false },
    ];
    var inPagTam = 1000;
    var inPagAct = 1;
    var vcOrdCol = "dtFecSol";
    var vcTipOrdCol = "desc";

    var dtInicio = new Date();
    vcFiltro = "19" + $("#ddlPeriodo").val().substr(2, 2) + $("#ddlPeriodo").val().substr(0, 2) + "01";
    vcFiltro2 = "21" + $("#ddlPeriodo").val().substr(2, 2) + $("#ddlPeriodo").val().substr(0, 2) + "31"; //La función del sql lo pondrá automáticamente al último día REAL del mes

    $.ajax({
        url: "../Administrar/Solicitudes/Adm_ListadoSolicitudes.aspx/Listar", //PageMethod
        data: "{'vcTodos':'" + vcTodos + "'," +
          "'inPagTam':'" + inPagTam + "'," +
          "'inPagAct':'" + inPagAct + "'," +
          "'vcOrdCol':'" + vcOrdCol + "'," + //Nombre de columna ordenado
          "'vcTipOrdCol':'" + vcTipOrdCol + "'," + //Tipo de orden de columna asc, desc
          "'strTipos': '" + vcTipos + "'," +
          "'intFiltro': '" + inFiltro + "'," +
          "'strFiltro':'" + vcFiltro + "'," +
          "'strFiltro2':'" + vcFiltro2 + "'," +
          "'inTipFil':'0'," +
          "'biSolNoVis':'false'," +
        //"'vcVista':'Pendiente'," + //'General', 'Pendiente'," + //PorAprobar
          "'vcVista':'" + ($("#lblLicencia").text() == "BASIC" ? 'General' : 'Pendiente') + "'," + //'General', 'Pendiente'," + //PorAprobar                      
          "'strRangFechaIni':'" + vcRangoFechaIni + "'," +
          "'strRangFechaFin':'" + vcRangoFechaFin + "'," +
          "'inCodTip':'" + $("#ddlTipoLinea").val() + "'," +
            "'vcResAre':'" + $("#hdfResApr").val() + "'," +
            "'biNotasPorRevisar': '" + false + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            var dataSet = [];
            var fila = [];
            for (var i = 0; i < result.d.Items.length; i++) {
                //result.d.Items[i].Row.splice(0, 1);
                var row = result.d.Items[i].Row;
                fila = [];
                fila.push(""); //Notas
                fila.push(row[2]); //Código
                fila.push(row[4]); //Fecha
                fila.push(row[11]); //Tipo de Solicitud
                fila.push(row[16]); //Estado
                fila.push(row[18]); //Umbral
                fila.push(row[19]); //Tiempo
                fila.push(row[20]); //Tecnico
                fila.push(row[19]); //Monto
                fila.push(row[1]); //IdSolicitud
                fila.push(row[22]); //biEscalamiento
                fila.push(row[10]); //IdEstadoApr
                fila.push(row[12]); //IdEstadoPro

                dataSet.push(fila);
            }
            //debugger;
            rowsGrillaSolicitudes = $('#tableMisSolicitudes').DataTable({
                data: dataSet,
                responsive: true,
                searching: false,
                paging: false,
                info: false,
                columns: Columnas,
                language: language_Datatable,
                fnCreatedRow: function (nRow, aData, iDataIndex) {
                    $(nRow).attr('id', 'fila_' + aData[9]); // IdSolicitud
                },
            });

            //setTimeout(function () {
            //	$("#tableMisSolicitudes").css("width","50%");
            //}, 1000);


            $(".ConImgSol").click(function () {
                var id = $(this).attr("id").substr(8);
                IdNotaSeleccionada = id;

                var dataRow = rowsGrillaSolicitudes.row("#fila_" + id).data();
                window.top.VentanaNotaSignalRActiva = true;
                $('#ifNota').attr("src", "../Administrar/Solicitudes/Adm_SolicitudNota.aspx?IdSolicitud=" + id + "&IdEstApr=" + dataRow[11] + "&IdEstPro=" + dataRow[12]);
                formulario = $('#dvNota').dialog({
                    title: "Notas de la Solicitud: " + dataRow[1],
                    height: 580,
                    width: 713,
                    modal: true,
                    close: function (event, ui) {
                        window.top.VentanaNotaSignalRActiva = false;
                    },
                    resizable: false,
                });

                $("#imgNueNot_" + id).hide();
            });


            //$("#grid")[0].addJSONData(result.d);
            //if (result.d.Items.length == 0) {
            //    $("#grid").setGridHeight(5);
            //}
            //else {
            //    $("#grid").setGridHeight(180);
            //}
            //obtenerTickets();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });



}