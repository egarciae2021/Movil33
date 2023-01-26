var ArrayPaginacion = [];
var inFilas;
var BuscarporLinea = "";
var nuAltoFila = 26.4;
var MargenFiltro = 0;
var MargenHeight = 48;
var inAltGrid;
var cantSinLinea;
var lstMarcados = [];
var buscar = false;

$(function () {

    $("#hdfPagina").val("");

    if ($("#txtEmpleado").length > 0) {
        $("#txtEmpleado").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    url: "../../Administrar/Adm_NuevaSolicitud.aspx/ListarEmpleados",
                    data: "{'inMaxFil': '" + 200 + "'," +
                               "'vcNomEmp': '" + $("#txtEmpleado").val().replace(/'/g, "&#39").replace(/\\/g, "&#92") + "'," +
                               "'inTipLin': '" + 1 + "'}",

                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        response($.map(result.d, function (item) {
                            var itemE = item.split("-");
                            return {
                                label: itemE[1],
                                vcCodEmp: itemE[0],
                                grupOri: itemE[2]
                            }
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtEmpleado").val(ui.item.vcCodEmp + " - " + ui.item.label);
                return false;
            },
            select: function (event, ui) {
                Selecciono = true;

                $("#txtEmpleado").val(ui.item.vcCodEmp + " - " + ui.item.label);
                $("#hdfCodEmpleado").val(ui.item.vcCodEmp);
                return false;
            },
            change: function (event, ui) {
                if (!ui.item) {
                    //if (!Selecciono) {
                    $("#hdfCodEmpleado").val("");
                    $("#txtEmpleado").val("");
                } else {
                    if ($("#txtEmpleado").val() == "") {
                        $("#hdfCodEmpleado").val("");
                    }
                }
                return false;
            },
            open: function (event, ui) {
                Selecciono = false;
                return false;
            }
        }).data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.vcCodEmp + "=" + item.label + "</a>").appendTo(ul);
        };
    }

    $("#txtLinea").keypress(ValidarEntero);
    $("#txtLinea").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: raiz("Common/WebService/General.asmx/ListarLineaPorEmpleado"),
                data: "{'vcNum': '" + $("#txtLinea").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                      "'inMaxFil': '" + 200 + "'," +
                      "'inTipLin': '" + 2 + "'," +
                      "'vcIdEmp': '" + $("#hdfCodEmpleado").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {

                    response($.map(result.d, function (item) {
                        var itemL = item.split("-");
                        return {
                            label: itemL[0],
                            vcEmp: itemL[1],
                            vcCodEmp: itemL[2]
                        }
                    }));



                },
                cache: false,
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtLinea").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            //            $("#txtEmpleado").val(ui.item.vcEmp);
            //            $("#hdfCodEmpleado").val(ui.item.vcCodEmp);

            $("#txtLinea").val(ui.item.label);
            $("#hdfNumLinea").val(ui.item.label);
            //            BuscarNumero($("#txtLinea").val());
            return false;
        },
        change: function (event, ui) {
            //if (!Selecciono) {
            if (!ui.item) {
                $("#hdfNumLinea").val("");
                $("#txtLinea").val("");

                //                $("#hdfCodEmpleado").val("");
                //                $("#txtEmpleado").val("");
                $("#txtEmpleado").attr("disabled", false);
                $("#trEmpleado").hide();
//                CargarDatos();
            }
            buscar = false;
            return false;
        },
        open: function (event, ui) {
            Selecciono = false;
            return false;
        }
    }).data("autocomplete")._renderItem = function (ul, item) {
        return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.label + "</a>").appendTo(ul);
    };

    $("#btnBuscar").click(function () {
        CargarDatos();
    });

    $("#btnLimpiar").click(function () {
        LimpiarControles();
    });

    $("#btnGenerar").click(function () {
        var ids = $("#grid").jqGrid('getGridParam', 'selarrrow');
        var p_periodo;
        var lstGenerar = [];

        for (var i = 0; i < ids.length; i++) {
            var data = $("#grid").jqGrid('getRowData', ids[i]);

            if (data.nroComprobante == '') {
                var oComprobante = new ENT_MOV_FAC_Comprobante();
                oComprobante.idEmpleado = data.idEmpleado;
                oComprobante.IdTipoProceso = data.idTipoProceso;
                oComprobante.Periodo = data.periodo.substring(3) + "/" + data.periodo.substring(0, 2) + "/01";
                oComprobante.Periodo1 = data.periodo.substring(3, 7) + data.periodo.substring(0, 2);

                oComprobante.IdTipoProducto = data.idTipoProducto;
                oComprobante.Nombre = data.empleado;
                p_periodo = oComprobante.Periodo1 + "01";

                if (data.nroDni == '') {
                    alerta("Empleado: " + oComprobante.Nombre + ", sin número de documento identidad registrado.");
                    return;
                } else {
                    oComprobante.NumeroDocumentoIdentidad = data.nroDni;
                }

                if (data.nroCuenta == '') {
                    alerta("Empleado: " + oComprobante.Nombre + ", sin número de cuenta registrado.");
                    return;
                } else {
                    oComprobante.NumeroCuenta = data.nroCuenta;
                }

                lstGenerar.push(oComprobante);
            }
        }
        if (lstGenerar.length == 0) {
            alerta("No ha seleccionado ninguna fila para generar");
            return;
        } else {

            $('#divGenerar').dialog({
                title: "Generar Comprobantes",
                modal: true,
                buttons: {
                    "Si": function () {
                        $.ajax({
                            type: "POST",
                            url: "Comp_Adm_EmisionComprobanteDetalle.aspx/Generar",
                            data: "{'lstGenerar':'" + JSON.stringify(lstGenerar) + "', 'p_periodo':'" + p_periodo + "', 'p_tipoProceso':'" + $("#ddlTipoProceso").val() + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {

                                if (result.d > 0) {
                                    Mensaje("<br/><h1>Comprobantes generados correctamente</h1>", document, null);
                                    CargarDatos();
                                } else if (result.d == 0) {
                                    alerta("No existe comprobantes a generar");
                                } else if (result.d == -1) {
                                    alerta("No se encontró comprobantes a generar, debido a que no existen registros de la facturación del operador");
                                } else if (result.d == -2) {
                                    alerta("Debe verificar la configuración de comprobantes");
                                    LimpiarControles();
                                } else if (result.d == -5) {
                                    alerta("Usuario sin permisos para generar comprobantes.");
                                    LimpiarControles();
                                }
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                        CargarDatos();
                    }
                }
            });
        }
    });

    $("#ddlTipoProceso").change(function () {
        $("#hdfTipoProceso").val(this.value);
    });

    $("#dwConciliado").change(function () {
        $("#hdfConciliados").val(this.value);
    });

    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

    function NumeroInicialFilas() {
        inFilas = Math.floor(($(window).height() - 230) / nuAltoFila);

        ArrayPaginacion.push(inFilas);
        ArrayPaginacion.push(inFilas + inFilas);
        ArrayPaginacion.push(inFilas + inFilas + inFilas);
    }

    $(window).resize(function () {
        NumeroInicialFilas();
        DimPosElementos();
    });

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
//        NumeroInicialFilas();
        if (Ancho < 850) {

            $("#toolbar").css('width', '820px');
            $("#dvGenerar").css('width', '820px');
            $("#grid").setGridWidth(810);
        }
        else {

            $("#toolbar").css('width', Ancho - 25);
            $("#dvGenerar").css('width', Ancho - 25);

            $("#grid").setGridWidth($(window).width() - 45);
        }
        
//        $("#dvGenerar").css('height', Alto - 100);
        $("#grid").setGridHeight($(window).height() - 255);
        
    }


    NumeroInicialFilas();

    CargarDatos();

    if (!validar) {
        $("#btnGenerar").button("option", "disabled", true);
        $("#dvNoGenerar").show();
    }

    $("#btnFiltro").click(function () {

        //        $("#grid").jqGrid("resetSelection");
        buscar = true;
        var linea = $('#txtLinea').val();
        var estado = $("#dwConciliado").val();
        var grid = $("#grid").getDataIDs();
        var i, j;
        lstMarcados = [];

        if (estado != "-1") {
            estado = $("#dwConciliado option:selected").text();
        }
        var colModels = $("#grid").getGridParam("colModel");
        for (i = 0; i < grid.length; i++) {
            for (j in colModels) {
                if (j != 0) {
                    $("#grid").jqGrid('setCell', grid[i], j, "", { 'background-color': 'transparent', 'background-image': 'none' });
                }
            }
        }
        var temp;
        for (i = 0; i < grid.length; i++) {
            var data = $('#grid').jqGrid('getRowData', grid[i]);

            for (j in colModels) {
                if (j != 0) {
                    if (linea != "") {
                        if (data.linea == linea && estado == "-1") {
                            $("#grid").jqGrid('setCell', grid[i], j, "", { 'background-color': '#8FD9F1', 'background-image': 'none' });
                            lstMarcados.push(grid[i]);
                            temp = false;
                        } else {
                            if (data.linea == linea && data.estado == estado) {
                                $("#grid").jqGrid('setCell', grid[i], j, "", { 'background-color': '#8FD9F1', 'background-image': 'none' });
                                lstMarcados.push(grid[i]);
                                temp = false;
                            } else {
                                temp = true;
                                continue;
                            }
                        }
                    }
                    if (estado == "-1") {
                        $("#grid").jqGrid('setCell', grid[i], j, "", { 'background-color': '#8FD9F1', 'background-image': 'none' });
                        lstMarcados.push(grid[i]);
                        temp = false;
                    } else {
                        if (data.estado == estado) {
                            $("#grid").jqGrid('setCell', grid[i], j, "", { 'background-color': '#8FD9F1', 'background-image': 'none' });
                            lstMarcados.push(grid[i]);
                            temp = false;
                        }
                    }
                }
            }
        }
        if (temp) {
            BuscarNumero(linea);
        } else {
            var uniques = [];
            $.each(lstMarcados, function (index, item) {
                if ($.inArray(item, uniques) === -1) uniques.push(item);
            });
            lstMarcados = uniques;
        }


    });

    $("#btnBorrar").click(function () {
        buscar = false;
        lstMarcados = [];
        $("#txtLinea").val("");
        $("#dwConciliado").val(-1);
        CargarDatos();
    });

//    DimPosElementos();
});

