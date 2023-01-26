$(function () {
    $("input:checkbox,input:radio,input:file").uniform();

    var mydata = [
		            { RowNumber: "1", inCodGru: "2007-10-01", vcGru: "1", vcPol: "Edgar Quispe", vcPol1: "15/10/2013", vcPol2: "4" },
		            { RowNumber: "2", inCodGru: "2007-10-02", vcGru: "2", vcPol: "Marco Caceres", vcPol1: "15/10/2013", vcPol2: "3" },
		            { RowNumber: "3", inCodGru: "2007-10-02", vcGru: "3", vcPol: "Jhony", vcPol1: "16/10/2013", vcPol2: "5" }
		        ];

    var tblGrupo = $("#tblProductos").jqGrid({
        sortable: true,
        datatype: "local",
        //                datatype: function () {
        //                    $.ajax({
        //                        url: "Conf_PoliticaSolicitud.aspx/ListarPoliticaSolicitudPorGrupo", //PageMethod
        //                        data: "{'inPagTam':'" + $('#tblPoliticaSolicitudxGrupo').getGridParam("rowNum") + "'," + //Tamaño de pagina
        //                                  "'inPagAct':'" + $('#tblPoliticaSolicitudxGrupo').getGridParam("page") + "'," + //Pagina actual
        //                                  "'inCodPol': '" + $("#hdfPolitica").val() + "'," +
        //                                  "'vcCam':'" + $('#ddlBusqueda').val() + "'," + //Campo de busqueda
        //                                  "'vcValBus':'" + ValorBusqueda() + "'}", //Valor de busqueda
        //                        dataType: "json",
        //                        type: "post",
        //                        contentType: "application/json; charset=utf-8",
        //                        success: function (result) {
        //                            //$("#tblPoliticaSolicitudxGrupo").trigger("reloadGrid");
        //                            $("#tblPoliticaSolicitudxGrupo")[0].addJSONData(result.d);

        //                            //$("#tblPoliticaSolicitudxGrupo").jqGrid('addRowData', result.d[0].P_vcCod, result.d[0]);

        //                        },
        //                        error: function (xhr, err, thrErr) {
        //                            MostrarErrorAjax(xhr, err, thrErr);
        //                        }
        //                    });
        //                },
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
        colModel: [{ name: 'RowNumber', index: 'RowNumber', label: 'RowNumber', hidden: true },
                            { name: 'inCodGru', index: 'inCodGru', label: 'inCodGru', hidden: true },
   		                    { name: 'vcGru', index: 'vcGru', label: 'N° de pedido', hidden: false, width: 50 },
                            { name: 'vcPol', index: 'vcPol', label: 'Empleado', hidden: false, width: 100 },
                            { name: 'vcPol1', index: 'vcPol1', label: 'Fecha', hidden: false, width: 100 },
                            { name: 'vcPol2', index: 'vcPol2', label: 'Numero de Items', hidden: false, width: 90 }
   	                      ],
        pager: "#pager", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: "10", //$("#hdfTamPag").val(), //"10" PageSize.
        rowList: [10, 20, 30],  //TamanosPaginaSel, //Variable PageSize DropDownList. 
        sortname: "inCodGru", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "410",
        height: "95",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Cortes",
        ondblClickRow: function (id) { $("#btnCambiarValGrup").click(); },
        onSelectRow: function (id) {
        },
        sortable: function (permutation) {
            //var colModels = $("#grid").getGridParam("colModel");
            //alert(colModels);
        },
        resizeStop: function (width, index) {
            //alerta("resize column " + index + " to " + width + "pixels");
        },
        afterInsertRow: function (rowid, aData, rowelem) {
            if (aData.btVig == 'False') {
                var colModels = $("#tblPoliticaSolicitudxGrupo").getGridParam("colModel");
                for (i in colModels) {
                    $("#tblPoliticaSolicitudxGrupo").jqGrid('setCell', rowid, i, '', { color: 'red' });
                }
            }
        },
        //onSortCol: function(name,index){  alerta("Column Name: "+name+" Column Index: "+index); },
        ondblClickRow: function (id) {
            $("#tblPoliticaSolicitudxGrupo").jqGrid('resetSelection');
            $("#tblPoliticaSolicitudxGrupo").jqGrid('setSelection', id);
            //                        if ($("#hdfEdicion").val() == "1")
            //                            EditaRegistro(id);
        }
    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });

    var i = 0;
    for (i = 0; i <= mydata.length; i++) {
        $("#tblProductos").jqGrid('addRowData', i + 1, mydata[i]);
    }
});
