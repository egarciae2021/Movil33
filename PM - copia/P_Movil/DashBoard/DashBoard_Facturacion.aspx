<%@ Page Language="vb" AutoEventWireup="false" Inherits="P_Movil_DashBoard_DashBoard_Facturacion" CodeBehind="DashBoard_Facturacion.aspx.vb"
    EnableViewState="false" EnableEventValidation="false" Async="true" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

    <link href="../../Content/css/shared/bootstrap.min.css" rel="stylesheet">
    <link href="../../Content/css/shared/nifty.min.css" rel="stylesheet">
    <%--<link href="../../Content/css/shared/nifty-demo-icons.min.css" rel="stylesheet">--%>

    <%-- <script src="../../Common/Scripts/FusionCharts/jquery.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/FusionCharts/jquery-1.8.3.js" type="text/javascript"></script>--%>

    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>

    <link href="../../Content/css/shared/font-awesome.min.css" rel="stylesheet" />
    <script type="text/javascript" src="../../Content/js/shared/jquery_1.7.2/bootstrap.min.js"></script>

    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Scripts/select2/select2.min.css" rel="stylesheet" />
    <style type="text/css">
        body {
            font-size: initial;
            background-color: #FFFFFF; /*#F3F5F9;*/
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

        #chartContainer2, #dv_TopTen, #dv_TopTen1, #dv_TopTen2 {
            text-align: center;
        }

        text[fill="#6b737c"] {
            font-weight: 600 !important;
        }

        #gview_tbGrupoServicioDet > .ui-jqgrid-bdiv {
            overflow: auto !important;
        }

    </style>
