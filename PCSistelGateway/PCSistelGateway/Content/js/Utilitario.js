
const NombreMes = ["Ene-", "Feb-", "Mar-", "Abr-", "May-", "Jun-",
    "Jul-", "Ago-", "Sep-", "Oct-", "Nov-", "Dic-"
];

//VALOR PRESENTE
function calcularValorPresente(tasa, numeroPeriodo, valorFuturo) {
    var pv;
    pv = valorFuturo / Math.pow((1 + tasa), numeroPeriodo);
    return pv;
}

//VALOR ACTUAL NETO
function calcularValorActualNeto(tasa, valoresMensuales) {
    var NPV = 0;
    for (var i = 0; i < valoresMensuales.length; i++) {
        NPV += (valoresMensuales[i] / Math.pow((1 + tasa), i + 1));
    }
    //console.log("NPV: " + NPV);
    return NPV;// Math.round(NPV);
}

function AgregarValorXMLMes(m, v) {
    if (v == 0) {
        return '';
    } else {
        return "<Mes" + m + ">" + v + "</Mes" + m + ">";
    }
}

//#region "Funciones JQGrid"
function GenerarJQGrid(meses, xml, caption, tabla, editable) {
    var arColumnas = ObtenerArregloColumnas(meses, tabla, editable);
    var datosTreeGrid = ObtenerDataStrJqGrid(xml, arColumnas[0]);
    $("#dv_" + tabla).empty();
    $("#dv_" + tabla).append('<table id="' + tabla + '"></table>');
    $("#" + tabla).jqGrid({
        datatype: 'jsonstring',
        datastr: datosTreeGrid,
        colNames: arColumnas[1],
        colModel: arColumnas[2],
        styleUI: 'Bootstrap',
        treeGridModel: 'adjacency',
        treeReader: {
            level_field: "Nivel",
            parent_id_field: "Padre",
            leaf_field: "EsDetalle",
            expanded_field: "Expandido"
        },
        height: '100%',
        rowNum: 300,
        treeGrid: true,
        ExpandColumn: 'Nombre',
        ExpandColClick: true,
        width: "100%",
        shrinkToFit: true,
        scrollOffset: 0
        //caption: caption
    });
    $("#" + tabla).jqGrid('setLabel', 'Name', '', { 'text-align': 'center' });
    //$("#" + tabla).jqGrid('setFrozenColumns');
}
function ObtenerArregloColumnas(meses, tabla, editable) {
    var colXML, colNames, colModel;
    colXML = ["ID", "Nombre", "Nivel", "Padre", "Orden", "Dinamico", "Tipo", "EsDetalle", "Expandido", "EsTotal", "IdentificadorDetalle", "DescripcionDetalle", "Editar"];
    colNames = ["ID", " ", "Nivel", "Padre", "Orden", "Dinámico", "Tipo", "Es Detalle", "Expandido", "Es Total", "Identificador Detalle", "Descripcion Detalle", "Editar"];
    colModel = [
        { name: 'ID', width: 40, sortable: false, hidden: true, frozen: true },
        { name: 'Nombre', width: 280, sortable: false, hidden: false, frozen: true },
        { name: 'Nivel', width: 60, sortable: false, hidden: true },
        { name: 'Padre', width: 60, sortable: false, hidden: true },
        { name: 'Orden', width: 60, sortable: false, hidden: true },
        { name: 'Dinamico', width: 60, sortable: false, hidden: true },
        { name: 'Tipo', width: 60, sortable: false, hidden: true },
        { name: 'EsDetalle', width: 60, sortable: false, hidden: true },
        { name: 'Expandido', width: 60, sortable: false, hidden: true },
        { name: 'EsTotal', width: 60, sortable: false, hidden: true },
        { name: 'IdentificadorDetalle', width: 60, sortable: false, hidden: true },
        { name: 'DescripcionDetalle', width: 60, sortable: false, hidden: true },
        {
            name: 'Editar', width: 50, sortable: false, hidden: true, align: 'center'
            //, formatter: "checkbox", formatoptions: { disabled: false }
            , formatter: function (cellvalue, options, rowObject) {
                if (rowObject[7]) {
                    return '<input type="checkbox" id="chk-edit-' + tabla + '-' + rowObject[0] + '" disabled/>';
                } else {
                    return '';
                }
            }
        }
    ];

    let date = new Date();    

    for (let m = 1; m <= meses; m++) {
        colXML.push("Mes" + m.toString());
        //colNames.push("Mes " + m.toString() + "<br/>FECHA");      
        let d = new Date(date.getFullYear(), date.getMonth() + m - 1, 1);
        colNames.push("Mes " + m.toString() + "<br/>" + NombreMes[d.getMonth()] + d.getFullYear());
        if (true) {
            //colModel.push({
            //    name: "Mes" + m.toString(), width: 100, sortable: false, hidden: false, align: 'right'
            //    , formatter: 'number', formatoptions: { decimalSeparator: cultura.SeparadorDecimal, thousandsSeparator: cultura.SeparadorMiles, decimalPlaces: cultura.CantidadDecimales, defaultValue: '<div class="text-center">-</div>' }
            //});
            colModel.push({
                name: "Mes" + m.toString(), width: 90, sortable: false, hidden: false//, align: 'right'
                , formatter: function (cellvalue, options, rowObject) {
                    var cv = cellvalue == '' ? 0 : parseFloat(cellvalue);
                    if (cv != 0) {
                        return '<div class="text-right" data-toggle="tooltip" data-placement="top" data-html="true" title="Mes ' + m.toString() + '\n455">' + FormatoNumero(cv, cultura) + '</div>';
                    } else {
                        return '<div class="text-center" data-toggle="tooltip" data-placement="top" title="Mes ' + m.toString() + '">-</div>';
                    }
                }
            });


        } else if (editable) {
            colModel.push({
                name: "Mes" + m.toString(), width: 90, sortable: false, hidden: false, align: 'right'
                //, formatter: 'number', formatoptions: { decimalSeparator: '.', thousandsSeparator: ',', decimalPlaces: 0, defaultValue: '0' }
                //, editable: true, edittype: 'select'
                , formatter: function (cellvalue, options, rowObject) {
                    var cv = cellvalue == '' ? 0 : parseFloat(cellvalue);
                    if (rowObject[9]) { // es total (deshabilitado)
                        return '<input id="input-calc-' + tabla + '-total-' + options.colModel.name + '" value="' + FormatoNumero(cv, cultura) + '" title="' + cellvalue + '" style="text-align:right; cursor: text;" class="form-control" disabled/>';
                    } else if (rowObject[7]) { // es detalle (habilitado)
                        return '<input id="input-edit-' + tabla + '-' + rowObject[0] + '-' + options.colModel.name + '" month="' + options.colModel.name + '" level="' + rowObject[2] + '" parent="' + rowObject[3] + '" table="' + tabla + '" class="form-control input-edit edit-parent-' + tabla + '-' + rowObject[3] + '-' + options.colModel.name + '" value="' + FormatoNumero(cv, cultura) + '" title="' + cellvalue + '" style="text-align:right;" onkeypress="return ValidarDecimalPositivo(event)"/>';
                    } else { //es sub total (deshabilitado)
                        return '<input id="input-calc-' + tabla + '-' + rowObject[0] + '-' + options.colModel.name + '" month="' + options.colModel.name + '" level="' + rowObject[2] + '" parent="' + rowObject[3] + '" table="' + tabla + '" class="form-control input-calc edit-parent-' + tabla + '-' + rowObject[3] + '-' + options.colModel.name + '" value="' + FormatoNumero(cv, cultura) + '" title="' + cellvalue + '" style="text-align:right; cursor: text;" disabled/>';
                    }
                }
            });
        } else {
            colModel.push({
                name: "Mes" + m.toString(), width: 90, sortable: false, hidden: false, align: 'right'
                , formatter: function (cellvalue, options, rowObject) {
                    var cv = cellvalue == '' ? 0 : parseFloat(cellvalue);
                    return '<input id="input-calc-' + tabla + '-' + rowObject[0] + '-' + options.colModel.name + '" month="' + options.colModel.name + '" level="' + rowObject[2] + '" parent="' + rowObject[3] + '" table="' + tabla + '" class="form-control input-calc edit-parent-' + tabla + '-' + rowObject[3] + '-' + options.colModel.name + '" value="' + FormatoNumero(cv, cultura) + '" title="' + cellvalue + '" style="text-align:right; cursor: text;" disabled/>';
                }
            });
        }
    }
    return [colXML, colNames, colModel];
}
function ObtenerDataStrJqGrid(dataXML, columnasXML) {
    var jsonString = [], jsonData;
    if (dataXML != '') {
        var xmlDoc = $.parseXML("<?xml version='1.0' ?>" + dataXML);
        var $xml = $(xmlDoc);
        var $concepto = $xml.find("DATA");
        $concepto.each(function (i, o) {
            var dataConcepto = $(o);
            var arDataConcepto = [];
            $.each(columnasXML, function (i, col) {
                let dataColumna = dataConcepto.find(col).text().trim();
                let esNumero = $.isNumeric(dataColumna);
                let vMes = 0;
                if (esNumero) {
                    vMes = parseFloat(dataColumna);
                }
                if (dataColumna == '' || (isNaN(dataColumna) && dataColumna != 'true' && dataColumna != 'false')) {
                    arDataConcepto.push('"' + dataColumna + '"');
                } else {
                    arDataConcepto.push(dataColumna);
                }
            });
            jsonString.push('{ "id":"' + dataConcepto.find("ID").text() + '", "cell": [' + arDataConcepto.join(",") + '],"Orden":"' + dataConcepto.find("Orden").text() + '" }');
        });
    }
    jsonData = JSON.parse("[" + jsonString.join(",") + "]").sort(SortByOrder);
    var dataTreeGrid = {
        total: 1,
        page: 1,
        records: 300,
        rows: jsonData
    };
    return dataTreeGrid;
}
function SortByOrder(a, b) {
    var aOrder = parseInt(a.Orden);
    var bOrder = parseInt(b.Orden);
    return ((aOrder < bOrder) ? -1 : ((aOrder > bOrder) ? 1 : 0));
}
//#endregion

