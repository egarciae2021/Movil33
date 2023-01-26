var Color_Alpha = 30;
var IdProductoSeleccionado;
var RaizSistema = '';
var oCulturaUsuario = null;


jQuery(function ($) {

    setTimeout(function () {
        //var Estado = localStorage.getItem('ace_state_id-sidebar');
        ////alert("Falta cuando se configura en modo normal...")
        //if (Estado != '{"class":{"menu-min":-1}}') {


        //    //$("#sidebar4-toggle-icon").removeClass("fa-angle-double-down");
        //    //$("#sidebar4-toggle-icon").addClass("fa-angle-double-up");
        //    //localStorage.setItem('ace_state_id-sidebar', '{"class":{"menu-min":-1}}');
        //    //$("#sidebar").toggleClass("menu-min");
        //    //$("#sidebar4-toggle-icon").click();
        //}

        var Estado = localStorage.getItem('ace_state_id-sidebar');
        if (Estado != '{"class":{"menu-min":-1}}') { //Min
            
            $("#dropdown-menu-favoritos").css("left", "2px");
            $("#nav_LogoCliente > li:first-child").hide();
            $("#nav_LogoCliente").width("67px");

            $("#nav_LogoCliente").height("0px");
            $("#nav_LogoCliente > li > button").height("24px");
            $("#sidebar-shortcuts").height("0px");

            $("#MenuPrincipal").height(46);
            $("#MenuPrincipal > li").width(60);
            $("#MenuPrincipal > li > a > span").hide();
        }
        else {
            //$("#nav_LogoCliente").show();
            $("#MenuPrincipal").height(71);
            $("#MenuPrincipal > li").width(120);
            $("#MenuPrincipal > li > a > span").show();

            $("#dropdown-menu-favoritos").css("left", "189px");
            $("#nav_LogoCliente > li:first-child").show();
            $("#nav_LogoCliente").width("255px");

            $("#nav_LogoCliente").height("67px");
            $("#sidebar-shortcuts").height("67px");
            $("#nav_LogoCliente > li > button").height("47px");

        }

    }, 20);

    $(window).resize(function () {
        DimPosElementos();
    });
    DimPosElementos();

    $('#sidebar2').insertBefore('.page-content');
    $('#navbar').addClass('h-navbar');
    $('.footer').insertAfter('.page-content');
    $('.page-content').addClass('main-content');
    $('.menu-toggler[data-target="#sidebar2"]').insertBefore('.navbar-brand');
    $(document).on('settings.ace.two_menu', function (e, event_name, event_val) {
        if (event_name == 'sidebar_fixed') {
            if ($('#sidebar').hasClass('sidebar-fixed')) $('#sidebar2').addClass('sidebar-fixed');
            else $('#sidebar2').removeClass('sidebar-fixed');
        }
    }).triggerHandler('settings.ace.two_menu', ['sidebar_fixed', $('#sidebar').hasClass('sidebar-fixed')]);

    $('#sidebar2[data-sidebar-hover=true]').ace_sidebar_hover('reset');
    $('#sidebar2[data-sidebar-scroll=true]').ace_sidebar_scroll('reset', true);



    IdProductoSeleccionado = $("#hdf_IdProductoDefault").val();

    $(".sidebar_Producto").hide();
    $("#sidebar_Producto_" + IdProductoSeleccionado).show();


    $(".ContenidoPrincipal").hide();
    $(".Menu_Producto_" + IdProductoSeleccionado).show();
    $("#dvContenido_" + IdProductoSeleccionado).show();
    $("#MenuPrincipal_" + IdProductoSeleccionado).addClass('active');
    $(".nav li").on("click", function () {

        var Menu_Ul = $(this).parent().attr("id");
        if (typeof Menu_Ul == 'undefined') {
            return;
        }

        if (Menu_Ul == "MenuPrincipal") {
            IdProductoSeleccionado = $(this).attr("idproducto");
            $("#MenuPrincipal li").removeClass("active");
            $(this).addClass("active");

            $(".sidebar_Producto").hide();
            $("#sidebar_Producto_" + IdProductoSeleccionado).show();

            //$(".SubMenu").hide();
            $(".ContenidoPrincipal").hide();
            //$(".Menu_Producto_" + IdProductoSeleccionado).show();
            $("#dvContenido_" + IdProductoSeleccionado).show();
            return;
        }

    });

    $("#sidebar4-toggle-icon").click(function () {
        var Estado = localStorage.getItem('ace_state_id-sidebar');
        if (Estado == '{"class":{"menu-min":-1}}') { //Min
            //$("#nav_LogoCliente").hide();

            $("#dropdown-menu-favoritos").css("left", "2px");

            $("#nav_LogoCliente > li:first-child").hide();
            $("#nav_LogoCliente").width("67px");

            $("#nav_LogoCliente").height("0px");
            $("#nav_LogoCliente > li > button").height("24px");
            $("#sidebar-shortcuts").height("0px");

            $("#MenuPrincipal").height(46);
            $("#MenuPrincipal > li").width(60);
            $("#MenuPrincipal > li > a > span").hide();
        }
        else {

            $("#dropdown-menu-favoritos").css("left", "189px");

            //$("#nav_LogoCliente").show();
            $("#nav_LogoCliente li:first-child").show();
            $("#nav_LogoCliente").width("255px");

            $("#nav_LogoCliente").height("67px");
            $("#sidebar-shortcuts").height("67px");
            $("#nav_LogoCliente > li > button").height("47px");

            $("#MenuPrincipal").height(71);
            $("#MenuPrincipal > li").width(120);
            $("#MenuPrincipal > li > a > span").show();
        }
    });

    $("#rep_Contenidos_rep_Modulos_0_rep_Opciones_0_a_Opcion_MostrarSubMenuDown_0").click();

    ObtenerRaizSistema();
    ValidarCambioClave();


    fnMensajes();

});


