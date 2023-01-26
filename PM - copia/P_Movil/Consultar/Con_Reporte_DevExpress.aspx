<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Con_Reporte_DevExpress.aspx.vb" Inherits=".Con_Reporte_DevExpress" %>

<%@ Register Assembly="DevExpress.XtraReports.v12.2.Web, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.XtraReports.Web" TagPrefix="dx" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
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
        <div id="divMsgConfirmacion" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <asp:Label ID="lblMensajeConfirmacion" runat="server" Text="No existen datos para los criterios seleccionados"></asp:Label>
        </div>
        <div id="dvSinDatos" align="center" runat="server" style="font-size: medium; color: Gray; float: left;">
            No hay datos para mostrar.
        </div>
        <br />
        <div id="dvReporte" runat="server" align="center">
            <dx:ReportToolbar ID="ReportToolbar1" runat="server" ShowDefaultButtons="False" ReportViewerID="ReportViewer1" Theme="Default" Width="817px">
                <Items>
                    <dx:ReportToolbarButton Enabled="False" ItemKind="FirstPage" />
                    <dx:ReportToolbarButton Enabled="False" ItemKind="PreviousPage" />
                    <dx:ReportToolbarLabel ItemKind="PageLabel" />
                    <dx:ReportToolbarComboBox ItemKind="PageNumber" Width="65px">
                    </dx:ReportToolbarComboBox>
                    <dx:ReportToolbarLabel ItemKind="OfLabel" />
                    <dx:ReportToolbarTextBox IsReadOnly="True" ItemKind="PageCount" />
                    <dx:ReportToolbarButton ItemKind="NextPage" />
                    <dx:ReportToolbarButton ItemKind="LastPage" />
                    <dx:ReportToolbarSeparator />
                    <dx:ReportToolbarButton ItemKind="SaveToDisk" />
                    <dx:ReportToolbarButton ItemKind="SaveToWindow" />
                    <dx:ReportToolbarComboBox ItemKind="SaveFormat" Width="70px">
                        <Elements>
                            <dx:ListElement Value="pdf" />
                            <dx:ListElement Value="xls" />
                            <dx:ListElement Value="xlsx" />
                            <dx:ListElement Value="rtf" />
                            <dx:ListElement Value="mht" />
                            <dx:ListElement Value="html" />
                            <dx:ListElement Value="txt" />
                            <dx:ListElement Value="csv" />
                            <dx:ListElement Value="png" />
                        </Elements>
                    </dx:ReportToolbarComboBox>
                </Items>
                <Styles>
                    <LabelStyle>
                        <Margins MarginLeft='3px' MarginRight='3px' />
                    </LabelStyle>
                </Styles>
            </dx:ReportToolbar>
            <dx:ReportViewer ID="ReportViewer1" runat="server" LoadingPanelText="Cargando&amp;hellip;" Theme="Office2010Silver">
                <Border BorderColor="#41B0CC" BorderStyle="Solid" BorderWidth="1px" />
            </dx:ReportViewer>
        </div>

    </form>
</body>
</html>
