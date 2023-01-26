$(function () {
    var dispositivo = "";
    $("#btnGuardar").button();
    $(".ui-button-text").css({ padding: 4 });

    if ($("#hdfCodEmpleado").val() == "") {
        $("#lblMensajeDispositivos").html("Seleccione un empleado");
    }
    else {
        CargarDispositivos($("#hdfCodEmpleado").val());
    }

    function abrirDetalleDispositivo() {
        $("#ifDetalleEquipo").attr("src", "Mantenimiento/Mnt_DetalleDispositivo.aspx?CodDis=" + dispositivo);
        $("#dvDetalleDispositivo").show("slide", {}, 500, null);
    }

    $(".rbDispositos").live("change", function () {
        dispositivo = $(".lblCodigoDispositivo", $(this).parent()).html();
        abrirDetalleDispositivo();
    });

    function CargarDispositivos(Empleado) {
        $("#tbDispositivos").html("");
        $("#lblMensajeDispositivos").hide();
        $("#lblMensajeDispositivos").html("");
        dispositivo = "";
        if (Empleado != "") {
            $.ajax({
                type: "POST",
                url: "Adm_SolicitudReparacion.aspx/ListarDispositivos",
                data: "{'vcCodEmp': '" + Empleado + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if ($(result.d).length > 0) {
                        var ind = 0;
                        var Primero = true;
                        for (i in result.d) {
                            if (ind == 0) {
                                $("#tbDispositivos").append($("<tr></tr>"));
                            }
                            $("#tbDispositivos tr:last").append($("<td></td>").attr("valign", "top").attr("align", "center").css({ "width": "111px", "height": "120px" }));
                            $("#tbDispositivos tr:last td:last").append($("<input/>").attr("type", "radio").attr("id", "radio" + i.toString()).attr("name", "radio").attr("class", "rbDispositos"));
                            if (Primero) {
                                Primero = false;
                                $("#radio" + i.toString()).attr("checked", "checked");
                                dispositivo = result.d[i].P_vcCodIMEI;
                            }
                            $("#tbDispositivos tr:last td:last").append($("<label></label>").attr("for", "radio" + i.toString()).attr("id", "lblRbDispositivo" + i.toString()));
                            $("#lblRbDispositivo" + i.toString()).append($("<img/>").attr("alt", "Modelo").attr("src", result.d[i].ModeloDispositivo.vcRutArc).attr("width", "110px").attr("height", "110px").attr("class", "ui-corner-all"));
                            $("#lblRbDispositivo" + i.toString()).append($("<br>"));
                            $("#lblRbDispositivo" + i.toString()).append($("<span></span>").html(result.d[i].ModeloDispositivo.vcNom));
                            $("#lblRbDispositivo" + i.toString()).append($("<br>"));
                            $("#lblRbDispositivo" + i.toString()).append($("<span></span>").attr("class", "lblCodigoDispositivo").html(result.d[i].P_vcCodIMEI));
                            $("#lblRbDispositivo" + i.toString()).append($("<br>"));
                            $("#lblRbDispositivo" + i.toString()).append($("<span></span>").html(result.d[i].vcNum));

                            if (ind == 0) {
                                ind++;
                            }
                            else {
                                ind = 0;
                            }

                            if (Primero) {
                                Primero = false;
                            }
                        }
                        $(".rbDispositos").button();
                        $(".ui-button-text").css({ padding: 4 });
                        abrirDetalleDispositivo();
                        $("#dvGuardarSolicitud").show("blind", {}, 500, null);
                    }
                    else {
                        $("#lblMensajeDispositivos").html("El empleado seleccionado no tiene dispostivos asignados");
                        $("#lblMensajeDispositivos").show();
                        $("#dvDetalleDispositivo").hide();
                        $("#dvGuardarSolicitud").hide();
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
        else {
            $("#lblMensajeDispositivos").html("Seleccione un empleado");
            $("#lblMensajeDispositivos").show();
            $("#dvDetalleDispositivo").hide();
            $("#dvGuardarSolicitud").hide();
        }
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
                            inCodGru: item.Grupo.P_inCod,
                            Area: item.Area.vcNomOrg,
                            CentroCosto: item.CentroCosto.vcNomCenCos
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
            $("#txtEmpleado").val(ui.item.vcCodEmp + " - " + ui.item.label);
            $("#hdfCodEmpleado").val(ui.item.vcCodEmp);
            $("#lblCentroCosto").html(ui.item.CentroCosto);
            $("#lblArea").html(ui.item.Area);
            CargarDispositivos(ui.item.vcCodEmp);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodEmpleado").val("");
                $("#lblCentroCosto").html("");
                $("#lblArea").html("");
                CargarDispositivos("");
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

    $("#btnGuardar").click(function () {
        if ($("#hdfCodEmpleado").val() == "") {
            $("#txtEmpleado").focus();
            alerta("Seleccione un empleado");
            return false;
        }
        if (dispositivo == "") {
            alerta("Seleccione un dispositivo");
            return false;
        }
        if ($("#txtDescripcion").val() == "") {
            alerta("Ingrese el problema que presenta con su equipo");
            $("#txtDescripcion").focus();
            return false;
        }
        $.ajax({
            type: "POST",
            url: "Adm_SolicitudReparacion.aspx/EnviarSolicitud",
            data: "{'vcCodEmp': '" + $("#hdfCodEmpleado").val() + "'," +
                           "'vcCodDis': '" + dispositivo + "'," +
                           "'vcDesSol': '" + $("#txtDescripcion").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#txtDescripcion").val("");
                if (result.d == "0") {
                    alerta("Ya hay una solicitud pendiente para dicho dispositivo");
                }
                else if (result.d == "-1") {
                    alerta("La solicitud no pudo ser enviada, vuelva a intentarlo, si el problema persiste consulte a su administrador");
                }
                else {
                    alerta("Solicitud enviada");
                }
                $("#txtDescripcion").val("");
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });


    $("#txtEmpleado").focus();


    if ($("#hdfAdmin").val() != "1") {
        $("#txtEmpleado").attr("disabled", "disabled");
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
                var item = result.d[0];

                Selecciono = true;
                $("#txtEmpleado").val(item.P_vcCod + " - " + item.vcNom);
                $("#hdfCodEmpleado").val(item.P_vcCod);
                $("#lblCentroCosto").html(item.CentroCosto.vcNomCenCos);
                $("#lblArea").html(item.Area.vcNomOrg);
                CargarDispositivos(item.P_vcCod);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    }

});
