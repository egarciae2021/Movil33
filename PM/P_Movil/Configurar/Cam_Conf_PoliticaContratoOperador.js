$(function () {
    var oContrato = new MOV_CAM_Contrato();

    ko.applyBindings(oContrato);

    $(".btnNormal").button();
    $("input:checkbox,input:radio,input:file").uniform();
    $(".DATE").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy' // See format options on parseDate
    });

    //----------------------------------Mostrar Entidad-------------------------------------
    if ($("#hdfCodigoContrato").val() != "") {
        oContrato.Obtener($("#hdfCodigoContrato").val());
    }
    //--------------------------------------------------------------------------------------

    //----------------------------------Guardar Entidad-------------------------------------
    $("#btnGuardar").click(function () {
        BloquearPagina(true);
        oContrato.Guardar(SatisfactoriaGuardar, ErrorGuardar);
    });
    function SatisfactoriaGuardar(Resultado) {
        window.parent.ActualizarGrilla();
        Mensaje("<br/><h1>Contrato guardado</h1><br/>", document, CerroMensaje);
    }
    function ErrorGuardar(xhr, err, thrErr) {
        BloquearPagina(false);
    }
    function CerroMensaje() {
        BloquearPagina(false);
        if (oContrato.IdContrato() == null) {//Nuevo
            oContrato.Limpiar();
            $("#txtCodigo").focus("");
        }
        else {//Edicion
            window.parent.tab.tabs("remove", indiceTab);
        }
    }
    //--------------------------------------------------------------------------------------
    $("#btnCerrar").click(function () {
        var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        var Accord = window.parent.$("#" + tab1);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    });
});