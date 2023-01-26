var Ancho;
var Alto;
$(function() {
    //
    inicio();
    function inicio() {

        var txtHoraInicial = $("#txtHoraInicial").data("kendoDateTimePicker");

        $(".txtFecha").keypress(ValidarFecha);
        $(".txtFecha").bind('paste', function (e) {
            return false;
        });
        $(".txtFecha").datepicker({
            changeMonth: true,
            changeYear: true
        });
    }

    $("#btnEjecutar").click(function () {
        var fechaFormato = $(".txtFecha").datepicker("option", "dateFormat");
        var vcFecIni = $("#txtDiaInicial").val();
        var vcFecFin = $("#txtDiaFinal").val();

        if (!ValidarFechaFormatoIguales(vcFecIni, vcFecFin, fechaFormato)) {
            alerta("En el rango por días la fecha inicial debe ser menor igual a la fecha final");
            $("#txtDiaInicial").focus();
            return;
        }

        if ($("#txtDiaInicial").val() == "") {
            alerta("Ingrese el rango de inicio de fecha");
            return;
        }
        if ($("#txtDiaFinal").val() == "") {
            alerta("Ingrese el rango de fin de fecha");
            return;
        }
        if ($("#ddlEstado").val() == "-1") {
            alerta("Seleccione un estado");
            return;
        }
        vcFecIni = vcFecIni.substr(6, 4) + vcFecIni.substr(3, 2) + vcFecIni.substr(0, 2);
        vcFecFin = vcFecFin.substr(6, 4) + vcFecFin.substr(3, 2) + vcFecFin.substr(0, 2);
        var pagina = "../../Administrar/Adm_ReporteDevExpress.aspx?vcTab=MOV_Linea&vcTipRep=" + 6 + "&inEstado=" + $("#ddlEstado").val() + "&vcFecIni=" + vcFecIni + "&vcFecFin=" + vcFecFin;
        $("#ifReporte").attr("src", pagina);
//        fn_mdl_muestraForm(pagina, null, "Vista Preliminar", 900, 600);
    });
    $(window).resize(function () {
        Ancho = $(window).width();
        Alto = $(window).height();
        $("#ifReporte").css({ height: Alto - 90, width: Ancho - 20 });
    });
});
function fnShowIframe() {
    $("#ifReporte").show();
}