<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Comp_Proc_VisorTarea.aspx.vb" Inherits="Comp_Proc_VisorTarea" %>

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
     <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.timer.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>   

    <script src="Comp_Proc_VisorTarea.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">

    <div id="divMsgConfirmacionAhora" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>¡Se procesará esta cola ahora!, ¿Desea continuar?
    </div>
    <div class="dvPanel" style="overflow: auto; text-align: center;">
        <table>
            <tr>
                <td>
                    Estado:
                    <asp:DropDownList ID="ddlEstado" runat="server" Width="249px">
                    </asp:DropDownList>
                </td>
                <td style="width: 30px"></td>
                <td>
                    Tarea:
                    <asp:DropDownList ID="ddlTarea" runat="server" Width="200px">
                    </asp:DropDownList>
                </td>
            </tr>
        </table>
    </div>
    <br />
    <div id="dvTareas" class="dvPanel" style="margin: 0px auto; padding: 5px; background-image: none; margin-top: -8px;">
        <table id="tbTareas">
        </table>
    </div>
    <br />
        <div id="dvDetalle" class="dvPanel" style="padding: 10px; overflow: auto; text-align: right;">
        <asp:HiddenField ID="hdfinCodCol" runat="server" />
        <table>
            <tr>
                <td>
                    Fecha de creación:
                </td>
                <td colspan="3" style="text-align: left; width: 600px;">
                    <asp:Label ID="lblFechaCreacion" runat="server" Text=""></asp:Label>
                </td>
            </tr>
            <tr>
                <td>
                    Fecha de ejecución:
                </td>
                <td colspan="3" style="text-align: left;">
                    <asp:Label ID="lblFechaEjecucion" runat="server" Text=""></asp:Label>
                </td>
            </tr>
            <tr>
                <td>
                    Fecha de Finalización:
                </td>
                <td colspan="3" style="text-align: left;">
                    <asp:Label ID="lblFechaFinalizacion" runat="server" Text=""></asp:Label>
                </td>
            </tr>
            <tr>
                <td>
                    Observaciones:
                </td>
                <td colspan="3" style="text-align: left;">
                    <asp:Label ID="lblObservacion" runat="server" Text=""></asp:Label>
                </td>
            </tr>

            <tr>
                <td colspan="4" style="text-align: left;">
                    <div id="btnDetalle" class="btnNormal" >
                        <asp:Image ID="imgDetalle" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Todo.png" />
                        <a>Ver detalles de proceso</a>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div id="dvProgramacion" style="display:none;">
        <table>
            <tr>
                <td>
                    <asp:RadioButtonList ID="rbProgramacion" runat="server" RepeatDirection="Horizontal">
                        <asp:ListItem Selected="True" Value="0">Ahora</asp:ListItem>
                        <asp:ListItem Value="1">Programado</asp:ListItem>
                    </asp:RadioButtonList>                                
                </td>
                <td>
                    <asp:TextBox ID="txtFechaProgramacion" runat="server" CssClass="DATETIME"></asp:TextBox>
                </td>
            </tr>
        </table>
    </div>
    <br />
    <div id="dvDetalleProceso" style="display: none; width:700px;">
        <table id="tbLog">
        </table>
        <div id="pageLog"></div>
    </div>
    </form>
</body>
</html>
