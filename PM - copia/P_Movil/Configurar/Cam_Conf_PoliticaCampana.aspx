<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Configurar_CAM_Conf_PoliticaCampana"
    CodeBehind="Cam_Conf_PoliticaCampana.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/knockout.validation.min.js"
        type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/date.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/VistaModelo/MOV_CAM_CampanaConfiguracion.js" type="text/javascript"></script>
    <script src="Cam_Conf_PoliticaCampana.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfIdCampanaConfiguracion" runat="server" />
    <asp:HiddenField ID="hdfIdCampana" runat="server" />
    <div id="dvContenido">
        <div id="dvCampos" class="dvPanel" style="overflow: auto; font-size: 1.1em; font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;">
            <table>
                <tr>
                    <td style="width: 300px;">
                        <asp:Label ID="label1" runat="server" Text="Cancelar pedidos"></asp:Label>
                    </td>
                    <td class="tdEntrada" style="width: 50px;">
                        <input id="chkCancelarPedido" type="checkbox" runat="server" />
                    </td>

                </tr>
                <tr style="display: none;" class="trCancelarPedidoDias">
                    <td>
                        <asp:Label ID="label2" runat="server" Text="Días máximos para Cancelar pedidos"></asp:Label>
                    </td>
                    <td class="tdEntrada">
                        <asp:TextBox ID="txtCancelarPedidoDiasMax" runat="server" Width="30px" MaxLength="2"></asp:TextBox>
                    </td>

                </tr>
                <tr style="display: none;" class="trCancelarPedidoDias">
                    <td>
                        <asp:Label ID="label3" runat="server" Text="Días máximos para Cancelar pedidos antes del fin de campaña"></asp:Label>
                    </td>
                    <td class="tdEntrada">
                        <asp:TextBox ID="txtCancelarPedidoDiasMaxFin" runat="server" Width="30px" MaxLength="2"></asp:TextBox>
                    </td>

                </tr>
                <tr>
                    <td>
                        <asp:Label ID="label4" runat="server" Text="Modificar pedidos"></asp:Label>
                    </td>
                    <td class="tdEntrada">
                        <input id="chkModificarPedido" type="checkbox" runat="server" />
                    </td>

                </tr>
                <tr style="display: none;">
                    <td>
                        <asp:Label ID="label5" runat="server" Text="Reservar Productos"></asp:Label>
                    </td>
                    <td class="tdEntrada">
                        <input id="chkReservarProducto" type="checkbox" runat="server" />
                    </td>

                </tr>
                <tr style="display: none;" class="trReservarProductoDias">
                    <td>
                        <asp:Label ID="label6" runat="server" Text="Días máximos de reserva"></asp:Label>
                    </td>
                    <td class="tdEntrada">
                        <asp:TextBox ID="txtReservarProductoDiasMax" runat="server" Width="40px" MaxLength="2"></asp:TextBox>
                    </td>

                </tr>
                <tr style="display: none;" class="trReservarProductoDias">
                    <td>
                        Días máximos para reservar pedidos antes del fin de campaña
                    </td>
                    <td class="tdEntrada">
                        <asp:TextBox ID="txtReservarProductoDiasMaxFin" runat="server" Width="40px" MaxLength="2"></asp:TextBox>
                    </td>

                </tr>
                <tr style="display: none;">
                    <td>
                        Genera Código
                    </td>
                    <td class="tdEntrada">
                        <input id="chkGeneraCodigo" type="checkbox" runat="server" />
                    </td>

                </tr>
                <tr id="trFormatoCodigo" style="display: none;">
                    <td>
                        Formato Código
                    </td>
                    <td class="tdEntrada">
                        <asp:TextBox ID="txtFormatoCodigo" runat="server" MaxLength="25"></asp:TextBox>
                    </td>

                </tr>
                <tr>
                    <td>
                        Migrar Contrato
                    </td>
                    <td class="tdEntrada">
                        <input id="chkMigrarContrato" runat="server" type="checkbox" />
                    </td>

                </tr>
                <tr style="display: none;">
                    <td>
                        Lugar de entrega
                    </td>
                    <td class="tdEntrada">
                        <div style="font-size: 8pt; margin-top: 3px;">
                            <asp:RadioButtonList ID="rblstLugarEntrega" runat="server">
                                <asp:ListItem Text="Oficinas propias" Value="O" Selected="True"></asp:ListItem>
                                <asp:ListItem Text="Centros de atención del operador" Value="C"></asp:ListItem>
                            </asp:RadioButtonList>
                        </div>
                    </td>

                </tr>
                <tr>
                    <td>
                        <asp:Label ID="Label8" runat="server" Text="Días de antiguedad del Pedido"></asp:Label>
                    </td>
                    <td class="tdEntrada">
                        <asp:TextBox ID="txtDiasAntiguedad" runat="server" Width="40px" MaxLength="2"></asp:TextBox>
                    </td>

                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblDiasRecojo" runat="server" Text="Inicio de despacho(Días despues de inicio de campaña)"></asp:Label>
                    </td>
                    <td class="tdEntrada">
                        <asp:TextBox ID="txtDiasRecojo" runat="server" Width="40px" MaxLength="2"></asp:TextBox>
                    </td>

                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblCantidadPedidosxDia" runat="server" Text="Pedidos por día(Despacho)"></asp:Label>
                    </td>
                    <td class="tdEntrada">
                        <asp:TextBox ID="txtCantidadPedidosxDia" runat="server" Width="40px" MaxLength="4"></asp:TextBox>
                    </td>

                </tr>
                <tr>
                    <td>
                        Elegir lugar de entrega
                    </td>
                    <td class="tdEntrada">
                        <input id="chkElegirLugarEntrega" runat="server" type="checkbox" />
                    </td>

                </tr>
                <tr>
                    <td>
                        Renovar Plan
                    </td>
                    <td class="tdEntrada">
                        <input id="chkRenovarPlan" runat="server" type="checkbox" />
                    </td>

                </tr>
                <%--jbalmaceda 20160708 151200--%>
                <tr>
                    <td>
                        Gastos Administrativos
                    </td>
                    <td class="tdEntrada">
                        <input id="chk_gadministrativos" name="chk_gadministrativos" runat="server" type="checkbox" />
                    </td>
                </tr>
                <tr style="display: none;" class="trMontoGastosAdmin">
                    <td>
                        <asp:Label ID="label7" runat="server" Text="Monto de Gastos Administrativos"></asp:Label>
                    </td>
                    <td class="tdEntrada">
                        <asp:TextBox runat="server" ID="txt_montogadmin" Width="40px" value="0.00" MaxLength="10"></asp:TextBox>
                    </td>

                </tr>
                <tr>
                    <td>
                        Usar Planes Dependientes
                    </td>
                    <td class="tdEntrada">
                        <input id="chk_usarPlanesPend" name="chk_usarPlanesPend" runat="server" type="checkbox" />
                    </td>
                    <td style="width: 50px; display: none;">
                        <%--jbalmaceda 20160718 111600 --%>
                        <div id="btnCreaDependencias" class="btnNormal" title="Crear Dependencias" style="display: none;">
                            <asp:Image ID="Image1" runat="server" Height="16px" ImageUrl="~/Common/Images/Mantenimiento/copy_hover.png" />
                    
                        </div>    
                    </td>
                    <%--chk_usarPlanesPend "Usar Planes Dependientes"--%>

                </tr>
                <%--Actualizar en versión 3.1--%>
                <tr>
                    <td>
                        Usar Contrato Resumen
                    </td>
                    <td class="tdEntrada">
                        <input type="checkbox" name="chkUsarContratoResumen" id="chkUsarContratoResumen" runat="server"/>
                    </td>
                </tr>
                <tr id="trFechaGenConRes">
                    <td>Fecha de generación de Contrato Resumen</td>
                    <td class="tdEntrada">
                        <asp:TextBox ID="txtFechaGenConRes" runat="server" Width="60"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>Portabilidad</td>
                    <td class="tdEntrada">
                        <input type="checkbox" name="chkPortabilidad" id="chkPortabilidad" runat="server"/>
                    </td>
                </tr>
                <tr style="display:none;">
                    <td>Portabilidad Plan</td>
                    <td class="tdEntrada">
                        <input type="checkbox" name="chkPortabilidadPlan" id="chkPortabilidadPlan" runat="server"/>
                    </td>
                </tr>
            </table>
            <%--
                <table>
                    <tr>
                        <td>
                            Cancelar pedidos
                        </td>
                        <td>
                            <input id="chkCancelarPedido" type="checkbox" data-bind="checked: CancelarPedido"/>
                        </td>
                    </tr>
                    <tr id="trCancelarPedidoDiasMax" style="Display:none;">
                        <td>
                            Días máximos para Cancelar pedidos
                        </td>
                        <td>
                            <asp:TextBox ID="txtCancelarPedidoDiasMax" runat="server"  Width="40px" MaxLength="3" data-bind="value: CancelarPedidoDiasMax"></asp:TextBox>
                        </td>
                    </tr>
                    <tr id="trCancelarPedidoDiasMaxFin" style="Display:none;">
                        <td>
                            Días máximos para Cancelar pedidos antes del fin de campaña
                        </td>
                        <td>
                            <asp:TextBox ID="txtCancelarPedidoDiasMaxFin" runat="server" Width="40px" MaxLength="3" data-bind="value: CancelarPedidoDiasMaxFin"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblMigrarContrato" runat="server" text="Migrar Contrato"></asp:Label>
                        </td>
                        <td>
                            <input id="chkMigrarContrato" type="checkbox" data-bind="checked: MigrarContrato"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Modificar pedidos
                        </td>
                        <td>
                            <input id="chkModificarPedido" type="checkbox" data-bind="checked: ModificarPedido"/>
                        </td>
                    </tr>
                    <tr style="display:none;">
                        <td>
                            Reservar Productos
                        </td>
                        <td>
                            <input id="chkReservarProducto" type="checkbox" data-bind="checked: ReservarProducto"/>
                        </td>
                    </tr>
                    <tr id="trReservarProductoDiasMax" style="Display:none;">
                        <td>
                            Días máximos de reserva
                        </td>
                        <td>
                            <asp:TextBox ID="txtReservarProductoDiasMax" runat="server" MaxLength="3" data-bind="value: ReservarProductoDiasMax"></asp:TextBox>
                        </td>
                    </tr>
                    <tr id="trReservarProductoDiasMaxFin" style="Display:none;">
                        <td>
                            Días máximos para reservar pedidos antes del fin de campaña
                        </td>
                        <td>
                            <asp:TextBox ID="txtReservarProductoDiasMaxFin" runat="server" MaxLength="3" data-bind="value: ReservarProductoDiasMaxFin"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Lugar de entrega
                        </td>
                        <td>--%>
            <%--<div style="font-size:8pt; margin-top:3px;" data-bind='foreach: lstLugarEntrega'>--%>
            <%--<div style="font-size:8pt; margin-top:3px;" >
					            <label>--%>
            <%--<input type="radio" name="rblstLugarEntrega" data-bind='value: valor, checked: $parent.LugarEntrega'/><span data-bind='text: texto'></span>--%>
            <%--<div style="font-size:8pt; margin-top:3px;" data-bind="foreach: lstLugarEntrega">--%>
            <%--     <div style="font-size:8pt; margin-top:3px;" >
					            <label>						            
                                    <input type="radio" name="rblstLugarEntrega"  value="C"><span>Centros de atención del operador</span>
					            </label>				            
					            <label>						            
                                    <input type="radio" name="rblstLugarEntrega" checked="checked" value="O"><span>Oficinas propias</span>
					            </label>
				            </div>
					            </label>
				            </div>--%>
            <%--        </td>
                    </tr>
                    <tr>
                        <td>
                            Genera Código
                        </td>
                        <td>
                            <input id="chkGeneraCodigo" type="checkbox" data-bind="checked: GenerarCodigo"/>
                        </td>
                    </tr>
                    <tr id="trFormatoCodigo" style="Display:none;">
                        <td>
                            Formato Código
                        </td>
                        <td>
                            <asp:TextBox ID="txtFormatoCodigo" runat="server" data-bind="value: FormatoCodigo" MaxLength="25"></asp:TextBox>
                        </td>
                    </tr>
                </table>--%>
        </div>
        <div id="dvAcciones" style="margin-top: 2px; display: none;">
            <div id="btnGuardar" class="btnNormal">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
            <div id="btnCerrar" class="btnNormal" style="display: none;">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cerrar</a>
            </div>
            <%--jbalmaceda 20160718 125000 --%>
            <%--<div id="dvCrearPlanesDependencia" style="display: none;">--%>
            <div id="dvCrearPlanesDependencia">
                <table width="100%">
                    <tr id="tr">
                        <td>
                            <table id="tbPlanesDepCab">
                                <tr>
                                    <td>
                                        <label>
                                            &nbsp;&nbsp;&nbsp; Plan Base:</label>
                                        <asp:DropDownList ID="ddlPlanBase" runat="server" Style="margin-left: 15px; font-weight: normal;"
                                            Width="150px">
                                        </asp:DropDownList>
                                    </td>
                                    <td>
                                        <label>
                                            &nbsp;&nbsp;&nbsp; Plan Dependiente:</label>
                                        <asp:DropDownList ID="ddlPlanDep" runat="server" Style="margin-left: 15px; font-weight: normal;"
                                            Width="150px">
                                        </asp:DropDownList>
                                    </td>
                                    <td>
                                        <label>
                                            &nbsp;Nombre Corto:</label>
                                        <input type="text" name="txtNomCorto" id="txtNomCorto" placeholder="(Máx. caractéres 50)"
                                            maxlength="50" />
                                        <p>
                                        </p>
                                        <p>
                                        </p>
                                        <input type="hidden" id="hfRetrieveIdCampana" name="hfRetrieveIdCampana" />
                                        <input type="hidden" id="hfRetrieveIdPlanDep" name="hfRetrieveIdPlanDep" />
                                    </td>
                                    <td>
                                        <div id="btnAgregarAGrilla" name="btnAgregarAGrilla" class="btnNormal ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                            title="Agregar éste plan">
                                            <span class="ui-button-text">
                                                <img id="imgAgregar" src="../../../Common/Images/Mantenimiento/add_16x16.gif">
                                                <a></a></span>
                                        </div>
                                    </td>
                                    <table id="tbPlanesDependencia" name="tbPlanesDependencia" style="width: 797px; height: 20px;
                                        border: 1px solid blue; margin-left: 18px;">
                                        <tr>
                                            <td>
                                            lkjlkj<br />
                                            lkjlkj<br />
                                            lkjlkj<br />
                                            lkjlkj<br />
                                            lkjlkj<br />
                                            lkjlkj<br />
                                            lkjlkj<br />
                                            lkjlkj<br />
                                            lkjlkj<br />
                                            lkjlkj<br />
                                            </td>
                                        </tr>
                                    </table>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    </form>
</body>
</html>
