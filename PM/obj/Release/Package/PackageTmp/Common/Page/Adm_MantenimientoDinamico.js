var oCulturaUsuario = window.parent.parent.oCulturaUsuario;
var idcontrolfocus = '';
$(function () {
    //#region Valores Iniciales
    indiceTab = window.parent.tab.tabs("option", "selected");

    $.each($(".DECIMAL"), function () {
        ValidarNumeroEnCajaTexto($(this).attr("id"), ValidarDecimalPositivo, oCulturaUsuario);
    });
    $.each($(".INT"), function () {
        ValidarNumeroEnCajaTexto($(this).attr("id"), ValidarEntero, oCulturaUsuario, true);
    });
    $(".VARCHAR").keypress(ValidarAlfaNumericoConEspaciosYCaracteres);
    $(".DATE").keypress(ValidarFecha);
    $(".DATETIME").keypress(ValidarFechaHora);
    $(".TIME").keypress(function (e) {
        if (e.keyCode >= 48 && e.keyCode <= 58) {
            return true;
        } else {
            return false;
        }
    });

    $(".DATE,.DATETIME").keydown(function (e) {
        if (e.keyCode == 8 || e.keyCode == 46) {
            return false;
        }
    });

    //$(".DATETIME").AnyTime_picker({ format: "%d/%m/%Y %H:%i:%s",
    //    labelTitle: "Fecha-Hora",
    //    labelHour: "Hora",
    //    labelMinute: "Minuto",
    //    labelSecond: "Segundo",
    //    labelYear: "Año",
    //    labelMonth: "Mes",
    //    labelDayOfMonth: "Dia",
    //    monthAbbreviations: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    //    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    //    dayAbbreviations: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    //    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    //});

    $(".DATE,.DATETIME").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });

    $(".TIMECONTROL").removeClass("ui-widget-content ui-corner-all");
    $(".TIMECONTROL").css("padding", "0px");
    $(".TIMECONTROL").css("margin", "0px");
    $(".TIMECONTROL").kendoTimePicker({
        culture: "es-ES",
        animation: false,
        format: "HH:mm:ss",
        interval: 60
    });

    $(".btnNormal").button();

    DimPosElementos();
    //#endregion

    //#region Eventos
    $(window).resize(function (a, c) {
        DimPosElementos();
    });

    $("#btnCerrar").click(function () {
        fnCerrar();
    });

    $("#btnGuardar").click(function () {
        var msjValidacion = fnValidarCampos();
        if (msjValidacion[0] != '') {
            idcontrolfocus = msjValidacion[1];
            alerta(msjValidacion[0], null, fnFocusAlert);
            return;
        }

        var msjValidacionHora = fnValidarFormatoHora();
        if (msjValidacionHora[0] != '') {
            idcontrolfocus = msjValidacionHora[1];
            alerta(msjValidacionHora[0], null, fnFocusAlert);
            return;
        }

        var Guardar_Data = {
            vTabla: $("#hdfTabla").val(),
            vIdRegistro: $("#hdfIdRegistro").val(),
            vCampos: fnObtenerValores_Insert()[0],
            vValores: fnObtenerValores_Insert()[1],
            vValoresUpd: fnObtenerValores_Update(),
            IdUsuario: $("#hdfIdUsuario").val()
        };

        $.ajax({
            type: "POST",
            url: "Adm_MantenimientoDinamico.aspx/Guardar",
            data: JSON.stringify(Guardar_Data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "1") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Guardado con éxito</h1><br/>", document, fnCerrar);
                } else if (result.d == "-1") {
                    alerta("La tabla dinamica no ha sido encontra en la base de datos.");
                } else if (result.d == "-1") {
                    alerta("La tabla historica para la tabla dinamica no ha sido encontrada en la base de datos.");
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });
    //#endregion

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        $("#dvCampo").css("height", Alto - 108);
    }
});

function fnCerrar() {
    indiceTab = window.parent.tab.tabs("option", "selected");
    window.parent.tab.tabs("remove", indiceTab);
}

