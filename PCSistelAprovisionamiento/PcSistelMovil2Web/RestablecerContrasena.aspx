<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RestablecerContrasena.aspx.cs" Inherits="PcSistelMovil2Web.RestablecerContrasena" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>.:PCSISTEL MOVIL v2.0:.</title>

    <link href="Styles/Sitio.css" rel="stylesheet" type="text/css" />

    <script src="Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <link href="Scripts/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" />
    <%--<script src="Common/Scripts/Utilitario.js" type="text/javascript"></script>--%>
    <link href="Styles/Bootstrap/css/bootstrap3.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript">

        $(function () {
            $(".popup-overlay").show();
            $("#txtContrasena1").focus();

            $("#txtContrasena1").keyup(function (e) {
                if (e.keyCode == 13) {
                    $("#txtContrasena2").focus();
                } else {
                    passwordStrength($(this).val());
                }
            });

            $("#txtContrasena2").keyup(function (e) {
                if ($("#txtContrasena1").val() != $(this).val()) {
                    $("#dvFormatInvalid").show();
                    $("#imgCorreo").attr("src", "Common/Images/Mantenimiento/Alerta_16x16.png");
                    $("#lblCoincidenciaPass").text("La contraseñas deben ser iguales.");
                } else {
                    $("#dvFormatInvalid").hide();
                    $("#imgCorreo").attr("src", "Common/Images/Mantenimiento/Aprobar.png");
                    $("#lblCoincidenciaPass").text("");
                }
            });

            $("#btnEnviar").click(function () {


                $("#btnEnviar").attr('disabled', 'disabled');

                var vPass1 = $("#txtContrasena1").val();
                var vPass2 = $("#txtContrasena2").val();

                if (vPass1 == '') {
                    alert("Ingrese su nueva contraseña.");
                    $("#btnEnviar").removeAttr('disabled');
                    $("#txtContrasena1").focus();
                    return;
                }
                if (vPass2 == '') {
                    alert("Confirme su contraseña antes de continuar.");
                    $("#btnEnviar").removeAttr('disabled');
                    $("#txtContrasena2").focus();
                    return;
                }
                if (vPass1.length < 6) {
                    alert("La contraseña debe contener como mínimo 6 caracteres.");
                    $("#btnEnviar").removeAttr('disabled');
                    $("#txtContrasena1").focus();
                    return;
                }
                if (vPass1 != vPass2) {
                    alert("La contraseñas no coinciden.");
                    $("#btnEnviar").removeAttr('disabled');
                    $("#txtContrasena2").focus();
                    return;
                }

                var Data_RestablecerContrasenaUsuario = {
                    CodigoSolicitud: $("#hdfCodReestablecimiento").val(),
                    NuevaContrasena: vPass1,
                    ConfirmacionContrasena: vPass2,
                    PaginaLogin: fnObtenerPaginaLogin()
                }
                
                $.ajax({
                    type: "POST",
                    url: "RestablecerContrasena.aspx/RestablecerContrasenaUsuario",
                    data: JSON.stringify(Data_RestablecerContrasenaUsuario),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        $("#dvReestablecimiento").hide();
                        $("#dvErrorSolicitud").hide();
                        $("#dvCaducado").hide();
                        $("#dvExito").hide();

                        if (result.d == '-2') {
                            alert("La contraseñas no coinciden.");
                        } else if (result.d == '-1') {
                            $("#dvReestablecimiento").hide();
                            $("#dvErrorSolicitud").show();
                        } else if (result.d == '0') {
                            $("#dvReestablecimiento").hide();
                            $("#dvCaducado").show();
                        } else {
                            $("#dvReestablecimiento").hide();
                            $("#dvExito").show();
                        }

                        $("#btnEnviar").removeAttr('disabled');
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });

            });

            $(".ir-login").click(function () {
                window.location.href = "Login.aspx";
            });

            $("#imgInfoFortaleza").click(function () {
                $("#dvFortalezaContraseña").show();
            });

            $(".info-fortaleza-cerrar").click(function () {
                $("#dvFortalezaContraseña").hide();
            });

            $('#PassFortaleza').hover(function () {
                if ($(".lblFortalezaPass").text() == '') {
                    return;
                }
                $('#dvFortalezaContrasena').css('position', 'fixed');
                $('#dvFortalezaContrasena').css('left', $(this).offset().left - $(window).scrollLeft() + $(this).width());
                $('#dvFortalezaContrasena').css('top', $(this).offset().top - $(window).scrollTop() + $(this).height());

                $('#dvFortalezaContrasena').show(300);
            }, function () {
                $('#dvFortalezaContrasena').hide();
            });
        });

        function fnObtenerPaginaLogin() {
            var Host = window.location.host;
            var Protocol = window.location.protocol;
            var PagLogin = "Login.aspx";
            return Protocol + '/' + Host + '/' + PagLogin;
        }

        function passwordStrength(pass) {
            var colors = [];
            colors[0] = "#cccccc";
            colors[1] = "#ff0000";
            colors[2] = "#ff5f5f";
            colors[3] = "#56e500";
            colors[4] = "#399800"; //"#4dcd00";
            colors[5] = "#0000FF"; //"#5665B0"; //"#399800";

            var fortaleza = [];
            fortaleza[0] = ""; //"Inválida";
            fortaleza[1] = "Muy Débil";
            fortaleza[2] = "Débil";
            fortaleza[3] = "Media";
            fortaleza[4] = "Buena";
            fortaleza[5] = "Óptima";

            var password = pass
            var score = 0;

            if (password.length < 6) {
                score = 0;
            } else {
                //if (password.length >= 6) { //longitud mayor o igual a 6 caracteres
                //    score++;
                //}
                //if ((password.match(/[a-z]/)) && (password.match(/[A-Z]/))) { //letras mayusculas y minuscuals
                //    score++;
                //}
                if (password.match(/[A-Z]/)) { //letras mayusculas
                    score++;
                }
                if (password.match(/[a-z]/)) { //letras y minusculas
                    score++;
                }
                if (password.match(/\d+/)) { //digitos
                    score++;
                }
                if (password.match(/[^a-z\d]+/)) { //simbolos
                    score++
                }
                if (password.length > 12) { //longitud mayor a 12 caracteres
                    score++;
                }
            }
            //return score;
            $("#PassFortaleza").css("background-color", colors[score]);
            $(".lblFortalezaPass").css("color", colors[score]);
            $(".lblFortalezaPass").text(fortaleza[score]);

            $("#PassFortaleza").css("width", (parseInt(score) * 20).toString() + "%");
        }

    </script>
    <style type="text/css">
        .contenido
        {
            margin:0px auto;
	        margin-top:120px;
	        position:relative;
	        padding:10px;
	        width:350px;
	        min-height:200px;
	        border-radius:4px;
	        background-color:#FFFFFF;
	        box-shadow: 0 2px 5px #666666;	        
            z-index: 5;
            height:auto;
        }
        
        .popup-overlay {
	        left: 0;
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
	        /*display:none;*/
	        background-color: #777777;
            cursor: pointer;
            opacity: 0.7;
        }
        
        .rs-row
        {
            padding: 10px 0px 0px 0px;
        }
        
        #dvFortalezaContrasena
        {
            position: relative;
            border: 0px dotted gray;
            display: none; 
            z-index: 10; 
            padding: 5px 5px 5px 5px; 
            border-radius: 3px; 
            box-shadow: 5px 5px 5px gray;
            background-color:lightblue;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField runat="server" ID="hdfCodReestablecimiento" />
    <div id="dvReestablecimiento" runat="server" class="contenido">
        <div>
            <h3 style="color: #10589A; font-weight:bolder; text-align:center; margin:10px 10px 20px 10px;">Restablecer Contraseña</h3>
        </div>
        <div style="height:auto; padding: 0px 15px 0px 15px">
            <div class="rs-row">
                Ingresa tu nueva contraseña
                <%--<asp:Image ID="imgInfoFortaleza" runat="server" style="vertical-align:top; cursor:hand; cursor:pointer;" ImageUrl="Common/Images/Mantenimiento/info.png" />--%>
            </div>
            <div class="rs-row">
                <asp:TextBox ID="txtContrasena1" runat="server" TextMode="Password" Width="230px"></asp:TextBox>
                <asp:Label class="lblFortalezaPass" runat="server" style="font-size:14px; font-weight:bold;"></asp:Label>                        
            </div>
            <div class="rs-row">Ingresa tu nueva contraseña una vez más</div>
            <div class="rs-row">
                <asp:TextBox ID="txtContrasena2" runat="server" TextMode="Password" Width="230px"></asp:TextBox>
                <asp:Image ID="imgCorreo" runat="server" style="vertical-align:middle;"/>
            </div>
            <div class="rs-row" style="height:30px;">
                <asp:Label ID="lblCoincidenciaPass" runat="server" style="color: #CF2C2C;font-size: small;"></asp:Label>
            </div>
            <div class="rs-row" style="height:30px;">
                <div id="PassFortaleza" style="height:10px;"></div>
            </div>
        </div>
        <div style="text-align:right;">
            <div id="btnEnviar" class="btn btn-success">
                Restablecer Contraseña
            </div>
        </div>
    </div>
    <div id="dvCaducado" runat="server" style="display:none;" class="contenido">
        <div>
            <h3 style="color: #10589A; font-weight:bolder; text-align:center; margin:10px 10px 20px 10px;">Solicitud Expirada</h3>
        </div>
        <div style="height:auto; padding: 0px 15px 0px 15px">
            <div class="rs-row">
                Su solicitud de cambio de contraseña a expirado
            </div>
            <div class="rs-row">
                Las solicitud de cambio de contraseña solo estará activa por un corto periodo de tiempo, asegúrate de usarlas lo más pronto posible.
            </div>
        </div>
        <div style="text-align:right; margin-top:15px;">
            <div class="btn btn-success ir-login">
                Ir al Login
            </div>
        </div>
    </div>
    <div id="dvExito" runat="server" style="display:none;" class="contenido">
        <div>
            <h3 style="color: #10589A; font-weight:bolder; text-align:center; margin:10px 10px 20px 10px;">Contraseña Cambiada</h3>
        </div>
        <div style="height:auto; padding: 0px 15px 0px 15px">
            <div class="rs-row">
                Su contraseña ha sido cambiada con éxito. Ahora puede loguearse con su nueva contraseña.
            </div>
        </div>
        <div style="text-align:right; margin-top:15px;">
            <div class="btn btn-success ir-login">
                Ir al Login
            </div>
        </div>
    </div>
    <div id="dvErrorSolicitud" runat="server" style="display:none;" class="contenido">
        <div>
            <h3 style="color: #10589A; font-weight:bolder; text-align:center; margin:10px 10px 20px 10px;">Acceso Inválido</h3>
        </div>
        <div style="height:auto; padding: 0px 15px 0px 15px">
            <%--<div class="rs-row">
                No podemos procesar su solicitud.
            </div>--%>
            <div class="rs-row">
                La ruta ingresada no es válida; sí ha copiado y pegado la ruta de acceso desde el correo electrónico, asegúrese de haber copiado la ruta completa.
            </div>
        </div>
        <div style="text-align:right; margin-top:15px;">
            <div class="btn btn-success ir-login">
                Ir al Login
            </div>
        </div>
    </div>
    <div class="popup-overlay" style="display:none;"></div>
    <div id="dvFortalezaContrasena">
        Fortaleza de la contraseña: <label class="lblFortalezaPass"></label>
    </div>
    <%--<div id="dvFortalezaContraseña" class="info-fortaleza" style="display: none;">
        <div class="info-fortaleza-titulo">
            Fortaleza de la contraseña
            <img class="info-fortaleza-cerrar" src="Common/Images/Chat/cerrar.png"/>
        </div>
        <div class="info-fortaleza-detalle">
            <ul>
                <li>
                    La contraseña debe tener como mínimo 6 caracteres.
                </li>
                <li>
                    La fortaleza de la contraseña se mide en los siguientes niveles: 
                    <span style="color:#ff0000;">"Muy Débil"</span>,&nbsp;
                    <span style="color:#ff5f5f;">"Débil"</span>,&nbsp;
                    <span style="color:#56e500;">"Media"</span>,&nbsp;
                    <span style="color:#399800;">"Buena"</span>&nbsp;y&nbsp;
                    <span style="color:#0000FF;">"Óptima"</span>
                </li>
                <li>
                    Las contraseñas distinguen las mayúsculas y minúsculas, y pueden contener números y símbolos.
                </li>
                <li>
                    Por cada punto que considere al ingresar su contraseña, esta se hará mas fuerte.
                </li>
                <li>
                    Una contraseña <span style="color:#0000FF;">"Óptima"</span> contiene al menos una mayúscula, una minúscula, un número, un símbolo y tiene mas de 12 caracteres.
                </li>
            </ul>
            
            
        </div>
    </div>--%>
    </form>
</body>
</html>
