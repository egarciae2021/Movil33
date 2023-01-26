var FiltroRegistro = 1; //1:Activo, 0: Inactivo, 2:Todos

function isIE() { //Vefiricar Version del Internet Explorer
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

$(function () {

    $('.button').button();
    $('#btnBuscar').click(function () { fnBuscarAuditoria(); });
    $('#btnExportar').click(function () { fnExportarAuditoria(); });

    $('#txtValor').live("keypress", function (e) {
        if (e.keyCode == 13) {
            fnBuscarAuditoria();
            return false; // prevent the button click from happening
        }
    });

    if (isIE() == 6) {
        $("#btnBuscar").css('width', '100px');
        $("#btnBuscar").css('display', 'inline-block');
    }

    var vcBusqueda = "";
    $("#tbGrillaCorreos").jqGrid({
        sortable: true,
        datatype: function () {
            var valor = $("#txtValor").val();
            valor = valor.replace(/'/g, "&#39").replace(/\\/g, "");
            $.ajax({
                url: "VisorAuditoria.aspx/Listar", //PageMethod
                data: "{'inPagTam':'" + $('#tbGrillaCorreos').getGridParam("rowNum") + "'," + //Tamaño de pagina
                       "'inPagAct':'" + parseInt($('#tbGrillaCorreos').getGridParam("page")) + "'," + //Pagina actual
                       "'vcOrdCol':'" + $('#tbGrillaCorreos').getGridParam("sortname") + "'," + //Nombre de columna ordenado
                       "'vcTipOrdCol':'" + $('#tbGrillaCorreos').getGridParam("sortorder") + "'," + //Tipo de orden de columna asc, desc                               
                       "'vcCam':'" + $('#ddlCampo').val() + "'," + //Campo de busqueda
                       "'vcValBus':'" + valor + "'," + //Valor de busqueda
                       "'vcTab':'" + $('#hdfvcTab').val() + "'," + //Tabla
                       "'inTipOri':'" + $('#hdfinTipOri').val() + "'," + //TipoOrigen
                       "'inFilReg':'" + FiltroRegistro + "'}", //FiltroRegistro
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    $("#tbGrillaCorreos")[0].addJSONData(result.d);
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
    colModel: columnas, //Columns
    pager: "#pagerGrillaCorreos", //Pager.
    loadtext: 'Cargando datos...',
    recordtext: "{0} - {1} de {2} elementos",
    emptyrecords: 'No hay resultados',
    pgtext: 'Pág: {0} de {1}', //Paging input control text format.
    rowNum: TamanoPagina, //"10" PageSize.
    rowList: TamanosPaginaSel, //[10, 20, 30] Variable PageSize DropDownList. 
    viewrecords: true, //Show the RecordCount in the pager.
    multiselect: false,
    sortname: idTabla, //Default SortColumn
    sortorder: "asc", //Default SortOrder.
    width: 890,
    height: 250,
    rownumbers: true,
    //caption: titulo,
    shrinkToFit: false,
    //viewsortcols: true,
    onSelectRow: function (id) {
        //alert(id);
    },
    sortable: function (permutation) {
        //var colModels = $("#grid").getGridParam("colModel");
        //alert(colModels);
    },
    //    resizeStop: function (width, index) {
    //        //alerta("resize column " + index + " to " + width + "pixels");
    //    },
    afterInsertRow: function (rowid, aData, rowelem) {
        if (aData.btEst == 'False' || aData.btEst == 'No') {
            var colModels = $("#tbGrillaCorreos").getGridParam("colModel");

            var i;
            for (i in colModels) {
                $("#tbGrillaCorreos").jqGrid('setCell', rowid, i, '', { color: '#9E0B0B' });
            }
        }
    },
    //onSortCol: function(name,index){  alerta("Column Name: "+name+" Column Index: "+index); },
    ondblClickRow: function (id) {
        $("#tbGrillaCorreos").jqGrid('resetSelection');
        $("#tbGrillaCorreos").jqGrid('setSelection', id);
        MostrarDescripcion(id);
    }
}).navGrid("#pagerGrillaCorreos", { edit: false, add: false, search: false, del: false });


$("#txtValor").focus();
$('#txtValor').live("keypress", function (e) {
    if (e.keyCode == 13) {
        //fnBuscarLogCorreo();
        fnBuscarAuditoria();
        return false; //prevent the button click from happening
    }
});

$('#ddlCampo').live("change", function (e) {
    $("#txtValor").focus();
});



});


function fnBuscarAuditoria() {
    $("#tbGrillaCorreos").trigger("reloadGrid");
}

function MostrarDescripcion(id) {

    var datos = $("#tbGrillaCorreos").jqGrid('getRowData', id);
    $("#trNoEnviado").show();
    if (datos.AUDI_vcNOMOPC == null || datos.AUDI_vcNOMOPC == '') {
        $("#lblOpcion").html("NO EXISTE");
    }
    else {
        $("#lblOpcion").html(datos.AUDI_vcNOMOPC);
    }

    var mDataAnterior = datos.AUDI_vcDATAANTE.split(",");
    var mDataDespues = datos.AUDI_vcDATADESP.split(",");
    var blExisteValor = false;
    var MensajeDestino = '';
    var MensajeAnterior = '';
    if ((datos.AUDI_vcDATAANTE.indexOf(",") >= 0) && (datos.AUDI_vcDATADESP.indexOf(",") >= 0)) {
        var x=0;
        for (x = 0; x < mDataDespues.length; x++) {
            blExisteValor = false;
            //Buscar valor en data despues...
            var y=0;
            for (y= 0; y < mDataAnterior.length; y++) {
                if ($.trim(mDataDespues[x]) == $.trim(mDataAnterior[y])) {
                    blExisteValor = true;
                    break;
                }
            }
            if (!blExisteValor) {
                MensajeDestino = MensajeDestino + "," + "<span style='background:yellow;'>" + mDataDespues[x] + "</span>";
            }
            else {
                MensajeDestino = MensajeDestino + "," + mDataDespues[x];
            }
        }
        if (MensajeDestino.length > 0) { MensajeDestino = MensajeDestino.substring(1, MensajeDestino.length); }

        var x=0;
        for (x= 0; x < mDataAnterior.length; x++) {
            blExisteValor = false;
            //Buscar valor en data despues...
            var y=0;
            for (y = 0; y < mDataDespues.length; y++) {
                if ($.trim(mDataAnterior[x]) == $.trim(mDataDespues[y])) {
                    blExisteValor = true;
                    break;
                }
            }
            if (!blExisteValor) {
                MensajeAnterior = MensajeAnterior + "," + "<span style='background:#CBE5F8;'>" + mDataAnterior[x] + "</span>";
            }
            else {
                MensajeAnterior = MensajeAnterior + "," + mDataAnterior[x];
            }
        }
        if (MensajeAnterior.length > 0) { MensajeAnterior = MensajeAnterior.substr(1, MensajeAnterior.length); }

    }
    else {
        MensajeDestino = datos.AUDI_vcDATADESP;
        MensajeAnterior = datos.AUDI_vcDATAANTE;
    }
    

    $("#lblAnterior").html(MensajeAnterior);
    $("#lblNuevo").html(MensajeDestino);

    $('#divDescripcion').dialog({
        title: "Auditoría",
        width: 480,
        modal: true,
        resizable: false
    });

}

function fnExportarAuditoria() {
    window.location.href = "../../P_Movil/Administrar/Adm_Reporte.aspx?vcTab=M_AUDI&Detalle=" + $('#ddlCampo').val() + "," + $("#txtValor").val().replace(/'/g, "&#39") + "&Valor=1&inFilReg=" + FiltroRegistro;
}
