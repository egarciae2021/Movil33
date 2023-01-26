<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_DashBoard_DashBoard_II"
    CodeBehind="DashBoard_II.aspx.vb" %>

<%@ Register Assembly="DevExpress.Web.ASPxPivotGrid.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=B88D1754D700E49A"
    Namespace="DevExpress.Web.ASPxPivotGrid" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxPivotGrid.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.Web.ASPxPivotGrid.Export" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxPivotGrid.v12.2" Namespace="DevExpress.Web.ASPxPivotGrid" TagPrefix="dx" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/FusionCharts/FusionCharts.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/FusionCharts/FusionCharts.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/FusionCharts/FusionCharts.jqueryplugin.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="DashBoard_Global.css" rel="stylesheet" type="text/css" />
    <link href="DashBoard_II.css" rel="stylesheet" type="text/css" />
    <script src="DashBoard_II.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfEsValido" runat="server" />
        <div id="General">
            <div id="pnlTap" style="display: none !important;">
                <div class="CuerpoTap esPrimerTap">
                    <div class="Tap ui-state-active">
                        Estados de Aprobación
                    </div>
                </div>
                <div class="CuerpoTap">
                    <div class="Tap TapNoSelecionado">
                        Estados de Proceso
                    </div>
                </div>
            </div>
            <div style="float: right; margin-top: 2px;">
                <asp:DropDownList Style="float: right;" ID="ddlMesesTipo" runat="server"></asp:DropDownList><span style="margin-right: 7px; float: right; margin-top: 5px;">Periodo: </span>
                <div style="clear: both;"></div>
                <span style="color: red">(*) Periodo sólo afecta a Incidencias por tipo, Incidencias por tipificación y promedio de resolución de incidencias</span>
            </div>
            <div class="LimpiarFloat">
            </div>
            <div id="pnlCuerpo" class="AnchoTotal">

                <div class="AnchoTotal bordeAbajo FlotarIzquierda">
                    <div id="pnlTipo" class="bordeDerecha">

                        <li style="margin-left: 20px;" class="list-header">Incidencias por tipo
                        </li>
                        <hr style="margin-left: 20px;" class="hr" />

                        <div class="bordeArriba">
                            <div id="contentChartTipo">
                            </div>
                        </div>
                    </div>
                    <div id="pnlTipificacion">
                        <%--<div class="subTitulo bordeAbajo ui-state-active">Incidencias por tipificación (%)</div>--%>

                        <li style="margin-left: 20px;" class="list-header">Distribución por tipificación (%)
                        </li>
                        <hr style="margin-left: 20px;" class="hr" />

                        <div class="bordeArriba">
                            <div style="font-size: medium; color: Gray; width: 300px; position: relative; left: 0px; top: 0px; display: none;" id="nohayDatosTipi">No hay datos para mostrar.</div>
                            <div id="contentChartTipificacion">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="AnchoTotal bordeAbajo FlotarIzquierda" style="margin-top: 15px;">
                    <div id="pnlAVG">
                        <%--<div class="subTitulo ui-state-active">Promedio de resolución de incidencias</div>--%>

                        <li style="margin-left: 20px;" class="list-header">Promedio de resolución de incidencias
                        </li>
                        <hr style="margin-left: 20px;" class="hr" />

                        <div class="bordeArriba">
                            <div class="DivControls" style="margin-top: -5px;">
                                <span style="margin-right: 7px;">Nivel :</span><asp:DropDownList ID="ddlNivel" runat="server">
                                </asp:DropDownList>
                            </div>
                            <div id="contentChartAVG" style="margin-top: 5px;">
                            </div>
                            <div style="width: 280px; position: relative; left: 380px; bottom: 10px; z-index: 99999; border-radius: 5px; padding: 3px 5px 3px 0px; font-size: 8pt; font-weight: lighter;" class="ui-state-active">
                                <ul>
                                    <li>
                                        <b>Promedio activo:</b> Tiempo promedio que demora en comenzar la atención
                                    </li>
                                    <li>
                                        <b>Promedio resuelto:</b> Tiempo promedio que demora desde que comenzó la atención hasta finalizarla
                                    </li>
                                    <li>
                                        <b>Promedio total:</b> Tiempo promedio total desde el registro hasta finalizarla
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="AnchoTotal bordeAbajo FlotarIzquierda" style="margin-top: 15px;">
                    <div id="pnlGridPeriodo">

                        <li style="margin-left: 20px;" class="list-header">Incidencias por mes
                        </li>
                        <hr style="margin-left: 20px;" class="hr" />

                        <div class="bordeArriba">
                            <div class="DivControls">
                                <span style="margin-right: 7px;">Nivel :</span><asp:DropDownList ID="ddlNivelMeses"
                                    runat="server">
                                </asp:DropDownList>
                                <span style="margin-right: 7px;">Bolsa :</span><asp:DropDownList ID="ddlBolsa" runat="server">
                                </asp:DropDownList>
                            </div>
                            <div id="contentChartMeses">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="AnchoTotal bordeAbajo FlotarIzquierda" style="margin-top: 15px;">
                    <div id="pnlGridDetalle">

                        <li style="margin-left: 20px;" class="list-header">Detalle de incidencias por mes
                        </li>
                        <hr style="margin-left: 20px;" class="hr" />

                        <div class="bordeArriba">
                            <dx:ASPxPivotGrid runat="server" DataSourceID="odsOrganizacion" Width="100%" ID="ASPxPivotGrid1"
                                Style="text-align: center; font-weight: 700;" Height="300px" ClientIDMode="AutoID">
                                <Fields>
                                    <dx:PivotGridField Area="RowArea" AllowedAreas="All" AreaIndex="0" Caption="IdPeriodo" Visible="false" Width="1" FieldName="IdPeriodo" ID="fieldOperador">
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
                                    <dx:PivotGridField Area="RowArea" AreaIndex="1" Caption="Periodo" Visible="True" SortOrder="Descending"
                                        FieldName="Periodo" ID="fieldNombreSucursal" CellFormat-FormatString="dd-MM-yyyy" CellFormat-FormatType="DateTime" EmptyCellText="0" EmptyValueText="0">
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
                                    <dx:PivotGridField Area="ColumnArea" AreaIndex="1" Caption="codestado" Visible="false"
                                        FieldName="codestado" ID="PivotGridField1">
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
                                    <dx:PivotGridField Area="ColumnArea" AreaIndex="1" Caption="Estado" Visible="true"
                                        FieldName="Estado" ID="PivotGridField3">
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
                                    <dx:PivotGridField Area="DataArea" AreaIndex="1" Caption="Cantidad" Visible="True"
                                        FieldName="Cantidad" ID="PivotGridField2">
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
                                <Styles CssFilePath="~/App_Themes/Office2010Silver/{0}/styles.css" CssPostfix="Office2010Silver">
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
                            <asp:ObjectDataSource ID="odsOrganizacion" runat="server" TypeName="VisualSoft.Suite80.BL.BL_DashBoard_Incidencias"
                                SelectMethod="ObtieneIncidenciasDetalle_porMes" OldValuesParameterFormatString="original_{0}">
                                <SelectParameters>
                                    <asp:Parameter DefaultValue="0" Name="_idCliente" Type="Int32" />
                                </SelectParameters>
                            </asp:ObjectDataSource>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
