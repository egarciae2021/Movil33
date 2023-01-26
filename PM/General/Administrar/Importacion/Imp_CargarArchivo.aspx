<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Imp_CargarArchivo.aspx.vb" Inherits="Imp_CargarArchivo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/jqGrid/ui.jqgrid.css" />
<%--    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
--%>    
    <link href="../../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/ajaxupload.js" type="text/javascript"></script>
    
    <script src="../../../Common/Scripts/jquery.MultiFile.js" type="text/javascript"></script>

    <script src="Imp_CargarArchivo.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField runat="server" ID="hdfNombreTemporarl"/>
        <asp:HiddenField runat="server" ID="hdfCodConfig"/>
        <asp:HiddenField runat="server" ID="hdfArcTemp"/>
        <div style="float:left; margin-top:0px; padding-left: 5px;">
            <table width="100%" border="0" style="font-size: 11.5px">
                <tr>
                    <td align="center">
                        <asp:Label runat="server" ID="lblArchivo" Visible="False"></asp:Label>
                        <asp:FileUpload ID="fuAdjuntar" runat="server" Width="300" accept=".xlsx, .xls, .txt, .csv" />
                        <asp:RequiredFieldValidator runat="server" ID="rfv1" ControlToValidate="fuAdjuntar" Text="*" Visible="false">
                        </asp:RequiredFieldValidator>
                    </td>
                    <td>&nbsp;<asp:Button ID="btnSubirArchivo" runat="server" Text="Subir"/>
                        &nbsp;<asp:Button ID="btnEliminar" runat="server" Text="Eliminar" Visible="false" />
                        &nbsp;<asp:Button runat="server" ID="btnLimpiar" Visible="False"/>
                    </td>
                </tr>
                <%--<tr>
                    <td colspan="1" align="left">
                        <br/>
                        <asp:Button ID="btnSubir" CssClass="btnNormal" Text="" runat="server"/>
                         <div id="btnCargar" class="btnNormal">
                            <asp:Image ID="imgEjecutar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/EscalarSolicitud.png" />
                            <a>Cargar</a>
                        </div>
                        <div id="btnEliminar2" class="btnNormal" style="display: none">
                            <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/EscalarSolicitud.png" />
                            <a>Eliminar</a>
                        </div>
                    </td>
                </tr>--%>
                <tr>
                    <td><asp:Label runat="server" ID="lblmensaje" style="color:Red;"></asp:Label></td>
                </tr>
        
            </table>
        </div>
    </form>
</body>
</html>
