<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Cam_PedidosTipoDescarga" Codebehind="Cam_PedidosTipoDescarga.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Cam_PedidosTipoDescarga.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField runat="server" ID="hdfinIdCam" />
        <asp:HiddenField runat="server" ID="hdfvcNomSit" />
        <asp:HiddenField runat="server" ID="hdfvcFecIni" />
        <asp:HiddenField runat="server" ID="hdfvcFecFin" />
        <asp:HiddenField runat="server" ID="hdfvcCodEmp" />
        <asp:HiddenField runat="server" ID="hdfvcCodAre" />
        <asp:HiddenField runat="server" ID="hdfvcCodCCO" />
        <asp:HiddenField runat="server" ID="hdfvcCodCue" />
        <asp:HiddenField runat="server" ID="hdfvcIdEst" />
        <asp:HiddenField runat="server" ID="hdfvcOpc" />
        <asp:HiddenField runat="server" ID="hdfvcCodPed" />

        <table width="300px">
            <tr>
                <td>
                    Elegir tipo de vista:
                </td>
            </tr>
            <tr>
                <td>
                    <input type="radio" name="rblTipoDescarga" value="Vista Normal" checked="checked"/><span>Vista Normal</span>
                </td>
            </tr>
            <tr>
                <td>
                   <input type="radio" name="rblTipoDescarga" value="Vista Detallada" /><span>Vista Detallada</span>
                </td>
            </tr>
        </table>
        <div id="dvAcciones" style="margin-top:10px; text-align:left; text-align:right;">
            <div id="btnDescargar" class="btnNormal">                        
                <asp:Image ID="imgAgregarProducto" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Aceptar</a>
            </div>
            <div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cerrar</a>
            </div>
        </div>
        <iframe id="ifExcel" frameborder="0" style="padding:0px; margin:0px; display:none;"></iframe>             
    </form>
</body>
</html>

