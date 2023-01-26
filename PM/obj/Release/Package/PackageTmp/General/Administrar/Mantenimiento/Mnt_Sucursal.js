var TotalOperador = 0;

function sucursal(P_vcCod, vcNom, COMP_P_vcCODCIA, P_vcCodPai, P_vcCodCiu, btEST) {
    this.P_vcCod = P_vcCod;
    this.vcNom = vcNom;
    this.Compania = new setCompania();
    this.Pais = new setPais();
    this.Ciudad = new setCiudad();
    this.btEST = btEST;
}

function setPais(P_vcCodPai) {
    this.P_vcCodPai = P_vcCodPai;
}
function setCompania(COMP_P_vcCODCIA) {
    this.COMP_P_vcCODCIA = COMP_P_vcCODCIA;
}
function setCiudad(P_vcCodCiu) {
    this.P_vcCodCiu = P_vcCodCiu;
}

$(function () {
    var Selecciono = false;

    $("#txtCodigo").keypress(ValidarCodigoVarChar);
    $("#txtNombre").keypress(ValidarAlfaNumericoConEspacios);
    $("#txtOperador").keypress(ValidarAlfaNumericoConEspacios);
    $("#txtPais").keypress(ValidarAlfaNumericoConEspacios);
    $("#txtCiudad").keypress(ValidarAlfaNumericoConEspacios);

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



    $(".btnNormal").button();

    var vcCodPais = $("#hdfPais").val();
    var codTempAutoComp;

    $("#txtPais").focus(function () {
        codTempAutoComp = $("#hdfPais").val();
    });

    if ($("#txtPais").length > 0) {
        $("#txtPais").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    url: "../../../Common/WebService/General.asmx/ListarPais_x_Codigo_o_Nombre",
                    data: "{'vcCriterio': '" + $("#txtPais").val() + "'," +
                           "'idCliente': '" + window.parent.parent.parent.idCliente + "', 'Activo':'1'}",
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
                Selecciono = true;
                //pais
                $("#txtPais").val(ui.item.label);
                $("#hdfPais").val(ui.item.P_vcCodPai);
                if (ui.item.P_vcCodPai != codTempAutoComp) {
                    //ciudad
                    $("#hdfCiudad").val('');
                    $("#txtCiudad").val('');
                    $("#txtCiudad").attr("disabled", false);
                    $("#txtCiudad").css({ 'color': '', 'font-size': '', 'font-weight': '', 'font-style': '' });
                }
                $("#txtCiudad").focus();
                return false;
            },
            change: function (event, ui) {
                if (!Selecciono || !ui.item) {
                    //pais
                    $("#hdfPais").val("");
                    $("#txtPais").val('');
                    //ciudad
                    $("#hdfCiudad").val('');
                    $("#txtCiudad").attr("disabled", true);
                    $("#txtCiudad").val('Seleccione un pais.');
                    $("#txtCiudad").css({ 'color': 'grey', 'font-size': '90%', 'font-weight': 'bold', 'font-style': 'italic' });
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

    if ($("#txtCiudad").length > 0) {
        $("#txtCiudad").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    url: "Mnt_Sucursal.aspx/ListarCiudadPorPaisCriterio",
                    data: "{'vcCodPai': '" + $("#hdfPais").val() + "'," +
                           "'vcCriterio': '" + $("#txtCiudad").val() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.vcNomCiu,
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
                $("#txtCiudad").val(ui.item.label);
                $("#hdfCiudad").val(ui.item.P_vcCodCiu);
                $("#btnGuardar").focus();
                return false;
            },
            change: function (event, ui) {
                if (!Selecciono || !ui.item) {
                    $("#hdfCiudad").val("");
                    $("#txtCiudad").val('');
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


    if ($("#txtOperador").length > 0) {
        $("#txtOperador").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    //url: "Mnt_Sucursal.aspx/ListarCompaniaPorCodigoNombre",
                    url: "Mnt_Sucursal.aspx/ListarOperador",
                    //data: "{'vcCriterio': '" + $("#txtOperador").val() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        response($.map(result.d, function (item) {
                            return {
                                label: item.vcNomOpe,
                                COMP_P_vcCODCIA: item.vcCodOpe
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
                Selecciono = true;
                $("#txtOperador").val(ui.item.label);
                $("#hdfCompania").val(ui.item.COMP_P_vcCODCIA);
                $("#txtPais").focus();
                return false;
            },
            change: function (event, ui) {
                if (!Selecciono || !ui.item) {
                    $("#hdfCompania").val("");
                    $("#txtOperador").val('');
                }
                return false;
            },
            open: function (event, ui) {
                Selecciono = false;
                return false;
            }
        }).data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.COMP_P_vcCODCIA + "=" + item.label + "</a>").appendTo(ul);
        };
    }

    if ($("#txtPais").val() == '') {
        obtenerPaisInstalacion();
    }

    if ($("#txtOperador").val() == '') {
        obtenerOperadorInstalacion();
    }

    $("#btnGuardar").click(function (event) {
        var Sucursal = new sucursal();
        Sucursal.P_vcCod = $("#txtCodigo").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        Sucursal.vcNom = $("#txtNombre").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        Sucursal.Pais.P_vcCodPai = $("#hdfPais").val();
        Sucursal.Compania.COMP_P_vcCODCIA = $("#hdfCompania").val().trim();
        Sucursal.Ciudad.P_vcCodCiu = $("#hdfCiudad").val();
        Sucursal.btEST = $("#chkEstado").is(':checked');

        if ($("#txtCodigo").val() == "") {
            alerta("El Código es un campo obligatorio.");
            $("#txtCodigo").focus();
            return;
        }
        if ($.trim($("#txtNombre").val()) == "") {
            alerta("El Nombre es un campo obligatorio.");
            $("#txtNombre").focus();
            return;
        }
        if ($("#hdfCompania").val() == "") {
            //alerta("La Compañía es un campo obligatorio.");
            alerta("El Operador es un campo obligatorio.");
            $("#txtOperador").focus();
            return;
        }
        if ($("#hdfPais").val() == "") {
            alerta("El País es un campo obligatorio.");
            $("#txtPais").focus();
            return;
        }
        if ($("#hdfCiudad").val() == "") {
            alerta("La Ciudad es un campo obligatorio.");
            $("#txtCiudad").focus();
            return;
        }

        var oSucursal = JSON.stringify(Sucursal);
        var vcCodSuc = $("#hdfSucursal").val();

        $.ajax({
            type: "POST",
            url: "Mnt_Sucursal.aspx/Guardar",
            //data: "{'oCompania': '" + oCompania + "'}",

            data: "{'oSucursal': '" + oSucursal + "'," +
                                   "'vcCodSuc': '" + vcCodSuc.replace(/'/g, "&#39") + "'}",


            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "1") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Sucursal guardada</h1><br/><h2>" + Sucursal.P_vcCod + "</h2>", document, CerroMensaje);
                } else if (result.d == "-1") {
                    alerta("El Código de la Sucursal ya ha sido registrado anteriormente, no se pudo grabar el registro.");
                    BloquearPagina(false);
                } else if (result.d == "0") {
                    alerta("Erro en la acción realiazada.");
                    BloquearPagina(false);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });

    function CerroMensaje() {
        //BloquearPagina(false);
        if ($("#hdfSucursal").val() == "") {//Nuevo
            $("#txtCodigo").val("");
            $("#txtNombre").val("");
            //$("#txtOperador").val("");
            $("#txtPais").val("");
            $("#txtCiudad").val("");
            //$("#hdfCompania").val("");
            $("#hdfPais").val("");
            $("#hdfCiudad").val("");
            $("#txtCodigo").select();
            $("#txtCodigo").focus();
        }
        else {//Edicion
            window.parent.tab.tabs("remove", indiceTab);
        }

        $("#txtOperador").removeAttr("disabled");
        if (TotalOperador == 1) 
        {
            $("#txtOperador").attr("disabled", "disabled");
        }
        else 
        {
            $("#txtOperador").val("");
            $("#txtOperador").removeAttr("disabled");
        }
    }

    $("#btnCerrar").live("click", function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

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

function obtenerOperadorInstalacion() {
    $.ajax({
        type: "POST",
        url: "Mnt_Prefijo.aspx/ObtenerOperadorInstalacion",
        contentType: "application/json; charset=utf-8",
        success: function (msg) {

            TotalOperador = msg.d.TotalOperadores;

            if (TotalOperador == 1) {
                var operadorinst = msg.d.vcNomOpe + "(" + msg.d.vcCodOpe + ")";
                $("#txtOperador").val(msg.d.vcNomOpe);
                $("#hdfCompania").val(msg.d.vcNomOpe); // $("#hdfCompania").val(msg.d.vcCodOpe);    //ECONDEÑA 05/10/2016
                $("#txtOperador").attr("disabled", "disabled");
            }
            else 
            {
                $("#txtOperador").removeAttr("disabled");
            }
        },
        error: function (xhr, err) {
            $("#dvCargando").hide();
            alerta("Error, Estado: " + xhr.readyState + "\nEstado: " + xhr.status);
        }
    });
}


function validarEspaciosEnBlancoAlInicio(id) {
    var valor = $("#" + id + "").val();
    $("#" + id + "").val($.trim(valor));
}