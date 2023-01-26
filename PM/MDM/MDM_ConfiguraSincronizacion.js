var oCulturaUsuario;
var inFilas;
var nuAltoFila = 23.04;
var ArrayPaginacion = [];
var ModalDispositivos;
var ModalAplicaciones;
var today = '';
var condicion = '';
var textogeneralcorreo = '';

$(document).ready(function () {

    $(".txthora").AnyTime_picker({
        format: "%H:%i:%s",
        labelTitle: "Hora",
        labelHour: "Hora",
        labelMinute: "Minuto",
        labelSecond: "Segundo",
        labelYear: "Año",
        labelMonth: "Mes",
        labelDayOfMonth: "Dia",
        monthAbbreviations: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        dayAbbreviations: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    });

    
    var d = new Date();
    var currMonth = ("0" + d.getMonth()).slice(-2);
    var currYear = d.getFullYear();

    today = currYear + '-' + currMonth + '-' + '01';

    oCulturaUsuario = window.parent.parent.parent.oCulturaUsuario;
    FormInicioDefecto();
    GetConfiguracion();
    CambiaLeyendaColor();

    $("#txtVerde,#txtAmarillo,#txtNaranaja,#txtRojo").keypress(function (event) {
        if (event.keyCode) {
            if (event.keyCode > 47 && event.keyCode < 58)
                return true;
            else
                return false;
        }
        if (event.which) {
            if (event.which > 47 && event.which < 58)
                return true;
            else
                return false;
        }
    });


    $("#chkCorreoVerde,#chkCorreoAmarillo,#chkCorreoNaranja,#chkCorreoRojo").change(function () {
        CadenaEnvioCorreo();
        CadenaCorreoGeneral();
    });

    //$("#txtVerde").on("keydown", function (event) {
    //    debugger;
    //    var a = NumValidacion(event);
    //    if (a) {  } else { $("#lblVerde").text(""); }        
    //});

    $("#txtVerde").change(function () { CambiaLeyendaColorVerde(); });
    $("#txtAmarillo").change(function () { CambiaLeyendaColorAmarillo(); });
    $("#txtNaranaja").change(function () { CambiaLeyendaColorNaranja(); });
    $("#txtRojo").change(function () { CambiaLeyendaColorRojo(); });
});


//function NumValidacion(e) {
//    debugger;
//    key = e.keyCode || e.which;
//    tecla = String.fromCharCode(key).toLowerCase();
//    filtro = '1234567890';
//    especiales = "8-37-39-46";

//    tecla_especial = false
//    for (var i in especiales) {
//        if (key == especiales[i]) {
//            tecla_especial = true;
//            break;
//        }
//    }

//    if (filtro.indexOf(tecla) == -1 && !tecla_especial) {
//        return false;
//    }
//}

function NumValidacion(e) {
    //debugger;
    var key = e.charCode || e.keyCode || 0;
    // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
    // home, end, period, and numpad decimal
    return (
        key == 8 ||
        key == 9 ||
        key == 13 ||
        key == 46 ||
        key == 110 ||
        key == 190 ||
        (key >= 35 && key <= 40) ||
        (key >= 48 && key <= 57) ||
        (key >= 96 && key <= 105));
}

