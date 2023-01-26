<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="DashBoard_Consumo.aspx.vb" Inherits=".DashBoard_Consumo" 
    EnableViewState="false" EnableEventValidation="false" Async="true" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register Src="../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link href="../../Content/css/shared/bootstrap.min.css" rel="stylesheet">
    <link href="../../Content/css/shared/nifty.min.css" rel="stylesheet">
    <link href="../../Content/css/shared/nifty-demo-icons.min.css" rel="stylesheet">

    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>

    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    
    <script src="../../Site_PCSistel33/jquery.easypiechart.min.js" type="text/javascript"></script>
    

    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>

    <link href="../../Content/css/shared/font-awesome.min.css" rel="stylesheet" />

    <link href="../../Content/css/shared/font-awesome.min.css" rel="stylesheet" />
    <script type="text/javascript" src="../../Content/js/shared/jquery_1.7.2/bootstrap.min.js"></script>

    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Scripts/select2/select2.min.css" rel="stylesheet" />

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

        #chartContainer2,#ctndCharTETotal,#ctndCharTATotal,#ctndCharTEMensajes,#ctndCharTAMensajes,#ctndCharTENavegacion,#ctndCharTANavegacion,#ctndCharTE,#ctndCharTA,#ctndCharPie {
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
    <link href="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("DashBoard_Global.css")%>" rel="stylesheet" type="text/css" />
    <link href="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("DashBoard_I.css")%>" rel="stylesheet" type="text/css" />
    <link href="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("DashBoard_Consumo.css")%>" rel="stylesheet" type="text/css" />
    <link href="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("DashBoard_Facturacion.css")%>" rel="stylesheet" type="text/css" />
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
    
        <center>
            <div id="pnlGeneral">
                <table border="0" style="width: 100%" cellpadding="0" cellspacing="0">
                    <tr id="filaTitutloReporte">
                        <td align="left" style="vertical-align: middle">
                            <li class="list-header-main">
                                <label for="lblTituloDashboard">DETALLE DE CONSUMO</label>
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

                            <div class="col-lg-6 col-md-6 col-sm-12">
                                <div class="panel">
                                    <div class="panel-heading">
                                        <h3 class="panel-title">
                                            RESUMEN DE CONSUMO
                                        </h3>
                                    </div>
                                    <div class="panel-body text-center clearfix">
                                        <div class="col-md-4 col-sm-4 pad-all">
                                            <div class="panel panel-warning panel-colorful" style="margin-bottom: 0px !important; height: 150px; ">
                                                <div class="pad-all text-center">
                                                    <span class="text-2x text-semibold-100"><asp:Label ID="lblConsumo" runat="server" Text="Label"></asp:Label></span>
                                                    <p class="text-md">Total Consumido</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4 pad-all">
                                            <div class="panel panel-info panel-colorful" style="margin-bottom: 0px !important; height: 150px; " >
                                                <div class="pad-all text-center">
                                                    <span class="text-2x text-semibold-100"><asp:Label ID="lblObjetivo" runat="server" Text="Label"></asp:Label></span>
                                                    <p class="text-md">Objetivo</p>
                                                </div>
                                            </div>
                                        </div>
                                        <%----------------------%>

                                        <div class="col-md-3 col-sm-3 pad-all">

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



                                        <%----------------------%>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-lg-6 col-md-6 col-sm-12">
                                <div class="panel">
                                    <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
                                        <div id="ctndCharPie">
                                            </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-12 col-sm-12">
                                <div >
                                    <div >
                                        
                                        <div>
                                            <li class="list-header">Histórico consumo
                                            </li>
                                            <hr class="hr" style="margin-left: 15px;" />
                                        </div>
                                        <br />
                                        <div id="pnlTap" style="text-align: center; margin: auto;">

                                        </div>
                                        <div id="pnlCuerpo" class="AnchoTotal" >
                                            <div id="pnlLlamadas" >
                                                <div class="col-xs-12 col-sm-12">
                                                    <div class="panel">
                                                        <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
                                                            <div id="pnlHistorico">                                                  
                                                                <div id="ctndCharHis">
                                                                </div>
                                                                <div id="pnlDdlHistorico" class="form-group">
                                                                    <label class="col-sm-3 col-lg-2 control-label" for="demo-hor-inputemail">Tipo </label>
                                                                    <div class="col-sm-9 col-lg-2">
                                                                        <select id="selectTipo" runat="server" style="width: 100%;">
                                                                            <option value="Costo" selected="selected">Costo</option>
                                                                            <option value="Llamadas">Cantidad</option>
                                                                            <option value="Minutos">Duración</option>
                                                                        </select>
                                                                    </div>
                                                                    <label class="col-sm-3 col-lg-2 control-label" for="demo-hor-inputemail">Servicio </label>
                                                                    <div class="col-sm-9 col-lg-2">
                                                                        <select id="selectServicio" runat="server" style="width: 100%;">
                                                                            <option value="LOC">Fija</option>
                                                                            <option value="CEL">Celular</option>
                                                                            <option value="DDI">Internacional</option>
                                                                            <option value="TOTAL" selected="selected">Total</option>
                                                                        </select>
                                                                    </div>
                                                                    <label class="col-sm-3 col-lg-2 control-label" for="demo-hor-inputemail">Meses Atras </label>
                                                                    <div class="col-sm-9 col-lg-2">
                                                                        <select id="ddlMesesAtrasLlamadas" runat="server" style="width: 100%;">
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
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <hr class="hr" style="margin-left: 15px;" />

                                                <div class="col-xs-12 col-sm-6 col-md-6">
                                                    <div class="panel">
                                                        <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
                                                            <div id="ctndCharTA" class="">
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
                                                <div class="col-xs-12 col-sm-6 col-md-6">
                                                    <div class="panel">
                                                        <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
                                                            <div id="ctndCharTE">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>

                                            <div id="pnlNavegacion" class="AnchoTotal">
                                                <div class="col-xs-12 col-sm-12">
                                                    <div class="panel">
                                                        <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
                                                            <div id="pnlHistoricoNavegacion">
                                                                <div id="ctndCharHisNavegacion">
                                                                </div>
                                                                <div id="pnlDdlHistoricoNavegacion" class="form-group">
                                                                    <label class="col-sm-3 col-lg-2 control-label" for="demo-hor-inputemail">Tipo </label>
                                                                    <div class="col-sm-9 col-lg-4">
                                                                        <select id="selectTipoNavegacion" runat="server" style="width: 100%;">
                                                                            <option value="Bytes">Cantidad</option>
                                                                            <option value="Costo" selected="selected">Costo</option>
                                                                        </select>
                                                                    </div>
                                                                    <label class="col-sm-3 col-lg-2 control-label" for="demo-hor-inputemail">Meses Atras </label>
                                                                    <div class="col-sm-9 col-lg-4">
                                                                        <select id="ddlMesesAtrasNavegacion" runat="server" style="width: 100%;">
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
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <hr class="hr" style="margin-left: 15px;" />

                                                <div class="col-xs-12 col-sm-6 col-md-6">
                                                    <div class="panel">
                                                        <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
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
                                                
                                                <div class="col-xs-12 col-sm-6 col-md-6">
                                                    <div class="panel">
                                                        <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
                                                            <div id="ctndCharTENavegacion"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div id="pnlMensajes" class="AnchoTotal">
                                                <div class="col-xs-12 col-sm-12">
                                                    <div class="panel">
                                                        <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
                                                            <div id="pnlHistoricoMensajes">
                                                                <div id="ctndCharHisMensajes">
                                                                </div>
                                                                <div id="pnlDdlHistoricoMensajes" class="form-group">
                                                                    <label class="col-sm-3 col-lg-2 control-label" for="demo-hor-inputemail">Tipo </label>
                                                                    <div class="col-sm-9 col-lg-4">
                                                                        <select id="selectTipoMensaje" runat="server" style="width: 100%;">
                                                                            <option value="Llamadas">Cantidad</option>
                                                                            <option value="Costo" selected="selected">Costo</option>
                                                                        </select>
                                                                    </div>
                                                                    <label class="col-sm-3 col-lg-2 control-label" for="demo-hor-inputemail">Meses Atras </label>
                                                                    <div class="col-sm-9 col-lg-4">
                                                                        <select id="ddlMesesAtrasMensaje" runat="server" style="width: 100%;">
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
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <hr class="hr" style="margin-left: 15px;" />

                                                <div class="col-xs-12 col-sm-6 col-md-6">
                                                    <div class="panel">
                                                        <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
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
                                                <div class="col-xs-12 col-sm-6 col-md-6">
                                                    <div class="panel">
                                                        <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
                                                            <div id="ctndCharTEMensajes"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div id="pnlTotal" class="AnchoTotal">
                                                <div class="col-xs-12 col-sm-12">
                                                    <div class="panel">
                                                        <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
                                                            <div id="pnlHistoricoTotal">
                                                                <div id="ctndCharHisTotal">
                                                                </div>
                                                                <div id="pnlDdlHistoricoTotal" class="form-group">
                                                                    <label class="col-sm-3 col-lg-2 control-label" for="demo-hor-inputemail">Tipo </label>
                                                                    <div class="col-sm-9 col-lg-4 " >
                                                                        <select id="selectTipoTotal" runat="server" style="width: 100%;">
                                                                            <option value="Costo" selected="selected">Costo</option>
                                                                        </select>
                                                                    </div>
                                                                    <label class="col-sm-3 col-lg-2 control-label" for="demo-hor-inputemail">Meses Atras </label>
                                                                    <div class="col-sm-9 col-lg-4">
                                                                        <select id="ddlMesesAtrasTotal" runat="server" style="width: 100%;">
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
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <hr class="hr" style="margin-left: 15px;" />
                                                
                                                <div class="col-xs-12 col-sm-6 col-md-6">
                                                    <div class="panel">
                                                        <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
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
                                                <div class="col-xs-12 col-sm-6 col-md-6">
                                                    <div class="panel">
                                                        <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
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

    </form>

    
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("../../Content/js/shared/FusionCharts/3.13.3/fusioncharts.js")%>" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/select2/select2.min.js" type="text/javascript"></script>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("DashBoard_Consumo.js")%>" type="text/javascript"></script>

</body>
</html>
