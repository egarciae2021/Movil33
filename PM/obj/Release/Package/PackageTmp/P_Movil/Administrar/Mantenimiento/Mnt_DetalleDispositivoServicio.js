$(function () {
    $("#ddl_picTipMod").prop('disabled', true);
    var titutlogrilla = '';
    if ($("#hdfServ").val() == 'amp') {
        titutlogrilla = 'Seleccione un servicio';
    } else {
        titutlogrilla = 'Servicios';
    }


    $("#tblServicio").jqGrid({
        datatype: "local",
        colModel: [{ name: 'P_inCod', index: 'P_inCod', label: 'Codigo', width: 0, hidden: true },
   		                           { name: 'inCodTipDat', index: 'inCodTipDat', label: 'Tipo', width: 0, hidden: true },
   		                           { name: 'vcNom', index: 'vcNom', label: 'Servicio', width: 173 },
   		                           { name: 'dcCan', index: 'dcCan', label: 'Cantidad', width: 70, align: "right", sorttype: "float",
   		                               formatter: function (value, options, rData) { if (value == '0') { return 'Ilimitado'; } else { return value; } }
   		                           }
   	                              ],
        sortname: "P_inCod", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "300",
        height: "112",
        rownumbers: true,
        caption: titutlogrilla,
        shrinkToFit: false,
        forcefit: true,
        onSelectRow: function () { ServSelect(); }
    });

    if ($("#hdfServicio").val() != "") {
        var servicios = JSON.parse($("#hdfServicio").val());
        $(servicios).each(function () {
            $("#tblServicio").jqGrid('addRowData', this.P_inCod, { id: this.P_inCod, 'P_inCod': this.P_inCod, 'inCodTipDat': this.inCodTipDat, 'vcNom': this.vcNom, 'dcCan': this.dcCan });
        });
    }
});

        function ServSelect() {
            var row = $("#tblServicio").jqGrid('getGridParam', 'selrow');
            var datos = $("#tblServicio").jqGrid('getRowData', row);
            var servsel = datos['P_inCod'] + "," + datos['vcNom'] + "," + datos['dcCan'];
            window.parent.ServSelect(servsel);
        }
            