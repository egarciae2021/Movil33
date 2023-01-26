
$(function () {

    if (window.parent.dvCargandoInicial != undefined) {
        window.parent.$("#dvCargandoInicial").fadeOut("slow");
    }
    enviarAdjuntos();

});
function Actualizar() {
    location.reload();
}

function Salir() {
    if (window.parent.tabPrincipal != undefined) {
        var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;

        var Accord = window.parent.$("#" + tab1);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
        return false;
    } else {
        return true;
    }
}

function SinDatos() {
    $('#divMsgConfirmacion').dialog({
        title: "Aviso",
        modal: true,
        resizable: false,
        closeOnEscape: false,
        buttons: {
            "Aceptar": function () {
                if (Salir()) { $(this).dialog("close"); }
            }
        },
        close: function (event, ui) {
            setTimeout(Salir, 50);
        }
    });
}

function enviarAdjuntos() {
    var nombre = $("#hdfNombAdjTemporal").val();
    var tamano = $("#hdfTamAdjTemporal").val();
    if (nombre != '' && tamano != '') {
        parent.recibirAdjuntos(nombre, tamano);
    }
}