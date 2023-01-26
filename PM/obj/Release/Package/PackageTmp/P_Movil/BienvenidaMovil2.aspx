<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_BienvenidaMovil2"
    CodeBehind="BienvenidaMovil2.aspx.vb" %>

<%@ Register Src="../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>
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
<%@ Register Assembly="DevExpress.Web.ASPxGauges.v12.2" Namespace="DevExpress.Web.ASPxGauges.Gauges" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxGauges.v12.2" Namespace="DevExpress.Web.ASPxGauges.Gauges.Linear" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxGauges.v12.2" Namespace="DevExpress.Web.ASPxGauges.Gauges.Circular" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxGauges.v12.2" Namespace="DevExpress.Web.ASPxGauges.Gauges.State" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxGauges.v12.2" Namespace="DevExpress.Web.ASPxGauges.Gauges.Digital" TagPrefix="dx" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

<%--    <link href="../Content/css/shared/bootstrap.min.css" rel="stylesheet">
    <link href="../Content/css/shared/nifty.min.css" rel="stylesheet">

    <script src="../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script type="text/javascript" src="../Common/Scripts/FusionCharts/FusionCharts.js"></script>
    
    <script src="../Common/Scripts/FusionCharts/FusionCharts.js" type="text/javascript"></script>
    <script src="../Common/Scripts/FusionCharts/FusionCharts.jqueryplugin.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <script type="text/javascript" src="../Content/js/shared/jquery_1.7.2/bootstrap.min.js"></script>

    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Scripts/select2/select2.min.css" rel="stylesheet" />--%>

    
    <link href="../Content/css/shared/bootstrap.min.css" rel="stylesheet">
    <link href="../Content/css/shared/nifty.min.css" rel="stylesheet">
    <link href="../../Content/css/shared/nifty-demo-icons.min.css" rel="stylesheet">

    <%-- <script src="../../Common/Scripts/FusionCharts/jquery.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/FusionCharts/jquery-1.8.3.js" type="text/javascript"></script>--%>

    <script src="../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>

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
    
    <script src="../Site_PCSistel33/jquery.easypiechart.min.js" type="text/javascript"></script>
    

    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>

    <link href="../Content/css/shared/font-awesome.min.css" rel="stylesheet" />

    <link href="../Content/css/shared/font-awesome.min.css" rel="stylesheet" />
    <script type="text/javascript" src="../Content/js/shared/jquery_1.7.2/bootstrap.min.js"></script>

    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Scripts/select2/select2.min.css" rel="stylesheet" />

    <style type="text/css">
        
        body {
            font-size: initial;
            background-color: #FFFFFF; /*F3F5F9;*/
        }

        .ui-jqgrid-bdiv {
            overflow-x: hidden !important;
        }

        .panel {
            margin-left: 10px;
            margin-right: 10px;
        }

        #dv_TopTen {
            text-align: center;
        }

        #chartContainer2 {
            text-align: center;
        }

        text[fill="#6b737c"] {
            font-weight: 600 !important;
        }

        .data-tooltip {
            position: absolute;
            top: 105px;
            left: 255px;
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
            left: 190px;
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

    </style>
</head>
<body>

   <link href="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("DashBoard/DashBoard_Global.css")%>" rel="stylesheet" type="text/css" />
    <link href="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("DashBoard/DashBoard_I.css")%>" rel="stylesheet" type="text/css" />
    
    <link href="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("BienvenidaMovil2.css")%>" rel="stylesheet" type="text/css" />
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("BienvenidaMovil2.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfAdmin" runat="server" />
        <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
        <asp:HiddenField ID="hdfEmpleado" runat="server" />
        <asp:HiddenField ID="hdfCodUsuario" runat="server" />
        <asp:HiddenField ID="hdfCodOrganizacion" runat="server" />
        <asp:HiddenField ID="hdfNuevoDispositivo" runat="server" />
        <asp:HiddenField ID="hdfTipoTopArea" runat="server" />
        <asp:HiddenField ID="hdfTipoTopEmpleado" runat="server" />
        <asp:HiddenField ID="hdfCodOperador" runat="server" />
        <asp:HiddenField ID="hdfCodSucursal" runat="server" />
        <asp:HiddenField ID="hdfTipoMoneda" runat="server" />

        <asp:HiddenField ID="hdfSepDecimal" runat="server" />
        <asp:HiddenField ID="hdfSepMiles" runat="server" />
        <asp:HiddenField ID="hdfNumDecimales" runat="server" />
        <asp:HiddenField ID="hdfTipLin" runat="server" />
        <asp:HiddenField ID="hdfTipoOpcion" runat="server" />
        <asp:HiddenField ID="hdfOpcionPrincipal" runat="server" />
        <asp:HiddenField ID="hdfLicencia" runat="server" />

        <div id="dvCargando" class="dvCargando"></div>
        <div id="ctndCantidad" class="dvPanel" style="display: none;">
            <div id="pnlCantidadCambio" class="pnlCantidades">
                <div class="CantidadNumero">
                    <div style="margin: auto; width: 10px; height: 10px;">
                        <asp:Label ID="lblCantidadCambio" runat="server" Text="99"></asp:Label>
                    </div>
                </div>
                <img class="ImagenEstadoSolicitud" src="../Images/DashboardMovil/change_26.png" alt=""
                    height="24" />
                <span style="float: left;">Cambios</span>
            </div>
            <div id="pnlCantidadNuevo" class="pnlCantidades">
                <div class="CantidadNumero">
                    <div style="margin: auto; width: 10px; height: 10px;">
                        <asp:Label ID="lblCantidadNuevo" runat="server" Text="99"></asp:Label>
                    </div>
                </div>
                <img class="ImagenEstadoSolicitud" src="../Images/DashboardMovil/new_24.png" alt=""
                    height="24" />
                <span style="float: left;">Nuevos</span>
            </div>
            <div id="pnlCantidadReposicion" class="pnlCantidades">
                <div class="CantidadNumero">
                    <div style="margin: auto; width: 10px; height: 10px;">
                        <asp:Label ID="lblCantidadReposicion" runat="server" Text="99"></asp:Label>
                    </div>
                </div>
                <img class="ImagenEstadoSolicitud" src="../Images/DashboardMovil/Replace_24.png"
                    alt="" height="24" />
                <span style="float: left;">Reposición</span>
            </div>
            <div id="pnlCantidadReparacion" class="pnlCantidades">
                <div class="CantidadNumero">
                    <div style="margin: auto; width: 10px; height: 10px;">
                        <asp:Label ID="lblCantidadReparacion" runat="server" Text="99"></asp:Label>
                    </div>
                </div>
                <img class="ImagenEstadoSolicitud" src="../Images/DashboardMovil/repair_24.png" alt=""
                    height="24" />
                <span style="float: left;">Reparación</span>
            </div>
        </div>
        <center>
            <%--<div style="width: 1020px;" id="pnlGeneral">--%>
            <div id="pnlGeneral">
                <table border="0" style="width: 100%" cellpadding="0" cellspacing="0">
                    <tr id="filaTitutloReporte">
                        <td align="left" style="vertical-align: middle">
                            <li class="list-header-main">
                                <label for="lblTituloDashboard">DETALLE DE CONSUMO</label>
                            </li>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="panel" style="margin-left: 20px; margin-right: 20px;">
                                <div class="panel-heading">
                                    <div class="panel-control">
                                        <button id="btnColapseFiltros" type="button" class="btn btn-primary" style="background-color: #B4B8BD;" data-toggle="collapse" data-target="#panel-collapse-filtros">
                                            <i id="ibtnColapseFiltros" class="fa fa-angle-down"></i>
                                        </button>
                                    </div>
                                    <h3 class="panel-title">Periodo: 
                                        <span class="text-lg text-semibold">
                                            <asp:Label ID="lblPeriodo" runat="server" Text=""></asp:Label>
                                        </span>
                                    </h3>
                                </div>
                                <div id="panel-collapse-filtros" class="panel-body form-horizontal form-padding collapse" style="padding-bottom: 0px;">
                                
                                    <div class="col-sm-3 ">
                                        <div class="form-group">
                                            <label class="col-md-3 control-label" for="demo-text-input">Periodo</label>
                                            <div class="col-md-9">
                                                <asp:DropDownList ID="ddlPeriodo" runat="server" Width="100%"></asp:DropDownList>
                                            </div>
                                        </div>
                                    </div>
                                
                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <label class="col-md-3 control-label" for="demo-text-input">Operador</label>
                                            <div class="col-md-9">
                                                <asp:DropDownList ID="ddlOperador" runat="server" Width="100%"></asp:DropDownList>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-sm-3">
                                        <div class="form-group">
                                            <asp:Label runat="server" ID="lblTipoLinea" Text="Tipo Línea: " class="col-md-3 control-label" for="demo-text-input"></asp:Label>
                                            <div class="col-md-9">
                                                <asp:DropDownList ID="ddlTipoLinea" runat="server" Width="100%"></asp:DropDownList>
                                            </div>
                                        </div>
                                    </div>
                                
                                    <div class="col-sm-3">
                                    </div>
                                
                                </div>
                            </div>

                            <div class="col-lg-6 col-sm-6">
                                <div class="panel">
                                    <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
                                        <%----------------------%>

                                        <div id="pnlRendimiento" class="pnlInformacion">
                                            <li class="list-header">
                                                <text fill-opacity="1" fill="#6b737c" x="15" text-anchor="start" direction="" stroke="none" y="29" font-family="Open Sans" font-size="16px" font-weight="bold" style="text-anchor: start; font-family: &quot;Open Sans&quot;; font-size: 16px; font-weight: bold;">CONSUMO(%)</text>
                                            </li>

                                            <div style="width: 500px; height: 350px; margin: 0px;">
                                                <div style="margin-top: 20px; margin-left: 22px; text-align: center; height: 200px;">
                                                    <div class="infobox infobox-blue2" style="width: auto; height: 150px; text-align: center;">
                                                        <table border="0" cellpadding="0" align="center">
                                                            <tr style="height: 118px;">
                                                                <td class="infoboxMonto">
                                                                    <asp:Label ID="lblConsumo" runat="server" Text="Label"></asp:Label>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="text-align: center;">
                                                                    <div class="infobox-data">
                                                                        <span class="infobox-text">Total Consumido</span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>

                                                    <div class="infobox infobox-blue2" style="width: auto; height: 150px; text-align: center;">
                                                        <table border="0" cellpadding="0" align="center">
                                                            <tr style="height: 118px;">
                                                                <td class="infoboxMonto">
                                                                    <asp:Label ID="lblObjetivo" runat="server" Text=""></asp:Label>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div class="infobox-data">
                                                                        <span class="infobox-text">Objetivo</span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <div class="infobox infobox-blue2" style="width: auto; height: 150px; text-align: center;">
                                                        <table border="0" cellpadding="0">
                                                            <tr style="height: 118px;">
                                                                <td>
                                                                    <div id="pieDiv_Consumo" runat="server" class="chart" data-size="100">
                                                                        <span id="pieSpan_Consumo" runat="server" class="percent"></span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="text-align: center;">
                                                                    <div class="infobox-data">
                                                                        <span class="infobox-text">Variación <ttgInfo:ToolTipGenerico ID="ttgInfoConsumo" runat="server" /></span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>

                                                <div id="ctndRendimiento">
                                                </div>
                                                <div style="border: 0px dotted gray; margin-left: 90px; display: none;">
                                                    <table border="0" cellpadding="0" width="250">
                                                        <tr>
                                                            <td colspan="2">
                                                                <asp:Label ID="lblVariacion" runat="server" Text="Label" Font-Bold="True"></asp:Label>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>


                                        <%----------------------%>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-lg-6 col-sm-6">
                                <div class="panel">
                                    <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
                                        <div id="ctndCharPie">
                                            </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-12 col-sm-12">
                                <div class="panel">
                                    <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
                                        
                                        <div>
                                            <li class="list-header">Histórico consumo
                                            </li>
                                            <hr class="hr" style="margin-left: 15px;" />
                                        </div>
                                        <br />
                                        <%--<div style="text-align:center; width: 100%;">--%>
                                            <div id="pnlTap" style="text-align: center; margin: auto;">
                                                <div class="CuerpoTap esPrimerTap" style="display:inline-table;">
                                                    <div id="TapLlamadas" cod="16" class="Tap ui-state-active" style="width: 315px; text-align: center;"><span class="textTab">Llamadas</span></div>
                                                </div>
                                                <div class="CuerpoTap" style="display:inline-table;">
                                                    <div id="TabMensajes" cod="18" class="Tap TapNoSelecionado" runat="server" style="width: 315px; text-align: center;"><span class="textTab">Mensajes</span></div>
                                                </div>
                                                <div class="CuerpoTap" style="display:inline-table;">
                                                    <div id="TabNavegacion" cod="17" class="Tap TapNoSelecionado" runat="server" style="width: 315px; text-align: center;"><span class="textTab">Navegación</span></div>
                                                </div>
                                                <div class="CuerpoTap" style="display:inline-table;">
                                                    <div id="TabTotal" cod="0" class="Tap TapNoSelecionado" runat="server" style="width: 315px; text-align: center;"><span class="textTab">Navegación</span></div>
                                                </div>
                                            </div>
                                        <%--</div>--%>
                                        <%--<div class="LimpiarFloat"></div>--%>
                                        <div id="pnlCuerpo" class="AnchoTotal">
                                            <%--<div style="width:100px; height:30px; border:1px dotted gray; position:absolute; top:300px; left:450px; z-index:99999999;"> </div>  --%>

                                            <div id="pnlLlamadas" class="AnchoTotal">
                                                <div id="pnlHistorico">
                                                    <div style='height: 10px;'></div>
                                                    <div id="pnlDdlHistorico">
                                                        &nbsp;&nbsp;&nbsp;Tipo:&nbsp;<select id="selectTipo" runat="server" style="height: 24px;">
                                                            <option value="Costo" selected="selected">Costo</option>
                                                            <option value="Llamadas">Cantidad</option>
                                                            <option value="Minutos">Duración</option>
                                                        </select>
                                                        &nbsp;&nbsp;&nbsp;Servicio:&nbsp;<select id="selectServicio" runat="server" style="height: 24px;">
                                                            <option value="LOC">Fija</option>
                                                            <option value="CEL">Celular</option>
                                                            <%--<option value="DDN">Nacional</option>--%>
                                                            <option value="DDI">Internacional</option>
                                                            <option value="TOTAL" selected="selected">Total</option>
                                                        </select>
                                                        &nbsp;&nbsp;&nbsp;Meses Atras:&nbsp;<select id="ddlMesesAtrasLlamadas" runat="server" style="height: 24px;">
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6" selected="selected">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                            <option value="9">9</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                        </select>
                                                        <br />
                                                    </div>
                                                    <div id="ctndCharHis">
                                                    </div>
                                                </div>

                                                <hr class="hr" style="margin-left: 15px;" />

                                                <div class="col-lg-6 col-sm-6">
                                                    <div class="panel">
                                                        <div id="pnlTopAreas">
                                                            <div id="ctndCharTA">
                                                            </div>
                                                            <div id="dvNivelLlam" class="form-group">
                                                                <label class="col-sm-3 control-label" for="demo-hor-inputemail">Nivel: </label>
                                                                <div class="col-sm-9">
                                                                    <asp:DropDownList ID="ddlNivel" runat="server" style="width: 100%;"></asp:DropDownList>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-sm-6">
                                                    <div class="panel">
                                                        <div id="pnlTopEmpleados">
                                                            <div id="ctndCharTE">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>

                                            <div id="pnlNavegacion" class="AnchoTotal">
                                                <div id="pnlHistoricoNavegacion">
                                                    <div style='height: 10px;'></div>
                                                    <div id="pnlDdlHistoricoNavegacion">
                                                        &nbsp;&nbsp;&nbsp;Tipo:&nbsp;<select id="selectTipoNavegacion" runat="server" style="height: 24px;">
                                                            <option value="Bytes">Cantidad</option>
                                                            <option value="Costo" selected="selected">Costo</option>
                                                        </select>
                                                        &nbsp;&nbsp;&nbsp;Meses Atras:&nbsp;<select id="ddlMesesAtrasNavegacion" runat="server" style="height: 24px;">
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6" selected="selected">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                            <option value="9">9</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                        </select>
                                                    </div>
                                                    <div id="ctndCharHisNavegacion">
                                                    </div>
                                                </div>
                                                
                                                <hr class="hr" style="margin-left: 15px;" />

                                                <div class="col-lg-6 col-sm-6">
                                                    <div class="panel">
                                                        <div id="pnlTopAreasNavegacion">
                                                            <div id="ctndCharTANavegacion">
                                                            </div>
                                                            <div id="dvNivelNav" class="form-group">
                                                                <label class="col-sm-3 control-label" for="demo-hor-inputemail">Nivel: </label>
                                                                <div class="col-sm-9">
                                                                    <asp:DropDownList ID="ddlNivelNavegacion" runat="server" style="width: 100%;"></asp:DropDownList>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div class="col-lg-6 col-sm-6">
                                                    <div class="panel">
                                                        <div id="pnlTopEmpleadosNavegacion">
                                                            <div id="ctndCharTENavegacion"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div id="pnlMensajes" class="AnchoTotal">
                                                <div id="pnlHistoricoMensajes">

                                                    <div style='height: 10px;'></div>

                                                    <div id="pnlDdlHistoricoMensajes">
                                                        &nbsp;&nbsp;&nbsp;Tipo:&nbsp;<select id="selectTipoMensaje" runat="server" style="height: 24px;">
                                                            <option value="Llamadas">Cantidad</option>
                                                            <option value="Costo" selected="selected">Costo</option>
                                                        </select>
                                                        &nbsp;&nbsp;&nbsp;Meses Atras:&nbsp;<select id="ddlMesesAtrasMensaje" runat="server" style="height: 24px;">
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6" selected="selected">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                            <option value="9">9</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                        </select>
                                                    </div>
                                                    <div id="ctndCharHisMensajes">
                                                    </div>
                                                </div>
                                                
                                                <hr class="hr" style="margin-left: 15px;" />

                                                <div class="col-lg-6 col-sm-6">
                                                    <div class="panel">
                                                        <div id="pnlTopAreasMensajes">
                                                            <div id="ctndCharTAMensajes">
                                                            </div>
                                                            <div id="dvNivelSMS" class="form-group">
                                                                <label class="col-sm-3 control-label" for="demo-hor-inputemail">Nivel: </label>
                                                                <div class="col-sm-9">
                                                                    <asp:DropDownList ID="ddlNivelMensajes" runat="server" style="width: 100%;"></asp:DropDownList>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-sm-6">
                                                    <div class="panel">
                                                        <div id="pnlTopEmpleadosMensajes">
                                                            <div id="ctndCharTEMensajes"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div id="pnlTotal" class="AnchoTotal">
                                                <div id="pnlHistoricoTotal">
                                                    <div style='height: 10px;'></div>
                                                    <div id="pnlDdlHistoricoTotal">
                                                        &nbsp;&nbsp;&nbsp;Tipo:&nbsp;<select id="selectTipoTotal" runat="server" style="height: 24px;">
                                                            <option value="Costo" selected="selected">Costo</option>
                                                        </select>
                                                        &nbsp;&nbsp;&nbsp;Meses Atras:&nbsp;<select id="ddlMesesAtrasTotal" runat="server" style="height: 24px;">
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6" selected="selected">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                            <option value="9">9</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                        </select>
                                                    </div>
                                                    <div id="ctndCharHisTotal">
                                                    </div>
                                                </div>
                                                
                                                <hr class="hr" style="margin-left: 15px;" />
                                                
                                                <div class="col-lg-6 col-sm-6">
                                                    <div class="panel">
                                                        <div id="pnlTopAreasTotal">
                                                            <div id="ctndCharTATotal">
                                                            </div>
                                                            <div id="dvNivelTotal" class="form-group">
                                                                <label class="col-sm-3 control-label" for="demo-hor-inputemail">Nivel: </label>
                                                                <div class="col-sm-9">
                                                                    <asp:DropDownList ID="ddlNivelTotal" runat="server" style="width: 100%;"></asp:DropDownList>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-sm-6">
                                                    <div class="panel">
                                                        <div id="pnlTopEmpleadosTotal">
                                                            <div id="ctndCharTETotal"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </td>
                    </tr>
                </table>
            </div>
        </center>

        <div id="General" style="display:none;">
            <div id="pnlTitulo" style="text-align: left;">
                <table style="width: 100%;">
                    <tr>
                        <td align="right">
                            <div id="divEquipo" style="float: right; padding: 1px 3px; border-width: 0px !important; margin-right: 5px;"
                                class="ui-state-highlight ui-corner-all">
                                <span id="Span1" class="ui-icon ui-icon-copy" style="float: left;"></span>
                                <asp:Label Style="float: left;" ID="lblEquipo" runat="server" Text="Mis equipos"></asp:Label>
                            </div>
                        </td>
                    </tr>
                </table>





                <%--<span id="txtTitulo" >Información Resumida <asp:Label ID="LblTextoTipoLinea" runat="server" Text="Label"></asp:Label></span>--%>


                <%--            <div id="pnlDdl">
                <span>Periodo:&nbsp;</span>
                <asp:DropDownList ID="ddlPeriodo" runat="server"></asp:DropDownList>&nbsp;&nbsp;&nbsp;
                <span>Operador:&nbsp;</span>
                <asp:DropDownList ID="ddlOperador" runat="server"></asp:DropDownList>&nbsp;&nbsp;&nbsp;
                <span>Tipo Linea:&nbsp;</span>
                <asp:DropDownList ID="ddlTipoLinea" runat="server"></asp:DropDownList>
                <asp:Label ID="LblTimer" runat="server" Text=""></asp:Label>
            </div>--%>
                <div id="divSoli" runat="server" style="float: right; padding: 1px 3px; border-width: 0px !important; margin-right: 5px; display: none;"
                    class="ui-state-highlight ui-corner-all">
                    <span id="dd" class="ui-icon ui-icon-info" style="float: left;"></span>
                    <asp:Label Style="float: left;" ID="lbltotal" runat="server" Text="999 Solicitudes"></asp:Label>
                </div>
                <div id="divSoliPorAprobar" style="float: right; padding: 1px 3px; border-width: 0px !important; margin-right: 5px;"
                    class="ui-state-highlight ui-corner-all" runat="server">
                    <span id="Span2" class="ui-icon ui-icon-info" style="float: left;"></span>
                    <asp:Label Style="float: left;" ID="lblSolicitudesPorAprobar" runat="server" Text="999 Solicitudes"></asp:Label>
                </div>
                <%--            <div id="divEquipo" style="float: right; padding: 1px 3px; border-width: 0px !important;
                margin-right: 5px;" class="ui-state-highlight ui-corner-all">
                <span id="Span1" class="ui-icon ui-icon-copy" style="float: left;"></span>
                <asp:Label Style="float: left;" ID="lblEquipo" runat="server" Text="Mis equipos"></asp:Label>
            </div>    --%>
            </div>



            <table style="width: 100%;">
                <tr>
                    <td style="width: 20px;">
                        <ttgInfo:ToolTipGenerico ID="ttgInfoServicios"
                            style="margin-top: -5px;"
                            runat="server" Mensaje="El objetivo se calcula en base a lo distribuido a líneas que estan asignadas a empleados." />
                        <asp:Label ID="LblTextoTipoLinea" Visible="false" runat="server" Text="Label"></asp:Label>
                    </td>
                </tr>
            </table>


            <div id="prueba" style="display: none;">
                
                <div id="pnlDistribucion1" class="pnlInformacion">

                    <li class="list-header">Distribución de Costo (<asp:Label ID="LblTipoMoneda1" runat="server"></asp:Label>) por Tipo de Servicio (%)
                    </li>
                    <hr class="hr" style="margin-left: 15px;" />

                    <div id="ctndCharPie2">
                    </div>
                </div>
                <div id="pnlGrilla" class="pnlInformacion" style="display: none;">
                    <div class="pnlTit  ui-state-active" style="text-align: center;">
                        Detalle por Tipo de Servicio

                    </div>
                    <div id="ctndGrilla">
                    </div>
                </div>

            </div>


            <div id="GeneralEquipo">
                <div id="dvContenido">
                    <table align="center" border="0">
                        <tr>
                            <td style="width: 50px;">
                                <asp:Label ID="lblEquipoTitulo" runat="server" Text="Equipo"></asp:Label>
                            </td>
                            <td>
                                <asp:DropDownList ID="ddlDispositivo" runat="server" Width="430px">
                                </asp:DropDownList>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="ui-widget-content ui-helper-clearfix" style="margin: 0.6em .0em; height: 0.01em;">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div id="divTabs" runat="server">
                                    <iframe id="ifDetalleDispositivo" height="450px" width="500px" frameborder="0"></iframe>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </form>

            <script src="../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
        <script src="../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
        <script src="../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("../Content/js/shared/FusionCharts/3.13.3/fusioncharts.js")%>" type="text/javascript"></script>
        <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>


        <%--<script src="../../Content/js/shared/FusionCharts/3.13.2/fusioncharts.js" type="text/javascript"></script>--%>


        <%-- <script src="../../Common/Scripts/FusionCharts/FusionCharts.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/FusionCharts/FusionCharts.jqueryplugin.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/FusionCharts/FusionCharts.HC.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/FusionCharts/FusionChartsExportComponent.js" type="text/javascript"></script>--%>
        <script src="../Common/Scripts/select2/select2.min.js" type="text/javascript"></script>

</body>
</html>
