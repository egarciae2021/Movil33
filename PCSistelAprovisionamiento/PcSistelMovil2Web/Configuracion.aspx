<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Configuracion.aspx.cs" Inherits="PcSistelMovil2Web.Configuracion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
   
    <title>Gestión Móviles</title>
   
    <script src="Scripts/json2.js" type="text/javascript"></script>
    <link href="Styles/Login.css" rel="stylesheet" type="text/css" />
    <link href="Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="Styles/KendoUI/kendo.silver.min.css" rel="stylesheet" type="text/css" />
    <script src="Scripts/jquery-1.7.2.js" type="text/javascript"></script>    
    <script src="Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script type="text/javascript">
        var txtUser = "Tu Usuario..."
        //var txtPass = "Tu Contraseña..."
        var dialog;
        $(function () {

            //Dimensionar();
            Inicio();

            function Inicio() {
                if ($("input[name=AutenticacionRbtn]:checked").val() == 'rbtnSeguridadIntegrada') {
                    $("#dvPanelConfiguracion").css("height", "285px");
                }
            }

            //            $(window).resize(function () {
            //                Dimensionar();
            //            });

            //            function Dimensionar() {
            //                var Ancho = $(window).width();
            //                var Alto = $(window).height();
            //                $("#tbConenido").css({ width: Ancho - 24, height: Alto - 24 });
            //            }

            $("#dvConfiguracion").click(function () {
                window.location.href = "login.aspx";
            });

            $("#rbtnSeguridadIntegrada").change(function () {
                $("#trUsuario").hide();
                $("#trContraseña").hide();
                $("#dvPanelConfiguracion").css("height", "285px");
            });

            $("#rbtnUsarioContraseña").change(function () {
                $("#trUsuario").show();
                $("#trContraseña").show();
                $("#dvPanelConfiguracion").css("height", "340px");
            });

            function ProbarConexion(Autenticacion, Servidor, Usuario, Password, BaseDatos) {
                $.ajax({
                    type: "POST",
                    url: "Configuracion.aspx/ComprobarConexion",
                    data: "{'Servidor': '" + Servidor + "'," +
                           "'Autenticacion': '" + Autenticacion + "'," +
                           "'Usuario': '" + Usuario + "'," +
                           "'Password': '" + Password + "'," +
                           "'BaseDatos': '" + BaseDatos + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (result.d != "") {
                            alert("Error en la prueba de conexión, verifique los parámetros y la conexión con el servidor");
                        }
                        else {
                            alert("La prueba de conexión fue satisfactoria.");
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });

            }

            $("#btnProbarConexion").click(function () {
                var Autenticacion;

                if ($("input[name=AutenticacionRbtn]:checked").val() == 'rbtnSeguridadIntegrada') {
                    Autenticacion = "SI";
                }
                else {
                    Autenticacion = "UP";
                }

                ProbarConexion(Autenticacion, $("#txtServidor").val().replace('\\', '\\\\'), $("#txtUsuario").val().replace('\\', '\\\\'),
                               $("#txtContraseña").val().replace('\\', '\\\\'), $("#txtBaseDatos").val().replace('\\', '\\\\'));
            });

            $("#tbConenido").show();

            $("#btnGuardar").click(function () {
                var Autenticacion;
                var AutenticacionUsuario;

                if ($("input[name=AutenticacionRbtn]:checked").val() == 'rbtnSeguridadIntegrada') {
                    Autenticacion = "SI";
                }
                else {
                    Autenticacion = "UP";
                }

                $.ajax({
                    type: "POST",
                    url: "Configuracion.aspx/GuardarConfiguracionBase",
                    data: "{'Servidor': '" + $("#txtServidor").val().replace('\\', '\\\\') + "'," +
                           "'Autenticacion': '" + Autenticacion + "'," +
                           "'Usuario': '" + $("#txtUsuario").val().replace('\\', '\\\\') + "'," +
                           "'Password': '" + $("#txtContraseña").val().replace('\\', '\\\\') + "'," +
                           "'BD': '" + $("#txtBaseDatos").val().replace('\\', '\\\\') + "'," +
                           "'AutenticacionUsuario': '" + $("input[name=rblstAutenticacion]:checked").val() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (result.d != "") {
                            alert("Error al intentar guardar la configuración");
                        }
                        else {
                            alert("Configuración guardada.");
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            });

        });

        function btnProbarConexion_onclick() {

        }

    </script>
</head>
<body>
    <form id="form1" runat="server">
    <table id="tbConenido" style="margin:0px; padding:0px; width:100%; height:100%;">
            <tr style="height:10px;">
                <td style="vertical-align:top;text-align:right;">
                    <div id="dvConfiguracion" runat="server" class="btnNormal k-button" style="vertical-align:middle;">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <%--<img src="Images/Login/Seguridad.png" />--%>
                                </td>
                                <td style="padding-left:2px;">
                                    <asp:Label ID="lblConfiguracion" runat="server" Text="Ir al sistema"></asp:Label>
                                </td>
                            </tr>
                        </table>                  
                    </div>
                </td>
            </tr>
            <tr>
                <td align="center">                  
                    <div id="dvPanelConfiguracion" class="k-block" style="width:400px; height:380px;">
                        <div id="dvTitulo" class="k-header k-inset" style=" text-align: center;">
                            <table border="0" width="100%" style="height:100%;" cellpadding ="0" cellspacing="0">
                                <tr>
                                    <td align="right" width="40%" style="vertical-align: middle;">
                                        <img src="Common/images/Login/Configuracion.png" />
                                    </td>
                                    <td align="left" style="vertical-align: middle; padding-left:3px;">
                                        <asp:Label ID="lblTitulo" runat="server" Text="Configuración" CssClass="lblTitulo"></asp:Label>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <table cellpadding="0" style="width:380px; text-align: left;">
                            <tr>
                                <td style="padding-left:15px; padding-top:15px; width:100px;">
                                    <asp:Label ID="Label7" runat="server" Text="Autenticación" CssClass="lblEtiqueta" Font-Bold="true" Font-Italic="true"></asp:Label>
                                </td>
                                <td style="padding-top:15px;">
                                    <asp:RadioButtonList ID="rblstAutenticacion" runat="server" RepeatDirection="Horizontal" AutoPostBack="false">
                                        <asp:ListItem Selected="True" Value="0">Formulario</asp:ListItem>
                                        <asp:ListItem Value="1">Windows</asp:ListItem>
                                        <asp:ListItem Value="2">Active Directory</asp:ListItem>
                                    </asp:RadioButtonList>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-left:15px; padding-top:15px;" colspan="2">
                                    <asp:Label ID="Label6" runat="server" Text="Conexión A la base de datos" CssClass="lblEtiqueta" Font-Bold="true" Font-Italic="true"></asp:Label>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-left:15px; padding-top:15px; width:100px;">
                                    <asp:Label ID="Label1" runat="server" Text="Servidor" CssClass="lblEtiqueta"></asp:Label>
                                </td>
                                <td style="padding-top:15px;">
                                    <asp:TextBox ID="txtServidor" runat="server" CssClass="k-textbox txtCampo" Width="180px"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="padding-left:15px;">
                                    <asp:RadioButton ID="rbtnSeguridadIntegrada" runat="server" Text="Usar seguridad integrada de windows" GroupName="AutenticacionRbtn" AutoPostBack="false"/>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="padding-left:15px;">
                                    <asp:RadioButton ID="rbtnUsarioContraseña" runat="server" Text="Usar Usuario y Contraseña" GroupName="AutenticacionRbtn" Checked="true" AutoPostBack="false"/>
                                </td>
                            </tr>
                            <tr id="trUsuario" runat="server">
                                <td style="padding-left:15px; width:100px;">
                                    <asp:Label ID="Label4" runat="server" Text="Usuario" CssClass="lblEtiqueta"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtUsuario" runat="server" CssClass="k-textbox txtCampo"></asp:TextBox>
                                </td>
                            </tr>
                            <tr id="trContraseña" runat="server">
                                <td style="padding-left:15px; width:100px;">
                                    <asp:Label ID="Label5" runat="server" Text="Contraseña" CssClass="lblEtiqueta"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtContraseña" runat="server" CssClass="k-textbox txtCampo" TextMode="Password"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-left:15px; width:100px;">
                                    <asp:Label ID="Label2" runat="server" Text="Base de datos" CssClass="lblEtiqueta"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtBaseDatos" runat="server" CssClass="k-textbox txtCampo"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" align="center">
                                    <table width="380px">
                                        <tr>
                                            <td align="left" style="width:50%;">
                                                <input id="btnProbarConexion" type="button" value="Probar Conexión" class="k-button" onclick="return btnProbarConexion_onclick()" />
                                            </td>
                                            <td align="right" style="width:50%;">
                                                <input id="btnGuardar" type="button" value="Guardar" class="k-button"/>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="height: 20px"></td>
                            </tr>
                            
                        </table>
                    </div>      
                </td>
            </tr>
        </table>
    </form>
</body>
</html>