function CargarDatos() {

    $("#grid").GridUnload();
    $("#grid").jqGrid({

        datatype: function () {

            var Buscar_Data = {
                inPagTam: $('#grid').getGridParam("rowNum"),
                inPagAct: $('#grid').getGridParam("page"),
                vcOrdCol: $('#grid').getGridParam("sortname"),
                vcTipOrdCol: $('#grid').getGridParam("sortorder"),
                p_periodo: $("#hdfPeriodo").val(),
                p_estado: $("#hdfEstado").val(),
                p_idOperador: $("#hdfCodOperador").val(),
                p_tipoProducto: $("#hdfTipoProducto").val(),
                p_idEmpleado: $("#hdfCodEmpleado").val(),
                p_linea: "",
//                p_linea: $("#hdfNumLinea").val(),
                p_idTipoProceso: $("#ddlTipoProceso").val(),
                //p_conciliados: $("#dwConciliado").val(),
                p_conciliados: -1,
                p_tipoDocumento: $("#ddlTipoComp").val(),
                p_pagina: $("#hdfPagina").val()
                //                ,p_tipoLinea: 1
            }
            $.ajax({
                type: "POST",
                url: "Comp_Adm_EmisionComprobanteDetalle.aspx/Listar",
                data: JSON.stringify(Buscar_Data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {

                    if ($(result.d).length > 0) {
                        $("#btnExcel").button("option", "disabled", false);
                        $("#btnExcel").attr("title", "Exportar a Excel");
                        $("#grid")[0].addJSONData(result.d[0]);
                        if (result.d[1] > 0) {
                            $("#lblCantSinLineas").text(result.d[1]);
                            $("#dvSinLineas").show();
                        } else {
                            $("#dvSinLineas").hide();
                        }
                    } else {
                        $("#btnExcel").button("option", "disabled", true);
                        Mensaje("<br/><h1>No existe datos con los parámetros seleccionado(s).</h1>", document, null);
                    }
                    
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },

        colNames: ['id', 'N° Doc.', 'N1 Cuenta', 'Código', 'Empleado', 'idOpe', 'Contrato', 'Línea', 'idTipProc', 'Tipo Proceso', 'Periodo', 'Motivo', 'idTipDoc', 'Tipo Documento', 'idTipoProducto', 'idCronogramaPago', 'Importe', 'Importe Operador', '', 'Diferencia', 'Conciliados', 'Estado', '', 'N° Comprobante'],
        colModel: [
                    { name: 'id', index: 'id', width: 10, hidden: true, key: true },
                    { name: 'nroDni', index: 'nroDni', width: 60, hidden: false, key: true },
                    { name: 'nroCuenta', index: 'nroCuenta', width: 20, hidden: true },
                    { name: 'idEmpleado', index: 'idEmpleado', width: 55, key: true },
                    { name: 'empleado', index: 'empleado', width: 175 },
                    { name: 'IdOperador', index: 'IdOperador', width: 150, hidden: true },
                    { name: 'nroContrato', index: 'nroContrato', width: 90, align: 'center' },
                    { name: 'linea', index: 'linea', width: 70, align: 'center' },
        //                    { name: 'nroCuenta', index: 'nroCuenta', width: 30, hidden: true },
                    {name: 'idTipoProceso', index: 'idTipoProceso', width: 50, hidden: true },
                    { name: 'tipoProceso', index: 'tipoProceso', width: 65, align: 'center' },
                    { name: 'periodo', index: 'periodo', width: 55, resizable: false, hidden: true, align: 'center' },
                    { name: 'motivo', index: 'motivo', width: 60, align: 'center' },
                    { name: 'idTipoDocumento', index: 'idTipoDocumento', width: 30, hidden: true },
                    { name: 'tipoDocumento', index: 'tipoDocumento', width: 80, align: 'center' },
                    { name: 'idTipoProducto', index: 'idTipoProducto', width: 30, hidden: true },
                    { name: 'idCronogramaPago', index: 'idCronogramaPago', width: 30, hidden: true },
                    { name: 'importe', index: 'importe', width: 65, align: 'right', resizable: false, formatter: 'currency', formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2} },
                    { name: 'importeOperador', index: 'importeOperador', width: 65, align: 'right',
                        formatter: function (value, options, rData) {
                            if (rData[19] == "") {
                                return "-----";
                            } else {
                                return value;
                            }
                            var x;
                            
                            if (rData[15] == 'No Conciliado') {
                                //x = "<a href='#' title='ver Detalle de: " + rData[3] + "' name='" + value + "' id='" + rData[0] + "' onclick='Ver_Detalle(this.id);' style='height:22px; color:#08088A;' class='ui-state-error-text'>" + value + "</a>";
                                x = value;
                            } else {
                                //x = "<a href='#' title='ver Detalle de: " + rData[3] + "' name='" + value + "' id='" + rData[0] + "' onclick='Ver_Detalle(this.id);' style='height:22px; color:#08088A;'>" + value + "</a>";
                                x = value;
                            }
                            return x;
                        }
                    },
                    { name: 'importeOperador2', index: 'importeOperador2', width: 65, align: 'right', hidden: true, resizable: false, formatter: 'currency', formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2} },
                    { name: 'diferencia', index: 'diferencia', width: 70, align: 'right', resizable: false,
//                        formatter: 'currency', formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 } 
                        formatter: function(value, options, data) {
                            var x = data[19];
                            if (data[19] == "") {
                                return "-----";
                            } else {
                                return value;
                            }
                        }
                    },
                    { name: 'estado', index: 'estado', width: 75, align: 'center', resizable: false },
            {
                name: 'estadoComprobante', index: 'estadoComprobante', width: 75, align: 'center', resizable: false,
                formatter: function(value, options, data) {
                    if (data[21] == "") {
                        return "No Emitido";
                    } else {
                        return value;
                    }
                }
            },
                    { name: 'nroComprobante', index: 'nroComprobante', width: 135, align: 'center', resizable: false, hidden: true },
                    {
                        name: 'nroComprobante2', index: 'nroComprobante2', width: 120, align: 'center',
                        formatter: function (value, options, rData) {
                            return "<a href='#' style='color:#08088A;' title='Vista Preliminar: " + rData[9] + "' name='" + value + "' id='" + rData[0] + "' onclick='Ver_Comprobante(this.id);' style='height:22px'>" + value + "</a>"; ;
                        }
                    }
                ],
        pager: '#pager',
        //        rowNum: 15,
        rowNum: inFilas,
        rowList: ArrayPaginacion,
        //        rowList: [15, 30, 45],
        viewrecords: true,
        hidegrid: false,
        gridview: true,
        sortable: true,
        viewsortcols: [true, 'vertical', true],
        rownumbers: true,     
        height: $(window).height() - 255,
//                height: '345',
        shrinkToFit: false,
        width: $(window).width() - 40,
//        width: '1195',
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}',
        jsonReader: {
            root: "Items",
            page: "PaginaActual",
            total: "TotalPaginas",
            records: "TotalRegistros",
            repeatitems: true,
            cell: "Row",
            id: "nroDni"
        },
        multiselect: true,
        //        multiboxonly: true,
        onSelectRow: function (id, select, item) {
            var colModels = $("#grid").getGridParam("colModel");
            if (select) {
                for (var j in colModels) {
                    if (j != 0) {
                        $("#grid").jqGrid('setCell', id, j, "", { 'background-color': 'transparent', 'background-image': 'none' });
                    }
                }
            } else {
                if (lstMarcados.length > 0) {
                    var grid = $("#grid").getDataIDs();
                    for (var i = 0; i < lstMarcados.length; i++) {
                        for (var j in colModels) {
                            if (j != 0) {
                                $("#grid").jqGrid('setCell', lstMarcados[i], j, "", { 'background-color': '#8FD9F1', 'background-image': 'none' });
                            }
                        }
                    }
                }
            }
//            fnBuscar();
        },
        onCellSelect: function (rowid) {
            
            var ch = $("#grid").find('#jqg_grid_' + rowid).prop('checked');

            if (!ch) {
                $("#grid").jqGrid('resetSelection');
            }
            
            var rowData = $(this).jqGrid("getRowData", rowid);

            var valor = $('#grid').jqGrid('getCell', rowid, 'idEmpleado');
            var grid = $("#grid").getDataIDs();

            for (var i = 0; i < grid.length; i++) {
                var data = $('#grid').jqGrid('getRowData', grid[i]);

                if (rowData.id == data.id) {
                    continue;
                }
                if (data.idEmpleado == valor && data.nroComprobante == '') {
                    $('#grid').jqGrid('setSelection', data.id, true);
                }
            }
            
        },
        gridComplete: function () {
            var estado = $("#dwConciliado").val();
            if (estado != "-1") {
                estado = $("#dwConciliado option:selected").text();
            }

            var grid = $("#grid").getDataIDs();
            var colModels = $("#grid").getGridParam("colModel");
            for (var i = 0; i < grid.length; i++) {
                var data = $('#grid').jqGrid('getRowData', grid[i]);
                
                if (data.estado == "No Conciliado") {
                    for (var j in colModels) {
                        if (j != 0) {
                            $("#grid").jqGrid('setCell', grid[i], j, '', "ui-state-error-text");
                        }
                    }
                }

                if (data.nroComprobante != "") {
                    $("#jqg_grid_" + (i+1)).hide();
                }

                if (data.linea == "") {
                    for (var j in colModels) {
                        if (j != 0) {
                            $("#grid").jqGrid('setCell', grid[i], j, "", { 'background-color': '#FAD0B9', 'background-image': 'none' });
                        }
                    }
                }
            }
            
            var datos = $('#grid').jqGrid('getRowData');
            if (grid.length > 0) {
                for (var i = 0; i < grid.length; i++) {
                    if (datos[i].nroComprobante != "") {
                        //$("#jqg_grid_" + (datos[i].id)).attr("disabled", true);
                        $("#jqg_grid_" + (datos[i].id)).hide();
                    } else {
                        $("#jqg_grid_" + (datos[i].id)).show();
                    }
                }
            }
            
            $("#cb_grid").hide();

            if (buscar) {
                
                var linea = $('#txtLinea').val();

                for (i = 0; i < grid.length; i++) {
                    var data = $('#grid').jqGrid('getRowData', grid[i]);

                    for (j in colModels) {
                        if (j != 0) {
                            if (linea != "") {
                                if (data.linea == linea && estado == "-1") {
                                    $("#grid").jqGrid('setCell', grid[i], j, "", { 'background-color': '#8FD9F1', 'background-image': 'none' });
                                    lstMarcados.push(grid[i]);
//                                    temp = false;
                                } else {
                                    if (data.linea == linea && data.estado == estado) {
                                        $("#grid").jqGrid('setCell', grid[i], j, "", { 'background-color': '#8FD9F1', 'background-image': 'none' });
                                        lstMarcados.push(grid[i]);
//                                        temp = false;
                                    } else {
//                                        temp = true;
                                        continue;
                                    }
                                }
                            }
                            if (estado == "-1") {
                                $("#grid").jqGrid('setCell', grid[i], j, "", { 'background-color': '#8FD9F1', 'background-image': 'none' });
                                lstMarcados.push(grid[i]);
//                                temp = false;
                            } else {
                                if (data.estado == estado) {
                                    $("#grid").jqGrid('setCell', grid[i], j, "", { 'background-color': '#8FD9F1', 'background-image': 'none' });
                                    lstMarcados.push(grid[i]);
//                                    temp = false;
                                }
                            }
                        }
                    }
                }



            } else {
                return;
            }
            
        },
        beforeSelectRow: function (rowId, e) {
            var data = $('#grid').jqGrid('getRowData', rowId);
            if (data.nroComprobante == "") {
                return true;
            } else {
                return false;
            }
        },
        onSelectAll: function (aRowids, status) {
        }
    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });
}

function BuscarNumero(numero) {

    var inPagTam = $('#grid').getGridParam("rowNum");

    $.ajax({
        type: "POST",
        url: "Comp_Adm_EmisionComprobanteDetalle.aspx/BuscaFilaNumero",
        //data: "{'oCompania': '" + oCompania + "'}",

        data: "{'Numero': '" + numero + "','inPagTam': '" + inPagTam + "'}",

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            var pagina = result.d;

            //if (pagina > 0) {
                $("#hdfPagina").val(pagina);
                CargarDatos();
           // }
           
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
            BloquearPagina(false);
        }
    });
}

