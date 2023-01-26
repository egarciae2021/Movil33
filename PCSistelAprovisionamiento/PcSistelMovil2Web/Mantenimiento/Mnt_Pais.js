
function apr_Pais() {
    this.IdPais;
    this.Nombre;
    this.Codigo;
}


$(function () {
    var indiceTab = window.parent.tab.tabs("option", "selected");

    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });
    
    $("#btnGuardar").live("click", function () {

        BloquearPagina(true);

        var Apr_Pais = new apr_Pais()

        Apr_Pais.IdPais = $("#hdfIdPais").val();
        Apr_Pais.Nombre = $.trim($("#txtNombre").val());
        Apr_Pais.Codigo = $.trim($("#txtCodigo").val());

        if (Apr_Pais.IdPais == "") {
            alertaExterna("El nombre del País es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtNombre").focus();
            return;
        }

        if (Apr_Pais.Codigo == "") {
            alertaExterna("El Código del país es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtCodigo").focus();
            return;
        }


        var oApr_Pais = JSON.stringify(Apr_Pais);


        $.ajax({
            type: "POST",
            url: "Mnt_Pais.aspx/Guardar",
            data: "{'oPais': '" + oApr_Pais + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.d == '1') {
                    BloquearPagina(false);
                    alertaExterna("El País ya existe en la base de datos");
                    // $("#txtvcUsu").focus();
                    return;
                }
                else {
                    //if ($("#hdfEsllamadaExterna").val() != "1") {
                    //    window.parent.ActualizarGrilla();
                    //}

                    $("#txtNombre").val("");
                    $("#txtCodigo").val("");                                         
                    $("#hdfIdPais").val("0");

                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Registro guardado</h1><h2> País:  " + Apr_Pais.Nombre + "</h2>", document, CerroMensaje);
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
        if ($("#hdfIdPais").val() == "0") 
        {
            $("#txtNombre").val("");
            $("#txtCodigo").val("");                     
            $("#txtNombre").focus();
        }
        else {
            //window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
            var indiceTab = window.parent.tab.tabs("option", "selected");
        }
    }



});