function GetConfiguracion() {
    $.ajax({
        type: "POST",
        url: "MDM_ConfiguraSincronizacion.aspx/ListarconfigSincronizados",
        data: "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            //debugger;
            if ($(result.d).length > 0) {
                var resul = result.d;
                if (resul[0] == "2") {
                    var datos = JSON.parse(resul[1]);
                    $('#ddlConfiguracion').val(datos[0].TIPO);
                    $('#txtVerde').val(datos[0].VERDE);
                    $('#txtAmarillo').val(datos[0].AMARILLO);
                    $('#txtNaranaja').val(datos[0].NARANJA);
                    $('#txtRojo').val(datos[0].ROJO);
                    $('#ddlDiaEnvio').val(datos[0].DIAENVIO);
                    if (datos[0].CORREOENVIO == "0") {
                        $('#txtCorreoEnvio').val('');
                    } else {
                        $('#txtCorreoEnvio').val(datos[0].CORREOENVIO);
                    }

                    var chks = datos[0].CONDICIONREPORTE.toString();
                    condicion = chks;
                    if (chks.indexOf("VERDE") > -1) { $("#chkCorreoVerde").prop("checked", true); } else { $("#chkCorreoVerde").prop("checked", false); }
                    if (chks.indexOf("AMARILLO") > -1) { $("#chkCorreoAmarillo").prop("checked", true); } else { $("#chkCorreoAmarillo").prop("checked", false); }
                    if (chks.indexOf("NARANJA") > -1) { $("#chkCorreoNaranja").prop("checked", true); } else { $("#chkCorreoNaranja").prop("checked", false); }
                    if (chks.indexOf("ROJO") > -1) { $("#chkCorreoRojo").prop("checked", true); } else { $("#chkCorreoRojo").prop("checked", false); }
                    CadenaEnvioCorreo();
                    CadenaCorreoGeneral();
                    $('#txthora').val(datos[0].FECENVIO);
                    $('#txtHoraSincronizacion').val(datos[0].HORASINCRONIZACION);
                }           

            } else {
                
            }
        }, 
        error: function (xhr, err, thrErr) {            
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function FormInicioDefecto() {
    $('#ddlConfiguracion').val('SEMANAS');
    $('#txtVerde').val("0");
    $('#txtAmarillo').val("0");
    $('#txtNaranaja').val("0");
    $('#txtRojo').val("0");
    $('#ddlDiaEnvio').val('LUNES');
    $('#txtCorreoEnvio').val('');
}

function GuardarConfiguracion() {
    var tipo = $('#ddlConfiguracion').val();
    var verde = $('#txtVerde').val();
    var amarillo = $('#txtAmarillo').val();
    var naranja = $('#txtNaranaja').val();
    var rojo = $('#txtRojo').val();
    var diaenvio = $('#ddlDiaEnvio').val();
    var correoenvio = $('#txtCorreoEnvio').val();
    var horaenvio = today + ' ' + $('#txthora').val();
    var diasincronizacion = $('#ddlDiaSincronizacion').val();
    var horasincronizacion = today + ' ' + $('#txtHoraSincronizacion').val();

    $.ajax({
        type: "POST",
        url: "MDM_ConfiguraSincronizacion.aspx/GuardarconfigSincronizados",
        data: "{'tipo': '" + tipo + "', 'verde': '" + verde + "', 'amarillo': '" + amarillo + "', 'naranja': '" + naranja + "', 'rojo': '" + rojo + "', 'diaenvio': '" + diaenvio + "', 'correoenvio': '" + correoenvio + "', 'horaenvio': '" + horaenvio + "', 'condiciones': '" + condicion + "', 'diasincronizacion': '" + diasincronizacion + "', 'horasincronizacion': '" + horasincronizacion +"'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async:false,
        success: function (result) {
            //debugger;
            alerta("Se aplicó la configuración.");
            window.parent.location.reload();

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function CambiaLeyendaColor() {
    CambiaLeyendaColorVerde();
    CambiaLeyendaColorAmarillo();
    CambiaLeyendaColorNaranja();
    CambiaLeyendaColorRojo();
}

function CambiaLeyendaColorVerde() {
    //debugger;
    var tipo = $('#ddlConfiguracion').val();
    var txtlbl = "";
    if (tipo == "SEMANAS") { txtlbl = "semana(s)"; } else { txtlbl = "día(s)"; }
    if (tipo == "SEMANAS") { tipo = "Semanas"; } else { tipo = "Días"; }
    var verde = $('#txtVerde').val();
    var amarillo = $('#txtAmarillo').val();
    $('#lblVerde').text(' >= ' + verde + ' ' + tipo + ' ' + ' < '+amarillo);    
}

function CambiaLeyendaColorAmarillo() {
    var tipo = $('#ddlConfiguracion').val();
    var txtlbl = "";
    if (tipo == "SEMANAS") { txtlbl = "semana(s)"; } else { txtlbl = "día(s)"; }
    if (tipo == "SEMANAS") { tipo = "Semanas"; } else { tipo = "Días"; }
    var amarillo = $('#txtAmarillo').val();
    var naranja = $('#txtNaranaja').val();
    $('#lblAmarillo').text(' >= ' + amarillo + ' ' + tipo + ' ' + ' < ' + naranja);
}

function CambiaLeyendaColorNaranja() {
    var tipo = $('#ddlConfiguracion').val();
    var txtlbl = "";
    if (tipo == "SEMANAS") { txtlbl = "semana(s)"; } else { txtlbl = "día(s)"; }
    if (tipo == "SEMANAS") { tipo = "Semanas"; } else { tipo = "Días"; }
    var naranja = $('#txtNaranaja').val();
    var rojo = $('#txtRojo').val();
    $('#lblNaranja').text(' >= ' + naranja + ' ' + tipo + ' ' + ' < ' + rojo);
}

function CambiaLeyendaColorRojo() {
    var tipo = $('#ddlConfiguracion').val();
    var txtlbl = "";
    if (tipo == "SEMANAS") { txtlbl = "semana(s)"; } else { txtlbl = "día(s)"; }
    if (tipo == "SEMANAS") { tipo = "Semanas"; } else { tipo = "Días"; }
    var rojo = $('#txtRojo').val();
    $('#lblRojo').text(' >= ' + rojo + ' ' + tipo + ' ');
}

function CadenaEnvioCorreo() {
    condicion = '';
   
    if ($('#chkCorreoVerde').is(':checked')) { if (esprimero()) { condicion = "|VERDE|"; } else { condicion = condicion + ",|VERDE|"; } }
    if ($('#chkCorreoAmarillo').is(':checked')) { if (esprimero()) { condicion = "|AMARILLO|"; } else { condicion = condicion + ",|AMARILLO|"; } }
    if ($('#chkCorreoNaranja').is(':checked')) { if (esprimero()) { condicion = "|NARANJA|"; } else { condicion = condicion + ",|NARANJA|"; } }
    if ($('#chkCorreoRojo').is(':checked')) { if (esprimero()) { condicion = "|ROJO|"; } else { condicion = condicion + ",|ROJO|"; } }
}

function CadenaCorreoGeneral() {
    textogeneralcorreo = '';
    textogeneralcorreo_ANT = '* El reporte enviado por correo incluirá información para los colores: ';

    if ($('#chkCorreoVerde').is(':checked')) { if (esprimero_CadenaCorreo()) { textogeneralcorreo = "Verde"; } else { textogeneralcorreo = textogeneralcorreo + ",Verde"; } }
    if ($('#chkCorreoAmarillo').is(':checked')) { if (esprimero_CadenaCorreo()) { textogeneralcorreo = "Amarillo"; } else { textogeneralcorreo = textogeneralcorreo + ",Amarillo"; } }
    if ($('#chkCorreoNaranja').is(':checked')) { if (esprimero_CadenaCorreo()) { textogeneralcorreo = "Naranja"; } else { textogeneralcorreo = textogeneralcorreo + ",Naranja"; } }
    if ($('#chkCorreoRojo').is(':checked')) { if (esprimero_CadenaCorreo()) { textogeneralcorreo = "Rojo"; } else { textogeneralcorreo = textogeneralcorreo + ",Rojo"; } }

    if (textogeneralcorreo.length > 0) {
        textogeneralcorreo = textogeneralcorreo_ANT + textogeneralcorreo;
    } else {
        textogeneralcorreo = '* No hay colores incluidos para el envío de reporte.';
    }

    $('#lblGeneralCorreo').text(textogeneralcorreo);
}

function esprimero() {
    var primero = false;
    if (condicion.length > 0) { primero = false; } else { primero = true; }

    return primero;
}

function esprimero_CadenaCorreo() {
    var primero = false;
    if (textogeneralcorreo.length > 0) { primero = false; } else { primero = true; }

    return primero;
}