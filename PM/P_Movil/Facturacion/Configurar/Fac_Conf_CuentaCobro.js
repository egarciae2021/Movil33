$(document).ready(function () {
    
    kendo.culture("es-PE");
    $("select").removeClass("ui-corner-all");
    $("select").css("padding", "0px");
    $("select").css({ "border": "none" });

    //$("input:text").addClass("ui-widget-content ui-corner-all");
    $("input:text").removeClass("ui-corner-all");
    $("input:text").css("padding", "0px");
    $("input:text").css({ "border": "none" });

    $("#ddlTipoEjecucion").kendoDropDownList({
        optionLabel: {
            text: "Seleccione la Ejecución...",
            value: ""
        },
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
                { text: "Automática", value: 0 }//,
//                { text: "Manual", value: 1 }
        ],
        index: 1,
        enable: false
        //        change: onChangeTipoEjec

    });

    setTimeout(function () {
        //$("#tbConfVeri").hide();
        $("#ddlTipoEjecucion").prev().find(".k-select").hide();
    }, 50);

    Inicio();
    function Inicio() {
        if ($("#hdfEsAdm").val() != "1") {
            $("#dvEjecutarAhora").button("option", "disabled", true);
        }
    }

    // Cargando Hora
    $("#txtHora").kendoNumericTextBox({
        format: "{0:n0}",
        min: 1,
        max: 12,
        step: 1,
        upArrowText: "Incremente horas",
        downArrowText: "Disminuya horas"

    });

    // Inicializando Minuto
    $("#txtMinuto").kendoNumericTextBox({
        format: "{0:n0}",
        min: 00,
        max: 59,
        step: 1,
        upArrowText: "Incremente minutos",
        downArrowText: "Disminuya minutos"
    });
    //inicializando combo AM FM
    $("#txtIndTiempo").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "AM", value: "0" },
            { text: "PM", value: "1" }
        ]
    });

    //    $("#tbConfVeri tr.arriba").hide();
    cargar_datos();
    //Asignando los Valores en la carga deacuerdo al tipo de configuracion enviado por la url
    function cargar_datos() {
        $.ajax({
            type: "POST",
            url: "Fac_Conf_CuentaCobro.aspx/getListar_Configuracion",
            data: JSON.stringify({
                'inTipOri': $("#hdfinTipOri").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                if (data.d.length > 0) {
                    try {
                        var ddlTipoEjecucion = $("#ddlTipoEjecucion").data("kendoDropDownList");
                        ddlTipoEjecucion.value(data.d[0].TipoEjecucion);

                        //                    if (data.d[0].TipoEjecucion == "0") {
                        //                        if (data.d[0].TipoVerificacion == "0") {
                        var numerictxtHora = $("#txtHora").data("kendoNumericTextBox");
                        numerictxtHora.value(data.d[0].Hora);

                        var numerictxtMinuto = $("#txtMinuto").data("kendoNumericTextBox");
                        numerictxtMinuto.value(data.d[0].Minuto);

                        var ddlIndTiempo = $("#txtIndTiempo").data("kendoDropDownList");
                        ddlIndTiempo.value(data.d[0].IndTiempo);
                        //                            $("#tbConfVeri tr.arriba").show();
                        //                        }
                        //                        else {

                        //                            $("#tbConfVeri tr.medio").hide();
                        //                        }
                        //                    }
                        //                    else {
                        //                        $("#tbConfVeri tr.arriba").hide();
                        //                    }
                    } catch (e) {

                    }
                }

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    //    function onChangeTipoEjec(e) {
    //        var _tipoEjec = this.value();
    //        if (_tipoEjec == "0") {
    //            $("#tbConfVeri tr.arriba").show();
    //        }
    //        else {
    //            $("#tbConfVeri tr.arriba").hide();
    //        }
    //    }

    $("#btnGuardar").click(function () {

        var _TipoEjecucion = $("#ddlTipoEjecucion").val();
        var _Hora = $("#txtHora").data("kendoNumericTextBox");
        var _Minuto = $("#txtMinuto").data("kendoNumericTextBox");
        var _IndTiempo = $("#txtIndTiempo").data("kendoDropDownList");
        var hora = _Hora.value();
        var minuto = _Minuto.value();
        var indTiempo = _IndTiempo.text();

        //        if (_TipoEjecucion == "1" || _TipoEjecucion == "2") {

        //            dia = "-1";
        //            hora = "8"
        //            minuto = "8";
        //            indTiempo = "PM";

        //            if (_TipoEjecucion == "2") {//Tipo de Ejecucion ninguna
        //                Plantilla_O = "0";
        //            }
        //        }

         //Validaciones
        if (_TipoEjecucion == "" || _TipoEjecucion == null) {
            alerta("Seleccione el Tipo de Ejecución");
            $("#ddlTipoEjecucion").focus();
            return;
        }

        if (_TipoEjecucion == "0") {

            if (_Hora.value() == null || _Minuto.value() == null || _IndTiempo == "") {
                alerta('Ingrese la Hora de ejecución');
                $("#txtHora").focus();
                return;
            }
        }


        $.ajax({
            type: "POST",
            url: "Fac_Conf_CuentaCobro.aspx/Insertar_ConfCuentaCobro",
            data: JSON.stringify({
                "TipoEjecucion": _TipoEjecucion,
                "Hora": hora,
                "Minuto": minuto,
                "IndTiempo": _IndTiempo.text(),
                "User": $("#hdfEmpleado").val(),
                "inTipOri": $("#hdfinTipOri").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                if (data.d == "Se guardó Correctamente.") {
                    Mensaje("<br/><h1>" + data.d + "</h1><br/>", document);
                }
                else {
                    alerta(data.d);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }

        });
    });
    $("#btnCerrar").click(function () {
        var Nametab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        var Accord = window.parent.$("#" + Nametab);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    });

    $("#dvEjecutarAhora").click(function () {
        confirmacion("Se generará una cola de Resumenes de Deudas, ¿Desea continuar?", EjecutarTarea, null, "Confirmación");
    });

    function EjecutarTarea() {
        var validar = $("#hdfEsAdm").val();
        if (validar === "1") {
            $.ajax({
                type: "POST",
                url: "Fac_Conf_CuentaCobro.aspx/InsertarCola_ResumenesDeuda",
                //            data: JSON.stringify({ 'validar': validar }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data) {
                    if (data.d === "1") {
                        Mensaje("<br/><h1>Se creó una cola de Resumenes de Deudas, ir al Visor de tareas.</h1><br/>", document);
                    } else {
                        alerta("No se realizó esta acción debido a que sólo es permitido al perfil Administrador.");
                    }
                },
                error: function(xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        } else {
            alerta("Sólo es permitido a un perfil Administrador.");
        }
    }

});