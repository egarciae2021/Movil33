$(function () {
    $("body").css({ "margin-bottom": "0", "margin-right": "0", "padding-bottom": "0", "padding-right": "0" });

    function CargarDatos() {
        $.ajax({
            url: "Adm_CuentaServicios.aspx/ListarSubCuentas", //PageMethod
            data: "{'vcCodCue':'" + $("#hdfCuenta").val() + "'}", //FiltroRegistro
            dataType: "json",
            type: "post",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                $("#tbCuentaServicio")[0].addJSONData(result.d);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function CargarDatosDetalle(subgrid_table_id, row_id) {
        $.ajax({
            url: "Adm_CuentaServicios.aspx/ListarServiciosSubCuentas", //PageMethod
            data: "{'inCodSubCue':'" + row_id + "'}", //FiltroRegistro
            dataType: "json",
            type: "post",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                $("#" + subgrid_table_id)[0].addJSONData(result.d);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    $("#tbCuentaServicio").jqGrid({
        datatype: CargarDatos,
        colModel: [{ name: 'P_inCodSubCue', index: 'P_inCodSubCue', label: 'Codigo SubCuenta', hidden: true, sortable: false },
                   		    { name: 'F_vcCodCue', index: 'F_vcCodCue', label: 'Codigo Cuenta', hidden: true, sortable: false },
                   		    { name: 'vcNom', index: 'vcNom', label: 'Bolsa', width: '120', sortable: false },
                   		    { name: 'vcDes', index: 'vcDes', label: 'Descripción', width: '120', sortable: false },
                   		    { name: 'dcMon', index: 'dcMon', label: 'Monto', width: '70', sortable: false },
                   		    { name: 'dcCan', index: 'dcCan', label: 'Cantidad', width: '70', sortable: false },
                   		    { name: 'F_inCodTipSer', index: 'F_inCodTipSer', hidden: true, label: 'Codigo Tipo Servicio', sortable: false },
                   		    { name: 'vcNomTipoSer', index: 'vcNomTipoSer', label: 'Tipo Servicio', width: '80', sortable: false },
                   		    { name: 'vcExpEn', index: 'vcExpEn', label: 'Unidad', width: '70', hidden: true, sortable: false }
                   	        ],
        shrinkToFit: false,
        height: 200,
        width: 562,
        rownumbers: true,
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
        onSelectRow: function (id) {
            $("#tbCuentaServicio").jqGrid('resetSelection');
        },
        subGrid: true,
        subGridOptions: {
            // load the subgrid data only once
            // and the just show/hide
            "reloadOnExpand": false,
            // select the row when the expand column is clicked
            "selectOnExpand": true
        },
        subGridRowExpanded: function (subgrid_id, row_id) {
            // we pass two parameters
            // subgrid_id is a id of the div tag created whitin a table data
            // the id of this elemenet is a combination of the "sg_" + id of the row
            // the row_id is the id of the row
            // If we wan to pass additinal parameters to the url we can use
            // a method getRowData(row_id) - which returns associative array in type name-value
            // here we can easy construct the flowing
            var subgrid_table_id, pager_id;
            subgrid_table_id = subgrid_id + "_t";
            $("#" + subgrid_id).html("<table id='" + subgrid_table_id + "' class='scroll'></table>");
            $("#" + subgrid_table_id).jqGrid({
                datatype: CargarDatosDetalle(subgrid_table_id, row_id),
                colModel: [ { name: 'P_F_inCodSubCue', index: 'P_F_inCodSubCue', label: 'Codigo SubCuenta', hidden: true, sortable: false },
                           	{ name: 'P_F_inCodTipSer', index: 'P_F_inCodTipSer', label: 'Codigo TipoServicio', hidden: true, sortable: false },
                           	{ name: 'vcNomTipoSer', index: 'vcNomTipoSer', label: 'Tipo Servicio', hidden: true, sortable: false },
                           	{ name: 'P_F_inCodSer', index: 'P_F_inCodSer', label: 'Codigo Servicio', hidden: true, sortable: false },
                           	{ name: 'vcNomSer', index: 'vcNomSer', label: 'Servicio', width: '173', sortable: false,
                           	  formatter: function (value, options, rData) { if (value == '') { return rData[2]; } else { return value; } }
                           	},
                           	{ name: 'dcCan', index: 'dcCan', label: 'Asignado', width: '80', sortable: false },
                           	{ name: 'dcCanUsa', index: 'dcCanUsa', label: 'Usado', width: '80', sortable: false },
                           	{ name: 'dcCanDis', index: 'dcCanDis', label: 'Disponible', width: '80', sortable: false }
                           	],
                shrinkToFit: false,
                height: 100,
                width: 480,
                rownumbers: true,
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
                beforeSelectRow: function (id) {
                    $('#' + subgrid_table_id).jqGrid('resetSelection');
                }
            });
        }
    });
});