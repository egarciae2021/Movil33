$(function () {

    $("#ifReporte").attr("src", "../Administrar/Adm_Reporte.aspx?vcTab=" + $("#hdfvcTab").val() + "&inCod=" + $("#hdfinCod").val() + "&inTip=" + $("#hdfinTip").val() + "&inTipOri=" + $("#hdfinTipOri").val());

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

    $("#txtFechaInicio,#txtFechaFin,#txtOperador,#txtEstado").change(function () {
        BuscarGrilla();
    });

    function BuscarGrilla() {
        $("#ifReporte").attr("src", "../Administrar/Adm_Reporte.aspx?vcTab=" + $("#hdfvcTab").val() + "&inCod=" + $("#hdfinCod").val() + "&inTip=" + $("#hdfinTip").val() + "&inTipOri=" + $("#hdfinTipOri").val() + "&daFecIni=" + $("#txtFechaInicio").val() + "&daFecFin=" + $("#txtFechaFin").val() + "&vcOpe=" + $("#txtOperador").val() + "&vcEst=" + $("#txtEstado").val());
    }

});