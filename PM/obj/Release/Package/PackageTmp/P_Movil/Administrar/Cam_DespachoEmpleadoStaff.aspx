<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Cam_DespachoEmpleadoStaff" Codebehind="Cam_DespachoEmpleadoStaff.aspx.vb" %>

<%@ Register src="../../Common/Controles/BusquedaPrincipal.ascx" tagname="BusquedaPrincipal" tagprefix="uc1" %>
<%@ Register src="../../Common/Controles/ExportarExcelGenerico.ascx" tagname="ExportarExcelGenerico" tagprefix="uc1" %>
<%@ Register Src="../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">

    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.custom.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.filter.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.grouping.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.import.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.inlinedit.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.subgrid.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.tbltogrid.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.treegrid.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.celledit.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <style type="text/css">
        body {
            overflow: hidden;
        }
    </style>
    <style type="text/css">
        .dw-sm-100, .dw-xs-50, .dw-xs-25 { float: left; }
        .dw-xs-100 { width: 100% }
        .dw-xs-50 { width: 50% }
        .dw-xs-25 { width: 25% }
        @media (min-width:768px) {
            .dw-sm-100, .dw-sm-50, .dw-sm-25 { float: left; }
            .dw-sm-100 { width: 100% }
            .dw-sm-50 { width: 50% }
            .dw-sm-25 { width: 25% }
        }
        @media (min-width:992px) {
            .dw-md-100, .dw-md-50, .dw-md-25 { float: left; }
            .dw-md-100 { width: 100% }
            .dw-md-50 { width: 50% }
            .dw-md-25 { width: 25% }
        }
        @media (min-width:1200px) {
            .dw-lg-100, .dw-lg-50, .dw-lg-25 { float: left; }
            .dw-lg-100 { width: 100% }
            .dw-lg-50 { width: 50% }
            .dw-lg-25 { width: 25% }
        }
    </style>
