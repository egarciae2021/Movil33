$(function () {

    var tbLog = $("#grid").jqGrid({
        sortable: true,
        datatype: "local",
        colModel: [ { name: 'vcUsu', index: 'Usuario', label: 'Usuario', hidden: false, width: 90 },
                    { name: 'vcNom', index: 'Empleado', label: 'Empleado', hidden: false, width: 200 },
                    { name: 'Fecha', index: 'Fecha', label: 'Fecha', hidden: false, width: 110 }
   	               ],
        emptyrecords: 'No hay resultados',
        sortname: "vcUsu", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        height: "70",
        width: 465,
        rownumbers: true,
        shrinkToFit: false,
        beforeSelectRow: function (rowid, e) {
            return false;
        }
    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });

    for (var i = 0; i < arLog.length; i++) {
        $("#grid").jqGrid('addRowData',0 , arLog[i]);
    }

});