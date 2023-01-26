<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="DashBoard_Incidencias.aspx.vb" Inherits=".DashBoard_Incidencias" 
    EnableViewState="false" EnableEventValidation="false" Async="true" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="../../Content/js/dist/jspdf.min.js"></script>
    <link href="../../Content/css/shared/bootstrap.min.css" rel="stylesheet">
    <link href="../../Content/css/shared/nifty.min.css" rel="stylesheet">

    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/0.9.0rc1/jspdf.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>
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

        #chartContainer2, #chartContainer3, #chartContainer4, #chartContainer6, #chartContainer7 {
            text-align: center;
        }

        text[fill="#6b737c"] {
            font-weight: 600 !important;
        }
    </style>
</head>
<body>
    <link href="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("DashBoard_Facturacion.css")%>" rel="stylesheet" type="text/css" />
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfEsValido" runat="server" />
        <div>
            <center>
                <div id="pnlGeneral">
                    <table border="0" style="width: 100%" cellpadding="0" cellspacing="0">
                        <tr id="filaTitutloReporte">
                            <td align="left" style="vertical-align: middle">
                                <li class="list-header-main">
                                    <label for="lblTituloDashboard">DASHBOARD INCIDENCIAS</label>
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
                                                    <asp:DropDownList ID="dwDesde" runat="server" Width="100%"></asp:DropDownList>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-3">
                                        </div>

                                        <div class="col-sm-3">
                                        </div>

                                        <div class="col-sm-3">
                                        </div>

                                    </div>
                                
                                </div>

                                <div class="col-lg-6 col-sm-6">
                                    <div class="panel">
                                        <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
                                            <div id="chartContainer2"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-sm-6">
                                    <div class="panel">
                                        <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
                                            <div id="chartContainer3"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-sm-12">
                                    <div class="panel">
                                        <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
                                            <div id="chartContainer4"></div>

                                            <div id="dvSVGFiltro" class="form-group">
                                                <label class="col-sm-3 col-lg-3 control-label" for="demo-hor-inputemail">Nivel </label>
                                                <div class="col-sm-9 col-lg-9 ">
                                                    <asp:DropDownList ID="ddlNivel" runat="server" Width="100%" ToolTip="Seleccione un nivel"></asp:DropDownList>
                                                </div>                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <%--<div class="col-lg-6 col-sm-6">
                                    <div class="panel">
                                        <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
                                            <div id="chartContainer5"></div>
                                        </div>
                                    </div>
                                </div>--%>


                                <div class="col-lg-12 col-sm-12">
                                    <div class="panel">
                                        <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
                                            <div id="chartContainer6"></div>

                                            <div class="form-group">
                                                <label class="col-sm-3 col-lg-2 control-label" for="demo-hor-inputemail">Nivel </label>
                                                <div class="col-sm-9 col-lg-4 ">
                                                    <asp:DropDownList ID="ddlNivelMeses" runat="server" Width="100%" ToolTip="Seleccione un nivel"></asp:DropDownList>
                                                </div>
                                                <label class="col-sm-3 col-lg-2 control-label" for="demo-hor-inputemail">Bolsa </label>
                                                <div class="col-sm-9 col-lg-4 ">
                                                    <asp:DropDownList ID="ddlBolsa" runat="server" Width="100%" ToolTip="Seleccione una bolsa"></asp:DropDownList>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-sm-12">
                                    <div class="panel">
                                        <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
                                            <div id="chartContainer7"></div>
                                            <br />
                                            <div id="dvDetalleFiltro" class="form-group">
                                                <label class="col-sm-3 col-lg-3 control-label" for="demo-hor-inputemail">Meses </label>
                                                <div class="col-sm-9 col-lg-8 ">
                                                    <select id="ddlNroMes" style="width: 100%;">
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6" selected="selected">6</option>
                                                    </select>
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
        </div>
        <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("../../Content/js/shared/FusionCharts/3.13.3/fusioncharts.js")%>" type="text/javascript"></script>
        <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

        <script src="../../Common/Scripts/select2/select2.min.js" type="text/javascript"></script>
        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("DashBoard_Incidencias.js")%>" type="text/javascript"></script>
    </form>
</body>
</html>
