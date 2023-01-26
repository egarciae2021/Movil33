<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Comp_Adm_EmisionComprobante.aspx.vb" Inherits="Comp_Adm_EmisionComprobante" %>
<%@ Register TagPrefix="eeg" TagName="ExportarExcelGenerico" Src="~/Common/Controles/ExportarExcelGenerico.ascx" %>
<%@ Register TagPrefix="cc1" Namespace="VisualSoft.Comun.LibreriaJQ" Assembly="VisualSoft.Comun.LibreriaJQ" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
<link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />

    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js" type="text/javascript"></script>
        <script src="../../../Common/Scripts/Entidades/ENT_MOV_FAC_Comprobante.js" type="text/javascript"></script>
    <script src="Comp_Adm_EmisionComprobante.js" type="text/javascript"></script>

</head>
<body>
    <form id="form1" runat="server">
        <div id="dvCargando" class="dvCargando">
        </div>
        <cc1:TabJQ runat="server" ID="TabDetalle" CssClass="tabs" style="margin-top:1px; overflow: auto;">
            <cc1:ContenedorTabJQ Titulo="Generar Comprobante">
                <table width="100%">
                    <tr class="trToolBar" align="center">
                        <td>
                            <div id="toolbar" class="dvPanel" style="margin:0px !important; padding:0px !important;">
                                <table id="Table1" runat="server" border="0" width="100%">
                                    <tr>
                                        <td style="width: 5px;"></td>
                                        <td style="width:100px;vertical-align: middle; padding-right: 5px;  font-size: 11px;font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;">
                                             Periodo
                                        </td>
                                        <td style="width:300px;">
                                            <asp:TextBox ID="txtPeriodo" runat="server" Width="160px" MaxLength="10" class="bordeui" ></asp:TextBox>
                                            <asp:HiddenField runat="server" ID="hdfPeriodo"/>     
                                        </td>
                                        <td style="width: 30px"></td>
                                        <td style="vertical-align: middle; padding-right: 5px; width: 120px;  font-size: 11px;font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;">
                                            Estado
                                        </td>
                                        <td>
                                            <asp:DropDownList id="dwEstado" runat="server" Width="120px">
                                                <%--<asp:ListItem Value="1" Text="Conforme"></asp:ListItem>
                                                <asp:ListItem Value="0" Text="No Conforme"></asp:ListItem>--%>
                                            </asp:DropDownList>
                                            <asp:HiddenField runat="server" ID="hdfEstado" Value="-1" />
                                        </td>
                    
                                        <td rowspan="2" valign="bottom" align="right">
                                            <div style="float:right;">
                                                <div id="btnBuscar" style="width: 95px;" class="btnNormal">
                                                    <asp:Image ID="imgGuardar" runat="server" width="16" height="16" ImageUrl="~/Common/Images/lup.png" />
                                                    <a>Buscar</a>
                                                </div>
                                                <div id="btnLimpiar" style="width: 95px;" class="btnNormal">
                                                    <asp:Image ID="imgLimpiar" runat="server" width="16" height="16" ImageUrl="~/Common/Images/Mantenimiento/Borrar.png" />
                                                    <a>Limpiar</a>
                                                </div>
                                            </div>
                                        </td>
                                        <td style="width: 5px;"></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 5px;"></td>
                                        <td style="vertical-align: middle; padding-right: 5px; font-size: 11px;font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;">
                                            Operador
                                        </td>
                                        <td style="width :80px;">
                                            <asp:DropDownList id="dwOperador" runat="server" Width="160px"></asp:DropDownList>
                                            <asp:HiddenField runat="server" ID="hdfOperador" Value="-1" />
                                        </td>
                                        <td></td>
                                        <td style="vertical-align: middle; padding-right: 5px;  font-size: 11px;font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;">
                                            Tipo Motivo
                                        </td>
                                        <td>
                                            <asp:DropDownList id="dwTipoProducto" runat="server" Width="120px"></asp:DropDownList>
                                            <asp:HiddenField runat="server" ID="hdfTipoProducto" Value="-1" />
                                        </td>
                                        <td style="width: 5px;"></td>
                                    </tr>
                                </table>
                            </div>    
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="dvGenerar" class="dvPanel" style="margin:0px !important; padding:0px !important;">
                                <table id="tb2" runat="server" border="0" align="center">
                                    <tr>
                                        <td style="width: 200px;">
                                            <div id="btnGenerar" style="width: 175px; height: 30px; margin-bottom: -3px;" class="btnNormal" >
                                                <asp:Image ID="imgGenerar" runat="server" Style="width: 13px" ImageUrl="~/Common/Images/Mantenimiento/Generar16.png" />
                                                <a>Generar Comprobante</a>
                                            </div>
                                        </td>
                                        <td>
                                            <div id="dvNoGenerar" style="display: none; font-size: 10px; color:#CC0000;">
                                                * Para generar los comprobantes debe tener el perfil asociado al proceso.
                                            </div>
                                        </td>
                                        <td align="right" style="width: 50px;">
                                            <div id="btnExportar" style="display: none; margin-bottom: -10px" runat="server" title="Exportar a Excel">
                                                <asp:Image ID="imgExportar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png" width="16px" height="16px" />
                                            </div>
                                        </td>
                            
                                    </tr>
                                    <tr>
                                        <td align="center" colspan="3">
                                            <div style="margin: 0px auto;" align="center">
                                                <table id="grid"></table>
                                                <div id="pager"></div>
                                            </div>    
                                        </td>
                                    </tr>
                                </table>
                            </div>    
                        </td>
                    </tr>
                </table>

            </cc1:ContenedorTabJQ>

        </cc1:TabJQ>

                
        <div id="divGenerar" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            ¿Está seguro que desea generar los comprobantes del periodo seleccionado?
        </div>

        <iframe id="ifExcel" frameborder="0" style="padding:0px; margin:0px; display:none;"></iframe>
    </form>
</body>
</html>
