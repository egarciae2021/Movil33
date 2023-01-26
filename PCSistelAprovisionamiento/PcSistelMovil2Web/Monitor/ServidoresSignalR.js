var chat = null;
var MonitorHubSignal = null;

$(function () {
    try {
        MonitorHubSignal = $.connection.monitorHub;
        //MonitorHubSignal.client.addMessageConectado = function (msg) {
        //    //console.log("addMessageConectado", msg);
        //    if (msg != null && msg.indexOf("|") >= 0) {
        //        var _UsuarioActual = msg.split('|')[0];
        //        var _Mensaje = msg.split('|')[1];
        //        if (_UsuarioActual != UsuarioActual) {
        //            //console.log(Date() + ": " + _Mensaje);
        //        }
        //    }
        //};

        MonitorHubSignal.client.addMessage = function (msg) {
            //console.log("msg: ", msg);
            try {
                mensajeSignalRRecibido(msg);
            } catch (e) {
            }
        };

        $.connection.hub.url =  $("#hfpathSignalRPCSistel").val() + "signalr";
        $.connection.hub.start().done(function () {
        });

    } catch (e) {
    }

});

