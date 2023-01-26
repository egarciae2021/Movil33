
$(function () {
    BuscarGrilla();

    $(".txtFecha").datepicker({
        changeMonth: true,
        changeYear: true
    });
    $("#imgBorrarFechaInicio").click(function () {
        $("#txtFechaInicio").val("");
        BuscarGrilla();
    });
    $("#imgBorrarFechaFin").click(function () {
        $("#txtFechaFin").val("");
        BuscarGrilla();
    });
    $("#txtFechaInicio,#txtFechaFin").change(function () {
        BuscarGrilla();
    });
    $("#ddlEstado,#ddlTipo").change(function () {
        BuscarGrilla();
    });

    function BuscarGrilla() {
        $("#ifReporte").attr("src", "../Adm_Reporte.aspx?vcTab=" + $("#hdfTabSolicitud").val() + "&vcTipRep=" + $("#hdfTipoReporte").val() + "&daFecIni=" + $("#txtFechaInicio").val() + "&daFecFin=" + $("#txtFechaFin").val() + "&inEst=" + $("#ddlEstado").val() + "&inTipSol=" + $("#ddlTipo").val());
    }
});
    