<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="ATE_Listado.aspx.vb" Inherits=".ATE_Listado" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<%@ Register src="../../Common/Controles/ExportarExcelGenerico.ascx" tagname="ExportarExcelGenerico" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <script src="ATE_Listado.js" type="text/javascript"></script>

    <style>
        .no-close .ui-dialog-titlebar-close {display: none;}
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfEsAutomatico" runat="server" />
        <asp:HiddenField ID="hdfNumSegAteAct" runat="server" />

        <asp:HiddenField ID="hdfIdVentanilla" runat="server" />
        <asp:HiddenField ID="hdfEstadoVentanilla" runat="server" />
        <asp:HiddenField ID="hdfOpcionVentanilla" runat="server" />
        <asp:HiddenField ID="hdfTipoPausaVentanilla" runat="server" />

        <asp:HiddenField ID="hdfIdOperador" runat="server" />
        <asp:HiddenField ID="hdfEstadoOperador" runat="server" />

        <asp:HiddenField ID="hdfIdAtencion" runat="server" />
        <asp:HiddenField ID="hdfEstadoAtencion" runat="server" />

        <asp:HiddenField ID="hdfEsSupervisor" runat="server" />

        <cc1:TabJQ runat="server" ID="TabDetalle" CssClass="tabs" style="margin-top:1px;">
            <cc1:ContenedorTabJQ Titulo="Detalle">
                <table width="100%">
                    <tr class="trToolBar" align="center">
                        <td align="center">
                            <div id="toolbar" class="dvPanel" style="margin:0px !important; padding:0px !important;">
                                <table border="0" width="100%">
                                    <tr>
                                        <%--<td style="width:30px; padding-right:10px; text-align:left;">
                                            <table id="tbAcciones" cellpadding="0" cellspacing="0">
                                                <tr>--%>
<%--                                                    <td>
                                                        <div id="btnAsignar" class="btnNormal" runat="server" title="Asignar Atención" style="height:24px;">
                                                            <asp:Image ID="imgAsignar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Asignar.png" />
                                                        </div>
                                                    </td>
--%>                                                    <%--<td>
                                                        <div id="btnLlamar" class="btnNormal" runat="server" title="Llamar Atención" style="height:24px;">
                                                            <asp:Image ID="imgLlamar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Visualizador.png" />
                                                        </div>                            
                                                    </td>--%>
