$(function () {

    $("#btnAceptar").live("click", function () {
        $.ajax({
            url: "ATE_TipoPausaOperador.aspx/CambiarEstado", //PageMethod
            data: "{'IdOperador':'" + $("#hdfIdOperador").val() + "'," +
                  "'IdEstado':'" + $("#hdfIdEstado").val() + "'," +
                  "'IdTipoPausa':'" + $("#ddlTipoPausa").val() + "'," +
                  "'IdVentanilla':'" + $("#ddlTipoPausa").val() + "'}",
            dataType: "json",
            type: "post",
            contentType: "application/json; charset=utf-8",

            success: function (result) {
                window.parent.fnActualizarBotonesOperador($("#hdfIdEstado").val());
                window.parent.formulario.dialog('close');
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