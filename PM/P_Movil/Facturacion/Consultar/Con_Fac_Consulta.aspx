<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Con_Fac_Consulta.aspx.vb" Inherits="Con_Fac_Consulta" %>

<%@ Register Src="~/Common/Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcelGenerico" TagPrefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>


    <%--<script src="../../../Common/Scripts/json2.js" type="text/javascript"></script>--%>
    <%--<script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>--%>
    <%--<script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>--%>
    <%--<link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />--%>
    <%--<link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />--%>
    <%--<script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>--%>
    <%--<script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>--%>
    <%--<script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>--%>
    <%--<script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>--%>
    <%--<script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>--%>


    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <%--<script src="../../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>--%>
    <script src="../../../Common/Scripts/jquery.contextmenu.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <%--kendo --%>
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-ES.min.js" type="text/javascript"></script>

    <link href="../../../Common/Scripts/select2/select2.min.css" rel="stylesheet" />
    <script src="../../../Common/Scripts/select2/select2.min.js" type="text/javascript"></script>

    <style type="text/css">
        #eegConsulta_imgBusqueda {
            height: 15px;
            margin-left: 0px;
            margin-top: -3px;
        }

        #eegConsulta_btnExportarExcel {
            width: 30px;
            height: 24px;
        }
    </style>
</head>
<body>

    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Con_Fac_Criterio.js")%>" type="text/javascript"></script>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Con_Fac_Consulta.js")%>" type="text/javascript"></script>

    <form id="form1" runat="server">
        <asp:HiddenField runat="server" ID="hdfPer" />
        <asp:HiddenField ID="hdfvcTab" runat="server" />
        <asp:HiddenField ID="hdfMesPer" runat="server" />

        <div id="dvCargando" class="dvCargando"></div>


        <div style="text-align: center;">
            <table border="0" width="100%">
                <tr style="text-align: right; display: none;">
                    <td style="display: none;">

                        <asp:TextBox ID="txtKey" runat="server"></asp:TextBox>
                    </td>
                    <td style="width: 40px;"></td>
                </tr>
                <tr>
                    <td colspan="2">                        
                        <div id="dvResultados" style="display:none;">
                            <div style="position: absolute; right: 36px; top: 11px; z-index: 9999999;">
                                <uc1:ExportarExcelGenerico ID="eegConsulta" runat="server" />
                            </div>
                            <table id="tbConsulta"></table>
                            <div id="Paginador"></div>
                        </div>
                        <div id="dvSinResultados" style="display:none;">
                            <span>No hay resultados</span>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

    </form>
</body>
</html>
