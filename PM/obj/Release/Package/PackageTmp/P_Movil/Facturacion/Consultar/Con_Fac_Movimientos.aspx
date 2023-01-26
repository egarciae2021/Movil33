<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Facturacion_Consultar_Con_Fac_Movimientos"
    CodeBehind="Con_Fac_Movimientos.aspx.vb" %>

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
    <link href="Con_Fac_CronogramaPagos.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js"
        type="text/javascript"></script>
    <script src="Con_Fac_Movimientos.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfFiltro" runat="server" />
    <asp:HiddenField ID="hdfValor" runat="server" />
    <asp:HiddenField ID="hdfCnt" runat="server" />
    <asp:HiddenField ID="hdfinTipOri" runat="server" />
    <asp:HiddenField ID="hdfTecnicoResponsable" runat="server" />
    <asp:HiddenField ID="hdfOrganizacion" runat="server" />

    <div id="toolbar" class="dvPanel ui-widget-content ui-corner-all pMedium" style="margin: 0px auto;
        width: 780px; padding: 10px; background-image: none; margin-top: 5px;">
        <table width="100%" border="0">
            <tbody>
                <tr>
                    <td>
                        <table border="0">
                            <tbody>
                                <tr>
                                    <td style="color: #003F59; vertical-align: middle; padding-right: 5px;" class="ocul">
                                        <b><span id="lblFiltro">Empleado</span></b>
                                    </td>
                                    <td style="padding-right: 10px;">
                                        <div id="dvContenedorTecRes" runat="server">
                                            <uc1:BusquedaPrincipal ID="bpTecnicoResponsable" runat="server" />
                                            <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
                                        </div>
                                    </td>
                                    <%--   <td style="padding-right: 10px;">
                                        <span id="lblFiltro" style="color: #003F59;">Filtro</span>
                                    </td>
                                   <td style="padding-right: 10px;">
                                        <span style="color: #003F59; vertical-align: bottom;">En</span>
                                    </td>
                                    <td valign="middle" rowspan="2" style="padding-right: 0px; width: 170PX;" class="k-formatBlock ocul">
                                        <select id="ddlFiltro" class="ui-widget-content ui-corner-all" style="width: 120px;
                                            margin-left: 15px; font-weight: normal; padding: 4px;" name="ddlBusqueda">
                                            <option value="" selected="selected">Seleccione Filtro</option>
                                            <option value="EMPL_P_vcCODEMP">Cod. Empleado</option>
                                            <option value="EMPL_vcNOMEMP">Nombre Empleado</option>
                                        </select>
                                    </td>
                                    <td style="padding-right: 10px;">
                                        <span style="color: #003F59; vertical-align: bottom;">Filtrar: </span>
                                    </td>
                                    <td valign="middle" rowspan="2" style="padding-right: 0px;" class="ocul">
                                        <input id="txtValor" class="ui-widget-content ui-corner-all" type="text" style="width: 200px;
                                            margin-left: 15px; font-weight: normal; padding: 4px; text-align: right;" maxlength="200"
                                            placeholder="Valor a filtrar" name="txtValor" />
                                    </td>--%>
                                    <td style="padding-right: 0px;">
                                        <table id="tblAcciones" class="ui-buttonset" cellspacing="0" cellpadding="0">
                                            <tbody>
                                                <tr>
                                                    <td style="padding-right: 10px;">
                                                        <b><span style="color: #003F59; vertical-align: bottom;">Últimos </span></b>
                                                    </td>
                                                    <td style="padding-right: 10px;">
                                                        <asp:DropDownList ID="ddlCntMov" runat="server">
                                                            <asp:ListItem Selected="True">5</asp:ListItem>
                                                            <asp:ListItem>10</asp:ListItem>
                                                            <asp:ListItem>15</asp:ListItem>
                                                            <asp:ListItem>20</asp:ListItem>
                                                        </asp:DropDownList>
                                                    </td>
                                                    <td>
                                                        <b><span style="color: #003F59; vertical-align: bottom;">Movimientos </span></b>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <%--<td align="center">
                                        <div id="btnBuscar" class="k-button">
                                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
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
                    <table id="tblUsuario" width="100%" cellpadding="0" cellspacing="0" border="0">
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
                    <table align="left" style="width: 800px;">
                        <tr height="4px">
                            <td colspan="6">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom; width: 120px;">
                                <b>Fecha actual:</b>
                            </td>
                            <td style="vertical-align: bottom;" class="style1">
                                <asp:Label ID="lblFecha" runat="server" Text="(Desconocido)" Width="150px"></asp:Label>
                            </td>
                            <td align="right" style="color: #003F59; vertical-align: bottom;" class="style2" Width="113px">
                                
                            </td>
                            <td style="vertical-align: bottom;">
                                <asp:Label ID="lblNumCuotas" runat="server" Text=""></asp:Label>
                            </td>
                            <td align="right" style="color: #003F59; vertical-align: bottom;">
                                <b>Deuda:</b>
                            </td>
                            <td style="vertical-align: bottom; width: 150px;">
                                <asp:Label ID="lblSaldo" runat="server" Text="(Desconocido)"></asp:Label>
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
        <%--<div id="btnExcel" class="k-button">
            <%--            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td>
                        <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png" />
                    </td>
                    <td>
                        &nbsp;
                    </td>
                </tr>
            </table>--%>
        <table id="tbExportar" cellpadding="0" cellspacing="0">
            <tr>
                <td>
                    <eeg:ExportarExcelGenerico ID="eegSolicitudes" runat="server" />
                </td>
            </tr>
        </table>
        <%--</div>--%>
    </div>
    <div class="pMedium">
        <%--        <div id="grdMov">
        </div>--%>
        <div id="grdMovCliente" style="padding-bottom: 10px; margin-bottom: 15px;">
        </div>
    </div>
    </form>
</body>
</html>
