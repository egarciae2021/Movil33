<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Consultar_Con_Reporte" Codebehind="Con_Reporte.aspx.vb" %>

<%@ Register assembly="CrystalDecisions.Web, Version=13.0.2000.0, Culture=neutral, PublicKeyToken=692fbea5521e1304" namespace="CrystalDecisions.Web" tagprefix="CR" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.draggable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.resizable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Con_Reporte.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">    
        <div id="divMsgConfirmacion" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            <asp:Label ID="lblMensajeConfirmacion" runat="server" Text="No existen datos para los criterios seleccionados"></asp:Label>
        </div>
        <div>
            <table width="100%">
                <tr>
                    <td>
                        <CR:CrystalReportViewer EnableDatabaseLogonPrompt="false" ID="crvConsulta" runat="server" 
                                                ReportSourceID="crConsulta"
                                                AutoDataBind="true" Width="100%" 
                                                HasToggleGroupTreeButton="false"
                                                ToolPanelView="None" EnableDrillDown="False" 
                                                HasCrystalLogo="False" HasDrilldownTabs="False" />
                        <CR:CrystalReportSource ID="crConsulta" runat="server"></CR:CrystalReportSource>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</body>
</html>