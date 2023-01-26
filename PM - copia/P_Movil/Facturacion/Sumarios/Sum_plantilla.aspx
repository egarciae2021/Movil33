<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Facturacion_Sumarios_Sum_plantilla" Codebehind="Sum_plantilla.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/jqGrid/ui.jqgrid.css" />
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/dhtmlxtree.css"  />
    <script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script src="../../../Common/Scripts/FusionCharts/FusionCharts.js" type="text/javascript"></script>
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
    <script src="../../../Common/Scripts/FusionCharts/FusionCharts.jqueryplugin.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../../Common/Scripts/FusionCharts/FusionChartsExportComponent.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/dhtmlx/dhtmlxcommon.js" ></script>
    <script type="text/javascript" src="../../../Common/Scripts/dhtmlx/dhtmlxtree.js" ></script>
    <script src="../../../Common/Scripts/dhtmlx/ext/dhtmlxtree_json.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../../DashBoard/DashBoard_Global.css" rel="stylesheet" type="text/css" />
</head>
<body>
     <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Sum_plantilla.js")%>" type="text/javascript"></script>
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
    <div id="btnAbrirTreeOrganizacion" title="Elegir organización" style="width:40px; height:30px; position:absolute; left:5px; top:50%; z-index:1001; box-shadow:3px 3px 5px gray;">
    
    </div>
    <div id="panelTree" class="dvPanel" style="width:300px; height:99%; position:absolute; left:0px; top:0px; z-index:1000; display:none; overflow:scroll;box-shadow:3px 3px 5px gray;">

    </div>

    <div id="panelCheck" style="width:100px; height:30px; position:absolute; left:220px; top:0px; z-index:1003; display:none;">
    <asp:CheckBox ID="chkDependencias" runat="server" Text="Dependencias" />
    </div>
    
    <div>
        <div id="gen" style="width: 100%; margin: auto;">
            <div id="pnlTap" style="height: auto;">
            </div>
            <div style="border-top:1px solid skyblue; z-index: 0; clear:both; width: 100%; margin-bottom:5px;"></div>
            <div id="panelBusqueda"  style="float: left; width: 100%; height: 35px; margin-bottom: 8px;   ">
                <table border="0" cellpadding="0" cellspacing="0"   style="width: 100%;" >
                    <tr>
                        <td align="center" style="width: 140px;">
                            <asp:Label ID="lblPor" runat="server" Text="Mes:" Style="margin-right: 5px"></asp:Label>
                            <asp:DropDownList ID="ddlMes" runat="server">
                        </asp:DropDownList>
                        </td>
                        <td style="width: 140px;">
                            <asp:Label ID="lblTipo" runat="server" Text="Tipo:" Style="margin-left: 5px;"></asp:Label>
                            <select id="selectTipo">
<%--                                <option value="LLAMADAS">Llamadas</option>
                                <option value="DURACION">Duración</option>--%>
                                <option value="COSTO" selected="selected">Monto</option>
                            </select>
                        </td>
                        <td id="filaServicio" style="display:none; width: 270px;">
                            <asp:Label ID="lblServicio" runat="server" Text="Servicio:" Style="margin-left: 5px;"></asp:Label>
                            <select id="selectServicio" style="width: 200px;">
                                <option value="Total" selected="selected">Total</option>
                            </select>
                        </td>
                        
                        <td>
                        </td>
                        <td style="width: 100px;">
                            <asp:Label ID="lblTop" runat="server" Text="Top:" Style="margin-left: 5px;"></asp:Label>
                            <asp:TextBox ID="txtTop" runat="server" MaxLength="5" Width="35px" Text="10"></asp:TextBox>
                        </td>
                        <td id="filaNivel" style="width: 200px;">
                            <asp:Label ID="lblNivel" runat="server" Text="Nivel:" Style="margin-left: 0px;"></asp:Label>
                            <asp:DropDownList ID="ddlNivel" runat="server">
                            </asp:DropDownList>
                        </td>
                        <td align="left">
                            <div id="btnBuscar">
                                <asp:Image ID="Image1" runat="server" Style="width: 14px" ImageUrl="~/Common/Images/lup.png" />
                            </div>
                        </td>
                        

                        <td style="text-align: right;">
                            <table border="0" align="right">
                                <tr>
                                    <td>
                                        <%--Filtrar por descripción:--%>
                                        <label id="lblFiltro" runat="server"></label>
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtFiltro" runat="server" Width="200"></asp:TextBox>
                                    </td>
                                    <td align="left"> <%--agregado 15-10-2013 wapumayta --%>
                                        <div id="btnExportar" runat="server" title="Exportar a Excel">
                                            <asp:Image ID="imgExportar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png" width="16px" height="16px" />
                                        </div>
                                        <div id="btnExportarImagen" runat="server" title="Exportar Imagen">
                                            <asp:Image ID="imgExportarImagen" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Exportar16.png" width="16px" height="16px" />
                                        </div>
                                    </td>    
                                </tr>
                            </table>
                        </td>

                    </tr>

                </table>
            </div>
            <div id="Datos" style="width:100%;  border:0px dotted gray; display:none; margin-top:20px;">
                <div id="grilla" style="float:left;">
                </div>
                <div id="dvUnidad" style="clear:both; margin-bottom:20px; text-align:right; color:Red; display:none;">(*) Unidades medidas en </div>
                <center>
                    <div id="Chart" >
                        <div id="chartContainer"></div>
                    </div>
                </center>
            </div>
        </div>
    </div>
    <iframe id="ifExcel" frameborder="0" style="padding:0px; margin:0px; display:none;"></iframe> <%--agregado 15-10-2013 wapumayta iframe para exportacion--%>
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
    </form>
</body>
</html>
