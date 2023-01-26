<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Comp_Adm_EmisionComprobanteDetalle.aspx.vb"
    Inherits="Comp_Adm_EmisionComprobanteDetalle" %>

<%@ Register TagPrefix="cc1" Namespace="VisualSoft.Comun.LibreriaJQ" Assembly="VisualSoft.Comun.LibreriaJQ" %>
<%@ Register TagPrefix="eeg" TagName="ExportarExcelGenerico" Src="~/Common/Controles/ExportarExcelGenerico.ascx" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <%--   <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet"
        type="text/css" />--%>
    <%--    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet"
        type="text/css" />--%>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqueryui/jquery.ui.autocomplete.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <%--  <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet"
        type="text/css" />--%>
    <script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js"
        type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Comp_Adm_EmisionComprobanteDetalle.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Entidades/ENT_MOV_FAC_Comprobante.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Entidades/ENT_MOV_FAV_ComprobanteDetalle.js"
        type="text/javascript"></script>

     

</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField runat="server" ID="hdfCodEmpleado" />
    <asp:HiddenField runat="server" ID="hdfPagina" />
    <asp:HiddenField runat="server" ID="hdfNumLinea" />
    <asp:HiddenField runat="server" ID="hdfEstado" />
    <asp:HiddenField runat="server" ID="hdfTipoLinea" />
    <asp:HiddenField runat="server" ID="hdfTipoProducto" />
    <asp:HiddenField runat="server" ID="hdfCodOperador" />
    <asp:HiddenField runat="server" ID="hdfPeriodo" />
    <asp:HiddenField runat="server" ID="hdfTipoProceso" Value="-1" />
    <asp:HiddenField runat="server" ID="hdfConciliados" Value="-1" />
    <div id="dvCargando" class="dvCargando">
    </div>
    <div id="toolbar" class="dvPanel" style="background-image: none; margin-top: -8px;
        margin-left: -8px; margin-right: -8px;">
        <table id="table1" runat="server" border="0" width="100%">
            <tr>
                <td style="width: 1px;">
                </td>
                <td style="width: 60px; vertical-align: middle; padding-right: 5px; font-size: 11px;
                    font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;">
                    Empleado
                </td>
                <td style="width: 200px;">
                    <asp:TextBox ID="txtEmpleado" runat="server" Width="200px" MaxLength="30"></asp:TextBox>
                </td>
                <td style="width: 20px">
                </td>
                <td style="width: 60px; vertical-align: middle; padding-right: 5px; font-size: 11px;font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;">
                    Tipo Proceso
                </td>
                <td style="width: 70px;">
                    <asp:DropDownList ID="ddlTipoProceso" runat="server" Width="100px">
                        <asp:ListItem Value="-1" Text="<Todos>"></asp:ListItem>
                        <asp:ListItem Value="1" Text="Regular"></asp:ListItem>
                        <asp:ListItem Value="2" Text="No Regular"></asp:ListItem>
                    </asp:DropDownList>
                </td>
                <td style="width: 20px">
                </td>
                <td style="width: 80px; vertical-align: middle; padding-right: 5px; font-size: 11px;
                    font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;">
                    Tipo Documento
                </td>
                <td>
                    <asp:DropDownList ID="ddlTipoComp" runat="server" Width="160px">
                    </asp:DropDownList>
                </td>
                <td align="right">
                    <table>
                        <tr>
                            <td >
                                <div id="btnBuscar" style="width: 90px;" class="btnNormal">
                                    <asp:Image ID="imgGuardar" runat="server" Width="16" Height="16" ImageUrl="~/Common/Images/Mantenimiento/Filtro_16x16.png" />
                                    <a>Filtrar</a>
                                </div>
                            </td>
                            <td>
                                <div id="btnLimpiar" style="width: 90px;" class="btnNormal">
                                    <asp:Image ID="imgLimpiar" runat="server" Width="16" Height="16" ImageUrl="~/Common/Images/Mantenimiento/Borrar.png" />
                                    <a>Limpiar</a>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    <div id="dvGenerar" class="dvPanel" style="background-image: none; margin-top: 3px;
        margin-left: -8px; margin-right: -8px;">
        <table id="tb2" runat="server" width="100%" border="0" align="center" style="margin-top: -5px;">
            <tr>
                <td colspan="3" style="margin-right: 55px; text-align: left;">
                    <div id="dvNoGenerar" style="display: none; font-size: 10px; color: #CC0000;">
                        * Para generar los comprobantes debe tener el perfil asociado al proceso.
                    </div>
                </td>
                <td colspan="2" align="right">
                    <div id="dvSinLineas" style="display: none; color: #08088A;">
                        &nbsp;** [<asp:Label runat="server" ID="lblCantSinLineas" Font-Size="10px"
                            Font-Bold="True" ForeColor="#08088A"></asp:Label>] comprobantes Emitidos y/o No Emitidos que aún no tienen líneas asociadas.
                    </div>
                </td>
            </tr>
            <tr>
                <td style="width: 175px;">
                    <div id="btnGenerar" style="width: 175px; height: 30px;" class="btnNormal" title="Se van a generar los comprobantes que no se han emitido.">
                        <asp:Image ID="imgGenerar" runat="server" Style="width: 13px" ImageUrl="~/Common/Images/Mantenimiento/Generar16.png" />
                        <a>Generar Comprobante</a>
                    </div>
                </td>
                <td style="width: 50px; vertical-align: middle;">
                    <hr style="width: 1px; background-color: #A6C9E2; height: 30px; border: 0;">
                </td>
                <td style="width: 420px; vertical-align: middle; font-size: 11px; font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;">
                    <div>
                        Línea&nbsp;&nbsp;
                        <asp:TextBox ID="txtLinea" runat="server" Width="90px" MaxLength="10"></asp:TextBox>&nbsp;&nbsp;
                        Conciliados&nbsp;&nbsp;
                        <asp:DropDownList ID="dwConciliado" runat="server" Width="100px">
                            <asp:ListItem Text="<Todos>" Value="-1" Selected="True"></asp:ListItem>
                            <asp:ListItem Text="No Conciliado" Value="1"></asp:ListItem>
                            <asp:ListItem Text="Conciliado" Value="2"></asp:ListItem>
                            <asp:ListItem Text="No Aplica" Value="3"></asp:ListItem>
                        </asp:DropDownList>
                        &nbsp;&nbsp;
                        <div id="btnFiltro" style="margin-bottom: 0px; margin-right: 0px;" class="btnNormal"
                            title="Filtrar búsqueda de datos en la grilla">
                            <asp:Image ID="imgFiltro" runat="server" Style="width: 13px" ImageUrl="~/Common/Images/lup.png" />
                            <a></a>
                        </div>
                        <div id="btnBorrar" style="margin-bottom: 0px; margin-right: 0px;" class="btnNormal"
                            title="Limpiar la búsqueda en la grilla">
                            <asp:Image ID="Image1" runat="server" Style="width: 13px" ImageUrl="~/Common/Images/Mantenimiento/Borrar.png" />
                            <a></a>
                        </div>
                    </div>
                </td>
                <td style="width: 50px; vertical-align: middle;">
                    <hr style="width: 1px; background-color: #A6C9E2; height: 30px; border: 0;">
                </td>
                <td align="right">
                    <div id="btnExcel" title="Exportar a Excel" style="margin-bottom: 0px; margin-right: ">
                        <eeg:ExportarExcelGenerico ID="eegComprobantes" runat="server" />
                    </div>
                </td>
            </tr>
            <tr>
                <%--<td style="width: 5px;"></td>--%>
                <td colspan="5">
                    <%--<div style="margin-left:10px;">--%>
                    <table id="grid">
                    </table>
                    <div id="pager">
                    </div>
                    <%--</div>--%>
                </td>
            </tr>
            <tr>
                <td colspan="5">
                    <table width="100%">
                        <tr>
                            <td align="right">
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td id="td0" style="width: 15px; background-color: #FAD0B9;" class="ui-corner-all">
                                        </td>
                                        <td style="padding-right: 10px; padding-left: 3px;">
                                            Sin líneas asociadas
                                        </td>
                                        <td id="td1" style="width: 15px; background-color: #8FD9F1;" class="ui-corner-all">
                                        </td>
                                        <td style="padding-right: 10px; padding-left: 3px;">
                                            Fila(s) marcada(s)
                                        </td>
                                        <td id="td2" style="width: 15px; background-color: #ffffff;" class="ui-corner-all">
                                            <div style="height: 2px; background-color: #cd0a0a">
                                            </div>
                                        </td>
                                        <td style="padding-right: 10px; padding-left: 3px;">
                                            No conciliados
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>    
                </td>
            </tr>
        </table>
    </div>
<%--    <div style="background-image: none; margin-top: 7px; margin-left: -8px; margin-right: -8px;">

    </div>--%>
    <div id="divGenerar" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>¿Está seguro que
        desea generar los comprobantes seleccionados?
    </div>
    <div id="dvVisPre" class="ui-widget-content ui-corner-all" style="padding: 0px; margin: 0px;
        background-image: none; display: none; margin-top: 5px;">
        <iframe id="ifReporte" height="720px" width="860px" frameborder="0"></iframe>
    </div>
    </form>
</body>
</html>