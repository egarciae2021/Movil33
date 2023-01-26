<%--MPAJUELO_3.0.4_20161104--%>

<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="ReporteDevExpress.aspx.vb"
    Inherits=".ReporteDevExpress" %>

<%@ Register Assembly="DevExpress.XtraReports.v12.2.Web, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.XtraReports.UI.XtraReport" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.XtraReports.v12.2.Web, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.XtraReports.Web" TagPrefix="dx" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div id="dvSinDatosLineaContrato" runat="server" style="font-size:medium; color:Gray; float:left;">
        No hay líneas con plan asociado para mostrar.
        </div>
        <div id="dvSinDatos"  runat="server" style="font-size:medium; color:Gray; float:left;">
        No hay datos para mostrar.
        </div>
        <div id="dvReporte" align="center" runat="server">
            <dx:ReportToolbar ID="dxReportToolbar" runat="server" ReportViewerID="dxReportViewer" ShowDefaultButtons="False" Width="802px">
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
                    <Margins MarginLeft="3px" MarginRight="3px" />
                    </LabelStyle>
                </Styles>
            </dx:ReportToolbar>
            <dx:ReportViewer ID="dxReportViewer" runat="server" ClientInstanceName="viewer"
                CssFilePath="~/App_Themes/Office2003Blue/{0}/styles.css"
                OnCacheReportDocument="ReportViewer1_CacheReportDocument" 
                OnRestoreReportDocumentFromCache="ReportViewer1_RestoreReportDocumentFromCache"
                CssPostfix="Office2003Blue" LoadingPanelText="Cargando&amp;hellip;" 
                SpriteCssFilePath="~/App_Themes/Office2003Blue/{0}/sprite.css">
                <LoadingPanelImage Url="~/App_Themes/Office2003Blue/Web/Loading.gif">
                </LoadingPanelImage>
                <LoadingPanelStyle ForeColor="#4B77B8">
                </LoadingPanelStyle>
            </dx:ReportViewer>
            <asp:HiddenField ID="hf" runat="server" />
        </div>
    </div>
    </form>
</body>
</html>
