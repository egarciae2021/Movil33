var vcTipoReporte = "";
var arDatosMostrar = [];
var DatosMostrar = "";

$(function () {

    $(window).resize(function () {
        DimPosElementos();
    });
    DimPosElementos();


    GenerarReporteCentroCosto();
    load();

    $("#btnMostrar").button();
    $("#btnMostrar").click(function () {
        load();
    });

    function load() {
        //inicio datos mostrar
        arDatosMostrar = [];
        arDatosMostrar.push($('#ddlGama').val());
        arDatosMostrar.push($('#ddlEstado').val());
        arDatosMostrar.push($('#ddlModelo').val());
        DatosMostrar = arDatosMostrar.join('*');
        //fin datos exportacionç

        GenerarReporteCentroCosto();
    }

    function GenerarReporteCentroCosto() {
        pagina = "ReporteDevExpress.aspx?Tipo=ReporteModelo&Detalle=" + DatosMostrar;

        if (pagina) {

        }

        $("#ifReporteDevExpress").attr("src", pagina);
    }

    $("#btnLimpiar").button();
    $("#btnLimpiar").click(function () {
        //inicio datos mostrar
        arDatosMostrar = [];
        arDatosMostrar.push($('#ddlGama').val(-1));
        arDatosMostrar.push($('#ddlEstado').val(-1));
        arDatosMostrar.push($('#ddlModelo').val(-1));
        DatosMostrar = arDatosMostrar.join('*');
        //fin datos exportacionç

    });

});

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();

    $("#ifReporteDevExpress").css("height", Alto - 140);
}

