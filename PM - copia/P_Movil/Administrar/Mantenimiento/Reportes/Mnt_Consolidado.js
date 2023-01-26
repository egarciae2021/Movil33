

$(function () {


    oCulturaUsuario = window.top.oCulturaUsuario;

    $(".btnNormal").button({});

    //Inicio();
    //CargarTabs();

    ActualizarColumnasGrilla();
    CargarDisenoGrilla();
    CargarDataGrilla();
    $(window).resize(function (a, c) {
        DimPosElementos();
    });

    //CargarDisenoGrilla_GroupColumn("grid_AnalisisFyCVSCorte", ModeloColumnas_AnalisisFyCCorte, "FyC", "Cortes", "Cuenta_1", "Cuenta_2", 3, 2);

    DimPosElementos();


    $("#btnExportar").click(function () {
        JqGrid_ExportarExcel("grid_Consolidado", "Consolidado", true);
    });

    $("#btnBuscar").click(function () {
        btnBuscar_click();
    });


    $("#cboCampo").html("");
    $.each(mColumnas, function (i, item) {
        if (item == "Correlativo") return;
        $('#cboCampo').append($('<option>', {
            value: item,
            text: item
        }));
    });
    $("#txtFiltro").keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            btnBuscar_click();
        }
    });

    $("#img_buscar").html("<img src='../../../../Common/Images/Mantenimiento/buscar.png' />");
    $("#img_exportar").html("<img src='../../../../Common/Images/Mantenimiento/Excel16.png' />");

});


function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    $("#grid_Consolidado").setGridHeight(Alto - 175);
    $("#grid_Consolidado").setGridWidth(Ancho - 65);
}


var _ModeloColumnas = [];
function ActualizarColumnasGrilla() {
    _ModeloColumnas = [];
    var Alineacion = "";
    for (var i in mColumnas) {
        if (mColumnas[i] == "Correlativo") {
            _ModeloColumnas.push({ name: mColumnas[i], label: mColumnas[i], width: 0, align: "left", hidden: true });
        }
        else {

            if (mColumnas[i].toLowerCase().indexOf("fecha") >= 0)
                Alineacion = "center";
            else if ((mColumnas[i].toLowerCase().indexOf("costo") >= 0 && mColumnas[i].toLowerCase().indexOf("centro") < 0) ||
                      mColumnas[i].toLowerCase().indexOf("monto") >= 0)
                Alineacion = "right";
            else
                Alineacion = "left";


            if ((mColumnas[i].toLowerCase().indexOf("costo") >= 0 && mColumnas[i].toLowerCase().indexOf("centro") < 0) ||
                 mColumnas[i].toLowerCase().indexOf("monto") >= 0)
                _ModeloColumnas.push({
                    name: mColumnas[i], label: mColumnas[i], width: 0, align: Alineacion, formatter: function (cellval, opts, rData) {
                        var NumeroFormateado = "";
                        if (cellval == "") {
                            cellval = "0";
                        }
                        var op = $.extend({}, opts.number);
                        if (!$.fmatter.isUndefined(opts.colModel.formatoptions)) {
                            op = $.extend({}, op, opts.colModel.formatoptions);
                        }
                        if ($.fmatter.isEmpty(cellval)) {
                            NumeroFormateado = op.defaultValue;
                        }
                        else {
                            NumeroFormateado = $.fmatter.util.NumberFormat(cellval, op);
                        }
                        return NumeroFormateado;
                    }
                });
            else
                _ModeloColumnas.push({ name: mColumnas[i], label: mColumnas[i], width: 0, align: Alineacion });
        }
    }
}



function CargarDisenoGrilla() {
    $("#grid_Consolidado").jqGrid({
        sortable: false,
        loadonce: true,
        loadui: 'disable',
        datatype: "local",
        colModel: _ModeloColumnas,
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        height: "100%",
        width: "100%",
        rowList: [20, 50, 100],
        pager: '#Pager',
        viewrecords: true,
        rowNum: 9007199254740992,
        multiselect: false,
        rownumbers: true,
        shrinkToFit: false,
        autowidth: true,
        beforeSelectRow: function (rowid, e) {
            return true;
        }
    });

    $("#grid_Consolidado").jqGrid("clearGridData", true).trigger("reloadGrid");
}


