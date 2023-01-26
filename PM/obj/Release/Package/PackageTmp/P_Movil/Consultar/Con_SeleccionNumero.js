var Numeros;
var NumerosEmpresa;
var CantidadNumeros = 0;
var CantidadNumerosEmpresa = 0;

$(function () {
    //alert('x');
    var Vis = false;
    $(".btnNormal").button({});
    //$("#txtNumero").keypress(ValidarDecimalPositivo);

    inicio();

    function inicio() {
        Numeros = [];
        NumerosEmpresa = [];
    }

    function numeroEmpresa(p_vcCod, vcNom) {
        this.p_vcCod = p_vcCod;
        this.vcNom = vcNom;
    }
    function numero(p_vcCod, vcNom, inTip) {
        this.p_vcCod = p_vcCod;
        this.vcNom = vcNom;
        this.inTip = inTip;
    }

    $("#ddlPais").change(function () {
        var codPais = $(this).val();

        $("#ddlCiudad").html("");

        //385 extendido 420
        //325 reducido 360

        if (codPais == "-1") {
            $("#imgAgregarPais").hide();
            //$("#dvCiudad").hide();
            if (Vis) {
                $("#dvCiudad").fadeOut('slow', function () {
                    window.parent.Modal.dialog("option", "height", 360);
                    window.parent.ifNumeroLlamado.css("height", 325);
                }); //$("#dvAvanzada").hide('blind', {}, 'slow');
                Vis = !Vis;
            }
        }
        else {
            $("#imgAgregarPais").show();

            if (!Vis) {
                window.parent.Modal.dialog("option", "height", 420);
                window.parent.ifNumeroLlamado.css("height", 385);
                $("#dvCiudad").fadeIn('slow'); //$("#dvAvanzada").hide('blind', {}, 'slow');
                Vis = !Vis;
            }

            $.ajax({
                type: "POST",
                url: "Con_SeleccionNumero.aspx/ListarCiudadPorPais",
                data: "{'vcCodPai': '" + codPais + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if ($(result.d).length > 0) {
                        $("#ddlCiudad").removeAttr("disabled");
                        $("#ddlCiudad").removeAttr("title");
                        $("#ddlCiudad").append($("<option></option>").attr("value", "-1").text("<Seleccionar>"));
                        $.each(result.d, function () {
                            $("#ddlCiudad").append($("<option></option>").attr("value", this.P_vcCodCiu).text(this.vcNomCiu));
                        });
                    }
                    else {
                        $("#ddlCiudad").attr("disabled", "disabled");
                        $("#ddlCiudad").attr("title", "Este pais no tiene ciudades agregadas");
                        $("#ddlCiudad").append($("<option></option>").attr("value", "-1").text("Sin datos"));
                    }

                    $("#dvCiudad").show();
                    $("#imgAgregarCiudad").hide();
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    });
    $("#txtNumero").keyup(function (key) {
        if ($(this).val() == "") {
            $("#imgAgregarNumero").hide();
        }
        else {
            $("#imgAgregarNumero").show();
        }
    });
    $("#ddlCiudad").change(function () {
        if ($(this).val() == "-1") {
            $("#imgAgregarCiudad").hide();
        }
        else {
            $("#imgAgregarCiudad").show();
        }
    });
    $("#ddlEmpresa").change(function () {
        if ($(this).val() == "-1") {
            $("#imgAgregarEmpresa").hide();
        }
        else {
            $("#imgAgregarEmpresa").show();
        }
    });

    $("#imgAgregarNumero").click(function () {
        var vcCod = $("#txtNumero").val();
        var vcNom = $("#txtNumero").val();
        var Existe = false;

        $.each(Numeros, function () {
            if (this.inTip == 1 && this.p_vcCod == vcCod) {
                Existe = true;
                return false;
            }
        });
        if (!Existe) {
            var num = new numero(vcCod, vcNom, 1);

            Numeros[CantidadNumeros++] = num;
            $("#txtNumero").val("");
            $("#imgAgregarNumero").hide();
            $("#lstNumerosSeleccionados").append($("<option></option>").attr("value", vcCod).text(vcNom));
        }
        else {
            alerta("El número '" + vcNom + "' ya ha sido agregado.");
            $("#txtNumero").focus();
        }
    });
    $("#imgAgregarPais").click(function () {
        var vcCod = $("#ddlPais").val();
        var vcNom = $("#ddlPais option:selected").text();
        var Existe = false;

        $.each(Numeros, function () {
            if (this.inTip == 2 && this.p_vcCod == vcCod) {
                Existe = true;
                return false;
            }
        });
        if (!Existe) {
            var num = new numero(vcCod, vcNom, 2);

            Numeros[CantidadNumeros++] = num;
            $("#ddlPais").val("-1");
            $("#ddlCiudad").html("");
            $("#dvCiudad").hide();
            $("#imgAgregarPais").hide();
            $("#lstNumerosSeleccionados").append($("<option></option>").attr("value", vcCod).text(vcNom));
        }
        else {
            alerta("El pais '" + vcNom + "' ya ha sido agregado.");
            $("#ddlPais").focus();
        }
    });
    $("#imgAgregarCiudad").click(function () {
        var vcCod = $("#ddlCiudad").val();
        var vcNom = $("#ddlCiudad option:selected").text();
        var Existe = false;

        $.each(Numeros, function () {
            if (this.inTip == 3 && this.p_vcCod == vcCod) {
                Existe = true;
                return false;
            }
        });
        if (!Existe) {
            var num = new numero(vcCod, vcNom, 3);

            Numeros[CantidadNumeros++] = num;
            $("#ddlCiudad").val("-1");
            $("#imgAgregarCiudad").hide();
            $("#lstNumerosSeleccionados").append($("<option></option>").attr("value", vcCod).text(vcNom));
        }
        else {
            alerta("La ciudad '" + vcNom + "' ya ha sido agregada.");
            $("#ddlCiudad").focus();
        }
    });
    $("#imgAgregarEmpresa").click(function () {
        var vcCodEmp = $("#ddlEmpresa").val();

        $.ajax({
            type: "POST",
            url: "Con_SeleccionNumero.aspx/ListarNumeroPorEmpresa",
            data: "{'vcCodEmp': '" + vcCodEmp + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if ($(result.d).length > 0) {
                    var Existe;
                    $.each(result.d, function () {
                        var vcCod = this.P_dcNum;
                        var vcNom = this.P_dcNum;
                        Existe = false;

                        $.each(NumerosEmpresa, function () {
                            if (this.p_vcCod == vcCod) {
                                Existe = true;
                                return false;
                            }
                        });

                        if (!Existe) {
                            var num = new numeroEmpresa(vcCod, vcNom);

                            NumerosEmpresa[CantidadNumerosEmpresa++] = num;
                            $("#lstNumerosSeleccionados").append($("<option></option>").attr("value", vcCod).text(vcNom));
                        }
                    });

                    Existe = false;

                    $.each(Numeros, function () {
                        if (this.inTip == 4 && this.p_vcCod == vcCodEmp) {
                            Existe = true;
                            return false;
                        }
                    });

                    if (!Existe) {
                        var num = new numero(vcCod, vcNom, 4);
                        Numeros[CantidadNumeros++] = num;
                    }
                }
                else {
                    alerta("No existen numeros relacionados a esta empresa.");
                }
                $("#ddlEmpresa").val("-1");
                $("#imgAgregarEmpresa").hide();
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    $("#btnAceptar").click(function () {
        window.parent.IngresarNumero(Numeros, NumerosEmpresa);
        window.parent.Modal.dialog('close');
        $("#lstNumerosSeleccionados").html("");
    });

    $("#btnCancelar").click(function () {
        window.parent.Modal.dialog('close');
    });

    window.parent.Modal.bind("dialogbeforeclose", function (event, ui) {
        $("#dvCiudad").hide();
        window.parent.Modal.dialog("option", "height", 360);
        window.parent.ifNumeroLlamado.css("height", 325);
        $("select#ddlCiudad").prop('selectedIndex', 0);
        $("select#ddlPais").prop('selectedIndex', 0);
        $("select#ddlEmpresa").prop('selectedIndex', 0);
        //$("#lstNumerosSeleccionados").html("");
        $("#txtNumero").val("");
        $("#imgAgregarPais").hide();
        $("#imgAgregarCiudad").hide();
        $("#imgAgregarEmpresa").hide();
        Vis = false;
    });
});



function QuitarNumeroLlamado(Item) {
    var indice = 0;
    for (i in Numeros) {
        if (Numeros[i].p_vcCod == Item) {
            indice = i;
            break;
        }
    }
    if (indice > -1) {
        Numeros.splice(indice, 1);
    }
}