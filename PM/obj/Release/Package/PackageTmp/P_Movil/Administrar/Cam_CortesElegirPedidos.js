var vcSit;
var vcUnselect = "0";
var vcSelect = "";
var vcFuncion = "";
var vcSubFuncion = "";
var vcEsAgregar = "";
$(function () {

    var IdCorte = $('#hdfIdCorte').val();

    vcEsAgregar = $("#hdfEsAgregar").val();
    if (vcEsAgregar == "1") {
        vcFuncion = "Cam_CortesElegirPedidos.aspx/Listarpedidos";
        vcSubFuncion = "Cam_CortesElegirPedidos.aspx/ListarPedidoDetalles";
        $("#imgAgregar").attr('src', '../../Common/Images/Mantenimiento/add_16x16.gif');
        $("#lblAgregar").text("Agregar Pedidos");
    } else {
        vcFuncion = "Cam_CortesElegirPedidos.aspx/MostrarPedidosAgregados";
        vcSubFuncion = "Cam_CortesElegirPedidos.aspx/MostrarDetallesAgregados";
        $("#imgAgregar").attr('src', '../../Common/Images/Mantenimiento/Quitar.png');
        $("#lblAgregar").text("Quitar Pedidos");
    }

    vcSit = $("#hdfSituacion").val();

    $(".DATE").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy' // See format options on parseDate
    });

    $("#imgBorrarFechaInicio").click(function () { $("#txtFechaInicio").val(""); });
    $("#imgBorrarFechaFin").click(function () { $("#txtFechaFin").val(""); });

    $('#txtArea,#txtEmpleado,#txtCentroCosto').live("keypress", function (e) {
        if (e.keyCode == 39 || e.char == "\\" || e.keyCode == 92) {
            return false;
        }
    });

    $("#txtEmpleado").focusout(function () {
        $.ajax({
            type: "POST",
            url: "../../Common/WebService/General.asmx/ListarEmpleado",
            data: "{'maxFilas': '" + 200 + "'," +
                           "'vcNomEmp': '" + $("#txtEmpleado").val().replace(/'/g, "&#39") + "'," +
                           "'incodGrup': '-1'," +
                           "'idCliente': '" + window.parent.parent.parent.idCliente + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if ($(result.d).length == 1) {
                    $("#hdfCodEmpleado").val(result.d[0].P_vcCod);
                    Selecciono = true;
                }
                else {
                    $("#hdfCodEmpleado").val("");
                    Selecciono = false;
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });
    $("#txtEmpleado").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../Common/WebService/General.asmx/ListarEmpleado",
                data: "{'maxFilas': '" + 200 + "'," +
                               "'vcNomEmp': '" + $("#txtEmpleado").val().replace(/'/g, "&#39") + "'," +
                               "'incodGrup': '-1'," +
                               "'idCliente': '" + window.parent.parent.parent.idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.vcNom,
                            vcCodEmp: item.P_vcCod,
                            category: item.Grupo.vcNom,
                            inCodGru: item.Grupo.P_inCod
                        };
                    }));
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtEmpleado").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtEmpleado").val(ui.item.label);
            $("#hdfCodEmpleado").val(ui.item.vcCodEmp);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodEmpleado").val("");
            }
            return false;
        },
        open: function (event, ui) {
            Selecciono = false;
            return false;
        }
    })
    .data("autocomplete")._renderItem = function (ul, item) {
        return $("<li></li>")
			.data("item.autocomplete", item)
			.append("<a>" + item.vcCodEmp + "=" + item.label + "</a>")
			.appendTo(ul);
    };

    $("#txtArea").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../Common/WebService/General.asmx/ListarAreas",
                data: "{'maxFilas': '" + 100 + "'," +
                               "'vcNomAre': '" + $("#txtArea").val() + "'," + "'idCliente': '" + window.parent.parent.parent.idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.Nombre,
                            inCodAre: item.Codigo,
                            inCodInt: item.CodInt //agregado 22-08-2013
                        };
                    }));
                },
                cache: false,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtArea").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtArea").val(ui.item.label);
            $("#hdfCodAreaBusqueda").val(ui.item.inCodAre);
            $("#hdfCodIntArea").val(ui.item.inCodInt); //agregado 22-08-2013
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodAreaBusqueda").val("");
                return false;
            }
        },
        open: function (event, ui) {
            Selecciono = false;
            return false;
        }
    })
                .data("autocomplete")._renderItem = function (ul, item) {
                    return $("<li></li>")
			            .data("item.autocomplete", item)
                    //.append("<a>" + item.VCNOMORG + "<br>" + item.label + "</a>")
			            .append("<a>" + item.label + "</a>")
			            .appendTo(ul);
                };

    $("#txtCentroCosto").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../Common/WebService/General.asmx/ListarCCOCombo",
                data: "{'maxFilas': '" + 100 + "'," +
                               "'vcNomCCO': '" + $("#txtCentroCosto").val() + "'," + "'idCliente': '" + window.parent.parent.parent.idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.vcNomCco,
                            inCodCCO: item.vcCodCco
                        };
                    }));
                },
                cache: false,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtCentroCosto").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtCentroCosto").val(ui.item.label);
            $("#hdfCCOBusqueda").val(ui.item.inCodCCO);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCCOBusqueda").val("");
                return false;
            }
        },
        open: function (event, ui) {
            Selecciono = false;
            return false;
        }
    })
                .data("autocomplete")._renderItem = function (ul, item) {
                    return $("<li></li>")
			            .data("item.autocomplete", item)
                    //.append("<a>" + item.VCNOMORG + "<br>" + item.label + "</a>")
			            .append("<a>" + item.label + "</a>")
			            .appendTo(ul);
                };

    $("#ddlCuenta").dropdownchecklist({ forceMultiple: true, icon: {}, width: 230, firstItemChecksAll: true });

    //                if (vcSit == "Baja" || vcSit == "Renovacion") {
    //                    $("#ddlCuenta").dropdownchecklist("destroy");
    //                    $("#ddlCuenta").val("-1");
    //                    $("#ddlCuenta").dropdownchecklist({ forceMultiple: true, icon: {}, width: 230 });
    //                } else {
    //                    $("#ddlCuenta").dropdownchecklist("destroy");
    //                    $("#ddlCuenta").val("-1");
    //                }

    function CargarPedido() {
        var vcData = "";

        vcData = "{'inIdCampana': '" + $("#hdfIdCampana").val() + "'," +
                 "'vcNomSit': '" + vcSit + "'," +
                 "'vcFecIni': '" + $("#txtFechaInicio").val() + "'," +
                 "'vcFecFin': '" + $("#txtFechaFin").val() + "'," +
                 "'vcCodEmp': '" + $("#hdfCodEmpleado").val() + "'," +
                 "'vcCodAre': '" + $("#hdfCodAreaBusqueda").val() + "'," +
                 "'vcCodCCO': '" + $("#hdfCCOBusqueda").val() + "'," +
                 "'vcCodCue': '" + $("#ddlCuenta").val() + "'," +
                 "'inPagTam':'" + $('#tbPedidos').getGridParam("rowNum") + "'," + //Pagina actual
                 "'inPagAct':'" + parseInt($('#tbPedidos').getGridParam("page")) + "'," + //FiltroRegistro
                 "'inIdCorte':'" + IdCorte + "'}"; //FiltroRegistro

        $.ajax({
            type: "POST",
            url: vcFuncion,
            data: vcData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#tbPedidos")[0].addJSONData(result.d);

                if ($(result.d.Items).length > 0) {
                    $("#ContentPlaceHolder1_UTSum__ctl1_lblError").hide();
                    $("#ContentPlaceHolder1_UTSum__ctl1_pnDet").show();
                }
                else {
                    $("#ContentPlaceHolder1_UTSum__ctl1_lblError").show();
                    $("#ContentPlaceHolder1_UTSum__ctl1_pnDet").hide();
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    $("#tbPedidos").jqGrid({
        datatype: CargarPedido,
        colModel: [{ name: 'IdCampana', index: 'IdCampana', label: 'IdCampana', hidden: true, width: 50, sortable: false },
                                { name: 'IdPedido', index: 'IdPedido', label: 'IdPedido', hidden: true, sortable: false },
   		                        { name: 'CodigoPedido', index: 'CodigoPedido', label: 'Código de Pedido', hidden: false, width: 100, align: 'right', sortable: false },
                                { name: 'IdEmpleado', index: 'IdEmpleado', label: 'Registro', hidden: false, width: 50, sortable: false },
                                { name: 'vcNomEmp', index: 'vcNomEmp', label: 'Empleado', hidden: false, width: 200, sortable: false },
                                { name: 'vcNomOrg', index: 'vcNomOrg', label: 'Área', hidden: false, width: 200, sortable: false },
                                { name: 'vcNomCCO', index: 'vcNomCCO', label: 'Centro de Costo', hidden: false, width: 200, sortable: false },
                                { name: 'FechaPedido', index: 'FechaPedido', label: 'Fecha', hidden: false, width: 90, sortable: false },
        //                                { name: 'FechaPedidoAnsi', index: 'FechaPedidoAnsi', label: 'Fecha', hidden: true, width: 115 },
                                {name: 'NumeroItems', index: 'NumeroItems', label: 'N° de Ítems', hidden: false, width: 40, align: 'right', sortable: false }
   	                            ],
        jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
                    {
                    root: "Items",
                    page: "PaginaActual",
                    total: "TotalPaginas",
                    records: "TotalRegistros",
                    repeatitems: true,
                    cell: "Row",
                    id: "ID"
                },
        pager: "#pager", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: 35, //$("#hdfTamPag").val(), //"10" PageSize.
        rowList: [20, 35, 50], //[10, 20, 30],  //TamanosPaginaSel, //Variable PageSize DropDownList. 
        sortname: "CodigoPedido", //sortname: idTabla, //Default SortColumn
        sortorder: "desc", //Default SortOrder.
        multiselect: false,
        width: "700",
        height: "270",
        rownumbers: true,
        shrinkToFit: false,
        viewrecords: true, //Show the RecordCount in the pager.
        beforeSelectRow: function (rowId, e) {
            vcSelect = $(this).find('#' + rowId + ' input[type=checkbox]').prop('checked');
            return $(e.target).is("input:checkbox");
        },
        onSelectRow: function (rowid, status) {
            //var status = $(this).find('#' + rowid + ' input[type=checkbox]').prop('checked');
            if (vcUnselect == "0") {
                if (vcSelect != status) {
                    status = vcSelect;
                    $(this).find('#' + rowid + ' input[type=checkbox]').prop('checked', status);
                    $('#tbPedidos').jqGrid('setSelection', rowid);
                    vcSelect = "";
                }

                var ids = $("#tbPedidos_" + rowid + "_t").jqGrid('getDataIDs');

                $("#tbPedidos_" + rowid + "_t").resetSelection();
                if (status == true) {
                    var j = 0;
                    for (j = 0; j < ids.length; j++) {
                        $("#tbPedidos_" + rowid + "_t").jqGrid('setSelection', ids[j], true);
                    }
                }
            } else {
                $("#tbPedidos").jqGrid('resetSelection', rowid, false);
            }

            //$("#tbPedidos").jqGrid('resetSelection');
        },
        onSelectAll: function (ids_Grid, status) {
            for (i = 0; i < ids_Grid.length; i++) {
                var ids_SubGrid = $("#tbPedidos_" + ids_Grid[i] + "_t").jqGrid('getDataIDs');
                $("#tbPedidos_" + ids_Grid[i] + "_t").resetSelection();
                if (status == true) {
                    var j = 0;
                    for (j = 0; j < ids_SubGrid.length; j++) {
                        $("#tbPedidos_" + ids_Grid[i] + "_t").jqGrid('setSelection', ids_SubGrid[j], true);
                    }
                }
            }
        },
        gridComplete: function () {
        },
        subGrid: true,
        subGridOptions: {
            "reloadOnExpand": false,
            "selectOnExpand": false
        },
        subGridRowExpanded: function (subgrid_id, row_id) {
            var subgrid_table_id, pager_id;
            subgrid_table_id = subgrid_id + "_t";
            pager_id = "p_" + subgrid_table_id;
            $("#" + subgrid_id).html("<table id='" + subgrid_table_id + "' class='scroll'></table><div id='" + pager_id + "' class='scroll'></div>");
            $("#" + subgrid_table_id).jqGrid({
                datatype: function () {
                    $.ajax({
                        url: vcSubFuncion, //PageMethod
                        data: "{'inIdPedido': '" + row_id + "'," +
                               "'vcNomSit': '" + vcSit + "'," +
                               "'inIdCorte': '" + IdCorte + "'}",
                        dataType: "json",
                        type: "post",
                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            $("#" + subgrid_table_id).jqGrid('clearGridData');
                            var i = 0;
                            for (i = 0; i < $(result.d).length; i++) {
                                $("#" + subgrid_table_id).jqGrid('addRowData', i, result.d[i]);
                            }

                            if (vcSit == "Nuevo") {
                                $("#" + subgrid_table_id).jqGrid('hideCol', ["Linea"]);
                                $("#" + subgrid_table_id).jqGrid('showCol', ["NomMod"]);
                            }
                            else if (vcSit == "Baja") {
                                $("#" + subgrid_table_id).jqGrid('showCol', ["Linea"]);
                                $("#" + subgrid_table_id).jqGrid('hideCol', ["NomMod"]);
                            }
                            else {
                                $("#" + subgrid_table_id).jqGrid('showCol', ["Linea", "NomMod"]);
                            }

                            //$("#" + subgrid_table_id).setGridHeight($(result.d).length * 23);


                            if ($.browser.chrome) {
                                $('#gbox_' + subgrid_table_id).css("width", "765px"); //ui-jqgrid-bdiv
                                $('div.ui-jqgrid-bdiv', 'div#gview_' + subgrid_table_id).each(function (i) {
                                    $(this).css({ "width": "765px" });
                                });
                                $('div.ui-jqgrid-hdiv', 'div#gview_' + subgrid_table_id).each(function (i) {
                                    $(this).css({ "width": "765px" });
                                });
                            }
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                },
                colModel: [
                            { name: 'IdDetallePedido', index: 'IdDetallePedido', label: 'IdDetallePedido', width: '40', align: 'center', sortable: false, resizable: false, hidden: true },
   		                    { name: 'IdPedido', index: 'IdPedido', label: 'IdPedido', width: '70', align: 'left', sortable: false, resizable: false, hidden: true },
                            { name: 'NumeroItem', index: 'NumeroItem', label: 'Ítem', width: '40', align: 'center', sortable: false, resizable: false, hidden: false },
                            { name: 'Linea', index: 'Linea', label: 'Línea', width: 70 },
   		                    { name: 'NomMod', index: 'NomMod', label: 'Equipo', width: '130', align: 'left', sortable: false },
                            { name: 'NomPlan', index: 'NomPlan', label: 'Plan', width: '130', align: 'left', sortable: false },
   		                    { name: 'vcNomCue', index: 'vcNomCue', label: 'Cuenta', width: '130', align: 'left', sortable: false },
   		                    { name: 'MontoTotalNoServicios', index: 'MontoTotalNoServicios', label: 'Monto (No Servicios)', width: '80', align: 'right', sortable: false, align: 'right' },
   		                    { name: 'MontoTotalServicios', index: 'MontoTotalServicios', label: 'Monto (Servicios)', width: '80', align: 'right', sortable: false, align: 'right' },
   		                    { name: 'vcCodCue', index: 'vcCodCue', label: 'vcCodCue', width: '80', align: 'right', sortable: false, hidden: true },
                            { name: 'MesesContrato', index: 'MesesContrato', label: 'Meses de Contrato', width: '80', align: 'right', sortable: false },
   	                      ],
                sortorder: "asc",
                width: "805",
                height: "auto",
                multiselect: true,
                shrinkToFit: false,
                onSelectRow: function (rowId, status) {
                    //$("#tbPedidos").jqGrid('setSelection', row_id, false);
                }
            });
            $("#" + subgrid_table_id).jqGrid("setGridParam", { beforeSelectRow: function (rowId, e) {
                vcUnselect = "1";
                $("#tbPedidos").jqGrid('setSelection', row_id);
                vcUnselect = "0";
                return $(e.target).is("input:checkbox");
            }
            });
        },
        subGridRowColapsed: function (subgrid_id, row_id) {
        },
        ondblClickRow: function (id) {
            return false; //AbrirRegistro(id);
        }
    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });

    //                    $("#tbPedidos").jqGrid('bindKeys', { "onEnter": function (id) { AbrirRegistro(id); },
    //                        "onSpace": function (id) { AbrirRegistro(id); }
    //                    });
    //                    $("#tbPedidos").jqGrid("setGridParam", { beforeSelectRow: function (rowId, e) {
    //                        return $(e.target).is("input:checkbox");
    //                    }
    //                    });

    function AbrirRegistro(id) {
        $("#tbPedidos").toggleSubGridRow(id);
    }

    $(window).resize(function (x) {
        $("#tbPedidos").setGridWidth($(window).width());
        $("#tbPedidos").setGridHeight($(window).height());
    });

    $("#btnBuscar").live("click", function () {
        CargarPedido();
    });

    $("#btnAgregarPedidos").click(function (event) {
        var vcPedidos = "";

        if ($(".ui-state-highlight").length == 0) {
            alerta("seleccione por lo menos un detalle de pedido");
            return;
        }

        if (vcEsAgregar == "1") {

            var lstDatosPedido = [];
            $(".ui-state-highlight").each(function (i) {
                var datos = $("#tbPedidos").jqGrid('getRowData', this.cells[2].innerText);

                if (this.cells[1].innerText != "")//Items 
                {
                    //                    var NumRowsEle = parent.tblPedidos.getGridParam("reccount");
                    //                    NumRowsEle = NumRowsEle + 1;

                    var DatosPedido = {
                        'IdDetallePedido': this.cells[1].innerText,
                        'IdPedido': this.cells[2].innerText,
                        'CodigoPedido': datos.CodigoPedido,
                        'vcCodCue': this.cells[10].innerText,
                        'vcNomCue': this.cells[7].innerText,
                        //Cuenta Elegible
                        //                    vcCodCue: CodCue,
                        //                    vcNomCue: NomCue,
                        'vcCodEmp': datos.IdEmpleado,
                        'EMPL_vcNOMEMP': datos.vcNomEmp,
                        //'FechaPedido': datos.FechaPedidoAnsi, //20140206 16:09:04
                        'FechaPedido': datos.FechaPedido, //20140206 16:09:04
                        //'NumeroPedidos': datos.NumeroItems,
                        'NumeroPedidos': this.cells[3].innerText,
                        'ORGA_vcNOMORG': datos.vcNomOrg,
                        'CCOS_vcNOMCCO': datos.vcNomCCO,
                        'Linea': this.cells[4].innerText,
                        'NomMod': this.cells[5].innerText,
                        'NomPlan': this.cells[6].innerText,
                        'MontoTotalNoServicios': this.cells[8].innerText,
                        'MontoTotalServicios': this.cells[9].innerText,
                        'MesesContrato': this.cells[11].innerText
                    };
                    //parent.oCampanaCorte.AgregarDetalle(-1, DatosPedido[0]);
                    lstDatosPedido.push(DatosPedido);
                } else {
                    vcPedidos = vcPedidos + "$$$" + this.cells[3].innerText + "$$$,";
                }
            });

            if (vcPedidos != "") {
                vcPedidos = vcPedidos.substr(0, vcPedidos.length - 1);
                parent.oCampanaCorte.ObtenerDetalles(vcPedidos, vcSit);
            }
            if ($(lstDatosPedido).length > 0) {
                parent.AgregarDetalle(-1, lstDatosPedido);
                //            for (var i = 0; i < lstDatosPedido.length; i++) {
                //                parent.oCampanaCorte.AgregarDetalle(-1, lstDatosPedido[i]);
                //                parent.$("#tblPedidosElegidos").trigger("reloadGrid");
                //            }
            }
        } else {

            var vcDetalles = "";
            $(".ui-state-highlight").each(function (i) {
                var datos = $("#tbPedidos").jqGrid('getRowData', this.cells[2].innerText);

                if (this.cells[1].innerText != "")//Items 
                {
                    vcDetalles = vcDetalles + this.cells[1].innerText + ",";
                }
                else {
                    vcPedidos = vcPedidos + "$$$" + this.cells[3].innerText + "$$$,";
                }
            });

            if (vcPedidos != "") {
                vcPedidos = vcPedidos.substr(0, vcPedidos.length - 1);
                parent.oCampanaCorte.ObtenerDetalles(vcPedidos, vcSit);
            }
            if (vcDetalles.length > 0) {
                vcDetalles = vcDetalles.substr(0, vcDetalles.length - 1);
                parent.fnQuitarDetalles(vcDetalles);
                //$("#tbPedidos").trigger("reloadGrid", [{ page: 1}]);
            }
        }

        btnCerrar.click();
    });

    $("#btnCerrar").click(function () {
        window.parent.ModalNuevo.dialog('close');
    });
});