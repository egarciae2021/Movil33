<%@ Page Language="VB" AutoEventWireup="false" Inherits="General_Administrar_Mantenimiento_Numeros_Mnt_Exceptos" Codebehind="Mnt_Exceptos.aspx.vb" %>

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
    <script src="Mnt_Exceptos.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfCod" runat="server" />
    <div id="dvCargando" class="dvCargando">
    </div>
    <div class="dvPanel" id="panelBuscarNumero" style="display: none; overflow: auto;">
        <div id="btnVolverMant" style="position: absolute; top: 30px; right: 15px;">
            Volver
        </div>
        <div class="dvPanel" style="float: left; margin-left: 10px;" id="panelBusqueda">
            <asp:Label ID="Label1" runat="server" Text="Tipos de busqueda:"></asp:Label>
            <div id="radio">
                <input type="radio" id="radio1" name="radio" checked="checked" /><label for="radio1">Por
                    número</label>
                <input type="radio" id="radio2" name="radio" /><label for="radio2">Por Razón Social</label>
            </div>
            <div id="rad" style="display: none;">
                <input type="radio" id="rad1" name="rad" checked="checked" /><label for="rad1">Palabra
                    exacta</label>
                <input type="radio" id="rad2" name="rad" /><label for="rad2">Al inicio del campo</label>
                <input type="radio" id="rad3" name="rad" /><label for="rad3">Cualquier parte del campo</label>
            </div>
        </div>
        <div style="height: 80px; width: 410px; float: left; padding: 0px 20px;">
            <table id="tablaFormulario">
                <tr id="filaPais">
                    <td>
                        <asp:Label ID="lblPais" runat="server" Text="Pais:"></asp:Label>
                    </td>
                    <td width="10">
                    </td>
                    <td>
                        <input id="txtPais" style="width: 250px;" />
                    </td>
                </tr>
                <tr id="filaCiudad">
                    <td>
                        <asp:Label ID="lblCiudad" runat="server" Text="Ciudad:"></asp:Label>
                    </td>
                    <td width="10">
                    </td>
                    <td>
                        <input id="txtCiudad" style="width: 250px;" />
                    </td>
                </tr>
                <tr id="filaBuscar">
                    <td>
                        <asp:Label ID="lbldatoBusqueda" runat="server" text="Número:"/>
                    </td>
                    <td width="10">
                    </td>
                    <td>
                        <asp:TextBox ID="txtBuscar" runat="server" Width="250" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td align="right">
                        <div id="btnBuscar" style="margin: auto;">
                        <table border="0" cellpadding ="0" cellspacing ="0">
                            <tr>
                                <td>    
                                    <img src="../../../../Common/Images/Mantenimiento/Busqueda.png" alt="" width="16px" />
                                </td>
                                <td>
                                    Buscar Número
                                </td>
                            </tr>
                        </table>
                    </div>
                    </td>
                </tr>
            </table>
        </div>
        <div style="clear: both; height: 30px;" class="clear">
        </div>
    </div>
    <br />
    <div id="panelNumeros" style="display: none;" >
        <table id="tbNumeros">
        </table>
    </div>
    <div class="dvPanel" id="panelMant" style="overflow: auto;">
        <table>
            <tr valign="bottom">
                <td>
                    <asp:Label ID="lblNumero" runat="server" Text="Número:"></asp:Label>
                </td>
                <td width="10">
                </td>
                <td valign="bottom">
                    <asp:TextBox ID="txtNumero" runat="server" Width="100" Enabled="False"  ></asp:TextBox>
                    <asp:TextBox ID="txtDscNumero" runat="server" Width="238" Enabled="False" ></asp:TextBox>
                    <div id="btnBuscarNumero" style="margin: auto;">
                        <table border="0" cellpadding ="0" cellspacing ="0">
                            <tr>
                                <td>    
                                    <img src="../../../../Common/Images/Mantenimiento/Busqueda.png" alt="" width="16px" />
                                </td>
                                <td>
                                    Buscar Número
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblPaisMant" runat="server" Text="País:"></asp:Label>
                </td>
                <td width="10">
                </td>
                <td>
                    <asp:TextBox ID="txtPaisMant" runat="server" Width="350px" Enabled="False"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblCiudadMant" runat="server" Text="Ciudad:"></asp:Label>
                </td>
                <td width="10">
                </td>
                <td>
                    <asp:TextBox ID="txtCiudadMant" runat="server" Width="350px" Enabled="False"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblTipoOriginal" runat="server" Text="Tipo Original:"></asp:Label>
                </td>
                <td width="10">
                </td>
                <td>
                    <asp:TextBox ID="txtTipoOriginal" runat="server" Width="350px" Enabled="False"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblSubtipoOriginal" runat="server" Text="Subtipo Original:"></asp:Label>
                </td>
                <td width="10">
                </td>
                <td>
                    <asp:TextBox ID="txtSubtipoOriginal" runat="server" Width="350px" Enabled="False"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblEmpleado" runat="server" Text="Empleado:"></asp:Label>
                </td>
                <td width="10">
                </td>
                <td>
                    <asp:TextBox ID="txtEmpleado" runat="server" style="width: 350px;" />
                    <asp:Label ID="lblMsjAutocomplete" runat="server" Text="Ingrese por lo menos 3 letras" ForeColor="Gray"></asp:Label>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblTipo" runat="server" Text="Tipo:"></asp:Label>
                </td>
                <td width="10">
                </td>
                <td> 
                    <asp:DropDownList ID="ddlTipo" runat="server" style="width: 249px;">
                    </asp:DropDownList>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblSubtipo" runat="server" Text="Subtipo:"></asp:Label>
                </td>
                <td width="10">
                </td>
                <td>
                    <asp:DropDownList ID="ddlSubtipo" runat="server" style="width: 249px;">
                        <asp:ListItem Value="0">---Seleccione---</asp:ListItem>
                    </asp:DropDownList>
                </td>
            </tr>
            <tr id="trEstado" runat="server" style="display:none;">
                <td class="TituloMant" id="tdEstado">
                    Estado
                </td>
                <td width="10">
                </td>
                <td class="ValorMant">
                    <asp:CheckBox Text="Activo" ID="chActivo" runat="server" MaxLength="50" Width="199px" AutoPostBack="false"></asp:CheckBox>
                </td>
            </tr>
        </table>
    </div>
    <br />
    <div id="panelBotonoes" style="text-align:left;">
        <table>
            <tr>
                <td align="center" style="width:100px;">
                    <div id="btnGuardar" style="margin: auto;">
                        <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                        Guardar
                    </div>
                </td>
                <td align="center" style="width:100px;">
                    <div id="btnCerrar" style="margin: auto;">
                        <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                        Cerrar
                    </div>
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
