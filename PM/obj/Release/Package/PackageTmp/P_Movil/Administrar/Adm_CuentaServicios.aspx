<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_CuentaServicios" Codebehind="Adm_CuentaServicios.aspx.vb" %>

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
        <div>
            <table id="tbCuentaServicio"></table>     
        </div>
    </form>
</body>
</html>