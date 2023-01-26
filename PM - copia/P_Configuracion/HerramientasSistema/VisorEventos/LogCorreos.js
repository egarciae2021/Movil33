var inAltGrid;
var inFilas;
var MargenHeight = 48;

var FiltroRegistro = 1; //1:Activo, 0: Inactivo, 2:Todos

function isIE() { //Vefiricar Version del Internet Explorer
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

$(function () {
    //debugger;
    inicializarDiseno();
    $('.button').button();
    $('#btnBuscar').click(function () { fnBuscarLogCorreo(); });
    $('#btnExportar').click(function () { fnExportar(); });

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
                url: "LogCorreos.aspx/Listar", //PageMethod
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
    //rowList: TamanosPaginaSel, //[10, 20, 30] Variable PageSize DropDownList. 
    viewrecords: true, //Show the RecordCount in the pager.
    multiselect: false,
    sortname: idTabla, //Default SortColumn
    sortorder: "desc", //Default SortOrder.
    width: 890,
    //height: 250,
    rowNum: inFilas,
    rownumbers: true,
    //caption: titulo,
    shrinkToFit: false,
    //viewsortcols: true,
    onSelectRow: function (id) {
        //alert(id);
    },
    sortable: function (permutation) {
        var colModels = $("#grid").getGridParam("colModel");
        alert(colModels);
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
    },
    gridComplete: function () {
        inicializarDiseno();
    }
}).navGrid("#pagerGrillaCorreos", { edit: false, add: false, search: false, del: false });


$("#txtValor").focus();
$('#txtValor').live("keypress", function (e) {
    if (e.keyCode == 13) {
        fnBuscarLogCorreo();
        return false; // prevent the button click from happening
    }
});

$('#ddlCampo').live("change", function (e) {
    $("#txtValor").focus();
});
});


function fnBuscarLogCorreo() {
    $("#tbGrillaCorreos").trigger("reloadGrid");
}

function MostrarDescripcion(id) {

    var datos = $("#tbGrillaCorreos").jqGrid('getRowData', id);
    if (datos.btEst == 'False' || datos.btEst == 'No' ) {
        $("#trNoEnviado").show();
        //$("#lblDetalle").html(datos.vcDesErr);
        $("#lblDetalle").html("");
    }
    else {
        $("#trNoEnviado").hide();
        $("#lblDetalle").html('');
    }
    $("#lblMensaje").html(datos.vcMen);

    $('#divDescripcion').dialog({
        title: "Log Correos",
        width: 900,
        height: 400,
        modal: true,
        resizable: false
    });

}

function fnExportar() {
    window.location.href = "../../../P_Movil/Administrar/Adm_Reporte.aspx?vcTab=vw_PCS_MOV_Cola&Detalle=" + $('#ddlCampo').val() + "," + $("#txtValor").val().replace(/'/g, "&#39") + "&Valor=1&inFilReg=" + FiltroRegistro;
}



//Redimencionar grilla
function NumeroInicialFilas() {
    var nuAltoFila = 23.04;
    inFilas = Math.floor(inAltGrid / nuAltoFila);
}

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    var AnchoLateral = $(".LateralSplitter");
    $(".tabs").css({ height: Alto - 23, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });

    //$(".Splitter").css({ height: Alto - 18 });
    inAltGrid = $(window).height() - 180;
    //$("#tbGrillaLog").setGridWidth($(window).width() - 31);
    $("#tbGrillaCorreos").setGridHeight(inAltGrid);
}

function inicializarDiseno() {
    DimPosElementos();
    NumeroInicialFilas();
}