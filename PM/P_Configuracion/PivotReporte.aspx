<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Configuracion_Default" Codebehind="PivotReporte.aspx.vb" %>

<%--<%@ Register Assembly="DevExpress.Web.ASPxEditors.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=B88D1754D700E49A"" Namespace="DevExpress.Web.ASPxEditors" TagPrefix="dx" %>--%>
<%@ Register Assembly="DevExpress.Web.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=B88D1754D700E49A" Namespace="DevExpress.Web.ASPxEditors" TagPrefix="dx" %>
<%--<%@ Register Assembly="DevExpress.Web.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=B88D1754D700E49A" Namespace="DevExpress.Web.ASPxPanel" TagPrefix="dx" %>--%>
<%@ Register Assembly="DevExpress.Web.ASPxPivotGrid.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=B88D1754D700E49A" Namespace="DevExpress.Web.ASPxPivotGrid" TagPrefix="dx" %>
<%--<%@ Register assembly="DevExpress.XtraPivotGrid.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.XtraPivotGrid.Export" tagprefix="dx" %>--%>
<%@ Register Assembly="DevExpress.XtraCharts.v12.2.Web, Version=12.2.18.0, Culture=neutral, PublicKeyToken=B88D1754D700E49A" Namespace="DevExpress.XtraCharts.Web" TagPrefix="dxchartsui" %>
<%@ Register Assembly="DevExpress.XtraCharts.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=B88D1754D700E49A" Namespace="DevExpress.XtraCharts" TagPrefix="cc1" %>
<%@ Register TagPrefix="dx" Namespace="DevExpress.Web.ASPxPivotGrid.Export" Assembly="DevExpress.Web.ASPxPivotGrid.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
   <title></title>
    <link href="../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
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
    <script src="../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="PivotReporte.js" type="text/javascript"></script>
</head>


<body style="background: #FFFFFF;">
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfCodigoEmpleado" runat="server" />
<%--    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <asp:UpdatePanel ID="UpdatePanel1" runat="server" UpdateMode="Always" >
      <ContentTemplate>--%>
    <input id="txtcargando" type="text" name="name" value="alert" style="display:none;" />
<div class="dvPanel">     
    <%--<div class="pos_titulos_generales" style="font-size:13px;font-weight:bold;">
        
    </div>--%>

    <li class="list-header-main">
        Reportes Din&aacute;micos &nbsp; <asp:Label ID="lblNombreReporte" runat="server" Text=" - [Nuevo Reporte]" Visible="true" ></asp:Label>
    </li>

    <br />
    <table border="0" style="width: 95%" cellpadding="0" cellspacing="0" align="center">
    </table>
    <div id="Contenedor" class="style1" style="width:99%;">
        <table border="0" style="width: 99%" cellpadding="0" cellspacing="0" align="left" >
            <tr height="10">
                <td colspan="2">
                </td>
            </tr>
            <tr style="font-size: 12pt" height="50">
                <td align="center" width="10%" colspan="2" style="background-repeat: repeat">


                    <table width="100%" border="0" style="font-size: 11px; color: #1E395B; font-weight: bold" >
                      <tr>
                        <td  width="200px" align="left">
                          
                        </td>
                        <td align="left" width="90px" >
                          Fecha Inicial:&nbsp;
                        </td>
                        <td width="5px">
                        </td>
                        <td align="left" width="90px" >
                            Fecha Final:&nbsp;
                        </td>
                        <td width="15px">
                        </td>
                        <td >
                        </td>
                        <td align="right" width="90px">                         
                        </td>
                        <td align="right" width="135px">
                        </td>
                        <td align="right" width="115px">                         
                        </td>

                      </tr>

                      <tr>

                        <td align="left">
                          <dx:ASPxButton ID="ASPxButton1" Width="180px" runat="server" AutoPostBack="False" ClientInstanceName="button"
                                    style="font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;"
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
	                                ASPxPivotGrid1.ChangeCustomizationFieldsVisibility();}" /><BackgroundImage Repeat="Repeat"></BackgroundImage>
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
                        
                        <td align="left" >
                            <asp:TextBox ID="txtDiaInicial"  onchange="javascript:fnCargarGrafico();" 
                                Height="14px" Font-Size="12px" runat="server" Width="75px" CssClass="txtFecha"></asp:TextBox>
                        </td>
                        <td>
                        </td>
                        <td align="left">
                            <asp:TextBox ID="txtDiaFinal" onchange="javascript:fnCargarGrafico();"  
                                Height="14px" Font-Size="12px" runat="server" Width="75px" CssClass="txtFecha"></asp:TextBox>
                        </td>
                        <td align="left">
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

                        <td align="right" >
                          <dx:ASPxButton ID="btnNuevo" runat="server" Text="Nuevo" 
                                    Image-Url="~/Common/Images/new.ico"
                                    Width="150px"
                                    Image-Height="16px"
                                    Style="vertical-align: middle;" ClientIDMode="AutoID" 
                                    CssFilePath="~/App_Themes/Aqua/{0}/styles.css" CssPostfix="Aqua" 
                                    HorizontalAlign="NotSet" ImagePosition="Left" 
                                    AutoPostBack="false" 
                                    SpriteCssFilePath="~/App_Themes/Aqua/{0}/sprite.css" VerticalAlign="NotSet" 
                                    Wrap="Default">
                                    <ClientSideEvents Click="function(s, e){ fnNuevaConsulta();}" /></dx:ASPxButton>
                        </td>

                        <td align="right">
                          <dx:ASPxButton ID="ASPxButton2" runat="server" Text="Guardar" 
                                AutoPostBack="false"
                                Image-Url="~/Common/Images/save.ico"
                                Image-Height="16px"
                                Style="vertical-align: middle;" ClientIDMode="AutoID" 
                                CssFilePath="~/App_Themes/Aqua/{0}/styles.css" CssPostfix="Aqua" 
                                HorizontalAlign="NotSet" ImagePosition="Left" 
                                SpriteCssFilePath="~/App_Themes/Aqua/{0}/sprite.css" VerticalAlign="NotSet" 
                                Wrap="Default">
                                <ClientSideEvents Click="function(s, e){ fnGrabarReporte();}" /></dx:ASPxButton>
                        </td>
                        <td align="right">
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
                                <ClientSideEvents Click="function(s, e){ fnGrabarReporteComo();}" /></dx:ASPxButton>
                        </td>
                        <td align="right" >
                          <dx:ASPxButton ID="btnAbrir" runat="server" Text="Mis Reportes" 
                                    Image-Url="~/Common/Images/open.ico"
                                    Image-Height="16px"
                                    Width="125px"
                                    Style="vertical-align: middle;" ClientIDMode="AutoID" 
                                    CssFilePath="~/App_Themes/Aqua/{0}/styles.css" CssPostfix="Aqua" 
                                    HorizontalAlign="NotSet" ImagePosition="Left" 
                                    AutoPostBack="false" 
                                    SpriteCssFilePath="~/App_Themes/Aqua/{0}/sprite.css" VerticalAlign="NotSet" 
                                    Wrap="Default">
                                    <ClientSideEvents Click="function(s, e){ fnAbrirMisReportes();}" /></dx:ASPxButton>
                        </td>
                        

                      </tr>
                    </table>
                    <asp:Label ID="lblDatos" runat="server" Text="No existen datos" Font-Bold="True"
                              Font-Names="Verdana" Font-Size="8pt" ForeColor="#C00000" Visible="False"></asp:Label>
                    <hr style="color: white" width="100%" />
                </td>
            </tr>
        </table>
        <div style="clear:both; margin-bottom:10px; width:99%;"></div>
