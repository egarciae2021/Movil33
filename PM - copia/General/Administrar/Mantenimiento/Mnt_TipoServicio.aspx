<%@ Page Language="VB" AutoEventWireup="false" Inherits="General_Administrar_Mantenimiento_Mnt_TipoServicio"
    CodeBehind="Mnt_TipoServicio.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register Src="../../../Common/Controles/BusquedaPrincipal.ascx" TagName="BusquedaPrincipal"
    TagPrefix="uc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqueryui/jquery.ui.autocomplete.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.accordion.js"></script>
    <%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/jqGrid/ui.jqgrid.css" />
    <%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <script src="../../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.cookie.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Mnt_TipoServicio.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfTS" runat="server" />
    <asp:HiddenField ID="hdfCodigoTipoServicio" runat="server" />
    <div class="dvPanel" style="overflow: auto;">
        <table width="100%">
            <tr>
                <td>
                    <table width="100%">
                        <tr>
                            <td class="tdEtiqueta" style="width:130px;">Nombre</td>
                            <td>
                                <asp:TextBox ID="txtNombre" runat="server" Width="300px" MaxLength="100" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td class="tdEtiqueta" style="width:130px;">Expresado en</td>
                            <td>
                                <asp:TextBox ID="txtExp" runat="server" Width="50px" MaxLength="4" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                            </td>
                        </tr>
                        <tr id="trReporteExpEn" style="width:130px; display:none;">
                            <td class="tdEtiqueta">En reportes mostrar en</td>
                            <td>
                                <asp:DropDownList ID="ddlReporteExpEn" runat="server" Width="60px" MaxLength="4">
                                    <asp:ListItem Text="b" Value="B"></asp:ListItem>
                                    <asp:ListItem Text="Kb" Value="KB" Selected="True"></asp:ListItem>
                                    <asp:ListItem Text="Mb" Value="MB"></asp:ListItem>
                                    <asp:ListItem Text="Gb" Value="GB"></asp:ListItem>
                                    <asp:ListItem Text="Tb" Value="TB"></asp:ListItem>
                                </asp:DropDownList>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="tdEtiqueta">
                                <asp:CheckBox ID="chkMostrarDash" runat="server" Text="Mostrar en DashBoard" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    <div style="height: 10px">
    </div>
    <%--<div id="dvContAcordeon">
        <cc1:AccordionJQ ID="AccordionJQ1" runat="server" CssClass="accordion">
            <cc1:ContenedorAccodion ID="AcordionPaquete" Texto="Paquetes de Ampliación">
                <div id="dvMensajePaquete" runat="server" style="display: none;">
                    <asp:Label ID="lblMensajePaquete" runat="server" Text="Debe grabar el Tipo de Servicio antes de agregar los Paquetes de Ampliación"></asp:Label>
                </div>
                <table id="tbAgregarPaquete" runat="server" border="0">
                    <tr>
                        <td>
                            <div id="dvPaqueteCabecera" runat="server" class="dvPanel" style="height: 60px; margin-right: 5px;
                                margin-bottom: 5px;">
                                <table border="0" cellpadding="0" cellspacing="1">
                                    <tr>
                                        <td colspan="2" style="width: 150px;">
                                            Paquete <label id="lblPaqueteExpEn"></label>:
                                        </td>
                                        <td colspan="2" style="width: 150px;">
                                            <asp:TextBox ID="txtPaquete" runat="server" Width="75px" MaxLength="6"></asp:TextBox><asp:HiddenField
                                                ID="hdfIdPaquete" runat="server" />
                                        </td>
                                        <td rowspan="2">
                                            <table border="0">
                                                <tr>
                                                    <td>
                                                        <div id="btnAgregarPaquete" class="btnNormal" runat="server" title="Agregar">
                                                            <asp:Image ID="imgAgregarPaquete" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div id="btnEditarPaquete" class="btnNormal" runat="server" title="Agregar" style="display: none;">
                                                            <asp:Image ID="imgEditarPaquete" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div id="btnCancelarEditar" class="btnNormal" runat="server" title="Cancelar" style="display: none;">
                                                            <asp:Image ID="imgCancelarEditar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/btnCancel.png" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div id="btnEliminarPaquete" class="btnNormal" runat="server" title="Quitar" style="display: none;">
                                                            <asp:Image ID="imgEliminarPaquete" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            Monto <label id="lblPaqueteSimboloMonto"></label>:
                                        </td>
                                        <td colspan="2" style="width: 150px;">
                                            <asp:TextBox ID="txtMonto" runat="server" Width="75px" MaxLength="6"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table id="tbPaquetes">
                            </table>
                            <div id="tbPaquetesPager">
                            </div>
                        </td>
                    </tr>
                </table>
            </cc1:ContenedorAccodion>
        </cc1:AccordionJQ>
    </div>--%>
    <br />
    <div style="text-align: left;">
        <div id="btnGuardar" class="btnNormal">
            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
            <a>Guardar</a>
        </div>
        <div id="btnCerrar" class="btnNormal">
            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
            <a>Cerrar</a>
        </div>
    </div>
    </form>
</body>
</html>
