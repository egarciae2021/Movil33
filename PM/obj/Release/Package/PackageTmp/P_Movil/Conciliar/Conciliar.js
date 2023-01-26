var oCulturaUsuario;
var tbConciliacion;
var hdfGenerico;

function fnFormatoNumeroGrilla(cellval, opts, rData) {
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

    if (rData.Conciliado == 'SI') {
        return '<span class="cellConciliado">' + NumeroFormateado + '</span>';
    }
    else {
        return NumeroFormateado;
    }
}

var ModeloColumnas_AnalisisFyC = [
            { name: 'NombreGrilla', hidden: true },
            { name: 'CuentaPadre', label: 'Cuenta', index: 'CuentaPadre', width: 120, hidden: false, align: "right" },
            { name: 'NumeroDeTelefono', label: 'Número', index: 'NumeroDeTelefono', width: 120, align: "right", hidden: false },

            { name: 'PlanyServiciosContratados', label: 'Plan y Srv. Contratados', index: 'PlanyServiciosContratados', width: 120, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla },
            { name: 'ConsumosAdicionalesNacionales', label: 'Consumos Adicionales Nac.', index: 'ConsumosAdicionalesNacionales', width: 120, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla },
            { name: 'ConsumosAdicionalesInternacionalesyMundiales', label: 'Consumos Adicionales Int.', index: 'ConsumosAdicionalesInternacionalesyMundiales', width: 120, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla },
            { name: 'ServiciosComplementarios', label: 'Srv. Complementarios', index: 'ServiciosComplementarios', width: 120, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla },
            { name: 'Ajustes', label: 'Ajustes', index: 'Ajustes', width: 120, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla },
            { name: 'Descuentos', label: 'Descuentos', index: 'Descuentos', width: 120, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla },
            { name: 'ServiciosySuscripcionesTelcel', label: 'Srv. Suscripciones Telcel', index: 'ServiciosySuscripcionesTelcel', width: 120, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla },
            { name: 'ServiciosySuscripcionesTerceros', label: 'Srv. Suscripciones Terceros', index: 'ServiciosySuscripcionesTerceros', width: 120, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla },
            { name: 'EquipoCelular', label: 'Equipo Celular', index: 'EquipoCelular', width: 120, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla },
            { name: 'ServiciosPorCuentayOrdenDeTerceros', label: 'Srv. Cuenta Terceros', index: 'ServiciosPorCuentayOrdenDeTerceros', width: 120, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla },

            { name: 'PlanyServiciosContratados_D', label: 'Plan y Srv. Contratados', index: 'PlanyServiciosContratados_D', width: 120, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla },
            { name: 'ConsumosAdicionalesNacionales_D', label: 'Consumos Adicionales Nac.', index: 'ConsumosAdicionalesNacionales_D', width: 120, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla },
            { name: 'ConsumosAdicionalesInternacionalesyMundiales_D', label: 'Consumos Adicionales Int.', index: 'ConsumosAdicionalesInternacionalesyMundiales_D', width: 120, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla },
            { name: 'ServiciosComplementarios_D', label: 'Srv. Complementarios', index: 'ServiciosComplementarios_D', width: 120, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla },
            { name: 'Ajustes_D', label: 'Ajustes', index: 'Ajustes_D', width: 120, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla },
            { name: 'Descuentos_D', label: 'Descuentos', index: 'Descuentos_D', width: 120, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla },
            { name: 'ServiciosySuscripcionesTelcel_D', label: 'Srv. Suscripciones Telcel', index: 'ServiciosySuscripcionesTelcel_D', width: 120, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla },
            { name: 'ServiciosySuscripcionesTerceros_D', label: 'Srv. Suscripciones Terceros', index: 'ServiciosySuscripcionesTerceros_D', width: 120, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla },
            { name: 'EquipoCelular_D', label: 'Equipo Celular', index: 'EquipoCelular_D', width: 120, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla },
            { name: 'ServiciosPorCuentayOrdenDeTerceros_D', label: 'Srv. Cuenta Terceros', index: 'ServiciosPorCuentayOrdenDeTerceros_D', width: 120, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla },
            {
                name: 'Detalle', label: ' ', index: 'Detalle', width: 25, align: "center",
                formatter: function (value, options, rData) {
                    var Id = "'" + options.rowId + "'";
                    var Tipo = "'numero'";
                    var Grilla = "'grid_AnalisisFyC'";
                    return '<img style="cursor: pointer;" onclick="javascript:Detalle_Click(' + Grilla + ',' + Tipo + ',' + Id + ');" src="../../Common/Images/Mantenimiento/Ampliar_16x16.png" />';
                }
            },
            { name: 'Conciliado', label: 'Conciliado', index: 'Conciliado', width: 65, hidden: false, align: "center" }
];

