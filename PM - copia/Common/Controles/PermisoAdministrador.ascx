<%@ Control Language="VB" AutoEventWireup="false" Inherits="PermisoAdministrador" Codebehind="PermisoAdministrador.ascx.vb" %>

<script type="text/javascript">
    $(function () {
        $("#txtPassword").focus();

        $("#btnAceptar").click(function () {

        });
        $("#btnCancelar").click(function () {

        });
    });
</script>

<table>
    <tr>
        <td>
            Usuario:
        </td>
        <td>
            <asp:Label ID="lblUsuario" runat="server" Text=""></asp:Label>
        </td>
    </tr>
    <tr>
        <td>
            Password:
        </td>
        <td>
            <asp:TextBox ID="txtPassword" runat="server"></asp:TextBox>
        </td>
    </tr>
</table>
<div>
    <div id="btnAceptar" class="btnNormal" style="width:100px;">
        <asp:Image ID="imgAceptar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
        <a>Aceptar</a>
    </div>
    <div id="btnCancelar" class="btnNormal" style="width:100px;">
        <asp:Image ID="imgCancelar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
        <a>Cancelar</a>
    </div>
</div>