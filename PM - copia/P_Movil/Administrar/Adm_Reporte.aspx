<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_Reporte" Codebehind="Adm_Reporte.aspx.vb" %>
<%--<%@ Register assembly="CrystalDecisions.Web, Version=13.0.2000.0, Culture=neutral, PublicKeyToken=692fbea5521e1304" namespace="CrystalDecisions.Web" tagprefix="CR" %>--%>
<%@ Register TagPrefix="eeg" TagName="ExportarExcelGenerico" Src="~/Common/Controles/ExportarExcelGenerico.ascx" %>

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
<script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>

    <script src="Adm_Reporte.js" type="text/javascript"></script>

    <style type="text/css">
        .dvCargando
        {
            background: url('../../Common/Images/Mantenimiento/Cargando.gif') no-repeat right center;
            width: 64px;
            height: 64px;
            top: 50%;
            left: 50%;
            z-index: 20;
            position: fixed;
            display: none;
        }
    </style>

</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfNombAdjTemporal" runat="server" /> <%--agregado 18-09-2013 wapumayta --%>
        <asp:HiddenField ID="hdfTamAdjTemporal" runat="server" /> <%--agregado 18-09-2013 wapumayta --%>
        <div id="divMsgConfirmacion" runat="server" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            <asp:Label ID="lblMensajeConfirmacion" runat="server" Text="No existen datos para los criterios seleccionados."></asp:Label>
        </div>
        <div id="dvCargando" class="dvCargando"></div>
        <div id="dvReporte" runat="server">
            <table width="100%">
                <tr>
                    <td>
                        <%--<CR:CrystalReportViewer EnableDatabaseLogonPrompt="false" ID="crvConsulta" runat="server" 
                                                ReportSourceID="crConsulta" AutoDataBind="true" ToolPanelView="None"
                                                EnableDrillDown="False" HasCrystalLogo="False" 
                                                HasToggleGroupTreeButton="false"
                                                HasDrilldownTabs="False" HasExportButton="False" 
                            HasPrintButton="False" />
                        <CR:CrystalReportSource ID="crConsulta" runat="server">
                        </CR:CrystalReportSource>--%>
                    </td>
                </tr>
            </table>
 <%--           <div style="display: none">
                <eeg:ExportarExcelGenerico ID="eegResumen" runat="server" />
            </div>
            <div style="display: none">
                <eeg:ExportarExcelGenerico ID="eegComprobantes" runat="server" />
            </div>--%>
        </div>
    </form>
</body>
</html>