<%--        <table width="100%">
            <tr>
                <td align="center">--%>
<%--                </td>
            </tr>
        </table>--%>
<%--        <dx:ASPxPivotGrid ID="ASPxPivotGrid1" runat="server">
        </dx:ASPxPivotGrid>--%>
                            <dx:ASPxPivotGrid runat="server" 
                        OnHtmlCellPrepared="ASPxPivotGrid_HtmlCellPrepared"
                        DataSourceID="odsSumario" 
                        Width="99%" ID="ASPxPivotGrid1" OnPreRender="ASPxPivotGrid_PreRender" Style="text-align: center;
                        font-weight: 700;" Height="400px" ClientIDMode="AutoID" 
                        EnableCallBacks="False">
                        <BorderBottom BorderStyle="NotSet"></BorderBottom>
                        <Fields>

                            <dx:PivotGridField ID="fieldTipoLLamada" AllowedAreas="All" FieldName="TIPOLLAMADA" AreaIndex="0" Area="RowArea" Visible="True">
                                <CellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default" CssClass="dxpgControl">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </CellStyle>
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
                                <ValueStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueStyle>
                                <ValueTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueTotalStyle>
                            </dx:PivotGridField>
                            <dx:PivotGridField FieldName="FECHA_LARGA" Caption="FECHA" ID="fieldFECHA" AreaIndex="1"
                                Area="RowArea" CellFormat-FormatString="ddMMyyyy" CellFormat-FormatType="DateTime"
                                EmptyCellText="0" EmptyValueText="0">
                                <CellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default" CssClass="dxpgControl">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </CellStyle>
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
                                <ValueStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueStyle>
                                <ValueTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueTotalStyle>
                            </dx:PivotGridField>
                            <dx:PivotGridField FieldName="HORA_STRING" Caption="HORA" ID="fieldHORA" AreaIndex="11"
                                Visible="False">
                                <CellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </CellStyle>
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
                                <ValueStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueStyle>
                                <ValueTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueTotalStyle>
                            </dx:PivotGridField>
                            <dx:PivotGridField FieldName="NIVEL" ID="fieldNIVEL" AreaIndex="10" Visible="False">
                                <CellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </CellStyle>
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
                                <ValueStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueStyle>
                                <ValueTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueTotalStyle>
                            </dx:PivotGridField>
                            <dx:PivotGridField FieldName="NOMBREORG" Caption="AREA" ID="fieldNOMORG" AreaIndex="10"
                                Visible="False">
                                <CellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </CellStyle>
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
                                <ValueStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueStyle>
                                <ValueTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueTotalStyle>
                            </dx:PivotGridField>
                            <dx:PivotGridField FieldName="NOMCCO" Caption="C. COSTO" ID="fieldNOMCCO" AreaIndex="8"
                                Visible="False">
                                <CellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </CellStyle>
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
                                <ValueStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueStyle>
                                <ValueTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueTotalStyle>
                            </dx:PivotGridField>
                            <dx:PivotGridField FieldName="NOMSUC" Caption="SUCURSAL" ID="fieldNOMSUC" AreaIndex="6"
                                Visible="False">
                                <CellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </CellStyle>
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
                                <ValueStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueStyle>
                                <ValueTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueTotalStyle>
                            </dx:PivotGridField>
                            <dx:PivotGridField FieldName="CODEXT" Caption="LÍNEA" ID="fieldCODEXT" AreaIndex="5"
                                Visible="False">
                                <CellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </CellStyle>
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
                                <ValueStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueStyle>
                                <ValueTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueTotalStyle>
                            </dx:PivotGridField>
                            <dx:PivotGridField FieldName="NOMSRV" Caption="SERVICIO" ID="fieldCODSRV" AreaIndex="3"
                                Visible="False">
                                <CellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </CellStyle>
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
                                <ValueStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueStyle>
                                <ValueTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueTotalStyle>
                            </dx:PivotGridField>
                            <dx:PivotGridField FieldName="NOMCIA" Caption="OPERADOR" ID="fieldCODCIA" AreaIndex="2"
                                Visible="False">
                                <CellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </CellStyle>
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
                                <ValueStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueStyle>
                                <ValueTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueTotalStyle>
                            </dx:PivotGridField>
                            <dx:PivotGridField FieldName="NOMEMPLEADO" Caption="EMPLEADO" ID="fieldNOMEMP" Visible="False"
                                AreaIndex="0">
                                <CellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </CellStyle>
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
                                <ValueStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueStyle>
                                <ValueTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueTotalStyle>
                            </dx:PivotGridField>
                            <dx:PivotGridField FieldName="GLOBAL" ID="fieldCODGLO" Area="ColumnArea" AreaIndex="0">
                                <CellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </CellStyle>
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
                                <ValueStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueStyle>
                                <ValueTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueTotalStyle>
                            </dx:PivotGridField>
                            <dx:PivotGridField FieldName="LLAMADAS" ID="fieldCODLLA" Area="DataArea" AreaIndex="0"
                                CellFormat-FormatType="Numeric" EmptyCellText="0" EmptyValueText="0">
                                <CellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </CellStyle>
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
                                <ValueStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueStyle>
                                <ValueTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueTotalStyle>
                            </dx:PivotGridField>
                            <dx:PivotGridField FieldName="DURACION" Caption="DURACION" ID="fieldCODDUR" Area="DataArea"
                                AreaIndex="1" CellFormat-FormatType="Numeric" EmptyCellText="0" EmptyValueText="0">
                                <CellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </CellStyle>
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
                                <ValueStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueStyle>
                                <ValueTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueTotalStyle>
                            </dx:PivotGridField>
                            <dx:PivotGridField FieldName="COSTO" ID="fieldCODCOST" Area="DataArea" AreaIndex="2"
                                EmptyCellText="0" EmptyValueText="0" CellFormat-FormatType="Numeric">
                                <CellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </CellStyle>
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
                                <ValueStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueStyle>
                                <ValueTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </ValueTotalStyle>
                            </dx:PivotGridField>
