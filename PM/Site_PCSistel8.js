/// <reference path="Common/Scripts/jquery-2.0.0-vsdoc.js" />

//function cuenta(P_vcCod, vcNom) {
//    this.P_vcCod = P_vcCod;
//    this.vcNom = vcNom;
//}
//prueba;mpajuelo

var IdSolicitudes = '';
var IdMisIncidencias = '';
var IdRegistrarIncidencias = '';
var Modo_BASIC_BOLSA = false;

var PaginaPadre = true;
var socket = null;
var socketGeneral = null;
var PuertoServer = "80";
var IPServer = "130.1.7.78";
var IdUsuarioConectado = '';
var NombreUsuario = '';
var DescripcionUsuario = '';
var TipoUsuario = '';
var TotalUsuariosConectados = 0;

var tmrEnviarNotificacionActivo;
var tmrMostrarNuevoMensaje;
var UltimaFechaActualizacionNodeJS = new Date();

var RaizSistema = '';

var miTipoAlerta = 0;
var miSubtipoAlerta = 0;

var tabschild;
var offsetTabPrincipal = 4; //Se modifica el alto de los controles
var dlgTema;
var tabPrincipal;
var pagina = "";
var dlgCargaInicial = null;
var flgEstadoChat = false;
var ChatActivo = false;
var UsuariosConectados = [];

var oCulturaUsuario = null;
var Seg_temporizador;
var MyTimerTemporizador;
//var OneLoad = true;
var left_Offset = 0;
var top_Offset = 0;

//JHERRERA 20150318: Botón actualizar
var vcTabSel;

function miEntTemporizador(IdTemporizador, Tiempo, Reiniciar, TiempoTranscurrido) {
    this.IdTemporizador = IdTemporizador;
    this.Tiempo = (Tiempo * 60) - TiempoTranscurrido;
    //this.Tiempo = 10;
    this.Reiniciar = Reiniciar;
    this.TiempoInicial = this.Tiempo;
    this.TiempoTotalTranscurrido = 0;
}

function fnCerrarCargaInicial() {
    try {
        if (dlgCargaInicial != null) {
            //$("#ContenidoPrincipal").show();
            $("#Form1").show();
            dlgCargaInicial.dialog("close");
            fnLateralSplitterDinamic();
            //Posiciona "Ultimos intentos" desde la derecha.
            $("#dvItentos").css({ "right": $("#dvLogin").width() - 20 });

            if (Seg_temporizador.IdTemporizador != -1) {
                //$("#dvTimer").show('blind', {}, 'slow');
                $("#dvTimer").show(1000);
            }

            // ***************************************************************
            if (Modo_BASIC_BOLSA == true) {
                $("#tbPrincipal_SplitterJQ3_I").hide();
                AbrirTabMovil("tbPrincipal_TabJQ3_AccordionProd3_Item0_Item0_tab", "Distribución de Bolsa de Minutos", "P_Movil/Configurar/Conf_DistribucionMinutos_Light.aspx?inCod=5296&inTip=3&inTipOri=1");
                $("#btnDesanclar").hide();
                var Ancho = $(window).width();
                Ancho = Ancho - 23;
                $("#tbPrincipal_SplitterJQ3_D_cR").css("width", Ancho);
                $(".ui-icon-close").hide();
            }
            // ***************************************************************

        }
    } catch (e) {
        //some err
    }
}

