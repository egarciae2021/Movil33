//#region Variables Globales
var arPagos = [];
var oCultura;
var indiceTab;
//#endregion

$(document).ready(function () {

    //#region Valores Iniciales - Controles
    //indiceTab = window.parent.tabschild.tabs("option", "selected");
    oCultura = window.top.oCulturaUsuario;

    $(".bordeui").removeClass("ui-corner-all");
    $(".bordeui").css({
        "border": "none",
        "padding": "0px"
    });
    var vFecSer = $("#hdfFecServidor").val();
    var cFechaPago = $("#txtFechaPago").kendoDatePicker({
        culture: "es-PE",
        format: "dd/MM/yyyy",
        max: new Date(vFecSer.substring(0, 4), vFecSer.substring(4, 6) - 1, vFecSer.substring(6, 8))
    }).data("kendoDatePicker");
    var cPeriodo = $("#txtPeriodo").kendoDatePicker({
        culture: "es-PE",
        start: "year",
        depth: "year",
        //format: "/yyyy/MM",
        format: "MM/yyyy",
        footer: false,
        max: new Date(vFecSer.substring(0, 4), vFecSer.substring(4, 6) - 1, vFecSer.substring(6, 8))
    }).data("kendoDatePicker");

    ValidarNumeroEnCajaTexto("txtMonto", ValidarDecimalPositivo, oCultura, false);

    $("#gridPagos").kendoGrid({
        dataSource: {},
        groupable: false,
        sortable: true,
        navigatable: true,
        height: 350,
        width: 800,
        selectable: "single",
        reorderable: false,
        resizable: true,
        pageable: {
            refresh: false,
            pageSizes: true,
            messages: {
                itemsPerPage: "ítems por página",
                display: "{0}-{1} de {2} ítems",
                empty: "",
                first: "Ir a primera página",
                last: "Ir a última página",
                next: "Ir a página siguiente",
                previous: "Ir a página anterior"
            }
        },
        columns: [
                {
                    field: "vcCodEmpleado",
                    headerAttributes: { "class": "table-header-cell", style: "text-align: center;" },
                    attributes: { "class": "table-cell", style: "text-align: center;" },
                    width: "50px",
                    title: "Código"
                },
                {
                    field: "vcNomEmpleado",
                    headerAttributes: { "class": "table-header-cell", style: "text-align: center;" },
                    attributes: { "class": "table-cell", style: "text-align: left;" },
                    width: "180px",
                    title: "Empleado"
                },
                {
                    field: "vcPeriodo",
                    headerAttributes: { "class": "table-header-cell", style: "text-align: center;" },
                    attributes: { "class": "table-cell", style: "text-align: center;" },
                    width: "50px",
                    title: "Periodo"
                },
                {
                    field: "vcFechaPago",
                    headerAttributes: { "class": "table-header-cell", style: "text-align: center;" },
                    attributes: { "class": "table-cell", style: "text-align: center;" },
                    width: "60px",
                    title: "Fecha Pago"
                },
                {
                    field: "vcConcepto",
                    headerAttributes: { "class": "table-header-cell", style: "text-align: center;" },
                    attributes: { "class": "table-cell", style: "text-align: left;" },
                    width: "180px",
                    title: "Concepto Pago"
                },
                {
                    field: "dcMonto",
                    headerAttributes: { "class": "table-header-cell", style: "text-align: center;" },
                    attributes: { "class": "table-cell", style: "text-align: right;" },
                    width: "80px",
                    title: "Monto (" + oCultura.Moneda.vcSimMon + ")"
                },
                {
                    template: '<img title="#:vcEstado#" src="../../../Common/Images/Mantenimiento/#:data.inEstado#" />',
                    field: "Estado",
                    headerAttributes: { "class": "table-header-cell", style: "text-align: center;" },
                    attributes: { "class": "table-cell", style: "text-align: center;" },
                    width: "40px",
                    title: "Estado",
                    hidden: true
                }
                ]
    });

    //#endregion

    //#region Eventos
    $("#btnAgregarPagos").click(function () {
        var vCodEmpleado, vNomEmpleado, vPeriodo, vFechaPago, vConcepto, vMonto;
        vCodEmpleado = $("#hdfCodEmpleado").val();
        vNomEmpleado = $("#bpEmpleados_txtValorBusqueda").val().split("=")[1];
        vPeriodo = $("#txtPeriodo").val();
        vFechaPago = $("#txtFechaPago").val();
        vConcepto = $("#txtConcepto").val();
        vMonto = $("#txtMonto").val();
        if (vCodEmpleado == '') {
            alerta("Seleccione un empleado para el pago.");
            return;
        }
        if (vPeriodo == '') {
            alerta("Ingrese un periodo");
            return;
        } else {
            if (vPeriodo.length != 7 || vPeriodo.indexOf("/") != 2 || vPeriodo.split("/").length != 2) {
                alerta("Ingrese un formato de periodo válido, yyyy/mm");
                return;
            }
        }
        if (vFechaPago == '') {
            alerta("Ingrese una fecha de pago");
            return;
        }
        if (vConcepto == '') {
            alerta("Ingrese un concepto para el pago");
            return;
        }
        if (vMonto == '') {
            alerta("Ingrese un monto para el pago.");
            return;
        }

        var i;
        for (i = 0; i < arPagos.length; i++) {
            if (arPagos[i].vcCodEmpleado == vCodEmpleado && arPagos[i].vcFechaPago == vFechaPago && arPagos[i].vcConcepto == vConcepto && arPagos[i].dcMonto == vMonto) {
                alerta("Ya se ha agregado este pago.<br/><table cellspacing='1' style='margin-left: 30px;'><tr><td>Código:</td><td>" + vCodEmpleado + "</td></tr><tr><td>Empleado:</td><td>" + vNomEmpleado + "</td></tr><tr><td>Fecha:</td><td>" + vFechaPago + "</td></tr><tr><td>Monto:</td><td>" + vMonto + "</td></tr><tr><td>Concepto:</td><td>" + vConcepto + "</td></tr></table>");
                return;
            }
        }

        fnValidarDatosPago(vCodEmpleado, vNomEmpleado, vPeriodo, vFechaPago, vConcepto, vMonto);
    });

    $("#btnQuitarPago").click(function () {
        var grilla = $("#gridPagos").data("kendoGrid");
        var selectedRows = grilla.select();
        if (selectedRows.length != 0) {
            var vCodEmpleado = grilla.dataItem(selectedRows[0]).vcCodEmpleado;
            var vPeriodo = grilla.dataItem(selectedRows[0]).vcPeriodo;

            arPagos = jQuery.grep(arPagos, function (data) {
                if (!(data.vcCodEmpleado == vCodEmpleado && data.vcPeriodo == vPeriodo)) {
                    return data;
                }
            });

            var dataSource = new kendo.data.DataSource({
                data: arPagos,
                pageSize: 10
            });

            grilla.setDataSource(dataSource);
            grilla.clearSelection();
        } else {
            alerta("Seleccione un pago de la grilla de pagos.");
        }
    });

    $("#btnRegistrarPagos").click(function () {
        var grilla = $("#gridPagos").data("kendoGrid");
        var dataSource = grilla.dataSource._data;
        if (dataSource.length != 0) {
            $("#dvConfirmacionRegistrar").dialog({
                title: "Confirmación Registrar Pagos",
                width: 300,
                height: 165,
                resizable: false,
                modal: true,
                buttons: [
                { text: "Registrar Pagos", click: function () {
                    $("#dvConfirmacionRegistrar").dialog("close");
                    fnRegistrarPagos();
                }
                },
                { text: "Cancelar", click: function () {
                    $("#dvConfirmacionRegistrar").dialog("close");
                }
                }
           ]
            });
        } else {
            alerta("No se ha agregado ningún pago.");
        }
    });

    $("#btnCerrar").click(function () {
        var grilla = $("#gridPagos").data("kendoGrid");
        var dataSource = grilla.dataSource._data;
        if (dataSource.length != 0) {
            $("#dvConfirmacionCerrar").dialog({
                title: "Confirmación Cerrar",
                width: 300,
                height: 165,
                resizable: false,
                modal: true,
                buttons: [
                { text: "Si", click: function () {
                    $("#dvConfirmacionCerrar").dialog("close");
                    fnCerrarVentana();
                }
                },
                { text: "No", click: function () {
                    $("#dvConfirmacionCerrar").dialog("close");
                }
                }
           ]
            });
        } else {
            fnCerrarVentana();
        }
    });
    //#endregion
});
//#region Funciones BD
function fnRegistrarPagos() {
    var xml = '<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><TABLE>';
    var grilla = $("#gridPagos").data("kendoGrid");
    var dataSource = grilla.dataSource._data;
    var item = 0, Monto, Concepto, IdEmpleado, Fecha, Periodo;
    arPagos = [];

    var i;
    for (i= 0; i < dataSource.length; i++) {
        if (dataSource[i].inEstado == 'Guardar.png') {
            item = item + 1;
            if (oCultura.vcSimDec === ',') {
                Monto = ParseFloatMultiPais(dataSource[i].dcMonto, oCultura);
            } else {
                Monto = DevuelveNumeroSinFormato(dataSource[i].dcMonto, oCultura, false);
            }           
            Concepto = dataSource[i].vcConcepto;
            IdEmpleado = dataSource[i].vcCodEmpleado;
            Fecha = dataSource[i].vcFechaPago.split("/")[2] + dataSource[i].vcFechaPago.split("/")[1] + dataSource[i].vcFechaPago.split("/")[0];
            Periodo = dataSource[i].vcPeriodo.replace("/", "");
            Periodo = Periodo.substring(2, 6) + Periodo.substring(0, 2);
            xml += '<DATA item=\"' + item + '\" Fecha=\"' + Fecha + '\" Monto=\"' + Monto + '\" Concepto=\"' + Concepto + '\" IdEmpleado=\"' + IdEmpleado + '\" Periodo=\"' + Periodo + '\" />';
        } else {
            arPagos.push({
                vcCodEmpleado: dataSource[i].vcCodEmpleado,
                vcNomEmpleado: dataSource[i].vcNomEmpleado,
                vcPeriodo: dataSource[i].vcPeriodo,
                vcFechaPago: dataSource[i].vcFechaPago,
                vcConcepto: dataSource[i].vcConcepto,
                dcMonto: dataSource[i].dcMonto,
                inEstado: dataSource[i].inEstado,
                vcEstado: dataSource[i].vcEstado
            });
        }
    }
    xml += '</TABLE>';

    if (item == 0) {
        alerta("No se detecataron pagos para registrar.");
        return;
    }

    var RegistrarPagos_Data = { XML_Pagos: xml };

    //alert(Periodo);
    //return ;
    $.ajax({
        type: "POST",
        url: "Mnt_RegistrarPagos.aspx/RegistrarPagos",
        data: JSON.stringify(RegistrarPagos_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            Mensaje("<br/><h1>Pagos grabados con éxito</h1><br/>", document, fnCerrarVentana);
            //if (result.d.length > 0) {                
            //    var iconEstado, titleEstado;
            //    for (var i = 0; i < result.d.length; i++) {
            //        if (result.d[i].OFormaPago.Nombre == '') {
            //            iconEstado = 'Guardar.png';
            //            titleEstado = 'Por guardar';
            //        } else if (result.d[i].OFormaPago.Nombre == 'Ingresado') {
            //            iconEstado = 'Aprobar.png';
            //            titleEstado = 'Pago registrado';
            //        } else if (result.d[i].OFormaPago.Nombre == 'Error') {
            //            iconEstado = 'btnCancel.png';
            //            titleEstado = 'Error: ' + result.d[i].OFormaPago.Descripcion;
            //        }
            //        arPagos.push({
            //          vcCodEmpleado: result.d[i].IdEmpleado,
            //          vcNomEmpleado: result.d[i].NombreEmpl,
            //          vcPeriodo: result.d[i].VcPeriodo,
            //          vcFechaPago: result.d[i].VcFecha,
            //          vcConcepto: result.d[i].VcConceptoPago,
            //          dcMonto: result.d[i].DcMontoPagado,
            //          inEstado: iconEstado,
            //          vcEstado: titleEstado
            //      });
            //    }
            //
            //    var dataSource = new kendo.data.DataSource({
            //      data: arPagos,
            //      pageSize: 10
            //  });
            //
            //    var grilla = $("#gridPagos").data("kendoGrid");
            //    grilla.setDataSource(dataSource);
            //}
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnValidarDatosPago(vCodEmpleado, vNomEmpleado, vPeriodo, vFechaPago, vConcepto, vMonto) {
    var ValidarDatosPago_Data = {
        IdEmpleado: vCodEmpleado,
        Fecha: vFechaPago.split("/")[2] + vFechaPago.split("/")[1] + vFechaPago.split("/")[0],
        Monto: vMonto,
        Concepto: vConcepto,
        Periodo: vPeriodo.replace("/", "")
    };
    $.ajax({
        type: "POST",
        url: "Mnt_RegistrarPagos.aspx/ValidarDatosPago",
        data: JSON.stringify(ValidarDatosPago_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var vMensajeResult = result.d;
            if (vMensajeResult == '') {
                arPagos.push({
                    vcCodEmpleado: vCodEmpleado,
                    vcNomEmpleado: vNomEmpleado,
                    vcPeriodo: vPeriodo,
                    vcFechaPago: vFechaPago,
                    vcConcepto: vConcepto,
                    dcMonto: vMonto,
                    inEstado: 'Guardar.png', //Aprobar.png,btnCancel.png
                    vcEstado: 'Por guardar'
                });

                var dataSource = new kendo.data.DataSource({
                    data: arPagos,
                    pageSize: 10
                });

                var grilla = $("#gridPagos").data("kendoGrid");
                grilla.setDataSource(dataSource);
                fnLimpiarControlesIngreso();
                $("#spMensaje").html("Los pagos aún no han sido registrados, para hacerlo haga click en <i>Grabar</i>");
            } else {
                alerta(vMensajeResult);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}
//#endregion

//#region Funciones Pagina
function fnLimpiarControlesIngreso() {
    $("#hdfCodEmpleado").val("");
    $("#bpEmpleados_txtValorBusqueda").val("");
    $("#txtPeriodo").val("");
    $("#txtFechaPago").val("");
    $("#txtConcepto").val("");
    $("#txtMonto").val("");
}

function fnCerrarVentana() {
    window.parent.tabschild.tabs("remove", indiceTab);
}

function fnMostrarDatos(valor) {
    $("#hdfCodEmpleado").val(valor);
}
//#endregion
