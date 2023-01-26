<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Mnt_SEG_Temporizador.aspx.vb" Inherits=".Mnt_SEG_Temporizador" %>

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

    <script src="Mnt_SEG_Temporizador.js" type="text/javascript"></script>

    <style type="text/css">
    
    .paddingDerecha
    {
        padding-right:10px;    
    }
    
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfIdTemporizador" runat="server" />
    <div class="dvPanel">

        <table>
            <tr>
                <td class="paddingDerecha">Nombre</td>
                <td>
                    <asp:TextBox ID="txtNombre" runat="server" Width="250" MaxLength="200"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="paddingDerecha">Tiempo</td>
                <td>
                    <asp:TextBox ID="txtTiempo" runat="server" MaxLength="3" style="text-align:right;"></asp:TextBox>(Minutos)
                </td>
            </tr>
            <tr>
                <td class="paddingDerecha">Reiniciar</td>
                <td>
                    <asp:CheckBox ID="chkReiniciar" runat="server" />
                </td>
            </tr>
            <tr class="EsActivar">
                <td class="paddingDerecha">Activar</td>
                <td>
                    <asp:CheckBox ID="chkActivar" runat="server" />
                </td>
            </tr>
        </table>
        
    
    </div>

    <div style="text-align:left; padding-top: 12px">
        <div id="btnGuardar" class="btnNormal">
            <asp:Image ID="imgGuardarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
            <a>Guardar</a>
        </div>
        <div id="btnCerrar" class="btnNormal">
            <asp:Image ID="imgCerrarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
            <a>Cerrar</a>
        </div>
    </div> 


    </form>
</body>
</html>
