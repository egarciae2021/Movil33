$(function () {
    $(".lblVerLista").css("cursor", "pointer");

    $("#imgFondo").show();
    $("#imgFondo").css({ 'opacity': 0.1 });

    $(".PanelBarraNavegacion").live("mousemove", function () {
        $(this).addClass('ui-state-highlight quitarBorde');
    });
    $(".PanelBarraNavegacion").live("mouseout", function () {
        $(this).removeClass('ui-state-highlight quitarBorde');
    });

    $(".PanelBarraNavegacionItemSeleccion").live("click", function () {
        pagina = $(this).attr("url");
        var EventoClick = $(this).attr("Click");
        eval(EventoClick)();
    });

    $("#MiReload").hover(function () {
        $("#MiReload").addClass("miBoton");

    }, function () {
        $("#MiReload").removeClass("miBoton");
    });

    $("#MiReload").click(function () {
        location.reload(true);
    });

    $("#MiReloadFija").hover(function () {
        $("#MiReloadFija").addClass("miBoton");

    }, function () {
        $("#MiReloadFija").removeClass("miBoton");
    });

    $("#MiReloadFija").click(function () {
        location.reload(true);
    });

    function AbrirTab(tab, descripcion, pagina) {
        var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;

        var Accord = window.parent.$("#" + tab1);

        var Id = "#" + tab;
        var $panel = Accord.find(Id);
        if (!$panel.length) {//En el caso que no exista el tab, lo crea
            var Titulo = descripcion;
            window.parent.pagina = pagina;
            Accord.tabs("add", Id, Titulo);
            window.parent.$(Id).css("width", "99%");
            window.parent.$(Id).css("height", "94%");
            window.parent.$(Id).css("margin-top", "0px");
            window.parent.$(Id).css("margin-left", "0px");
            window.parent.$(Id).css("margin-bottom", "0px");
            window.parent.$(Id).css("margin-right", "0px");
            window.parent.$(Id).css("padding-top", "0px");
            window.parent.$(Id).css("padding-left", "0px");
            window.parent.$(Id).css("padding-bottom", "0px");
            window.parent.$(Id).css("padding-right", "0px");
        }
        else { //En el caso que exista lo muestra
            Accord.tabs('select', Id);
        }
    }

    function fnObtenerIdTab(obj, valorBuscado, blEncontro) {

        if (blEncontro) { return true; }

        $.each($(obj), function () {
            if (blEncontro || ($(this).attr("nombre") == valorBuscado)) {
                blEncontro = true;
            }
            else {
                fnObtenerIdTab($(this), valorBuscado, blEncontro);
            }
        });

    }

    $(".lblVerLista").click(function () {
        var IdOpcion = $(this).attr("IdOpcion");
        var vcTab = $(this).next().val();
        //Obtener el Id del  tab ubicado al lado izquierdo.
        var vcNombreTab = window.parent.$("a[nombre^='" + vcTab + "']").parent().parent().attr("id") + "_tab";
        //AbrirTab($(this).next().val(), $(this).next().next().val(), "Common/Page/Adm_Lista.aspx?vcTab=" + vcTab + "&inCod=" + IdOpcion + "&inTip=3&inTipOri=1");
        AbrirTab(vcNombreTab, $(this).next().next().val(), "Common/Page/Adm_Lista.aspx?vcTab=" + vcTab + "&inCod=" + IdOpcion + "&inTip=3&inTipOri=1");
    });
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