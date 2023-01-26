<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="DetalleFacturacion.aspx.vb" Inherits=".DetalleFacturacion" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
</head>
<body>
    <link href="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("DetalleFacturacion.css")%>" type="text/css" rel="Stylesheet" />
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfGenerico" runat="server" Value="" />
        <table style="width: 100%;">
            <tr class="FilaNumero">
                <td class="CabeceraDato">Número:</td>
                <td class="CabeceraValor"><span id="lblNumero"></span></td>
                <td class="CabeceraDato">Cuenta:</td>
                <td class="CabeceraValor"><span id="lblCuenta"></span></td>
            </tr>
            <tr class="FilaNumero">
                <td class="CabeceraDato">Empleado:</td>
                <td class="CabeceraValor"><span id="lblEmpleado"></span></td>
                <td class="CabeceraDato">Área:</td>
                <td class="CabeceraValor"><span id="lblArea"></span></td>
            </tr>
            <tr class="FilaCuenta">
                <td class="CabeceraDato">Cuenta:</td>
                <td class="CabeceraValor" colspan="3"><span id="lblCuenta2"></span></td>
            </tr>
            <tr style="height: 5px;"></tr>
            <tr>
                <td colspan="4">
                    <table id="grid_DetalleFyC">
                    </table>
                    <div id="pager">
                    </div>
                </td>
            </tr>
        </table>
        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("DetalleFacturacion.js")%>" type="text/javascript"></script>
    </form>
</body>
</html>
