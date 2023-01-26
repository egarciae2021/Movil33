$(function () {
    var inicio = 1;
    var Inicio = true;
    var rutaImg = 'Common/Images/Controles/ThemeSwitcher/';
    var rutaCss = 'Common/Styles/JqueryThemeRoller/';
    var archivoCss = '/jquery-ui-1.8.16.custom.css';
    var switcherpane = $(".jquery-ui-themeswitcher");
    var loadTheme = 'Principal';
    var cookieName = 'jquery-ui-theme';
    var options_width = 660;
    var themeName;
    /* Theme Loading
    ---------------------------------------------------------------------*/
    $('a', '.jquery-ui-themeswitcher').click(function () {
        Inicio = false;
        updateCSS($(this).attr('id'));
        themeName = $(this).attr('id');
    });

    $(".btnNormal").button();

    //function to append a new theme stylesheet with the new style changes
    function updateCSS(locStr) {
        var cssLink = $('<link href=\'' + rutaCss + locStr + archivoCss + ' \' type=\'text/css\' rel=\'Stylesheet\' class=\'ui-theme\' />');

        $("head").append(cssLink);

        if ($("link.ui-theme").size() > 1) {
            $("link.ui-theme:first").remove();
        }
    }
    
    switcherpane.css({
        //position: 'absolute',
        //float: 'left',
        fontFamily: 'Trebuchet MS, Verdana, sans-serif',
        fontSize: '12px',
        background: '#000',
        color: '#fff',
        //padding: '8px 3px 3px',
        //	            border: '1px solid #ccc',
        //	            '-moz-border-radius-bottomleft': '6px',
        //	            '-webkit-border-bottom-left-radius': '6px',
        //	            '-moz-border-radius-bottomright': '6px',
        //	            '-webkit-border-bottom-right-radius': '6px',
        //borderTop: 0,
        zIndex: 999999,
        width: options_width - 6//minus must match left and right padding
    })
	        .find('ul').css({
	            listStyle: 'none',
	            margin: '0',
	            padding: '0',
	            overflow: 'auto'//,
	            //height: options.height
	        }).end()
	        .find('td').hover(
		        function () {
		            $(this).css({
		                //'borderColor': '#555',
		                'background': 'url(' + rutaImg + 'menuhoverbg.png) 50% 50% repeat-x',
		                cursor: 'pointer'
		            });
		        },
		        function () {
		            $(this).css({
		                'borderColor': '#111',
		                'background': '#000',
		                cursor: 'auto'
		            });
		        }
	        ).css({
	            width: 97,
	            height: '',
	            padding: '2px',
	            margin: '1px',
	            border: '1px solid #111',
	            '-moz-border-radius': '4px',
	            clear: 'left'//,
	            //float: 'left'
	        }).end()
	        .find('a').css({
	            color: '#aaa',
	            textDecoration: 'none',
	            //float: 'left',
	            width: '100%',
	            outline: '0'
	        }).end()
	        .find('img').css({
	            //float: 'left',
	            border: '1px solid #333',
	            margin: '0 2px'
	        }).end()
	        .find('.themeName').css({
	            //float: 'left',
	            margin: '3px 0'
	        }).end();

    $("#btnGuardar").click(function () {
        if (themeName == "") {
            alerta("Seleccione un Tema");
            return;
        }
        $.ajax({
            type: "POST",
            url: "Theme.aspx/GuardarTema",
            data: "{'Tema': '" + themeName + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $(this).dialog("close");
                window.parent.location.reload();
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    $("#btnCerrar").click(function () {
        window.parent.dlgTema.dialog("close");
    });
});