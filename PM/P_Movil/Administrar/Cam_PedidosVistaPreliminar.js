
$(function () {
    $("#btnPDF").hide();
    $("#btnCerrar").click(function () {
        window.parent.formulario.dialog('close');
    });

    var vcParametros = "?vcTab=" + $("#hdfvcTab").val() + "&vcTipDes=" + $("#hdfvcTipDes").val() + "&inIdCam=" + $("#hdfinIdCam").val() +
                    "&vcNomSit=" + $("#hdfvcNomSit").val() + "&vcFecIni=" + $("#hdfvcFecIni").val() + "&vcFecFin=" + $("#hdfvcFecFin").val() +
                    "&vcCodEmp=" + $("#hdfvcCodEmp").val() + "&vcCodAre=" + $("#hdfvcCodAre").val() + "&vcCodCCO=" + $("#hdfvcCodCCO").val() +
                    "&vcCodCue=" + $("#hdfvcCodCue").val() + "&vcIdEst=" + $("#hdfvcIdEst").val() + "&vcCodPed=" + $("#hdfvcCodPed").val();

    $("#ifReporte").attr("src", "Adm_Reporte.aspx" + vcParametros);

    $("#btnPDF").click(function () {
        var vcParametros = "?vcTab=" + $("#hdfvcTab").val() + "&vcTipDes=" + $("#hdfvcTipDes").val() + "&inIdCam=" + $("#hdfinIdCam").val() +
                    "&vcNomSit=" + $("#hdfvcNomSit").val() + "&vcFecIni=" + $("#hdfvcFecIni").val() + "&vcFecFin=" + $("#hdfvcFecFin").val() +
                    "&vcCodEmp=" + $("#hdfvcCodEmp").val() + "&vcCodAre=" + $("#hdfvcCodAre").val() + "&vcCodCCO=" + $("#hdfvcCodCCO").val() +
                    "&vcCodCue=" + $("#hdfvcCodCue").val() + "&vcIdEst=" + $("#hdfvcIdEst").val() + "&vcCodPed=" + $("#hdfvcCodPed").val() +
                    "&inPosicion=" + 1;

        $("#ifReporte").attr("src", "Adm_Reporte.aspx" + vcParametros);

    });

    $('#ifReporte').load(function () {
        //            setTimeout(function () {
        //                $("#btnPDF").fadeIn(1500);
        //            }, 600);
        $("#btnPDF").show();
    });

});

