var EsEnlace;
var CodEnlace;
var UsuarioActual = "";

$(function () {
    UsuarioActual = $("#hdfUsuario").val();
    CodEnlace = $("#hdfCodEnlace").val();
});

function EnviarMensaje(CuerpoMensaje) {
}

function MensajeRecibido(msg) {
    //console.log("Mensaje recibido en CierreNotaSignalR");
    if (msg != null && msg.indexOf("|") >= 0) {
        var _CodEnlace = msg.split('|')[0];
        var _UsuarioActual = msg.split('|')[1];

        if (_UsuarioActual != UsuarioActual && EnlaceSeleccionado != _CodEnlace) {
            var ValorActual = $("#dvChatContador_" + _CodEnlace).html();
            if (ValorActual == "") {
                ValorActual = "0";
            }
            var Contador = parseFloat(ValorActual) + 1;
            $("#dvChatContador_" + _CodEnlace).html(Contador);
            $("#dvChatContador_" + _CodEnlace).show();
        }
        try {
            window.parent.ActualizarNoLeidos();
        } catch (e) {
        }
    }
}