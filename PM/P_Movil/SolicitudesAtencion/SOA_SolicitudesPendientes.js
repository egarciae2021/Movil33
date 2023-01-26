var MargenFiltro = 0;
var MargenHeight = 48;
var inAltGrid;
var inFilas;

$(function () {
    inicializarElementos();
    inicializarEventos();
    inicializarDiseno();
});

function inicializarElementos() {

    $(".boton").button();

    $("#gridSolicitudesPendientes").jqGrid({
        datatype: "local",
        colModel: [
            { name: 'CodigoTicket', index: 'CodigoTicket', label: 'Codigo Solicitud'},
            { name: 'Asunto', index: 'Asunto', label: 'Asunto', width: 110 },
            { name: 'Descripcion', index: 'Descripcion', label: 'Descripcion', width: 150 },
            { name: 'FechaRegistro', index: 'FechaRegistro', label: 'Fecha Registro', width: 70 }
        ],
        pager: "#pagerSolicitudesPendientes", 
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        pgtext: 'Pág: {0} de {1}',
        rownumbers: true,
        rowNum: inFilas
    });

}

function inicializarEventos() {

    $(window).resize(function () {
        DimPosElementos();
        NumeroInicialFilas();
    });

}

function inicializarDiseno() {
    DimPosElementos();
    NumeroInicialFilas();
}

//Redimencionar grilla
function NumeroInicialFilas() {
    var nuAltoFila = 23.04;
    inFilas = Math.floor(inAltGrid / nuAltoFila);
}

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    var AnchoLateral = $(".LateralSplitter");
    $(".tabs").css({ height: Alto - 23, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });

    //$(".Splitter").css({ height: Alto - 18 });
    inAltGrid = $(window).height() - 168 - MargenFiltro * MargenHeight;
    $("#gridSolicitudesPendientes").setGridWidth($(window).width() - 31);
    $("#gridSolicitudesPendientes").setGridHeight(inAltGrid);
}
///--------------------------------------
