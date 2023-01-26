<%@ Page Language="VB" AutoEventWireup="false" CodeBehind="LoginAuthDoble.aspx.vb" Inherits=".LoginAuthDoble" %>

<%--<%@ Page Language="VB" AutoEventWireup="false" Inherits="Login" EnableEventValidation="false" CodeBehind="Login.aspx.vb" %>--%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="es">
<head id="Head1" runat="server">

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Login | Gestion Móvil - Web Admin </title>

    <link rel="shortcut icon" href="Content/img/favicon.png" type="image/x-icon">
    <link href="Content/css/shared/fonts.css" rel="stylesheet" type="text/css" />
    <link href="Content/css/shared/bootstrap.min.css" rel="stylesheet" />
    <link href="Content/css/shared/nifty.min.css" rel="stylesheet" />
    <link href="Content/css/shared/nifty-demo-icons.min.css" rel="stylesheet" />
    <link href="Content/css/shared/pace.min.css" rel="stylesheet" />
    <script type="text/javascript" src="Content/js/shared/pace.min.js"></script>
    <link href="Content/css/shared/nifty-demo.min.css" rel="stylesheet" />
    <link href="Content/css/layout/generalLogin.css" rel="stylesheet" />

    <script src="Content/js/shared/aes.js"></script>


    <link href="Common/Styles/Login.css" rel="stylesheet" type="text/css" />
    <link href="Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="Common/Styles/KendoUI/kendo.silver.min.css" rel="stylesheet" type="text/css" />
    <%--<link href="Common/Styles/watermarkify.css" rel="stylesheet" type="text/css" />--%>
    <%--<link href="Common/Styles/style_slide.css" rel="stylesheet" type="text/css" />--%>
</head>
<script src="Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>

<%--<script src="Content/js/shared/jquery-1.11.3.js"></script>--%>

<script src="Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
<script src="Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js" type="text/javascript"></script>
<![if gte IE 9]>
<script src="Common/Scripts/jquery.corner.js" type="text/javascript"></script>
<![endif]>
<script src="Common/Scripts/prettify.js" type="text/javascript"></script>
<script src="Common/Scripts/screen.js" type="text/javascript"></script>
<script src="Common/Scripts/md5.js" type="text/javascript"></script>
<script src="Common/Scripts/jcap.js" type="text/javascript"></script>
<script src="Common/Scripts/Utilitario.js" type="text/javascript"></script>

<script src="LoginAuthDoble.js" type="text/javascript"></script>
<style type="text/css">
    .txtEmail {
        color: #999;
        font-weight: normal;
        font-style: italic;
        border-radius: 4px;
        width: 172px;
    }

    #dvRecordarContrasena {
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 999999;
    }

    #dvConfirmacionEnvio {
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 999999;
    }

    .content-dvRecordarContrasena {
        margin: 0px auto;
        margin-top: 50px;
        position: relative;
        padding: 10px;
        width: 380px;
        min-height: 200px;
        border-radius: 4px; /*background-color:#FFFFFF;*/
        box-shadow: 0 2px 5px #666666;
        background-color: #328BB1;
        border-width: 0px 0px 6px 0px;
        border-style: solid;
        border-color: #326D86;
    }

    .content-dvRecConTituluo {
        background: #326D86;
        margin: -10px -10px 0px -10px;
        text-align: center;
    }

    .content-dvRecordarContrasena h2 {
        /*color:#48484B;*/
        color: #FFFFFF; /*border-bottom: 1px solid #48484B;*/
        margin-top: 0; /*padding-bottom: 4px;*/
        padding: 15px;
        font-size: 16px;
    }

    .popup-overlay {
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 99999;
        display: none;
        background-color: #777777;
        cursor: pointer;
        opacity: 0.7;
    }

    #alertaSumary ul {
        list-style: none;
        margin: 0px;
        padding: 2px;
    }

    #dvRecordarContrasena {
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 99;
    }

    #dvConfirmacionEnvio {
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 99;
    }

    .content-dvRecordarContrasena {
        margin: 0px auto;
        margin-top: 50px;
        position: relative;
        padding: 10px;
        width: 380px;
        min-height: 200px;
        border-radius: 4px;
        background-color: #FFFFFF;
        box-shadow: 0 2px 5px #666666;
    }

    .content-dvRecordarTitulo {
        background: #005C84 /*#063466*/; /*telefonica*/
        margin: -10px -10px 0px -10px;
        padding-top: 10px;
        border-radius: 4px 4px 0px 0px;
    }

    .content-dvRecordarContrasena h2 {
        color: white;
        /*border-bottom: 1px solid #063466;*/
        margin-top: 0;
        /*padding-bottom: 4px;*/
        padding: 14px;
        font-size: large;
    }

    .popup-overlay {
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 89;
        display: none;
        background-color: #777777;
        cursor: pointer;
        opacity: 0.7;
    }

    .RevisaCorreo{
         font-weight: bold;
    }

    .inputs{
        color: #005C84 !important;
        background-color:#fff !important;
        border:none !important;
        border-bottom:1px solid #005C84 !important;
        text-align: center;

        width: 70% !important;
        margin: auto;
        display: block;
    }

    .two-fields {
      /*width:100%;
      text-align: center;*/
        margin-left: 10px;
        margin-right: 10px;
    }
    /*
    .two-fields .input-group {
      width:100%;
    }
    .two-fields input {
      width:80% !important;
      margin: 5px;
    }*/

    .inputCodigo{
        text-align: center !important;        
    }

    .Class_pfactor{
        text-align: left !important;
    }

    .Class_pfactor2{
        text-align: left !important;
        font-size: 14px;
    }
