<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Reportes_Mnt_AgruLinDis"
    CodeBehind="Mnt_AgruLinDis.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
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
    <script type="text/javascript" src="../../../../Common/Scripts/FusionCharts/FusionCharts.js"></script>
    <script src="../../../../Common/Scripts/FusionCharts/FusionCharts.jqueryplugin.js"
        type="text/javascript"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/FusionCharts/FusionChartsExportComponent.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/dhtmlx/dhtmlxcommon.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/dhtmlx/dhtmlxtree.js"></script>
    <script src="../../../../Common/Scripts/dhtmlx/ext/dhtmlxtree_json.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Mnt_AgruLinDis.js" type="text/javascript"></script>
    <link href="../../../DashBoard/DashBoard_Global.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfTipoSumario" runat="server" />
    <asp:HiddenField ID="hdf_P_Codigo" runat="server" />
    <asp:HiddenField ID="hdf_F_Codigo" runat="server" />
    <asp:HiddenField ID="hdf_Desc" runat="server" />
    <asp:HiddenField ID="hdf_F_Desc" runat="server" />
    <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
    <div id="dvCargando" class="dvCargando">
    </div>

     <%--MPAJUELO_3.0.4_20161104--%>
    <div id="dvVistaPrincipal" style="display: block;">
        <div align="center">
            <div id="dvContAcordeon" style="width: 1020px; text-align: left;">
                <cc1:AccordionJQ ID="AccordionJQ1" Width="1020px" runat="server" CssClass="accordion">
                    <cc1:ContenedorAccodion ID="AcordionFiltros" Texto="Filtros">
                        <table border="0" cellpadding="0" cellspacing="3">
                            <tr>
                                <td style="width: 200px;">
                                    <asp:Label ID="Label2" runat="server" Text="Estado Línea:" Style="margin-left: 0px;"></asp:Label>
                                </td>
                                <td style="width: 100px;">
                                    <asp:DropDownList ID="ddlEstadoLinea" runat="server">
                                    </asp:DropDownList>
                                </td>
                                <td style="width: 25px;">
                                </td>
                                <td style="width: 120px; text-align: right;">
                                    <asp:Label ID="Label3" runat="server" Text="Estado Dispositivo:" Style="margin-left: 0px;"></asp:Label>
                                </td>
                                <td style="width: 100px;">
                                    <asp:DropDownList ID="ddlEstadoDispositivo" runat="server">
                                    </asp:DropDownList>
                                </td>
                                <td style="width: 25px;">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label id="lblFiltro" runat="server">
                                    </label>
                                </td>
                                <td colspan="4">
                                    <asp:TextBox ID="txtFiltro" runat="server" Width="333"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </cc1:ContenedorAccodion>
                </cc1:AccordionJQ>
            </div>
        </div>
        <div>
            <div id="gen" style="width: 1024px; margin: auto;">
                <div align="center" style="height: 20px; vertical-align: middle; font-size: 12px;
                    text-align: left; margin-top: 5px;">
                    <table width="100%">
                        <tr>
                            <td style="width: 250px;">
                                <asp:Label ID="Label1" runat="server" Text="Tipo Agrupación:" Style="margin-left: 5px;"></asp:Label>
                                <select id="cboTipoAgrupacion">
                                    <option value="Area">ORGANIZACIÓN</option>
                                    <option value="CentroCosto">CENTRO DE COSTO</option>
                                    <option value="Sucursal">SUCURSAL</option>
                                    <option value="GrupoEmpleado">GRUPO EMPLEADO</option>
                                    <option value="Operador">OPERADOR</option>
                                    <option value="Cuenta">CUENTA</option>
                                    <option value="Plan">PLAN</option>
                                    <option value="TipoModelo">TIPO MODELO</option>
                                    <option value="Modelo">MODELO</option>
                                </select>
                            </td>
                            <td id="filaNivel" style="width: 200px;">
                                <asp:Label ID="lblNivel" runat="server" Text="Nivel:" Style="margin-left: 0px;"></asp:Label>
                                <asp:DropDownList ID="ddlNivel" runat="server">
                                </asp:DropDownList>
                            </td>
                            <td style="width: 100px; display: none;">
                                <asp:Label ID="lblTop" runat="server" Text="Top:" Style="margin-left: 5px;"></asp:Label>
                                <asp:TextBox ID="txtTop" runat="server" MaxLength="5" Width="35px" Text="1000000"></asp:TextBox>
                            </td>
                            <td style="width: 155px;">
                                <%--MPAJUELO_3.0.4_20161104--%>
                                <asp:Label ID="lblTipo" runat="server" Text="Tipo:" Style="margin-left: 5px;"></asp:Label>
                                <select id="selectTipo">
                                    <option value="TOTALEMPLEADOS">EMPLEADOS</option>
                                    <option value="TOTALLINEAS">LÍNEAS</option>
                                    <option value="TOTALDISPOSITIVOS">DISPOSITIVOS</option>
                                    <option value="MONTO" selected="selected">MONTO</option>
                                </select>
                            </td>
                            <td align="center" style="width: 50px;">
                                <div id="btnBuscar">
                                    <asp:Image ID="Image1" runat="server" Style="width: 14px" ImageUrl="~/Common/Images/lup.png" />
                                </div>
                            </td>
                            <td style="text-align: right;">
                                <div id="btnExportar" runat="server" title="Exportar a Excel" style="position: static;
                                    right: 5px;">
                                    <asp:Image ID="imgExportar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png"
                                        Width="16px" Height="16px" />
                                </div>
                                <div id="btnExportarImagen" runat="server" title="Exportar Imagen">
                                    <asp:Image ID="imgExportarImagen" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Exportar16.png"
                                        Width="16px" Height="16px" />
                                </div>
                                <%--MPAJUELO_3.0.4_20161104--%>
                                <div id="btnVistaPrevia" runat="server" title="Vista Previa" style="position: static;
                                    right: 5px;">
                                    <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Reporte16.png"
                                        Width="16px" Height="16px" />
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div align="center" class="ui-state-active" style="height: 18px; vertical-align: middle;
                    font-size: 13px; margin-top: 20px; font-weight: bold;">
                    <span id="lblTituloPrincipal"></span>
                </div>
                <div id="Datos" style="width: 1020; border: 0px dotted gray; display: none; margin-top: 7px;">
                    <div id="grilla" style="float: left;">
                    </div>
                    <div id="dvUnidad" style="clear: both; margin-bottom: 20px; text-align: right; color: Red;
                        display: none;">
                        (*) Unidades medidas en
                    </div>
                    <center>
                        <div id="Chart" style="float: left;">
                            <div id="chartContainer">
                            </div>
                        </div>
                    </center>
                </div>
            </div>
        </div>
        <iframe id="ifExcel" frameborder="0" style="padding: 0px; margin: 0px; display: none;">
        </iframe>
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
                    </td>
                </tr>
            </table>
        </div>
    </div>

    <%--MPAJUELO_3.0.4_20161104--%>
    <div id="dvReporteDevExpress_Organizacional" style="display: none;" align="center">
        
        <%--MPAJUELO_3.0.4_20161104--%>
        <div id="btnRegresar" runat="server" title="Regresar" style="position: absolute; top: 10px; right: 1px; cursor: hand; cursor: pointer;">
            <asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Regresar.png"
                Width="24px" Height="24px" />
        </div>

        <iframe id="ifReporteDevExpress" frameborder="0" style="padding: 0px; margin: 0px;
            width: 1024px;"></iframe>
    </div>
    </form>
</body>
</html>
