
//combo multiple
var arMeses = [{ valor: 1, mes: 'Enero' }, { valor: 2, mes: 'Febrero' }, { valor: 3, mes: 'Marzo' }, { valor: 4, mes: 'Abril' }, { valor: 5, mes: 'Mayo' }, { valor: 6, mes: 'Junio' }, { valor: 7, mes: 'Julio' }, { valor: 8, mes: 'Agosto' }, { valor: 9, mes: 'Septiembre' }, { valor: 10, mes: 'Octubre' }, { valor: 11, mes: 'Noviembre' }, { valor: 12, mes: 'Diciembre'}];
var arMesesShort = [{ valor: 1, mes: 'Ene' }, { valor: 2, mes: 'Feb' }, { valor: 3, mes: 'Mar' }, { valor: 4, mes: 'Abr' }, { valor: 5, mes: 'May' }, { valor: 6, mes: 'Jun' }, { valor: 7, mes: 'Jul' }, { valor: 8, mes: 'Ago' }, { valor: 9, mes: 'Sep' }, { valor: 10, mes: 'Oct' }, { valor: 11, mes: 'Nov' }, { valor: 12, mes: 'Dic'}];
var arValTipos = [];
var arNombreTipos = [];
//---
//cuotas dobles
var arMesesCuotasDobles = [];
var arNomMesesCuotasDobles = [];
//---

var oFinanciamientoTipo;

function inicioPagina() {
    DimPosElementos();
}

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    var AnchoLateral = $(".LateralSplitter");
    //$(".tabs").css({ height: Alto - 15, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });
    $(".Splitter").css({ height: Alto - 18 });
    //contenedor principal
    $("#dvCampos").css("height", Alto - 77);
}

