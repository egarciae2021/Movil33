var nombreempresa = "";
var razon = "";
var codpais = "";
var fechai = "";
var fechaf = "";
var obs = "";
var descrip = "";
var titular = "";
var tipoli = "";
var nombredom = "";
var servapp = "";
var servbd = "";
var vcTab = "";
var RaizSistema = '';

$(function () {

    var inQuitarAlto = 115;
    $("#ifTema").height($(window).height() - inQuitarAlto);

    //**************Eventos del panel de navegación***********

    var Modulos = $("#hdfModuloCantidad").val();

    // paneles de navegacion
    var h3top = "ui-accordion-header ui-helper-reset ui-state-active ui-corner-top";
    var h3topall = "ui-accordion-header ui-helper-reset ui-state-active ui-corner-all";
    var ico_felcha_arriba = "ui-icon ui-icon-circle-triangle-n";
    var ico_felcha_abajo = "ui-icon ui-icon-circle-triangle-s";

    var i = 2;

    for (i = 2; i <= Modulos; i++) { // Al cargar la pagina oculta todo los paneles menos el primero

        $("#BarraNavegacionJQ1_Panel" + i.toString()).find("h3").attr('class', h3topall);
        $("#BarraNavegacionJQ1_Panel" + i.toString()).find("span").attr('class', ico_felcha_abajo);
        $("#BarraNavegacionJQ1_Panel" + i.toString()).find('input[type="hidden"]').val('0');
        $("#BarraNavegacionJQ1_Panel" + i.toString()).find('div').css("display", "none");
    }

    $('#BarraNavegacionJQ1 > div').click(function () { // si se hace click en un panel

        var nombrePanel = $(this).attr('id'); //obtiene nombre del panel
        var valorActual = nombrePanel.substr(nombrePanel.length - 1); // obtiene numero del panel

        var items = 2;
        var i = 1;
        for (i = 1; i <= Modulos; i++) {
            if (i == valorActual) //oculta todo los paneles menos el seleccionado
            {
                continue;
            }
            $("#BarraNavegacionJQ1_Panel" + i.toString()).find("h3").attr('class', h3topall);
            $("#BarraNavegacionJQ1_Panel" + i.toString()).find("span").attr('class', ico_felcha_abajo);
            $("#BarraNavegacionJQ1_Panel" + i.toString()).find('input[type="hidden"]').val('0');
            $("#BarraNavegacionJQ1_Panel" + i.toString()).find('div').css("display", "none");
        }

    });
    // fin paneles de navegacion

    $(".PanelBarraNavegacion").live("mousemove", function () {
        $(this).addClass('ui-state-highlight quitarBorde');
    });
    $(".PanelBarraNavegacion").live("mouseout", function () {
        $(this).removeClass('ui-state-highlight quitarBorde');
    });
    $(".PanelBarraNavegacionItemSeleccion").live("click", function () {
        pagina = $(this).attr("url");
        vcTab = $(this).attr("id");
        var EventoClick = $(this).attr("Click");
        eval(EventoClick)();
    });
    //******************************************************



    $(window).resize(function () {
        $("#ifTema").height($(window).height() - inQuitarAlto);
    });

    $('#btnMostrarMenu').click(function () {
        $(this).css("display", "none");

        $("#tdMenu").attr("width", "160px");
        $("#Menunavegacion").css("display", "");
        $("#btnOcultarMenu").css("display", "");
    });

    $('#btnOcultarMenu').click(function () {
        $(this).css("display", "none");
        $("#tdMenu").attr("width", "0px");
        $("#Menunavegacion").css("display", "none");
        $("#btnMostrarMenu").css("display", "");
        $("#BarraNavegacionJQ1").css("display", "");
    });


    function Asistente() {
        vcTab = 'Asist';
        var $Pagina = 'Asistente/MainAsistente.aspx?vcTab=' + vcTab;
        //$("#ifTema").height($(window).height() - inQuitarAlto);
        //console.log("llamo a Asistente");
        $("#ifTema").attr("src", $Pagina);
        //$("#ifTema").css('background-color', 'red');
    }


    Solicitudes = function () {
        vcTab = 'Solicitudes';
        var $Pagina = 'Solicitudes/Adm_ListadoSolicitudes.aspx?vcTab=' + vcTab;
        $("#ifTema").attr("src", $Pagina);
    };


    function ItemDinamico() {

        $("#ifTema").attr("src", pagina);

    }

    tabInformativo = $("#tabInformativo").tabs({});
    $("#tabInformativo").append('<div id="dv_EtiquetaEmpleado" class="CerrarTodosTabs" title="" height="300px" width="250px" style="font-weight:bold;color:#FFFFFF;right: 8px; top: 8px; position: absolute; height: 400px !important;"></div>');

    ObtenerRaizSistema();

    function ObtenerRaizSistema() {
        $.ajax({
            type: "POST",
            url: "Common/WebService/General.asmx/ObtenerRaizSistema",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                RaizSistema = result.d;
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    }

});

function fnMostrarEspera() {
    $("#divWait").show();
    //$('body').scrollTop(0);
}

function fnOcultarEspera() {
    $("#divWait").fadeOut(300, function () {
        //$('body').scrollTop(0);
    });
}



function fullScreen() {
    //alert('cvcvcvcvcvcaaaaaaaaaaaaaaaaa');
    var alto = $(window).height() - 20;
    $("#ifTema").css({ "position": "absolute", "top": "0px", "left": "0px", "height": alto + "px" });
}

function defaultScreen() {
    var alto = $(window).height() - 110;
    $("#ifTema").css({ "position": "initial","height": alto + "px" });
}