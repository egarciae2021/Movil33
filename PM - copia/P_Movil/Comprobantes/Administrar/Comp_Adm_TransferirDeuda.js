var inTipBus = 1;
var tabDatos;
var arrActEquipo;
var arrActServicio;
var inIdPed = "0";
var inIdDetPed = "0";
var lstGeneral;
var oCultura = window.parent.parent.oCulturaUsuario;

$(function () {

    //#region Inicializando Variables Y Controles

    $("#trDatos").hide();
    tabDatos = $("#tabDatos").tabs({});
    tabCuotas = $("#tabCuotas").tabs({});
    $(".btnListBox").button();
    $(".btnListBox").css({ "width": "40px" });
    $("#btnGuardar").button("option", "disabled", true);

    var Nametab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
    var Accord = window.parent.$("#" + Nametab);

    //#endregion


    //#region Funciones

    inicioPagina();

    function inicioPagina() {
        DimPosElementos();
    }

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        var AnchoLateral = $(".LateralSplitter");

        if (Ancho - 150 >= 853) {
            $('#tabDatos').css("width", 880);
            $('#divGrilla').css("width", 860);
            $('#divInformacion').css("width", 860);
            //$('#divCuotas').css("width", 860);
        } else {
            $('#tabDatos').css("width", Ancho - 110);
            $('#divGrilla').css("width", Ancho - 120);
            $('#divInformacion').css("width", Ancho - 120);
            //$('#divCuotas').css("width", Ancho - 120);
        }
    }

    function CerroMensaje() {
        BloquearPagina(false);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    }

    //#endregion


    //#region Definiendo controles

    $("#txtNombre").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: raiz("Common/WebService/General.asmx/ListarPedidoIMEILineaPorNombre"),
                data: "{'MaxFil': '" + 200 + "'," +
                      "'TipoBusqueda': '" + inTipBus + "'," +
                      "'ValorBusqueda': '" + $('#txtNombre').val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        var itemE = item.split("|");
                        return {
                            IdPedido: itemE[0],
                            IdNombre: itemE[1],
                            Nombre: itemE[2]
                        };
                    }));
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtNombre").val(ui.item.Nombre);
            return false;
        },
        select: function (event, ui) {
            $("#txtNombre").val(ui.item.Nombre);
            $("#hdfNombre").val(ui.item.IdNombre);
            inIdPed = ui.item.IdPedido;
            return false;
        },
        change: function (event, ui) {
            if (!ui.item) {
                //if (!Selecciono) {
                $("#hdfNombre").val("");
                $("#txtNombre").val("");
                inIdPed = "0";
            } else {
                if ($("#txtNombre").val() == "") {
                    $("#hdfNombre").val("");
                    inIdPed = "0";
                }
            }
            fnLimpiarDatos(false);
            return false;
        },
        open: function (event, ui) {
            return false;
        }
    }).data("autocomplete")._renderItem = function (ul, item) {
        return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.Nombre + "</a>").appendTo(ul);
    };

    var tbPedidos = $("#grid").jqGrid({
        sortable: true,
        datatype: "local",
        datatype: function () {
            //var dtInicio = new Date();
            $.ajax({
                url: "Comp_Adm_TransferirDeuda.aspx/MostrarDetallesParaTransferenciaDeuda", //PageMethod
                data: "{'TipoBusqueda':'" + inTipBus + "'," +
                      "'ValorBusqueda':'" + $('#hdfNombre').val() + "'," +
                      "'IdPedido':'" + inIdPed + "'}",
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {

                    fnLimpiarDatos(false);

                    if (result.d.length > 0 && result.d[0].Items.length > 0) {
                        lstDetalles = result.d[0];
                        $("#grid")[0].addJSONData(lstDetalles);
                        $("#trDatos").show();

                        if (lstDetalles.Items.length == 1) {
                            jQuery('#grid').jqGrid('setSelection', lstDetalles.Items[0]["ID"]);
                            inIdDetPed = lstDetalles.Items[0]["ID"];
                            fnMostrarSeccionTransferirA();
                        }

                        lstDatos = result.d[1];
                        $("#lblEmpleado").html(lstDatos[0].toString() + " - " + lstDatos[1].toString());
                        $("#hdfEmpleado").val(lstDatos[0].toString());
                        $("#lblCampana").html(lstDatos[2].toString());
                        $("#lblCodigoPedido").html(lstDatos[3].toString());
                        $("#lblFechaPedido").html(lstDatos[4].toString());

                        $("#lblPropietarioActual_Equipo").html(lstDatos[1].toString());
                        $("#lblPropietarioActual_Servicio").html(lstDatos[1].toString());
                    }
                },
                error: function (xhr, err, thrErr) {
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
                id: "P_inCodSol"
            },
        colModel: [{ name: 'IdDetallePedido', label: 'IdDetallePedido', hidden: true, key: true },
                       { name: 'IdEmpleado', label: 'Cód. Empleado', hidden: false, width: 70, align: 'left' },
                       { name: 'Situacion', label: 'Situación', hidden: false, width: 70, align: "center" },
                       { name: 'ModeloEquipo', label: 'Modelo de equipo', hidden: false, width: 150 },
                       { name: 'IMEI', label: 'IMEI', hidden: false, width: 105, align: "center" },
                       { name: 'Linea', label: 'Línea', hidden: false, width: 70, align: "center" },
                       { name: 'Plan', label: 'Plan', hidden: false, width: 120 },
                       { name: 'MesesContrato', label: 'Meses Contrato', hidden: false, width: 65, align: "center" },
                       { name: 'MontoEquipo', label: 'Monto Equipo', hidden: false, width: 70, align: "right" },
                       { name: 'MontoLinea', label: 'Monto Plan', hidden: false, width: 60, align: "right" }
                   ],
        viewrecords: true,
        loadtext: 'Cargando datos...',
        sortname: "Periodo", //sortname: idTabla, //Default SortColumn
        sortorder: "desc", //Default SortOrder.
        rownumbers: true,
        shrinkToFit: false,
        multiselect: false,
        rowNum: 100,
        width: 855,
        height: "auto",
        onSelectRow: function (id, status, e) {
            if (e) {
                inIdDetPed = id;
                if ($("#hdfTransferirA").val() != "") {
                    fnLimpiarSeccionCuotasProgramadas();
                    fnCargarSeccionCuotasProgramadas();
                } else {
                    fnMostrarSeccionTransferirA();
                }
            } else {
                inIdDetPed = "0";
                fnOcultarSeccionTransferirA();
                fnLimpiarSeccionCuotasProgramadas();
            }
        }
    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });

    //#endregion


    //#region Acciones

    $(window).resize(function () {
        DimPosElementos();
    });

    $("input[name='busqueda']").change(function (e) {
        fnLimpiarDatos(true);

        if ($(this).val() == 'rbtPedido') {
            inTipBus = 1;
            $("#lblNombre").html("Pedido");
        } else if ($(this).val() == 'rbtLinea') {
            inTipBus = 2;
            $("#lblNombre").html("Línea");
        } else if ($(this).val() == 'rbtIMEI') {
            inTipBus = 3;
            $("#lblNombre").html("IMEI");
        }
    });

    $("#txtNombre").live('keypress', function (e) {
        if (e.which == '13') {
            fnVerPedido();
            e.preventDefault();
        }
    });

    $("#btnVerPedido").click(function () {
        fnVerPedido();
    });

    //#region Botones Mover

    $("#btnTodosDerecha_Equipo").click(function () {
        fnAgregarQuitarListboxItems("lstCuoProAct_Equipo", "lstCuoProNue_Equipo", true);
    });
    $("#btnTodosIzquierda_Equipo").click(function () {
        fnAgregarQuitarListboxItems("lstCuoProNue_Equipo", "lstCuoProAct_Equipo", true);
    });

    $("#btnTodosDerecha_Servicio").click(function () {
        fnAgregarQuitarListboxItems("lstCuoProAct_Servicio", "lstCuoProNue_Servicio", true);
    });
    $("#btnTodosIzquierda_Servicio").click(function () {
        fnAgregarQuitarListboxItems("lstCuoProNue_Servicio", "lstCuoProAct_Servicio", true);
    });

    //#endregion

    $("#btnGuardar").click(function () {
        var biTransferirEquipo = false;
        var biTransferirLinea = false;
        var vcCroEquipo = "";
        var vcCroLinea = "";

        if (inIdPed == "0") {
            alerta("La búsqueda por Pedido, IMEI o Línea no devolvió un pedido válido. Inténte realizar la búsqueda nuevamente.");
            return;
        }

        if (inIdDetPed == "0") {
            alerta("No ha seleccionado un detalle de pedido válido.");
            return;
        }

        if ($("#hdfTransferirA").val() == "") {
            alerta("No ha elegido un empleado al que se le transferirá la deuda.");
            return;
        }

        if ($("#lstCuoProNue_Servicio option").length == 0) {
            alerta("La transferencia de la deuda del servicio es requerida. Es imprescindible que la agregue.");
            return;
        }

        //        if ($("#lstCuoProNue_Equipo option").length == 0 && $("#lstCuoProNue_Servicio option").length == 0) {
        //            alerta("Debe transferir por lo menos una de las deudas (Equipo o Servicio).");
        //            return;
        //        }

        if ($.trim($("#hdfEmpleado").val()) == $.trim($("#hdfTransferirA").val())) {
            alerta("El empleado a quién se transferirá la deuda no debe ser el mismo que realizó el pedido. Por favor elija otro empleado.");
            return;
        }

        var data = $('#grid').jqGrid('getRowData', inIdDetPed);
        if ($("#lstCuoProNue_Equipo option").length > 0 && parseFloat(DevuelveNumeroSinFormato(lstGeneral[0][0], oCultura, false)) < parseFloat(DevuelveNumeroSinFormato(data.MontoEquipo, oCultura, false))) {
            alerta("El empleado " + $("#lblPropietarioNuevo_Equipo").html() + " cuenta con crédito disponible de equipos de " + lstGeneral[0][0] + " pero necesita tener " + data.MontoEquipo + " para adquirir la deuda. Por favor asígnele el crédito necesario para proceder con la transferencia de deuda.");
            return;
        }
        if ($("#lstCuoProNue_Servicio option").length > 0 && parseFloat(DevuelveNumeroSinFormato(lstGeneral[0][1], oCultura, false)) < parseFloat(DevuelveNumeroSinFormato(data.MontoLinea, oCultura, false))) {
            alerta("El empleado " + $("#lblPropietarioNuevo_Equipo").html() + " cuenta con crédito disponible de servicio de " + lstGeneral[0][1] + " pero necesita tener " + data.MontoLinea + " para adquirir la deuda. Por favor asígnele el crédito necesario para proceder con la transferencia de deuda.");
            return;
        }

        if ($('#chkTransferirEquipo').attr('checked')) { biTransferirEquipo = true; }
        if ($('#chkTransferirLinea').attr('checked')) { biTransferirLinea = true; }

        $("#lstCuoProNue_Equipo option").each(function () {
            vcCroEquipo += $(this).val() + ",";
        });
        vcCroEquipo = vcCroEquipo.substring(0, vcCroEquipo.length - 1);

        $("#lstCuoProNue_Servicio option").each(function () {
            vcCroLinea += $(this).val() + ",";
        });
        vcCroLinea = vcCroLinea.substring(0, vcCroLinea.length - 1);

        if ($("#lstCuoProNue_Servicio option").length > 0 && $("#lstCuoProNue_Equipo option").length == 0) {
            $("#lblMsjConfirmar").html("¿Está seguro de transferir sólo la deuda de servicio?. Haga click en 'SI' para confirmar la transferencia.");
        } else {
            $("#lblMsjConfirmar").html("¿Está seguro de transferir la deuda del detalle de pedido seleccionado?. Haga click en 'SI' para confirmar la transferencia.");
        }

        $('#divMsgConfirmar').dialog({
            title: "¡Alerta!",
            modal: true,
            width: 330,
            buttons: {
                "Si": function () {
                    $.ajax({
                        type: "POST",
                        url: "Comp_Adm_TransferirDeuda.aspx/GrabarTransferenciaDeuda",
                        data: "{'IdDetallePedido': '" + inIdDetPed + "'," +
                              "'IdEmpleadoNuevo': '" + $("#hdfTransferirA").val() + "'," +
                              "'TransferirEquipo': '" + biTransferirEquipo + "'," +
                              "'TransferirLinea': '" + biTransferirLinea + "'," +
                              "'CronogramaEquipo': '" + vcCroEquipo + "'," +
                              "'CronogramaLinea': '" + vcCroLinea + "'," +
                              "'TipoBusqueda': '" + inTipBus + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            if (result.d == "") {
                                window.scrollTo(0, 0);
                                Mensaje("<br/><h1>La transferencia se realizó con éxito.</h1><br/>", document, CerroMensaje);
                            } else {
                                alerta(result.d);
                                return;
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
    });

    $("#btnCerrar").click(function () {
        var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        var Accord = window.parent.$("#" + tab1);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    });

    //#endregion

});

//#region Funciones

function fnVerPedido() {
    $("#grid").trigger("reloadGrid");
}

function fnLimpiarDatos(BorrarSeleccion) {
    if (BorrarSeleccion) {
        $("#txtNombre").val("");
        $("#hdfNombre").val("");
    }

    $("#trDatos").hide();
    $("#tabDatos").tabs('option', 'selected', 0);
    $("#grid").jqGrid("clearGridData");

    $("#lblEmpleado").html("");
    $("#lblCampana").html("");
    $("#lblCodigoPedido").html("");
    $("#lblFechaPedido").html("");

    fnOcultarSeccionTransferirA();
    fnQuitarSeccionCuotasProgramadas();

    $("#btnGuardar").button("option", "disabled", true);
}

function fnMostrarEmpleado(valor) {
    $("#hdfTransferirA").val(valor);
    if (valor != '') {
        if ($.trim($("#hdfEmpleado").val()) == $.trim($("#hdfTransferirA").val())) {
            $("#spnMsjNuevoEmpleado").html("");
            alerta("El empleado a quién se transferirá la deuda no debe ser el mismo que realizó el pedido. Por favor elija otro empleado.");
            return;
        } else {
            fnCargarSeccionCuotasProgramadas();
        }
    } else {
        fnQuitarSeccionCuotasProgramadas();
    }
}

function fnMostrarSeccionTransferirA() {
    $("#trDivision").show();
    $("#trTransferirA").show();
    $("#trMsjTransferirA").show();
}

function fnOcultarSeccionTransferirA() {
    $("#trDivision").hide();
    $("#trTransferirA").hide();
    $("#trMsjTransferirA").hide();

    $("#bpEmpleado_txtValorBusqueda").val("");
    $("#spnMsjNuevoEmpleado").html("");
    $("#hdfTransferirA").val("");
}

function fnCargarSeccionCuotasProgramadas() {
    $("#trTituloCuotasProg").show();
    $("#trCuotasProgramadas").show();

    var vcNomEmpNue = $("#bpEmpleado_txtValorBusqueda").val();
    vcNomEmpNue = vcNomEmpNue.substr(vcNomEmpNue.indexOf("=") + 1);
    $("#lblPropietarioNuevo_Equipo").html(vcNomEmpNue);
    $("#lblPropietarioNuevo_Servicio").html(vcNomEmpNue);

    if (inIdDetPed != "0") {
        $.ajax({
            type: "POST",
            url: "Comp_Adm_TransferirDeuda.aspx/ListarCuotasProgramadas",
            data: "{'IdDetallePedido': '" + inIdDetPed + "'," +
              "'IdEmpleadoNuevo': '" + $("#hdfTransferirA").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                fnLimpiarSeccionCuotasProgramadas();

                if (result.d.length > 1) {
                    lstGeneral = result.d[0];
                    var lstDatos = result.d[1];

                    $("#spnMsjNuevoEmpleado").html(lstGeneral[0][2]);
                    $("#btnGuardar").button("option", "disabled", false);

                    fnCargarCuotasPropietarioActual(lstDatos);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
}

function fnQuitarSeccionCuotasProgramadas() {
    $("#trTituloCuotasProg").hide();
    $("#trCuotasProgramadas").hide();
    fnLimpiarSeccionCuotasProgramadas();

    $("#btnGuardar").button("option", "disabled", true);
}

function fnLimpiarSeccionCuotasProgramadas() {
    $("#lstCuoProAct_Equipo").empty();
    $("#lstCuoProNue_Equipo").empty();
    $("#lstCuoProAct_Servicio").empty();
    $("#lstCuoProNue_Servicio").empty();

    arrActEquipo = [];
    arrActServicio = [];
}

function fnCargarCuotasPropietarioActual(lstDatos) {
    var vcItem = "";
    var i = 0;
    for (i = 0; i < lstDatos.length; i++) {
        if (lstDatos[i][5] != "") {
            vcItem = "<option value='" + lstDatos[i][1] + "' disabled = 'disabled'>" + lstDatos[i][3] + "</option>";
        } else {
            vcItem = "<option value='" + lstDatos[i][1] + "'>" + lstDatos[i][3] + "</option>";
        }

        if (lstDatos[i][0] == "1") { //Equipo
            arrActEquipo.push({ "IdCronogramaPago": lstDatos[i][1], "NumCuota": lstDatos[i][2], "Titulo": lstDatos[i][3], "MontoCuota": lstDatos[i][4], "IdComprobante": lstDatos[i][5] });
            $('#lstCuoProAct_Equipo').append(vcItem);
        } else { //Servicio (Plan)
            arrActServicio.push({ "IdCronogramaPago": lstDatos[i][1], "NumCuota": lstDatos[i][2], "Titulo": lstDatos[i][3], "MontoCuota": lstDatos[i][4], "IdComprobante": lstDatos[i][5] });
            $('#lstCuoProAct_Servicio').append(vcItem);
        }
    }
}

function fnAgregarQuitarListboxItems(lstInicial, lstFinal, blnTodos) {
    var ValorAgregado = false;
    var selector = "";

    if (blnTodos) {
        selector = "#" + lstInicial + " option";
    } else { //Sólo seleccionados
    selector = "#" + lstInicial + " option:selected";
    }

    if ($(selector).length == 0 && !blnTodos) {
        alerta("Seleccione por lo menos un ítem.");
    } else if ($(selector).length == 0 && blnTodos) {
        alerta("No hay ítems en la lista para mover.");
    } else {
    $(selector).each(function () {
        var Seleccionado = $(this);
        var Existe = false;

        $("#" + lstFinal + " option").each(function () {
            if (Seleccionado.val() == $(this).val()) {
                Existe = true;
                ValorAgregado = true;
                return false;
            }
        });
        if (!Existe && !Seleccionado[0].disabled) {
            $("#" + lstFinal).append($("<option></option>").attr("value", Seleccionado.val()).text(Seleccionado.html()).css("color", "black"));
            $("#" + lstInicial + " option[value*='" + Seleccionado.val() + "']").remove();
        }
    });

        if (ValorAgregado) {
            alerta("Algunos ítems seleccionados ya han sido agregados.");
        } else {
            fnOrdenarLisBoxItems(lstFinal);
        }
    }
}

function fnOrdenarLisBoxItems(selector) {
    var $r = $("#" + selector + " option");

    $r.sort(function (a, b) {
        return a.value - b.value;
    });

    $($r).remove();
    $("#" + selector).append($($r));

}

//#endregion