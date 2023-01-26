
var socket;
//var IPServer = "130.1.7.78";
var IPServer;  // = "118.180.55.32";
var PuertoServer; // = "5555";

$(function () {
    IPServer = $("#hdfIpNode").val();
    PuertoServer = $("#hdfPuertoNode").val();

    iniciarSocket();
    function ObtenerStockProductos(datosServidor) {
        try {
            if ($("#miFrame")[0].contentWindow.productosBase != undefined) {
                $("#miFrame")[0].contentWindow.ObtenerStockProductos(datosServidor);
            }
        }
        catch (e) {
            //some error
        }
    }
    function TiempoRestante(datosServidor) {
        //debugger;
        try {
            if ($("#miFrame").attr("src") == 'Pedido/Dashboard_pedido.aspx') {
                if (fnValidarCamCre()) {
                    $("#miFrame")[0].contentWindow.TiempoRestante(datosServidor);
                }
            }
            else {
                //if (window.location.href.indexOf("Login.aspx")>-1) {
                if (window.location.href.toString().toUpperCase().indexOf("LOGIN.ASPX") > -1 ||
                    window.location.href.toString().toUpperCase().indexOf(".ASPX") < 0) {
                    window.TiempoRestante(datosServidor);
                }
            }
        }
        catch (e) {
            //some error
        }


    }


    function AleatorioNode(data) {
        //$("#aleatorionode").show();
        $("#aleatorionode").html(data);
    }

    function ObtenerMensajeNoLeido(data) {
        try {
            var vUsuario = data.split('|')[0];
            //alert('vUsuario: ' + vUsuario);
            //alert('hfUsuario: ' + $("#hfUsuario").val());
            if ($("#hfUsuario").val() == vUsuario) {
                if ($("iframe[src*='Dashboard_pedido.aspx']").length > 0) {
                    $("iframe[src*='Dashboard_pedido.aspx']")[0].contentWindow.fnActualizarNuevoMensaje(data);
                }
            }
        }
        catch (e) {
            //some error
        }
    }

    function ReciboObjeto(obj) {
        //alert('Codigo: ' + obj.P_vcCod);
    }

    function iniciarSocket() {
        try {
            socket = io.connect("http://" + IPServer + ":" + PuertoServer);
            socket.on("ObtenerStockProductos", ObtenerStockProductos);
            socket.on("TiempoRestante", TiempoRestante);
            socket.on("AleatorioNode", AleatorioNode);
            socket.on("EnviarMensajeUsuarioNoLeido", ObtenerMensajeNoLeido);
            socket.on("ReciboObjeto", ReciboObjeto);
        }
        catch (e) {
            //some error
            //alert(e);
            if (typeof ValidarPorNodeJS != "undefined") {
                if (ValidarPorNodeJS != null) {
                    ValidarPorNodeJS = false;
                }
            }
        }
    }

});


function fnValidarCamCre() {
    var resul = true;

    if (CampanaConf.IdCampana == -1) {
        resul = false;
    }
    else {
        if (CreditoUsuario == undefined) {
            resul = false;
        }
        else {
            if (CreditoUsuario == null || CreditoUsuario.ProductoCreditoAsignado == null || CreditoUsuario.ProductoCreditoAsignado.length == 0) {
                resul = false;
            }
        }
    }

    return resul;
}


