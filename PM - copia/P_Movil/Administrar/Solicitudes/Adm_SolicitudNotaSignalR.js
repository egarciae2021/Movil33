var EsEnlace;
var CodEnlace;
var UsuarioActual = "";

$(function () {
    UsuarioActual = $("#hdfUsuario").val();
});

function SolicitudNota_EnviarMensaje(tipoSolicitud, idSolicitud, codigoSolicitud, mensaje, usuario) {
    //Enviar datos via websocket...
    try {
        var _iddominio = window.top.$("#hdfCodigoDominio").val();
        var _mensaje = tipoSolicitud + '|' + codigoSolicitud + '|' + usuario + '|' + mensaje;
        window.top.ChatHubSignal.server.sendMessageSolicitudNota(_iddominio, idSolicitud, _mensaje);
    } catch (e) {
        //
    }
}

function SolicituNota_MensajeRecibido(_idsolicitud, msg) {

    //Escalado|SSINU0000000027|titular|agccccc
    if (msg != null && msg.indexOf("|") >= 0) {

        var TipoSolicitudActual = $("#ddlOrigen").val();  //0: Usuario, 1: Operador
        if (TipoSolicitudActual == "1") {
            TipoSolicitudActual = "Escalado";
        }
        else {
            TipoSolicitudActual = "Interno";
        }

        var _tipoSolicitud = msg.split('|')[0];
        var _codigoSolicitud = msg.split('|')[1];
        var _UsuarioActual = msg.split('|')[2];
        var _Texto = msg.split('|')[3];
        //if (_UsuarioActual != UsuarioActual) {

        if (TipoSolicitudActual == _tipoSolicitud) {

            if (TipoSolicitudActual == 'Escalado') {
                $("#PnlDetallesOperador").append('<div class="NotaOperador"><div><img src="../../../Common/Images/nota16x16.png"><div>Nota creada el ' + window.top.moment().format('DD/MM/YYYY HH:mm') + ' por ' + _UsuarioActual + '</div></div><div></div><div>' + _Texto + '</div></div>');
                $("#PnlDetallesOperador").scrollTop(1000000);
            }
            else {
                $("#PnlDetalles").append('<div class="NotaOperador"><div><img src="../../../Common/Images/nota16x16.png"><div>Nota creada el ' + window.top.moment().format('DD/MM/YYYY HH:mm') + ' por ' + _UsuarioActual + '</div></div><div></div><div>' + _Texto + '</div></div>');
                $("#PnlDetalles").scrollTop(1000000);
            }
            
        }

        //Actualizarlo como visto...
        //$.ajax({
        //    url: "ValidarNota.aspx/ActualizarVisto",
        //    data: "{'Periodo':'" + $("#hdfPeriodo").val() + "','CodEnlace':'" + CodEnlace + "'}",
        //    dataType: "json",
        //    type: "post",
        //    contentType: "application/json; charset=utf-8",
        //    success: function (result) {
        //    },
        //    error: function (xhr, err, thrErr) {
        //        MostrarErrorAjax(xhr, err, thrErr);
        //    }
        //});
        // }
    }
}