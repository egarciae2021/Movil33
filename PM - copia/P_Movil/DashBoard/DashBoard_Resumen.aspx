<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="DashBoard_Resumen.aspx.vb"
    Inherits=".DashBoard_Resumen" %>

<%@ Register Src="../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico"
    TagPrefix="ttgInfo" %>
<%@ Register Assembly="DevExpress.Web.ASPxGauges.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.Web.ASPxGauges" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxGauges.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.Web.ASPxGauges.Gauges" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxGauges.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.Web.ASPxGauges.Gauges.Linear" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxGauges.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.Web.ASPxGauges.Gauges.Circular" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxGauges.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.Web.ASPxGauges.Gauges.State" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxGauges.v12.2, Version=12.2.18.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a"
    Namespace="DevExpress.Web.ASPxGauges.Gauges.Digital" TagPrefix="dx" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register Assembly="DevExpress.Web.ASPxGauges.v12.2" Namespace="DevExpress.Web.ASPxGauges.Gauges"
    TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxGauges.v12.2" Namespace="DevExpress.Web.ASPxGauges.Gauges.Linear"
    TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxGauges.v12.2" Namespace="DevExpress.Web.ASPxGauges.Gauges.Circular"
    TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxGauges.v12.2" Namespace="DevExpress.Web.ASPxGauges.Gauges.State"
    TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxGauges.v12.2" Namespace="DevExpress.Web.ASPxGauges.Gauges.Digital"
    TagPrefix="dx" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" style="background-color: #FFFFFF;"> <%--#F3F5F9--%>

<head runat="server">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title></title>

    <link href="../../Content/css/shared/bootstrap.min.css" rel="stylesheet">
    <link href="../../Content/css/shared/nifty.min.css" rel="stylesheet">

    <link href="../../Content/css/shared/font-awesome.min.css" rel="stylesheet" />
    <link href="../../Content/css/shared/nifty-demo-icons.min.css" rel="stylesheet">


    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../Content/js/shared/jquery_1.7.2/bootstrap.min.js"></script>

    <link href="../../Content/css/shared/dataTables.bootstrap.css" rel="stylesheet" />
    <link href="../../Content/css/shared/responsive.dataTables.min.css" rel="stylesheet" />

    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>



    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <script src="../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.tabs.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.accordion.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.draggable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.resizable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <link href="../SolicitudesAtencion/SOA_Adm_Solicitudes.css" rel="stylesheet" type="text/css" />

    <link href="../../Common/Styles/PrincipalNifty.css" rel="stylesheet" />

    <script type="text/javascript" src="../../Content/js/shared/dataTables/jquery.dataTables.js"></script>
    <script type="text/javascript" src="../../Content/js/shared/dataTables/dataTables.bootstrap.js"></script>
    <script type="text/javascript" src="../../Content/js/shared/dataTables/dataTables.responsive.min.js"></script>

    <%--    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
    <link href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap.min.css" rel="stylesheet" />
    <link href="https://cdn.datatables.net/fixedheader/3.1.5/css/fixedHeader.bootstrap.min.css" rel="stylesheet" />
    <link href="https://cdn.datatables.net/responsive/2.2.3/css/responsive.bootstrap.min.css" rel="stylesheet" />--%>




    <style type="text/css">
        body {
            table-layout: fixed;
        }

        body {
            background-color: #FFFFFF !important; /*F3F5F9 */
        }

        .data-tooltip {
            position: absolute;
            top: 105px;
            margin-bottom: 5px;
            margin-left: -80px;
            padding: 7px;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            background-color: #000;
            background-color: hsla(0, 0%, 20%, 0.9);
            color: #fff;
            font: 11px Verdana !important;
            content: attr(data-tooltip);
            text-align: center;
            font-size: 14px;
            line-height: 1.2;
            z-index: 9999999;
            display: none;
        }
        /* Triangle hack to make tooltip look like a speech bubble */
        .data-tooltip-triangle {
            position: absolute;
            top: 100px;
            margin-left: -5px;
            width: 0;
            border-bottom: 5px solid hsla(0, 0%, 20%, 0.9);
            border-right: 5px solid transparent;
            border-left: 5px solid transparent;
            content: " ";
            font-size: 0;
            line-height: 0;
            z-index: 9999999;
            display: none;
        }

        text[fill="#6b737c"] {
            font-weight: 600 !important;
        }


        a[aria-controls="demo-dt-selection"] {
            height: 31px;
        }
    </style>
