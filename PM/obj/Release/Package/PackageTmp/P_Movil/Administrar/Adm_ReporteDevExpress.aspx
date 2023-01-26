<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Adm_ReporteDevExpress.aspx.vb" Inherits="Adm_ReporteDevExpress" %>

<%@ Register Assembly="DevExpress.XtraReports.v12.2.Web, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.XtraReports.UI.XtraReport" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.XtraReports.v12.2.Web, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.XtraReports.Web" TagPrefix="dx" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField runat="server" ID="hdfParent"/>
        <div id="divMsgConfirmacion" runat="server" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <asp:Label ID="lblMensajeConfirmacion" runat="server" Text="No existen datos para los criterios seleccionados."></asp:Label>
        </div>
        <div id="dvSinDatos" align="center" runat="server" style="font-size: medium; color: Gray; float: left;">
            No hay datos para mostrar.
        </div>
        <br />
        <div id="dvReporte" runat="server" align="center">
            <dx:ReportToolbar ID="dxReportToolbar" runat="server" ReportViewerID="dxReportViewer" ShowDefaultButtons="False" Width="802px" Theme="Default">
                <Items>
                    <dx:ReportToolbarButton Enabled="False" ItemKind="FirstPage" />
                    <dx:ReportToolbarButton Enabled="False" ItemKind="PreviousPage" />
                    <dx:ReportToolbarLabel ItemKind="PageLabel" Text="Páginas" />
                    <dx:ReportToolbarComboBox ItemKind="PageNumber" Width="65px">
                    </dx:ReportToolbarComboBox>
                    <dx:ReportToolbarLabel ItemKind="OfLabel" Text="de" />
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
                        <Margins MarginLeft="3px" MarginRight="3px" />
                    </LabelStyle>
                </Styles>
            </dx:ReportToolbar>
            <dx:ReportViewer ID="dxReportViewer" runat="server"
                CssFilePath="~/App_Themes/Office2003Blue/{0}/styles.css"
                CssPostfix="Office2003Blue" LoadingPanelText="Cargando&amp;hellip;"
                SpriteCssFilePath="~/App_Themes/Office2003Blue/{0}/sprite.css" Theme="Office2010Silver">
                <LoadingPanelImage Url="~/App_Themes/Office2003Blue/Web/Loading.gif">
                </LoadingPanelImage>
                <LoadingPanelStyle ForeColor="#4B77B8">
                </LoadingPanelStyle>
            </dx:ReportViewer>
        </div>
        <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
        <script src="Adm_ReporteDevExpress.js"></script>
    </form>
</body>
</html>