function fnValidarCampos() {
    var mensaje = '';
    var idcontrol = '';
    $(".VARCHAR").each(function () {
        if ($(this).val() == "") {
            var vCampos = $(this).attr("id").replace("txt_", "").replace("_", " ");
            mensaje = "Debe ingrear un valor para el campos " + vCampos + ".";
            idcontrol = $(this).attr("id");
        }
    });
    $.each($(".INT"), function () {
        if ($(this).val() == "") {
            var vCampos = $(this).attr("id").replace("txt_", "").replace("_", " ");
            mensaje = "Debe ingrear un valor para el campos " + vCampos + ".";
            idcontrol = $(this).attr("id");
        }
    });
    $.each($(".DECIMAL"), function () {
        if ($(this).val() == "") {
            var vCampos = $(this).attr("id").replace("txt_", "").replace("_", " ");
            mensaje = "Debe ingrear un valor para el campos " + vCampos + ".";
            idcontrol = $(this).attr("id");
        }
    });
    $.each($(".DATE"), function () {
        if ($(this).val() == "") {
            var vCampos = $(this).attr("id").replace("txt_", "").replace("_", " ");
            mensaje = "Debe ingrear un valor para el campos " + vCampos + ".";
            idcontrol = $(this).attr("id");
        }
    });
    $.each($(".DATETIME"), function () {
        if ($(this).val() == "") {
            var vCampos = $(this).attr("id").replace("txt_", "").replace("_", " ");
            mensaje = "Debe ingrear un valor para el campos " + vCampos + ".";
            idcontrol = $(this).attr("id");
        }
    });
    $.each($(".BIT"), function () {
        if ($("input[name='" + $(this).attr("id") + "']:checked").val() == undefined) {
            var vCampos = $(this).attr("id").replace("_", " ");
            mensaje = "Debe ingrear un valor para el campos " + vCampos + ".";
            idcontrol = $(this).attr("id");
        }
    });
    return [mensaje, idcontrol];
}

function fnObtenerValores_Insert() {
    var vCampos = '', vValores = '';
    $.each($(".VARCHAR"), function () {
        vCampos = vCampos + "," + $(this).attr("id").replace("txt_", "");
        vValores = vValores + ",$$$" + $(this).val() + "$$$";
    });
    $.each($(".INT"), function () {
        vCampos = vCampos + "," + $(this).attr("id").replace("txt_", "");
        vValores = vValores + "," + DevuelveNumeroSinFormato($(this).val(), oCulturaUsuario, true);
    });
    $.each($(".DECIMAL"), function () {
        vCampos = vCampos + "," + $(this).attr("id").replace("txt_", "");
        vValores = vValores + "," + DevuelveNumeroSinFormato($(this).val(), oCulturaUsuario, false);
    });
    $.each($(".DATE"), function () {
        vCampos = vCampos + "," + $(this).attr("id").replace("txt_", "");
        var FecHor = $(this).val();
        var dia = FecHor.substr(6, 4).toString() + FecHor.substr(3, 2).toString() + FecHor.substr(0, 2).toString();
        vValores = vValores + ",dbo.MOV_f_ConvierteAnsiEnFecha($$$" + dia + "$$$)";
    });
    $.each($(".DATETIME"), function () {
        vCampos = vCampos + "," + $(this).attr("id").replace("txt_", "");
        var FecHor = $(this).val();
        var dia = FecHor.substr(6, 4).toString() + FecHor.substr(3, 2).toString() + FecHor.substr(0, 2).toString();

        //var hora = FecHor.substr(11, 2) + ":" + FecHor.substr(14, 2) + ":" + FecHor.substr(17, 2);
        var hora = $("#" + $(this).attr("id") + "_hora").val();
        vValores = vValores + ",dbo.MOV_f_ConvierteAnsiEnFecha($$$" + dia + " " + hora + "$$$)";
    });
    $.each($(".PICKLIST"), function () {
        vCampos = vCampos + "," + $(this).attr("id").replace("ddl_", "");
        vValores = vValores + "," + $(this).val();
    });
    $.each($(".BIT"), function () {
        vCampos = vCampos + "," + $(this).attr("id");
        vValores = vValores + "," + $("input[name='" + $(this).attr("id") + "']:checked").val();
    });
    return [vCampos, vValores];
}

