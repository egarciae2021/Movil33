<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="RestablecerContrasena.aspx.vb" Inherits=".RestablecerContrasena" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">



    <title>Restablecer | PCSistel Móvil 3.3 - Web Admin </title>

    <link rel="shortcut icon" href="Content/img/favicon.png" type="image/x-icon">
    <link href="Content/css/shared/fonts.css" rel="stylesheet" type="text/css" />
    <link href="Content/css/shared/bootstrap.min.css" rel="stylesheet" />
    <link href="Content/css/shared/nifty.min.css" rel="stylesheet" />
    <link href="Content/css/shared/nifty-demo-icons.min.css" rel="stylesheet" />
    <link href="Content/css/shared/pace.min.css" rel="stylesheet" />
    <script type="text/javascript" src="Content/js/shared/pace.min.js"></script>
    <link href="Content/css/shared/nifty-demo.min.css" rel="stylesheet" />

    <link href="Common/Styles/Login.css" rel="stylesheet" type="text/css" />
    <script src="Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>

    <link href="Content/css/shared/nifty.min.css" rel="stylesheet" />

    <link href="Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="Common/Styles/KendoUI/kendo.silver.min.css" rel="stylesheet" type="text/css" />
    <%--<link href="Common/Styles/watermarkify.css" rel="stylesheet" type="text/css" />
    <link href="Common/Styles/style_slide.css" rel="stylesheet" type="text/css" />

    <script src="Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>--%>
    <%--<script src="Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>--%>
    <%--<script src="Common/Scripts/Utilitario.js" type="text/javascript"></script>--%>
    <%--<script src="RestablecerContrasena.js" type="text/javascript"></script>--%>

    <%--    <link href="Common/Styles/JqueryThemeRoller/redmond/jquery-ui-1.8.16.custom.css"
        rel="stylesheet" type="text/css" />
    <link href="Common/Styles/Principal.css" rel="stylesheet" type="text/css" />--%>

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
                if ($(this).val() == "" && $("#txtContrasena1").val() == "") {
                    $("#imgCorreo").attr("src", "");
                }
            });

            $("#btnEnviar").click(function () {
                $("#lblCoincidenciaPass").text("");
                var vPass1 = $("#txtContrasena1").val();
                var vPass2 = $("#txtContrasena2").val();

                if (vPass1 == '') {
                    $("lblCoincidenciaPass").text("Ingrese su nueva contraseña.");
                    $("#txtContrasena1").focus();
                    return;
                }
                if (vPass2 == '') {
                    $("#lblCoincidenciaPass").text("Confirme su contraseña antes de continuar.");
                    $("#txtContrasena2").focus();
                    return;
                }
                if (vPass1.length < 6) {
                    $("#lblCoincidenciaPass").text("La contraseña debe contener como mínimo 6 caracteres.");
                    $("#txtContrasena1").focus();
                    return;
                }
                if (vPass1 != vPass2) {
                    $("#lblCoincidenciaPass").text("La contraseñas no coinciden.");
                    $("#txtContrasena2").focus();
                    return;
                }

                var Data_RestablecerContrasenaUsuario = {
                    CodigoSolicitud: $("#hdfCodReestablecimiento").val(),
                    NuevaContrasena: vPass1,
                    ConfirmacionContrasena: vPass2,
                    PaginaLogin: fnObtenerPaginaLogin(),
                    IdDominio: $("#hdfIdDominio").val()
                };
                $.ajax({
                    type: "POST",
                    url: "RestablecerContrasena.aspx/RestablecerContrasenaUsuario",
                    data: JSON.stringify(Data_RestablecerContrasenaUsuario),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (result.d == '-2') {
                            $("#lblCoincidenciaPass").text("La contraseñas no coinciden.");
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

            $("#spCerrar").click(function () {
                $("#dvMensajeAlerta").hide();
            });

            localStorage.setItem("SimbNoPermitidos", $("#hdfSimbNoPermitidosClaveUsu").val());


            $("input[type=password]").each(function () {
                AgregarMensajeValidacionContrasenia(this, true, 2, 1);
            })

        });

        function fnMensajeAlerta(Mensaje, TipoAlerta) {
            $("#dvMensajeAlerta").show();
            $("#lblMenajeAlerta").text(Mensaje);

        }

        function fnObtenerPaginaLogin() {
            var Host = window.location.host;
            var Protocol = window.location.protocol;
            var PagLogin = "Login.aspx";
            return Protocol + '/' + Host + '/' + PagLogin;
        }

        function passwordStrength(pass) {
            var colors = [];
            colors[0] = "#cccccc";
            colors[1] = "#ff5f5f";
            colors[2] = "#ff9f4b";
            colors[3] = "#dca85c";
            colors[4] = "#399800"; //"#4dcd00";
            colors[5] = "#1527b7"; //"#5665B0"; //"#399800";

            var fortaleza = [];
            fortaleza[0] = ""; //"Inválida";
            fortaleza[1] = "Muy Débil";
            fortaleza[2] = "Débil";
            fortaleza[3] = "Media";
            fortaleza[4] = "Buena";
            fortaleza[5] = "Óptima";

            var password = pass;
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
                    score++;
                }
                if (password.length > 12) { //longitud mayor a 12 caracteres
                    score++;
                }
            }
            //return score;
            $("#PassFortaleza").css("background-color", colors[score]);
            $("#lblFortalezaPass").css("color", colors[score]);
            $("#lblFortalezaPass").text(fortaleza[score]);

            $("#PassFortaleza").css("width", (parseInt(score, 0) * 20).toString() + "%");
        }

        function generatePWD() {
            var maxAlpha = 26;
            var strSymbols = "~!@#$%^&*(){}?><`=-|][";
            var password = '';
            for (i = 0; i < 3; i++) {
                password += String.fromCharCode("a".charCodeAt(0) + getRand(maxAlpha));
            }
            for (i = 0; i < 3; i++) {
                password += String.fromCharCode("A".charCodeAt(0) + getRand(maxAlpha));
            }
            for (i = 0; i < 3; i++) {
                password += String.fromCharCode("0".charCodeAt(0) + getRand(10));
            }
            for (i = 0; i < 4; i++) {
                password += strSymbols.charAt(getRand(strSymbols.length));
            }

            password = shuffleString(password);
            password = shuffleString(password);
            password = shuffleString(password);

            return password;
        }

    </script>
</head>

<style type="text/css">
    .popup-overlay {
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        background-color: #777777;
        cursor: pointer;
        opacity: 0.1;
    }

    #dvReestablecimiento, #dvExito, #dvCaducado, #dvErrorSolicitud {
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 200;
    }

    .content-dvReestablecimiento {
        margin: 0px auto;
        margin-top: 120px;
        position: relative;
        padding: 10px;
        width: 380px;
        min-height: 200px;
        border-radius: 4px;
        background-color: #FFFFFF;
        box-shadow: 0 2px 5px #666666;
    }

        .content-dvReestablecimiento h2 {
            color: #48484B;
            border-bottom: 1px solid #48484B;
            margin-top: 0;
            padding-bottom: 4px;
        }

    .info-fortaleza {
        margin: 0px auto;
        margin-top: 110px;
        position: relative;
        padding: 10px;
        background-color: #FFFFFF;
        z-index: 300;
        width: 380px;
        height: 300px;
        border-radius: 4px;
        box-shadow: 0 2px 5px #666666;
    }

    .info-fortaleza-titulo {
        /*background-color:#8FBBE8;*/
        background-color: #0274B5;
        border-radius: 4px;
        padding: 5px;
        font-size: 16px;
        font-weight: bold;
        color: White;
    }

    .info-fortaleza-detalle {
        padding-top: 1px;
    }

        .info-fortaleza-detalle li {
            font-size: 13px;
            font-style: normal;
            font-weight: bold;
            color: #4F4F81;
            padding-bottom: 8px;
        }

    .info-fortaleza-cerrar {
        position: absolute;
        top: 12px;
        right: 12px;
        cursor: hand;
        cursor: pointer;
    }

    .content {
        margin: 0px auto;
        margin-top: 120px;
        padding: 10px;
        min-height: 200px;
        border-radius: 4px;
        background-color: #FFFFFF;
        box-shadow: 0 20px 10px #666666;
        width: 500px;
    }

    .content-title {
        margin-bottom: 10px;
        padding: 5px 0px 5px 0px;
        color: #FFF !important;
        background-color: #005C84;
        text-align: center;
    }

    .content-body {
        margin: auto;
        min-width: 300px;
        width: 400px;
        min-height: 100px;
        font-size: 1em;
    }

    .content-button {
        margin: auto;
        width: 150px;
        padding-top: 10px;
    }

    .ir-login {
        width: 150px;
    }

    .msgAlerta {
        position: relative;
        width: 666px;
        margin: auto;
        z-index: 400;
        background-color: #eca4a4;
        border: 2px solid #ec6c6c;
        padding: 10px;
        color: #940f0f;
        font-size: 17px;
        margin-top: 225px;
        border-radius: 5px;
    }
