var VentanaNotaSignalRActiva = false;
var chat = null;
var EsEnlace;
var CodEnlace;
var UsuarioActual = "";
var ChatHubSignal = null;
var AlertHubSignal = null;
var EsResponsableTI;
var signalRCore = signalR;


var connectionSignalCore = new signalR.HubConnectionBuilder()
    .withUrl("https://mimovil.pcsistel.com/PCSistelSignalSecurity/signalr")
    .configureLogging(signalR.LogLevel.Information)
    .build();

$(function () {

    //start();

    UsuarioActual = $("#hfNombreUsuario").val();
    EmpleadoActual = $("#hfCodEmpleado").val();
    EsResponsableTI = $("#hfEsResponsableTI").val();

    try {
        ChatHubSignal = $.connection.chatHub;
        AlertHubSignal = $.connection.alertHub;

        ChatHubSignal.client.addMessageConectado = function (msg) {
            //console.log("addMessageConectado", msg);
            if (msg != null && msg.indexOf("|") >= 0) {
                var _UsuarioActual = msg.split('|')[0];
                var _Mensaje = msg.split('|')[1];
                if (_UsuarioActual != UsuarioActual) {
                    //console.log(Date() + ": " + _Mensaje);
                }
            }
        };

        ChatHubSignal.client.addMessage = function (msg) {
            try {
                MensajeRecibido(msg);
            } catch (e) {
            }

            try {
                $("#ifNota")[0].contentWindow.MensajeRecibido(msg);
            } catch (e) {
            }
            try {
                var ifContenido = $("#ifNota");
                var ifNota = $('#ifNota', ifContenido.contents());
                ifNota[0].contentWindow.MensajeRecibido(msg);
            } catch (e) {
            }

            try {
                $("iframe[src='P_Movil/Conciliar/Cierre.aspx?inCod=5611&inTip=3&inTipOri=0']")[0].contentWindow.MensajeRecibido(msg);
            } catch (e) {
            }

            try {
                $("iframe[src='P_Movil/Conciliar/Validar.aspx?inCod=5610&inTip=3&inTipOri=0']")[0].contentWindow.MensajeRecibido(msg);
            } catch (e) {
            }

            try {
                var ifContenido = $("iframe[src='P_Movil/Conciliar/Cierre.aspx?inCod=5611&inTip=3&inTipOri=0']");
                var ifNotaPadre = $('#ifNota', ifContenido.contents());
                ifNotaPadre[0].contentWindow.MensajeRecibido(msg);
            } catch (e) {
            }

            try {
                var ifContenido = $("iframe[src='P_Movil/Conciliar/Cierre.aspx?inCod=5611&inTip=3&inTipOri=0']");
                var ifNotaPadre = $('#ifNota', ifContenido.contents());
                var ifNotaHijo = $('#ifNota', ifNotaPadre.contents());
                ifNotaHijo[0].contentWindow.MensajeRecibido(msg);
            } catch (e) {
            }

            try {
                var ifContenido = $("iframe[src='P_Movil/Conciliar/Validar.aspx?inCod=5610&inTip=3&inTipOri=0']");
                var ifNota = $('#ifNota', ifContenido.contents());
                ifNota[0].contentWindow.MensajeRecibido(msg);
            } catch (e) {
            }

        };
        
        ChatHubSignal.client.addMessageSolicitudNota = function (_idsolicitud, _mensaje) {
            try {
                SolicitudNota_MensajeRecibido(_idsolicitud, _mensaje);
            } catch (e) {
            }
            try {

                var ifProducto = $("#ifProducto");
                var ifContenido = $("iframe[src='P_Movil/Administrar/Solicitudes/Adm_ListadoSolicitudes.aspx?vcTab=&inCod=4&inTip=4&inTipOri=1']", ifProducto.contents());
                var ifNotaPadre = $('#ifNota', ifContenido.contents());
                ifNotaPadre[0].contentWindow.SolicituNota_MensajeRecibido(_idsolicitud, _mensaje);
            } catch (e) {
            }
        };

        ChatHubSignal.client.AddMessageSolicitudModificada = function (_idsolicitud, _mensaje) {
            //try {
            //    SolicitudNota_MensajeRecibido(_idsolicitud, _mensaje);
            //} catch (e) {
            //}
            try {

                var ifProducto = $("#ifProducto");
                var ifContenido = $("iframe[src='P_Movil/Administrar/Solicitudes/Adm_ListadoSolicitudes.aspx?vcTab=&inCod=4&inTip=2&inTipOri=1']", ifProducto.contents());
                ifContenido[0].contentWindow.refrescarGrilla();
            } catch (e) {
            }
        };

        AlertHubSignal.client.RefreshAlerts = function () {
            //debugger;
            try {
                //llamar a una función que se encarque de volver a setear las notas :'v
                window.top.recargarAlertas();
            } catch (e) {
                //no hay nada que ver :p 
            }
        };

        $.connection.hub.url =  $("#hfpathSignalRPCSistel").val() + "signalr";
        $.connection.hub.start().done(function () {

            //ChatHubSignal.server.ingresarGrupo("6057");
            //AlertHubSignal.server.ingresarGrupo("6057");
            ChatHubSignal.server.ingresarGrupo(window.top.$("#hdfCodigoDominio").val());
            AlertHubSignal.server.ingresarGrupo(window.top.$("#hdfCodigoDominio").val());


            //setInterval(function () {
            //    //var _mensaje = this.state.selectedTipo + '|' + this.props.solicitud.CodigoSolicitud + '|' + Usuario.vcUsu + '|' + mensaje;
            //    //Interno, Escalado.

            //    var mensaje = "Cualquie mensaje";
            //    var tipoSolicitud = "Escalado";
            //    var _mensaje = tipoSolicitud + '|' + "SSINU0000000027" + '|' + UsuarioActual + '|' + mensaje;

            //    console.log(_mensaje);

            //    ChatHubSignal.server.sendMessageSolicitudNota("23029", _mensaje);
            //}, 5000);

        });

    } catch (e) {
        //do nothing
    }

    if (connectionSignalCore.state === signalR.HubConnectionState.Disconnected) {
        startSignalCore();
    }


});

