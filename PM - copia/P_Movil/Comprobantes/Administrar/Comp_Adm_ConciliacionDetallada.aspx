<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Comp_Adm_ConciliacionDetallada.aspx.vb" Inherits="Comp_Adm_ConciliacionDetallada" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
        <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
     
     <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>

    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <script src="Comp_Adm_ConciliacionDetallada.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField runat="server" ID="hdfNroComp"/>
        <asp:HiddenField runat="server" ID="hdfPeriodo"/>
        <asp:HiddenField runat="server" ID="hdfTipoProducto"/>
        <asp:HiddenField runat="server" ID="hdfTipoProceso"/>
        <asp:HiddenField runat="server" ID="hdfIdConciliado"/>
         <div id="toolbar" class="dvPanel ui-widget-content ui-corner-all pMedium" style="margin: 0px auto;
                                                      width: 480px; padding: 5px; background-image: none; margin-top: 5px;">
             <table id="Table1" runat="server" border="0">
                <tr>
                    <td style="color: #003F59; vertical-align: middle; padding-right: 5px;">
                        Empleado
                    </td>
                    <td>
                        <asp:Label runat="server" ID="lblEmpleado"></asp:Label>
                        <asp:HiddenField runat="server" ID="hdfCodEmpleado"/>
                    </td>
                </tr>
                <tr>
                    <td style="color: #003F59; vertical-align: middle; padding-right: 5px;">
                        N° Comprobante
                    </td>
                    <td>
                        <asp:Label runat="server" ID="lblComprobante"></asp:Label>
                    </td>
                </tr>
             </table>
             <br/>
             <table id="grid"></table>
             <div id="pager"></div>
         </div>
    </form>
</body>
</html>
