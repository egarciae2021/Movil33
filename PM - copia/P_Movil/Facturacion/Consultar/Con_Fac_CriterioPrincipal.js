var tabOpciones;
var pagina = "";
var NumConsulta = 1;

function IngresarEmpleados(empleados) {//Carga los empleados seleccionados del formulario respectivo
    var divTabs = $(tabOpciones).find("div");
    for (i = 0; i < divTabs.length; i++) {
        if (!$(divTabs[i]).hasClass("ui-tabs-hide")) {
            var ifrm = $(divTabs[i]).find(".ifContenido");
            $(ifrm)[0].contentWindow.IngresarEmpleados(empleados);
        }
    }
}
function IngresarLineas(lineas) {//Carga las lineas seleccionadas del formulario respectivo
    var divTabs = $(tabOpciones).find("div");
    for (i = 0; i < divTabs.length; i++) {
        if (!$(divTabs[i]).hasClass("ui-tabs-hide")) {
            var ifrm = $(divTabs[i]).find(".ifContenido");
            $(ifrm)[0].contentWindow.IngresarLineas(lineas);
        }
    }
}
function IngresarAreas(areas) {//Carga las areas seleccionadas del formulario respectivo
    var divTabs = $(tabOpciones).find("div");
    for (i = 0; i < divTabs.length; i++) {
        if (!$(divTabs[i]).hasClass("ui-tabs-hide")) {
            var ifrm = $(divTabs[i]).find(".ifContenido");
            $(ifrm)[0].contentWindow.IngresarAreas(areas);
        }
    }
}
function IngresarCentroCosto(centrosCostos) {//Carga los centros de costos seleccionados del formulario respectivo
    var divTabs = $(tabOpciones).find("div");
    for (i = 0; i < divTabs.length; i++) {
        if (!$(divTabs[i]).hasClass("ui-tabs-hide")) {
            var ifrm = $(divTabs[i]).find(".ifContenido");
            $(ifrm)[0].contentWindow.IngresarCentroCosto(centrosCostos);
        }
    }
}

function abrirDialogSelectEmp() {
    var $width = 920;
    var $height = 505;
    var $Pagina = '../../Consultar/Con_SeleccionArea.aspx?Tipo=2&Multiple=1&UnPanel=0'; //JHERRERA 20140807-- Ahora sólo se mostrará un panel para la selección de empleado
    //            var $Pagina = 'Con_SeleccionArea.aspx?Tipo=2&Multiple=1';
    $("#ifArea").attr("src", $Pagina);
    Modal = $('#dvArea').dialog({
        title: "Seleccionar empleado",
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
}
function abrirDialogSelecLiena(empSel) {
    var $width = 740;
    var $height = 505;
    var $Pagina = '../../Consultar/Con_SeleccionArea.aspx?Tipo=3&Multiple=1&vcCodEmp=' + empSel + '&UnPanel=1'; //JHERRERA 20140807-- Ahora sólo se mostrará un panel para la selección de empleado
    $("#ifArea").attr("src", $Pagina);
    Modal = $('#dvArea').dialog({
        title: "Seleccionar celular",
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
}

var ExisteCentroCosto = false;
var ifCentroCosto = $("#ifCCO");

function abrirDialogSelecOficina(oficina) {
    if (oficina == "1") {//Organización
        var $width = 750;
        var $height = 525;
        var $Pagina = '../../Consultar/Con_SeleccionArea.aspx?Tipo=1&Multiple=1&UnPanel=1'; //JHERRERA 20140807-- Ahora sólo se mostrará un panel para la selección de empleado
        $("#ifArea").attr("src", $Pagina);
        Modal = $('#dvArea').dialog({
            title: "Seleccionar Área",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    }
    else if (oficina == "2") {//Centro de costo
        var width = 590;
        var height = 470;
        Modal = $('#dvCCO').dialog({
            title: "Seleccionar centro de costo",
            width: width,
            height: height,
            modal: true,
            resizable: false
        });
        if (!ExisteCentroCosto) {
            var $Pagina2 = '../../Consultar/Con_SeleccionCentroCosto.aspx';
            $("#ifCCO").attr("src", $Pagina2);
            ExisteCentroCosto = true;
        }
    }
}


$(function () {


    $(".btnNormal").button({});

    $("div", ".btnNormal").css({ margin: 0, padding: 0, width: 28, height: 35 });
    $("span", ".btnNormal").css({ margin: 0, padding: 0, width: 26 });

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        $(".tabs").css({ height: Alto - 60, width: Ancho - 23 });
        $(".tabHijo").css({ height: Alto - 108, width: Ancho - 25 });
        $(".ifContenido").css({ height: Alto - 81, width: Ancho - 25 });
        $(".tabConsulta").css({ height: Alto - 81, width: Ancho - 200 });
    }

    $(window).resize(function () {
        DimPosElementos();
    });

    tabOpciones = $("#TabOpciones").tabs({
        tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remover Tab</span></li>",
        add: function (event, ui) {
            var ifra = document.createElement('IFRAME');
            var Ancho = $(window).width();
            var Alto = $(window).height();
            ifra.width = Ancho - 60;
            ifra.height = Alto - 80;
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

    inicio();

    function inicio() {
        
        $("#txtUsuarioBusqueda").hide();

        var Ancho = $(window).width();
        var Alto = $(window).height();
        pagina = "Con_Fac_Criterio.aspx?inNumCri=" + NumConsulta;
        AbrirOpcionTab(tabOpciones, "#TabConsulta_" + NumConsulta.toString(), "Consulta " + NumConsulta.toString(), Alto - 102, Ancho - 150);
        NumConsulta++;
        DimPosElementos();
    }

    $("#TabOpciones span.ui-icon-close").live("click", function () {
        var index = $("li", tabOpciones).index($(this).parent());
        tabOpciones.tabs("remove", index);
    });

    $("#btnNuevo").click(function () {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        pagina = "Con_Fac_Criterio.aspx?inNumCri=" + NumConsulta;
        AbrirOpcionTab(tabOpciones, "#TabConsulta_" + NumConsulta.toString(), "Consulta " + NumConsulta.toString(), Alto - 102, Ancho - 150);
        NumConsulta++;
    });

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
            $(Id).addClass("tabConsulta");
        }
        else {//En el caso que exista lo muestra
            tab.tabs('select', Id);
        }
    }

});
