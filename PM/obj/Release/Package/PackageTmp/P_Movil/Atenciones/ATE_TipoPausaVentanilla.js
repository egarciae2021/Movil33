$(function () {

    $("#btnAceptar").live("click", function () {
        $.ajax({
            url: "ATE_TipoPausaVentanilla.aspx/CambiarEstado", //PageMethod
            data: "{'IdVentanilla':'" + $("#hdfIdVentanilla").val() + "'," +
                  "'IdEstado':'" + $("#hdfIdEstado").val() + "'," +
                  "'IdTipoPausa':'" + $("#ddlTipoPausa").val() + "'}",
            dataType: "json",
            type: "post",
            contentType: "application/json; charset=utf-8",

            success: function (result) {

                if (result.d.length > 0) {
                    var row = result.d[0];
                    //window.parent.fnActualizarBotonesVentanilla($("#hdfIdEstado").val());
                    window.parent.fnActualizarTipoPausa(row.IdTipoPausa);
                    window.parent.formulario.dialog('close');
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    $("#btnCerrar").click(function () {
        window.parent.formulario.dialog('close');
    });

});