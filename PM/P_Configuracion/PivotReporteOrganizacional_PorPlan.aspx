<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="PivotReporteOrganizacional_PorPlan.aspx.vb" Inherits=".PivotReporteOrganizacional_PorPlan" %>

<%@ Register Assembly="DevExpress.Web.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxEditors" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=B88D1754D700E49A" Namespace="DevExpress.Web.ASPxPanel" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxPivotGrid.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=B88D1754D700E49A" Namespace="DevExpress.Web.ASPxPivotGrid" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxPivotGrid.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxPivotGrid.Export" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.XtraCharts.v12.2.Web, Version=12.2.18.0, Culture=neutral, PublicKeyToken=B88D1754D700E49A" Namespace="DevExpress.XtraCharts.Web" TagPrefix="dxchartsui" %>
<%@ Register Assembly="DevExpress.XtraCharts.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=B88D1754D700E49A" Namespace="DevExpress.XtraCharts" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <script src="../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Common/Scripts/json2.js" type="text/javascript"></script>
    <%--<link href="../Common/Styles/JqueryThemeRoller/ui-lightness/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" />--%>
    <link href="../Common/Styles/stylePivot.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script type="text/javascript" src="../Common/Scripts/jqGrid/plugins/jquery.tablednd.js"></script>
    <script src="../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
</head>

