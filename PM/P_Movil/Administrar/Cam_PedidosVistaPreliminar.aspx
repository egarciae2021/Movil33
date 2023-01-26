<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Cam_PedidosVistaPreliminar" Codebehind="Cam_PedidosVistaPreliminar.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Cam_PedidosVistaPreliminar.js" type="text/javascript"></script>
    <style type="text/css">
        .dvCargando
        {
            background: url('../../Common/Images/Mantenimiento/Cargando.gif') no-repeat right center;
            width: 64px;
            height: 64px;
            top: 50%;
            left: 50%;
            z-index: 20;
            position: fixed;
            display: none;
        }
    </style>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <div id="dvCargandoInicial" style="position:fixed; left:50%; top:50%; padding:10px; z-index:1000; width:128px; height:70px; text-align:center;">
            <img alt="Cargando" src="../../Common/Images/Mantenimiento/Cargando.gif"/>
        </div>

        <asp:HiddenField runat="server" ID="hdfvcTab" />
        <asp:HiddenField runat="server" ID="hdfinIdCam" />
        <asp:HiddenField runat="server" ID="hdfvcNomSit" />
        <asp:HiddenField runat="server" ID="hdfvcFecIni" />
        <asp:HiddenField runat="server" ID="hdfvcFecFin" />
        <asp:HiddenField runat="server" ID="hdfvcCodEmp" />
        <asp:HiddenField runat="server" ID="hdfvcCodAre" />
        <asp:HiddenField runat="server" ID="hdfvcCodCCO" />
        <asp:HiddenField runat="server" ID="hdfvcCodCue" />
        <asp:HiddenField runat="server" ID="hdfvcIdEst" />
        <asp:HiddenField runat="server" ID="hdfvcTipDes" />
        <asp:HiddenField runat="server" ID="hdfvcCodPed" />


        <div class="ui-widget-content ui-corner-all" style="padding:0px; margin:0px; background-image:none; margin-top:5px; width:865px;">
                    <div id="btnPDF" class="btnNormal" runat="server" title="Descargar PDF" 
                        style="position: absolute;margin: 14px 0px 0px 93%;height: 22px;width: 24px;">
                        <asp:Image ID="imgPDF" runat="server" ImageUrl="~/Common/Images/Mantenimiento/pdf-miler.png" style="margin: -2px;"/>
                    </div>
            <iframe id="ifReporte" height="1230px" width="860px" frameborder="0"></iframe>
        </div>
        <div style="margin-top:10px; text-align:right;">
            <div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cerrar</a>
            </div>
        </div>
    </form>
</body>
</html>
