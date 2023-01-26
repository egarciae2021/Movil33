<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Cam_DespachoVisorStaff" CodeBehind="Cam_DespachoVisorStaff.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/moment.js"></script>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Cam_DespachoVisorStaff.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
        <div class="ui-state-default ui-corner-all" style="padding: 6px;">
            <span class="ui-icon ui-icon-circle-search" style="float: left; margin: -2px 5px 0 0;"></span>
            Filtros
        </div>
        <div class="dvPanel ui-widget-content ui-corner-all">
            <table>
                <tr>
                    <td class="tdEtiqueta">Periodo:</td>
                    <td>
                        <asp:TextBox ID="txtFechaInicio" runat="server" Width="70px" CssClass="DATE" ReadOnly="true"></asp:TextBox>
                        &nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <asp:TextBox ID="txtFechaFin" runat="server" Width="70px" CssClass="DATE" ReadOnly="true"></asp:TextBox>
                    </td>
                    <td></td>
                </tr>
            </table>
        </div>
        <div class="ui-state-default ui-corner-all" style="padding: 6px;">
            <span class="ui-icon ui-icon-circle-arrow-s" style="float: left; margin: -2px 5px 0 0;"></span>
            Listado
        </div>
        <table id="tbDespacho"></table>
        <div id="pager"></div>


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
                    <td style="width: 100px; text-align: right;">Costo (S/IVA):</td>
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
