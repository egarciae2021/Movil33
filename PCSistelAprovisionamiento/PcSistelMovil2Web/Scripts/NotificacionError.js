var Intervalo;

$(document).ready(function () {
  $('#closebutton').click(function () { $('#msg1').notificationmsg('hide'); });
});

function fnMostrarVentana(ventanaHija) {
    clearInterval(Intervalo);
    ventanaHija.document.getElementById("hdJsonNotificacion").value = ventanaHija.document.getElementById("hdJsonNotificacion").value.replace(/'/g, "\"").replace(/\\/g, "/").replace(/[()]/g, "");
    var Datos = JSON.parse(ventanaHija.document.getElementById("hdJsonNotificacion").value);

    $("#lblFecha").html(Datos.Fecha);
    $("#lblError").html(Datos.Error);
    $("#lblProducto").html(Datos.Producto);
    $("#lblModulo").html(Datos.Modulo);
    $("#lblMetodo").html(Datos.Metodo);
    $("#lblPagina").html(Datos.Pagina);
    $("#lblDetalle").val(Datos.Detalle);
    var animStyle = 'slide';
    $("#modalbody").text("(20)");
    $('#msg1').notificationmsg({ animation: animStyle, period: 7000 });
    $('#msg1').notificationmsg('show');
    $("#Detalle").hide();

}

fnMostrarDetalleError = function () {
  $("#Cuerpo").hide();
  $("#Detalle").show();
}

fnMostrarErrorOriginal = function () {
  $("#Detalle").hide();
  $("#Cuerpo").show();
}