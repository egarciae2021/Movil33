<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Imp_Mnt_Ruta" Codebehind="Imp_Mnt_Ruta.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.dialog.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.button.js"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Imp_Mnt_Ruta.js" type="text/javascript"></script>
</head>
    <body>
        <form id="form1" runat="server">
            <asp:HiddenField ID="hdfCod" runat="server" />
            <asp:HiddenField ID="hdfCodOperador" runat="server" />
            <div id="dvCargando" class="dvCargando"></div>
            <div class="dvPanel">
                <table>
                    <tr>
                        <td>Operador: </td>
                        <td>
                            <asp:DropDownList ID="ddlOperador" runat="server" Width="249px" AutoPostBack="True"></asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td>Plantilla: </td>
                        <td>
                            <asp:DropDownList ID="ddlPlantilla" runat="server" Width="249px"></asp:DropDownList>
                        </td>
                    </tr>
                    <tr style="display: none;">
                        <td>Zona: </td>
                        <td>
                            <asp:DropDownList ID="ddlZona" runat="server" Width="249px"></asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td>Longitud Min.: </td>
                        <td>
                            <asp:TextBox ID="txtLongitudMinimo" runat="server" MaxLength="2" Width="50px"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>Longitud Max.: </td>
                        <td>
                            <asp:TextBox ID="txtLongitudMaximo" runat="server" MaxLength="2" Width="50px"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>Prefijo: </td>
                        <td>
                            <asp:TextBox ID="txtPrefijo" runat="server" MaxLength="20" Width="150px"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>Reemplazar prefijo: </td>
                        <td>
                            <asp:TextBox ID="txtReemplazarPrefijo" runat="server" MaxLength="20" Width="150px"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>Tipo: </td>
                        <td>
                            <asp:DropDownList ID="ddlTipoNumero" runat="server" Width="249px"></asp:DropDownList>
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
            <br />
            <div id="btnGuardar" class="btnNormal" runat="server">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
            <div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cerrar</a>
            </div>
        </form>
    </body>
</html>