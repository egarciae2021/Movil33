<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Consultar_Con_Sumario" Codebehind="Con_Sumario.aspx.vb" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<%@ Register src="../../Common/Controles/ExportarExcelGenerico.ascx" tagname="ExportarExcelGenerico" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
 
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <link href="../../Common/Styles/Principal.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js"  type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.tabs.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Con_Sumario.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfTipoSumario" runat="server" />
        <asp:HiddenField ID="hdfValorSumario" runat="server" />
        <div id="pnalFiltros" class="dvPanel" style="padding:0px; margin-top:5px;">
            <table>
                <tr>
                    <td>
                        <img id="imgResumen" src="../../Common/Images/Mantenimiento/Notificaciones.png" alt="Resumen" title="Resumen" class="imgBtn" style="padding:5px; margin:0px;"/>
                    </td>
                    <td>
                        <img id="imgGrafico" src="../../Common/Images/Sumario/GEN.png" alt="Grafico" title="Gráfico" class="imgBtn" style="padding:5px; margin:0px;"/>
                    </td>
                    <td id="trTipoGrafico">
                        <asp:DropDownList ID="ddlTipoGrafico" runat="server" ToolTip="Tipo de grafico" Width="120">
<%--                            <asp:ListItem Text="Columna" Value="column" Selected="True"></asp:ListItem> 
                            <asp:ListItem Text="Barra" Value="bar"></asp:ListItem>
                            <asp:ListItem Text="Circular" Value="pie"></asp:ListItem> 
                            <asp:ListItem Text="Area" Value="area"></asp:ListItem>
                            <asp:ListItem Text="Area continua" Value="areaspline"></asp:ListItem>
                            <asp:ListItem Text="Linea" Value="line"></asp:ListItem>
                            <asp:ListItem Text="Linea continua" Value="spline"></asp:ListItem>
                            <asp:ListItem Text="Dispersos" Value="scatter"></asp:ListItem>--%>
                        </asp:DropDownList>
                    </td>
                    <td id="trTipoDato">
                        <asp:DropDownList ID="ddlTipoDato" runat="server" ToolTip="Tipo de datos" Width="100">
                            <asp:ListItem Text="Costo" Value="1" Selected="True"></asp:ListItem>
                            <asp:ListItem Text="Duración" Value="2"></asp:ListItem>
                            <asp:ListItem Text="Llamada" Value="3"></asp:ListItem>
                        </asp:DropDownList>
                    </td>
                    <td id="trNumRegistro">
                        <asp:DropDownList ID="ddlNumeroRegistro" runat="server" ToolTip="Top por Gráfico"></asp:DropDownList>
                    </td>
                    <td id="trTipoImpresion">
                        <asp:DropDownList ID="ddlTipoImpresion" runat="server" ToolTip="Tipo de impresión" Width="200"> </asp:DropDownList>                        
                    </td>
                    <td>
                        <img id="imgImprimir" src="../../Common/Images/Mantenimiento/Imprimir.gif" alt="Imprimir" title="Imprimir" class="imgBtn" style="padding:5px; margin:0px;"/>
                    </td>
                    <td>
                        <img id="imgSalir" src="../../Common/Images/Mantenimiento/Salir.gif" alt="Exportar" title="Salir" class="imgBtn" style="padding:5px; margin:0px;"/>
                    </td>
                    <td>
                    
                        <uc1:ExportarExcelGenerico ID="eeGenerico" runat="server" />
                    
                    </td>
                </tr>
            </table>
        </div>
        <cc1:TabJQ ID="TabOpciones" runat="server" BorderStyle="None" BorderWidth="0">
            <cc1:ContenedorTabJQ Titulo="Resumen" >
                <iframe id="ifLista" frameborder="0" style="padding:0px; margin:0px;"></iframe>
            </cc1:ContenedorTabJQ>
            <cc1:ContenedorTabJQ Titulo="Gráfico">
                <iframe id="ifGrafico" frameborder="0" style="padding:0px; margin:0px;"></iframe>        
            </cc1:ContenedorTabJQ>
        </cc1:TabJQ>
    </form>
</body>
</html>