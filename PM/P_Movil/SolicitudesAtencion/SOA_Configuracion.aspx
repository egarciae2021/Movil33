<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_SolicitudesAtencion_SOA_Configuracion" Codebehind="SOA_Configuracion.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfAdmin" runat="server" />
        <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
        <asp:HiddenField ID="hdfEmpleado" runat="server" />
        <asp:HiddenField ID="hdfIdTecnico" runat="server" />

        <div class="dvPanel">
            <table>
                <tr>
                    <td>Dias de criticidad</td>
                    <td>                        
                        <asp:TextBox ID="txtCriticidad" runat="server"></asp:TextBox>
                    </td>
                </tr>            
            </table>
        </div>
        <div style="text-align:left; padding-top: 12px">
            <div id="btnGuardarServicio" class="btnNormal">
                <asp:Image ID="imgGuardarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                <a>Guardar</a>
            </div>
            <div id="btnCerrarServicio" class="btnNormal">
                <asp:Image ID="imgCerrarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                <a>Cerrar</a>
            </div>
        </div> 
    </form>
</body>
</html>
