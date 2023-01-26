<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Mnt_Servicios" Codebehind="Mnt_Servicios.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <%--<link href="../../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />--%>
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />

    <link href="../../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>    
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>  
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>  
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script> 
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script> <%-- uniform --%>
    <script src="Mnt_Servicios.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfIdServicio" runat="server" />
        <asp:HiddenField ID="hdfGrupAct" runat="server" />
        <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
        <div class="dvPanel" style="overflow: auto;">
            <table>
                <tr>
                    <td>
                        Operador:
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlOperador" runat="server" Width="249px"></asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td>
                        Servicio:
                    </td>
                    <td>
                        <asp:TextBox ID="txtServicio" runat="server" Width="300px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        Descripcion
                    </td>
                    <td>
                        <asp:TextBox ID="txtDescripcion" runat="server" Width="300px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        Sin Costo
                    </td>
                    <td>
                        <input type="checkbox" id="chkSinCosto" runat="server" />
                    </td>
                </tr>
                <tr id="trCosto" runat="server">
                    <td>
                        Costo
                    </td>
                    <td>
                        <asp:TextBox ID="txtCosto" runat="server" Width="100px" MaxLength="9"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        Grupos de Empleado
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlGruposOrigen" runat="server" Width="249px"></asp:DropDownList>
                        <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"
                            CssClass="imgBtn" ToolTip="Agregar" />
                        <asp:Image ID="imgQuitar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif"
                            CssClass="imgBtn" ToolTip="Quitar" />
                        <br />
                        <asp:ListBox ID="lstGrupos" runat="server" Width="249px" Height="150px"></asp:ListBox>
                    </td>
                </tr>
            </table>
        </div>
        <div style="text-align:left; padding-top: 12px">
            <div id="btnGuardarServicio" class="btnNormal">
                <asp:Image ID="imgGuardarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                <a>Guardar</a>
            </div>
            <div id="btnCerrarServicio" class="btnNormal">
                <asp:Image ID="imgCerrarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                <a>Cerrar</a>
            </div>
        </div>
    </form>
</body>
</html>
