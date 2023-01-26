<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Imp_ActualizarRegistros"
    CodeBehind="Imp_ActualizarRegistros.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
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
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.draggable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.resizable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.autocomplete.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/date.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/cultures/kendo.culture.es-ES.min.js" type="text/javascript"></script>
    <script src="Imp_ActualizarRegistros.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="dvCargando" class="dvCargando">
    </div>
    <div id="divMsgConfirmacion" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>¡Se actualizará
        de forma permanente los registros de llamadas segun el criterio seleccionado!, ¿Desea
        continuar?
    </div>
    <div id="BarraNavegacionJQ1" class="ui-accordion ui-widget ui-helper-reset" style="margin-left: 0px;">
        <div id="BarraNavegacionJQ1_Panel1" runat="server" style="">
            <h3 class="ui-helper-reset ui-accordion-header ui-state-active ui-corner-top" style="width: 100%;
                margin-top: 15px; display: block;">
                <a href="#BarraNavegacionJQ1_Panel1_O" style="cursor: default;">Tareas</a> <span
                    class='ui-icon ui-icon-circle-triangle-n' style="margin-left: 95%; display: none;">
                </span>
                <input type="hidden" value="1" />
            </h3>
            <div id="BarraNavegacionJQ1_Panel1_O" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active"
                runat="server" style="width: 100%; margin: 0px; padding: 0px; padding-top: 15px;
                padding-bottom: 15px; margin-top: -1px;">
                <h4 id="BarraNavegacionJQ1_Panel1_O_Item1" runat="server" url="" title="" click=""
                    class="PanelBarraNavegacionItem">
                    <div style="font-weight: normal; padding-left: 10px; padding-right: 10px;">
                        <asp:RadioButtonList ID="rlstTarea" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Selected="True" Value="7">Actualizar Llamadas</asp:ListItem>
                        </asp:RadioButtonList>
                        <%--<asp:RadioButtonList ID="rlstTarea" runat="server" RepeatDirection="Horizontal" Visible = "False">
                                    <asp:ListItem Selected="True" Value="7">Importar y validar</asp:ListItem>
                                    <asp:ListItem Value="8">Importar y validar muestra</asp:ListItem>
                                    <asp:ListItem Value="9">Solo validar</asp:ListItem>
                                </asp:RadioButtonList>--%>
                    </div>
                </h4>
            </div>
        </div>
        <div id="BarraNavegacionJQ1_Panel2" runat="server" style="">
            <h3 class="ui-accordion-header ui-helper-reset ui-state-active ui-corner-top" style="width: 100%;
                margin-top: 15px; display: block;">
                <a href="#BarraNavegacionJQ1_Panel2_O" style="cursor: default;">Programación de actualización</a>
                <span class='ui-icon ui-icon-circle-triangle-n' style="margin-left: 95%; display: none;">
                </span>
                <input type="hidden" value="1" />
            </h3>
            <div id="BarraNavegacionJQ1_Panel2_O" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active"
                runat="server" style="width: 100%; margin: 0px; padding: 0px; padding-top: 15px;
                padding-bottom: 15px; margin-top: -1px;">
                <h4 id="BarraNavegacionJQ1_Panel2_O_Item1" runat="server" url="" title="" click=""
                    class="PanelBarraNavegacionItem">
                    <div style="font-weight: normal; padding-left: 10px; padding-right: 10px;">
                        <table>
                            <tr>
                                <td>
                                    <asp:RadioButtonList ID="rbProgramacion" runat="server" RepeatDirection="Horizontal">
                                        <asp:ListItem Selected="True" Value="0">Ahora</asp:ListItem>
                                        <asp:ListItem Value="1">Programado</asp:ListItem>
                                    </asp:RadioButtonList>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtFechaProgramacion" runat="server" CssClass="DATETIME"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </div>
                </h4>
            </div>
        </div>
        <div id="BarraNavegacionJQ1_Panel3" runat="server" style="">
            <h3 class="ui-accordion-header ui-helper-reset ui-state-active ui-corner-top" style="width: 100%;
                margin-top: 15px; display: block;">
                <a href="#BarraNavegacionJQ1_Panel3_O" style="cursor: default;">Proceso</a> <span
                    class='ui-icon ui-icon-circle-triangle-n' style="margin-left: 95%; display: none;">
                </span>
                <input type="hidden" value="1" />
            </h3>
            <div id="BarraNavegacionJQ1_Panel3_O" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active"
                runat="server" style="width: 100%; margin: 0px; padding: 0px; padding-top: 15px;
                padding-bottom: 15px; margin-top: -1px;">
                <h4 id="BarraNavegacionJQ1_Panel3_O_Item1" runat="server" url="" title="" click=""
                    class="PanelBarraNavegacionItem">
                    <div style="font-weight: normal; padding-left: 10px; padding-right: 10px;">
                        <table id="Table1" runat="server">
                            <tr>
                                <td>
                                    Operador
                                </td>
                                <td colspan="3">
                                    <asp:DropDownList ID="ddlOperador" runat="server" Width="272px">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Tipo Plantilla
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlTipoPlantilla" runat="server" Width="272px">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <%--<tr>
                                <td>
                                    Tipo de Telefonía:
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlTipoTelefonia" runat="server" Width="272px">
                                    </asp:DropDownList>
                                </td>
                            </tr>--%>
                            <tr>
                                <td>
                                    Tipo de Llamada:
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlTipoLlamada" runat="server" Width="272px">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Periodo
                                </td>
                                <td>
                                    <%--<asp:TextBox ID="txtPeriodo" runat="server" CssClass="MESANHO" Width="80px"></asp:TextBox>--%>
                                    Desde:
                                    <asp:TextBox ID="txtFechaInicio" runat="server" Width="90px" CssClass="MESANHOINI"></asp:TextBox>
                                    &nbsp;&nbsp; Hasta
                                    <asp:TextBox ID="txtFechaFin" runat="server" Width="90px" CssClass="MESANHOFIN"></asp:TextBox>
                                </td>
                            </tr>
                            <tr id="trRangoXDias">
                                <td>
                                    <asp:CheckBox ID="chkRangoXDias" runat="server" Text="Rango de Fechas(Días)" Checked="false" />
                                </td>
                                <td>
                                    <%--<asp:TextBox ID="txtPeriodo" runat="server" CssClass="DIAMESANHO" Width="80px"></asp:TextBox>--%>
                                    Desde:
                                    <asp:TextBox ID="TxtDiaInicial" runat="server" Width="80px" CssClass="DIAMESANIO"></asp:TextBox>
                                    &nbsp;&nbsp; Hasta
                                    <asp:TextBox ID="TxtDiaFinal" runat="server" Width="80px" CssClass="DIAMESANIO"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td valign="top">
                                    <asp:CheckBox ID="chkActGenLin" runat="server" Text="Actualización general (reasignación de empleados mediante líneas)"
                                        Checked="false" />
                                    <table>
                                        <tr>
                                            <td id="tdTodaLinea" style="display: none;">
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<asp:CheckBox ID="chkTodaLinea"
                                                    runat="server" Text="Actualizar Todas las Lineas" Checked="true" />
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td colspan="3">
                                    <table id="tblLineas">
                                        <tr>
                                            <td>
                                                <div id="divLineas">
                                                    <table id="tbLineas">
                                                    </table>
                                                </div>
                                            </td>
                                            <td>
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <div id="btnAgregarLinea" class="btnNormal" style="width: 110px;">
                                                                <asp:Image ID="imgAgregarLinea" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                                <a>Agregar</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div id="btnEliminarLinea" class="btnNormal" style="width: 110px; height: 20px;">
                                                                <asp:Image ID="imgEliminarLinea" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" />
                                                                <a>Eliminar</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div id="btnQuitarTodo" class="btnNormal" style="width: 110px;">
                                                                <asp:Image ID="imgQuitarTodo" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.gif" />
                                                                <a>Quitar Todo</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:CheckBox ID="chkServicioOff" runat="server" Text="Actualización de Servicios"
                                        Checked="false" />
                                </td>
                                <td colspan="3">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:CheckBox ID="chkActualizarConceptos" runat="server" Text="Actualización de Conceptos"
                                        Checked="false" />
                                </td>
                                <td colspan="3">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:CheckBox ID="chkActPrefijos" runat="server" Text="Actualización de Prefijos(Reemplazar)"
                                        Checked="false" />
                                </td>
                                <td colspan="3" style="display: none;" id="trPlantilla">
                                    <asp:DropDownList ID="ddlPlantilla" runat="server" Width="272px">
                                        <asp:ListItem Value="-1" Selected="True" Text="<Seleccionar>"></asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:CheckBox ID="chkActualizacionDesconocidos" runat="server" Text="Actualización de Desconocidos"
                                        Checked="false" />
                                </td>
                                <td colspan="3">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:CheckBox ID="chkActualizaNumeros" runat="server" Text="Actualización de Números"
                                        Checked="false" />
                                </td>
                                <td colspan="3">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <%--<asp:CheckBox ID="chkActualizarCostosDP" runat="server" Text="Actualizacion de Costos en base al Plan" Checked="false"/>--%>
                                    <asp:CheckBox ID="chkActualizarCostosDP" runat="server" Text="Actualización de Costos"
                                        Checked="false" />
                                    <table>
                                        <tr>
                                            <td id="tbTipCos" style="display: none;">
                                                <asp:RadioButtonList ID="chklstTipoCosteo" runat="server" RepeatDirection="Vertical">
                                                    <asp:ListItem Value="1" Text="Cantidad asignada Según Planes/Bolsas" />
                                                    <asp:ListItem Value="0" Text="Cantidad consumida según Importación de llamadas" />
                                                </asp:RadioButtonList>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td colspan="3">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:CheckBox ID="chkActualizacionAcumumlados" runat="server" Text="Actualización de Acumulados"
                                        Checked="true" />
                                </td>
                            </tr>
                        </table>
                    </div>
                </h4>
            </div>
        </div>
    </div>
    <br />
    <div>
        <asp:Button ID="btnGuardarSer" runat="server" Text="" />
        <div id="btnGuardar" class="btnNormal">
            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
            <a>Guardar</a>
        </div>
        <div id="Div1" class="btnNormal">
            <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
            <a>Salir</a>
        </div>
    </div>
    <div id="divLineaDialog" style="display: none;">
        <table>
            <tr>
                <td>
                    Linea:
                </td>
                <td>
                    <asp:TextBox ID="txtLinea" runat="server" Width="200px"></asp:TextBox>
                    <asp:HiddenField ID="hdfLinea" runat="server" />
                    <asp:HiddenField ID="hdfNomEmp" runat="server" />
                </td>
            </tr>
        </table>
        <br />
        <div style="text-align: right;">
            <div id="btnAgregarDialogLinea" class="btnNormal">
                <asp:Image ID="imgAgregarDialogLinea" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                <a>Agregar</a>
            </div>
            <div id="btnCerrarDialogLinea" class="btnNormal">
                <asp:Image ID="imgCerrarDialogLinea" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cerrar</a>
            </div>
        </div>
    </div>
    <div id="divMsgConfirmacionAcumulados" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <%--Se procederá a liberar el Dispositivo de la Línea por que no está dentro del grupo de Empleado o no está asignado al Empleado seleccionado. <br /><br />--%>
        Al desactivar esta opción no se realizará la <b>Actualización de Acumulados</b>,
        esto hará que la información de Resumen e Histórico no coincida con el detalle.
        <br />
        <br />
        ¿Desea continuar?
    </div>
    </form>
</body>
</html>
