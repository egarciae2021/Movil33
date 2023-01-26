var lstUbicaciones = [];

$(function () {
    var paginaSolicitud = "";
    inicio();

    //jherrera 20130514
    //-----------------
    if ($("#ddlDispositivo").val() != null && $("#ddlDispositivo").val() != "-1") {
        document.getElementById('divTabs').style.display = '';
        $("#tbModelos").tabs("option", "disabled", [1]);

        $("#ifDetalleDispositivo").attr("src", "Mantenimiento/Mnt_DetalleDispositivo.aspx?CodDis=" + $("#ddlDispositivo").val());
        $("#ifNuevoEquipo").attr("src", "Mantenimiento/Mnt_NuevoDispositivo.aspx?CodDis=" + $("#hdfNuevoDispositivo").val());

        if ($("#hdfSolicitud").val() == "1" || $("#hdfSolicitud").val() == "3") {
            VerificaHabilitado($("#ddlDispositivo").val());
        } else {
            VerificaHabilitadoEmpleado($("#hdfCodEmpleado").val());
        }
    }
    else {
        document.getElementById('divTabs').style.display = 'none';

        $("#ifDetalleDispositivo").attr("src", "");
        $("#ifNuevoEquipo").attr("src", "");

        if ($("#hdfSolicitud").val() == "1" || $("#hdfSolicitud").val() == "3") {
            $("#lblMensaje").html("");
            $("#tbModelos").tabs("option", "disabled", []);
            $("#btnSolicitar").button("option", "disabled", true);
        }
    }
    //-----------------
    $(".btnNormal").button({});


    //jherrera 20130509 Inicializacion de Tabs
    //----------------------------------------
    var tbModelos = $("#tbModelos").tabs({});
    //----------------------------------------

    $("#btnSolicitar").button("option", "disabled", true);
    $("#ddlDispositivo").change(function () {
        if ($("#ddlDispositivo").val() != "-1") {
            //jherrera 20130514 Nuevo iframe
            //------------------------------
            document.getElementById('divTabs').style.display = '';
            ObtenerCodigoModelo($("#hdfCodEmpleado").val(), $("#ddlDispositivo").val());
            $("#ifDetalleDispositivo").attr("src", "Mantenimiento/Mnt_DetalleDispositivo.aspx?CodDis=" + $("#ddlDispositivo").val());
            //------------------------------
            if ($("#hdfSolicitud").val() == "1" || $("#hdfSolicitud").val() == "3") {
                VerificaHabilitado($("#ddlDispositivo").val());
            } else {
                VerificaHabilitadoEmpleado($("#hdfCodEmpleado").val());
            }
            $("#tbModelos").show();
        }
        else {
            $("#ifDetalleDispositivo").attr("src", "");
            //jherrera 20130509 Nuevo iframe
            //------------------------------
            $("#ifNuevoEquipo").attr("src", "");
            //------------------------------
            if ($("#hdfSolicitud").val() == "1" || $("#hdfSolicitud").val() == "3") {
                $("#lblMensaje").html("");
                $("#tbModelos").tabs("option", "disabled", []);
                $("#btnSolicitar").button("option", "disabled", true);
            }
            $("#tbModelos").hide();
            //$("#tbModelos").tabs("option", "disabled", [0]);
            //$("#tbModelos").tabs("option", "disabled", [1]);
        }
    });

    function inicio() {
        if ($("hdfCodEmpleado").val() == "") {
            CargarDispositivos($("hdfCodEmpleado").val());
        }

    }

    function ObtenerCodigoModelo(codEmp, CodIMEI) {
        var vcTipSol = $("#hdfSolicitud").val();
        $.ajax({
            type: "POST",
            url: "Adm_SolicitarDispositivo.aspx/ObtenerCodigoModelo",
            data: "{'vcCodEmp': '" + codEmp + "'," +
                    "'vcCodIMEI': '" + CodIMEI + "'," +
                    "'vcTipSol': '" + vcTipSol + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#hdfNuevoDispositivo").val(result.d);

                $.ajax({
                    type: "POST",
                    url: "Adm_SolicitarDispositivo.aspx/ObtenerCantidadDispositivos",
                    data: "{'vcCodEmp': '" + codEmp + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (res) {
                        document.getElementById('divTabs').style.display = '';
                        document.getElementById('trFrames').style.display = '';
                        if (result.d == 0) {
                            if (res.d == 0) {//Varios elementos
                                $("#ifNuevoEquipo").attr("src", "");
                                if ($("#hdfSolicitud").val() == "2") {
                                    document.getElementById('divTabs').style.display = 'none';
                                    document.getElementById('trFrames').style.display = 'none';
                                }
                            }
                            else if (res.d > 0) {//un solo elemento y se esta enviando el id del modelo
                                $("#hdfNuevoDispositivo").val(res.d);
                                $("#ifNuevoEquipo").attr("src", "Mantenimiento/Mnt_NuevoDispositivo.aspx?CodDis=" + res.d);
                                $("#btnSolicitar").val("Enviar");
                            }
                            else {//valor -1 indica que no existen elementos
                                $("#ifNuevoEquipo").attr("src", "");
                                if ($("#hdfSolicitud").val() == "2") {
                                    $("#lblMensaje").html("No existen modelos a elegir");
                                    $("#btnSolicitar").button("option", "disabled", true);
                                    document.getElementById('divTabs').style.display = 'none';
                                    document.getElementById('trFrames').style.display = 'none';
                                }
                            }
                        }
                        else {
                            $("#ifNuevoEquipo").attr("src", "Mantenimiento/Mnt_NuevoDispositivo.aspx?CodDis=" + $("#hdfNuevoDispositivo").val());
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function VerificaHabilitado(Dispositivo) {
        if ($("#hdfSolicitud").val() == "1") {
            $.ajax({
                type: "POST",
                url: "Adm_CambioDispositivo.aspx/VerificaLineaEmpleado",
                data: "{'dcNumLin': '" + Dispositivo + "'," +
                       "'vcCodEmp': '" + $("#hdfCodEmpleado").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    $("#lblMensaje").html("");
                    $("#tbModelos").tabs("option", "disabled", []);
                    if (result.d == "1") {
                        $("#lblMensaje").html("Hubo un problema al verificar la línea");
                        $("#tbModelos").tabs("option", "disabled", [1]);
                    }
                    else if (result.d == "2") {
                        $("#lblMensaje").html("Ya existe una solicitud para este equipo");
                        //$("#tbModelos").tabs("option", "disabled", [1]);
                        $("#btnSolicitar").button("option", "disabled", true);
                    }
                    else if (result.d == "3") {
                        $("#lblMensaje").html("No ha cumplido el tiempo mínimo para realizar cambio de equipo");
                        $("#tbModelos").tabs("option", "disabled", [1]);
                        $("#btnSolicitar").button("option", "disabled", true);
                        //btnSolicitar
                    }
                    else if (result.d == "4") {
                        $("#lblMensaje").html("Usted no está incluido en ninguna política");
                        $("#tbModelos").tabs("option", "disabled", [1]);
                        $("#btnSolicitar").button("option", "disabled", true);
                    }
                    else {//
                        //Modal.dialog('close');
                        $("#btnSolicitar").button("option", "disabled", false);
                        paginaSolicitud = "Adm_CambioDispositivo.aspx?vcCodEmp=" + $("#hdfCodEmpleado").val() + "&dcNumLin=" + $("#ddlDispositivo").val();
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
        else if ($("#hdfSolicitud").val() == "3") {
            $.ajax({
                type: "POST",
                url: "Adm_ReposicionDispositivo.aspx/VerificaLineaEmpleado",
                data: "{'dcNumLin': '" + Dispositivo + "'," +
                       "'vcCodEmp': '" + $("#hdfCodEmpleado").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    $("#lblMensaje").html("");
                    $("#tbModelos").tabs("option", "disabled", []);
                    if (result.d == "1") {
                        $("#lblMensaje").html("Hubo un problema al verificar la linea. Linea no corresponde al empleado.");
                        $("#tbModelos").tabs("option", "disabled", [1]);
                    }
                    else if (result.d == "2") {
                        $("#lblMensaje").html("Ya existe una solicitud para este equipo");
                        //$("#tbModelos").tabs("option", "disabled", [1]);
                    }
                    else if (result.d == "3") {
                        $("#lblMensaje").html("Usted no está incluido en ninguna política");
                        $("#tbModelos").tabs("option", "disabled", [1]);
                    }
                    else {//
                        //Modal.dialog('close');
                        $("#btnSolicitar").button("option", "disabled", false);
                        paginaSolicitud = "Adm_ReposicionDispositivo.aspx?vcCodEmp=" + $("#hdfCodEmpleado").val() + "&dcNumLin=" + $("#ddlDispositivo").val();
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    }

    function VerificaHabilitadoEmpleado(Empleado) {
        $.ajax({
            type: "POST",
            url: "Adm_NuevoDispositivo.aspx/VerificaLineaEmpleado",
            data: "{'vcCodEmp': '" + Empleado + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#btnSolicitar").attr("disabled", "disabled");
                paginaSolicitud = "";
                $("#lblMensaje").html("");
                $("#tbModelos").tabs("option", "disabled", []);
                if (result.d == "1") {
                    $("#lblMensaje").html("Ya tiene una solicitud pendiente para adquirir un nuevo equipo");
                }
                else if (result.d == "2") {
                    $("#lblMensaje").html("Usted no puede adquirir más equipos");
                    $("#tbModelos").tabs("option", "disabled", [1]);
                }
                else if (result.d == "3") {
                    $("#lblMensaje").html("Usted no está incluido en ninguna política");
                    $("#tbModelos").tabs("option", "disabled", [1]);
                }
                else {
                    $("#btnSolicitar").button("option", "disabled", false);
                    paginaSolicitud = "Adm_NuevoDispositivo.aspx?vcCodEmp=" + $("#hdfCodEmpleado").val() + "&dcNumLin=" + $("#ddlDispositivo").val();
                }

                if ($("#hdfSolicitud").val() == "2") {
                    if ($("#lblMensaje").html() == "Ya tiene una solicitud pendiente para adquirir un nuevo equipo") {
                        $($('#tbModelos > ul a')[1]).text("Equipo Solicitado");
                    }
                    $("#tbModelos").tabs("option", "selected", [1]);
                    $("#tbModelos").tabs("option", "disabled", [0]);
                }

                return false;
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }


    $("#btnSolicitar").click(function () {
        if ($("#btnSolicitar").val() == "Enviar") {
            var CodModDis = $("#hdfNuevoDispositivo").val();
            var CodEmp = $("#hdfCodEmpleado").val();
            var ArchAdj = lstUbicaciones.join(","); // agregado 05-09-2013 wapumayta

            if ($("#hdfSolicitud") == "1") {
                var NumLin = $("#ddlDispositivo").val();

                $.ajax({
                    type: "POST",
                    url: "Adm_CambioDispositivo.aspx/EnviaSolicitud",
                    data: "{'vcNumLin': '" + NumLin + "'," +
                   "'inCodModDis': '" + CodModDis + "'," +
                   "'vcArchAdj': '" + ArchAdj + "'," + // agregado 05-09-2013 wapumayta
                   "'vcCodEmp': '" + CodEmp + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (result.d == '') {
                            alerta("Su solicitud fue enviada con éxito");
                        }
                        else {
                            alert(result.d);
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            } else if ($("#hdfSolicitud") == "2") {
                $.ajax({
                    type: "POST",
                    url: "Adm_NuevoDispositivo.aspx/EnviaSolicitud",
                    data: "{'inCodModDis': '" + CodModDis + "'," +
                   "'vcCodEmp': '" + CodEmp + "'," +
                   "'vcArchAdj': '" + ArchAdj + "'," + // agregado 05-09-2013 wapumayta
                   "'vcArchAdj':'" + ArchAdj + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (result.d == '') {
                            $("#btnSolicitar").button("option", "disabled", true);
                            alerta("Su solicitud fue enviada con éxito");
                        }
                        else {
                            alert(result.d);
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            } else {
                var NumLin = $("#ddlDispositivo").val();

                $.ajax({
                    type: "POST",
                    url: "Adm_ReposicionDispositivo.aspx/EnviaSolicitud",
                    data: "{'vcNumLin': '" + NumLin + "'," +
                   "'inCodModDis': '" + CodModDis + "'," +
                   "'vcArchAdj': '" + ArchAdj + "'," + // agregado 05-09-2013 wapumayta
                   "'vcCodEmp': '" + CodEmp + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (result.d == '') {
                            alerta("Su solicitud fue enviada con éxito");
                        }
                        else {
                            alert(result.d);
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            }

        } else {
            if (paginaSolicitud != "") {
                window.location = paginaSolicitud + "&lstUbi=" + lstUbicaciones.join(",");
            }
        }
    });

    function CargarDispositivos(Empleado) {
        $("#ddlDispositivo").html("");
        $("#ifDetalleDispositivo").attr("src", "");
        document.getElementById('divTabs').style.display = '';

        //jherrera 20130509 Nuevo iframe
        //------------------------------
        $("#ifNuevoEquipo").attr("src", "");
        //------------------------------
        if (Empleado != "") {
            $($('#tbModelos > ul a')[1]).text("Equipo a Adquirir");
            if ($("#hdfSolicitud").val() == "1" || $("#hdfSolicitud").val() == "3") {
                $.ajax({
                    type: "POST",
                    url: "Adm_SolicitarDispositivo.aspx/ListarDispositivos",
                    data: "{'vcCodEmp': '" + Empleado + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if ($(result.d).length > 0) {
                            $("#ddlDispositivo").append($("<option></option>").attr("value", "-1").text("Seleccione un dispositivo"));
                            for (i in result.d) {
                                if (result.d[i].vcNum != "" && result.d[i].vcNum != null) {
                                    $("#ddlDispositivo").append($("<option></option>").attr("value", result.d[i].P_vcCodIMEI).text("(" + result.d[i].vcNum + ") " + result.d[i].ModeloDispositivo.vcNom));
                                }
                                else {
                                    $("#ddlDispositivo").append($("<option></option>").attr("value", result.d[i].P_vcCodIMEI).text(result.d[i].ModeloDispositivo.vcNom));
                                }

                            }

                            $('#ddlDispositivo').val(result.d[0].P_vcCodIMEI);

                            if ($("#ddlDispositivo").val() != "-1") {
                                //jherrera 20130514 Nuevo iframe
                                //------------------------------
                                ObtenerCodigoModelo(Empleado, $("#ddlDispositivo").val());
                                $("#ifDetalleDispositivo").attr("src", "Mantenimiento/Mnt_DetalleDispositivo.aspx?CodDis=" + $("#ddlDispositivo").val());

                                if ($("#hdfSolicitud").val() == "1" || $("#hdfSolicitud").val() == "3") {
                                    VerificaHabilitado($("#ddlDispositivo").val());
                                } else {
                                    VerificaHabilitadoEmpleado(Empleado);
                                }
                                //------------------------------
                            }
                            else {
                                $("#ifDetalleDispositivo").attr("src", "");
                                //jherrera 20130509 Nuevo iframe
                                //------------------------------
                                $("#ifNuevoEquipo").attr("src", "");
                                //------------------------------
                                if ($("#hdfSolicitud").val() == "1" || $("#hdfSolicitud").val() == "3") {
                                    $("#lblMensaje").html("");
                                    $("#tbModelos").tabs("option", "disabled", []);
                                    $("#btnSolicitar").button("option", "disabled", true);
                                }
                            }
                        }
                        else {
                            if ($("#hdfSolicitud").val() == "1" || $("#hdfSolicitud").val() == "3") {
                                $("#ddlDispositivo").append($("<option></option>").attr("value", "-2").text("No tiene dispostivos asignados"));
                                document.getElementById('divTabs').style.display = 'none';
                                document.getElementById('trFrames').style.display = 'none';
                            }
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            } else {
                if ($("#hdfSolicitud").val() == "2") {
                    document.getElementById('divTabs').style.display = '';
                    $("#tbModelos").tabs("option", "selected", [1]);
                    $("#tbModelos").tabs("option", "disabled", [0]);
                    VerificaHabilitadoEmpleado(Empleado);
                    ObtenerCodigoModelo($("#hdfCodEmpleado").val(), $("#ddlDispositivo").val());
                }
            }
        }
        else {
            $("#ddlDispositivo").append($("<option></option>").attr("value", "-1").text("Seleccione un empleado"));
        }
    }

    if ($("#hdfAdmin").val() == "0") {
        CargarDispositivos($("#hdfCodEmpleado").val());
    }

    if ($("#txtEmpleado").length > 0) {
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
                //alert(3);
                return false;
            },
            select: function (event, ui) {
                Selecciono = true;
                $("#txtEmpleado").val(ui.item.label);
                $("#hdfCodEmpleado").val(ui.item.vcCodEmp);
                CargarDispositivos(ui.item.vcCodEmp);
                $("#tbModelos").show();
                $("#tbModelos").tabs("option", "selected", [0]);
                $("#tbModelos").tabs("option", "disabled", [1]);
                $("#ddlDispositivo").focus();
                return false;
            },
            change: function (event, ui) {
                if (!Selecciono) {
                    $("#hdfCodEmpleado").val("");
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
    }

    //ifAdjuntarArchivos agregado 02-09-2013 wapumayta
    $("#btnAdjuntarArchivos").click(function () {
        var $width = 420;
        var $height = 400;
        var $Pagina = 'Adm_AdjuntarArchivos.aspx?inTipSol=' + $("#hdfSolicitud").val() + "&lstUbi=" + lstUbicaciones.join(",");
        $("#ifAdjuntar").attr("src", $Pagina);
        Modal = $('#dvAdjuntar').dialog({
            title: "Adjuntar Archivos",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    });

});

function numeroAdjuntos(nAdj) {
    $("#lblNumeroAdjuntos").text('');
    if (nAdj == 0) {
        $("#lblNumeroAdjuntos").text('No se ha adjuntado ningún archivo');
    } else {
        $("#lblNumeroAdjuntos").text('Se han cargado ' + nAdj + ' adjuntos.');
    }
}


function listaUbicaciones(ubicacionesAdjuntos) {
    lstUbicaciones = ubicacionesAdjuntos;
    //alert(lstUbicaciones);
    //alert(lstUbicaciones.join(","));
    //for (var i = 0; i < lstUbicaciones.length; i++) {
        //alert(lstUbicaciones[i]);
    //};
}

//$(lstCampo).each(function () {};