var Columnas_AnalisisFyC = ['PlanyServiciosContratados', 'ConsumosAdicionalesNacionales', 'ConsumosAdicionalesInternacionalesyMundiales',
                            'ServiciosComplementarios', 'Ajustes', 'Descuentos', 'ServiciosySuscripcionesTelcel', 'ServiciosySuscripcionesTerceros',
                            'EquipoCelular', 'ServiciosPorCuentayOrdenDeTerceros'];

var ModeloColumnas_AnalisisFyCCorte = [
            { name: 'NombreGrilla', hidden: true },
            { name: 'Cuenta_1', label: 'Cuenta', index: 'Cuenta_1', width: 100, hidden: false, align: "right" },
            { name: 'Total_1', label: 'Total', index: 'Total_1', width: 100, align: "right", formatter: "number", sorttype: 'number' },
            {
                name: 'Detalle', label: '', index: 'Detalle', width: 50, align: "center",
                formatter: function (value, options, rData) {
                    if (rData.Cuenta_1 == "")
                        return '';
                    else {
                        var Id = "'" + options.rowId + "'";
                        var Tipo = "'cuenta'";
                        var Grilla = "'grid_AnalisisFyCVSCorte'";
                        return '<img style="cursor: pointer;" onclick="javascript:Detalle_Click(' + Grilla + ',' + Tipo + ',' + Id + ');" src="../../Common/Images/Mantenimiento/Ampliar_16x16.png" />';
                    }
                }
            },
            { name: 'Cuenta_2', label: 'Cuenta', index: 'Cuenta_2', width: 100, hidden: false, align: "right" },
            { name: 'Total_2', label: 'Total', index: 'Total_2', width: 100, align: "right", formatter: "number", sorttype: 'number' },
            { name: 'Diferencia', label: 'Diferencia', index: 'Diferencia', width: 100, align: "right", formatter: "number", sorttype: 'number' },
            { name: 'Observacion', label: 'Observación', index: 'Observacion', width: 300, align: 'left', classes: 'Observacion' },
            { name: 'Conciliado', label: 'Conciliado', index: 'Conciliado', width: 65, hidden: false, align: "center" },
];

var ModeloColumnas_AnalisisInventarioAdendum = [
            { name: 'Correlativo', hidden: true, align: "right", key: true },
            {
                name: 'Numero_1', label: 'Número', index: 'Numero_1', width: 80, hidden: false, align: "right",
                formatter: function (value, options, rData) {
                    if (rData.Conciliado == 'SI') {
                        return '<span class="cellConciliado">' + rData.Numero_1 + '</span>';
                    }
                    else {
                        return rData.Numero_1;
                    }
                }
            },
            {
                name: 'Cuenta_1', label: 'Cuenta', index: 'Cuenta_1', width: 70, align: "right",
                formatter: function (value, options, rData) {
                    if (rData.Conciliado == 'SI') {
                        return '<span class="cellConciliado">' + rData.Cuenta_1 + '</span>';
                    }
                    else {
                        return rData.Cuenta_1;
                    }
                }
            },
            {
                name: 'Plan_1', label: 'Plan', index: 'Plan_1', width: 100, align: "left",
                formatter: function (value, options, rData) {
                    if (rData.Conciliado == 'SI') {
                        return '<span class="cellConciliado">' + rData.Plan_1 + '</span>';
                    }
                    else {
                        return rData.Plan_1;
                    }
                }
            },
            {
                name: 'Equipo_1', label: 'Equipo', index: 'Equipo_1', width: 100, align: "left",
                formatter: function (value, options, rData) {
                    if (rData.Conciliado == 'SI') {
                        return '<span class="cellConciliado">' + rData.Equipo_1 + '</span>';
                    }
                    else {
                        return rData.Equipo_1;
                    }
                }
            },
            {
                name: 'Numero_2', label: 'Número', index: 'Numero_2', width: 80, hidden: false, align: "right",
                formatter: function (value, options, rData) {
                    if (rData.Conciliado == 'SI') {
                        return '<span class="cellConciliado">' + rData.Numero_2 + '</span>';
                    }
                    else {
                        return rData.Numero_2;
                    }
                }
            },
            {
                name: 'Cuenta_2', label: 'Cuenta', index: 'Cuenta_2', width: 70, align: "right",
                formatter: function (value, options, rData) {
                    if (rData.Conciliado == 'SI') {
                        return '<span class="cellConciliado">' + rData.Cuenta_2 + '</span>';
                    }
                    else {
                        return rData.Cuenta_2;
                    }
                }
            },
            {
                name: 'Plan_2', label: 'Plan', index: 'Plan_2', width: 100, align: "left",
                formatter: function (value, options, rData) {
                    if (rData.Conciliado == 'SI') {
                        return '<span class="cellConciliado">' + rData.Plan_2 + '</span>';
                    }
                    else {
                        return rData.Plan_2;
                    }
                }
            },
            {
                name: 'Equipo_2', label: 'Equipo', index: 'Equipo_2', width: 100, align: "left",
                formatter: function (value, options, rData) {
                    if (rData.Conciliado == 'SI') {
                        return '<span class="cellConciliado">' + rData.Equipo_2 + '</span>';
                    }
                    else {
                        return rData.Equipo_2;
                    }
                }
            },
            {
                name: 'Observacion', label: 'Observación', index: 'Observacion', width: 200, align: 'left', classes: 'Observacion',
                formatter: function (value, options, rData) {
                    if (rData.Conciliado == 'SI') {
                        return '<span class="cellConciliado">' + rData.Observacion + '</span>';
                    }
                    else {
                        return rData.Observacion;
                    }
                }
            },
            {
                name: 'Conciliado', label: 'Conciliado', index: 'Conciliado', width: 65, hidden: false, align: "center",
                formatter: function (value, options, rData) {
                    if (rData.Conciliado == 'SI') {
                        return '<span class="cellConciliado">' + rData.Conciliado + '</span>';
                    }
                    else {
                        return rData.Conciliado;
                    }
                }
            },
];


