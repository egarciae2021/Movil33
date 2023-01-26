<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Mnt_Modulo" Codebehind="Mnt_Modulo.aspx.vb" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
    <head runat="server">
        <title></title>	    
        <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
        <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
        <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
        <script src="Mnt_Modulo.js" type="text/javascript"></script>
</head>
    <body>
        <form id="form1" runat="server">
            <asp:HiddenField ID="hdfModulo" runat="server" />
            <div class="dvPanel">
                <table width="100%">
                    <tr>
                        <td>
                            <table>
                                <tr>
                                    <td class="tdEtiqueta">
                                        Producto:
                                    </td>
                                    <td>
                                        <asp:DropDownList ID="ddlProducto" runat="server"></asp:DropDownList>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdEtiqueta">
                                        Nombre Modulo:
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtNombreModulo" runat="server" MaxLength="50" Width="350px"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Orden
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtOrden" runat="server" MaxLength="2" Width="38px"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        URL</td>
                                    <td>
                                        <asp:TextBox ID="txtUrl" runat="server" MaxLength="250" Width="599px"></asp:TextBox>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="tdEtiqueta">
                                        Tipo Origen:
                                    </td>
                                    <td>
                                        <asp:DropDownList ID="ddlTipoOrigen" runat="server"></asp:DropDownList>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="tdEtiqueta">
                                        Nombre Tabla:
                                    </td>
                                    <td>
                                        <asp:DropDownList ID="ddlTabla" runat="server"></asp:DropDownList>
                                        <asp:TextBox ID="txtTabla" runat="server" MaxLength="250" Width="100px"></asp:TextBox>
                                    </td>
                                </tr>

                                <tr id="trEstado" runat="server">
                                    <td class="tdEtiqueta">
                                        Activo
                                    </td>
                                    <td>
                                        <asp:CheckBox ID="chkEstado" runat="server" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td align="right" valign="bottom">
                            <div id="btnAgregarOpcion" class="btnNormal">
                                <asp:Image ID="imgAgregarOpcion" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"/>
                                <a>Agregar Opcion</a>
                            </div>                        
                        </td>
                    </tr>
                </table>
            </div>
            <br />
            <cc1:TabJQ ID="tbDetalle" runat="server" CssClass="tabs" style="margin: 0px; padding: 0px;"></cc1:TabJQ>
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