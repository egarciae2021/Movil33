$(function () {
    var TamanoPagina = [20, 40, 60];
    var inFilas = 40;
    function SeleccionoDespacho(id) {

    }
    var modeloDespacho = [
                { name: 'IdDespacho', index: 'IdDespacho', label: 'IdDespacho', hidden: true, width: 50 },
                { name: 'opAccion', index: 'opAccion', label: 'Acciones', hidden: false, width: 40, align: 'center',
                    formatter: function (value, options, rData) { return GenerarBotones(options.rowId); }
                },
                { name: 'IdEmpleado', index: 'IdEmpleado', label: 'Registro', hidden: false, key: true },
   		        { name: 'Empleado', index: 'Empleado', label: 'Empleado', hidden: false, width: 50 },
                { name: 'IdOficina', index: 'IdOficina', label: 'IdOficina', hidden: true, key: true },
   		        { name: 'Oficina', index: 'Oficina', label: 'Oficina', hidden: false, width: 50 },
                { name: 'IdCampana', index: 'IdCampana', label: 'IdCampana', hidden: false, width: 30, align: 'right' },
                { name: 'Fecha', index: 'Fecha', label: 'Fecha', hidden: false, width: 130 },
                { name: 'NumeroItems', index: 'Numero Items', label: 'Numero de Items', hidden: false, width: 130 },
                { name: 'Observacion', index: 'Observacion', label: 'Observación', hidden: false, width: 100 },
                { name: 'IdEstado', index: 'IdEstado', label: 'IdEstado', hidden: true, width: 30, align: 'right' },
                { name: 'Estado', index: 'Estado', label: 'Estado', hidden: false, width: 80, align: 'center' }
   	        ];

    var modeloDespachoDetalle = [
               	{ name: 'IdDespachoDetalle', index: 'IdDespachoDetalle', label: 'IdDespachoDetalle', hidden: true, width: 50 },
                { name: 'IdDespacho', index: 'IdDespacho', label: 'IdDespacho', hidden: true, width: 30, align: 'right' },
                { name: 'NumeroItem', index: 'NumeroItem', label: 'Numero Item', hidden: true, width: 130 },
                { name: 'IdDetallePedido', index: 'IdDetallePedido', label: 'IdDetallePedido', hidden: true, width: 130 },
                { name: 'Pedido', index: 'Pedido', label: 'Pedido', hidden: false, width: 130 },
                { name: 'Linea', index: 'Linea', label: 'Línea', hidden: false, width: 100 },
                { name: 'Radio', index: 'Estado', label: 'Estado', hidden: false, width: 80, align: 'center' },
                { name: 'ModeloDispositivo', index: 'IdEstado', label: 'IdEstado', hidden: false, width: 30, align: 'right' },
                { name: 'IMEI', index: 'IdEstado', label: 'IdEstado', hidden: false, width: 30, align: 'right' },
                { name: 'Plan', index: 'Plan', label: 'Plan', hidden: false, width: 30, align: 'right' },
                { name: 'MesesContrato', index: 'MesesContrato', label: 'Meses Contrato', hidden: false, width: 30, align: 'right' },
                { name: 'Observacion', index: 'Estado', label: 'Estado', hidden: false, width: 80, align: 'center' },
                { name: 'Situacion', index: 'Estado', label: 'Estado', hidden: false, width: 80, align: 'center' },
                { name: 'IdEstado', index: 'Estado', label: 'Estado', hidden: true, width: 80, align: 'center' },
                { name: 'Estado', index: 'Estado', label: 'Estado', hidden: false, width: 80, align: 'center' }
            ];

    function GenerarBotones(id) {
        return '<img id="btnEdit' + id + '" src="../../Common/Images/Mantenimiento/edit_16x16.gif" alt="Editar Despacho" class="imgBtn EditDesp" title="Editar Despacho"/>' +
                       '<img id="btnElim' + id + '" src="../../Common/Images/Mantenimiento/Cancelar.png" alt="Eliminar Despacho" class="imgBtn ElimDesp" title="Eliminar Despacho"/>';
    }

    $(".EditDesp").live("click", function () {
        //tbModelo.jqGrid('delRowData', $(this).attr("id").toString().substring(9, $(this).attr("id").toString().length));
    });

    $(".ElimDesp").live("click", function () {
        //tbOficina.jqGrid('delRowData', $(this).attr("id").toString().substring(9, $(this).attr("id").toString().length));
    });

    function CargarDespacho() {
        $.ajax({
            type: "post",
            url: "Cam_DespachoVisor.aspx/ListarDespacho",
            data: "{'inPagTam':'" + $('#tbPedidos').getGridParam("rowNum") + "'," +
                           "'inPagAct':'" + $('#tbPedidos').getGridParam("page") + "'," +
                           "'vcOrdCol':'" + $('#tbPedidos').getGridParam("sortname") + "'," +
                           "'vcTipOrdCol':'" + $('#tbPedidos').getGridParam("sortorder") + "'," +
                           "'inIdCampana': '" + $("#ddlCampana").val() + "'," +
                           "'vcNomSit': '" + $("#ddlSituacion").val() + "'," +
                           "'vcFecIni': '" + $("#txtFechaInicio").val() + "'," +
                           "'vcFecFin': '" + $("#txtFechaFin").val() + "'," +
                           "'vcCodEmp': '" + $("#hdfCodEmpleado").val() + "'," +
                           "'vcCodAre': '" + $("#hdfCodAreaBusqueda").val() + "'," +
                           "'vcCodCCO': '" + $("#hdfCCOBusqueda").val() + "'," +
                           "'vcCodCue': '" + $("#ddlCuenta").val() + "'," +
                           "'vcIdEst': '" + $("#ddlEstado").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#tbPedidos")[0].addJSONData(result.d);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function CargarDespachoDetalle() {
        $.ajax({
            url: "Cam_DespachoVisor.aspx/ListarDespachoDetalles", //PageMethod
            data: "{'inIdPedido': '" + row_id + "'," +
                           "'vcNomSit': '" + vcSit + "'}",
            dataType: "json",
            type: "post",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                $("#" + subgrid_table_id).jqGrid('clearGridData');
                var i = 0;
                for (i = 0; i < $(result.d).length; i++) {
                    $("#" + subgrid_table_id).jqGrid('addRowData', i, result.d[i]);
                }

                if ($.browser.chrome) {
                    $('#gbox_' + subgrid_table_id).css("width", "795px"); //ui-jqgrid-bdiv
                    $('div.ui-jqgrid-bdiv', 'div#gview_' + subgrid_table_id).each(function (i) {
                        $(this).css({ "width": "795px" });
                    });
                    $('div.ui-jqgrid-hdiv', 'div#gview_' + subgrid_table_id).each(function (i) {
                        $(this).css({ "width": "795px" });
                    });
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    $("#tbDespacho").jqGrid({
        datatype: CargarDespacho, //"local",
        jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
                {
                root: "Items",
                page: "PaginaActual",
                total: "TotalPaginas",
                records: "TotalRegistros",
                repeatitems: true,
                cell: "Row",
                id: "IdDespacho"
            },
        colModel: modeloDespacho,
        viewrecords: false,
        pager: "#pager", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: inFilas, //$("#hdfTamPag").val(), //"10" PageSize.
        rowList: TamanoPagina,  //TamanosPaginaSel, //Variable PageSize DropDownList. 
        sortname: "Oficina", //sortname: idTabla, //Default SortColumn
        sortorder: "asc",
        rownumbers: true,
        multiselect: true,
        beforeSelectRow: function (rowId, e) {
            //return $(e.target).is("input:checkbox");
        },
        onSelectRow: function (rowid, status) {
            //$("#tbPedidos").jqGrid('getRowData', rowid);
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
            //$(".ui-subgrid").css( {"height":"100px"});
            //var inHeight = "0";
            var subgrid_table_id, pager_id;
            subgrid_table_id = subgrid_id + "_t";
            pager_id = "p_" + subgrid_table_id;
            $("#" + subgrid_id).html("<table id='" + subgrid_table_id + "' class='scroll'></table><div id='" + pager_id + "' class='scroll'></div>");
            $("#" + subgrid_table_id).jqGrid({
                datatype: CargarDespachoDetalle,
                colModel: modeloDespachoDetalle,
                sortorder: "asc",
                width: "760",
                height: "auto",
                beforeSelectRow: function (rowId, e) {
                    return false;
                }
            });
        },
        subGridRowColapsed: function (subgrid_id, row_id) {
        },
        ondblClickRow: function (id) {
            //AbrirRegistro(id);
        }
    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });
});
    