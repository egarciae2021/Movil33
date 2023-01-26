<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="MDM_Empleado.aspx.vb" Inherits=".MDM_Empleado" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register TagPrefix="eeg" TagName="ExportarExcelGenerico" Src="~/Common/Controles/ExportarExcelGenerico.ascx" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jquery.contextmenu.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid443/jquery.jqGrid.min.js" type="text/javascript"></script>
    <link href="../Common/Scripts/dynaTree/ui.dynatree.css" rel="stylesheet" type="text/css" id="skinSheet" />
    <%--<link href="../Content/css/shared/bootstrap.min.css" rel="stylesheet" />--%>
    <link href="../Content/css/shared/nifty.min.css" rel="stylesheet" />
    <link href="../Content/css/shared/font-awesome.min.css" rel="stylesheet" />
    <link href="../Content/css/shared/nifty-demo-icons.min.css" rel="stylesheet" />
    <script type="text/javascript" src="../Content/js/shared/jquery_1.7.2/bootstrap.min.js"></script>

    <script src="../Common/Scripts/dynaTree/jquery.dynatree-1.2.4.js" type="text/javascript"></script>

    <link href="../Common/Scripts/select2/select2.min.css" rel="stylesheet" />
    <script src="../Common/Scripts/select2/select2.min.js" type="text/javascript"></script>

</head>
<body>
    <form id="form1" runat="server">
        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("MDM_Empleado.js")%>" type="text/javascript"></script>
        <div class="dvPanel" id="dvEmpleado" style="display: none;">
            <table width="100%" border="0">
                <tr style="height: 25px;">
                    <td>
                        <div id="dvEmpl">
                            <table id="tbEmpleado"></table>
                            <div id="PaginadorEmpleado">
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="dvDispositivo" style="display:none; padding:0px; margin:0px;">
            <iframe id="ifDispositivo" frameborder="0" style="padding:0px; margin:0px;"></iframe>
        </div>
        <iframe id="ifExcel" frameborder="0" style="padding: 0px; margin: 0px; display: none;"></iframe>
        <div id="dvModal" style="display: none;">
            <iframe id="ifDetalle" runat="server" frameborder="0" style="padding: 0px; margin: 0px;" width="100%" height="100%"></iframe>
        </div> 
    </form>
</body>
</html>
