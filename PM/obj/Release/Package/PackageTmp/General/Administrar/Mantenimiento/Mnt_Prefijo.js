function prefijo(Id, P_vcCodPre, P_F_inCodCli, btExtPre, inLonExt, btLonExa) {
    this.Id = Id;
    this.P_vcCodPre = P_vcCodPre;
    this.P_F_inCodCli = P_F_inCodCli;
    this.btExtPre = btExtPre;
    this.inLonExt = inLonExt;
    this.btLonExa = btLonExa;
    this.Compania = new setCompania();
    this.Pais = new setPais();
    this.Origen = new setOrigen();
    this.Servicio = new setServicio();
}

function setPais(P_vcCodPai) {
    this.P_vcCodPai = P_vcCodPai;
}
function setCompania(p_inCodOpe, COMP_P_vcCODCIA) {
    this.p_inCodOpe = p_inCodOpe;
    this.COMP_P_vcCODCIA = COMP_P_vcCODCIA;
}
function setOrigen(P_inCodOri) {
    this.P_inCodOri = P_inCodOri;
}
function setServicio(P_inCod) {
    this.P_inCod = P_inCod;
}

var SeleccionoPais = true;
var SeleccionoOperador = false;
var SeleccionoOrigen = false;
var SeleccionoServicio;
if ($("#hdfPrefijo").val() == "") {
    SeleccionoServicio = false;
} else {
    SeleccionoServicio = true;
    SeleccionoOperador = true;
    SeleccionoOrigen = true;
}
$(function () {
    //inicio validacion autocompletar
    $("#txtPais,#txtOperador,#txtOrigen,#txtServicio").keypress(function (e) {
        if (e.keyCode != 13) {
            switch ($(this).attr("id")) {
                case 'txtPais':
                    SeleccionoOrigen = false;
                    break;
                case 'txtOrigen':
                    SeleccionoOrigen = false;
                    break;
                case 'txtOperador':
                    SeleccionoOperador = false;
                    break;
                case 'txtServicio':
                    SeleccionoServicio = false;
                    break;
            }
        } else {
            switch ($(this).attr("id")) {
                case 'txtPais':
                    $("#txtOrigen").focus();
                    break;
                case 'txtOrigen':
                    $("#txtOperador").focus();
                    break;
                case 'txtOperador':
                    $("#txtPrefijo").focus();
                    break;
                case 'txtServicio':
                    $("#chkExtraer").focus();
                    break;
            }
        }
    });
    //fin validacion autocompletar

    ValidarNumeroEnCajaTexto("txtLongitud", ValidarSoloNumero);

    $("#txtPais").keypress(ValidarAlfaNumericoConEspacios);
    $("#txtOrigen").keypress(ValidarAlfaNumericoConEspacios);
    $("#txtServicio").keypress(ValidarAlfaNumericoConEspacios);
    $("#txtOperador").keypress(ValidarAlfaNumericoConEspacios);

    // Si es un nuevo prefijo ocultar la fila: trLongitudExtraer
    var vcCodPre = $("#hdfPrefijo").val();
    if (vcCodPre == "") {
        $('#trLongitudExtraer').hide();
    } else {
        if ($('#chkExtraer').is(':checked')) {
            $('#trLongitudExtraer').show();
        }
        else {
            $('#trLongitudExtraer').hide();
        }
    }

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
        if ($("#hdfPrefijo").val() == "") {//Nuevo
            $("#txtPais").val("");
            $("#txtOrigen").val("");
            $("#txtOperador").val("");
            $("#txtServicio").val("");
            $("#hdfPais").val("");
            $("#hdfOrigen").val("");
            $("#hdfCompania").val("");
            $("#hdfServicio").val("");
            $("#txtPrefijo").val("");
            $("#txtLongitud").val("");
            $('#chkExtraer:checked').removeAttr("checked");
            $('#chkLongitud:checked').removeAttr("checked");
        }
        else {//Edicion
            window.parent.tab.tabs("remove", indiceTab);
        }
    }



    $("#btnCerrar").live("click", function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    }); //boton cerrar JSILUPU - JUL2013


    $(".btnNormal").button();



    if ($("#txtPais").length > 0) {
        $("#txtPais").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    url: "../../../Common/WebService/General.asmx/ListarPais_x_Codigo_o_Nombre",
                    data: "{'vcCriterio': '" + $("#txtPais").val().replace(/'/g, "&#39").replace(/"/g, "&#34") + "'," +
                           "'idCliente': '" + window.parent.parent.parent.idCliente + "','Activo':'1'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.vcNomPai,
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
                SeleccionoPais = true;
                $("#txtPais").val(ui.item.label);
                $("#hdfPais").val(ui.item.P_vcCodPai);
                $("#txtOrigen").focus();
                return false;
            },
            change: function (event, ui) {
                if (!SeleccionoPais) {
                    $("#hdfPais").val("");
                    $("#txtPais").val("");
                }
                return false;
            },
            open: function (event, ui) {
                SeleccionoPais = false;
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




    if ($("#txtOperador").length > 0) {
        $("#txtOperador").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    url: "Mnt_Prefijo.aspx/ListarCompaniaPorCodigoNombre_y_Pais",
                    //                    data: "{'vcCriterio': '" + $("#txtOperador").val() + "'}",

                    data: "{'vcCriterio': '" + $("#txtOperador").val().replace(/'/g, "&#39").replace(/"/g, "&#34") + "'," +
                           "'inCodPai': '" + $("#hdfPais").val() + "'}",

                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.COMP_vcNOMCIA,
                                p_inCodOpe: item.p_inCodOpe,
                                COMP_P_vcCODCIA: item.COMP_P_vcCODCIA
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtOperador").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                SeleccionoOperador = true;
                $("#txtOperador").val(ui.item.label);
                $("#hdfCompania").val(ui.item.p_inCodOpe);
                $("#txtPrefijo").focus();
                return false;
            },
            change: function (event, ui) {
                if (!SeleccionoOperador) {
                    $("#hdfCompania").val("");
                    $("#txtOperador").val("");
                }
                return false;
            },
            open: function (event, ui) {
                SeleccionoOperador = false;
                return false;
            }
        })
        .data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>")
			    .data("item.autocomplete", item)
			    .append("<a>" + item.COMP_P_vcCODCIA + "=" + item.label + "</a>")
			    .appendTo(ul);
        };
    }



    if ($("#txtOrigen").length > 0) {
        $("#txtOrigen").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    url: "Mnt_Prefijo.aspx/ListarOrigenPorPais_y_Criterio",

                    data: "{'inCodPai': '" + $("#hdfPais").val() + "'," +
                           "'vcCriterio': '" + $("#txtOrigen").val().replace(/'/g, "&#39").replace(/"/g, "&#34") + "'}",

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
                SeleccionoOrigen = true;
                $("#txtOrigen").val(ui.item.label);
                $("#hdfOrigen").val(ui.item.P_inCodOri);
                $("#txtOperador").focus();
                return false;
            },
            change: function (event, ui) {
                if (!SeleccionoOrigen) {
                    $("#hdfOrigen").val("");
                    $("#txtOrigen").val("");
                }
                return false;
            },
            open: function (event, ui) {
                SeleccionoOrigen = false;
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
                    url: "Mnt_Prefijo.aspx/ListarServicio_x_Criterio",
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
                SeleccionoServicio = true;
                $("#txtServicio").val(ui.item.label);
                $("#hdfServicio").val(ui.item.P_inCod);
                $("#chkExtraer").focus();
                return false;
            },
            change: function (event, ui) {
                if (!SeleccionoServicio) {
                    $("#hdfServicio").val("");
                    $("#txtServicio").val("");
                }
                return false;
            },
            open: function (event, ui) {
                SeleccionoServicio = false;
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


    $("#chkExtraer").change(function () {
        if ($('#chkExtraer').is(':checked')) {
            $('#trLongitudExtraer').show();
        }
        else {
            $('#trLongitudExtraer').hide();
        }
    });

    $("#btnGuardar").click(function (event) {
        var Prefijo = new prefijo();

        // Solo para cuando se va a actualizar
        if ($("#hdfPrefijo").val() != "") {
            Prefijo.Id = $("#hdfPrefijo").val();
        }
        //var txtPrefijo = $("#txtPrefijo").val();
        Prefijo.P_vcCodPre = $("#txtPrefijo").val().replace(/'/g, "&#39").replace(/"/g, "&#34");
        Prefijo.Pais.P_vcCodPai = $("#hdfPais").val();
        Prefijo.Origen.P_inCodOri = $("#hdfOrigen").val();
        Prefijo.Compania.p_inCodOpe = $("#hdfCompania").val();
        Prefijo.Servicio.P_inCod = $("#hdfServicio").val();


        if ($('#chkExtraer').is(':checked')) {
            Prefijo.btExtPre = true;
            Prefijo.btLonExa = $("#txtLongitud").val();

            if ($("#txtLongitud").val() != "") {
                Prefijo.inLonExt = $("#txtLongitud").val();
            }

        } else {
            Prefijo.btExtPre = false;
        }

        if ($('#chkLongitud').is(':checked')) {
            Prefijo.btLonExa = true;
        } else {
            Prefijo.btLonExa = false;
        }

        if ($("#txtPais").val() == "" || !SeleccionoPais) {
            alerta("El País es un campo obligatorio.");
            $("#txtPais").focus();
            return;
        }
        if ($("#txtOrigen").val() == "" || !SeleccionoOrigen) {
            alerta("El Origen es un campo obligatorio.");
            $("#txtOrigen").focus();
            return;
        }
        if ($("#txtOperador").val() == "" || !SeleccionoOperador) {
            alerta("El Operador es un campo obligatorio.");
            $("#txtOperador").focus();
            return;
        }
        if ($("#txtServicio").val() == "" || !SeleccionoServicio) {
            alerta("El Servicio es un campo obligatorio.");
            $("#txtServicio").focus();
            return;
        }


        var oPrefijo = JSON.stringify(Prefijo);
        var vcCodPre = $("#hdfPrefijo").val();

        $.ajax({
            type: "POST",
            url: "Mnt_Prefijo.aspx/Guardar",
            //data: "{'oCompania': '" + oCompania + "'}",

            data: "{'oPrefijo': '" + oPrefijo + "'," +
                                       "'vcCodPre': '" + vcCodPre.replace(/'/g, "&#39") + "'}",


            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "0") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Prefijo guardado</h1><br/><h2>" + Prefijo.P_vcCodPre + "</h2>", document, CerroMensaje);
                }
                else {
                    alerta("El código del Prefijo ya ha sido Registrado Anteriormente, no se Pudo Grabar el Registro");
                    BloquearPagina(false);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });

    obtenerPaisInstalacion();

});

function obtenerPaisInstalacion() {
    $.ajax({
        type: "POST",
        url: "Mnt_Prefijo.aspx/ObtenerPaisInstalacion",
        contentType: "application/json; charset=utf-8",
        success: function (msg) {
            var paisinst = msg.d.vcNomPai + "(" + msg.d.P_vcCodPai + ")";
            $("#txtPais").val(msg.d.vcNomPai);
            $("#hdfPais").val(msg.d.P_vcCodPai);
            //obtenerCiudad(paisinst);
        },
        error: function (xhr, err) {
            $("#dvCargando").hide();
            alerta("Error, Estado: " + xhr.readyState + "\nEstado: " + xhr.status);
        }
    });
}
