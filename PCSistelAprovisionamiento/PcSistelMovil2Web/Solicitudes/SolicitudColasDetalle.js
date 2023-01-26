

$(function () {

    
    $('#grid').jqGrid({
        sortable: true,
        datatype: listarcola,
        jsonReader:
                      {
                          root: 'Items',
                          page: 'PaginaActual',
                          total: 'TotalPaginas',
                          records: 'TotalRegistros',
                          repeatitems: true,
                          cell: 'Row',
                          IdEquipo: 'IdEquipo'
                      },
        colModel: [     
                    { name: 'IdTarea', index: 'IdTarea', label: 'N. Tarea', width: 50,align: "center" },
                    { name: 'IdColaAprovisionamiento', index: 'IdColaAprovisionamiento', label: 'IdColaAprovisionamiento', hidden: true },
                    { name: 'Tarea', index: 'Tarea', label: 'Tarea', width: 295 },
                    { name: 'Estado', index: 'Estado', label: 'Estado', width: 70,align: "center" }
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
        sortorder: "asc",
        width: 460,
        height: '255',
        shrinkToFit: false,
        rownumbers: true,

        onSelectRow: function (id) {
            IdEquipo = id;
        },
        ondblClickRow: function (id) {
            IdEquipo = id;
            $('#btnAddTecnico').click();
        }


    }).navGrid('#pager', { edit: false, add: false, search: false, del: false });


    $("#imgTecnico").click(function () {

        $('#txtbusqueda').val($('#txtbusqueda').val().replace(/\\/g, ''));
        buscarValor = $('#txtbusqueda').val();
        $('#grid').trigger('reloadGrid');



        var dlgTecnicos = $('#div_modal_tecnico').dialog({
            title: 'Agregar Titulares',
            width: 470,
            height: 420,
            modal: true,
            resizable: false,
            position: ['center'],
            autoOpen: true
        });
    });


    $('#btnCerrar').live('click', function () {
        window.parent.$('#dvNota').dialog('close');
    });

});

function listarcola() {

    $.ajax({
        url: "SolicitudColasDetalle.aspx/ListarCola",

        data: "{'filtro':'" + $("#hdfIdCola").val()+ "'," +
                 "'campoordenar':'" + $('#grid').getGridParam("sortname") + "'," +
                 "'orden':'" + $('#grid').getGridParam("sortorder") + "'," +
                 "'inPagTam':'" + $('#grid').getGridParam('rowNum') + "'," +
                 "'inPagAct':'" + parseInt($('#grid').getGridParam('page')) + "'}",

        dataType: 'json',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            $('#grid').jqGrid('clearGridData');
            if (result.d.Items.length > 0) {
                $('#grid')[0].addJSONData(result.d);
            }

            //                indexcombo = $("#ddlEquipo option:selected").index();
            //                $("#grid").jqGrid('setSelection', indexcombo+1, true);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}