<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Cam_DespachoEmpleadoGeneral.aspx.vb" Inherits=".Cam_DespachoEmpleadoGeneral" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.custom.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.filter.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.grouping.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.import.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.inlinedit.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.subgrid.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.tbltogrid.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.treegrid.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.celledit.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Cam_DespachoEmpleadoGeneral.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
        <div>


            <div id="tops" style="float: left; clear: both; border: 0px dotted gray; text-align: center;">
                <ul>
                    <li><a id="tabTob-0" href="#tob-0">Despachar</a></li>
                    <li><a id="tabTob-1" href="#tob-1">Consulta</a></li>
                </ul>
                <div id="tob-0" style="width: 450px; height: 300px;">
                    <iframe id="ifDespachar"  frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
                </div>
                <div id="tob-1" style="width: 450px; height: 300px;">
                    <iframe id="ifConsultar" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
                </div>
            </div>


        </div>
    </form>
</body>
</html>
