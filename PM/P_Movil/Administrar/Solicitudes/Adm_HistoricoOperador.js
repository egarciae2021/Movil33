$(function () {
    var tbGrid = $("#grid").jqGrid({
        sortable: true,
        datatype: "local",
        datatype: function () {

            $.ajax({
                url: "Adm_HistoricoOperador.aspx/Listar", //PageMethod
                data: "{'IdSolicitud':'" + $("#hdfIdSolicitud").val() + "'}",
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    lstFilas = result.d;
                    tbGrid.jqGrid('clearGridData');

                    if (lstFilas.length > 0) {
                        var i = 0;
                        for (i = 0; i < lstFilas.length; i++) {
                            tbGrid.jqGrid('addRowData', i, lstFilas[i]);
                        }
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
        colModel: [{ name: 'daFecIni', label: 'Fecha Envío', hidden: false, width: 120 },
                       { name: 'daFecFin', label: 'Fecha Devolución', hidden: false, width: 130 },
                       { name: 'vcHoras', label: 'Horas', hidden: false, width: 100, align: 'center' }
   	                  ],
        width: "420",
        height: "210",
        viewrecords: true,
        pager: "#pager", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        sortname: "dtFecSol", //sortname: idTabla, //Default SortColumn
        sortorder: "desc", //Default SortOrder.
        rownumbers: true,
        shrinkToFit: false
    });
});
