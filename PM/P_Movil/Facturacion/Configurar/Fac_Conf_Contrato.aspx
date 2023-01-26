<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Facturacion_Mantenimiento_Fac_Conf_Contrato"
    CodeBehind="Fac_Conf_Contrato.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Fac_Conf_Contrato.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfCodigo" runat="server" />
    <asp:HiddenField ID="hdfEstado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfinTipOri" runat="server" />
    <div id="dvCargando" class="dvCargando">
    </div>
    <div class="dvPanel" style="overflow: auto;">
        <table width="100%">
            <tr>
                <td>
                    <table width="100%">
                        <tr>
                            <td class="style2">
                                &nbsp;
                            </td>
                            <td>
                                &nbsp;
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 150px;">
                                <asp:Label ID="lblDiaCorte" runat="server" Text="Día de Corte:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtDiaCorte" runat="server" Width="50px" MaxLength="150"></asp:TextBox>
                            </td>
                        </tr>
                        <tr id="trFuente" runat="server">
                            <td>
                                <asp:Label ID="lblDiaPago" runat="server" Text="Día de pago:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtDiaPago" runat="server" Width="50px" MaxLength="150"></asp:TextBox>
                            </td>
                        </tr>
                        <%--<tr>
                            <td class="tdEtiqueta" style="width: 150px">
                                <asp:Label ID="lblActivo" runat="server" Text="Activo"></asp:Label>
                            </td>
                            <td>
                                <asp:CheckBox ID="chkEstado" runat="server" Checked="True" />
                            </td>
                            MOV_FAC_cESE
                        </tr>--%>
                    </table>
                </td>
            </tr>
        </table>
        <div id="dvFechas">
            <table width="100%">
                <tr>
                    <td align="left" style="color: #CC0000;">
                        <b><span id="spMensaje"></span></b>
                    </td>
                </tr>
            </table>
        </div>
        <table>
            <tr style="padding-top: 20px;">
                <td colspan="2">
                    <br />
                    <div style="text-align: left;">
                        <div id="btnGuardar" class="btnNormal">
                            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                            <a>Guardar</a>
                        </div>
                        <div id="btnCerrar" class="btnNormal">
                            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                            <a>Cancelar</a>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
        <br />
    </div>
    </form>
</body>
</html>