<%--                                                    <td>
                                                        <div id="btnAtender" class="btnNormal" runat="server" title="Atender Atención" style="height:24px;">
                                                            <asp:Image ID="imgAtender" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Atender.png" />
                                                        </div>                            
                                                    </td>--%>
                                                    <%--<td>
                                                        <div id="btnRetomar" class="btnNormal" runat="server" title="Retomar Atención" style="height:24px;">
                                                            <asp:Image ID="imgRetomar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Regresar.png" />
                                                        </div>                            
                                                    </td>--%>
                                                    <%--<td>
                                                        <div id="btnCancelar" class="btnNormal" runat="server" title="Cancelar Atención" style="height:24px;">
                                                            <asp:Image ID="imgCancelar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Cancelar.png" />
                                                        </div>                            
                                                    </td>--%>
                                                <%--</tr>
                                            </table>
                                        </td>--%>
                                        <td style="width:100px; padding-right:10px; text-align:left;">
                                            <table id="tbVista" cellpadding="0" cellspacing="0" >
                                                <tr>
                                                    <td>
                                                        <div id="btnVista" class="btnNormal" runat="server" title="Elija un tipo de vista" click="ConfigurarFiltroRegistro">
                                                            <asp:Image ID="imgVista" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Views.png" />
                                                        </div>                                                
                                                    </td>
                                                    <td style="width:95px; text-align:left;">
                                                        &nbsp;<span id="lblVista"></span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td style="width:65px; padding-right:10px; text-align:left;">
                                            <table id="tbAutomatico" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <div id="btnAutomatico" class="btnNormal" runat="server" title="Activar modo automático">
                                                            <asp:Image ID="imgAutomatico" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Tarea.png" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div id="btnManual" class="btnNormal" runat="server" title="Activar modo manual">
                                                            <asp:Image ID="imgManual" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Proceso.png" />
                                                        </div>                            
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td style="width:70px; padding-right:10px;">
                                            <table id="tbEstados" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <div id="btnDisponible" class="btnNormal" runat="server" title="Operador disponible" style="display:none;">
                                                            <asp:Image ID="imgDisponible" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Aprobar.png" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div id="btnPausa" class="btnNormal" runat="server" title="Operador en pausa" style="display:none;">
                                                            <asp:Image ID="imgFueraServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/btnCancel.png" />
                                                        </div>                            
                                                    </td>
                                                    <td>
                                                        <div id="btnDisponibleVentanilla" class="btnNormal" runat="server" title="Ventanilla disponible">
                                                            <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Semaforos/Verde_16x16.png" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div id="btnPausaVentanilla" class="btnNormal" runat="server" title="Ventanilla en pausa">
                                                            <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Semaforos/Ambar_16x16.png" />
                                                        </div>                            
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td style="width:40px; padding-right:10px;">
                                            <table id="tbExportar" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <uc1:ExportarExcelGenerico ID="eegAtenciones" runat="server" />
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td style="width:280px;">
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="width:50px; height:32px; padding-right:5px;" >
                                                        <asp:Label ID="lblFiltro" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
                                                    </td>
                                                    <td style="padding-right:2px;"><asp:DropDownList ID="ddlFiltro" runat="server" Width="85px"></asp:DropDownList></td>
                                                    <td><asp:TextBox ID="txtFiltro" runat="server" Width="150px" MaxLength="100"></asp:TextBox></td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td align="left" style="width:140px; padding-right:10px;">
                                            <asp:CheckBox ID="chkAtencionesDeHoy" runat="server" Text="Sólo atenciones del día" Checked="true"/>
                                        </td>
                                        <td style="padding-right:5px;">
                                            <table>
                                                <tr>
                                                    <td>
                                                        <div id="divAte" style="float: left; padding: 1px 3px; cursor: pointer; display:none; border-width: 0px !important "
                                                            class="ui-state-highlight ui-corner-all">
                                                            <span id="dd" class="ui-icon ui-icon-info" style="float: left;"></span>
                                                            <asp:Label Style="float: left;" ID="lbltotal" runat="server" Text=""></asp:Label>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td></td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table id="grid"></table>
                            <div id="pager"></div>
                        </td>
                    </tr>
                </table>
            </cc1:ContenedorTabJQ>
        </cc1:TabJQ>

        <div style="margin-top:5px;"></div>
        <div id="dvTipoPausa" style="display:none;">
            <iframe id="ifTipoPausa" frameborder="0" style="padding: 0px; margin: 0px; height: 100px; width:350px;"></iframe>
        </div>
        <div id="divVen" style="display:none;">
            <table>
                <tr>
                    <td style="width:80px;">Ventanilla</td>
                    <td><asp:DropDownList id="ddlVentanilla" runat="server" Width="180px"></asp:DropDownList></td>
                </tr>
                <tr style="height:5px;" ><td colspan="2"></td></tr>
                <tr>
                    <td colspan="2">
                        <asp:Label ID="lblMensaje" runat="server" Text="" style="color:Red;"></asp:Label>
                    </td>
                </tr>
            </table>
        </div>
        <div id="dvVistas" class="dvPanel" style="display:none; width:92px;">
            <table width ="100%" border="0" cellpadding ="0" cellspacing ="0">
                <tr id="trGeneral"><td><asp:RadioButton ID="rbtGeneral" runat="server" Text="General" GroupName="rbtnVistas" Checked="true"/></td></tr>
<%--                <tr id="trPendiente"><td><asp:RadioButton ID="rbtPendiente" runat="server" Text="Pendientes" GroupName="rbtnVistas"/></td></tr>
                <tr id="trAsignada"><td><asp:RadioButton ID="rbtAsignada" runat="server" Text="Asignadas" GroupName="rbtnVistas" /></td></tr>
                <tr id="trLlamada"><td><asp:RadioButton ID="rbtLlamada" runat="server" Text="Llamadas" GroupName="rbtnVistas"/></td></tr>
                <tr id="trEnCurso"><td><asp:RadioButton ID="rbtEnCurso" runat="server" Text="En Curso" GroupName="rbtnVistas"/></td></tr>
                <tr id="trAtendida"><td><asp:RadioButton ID="rbtAtendida" runat="server" Text="Atendidas" GroupName="rbtnVistas" /></td></tr>
                <tr id="trCancelada"><td><asp:RadioButton ID="rbtCancelada" runat="server" Text="Canceladas" GroupName="rbtnVistas"/></td></tr>
--%><%--                <tr id="trRetomada"><td><asp:RadioButton ID="rbtRetomada" runat="server" Text="Retomadas" GroupName="rbtnVistas"/></td></tr>
                <tr id="trDerivada"><td><asp:RadioButton ID="rbtDerivada" runat="server" Text="Derivadas" GroupName="rbtnVistas"/></td></tr>
--%>            </table>
        </div>

    </form>
</body>
</html>
