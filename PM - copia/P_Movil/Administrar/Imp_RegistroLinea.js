var inTipPla;
var idTipRes;
var opcion;
$(function () {
    var Selecciono = false;
    var SeleccionoSucursal = false;
    var SeleccionoModelo = false;
    var lstNum;

    //#region CargaInicio
    var idCliente = window.parent.parent.parent.idCliente;
    CargaInicio();  //ECONDEÑA  16/11/2015
    function CargaInicio() {
        inTipPla = $("#hdfInTipPla").val();
        idTipRes = $("#hdfIdTipRes").val();
        $("#lblSinReg").text(inTipPla != 2 && idTipRes != 1 ? "Líneas" : "Dispositivos");
        $("#lblAregistrar").text(inTipPla != 2 && idTipRes != 1 ? "Líneas" : "Dispositivos");
        $("#trSucursal").css("display", inTipPla != 2 && idTipRes != 1 ? "block" : "none");
        $("#trModeloDisp").css("display", inTipPla != 2 && idTipRes != 1 ? "none" : "block");
        opcion = (inTipPla != 2 && idTipRes != 1 ? true : false);
    }
    //#endregion

    $(".btnNormal").button({});
    var tabOpciones = $("#TabOpciones").tabs({});

    ValidarNumeroEnCajaTexto("txtFiltroLinea", ValidarSoloNumero);

    $("#txtFiltroLinea").bind('paste', function (e) {
        return false;
    });

    inicio();

    function inicio() {
        var i = 0;
        if ($("#chklstNumerosSinRegistrar input").size() == 0) {
            alerta("No hay lineas sin registrar en esta tarea");
            window.parent.Modal.dialog('close');
        }
        if ($("#hdfinCodCol").val() == "") {
            alerta("No se ha seleccionado ninguna tarea");
            window.parent.Modal.dialog('close');
        }

        tabOpciones.tabs('select', '#TabOpciones_TabJQ1');
        $("#TabOpciones").tabs("option", "disabled", [1]);
        //lstNum = new Array($("#chklstNumerosSinRegistrar input").size());
        lstNum = [];

        $("input", "#chklstNumerosSinRegistrar").each(function () {
            //lstNum[i] = $(this).val();
            lstNum.push($(this).val());
            i++;
        });
    }

    $("#btnAsociar").click(function () {
        if ($("#chklstNumerosSinRegistrar input").is(":checked")) {
            $("#lstLinea").html("");
            $("input", "#chklstNumerosSinRegistrar").each(function () {
                if ($(this).attr('checked')) {
                    $("#lstLinea").append($("<option></option>").attr("value", $(this).val()).text($(this).val()));
                }
            });
            $("#TabOpciones").tabs("option", "disabled", []);
            tabOpciones.tabs('select', '#TabOpciones_TabJQ2');
            $("#TabOpciones").tabs("option", "disabled", [0]);
        }
        else {
            alerta("Seleccione por lo menos una linea");
        }
    });

    $("#btnSeleccionarTodos").click(function () {
        $("input", "#chklstNumerosSinRegistrar").attr('checked', true);
    });
    $("#btnLimpiar").click(function () {
        $("input", "#chklstNumerosSinRegistrar").attr('checked', false);
        $("#txtFiltroLinea").val("");
    });

    $("#btnGuardar").click(function () {
        var vcCodSuc = $("#hdfCodSucursal").val();
        var vcCodEmp = $("#hdfCodEmpleado").val();
        var vcLineaTipo = "1"; //$("#ddlLineaTipo").val();
        var vcLstLinea = "";
        var vcModeloDisp = $("#hdfCodModelo").val();

        $("input", "#chklstNumerosSinRegistrar").each(function () {
            if ($(this).attr('checked')) {
                vcLstLinea += $(this).val() + ",";
            }
        });

        if (vcCodEmp == "") {
            alerta("No ha ingresado ningun empleado o no es valido, vuelva a ingresarlo");
            $("#txtEmpleado").focus();
            return;
        }
        if (opcion) {
            if (vcCodSuc == "") {
                alerta("No ha ingresado ninguna sucursal o no es válida, vuelva a ingresarla");
                $("#txtSucursal").focus();
                return;
            }
        } else {
            if (vcModeloDisp == "") {
                alerta("No ha ingresado ningún modelo de dispositivo o no es válido, vuelva a ingresarlo");
                $("#txtSucursal").focus();
                return;
            }
        }
//        if (vcCodSuc == "") {
//            alerta("No ha ingresado ninguna sucursal o no es valida, vuelva a ingresarla");
//            $("#txtSucursal").focus();
//            return;
//        }
        //if (vcLineaTipo == "-1") {
        //    alerta("No ha seleccionado ningún Tipo de Línea o no es valida, vuelva a ingresarla");
        //    $("#ddlLineaTipo").focus();
        //    return;
        //}
        if (vcLstLinea == "") {
            alerta("No ha seleccionado ninguna linea");
            return;
        }
        else {
            vcLstLinea = vcLstLinea.substring(0, vcLstLinea.length - 1);
        }

        if (opcion) {
            $.ajax({
                type: "POST",
                url: "Imp_RegistroLinea.aspx/AsociarLineas",
                data: "{'vcLstLinea': '" + vcLstLinea + "'," +
                    "'vcCodEmp': '" + vcCodEmp + "'," +
                    "'vcCodSuc': '" + vcCodSuc + "'," +
                    "'vcLineaTipo': '" + vcLineaTipo + "'," +
                    "'inCodCol': '" + $("#hdfinCodCol").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var i = 0;

                    $("#chklstNumerosSinRegistrar").html("");
                    $("#txtFiltroLinea").val("");

                    $.each(result.d, function () {
                        $("#chklstNumerosSinRegistrar").append($(AgregarCheckItem(i.toString(), this.P_vcNum)));
                        i++;
                    });

                    lstNum = [];

                    $("input", "#chklstNumerosSinRegistrar").each(function () {
                        lstNum.push($(this).val());
                        i++;
                    });

                    Mensaje("<br/><h1>Las líneas seleccionadas han sido asociadas</h1><br/>", document, CerroMensaje);
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        } else {
            $.ajax({
                type: "POST",
                url: "Imp_RegistroLinea.aspx/AsociarDispositivos",
                data: "{'vcLstDispositivo': '" + vcLstLinea + "'," +
                    "'vcCodEmp': '" + vcCodEmp + "'," +
                    "'vcCodModDisp': '" + vcModeloDisp + "'," +
                    "'vcLineaTipo': '" + vcLineaTipo + "'," +
                    "'inCodCol': '" + $("#hdfinCodCol").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var i = 0;

                    $("#chklstNumerosSinRegistrar").html("");
                    $("#txtFiltroLinea").val("");

                    $.each(result.d, function () {
                        $("#chklstNumerosSinRegistrar").append($(AgregarCheckItem(i.toString(), this.P_vcCodIMEI)));
                        i++;
                    });

                    lstNum = [];

                    $("input", "#chklstNumerosSinRegistrar").each(function () {
                        lstNum.push($(this).val());
                        i++;
                    });

                    Mensaje("<br/><h1>Los dispositivos seleccionados han sido asociados</h1><br/>", document, CerroMensaje);
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    });

    $("#btnCancelar").click(function () {
        $("#TabOpciones").tabs("option", "disabled", []);
        tabOpciones.tabs('select', '#TabOpciones_TabJQ1');
        $("#TabOpciones").tabs("option", "disabled", [1]);
        LimpiarDetalle();
    });

    function LimpiarDetalle() {
        $("#txtEmpleado").val("");
        $("#hdfCodEmpleado").val("");
        $("#txtSucursal").val("");
        $("#hdfCodSucursal").val("");
        $("#ddlLineaTipo").val("-1");
        $("#hdfCodModelo").val("");
    }

    function CerroMensaje() {
        $("#btnCancelar").click();
    }

    $("#txtFiltroLinea").keyup(function () {
        var i = 0;
        var j = 0;
        var filtro = $("#txtFiltroLinea").val();
        $("tbody", $("#chklstNumerosSinRegistrar")).html("");
        $.each(lstNum, function () {
            if (lstNum[i].search(filtro) != -1) {
                $("tbody", $("#chklstNumerosSinRegistrar")).append($(AgregarCheckItem(j.toString(), lstNum[i])));
                j++;
            }
            i++;
        });
    });

    function AgregarCheckItem(indice, valor) {
        var str = '<tr>\n\t\t\t\t<td>' +
                              '<input id=\"chklstNumerosSinRegistrar_' + indice + '\" name=\"chklstNumerosSinRegistrar$' + indice + '\" value=\"' + valor + '\" type=\"checkbox\">' +
                              '<label for=\"chklstNumerosSinRegistrar_' + indice + '\">' + valor + '</label></td>\n\t\t\t</tr>';
        return str;
    }

    $("#txtEmpleado").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../Common/WebService/General.asmx/ListarEmpleado",
                data: "{'maxFilas': '" + 200 + "'," +
                                   "'vcNomEmp': '" + $("#txtEmpleado").val() + "'," +
                                   "'incodGrup': '-1'," +
                                   "'idCliente': '" + window.parent.parent.parent.idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.vcNom,
                            vcCodEmp: item.P_vcCod,
                            category: item.Grupo.vcNom,
                            inCodGru: item.Grupo.P_inCod
                        };
                    }));
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtEmpleado").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtEmpleado").val(ui.item.label);
            $("#hdfCodEmpleado").val(ui.item.vcCodEmp);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodEmpleado").val("");
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
				        .append("<a>" + item.vcCodEmp + "=" + item.label + "</a>")
				        .appendTo(ul);
                };

    $("#txtSucursal").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../Common/WebService/General.asmx/ListarSucursal",
                data: "{'maxFilas': '" + 200 + "'," +
                                   "'vcNomSuc': '" + $("#txtSucursal").val() + "'," +
                                   "'idCliente': '" + window.parent.parent.parent.idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.vcNom,
                            vcCodSuc: item.P_vcCod
                        };
                    }));
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtSucursal").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            SeleccionoSucursal = true;
            $("#txtSucursal").val(ui.item.label);
            $("#hdfCodSucursal").val(ui.item.vcCodSuc);
            return false;
        },
        change: function (event, ui) {
            if (!SeleccionoSucursal) {
                $("#hdfCodSucursal").val("");
            }
            return false;
        },
        open: function (event, ui) {
            SeleccionoSucursal = false;
            return false;
        }
    }).data("autocomplete")._renderItem = function (ul, item) {
                    return $("<li></li>")
			            .data("item.autocomplete", item)
			            .append("<a>" + item.vcCodSuc + "=" + item.label + "</a>")
			            .appendTo(ul);
                };

    $("#txtModeloDisp").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../../Common/WebService/General.asmx/ListarModDispAutoc",
                data: "{'maxFilas': '" + 50 + "'," +
            "'vcNomAre': '" + $("#txtModeloDisp").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
            "'idCliente': '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: $.trim(item.vcNom).replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                            P_inCod: $.trim(item.P_inCod),
                            btSopLin: $.trim(item.btSopLin)
                        }
                    }));
                },
                cache: false,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alerta(errorThrown);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtModeloDisp").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            SeleccionoModelo = true;
            $("#txtModeloDisp").val(ui.item.label);
            $("#hdfCodModelo").val(ui.item.P_inCod);
            return false;
        },
        change: function (event, ui) {
            if (!SeleccionoModelo) {
                $("#hdfCodModelo").val("");
            }
            return false;
        },
        open: function (event, ui) {
            SeleccionoModelo = false;
            return false;
        }
    }).data("autocomplete")._renderItem = function (ul, item) {
        return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.label + "</a>").appendTo(ul);

    }

});