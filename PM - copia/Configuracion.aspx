<%@ Page Language="VB" AutoEventWireup="false" Inherits="Configuracion" CodeBehind="Configuracion.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="shortcut icon" href="Common/Images/Login/favicon.png" type="image/ico" />
    <title>.:PCSISTEL MOVIL v3.3:.</title>
    <link href="Common/Styles/Login.css" rel="stylesheet" type="text/css" />
    <link href="Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="Common/Styles/KendoUI/kendo.silver.min.css" rel="stylesheet" type="text/css" />
    <script src="Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js" type="text/javascript"></script>
    <script src="Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <%--<link href="Common/Styles/Principal.css" rel="stylesheet" type="text/css" />--%>
    <link href="Common/Styles/JqueryThemeRoller/redmond/jquery-ui-1.8.16.custom.css"
        rel="stylesheet" type="text/css" />
    <script src="Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Configuracion.js" type="text/javascript"></script>
</head>
<style>
    body {
        background-color: #aabfdd;
        background-color: #F8F7F7;
        font-family: Tahoma;
    }

    form {
        width: 100%;
        height: 100%;
        margin: 0px;
        padding: 0px;
    }

    #dvTitulo {
        color: White;
        background-color: #5D7B9D;
        font-size: 0.9em;
        font-weight: bold;
        font-family: Tahoma;
        height: 40px;
    }

    #dvTituloLogin {
        color: White;
        font-size: 0.9em;
        font-weight: bold;
        font-family: Tahoma;
    }

    .lblTitulo {
        font-size: 12pt !important;
        font-weight: bolder !important;
    }

    #loginPrincipal_UserNameLabel {
        font-size: 8pt !important;
    }

    #loginPrincipal_UserName {
        font-size: 8pt !important;
    }

    #loginPrincipal_UserNameRequired {
        font-size: 8pt !important;
    }

    #loginPrincipal_PasswordLabel {
        font-size: 8pt !important;
    }

    #loginPrincipal_Password {
        font-size: 8pt !important;
    }

    #loginPrincipal_PasswordRequired {
        font-size: 8pt !important;
    }

    label {
        font-size: 8pt !important;
    }

    #loginPrincipal_FailureText {
        font-size: 8pt !important;
    }

    #loginPrincipal_LoginButton {
        font-size: 8pt !important;
    }

    .txtLoginVacio {
        color: #999 !important;
        font-weight: normal !important;
        font-style: italic !important;
    }

    .lblEtiqueta {
        font-size: 8pt !important;
        font-family: "Verdana";
        color: #333333;
    }

    .txtCampo {
        font-family: "Verdana";
        font-size: 9pt !important;
    }

    #txtBaseDatos {
        width: 180px !important;
    }