$(function () {






    if ($("#hdfEsAdministradorBolsaBasic").val() == "1") {
        Modo_BASIC_BOLSA = true;
    }
    else {
        Modo_BASIC_BOLSA = false;
    }

    $("#MiCanvas").fadeOut();
    $("#Form1").hide();
    dlgCargaInicial = $('#cargasistema').dialog({
        title: 'Cargando Gestión Móvil...',
        width: 320,
        height: 100,
        modal: true,
        resizable: false,
        draggable: false,
        closeOnEscape: false,
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
        }
    });

    //    $("*").click(function () {
    //        if (Seg_temporizador.Reiniciar) {
    //            Seg_temporizador.TiempoInicial = 0;
    //        }
    //    })

    //    $(document).bind('keydown keyup', function (e) {
    //        if (e.which === 116) {
    //            if ($("#pnlBloquearSesion").hasClass("MostrarFinSesion")) {
    //                window.location.href = 'FinTemporizador.aspx';
    //            }
    //        }
    //        if (e.which === 82 && e.ctrlKey) {
    //            if ($("#pnlBloquearSesion").hasClass("MostrarFinSesion")) {
    //                window.location.href = 'FinTemporizador.aspx';
    //            }
    //        }
    //    });
    //    $("#form1").append($("<div></div>").attr("id", "dvMsgAlerta").css({ "display": "none" }));
    //    $("#dvMsgAlerta").append($("<span></span>").addClass("ui-icon ui-icon-alert").css({ "float": "left" }));
    //    $("#dvMsgAlerta").append($("<div></div>").attr("id", "dvContenidoAlerta"));

    $("#btnVolverLoginSesion").hover(function () {
        $(this).addClass("overFinSesion");

    }, function () {
        if ($(this).hasClass("overFinSesion")) {
            $(this).removeClass("overFinSesion");
        }
    });

    $("#btnVolverLoginSesion").click(function () {
        location.reload();
    });

    if ($("#hfTema").val() == 'smart' || $("#hfTema").val() == 'blitzer') {
        $('#miTablaSeguridad tr td').css("color", "white");
    } else {
        $('#miTablaSeguridad tr td').css('color', 'black');
    }

    //alert(Seg_temporizador.IdTemporizador);
    Seg_temporizador = new miEntTemporizador(IdTemporizador, TiempoTemporizador, ReinciarTemporizador, miTotalSegTrans);

    if (Seg_temporizador.IdTemporizador != -1) {
        //$("#dvTimer").show(1000);
        MyTimerTemporizador = setInterval(function () { fnMyTimerTemporizador(); }, 1000);
    }


    ObtenerRaizSistema();

    tmrEnviarNotificacionActivo = $.timer(function () {
        //Validar fecha actualizacion del server NodeJS
        var FechaActual = new Date();
        if ((FechaActual - UltimaFechaActualizacionNodeJS) > 7500) {
            //Se perdio conexion con el servidor...
            ChatActivo = true;
            tmrEnviarNotificacionActivo.pause();
            $("#trNoDisponible").click();
        }
        //document.title = (FechaActual - UltimaFechaActualizacionNodeJS);
        try {
            socket.emit("AdministradorActivo", IdUsuarioConectado);
        }
        catch (err) {
            //some
        }
    });

    var blMostrarMensajeNuevo = false;
    tmrMostrarNuevoMensaje = $.timer(function () {
        blMostrarMensajeNuevo = !blMostrarMensajeNuevo;
        if (blMostrarMensajeNuevo) {
            $("#dvMensajeChat").show();
        }
        else {
            $("#dvMensajeChat").hide();
        }
    });
    $("#dvMensajeChat").css({ 'cursor': 'hand', 'cursor': 'pointer' });
    $("#dvMensajeChat").click(function () {
        //Abrir la pagina de chat!!!
        $("a[href^='P_Movil/AdministrarTickets/AdmTck_PanelAdministracion.aspx']").parent().click();
        $('#tbPrincipal').tabs('option', 'selected', 0);
        tmrMostrarNuevoMensaje.pause();
        $("#dvMensajeChat").hide();
    });

    tmrEnviarNotificacionActivo.set({ time: 1250, autostart: false });
    tmrMostrarNuevoMensaje.set({ time: 750, autostart: false });

    $("#trDisponible").click(function () {
        if (ChatActivo == true) {
            $("#dvEstadoChat").hide();
            return;
        }
        tmrEnviarNotificacionActivo.play();
        //        $("#trNoDisponible").css({ "font-style": "normal", "text-decoration": "none" });
        //        $("#trDisponible").css({ "font-style": "italic", "text-decoration": "underline" });
        //        $(".tdimgUsuario").css({ "background-color": "#5DD255" });
        //        flgEstadoChat = !flgEstadoChat;
        //        $("#dvEstadoChat").hide();

        iniciarSocket();

        //ActivarChat(true);
    });
    $("#trNoDisponible").click(function () {
        if (ChatActivo == false) {
            $("#dvEstadoChat").hide();
            return;
        }
        $("#trDisponible").css({ "font-style": "normal", "text-decoration": "none" });
        $("#trNoDisponible").css({ "font-style": "italic", "text-decoration": "underline" });
        $(".tdimgUsuario").css({ "background-color": "#B7B9BC" });
        flgEstadoChat = !flgEstadoChat;
        $("#dvEstadoChat").hide();
        ActivarChat(false);
    });


    IdUsuarioConectado = $("#hfIdUsuario").val();
    NombreUsuario = $("#hfNombreUsuario").val();
    DescripcionUsuario = $("#hfDescripcionUsuario").val();
    TipoUsuario = $("#hfTipoUsuario").val();

    var Login_Ancho = $("#dvLogin").width();
    Paleta_Ancho = $("#dvPaleta").width();
    //tabs({ fx: { height/opacity: 'toggle', duration: 1000} });
    tabPrincipal = $("#tbPrincipal").tabs({ fx: { opacity: 'toggle', duration: 50 } });

    $("#tbPrincipal span.ui-icon-close").live("click", function () {
        var index = $("li", tabPrincipal).index($(this).parent());
        tabPrincipal.tabs("remove", index);
    });

    //$("body").hide();



    //    $.ajax({
    //        type: "POST",
    //        url: "Common/WebService/General.asmx/ListarIdioma",
    //        data: "{}",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (result) {
    //            for (var i in result.d) {
    //                $.cookie(result.d[i].vcNomPag, JSON.stringify(result.d[i]));
    //            }
    //        },
    //        error: function (xhr, err, thrErr) {
    //            MostrarErrorAjax(xhr, err, thrErr);
    //        }
    //    });


    /////$(".Refrescar").hide();

    tabschild = $(".tabschild").tabs({
        tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remover Tab</span></li>",
        add: function (event, ui) {
            var Ancho = $(window).width();

            if ($($($(this).find(".CerrarTodosTabs")[0]).parent()).find("ul").length > 0) {
                $($($($(this).find(".CerrarTodosTabs")[0]).parent()).find("ul")[0]).resize(function () {
                    DimPosElementos();
                });
            }

            var altoTaps = $($($($(this).find(".CerrarTodosTabs")[0]).parent()).find("ul")[0]).height();
            if (altoTaps == undefined) {
                altoTaps = 0;
            }
            var Alto = 0;
            if (altoTaps == 0) {
                Alto = $(window).height() - 125;
            }
            else {
                Alto = $(window).height() - (altoTaps + 100);
            }

            var ifra = document.createElement('IFRAME');
            ifra.width = "100%";
            ifra.height = Alto;
            //$("body").css({ "overflow-y": "hidden" });
            ifra.className = "ifContenido";
            //ifra.scrolling = "no";

            //                    ifra.setAttribute("margin-top", "0px");
            //                    ifra.setAttribute("margin-left", "0px");
            //                    ifra.setAttribute("margin-bottom", "0px");
            //                    ifra.setAttribute("margin-right", "0px");
            //                    ifra.setAttribute("padding-top", "0px");
            //                    ifra.setAttribute("padding-left", "0px");
            //                    ifra.setAttribute("padding-bottom", "0px");
            //                    ifra.setAttribute("padding-right", "0px");
            ifra.frameBorder = "0";
            ifra.src = pagina;

            //Obtener nombre de vcTab
            //            var vcTab = '';
            //            var mTab = pagina.split("vcTab=");
            //            if (mTab.length > 1) {
            //                if (mTab[1].split("&").length > 0) {
            //                    vcTab = mTab[1].split("&")[0];
            //                }
            //            }

            //            if (vcTab != '') {
            //                var newdiv = document.createElement('div');
            //                var divIdName = 'div_modal_' + vcTab;
            //                newdiv.setAttribute('id', divIdName);
            //                newdiv.setAttribute('vcTab', vcTab);
            //                newdiv.style.cssText = "display:none;";

            //                var ifraDiv = document.createElement('IFRAME');
            //                ifraDiv.setAttribute('id', "iframe_modal_" + vcTab);
            //                ifraDiv.width = "100%";
            //                ifraDiv.className = "ifContenido";
            //                ifraDiv.frameBorder = "0";
            //                newdiv.appendChild(ifraDiv);

            //                $(ui.panel).append(newdiv);
            //            }

            $(ui.panel).append(ifra);
            $(this).tabs('select', '#' + ui.panel.id);

            $(this).find(".Refrescar").show();

            //$(".Refrescar").show();

            ////if (pagina.toUpperCase().indexOf("P_MOVIL/DASHBOARD/DASHBOARD_I.ASPX") == 0) {
            ////    $(".Refrescar").show();
            ////} else {
            ////    $(".Refrescar").hide();
            ////}

            //$("div", $tabschild).css({ height: Alto - $("ul", $tabschild[0])[0].offsetHeight - 132 + 35 });
        },
        show: function (event, ui) {
            $('h3', '.ExploradorWeb').removeClass("ui-state-active");
            $('h3 span', '.ExploradorWeb').removeClass("ui-icon-triangle-1-s");
            $('h3 span', '.ExploradorWeb').addClass("ui-icon-triangle-1-e");

            ////if ($(ui.panel).find(".ifContenido").length > 0) {
            ////    if ($(ui.panel).find(".ifContenido").attr("src").toUpperCase().indexOf("P_MOVIL/DASHBOARD/DASHBOARD_I.ASPX") == 0) {
            ////        $(".Refrescar").show();
            ////    } else {
            ////        $(".Refrescar").hide();
            ////    }
            ////}

            vcTabSel = ui.panel.id;
        }
    });

    inicioPagina();

    function inicioPagina() {
        DimPosElementos();
        $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());

        if ($.browser.chrome) {
            $("#dvLogin").css({ top: 4 });
        }


        if ($("#hfTipoUsuario").val() == 'administrador') {
            ActivarChat(false);
        }
    }

    $(window).resize(function () {
        DimPosElementos();
        //fnLateralSplitterDinamic();
    });




    // addTab button: just opens the dialog
    $('#imgTema').click(function () {
        var $width = 710;
        var $height = 560;
        var $Pagina = 'Theme.aspx';

        $("#ifTema").width($width - 10);
        $("#ifTema").height($height - 30);
        $("#ifTema").attr("src", $Pagina);

        dlgTema = $("#dvTema").dialog({
            title: "Temas",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    });

    $(".tabschild span.ui-icon-close").live("click", function () {
        //var Alto = $(window).height();
        var Accord = $("#" + $(this)[0].parentElement.parentElement.parentElement.id);
        var index = $("li", Accord).index($(this).parent());
        Accord.tabs("remove", index);

        if ($("li", Accord).length == 0) {
            //OCULTAR REFRESH...
            $(Accord).find(".Refrescar").hide();
        }

        //                if (tabschild.length > 0)
        //                    if ($("ul", tabschild[0]).length > 0) {
        //                        $(".ifContenido").css({ height: Alto - $("ul", tabschild[0])[0].offsetHeight - 95 });
        //                        $("div", tabschild).css({ height: Alto - $("ul", tabschild[0])[0].offsetHeight - 132 + 35 });
        //                    }
    });

    //    $("#loginEstado").live("mousemove", function () {
    //        $(this).removeClass('ui-accordion-header ui-helper-reset ui-state-default ui-corner-all LoginEstado');
    //        $(this).addClass('ui-accordion-header ui-helper-reset ui-state-hover ui-corner-all LoginEstado');
    //    });
    //    $("#loginEstado").live("mouseout", function () {
    //        $(this).removeClass('ui-accordion-header ui-helper-reset ui-state-hover ui-corner-all LoginEstado');
    //        $(this).addClass('ui-accordion-header ui-helper-reset ui-state-default ui-corner-all LoginEstado');
    //    });

    $("#tdMiPerfil").live("mousemove", function () {
        $(this).removeClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');
        $(this).addClass('ui-accordion-header ui-helper-reset ui-state-hover ui-corner-all');
        $("#lnbtnMiPerfil").css('color', '#1D5987');
    });
    $("#tdMiPerfil").live("mouseout", function () {
        $(this).removeClass('ui-accordion-header ui-helper-reset ui-state-hover ui-corner-all');
        $(this).addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');
        $("#lnbtnMiPerfil").css('color', '#FFFFFF');
    });
    $("#tdLoginEstado").live("mousemove", function () {
        $(this).removeClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');
        $(this).addClass('ui-accordion-header ui-helper-reset ui-state-hover ui-corner-all');
        $("#loginEstado").css('color', '#1D5987');
    });
    $("#tdLoginEstado").live("mouseout", function () {
        $(this).removeClass('ui-accordion-header ui-helper-reset ui-state-hover ui-corner-all');
        $(this).addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');
        $("#loginEstado").css('color', '#FFFFFF');
    });

    //TOOLTIP para los PRO_PRODUCTOS
    $("#tbPrincipal > ul > li > a").hover(function () {
        var pos = $(this).offset();
        var width = $(this).width();
        var title = $(this).attr("data-tooltip");
        if (title != '') {
            $("#miToolTip").html(title);
            $("#miToolTip").css("left", pos.left + $(this).width() + 85);
            $("#data-tooltip-triangle").css("left", pos.left + $(this).width() + 15);
            $("#miToolTip").css("top", pos.top + 34);
            $("#data-tooltip-triangle").css("top", pos.top + 28);
            $("#miToolTip").show();
            $("#data-tooltip-triangle").show();
        }
    },
    function () {
        $("#miToolTip").hide();
        $("#data-tooltip-triangle").hide();
    });

    //TOOLTIP para los PRO_MODULOS
    $(".ExploradorWeb > li > h3 > a").hover(function () {
        var pos = $(this).offset();
        var width = $(this).width();
        var title = $(this).attr("data-tooltip");
        if (title != '') {
            $("#miToolTip").html(title);
            $("#miToolTip").css("left", pos.left + $(this).width() + 35);
            $("#data-tooltip-triangle").css("left", pos.left + $(this).width() - 35);
            $("#miToolTip").css("top", pos.top + 34);
            $("#data-tooltip-triangle").css("top", pos.top + 28);
            $("#miToolTip").show();
            $("#data-tooltip-triangle").show();
        }
    },
    function () {
        $("#miToolTip").hide();
        $("#data-tooltip-triangle").hide();
    });

    //TOOLTIP para los PRO_OPCION
    $(".ExploradorWeb > li > ul > li > h3 > a").hover(function () {
        var pos = $(this).offset();
        var width = $(this).width();
        var title = $(this).attr("data-tooltip");
        if (title != '') {
            $("#miToolTip").html(title);
            $("#miToolTip").css("left", pos.left + $(this).width() + 60);
            $("#data-tooltip-triangle").css("left", pos.left + $(this).width() - 10);
            $("#miToolTip").css("top", pos.top + 34);
            $("#data-tooltip-triangle").css("top", pos.top + 28);
            $("#miToolTip").show();
            $("#data-tooltip-triangle").show();
        }
    },
    function () {
        $("#miToolTip").hide();
        $("#data-tooltip-triangle").hide();
    });

    //TOOLTIP para los PRO_ITEM
    $(".ExploradorWeb > li > ul > li > ul > li > h3 > a").hover(function () {
        var pos = $(this).offset();
        var width = $(this).width();
        var title = $(this).attr("data-tooltip");
        if (title != '') {
            $("#miToolTip").html(title);
            $("#miToolTip").css("left", pos.left + $(this).width() + 60);
            $("#data-tooltip-triangle").css("left", pos.left + $(this).width() - 10);
            $("#miToolTip").css("top", pos.top + 34);
            $("#data-tooltip-triangle").css("top", pos.top + 28);
            $("#miToolTip").show();
            $("#data-tooltip-triangle").show();
        }
    },
    function () {
        $("#miToolTip").hide();
        $("#data-tooltip-triangle").hide();
    });

    //------------------------------Candidato a plugin JQUERY------------------------------
    $('.ExploradorWeb ul').hide();
    $(".ExploradorWeb li h3").mousemove(PasoxItem);
    $(".ExploradorWeb li h3").mouseleave(SalioxItem);

    function PasoxItem() {
        $(this).addClass('ui-state-hover');
    }
    function SalioxItem() {
        $(this).removeClass("ui-state-hover");
    }

    $('.ExploradorWeb li h3').click(
                function () {

                    var checkElement = $(this).next();
                    var titulo = $("a", $(this));
                    pagina = titulo.attr("href");
                    //alert(isIE());
                    if (pagina != "" && pagina != null) {

                        if (pagina.indexOf("http:") >= 0 || pagina.indexOf("https:") >= 0) {
                            window.open(pagina);
                        }
                        else {
                            var Accord = $(this)[0].parentElement;
                            var Tag = Accord.id.split("_");
                            var tab = $("#" + Tag[0] + "_" + Tag[1] + "_Tab" + Tag[2].substring(13));
                            var Id = "#" + $(this).parent().attr("id") + "_tab"; //titulo.attr("nombre");                        
                            var $panel = tab.find(Id);
                            if (!$panel.length) {//En el caso que no exista el tab, lo crea
                                var Titulo = titulo.attr("titulo");
                                if (Titulo.toString().toLowerCase() == 'solicitudes') {
                                    IdSolicitudes = $(this).parent().attr("id") + "_tab"; //titulo.attr("nombre");;
                                }
                                if (Titulo.toString().toLowerCase() == 'mis incidencias') {
                                    IdMisIncidencias = $(this).parent().attr("id") + "_tab"; //titulo.attr("nombre");;
                                }
                                if (Titulo.toString().toLowerCase() == 'registrar ticket') {
                                    IdRegistrarIncidencias = $(this).parent().attr("id") + "_tab"; //titulo.attr("nombre");;
                                }
                                if (isIE() == 6) {
                                    if (Titulo == 'Pagos') {
                                        pagina = pagina.replace("Adm_IngresarPago.aspx", "Adm_IngresarPagoIE.aspx");
                                    }
                                    else if (Titulo == 'Cuentas de Cobro') {
                                        pagina = pagina.replace("Adm_IngresarFactura.aspx", "Adm_IngresarFacturaIE.aspx");
                                    } else if (Titulo == 'Proceso') {
                                        //alert('borrar esto');
                                    }
                                }
                                tab.tabs("add", Id, Titulo);
                                $(Id).css("width", "99%");
                                $(Id).css("height", "94%");
                                $(Id).css("margin-top", "0px");
                                $(Id).css("margin-left", "0px");
                                $(Id).css("margin-bottom", "0px");
                                $(Id).css("margin-right", "0px");
                                $(Id).css("padding-top", "0px");
                                $(Id).css("padding-left", "0px");
                                $(Id).css("padding-bottom", "0px");
                                $(Id).css("padding-right", "0px");
                            }
                            else { //En el caso que exista lo muestra
                                tab.tabs('select', Id);
                            }
                            $("#" + Accord.id).click(false);
                        }
                    }

                    if (!checkElement.is('ul')) {
                        $('ul:visible', $(this)[0].parentElement.parentElement).slideUp('normal');
                        $('h3', $(this)[0].parentElement.parentElement).removeClass("ui-state-active");
                        $('h3 span', $(this)[0].parentElement.parentElement).removeClass("ui-icon-triangle-1-s");
                        $('h3 span', $(this)[0].parentElement.parentElement).addClass("ui-icon-triangle-1-e");
                        $(this).removeClass("ui-state-hover");
                        $(this).addClass("ui-state-active");
                        return false;
                    }
                    if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
                        checkElement.slideUp('normal');
                        $(this).removeClass("ui-state-active");
                        $(this).removeClass("ui-state-hover");
                        $('span', $(this)).removeClass("ui-icon-triangle-1-s");
                        $('span', $(this)).addClass("ui-icon-triangle-1-e");
                        return false;
                    }
                    if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
                        $('ul:visible', $(this)[0].parentElement.parentElement).slideUp('normal');
                        $('h3', $(this)[0].parentElement.parentElement).removeClass("ui-state-active");
                        $('h3 span', $(this)[0].parentElement.parentElement).removeClass("ui-icon-triangle-1-s");
                        $('h3 span', $(this)[0].parentElement.parentElement).addClass("ui-icon-triangle-1-e");
                        checkElement.slideDown('normal');
                        $(this).removeClass("ui-state-hover");
                        $(this).addClass("ui-state-active");
                        $('span', $(this)).removeClass("ui-icon-triangle-1-e");
                        $('span', $(this)).addClass("ui-icon-triangle-1-s");
                        return false;
                    }
                    return false;
                }
            );
    //---------------------------------------------------------------------------------
    //    $.timer(5000, function (temporizador) {
    //        $.ajax({
    //            type: "POST",
    //            url: "Common/WebService/General.asmx/VerificaSesion",
    //            data: "{}",
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            success: function (result) {
    //                if (result.d != "") {
    //                    temporizador.stop();
    //                    window.location.href = 'Login.aspx';
    //                }
    //            },
    //            error: function (xhr, err, thrErr) {
    //                temporizador.stop();
    //                window.location.href = 'Login.aspx';
    //            }
    //        });
    //    });

    //Alto cabecera...
    $(".ui-state-default", "#tbPrincipal_buttons").css({ "top": "37px" });

    //Ubicacion de tab principal....
    if ($("#hfTema").val() == 'redmond' || $("#hfTema").val() == '') {
        $("#tbPrincipal_buttons").css({
            "margin-left": "120px", "height": "64px",
            "background-image": "url('Images/headerbgmain.png')",
            //"background-image": "url('Images/FondoMovistar.png')",
            "background-repeat": "repeat",
            "background-position": "top"
        });
        $("#lblNombreUsuario").css("color", "black");
        $("#lnbtnMiPerfil").css("color", "white");
        $("#loginEstado").css("color", "white");
    }
    else {
        if ($("#hfTema").val() == 'blitzer') {
            $("#tbPrincipal_buttons").css({
                "margin-left": "120px", "height": "64px",
                "background-image": "url('Images/FondoRojo.jpeg')",
                "background-repeat": "repeat",
                "background-position": "top"
            });
            $("#lblNombreUsuario").css("color", "white");
            $("#lnbtnMiPerfil").css("color", "white");
            $("#loginEstado").css("color", "white");
        }
        if ($("#hfTema").val() == 'smart') {
            $("#tbPrincipal_buttons").css({
                "margin-left": "120px", "height": "64px",
                "background-image": "url('Images/FondoMovistar.png')",
                "background-repeat": "repeat",
                "background-position": "top"
            });
            $("#lblNombreUsuario").css("color", "white");
            $("#lnbtnMiPerfil").css("color", "white");
            $("#loginEstado").css("color", "white");
        }
        $("#tbPrincipal_buttons").css({ "margin-left": "120px", "height": "64px" });
    }

    //Ubica logos principales...
    //$("#LogoCliente").css({ "width": "120px", "height": "62px", "position": "absolute", top: 3, left: 1 });
    $("#LogoCliente").css({ "width": "120px", "height": "66px", "position": "absolute", top: 1, left: 1 });
    $("#LogoProducto").css({ "position": "absolute", top: 7, left: 128 });
    //$("#btnChat").css({ "width": "65px", "height": "65px", "position": "absolute", top: 3, left: 200 });


    $("#btnChat").live("mousemove", function () {
        $(this).css({ "box-shadow": "0px 10px 25px gray" });
    });
    $("#btnChat").live("mouseout", function () {
        $(this).css({ "box-shadow": "" });
    });

    $(".CerrarTodosTabs").live("click", function (e, o) {
        CerrarTodosTabs(e, o);
    });

    $(".Refrescar").live("click", function (e, o) {
        $("#" + vcTabSel + " > .ifContenido").attr("src", $("#" + vcTabSel + " > .ifContenido").attr("src"));
        //        $('#your_iframe').attr('src', $('#your_iframe').attr('src'));
    });

    $(".Refrescar").css({ "height": "20px" });

    $(".ui-icon-triangle-1-e").css({ "margin-top": "4px" });

    $("#tdMiPerfil").css({ "height": "18px" });
    $("#tdLoginEstado").css({ "height": "18px" });

    $(document).css({ "overflow-x": "hidden" });


    // ===========================================================================================================
    // LINK PERFIL
    // ===========================================================================================================
    var ventanaModalMiPerfil;

    $("#lnbtnMiPerfil").click(function () {
        //var vcTab = 'Mis_Datos';
        //var vcNombreTab = window.parent.$("a[nombre^='" + vcTab + "']").parent().parent().attr("id") + "_tab";
        //AbrirTab(vcNombreTab, "Mis Datos", "");

        $("#ifMiPerfil").css({ "height": "520px" });
        $('#ifMiPerfil').attr("src", 'P_Configuracion/General/MisDatos.aspx?inCod=108&inTip=3&inTipOri=1');

        ventanaModalMiPerfil = $('#div_MiPerfil').dialog({
            title: "Mis Datos ",
            width: 950,
            height: 570,
            modal: true,
            resizable: false,
            // ===================================================================================================================================================
            //open: function (event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide(); },
            // ===================================================================================================================================================
            //buttons: {
            //    "Aplicar los Cambios": function () {
            //        // ===================================================================================================================================================
            //        //$("#ifReinicia")[0].contentWindow.guardar_datos(fn_flag_contraseña);
            //        $("#ifReinicia")[0].contentWindow.Confirmar_datos(fn_flag_contrasena); //Agregado Jcamacho 2015/10/01 Mensaje de confirmación
            //        // ===================================================================================================================================================
            //    }
            //
            //}
        });







        // AbrirTab("Rpt_ResumenFacturacion", "Reporte", "P_Movil/DashBoard/Rpt_ResumenFacturacion.aspx");
    });


    $($(".ifContenido").parent().css({ "overflow-y": "hidden" }));


    //Activar este metodo cuando este en producción!
    //ObtenerEstadoChat();

    $("#dvEstadoChat").css({ "width": "120px", "height": "62px", "position": "absolute", top: 62, right: 90 });
    //$(".tdimgUsuario").css({ "background-color": "#B7B9BC", "cursor": "hand", "cursor": "pointer" });
    $(".tdimgUsuario").css({ "background-color": "#B7B9BC" });
    $(".trEstadoChat").live("mousemove", function () {
        $(this).removeClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');
        $(this).addClass('ui-accordion-header ui-helper-reset ui-state-hover ui-corner-all');
        $(this).css({ 'color': '#1D5987', 'cursor': 'hand', 'cursor': 'pointer' });
    });
    $(".trEstadoChat").live("mouseout", function () {
        $(this).removeClass('ui-accordion-header ui-helper-reset ui-state-hover ui-corner-all');
        $(this).addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');
        $(this).css('color', '#FFFFFF');
    });
    $(".trEstadoChat").removeClass('ui-accordion-header ui-helper-reset ui-state-hover ui-corner-all');
    $(".trEstadoChat").addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');
    $(".trEstadoChat").css('color', '#FFFFFF');
    $("#trNoDisponible").css({ "font-style": "italic", "text-decoration": "underline" });
    $(".tdimgUsuario").click(function () {

        //Cambio de Imagen del Usuario...
        //        if ($("#hfTipoUsuario").val() == 'administrador') {
        //            flgEstadoChat = !flgEstadoChat;
        //            if (flgEstadoChat == true) {
        //                $("#dvEstadoChat").show();
        //            }
        //            else {
        //                $("#dvEstadoChat").hide();
        //            }
        //        }
        //        else {
        //            var $Pagina = 'UploadUsuario.aspx';
        //            $("#ifChangeImagenUsuario").attr("src", $Pagina);
        //            var $width = 410;
        //            var $height = 250;
        //            modalImagenUsuario = $("#ChangeImagenUsuario").dialog({
        //                title: "Cambiar Imagen Usuario",
        //                width: $width,
        //                height: $height,
        //                modal: true,
        //                resizable: false
        //            });
        //        }


    });


    //    $("#dvMensajeChat").hide();
    //    $("#dvMensajeChat").removeClass();
    //$("#dvMensajeChat").addClass('ui-mensaje ui-mensaje-03');
    //    $("#dvMensajeChat").fadeIn(1500);


    $("#dvCantidadMensajeNoLeido").css({ "color": "#CC0A0C", "background-color": "transparent", "width": "160px", "height": "15px", "position": "absolute", "top": 20, "right": 195, "z-index": 10000, "boder": 0 });
    //$("#dvCantidadMensajeNoLeido").show();
    $("#dvCantidadMensajeNoLeido").click(function () {
        $("#dvCantidadMensajeNoLeido").hide();
        AbrirTabMovil("tbPrincipal_TabJQ3_AccordionProd3_Item10_Item0_tab", "Panel Administración", "P_Movil/AdministrarTickets/AdmTck_PanelAdministracion.aspx?inCod=78&inTip=3&inTipOri=1");
    });
    $("#dvCantidadMensajeNoLeido").css({ 'cursor': 'hand', 'cursor': 'pointer' });


    $.ajax({
        type: "POST",
        url: "Common/WebService/General.asmx/VerificaCargaInicial",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d != "") {
                //alert(result.d);
                //fnCerrarCargaInicial(); //GEIG
            }
        },
        error: function (xhr, err, thrErr) {
            //window.location.href('Login.aspx');
        }
    });


    if ($($("[titulo='" + $("#hdfNombreDash").val() + "']").parent()).length == 1) {
        $($("[titulo='" + $("#hdfNombreDash").val() + "']").parent()).click();
    }
    else {
        if ($("[titulo='Dashboard']").length > 0) {
            if ($("[titulo*='Dashboard ']").length > 0) {
                $($($("[titulo*='Dashboard ']")[0]).parent()).click();
            }
            else {
                setTimeout(function () {
                    fnCerrarCargaInicial();
                }, 3000);

            }
        }
        else {
            setTimeout(function () {
                fnCerrarCargaInicial();
            }, 3000);
        }
    }




    //try {
    //Abre socket genérico!!
    //iniciarSocketGeneral();
    //}
    //catch (err) {
    //some err
    //}
    fnMensajes();

    // ===================================================================================================================================================
    // MODULO DE SEGURIDAD - REINICIAR CLAVE
    // ===================================================================================================================================================
    function fn_flag_contrasena(flag) {
        // ===================================================================================================================================================
        if (flag == 1)
            // ===================================================================================================================================================
        {
            $('#div_Reinicia').dialog("close");
            Mensaje("<br/><br/><h1>La contraseña fue actualizada con éxito.</h1>", document);

        }
    } // ===================================================================================================================================================

    if ($("#hdf_Reiniciar_Clave").val() == "1") {
        // ===================================================================================================================================================
        $('#ifReinicia').attr("src", 'P_Configuracion/General/MisDatos_Clave.aspx?inCod=108&inTip=3&inTipOri=1');
        // ===================================================================================================================================================
        ModalNuevo = $('#div_Reinicia').dialog({
            title: "MÓDULO DE SEGURIDAD",
            width: 620,
            height: "auto",
            modal: true,
            resizable: false,
            // ===================================================================================================================================================
            open: function (event, ui) {
                $(".ui-dialog-titlebar-close", ui.dialog).hide();
            },
            // ===================================================================================================================================================
            buttons: {
                "Aplicar los Cambios": function () {
                    // ===================================================================================================================================================
                    //$("#ifReinicia")[0].contentWindow.guardar_datos(fn_flag_contraseña);
                    $("#ifReinicia")[0].contentWindow.Confirmar_datos(fn_flag_contrasena); //Agregado Jcamacho 2015/10/01 Mensaje de confirmación
                    // ===================================================================================================================================================
                }

            }
        });
        // ===================================================================================================================================================
    }
    // ===================================================================================================================================================

    fnAgregarAnclaLateral();




    ////try {
    ////    $($('a:contains("Consultas BI")')).click(function () {

    ////    });
    ////} catch (e) {
    ////}


});
var left_Offset;
var top_Offset;
$(document).mousemove(function (e) {
    left_Offset = e.pageX;
    top_Offset = e.pageY;
});

