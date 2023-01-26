<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Imp_EliminarRegistros" Codebehind="Imp_EliminarRegistros.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
    <head runat="server">
        <title></title>
        <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
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

        <%--kendo --%>
        <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
        <link href="../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet"
            type="text/css" />
        <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/KendoUI/cultures/kendo.culture.es-ES.min.js" type="text/javascript"></script>

        <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
        <script src="Imp_EliminarRegistros.js" type="text/javascript"></script>
        <style type="text/css">
            .dvCargandoMnt
            {
                background: url('../../../../Common/Images/Mantenimiento/Cargando.gif') no-repeat right center;
                width: 64px;
                height: 64px;
                top: 36%;
                left: 50%;
                z-index: 20;
                position: fixed;
                display: block;
            }
            .style1
            {
                text-align: right;
            }

            .demo-section label {
                display: block;
                margin: 15px 0 5px 0;
            }

            .k-multiselect {
            padding: 0px !important;
            border: 1px solid rgb(221, 221, 221) !important;
            }
        </style>
    </head>
    <body>
        <form id="form1" runat="server">
            <asp:HiddenField ID="HdfTotalCheckOperador" runat ="server" />
            <div id="dvCargando" class="dvCargando"></div>
            <div id="divMsgConfirmacion" style="display:none;">
                <span class="ui-icon ui-icon-alert" style="float:left;"></span>
                ¡Se eliminará de forma permanente los registros de llamadas segun el criterio seleccionado!, ¿Desea continuar?
            </div>
            <div id="Contenido">
                <div class="dvPanel" style="padding:10px;">
                    <div>
                        Desde: <asp:TextBox ID="txtFechaInicio" runat="server" Width="90px" CssClass="DATE"></asp:TextBox>
                        &nbsp;&nbsp;
                        Hasta <asp:TextBox ID="txtFechaFin" runat="server" Width="90px" CssClass="DATE"></asp:TextBox>
                    </div>
                    <br />
                    <div>
                        <table>
                            <tr>
                                <td>Tipo telefonia: </td>
                                <td>
                                    <asp:DropDownList ID="ddlTipoTelefonia" runat="server" Width="249px"></asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>Tipo llamada: </td>
                                <td>
                                    <asp:DropDownList ID="ddlTipoLlamada" runat="server" Width="249px"></asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>Tipo plantilla: </td>
                                <td>
                                    <asp:DropDownList ID="ddlTipoPlantilla" runat="server" Width="249px"></asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td class="style1">
                                    Cuenta:</td>
                                <td>
                                    <asp:DropDownList ID="ddlCuentas" runat="server" Width="249px" multiple="multiple" data-placeholder="Seleccione una cuenta...">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <br />                    
                    <div class="ui-tabs-panel ui-widget-content ui-corner-all" style="padding:10px;width:300px;">
                        <table>
                            <tr>
                                <td>
                                    <asp:CheckBox ID="chkOperador" runat="server" ToolTip="Marcar/Desmarcar todos"/>
                                </td>
                                <td style="font-weight:bold;" >
                                    <h3>
                                        Operadores                                    
                                    </h3>
                                </td>
                            </tr>
                        </table>
                        <asp:CheckBoxList ID="chklstOperador" runat="server"></asp:CheckBoxList>
                    </div>
                </div>
                <br />
                <div id="btnProcesar" class="btnNormal" runat="server">
                    <asp:Image ID="imgProcesar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Procesar.png" />
                    <a>Procesar</a>
                </div>
                <div id="btnCerrar" class="btnNormal">
                    <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    <a>Salir</a>
                </div>
            </div>
        </form>
    </body>
</html>