var tabOpciones;
var pagina = "";
var Ancho;
var Alto;

$(function () {

    inicio();

    function inicio() {
        DimPosElementos();
    }

    //JHERRERA 20140809 Se ocultan los botones cuando no hay ninguna tabla de llamadas en la bd.
    if ($("#hdfHayData").val() == "0") {
        $("#btnActualizar").show();
        $("#btnEliminar").hide();
    } else {
        $("#btnActualizar").show();
        $("#btnEliminar").show();
    }

    $(".btnNormal").button({});

    $(".ui-button-text").css({ padding: 4, width: 22 });

    $("#tblAcciones").buttonset();
    $("#tblEstado").buttonset();


    function DimPosElementos() {
        Ancho = $(window).width();
        Alto = $(window).height();
        $(".tabs").css({ height: Alto - 96, width: Ancho - 27 });
        $(".tabHijo").css({ height: Alto - 60, width: Ancho - 27 });
        $(".ifContenido").css({ height: Alto - 115, width: Ancho - 65 });
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
            ifra.height = Alto - 125;
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

    //    $("#TabOpciones span.ui-icon-close").live("click", function () {
    //        var index = $("li", tabOpciones).index($(this).parent());
    //        tabOpciones.tabs("remove", index);
    //    });

    //    $(".PanelBarraNavegacionItemSeleccion").live("click", function () {
    //        pagina = $(this).attr("url");
    //        var EventoClick = $(this).attr("Click");
    //        eval(EventoClick)();
    //    });


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

    function ProcesoTarea() {
        var Ancho = $(window).width();
        var Alto = $(window).height();

        var OperadorDefault = $("#hdfOperadorDefault").val();
        var urlProceso = "Imp_Proceso.aspx";
        //if (OperadorDefault == "" || OperadorDefault == "0" || !$.isNumeric(OperadorDefault)) {
        //    urlProceso = "Imp_Proceso.aspx"; 
        //}
        //else if (OperadorDefault == "52") {
        //    urlProceso = "../Conciliar/Imp_Proceso.aspx";
        //}
        urlProceso = "Imp_Proceso.aspx";

        pagina = urlProceso + "?vcTab=MOV_IMP_Servicio&inCod=18&inTipOri=1&inTip=3";
        AbrirOpcion(tabOpciones, "#TabProceso", "Proceso", Alto - 147, Ancho - 50);

    }
    function Actualizartarea() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        pagina = pagina + "?vcTab=MOV_IMP_Plantilla&inCod=21&inTipOri=1&inTip=3";
        AbrirOpcion(tabOpciones, "#TabActualizar", "Actualizar registros", Alto - 147, Ancho - 50);
    }
    function EliminarTarea() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        pagina = pagina + "?vcTab=MOV_IMP_Ruta&inCod=17&inTipOri=1&inTip=3";
        AbrirOpcion(tabOpciones, "#TabEliminar", "Eliminar registros", Alto - 147, Ancho - 50);
    }

    function VisorTareas() {
        //        var Ancho = $(window).width();
        //        var Alto = $(window).height();
        //        pagina = pagina + "?vcTab=MOV_IMP_Ruta&inCod=17&inTipOri=1&inTip=3";
        //        AbrirOpcion(tabOpciones, "#TabVisor", "Visor de Tareas", Alto - 147, Ancho - 1);
        pagina = 'Imp_VisorTarea.aspx';
        AbrirOpcion(tabOpciones, "#TabVisorTarea", "Visor de Tarea", Alto - 147, Ancho - 50);
    }

    //    function AbrirDestinos() {
    //        var Ancho = $(window).width();
    //        var Alto = $(window).height();
    //        pagina = pagina + "?vcTab=MOV_IMP_Destino&inCod=16&inTipOri=1&inTip=3";
    //        AbrirOpcion(tabOpciones, "#TabDestinos", "Destinos", Alto - 62, Ancho - 250);
    //    }



    //    function Proceso() {
    //        //        Ancho = $(window).width();
    //        //        Alto = $(window).height();
    //        AbrirOpcion(tabOpciones, "#TabProceso", "Proceso", Alto - 62, Ancho - 250);
    //    }
    //    function Actualizar() {
    //        //        Ancho = $(window).width();
    //        //        Alto = $(window).height();
    //        AbrirOpcion(tabOpciones, "#TabActualizar", "Actualizar registros", Alto - 62, Ancho - 250);
    //    }
    //    function Eliminar() {
    //        //        Ancho = $(window).width();
    //        //        Alto = $(window).height();
    //        AbrirOpcion(tabOpciones, "#TabEliminar", "Eliminar registros", Alto - 62, Ancho - 250);
    //    }

    //$("#ifInicial").attr("src", "Imp_ProcesoInicio.aspx");

    AccionInicio();

    VisorTareas();

    function AccionInicio() {
        if ($("#hdfAccion").val() == "1") {
            pagina = "Imp_Proceso.aspx";
            //Proceso();
            ProcesoTarea();
        }
    }
});