$(function () {
    $("#txtDescripcion").attr('maxlength', '1000');
    var indiceTab = '';
    if ($("#hdfTipoFinancSituacion").val() != "0") {
        indiceTab = window.parent.tab.tabs("option", "selected");
    }
    oFinanciamientoTipo = new MOV_CAM_FinanciamientoTipo();

    ko.validation.rules.pattern.message = 'Invalid.';
    ko.validation.configure({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: true,
        parseInputAttributes: true,
        messageTemplate: null
    });
    ko.applyBindings(oFinanciamientoTipo);

    oFinanciamientoTipo.errors = ko.validation.group(oFinanciamientoTipo);
    $("#txtCodigo").keypress(ValidarCodigoVarChar);
    $("#txtCodigo").keyup(ValidarCodigoVarChar_BlurKeyup);
    $("#txtCodigo").blur(ValidarCodigoVarChar_BlurKeyup);
    $("#txtDescripcionCorta,#txtDescripcion").keypress(ValidarAlfaNumericoConEspacios);
    $("#txtDescripcionCorta,#txtDescripcion").keyup(ValidarAlfaNumericoConEspacios_BlurKeyup);
    $("#txtDescripcionCorta,#txtDescripcion").keyup(ValidarAlfaNumericoConEspacios_BlurKeyup);
    //            $("#txtCodigo,#txtDescripcionCorta,#txtDescripcion").keypress(ValidarCadena);
    $("#txtCuotaQuincena,#txtPagoContadoMinimo,#txtPagoContadoMaximo,#txtPagonContado,#txtMinimoMesesPeriodoGracia,#txtMaximoMesesPeriodoGracia,#txtMesesPeriodoGracia").keypress(ValidarEntero);
    $("#txtTasaInteres,#txtMinimoCuotaPrimeraQuincena,#txtMaximoCuotaPrimeraQuincena,#txtCuotaPrimeraQuincena").keypress(ValidarDecimal);

    //////////////////////combobox multiple
    $("#ddlMesesPagoCuotas").removeClass("ui-widget-content ui-corner-all");
    $("#ddlMesesPagoCuotas").css("padding", "0px");
    $("#ddlMesesPagoCuotas").css("margin", "0px");
    $("#ddlMesesPagoCuotas").kendoComboBox({
        placeholder: "<--Seleccione-->",
        dataTextField: "mes",
        dataValueField: "valor",
        template: '<input class="chkVista" type="checkbox" id="chkMesCuota-${ data.valor }">${ data.mes }</input>',
        dataSource: arMeses,
        select: function (e) {
            e.sender._blur = function () { };
            var txt = e.item.text();
            arValTipos = [];
            arNombreTipos = [];
            var i = 0;
            for (i = 0; i < arMeses.length; i++) {
                if ($("#chkMesCuota-" + arMeses[i].valor).is(':checked')) {
                    arValTipos.push(arMesesShort[i].valor);
                    arNombreTipos.push(arMesesShort[i].mes);
                } else {
                    arValTipos = jQuery.grep(arValTipos, function (value) {
                        return value != arMesesShort[i].valor;
                    });
                    arNombreTipos = jQuery.grep(arNombreTipos, function (value) {
                        return value != arMesesShort[i].mes;
                    });
                }
            }
            e.sender._text = function () { return arNombreTipos.join(","); };
        },
        close: function (e) {
            //alert(arValTipos.join(','));
        }
    });
    /////////////////////fin combo multiple


    //COMO MULTIPLES CUOTAS DOBLES
    $("#ddlMesesCuotasDobles").removeClass("ui-widget-content ui-corner-all");
    $("#ddlMesesCuotasDobles").css("padding", "0px");
    $("#ddlMesesCuotasDobles").css("margin", "0px");
    $("#ddlMesesCuotasDobles").kendoComboBox({
        ignoreCase: false,
        placeholder: "<--Seleccione-->",
        dataTextField: "mes",
        dataValueField: "valor",
        template: '<input class="chkVista" type="checkbox" id="chkMesDobles-${ data.valor }">${ data.mes }</input>',
        dataSource: arMeses,
        select: function (e) {
            e.sender._blur = function () { };
            var txt = e.item.text();
            arMesesCuotasDobles = [];
            arNomMesesCuotasDobles = [];
            var i = 0;
            for (i = 0; i < arMeses.length; i++) {
                if ($("#chkMesDobles-" + arMeses[i].valor).is(':checked')) {
                    arMesesCuotasDobles.push(arMesesShort[i].valor);
                    arNomMesesCuotasDobles.push(arMesesShort[i].mes);
                } else {
                    arMesesCuotasDobles = jQuery.grep(arMesesCuotasDobles, function (value) {
                        return value != arMesesShort[i].valor;
                    });
                    arNomMesesCuotasDobles = jQuery.grep(arNomMesesCuotasDobles, function (value) {
                        return value != arMesesShort[i].mes;
                    });
                }
            }
            e.sender._text = function () { return arNomMesesCuotasDobles.join(","); };
        },
        close: function (e) {
            //alert(arValTipos.join(','));
        }
    });
    //FIN COMBO CUOTAS DOBLES

    $("#ddlMesesCuotasDobles").data("kendoComboBox").input.attr("ReadOnly", true);
    $("#ddlMesesPagoCuotas").data("kendoComboBox").input.attr("ReadOnly", true);

    //ActivarCombokendo('#ddlMesePagoContado', 200);
    //ActivarCombokendo('#ddlMes', 200);

    $("input:checkbox,input:radio,input:file").uniform();
    $(".tdEtiqueta").css("width", "100px");

    var tabContenido = $("#tabContenido").tabs({});
    $("#tabContenido").css({ "height": "150px" });

    inicioPagina();

    $(window).resize(function () {
        DimPosElementos();
    });

    //alert($("#hdfTipoFinancSituacion").val());
    //--------------Inicializa los datos en controles (nuevo o actualizacion)---------------
    oFinanciamientoTipo.Inicio($("#hdfIdTipoFinanciamiento").val(), $("#hdfTipoFinancSituacion").val());
    $.uniform.update();
    //--------------------------------------------------------------------------------------

    //-------------------------------Eventos de Controles-----------------------------------
    $("#chkPagoContado").change(function () {
        if ($(this).is(":checked")) {
            document.getElementById('trCuotasDobles').style.display = 'none';
            $('#chkCuotasDobles').attr("checked", false);
            $('#chkCuotasDobles').change();
            document.getElementById('trCuotaQuincena').style.display = 'none';
            $('#chkCuotaQuincena').attr("checked", false);
            $('#chkCuotaQuincena').change();
            document.getElementById('trIntereses').style.display = 'none';
            $('#chkInteres').attr("checked", false);
            $('#chkInteres').change();

            document.getElementById('trPagoContadoDefinicion').style.display = 'none';
            document.getElementById('trPagoContadoDefinicionRango').style.display = 'none';
            document.getElementById('trPagoContadoDefinicionPredefinido').style.display = 'none';
            document.getElementById('trPagoContadoDefinicionMeses1').style.display = 'none';
            document.getElementById('trPagoContadoDefinicionMeses2').style.display = 'none';
            $("input[name='rblstPagoContado']:checked").attr("checked", false);
            $.uniform.update();
        } else {
            document.getElementById('trCuotasDobles').style.display = '';
            document.getElementById('trCuotaQuincena').style.display = '';
            //                    document.getElementById('trIntereses').style.display = '';

            document.getElementById('trPagoContadoDefinicion').style.display = '';
        }
    });

    $("input[name='rblstPagoContado']").change(function () {
        $("#txtPagoContadoMinimo").val('');
        $("#txtPagoContadoMaximo").val('');
        $("#txtPagonContado").val('');
        $("#lstMesesPagoContado").empty();
        if (this.value == "1") {
            document.getElementById('trPagoContadoDefinicionRango').style.display = '';
            document.getElementById('trPagoContadoDefinicionPredefinido').style.display = 'none';
            document.getElementById('trPagoContadoDefinicionMeses1').style.display = 'none';
            document.getElementById('trPagoContadoDefinicionMeses2').style.display = 'none';
            $('#chkPeriodoGracia').attr("disabled", false);
        } else if (this.value == "2") {
            document.getElementById('trPagoContadoDefinicionRango').style.display = 'none';
            document.getElementById('trPagoContadoDefinicionPredefinido').style.display = '';
            document.getElementById('trPagoContadoDefinicionMeses1').style.display = 'none';
            document.getElementById('trPagoContadoDefinicionMeses2').style.display = 'none';
            $('#chkPeriodoGracia').attr("disabled", false);
        } else if (this.value == "3") {
            document.getElementById('trPagoContadoDefinicionRango').style.display = 'none';
            document.getElementById('trPagoContadoDefinicionPredefinido').style.display = 'none';
            document.getElementById('trPagoContadoDefinicionMeses1').style.display = '';
            document.getElementById('trPagoContadoDefinicionMeses2').style.display = '';

            //$("input[name='chkPeriodoGracia']:checked").attr("checked", false);
            //$("#chkPeriodoGracia").attr("checked", false);
            $("#chkPeriodoGracia").attr("checked", false);
            oFinanciamientoTipo.PeriodoGracia = false;
            $.uniform.update();
            $('#chkPeriodoGracia').attr("disabled", true);
            document.getElementById('trPeriodoGraciaNota').style.display = 'none';
            document.getElementById('trPeriodoGraciaDefinicion').style.display = 'none';
            document.getElementById('trMaximoMesesPeriodoGracia').style.display = 'none';
            document.getElementById('trMesesPeriodoGracia').style.display = 'none';
            $("input[name='rblstTipoPeriodoGracia']:checked").attr("checked", false);

        } else {
            document.getElementById('trPagoContadoDefinicionRango').style.display = 'none';
            document.getElementById('trPagoContadoDefinicionPredefinido').style.display = 'none';
            document.getElementById('trPagoContadoDefinicionMeses1').style.display = 'none';
            document.getElementById('trPagoContadoDefinicionMeses2').style.display = 'none';
            $('#chkPeriodoGracia').attr("disabled", false);
        }
        $.uniform.update();
    });

    $("#imgAgregarMesPagoContado").click(function () {
        if ($("#ddlMesePagoContado").val() != "-1") {
            var vcMes = $("#ddlMesePagoContado option:selected").text();
            var vcValor = $("#ddlMesePagoContado").val();
            var blnExiste = 0;
            var i = 0;

            for (i = 0; i < $("#lstMesesPagoContado")[0].options.length; i++) {
                if ($.trim($("#lstMesesPagoContado")[0].options[i].value) == vcValor) {
                    blnExiste = 1;
                }
            }

            if (blnExiste == 0) {
                $("#lstMesesPagoContado").append($("<option></option>").attr("value", vcValor).text(vcMes));
                $("#ddlMesePagoContado").val("-1");
                $("#ddlMesePagoContado").focus();
            } else {
                alerta("Ya existe el mes seleccionado.");
            }
        } else {
            alerta("Debe seleccionar un mes.");
        }
    });
    $("#imgQuitarMesPagoContado").click(function () {
        var len = $("#lstMesesPagoContado option:selected").length;
        if (len != 0) {
            var vcValor = $("#lstMesesPagoContado option:selected")[0].value;
            if (vcValor != null) {
                var i = 0;
                for (i = 0; i < $("#lstMesesPagoContado")[0].options.length; i++) {
                    if ($.trim($("#lstMesesPagoContado")[0].options[i].value) == vcValor) {
                        $("#lstMesesPagoContado")[0].options.remove(i);
                    }
                }
            }
        } else {
            alerta("Seleccione un mes a quitar");
        }
    });

    $("#chkPeriodoGracia").change(function () {
        if ($(this).is(":checked")) {
            document.getElementById('trPeriodoGraciaNota').style.display = '';
            document.getElementById('trPeriodoGraciaDefinicion').style.display = '';
        } else {
            document.getElementById('trPeriodoGraciaNota').style.display = 'none';
            document.getElementById('trPeriodoGraciaDefinicion').style.display = 'none';
            document.getElementById('trMaximoMesesPeriodoGracia').style.display = 'none';
            document.getElementById('trMesesPeriodoGracia').style.display = 'none';
            $("input[name='rblstTipoPeriodoGracia']:checked").attr("checked", false);
            $.uniform.update();
        }
    });

    $("input[name='rblstTipoPeriodoGracia']").click(function () {
        $("#txtMinimoMesesPeriodoGracia").val('');
        $("#txtMaximoMesesPeriodoGracia").val('');
        $("#txtMesesPeriodoGracia").val('');
        if (this.value == "1") {
            document.getElementById('trMaximoMesesPeriodoGracia').style.display = '';
            document.getElementById('trMesesPeriodoGracia').style.display = 'none';
        } else {
            document.getElementById('trMaximoMesesPeriodoGracia').style.display = 'none';
            document.getElementById('trMesesPeriodoGracia').style.display = '';
        }
    });

    $("#chkCuotaQuincena").change(function () {
        if ($(this).is(":checked")) {
            document.getElementById('trCuotaQuincenaDefinicion').style.display = '';
        } else {
            document.getElementById('trCuotaQuincenaDefinicion').style.display = 'none';
            document.getElementById('trPorcentajeMaximoCuotaPrimeraQuincena').style.display = 'none';
            document.getElementById('trPorcentajeCuotaPrimeraQuincena').style.display = 'none';
            $("input[name='rblstTipoCuotaQuincena']:checked").attr("checked", false);
            $.uniform.update();
        }
    });

    $("input[name='rblstTipoCuotaQuincena']").click(function () {
        $("#txtMinimoCuotaPrimeraQuincena").val('');
        $("#txtMaximoCuotaPrimeraQuincena").val('');
        $("#txtCuotaPrimeraQuincena").val('');
        if (this.value == "1") {
            document.getElementById('trPorcentajeMaximoCuotaPrimeraQuincena').style.display = '';
            document.getElementById('trPorcentajeCuotaPrimeraQuincena').style.display = 'none';
        } else {
            document.getElementById('trPorcentajeMaximoCuotaPrimeraQuincena').style.display = 'none';
            document.getElementById('trPorcentajeCuotaPrimeraQuincena').style.display = '';
        }
    });

    $('#chkCuotasDobles').change(function () {
        if ($(this).is(":checked")) {
            document.getElementById('trMesesCuotasDobles').style.display = '';
            document.getElementById('trMes').style.display = '';
        } else {
            document.getElementById('trMesesCuotasDobles').style.display = 'none';
            document.getElementById('trMes').style.display = 'none';
            $("#txtMes").val("");
            $("#lstbMesesCuotasDobles").empty();
        }

    });
    $('#chkInteres').change(function () {
        if ($(this).is(":checked")) {
            document.getElementById('trTipoInteres').style.display = '';
            document.getElementById('trTasaInteres').style.display = '';
            oFinanciamientoTipo.TipoInteres("C");
        } else {
            document.getElementById('trTipoInteres').style.display = 'none';
            document.getElementById('trTasaInteres').style.display = 'none';
            oFinanciamientoTipo.TipoInteres("");
            $("#txtTasaInteres").val("");
        }

    });

    $("#imgAgregarMes").click(function () {
        if ($("#ddlMes").val() != "-1") {
            var vcMes = $("#ddlMes option:selected").text();
            var vcValor = $("#ddlMes").val();
            var blnExiste = 0;
            var i = 0;
            for (i = 0; i < $("#lstbMesesCuotasDobles")[0].options.length; i++) {
                if ($.trim($("#lstbMesesCuotasDobles")[0].options[i].value) == vcValor) {
                    blnExiste = 1;
                }
            }

            if (blnExiste == 0) {
                $("#lstbMesesCuotasDobles").append($("<option></option>").attr("value", vcValor).text(vcMes));
                $("#ddlMes").val("-1");
                $("#ddlMes").focus();
            } else {
                alerta("Ya existe el mes seleccionado.");
            }
        } else {
            alerta("Debe seleccionar un mes.");
        }
    });
    $("#imgQuitarMes").click(function () {
        var len = $("#lstbMesesCuotasDobles option:selected").length;
        if (len != 0) {
            var vcValor = $("#lstbMesesCuotasDobles option:selected")[0].value;
            if (vcValor != null) {
                var i = 0;
                for (i = 0; i < $("#lstbMesesCuotasDobles")[0].options.length; i++) {
                    if ($.trim($("#lstbMesesCuotasDobles")[0].options[i].value) == vcValor) {
                        $("#lstbMesesCuotasDobles")[0].options.remove(i);
                    }
                }
            }
        }
        else {
            alerta("Seleccione un mes a quitar");
        }
    });
    //--------------------------------------------------------------------------------------
    //            $("#txtCodigo,#txtDescripcionCorta,#txtDescripcion").keydown(function (event) {
    //                $(this).val($(this).val().replace(/\\/g, "").replace(/'/g, ""));
    //            });
    //            $("#txtCodigo").bind('keypress', function (event) {
    //                //^[A-Za-z ][A-Za-z0-9!@#$%^&* ]*$
    //                if (event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 37 && event.keyCode != 39) {
    //                    var regex = new RegExp("^[a-zA-Z0-9!-]+$");
    //                    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    //                    if (!regex.test(key)) {
    //                        event.preventDefault();
    //                        return false;
    //                    }
    //                }
    //            });
    //            $('#txtCodigo').bind('keyup blur', function (event) {
    //                if (event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 37 && event.keyCode != 39) {
    //                    $(this).val($(this).val().replace(/[^a-zA-Z0-9!-]/g, ''));
    //                }
    //            });
    //            $("#txtDescripcionCorta,#txtDescripcion").bind('keypress', function (event) {
    //                if (event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 37 && event.keyCode != 39 && event.keyCode != 32) {
    //                    var regex = new RegExp("^[a-zA-Z0-9 !-]+$");
    //                    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    //                    if (!regex.test(key)) {
    //                        event.preventDefault();
    //                        return false;
    //                    }
    //                }
    //            });
    //            $('#txtDescripcionCorta,#txtDescripcion').bind('keyup blur', function () {
    //                if (event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 37 && event.keyCode != 39 && event.keyCode != 32) {
    //                    $(this).val($(this).val().replace(/[^a-zA-Z0-9 !-]/g, ''));
    //                }
    //            });

    //----------------------------------Guardar Entidad-------------------------------------
    $("#btnGuardar").click(function () {


        if ($("#txtCodigo").val() == '') {
            alerta("Ingrese el código del tipo de financiamiento.");
            return;
        }


        var vcErrores = "0";
        //TipoLinea -- 13-02-2014 - wapumayta
        if ($("#ddlLineaTipo").val() == -1) {
            alerta("Seleccione un Tipo de Línea");
            return;
        }

        //PagonContado
        if (!$("#chkPagoContado").is(":checked") && $("input[name='rblstPagoContado']:checked").length == 0) {
            alerta("Debe definir las cuotas de financiamiento");
            return;
        }
        if ($("input[name='rblstPagoContado']:checked").val() == 1) {
            //vcErrores = "1";
            var minPagoContado = $("#txtPagoContadoMinimo").val();
            var maxPagoContado = $("#txtPagoContadoMaximo").val();
            if (minPagoContado == "") {
                alerta("Ingrese el valor para la cuota mínimia");
                $("#txtPagoContadoMinimo").focus();
                return;
            }
            if (maxPagoContado == "") {
                alerta("Ingrese el valor para la cuota máxima");
                $("#txtPagoContadoMaximo").focus();
                return;
            }

            if (parseInt(minPagoContado) >= parseInt(maxPagoContado)) {
                alerta("El valor para la cuota mínima debe ser menor que el valor de la cuota máxima.");
                $("#txtPagoContadoMinimo").focus();
                return;
            }
            oFinanciamientoTipo.Cuotas(0);
            oFinanciamientoTipo.MesesCuotas('');
        }
        //                else if ($("input[name='rblstPagoContado']:checked").val() == 1 && $("#txtPagoContadoMinimo").val() != '' && $("#txtPagoContadoMaximo").val() != '') {
        //                    oFinanciamientoTipo.Cuotas(0);
        //                    oFinanciamientoTipo.MesesCuotas('');
        //                }
        if ($("input[name='rblstPagoContado']:checked").val() == 2 && $("#txtPagonContado").val() == '') {
            //vcErrores = "1";
            alerta("Ingrese un Número de Cuotas");
            $("#txtPagonContado").focus();
            return;
        } else if ($("input[name='rblstPagoContado']:checked").val() == 2 && $("#txtPagonContado").val() != '') {
            oFinanciamientoTipo.MinimoCuotas(0);
            oFinanciamientoTipo.MaximoCuotas(0);
            oFinanciamientoTipo.MesesCuotas('');
        }
        //comentado 10-12-2013 wapumayta
        //if ($("input[name='rblstPagoContado']:checked").val() == 3 && $("#lstMesesPagoContado")[0].options.length < 2) {
        //    //vcErrores = "1";
        //    alerta("Debe elegir por lo menos dos meses");
        //    return;
        //} else if ($("input[name='rblstPagoContado']:checked").val() == 3 && $("#lstMesesPagoContado")[0].options.length > 1) {
        //    oFinanciamientoTipo.MinimoCuotas(0);
        //    oFinanciamientoTipo.MaximoCuotas(0);
        //    oFinanciamientoTipo.Cuotas(0);
        //}
        // 10-12-2013
        if ($("input[name='rblstPagoContado']:checked").val() == 3 && arValTipos.length < 1) {
            //vcErrores = "1";
            alerta("Debe elegir por lo menos un mes");
            return;
        } else if ($("input[name='rblstPagoContado']:checked").val() == 3 && arValTipos.length >= 1) {
            oFinanciamientoTipo.MinimoCuotas(0);
            oFinanciamientoTipo.MaximoCuotas(0);
            oFinanciamientoTipo.Cuotas(0);
        }
        //if ($("input[name='rblstPagoContado']:checked").val() == 4) {
        //    oFinanciamientoTipo.MinimoCuotas(0);
        //    oFinanciamientoTipo.MaximoCuotas(0);
        //    oFinanciamientoTipo.Cuotas(0);
        //    oFinanciamientoTipo.MesesCuotas('');
        //}
        if ($("#chkPagoContado").is(":checked")) {
            oFinanciamientoTipo.MinimoCuotas(0);
            oFinanciamientoTipo.MaximoCuotas(0);
            oFinanciamientoTipo.Cuotas(0);
            oFinanciamientoTipo.MesesCuotas('');
            //Cuotas Dobles
            oFinanciamientoTipo.CuotasDobles(false);
            oFinanciamientoTipo.MesesCuotasDobles('');
            //Cuota Quincena
            oFinanciamientoTipo.CuotaQuincena(false);
            oFinanciamientoTipo.MinimoCuotaPrimeraQuincena(0);
            oFinanciamientoTipo.MaximoCuotaPrimeraQuincena(0);
            oFinanciamientoTipo.CuotaPrimeraQuincena(0);
            //Interese
            oFinanciamientoTipo.Interes(false);
            oFinanciamientoTipo.TasaInteres(-1);
        }
        //PeriodoGracia
        if ($("#chkPeriodoGracia").is(":checked") && $("input[name='rblstTipoPeriodoGracia']:checked").length == 0) {
            alerta("Debe definir Período de Gracia");
            return;
        }
        if ($("input[name='rblstTipoPeriodoGracia']:checked").val() == 1) {
            //vcErrores = "1";
            var minPeriodoGracia = $("#txtMinimoMesesPeriodoGracia").val();
            var maxPeriodoGracia = $("#txtMaximoMesesPeriodoGracia").val();
            if (minPeriodoGracia == '' && maxPeriodoGracia == '') {
                alerta("Debe ingresar valores para el Periodo de Gracias máxima y mínima");
                $("#txtMinimoMesesPeriodoGracia").focus();
                return;
            }

            if (parseFloat(minPeriodoGracia) >= parseFloat(maxPeriodoGracia)) {
                alerta("El valor del periodo de gracia Mínimo Debe ser menor al valor del periodo de gracia máximo.");
                $("#txtMinimoMesesPeriodoGracia").focus();
                return;
            }
            oFinanciamientoTipo.MesesPeriodoGracia(0);


        } else if ($("input[name='rblstTipoPeriodoGracia']:checked").val() == 1 && $("#txtMinimoMesesPeriodoGracia").val() != '' && $("#txtMaximoMesesPeriodoGracia").val() != '') {
            oFinanciamientoTipo.MesesPeriodoGracia(0);
        }
        if ($("input[name='rblstTipoPeriodoGracia']:checked").val() == 2 && $("#txtMesesPeriodoGracia").val() == '') {
            //vcErrores = "1";
            alerta("Ingrese el número de Meses de Período de Gracia");
            $("#txtMesesPeriodoGracia").focus();
            return;
        } else if ($("input[name='rblstTipoPeriodoGracia']:checked").val() == 2 && $("#txtMesesPeriodoGracia").val() != '') {
            oFinanciamientoTipo.MinimoMesesPeriodoGracia(0);
            oFinanciamientoTipo.MaximoMesesPeriodoGracia(0);
        }
        if (!$("#chkPeriodoGracia").is(":checked")) {
            oFinanciamientoTipo.MesesPeriodoGracia(0);
            oFinanciamientoTipo.MinimoMesesPeriodoGracia(0);
            oFinanciamientoTipo.MaximoMesesPeriodoGracia(0);
        }
        //CuotasDobles
        //if ($("#chkCuotasDobles").is(":checked") && $("#lstbMesesCuotasDobles")[0].options.length == 0) {
        //    //vcErrores = "1";
        //    alerta("Debe seleccionar por lo menos un mes");
        //    return;
        //}
        if ($("#chkCuotasDobles").is(":checked") && arMesesCuotasDobles.length == 0) {
            alerta("Debe seleccionar por lo menos un mes");
            return;
        }
        //CuotaQuincena
        if ($("#chkCuotaQuincena").is(":checked") && $("input[name='rblstTipoCuotaQuincena']:checked").length == 0) {
            alerta("Debe definir Cuotas Quincena");
            return;
        }
        if ($("input[name='rblstTipoCuotaQuincena']:checked").val() == 1) {
            //vcErrores = "1";
            var minPrimQuincena = $("#txtMinimoCuotaPrimeraQuincena").val();
            var maxPrimQuincena = $("#txtMaximoCuotaPrimeraQuincena").val();

            if (minPrimQuincena == '') {
                alerta("Ingrese un porcentaje mínimo para Cuota Quincena");
                $("#txtMinimoCuotaPrimeraQuincena").focus();
                return;
            }
            if (maxPrimQuincena == '') {
                alerta("Ingrese un porcentaje máximo para Cuota Quincena");
                $("#txtMaximoCuotaPrimeraQuincena").focus();
                return;
            }
            if (parseFloat(minPrimQuincena) == 0 || parseFloat(minPrimQuincena) > 100) {
                alerta("El valor del porcentaje mínimo para la Cuota Quincena debe estar entr 0 y 100.");
                $("#txtMinimoCuotaPrimeraQuincena").focus();
                return;
            }

            if (parseFloat(maxPrimQuincena) == 0 || parseFloat(maxPrimQuincena) > 100) {
                alerta("El valor del porcentaje máximo para la Cuota Quincena debe estar entr 0 y 100.");
                $("#txtMinimoCuotaPrimeraQuincena").focus();
                return;
            }
            if (parseFloat(minPrimQuincena) >= parseFloat(maxPrimQuincena)) {
                alerta("El valor del porcentaje mínimo para la Cuota Quincena debe ser menor que valor del porcentaje máximo para la Cuota Quincena.");
                $("#txtMinimoCuotaPrimeraQuincena").focus();
                return;
            }
            oFinanciamientoTipo.CuotaPrimeraQuincena(0);
        }
        //              else if ($("input[name='rblstTipoCuotaQuincena']:checked").val() == 1 && $("#txtMinimoCuotaPrimeraQuincena").val() != '' && $("#txtMaximoCuotaPrimeraQuincena").val() != '') {
        //                    oFinanciamientoTipo.CuotaPrimeraQuincena(0);
        //                }
        if ($("input[name='rblstTipoCuotaQuincena']:checked").val() == 2) {
            //vcErrores = "1";
            var CuotaPrimeraQuincena = $("#txtCuotaPrimeraQuincena").val();
            if (CuotaPrimeraQuincena == '') {
                alerta("Ingrese un valor para Porcentaje Primera Quincena");
                $("#txtCuotaPrimeraQuincena").focus();
                return;
            }
            if (parseFloat(CuotaPrimeraQuincena) == 0 || parseFloat(CuotaPrimeraQuincena) > 100) {
                alerta("El valor para Porcentaje Primera Quincena debe estar entre 0 y 100.");
                $("#txtCuotaPrimeraQuincena").focus();
                return;
            }
            oFinanciamientoTipo.MinimoCuotaPrimeraQuincena(0);
            oFinanciamientoTipo.MaximoCuotaPrimeraQuincena(0);
        }
        //else if ($("input[name='rblstTipoCuotaQuincena']:checked").val() == 2 && $("#txtCuotaPrimeraQuincena").val() != '') {
        //                    oFinanciamientoTipo.MinimoCuotaPrimeraQuincena(0);
        //                    oFinanciamientoTipo.MaximoCuotaPrimeraQuincena(0);
        //                }
        if (!$("#chkCuotaQuincena").is(":checked")) {
            oFinanciamientoTipo.CuotaPrimeraQuincena(0);
            oFinanciamientoTipo.MinimoCuotaPrimeraQuincena(0);
            oFinanciamientoTipo.MaximoCuotaPrimeraQuincena(0);
        }
        //Intereses
        if ($("#chkInteres").is(":checked") && oFinanciamientoTipo.TipoInteres() == "") {
            //vcErrores = "1";
            alerta("Seleccione un tipo de interes");
            return;
        }
        if ($("#chkInteres").is(":checked") && $.trim($("#txtTasaInteres").val()) == "") {
            //vcErrores = "1";
            alerta("Ingrese una Tasa de Interés");
            $("#txtTasaInteres").focus();
            return;
        }
        var inTasa = parseInt($("#txtTasaInteres").val());
        if ($("#chkInteres").is(":checked") && (inTasa < 0 || inTasa == 0 || inTasa > 100)) {
            alerta("La tasa de interés debe estar entre 0 y 100.");
            return;
        }
        if (!$("#chkInteres").is(":checked")) {
            oFinanciamientoTipo.TasaInteres(-1);
        }


        //var vcMeses = "";
        //for (var i = 0; i < $("#lstbMesesCuotasDobles")[0].options.length; i++) {
        //    vcMeses = vcMeses + $("#lstbMesesCuotasDobles")[0].options[i].value + ",";
        //}
        //vcMeses = vcMeses.substr(0, vcMeses.length - 1);
        //oFinanciamientoTipo.MesesCuotasDobles(vcMeses);

        if ($("#chkCuotasDobles").is(":checked")) {
            oFinanciamientoTipo.MesesCuotasDobles(arMesesCuotasDobles.join(','));
        } else {
            oFinanciamientoTipo.MesesCuotasDobles('');
        }

        //comentado 10/12/2013 wapumayta
        //var vcMesesPagoContado = [];
        //if ($("input[name='rblstPagoContado']:checked").val() == 4) {
        //    oFinanciamientoTipo.MesesCuotas('');
        //} else if ($("input[name='rblstPagoContado']:checked").val() == 3) {
        //    for (var j = 0; j < $("#lstMesesPagoContado")[0].options.length; j++) {
        //        vcMesesPagoContado.push($("#lstMesesPagoContado")[0].options[j].value);
        //    }
        //    oFinanciamientoTipo.MesesCuotas(vcMesesPagoContado.join(","));
        //}
        // 10/12/2013

        if ($("input[name='rblstPagoContado']:checked").val() == 3) {
            oFinanciamientoTipo.MesesCuotas(arValTipos.join(","));
        } else {
            oFinanciamientoTipo.MesesCuotas('');
        }


        //if (oFinanciamientoTipo.errors().length == 0 && vcErrores == "0") {
        if (vcErrores == "0") {
            BloquearPagina(true);
            oFinanciamientoTipo.Guardar(SatisfactoriaGuardar, ErrorGuardar);
        } else {
            alerta('Por favor verifique los datos ingresados');
            oFinanciamientoTipo.errors.showAllMessages();
            return false;
        }


    });
    function SatisfactoriaGuardar(Resultado) {
        if (Resultado == -2) {
            BloquearPagina(false);
            Mensaje("<br/><h1>El código ingresado ya existe, debe ingresar otro valor.</h1><br/>", document);
        }
        else {
            window.parent.ActualizarGrilla();
            Mensaje("<br/><h1>Financiamiento guardado</h1><br/>", document, CerroMensaje);
        }
    }
    function ErrorGuardar(xhr, err, thrErr) {
        BloquearPagina(false);
    }
    function CerroMensaje() {
        window.parent.ActualizarGrilla();
        BloquearPagina(false);
        if (oFinanciamientoTipo.IdTipoFinanciamiento() == null) {//Nuevo
            oFinanciamientoTipo.Limpiar();
            $("#txtCodigo").focus("");
        }
        else {//Edicion
            window.parent.tab.tabs("remove", indiceTab);
        }
    }
    //--------------------------------------------------------------------------------------
    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", indiceTab);
    });

});
    