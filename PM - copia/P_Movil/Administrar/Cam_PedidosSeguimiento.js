
$(function () {
    $("input:checkbox,input:radio,input:file").uniform();

    var tblGrupo = $("#grid").jqGrid({
        sortable: true,
        datatype: function () {
            $.ajax({
                url: "Cam_PedidosSeguimiento.aspx/Mostrar", //PageMethod
                data: "{'inIdPedido':'" + $('#hdfIdPedido').val() + "'}",
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var i = 0;
                    for (i = 0; i < $(result.d).length; i++) {
                        $("#grid").jqGrid('addRowData', result.d[i].IdPedido, result.d[i]);
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
                    id: "ID"
                },
        colModel: [{ name: 'IdPedido', index: 'IdPedido', label: 'IdPedido', hidden: true },
                            { name: 'IdUsuario', index: 'IdUsuario', label: 'IdUsuario', hidden: true },
                            { name: 'IdEstado', index: 'IdEstado', label: 'IdEstado', hidden: true },
                            { name: 'vcNomEst', index: 'vcNomEst', label: 'Estado', hidden: false, width: 100 },
                            { name: 'FechaInicio', index: 'FechaInicio', label: 'Fecha Inicio', hidden: false, width: 130 },
                            { name: 'FechaFin', index: 'FechaFin', label: 'Fecha Fin', hidden: false, width: 130 },
                            { name: 'vcNomUsu', index: 'vcNomUsu', label: 'Usuario', hidden: false, width: 90 },
                            { name: 'Comentario', index: 'Comentario', label: 'Comentario', hidden: false, width: 130 }
   	                      ],
        emptyrecords: 'No hay resultados',
        sortname: "vcNomEst", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "655",
        height: "150",
        rownumbers: true,
        shrinkToFit: false
    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });

    CargarGrillaDetalle();

    function CargarGrillaDetalle() {
        $("#tbDetalles").jqGrid({
            datatype: function () {
                $.ajax({
                    type: "post",
                    url: "Cam_PedidosSeguimiento.aspx/ListarPedidoDetalles",
                    data: "{'inIdPedido': '" + $("#hdfIdPedido").val() + "'," +
                                  "'vcNomSit': '" + "" + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        //$("#tbDetalles")[0].addJSONData(result.d);
                        var i = 0;
                        for (i = 0; i < $(result.d).length; i++) {
                            $("#tbDetalles").jqGrid('addRowData', i, result.d[i]);
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            }, //"local",
            jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
                        {
                        root: "Items",
                        page: "PaginaActual",
                        total: "TotalPaginas",
                        records: "TotalRegistros",
                        repeatitems: true,
                        cell: "Row",
                        id: "IdDetallePedido"
                    },
            colModel: [{ name: 'IdDetallePedido', index: 'IdDetallePedido', label: 'IdDetallePedido', width: '40', align: 'center', sortable: false, resizable: false, hidden: true, key: true },
   		                { name: 'IdPedido', index: 'IdPedido', label: 'IdPedido', width: '70', align: 'left', sortable: false, resizable: false, hidden: true },
   		                { name: 'NomMod', index: 'NomMod', label: 'Equipo', width: '150', align: 'left', sortable: false, resizable: false },
                        { name: 'NomPlan', index: 'NomPlan', label: 'Plan', width: '130', align: 'left', sortable: false, resizable: false },
   		                { name: 'vcNomCue', index: 'vcNomCue', label: 'Cuenta', width: '100', align: 'left', sortable: false, resizable: false },
   		                { name: 'MontoTotalNoServicios', index: 'MontoTotalNoServicios', label: 'Costo Equipo', width: '60', align: 'right', sortable: false, resizable: false },
   		                { name: 'MontoTotalServicios', index: 'MontoTotalServicios', label: 'Costo Plan', width: '60', align: 'right', sortable: false, resizable: false },
   		                { name: 'vcCodCue', index: 'vcCodCue', label: 'vcCodCue', width: '40', align: 'right', sortable: false, resizable: false, hidden: true },
                        { name: 'MesesContrato', index: 'MesesContrato', label: 'Meses de Contrato', width: '60', align: 'right', sortable: false, resizable: false }
   	                    ],
            viewrecords: false,
            loadtext: 'Cargando datos...',
            width: "690", //"655",
            height: "345", //"165",
            sortname: "NumeroPedido", //sortname: idTabla, //Default SortColumn
            sortorder: "asc",
            rownumbers: true,
            beforeSelectRow: function (rowId, e) {
                return $(e.target).is("input:checkbox");
            },
            onSelectRow: function (rowid, status) {
                $("#tbDetalles").jqGrid('getRowData', rowid);
            },
            onSelectAll: function (ids_Grid, status) {
            },
            gridComplete: function () {
            },
            subGrid: true,
            subGridOptions: {
                "reloadOnExpand": false,
                "selectOnExpand": false
            },
            subGridRowExpanded: function (subgrid_id, row_id) {
                var data = $("#tbDetalles").jqGrid('getRowData', row_id);
                var subgrid_table_id, pager_id;
                subgrid_table_id = subgrid_id + "_t";
                pager_id = "p_" + subgrid_table_id;
                $("#" + subgrid_id).html("<table id='" + subgrid_table_id + "' class='scroll'></table><div id='" + pager_id + "' class='scroll'></div>");
                $("#" + subgrid_table_id).jqGrid({
                    datatype: function () {
                        $.ajax({
                            url: "Cam_PedidosSeguimiento.aspx/MostrarSeguimientoDetalle", //PageMethod
                            data: "{'inIdDetallepedido': '" + data.IdDetallePedido + "'}",
                            dataType: "json",
                            type: "post",
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                $("#" + subgrid_table_id).jqGrid('clearGridData');
                                var i = 0;
                                for (i = 0; i < $(result.d).length; i++) {
                                    $("#" + subgrid_table_id).jqGrid('addRowData', i, result.d[i]);
                                }

                                $("#" + subgrid_table_id).setGridHeight($(result.d).length * 23);
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                    },
                    colModel: [{ name: 'IdDetallePedido', index: 'IdPedido', label: 'IdPedido', hidden: true, key: true, sortable: false },
                                    { name: 'IdUsuario', index: 'IdUsuario', label: 'IdUsuario', hidden: true, sortable: false },
                                    { name: 'IdEstado', index: 'IdEstado', label: 'IdEstado', hidden: true, sortable: false },
                                    { name: 'vcNomEst', index: 'vcNomEst', label: 'Estado', hidden: false, width: 90, sortable: false },
                                    { name: 'FechaInicio', index: 'FechaInicio', label: 'FechaInicio', hidden: false, width: 90, sortable: false },
                                    { name: 'FechaFin', index: 'FechaFin', label: 'FechaFin', hidden: false, width: 90, sortable: false },
                                    { name: 'vcNomUsu', index: 'vcNomUsu', label: 'Usuario', hidden: false, width: 90, sortable: false },
                                    { name: 'Comentario', index: 'Comentario', label: 'Comentario', hidden: false, width: 230, sortable: false }
   	                              ],
                    sortorder: "asc",
                    width: "620", //"760",
                    height: "300",
                    shrinkToFit: false,
                    onSelectRow: function (rowId, status) {
                        //$("#tbDetalles").jqGrid('setSelection', row_id, false);
                    }
                });
                $("#" + subgrid_table_id).jqGrid("setGridParam", { beforeSelectRow: function (rowId, e) {
                    vcUnselect = "1";
                    $("#tbDetalles").jqGrid('setSelection', row_id);
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
        });

        function AbrirRegistro(id) {
            $("#tbDetalles").toggleSubGridRow(id);
        }
    }

    $("#btnCerrar").click(function () {
        window.parent.formulario.dialog('close');
    });
});
