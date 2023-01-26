var inTipPla;
var idTipRes;
var opcion;
$(function () {
    var Selecciono = false;
    var SeleccionoSucursal = false;
    var SeleccionoModelo = false;
    var lstSer;

    //#region CargaInicio
    var idCliente = window.parent.parent.parent.idCliente;
    CargaInicio();  //ECONDEÑA  16/11/2015
    function CargaInicio() {
        inTipPla = $("#hdfInTipPla").val();
        idTipRes = $("#hdfIdTipRes").val();
        $("#lblSinReg").text(inTipPla != 2 && idTipRes != 1 ? "Servicios" : "Servicios");
        $("#lblAregistrar").text(inTipPla != 2 && idTipRes != 1 ? "Servicios" : "Servicios");
        opcion = (inTipPla != 2 && idTipRes != 1 ? true : false);
    }
    //#endregion

    $(".btnNormal").button({});
    var tabOpciones = $("#TabOpciones").tabs({});

    //ValidarNumeroEnCajaTexto("txtFiltroServicio", ValidarSoloNumero);

    $("#txtFiltroServicio").bind('paste', function (e) {
        return false;
    });

    inicio();

    function inicio() {
        var i = 0;
        if ($("#chklstServiciosSinRegistrar input").size() == 0) {
            alerta("No hay servicios sin registrar en esta tarea");
            window.parent.Modal.dialog('close');
        }
        if ($("#hdfinCodCol").val() == "") {
            alerta("No se ha seleccionado ninguna tarea");
            window.parent.Modal.dialog('close');
        }

        tabOpciones.tabs('select', '#TabOpciones_TabJQ1');
        $("#TabOpciones").tabs("option", "disabled", [1]);
        lstSer = [];

        $("input", "#chklstServiciosSinRegistrar").each(function () {
            lstSer.push($(this).val());
            i++;
        });
    }

    $("#btnAsociar").click(function () {
        if ($("#chklstServiciosSinRegistrar input").is(":checked")) {
            $("#lstServicio").html("");
            $("input", "#chklstServiciosSinRegistrar").each(function () {
                if ($(this).attr('checked')) {
                    $("#lstServicio").append($("<option></option>").attr("value", $(this).val()).text($(this).val()));
                }
            });
            $("#TabOpciones").tabs("option", "disabled", []);
            tabOpciones.tabs('select', '#TabOpciones_TabJQ2');
            $("#TabOpciones").tabs("option", "disabled", [0]);
            $("#TabOpciones_TabJQ2").css("overflow", "hidden");
        }
        else {
            alerta("Seleccione por lo menos un servicio");
        }
    });

    $("#btnSeleccionarTodos").click(function () {
        $("input", "#chklstServiciosSinRegistrar").attr('checked', true);
    });
    $("#btnLimpiar").click(function () {
        $("input", "#chklstServiciosSinRegistrar").attr('checked', false);
        $("#txtFiltroServicio").val("");
    });

    $("#btnGuardar").click(function () {
        var vcCodTipoLlamada = $("#ddlTipoLlamada").val();
        var vcCodServicio = $("#ddlServicio").val();
        var vcLstServicio = "";

        $("input", "#chklstServiciosSinRegistrar").each(function () {
            if ($(this).attr('checked')) {
                vcLstServicio += $(this).val() + ",";
            }
        });

        if (vcCodTipoLlamada == "-1") {
            alerta("No ha ingresado ningun Tipo de llamada o no es valido, vuelva a ingresarlo");
            $("#ddlTipoLlamada").focus();
            return;
        }

        if (vcCodServicio == "-1") {
            alerta("No ha ingresado ningun Servicio o no es valido, vuelva a ingresarlo");
            $("#ddlServicio").focus();
            return;
        }

        if (vcLstServicio == "") {
            alerta("No ha seleccionado ningun servicio");
            return;
        }
        else {
            vcLstServicio = vcLstServicio.substring(0, vcLstServicio.length - 1);
        }

        if (opcion) {
            $.ajax({
                type: "POST",
                url: "Imp_RegistroServicio.aspx/AsociarServicios",
                data: "{'vcLstServicio': '" + vcLstServicio + "'," +
                    "'vcCodTipoLlamada': '" + vcCodTipoLlamada + "'," +
                    "'vcCodServicio': '" + vcCodServicio + "'," +
                    "'inCodCol': '" + $("#hdfinCodCol").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var i = 0;

                    $("#chklstServiciosSinRegistrar").html("");
                    $("#txtFiltroServicio").val("");

                    $.each(result.d, function () {
                        $("#chklstServiciosSinRegistrar").append($(AgregarCheckItem(i.toString(), this.vcNomSerArc)));
                        i++;
                    });

                    lstSer = [];

                    $("input", "#chklstServiciosSinRegistrar").each(function () {
                        lstSer.push($(this).val());
                        i++;
                    });

                    Mensaje("<br/><h1>Los servicios seleccionados han sido asociadas</h1><br/>", document, CerroMensaje);

                    if (lstSer.length == 0) {
                        window.parent.Modal.dialog('close');
                        Mensaje("<br/><h1>No hay mas servicios por registrar.</h1><br/>", document, CerroMensaje);
                    }

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
        //LimpiarDetalle();
    });

    //function LimpiarDetalle() {
    //    $("#txtEmpleado").val("");
    //    $("#hdfCodEmpleado").val("");
    //    $("#txtSucursal").val("");
    //    $("#hdfCodSucursal").val("");
    //    $("#ddlLineaTipo").val("-1");
    //    $("#hdfCodModelo").val("");
    //}

    function CerroMensaje() {
        $("#btnCancelar").click();
    }

    $("#txtFiltroServicio").keyup(function () {
        var i = 0;
        var j = 0;
        var filtro = $("#txtFiltroServicio").val();
        $("tbody", $("#chklstServiciosSinRegistrar")).html("");
        $.each(lstSer, function () {
            if (lstSer[i].toLowerCase().search(filtro.toLowerCase()) != -1) {
                $("tbody", $("#chklstServiciosSinRegistrar")).append($(AgregarCheckItem(j.toString(), lstSer[i])));
                j++;
            }
            i++;
        });
    });

    function AgregarCheckItem(indice, valor) {
        var str = '<tr>\n\t\t\t\t<td>' +
                              '<input id=\"chklstServiciosSinRegistrar_' + indice + '\" name=\"chklstServiciosSinRegistrar$' + indice + '\" value=\"' + valor + '\" type=\"checkbox\">' +
                              '<label for=\"chklstServiciosSinRegistrar_' + indice + '\">' + valor + '</label></td>\n\t\t\t</tr>';
        return str;
    }

});