$(document).bind("contextmenu", function (e) {
    return false;
});
document.onkeydown = function (event) {
    event = (event || window.event);
    if (event.keyCode == 123) {
        return false;
    }
};

function fnMensajes() {

    //    $("#dvMesaggeAlert").click(function () {

    //        $("#dvDetalleMsg").css("top", $(this).offset().top + $(this).height());
    //        $("#dvDetalleMsg").css("right", $(this).offset().right + $(this).width());


    //        $("#dvDetalleMsg").toggle();

    //    })



    function position(event) {
        var x = event.clientX;
        var y = event.clientY;
        alert(x + ' - ' + y);
    }

    $("#dvMesaggeAlert").hover(function () {
        $("#dvDetalleMsg").css("top", $(this).offset().top + $(this).height());
        $("#dvDetalleMsg").css("right", $(window).width() - (parseInt(left_Offset) + 100));
        $("#dvDetalleMsg").show();
    }, function () {
        $("#dvDetalleMsg").hide();
    });

    $("#dvDetalleMsg").hover(function () {
        $("#dvDetalleMsg").show();
    }, function () {
        $("#dvDetalleMsg").hide();
    });


    if (misAlertas != undefined) {
        if (misAlertas.length > 0) {
            var miTotal = 0;
            var k = 0;
            for (k = 0; k < misAlertas.length; k++) {
                miTotal = miTotal + misAlertas[k].CantidadNoLeidos;
            }
            $("#dvNumMsg").text(miTotal.toString());

            var i = 0;
            for (i = 0; i < misAlertas.length; i++) {
                switch (misAlertas[i].Tipo) {
                    case "Solicitudes":
                        $("#dvDetalleMsg").append('<div class="dvMsgDet dvMsgDetSol" OnClick="fnAbrirPaginaAlerta(\'' + misAlertas[i].Tipo + '\',this,' + misAlertas[i].CantidadNoLeidos.toString() + ',\'' + misAlertas[i].DescripcionAlerta + '\' )">' + misAlertas[i].DescripcionAlerta + '<div class="msgBurbuja ui-state-highlight">' + misAlertas[i].CantidadNoLeidos.toString() + '</div></div>');
                        break;
                    case "Administrador de incidencias":
                        $("#dvDetalleMsg").append('<div class="dvMsgDet dvMsgDetInc" OnClick="fnAbrirPaginaAlerta(\'' + misAlertas[i].Tipo + '\',this,' + misAlertas[i].CantidadNoLeidos.toString() + ',\'' + misAlertas[i].DescripcionAlerta + '\' )">' + misAlertas[i].DescripcionAlerta + '<div class="msgBurbuja ui-state-highlight">' + misAlertas[i].CantidadNoLeidos.toString() + '</div></div>');
                        break;
                    case "Mis incidencias":
                        $("#dvDetalleMsg").append('<div class="dvMsgDet dvMsgDetInc" OnClick="fnAbrirPaginaAlerta(\'' + misAlertas[i].Tipo + '\',this,' + misAlertas[i].CantidadNoLeidos.toString() + ',\'' + misAlertas[i].DescripcionAlerta + '\' )">' + misAlertas[i].DescripcionAlerta + '<div class="msgBurbuja ui-state-highlight">' + misAlertas[i].CantidadNoLeidos.toString() + '</div></div>');
                        break;
                    default:
                        break;
                }
            }
        }
        else {
            $("#dvMesaggeAlert").css("display", "none");
            $("#celdaAlert").attr("Width", "10");
        }
    }
}

