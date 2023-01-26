<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Adm_MantenimientoDinamico.aspx.vb" Inherits=".Adm_MantenimientoDinamico" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript" src="../../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jquery.uniform.min.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js"></script>
    <%--<script type="text/javascript" src="../../Common/Scripts/anytime.js"></script>--%>
    <script type="text/javascript" src="../../Common/Scripts/KendoUI/kendo.web.min.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/ajaxupload.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/Utilitario.js"></script>

    <script src="Adm_MantenimientoDinamico.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField runat="server" ID="hdfTabla" />
    <asp:HiddenField runat="server" ID="hdfIdRegistro" />
    <asp:HiddenField runat="server" ID="hdfIdUsuario" />
    <div id="dvCargando" class="dvCargando"></div>
    <div class="dvPanel" style="overflow:auto;">
        <table id="trMantenimiento" runat="server">
        </table>
    </div>
    <div id="dvAcciones" style="padding-top:5px;">
            <div id="btnGuardar" class="btnNormal">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
            <div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cerrar</a>
            </div>
        </div>
    </form>
</body>
</html>
