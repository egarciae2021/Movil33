<%@ Page Language="vb" AutoEventWireup="false" Inherits=".Conf_DistribucionConfiguracion" CodeBehind="Conf_DistribucionConfiguracion.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register Src="../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <%--kendo --%> 
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />

    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>

    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Conf_DistribucionConfiguracion.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server" class="dvPanel">
        <asp:HiddenField runat="server" ID="hdfEsAdmin" />
        <asp:HiddenField runat="server" ID="hdfEsAdBol" />
        <asp:HiddenField runat="server" ID="hdfEsPrincipal" />

        <cc1:AccordionJQ ID="AccordionJQ1" runat="server" EnableViewState="true" CssClass="accordion" Style="overflow: auto;" TabIndex="0">
            <cc1:ContenedorAccodion Texto="Configuración de Fechas" ID="accConfFechas">
                <table>
                    <tr>
                        <td style="width:60px;">
                            Operador
                        </td>
                        <td style="width:170px;">
                            <asp:DropDownList ID="ddlOperador" runat="server" Width="170px">
                            </asp:DropDownList>
                        </td>
                        <td style="width:50px; padding-left:20px;">                            
                            <asp:Label ID="lblCuenta" runat="server">Cuenta</asp:Label>
                        </td>
                        <td style="width:150px;">
                            <asp:DropDownList ID="ddlCuenta" runat="server" Width="150px">
                                <asp:ListItem Value="-1" Text="--Seleccione--"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <table style="padding-left:30px; padding-top:10px;">
                                <tr>
                                    <td style="width:150px;">
                                        <asp:Label ID="lblFecLimEnv" runat="server"></asp:Label>
                                    </td>
                                    <td>
                                        <asp:DropDownList ID="ddlFecLimEnv" runat="server" Width="110"></asp:DropDownList>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:Label ID="lblFecProc" runat="server"></asp:Label>
                                    </td>
                                    <td>
                                        <asp:DropDownList ID="ddlFecProc" runat="server" Width="110"></asp:DropDownList>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr style="display:none;">
                        <td colspan="4">
                            Si el <label id="lblObsFec_EnvOper" runat="server"></label> es mayor al <label id="lblObsFec_Cierre" runat="server"></label> se considererá como un día del periodo anterior
                        </td>
                    </tr>
                </table>
            </cc1:ContenedorAccodion>
            <cc1:ContenedorAccodion Texto="Procesar Distribución" ID="accProcDistribucion">
                <table>
                    <tr>
                        <td>
                            Hora de Ejecución de Distribución
                        </td>
                        <td>
                            <asp:TextBox ID="txtHoraEjecDis" runat="server"></asp:TextBox>
                        </td>
                    </tr>
                    <tr id="trDictPorOrgUsu">
                        <td colspan="2">
                            <asp:CheckBox ID="chkActDistPorOrgUsu" runat="server" Text="Activar Distribucioón Cuenta Bolsa por Organización de Usuario" />
                        </td>
                    </tr>
                </table>
            </cc1:ContenedorAccodion>
            <cc1:ContenedorAccodion Texto="Configuración de Correos" ID="accConfCorreos">
                <table id="tbParametrosCorreo"></table>
                <br />
                Enviar correos para los siguientes casos:
                <table width="100%">
                    <tr>
                        <td>
                            <asp:CheckBox ID="chkEnvOper" runat="server" Text="No se ha enviado distribución al operador" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="dvCorreo_EnvOpe" class="dvPanel" style="margin-left:45px; display:none;" runat="server">
                                <table>
                                    <tr>
                                        <td colspan="2">
                                            Enviar&nbsp;
                                            <asp:DropDownList ID="ddlDiasEnvOper" runat="server">
                                                <asp:ListItem Value="1" Text="1"></asp:ListItem>
                                                <asp:ListItem Value="2" Text="2"></asp:ListItem>
                                                <asp:ListItem Value="3" Text="3"></asp:ListItem>
                                            </asp:DropDownList>
                                            &nbsp;día(s) antes del
                                            <asp:Label ID="lblChkEnvOper" runat="server"></asp:Label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width:80px;">Destinatarios</td>
                                        <td>
                                            <asp:TextBox ID="txtDestinatarios_EnvOper" runat="server" Width="590" MaxLength="50"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Asunto</td>
                                        <td>
                                            <asp:TextBox ID="txtAsunto_EnvOper" runat="server" Width="590" MaxLength="50"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="vertical-align:top;">Mensaje</td>
                                        <td>
                                            <asp:TextBox ID="txtMensaje_EnvOper" CssClass="KendoEditor" runat="server" Width="600"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <div style="float:right;">
                                                <label id="charRestantes_EnvOpe"></label>
                                                &nbsp;caracteres restantes
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:CheckBox ID="chkCerDist" runat="server" Text="No se ha cerrado una distribución" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="dvCorreo_CerDis" class="dvPanel" style="margin-left:45px; display:none;" runat="server">
                                <table>
                                    <tr>
                                        <td colspan="2">
                                            Enviar&nbsp;
                                            <asp:DropDownList ID="ddlDiasCerDis" runat="server">
                                                <asp:ListItem Value="1" Text="1"></asp:ListItem>
                                                <asp:ListItem Value="2" Text="2"></asp:ListItem>
                                                <asp:ListItem Value="3" Text="3"></asp:ListItem>
                                            </asp:DropDownList>
                                            &nbsp;día(s) antes del
                                            <asp:Label ID="lblChkCerDis" runat="server"></asp:Label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width:80px;">Destinatarios</td>
                                        <td>
                                            <asp:TextBox ID="txtDestinatarios_CerDis" runat="server" Width="590" MaxLength="50"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Asunto</td>
                                        <td>
                                            <asp:TextBox ID="txtAsunto_CerDis" runat="server" Width="590" MaxLength="50"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top">Mensaje</td>
                                        <td>
                                            <asp:TextBox ID="txtMensaje_CerDis" CssClass="KendoEditor" runat="server" Width="600"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <div style="float:right;">
                                                <label id="charRestantes_CerDis"></label>
                                                &nbsp;caracteres restantes
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                </table>
            </cc1:ContenedorAccodion>
        </cc1:AccordionJQ>        
        <div id="dvAccionesPagina" style="margin-top:5px; text-align:left;">
            <div id="btnGuardar" class="btnNormal">
                <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
            <%--<div id="btnCerrar" class="btnNormal">
                <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cerrar</a>
            </div>--%>
        </div>
    </form>
</body>
</html>