</head>
<body style="overflow-x: hidden;">

    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("../../Content/js/shared/FusionCharts/3.13.2/fusioncharts.js")%>" type="text/javascript"></script>

    <link href="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("DashBoard_Global.css")%>" rel="stylesheet" type="text/css" />
    <link href="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("DashBoard_Resumen.css")%>" rel="stylesheet" type="text/css" />
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("DashBoard_Resumen.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfMostrarTablaInsidencias" runat="server" />
        <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
        <asp:HiddenField ID="hdfUsuTipSol" runat="server" />
        <asp:HiddenField ID="hdfTecnico" runat="server" />
        <asp:HiddenField ID="hdfAdmin" runat="server" />
        <asp:HiddenField ID="hdfResAprTipSol" runat="server" />
        <asp:HiddenField ID="hdfResApr" runat="server" />
        <asp:HiddenField ID="hdfGruTipSol" runat="server" />
        <asp:HiddenField ID="hdfGruTipSolEdi" runat="server" />
        <asp:HiddenField ID="hdfGruTipSolEli" runat="server" />
        <asp:HiddenField ID="hdfCodSucursal" runat="server" />
        <asp:HiddenField ID="hdfCodOrganizacion" runat="server" />
        <asp:HiddenField ID="hdfEmpleado" runat="server" />
        <asp:HiddenField ID="hdfCodUsuario" runat="server" />
        <asp:HiddenField ID="hdfEsUsuario" runat="server" />
        <asp:HiddenField ID="hdfTipoMoneda" runat="server" />
        <asp:HiddenField ID="hdfSepDecimal" runat="server" />
        <asp:HiddenField ID="hdfSepMiles" runat="server" />
        <asp:HiddenField ID="hdfNumDecimales" runat="server" />
        <asp:HiddenField ID="hdfTieneEmpleado" runat="server" />
        <asp:HiddenField ID="hdfIdTecnico" runat="server" />
        <asp:HiddenField ID="hdfTipLin" runat="server" />
        <asp:HiddenField ID="hdfOpcionPrincipal" runat="server" />
        <asp:HiddenField ID="hdfVerSolicitud" runat="server" />
        <asp:HiddenField ID="hdfVerIncidencia" runat="server" />
        <asp:HiddenField ID="hdfVerDetalle" runat="server" />
        <asp:HiddenField ID="hdfVerResumen" runat="server" />
        <asp:HiddenField runat="server" ID="hdfCodCue" />
        <asp:HiddenField runat="server" ID="hdfCodOpe" />

        <div id="General" style="background-color: #FFFFFF; "> <%--F3F5F9;--%>
            <table border="0" style="width: 100%; margin-top: 10px;" cellpadding="0" cellspacing="0">
                <tr id="filaTitutloReporte">
                    <td align="left" style="vertical-align: middle">
                        <li class="list-header-main">
                            <label for="lblTituloDashboard">DASHBOARD USUARIO</label>
                        </li>
                    </td>
                    <td id="tdAcciones" style="text-align: right; width: 120px; padding-right: 20px;">
                        <%--<div id="btnImprimir" class="btnNormal">
                            <img id="imgImprimir" style="cursor: pointer; cursor: hand;" alt="" src="../../Common/Images/Mantenimiento/imprimir.gif" />
                        </div>--%>
                        <button id="btnImprimir" type="button" class="btn btn-lg btn-primary">
                            <span class="fa fa-print"></span>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">

                        <div class="panel" style="margin-left: 20px; margin-right: 20px; margin-top: 10px;">
                            <div class="panel-heading">
                                <%--<div class="panel-control">
                                    <button id="btnColapseFiltros" type="button" class="btn btn-primary" style="background-color: #B4B8BD;" data-toggle="collapse" data-target="#panel-collapse-filtros">
                                        <i id="ibtnColapseFiltros" class="fa fa-angle-down"></i>
                                    </button>
                                </div>--%>
                                <h3 class="panel-title">Periodo: 
                                     <asp:DropDownList ID="ddlPeriodo" runat="server" Font-Size="14px">
                                     </asp:DropDownList>
                                    <%--<span class="text-lg text-semibold">
                                    </span>--%>
                                </h3>
                            </div>
                        </div>



                        <div class="container-fluid" style="margin-left: 10px; margin-right: 10px;">
                            <div class="row" id="dvFilaInicial">
                                <div class="col-lg-3">

                                    <div class="panel">
                                        <div class="panel-body text-center">
                                            <div class="col-sm-3 col-lg-6">
                                                <div class="panel panel-info panel-colorful">
                                                    <div class="pad-all text-center">
                                                        <span class="text-3x text-thin">
                                                            <asp:Label ID="lblLineas" runat="server" Text="Label"></asp:Label>
                                                        </span>
                                                        <p>Líneas</p>
                                                        <i class="demo-psi-smartphone-3 icon-lg"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-3 col-lg-6">
                                                <div class="panel panel-warning panel-colorful">
                                                    <div class="pad-all text-center">
                                                        <span class="text-3x text-thin">
                                                            <asp:Label ID="lblNumDis" runat="server" Text="Label"></asp:Label>
                                                        </span>
                                                        <p>Dispositivos</p>
                                                        <i class="demo-pli-smartphone-3 icon-lg"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6 col-lg-12">
                                                <ul id="ulCamposDinamicos" class="list-unstyled text-center bord-top pad-top mar-no row" runat="server">
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-9">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-7">
                                            <div class="panel">
                                                <div class="panel-body">
                                                    <div id="ctndCharHisFact">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-xs-12 col-sm-5">
                                            <div class="panel">
                                                <div class="panel-body">
                                                    <div id="ctndCharPieFact">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>


                            <div class="row">



                                <div class="col-xs-12 col-lg-12 col-xl-12">
                                    <div class="panel">
                                        <div class="panel-heading">
                                            <h3 class="panel-title">MIS EQUIPOS</h3>
                                        </div>
                                        <div class="panel-body" style="margin-top: -10px;">
                                            <div class="table-responsive table-responsive-resumen">
                                                <table id="tableMisEquipos" class="demo-dt-selection table table-striped" cellspacing="0">
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="col-xs-12 col-lg-12 col-xl-12">
                                    <div class="panel">
                                        <div class="panel-heading">
                                            <h3 class="panel-title">MIS SOLICITUDES
                                                <div style="float: right; margin-top: 7px;">
                                                    <button id="dvAgregarSolicitud" class="btn btn-success" type="button" data-tooltip="Registrar Nueva Solicictud">
                                                        <i class="demo-pli-add icon-lg"></i>
                                                    </button>
                                                </div>
                                            </h3>
                                        </div>
                                        <div class="panel-body" style="margin-top: -10px;">
                                            <div class="table-responsive table-responsive-resumen">
                                                <table id="tableMisSolicitudes" class="demo-dt-selection table table-striped" cellspacing="0">
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="col-xs-12 col-lg-12 col-xl-12"  id="div-tabla-solicitudes">
                                    <div class="panel">
                                        <div class="panel-heading">
                                            <h3 class="panel-title">MIS INCIDENCIAS
                                                <div style="float: right; margin-top: 7px;">
                                                    <button id="dvAgregarIncidencia" class="btn btn-success" type="button" data-tooltip="Registrar Nueva Incidencia">
                                                        <i class="demo-pli-add icon-lg"></i>
                                                    </button>
                                                </div>
                                            </h3>
                                        </div>
                                        <div class="panel-body" style="margin-top: -10px;">
                                            <div class="table-responsive table-responsive-resumen">
                                                <table id="tableMisIncidencias" class="demo-dt-selection table table-striped" cellspacing="0">
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </td>
                </tr>
            </table>


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
            <div class="LimpiarFloat">
            </div>
            <div id="dvConEmpleado">
                <div id="pnlCuerpoFloat" class="AnchoTotal" style="margin-left: 20px;">
                    <div class="AnchoTotal bordeAbajo Titulo none">
                        Información Resumida
                    </div>
                    <div class="AnchoTotal bordeAbajo FlotarIzquierda none">
                        <div id="fotoUsuario" class="FlotarIzquierda" style="display: none;">
                        </div>

                        <div class="container-fluid" style="overflow: auto;">


                            <div class="panelz">
                                <div class="panel-body r clearfix">

                                    <div class="col-md-12 text-center">
                                        <%--<h3 class="text-main text-normal text-2x mar-no">Información Resumida</h3>
                                        <hr class="new-section-xs">--%>
                                        <div class="row mar-top">
                                            <div class="col-sm-4">
                                                <div class="text-md">
                                                    <p class="text-5x text-thin text-main mar-no">
                                                    </p>
                                                </div>
                                                <p>Líneas</p>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="text-md">
                                                    <p class="text-5x text-thin text-main mar-no">
                                                    </p>
                                                </div>
                                                <p>Dispositivos</p>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="list-group bg-trans mar-no">
                                                    <span class="list-group-item">Licencia: &nbsp;
                                                        <span style="font-weight: 600;">
                                                            <asp:Label ID="lblLicencia" runat="server"></asp:Label>
                                                        </span>
                                                    </span>
                                                    <span class="list-group-item">Periodo: &nbsp;
                                                        <span style="font-weight: 600;"></span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <table id="mitablaUsu" class="Titulo" style="margin-top: 13px; margin-bottom: 13px; width: 100%;" border="0">
                            <%--display: none;--%>
                            <tr>
                                <td colspan="1" class="" valign="top">
                                    <table width="100%" id="tbCamposDinamicos" runat="server" border="0">
                                    </table>
                                </td>
                                <td valign="top">
                                    <table id="mitablaUsuX" class="Titulo" cellpadding="0" cellspacing="0" style="width: 100%; display: none;" border="0">
                                        <tr style="display: none;">
                                            <td width="110px" class="ui-state-default-dash" style="padding-right: 15px;" align="right">Tipo Línea
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlTipoLinea" runat="server">
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="ui-state-default-dash" style="padding-right: 15px;" align="right">Licencia
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td class="ui-state-default-dash" style="padding-right: 15px;" align="right">Nro. Líneas
                                            </td>
                                            <td style="margin-left: 40px"></td>
                                        </tr>
                                        <tr>
                                            <td class="ui-state-default-dash" style="padding-right: 15px;" align="right">Nro. Dispositivos
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td class="ui-state-default-dash" style="padding-right: 15px;" align="right">Periodo
                                            </td>
                                            <td style="margin-left: 40px"></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div id="dvDetalle" style="display: none;" class="AnchoTotal bordeAbajo FlotarIzquierda">
                        <table style="width: 100%">
                            <tr style="height: 25px;">
                                <td style="width: 75%">
                                    <div class="subTitulo ui-state-active bordeAbajo" style="font-size: 12px;">
                                        Detalle de Consumo
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <div id="Div1" class="Divi_fact_serv FlotarIzquierda bordeDerecha">
                            <div class="subTitulo ui-state-active bordeAbajo">
                                Consumo (%) 
                            </div>

                            <div class="AnchoTotal">
                                <div id="ctndRendimiento">
                                    <dx:ASPxGaugeControl runat="server" Width="250px" Height="200px" BackColor="Transparent"
                                        ID="gaugeControl" ClientInstanceName="gauge" SaveStateOnCallbacks="False" LoadingPanelText="Cargando&amp;hellip;"
                                        Value="135">
                                        <Gauges>
                                            <dx:CircularGauge ID="cGauge1" Bounds="0, 0, 250, 200">
                                                <scales>
                                                <dx:ArcScaleComponent Name="scale1" MaxValue="150" Value="135" MinorTickmark-ShapeType="Circular_Style13_4"
                                                    MinorTickmark-ShapeOffset="4" Center="125, 130" EndAngle="0" MajorTickCount="7"
                                                    MinorTickCount="4" MajorTickmark-TextOffset="10" MajorTickmark-TextOrientation="LeftToRight"
                                                    MajorTickmark-FormatString="{0:F0}" MajorTickmark-ShapeType="Circular_Style13_5"
                                                    MajorTickmark-ShapeOffset="-7" StartAngle="-180" RadiusX="105" RadiusY="105"
                                                    AppearanceTickmarkText-Font="Tahoma, 10pt, style=Bold" 
                                                    
                                                    
                                                    AppearanceTickmarkText-TextBrush="&lt;BrushObject Type=&quot;Solid&quot; Data=&quot;Color:background&quot;/&gt;" 
                                                    AppearanceTickmarkText-Spacing="0, 0, -5, 0" >
                                                </dx:ArcScaleComponent>
                                            </scales>
                                                <needles>
                                                <dx:ArcScaleNeedleComponent EndOffset="-7.5" StartOffset="-5" ScaleID="scale1" Name="needleHP2"
                                                    ZOrder="-50" ShapeType="CircularFull_Style21"></dx:ArcScaleNeedleComponent>
                                            </needles>
                                                <labels>
                                                <dx:LabelComponent AppearanceText-Font="Tahoma, 16pt" 
                                                    AppearanceText-TextBrush="&lt;BrushObject Type=&quot;Solid&quot; Data=&quot;Color:black&quot;/&gt;"
                                                    Text="Consumo" Name="criteria" Position="125, 100" ZOrder="-25"></dx:LabelComponent>

                                            </labels>
                                            </dx:CircularGauge>
                                        </Gauges>
                                        <LayoutPadding All="0" Left="0" Top="0" Right="0" Bottom="0"></LayoutPadding>
                                    </dx:ASPxGaugeControl>
                                </div>
                                <div style="clear: both;">
                                </div>
                                <div id="TooltipConsumo" style="margin-left: 240px;">
                                    <ttgInfo:ToolTipGenerico ID="ttgInfoConsumo" runat="server" />
                                </div>
                                <div style="clear: both;">
                                </div>
                                <div style="float: left; border: 0px dotted gray; margin-left: 150px;">
                                    <table border="0" cellpadding="0" width="220">
                                        <tr>
                                            <td align="left" width="90px">
                                                <b>Detalle Consumo</b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="left" width="90px">Consumo Total:
                                            </td>
                                            <td>
                                                <asp:Label ID="lblConsumo" runat="server" Text="Label" Font-Bold="True"></asp:Label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="left">Objetivo:
                                            </td>
                                            <td>
                                                <asp:Label ID="lblObjetivo" runat="server" Text="Label" Font-Bold="True"></asp:Label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="left">% Consumido:
                                            </td>
                                            <td>
                                                <asp:Label ID="lblVariacion" runat="server" Text="Label" Font-Bold="True"></asp:Label>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>

                            <div id="dvGridLineas_Resumen" class="AnchoTotal FlotarIzquierda bordeArriba">
                                <table style="width: 100%">
                                    <tr style="height: 25px;">
                                        <td style="width: 75%">
                                            <div class="subTitulo ui-state-active" style="font-size: 12px;">
                                                Consumo por líneas
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                <div id="ctndCharResumenLinea">
                                    <table id="gridLineas_Resumen">
                                    </table>
                                    <div id="gridLineas_Resumen_Pager">
                                    </div>
                                </div>
                                <div id="Div2" class="Divi_tres FlotarIzquierda bordeDerecha" style="display: none;">
                                    <%--<div class="subTitulo ui-state-active bordeAbajo">Consumo por servicio</div>--%>
                                    <div class="subTitulo ui-state-active bordeAbajo">
                                        Distribución de Costo (<asp:Label ID="LblTipoMoneda" runat="server"></asp:Label>)
                            por Tipo de Servicio (%)
                                    </div>
                                    <div id="ctndCharPie">
                                    </div>
                                </div>
                                <div id="Div3" class="Divi_fact_hist" style="overflow: hidden; text-align: center;">
                                    <div class="subTitulo ui-state-active bordeAbajo">
                                        Histórico Consumo
                                    </div>
                                    <div id="ctndCharHis">
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div style="clear: both;"></div>

                    <%--                    <div id="dvGridLineas" class="AnchoTotal FlotarIzquierda bordeArriba">
                        <table style="width: 100%">
                            <tr style="height: 25px;">
                                <td style="width: 75%">
                                    <div class="subTitulo ui-state-active" style="font-size: 14px; font-weight: 600;">
                                        MIS EQUIPOS
                                    </div>
                                </td>
                            </tr>
                        </table>

                    </div>--%>
                    <%--<div id="dvGrid" class="AnchoTotal FlotarIzquierda bordeArriba" style="margin-top: 25px;">
                        <table style="width: 100%;" border="0">
                            <tr style="height: 25px;">
                                <td style="width: 100%">
                                    <div style="position: relative; overflow: hidden; height: 35px; vertical-align: middle;">
                                        <div class="subTitulo ui-state-active" style="font-size: 14px; font-weight: 600; margin-top: 7px !important;">
                                            MIS SOLICITUDES
                                        </div>
                                        <div id="TdAgregarSolicitud" style="position: absolute; right: 0px; top: 1px;" runat="server">
                                            <div id="dvAgregarSolicitud" class="btnNormal" runat="server" data-tooltip="Registrar Nueva Solicictud">
                                                <img src="../../Common/Images/Mantenimiento/add_16x16.gif" alt="" height="10" />&nbsp;
                                            <span style="color: #2e6e9e; line-height: 1.0 !important;">Solicitudes</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <br />

                    </div>--%>
                    <%--<div id="dvgridSolicitud" class="AnchoTotal FlotarIzquierda bordeArriba" style="margin-top: 25px;">
                        <table style="width: 100%">
                            <tr style="height: 25px;">
                                <td style="width: 75%">
                                    <div style="position: relative; overflow: hidden; height: 35px; vertical-align: middle;">
                                        <div class="subTitulo ui-state-active" style="font-size: 14px; font-weight: 600; margin-top: 7px !important;">
                                            MIS INCIDENCIAS
                                        </div>
                                        <div id="dvAgregarIncidencia" class="btnNormal" style="position: absolute; right: 0px; top: 1px;" runat="server" data-tooltip="Registrar Nueva Incidencia">
                                            <img src="../../Common/Images/Mantenimiento/add_16x16.gif" alt="" height="10" />&nbsp;
                                            <span style="color: #2e6e9e; line-height: 1.0 !important;">Incidencias</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <br />
                    </div>--%>

                    <div id="dvConversacion">
                        <div class="dvPanel flotarIzquierda usu" style="height: 20px; margin-right: 5px; margin-bottom: 5px; margin-left: 25px;">
                            <span style="position: relative; top: -23px; left: 0px; background-color: White; font-weight: bold;">Origen de notas </span>
                            <asp:DropDownList ID="ddlOrigen" runat="server" Style="margin-left: -90px;">
                                <asp:ListItem Value="0">Cliente</asp:ListItem>
                                <asp:ListItem Value="1">Escalamiento</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                        <div id="dvMensajes" class="dvPanel">
                            <div class="dvNotaContenedor">
                                <div class="tituloNota">
                                    <div class="imagenNota">
                                    </div>
                                    <div class="subTituloNota">
                                        Nota creada el 21/01/2014 a las 9:02 AM por administrador
                                    </div>
                                </div>
                                <div style="clear: both; height: 5px;">
                                </div>
                                <div class="mensajeNota">
                                    sdfdsf dsf sdf dsf ds fds fds fds fds fdfs
                                </div>
                            </div>
                        </div>
                        <div id="dvEscribir">
                            <div id="dvEnviar" style="width: 95%; padding-left: 25px;">
                                <asp:TextBox ID="txtNotaEnviar" runat="server" Width="550px" Height="24px"></asp:TextBox>
                                <div id="btnRegistraNota" class="boton" style="float: right; width: 70px; margin-right: 10px;">
                                    Enviar
                                </div>
                                <div id="dvEnvioSupervisor" class="usu" style="float: right; margin-right: 10px;">
                                    <asp:CheckBox ID="chkMostrarOnlyMsjSupervi" runat="server" Text="Mostrar solo mensajes de supervisor" />
                                    <asp:CheckBox ID="chkEnvioSupervisor" runat="server" Text="Mensaje para supervisor" />
                                </div>
                            </div>
                            <div id="pnlAdjuntar" style="width: 120px; padding-left: 25px;">
                                <div id="UploadStatus">
                                </div>
                                <div id="UploadButton" align="center" class="imgBtn" style="text-align: left;">
                                    <table>
                                        <tr>
                                            <td style="text-align: left;">
                                                <img alt="" src="../../Common/Images/Mantenimiento/SubirArchivo.png" width="16px"
                                                    height="16px" />
                                            </td>
                                            <td style="vertical-align: bottom; text-decoration: underline;">Adjuntar Archivo
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div id="UploadedFile">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="dvSinEmpleado" class="AnchoTotal" style="display: none;">
                        <br />
                        <div style="font-size: x-large; color: Gray;">
                            <b>Ud. no tiene un empleado asignado, No hay datos para mostrar.</b>
                        </div>
                    </div>

                </div>
            </div>
            <div id="dvNota" style="display: none;">
                <iframe id="ifNota" scrolling="no" frameborder="0" style="padding: 0px; margin: 0px; height: 510px; width: 670px;"></iframe>
            </div>
            <div id="dvDetalleDispositivo" style="display: none; width: 480px; height: 350px;">
                <iframe id="ifDetalleDispositivo" frameborder="0" width="480px" height="330px"></iframe>
            </div>



            <div class="col-xs-12 col-lg-6 col-xl-4">

                <div id="xgrid" class="jqGrid">
                    <table id="gridLineas">
                    </table>
                    <div id="gridLineaspager">
                    </div>
                </div>

            </div>

            <div class="col-xs-12 col-lg-6 col-xl-4">

                <table id="grid">
                </table>
                <div id="pager">
                </div>

            </div>

            <div class="col-xs-12 col-lg-6 col-xl-4">

                <table id="gridSolicitud">
                </table>
                <div id="pagerSolicitud">
                </div>

            </div>
    </form>
</body>
</html>
