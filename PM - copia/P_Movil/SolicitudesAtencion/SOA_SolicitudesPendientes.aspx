<%@ Page Language="VB" AutoEventWireup="false"
    Inherits="P_Movil_SolicitudesAtencion_SOA_SolicitudesPendientes" Codebehind="SOA_SolicitudesPendientes.aspx.vb" %>

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

    <script src="SOA_SolicitudesPendientes.js" type="text/javascript"></script>
    <link href="SOA_SolicitudesPendientes.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfIdTecnico" runat="server" />
    <div id="global">

            <div style="width:99%;"> 
                <div class="boton" style="float:left; margin-bottom:15px;">Asignar solicitud</div>
            </div>
            <div style="clear:both;"></div>
            <table id="gridSolicitudesPendientes">
            </table>
            <div id="pagerSolicitudesPendientes">
            </div>

    </div>
    </form>
</body>
</html>