function fnObtenerValores_Update() {
    var vCamposUpd = '';
    $.each($(".VARCHAR"), function () {
        vCamposUpd = vCamposUpd + ",[" + $(this).attr("id").replace("txt_", "") + "]=" + "$$$" + $(this).val() + "$$$";
    });
    $.each($(".INT"), function () {
        vCamposUpd = vCamposUpd + ",[" + $(this).attr("id").replace("txt_", "") + "]=" + $(this).val();
    });
    $.each($(".DECIMAL"), function () {
        vCamposUpd = vCamposUpd + ",[" + $(this).attr("id").replace("txt_", "") + "]=" + $(this).val();
    });
    $.each($(".DATE"), function () {
        var FecHor = $(this).val();
        var dia = FecHor.substr(6, 4).toString() + FecHor.substr(3, 2).toString() + FecHor.substr(0, 2).toString();
        vCamposUpd = vCamposUpd + ",[" + $(this).attr("id").replace("txt_", "") + "]=dbo.MOV_f_ConvierteAnsiEnFecha($$$" + dia + "$$$)";
    });
    $.each($(".DATETIME"), function () {
        var FecHor = $(this).val();
        var dia = FecHor.substr(6, 4).toString() + FecHor.substr(3, 2).toString() + FecHor.substr(0, 2).toString();

        //var hora = FecHor.substr(11, 2) + ":" + FecHor.substr(14, 2) + ":" + FecHor.substr(17, 2)
        var hora = $("#" + $(this).attr("id") + "_hora").val();
        vCamposUpd = vCamposUpd + ",[" + $(this).attr("id").replace("txt_", "") + "]=dbo.MOV_f_ConvierteAnsiEnFecha($$$" + dia + " " + hora + "$$$)";
    });
    $.each($(".PICKLIST"), function () {
        vCamposUpd = vCamposUpd + ",[" + $(this).attr("id").replace("ddl_", "") + "]=" + $(this).val();
    });
    $.each($(".BIT"), function () {
        //Caratula_Personalizada"
        vCamposUpd = vCamposUpd + ",[" + $(this).attr("id") + "]=" + $("input[name='" + $(this).attr("id") + "']:checked").val();
    });
    //estado
    if ($("#chk_btVig").is(":visible")) {
        vCamposUpd = vCamposUpd + ",[btVig]=" + ($("#chk_btVig").is(":checked") ? "1" : "0");
    }
    return vCamposUpd;
}

function fnValidarFormatoHora() {
    var mensaje = '';
    var control = '';
    $.each($(".TIMECONTROL input"), function () {
        var hora = $(this).val();
        var hms = hora.split(":");
        if (hms.length != 3) {
            mensaje = 'Ingres formato correcto para los tipo de dato hora (hh:mm:ss).';
        } else if (hms[0].length != 2 || hms[1].length != 2 || hms[1].length != 2) {
            mensaje = 'Ingres formato correcto para los tipo de dato hora (hh:mm:ss).';
        } else if (parseInt(hms[0]) > 23 || parseInt(hms[0]) < 0) {
            mensaje = 'El dato hora no puedes ser menor a 0 (cero) o mayor a 23(veintitres).';
        } else if (parseInt(hms[1]) > 59 || parseInt(hms[1]) < 0) {
            mensaje = 'El dato "minutos" no puedes ser menor a 0 o mayor a 59.';
        } else if (parseInt(hms[2]) > 59 || parseInt(hms[2]) < 0) {
            mensaje = 'El dato "segundos" no puedes ser menor a 0 o mayor a 59.';
        }
        if (mensaje != '') { control = $(this).attr("id"); }
    });
    return [mensaje, control];
}

function fnFocusAlert() {
    if (idcontrolfocus != '') {
        $("#" + idcontrolfocus).focus();
    }
}