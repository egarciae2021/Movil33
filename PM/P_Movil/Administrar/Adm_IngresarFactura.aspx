<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_IngresarFactura" Codebehind="Adm_IngresarFactura.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link  href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
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
    <script src="../../Common/Scripts/aLiteral.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Adm_IngresarFactura.js" type="text/javascript"></script>
    <%--<script type="text/javascript">
        $(document).ready(function () {
            var selecciono;
        });
    </script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <div id="dvCargando" class="dvCargando"></div>
        <div id="divMsgConfirmacion" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            ¡Se eliminará esta cuenta de cobro!, ¿Desea continuar?
        </div>
        <asp:HiddenField ID="hdfCodFact" runat="server" Value="0" />
        <asp:HiddenField ID="hdfMoneda" runat="server" Value="1" />
        <asp:HiddenField ID="hdfTipoCambio" runat="server" Value="2.7" />
        <asp:HiddenField ID="hdfIGV" runat="server" Value="" />
        <asp:HiddenField ID="hdfMonedaLiteral" runat="server" Value="" />
        <asp:HiddenField ID="hdfMonedaSimbolo" runat="server" Value="" />
        <asp:HiddenField ID="hdfA" runat="server" Value="0"/>
        <%--Offset="67" OffsetWidth="-10"--%>
        <cc1:SplitterJQ ID="SplitterJQ1" runat="server" Offset="67" OffsetWidth="-25">
            <cc1:PanelSplitter runat="server" Width="200px" >
                <cc1:BarraNavegacionJQ ID="BarraNavegacionJQ1" runat="server">
                    <cc1:PanelBarraNavegacion runat="server" Titulo="Acciones" Width="180px" ID="pbnAcciones">
                        <cc1:ItemBarraNavegacion ID="ibnAgregar" runat="server" UrlIco="../../Common/Images/Mantenimiento/Nuevo.gif" Texto="Nuevo" Seleccionable="true" Highlight="true" Click="NuevoFactura">
                        </cc1:ItemBarraNavegacion>
                        <cc1:ItemBarraNavegacion ID="ibnEditar" runat="server" UrlIco="../../Common/Images/Mantenimiento/Abrir.png" Texto="Abrir" Seleccionable="true" Highlight="true" Click="AbrirFactura">
                        </cc1:ItemBarraNavegacion>
                        <cc1:ItemBarraNavegacion ID="ibnEliminar" runat="server" UrlIco="../../Common/Images/Mantenimiento/delete_16x16.gif" Texto="Eliminar" Seleccionable="true" Highlight="true" Click="EliminarFactura">
                        </cc1:ItemBarraNavegacion>
                        <cc1:ItemBarraNavegacion ID="ibnSalir" runat="server" UrlIco="../../Common/Images/Mantenimiento/Salir.gif" Texto="Salir" Seleccionable="true" Highlight="true" Click="Salir">
                        </cc1:ItemBarraNavegacion>
                        <cc1:ItemBarraNavegacion ID="ibnOperacionesFrecuentes" runat="server" UrlIco="../../Common/Images/Mantenimiento/import.png" Texto="Operaciones Frecuentes" Seleccionable="true" Highlight="true" Click="OperacionesFrecuentes">
                        </cc1:ItemBarraNavegacion>
                    </cc1:PanelBarraNavegacion>
                    <cc1:PanelBarraNavegacion runat="server" Titulo="Avanzada" Width="180px" ID="pbnAvanzada">
                        <cc1:ItemBarraNavegacion ID="ibnImprimir" runat="server" UrlIco="../../Common/Images/Mantenimiento/print.ico" Texto="Imprimir" Seleccionable="true" Highlight="true" Click="ImprimirFactura">
                        </cc1:ItemBarraNavegacion>
                        <cc1:ItemBarraNavegacion ID="ibnVistaPrevia" runat="server" UrlIco="../../Common/Images/Mantenimiento/preview.ico" Texto="Vista Previa" Seleccionable="true" Highlight="true" Click="VistaPreviaFactura">
                        </cc1:ItemBarraNavegacion>
                        <cc1:ItemBarraNavegacion ID="ibnEnviarCorreo" runat="server" UrlIco="../../Common/Images/Mantenimiento/Enviar.gif" Texto="Enviar Correo" Seleccionable="true" Highlight="true" Click="EnviarCorreo">
                        </cc1:ItemBarraNavegacion>
                    </cc1:PanelBarraNavegacion>
                </cc1:BarraNavegacionJQ>
            </cc1:PanelSplitter>
            <cc1:PanelSplitter runat="server">
                <div id="dvEdicionFactura" runat="server" style="padding:10px; display:none; width: 100%;">
                <div id="Div1" runat="server" class="dvPanel" style="overflow: auto;">
                    <table style="margin:10px;">
                        <tr style="display: none;">
                            <td>
                                Cuenta de Cobro:
                            </td>
                            <td>
                                <asp:TextBox ID="lblFactura" runat="server"></asp:TextBox>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Fecha de cuenta de cobro:
                            </td>
                            <td>
                                <asp:TextBox ID="txtFechaFacturacion" runat="server" Width="90px" CssClass="txtFecha"></asp:TextBox>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Operador:
                            </td>
                            <td>
                                <asp:DropDownList ID="ddlOperador" runat="server" Width="200px"></asp:DropDownList>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Persona:
                            </td>
                            <td>
                                <div>
                                    <table id="tbEmpleados"></table>
                                    <div id="pagerEmpleados"></div>
                                </div>
                            </td>
                            <td>
                                <div id="btnAgregarEmpleado" class="btnNormal">
                                    <asp:Image ID="imgAgregarEmpleado" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                    <a>Agregar</a>
                                </div>
                                <div id="btnEliminarEmpleado" class="btnNormal">
                                    <asp:Image ID="imgEliminarEmpleado" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" />
                                    <a>Eliminar</a>
                                </div>
                            </td>
                        </tr>
                    </table>
                    </div>
                    <br />
                    <div>
                        <div id="btnImportar" class="btnNormal" >
                            <asp:Image ID="imgImportar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                            <a>Importar cuenta de cobro</a>
                        </div>
                        <div id="btnAgregar" class="btnNormal">
                            <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                            <a>Agregar Ítem</a>
                        </div>
                        <div id="btnModificar" class="btnNormal">
                            <asp:Image ID="imgModificar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                            <a>Modificar Ítem</a>
                        </div>
                        <div id="btnEliminar" class="btnNormal">
                            <asp:Image ID="imgEliminarItem" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" />
                            <a>Eliminar Ítem</a>
                        </div>
                    </div><br />
                    <table id="tbFacturaDetalles"></table>
                    <br />
                    <div style="text-align: right;">                    
                        <div id="btnOpcionesFrecuentes" class="btnNormal" runat="server">
                            <asp:Image ID="imgAgregarFrecuentes" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                            <a>Agregar a opciones Frecuentes</a>
                        </div>                   
                        <div id="btnGuardar" class="btnNormal" runat="server">
                            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                            <a>Guardar</a>
                        </div>
                    </div>
                </div>
            </cc1:PanelSplitter>
            </cc1:SplitterJQ>
        <div id="divItem" style="display: none;">
            <table>
                <tr>
                    <td>
                        Concepto Móvil:
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlConceptoMovil" runat="server" Width="100%"></asp:DropDownList>
                        <asp:Label ID="lblConceptoMovil" runat="server" Text=""></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td>
                        Descripción:
                    </td>
                    <td>
                        <asp:TextBox ID="txtDescripcion" runat="server" MaxLength="100" Width="100px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        Monto:
                    </td>
                    <td>
                        <asp:TextBox ID="txtMonto" runat="server" MaxLength="11"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        Cantidad:
                    </td>
                    <td>
                        <asp:TextBox ID="txtCantidad" runat="server" MaxLength="3"></asp:TextBox>
                    </td>
                </tr>
            </table>
            <br />
            <div style="text-align: right;">
                <div id="btnAgregarDialog" class="btnNormal">
                    <asp:Image ID="imgAgregarDialog" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                    <a>Agregar</a>
                </div>
                <div id="btnCerrarDialog" class="btnNormal">
                    <asp:Image ID="imgCerrarDialog" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    <a>Cerrar</a>
                </div>
            </div>
        </div>
        <div id="divEmpleadoDialog" style="display: none;">
            <table>
                <tr>
                    <td>
                        Línea:
                    </td>
                    <td>
                        <asp:TextBox ID="txtLinea" runat="server" Width="200px"></asp:TextBox>
                        <asp:HiddenField ID="hdfCodLin" runat="server" />
                        <asp:HiddenField ID="hdfNomEmp" runat="server" />
                    </td>
                </tr>
            </table>
            <br />
            <div style="text-align: right;">
                <div id="btnAgregarDialogEmpleado" class="btnNormal">
                    <asp:Image ID="imgAgregarDialogEmpleado" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                    <a>Agregar</a>
                </div>
                <div id="btnCerrarDialogEmpleado" class="btnNormal">
                    <asp:Image ID="imgCerrarDialogEmpleado" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    <a>Cerrar</a>
                </div>
            </div>
        </div>        
        <div id="dialogBuscador" style="display:none;">
            <table>
                <tr>
                    <td align="center" style="display:none;">Codigo</td>
                    <td rowspan="3" style="display:none;"></td>
                    <td align="center">Operador</td>
                    <td rowspan="3"></td>
                    <td colspan="2" align="center">Fecha cuenta cobro</td>
                    <td rowspan="3"></td>
                    <td colspan="2" align="center">Fecha creación</td>
                    <td rowspan="3"></td>
                    <td align="center">Empleado</td>
                    <td rowspan="3"></td>
                    <td align="center">Estado</td>
                </tr>
                <tr>
                    <td rowspan="2" style="display:none;">
                        <asp:TextBox ID="txtCodigoBusqueda" runat="server" Width="90px"></asp:TextBox>
                    </td>
                    <td rowspan="2">
                        <asp:DropDownList ID="ddlOperadorBusqueda" runat="server"></asp:DropDownList>
                    </td>
                    <td>
                        De: 
                    </td>
                    <td>
                        <asp:TextBox ID="txtFechaPeriodoI" runat="server" Width="63px" ReadOnly="true" CssClass="txtFecha"></asp:TextBox>
                        <img id="imgBorrarPerIni" alt="" src="../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>
                    </td>
                    <td>
                        De:
                    </td>
                    <td>
                        <asp:TextBox ID="txtFechaCreacionI" runat="server" Width="63px" ReadOnly="true" CssClass="txtFecha"></asp:TextBox>
                        <img id="imgBorrarCreaIni" alt="" src="../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>
                    </td>
                    <td rowspan="2">
                        <asp:TextBox ID="txtEmpleadoBusqueda" runat="server" Width="120px"></asp:TextBox>
                    </td> 
                    <td rowspan="2">
                        <asp:DropDownList ID="ddlEstado" runat="server"></asp:DropDownList>
                    </td>                    
                </tr>
                <tr>
                    <td>
                        A: 
                    </td>
                    <td>
                        <asp:TextBox ID="txtFechaPeriodoF" runat="server" Width="63px" ReadOnly="true" CssClass="txtFecha"></asp:TextBox>
                        <img id="imgBorrarPerFin" alt="" src="../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>
                    </td> 
                    <td>
                        A: 
                    </td>
                    <td>
                        <asp:TextBox ID="txtFechaCreacionF" runat="server" Width="63px" ReadOnly="true" CssClass="txtFecha"></asp:TextBox>
                        <img id="imgBorrarCreaFin" alt="" src="../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>
                    </td>
                </tr>
            </table>
            <div id="dvFactruras" style="width:100%;">            
                <table id="tbFacturas"></table>
            </div>
            <div id="dvOpeFre" style="width:100%;display:none;">            
                <table id="tbOpeFre"></table>
            </div>
            <br />
            <br />
            <div style="text-align:right;width:100%;">
                <div id="btnAbrirFactura" class="btnNormal">
                    <a>Abrir</a>
                </div>
                <div id="btnCerrarFactura" class="btnNormal">
                    <a>Cerrar</a>
                </div>
            </div>
        </div>
        <div id="dvResumen" style="display:none;">
            <iframe id="ifResumen" width="375px" height="380px" frameborder="0"></iframe>
        </div>  
        <div id="dvImprimir" style="display:none; padding:0px; margin:0px;">
            <iframe id="ifImprimir" frameborder="0" style="padding:0px; margin:0px;"></iframe>
        </div>     
    </form>
</body>
</html>