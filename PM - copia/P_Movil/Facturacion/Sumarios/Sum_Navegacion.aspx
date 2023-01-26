<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Facturacion_Sumarios_Sum_Navegacion"
    CodeBehind="Sum_Navegacion.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/jqGrid/ui.jqgrid.css" />
    <script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/grid.base.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/grid.common.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/grid.formedit.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/jquery.fmatter.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/JsonXml.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/jqDnR.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/jqModal.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/grid.jqueryui.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/Utilitario.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/FusionCharts/FusionCharts.js"></script>
    <script src="Sum_Navegacion.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <%--Configuracion Regional--%>
    <asp:HiddenField ID="hdfNumDec" runat="server" />
    <asp:HiddenField ID="hdfSimDec" runat="server" />
    <asp:HiddenField ID="hdfSimMil" runat="server" />
    <asp:HiddenField ID="hdfSimMon" runat="server" />
    <div id="dvCargando" class="dvCargando">
    </div>
    <div style="width: 1024px; margin: auto;">
        <%--<div style="float: left; width: 520px; height: 60px; border: 0px dotted gray;">--%>
        <table id="filtro" border="0" cellpadding="0" cellspacing="3" align="left" style="margin: 0 auto;">
            <tr>
                <td>
                    Mes:
                    <asp:DropDownList ID="ddlMes" runat="server">
                    </asp:DropDownList>
                </td>
                <td style="width: 10px;">
                </td>
                <td>
                    Tipo:
                    <select id="selectTipo">
                        <option value="LLAMADAS">Llamadas</option>
                        <option value="DURACIÓN">Duración</option>
                        <option value="MONTO" selected="selected">Monto</option>
                    </select>
                </td>
                <td style="width: 10px;">
                </td>
                <td>
                    Telefonía:
                    <select id="selectTelefonia">
                        <option value="SC" selected="selected">Salientes</option>
                        <option value="EC">Entrantes</option>
                    </select>
                </td>
                <td style="width: 10px;">
                </td>
                <td align="center">
                    <div id="btnBuscar">
                        <asp:Image ID="Image1" runat="server" Style="width: 14px" ImageUrl="~/Common/Images/lup.png" />
                    </div>
                </td>
                <td align="center">
                    <%--agregado 15-10-2013 wapumayta --%>
                    <div id="btnExportar" runat="server" title="Exportar a Excel">
                        <asp:Image ID="imgExportar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png"
                            Width="16px" Height="16px" />
                    </div>
                </td>
                <td align="center">
                    <%--agregado 18-10-2013 wapumayta --%>
                    <div id="btnExportarImagen" runat="server" title="Exportar Imagen">
                        <asp:Image ID="imgExportarImagen" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Exportar16.png"
                            Width="16px" Height="16px" />
                    </div>
                </td>
            </tr>
        </table>
        <%--</div>--%>
        <div id="datosNavegacion" style="padding-top: 41px;">
            <%--<div id="grids-0" style="float: left; width: 100%; border: 0px dotted gray;">
            </div>
            <div id="graficosChart" style="float: left; width: 100%; height: 355px; border: 0px dotted gray;
                clear: both; margin: 2px;">
                <div id="tops" style="float: left; width: 48%; clear: both; border: 0px dotted gray;
                    text-align: center;">
                    <ul>
                        <li><a id="tabTob-0" href="#tob-0">Top Áreas</a></li>
                        <li><a id="tabTob-1" href="#tob-1">Top Empleados</a></li>
                    </ul>
                    <div id="tob-0" style="width: 450px; height: 300px;">
                    </div>
                    <div id="tob-1" style="width: 450px; height: 300px;">
                    </div>
                </div>
                <div id="charts" style="float: left; width: 48%; height: auto; border: 0px dotted gray;">
                </div>
            </div>
            <div id="grids-1" style="float: left; width: 100%; border: 0px dotted gray;">
            </div>--%>
            <table style="width: 1024px;">
                <tr>
                    <td align="center">
                        <div id="grids-0" style="width: 100%; border: 0px dotted gray;">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <div id="graficosChart" style="width: 100%; height: 355px; border: 0px dotted gray;
                            clear: both; margin: 2px;">
                            <table border="0" width="100%">
                                <tr>
                                    <td align="right" style="width: 55%; text-align:right;">
                                        <div id="tops" style="clear: both; border: 0px dotted gray;
                                            text-align: center;">
                                            <ul>
                                                <li><a id="tabTob-0" href="#tob-0">Top Áreas</a></li>
                                                <li><a id="tabTob-1" href="#tob-1">Top Empleados</a></li>
                                            </ul>
                                            <div id="tob-0" style="width: 450px; height: 300px;">
                                            </div>
                                            <div id="tob-1" style="width: 450px; height: 300px;">
                                            </div>
                                        </div>
                                    </td>
                                    <td style="vertical-align:top;">
                                        <div id="charts" style="width: 48%; height: auto; border: 0px dotted gray;">
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <div id="grids-1" style="width: 100%; border: 0px dotted gray;">
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div style="clear: both;">
        </div>
        <br />
        <div id="emptyDatos" class="ocultar" align="center" style="float: left; font-size: medium;
            color: Gray;">
            No hay datos para mostrar.
        </div>
        <br />
    </div>
    <input type="hidden" id="nivelOrg" runat="server" value="" />
    <input type="hidden" id="nivelOrgOrigen" runat="server" value="" />
    <div class="ocultar">
        <div id="detGlobal">
        </div>
    </div>
    <div id="divExportarImagenes" style="display: none;">
        <table width="100%">
            <tr>
                <td align="center">
                    <b>Gráficos mostrados en la página</b>
                </td>
            </tr>
            <tr>
                <td id="tdReportesGraficos" runat="server">
                </td>
            </tr>
            <tr>
                <td align="right">
                    <div id="btnDescargarSelec" runat="server">
                        Descargar
                    </div>
                    <div id="btnCerrarDialogDesc" runat="server">
                        Cerrar
                    </div>
                    <%--<div id="btnDescargarTodas" runat="server">
                        Descargar Todas
                    </div>--%>
                </td>
            </tr>
        </table>
    </div>
    <%--    <div id="divCargando" style="display: none;">
        <table width="100%" border="0">
            <tr>
                <td align="center">
                    <asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Cargando.gif" />
                </td>
            </tr>
        </table>
    </div>--%>
    <iframe id="ifExcel" frameborder="0" style="padding: 0px; margin: 0px; display: none;">
    </iframe>
    <%--agregado 15-10-2013 wapumayta iframe para exportacion--%>
    </form>
</body>
</html>
