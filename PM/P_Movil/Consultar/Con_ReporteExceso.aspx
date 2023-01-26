<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Con_ReporteExceso.aspx.vb" Inherits=".Con_ReporteExceso" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register src="../../Common/Controles/ExportarExcelGenerico.ascx" tagname="ExportarExcelGenerico" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <link href="../../Common/Styles/Principal.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.tabs.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.accordion.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.draggable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.resizable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.autocomplete.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.MultiFile.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>  
     
      <%--kendo --%>
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/cultures/kendo.culture.es-ES.min.js" type="text/javascript"></script>

    <link href="../../Common/Styles/Principal.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.tabs.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <script src="Con_ReporteExceso.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfCodigoOperador" runat="server" />
        <asp:HiddenField ID="hdfPeriodo" runat="server" />
        <asp:HiddenField ID="hdfCodigoCuenta_Plan" runat="server" />
        <asp:HiddenField ID="hdfAsignacionCredito" runat="server" />
        <asp:HiddenField ID="hdfTipoServicio" runat="server" />
        <div id="pnalFiltros" class="dvPanel" style="padding:0px; margin-top:5px;">
            <table>
                <tr>
                    <td>
                        <asp:Label ID="LblPeriodo" runat="server" Text="Periodo"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtPeriodo" runat="server" CssClass="MESANHO" Width="90px" MaxLength="7"></asp:TextBox>
                    </td>
                    <td>
                        <asp:Label ID="LblOperador" runat="server" Text="Operador"></asp:Label>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlOperador" runat="server" Width="180">
                        </asp:DropDownList>
                    </td>
                    <td>
                        <asp:Label ID="lblAsignacionCredito" runat="server" Text="Asignación de crédito"></asp:Label>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlAsignacionCredito" runat="server" Width="150px"></asp:DropDownList>
                    </td>
                    <td id="tdLblPlan_Bolsa" style = "display:none;">
                        <asp:Label ID="LblPlanesBolsa" runat="server" Text="Planes/Bolsa"></asp:Label>
                    </td>
                    <td id="tdPlan_Bolsa" style = "display:none;">
                        <asp:DropDownList ID="ddlPlanesBolsa" runat="server" Width="180px"></asp:DropDownList>                        
                    </td>
                    <td>
                        <div id="btnImprimir" class="btnNormal" runat="server">
                            <img src="../../Common/Images/lup.png" alt="Imprimir" Style="width: 14px"/>
                            <a>Buscar</a>
                        </div>
                    </td>
                    <td id="tdExportar">
                        <%--<uc1:ExportarExcelGenerico ID="eegRepExceso" runat="server" />--%>
                        <%--<eeg:exportarexcel ID="eegRepExceso" runat="server"/>--%>
                        <uc1:ExportarExcelGenerico ID="eegLlamada" runat="server" />
                    </td>
                    <td style="display:none;">
                        
                        <asp:TextBox ID="txtKey" runat="server"></asp:TextBox>
                    </td>
                </tr>
            </table>
        </div>
        <cc1:TabJQ ID="TabOpciones" runat="server" BorderStyle="Solid" BorderWidth="1" Height= "500px" style="overflow: hidden;">
            <cc1:ContenedorTabJQ Titulo="Listado">
                <iframe id="ifLista" frameborder="0" style="padding:0px; margin:0px;"></iframe>        
            </cc1:ContenedorTabJQ>
        </cc1:TabJQ>
        <cc1:TabJQ ID="TabOpcionesPlan" runat="server" BorderStyle="Solid" BorderWidth="1" Height= "500px" style="overflow: hidden;">
            <cc1:ContenedorTabJQ Titulo="Listado">
                <iframe id="ifListaPlan" frameborder="0" style="padding:0px; margin:0px;"></iframe>        
            </cc1:ContenedorTabJQ>
        </cc1:TabJQ>

    </form>
</body>
</html>
