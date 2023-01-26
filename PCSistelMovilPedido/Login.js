var ProveedorDiseno = 'TDP'; //VALORES POSIBLES CLARO/TDP
var FechaHoraInicioCampana = null;
var FechaHoraFinCampana = null;
var CampanaActiva = false;
var xRaizSistema = '';

function AbrirUsuarioContrasenaIncorrectos(mensaje) {
    debugger;
    if (mensaje != '') {
        alert(mensaje);
    } else {
        alert("Usuario o Contraseña incorrecta");
    } 
}
function AbrirConfirmacionClave() {
    debugger;
    if (confirm("Si tiene problemas al ingresar con su clave única podrá generar una clave temporal ¿Desea generarla, para el ingreso al sistema?")) {
        $.ajax({
            type: "POST",
            url: "Login.aspx/EnviarCorreoPassword",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {
                alert("En breves momentos se le enviará una clave para ingresar al sistema.");
            },
            error: function (xhr, err, thrErr) {
                //alert(err);
                //debugger;
                alert("Su solicitud no fue procesada. Inténtelo nuevamente en unos minutos.");
                //debugger;
                //alert(err);
                //MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
}
function fnResult() {
    alert("cambio");
}

$(function () {
    if (typeof MostrarPaginaCompleta != 'undefined') {
        if (MostrarPaginaCompleta == true) {
            $("#divLoginPrincipal").show();
        }
    }

    fnStyles(ProveedorDiseno);
    ObtenerRaizSistema();

    Dimensionar();

    $(window).resize(function () {
        Dimensionar();
    });

    if ($("#hdfNocerrarSesion").val() == "0") {
        $("#filaRecordarme").hide();
    }

    if ($("#hdfCaptcha").val() == "0") {
        $("#filaCaptcha").hide();
    }

    $("#descargar").live('click', function (e) {
        var Url = $(this).attr("BtnUrl");
        var doc = $(this).attr("BtnDoc");
        var Ruta = Url + doc;
        window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + Ruta);
    });
    $("#descargarMini").live('click', function (e) {
        var Url = $(this).attr("BtnUrl");
        var doc = $(this).attr("BtnDoc");
        var Ruta = Url + doc;
        window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + Ruta);
    });

    function raiz(ruta) {
        var rutaFinal = "";
        var n = window.location.pathname.split("/");

        for (var i = 0; i < n.length - 3; i++) {
            rutaFinal += "../";
        }
        rutaFinal += ruta;
        return rutaFinal;
    }

    function Dimensionar() {
        var Ancho = $(window).width();
        var Alto = $(window).height();

        var alto_divLoginPrincipal = $("#divLoginPrincipal").height();
        var margen_top = (Alto - alto_divLoginPrincipal + 5000) / 2;

        //alert(margen_top);
        /* Aplicar el Margen */
        $("#divLoginPrincipal").css("top", -10);


        //$("#divLoginPrincipal").css({ width: Ancho - 24, height: Alto - 24 });
    }

    $("#dvConfiguracion").click(function () {
        window.location.href = "Configuracion.aspx";
    });



    $("#tbConenido").show();

    $("#divProducto").css({ opacity: 0.75 });
    $("#divInicioSesion").css({ opacity: 0.8 });

    try {
        $("#divLoginPrincipal").corner();
        $("#divInicioSesion").corner();
        $("#divProducto").corner();
        $(".fields").corner("6px");
        if (TipoAutenticacion == "2") {
            $("#loginPrincipal_LblOlvidoContrasena").hide();
            //$("#Tr1").hide();
        }
    }
    catch (Error) {
        //no soportado.
    }

    //            $('#loginPrincipal_UserName').live("change", function (e) {
    //                $("#loginPrincipal_UserName").watermarkify();
    //            });

    $('#loginPrincipal_UserName').live("keydown", function (e) {
        if (e.keyCode == 13) {
            $("#loginPrincipal_Password").focus();
            return false; // prevent the button click from happening
        }
    });
    $('#loginPrincipal_Password').live("keydown", function (e) {
        if (e.keyCode == 13) {
            $("#loginPrincipal_LoginButton").click();
            return false; // prevent the button click from happening
        }
    });

    $("#slider").easySlider({
        auto: true,
        continuous: false
    });

    $.contextMenu({
        selector: '.context-menu-one',
        trigger: 'left',
        callback: function (key, options) {
            var m = "clicked: " + key;
            //window.console && console.log(m) || 
            alert(m);
        },
        items: {
            "edit": { name: "Sumario por Empleado&nbsp;&nbsp;&nbsp;", icon: "edit" },
            "cut": { name: "Cut", icon: "cut" },
            "copy": { name: "Copy", icon: "copy" },
            "paste": { name: "Paste", icon: "paste" },
            "delete": { name: "Delete", icon: "delete" },
            "sep1": "-",
            "quit": { name: "Quit", icon: "quit" }
        }
    });

    $("#slider").show();

    $("#loginPrincipal_LoginButton").click(function (e) {
        //debugger;
        if ($("#hdfCaptcha").val() == "1") {
            if (!jcap()) {
                if ($.trim($("#uword").val()) == '') {
                    alert("Debe ingresar el código de seguridad");
                }
                else {
                    alert("El código ingresado no es correcto");
                }
                return false;
            }
        }

    });

    var FinDo = false;
    var Ventana = window;
    do {
        Ventana = Ventana.parent;
        if (Ventana != null && Ventana.location.href.toLowerCase().indexOf('login.aspx') == -1) {
            if (Ventana.PaginaPadre != undefined) {
                Ventana.location.href = 'Login.aspx';
                FinDo = true;
                break;
            }
            else {
                if (Ventana.location.href.toLowerCase().indexOf('.aspx') == -1) {
                    FinDo = true;
                    break;
                }
            }
        }
        else {
            FinDo = true;
        }
    }
    while (FinDo == false)


    //if (($.browser.msie && $.browser.version < 9) || ($.browser.mozilla && $.browser.version < 23)) {
    //    if (!!navigator.userAgent.match(/Trident\/7\./)) {
    //        //alert( "ie"); 
    //    }
    //    else {
    //        if ($.browser.mozilla && $.browser.version < 23) {
    //            $("#dvMensajeExplorador").show();
    //            $("#dvMensajeExplorador").html("<br>Utilice una versión de navegador actualizada. Se sugiere: <br> - Chrome. <br>- Mozilla versión 23 o superior<br>- Internet Explorer 9 o superior.");
    //            $("#divInicioSesion").hide();
    //            //Esta aplicacion no soporta su navegodor actual. Utilice 
    //            alert('Esta aplicación no soporta su navegador actual.\nUtilice los siguientes navegadores:\n - Chrome.\n - Mozilla versión 23 o superior.\n - Internet Explorer 9 o superior.'); //,'Aviso');
    //            return;
    //        }
    //    }


    //debugger;

    //url: "Pedido/Dashboard_pedido.aspx/getFechaCampana",
    $.ajax({
        type: "POST",
        url: "Common/WebServices/General.asmx/getFechaCampana",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            if (resultado.d != "") {
                FechaHoraInicioCampana = resultado.d.split(",")[0];
                FechaHoraFinCampana = resultado.d.split(",")[1];
            } else {
                FechaHoraInicioCampana = null;
                FechaHoraFinCampana = null;
            }
        },
        error: function (xhr, err, thrErr) {
            var x;
            //alert(err);
            //MostrarErrorAjax(xhr, err, thrErr);
        }
    });

    var options = {
        $DragOrientation: 3,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)
        $ArrowNavigatorOptions: {                       //[Optional] Options to specify and enable arrow navigator or not
            $Class: $JssorArrowNavigator$,              //[Requried] Class to create arrow navigator instance
            $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
            $AutoCenter: 0,                                 //[Optional] Auto center arrows in parent container, 0 No, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
            $Steps: 1                                       //[Optional] Steps to go for each navigation request, default value is 1
        }
    };

    var jssor_slider1 = new $JssorSlider$("slider1_container", options);

    //#region Recuperar Contraseña
    $("#loginPrincipal_LblOlvidoContrasena").click(function () {
        $("#dvRecordarContrasena").show();
        $("#txtCorreo").focus();
        $(".popup-overlay").show();
    });

    $("#txtCorreo").keyup(function (e) {
        if (e.keyCode != 13) {
            if ($(this).val() != '') {
                $("#imgCorreo").show();
                if (validarEmail2($(this).val())) {
                    $("#dvFormatInvalid").hide();
                    $("#imgCorreo").attr("src", "Common/Images/Aprobar.png");
                } else {
                    $("#dvFormatInvalid").show();
                    $("#imgCorreo").attr("src", "Common/Images/Alerta_16x16.png");
                }
            } else {
                $("#imgCorreo").hide();
                $("#dvFormatInvalid").hide();
                $("#imgCorreo").removeAttr("src");
            }
        } else {
            $("#btnEnviar").click();
        }
    });

    $("#btnCerrar").click(function () {
        $("#dvRecordarContrasena").hide();
        $('.popup-overlay').hide();
    });

    $("#btnVolverLogin").click(function () {
        $("#dvConfirmacionEnvio").hide();
        $('.popup-overlay').hide();
    });

    $("#btnEnviar").click(function () {
        var Host = window.location.host;
        var Protocol = window.location.protocol;
        var PagRestCont = "RestablecerContrasena.aspx";
        var PaginaRC = Protocol + '//' + Host + '/' + PagRestCont;

        var vCorreo = $.trim($("#txtCorreo").val());
        if (vCorreo == '') {
            alert("Ingrese su correo eléctronico.");
            return;
        }
        if (!validarEmail2(vCorreo)) {
            alert("El formato del correo no es válido.");
            return;
        }

        var Data_EnviarSolicitudReestablecerContrasena = { Correo: vCorreo, Url: PaginaRC, IdDominio: -1, Dominio: '' };
        $.ajax({
            type: "POST",
            url: "Common/WebServices/General.asmx/enviarcorreopassword",
            data: JSON.stringify(Data_EnviarSolicitudReestablecerContrasena),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var Resultado = result.d.split('|')[0];
                var Mensaje = result.d.split('|')[1];
                if (Resultado == '1') {
                    $("#lblCorreoEnvio").text(vCorreo);
                    $("#dvConfirmacionEnvio").show();
                    $("#dvRecordarContrasena").hide();
                } else {
                    alert(Mensaje);
                }
            },
            error: function (xhr, err, thrErr) {
                alert(xhr, err, thrErr);
            }
        });

    });
    //#endregion
});