</style>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("/Common/Scripts/Utilitario.js")%>" type="text/javascript"></script> 

    <form id="form1" runat="server" autocomplete="off">
        <asp:HiddenField runat="server" ID="hdfCodReestablecimiento" />
        <asp:HiddenField runat="server" ID="hdfIdDominio" />
        <asp:HiddenField ID="hdfSimbNoPermitidosClaveUsu" runat="server" />
        <div id="dvReestablecimiento" runat="server">
            <div class="content">
                <div class="content-title">
                    <span style="font-size: 18px;">Restablecer Clave de Acceso
                    </span>
                </div>
                <div class="content-body">
                    <table cellpadding="1" cellspacing="5" width="100%" border="0">
                        <tr style="text-align: center;">
                            <td colspan="2">Ingresar su nueva contraseña
                            <asp:Image ID="imgInfoFortaleza" runat="server" Style="vertical-align: top; cursor: hand; cursor: pointer;" ImageUrl="Common/Images/Mantenimiento/info.png" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: right;">
                                <asp:TextBox ID="txtContrasena1" runat="server" TextMode="Password" Width="250px"></asp:TextBox>
                            </td>
                            <td style="text-align: left; width: 65px;">
                                <asp:Label ID="lblFortalezaPass" runat="server" Style="font-size: 14px; font-weight: bold;"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                        <tr style="text-align: center;">
                            <td colspan="2">Confirmar su nueva contraseña
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: right">
                                <asp:TextBox ID="txtContrasena2" runat="server" TextMode="Password" Width="250px"></asp:TextBox>
                            </td>
                            <td>
                                <asp:Image ID="imgCorreo" runat="server" Style="vertical-align: middle;" />
                            </td>
                        </tr>
                        <tr style="text-align: center;">
                            <td style="height: 18px;" colspan="2">
                                <asp:Label ID="lblCoincidenciaPass" runat="server" Style="color: #FF0000; font-size: small;"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div id="PassFortaleza" style="height: 5px; width: 0px;"></div>
                            </td>
                        </tr>

                    </table>
                </div>
                <div style="margin: auto; width: 250px; padding-top: 10px;">
                    <div id="btnEnviar" class="k-button" style="width: 250px;">
                        <a>Enviar</a>
                    </div>
                </div>
            </div>
        </div>
        <div id="dvCaducado" runat="server" style="display: none;">
            <div class="content">
                <div class="content-title">
                    <span style="font-size: 18px;">Solicitud Expirada
                    </span>
                </div>
                <div class="content-body">
                    <p>Su solicitud de cambio de contraseña a expirado</p>
                    <p>Las solicitud de cambio de contraseña solo estarán activas por un corto periodo de tiempo, asegurate de usarlas lo mas pronto posible.</p>
                </div>
                <div class="content-button">
                    <div class="k-button ir-login">
                        <a>Ir al Login</a>
                    </div>
                </div>
            </div>
        </div>
        <div id="dvExito" runat="server" style="display: none;">
            <div class="content">
                <div class="content-title">
                    <span style="font-size: 18px;">Contraseña Cambiada
                    </span>
                </div>
                <div class="content-body">
                    Su contraseña ha sido cambiada con éxito. Ahora puede loguearse con su nueva contraseña.
                </div>
                <div class="content-button">
                    <div class="k-button ir-login">
                        <a>Ir al Login</a>
                    </div>
                </div>
            </div>
        </div>
        <div id="dvErrorSolicitud" runat="server" style="display: none;">
            <div class="content">
                <div class="content-title">
                    <span style="font-size: 18px;">Acceso Inválido
                    </span>
                </div>
                <div class="content-body">
                    <p>No podemos procesar su solicitud.</p>
                    <p>Asegúrese de haber copiado correctamente la URL.</p>
                </div>
                <div class="content-button">
                    <div class="k-button ir-login">
                        <a>Ir al Login</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="popup-overlay" style="display: none;"></div>
        <div id="dvFortalezaContraseña" class="info-fortaleza" style="display: none;">
            <div class="info-fortaleza-titulo">
                Fortaleza de la contraseña
            <img class="info-fortaleza-cerrar" src="Common/Images/Chat/cerrar.png" />
            </div>
            <div class="info-fortaleza-detalle">
                <ul>
                    <li>La contraseña debe tener como mínimo 6 caracteres.
                    </li>
                    <li>La fortaleza de la contraseña se mide en los siguientes niveles: 
                    <span style="color: #ff5f5f;">"Muy Débil"</span>,&nbsp;
                    <span style="color: #ff9f4b;">"Débil"</span>,&nbsp;
                    <span style="color: #dca85c;">"Media"</span>,&nbsp;
                    <span style="color: #399800;">"Buena"</span>&nbsp;y&nbsp;
                    <span style="color: #1527b7;">"Óptima"</span>
                    </li>
                    <li>Las contraseñas distinguen las mayúsculas y minúsculas, y pueden contener números y símbolos.
                    </li>
                    <li>Por cada punto que considere al ingresar su contraseña, esta se hará mas fuerte.
                    </li>
                    <li>Una contraseña <span style="color: #1527b7;">"Óptima"</span> contiene al menos una mayúscula, una minúscula, un número, un símbolo y tiene mas de 12 caracteres.
                    </li>
                </ul>


            </div>
        </div>
        <div id="dvMensajeAlerta" style="display: none" class="msgAlerta">
            <span id="spIcon"></span>
            <span id="lblMenajeAlerta"></span>
            <span id="spCerrar" style="float: right; cursor: pointer; font-weight: bold;">X</span>
        </div>
    </form>
