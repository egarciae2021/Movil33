<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_BienvenidaMovil" Codebehind="BienvenidaMovil.aspx.vb" %>

<%@ Register assembly="DevExpress.Web.ASPxGauges.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxGauges" tagprefix="dx" %>
<%@ Register assembly="DevExpress.Web.ASPxGauges.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxGauges.Gauges" tagprefix="dx" %>
<%@ Register assembly="DevExpress.Web.ASPxGauges.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxGauges.Gauges.Linear" tagprefix="dx" %>
<%@ Register assembly="DevExpress.Web.ASPxGauges.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxGauges.Gauges.Circular" tagprefix="dx" %>
<%@ Register assembly="DevExpress.Web.ASPxGauges.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxGauges.Gauges.State" tagprefix="dx" %>
<%@ Register assembly="DevExpress.Web.ASPxGauges.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxGauges.Gauges.Digital" tagprefix="dx" %>


<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script type="text/javascript" src="../Common/Scripts/FusionCharts/FusionCharts.js"></script>
    <script src="BienvenidaMovil.js" type="text/javascript"></script>

    <script src="../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <%--<img id="imgFondo" height="100%" width="100%" alt="FondoCelular" src="../Images/fondoDashboard.png" 
        style="left:0%; top:0%; position:fixed;"/>--%>
        <%--<div style="background-image: url(../Images/fondoDashboard.png);position: relative; display: inline-block; background-repeat:repeat-x">--%>
        <div>
            <div class="ui-tabs-panel ui-widget-content" style="border: 0px solid; background:none;">
                <h1>Módulo de Moviles</h1>
            </div>
            
            <table width="1000px" align="center" border="0" id="Table1" runat="server">
                <tr style="background-image: url(../Images/fondoDashboard.png);position: relative;background-repeat:repeat; width: 100%;">
                    <td colspan="3">
                        <table border="0" width="100%">
                            <tr>
                                <td align="center">
                                    <span id="Titulo" style="font-size:16px;">Informaci&oacute;n Resumida</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table id="tbPeriodo" border="0">  
                                        <tr>
                                            <td align="right" >
                                            Periodo: 
                                            </td>
                                            <td style="width: 100px;" align="left" >
                                                <asp:DropDownList ID="ddlPeriodo" runat="server">
                                                    <asp:ListItem Text="Ene 2013" Value="01"></asp:ListItem>
                                                    <asp:ListItem Text="Feb 2013" Value="02"></asp:ListItem>
                                                    <asp:ListItem Text="Mar 2013" Value="03"></asp:ListItem>
                                                    <asp:ListItem Text="Abr 2013" Value="04"></asp:ListItem>
                                                    <asp:ListItem Text="May 2013" Value="05"></asp:ListItem>
                                                    <asp:ListItem Text="Jun 2013" Value="06"></asp:ListItem>
                                                    <asp:ListItem Text="Jul 2013" Value="07"></asp:ListItem>
                                                    <asp:ListItem Text="Ago 2013" Value="08"></asp:ListItem>
                                                    <asp:ListItem Text="Set 2013" Value="09"></asp:ListItem>
                                                    <asp:ListItem Text="Oct 2013" Value="10"></asp:ListItem>
                                                    <asp:ListItem Text="Nov 2013" Value="11"></asp:ListItem>
                                                    <asp:ListItem Text="Dic 2013" Value="12"></asp:ListItem>
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr height="10px"><td colspan="3"></td></tr>
	            <tr>
                    <td class ="cabeceraSubTitulo" style="width: 650px;">
                        Estado de Solicitudes
                    </td>
                    <td style="width:10px;">
                    </td>
                    <td class ="cabeceraSubTitulo">
                        Rendimiento
                    </td>
                </tr>
                <tr>
                    <td valign="top" >
                        <table border="0" style="width: 100%;">
                            <tr>
                                <td align="center" width="20%" id="tdCambio" class="CampoEstadoSolicitud" >
                                    <div align="right"><asp:Label ID="lblCantidadCambio" runat="server" Text="(Valor)"></asp:Label></div>
                                    <img class="ImagenEstadoSolicitud" src="../Images/DashboardMovil/change_26.png" alt="" height="24" />
                                    <br />
                                    Cambio
                                </td>
                                <td align="center" width="20%" id="tdNuevos" class="CampoEstadoSolicitud" >
                                    <div align="right"><asp:Label ID="lblCantidadNuevos" runat="server" Text="(Valor)"></asp:Label></div>
                                    <img class="ImagenEstadoSolicitud" src="../Images/DashboardMovil/new_24.png" alt="" height="24" />
                                    <br />
                                    Nuevos
                                </td>
                                <td align="center" width="20%" id="tdPerdida" class="CampoEstadoSolicitud" >
                                    <div align="right"><asp:Label ID="lblCantidadPerdida" runat="server" Text="(Valor)"></asp:Label></div>
                                    <img class="ImagenEstadoSolicitud" src="../Images/DashboardMovil/robo.png" alt="" height="24" />
                                    <br />
                                    P&eacute;rdida o Robo
                                </td>
                                <td align="center" width="20%" id="tdReposicion" class="CampoEstadoSolicitud" >
                                    <div align="right"><asp:Label ID="lblCantidadReposicion" runat="server" Text="(Valor)"></asp:Label></div>
                                    <img class="ImagenEstadoSolicitud" src="../Images/DashboardMovil/Replace_24.png" alt="" height="24" />
                                    <br />
                                    Reposici&oacute;n
                                </td>
                                <td align="center" width="20%" id="tdReparacion" class="CampoEstadoSolicitud" >
                                    <div align="right"><asp:Label ID="lblCantidadReparacion" runat="server" Text="(Valor)"></asp:Label></div>
                                    <img class="ImagenEstadoSolicitud" src="../Images/DashboardMovil/repair_24.png" alt="" height="24" />
                                    <br />
                                    Reparaci&oacute;n
                                </td>
                            </tr>
                        </table>
                        <br />
                        <span id="lblMensajeSolicitud"></span>
                    </td>
                    <td style="width:10px;">
                    </td>
                    <td >
                        <table border="0" cellpadding ="0" cellspacing="0">
                            <tr>
                                <td>
                                    <dx:ASPxGaugeControl runat="server" Width="165px" Height="118px" 
                                        BackColor="Transparent" ID="gaugeControl" ClientInstanceName="gauge"
                                        SaveStateOnCallbacks="false" >
                                        <Gauges>
                                            <dx:CircularGauge ID="cGauge1" Bounds="0, 0, 165, 118">
                                                <backgroundlayers>
                                                                <dx:ArcScaleBackgroundLayerComponent Name="bg" ScaleCenterPos="0.5, 0.822" ScaleID="scale1"
                                                                    Size="250, 152" ZOrder="1000" ShapeType="CircularHalf_Style5"></dx:ArcScaleBackgroundLayerComponent>
                                                            </backgroundlayers>
                                                <labels>
                                                                <dx:LabelComponent AppearanceText-Font="Tahoma, 16pt" 
                                                                    AppearanceText-TextBrush="&lt;BrushObject Type=&quot;Solid&quot; Data=&quot;Color:WhiteSmoke&quot;/&gt;"
                                                                    Text="Consumo" Name="criteria" Position="125, 100" ZOrder="-25"></dx:LabelComponent>
                                                                <dx:LabelComponent AppearanceText-Font="Tahoma, 10pt, style=Bold" 
                                                                    Text="&lt;color=#666666&gt;Avance Consumo"
                                                                    AllowHTMLString="True" Name="circularGauge1_Label2" Position="125, 180" Size="200, 25">
                                                                </dx:LabelComponent>
                                                            </labels>
                                                <needles>
                                                                <dx:ArcScaleNeedleComponent EndOffset="-7.5" StartOffset="-5" ScaleID="scale1" Name="needleHP2"
                                                                    ZOrder="-50" ShapeType="CircularFull_Style21"></dx:ArcScaleNeedleComponent>
                                                            </needles>
                                                <scales>
                                                                <dx:ArcScaleComponent Name="scale1" MaxValue="100" Value="80" MinorTickmark-ShapeType="Circular_Style13_4"
                                                                    MinorTickmark-ShapeOffset="4" Center="125, 130" EndAngle="0" MajorTickCount="7"
                                                                    MinorTickCount="4" MajorTickmark-TextOffset="10" MajorTickmark-TextOrientation="LeftToRight"
                                                                    MajorTickmark-FormatString="{0:F0}" MajorTickmark-ShapeType="Circular_Style13_5"
                                                                    MajorTickmark-ShapeOffset="-7" StartAngle="-180" RadiusX="105" RadiusY="105"
                                                                    AppearanceTickmarkText-Font="Tahoma, 6pt, style=Bold" >
                                                                </dx:ArcScaleComponent>
                                                            </scales>
                                            </dx:CircularGauge>
                                        </Gauges>

                                    <LayoutPadding All="0" Left="0" Top="0" Right="0" Bottom="0"></LayoutPadding>
                                    </dx:ASPxGaugeControl>
                                </td>
                                <td>
                                    <table width="140px" border="0">
                                        <tr>
                                            <td align="right" style="height:32px;">
                                                Consumo Total:
                                            </td>
                                            <td>
                                                Valor
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="right" style="height:32px;">
                                                Objetivo:
                                            </td>
                                            <td>
                                                Valor
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="right" style="height:32px;">
                                                Variaci&oacute;n %:
                                            </td>
                                            <td>
                                                Valor
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        
                    </td>
                </tr>
                <tr height="15px">
                    <td colspan ="3"></td> 
                </tr>
                <tr>
                    <td class ="cabeceraSubTitulo">
                        Hist&oacute;rico de Consumo
                    </td>
                    <td style="width:10px;">
                    </td>
                    <td class ="cabeceraSubTitulo">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    Distribuci&oacute;n por Servicio
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td valign="top">
                        <table border="0" style="width:100%;">
                            <tr>
                                <td align="right" >
                                    Servicio Global: 
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlGlobal" runat="server">
                                        <asp:ListItem Text="<General>" Value="01"></asp:ListItem>
                                        <asp:ListItem Text="Local" Value="LOC"></asp:ListItem>
                                        <asp:ListItem Text="Celular" Value="CEL"></asp:ListItem>
                                        <asp:ListItem Text="Nacional" Value="DDN"></asp:ListItem>
                                        <asp:ListItem Text="Internacional" Value="DDI"></asp:ListItem>
                                        <asp:ListItem Text="Servicios Celulares" Value="SRCEL"></asp:ListItem>
                                        <asp:ListItem Text="Todos" Value="LOCCELDDNDDISRCEL"></asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" align="center" >
                                   <div id="chartHistorico" style="background: url('../Common')"></div>
                                </td>
                                <td colspan="2" align="center" >
                                   <div id="chartHistoricoMensaje" style="background: url('../Common')"></div>
                                </td>
                                <td colspan="2" align="center" >
                                   <div id="chartHistoricoNavegacion" style="background: url('../Common')"></div>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="width:10px;">
                    </td>
                    <td valign="top" >
                        <table width="100%" border="0" >    
                            <tr>
                                <td align="center" >
                                    <div id="chartServicios"></div>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" >
                                     <table id="tblCampo"></table>
                                </td>
                            </tr>
                        </table>
                        
                    </td>
                </tr>
                <tr>
                    <td valign="top">
                        <table>
                            <tr>
                                <td>
                                    <div id="chartTopArea"></div>
                                </td>
                                <td>
                                    <div id="chartTopEmpleado"></div>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="width:10px;">
                    </td>
                    <td valign="top" >
                    </td>
                </tr>
            </table>
	        <table width="900px" align="center" border="0" id="tbPanel" runat="server">
	            <tr>
                    <td valign="top">
                    </td>

	                <td valign="top" style="width: 300px;" >                        

                        <cc1:BarraNavegacionJQ ID="bnMantenimiento" runat='server'>
                            <cc1:PanelBarraNavegacion ID="pbnMovil" runat="server" Titulo="Importador de L&iacute;neas" MostrarIcono="true" Mostrar="true" Width="300px" Height="106px">
                                <cc1:ItemBarraNavegacion ID="ItemBarraNavegacion2" runat="server" Activo="true" Click="" Font-Bold="false" Seleccionable="false" UrlIco="">
                                    <table style="padding-left:20px;">
                                       <tr>
                                           <td>
                                               <asp:Label ID="label1" runat="server" Text="Ultima Importación realizada: "></asp:Label>
                                               <asp:Label ID="lblUltimaImportacion" runat="server" Text=""></asp:Label>
                                           </td>
                                       </tr>
                                    </table>
                                </cc1:ItemBarraNavegacion>
                                <cc1:ItemBarraNavegacion ID="ItemBarraNavegacion1" runat="server" Activo="true" Click="" Seleccionable="false" Highlight="false" UrlIco="">
                                    <div style="padding-left:25px;">
                                        <asp:Label ID="lblNuevaProgramacion" runat="server" CssClass= "lblLink" Text="Nueva Programación" Font-Underline="true" ForeColor="Blue" ToolTip="Realizar nueva programación"></asp:Label>
                                    </div>
                                </cc1:ItemBarraNavegacion>
                            </cc1:PanelBarraNavegacion>
                        </cc1:BarraNavegacionJQ>

                        <cc1:BarraNavegacionJQ ID="BarraNavegacionJQ2" runat='server'>
                            <cc1:PanelBarraNavegacion ID="PanelBarraNavegacion2" runat="server" Titulo="Administrador de Solicitudes" MostrarIcono="true" Mostrar="true" Width="300px">
                                <cc1:ItemBarraNavegacion ID="ItemBarraNavegacion5" runat="server" Activo="true" Click="" Seleccionable="false" Highlight="false" UrlIco="">                                
                                    <div style="padding-left:20px;">
                                        <asp:Label ID="lblTotalSolicitud" runat="server" Text=""></asp:Label>
                                    </div>
                                </cc1:ItemBarraNavegacion>
                                <cc1:ItemBarraNavegacion ID="ItemBarraNavegacion4" runat="server" Activo="true" Click="" Font-Bold="false" Seleccionable="false" Highlight="true" UrlIco="">
                                    <div style="padding-left:20px;">
                                        <asp:Label ID="lblPorCambio" runat="server" Text=""></asp:Label>
                                    </div>
                                </cc1:ItemBarraNavegacion>
                                <cc1:ItemBarraNavegacion ID="ItemBarraNavegacion7" runat="server" Activo="true" Click="" Font-Bold="false" Seleccionable="false" Highlight="true" UrlIco="">
                                    <div style="padding-left:20px;">
                                        <asp:Label ID="lblPorNuevo" runat="server" Text=""></asp:Label>
                                    </div>
                                </cc1:ItemBarraNavegacion>
                                <cc1:ItemBarraNavegacion ID="ItemBarraNavegacion8" runat="server" Activo="true" Click="" Font-Bold="false" Seleccionable="false" Highlight="true" UrlIco="">
                                    <div style="padding-left:20px;">
                                        <asp:Label ID="lblPorReposicion" runat="server" Text=""></asp:Label>
                                    </div>
                                </cc1:ItemBarraNavegacion>
                                <cc1:ItemBarraNavegacion ID="ItemBarraNavegacion6" runat="server" Activo="true" Click="" Font-Bold="false" Seleccionable="false" Highlight="false" UrlIco="">
                                   <div style="padding-left:20px;">
                                       <asp:Label ID="lblVerSolicitud" runat="server" CssClass= "lblLink" Text="Ver solicitudes ingresadas" Font-Underline="true" ForeColor="Blue" ToolTip="Ver Todos"></asp:Label>                                
                                   </div>
                                </cc1:ItemBarraNavegacion>
                            </cc1:PanelBarraNavegacion>
                        </cc1:BarraNavegacionJQ>

                        <cc1:BarraNavegacionJQ ID="BarraNavegacionJQ1" runat='server'>
                            <cc1:PanelBarraNavegacion ID="PanelBarraNavegacion1" runat="server" Titulo="Consultas" MostrarIcono="true" Mostrar="true" Width="300px">
                                <cc1:ItemBarraNavegacion ID="ItemBarraNavegacion3" runat="server" Activo="true" Click="" Seleccionable="false" Highlight="false" UrlIco="">                                
                                    <table style="padding-left:20px;" >
                                       <tr>
                                           <td align="left" style="width:250px;">
                                               <asp:Label ID="lblConsulta" runat="server" Text=""></asp:Label>
                                           </td>
                                           <td>
                                               <asp:Label ID="lblVerConsulta" runat="server" CssClass= "lblLink" Text="Ver" Font-Underline="true" ForeColor="Blue" ToolTip="Ver listado"></asp:Label>
                                           </td>
                                       </tr>
                                    </table>
                                </cc1:ItemBarraNavegacion>
                            </cc1:PanelBarraNavegacion>
                        </cc1:BarraNavegacionJQ>

                    </td>
                </tr>
	            <tr>
	                <td valign="top" colspan="2" align="center">
                        
                    </td>
                </tr>
            </table>
        </div>
    </form>
</body>
</html>
