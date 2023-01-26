//jherrera 20130424 Nuevo script
//-----------------------------------------------
function parametro(IdParametro, Clave, Valor) {
    this.IdParametro = IdParametro;
    this.Clave = Clave;
    this.Valor = Valor;
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

function isIE() { //Vefiricar Version del Internet Explorer
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

var indiceTab;
function CerroMensaje() {
    BloquearPagina(false);
    if ($("#hdfCostoReposicion").val() == "") {//Nuevo
        $("#txtFormula").val("");
        $(".VARCHAR").val("");
        $("#txtFormula").focus("");
    }
    else {//Edicion
        document.getElementById("txtFormula").value = document.getElementById("hdfFormulaInicial").value;
    }
}

var esAdd = false;
$(function () {
    var idCliente = window.parent.parent.parent.idCliente;

    $(".btnNormal").button();
    $("#txtFormula").keypress(ValidarCadena);

    $(".VARCHAR").keypress(ValidarCadena);

    if (isIE() == 6) {
        $("#btnCerrar").css('width', '100px');
        $("#btnGuardar").css('width', '100px');
        $("#btnCerrar").css('display', 'inline-block');
        $("#btnGuardar").css('display', 'inline-block');
    }

    $(window).resize(function () {
        DimPosElementos();
    });

    CalcularFormula();

    function CalcularFormula() {
        var ValorFormula = $("#txtFormula").val().toLowerCase().replace(/a/g, "&#65").replace(/b/g, "&#66").replace(/c/g, "&#67").replace(/d/g, "&#68").replace(/e/g, "&#69");

        if ($("#ddlParametro1").val() != "-1") {
            ValorFormula = ValorFormula.replace(/&#65/g, $("#ddlParametro1 option:selected").text().substring(0, $("#ddlParametro1 option:selected").text().indexOf("(") - 1));
        }
        else {
            ValorFormula = ValorFormula.replace(/&#65/g, "A");
        }
        if ($("#ddlParametro2").val() != "-1") {
            ValorFormula = ValorFormula.replace(/&#66/g, $("#ddlParametro2 option:selected").text().substring(0, $("#ddlParametro2 option:selected").text().indexOf("(") - 1));
        }
        else {
            ValorFormula = ValorFormula.replace(/&#66/g, "B");
        }
        if ($("#ddlParametro3").val() != "-1") {
            ValorFormula = ValorFormula.replace(/&#67/g, $("#ddlParametro3 option:selected").text().substring(0, $("#ddlParametro3 option:selected").text().indexOf("(") - 1));
        }
        else {
            ValorFormula = ValorFormula.replace(/&#67/g, "C");
        }
        if ($("#ddlParametro4").val() != "-1") {
            ValorFormula = ValorFormula.replace(/&#68/g, $("#ddlParametro4 option:selected").text().substring(0, $("#ddlParametro4 option:selected").text().indexOf("(") - 1));
        }
        else {
            ValorFormula = ValorFormula.replace(/&#68/g, "D");
        }

        if ($("#ddlParametro5").val() != "-1") {
            ValorFormula = ValorFormula.replace(/&#69/g, $("#ddlParametro5 option:selected").text().substring(0, $("#ddlParametro5 option:selected").text().indexOf("(") - 1));
        }
        else {
            ValorFormula = ValorFormula.replace(/&#69/g, "E");
        }
        $("#lblValorFormula").html(ValorFormula);
    }

    $("#txtFormula").change(function () {
        CalcularFormula();
    });

    $("#ddlParametro1, #ddlParametro2, #ddlParametro3, #ddlParametro4, #ddlParametro5").change(function () {
        CalcularFormula();
    });

    //    IniciarPagina();

    //    function IniciarPagina() {
    //        DimPosElementos();
    //        $(".tdEtiqueta").css("width", "130px");
    //    }

    //Operadores
    $("#ddlOperador").change(function () {
        $.ajax({
            type: "POST",
            url: "Conf_CostoReposicion.aspx/CargarParametros_Operador",
            data: "{'vcCodOpe': '" + this.value + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d.length == 0) {
                    $("#txtFormula").val('');
                    $("#lblValorFormula").html('');
                    $("#ddlParametro1").val("-1");
                    $("#ddlParametro2").val("-1");
                    $("#ddlParametro3").val("-1");
                    $("#ddlParametro4").val("-1");
                    $("#ddlParametro5").val("-1");
                    esAdd = true;
                } else {
                    var i = 0;
                    for (i = 0; i < result.d.length; i++) {
                        if (i == 0) {
                            $("#txtFormula").val(result.d[i].Valor.toString());
                        } else {
                            eval('$("#ddlParametro' + i + '").val("' + result.d[i].Valor.toString() + '");');
                        }
                    }
                    CalcularFormula();
                    esAdd = false;
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });

    inicioPagina();
    function inicioPagina() {
        DimPosElementos();
    }

    $(window).resize(function () {
        DimPosElementos();
    });

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        var AnchoLateral = $(".LateralSplitter");
        $(".tabs").css({ height: Alto - 15, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });
        var Alto = $(window).height();
        $(".tdEtiqueta").css("width", "130px");
        $(".Splitter").css({ height: Alto - 18 });
        $("#tbCostoReposicion").setGridWidth($(window).width() - 250);
        $("#tbCostoReposicion").setGridHeight($(window).height() - 515);
    }

    $("#btnGuardar").live("click", function () {

        var Valor = $("#txtFormula").val();
        var vcCodOpe = $("#ddlOperador").val(); //

        var objParametro = new parametro();

        objParametro.IdParametro = $("#hdfParametro").val();
        objParametro.Clave = "";
        objParametro.Valor = $("#txtFormula").val().replace(/'/g, "&#39");

        var strParametroA = $("#ddlParametro1").val().replace(/'/g, "&#39");
        var strParametroB = $("#ddlParametro2").val().replace(/'/g, "&#39");
        var strParametroC = $("#ddlParametro3").val().replace(/'/g, "&#39");
        var strParametroD = $("#ddlParametro4").val().replace(/'/g, "&#39");
        var strParametroE = $("#ddlParametro5").val().replace(/'/g, "&#39");

        //        if (objParametro.Valor == "") {
        //            alerta("La fórmula es un campo obligatorio");
        //            $("#txtFormula").focus();
        //            return;
        //        }

        if ($("#txtFormula").val().indexOf("A") != -1 && strParametroA == "-1") {
            alerta("Debe elegir el valor del Parámetro A");
            $("#ddlParametro1").focus();
            return;
        }

        if ($("#txtFormula").val().indexOf("B") != -1 && strParametroB == "-1") {
            alerta("Debe elegir el valor del Parámetro B");
            $("#ddlParametro2").focus();
            return;
        }

        if ($("#txtFormula").val().indexOf("C") != -1 && strParametroC == "-1") {
            alerta("Debe elegir el valor del Parámetro C");
            $("#ddlParametro3").focus();
            return;
        }

        if ($("#txtFormula").val().indexOf("D") != -1 && strParametroD == "-1") {
            alerta("Debe elegir el valor del Parámetro D");
            $("#ddlParametro4").focus();
            return;
        }

        if ($("#txtFormula").val().indexOf("E") != -1 && strParametroE == "-1") {
            alerta("Debe elegir el valor del Parámetro E");
            $("#ddlParametro5").focus();
            return;
        }

        var intPar1 = 0; var intPar2 = 0;
        var i = 0;
        for (i = 0; i < objParametro.Valor.length; i++) {

            var caracter = objParametro.Valor.substr(i, 1).toUpperCase();
            var siguienteCaracter = "";
            if (i != objParametro.Valor.length - 1) {
                siguienteCaracter = objParametro.Valor.substr(i + 1, 1).toUpperCase();
            }

            //Valida caracteres invalidos
            if (caracter != "A" && caracter != "B" && caracter != "C" && caracter != "D" && caracter != "E" && caracter != "+" && caracter != "-" && caracter != "*" && caracter != "/"
                && caracter != "(" && caracter != ")" && caracter != "0" && caracter != "1" && caracter != "2" && caracter != "3" && caracter != "4"
                && caracter != "5" && caracter != "6" && caracter != "7" && caracter != "8" && caracter != "9") {
                alerta("La fórmula contiene valores no permitidos");
                $("#txtFormula").focus();
                return;
            }

            if (siguienteCaracter != "") {

                //Valida que despues de todo número o parámetro exista algun operador o )
                if (caracter == "0" || caracter == "1" || caracter == "2" || caracter == "3" || caracter == "4" || caracter == "5" || caracter == "6"
                    || caracter == "7" || caracter == "8" || caracter == "9" || caracter == "A" || caracter == "B" || caracter == "C") {
                    if (siguienteCaracter == "A" || siguienteCaracter == "B" || siguienteCaracter == "C" || siguienteCaracter == "D" || siguienteCaracter == "E" || siguienteCaracter == "(") {
                        alerta("Después de cualquier número o parámetro debe haber siempre un operador o )");
                        $("#txtFormula").focus();
                        return;
                    }
                }

                //Valida que despues de cualquier operador haya siempre un número, parametro o (
                if (caracter == "+" || caracter == "-" || caracter == "*" || caracter == "/") {
                    if (siguienteCaracter != "A" && siguienteCaracter != "B" && siguienteCaracter != "C" && siguienteCaracter != "D" && siguienteCaracter != "E" && siguienteCaracter != "("
                        && siguienteCaracter != "0" && siguienteCaracter != "1" && siguienteCaracter != "2" && siguienteCaracter != "3"
                        && siguienteCaracter != "4" && siguienteCaracter != "5" && siguienteCaracter != "6" && siguienteCaracter != "7"
                        && siguienteCaracter != "8" && siguienteCaracter != "9") {
                        alerta("Después de cualquier operador debe haber siempre un número, parámetro o (");
                        $("#txtFormula").focus();
                        return;
                    }
                }

                //Valida que despues de ( haya siempre un parametro o número
                if (caracter == "(") {
                    if (siguienteCaracter != "A" && siguienteCaracter != "B" && siguienteCaracter != "C" && siguienteCaracter != "D" && siguienteCaracter != "E" && siguienteCaracter != "("
                        && siguienteCaracter != "0" && siguienteCaracter != "1" && siguienteCaracter != "2" && siguienteCaracter != "3"
                        && siguienteCaracter != "4" && siguienteCaracter != "5" && siguienteCaracter != "6" && siguienteCaracter != "7"
                        && siguienteCaracter != "8" && siguienteCaracter != "9") {
                        alerta("Después del separador (, siempre debe haber un número, parámetro u otro (");
                        $("#txtFormula").focus();
                        return;
                    }
                }

                //Valida que despues de ) haya siempre un operador u otro )
                if (caracter == ")") {
                    if (siguienteCaracter != "+" && siguienteCaracter != "-" && siguienteCaracter != "*" && siguienteCaracter != "/" && siguienteCaracter != ")") {
                        alerta("Después del separador ), siempre debe haber un operador u otro )");
                        $("#txtFormula").focus();
                        return;
                    }
                }
            }
            else {

                //Valida que después de cualquier operador o "(" haya siempre un número o parametro
                if (caracter == "+" || caracter == "-" || caracter == "*" || caracter == "/" || caracter == "(") {
                    alerta("Después de cualquier operador debe haber por lo menos un número o parámetro");
                    $("#txtFormula").focus();
                    return;
                }
            }

            //Valida que no haya un ")" antes de "("
            if (caracter == "(") {
                intPar1++;
            }
            if (caracter == ")") {
                intPar2++;
            }
            if (intPar2 > intPar1) {
                alerta("Existe un ) antes de (");
                $("#txtFormula").focus();
                return;
            }

            //Valida que no haya mas ( al final de la formula
            if (intPar1 > intPar2 && i == objParametro.Valor.length - 1) {
                alerta("No todos los parentesis estan siendo cerrados");
                $("#txtFormula").focus();
                return;
            }
        }

        if ($("#txtFormula").val() == '') {
            alerta("Ingrese una fórmula.");
            $("#txtFormula").focus();
            return;
        }

        var oParametro = JSON.stringify(objParametro);
        BloquearPagina(true);
        $.ajax({
            type: "POST",
            url: "Conf_CostoReposicion.aspx/GuardarParametros_Operador",
            data: "{'valorFunc': '" + objParametro.Valor + "'," +
                  "'vcCodOpe': '" + vcCodOpe + "'," +
                  "'esAdd': '" + esAdd + "'," +
                  "'valorA': '" + strParametroA + "'," +
                  "'valorB': '" + strParametroB + "'," +
                  "'valorC': '" + strParametroC + "'," +
                  "'valorD': '" + strParametroD + "'," +
                  "'valorE': '" + strParametroE + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != 0) {
                    Mensaje("<br/><h1>Fórmula de Costo de Reposición guardado</h1><br/><h2>" + objParametro.Valor + "</h2>", document, CerroMensaje);
                    document.getElementById("hdfFormulaInicial").value = objParametro.Valor;
                }
                else {
                    alerta("No se Pudo Grabar el Registro");
                    BloquearPagina(false);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }

        });
    });

    $("#btnCerrar").live("click", function () {
        var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        var Accord = window.parent.$("#" + tab1);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    });
});