function Ver_Detalle(id) {
    var periodo = $("#hdfPeriodo").val();
    periodo = periodo.substring(3, 7) + periodo.substring(0, 2) + "01";
    var row = $("#grid").getRowData(id);
    var cadena = "idEmp=" + row.idEmpleado + "&p_vcPer=" + periodo + "&nroComp=" + row.nroComprobante +
                 "&emp=" + row.empleado + "&idTipProd=" + $("#hdfTipoProducto").val() + "&idConciliado=" + $("#dwConciliado").val() + "&idTipProc=" + $("#ddlTipoProceso").val();
    var pagina = "Comp_Adm_ConciliacionDetallada.aspx?" + cadena;
    fn_mdl_muestraForm(pagina, null, "Conciliación por línea: ", 560, 350);
}

function Ver_Comprobante(id) {
    var tipoRep = 'RepComprobantePdf';
    var row = $("#grid").getRowData(id);
    var pagina = "../../Administrar/Adm_Reporte.aspx?Tipo=" + tipoRep + "&idEmp=" + row.idEmpleado + "&nroComp=" + row.nroComprobante;
    $("#ifReporte").hide();

    formulario = $('#dvVisPre').dialog({
        title: "Vista Preliminar del Documento",
        width: 880,
        height: $(window).height() - 30,
        modal: true,
        show: true,
        hide: true,
        resizable: true,
        maxWidth: 880,
        minWidth: 550,
        minHeight: 450,
        position: { my: "center", at: "top", of: window },
        buttons: {
            "Cerrar": function () {
                $(this).dialog('close');
            }
        }
    });
    $("#ifReporte").attr("src", pagina);
//    fn_mdl_muestraForm(pagina, null, "Vista Preliminar", 900, 600);
}

