<%@ Page Language="VB" AutoEventWireup="false" Inherits="Common_Page_Adm_CargarArchivo" CodeBehind="Adm_CargarArchivo.aspx.vb" %>

<%@ Register Src="../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Styles/Uniform/default/css/uniform.default.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Adm_CargarArchivo.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfFormatos" runat="server" />
        <asp:HiddenField ID="hdfFormatoTipo" runat="server" />
        <asp:HiddenField ID="hdfNombreArchivoFisico" runat="server" />
        <asp:HiddenField ID="hdfNombreImagesFisico" runat="server" />
        <asp:HiddenField ID="hdfNombreArchivoCargado" runat="server" />
        <asp:HiddenField ID="hdfNombreImagesCargado" runat="server" />
        <asp:HiddenField ID="hdfTipoCarga" runat="server" />
        <asp:HiddenField ID="hdfRutaCarpeta" runat="server" />
        <asp:HiddenField ID="hdfAceptavariosArchivos" runat="server" />
        <asp:HiddenField ID="hdfAdjuntarFactura" runat="server" />
        <asp:HiddenField ID="hdfPlantillaImportacion" runat="server" />
        <table cellpadding="0" cellspacing="0">

            <tr id="trMensaje1" style="display: none;">
                <td colspan="2" style="height: 40px;">
                    <span id="lblMensaje1" style="padding: 4px; margin: 4px;"></span>
                    <br />
                </td>
            </tr>

            <tr>
                <td style="width: 325px;">
                    <asp:FileUpload ID="fulArchivo" runat="server" Style="width: 350px !important;" />
                </td>
                <td>
                    <div id="btnCargarPrevio" class="btnNormal" style="height: 26px; display: none;">
                        <asp:Image ID="imgCargar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/SubirArchivo.png" />
                        <a>Cargar</a>
                    </div>
                </td>
            </tr>


            <tr id="trMensaje2" style="display: none;">
                <td colspan="2" style="height: 80px;">
                    <span id="lblMensaje2" style="padding: 4px; margin: 4px;"></span>
                    <br />
                </td>
            </tr>

            <tr id="trCheckImages" runat="server" style="height: 20px;">
                <td colspan="2">
                    <div id="dvDarBaja">
                        <input id="chkSubirImages" type="checkbox" name="chkSubirImages"><label for="chkSubirImages">Subir Imagenes de Importacion Lineas</label>
                    </div>
                </td>
            </tr>


            <tr id="trUploadFileImage" runat="server" style="display: none;">
                <td style="width: 325px;">
                    <asp:FileUpload ID="fulImages" runat="server" Style="width: 350px !important;" />
                </td>
                <td>
                    <div id="btnCargaPrevioAlterno" class="btnNormal" style="height: 26px; display: none;">
                        <asp:Image ID="imgCargarImages" runat="server" ImageUrl="~/Common/Images/Mantenimiento/SubirArchivo.png" />
                        <a>Cargar</a>
                    </div>
                </td>
            </tr>


        </table>
        <asp:Button ID="btnCargar" runat="server" Text="" />
        <asp:Button ID="btnCargarImages" runat="server" Text="" />
    </form>
</body>
</html>