</body>

<%--
<style type="text/css">
    .popup-overlay {
	    left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
	    display:none;
	    background-color: #777777;
        cursor: pointer;
        opacity: 0.7;
    }
    
    #dvReestablecimiento,#dvExito,#dvCaducado,#dvErrorSolicitud {
	    left: 0;
        position: absolute;
        top: 0;
        width: 100%;
         z-index: 200;
    }
    
    .content-dvReestablecimiento {
	    margin:0px auto;
	    margin-top:120px;
	    position:relative;
	    padding:10px;
	    width:380px;
	    min-height:200px;
	    border-radius:4px;
	    background-color:#FFFFFF;
	    box-shadow: 0 2px 5px #666666;
    }
    
    .content-dvReestablecimiento h2 {
	    color:#48484B;
	    border-bottom: 1px solid #48484B;
        margin-top: 0;
        padding-bottom: 4px;
    }
    
    .info-fortaleza 
    {
        margin:0px auto;
        margin-top:110px;
	    position:relative;
	    padding:10px;
        background-color:#FFFFFF;
        z-index: 300;
        width:380px;
        height:300px;
        border-radius:4px;
        box-shadow: 0 2px 5px #666666;
    }
    
    .info-fortaleza-titulo
    {
        background-color:#0274B5;
        border-radius:4px;
        padding:5px;
        font-size: 16px;
        font-weight: bold;
        color:White;
    }
    
    .info-fortaleza-detalle
    {
        padding-top:1px;
    }
    
    .info-fortaleza-detalle li
    {
        font-size:13px;
        font-style:normal;
        font-weight:bold;
        color:#4F4F81;
        padding-bottom:8px;
    }
    
    .info-fortaleza-cerrar
    {
        position:absolute;
        top:12px;
        right:12px;
        cursor:hand;
        cursor:pointer;
    }
    .content-body
    {
        margin: auto;
        min-width: 300px;
        width: 400px;
        min-height: 100px;
        
    }
    .content-title
    {
	    margin-bottom: 10px;
	    padding: 5px 0px 5px 0px;
	    
	    color: #e8e8e8;
	    background-color: #808080;
    }
    .content-button
    {
        margin: auto;
        width: 150px;
        padding-top: 10px
    }
    
    .ir-login
    {
        width: 150px;
    }
