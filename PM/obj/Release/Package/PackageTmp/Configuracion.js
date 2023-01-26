var JSON = JSON || {}; // si el objeto JSON no está definido, creo un objeto.
// implemento stringify para navegadores viejos.
// Si es un navegador nuevo, se usa el stringify nativo
JSON.stringify = JSON.stringify || function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string") { obj = '"' + obj + '"'; }
        return String(obj);
    }
    else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n]; t = typeof (v);
            if (t == "string") { v = '"' + v + '"'; }
            else if (t == "object" && v !== null) { v = JSON.stringify(v); }
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};

// implemento JSON.parse para navegadores viejos.
// Si es un navegador nuevo, se usa el parse nativo
JSON.parse = JSON.parse || function (str) {
    if (str === "") { str = '""'; }
    eval("var p=" + str + ";");
    return p;
};

function MostrarErrorAjax(xhr, err, thrErr) {
    var r = jQuery.parseJSON(xhr.responseText);
    if (r == null) {
        r = xhr.statusText;
        if (r == null || r == '') {
            alerta("Error Genérico");
        }
        else {
            alerta("Message: " + r + ". Codigo: " + xhr.status);
        }
    }
    else {
        alerta("Message: " + r.Message);
    }
    $("#dvContenidoAlerta,#ui-dialog-title-dvMsgAlerta,.ui-button-text").css({ "font-size": "70%" });
    //    alerta("StackTrace: " + r.StackTrace);
    //    alerta("ExceptionType: " + r.ExceptionType);
    //    alerta("ERROR" + xhr.d);
}

$(document).ajaxStart(function () {
    $("#Capa").show();
    $("#dvCargando").show();
});
$(document).ajaxStop(function () {
    $("#Capa").hide();
    $("#dvCargando").hide();
});



/*****29/12/2015    :   RURBINA*****/
var txtUser = "Tu Usuario...";
//var txtPass = "Tu Contraseña..."

