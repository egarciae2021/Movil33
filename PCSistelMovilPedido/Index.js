/// <reference path="Common/Scripts/jquery-2.0.0-vsdoc.js" />
var ProveedorDiseno = 'TDP'; //VALORES POSIBLES: CLARO|TDP
var PaginaPadre = true;
var boolPag = true;
var NumeroRenovar;
var IdPlanNumeroRenovar;
var FlagMantenerPlan;
var PrecioPlanNumeroRenovar;
var esCampanaActiva = false;
var esPreVentaActiva = false;
var ValidarPorNodeJS = false;
var esConfirmacionPreventa = false;
var IdTipoFinanciamiento;
var miIdTipoModeloDispositivo;
var RaizSistema = '';

var Pedido;
var EsVerificaCarrito = false;
var UsuarioConectado = '';

var SeCanceloPedido = false;
var SeProcesoPedido = false;

var EsSimulacion;

var AltoOriginal;
var inTipoContrato;

$(function () {
    
    fnEstilos(ProveedorDiseno);
    //alert(1);
    UsuarioConectado = $("#hfUsuario").val();
    EsSimulacion = $("#hdfEsSimulacion").val() == "1";
    inTipoContrato = $("#hdfTipoContrato").val();

    if (EsSimulacion) {
        $("#ContenidoPrincipal").css("background-image", "url(common/images/fondoprincipal4.jpg)");
    }

    if (strConcideraciones != undefined && $.trim(strConcideraciones) != "") {
        var consi = strConcideraciones.split("|");

        if (consi.length > 0) {
            $("#dvConsidera").css("display", "block");
            for (var i = 0; i < consi.length; i++) {
                if ($.trim(consi[i]) != "") {
                    $("#ulConcideraciones").append('<li style="color:#0065BA;">' + consi[i] + '</li>');
                }
            }
        }

    }

    ObtenerRaizSistema();

    if ($.browser.msie && $.browser.version == "6.0") {
        $("#panelbar li").removeClass("k-state-active");
        $("#panelbar span").removeClass("k-link");
        $("#panelbar span").removeClass("k-state-selected");
        $("li").css("list-style", "none");

        $('.tablaMenu').hover(function () {
            $(this).css({ "background-color": "skyblue", "cursor": "pointer" });
        }, function () {
            $(this).css({ "background-color": "#E2F0F6", "cursor": "default" });
        });


        $('.tablaMenu').click(function () {
            $('.tablaMenu').css({ "background-color": "#E2F0F6" });
            $('.tablaMenu').removeClass("menuSelect");
            $(".panelbar").css("display", "none");
            $(this).addClass("menuSelect");

            switch ($(this).attr("id").toString()) {

                case "tablaCampana":
                    $("#panelbarCampana").css("display", "block");
                    break;

                case "tablaCanal":
                    $("#panelbarCanal").css("display", "block");
                    break;

                case "tablaSolicitudes":
                    $("#panelbarSolicitudes").css("display", "block");
                    break;

                default:
                    break;
            }

        });

        AsociarEventosLoad();
        Dimensionar();

        $("#contenedorPage").hide(0, function () {
            $("#miFrame").attr("src", "Pedido/Dashboard_pedido.aspx");
            $("#contenedorPage").fadeIn(0);
        });

        $("#spCerrarSesion").click(function () {
            //if (confirm("¿Continuar con el cierre de la sesión?")) {
            document.location.href = 'Login.aspx';
            //}
        });
        $('#dvCierreAnuncio').click(function () {
            $('#dvCierreAnuncio').hide();
            $('#anuncio').hide();
        });
        $('#dvCierreAnuncio').show();

        $('#dvChat').click(function () {
            var leftWindow = ($(window).width() - 390) / 2;
            window.open("Chat/Chat.aspx", "window_new", "width=395,height=500,left=" + leftWindow + ",top=100,menubar=no,scrollbars=yes,titlebar=no,toolbar=no,statusbar=no, resize=no");
        });

        $(".teamMate").addClass("menuIe6");
    }
    else {
        $("#imgLogoCliente").removeClass();
        $('#box4').animate({ boxShadow: '0 0 30px #44f' });
        var jqDockOpts = { align: 'center', duration: 200, labels: 'tc', size: 48, distance: 85 };
        $('#jqDock').jqDock(jqDockOpts);
        Dimensionar();

        $(window).resize(function () {
            Dimensionar();
        });


        AsociarEventosLoad();

        //    function fnResult(dlgResult)
        //    { 
        //    alert('Dialog Result: ' + dlgResult);
        //    }
        //    confirma('cuerpooo', "titulox", fnResult);
        //    $("#mensaje").kendoWindow({
        //        modal: true,
        //        width: "600px",
        //        title: "About Alvar Aalto",
        //        close: onClose
        //    });
        //    $("#mensaje").data("kendoWindow").open();

        $("#panelbar").kendoPanelBar({
            expandMode: "single"
        });

        $("#spCerrarSesion").click(function () {
            //if (confirm("¿Continuar con el cierre de la sesión?")) {
            //document.location.href = 'Login.aspx';
            window.location.href = "Login.aspx";
            //}
        });


        //    var tiempo = 5;
        //    var intervalo = setInterval(function () {
        //        tiempo--;
        //        $('#dvTiempoAnuncio').html('El anuncio se podrá cerrar en ' + tiempo + ' segundos');
        //        if (tiempo == 0) {
        //            $('#dvCierreAnuncio').show();
        //            $('#dvTiempoAnuncio').remove();
        //            clearInterval(intervalo);
        //        }
        //    }, 1000);
        $('#dvCierreAnuncio').click(function () {
            $('#dvCierreAnuncio').hide();
            $('#anuncio').hide();
        });
        $('#dvCierreAnuncio').show();

        //$("#slider").easySlider({auto: true,continuous: true});
        //$("#slider").show("blind", { direction: "vertical" }, 2200);

        //$('#slider').fadeIn(5000);


        //$('#btnChat').click(function () {
        //
        //    var leftWindow = ($(window).width() - 390) / 2;
        //    //titlebar=no,toolbar=no,statusbar=no
        //    window.open("Chat/Chat.aspx", "window_new", "width=395,height=500,left=" + leftWindow + ",top=100,menubar=no,scrollbars=yes,titlebar=no,toolbar=no,statusbar=no, resize=no");
        //
        //    //initWindowChat();
        //});

        $('#dvChat').click(function () {
            var leftWindow = ($(window).width() - 390) / 2;
            window.open("Chat/Chat.aspx", "window_new", "width=395,height=500,left=" + leftWindow + ",top=100,menubar=no,scrollbars=yes,titlebar=no,toolbar=no,statusbar=no, resize=no");
        });


        //    function initWindowChat() {
        //        var windowOptions = {
        //            width: "300px",
        //            height: "400px",
        //            title: "Chat - Consulta",
        //            visible: false,
        //            actions: ["Minimize", "Close"]
        //        };
        //        $("#window").kendoWindow(windowOptions);
        //        var window = $("#window").data("kendoWindow");
        //        //window.font
        //        window.center();
        //        window.open();
        //    }

        //$("#btnChat").button({ icons: { primary: "ui-icon-comment"} });

        //$(".ui-button-icon-primary").css({ "margin-left": "-5px"});

        //.ui-icon {float: left; margin: 0 4px;}

        //var date = new Date(parseInt(jsonDate.substr(6)));
        //var date = new Date(parseInt("1381424362000"));
        //alert(date);

        $("#contenedorPage").hide(0, function () {
            $("#miFrame").attr("src", "Pedido/Dashboard_pedido.aspx");
            $("#contenedorPage").fadeIn(0);
        });
    }

    $("#descargar").live('click', function (e) {
        var Url = $(this).attr("BtnUrl");
        var doc = $(this).attr("BtnDoc");
        var Ruta = Url + doc;
        window.location.href = "Common/Controladores/DescargarArchivo.ashx?archivo=" + Ruta;
    });
    $("#descargarMini").live('click', function (e) {
        var Url = $(this).attr("BtnUrl");
        var doc = $(this).attr("BtnDoc");
        var Ruta = Url + doc;
        window.location.href = "Common/Controladores/DescargarArchivo.ashx?archivo=" + Ruta;
    });
    $("#descargarFAQ").live('click', function (e) {
        var Url = $(this).attr("BtnUrl");
        var doc = $(this).attr("BtnDoc");
        var Ruta = Url + doc;
        window.location.href = "Common/Controladores/DescargarArchivo.ashx?archivo=" + Ruta;
    });

    var dgCorreo = $("#dvActualizaCorreo");
    $("#btnActualizarCorreo").live("click", function(e) {
        var dvCorreo = $("#dvActualizaCorreo");
        

        var vCorreo = $("#txtCorreo").val();
        if (vCorreo == '') {
            $("#lblMensaje").text("Ingrese su correo eléctronico.");
            return;
        }
        if (!validarEmail2(vCorreo)) {
            $("#lblMensaje").text("El formato del correo no es válido.");
            return;
        }

        $.ajax({
            type: "POST",
            url: "Index.aspx/ActualizarCorreo",
            data: "{'vcCorreo':'" + vCorreo + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == 1) {
                    dvCorreo.data("kendoWindow").close();
                    $("#lblMensaje").text("");
                    //window.location.href = raiz("Pedido/Dashboard_pedido.aspx");
                    location.reload();
                } else {
                    $("#lblMensaje").text("No se realizó la actualización.");
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    kendo.ui.Window.fn._keydown = function (originalFn) {
        var KEY_ESC = 27;
        return function (e) {
            if (e.which !== KEY_ESC) {
                originalFn.call(this, e);
            }
        };
    }(kendo.ui.Window.fn._keydown);

    if (!btTieneCorreo) {
        ActualizaEmail(dgCorreo);
    }

});


function AsociarEventosLoad() {

    $(".teamMate").click(function () {

        if (!EsVerificaCarrito) {
            if (fnEsPaginaCarrito()) {

                $("#miFrame")[0].contentWindow.fnVerificarSalida($(this).attr("id"));
            }
            else {
                $(".teamMate").removeClass("seleccionado");
                $(this).addClass("seleccionado");
            }

        }

    });

    $("#dvNuevoPedido").click(function () {
        if (!fnEsPaginaCarrito() || EsVerificaCarrito) {
            EsVerificaCarrito = false;
            NumeroRenovar = undefined;
            IdPlanNumeroRenovar = undefined;
            FlagMantenerPlan = undefined;
            //            jbalmaceda
            //$("#contenedorPage").hide(0, function () {

            if ($.browser.msie && $.browser.version == "6.0")
                $("#miFrame").attr("src", "Pedido/PedidoIE.aspx");
            else
                $("#miFrame").attr("src", "Pedido/Pedidos.aspx");
            $("#contenedorPage").fadeIn(0);


            //});
        }
    });

    //agregado 23-09-2016
    $("#dvEstadoCuenta").click(function () {
        if (!fnEsPaginaCarrito() || EsVerificaCarrito) {
            EsVerificaCarrito = false;

            if ($.browser.msie && $.browser.version == "6.0") {
                $("#miFrame").attr("src", "Cronograma/Con_Fac_EstadoCuenta.aspx");
            } else {
                $("#miFrame").attr("src", "Cronograma/Con_Fac_EstadoCuenta.aspx");
            }
            $("#contenedorPage").fadeIn(500);

        }
    });

    $("#dvInfoCobros").click(function () {
        if (!fnEsPaginaCarrito() || EsVerificaCarrito) {
            EsVerificaCarrito = false;

            if ($.browser.msie && $.browser.version == "6.0") {
                $("#miFrame").attr("src", "Cronograma/InfoCobros.aspx");
            } else {
                $("#miFrame").attr("src", "Cronograma/InfoCobros.aspx");
            }
            $("#contenedorPage").fadeIn(500);

        }
    });

    //ECONDEÑA  30/06/2016
    $("#dvCronogramaPagos").click(function () {
        if (!fnEsPaginaCarrito() || EsVerificaCarrito) {
            EsVerificaCarrito = false;

            if ($.browser.msie && $.browser.version == "6.0") {
                $("#miFrame").attr("src", "Cronograma/CronogramaPagosIE.aspx");
            } else {
                $("#miFrame").attr("src", "Cronograma/CronogramaPagos.aspx");
            }
            $("#contenedorPage").fadeIn(500);

        }
    });
    //ECONDEÑA  11/07/2016
    $("#dvContrato").click(function () {
        if (!fnEsPaginaCarrito() || EsVerificaCarrito) {
            EsVerificaCarrito = false;

//            if ($.browser.msie && $.browser.version == "6.0") {
                $("#miFrame").attr("src", "Contrato/ContratoResumen.aspx");
//            } else {
//                $("#miFrame").attr("src", "Cronograma/CronogramaPagos.aspx");
//            }
            $("#contenedorPage").fadeIn(500);

        }
    });

    //Agregado por RRAMOS 25/10/2013
    $("#dvListadoIncidencias").click(function () {
        if (!fnEsPaginaCarrito() || EsVerificaCarrito) {
            EsVerificaCarrito = false;
            //            jbalmaceda
            //            $("#contenedorPage").hide(0, function () {
            $("#miFrame").attr("src", "Incidencia/Incidencia.aspx");
            $("#contenedorPage").fadeIn(0);
            //            });
        }
    });

    $("#dvRegistrarIncidencia").click(function () {
        if (!fnEsPaginaCarrito() || EsVerificaCarrito) {
            EsVerificaCarrito = false;
            $("#contenedorPage").hide(0, function () {
                $("#miFrame").attr("src", "Incidencia/Registrar_Incidencia.aspx");
                $("#contenedorPage").fadeIn(0);
            });
        }
    });
    //----------------------------------------------------
    $("#dvInicio").click(function () {
        if (!fnEsPaginaCarrito() || EsVerificaCarrito) {
            EsVerificaCarrito = false;
            $("#contenedorPage").hide(0, function () {
                $("#miFrame").attr("src", "Pedido/Dashboard_pedido.aspx");
                $("#contenedorPage").fadeIn(0);
            });
        }
    });

    //Agregado por JHERRERA 08/01/2014
    $("#dvListadoSolicitudes").click(function () {
        if (!fnEsPaginaCarrito() || EsVerificaCarrito) {
            EsVerificaCarrito = false;
            $("#contenedorPage").hide(0, function () {
                $("#miFrame").attr("src", "Solicitud/Listado_Solicitud.aspx");
                $("#contenedorPage").fadeIn(500);
            });
        }
    });

    $("#dvRegistrarSolicitud").click(function () {
        if (!fnEsPaginaCarrito() || EsVerificaCarrito) {
            EsVerificaCarrito = false;
            $("#contenedorPage").hide(0, function () {
                $("#miFrame").attr("src", "Solicitud/Registrar_Solicitud.aspx");
                $("#contenedorPage").fadeIn(500);
            });
        }
    });

    $("#dvCancelarPedido").click(function () {
        //alerta('Se procederá a cancelar el pedido', "Cancelar Pedido");
        confirma('Se procederá a cancelar el pedido<br>¿Continuar con la operación?', "Cancelar Pedido");
    });

    $("#dvAmpliarCredito,#dvActivarServicio,#dvReparacion,#dvPerdida,#dvVisorSolicitudes").click(function () {
        if (!fnEsPaginaCarrito() || EsVerificaCarrito) {
            EsVerificaCarrito = false;
            $("#contenedorPage").hide(0, function () {
                $("#miFrame").attr("src", "PaginaEnConstruccion.htm");
                $("#contenedorPage").fadeIn(0);
            });
        }

    });

    $("#mnSalir").click(function () {

        $("#contenedorPage").hide(0, function () {
            //document.location.href = "Login.aspx";
            window.location.href = "Login.aspx";
        });

    });


//    $(".teamMate").live("mousemove", function () {
//        $(this).css({ "background-color": "#EAEAEA" });
//        //$("#lnbtnMiPerfil").css('color', '#1D5987');
//    });
//    $(".teamMate").live("mouseout", function () {
//        $(this).css({ "background-color": "#FFFFFF" });
//    });

    $("#dvComprobantes").click(function () {
        if (!fnEsPaginaCarrito() || EsVerificaCarrito) {
            EsVerificaCarrito = false;
            $("#contenedorPage").hide(0, function () {
                $("#miFrame").attr("src", "Comprobante/VisorComprobante.aspx");
                $("#contenedorPage").fadeIn(500);
            });
        }
    });

    $("#btnChat").live("mousemove", function () {
        $(this).css({ "box-shadow": "0px 10px 25px gray" });
    });
    $("#btnChat").live("mouseout", function () {
        $(this).css({ "box-shadow": "" });
    });

}


function Dimensionar() {
    var Ancho = $(window).width();
    var Alto = $(window).height();

    $("#ContenidoPrincipal").css({ "height": Alto - 90 });
    $("#contenedorPage").css({ "height": Alto - 100 });
}

function fnEsPaginaCarrito() {
//    var resul = false;
//    if ($("#miFrame")[0].contentDocument.URL.indexOf("Pedido.aspx") > 0) {
//        resul = true;
//    }
    //    return resul;

    var resul = false;
    if ($("#miFrame")[0].contentWindow.fnVerificarSalida != undefined) {
        resul = true;
    }
    return resul;
}

function fnSalidaConfirmada(prIdElemento) {
    $(".teamMate").removeClass("seleccionado");
    $("#" + prIdElemento).addClass("seleccionado").click();
}

function fnEliminarFondoPrincipal() {
    $("#ContenidoPrincipal").css("background-image", "none");
}


function ObtenerRaizSistema() {
    $.ajax({
        type: "POST",
        url: "Common/WebServices/General.asmx/ObtenerRaizSistema",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            RaizSistema = result.d;
            //alert(RaizSistema);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}


function fnIrPedidos() {
    $("#dvNuevoPedido").click();
}

function fnResizeHtml(alto) {

    AltoOriginal = $(window).height();
    alto = alto + 50;

    $("#General").height(alto);
    $("#ContenidoPrincipal").height(alto);
    $("#contenedorPage").height(alto);

}


function fnWarpWindow() {

    var alto = AltoOriginal;

    $("#General").height(alto);
    $("#ContenidoPrincipal").height(alto);
    $("#contenedorPage").height(alto);

}


function getScrollBarDimensions() {
    var elm = document.documentElement.offsetHeight ? document.documentElement : document.body,

    curX = elm.clientWidth,
    curY = elm.clientHeight,

    hasScrollX = elm.scrollWidth > curX,
    hasScrollY = elm.scrollHeight > curY,

    prev = elm.style.overflow,

    r = {
        vertical: 0,
        horizontal: 0
    };


    if (!hasScrollY && !hasScrollX) {
        return r;
    }

    elm.style.overflow = "hidden";

    if (hasScrollY) {
        r.vertical = elm.clientWidth - curX;
    }

    if (hasScrollX) {
        r.horizontal = elm.clientHeight - curY;
    }
    elm.style.overflow = prev;


    return r;
}

function fnEstilos(c) {
    if (c == "CLARO") {
        $("#cabecera").css("background-image", "url(common/images/fondo_cabecera_CLARO.png)");
        $("#dvDocumentosCabecera").addClass("tituloSeccion-CLARO");
        $("#dvConsideraCabecera").addClass("tituloSeccion-CLARO");
    } else if (c == "TDP") {
        $("#cabecera").css("background-image", "url(common/images/fondo_cabecera.jpg)");
        $("#dvDocumentosCabecera").addClass("tituloSeccion");
        $("#dvConsideraCabecera").addClass("tituloSeccion");
    }
    $("#generalHead").show();
}

function fnActualizarFechasCampanas(vFechaInicioCampana, vFechaInicioPedido, vFechaInicioEntrega) {
    $("#lblFechaInicioCampana").text(vFechaInicioCampana);
    $("#lblFechaInicioPedido").text(vFechaInicioPedido);
    $("#lblFechaInicioEntrega").text(vFechaInicioEntrega);
}

function ActualizaEmail(dgCorreo) {

    //var myWindow = $("#dvActualizaCorreo");
    dgCorreo.kendoWindow({
        width: "400px",
        title: "Actualizar correo",
        visible: false,
        actions: [
            //"Close"
        ],
        close: false,
        modal: true,
        draggable: false,
        resizable: false
    }).data("kendoWindow").center().open();
    $("#txtCorreo").focus();
}