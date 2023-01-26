
$(function() {

    inicio();
    function inicio() {
        $("#TabPrincipal").tabs({});
        DimPosElementos();
    }

    function DimPosElementos() {
        Ancho = $(window).width();
        Alto = $(window).height();
        $(".frame1").css({ "height": Alto - 100 });
//        $(".tabs").css({ height: Alto - 90, width: Ancho - 25 });
//        $(".tabHijo").css({ height: Alto - 60, width: Ancho - 27 });
//        $(".ifContenido").css({ height: Alto - 125, width: Ancho - 25 });
//        $(".tabProceso").css({ height: Alto - 81, width: Ancho - 180 });
    }

    $(window).resize(function () {
        DimPosElementos();
    });
});