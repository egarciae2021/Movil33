<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Facturacion_Consultar_Con_Fac_EstadoCuenta"
    CodeBehind="Con_Fac_EstadoCuenta.aspx.vb" %>

<%@ Register Src="../../../Common/Controles/BusquedaPrincipal.ascx" TagName="BusquedaPrincipal"
    TagPrefix="uc1" %>
<%@ Register Src="../../../Common/Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcelGenerico"
    TagPrefix="eeg" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />

    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <%--<script src="../../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>--%>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js" type="text/javascript"></script>
    <%--<link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />--%>
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="Con_Fac_CronogramaPagos.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        .style1
        {
            width: 71px;
        }
    </style>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Con_Fac_EstadoCuenta.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfTipo" runat="server" />
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfRuta" runat="server" />
    <asp:HiddenField ID="hdfFecEC" runat="server" />
    <asp:HiddenField ID="hdfinTipOri" runat="server" />
    <asp:HiddenField ID="hdfTecnicoResponsable" runat="server" />
    <asp:HiddenField ID="hdfOrganizacion" runat="server" />
    <asp:HiddenField runat="server" ID="hdfFecServidor" />
    <%--<div id="gen" style="width: auto; margin: 0 auto;">--%>
    <%--  <div id="TabDetalle_TabJQ1" class="ui-tabs-panel ui-widget-content ui-corner-bottom"
            style="overflow: auto; padding: 0px;">--%>
    <%-- <table width="100%">
                <tbody>
                    <tr class="trToolBar" align="center">
                        <td align="center">--%>
    <div id="toolbar" class="dvPanel ui-widget-content ui-corner-all pMedium" style="margin: 0px auto;
        width: 780px; padding: 10px; background-image: none; margin-top: 5px;">
        <table width="100%" border="0">
            <tbody>
                <tr>
                    <td>
                        <table border="0">
                            <tbody>
                                <tr>
                                    <td style="color: #003F59; vertical-align: middle; padding-right: 5px;">
                                        <b><span id="lblFiltro">Empleado</span></b>
                                    </td>
                                    <td style="padding-right: 10px;">
                                        <div id="dvContenedorTecRes" runat="server">
                                            <uc1:BusquedaPrincipal ID="bpTecnicoResponsable" runat="server" />
                                            <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
                                        </div>
                                    </td>
                                    <td style="color: #003F59; vertical-align: middle; padding-right: 10px;">Periodo</td>
                                    <td>
                                        <asp:TextBox id="txtPeriodo" runat="server" Width="150px" MaxLength="8" class="bordeui"></asp:TextBox>
                                    </td>
                                    
                                <%--                                        <td align="center">
                                        <div id="btnBuscar" class="k-button">
                                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td class="cLinId">
                                                        <asp:Image ID="imgGuardar" runat="server" Style="width: 14px" ImageUrl="~/Common/Images/lup.png" />
                                                    </td>
                                                    <td>
                                                        &nbsp;Buscar
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>--%>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="general">
        <div id="Principal">
            <div id="dvFechas">
                <table width="100%">
                    <tr>
                        <td align="left" style="color: #CC0000;">
                            <b><span id="spMensaje"></span></b>
                        </td>
                    </tr>
                </table>
            </div>
            <div>
                <div id="pInformacionUsuario" class="pMedium">
                    <table id="tbInfoUsuario" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr height="5px">
                            <td colspan="4">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="cGenInfo" align="center">
                                <b>Información del Usuario</b>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="style4">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom;">
                            </td>
                            <td>
                                &nbsp;
                            </td>
                            <td style="vertical-align: bottom;" class="style2">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom;" width="250px">
                                <b>Código:</b>
                            </td>
                            <td style="vertical-align: bottom; padding-left: 5px;">
                                <asp:Label ID="lblCodigoEmpleado" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                        <tr height="4px">
                            <td colspan="3">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom;">
                                <b>Nombre:</b>
                            </td>
                            <td style="vertical-align: bottom; padding-left: 5px;">
                                <asp:Label ID="lblNombreEmpleado" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                        <tr height="4px">
                            <td colspan="3">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom;">
                                <b>Área:</b>
                            </td>
                            <td style="vertical-align: bottom; padding-left: 5px;">
                                <asp:Label ID="lblArea" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                        <tr height="4px">
                            <td colspan="3">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom;">
                                <b>Centro de Costo:</b>
                            </td>
                            <td style="vertical-align: bottom; padding-left: 5px;">
                                <asp:Label ID="lblCCosto" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom;">
                            </td>
                            <td>
                                &nbsp;
                            </td>
                            <td style="vertical-align: bottom;" class="style2">
                            </td>
                        </tr>
                    </table>
                    <table align="left">
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom; padding-right: 5px;
                                padding-left: 30px;">
                                <b>Moneda:</b> &nbsp;
                            </td>
                            <td style="vertical-align: bottom; padding-right: 50px;">
                                <asp:Label ID="lblMoneda" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                            <td align="right" style="color: #003F59; vertical-align: bottom; padding-right: 5px;"
                                class="style2">
                                <b>Último día de pago:</b> &nbsp;
                            </td>
                            <td style="vertical-align: bottom; padding-right: 60px;">
                                <asp:Label ID="lblFechaPago" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                            <td align="right" style="color: #003F59; vertical-align: bottom; padding-right: 5px;">
                                <b>Periodo de Facturación:</b>
                            </td>
                            <td style="vertical-align: bottom; width: 180px" class="style1">
                                <asp:Label ID="lblPeriodo" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                        <tr height="4px">
                            <td colspan="6">
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div id="dvBotones" class="pMedium">
        <div id="btnExcel">
            <table id="tbExportar" cellpadding="0" cellspacing="0">
                <tr>
                    <td>
                        <eeg:ExportarExcelGenerico ID="eegSolicitudes" runat="server" />
                    </td>
                </tr>
            </table>
        </div>
        <div id="btnPdf" class="btnButton" style="width: 33px; height: 31px;">
            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="style2">
                        <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/pdf.ico" Style="height: 15px;
                            margin-left: -3px; margin-bottom: 3px;" />
                    </td>
                    <td>
                        &nbsp;
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div id="grdEstadoCuenta" class="pMedium">
    </div>
    <div id="Info" class="pMedium">
        <p style="display: none;"> 
            En <asp:Label runat="server" ID="lblDemonMoneda"></asp:Label></p>
        <ul>
            <li>
                <div>
                    <table id="tbDetalles">
                        <tr class="Alto">
                            <td align="center" class="cSubTitulo">
                                Estado de cuenta anterior
                            </td>
                        </tr>
                        <tr>
                            <td style="vertical-align: bottom; text-align: right;">
                                <asp:Label ID="lblECAnt" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                    </table>
                </div>
            </li>
            <li>
                <div class="signo">
                    -</div>
            </li>
            <li>
                <div>
                    <table>
                        <tr class="Alto">
                            <td class="cSubTitulo">
                                Pagos/Abonos
                            </td>
                        </tr>
                        <tr>
                            <td style="vertical-align: bottom; text-align: right;">
                                <asp:Label ID="lblPagos" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                    </table>
                </div>
            </li>
            <li>
                <div class="signo">
                    +</div>
            </li>
            <li>
                <div>
                    <table>
                        <tr class="Alto">
                            <td class="cSubTitulo">
                                Sub-Total consumos/cargos
                            </td>
                        </tr>
                        <tr>
                            <td style="vertical-align: bottom; text-align: right;">
                                <asp:Label ID="lblConsumos" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                    </table>
                </div>
            </li>
            <li>
                <div class="signo">
                    +</div>
            </li>
            <li>
                <div>
                    <table>
                        <tr class="Alto">
                            <td class="cSubTitulo">
                                Cuotas financiadas
                            </td>
                        </tr>
                        <tr>
                            <td style="vertical-align: bottom; text-align: right;">
                                <asp:Label ID="lblCuotasFinan" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                    </table>
                </div>
            </li>
            <li>
                <div class="signo">
                    =</div>
            </li>
            <li>
                <div>
                    <table>
                        <tr class="Alto">
                            <td class="Monto" style="width: 100px;">
                                Monto Total del Mes
                            </td>
                        </tr>
                        <tr>
                            <td style="vertical-align: bottom; text-align: right;">
                                <asp:Label ID="lblMontoTotal" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                        </tr>
                    </table>
                </div>
            </li>
        </ul>
    </div>
    <div id="dvCu" class="pMedium">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td colspan="4" class="cGenInfo" align="center">
                    <b>Cuotas Programadas</b>
                </td>
            </tr>
        </table>
    </div>
    <div id="grCronogramaPagos" class="pMedium" style="padding-bottom: 10px; margin-bottom: 15px;">
    </div>
    </form>
    <%--<div id="dvMonto" class="Adm">
        MONTO A PAGAR</div>--%>
</body>
</html>
