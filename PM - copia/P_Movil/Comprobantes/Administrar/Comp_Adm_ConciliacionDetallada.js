$(function() {

    inicio();
    function inicio() {

        $("#grid").jqGrid({
            datatype: function() {

                var Buscar_Data = {
                    inPagTam: $('#grid').getGridParam("rowNum"),
                    inPagAct: $('#grid').getGridParam("page"),
                    vcOrdCol: $('#grid').getGridParam("sortname"),
                    vcTipOrdCol: $('#grid').getGridParam("sortorder"),
                    p_periodo: $("#hdfPeriodo").val(),
                    p_idEmpleado: $("#hdfCodEmpleado").val(),
                    p_idTipoProceso: $("#hdfTipoProceso").val(),
                    p_conciliados: $("#hdfIdConciliado").val(),
                    p_tipoProducto: $("#hdfTipoProducto").val(),
                    p_nroComprobante: $("#hdfNroComp").val()
                }

                $.ajax({
                    type: "POST",
                    url: "Comp_Adm_ConciliacionDetallada.aspx/Listar",
                    data: JSON.stringify(Buscar_Data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(result) {
                        $("#grid")[0].addJSONData(result.d);
                    },
                    error: function(xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },

            colNames: ['Línea', 'Cuenta', 'Monto Familia', 'Monto Operador', 'Estado'],
            colModel: [
                { name: 'linea', index: 'linea', width: 90, align: 'center' },
                { name: 'cuenta', index: 'cuenta', width: 100, align: 'center' },
                { name: 'montoFamilia', index: 'montoFamilia', width: 70, align: 'right', resizable: false, formatter: 'currency', formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 } },
                { name: 'montoOperador', index: 'montoOperador', width: 70, align: 'right', resizable: false, formatter: 'currency', formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 } },
                { name: 'estado', index: 'estado', width: 75, align: 'center', resizable: false }
            ],
            pager: '#pager',
            rowNum: 5,
            rowList: [5, 10, 20],
            viewrecords: true,
            hidegrid: false,
            gridview: true,
            sortable: true,
            rownumbers: true,
            height: '120',
            shrinkToFit: false,
            width: '480',
            loadtext: 'Cargando datos...',
            recordtext: "{0} - {1} de {2} elementos",
            emptyrecords: 'No hay resultados',
            pgtext: 'Pág: {0} de {1}',
            jsonReader: {
                root: "Items",
                page: "PaginaActual",
                total: "TotalPaginas",
                records: "TotalRegistros",
                repeatitems: true,
                cell: "Row",
                id: "linea"
            },
            onSelectRow: function(id, select, item) {
            }
        });
//        .navGrid("#pager", { edit: false, add: false, search: false, del: false });
    }
});