function GenerarTableHTML(dataXML, columnasXML, tabla) {
    debugger;
    var $tabla = $("#" + tabla);
    $tabla.empty();
    if (dataXML != '') {
        var xmlDoc = $.parseXML("<?xml version='1.0' ?>" + dataXML);
        var $xml = $(xmlDoc);
        var $fila = $xml.find("DATA");

        if ($fila.length > 1) { //horizontal
            let totales = [];
            //header
            var $trH = $('<tr></tr>').uniqueId();
            $.each(columnasXML, function (i, col) {
                col.Visible = col.Visible == undefined ? true : col.Visible;
                if (col.Visible) {
                    $trH.append('<th class="text-center" style="vertical-align: bottom;">' + col.Descripcion + '</th>');
                }
            });
            $tabla.append($trH);
            //body
            $fila.each(function (i, o) {
                let dataFila = $(o);
                let $tr = $('<tr></tr>').uniqueId();
                $.each(columnasXML, function (i, col) {
                    col.Visible = col.Visible == undefined ? true : col.Visible;
                    if (col.Visible) {
                        let dataColumna = dataFila.find(col.Nombre).text().trim();
                        let entero = col.EsEntero == undefined ? false : col.EsEntero;
                        let formatDataColumna = isNaN(dataColumna) ? dataColumna : FormatoNumero(parseFloat(dataColumna), cultura, entero);
                        if (isNaN(dataColumna)) {
                            $tr.append('<th class="text-left text-nowrap">' + formatDataColumna + '</th>');
                            totales[i] = 'TOTAL';
                        } else {
                            $tr.append('<td class="text-right" data-toggle="tooltip" title="' + dataColumna + '">' + formatDataColumna + '</td>');
                            totales[i] = (totales[i] == undefined ? 0 : totales[i]) + (entero ? parseInt(dataColumna) : parseFloat(dataColumna));
                        }

                    }
                });
                $tabla.append($tr);
            });
            //footer
            var $trF = $('<tr></tr>').uniqueId();
            $.each(totales, function (i, o) {
                if (o != undefined && o != null) {
                    let n = isNaN(o) ? o : FormatoNumero(o, cultura);
                    $trF.append('<th class="text-right">' + n + '</th>');
                }
            });
            $tabla.append($trF);
        } else if ($fila.length == 1) { //vertical
            let dataFila = $fila;
            $.each(columnasXML, function (i, col) {
                col.Visible = col.Visible == undefined ? true : col.Visible;
                if (col.Visible) {
                    let $trD = $('<tr></tr>').uniqueId();
                    let dataColumna = dataFila.find(col.Nombre).text().trim();
                    let entero = col.EsEntero == undefined ? false : col.EsEntero;
                    let unidadDataColumna = col.Unidad == undefined ? '' : col.Unidad;
                    let tipoUnidad = col.TipoUnidad == undefined ? 'PRE' : col.TipoUnidad;
                    let prefijo = '', sufijo = '';
                    let valor = parseFloat(dataColumna) * (unidadDataColumna == '%' ? 100 : 1);
                    switch (tipoUnidad) {
                        case 'PRE':
                            prefijo = unidadDataColumna + ' ';
                            break;
                        case 'SUF':
                            sufijo = ' ' + unidadDataColumna;
                            break;
                        default:
                            break;
                    }
                    let formatDataColumna = isNaN(dataColumna) ? dataColumna : FormatoNumero(valor, cultura, entero);
                    $trD.append('<th>' + col.Descripcion + '</th><td class="text-right">' + prefijo + formatDataColumna + sufijo + '</td>');
                    $tabla.append($trD);
                }
            });
        }
    }
    $('[data-toggle="tooltip"]').tooltip();
}

