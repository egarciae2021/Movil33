<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="DashBoard_Jefatura.aspx.vb"
    Inherits=".DashBoard_Jefatura" %>

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

<html xmlns="http://www.w3.org/1999/xhtml" style="background-color: #FFFFFF;"> <%--F3F5F9--%>

<head runat="server">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title></title>

    <link href="../../Content/css/shared/bootstrap.min.css" rel="stylesheet">
    <link href="../../Content/css/shared/nifty.min.css" rel="stylesheet">


    <link href="../../Content/css/shared/font-awesome.min.css" rel="stylesheet" />
    <link href="../../Content/css/shared/nifty-demo-icons.min.css" rel="stylesheet">

    <%--<link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />--%>

    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../Content/js/shared/jquery_1.7.2/bootstrap.min.js"></script>

    <link href="../../Content/css/shared/dataTables.bootstrap.css" rel="stylesheet" />
    <link href="../../Content/css/shared/responsive.dataTables.min.css" rel="stylesheet" />

    <%--<script src="../../Common/Scripts/FusionCharts/FusionCharts.js" type="text/javascript"></script>--%>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <%--<script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>--%>
    <%--<script src="../../Common/Scripts/FusionCharts/FusionCharts.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/FusionCharts/FusionCharts.jqueryplugin.js" type="text/javascript"></script>--%>

   
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


    <style type="text/css">
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


        .ui-jqgrid-sortable {
            font-weight: 600 !important;
        }



        a[aria-controls="demo-dt-selection"] {
            height: 31px;
        }


        .dt-right {
            text-align: right;
        }



    </style>

    
