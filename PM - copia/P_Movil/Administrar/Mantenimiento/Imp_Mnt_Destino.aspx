<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Imp_Mnt_Destino" Codebehind="Imp_Mnt_Destino.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.dialog.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.button.js"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Imp_Mnt_Destino.js" type="text/javascript"></script>
</head>
    <body>
        <form id="form1" runat="server">
            <asp:HiddenField ID="hdfDestino" runat="server" />
            <div id="dvCargando" class="dvCargando"></div>
            <div class="dvPanel">                    
                <table>
                    <tr style="width: 150px;">
                        <td style="width: 150px;">Texto en archivo: </td>
                        <td>
                            <asp:TextBox ID="txtTipoLlamada" runat="server" MaxLength="30" Width="300px"></asp:TextBox>
                        </td>
                    </tr>
                    <tr  style="width: 150px;">
                        <td style="width: 150px;">Global: </td>
                        <td>
                            <asp:DropDownList ID="ddlGlobalAsignado" runat="server" Width="249px"></asp:DropDownList>
                        </td>
                    </tr>
                    <tr id="trEstado" runat="server" style="width: 150px;">
                        <td class="tdEtiqueta" style="width: 150px;">
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
