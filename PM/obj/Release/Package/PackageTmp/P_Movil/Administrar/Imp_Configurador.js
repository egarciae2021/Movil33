var tabOpciones;
$(function () {
    var pagina = "";

    //$("iframe").css("overflow", "hidden");

    //    inicio();

    //    function inicio() {
    //        DimPosElementos();
    //    }

    $(".btnNormal").button({});

    $(".ui-button-text").css({ padding: 4, width: 22 });

    $("#tblAcciones").buttonset();
    $("#tblEstado").buttonset();

    //    inicioPagina();
    //    function inicioPagina() {
    //        DimPosElementos();
    //    }

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        //        $(".tabs").css({ height: Alto + 200, width: Ancho - 25 });
        //        $(".tabHijo").css({ height: Alto + 170, width: Ancho - 35 });
        //        $(".ifContenido").css({ height: Alto + 160, width: Ancho - 40 });        
        $(".tabs").css({ height: Alto - 95, width: Ancho - 27 });
        $(".tabHijo").css({ height: Alto - 110, width: Ancho - 35 });
        $(".ifContenido").css({ height: Alto - 130, width: Ancho - 40 });
        $(".tabs").css("overflow", "hidden");
        //        $(".tabHijo").css("overflow", "hidden");
        //        $(".ifContenido").css("overflow", "hidden");
        if ($.browser.mozilla) {
            $("#TabOpciones").css("height", $("#TabOpciones").height() - 20);
        }
    }

    function DimPosElementos2() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        //        $(".tabs").css({ height: Alto + 200, width: Ancho - 25 });
        //        $(".tabHijo").css({ height: Alto + 170, width: Ancho - 35 });
        //        $(".ifContenido").css({ height: Alto + 160, width: Ancho - 40 });        
        $(".tabs").css({ height: Alto - 85, width: Ancho - 27 });
        $(".tabHijo").css({ height: Alto - 110, width: Ancho - 35 });
        //$(".ifContenido").css({ height: Alto + 150, width: Ancho - 40 });// Comentado Jcamacho 01/10/2015

        $(".tabs").css("overflow", "hidden");
        //        $(".tabHijo").css("overflow", "hidden");
        //        $(".ifContenido").css("overflow", "hidden");
        if ($.browser.mozilla) {
            $("#TabOpciones").css("height", $("#TabOpciones").height() - 20);
        }

        $(".ifContenido").css({ height: Alto - 60, width: Ancho - 40 });
    }
    DimPosElementos();
    $(window).resize(function () {
        DimPosElementos();
    });

    function DimPosElementos3() {
        var Ancho = $(window).width();
        var Alto = $(window).height();

        $(".tabs").css({ height: Alto - 70, width: Ancho - 25 });
        $(".tabHijo").css({ height: Alto - 110, width: Ancho - 35 });

        //$(".ifContenido")[1].contentWindow.$("#grid").css({ height: Alto + 30, width: Ancho - 40 });
        // $(".ifContenido").css({ height: Alto + 30, width: Ancho - 40 });
        //$(".ifContenido").contentWindow.DimPosElementos();
        $(".ifContenido").css({ height: Alto + 130, width: Ancho - 40 });
        $(".tabs").css("overflow", "hidden");

        if ($.browser.mozilla) {
            $("#TabOpciones").css("height", $("#TabOpciones").height() - 20);
        }
    }

    tabOpciones = $("#TabOpciones").tabs({
        tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remover Tab</span></li>",
        add: function (event, ui) {
            var ifra = document.createElement('IFRAME');
            var Ancho = $(window).width();
            var Alto = $(window).height();
            ifra.width = Ancho - 60;

            ifra.height = Alto - 95;


            ifra.setAttribute("margin-top", "0px");
            ifra.setAttribute("margin-left", "0px");
            ifra.setAttribute("margin-bottom", "0px");
            ifra.setAttribute("margin-right", "0px");
            ifra.setAttribute("padding-top", "0px");
            ifra.setAttribute("padding-left", "0px");
            ifra.setAttribute("padding-bottom", "0px");
            ifra.setAttribute("padding-right", "0px");
            ifra.src = pagina;
            ifra.frameBorder = "0";
            ifra.className = "ifContenido";
            $(ui.panel).append(ifra);
            $(this).tabs('select', '#' + ui.panel.id);
            pagina = "";
        }
    });

    $(".btnNormal").live("click", function () {
        pagina = $(this).attr("url");
        var EventoClick = $(this).attr("Click");
        eval(EventoClick)();
    });


    $("#TabOpciones span.ui-icon-close").live("click", function () {
        var index = $("li", tabOpciones).index($(this).parent());
        tabOpciones.tabs("remove", index);
    });

    $(".PanelBarraNavegacionItemSeleccion").live("click", function () {
        pagina = $(this).attr("url");
        var EventoClick = $(this).attr("Click");
        eval(EventoClick)();
    });

    function AbrirServicios() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        pagina = pagina + "?vcTab=MOV_IMP_Servicio&inCod=18&inTipOri=1&inTip=3&inNoPer=1";
        //        pagina = raiz("Common/Page/Adm_Lista.aspx" + "?vcTab=MOV_IMP_Servicio&inCod=18&inTipOri=1&inTip=3&inNoPer=1");
        //        alert(pagina);
        AbrirOpcion(tabOpciones, "#TabServicios", "Servicios Asociados", Alto + 170, Ancho - 40);

    
        //setTimeout(function () { $(".ifContenido").css({ height: Alto - 60, width: Ancho - 40 }); }, 1500);
    }
    function AbrirPlantillas() {

        var Ancho = $(window).width();
        var Alto = $(window).height();

        pagina = pagina + "?vcTab=MOV_IMP_Plantilla&inCod=21&inTipOri=1&inTip=3&inNoPer=1";
        //        pagina = raiz("Common/Page/Adm_Lista.aspx" + "?vcTab=MOV_IMP_Plantilla&inCod=21&inTipOri=1&inTip=3&inNoPer=1");
        //        alert(pagina);
        //        if ($.browser.mozilla ) {
        //            AbrirOpcion(tabOpciones, "#TabPlantillas", "Plantillas", Alto + 100, Ancho - 40);
        //        }
        //        else {
        AbrirOpcion(tabOpciones, "#TabPlantillas", "Plantillas", Alto - 370, Ancho - 40);
        //setTimeout(function () { $(".ifContenido").css({ height: Alto - 60, width: Ancho - 40 }); }, 1500);
        //}
        

    }
    function AbrirRutas() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        pagina = pagina + "?vcTab=MOV_IMP_Ruta&inCod=17&inTipOri=1&inTip=3&inNoPer=1";
        AbrirOpcion(tabOpciones, "#TabPrefijo", "Prefijo", Alto - 62, Ancho - 250);

        //setTimeout(function () { $(".ifContenido").css({ height: Alto - 60, width: Ancho - 40 }); }, 1500);
    }
    function AbrirDestinos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        pagina = pagina + "?vcTab=MOV_IMP_Destino&inCod=16&inTipOri=1&inTip=3&inNoPer=1";
        AbrirOpcion(tabOpciones, "#TabDestinos", "Destinos", Alto - 62, Ancho - 250);
        //setTimeout(function () { $(".ifContenido").css({ height: Alto - 60, width: Ancho - 40 }); }, 1500);
    }
    function AbrirNotificaciones() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        AbrirOpcion(tabOpciones, "#TabNotificaciones", "Notificaciones", Alto - 62, Ancho - 250);
        setTimeout(function () { $(".ifContenido").css({ height: Alto - 60, width: Ancho - 40 }); }, 1500);
    }

    function AbrirParametros() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        AbrirOpcion(tabOpciones, "#TabParametros", "Parámetros", Alto - 200, Ancho - 250);
        //setTimeout(function () { $(".ifContenido").css({ height: Alto - 60, width: Ancho - 40 }); }, 1500);
    }

    $("#ifInicial").attr("src", "Imp_ConfiguradorInicio.aspx");
});