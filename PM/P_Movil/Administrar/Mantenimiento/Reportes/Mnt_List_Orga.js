var vcTipoReporte = "";
var arDatosMostrar = [];
var DatosMostrar = "";

$(function () {

    $(window).resize(function () {
        DimPosElementos();
    });
    DimPosElementos();

    $("#btnAgregarOrga").click(function () {
        var $width = 740;
        var $height = 505;
        var $Pagina = '../../../../P_Movil/Consultar/Con_SeleccionArea.aspx?Tipo=1&Multiple=0';
        $("#ifArea").attr("src", $Pagina);
        Modal = $('#dvArea').dialog({
            title: "Seleccionar área",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    });


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
        arDatosMostrar.push($('#hdfCodOrganizacion').val());
        arDatosMostrar.push($('#ddlNivel').val());
        arDatosMostrar.push($('#ddlCentCost').val());
        DatosMostrar = arDatosMostrar.join('*');
        //fin datos exportacionç

        GenerarReporteCentroCosto();
    }

    function GenerarReporteCentroCosto() {
        pagina = "ReporteDevExpress.aspx?Tipo=ReporteOrganizacion&Detalle=" + DatosMostrar;

        if (pagina) {

        }

        $("#ifReporteDevExpress").attr("src", pagina);
    }

    $("#btnLimpiar").button();
    $("#btnLimpiar").click(function () {
        //inicio datos mostrar
        arDatosMostrar = [];

        $('#ddlNivel').val(-1);
        $($('input[name=ddlNivel_input]')[0]).val("<Todos>")

        $('#ddlCentCost').val(-1);
        $($('input[name=ddlCentCost_input]')[0]).val("<Todos>")

        $("#txtNomOrganizacion").val("<Todos>");
        $("#hdfCodOrganizacion").val("-1");

        arDatosMostrar.push(-1);
        arDatosMostrar.push(-1);
        arDatosMostrar.push(-1);

        DatosMostrar = arDatosMostrar.join('*');
        //fin datos exportacionç

    });

});

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();

    $("#ifReporteDevExpress").css("height", Alto - 145);
}

function IngresarAreaUnico(area) {//Carga el area seleccionadade

    $('#ddlNivel').val(-1);
    $($('input[name=ddlNivel_input]')[0]).val("<Todos>")

    $("#txtNomOrganizacion").val(area.vcNomOrg.split("=")[1]);
    $("#hdfCodOrganizacion").val(area.P_inCodOrg);

}


function MostrarCombosKendo() {

    ActivarCombokendo("#ddlNivel", ddlNivel_change);
    $("#ddlNivel").data("kendoComboBox").text("<Todos>");

    ActivarCombokendo("#ddlCentCost");
    $("#ddlCentCost").data("kendoComboBox").text("<Todos>");

    $("#txtNomOrganizacion").val("<Todos>");
    $("#hdfCodOrganizacion").val("-1");

}

function ActivarCombokendo(Control, EventoChange) {
    $(Control).removeClass("ui-widget-content ui-corner-all");
    $(Control).css("padding", "0px");
    $(Control).css("margin", "0px");
    $(Control).kendoComboBox({
        filter: "contains",
        suggest: true,
        height: 200,
        //dataSource: dataDDL,
        dataTextField: "text",
        dataValueField: "value",
        change: EventoChange
    });

    var combobox = $(Control).data("kendoComboBox");
}



function ddlNivel_change() {
    $("#txtNomOrganizacion").val("<Todos>");
    $("#hdfCodOrganizacion").val("-1");
}