function fnMiPerfil_click() {
    $("#ifMiPerfil").css({ "height": "550px" });
    $('#ifMiPerfil').attr("src", 'P_Configuracion/General/MisDatos.aspx?inCod=108&inTip=3&inTipOri=1');
    ventanaModalMiPerfil = $('#div_MiPerfil').dialog({
        title: "Mis Datos ",
        width: 950,
        height: 620,
        modal: true,
        resizable: false,
    });
}


function fnAbrirTab(obj, tipo) {
    var url = $(obj).parent().attr("url");
    if (typeof url == 'undefined' || url == "") {
        return;
    }
    var nombre = $(obj).parent().attr("nombre");

    var idproducto = $(obj).parent().attr("idproducto");
    if (typeof idproducto == 'undefined' || idproducto == "") {
        idproducto = IdProductoSeleccionado;
    }
    else {
        IdProductoSeleccionado = idproducto;
        $("#MenuPrincipal_" + IdProductoSeleccionado).click();
    }
    try {
        var ifProducto = $("#ifProducto_" + IdProductoSeleccionado);
        $("#sidebar_Producto_" + IdProductoSeleccionado + " li").removeClass("active");
        try {
            $(obj).parent().addClass("active");
            $(obj).parent().parent().parent().addClass("active");
            $(obj).parent().parent().parent().parent().parent().addClass("active");
        } catch (e) {
        }
        ifProducto[0].contentWindow.fnAbrirTab($(obj).parent().attr("id"), nombre, url);
    } catch (e) {
    }
}
function fnCerrarSesion() {
    window.location.href = "Login.aspx";
}

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    $(".ifProducto").width(Ancho - 190);
    $(".ifProducto").height(Alto - 130);
    $(".sidebar_Producto").css("max-height", Alto - 150);

}



function ObtenerRaizSistema() {
    //Carga asignaciones realizadas desde el servidor.
    RaizSistema = RaizSistema_String;
    oCulturaUsuario = oCulturaUsuario_String;    
}



