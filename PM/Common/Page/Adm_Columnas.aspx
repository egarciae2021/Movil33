<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_Columnas" Codebehind="Adm_Columnas.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
    <head runat="server">
        <title></title>
        <link  href="../Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
        <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
        <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
        <script src="../Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
        <script src="../Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
        <script src="../Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
        <script src="../Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
        <script src="../Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
        <script src="../Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
        <script src="../Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
        <script src="../Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
        <script src="../Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
        <script src="../Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
        <script src="../Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
        <script src="../Scripts/Utilitario.js" type="text/javascript"></script>
        <script src="../Scripts/Entidades/ENT_ENT_Campo.js" type="text/javascript"></script>
        <script src="Adm_Columnas.js" type="text/javascript"></script>
    </head>
    <body style="overflow-y: hidden;">
        <form id="form1" runat="server">
            <asp:HiddenField ID="hdfvcTab" runat="server" Value=""/>
            <asp:HiddenField ID="hdfinTipOri" runat="server" />

            <table id="tbCampo"></table>
            <br />
            <div id="btnGuardar" class="btnNormal">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
            <div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cerrar</a>
            </div>
        </form>
    </body>
</html>