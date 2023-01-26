/// <reference path="../../Common/Scripts/jquery-2.0.0-vsdoc.js" />

var Criterio;
var ifCentroCosto;
var ifNumeroLlamado;
var ExisteCentroCosto = false;
var ExisteNumeroLlamado = false;
var Modal;
var tblLlamada;
var tbSumario;
var tabOpciones;
var ventanaSumario;

var themeName;
var themeNameOrigen; 
var passOrigen = '';
 

$(function () {

    /* Edgar Garcia 19-07*/
    var passtmp = $("#txtvcPas").attr("value"); 


    $(".btnNormal").button({});

    var EsClaveSegura = $("#hdfEsClaveSegura").val();
    //alert(EsClaveSegura);
    if (EsClaveSegura == 1) {
        $("#dvInfo").show();
    }


    //$(".jquery-ui-themeswitcher").css("background","rgb(255, 255, 255)!important");

    $("#txtvcNom").keypress(ValidarAlfaNumericoConEspacios);

    //Se oculta la funcionalidad de cambio de tema.. ya que se esta considerando una sola vista general (mpajuelo)
    //$("#AccordionJQ1").find('h3').filter(':contains(Temas)').hide();

    //$(".txtFecha").keypress(ValidarFecha);

    //    $(".txtFecha").bind('paste', function (e) {
    //        return false;
    //    });

    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false
    });

    $("#txtvcUsu").attr('readonly', 'readonly');




    inicio();
    function inicio() {
        DimPosElementos();
        ifCentroCosto = $("#ifCCO");
        ifNumeroLlamado = $("#ifNumeroLlamado");
    }

    $(window).resize(function () {
        //DimPosElementos();
    });

    function isIE() { //Vefiricar Version del Internet Explorer
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
    }


    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        var AnchoLateral = $(".LateralSplitter");
        $(".tabs").css({ height: Alto - 25, width: Ancho - AnchoLateral });
        $(".tabHijo").css({ height: Alto - 95, width: Ancho - 560 });
        $(".ifContenido").css({ height: Alto - 71, width: Ancho - 262 });
        //$("#dvContAcordeon").css({ height: Alto - 70, width: Ancho - 120 });
    }


    $("#imgUsuario").click(function () {
        //Cambio de Imagen del Usuario...
        var $Pagina = '../../UploadUsuario.aspx';
        $("#ifChangeImagenUsuario").attr("src", $Pagina);
        var $width = 410;
        var $height = 250;
        modalImagenUsuario = $("#ChangeImagenUsuario").dialog({
            title: "Cambiar Imagen Usuario",
            width: $width,
            height: $height,
            modal: true,
            resizable: false,
            close: function (event, ui) {
                location.reload();
            }
        });
    });

    var inicio = 1;
    var Inicio = true;
    var rutaImg = '../../Common/Images/Controles/ThemeSwitcher/';
    var rutaCss = '../../Common/Styles/JqueryThemeRoller/';
    var archivoCss = '/jquery-ui-1.8.16.custom.css';
    var switcherpane = $(".jquery-ui-themeswitcher");
    var loadTheme = 'Principal';
    var cookieName = 'jquery-ui-theme';
    var options_width = 660;

    /* Theme Loading
    ---------------------------------------------------------------------*/
    //$('a', '.jquery-ui-themeswitcher').click(function () {
    //    Inicio = false;
    //    updateCSS($(this).attr('id'));
    //    themeNameOrigen = $(this).attr('id');
    //    themeName = $(this).attr('id');
    //});

    $(".btnNormal").button();

    if (isIE() == 6) {
        $("#btnGuardar").css('width', '150px');
        $("#btnGuardar").css('display', 'inline-block');
    }

    //function to append a new theme stylesheet with the new style changes
    //function updateCSS(locStr) {

    //    var cssLink = $('<link href=\'' + rutaCss + locStr + archivoCss + ' \' type=\'text/css\' rel=\'Stylesheet\' class=\'ui-theme\' />');

    //    //window.parent.$("head").append(cssLink);
    //    $("head").append(cssLink);
    //    //alert(window.parent.document.location.href);
    //    //alert(rutaCss + locStr + archivoCss);

    //    if ($("link.ui-theme").size() > 1) {
    //        //$("link.ui-theme:first").remove();
    //    }
    //}

    switcherpane.css({
        //position: 'absolute',
        //float: 'left',
        fontFamily: 'Trebuchet MS, Verdana, sans-serif',
        fontSize: '12px',
        background: '#fff',
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



    // ==============================================================================================================
    // MODULO DE SEGURIDAD
    // ==============================================================================================================

    var letras = "abcdefghyjklmnñopqrstuvwxyz";

    function tiene_letras(texto) {
        texto = texto.toLowerCase();
        for (i = 0; i < texto.length; i++) {
            if (letras.indexOf(texto.charAt(i), 0) != -1) {
                return 1;
            }
        }
        return 0;
    }
    // ==============================================================================================================
    var numeros = "0123456789";

    function tiene_numeros(texto) {
        for (i = 0; i < texto.length; i++) {
            if (numeros.indexOf(texto.charAt(i), 0) != -1) {
                return 1;
            }
        }
        return 0;
    }
    // ==============================================================================================================
    // GUARDAR
    // ==============================================================================================================
    $("#btnGuardar").click(function () {

        if (themeName == "") {
            themeName = window.top.ObtenerTemaPrincipal();
            if (themeName == null || themeName == "") {
                themeName = "theme-navy";
            }
        }

        // ==============================================================================================================

        var vcUsu = $("#txtvcUsu").val();
        var vcNom = $("#txtvcNom").val();
        var vcPas = $("#txtvcPas").val();
        var vcPasCon = $("#txtvcPasCon").val();
        

        var EsClaveSegura = $("#hdfEsClaveSegura").val();
        //alert(EsClaveSegura);
        var msg = "";

        vcNom = $.trim(vcNom.replace(/'/g, ""));
        vcPas = $.trim(vcPas.replace(/'/g, ""));
        vcPasCon = $.trim(vcPasCon.replace(/'/g, ""));


        // ==============================================================================================================

        if (vcNom == '') {
            msg = "Debe ingresar el usuario";
        }

        if (vcPas == '') {
            msg = "Debe ingresar la contraseña";
        }

        if (vcPasCon == '') {
            msg = "Debe ingresar la confirmación de la contraseña";
        }

        if (vcPas != vcPasCon) {
            msg = "Las contraseñas ingresadas no coinciden";
        }

        ///*Edgar Garcia 19-07*/
        //if (vcPas==passtmp)
        //{
        //    msg = "La nueva contraseña debe ser distinta a la actual";
        //}


        // ==============================================================================================================
        if (vcPas.length <= 5 && EsClaveSegura == 1) {
            msg = "La contraseña no puede ser menor a 6 dígitos";
        }
        // ==============================================================================================================
        if (msg.length > 0) {
            alerta(msg);
            $("#txtvcPas").focus();
            return;
        }

        // ==============================================================================================================
        // validaciones especiales 

        var x = vcUsu.length;
        var cadenaInvertida = "";
        msg = "";

        while (x >= 0) {
            cadenaInvertida = cadenaInvertida + vcUsu.charAt(x);
            x--;
        }
        // ==============================================================================================================

        var i = vcUsu.length;

        if (vcPas.substring(0, i).toUpperCase() == vcUsu.substring(0, i).toUpperCase() && EsClaveSegura == 1) {
            msg = "La contraseña no puede empezar con el nombre de usuario";
        }
        if ($.trim(vcPas) == $.trim(cadenaInvertida) && EsClaveSegura == 1) {
            msg = "La contraseña no puede ser el código invertido";
        }
        if (tiene_letras(vcPas) == 0 && EsClaveSegura == 1) {
            msg = "La contraseña debe tener al menos una letra";
        }
        if (tiene_numeros(vcPas) == 0 && EsClaveSegura == 1) {
            msg = "La contraseña debe tener al menos un numero";
        }

        // ==============================================================================================================
        if (msg.length > 0) {
            alerta(msg);
            $("#txtvcPas").focus();
            return;
        }
        // ==============================================================================================================
        //var index = parseInt($(".chk:checked").attr("id").split('-')[1]);
        var index = 0;
        // ==============================================================================================================
        $.ajax({
            type: "POST",
            url: "MisDatos.aspx/GuardarMisDatos",
            data: "{'Tema': '" + themeName + "','vcNom':'" + vcNom + "','vcPas':'" + vcPas + "'," + 
                  "'prIdDashboard':'" + misDashBoards[index].IdDasboard + "','vcExcelPorDefecto':'" + $("#ddlExcelPorDefecto").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            // ==============================================================================================================
            success: function (result) {
                alerta(result.d, "Mis Datos");
                setTimeout(function () {
                    try {
                        window.top.$(".cerrarModalProfile").click();
                        window.top.ActualizarDatosProfile(vcNom);                       
                    } catch (e) {
                    }

                    try {
                        window.parent.ventanaModalMiPerfil.dialog("close");
                    } catch (e) {
                    }

                    try {
                        window.top.modalImagenUsuario.dialog("close");
                    } catch (e) {
                    }

                    try {
                        window.top.$("#modalFondo").hide();
                        window.top.$("#modalProfile").hide();
                    } catch (e) {
                    }
                    
                }, 750);                
                //   $(this).dialog("close");

            },
            // ==============================================================================================================
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

        // ==============================================================================================================

    });
    // ==============================================================================================================
    // ==============================================================================================================

    $("#btnCerrar").click(function () {
        var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        var Accord = window.parent.$("#" + tab1);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    });

    mostrarDash();

    $(".dvImgDash").click(function () {
        $(".dvImgDash").removeClass("dvSelect");
        $(this).addClass("dvSelect");
        var index = $(this).attr("id").split('-')[1];
        $("#Radio-" + index.toString()).attr("checked", "checked");
    });


    $(".demo-theme").click(function () {
        themeName = $(this).attr("data-theme");
        window.top.fnCambiarTemaPrincipal(themeName);
    });

    $("input[type=password]").each(function () {
        AgregarMensajeValidacionContrasenia(this, true, 3, 2);
    });
});



function mostrarDash() {
    $("#contenedor").html("");
    var insert;
    var ingreso = false;
    var i = 0;
    for (i = 0; i < misDashBoards.length; i++) {

        if (misDashBoards[i].Elegido) {
            ingreso = true;
            insert = '<div id="dvImgDash-' + i.toString() +
            '" class="dvImgDash dvSelect"><div id="dashHead-' + i.toString() +
            '" class="dashHead"><input class="chk" checked="checked" name="dash" id="Radio-' + i.toString() +
            '" type="radio" /><span>' + misDashBoards[i].Nombre +
            '</span></div><div id="dashBody-' + i.toString() +
            '" class="dashBody"><img id="img-' + i.toString() +
            '" src="../../' + misDashBoards[i].UrlImg + '"></div></div>';
        }
        else
        {
            insert = '<div id="dvImgDash-' + i.toString() +
            '" class="dvImgDash"><div id="dashHead-' + i.toString() +
            '" class="dashHead"><input class="chk" name="dash" id="Radio-' + i.toString() +
            '" type="radio" /><span>' + misDashBoards[i].Nombre +
            '</span></div><div id="dashBody-' + i.toString() +
            '" class="dashBody"><img id="img-' + i.toString() +
            '" src="../../' + misDashBoards[i].UrlImg + '"></div></div>';
        }

        $("#contenedor").append(insert);
    }

    if (!ingreso) {
        $("#Radio-0").attr("checked", "checked");

        $($($(".dvImgDash span:contains('Dashboard Movil')").parent()).find(".chk")[0]).attr("checked", "checked");
    }

}