function fn_mdl_muestraForm(pURL, pFuncion, pTitulo, pAncho, pAlto) {
    if (!pTitulo) { pTitulo = ''; }

    $("body").append("<div id='dv_ModalFrame'></div>");
    var strHtml = '<iframe runat="server" id="ifrModal" width="100%" height="100%" frameborder="0" scrolling="auto" marginheight="0" marginwidth="0" src="' + pURL + '"></iframe>';

    $("#dv_ModalFrame").html(strHtml);
    $("#dv_ModalFrame").dialog({
        modal: true,
        title: pTitulo,
        width: pAncho,
        height: (pAlto ? pAlto : 'auto'),
        resizable: false,
        show: true,
        hide: true,
        position: { my: "center", at: "top", of: window },
        buttons: {
            "Cerrar": function () {
                $(this).dialog('close');
            }
        }
    });
}

function LimpiarControles() {
    
    $("#txtEmpleado").val("");
    $("#ddlTipoProceso").val(-1);
    $("#txtLinea").val("");
    $("#dwConciliado").val(-1);
    $("#hdfCodEmpleado").val("");
    $("#txtLinea").val("");
    $("#hdfNumLinea").val("");
    $("#ddlTipoComp").val(-1);
    buscar = false;
    CargarDatos();
}

function fnShowIframe() {
    $("#ifReporte").show();
}