function ValidarCambioClave() {
    if ($("#hdf_Reiniciar_Clave").val() == "1") {
        // ===================================================================================================================================================
        $('#ifReinicia').attr("src", 'P_Configuracion/General/MisDatos_Clave.aspx?inCod=108&inTip=3&inTipOri=1');
        // ===================================================================================================================================================
        ModalNuevo = $('#div_Reinicia').dialog({
            title: "Módulo de Seguridad",
            width: 620,
            height: "auto",
            modal: true,
            resizable: false,
            // ===================================================================================================================================================
            open: function (event, ui) {
                $(".ui-dialog-titlebar-close", ui.dialog).hide();
            },
            buttons: {
                "Aplicar los Cambios": function () {
                    $("#ifReinicia")[0].contentWindow.Confirmar_datos(fn_flag_contrasena); //Agregado Jcamacho 2015/10/01 Mensaje de confirmación
                }
            }
        });
    }
}
function fn_flag_contrasena(flag) {
    if (flag == 1) {
        $('#div_Reinicia').dialog("close");
        Mensaje("<br/><br/><h1>La contraseña fue actualizada con éxito.</h1>", document);
    }
}




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
                        //$("#dvDetalleMsg").append('<div class="dvMsgDet dvMsgDetSol" OnClick="fnAbrirPaginaAlerta(\'' + misAlertas[i].Tipo + '\',this,' + misAlertas[i].CantidadNoLeidos.toString() + ',\'' + misAlertas[i].DescripcionAlerta + '\' )">' + misAlertas[i].DescripcionAlerta + '<div class="msgBurbuja ui-state-highlight">' + misAlertas[i].CantidadNoLeidos.toString() + '</div></div>');
                        $("#ulNotificaciones").append('<li nombre="Solicitudes" url="P_Movil/Administrar/Solicitudes/Adm_ListadoSolicitudes.aspx?vcTab=&amp;inCod=4&amp;inTip=2&amp;inTipOri=1" idproducto="3" ><a href="#" OnClick="fnAbrirPaginaAlerta(this,\'' + misAlertas[i].Tipo + '\',this,' + misAlertas[i].CantidadNoLeidos.toString() + ',\'' + misAlertas[i].DescripcionAlerta + '\' )"><div class="clearfix"><span class="pull-left"><i class="btn btn-xs no-hover btn-pink fa fa-comment"></i>' + misAlertas[i].DescripcionAlerta + '</span><span class="pull-right badge badge-info">' + misAlertas[i].CantidadNoLeidos.toString() + '</span></div></a></li>');

                        break;
                    case "Administrador de incidencias":
                        //$("#dvDetalleMsg").append('<div class="dvMsgDet dvMsgDetInc" OnClick="fnAbrirPaginaAlerta(\'' + misAlertas[i].Tipo + '\',this,' + misAlertas[i].CantidadNoLeidos.toString() + ',\'' + misAlertas[i].DescripcionAlerta + '\' )">' + misAlertas[i].DescripcionAlerta + '<div class="msgBurbuja ui-state-highlight">' + misAlertas[i].CantidadNoLeidos.toString() + '</div></div>');
                        $("#ulNotificaciones").append('<li nombre="Administrador de incidencias" url="P_Movil/SolicitudesAtencion/SOA_Adm_Solicitudes.aspx?vcTab=&amp;inCod=192&amp;inTip=3&amp;inTipOri=1" idproducto="3" ><a href="#" OnClick="fnAbrirPaginaAlerta(this,\'' + misAlertas[i].Tipo + '\',this,' + misAlertas[i].CantidadNoLeidos.toString() + ',\'' + misAlertas[i].DescripcionAlerta + '\' )"><div class="clearfix"><span class="pull-left"><i class="btn btn-xs no-hover btn-pink fa fa-user"></i>' + misAlertas[i].DescripcionAlerta + '</span><span class="pull-right badge badge-info">' + misAlertas[i].CantidadNoLeidos.toString() + '</span></div></a></li>');
                        break;
                    case "Mis incidencias":
                        //$("#dvDetalleMsg").append('<div class="dvMsgDet dvMsgDetInc" OnClick="fnAbrirPaginaAlerta(\'' + misAlertas[i].Tipo + '\',this,' + misAlertas[i].CantidadNoLeidos.toString() + ',\'' + misAlertas[i].DescripcionAlerta + '\' )">' + misAlertas[i].DescripcionAlerta + '<div class="msgBurbuja ui-state-highlight">' + misAlertas[i].CantidadNoLeidos.toString() + '</div></div>');
                        $("#ulNotificaciones").append('<li nombre="Mis incidencias" url="P_Movil/SolicitudesAtencion/SOA_Adm_Solicitudes.aspx?EsUsuario=1&?vcTab=&inCod=222&inTip=3&inTipOri=1" idproducto="3"><a href="#" OnClick="fnAbrirPaginaAlerta(this,\'' + misAlertas[i].Tipo + '\',this,' + misAlertas[i].CantidadNoLeidos.toString() + ',\'' + misAlertas[i].DescripcionAlerta + '\' )"><div class="clearfix"><span class="pull-left"><i class="btn btn-xs no-hover btn-pink fa fa-user"></i>' + misAlertas[i].DescripcionAlerta + '</span><span class="pull-right badge badge-info">' + misAlertas[i].CantidadNoLeidos.toString() + '</span></div></a></li>');
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



function fnAbrirPaginaAlerta(othis, prTitulo, e, cantidad, desc) {

    

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
        case "Limite cantidad":
            $("#dvCargando").hide();
            miTipoAlerta = 4;
            break;
        default:
            miTipoAlerta = 5;
            break;
    }

    if ($("iframe[src*='Adm_ListadoSolicitudes.aspx']").length > 0) {
        $("iframe[src*='Adm_ListadoSolicitudes.aspx']")[0].contentWindow.miFnActulizarPorAlerta();
    }

    $(e).hide();
    $("#dvDetalleMsg").hide(300);
    fnRestarVistos(cantidad);
    //if ($($("[titulo='" + prTitulo + "']").parent()).length == 1) {
    //    //var miId = $($("[titulo='" + prTitulo + "']").parent().parent().parent().parent().parent().parent()).attr("id");
    //    var miId = $($("[titulo='" + prTitulo + "']").parent().parent()).attr("id");
    //    miId = miId.substring(0, miId.indexOf("_Accordion"));
    //    $($("[href='#" + miId + "']")).click();
    //    $($("[titulo='" + prTitulo + "']").parent()).click();
    //}

    fnAbrirTab(othis, 'modulo');
    //$("#rep_Contenidos_rep_Modulos_0_a_Modulo_MostrarSubMenuDown_5").click();

}


function fnRestarVistos(cantidad) {
    var miNumVistoTotal = $("#dvNumMsg").text();
    miNumVistoTotal = miNumVistoTotal - cantidad;
    if (miNumVistoTotal < 1) {
        $("#liNotificacionesMain").hide();
        //alert('x');
        //$("#dvMesaggeAlert").hide(500, function () {
        //    $("#celdaAlert").attr("Width", "10");
        //    $("#dvItentos").css({ "right": $("#dvLogin").width() - 20 });
        //});
    }
    else {
        $("#dvNumMsg").text(miNumVistoTotal.toString());
    }
}

