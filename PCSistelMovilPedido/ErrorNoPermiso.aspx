<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="ErrorNoPermiso.aspx.vb" Inherits="WebSiteCliente.ErrorNoPermiso" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <br /><br /><br /><br />
        <div style="text-align:center; color:#cd0a0a; background-color: #E8D8D8;" >
            <h1>Gestión Móvil</h1>
        </div>
        <div  align="center">
        <table width = "320px" >
            <tr>
                <td>  
                    <asp:Image ID="imgError" ImageUrl="~/Common/Images/Error.png" runat="server" Height="32px" />
                </td>
                <td>
                    <h2 style="color:#D34B25;font-size: 14px;">
                        Usted no tiene permisos para visualizar esta p&aacute;gina.<br /> Cont&aacute;cte con su administrador.
                    </h2>
                </td>
            </tr>
        </table>
        </div>
    </form>
</body>
</html>
