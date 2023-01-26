<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Cam_Importacion" Codebehind="Cam_Importacion.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title> 
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Cam_Importacion.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfCampana" runat="server" />
        <asp:HiddenField ID="hdfTipoImportacion" runat="server" />        
        <div>
<%--        <asp:FileUpload ID="flUpload" runat="server" />
            <asp:Button ID="btnCargar" runat="server" Text="Cargar"/>
            <div id="btnGuardar" class="btnNormal">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>--%>
            <table cellpadding="0" cellspacing="0">
                <tr>
                    <td>
                        <asp:Label ID="lblRutaContrato" runat="server" Text=""></asp:Label>
                    </td>
<%--                    <td>
                        &nbsp;
                        <img id="btnEliminarContrato" alt="" src="../../../Common/Images/Mantenimiento/delete_16x16.gif" class="imgBtn" 
                                title="Eliminar Adjunto" data-bind="click: QuitarAdjunto, style: { display: Vigente() ? '' : 'none' }"/>
                    </td>--%>
                </tr>
            </table>
            <iframe id="ifCargarArchivo" frameborder="0" style="padding: 0px; margin: 0px; height: 33px; width:482px;" 
                    src="../../Common/Page/Adm_CargarArchivo.aspx?Formatos=xls,xlsx&FormatoTipo=Excel">
            </iframe>
            
            <table id="tbResultado"></table>
            <div id="pagerResultado"></div>
        </div>
    </form>
</body>
</html>