</head>
<body>

    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Cam_DespachoEmpleadoStaff.js")%>" type="text/javascript"></script>

    <form id="form1" runat="server">

        <asp:HiddenField ID="hdfempleadoAtencion" runat="server" />
        <asp:HiddenField ID="hdftipoAtencion" runat="server" />
        <asp:HiddenField ID="hdfidAtencion" runat="server" />
        <asp:HiddenField ID="hdfidCampana" runat="server" />     
        <asp:HiddenField ID="hdfTituloValeResguardo" runat="server" />
        
        <asp:HiddenField ID="hdfArchivo" runat="server" />   
        <asp:HiddenField ID="hdfRutaCompleta" runat="server" />
        <asp:HiddenField ID="hdfDespachoImportacion" runat="server" />
        <asp:HiddenField ID="hdfIdOficinaTemp" runat="server" />

        <asp:HiddenField ID="hdfCampanaActiva" runat="server" />
        <asp:HiddenField ID="hdfTipoLineaPerfil" runat="server" />
        <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
        <div class="ui-state-default ui-corner-all" style="padding:6px; width:48%;float:left">
            <span class="ui-icon ui-icon-suitcase" style="float:left; margin:-2px 5px 0 0;"></span>
            Datos de Despacho
        </div>
        <div class="ui-state-default ui-corner-all" style="padding:6px; width:48%;float:left">
            <span class="ui-icon ui-icon-person" style="float:left; margin:-2px 5px 0 0;"></span>
            Usuario
        </div>
        <div style="float:left;width:50%;padding-bottom:5px;">
            <table>
                <tr align="center">
                    <td style="margin-right:20px; padding-right: 20px;">
                        Operador
                    </td>
                    <td style="margin-right:20px; padding-right: 20px;">
                        <asp:DropDownList ID="ddlOperador" runat="server"></asp:DropDownList>
                    </td>
                </tr>
            </table>
        </div>
        <div id="dvUsuario" runat="server" style="float:left;width:50%">
            <div id="dvEmpleadoBusqueda">
                <asp:TextBox ID="TextBox1" runat="server" CssClass="txtBuscador"></asp:TextBox>
                <uc1:BusquedaPrincipal ID="bpEmpleado" runat="server" />
                <asp:Label ID="lblEmpleado" runat="server" Text="" Font-Size="Small"></asp:Label>
            </div>
        </div>
        <%--<table>
            <tr align="center">
                <td style="margin-right:20px; padding-right: 20px;">
                    Operador
                </td>                
            </tr>
            <tr>
                <td style="margin-right:20px; padding-right: 20px;">
                    <asp:DropDownList ID="ddlOperador" runat="server"></asp:DropDownList>
                </td>
            </tr>
        </table>
        <div id="dvUsuario" runat="server">
            <div class="ui-state-default ui-corner-all" style="padding:6px;">
                <span class="ui-icon ui-icon-person" style="float:left; margin:-2px 5px 0 0;"></span>
                Usuario
            </div>
            <div id="dvEmpleadoBusqueda">
                <asp:TextBox ID="TextBox1" runat="server" CssClass="txtBuscador"></asp:TextBox>
                <uc1:BusquedaPrincipal ID="bpEmpleado" runat="server" />
                <asp:Label ID="lblEmpleado" runat="server" Text="" Font-Size="Small"></asp:Label>
            </div>
        </div>--%>
        <div id="dvOficina" runat="server">
            <div class="ui-state-default ui-corner-all" style="padding:6px;">
                <span class="ui-icon ui-icon-person" style="float:left; margin:-2px 5px 0 0;"></span>
                Oficina
            </div>
            <div id="dvOficinaBusqueda">
                <asp:TextBox ID="TextBox2" runat="server" CssClass="txtBuscador"></asp:TextBox>
                <uc1:BusquedaPrincipal ID="bpOficina" runat="server"  />
            </div>
        </div>
        <div id="dvImportacion" style="display:none;">
            <table cellpadding="0" cellspacing="0">
                <tr>
                    <td>
                        <ttgInfo:ToolTipGenerico ID="infoImportacion" runat="server" Mensaje='Puede descarga la plantilla de importación desde el botón "Exportar" al final de la página.' />
                    </td>
                    <td style="width:500px;">
                        <iframe id="ifCargarDespacho" frameborder="0" style="padding: 0px; margin: 0px; height: 33px; width:582px;" 
                                src="../../Common/Page/Adm_CargarArchivo.aspx?Formatos=&FormatoTipo=">
                        </iframe>
                    </td>
                    <td align="left">
                        <asp:Label ID="lblArchivoCargado" runat="server" Text="" CssClass="lblDescargar" Visible="false"></asp:Label>
                    </td>
                </tr>
            </table>
        </div>
        <div id="dvDespachos" style="display:none;">
            <div class="ui-state-default ui-corner-all" style="padding:6px;">
                <table width="100%">
                    <tr>
                        <td align="left">
                            <div style="float:left; margin-right: 20px;">
                                <span class="ui-icon ui-icon-circle-arrow-s" style="float:left; margin:-2px 5px 0 0;"></span>
                                Pedidos
                            </div>
                        </td>
                        <td align="right">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td id="tdListoDespacho" style="width:15px;" class="ui-corner-all chkListoDespacho"></td>
                                    <td style="padding-right:10px;" class="chkListoDespacho">
                                        Listo Para Despacho
                                    </td>
                                    <td id="tdYaDespacho" style="width:15px;" class="ui-corner-all chkYaDespacho"></td>
                                    <td style="padding-right:10px;" class="chkYaDespacho">
                                        Ya Despachado
                                    </td>
                                    <td id="tdNoFechaDespacho" style="width:15px;" class="ui-corner-all chkNoFechaDespacho"></td>
                                    <td style="padding-right:10px;" class="chkNoFechaDespacho">
                                        No Cumple Fecha De Despacho
                                    </td>
                                    <td id="tdNoCorte" style="width:15px;" class="ui-corner-all chkNoEnviadoOperador"></td>
                                    <td style="padding-right:10px;" class="chkNoEnviadoOperador">
                                        No Enviado Al Operador
                                    </td>
                                    <td id="tdNoDespacho" style="width:15px;" class="ui-corner-all chkBajaRenovacionSinEquipo"></td>
                                    <td class="chkBajaRenovacionSinEquipo">
                                        <asp:Label ID="lblLeyendaRenovSinEquip" runat="server" Text="Bajas Y Renovación Sin Equipo"></asp:Label>
                                    </td>
                                    <td id="tdNoProcesadasError" style="width:15px; display:none;" class="ui-corner-all chkNoProcesadasError"></td>
                                    <td class="chkNoProcesadasError" style="display:none;">
                                        Error al ser procesadas
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            <table id="tbFiltrosPedidos" width="100%">
                <tr>
                    <td align="left" class="chkMarcarTodos" style="display: none;">
                        <asp:CheckBox ID="chkMarcarTodos" runat="server" Text="Marcar Todos"/>
                    </td>
                    <td align="right">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="width:120px;" class="chkListoDespacho">
                                    <asp:CheckBox ID="chkListoDespacho" runat="server" Text="Listo Para Despacho"  Checked="true"/>
                                </td>
                                <td style="width:94px;" class="chkYaDespacho">
                                    <asp:CheckBox ID="chkYaDespacho" runat="server" Text="Ya Despachado"  Checked="true"/>
                                </td>
                                <td style="width:170px;" class="chkNoFechaDespacho">
                                    <asp:CheckBox ID="chkNoFechaDespacho" runat="server" Text="No Cumple Fecha De Despacho" Checked="true"/>
                                </td>
                                <td style="width:140px;" class="chkNoEnviadoOperador">
                                    <asp:CheckBox ID="chkNoEnviadoOperador" runat="server" Text="No Enviado Al Operador" Checked="true"/>
                                </td>
                                <td id="tdBajaRenovacionSinEquipo" style="width:169px;" class="chkBajaRenovacionSinEquipo">
                                    <asp:CheckBox ID="chkBajaRenovacionSinEquipo" runat="server" Text="Bajas Y Renovación Sin Equipo" Checked="false"/>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <asp:Label ID="lblMensaje" runat="server" Text="" Font-Bold="true" Font-Size="Medium" ForeColor="Red"></asp:Label>
            <div id="dvPedidos" style="display:none;">
                <table cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td colspan="2">
                            <div id="dvPedidosInicial">
                                <table id="tbPedido"></table>
                                <div id="tbPedidoPaginado"></div>
                            </div>
                            <div id="dvPedidosImportacion" style="display:none;">
                                <table id="tbImportacion"></table>
                                <div id="tbImportacionPaginado"></div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="left">
                            <div id="btnValeResguardo" class="btnNormal">
                                <asp:Image ID="Image2" runat="server" Width="16px" Height="16px" ImageUrl="~/Common/Images/pdf.png" />
                                <a id="aTituloValeResguardo">Vale Resguardo</a>
                            </div>
                            <div id="btnGuardar" class="btnNormal">
                                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                                <a>Despachar</a>
                            </div>
                            <div id="btnExportar" class="btnNormal">
                                <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Exportar16.png" />
                                <a>Exportar</a>
                            </div>
                            <div id="btnImprimirCompraPedido" class="btnNormal">
                                <asp:Image ID="imgCerrarServicio" runat="server" ImageUrl="~/Common/Images/imprimir.png" />
                                <a>Imprimir</a>
                            </div>


                            <div id="btnAutDesPDF" class="btnNormal">
                                <asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/imprimir.png" />
                                <a>Autorización Descuento</a>
                            </div>

                            <div id="btnLimpiar" class="btnNormal">
                                <asp:Image ID="imgLimpiar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Borrar.png" />
                                <a>Limpiar</a>
                            </div>
                            <div id="btnImprimir" class="btnNormal" style="display:none;">
                                <asp:Image ID="imgImprimir" runat="server" ImageUrl="~/Common/Images/Mantenimiento/print.ico" Width="16px" Height="16px"/>
                                <a>Imprimir</a>
                            </div>

                            <div id="btnCerrar" class="btnNormal">
                                <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                                <a>Cerrar</a>
                            </div>
                        </td>
                        <td align="right" style="font-style:italic; font-weight:bold;">
                            <asp:Label ID="lblMensajeLeyenda" runat="server" Text="Enviado: Pedido Enviado, Procesado: Pedido Aceptado"></asp:Label>
                        </td>
                    </tr>
                </table>
                
            </div>
        </div>
        <uc1:ExportarExcelGenerico ID="eegExportar" runat="server" OcultarDiseno="true"/>
        <div id="dvOpcionesGrabado" style="display:none;">
            <table>
                <tr>
                    <td colspan="2">
                        <asp:Label ID="lblMensajeGrabado" runat="server" Font-Bold="true" ForeColor="Red" Text="Valores opcionales del despacho"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td>
                        Número de Guía
                    </td>
                    <td>
                        <asp:TextBox ID="txtNumeroGuia" runat="server"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        Fecha de Despacho
                    </td>
                    <td>
                        <asp:TextBox ID="txtFechaDespacho" runat="server"></asp:TextBox>
                    </td>
                </tr>
            </table>
        </div>
        <div id="dvReportes" style="display:none;">
            <table>
                <tr>
                    <td>Según fecha despacho:</td>
                </tr>
                <tr>
                    <td style="padding-left:25px;">
                        <asp:RadioButtonList ID="rbtTipo" runat="server">
                            <asp:ListItem Value="1" Text="Fecha programada de despacho" />
                            <asp:ListItem Value="2" Text="Fecha real de despacho" Selected="True"/>
                        </asp:RadioButtonList>
                    </td>
                </tr>
                <tr>
                    <td>
                        Seleccionar oficina:&nbsp;<asp:DropDownList ID="ddlOficinaReporte" runat="server" Width="150"></asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td>
                        Seleccionar fecha:&nbsp;<asp:TextBox ID="txtFechaReporte" runat="server" Width="70" />
                        <img alt="Agregar" src="../../Common/Images/Mantenimiento/add_16x16.gif" id="btnAddFechaRep" class="imgBtn" title="Agregar fecha" />
                    </td>
                </tr>
                <tr>
                    <td style="padding-left:30px;">
                        Fechas seleccionadas:
                        <asp:ListBox ID="lstFechas" runat="server" Width="160" Height="70"></asp:ListBox>
                        <img alt="Quitar" src="../../Common/Images/Mantenimiento/Cancelar.png"  id="btnDelFechaRep" class="imgBtn" style="vertical-align:top;" title="Quitar fecha"/>
                    </td>
                </tr>
            </table>
        </div>


        <iframe id="ifReporteFormato" frameborder="0" style="margin: 0px; padding: 0px; display: none;" width="100%" height="470px"></iframe>
        <div id="dvGenerarResguardo" style="display: none;">
            <table border="0" width="100%">
                <tr>
                    <td style="width: 100px; text-align: right;">Factura:</td>
                    <td>
                        <asp:TextBox ID="txtFactura" runat="server" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Nro. Consecutivo:</td>
                    <td>
                        <asp:TextBox ID="txtNroConsecutivo" runat="server" Width="100px"></asp:TextBox>
                        <span id="lblNroConsecutivoAnterior" style="font-family: Tahoma; color: darkblue; font-size: 11px;"></span>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Tipo Servicio:</td>
                    <td>
                        <asp:DropDownList ID="ddlTipoServicio" Width="100px"  runat="server">
                            <asp:ListItem Value="1" Text="CELULAR"></asp:ListItem>
                            <asp:ListItem Value="2" Text="TABLET"></asp:ListItem>
                            <asp:ListItem Value="3" Text="BAM"></asp:ListItem>
                            <asp:ListItem Value="4" Text="CHIP"></asp:ListItem>
                            <asp:ListItem Value="5" Text="BLACKBERRY"></asp:ListItem>
                            <asp:ListItem Value="6" Text="RADIOLOCALIZACIÓN"></asp:ListItem>
                            <asp:ListItem Value="7" Text="ROAMING"></asp:ListItem>
                        </asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Costo (S/Impuesto):</td>
                    <td>
                        <asp:TextBox ID="txtCosto" runat="server" style="text-align: right;" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Marca:</td>
                    <td>
                        <asp:TextBox ID="txtMarca" runat="server" Enabled="false" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Modelo:</td>
                    <td>
                        <asp:TextBox ID="txtModelo" runat="server" Enabled="false"  Width="100px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Nro Servicio:</td>
                    <td>
                        <asp:TextBox ID="txtNroServicio" runat="server" Enabled="false" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">IMEI:</td>
                    <td>
                        <asp:TextBox ID="txtIMEI" runat="server" Enabled="false" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">SIM:</td>
                    <td>
                        <asp:TextBox ID="txtSIM" runat="server" Width="100px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">PIN:</td>
                    <td>
                        <asp:TextBox ID="txtPIN" runat="server" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;"></td>
                    <td>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;"></td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Accesorios:</td>
                    <td>
                        <asp:CheckBoxList ID="chkAccesorios" runat="server">
                             <asp:ListItem  Value="HAND" Text="HAND SET"></asp:ListItem>
                             <asp:ListItem  Value="BATE" Text="BATERIA LITIO"></asp:ListItem>
                             <asp:ListItem  Value="ADAP" Text="ADAPTADOR CA"></asp:ListItem>
                             <asp:ListItem  Value="AUDI" Text="AUDIFONO"></asp:ListItem>
                             <asp:ListItem  Value="USB"  Text="CABLE USB"></asp:ListItem>
                             <asp:ListItem  Value="MANU" Text="MANUAL OPERACIÓN"></asp:ListItem>
                        </asp:CheckBoxList>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;"></td>
                    <td>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;"></td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Observaciones:</td>
                    <td colspan="7">
                        <asp:TextBox ID="txtObservaciones" runat="server" Height="50px" TextMode="MultiLine" Width="755px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Administrador Contrato:</td>
                    <td colspan="7">
                        <asp:TextBox ID="txtAdministradorContrato" runat="server" Width="755px"></asp:TextBox>
                    </td>
                </tr>
            </table>
        </div>


    </form>
</body>
</html>
