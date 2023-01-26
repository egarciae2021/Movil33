$(function () {

    if ($("#hdfvcTab").val() == "MOV_Linea") {
        $('#grid').jqGrid({
            sortable: true,
            datatype: MostrarHistorico_Lineas,
            jsonReader:
                          {
                              root: 'Items',
                              page: 'PaginaActual',
                              total: 'TotalPaginas',
                              records: 'TotalRegistros',
                              repeatitems: true,
                              cell: 'Row',
                              Linea: 'Linea'
                          },
            colModel: [
                        { name: 'Linea', index: 'Linea', label: 'Linea', width: 70, align: "center" },
                        { name: 'CodEmpleado', index: 'CodEmpleado', label: 'Codigo Empl.', width: 70, align: "center" },
                        { name: 'Empleado', index: 'Empleado', label: 'Empleado', width: 100 },
                        { name: 'IMEI', index: 'IMEI', label: 'IMEI', width: 110, align: "center" },
                        { name: 'Modelo', index: 'Modelo', label: 'Modelo', width: 180, align: "center" },
                        { name: 'CodCentroCosto', index: 'CodCentroCosto', label: 'Codigo CC', width: 70, align: "center" },
                        { name: 'Estado', index: 'Estado', label: 'Situación', width: 70, align: "center" },
                        { name: 'FecInicio', index: 'FecInicio', label: 'Fecha I.', width: 70, align: "center" },
                        { name: 'FecFin', index: 'FecFin', label: 'Fecha F.', width: 70, align: "center" },
                        { name: 'Observacion', index: 'Observacion', label: 'Observacion', width: 310, align: "center" },
            ],
            pager: '#pager',
            loadtext: 'Cargando datos...',
            recordtext: '{0} - {1} de {2} Tareas',
            emptyrecords: 'No hay resultados',
            pgtext: 'Pág: {0} de {1}',
            rowNum: 10,
            rowList: [10, 20, 30],
            viewrecords: true,
            multiselect: false,
            sortname: "",
            sortorder: "ASC",
            width: '900',
            height: '200',
            shrinkToFit: false,
            rownumbers: true
        }).navGrid('#pager', { edit: false, add: false, search: false, del: false });

    }
    else if ($("#hdfvcTab").val() == "MOV_Dispositivo") {
        $('#grid').jqGrid({
            sortable: true,
            datatype: MostrarHistorico_Dispositivos,
            jsonReader:
                          {
                              root: 'Items',
                              page: 'PaginaActual',
                              total: 'TotalPaginas',
                              records: 'TotalRegistros',
                              repeatitems: true,
                              cell: 'Row',
                              Dispositivo: 'Dispositivo'
                          },
            colModel: [
                        { name: 'Dispositivo', index: 'Dispositivo', label: 'IMEI', width: 330, align: "center" },
                        { name: 'Lineas', index: 'CodEmpleado', label: 'CodEmpleado', hidden: true },
                        { name: 'CodEmpleado', index: 'CodEmpleado', label: 'CodEmpleado', width: 80, align: 'center' },
                        { name: 'Empleado', index: 'Empleado', label: 'Empleado', width: 150 },
                        //{ name: 'F_inCodEst', index: 'F_inCodEst', label: 'F_inCodEst', width: 110, align: "center", hidden: true },
                        { name: 'Estado', index: 'Estado', label: 'Situación', width: 65, align: "center" },
                        { name: 'FecInicio', index: 'FecInicio', label: 'FecInicio', width: 65, align: "center" },
                        { name: 'FecFin', index: 'FecFin', label: 'FecFin', width: 65, align: "center" },
                        { name: 'Observacion', index: 'Observacion', label: 'Observacion', width: 300, align: "center" },
            ],
            pager: '#pager',
            loadtext: 'Cargando datos...',
            recordtext: '{0} - {1} de {2} Tareas',
            emptyrecords: 'No hay resultados',
            pgtext: 'Pág: {0} de {1}',
            rowNum: 10,
            rowList: [10, 20, 30],
            viewrecords: true,
            multiselect: false,
            sortname: "",
            sortorder: "ASC",
            width: '500',
            height: '255',
            shrinkToFit: false,
            rownumbers: true,
            beforeSelectRow: function (rowid, e) {

            }
        }).navGrid('#pager', { edit: false, add: false, search: false, del: false });

    }

    $(window).resize(function () {
        DimPosElementosResize();
    });
    DimPosElementosResize();
    $(".ui-jqgrid tr.jqgrow td").css("white-space", "normal !important");


    //setTimeout(function () {
    //    DimPosElementosResize();
    //}, 1500);

});

function MostrarHistorico_Lineas() {
    $.ajax(
    {
        url: "Adm_Historico.aspx/MostrarHistorico_Lineas",

        data: "{'inCodigo':'" + $("#hdfvcCodigo").val() + "'," +
                 "'inPagTam':'" + $('#grid').getGridParam('rowNum') + "'," +
                 "'vcOrdCol':'" + $('#grid').getGridParam("sortname") + "'," + //Nombre de columna ordenado
                 "'vcTipOrd':'" + $('#grid').getGridParam("sortorder") + "'," + //Tipo de orden de columna asc, desc                               
                 "'inPagAct':'" + parseInt($('#grid').getGridParam('page')) + "'}",

        dataType: 'json',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            $('#grid').jqGrid('clearGridData');
            if (result.d.Items.length > 0) {
                $('#grid')[0].addJSONData(result.d);
                DimPosElementosResize();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function MostrarHistorico_Dispositivos() {
    $.ajax(
    {
        url: "Adm_Historico.aspx/MostrarHistorico_Dispositivos",

        data: "{'inCodigo':'" + $("#hdfvcCodigo").val() + "'," +
                 "'inPagTam':'" + $('#grid').getGridParam('rowNum') + "'," +
                 "'vcOrdCol':'" + $('#grid').getGridParam("sortname") + "'," + //Nombre de columna ordenado
                 "'vcTipOrd':'" + $('#grid').getGridParam("sortorder") + "'," + //Tipo de orden de columna asc, desc                               
                 "'inPagAct':'" + parseInt($('#grid').getGridParam('page')) + "'}",

        dataType: 'json',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            $('#grid').jqGrid('clearGridData');
            if (result.d.Items.length > 0) {
                $('#grid')[0].addJSONData(result.d);
                DimPosElementosResize();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}


function DimPosElementosResize() {
    var Alto = $(window).height();
    var Ancho = $(window).width();
    $("#grid").setGridHeight(Alto - 150);
    $("#grid").setGridWidth(Ancho - 30);
}
