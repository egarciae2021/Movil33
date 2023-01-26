$(function () {
    CargarDisenoTab();


    $("#ifDespachar").attr("src", "Cam_DespachoEmpleadoStaff.aspx");
    $("#ifConsultar").attr("src", "Cam_DespachoVisorStaff.aspx");

    DimPosElementos();
    $(window).resize(function () {
        DimPosElementos();
    });
});

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    $("#tops").css({ "width": Ancho - 30, "height": Alto - 30 });
    $("#ifDespachar").css({ "width": Ancho - 50, "height": Alto - 100 + 26 });
    $("#ifConsultar").css({ "width": Ancho - 50, "height": Alto - 100 + 26 });
} 

function CargarDisenoTab() {

    $("#tops").tabs({
        show: function (event, ui) {
            //console.log("Show");
            //graficar($("#tops").tabs("option", "selected"));
        }
    });

}