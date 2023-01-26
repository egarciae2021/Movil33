function CerroMensaje() {
    if ($("input[name='rbProgramacion']:checked").val() == "1") {
        window.parent.VisorTarea();
        LimpiarTodo();
    }

    if ($("#ddlOperador option").length == 2) 
    {
        $("#ddlOperador").prop("selectedIndex", 1);
        $("#ddlOperador").attr('disabled', true);
        $("#ddlOperador").change();
    }
}

function LimpiarTodo() {
    $("input[name='rlstTarea']:checked").val("7");
    //$("input[name='rbProgramacion']:checked").val("0");
    $("input[name='rbProgramacion'][value=0]").attr("checked", true);
    $('#txtFechaProgramacion').val("");
    $('#txtFechaInicio').val("");
    $('#txtFechaFin').val("");
    $("#tdTodaLinea").css("display", "none");
    $("select#ddlOperador").prop('selectedIndex', 0);
    //$("select#ddlTipoTelefonia").prop('selectedIndex', 0);
    $("select#ddlTipoLlamada").prop('selectedIndex', 0);
    $("#divLineas").css("display", "none;");
    $("#txtLinea").val("");
    $("#hdfLinea").val("");
    $("#txtLinea").hide();
    $("#btnAgregarLinea").css("display", "none");
    $("#btnEliminarLinea").css("display", "none");
    $("#btnQuitarTodo").css("display", "none");
    $("#divLineas").css("display", "none");
    $("input:checkbox").attr('checked', false);
    $("#tdTodaLinea").css("display", "none");
    $("#btnQuitarTodo").css("display", "none");
    //$("#txtFechaProgramacion").css("display", "none");
    $(".k-datetimepicker.DATETIME").css("display", "none");
    $("#trRangoXDias").css("display", "none");
    $("#chkActualizacionAcumumlados").attr('checked', true);
    $("#chkRangoXDias").attr('checked', false);
    $("#chkActGenLin").prop("disabled", true);
    $("#TxtDiaInicial").val("");
    $("#TxtDiaFinal").val("");
    $("#tbTipCos").hide();
    $("#trPlantilla").css("display", "none");
    $("#tbLineas").jqGrid('clearGridData');
}

var Selecciono = false;
var vcPerInicial = "";
var vcPerFinal = "";
var MesDiff = 0;
var oCulturaUsuario;
var FormatoFechaCulturaForDatePicker = "";
var SimDec = ".";
var SimMil = ",";
var NumDec = "2";
function ListarLineas() {
    $("#tbLineas").jqGrid('clearGridData');
    if ($("#chkActGenLin").is(':checked')) {
        //$("#chkTodaLinea").prop('checked', true);
        $("#tdTodaLinea").css("display", "inherit");
        $("#btnQuitarTodo").css("display", "none");
        if ($("#chkTodaLinea").is(':checked')) {
            $("#txtLinea").val("");
            $("#hdfLinea").val("");
            $("#txtLinea").hide();
            $("#tblLineas").css("display", "none");
            $("#btnAgregarLinea").css("display", "none");
            $("#btnEliminarLinea").css("display", "none");
            $("#btnQuitarTodo").css("display", "none");
            $("#divLineas").css("display", "none");
        } else {
            $("#txtLinea").show();
            $("#tblLineas").css("display", "inherit");
            $("#btnAgregarLinea").css("display", "inherit");
            $("#btnEliminarLinea").css("display", "inherit");
            $("#btnQuitarTodo").css("display", "inherit");
            $("#divLineas").css("display", "inherit");
        }
    }
    else {
        $("#tdTodaLinea").css("display", "none");
        $("#btnQuitarTodo").css("display", "none");
        $("#tblLineas").css("display", "none");
    }
}