var ModeloColumnas_Multiple_PlantaVSFyC = [
            { name: 'Correlativo', hidden: true, align: "right", key: true },
            {
                name: 'Numero_1', label: 'Número', index: 'Numero_1', width: 100, hidden: false, align: "right",
                formatter: function (value, options, rData) {
                    if (rData.Conciliado == 'SI') {
                        return '<span class="cellConciliado">' + rData.Numero_1 + '</span>';
                    }
                    else {
                        return rData.Numero_1;
                    }
                }
            },
            {
                name: 'MontoPlan_1', label: 'Monto Plan', index: 'MontoPlan_1', width: 100, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla
            },
            {
                name: 'NumeroDeTelefono', label: 'Número', index: 'NumeroDeTelefono', width: 100, hidden: false, align: "right",
                formatter: function (value, options, rData) {
                    if (rData.Conciliado == 'SI') {
                        return '<span class="cellConciliado">' + rData.NumeroDeTelefono + '</span>';
                    }
                    else {
                        return rData.NumeroDeTelefono;
                    }
                }
            },
            {
                name: 'MontoPlan_2', label: 'Monto Plan', index: 'MontoPlan_2', width: 100, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla
            },
            {
                name: 'Detalle', label: '', index: 'Detalle', width: 50, align: "center",
                formatter: function (value, options, rData) {
                    if (rData.NumeroDeTelefono == "")
                        if (rData.Conciliado == 'SI') {
                            return '<span class="cellConciliado"></span>';
                        }
                        else {
                            return '';
                        }
                    else {
                        var Id = "'" + options.rowId + "'";
                        var Tipo = "'numero'";
                        var Grilla = "'grid_AnalisisPlantaVSFyC'";
                        if (rData.Conciliado == 'SI') {
                            return '<span class="cellConciliado"><img style="cursor: pointer;" onclick="javascript:Detalle_Click(' + Grilla + ',' + Tipo + ',' + Id + ');" src="../../Common/Images/Mantenimiento/Ampliar_16x16.png" /></span>';
                        }
                        else {
                            return '<img style="cursor: pointer;" onclick="javascript:Detalle_Click(' + Grilla + ',' + Tipo + ',' + Id + ');" src="../../Common/Images/Mantenimiento/Ampliar_16x16.png" />';
                        }
                    }
                }
            },
            {
                name: 'Observacion', label: 'Observación', index: 'Observacion', width: 300, align: 'left', classes: 'Observacion',
                formatter: function (value, options, rData) {
                    if (rData.Conciliado == 'SI') {
                        return '<span class="cellConciliado">' + rData.Observacion + '</span>';
                    }
                    else {
                        return rData.Observacion;
                    }
                }
            },
            {
                name: 'Conciliado', label: 'Conciliado', index: 'Conciliado', width: 65, hidden: false, align: "center",
                formatter: function (value, options, rData) {
                    if (rData.Conciliado == 'SI') {
                        return '<span class="cellConciliado">' + rData.Conciliado + '</span>';
                    }
                    else {
                        return rData.Conciliado;
                    }
                }
            },
];