<%--                            <dx:PivotGridField ID="fieldRUTA" AllowedAreas="All" Area="FilterArea" AreaIndex="0"
                                Caption="RUTA" CellFormat-FormatType="None" FieldName="RUTA" GrandTotalCellFormat-FormatType="None"
                                GroupInterval="Default" KPIGraphic="ServerDefined" Options-AllowDrag="Default"
                                Options-AllowDragInCustomizationForm="Default" Options-AllowExpand="Default"
                                Options-AllowFilter="Default" Options-AllowSort="Default" Options-AllowSortBySummary="Default"
                                SortBySummaryInfo-SummaryType="Sum" SortMode="Default" SortOrder="Ascending"
                                SummaryDisplayType="Default" SummaryType="Sum" TopValueType="Absolute" TotalCellFormat-FormatType="None"
                                TotalsVisibility="AutomaticTotals" TotalValueFormat-FormatType="None" UnboundType="Bound"
                                UseNativeFormat="Default" ValueFormat-FormatType="None" Visible="true">
                                <CellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></CellStyle>
                                <HeaderStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <HoverStyle>
                                        <BackgroundImage Repeat="Repeat" />
                                        <Border BorderStyle="NotSet" />
                                        <BorderLeft BorderStyle="NotSet" />
                                        <BorderTop BorderStyle="NotSet" />
                                        <BorderRight BorderStyle="NotSet" />
                                        <BorderBottom BorderStyle="NotSet" />
                                    <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></HoverStyle>
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></HeaderStyle>
                                <ValueStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></ValueStyle>
                                <ValueTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></ValueTotalStyle>
                            </dx:PivotGridField>