function ListarPlantillasPorOperador(inCodOpe) {
    $.ajax({
        type: "POST",
        url: "Imp_ActualizarRegistros.aspx/ListarPlantillaPorOperador",
        data: "{'inCodOpe': '" + inCodOpe + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var resultado = result.d;
            $("#ddlPlantilla").html("");
            if (resultado.length > 0) {
                var i = 0;
                for (i = 0; i < resultado.length; i++) {
                    $("#ddlPlantilla").append("<option value='" + resultado[i].P_inCodPla.toString() + "' >" + resultado[i].vcNom.toString() + "</option>");
                }

            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function EventosUpdatePanel() {
    $("select").addClass("ui-widget-content ui-corner-all");
    $("select").css("padding", "4px");

    $("input:text").addClass("ui-widget-content ui-corner-all");
    $("input:text").css("padding", "4px");

    $("textarea").addClass("ui-widget-content ui-corner-all");
    $("textarea").css("padding", "4px");

    $("input:checkbox").addClass("ui-widget-content ui-corner-all");
    $("input:checkbox").css("padding", "4px");

    $(".lblNormal").addClass("ui-widget-content ui-corner-all");
    $(".lblNormal").css("padding", "4px");

    if ($('#ddlOperador').val() != -1) {
        $('#chkActGenLin').removeAttr("disabled");
    }
    ListarLineas();
}

$(function () {
    oCulturaUsuario = window.parent.parent.oCulturaUsuario;
    FormatoFechaCulturaForDatePicker = oCulturaUsuario.vcFecCor.toLowerCase();

    if (FormatoFechaCulturaForDatePicker.indexOf("yyyy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yyyy", "yy");  //Para datepicker 'yy' es como 'yyyy'; y 'y' es 'yy'
    }
    else if (FormatoFechaCulturaForDatePicker.indexOf("yy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yy", "y");
    }

    SimMil = oCulturaUsuario.vcSimSepMil;
    NumDec = oCulturaUsuario.dcNumDec;
    SimDec = oCulturaUsuario.vcSimDec;

    var ListandoDetalles = false;
    var idCliente = window.parent.parent.idCliente;

    inicio();

    function inicio() {
        $("#BarraNavegacionJQ1_Panel1_O").css("padding-top", "5px");
        $("#BarraNavegacionJQ1_Panel1_O").css("padding-bottom", "5px");

        $("#BarraNavegacionJQ1_Panel2_O").css("padding-top", "0px");
        $("#BarraNavegacionJQ1_Panel2_O").css("padding-bottom", "0px");

        $("#BarraNavegacionJQ1_Panel3_O").css("padding-top", "10px");
        $("#BarraNavegacionJQ1_Panel3_O").css("padding-bottom", "10px");

        $("#btnGuardarSer").hide();

        $("#txtLinea").css("display", "none");
        //$("#txtFechaProgramacion").css("display", "none");
        //$(".k-datetimepicker.DATETIME").css("display", "none");
        $("#trRangoXDias").css("display", "none");
        $("#btnAgregarLinea").css("display", "none");
        $("#btnEliminarLinea").css("display", "none");

        $("#tbLineas").jqGrid('clearGridData');
        $("#divLineas").css("display", "none");

        $("#chkActGenLin").attr("disabled", "disabled");
        //$("#chkActualizacionAcumumlados").prop("disabled", true);

        $("#chkActGenLin").attr("title", "Seleccione un operador para activar esta opción");

        if ($("#chkActPrefijos").is(':checked')) {
            $("#trPlantilla").show();
        }
        else {
            $("#trPlantilla").hide();
        }
    }

    EventosUpdatePanel();

    $(".btnNormal").button({});

    $(".DIAMESANIO").datepicker({
        changeMonth: true,
        changeYear: true,
        format: "dd/mm/yy"
    });

    $(".DIAMESANIO").datepicker('option', 'dateFormat', FormatoFechaCulturaForDatePicker);

    //    $(".DATETIME").change({
    //    alert($(".DATETIME").val());
    //    });

    //    $(".DATETIME").AnyTime_picker({ format: "%d/%m/%Y %H:%i",
    //        labelTitle: "Fecha-Hora",
    //        labelHour: "Hora",
    //        labelMinute: "Minuto",
    //        labelSecond: "Segundo",
    //        labelYear: "Año",
    //        labelMonth: "Mes",
    //        labelDayOfMonth: "Dia",
    //        monthAbbreviations: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    //        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    //        dayAbbreviations: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    //        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    //    });

    //    $(".MESANHO").AnyTime_picker({ format: "%m/%Y",
    //        labelTitle: "Periodo",
    //        labelHour: "Hora",
    //        labelMinute: "Minuto",
    //        labelSecond: "Segundo",
    //        labelYear: "Año",
    //        labelMonth: "Mes",
    //        labelDayOfMonth: "Dia",
    //        monthAbbreviations: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    //        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    //        dayAbbreviations: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    //        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    //    });

    var tbLineas = $("#tbLineas").jqGrid({
        datatype: "local",
        colModel: [{ name: 'P_vcCod', index: 'P_vcCod', label: 'Línea', width: '50' },
   		           { name: 'vcNom', index: 'vcNom', label: 'Empleado', hidden: true }
   	              ],
        sortname: "P_vcCod", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "250", //350
        height: "120",
        rownumbers: true,
        caption: "Líneas"
    });

    $("#chkActGenLin").change(function () {
        ListarLineas();
    });

    $("#chkTodaLinea").change(function () {
        if ($("#chkTodaLinea").is(':checked')) {
            $("#txtLinea").val("");
            $("#hdfLinea").val("");
            $("#txtLinea").hide();
            $("#tblLineas").css("display", "none");
            $("#btnAgregarLinea").css("display", "none");
            $("#btnEliminarLinea").css("display", "none");
            $("#btnQuitarTodo").css("display", "none");
            $("#divLineas").css("display", "none");
        } else {
            $("#txtLinea").show();
            $("#tblLineas").css("display", "inherit");
            $("#btnAgregarLinea").css("display", "inherit");
            $("#btnEliminarLinea").css("display", "inherit");
            $("#btnQuitarTodo").css("display", "inherit");
            $("#divLineas").css("display", "inherit");
        }
    });

    $("#ddlOperador").change(function () {
        $("#tbLineas").jqGrid('clearGridData');
    });

    $("#btnCerrarDialogLinea").click(function () {
        $("#divLineaDialog").dialog("close");
    });

    $("#rlstTarea").change(function () {
        var valor = $("input[name='rlstTarea']:checked").val();
        if (valor == "2") {
            $("#BarraNavegacionJQ1_Panel2").show();
        }
        else if (valor == "3") {
            $("#BarraNavegacionJQ1_Panel2").show();
        }
        else if (valor == "1") {
            $("#BarraNavegacionJQ1_Panel2").hide();
            $('input:radio[name=rbProgramacion]:nth(0)').attr('checked', true);
            //$("#txtFechaProgramacion").hide();
            $(".k-datetimepicker.DATETIME").css("display", "none");
            $("#txtFechaProgramacion").val("");
        }
    });

    $("#rbProgramacion").change(function () {
        var valor = $("input[name='rbProgramacion']:checked").val();
        if (valor == "0") {
            //$("#txtFechaProgramacion").hide();
            $(".k-datetimepicker.DATETIME").css("display", "none");
            $("#txtFechaProgramacion").val("");
        }
        else if (valor == "1") {
            // $("#txtFechaProgramacion").show();
            $(".k-datetimepicker.DATETIME").css("display", "");
        }
    });

    $("#txtLinea").focusout(function () {
        $.ajax({
            type: "POST",
            url: "../../Common/WebService/General.asmx/ListarLinea",
            data: "{'maxFilas': '" + 200 + "'," +
                   "'vcCodLin': '" + $("#txtLinea").val().replace(/'/g, "&#39") + "'," +
                   "'inCodOpe': '" + $("#ddlOperador").val() + "'," +
                   "'idCliente': '" + idCliente + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if ($(result.d).length == 1) {
                    $("#hdfCodLin").val(result.d[0].P_vcNum);
                    $("#hdfNomEmp").val(result.d[0].Empleado.vcNom);
                    Selecciono = true;
                }
                else {
                    $("#hdfCodLin").val("");
                    $("#hdfNomEmp").val("");
                    Selecciono = false;
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    $("#btnAgregarLinea").click(function () {
        if ($("#ddlOperador").val() == "-1") {
            alerta("Seleccione un operador");
            $("#ddlOperador").focus();
            return;
        }
        $("#txtLinea").val("");
        $("#hdfLinea").val("");
        $('#divLineaDialog').dialog({
            title: "Agregar Linea",
            modal: true
        });
    });

    $("#btnEliminarLinea").click(function () {
        var id = $("#tbLineas").jqGrid('getGridParam', 'selrow');
        if (id) {
            $("#tbLineas").jqGrid('delRowData', id);
        }
        else {
            alerta("Seleccione una linea");
        }
    });

    $("#chkActualizarCostosDP").change(function () {
        if ($("#chkActualizarCostosDP").is(':checked')) {
            $("#tbTipCos").show();
        } else {
            $("#tbTipCos").hide();
        }
    });

    $("#chkActPrefijos").change(function () {
        if ($("#chkActPrefijos").is(':checked')) {
            $("#trPlantilla").show();
        } else {
            $("#trPlantilla").hide();
        }
    }); //-1;

    $("#ddlOperador").change(function () {
        if ($("#ddlOperador").val() != "-1") {
            $("#chkActGenLin").prop("disabled", false);
            ListarPlantillasPorOperador($("#ddlOperador").val());
            if ($("#ddlTipoLlamada").val() != "-1") {
                $("#chkRangoXDias").attr('checked', false);
                $("#TxtDiaInicial").val("");
                $("#TxtDiaFinal").val("");
                $("#TxtDiaInicial").prop("disabled", true);
                $("#TxtDiaFinal").prop("disabled", true);
            }
        } else {
            $("#ddlPlantilla").html("");
            $("#chkActGenLin").prop("disabled", true);
            $("#ddlPlantilla").append("<option value = '-1' >" + "<Seleccionar>" + "</option>");
            $("#chkRangoXDias").attr('checked', false);
            $("#TxtDiaInicial").val("");
            $("#TxtDiaFinal").val("");
            $("#TxtDiaInicial").prop("disabled", true);
            $("#TxtDiaFinal").prop("disabled", true);
        }
    });

    //$("#ddlTipoTelefonia").change(function () {
        //if ($("#ddlTipoTelefonia").val() == "-1" || $("#ddlOperador").val() == "-1" || $("#ddlTipoLlamada").val() == "-1") {
        //    $("#chkRangoXDias").attr('checked', false);
        //    $("#TxtDiaInicial").val("");
        //    $("#TxtDiaFinal").val("");
        //    $("#TxtDiaInicial").prop("disabled", true);
        //    $("#TxtDiaFinal").prop("disabled", true);
        //}
    //});

    $("#ddlTipoLlamada").change(function () {
        if ($("#ddlOperador").val() == "-1" || $("#ddlTipoLlamada").val() == "-1") {
            $("#chkRangoXDias").attr('checked', false);
            $("#TxtDiaInicial").val("");
            $("#TxtDiaFinal").val("");
            $("#TxtDiaInicial").prop("disabled", true);
            $("#TxtDiaFinal").prop("disabled", true);
        }
    });

    $("#chkActualizacionAcumumlados").change(function () {
        if ($("#chkActualizacionAcumumlados").is(':checked') == false) {
            $("#divMsgConfirmacionAcumulados").dialog({
                title: 'Actualización de Acumulados',
                modal: true,
                buttons: {
                    "Aceptar": function () {
                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $("#chkActualizacionAcumumlados").attr('checked', true);
                        $(this).dialog("close");
                    }
                }
            });
        }
    });

    $("#chkRangoXDias").change(function () {
        if ($("#chkRangoXDias").is(':checked')) {
            if ($("#ddlOperador").val() == "-1") {
                alerta("Seleccione un operador");
                $("#ddlOperador").focus();
                $("#chkRangoXDias").attr('checked', false);
                return;
            }
            //if ($("#ddlTipoTelefonia").val() == "-1") {
            //    alerta("Seleccione un tipo de telefonía");
            //    $("#ddlTipoTelefonia").focus();
            //    $("#chkRangoXDias").attr('checked', false);
            //    return;
            //}
            if ($("#ddlTipoLlamada").val() == "-1") {
                alerta("Seleccione un tipo de llamada");
                $("#ddlTipoLlamada").focus();
                $("#chkRangoXDias").attr('checked', false);
                return;
            }

            $.ajax({
                type: "POST",
                url: "Imp_ActualizarRegistros.aspx/ObtenerRangoDiasXPeriodo",
                data: "{'strTipoLlam': '" + $("#ddlTipoLlamada").val() + "'," +
                      "'strTipoTelef': '1'," +
                      "'strPeriodo': '" + ObtenerFechaANSII(vcPerInicial) + "'," +
                      "'strCodOpe': '" + $("#ddlOperador").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var resultado = result.d;
                    if (resultado[0].toString() != "") {
                        $("#TxtDiaInicial").datepicker("option", "minDate", new Date(resultado[0].toString().substring(0, 4), resultado[0].toString().substring(4, 6) - 1, resultado[0].toString().substring(6, 8)));
                        $("#TxtDiaInicial").datepicker("option", "maxDate", new Date(resultado[1].toString().substring(0, 4), resultado[1].toString().substring(4, 6) - 1, resultado[1].toString().substring(6, 8)));
                        $("#TxtDiaInicial").prop("disabled", false);
                        $("#TxtDiaInicial").datepicker("setDate", new Date(resultado[0].toString().substring(0, 4), resultado[0].toString().substring(4, 6) - 1, resultado[0].toString().substring(6, 8)));
                    } else {
                        $("#TxtDiaInicial").val("");
                        $("#TxtDiaInicial").prop("disabled", true);
                    }

                    if (resultado[1].toString() != "") {
                        $("#TxtDiaFinal").datepicker("option", "minDate", new Date(resultado[0].toString().substring(0, 4), resultado[0].toString().substring(4, 6) - 1, resultado[0].toString().substring(6, 8)));
                        $("#TxtDiaFinal").datepicker("option", "maxDate", new Date(resultado[1].toString().substring(0, 4), resultado[1].toString().substring(4, 6) - 1, resultado[1].toString().substring(6, 8)));
                        $("#TxtDiaFinal").prop("disabled", false);
                        $("#TxtDiaFinal").datepicker("setDate", new Date(resultado[0].toString().substring(0, 4), resultado[0].toString().substring(4, 6) - 1, resultado[0].toString().substring(6, 8)));
                    } else {
                        $("#TxtDiaFinal").val("");
                        $("#TxtDiaFinal").prop("disabled", true);
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        } else {
            $("#chkActualizacionAcumumlados").attr('checked', true);
            $("#TxtDiaInicial").prop("disabled", true);
            $("#TxtDiaFinal").prop("disabled", true);
            $("#TxtDiaInicial").val("");
            $("#TxtDiaFinal").val("");
        }
    });

    $("#btnQuitarTodo").click(function () {
        var datos = $("#tbLineas").jqGrid('getRowData');
        $(datos).each(function () {
            $("#tbLineas").jqGrid('delRowData', this.P_vcCod);
        });
    });

    function TerminoAgregarLinea() {
    }

    $("#btnAgregarDialogLinea").click(function () {
        if ($("#hdfLinea").val() != "") {
            var Filas = $("#tbLineas").getGridParam("data");
            var Existe = false;

            $(Filas).each(function () {
                if (this.P_vcCod == $("#hdfLinea").val()) {
                    alerta("Esta linea ya ha sido agregada");
                    Existe = true;
                    return false;
                }
            });
            if (!Existe) {
                $("#tbLineas").jqGrid('addRowData', $("#hdfLinea").val(), { 'P_vcCod': $("#hdfLinea").val(), 'vcNom': $("#hdfNomEmp").val() });

                //Mensaje('<br/><h1>Linea agregada</h1><br/><h2>' + $("#hdfLinea").val() + "</h2>", document, TerminoAgregarLinea);
                $("#hdfLinea").val("");
                $("#txtLinea").val("");
                $("#txtLinea").focus();
            }
        }
        else {
            alerta("Ingrese un empleado valido");
            $("#txtEmpleado").focus();
        }
    });

    $("#Div1").click(function () {
        window.parent.tabOpciones.tabs("remove", window.parent.tabOpciones.tabs("option", "selected"));
    });

    $("#txtLinea").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../Common/WebService/General.asmx/ListarLinea",
                data: "{'maxFilas': '" + 200 + "'," +
                       "'vcCodLin': '" + $("#txtLinea").val().replace(/'/g, "&#39") + "'," +
                       "'inCodOpe': '" + $("#ddlOperador").val() + "'," +
                       "'idCliente': '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.P_vcNum,
                            vcNomEmp: item.Empleado.vcNom//,
                            //                            category: item.Grupo.vcNom,
                            //                            inCodGru: item.Grupo.P_inCod
                        };
                    }));
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtLinea").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtLinea").val(ui.item.label);
            $("#hdfLinea").val(ui.item.label);
            $("#hdfNomEmp").val(ui.item.vcNomEmp);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodLin").val("");
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
			.append("<a>" + item.label + "=" + item.vcNomEmp + "</a>")
			.appendTo(ul);
    };

    $("#btnGuardar").click(function () {
        var FechaIni = $('#txtFechaInicio').val();
        var FechaFin = $('#txtFechaFin').val();
        var DiaIni = Date.parse($('#TxtDiaInicial').val());
        var DiaFin = Date.parse($('#TxtDiaFinal').val());
        var Lineas = "";
        var strLineas = "";
        var datos = $("#tbLineas").jqGrid('getRowData');

        $(datos).each(function () {
            Lineas = Lineas + parseInt(this.P_vcCod) + '*';
            Lineas = Lineas + this.vcNom.replace(/'/g, "&#39") + '*';
            strLineas = strLineas + parseInt(this.P_vcCod) + ',';
        });

        if ($("input[name='rbProgramacion']:checked").val() == "1" && $("#txtFechaProgramacion").val() == "") {
            alerta("Ingrese una fecha y hora en la que se va a ejecutar la tarea");
            $("#txtFechaProgramacion").focus();
            return;
        }
        if ($("#ddlOperador").val() == "-1") {
            alerta("Seleccione un operador");
            $("#ddlOperador").focus();
            return;
        }

        if ($("#ddlTipoPlantilla").val() == "-1") {
            alerta("Seleccione un tipo de plantilla");
            $("#ddlTipoPlantilla").focus();
            return;
        }
        //if ($("#ddlTipoTelefonia").val() == "-1") {
        //    alerta("Seleccione un tipo de telefonía");
        //    $("#ddlTipoTelefonia").focus();
        //    return;
        //}
        if ($("#ddlTipoLlamada").val() == "-1") {
            alerta("Seleccione un tipo de llamada");
            $("#ddlTipoLlamada").focus();
            return;
        }

        if ($("#chkActGenLin").is(':checked')) {
            if ($("#chkTodaLinea").is(':checked')) {
                var datos = $("#tbLineas").jqGrid('getRowData');
                $(datos).each(function () {
                    $("#tbLineas").jqGrid('delRowData', this.P_vcCod);
                });
            } else {
                if (Lineas == "") {
                    alerta("Ingrese una línea");
                    $("#txtFechaFacturacion").focus();
                    return;
                }
            }
        }

        var FecIni = new Date(FechaIni.split('/')[1], FechaIni.split('/')[0], 1);
        var FecFin = new Date(FechaFin.split('/')[1], FechaFin.split('/')[0], 1);
        //var FecFin = Date.parse("01/" + FechaFin);

        if (FecFin < FecIni) {
            alerta("El periodo final no puede ser menor al periodo Inicial");
            $('#txtFechaFin').focus();
            return;
        }
        if (FechaIni == "") {
            alerta("Seleccione el periodo inicial a actualizar");
            $('#txtFechaInicio').focus();
            return;
        }
        if (FechaFin == "") {
            alerta("Seleccione el periodo final a actualizar");
            $('#txtFechaFin').focus();
            return;
        }

        if ($("#chkActPrefijos").is(':checked') && $('#ddlPlantilla').val() == "-1") {
            alerta("Seleccione una plantilla");
            $('#ddlPlantilla').focus();
            return;
        }

        if ($("#chkRangoXDias").is(':checked')) {
            if (DiaFin < DiaIni) {
                alerta("El rango final no puede ser menor al rango inicial");
                $('#TxtDiaFinal').focus();
                return;
            }
            if (DiaIni == "" || DiaIni == null) {
                alerta("Ingrese el rango inicial de Días a actualizar");
                $('#TxtDiaInicial').focus();
                return;
            }
            if (DiaFin == "" || DiaFin == null) {
                alerta("Ingrese el rango final de Días a actualizar");
                $('#TxtDiaFinal').focus();
                return;
            }
        }

        var chkRangoXDias = $("#chkRangoXDias").is(':checked');

        $('#divMsgConfirmacion').dialog({
            title: "Actualizar registro de llamadas",
            modal: true,
            buttons: {
                "Si": function () {
                    HabilitarControles(false);
                    $.ajax({
                        type: "POST",
                        url: "Imp_ActualizarRegistros.aspx/ProcesarActualizacion",
                        data: "{'pinCodOpe': '" + $("#ddlOperador").val() + "'," +
                               "'pinTipPla': '" + $("#ddlTipoPlantilla").val() + "'," +
                               "'pinTipTel': '1'," +
                               "'pinTipLla': '" + $("#ddlTipoLlamada").val() + "'," +
                               "'pinTarCre': '" + $("input[name='rlstTarea']:checked").val() + "'," +
                               "'pinPro': '" + $("input[name='rbProgramacion']:checked").val() + "'," +
                               "'pdtFecPro': '" + $("#txtFechaProgramacion").val() + "'," +
                               "'pdtMesIni': '" + FechaIni + "'," +
                               "'pdtMesFin': '" + FechaFin + "'," +
                               "'pbtActGenLin': '" + $("#chkActGenLin").is(':checked') + "'," +
                               "'pbtActCos': '" + $("#chkActualizarCostosDP").is(':checked') + "'," +
                               "'pbtSerOff': '" + $("#chkServicioOff").is(':checked') + "'," +
                               "'pbtEmpDes': '" + $("#chkActualizacionDesconocidos").is(':checked') + "'," +
                               "'pbtActNum': '" + $("#chkActualizaNumeros").is(':checked') + "'," +
                               "'pbtTodasLineas': '" + $("#chkTodaLinea").is(':checked') + "'," +
                               "'pbtActAcu': '" + $("#chkActualizacionAcumumlados").is(':checked') + "'," +
                               "'pbtActPref': '" + $("#chkActPrefijos").is(':checked') + "'," +
                               "'pbtActTipCosto': '" + $('#chklstTipoCosteo input:checked').val() + "'," +
                               "'pbtActConceptos': '" + $('#chkActualizarConceptos').is(':checked') + "'," +

                               "'pinCodPla': '" + $('#ddlPlantilla').val() + "'," +
                               "'pblActRngoDias': '" + chkRangoXDias + "'," +
                               "'pdtFecDiaIni': '" + $('#TxtDiaInicial').val() + "'," +
                               "'pdtFecDiaFin': '" + $('#TxtDiaFinal').val() + "'," +

                               "'pstrLineas': '" + strLineas + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            if (result.d == "") {
                                Mensaje("<br/><h1>Se ha puesto en cola la actualización elegida</h1><br/>", document, CerroMensaje);
                            }
                            else {
                                alert(result.d);
                            }
                        },
                        error: function (xhr, err, thrErr) {
                            HabilitarControles(true);
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                    HabilitarControles(true);
                    $(this).dialog("close");
                    LimpiarTodo();
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            }
        });
        //$("#btnGuardarSer").click();
    });

    function HabilitarControles(habilitar) {
        if (habilitar) {
            $(".btnNormal").button("option", "disabled", false);
            $("#Contenido").removeAttr("disabled");
        }
        else {
            $(".btnNormal").button("option", "disabled", true);
            $("#Contenido").attr("disabled", "disabled");
        }
    }

    function ObtenerFechaANSII(Fecha) {
        try {
            return Fecha.getFullYear().toString() + FormatoDigitos(Fecha.getMonth() + 1, 2).toString() + FormatoDigitos(Fecha.getDate(), 2).toString();
        }
        catch (e) {
            return "";
        }
    }

    function ValidarRangoPeriodos(anio, Mes, tipo) {
        if (tipo == 1) {  //Tipo 1 = FechaInicio
            vcPerInicial = new Date(anio, Mes - 1);
        }
        if (tipo == 2) {  //Tipo 2 = FechaFin
            vcPerFinal = new Date(anio, Mes - 1);
        }

        if (vcPerInicial == "" || vcPerFinal == "") {
            $("#trRangoXDias").css("display", "none");
            return;
        }

        if (vcPerFinal < vcPerInicial) {
            $("#trRangoXDias").css("display", "none");
            return;
        }

        var months = (vcPerFinal - vcPerInicial) / 2628000000;
        MesDiff = Math.round(months) + 1;
        if (MesDiff == 1) {
            $("#trRangoXDias").css("display", "");
            $("#chkRangoXDias").attr('checked', false);
            $("#TxtDiaInicial").val("");
            $("#TxtDiaFinal").val("");
            $("#TxtDiaInicial").prop("disabled", true);
            $("#TxtDiaFinal").prop("disabled", true);
        }
        else {
            $("#trRangoXDias").css("display", "none");
            $("#chkRangoXDias").attr('checked', false);
            //$("#chkActualizacionAcumumlados").prop("disabled", true);
            $("#chkActualizacionAcumumlados").attr('checked', true);
            $("#TxtDiaInicial").val("");
            $("#TxtDiaFinal").val("");
            $("#TxtDiaInicial").prop("disabled", true);
            $("#TxtDiaFinal").prop("disabled", true);
        }
    }


    $(".MESANHOINI").removeClass("ui-widget-content ui-corner-all");
    $(".MESANHOINI").css("padding", "0px");
    $(".MESANHOINI").css("margin", "0px");
    $(".MESANHOINI").kendoDatePicker({
        culture: "es-ES",
        animation: false,
        start: "year",
        depth: "year",
        format: "MM/yyyy",
        change: function () {
            var value = this.value();
            if (value == null) {
                $("#trRangoXDias").css("display", "none");
                $("#chkRangoXDias").attr('checked', false);
            } else {
                ValidarRangoPeriodos(value.getFullYear(), value.getMonth() + 1, 1);
            }
        }
    });

    $(".MESANHOFIN").removeClass("ui-widget-content ui-corner-all");
    $(".MESANHOFIN").css("padding", "0px");
    $(".MESANHOFIN").css("margin", "0px");
    $(".MESANHOFIN").kendoDatePicker({
        culture: "es-ES",
        animation: false,
        start: "year",
        depth: "year",
        format: "MM/yyyy",
        change: function () {
            var value = this.value();
            if (value == null) {
                $("#trRangoXDias").css("display", "none");
                $("#chkRangoXDias").attr('checked', false);
            } else {
                ValidarRangoPeriodos(value.getFullYear(), value.getMonth() + 1, 2);
            }
        }
    });

    $(".DATETIME").removeClass("ui-widget-content ui-corner-all");
    $(".DATETIME").css("padding", "0px");
    $(".DATETIME").css("margin", "0px");
    $(".DATETIME").kendoDateTimePicker({
        culture: "es-ES",
        animation: false,
        format: "dd/MM/yyyy HH:mm",
        interval: 60
    });
    $(".k-datetimepicker.DATETIME").css("display", "none");



    $("#ddlTipoPlantilla").change(function () {
        ddlTipoPlantilla_change();
    });
    ddlTipoPlantilla_change();


    if ($("#ddlOperador option").length == 2) 
    {
        $("#ddlOperador").prop("selectedIndex", 1);
        $("#ddlOperador").attr('disabled', true);
        $("#ddlOperador").change();
    }

});


function ddlTipoPlantilla_change() {

    if ($("#ddlTipoPlantilla").val() == '1') {
        //Detalle
        $("#chkActGenLin").prop("disabled", false);
        $("#chkActualizarConceptos").prop("disabled", false);
        $("#chkActualizacionDesconocidos").prop("disabled", false);
        $("#chkActualizacionAcumumlados").prop("disabled", false);
        $("#chkRangoXDias").prop("disabled", false);
        $("#chkServicioOff").prop("disabled", false);
        $("#chkActPrefijos").prop("disabled", false);
        $("#chkActualizaNumeros").prop("disabled", false);
        $("#chkActualizarCostosDP").prop("disabled", false);

        $("#chkActualizarConceptos").prop("disabled", true);
        $("#chkActualizacionAcumumlados").prop("checked", true);
    }
    else if ($("#ddlTipoPlantilla").val() == '2') {
        //Resumen
        $("#chkRangoXDias").prop("checked", false);
        $("#chkServicioOff").prop("checked", false);
        $("#chkActPrefijos").prop("checked", false);
        $("#chkActualizaNumeros").prop("checked", false);
        $("#chkActualizarCostosDP").prop("checked", false);

        $("#chkActGenLin").prop("disabled", false);
        $("#chkActualizarConceptos").prop("disabled", false);
        $("#chkActualizacionDesconocidos").prop("disabled", false);
        $("#chkActualizacionAcumumlados").prop("disabled", false);
        $("#chkRangoXDias").prop("disabled", true);
        $("#chkServicioOff").prop("disabled", true);
        $("#chkActPrefijos").prop("disabled", true);
        $("#chkActualizaNumeros").prop("disabled", true);
        $("#chkActualizarCostosDP").prop("disabled", true);
        $("#chkActualizacionAcumumlados").prop("checked", true);
    }
    else {
        //Ninguno..
        $("#chkActualizacionAcumumlados").prop("checked", false);
        $("#chkActGenLin").prop("disabled", true);
        $("#chkActualizarConceptos").prop("disabled", true);
        $("#chkActualizacionDesconocidos").prop("disabled", true);
        $("#chkActualizacionAcumumlados").prop("disabled", true);
        $("#chkRangoXDias").prop("disabled", true);
        $("#chkServicioOff").prop("disabled", true);
        $("#chkActPrefijos").prop("disabled", true);
        $("#chkActualizaNumeros").prop("disabled", true);
        $("#chkActualizarCostosDP").prop("disabled", true);

    }
}