<%@ Page Language="VB" AutoEventWireup="false" Inherits="General_Administrar_Mantenimiento_Numeros_Lista_Numero" Codebehind="Lista_Numero.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../../../../Common/Styles/jqGrid/ui.jqgrid.css" />
    <script type="text/javascript" src="../../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqGrid/grid.base.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqGrid/grid.common.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqGrid/grid.formedit.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqGrid/jquery.fmatter.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqGrid/JsonXml.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqGrid/jqDnR.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqGrid/jqModal.js"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/jqGrid/grid.jqueryui.js"></script>
    <script src="../../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../../../Common/Scripts/Utilitario.js"></script>
    <script src="Lista_Numero.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfCod" runat="server" />
    <asp:HiddenField ID="hdfCodEmpresa" runat="server" />
    <div id="dvCargando" class="dvCargando">
    </div>
    <div  style="float: left; width: 97%; height: 97%;">
        <div style="text-align: center; font-size: medium; margin-bottom: 20px; display: none;">
            <a>Números</a></div>
        <%--<table width="100%"><tr><td>--%>
        <div class="dvPanel" style="float: left; " id="panelMantenimiento">
        <asp:Label ID="Label2" runat="server" Text="Mantenimiento:"></asp:Label> 
            <br />
            <div id="btnAgregar" style="margin: auto; width:100px;">
                <table>
                    <tr>
                        <td><asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" /></td>
                        <td>Agregar</td>
                    </tr>
                </table>
            </div><br />
            <div id="btnEditar" style="margin: auto; width:100px;"">
                <table>
                    <tr>
                        <td><asp:Image ID="imgEditar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" /></td>
                        <td>Editar</td>
                    </tr>
                </table>
            </div><br />
            <div id="btnEliminar" style="margin: auto; width:100px;"">
                <table>
                    <tr>
                        <td><asp:Image ID="imgEliminar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" /></td>
                        <td>Eliminar</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="dvPanel" style="float: left; margin-left:10px;" id="panelBusqueda">
            <asp:Label ID="Label1" runat="server" Text="Tipos de búsqueda:"></asp:Label>
            <div id="radio">
                <input type="radio" id="radio1" name="radio" checked="checked" /><label for="radio1">Por Número</label>
                <input type="radio" id="radio2" name="radio" /><label for="radio2">Por Razón Social</label>
            </div><br />
            <div id="rad" style="display: none;">
                <input type="radio" id="rad1" name="rad" checked="checked" /><label for="rad1">Palabra exacta</label>
                <input type="radio" id="rad2" name="rad" /><label for="rad2">Al inicio del campo</label>
                <input type="radio" id="rad3" name="rad" /><label for="rad3">Cualquier parte del campo</label>
            </div>
        </div>
        <div style="height: 80px; width: 410px; float: left; padding: 0px 20px;" >
            <table id="tablaFormulario" border="0">
                <tr id="filaPais">
                    <td>
                        <asp:Label ID="lblPais" runat="server" Text="País:"></asp:Label>
                    </td>
                    <td width="10">
                    </td>
                    <td>
                        <input id="txtPais" style="width: 300px;" maxlength="35" />
                    </td>
                </tr>
                <tr id="filaCiudad">
                    <td>
                        <asp:Label ID="lblCiudad" runat="server" Text="Ciudad:"></asp:Label>
                    </td>
                    <td width="10">
                    </td>
                    <td>
                        <input id="txtCiudad" style="width: 300px;" maxlength="35" />
                    </td>
                </tr>                
                <tr id="filaNumero" style="display:none;">
                    <td>
                        <asp:Label ID="Label3" runat="server" Text="Número:" style="width: 300px;"></asp:Label>
                    </td>
                        <td width="10">
                    </td>
                    <td>
                        <asp:TextBox ID="txtNumero" runat="server" style="width: 300px;" MaxLength="35" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                    </td>
                </tr>
                <tr id="filaRedPrivada" style="display:none;">
                    <td>
                        <asp:Label ID="lblRedPrivada" runat="server" Text="Red Privada:" style="width: 300px;"></asp:Label>
                    </td>
                        <td width="10">
                    </td>
                    <td>
                        <asp:TextBox ID="txtRedPrivada" runat="server" style="width: 300px; text-align:right;" MaxLength="35" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                    </td>
                </tr>
                <tr id="filaRazonSocial" style="display:none;">
                    <td>
                        <asp:Label ID="Label4" runat="server" Text="Nombre/Razón Social:" style="width: 300px;"></asp:Label>
                    </td>
                    <td width="10">
                    </td>
                    <td>
                        <asp:TextBox ID="txtRazonSocial" runat="server" Width="300px" MaxLength="35" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                    </td>
                </tr>
                <tr id="filaMonitorear" style="display:none;">
                    <td>
                        <asp:Label ID="Label5" runat="server" Text="Monitorear:"></asp:Label>
                    </td>
                    <td width="10">
                    </td>                       
                    <td>
                         <input id="chkMonitorear" type="checkbox" />
                    </td>
                </tr>
                <tr id="filaTipo" style="display:none;">
                    <td>
                        <asp:Label ID="Label6" runat="server" Text="Tipo:"></asp:Label>
                    </td>
                    <td width="10">
                    </td>                       
                    <td>
                         <asp:DropDownList ID="ddlTipo" runat="server" Width="249px">
                         </asp:DropDownList>
                    </td>
                </tr>
                <tr id="filaSubTipo" style="display:none;">
                    <td>
                        <asp:Label ID="Label7" runat="server" Text="Subtipo:" ></asp:Label>
                    </td>
                    <td width="10">
                    </td>                       
                    <td>
                         <asp:DropDownList ID="ddlSubtipo" runat="server" Width="249px">
                             <asp:ListItem Value="0">---Seleccione---</asp:ListItem>
                         </asp:DropDownList>
                    </td>
                </tr>
                <tr id="filaEmpresa" style="display:none;">
                    <td>
                        <asp:Label ID="Label8" runat="server" Text="Empresa:"></asp:Label>
                    </td>
                    <td width="10">
                    </td>                       
                    <td>
                         <%--<asp:DropDownList ID="ddlEmpresa" runat="server">
                             <asp:ListItem Value="0">---Seleccione---</asp:ListItem>
                         </asp:DropDownList>--%>
                         <input id="txtEmpresa" style="width: 300px;" maxlength="35" />
                    </td>
                </tr>
                <tr id="filaBotones" style="display:none;">
                    <td>
                        <div id="btnGuardar" style="width:100px;">
                            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                            Guardar
                        </div>
                        
                    </td>
                    <td width="10">
                    </td>                       
                    <td>
                        <div id="btnCancelar" style="width:100px;">
                            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                            Cerrar
                        </div> 
                    </td>
                </tr>
                <tr id="filaBuscar">
                    <td>
                        <asp:Label ID="lbldatoBusqueda" runat="server" text="Número:"/>
                    </td>
                    <td width="10">
                    </td>
                    <td>
                        <asp:TextBox ID="txtBuscar" runat="server" Width="300" MaxLength="35" 
                            onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                    </td>
                </tr>
                <tr id="filaBuscar2">
                    <td></td>
                    <td width="10">
                    </td>
                    <td align="right">
                        <div id="btnBuscar" style="margin: auto;">
                            <table border="0" cellpadding ="0" cellspacing ="0">
                                <tr>
                                    <td>    
                                        <img src="../../../../Common/Images/Mantenimiento/Busqueda.png" alt="" width="16px" />
                                    </td>
                                    <td>
                                        Buscar
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <%--</td></tr>
        <tr><td>--%>
        <div style="clear: both; height: 30px;" class="clear">
        </div>
        <div id="panelNumeros" >
            <table id="tbNumeros">
            </table>
        </div>
        <%--</td></tr></table>--%>
    </div>

        <div id="dialog-eliminar" style="display: none;" title="Eliminar Número">
        <p>
            <span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px 50px 0;">
            </span>Eliminar registro", "¡Atención!, se eliminarán de forma permanente los registros que se hayan seleccionado y estén desactivados ¿Desea continuar?<b style="font-size: 12pt"></b>
        </p>
    </div>
    </form>
</body>
</html>
