<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Configuracion_PanelControl_ConfiguracionRegional" Codebehind="ConfiguracionRegional.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
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
    <script src="../../Common/Scripts/aLiteral.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="ConfiguracionRegional.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">

    <asp:HiddenField ID="hdfCodigo" runat="server" />

    <div id="divConfiguracionRegional" class="dvPanel" style="overflow:auto;">
        <table>
            <%--<tr>
                <td colspan ="2" >
                    <span style="font-size: 14px;">Configuracion Regional</span>
                </td>
            </tr>--%>
            <tr height="10px"><td colspan="2"></td></tr>
            <tr>
                <td align="right">
                    Cultura:
                </td>
                <td>
                    <asp:DropDownList ID="ddlCultura" runat="server">
                    </asp:DropDownList>
                </td>
            </tr>

             <tr>
                <td align="right">
                    Formato Fecha:
                </td>
                <td>
                    <asp:DropDownList ID="ddlFormatoFecha" runat="server">
                        <asp:ListItem Text ="dd/MM/yyyy" Value ="dd/MM/yyyy"></asp:ListItem>
                        <asp:ListItem Text ="dd/MM/yy" Value ="dd/MM/yy"></asp:ListItem>
                        <asp:ListItem Text ="d/M/yy" Value ="d/M/yy"></asp:ListItem>
                        <asp:ListItem Text ="dd-MM-yy" Value ="dd-MM-yy"></asp:ListItem>
                        <asp:ListItem Text ="yyyy-MM-dd" Value ="yyyy-MM-dd"></asp:ListItem>
                        <asp:ListItem Text ="MM/dd/yy" Value ="MM/dd/yy"></asp:ListItem>
                        <asp:ListItem Text ="MM/dd/yyyy" Value ="MM/dd/yyyy"></asp:ListItem>
                        <asp:ListItem Text ="M/d/yyyy" Value ="M/d/yyyy"></asp:ListItem>
                    </asp:DropDownList>
                </td>
            </tr>
            <tr height="8px"><td colspan="2"></td></tr>
            <tr>
                <td colspan="2">
                    <span style="font-size: 11px;"><b><u>Configuraci&oacute;n N&uacute;mero</u></b></span>
                </td>
            </tr>
            <tr>
                <td align="right">
                    Símbolo Decimal:
                </td>
                <td>
                    <asp:TextBox ID="txtSimboloDecimal" runat="server" Width="20px" MaxLength="1"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td align="right">
                    Longitud Decimales:
                </td>
                <td>
                    <asp:TextBox ID="txtNumDec" runat="server" Width="20px" MaxLength="2"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td align="right">
                    Símbolo de Separación de Miles:
                </td>
                <td>
                    <asp:TextBox ID="txtSimSepMil" runat="server" Width="20px" MaxLength="1"></asp:TextBox>
                </td>
            </tr>
            <tr height="8px"><td colspan="2"></td></tr>
            <tr>
                <td colspan="2">
                    <span style="font-size: 11px;"><b><u>Configuraci&oacute;n Moneda</u></b></span>
                </td>
            </tr>
            <tr>
                <td align="right">
                    Impuesto:
                </td>
                <td>
                    <asp:TextBox ID="txtIGV" runat="server" MaxLength="5" Width="35px"></asp:TextBox>
                    <label style="font-size:14px;">%</label>
                </td>
            </tr>
            <tr height="25px"><td colspan="2"></td></tr>
            <tr>
                <td colspan="2"  align="right">
                    <div id="btnGrabar" style="margin: auto;">
                        <table border="0" cellpadding ="0" cellspacing ="0">
                            <tr>
                                <td>    
                                    <img src="../../Common/Images/Mantenimiento/Guardar.png" alt="" width="16px" />
                                </td>
                                <td>
                                    &nbsp;Grabar
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
