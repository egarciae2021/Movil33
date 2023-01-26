$(function () {

    IniciarPagina();
    $(".btnNormal").button();

    var indiceTab = window.parent.tab.tabs("option", "selected");

    function IniciarPagina() {

        if ($("#ddlFuente").val() == "-1") {
            $("#trFuente").hide();
        } else {
            $("#trFuente").show();
            if ($("#ddlFuente").val() == "BD") {
                $("#txtFuenteArchivo").hide();
                $("#txtFuenteBD").show();
            }
            if ($("#ddlFuente").val() == "Archivo") {
                $("#txtFuenteArchivo").show();
                $("#txtFuenteBD").hide();
            }
        }

        if ($("#hdfEstado").val() == '' || $("#hdfEstado").val() == '1') {
            $("#hdfEstado").val("1");
            $("#trEstado").hide();
            $("#tdEstado").hide();
        }
        else {
            $("#trEstado").show();
            $("#tdEstado").show();
        }

    }

    function BloquearPagina(bloqueado) {
        $(".btnNormal").button("option", "disabled", bloqueado);

        if (bloqueado) {
            $("input").attr("disabled", "disabled");
            $("select").attr("disabled", "disabled");
        }
        else {
            $("input").removeAttr("disabled");
            $("select").removeAttr("disabled");
        }
    }

    $("#chActivo").bind('change', function () {
        if ($(this).is(":checked")) {
            $("#hdfEstado").val("1");
        }
        else {
            $("#hdfEstado").val("0");
        }
    });

    $("#ddlFuente").bind('change', function () {
        if ($(this).val() == "-1") {
            $("#trFuente").hide();
            $("#txtFuenteArchivo").val("");
            $("#txtFuenteBD").val("");
            $("#hdfCodigoFuente").val("");
        } else {
            if ($(this).val() == "BD") {
                $("#trFuente").show();
                $("#txtFuenteBD").show();
                $("#txtFuenteArchivo").hide();
                $("#txtFuenteArchivo").val("");
                $("#txtFuenteBD").val("");
                $("#hdfCodigoFuente").val("");
            } else {
                if ($(this).val() == "Archivo") {
                    $("#trFuente").show();
                    $("#txtFuenteArchivo").show();
                    $("#txtFuenteBD").hide();
                    $("#txtFuenteArchivo").val("");
                    $("#txtFuenteBD").val("");
                    $("#hdfCodigoFuente").val("");
                }
            }
        }
    });


    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfCodigo").val() == "") {
            $("#txtdescripcion").val("");
            $("#ddlFuente").val("-1");
            $("#txtPlantilla").val("");
            $("#txtFormato").val("");
            $("#txtFuenteBD").val("");
            $("#txtFuenteArchivo").val("");
            $("#hdfPlantilla").val("");
            $("#hdfFormato").val("");
            $("#hdfCodigoFuente").val("");
            $("#ddlTipoProceso").val("-1");
        }
        else {
            window.parent.tab.tabs("remove", indiceTab);
        }
    }

    $("#btnCerrar").live("click", function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

    $("#btnGuardar").live("click", function () {

        var Codigo = $("#hdfCodigo").val();
        var Descripcion = $("#txtdescripcion").val().replace(/'/g, "&#39");
        var Plantilla = $("#hdfPlantilla").val();
        //        var Formato = $("#hdfFormato").val();
        var Formato = "1";
        var TipoProceso = $("#ddlTipoProceso").val();
        var ConfigFuente = $("#hdfCodigoFuente").val();

        if ($.trim(Descripcion) == "") {
            alerta("La descripción de la Configuracion del Proceso es un campo obligatorio");
            $("#txtdescripcion").focus();
            return;
        }

        if ($.trim(TipoProceso) == "-1") {
            alerta("Seleccione el Tipo del Proceso");
            return;
        }

        if ($.trim(Plantilla) == "") {
            alerta("La Plantilla de la Configuración del Proceso es un campo obligatorio");
            $("#txtPlantilla").focus();
            return;
        }

        if ($.trim(Formato) == "") {
            alerta("El Formato de la Configuración del Proceso es un campo obligatorio");
            $("#txtFormato").focus();
            return;
        }

        if ($("#ddlFuente").val() == "-1") {
            alerta("Seleccione el Tipo de Fuente");
            return;
        } else {
            if ($("#ddlFuente").val() == "BD") {
                if ($.trim(ConfigFuente) == "") {
                    alerta("El Nombre Fuente de la Configuración del Proceso es un campo obligatorio");
                    $("#txtFuenteBD").focus();
                    return;
                }
            }

            if ($("#ddlFuente").val() == "Archivo") {
                if ($.trim(ConfigFuente) == "") {
                    alerta("El Nombre Fuente de la Configuración del Proceso es un campo obligatorio");
                    $("#txtFuenteArchivo").focus();
                    return;
                }
            }
        }

        $("#dvCargando").show();

        $.ajax({
            type: "POST",
            url: "Mnt_Config_Proceso.aspx/Guardar",
            data: "{'pCod': '" + $.trim(Codigo) +
                    "', 'pDesc': '" + $.trim(Descripcion) +
                    "', 'pPlantilla': '" + $.trim(Plantilla) +
                    "', 'pFormato': '" + $.trim(Formato) +
                    "', 'pTipoProceso': '" + $.trim(TipoProceso) +
                    "', 'pConfigFuente': '" + $.trim(ConfigFuente) +
                    "', 'btVig': '" + parseInt($("#hdfEstado").val()) + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $("#dvCargando").hide();
                if (msg.d == "") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Proceso guardado.</h1><br/>", document, CerroMensaje);
                }
                else {
                    alerta(msg.d);
                }
            },
            error: function (xhr, err, thrErr) {
                $("#dvCargando").hide();
                MostrarErrorAjax(xhr, err, thrErr);
                //                alerta("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
            }
        });
    });

    if ($("#txtPlantilla").length > 0) {

        $("#txtPlantilla").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $("#txtPlantilla").val($("#txtPlantilla").val().replace(/\\/g, ""));
                $.ajax({
                    type: "POST",
                    url: "Mnt_Config_Proceso.aspx/Listar_Plantilla",
                    data: "{'nombre': '" + $("#txtPlantilla").val().replace(/'/g, "&#39").replace(/"/g, "&#34") + "'," +
                           "'idCliente': '" + window.parent.parent.parent.idCliente + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.Nombre,
                                cod: item.IdPlantilla
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtPlantilla").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                $("#txtPlantilla").val(ui.item.label);
                $("#hdfPlantilla").val(ui.item.cod);
                return false;
            }
        })
        .data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>")
			    .data("item.autocomplete", item)
			    .append("<a>" + item.cod + "=" + item.label + "</a>")
			    .appendTo(ul);
        };
    }

    if ($("#txtFormato").length > 0) {

        $("#txtFormato").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $("#txtFormato").val($("#txtFormato").val().replace(/\\/g, ""));
                $.ajax({
                    type: "POST",
                    url: "Mnt_Config_Proceso.aspx/Listar_Formato",
                    data: "{'nombre': '" + $("#txtFormato").val().replace(/'/g, "&#39").replace(/"/g, "&#34") + "'," +
                           "'idCliente': '" + window.parent.parent.parent.idCliente + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.Nombre,
                                cod: item.IdFormato
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtFormato").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                $("#txtFormato").val(ui.item.label);
                $("#hdfFormato").val(ui.item.cod);
                return false;
            }
        })
        .data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>")
			    .data("item.autocomplete", item)
			    .append("<a>" + item.cod + "=" + item.label + "</a>")
			    .appendTo(ul);
        };
    }

    if ($("#txtFuenteBD").length > 0) {

        $("#txtFuenteBD").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $("#txtFuenteBD").val($("#txtFuenteBD").val().replace(/\\/g, ""));
                $.ajax({
                    type: "POST",
                    url: "Mnt_Config_Proceso.aspx/Listar_FuenteBD",
                    data: "{'nombre': '" + $("#txtFuenteBD").val().replace(/'/g, "&#39").replace(/"/g, "&#34") + "'," +
                           "'idCliente': '" + window.parent.parent.parent.idCliente + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.Nombre,
                                cod: item.IdConfigFuente
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtFuenteBD").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                $("#txtFuenteBD").val(ui.item.label);
                $("#hdfCodigoFuente").val(ui.item.cod);
                return false;
            }
        })
        .data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>")
			    .data("item.autocomplete", item)
			    .append("<a>" + item.cod + "=" + item.label + "</a>")
			    .appendTo(ul);
        };
    }

    if ($("#txtFuenteArchivo").length > 0) {

        $("#txtFuenteArchivo").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $("#txtFuenteArchivo").val($("#txtFuenteArchivo").val().replace(/\\/g, ""));
                $.ajax({
                    type: "POST",
                    url: "Mnt_Config_Proceso.aspx/Listar_FuenteArchivo",
                    data: "{'nombre': '" + $("#txtFuenteArchivo").val().replace(/'/g, "&#39").replace(/"/g, "&#34") + "'," +
                           "'idCliente': '" + window.parent.parent.parent.idCliente + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.Nombre,
                                cod: item.IdConfigFuente
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtFuenteArchivo").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                $("#txtFuenteArchivo").val(ui.item.label);
                $("#hdfCodigoFuente").val(ui.item.cod);
                return false;
            }
        })
        .data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>")
			    .data("item.autocomplete", item)
			    .append("<a>" + item.cod + "=" + item.label + "</a>")
			    .appendTo(ul);
        };
    }

});