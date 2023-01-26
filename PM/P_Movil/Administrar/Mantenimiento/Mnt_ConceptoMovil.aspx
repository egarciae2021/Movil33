<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Mnt_ConceptoMovil" Codebehind="Mnt_ConceptoMovil.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
	<script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.dialog.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.button.js"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Mnt_ConceptoMovil.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfParametros" runat="server" Value=""/>
    <asp:HiddenField ID="hdfValores" runat="server" />
    <asp:HiddenField ID="hdfConceptoMovil" runat="server" />
    <div id="dvCargando" class="dvCargando"></div>
    <div class="dvPanel" style="overflow: auto;">
        <table>
            <tr>
                <td class="TituloMant">
                    Nombre
                </td>
                <td class="ValorMant">
                    <asp:TextBox ID="txtNombre" runat="server" Width="300px" MaxLength="100"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="TituloMant">
                    Monto
                </td>
                <td class="ValorMant">
                    <asp:TextBox ID="txtMonto" runat="server" Width="150px" MaxLength="11"></asp:TextBox>
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
    </div>
        <div style="margin-top:2px;">
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
