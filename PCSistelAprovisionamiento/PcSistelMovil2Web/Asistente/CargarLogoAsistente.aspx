<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CargarLogoAsistente.aspx.cs" Inherits="PcSistelMovil2Web.Asistente.CargarLogoAsistente" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        body {
	           
            }
    </style>
     
      <link href="../Styles/Sitio.css" rel="stylesheet" type="text/css" />
       <link href="../Common/Styles/JqueryThemeRoller/redmond/jquery-ui-1.8.16.custom.css"
        rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/json2.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../Common/Styles/Principal2.css" rel="stylesheet" type="text/css" />
        <script>
            $(function () {
                $("#btnBuscarLogo").click(function () { $('#flUpload').click(); });
            });
        
        </script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfCodigo" runat="server" />
    <asp:HiddenField ID="hdfIconoArchivo" runat="server" />
    <div>
        <table style="margin-left:-5px;width:600px;">
            <tr>
                <td id="tdBusqueda" style="width:0px; display:none;" valign="top" runat="server">     <div id="btnBuscarLogo" class="btnNormal" runat="server" style="display:none;"><a style="font-size:12px;"></a>
                    <img src="../Common/images/Mantenimiento/buscar.png" /> </div></td>
                    
                    
                    <td width="600x" style="text-align: left;">
           
             
                    <asp:FileUpload runat="server" ID="flUpload" Visible="false" />                
                        <asp:RequiredFieldValidator runat="server" ID="rfv1" ControlToValidate="flUpload"
                            Text="*"></asp:RequiredFieldValidator>
                        &nbsp;<asp:Button ID="btnsubir" runat="server" Text="Subir" OnClick="btnsubir_Click" />
                       
                        <asp:Image runat="server" ID="imgIcono" Visible="false" Height="80px" Width="80px" />
                        <asp:ImageButton ID="btneliminafoto" runat="server" OnClick="btneliminar_Click" 
                            ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" Visible="false"/>
                        <asp:Button ID="btneliminar" runat="server" Text="Eliminar" Visible="false" OnClick="btneliminar_Click" />
                    
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