--%>                            
    <dx:PivotGridField ID="fieldMES" AllowedAreas="All" Area="ColumnArea" AreaIndex="1"
                                Caption="MES" CellFormat-FormatType="None" FieldName="MES" GrandTotalCellFormat-FormatType="None"
                                GroupInterval="Default" KPIGraphic="ServerDefined" Options-AllowDrag="Default"
                                Options-AllowDragInCustomizationForm="Default" Options-AllowExpand="Default"
                                Options-AllowFilter="Default" Options-AllowSort="Default" Options-AllowSortBySummary="Default"
                                SortBySummaryInfo-SummaryType="Sum" SortMode="Default" SortOrder="Ascending"
                                SummaryDisplayType="Default" SummaryType="Sum" TopValueType="Absolute" TotalCellFormat-FormatType="None"
                                TotalsVisibility="AutomaticTotals" TotalValueFormat-FormatType="None" UnboundType="Bound"
                                UseNativeFormat="Default" ValueFormat-FormatType="None" Visible="False">
                                <CellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></CellStyle>
                                <HeaderStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <HoverStyle>
                                        <BackgroundImage Repeat="Repeat" />
                                        <Border BorderStyle="NotSet" />
                                        <BorderLeft BorderStyle="NotSet" />
                                        <BorderTop BorderStyle="NotSet" />
                                        <BorderRight BorderStyle="NotSet" />
                                        <BorderBottom BorderStyle="NotSet" />
                                    <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></HoverStyle>
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></HeaderStyle>
                                <ValueStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></ValueStyle>
                                <ValueTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></ValueTotalStyle>
                            </dx:PivotGridField>
                            <dx:PivotGridField ID="fieldYEAR" AllowedAreas="All" Area="FilterArea" AreaIndex="1"
                                Caption="AÑO" CellFormat-FormatType="None" FieldName="YEAR" GrandTotalCellFormat-FormatType="None"
                                GroupInterval="Default" KPIGraphic="ServerDefined" Options-AllowDrag="Default"
                                Options-AllowDragInCustomizationForm="Default" Options-AllowExpand="Default"
                                Options-AllowFilter="Default" Options-AllowSort="Default" Options-AllowSortBySummary="Default"
                                SortBySummaryInfo-SummaryType="Sum" SortMode="Default" SortOrder="Ascending"
                                SummaryDisplayType="Default" SummaryType="Sum" TopValueType="Absolute" TotalCellFormat-FormatType="None"
                                TotalsVisibility="AutomaticTotals" TotalValueFormat-FormatType="None" UnboundType="Bound"
                                UseNativeFormat="Default" ValueFormat-FormatType="None" Visible="False">
                                <CellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></CellStyle>
                                <HeaderStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <HoverStyle>
                                        <BackgroundImage Repeat="Repeat" />
                                        <Border BorderStyle="NotSet" />
                                        <BorderLeft BorderStyle="NotSet" />
                                        <BorderTop BorderStyle="NotSet" />
                                        <BorderRight BorderStyle="NotSet" />
                                        <BorderBottom BorderStyle="NotSet" />
                                    <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></HoverStyle>
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></HeaderStyle>
                                <ValueStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></ValueStyle>
                                <ValueTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></ValueTotalStyle>
                            </dx:PivotGridField>
                            <dx:PivotGridField ID="fieldNUMERO" AllowedAreas="All" Area="FilterArea" AreaIndex="1"
                                Caption="NUMERO" CellFormat-FormatType="None" FieldName="NUMERO" GrandTotalCellFormat-FormatType="None"
                                GroupInterval="Default" KPIGraphic="ServerDefined" Options-AllowDrag="Default"
                                Options-AllowDragInCustomizationForm="Default" Options-AllowExpand="Default"
                                Options-AllowFilter="Default" Options-AllowSort="Default" Options-AllowSortBySummary="Default"
                                SortBySummaryInfo-SummaryType="Sum" SortMode="Default" SortOrder="Ascending"
                                SummaryDisplayType="Default" SummaryType="Sum" TopValueType="Absolute" TotalCellFormat-FormatType="None"
                                TotalsVisibility="AutomaticTotals" TotalValueFormat-FormatType="None" UnboundType="Bound"
                                UseNativeFormat="Default" ValueFormat-FormatType="None" Visible="False">
                                <CellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></CellStyle>
                                <HeaderStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <HoverStyle>
                                        <BackgroundImage Repeat="Repeat" />
                                        <Border BorderStyle="NotSet" />
                                        <BorderLeft BorderStyle="NotSet" />
                                        <BorderTop BorderStyle="NotSet" />
                                        <BorderRight BorderStyle="NotSet" />
                                        <BorderBottom BorderStyle="NotSet" />
                                    <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></HoverStyle>
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></HeaderStyle>
                                <ValueStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></ValueStyle>
                                <ValueTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></ValueTotalStyle>
                            </dx:PivotGridField>
                            <dx:PivotGridField ID="fieldNOMCIU" AllowedAreas="All" Area="FilterArea" AreaIndex="0"
                                Caption="CIUDAD" CellFormat-FormatType="None" FieldName="NOMCIU" GrandTotalCellFormat-FormatType="None"
                                GroupInterval="Default" KPIGraphic="ServerDefined" Options-AllowDrag="Default"
                                Options-AllowDragInCustomizationForm="Default" Options-AllowExpand="Default"
                                Options-AllowFilter="Default" Options-AllowSort="Default" Options-AllowSortBySummary="Default"
                                SortBySummaryInfo-SummaryType="Sum" SortMode="Default" SortOrder="Ascending"
                                SummaryDisplayType="Default" SummaryType="Sum" TopValueType="Absolute" TotalCellFormat-FormatType="None"
                                TotalsVisibility="AutomaticTotals" TotalValueFormat-FormatType="None" UnboundType="Bound"
                                UseNativeFormat="Default" ValueFormat-FormatType="None" Visible="False">
                                <CellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></CellStyle>
                                <HeaderStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <HoverStyle>
                                        <BackgroundImage Repeat="Repeat" />
                                        <Border BorderStyle="NotSet" />
                                        <BorderLeft BorderStyle="NotSet" />
                                        <BorderTop BorderStyle="NotSet" />
                                        <BorderRight BorderStyle="NotSet" />
                                        <BorderBottom BorderStyle="NotSet" />
                                    <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></HoverStyle>
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></HeaderStyle>
                                <ValueStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></ValueStyle>
                                <ValueTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></ValueTotalStyle>
                            </dx:PivotGridField>
                            <dx:PivotGridField ID="fieldNOMPAI" AllowedAreas="All" Area="FilterArea" AreaIndex="0"
                                Caption="PAIS" CellFormat-FormatType="None" FieldName="NOMPAI" GrandTotalCellFormat-FormatType="None"
                                GroupInterval="Default" KPIGraphic="ServerDefined" Options-AllowDrag="Default"
                                Options-AllowDragInCustomizationForm="Default" Options-AllowExpand="Default"
                                Options-AllowFilter="Default" Options-AllowSort="Default" Options-AllowSortBySummary="Default"
                                SortBySummaryInfo-SummaryType="Sum" SortMode="Default" SortOrder="Ascending"
                                SummaryDisplayType="Default" SummaryType="Sum" TopValueType="Absolute" TotalCellFormat-FormatType="None"
                                TotalsVisibility="AutomaticTotals" TotalValueFormat-FormatType="None" UnboundType="Bound"
                                UseNativeFormat="Default" ValueFormat-FormatType="None" Visible="False">
                                <CellStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></CellStyle>
                                <HeaderStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <HoverStyle>
                                        <BackgroundImage Repeat="Repeat" />
                                        <Border BorderStyle="NotSet" />
                                        <BorderLeft BorderStyle="NotSet" />
                                        <BorderTop BorderStyle="NotSet" />
                                        <BorderRight BorderStyle="NotSet" />
                                        <BorderBottom BorderStyle="NotSet" />
                                    <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></HoverStyle>
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></HeaderStyle>
                                <ValueStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></ValueStyle>
                                <ValueTotalStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                    <BackgroundImage Repeat="Repeat" />
                                    <Border BorderStyle="NotSet" />
                                    <BorderLeft BorderStyle="NotSet" />
                                    <BorderTop BorderStyle="NotSet" />
                                    <BorderRight BorderStyle="NotSet" />
                                    <BorderBottom BorderStyle="NotSet" />
                                <BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /><BackgroundImage Repeat="Repeat" /><Border BorderStyle="NotSet" /><BorderLeft BorderStyle="NotSet" /><BorderTop BorderStyle="NotSet" /><BorderRight BorderStyle="NotSet" /><BorderBottom BorderStyle="NotSet" /></ValueTotalStyle>
                            </dx:PivotGridField>
                        </Fields>
                        <ClientSideEvents CustomizationFieldsVisibleChanged="function(s, e) {
	if(button != null &amp;&amp; ASPxPivotGrid1 != null) {
		button.SetText((ASPxPivotGrid1.GetCustomizationFieldsVisibility() ? &quot;Ocultar&quot; : &quot;Mostrar&quot;) + &quot; Lista de Campos&quot;);
	}
}" AfterCallback="function(s, e) {
	if( s.cpLayout ){
		miChart.PerformCallback();
	}
}" />
                        <ClientSideEvents CustomizationFieldsVisibleChanged="function(s, e) {
	if(button != null &amp;&amp; ASPxPivotGrid1 != null) {
		button.SetText((ASPxPivotGrid1.GetCustomizationFieldsVisibility() ? &quot;Ocultar&quot; : &quot;Mostrar&quot;) + &quot; Lista de Campos&quot;);
	}
}" /><ClientSideEvents CustomizationFieldsVisibleChanged="function(s, e) {
	if(button != null &amp;&amp; ASPxPivotGrid1 != null) {
		button.SetText((ASPxPivotGrid1.GetCustomizationFieldsVisibility() ? &quot;Ocultar&quot; : &quot;Mostrar&quot;) + &quot; Lista de Campos&quot;);
	}
}" /><ClientSideEvents CustomizationFieldsVisibleChanged="function(s, e) {
	if(button != null &amp;&amp; ASPxPivotGrid1 != null) {
		button.SetText((ASPxPivotGrid1.GetCustomizationFieldsVisibility() ? &quot;Ocultar&quot; : &quot;Mostrar&quot;) + &quot; Lista de Campos&quot;);
	}
}" /><ClientSideEvents CustomizationFieldsVisibleChanged="function(s, e) {
	if(button != null &amp;&amp; ASPxPivotGrid1 != null) {
		button.SetText((ASPxPivotGrid1.GetCustomizationFieldsVisibility() ? &quot;Ocultar&quot; : &quot;Mostrar&quot;) + &quot; Lista de Campos&quot;);
	}
}" /><ClientSideEvents CustomizationFieldsVisibleChanged="function(s, e) {
	if(button != null &amp;&amp; ASPxPivotGrid1 != null) {
		button.SetText((ASPxPivotGrid1.GetCustomizationFieldsVisibility() ? &quot;Ocultar&quot; : &quot;Mostrar&quot;) + &quot; Lista de Campos&quot;);
	}
}" /><ClientSideEvents CustomizationFieldsVisibleChanged="function(s, e) {
	if(button != null &amp;&amp; ASPxPivotGrid1 != null) {
		button.SetText((ASPxPivotGrid1.GetCustomizationFieldsVisibility() ? &quot;Ocultar&quot; : &quot;Mostrar&quot;) + &quot; Lista de Campos&quot;);
	}
}" /><ClientSideEvents CustomizationFieldsVisibleChanged="function(s, e) {
	if(button != null &amp;&amp; ASPxPivotGrid1 != null) {
		button.SetText((ASPxPivotGrid1.GetCustomizationFieldsVisibility() ? &quot;Ocultar&quot; : &quot;Mostrar&quot;) + &quot; Lista de Campos&quot;);
	}
}" /><Styles CssFilePath="~/App_Themes/Office2010Blue/{0}/styles.css" CssPostfix="Office2010Blue">
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
                            <CustomizationFieldsHeaderStyle>
                                <Paddings PaddingLeft="12px" PaddingRight="6px" />
                                <Paddings PaddingLeft="12px" PaddingRight="6px" /><Paddings PaddingLeft="12px" PaddingRight="6px" /><Paddings PaddingLeft="12px" PaddingRight="6px" /><Paddings PaddingLeft="12px" PaddingRight="6px" /><Paddings PaddingLeft="12px" PaddingRight="6px" /><Paddings PaddingLeft="12px" PaddingRight="6px" /><Paddings PaddingLeft="12px" PaddingRight="6px" /><BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </CustomizationFieldsHeaderStyle>
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
                            <LoadingPanel HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
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
                            <Button HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
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
                            </Button>
                            <DisabledButton HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
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
                            </DisabledButton>
                            <CurrentPageNumber HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
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
                            </CurrentPageNumber>
                            <PageNumber HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
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
                            </PageNumber>
                            <Summary HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
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
                            </Summary>
                            <Ellipsis HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
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
                            </Ellipsis>
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
                            Lines-GradientMode="Horizontal" >
                        </StylesPrint>
                        <BackgroundImage Repeat="Repeat"></BackgroundImage>
                        <Border BorderStyle="NotSet"></Border>
                        <OptionsPager NumericButtonCount="15" RowsPerPage="15">
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
                            <Summary AllPagesText="Pagina: {0} - {1} ({2} items)" Text="Pagina {0} de {1} ({2} items)">
                            </Summary>
                        </OptionsPager>
                        <Images SpriteCssFilePath="~/App_Themes/Office2010Blue/{0}/sprite.css">
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
                            <CustomizationFieldsBackground Url="~/App_Themes/Office2010Blue/PivotGrid/pgCustomizationFormBackground.gif">
                            </CustomizationFieldsBackground>
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
                            <LoadingPanel Url="~/App_Themes/Office2010Blue/PivotGrid/Loading.gif">
                            </LoadingPanel>
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
                            <Image Url="~/App_Themes/Office2010Blue/PivotGrid/Loading.gif">
                            </Image>
                        </OptionsLoadingPanel>
                        <StylesEditors>
                            
                            <ReadOnlyStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </ReadOnlyStyle>
                            <ReadOnly HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </ReadOnly>
                            <CheckEdit HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </CheckEdit>
                            <ListBox HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </ListBox>
                            <ListBoxItem HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
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
                            </ListBoxItem>
                            <RadioButtonList HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </RadioButtonList>
                            <IncrementButtonStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <DisabledStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </DisabledStyle>
                                <PressedStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </PressedStyle>
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
                            </IncrementButtonStyle>
                            <SpinEditIncrementButton HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <DisabledStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </DisabledStyle>
                                <PressedStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </PressedStyle>
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
                            </SpinEditIncrementButton>
                            <DecrementButtonStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <DisabledStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </DisabledStyle>
                                <PressedStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </PressedStyle>
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
                            </DecrementButtonStyle>
                            <SpinEditDecrementButton HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <DisabledStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </DisabledStyle>
                                <PressedStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </PressedStyle>
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
                            </SpinEditDecrementButton>
                            <LargeIncrementButtonStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <DisabledStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </DisabledStyle>
                                <PressedStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </PressedStyle>
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
                            </LargeIncrementButtonStyle>
                            <SpinEditLargeIncrementButton HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <DisabledStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </DisabledStyle>
                                <PressedStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </PressedStyle>
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
                            </SpinEditLargeIncrementButton>
                            <LargeDecrementButtonStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <DisabledStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </DisabledStyle>
                                <PressedStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </PressedStyle>
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
                            </LargeDecrementButtonStyle>
                            <SpinEditLargeDecrementButton HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <DisabledStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </DisabledStyle>
                                <PressedStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </PressedStyle>
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
                            </SpinEditLargeDecrementButton>
                            <Label HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </Label>
                            <Hyperlink HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </Hyperlink>
                            <Image HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </Image>
                            <Memo HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </Memo>
                            <TextBox HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </TextBox>
                            <ButtonEdit HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </ButtonEdit>
                            <ButtonEditButton HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <DisabledStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </DisabledStyle>
                                <PressedStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </PressedStyle>
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
                            </ButtonEditButton>
                            <Calendar HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </Calendar>
                            <CalendarDayHeader Wrap="Default" HorizontalAlign="NotSet" VerticalAlign="NotSet">
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
                            </CalendarDayHeader>
                            <CalendarWeekNumber Wrap="Default" HorizontalAlign="NotSet" VerticalAlign="NotSet">
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
                            </CalendarWeekNumber>
                            <CalendarDay Wrap="Default" HorizontalAlign="NotSet" VerticalAlign="NotSet">
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
                            </CalendarDay>
                            <CalendarDayOtherMonth Wrap="Default" HorizontalAlign="NotSet" VerticalAlign="NotSet">
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
                            </CalendarDayOtherMonth>
                            <CalendarDaySelected Wrap="Default" HorizontalAlign="NotSet" VerticalAlign="NotSet">
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
                            </CalendarDaySelected>
                            <CalendarDayWeekEnd Wrap="Default" HorizontalAlign="NotSet" VerticalAlign="NotSet">
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
                            </CalendarDayWeekEnd>
                            <CalendarDayOutOfRange Wrap="Default" HorizontalAlign="NotSet" VerticalAlign="NotSet">
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
                            </CalendarDayOutOfRange>
                            <CalendarToday Wrap="Default" HorizontalAlign="NotSet" VerticalAlign="NotSet">
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
                            </CalendarToday>
                            <CalendarHeader HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
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
                            </CalendarHeader>
                            <CalendarFooter HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
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
                            </CalendarFooter>
                            <CalendarButton HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <DisabledStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </DisabledStyle>
                                <PressedStyle>
                                    <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                    <Border BorderStyle="NotSet"></Border>
                                    <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                    <BorderTop BorderStyle="NotSet"></BorderTop>
                                    <BorderRight BorderStyle="NotSet"></BorderRight>
                                    <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                </PressedStyle>
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
                            </CalendarButton>
                            <CalendarFastNav Wrap="Default" HorizontalAlign="NotSet" VerticalAlign="NotSet">
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
                            </CalendarFastNav>
                            <CalendarFastNavMonthArea Wrap="Default" HorizontalAlign="NotSet" VerticalAlign="NotSet">
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
                            </CalendarFastNavMonthArea>
                            <CalendarFastNavYearArea Wrap="Default" HorizontalAlign="NotSet" VerticalAlign="NotSet">
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
                            </CalendarFastNavYearArea>
                            <CalendarFastNavMonth Wrap="Default" HorizontalAlign="NotSet" VerticalAlign="NotSet">
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
                            </CalendarFastNavMonth>
                            <CalendarFastNavYear Wrap="Default" HorizontalAlign="NotSet" VerticalAlign="NotSet">
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
                            </CalendarFastNavYear>
                            <CalendarFastNavFooter HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
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
                            </CalendarFastNavFooter>
                            <MaskHint Wrap="Default">
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </MaskHint>
                            <ProgressBar HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </ProgressBar>
                            <ProgressBarIndicator>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </ProgressBarIndicator>
                            <DropDownWindow HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </DropDownWindow>
                            <ColorTable>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </ColorTable>
                            <ColorTableCell>
                                <ColorBorder BorderStyle="NotSet"></ColorBorder>
                                <ColorBorderLeft BorderStyle="NotSet"></ColorBorderLeft>
                                <ColorBorderTop BorderStyle="NotSet"></ColorBorderTop>
                                <ColorBorderRight BorderStyle="NotSet"></ColorBorderRight>
                                <ColorBorderBottom BorderStyle="NotSet"></ColorBorderBottom>
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
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </ColorTableCell>
                            <ColorIndicator>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </ColorIndicator>
                            <DisplayColorIndicator>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </DisplayColorIndicator>
                            <Focused HorizontalAlign="NotSet" Wrap="Default">
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </Focused>
                            <NullText HorizontalAlign="NotSet" Wrap="Default">
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </NullText>
                            <Invalid HorizontalAlign="NotSet" Wrap="Default">
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </Invalid>
                            <LoadingPanel HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </LoadingPanel>
                            <LoadingDiv>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </LoadingDiv>
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
        <table border="0" style="width: 95%" cellpadding="0" cellspacing="0" align="center">
        </table>
        <%-- </dx:ASPxGridViewExporter>--%>
        <dx:ASPxPivotGridExporter ID="ASPxPivotGridExporter1" 
          OnCustomExportCell="ASPxPivotGridExporter1_CustomExportCell"
          runat="server" ASPxPivotGridID="ASPxPivotGrid1" />
        <div class="style1" style="display: none;">
            <table border="0" style="width: 95%" cellpadding="0" cellspacing="0" align="center">
                <tr style="font-size: 12pt" height="50">
                    <td align="center" width="10%" colspan="2" style="background-repeat: repeat">
                        <hr style="color: white" width="100%" />
                        <table border="0" style="width: 100%" cellpadding="0" cellspacing="0" align="center">
                            <tr>
                              <td align="center" colspan="3" style="width: 100px">
                            </td>
                                <td align="right">
                                    <span style="font-size: 8pt; color: #1E395B; font-weight: bold">
   
                                        Tipo de Gr&aacute;fico:&nbsp;</span>
                                </td>
                                <td align="left">
                                    <dx:ASPxComboBox ID="ChartType" runat="server" OnValueChanged="ChartType_ValueChanged"
                                        AutoPostBack="True" CssFilePath="~/App_Themes/Aqua/{0}/styles.css"
                                        CssPostfix="Aqua" DropDownStyle="DropDownList" EnableSynchronization="Default"
                                        HorizontalAlign="NotSet" IncrementalFilteringMode="None" LoadingPanelImagePosition="Top"
                                        PopupHorizontalAlign="LeftSides" PopupVerticalAlign="Below" RenderIFrameForPopupElements="Default"
                                        Width="300px"
                                        SpriteCssFilePath="~/App_Themes/Aqua/{0}/sprite.css" 
                                        ValueType="System.String" ClientIDMode="AutoID" ShowShadow="False">
                                        <ListBoxStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                            <Border BorderStyle="NotSet"></Border>
                                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                            <BorderTop BorderStyle="NotSet"></BorderTop>
                                            <BorderRight BorderStyle="NotSet"></BorderRight>
                                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                        </ListBoxStyle>
                                        <InvalidStyle HorizontalAlign="NotSet" Wrap="Default">
                                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                            <Border BorderStyle="NotSet"></Border>
                                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                            <BorderTop BorderStyle="NotSet"></BorderTop>
                                            <BorderRight BorderStyle="NotSet"></BorderRight>
                                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                        </InvalidStyle>
                                        <ButtonStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                            <DisabledStyle>
                                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                                <Border BorderStyle="NotSet"></Border>
                                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                            </DisabledStyle>
                                            <PressedStyle>
                                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                                <Border BorderStyle="NotSet"></Border>
                                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                            </PressedStyle>
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
                                        </ButtonStyle>
                                        <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                        <ButtonEditEllipsisImage Align="NotSet">
                                        </ButtonEditEllipsisImage>
                                        <FocusedStyle HorizontalAlign="NotSet" Wrap="Default">
                                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                            <Border BorderStyle="NotSet"></Border>
                                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                            <BorderTop BorderStyle="NotSet"></BorderTop>
                                            <BorderRight BorderStyle="NotSet"></BorderRight>
                                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                        </FocusedStyle>
                                        <Border BorderStyle="NotSet"></Border>
                                        <LoadingPanelStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                            <Border BorderStyle="NotSet"></Border>
                                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                            <BorderTop BorderStyle="NotSet"></BorderTop>
                                            <BorderRight BorderStyle="NotSet"></BorderRight>
                                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                        </LoadingPanelStyle>
                                        <BorderTop BorderStyle="NotSet"></BorderTop>
                                        <ItemStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
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
                                        </ItemStyle>
                                        <LoadingPanelImage Align="NotSet" Url="~/App_Themes/Aqua/Editors/Loading.gif">
                                        </LoadingPanelImage>
                                        <DropDownButton ImagePosition="Left" Position="Right">
                                            <Image Align="NotSet">
                                                <SpriteProperties HottrackedCssClass="dxEditors_edtDropDownHover_Aqua" 
                                                    PressedCssClass="dxEditors_edtDropDownPressed_Aqua" />
                                            </Image>
                                        </DropDownButton>
                                        <BorderRight BorderStyle="NotSet"></BorderRight>
                                        <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                        <ValidationSettings ErrorDisplayMode="ImageWithText" Display="Static" ErrorTextPosition="Right">
                                            <ErrorImage Align="NotSet">
                                            </ErrorImage>
                                            <ErrorFrameStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default" 
                                                ImageSpacing="4px">
                                                <ErrorTextPaddings PaddingLeft="4px" />
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
                                            </ErrorFrameStyle>
                                        </ValidationSettings>
                                        <DisabledStyle>
                                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                            <Border BorderStyle="NotSet"></Border>
                                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                            <BorderTop BorderStyle="NotSet"></BorderTop>
                                            <BorderRight BorderStyle="NotSet"></BorderRight>
                                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                        </DisabledStyle>
                                        <ReadOnlyStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                            <Border BorderStyle="NotSet"></Border>
                                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                            <BorderTop BorderStyle="NotSet"></BorderTop>
                                            <BorderRight BorderStyle="NotSet"></BorderRight>
                                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                        </ReadOnlyStyle>
                                        <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                        <ItemImage Align="NotSet">
                                        </ItemImage>
                                    </dx:ASPxComboBox>
                                </td>
                                <td align="right" style="display:none;">
                                    <span style="font-size: 8pt; color: #1E395B; font-weight: bold">
                                        Invertir Filas con Columnas:&nbsp; </span>
                                </td>
                                <td align="left" style="display:none;">
                                    <dx:ASPxCheckBox runat="server" AutoPostBack="True" ID="ChartDataVertical" OnCheckedChanged="ChartDataVertical_CheckedChanged"
                                        CssFilePath="~/App_Themes/Office2010Blue/{0}/styles.css" CssPostfix="Office2010Blue"
                                        Layout="Table" SpriteCssFilePath="~/App_Themes/Office2010Blue/{0}/sprite.css"
                                        TextAlign="Right" Wrap="Default" Checked="True">
                                        <InvalidStyle HorizontalAlign="NotSet" Wrap="Default">
                                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                            <Border BorderStyle="NotSet"></Border>
                                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                            <BorderTop BorderStyle="NotSet"></BorderTop>
                                            <BorderRight BorderStyle="NotSet"></BorderRight>
                                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                        </InvalidStyle>
                                        <DisabledStyle>
                                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                            <Border BorderStyle="NotSet"></Border>
                                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                            <BorderTop BorderStyle="NotSet"></BorderTop>
                                            <BorderRight BorderStyle="NotSet"></BorderRight>
                                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                        </DisabledStyle>
                                        <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                        <BorderTop BorderStyle="NotSet"></BorderTop>
                                        <ValidationSettings ErrorDisplayMode="ImageWithText" Display="Static" ErrorTextPosition="Right">
                                            <ErrorImage Align="NotSet">
                                            </ErrorImage>
                                            <ErrorFrameStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
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
                                            </ErrorFrameStyle>
                                        </ValidationSettings>
                                        <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                        <BorderRight BorderStyle="NotSet"></BorderRight>
                                        <Border BorderStyle="NotSet"></Border>
                                        <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                        <ReadOnlyStyle HorizontalAlign="NotSet" VerticalAlign="NotSet" Wrap="Default">
                                            <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                            <Border BorderStyle="NotSet"></Border>
                                            <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                            <BorderTop BorderStyle="NotSet"></BorderTop>
                                            <BorderRight BorderStyle="NotSet"></BorderRight>
                                            <BorderBottom BorderStyle="NotSet"></BorderBottom>
                                        </ReadOnlyStyle>
                                    </dx:ASPxCheckBox>
                                </td>

                                <td align="center" colspan="3" style="width: 80px">
                                </td>
                                <td align="right">
                                  <asp:DropDownList ID="ddlTipo" runat="server" 
                                    Style="vertical-align: middle" Width="100px" Font-Size="11px" 
                                        AutoPostBack="True">
                                        <%--<asp:ListItem Value="3">Text</asp:ListItem>--%>
                                        <asp:ListItem  Value="0" Selected="True">Duración</asp:ListItem>
                                        <asp:ListItem Value="1" >Llamadas</asp:ListItem>
                                        <asp:ListItem Value="2">Costo</asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                                <td align="right">
                                  <asp:DropDownList ID="ddlFormatoExportacion" runat="server" 
                                    Style="vertical-align: middle" Width="100px" Font-Size="11px" 
                                        AutoPostBack="True">
                                        <%--<asp:ListItem Value="3">Text</asp:ListItem>--%>
                                        <asp:ListItem  Value="0" Selected="True">Excel 2010</asp:ListItem>
                                        <asp:ListItem Value="1" >Excel 2007</asp:ListItem>
                                        <asp:ListItem Value="2">Pdf</asp:ListItem>
                                        <asp:ListItem Value="3" >Html</asp:ListItem>
                                        <asp:ListItem Value="4" >Rtf</asp:ListItem>
                                    </asp:DropDownList>
                                </td>

                                <td style="width: 100px">

                                </td>

                                



                            </tr>
                        </table>
                        <hr style="color: white" width="100%" />
                    </td>
                </tr>
            </table>
            <br />
            <table width="100%">
                <tr>
                    <td align="center">
                        <dxchartsui:WebChartControl ID="WebChart" runat="server" DataSourceID="ASPxPivotGrid1"
                            Width="800px" Height="400px"
                            ClientIDMode="AutoID" SeriesDataMember="Series" 
                            LoadingPanelText="Cargando&amp;hellip;" ClientInstanceName="miChart" 
                            SideBySideEqualBarWidth="True">
                            <loadingpanelimage align="NotSet"></loadingpanelimage>
                            <DisabledStyle>
                                <BackgroundImage Repeat="Repeat"></BackgroundImage>
                                <Border BorderStyle="NotSet"></Border>
                                <BorderLeft BorderStyle="NotSet"></BorderLeft>
                                <BorderTop BorderStyle="NotSet"></BorderTop>
                                <BorderRight BorderStyle="NotSet"></BorderRight>
                                <BorderBottom BorderStyle="NotSet"></BorderBottom>
                            </DisabledStyle>
                            <loadingpanelstyle horizontalalign="NotSet" verticalalign="NotSet" wrap="Default">
        <BackgroundImage Repeat="Repeat"></BackgroundImage>

        <Border BorderStyle="NotSet"></Border>

        <BorderLeft BorderStyle="NotSet"></BorderLeft>

        <BorderTop BorderStyle="NotSet"></BorderTop>

        <BorderRight BorderStyle="NotSet"></BorderRight>

        <BorderBottom BorderStyle="NotSet"></BorderBottom>
        </loadingpanelstyle>
                            <smallcharttext text="El número de propiedades es muy grande para el diagrama,
