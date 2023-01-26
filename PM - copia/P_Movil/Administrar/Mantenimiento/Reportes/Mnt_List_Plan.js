var vcTipoReporte = "";
var arDatosMostrar = [];
var DatosMostrar = "";
var FiltroRegistro = 1; //1:Activo, 0: Inactivo, 2:Todos
var vcBusqueda = "";

$(function () {

    $(window).resize(function () {
        DimPosElementos();
    });
    DimPosElementos();

    MostrarCombosKendo();

    $("#btnMostrar").button();
    $("#btnMostrar").click(function () {
        load();
    });

    function load() {
        //inicio datos mostrar
        arDatosMostrar = [];
        arDatosMostrar.push($('#ddlModelo').val());

        DatosMostrar = arDatosMostrar.join('*');
        //fin datos exportacionç

        GenerarReporteEmpleados();
    }

    function GenerarReporteEmpleados() {
        $("#dvCargando").show();
        DatosMostrar = DatosMostrar.replace(/<Todos>/g, '-1');
        //$("#vcTab").val() == "MOV_Plan"
        pagina = "../../../../P_Movil/Administrar/Adm_ReporteDevExpress.aspx?vcTab=MOV_Plan&vcTipRep=3&Detalle=" + DatosMostrar + "&inEstado=" + $("#hdfIdEstado").val() + "&vcCampoFiltro=" + $("#hdfCampos").val() + "&vcDescFiltro=" + $("#hdfFiltro").val();

        if (pagina) {

        }

        $("#ifReporteDevExpress").attr("src", pagina);
    }

    $("#btnLimpiar").button();
    $("#btnLimpiar").click(function () {

        $("#ddlModelo").data("kendoComboBox").text(''); 
        $('#ddlModelo').val(-1);
        $($('input[name=ddlModelo_input]')[0]).val("<Todos>");

        arDatosMostrar = [];
        arDatosMostrar.push(-1);

        DatosMostrar = arDatosMostrar.join('*');

    });



    $(".dvCargandoMnt").hide();
});

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();

    $("#ifReporteDevExpress").css("height", Alto - 119);
    $("#ifReporteDevExpress").css("width", Ancho - 50 );
}


function MostrarCombosKendo() {

    ActivarCombokendo("#ddlModelo");
    $("#ddlModelo").data("kendoComboBox").text("<Todos>");

}

function ActivarCombokendo(Control, EventoChange) {
    $(Control).removeClass("ui-widget-content ui-corner-all");
    $(Control).css("padding", "0px");
    $(Control).css("margin", "-1px");
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


