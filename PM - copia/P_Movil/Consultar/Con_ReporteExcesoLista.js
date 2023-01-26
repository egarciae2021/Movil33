var SimMil = ",";
var SimDec = ".";
var NumDec = "2";
var oCulturaUsuario;
var TamanoPagina = [10,20,30];
var inAltGrid;
var MargenFiltro = 0;
var MargenHeight = 48;
var inFilas;
var nuAltoFila = 23.04;
var ArrayPaginacion = [];

$(function () {
    NumeroInicialFilas();
    //cultura (configuracion regional)
    oCulturaUsuario = window.parent.parent.parent.parent.oCulturaUsuario;
    SimMil = oCulturaUsuario.vcSimSepMil;
    NumDec = oCulturaUsuario.dcNumDec;
    SimDec = oCulturaUsuario.vcSimDec;

    window.parent.parent.ventanaSumario = location;

    if ($('#hdfAsignacionCredito').val() == '2') {
        //window.parent.$("#dvCargando").show();
        $.ajax({
            url: "Con_ReporteExcesoLista.aspx/ObtenerLista_Cuenta_ReporteExceso_X_Minuto",
            data: "{'pvcPeriodo':'" + $('#hdfPeriodo').val() + "'," +
               "'pvcOperador':'" + $('#hdfCodigoOperador').val() + "'," +
               "'pvcCuenta_Plan':'" + $('#hdfCodigoCuenta_Plan').val() + "'," +
               "'pintCodAsigCred':'" + $('#hdfAsignacionCredito').val() + "'," +
               "'pintIdTipoServicio': '" + $('#hdfTipoServicio').val() + "'}",
            dataType: "json",
            type: "post",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                MostrarReporte(result.d);
                window.parent.$("#dvCargando").hide();
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                window.parent.$("#dvCargando").hide();
            }
        });
    } else {
        //window.parent.$("#dvCargando").show();
        TamanoPagina = [10, 20, 30];
        $("#tbSumario").jqGrid({
            datatype: function () {
                $.ajax({
                    url: "Con_ReporteExcesoLista.aspx/ObtenerLista_Planes_ReporteExceso_X_Minuto",
                    data: "{'pvcPeriodo':'" + $('#hdfPeriodo').val() + "'," +
                                "'pvcOperador':'" + $('#hdfCodigoOperador').val() + "'," +
                                "'pvcCuenta_Plan':'" + $('#hdfCodigoCuenta_Plan').val() + "'," +
                                "'pintCodAsigCred':'" + $('#hdfAsignacionCredito').val() + "'," +
                                "'pintIdTipoServicio': '" + $('#hdfTipoServicio').val() + "'}",
                    dataType: "json",
                    type: "post",
                    contentType: "application/json; charset=utf-8",
                    success: function (result) {
                        if (result.d.Items[0].ID == "no existe periodo") { //result.d.Items[0].ID
                            window.parent.$("#dvCargando").hide();
                            window.parent.MostrarAlerta_SinData_ReporteExceso_X_Cuenta();
                        } else {
                            $("#tbSumario")[0].addJSONData(result.d);
                            window.parent.$("#dvCargando").hide();
                        }

                    },
                    error: function (xhr, err, thrErr) {
                        window.parent.$("#dvCargando").hide();
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
            colModel: [
            //{ name: 'CodPlan', index: 'CodPlan', label: 'IdPlan', hidden: false },
                            {name: 'CodCia', index: 'CodCia', label: 'CodOperador', hidden: true },
   		                    { name: 'NomCia', index: 'NomCia', label: 'Operador', hidden: false, width: 220 },
                            { name: 'Plan', index: 'Plan', label: 'Plan', hidden: false, width: 220 },
                            { name: 'dcContratado', index: 'dcContratado', label: 'Min. Contratado', hidden: false, width: 120, align: 'right',
                                formatter: function (value, options, rData) {
                                    if (parseInt(value) > 0) {
                                        return FormatoNumero(parseInt(value), oCulturaUsuario, false);
                                    } else {
                                        return "Ilimitado";
                                    }
                                }
                            },
                            { name: 'LineasAsignadas', index: 'LineasAsignadas', label: 'Líneas Asignadas', hidden: false, width: 120, align: 'right' },
                            { name: 'Fuera_Plan', index: 'Fuera_Plan', label: 'Consumo Fuera Plan', hidden: false, width: 120, align: 'right' },
                            { name: 'Dentro_Plan', index: 'Dentro_Plan', label: 'Consumo Dentro Plan', hidden: false, width: 120, align: 'right' }
   	                      ],
            viewrecords: false,
            pager: "#pager", //Pager.
            //width: "3000",
            //height: inAltGrid + 70,
            loadtext: 'Cargando datos...',
            recordtext: "{0} - {1} de {2} elementos",
            emptyrecords: 'No hay resultados',
            pgtext: 'Pág: {0} de {1}', //Paging input control text format.
            rowNum: inFilas, //$("#hdfTamPag").val(), //"10" PageSize.
            rowList: TamanoPagina,  //TamanosPaginaSel, //Variable PageSize DropDownList. 
            sortname: "CodPlan", //sortname: idTabla, //Default SortColumn
            sortorder: "desc",
            rownumbers: true,
            multiselect: false, //check
            shrinkToFit: false,
            caption: "Consumo Minutos Por Planes",
            width: $(window).width() - 200,
            height: $(window).height() - 200,
            beforeSelectRow: function (rowId, e) {
                return $(e.target).is("input:checkbox");
            },
            onSelectRow: function (rowid, status) {
                //$("#tbPedidos").jqGrid('getRowData', rowid);
            },
            onSelectAll: function (ids_Grid, status) {
            },
            gridComplete: function () {
                fnDimencionar();
                window.parent.MostrarAlerta_ConData_ReporteExceso_X_Cuenta();
                $("#pager_left").css('width', 'auto');
            },
            subGrid: true,
            subGridOptions: {
                "reloadOnExpand": false,
                "selectOnExpand": false
            },

            subGridRowExpanded: function (subgrid_id, row_id) {
                var subgrid_table_id, pager_id;
                subgrid_table_id = subgrid_id + "_t";
                pager_id = "p_" + subgrid_table_id;
                $("#" + subgrid_id).html("<table id='" + subgrid_table_id + "' class='scroll'></table><div id='" + pager_id + "' class='scroll'></div>");
                $("#" + subgrid_table_id).jqGrid({
                    datatype: function () {
                        $.ajax({
                            url: "Con_ReporteExcesoLista.aspx/ObtenerListaDetalle_Planes_ReporteExceso_X_Minuto",
                            data: "{'pvcPeriodo':'" + $('#hdfPeriodo').val() + "'," +
                                "'pvcOperador':'" + $('#hdfCodigoOperador').val() + "'," +
                                "'pvcCuenta_Plan':'" + row_id + "'," +
                                "'pintCodAsigCred':'" + $('#hdfAsignacionCredito').val() + "'," +
                                "'pintIdTipoServicio': '" + $('#hdfTipoServicio').val() + "'}",
                            dataType: "json",
                            type: "post",
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                $("#" + subgrid_table_id).jqGrid('clearGridData');
                                var i = 0;
                                for (i = 0; i < $(result.d).length; i++) {
                                    $("#" + subgrid_table_id).jqGrid('addRowData', i, result.d[i]);
                                }

                                if ($.browser.chrome) {
                                    $('#gbox_' + subgrid_table_id).css("width", "900px"); //ui-jqgrid-bdiv //795px //830px
                                    $('div.ui-jqgrid-bdiv', 'div#gview_' + subgrid_table_id).each(function (i) {
                                        $(this).css({ "width": "900px" });
                                    });
                                    $('div.ui-jqgrid-hdiv', 'div#gview_' + subgrid_table_id).each(function (i) {
                                        $(this).css({ "width": "900px" });
                                    });
                                }
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                    },
                    colModel: [{ name: 'IdPlan', index: 'IdPlan', label: 'IdPlan', width: '40', align: 'center', sortable: false, resizable: false, hidden: true, key: true },
   		                       { name: 'Linea', index: 'Linea', label: 'Línea', width: '50', align: 'left', sortable: false, resizable: false },
                               { name: 'Equipo', index: 'Equipo', label: 'Equipo', width: '180', align: 'left', sortable: false, resizable: false },
                               { name: 'Empleado', index: 'Empleado', label: 'Empleado', width: '180', align: 'left', sortable: false, resizable: false },
                               { name: 'Estado', index: 'Estado', label: 'Estado', width: '60', align: 'left', sortable: false, resizable: false },
   		                       { name: 'Asignado', index: 'Asignado', label: 'Asignado', width: '50', align: 'right', sortable: false, resizable: false,
   		                           formatter: function (value, options, rData) {
   		                               if (parseInt(value) > 0) {
   		                                   return FormatoNumero(parseInt(value), oCulturaUsuario, false);
   		                               } else {
   		                                   return "Ilimitado";
   		                               }
   		                           }
                               },
   		                       { name: 'Consumo', index: 'Consumo', label: 'Consumo', width: '50', align: 'right', sortable: false, resizable: false, formatter: function (value, options, rData) {
   		                           //debugger;
   		                           return FormatoNumero(parseInt(value), oCulturaUsuario, false);
   		                       }
   		                       },
   		                       { name: 'Exceso', index: 'Exceso', label: 'Exceso', width: '50', align: 'right', sortable: false, resizable: false, formatter: function (value, options, rData) {
   		                           return FormatoNumero(parseInt(value), oCulturaUsuario, false);
   		                       }
   		                       }
   	                          ],
                    sortorder: "asc",
                    width: $(window).width() - 120, //"760","790"
                    height: "auto",
                    beforeSelectRow: function (rowId, e) {
                        return false;
                    }
                });
            },
            subGridRowColapsed: function (subgrid_id, row_id) {
            },
            ondblClickRow: function (id) {
                AbrirRegistro(id);
            }
        }).navGrid("#pager", { edit: false, add: false, search: false, del: false });
    }


    function AbrirRegistro(id) {
        $("#tbPedidos").toggleSubGridRow(id);
        //alert(id);
    }

    $("#tbSumario").jqGrid('setFrozenColumns');
    inicioPagina();
    function inicioPagina() {
        //DimPosElementos();
        NumeroInicialFilas();
    }

    $(window).resize(function () {
        fnDimencionarGrilla();
    });

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        var AnchoLateral = $(".LateralSplitter");
        $(".tabs").css({ height: Alto - 23, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });

        inAltGrid = $(window).height();
        $("#tbSumario").setGridWidth($(window).width() - 82);
        $("#tbSumario").setGridHeight(inAltGrid - 70);
    }
});

function fnDimencionarGrilla() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    inAltGrid = $(window).height();
    $("#tbSumario").setGridWidth(Ancho - 10);
    $("#tbSumario").setGridHeight(inAltGrid - 105);
}

function fnDimencionar() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    inAltGrid = $(window).height();
    $("#tbSumario").setGridWidth(Ancho - 10);
    $("#tbSumario").setGridHeight(inAltGrid - 105);
}

function NumeroInicialFilas() {

    if (esIe8()) {
        inFilas = Math.floor(($(window).height() - 130) / nuAltoFila);
    }
    else {
        inFilas = Math.floor(($(window).height() - 110) / nuAltoFila);
    }


    ArrayPaginacion.push(inFilas);
    ArrayPaginacion.push(inFilas + inFilas);
    ArrayPaginacion.push(inFilas + inFilas + inFilas);
}

function MostrarReporte(resul) {
    if (resul[0] == "1") {
        window.parent.$("#dvCargando").hide();
        window.parent.MostrarAlerta_SinData_ReporteExceso_X_Cuenta();
    }
    else {
        var columnas = JSON.parse(resul[0]);
        var datos = JSON.parse(resul[1]);

        $("#tbSumario").jqGrid({
            datatype: "local",
            colModel: columnas,
            pager: "#pager", //Pager.
            data: datos,
            gridview: true,
            loadtext: 'Cargando datos...',
            recordtext: "{0} - {1} de {2} elementos",
            pgtext: 'Pág: {0} de {1}', //Paging input control text format.
            emptyrecords: "No hay datos que mostrar",
            viewrecords: true,
            height: $(window).height() - 200,
            width: $(window).width - 50,
            rownumbers: true,
            rowNum: 10,
            rowList: [10, 20, 30],
            caption: "Consumo Minutos Por Cuenta",
            onRightClickRow: function (rowid, iRow, iCol, e) {
            },
            ondblClickRow: function (id) {
            },
            gridComplete: function () {
                fnDimencionar();
                window.parent.MostrarAlerta_ConData_ReporteExceso_X_Cuenta();
            }
        }).navGrid("#pager", { edit: false, add: false, search: false, del: false });


    }
}
