<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Comp_Adm_DetalleAnulacion.aspx.vb" Inherits=".Comp_Adm_DetalleAnulacion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>

    <script src="Comp_Adm_DetalleAnulacion.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <table>
            <tr style="font-size:11px;">
                <td style="width:80px;"><b>Empleado</b></td>
                <td><asp:Label ID="lblEmpleado" runat="server"></asp:Label></td>
            </tr>
            <tr style="font-size:11px;">
                <td><b>Tipo Motivo</b></td>
                <td><asp:Label ID="lblTipoMotivo" runat="server"></asp:Label></td>
            </tr>
            <tr style="font-size:11px;">
                <td><b>Motivo</b></td>
                <td><asp:Label ID="lblMotivo" runat="server"></asp:Label></td>
            </tr>
            <tr style="font-size:11px;">
                <td><b>Línea</b></td>
                <td><asp:Label ID="lblLinea" runat="server"></asp:Label></td>
            </tr>
            <tr style="font-size:11px;">
                <td><b>Periodo</b></td>
                <td><asp:Label ID="lblPeriodo" runat="server"></asp:Label></td>
            </tr>
            <tr style="font-size:11px;">
                <td><b>Monto</b></td>
                <td><asp:Label ID="lblMonto" runat="server"></asp:Label></td>
            </tr>
            <tr style="height:5px;"><td colspan="2"></td></tr>
            <tr>
                <td colspan="2">
                    <table id="grid"></table>
                    <div id="pager"></div>    
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
