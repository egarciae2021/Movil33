<%@ Page Language="VB" AutoEventWireup="false" Inherits="PivotReporteOrganizacional" Codebehind="PivotReporteOrganizacional.aspx.vb" %>

<%@ Register Assembly="DevExpress.Web.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxEditors" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=B88D1754D700E49A" Namespace="DevExpress.Web.ASPxPanel" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxPivotGrid.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=B88D1754D700E49A" Namespace="DevExpress.Web.ASPxPivotGrid" TagPrefix="dx" %>
<%@ Register assembly="DevExpress.Web.ASPxPivotGrid, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxPivotGrid.Export" tagprefix="dx" %>
<%@ Register Assembly="DevExpress.XtraCharts.v12.2.Web, Version=12.2.18.0, Culture=neutral, PublicKeyToken=B88D1754D700E49A" Namespace="DevExpress.XtraCharts.Web" TagPrefix="dxchartsui" %>
<%@ Register Assembly="DevExpress.XtraCharts.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=B88D1754D700E49A" Namespace="DevExpress.XtraCharts" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
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
    <script src="PivotReporteOrganizacional.js" type="text/javascript"></script>
</head>


<body style="background: #FFFFFF;">
    <form id="form1" runat="server">
<%--    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <asp:UpdatePanel ID="UpdatePanel1" runat="server" UpdateMode="Always" >
      <ContentTemplate>--%>
    <input id="txtcargando" type="text" name="name" value="alert" style="display:none;" />
<div class="dvPanel" id="global">     
    <div class="pos_titulos_generales" style="font-size:13px;font-weight:bold;">
        Reportes Din&aacute;micos Organizacional Por Bolsa &nbsp; <asp:Label ID="lblNombreReporte" runat="server" Text=" - [Nuevo Reporte]" Visible="true" ></asp:Label>
    </div>
    <br />
    <table border="0" style="width: 95%" cellpadding="0" cellspacing="0" align="center">
    </table>
    <div id="Contenedor" class="style1">
        <table border="0" cellpadding="0" cellspacing="0" align="left" width="95%">
            <tr height="10">
                <td colspan="2">
                </td>
            </tr>
            <tr style="font-size: 12pt" height="50">
                <td align="center" width="10%" colspan="3" style="background-repeat: repeat">


                    <table border="0" style="font-size: 11px; font-family: Tahoma; color: #1E395B; font-weight: bold" >
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
                            &nbsp;
                        </td>

                        <td align="right" >
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

                        <td>
                        </td>
                        <td align="left">
                            &nbsp;
                        </td>
                        <td align="left">
                            &nbsp;
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
                                    <ClientSideEvents Click="function(s, e){ fnNuevaConsulta();}" /></dx:ASPxButton>
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
                                <ClientSideEvents Click="function(s, e){ fnGrabarReporte();}" /></dx:ASPxButton>
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
                                <ClientSideEvents Click="function(s, e){ fnGrabarReporteComo();}" /></dx:ASPxButton>
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
                                    <ClientSideEvents Click="function(s, e){ fnAbrirMisReportes();}" /></dx:ASPxButton>
                        </td>
                        

                      </tr>

                    </table>
                    <asp:Label ID="lblDatos" runat="server" Text="No existen datos" Font-Bold="True"
                              Font-Names="Verdana" Font-Size="8pt" ForeColor="#C00000" Visible="False"></asp:Label>
                    <hr style="color: white" width="100%" />
                </td>
            </tr>
            <tr>
                <td  align="left">
                        <dx:ASPxButton ID="btnIrPlan" runat="server" Text="Lineas por Planes" 
                        AutoPostBack="false"
                        Image-Url= "~/Common/Images/Mantenimiento/LineasPlan.png"
                        Image-Height="16px"
                        Style="vertical-align: middle;" ClientIDMode="AutoID" 
                        CssFilePath="~/App_Themes/Aqua/{0}/styles.css" CssPostfix="Aqua" 
                        HorizontalAlign="NotSet" ImagePosition="Left" 
                        SpriteCssFilePath="~/App_Themes/Aqua/{0}/sprite.css" VerticalAlign="NotSet" 
                        Wrap="Default" Width="123px">
                        <ClientSideEvents Click="function(s, e){ fnNuevaConsulta_PorPlanes();}" /></dx:ASPxButton>
                      
                </td>
                <td  align="center" style="font-size:13px;font-weight:bold;">
                    Distribución por bolsa
                </td>
                <td align="right">
                        <dx:ASPxButton ID="ptnIrBolsa" runat="server" Text="Reporte General" 
                        AutoPostBack="false"
                        Image-Url="~/Common/Images/Sumario/GEN.png"
                        Image-Height="16px"
                        Style="vertical-align: middle;" ClientIDMode="AutoID" 
                        CssFilePath="~/App_Themes/Aqua/{0}/styles.css" CssPostfix="Aqua" 
                        HorizontalAlign="NotSet" ImagePosition="Left" 
                        SpriteCssFilePath="~/App_Themes/Aqua/{0}/sprite.css" VerticalAlign="NotSet" 
                        Wrap="Default" Width="123px">
                        <ClientSideEvents Click="function(s, e){ fnNuevaConsulta_General();}" /></dx:ASPxButton>
                      
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
        <dx:ASPxPivotGrid ID="ASPxPivotGrid1" runat="server">
        </dx:ASPxPivotGrid>
        <br />
        
        <%-- </dx:ASPxGridViewExporter>--%>
        <dx:ASPxPivotGridExporter ID="ASPxPivotGridExporter1" 
          OnCustomExportCell="ASPxPivotGridExporter1_CustomExportCell"
          runat="server" ASPxPivotGridID="ASPxPivotGrid1" />

        <asp:ObjectDataSource ID="odsOrganizacion" runat="server" TypeName="VisualSoft.Suite80.BL.BL_GEN_Organizacion"
            SelectMethod="ListarPivotOrganizacional" 
            OldValuesParameterFormatString="original_{0}">
            <SelectParameters>
                <asp:ControlParameter PropertyName="Value" Type="String" DefaultValue="0" Name="_idCliente" ControlID="hydCodEmp"></asp:ControlParameter>
            </SelectParameters>
        </asp:ObjectDataSource>

        <asp:HiddenField ID="hydPeriodo" runat="server" />
        <asp:HiddenField ID="hydCodEmp" runat="server" />
        <asp:HiddenField ID="hydwhere" runat="server" />
        <asp:HiddenField ID="hydCodInt" runat="server" />
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
