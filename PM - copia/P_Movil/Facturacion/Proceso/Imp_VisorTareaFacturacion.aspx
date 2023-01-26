<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Imp_VisorTareaFacturacion.aspx.vb"
    Inherits=".Imp_VisorTareaFacturacion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.timer.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.contextmenu.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <%--<script src="Imp_VisorTareaFacturacion2.js" type="text/javascript"></script>--%>
    <script src="Imp_VisorTareaFacturacion.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div class="dvPanel" style="overflow: auto; text-align: center;">
        <table>
            <tr>
                <td>
                    Estado:
                    <asp:DropDownList ID="ddlEstado1" runat="server" Width="249px">
                    </asp:DropDownList>
                </td>
                <td>
                    Tarea:
                    <asp:DropDownList ID="ddlTarea1" runat="server" Width="200px">
                    </asp:DropDownList>
                </td>
            </tr>
        </table>
    </div>
    <br />
    <div class="dvPanel" style="overflow: auto;">
        <table id="tbTareas1">
        </table>
    </div>
    <br />
    <div id="dvDetalle1" class="dvPanel" style="padding: 10px; overflow: auto; text-align: right;">
        <asp:HiddenField ID="hdfinCodCol1" runat="server" />
        <table>
            <tr>
                <td>
                    Fecha de creación:
                </td>
                <td colspan="3" style="text-align: left; width: 600px;">
                    <asp:Label ID="lblFechaCreacion1" runat="server" Text=""></asp:Label>
                </td>
            </tr>
            <tr>
                <td>
                    Fecha de ejecución:
                </td>
                <td colspan="3" style="text-align: left;">
                    <asp:Label ID="lblFechaEjecucion1" runat="server" Text=""></asp:Label>
                </td>
            </tr>
            <tr>
                <td>
                    Fecha de Finalización:
                </td>
                <td colspan="3" style="text-align: left;">
                    <asp:Label ID="lblFechaFinalizacion1" runat="server" Text=""></asp:Label>
                </td>
            </tr>
            <tr>
                <td>
                    Observaciones:
                </td>
                <td colspan="3" style="text-align: left;">
                    <asp:Label ID="lblObservacion1" runat="server" Text=""></asp:Label>
                </td>
            </tr>

            <tr>
                <td colspan="4" style="text-align: left;">
                    <div id="btnDetalle1" class="btnNormal" >
                        <asp:Image ID="imgDetalle1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Todo.png" />
                        <a>Ver detalles de proceso</a>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <br />
    <div id="dvDetalleProceso1" style="display: none; width:700px;">
        <table id="tbLog">
        </table>
    </div>
    </form>
</body>
</html>
