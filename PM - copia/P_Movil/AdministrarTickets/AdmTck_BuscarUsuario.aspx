<%@ Page Language="VB" AutoEventWireup="false"
    Inherits="P_Movil_AdministrarTickets_AdmTck_BuscarUsuario" Codebehind="AdmTck_BuscarUsuario.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
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
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="AdmTck_BuscarUsuario.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server" >
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfEsBuscarUsuario" runat="server" />
    <div >
        <div id="Div1" runat="server" class="dvPanel" >
            
            <table id="Table1" runat="server" align="center" style="padding:0" width="100%">
                <tr>
                    <td align="right">
                        <span>Ingrese datos de búsqueda</span>
                    </td>
                    <td align="center">
                        <asp:TextBox ID="txtdato" runat="server" Width="300"></asp:TextBox>
                    </td>
                    <td align="center">
                        <asp:DropDownList ID="ddlTipoBusqueda" runat="server">
                            <asp:ListItem Value="0">Todos</asp:ListItem>
                            <asp:ListItem Value="1">Nombres y apellidos</asp:ListItem>
                            <asp:ListItem Value="2">Dni</asp:ListItem>
                            <asp:ListItem Value="3">Correo</asp:ListItem>
                        </asp:DropDownList>
                    </td>
                    <td align="left">
                        <div id="btnBuscarUsuario" >
                            <a>Buscar</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="4" align="center" height="10">
                    </td>
                </tr>
                <tr>
                    <td colspan="4" align="center">
                        <%--                        <div id="btnBuscarUsuario" class="btnNormal">
                            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                            <a>Registrar ticket</a>
                        </div>--%>
                        <table id="tbUsuarios" width="100%">
                        </table>
                        <div id="pager"></div> 
                    </td>
                </tr>
            </table>
        </div>
    </div>
    </form>
</body>
</html>
