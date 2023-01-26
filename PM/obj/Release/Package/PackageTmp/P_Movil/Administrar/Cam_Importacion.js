
function CargarNombreArchivo(Archivo, RutaCompleta) {
    $("#lblRutaContrato").html(Archivo);
    var Metodo = "Cam_Importacion.aspx/CargarArchivo";
    var Data = {
        rutaArchivo: RutaCompleta,
        IdCampana: $("#hdfCampana").val(),
        TipoImportacion: $("#hdfTipoImportacion").val()
    };
    MetodoWeb(Metodo, JSON.stringify(Data), fncSatisfactoria, fncError);
}

function fncSatisfactoria(colMod) {
    $("#tbResultado").jqGrid({
        datatype: CargarDatos,
        colModel: colMod,
        shrinkToFit: false,
        height: 300,
        width: 900,
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
        pager: "#pagerResultado", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: "10", // PageSize.
        rowList: [10, 25, 50], //Variable PageSize DropDownList. 
        viewrecords: true, //Show the RecordCount in the pager.
        multiselect: false,
        afterInsertRow: function (rowid, aData, rowelem) {
            if (aData.Observaciones != '') {
                var colModels = $("#tbResultado").getGridParam("colModel");

                for (i in colModels) {
                    $("#tbResultado").jqGrid('setCell', rowid, i, '', { 'background-color': '#FF7070' });
                }
            }
        }
    }).navGrid("#pagerResultado", { edit: false, add: false, search: false, del: false });
}

function CargarDatos() {
    $.ajax({
        url: "Cam_Importacion.aspx/ListarData", //PageMethod
        data: "{'inPagTam':'" + $("#tbResultado").getGridParam("rowNum") + "'," + //Tamaño de pagina
                       "'inPagAct':'" + parseInt($("#tbResultado").getGridParam("page")) + "'}", //codint2
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            $("#tbResultado")[0].addJSONData(result.d);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}
function fncError() {
    alerta("Hubo un problema al cargar el archivo");
}
$(function () {
    $("input:checkbox,input:radio,input:file").uniform();
});
    