var ModeloColumnas_Multiple_SolicitudesVSFyC = [
            { name: 'Correlativo', hidden: true, align: "right", key: true },
            {
                name: 'Solicitud', width: 120, hidden: false, align: "left",
                formatter: function (value, options, rData) {
                    if (rData.Conciliado == 'SI') {
                        return '<span class="cellConciliado">' + rData.Solicitud + '</span>';
                    }
                    else {
                        return rData.Solicitud;
                    }
                }
            },
            {
                name: 'Codigo', label: 'Código', width: 120, hidden: false, align: "left",
                formatter: function (value, options, rData) {
                    if (rData.Conciliado == 'SI') {
                        return '<span class="cellConciliado">' + rData.Codigo + '</span>';
                    }
                    else {
                        return rData.Codigo;
                    }
                }
            },
            {
                name: 'Fecha', width: 120, hidden: false, align: "center",
                formatter: function (value, options, rData) {
                    if (rData.Conciliado == 'SI') {
                        return '<span class="cellConciliado">' + rData.Fecha + '</span>';
                    }
                    else {
                        return rData.Fecha;
                    }
                }
            },
            {
                name: 'NumeroDeTelefono', label: 'Número', index: 'Numero_1', width: 80, hidden: false, align: "right",
                formatter: function (value, options, rData) {
                    if (rData.Conciliado == 'SI') {
                        return '<span class="cellConciliado">' + rData.NumeroDeTelefono + '</span>';
                    }
                    else {
                        return rData.NumeroDeTelefono;
                    }
                }
            },
            {
                name: 'Monto_Solicitud', label: 'Total', index: 'Total_1', width: 80, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla
            },
            {
                name: 'Detalle', label: '', index: 'Detalle', width: 50, align: "center",
                formatter: function (value, options, rData) {

                    var Id = "'" + options.rowId + "'";
                    var Tipo = "'solicitud'";
                    var Grilla = "'grid_AnalisisSolicitudesVSFyC'";

                    if (rData.Conciliado == 'SI') {
                        return '<span class="cellConciliado"><div> <img style="cursor: pointer;" onclick="javascript:Detalle_Click(' + Grilla + ',' + Tipo + ',' + Id + ');" src="../../Common/Images/Mantenimiento/Ampliar_16x16.png" /> </div></span>';
                    }
                    else {
                        return '<img style="cursor: pointer;" onclick="javascript:Detalle_Click(' + Grilla + ',' + Tipo + ',' + Id + ');" src="../../Common/Images/Mantenimiento/Ampliar_16x16.png" />';
                    }

                }
            },
            {
                name: 'Monto_FyC', label: 'Total', index: 'Total_2', width: 80, align: "right", sorttype: 'number', formatter: fnFormatoNumeroGrilla
            },
            {
                name: 'Detalle', label: '', index: 'Detalle', width: 50, align: "center",
                formatter: function (value, options, rData) {
                    var Id = "'" + options.rowId + "'";
                    var Tipo = "'numero'";
                    var Grilla = "'grid_AnalisisSolicitudesVSFyC'";

                    if (rData.Conciliado == 'SI') {
                        return '<span class="cellConciliado"><div> <img style="cursor: pointer;" onclick="javascript:Detalle_Click(' + Grilla + ',' + Tipo + ',' + Id + ');" src="../../Common/Images/Mantenimiento/Ampliar_16x16.png" /> </div></span>';
                    }
                    else {
                        return '<div> <img style="cursor: pointer;" onclick="javascript:Detalle_Click(' + Grilla + ',' + Tipo + ',' + Id + ');" src="../../Common/Images/Mantenimiento/Ampliar_16x16.png" /> </div>';
                    }
                }
            },
            {
                name: 'Conciliado', label: 'Conciliado', index: 'Conciliado', width: 65, hidden: false, align: "center",
                formatter: function (value, options, rData) {
                    if (rData.Conciliado == 'SI') {
                        return '<span class="cellConciliado">' + rData.Conciliado + '</span>';
                    }
                    else {
                        return rData.Conciliado;
                    }
                }
            },
            { name: 'IdSolicitud', hidden: true },
            { name: 'IdTipoSolicitud', hidden: true }
];

