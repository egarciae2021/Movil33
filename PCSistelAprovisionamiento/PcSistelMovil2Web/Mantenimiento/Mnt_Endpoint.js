
function apr_Endpoint() {
    this.IdEndpoint;
    this.Codigo;
    this.Nombre;
}

$(function () {

    var indiceTab = window.parent.tab.tabs("option", "selected");

    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfIdEndpoint").val() == "0") {
            $("#txtCodigo").val("");
            $("#txtNombre").val("");
            $("#txtNombre").focus();
        }
        else {
            //window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
            window.parent.tab.tabs("remove", indiceTab);
        }
    }

    $("#btnGuardar").live("click", function () {

        BloquearPagina(true);

        var Apr_Endpoint = new apr_Endpoint();

        Apr_Endpoint.IdEndpoint = $("#hdfIdEndpoint").val();
        Apr_Endpoint.Codigo = $("#txtCodigo").val();
        Apr_Endpoint.Nombre = $.trim($("#txtNombre").val());




        if (Apr_Endpoint.Codigo == "") {
            alertaExterna("El Codigo abreviado es un campo obligatorio");
            BloquearPagina(false);
            $("#txtCodigo").focus();
            return;
        }

        if (Apr_Endpoint.Nombre == "") {
            alertaExterna("El nombre es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtNombre").focus();
            return;
        }


        var oApr_Endpoint = JSON.stringify(Apr_Endpoint);

        $.ajax({
            type: "POST",
            url: "Mnt_Endpoint.aspx/Guardar",
            data: "{'oEndpoint': '" + oApr_Endpoint + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.d == '1') {
                    BloquearPagina(false);
                    alertaExterna("El endpoint ya existe en la base de datos");
                    // $("#txtvcUsu").focus();
                    return;
                }
                else {
                    //if ($("#hdfEsllamadaExterna").val() != "1") {
                    //    window.parent.ActualizarGrilla();
                    //}
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Registro guardado</h1><h2> ID " + Apr_Endpoint.IdEndpoint + "</h2>", document, CerroMensaje);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });



    });
});