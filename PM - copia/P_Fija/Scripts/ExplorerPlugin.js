
$(document).ready(function () {


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
                    if (pagina != "" && pagina != null) {
                        var Accord = $(this)[0].parentElement;
                        var Tag = Accord.id.split("_");
                        var tab = $("#" + Tag[0] + "_" + Tag[1] + "_Tab" + Tag[2].substring(13));

                        var Id = "#" + titulo.attr("nombre");
                        var $panel = tab.find(Id);
                        if (!$panel.length) {//En el caso que no exista el tab, lo crea
                            var Titulo = titulo.attr("titulo");
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


});