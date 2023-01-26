<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Consultar_Con_SeleccionCentroCosto" Codebehind="Con_SeleccionCentroCosto.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Con_SeleccionCentroCosto.js" type="text/javascript"></script>
</head>
<body style="overflow: hidden;">
    <form id="form1" runat="server">
        <div id="dvCargando" class="dvCargando"></div>
        <table>
            <tr>
                <td colspan="3">
                    <div id="dvAvanzada" class="dvPanel">
                        <table>
                            <tr>
                                <td>
                                    Ver: 
                                    <asp:DropDownList ID="ddlEstado" runat="server">
                                        <asp:ListItem Value="-1" Text="Todos"></asp:ListItem>
                                        <asp:ListItem Value="1" Text="Vigentes" Selected="True"></asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                                <td>
                                    <%--<asp:TextBox ID="txtBusqueda" runat="server" Width="250px" MaxLength="50"></asp:TextBox>--%>
                                    <input id="txtBusqueda" type="text" style="width: 250px;" maxlength="50" value="" />

                                </td>
                                <td>
                                    <div id="btnBuscar" class="btnNormal" runat="server">
                                        <asp:Image ID="imgBuscar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/lupa_16x16.png" />
                                        <a>Buscar</a>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="dvDatosSeleccion" style="width:100%; text-align:center; font-weight:bold;" runat="server">Centro de costos disponibles</div>
                    <asp:ListBox ID="lstResultado" runat="server" Height="340px" Width="260px" SelectionMode="Multiple"></asp:ListBox>
                </td>
                <td>
                    <div id="btnDerecha" class="btnNormal" runat="server" style="width:40px;">
                        <a>></a>
                    </div>
                    <div id="btnIzquierda" class="btnNormal" runat="server" style="width:40px;">
                        <a><</a>
                    </div>
                    <div id="btnDerechaTodo" class="btnNormal" runat="server" style="width:40px;">
                        <a>>></a>
                    </div>
                    <div id="btnIzquierdaTodo" class="btnNormal" runat="server" style="width:40px;">
                        <a><<</a>
                    </div>
                    <div id="btnAvanzada" class="btnNormal" runat="server" style="width:80px; display: none;">
                        <img src="../../Common/Images/Mantenimiento/Proceso.png" alt="BusquedaAvanzada" title="Opciones avanzadas"/>
                        <a>Especial</a>
                    </div>
                </td>
                <td>
                    <div style="width:100%; text-align:center; font-weight:bold;">
                        Datos seleccionados
                    </div>
                    <asp:ListBox ID="lstSeleccionados" runat="server" Height="340px" Width="260px" SelectionMode="Multiple"></asp:ListBox>
                </td>
            </tr>
            <tr><td colspan ="3"> </td></tr>
            <tr>
                <td colspan ="3">
                    <div id="btnCancelar" class="btnNormal" runat="server" style="float: right;">
                        <asp:Image ID="imgCancelar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                        <a>Cancelar</a>
                    </div>
                    <div id="btnAgregar" class="btnNormal" runat="server" style="float: right;">
                        <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                        <a>Aceptar</a>
                    </div>
                </td>
            </tr>
        </table>
        
                    
    </form>
</body>
</html>