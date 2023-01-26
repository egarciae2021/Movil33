<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Consultar_Con_Llamada" Codebehind="Con_Llamada.aspx.vb" %>

<%@ Register src="../../Common/Controles/ExportarExcelGenerico.ascx" tagname="ExportarExcelGenerico" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
 
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link  href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.contextmenu.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Con_Llamada.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="dvCargando" class="dvCargando"></div>
        <div class="dvPanel">
            <table>
                <tr>
                    <td style="font-weight:bold;">
                        Opciones
                    </td>
                <%--</tr>
                <tr>--%>
                    <td>
                        <asp:DropDownList ID="ddlTipoReporte" runat="server" CssClass="ddlNormal" Width="300">
                            <asp:ListItem Text="Resumen de servicios por Líneas" Value="1"></asp:ListItem>
                            <asp:ListItem Text="Resumen de servicios por Empleado" Value="2"></asp:ListItem>
                            <asp:ListItem Text="Detalle de servicios por Líneas" Value="3"></asp:ListItem>
                            <asp:ListItem Text="Detalle de servicios por Empleado" Value="4"></asp:ListItem>
                            <asp:ListItem Text="Tipo de llamada por Empleado" Value="5"></asp:ListItem>
                            <asp:ListItem Text="Consumo por planes" Value="6"></asp:ListItem>
                            <asp:ListItem Text="Detalle dentro del Plan/Bolsa" Value="7"></asp:ListItem>
                            <asp:ListItem Text="Detalle fuera del Plan/Bolsa" Value="8"></asp:ListItem>
                        </asp:DropDownList>
                    </td>
                    <td>
                        <div id="btnImprimir" class="btnNormal" runat="server">
                            <img src="../../Common/Images/Mantenimiento/Imprimir.gif" alt="Imprimir"/>
                            <a>Imprimir</a>
                        </div>
                    </td>
                    <td>
                        <uc1:ExportarExcelGenerico ID="eegLlamada" runat="server" />
                    </td>
                    <td style="display:none;">
                        
                        <asp:TextBox ID="txtKey" runat="server"></asp:TextBox>
                    </td>
                </tr>
            </table>
        </div>
        <table id="tbConsulta"></table>
        <div id="Paginador"></div>
        <div class="contextMenu" id="dvMenu">
            <ul>
                <li id="Ascendente"><img src="../../Common/Images/Mantenimiento/Ascendente.png" alt="Ascendente"/>Ascendente</li>
                <li id="Descendente"><img src="../../Common/Images/Mantenimiento/Descendente.png" alt="Descendente"/>Descendente</li>
                <li id="Acumula"><img src="../../Common/Images/Sumario/GEN.png" alt="Acumula"/>Acumula</li>
            </ul>            
        </div>
    </form>
</body>
</html>