$(function () {
    var idCliente = window.parent.parent.idCliente;
    var Selecciono = false;
    var timeoutHnd;
    var diaInicial = 1;
    var diaFinal = 30;

    inicio();

    function inicio() {
        ActivarEliminar(false);
    }

    function ActivarEliminar(Activar) {
        if (Activar) {
            $("#BarraNavegacionJQ1_Panel1_Item3").removeAttr("disabled");
            $("#BarraNavegacionJQ1_Panel1_Item3").attr("title", "");
            $("#BarraNavegacionJQ1_Panel1_Item3").addClass("PanelBarraNavegacion");
            $("#BarraNavegacionJQ1_Panel1_Item3").addClass("PanelBarraNavegacionItemSeleccion");
        }
        else {
            $("#BarraNavegacionJQ1_Panel1_Item3").attr("disabled", "disabled");
            $("#BarraNavegacionJQ1_Panel1_Item3").attr("title", "Abra el documento a Anular");
            $("#BarraNavegacionJQ1_Panel1_Item3").removeClass("PanelBarraNavegacion");
            $("#BarraNavegacionJQ1_Panel1_Item3").removeClass("PanelBarraNavegacionItemSeleccion");
        }
    }

    $(".btnNormal").button();
    if (isIE() == 6) {
        $("#SplitterJQ1_D_tS").css('display', 'none');
        $("#btnGuardar").css('width', '100px');
        $("#btnAbrirPago").css('width', '100px');
        $("#btnSalirPago").css('width', '100px');
        $("#btnGuardar").css('display', 'inline-block');
        $("#btnAbrirPago").css('display', 'inline-block');
        $("#btnSalirPago").css('display', 'inline-block');
    }

    ValidarNumeroEnCajaTexto("txtTotalPagar", ValidarDecimalPositivo);

    $(".PanelBarraNavegacion").live("mousemove", function () {
        $(this).addClass('ui-state-highlight quitarBorde');
    });

    $(".PanelBarraNavegacion").live("mouseout", function () {
        $(this).removeClass('ui-state-highlight quitarBorde');
    });

    $(".PanelBarraNavegacionItemSeleccion").live("click", function () {
        var EventoClick = $(this).attr("Click");
        eval(EventoClick)();
    });

    if ($("#lblPeriodoInicial").html() == "") {
        CargarFechasPeriodo();
    }

    function CargarFechasPeriodo() {
        var mes = $("#txtPeriodo").val().split("/")[0];
        var ano = $("#txtPeriodo").val().split("/")[1];
        $("#lblPeriodoInicial").html(('0' + diaInicial).slice(-2).toString() + "/" + $("#txtPeriodo").val());
        if (diaInicial == 1) {
            $("#lblPeriodoFin").html(('0' + diaFinMes(mes, ano)).slice(-2).toString() + "/" + $("#txtPeriodo").val());
        }
        else {
            $("#lblPeriodoFin").html(('0' + diaFinal).slice(-2).toString() + "/" + ('0' + (parseInt(mes) - 1).toString()).slice(-2).toString() + "/" + ano);
        }
    }

    function NuevoPago() {
        ActivarEliminar(false);
        $("#hdfCodPago").val("0");
        $("#ddlOperador").val("-1");
        var fecha_actual = new Date();
        diaInicial = 1;
        diaFinal = diaFinMes(fecha_actual.getMonth(), fecha_actual.getFullYear());
        CargarFechasPeriodo();
        $("#txtFechaPago").val('');
        $("#txtNumeroRecibo").val('');
        $("#ddlFormaPago").val("-1");
        $("#txtTotalPagar").val("");
        $("#txtCuenta").val("");
        $("#hdfCuenta").val("");
        $("#ddlOperador").focus();
        $("#dvEdicionPago").css("display", "");
        $("#btnGuardar").css("display", "");
    }

    function AbrirPago() {
        ListarPagos();
        $('#dialogBuscador').dialog({
            title: "Buscar pago",
            width: 670,
            height: 445,
            modal: true,
            resizable: false
        });
    }

    function EliminarPago() {
        var codPago = $("#hdfCodPago").val();
        if (codPago != "0" && codPago != "") {

            $('#divMsgConfirmacion').dialog({
                title: "Anular Pago",
                modal: true,
                buttons: {
                    "Si": function () {
                        $("#dvCargando").show();
                        $.ajax({
                            type: "POST",
                            url: "Adm_IngresarPago.aspx/Anular",
                            data: "{'inCodPag': '" + codPago + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                $("#dvCargando").hide();
                                $("#hdfCodPago").val("0");
                                ActivarEliminar(false);
                                $("#dvEdicionPago").css("display", "none");
                                if (result.d == "") {
                                    Mensaje("<br/><h1>Pago Anulado</h1><br/>", document, CerroMensaje);
                                }
                                else {
                                    alert(result.d);
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
                    }
                }
            });
        }
        else {
            alerta("No hay un pago abierto o creado");
        }
    }

    var tbPagos = $("#tbPagos").jqGrid({
        datatype: "local",
        //        datatype: function () {
        //            ListarPagos();
        //        },
        colModel: [{ name: 'P_inCodPag', index: 'P_inCodPag', label: 'inCodigo', hidden: true },
       		           { name: 'vcCodPag', index: 'vcCodPag', label: 'Código', width: '100', hidden: true },
       		           { name: 'P_inCodOpe', index: 'P_inCodOpe', label: 'CodOperador', hidden: true },
       		           { name: 'vcNomOpe', index: 'vcNomOpe', label: 'Operador' },
                       { name: 'vcCodCta', index: 'vcCodCta', label: 'CodCuenta', hidden: true },
       		           { name: 'vcCta', index: 'vcCta', label: 'Cuenta' },
       		           { name: 'dtPerIni', index: 'dtPerIni', label: 'PeriodoIni', hidden: true },
       		           { name: 'dtPerFin', index: 'dtPerFin', label: 'PeriodoFin', hidden: true },
       		           { name: 'vcPerFac', index: 'vcPerFac', label: 'Periodo' },
       		           { name: 'vcNom', index: 'vcNom', label: 'Estado', width: '150' },
       		           { name: 'dcTotPag', index: 'dcTotPag', label: 'Monto', width: '50' }
       	              ],
        sortname: "P_inCodPag", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "640",
        height: "250",
        rownumbers: true,
        caption: "Pagos",
        ondblClickRow: function (id) { $("#btnAbrirPago").click(); }
    });

    $("#tbPagos").jqGrid('bindKeys', { "onEnter": function (id) { $("#btnAbrirPago").click(); }, "onSpace": function (id) { $("#btnAbrirPago").click(); } });

    $("#btnAbrirPago").click(function (event) {
        var id = $("#tbPagos").jqGrid('getGridParam', 'selrow');
        if (id) {
            var datos = $("#tbPagos").jqGrid('getRowData', id);
            var inCodigo = datos.P_inCodPag;

            window.location.href = 'Adm_IngresarPago.aspx?inCod=18&inTip=3&inTipOri=1&idPago=' + inCodigo;
            //            var Operador = datos.P_inCodOpe//datos['Operador.P_inCodOpe'];
            //            var dtPerIni = datos.dtPerIni;
            //            var dtPerFin = datos.dtPerFin;
            //            var Monto = datos.dcTotPag;
            //            var Cta = datos.vcCta;
            //            var CodCta = datos.vcCodCta;

            //            $("#hdfCodPago").val(inCodigo);
            //            $("#ddlOperador").val(Operador);
            //            $("#txtCuenta").val(Cta);
            //            $("#hdfCuenta").val(CodCta);

            //            dtPerIni = new Date(parseInt(dtPerIni.slice(6, -2)));
            //            dtPerFin = new Date(parseInt(dtPerFin.slice(6, -2)));
            //            dtPerIni = '' + dtPerIni.getDate() + '/' + (1 + dtPerIni.getMonth()) + '/' + dtPerIni.getFullYear().toString();
            //            dtPerFin = '' + dtPerFin.getDate() + '/' + (1 + dtPerFin.getMonth()) + '/' + dtPerFin.getFullYear().toString();

            //            $("#txtPeriodoInicial").val(dtPerIni);
            //            $("#txtPeriodoFin").val(dtPerFin);
            //            $("#txtTotalPagar").val(Monto);
            //            $('#dialogBuscador').dialog("close");
            //            ActivarEliminar(true);
            //            $("#dvEdicionPago").css("display", "");



            //            if ($("#hdfA").val() == "1") {
            //                $("#btnGuardar").css("display", "");
            //            }
            //            else {
            //                $("#btnGuardar").css("display", "none");
            //            }
        }
        else {
            alerta("Seleccione un pago");
        }
    });

    $("#btnSalirPago").click(function () {
        $('#dialogBuscador').dialog("close");
    });

    $(".txtFecha").datepicker({
        changeMonth: true,
        changeYear: true
    });

    //  ActivarDatePickerPeriodoKendo("#txtPeriodo",50, CargarFechasPeriodo);
    //    function CambiarPeriodo(){
    //        alert(kendo.toString(this.value(), 'd'));
    //    };

    //    $("#txtPeriodoInicial").datepicker({
    //        changeMonth: true,
    //        changeYear: true,
    //        onSelect: function (dateText, inst) {
    //            $('#txtPeriodoFin').val(PeriodoFacturacionFin($("#txtPeriodoInicial").val()));
    //        }
    //    });

    $("#txtFechaPago").datepicker({
        changeMonth: true,
        changeYear: true
    });

    function SetearPeriodoFacturacion(vcCodCuenta) {
        if (vcCodCuenta != "") {
            $.ajax({
                type: "POST",
                url: "Adm_IngresarPago.aspx/ObtenerCuenta",
                data: "{'vcCodCue': '" + vcCodCuenta + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    diaInicial = result.d.dcPerFacIni;
                    diaFinal = result.d.dcPerFacFin;
                    CargarFechasPeriodo();
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
        else {
            var fecha_actual = new Date();
            diaInicial = 1;
            diaFinal = diaFinMes(fecha_actual.getMonth(), fecha_actual.getFullYear());
            CargarFechasPeriodo();
        }
    }

    $("#txtCuenta").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../Common/WebService/General.asmx/ListarCuentas",
                data: "{'maxFilas': '" + 200 + "'," +
                           "'vcCodNom': '" + $("#txtCuenta").val().replace(/'/g, "&#39") + "'," +
                           "'inCodOpe': '" + $("#ddlOperador").val() + "'," +
                           "'idCliente': '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.P_vcCod,
                            vcNomOpe: item.vcNom
                        };
                    }));
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtCuenta").val(ui.item.vcNomOpe);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtCuenta").val(ui.item.vcNomOpe);
            $("#hdfCuenta").val(ui.item.label);
            SetearPeriodoFacturacion(ui.item.label);
            //$("#hdfNomEmp").val(ui.item.vcNomEmp);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCuenta").val("");
                SetearPeriodoFacturacion("");
            }
            return false;
        },
        open: function (event, ui) {
            Selecciono = false;
            return false;
        }
    })
        .data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>")
    			.data("item.autocomplete", item)
    			.append("<a>" + item.label + "=" + item.vcNomOpe + "</a>")
    			.appendTo(ul);
        };

    $("#txtCuenta").focusout(function () {
        $.ajax({
            type: "POST",
            url: "../../Common/WebService/General.asmx/ListarCuentas",
            data: "{'maxFilas': '" + 200 + "'," +
                       "'vcCodNom': '" + $("#txtCuenta").val().replace(/'/g, "&#39") + "'," +
                       "'inCodOpe': '" + $("#ddlOperador").val() + "'," +
                       "'idCliente': '" + idCliente + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if ($(result.d).length == 1) {
                    $("#hdfCuenta").val(result.d[0].P_vcCod);
                    //alert($("#hdfCuenta").val());
                    //$("#hdfNomEmp").val(result.d[0].Empleado.vcNom);
                    Selecciono = true;
                }
                else {
                    $("#hdfCuenta").val("");
                    //$("#hdfNomEmp").val("");
                    Selecciono = false;
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    $("#btnGuardar").click(function () {
        var CodPago = $("#hdfCodPago").val();
        var Operador = $("#ddlOperador").val();
        var PeriodoInicial = $("#lblPeriodoInicial").html();
        var PeriodoFin = $("#lblPeriodoFin").html();
        var TotalPagar = $("#txtTotalPagar").val();
        var CodCuenta = $("#hdfCuenta").val();
        var FechaPago = $("#txtFechaPago").val();
        var NumeroRecibo = $("#txtNumeroRecibo").val().replace(/'/g, "&#39");
        var CodFormaPago = $("#ddlFormaPago").val();

        //alert($("#hdfCuenta").val());
        if (Operador == "-1") {
            alerta("Seleccione un operador");
            $("#ddlOperador").focus();
            return;
        }
        if (PeriodoInicial == "") {
            alerta("Seleccione un periodo");
            $("#txtPeriodo").focus();
            return;
        }
        if (TotalPagar == "") {
            alerta("Ingrese un monto");
            $("#txtTotalPagar").focus();
            return;
        }
        if (CodCuenta == "") {
            alerta("Ingrese una Cuenta");
            $("#txtCuenta").focus();
            return;
        }
        if (FechaPago == "") {
            alerta("Ingrese una fecha de pago");
            $("#txtFechaPago").focus();
            return;
        }
        if (NumeroRecibo == "") {
            alerta("Ingrese un número de recibo");
            $("#txtNumeroRecibo").focus();
            return;
        }
        if (CodFormaPago == "-1") {
            alerta("Seleccione una forma de pago");
            $("#ddlFormaPago").focus();
            return;
        }

        //Cargar campos dinamicos...
        var CamposDinamicos = "";
        $(".VARCHAR").each(function (i) {
            if (this.value != "") {
                CamposDinamicos += "[" + $(this).attr("obj") + "]";
                CamposDinamicos += " = \"";
                CamposDinamicos += this.value;
                CamposDinamicos += "\",";
            }
        });
        $(".INT").each(function (i) {
            if (this.value != "") {
                CamposDinamicos += "[" + $(this).attr("obj") + "]";
                CamposDinamicos += " = ";
                CamposDinamicos += this.value;
                CamposDinamicos += ",";
            }
        });
        $(".DECIMAL").each(function (i) {
            if (this.value != "") {
                CamposDinamicos += "[" + $(this).attr("obj") + "]";
                CamposDinamicos += " = ";
                CamposDinamicos += this.value;
                CamposDinamicos += ",";
            }
        });
        $(".DATE").each(function (i) {
            if (this.value != "") {
                CamposDinamicos += "[" + $(this).attr("obj") + "]";
                CamposDinamicos += " = \"";
                CamposDinamicos += this.value;
                CamposDinamicos += "\",";
            }
        });
        $(".DATETIME").each(function (i) {
            if (this.value != "") {
                CamposDinamicos += "[" + $(this).attr("obj") + "]";
                CamposDinamicos += " = \"";
                CamposDinamicos += this.value;
                CamposDinamicos += "\",";
            }
        });
        $(".BIT").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = ";
            if ($("input", this).is(':checked') == true) {
                CamposDinamicos += "1";
            }
            else {
                CamposDinamicos += "0";
            }
            CamposDinamicos += ",";
        });

        $.ajax({
            type: "POST",
            url: "Adm_IngresarPago.aspx/Guardar",
            data: "{'inCodPag': '" + CodPago + "'," +
                       "'inCodOpe': '" + Operador + "'," +
                       "'dtPerIni': '" + PeriodoInicial + "'," +
                       "'dtPerFin': '" + PeriodoFin + "'," +
                       "'dcTotPag': '" + TotalPagar + "'," +
                       "'vcCodCta': '" + CodCuenta + "'," +
                       "'vcCamDim': '" + CamposDinamicos + "'," +
                       "'dtFecPag': '" + FechaPago + "'," +
                       "'vcNumRec': '" + NumeroRecibo + "'," +
                       "'inCodFor': '" + CodFormaPago + "'}",
            //"'dcTotPag': '" + TotalPagar + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "1") {
                    Mensaje("<br/><h1>Ya existe registrado un pago con el mismo operador, cuenta y periodo.</h1><br/>", document, CerroMensaje);
                } else {
                    $("#hdfCodPago").val(result.d);
                    Mensaje("<br/><h1>Pago guardado</h1><br/>", document, CerroMensaje);
                    ActivarEliminar(true);
                    //NuevoPago();
                    window.location.href = 'Adm_IngresarPago.aspx?inCod=18&inTip=3&inTipOri=1';
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    function CerroMensaje() {
    }

    $("#imgBorrarPerIni").click(function () {
        $("#txtFechaPeriodoI").val("");
        ListarPagos();
    });
    $("#imgBorrarPerFin").click(function () {
        $("#txtFechaPeriodoF").val("");
        ListarPagos();
    });

    function isIE() { //Vefiricar Version del Internet Explorer
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
    }

    function Salir() {
        var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;

        var Accord = window.parent.$("#" + tab1);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    }

    //    $("#txtCodigo").keyup(function () {
    //        if (timeoutHnd)
    //            clearTimeout(timeoutHnd);
    //        timeoutHnd = setTimeout(ListarPagos, 500);
    //    });

    $("#ddlOperadorBusqueda,#txtFechaPeriodoI,#txtFechaPeriodoF,#ddlEstado").change(function () {
        ListarPagos();
    });

    function ListarPagos() {
        var codigo = ""; //$("#txtCodigo").val();
        var Operador = $("#ddlOperadorBusqueda").val();
        var FecPerIni = $("#txtFechaPeriodoI").val();
        var FecPerFin = $("#txtFechaPeriodoF").val();
        var Estado = $("#ddlEstado").val();

        $("#tbPagos").jqGrid('clearGridData');

        $.ajax({
            type: "POST",
            url: "Adm_IngresarPago.aspx/ListarPago",
            data: "{'vcCod': '" + codigo.replace(/'/g, "&#39") + "'," +
                       "'inCodOpe': '" + Operador + "'," +
                       "'dtPerIni': '" + FecPerIni + "'," +
                       "'dtPerFin': '" + FecPerFin + "'," +
                       "'inCodEst': '" + Estado + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if ($(result.d).length > 0) {
                    var i = 0;
                    for (i = 0; i < $(result.d).length; i++) {
                        $("#tbPagos").jqGrid('addRowData', result.d[i].P_inCodPag, result.d[i]);
                    }
                }
                else {
                    Mensaje("<br/><h1>No se encontraron registros</h1><br/>", document, CerroMensaje);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
});