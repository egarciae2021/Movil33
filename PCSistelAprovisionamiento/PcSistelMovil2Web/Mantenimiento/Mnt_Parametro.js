
function apr_Parametro() {
    this.IdParametro;
    this.NombreParametro;
    this.DescripcionParametro;
}

$(function () {
    var indiceTab = window.parent.tab.tabs("option", "selected");
    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfIdPais").val() == "0") {
            $("#txtParametro").val("");
            $("#txtCodigo").val("");
            $("#txtDescripcion").val("");
            $("#txtParametro").focus();
        }
        else {
            //window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
            window.parent.tab.tabs("remove", indiceTab);
        }
    }


    $("#btnGuardar").live("click", function () {

        BloquearPagina(true);

        var Apr_Parametro = new apr_Parametro()

        Apr_Parametro.IdParametro = ($("#hdfIdParametro").val() == "0" ? 0 : $("#txtCodigo").val());
        Apr_Parametro.NombreParametro = $.trim($("#txtParametro").val());
        Apr_Parametro.DescripcionParametro = $.trim($("#txtDescripcion").val());

        if (Apr_Parametro.NombreParametro == "") {
            alertaExterna("El nombre del Parametro es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtParametro").focus();
            return;
        }

        var oApr_Parametro = JSON.stringify(Apr_Parametro);


        $.ajax({
            type: "POST",
            url: "Mnt_Parametro.aspx/Guardar",
            data: "{'oParametro': '" + oApr_Parametro + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.d == '1') {
                    BloquearPagina(false);
                    alertaExterna("El Parametro ya existe en la base de datos");
                    // $("#txtvcUsu").focus();
                    return;
                }
                else {
                    $("#txtParametro").val("");
                    $("#txtCodigo").val("");
                    $("#txtDescripcion").val("");

                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Registro guardado</h1><h2> Parametro:  " + Apr_Parametro.NombreParametro + "</h2>", document, CerroMensaje);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });

    });

});