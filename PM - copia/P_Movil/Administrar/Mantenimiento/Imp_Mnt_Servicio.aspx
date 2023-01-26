<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Imp_Mnt_Servicio" Codebehind="Imp_Mnt_Servicio.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.tabs.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.dialog.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.button.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.position.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.draggable.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.resizable.js"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Imp_Mnt_Servicio.js" type="text/javascript"></script>
</head>
    <body>
        <form id="form1" runat="server">
            <asp:HiddenField ID="hdfCod" runat="server" />
            <div id="dvCargando" class="dvCargando"></div>
            <div class="dvPanel" style="overflow: auto;">
                <table>
                    <tr>
                        <td style="width: 150px;">Descripción: </td>
                        <td>
                            <asp:TextBox ID="txtDescripcion" runat="server" MaxLength="50" Width="300px"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 150px;">Tipo llamada: </td>
                        <td>
                            <asp:DropDownList ID="ddlTipoLlamada" runat="server" Width="249px"></asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 150px;">Servicio: </td>
                        <td>
                            <asp:DropDownList ID="ddlServicio" runat="server" Width="249px"></asp:DropDownList>
                        </td>
                    </tr>
                    <tr style="display: none;">
                        <td style="width: 150px;">Extraer ceros: </td>
                        <td>
                            <asp:CheckBox ID="chkExtraeCero" runat="server" />
                        </td>
                    </tr>
                    <tr >
                        <td style="width: 150px;">Notificar</td>
                        <td>
                            <asp:CheckBox ID="chkNotificar" runat="server" />
                        </td>
                    </tr>
                    <tr id="trEstado" runat="server">
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
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="../../../Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
            <div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="../../../Common/Images/Mantenimiento/Salir.gif" />
                <a>Cerrar</a>
            </div>
        </form>
    </body>
</html>
