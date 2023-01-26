<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Consultar_Con_ConsultaPrincipal" Codebehind="Con_ConsultaPrincipal.aspx.vb" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

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
    <script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Con_ConsultaPrincipal.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfAccion" runat="server" />
        <asp:HiddenField ID="hdfIdUsuario" runat="server" />
        <div id="dvCargando" class="dvCargando"></div>
        <div id="dvBusqueda" style="display:none;">
            <table>
                <tr>
                    <td align="center">Nombre</td>
                    <td rowspan="3"></td>
                    <td align="center">Tipo de consulta</td>
                    <td rowspan="3"></td>
                    <td align="center" style="width:180px;">Otros usuarios</td>
                    <td rowspan="3"></td>
                    <td colspan="3" align="center" style="width:86px;">Fecha creación</td>
                    <td rowspan="3"></td>
                </tr>
                <tr>
                    <td rowspan="2">
                        <asp:TextBox ID="txtNombre" runat="server" Width="120px" MaxLength="50"></asp:TextBox>
                    </td>
                    <td rowspan="2">
                        <asp:DropDownList ID="ddlTipoConsultaBusqueda" runat="server">
                            <asp:ListItem Text="<Todos>" Value="-1"></asp:ListItem>
                            <asp:ListItem Text="Reporte" Value="1"></asp:ListItem>
                            <asp:ListItem Text="Sumario" Value="2"></asp:ListItem>
                            <asp:ListItem Text="Desconocido" Value="3"></asp:ListItem>
                            <asp:ListItem Text="Ranking" Value="4"></asp:ListItem>
                        </asp:DropDownList>
                    </td>
                    <td rowspan="2" align="center">
                        <asp:CheckBox ID="chkOtroUsuario" runat="server" Text="" ToolTip="Ver consultas que otros usuarios compartieron"/>
                        <asp:TextBox ID="txtUsuarioBusqueda" runat="server" Width="135px"></asp:TextBox>
                        <%--<asp:HiddenField ID="hdfCodUsuarioBusqueda" runat="server"/>--%>
                    </td> 
                    <td>
                        De:
                    </td>
                    <td>
                        <asp:TextBox ID="txtFechaCreacionI" runat="server" Width="75px" ReadOnly="true" CssClass="txtFecha"></asp:TextBox>
                    </td>
                    <td>
                        <img id="imgBorrarFechaCreacionI" alt="" src="../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        A:
                    </td>
                    <td>
                        <asp:TextBox ID="txtFechaCreacionF" runat="server" Width="75px" ReadOnly="true" CssClass="txtFecha"></asp:TextBox>
                    </td>
                    <td>
                        <img id="imgBorrarFechaCreacionF" alt="" src="../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>
                    </td>
                </tr>
            </table>
            <table id="tbCriterio"></table>
        </div>
        <div class="ui-widget-content ui-corner-all" style="padding:0px; margin:0px; background-image:none;">
            <table>
                <tr>
                    <td>
                        <div class="btnNormal">
                            <img id="btnNuevo" src="../../Common/Images/Mantenimiento/Nuevo.gif" alt="Nuevo" title="Nuevo" style="padding:5px; margin:0px;"/>                        
                        </div>
                    </td>
                    <td>
                        <div class="btnNormal">
                            <img id="btnAbrir" src="../../Common/Images/Mantenimiento/Abrir.png" alt="Abrir" title="Abrir" style="padding:5px; margin:0px;"/>                        
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <cc1:TabJQ runat="server" ID="TabOpciones" CssClass="tabs" style="margin-top:1px;">
        </cc1:TabJQ>
        <%--agregado 27-11-2013 wapumayta --%>
        <div id="dvArea" style="display:none;padding:0px; margin:0px;">
            <iframe id="ifArea" width="910" height="470" frameborder="0" style="padding:0px; margin:0px;"></iframe>
        </div>
        <div id="dvCCO" style="display:none;padding:0px; margin:0px;">
            <iframe id="ifCCO" width="590" height="440" frameborder="0" style="padding:0px; margin:0px;"></iframe>
        </div>
        <div id="divMsgConfirmar" style="display:none;">
        <asp:Label id="lblMsjConfirmacion" runat="server"></asp:Label>
    </div>
    </form>
</body>
</html>