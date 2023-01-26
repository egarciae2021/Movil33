<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_SolicitudDespacho" Codebehind="Adm_SolicitudDespacho.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
        <link  href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
        <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
        <script src="Adm_SolicitudDespacho.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="divMsgConfirmacion" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            <asp:Label ID="lblMensajeConfirmacion" runat="server" Text=""></asp:Label>
        </div>
        <div class="ui-state-default ui-corner-all" style="padding:6px;">
            <span class="ui-icon ui-icon-person" style="float:left; margin:-2px 5px 0 0;"></span>
            Usuario
        </div>
        <table>
            <tr>
                <td>
                    <asp:Label ID="lblEmpleadoTitulo" runat="server" Text="Empleado"></asp:Label>
                </td>
                <td>
                    <asp:Label ID="lblEmpleado" runat="server" Text=""></asp:Label>
                    <asp:TextBox ID="txtEmpleado" runat="server" Width="300px"></asp:TextBox>
                    <asp:HiddenField ID="hdfCodEmpleado" runat="server" />                    
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="Label3" runat="server" Text="Centro de costo"></asp:Label>
                </td>
                <td>
                    <asp:Label ID="lblCentroCosto" runat="server" Text=""></asp:Label>             
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="Label5" runat="server" Text="Área"></asp:Label>
                </td>
                <td>
                    <asp:Label ID="lblArea" runat="server" Text=""></asp:Label>             
                </td>
            </tr>
        </table>
        <div id="dvDespachos" >
            <div class="ui-state-default ui-corner-all" style="padding:6px;">
                <span class="ui-icon ui-icon-circle-arrow-s" style="float:left; margin:-2px 5px 0 0;"></span>
                Despachos pendientes
            </div>
            <table>
                <tr>
                    <td>
                        <asp:Label ID="Label1" runat="server" Text="Código de Dispositivo"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtCodigoDispositivo" runat="server" Width="250px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="Label2" runat="server" Text="Observaciones"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtObservaciones" runat="server" Width="250px" Height="100px" TextMode="MultiLine"></asp:TextBox>
                    </td>
                </tr>
            </table>
            <div id="btnGuardar" class="btnNormal">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                <a>Guardar</a>
            </div>
            <div id="btnImprimir" class="btnNormal" style="display:none;">
                <asp:Image ID="imgImprimir" runat="server" ImageUrl="~/Common/Images/Mantenimiento/print.ico" Width="16px" Height="16px"/>
                <a>Imprimir</a>
            </div>
            
            <table id="tbSolicitud"></table>
        </div>
        <iframe id="ifReporteCargo" frameborder="0" style="display:none;"></iframe>
    </form>
</body>
</html>