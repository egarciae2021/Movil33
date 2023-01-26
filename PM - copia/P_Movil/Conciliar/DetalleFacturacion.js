var hdfGenerico;

$(function () {
    hdfGenerico = $("#hdfGenerico").val();
    CargarDisenoGrilla();
    CargarDatosGrilla();
});

function CargarDatosGrilla() {
    if (typeof DatosGrilla == 'undefined') {
        return;
    }
    $("#lblNumero").html(Numero);
    if (Numero == "-") {
        $("#lblCuenta2").html(Cuenta);
        $(".FilaNumero").hide();
        $(".FilaCuenta").show();
    }
    else {
        $(".FilaNumero").show();
        $(".FilaCuenta").hide();
        if (DatosGrilla[0].length > 0) {
            $("#lblCuenta").html(DatosGrilla[0][0].Cuenta);
            $("#lblEmpleado").html(DatosGrilla[0][0].Empleado);
            $("#lblArea").html(DatosGrilla[0][0].Area);
        }
        else {
            $("#lblCuenta").html("(Sin Asignar)");
            $("#lblEmpleado").html("(Sin Asignar)");
            $("#lblArea").html("(Sin Asignar)");
        }
    }
    var iFila = 0;
    var FilaDato;
    //PlanyServiciosContratados..
    if (hdfGenerico == "1") {
        for (var i = 0; i < DatosGrilla[1].length; i++) {
            FilaDato = { "Id": i, "Concepto": DatosGrilla[1][i].Concepto, "Total": DatosGrilla[1][i].Total };
            $("#grid_DetalleFyC").jqGrid('addRowData', iFila, FilaDato);
        }
    }
    else {

        if (DatosGrilla[1].length > 0) {
            iFila++;
            FilaDato = { "Id": "1", "Concepto": "Plan y Servicios Contratados", "Total": DatosGrilla[1][0].PlanyServiciosContratados };
            $("#grid_DetalleFyC").jqGrid('addRowData', iFila, FilaDato);

            iFila++;
            FilaDato = { "Id": "2", "Concepto": "Consumos Adicionales Nacionales", "Total": DatosGrilla[1][0].ConsumosAdicionalesNacionales };
            $("#grid_DetalleFyC").jqGrid('addRowData', iFila, FilaDato);

            iFila++;
            FilaDato = { "Id": "3", "Concepto": "Consumos Adicionales Internacionales y Mundiales", "Total": DatosGrilla[1][0].ConsumosAdicionalesInternacionalesyMundiales };
            $("#grid_DetalleFyC").jqGrid('addRowData', iFila, FilaDato);

            iFila++;
            FilaDato = { "Id": "4", "Concepto": "Servicios Complementarios", "Total": DatosGrilla[1][0].ServiciosComplementarios };
            $("#grid_DetalleFyC").jqGrid('addRowData', iFila, FilaDato);

            iFila++;
            FilaDato = { "Id": "5", "Concepto": "Ajustes", "Total": DatosGrilla[1][0].Ajustes };
            $("#grid_DetalleFyC").jqGrid('addRowData', iFila, FilaDato);

            iFila++;
            FilaDato = { "Id": "6", "Concepto": "Descuentos", "Total": DatosGrilla[1][0].Descuentos };
            $("#grid_DetalleFyC").jqGrid('addRowData', iFila, FilaDato);

            iFila++;
            FilaDato = { "Id": "7", "Concepto": "Servicios y Suscripciones de Telcel", "Total": DatosGrilla[1][0].ServiciosySuscripcionesTelcel };
            $("#grid_DetalleFyC").jqGrid('addRowData', iFila, FilaDato);

            iFila++;
            FilaDato = { "Id": "8", "Concepto": "Servicios y Suscripciones de Terceros", "Total": DatosGrilla[1][0].ServiciosySuscripcionesTerceros };
            $("#grid_DetalleFyC").jqGrid('addRowData', iFila, FilaDato);

            iFila++;
            FilaDato = { "Id": "9", "Concepto": "Equipo Celular", "Total": DatosGrilla[1][0].EquipoCelular };
            $("#grid_DetalleFyC").jqGrid('addRowData', iFila, FilaDato);

            iFila++;
            FilaDato = { "Id": "10", "Concepto": "Servicios por Cuenta y Orden de Terceros", "Total": DatosGrilla[1][0].ServiciosPorCuentayOrdenDeTerceros };
            $("#grid_DetalleFyC").jqGrid('addRowData', iFila, FilaDato);


            iFila++;
            FilaDato = { "Id": "11", "Concepto": "IVA", "Total": DatosGrilla[1][0].IVA };
            $("#grid_DetalleFyC").jqGrid('addRowData', iFila, FilaDato);
        }
    }
}

