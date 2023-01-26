<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Configurar_Conf_NotificacionSolicitud" Codebehind="Conf_NotificacionSolicitud.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.tabs.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.button.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.position.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.mouse.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.draggable.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.resizable.js"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Conf_NotificacionSolicitud.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="dvCargando" class="dvCargando"></div>
        <div class="dvPanel">
            <table>
                <tr>
                    <td>Notificación:</td>
                    <td>
                        <asp:DropDownList ID="ddlNotificacion" runat="server" Width="300px"></asp:DropDownList>
                    </td>
                </tr>
            </table>
        </div>
        <br />
        <div id="dvDatos" class="dvPanel" style="display:none;">
            <div style="width:100%; text-align:Left;">
                <h2>Parametros de administrador</h2>
            </div>
            <table>
                <tr>
                    <td>Enviar notificación por solicitud creada: </td>
                    <td>
                        <asp:CheckBox ID="chkNotificacionAdministrador" runat="server" />
                    </td>
                </tr>
                <tr>
                    <td>Asunto de correo: </td>
                    <td>
                        <asp:TextBox ID="txtTituloAdministrador" runat="server" CssClass="txtNormal" Width="150px" MaxLength="60"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>Correo: </td>
                    <td>
                        <asp:TextBox ID="txtCorreoAdministrador1" runat="server" CssClass="txtNormal" Width="150px" MaxLength="30"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>Correo Alternativo 1: </td>
                    <td>
                        <asp:TextBox ID="txtCorreoAdministrador2" runat="server" CssClass="txtNormal" Width="150px" MaxLength="30"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>Correo Alternativo 2: </td>
                    <td>
                        <asp:TextBox ID="txtCorreoAdministrador3" runat="server" CssClass="txtNormal" Width="150px" MaxLength="30"></asp:TextBox>
                    </td>
                </tr>
            </table>
            <div class="ui-widget-content ui-helper-clearfix" style="margin: 0.6em .0em;height:0.01em;"></div>
            <div style="width:100%; text-align:Left;">
                <h2>Parametros de usuario</h2>
            </div>
            <table>
                <tr>
                    <td>Enviar notificación al crear una solicitud: </td>
                    <td>
                        <asp:CheckBox ID="chkNotificacionUsuario" runat="server" />
                    </td>
                </tr>
                <tr>
                    <td>Asunto de correo: </td>
                    <td>
                        <asp:TextBox ID="txtTituloUsuario" runat="server" CssClass="txtNormal" Width="150px" MaxLength="60"></asp:TextBox>
                    </td>
                </tr>
            </table>
        </div>
        <br />
        <div id="btnGuardar" class="btnNormal" runat="server">
            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
            <a>Guardar</a>
        </div>
        <div id="btnCerrar" class="btnNormal">
            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
            <a>Salir</a>
        </div>
    </form>
</body>
</html>
