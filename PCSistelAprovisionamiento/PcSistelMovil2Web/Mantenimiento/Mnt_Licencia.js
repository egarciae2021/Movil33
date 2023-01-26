
function apr_Licencia() {
    this.IdLicencia;
    this.Nombre;
    this.NumeroUsuario;
}


$(function () {
    var indiceTab = window.parent.tab.tabs("option", "selected");

    ValidarNumeroEnCajaTexto("txtUsuarios", ValidarSoloNumero);

    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });


    $("#btnGuardar").live("click", function () {

        BloquearPagina(true);

        var Apr_Licencia = new apr_Licencia()

        Apr_Licencia.IdLicencia = $("#hdfIdLicencia").val();
        Apr_Licencia.Nombre = $.trim($("#txtNombre").val());
        Apr_Licencia.NumeroUsuario = $.trim($("#txtUsuarios").val());

        if (Apr_Licencia.Nombre == "") {
            alertaExterna("El nombre de la Licencia es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtNombre").focus();
            return;
        }

        if (Apr_Licencia.NumeroUsuario == "" || Apr_Licencia.NumeroUsuario==NaN) {
            alertaExterna("La cantidad de usuarios es un campo obligatorio");
            BloquearPagina(false);
            $("#txtUsuarios").focus();
            return;
        }


        var oApr_Licencia = JSON.stringify(Apr_Licencia);


        $.ajax({
            type: "POST",
            url: "Mnt_Licencia.aspx/Guardar",
            data: "{'oLicencia': '" + oApr_Licencia + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.d == '1') {
                    BloquearPagina(false);
                    alertaExterna("La Licencia ya existe en la base de datos");
                    // $("#txtvcUsu").focus();
                    return;
                }
                else {
                    //if ($("#hdfEsllamadaExterna").val() != "1") {
                    //    window.parent.ActualizarGrilla();
                    //}
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Registro guardado</h1><h2> Licencia:  " + Apr_Licencia.Nombre + "</h2>", document, CerroMensaje);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });

    });


    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfIdLicencia").val() == "0") {

            $("#txtNombre").val("");
            $("#txtNombre").focus();

        }
        else {
            //window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
            var indiceTab = window.parent.tab.tabs("option", "selected");
        }
    }
});
