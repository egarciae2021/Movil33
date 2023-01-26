<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Comp_Con_ReporteEstadoLineas.aspx.vb" Inherits="Comp_Con_ReporteEstadoLineas" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.draggable.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.resizable.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>

    <script src="Comp_Con_ReporteEstadoLineas.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="dvCargando" class="dvCargando">
        </div>
        <div id="dvReport" runat="server">
            <div class="dvPanel">
                <table>
                    <tr>
                        <td valign="top">
                            
                                <table>
                                    <tr>
                                        <td style="font-weight:bold;">Periodo</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Del:
                                        </td>
                                        <td style="width: 100px;">
                                            <asp:TextBox ID="txtDiaInicial" runat="server" Width="80px" CssClass="txtFecha"></asp:TextBox>
                                        </td>
                                        <td>
                                            Al:
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtDiaFinal" runat="server" Width="80px" CssClass="txtFecha"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            
                        </td>
                        <td style="width: 30px">
                            
                        </td>
                        <td valign="top">
                            
                                <table>
                                    <tr>
                                        <td style="font-weight:bold;">Estado</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <asp:DropDownList ID="ddlEstado" runat="server" Width="150px"></asp:DropDownList>
                                        </td>
                                    </tr>
                                </table>
                            
                        </td>
                        <td style="width: 30px">
                            
                        </td>
                        <td>
                            <div id="btnEjecutar" class="btnNormal" runat="server" style="width:70px; margin-bottom:5px;">
                                <img src="../../../Common/Images/Mantenimiento/Imprimir.gif" alt="Imprimir"/>
                                <a>Imprimir</a>
                            </div>
                        </td>
                    </tr>
                </table>
                </div>
        </div>
        <br/>
        <iframe id="ifReporte" width="1150" height="465" frameborder="0" style="padding:0px; margin:0px;"></iframe>

    </form>
</body>
</html>
