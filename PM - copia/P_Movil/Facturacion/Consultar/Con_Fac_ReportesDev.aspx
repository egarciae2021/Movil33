<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Con_Fac_ReportesDev.aspx.vb" Inherits="Con_Fac_ReportesDev" %>
<%--Inherits=".Con_Fac_ReportesDev" --%>
<%@ Register Src="../../../Common/Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcelGenerico" TagPrefix="uc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />

    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>

    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js" type="text/javascript"></script>

    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>


    <link href="../../../Common/Scripts/select2/select2.min.css" rel="stylesheet" />
    <script src="../../../Common/Scripts/select2/select2.min.js" type="text/javascript"></script>

    <style type="text/css">
        body {
            margin: 0px;
            padding: 0px;
            font: 10px "Trebuchet MS", Verdana, Helvetica, sans-serif;
            color: #666;
        }

        div {
            font-size: 11px;
        }

        .pMedium {
            width: 850px;
            margin: 0px auto;
        }

        .pCommand {
            margin: 0px auto;
            width: 780px;
            padding: 10px;
            background-image: none;
            margin-top: 5px;
        }

        .pInformacion {
            margin-top: 15px;
            overflow: hidden;
            background: rgb(255,255,255);
            background: -moz-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
            background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,rgba(255,255,255,1)), color-stop(47%,rgba(246,246,246,1)), color-stop(100%,rgba(237,237,237,1)));
            background: -webkit-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 0%,rgba(246,246,246,1) 47%,rgba(237,237,237,1) 100%);
            background: -o-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 0%,rgba(246,246,246,1) 47%,rgba(237,237,237,1) 100%);
            background: -ms-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 0%,rgba(246,246,246,1) 47%,rgba(237,237,237,1) 100%);
            background: radial-gradient(ellipse at center, rgba(255,255,255,1) 0%,rgba(246,246,246,1) 47%,rgba(237,237,237,1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ededed', endColorstr='#ededed',GradientType=1 );
            border-radius: 5px;
            box-shadow: 0px 0px 5px rgb(240,240,240);
        }

        .cGenInfo {
            font-size: 13px;
            color: #003F59;
            padding: 5px 0px 12px 0px;
            font-weight: bold;
            text-align: center;
        }

        .tdLeft {
            color: #003F59;
            vertical-align: middle;
            text-align: right;
            width: 250px;
            font-weight: bold;
        }

        .tdRight {
            vertical-align: middle;
            padding-left: 5px;
        }

        .select2-dropdown {
            margin-top: 0px !important;
            margin-left: 0px !important;
        }

        .select2-result-repository__title {
            font-weight: bold;
            font-size: 12px;
        }

        .select2-result-repository__description {
            font-size: 10px;
        }
    </style>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Con_Fac_ReportesDev.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfMostrarOpcConsumo" runat="server" />
        <div id="1" class="pMedium pInformacion">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding-bottom: 10px;">
                <tr>
                    <td colspan="5" class="cGenInfo">
                        <asp:Label ID="lblTitulo" runat="server" Text="Reportes de Facturación"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td class="tdLeft" style="width: 70px;">Reporte:&nbsp;
                    </td>
                    <td colspan="4" class="tdRight">
                        <asp:DropDownList ID="ddlReportes" runat="server" Width="750" Style="padding: 0px;">
                        </asp:DropDownList>
                    </td>
                </tr>
                <tr style="height: 5px;">
                </tr>
                <tr>
                    <td></td>
                    <td colspan="4" class="tdRight">
                        <table cellpadding="0" cellspacing="0">
                            <tr id="FiltroExceso" style="display: none;">
                                <td>Mayor igual a:&nbsp;
                                </td>
                                <td>
                                    <select id="Porcentaje" style="width: 60px;"></select>
                                    (%)
                                </td>
                            </tr>
                            <tr id="FiltroLineasSinConsumo" style="display: none;">
                                <td>Tipo:&nbsp;
                                </td>
                                <td>
                                    <select id="TipoServicio" style="width: 160px;"></select>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr style="height: 5px;"></tr>
                <tr>
                    <td class="tdLeft" style="width: 70px;">Periodo:&nbsp;
                    </td>
                    <td class="tdRight" style="width: 140px;">
                        <asp:TextBox ID="REP00_Periodo" runat="server" class="Periodo"></asp:TextBox>
                    </td>
                    <td></td>
                    <td style="width: 110px;">
                        <div id="bntGenerarReporte" class="k-button">
                            Generar Reporte
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="dvParametros" class="pMedium pInformacion" style="display: none;">

            <iframe id="ifReporteFormato" frameborder="0" style="margin: 0px; padding: 0px; display: none;" width="100%" height="470px"></iframe>

        </div>

        <%--<div id="2" class="ui-widget-content ui-corner-all pCommand">
        </div>
        <uc1:ExportarExcelGenerico ID="eegReporte" runat="server" OcultarDiseno="true" />--%>
    </form>
</body>
</html>
