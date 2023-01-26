<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Registrese.aspx.vb" Inherits="WebSiteCliente.Registrese" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
		<table align="center" width="400px">
			<tr>
				<td>
                    Usuario (Registro)
				</td>
				<td>
                    <asp:Label runat="server" ID="lblUsuario"></asp:Label>
				</td>
			</tr>
			<tr>
				<td>
                    Contraseña
				</td>
				<td>
                    <asp:TextBox runat="server" ID="txtPassword" TextMode="Password" ></asp:TextBox>
				</td>
			</tr>
            <tr>
				<td colspan="2"> 
                    <asp:Button runat="server" Text="btnGrabar"  />
				</td>
			</tr>
		</table>
    </div>
    </form>
</body>
</html>
