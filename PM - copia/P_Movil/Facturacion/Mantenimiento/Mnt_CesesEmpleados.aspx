<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Facturacion_Mantenimiento_Mnt_CesesEmpleados"
    CodeBehind="Mnt_CesesEmpleados.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register Src="../../../Common/Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcelGenerico"
    TagPrefix="eeg" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/knockout.validation.min.js"
        type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Mnt_CesesEmpleados.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfvcTab" runat="server" />
    <asp:HiddenField ID="hdfRutaContrato" runat="server" />
    <asp:HiddenField ID="hdfinTipOri" runat="server" />
    <asp:HiddenField ID="hdfImpManual" runat="server" />    
    <cc1:TabJQ runat="server" ID="TabDetalle" CssClass="tabs" Style="margin-top: 1px;">
        <cc1:ContenedorTabJQ Titulo="Detalle">
            <table width="100%">
                <tr class="trToolBar" align="center">
                    <td align="center">
                        <div id="toolbar" class="ui-widget-content" style="">
                            <table border="0" width="100%">
                                <tr>
                                    <td>
                                    </td>
                                    <td style="width: 80px; padding-right: 20px;">
                                        <table id="tblAcciones" runat="server" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <div id="btnAgregar" class="btnNormal" runat="server" title="Nuevo">
                                                        <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div id="btnVerDetalle" class="btnNormal" runat="server" title="Ver Detalle">
                                                        <asp:Image ID="imgEliminar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/verdetalle.png" />
                                                    </div>
                                                </td>
                                                <%--<td>
                                                    <div id="btnEliminar" class="btnNormal" runat="server" title="Eliminar Seleccionados"
                                                        click="EliminarRegistro">
                                                        <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" />
                                                    </div>
                                                </td>--%>
                                                <td>
                                                    <div id="btnImportar" class="btnNormal" runat="server" title="Importar Cese" style="display:none;">
                                                        <asp:Image ID="imgEditar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/import.png" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div id="btnExcel">
                                                        <table id="tbExportar" cellpadding="0" cellspacing="0">
                                                            <tr>
                                                                <td>
                                                                    <eeg:ExportarExcelGenerico ID="eegSolicitudes" runat="server" />
                                                                    <%--<div id="btnExportar" class="btnNormal" runat="server" title="Exportar">
                                                            <asp:Image ID="imgExportar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png" />
                                                        </div>  --%>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td style="width: 50px; padding-right: 10px;">
                                    </td>
                                    <td>
                                        <table border="0">
                                            <tr>
                                                <td style="width: 80px; height: 32px">
                                                    <asp:Label ID="lblFiltro" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
                                                </td>
                                                <td rowspan="2" valign="middle" style="width: 250px;">
                                                    Filtro:&nbsp;
                                                    <select id="ddlFiltro" class="ui-widget-content ui-corner-all" style="width: 150px;
                                                        margin-left: 15px; font-weight: normal; padding: 4px;" name="ddlBusqueda">
                                                        <option value="EMPL_P_vcCODEMP">Cod. Empleado</option>
                                                        <option value="EMPL_vcNOMEMP">Nombre Empleado</option>
                                                    </select>
                                                    <%--                                                    <asp:DropDownList ID="ddlCampana" runat="server" Width="170px">
                                                    </asp:DropDownList>--%>
                                                </td>
                                                <td rowspan="2" valign="middle" style="width: 400px">
                                                    Valor:&nbsp;
                                                    <%--                                                    <asp:DropDownList ID="ddlOperador" runat="server" Width="170px">
                                                    </asp:DropDownList>--%>
                                                    <input id="txtValor" class="ui-widget-content ui-corner-all" type="text" style="width: 250px;
                                                        margin-left: 15px; font-weight: normal; padding: 4px; text-align: left;" maxlength="200"
                                                        placeholder="Valor a filtrar" name="txtValor" />
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td>
                                        <table border="0">
                                            <tr>
                                                <td>
                                                    <asp:Label ID="lblFiltroFec" runat="server" Text="Filtro Fec. Creación" CssClass="lblToolBAR"></asp:Label>
                                                </td>
                                                <td>Ini.</td>
                                                <td>
                                                    <asp:TextBox ID="txtFecIni" runat="server" Width="70" ReadOnly="true"></asp:TextBox>
                                                </td>
                                                <td>
                                                    <img src="../../../Common/Images/Mantenimiento/Borrar.png" id="btnLimpiarFecIni" alt="Limpiar fecha inicio" class="imgBtn" />
                                                </td>
                                                <td>&nbsp;-&nbsp;</td>
                                                <td>Fin.</td>
                                                <td>
                                                    <asp:TextBox ID="txtFecFin" runat="server" Width="70" ReadOnly="true"></asp:TextBox>
                                                </td>
                                                <td>
                                                    <img src="../../../Common/Images/Mantenimiento/Borrar.png" id="btnLimpiarFechaFin" alt="Limpiar fecha fin" class="imgBtn" />
                                                </td>
                                            </tr>
                                        </table>                                    
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table id="grid">
                        </table>
                        <div id="pager">
                        </div>
                    </td>
                </tr>
            </table>
        </cc1:ContenedorTabJQ>
    </cc1:TabJQ>
    <div style="margin-top: 5px;">
    </div>
    <div id="dvEnvio" style="display: none;">
        <iframe id="ifEnvio" frameborder="0" style="padding: 0px; margin: 0px; height: 260px;
            width: 500px;"></iframe>
    </div>
    <div id="dvDetalle" style="display: none;">
        <iframe id="ifDetalle" frameborder="0" style="padding: 0px; margin: 0px; height: 240px;
            width: 430px;"></iframe>
    </div>
    </form>
</body>
</html>
