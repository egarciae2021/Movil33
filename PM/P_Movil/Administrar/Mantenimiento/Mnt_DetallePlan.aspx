<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Mnt_DetallePlan" Codebehind="Mnt_DetallePlan.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
	<script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="dvPanel">
            <table id="tbPlan" runat="server">                
                <tr>
                    <td colspan="2">
                        <asp:Label ID="lblNombre" runat="server" Text="" Font-Bold="true"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblDescripcionTitulo" runat="server" Text="Descripción"></asp:Label>
                    </td>
                    <td>
                        <asp:Label ID="lblDescripcion" runat="server" Text=""></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblOperadorTitulo" runat="server" Text="Operador"></asp:Label>
                    </td>
                    <td>
                        <asp:Label ID="lblOperador" runat="server" Text=""></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblMontoTitulo" runat="server" Text="Monto"></asp:Label>
                    </td>
                    <td>
                        <asp:Label ID="lblMonto" runat="server" Text=""></asp:Label>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</body>
</html>
