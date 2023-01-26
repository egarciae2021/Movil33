$(function () {
    inicio();
    function inicio() {
    }

    const ddlCuentas = $("#ddlCuentas").kendoMultiSelect().data("kendoMultiSelect");

    $(".btnNormal").button({});

    //    $(".DATE").AnyTime_picker({
    //        format: "%m/%Y",
    //        labelTitle: "Seleccionar mes",
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

    $(".DATE").removeClass("ui-widget-content ui-corner-all");
    $(".DATE").css("padding", "0px");
    $(".DATE").css("margin", "0px");
    $(".DATE").kendoDatePicker({
        culture: "es-ES",
        animation: false,
        start: "year",
        depth: "year",
        format: "MM/yyyy"
    });

    $(".DATE").keypress(ValidarFecha);

    $(".DATE").bind('paste', function (e) {
        return false;
    });

    $("#chkOperador").change(function () {
        $("input", "#chklstOperador").attr('checked', $(this).is(':checked'));
    });

    $("#btnProcesar").click(function () {
        var FechaIni = $('#txtFechaInicio').val();
        var FechaFin = $('#txtFechaFin').val();
        var TipoTelefonia = $('#ddlTipoTelefonia').val();
        var TipoLlamada = $('#ddlTipoLlamada').val();
        var TipoPlantilla = $('#ddlTipoPlantilla').val();
        const arrayCuentas = ddlCuentas.value();
        var lstOperador = "";

        $("input", "#chklstOperador").each(function () {
            if ($(this).attr('checked')) {
                lstOperador += $(this).val() + ",";
            }
        });

        var FecIni = Date.parse("01/" + FechaIni);
        var FecFin = Date.parse("01/" + FechaFin);

        if (FecFin < FecIni) {
            alerta("La Fecha Final no puede ser menor a la fecha Inicial");
            $('#txtFechaFin').focus();
            return;
        }

        if (FechaIni == "") {
            alerta("Ingrese la fecha desde donde se va a eliminar los registros");
            $('#txtFechaInicio').focus();
            return;
        }
        if (FechaFin == "") {
            alerta("Ingrese la fecha hasta donde se va a eliminar los registros");
            $('#txtFechaFin').focus();
            return;
        }

        if (TipoTelefonia == "-1") {
            alerta("Seleccione un tipo de telefonía");
            $('#ddlTipoTelefonia').focus();
            return;
        }
        if (TipoLlamada == "-1") {
            alerta("Seleccione el tipo de llamada");
            $('#ddlTipoLlamada').focus();
            return;
        }
        if (TipoPlantilla == "-1") {
            alerta("Seleccione el tipo de plantilla");
            $('#ddlTipoPlantilla').focus();
            return;
        }

        if (lstOperador == "") {
            alerta("Seleccione por lo menos un operador");
            return;
        }
        else {
            lstOperador = lstOperador.substring(0, lstOperador.length - 1);
        }
        $('#divMsgConfirmacion').dialog({
            title: "Eliminar registro de llamadas",
            modal: true,
            buttons: {
                "Si": function () {
                    HabilitarControles(false);
                    $.ajax({
                        type: "POST",
                        url: "Imp_EliminarRegistros.aspx/ProcesarEliminacion",
                        data: JSON.stringify({
                            dtFecIni: '01/' + FechaIni,
                            dtFecFin: '01/' + FechaFin,
                            inCodTipTel: TipoTelefonia,
                            inCodTipLla: TipoLlamada,
                            inCodTipPla: TipoPlantilla,
                            lstOpe: lstOperador,
                            lstCuentas: arrayCuentas
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            if (result.d == "") {
                                Mensaje("<br/><h1>Se ha puesto en cola la eliminación elejida</h1><br/>", document, CerroMensaje);
                            }
                            else {
                                alert(result.d);
                            }
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                    $(this).dialog("close");
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            }
        });
    });
    $("#btnCerrar").click(function () {
        window.parent.tabOpciones.tabs("remove", window.parent.tabOpciones.tabs("option", "selected"));
    });

    function LimpiarTodo() {
        $('#txtFechaInicio').val("");
        $('#txtFechaFin').val("");
        $("select#ddlTipoTelefonia").prop('selectedIndex', 0);
        $("select#ddlTipoLlamada").prop('selectedIndex', 0);
        $("select#ddlTipoPlantilla").prop('selectedIndex', 0);

        if ($("#HdfTotalCheckOperador").val() == "1") 
        {
            $("input:checkbox").attr('checked', true);
        }
        else 
        {
            $("input:checkbox").attr('checked', false);
        }
    }

    function CerroMensaje() {
        LimpiarTodo();
        HabilitarControles(true);
        //window.parent.VisorTarea();

        //$("#chkOperador").prop("checked", true);
        //$("#chklstOperador").prop("checked", true);
    }

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
});