function fnAbrirPaginaAlerta(prTitulo, e, cantidad, desc) {
    $("#dvCargando").show();
    switch (prTitulo) {
        case "Solicitudes":
            miTipoAlerta = 1;

            if (desc.indexOf('Notas nuevas') != -1) {
                miSubtipoAlerta = 1;
            }
            else if (desc.indexOf('por Aprobar') != -1) {
                miSubtipoAlerta = 2;
            }
            else if (desc.indexOf('por Procesar') != -1) {
                miSubtipoAlerta = 3;
            }
            break;
        case "Administrador de incidencias":
            $("#dvCargando").hide();
            miTipoAlerta = 2;
            if (desc.indexOf('Notas nuevas') != -1) {
                miSubtipoAlerta = 1;
            }
            else if (desc.indexOf('atendidas') != -1) {
                miSubtipoAlerta = 2;
            }

            break;
        case "Mis incidencias":
            $("#dvCargando").hide();
            miTipoAlerta = 3;
            break;
        default:
            miTipoAlerta = 4;
            break;
    }

    if ($("iframe[src*='Adm_ListadoSolicitudes.aspx']").length > 0) {
        $("iframe[src*='Adm_ListadoSolicitudes.aspx']")[0].contentWindow.miFnActulizarPorAlerta();
    }

    $(e).hide();
    $("#dvDetalleMsg").hide(300);
    fnRestarVistos(cantidad);
    if ($($("[titulo='" + prTitulo + "']").parent()).length == 1) {
        //var miId = $($("[titulo='" + prTitulo + "']").parent().parent().parent().parent().parent().parent()).attr("id");
        var miId = $($("[titulo='" + prTitulo + "']").parent().parent()).attr("id");
        miId = miId.substring(0, miId.indexOf("_Accordion"));
        $($("[href='#" + miId + "']")).click();
        $($("[titulo='" + prTitulo + "']").parent()).click();
    }
}