</style>
<body>
    <form id="form1" runat="server">
        <div id="Capa" class="trans">
            <p></p>
        </div>
        <div id="dvCargando" class="dvCargando"></div>
        <table id="tbConenido" style="margin: 0px; padding: 0px;">
            <tr style="height: 10px;">
                <td style="vertical-align: top; text-align: right;">
                    <div id="dvConfiguracion" runat="server" class="btnNormal k-button" style="vertical-align: middle;">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td></td>
                                <td style="padding-left: 2px;">
                                    <asp:Label ID="lblConfiguracion" runat="server" Text="Ir al sistema"></asp:Label>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <div id="dvPanelConfiguracion" class="k-block" style="width: 400px; height: 670px;">
                        <div id="dvTitulo" class="k-header k-inset" style="text-align: center;">
                            <table border="0" width="100%" style="height: 100%;" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="right" width="40%" style="vertical-align: middle;">
                                        <img alt="" src="Common/Images/Login/Configuracion.png" />
                                    </td>
                                    <td align="left" style="vertical-align: middle; padding-left: 3px;">
                                        <asp:Label ID="lblTitulo" runat="server" Text="Configuración" CssClass="lblTitulo"></asp:Label>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <table cellpadding="0" style="width: 400px; text-align: left;">
                            <tr>
                                <td style="padding-left: 15px; padding-top: 15px;">
                                    <asp:Label ID="Label7" runat="server" Text="Autenticación" CssClass="lblEtiqueta" Font-Bold="true" Font-Italic="true"></asp:Label>
                                </td>
                                <td style="padding-top: 15px;">
                                    <asp:RadioButtonList ID="rblstAutenticacion" runat="server" RepeatDirection="Horizontal">
                                        <asp:ListItem Selected="True" Value="0">Formulario</asp:ListItem>
                                        <asp:ListItem Value="1">Windows</asp:ListItem>
                                        <asp:ListItem Value="2">Active Directory</asp:ListItem>
                                    </asp:RadioButtonList>

                                    <div runat="server" id="divldap" style="font-family: Verdana; font-size: 11px;">
                                        <br />
                                        LDAP:
                                        <asp:TextBox ID="txtLDAP" runat="server" CssClass="k-textbox txtCampo" Width="200px"></asp:TextBox>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-left: 15px; padding-top: 15px;" colspan="2">
                                    <asp:Label ID="Label6" runat="server" Text="Conexión A la base de datos" CssClass="lblEtiqueta" Font-Bold="true" Font-Italic="true"></asp:Label>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-left: 15px; padding-top: 15px;">
                                    <asp:Label ID="Label1" runat="server" Text="Servidor" CssClass="lblEtiqueta"></asp:Label>
                                </td>
                                <td style="padding-top: 15px;">
                                    <asp:TextBox ID="txtServidor" runat="server" CssClass="k-textbox txtCampo" Width="180px"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="padding-left: 15px;">
                                    <asp:RadioButton ID="rbtnSeguridadIntegrada" runat="server" Text="Usar seguridad integrada de windows" GroupName="AutenticacionRbtn" />
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="padding-left: 15px;">
                                    <asp:RadioButton ID="rbtnUsarioContraseña" runat="server" Text="Usar Usuario y Contraseña" GroupName="AutenticacionRbtn" />
                                </td>
                            </tr>
                            <tr id="trUsuario" runat="server">
                                <td style="padding-left: 15px;">
                                    <asp:Label ID="Label4" runat="server" Text="Usuario" CssClass="lblEtiqueta"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtUsuario" runat="server" CssClass="k-textbox txtCampo"></asp:TextBox>
                                </td>
                            </tr>
                            <tr id="trContraseña" runat="server">
                                <td style="padding-left: 15px;">
                                    <asp:Label ID="Label5" runat="server" Text="Contraseña" CssClass="lblEtiqueta"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtContraseña" runat="server" CssClass="k-textbox txtCampo" TextMode="Password"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-left: 15px;">
                                    <asp:Label ID="Label2" runat="server" Text="Base de datos" CssClass="lblEtiqueta"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtBaseDatos" runat="server" CssClass="k-textbox txtCampo"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <table width="380px">
                                        <tr>
                                            <td style="width: 50%; text-align: center;">
                                                <input id="btnProbarConexion" type="button" value="Probar Conexión" class="k-button" />
                                            </td>
                                            <td style="width: 50%; text-align: center;">
                                                <input id="btnGuardar" type="button" value="Guardar" class="k-button" onclick="return btnGuardar_onclick()" />
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <table border="0" cellpadding="0" style="width: 400px; text-align: left;">
                            <tr>
                                <td style="padding-left: 15px; padding-top: 15px;" colspan="2">
                                    <asp:Label ID="Label3" runat="server" Text="Conexión A la base de datos - Datos" CssClass="lblEtiqueta" Font-Bold="true" Font-Italic="true"></asp:Label>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-left: 15px; padding-top: 15px;" colspan="2">
                                    <input id="btnCargarDatosBase" type="button" value="Cargar valores" class="k-button" />
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-left: 15px; padding-top: 15px;">
                                    <asp:Label ID="Label10" runat="server" Text="Servidor" CssClass="lblEtiqueta"></asp:Label>
                                </td>
                                <td style="padding-top: 15px;">
                                    <asp:TextBox ID="txtServidorDatos" runat="server" CssClass="k-textbox txtCampo" Width="180px"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="padding-left: 15px;">
                                    <asp:RadioButton ID="rbtnSeguridadIntegradaDatos" runat="server" Text="Usar seguridad integrada de windows" GroupName="AutenticacionDatosRbtn" />
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="padding-left: 15px;">
                                    <asp:RadioButton ID="rbtnUsarioContraseñaDatos" runat="server" Text="Usar Usuario y Contraseña" GroupName="AutenticacionDatosRbtn" />
                                </td>
                            </tr>
                            <tr id="trUsuarioDatos" runat="server">
                                <td style="padding-left: 15px;">
                                    <asp:Label ID="Label11" runat="server" Text="Usuario" CssClass="lblEtiqueta"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtUsuarioDatos" runat="server" CssClass="k-textbox txtCampo"></asp:TextBox>
                                </td>
                            </tr>
                            <tr id="trContraseñaDatos" runat="server">
                                <td style="padding-left: 15px;">
                                    <asp:Label ID="Label12" runat="server" Text="Contraseña" CssClass="lblEtiqueta"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtContraseñaDatos" runat="server" CssClass="k-textbox txtCampo" TextMode="Password"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-left: 15px;">
                                    <asp:Label ID="Label13" runat="server" Text="Base de datos" CssClass="lblEtiqueta"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtBaseDatosDatos" runat="server" CssClass="k-textbox txtCampo"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <table width="380px">
                                        <tr>
                                            <td style="width: 50%; text-align: center;">
                                                <input id="btnProbarConexionDatos" type="button" value="Probar Conexión" class="k-button" />
                                            </td>
                                            <td style="width: 50%; text-align: center;">
                                                <input id="btnGuardarDatos" type="button" value="Guardar" class="k-button" />
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
    </form>
</body>
</html>