por favor cambie los filtros para obtener menos propiedades.
    " />
<SmallChartText Text="El n&#250;mero de propiedades es muy grande para el diagrama,
por favor cambie los filtros para obtener menos propiedades.
    "></SmallChartText>
                            <diagramserializable>
                                <cc1:XYDiagram>
                                    <axisx visibleinpanesserializable="-1">
                                        <label resolveoverlappingmode="HideOverlapped" staggered="True" />
                                        <range sidemarginsenabled="True" />
<Label Staggered="True" ResolveOverlappingMode="HideOverlapped"></Label>

<Range SideMarginsEnabled="True"></Range>
                                    </axisx>
                                    <axisy visibleinpanesserializable="-1">
                                        <range sidemarginsenabled="True" />
<Range SideMarginsEnabled="True"></Range>
                                    </axisy>
                                </cc1:XYDiagram>
                            </diagramserializable>
                            <fillstyle><OptionsSerializable>
        <cc1:SolidFillOptions></cc1:SolidFillOptions>
        </OptionsSerializable>
        </fillstyle>
                            <legend maxhorizontalpercentage="30"></legend>
                            <seriestemplate argumentdatamember="Arguments" 
                              valuedatamembersserializable="Values" argumentscaletype="Qualitative"><ViewSerializable>
        <cc1:SideBySideBarSeriesView></cc1:SideBySideBarSeriesView>
        </ViewSerializable>
        <LabelSerializable>
        <cc1:SideBySideBarSeriesLabel LineVisible="True">
        <FillStyle><OptionsSerializable>
        <cc1:SolidFillOptions></cc1:SolidFillOptions>
        </OptionsSerializable>
        </FillStyle>
        <PointOptionsSerializable><cc1:PointOptions></cc1:PointOptions></PointOptionsSerializable></cc1:SideBySideBarSeriesLabel>
        </LabelSerializable>
        <PointOptionsSerializable>
        <cc1:PointOptions></cc1:PointOptions>
        </PointOptionsSerializable>
        <LegendPointOptionsSerializable>
        <cc1:PointOptions></cc1:PointOptions>
        </LegendPointOptionsSerializable>
        </seriestemplate>