</head>
<body>

    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("../../Content/js/shared/FusionCharts/3.13.2/fusioncharts.js")%>" type="text/javascript"></script>
    <script type="text/javascript" src="https://cdn.fusioncharts.com/fusioncharts/latest/themes/fusioncharts.theme.fusion.js"></script>

    <script src="../../Content/js/shared/jquery.sparkline.min.js" type="text/javascript" ></script>

    <link href="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("DashBoard_Global.css")%>" rel="stylesheet" type="text/css" />
    <link href="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("DashBoard_Resumen.css")%>" rel="stylesheet" type="text/css" />
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("DashBoard_Jefatura.js")%>" type="text/javascript"></script>


    <form id="form1" runat="server">
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
        

        



        <div id="skLoadingJef" class="dvCargando" style="display: none; top: calc(48% - 9px);left: calc(43% - 3px);"></div>

        <div id="General" style="background-color: #FFFFFF;"> <%--#F3F5F9--%>
            <table border="0" style="width: 100%; margin-top: 10px;" cellpadding="0" cellspacing="0">
                <tr id="filaTitutloReporte">
                    <td align="left" style="vertical-align: middle">
                        <li class="list-header-main">
                            <label for="lblTituloDashboard">DASHBOARD GENERAL</label>
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
                                <h3 class="panel-title">Periodo: 
                                     <asp:DropDownList ID="ddlPeriodo" runat="server" Font-Size="14px">
                                     </asp:DropDownList>
                                </h3>
                            </div>
                        </div>



                        <div style=" text-align:center; font-size:medium; color:Gray; width: 100%; height: 200px;" id="dvNoHayDatos">No hay datos para mostrar.</div>

                        <div class="container-fluid" id="dvContenidoPrincipal" style="margin-left: 10px; margin-right: 10px; display: none;">
                            <div id="dvContenidoMantenimiento">
                                <div class="row">
                                    <div class="col-sm-12 col-md-12 col-lg-12">
                                        <div class="panel" id="dvMontosFacturacion">
                                            <div class="panel-heading">
                                                <h3 class="panel-title">RESUMEN DE FACTURACIÓN</h3>
                                            </div>
                                            <div class="panel-body text-center clearfix">
                                                <div class="col-sm-12">
                                                    <%--<p class="text-lg text-semibold text-left mar-no text-main" style="margin-bottom: 10px !important;">RESUMEN DE FACTURACIÓN</p>--%>
                                                    <ul class="list-unstyled text-center bord-top pad-top mar-no row">
                                                        <li class="col-xs-12 col-sm-4">
                                                            <span class="text-2x text-semibold text-main" id="spTotalAnual">---</span>
                                                            <p class="text-md text-muted mar-no">Total anual</p>
                                                        </li>
                                                        <li class="col-xs-12 col-sm-4">
                                                            <span class="text-2x text-semibold text-main" id="spPromedio03Meses">---</span>
                                                            <p class="text-md text-muted mar-no">Promedio últimos 03 meses</p>
                                                        </li>
                                                   
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-sm-12 col-md-12 col-lg-12">
                                        <div class="col-sm-2 col-lg-2">
                                            <div class="panel panel-info panel-colorful">
                                                <div class="pad-all text-center" style="min-height: 125px;">
                                                    <span class="text-3x text-thin" id="spTotalCuentas">0</span>
                                                    <p>Cuentas</p>
                                                    <i class="demo-pli-shopping-bag icon-lg"></i>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-2 col-lg-2">
                                            <div class="panel panel-warning panel-colorful">
                                                <div class="pad-all text-center" style="min-height: 125px;">
                                                    <span class="text-3x text-thin" id="spTotalPlanes">0</span>
                                                    <p>Planes</p>
                                                    <i class="demo-pli-list-view"></i>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-2 col-lg-2">
                                            <div class="panel panel-mint panel-colorful">
                                                <div class="pad-all text-center" style="margin-left: -12px; margin-right: -12px; min-height: 125px;">
                                                    <span class="text-3x text-thin" id="spTotalModelos">0</span>
                                                    <p>Modelos</p>
                                                    <i class="demo-pli-data-storage"></i>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-2 col-lg-2">
                                            <div class="panel panel-purple panel-colorful">
                                                <div class="pad-all text-center" style="margin-left: -12px; margin-right: -12px; min-height: 125px;">
                                                    <span class="text-3x text-thin" id="spTotalLineas">0</span>
                                                    <p>Líneas</p>
                                                    <i class="demo-psi-receipt-4 icon-lg"></i>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-sm-2 col-lg-2">
                                            <div class="panel panel-success panel-colorful">
                                                <div class="pad-all text-center" style="margin-left: -12px; margin-right: -12px; min-height: 125px;">
                                                    <span class="text-3x text-thin" id="spTotalDispositivos">0</span>
                                                    <p>Dispositivos</p>
                                                    <i class="demo-pli-smartphone-3"></i>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-2 col-lg-2">
                                            <div class="panel panel-dark panel-colorful">
                                                <div class="pad-all text-center" style="margin-left: -12px; margin-right: -12px; min-height: 125px;">
                                                    <span class="text-3x text-thin"id="spTotalUsuarios">0</span>
                                                    <p>Usuarios</p>
                                                    <i class="demo-pli-checked-user icon-lg"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div id="dvContenidoFacturacion">
                                <div class="row" id="dvFilaInicial">
                                    <div class="col-lg-3" style="display: none;">

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

                                    <div class="col-lg-12">
                                        <div class="row">
                                            <div class="col-xs-12 col-sm-12 col-md-6" id="dvHistFact">
                                                <div class="panel">
                                                    <div class="panel-body">
                                                        <div id="ctndCharHisFact">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xs-12 col-sm-12 col-md-6" id="dvSolInc">
                                                <div class="panel">
                                                    <div class="panel-body">
                                                        <div id="ctndCharPieFact" style="display: none;">
                                                        </div>

                                                        <div id="chart-container" style="display: none;"></div>

                                                        <div class="row" style="display:none;">
                                                            <div class="col-sm-6 col-md-12">

                                                                <!--Sparkline Area Chart-->
                                                                <div class="panel panel-success panel-colorful">
                                                                    <div class="pad-all">
                                                                        <p class="text-lg text-semibold"><i class="demo-pli-data-storage icon-fw"></i>Solicitudes <span class="lblPeriodoActual"></span>   </p>
                                                                        <p class="mar-no">
                                                                            <span class="pull-right text-bold" id="spTotalSolicitudes"></span> Total
                                                                        </p>
                                                                        <%--
                                                                        <p class="mar-no">
                                                                            <span class="pull-right text-bold">1,45Gb</span> Used space
                                                                        </p>--%>
                                                                    </div>
                                                                    <div class="pad-top text-center">
                                                                        <!--Placeholder-->
                                                                        <div id="splSolicitudes" class="sparklines-full-content">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-6 col-md-12">

                                                                <!--Sparkline Line Chart-->
                                                                <div class="panel panel-info panel-colorful">
                                                                    <div class="pad-all">
                                                                        <p class="text-lg text-semibold"><i class="demo-pli-basket-coins icon-fw"></i>Incidencias <span class="lblPeriodoActual"></span></p>
                                                                        <p class="mar-no">
                                                                            <span class="pull-right text-bold" id="spTotalIncidencias"></span> Total
                                                                        </p>
                                                                        <%--
                                                                        <p class="mar-no">
                                                                            <span class="pull-right text-bold">$1,332</span> Last 7 Day
                                                                        </p>--%>
                                                                    </div>
                                                                    <div class="pad-top text-center">

                                                                        <!--Placeholder-->
                                                                        <div id="splIncidencias" class="sparklines-full-content">
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="row">
                                                            <div id="dvPieSolicitudesProceso"></div>
                                                        </div>

                                                        <%--<div class="row">
                                                            <div class="col-sm-6 col-lg-6">

                                                                <!--Sparkline bar chart -->
                                                                <div class="panel panel-purple panel-colorful">
                                                                    <div class="pad-all">
                                                                        <p class="text-lg text-semibold"><i class="demo-pli-basket-coins icon-fw"></i>Autenticaciones</p>
                                                                        <p class="mar-no">
                                                                            <span class="pull-right text-bold">$764</span> Today
                                                                        </p>
                                                                        <p class="mar-no">
                                                                            <span class="pull-right text-bold">$1,332</span> Last 7 Day
                                                                        </p>
                                                                    </div>
                                                                    <div class="text-center">

                                                                        <!--Placeholder-->
                                                                        <div id="demo-sparkline-bar" class="box-inline">
                                                                            <canvas width="314" height="78" style="display: inline-block; width: 314px; height: 78px; vertical-align: top;"></canvas>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-6 col-lg-6">

                                                                <!--Sparkline pie chart -->
                                                                <div class="panel panel-warning panel-colorful">
                                                                    <div class="pad-all">
                                                                        <p class="text-lg text-semibold">Tareas importación</p>
                                                                        <p class="mar-no">
                                                                            <span class="pull-right text-bold">34</span> Completed
                                                                        </p>
                                                                        <p class="mar-no">
                                                                            <span class="pull-right text-bold">79</span> Total
                                                                        </p>
                                                                    </div>
                                                                    <div class="pad-all">
                                                                        <div class="pad-btm">
                                                                            <div class="progress progress-sm">
                                                                                <div style="width: 45%;" class="progress-bar progress-bar-light">
                                                                                    <span class="sr-only">45%</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="pad-btm">
                                                                            <div class="progress progress-sm">
                                                                                <div style="width: 89%;" class="progress-bar progress-bar-light">
                                                                                    <span class="sr-only">89%</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>--%>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="row">
                                    <div id="dvpanelConceptosFacturacion" class="col-xs-12 col-lg-12 col-xl-4">
                                        <!-- Row selection (single row) -->
                                        <!--===================================================-->
                                        <div class="panel" id="panelConceptos">
                                            <div class="panel-heading"> 
                                                <div class="row">
                                                    <div class="col-md-11">
                                                         <h3 class="panel-title">CONCEPTOS</h3>
                                                    </div>    
                                                    <div  class="col-md-1 " style="position:relative;display:flex;justify-content:center"> 
                                                         <table id="tbExportarExcelConceptos" runat="server">
                                                                <tr>
                                                                    <td> 
                                                                        <div id="btnExportarExcelConceptos" title="Exportar" class="btnButton" runat="server" style="margin:2px;cursor: hand;cursor: pointer;border: 1px solid #bababa;border-radius: 5px;padding: 3px;">
                                                                            <asp:Image ID="ImagenConceptos" runat="server" AlternateText="Exportar"   src="../../Common/Images/Mantenimiento/Excel16.png" style="width:15px"/>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                         </table> 
                                                    </div>
                                                </div> 

                                            </div>
                                            <div class="panel-body" style="margin-top: -30px;">
                                                <div id="tableConceptosdiv">
                                                    <table id="tableConceptos" class="demo-dt-selection table table-striped" cellspacing="0" width="100%">
                                                    </table>
                                                </div>
                                            
                                            </div>
                                        </div>
                                        <div class="panel" id="paneGeneral" style="width: 100%;">
                                            <div style=" text-align:center; font-size:medium; color:Gray; width: 100%; height: 330px; padding: 160px;" id="dvNoHayDatosConceptos">No hay datos de facturación del periodo para mostrar.</div>
                                        </div>
                                    </div>

                                    <div id="dvpanelCuentas" class="col-xs-12 col-lg-6 col-xl-4">
                                        <div class="panel" id="panelCuentas">
                                          <div class="panel-heading">
                                                   <div class="col-md-11">
                                                         <h3 class="panel-title">CUENTAS</h3>
                                                    </div>    
                                                    <div   class="col-md-1 " style="position:relative;display:flex;justify-content:center"  runat="server">
                                                           <table id="tbExportarExcelCuentas" runat="server">
                                                                <tr>
                                                                    <td> 
                                                                        <div id="btnExportarExcelCuentas" title="Exportar" class="btnButton" runat="server" style="margin:2px;cursor: hand;cursor: pointer;border: 1px solid #bababa;border-radius: 5px;padding: 3px;">
                                                                            <asp:Image ID="ImagenCuentas"  runat="server" AlternateText="Exportar" src="../../Common/Images/Mantenimiento/Excel16.png" style="width:15px"/>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                         </table> 
                                                    </div> 
                                            </div>
                                            <div class="panel-body" style="margin-top: -30px;" >
                                                <%--table-bordered--%>
                                                <div id="tableCuentasdiv" >
                                                    <table id="tableCuentas" class="demo-dt-selection table table-striped" cellspacing="0" width="100%">
                                                </table>
                                                </div>
                                            </div>
                                        </div>
                                        <%--<div style=" text-align:center; font-size:medium; color:Gray; width: 100%; height: 200px;" id="dvNoHayDatosCuentas">No hay datos de facturación para mostrar en el periodo seleccionado.</div>--%>
                                    </div>

                                    <div id="dvpanelPlanes" class="col-xs-12 col-lg-6 col-xl-4">
                                        <div class="panel" id="panelPlanes">
                                            <div class="panel-heading">
                                                    <div class="col-md-11">
                                                         <h3 class="panel-title">PLANES</h3>
                                                    </div>    
                                                    <div   class="col-md-1 " style="position:relative;display:flex;justify-content:center"  runat="server">
                                                           <table id="tbExportarExcelPlanes" runat="server">
                                                                <tr>
                                                                    <td> 
                                                                        <div id="btnExportarExcelPlanes" title="Exportar" class="btnButton" runat="server" style="margin:2px;cursor: hand;cursor: pointer;border: 1px solid #bababa;border-radius: 5px;padding: 3px;">
                                                                            <asp:Image  ID="ImagenPlanes" runat="server"  AlternateText="Exportar" src="../../Common/Images/Mantenimiento/Excel16.png" style="width:15px"/>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                         </table> 
                                                    </div>
                                            </div>
                                            <div class="panel-body" style="margin-top: -30px;">
                                                  <div id="tablePlanesdiv" >
                                                    <table id="tablePlanes" class="demo-dt-selection table table-striped" cellspacing="0" width="100%">
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <%--<div style=" text-align:center; font-size:medium; color:Gray; width: 100%; height: 200px;" id="dvNoHayDatosPlanes">No hay datos de facturación para mostrar en el periodo seleccionado.</div>--%>
                                    </div>
                                </div>
                            </div>
                            


                        </div>

                    </td>
                </tr>
            </table>


    </form> 

    
        <div id="dvGrupoServicioDetalle" style="display:none; padding:0px; margin:0px;">
            <div id="dvGrupoServicioDet" style="padding: 20px;">
                <table id="tbGrupoServicioDet" class="demo-dt-selection table table-striped" cellspacing="0" width="100%"></table>
            </div>
        </div>



</body>
</html>