var DatosGrilla = [];
function CargarDataGrilla() {
    $.ajax({
        url: "Mnt_Consolidado.aspx/ObtenerConsolidado",
        data: "{}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            DatosGrilla = result.d[0];
            CargarDataGrillaFiltro();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}


function CargarDataGrillaFiltro() {

    $("#grid_Consolidado").jqGrid("clearGridData", true);
    $("#dvCargandoPage").show();
    $("#dvPrincipal").hide();

    var grid = $("#grid_Consolidado").jqGrid();

    var iContador = 0;
    var Filtro = $.trim($("#txtFiltro").val()).toLowerCase();
    var ColumnaFiltro = $("#cboCampo").val();
    var SalirFiltro = false;
    var GrillaFiltro = [];

    var EnProceso = false;
    var tmrGrilla = setInterval(function () {
        if (EnProceso) return;
        EnProceso = true;
        if (iContador >= DatosGrilla.length) {
            clearInterval(tmrGrilla);
            ActualizarAnchoColumnas();

            $("#dvCargandoPage").hide();
            $("#dvPrincipal").show();

            return;
        }
        GrillaFiltro = [];
        for (var i = 0; i < 1000; i++) {
            if (iContador >= DatosGrilla.length) {
                break;
            }
            SalirFiltro = false;
            for (var j = 0; j < mColumnas.length; j++) {
                if (Filtro != "") {
                    if (ColumnaFiltro == mColumnas[j]) {
                        if (DatosGrilla[iContador][mColumnas[j]].toLowerCase().indexOf(Filtro) < 0) {
                            SalirFiltro = true;
                            break;
                        }
                    }
                }
                if (DatosGrilla[iContador][mColumnas[j]].length > _ModeloColumnas[j].width) {
                    _ModeloColumnas[j].width = DatosGrilla[iContador][mColumnas[j]].length;
                }
            }
            if (!SalirFiltro) {
                GrillaFiltro.push(DatosGrilla[iContador]);
            }
            iContador++;
        }
        if (GrillaFiltro.length > 0) {
            grid.addRowData("Correlativo", GrillaFiltro, "last");
        }

        $(".ui-pg-selbox").change();
        //$(".ui-pg-input").change();
        EnProceso = false;
    }, 1);

}

function ActualizarAnchoColumnas() {
    for (var j = 0; j < mColumnas.length; j++) {
        //$("#grid_Consolidado").jqGrid('setLabel', _ModeloColumnas[j].name, _ModeloColumnas[j].name + "_" + (_ModeloColumnas[j].width));
        if (_ModeloColumnas[j].width < 100) {
            $("#grid_Consolidado").jqGrid("setColWidth", j + 1, _ModeloColumnas[j].width * 7.5);
        }
        else {
            $("#grid_Consolidado").jqGrid("setColWidth", j + 1, _ModeloColumnas[j].width * 4);
        }
    }
    var Ancho = $(window).width();
    $("#grid_Consolidado").setGridWidth(Ancho - 65);
}


$.jgrid.extend({
    setColWidth: function (iCol, newWidth, adjustGridWidth) {
        return this.each(function () {
            var $self = $(this), grid = this.grid, p = this.p, colName, colModel = p.colModel, i, nCol;
            if (typeof iCol === "string") {
                // the first parametrer is column name instead of index
                colName = iCol;
                for (i = 0, nCol = colModel.length; i < nCol; i++) {
                    if (colModel[i].name === colName) {
                        iCol = i;
                        break;
                    }
                }
                if (i >= nCol) {
                    return; // error: non-existing column name specified as the first parameter
                }
            } else if (typeof iCol !== "number") {
                return; // error: wrong parameters
            }
            grid.resizing = { idx: iCol };
            grid.headers[iCol].newWidth = newWidth;
            grid.newWidth = p.tblwidth + newWidth - grid.headers[iCol].width;
            grid.dragEnd();   // adjust column width
            if (adjustGridWidth !== false) {
                $self.jqGrid("setGridWidth", grid.newWidth, false); // adjust grid width too
            }
        });
    }
});


function btnBuscar_click() {
    CargarDataGrillaFiltro();
}