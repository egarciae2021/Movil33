<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Mnt_RegistrarPagos.aspx.vb" Inherits=".Mnt_RegistrarPagos" %>

<%@ Register Src="../../../Common/Controles/BusquedaPrincipal.ascx" TagName="BusquedaPrincipal" TagPrefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <%--<link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />--%>
    <link href="../Consultar/Con_Fac_CronogramaPagos.css" rel="stylesheet" type="text/css" />

    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <%--<script src="../../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>--%>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <script src="Mnt_RegistrarPagos.js" type="text/javascript"></script>

</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField runat="server" ID="hdfCodEmpleado" />
        <asp:HiddenField runat="server" ID="hdfFecServidor" />
        <div id="dvPrincipal" style="width: auto; margin: 0 auto;">
            <div id="toolbar" class="dvPanel ui-widget-content ui-corner-all pMedium" style="margin: 0px auto; width: 780px; padding: 10px; background-image: none; margin-top: 5px;">
                <table width="100%" border="0">
                    <tr>
                        <td style="color: #003F59; vertical-align: middle; padding-right: 10px;">Empleado
                        </td>
                        <td>
                            <div id="dvContenBusqEmpleado" runat="server">
                                <uc1:BusquedaPrincipal ID="bpEmpleados" runat="server" />
                            </div>
                        </td>
                        <td style="color: #003F59; vertical-align: middle; padding-right: 10px;">Periodo
                        </td>
                        <td>
                            <asp:TextBox ID="txtPeriodo" runat="server" Width="110px" MaxLength="10" class="bordeui"></asp:TextBox>
                        </td>
                        <td style="color: #003F59; vertical-align: middle; padding-right: 10px;">Fecha
                        </td>
                        <td>
                            <asp:TextBox ID="txtFechaPago" runat="server" Width="110px" MaxLength="10" class="bordeui"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td style="color: #003F59; vertical-align: middle; padding-right: 10px;">Concepto
                        </td>
                        <td>
                            <asp:TextBox ID="txtConcepto" runat="server" Width="300"></asp:TextBox>
                        </td>
                        <td style="color: #003F59; vertical-align: middle; padding-right: 10px;">Monto
                        </td>
                        <td>
                            <asp:TextBox ID="txtMonto" runat="server" Width="100" MaxLength="10"></asp:TextBox>
                        </td>
                        <td colspan="2" style="text-align: center;">
                            <div id="btnAgregarPagos" class="k-button">
                                <table width="100%" border="0" cellpadding="0" cellspacing="1">
                                    <tr>
                                        <td>
                                            <asp:Image ID="Image6" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" Height="16px" ToolTip="Agregar" />
                                        </td>
                                        <td>&nbsp;Agregar
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div id="btnQuitarPago" class="k-button">
                                <table width="100%" border="0" cellpadding="0" cellspacing="1">
                                    <tr>
                                        <td>
                                            <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" Height="16px" ToolTip="Quitar" />
                                        </td>
                                        <td>&nbsp;Quitar
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="dvMensaje" class="pMedium">
                <table width="100%">
                    <tr>
                        <td align="left" style="color: #CC0000;">
                            <b><span id="spMensaje"></span></b>
                        </td>
                    </tr>
                </table>
            </div>
            <table style="" border="0" align="center">
                <tr>
                    <td style="text-align: right;">
                        <div id="dvBotones" class="pMedium" style="text-align: right;">
                            <div id="btnRegistrarPagos" class="k-button" style="width: 80px; text-align: center;">
                                <table id="tbRegistrarPagos" cellpadding="" cellspacing="2">
                                    <tr>
                                        <td>
                                            <asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" Height="16px" />
                                        </td>
                                        <td>
                                            <span>&nbsp;Grabar</span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div id="gridPagos" class="pMedium">
                        </div>
                    </td>
                </tr>
            </table>

        </div>
        <div id="dvConfirmacionRegistrar" style="display: none;">
            <span>Los pagos agregados serán registrados. ¿Desea continuar?.</span>
        </div>
        <div id="dvConfirmacionCerrar" style="display: none;">
            <span>No se han registrado los pagos agregados, para hacerlo haga click en registrar. ¿Desea salir de todos modos?.</span>
        </div>
    </form>
</body>
</html>