function inputNumeroFocusIn(elem) {
    //let real = $(elem).attr("real");
    //$(elem).val(parseFloat(real));
    let real = $(elem).attr("real").replace(/,/g, '');
    $(elem).val(real == 0 ? '' : real);
    $(elem).select();
}
function inputNumeroFocusOut(elem, cultura) {
    //let nuevo = $(elem).val() == '' ? 0 : parseFloat($(elem).val());
    //$(elem).val(FormatoNumero(nuevo, cultura));
    var real = parseFloat($(elem).val() == '' || $(elem).val() == '-' ? 0 : $(elem).val());
    //var c = new oCultura();
    //if ($(elem).attr("ntype") == "e") {
    //    c.CantidadDecimales = 0;
    //}
    $(elem).val(FormatoNumero(real, cultura));
}
function inputNumero(elem) {
    let nuevo = $(elem).val() == '' ? 0 : parseFloat($(elem).val());
    $(elem).attr("real", nuevo);
}

$(function () {
    $(".InputReal").on("focusin", function () {        
        let real = $(this).attr("real");
        $(this).val(parseFloat(real));
    });
    $(".InputReal").on("focusout", function () {
        let nuevo = $(this).val() == '' ? 0 : parseFloat($(this).val());
        $(this).val(FormatoNumero(nuevo, cultura));        
    });
});
