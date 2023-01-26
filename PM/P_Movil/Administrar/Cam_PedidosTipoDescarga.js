
$(function () {
    $("#btnDescargar").live("click", function () {
        if ($('input[name=rblTipoDescarga]:checked').val() != undefined) {
            var vcParametros = "?vcTipDes=" + $('input[name=rblTipoDescarga]:checked').val() + "&inIdCam=" + $("#hdfinIdCam").val() +
                    "&vcNomSit=" + $("#hdfvcNomSit").val() + "&vcFecIni=" + $("#hdfvcFecIni").val() + "&vcFecFin=" + $("#hdfvcFecFin").val() +
                    "&vcCodEmp=" + $("#hdfvcCodEmp").val() + "&vcCodAre=" + $("#hdfvcCodAre").val() + "&vcCodCCO=" + $("#hdfvcCodCCO").val() +
                    "&vcCodCue=" + $("#hdfvcCodCue").val() + "&vcIdEst=" + $("#hdfvcIdEst").val() + "&vcCodPed=" + $("#hdfvcCodPed").val();
            if ($("#hdfvcOpc").val() == "Excel") {
                var pagina = "Cam_PedidosVisor.aspx" + vcParametros;
                $("#ifExcel").attr("src", pagina);
                window.parent.formulario.dialog('close');
            } else {
                window.parent.formulario.dialog('close');
                window.parent.AbreVistaPreliminar(vcParametros, $('input[name=rblTipoDescarga]:checked').val());
            }
        } else {
            alerta("Seleccione un tipo de Vista");
        }
    });

    $("#btnCerrar").click(function () {
        window.parent.formulario.dialog('close');
    });
});
    