function fnRestarVistos(cantidad) {
    var miNumVistoTotal = $("#dvNumMsg").text();

    miNumVistoTotal = miNumVistoTotal - cantidad;

    if (miNumVistoTotal < 1) {
        $("#dvMesaggeAlert").hide(500, function () {
            $("#celdaAlert").attr("Width", "10");
            $("#dvItentos").css({ "right": $("#dvLogin").width() - 20 });
        });
    }
    else {
        $("#dvNumMsg").text(miNumVistoTotal.toString());
    }

}

function AbrirTab(tab, descripcion, pagina) {
    if (pagina.indexOf("http:") >= 0 || pagina.indexOf("https:") >= 0) {
        window.open(pagina);
    }
    else {
        $("#tbPrincipal").tabs("select", "#tbPrincipal_TabJQ6"); //Ubica en la posicion Configuracion
        //$('#tbPrincipal').tabs('option', 'selected', 2); //Ubica en la posicion 3 (Configuracion)
        var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;

        var Accord = window.parent.$("#" + tab1);

        var Id = "#" + tab;
        var $panel = Accord.find(Id);
        if (!$panel.length) {//En el caso que no exista el tab, lo crea
            var Titulo = descripcion;
            window.parent.pagina = pagina;
            Accord.tabs("add", Id, Titulo);
        }
        else { //En el caso que exista lo muestra
            Accord.tabs('select', Id);
        }
    }
}

function AbrirTabMovil(tab, descripcion, pagina) {

    $("#tbPrincipal").tabs("select", "#tbPrincipal_TabJQ3"); //Ubica en la posicion Configuracion
    //$('#tbPrincipal').tabs('option', 'selected', 2); //Ubica en la posicion 3 (Configuracion)
    var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;

    var Accord = window.parent.$("#" + tab1);

    var Id = "#" + tab;
    var $panel = Accord.find(Id);
    if (!$panel.length) {//En el caso que no exista el tab, lo crea
        var Titulo = descripcion;
        window.parent.pagina = pagina;
        Accord.tabs("add", Id, Titulo);
    }
    else { //En el caso que exista lo muestra
        Accord.tabs('select', Id);
    }
}


//Funciones Chat

