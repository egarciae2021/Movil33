var tab;
var MargenFiltro = 0;
var MargenHeight = 48;

var oCultura;
var indiceTab;
var operador;
var vcPeriodo;
var inAltGrid;

$(function() {
    kendo.culture("es-PE");

    indiceTab = window.parent.tabschild.tabs("option", "selected");
    oCultura = window.parent.parent.oCulturaUsuario;

    inicioPagina();
    function inicioPagina() {
        
        $("#btnExportar").button("option", "disabled", true);
        $("#btnExportar").attr("title", "No hay datos para mostrar");

        if (!validar) {
            $("#btnGenerar").button("option", "disabled", true);
            $("#dvNoGenerar").show();
        } else {
            $("#dvNoGenerar").hide();
        }
    }

    function NumeroInicialFilas() {
        var nuAltoFila = 23.04;
        inFilas = Math.floor(inAltGrid / nuAltoFila);
    }

    $(window).resize(function () {
        DimPosElementos();
        NumeroInicialFilas();
    });
    
    $(".bordeui").removeClass("ui-corner-all");
    $(".bordeui").css({
        "border": "none",
        "padding": "0px"
    });

    //****Valores iniciales para rango de fecha
    var date = new Date();
    var fechainicio = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var cPeriodo = $("#txtPeriodo").kendoDatePicker({
        culture: "es-PE",
        start: "year",
        depth: "year",
//        value: fechainicio,
        format: "MM/yyyy",
        footer: false
    }).data("kendoDatePicker");
    
    cargarFecha();
    function cargarFecha() {
        vcPeriodo = $("#txtPeriodo").val();
        $("#hdfPeriodo").val(vcPeriodo);
    }

    $("#txtPeriodo").change(function() {
        vcPeriodo = this.value;
        $("#hdfPeriodo").val(vcPeriodo);
        $("#grid").jqGrid("clearGridData");
    });

    $("#dwOperador").change(function() {
        operador = $("#dwOperador option:selected").text();

    });

    $("#btnBuscar").click(function() {

        $("#grid").GridUnload();
        $("#grid").jqGrid({
            datatype: function() {
                var Buscar_Data = {
                    inPagTam: $('#grid').getGridParam("rowNum"),
                    inPagAct: $('#grid').getGridParam("page"),
                    vcOrdCol: $('#grid').getGridParam("sortname"),
                    vcTipOrdCol: $('#grid').getGridParam("sortorder"),
                    p_periodo: $("#txtPeriodo").val(),
                    p_estado: $("#dwEstado").val(),
                    p_idOperador: $("#dwOperador").val(),
                    p_tipoProducto: $("#dwTipoProducto").val()
//                    ,p_tipoLinea:1
                }

                $.ajax({
                    type: "POST",
                    url: "Comp_Adm_EmisionComprobante.aspx/Buscar",
                    data: JSON.stringify(Buscar_Data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(result) {

                        if ($(result.d).length > 0) {
                            $("#grid")[0].addJSONData(result.d);
                            $("#btnExportar").show();
//                            $("#btnGenerar").button("option", "disabled", false);
                            $("#btnExportar").button("option", "disabled", false);
                            $("#btnExportar").attr("title", "Exportar a Excel");
                        } else {
                            $("#btnGenerar").button("option", "disabled", true);
                            $("#btnExportar").button("option", "disabled", true);
                            Mensaje("<br/><h1>No existe datos para el periodo " + $("#txtPeriodo").val() + " y/u <br/> operador seleccionado(s).</h1>", document, null);
                        }

                    },
                    error: function(xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            mtype: 'POST',
            colNames: ['id', 'Periodo', 'Cobro Operador', 'Cobro Plan Familia', 'Diferencia', 'No Emitidos', 'Estado', 'Sin líneas asociadas'],
            colModel: [
                { name: 'id', index: 'id', width: 10, hidden: true, key: true },
                { name: 'periodo', index: 'periodo', width: 80, formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'm/Y' }, align: 'center' },
                { name: 'montoOperador', index: 'montoOperador', width: 110, align: 'right', formatter: 'currency', formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 } },
                {
                    name: 'montoFamilia',
                    index: 'montoFamilia',
                    width: 110,
                    align: 'right',
                    formatter: function(value, options, rData) {
                        return "<a href='#' title='ver Detalle de: " + rData[1].substring(3, 10) + "' name='" + value + "' id='" + rData[0] +
                            "' onclick='Detalle_Cronograma(this.id);' style='height:22px; color:#08088A;'>" + value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "</a>";
                    }
                },
                { name: 'diferencia', index: 'diferencia', width: 110, align: 'right', formatter: 'currency', formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 } },
                { name: 'inNoEmitidos', index: 'inNoEmitidos', width: 80, align: 'center' },
                { name: 'estado', index: 'estado', width: 100, align: 'center'},
                { name: 'inSinLinea', index: 'inSinLinea', width: 120, align: 'center'}
            ],
            pager: "pager",
            rowNum: 6,
            rowList: [6, 12, 24],
            viewrecords: true,
            hidegrid: false,
            gridview: true,
            rownumbers: true,
            shrinkToFit: false,
            multiselect: true,
            multiboxonly: true,
            sortable: true,
            //height: '150',
            //width: '850',
            height: $(window).height() - 290,
            width: $(window).width() - 80,
            loadtext: 'Cargando datos...',
            recordtext: "{0} - {1} de {2} elementos",
            emptyrecords: 'No hay resultados',
            pgtext: 'Pág: {0} de {1}',
//            caption: "Información de cobros para el periodo " + $("#txtPeriodo").val(),
            jsonReader: {
                root: "Items",
                page: "PaginaActual",
                total: "TotalPaginas",
                records: "TotalRegistros",
                repeatitems: true,
                cell: "Row"
//                id: "periodo"
            },
            beforeSelectRow: function (rowId, e) {

               var vcSel = $("#grid").jqGrid('getGridParam', 'selarrrow');
               
               
               if (vcSel.length == 1) {
                   if (vcSel[0] == rowId) {
                       //return true; //Deselecciona la fila
                       }
                   else {
                       $("#grid").jqGrid('resetSelection');
                      // return true; //Selecciona más de una fila = false
                   }
               } else if (vcSel.length == 0) {
                   //return true; //Selecciona una fila = true
               }



                var data = $('#grid').jqGrid('getRowData', rowId);
                if (data.inNoEmitidos != 0) {
                    return true;
                } else {
                    return false;
                }
            },
            gridComplete: function() {
                $("#cb_grid").hide();

                var grid = $("#grid").getDataIDs();
                for (var i = 0; i < grid.length; i++) {
                    var data = $('#grid').jqGrid('getRowData', grid[i]);
                    if (data.inNoEmitidos == 0) {
                        $("#jqg_grid_" + (i + 1)).hide();
                    }
                }


            }
        }).navGrid("#pager", { edit: false, add: false, search: false, del: false });
    });

    $("#btnLimpiar").click(function() {
        LimpiarControles();
    });

    $("#btnGenerar").click(function() {

        var p_periodo;
        var p_estado = $("#dwEstado").val();
        var p_idOperador = $("#dwOperador").val();
        var p_tipoProducto = $("#dwTipoProducto").val();
        
        var ids = $("#grid").jqGrid('getGridParam', 'selarrrow');
        var lstGenerar = [];
        for (var i = 0; i < ids.length; i++) {
            var data = $("#grid").jqGrid('getRowData', ids[i]);
            var oComprobante = new ENT_MOV_FAC_Comprobante();
            oComprobante.Periodo = data.periodo.substring(3) + "/" + data.periodo.substring(0, 2) + "/01";
            oComprobante.Periodo1 = data.periodo.substring(3) + data.periodo.substring(0, 2);
            lstGenerar.push(oComprobante);
        }
        if (lstGenerar.length == 0) {
            alerta("No ha seleccionado ninguna fila para generar");
            return;
        } else {

            var dtGrid = $("#grid").jqGrid('getRowData', ids);
            p_periodo = dtGrid.periodo.substring(3) + "" + dtGrid.periodo.substring(0, 2) + "01";
            $("#hdfPeriodo").val(p_periodo);

            $('#divGenerar').dialog({
                title: "Generar Comprobantes",
                modal: true,
                buttons: {
                    "Si": function() {
                        $.ajax({
                            type: "POST",
                            url: "Comp_Adm_EmisionComprobante.aspx/Generar",
                            data: "{'p_periodo':'" + p_periodo + "', 'p_estado':'" + p_estado + "', 'p_idOperador':'" + p_idOperador + "', 'p_tipoProducto':'" + p_tipoProducto + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function(result) {

                                if (result.d > 0) {
                                    Mensaje("<br/><h1>Comprobantes generados para el periodo " + p_periodo + ".</h1>", document, null);
                                    LimpiarControles();
                                    $("#TabDetalle").tabs('remove', 1);
                                } else if (result.d == 0) {
                                    alerta("No existe comprobantes a generar");
                                    $("#grid").jqGrid("clearGridData");
                                } else if (result.d == -1) {
                                    alerta("No se encontró comprobantes a generar, debido a que no existen registros de la facturación del operador");
                                } else if (result.d == -2) {
                                    alerta("Debe verificar la configuración de comprobantes");
                                    LimpiarControles();
                                } else if (result.d == -3) {
                                    alerta("Existen registros sin el N° de Doc. de Identidad (DNI) del Empleado. Debe actualizar el campo para la generación de comprobantes.");
                                    LimpiarControles();
                                } else if (result.d == -4) {
                                    alerta("Existen registros sin el N° de Cuenta del Empleado. Debe actualizar el campo para la generación de comprobantes.");
                                    LimpiarControles();
                                } else if (result.d == -5) {
                                    alerta("Usuario sin permisos para generar comprobantes.");
                                    LimpiarControles();
                                }
                            },
                            error: function(xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
    });

    $("#TabDetalle span.ui-icon-close").live("click", function () {
        var index = $("li", tab).index($(this).parent());
        tab.tabs("remove", index);
    });

    tab = $("#TabDetalle").tabs({
        tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remover Tab</span></li>",
        //fx: { height: 'toggle', duration: 800 },
        add: function (event, ui) {
            var ifra = document.createElement('IFRAME');
            ifra.width = "100%";
            ifra.height = $(window).height() - 87;//75
            ifra.setAttribute("margin-top", "0px");
            ifra.setAttribute("margin-left", "0px");
            ifra.setAttribute("margin-bottom", "0px");
            ifra.setAttribute("margin-right", "0px");
            ifra.setAttribute("padding-top", "0px");
            ifra.setAttribute("padding-left", "0px");
            ifra.setAttribute("padding-bottom", "0px");
            ifra.setAttribute("padding-right", "0px");

            ifra.src = pagina;
            ifra.frameBorder = "0";
            ifra.className = "ifContenido";
//                        $('#' + ui.panel.id).css({ "margin-left": "-13px", "margin-right": "-10px", "margin-top": "-8px" });
//            $('#' + ui.panel.id).css({ "margin-left": "-13px", "margin-top": "-8px"});
            $(ui.panel).append(ifra);
            $(this).tabs('select', '#' + ui.panel.id);
            pagina = "";
        }
    });
    
    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        var AnchoLateral = $(".LateralSplitter");

        //var x = $('#tbGeneral').width();
        //var y = $(window).width() - 31;

        $(".tabs").css({ height: Alto - 25, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });

//        $(".ifContenido").css({ height: Alto - 81, width: Ancho - 25 });
        $(".Splitter").css({ height: Alto - 40 });
        $(".tabDetalle").css({ height: Alto - 81, width: Ancho - 200 });
        inAltGrid = $(window).height() - 265 - MargenFiltro * MargenHeight;

        $("#grid").setGridWidth($("#TabDetalle").width() - 53);
        $("#grid").setGridHeight($(window).height() - 285);
    }

    $("#dwOperador").change(function () {
        $("#hdfOperador").val(this.value);
        $("#btnBuscar").click();
    });

    $("#dwEstado").change(function () {
        $("#hdfEstado").val(this.value);
        $("#btnBuscar").click();
    });

    $("#dwTipoProducto").change(function () {
        $("#hdfTipoProducto").val(this.value);
        $("#btnBuscar").click();
    });

    $("#dwTipoLinea").change(function () {
        $("#hdfTipoLinea").val(this.value);
    });

    $("#btnExportar").button();
    $("#btnExportar").click(function () {
        tipoRep = 'RepComprobante';
        ExportarExcel();
    });

    function ExportarExcel() {
        vcPeriodo = $("#txtPeriodo").val();
        var inMeses = $("#grid").getRowData().length;
        if (vcPeriodo != "") {
            vcPeriodo = vcPeriodo.substring(3, 7) + vcPeriodo.substring(0, 2) + "01";
        }
        var cadena = "&vcPeriodo=" + vcPeriodo + "&vcOpe=" + $("#dwOperador").val() + "&inEst=" + $("#dwEstado").val() + "&inTipProd=" + $("#dwTipoProducto").val() + "&inMeses=" + inMeses;
        pagina = "../../Administrar/Adm_Reporte.aspx?Tipo=" + tipoRep + cadena;
        $("#ifExcel").attr("src", pagina);
    }
    
    $("#btnBuscar").click();
    DimPosElementos();
    //    TamanioGrilla();
    
});

function LimpiarControles() {
    $("#grid").jqGrid("clearGridData");
    $("#dwEstado").val(-1);
    $("#dwOperador").val(-1);
    $("#dwTipoProducto").val(-1);
    $("#txtPeriodo").val("");

    $("#btnBuscar").click();
}

function Detalle_Cronograma(id) {
  
    var rowData = $("#grid").getRowData(id);
    
//    var datos = $("#grid").jqGrid('getRowData', id);
    if (id) {

        var idEstado;
        if (rowData.estado == 'CONFORME') {
            idEstado = 1;
        }else if (rowData.estado == 'NO CONFORME') {
            idEstado = 2;
        }
        var nombrTab = "Periodo " + rowData.periodo;
        $("#TabDetalle").tabs('remove', 1);
        pagina = "Comp_Adm_EmisionComprobanteDetalle.aspx?vcPeriodo=" + rowData.periodo + "&idOper=" + $("#dwOperador").val() + "&est=" + idEstado + "&idTipLin=" + 2 + "&idTipProd=" + $("#dwTipoProducto").val();

        var $panel = tab.find(id);
            if (!$panel.length) {//En el caso que no exista el tab, lo crea
                tab.tabs("add", id, nombrTab);
                $(id).css("width", "99%");
                $(id).css("height", "92%");
                $(id).css("margin-top", "0px");
                $(id).css("margin-left", "0px");
                $(id).css("margin-bottom", "0px");
                $(id).css("margin-right", "0px");
                $(id).css("padding-top", "0px");
                $(id).css("padding-left", "0px");
                $(id).css("padding-bottom", "0px");
                $(id).css("padding-right", "0px");
                $(id).addClass("tabDetalle");
            }
            else {//En el caso que exista lo muestra
                tab.tabs('select', id);
            }

    } else {
        alerta("Seleccione un registro");
    }
}