function CambiarColor() {

    var grid = $("#grid").getDataIDs();

    for (var i = 0; i < grid.length; i++) {
        var data = $('#grid').jqGrid('getRowData', grid[i]);
        var colModels = $("#grid").getGridParam("colModel");

        if (data.nroComprobante != "") {
            //                        $("#jqg_grid_" + (datos[i].id)).attr("disabled", true);
            $("#jqg_grid_" + (i+1)).hide();
        }

        for (var j in colModels) {
            if (j != 0) {
                $("#grid").jqGrid('setCell', grid[i], j, '', { 'background-color': 'white', 'background-image': 'none' });
            }
        }

        if (data.estado == "No Conciliado") {
            for (var j in colModels) {
                if (j != 0) {
                    $("#grid").jqGrid('setCell', grid[i], j, '', "ui-state-error-text");
                }
            }
        }

        if (data.linea == "") {
            for (var j in colModels) {
                if (j != 0) {
                    $("#grid").jqGrid('setCell', grid[i], j, "", { 'background-color': '#81E59A', 'background-image': 'none' });
                }
            }
        }
    }
}

function fnBuscar () {
    if (buscar) {

        var linea = $('#txtLinea').val();

        for (i = 0; i < grid.length; i++) {
            var data = $('#grid').jqGrid('getRowData', grid[i]);

            for (j in colModels) {
                if (j != 0) {
                    if (linea != "") {
                        if (data.linea == linea && estado == "-1") {
                            $("#grid").jqGrid('setCell', grid[i], j, "", { 'background-color': '#8FD9F1', 'background-image': 'none' });
                            lstMarcados.push(grid[i]);
                            //                                    temp = false;
                        } else {
                            if (data.linea == linea && data.estado == estado) {
                                $("#grid").jqGrid('setCell', grid[i], j, "", { 'background-color': '#8FD9F1', 'background-image': 'none' });
                                lstMarcados.push(grid[i]);
                                //                                        temp = false;
                            } else {
                                //                                        temp = true;
                                continue;
                            }
                        }
                    }
                    if (estado == "-1") {
                        $("#grid").jqGrid('setCell', grid[i], j, "", { 'background-color': '#8FD9F1', 'background-image': 'none' });
                        lstMarcados.push(grid[i]);
                        //                                temp = false;
                    } else {
                        if (data.estado == estado) {
                            $("#grid").jqGrid('setCell', grid[i], j, "", { 'background-color': '#8FD9F1', 'background-image': 'none' });
                            lstMarcados.push(grid[i]);
                            //                                    temp = false;
                        }
                    }
                }
            }
        }
    } else {
        return;
    }
}