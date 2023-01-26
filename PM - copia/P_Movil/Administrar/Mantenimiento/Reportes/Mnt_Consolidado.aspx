<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Mnt_Consolidado.aspx.vb" Inherits=".Mnt_Consolidado" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="stylesheet" type="text/css" href="../../../../Common/Styles/jqGrid/ui.jqgrid.css" />
    <link rel="stylesheet" type="text/css" href="../../../../Common/Styles/dhtmlxtree.css" />
    <script type="text/javascript" src="../../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script src="../../../../Common/Scripts/FusionCharts/FusionCharts.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqGrid/grid.base.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqGrid/grid.common.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqGrid/grid.formedit.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqGrid/jquery.fmatter.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqGrid/JsonXml.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqGrid/jqDnR.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqGrid/jqModal.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqGrid/grid.jqueryui.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/Utilitario.js"></script>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Mnt_Consolidado.js")%>" type="text/javascript"></script>
    <link href="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Mnt_Consolidado.css")%>" type="text/css" rel="Stylesheet" />
    <form id="form1" runat="server">
        <div id="" class="dvPanel ui-widget-content ui-corner-all">
            <table style="width: 100%;" border="0">
                <tr>
                    <td style="">
                        <div class="SubTituloPagina">PLANTA (Líneas, Equipos, Plan, Cuentas, Organización)</div>
                    </td>
                    <td style="width: 620px;">
                        <table border="0" align="left">
                            <tr>
                                <td style="width: 91px; text-align: right;">Filtrar por: </td>
                                <td>
                                    <select id="cboCampo"></select>
                                </td>
                                <td style="width: 120px;">
                                    <input type="text" id="txtFiltro" name="txtFiltro" value="" />
                                </td>
                                <td style="width: 100px;">
                                    <div id="btnBuscar" class="btnNormal" style="width: 90px; height: 25px; text-align: center;">
                                        <table border="0" style="margin-top: -4px;">
                                            <tr>
                                                <td id="img_buscar">
                                                    <%--<asp:Image alt="Buscar" AlternateText="Buscar" ID="Image1"
                                                        Width="16px" runat="server" ImageUrl="~/Common/Images/Mantenimiento/buscar.png" />--%>
                                                </td>
                                                <td>Buscar</td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                                <td style="width: 100px;">
                                    <div id="btnExportar" class="btnNormal btnExportarExcel" style="width: 90px; height: 25px;">
                                        <table border="0" style="margin-top: -4px;">
                                            <tr>
                                                <td id="img_exportar">
                                                    <%--<asp:Image alt="Exportar" AlternateText="Exportar" ID="Image12"
                                                        Width="16px" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png" /></td>--%>
                                                <td>Exportar</td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <div id="dvCargandoPage" class="dvCargandoPage">
                            <img src="../../../../Common/Images/Mantenimiento/Cargando.gif" alt="" />
                        </div>
                        <div id="dvPrincipal" style="display: none;">
                            <table id="grid_Consolidado">
                            </table>
                            <table id="Pager"></table>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</body>
</html>
