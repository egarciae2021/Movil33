<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_DashBoard_DashBoard_I" CodeBehind="DashBoard_I.aspx.vb" %>

<%@ Register Assembly="DevExpress.Web.ASPxPivotGrid.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=B88D1754D700E49A" Namespace="DevExpress.Web.ASPxPivotGrid" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxPivotGrid.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxPivotGrid.Export" TagPrefix="dx" %>

<%@ Register Assembly="DevExpress.Web.ASPxPivotGrid.v12.2" Namespace="DevExpress.Web.ASPxPivotGrid" TagPrefix="dx" %>

<%@ Register Src="../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/FusionCharts/FusionCharts.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/FusionCharts/FusionCharts.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/FusionCharts/FusionCharts.jqueryplugin.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../../Common/Styles/stylePivot.css" rel="stylesheet" type="text/css" />

    <link href="DashBoard_Global.css" rel="stylesheet" type="text/css" />
    <link href="DashBoard_I.css" rel="stylesheet" type="text/css" />
    <script src="DashBoard_I.js" type="text/javascript"></script>
    <style type="text/css">
        #ttginfoHistorico_dvToolTip {
        }

        #ttginfoHistorico_DvMensaje {
        }

        #General {
            width: 1024px !important;
        }

        .AnchoTotal {
            width: 1024px !important;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div id="dvCargando" class="dvCargando"></div>
        <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
        <asp:HiddenField ID="hdfIdTipSolAprLeer" runat="server" />
        <asp:HiddenField ID="hdfIdTipSolAprResp" runat="server" />
        <asp:HiddenField ID="hdfCodEmp" runat="server" />
        <asp:HiddenField ID="hdfCodIntRes" runat="server" />
        <asp:HiddenField ID="hdfIdTipSolTecAsi" runat="server" />
        <asp:HiddenField ID="hdfIdTipSolTecPro" runat="server" />
        <asp:HiddenField ID="hdfIdTipSolTecCulAnu" runat="server" />
        <asp:HiddenField ID="hdfIdTipSolResTec" runat="server" />
        <asp:HiddenField ID="hdfTapsMostrar" runat="server" />
        <div id="General">
            <div id="pnlTap">
                <div id="divTituloAprobacion" runat="server" class="CuerpoTap esPrimerTap">
                    <div id="TapAprobacion" class="Tap ui-state-active-TAB">Estados De Aprobación</div>
                </div>
                <div id="divTituloProceso" runat="server" class="CuerpoTap">
                    <div id="TapProceso" class="Tap TapNoSelecionado" runat="server">Estados De Proceso</div>
                </div>

            </div>
            <div style="float: right; margin-top: 2px;">
                <asp:DropDownList Style="float: right;" ID="ddlPeriodo" runat="server"></asp:DropDownList><span style="margin-right: 7px; margin-top: 5px; float: right;">Periodo: </span>
                <div style="clear: both;"></div>
                <span style="color: red">(*) Periodo sólo afecta a solicitudes por estado, tipos por estado, umbrales aprobados e históricos</span>
            </div>
            <div class="LimpiarFloat"></div>
            <div id="pnlCuerpo" class="AnchoTotal" style="height: 620px;">
                <div id="pnlAprobacion" class="AnchoTotal" runat="server">
                    <div class="AnchoTotal bordeAbajo FlotarIzquierda">
                        <div id="pnlPie">
                            <%--<table align="center" style="padding-top: 1px;">
                                <tr>
                                    <td>
                                        <div class="subTitulo bordeAbajo ui-state-active" style="height: 17px;"><a style="padding-top: 100px !important;">Solicitudes Por Estado (%)</a></div>
                                    </td>
                                </tr>
                            </table>--%>

                            <table align="left" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="width: 20px;"></td>
                                    <td>
                                        <li class="list-header">Distribución Por Estado (%)
                                        </li>
                                        <hr class="hr" />
                                    </td>
                                </tr>
                            </table>

                            <div class="bordeArriba" style="float: left;">
                                <div id="contentChartPie"></div>
                            </div>

                        </div>
                        <div id="pnlGridPie">
                            <table align="left" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="width: 20px;">
                                        <uc1:ToolTipGenerico ID="ttgInfoEstado" runat="server" />
                                    </td>
                                    <td>
                                        <li class="list-header">Tipos De Solicitudes Por Estado
                                        </li>
                                        <hr class="hr" />
                                    </td>
                                </tr>
                            </table>



                            <div class="bordeArriba">

                                <dx:ASPxPivotGrid runat="server" DataSourceID="ObjectDataSource1" Width="617" ID="ASPxPivotGrid1" Style="text-align: center; font-weight: 700;" Height="225" ClientIDMode="AutoID" CssClass="SinScroll" OptionsView-ShowHorizontalScrollBar="False">
                                    <Fields>
                                        <dx:PivotGridField Area="RowArea" AreaIndex="1" Caption="Periodo" Visible="false" FieldName="Periodo" ID="PivotGridField10" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="RowArea" AreaIndex="1" Caption="IdTipoSolicitud" Visible="false" FieldName="IdTipoSolicitud" ID="PivotGridField17" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="ColumnArea" AreaIndex="1" Caption="Tipo Solicitud" Visible="True" FieldName="NombreTipoSolicitud" ID="PivotGridField18" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="RowArea" AreaIndex="1" Caption="IdEstado" Visible="false" FieldName="IdEstado" ID="PivotGridField19" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="RowArea" AreaIndex="2" Caption="Estado" Visible="True" FieldName="NombreEstado" ID="PivotGridField20" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="DataArea" AreaIndex="1" Caption="Cantidad" Visible="True" FieldName="Cantidad" ID="PivotGridField21" Options-AllowDrag="False" />
                                    </Fields>
                                    <OptionsView ShowHorizontalScrollBar="True" ShowFilterHeaders="False"></OptionsView>
                                    <OptionsLoadingPanel Text="Cargando&amp;hellip;">
                                        <Image Url="~/App_Themes/Office2010Silver/PivotGrid/Loading.gif"></Image>
                                        <Style ImageSpacing="5px"></Style>
                                    </OptionsLoadingPanel>
                                    <Images SpriteCssFilePath="~/App_Themes/Office2010Silver/{0}/sprite.css">
                                        <CustomizationFieldsBackground Url="~/App_Themes/Office2010Silver/PivotGrid/pcHBack.png"></CustomizationFieldsBackground>
                                        <LoadingPanel Url="~/App_Themes/Office2010Silver/PivotGrid/Loading.gif"></LoadingPanel>
                                    </Images>
                                    <Styles CssFilePath="~/App_Themes/Office2010Silver/{0}/styles.css" CssPostfix="Office2010Silver">
                                        <LoadingPanel ImageSpacing="5px"></LoadingPanel>
                                    </Styles>
                                    <StylesPager>
                                        <PageNumber ForeColor="#3E4846"></PageNumber>
                                        <Summary ForeColor="#1E395B"></Summary>
                                    </StylesPager>
                                    <StylesEditors ButtonEditCellSpacing="0"></StylesEditors>
                                </dx:ASPxPivotGrid>

                                <asp:ObjectDataSource ID="ObjectDataSource1" runat="server" TypeName="VisualSoft.Suite80.BL.BL_DashBoard_Solicitudes" SelectMethod="ObtieneCantidadSolicitudesDev"
                                    OldValuesParameterFormatString="original_{0}">
                                    <SelectParameters>
                                        <asp:ControlParameter ControlID="ddlPeriodo" DefaultValue="" Name="prPeriodo" PropertyName="SelectedValue" Type="String" />
                                        <asp:Parameter Name="prTipoEstado" Type="Int32" DefaultValue="2" />
                                        <asp:Parameter Name="_idCliente" Type="Int32" DefaultValue="0" />
                                        <asp:ControlParameter ControlID="hdfIdUsuarioLogeado" Name="prIdUsuario" PropertyName="Value" Type="Int32" />
                                        <asp:ControlParameter ControlID="hdfIdTipSolAprLeer" Name="vcTipSolAprLeer" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfIdTipSolAprResp" Name="vcTipSolAprResp" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfCodEmp" Name="vcCodEmp" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfCodIntRes" Name="vcCodIntRes" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfIdTipSolTecAsi" Name="vcTipSolTecAsi" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfIdTipSolTecPro" Name="vcTipSolTecPro" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfIdTipSolTecCulAnu" Name="vcTipSolTecCulAnu" PropertyName="Value" Type="String" />
                                    </SelectParameters>

                                </asp:ObjectDataSource>
                                <div id="NHD_ASPxPivotGrid1" style="font-size: medium; color: Gray; height: 190Px; display: none;" runat="server">No hay datos para mostrar.</div>
                            </div>
                        </div>
                    </div>
                    <div class="AnchoTotal bordeAbajo FlotarIzquierda" style="display: none">
                        <div id="pnlBarras">
                            <div class="subTitulo bordeAbajo ui-state-active">Histórico De Umbrales</div>
                            <div class="bordeArriba">
                                <div class="DivControls">
                                    <span style="margin-right: 7px;">Umbral :</span><asp:DropDownList ID="ddlTipoUmbral" runat="server">
                                        <asp:ListItem Value="1" Text="Sin Umbral"></asp:ListItem>
                                        <asp:ListItem Value="2" Text="Dentro de umbral"></asp:ListItem>
                                        <asp:ListItem Value="3" Text="Fuera de umbral"></asp:ListItem>
                                        <asp:ListItem Value="4" Text="Total" Selected="True"></asp:ListItem>
                                    </asp:DropDownList>
                                </div>
                                <div id="contentChartUmbral"></div>
                            </div>

                        </div>
                    </div>
                    
                    <div class="AnchoTotal bordeAbajo FlotarIzquierda" style="margin-top: 20px;">
                        <div id="pnlUmbralesAprobados" class="AnchoMitad FlotarIzquierda">
                            <%--<div class="subTitulo bordeAbajo ui-state-active">Umbrales Aprobados</div>--%>

                            <li style="margin-left: 20px;" class="list-header">Umbrales Aprobados
                            </li>
                            <hr style="margin-left: 20px;" class="hr" />

                            <div id="dvUmbralesAprobados" class="bordeArriba">
                                <table id="gridUmbralesAprobados">
                                </table>
                                <div id="pagerUmbralesAprobados">
                                </div>
                            </div>
                        </div>
                        <div id="pnlUmbralesPorAprobar" class="AnchoMitad bordeIzquierda FlotarIzquierda">
                            <%--<div class="subTitulo bordeAbajo ui-state-active">Umbrales Por Aprobar</div>--%>
                            <li style="margin-left: 20px;" class="list-header">Umbrales Por Aprobar
                            </li>
                            <hr style="margin-left: 20px;" class="hr" />
                            <div id="dvUmbralesPorAprobar" class="bordeArriba">
                                <table id="gridUmbralesPorAprobar">
                                </table>
                                <div id="pagerUmbralesPorAprobar">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="AnchoTotal bordeAbajo FlotarIzquierda" style="margin-top: -10px;">
                        <div id="pnlGridAprobacion">
                            <%--<div class="subTitulo bordeAbajo ui-state-active">Responsables Por Estado</div>--%>

                            <li style="margin-left: 20px;" class="list-header">Responsables Por Estado
                            </li>
                            <hr style="margin-left: 20px;" class="hr" />

                            <div class="bordeArriba">

                                <dx:ASPxPivotGrid runat="server"
                                    DataSourceID="ObjectDataSource2"
                                    Width="100%" ID="ASPxPivotGrid2"
                                    Style="text-align: center; font-weight: 700;" ClientIDMode="AutoID"
                                    OptionsView-ShowHorizontalScrollBar="False"
                                    CssClass="SinScroll" OptionsView-ShowGrandTotalsForSingleValues="False">

                                    <Fields>
                                        <dx:PivotGridField Area="RowArea" AreaIndex="6" Caption="IdEmpleado" Visible="false" FieldName="IdEmpleado" ID="PivotGridField22" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="RowArea" AreaIndex="0" Caption="Responsable"
                                            Visible="True" FieldName="NombreEmpleado" ID="PivotGridField23" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="RowArea" AreaIndex="1" Caption="IdEstado" Visible="False" FieldName="IdEstado" ID="PivotGridField24" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="ColumnArea" AreaIndex="0" Caption="Estado"
                                            Visible="True" FieldName="NombreEstado" ID="PivotGridField25" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="DataArea" AreaIndex="0" Caption="Cantidad"
                                            Visible="True" FieldName="Cantidad" ID="PivotGridField26" Options-AllowDrag="False" />
                                    </Fields>
                                    <ClientSideEvents AfterCallback="function(s, e) {
	                                                            var alto1 = document.getElementById('pnlPie').clientHeight;
	                                                            var alto2 = document.getElementById('pnlBarras').clientHeight;
	                                                            var alto3 = document.getElementById('ASPxPivotGrid2').clientHeight;
	                                                            var alto4 = document.getElementById('pnlGridPeriodo').clientHeight;
	                                                            document.getElementById('pnlCuerpo').style.height = alto1 + alto2 + alto3 + alto4 + 20;
                                                             }"
                                        CustomizationFieldsVisibleChanged="function(s, e) {
	var alto1 = document.getElementById('pnlPie').clientHeight;
	var alto2 = document.getElementById('pnlBarras').clientHeight;
	var alto3 = document.getElementById('ASPxPivotGrid2').clientHeight;
	var alto4 = document.getElementById('pnlGridPeriodo').clientHeight;

	document.getElementById('pnlCuerpo').style.height = alto1 + alto2 + alto3 + alto4 + 20;
}" />
                                    <OptionsView ShowHorizontalScrollBar="True" ShowFilterHeaders="False"></OptionsView>

                                    <OptionsLoadingPanel Text="Cargando&amp;hellip;">
                                        <Image Url="~/App_Themes/Office2010Silver/PivotGrid/Loading.gif">
                                        </Image>
                                        <Style ImageSpacing="5px">
                            </Style>
                                    </OptionsLoadingPanel>
                                    <Images SpriteCssFilePath="~/App_Themes/Office2010Silver/{0}/sprite.css">
                                        <CustomizationFieldsBackground Url="~/App_Themes/Office2010Silver/PivotGrid/pcHBack.png">
                                        </CustomizationFieldsBackground>
                                        <LoadingPanel Url="~/App_Themes/Office2010Silver/PivotGrid/Loading.gif">
                                        </LoadingPanel>
                                    </Images>
                                    <Styles CssFilePath="~/App_Themes/Office2010Silver/{0}/styles.css"
                                        CssPostfix="Office2010Silver">
                                        <LoadingPanel ImageSpacing="5px">
                                        </LoadingPanel>
                                    </Styles>
                                    <StylesPager>
                                        <PageNumber ForeColor="#3E4846">
                                        </PageNumber>
                                        <Summary ForeColor="#1E395B">
                                        </Summary>
                                    </StylesPager>
                                    <StylesEditors ButtonEditCellSpacing="0">
                                    </StylesEditors>
                                </dx:ASPxPivotGrid>

                                <asp:ObjectDataSource ID="ObjectDataSource2" runat="server" TypeName="VisualSoft.Suite80.BL.BL_DashBoard_Solicitudes"
                                    SelectMethod="ObtieneCantidadSolicitudes_porResponsablesDev"
                                    OldValuesParameterFormatString="original_{0}">
                                    <SelectParameters>
                                        <asp:Parameter DefaultValue="2" Name="prTipoEstado" Type="Int32" />
                                        <asp:Parameter DefaultValue="0" Name="_idCliente" Type="Int32" />
                                        <asp:ControlParameter ControlID="hdfIdUsuarioLogeado" DefaultValue="" Name="prIdUsuario" PropertyName="Value" Type="Int32" />
                                        <asp:ControlParameter ControlID="hdfCodIntRes" Name="vcCodIntRes" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfIdTipSolResTec" Name="vcIdTipSol" PropertyName="Value" Type="String" />
                                    </SelectParameters>
                                </asp:ObjectDataSource>
                                <div id="NHD_ASPxPivotGrid2" style="font-size: medium; color: Gray; height: 190Px; display: none;" runat="server">No hay datos para mostrar.</div>
                            </div>

                        </div>
                    </div>

                    <div class="AnchoTotal bordeAbajo FlotarIzquierda" style="margin-top: 20px;">
                        <div id="pnlGridPeriodo">

                            <table align="left" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="width: 20px;">
                                        <uc1:ToolTipGenerico ID="ttginfoHistorico" runat="server" />
                                    </td>
                                    <td>
                                        <li class="list-header">Histórico de creación de solicitudes por Estado
                                        </li>
                                        <hr class="hr" />
                                    </td>
                                </tr>
                            </table>

                            <div class="bordeArriba" style="padding: 0px 0px 15px 0px;">

                                <dx:ASPxPivotGrid runat="server"
                                    DataSourceID="ObjectDataSource3"
                                    Width="100%" ID="ASPxPivotGrid3" Style="text-align: center; font-weight: 700;" ClientIDMode="AutoID" CssClass="SinScroll">

                                    <Fields>
                                        <dx:PivotGridField Area="ColumnArea" AreaIndex="1" Caption="Periodo" Visible="true" FieldName="Periodo" ID="PivotGridField27" SortOrder="Descending" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="RowArea" AreaIndex="1" Caption="IdTipoSolicitud" Visible="false" FieldName="IdTipoSolicitud" ID="PivotGridField28" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="RowArea" AreaIndex="1" Caption="Tipo Solicitud" Visible="True" FieldName="NombreTipoSolicitud" ID="PivotGridField29" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="RowArea" AreaIndex="1" Caption="IdEstado" Visible="false" FieldName="IdEstado" ID="PivotGridField30" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="ColumnArea" AreaIndex="2" Caption="Estado" Visible="True" FieldName="NombreEstado" ID="PivotGridField31" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="DataArea" AreaIndex="1" Caption="Cantidad" Visible="True" FieldName="Cantidad" ID="PivotGridField32" Options-AllowDrag="False" />
                                    </Fields>
                                    <OptionsView ShowHorizontalScrollBar="True" ShowFilterHeaders="False"></OptionsView>

                                    <OptionsLoadingPanel Text="Cargando&amp;hellip;">
                                        <Image Url="~/App_Themes/Office2010Silver/PivotGrid/Loading.gif">
                                        </Image>
                                        <Style ImageSpacing="5px">
    </Style>
                                    </OptionsLoadingPanel>
                                    <Images SpriteCssFilePath="~/App_Themes/Office2010Silver/{0}/sprite.css">
                                        <CustomizationFieldsBackground Url="~/App_Themes/Office2010Silver/PivotGrid/pcHBack.png">
                                        </CustomizationFieldsBackground>
                                        <LoadingPanel Url="~/App_Themes/Office2010Silver/PivotGrid/Loading.gif">
                                        </LoadingPanel>
                                    </Images>
                                    <Styles CssFilePath="~/App_Themes/Office2010Silver/{0}/styles.css"
                                        CssPostfix="Office2010Silver">
                                        <LoadingPanel ImageSpacing="5px">
                                        </LoadingPanel>
                                    </Styles>
                                    <StylesPager>
                                        <PageNumber ForeColor="#3E4846">
                                        </PageNumber>
                                        <Summary ForeColor="#1E395B">
                                        </Summary>
                                    </StylesPager>
                                    <StylesEditors ButtonEditCellSpacing="0">
                                    </StylesEditors>
                                </dx:ASPxPivotGrid>

                                <asp:ObjectDataSource ID="ObjectDataSource3" runat="server" TypeName="VisualSoft.Suite80.BL.BL_DashBoard_Solicitudes"
                                    SelectMethod="ObtieneTotalPeriodo_Tipo_EstadoAprDev" OldValuesParameterFormatString="original_{0}">
                                    <SelectParameters>
                                        <asp:Parameter DefaultValue="2" Name="prTipoEstado" Type="Int32" />
                                        <asp:Parameter DefaultValue="0" Name="_idCliente" Type="Int32" />
                                        <asp:ControlParameter ControlID="hdfIdUsuarioLogeado" DefaultValue="" Name="prIdUsuario" PropertyName="Value" Type="Int32" />
                                        <asp:ControlParameter ControlID="hdfIdTipSolAprLeer" Name="vcTipSolAprLeer" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfIdTipSolAprResp" Name="vcTipSolAprResp" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfCodEmp" Name="vcCodEmp" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfCodIntRes" Name="vcCodIntRes" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfIdTipSolTecAsi" Name="vcTipSolTecAsi" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfIdTipSolTecPro" Name="vcTipSolTecPro" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfIdTipSolTecCulAnu" Name="vcTipSolTecCulAnu" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="ddlPeriodo" DefaultValue="" Name="prPeriodo" PropertyName="SelectedValue" Type="String" />
                                    </SelectParameters>

                                </asp:ObjectDataSource>
                                <div id="NHD_ASPxPivotGrid3" style="font-size: medium; color: Gray; height: 190Px; display: none;" runat="server">No hay datos para mostrar.</div>
                            </div>

                        </div>
                    </div>
                </div>
                <div id="pnlProceso" class="AnchoTotal" runat="server">
                    <div class="AnchoTotal bordeAbajo FlotarIzquierda">
                        <div id="pnlPieProceso" class="bordeDerecha">
                            <%--<div class="subTitulo bordeAbajo ui-state-active">Solicitudes Por Estado (%)</div>--%>

                            <li style="margin-left: 20px;" class="list-header">Distribución Por Estado (%)
                            </li>
                            <hr style="margin-left: 20px;" class="hr" />

                            <div class="bordeArriba">
                                <div class="DivControls" style="display: none;">
                                    <span style="margin-right: 7px;">Periodo: </span>
                                    <asp:DropDownList ID="ddlPeriodoProceso" runat="server"></asp:DropDownList>
                                </div>
                                <div id="contentChartPieProceso"></div>
                            </div>

                        </div>
                        <div id="pnlGridPieProceso">
                            <%--<div class="subTitulo bordeAbajo ui-state-active">Tipos De Solicitudes Por Estado</div>--%>

                            <li style="margin-left: 20px;" class="list-header">Tipos De Solicitudes Por Estado
                            </li>
                            <hr style="margin-left: 20px;" class="hr" />

                            <div class="bordeArriba">

                                <dx:ASPxPivotGrid runat="server"
                                    DataSourceID="odsSolicitudesPeriodo"
                                    Width="617" ID="DevPivotSolicitudesPeriodo" Style="text-align: center; font-weight: 700;" Height="225" ClientIDMode="AutoID" CssClass="SinScroll">

                                    <Fields>
                                        <dx:PivotGridField Area="RowArea" AreaIndex="1" Caption="Periodo" Visible="false" FieldName="Periodo" ID="fieldOperador" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="RowArea" AreaIndex="1" Caption="IdTipoSolicitud" Visible="false" FieldName="IdTipoSolicitud" ID="fieldNombreSucursal" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="ColumnArea" AreaIndex="1" Caption="Tipo Solicitud" Visible="True" FieldName="NombreTipoSolicitud" ID="PivotGridField1" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="RowArea" AreaIndex="1" Caption="IdEstado" Visible="false" FieldName="IdEstado" ID="PivotGridField2" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="RowArea" AreaIndex="2" Caption="Estado" Visible="True" FieldName="NombreEstado" ID="PivotGridField3" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="DataArea" AreaIndex="1" Caption="Cantidad" Visible="True" FieldName="Cantidad" ID="PivotGridField4" Options-AllowDrag="False" />
                                    </Fields>
                                    <OptionsView ShowHorizontalScrollBar="True" ShowFilterHeaders="False"></OptionsView>
                                    <OptionsLoadingPanel Text="Cargando&amp;hellip;">
                                        <Image Url="~/App_Themes/Office2010Silver/PivotGrid/Loading.gif">
                                        </Image>
                                        <Style ImageSpacing="5px">
                            </Style>
                                    </OptionsLoadingPanel>

                                    <Images SpriteCssFilePath="~/App_Themes/Office2010Silver/{0}/sprite.css">
                                        <CustomizationFieldsBackground Url="~/App_Themes/Office2010Silver/PivotGrid/pcHBack.png">
                                        </CustomizationFieldsBackground>
                                        <LoadingPanel Url="~/App_Themes/Office2010Silver/PivotGrid/Loading.gif">
                                        </LoadingPanel>
                                    </Images>
                                    <Styles CssFilePath="~/App_Themes/Office2010Silver/{0}/styles.css"
                                        CssPostfix="Office2010Silver">
                                        <LoadingPanel ImageSpacing="5px">
                                        </LoadingPanel>
                                    </Styles>
                                    <StylesPager>
                                        <PageNumber ForeColor="#3E4846">
                                        </PageNumber>
                                        <Summary ForeColor="#1E395B">
                                        </Summary>
                                    </StylesPager>
                                    <StylesEditors ButtonEditCellSpacing="0">
                                    </StylesEditors>

                                </dx:ASPxPivotGrid>

                                <asp:ObjectDataSource ID="odsSolicitudesPeriodo" runat="server" TypeName="VisualSoft.Suite80.BL.BL_DashBoard_Solicitudes" SelectMethod="ObtieneCantidadSolicitudesDev"
                                    OldValuesParameterFormatString="original_{0}">
                                    <SelectParameters>
                                        <asp:ControlParameter ControlID="ddlPeriodo" DefaultValue="" Name="prPeriodo" PropertyName="SelectedValue" Type="String" />
                                        <asp:Parameter Name="prTipoEstado" Type="Int32" DefaultValue="3" />
                                        <asp:Parameter Name="_idCliente" Type="Int32" DefaultValue="0" />
                                        <asp:ControlParameter ControlID="hdfIdUsuarioLogeado" Name="prIdUsuario" PropertyName="Value" Type="Int32" />
                                        <asp:ControlParameter ControlID="hdfIdTipSolAprLeer" Name="vcTipSolAprLeer" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfIdTipSolAprResp" Name="vcTipSolAprResp" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfCodEmp" Name="vcCodEmp" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfCodIntRes" Name="vcCodIntRes" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfIdTipSolTecAsi" Name="vcTipSolTecAsi" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfIdTipSolTecPro" Name="vcTipSolTecPro" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfIdTipSolTecCulAnu" Name="vcTipSolTecCulAnu" PropertyName="Value" Type="String" />
                                    </SelectParameters>

                                </asp:ObjectDataSource>
                                <div id="NHD_DevPivotSolicitudesPeriodo" style="font-size: medium; color: Gray; height: 190Px; display: none;" runat="server">No hay datos para mostrar.</div>
                            </div>
                        </div>
                    </div>
                    <div class="AnchoTotal bordeAbajo FlotarIzquierda" style="margin-top: 50px;">
                        <div id="pnlUmbralesProceso" class="FlotarIzquierda">
                            <%--<div class="subTitulo bordeAbajo ui-state-active">Umbrales De Proceso</div>--%>
                            <li style="margin-left: 20px; z-index: -9999;" class="list-header">Umbrales De Proceso
                            </li>
                            <hr style="margin-left: 20px;" class="hr" />

                            <div id="dvUmbralesProceso" class="bordeArriba">
                                <table id="gridUmbralesProceso">
                                </table>
                                <div id="pagerUmbralesProceso">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="AnchoTotal bordeAbajo FlotarIzquierda" style="display: none">
                        <div id="pnlBarrasProceso">
                            <li style="margin-left: 20px;" class="list-header">Histórico De Umbrales
                            </li>
                            <hr style="margin-left: 20px;" class="hr" />

                            <div class="bordeArriba">
                                <div class="DivControls">
                                    <span style="margin-right: 7px;">Umbral :</span><asp:DropDownList ID="ddlTipoUmbralProceso" runat="server">
                                        <asp:ListItem Value="1" Text="Sin Umbral"></asp:ListItem>
                                        <asp:ListItem Value="2" Text="Dentro de umbral"></asp:ListItem>
                                        <asp:ListItem Value="3" Text="Fuera de umbral"></asp:ListItem>
                                        <asp:ListItem Value="4" Text="Total" Selected="True"></asp:ListItem>
                                    </asp:DropDownList>
                                </div>
                                <div id="contentChartUmbralProceso"></div>
                            </div>

                        </div>
                    </div>
                    <div class="AnchoTotal bordeAbajo FlotarIzquierda" style="margin-top: 15px;">
                        <div id="pnlGridProceso">

                            <li style="margin-left: 20px;" class="list-header">Responsables Por Estado
                            </li>
                            <hr style="margin-left: 20px;" class="hr" />

                            <div class="bordeArriba">
                                <dx:ASPxPivotGrid runat="server"
                                    DataSourceID="odsSolicitudesResponsable"
                                    Width="100%" ID="DevPivotSolicitudesResponsable" Style="text-align: center; font-weight: 700;" ClientIDMode="AutoID" CssClass="SinScroll">

                                    <Fields>
                                        <dx:PivotGridField Area="RowArea" AreaIndex="6" Caption="IdEmpleado" Visible="false" FieldName="IdEmpleado" ID="PivotGridField5" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="RowArea" AreaIndex="1" Caption="Responsable" Visible="True" FieldName="NombreEmpleado" ID="PivotGridField6" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="RowArea" AreaIndex="1" Caption="IdEstado" Visible="False" FieldName="IdEstado" ID="PivotGridField7" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="ColumnArea" AreaIndex="1" Caption="Estado" Visible="True" FieldName="NombreEstado" ID="PivotGridField8" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="DataArea" AreaIndex="1" Caption="Cantidad" Visible="True" FieldName="Cantidad" ID="PivotGridField9" Options-AllowDrag="False" />
                                    </Fields>
                                    <OptionsView ShowHorizontalScrollBar="True" ShowFilterHeaders="False"></OptionsView>

                                    <OptionsLoadingPanel Text="Cargando&amp;hellip;">
                                        <Image Url="~/App_Themes/Office2010Silver/PivotGrid/Loading.gif">
                                        </Image>
                                        <Style ImageSpacing="5px">
    </Style>
                                    </OptionsLoadingPanel>
                                    <Images SpriteCssFilePath="~/App_Themes/Office2010Silver/{0}/sprite.css">
                                        <CustomizationFieldsBackground Url="~/App_Themes/Office2010Silver/PivotGrid/pcHBack.png">
                                        </CustomizationFieldsBackground>
                                        <LoadingPanel Url="~/App_Themes/Office2010Silver/PivotGrid/Loading.gif">
                                        </LoadingPanel>
                                    </Images>
                                    <Styles CssFilePath="~/App_Themes/Office2010Silver/{0}/styles.css"
                                        CssPostfix="Office2010Silver">
                                        <LoadingPanel ImageSpacing="5px">
                                        </LoadingPanel>
                                    </Styles>
                                    <StylesPager>
                                        <PageNumber ForeColor="#3E4846">
                                        </PageNumber>
                                        <Summary ForeColor="#1E395B">
                                        </Summary>
                                    </StylesPager>
                                    <StylesEditors ButtonEditCellSpacing="0">
                                    </StylesEditors>
                                </dx:ASPxPivotGrid>

                                <asp:ObjectDataSource ID="odsSolicitudesResponsable" runat="server" TypeName="VisualSoft.Suite80.BL.BL_DashBoard_Solicitudes"
                                    SelectMethod="ObtieneCantidadSolicitudes_porResponsablesDev"
                                    OldValuesParameterFormatString="original_{0}">
                                    <SelectParameters>
                                        <asp:Parameter DefaultValue="3" Name="prTipoEstado" Type="Int32" />
                                        <asp:Parameter DefaultValue="0" Name="_idCliente" Type="Int32" />
                                        <asp:ControlParameter ControlID="hdfIdUsuarioLogeado" DefaultValue="" Name="prIdUsuario" PropertyName="Value" Type="Int32" />
                                        <asp:ControlParameter ControlID="hdfCodIntRes" Name="vcCodIntRes" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfIdTipSolResTec" Name="vcIdTipSol" PropertyName="Value" Type="String" />
                                    </SelectParameters>
                                </asp:ObjectDataSource>
                                <div id="NHD_DevPivotSolicitudesResponsable" style="font-size: medium; color: Gray; height: 190Px; display: none;" runat="server">No hay datos para mostrar.</div>
                            </div>

                        </div>
                    </div>
                    <div class="AnchoTotal bordeAbajo FlotarIzquierda" style="margin-top: 15px;">
                        <div id="pnlGridPeriodoProceso">
                            <%--<div class="subTitulo bordeAbajo ui-state-active">Histórico De Tipo Solicitud Por Estado </div>--%>

                            <li style="margin-left: 20px;" class="list-header">Histórico De Tipo Solicitud Por Estado
                            </li>
                            <hr style="margin-left: 20px;" class="hr" />


                            <div class="bordeArriba">

                                <dx:ASPxPivotGrid runat="server"
                                    DataSourceID="odsSolicitudesTotalPeriodo"
                                    Width="100%" ID="DevPivotSolicitudesTotalPeriodo" Style="text-align: center; font-weight: 700;" ClientIDMode="AutoID" CssClass="SinScroll">

                                    <Fields>
                                        <dx:PivotGridField Area="ColumnArea" AreaIndex="1" Caption="Periodo" Visible="true" FieldName="Periodo" ID="PivotGridField11" SortOrder="Descending" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="RowArea" AreaIndex="1" Caption="IdTipoSolicitud" Visible="false" FieldName="IdTipoSolicitud" ID="PivotGridField12" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="RowArea" AreaIndex="1" Caption="Tipo Solicitud" Visible="True" FieldName="NombreTipoSolicitud" ID="PivotGridField13" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="RowArea" AreaIndex="1" Caption="IdEstado" Visible="false" FieldName="IdEstado" ID="PivotGridField14" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="ColumnArea" AreaIndex="2" Caption="Estado" Visible="True" FieldName="NombreEstado" ID="PivotGridField15" Options-AllowDrag="False" />
                                        <dx:PivotGridField Area="DataArea" AreaIndex="1" Caption="Cantidad" Visible="True" FieldName="Cantidad" ID="PivotGridField16" Options-AllowDrag="False" />
                                    </Fields>
                                    <OptionsView ShowHorizontalScrollBar="True" ShowFilterHeaders="False"></OptionsView>

                                    <OptionsLoadingPanel Text="Cargando&amp;hellip;">
                                        <Image Url="~/App_Themes/Office2010Silver/PivotGrid/Loading.gif">
                                        </Image>
                                        <Style ImageSpacing="5px">
    </Style>
                                    </OptionsLoadingPanel>
                                    <Images SpriteCssFilePath="~/App_Themes/Office2010Silver/{0}/sprite.css">
                                        <CustomizationFieldsBackground Url="~/App_Themes/Office2010Silver/PivotGrid/pcHBack.png">
                                        </CustomizationFieldsBackground>
                                        <LoadingPanel Url="~/App_Themes/Office2010Silver/PivotGrid/Loading.gif">
                                        </LoadingPanel>
                                    </Images>
                                    <Styles CssFilePath="~/App_Themes/Office2010Silver/{0}/styles.css"
                                        CssPostfix="Office2010Silver">
                                        <LoadingPanel ImageSpacing="5px">
                                        </LoadingPanel>
                                    </Styles>
                                    <StylesPager>
                                        <PageNumber ForeColor="#3E4846">
                                        </PageNumber>
                                        <Summary ForeColor="#1E395B">
                                        </Summary>
                                    </StylesPager>
                                    <StylesEditors ButtonEditCellSpacing="0">
                                    </StylesEditors>
                                </dx:ASPxPivotGrid>

                                <asp:ObjectDataSource ID="odsSolicitudesTotalPeriodo" runat="server" TypeName="VisualSoft.Suite80.BL.BL_DashBoard_Solicitudes"
                                    SelectMethod="ObtieneTotalPeriodo_Tipo_EstadoAprDev" OldValuesParameterFormatString="original_{0}">
                                    <SelectParameters>
                                        <asp:Parameter DefaultValue="3" Name="prTipoEstado" Type="Int32" />
                                        <asp:Parameter DefaultValue="0" Name="_idCliente" Type="Int32" />
                                        <asp:ControlParameter ControlID="hdfIdUsuarioLogeado" DefaultValue="" Name="prIdUsuario" PropertyName="Value" Type="Int32" />
                                        <asp:ControlParameter ControlID="hdfIdTipSolAprLeer" Name="vcTipSolAprLeer" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfIdTipSolAprResp" Name="vcTipSolAprResp" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfCodEmp" Name="vcCodEmp" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfCodIntRes" Name="vcCodIntRes" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfIdTipSolTecAsi" Name="vcTipSolTecAsi" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfIdTipSolTecPro" Name="vcTipSolTecPro" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="hdfIdTipSolTecCulAnu" Name="vcTipSolTecCulAnu" PropertyName="Value" Type="String" />
                                        <asp:ControlParameter ControlID="ddlPeriodo" DefaultValue="" Name="prPeriodo" PropertyName="SelectedValue" Type="String" />
                                    </SelectParameters>

                                </asp:ObjectDataSource>
                                <div id="NHD_DevPivotSolicitudesTotalPeriodo" style="font-size: medium; color: Gray; height: 190Px; display: none;" runat="server">No hay datos para mostrar.</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>

    <%--<script src="../../Content/js/shared/nifty.min.js"></script>--%>
</body>
</html>