</style>
<body>
    <form id="form1" runat="server" autocomplete="off">
    <asp:HiddenField runat="server" ID="hdfCodReestablecimiento" />
    <asp:HiddenField runat="server" ID="hdfIdDominio" />
    <div id="dvReestablecimiento" runat="server">
        <div class="content-dvReestablecimiento">
            <div><h2>Restablecer Contraseña</h2></div>            
            <table cellpadding="1" cellspacing="5" width="100%">
                <tr>
                    <td>
                        Ingresa tu nueva contraseña
                        <asp:Image ID="imgInfoFortaleza" runat="server" style="vertical-align:top; cursor:hand; cursor:pointer;" ImageUrl="Common/Images/Mantenimiento/info.png" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:TextBox ID="txtContrasena1" runat="server" TextMode="Password" Width="230px"></asp:TextBox>
                        <asp:Label ID="lblFortalezaPass" runat="server" style="font-size:14px; font-weight:bold;"></asp:Label>                        
                    </td>
                </tr>
                <tr><td></td></tr>
                <tr>
                    <td>
                        Ingresa tu nueva contraseña una vez más
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:TextBox ID="txtContrasena2" runat="server" TextMode="Password" Width="230px"></asp:TextBox>
                        <asp:Image ID="imgCorreo" runat="server" style="vertical-align:middle;"/>
                    </td>
                </tr>
                <tr>
                    <td style="height:18px;">
                        <asp:Label ID="lblCoincidenciaPass" runat="server" style="color: #CF2C2C;font-size: small;"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div id="PassFortaleza" style="height:10px;"></div>
                    </td>
                </tr>
                <tr><td></td></tr>
                <tr>
                    <td colspan="2" align="center">
                        <div id="btnEnviar" class="btnNormal k-button">
                              <a>Restablecer Contraseña</a>
                          </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div id="dvCaducado" runat="server" style="display:none;">
        <div class="content-dvReestablecimiento">
            <div>
                <h2>Solicitud Expirada</h2>
            </div>
            <div>
                Su solicitud de cambio de contraseña a expirado, las solicitud de cambio de contraseña solo estarán activas por un corto periodo de tiempo, asegurate de usarlas lo mas pronto posible.
            </div>
            <div style="padding-top:16px; float:right;">
                <div class="btnNormal k-button ir-login">
                    <a>Ir al Login</a>
                </div>
            </div>
        </div>
    </div>
    <div id="dvExito" runat="server" style="display:none;">
        <div class="content">
            <div class="content-title">
                <h2 style="text-align: center; margin: auto;">
                    Contraseña Cambiada
                </h2>
            </div>
            <div class="content-body">
                Su contraseña ha sido cambiada con éxito. Ahora puede loguearse con su nueva contraseña.
            </div>
            <div class="content-button">
                <div class="k-button ir-login">
                    <a>Ir al Login</a>
                </div>
            </div>
        </div>        
    </div>
    <div id="dvErrorSolicitud" runat="server" style="display:none;">
        <div class="content-dvReestablecimiento">
            <div>
                <h2>Acceso Inválido</h2>
            </div>
            <div>
                No podemos procesar su solicitud.
            </div>
            <div style="padding-top:16px; float:right;">
                <div class="btnNormal k-button ir-login">
                    <a>Ir al Login</a>
                </div>
            </div>
        </div>
    </div>
    <div class="popup-overlay" style="display: none;"></div>
    <div id="dvFortalezaContraseña" class="info-fortaleza" style="display: none;">
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
        
    </div>

    </form>
</body>
--%>
</html>
