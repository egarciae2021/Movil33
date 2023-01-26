<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_ConfiguracionSolicitud" Codebehind="Adm_ConfiguracionSolicitud.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div id="dvCargando" class="dvCargando"></div>
        <div class="dvPanel">
            <table>
                <tr>
                    <td>Notificación:</td>
                    <td>
                        <asp:DropDownList ID="ddlNotificacion" runat="server" Width="200px"></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trEnviar" style="display:none;">
                    <td>Enviar:</td>
                    <td>
                        <asp:CheckBox ID="chkEnviar" runat="server"/>
                    </td>
                </tr>
            </table>
        </div>
        <br />
        <div id="dvDatos" class="dvPanel" style="display:none;">
            <div style="width:100%; text-align:Center;">
                <h2>Parametros</h2>
            </div>
            <table>
                <tr>
                    <td>Correo: </td>
                    <td>
                        <asp:TextBox ID="txtCorreo" runat="server" CssClass="txtNormal" Width="150px" MaxLength="50"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>Correo alternativo: </td>
                    <td>
                        <asp:TextBox ID="txtCorreoAlternativo" runat="server" CssClass="txtNormal" Width="150px" MaxLength="50"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>Asunto: </td>
                    <td>
                        <asp:TextBox ID="txtAsunto" runat="server" CssClass="txtNormal" Width="400px" MaxLength="100"></asp:TextBox>
                    </td>
                </tr>
            </table>
        </div>
        <br />
        <div id="btnGuardar" class="btnNormal" runat="server">
            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
            <a>Guardar</a>
        </div>
        <div id="btnCerrar" class="btnNormal">
            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
            <a>Salir</a>
        </div>
    </form>
</body>
</html>
