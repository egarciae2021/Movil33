<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Cam_DespachoReportes" Codebehind="Cam_DespachoReportes.aspx.vb" %>
<%@ Register src="../../Common/Controles/ExportarExcelGenerico.ascx" tagname="ExportarExcelGenerico" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Cam_DespachoReportes.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <div class="ui-state-default ui-corner-all" style="padding:6px;">
            <span class="ui-icon ui-icon-suitcase" style="float:left; margin:-2px 5px 0 0;"></span>
            Campaña
        </div>
        <asp:DropDownList ID="ddlCampana" runat="server"></asp:DropDownList>        
        <div class="ui-state-default ui-corner-all" style="padding:6px;">
            <span class="ui-icon ui-icon-suitcase" style="float:left; margin:-2px 5px 0 0;"></span>
            Detalle de Reporte
        </div>
        <asp:DropDownList ID="ddlTipoReporte" runat="server">
            <asp:ListItem Text="<Seleccione Tipo>" Value="-1"></asp:ListItem>
            <asp:ListItem Text="Pedidos por Despachar" Value="1"/>
            <asp:ListItem Text="Pedidos Despachados" Value="2"/>
            <asp:ListItem Text="Pedidos Despachados Con Minutos Adicionales" Value="4"/>
            <asp:ListItem Text="Pedidos por Oficina" Value="3"/>
        </asp:DropDownList>
        <div id="dvSeleccionOficina" style="display:none;">
            <asp:RadioButtonList ID="rblSeleccionOficina" runat="server" RepeatDirection="Horizontal">
                <asp:ListItem Text="Todas" Value="-1" Selected="True"></asp:ListItem>
                <asp:ListItem Text="Selección" Value="1"></asp:ListItem>
            </asp:RadioButtonList>            
            <div id="dvSeleccionOficinaDetalle" style="display:none;" class="dvPanel ui-widget-content ui-corner-all">
                <table>
                    <tr>
                        <td>
                            <div id="btnAgregarOficina" class="btnNormal">
                                <%--<asp:Image ID="imgAgregarOficina" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png"/>--%>
                                <a>Agregar Oficinas</a>
                            </div>
                        </td>
                        <td>
                            <div id="btnLimpiarSeleccionOficina" class="btnNormal">
                                <%--<asp:Image ID="imgLimpiarSeleccion" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png"/>--%>
                                <a>Limpiar Selección</a>
                            </div>
                        </td>
                    </tr>              
                </table>
                <table id="tblSeleccionOficina"></table>
            </div>
        </div>
        <div id="dvSeleccionModelo" style="display:none;">
            <asp:RadioButtonList ID="rblSeleccionModelo" runat="server" RepeatDirection="Horizontal">
                <asp:ListItem Text="Todos" Value="-1" Selected="True"></asp:ListItem>
                <asp:ListItem Text="Selección" Value="1"></asp:ListItem>
            </asp:RadioButtonList>
            <div id="dvSeleccionModeloDetalle" style="display:none;" class="dvPanel ui-widget-content ui-corner-all">
                <table>
                    <tr>
                        <td>
                            <div id="btnAgregarModelo" class="btnNormal">
                                <%--<asp:Image ID="imgAgregarOficina" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png"/>--%>
                                <a>Agregar Modelos de dispositivos</a>
                            </div>
                        </td>
                        <td>
                            <div id="btnLimpiarSeleccionModelo" class="btnNormal">
                                <%--<asp:Image ID="imgLimpiarSeleccion" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png"/>--%>
                                <a>Limpiar Selección</a>
                            </div>
                        </td>
                    </tr>              
                </table>
                <table id="tblSeleccionModelo"></table>
            </div>
        </div>
        <br />
        <div id="btnGenerarReporte" class="btnNormal">
            <asp:Image ID="imgGenerarReporte" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png"/>
            <a>Generar Excel</a>
        </div>
        <div id="btnSalir" class="btnNormal">
            <asp:Image ID="imgSalir" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" Width="16px" Height="16px"/>
            <a>Salir</a>
        </div>
        <div id="dvSeleccionarModeloDispositivo" style="display:none; padding:0px; margin:0px;">
            <iframe id="ifSeleccionarModeloDispositivo" frameborder="0" style="padding:0px; margin:0px; height: 520px; width: 580px;"></iframe>
        </div>
        <div id="dvSeleccionarOficina" style="display:none; padding:0px; margin:0px;">
            <iframe id="ifSeleccionarOficina" frameborder="0" style="padding:0px; margin:0px; height: 510px; width: 700px;"></iframe>
        </div>
        <%--<iframe id="ifReporte" frameborder="0" style="padding:0px; margin:0px; height: 5px; width: 5px; display:none;"></iframe>--%>
        <uc1:ExportarExcelGenerico ID="eegReporte" runat="server" OcultarDiseno="true"/>
    </form>
</body>
</html>
