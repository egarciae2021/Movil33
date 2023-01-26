

function ciudad(P_vcCodPai, P_vcCodCiu, vcNomCiu, vcCiuBas, CIUD_btEST) {
    this.P_vcCodCiu = P_vcCodCiu;
    this.vcNomCiu = vcNomCiu;
    this.vcCiuBas = vcCiuBas;
    this.Pais = new setPais();
    this.CIUD_btEST = CIUD_btEST;
}

function setPais(P_vcCodPai) {
    this.P_vcCodPai = P_vcCodPai;
}

$(function () {

    ValidarNumeroEnCajaTexto("txtCodigo", ValidarSoloNumero);
    $("#txtNombre").keypress(ValidarAlfaNumericoConEspacios);

    $('#trCiudadBase').hide();
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
        if ($("#hdfCiudad").val() == "") {//Nuevo
            $("#txtCodigo").val("");
            $("#txtNombre").val("");
            $("#txtPais").val("");
            $("#hdfPais").val("");
            $('#chkPadre:checked').removeAttr("checked");
            $('#trCiudadBase').hide();
        }
        else {//Edicion
            window.parent.tab.tabs("remove", indiceTab);
        }
    }

    $("#btnCerrar").live("click", function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    }); //boton cerrar JSILUPU - JUL2013


    $(".btnNormal").button();

    var vcCodCiu = $("#hdfCiudad").val();

    //    $("#btnGuardar").click(function (event) {
    //        var Ciudad = new ciudad();
    //        Ciudad.SetPais.P_vcCodPai = $("#ddlPais").val();
    //        Ciudad.P_vcCodCiu = $("#txtCodigo").val();
    //        Ciudad.vcNomCiu = $("#txtNombre").val();
    //        alert($("#txtNombre").val(););

    //        if (Pais.P_vcCodPai == "") {
    //            alerta("El código del país es un campo obligatorio.");
    //            $("#txtCodigo").focus();
    //            return;
    //        };

    //        var oPais = JSON.stringify(Pais);
    //        var vcCodPai = $("#hdfPais").val();

    //       
    //    });





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
                                //                                category: item.Grupo.vcNom,
                                //                                inCodGru: item.Grupo.P_inCod
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
                $("#txtPais").val(ui.item.label);
                $("#hdfPais").val(ui.item.P_vcCodPai);
                $("#txtCodigo").val("");
                $("#txtCodigo").focus();
                $('#chkPadre:checked').removeAttr("checked");
                $('#trCiudadBase').hide();
                return false;
            },
            change: function (event, ui) {
                if (!Selecciono) {
                    $("#hdfPais").val("");
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

    function LoadCiudades(result) {
        $("#ddlCiudadBase").html("");
        if ($(result.d).length != 0) {
            $.each(result.d, function () {
                $("#ddlCiudadBase").append($("<option></option>").attr("value", this.P_vcCodCiu).text(this.vcNomCiu));
            });
        } else {
            $("#ddlCiudadBase").append($("<option></option>").attr("value", -2).text("Codigo no válido"));
        }
    }

    $("#txtCodigo").keypress(function (e) {
        if (e.keyCode == 13) {
            $("#txtNombre").focus();
        } else {
            $('#chkPadre:checked').removeAttr("checked");
            $('#trCiudadBase').hide();
        }
    });

    $("#chkPadre").change(function () {
        if ($('#chkPadre').is(':checked')) {

            //            var params = new Object();
            //            params.vcCodPai = $("#hdfPais").val();
            //            //params.vcCiudadesBase = $("#txtCodigo").val();
            //            params = JSON.stringify(params);

            var cadena = $("#txtCodigo").val();

            var codciu;
            var cadaux;
            cadaux = "";
            var i;
            for (i = 0; i < cadena.length - 1; i++) {
                codciu = cadena.substring(0, i + 1);
                cadaux = cadaux + "'" + codciu + "',";
            }
            cadaux = cadaux.substring(0, cadaux.length - 1);

            if ($("#hdfPais").val() == "") {
                alerta("Seleccionar un país.");
                $('#chkPadre:checked').removeAttr("checked");
                $("#txtPais").focus();
                return;
            }
            else if (cadena.length <= 1) {
                alerta("Ingrese un codigo valido");
                $('#chkPadre:checked').removeAttr("checked");
                $("#txtCodigo").focus();
                return;
            }
            else {
                $('#trCiudadBase').show();
            }


            $.ajax({
                type: "POST",
                url: "Mnt_Ciudad.aspx/ListarCiudadPorPais",
                //                data: "{'vcCodPai': '" + $("#hdfPais").val() + "'}",

                data: "{'vcCodPai': '" + $("#hdfPais").val() + "'," +
                         "'vcCiudadesBase': '" + cadaux.replace(/'/g, "&#39") + "'}",

                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: LoadCiudades,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus + ": " + XMLHttpRequest.responseText);
                }
            });
        }
        else {
            $('#trCiudadBase').hide();
        }
    });



    $("#btnGuardar").click(function (event) {
        var Ciudad = new ciudad();
        Ciudad.Pais.P_vcCodPai = $("#hdfPais").val();
        Ciudad.P_vcCodCiu = $("#txtCodigo").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        Ciudad.vcNomCiu = $("#txtNombre").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        Ciudad.CIUD_btEST = $("#chkEstado").is(':checked');

        if (Ciudad.Pais.P_vcCodPai == "") {
            alerta("El Código del País es un campo obligatorio.");
            $("#txtPais").focus();
            return;
        }
        if (Ciudad.P_vcCodCiu == "") {
            alerta("El Código de la Ciudad es un campo obligatorio.");
            $("#txtCodigo").focus();
            return;
        }
        if (Ciudad.vcNomCiu == "") {
            alerta("El Nombre de la Ciudad es un campo obligatorio.");
            $("#txtNombre").focus();
            return;
        }
        if ($('#chkPadre').is(':checked')) {
            if ($("#ddlCiudadBase").val() != -2) {
                Ciudad.vcCiuBas = $("#ddlCiudadBase").val();
            } else {
                alerta("Código de Ciudad Base inválido");
                return;
            }
            //            if (Ciudad.vcCiuBas == "") {
            //                alerta("Seleccione una ciudad base.");
            //                $("#txtNombre").focus();
            //                return;
            //            };
        } else {
            Ciudad.vcCiuBas = Ciudad.P_vcCodCiu;
        }



        var oCiudad = JSON.stringify(Ciudad);
        var vcCodCiu = $("#hdfCiudad").val();

        $.ajax({
            type: "POST",
            url: "Mnt_Ciudad.aspx/Guardar",
            //data: "{'oCompania': '" + oCompania + "'}",

            data: "{'oCiudad': '" + oCiudad + "'," +
                               "'vcCodCiu': '" + vcCodCiu.replace(/'/g, "&#39") + "'}",

            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "0") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Ciudad guardada</h1><br/><h2>" + Ciudad.P_vcCodCiu + "</h2>", document, CerroMensaje);
                }
                else {
                    alerta("El Código de la Ciudad ya ha sido registrado anteriormente en " + $("#txtPais").val() + ", no se pudo grabar el registro");
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


function validarEspaciosEnBlancoAlInicio() {
    var valor = $("#txtNombre").val();
    $("#txtNombre").val($.trim(valor));
}