//#region "Funciones Generales"
function checkperiodo(m, y) {
    if (m > 0 && m < 13 && y > 0 && y < 32768) {
        var d = new Date();
        return d.getDate();
    }
}
//#endregion

$(function () {

    hdfGenerico = $("#hdfGenerico").val();

    oCulturaUsuario = window.parent.parent.oCulturaUsuario;

    Inicio();
    CargarTabs();
    CargarDisenoGrilla();

    $(window).resize(function (a, c) {
        DimPosElementos();
    });


});

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();

    var Valor = (Ancho - 810 - 40 - 200) / 2;
    $("#grid_AnalisisFyC").setGridHeight(Alto - 370);
    $("#grid_AnalisisFyC").jqGrid("setColWidth", 3, Valor);
    $("#grid_AnalisisFyC").jqGrid("setColWidth", 4, Valor);
    $("#grid_AnalisisFyC").setGridWidth(Ancho - 115);

    $("#grid_AnalisisFyCVSCorte").setGridHeight(Alto - 350);
    $("#grid_AnalisisFyCVSCorte").jqGrid("setColWidth", 9, Ancho - 1093);
    $("#grid_AnalisisFyCVSCorte").setGridWidth(Ancho - 350);

    $("#grid_AnalisisPlantaVSAdendum").setGridHeight(Alto - 350);
    if (Ancho - 1252 >= 0) {
        $("#grid_AnalisisPlantaVSAdendum").jqGrid("setColWidth", 11, Ancho - 1252);
    }
    $("#grid_AnalisisPlantaVSAdendum").setGridWidth(Ancho - 350);

    $("#grid_AnalisisPlantaVSFyC").setGridHeight(Alto - 350 - 100);
    $("#grid_AnalisisPlantaVSFyC").jqGrid("setColWidth", 8, Ancho - 990);
    $("#grid_AnalisisPlantaVSFyC").setGridWidth(Ancho - 350);


    Valor = (Ancho - 424 - 40 - 200) / 3;
    $("#grid_AnalisisSolicitudesVSFyC").setGridHeight(Alto - 360 - 50);
    $("#grid_AnalisisSolicitudesVSFyC").jqGrid("setColWidth", 3, Valor);
    $("#grid_AnalisisSolicitudesVSFyC").jqGrid("setColWidth", 4, Valor);
    $("#grid_AnalisisSolicitudesVSFyC").jqGrid("setColWidth", 6, Valor);
    $("#grid_AnalisisSolicitudesVSFyC").setGridWidth(Ancho - 105);
    //$("#grid_AnalisisSolicitudesVSFyC").jqGrid("setColWidth", 2, Ancho - 1118);
    //$("#grid_AnalisisSolicitudesVSFyC").jqGrid("setColWidth", 8, Ancho - 540);
}

