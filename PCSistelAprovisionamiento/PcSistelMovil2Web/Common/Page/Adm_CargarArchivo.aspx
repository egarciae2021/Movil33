<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Adm_CargarArchivo.aspx.cs" Inherits="PcSistelMovil2Web.Common.Page.Adm_CargarArchivo" %>
<%@ Register Src="../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

        <link href="../../Styles/Sitio.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/JqueryThemeRoller/redmond/jquery-ui-1.8.16.custom.css"
        rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Principal2.css" rel="stylesheet" type="text/css" />

     <link href="../Styles/Uniform/default/css/uniform.default.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Adm_CargarArchivo.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
     <asp:HiddenField ID="hdfFormatos" runat="server" />
        <asp:HiddenField ID="hdfFormatoTipo" runat="server" />
        <asp:HiddenField ID="hdfNombreArchivoFisico" runat="server" />
        <asp:HiddenField ID="hdfNombreArchivoCargado" runat="server" />
        <asp:HiddenField ID="hdfTipoCarga" runat="server" />
        <asp:HiddenField ID="hdfRutaCarpeta" runat="server" />
        <asp:HiddenField ID="hdfAceptavariosArchivos" runat="server" />
        <table cellpadding="0" cellspacing="0">
            <tr>
                <td style="Width: 325px;">
                    <asp:FileUpload ID="fulArchivo" runat="server" style="width: 350px !important;"/>
                </td>
                <td>
                    <div id="btnCargarPrevio" class="btnNormal" style="height:26px; display:none;">
                        <asp:Image ID="imgCargar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/SubirArchivo.png" />
                        <a>Subir</a>
                    </div>
                </td>
            </tr>
        </table>
        <asp:Button ID="btnCargar" runat="server" Text="" 
         onclick="btnCargar_Click" /> 
    </form>
</body>
</html>
