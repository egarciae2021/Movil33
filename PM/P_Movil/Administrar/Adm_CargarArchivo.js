
$(function () {
    $(".btnNormal").button();

    $("#btnSubir").height(24);

    var nombreadjunto = $("#hdfNombreAdjungo").val().toString();
    var tamanoadjunto = $("#hdfTamañoAdjunto").val();
    var ubicacionadjunto = $("#hdfUbicacionAdjunto").val();
    var idTemp = $("#hdfNombreTemporarl").val();
    if (nombreadjunto != "") {
        window.parent.CargarGrillaAdjuntos(nombreadjunto, tamanoadjunto, ubicacionadjunto, idTemp);
    }


    if (mostrarAlerta) {
        window.parent.parent.alerta(textoAlerta);
        mostrarAlerta = false;
    }

});