<body style="background: #FFFFFF;">

    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("PivotReporteOrganizacional_PorPlan.js")%>" type="text/javascript"></script>

    <form id="form1" runat="server">
        <%--    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <asp:UpdatePanel ID="UpdatePanel1" runat="server" UpdateMode="Always" >
      <ContentTemplate>--%>
        <input id="txtcargando" type="text" name="name" value="alert" style="display: none;" />
        <div class="dvPanel" id="global">
            <div class="pos_titulos_generales" style="font-size: 13px; font-weight: 600;">
                Reportes Din&aacute;micos Organizacional Por Plan&nbsp;
                <asp:Label ID="lblNombreReporte" runat="server" Text=" - [Nuevo Reporte]" Visible="true"></asp:Label>
            </div>
            <br />
            <table border="0" style="width: 95%" cellpadding="0" cellspacing="0" align="center">
            </table>
            <div id="Contenedor" class="style1">
                <table border="0" style="width: 95%" cellpadding="0" cellspacing="0" align="left">
                    <tr height="10">
                        <td colspan="2"></td>
                    </tr>
                    <tr style="font-size: 12pt" height="50">
                        <td align="center" width="10%" colspan="3" style="background-repeat: repeat">


                            <table width="100%" border="0" style="font-size: 11px; font-family: Tahoma; color: #1E395B; font-weight: bold">
                                <tr>


                                    <td align="left">
                                        <dx:ASPxButton ID="ASPxButton1" Width="180px" runat="server" AutoPostBack="False" ClientInstanceName="button"
                                            EnableClientSideAPI="True" Text="Mostrar Lista de Campos" CssFilePath="~/App_Themes/Aqua/{0}/styles.css"
                                            CssPostfix="Aqua" HorizontalAlign="NotSet" ImagePosition="Left" SpriteCssFilePath="~/App_Themes/Aqua/{0}/sprite.css"
                                            VerticalAlign="NotSet" Wrap="Default" ClientIDMode="AutoID">
                                            <PressedStyle>
                                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                                <Border BorderStyle="NotSet"></Border>
                                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                            </PressedStyle>
                                            <Image Align="NotSet">
                                            </Image>
                                            <DisabledStyle>
                                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                                <Border BorderStyle="NotSet"></Border>
                                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                            </DisabledStyle>
                                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                            <CheckedStyle>
                                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                                <Border BorderStyle="NotSet"></Border>
                                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                            </CheckedStyle>
                                            <BorderTop BorderStyle="NotSet"></BorderTop>
                                            <ClientSideEvents Click="function(s, e) {
	                                ASPxPivotGrid1.ChangeCustomizationFieldsVisibility();}" />
                                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                            <HoverStyle>
                                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                                <Border BorderStyle="NotSet"></Border>
                                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                            </HoverStyle>
                                            <BorderRight BorderStyle="NotSet"></BorderRight>
                                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                            <FocusRectBorder BorderStyle="NotSet"></FocusRectBorder>
                                            <Border BorderStyle="NotSet"></Border>
                                        </dx:ASPxButton>
                                    </td>

                                    <td align="left">&nbsp;
                                    </td>

                                    <td align="right">
                                        <asp:DropDownList ID="ddlFormatoExportacion" runat="server"
                                            Style="vertical-align: middle" Width="100px" Font-Size="11px"
                                            AutoPostBack="True">
                                            <%--<asp:ListItem Value="3">Text</asp:ListItem>--%>
                                            <asp:ListItem Value="0" Selected="True">Excel 2010</asp:ListItem>
                                            <asp:ListItem Value="1">Excel 2007</asp:ListItem>
                                            <asp:ListItem Value="2">Pdf</asp:ListItem>
                                            <asp:ListItem Value="3">Html</asp:ListItem>
                                            <asp:ListItem Value="4">Rtf</asp:ListItem>
                                        </asp:DropDownList>
                                    </td>
                                    <td style="width: 100px">
                                        <dx:ASPxButton ID="ASPxButton3" runat="server" Text="Exportar"
                                            OnClick="ASPxButton3_Click"
                                            Image-Url="~/Common/Images/save_export.ico"
                                            Image-Height="16px"
                                            Style="vertical-align: middle;" ClientIDMode="AutoID"
                                            CssFilePath="~/App_Themes/Aqua/{0}/styles.css" CssPostfix="Aqua"
                                            HorizontalAlign="NotSet" ImagePosition="Left"
                                            SpriteCssFilePath="~/App_Themes/Aqua/{0}/sprite.css" VerticalAlign="NotSet"
                                            Wrap="Default">
                                        </dx:ASPxButton>
                                    </td>

                                    <td></td>
                                    <td align="left">&nbsp;
                                    </td>
                                    <td align="left">&nbsp;
                                    </td>

                                    <td align="right" width="140px">
                                        <dx:ASPxButton ID="btnNuevo" runat="server" Text="Nuevo"
                                            Image-Url="~/Common/Images/new.ico"
                                            Width="130px"
                                            Image-Height="16px"
                                            Style="vertical-align: middle;" ClientIDMode="AutoID"
                                            CssFilePath="~/App_Themes/Aqua/{0}/styles.css" CssPostfix="Aqua"
                                            HorizontalAlign="NotSet" ImagePosition="Left"
                                            AutoPostBack="false"
                                            SpriteCssFilePath="~/App_Themes/Aqua/{0}/sprite.css" VerticalAlign="NotSet"
                                            Wrap="Default">
                                            <ClientSideEvents Click="function(s, e){ fnNuevaConsulta();}" />
                                        </dx:ASPxButton>
                                    </td>

                                    <td align="right" width="100px">
                                        <dx:ASPxButton ID="ASPxButton2" runat="server" Text="Guardar"
                                            AutoPostBack="false"
                                            Image-Url="~/Common/Images/save.ico"
                                            Image-Height="16px"
                                            Style="vertical-align: middle;" ClientIDMode="AutoID"
                                            CssFilePath="~/App_Themes/Aqua/{0}/styles.css" CssPostfix="Aqua"
                                            HorizontalAlign="NotSet" ImagePosition="Left"
                                            SpriteCssFilePath="~/App_Themes/Aqua/{0}/sprite.css" VerticalAlign="NotSet"
                                            Wrap="Default">
                                            <ClientSideEvents Click="function(s, e){ fnGrabarReporte();}" />
                                        </dx:ASPxButton>
                                    </td>
                                    <td align="right" width="155px">
                                        <dx:ASPxButton ID="btnGuardarComo" runat="server" Text="Guardar Como..."
                                            AutoPostBack="false"
                                            Width="140px"
                                            Image-Url="~/Common/Images/save.ico"
                                            Image-Height="16px"
                                            Style="vertical-align: middle;" ClientIDMode="AutoID"
                                            CssFilePath="~/App_Themes/Aqua/{0}/styles.css" CssPostfix="Aqua"
                                            HorizontalAlign="NotSet" ImagePosition="Left"
                                            SpriteCssFilePath="~/App_Themes/Aqua/{0}/sprite.css" VerticalAlign="NotSet"
                                            Wrap="Default">
                                            <ClientSideEvents Click="function(s, e){ fnGrabarReporteComo();}" />
                                        </dx:ASPxButton>
                                    </td>
                                    <td align="right" width="130px">
                                        <dx:ASPxButton ID="btnAbrir" runat="server" Text="Mis Reportes"
                                            Image-Url="~/Common/Images/open.ico"
                                            Image-Height="16px"
                                            Width="120px"
                                            Style="vertical-align: middle;" ClientIDMode="AutoID"
                                            CssFilePath="~/App_Themes/Aqua/{0}/styles.css" CssPostfix="Aqua"
                                            HorizontalAlign="NotSet" ImagePosition="Left"
                                            AutoPostBack="false"
                                            SpriteCssFilePath="~/App_Themes/Aqua/{0}/sprite.css" VerticalAlign="NotSet"
                                            Wrap="Default">
                                            <ClientSideEvents Click="function(s, e){ fnAbrirMisReportes();}" />
                                        </dx:ASPxButton>
                                    </td>


                                </tr>
                            </table>
                            <asp:Label ID="lblDatos" runat="server" Text="No existen datos" Font-Bold="True"
                                Font-Names="Verdana" Font-Size="8pt" ForeColor="#C00000" Visible="False"></asp:Label>
                            <hr style="color: white" width="100%" />
                        </td>
                    </tr>
                    <%--<tr>
                <td align="left">
                        <dx:ASPxButton ID="btnIrPlan" runat="server" Text="Lineas por Bolsa" 
                        AutoPostBack="false"
                        Image-Url="~/Common/Images/Accesos/SolicitudDispositivo.png"
                        Image-Height="16px"
                        Style="vertical-align: middle;" ClientIDMode="AutoID" 
                        CssFilePath="~/App_Themes/Aqua/{0}/styles.css" CssPostfix="Aqua" 
                        HorizontalAlign="NotSet" ImagePosition="Left" 
                        SpriteCssFilePath="~/App_Themes/Aqua/{0}/sprite.css" VerticalAlign="NotSet" 
                        Wrap="Default" Width="123px">
                        <ClientSideEvents Click="function(s, e){ fnNuevaConsulta_PorBolsa();}" /></dx:ASPxButton>
                      
                </td>
                <td  align="center" style="font-size:13px;font-weight:bold;">
                    Distribución por plan
                </td>
                <td align="right">
                        <dx:ASPxButton ID="ptnIrBolsa" runat="server" Text="Reporte General" 
                        AutoPostBack="false"
                        Image-Url= "~/Common/Images/Sumario/GEN.png"
                        Image-Height="16px"
                        Style="vertical-align: middle;" ClientIDMode="AutoID" 
                        CssFilePath="~/App_Themes/Aqua/{0}/styles.css" CssPostfix="Aqua" 
                        HorizontalAlign="NotSet" ImagePosition="Left" 
                        SpriteCssFilePath="~/App_Themes/Aqua/{0}/sprite.css" VerticalAlign="NotSet" 
                        Wrap="Default" Width="123px">
                        <ClientSideEvents Click="function(s, e){ fnNuevaConsulta_General();}" /></dx:ASPxButton>
                      
                </td>
            </tr>--%>
                </table>
                <div style="clear: both; margin-bottom: 10px; width: 99%;"></div>
                <%--        <table width="100%">
            <tr>
                <td align="center">--%>
                <%--                </td>
            </tr>
        </table>--%>
                <dx:ASPxPivotGrid ID="ASPxPivotGrid1" runat="server" OnHtmlCellPrepared="ASPxPivotGrid_HtmlCellPrepared"
                    DataSourceID="odsOrganizacion"
                    Width="99%" Style="text-align: center; font-weight: 700;"
                    Height="400px" ClientIDMode="AutoID">


                    <Fields>

                        <dx:PivotGridField Area="DataArea" AreaIndex="1" SummaryType="Count" Caption="Línea" FieldName="Linea" ID="fieldLinea" Options-ShowGrandTotal="False" />
                        <dx:PivotGridField Area="DataArea" AreaIndex="1" SummaryType="Count" Caption="Equipo" Visible="False" FieldName="IMEI" ID="fieldIMEI" Options-ShowGrandTotal="False" />
                        <dx:PivotGridField Area="DataArea" AreaIndex="2" SummaryType="Sum" Caption="Crédito" FieldName="monto" ID="fieldMonto" EmptyCellText="0" EmptyValueText="0" CellFormat-FormatType="Numeric" />

                        <dx:PivotGridField Area="RowArea" AreaIndex="6" Caption="Operador" SummaryType="Count" Visible="False" FieldName="Operador" ID="fieldOperador" Options-ShowGrandTotal="False" />
                        <dx:PivotGridField Area="RowArea" AreaIndex="1" Caption="Sucursal" SummaryType="Count" Visible="False" FieldName="NombreSucursal" ID="fieldNombreSucursal" Options-ShowGrandTotal="False" />
                        <dx:PivotGridField Area="RowArea" AreaIndex="2" Caption="Cód. Centro de Costo" SummaryType="Count" Visible="False" FieldName="CodCentroCosto" ID="fieldCodCentroCosto" Options-ShowGrandTotal="False" />
                        <dx:PivotGridField Area="RowArea" AreaIndex="3" Caption="Centro de Costo" SummaryType="Count" Visible="False" FieldName="CentroCosto" ID="fieldCentroCosto" Options-ShowGrandTotal="False" />
                        <dx:PivotGridField Area="RowArea" AreaIndex="4" Caption="Grupo Empleado" SummaryType="Count" Visible="False" FieldName="GrupoOrigen" ID="fieldGrupoOrigen" Options-ShowGrandTotal="False" />

                        <dx:PivotGridField Area="RowArea" AreaIndex="5" Caption="Nivel" SummaryType="Count" Visible="False" FieldName="Nivel" ID="fieldNivel" Options-ShowGrandTotal="False" />
                        <dx:PivotGridField Area="RowArea" AreaIndex="5" Caption="Cód.Organización" SummaryType="Count" Visible="False" FieldName="CodOrganizacion" ID="fieldCodOrganizacion" Options-ShowGrandTotal="False" />
                        <dx:PivotGridField Area="RowArea" AreaIndex="6" Caption="Organización" SummaryType="Count" Visible="False" FieldName="Organizacion" ID="fieldOrganizacion" Options-ShowGrandTotal="False" />
                        <dx:PivotGridField Area="RowArea" AreaIndex="7" Caption="Empleado" SummaryType="Count" Visible="False" FieldName="Empleado" ID="fieldEmpleado" Options-ShowGrandTotal="False" />

                        <dx:PivotGridField Area="RowArea" AreaIndex="9" Caption="Cuenta" SummaryType="Count" Visible="True" FieldName="NombreCuenta" ID="fieldNombreCuenta" />
                        <dx:PivotGridField Area="ColumnArea" AreaIndex="10" Caption="Plan" SummaryType="Count" Visible="True" FieldName="Plan" ID="fieldPlan" Options-ShowGrandTotal="False" />
                        <dx:PivotGridField Area="ColumnArea" AreaIndex="11" Caption="SubPlan" SummaryType="Count" Visible="True" FieldName="SubPlan" ID="fieldSubPlan" Options-ShowGrandTotal="False" />
                        <%--
                            <dx:PivotGridField Area="RowArea" AreaIndex="9" Caption="Plan" SummaryType="Count" Visible="False" FieldName="NombrePlan" ID="fieldNombrePlan"  />
                            <dx:PivotGridField Area="ColumnArea" AreaIndex="10" Caption="Sub Plan" SummaryType="Count" Visible="False" FieldName="NombreSubPlan" ID="fieldNombreSubPlan"  />--%>

                        <%--                            <dx:PivotGridField Area="RowArea" AreaIndex="1" Caption="MontoCuenta" SummaryType="Sum" Visible="False" FieldName="MontoCuenta" ID="fieldMontoCuenta"  />--%>

                        <dx:PivotGridField Area="RowArea" AreaIndex="8" SummaryType="Count" Caption="Tipo Línea" FieldName="TipoLinea" ID="fieldTipoLineaLinea" Options-ShowGrandTotal="False" />

                        <dx:PivotGridField Area="RowArea" AreaIndex="8" SummaryType="Count" Caption="Modelo Dispositivo" Visible="False" FieldName="ModeloDispositivo" ID="fieldModeloDispositivo" Options-ShowGrandTotal="False" />
                        <dx:PivotGridField Area="RowArea" AreaIndex="8" SummaryType="Count" Caption="Clasificación Modelo" Visible="False" FieldName="ClasificacionModeloDispositivo" ID="fieldClasificacionModeloDispositivo" Options-ShowGrandTotal="False" />

                        <dx:PivotGridField Area="RowArea" AreaIndex="10" SummaryType="Count"
                            Caption="Estado Línea" FieldName="EstadoProcesoLinea"
                            ID="fieldEstadoProcesoLinea" Options-ShowGrandTotal="False" />


                        <dx:PivotGridField Area="RowArea" AreaIndex="12" Caption="Tipo Asignación" SummaryType="Count" Visible="False" FieldName="TipoAsignacion" ID="fieldTipoAsignacion" />
                    </Fields>










                    <Styles CssFilePath="~/App_Themes/Office2010Silver/{0}/styles.css" CssPostfix="Office2010Silver">
                        <HeaderStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </HoverStyle>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </HeaderStyle>
                        <AreaStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </AreaStyle>
                        <FilterAreaStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </FilterAreaStyle>
                        <FieldValueStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </FieldValueStyle>
                        <FieldValueTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </FieldValueTotalStyle>
                        <FieldValueGrandTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </FieldValueGrandTotalStyle>
                        <CellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </CellStyle>
                        <TotalCellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </TotalCellStyle>
                        <GrandTotalCellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </GrandTotalCellStyle>
                        <CustomTotalCellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </CustomTotalCellStyle>
                        <FilterWindowStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </FilterWindowStyle>
                        <FilterItemsAreaStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </FilterItemsAreaStyle>
                        <FilterItemStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </HoverStyle>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </FilterItemStyle>
                        <FilterButtonStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </HoverStyle>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </FilterButtonStyle>
                        <FilterButtonPanelStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </HoverStyle>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </FilterButtonPanelStyle>
                        <MenuItemStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <DropDownButtonStyle>
                                <CheckedStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </CheckedStyle>
                                <SelectedStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </SelectedStyle>
                                <HoverStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </DropDownButtonStyle>
                            <CheckedStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </CheckedStyle>
                            <SelectedStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </SelectedStyle>
                            <HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </HoverStyle>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </MenuItemStyle>
                        <MenuStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <GutterBackgroundImage Repeat="Repeat"></GutterBackgroundImage>
                            <SeparatorBackgroundImage Repeat="Repeat"></SeparatorBackgroundImage>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </MenuStyle>
                        <CustomizationFieldsStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </HoverStyle>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </CustomizationFieldsStyle>
                        <CustomizationFieldsCloseButtonStyle Wrap="Default">
                            <HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </HoverStyle>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </CustomizationFieldsCloseButtonStyle>
                        <CustomizationFieldsContentStyle HorizontalAlign="NotSet" VerticalAlign="NotSet"
                            Wrap="Default">
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </CustomizationFieldsContentStyle>
                        <PrefilterPanelStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </HoverStyle>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </PrefilterPanelStyle>
                        <PrefilterPanelLinkStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </HoverStyle>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </PrefilterPanelLinkStyle>
                        <PrefilterPanelCheckBoxCellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet"
                            Wrap="Default">
                            <HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </HoverStyle>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </PrefilterPanelCheckBoxCellStyle>
                        <PrefilterPanelClearButtonCellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet"
                            Wrap="Default">
                            <HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </HoverStyle>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </PrefilterPanelClearButtonCellStyle>
                        <PrefilterPanelExpressionCellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet"
                            Wrap="Default">
                            <HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </HoverStyle>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </PrefilterPanelExpressionCellStyle>
                        <PrefilterPanelImageCellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </HoverStyle>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </PrefilterPanelImageCellStyle>
                        <PrefilterBuilderCloseButtonStyle Wrap="Default">
                            <HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </HoverStyle>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </PrefilterBuilderCloseButtonStyle>
                        <PrefilterBuilderHeaderStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </PrefilterBuilderHeaderStyle>
                        <PrefilterBuilderButtonAreaStyle HorizontalAlign="NotSet" VerticalAlign="NotSet"
                            Wrap="Default">
                            <HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </HoverStyle>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </PrefilterBuilderButtonAreaStyle>
                        <PrefilterBuilderMainAreaStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </HoverStyle>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </PrefilterBuilderMainAreaStyle>
                        <LoadingPanel HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default"
                            ImageSpacing="5px">
                        </LoadingPanel>
                        <LoadingDiv>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </LoadingDiv>
                    </Styles>
                    <OptionsDataField Area="None" FieldNaming="FieldName"></OptionsDataField>
                    <OptionsData DataFieldUnboundExpressionMode="Default"></OptionsData>
                    <BorderRight BorderStyle="NotSet"></BorderRight>
                    <BorderTop BorderStyle="NotSet"></BorderTop>
                    <OptionsView ShowHorizontalScrollBar="True" ShowFilterHeaders="True"></OptionsView>
                    <StylesPager>
                        <PageNumber HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default"
                            ForeColor="#3E4846">
                        </PageNumber>
                        <Summary HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default"
                            ForeColor="#1E395B">
                        </Summary>
                    </StylesPager>
                    <ImagesPrefilterControl>
                        <AddButton Align="NotSet">
                        </AddButton>
                        <AddButtonHot Align="NotSet">
                        </AddButtonHot>
                        <RemoveButton Align="NotSet">
                        </RemoveButton>
                        <RemoveButtonHot Align="NotSet">
                        </RemoveButtonHot>
                        <AddCondition Align="NotSet">
                        </AddCondition>
                        <AddGroup Align="NotSet">
                        </AddGroup>
                        <RemoveGroup Align="NotSet">
                        </RemoveGroup>
                        <GroupTypeAnd Align="NotSet">
                        </GroupTypeAnd>
                        <GroupTypeOr Align="NotSet">
                        </GroupTypeOr>
                        <GroupTypeNotAnd Align="NotSet">
                        </GroupTypeNotAnd>
                        <GroupTypeNotOr Align="NotSet">
                        </GroupTypeNotOr>
                        <OperationAnyOf Align="NotSet">
                        </OperationAnyOf>
                        <OperationBeginsWith Align="NotSet">
                        </OperationBeginsWith>
                        <OperationBetween Align="NotSet">
                        </OperationBetween>
                        <OperationContains Align="NotSet">
                        </OperationContains>
                        <OperationDoesNotContain Align="NotSet">
                        </OperationDoesNotContain>
                        <OperationDoesNotEqual Align="NotSet">
                        </OperationDoesNotEqual>
                        <OperationEndsWith Align="NotSet">
                        </OperationEndsWith>
                        <OperationEquals Align="NotSet">
                        </OperationEquals>
                        <OperationGreater Align="NotSet">
                        </OperationGreater>
                        <OperationGreaterOrEqual Align="NotSet">
                        </OperationGreaterOrEqual>
                        <OperationIsNotNull Align="NotSet">
                        </OperationIsNotNull>
                        <OperationIsNull Align="NotSet">
                        </OperationIsNull>
                        <OperationLess Align="NotSet">
                        </OperationLess>
                        <OperationLessOrEqual Align="NotSet">
                        </OperationLessOrEqual>
                        <OperationLike Align="NotSet">
                        </OperationLike>
                        <OperationNoneOf Align="NotSet">
                        </OperationNoneOf>
                        <OperationNotBetween Align="NotSet">
                        </OperationNotBetween>
                        <OperationNotLike Align="NotSet">
                        </OperationNotLike>
                        <LoadingPanel Align="NotSet">
                        </LoadingPanel>
                    </ImagesPrefilterControl>
                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                    <StylesPrint Cell-GradientMode="Horizontal" FieldHeader-GradientMode="Horizontal"
                        TotalCell-GradientMode="Horizontal" GrandTotalCell-GradientMode="Horizontal"
                        CustomTotalCell-GradientMode="Horizontal" FieldValue-GradientMode="Horizontal"
                        FieldValueTotal-GradientMode="Horizontal" FieldValueGrandTotal-GradientMode="Horizontal"
                        Lines-GradientMode="Horizontal"></StylesPrint>
                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                    <Border BorderStyle="NotSet"></Border>
                    <OptionsPager NumericButtonCount="15">
                        <AllButton>
                            <Image Align="NotSet">
                            </Image>
                        </AllButton>
                        <FirstPageButton>
                            <Image Align="NotSet">
                            </Image>
                        </FirstPageButton>
                        <LastPageButton>
                            <Image Align="NotSet">
                            </Image>
                        </LastPageButton>
                        <NextPageButton>
                            <Image Align="NotSet">
                            </Image>
                        </NextPageButton>
                        <PrevPageButton>
                            <Image Align="NotSet">
                            </Image>
                        </PrevPageButton>
                        <Summary AllPagesText="Página: {0} - {1} ({2} items)" Text="Página {0} de {1} ({2} items)"></Summary>
                    </OptionsPager>
                    <OptionsChartDataSource
                        FieldValuesProvideMode="DisplayText"></OptionsChartDataSource>
                    <Images SpriteCssFilePath="~/App_Themes/Office2010Silver/{0}/sprite.css">
                        <FieldValueCollapsed Align="NotSet">
                        </FieldValueCollapsed>
                        <FieldValueExpanded Align="NotSet">
                        </FieldValueExpanded>
                        <HeaderFilter Align="NotSet">
                        </HeaderFilter>
                        <HeaderActiveFilter Align="NotSet">
                        </HeaderActiveFilter>
                        <HeaderSortDown Align="NotSet">
                        </HeaderSortDown>
                        <HeaderSortUp Align="NotSet">
                        </HeaderSortUp>
                        <FilterWindowSizeGrip Align="NotSet">
                        </FilterWindowSizeGrip>
                        <CustomizationFieldsClose Align="NotSet">
                        </CustomizationFieldsClose>
                        <DragArrowDown Align="NotSet">
                        </DragArrowDown>
                        <DragArrowUp Align="NotSet">
                        </DragArrowUp>
                        <DragHideField Align="NotSet">
                        </DragHideField>
                        <DataHeadersPopup Align="NotSet">
                        </DataHeadersPopup>
                        <GroupSeparator Align="NotSet">
                        </GroupSeparator>
                        <SortByColumn Align="NotSet">
                        </SortByColumn>
                        <PrefilterButton Align="NotSet">
                        </PrefilterButton>
                        <CustomizationFieldsBackground Url="~/App_Themes/Office2010Silver/PivotGrid/pcHBack.png">
                        </CustomizationFieldsBackground>
                        <LoadingPanel Url="~/App_Themes/Office2010Silver/PivotGrid/Loading.gif"></LoadingPanel>
                    </Images>
                    <StylesFilterControl>
                        <Table HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </HoverStyle>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </Table>
                        <PropertyName HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </HoverStyle>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </PropertyName>
                        <GroupType HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </HoverStyle>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </GroupType>
                        <Operation HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </HoverStyle>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </Operation>
                        <Value HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </HoverStyle>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </Value>
                        <ImageButton HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                            <HoverStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </HoverStyle>
                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                            <Border BorderStyle="NotSet"></Border>
                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                            <BorderTop BorderStyle="NotSet"></BorderTop>
                            <BorderRight BorderStyle="NotSet"></BorderRight>
                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        </ImageButton>
                    </StylesFilterControl>
                    <OptionsLoadingPanel Text="Cargando&amp;hellip;">
                        <Image Url="~/App_Themes/Office2010Silver/PivotGrid/Loading.gif">
                        </Image>
                        <Style ImageSpacing="5px">
                            </Style>
                    </OptionsLoadingPanel>
                    <StylesEditors ButtonEditCellSpacing="0">
                    </StylesEditors>
                    <ImagesEditors>
                        <CalendarPrevYear Align="NotSet">
                        </CalendarPrevYear>
                        <CalendarPrevMonth Align="NotSet">
                        </CalendarPrevMonth>
                        <CalendarNextMonth Align="NotSet">
                        </CalendarNextMonth>
                        <CalendarNextYear Align="NotSet">
                        </CalendarNextYear>
                        <CalendarFastNavPrevYear Align="NotSet">
                        </CalendarFastNavPrevYear>
                        <CalendarFastNavNextYear Align="NotSet">
                        </CalendarFastNavNextYear>
                        <CheckBoxChecked Align="NotSet">
                        </CheckBoxChecked>
                        <CheckBoxUnchecked Align="NotSet">
                        </CheckBoxUnchecked>
                        <CheckBoxUndefined Align="NotSet">
                        </CheckBoxUndefined>
                        <RadioButtonChecked Align="NotSet">
                        </RadioButtonChecked>
                        <RadioButtonUnchecked Align="NotSet">
                        </RadioButtonUnchecked>
                        <RadioButtonUndefined Align="NotSet">
                        </RadioButtonUndefined>
                        <ButtonEditEllipsis Align="NotSet">
                        </ButtonEditEllipsis>
                        <DropDownEditDropDown Align="NotSet">
                        </DropDownEditDropDown>
                        <ImageEmpty Align="NotSet">
                        </ImageEmpty>
                        <ListEditItem Align="NotSet">
                        </ListEditItem>
                        <SpinEditIncrement Align="NotSet">
                        </SpinEditIncrement>
                        <SpinEditDecrement Align="NotSet">
                        </SpinEditDecrement>
                        <SpinEditLargeIncrement Align="NotSet">
                        </SpinEditLargeIncrement>
                        <SpinEditLargeDecrement Align="NotSet">
                        </SpinEditLargeDecrement>
                        <LoadingPanel Align="NotSet">
                        </LoadingPanel>
                    </ImagesEditors>



                </dx:ASPxPivotGrid>
                <br />

                <%-- </dx:ASPxGridViewExporter>--%>
                <dx:ASPxPivotGridExporter ID="ASPxPivotGridExporter1"
                    OnCustomExportCell="ASPxPivotGridExporter1_CustomExportCell"
                    runat="server" ASPxPivotGridID="ASPxPivotGrid1" />

                <asp:ObjectDataSource ID="odsOrganizacion" runat="server" TypeName="VisualSoft.Suite80.BL.BL_GEN_Organizacion"
                    SelectMethod="ListarPivotOrganizacional_PorPlan"
                    OldValuesParameterFormatString="original_{0}">
                    <SelectParameters>
                        <asp:ControlParameter PropertyName="Value" Type="String" DefaultValue="0" Name="_idCliente" ControlID="hydCodEmp"></asp:ControlParameter>
                    </SelectParameters>
                </asp:ObjectDataSource>

                <asp:HiddenField ID="hydPeriodo" runat="server" />
                <asp:HiddenField ID="hydCodEmp" runat="server" />
                <asp:HiddenField ID="hydwhere" runat="server" />
                <asp:HiddenField ID="hydCodInt" runat="server" />
                <asp:HiddenField ID="HydFormato" runat="server" />
            </div>

            <asp:DropDownList ID="ddlRegionDesde" runat="server" AutoPostBack="true" Font-Names="Verdana"
                Font-Size="11px" Visible="false" Width="100px" Height="100%">
            </asp:DropDownList>
            <asp:DropDownList ID="ddlRegionHacia" runat="server" AutoPostBack="true" Font-Names="Verdana"
                Font-Size="11px" Visible="false" Width="100px">
            </asp:DropDownList>

            <div id="dvArea" style="display: none; padding: 0px; margin: 0px;">
                <iframe id="ifArea" width="410" height="300" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
            </div>

            <div id="dvNombreReporte" style="display: none; padding: 0px; margin: 0px;">
                <br />
                <table width="100%" border="0">
                    <tr>
                        <td width="15px"></td>
                        <td>
                            <asp:Label ID="lblTituloNombreReporte" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td width="15px"></td>
                        <td>
                            <asp:TextBox ID="txtplantilla" Width="350px" runat="server"></asp:TextBox>
                        </td>
                    </tr>
                </table>

            </div>

            <input type="hidden" id="hdTipo" runat="server" />
            <input type="hidden" id="hdCodReporte" runat="server" />

            <%--<div id="divMsgConfirmacion" style="display:none;">
        <span class="ui-icon ui-icon-alert" style="float:left;"></span>
        <asp:Label ID="lblMensajeConfirmacion" runat="server" Text=""></asp:Label>
    </div>--%>


            <%--      </ContentTemplate>
    </asp:UpdatePanel>
    
<asp:UpdateProgress ID="Up1" runat="Server" AssociatedUpdatePanelID="UpdatePanel1">
    <ProgressTemplate>
        <span style="background-color:Yellow;"><img src="/images/wait.gif" alt="Please wait" /> Espere un momento por favor...</span>
    </ProgressTemplate>
</asp:UpdateProgress>--%>
        </div>
    </form>
</body>

</html>