</style>

<body class="pace-done">

    <div id="miCanvas" style="position: fixed; width: 100%; height: 100%; top: 0px; left: 0px; background: white;"></div>
    <form id="form1" runat="server" method="post" autocomplete="off">
        <asp:HiddenField ID="hdfNocerrarSesion" runat="server" />
        <asp:HiddenField ID="hdfCaptcha" runat="server" />
        <asp:HiddenField ID="hdfNomDominio" runat="server" />
        <asp:HiddenField ID="hdfNomIp" runat="server" />
        <asp:HiddenField ID="hdfNomPc" runat="server" />
        <asp:HiddenField ID="hdfNomBrowser" runat="server" />
        <asp:HiddenField ID="hdfUsaDatosConfig" runat="server" />
        <asp:HiddenField ID="hdfVerLinkWeb" runat="server" />
        <asp:HiddenField ID="hdfVerLinkDoc" runat="server" />
        <asp:HiddenField ID="hdfVerLinkManual" runat="server" />
        <asp:HiddenField ID="hdfTextoLinkWeb" runat="server" />
        <asp:HiddenField ID="hdfTextoLinkDoc" runat="server" />
        <asp:HiddenField ID="hdfTextoLinkManual" runat="server" />
        <asp:HiddenField ID="hdfUrlLinkWeb" runat="server" />
        <asp:HiddenField ID="hdfNameDocumentoNormas" runat="server" />
        <asp:HiddenField ID="hdfNameManual" runat="server" />
        <asp:HiddenField ID="hdfVerCarrusel" runat="server" />
        <asp:HiddenField ID="hdfEsCloud" runat="server" />

        <asp:HiddenField ID="hdUser" runat="server" />
        <asp:HiddenField ID="hdkstorage" runat="server" />
        <asp:HiddenField ID="hdkstorage_cli" runat="server" />

        <asp:HiddenField ID="hdTipoDispositivo" runat="server" />
        <asp:HiddenField ID="hTiempoConteo" runat="server" />
        <asp:HiddenField ID="hEscena" runat="server" />
        <asp:HiddenField ID="Expiro" runat="server" />

        <asp:HiddenField ID="lblMensaje" runat="server" />
        
        <asp:HiddenField ID="hdFecLocal" runat="server" />
        <asp:HiddenField ID="hdFecKey" runat="server" />

        <asp:HiddenField ID="hPresionarReenviado" runat="server" />
        <asp:HiddenField ID="hchkRecordar" runat="server" />
        <asp:HiddenField ID="hMensaje" runat="server" />
        <asp:HiddenField ID="hLimpiarStorage" runat="server" />


        <div class="pace  pace-inactive">
            <div class="pace-progress" data-progress-text="100%" data-progress="99" style="width: 100%;">
                <div class="pace-progress-inner"></div>
            </div>
            <div class="pace-activity"></div>
        </div>
        <div id="container" class="cls-container">

            <!-- BACKGROUND IMAGE -->
            <!--===================================================-->
            <div id="bg-overlay" class="bg-img" style="background-image: url(&quot;Content/img/FondoLogin.png&quot; );"></div>


            <!-- LOGIN FORM -->
            <!--===================================================-->
            <div id="dvContenido" class="cls-content" style="display: none;">
                <div class="cls-content-sm panel">
                    <div class="" style="">
                        <img src="Content/img/Logo_PMS.png" style="width: 200px; margin-top: 15px;" />


                        <%--<div id="dvConfiguracion" runat="server" class="btnNormal k-button"
                            style="font-size: 11px; text-decoration: underline; color: Navy; vertical-align: middle; position: absolute; right: 10px; top: 10px; z-index: 10000;">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-left: 2px;">
                                        <img src="Common/Images/Accesos/configuracion.png" alt="" />
                                    </td>
                                </tr>
                            </table>
                        </div>--%>

                        <hr />
                    </div>
                    <div class="panel-body" style="margin-top: -20px;">
                        <div class="mar-ver pad-btm" style="margin-bottom:0px;">
                            <%--<h1 class="h4" id="hNombreProducto" runat="server">Verificación de Doble Factor</h1>--%>
                            <p class="Class_pfactor2">Alguien intentó acceder a tu cuenta. Confirma que fuiste tú</p>
                            <%--<h1 class="h5" id="hUser" runat="server">Verificación de Doble Factor</h1>--%>
                            <br />
                            
                            <p class="Class_pfactor" runat="server">Revisa tu correo&nbsp;
                            <label id="pRevisaCorreo" class="RevisaCorreo" runat="server"></label>

                            <%--<p>Para confirmar el inicio de sesión, ingrese el código de verificación enviado a su correo</p>--%>
                            &nbsp;e ingresa el código de verificación que hemos enviado</p>
                        </div>
                        <form action="index.html">
                            <div class="form-group two-fields">
                                <div class="inputCodigo">
                                    <asp:TextBox ID="txtCod1" runat="server" Text="" MaxLength="6" placeholder="Digita el código enviado" CssClass="form-control inputs"></asp:TextBox>
                                    <%--<asp:TextBox ID="txtCod2" runat="server" Text="" MaxLength="1" placeholder="X" CssClass="form-control inputs"></asp:TextBox>
                                    <asp:TextBox ID="txtCod3" runat="server" Text="" MaxLength="1" placeholder="X" CssClass="form-control inputs"></asp:TextBox>
                                    <asp:TextBox ID="txtCod4" runat="server" Text="" MaxLength="1" placeholder="X" CssClass="form-control inputs"></asp:TextBox>
                                    <asp:TextBox ID="txtCod5" runat="server" Text="" MaxLength="1" placeholder="X" CssClass="form-control inputs"></asp:TextBox>
                                    <asp:TextBox ID="txtCod6" runat="server" Text="" MaxLength="1" placeholder="X" CssClass="form-control inputs"></asp:TextBox>--%>
                                </div>
                                
                            </div>
                            <%--<div class="form-group">
                                <asp:TextBox ID="txtPassword" runat="server" CssClass="form-control" MaxLength="50" placeholder="Contraseña" TextMode="Password"></asp:TextBox>
                            </div>--%>

                            <%--<div id="filaCaptcha" style="display: none;" class="form-group">
                                <script type="text/javascript">
                                    $(function () {
                                        if ($("#hdfCaptcha").val() == "1") {
                                            sjcap();
                                        }
                                    });
                                </script>

                            </div>--%>

                                
                                <p id="pExpiroConteo" style="color: #FF0000;">El tiempo ha caducado</p>
                                <div id="dvConteo">
                                    <label>Este código expira en &nbsp;</label><label id="pMinutosConteo"></label><label>:</label><label id="pSegundosConteo"></label><label>&nbsp;minutos</label>
                                </div>

                            <div class="checkbox pad-btm text-left">
                                <input id="chkRecordar" class="magic-checkbox" type="checkbox">
                                <label id="lblRecordar" for="chkRecordar">No volver a preguntar en este dispositivo</label>
                            </div>
                            <label id="lblMensajesLic" runat="server"></label>
                            <%--<button id="btnIngresar" class="btn btn-primary btn-lg btn-block" type="submit" runat="server">Enviar</button>--%>
                            <button id="btnIngresar" class="btn btn-primary btn-lg btn-block" type="submit" runat="server">Enviar</button>
                            <button id="btnReenviar" class="btn btn-primary btn-lg btn-block" type="submit" runat="server">Reenviar Código</button>

                            <%--<div class="form-group">
                                <div class="form-group ManualSistema btnNormal" style="position: absolute; z-index: 999999999; right: 20px; margin-top: 3px;">
                                    <label id="LblGuiaUsuario" style="color: black; text-decoration: underline; font-size: 12px; cursor: pointer!important;">
                                        Gu&iacute;a de ingreso</label>
                                </div>
                            </div>--%>
                        </form>
                    </div>


                   <%-- <div class="pad-all">
                        <asp:Label runat="server" Text="¿Olvidó su contraseña?" ID="LblOlvidoContrasena" Style="cursor: pointer;"></asp:Label>
                    </div>--%>


                    <div class="pad-all" style="text-align: center;">
                        <span id="lblProductoRelease" class="mar-rgt"><asp:Literal runat="server" ID="litProductoRelease"></asp:Literal> </span>
                    </div>

                </div>
            </div>


        </div>



        <div id="dvRecordarContrasena" style="display: none;">
            <div class="content-dvRecordarContrasena">
                <div class="content-dvRecConTituluo">
                    <h2>Cambia tu contraseña</h2>
                </div>
                <div style="color: #515967; padding: 0px 0px 8px 15px;">
                    Ingrese su correo electrónico
                </div>
                <div id="dvCampo" class="dvPanel" style="overflow: auto;">
                    <table style="width: 99%;">
                        <tr height="18px;">
                            <td>
                                <asp:TextBox ID="txtCorreo" runat="server" Width="300px" MaxLength="35"></asp:TextBox>
                                <asp:Image ID="imgCorreo" runat="server" Style="vertical-align: middle;" />
                            </td>
                        </tr>
                        <tr>
                            <td style="height: 18px;">
                                <div id="dvFormatInvalid" style="color: #EF9090; font-size: small; display: none;">
                                    El formato del correo no es válido.
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div style="margin-top: 2px;">
                    <table width="100%">
                        <tr>
                            <td align="center">
                                <%--<div id="" class="btnNormal k-button">
                                    <asp:Image ID="imgEnviar" runat="server" ImageUrl="Common/Images/Mantenimiento/Enviar.gif" />
                                    <a></a>
                                </div>--%>
                                <button id="btnCerrar" class="btn btn-default" type="submit">Cerrar</button>
                                <button id="btnEnviar" class="btn btn-primary" type="submit">Enviar</button>
                                <button id="btnRegKey" style="display: none" runat="server" onclick="funRegisterSessionKey()">Enviar</button>
                                <%--<asp:Button ID="btnRegKey" runat="server" OnClick="funRegisterSessionKey" Visible="False"/>--%>
                                <%--<div id="" class="btnNormal k-button">
                                    <asp:Image ID="imgCerrar" runat="server" ImageUrl="Common/Images/Mantenimiento/Salir.gif" />
                                    <a></a>
                                </div>--%>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div id="dvConfirmacionEnvio" style="display: none;">
            <div class="content-dvRecordarContrasena">
                <div class="content-dvRecConTituluo">
                    <h2>Revisa tu correo</h2>
                </div>
                <div style="padding-bottom: 40px; font-size: 15px;">
                    Hemos enviado un correo electrónico a
                    <label id="lblCorreoEnvio" style="color: #FF965A; font-weight: bold; font-size: 15px !important;">
                    </label>
                    . Haz clic en el enlace dentro del correo electrónico para restablecer tu contraseña.
                </div>
                <div style="margin-top: 8px;">
                    <table width="100%">
                        <tr>
                            <td align="right">
                                <%--<div id="" class="btnNormal k-button">
                                    <asp:Image ID="Image1" runat="server" ImageUrl="Common/Images/Mantenimiento/Salir.gif" />
                                    <a>Listo</a>
                                </div>--%>
                                <button id="btnVolverLogin" class="btn btn-primary btn-lg btn-block" type="button">Listo</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="popup-overlay" style="display: none;">
        </div>


    </form>
    <!--===================================================-->
    <!-- END OF CONTAINER -->
    <!--JAVASCRIPT-->
    <!--=================================================-->
    <!--jQuery [ REQUIRED ]-->
    <script src="Content/js/shared/jquery.min.js"></script>

    <!--BootstrapJS [ RECOMMENDED ]-->
    <script src="Content/js/shared/bootstrap.min.js"></script>

    <!--NiftyJS [ RECOMMENDED ]-->
    <script src="Content/js/shared/nifty.min.js"></script>


    <!--=================================================-->
    <!--Background Image [ DEMONSTRATION ]-->
    <script src="Content/js/shared/bg-images.js"></script>
    <script src="Content/js/shared/jquery.Storage.js"></script>


</body>


</html>
