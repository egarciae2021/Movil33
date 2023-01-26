var vcTipoReporte = "";
var arDatosMostrar = [];
var DatosMostrar = "";

$(function () {

    $(window).resize(function () {
        DimPosElementos();
    });
    DimPosElementos();

    MostrarCombosKendo();


    GenerarReporteCentroCosto();
    load();

    $("#btnMostrar").button();
    $("#btnMostrar").click(function () {
        load();
    });

    function load() {
        //inicio datos mostrar
        arDatosMostrar = [];
        arDatosMostrar.push($('#ddlCentroCosto').val());
        arDatosMostrar.push($('#ddlNivel').val());
        DatosMostrar = arDatosMostrar.join('*');
        //fin datos exportacion

        GenerarReporteCentroCosto();
    }

    function GenerarReporteCentroCosto() {
        DatosMostrar = arDatosMostrar.join('*');
        pagina = "ReporteDevExpress.aspx?Tipo=ReporteCentroCosto&Detalle=" + DatosMostrar;

        if (pagina) {

        }

        $("#ifReporteDevExpress").attr("src", pagina);
    }

    $("#btnLimpiar").button();
    $("#btnLimpiar").click(function () {
        //inicio datos mostrar
        arDatosMostrar = [];
        arDatosMostrar.push(-1);
        arDatosMostrar.push(-1);


       $('#ddlCentroCosto').val(-1);
        $($('input[name=ddlCentroCosto_input]')[0]).val("<Todos>")

       $('#ddlNivel').val(-1);
        $($('input[name=ddlNivel_input]')[0]).val("<Todos>")

        DatosMostrar = arDatosMostrar.join('*');
        //fin datos exportacion

    });

});

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();

    $("#ifReporteDevExpress").css("height", Alto - 140);
}


function MostrarCombosKendo() {
    ActivarCombokendo("#ddlCentroCosto", dataDDL);
    $("#ddlCentroCosto").data("kendoComboBox").text("<Todos>");

    ActivarCombokendo("#ddlNivel", dataDDLNivel);
    $("#ddlNivel").data("kendoComboBox").text("<Todos>");
}

function ActivarCombokendo(Control, dataDDL) {
    $(Control).removeClass("ui-widget-content ui-corner-all");
    $(Control).css("padding", "0px");
    $(Control).css("margin", "0px");
    $(Control).kendoComboBox({ 
                                filter: "contains", 
                                suggest: true, 
                                height: 200, 
                                dataSource: dataDDL, 
                                dataTextField: "text",        
                                dataValueField: "value" });

    var combobox = $(Control).data("kendoComboBox");
}
