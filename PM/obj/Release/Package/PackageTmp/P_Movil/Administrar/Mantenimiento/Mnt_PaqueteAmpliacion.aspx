<%@ Page Language="vb" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Mnt_PaqueteAmpliacion" CodeBehind="Mnt_PaqueteAmpliacion.aspx.vb"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <%--<link href="../../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />--%>

    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Mnt_PaqueteAmpliacion.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField runat="server" ID="hdfCodigoPaqAmp" />
    <asp:HiddenField runat="server" ID="hdfCodServicio" />
    <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
    <div class="dvPanel" style="overflow: auto;">
        <table>
            <tr id="trCodigo" runat="server">
                <td style="width:120px;">
                    Código Paquete
                </td>
                <td>
                    <asp:TextBox ID="txtCodigoPaquete" runat="server" Width="100" CssClass="INT"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    Nombre Paquete
                </td>
                <td>
                    <asp:TextBox ID="txtNombrePaquete" runat="server" Width="200" CssClass="VARCHAR"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    Operador
                </td>
                <td>
                    <asp:DropDownList ID="ddlOperador" runat="server" Width="210"></asp:DropDownList>
                </td>
            </tr>
            <tr>
                <td>
                    Tipo Servicio
                </td>
                <td>
                    <asp:DropDownList ID="ddlTipoServicio" runat="server" Width="210"></asp:DropDownList>
                </td>
            </tr>
            <tr>
                <td>
                    Servicio
                </td>
                <td>
                    <asp:DropDownList ID="ddlServicio" runat="server" Width="210"></asp:DropDownList>
                </td>
            </tr>
            <tr>
                <td>
                    Cantidad&nbsp;(<asp:Label ID="lblExpEn" runat="server"></asp:Label>)
                </td>
                <td>
                    <asp:TextBox ID="txtCantidad" runat="server" Width="200" CssClass="INT"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    Monto&nbsp;(<asp:Label ID="lblSimboloMoneda" runat="server"></asp:Label>)
                </td>
                <td>
                    <asp:TextBox ID="txtMonto" runat="server" Width="200" CssClass="DECIMAL"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td rowspan="2">
                    Grupos Empleados
                </td>
                <td>
                    <asp:DropDownList ID="ddlGrupoOrigen" runat="server" Width="210"></asp:DropDownList>
                    <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"
                        CssClass="imgBtn" ToolTip="Agregar rol" />
                    <asp:Image ID="imgQuitar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif"
                        CssClass="imgBtn" ToolTip="Quitar rol" />
                </td>
            </tr>
            <tr>
                <td>
                    <asp:ListBox ID="lstGrupOrig" runat="server" Rows="10" Width="210"></asp:ListBox>
                </td>
            </tr>
            <tr id="trActivo" runat="server" style="display:none;">
                <td>
                    Activo
                </td>
                <td>
                    <asp:CheckBox ID="chkActivo" runat="server" />
                </td>
            </tr>
        </table>
    </div>
    <div style="text-align: left; margin-top:8px;">
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
