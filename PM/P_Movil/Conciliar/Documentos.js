var FiltroCuentas, FiltroFacturas;
var hdfGenerico;

$(function () {

    hdfGenerico = $("#hdfGenerico").val();
    if (hdfGenerico == "1") {
        $("#dvFactura").hide();
    }
    else {
        $("#dvFactura").show();
    }

    ValidarNumeroEnCajaTexto2("txtMontoContrato", ValidarDecimal, null, false);
    ValidarNumeroEnCajaTexto2("txtMontoOS", ValidarDecimal, null, false);
    ValidarNumeroEnCajaTexto2("txtConsecutivo03_BS", ValidarSoloEntero, null, false);


    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false,
        active: false
    });
    $("#AccordionJQ1").accordion("option", "active", 1);

    Inicio();

    $(window).resize(function (a, c) {
        DimPosElementos();
    });
    DimPosElementos();

    var today = new Date();
    $(".DIAMESANHO").removeClass("ui-widget-content ui-corner-all");
    $(".DIAMESANHO").css("padding", "0px");
    $(".DIAMESANHO").css("margin", "0px");
    $(".DIAMESANHO").kendoDatePicker({
        culture: "es-ES",
        animation: false,
        start: "month",
        depth: "month",
        format: "dd/MM/yyyy",
        max: new Date(today.setDate(today.getDate()))
    });


    $(".MESANHO").removeClass("ui-widget-content ui-corner-all");
    $(".MESANHO").css("padding", "0px");
    $(".MESANHO").css("margin", "0px");
    $(".MESANHO").kendoDatePicker({
        culture: "es-ES",
        animation: false,
        start: "year",
        depth: "year",
        format: "MM/yyyy",
        max: new Date(today.setDate(today.getDate())),
        change: function() {
            var vcPeriodo = $("#txtPeriodo").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
            mPer = vcPeriodo.substr(0, 2);
            yPer = vcPeriodo.substr(3, 4);
            vcVarConJQ_bpFactura = " Periodo = |" + yPer + mPer + "01| ";
        }
    });


    $("#lstFactura").keyup(function (e) {
        if (e.keyCode == 46) {
            $("#btnQuitarFactura").click();
        }
    });
    $("#btnQuitarFactura").live("click", function () {
        $("#lstFactura option:selected").each(function () {
            var indice = 0;
            var Item = $(this).val();
            $("#lstFactura option:selected").remove();
            indice = -1;
            for (i in bpFactura_lista) {
                if (bpFactura_lista[i] == Item) {
                    indice = i;
                    break;
                }
            }
            if (indice > -1) {
                bpFactura_lista.splice(indice, 1);
            }
        });
    });


    $("#lstCuenta").keyup(function (e) {
        if (e.keyCode == 46) {
            $("#btnQuitarCuenta").click();
        }
    });
    $("#btnQuitarCuenta").live("click", function () {
        $("#lstCuenta option:selected").each(function () {
            var indice = 0;
            var Item = $(this).val();
            $("#lstCuenta option:selected").remove();
            indice = -1;
            for (i in bpCuenta_lista) {
                if (bpCuenta_lista[i] == Item) {
                    indice = i;
                    break;
                }
            }
            if (indice > -1) {
                bpCuenta_lista.splice(indice, 1);
            }
        });
    });



    var vcPeriodo = $("#txtPeriodo").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
    mPer = vcPeriodo.substr(0, 2);
    yPer = vcPeriodo.substr(3, 4);
    vcVarConJQ_bpFactura = " Periodo = |" + yPer + mPer + "01| ";

});

