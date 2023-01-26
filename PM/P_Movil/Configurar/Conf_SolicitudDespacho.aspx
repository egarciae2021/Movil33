<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Configurar_Conf_SolicitudDespacho" Codebehind="Conf_SolicitudDespacho.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>     
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Entidades/ENT_MOV_Parametros.js" type="text/javascript"></script>
    <script src="Conf_SolicitudDespacho.js" type="text/javascript"></script>
    <script>

    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="dvCargando" class="dvCargando"></div>
    <div id="dvCampo" class="dvPanel" style="overflow:auto;">
        <table width="440px" border="0" id="tbCostoReposicion" runat="server"> 
            <tr>
                <td>
                    <asp:Label ID="label1" runat="server" Text="Texto Entrega"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtTextoEntrega" runat="server" Width="350px" MaxLength="800"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="label2" runat="server" Text="Cuerpo Mensaje"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtCuerpoMensaje" runat="server" Width="350px" Height="300px" MaxLength="8000" TextMode="MultiLine"></asp:TextBox>
                </td>
            </tr>
            <tr style="padding-top:20px;">
                <td colspan="2">
                <br />
                <div style="text-align:left;">            
                    <div id="btnGuardar" class="btnNormal">
                        <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                        <a>Guardar</a>
                    </div>
                    <div id="btnCerrar" class="btnNormal">
                        <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                        <a>Cancelar</a>
                    </div>
                </div>
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
