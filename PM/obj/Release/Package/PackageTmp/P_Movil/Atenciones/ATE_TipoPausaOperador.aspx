<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="ATE_TipoPausaOperador.aspx.vb" Inherits=".ATE_TipoPausaOperador" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="ATE_TipoPausaOperador.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField id="hdfIdOperador" runat="server"/>
    <asp:HiddenField id="hdfIdEstado" runat="server"/>
    <asp:HiddenField id="hdfIdVentanilla" runat="server"/>
    <div>
        <table width="300px">
            <tr>
                <td style="width:70px;">Tipo de Pausa:</td>
                <td><asp:DropDownList ID="ddlTipoPausa" runat="server"></asp:DropDownList></td>
            </tr>
        </table>
        <div id="dvAcciones" style="margin-top:10px; text-align:left; text-align:right;">
            <div id="btnAceptar" class="btnNormal">                        
                <asp:Image ID="imgAgregarProducto" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Aceptar</a>
            </div>
            <div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cancelar</a>
            </div>
        </div>
    </div>
    </form>
</body>
</html>
