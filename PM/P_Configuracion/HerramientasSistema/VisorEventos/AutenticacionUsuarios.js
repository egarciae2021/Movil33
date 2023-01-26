var inAltGrid;
var inFilas;
var MargenHeight = 48;

var FiltroRegistro = 1; //1:Activo, 0: Inactivo, 2:Todos

$(function () {
    inicializarDiseno();
    $('.button').button();
    $('#btnBuscar').click(function () { fnBuscarAutenticacionUsuarios(); });

    ValidarNumeroEnCajaTexto("txtCantidad", ValidarSoloNumero);

    var vcBusqueda = "";
    $("#tbGrillaUsuarios").jqGrid({
        sortable: true,
        datatype: function () {
            $.ajax({
                url: "AutenticacionUsuarios.aspx/Listar", //PageMethod
                data: "{'inPagTam':'" + $('#tbGrillaUsuarios').getGridParam("rowNum") + "'," + //Tamaño de pagina
                       "'inPagAct':'" + parseInt($('#tbGrillaUsuarios').getGridParam("page")) + "'," + //Pagina actual
                       "'vcOrdCol':'" + $('#tbGrillaUsuarios').getGridParam("sortname") + "'," +
                       "'vcTipOrdCol':'" + $('#tbGrillaUsuarios').getGridParam("sortorder") + "'," +
                       "'vcCan':'" + $('#txtCantidad').val() + "'," + //Cantidad a buscar
                       "'vcCanTip':'" + $("#ddlTipo").val() + "'," + //Tipo de Cantidad a buscar
                       "'inTipOri':'" + $('#hdfinTipOri').val() + "'}", //FiltroRegistro
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    $("#tbGrillaUsuarios")[0].addJSONData(result.d);
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
    pager: "#pagerGrillaUsuarios", //Pager.
    loadtext: 'Cargando datos...',
    recordtext: "{0} - {1} de {2} elementos",
    emptyrecords: 'No hay resultados',
    pgtext: 'Pág: {0} de {1}', //Paging input control text format.
    rowNum: TamanoPagina, //"10" PageSize.
    //rowList: TamanosPaginaSel, //[10, 20, 30] Variable PageSize DropDownList. 
    viewrecords: true, //Show the RecordCount in the pager.
    multiselect: false,
    sortname: idTabla, //Default SortColumn
    sortorder: "asc", //Default SortOrder.
    width: 665,
    //height: 250,
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
    resizeStop: function (width, index) {
        //alerta("resize column " + index + " to " + width + "pixels");
    },
    afterInsertRow: function (rowid, aData, rowelem) {
//        if (aData.btEst == 'False' || aData.btEst == 'No') {
//            var colModels = $("#tbGrillaUsuarios").getGridParam("colModel");

//            for (var i in colModels) {
//                $("#tbGrillaUsuarios").jqGrid('setCell', rowid, i, '', { color: '#9E0B0B' });
//            }
//        }
    },
    //onSortCol: function(name,index){  alerta("Column Name: "+name+" Column Index: "+index); },
    ondblClickRow: function (id) {
        $("#tbGrillaUsuarios").jqGrid('resetSelection');
        $("#tbGrillaUsuarios").jqGrid('setSelection', id);
        //MostrarDescripcion(id);
    },
    gridComplete: function () {
        inicializarDiseno();
    }
}).navGrid("#pagerGrillaUsuarios", { edit: false, add: false, search: false, del: false });


$("#txtCantidad").focus();
$('#txtCantidad').live("keydown", function (e) {
    if (e.keyCode == 13) {
        fnBuscarAutenticacionUsuarios();
        return false; // prevent the button click from happening
    }
});

$('#ddlTipo').live("change", function (e) {
    $("#txtCantidad").focus();
});
});

function fnBuscarAutenticacionUsuarios() {
    $("#tbGrillaUsuarios").trigger("reloadGrid");
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
    inAltGrid = $(window).height() - 160;
    //$("#tbGrillaLog").setGridWidth($(window).width() - 31);
    $("#tbGrillaUsuarios").setGridHeight(inAltGrid);
}

function inicializarDiseno() {
    DimPosElementos();
    NumeroInicialFilas();
}