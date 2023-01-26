
function BloquearPagina(bloqueado) {
    $(".btnNormal").button("option", "disabled", bloqueado);

    if (bloqueado) {
        $("input").attr("disabled", "disabled");
        $("select").attr("disabled", "disabled");
    }
    else {
        $("input").removeAttr("disabled");
        $("select").removeAttr("disabled");
    }
}

//var indiceTab;
function CerroMensaje() {
    BloquearPagina(false);
}

$(function () {
    $(".btnNormal").button();

    $("#btnGuardar").live("click", function () {
        BloquearPagina(true);
        var registro = [];
        var TextoEntrega = new ENT_MOV_Parametros();
        var CuerpoMensaje = new ENT_MOV_Parametros();

        TextoEntrega.idParametro = $("#txtTextoEntrega").attr("idParametro");
        TextoEntrega.Valor = $("#txtTextoEntrega").val();
        CuerpoMensaje.idParametro = $("#txtCuerpoMensaje").attr("idParametro");
        CuerpoMensaje.Valor = $("#txtCuerpoMensaje").val();
        registro.push(TextoEntrega);
        registro.push(CuerpoMensaje);

        $.ajax({
            type: "POST",
            url: "Conf_SolicitudDespacho.aspx/Guardar",
            data: "{'registro':'" + JSON.stringify(registro) + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "0") {
                    Mensaje("<br/><h1>Parámetros de despacho de solicitudes Guardados</h1><br/><h2></h2>", document, CerroMensaje);
                }
                else {
                    alerta("No se Pudo Grabar el Registro");
                    BloquearPagina(false);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });
});