<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Dashboard_pedido.aspx.vb" Inherits="WebSiteCliente.Dashboard_pedido" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfCampanaActiva" runat="server" />
    <asp:HiddenField ID="hdfMsjMantenerPlan" runat="server" />
    <asp:HiddenField ID="hdfMsjCambiarPlan" runat="server" />
    <asp:Label ID="lblMsjMantenerPlan" runat="server" Font-Size="10px" ForeColor="#7E9097"></asp:Label>
    <asp:Label ID="Label1" runat="server" Font-Size="10px" ForeColor="#7E9097"></asp:Label>
    <asp:Label ID="lblMsjCambiarPlan" runat="server" Font-Size="10px" ForeColor="#7E9097"></asp:Label>
    <div>
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr height="5px">
                        <td colspan="4">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" class="cGenInfo" align="center">
                            <b>Información del Usuario</b>
                        </td>
                    </tr>
                    <tr height="8px"><td colspan="4"></td></tr>
                    <tr>
                        <td align="right" style="color: #003F59;vertical-align:bottom;"  width="180px">
                            <b>Nombre:</b>
                        </td>
                        <td>
                            &nbsp;
                        </td>
                        <td style="vertical-align:bottom;" width="300px">
                            <asp:Label ID="lblNombreEmpleado" runat="server" Text="(Desconocido)"></asp:Label>
                        </td>
                        <td rowspan="8">
                            <img src="../Common/Images/user.png" height="75px" />
                        </td>
                    </tr>
                    <tr height="4px"><td colspan="3"></td></tr>
                    <tr>
                        <td align="right" style="color: #003F59;vertical-align:bottom;">
                            <b>Área:</b>
                        </td>
                        <td>
                            &nbsp;
                        </td>
                        <td style="vertical-align:bottom;">
                            <asp:Label ID="lblArea" runat="server" Text="(Desconocido)"></asp:Label>
                        </td>
                    </tr>
                    <tr height="4px"><td colspan="3"></td></tr>
                    <tr>
                        <td align="right" style="color: #003F59;vertical-align:bottom;">
                            <b>Centro de Costos:</b>
                        </td>
                        <td>
                            &nbsp;
                        </td>
                        <td style="vertical-align:bottom;">
                            <asp:Label ID="lblCentroCosto" runat="server" Text="(Desconocido)"></asp:Label>
                        </td>
                    </tr>
                    <tr height="4px"><td colspan="3"></td></tr>
                    <tr>
                        <td align="right" style="color: #003F59; vertical-align:top;">
                            <b>Número de Líneas-Familia:</b>
                        </td>
                        <td>
                            &nbsp;
                        </td>
                        <td style="vertical-align:top;">
                            <asp:Label ID="lblCantidadLineas" runat="server" Text="0"></asp:Label>
                        </td>
                    </tr>
                    <tr height="10px">
                        <td colspan="3">
                        </td>
                    </tr>
                </table>
    </div>
    </form>
</body>
</html>
