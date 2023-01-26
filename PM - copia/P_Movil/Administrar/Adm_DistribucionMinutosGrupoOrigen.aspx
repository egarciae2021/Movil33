<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_DistribucionMinutosGrupoOrigen" Codebehind="Adm_DistribucionMinutosGrupoOrigen.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid443/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid443/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid443/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid443/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="Adm_DistribucionMinutosGrupoOrigen.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <div id="dvCargando" class="dvCargando"></div>
        <asp:HiddenField ID="hdfClaseDistribucion" runat="server" />
        <div id="divMsgInformativo" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            <div id="dvContenidoInformativo"></div>
        </div>
        <asp:HiddenField ID="hdfValorIlimitado" runat="server" />
        <div class="dvPanel" style="padding:0px; margin:0px; background-image:none;">
            <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="width:60px">
                        <asp:Label ID="lblFiltro" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
                    </td>
                    <td valign="middle" style="width:200px">
                        En:&nbsp;
                        <asp:DropDownList ID="ddlBusqueda" runat="server" style="margin-left:15px; font-weight:normal;" Width="150px">
                            <%--<asp:ListItem Value="1">Código</asp:ListItem>--%>
                            <asp:ListItem Value="2">Nombre</asp:ListItem>
                        </asp:DropDownList>
                    </td>
                    <td valign="middle" style="width:220px">
                        Filtrar:&nbsp;
                        <asp:TextBox ID="txtBusqueda" CssClass="txtBusqueda" runat="server" Text="Valor a filtrar" style="margin-left:15px; font-weight:normal;" 
                                        width="140px" MaxLength="200"></asp:TextBox>
                    </td>
                </tr>
            </table>
        </div>
        <div>
            <table id="tbGrupoOrigen"></table>
            <div id="pagerGrupoOrigen"></div>
        </div>
    </form>
</body>
</html>
