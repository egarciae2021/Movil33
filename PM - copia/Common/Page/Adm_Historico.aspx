<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Adm_Historico.aspx.vb" Inherits=".Adm_Historico" %>

<%@ Register Src="../Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcel" TagPrefix="eeg" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
        <link  href="../Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
        <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
        <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
        <script src="../Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
        <script src="../Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
        <script src="../Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
        <script src="../Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
        <script src="../Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
        <script src="../Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
        <script src="../Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
        <script src="../Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
        <script src="../Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
        <script src="../Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
        <script src="../Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
        <script src="../Scripts/Utilitario.js" type="text/javascript"></script>
        <script src="../Scripts/Entidades/ENT_ENT_Campo.js" type="text/javascript"></script>

    <style type="text/css">
        .ui-jqgrid tr.jqgrow td {
            white-space: normal !important;
        }
    </style>

</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Adm_Historico.js")%>" type="text/javascript"></script>
    
    <form id="form1" runat="server">    
        
        <asp:HiddenField ID="hdfvcTab" runat="server" />
        <asp:HiddenField ID="hdfvcCodigo" runat="server" />        

        <table>
            <tr align="right">
                <td colspan ="2">
                    <div id="Exportar" style="width: 80px;" >
                        <eeg:ExportarExcel ID="eeListado" runat="server"/>
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <table id="grid">
                    </table>
                    <div id="pager">
                    </div>
                </td>
            </tr>
        </table>     

        <br />        
    </form>
</body>
</html>
