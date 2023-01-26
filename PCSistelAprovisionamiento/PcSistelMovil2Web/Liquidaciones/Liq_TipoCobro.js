
function apr_TipoCobro() 
{
    this.IdTipoCobro;
    this.Descripcion;    
}


$(function () {


    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });


    $("#btnGuardar").live("click", function () {
        BloquearPagina(true);

        var Apr_TipoCobro = new apr_TipoCobro()

        Apr_TipoCobro.IdTipoCobro = $("#hdfIdTipoCobro").val();
        Apr_TipoCobro.Descripcion = $.trim($("#txtDescripcion").val());

        if (Apr_TipoCobro.Descripcion == "") {
            alertaExterna("La descripción del Tipo de Cobro es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtDescripcion").focus();
            return;
        }

        var oApr_TipoCobro = JSON.stringify(Apr_TipoCobro);


        $.ajax({
            type: "POST",
            url: "Liq_TipoCobro.aspx/Guardar",
            data: "{'oTipoCobro': '" + oApr_TipoCobro + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.d == '1') {
                    BloquearPagina(false);
                    alertaExterna("La descripción ya existe en la base de datos");
                    return;
                }
                else {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Registro guardado</h1><h2> Tipo Cobro:  " + Apr_TipoCobro.Descripcion + "</h2>", document, CerroMensaje);
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

        if ($("#hdfIdTipoCobro").val() == "0") {

            $("#txtDescripcion").val("");
            $("#txtDescripcion").focus();
            window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
        }
        else {
            window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
        }
    }

});