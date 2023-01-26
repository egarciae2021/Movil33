var inAltGrid;
var inFilas;
var MargenHeight = 48;

var FiltroRegistro = 1; //1:Activo, 0: Inactivo, 2:Todos
function isIE() { //Vefiricar Version del Internet Explorer
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

$(function () {
    $('.button').button();

    $('#btnBuscar').click(function () { fnBuscarLog(); });
    $('#btnBorrarLog').click(function () { fnBorrarLog(); });

    $("#eegLogErrores_btnExportarExcel").click(function () {
        alerta("Sólo podrá exportar 1,000 registros como máximo");
    });

    if (isIE() == 6) {
        $("#btnBuscar").css('width', '100px');
        $("#btnBuscar").css('float', 'left');
        $("#btnBorrarLog").css('width', '110px');
        $("#btnBorrarLog").css('display', 'right');
    }

    $(window).resize(function () {
        DimPosElementos();
        NumeroInicialFilas();
    });

    $("#cboTipoLog").change(function () {
        fnBuscarLog();
    });

    var vcBusqueda = "";
    $("#tbGrillaLog").jqGrid({
        sortable: true,
        datatype: function () {

            var valor = $("#txtValor").val();
            valor = valor.replace(/'/g, "&#39").replace(/\\/g, "");
            //$("#tbGrillaLog").jqGrid('clearGridData');
            $.ajax({
                url: "LogErrores.aspx/Listar", //PageMethod
                data: "{'inPagTam':'" + $('#tbGrillaLog').getGridParam("rowNum") + "'," + //Tamaño de pagina
                       "'inPagAct':'" + parseInt($('#tbGrillaLog').getGridParam("page")) + "'," + //Pagina actual
                       "'vcOrdCol':'" + $('#tbGrillaLog').getGridParam("sortname") + "'," + //Nombre de columna ordenado
                       "'vcTipOrdCol':'" + $('#tbGrillaLog').getGridParam("sortorder") + "'," + //Tipo de orden de columna asc, desc                               
                       "'vcCam':'" + $('#ddlCampo').val() + "'," + //Campo de busqueda
                       "'vcValBus':'" + valor + "'," + //Valor de busqueda
                       "'vcTab':'" + $('#hdfvcTab').val() + "'," + //Tabla
                       "'inTipOri':'" + $('#hdfinTipOri').val() + "'," + //TipoOrigen
                       "'TipoLog':'" + $('#cboTipoLog').val() + "'," + //TipoOrigen
                       "'inFilReg':'" + FiltroRegistro + "'}", //FiltroRegistro
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result.d != null) {
                        $("#tbGrillaLog")[0].addJSONData(result.d);
                    }
                    else {
                        $("#tbGrillaLog").jqGrid('clearGridData');
                    }
                },
                error: function (xhr, err, thrErr) {
                    //alert('3');
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
        //colModel: columnas, //Columns
        colModel: [
                    { name: 'Id', index: 'Id', label: '', width: 60, hidden: true },
                    { name: 'IdCliente', index: 'IdCliente', label: '', width: 60, hidden: true },
                    { name: 'Usuario', index: 'Usuario', label: 'Usuario', width: 80, sortable: true },
                    { name: 'IPCliente', index: 'IPCliente', label: 'IPCliente', width: 60, hidden: true },
                    { name: 'Nivel', index: 'Nivel', label: 'Nivel', width: 70, hidden: false, sortable: true },
                    { name: 'FechaHora', index: 'FechaHora', label: 'FechaHora', width: 35, sortable: false, hidden: true },
                    { name: 'FechaHoraString', index: 'FechaHoraString', label: 'Fecha Hora', width: 100, sortable: true },
                    { name: 'Aplicativo', index: 'Aplicativo', label: 'Aplicativo', width: 120, sortable: true },
                    { name: 'Equipo', index: 'Equipo', label: 'Equipo', width: 120, sortable: false },
                    { name: 'Gravedad', index: 'Gravedad', label: 'Gravedad', width: 70, sortable: true },
                    { name: 'Categoria', index: 'Categoria', label: 'Categoría', width: 70, hidden: false, sortable: true },
                    { name: 'Codigo', index: 'Codigo', label: 'Código', width: 150, hidden: true },
                    { name: 'Mensaje', index: 'Mensaje', label: 'Mensaje', width: 180, hidden: false, sortable: false },
                    { name: 'Detalle', index: 'Detalle', label: 'Detalle', width: 150, hidden: true }
        ],
        pager: "#pagerGrillaLog", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos  (<b>Presione doble clic para visualizar el Detalle</b>)",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        //rowNum: TamanoPagina, //"10" PageSize.
        //rowList: TamanosPaginaSel, //[10, 20, 30] Variable PageSize DropDownList. 
        viewrecords: true, //Show the RecordCount in the pager.
        multiselect: false,
        //sortname: "fechahora", //Default SortColumn
        sortorder: "desc", //Default SortOrder.
        rowNum: inFilas,
        width: 890,
        //height: 250,
        rownumbers: true,
        //caption: titulo,
        shrinkToFit: true,
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
            if (aData.btEst == 'False' || aData.btEst == 'No') {
                var colModels = $("#tbGrillaLog").getGridParam("colModel");

                var i;
                for (i in colModels) {
                    $("#tbGrillaLog").jqGrid('setCell', rowid, i, '', { color: '#9E0B0B' });
                }
            }
        },
        //onSortCol: function(name,index){  alerta("Column Name: "+name+" Column Index: "+index); },
        ondblClickRow: function (id) {
            $("#tbGrillaLog").jqGrid('resetSelection');
            $("#tbGrillaLog").jqGrid('setSelection', id);
            MostrarDescripcion(id);
        },
        gridComplete: function () {
            inicializarDiseno();
        }
    }).navGrid("#pagerGrillaLog", { edit: false, add: false, search: false, del: false });

    $("#txtValor").focus();
    $('#txtValor').live("keypress", function (e) {
        if (e.keyCode == 13) {
            fnBuscarLog();
            return false; // prevent the button click from happening
        }
    });

    $('#ddlCampo').live("change", function (e) {
        $("#txtValor").focus();
    });

    inicializarDiseno();

});

function fnBuscarLog() {
    $("#tbGrillaLog").trigger("reloadGrid");
}

function MostrarDescripcion(id) {
    var datos = $("#tbGrillaLog").jqGrid('getRowData', id);
    $("#trNoEnviado").show();

    var MensajeDetalle = "";
    MensajeDetalle += "<b>Código:</b><br>" + (datos.Codigo == "" ? "No identificado" : datos.Codigo) + "<br><hr>";
    MensajeDetalle += "<b>Mensaje:</b><br>" + datos.Mensaje + "<br><hr>";
    MensajeDetalle += "<b>Detalle:</b><br>" + datos.Detalle + "<br><hr>";
    $("#lblDetalle").html(MensajeDetalle);
    $('#divDescripcion').dialog({
        title: "Log Central",
        width: 780,
        modal: true,
        resizable: false
    });
}

function fnBorrarLog() {
    confirmacion("¿Desea continuar con la eliminación de todo el log?", fnBorrarLog_SI, null, "Confirmación");
}

function fnBorrarLog_SI() {

    var valor = $("#txtValor").val();
    valor = valor.replace(/'/g, "&#39").replace(/\\/g, "");

    $.ajax({
        url: "LogErrores.aspx/EliminarLog", //PageMethod
        data: "{'TipoLog':'" + $('#cboTipoLog').val() + "','vcValBus':'" + valor + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            fnBuscarLog();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
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
    inAltGrid = $(window).height() - 160;
    $("#tbGrillaLog").setGridWidth(Ancho - 31);
    $("#tbGrillaLog").setGridHeight(inAltGrid);
}

function inicializarDiseno() {
    DimPosElementos();
    NumeroInicialFilas();
}