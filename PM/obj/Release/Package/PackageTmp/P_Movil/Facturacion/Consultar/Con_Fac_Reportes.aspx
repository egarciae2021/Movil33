<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Con_Fac_Reportes.aspx.vb" Inherits=".Con_Fac_Reportes" %>
<%@ Register src="../../../Common/Controles/ExportarExcelGenerico.ascx" tagname="ExportarExcelGenerico" tagprefix="uc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />

    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>

    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <script src="Con_Fac_Reportes.js" type="text/javascript"></script>
    <style type="text/css">
        body
        {
            margin: 0px;
            padding: 0px;
            font: 10px "Trebuchet MS" , Verdana, Helvetica, sans-serif;
            color: #666;
        }
        div
        {
            font-size: 11px;
        }
        .pMedium
        {
            width: 800px;
            margin: 0px auto;
        }
        .pCommand
        {
            margin: 0px auto; 
            width: 780px; 
            padding: 10px; 
            background-image: none; 
            margin-top: 5px;
        }
        .pInformacion
        {
            margin-top: 5px;
            overflow: hidden;
            background: rgb(255,255,255);
            background: -moz-radial-gradient(center, ellipse cover,  rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
            background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,rgba(255,255,255,1)), color-stop(47%,rgba(246,246,246,1)), color-stop(100%,rgba(237,237,237,1)));
            background: -webkit-radial-gradient(center, ellipse cover,  rgba(255,255,255,1) 0%,rgba(246,246,246,1) 47%,rgba(237,237,237,1) 100%);
            background: -o-radial-gradient(center, ellipse cover,  rgba(255,255,255,1) 0%,rgba(246,246,246,1) 47%,rgba(237,237,237,1) 100%);
            background: -ms-radial-gradient(center, ellipse cover,  rgba(255,255,255,1) 0%,rgba(246,246,246,1) 47%,rgba(237,237,237,1) 100%);
            background: radial-gradient(ellipse at center,  rgba(255,255,255,1) 0%,rgba(246,246,246,1) 47%,rgba(237,237,237,1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ededed', endColorstr='#ededed',GradientType=1 );
            border-radius: 5px;
            box-shadow: 0px 0px 5px rgb(240,240,240);       
        }
        .cGenInfo
        {
            font-size: 13px;
            color: #003F59;
            padding: 5px 0px 12px 0px;
            font-weight: bold;
            text-align: center;
        }
        .tdLeft
        {
            color: #003F59; 
            vertical-align: middle;
            text-align: right;
            width: 250px;
            font-weight: bold;
        }
        .tdRight
        {
            vertical-align: middle; 
            padding-left: 5px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div id="1" class="pMedium pInformacion">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding-bottom:10px;">
            <tr>
                <td colspan="2" class="cGenInfo">
                    <asp:Label ID="lblTitulo" runat="server" Text="Reportes de facturación"></asp:Label>
                </td>
            </tr>
            <tr>
                <td class="tdLeft">
                    <asp:Label ID="Label1" runat="server" text="Reportes"/>&#58;
                </td>
                <td class="tdRight">
                    <asp:DropDownList ID="ddlReportes" runat="server" Width="200" style="padding:0px;">
                    </asp:DropDownList>
                </td>
            </tr>
        </table>
    </div>
    <div id="dvParametros" class="pMedium pInformacion" style="display:none;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding-bottom:10px;">
            <tr>
                <td colspan="2" class="cGenInfo">
                    <asp:Label ID="lblParametros" runat="server" Text="Parámetros para el reporte"></asp:Label>
                </td>
            </tr>
            <tr class="Param Param_REP0" style="display:none;">
                <td class="tdLeft">
                    <asp:Label ID="Label2" runat="server" Text="Periodo"></asp:Label>
                </td>
                <td class="tdRight">
                    <asp:TextBox ID="REP00_Periodo" runat="server" class="Periodo"></asp:TextBox>
                </td>
            </tr>
        </table>    
    </div>
    <div id="2" class="ui-widget-content ui-corner-all pCommand">
        <div id="bntGenerarReporte" class="k-button">
            Generar Reporte
        </div>
    </div>
    <uc1:ExportarExcelGenerico ID="eegReporte" runat="server" OcultarDiseno="true"/>
    </form>
</body>
</html>