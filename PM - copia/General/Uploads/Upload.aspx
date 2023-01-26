<%@ Page Language="VB" AutoEventWireup="false" Inherits="Upload" Codebehind="Upload.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Upload</title>
    <%--<script src="resources/jquery-1.4.1.js" type="text/javascript"></script>--%>
    <script src="resources/ajaxupload.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="../../Common/Styles/jqGrid/ui.jqgrid.css" />
    
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>

<%--    <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/grid.base.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/grid.common.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/grid.formedit.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/jquery.fmatter.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/JsonXml.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/jqDnR.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/jqModal.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/grid.jqueryui.js"></script>--%>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="Upload.css" rel="stylesheet" type="text/css" />
    <script src="Upload.js" type="text/javascript"></script>

</head>
<body>

<%--class="UploadDiv" --%>
    <table>
        <tr>
            <td>
                <table id="tblAdjuntos"></table>
            </td>
            <td valign="top" >
                <table id="btnAcciones" border="0" cellpadding="0" cellspacing ="1">
                    <tr>
                        <td>
                            <div id ="btnUpload"  class="btnNormal" align="center" title="Adjuntar">
                                <div id="UploadButton" align="center">
                                    <img alt="" src="resources/add.png" width="16px"/>
                                </div>
                                <div id="UploadedFile">
                                </div>
                            </div>
                            <div id="UploadStatus">
                            </div>
                        </td>
                    </tr>


                    <tr>
                        <td>
                            <div id="btnQuitar" title="Quitar" class="btnNormal">
                                <img alt="" src="../../Common/Images/Mantenimiento/delete_16x16.gif" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="btnDescargar" title="Descargar" class="btnNormal">
                                <img alt="" src="resources/download.png" />
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
