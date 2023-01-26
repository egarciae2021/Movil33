<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Configuracion_HerramientasSistema_VisorEventos_LogErrores" CodeBehind="LogErrores.aspx.vb" %>

<%@ Register Src="../../../Common/Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcelGenerico" TagPrefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/aLiteral.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <style>
        .ui-jqgrid-bdiv {
            overflow-x: hidden !important;
        }
    </style>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("LogErrores.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
        <table border="0" align="center">
            <tr>
                <td></td>
            </tr>
            <tr>
                <td>
                    <table border="0" width="100%">
                        <tr>
                            <td width="60px" align="right">Tipo:
                            </td>
                            <td width="100px">
                                <select id="cboTipoLog">
                                    <option value="x">-Todos-</option>
                                    <option value="Error">Error</option>
                                    <option value="Auditoría">Auditoría</option>
                                    <option value="Advertencia">Advertencia</option>
                                    <option value="Información">Información</option>
                                    <option value="Debug">Debug</option>
                                </select>
                            </td>

                            <td align="right">Buscar:
                            </td>
                            <td width="360px">
                                <input type="text" id="txtValor" maxlength="50" style="width: 350px" />
                            </td>
                            <td>

                                <div id="btnBuscar" class="button" style="margin: auto;">
                                    <table border="0" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <img src="../../../Common/Images/Mantenimiento/Busqueda.png" alt="" width="16px" />
                                            </td>
                                            <td>Buscar
                                            </td>
                                        </tr>
                                    </table>
                                </div>

                            </td>
                            <td align="right">

                                <div id="btnBorrarLog" class="button" style="margin: auto;">
                                    <table border="0" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <img src="../../../Common/Images/Mantenimiento/delete_16x16.gif" alt="" width="16px" />
                                            </td>
                                            <td>&nbsp;Eliminar resultado
                                            </td>
                                        </tr>
                                    </table>
                                </div>

                            </td>

                            <td style="width: 40px; padding-left: 14px;" >
                                <uc1:ExportarExcelGenerico ID="eegLogErrores" runat="server" />
                            </td>

                        </tr>
                        <tr>
                            <td colspan ="7"> <hr /></td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table id="tbGrillaLog"></table>
                    <div id="pagerGrillaLog"></div>
                </td>
            </tr>
        </table>

        <div id="divDescripcion" style="display: none;">
            <table border="0" width="750px" align="center">
                <tr id="trNoEnviado" style="display: none; color: #9E0B0B">
                    <td>
                        <span id="lblDetalle" style="overflow-x: hidden; overflow-y: scroll"></span>
                    </td>
                </tr>
            </table>
        </div>

    </form>
</body>
</html>
