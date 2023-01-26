<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Mnt_SubServicioResumen.aspx.vb" Inherits="Mnt_SubServicioResumen" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script src="../../Administrar/../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script src="../../../Common/Scripts/jqueryui/jquery.ui.autocomplete.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Mnt_SubServicioResumen.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField runat="server" ID="hdfCodSubConceptoRes"/>
        <asp:HiddenField runat="server" ID="hdfCodConcepto"/>
        <div id="dvCargando" class="dvCargando"></div>
        <div class="dvPanel" style="overflow: auto;">
            <table>
                <tr>
                    <td class="TituloMant">
                        <asp:Label ID="Label2" runat="server">Código</asp:Label>
                    </td>
                    <td colspan="2">
                        <asp:TextBox ID="txtCodigo" runat="server" Width="150px" MaxLength="10"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label runat="server">Nombre Sub Concepto</asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtSubConceptoResumen" runat="server" Width="300px" MaxLength="40" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        Concepto Resumen
                    </td>
                    <td colspan="2">
                        <asp:TextBox ID="txtConceptoResumen" runat="server" Width="150px" MaxLength="35" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trEstado" runat="server">
                    <td class="tdEtiqueta">
                        Activo
                    </td>
                    <td colspan="2">
                        <asp:CheckBox ID="chkEstado" runat="server" />
                    </td>
                </tr>
            </table>
        </div>
        </br>
        <div style="margin-top:2px;">
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
        </div>
    </form>
</body>
</html>