function abrirDialogSelectEmp() {
    var $width = 920;
    var $height = 505;
    var $Pagina = '../Consultar/Con_SeleccionArea.aspx?Tipo=2&Multiple=1&UnPanel=0'; //JHERRERA 20140807-- Ahora sólo se mostrará un panel para la selección de empleado
    //            var $Pagina = 'Con_SeleccionArea.aspx?Tipo=2&Multiple=1';
    $("#ifArea").attr("src", $Pagina);
    Modal = $('#dvArea').dialog({
        title: "Seleccionar cuenta",
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
}

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
}

function Inicio() {
    $(".btnNormal").button({});
    $("#btnReporte").click(btnReporte_Click);
}
function btnReporte_Click() {
    var Reporte = $("#cboReporte").val();
    var pagina = "";

    FiltroCuentas = ObtenerCuentasFiltro();
    FiltroFacturas = ObtenerFacturasFiltro();

    switch (Reporte) {
        case "0":
            //Reporte Conformidad
            fnReporteConformidad();
            break;
        case "1":
            //Reporte Bienes y Servicios
            fnReporteBienesServicios();
            break;
        case "2":
            //Reporte Anexo - Procura
            fnReporteAnexoProcura();
            break;
        default: break;

    }

}

function fnReporteAnexoProcura() {

    var vcPeriodo = $("#txtPeriodo").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
    if ($.trim(vcPeriodo) == "") {
        alerta("Ingrese el periodo del archivo a importar");
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
        alerta("El periodo es inválido.", "Mensaje");
        $("#txtPeriodo").focus();
        return;
    }
    var Periodo = yPer + mPer + "01";
    $.ajax({
        url: "Documentos.aspx/ActualizarFiltroProcura",
        data: "{'Periodo':'" + Periodo + "','FiltroCuentas':'" + FiltroCuentas + "','FiltroFacturas':'" + FiltroFacturas + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result.d[0].PeriodoTieneFacturacion == "0") {
                alerta("No existe información en el periodo seleccionado", "Mensaje");
                $("#txtPeriodo").focus();
                return;
            }

            pagina = "Reportes/Adm_ReporteConcilia.aspx?vcTab=Conciliacion&Periodo=" + Periodo + "&vcTipRep=3";
            $("#ifReporteFormato").attr("src", pagina);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnReporteConformidad() {

    var vcPeriodo = $("#txtPeriodo").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
    if ($.trim(vcPeriodo) == "") {
        alerta("Ingrese el periodo del archivo a importar");
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
        alerta("El periodo es inválido.", "Mensaje");
        $("#txtPeriodo").focus();
        return;
    }

    var Periodo = yPer + mPer + '01';
    $("#ddlTipoServicio").val(1);
    $("#txtReporteNro").val("");
    $("#txtLugar").val("");
    $("#txtContrato").val("");
    $("#txtSolpe").val("");
    $("#txtOrdenSurtimiento").val("");
    $("#txtFechaFormalizacionContrato").val("");
    $("#txtFechaRecepcionContrato").val("");
    $("#txtMontoContrato").val("");
    $("#txtMontoOS").val("");
    $("#txtPedidoAsociado").val("");
    $("#txtRazonSocial").val("");
    $("#txtClaveOperador").val("");
    $("#txtRFC").val("");
    $("#txtGerencia").val("");
    $("#txtSubGerencia").val("");
    $("#txtDepartamento").val("");
    $("#txtEmitidoNombre").val("");
    $("#txtEmitidoCargo").val("");
    $("#txtEmitidoFecha").val("");
    $("#txtProveedorNombre").val("");
    $("#txtProveedorCargo").val("");
    $("#txtProveedorFecha").val("");

    $.ajax({
        url: "Documentos.aspx/ObtenerReporte_Cabecera_Conformidad",
        data: "{'Periodo':'" + Periodo + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            //debugger;
            if (result.d[0].PeriodoTieneFacturacion == "0") {
                alerta("No existe información en el periodo seleccionado", "Mensaje");
                $("#txtPeriodo").focus();
                return;
            }

            if (result.d[0].ReporteNro != "") {
                $("#lblNroConsecutivoAnterior").html("(Anterior: " + result.d[0].ReporteNro + ")");
            }
            else {
                $("#lblNroConsecutivoAnterior").html("");
            }
            $("#txtLugar").val(result.d[0].Lugar);
            $("#txtContrato").val(result.d[0].Contrato);
            $("#txtSolpe").val(result.d[0].Solpe);
            $("#txtOrdenSurtimiento").val(result.d[0].OrdenSurtimiento);
            $("#txtFechaFormalizacionContrato").val(result.d[0].FechaFormalizacionContrato_STR);
            $("#txtFechaRecepcionContrato").val(result.d[0].FechaRecepcionContrato_STR);
            $("#txtMontoContrato").val(JqGrid_FormatoNumero(result.d[0].MontoContrato, true));
            $("#txtMontoOS").val(JqGrid_FormatoNumero(result.d[0].MontoOS, true));
            $("#txtPedidoAsociado").val(result.d[0].PedidoAsociado);
            $("#txtRazonSocial").val(result.d[0].RazonSocial);
            $("#txtClaveOperador").val(result.d[0].ClaveOperador);
            $("#txtRFC").val(result.d[0].RFC);
            $("#txtGerencia").val(result.d[0].Gerencia);
            $("#txtSubGerencia").val(result.d[0].SubGerencia);
            $("#txtDepartamento").val(result.d[0].Departamento);
            $("#txtEmitidoNombre").val(result.d[0].EmitidoNombre);
            $("#txtEmitidoCargo").val(result.d[0].EmitidoCargo);
            $("#txtProveedorNombre").val(result.d[0].ProveedorNombre);
            $("#txtProveedorCargo").val(result.d[0].ProveedorCargo);
            $("#txtReporteNro").focus();

            $('#dvGenerarConformidad').dialog({
                title: "Generar Reporte de Conformidad",
                modal: true,
                width: 1100,
                buttons: {
                    "Generar": function () {

                        var oDialogo = this;

                        var ddlTipoServicio = $("#ddlTipoServicio").val();
                        var txtReporteNro = $.trim($("#txtReporteNro").val());
                        var txtLugar = $.trim($("#txtLugar").val());
                        var txtFechaReciboSolicitud = $("#txtFechaReciboSolicitud").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
                        var txtFechaFormalizacionContrato = $("#txtFechaFormalizacionContrato").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
                        var txtFechaRecepcionContrato = $("#txtFechaRecepcionContrato").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
                        var txtEmitidoFecha = $("#txtEmitidoFecha").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
                        var txtProveedorFecha = $("#txtProveedorFecha").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
                        var txtGerencia = $.trim($("#txtGerencia").val());
                        var txtSubGerencia = $.trim($("#txtSubGerencia").val());
                        var txtDepartamento = $.trim($("#txtDepartamento").val());
                        var txtContrato = $.trim($("#txtContrato").val());
                        var txtSolpe = $.trim($("#txtSolpe").val());
                        var txtOrdenSurtimiento = $.trim($("#txtOrdenSurtimiento").val());
                        var txtMontoContrato = $.trim($("#txtMontoContrato").val());
                        var txtMontoOS = $.trim($("#txtMontoOS").val());
                        var txtPedidoAsociado = $.trim($("#txtPedidoAsociado").val());
                        var txtRazonSocial = $.trim($("#txtRazonSocial").val());
                        var txtClaveOperador = $.trim($("#txtClaveOperador").val());
                        var txtRFC = $.trim($("#txtRFC").val());
                        var txtEmitidoNombre = $.trim($("#txtEmitidoNombre").val());
                        var txtEmitidoCargo = $.trim($("#txtEmitidoCargo").val());
                        var txtProveedorNombre = $.trim($("#txtProveedorNombre").val());
                        var txtProveedorCargo = $.trim($("#txtProveedorCargo").val());

                        txtReporteNro = txtReporteNro.replace(/'/g, "");
                        txtLugar = txtLugar.replace(/'/g, "");
                        txtFechaReciboSolicitud = txtFechaReciboSolicitud.replace(/'/g, "");
                        txtFechaFormalizacionContrato = txtFechaFormalizacionContrato.replace(/'/g, "");
                        txtFechaRecepcionContrato = txtFechaRecepcionContrato.replace(/'/g, "");
                        txtEmitidoFecha = txtEmitidoFecha.replace(/'/g, "");
                        txtProveedorFecha = txtProveedorFecha.replace(/'/g, "");
                        txtGerencia = txtGerencia.replace(/'/g, "");
                        txtSubGerencia = txtSubGerencia.replace(/'/g, "");
                        txtDepartamento = txtDepartamento.replace(/'/g, "");
                        txtContrato = txtContrato.replace(/'/g, "");
                        txtSolpe = txtSolpe.replace(/'/g, "");
                        txtOrdenSurtimiento = txtOrdenSurtimiento.replace(/'/g, "");
                        txtMontoContrato = txtMontoContrato.replace(/'/g, "");
                        txtMontoOS = txtMontoOS.replace(/'/g, "");
                        txtPedidoAsociado = txtPedidoAsociado.replace(/'/g, "");
                        txtRazonSocial = txtRazonSocial.replace(/'/g, "");
                        txtClaveOperador = txtClaveOperador.replace(/'/g, "");
                        txtRFC = txtRFC.replace(/'/g, "");
                        txtEmitidoNombre = txtEmitidoNombre.replace(/'/g, "");
                        txtEmitidoCargo = txtEmitidoCargo.replace(/'/g, "");
                        txtProveedorNombre = txtProveedorNombre.replace(/'/g, "");
                        txtProveedorCargo = txtProveedorCargo.replace(/'/g, "");

                        if (txtReporteNro == "") {
                            alerta("Debe ingresar el número del reporte", "Mensaje");
                            $("#txtReporteNro").focus();
                            return;
                        }

                        $.ajax({
                            url: "Documentos.aspx/GuardarReporte_Cabecera_Conformidad",
                            data: "{'Tipo':'" + ddlTipoServicio + "','ReporteNro':'" + txtReporteNro + "','Lugar':'" + txtLugar + "'," +
                                   "'FechaReciboSolicitud':'" + txtFechaReciboSolicitud + "','FechaFormalizacionContrato':'" + txtFechaFormalizacionContrato + "', 'FechaRecepcionContrato':'" + txtFechaRecepcionContrato + "'," +
                                   "'Gerencia':'" + txtGerencia + "','SubGerencia':'" + txtSubGerencia + "', 'Departamento':'" + txtDepartamento + "'," +
                                   "'Contrato':'" + txtContrato + "','Solpe':'" + txtSolpe + "', 'OrdenSurtimiento':'" + txtOrdenSurtimiento + "'," +
                                   "'MontoContrato':'" + txtMontoContrato + "','MontoOS':'" + txtMontoOS + "', 'PedidoAsociado':'" + txtPedidoAsociado + "'," +
                                   "'RazonSocial':'" + txtRazonSocial + "','ClaveOperador':'" + txtClaveOperador + "', 'RFC':'" + txtRFC + "'," +
                                   "'EmitidoNombre':'" + txtEmitidoNombre + "','EmitidoCargo':'" + txtEmitidoCargo + "', 'EmitidoFecha':'" + txtEmitidoFecha + "'," +
                                   "'ProveedorNombre':'" + txtProveedorNombre + "','ProveedorCargo':'" + txtProveedorCargo + "', 'ProveedorFecha':'" + txtProveedorFecha + "'," +
                                   "'ProveedorPuesto':'','FiltroCuentas':'" + FiltroCuentas + "','FiltroFacturas':'" + FiltroFacturas + "'}",
                            dataType: "json",
                            type: "post",
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                var pagina = "Reportes/Adm_ReporteConcilia.aspx?vcTab=Conciliacion&vcTipRep=1&Periodo=" + Periodo + "&IdConformidad=" + result.d;
                                $("#ifReporteFormato").attr("src", pagina);
                                $(oDialogo).dialog("close");
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });

                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function fnReporteBienesServicios() {

    var vcPeriodo = $("#txtPeriodo").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
    if ($.trim(vcPeriodo) == "") {
        alerta("Ingrese el periodo del archivo a importar");
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
        alerta("El periodo es inválido.", "Mensaje");
        $("#txtPeriodo").focus();
        return;
    }

    var Periodo = yPer + mPer + '01';

    $("#txtConsecutivo01_BS").val("");
    $("#txtConsecutivo02_BS").val("");
    $("#txtConsecutivo03_BS").val("");
    //$("#txtLugar_BS").val("");
    $("#txtSubDireccion_BS").val("");
    $("#txtGerencia_BS").val("");
    $("#txtProveedor_BS").val("");
    $("#txtCompromisoSAP_BS").val("");
    $("#txtDetalle01_BS").val("");
    $("#txtPartida_BS").val("");
    $("#txtDetalle02_BS").val("");
    $("#txtEmitidoNombre_BS").val("");
    $("#txtEmitidoCargo_BS").val("");
    $("#txtEmitidoFicha_BS").val("");
    $("#txtPersonalCOPADE_BS").val("");

    $.ajax({
        url: "Documentos.aspx/ObtenerReporte_Cabecera_BienesServicios",
        data: "{'Periodo':'" + Periodo + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            if (result.d[0].PeriodoTieneFacturacion == "0") {
                alerta("No existe información en el periodo seleccionado", "Mensaje");
                return;
            }

            if (result.d[0].Consecutivo01 != "") {
                $("#lblIdBienAnterior").html("(Anterior: " + result.d[0].Consecutivo01 + "-" + result.d[0].Consecutivo02 + "-#" + ")");
            }
            else {
                $("#lblIdBienAnterior").html("");
            }

            $("#txtConsecutivo01_BS").val(result.d[0].Consecutivo01);
            $("#txtConsecutivo02_BS").val(result.d[0].Consecutivo02);
            $("#txtConsecutivo03_BS").val("1");
            //$("#txtLugar_BS").val(result.d[0].Lugar);
            $("#txtSubDireccion_BS").val(result.d[0].SubGerencia);
            $("#txtGerencia_BS").val(result.d[0].Gerencia);
            $("#txtProveedor_BS").val(result.d[0].Proveedor);
            $("#txtCompromisoSAP_BS").val(result.d[0].CompromisoSAP);
            $("#txtDetalle01_BS").val(result.d[0].Detalle01);
            $("#txtPartida_BS").val(result.d[0].NroPartida);
            $("#txtDetalle02_BS").val(result.d[0].Detalle02);
            $("#txtEmitidoNombre_BS").val(result.d[0].EmitidoNombre);
            $("#txtEmitidoCargo_BS").val(result.d[0].EmitidoCargo);
            $("#txtEmitidoFicha_BS").val(result.d[0].EmitidoFicha);
            $("#txtPersonalCOPADE_BS").val(result.d[0].PersonaCOPADE);

            $("#txtConsecutivo01").focus();

            $('#dvGenerarBienesServicios').dialog({
                title: "Generar Reporte Bienes y Servicios",
                modal: true,
                width: 800,
                buttons: {
                    "Generar": function () {

                        var oDialogo = this;

                        var txtConsecutivo01_BS = $.trim($("#txtConsecutivo01_BS").val());
                        var txtConsecutivo02_BS = $.trim($("#txtConsecutivo02_BS").val());
                        var txtConsecutivo03_BS = $.trim($("#txtConsecutivo03_BS").val());
                        var txtLugar_BS = $.trim($("#txtLugar_BS").val());
                        var txtSubDireccion_BS = $.trim($("#txtSubDireccion_BS").val());
                        var txtGerencia_BS = $.trim($("#txtGerencia_BS").val());
                        var txtProveedor_BS = $.trim($("#txtProveedor_BS").val());
                        var txtCompromisoSAP_BS = $.trim($("#txtCompromisoSAP_BS").val());
                        var txtDetalle01_BS = $.trim($("#txtDetalle01_BS").val());
                        var txtPartida_BS = $.trim($("#txtPartida_BS").val());
                        var txtDetalle02_BS = $.trim($("#txtDetalle02_BS").val());
                        var txtEmitidoNombre_BS = $.trim($("#txtEmitidoNombre_BS").val());
                        var txtEmitidoCargo_BS = $.trim($("#txtEmitidoCargo_BS").val());
                        var txtEmitidoFicha_BS = $.trim($("#txtEmitidoFicha_BS").val());
                        var txtPersonalCOPADE_BS = $.trim($("#txtPersonalCOPADE_BS").val());

                        txtConsecutivo01_BS = txtConsecutivo01_BS.replace(/'/g, "");
                        txtConsecutivo02_BS = txtConsecutivo02_BS.replace(/'/g, "");
                        txtConsecutivo03_BS = txtConsecutivo03_BS.replace(/'/g, "");
                        txtLugar_BS = txtLugar_BS.replace(/'/g, "");
                        txtSubDireccion_BS = txtSubDireccion_BS.replace(/'/g, "");
                        txtGerencia_BS = txtGerencia_BS.replace(/'/g, "");
                        txtProveedor_BS = txtProveedor_BS.replace(/'/g, "");
                        txtCompromisoSAP_BS = txtCompromisoSAP_BS.replace(/'/g, "");
                        txtDetalle01_BS = txtDetalle01_BS.replace(/'/g, "");
                        txtPartida_BS = txtPartida_BS.replace(/'/g, "");
                        txtDetalle02_BS = txtDetalle02_BS.replace(/'/g, "");
                        txtEmitidoNombre_BS = txtEmitidoNombre_BS.replace(/'/g, "");
                        txtEmitidoCargo_BS = txtEmitidoCargo_BS.replace(/'/g, "");
                        txtEmitidoFicha_BS = txtEmitidoFicha_BS.replace(/'/g, "");
                        txtPersonalCOPADE_BS = txtPersonalCOPADE_BS.replace(/'/g, "");

                        if (txtConsecutivo01_BS == "") {
                            alerta("Debe ingresar el número del reporte", "Mensaje");
                            $("#txtConsecutivo01_BS").focus();
                            return;
                        }

                        $.ajax({
                            url: "Documentos.aspx/GuardarReporte_Cabecera_BienesServicios",
                            data: "{'Consecutivo01':'" + txtConsecutivo01_BS + "','Consecutivo02':'" + txtConsecutivo02_BS + "','Consecutivo03':'" + txtConsecutivo03_BS + "'," +
                                   "'Lugar':'" + txtLugar_BS + "','SubGerencia':'" + txtSubDireccion_BS + "', 'Gerencia':'" + txtGerencia_BS + "'," +
                                   "'Proveedor':'" + txtProveedor_BS + "','CompromisoSAP':'" + txtCompromisoSAP_BS + "', 'Detalle01':'" + txtDetalle01_BS + "'," +
                                   "'NroPartida':'" + txtPartida_BS + "','Detalle02':'" + txtDetalle02_BS + "', 'EmitidoNombre':'" + txtEmitidoNombre_BS + "'," +
                                   "'EmitidoCargo':'" + txtEmitidoCargo_BS + "','EmitidoFicha':'" + txtEmitidoFicha_BS + "', 'PersonaCOPADE':'" + txtPersonalCOPADE_BS + "'," +
                                   "'FiltroCuentas':'" + FiltroCuentas + "','FiltroFacturas':'" + FiltroFacturas + "'}",
                            dataType: "json",
                            type: "post",
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                var pagina = "Reportes/Adm_ReporteConcilia.aspx?vcTab=Conciliacion&vcTipRep=2&Periodo=" + Periodo + "&IdBien=" + result.d;
                                $("#ifReporteFormato").attr("src", pagina);
                                $(oDialogo).dialog("close");
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });

                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function fnMostrarDatosFactura(resultado) {
}
function fnMostrarDatosCuenta() {
}

function fnListaOK_bpFactura(lista) {
    if (lista.length > 0) {
        $(lista).each(function () {
            var j = 0;
            var valor = this;
            var lstValor = valor.split("=");
            if ($('#lstFactura option').length > 0) {
                $('#lstFactura option').each(function () {
                    var factura = this.text.split("=")[0];
                    if (factura == lstValor[0]) {
                        j++;
                    }
                });
            }
            if (j == 0) {
                $("#lstFactura").append($("<option></option>").attr("value", lstValor[0]).text(lstValor[0]));
            }
        });
        if (lista.length == 1) {
            $("#bpFactura_txtValorBusqueda").val("");
        }
    }
    //} else {
    //    $("#lstFactura").html("");
    //    $(Criterio.Lineas).each(function () {
    //        var lstValores = this;
    //        $("#lstFactura").append($("<option></option>").attr("value", lstValores.Factura).text(lstValores.Factura));
    //    });
    //}

}

function fnListaOK_bpCuenta(lista) {

    if (lista.length > 0) {
        $(lista).each(function () {
            var j = 0;
            var valor = this;
            var lstValor = valor.split("=");
            if ($('#lstCuenta option').length > 0) {
                $('#lstCuenta option').each(function () {
                    var cuenta = this.text.split("=")[0];
                    if (cuenta == lstValor[0]) {
                        j++;
                    }
                });
            }
            if (j == 0) {
                $("#lstCuenta").append($("<option></option>").attr("value", valor).text(valor));
            }
        });
        $("#bpCuenta_txtValorBusqueda").val("");
    }
    //else {
    //    $("#lstLinea").html("");
    //    $(Criterio.Lineas).each(function () {
    //        var lstValores = this;
    //        $("#lstLinea").append($("<option></option>").attr("value", lstValores.NumeroLinea).text(lstValores.NumeroLinea));
    //    });
    //}

}

function ObtenerCuentasFiltro() {
    var Cuentas = '';
    $("#lstCuenta option").each(function () {
        Cuentas += ",@" + $(this).val().split('=')[0] + "@";
    });
    if (Cuentas.length > 0) {
        Cuentas = Cuentas.substring(1, Cuentas.length);
    }
    return Cuentas;
}
function ObtenerFacturasFiltro() {
    var Facturas = '';
    $("#lstFactura option").each(function () {
        Facturas += ",@" + $(this).val() + "@";
    });
    if (Facturas.length > 0) {
        Facturas = Facturas.substring(1, Facturas.length);
    }
    return Facturas;
}


//#region "Funciones Generales"
function checkperiodo(m, y) {
    if (m > 0 && m < 13 && y > 0 && y < 32768) {
        var d = new Date();
        return d.getDate();
    }
}
//#endregion

function MostrarMensajeSinDatos() {
    alerta("No hay datos según los criterios seleccionados");
}