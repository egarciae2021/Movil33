<%@ Page Language="VB" AutoEventWireup="false"
    Inherits="General_Administrar_Mantenimiento_Mnt_CentroCosto" Codebehind="Mnt_CentroCosto.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Mnt_CentroCosto.js" type="text/javascript"></script>
    
    <style type="text/css">
        .ui-dialog
        {
            position:absolute !important;
            left: 35% !important;
            top: 35% !important;    
        }
    
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfParametros" runat="server" Value="" />
    <asp:HiddenField ID="hdfValores" runat="server" />
    <asp:HiddenField ID="hdfEstado" runat="server" />
    <asp:HiddenField ID="hdfEstadoCCO" runat="server" />
    <asp:HiddenField ID="hdfBorrarTabCorrecto" runat="server" />
    <div id="divMsgConfirmacion" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <asp:Label ID="lblMensajeConfirmacion" runat="server" Text=""></asp:Label>
    </div>
    <div id="dvCargando" class="dvCargando">
    </div>
    <div class="dvPanel" style="overflow: auto;">
        <table width="100%" >
            <tr>
                <td class="TituloMant">
                    Código
                </td>
                <td class="ValorMant">
                    <asp:TextBox ID="txtCodigo" runat="server" MaxLength="15" Width="150px"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="TituloMant">
                    Nombre
                </td>
                <td class="ValorMant">
                    <asp:TextBox ID="txtNombre" runat="server" MaxLength="35" Width="300px"></asp:TextBox>
                </td>
            </tr>
             <tr>
                <td class="TituloMant">
                    Correo Personal
                </td>
                <td class="ValorMant">
                    <asp:TextBox ID="txtMailPersonal" runat="server" MaxLength="250" Width="300px"></asp:TextBox>
                   <%-- <asp:RegularExpressionValidator ID="regexEmailValid" runat="server" ValidationExpression="\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" ControlToValidate="txtMailPersonal" ErrorMessage="Invalid Email Format"></asp:RegularExpressionValidator>--%>
                &nbsp;</td>
            </tr>
            <tr>
                <td class="TituloMant">
                    Correo Jefatura
                </td>
                <td class="ValorMant">
                    <asp:TextBox ID="txtMailJefe" runat="server" MaxLength="250" Width="300px"></asp:TextBox>
                &nbsp;</td>
            </tr>
            <tr id="trEstado" runat="server">
                <td class="TituloMant" id="tdEstado" style="display:none;">
                    Estado
                </td>
                <td class="ValorMant">
                    <asp:CheckBox Text="Activo" ID="chActivo" runat="server" MaxLength="50" Width="199px"
                        AutoPostBack="false" Visible="false"></asp:CheckBox>
                </td>
            </tr>
        </table>
    </div><br />
    <div style="margin-top: 2px;">
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
