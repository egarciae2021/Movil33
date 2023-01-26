<%@ Page Language="VB" AutoEventWireup="false" Inherits="General_Administrar_Mantenimiento_CargaIcono" Codebehind="CargaIcono.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfCodigo" runat="server" />
    <asp:HiddenField ID="hdfIconoArchivo" runat="server" />
    <div>
        <table>
            <tr>
                <td>
                    <asp:Image runat="server" ID="imgIcono" Visible="false" Height="40px" Width="40px"/>
                    <asp:FileUpload runat="server" ID="flUpload" Visible="false" />
                    <asp:RequiredFieldValidator runat="server" ID="rfv1" ControlToValidate="flUpload" Text="*"></asp:RequiredFieldValidator>
                    &nbsp;<asp:Button ID="btnsubir" runat="server" Text="Subir" />
                    &nbsp;<asp:Button ID="btneliminar" runat="server" Text="Eliminar" Visible ="false" />
                </td>
            </tr>
            <tr>
                <asp:Label runat="server" ID="lblmensaje"></asp:Label>
            </tr>
        </table>
        
    </div>
    </form>
</body>
</html>
