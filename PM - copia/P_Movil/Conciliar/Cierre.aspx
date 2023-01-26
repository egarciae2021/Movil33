<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Conciliar_Cierre"
    EnableEventValidation="false" CodeBehind="Cierre.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register Src="../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico"
    TagPrefix="ttgInfo" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/cultures/kendo.culture.es-ES.min.js" type="text/javascript"></script>
    <link href="../../Common/Styles/bootstrap/css/bootstrap.css" rel="stylesheet" />
    <link href="../../Common/Icons/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
    <script type="text/javascript" src="../../Common/Scripts/autosize.min.js"></script>
</head>
<body>
    <link href="bootstrap-progressbar-3.3.4.min.css" rel="stylesheet" />
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Cierre.js")%>" type="text/javascript"></script>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("CierreSignalR.js")%>" type="text/javascript"></script>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("CierreData.js")%>" type="text/javascript"></script>
    <link href="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Cierre.css")%>" type="text/css" rel="Stylesheet" />

    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfPeriodo" runat="server" />
        <asp:HiddenField ID="hdfCerrado" runat="server" />
        <asp:HiddenField ID="hdfUsuario" runat="server" />
        <asp:HiddenField ID="hdfGenerico" runat="server" Value="" />
        <asp:HiddenField ID="hdfOperador" runat="server" Value="" />

        <div id="dvCargandoPage" class="dvCargandoPage" style="display: none;">
            <img src="../../Common/Images/Mantenimiento/Cargando.gif" alt="" />
        </div>

        <div id="dvParametros" class="dvPanel ui-widget-content ui-corner-all">
            <div>Seleccione el operador para continuar con el proceso de cierre de conciliación.</div>
            <br />
            <div>Operador:&nbsp; <asp:DropDownList ID="ddlOperador" runat="server" Width="130px"></asp:DropDownList></div>
            <br />
        </div>

        <div id="dvPrincipal" style="display: none;">
            <div id="Div2" class="subTitulo1 ui-state-active" style="height: 25px;">
                <table width="100%" border="0">
                    <tr>
                        <td style="width: 200px; text-align: left;">
                            <label for="lblTituloDashboard" id="lblTituloPrincipal" class="SubTitulo1" style="margin-top: 4px; font-weight: bold;"></label>
                        </td>
                        <td></td>
                        <td style="width: 70px; text-align: right;">Número :&nbsp;
                        </td>
                        <td style="width: 110px">
                            <input type="text" id="txtBuscar" maxlength="15" style="width: 100px;" />
                        </td>
                        <td style="width: 80px; color: #8E9196; font-size: 9px;">(Presione Enter)</td>
                    </tr>
                </table>

            </div>
            <br />
            <div id="dvChat" style="text-align: center;">
                <img id="imgChat" alt="" src="images/mensajes.png" />
                <div id="dvChatContador"></div>
            </div>
            <div class="row tile_count" id="dvDatosTotales" style="height: 70px;">


                <div class="col-md-13 col-sm-4 col-xs-6 tile_stats_count">
                    <span class="count_top"><i class="fa fa-user"></i>&nbsp;LÍNEAS</span>
                    <div class="count">
                        <i class="fa fa-phone"></i>&nbsp;<span id="lblTotalLineas"></span>
                    </div>
                    <span class="count_bottom"><i id="VariacionLinea" style="font-weight: bold; color: rgb(0, 0, 0);">
                        <i id="iconVariacionLinea" class="fa"></i>
                        <span id="lblVariacionLineas"></span></i></span>
                </div>
                <div class="col-md-13 col-sm-4 col-xs-6 tile_stats_count tile_stats_count_line">
                    <span class="count_top"><i class="fa fa-list-alt"></i>&nbsp;CUENTAS</span>
                    <div class="count green">
                        <span id="lblTotalCuentas"></span><span id="lblDecSubTotal" class="decimal"></span>
                    </div>
                </div>
                <div class="col-md-13 col-sm-4 col-xs-6 tile_stats_count tile_stats_count_line">
                    <span class="count_top"><i class="fa fa-money"></i>&nbsp;TOTAL</span>
                    <div class="count" style="color: #1ABB9C;">
                        <span id="lblTotal"></span><span id="lblDecTotal" class="decimal">.00</span>
                    </div>
                </div>
                <div class="col-md-13 col-sm-4 col-xs-6 tile_stats_count tile_stats_count_line">
                    <span class="count_top"><i class="fa fa-check-square"></i>&nbsp;% VALIDADOS</span>
                    <div class="count">
                        <span id="lblPorcentajeValidados"></span>
                    </div>
                </div>
                <div class="col-md-13 col-sm-4 col-xs-6 tile_stats_count tile_stats_count_line">
                    <span class="count_top"><i class="fa fa-warning"></i>&nbsp;OBS. PENDIENTES</span>
                    <div class="count green">
                        <span id="lblObservacionesPendientes"></span>
                    </div>
                </div>
            </div>
            <cc1:AccordionJQ ID="ajAreas" Width="100%" runat="server" CssClass="accordion">
            </cc1:AccordionJQ>
            <br />
        </div>

        <table style="width: 100%; display:none;" border="0" id="btnAcciones" >
            <tr>
                <td></td>
                <td style="text-align: right; width: 180px;" align="right">
                    <div id="btnCerrar" class="btnNormal" style="width: 150px; display: none;" runat="server">
                        <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/enviarcorreousuario.png" />
                        <a>Cerrar Proceso</a>
                    </div>
                    <div id="btnAbrir" class="btnNormal" style="width: 150px; display: none;" runat="server">
                        <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/enviarcorreousuario.png" />
                        <a>Abrir Proceso</a>
                    </div>
                </td>
            </tr>
        </table>


        <div class="MensajeSinDatos" id="lblMensajeSinDatos" style="display: none;"></div>

        <div id="divMsgConfirmacion" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <asp:Label ID="lblMensajeConfirmacion" runat="server" Text=""></asp:Label>
        </div>

        <div id="dvDetalle" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifDetalle" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
        </div>

        <div id="dvNota" style="display: none; overflow: hidden;">
            <iframe id="ifNota" scrolling="no" frameborder="0" style="padding: 0px; margin: 0px; height: 530px; width: 670px;"></iframe>
        </div>

    </form>
</body>
</html>
