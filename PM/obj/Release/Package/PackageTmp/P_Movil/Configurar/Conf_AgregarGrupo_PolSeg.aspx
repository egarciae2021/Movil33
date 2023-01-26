<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Configurar_Conf_AgregarGrupo_PolSeg" Codebehind="Conf_AgregarGrupo_PolSeg.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
	<script type="text/javascript" src="../../Common/Scripts/jquery-1.7.2.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.button.js"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.autocomplete.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfPolitica" runat="server" />
        <asp:HiddenField ID="hdfGrupo" runat="server" />
        <asp:HiddenField ID="hdfOpcion" runat="server" />
        <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
        <div id="dvCargando" class="dvCargando"></div>
        <div class="dvPanel" style="text-align:right; width:95%"> 
            <table>
                <tr>
                    <td>
                        Grupo Empleado:
                    </td>
                    <td align="left">
                        <asp:DropDownList ID="ddlGrupo" runat="server" Width="185px"></asp:DropDownList>
                        <b><asp:Label ID="lblGrupo" runat="server" Text=""></asp:Label></b>
                    </td>
                </tr>
                <tr id="trIlimitado" runat="server">
                    <td>
                        Ilimitado:
                    </td>
                    <td align="left">
                        <asp:CheckBox ID="chkIlimitado" runat="server"/>
                    </td>
                </tr>
                <tr id="trValor" runat="server">
                    <td>
                        <asp:Label ID="lblValor" runat="server" Text=""></asp:Label>
                    </td>
                    <td align="left">
                        <asp:TextBox ID="txtValor" runat="server" Width="60px" MaxLength="3"></asp:TextBox>
                    </td>
                </tr>
            </table>
        </div>
        <br />    
        <div style="text-align:right;">   
            <div id="btnGuardar" class="btnNormal" runat="server">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
            <div id="btnCancelar" class="btnNormal" runat="server">
                <asp:Image ID="imgCancelar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cancelar</a>
            </div>
        </div>
        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Conf_AgregarGrupo_PolSeg.js")%>" type="text/javascript"></script>
    </form>
</body>
</html>