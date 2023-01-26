var Selecciono;
var codTempAutocomplete;
$(function () {
    var indiceTab = window.parent.tab.tabs("option", "selected");

    $("#txtCodigo").focus();
    $(".btnNormal").button();

    //    $("#txtTamanoDato").keypress(VerificaTipo);
    $("#txtCodigo").keypress(ValidarNoEspacio);

    if ($("#hdfPais").val() != '' && $("#hdfPais").val() > 0) {
        var IdPais = $("#hdfPais").val();
        CargarCiudad(IdPais);
    }

    if ($("#hdfCiudad").val() != '' && $("#hdfCiudad").val() > 0) {
        var IdCiudad = $("#hdfCiudad").val();
        CargarProvincia(IdCiudad);
    }

    if ($("#hdfProvincia").val() != '' && $("#hdfProvincia").val() > 0) {
        var IdProvincia = $("#hdfProvincia").val();
        cargarDistrito(IdProvincia);
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

    $("#btnCerrar").live("click", function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

    $("#btnGuardar").click(function () {
        GuardarOficina();
    });

    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfCodOficina").val() == "") {
            $("#txtCodigo").val("");
            $("#txtPais").val("");
            $("#hdfPais").val("");
            $("#txtCiudad").val("");
            $("#hdfCiudad").val("");
            $("#txtProvincia").val("");
            $("#hdfProvincia").val("");
            $("#txtDistrito").val("");
            $("#hdfDistrito").val("");
            $("#txtDescripcion").val("");
            $("#txtDireccion").val("");
            $("#txtReferencia").val("");
            $("#txtCodigo").focus();
        }
        else {
            window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
        }
    }

    //ciudad superior
    if ($("#txtCiudad").val() == '') {
        $("#txtCiudad").attr("disabled", true);
        $("#txtCiudad").val('Seleccione un pais.');
        $("#txtCiudad").css({ 'color': 'grey', 'font-size': '90%', 'font-weight': 'bold', 'font-style': 'italic' });
    }
    if ($("#txtProvincia").val() == '') {
        $("#txtProvincia").attr("disabled", true);
        $("#txtProvincia").val('Seleccione una ciudad.');
        $("#txtProvincia").css({ 'color': 'grey', 'font-size': '90%', 'font-weight': 'bold', 'font-style': 'italic' });
    }
    if ($("#txtDistrito").val() == '') {
        $("#txtDistrito").attr("disabled", true);
        $("#txtDistrito").val('Seleccione una provincia.');
        $("#txtDistrito").css({ 'color': 'grey', 'font-size': '90%', 'font-weight': 'bold', 'font-style': 'italic' });
    }
    //validar seleccion de autocompletes
    $("#txtPais,#txtCiudad,#txtProvincia,#txtDistrito").keypress(function (e) {
        if (e.keyCode == 13) {
            switch ($(this).attr("id")) {
                case ("txtPais"):
                    $("#txtCiudad").focus();
                    break;
                case ("txtCiudad"):
                    $("#txtProvincia").focus();
                    break;
                case ("txtProvincia"):
                    $("#txtDistrito").focus();
                    break;
                case ("txtDistrito"):
                    $("#txtDescripcion").focus();
                    break;
            }
        } else {
            Selecciono = false;
        }
    });
    $("#txtPais,#txtCiudad,#txtProvincia,#txtDistrito").focus(function () {
        switch ($(this).attr("id")) {
            case ("txtPais"):
                codTempAutocomplete = $("#hdfPais").val();
                break;
            case ("txtCiudad"):
                codTempAutocomplete = $("#hdfCiudad").val();
                break;
            case ("txtProvincia"):
                codTempAutocomplete = $("#hdfProvincia").val();
                break;
            case ("txtDistrito"):
                codTempAutocomplete = $("#hdfDistrito").val();
                break;
        }
    });

    //Cargar PAISES
    if ($("#txtPais").length > 0) {
        $("#txtPais").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    url: "../../../Common/WebService/General.asmx/ListarPais_x_Codigo_o_Nombre",
                    data: "{'vcCriterio': '" + $("#txtPais").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                           "'idCliente': '" + window.parent.parent.parent.idCliente + "','Activo':'1'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.vcNomPai.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                                P_vcCodPai: item.P_vcCodPai
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtPais").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                Selecciono = true;
                //pais
                $("#txtPais").val(ui.item.label);
                $("#hdfPais").val(ui.item.P_vcCodPai);
                if (ui.item.P_vcCodPai != codTempAutocomplete) { //selecciono el mismo anterior (no hacer nada)
                    //ciudad
                    $("#hdfCiudad").val("");
                    $("#txtCiudad").val('');
                    $("#txtCiudad").prop("disabled", false);
                    $("#txtCiudad").css({ 'color': '', 'font-size': '', 'font-weight': '', 'font-style': '' });
                    //provincia
                    $("#hdfProvincia").val('');
                    $("#txtProvincia").attr("disabled", true);
                    $("#txtProvincia").val('Seleccione una ciudad.');
                    $("#txtProvincia").css({ 'color': 'grey', 'font-size': '90%', 'font-weight': 'bold', 'font-style': 'italic' });
                    //distrito
                    $("#hdfDistrito").val("");
                    $("#txtDistrito").attr("disabled", true);
                    $("#txtDistrito").val('Seleccione una provincia.');
                    $("#txtDistrito").css({ 'color': 'grey', 'font-size': '90%', 'font-weight': 'bold', 'font-style': 'italic' });

                    $('#chkPadre:checked').removeAttr("checked");
                    $('#trCiudadBase').hide();
                    CargarCiudad(ui.item.P_vcCodPai);
                }
                $("#txtCiudad").focus();
                return false;
            },
            change: function (event, ui) {
                if (!Selecciono) {
                    //pais
                    $("#txtPais").val('');
                    $("#hdfPais").val("");
                    //ciudad
                    $("#hdfCiudad").val("");
                    $("#txtCiudad").attr("disabled", true);
                    $("#txtCiudad").val('Seleccione un pais.');
                    $("#txtCiudad").css({ 'color': 'grey', 'font-size': '90%', 'font-weight': 'bold', 'font-style': 'italic' });
                    //provincia
                    $("#hdfProvincia").val("");
                    $("#txtProvincia").attr("disabled", true);
                    $("#txtProvincia").val('Seleccione una ciudad.');
                    $("#txtProvincia").css({ 'color': 'grey', 'font-size': '90%', 'font-weight': 'bold', 'font-style': 'italic' });
                    //distrito
                    $("#hdfDistrito").val("");
                    $("#txtDistrito").attr("disabled", true);
                    $("#txtDistrito").val('Seleccione una provincia.');
                    $("#txtDistrito").css({ 'color': 'grey', 'font-size': '90%', 'font-weight': 'bold', 'font-style': 'italic' });

                    CargarCiudad("");
                    CargarProvincia("");
                    cargarDistrito("");
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
			    .append("<a>" + item.P_vcCodPai + "=" + item.label + "</a>")
			    .appendTo(ul);
        };
    }

    //Cargar CIUDADES
    function CargarCiudad(codPais) {
        if ($("#txtCiudad").length > 0) {
            $("#txtCiudad").autocomplete({
                minLength: 0,
                source: function (request, response) {
                    $.ajax({
                        type: "POST",
                        url: "Cam_Mnt_CampanaOficina.aspx/ListarCiudad",
                        data: "{'vcCriterio': '" + $("#txtCiudad").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                                "'prCodPais': '" + codPais + "'}",
                        //data: "{'prCodPais': '" + codPais + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            response($.map(result.d, function (item) {
                                return {
                                    label: item.vcNomCiu.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                                    P_vcCodCiu: item.P_vcCodCiu
                                };
                            }));
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                },
                focus: function (event, ui) {
                    $("#txtCiudad").val(ui.item.label);
                    return false;
                },
                select: function (event, ui) {
                    Selecciono = true;
                    //ciudad
                    $("#txtCiudad").val(ui.item.label);
                    $("#hdfCiudad").val(ui.item.P_vcCodCiu);
                    if (ui.item.P_vcCodCiu != codTempAutocomplete) { //selecciono el mismo anterior (no hacer nada)
                        //provincia
                        $("#hdfProvincia").val();
                        $("#txtProvincia").val('');
                        $("#txtProvincia").attr("disabled", false);
                        $("#txtProvincia").css({ 'color': '', 'font-size': '', 'font-weight': '', 'font-style': '' });
                        //distrito
                        $("#hdfDistrito").val("");
                        $("#txtDistrito").attr("disabled", true);
                        $("#txtDistrito").val('Seleccione una provincia.');
                        $("#txtDistrito").css({ 'color': 'grey', 'font-size': '90%', 'font-weight': 'bold', 'font-style': 'italic' });
                    }
                    $("#txtProvincia").focus();
                    CargarProvincia(ui.item.P_vcCodCiu);
                    return false;
                },
                change: function (event, ui) {
                    if (!Selecciono) {
                        //ciudad
                        $("#txtCiudad").val("");
                        $("#hdfCiudad").val("");
                        //provincia
                        $("#hdfProvincia").val("");
                        $("#txtProvincia").attr("disabled", true);
                        $("#txtProvincia").val('Seleccione una ciudad.');
                        $("#txtProvincia").css({ 'color': 'grey', 'font-size': '90%', 'font-weight': 'bold', 'font-style': 'italic' });
                        //distrito
                        $("#hdfDistrito").val("");
                        $("#txtDistrito").attr("disabled", true);
                        $("#txtDistrito").val('Seleccione una provincia.');
                        $("#txtDistrito").css({ 'color': 'grey', 'font-size': '90%', 'font-weight': 'bold', 'font-style': 'italic' });

                        CargarProvincia("");
                        cargarDistrito("");
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
			    .append("<a>" + item.P_vcCodCiu + "=" + item.label + "</a>")
			    .appendTo(ul);
        };
        }
    }

    //CARGAR PROVINCIAS
    function CargarProvincia(codCiudad) {
        if ($("#txtProvincia").length > 0) {
            $("#txtProvincia").autocomplete({
                minLength: 0,
                source: function (request, response) {
                    $.ajax({
                        type: "POST",
                        url: "Cam_Mnt_CampanaOficina.aspx/ListarProvinciaPorCiudad",
                        data: "{'vcCriterio': '" + $("#txtProvincia").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                                "'prCodCiudad': '" + codCiudad + "'}",
                        //data: "{'prCodCiudad': '" + codCiudad + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            response($.map(result.d, function (item) {
                                return {
                                    label: item.Nombre.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                                    Codigo: item.Codigo
                                };
                            }));
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                },
                focus: function (event, ui) {
                    $("#txtProvincia").val(ui.item.label);
                    return false;
                },
                select: function (event, ui) {
                    Selecciono = true;
                    //provincia
                    $("#txtProvincia").val(ui.item.label);
                    $("#hdfProvincia").val(ui.item.Codigo);
                    if (ui.item.Codigo != codTempAutocomplete) { //selecciono el mismo anterior (no hacer nada)
                        //distrito
                        $("#hdfDistrito").val("");
                        $("#txtDistrito").val('');
                        $("#txtDistrito").attr("disabled", false);
                        $("#txtDistrito").css({ 'color': '', 'font-size': '', 'font-weight': '', 'font-style': '' });
                    }
                    $("#txtDistrito").focus();
                    cargarDistrito(ui.item.Codigo);
                    return false;
                },
                change: function (event, ui) {
                    if (!Selecciono) {
                        //provincia
                        $("#hdfProvincia").val("");
                        $("#txtProvincia").val('');
                        //distrito
                        $("#hdfDistrito").val("");
                        $("#txtDistrito").attr("disabled", true);
                        $("#txtDistrito").val('Seleccione una provincia.');
                        $("#txtDistrito").css({ 'color': 'grey', 'font-size': '90%', 'font-weight': 'bold', 'font-style': 'italic' });
                        cargarDistrito("");
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
			    .append("<a>" + item.Codigo + "=" + item.label + "</a>")
			    .appendTo(ul);
        };
        }
    }

    function cargarDistrito(codProv) {
        if ($("#txtDistrito").length > 0) {
            $("#txtDistrito").autocomplete({
                minLength: 0,
                source: function (request, response) {
                    $.ajax({
                        type: "POST",
                        url: "Cam_Mnt_CampanaOficina.aspx/ListarDistritoPorProvincia",
                        data: "{'vcCriterio': '" + $("#txtDistrito").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                                "'prCodProvincia': '" + codProv + "'}",
                        //data: "{'prCodProvincia': '" + codProv + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            response($.map(result.d, function (item) {
                                return {
                                    label: item.Nombre.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                                    Codigo: item.Codigo
                                };
                            }));
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                },
                focus: function (event, ui) {
                    $("#txtDistrito").val(ui.item.label);
                    return false;
                },
                select: function (event, ui) {
                    Selecciono = true;
                    $("#txtDistrito").val(ui.item.label);
                    $("#hdfDistrito").val(ui.item.Codigo);
                    $("#txtDescripcion").focus();
                    return false;
                },
                change: function (event, ui) {
                    if (!Selecciono) {
                        $("#hdfDistrito").val("");
                        $("#txtDistrito").val('');
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
			    .append("<a>" + item.Codigo + "=" + item.label + "</a>")
			    .appendTo(ul);
        };
        }
    }

    function GuardarOficina() {
        var codigo = $("#txtCodigo").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        var codPais = $("#hdfPais").val();
        var codCiudad = $("#hdfCiudad").val();
        var codProv = $("#hdfProvincia").val();
        var codDistrito = $("#hdfDistrito").val();
        var Descripcion = $("#txtDescripcion").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        var Direccion = $("#txtDireccion").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        var Referencia = $("#txtReferencia").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92"); // $('#chkMonitorear').is(':checked')
        var vigente = 1;

        if (codigo == "") {
            alerta("Ingrese un Código");
            $("#txtCodigo").focus();
            return;
        }
        if (codPais == "") {
            alerta("Seleccione un País");
            $("#txtPais").focus();
            return;
        }
        if (codCiudad == "") {
            alerta("Seleccione una Ciudad");
            $("#txtCiudad").focus();
            return;
        }
        if (codProv == "") {
            alerta("Seleccione una Provincia");
            $("#txtProvincia").focus();
            return;
        }
        if (codDistrito == "") {
            alerta("Seleccione un Distrito");
            $("#txtDistrito").focus();
            return;
        }
        if (Descripcion == "") {
            alerta("Ingrese una Descripción");
            $("#txtDescripcion").focus();
            return;
        }

        if (Direccion == "") {
            alerta("Ingrese una Dirección");
            $("#txtDireccion").focus();
            return;
        }


        var Estado = $("#chkEstado").prop("checked");
        /*
        if (Referencia == "") {
        alerta("Ingrese una Referencia");
        $("#txtReferencia").focus();
        return;
        }
        */

        $.ajax({
            type: "POST",
            url: "Cam_Mnt_CampanaOficina.aspx/Guardar",
            data: "{'IdOficina': '" + $("#hdfCodOficina").val() + "'," +
                "'Codigo': '" + codigo + "'," +
                "'IdPais': '" + codPais + "'," +
                "'IdCiudad': '" + codCiudad + "'," +
                "'IdProvincia': '" + codProv + "'," +
                "'IdDistrito': '" + codDistrito + "'," +
                "'Descripcion': '" + Descripcion + "'," +
                "'Direccion': '" + Direccion + "'," +
                "'Estado': '" + Estado + "'," +
                "'Referencia': '" + Referencia + "'," +
                "'IdCliente': '" + window.parent.parent.parent.idCliente + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#dvCargando").hide();
                if (result.d == "1") {
                    Mensaje("<br/><h1>Oficina guardado</h1><br/>", document, CerroMensaje);
                }
                if (result.d == "99") {
                    alerta("La Oficina ya ha sido Registrada. Intente nuevamente");
                }
                window.parent.ActualizarGrilla();
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
});

function validarEspaciosEnBlancoAlInicio(id) {
    var valor = $("#" + id.toString() + "").val();
    $("#" + id.toString() + "").val($.trim(valor));
}