function longitud(Id, inMay, inMen) {
    this.Id = Id;
    this.inMay = inMay;
    this.inMen = inMen;
    this.Origen = new setOrigen();
    this.Servicio = new setServicio();
}
function setOrigen(P_inCodOri) {
    this.P_inCodOri = P_inCodOri;
}
function setServicio(P_inCod) {
    this.P_inCod = P_inCod;
}

$(function () {

    $("#txtOrigen").keypress(ValidarAlfaNumericoConEspacios);
    $("#txtServicio").keypress(ValidarAlfaNumericoConEspacios);

    ValidarNumeroEnCajaTexto("txtMayor", ValidarSoloNumero);
    ValidarNumeroEnCajaTexto("txtMenor", ValidarSoloNumero);

    var indiceTab = window.parent.tab.tabs("option", "selected");

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

    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfLongitud").val() == "") {//Nuevo
            $("#txtOrigen").val("");
            $("#txtServicio").val("");
            $("#hdfOrigen").val("");
            $("#hdfServicio").val("");
            $("#txtMayor").val("");
            $("#txtMenor").val("");
        }
        else {//Edicion
            window.parent.tab.tabs("remove", indiceTab);
        }
    }

    $("#btnCerrar").live("click", function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    }); //boton cerrar JSILUPU - JUL2013

    $(".btnNormal").button();

    var vcCodLon = $("#hdfLongitud").val();


    if ($("#txtOrigen").length > 0) {
        $("#txtOrigen").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    url: "Mnt_Longitud.aspx/ListarOrigenPorPais_y_Criterio",
                    data: "{'vcCriterio': '" + $("#txtOrigen").val().replace(/'/g, "&#39").replace(/"/g, "&#34") + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.vcNomOri,
                                P_inCodOri: item.P_inCodOri
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtOrigen").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                Selecciono = true;
                $("#txtOrigen").val(ui.item.label);
                $("#hdfOrigen").val(ui.item.P_inCodOri);
                $("#txtServicio").focus();
                return false;
            },
            change: function (event, ui) {
                if (!Selecciono) {
                    $("#hdfOrigen").val("");
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
			    .append("<a>" + item.P_inCodOri + "=" + item.label + "</a>")
			    .appendTo(ul);
        };
    }


    if ($("#txtServicio").length > 0) {
        $("#txtServicio").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    url: "Mnt_Longitud.aspx/ListarServicio_x_Criterio",
                    data: "{'vcCriterio': '" + $("#txtServicio").val().replace(/'/g, "&#39").replace(/"/g, "&#34") + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.vcNom,
                                P_inCod: item.P_inCod,
                                vcGlo: item.vcGlo
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtServicio").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                Selecciono = true;
                $("#txtServicio").val(ui.item.label);
                $("#hdfServicio").val(ui.item.P_inCod);
                $("#txtMayor").focus();
                return false;
            },
            change: function (event, ui) {
                if (!Selecciono) {
                    $("#hdfServicio").val("");
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
			    .append("<a>" + item.vcGlo + "=" + item.label + "</a>")
			    .appendTo(ul);
        };
    }

    $("#btnGuardar").click(function (event) {
        var Longitud = new longitud();
        Longitud.Origen.P_inCodOri = $("#hdfOrigen").val();
        Longitud.Servicio.P_inCod = $("#hdfServicio").val();
        Longitud.inMay = $("#txtMayor").val();
        Longitud.inMen = $("#txtMenor").val();

        if (Longitud.Origen.P_inCodOri == "") {
            alerta("El Origen es un campo obligatorio.");
            $("#txtOrigen").focus();
            return;
        }
        if (Longitud.Servicio.P_inCod == "") {
            alerta("El Servicio es un campo obligatorio.");
            $("#txtServicio").focus();
            return;
        }
        if (Longitud.inMay == "") {
            //alerta("El Número de dígitos >= es un campo obligatorio.");
            alerta("El Número de dígitos mínimo es un campo obligatorio.");
            $("#txtMayor").focus();
            return;
        }
        if (Longitud.inMen == "") {
            alerta("El Número de dígitos máximo es un campo obligatorio.");
            $("#txtMenor").focus();
            return;
        }

        if (parseInt(Longitud.inMay) > parseInt(Longitud.inMen)) {
            alerta("El Número de dígitos mínimo no deben ser mayor a los números de dígitos máximo");
            $("#txtMayor").focus();
            return;
        }


        // Solo para cuando se va a actualizar
        if ($("#hdfLongitud").val() != "") {
            Longitud.Id = $("#hdfLongitud").val();
        }
        //        if (Compania.COMP_P_vcCODCIA == "") {
        //            alerta("El código de la compañia es un campo obligatorio.");
        //            $("#txtCodigo").focus();
        //            return;
        //        };

        var oLongitud = JSON.stringify(Longitud);
        var vcCodLon = $("#hdfLongitud").val();

        $.ajax({
            type: "POST",
            url: "Mnt_Longitud.aspx/Guardar",

            data: "{'oLongitud': '" + oLongitud + "'," +
                               "'vcCodLon': '" + vcCodLon.replace(/'/g, "&#39") + "'}",

            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "0") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Longitud guardada</h1><br/>", document, CerroMensaje);
                }
                else {
                    alerta("La Longitud ya ha sido registrada anteriormente, no se pudo grabar el registro");
                    BloquearPagina(false);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });
});




