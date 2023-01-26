var vcPeriodo;
var Modal;
var inFilas;
var inAltGrid;

var ArrayPaginacion = [];
var inFilas;
var nuAltoFila = 29.45;

$(function () {

    $(".btnNormal").button();
    kendo.culture("es-PE");

    //****Valores iniciales para rango de fecha
    var date = new Date();
    var fechainicio = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    $("#txtPeriodo").removeClass("ui-corner-all");
    $("#txtPeriodo").css({
        "border": "none",
        "padding": "0px"
    });
    var cPeriodo = $("#txtPeriodo").kendoDatePicker({
        culture: "es-PE",
        start: "year",
        depth: "year",
        value: fechainicio,
        format: "MM/yyyy",
        footer: false
    }).data("kendoDatePicker");

    cargarFecha();
    function cargarFecha() {
        vcPeriodo = $("#txtPeriodo").val();
        $("#hdfPeriodo").val(vcPeriodo);
    }

    $("#txtPeriodo").change(function () {
        vcPeriodo = this.value;
        $("#hdfPeriodo").val(vcPeriodo);
    });

    $("#txtEmpleado").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: raiz("Common/WebService/General.asmx/ListarEmpleadoPorNombreTipoLinea"),
                data: "{'inMaxFil': '" + 200 + "'," +
                               "'vcNomEmp': '" + $("#txtEmpleado").val().replace(/'/g, "&#39").replace(/\\/g, "&#92") + "'," +
                               "'inTipLin': '" + 2 + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        var itemE = item.split("-");
                        return {
                            label: itemE[1],
                            vcCodEmp: itemE[0],
                            grupOri: itemE[2],
                            vcDni: itemE[3]
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
            $("#txtNroDoc").val(ui.item.vcDni);
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
            return false;
        }
    }).data("autocomplete")._renderItem = function (ul, item) {
        return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.vcCodEmp + "=" + item.label + "</a>").appendTo(ul);
    };

    $("#txtNroDoc").keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

    $("#txtNroDoc").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "Comp_Adm_VisorComprobantes.aspx/ListarEmpleados",
                data: "{'inMaxFil': '" + 50 + "'," +
                               "'vcNomEmp': '" + $("#txtNroDoc").val().replace(/'/g, "&#39").replace(/\\/g, "&#92") + "'," +
                               "'inTipLin': '" + 1 + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        var itemE = item.split("-");
                        return {
                            label: itemE[1],
                            vcCodEmp: itemE[0],
                            vcDni: itemE[2]
                        }
                    }));
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtNroDoc").val(ui.item.vcDni);
            return false;
        },
        select: function (event, ui) {

            $("#txtEmpleado").val(ui.item.vcCodEmp + " - " + ui.item.label);
            $("#hdfCodEmpleado").val(ui.item.vcCodEmp);
            $("#txtNroDoc").val(ui.item.vcDni);
            return false;
        },
        change: function (event, ui) {
            if (!ui.item) {
                //if (!Selecciono) {
                $("#hdfCodEmpleado").val("");
                $("#txtEmpleado").val("");
                $("#txtNroDoc").val("");
            } else {
                if ($("#txtEmpleado").val() == "") {
                    $("#hdfCodEmpleado").val("");
                }
            }
            return false;
        },
        open: function (event, ui) {
            return false;
        }
    }).data("autocomplete")._renderItem = function (ul, item) {
        return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.vcDni + " = " + item.label + "</a>").appendTo(ul);
    };

    $("#dwTipoComp").change(function () {
        $.ajax({
            type: "POST",
            url: "Comp_Adm_VisorComprobantes.aspx/ListarEstadoCobroxIdTipoDoc",
            data: "{'idTipoDocumento': '" + this.value + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                $("#dwEstado").html("");

                if (result.d.length > 0) {
                    $(result.d).each(function () {

                        $("#dwEstado").append($("<option></option>").attr("value", this.IdEstadoCobro).text(this.Descripcion.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"')));

                    });
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    $("#btnBuscar").button();
    $("#btnBuscar").click(function () {
        //        Buscar();
        if ($("#txtPeriodo").val() != "") {
            $("#grid").trigger("reloadGrid");
        } else {
            alerta("Seleccione el periodo");
            $("#txtPeriodo").focus("");
        }
        
    });

    $("#btnLimpiar").button();
    $("#btnLimpiar").click(function () {
        LimpiarControles();
    });

    $("#btnPdf").button();
    $("#btnPdf").click(function () {
        var p_periodo = $("#txtPeriodo").val();
        p_periodo = p_periodo.substring(3, 7) + "" + p_periodo.substring(0, 2) + "01";
        var ids = $("#grid").jqGrid('getGridParam', 'selarrrow');

        var lista = [];

        for (var i = 0; i < ids.length; i++) {
            var data = $("#grid").jqGrid('getRowData', ids[i]);

            var oComprobante = new ENT_MOV_FAC_Comprobante();
            oComprobante.IdEmpleado = data.idEmpleado;
            oComprobante.NumeroComprobante = data.nroComp2;
            oComprobante.Periodo1 = data.periodo.substring(3, 7) + "" + data.periodo.substring(0, 2) + "01";
            oComprobante.IdTipoDocumento = data.idTipoDoc;
            lista.push(oComprobante);

        }
        if (lista.length == 0) {
            alerta("No ha seleccionado ninguna fila");
            return;
        } else {
            $.ajax({
                type: "POST",
                url: "Comp_Adm_VisorComprobantes.aspx/ExportarPdf",
                data: "{'lista': '" + JSON.stringify(lista) + "', 'p_periodo':'" + p_periodo + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.d.length > 0) {
                        var RutaFinal = data.d;
                        window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=Temporal/Comprobantes/" + RutaFinal);
//                        window.location.href = "../../../Common/Controladores/DescargarArchivo.ashx?archivo=" + RutaFinal;
                        Buscar();
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    });

    $("#btnExportar").button("option", "disabled", true);
    $("#btnExportar").button();
    $("#btnExportar").click(function () {

        var cant = $("#grid").jqGrid('getGridParam', 'records');

        if (cant > 0) {
            tipoRep = 'RepVisorComprobante';
            ExportarExcel();
        } else {
            alerta("Sin registros con los parámetros seleccionados");
        }

    });

    function ExportarExcel() {
        pagina = "../../Administrar/Adm_Reporte.aspx?Tipo=" + tipoRep + "&vcPeriodo=" + vcPeriodo + "&idEmp=" + $("#hdfCodEmpleado").val() + "&inTiPro=" + $("#dwTipoProceso").val() + "&inTipDoc=" + $("#dwTipoComp").val() + "&inEst=" + $("#dwEstado").val();
        $("#ifExcel").attr("src", pagina);
    }

    DimPosElementos();

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        NumeroInicialFilas();
    }

    function NumeroInicialFilas() {
        inFilas = Math.floor(($(window).height() - 200) / nuAltoFila);
        ArrayPaginacion.push(inFilas);
        ArrayPaginacion.push(inFilas + inFilas);
        ArrayPaginacion.push(inFilas + inFilas + inFilas);
    }

    $(window).resize(function () {
        //        DimPosElementos();
        NumeroInicialFilas();
        TamanioGrilla();

    });

    function TamanioGrilla() {
        var panelwidth = $("#divGrilla").width();
        var panelheitgh = $("#divGrilla").height();
        $("#grid").setGridWidth($(window).width() - 70);
        $("#grid").setGridHeight($(window).height() - 285);
        if (panelwidth > 502) {
            $("#grid").setGridWidth($(window).width() - 70);           
        }
        else {
            $("#grid").setGridWidth(718 - 300);         
        }

        $("#grid").setGridHeight($(window).height() - 285);
        
    }

    Buscar();
    TamanioGrilla();
});

function Buscar() {

        //    $("#grid").GridUnload();
        var grid = $("#grid").jqGrid({
            datatype: function() {

                var Buscar_Data = {
                    inPagTam: $('#grid').getGridParam("rowNum"),
                    inPagAct: $('#grid').getGridParam("page"),
                    vcOrdCol: $('#grid').getGridParam("sortname"),
                    vcTipOrdCol: $('#grid').getGridParam("sortorder"),
                    p_periodo: $("#txtPeriodo").val(),
                    p_idEmpleado: $("#hdfCodEmpleado").val(),
                    p_tipoDocumento: $("#dwTipoComp").val(),
                    p_idTipoProceso: $("#dwTipoProceso").val(),
                    p_idEstado: $("#dwEstado").val()
                }

                $.ajax({
                    type: "POST",
                    url: "Comp_Adm_VisorComprobantes.aspx/Buscar",
                    data: JSON.stringify(Buscar_Data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(result) {

                        if ($(result.d).length > 0) {

                            $("#divGrilla").show();

                            $("#btnExcel").button("option", "disabled", false);
                            $("#btnExcel").attr("title", "Exportar a Excel");
                            $("#grid")[0].addJSONData(result.d);

                        } else {
                            //                        $("#divGrilla").hide();
                            $("#grid").jqGrid("clearGridData");
                            $("#btnExcel").button("option", "disabled", true);
                            $("#btnExportar").attr("title", "Sin registros a exportar");
                            $("#btnPdf").attr("title", "Sin archivos para exportar");
                            Mensaje("<br/><h1>No existe datos con los parámetros seleccionado(s).</h1>", document, null);
                        }

                        if (perfil != '1' && perfil != '39') {
                            $("#grid").hideCol("proceso");
                            $("#grid").hideCol("tipoMotivo");
                            $("#grid").hideCol("empleado");
                            $("#grid").hideCol("estadoCobro");
                            $("#grid").hideCol("observacion");
                            $("#trEmp").hide();
                        }

                    },
                    error: function(xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            colNames: [
                'id', 'idTipoProceso', 'Proceso', 'idTipoProducto', 'Tipo Motivo', 'Periodo', 'Fecha Emisión', 'idTipoDoc', 'Tipo Comprobante',
                'Nro Documento', ' ', 'idEmpleado', 'Empleado', 'Importe Total', 'Monto Cobrado/Abonado', 'idEstadoCobro', 'Estado', 'Observaciones'
            ],
            colModel: [
                { name: 'id', index: 'id', width: 10, hidden: true, key: true },
                { name: 'idTipoProceso', index: 'idTipoProceso', width: 30, hidden: true },
                { name: 'proceso', index: 'proceso', width: 70, align: 'center', resizable: false },
                { name: 'idTipoProducto', index: 'idTipoProducto', width: 30, hidden: true },
                { name: 'tipoMotivo', index: 'tipoMotivo', width: 70, align: 'center', resizable: false },
                { name: 'periodo', index: 'periodo', width: 60, align: 'center', resizable: false, formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'm/Y' } },
                { name: 'fechaEmision', index: 'fechaEmision', width: 80, resizable: false, formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' }, align: 'center' },
                { name: 'idTipoDoc', index: 'idTipoDoc', width: 30, hidden: true },
                { name: 'tipoDocumento', index: 'tipoDocumento', width: 100, align: 'center' },
                {
                    name: 'nroComprobante',
                    index: 'nroComprobante',
                    width: 130,
                    align: 'center',
                    formatter: function(value, options, rData) {
                        return "<a href='#' style='color:#08088A;' title='Vista Preliminar: " + rData[9] + "' name='" + value + "' id='" + rData[0] + "' onclick='Ver_Detalle(this.id);' style='height:22px'>" + value + "</a>";;
                    }
                },
                { name: 'nroComp2', index: 'nroComp2', width: 20, align: 'center', hidden: true },
                { name: 'idEmpleado', index: 'idEmpleado', width: 30, hidden: true },
                {
                    name: 'empleado',
                    index: 'empleado',
                    width: 180,
                    align: 'left'
                },
                { name: 'importeTotal', index: 'importeTotal', width: 80, align: 'right', resizable: false, formatter: 'currency', formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 } },
                { name: 'montoCobrado', index: 'montoCobrado', width: 110, align: 'right', resizable: false, formatter: 'currency', formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 } },
                { name: 'idEstadoCobro', index: 'idEstadoCobro', width: 30, hidden: true },
                { name: 'estadoCobro', index: 'estadoCobro', width: 120, align: 'center' },
                //                    { name: 'estadoContable', index: 'idCronogramaPago', width: 100 },
                { name: 'observacion', index: 'observacion', width: 130, align: 'left' }
            ],
            pager: '#pager',
            viewrecords: true,
            sortable: true,
            viewsortcols: [true, 'vertical', true],
            hidegrid: false,
            gridview: true,
            rownumbers: true,
            height: $(window).height() - 285,
            width: 950,
            //        width: $(window).width() - 70,
            rowNum: inFilas,
            rowList: ArrayPaginacion,
            shrinkToFit: false,
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
                id: "id"
            },
            multiselect: true,
            onSelectRow: function(id, select, item) {

            },
            onSelectAll: function(aRowids, status) {
            }

        }).navGrid("#pager", { edit: false, add: false, search: false, del: false });


}

function LimpiarControles() {
//    $("#grid").jqGrid("clearGridData");
    $("#txtEmpleado").val("");
    $("#hdfCodEmpleado").val("");
    $("#txtNroDoc").val("");
    $("#dwTipoProceso").val(-1);
    $("#dwTipoComp").val(-1);
    $("#dwEstado").val(-1);

    if ($("#txtPeriodo").val() == "") {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var output =  (month < 10 ? '0' : '') + month + '/' + d.getFullYear();
        $("#txtPeriodo").val(output);
    }
    


    $("#grid").trigger("reloadGrid"); 

    $("#txtEmpleado").focus("");
}

function Ver_Detalle(id) {
    var tipoRep = 'RepComprobantePdf';
    var row = $("#grid").getRowData(id);
    var pagina = "../../Administrar/Adm_Reporte.aspx?Tipo=" + tipoRep + "&vcPeriodo=" + vcPeriodo + "&idEmp=" + row.idEmpleado + "&nroComp=" + row.nroComp2;

    $("#ifReporte").hide();

    formulario = $('#dvVisPre').dialog({
        title: "Vista Preliminar del Documento",
        width: 880,
        height: $(window).height() - 40,
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

//    fn_mdl_muestraForm(pagina, null, "Vista Preliminar", 890, 590);
}

function fn_mdl_muestraForm(pURL, pFuncion, pTitulo, pAncho, pAlto) {
    if (!pTitulo) { pTitulo = ''; }

    $("#dvVisPre").append("<div id='dv_ModalFrame'></div>");
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

function fnShowIframe() {
    $("#ifReporte").show();
}