function ObtenerEstadoChat(Activo) {
    $.ajax({
        type: "POST",
        url: "Common/WebService/General.asmx/ObtenerEstadoChat",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d == "1") {
                flgEstadoChat = false;
                $("#trNoDisponible").css({ "font-style": "normal", "text-decoration": "none" });
                $("#trDisponible").css({ "font-style": "italic", "text-decoration": "underline" });
                $(".tdimgUsuario").css({ "background-color": "#5DD255" });
                ActivarChat(true);
            }
            else {
                flgEstadoChat = true;
                $("#trDisponible").css({ "font-style": "normal", "text-decoration": "none" });
                $("#trNoDisponible").css({ "font-style": "italic", "text-decoration": "underline" });
                $(".tdimgUsuario").css({ "background-color": "#B7B9BC" });
            }
        },
        error: function (xhr, err, thrErr) {
            //window.location.href('Login.aspx');
        }
    });
}

function ActivarChat(Activo) {
    var Estado = '0';
    if (Activo == true) {
        Estado = '1';
        UltimaFechaActualizacionNodeJS = new Date();
        tmrEnviarNotificacionActivo.play();
    }
    else {
        tmrEnviarNotificacionActivo.pause();
    }
    ChatActivo = Activo;
    $.ajax({
        type: "POST",
        url: "Common/WebService/General.asmx/ActualizarChat",
        data: "{'Estado':'" + Estado + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //alert('grabo cambio de estado');
        },
        error: function (xhr, err, thrErr) {
            //alert('err');
            //window.location.href('Login.aspx');
        }
    });
    //Iniciar sesion con NodeJS...
    //alert(Activo);

    if (Activo == true) {
        //        iniciarSocket();
        //        socket.emit("IniciaConexion", NombreUsuario + "," + DescripcionUsuario + "," + TipoUsuario);
        //Prueba de envio por objeto: Si funciona!
        //        var Cuenta = new cuenta();
        //        Cuenta.P_vcCod = "Codigo1";
        //        Cuenta.vcNom = "marco pajuelo";
        //        socket.emit("EnvioObjeto", Cuenta);
    }
    else {
        cerrarSocket();
    }
}

function fnActualizarUltimaFechaActualizacionNodeJS() {
    UltimaFechaActualizacionNodeJS = new Date();
}
function iniciarSocket() {
    try {
        if (socket == null) {
            socket = new io.connect("http://" + IPServer + ":" + PuertoServer);
        }
        else {
            //alert('reconectado');
            //socket.socket.disconnect();
            socket.socket.reconnect();
        }
        socket.emit("IniciaConexion", IdUsuarioConectado + "," + DescripcionUsuario + "," + TipoUsuario);
        socket.on("UsuariosConectados", fnUsuariosConectados);
        socket.on("UsuarioDesconectado", fnUsuarioDesconectado);
        socket.on("MensajeUsuario", fnMensajeUsuario);
        socket.on("ServerNodeActivo", fnActualizarUltimaFechaActualizacionNodeJS);
        socket.on('disconnect', function () {
            //socket = null;
            //socket.destroy();
            //console.log('Disconnected');
        });

    }
    catch (err) {
        //some error
    }
}

function iniciarSocketGeneral() {
    try {
        if (socketGeneral == null) {
            socketGeneral = new io.connect("http://" + IPServer + ":" + PuertoServer);
        }
        else {
            socketGeneral.socket.reconnect();
        }
        socketGeneral.emit("IniciaConexion", ",,");
    }
    catch (err) {
        //some error
    }
}

function cerrarSocket() {
    //socket.emit("CerrarConexion", "user,entro administrador desde otra aplicacion");
    try {
        if (socket) {
            socket.socket.disconnect();
            socket.disconnect();
            socket.socket.destroy();
            socket.destroy();
            //socket.disconnect();
        }
    }
    catch (err) {
        //some error
    }
}

var contador = 0;
function fnUsuariosConectados(data) {

    //alerta("Usuarios conectados: " + data);

    //activar aqui recien el color verde!!
    $("#trNoDisponible").css({ "font-style": "normal", "text-decoration": "none" });
    $("#trDisponible").css({ "font-style": "italic", "text-decoration": "underline" });
    $(".tdimgUsuario").css({ "background-color": "#5DD255" });
    flgEstadoChat = !flgEstadoChat;
    $("#dvEstadoChat").hide();

    ActivarChat(true);

    contador += 1;
    //alert(data);
    //document.title = data + contador;
    if ($("iframe[src*='AdmTck_PanelAdministracion.aspx']").length > 0) {
        $("iframe[src*='AdmTck_PanelAdministracion.aspx']")[0].contentWindow.fnUsuariosConectados(data);
    }
}

function fnObtenerUsuariosConectados() {
    try {
        if (ChatActivo == true) {
            socket.emit("ObtenerUsuariosConectados", IdUsuarioConectado);
        }
    }
    catch (err) {
        //some
    }
}

function fnUsuarioDesconectado(Usuario) {
    try {
        if (ChatActivo == true) {
            if ($("iframe[src*='AdmTck_PanelAdministracion.aspx']").length > 0) {
                $("iframe[src*='AdmTck_PanelAdministracion.aspx']")[0].contentWindow.fnUsuarioDesconectado(Usuario);
            }
        }
    }
    catch (err) {
        //some
    }
}

function isIE() { //Vefiricar Version del Internet Explorer
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1], 0) : false;
}

var UltimaDataMensajeUsuario = '';
function fnMensajeUsuario(data) {
    //alert(data);
    if (UltimaDataMensajeUsuario == data) {
        return;
    }
    //alert(data);
    UltimaDataMensajeUsuario = data;

    if (ChatActivo == true) {
        var idusuario = data.split('|')[0];
        var usuario = data.split('|')[1];
        var mensaje = data.split('|')[3];
        var idticket = data.split('|')[4];
        var asunto = data.split('|')[5];
        var EsPrimerMensaje = data.split('|')[6];

        //idticket = "31";

        //Graba mensaje...
        $.ajax({
            type: "POST",
            url: "P_Movil/AdministrarTickets/AdmTck_PanelAdministracion.aspx/registrarDetalleTicket",
            data: "{'P_inCodTicket': '" + idticket + "'," +
                      "'registradoPor': '" + idusuario + "'," +
                      "'vcDescripcion': '" + mensaje + "','idtecnico':''}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //alert('ok-grabo');    

                if ($("iframe[src*='AdmTck_PanelAdministracion.aspx']").length > 0) {
                    //alert($('#tbPrincipal').tabs('option', 'selected'));
                    try {
                        var indiceTabPrincipal = $('#tbPrincipal').tabs('option', 'selected');
                        if (indiceTabPrincipal != null && indiceTabPrincipal != 0) {
                            tmrMostrarNuevoMensaje.play();
                        }
                        else {
                            if ($("a:contains('Chat Administrativo')", ".ui-tabs-selected").length == 0) {//existe
                                tmrMostrarNuevoMensaje.play();
                            }
                            else {//no existe

                            }

                            //                            var indiceTabModulos = $('#tbPrincipal').tabs('option', 'selected');
                            //                            if (indiceTabModulos != null && indiceTabModulos != 0) {
                            //                                tmrMostrarNuevoMensaje.play();
                            //                            }

                        }
                    }
                    catch (err) {
                        tmrMostrarNuevoMensaje.play();
                    }

                }
                else {
                    tmrMostrarNuevoMensaje.play();
                }


            },
            error: function (xhr, err, thrErr) {
                //alert(xhr.responseText);
                //MostrarErrorAjax(xhr, err, thrErr);
            }
        });

        if ($("iframe[src*='AdmTck_PanelAdministracion.aspx']").length > 0) {
            //Agregar Cabecera...
            if (EsPrimerMensaje == 'true') {
                //$("iframe[src*='AdmTck_PanelAdministracion.aspx']")[0].contentWindow.fnAgregarCabecera(idticket, asunto, usuario, idusuario, mensaje);
                $("iframe[src*='AdmTck_PanelAdministracion.aspx']")[0].contentWindow.fnAgregarCabeceraUsuario(idticket, asunto, usuario, idusuario, mensaje);
            }
            else {
                //Agregar Detalle Activo...
                $("iframe[src*='AdmTck_PanelAdministracion.aspx']")[0].contentWindow.fnAgregarMensaje(idusuario, usuario, mensaje, idticket);
            }
        }
    }
}

var blEstadoMensajeLeido = false;
$.timer(1000, function (temporizador) {
    blEstadoMensajeLeido = !blEstadoMensajeLeido;
    if (blEstadoMensajeLeido == true) {
        $("#divSoli").toggleClass("ui-state-error", blEstadoMensajeLeido);
    }
    else {
        $("#divSoli").removeClass("ui-state-error");
    }
});


