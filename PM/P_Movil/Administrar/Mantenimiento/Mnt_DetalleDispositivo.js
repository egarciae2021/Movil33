
$(function () {

    var oCultura = window.top.oCulturaUsuario;
    $("#txt_dcLimiteCredito").html(oCultura.Moneda.vcSimMon + " " + $("#txt_dcLimiteCredito").html());


    $("#ddl_picTipMod").prop('disabled', true);
    //$("#ddl_picTipMod")

    $("#pnlAsignacion").html("");
    switch (miTipoAsignacion) {
        case 1:
            if (misAsignaciones.length > 0) {
                //$("#pnlAsignacion").append('<div  style="width:100%; font-weight:bold; border-bottom: 2px solid #a6c9e2;">' + (misAsignaciones.toString() == "" ? "" : misAsignaciones[0].NombreAsignacion.toString()) + '</div>');
                if (misAsignaciones.toString() == "") {
                    $("#pnlAsignacion").append('<div  style="width:100%; font-weight:bold;">' + "" + '</div>');
                } else {
                    $("#pnlAsignacion").append('<div  style="width:100%; font-weight:bold; border-bottom: 2px solid #a6c9e2;">' + misAsignaciones[0].NombreAsignacion.toString() + '</div>');
                }
            }
            break;
        case 2:
            //$("#pnlAsignacion").append('<div  style="width:100%; height:20px; font-weight:bold; border-bottom: 2px solid #a6c9e2;">Asignación</div>');
            if (misAsignaciones.toString() == "") {
                $("#pnlAsignacion").append('<div  style="width:100%; height:15px; font-weight:bold;">' + "" + '</div>');
            } else {
                $("#pnlAsignacion").append('<div  style="width:100%; height:15px; font-weight:bold; border-bottom: 2px solid #a6c9e2;">' + misAsignaciones[0].NombreAsignacion.toString() + '</div>');
            }
            break;
        case 3:
            $("#pnlAsignacion").append('<div  style="width:100%; height:15px; font-weight:bold; border-bottom: 2px solid #a6c9e2;">Asignación Libre</div>');
            break;
        default:
            break;
    }
    //alert(misAsignaciones);
    if (misAsignaciones.length > 0) {
        var i = 0;
        for (i = 0; i < misAsignaciones.length; i++) {
            $("#pnlAsignacion").append('<div id ="dvSubAsignaciones' + i + '" style="width:100%;"></div>');
            var x = 0;

            for (x = 0; x < misAsignaciones[i].ServicioAsignacion.length; x++) {
                $('#dvSubAsignaciones' + i).append('<div style="width:95%; float:right; font-weight:bold;"><table style="width: 100%;"><tr><td style="width:70%;">' + (i + 1) + '. ' + misAsignaciones[i].ServicioAsignacion[x].DescripcionServicio + '</td><td style="width:20%;float:left; text-align:center; font-style: italic;font-size: 11px;">' + misAsignaciones[i].UnidadMedida + '</td><td style="float: right;width: 38px; text-align:right;">' + misAsignaciones[i].ServicioAsignacion[x].CantidadServicio + '</td></tr></table></div>');
            }




            //<div style="width:100%; height:15px;"><ul><li><div style="width:70%;">ABC</div><div style="width:25%;float:left; text-align:right;">105</div></li></ul></div>');
        }
    }

    if ($("#hdfTieneLinea").val() == "0") {
        $("#pnlAsignacion").hide();
    }

    $("#btnDetalle").live("click", function () {
        alert($("#btnDetalle").attr("tipoAsig"));
    });
});
    