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
    //console.log("Mensaje recibido en ValidarSignalR");
    if (msg != null && msg.indexOf("|") >= 0) {
        var _CodEnlace = msg.split('|')[0];
        var _UsuarioActual = msg.split('|')[1];
        if (_UsuarioActual != UsuarioActual && CodEnlace == _CodEnlace) {
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