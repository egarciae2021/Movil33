<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Facturacion_Consultar_Con_Fac_CuentaCobro"
    CodeBehind="Con_Fac_CuentaCobro.aspx.vb" %>

<%@ Register Src="../../../Common/Controles/BusquedaPrincipal.ascx" TagName="BusquedaPrincipal"
    TagPrefix="uc1" %>
<%@ Register Src="../../../Common/Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcelGenerico"
    TagPrefix="eeg" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js"
        type="text/javascript"></script>
    <link href="Con_Fac_CronogramaPagos.css" rel="stylesheet" type="text/css" />
    <script src="Con_Fac_CuentaCobro.js" type="text/javascript"></script>
    <style type="text/css">


    </style>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfProcOrigenExpor" runat="server" />
    <asp:HiddenField ID="hdfProcDestinoExpor" runat="server" />
    <asp:HiddenField ID="hdfProcManualExpor" runat="server" />
    <asp:HiddenField ID="hdfProcOrigenVeri" runat="server" />
    <asp:HiddenField ID="hdfProcDestinoVeri" runat="server" />
    <asp:HiddenField ID="hdfProcManualVeri" runat="server" />
    <asp:HiddenField ID="hdfIndGenPagos" runat="server" />
    <asp:HiddenField ID="hdfProcManualGenCC" runat="server" />
    <asp:HiddenField ID="hdfinTipOri" runat="server" />
    <asp:HiddenField ID="hdfTecnicoResponsable" runat="server" />
        <asp:HiddenField ID="hdfOrganizacion" runat="server" />
    <div id="gen" style="width: auto; margin: 0 auto;">
        <div id="Div1" class="dvPanel ui-widget-content ui-corner-all pMedium" style="margin: 0px auto;
            width: 780px; padding: 10px; background-image: none; margin-top: 5px;">
            <table width="100%" border="0">
                <tbody>
                    <tr>
                        <td>
                            <table border="0">
                                <tbody>
                                    <tr>
                                        <td style="color: #003F59; vertical-align: middle; padding-right: 5px;" 
                                            class="style2">
                                            <b><span id="lblFiltro">Empleado</span></b>
                                        </td>
                                        <td style="padding-right: 50px;" class="style2">
                                            <div id="dvContenedorTecRes" runat="server">
                                                <uc1:BusquedaPrincipal ID="bpTecnicoResponsable" runat="server" />
                                                <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
                                            </div>
                                        </td>
                                        <td align="center" class="style2">
                                            <div id="btnBuscar" class="k-button">
                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td>
                                                            <asp:Image ID="Image3" runat="server" Style="width: 14px" ImageUrl="~/Common/Images/lup.png" />
                                                        </td>
                                                        <td>
                                                            &nbsp;Buscar
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                        <td align="center" class="style2">
                                            <div id="btnGenCuentaCobro" class="k-button">
                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td>
                                                            <asp:Image ID="Image2" runat="server" Style="width: 14px" ImageUrl="~/Common/Images/Generar.png" />
                                                        </td>
                                                        <td>
                                                            &nbsp;Generar Cuenta Cobro
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table border="0">
                                <tbody>
                                    <tr>
                                        <td style="padding-right: 25px;" Style="Width:60px;">
                                            <b><span id="Span1" style="color: #003F59;">Fecha</span></b>
                                        </td>
                                        <td valign="middle" rowspan="2" style="padding-right: 20px;" class="ocul">
                                            <select id="ddlPeriodo" class="ui-widget-content ui-corner-all" name="ddlMes" style="padding: 4px;
                                                width: 150px;">
                                            </select>
                                        </td>
                                        <td style="padding-right: 20px;">
                                            <b><span id="Span2" style="color: #003F59;">Monto Mayor a:</span></b>
                                        </td>
                                        <td valign="middle" rowspan="2" style="padding-right: 20px;" class="ocul">
                                            <input id="txtMontoMayora" class="ui-widget-content ui-corner-all " type="text" style="width: 80px;
                                                font-weight: normal; text-align: right;" maxlength="8" placeholder="Ingrese Cargo"
                                                 name="txtMontoMayora" />
                                        </td>
                                        <td style="padding-right: 20px;">
                                            <b><span id="Span3" style="color: #003F59;">Monto Menor a:</span></b>
                                        </td>
                                        <td valign="middle" rowspan="2" style="padding-right: 0px;" class="ocul">
                                            <input id="txtMontoMenora" class="ui-widget-content ui-corner-all " type="text" style="width: 80px;
                                                font-weight: normal; padding: 4px; text-align: right;" maxlength="8" placeholder="Ingrese Cargo"
                                                 name="txtMontoMenora" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="dvFechas" class="pMedium">
            <table width="100%">
                <tr>
                    <td align="left" style="color: #CC0000;">
                        <b><span id="spMensaje"></span></b>
                    </td>
                </tr>
            </table>
        </div>
        <div id="dvBotones" class="pMedium">
            <div id="btnExcel">
                <table id="tbExportar" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>
                            <eeg:ExportarExcelGenerico ID="eegSolicitudes" runat="server" />
                            <%--<div id="btnExportar" class="btnNormal" runat="server" title="Exportar">
                                                            <asp:Image ID="imgExportar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png" />
                                                        </div>  --%>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div id="gridCuentaCobro" class="pMedium">
        </div>
    </div>
    </form>
</body>
</html>
