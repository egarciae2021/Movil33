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

    
    
    $(".btnNormal").button({});

  
        //autoHeight: false

        var EsClaveSegura = $("#hdfEsClaveSegura").val();
        
        if (EsClaveSegura == 1) {
            $("#dvInfo").show();
        }

    $("#txtvcUsu").attr('readonly', 'readonly');
    $("#txtvcUsu").css({ "background": "#EFFBF8" });



   // inicio();

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
    $('a', '.jquery-ui-themeswitcher').click(function () {
        Inicio = false;
        updateCSS($(this).attr('id'));
        themeNameOrigen = $(this).attr('id');
        themeName = $(this).attr('id');
    });

    $(".btnNormal").button();

    if (isIE() == 6) {
        $("#btnGuardar").css('width', '150px');
        $("#btnGuardar").css('display', 'inline-block');
    }

    //function to append a new theme stylesheet with the new style changes
    function updateCSS(locStr) {

        var cssLink = $('<link href=\'' + rutaCss + locStr + archivoCss + ' \' type=\'text/css\' rel=\'Stylesheet\' class=\'ui-theme\' />');

        //window.parent.$("head").append(cssLink);
        $("head").append(cssLink);
        //alert(window.parent.document.location.href);
        //alert(rutaCss + locStr + archivoCss);

        if ($("link.ui-theme").size() > 1) {
            //$("link.ui-theme:first").remove();
        }
    }


    $("input[type=password]").each(function () {
        AgregarMensajeValidacionContrasenia(this, true, 2, 1);
    });
   
});
// ==============================================================================================================
// MODULO DE SE SEGURIDAD
// ==============================================================================================================
var letras = "abcdefghyjklmnñopqrstuvwxyz";
// ==============================================================================================================
function tiene_letras(texto) {
    // ==============================================================================================================
    texto = texto.toLowerCase();
    // ==============================================================================================================
    for (i = 0; i < texto.length; i++) {
        if (letras.indexOf(texto.charAt(i), 0) != -1) {
            return 1;
        }
    }
    // ==============================================================================================================
    return 0;
    // ==============================================================================================================
}
// ==============================================================================================================
var numeros = "0123456789";
// ==============================================================================================================
function tiene_numeros(texto) {
    // ==============================================================================================================
    for (i = 0; i < texto.length; i++) {
        // ==============================================================================================================
        if (numeros.indexOf(texto.charAt(i), 0) != -1) {
            return 1;
        } // ==============================================================================================================
    }
    // ==============================================================================================================
    return 0;
    // ==============================================================================================================
}
// ==============================================================================================================

/*Edgar Garcia 19-07*/
var tmppass = $("#txtvcPas").attr("value")
 
function guardar_datos(fn_flag_contrasena) {

    // ==============================================================================================================

   

    var flag = 0;
    var vcUsu = $("#txtvcUsu").val();
    
    var vcPas = $("#txtvcPas").val();
    var vcPasCon = $("#txtvcPasCon").val();

    var EsClaveSegura = $("#hdfEsClaveSegura").val();

    var msg = "";

    // ==============================================================================================================

    vcPas = $.trim(vcPas.replace(/'/g, ""));
    vcPasCon = $.trim(vcPasCon.replace(/'/g, ""));

    // ==============================================================================================================
    // ==============================================================================================================

    if (vcPas == '') {
        msg = "Debe ingresar la contraseña";
    }
    // ==============================================================================================================
    if (vcPasCon == '') {
        msg = "Debe ingresar la confirmación de la contraseña";
    }
    // ==============================================================================================================
    if (vcPas != vcPasCon) {
        msg = "Las contraseñas ingresadas no coinciden";
    }
    //*Edgar garcia 19-07*/
    if (vcPas == tmppass)
    {
     msg = "La nueva contraseña debe ser distinta a la actual";
    }
     
    // ==============================================================================================================
    //alert(EsClaveSegura);
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

    // ==============================================================================================================
    // validaciones especiales 
    // ==============================================================================================================    
    var x = vcUsu.length;
    var cadenaInvertida = "";
    // ==============================================================================================================
    msg = "";
    // ==============================================================================================================
    while (x >= 0) {
        cadenaInvertida = cadenaInvertida + vcUsu.charAt(x);
        x--;
    }
    // ==============================================================================================================
    // ==============================================================================================================
    var i = vcUsu.length;
    // ==============================================================================================================
    if (vcPas.substring(0, i).toUpperCase() == vcUsu.substring(0, i).toUpperCase() && EsClaveSegura == 1) {
        msg = "La contraseña no puede empezar con el nombre de usuario";
    }
    // ==============================================================================================================
    if ($.trim(vcPas) == $.trim(cadenaInvertida) && EsClaveSegura == 1) {
        msg = "La contraseña no puede ser el código invertido";
    }    
    // ==============================================================================================================
    if (tiene_letras(vcPas) == 0 && EsClaveSegura == 1) {
        msg = "La contraseña debe tener al menos una letra";
    }
    // ==============================================================================================================
    if (tiene_numeros(vcPas) == 0 && EsClaveSegura == 1) {
        msg = "La contraseña debe tener al menos un número";
    }
    // ==============================================================================================================
    if (msg.length > 0) {
        alerta(msg);
        $("#txtvcPas").focus();
        return;
    }
    // ==============================================================================================================
    msg = '';
    // ==============================================================================================================
    // ==============================================================================================================
    $.ajax({
        type: "POST",
        url: "MisDatos_Clave.aspx/Guardar_Clave",
        data: "{'vcPas':'" + vcPas + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // ==============================================================================================================
        success: function (result) {
            msg = result.d; 
            try {
                flag = msg.includes("Se guardaron todos los datos del usuario")

                if (flag) { 
                    fn_flag_contrasena(flag); 
                } else { 
                    alerta(msg);
                } 
            } catch (e) {
                //some
            } 
         },
        // ==============================================================================================================
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

    //return flag;
}
function getDatos(vcUsu, vcPas, vcPasCon) {
    this.vcUsu = vcUsu;
    this.vcPas = vcPas;
    this.vcPasCon = vcPasCon;
}
// ===================================================================================================================================================
function Enviar_Datos() {
    var Datos = new getDatos();

    Datos.vcUsu = $("#txtvcUsu").val();
    Datos.vcPas = $("#txtvcPas").val();
    Datos.vcPasCon = $("#txtvcPasCon").val();

    return Datos;
}
// ===================================================================================================================================================

function Confirmar_datos(fn_flag_contrasena) {

    $('#divMsgConfirmacion').dialog({
        title: 'Mensaje de Sistema',
        modal: true,        
        buttons: {
            "Si": function () {
                guardar_datos(fn_flag_contrasena);
                $(this).dialog("close");
            },
            "No": function () {
                $(this).dialog("close");
            }
        }
    });
}
