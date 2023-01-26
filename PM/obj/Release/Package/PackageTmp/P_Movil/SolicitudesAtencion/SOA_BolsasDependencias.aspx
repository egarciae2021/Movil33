<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_SolicitudesAtencion_SOA_BolsasDependencias" Codebehind="SOA_BolsasDependencias.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <link href="../../Common/Scripts/dynaTree/ui.dynatree.css" rel="stylesheet" type="text/css"id="skinSheet"/>
    <script src="../../Common/Scripts/dynaTree/jquery.dynatree-1.2.4.js" type="text/javascript"></script>

    <script src="SOA_BolsasDependencias.js" type="text/javascript"></script>
    <style type="text/css">
    ul{border-width:0px !important;}   
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfAdmin" runat="server" />
        <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
        <asp:HiddenField ID="hdfEmpleado" runat="server" />
        <asp:HiddenField ID="hdfIdTecnico" runat="server" />
    <div id="global">
    <%--<div style="width:99%; text-align:center; font-weight:bold; font-size:10pt; margin-bottom:20px;">Dependencias de bolsas</div>--%>
    
        <div id="treeBolsas"></div>

    </div>
    </form>
</body>
</html>