function Inicio() {

    $(".btnNormal").button({});

    //$(".btnExportarExcel").click(function () {
    //    alerta("Aquí se descargará el reporte Excel...");
    //});

    $("#btnConciliarFyC").click(function () {
        btnConciliarFyC_click('C');
    });

    $("#btnDesconciliarFyC").click(function () {
        confirmacion("Se cancelarán los registros conciliados.<br>¿Desea continuar?", function () {
            btnConciliarFyC_click('D');
        });
    });

    $("#btnExportarFyC").click(function () {
        JqGrid_ExportarExcel("grid_AnalisisFyC", "Reporte_FyC", true);
    });

    $("#btnConciliarFyCCorte").click(function () {
        btnConciliarFyCCorte_click('C');
    });
    $("#btnDesconciliarFyCCorte").click(function () {
        confirmacion("Se cancelarán los registros conciliados.<br>¿Desea continuar?", function () {
            btnConciliarFyCCorte_click('D');
        });
    });

    $("#btnExportarFyCCorte").click(function () {
        JqGrid_ExportarExcel("grid_AnalisisFyCVSCorte", "Reporte_FyCCorte", true);
    });

    $("#btnConciliarInventarioAdendum").click(function () {
        btnConciliarInventarioAdendum_click('C');
    });
    $("#btnDesconciliarInventarioAdendum").click(function () {
        confirmacion("Se cancelarán los registros conciliados.<br>¿Desea continuar?", function () {
            btnConciliarInventarioAdendum_click('D');
        });
    });
    $("#btnExportarInventarioAdendum").click(function () {
        JqGrid_ExportarExcel("grid_AnalisisPlantaVSAdendum", "Reporte_InventarioAdendum", true);
    });

    $("#btnConciliarInventarioFyC").click(function () {
        btnConciliarInventarioFyC_click('C');
    });
    $("#btnDesconciliarInventarioFyC").click(function () {
        confirmacion("Se cancelarán los registros conciliados.<br>¿Desea continuar?", function () {
            btnConciliarInventarioFyC_click('D');
        });
    });
    $("#btnExportarInventarioFyC").click(function () {
        JqGrid_ExportarExcel("grid_AnalisisPlantaVSFyC", "Reporte_InventarioFyC", true);
    });

    $("#btnConciliarSolicitudFyC").click(function () {
        btnConciliarSolicitudFyC_click('C');
    });
    $("#btnDesconciliarSolicitudFyC").click(function () {
        confirmacion("Se cancelarán los registros conciliados.<br>¿Desea continuar?", function () {
            btnConciliarSolicitudFyC_click('D');
        });
    });
    $("#btnExportarSolicitudFyC").click(function () {
        JqGrid_ExportarExcel("grid_AnalisisSolicitudesVSFyC", "Reporte_SolicitudFyC", true);
    });

    $("#btnEnviarValidacion").click(function () {
        btnEnviarValidacion_click();
    });

    $("#cboFiltroConciliado_FyC").change(function () {
        CargarDatosGrilla_AnalisisFyC_Filtro();
    });
    $("#cboFiltroConciliado_FyCCorte").change(function () {
        CargarDatosGrilla_AnalisisFyCCortes_Filtro();
    });
    $("#cboFiltroConciliado_InventarioAdendum").change(function () {
        CargarDatosGrilla_AnalisisInventarioAdendum_Filtro();
    });
    $("#cboFiltroConciliado_InventarioFyC").change(function () {
        CargarDatosGrilla_AnalisisInventarioFyC_Filtro();
    });
    $("#cboFiltroConciliado_SolicitudFyC").change(function () {
        CargarDatosGrilla_AnalisisSolicitudFyC_Filtro();
    });


    $("#txtFiltroNumero_FyCCorte").keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            CargarDatosGrilla_AnalisisFyCCortes_Filtro();
        }
    });
    $("#txtFiltroNumero_InventarioAdendum").keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            CargarDatosGrilla_AnalisisInventarioAdendum_Filtro();
        }
    });
    $("#txtFiltroNumero_FyC").keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            CargarDatosGrilla_AnalisisFyC_Filtro();
        }
    });
    $("#txtFiltroNumero_InventarioFyC").keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            CargarDatosGrilla_AnalisisInventarioFyC_Filtro();
        }
    });
    $("#txtFiltroNumero_SolicitudFyC").keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            CargarDatosGrilla_AnalisisSolicitudFyC_Filtro();
        }
    });



    $("#txtPeriodo").keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
        }
    });

    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false,
        autoWidth: false
    });


    var today = new Date();
    $(".MESANHO").removeClass("ui-widget-content ui-corner-all");
    $(".MESANHO").css("padding", "0px");
    $(".MESANHO").css("margin", "0px");
    $(".MESANHO").kendoDatePicker({
        culture: "es-ES",
        animation: false,
        start: "year",
        depth: "year",
        format: "MM/yyyy",
        max: new Date(today.setDate(today.getDate()))
    });

    $("#btnConciliar").click(btnConciliar_Click);




    tbConciliacion = $("#tbConciliacion").tabs({
        //tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remover Tab</span></li>",
        //add: function (event, ui) {
        //    var ifra = document.createElement('IFRAME');
        //    ifra.width = "100%";
        //    ifra.height = "100%";
        //    ifra.setAttribute("margin-top", "0px");
        //    ifra.setAttribute("margin-left", "0px");
        //    ifra.setAttribute("margin-bottom", "0px");
        //    ifra.setAttribute("margin-right", "0px");
        //    ifra.setAttribute("padding-top", "0px");
        //    ifra.setAttribute("padding-left", "0px");
        //    ifra.setAttribute("padding-bottom", "0px");
        //    ifra.setAttribute("padding-right", "0px");
        //    ifra.src = pagina;
        //    ifra.frameBorder = "0";
        //    ifra.className = "SinBordes";
        //    $(ui.panel).append(ifra);
        //    $(this).tabs('select', '#' + ui.panel.id);
        //    pagina = "";
        //}
    });


    //CargarDisenoGrilla("grid_AnalisisFyC", ModeloColumnas_AnalisisFyC);

    CargarDisenoGrilla_GroupColumn("grid_AnalisisFyC", ModeloColumnas_AnalisisFyC, "Principal", "Detalle", "PlanyServiciosContratados", "PlanyServiciosContratados_D", 10, 10);
    CargarDisenoGrilla_GroupColumn("grid_AnalisisFyCVSCorte", ModeloColumnas_AnalisisFyCCorte, "Fact", "Cortes", "Cuenta_1", "Cuenta_2", 3, 2);
    CargarDisenoGrilla_GroupColumn("grid_AnalisisPlantaVSAdendum", ModeloColumnas_AnalisisInventarioAdendum, "Adendum", "Inventario", "Numero_1", "Numero_2", 4, 4);
    CargarDisenoGrilla_GroupColumn("grid_AnalisisPlantaVSFyC", ModeloColumnas_Multiple_PlantaVSFyC, "Inventario", "Fact", "Numero_1", "NumeroDeTelefono", 2, 3);
    CargarDisenoGrilla_GroupColumn("grid_AnalisisSolicitudesVSFyC", ModeloColumnas_Multiple_SolicitudesVSFyC, "Solicitud", "Fact", "Solicitud", "Monto_FyC", 6, 2);

    //Centrar columnas...
    $("th[role='columnheader']").css("text-align", "center");

    DimPosElementos();

}