</head>
<body>
    <link href="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("DashBoard_Facturacion.css")%>" rel="stylesheet" type="text/css" />

    <form id="form1" runat="server">
        <div>

            <!-- =========================================================================================================
                    RPT RESUMEN FACTURACION 
                =========================================================================================================-->
            <asp:HiddenField ID="hdf_idGrupo" runat="server" />
            <asp:HiddenField runat="server" ID="hdfCodCue" />
            <asp:HiddenField runat="server" ID="hdfCodOpe" />
            <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
            <asp:HiddenField runat="server" ID="hdfTipoMoneda" />
            <asp:HiddenField runat="server" ID="hdfSepDecimal" />
            <asp:HiddenField runat="server" ID="hdfSepMiles" />
            <asp:HiddenField runat="server" ID="hdfNumDecimales" />
            <asp:HiddenField runat="server" ID="hdfCodigoAreaSeleccionada" />
            <!-- =========================================================================================================
                    RPT RESUMEN FACTURACION 
                =========================================================================================================-->
            <center>
                <%--<div style="width: 1020px;" id="pnlGeneral">--%>
                <div id="pnlGeneral">


                    <table border="0" style="width: 100%" cellpadding="0" cellspacing="0">
                        <tr id="filaTitutloReporte">
                            <td align="left" style="vertical-align: middle">
                                <li class="list-header-main">
                                    <label for="lblTituloDashboard">RESUMEN DE FACTURACIÓN</label>
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
                                            <div class="form-group">
                                                <label class="col-md-3 control-label" for="demo-text-input">Operador</label>
                                                <div class="col-md-9">
                                                    <asp:DropDownList ID="dwOperador" runat="server" Width="100%"></asp:DropDownList>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label class="col-md-3 control-label" for="demo-text-input">Organización: </label>
                                                <div class="col-md-6 dvCta">
                                                    <asp:TextBox ID="txtNomOrganizacion" ReadOnly="true" runat="server" Width="100%" Text="<Todos>" ></asp:TextBox>
                                                    <asp:HiddenField ID="hdfCodOrganizacion" runat="server" Value="-1" />
                                                </div>
                                                <div class="col-md-3">
                                                    &nbsp;
                                                    <div id="btnAgregarOrga" class="btnNormal" runat="server" title="Seleccionar Organización">
                                                        <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/buscar.png" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-sm-3">
                                            <div class="form-group">
                                                <label class="col-md-3 control-label" for="demo-text-input">Cuenta</label>
                                                <div class="col-md-9 dvCta">

                                                    <asp:DropDownList ID="dwCuenta" runat="server" Width="100%">
                                                        <asp:ListItem Value="-1">&lt;Todas&gt;</asp:ListItem>
                                                    </asp:DropDownList>

                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-3">
                                        </div>

                                    </div>
                                </div>


                                <table border="0" style="width: 100%; display: none;">
                                    <tr id="tbCabecera1">
                                        <td style="width: 50px; text-align: center">
                                            <%--<div class="btnNormal">Desde</div>--%>
                                            Periodo
                                        </td>
                                        <td style="width: 165px;"></td>

                                        <td style="width: 50px;">
                                            <asp:DropDownList ID="dwHasta" runat="server" Width="50px" Enabled="False"
                                                Visible="False">
                                            </asp:DropDownList>
                                        </td>
                                        <td style="width: 45px; text-align: right">Operador
                                        </td>
                                        <td style="text-align: left; width: 210px;"></td>
                                        <td style="width: 50px; text-align: center; display: none">Expresado en
                                        </td>
                                        <td style="display: none; width: 150px;">
                                            <asp:DropDownList ID="dwExpresado" runat="server" Width="50px"></asp:DropDownList>
                                        </td>
                                        <td style="width: 80px; text-align: right">Cuenta
                                        </td>
                                        <td class="dvCta" style="text-align: center; width: 300px;"></td>
                                        <td style="width: 80px; text-align: center; display: none;">
                                            <asp:Label ID="lblTipoLinea" runat="server" Text="Tipo línea"></asp:Label>
                                        </td>
                                        <td style="display: none;">
                                            <asp:DropDownList ID="dwTipoLinea" runat="server" Width="100px"></asp:DropDownList>
                                        </td>
                                        <td></td>

                                    </tr>
                                    <tr>
                                        <td colspan="10"></td>
                                    </tr>
                                </table>



                                <div class="panel" style="margin-top: 10px; margin-left: 20px; margin-right: 20px;">
                                    <div class="panel-body text-center clearfix" style="padding-bottom: 0px;">
                                        <div class="col-md-3 col-sm-4 pad-all">

                                            <div class="panel panel-warning panel-colorful" style="margin-bottom: 0px !important; margin-top: 15px;">
                                                <div class="pad-all text-center">
                                                    <span class="text-2x text-semibold-400" id="lblMontoTotal"></span>
                                                    <p class="text-md" runat="server" id="lblImporteTotal"></p>
                                                    <i class="demo-pli-shopping-bag icon-lg"></i>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="col-md-9 col-sm-8">
                                            <p class="text-lg text-semibold text-left mar-no text-main" id="lblTituloConceptosGenerales">Conceptos Generales</p>
                                            <ul id="ulConceptosFacturacion" class="list-unstyled text-center bord-top pad-top mar-no row" style="margin-top: 15px !important;">
                                                <%--<li class="col-md-2 col-sm-4" style="margin-top: 10px !important;"></li>--%>
                                            </ul>
                                        </div>
                                    </div>
                                </div>





                                <%--<div class="panel">
                                    <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">--%>

                                <div class ="col-lg-12 col-sm-12">
                                    <div class="col-lg-6 col-sm-6">
                                        <div class="panel">
                                            <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
                                                <div id="dv_TopTen"></div>
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
                                </div>

                                <div class="col-lg-6 col-sm-6">
                                    <div class="panel">
                                        <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">

                                            <div id="dv_TopTen1"></div>

                                            <div id="dvTop1Grupo1" class="form-group">
                                                <label class="col-sm-3 control-label" for="demo-hor-inputemail">Tipo </label>
                                                <div class="col-sm-9">
                                                    <select id="cboTipoTopTenCosto" style="width: 100%;">
                                                        <option>Línea</option>
                                                        <option>Empleado</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div id="dvTop1Grupo2" class="form-group">
                                                <label class="col-sm-3 control-label" for="demo-hor-inputemail">Concepto </label>
                                                <div class="col-sm-9">
                                                    <asp:DropDownList ID="ddlGrupo1" runat="server" Width="100%" ToolTip="Seleccione un grupo"></asp:DropDownList>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-6 col-sm-6">
                                    <div class="panel">
                                        <div class="panel-body form-horizontal form-padding" style="padding-bottom: 0px;">
                                            <div id="dv_TopTen2"></div>

                                            <div id="dvTop2Grupo1" class="form-group">
                                                <label class="col-sm-3 control-label" for="demo-hor-inputemail">Tipo </label>
                                                <div class="col-sm-9">
                                                    <%--<select id="cboTipoTopTenConsumo" style="width: 100%;">
                                                        <option>Línea</option>
                                                        <option>Empleado</option>
                                                    </select>--%>
                                                    <select disabled id="cboTipoTopTenServicio" style="width: 100%;">
                                                        <option>Servicio</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div id="dvTop2Grupo2" class="form-group">
                                                <label class="col-sm-3 control-label" for="demo-hor-inputemail">Concepto </label>
                                                <div class="col-sm-9">
                                                    <asp:DropDownList ID="ddlGrupo2" runat="server" Width="100%" ToolTip="Seleccione un grupo"></asp:DropDownList>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>





                        <!-- =================================================================================================
                        TITULOS
                    =================================================================================================-->




                        <!-- =================================================================================================
                        GRILLA GRUPO CONCEPTOS
                    =================================================================================================-->
                        <tr id="tbCabecera3_xxx" style="display: none;">
                            <td align="center">
                                <table id="tbGrupoServicio_xxx" style="display: none;">
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="height: 5px"></td>
                        </tr>
                    </table>

                    <!-- =================================================================================================
                        GRAFICOS SUPERIOR
                    =================================================================================================-->


                    <!-- =================================================================================================
                        GRAFICOS INFERIOR
                    =================================================================================================-->
                    <%--<table style="width: 100%; margin-top: 20px;" border="0">
                        <tr id="filaGraficos2">
                            <td align="left" style="width: 49%; background-color: #FFF !important" valign="top"></td>
                            <td></td>
                            <td align="left" style="width: 49%; background-color: #FFF !important" valign="top"></td>
                        </tr>
                    </table>--%>
                </div>
            </center>
        </div>

        <div id="dvDetalleGrupo" class="ui-state-default ui-corner-top" style="position: absolute; left: 0px; top: 0px; box-shadow: 0px 0px 5px; padding: 3px; border-radius: 5px; z-index: 999999; display: none;">Detalle </div>
        <div id="dvArea" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifArea" width="730" height="470" frameborder="0" style="padding: 0px;
                margin: 0px;"></iframe>
        </div>

        <div id="dvGrupoServicioDetalle" style="display:none; padding:0px; margin:0px;">
            <div style="padding: 20px 15px;">
                <table width="100%" border="0">
                <tr style="height: 25px;">
                    <td>
                        <div id="dvGrupoServicioDet">
                            <table id="tbGrupoServicioDet"></table>
                            <div id="PaginadorGrupoServicioDet">
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
            </div>
        </div>

        <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>

        <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/jqGrid443/jquery.jqGrid.min.js" type="text/javascript"></script>

        <%--<script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>--%>
        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("../../Content/js/shared/FusionCharts/3.13.3/fusioncharts.js")%>" type="text/javascript"></script>
        <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>


        <%--<script src="../../Content/js/shared/FusionCharts/3.13.2/fusioncharts.js" type="text/javascript"></script>--%>


        <%-- <script src="../../Common/Scripts/FusionCharts/FusionCharts.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/FusionCharts/FusionCharts.jqueryplugin.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/FusionCharts/FusionCharts.HC.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/FusionCharts/FusionChartsExportComponent.js" type="text/javascript"></script>--%>
        <script src="../../Common/Scripts/select2/select2.min.js" type="text/javascript"></script>
        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("DashBoard_Facturacion.js")%>" type="text/javascript"></script>
    </form>
</body>
</html>
