<%@ Page Language="VB" AutoEventWireup="false" Inherits="General_Administrar_Mantenimiento_Numeros_Mnt_Subtipo" Codebehind="Mnt_Subtipo.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
	<link href="../../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../../../../Common/Scripts/jquery-1.7.2.js"></script>    
    <script src="../../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>  
    <script src="../../../../Common/Scripts/anytime.js" type="text/javascript"></script>  
    <script src="../../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script> 
    <script src="../../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>       
	<%--<script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
	<script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
	<script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script src="../../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>--%>
    <script src="Mnt_Subtipo.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfCod" runat="server" />
    <div id="dvCargando" class="dvCargando"></div>
    <div class="dvPanel" style="overflow: auto;">
        <table width="100%">
            <tr>
                <td>
                    <table width="100%">
                        <tr>
                            <td class="tdEtiqueta">
                                <asp:Label ID="lblTipo" runat="server" Text="Tipo:"></asp:Label>
                            </td>
                            <td>
                                <asp:DropDownList ID="ddlTipo" runat="server" Width="310px">
                                </asp:DropDownList>
                            </td>
                        </tr>
                        <tr>
                            <td class="tdEtiqueta">
                                <asp:Label ID="lblCodigoSubtipo" runat="server" Text="Código Subtipo:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtCodigo" runat="server" Width="70px" MaxLength="2"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td class="tdEtiqueta">
                                <asp:Label ID="lblNombreSubTipo" runat="server" Text="Nombre Subtipo:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtNombre" runat="server" Width="300px" MaxLength="35" onChange="validarEspaciosEnBlancoAlInicio()"></asp:TextBox>
                            </td>
                        </tr>
                        <tr id="trEstado" runat="server">
                            <td class="tdEtiqueta">
                                <asp:Label ID="lblActivo" runat="server" Text="Activo"></asp:Label>                                        
                            </td>
                            <td>
                                <asp:CheckBox ID="chkEstado" runat="server" Enabled="False" />
                            </td>
                        </tr>
                    </table> 
                </td>
            </tr>
        </table>
    </div>
    <br />
    <br />
    <div style="text-align:left;">
        <div id="btnGuardar" class="btnNormal">
            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
            <a>Guardar</a>
        </div>
        <div id="btnCerrar" class="btnNormal">
            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
            <a>Cerrar</a>
        </div>
    </div>
    </form>
</body>
</html>
