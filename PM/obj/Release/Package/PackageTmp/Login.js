var btnVerCarrusel = 0;
var strCorreoUsuario = "";


function fnValidarFormulario() {
    var resultado = true;
    if ($.trim($("#txtUserName").val()) == "") {
        alerta("Ingrese el usuario", "Acceso", null, "warning");
        resultado = false;
    }
    else {
        if ($.trim($("#txtPassword").val()) == "") {
            alerta("Ingrese la contraseña", "Acceso", null, "warning");
            resultado = false;
        }
    }

    if ($("#hdfCaptcha").val() == "1") {
        if (!jcap()) {
            if ($.trim($("#uword").val()) == '') {
                alerta("Debe ingresar el código de seguridad", "Acceso", null, "warning");
            }
            else {
                alerta("El código ingresado no es correcto", "Acceso", null, "warning");
            }
            resultado = false;
        }
    }
    return resultado;
}

$(function () {
    //if ($("#lblMensajesLic").val() != "") {
    //    alerta($("#lblMensajesLic").val(), "Acceso", null, "warning");
    //}
    var uAg = navigator.userAgent.toLowerCase();
    var isMobile = !!uAg.match(/android|iphone|ipad|ipod|blackberry|symbianos/i);

    if (isMobile) {
        //alerta("navegando desde un dispositivo móvil");
        $('#hdTipoDispositivo').val('2');
    } else {
        //alerta("navegando desde un navegador PC");
        $('#hdTipoDispositivo').val('1');
    }
    
    var claveUsu = GenerarAES("usuario", 1);
    var clavePas = GenerarAES("contraseña", 1);
    var valUsu = $.Storage.get(claveUsu);
    var valPas = $.Storage.get(clavePas);
    if (valUsu != null && valUsu != "") {
        $('#chkRecordar').prop('checked', true);
        $("#txtUserName").val(GenerarAES(valUsu, 2));
        $("#txtPassword").val(GenerarAES(valPas, 2));
    } else {
        $("#txtUserName").val("");
        $("#txtPassword").val("");
        setTimeout(function () { $("#txtUserName").val(""); $("#txtPassword").val(""); }, 50);
        setTimeout(function () { $("#txtUserName").val(""); $("#txtPassword").val(""); }, 100);
        setTimeout(function () { $("#txtUserName").val(""); $("#txtPassword").val(""); }, 200);
        setTimeout(function () { $("#txtUserName").val(""); $("#txtPassword").val(""); }, 400);
        setTimeout(function () { $("#txtUserName").val(""); $("#txtPassword").val(""); }, 800);
    }


    $("#dvContenido").show();
    //$("#btnIngresar").click(function () {
    //    debugger;
    //    if (!fnValidarFormulario()) {
    //        return false;
    //    }
    //    else {
    //        var claveUsu = GenerarAES("usuario", 1);
    //        var clavePas = GenerarAES("contraseña", 1);
    //        if ($('#chkRecordar').is(":checked")) {
    //            var valUsu = GenerarAES($.trim($("#txtUserName").val()), 1);
    //            var valPas = GenerarAES($.trim($("#txtPassword").val()), 1);
    //            $.Storage.set(claveUsu, valUsu);
    //            $.Storage.set(clavePas, valPas);
    //        }
    //        else {
    //            $.Storage.remove(claveUsu);
    //            $.Storage.remove(clavePas);
    //        }
    //    }
    //});

    $("#btnIngresar").click(function () {
        //debugger;
        var value = ""
        if ($('#txtUserName').val() != "") { value = $('#txtUserName').val(); } else { value = "0"; }
        GetSession(value);
        
    });


    if ($("#hdfEsCloud").val() == "0") {
        $("#miCanvas").fadeOut();
    }

    var FinDo = false;
    var Ventana = window;
    do {
        Ventana = Ventana.parent;
        if (Ventana != null && Ventana.location.href.toLowerCase().indexOf('login.aspx') == -1) {
            if (Ventana.PaginaPadre != undefined) {
                Ventana.top.location.href = 'Login.aspx';
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
    while (FinDo == false);


    if ($("#hdfNocerrarSesion").val() == "0") {
        $("#filaRecordarme").hide();
    }

    if ($("#hdfCaptcha").val() == "0") {
        $("#filaCaptcha").hide();
    }

    Dimensionar();
    btnVerCarrusel = $("#hdfVerCarrusel").val();
    $(".btnNormal").button();
    $(window).resize(function () {
        Dimensionar();
    });

    function Dimensionar() {
        var Ancho = $(window).width();
        var Alto = $(window).height();

        var alto_divLoginPrincipal = $("#divLoginPrincipal").height();
        var margen_top = (Alto - alto_divLoginPrincipal + 5000) / 2;

        /* Aplicar el Margen */
        $("#divLoginPrincipal").css("top", -10);
    }

    $("#dvConfiguracion").click(function () {
        window.location.href = "Configuracion.aspx";
    });

    $("#tbConenido").show();

    $("#divProducto").css({ opacity: 0.75 });
    $("#divInicioSesion").css({ opacity: 0.8 });



    $('#loginPrincipal_UserName').on("keydown", function (e) {
        if (e.keyCode == 13) {
            $("#loginPrincipal_Password").focus();
            return false; // prevent the button click from happening
        }
    });
    $('#loginPrincipal_Password').on("keydown", function (e) {
        if (e.keyCode == 13) {
            $("#loginPrincipal_LoginButton").click();
            return false; // prevent the button click from happening
        }
    });

    $("#loginPrincipal_UserName").focus(function () {
        if ($(this).hasClass("txtEmail")) {
            $(this).removeClass("txtEmail");
            $(this).addClass("txtEmailLogin");
            $(this).val('');
        }
    });
    $("#loginPrincipal_UserName").blur(function (i) {
        if ($(this).val() == "") {
            $(this).removeClass("txtEmailLogin");
            $(this).addClass("txtEmail");
            //            $(this).val('Nombre Usuario...');
        }
    });


    $("#loginPrincipal_Text").focus(function () {
        $("#loginPrincipal_Text").hide();
        $("#loginPrincipal_Password").show();
        $("#loginPrincipal_Password").focus();
    });

    $("#loginPrincipal_Password").focusout(function (i) {
        if ($("#loginPrincipal_Password").val() == "") {
            $("#loginPrincipal_Text").show();
            $("#loginPrincipal_Password").hide();
        }
    });

    ////$("#slider").easySlider({
    ////    auto: true,
    ////    continuous: true,
    ////    pause: 5000
    ////});

    ////$.contextMenu({
    ////    selector: '.context-menu-one',
    ////    trigger: 'left',
    ////    callback: function (key, options) {
    ////        var m = "clicked: " + key;
    ////        //window.console && console.log(m) || 
    ////        alert(m);
    ////    },
    ////    items: {
    ////        "edit": { name: "Sumario por Empleado&nbsp;&nbsp;&nbsp;", icon: "edit" },
    ////        "cut": { name: "Cut", icon: "cut" },
    ////        "copy": { name: "Copy", icon: "copy" },
    ////        "paste": { name: "Paste", icon: "paste" },
    ////        "delete": { name: "Delete", icon: "delete" },
    ////        "sep1": "-",
    ////        "quit": { name: "Quit", icon: "quit" }
    ////    }
    ////});

    //$("#slider").show();
    if (btnVerCarrusel == 1) {
        $("#slider").show();
        $("#dvImgCentralLogin").hide();
    } else {
        $("#slider").hide();
        $("#dvImgCentralLogin").show();
    }

    $("#loginPrincipal_LoginButton").click(function (e) {

    });

    //#region Recuperar Contraseña
    $("#LblOlvidoContrasena").click(function () {
        $("#dvRecordarContrasena").show();
        $("#txtCorreo").focus();
        $(".popup-overlay").show();
    });

    $("#txtCorreo").keyup(function (e) {
        if (e.keyCode != 13) {
            if ($(this).val() != '') {
                if (validarEmail2($(this).val())) {
                    $("#dvFormatInvalid").hide();
                    $("#imgCorreo").attr("src", "Common/Images/Mantenimiento/Aprobar.png");
                    //$("#btnEnviar").button("option", "disabled", false);
                } else {
                    $("#dvFormatInvalid").show();
                    $("#imgCorreo").attr("src", "Common/Images/Mantenimiento/Alerta_16x16.png");
                    //$("#btnEnviar").button("option", "disabled", true);
                }
            } else {
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
        //var URL = window.location.href;
        //var Path = window.location.pathname;
        //var URLhash = window.location.hash;
        //var URLsearch = window.location.search;
        var Host = window.location.host;
        var Protocol = window.location.protocol;
        var PagRestCont = "RestablecerContrasena.aspx";
        var PaginaRC = Protocol + '//' + Host + '/' + PagRestCont;

        var vCorreo = $.trim($("#txtCorreo").val());
        if (vCorreo == '') {
            alerta("Ingrese su correo eléctronico.", "Acceso", null, "warning");
            return;
        }
        if (!validarEmail2(vCorreo)) {
            alerta("El formato del correo no es válido.", "Acceso", null, "warning");
            return;
        }

        var Data_EnviarSolicitudReestablecerContrasena = { Correo: vCorreo, Url: PaginaRC, IdDominio: -1, Dominio: '' };
        $.ajax({
            type: "POST",
            //url: "Login.aspx/EnviarSolicitudReestablecerContrasena",
            url: "Common/WebService/General.asmx/enviarcorreopassword",
            data: JSON.stringify(Data_EnviarSolicitudReestablecerContrasena),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var Resultado = result.d.split('|')[0];
                var Mensaje = result.d.split('|')[1];
                //alert(Resultado + "\n" + Mensaje);
                if (Resultado == '1') {                    
                    $("#lblCorreoEnvio").text(vCorreo);
                    $("#dvConfirmacionEnvio").show();
                    $("#dvRecordarContrasena").hide();
                    $("#txtCorreo").val("");
                    $("#imgCorreo").removeAttr("src");
                } else {
                    alerta(Mensaje, "Acceso", null, "warning");
                }
            },
            error: function (xhr, err, thrErr) {
                var r = $.parseJSON(xhr.responseText);
                if (r == null) { return; }
                else {
                    alerta("" + r.Message, "Acceso", null, "error");
                }
                //                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
        //var strCorreoUser = $("#LblCorreoUsuario").text().toString();
        //var strCorreoIngresado = $("#txtCorreo").val().toString();
        //if (strCorreoUser.toLowerCase() == strCorreoIngresado.toLowerCase()) {
        //    alerta("Su contraseña sera enviada al correo ingresado");
        //    $("#dvRecordarContrasena").hide();
        //    //$('.popup-overlay').hide();
        //    //$('#abc').show();
        //}

    });
    //#endregion


    //descargar manual
    $("#LblGuiaUsuario").click(function () {
        SaveToDisk("VisualSoft/GuiaIngresoSistema.pdf", "GuiaIngresoSistema.pdf");
    });


});


function SaveToDisk(fileURL, fileName) {
    // for non-IE
    try {
        if (!window.ActiveXObject) {
            var save = document.createElement('a');
            save.href = fileURL;
            save.target = '_blank';
            save.download = fileName || fileURL;
            var evt = document.createEvent('MouseEvents');
            evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0,
                false, false, false, false, 0, null);
            save.dispatchEvent(evt);
            (window.URL || window.webkitURL).revokeObjectURL(save.href);
        }
            // for IE
        else if (!!window.ActiveXObject && document.execCommand) {
            var _window = window.open(fileURL, "_blank");
            _window.document.close();
            _window.document.execCommand('SaveAs', true, fileName || fileURL);
            _window.close();
        }
    } catch (e) {
    }
}


document.onkeydown = function (event) {
    event = (event || window.event);
    if (event.keyCode == 123) {
        return false;
    }
};

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


/*****  29/12/2015  :   RURBINA *****/

//VALORES PARA LOS LINKS DINAMICOS ----------------------------------------------------------------------------------------------------------------------------
var UrlbtnManual = "Common/Documentos/";

var btnVerLinkWeb = 0;
var btnTextoLinkWeb = "Web Pedidos";
var btnUrlLinkWeb = "";

var btnVerLinkDoc = 0;
var btnTextoLinkDoc = "Manual de Normas";
var btnNameDocumentoNormas = "Manual_Normas.pdf";

var btnVerLinkManual = 0;
var btnTextoLinkManual = "Manual de Usuario";
var btnNameManual = "ManualUsuarioSistema.pdf";
var contLink = 0;
//-------------------------------------------------------------------------------------------------------------------------------------------------------------

function raiz(ruta) {
    var rutaFinal = "";
    var n = window.location.pathname.split("/");

    var i;
    for (i = 0; i < n.length - 3; i++) {
        rutaFinal += "../";
    }
    rutaFinal += ruta;
    return rutaFinal;
}

$(function () {
    if ($("#hdfUsaDatosConfig").val() == 1) {
        btnVerLinkWeb = $("#hdfVerLinkWeb").val();
        btnTextoLinkWeb = $("#hdfTextoLinkWeb").val();
        btnUrlLinkWeb = $("#hdfUrlLinkWeb").val();

        btnVerLinkDoc = $("#hdfVerLinkDoc").val();
        btnTextoLinkDoc = $("#hdfTextoLinkDoc").val();
        btnNameDocumentoNormas = $("#hdfNameDocumentoNormas").val();

        btnVerLinkManual = $("#hdfVerLinkManual").val();
        btnTextoLinkManual = $("#hdfTextoLinkManual").val();
        btnNameManual = $("#hdfNameManual").val();
    }

    if (btnVerLinkWeb == 1) {
        contLink += 1;
    }
    if (btnVerLinkDoc == 1) {
        contLink += 1;
    }
    if (btnVerLinkManual == 1) {
        contLink += 1;
    }

    if (btnVerLinkWeb == 1) {
        if (contLink > 0) {
            $("#trLink1").append("<td><div style='width: 100%;text-align: left;'><a href='" + btnUrlLinkWeb + "' target='_blank' id='UrlWebPedido' title='" + btnTextoLinkWeb + "' style='font-weight: bold; font-size: 12px; color: black;'><img src='Common/Images/Login/Website.png' style='opacity:0.4;filter:alpha(opacity=40)'onmouseover='this.style.opacity=0.8'onmouseout='this.style.opacity=0.4'/>&nbsp;" + btnTextoLinkWeb + "</a></div></td>");
        }
    }

    if (btnVerLinkDoc == 1) {
        $("#trLink1").append("<td><div style='width: 100%;text-align: center;'><a href='#' id='descargarNormas' title='" + btnTextoLinkDoc + "'  BtnUrl = '" + UrlbtnManual + "' BtnDoc = '" + btnNameDocumentoNormas + "' style='font-weight: bold; font-size: 12px; color: black;'><img src='Common/Images/Login/Information.png' style='opacity:0.4;filter:alpha(opacity=40)'onmouseover='this.style.opacity=0.8'onmouseout='this.style.opacity=0.4'/>&nbsp;" + btnTextoLinkDoc + "</a></div></td></tr>");

    }

    if (btnVerLinkManual == 1) {
        if (contLink < 3) {
            $("#trLink1").append("<td><div style='width: 100%;text-align: center;'><a href='#' id='descargarManual' title='" + btnTextoLinkManual + "'  BtnUrl = '" + UrlbtnManual + "' BtnDoc = '" + btnNameManual + "' style='font-weight: bold; font-size: 12px; color: black;'><img src='Common/Images/Login/document2.png' style='opacity:0.4;filter:alpha(opacity=40)'onmouseover='this.style.opacity=0.8'onmouseout='this.style.opacity=0.4'/>&nbsp;" + btnTextoLinkManual + "</a></div></td>");
        } else {
            $("#trLink2").append("<tr><td><div style='width: 100%;text-align: center;'><a href='#' id='descargarManual' title='" + btnTextoLinkManual + "'  BtnUrl = '" + UrlbtnManual + "' BtnDoc = '" + btnNameManual + "' style='font-weight: bold; font-size: 12px; color: black;'><img src='Common/Images/Login/document2.png' style='opacity:0.4;filter:alpha(opacity=40)'onmouseover='this.style.opacity=0.8'onmouseout='this.style.opacity=0.4'/>&nbsp;" + btnTextoLinkManual + "</a></div></td></tr>");
        }
    }

    $("#descargarNormas").on('click', function (e) {
        var Url = $(this).attr("BtnUrl");
        var doc = $(this).attr("BtnDoc");
        var Ruta = Url + doc;
        window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + Ruta);
        //window.location.href = "Common/Controladores/DescargarArchivo.ashx?archivo=" + Ruta + "&remoto=1";
        //window.open(raiz(miruta), "_blank");
    });
    $("#descargarManual").on('click', function (e) {
        var Url = $(this).attr("BtnUrl");
        var doc = $(this).attr("BtnDoc");
        var Ruta = Url + doc;
        window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + Ruta);
    });
    if ($("#hdfEsCloud").val() == "0") {
        if ($("#lblMensaje").val() != "") {
            alerta($("#lblMensaje").val(), "Acceso", null, "warning");
        }
    }
});


function generateKeyInstance(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function GetSession(name) {
    //debugger;
    //var request;
    //if (window.XMLHttpRequest) {
    //    request = new XMLHttpRequest();
    //} else if (window.ActiveXObject) {
    //    request = new ActiveXObject("Microsoft.XMLHTTP");
    //}

    //if (request != null) {
    //    var url = "LoginAuthDoble.aspx/GetSession";
    //    request.open("POST", url, false);
    //    var params = "{name: '" + name + "'}";
    //    request.setRequestHeader("Content-Type", "application/json");
    //    request.onreadystatechange = function () {
    //        debugger;
    //    };
    //    request.send(params);

    //}


    //$.ajax({
    //    type: "POST",
    //    url: "Login.aspx/GetSession2",
    //    data: "{'name': '" + name + "'}",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        debugger;
    //    },
    //    error: function (xhr, err, thrErr) {
    //        MostrarErrorAjax(xhr, err, thrErr);
    //    }
    //});

    if ($("#hdfEsCloud").val() == "1") {
        var user_ = name.lastIndexOf("@");
        name = name.substring(0, user_);
    }

    var Data = { name: name };
    $.ajax({
        type: "POST",
        //url: "Login.aspx/EnviarSolicitudReestablecerContrasena",
        url: "Common/WebService/General.asmx/RetornaUsuario_ValidarKey",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
           // debugger;
            var stg_cli = localStorage.getItem(result.d);

            if (stg_cli != null) {
                $('#hKeySessionLocal').val(stg_cli);
            } else {
                $('#hKeySessionLocal').val("");
            }

            //$("#hKeySessionLocal").val();
        },
        error: function (xhr, err, thrErr) {
            var r = $.parseJSON(xhr.responseText);
            if (r == null) { return; }
            else {
                alerta("" + r.Message, "Acceso", null, "error");
            }
            //                MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}