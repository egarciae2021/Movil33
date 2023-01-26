var EsEnlace;
var CodEnlace;
var UsuarioActual = "";

$(function () {
    UsuarioActual = $("#hdfUsuario").val();
});

function MensajeRecibido(msg) {
    //console.log("Mensaje recibido en CierreSignalR");
    if (msg != null && msg.indexOf("|") >= 0) {
        var _CodEnlace = msg.split('|')[0];
        var _UsuarioActual = msg.split('|')[1];
        if (_UsuarioActual != UsuarioActual) {
            if (VentanaModalAbierta == false) {
                var ValorActual = $("#dvChatContador").html();
                if (ValorActual == "") {
                    ValorActual = "0";
                }
                var Contador = parseFloat(ValorActual) + 1;
                $("#dvChatContador").html(Contador);
                $("#dvChatContador").show();
            }
        }
    }
}

function EnviarMensaje(CuerpoMensaje) {
}