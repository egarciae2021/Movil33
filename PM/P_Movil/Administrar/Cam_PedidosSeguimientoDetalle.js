
$(function () {
    $("input:checkbox,input:radio,input:file").uniform();

    var tblGrupo = $("#grid").jqGrid({
        sortable: true,
        datatype: function () {
            $.ajax({
                url: "Cam_PedidosSeguimientoDetalle.aspx/Mostrar", //PageMethod
                data: "{'inIdPedido':'" + $('#hdfIdDetallePedido').val() + "'}",
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    $("#grid").jqGrid('clearGridData');
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
        colModel: [{ name: 'IdDetallePedido', index: 'IdPedido', label: 'IdDetallePedido', hidden: true },
                            { name: 'IdUsuario', index: 'IdUsuario', label: 'IdUsuario', hidden: true },
                            { name: 'IdEstado', index: 'IdEstado', label: 'IdEstado', hidden: true },
                            { name: 'vcNomEst', index: 'vcNomEst', label: 'Estado', hidden: false, width: 100, sortable: false },
                            { name: 'FechaInicio', index: 'FechaInicio', label: 'FechaInicio', hidden: false, width: 130, sortable: false },
                            { name: 'FechaFin', index: 'FechaFin', label: 'FechaFin', hidden: false, width: 130, sortable: false },
                            { name: 'Comentario', index: 'Comentario', label: 'Comentario', hidden: false, width: 130, sortable: false },
                            { name: 'vcNomUsu', index: 'vcNomUsu', label: 'Usuario', hidden: false, width: 90, sortable: false }
   	                      ],
        emptyrecords: 'No hay resultados',
        sortname: "vcNomEst", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "655",
        height: "150",
        rownumbers: true,
        shrinkToFit: false
    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });

    $("#btnCerrar").click(function () {
        window.parent.formulario.dialog('close');
    });
});
    