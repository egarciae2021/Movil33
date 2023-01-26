var EsEnlace;
var CodEnlace;
var UsuarioActual = "";

$(function () {

    EsEnlace = $("#hdfEsEnlace").val();
    UsuarioActual = $("#hdfUsuario").val();
    CodEnlace = $("#hdfCodEnlace").val();

});

function EnviarMensaje(CuerpoMensaje, SoloMensaje, Usuario) {
    //Enviar datos via websocket...
    try {
        window.top.ChatHubSignal.server.sendMessage(CodEnlace + "|" + UsuarioActual + "|" + CuerpoMensaje + "|" + SoloMensaje + "|" + Usuario);
    } catch (e) {
        //
    }
}

function MensajeRecibido(msg) {
    //console.log("Mensaje recibido en ValidarNotaSignalR");
    if (msg != null && msg.indexOf("|") >= 0) {
        var _CodEnlace = msg.split('|')[0];
        var _UsuarioActual = msg.split('|')[1];
        var _Texto = msg.split('|')[2];
        if (_UsuarioActual != UsuarioActual) {
            if (_CodEnlace == CodEnlace) {
                $("#PnlDetalles").append(_Texto);
                $("#PnlDetalles").scrollTop(1000000);
                //Actualizarlo como visto...
                //debugger;
                $.ajax({
                    url: "ValidarNota.aspx/ActualizarVisto",
                    data: "{'Periodo':'" + $("#hdfPeriodo").val() + "','CodEnlace':'" + CodEnlace + "','Operador':'" + $("#hdfOperador").val() + "'}",
                    dataType: "json",
                    type: "post",
                    contentType: "application/json; charset=utf-8",
                    success: function (result) {
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });

            }
        }
    }
}