$.fn.ExploradorWeb = function (Ancho, EventoClick) {
    this.each(function () {
        $('ul', this).hide();
        $("li h3", this).mousemove(PasoxItem);
        $("li h3", this).mouseleave(SalioxItem);

        function PasoxItem() {
            $(this).addClass('ui-state-hover');
        }
        function SalioxItem() {
            $(this).removeClass("ui-state-hover");
        }

        $(this).css({ 'font-size': '75%', 
                      'list-style-type': 'none',
                      'margin': '0',
                      'padding': '0',
                      'width': Ancho.toString() + 'px',
                      'border': '0px none !important'
        });

        $('li', this).css({ 'width': Ancho.toString() + 'px' });

        $('h3', this).addClass('ui-accordion-header ui-helper-reset ui-state-default ui-corner-all');

        $('h3', this).css({ 'border': '0px none !important',
                            'font-weight': 'normal'
        });

        $('a', this).css({ 'display': 'block',
                           'text-decoration': 'none',
                           'padding': '0.5em',
                           'padding-left': '20px'//Este parametro debe aumentar en 20 en cada nivel
                        });

        $('a', this).each(function () {
            var a = $(this);
            if (a.parent().next().is('ul')) {
                $('<span class="ui-icon ui-icon-triangle-1-e" style="float:left;margin-left: 0px;"></span>').insertBefore(a);//marginleft variable
            }
        });

        $('ul', this).css({'list-style-type': 'none',
                           'margin': '0',
                           'padding': '0',
                           'width': Ancho.toString() + 'px',
                           'border': '0px none !important'
                        }
        );

        $('ul', this).addClass('ui-accordion-content ui-helper-reset ui-widget-content ui-accordion-content-active quitarBorde');

        $('li h3', this).click(function () {
            var titulo = $("a", $(this));
            var pagina = titulo.attr("href");
            var nombre = titulo.attr("nombre");
            var titulo = titulo.attr("titulo");
            var Accord = $(this)[0].parentElement;

            var checkElement = $(this).next();

            if (pagina != null && pagina != "" && !checkElement.is('ul')) {
                EventoClick(pagina, nombre, titulo);
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
        });
    });
}