async function startSignalCore(callback) {
    try {
        await connectionSignalCore.start();
        if (callback != undefined || callback != null) {
            callback();
        }
    } catch (err) {
        //alert(err);
        console.log(err);
        //setTimeout(start, 5000);
    }
};

function SolicitudNota_MensajeRecibido(_idsolicitud, msg) {
    if (msg != null && msg.indexOf("|") >= 0) {
        var _TipoSolicitud = msg.split('|')[0];
        var _codigoSolicitud = msg.split('|')[1];
        var _UsuarioEmisor = msg.split('|')[2];
        var _Mensaje = msg.split('|')[3];
        var TieneFoco = document.hasFocus();
        window.top.recargarAlertas();
        if (VentanaNotaSignalRActiva == false) { // || TieneFoco == false) {
            if (NotificacionesSolicitudes.length == 0) {
                NotificacionesSolicitudes.push({ "Mensaje": "Notas nuevas en solicitudes" });

                $(".badge-header").removeClass("hidden");
                var arNotificaciones = JSON.parse(localStorage.getItem("notificaciones_" + $("#hfCodEmpleado").val()));
                for (var n = 0; n < arNotificaciones.length; n++) {
                    if (arNotificaciones[n].n == "Notas nuevas en solicitudes") {
                        arNotificaciones[n].v = true;
                    }
                }
            } else {

                $(".badge-header").removeClass("hidden");
                var arNotificaciones = JSON.parse(localStorage.getItem("notificaciones_" + $("#hfCodEmpleado").val()));
                for (var n = 0; n < arNotificaciones.length; n++) {
                    if (arNotificaciones[n].n == "Notas nuevas en solicitudes") {
                        arNotificaciones[n].v = true;


                        arNotificaciones[n].c = arNotificaciones[n].c + 1;
                        localStorage.setItem("notificaciones_" + $("#hfCodEmpleado").val(), JSON.stringify(arNotificaciones));
                        for (var i = 0; i < NotificacionesSolicitudes.length; i++) {
                            if (NotificacionesSolicitudes[i].Mensaje.startsWith("Notas nuevas en solicitudes")) {
                                NotificacionesSolicitudes[i].Mensaje = "Notas nuevas en solicitudes" + " (" + (arNotificaciones[n].c).toString() + ") ";
                            }
                        }
                    }
                }
            }
            ExisteNoLeidos = true;
            if ($("#hfNombreUsuario").val() != _UsuarioEmisor) {
                if (_TipoSolicitud == "Escalado") {
                    alerta(_UsuarioEmisor + " dice: " + _codigoSolicitud + '-' + _Mensaje, "Mensaje del Operador");
                }
                else {
                    alerta(_codigoSolicitud + '-' + _Mensaje, "Mensaje de " + _UsuarioEmisor);                    
                }
            }

        }
    }
}

function MensajeRecibido(msg) {
    if (msg != null && msg.indexOf("|") >= 0) {
        var _CodEnlace = msg.split('|')[0];
        var _UsuarioActual = msg.split('|')[1];
        var _Mensaje = msg.split('|')[3];
        var _UsuarioEmisor = msg.split('|')[4];
        var TieneFoco = document.hasFocus();
        if (VentanaNotaSignalRActiva == false || TieneFoco == false) {
            if (_UsuarioActual != UsuarioActual) {
                if (EmpleadoActual == _CodEnlace) {
                    showNotification(_UsuarioEmisor + ": " + _Mensaje);
                }
                else {
                    if (EsResponsableTI == "1") {
                        showNotification(_UsuarioEmisor + ": " + _Mensaje);
                    }
                }
            }
        }
    }
}

