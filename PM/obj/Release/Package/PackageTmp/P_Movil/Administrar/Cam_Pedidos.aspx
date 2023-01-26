<%@Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Cam_Pedidos" Codebehind="Cam_Pedidos.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Cam_Pedidos.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        Campaña:
        <asp:DropDownList ID="ddlCampana" runat="server">
            <asp:ListItem Text="Campaña de navidad" Value="1"></asp:ListItem>
        </asp:DropDownList>
        
        <div class="ui-widget-content ui-corner-all" style="padding:0px; margin:0px; background-image:none;">
            <table border="0">
                <tr>
                    <td style="width:60px">
                        <asp:Label ID="lblFiltro" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
                    </td>
                    <td rowspan="2" valign="middle" style="width:200px">
                        En:&nbsp;
                        <asp:DropDownList ID="ddlBusqueda" runat="server" style="margin-left:15px; font-weight:normal;" Width="150px">
                            <asp:ListItem Value="vcEnt">Entidad</asp:ListItem>
                            <asp:ListItem Value="vcDes">Descripción</asp:ListItem>
                        </asp:DropDownList>
                    </td>
                    <td rowspan="2" valign="middle" style="width:220px">
                        Filtrar:&nbsp;
                        <asp:TextBox ID="txtBusqueda" CssClass="txtBusqueda" runat="server" Text="Valor a filtrar" style="margin-left:15px; font-weight:normal;" 
                                     width="140px" MaxLength="200"></asp:TextBox>
                    </td>
                    <td rowspan="2">
                        <div id="btnGenerarCorte" class="btnNormal">
                            <a>Generar Corte</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                </tr>
            </table>
        </div>    
        <table id="tblPedidos"></table>
        <div id="pager"></div>
    </form>
</body>
</html>
