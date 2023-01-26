<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Personalizar_Esquema_Mantenimiento_Mnt_Producto" Codebehind="Mnt_Producto.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
	<script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.dialog.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.button.js"></script>
  <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
  <script src="Mnt_Producto.js" type="text/javascript"></script>
  <script type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfParametros" runat="server" Value=""/>
    <asp:HiddenField ID="hdfValores" runat="server" />
    <asp:HiddenField ID="hdfCodigo" runat="server" />
    <div id="dvCargando" class="dvCargando"></div>
    <div class="dvPanel">
        <table>
            <tr>
                <td>
                    Nombre
                </td>
                <td>
                    <asp:TextBox ID="txtNombre" runat="server" MaxLength="100" Width="333px"></asp:TextBox>
                </td>
            </tr>
            <tr>  
                <td>
                    Orden
                </td>
                <td>
                    <asp:TextBox ID="txtOrden" runat="server" MaxLength="2" Width="38px"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    URL</td>
                <td>
                    <asp:TextBox ID="txtUrl" runat="server" MaxLength="250" Width="599px"></asp:TextBox>
                </td>
            </tr>
            <tr id="trEstado" runat="server">
                <td>
                    Estado</td>
                <td>
                        <asp:CheckBox ID="chkEstado" runat="server" />
                </td>
            </tr>
            <tr>
                <td>
                    &nbsp;</td>
                <td>
                    &nbsp;</td>
            </tr>
            </table>
    </div>
        <div style="margin-top:2px;">
            <div id="btnGuardar" class="btnNormal">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
            <div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cerrar</a>
            </div>
        </div>
    </form>
</body>
</html>
