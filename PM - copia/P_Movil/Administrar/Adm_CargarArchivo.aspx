<%@ Page Language="VB" AutoEventWireup="false" 
    Inherits="P_Movil_Administrar_Adm_CargarArchivo" Codebehind="Adm_CargarArchivo.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../../Common/Styles/jqGrid/ui.jqgrid.css" />
<%--    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
--%>    
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../../Common/Scripts/jquery-1.7.2.js"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/ajaxupload.js" type="text/javascript"></script>

    <script src="Adm_CargarArchivo.js" type="text/javascript"></script>
</head>
<body>  
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfTipoSolicitud" runat="server" />
    <asp:HiddenField ID="hdfNombreTemporarl" runat="server" />
    <asp:HiddenField ID="hdfNombreAdjungo" runat="server" />
    <asp:HiddenField ID="hdfTamañoAdjunto" runat="server" />
    <asp:HiddenField ID="hdfUbicacionAdjunto" runat="server" />

    <asp:HiddenField runat="server" ID="hdfCanMax" />
    <asp:HiddenField runat="server" ID="hdfExtPer" />
    <asp:HiddenField runat="server" ID="hdfTamTip" />
    <asp:HiddenField runat="server" ID="hdfTamMax" />
    <asp:HiddenField runat="server" ID="hdfTamMed" />
    <div>
        <table width="100%">
            <tr>
                <td align="left">
                    <asp:FileUpload ID="fuAdjuntar" runat="server" />
                </td>
                <td align="right">
                    <%--<div id="btnSubir" runat="server" class="btnNormal">
                        <asp:Image ID="imgSubir" runat="server" Style="width: 14px; vertical-align:bottom;" 
                            ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                        Agregar
                    </div>--%>
                    <asp:Button ID="btnSubir" CssClass="btnNormal" Text="Agregar" runat="server"/>
                </td>
            </tr>
            <%--<tr>
                <td align="right">
                    <asp:Button ID="btnSubir" CssClass="btnNormal" Text="Subir" runat="server"/>
                </td>
            </tr>--%>
        </table>
    </div>
    </form>
</body>
</html>
