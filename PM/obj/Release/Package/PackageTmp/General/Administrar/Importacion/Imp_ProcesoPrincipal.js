var tabOpciones;
var pagina = "";
var Ancho;
var Alto;

$(function () {

    inicio();

    function inicio() {
        DimPosElementos();
    }

    function DimPosElementos() {
        Ancho = $(window).width();
        Alto = $(window).height();
        $(".tabs").css({ height: Alto - 90, width: Ancho - 25 });
        $(".tabHijo").css({ height: Alto - 60, width: Ancho - 27 });
        $(".ifContenido").css({ height: Alto - 125, width: Ancho - 25 });
        $(".tabProceso").css({ height: Alto - 81, width: Ancho - 180 });
    }

    $(window).resize(function () {
        DimPosElementos();
    });

    tabOpciones = $("#TabOpciones").tabs({
        tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remover Tab</span></li>",
        add: function (event, ui) {
            var ifra = document.createElement('IFRAME');
            //            Ancho = $(window).width();
            //            Alto = $(window).height();
            //ifra.width = Ancho - 262;
            //ifra.height = Alto - 71;
            //alert(Ancho - 50);
            ifra.width = Ancho - 30;
            ifra.height = Alto - 120;
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

    function VisorTareas() {
        //        var Ancho = $(window).width();
        //        var Alto = $(window).height();
        //        pagina = pagina + "?vcTab=MOV_IMP_Ruta&inCod=17&inTipOri=1&inTip=3";
        //        AbrirOpcion(tabOpciones, "#TabVisor", "Visor de Tareas", Alto - 147, Ancho - 1);
        pagina = 'Imp_VisorTareaImportacion.aspx';
        AbrirOpcionTab(tabOpciones, "#TabVisorTarea", "Visor de Tarea", Alto - 147, Ancho - 50);
    }

    function ProcesoTarea() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        pagina = pagina + "?vcTab=MOV_IMP_Servicio&inCod=18&inTipOri=1&inTip=3";
        AbrirOpcionTab(tabOpciones, "#TabProceso", "Proceso", Alto - 147, Ancho - 50);
    }

    AccionInicio();

    VisorTareas();

    function AccionInicio() {
        if ($("#hdfAccion").val() == "1") {
            pagina = "Imp_ProcesoImportacion.aspx";
            //Proceso();
            ProcesoTarea();
        }
    }

    function AbrirOpcionTab(tab, Id, Titulo, h, w) {
        var $panel = tab.find(Id);
        if (!$panel.length) {//En el caso que no exista el tab, lo crea
            tab.tabs("add", Id, Titulo);
            $(Id).css("width", w);
            $(Id).css("height", h);
            $(Id).css("margin-top", "0px");
            $(Id).css("margin-left", "0px");
            $(Id).css("margin-bottom", "0px");
            $(Id).css("margin-right", "0px");
            $(Id).css("padding-top", "0px");
            $(Id).css("padding-left", "0px");
            $(Id).css("padding-bottom", "0px");
            $(Id).css("padding-right", "0px");
            $(Id).addClass("tabProceso");
        }
        else {//En el caso que exista lo muestra
            tab.tabs('select', Id);
        }
    }
});