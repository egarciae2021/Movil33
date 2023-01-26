<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Cam_Mnt_Campana"
    CodeBehind="Cam_Mnt_Campana.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register Src="../../../Common/Controles/BusquedaPrincipal.ascx" TagName="BusquedaPrincipal"
    TagPrefix="uc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet"
        type="text/css" />
    <%--kendo --%>
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/knockout.validation.min.js"
        type="text/javascript"></script>
    <%--<script src="../../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>--%>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <%--<script src="../../../Common/Scripts/VistaModelo/MOV_CAM_Campana.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/VistaModelo/GEN_Operador.js" type="text/javascript"></script>--%>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <%--    <script src="../../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>--%>
    <%--<script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-ES.min.js" type="text/javascript"></script>--%>
    <%--<script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-ES.min.js" type="text/javascript"></script>--%>
    <%--<script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js" type="text/javascript"></script>--%>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/date.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Cam_Mnt_Campana.js" type="text/javascript"></script>
    <style type="text/css">
        #trEstado
        {
            display:none;            
        }
    
    
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfIdCampana" runat="server" />
    <asp:HiddenField ID="hdfIdCliente" runat="server" />
    <asp:HiddenField ID="hdfIdCampanaConfiguracion" runat="server" />
    <asp:HiddenField ID="hdfIdCorteConfiguracion" runat="server" />
    <asp:HiddenField ID="hdfIdCreditoConfiguracion" runat="server" />
    <asp:HiddenField ID="hdfTipActualizacion" runat="server" />
    <asp:HiddenField ID="hdfCodContrato" runat="server" />
    <asp:HiddenField ID="hdfActivo" runat="server" />
    <asp:HiddenField ID="hdfIdCamAct" runat="server" />
    <asp:HiddenField ID="hdfNomCamAct" runat="server" />

    <br />
    <div id="dvDialogo" style="display: none;">
    </div>
    <div id="dvContenido">
        <div id="dvCampos" class="dvPanel" style="overflow: auto;">
            <cc1:TabJQ ID="tabContenido" runat="server" CssClass="tabs" Style="margin: 0px; padding: 0px;
                height: 150px;">
                <cc1:ContenedorTabJQ ID="tbGeneral" Titulo="Datos Generales" CssClass="dvTabContenido"
                    Style="margin: 0px; padding: 0px; height: auto; overflow: auto;">
                    <div>
                    </div>
                    <div id="btnResumenCampana" class="btnNormal" style="position: absolute; right: 18px; top: 40px;">
                        <asp:Image runat="server" ImageUrl="~/Common/Images/Mantenimiento/Play_16x16.png" />
                        <asp:Label runat="server" Text="Resumen"></asp:Label>
                    </div>
                    <div id="dvGeneral" style="width: 540px; margin: 10px; height: auto;">
                        <table id="tbCampos" width="115%">
                            <tr id="trEstado" runat="server">
                                <td class="tdEtiqueta">
                                    Activo
                                </td>
                                <td class="tdEntrada">
                                    <input id="chkEstado" type="checkbox" runat="server" readonly="readonly" />
                                    <%--<asp:Label ID="lblActivo" runat="server" text="Activo"></asp:Label>--%>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="txtCodigoCab" runat="server" Text="Código"></asp:Label>
                                </td>
                                <td class="tdEntrada">
                                    <asp:TextBox ID="txtCodigo" runat="server" Width="150px"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblContratoCab" runat="server" Text="Contrato"></asp:Label>
                                </td>
                                <td class="tdEntrada">
                                    <asp:DropDownList ID="ddlContrato" runat="server" Width="310px">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr style="display: none;">
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblCodigoProveedorCab" runat="server" Text="Código Operador"></asp:Label>
                                </td>
                                <td class="tdEntrada">
                                    <asp:TextBox ID="txtCodigoProveedor" runat="server" Width="300px"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblDescripcionCab" runat="server" Text="Descripción"></asp:Label>
                                </td>
                                <td class="tdEntrada">
                                    <asp:TextBox ID="txtDescripcion" runat="server" Width="400px" TextMode="MultiLine"
                                        Height="90px" Style="resize: none;"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblFechaInicioCab" runat="server" Text="Fecha Inicio"></asp:Label>
                                </td>
                                <td class="tdEntrada">
                                    <asp:TextBox ID="txtFechaInicio" runat="server" CssClass="DATETIME" Width="80px"></asp:TextBox>
                                    <asp:TextBox ID="txtHoraIniFechaInicio" runat="server" CssClass="txtFechaKendo" Width="90px"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblFechaFinCab" runat="server" Text="Fecha Fin"></asp:Label>
                                </td>
                                <td class="tdEntrada">
                                    <asp:TextBox ID="txtFechaFin" runat="server" CssClass="DATETIME" Width="80px"></asp:TextBox>
                                    <asp:TextBox ID="txtHoraFinFechaFin" runat="server" CssClass="txtFechaKendo" Width="90px"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblFechaInicioPedido" runat="server" Text="Fecha Inicio Pedido"></asp:Label>
                                </td>
                                <td class="tdEntrada">
                                    <asp:TextBox ID="txtFechaInicioPedido" runat="server" CssClass="DATETIME" Width="80px"></asp:TextBox>
                                    <asp:TextBox ID="txtHoraFechaInicioPedido" runat="server" CssClass="txtFechaKendo"
                                        Width="90px"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblFechaInicioEntrega" runat="server" Text="Fecha Inicio Entrega"></asp:Label>
                                </td>
                                <td class="tdEntrada">
                                    <asp:TextBox ID="txtFechaInicioEntrega" runat="server" CssClass="DATETIME" Width="80px"></asp:TextBox>
                                    <asp:TextBox ID="txtHoraFechaInicioEntrega" runat="server" CssClass="txtFechaKendo"
                                        Width="90px"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 100px;">
                                    <asp:Label ID="lblNuevoProductoCab" runat="server" Text="Nuevo Producto"></asp:Label>
                                </td>
                                <td class="tdEntrada">
                                    <input id="chkNuevoProducto" type="checkbox" runat="server" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 100px;">
                                    <asp:Label ID="lblModificaProductoCab" runat="server" Text="Modificar Producto"></asp:Label>
                                </td>
                                <td class="tdEntrada">
                                    <input id="chkModificaProducto" type="checkbox" runat="server" />
                                </td>
                            </tr>
                            <tr >
                                <td style="width: 100px;">
                                    <asp:Label ID="lblBajaProductoCab" runat="server" Text="Baja Producto"></asp:Label>
                                </td>
                                <td class="tdEntrada">
                                    <input id="chkBajaProducto" type="checkbox" runat="server" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 100px;">
                                    <asp:Label ID="lblChatCab" runat="server" Text="Habilitar Chat"></asp:Label>
                                </td>
                                <td>
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <input id="chkChat" type="checkbox" runat="server" style="float: left;" />
                                            </td>
                                            <td>
                                                <div id="btnGruposChats" class="btnNormal">
                                                    <a>Ver Grupos Asociados...</a>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 100px;">
                                    <asp:Label ID="lblPublicidad" runat="server" Text="Habilitar Publicidad"></asp:Label>
                                </td>
                                <td>
                                    <input id="chkActivarPublicidad" type="checkbox" runat="server" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 100px;">
                                    <asp:Label ID="lblPreventaCab" runat="server" Text="PreSelección"></asp:Label>
                                </td>
                                <td>
                                    <input id="chkPreventa" type="checkbox" runat="server" />
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 160px;">
                                    <asp:Label ID="lblFechaPreventaCab" runat="server" Text="Fecha de Inicio Preselección"></asp:Label>
                                </td>
                                <td class="">
                                    <asp:TextBox ID="txtFechaPreventa" runat="server" CssClass="DATETIME" Width="80px"></asp:TextBox>
                                </td>
                            </tr>
                            <tr style="display: none;">
                                <td style="width: 160px;">
                                    <asp:Label ID="lblPreventaNotificacionIniciooCab" runat="server" Text="Notificación Inicio"></asp:Label>
                                </td>
                                <td>
                                    <input id="chkPreventaNotificacionInicio" type="checkbox" runat="server" />
                                </td>
                            </tr>
                            <tr style="display: none;">
                                <td style="width: 160px;">
                                    <asp:Label ID="lblPreventaNotificacionDiarioCab" runat="server" Text="Notificación Diario"></asp:Label>
                                </td>
                                <td>
                                    <input id="chkPreventaNotificacionDiario" type="checkbox" runat="server" />
                                </td>
                            </tr>
                            <tr style="display: none;">
                                <td style="width: 160px;">
                                    <asp:Label ID="lblPreventaNotificacionAntesInicioCab" runat="server" Text="Notificación Antes de Inicio"></asp:Label>
                                </td>
                                <td>
                                    <input id="chkPreventaNotificacionAntesInicio" type="checkbox" runat="server" />
                                </td>
                            </tr>
                            <tr id="trPreventaNotificacionDiasAntesInicio" style="display: none;">
                                <td style="width: 160px;">
                                    <asp:Label ID="Label1" runat="server" Text="Días Antes de Inicio"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtPreventaNotificacionAntesInicio" runat="server"></asp:TextBox>
                                </td>
                            </tr>
                            <tr style="display: none;">
                                <td style="width: 160px;">
                                    <asp:Label ID="lblPreventaVisualizarEquipoCab" runat="server" Text="Preventa Visualizar Equipo"></asp:Label>
                                </td>
                                <td>
                                    <input id="chkPreventaVisualizarEquipo" type="checkbox" runat="server" />
                                </td>
                            </tr>
                            <tr style="display: none;">
                                <td style="width: 185px;">
                                    <asp:Label ID="lblPreventaPreseleccionarEquipoCab" runat="server" Text="Preventa Preseleccionar Equipo"></asp:Label>
                                </td>
                                <td>
                                    <input id="chkPreventaPreseleccionarEquipo" type="checkbox" runat="server" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                </td>
                                <td>
                                </td>
                            </tr>
                        </table>
                        <h3>
                            <asp:Label ID="lblMensajeValidacion" runat="server" ForeColor="Red"></asp:Label></h3>
                    </div>
                </cc1:ContenedorTabJQ>
                <cc1:ContenedorTabJQ ID="tbConfiguracion" Titulo="Configuración" CssClass="dvTabContenido"
                    Style="margin: 0px; padding: 0px; height: auto;">
                    <%--<div id="dvConfiguracionAdicional" style="width:540px; margin:10px; height: auto; overflow: auto;">
                            <table>
                                <tr style="display:none;">
                                    <td style="width: 150px;">
                                        Cancelar pedidos
                                    </td>
                                    <td>
                                        <input id="chkCancelarPedido" type="checkbox" runat="server"/>
                                    </td>
                                </tr>
                                <tr style="Display:none;" class="trCancelarPedidoDias">
                                    <td>
                                        Días máximos para Cancelar pedidos
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtCancelarPedidoDiasMax" runat="server"  Width="40px" MaxLength="2"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr style="Display:none;"class="trCancelarPedidoDias">
                                    <td>
                                        Días máximos para Cancelar pedidos antes del fin de campaña
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtCancelarPedidoDiasMaxFin" runat="server" Width="40px" MaxLength="2"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr style="display:none;">
                                    <td>
                                        Modificar pedidos
                                    </td>
                                    <td>
                                        <input id="chkModificarPedido" type="checkbox" runat="server"/>
                                    </td>
                                </tr>
                                <tr style="display:none;">
                                    <td>
                                        Reservar Productos
                                    </td>
                                    <td>
                                        <input id="chkReservarProducto" type="checkbox" runat="server"/>
                                    </td>
                                </tr>
                                <tr style="Display:none;" class="trReservarProductoDias">
                                    <td>
                                        Días máximos de reserva
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtReservarProductoDiasMax" runat="server" Width="40px" MaxLength="2"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr style="Display:none;" class="trReservarProductoDias">
                                    <td>
                                        Días máximos para reservar pedidos antes del fin de campaña
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtReservarProductoDiasMaxFin" runat="server" Width="40px" MaxLength="2"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr style="Display:none;">
                                    <td>
                                        Genera Código
                                    </td>
                                    <td>
                                        <input id="chkGeneraCodigo" type="checkbox" runat="server"/>
                                    </td>
                                </tr>
                                <tr id="trFormatoCodigo" style="Display:none;">
                                    <td>
                                        Formato Código
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtFormatoCodigo" runat="server" MaxLength="25"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Migrar Contrato
                                    </td>
                                    <td>
                                        <input id="chkMigrarContrato" runat="server" type="checkbox"/>
                                    </td>
                                </tr>
                                <tr style="Display:none;">
                                    <td>
                                        Lugar de entrega
                                    </td>
                                    <td>
                                        <div style="font-size:8pt; margin-top:3px;" >
                                            <asp:RadioButtonList ID="rblstLugarEntrega" runat="server">
                                                <asp:ListItem Text="Oficinas propias" Value="O" Selected="True"></asp:ListItem>
                                                <asp:ListItem Text="Centros de atención del operador" Value="C"></asp:ListItem>
                                            </asp:RadioButtonList>
				                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblDiasRecojo" runat="server" text="Inicio de despacho(Días despues de inicio de campaña)"></asp:Label>
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtDiasRecojo" runat="server" Width="40px" MaxLength="2"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblCantidadPedidosxDia" runat="server" text="Pedidos por día(Despacho)"></asp:Label>
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtCantidadPedidosxDia" runat="server" Width="40px" MaxLength="4"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
                        </div>--%>
                    <iframe id="ifConfiguracion" src="" frameborder="0" style="padding: 0px; margin: 0px;">
                    </iframe>
                </cc1:ContenedorTabJQ>
                <cc1:ContenedorTabJQ ID="tbExtras" Titulo="Extras" CssClass="dvTabContenido" Style="margin: 0px;
                    padding: 0px; height: auto;">
                    <cc1:TabJQ ID="tabExtras" runat="server" CssClass="tabs" Style="margin: 0px; padding: 0px;
                        height: 150px;">
                        <cc1:ContenedorTabJQ ID="tbContratoResumen" Titulo="Contrato Resumen" CssClass="dvTabContenido"
                            Style="margin: 0px; padding: 0px; height: auto;">
                            <iframe id="ifContratoResumen" src="" frameborder="0" style="padding: 0px; margin: 0px;"
                                class="ifExtra"></iframe>
                        </cc1:ContenedorTabJQ>
                        <cc1:ContenedorTabJQ ID="tbSubContrato" Titulo="Sub Contrato" CssClass="dvTabContenido"
                            Style="margin: 0px; padding: 0px; height: auto;">
                            <iframe id="ifSubContrato" src="" frameborder="0" style="padding: 0px; margin: 0px;"
                                class="ifExtra"></iframe>
                        </cc1:ContenedorTabJQ>
                        <cc1:ContenedorTabJQ ID="tbBanner" Titulo="Banner" CssClass="dvTabContenido" Style="margin: 0px;
                            padding: 0px; height: auto;">
                            <iframe id="ifBanner" src="" frameborder="0" style="padding: 0px; margin: 0px;" class="ifExtra">
                            </iframe>
                        </cc1:ContenedorTabJQ>
                        <cc1:ContenedorTabJQ ID="tbLugarEntrega" Titulo="Lugar Entrega" CssClass="dvTabContenido"
                            Style="margin: 0px; padding: 0px; height: auto;">
                            <iframe id="ifLugarEntrega" src="" frameborder="0" style="padding: 0px; margin: 0px;"
                                class="ifExtra"></iframe>
                        </cc1:ContenedorTabJQ>
                        <cc1:ContenedorTabJQ ID="tbCredito" Titulo="Crédito" CssClass="dvTabContenido" Style="margin: 0px;
                            padding: 0px; height: auto;">
                            <iframe id="ifCredito" src="" frameborder="0" style="padding: 0px; margin: 0px;"
                                class="ifExtra"></iframe>
                        </cc1:ContenedorTabJQ>
                        <cc1:ContenedorTabJQ ID="tbListaNegra" Titulo="Lista Negra" CssClass="dvTabContenido"
                            Style="margin: 0px; padding: 0px; height: auto;">
                            <iframe id="ifListaNegra" src="" frameborder="0" style="padding: 0px; margin: 0px;"
                                class="ifExtra"></iframe>
                        </cc1:ContenedorTabJQ>

                        
                        <cc1:ContenedorTabJQ ID="tbFinanciamiento" Titulo="Financiamiento" CssClass="dvTabContenido"
                            Style="margin: 0px; padding: 0px; height: auto;">
                            <iframe id="ifFinanciamiento" src="" frameborder="0" style="padding: 0px; margin: 0px;" 
                                class="ifExtra"></iframe>
                        </cc1:ContenedorTabJQ>


                        <cc1:ContenedorTabJQ ID="tbProductos" Titulo="Productos" CssClass="dvTabContenido"
                            Style="margin: 0px; padding: 0px; height: auto;">
                            <iframe id="ifProductos" src="" frameborder="0" style="padding: 0px; margin: 0px;"
                                class="ifExtra"></iframe>
                        </cc1:ContenedorTabJQ>
                    </cc1:TabJQ>
                </cc1:ContenedorTabJQ>
            </cc1:TabJQ>
        </div>
        <div id="dvAcciones" style="margin-top: 2px;">
            <div id="btnActivar" class="btnNormal" style="background: #C1D8EA">
                <asp:Image ID="imgActivar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Play_16x16.png" />
                <asp:Label ID="lblActivar" runat="server" Text="Iniciar Campaña"></asp:Label>
            </div>
            <div id="btnGuardar" class="btnNormal">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
            <div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cerrar</a>
            </div>
        </div>
        <div id="dvEleccionGruposOrigen" style="display: none; resizable: false;">
            <div class="ui-widget-content ui-corner-all" style="padding: 0px; margin: 0px; background-image: none;
                overflow: auto;">
                <table border="0">
                    <tr>
                        <td style="width: 60px">
                            <asp:Label ID="lblFiltro" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
                        </td>
                        <td rowspan="2" valign="middle" style="width: 200px">
                            En:&nbsp;
                            <asp:DropDownList ID="ddlBusqueda" runat="server" Style="margin-left: 15px; font-weight: normal;
                                disabled: disabled" Width="150px">
                                <asp:ListItem Value="vcGru" Selected="True">Grupo Empleado</asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td rowspan="2" valign="middle" style="width: 220px">
                            Filtrar:&nbsp;
                            <asp:TextBox ID="txtBusqueda" CssClass="txtBusqueda" runat="server" Text="Valor a filtrar"
                                Style="margin-left: 15px; font-weight: normal;" Width="250px" MaxLength="200"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            &nbsp;
                        </td>
                    </tr>
                </table>
            </div>
            <table>
                <tr>
                    <td>
                        <table id="tblPoliticaSolicitudxGrupo">
                        </table>
                        <div id="pager">
                        </div>
                    </td>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <div id="btnAgregarGrupo" class="btnNormal" runat="server" style="width: 180px;">
                                        <asp:Image ID="imgAgregarGrupo" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                        <a>Agregar Grupo Empleado</a>
                                    </div>
                                    <div id="dvContenedorTecRes" runat="server" style="display: none;">
                                        <uc1:BusquedaPrincipal ID="bpTecnicoResponsable" runat="server" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div id="btnQuitarGrupo" class="btnNormal" runat="server" style="width: 180px;">
                                        <asp:Image ID="imgQuitarGrupo" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                        <a>Quitar Grupo Empleado</a>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        <div id="dvExcepcion" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifExcepcion" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
        </div>
        <div id="divMsgConfirmacionGrupo" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>¡Al ser quitado,
            este grupo empleado no tendrá acceso a la opción chat!,<br />
            ¿Desea continuar?
        </div>
        <div id="divConfirmClonacion" style="display: none;">
            ¿Desea clonar los datos extra de una campaña anterior a la campaña que está creando?<br />
            <br />
            Se clonarán los datos de <b>Créditos</b> de empleados y grupos, <b>Lugares de Entrega</b>
            y <b>Financiamiento.</b>
        </div>
        <div id="divCampanaClonacion" style="display: none;">
            Seleccione la campaña de la que se clonarán los datos.
            <table width="100%">
                <tr>
                    <td style="width: 100;">
                        Campaña
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlCampanaClonacion" runat="server" Width="200">
                            <asp:ListItem>Campana 1</asp:ListItem>
                            <asp:ListItem>Campana 2</asp:ListItem>
                            <asp:ListItem>Campana 3</asp:ListItem>
                        </asp:DropDownList>
                    </td>
                </tr>
            </table>
            <br />
            Los datos clonados serán visibles en la próxima edición de la campaña.
        </div>
    </div>
    </form>
</body>
</html>