<CrosshairOptions><CommonLabelPositionSerializable>
<cc1:CrosshairMousePosition></cc1:CrosshairMousePosition>
</CommonLabelPositionSerializable>
</CrosshairOptions>

<ToolTipOptions><ToolTipPositionSerializable>
<cc1:ToolTipMousePosition></cc1:ToolTipMousePosition>
</ToolTipPositionSerializable>
</ToolTipOptions>
                        </dxchartsui:WebChartControl>
                    </td>
                </tr>
            </table>
            <br />
        </div>

        <asp:ObjectDataSource ID="odsSumario" runat="server" TypeName="VisualSoft.Suite80.BL.BL_MOV_Reporte"
            SelectMethod="GetDSReportesPivot" OldValuesParameterFormatString="original_{0}">
            <SelectParameters>
                <asp:ControlParameter PropertyName="Value" Type="String" DefaultValue="" Name="periodo"
                    ControlID="hydPeriodo"></asp:ControlParameter>
                <asp:ControlParameter PropertyName="Value" Type="Int32" Name="codemp"
                    ControlID="hydCodEmp"></asp:ControlParameter>
                <asp:ControlParameter PropertyName="SelectedValue" Type="String" DefaultValue=""
                    Name="codpaidestino" ControlID="ddlRegionHacia"></asp:ControlParameter>
                <asp:ControlParameter PropertyName="SelectedValue" Type="String" DefaultValue=""
                    Name="codpaiorigen" ControlID="ddlRegionDesde"></asp:ControlParameter>
                <asp:ControlParameter PropertyName="Value" Type="String" DefaultValue="" Name="codint"
                    ControlID="hydCodInt"></asp:ControlParameter>
                <asp:ControlParameter ControlID="hdfCodigoEmpleado" Name="prCodigoEmpleado" 
                    PropertyName="Value" Type="String" />
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

    <div id="dvArea" style="display:none;padding:0px; margin:0px;">
        <iframe id="ifArea" width="410" height="300" frameborder="0" style="padding:0px; margin:0px;"></iframe>
    </div>

    <div id="dvNombreReporte" style="display:none;padding:0px; margin:0px;">
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