function CargarTabs() {
    if (hdfGenerico == "1") {
        $('[href="#tbAnalisisFyC"]').closest('li').hide();
        $('#tbAnalisisFyC').hide();
        $('[href="#tbFyCCortes"]').closest('li').hide();
        $('#tbFyCCortes').hide();
        $('[href="#tbPlantaAdendum"]').closest('li').hide();
        $('#tbPlantaAdendum').hide();

        $('[href="#tbSolicitudesFyC"]').closest('li').hide(); //Temporal
        $('#tbSolicitudesFyC').hide();//Temporal

        $("#tbConciliacion").tabs({ selected: 3 });
    }
}

function CargarDisenoGrilla(grilla, _ModeloColumnas) {
    $("#" + grilla).jqGrid({
        sortable: false,
        loadonce: true,
        loadui: 'disable',
        datatype: "local",
        colModel: _ModeloColumnas,
        cellEdit: true,
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        //width: 750,
        height: 230,
        viewrecords: true,
        multiselect: true,
        //sortorder: "asc",
        rownumbers: true,
        shrinkToFit: false,
        //autowidth: true,
        gridComplete: function () {
            $("#grid").jqGrid('hideCol', 'cb');
            $("#btnActivar").button("option", "disabled", true);
            $("#pager_left").css('width', 'auto');
        },
        onSelectRow: function (id, select, item) {
        },
        resizeStop: function (width, index) {
        },
        afterInsertRow: function (rowid, aData, rowelem) {

            ////var colModels;
            ////var i;
            ////if (aData.Observacion != '') {
            ////    colModels = $("#grid").getGridParam("colModel");
            ////    //alert(colModels.length);
            ////    for (i = 0; i < colModels.length; i++) {
            ////        $("#grid").jqGrid('setCell', rowid, i, '', { color: 'red', padding: '1px' });
            ////        //$("#grid").jqGrid('setCell', rowid, i, '', "ui-state-error-text");
            ////    }
            ////}

        },
        ondblClickRow: function (id) {
        },
        beforeSelectRow: function (rowid, e) {
            return true;
        }
    }).navGrid("#pager", { edit: true, add: false, search: false, del: false });

    $("#" + grilla).jqGrid("clearGridData", true).trigger("reloadGrid");

}

function CargarDisenoGrilla_GroupColumn(grilla, _ModeloColumnas, TituloIzquierda, TituloDerecha, Columna1, Columna2, Longitud1, Longitud2) {

    var Ancho = 0;
    var _multiselect = false;
    //alert(grilla);
    if (grilla == "grid_AnalisisSolicitudesVSFyC") {
        Ancho = 1050;
        _multiselect = true;
    }
    else {
        Ancho = 900;
        _multiselect = true;
    }

    $("#" + grilla).jqGrid({
        sortable: true,
        loadonce: true,
        loadui: 'disable',
        datatype: "local",
        colModel: _ModeloColumnas,
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        height: "100%",
        viewrecords: true,
        rowNum: 9007199254740992,
        multiselect: _multiselect,
        rownumbers: true,
        shrinkToFit: false,
        autowidth: true,
        rowNum: 20,
        rowList: [20, 50, 100, 1000, 5000],
        pager: "#pager_" + grilla, //Pager.
        afterInsertRow: afterInsertRow_Grilla,
        beforeSelectRow: function (rowid, e) {
            return true;
        }
    }).navGrid("#pager_" + grilla, { edit: false, add: false, search: false, del: false });

    $("#" + grilla).jqGrid('setGroupHeaders', {
        useColSpanStyle: false,
        groupHeaders: [
          { startColumnName: Columna1, numberOfColumns: Longitud1, titleText: TituloIzquierda },
          { startColumnName: Columna2, numberOfColumns: Longitud2, titleText: TituloDerecha }
        ]
    });

    $("#" + grilla).jqGrid("clearGridData", true).trigger("reloadGrid");

}

