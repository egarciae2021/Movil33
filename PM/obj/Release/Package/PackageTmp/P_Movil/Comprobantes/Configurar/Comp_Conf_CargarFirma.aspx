<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Comp_Conf_CargarFirma.aspx.vb"
    Inherits=".Comp_Conf_CargarFirma" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
   
 <link href="../../../Common/Styles/Uniform/default/css/uniform.default.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
   

    <script src="Comp_Conf_CargarFirma.aspx.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfCodigo" runat="server" />
    <asp:HiddenField ID="hdfIconoArchivo" runat="server" />
     <asp:HiddenField ID="hdfEstado" runat="server" />
    
    <div>
        <table>
            <tr>
                <td >
                    <asp:Image runat="server" ID="imgIcono" Visible="false" Height="80px" 
                        Width="160px" />
                    <asp:FileUpload runat="server" ID="flUpload" Visible="false" />
                    <asp:RequiredFieldValidator runat="server" ID="rfv1" ControlToValidate="flUpload"
                        Text="*" Visible="false"></asp:RequiredFieldValidator>
                    </td>
                    <td>  &nbsp;<asp:Button ID="btnsubir" runat="server" Text="Subir" style="display:block;"/>
                    &nbsp;<asp:Button ID="btneliminar" runat="server" Text="Eliminar" Visible="false" />
                              </td>
            </tr>
             <tr>
                <td><asp:Label runat="server" ID="lblmensaje" style="color:Red;"></asp:Label></td>
                </tr>

                
            </table>
    </div>
    </form>
</body>
</html>
