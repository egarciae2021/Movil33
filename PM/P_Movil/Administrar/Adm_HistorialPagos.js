$(function () {
    //    var asInitVals = new Array();
    //    var timeoutHnd;
    //    var asInitValsEstado = new Array();
    //    var timeoutHndEstado;


    $("#txtFechaInicio").datepicker({
        changeMonth: true,
        changeYear: true,
        onSelect: function (dateText, inst) {
            $('#txtFechaFin').val(PeriodoFacturacionFin($("#txtFechaInicio").val()));
            BuscarGrilla();
        }
    });

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

    $("#txtFechaInicio,#txtFechaFin,#ddlOperador,#ddlEstado").change(function () {
        BuscarGrilla();
    });

    //    $("#txtOperador").keyup(function () {
    //        if (timeoutHnd) {
    //            clearTimeout(timeoutHnd);
    //        }
    //        timeoutHnd = setTimeout(BuscarGrilla, 500);
    //    });
    //    $("#txtEstado").keyup(function () {
    //        if (timeoutHndEstado) {
    //            clearTimeout(timeoutHndEstado);
    //        }
    //        timeoutHndEstado = setTimeout(BuscarGrilla, 500);
    //    });

    //    $("#ddlBusqueda").change(function (event) {
    //        $("#txtOperador").val("");
    //        $("#txtOperador").addClass("txtBusqueda");
    //        $("#txtOperador").val(asInitVals[0]);
    //        $("#txtOperador").focus();

    //return $("#txtOperador").val().replace(/'/g, "&#39");

    function BuscarGrilla() {
        $("#ifReporte").attr("src", "../Administrar/Adm_Reporte.aspx?vcTab=" + $("#hdfvcTab").val() + "&inCod=" + $("#hdfinCod").val() + "&inTip=" + $("#hdfinTip").val() + "&inTipOri=" + $("#hdfinTipOri").val() + "&daFecIni=" + $("#txtFechaInicio").val() + "&daFecFin=" + $("#txtFechaFin").val() + "&vcOpe=" + ($("#ddlOperador option:selected").val() == "-1" ? "" : $("#ddlOperador option:selected").text()) + "&vcEst=" + ($("#ddlEstado option:selected").val() == "-1" ? "" : $("#ddlEstado option:selected").text()));
    }

});