$(".context-menu-item.icon-edit").css("background-size", "200px 500px");

var myTimeout;
myTimeout = setTimeout(fnValidarCargaInicial, 200);
function fnValidarCargaInicial() {
    if ($("#loginPrincipal_UserName").val() == '') {
        $("#loginPrincipal_UserName").watermarkify();
    }
    clearTimeout(myTimeout);
    $("#loginPrincipal_UserName").focus();
}

function TiempoRestante(data) {
    //function TiempoRestante() {

    if (FechaHoraInicioCampana != null) {
        //data = data.replace("*:", "");
        //data = data.replace(/"/g, "");
        //data = data.replace(/\\/g, '');
        //01/01/2013 08:12:14
        var diaCampana, diaActual, diaCampanaFin;
        var mesCampana, mesActual, mesCampanaFin;
        var anioCampana, anioActual, anioCampanaFin;
        var horaCampana, horaActual, horaCampanaFin;
        var minutoCampana, minutoActual, minutoCampanaFin;
        var segundoCampana, segundoActual, segundoCampanaFin;

        data = data.replace("*:", "");
        data = data.replace(/"/g, "");
        data = data.replace(/\\/g, "");
        var now = undefined;
        try {
            diaActual = parseInt(data.substring(0, 2));
            mesActual = parseInt(data.substring(3, 3 + 2)) - 1;
            anioActual = parseInt(data.substring(6, 6 + 4));
            horaActual = parseInt(data.substring(11, 11 + 2));
            minutoActual = parseInt(data.substring(14, 14 + 2));
            segundoActual = parseInt(data.substring(17, 17 + 2));
            now = new Date(anioActual, mesActual, diaActual, horaActual, minutoActual, segundoActual);
        }
        catch (e) {
            now = undefined;
        }
        if (now == "Invalid Date") {
            now = new Date();
        }
        diaCampana = parseInt(FechaHoraInicioCampana.substring(0, 2));
        mesCampana = parseInt(FechaHoraInicioCampana.substring(3, 3 + 2)) - 1;
        anioCampana = parseInt(FechaHoraInicioCampana.substring(6, 6 + 4));
        horaCampana = parseInt(FechaHoraInicioCampana.substring(11, 11 + 2));
        minutoCampana = parseInt(FechaHoraInicioCampana.substring(14, 14 + 2));
        segundoCampana = parseInt(FechaHoraInicioCampana.substring(17, 17 + 2));
        FechaCampana = new Date(anioCampana, mesCampana, diaCampana, horaCampana, minutoCampana, segundoCampana);

        diaCampanaFin = parseInt(FechaHoraFinCampana.substring(0, 2));
        mesCampanaFin = parseInt(FechaHoraFinCampana.substring(3, 3 + 2)) - 1;
        anioCampanaFin = parseInt(FechaHoraFinCampana.substring(6, 6 + 4));
        horaCampanaFin = parseInt(FechaHoraFinCampana.substring(11, 11 + 2));
        minutoCampanaFin = parseInt(FechaHoraFinCampana.substring(14, 14 + 2));
        segundoCampanaFin = parseInt(FechaHoraFinCampana.substring(17, 17 + 2));
        FechaCampanaFin = new Date(anioCampanaFin, mesCampanaFin, diaCampanaFin, horaCampanaFin, minutoCampanaFin, segundoCampanaFin);

        if (now >= FechaCampana) {
            if (now <= FechaCampanaFin) {
                $("#dvTiempoRestante").html("<b><span style='color: #1077BB;'>Cierre de campaña en: </span><br><span style='font-size:20px;color: #004B95;'>" + countdown(now, FechaCampanaFin).toString() + "</span></b>");
                $("#pBotonesPedido").show();
                window.parent.$("#dvNuevoPedido").show();
            }
        }
        else {
            $("#dvTiempoRestante").html("<b><span style='color: #1077BB;'>Apertura de pedidos en: </span><br><span style='font-size:20px;color: #004B95;'>" + countdown(FechaCampana, now).toString() + "</span></b>");
        }
    }
    else {
        $("#dvTiempoRestante").html('');
    }
}


function ObtenerRaizSistema() {
    $.ajax({
        type: "POST",
        url: "Common/WebServices/General.asmx/ObtenerRaizSistema",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            xRaizSistema = result.d;
            //alert(RaizSistema);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function fnStyles(c) {
    if (ProveedorDiseno == "CLARO") {
        $("#divLoginPrincipal").css("background-image", "url(common/images/fondo_login_CLARO.png)");
        $("#divInicioSesion").css("background-image", "url(common/images/login-central_CLARO.png)");
        //$(".content").css("background-image", "url(common/images/login-central_CLARO.png)");

        $("#divInicioSesion").addClass("sBorde-CLARO");
        $("#divProducto").addClass("sBorde-CLARO");
        $("#divLoginPrincipal").addClass("sBorde-CLARO");

        $("#lblNombreProducto").addClass("sNombreProducto-CLARO");
    } else if (ProveedorDiseno == "TDP") {
        $("#divLoginPrincipal").css("background-image", "url(common/images/login/fondo_login_03.png)");
        $("#divInicioSesion").css("background-image", "url(common/images/login/login-central.png)");

        $("#divInicioSesion").addClass("sBorde");
        $("#divProducto").addClass("sBorde");
        $("#divLoginPrincipal").addClass("sBorde");

        $("#lblNombreProducto").addClass("sNombreProducto");
    } else {
        $("#divLoginPrincipal").css("background-image", "url(common/images/login/fondo_login_03.png)");
        $("#divInicioSesion").css("background-image", "url(common/images/login/login-central.png)");

        $("#divInicioSesion").addClass("sBorde");
        $("#divProducto").addClass("sBorde");
        $("#divLoginPrincipal").addClass("sBorde");

        $("#lblNombreProducto").addClass("sNombreProducto");
    }
}

function validarEmail2(valor) {
    var ExpRegular = /(\w+)(\.?)(\w*)(\@{1})(\w+)(\.?)(\w*)(\.{1})(\w{2,3})/;

    if (ExpRegular.test(valor)) {
        return true;
    }
    else {
        return false;
    }
}