function CargarDisenoGrilla() {
    $("#grid_DetalleFyC").jqGrid({
        sortable: false,
        loadonce: true,
        loadui: 'disable',
        datatype: "local",
        colModel: [
            { name: 'Id', label: 'Id', index: 'Id', width: 535, hidden: true, align: "left" },
            { name: 'Concepto', label: 'Concepto', index: 'Concepto', width: 505, hidden: false, align: "left" },
            {
                name: 'Total', label: 'Total ($)', index: 'Total', width: 165, align: "right", hidden: false, formatter: 'number',
                formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
            },
        ],
        cellEdit: true,
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        width: 740,
        rowNum: 9007199254740992,
        height: '100%',
        viewrecords: true,
        multiselect: false,
        rownumbers: true,
        shrinkToFit: false,
        footerrow: true,
        gridComplete: function () {
            var $grid = $('#grid_DetalleFyC');
            var colSum = $grid.jqGrid('getCol', 'Total', false, 'sum');
            $grid.jqGrid('footerData', 'set', { 'Total': colSum });
        },
        //gridComplete: function () {
        //    $("#grid").jqGrid('hideCol', 'cb');
        //    $("#btnActivar").button("option", "disabled", true);
        //    $("#pager_left").css('width', 'auto');
        //},
        beforeSelectRow: function (rowid, e) {
            return true;
        },
        subGrid: (hdfGenerico == "1") ? false : true,
        subGridRowExpanded: function (subgrid_id, row_id) {
            var subgrid_table_id; subgrid_table_id = subgrid_id + "_t";
            $("#" + subgrid_id).html("<table id='" + subgrid_table_id + "' class='scroll'></table>");

            var Columnas;
            var IdConcepto = $("#grid_DetalleFyC").jqGrid('getCell', row_id, 'Id');
            if (IdConcepto == "11") {
                return;
            }

            var IndiceTabla = parseFloat(IdConcepto) + 1;
            switch (IdConcepto) {
                case "1":
                    if (Numero == "-") {
                        Columnas = [{ name: "NumeroDeTelefono", label: "Número", width: 80, key: true },
                                { name: "NumeroDeFactura", label: "Factura", width: 100 },
                                { name: "Concepto", width: 220, align: "left" },
                                {
                                    name: "Incluidos", width: 80, align: "right", formatter: 'number',
                                    formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                },
                                {
                                    name: "Consumidos", width: 80, align: "right", formatter: 'number',
                                    formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                },
                                {
                                    name: "Total", width: 80, align: "right", formatter: 'number',
                                    formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                }];
                    }
                    else {
                        Columnas = [{ name: "NumeroDeFactura", label: "Factura", width: 100, key: true },
                                { name: "Concepto", width: 300, align: "left" },
                                {
                                    name: "Incluidos", width: 80, align: "right", formatter: 'number',
                                    formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                },
                                {
                                    name: "Consumidos", width: 80, align: "right", formatter: 'number',
                                    formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                },
                                {
                                    name: "Total", width: 80, align: "right", formatter: 'number',
                                    formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                }];
                    }

                    break;
                case "2":
                case "3":
                    if (Numero == "-") {
                        Columnas = [{ name: "NumeroDeTelefono", label: "Número", width: 80, key: true },
                                    { name: "NumeroDeFactura", label: "Factura", width: 70 },
                                    { name: "Concepto", width: 150, align: "left" },
                                    {
                                        name: "Costo", width: 60, align: "right", formatter: 'number',
                                        formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                    },
                                    {
                                        name: "Incluidos", width: 70, align: "right", formatter: 'number',
                                        formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                    },
                                    {
                                        name: "Consumidos", width: 70, align: "right", formatter: 'number',
                                        formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                    },
                                    {
                                        name: "Excedentes", width: 70, align: "right", formatter: 'number',
                                        formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                    },
                                    {
                                        name: "Total", width: 60, align: "right", formatter: 'number',
                                        formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                    }];
                    }
                    else {
                        Columnas = [
                                    { name: "NumeroDeFactura", label: "Factura", width: 70, key: true },
                                    { name: "Concepto", width: 170, align: "left" },
                                    {
                                        name: "Costo", width: 70, align: "right", formatter: 'number',
                                        formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                    },
                                    {
                                        name: "Incluidos", width: 80, align: "right", formatter: 'number',
                                        formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                    },
                                    {
                                        name: "Consumidos", width: 80, align: "right", formatter: 'number',
                                        formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                    },
                                    {
                                        name: "Excedentes", width: 80, align: "right", formatter: 'number',
                                        formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                    },
                                    {
                                        name: "Total", width: 70, align: "right", formatter: 'number',
                                        formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                    }];
                    }
                    break;
                case "4":
                    if (Numero == "-") {
                        Columnas = [{ name: "NumeroDeTelefono", label: "Número", width: 80, key: true },
                                    { name: "NumeroDeFactura", label: "Factura", width: 80 },
                                    {
                                        name: "Suscripciones_Eventos", label: "Suscripciones Eventos", width: 90, align: "right", formatter: 'number',
                                        formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                    },
                                    {
                                        name: "Suscripciones_Importe", label: "Suscripciones Importe", width: 90, align: "right", formatter: 'number',
                                        formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                    },
                                    {
                                        name: "Bajo_Demanda_Eventos", label: "Bajo Demanda Eventos", width: 90, align: "right", formatter: 'number',
                                        formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                    },
                                    {
                                        name: "Bajo_Demanda_Importe", label: "Bajo Demanda Importe", width: 90, align: "right", formatter: 'number',
                                        formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                    },
                                    { name: "Total", width: 110, align: "right", formatter: "number" }];
                    }
                    else {
                        Columnas = [{ name: "NumeroDeFactura", label: "Factura", width: 80, key: true },
                                {
                                    name: "Suscripciones_Eventos", label: "Suscripciones Eventos", width: 105, align: "right", formatter: 'number',
                                    formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                },
                                {
                                    name: "Suscripciones_Importe", label: "Suscripciones Importe", width: 105, align: "right", formatter: 'number',
                                    formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                },
                                {
                                    name: "Bajo_Demanda_Eventos", label: "Bajo Demanda Eventos", width: 105, align: "right", formatter: 'number',
                                    formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                },
                                {
                                    name: "Bajo_Demanda_Importe", label: "Bajo Demanda Importe", width: 105, align: "right", formatter: 'number',
                                    formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                },
                                { name: "Total", width: 120, align: "right", formatter: "number" }];
                    }
                    break;
                case "5":
                case "6":
                case "9":
                case "10":
                    if (Numero == "-")
                        Columnas = [{ name: "NumeroDeTelefono", label: "Número", width: 80, key: true },
                                    { name: "NumeroDeFactura", label: "Factura", width: 100 },
                                    { name: "Concepto", width: 293, align: "left" },
                                    {
                                        name: "Total", width: 168, align: "right", formatter: 'number',
                                        formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                    }];
                    else
                        Columnas = [{ name: "NumeroDeFactura", label: "Factura", width: 100, key: true },
                                { name: "Concepto", width: 373, align: "left" },
                                {
                                    name: "Total", width: 168, align: "right", formatter: 'number',
                                    formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                }];
                    break;
                case "7":
                case "8":
                    if (Numero == "-")
                        Columnas = [{ name: "NumeroDeTelefono", label: "Número", width: 80, key: true },
                                    { name: "NumeroDeFactura", label: "Factura", width: 100 },
                                    {
                                        name: "Suscripciones_Eventos", label: "Suscripciones Eventos", width: 70, align: "right", formatter: 'number',
                                        formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                    },
                                    {
                                        name: "Suscripciones_Importe", label: "Suscripciones Importe", width: 70, align: "right", formatter: 'number',
                                        formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                    },
                                    {
                                        name: "BajoDemanda_Eventos", label: "Bajo Demanda Eventos", width: 80, align: "right", formatter: 'number',
                                        formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                    },
                                    {
                                        name: "BajoDemanda_Importe", label: "Bajo Demanda Importe", width: 80, align: "right", formatter: 'number',
                                        formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                    },
                                    { name: "Servicios_Concepto", label: "Servicios Concepto", width: 80 },
                                    {
                                        name: "Servicios_Importe", label: "Servicios Importe", width: 80, align: "right", formatter: 'number',
                                        formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                    },
                                    { name: "Ajustes_Concepto", label: "Ajustes Concepto", width: 80 },
                                    {
                                        name: "Ajustes_Importe", label: "Ajustes Importe", width: 80, align: "right", formatter: 'number',
                                        formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                    },
                                    { name: "Descuentos_Concepto", label: "Descuentos Concepto", width: 80 },
                                    {
                                        name: "Descuentos_Importe", label: "Descuentos Importe", width: 80, align: "right", formatter: 'number',
                                        formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                    },
                                    { name: "Total", width: 80, align: "right", formatter: "number" }];
                    else
                        Columnas = [{ name: "NumeroDeFactura", label: "Factura", width: 100 },
                                {
                                    name: "Suscripciones_Eventos", label: "Suscripciones Eventos", width: 70, align: "right", formatter: 'number',
                                    formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                },
                                {
                                    name: "Suscripciones_Importe", label: "Suscripciones Importe", width: 70, align: "right", formatter: 'number',
                                    formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                },
                                {
                                    name: "BajoDemanda_Eventos", label: "Bajo Demanda Eventos", width: 80, align: "right", formatter: 'number',
                                    formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                },
                                {
                                    name: "BajoDemanda_Importe", label: "Bajo Demanda Importe", width: 80, align: "right", formatter: 'number',
                                    formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                },
                                { name: "Servicios_Concepto", label: "Servicios Concepto", width: 80 },
                                {
                                    name: "Servicios_Importe", label: "Servicios Importe", width: 80, align: "right", formatter: 'number',
                                    formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                },
                                { name: "Ajustes_Concepto", label: "Ajustes Concepto", width: 80 },
                                {
                                    name: "Ajustes_Importe", label: "Ajustes Importe", width: 80, align: "right", formatter: 'number',
                                    formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                },
                                { name: "Descuentos_Concepto", label: "Descuentos Concepto", width: 80 },
                                {
                                    name: "Descuentos_Importe", label: "Descuentos Importe", width: 80, align: "right", formatter: 'number',
                                    formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                },
                                {
                                    name: "Total", width: 80, align: "right", formatter: 'number',
                                    formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 }
                                }];
                    break;
                default:
            }

            $("#" + subgrid_table_id).jqGrid({
                datatype: "local",
                colModel: Columnas,
                width: 670,
                rowNum: 9007199254740992,
                height: '100%',
                shrinkToFit: false
            });
            for (var i = 0; i < DatosGrilla[IndiceTabla].length; i++) {
                Fila = {};
                for (var j = 0; j < Columnas.length; j++) {
                    if (Columnas[j].formatter == "number") {
                        Fila[Columnas[j].name] = DatosGrilla[IndiceTabla][i][Columnas[j].name];
                    }
                    else {
                        Fila[Columnas[j].name] = DatosGrilla[IndiceTabla][i][Columnas[j].name];
                    }
                }
                $("#" + subgrid_table_id).jqGrid('addRowData', 1, Fila);
            }
        },
    });
    $("#grid_DetalleFyC").jqGrid("clearGridData", true).trigger("reloadGrid");
}
