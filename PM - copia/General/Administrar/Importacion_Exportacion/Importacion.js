$(function () {
    var CodigoPlantilla; //1:Activo, 0: Inactivo, 2:Todos
    //  var indiceTab = window.parent.tab.tabs("option", "selected");
    IniciarPagina();
    $(".btnNormal").button();

    function IniciarPagina() {
    }


    $("#btnCerrar").click(function () {
        window.parent.Modal.dialog("close");
    });


    $("#btnGuardar").live("click", function () {
        CodigoPlantilla = $("#txtPlantilla").val();
        if (CodigoPlantilla == "") {
            alerta("Debe seleccionar una plantilla");
            $("#txtPlantilla").focus();
            return;
        }
        $.ajax({
            type: "POST",
            url: "Importacion.aspx/InsertarImportacion",
            data: "{'vcTabla': '" + $("#hdftab").val() + "'}", //nombre de la tabla
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                //                    $("#grid").trigger("reloadGrid");
                if (result.d == "true")
                { alerta("funco"); }

                //                        Mensaje("<br/><h1>Se activaron los registros seleccionados</h1><br/>", document, CerroMensajeActivar);
                else
                { alerta("No funco"); }
                //                        Mensaje("<br/><h1>Se desactivaron los registros seleccionados</h1><br/>", document, CerroMensajeActivar);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });






        //        var rowIds = $('#grid').jqGrid('getDataIDs');
        //        var selectedrows = $('#grid').jqGrid('getGridParam', 'selrow');
        var selectedrows = $('#grid').jqGrid('getGridParam', 'selarrrow');
        var rowdatita = $('#grid').getRowData(selectedrows[0]);

        for (i = 1; i <= selectedrows.length; i++) {
            //            rowData = $('#gridName').jqGrid('getRowData', selectedrows[]);

            //        if(rowData['act'] //etc..checkbox check) {

            //        }//if
        }
    });
    //    cargarGrilladeImportacion();
    //    cargarGrilladeImportacion();
});
function seleccionoPlantilla() {
    if ($.trim($('#txtPlantilla').val()) != "") {
        $('#dvCargando').show();
        return true;
    }
    else {
        alerta("Debe elegir una plantilla antes de cargar el archivo.");
        return false;
    }
}

function cargarGrilladeImportacion() {
    $('#dvCargando').hide();
    var obj;
    var FiltroRegistro = 1;
    var cmodel;
    $("#grid").jqGrid({
        sortable: true,
        datatype: function () {
            $.ajax({
                url: "Importacion.aspx/Listar", //PageMethod
                data: "{'inPagTam':'" + $('#grid').getGridParam("rowNum") + "'," + //Tamaño de pagina
                       "'inPagAct':'" + parseInt($('#grid').getGridParam("page")) + "'," + //Pagina actual
                       "'rutaArchivo':'" + $('#hdfRutaArchivo').val() + "'," + //ruta del archivo a importar
                       "'codPlantilla':'" + $('#hdfCodPlantilla').val() + "'," + //Código de la plantilla
                       "'inFilReg':'" + FiltroRegistro + "'}", //FiltroRegistro
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    $("#btnEliminar").show();
                    $("#btnCargar").hide();
                    $("#grid")[0].addJSONData(result.d);
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
    colModel: columnasImportador, //Columns
    //    colModel: cmodel,
    pager: "#pager", //Pager.
    height: 250,
    width: 800,
    loadtext: 'Cargando datos...',
    recordtext: "{0} - {1} de {2} elementos",
    emptyrecords: 'No hay resultados',
    pgtext: 'Pág: {0} de {1}', //Paging input control text format.
    rowNum: 10, //"10" PageSize.
    rowList: [10, 20, 30], //[10, 20, 30] Variable PageSize DropDownList. 
    viewrecords: true, //Show the RecordCount in the pager.
    multiselect: false,
    //         sortname: idTabla, //Default SortColumn
    //         sortorder: "asc", //Default SortOrder.
    //width: $(window).width() - 100,
    //height: $(window).height() - 140,
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
        if (aData.btVig == 'False') {
            var colModels = $("#grid").getGridParam("colModel");

            var i;
            for (i in colModels) {
                $("#grid").jqGrid('setCell', rowid, i, '', { color: 'red' });
            }
        }
    },
    //onSortCol: function(name,index){  alerta("Column Name: "+name+" Column Index: "+index); },
    ondblClickRow: function (id) {
        $("#grid").jqGrid('resetSelection');
        $("#grid").jqGrid('setSelection', id);
        //             if ($("#hdfEdicion").val() == "1")
        //                 EditaRegistro(id);
    }
}).navGrid("#pager", { edit: false, add: false, search: false, del: false });
}



/*****  29/12/2015  :   RURBINA *****/
function mensajeDeError() {
    alert(mensajeErrorImportar);
}

$(function () {

    $("#txtPlantilla").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../../Common/WebService/General.asmx/ListarPlantillaFiltrada",
                data: "{'maxFilas': '" + 100 + "'," +
                               "'vcNomPlantilla': '" + $("#txtPlantilla").val() + "'," + "'inCodEntidad': '" + $("#hdfCodEnt").val() + "' ," + "'idCliente': '" + $("#hdfCodCliente").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.Nombre,
                            inCodPlant: item.IdPlantilla
                        };
                    }));
                },
                cache: false,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtPlantilla").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtPlantilla").val(ui.item.label);
            $("#hdfCodPlantilla").val(ui.item.inCodPlant);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodPlantilla").val("");
            }
            return false;
        },
        open: function (event, ui) {
            Selecciono = false;
            return false;
        }
    })
            .data("autocomplete")._renderItem = function (ul, item) {
                return $("<li></li>")
			        .data("item.autocomplete", item)
                //.append("<a>" + item.VCNOMORG + "<br>" + item.label + "</a>")
			        .append("<a>" + item.label + "</a>")
			        .appendTo(ul);
            };
});
     
