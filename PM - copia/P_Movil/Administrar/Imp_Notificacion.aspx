<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Imp_Notificacion" Codebehind="Imp_Notificacion.aspx.vb" %>

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
    <script src="Imp_Notificacion.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="dvCargando" class="dvCargando"></div>
        <div class="dvPanel">
            <table>
                <tr>
                    <td style="width: 150px;">Notificación:</td>
                    <td>
                        <asp:DropDownList ID="ddlNotificacion" runat="server" Width="249px"></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trEnviar" style="display:none;">
                    <td>Enviar: </td>
                    <td>
                        <asp:CheckBox ID="chkEnviar" runat="server"/>
                    </td>
                </tr>
            </table>
        </div>
        <br />
        <div id="dvDatos" class="dvPanel" style="display:none;">
            <div style="width:100%; text-align:Center;">
                <h2>Parámetros</h2>
            </div>
            <table>
                <tr>
                    <td style="width: 150px;">Correo: </td>
                    <td>
                        <asp:TextBox ID="txtCorreo" runat="server" CssClass="txtNormal" Width="300px" MaxLength="50" Enabled="false" ></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 150px;">Correo alternativo: </td>
                    <td>
                        <asp:TextBox ID="txtCorreoAlternativo" runat="server" CssClass="txtNormal" Width="300px" MaxLength="50" Enabled="false"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 150px;">Asunto: </td>
                    <td>
                        <asp:TextBox ID="txtAsunto" runat="server" CssClass="txtNormal" Width="300px" MaxLength="100"></asp:TextBox>
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