function CerrarTodosTabs(evento, obj) {
    var mDato = evento.target.alt.split(",");
    var strTab = $.trim(mDato[0]);
    var strProducto = $.trim(mDato[1]);

    var iLimite = 1;
    if (strProducto == 'Configuración') {
        iLimite = 0;
    }

    var tab = $("#" + strTab).tabs();
    var i;
    for (i = tab.tabs('length') - 1; i >= iLimite; i--) {
        tab.tabs('remove', i);
    }

    //tabschild.tabs("remove", tabschild.tabs("option", "selected"));
}


function ObtenerRaizSistema() {
    $.ajax({
        type: "POST",
        url: "Common/WebService/General.asmx/ObtenerRaizSistema",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //alert(result.d);
            RaizSistema = result.d;

            //Carga Inicial del Sistema...
            var CulturaMetodo = RaizSistema + "Common/WebService/General.asmx/ObtenerCulturaPrincipalUsuario";
            CargaInicialSistema(CulturaMetodo, {}, fnCargaInicialSistema_result, fnCargaInicialSistema_fail);

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

var fnRetornaFrameModalOrigen;
function fnRetornaFrameModal() {
    fnRetornaFrameModalOrigen();
}


function fnLateralSplitterDinamic() {
    var miAnchoActual = $(window).width();


    if (miAnchoActual > 1310) {
        //alert("Mostrar lateral");
        var i = 0;
        for (i = 0; i < $(".LateralSplitter").length; i++) {
            if ($($(".LateralSplitter")[i]).css("display") == "none") {
                $(".LateralSplitter").removeClass("mostrarflotante");
                //$(".togglerSplitter").css("display","block");
                $(".togglerSplitter").click();
                $("#AnclaLateral").hide();
                $("#btnDesanclar").css("display", "block");
                $("#AnclePowered").css("display", "block");
            }
        }
    }
    else {
        //alert("Ocultar lateral");
        var i = 0;
        for (i = 0; i < $(".LateralSplitter").length; i++) {
            if ($($(".LateralSplitter")[i]).css("display") != "none") {
                //$(".togglerSplitter").css("display", "none");
                $(".togglerSplitter").click();
                $(".LateralSplitter").addClass("mostrarflotante");
                $("#AnclaLateral").show(200, function () {
                    $("#btnDesanclar").css("display", "none");
                    $("#AnclePowered").css("display", "none");
                });
            }
        }
    }
}

function fnAgregarAnclaLateral() {
    $(".togglerSplitter").css("display", "none");
    if (Modo_BASIC_BOLSA) {
        $("#AnclePowered").hide();
        return;
    }

    $("#tbPrincipal").append("<div id='AnclaLateral' style='box-shadow:0px 0px 5px gray; font-weight: bold;color: #2e6e9e;background:rgb(230,230,230); background:rgba(230,230,230,.8); border-right:4px solid skyblue; padding:4px; display:none; width:15px; height: 100px !important; position: absolute; top:" + ($("#tbPrincipal_buttons").height() + 100) + "px; left: 0px; z-index: 99999; '><span id='btnAnclar' onClick='miclikkk()' class='ui-icon ui-icon-pin-w'></span><div style='text-align:center; width:99%; height:10px !important;'></div><div style='text-align:center; width:99%; height:10px !important;'>M</div><div style='text-align:center; width:99%;height:10px !important;'>e</div><div style='text-align:center; width:99%;height:10px !important;'>n</div><div style='text-align:center; width:99%;height:10px !important;'>ú</div><span style='margin-top: 5px;' class='ui-icon ui-icon-triangle-1-e'></span> </div>");
    $("#tbPrincipal").append("<div id='btnDesanclar' onClick='ejecutarDesanclar()' style=' width:15px; height:15px !important; position: absolute; top:" + ($("#tbPrincipal_buttons").height() + 5) + "px; left: 200px; z-index:999999'><span class='ui-icon ui-icon-pin-s'></span></div>");
    //alert($("#tbPrincipal_buttons").height());
    //$("#tbPrincipal").append("<div id='AnclePowered' style='font-weight: bold;color: #2e6e9e;background:rgb(230,230,230); background:rgba(230,230,230,.8); padding:4px; width:150px; height: 45px !important; position: fixed; bottom:" + ($("#tbPrincipal_buttons").height() - 44) + "px; left: 0px; z-index: 99999; cursor: pointer;'><div style='text-align:center; width:99%; height:10px !important;'><img alt='' src='Images/Powered.gif' /></div></div>");

    $("#AnclaLateral").click(function () {
        $(this).hide();
        $(".LateralSplitter").show(300);
    });

    //$("#AnclaLateral").draggable({ axis: 'y', containment: 'parent', scroll: false });

    $(".LateralSplitter").hover(function () {
        if ($(this).hasClass("mostrarflotante")) {
            $(".LateralSplitter").show();
        }
    }, function () {
        if ($(this).hasClass("mostrarflotante")) {
            $(".LateralSplitter").hide();
            $("#AnclaLateral").show(200);
        }
    });

    $("#btnAnclar,#btnDesanclar").hover(function () {
        $(this).addClass("mibtn");
    }, function () {
        $(this).removeClass("mibtn");
    });
}

function miclikkk() {
    $(".LateralSplitter").removeClass("mostrarflotante");
    //$(".togglerSplitter").css("display", "block");
    $(".togglerSplitter").click();
    $("#AnclaLateral").hide();
    $("#btnDesanclar").css("display", "block");
    $("#AnclePowered").css("display", "block");
}

function ejecutarDesanclar() {
    //$(".togglerSplitter").css("display", "none");
    $(".togglerSplitter").click();
    $(".LateralSplitter").addClass("mostrarflotante");
    $("#AnclaLateral").show(200);
    $("#btnDesanclar").css("display", "none");
    $("#AnclePowered").css("display", "none");
}


function CargaInicialSistema(Metodo, Data, fncSatisfactoria, fncError) {
    $.ajax({
        type: "POST",
        url: Metodo,
        data: Data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (fncSatisfactoria != null && fncSatisfactoria != undefined)
            { fncSatisfactoria(result.d); }
        },
        error: function (xhr, err, thrErr) {
            if (fncError != null && fncError != undefined)
            { fncError(xhr, err, thrErr); }
        }
    });
}

fnCargaInicialSistema_result = function (objeto) {
    oCulturaUsuario = objeto;
};

fnCargaInicialSistema_fail = function (e) {
    oCulturaUsuario = null;
};


function obtenerSegundosDeTime(hhmmss) {
    var arreglo = hhmmss.split(":");
    var seg = (parseInt(arreglo[0], 0) * 3600) + (parseInt(arreglo[1], 0) * 60) + parseInt(arreglo[2], 0);
    return seg.toString();
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    var time = hours + ':' + minutes + ':' + seconds;
    return time;
};

function fnMyTimerTemporizador() {
    if (Seg_temporizador.TiempoInicial == 0) {
        //        if (OneLoad) {
        //            OneLoad = false;
        //            Seg_temporizador.TiempoInicial = Seg_temporizador.Tiempo;
        //        }
        //        else {
        Seg_temporizador.TiempoInicial = -1;
        //        }

    }
    else if (Seg_temporizador.TiempoInicial < 0) {
        clearTimeout(MyTimerTemporizador);
        $("#dvTimer").text("Tiempo: " + "0".toHHMMSS());

        //$("#Form1").append('');

        $("#pnlBloquearSesion > div").css("margin-top", ($(window).height() / 2) - ($("#pnlBloquearSesion > div").height() / 2));

        $("#pnlBloquearSesion").fadeIn(200, function () {
            $("#pnlBloquearSesion").addClass("MostrarFinSesion");
        });

        $.ajax({
            type: "POST",
            url: "Common/WebService/General.asmx/FinSesionTemporizador",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //if (result.d != "") {
                //                    temporizador.stop();
                //                    window.location.href = 'Login.aspx';
                //}
            },
            error: function (xhr, err, thrErr) {
                //                temporizador.stop();
                //                window.location.href = 'Login.aspx';
            }
        });



        //window.location.href = 'ErrorNoPermiso.aspx';
        return;
    }
    else {
        Seg_temporizador.TiempoInicial = Seg_temporizador.TiempoInicial - 1;
        $("#dvTimer").text("Tiempo: " + Seg_temporizador.TiempoInicial.toString().toHHMMSS());
    }

    Seg_temporizador.TiempoTotalTranscurrido += 1;

    if (Seg_temporizador.TiempoInicial < 15) {
        $("#dvTimer").css("color", "Red");
    }
    else {
        if ($("#hfTema").val() == 'smart') {
            $("#dvTimer").css("color", "white");
        } else {
            $("#dvTimer").css("color", "black");
        }
    }

    if ((Seg_temporizador.TiempoTotalTranscurrido % 900) == 0) {
        $.ajax({
            type: "POST",
            url: "Common/WebService/General.asmx/VerificaSesion",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //if (result.d != "") {
                //                    temporizador.stop();
                //                    window.location.href = 'Login.aspx';
                //}
            },
            error: function (xhr, err, thrErr) {
                //                temporizador.stop();
                //                window.location.href = 'Login.aspx';
            }
        });
    }


}

