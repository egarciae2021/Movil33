<%@ Page Language="VB" AutoEventWireup="false" 
    Inherits="P_Movil_Administrar_Mantenimiento_Mnt_ImagenCarga" Codebehind="Mnt_ImagenCarga.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Mnt_ImagenCarga.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="dvCampo" class="dvPanel" style="overflow: auto;">
        <table id="tbImagenCarga" runat="server" style="padding:0" >
            <tr>
                <td class="tdTitulo" style="width:70px;">
                    Imagen
                </td>
                <td align="center" style="width:387px;" colspan="2">
                    <img id="imgImagen" alt="Imagen" src="" runat="server" accept=".jpg, .jpeg, .bmp, .png, .gif" />
                    <asp:HiddenField ID="hdfArchivo" runat="server" />
                </td>
            </tr>
            <tr>
                <td class="tdTitulo" style="width:70px">
                    
                </td>
                <td>
                    <asp:FileUpload ID="fuArchivo" runat="server" />
                </td>
                <td>
                    <asp:Button ID="btnCargar" runat="server" Text="Cargar" OnClientClick="return ValidarExtencion();" />
                    <%--<div id="btnCargarCli" class="btnNormal">
                        <asp:Image ID="imgCargar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                        <a>Cargar</a>
                    </div>--%>
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