function btnConciliar_Click() {
    var vcPeriodo = $("#txtPeriodo").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
    var vcOperador = $("#ddlOperador").val();
    if ($.trim(vcPeriodo) == "") {
        alerta("Seleccione el periodo");
        $("#txtPeriodo").focus();
        return;
    }
    if (vcPeriodo.length < 7 || vcPeriodo.split("/").length != 2) {
        alerta("El periodo no tiene el formato correcto MM/yyyy .");
        $("#txtPeriodo").focus();
        return;
    }
    mPer = vcPeriodo.substr(0, 2);
    yPer = vcPeriodo.substr(3, 4);
    if (!checkperiodo(mPer, yPer)) {
        alerta("El periodo es inválido.");
        $("#txtPeriodo").focus();
        return;
    }

    if ($.trim(vcOperador) == "" || $.trim(vcOperador) == "-1") {
        alerta("Seleccione el operador");
        $("#ddlOperador").focus();
        return;
    }

    $("#btnEnviarValidacion").hide();
    $("#trFilaConciliacion").hide();
    CargarDatosGrilla_AnalisisFyC();

}

function Detalle_Click(Grilla, Tipo, IdFila) {
    var Valor, Titulo, Alto, Ancho;
    if (Tipo == "numero") {
        Valor = $("#" + Grilla).jqGrid('getCell', IdFila, 'NumeroDeTelefono');
    }
    else if (Tipo == "cuenta") {
        Valor = $("#" + Grilla).jqGrid('getCell', IdFila, 'Cuenta_1');
    }
    else if (Tipo == "solicitud") {
        Valor = $("#" + Grilla).jqGrid('getCell', IdFila, 'Codigo');
    }
    Valor = Valor.replace('<span class="cellConciliado">', '');
    Valor = Valor.replace('</span>', '');
    if (Tipo == "solicitud") {
        var IdSolicitud = $("#" + Grilla).jqGrid('getCell', IdFila, 'IdSolicitud');
        var IdTipoSolicitud = $("#" + Grilla).jqGrid('getCell', IdFila, 'IdTipoSolicitud');
        $("#ifDetalle").attr("src", "../Administrar/Solicitudes/Adm_ProcesarSolicitud.aspx?concilia=1&Cod=" + IdSolicitud + "&inTipSol=" + IdTipoSolicitud + "&inEst=7&vcCodEmp=&biAdmin=0&biTecnico=0&biResApr=0&inEst_Apr=&vcTabla=&biEscalamiento=");
        Titulo = "Solicitud: " + Valor;
        Alto = 720;
        Ancho = 800;
    }
    else {
        //$("#ifDetalle").attr("src", "DetalleFacturacion.aspx?valor=" + Valor + "&tipo=" + Tipo);
        var vcPeriodo = $("#txtPeriodo").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
        vcPeriodo = vcPeriodo.substring(3) + vcPeriodo.substring(0, 2) + "01";
        $("#ifDetalle").attr("src", "DetalleFacturacion.aspx?valor=" + Valor + "&tipo=" + Tipo + "&vista=1&generico=" + hdfGenerico + "&periodo=" + vcPeriodo);
        Titulo = "Detalle Fact.";
        Alto = 480 + 100;
        Ancho = 800;
    }
    $("#ifDetalle").width(Ancho - 20);
    $("#ifDetalle").height(Alto - 90);


    window.top.MostrarLoading();
    $("#ifDetalle").unbind("load");
    //Utilizado, para mostrar el modal solo cuando ya ha sido cargado.
    $('#ifDetalle').load(function () {
        window.top.OcultarLoading();
        $('#dvDetalle').dialog({
            title: Titulo,
            modal: true,
            width: Ancho,
            height: Alto,
            resizable: false,
            buttons: {
                "Cerrar": function () {
                    $(this).dialog("close");
                }
            }
        });
    });

    

    $('#dvDetalle').css("overflow", "hidden");
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