function FnPublicReiniciar() {


    if (Seg_temporizador.Reiniciar) {
        Seg_temporizador.TiempoInicial = Seg_temporizador.Tiempo;
    }
}

function fnMostrarEspera() {
    $("#Capa").show();
    $("#dvCargando").show();
}

function fnOcultarEspera() {

    $("#dvCargando").fadeOut(300, function () {
        //$('body').scrollTop(0);
    });
}

function alertaGlobal(contenido, Titulo, fnCerrar) {
    $("#dvContenidoAlerta").html("");
    $("#dvContenidoAlerta").html(contenido);

    if (Titulo == null || Titulo == undefined)
    { Titulo = "Mensaje del sistema"; }

    $("#dvContenidoAlerta").css("z-index", "9999999");
    $('#dvMsgAlerta').css("z-index", "9999999");
    $('#dvMsgAlerta').dialog({
        title: Titulo,
        modal: true,
        buttons: {
            "Aceptar": function () {
                $(this).dialog("close");
            }
        },
        position: { my: "center", at: "center", of: window },
        open: function (event, ui) {
            $('#dvContenidoAlerta').focus();
        }
    }).dialog("open");
}

function Mensaje(msg, doc, callback) {
    try {
        $(doc).scrollTop(0);
    } catch (e) {

    }

    if (msg !== "") {
        var nInfo = doc.createElement("div");
        nInfo.className = "msgAlerta";
        nInfo.innerHTML = msg;
        doc.body.appendChild(nInfo);

        setTimeout(function () {
            $(nInfo).fadeOut("slow", function () {
                doc.body.removeChild(nInfo);
                if (callback != null && callback != undefined)
                { callback(); }
            });
        }, 2000);
    }
}


function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    PosicionarDivs(Ancho, Alto);
    DimensionarTab(Ancho, Alto);
    DimensionarExploradorWeb(Ancho, Alto);

    //$("#tbPrincipal_SplitterJQ3_D_cR").css("width", "500px!important");

    if (Modo_BASIC_BOLSA) {
        $("#tbPrincipal_SplitterJQ3_D_cR").css("width", Ancho - 23);
    }

    $(".Refrescar").css({ "height": "20px" });
}

function PosicionarDivs(Ancho, Alto) {
    //$("#dvLogin").css({ left: Ancho - Login_Ancho - 80 });
    $("#dvLogin").css({ right: 30 });
    var Login_Izquierda = $("#dvLogin").position().left;
    $("#dvPaleta").css({ left: Login_Izquierda - Paleta_Ancho - 30 });
    var Paleta_Izquierda = $("#dvPaleta").position().left;
}
function DimensionarTab(Ancho, Alto) {
    $("#tbPrincipal").css({ height: Alto - offsetTabPrincipal });
    $("div", $("#tbPrincipal")).css({ height: Alto - offsetTabPrincipal - 34 });

    $("#btnDesanclar").height(15);
    $("#AnclaLateral").height(100);
    $("#AnclaLateral > div").height(10);

    //        for (var i = 0; i < $("div").length; i++) {
    //            if ($($("div")[i]).attr("id") == "btnDesanclar" || $($("div")[i]).attr("id") == "AnclaLateral") {

    //            } else {
    //                $($("div")[i]).css({ height: Alto - offsetTabPrincipal - 34 });
    //            }
    //        }

    $(".ifPrincipal").css({ width: Ancho - 8 });
    $(".ifPrincipal").css({ height: Alto - offsetTabPrincipal - 38 });

    $(".Splitter").css({ height: Alto - offsetTabPrincipal - 86 });


    var altoTaps = $($($($(this).find(".CerrarTodosTabs")[0]).parent()).find("ul")[0]).height();
    if (altoTaps == undefined) {
        altoTaps = 0;
    }

    if (altoTaps == 0) {
        $(".ifContenido").css({ height: Alto - offsetTabPrincipal - 121 }); //130 134
    }
    else {
        $(".ifContenido").css({ height: Alto - (altoTaps + 100) }); //130 134
    }

    $(".tabschild").css({ height: Alto - offsetTabPrincipal - 92 }); //92
    $("div", $(".tabschild")).css({ height: Alto - offsetTabPrincipal - 127 }); //127
    $(".divIcoPro").css({ 'height': '16px' });
}

function DimensionarExploradorWeb(Ancho, Alto) {
    $(".ExploradorWeb").css({ height: Alto - 90 });

    //                if ($tabschild.length > 0)
    //                    if ($("ul", $tabschild[0]).length > 0) {
    //                        $(".ifContenido").css({ height: Alto - $("ul", $tabschild[0])[0].offsetHeight - 95 });
    //                        $("div", $tabschild).css({ height: Alto - $("ul", $tabschild[0])[0].offsetHeight - 132 + 35 });
    //                    }
}

function DevolverTabSolicitudes() {
    if (IdSolicitudes == '') {
        $(".ExploradorWeb > li").each(function () {
            var vcTituloTab = $(this).find('h3').find('a').attr("titulo");
            if (vcTituloTab.toString().toLowerCase() == 'solicitudes') {
                IdSolicitudes = $(this).attr("id") + "_tab";
            }
        });
    }
    return IdSolicitudes;
}

function DevolverTabMisIncidencias() {
    if (IdMisIncidencias == '') {
        $(".ExploradorWeb > li > ul > li").each(function () {
            var vcTituloTab = $(this).find('h3').find('a').attr("titulo");
            if (vcTituloTab.toString().toLowerCase() == 'mis incidencias') {
                IdMisIncidencias = $(this).attr("id") + "_tab";
            }
        });
    }
    return IdMisIncidencias;
}
function DevolverTabRegistrarIncidencias() {
    if (IdRegistrarIncidencias == '') {
        $(".ExploradorWeb > li > ul > li").each(function () {
            var vcTituloTab = $(this).find('h3').find('a').attr("titulo");
            if (vcTituloTab.toString().toLowerCase() == 'registrar ticket') {
                IdRegistrarIncidencias = $(this).attr("id") + "_tab";
            }
        });
    }
    return IdRegistrarIncidencias;
}
var Paleta_Ancho;

//var Ancho_tbPrincipal_SplitterJQ3_D_cR = 0;
//function ScreenFull(_AnchoOriginal, _AltoOriginal) {
//    var Alto = $(window).height();
//    var Ancho = $(window).width();
//    Ancho = Ancho - 3;
//    var _top = $("#tbPrincipal_SplitterJQ3_D_cR").css("top");
//    console.log("Alto: " + Alto);
//    if (_top != "0px") {
//        Ancho_tbPrincipal_SplitterJQ3_D_cR = $("#tbPrincipal_SplitterJQ3_D_cR").css("width");
//        $("#tbPrincipal_SplitterJQ3_D_cR").css({ "position": "absolute", "top": "0px", "left": "-7px", "z-index": "99999999999", "width": Ancho - 200, "height": Alto });
//        ejecutarDesanclar();
//        ////$("#ifContenido").css({ "height": Alto - 100 });
//        ////$(".ifContenido").find('[src="Common/Page/Adm_Lista.aspx?vcTab=MOV_CAM_CampanaDespachoOperador&inCod=212&inTip=3&inTipOri=1"').css({ "height": Alto - 100 });
//        //$("#tbPrincipal_TabJQ3_Tab3").css({ "height": Alto  });
//        //$("#tbPrincipal_TabJQ3_AccordionProd3_Item7_Item0_tab").find("iframe").css({ "height": Alto });
//    }
//    else {
//        $("#tbPrincipal_SplitterJQ3_D_cR").css({ "position": "absolute", "top": "66px", "left": "auto", "z-index": "0", "width": Ancho_tbPrincipal_SplitterJQ3_D_cR, "height": _AltoOriginal });
//        miclikkk();

//        ////$("#ifContenido").css({ "height": _AltoOriginal });
//        ////$(".ifContenido").find('[src="Common/Page/Adm_Lista.aspx?vcTab=MOV_CAM_CampanaDespachoOperador&inCod=212&inTip=3&inTipOri=1"').css({ "height": _AltoOriginal });
//        ////$(".ifContenido").find('[src="Common/Page/Adm_Lista.aspx?vcTab=MOV_CAM_CampanaDespachoOperador&inCod=212&inTip=3&inTipOri=1"').hide();
//        //DimPosElementos();
//        ////$("#tbPrincipal_TabJQ3_AccordionProd3_Item7_Item0_tab").find("iframe").css({ "height": _AltoOriginal +500});

//    }
//}
