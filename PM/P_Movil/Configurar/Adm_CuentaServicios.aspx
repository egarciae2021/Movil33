<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Configurar_Adm_CuentaServicios" Codebehind="Adm_CuentaServicios.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Adm_CuentaServicios.js" type="text/javascript"></script>  
    <script type="text/javascript" src="Adm_CuentaServicios.js">
        if (!true && !true)//no borrar
            alerta("");
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfCuenta" runat="server"/>
        <asp:HiddenField ID="hdfSubCuenta" runat="server" />
        <asp:HiddenField ID="hdfEditable" runat="server" />
        <asp:HiddenField ID="hdfSelSubCue" runat="server" />
        <div class="ui-state-default ui-corner-all" style="padding:4px; margin-top:15px; margin-bottom:5px;">
            <span class="ui-icon ui-icon-folder-open" style="float:left; margin:-2px 5px 0 0;"></span>
            Detalle de la Cuenta
        </div>
        <div>
            <table id="tbCuentaServicio"></table>
        </div>
        <div id="dvTitSubCuenta" class="ui-state-default ui-corner-all" style="padding:4px; margin-top:10px; margin-bottom:5px;">
            <span class="ui-icon ui-icon-check" style="float:left; margin:-2px 5px 0 0;"></span>
            Selección de Sub-Cuenta a distribuir
        </div>
        <div id="dvDescSubCuenta">
            <label>
                Seleccione el servicio (Sub-Cuenta) que se verá afectado por la distribución. Solo podrá seleccionar entre los servicios de tipo "Llamada" cuya cantidad no sea "Ilimitado".
            </label>
        </div>
        <div id="dvSelSubCuenta" style="margin-top:8px;">
            Servicios Tipo Llamada: 
            <asp:DropDownList ID="ddlSubCuenta" runat="server" Width="150px">
                <asp:ListItem Value="-1" Text="Seleccione"></asp:ListItem>
            </asp:DropDownList>
        </div>
    </form>
</body>
</html>