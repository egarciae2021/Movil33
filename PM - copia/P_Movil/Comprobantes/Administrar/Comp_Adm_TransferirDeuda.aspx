<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Comp_Adm_TransferirDeuda.aspx.vb" Inherits=".Comp_Adm_TransferirDeuda" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register Src="../../../Common/Controles/BusquedaPrincipal.ascx" TagName="BusquedaPrincipal" TagPrefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />

    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqueryui/jquery.ui.autocomplete.js" type="text/javascript"></script>

    <script src="Comp_Adm_TransferirDeuda.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfNombre" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfTransferirA" runat="server" />
    <div class="dvPanel">
        <table style="width:100%">
            <tr>
                <td style="width:100px;">Tipo de línea</td>
                <td style="width:150px;">
                    <asp:DropDownList id="ddlTipoLinea" runat="server" Width="150px" Enabled="false">
                        <asp:ListItem Value="2" Text="Familia" Selected="True"></asp:ListItem>
                    </asp:DropDownList>
                </td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <asp:RadioButton ID="rbtPedido" Text="Pedido" runat="server" Checked="true" GroupName="busqueda"/>
                    <asp:RadioButton ID="rbtLinea" runat="server" Text="Línea" GroupName="busqueda"/>
                    <asp:RadioButton ID="rbtIMEI" runat="server" Text="IMEI" GroupName="busqueda"/>
                </td>
                <td></td>
            </tr>
            <tr>
                <td><asp:Label ID="lblNombre" runat="server" Text="Pedido"></asp:Label></td>
                <td valign="bottom">
                    <asp:TextBox ID="txtNombre" runat="server" Width="140px"></asp:TextBox>
                </td>
                <td align="left">
                    <div id="btnVerPedido" class="btnNormal" runat="server" style="width: 110px; padding:0px; height:22px;">
                        <asp:Image ID="imgBuscar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/VerDetalle.png" />
                        <a>Ver Pedido</a>
                    </div>
                </td>
            </tr>
            <tr>
                <td></td>
                <td id="trDatos" colspan="2">
                    <cc1:TabJQ ID="tabDatos" runat="server" CssClass="tabs" style="margin: 0px; padding: 0px;">
                        <cc1:ContenedorTabJQ ID="tbGrilla" Titulo="Detalle de pedido" CssClass="dvTabContenido">
                            <div id="divGrilla" style="padding:10px;">
                                <div style="margin-bottom:5px; font-size:11px; font-style:italic; font-weight: bold;">Seleccione el detalle del pedido que desee transferir</div>
                                <table id="grid"></table>
                                <div id="pager"></div>    
                            </div>
                        </cc1:ContenedorTabJQ>
                        <cc1:ContenedorTabJQ ID="tbInformacion" Titulo="Información del pedido" CssClass="dvTabContenido">
                            <div id="divInformacion" style="padding:10px;">
                            <table cellpadding="2px">
                                <tr>
                                    <td style="width:100px;">Empleado</td>
                                    <td><asp:Label ID="lblEmpleado" runat="server"></asp:Label></td>
                                </tr>
                                <tr>
                                    <td>Campaña</td>
                                    <td><asp:label id="lblCampana" runat="server"></asp:label></td>
                                </tr>
                                <tr>
                                    <td>Código Pedido</td>
                                    <td><asp:label ID="lblCodigoPedido" runat="server"></asp:label></td>
                                </tr>
                                <tr>
                                    <td>Fecha Pedido</td>
                                    <td><asp:label ID="lblFechaPedido" runat="server"></asp:label></td>
                                </tr>
                            </table>
                            </div>
                        </cc1:ContenedorTabJQ>
                    </cc1:TabJQ>
                </td>
            </tr>
            <tr style="height:3px;"><td colspan="3"></td></tr>
            <tr id="trTransferirA" style="display:none;">
                <td>Transferir a</td>
                <td colspan="2">
                    <div id="div_bpEmpleado" runat="server"><uc1:BusquedaPrincipal ID="bpEmpleado" runat="server" Visible="false" /></div>
                </td>
            </tr>
            <tr id="trMsjTransferirA">
                <td></td>
                <td colspan="2">
                    <span id="spnMsjNuevoEmpleado" style="font-size:8pt;"></span>
                </td>
            </tr>
            <tr id="trDivision" style="display:none; height:40px">
                <td colspan="3">
                    <hr style="width: 90%; background-color: #A6C9E2; height: 1px; border: 0;" />
                </td>
            </tr>
            <tr id="trTituloCuotasProg" style="display:none;"><td colspan="3" style="padding-bottom:2px;">Seleccione las cuotas a transferir</td></tr>
            <tr id="trCuotasProgramadas" style="display:none;">
                <td></td>
                <td colspan="2">
                <div>
                    <div style="width:432px; display: inline-block;">
                        <div style="width:432px; text-align:center; font-weight:bold; font-size: 8pt; margin-bottom:3px;">Cuotas Programadas De Equipo</div>
                        <div class="dvPanel" style="width:410px;">
                            <table style="text-align:center;">
                            <tr style="font-weight:bold;">
                                <td>ORIGEN</td>
                                <td></td>
                                <td>DESTINO</td>
                            </tr>
                            <tr>
                                <td><asp:Label ID="lblPropietarioActual_Equipo" runat="server"></asp:Label></td>
                                <td></td>
                                <td><asp:Label ID="lblPropietarioNuevo_Equipo" runat="server"></asp:Label></td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:ListBox ID="lstCuoProAct_Equipo" runat="server" Height="170px" Width="170px" SelectionMode="Multiple">
                                        <asp:ListItem Text="Cuota 01 ( 07/2015 )"></asp:ListItem>
                                    </asp:ListBox>    
                                </td>
                                <td style="width:60px; text-align:center;">
                                    <table id="tblListBoxButtons_Equipo" width="100%" cellpadding="0" cellspacing="0">
                                        <tr><td style="padding-bottom:2px;"> <div id="btnTodosDerecha_Equipo" class="btnListBox" title="Agregar todos">>></div> </td></tr>
                                        <tr><td style="padding-bottom:2px;"> <div id="btnTodosIzquierda_Equipo" class="btnListBox" title="Quitar todos"><<</div> </td></tr>
                                    </table>                                
                                </td>
                                <td>
                                    <asp:ListBox ID="lstCuoProNue_Equipo" runat="server" Height="170px" Width="170px" SelectionMode="Multiple"></asp:ListBox>   
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3" align="left"><asp:CheckBox id="chkTransferirEquipo" runat="server" Text="Transferir Equipo" Checked="true"/></td>
                            </tr>
                            </table>
                        </div>
                    </div>

                    <div style="width:12px; display: inline-block;">&nbsp;</div>

                    <div style="width:432px; display: inline-block;">
                        <div style="width:432px; text-align:center; font-weight:bold; font-size: 8pt; margin-bottom:3px;">Cuotas Programadas De Servicio</div>
                        <div class="dvPanel" style="width:410px;">
                            <table style="text-align:center;">
                            <tr style="font-weight:bold;">
                                <td>ORIGEN</td>
                                <td></td>
                                <td>DESTINO</td>
                            </tr>
                            <tr>
                                <td><asp:Label ID="lblPropietarioActual_Servicio" runat="server"></asp:Label></td>
                                <td></td>
                                <td><asp:Label ID="lblPropietarioNuevo_Servicio" runat="server"></asp:Label></td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:ListBox ID="lstCuoProAct_Servicio" runat="server" Height="170px" Width="170px" SelectionMode="Multiple"></asp:ListBox>    
                                </td>
                                <td style="width:60px; text-align:center;">
                                    <table id="tblListBoxButtons_Servicio" width="100%" cellpadding="0" cellspacing="0">
                                        <tr><td style="padding-bottom:2px;"> <div id="btnTodosDerecha_Servicio" class="btnListBox" title="Agregar todos">>></div> </td></tr>
                                        <tr><td style="padding-bottom:2px;"> <div id="btnTodosIzquierda_Servicio" class="btnListBox" title="Quitar todos"><<</div> </td></tr>
                                    </table>                                
                                </td>
                                <td>
                                    <asp:ListBox ID="lstCuoProNue_Servicio" runat="server" Height="170px" Width="170px" SelectionMode="Multiple"></asp:ListBox>   
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3" align="left"><asp:CheckBox id="chkTransferirLinea" runat="server" Text="Transferir Línea" Checked="true"/></td>
                            </tr>
                            </table>
                        </div>  
                    </div>                  
                </div>
                </td>
            </tr>
        </table>
    </div>
    
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

    <div id="divMsgConfirmar" style="display:none;">
        <asp:Label id="lblMsjConfirmar" runat="server"></asp:Label>
    </div>

    </form>
</body>
</html>