$(function () {
    Dimensionar();

    $(window).resize(function () {
        Dimensionar();
    });

    function Dimensionar() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        $("#tbConenido").css({ width: Ancho - 24, height: Alto - 24 });
    }

    $("#dvConfiguracion").click(function () {
        window.location.href = "login.aspx";
    });

    $("#rbtnSeguridadIntegrada").change(function () {
        $("#trUsuario").hide();
        $("#trContraseña").hide();
        $("#dvPanelConfiguracion").css("height", $("#dvPanelConfiguracion").height() - 50);
    });

    $("#rbtnUsarioContraseña").change(function () {
        $("#trUsuario").show();
        $("#trContraseña").show();
        $("#dvPanelConfiguracion").css("height", $("#dvPanelConfiguracion").height() + 62);
    });

    function ProbarConexion(Autenticacion, Servidor, Usuario, Password, BaseDatos) {
        $.ajax({
            type: "POST",
            url: "Common/WebService/General.asmx/ComprobarConexion",
            data: "{'Servidor': '" + Servidor + "'," +
                           "'Autenticacion': '" + Autenticacion + "'," +
                           "'Usuario': '" + Usuario + "'," +
                           "'Password': '" + Password + "'," +
                           "'BaseDatos': '" + BaseDatos + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != "") {
                    alerta("Error en la prueba de conexión, verifique los parámetros y la conexión con el servidor");
                }
                else {
                    alerta("La prueba de conexión fue satisfactoria.");
                }
                //$("#dvContenidoAlerta,#ui-dialog-title-dvMsgAlerta,.ui-button-text").css({ "font-size": "70%" });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    }

    $("#btnProbarConexion").click(function () {
        var Autenticacion;

        if ($("input[name=AutenticacionRbtn]:checked").val() == 'rbtnSeguridadIntegrada') {
            Autenticacion = "SI";
        }
        else {
            Autenticacion = "UP";
        }

        ProbarConexion(Autenticacion, $("#txtServidor").val().replace('\\', '\\\\'), $("#txtUsuario").val().replace('\\', '\\\\'),
                               $("#txtContraseña").val().replace('\\', '\\\\'), $("#txtBaseDatos").val().replace('\\', '\\\\'));
    });

    $("#tbConenido").show();


    $("#btnGuardar").click(function () {
        var Autenticacion;
        var AutenticacionUsuario;

        if ($("input[name=AutenticacionRbtn]:checked").val() == 'rbtnSeguridadIntegrada') {
            Autenticacion = "SI";
        }
        else {
            Autenticacion = "UP";
        }

        $.ajax({
            type: "POST",
            url: "Common/WebService/General.asmx/GuardarConfiguracionBase",
            data: "{'Servidor': '" + $("#txtServidor").val().replace('\\', '\\\\') + "'," +
                           "'Autenticacion': '" + Autenticacion + "'," +
                           "'Usuario': '" + $("#txtUsuario").val().replace('\\', '\\\\') + "'," +
                           "'Password': '" + $("#txtContraseña").val().replace('\\', '\\\\') + "'," +
                           "'BD': '" + $("#txtBaseDatos").val().replace('\\', '\\\\') + "'," +
                           "'AutenticacionUsuario': '" + $("input[name=rblstAutenticacion]:checked").val() + "'," +
                           "'RutaLDAP':'" + $("#txtLDAP").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != "") {
                    alerta("Error al intentar guardar la configuración");
                }
                else {
                    alerta("Configuración guardada.");
                }
                //$("#dvContenidoAlerta,#ui-dialog-title-dvMsgAlerta,.ui-button-text").css({ "font-size": "70%" });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    $("#rbtnSeguridadIntegradaDatos").change(function () {
        $("#trUsuarioDatos").hide();
        $("#trContraseñaDatos").hide();
        $("#dvPanelConfiguracion").css("height", $("#dvPanelConfiguracion").height() - 50);
    });

    $("#rbtnUsarioContraseñaDatos").change(function () {
        $("#trUsuarioDatos").show();
        $("#trContraseñaDatos").show();
        $("#dvPanelConfiguracion").css("height", $("#dvPanelConfiguracion").height() + 62);
    });

    $("#btnCargarDatosBase").click(function () {
        $.ajax({
            type: "POST",
            url: "Common/WebService/General.asmx/CargarConfiguracionDatos",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != "") {
                    var Parametros = result.d.split(",");

                    $("#txtServidorDatos").val(Parametros[0]);
                    $("#txtBaseDatosDatos").val(Parametros[4]);

                    if (Parametros[1] == "1") {
                        $("#txtUsuarioDatos").val("");
                        $("#txtContraseñaDatos").val("");
                    }
                    else {
                        $("#txtUsuarioDatos").val(Parametros[2]);
                        $("#txtContraseñaDatos").val(Parametros[3]);
                        $("#rbtnSeguridadIntegradaDatos").val();
                        $("#rbtnUsarioContraseñaDatos").val();
                    }
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    $("#btnProbarConexionDatos").click(function () {
        var Autenticacion;

        if ($("input[name=AutenticacionDatosRbtn]:checked").val() == 'rbtnSeguridadIntegradaDatos') {
            Autenticacion = "SI";
        }
        else {
            Autenticacion = "UP";
        }

        ProbarConexion(Autenticacion, $("#txtServidorDatos").val().replace('\\', '\\\\'), $("#txtUsuarioDatos").val().replace('\\', '\\\\'),
                               $("#txtContraseñaDatos").val().replace('\\', '\\\\'), $("#txtBaseDatosDatos").val().replace('\\', '\\\\'));
    });

    $("#btnGuardarDatos").click(function () {
        var Autenticacion;

        if ($("input[name=AutenticacionDatosRbtn]:checked").val() == 'rbtnSeguridadIntegradaDatos') {
            Autenticacion = "SI";
        }
        else {
            Autenticacion = "UP";
        }
        $.ajax({
            type: "POST",
            url: "Common/WebService/General.asmx/GuardarConfiguracionDatos",
            data: "{'Servidor': '" + $("#txtServidorDatos").val().replace('\\', '\\\\') + "'," +
                           "'Autenticacion': '" + Autenticacion + "'," +
                           "'Usuario': '" + $("#txtUsuarioDatos").val().replace('\\', '\\\\') + "'," +
                           "'Password': '" + $("#txtContraseñaDatos").val().replace('\\', '\\\\') + "'," +
                           "'BD': '" + $("#txtBaseDatosDatos").val().replace('\\', '\\\\') + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != "") {
                    alerta("Error al intentar guardar la configuración");
                }
                else {
                    alerta("Configuración guardada.");
                }
                //$("#dvContenidoAlerta,#ui-dialog-title-dvMsgAlerta,.ui-button-text").css({ "font-size": "70%" });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    $('#rblstAutenticacion').change(function () {
        var TipoAutenticacion = $("input[name=rblstAutenticacion]:checked").val();
        if (TipoAutenticacion == "2") {
            $("#divldap").show();
            $("#txtLDAP").focus();
        }
        else {
            $("#divldap").hide();
        }
    });

    $("#dvContenidoAlerta,#ui-dialog-title-dvMsgAlerta,.ui-button-text").css({ "font-size": "70%" });
});
function btnGuardar_onclick() {

}



