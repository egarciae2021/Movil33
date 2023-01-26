<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Con_Fac_Resumen.aspx.vb" Inherits="Con_Fac_Resumen" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register TagPrefix="eeg" TagName="ExportarExcelGenerico" Src="~/Common/Controles/ExportarExcelGenerico.ascx" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <%-- <script src="../../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>--%>
    <script src="../../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <%-- <script src="../../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>--%>
    <script src="../../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.contextmenu.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid443/jquery.jqGrid.min.js" type="text/javascript"></script>
    <link href="../../../Common/Scripts/dynaTree/ui.dynatree.css" rel="stylesheet" type="text/css" id="skinSheet" />
    <script src="../../../Common/Scripts/dynaTree/jquery.dynatree-1.2.4.js" type="text/javascript"></script>
    <style type="text/css">
    </style>

    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-ES.min.js" type="text/javascript"></script>

    <link href="../../../Common/Scripts/select2/select2.min.css" rel="stylesheet" />
    <script src="../../../Common/Scripts/select2/select2.min.js" type="text/javascript"></script>

</head>
<body>

    <form id="form1" runat="server">

        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Con_Fac_Criterio.js")%>" type="text/javascript"></script>
        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Con_Fac_Resumen.js")%>" type="text/javascript"></script>

        <asp:HiddenField ID="hdfvcTab" runat="server" />
        <asp:HiddenField runat="server" ID="hdfPer" />
        <asp:HiddenField runat="server" ID="hdfCodCue" />
        <asp:HiddenField runat="server" ID="hdfCodOpe" />
        <%--        <cc1:TabJQ ID="tabOpciones" runat="server" CssClass="tabs" Style="margin: 0px; padding: 0px;width:930px;" >
            <cc1:ContenedorTabJQ ID="tabDetalle" Titulo="Resumen" CssClass="dvTabContenido" Height="100%">--%>
        <div class="dvPanel" style="text-align: center;">
            <table border="0" cellpadding="0" cellspacing="0">
                <tr id="filaTitulos">
                    <td style="vertical-align: middle; width: 100px; text-align: right;">Periodo: &nbsp;
                    </td>
                    <td style="text-align: left">
                        <asp:DropDownList runat="server" ID="ddlPeriodo" Width="150px" />
                    </td>
                    <td style="vertical-align: middle; width: 100px; text-align: right;">Operador: &nbsp;
                    </td>
                    <td style="text-align: left">
                        <%--<asp:DropDownList runat="server" ID="ddlOperador" Width="180px" />--%>
                        <asp:DropDownList ID="ddlOperador" Width="180px" runat="server" CssClass="ddlNormal" ToolTip="Seleccione el operador">
                        </asp:DropDownList>
                    </td>
                    <td style="vertical-align: middle; width: 60px; text-align: right;">Cuenta: &nbsp;
                    </td>
                    <td style="text-align: left">
                        <asp:TextBox ID="txtCuenta" runat="server" Style="text-align: right;" Width="90px"></asp:TextBox>
                    </td>
                    <td style="vertical-align: middle; width: 60px; text-align: right;">Línea: &nbsp;
                    </td>
                    <td style="text-align: left">
                        <asp:TextBox ID="txtLinea" runat="server" Style="text-align: right;" Width="90px"></asp:TextBox>
                    </td>
                    <td align="center" style="width: 50px;">
                        <div id="btnBuscar">
                            <asp:Image ID="Image1" runat="server" Style="width: 14px" ImageUrl="~/Common/Images/lup.png" />
                        </div>
                    </td>

                    <td style="text-align: right; width: 170px;">
                        <div id="btnExportarResumenFacturacion" runat="server" title="Exportar a Excel" class="btnNormal">
                            <asp:ImageButton ID="btnResumenFacturacion" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png" Width="16px" Height="16px"/>
                            <span>Resumen Facturación</span>
                        </div>
                    </td>

                </tr>
            </table>
        </div>
        <br />
        <div class="dvPanel" id="dvResumen" style="display: none;">
            <table width="100%" border="0">
                <tr style="height: 25px;">
                    <td>
                        <div id="dvGrupoCuenta">
                            <table id="tbCuenta"></table>
                            <div id="PaginadorCuenta">
                            </div>
                        </div>
                        <br />
                    </td>
                </tr>
                <%--<tr>
                            <td>
                                <div id="col"></div>
                            </td>
                        </tr>--%>
                <tr>
                    <td>
                        <div id="dvGrupoLinea" style="display: none; height: 300px;">
                            <table id="tbLinea"></table>
                            <div id="pagLinea"></div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="dvLista" style="display: none;">
            <div id="dvTreeConceptos"></div>
        </div>
        <%--<div id="dvExporta2" class="dvPanel" style="text-align: center; height: 30px; display: block">
                    <table align="center">
                        <tr>
                            <td style="horiz-align: center">
                                <div valign="top" style="font-size:13px; text-align: center;">
                                    Exportar 
                                </div> 
                            </td>
                            <td>
                                <uc1:ExportarExcelGenerico ID="eegResumen" runat="server" />
                            </td>
                            <td style="display:none;">
                        
                                <asp:TextBox ID="txtKey" runat="server"></asp:TextBox>
                            </td>
                        </tr>
                    </table>
                </div>--%>
        <%--            </cc1:ContenedorTabJQ>

        </cc1:TabJQ>--%>
        <iframe id="ifExcel" frameborder="0" style="padding: 0px; margin: 0px; display: none;"></iframe>
        <div id="dvModal" style="display: none;">
            <iframe id="ifDetalle" runat="server" frameborder="0" style="padding: 0px; margin: 0px;" width="100%" height="100%"></iframe>
        </div>
    </form>
</body>
</html>
