var oCulturaUsuario;
var tab;

$(document).ready(function () {
    oCulturaUsuario = window.parent.parent.oCulturaUsuario;
    tab = $("#TabDetalle").tabs();
    if ($("#hdfAdmin").val() != "1") {
        $('[href="#TabDetalle_TabJQ2"]').closest('li').hide();
    }

    //$("input:text").addClass("ui-widget-content ui-corner-all");
    //    $("#txtFechaInicio").removeClass("ui-corner-all");
    //    $("#txtFechaInicio").css("padding", "0px");
    //    $("#txtFechaInicio").css({ "border": "none" });

    //    $("#txtFechaFin").removeClass("ui-corner-all");
    //    $("#txtFechaFin").css("padding", "0px");
    //    $("#txtFechaFin").css({ "border": "none" });

    $(".bordeui").removeClass("ui-corner-all");
    $(".bordeui").css({
        "border": "none",
        "padding": "0px"
    });
    //    $("#txtFechaInicio").attr('disabled', 'disabled');
    //    $("#txtFechaFin").attr('disabled', 'disabled');
    //    $('#txtFechaInicio').attr('disabled', 'disabled');
    //    $('#txtFechaFin').attr('disabled', 'disabled');
    ValidarNumeroEnCajaTexto("txtMontoMayora", ValidarDecimalPositivo, oCulturaUsuario);
    ValidarNumeroEnCajaTexto("txtMontoMenora", ValidarDecimalPositivo, oCulturaUsuario);

    kendo.culture("es-PE");
    function startChange() {
        var startDate = start.value();

        if (startDate) {
            startDate = new Date(startDate);
            startDate.setDate(startDate.getDate() + 1);
            end.min(startDate);


        }
    }
    $("#TextBox1").hide();
    function endChange() {
        var endDate = end.value();

        if (endDate) {
            endDate = new Date(endDate);
            endDate.setDate(endDate.getDate() - 1);
            start.max(endDate);

        }
    }

    if ($("#hdfAdmin").val() == "1") {
        $("#dvContenedorTecRes").show();
        $("#dvContenedorUsuario").hide();
    } else {
        $("#dvContenedorTecRes").hide();
        $("#dvContenedorUsuario").show();
        //alert($("#bpTecnicoResponsable_txtValorBusqueda").val());
    }
    

    var start = $("#txtFechaInicio").kendoDatePicker({
        change: startChange
    }).data("kendoDatePicker");

    var end = $("#txtFechaFin").kendoDatePicker({
        change: endChange
    }).data("kendoDatePicker");

    start.max(end.value());

    end.min(start.value());
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
                    field: "OEmpleado.P_vcCod",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: center;"
                    },
                    width: "60px",
                    title: "Código"
                },
                {
                    field: "OEmpleado.vcNom",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: left;"
                    },
                    width: "200px",
                    title: "Empleado"
                },
                {
                    field: "VcFecha",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: center;"
                    },
                    width: "60px",
                    title: "Fecha"
                },
                {
                    field: "VcConceptoPago",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: left;"
                    },
                    width: "200px",
                    title: "Concepto Pago"
                },
                {
                    field: "DcMontoPagado",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: right;"
                    },
                    width: "60px",
                    title: "Monto (" + oCulturaUsuario.Moneda.vcSimMon + ")"
                }]

    });
    $("#gridPagosCliente").kendoGrid({
        dataSource: {},
        groupable: false,
        sortable: true,
        navigatable: true,
        columns: [
                {
                    field: "VcFecha",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: center;"
                    },
                    width: 100,
                    title: "Fecha"
                },
                {
                    field: "VcConceptoPago",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: left;"
                    },
                    width: 400,
                    title: "Concepto Pago",
                    format: "{0:c}"
                },
                {
                    field: "DcMontoPagado",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: right;"
                    },
                    width: 250,
                    title: "Monto Pagado"
                }],
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
        height: "200px"
    });


    Inicio();
    function Inicio() {

        $("#tbExportar").hide();
        var habilitarBoton = $("#hdfProcManual").val();

        if (habilitarBoton == 0) {
            $("#btnImportarPagos").addClass('k-button k-state-disabled');
            $("#btnImportarPagos").hide();
        }
        else {
            if ($("#hdfAdmin").val() == "0") {
                $("#btnImportarPagos").hide();
            }
        }

        if ($("#hdfAdmin").val() == "0" && $("#hdfOrganizacion").val() == "") {
            $("#gridPagos").hide();
            $("#TabDetalle_TabJQ1").html('<h1>Movimientos de Pago<h1>');
            $("#TabDetalle_TabJQ1").css('text-align', 'center');
        }
        else {
            $("#gridPagosCliente").hide();
        }

        //JHERRERA 20141015: Validación de datos por defecto
        //        var _valor = $("#hdfEmpleado").val();
        //        if (_valor != "") {
        //            _valor = "0CB046";
        //            buscarValor_bpTecnicoResponsable = _valor;
        //            validarDatosAjax_bpTecnicoResponsable = true;
        //            $('#bpTecnicoResponsable_grid').trigger('reloadGrid');
        //            if ($("#hdfTecnicoResponsable").val() != "") {
        //                cargarGrilla_Cliente();
        //            }
        //        }
        //-->
    }

    $("#ddlFiltro").on('change', function (e) {
        var valor = this.value;

        var filtro = $("#txtValor");
        if (valor == "") {

            filtro.val('');
        }

    });
    function MostrarPanel() {
        var dlg = $("#Panel").dialog({
            title: 'Importar Pagos',
            resizable: false,
            modal: true,
            width: 600,
            autoOpen: true
        }).dialog('open');

        dlg.dialog("option", "buttons", {
            "Guardar": function () {
                //                var contrato = document.getElementById("ifCargarImagen").contentWindow.ObtenerContrato();
                var contrato = $("#lblRutaContrato").text();
                //console.log($("#lblRutaContrato").text());
                if (contrato == "") {
                    alerta("Debe cargar un archivo primero.");
                    return;
                }

                BloquearPagina(true);
                oContrato.Guardar(SatisfactoriaGuardar, ErrorGuardar);

                oContrato.QuitarAdjunto();
                $(this).dialog("close");
            },
            "Cerrar": function () {
                oContrato.QuitarAdjunto();
                $(this).dialog("close");
                return true;
            }
        });
    }
    function SatisfactoriaGuardar(Resultado) {
        Mensaje("<br/><h1>Archivo Importado.\nEs muy probable que los pagos importados no se visualicen de inmediato. Por favor espere unos minutos.</h1><br/>", document, CerroMensaje);
    }
    function ErrorGuardar(xhr, err, thrErr) {
        BloquearPagina(false);
    }
    function CerroMensaje() {
        BloquearPagina(false);
        if (oContrato.IdContrato() == null) {//Nuevo
            oContrato.Limpiar();
        }
        else {//Edicion
        }
    }
    $("#btnImportarPagos").on('click', function () {

        if ($("#hdfIndGenPagos").val() == "0") {
            if ($("#hdfProcOrigen").val() == "0" || $("#hdfProcOrigen").val() == null) {
                alerta("Se debe configurar un Origen para la importación de pagos.");
                return;
            }
            if ($("#hdfProcDestino").val() == "0" || $("#hdfProcDestino").val() == null) {
                alerta("Se debe configurar un Destino para la importación de pagos.");
                return;
            }
            MostrarPanel();
        }
        else {
            if (confirm('Esta seguro de generar pagos automáticos?, \n[este proceso genera montos equivalentes a la deuda actual generada en la cuenta de cobro]')) {

                $.ajax({
                    type: "POST",
                    url: "Con_Fac_InfoCobros.aspx/GetProcesoVerificacionCobros",
                    data: JSON.stringify({
                        'origen': $("#hdfProcOrigen").val(),
                        'destino': $("#hdfProcDestino").val(),
                        'indGenPagos': $("#hdfIndGenPagos").val(),
                        "inTipOri": $("#hdfinTipOri").val()
                    }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        //                        $("#btnBuscar").click();
                        //                        alerta("El Proceso se esta ejecutando, vuelva a actualizar la página en unos minutos.");
                        Mensaje("<br/><h1>El Proceso se esta ejecutando, vuelva a actualizar la página en unos minutos.</h1><br/>", document);
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            }
        }
    });

    $("#btnBuscar").click(function () {

        var _MontoMayora = $("#txtMontoMayora").val();
        var _MontoMenora = $("#txtMontoMenora").val();

        if (_MontoMayora != "" && _MontoMenora != "") {
            if (oCulturaUsuario.vcSimDec.toString() == ',') {
                _MontoMayora = parseFloat(ParseFloatMultiPais($("#txtMontoMayora").val(), oCulturaUsuario));
                _MontoMenora = parseFloat(ParseFloatMultiPais($("#txtMontoMenora").val(), oCulturaUsuario));
            } else {
                _MontoMayora = parseFloat($("#txtMontoMayora").val());
                _MontoMenora = parseFloat($("#txtMontoMenora").val());
            }

            if (_MontoMayora > _MontoMenora) {

                $("#spMensaje").text('El campo "Monto Mayor a" debe tener un valor menor que el campo "Monto Menor a".');
                return;
            }
            else {
                $("#spMensaje").text("");
            }
        }
        //        var _periodo = $("#ddlPeriodo").val();
        var _fechaInicio = $("#txtFechaInicio").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
        var _fechaFin = $("#txtFechaFin").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");

        if (_fechaInicio.length < 10) {
            $("#spMensaje").text("La fecha de inicio no tiene el formato correcto dd/MM/YYYY .");
            return;
        }
        if (_fechaFin.length < 10) {
            $("#spMensaje").text("La fecha de fin no tiene el formato correcto dd/MM/YYYY .");
            return;
        }
        dI = _fechaInicio.substr(0, 2);
        mI = _fechaInicio.substr(3, 2);
        yI = _fechaInicio.substr(6, 4);
        if (!checkdate(mI, dI, yI)) {
            $("#spMensaje").text("La fecha de inicio es inválida.");
            return;
        }
        dF = _fechaFin.substr(0, 2);
        mF = _fechaFin.substr(3, 2);
        yF = _fechaFin.substr(6, 4);
        if (!checkdate(mF, dF, yF)) {
            $("#spMensaje").text("La fecha de fin es inválida.");
            return;
        }
        else {
            $("#spMensaje").text("");
        }

        var fecIni = new Date(yI + "-" + mI + '-' + dI);

        var fecFin = new Date(yF + "-" + mF + '-' + dF);

        if (fecIni > fecFin) {
            $("#spMensaje").text("La fecha inicial debe ser menor o igual a la fecha final.");
            return;
        }
        else {
            $("#spMensaje").text("");
        }

        var diff = fecFin - fecIni;
        diff = Math.round(diff / 1000 / 60 / 60 / 24);

        if ($("#hdfTecnicoResponsable").val() == "" && diff > 60) {
            $("#spMensaje").text("La diferencia entre la fecha final y la fecha de inicio, no puede ser mayor a 60 días.");
            return;
        } else if ($("#hdfTecnicoResponsable").val() != "" && diff > 730) {
            $("#spMensaje").text("La diferencia entre la fecha final y la fecha de inicio, no puede ser mayor a 24 meses.");
            return;
        } else {
            $("#spMensaje").text("");
        }

        //var dtFechaInicio, dtFechaFin;
        //dtFechaInicio = Date.parseExact(_fechaInicio, oCulturaUsuario.vcFecCor);
        //dtFechaFin = Date.parseExact(_fechaFin, oCulturaUsuario.vcFecCor);


        $.ajax({
            type: "POST",
            url: "Con_Fac_InfoCobros.aspx/GetListaCobros",
            data: JSON.stringify({
                'FechaInicio': _fechaInicio,
                'FechaFin': _fechaFin,
                //                'filtro': _filtro,
                'valor': $("#hdfTecnicoResponsable").val(),
                'montoMenora': _MontoMenora,
                'montoMayora': _MontoMayora,
                "inTipOri": $("#hdfinTipOri").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.d.length > 0) {
                    var dataSource = new kendo.data.DataSource({
                        data: data.d,
                        pageSize: 10
                    });
                    var grilla = $("#gridPagos").data("kendoGrid");
                    grilla.setDataSource(dataSource);
                    $("#tbExportar").show();
                    $("#spMensaje").text("");

                    $("#gridPagosCliente").data("kendoGrid").setDataSource(dataSource); //24-06-2015 wapuamyta
                }
                else {
                    dataSource = new kendo.data.DataSource({
                        data: {},
                        pageSize: 10
                    });
                    grilla = $("#gridPagos").data("kendoGrid");
                    grilla.setDataSource(dataSource);
                    $("#tbExportar").hide();
                    $("#spMensaje").text("No Existen pagos que cumplan estos parámetros de búsqueda.");

                    $("#gridPagosCliente").data("kendoGrid").setDataSource(dataSource); //24-06-2015 wapuamyta
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });
});

function cargarGrilla_Cliente() {

    var _MontoMayora = "";
    var _MontoMenora = "";
    var _filtro = "b.IdEmpleado";
    var _valor = $("#hdfEmpleado").val();
    var FechaActual = new Date();
    var mes = ((FechaActual.getMonth()).toString());
    if (mes.length == 1) {
        mes = "0" + mes;
    }

    var mesFinal = ((FechaActual.getMonth() + 1).toString());
    if (mesFinal.length == 1) {
        mesFinal = "0" + mesFinal;
    }

    var _fechaInicio = FechaActual.getFullYear().toString() + mes + "01";
    var _fechaFin = FechaActual.getFullYear().toString() + mesFinal + "01";
    $.ajax({
        type: "POST",
        url: "Con_Fac_InfoCobros.aspx/GetListaCobros",
        data: JSON.stringify({
            'FechaInicio': _fechaInicio,
            'FechaFin': _fechaFin,
            'filtro': _filtro,
            'valor': _valor,
            'montoMenora': _MontoMenora,
            'montoMayora': _MontoMayora,
            "inTipOri": $("#hdfinTipOri").val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d.length > 0) {
                var dataSource = new kendo.data.DataSource({
                    data: data.d,
                    pageSize: 10
                });
                var grilla = $("#gridPagosCliente").data("kendoGrid");
                grilla.setDataSource(dataSource);
                $("#tbExportar").show();
            }
            else {

                $("#spMensaje").text("No Existen pagos que cumplan estos parámetros de búsqueda.");

                dataSource = new kendo.data.DataSource({
                    data: {},
                    pageSize: 10
                });
//                var grilla;
                grilla = $("#gridPagosCliente").data("kendoGrid");
                grilla.setDataSource(dataSource);
                $("#tbExportar").hide();

            }
        }
    });

}

function justNumbers(e)
{
    var keynum = window.event ? window.event.keyCode : e.which;
    if ((keynum == 8) || (keynum == 46)) {
        return true;
    }
 
    return /\d/.test(String.fromCharCode(keynum));
}

function checkdate(m, d, y) {
  return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0))
    .getDate();
}    

function fnMostrarDatos(valor) {
    $("#hdfTecnicoResponsable").val(valor);
    $("#TxtUsuario").val($("#bpTecnicoResponsable_txtValorBusqueda").val());
}


/*****  29/12/2015  :   RURBINA *****/

var oContrato;
function CargarNombreArchivo(Archivo, RutaCompleta) {
    oContrato.ArchivoOriginal(Archivo);
    oContrato.RutaContratoTemporal(RutaCompleta);
}

function inicioPagina() {
    DimPosElementos();
}

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    var AnchoLateral = $(".LateralSplitter");
    $(".Splitter").css({ height: Alto - 18 });

    $("#ifrRegistrarPago").width(Ancho - 50);
    $("#ifrRegistrarPago").height(Alto - 50);
}
$(document).ready(function () {
    //            var indiceTab = window.parent.tab.tabs("option", "selected");


    oContrato = new MOV_CAM_Contrato();

    ko.validation.rules.pattern.message = 'Invalid.';

    ko.validation.configure({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: true,
        parseInputAttributes: true,
        messageTemplate: null
    });

    ko.applyBindings(oContrato);

    oContrato.errors = ko.validation.group(oContrato);

    inicioPagina();

    $(window).resize(function () {
        DimPosElementos();
    });

    //$("#ifrRegistrarPago").attr("src", "");

});
