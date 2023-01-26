<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Consultar_Con_SumarioGrafico" Codebehind="Con_SumarioGrafico.aspx.vb" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="vs" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
 
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/FusionCharts/FusionCharts.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/FusionCharts/FusionCharts.jqueryplugin.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Con_SumarioGrafico.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server" >
        <div id="dvCargando" class="dvCargando"></div>
        <asp:HiddenField ID="hdfTipoSumario" runat="server" />
        <asp:HiddenField ID="hdfValorSumario" runat="server" />
        <div id ="Grafico_Sumario"></div>
    </form>
</body>
</html>