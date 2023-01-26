<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Comp_Adm_CobrosDevoluciones.aspx.vb" Inherits="Comp_Adm_CobrosDevoluciones" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ Register src="../../../Common/Controles/ExportarExcelGenerico.ascx" tagname="ExportarExcelGenerico" tagprefix="uc1" %>

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
    <script src="Comp_Adm_CobrosDevoluciones.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField runat="server" ID="hdfIdEmpleado"/>
    <asp:HiddenField runat="server" ID="hdfCodPedidoSolicitud"/>
    <asp:HiddenField runat="server" ID="hdfNumLinea"/>
    <asp:HiddenField runat="server" ID="hdfBuscaEmpleado"/>
    <asp:HiddenField runat="server" ID="hdfPagina"/>
    <div>
    
        <div id="divFiltros" class="dvPanel ui-widget-content ui-corner-all pMedium" style="margin: 0px auto; padding: 5px; background-image: none; margin-top: 0px;">
            <table id="tb1" runat="server" border="0" align="center" width="100%">
                <tr runat="server" id="trEmp">
                    <td style="width:10px;"></td>
                    <td style="width:100px;vertical-align: middle; padding-right: 5px;  font-size: 11px;font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;">Empleado</td>
                    <td style="width:100px;">
                        <asp:TextBox ID="txtEmpleado" runat="server" Width="250px"></asp:TextBox>
                    </td>
                    <td style="width:30px"></td>
                    <td style="vertical-align: middle; padding-right: 5px; width: 180px;  font-size: 11px;font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;">Código de Pedido / Solicitud</td>
                    <td>
                        <asp:TextBox ID="txtCodPedidoSolicitud" runat="server" Width="120px"></asp:TextBox>
                    </td>
                    <td></td>
                    <td style="width:10px"></td>
                </tr>
                <tr>
                    <td></td>
                    <td style="vertical-align: middle; padding-right: 5px;  font-size: 11px;font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;">Tipo de línea</td>
                    <td>
                        <asp:DropDownList id="ddlTipoLinea" runat="server" Width="130px" Enabled="false">
                            <asp:ListItem Value="2" Text="Familia" Selected="True"></asp:ListItem>
                        </asp:DropDownList>                    
                    </td>
                    <td></td>
                    <td style="vertical-align: middle; padding-right: 5px;  font-size: 11px;font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;">Línea</td>
                    <td>
                        <asp:TextBox ID="txtLinea" runat="server" Width="120px" MaxLength="20" ></asp:TextBox>
                    </td>
                    <td rowspan="2" valign="bottom" align="right">
                        <div id="btnBuscar" class="btnNormal" runat="server" style="width: 95px;">
                            <asp:Image ID="imgBuscar" runat="server" width="16" height="16" ImageUrl="~/Common/Images/lup.png" />
                            <a>Buscar</a>
                        </div>
                        <div id="btnLimpiar" class="btnNormal" runat="server" style="width: 95px;">
                            <asp:Image ID="imgLimpiar" runat="server" width="16" height="16" ImageUrl="~/Common/Images/Mantenimiento/Borrar.png" />
                            <a>Limpiar</a>
                        </div>
                    </td>
                    <td style="width:10px"></td>
                </tr>
                <tr>
                    <td></td>
                    <td style="vertical-align: middle; padding-right: 5px; font-size: 11px;font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;">Ver registros</td>
                    <td>
                        <asp:DropDownList id="ddlVerRegistros" runat="server" Width="130px">
                            <asp:ListItem Value="-1" Text="<<Todos>>"></asp:ListItem>
                            <asp:ListItem Value="1" Text="Activos"></asp:ListItem>
                            <asp:ListItem Value="0" Text="Anulados"></asp:ListItem>
                           
                        </asp:DropDownList>
                    </td>
                    <td></td>
                   <td style="vertical-align: middle; padding-right: 5px;  font-size: 11px;font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;">Periodo</td>
                    <td>
                        <asp:TextBox ID="txtPeriodo" runat="server" Width="130px" MaxLength="7" ></asp:TextBox>
                    </td>
                    <%--<td style="text-align:right;">
                        <div id="btnBuscar" class="btnNormal" runat="server" style="width: 90px;">
                            <asp:Image ID="imgBuscar" runat="server"  width="16" height="16" ImageUrl="~/Common/Images/lup.png" />
                            <a>Buscar</a>
                        </div>
                        <div id="btnLimpiar" class="btnNormal" runat="server" style="width: 90px;">
                            <asp:Image ID="imgLimpiar" runat="server"  width="16" height="16" ImageUrl="~/Common/Images/Mantenimiento/Borrar.png" />
                            <a>Limpiar</a>
                        </div>
                    </td>--%>
                    <td style="width:10px"></td>
                </tr>
            </table>
        </div>

        <div id="divGrilla" class="dvPanel ui-widget-content ui-corner-all pMedium" style="margin: 0px auto; padding: 5px; background-image: none; margin-top: 3px;">
            <table id="tb2" runat="server" border="0" align="center">
                <tr>
                    <td>
                        <div id="btnNuevaDevolucion" class="btnNormal" runat="server" style="width: 145px;height: 30px; margin-bottom: -3px;">
                            <asp:Image ID="imgNuevaDevolucion" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Cashback2_16x16.png" />
                            <a>Crear Devolución</a>
                        </div>
                        <div id="btnAnularRegistros" class="btnNormal" runat="server" style="width: 145px; height: 30px; margin-bottom: -3px;">
                            <asp:Image ID="imgAnularRegistros" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Cancelar.png" />
                            <a>Anular Registros</a>
                        </div>
                    </td>
                    <td align="right">
                        <div style="margin-bottom: -10px">
                            <uc1:ExportarExcelGenerico ID="eegCobrosDevoluciones" runat="server" />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <table id="grid"></table>
                        <div id="pager"></div>    
                    </td>
                </tr>
            </table>
        </div>
    
    </div>
    <div id="divDevolucion" style="display:none; overflow:hidden;" >
        <iframe id="ifDevolucion" runat="server" style="margin-top: -10px; margin-left:-18px" frameborder="0"></iframe>
    </div>
    <div id="divAnulacion" style="display:none;">
        <span class="ui-icon ui-icon-alert" style="float:left;"></span>
        ¿Está seguro que desea anular los cobros y/o devoluciones seleccionados?
    </div>
    <div id="dvVisPre" class="ui-widget-content ui-corner-all" style="padding:0px; margin:0px; background-image:none; display: none; margin-top:5px;">
            <iframe id="ifReporte" height="720px" width="860px" frameborder="0"></iframe>
        </div>
    </form>
</body>
</html>
