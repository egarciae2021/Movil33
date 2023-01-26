<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Mnt_Plan" Codebehind="Mnt_Plan.aspx.vb" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register Src="../../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
    <head runat="server">
        <title></title>
	    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
        <link href="../../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
        <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />           
        <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
        <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
        <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
        <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
        <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
        <script src="../../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
        <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
        <script src="../../../Common/Scripts/ajaxupload.js" type="text/javascript"></script>
</head> 
    <body>
        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Mnt_Plan.js")%>" type="text/javascript"></script>
        <form id="form1" runat="server">
            <asp:HiddenField ID="hdfCodCliente" runat="server" />
            <asp:HiddenField ID="hdfPlan" runat="server" />
            <asp:HiddenField ID="hdfSepMiles" runat="server" />
            <asp:HiddenField ID="hdfTotalLineas" runat="server" />
            <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />

            <asp:HiddenField ID="hdfImpto" runat="server" />

            <div id="divMsgConfirmacion" style="display:none;">
                <span class="ui-icon ui-icon-alert" style="float:left;"></span>
                ¿Desea cerrar este Sub Plan?
            </div>  
            <div class="dvPanel" style="overflow: auto;">
                <table width="100%">
                    <tr>
                        <td>
                            <table  width="100%" id="tbCamposDinamicos" runat="server">
                                <tr>
                                    <td class="tdEtiqueta">
                                        Plan:
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtPlan" runat="server" MaxLength="50" Width="150px"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdEtiqueta">
                                        Descripción:
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtDescripcion" runat="server" Width="500px"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdEtiqueta">
                                        Operador:
                                    </td>
                                    <td>

                                    <table>
                                        <tr>
                                            <td>
                                                <asp:DropDownList ID="ddlOperador" runat="server" Width="249px"></asp:DropDownList>
                                            </td>
                                            <td>
                                            <div id="dvInfoOpe" style="display: none;">
                                                <ttgInfo:ToolTipGenerico ID="ttgInfoEditOpe" runat="server" Mensaje="No puede editar el campo Operador, el plan seleccionada tiene líneas asociadas." />
                                            </div>
                                            </td>
                                        </tr>
                                    </table>
                                                                              
                                    </td>
                                </tr>
                                <tr style="display: none;">
                                    <td>
                                        <table>
                                            <tr>
                                                <td>
                                                    <asp:Label ID="lblTipoLinea" runat="server" Text="Tipo"></asp:Label>
                                                </td>
                                                <td>
                                                    <div id="dvTggInfo" runat="server" style="display:none">
                                                        <ttgInfo:ToolTipGenerico ID="ttgInfoTipoLinea" runat="server"/>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td>
                                        <asp:DropDownList ID="ddlLineaTipo" runat="server" Width="249px"></asp:DropDownList>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdEtiqueta">
                                        <asp:Label ID="LblTipoServicio" runat="server" Text="Tipo Servicio"></asp:Label>
                                    </td>
                                    <td>
                                        <asp:DropDownList ID="ddlTipoServicio" runat="server" Width="249px"></asp:DropDownList>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdEtiqueta">                                        
                                        <asp:Label ID="LblMonto2" runat="server" Text="Monto"></asp:Label>
                                    </td>
                                    <td>
                                        <asp:TextBox ID="lblMonto" runat="server" CssClass="lblNormal" Text="" Height="15px" Width="100px"></asp:TextBox>
                                        <asp:CheckBox ID="chkIncImp" runat="server" Text="Incluye impuesto" onclick="MuestraMensajeImpuesto()"/>
                                    </td>
                                </tr>
                                <tr id="trMontoIncImpuesto" runat="server" style="display:none;">
                                    <td class="tdEtiqueta"></td>
                                    <td>
                                        <span id="lblMensajeImp" style="display:inline-block;font-weight:bold;">Monto sin impuesto es: </span>
                                        <span id="lblMontoImp" style="display:inline-block;font-weight:bold;"></span>
                                        <ttgInfo:ToolTipGenerico ID="ttgInfoMontoImpuesto" runat="server" Mensaje="El monto calculado es en base al módulo de configuración regional."/>
                                    </td>
                                </tr>

                                <tr id="trManientePlan" runat="server" style="display:none;">
                                    <td>
                                        Mantiene Plan de Campaña:
                                    </td>
                                    <td>
                                        <input id="chkMantienePlanCamp" type="checkbox" runat="server"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Minutos Adicionales</td>
                                    <td>
                                        <asp:TextBox ID="txtMinAdi" runat="server" Width="100px" MaxLength="4" AutoCompleteType="Disabled"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr style="display: none;">
                                    <td class="tdEtiqueta">
                                    </td>
                                    <td>
                                        <div id="btnModelosPlan" class="btnNormal">
                                            <asp:Image ID="imgAsociarModelo" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Celular_16x16.png"/>
                                            <a>Asociar Modelos</a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Roaming
                                    </td>
                                    <td>
                                        <asp:CheckBox ID="chkRoaming" runat="server"/>
                                    </td>
                                </tr>
                                <tr id="trEstado" runat="server">
                                    <td class="tdEtiqueta">
                                        Activo
                                    </td>
                                    <td>
                                        <asp:CheckBox ID="chkEstado" runat="server" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td align="right" valign="bottom">
                            <div id="btnAgregarSubPlan" class="btnNormal">
                                <asp:Image ID="imgAgregarSubPlan" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"/>
                                <a>Agregar SubPlan</a>
                            </div>                        
                        </td>
                    </tr>
                </table>
            </div>

            <br />
            <cc1:TabJQ ID="tbAsignacion" runat="server" CssClass="tabs" style="margin: 0px; padding: 0px;"></cc1:TabJQ>
            <br />
            <div style="text-align:left;">            
                <div id="btnGuardar" class="btnNormal">
                    <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                    <a>Guardar</a>
                </div>
                <div id="btnCerrar" class="btnNormal">
                    <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                    <a>Cerrar</a>
                </div>
            </div>

            <div id="dvModelosPlan" style="display:none;">
                &nbsp;<asp:TextBox ID="txt_Dispositivos" runat="server" Width="440px" style="text-transform: uppercase;" MaxLength="80"></asp:TextBox>
                <asp:HiddenField ID="hdfCodDispositivos" runat="server"/>
                <asp:HiddenField ID="hdfNomDispositivos" runat="server"/>
                <div id ="divPicklist" >
                    <table>
                        <tr>
                            <td>
                                <select id="lstPicklist" size="4" multiple="multiple" style="width: 365px;">
                                </select>
                            </td>
                            <td valign="top">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr><td> <div id="btnPicklistAgregar" class="btnPicklist">Agregar</div> </td></tr>
                                    <tr><td> <div id="btnPicklistEliminar" class="btnPicklist">Eliminar</div></td></tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>

            </div>

        </form>
    </body>
</html>