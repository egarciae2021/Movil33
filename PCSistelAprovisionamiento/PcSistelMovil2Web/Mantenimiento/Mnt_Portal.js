
function apr_Portal() {
    this.IdPortal;
    this.NombrePortal;
}

$(function () {
    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });
    var indiceTab = window.parent.tab.tabs("option", "selected");
    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfIdPortal").val() == "0") {
            $("#txtPortal").val("");
            $("#txtCodigo").val("");
            $("#txtPortal").focus();
        }
        else {
            //window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
            window.parent.tab.tabs("remove", indiceTab);
        }
    }

    $("#btnGuardar").live("click", function () {

        BloquearPagina(true);

        var Apr_Portal = new apr_Portal()

        Apr_Portal.IdPortal = ($("#hdfIdPortal").val() == "0" ? 0 : $("#txtCodigo").val());
        Apr_Portal.NombrePortal = $.trim($("#txtPortal").val());

        if (Apr_Portal.NombrePortal == "") {
            alertaExterna("El nombre del Portal es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtPortal").focus();
            return;
        }

        var oApr_Portal = JSON.stringify(Apr_Portal);


        $.ajax({
            type: "POST",
            url: "Mnt_Portal.aspx/Guardar",
            data: "{'oPortal': '" + oApr_Portal + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.d == '1') {
                    BloquearPagina(false);
                    alertaExterna("El Portal Origen ya existe en la base de datos");
                    // $("#txtvcUsu").focus();
                    return;
                }
                else {
                    $("#txtPortal").val("");
                    $("#txtCodigo").val("");                   

                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Registro guardado</h1><h2> Portal Origen:  " + Apr_Portal.NombrePortal + "</h2>", document, CerroMensaje);                   
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });

    });
});