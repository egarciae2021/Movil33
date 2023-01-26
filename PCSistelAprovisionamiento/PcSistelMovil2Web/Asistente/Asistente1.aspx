<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Asistente1.aspx.cs" Inherits="PcSistelMovil2Web.Asistente1" %>

<%@ Import Namespace="Web.GeneralMantenimiento" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

    <style type="text/css">
   
    </style>
    <link href="../Styles/Sitio.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/Principal2.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>

    <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>

    <link href="../Common/Styles/JqueryThemeRoller/redmond/jquery-ui-1.8.16.custom.css"
        rel="stylesheet" type="text/css" />

    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>

</head>
<body>
    <form id="form1" runat="server">
        <div id="dvMsgAlertaExterna" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <div id="dvContenidoAlertaExterna">
            </div>
        </div>
        <div>
            <div id="MenuInstalacion2" style="margin-left: 10px; margin-right: auto; margin-top: 10px; margin-right: 10px; margin-bottom: auto; width: auto;">
                <div class="Contenidomenu">
                    <table class="tblasistente">
                        <tr>
                            <td colspan="3">
                                <label style="color: #084B8A">
                                    Datos de la Empresa</label>
                            </td>
                        </tr>
                        <tr>
                            <td width="110px;">
                                <asp:Label ID="Label13" runat="server" Text="Nombre :"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="nombreempresa" runat="server" CssClass="" ReadOnly="true"></asp:TextBox>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="Label1" runat="server" Text="Razón Social :"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="idRazon" runat="server" CssClass="" ReadOnly="true"></asp:TextBox>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="Label4" runat="server" Text="RUC :"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtruc" runat="server" CssClass="" ReadOnly="true"></asp:TextBox>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="Label2" runat="server" Text="País :"></asp:Label>
                            </td>
                            <td>
                                <asp:DropDownList ID="Pais" runat="server">
                                </asp:DropDownList>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td valign="top">
                                <div id="idlogo" style="margin-top: 20px;">
                                    <asp:Label ID="Label3" runat="server" Text="Logo :"></asp:Label></div>

                            </td>
                            <td valign="middle">
                                <iframe id="ifCargaIcono" frameborder="0" style="padding: 0px; margin: 0px; border: 0px solid #a6c9e2;" width="650px" height="120px;"></iframe>
                            </td>
                            <td></td>
                        </tr>
                    </table>
                    <br />

                    <div id="btnsiguiente" class="btnNormal"><a>Siguiente</a>
                        <img src="../Common/images/Mantenimiento/flecha_despues.png" /></div>
                    <div id="btcancelar" class="btnNormal"><a>Cancelar</a>
                        <img src="../Common/images/Mantenimiento/btnCancel.png" /></div>
                </div>
            </div>
        </div>
        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Asistente1.js") %>" type="text/javascript"></script>
    </form>
</body>
</html>