function showNotification(Mensaje) {
    if (Mensaje == null || Mensaje == "") {
        return;
    }
    try {
        if (WebNotifications.areSupported()) {
            //if (WebNotifications.currentPermission() === WebNotifications.permissions.granted) {
            var notif = WebNotifications.new('Gestión Móvil', Mensaje, "P_Movil/Conciliar/images/user_48x48.png", null, 5000, fnClick);
            //}
        }
    } catch (e) {
        //console.log(e);
    }
}

var VentanaModalAbierta = false;
function fnClick() {
    if (VentanaModalAbierta || VentanaNotaSignalRActiva) { return; }

    if (EsResponsableTI == "1") {
        var Periodo = $("#hdfPeriodoConciliacion").val();
        var Mes = Periodo.substring(4, 6);
        var Anio = Periodo.substring(0, 4);
        //$("#dvChatContador").hide();
        $('#ifNota').attr("src", "P_Movil/Conciliar/CierreNota.aspx?Periodo=" + Periodo);
        $('#ifNota').width(1050);
        VentanaModalAbierta = true;
        VentanaNotaSignalRActiva = true;
        var formulario = $('#dvNota').dialog({
            title: "Notas - Facturación " + Mes + "/" + Anio,
            height: 570,
            width: 1040,
            resizable: false,
            modal: true,
            close: function (event, ui) {
                VentanaModalAbierta = false;
                VentanaNotaSignalRActiva = false;
                $('#ifNota').attr("src", "");
            }
        });
    }
    else {
        var Enlace = $("#hdfCodEnlace").val();
        var Periodo = $("#hdfPeriodoConciliacion").val();
        var Mes = Periodo.substring(4, 6);
        var Anio = Periodo.substring(0, 4);
        //$("#dvChatContador").hide();
        //$("#dvChatContador").html("");
        $('#ifNota').width(670);
        $('#ifNota').attr("src", "P_Movil/Conciliar/ValidarNota.aspx?Periodo=" + Periodo + "&Enlace=" + Enlace + "&EsEnlace=1");
        VentanaNotaSignalRActiva = true;
        VentanaModalAbierta = true;
        var formulario = $('#dvNota').dialog({
            title: "Notas - Facturación " + Mes + "/" + Anio,
            height: 570,
            width: 703,
            resizable: false,
            modal: true,
            close: function (event, ui) {
                VentanaModalAbierta = false;
                VentanaNotaSignalRActiva = false;
            }
        });
    }

}

function alerta(contenido, Titulo, fnCerrar, tipo) {
    try {
        var _tipo = tipo || "success";

        if (contenido.toLowerCase().indexOf("debe ") >= 0 || contenido.toLowerCase().indexOf("no es válido") >= 0) {
            _tipo = "warning";
        }

        window.top.$.niftyNoty({
            type: _tipo,
            container: "floating",
            title: Titulo,
            message: contenido,
            closeBtn: true,
            focus: true,
            timer: ((_tipo == 'danger' || (typeof fnCerrar != 'undefined' && fnCerrar != null)) ? 0 : 2500),
            onHide: function () {
                try {
                    fnCerrar();
                } catch (e) {
                }
            }
        });

    } catch (e) {
        //alertaVersion31(contenido, Titulo, fnCerrar);
    }
}

//function SolicitudModificada_EnviarMensaje(idSolicitud, mensaje, usuario) {
//    //Enviar datos via websocket...
//    try {
//        var _iddominio = window.top.$("#hdfCodigoDominio").val();
//        var _mensaje = usuario + '|' + mensaje;
//        window.top.ChatHubSignal.server.sendMessageSolicitudModificada(_iddominio, idSolicitud, _mensaje);
//    } catch (e) {
//        //
//    }
//}

function SignalCore_fnSincronizarTodos(idgateway) {
    try {
        if (connectionSignalCore.state === signalRCore.HubConnectionState.Connected) {
            connectionSignalCore.invoke("SynchronizeInAllGroup", idgateway.toString());
        }
    } catch (err) {
        //alert(err);
        console.log(err);
    }
}

function SignalCore_fnSincronizarDispositivo(idgateway, authtoken) {
    try {
        if (connectionSignalCore.state === signalRCore.HubConnectionState.Connected) {
            connectionSignalCore.invoke("SynchronizeInAllDevice", idgateway, authtoken);
        }
    } catch (err) {
        //alert(err);
        console.log(err);
    }
}