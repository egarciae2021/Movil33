$(function () {
    $("input:checkbox,input:radio,input:file").uniform();
    $("#btnGuardar").click(function () {
        BloquearPagina(true);
        //oContrato.Guardar(SatisfactoriaGuardar, ErrorGuardar);
        SatisfactoriaGuardar("");
    });
    function SatisfactoriaGuardar(Resultado) {
        Mensaje("<br/><h1>Configuración guardada</h1><br/>", document, CerroMensaje);
    }
    function ErrorGuardar(xhr, err, thrErr) {
        BloquearPagina(false);
    }

    $("#btnCerrar").click(function () {
        var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        var Accord = window.parent.$("#" + tab1);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    });
});