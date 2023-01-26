<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_IngresarPago" Codebehind="Adm_IngresarPago.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link  href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
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
    <script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Adm_IngresarPago.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="dvCargando" class="dvCargando"></div>
        <div id="divMsgConfirmacion" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            ¡Se anulará este pago!, ¿Desea continuar?
        </div>
        <asp:HiddenField ID="hdfCodPago" runat="server" Value="0"/>
        <asp:HiddenField ID="hdfA" runat="server" Value="0"/>    

        <cc1:SplitterJQ ID="SplitterJQ1" runat="server" Offset="67" OffsetWidth="-10">
            <cc1:PanelSplitter runat="server" Width="200px">
                <cc1:BarraNavegacionJQ ID="BarraNavegacionJQ1" runat="server">                    
                    <cc1:PanelBarraNavegacion runat="server" Titulo="Archivo" Width="180px" ID="pbnAcciones">
                        <cc1:ItemBarraNavegacion ID="ibnAgregar" runat="server" UrlIco="../../Common/Images/Mantenimiento/Nuevo.gif" Texto="Nuevo" Seleccionable="true" Highlight="true" Click="NuevoPago">
                        </cc1:ItemBarraNavegacion>
                        <cc1:ItemBarraNavegacion ID="ibnEditar" runat="server" UrlIco="../../Common/Images/Mantenimiento/Abrir.png" Texto="Abrir" Seleccionable="true" Highlight="true" Click="AbrirPago">
                        </cc1:ItemBarraNavegacion>
                        <cc1:ItemBarraNavegacion ID="ibnEliminar" runat="server" UrlIco="../../Common/Images/Mantenimiento/delete_16x16.gif" Texto="Anular" Seleccionable="true" Highlight="true" Click="EliminarPago">
                        </cc1:ItemBarraNavegacion>
                        <cc1:ItemBarraNavegacion ID="ibnSalir" runat="server" UrlIco="../../Common/Images/Mantenimiento/Salir.gif" Texto="Salir" Seleccionable="true" Highlight="true" Click="Salir">
                        </cc1:ItemBarraNavegacion>
                    </cc1:PanelBarraNavegacion>
                </cc1:BarraNavegacionJQ>
            </cc1:PanelSplitter>
            <cc1:PanelSplitter runat="server">
                <div id="dvEdicionPago" runat="server"  style="padding:10px; display:none; overflow: auto;">
                    <table id="tbCamposDinamicos" runat="server">
                        <tr>
                            <td>
                                Operador:
                            </td>
                            <td>
                                <asp:DropDownList ID="ddlOperador" runat="server" Width="210px"></asp:DropDownList>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Cuenta:
                            </td>
                            <td>
                                <asp:TextBox ID="txtCuenta" runat="server" Width="200px">De</asp:TextBox>
                                <asp:HiddenField ID="hdfCuenta" runat="server" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Periodo:
                            </td>
                            <td>
                                <asp:TextBox ID="txtPeriodo" runat="server" Width="90px" MaxLength="10"></asp:TextBox>
                                <asp:Label ID="lblPeriodoInicial" runat="server" Text=""></asp:Label>
                                -
                                <asp:Label ID="lblPeriodoFin" runat="server" Text=""></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td>Fecha Pago</td>
                            <td>
                                <asp:TextBox ID="txtFechaPago" runat="server" Width="100px" MaxLength="10"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>N° de Recibo</td>
                            <td>
                                <asp:TextBox ID="txtNumeroRecibo" runat="server" MaxLength= "35"  Width="100px"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Forma de Pago</td>
                            <td>
                                <asp:DropDownList ID="ddlFormaPago" runat="server"  Width="110px"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Total a pagar:
                            </td>
                            <td>
                                <asp:TextBox ID="txtTotalPagar" runat="server" MaxLength="8"  Width="100px"></asp:TextBox>
                            </td>
                        </tr>
                    </table>
                    <div style="padding:5px;">
                        <div id="btnGuardar" class="btnNormal" runat="server">
                            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                            <a>Guardar</a>
                        </div>
                    </div> 
                </div>       
            </cc1:PanelSplitter>
        </cc1:SplitterJQ>
        
        <div id="dialogBuscador" style="display:none;">
            <table width="99%">
                <tr>
<%--                    <td align="center">Codigo</td>
                    <td></td>--%>
                    <td align="center">Operador</td>
                    <td></td>
                    <td align="center">Periodo</td>
                    <td></td>
                    <td align="center">Estado</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
<%--                    <td>
                        <asp:TextBox ID="txtCodigo" runat="server" Width="70px"></asp:TextBox>
                    </td>
                    <td style="width:8px;">
                    </td>--%>
                    <td>
                        <asp:DropDownList ID="ddlOperadorBusqueda" runat="server"  Width="200px"></asp:DropDownList>
                    </td>
                    <td style="width:8px;">
                    </td>
                    <td>
                        <asp:TextBox ID="txtFechaPeriodoI" runat="server" Width="90px" CssClass="txtFecha" MaxLength="10" ></asp:TextBox>
                        <img id="imgBorrarPerIni" alt="" src="../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/> - 
                        <asp:TextBox ID="txtFechaPeriodoF" runat="server" Width="90px" CssClass="txtFecha" MaxLength="10"></asp:TextBox>
                        <img id="imgBorrarPerFin" alt="" src="../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>
                    </td>
                    <td style="width:8px;">
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlEstado" runat="server"  Width="100px"></asp:DropDownList>
                    </td>                    
                    <td style="width:8px;">
                    </td>
                </tr>
            </table>
            <div style="width:100%;">
                <table id="tbPagos"></table> 
            </div>
            <br />
            <br />
            <div style="text-align:right;width:100%;">
                <div id="btnAbrirPago" class="btnNormal">
                    <a>Abrir</a>
                </div>
                <div id="btnSalirPago" class="btnNormal">
                    <a>Cerrar</a>
                </div>
            </div>
        </div>
    </form>
</body>
</html>