<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Sin_Utilitarios.aspx.vb"
    Inherits="Sin_Utilitarios" %>

<%@ Register Src="../Common/Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcelGenerico"
    TagPrefix="eeg" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="Sincroniza.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jquery.timer.js" type="text/javascript"></script>
    <script src="../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Sin_Utilitarios.js" type="text/javascript"></script>
    <style>
        textarea {
            resize: none;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="dvPanel" id="ContenedorPagina">
            <%--<br />
        <center>
            <label class="titulo_grafico_1_hist" style="width: 100%; top: 0px; left: 0px;">
                Resúmenes de Tarea</label>
        </center>--%>
            <table width="98%">
                <tr>
                    <td align="center"></td>
                </tr>
            </table>
            <div id="divMsgConfirmacionEliminar" style="display: none;">
                <span class="ui-icon ui-icon-alert" style="float: left;"></span>¡Se eliminará este
            registro de tarea seleccionado!, ¿Desea continuar?
            </div>
            <br />
            <div id="dvdetalle" style="padding-bottom: 0px;">
                <table cellpadding="0" cellspacing="0" width="90%">
                    <tr>
                        <td colspan="3">
                            <table id="tbresumen">
                            </table>
                            <asp:TextBox ID="txtestado" runat="server" disabled="disabled" Wrap="true" TextMode="MultiLine"
                                Rows="2" Width="100%" Height="35px"></asp:TextBox>
                            <br />
                            <br />
                        </td>
                    </tr>
                    <tr>
                        <td width="50%"></td>
                    </tr>
                    <tr>
                        <td>
                            <table border="0">
                                <tr>
                                    <td>Filtrar registros:
                                    </td>
                                    <td>
                                        <asp:TextBox runat="server" ID="txtfiltro_detalle"></asp:TextBox>
                                    </td>
                                    <td>
                                        <div id="btnfiltrard" class="btnNormal" runat="server">
                                            <asp:Image ID="Image1" runat="server" ImageUrl="../Common/Images/Mantenimiento/Filtro_16x16.png" />
                                            <a>Filtrar</a>
                                        </div>
                                    </td>
                                    <td>
                                        <div id="btnExcel">
                                            <eeg:ExportarExcelGenerico ID="eegDetalle" runat="server" style="width: 40px !important; height: 26px !important;"
                                                title="Exportar a excel" />
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table id="tbdetalle">
                            </table>
                            <div id="pager">
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="btnModificarD" class="btnNormal" runat="server" style="display: none;">
                <asp:Image ID="imgModificar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                <a>Modificar <a>Modificar</a>
            </div>
            <div id="btnModificarE" class="btnNormal" runat="server" style="display: none;">
                <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                <a>Modificar</a>
            </div>
            <div id="dvCamposDetalle" style="display: none;">
                <table width="100%">
                    <tr>
                        <td>Acción:
                        </td>
                        <td width="70%">
                            <asp:TextBox ID="txtaccion" runat="server" disabled="disabled" Width="100%"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>

                        <td>Codigo:</td>
                        <td>Código:
                        </td>
                        <td>
                            <asp:TextBox ID="txtcodigo" runat="server" disabled="disabled" Width="100%"> </asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>Nombre:
                        </td>
                        <td>
                            <asp:TextBox ID="txtnombre" runat="server" disabled="disabled" Width="100%"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>Email:
                        </td>
                        <td>
                            <asp:TextBox ID="txtemail" runat="server" disabled="disabled" Width="100%"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>Observaciones:</td>
                        <td>Observaciones:
                        </td>
                        <td>
                            <asp:TextBox ID="txtobservaciones" runat="server" disabled="disabled" Width="100%"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>Area:</td>
                        <td>Área:
                        </td>
                        <td>
                            <asp:TextBox ID="txtarea" runat="server" disabled="disabled" Width="100%"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>Cen. Costo:
                        </td>
                        <td>
                            <asp:TextBox ID="txtcosto" runat="server" disabled="disabled" Width="100%"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>Clave:
                        </td>
                        <td>
                            <asp:TextBox ID="txtclave" runat="server" TextMode="Password" disabled="disabled"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>Extensión:
                        </td>
                        <td>
                            <asp:TextBox ID="txtanexo" runat="server" disabled="disabled"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>Estado de Registro:
                        </td>
                        <td>
                            <asp:TextBox ID="txtmensaje" runat="server" disabled="disabled" Wrap="true" TextMode="MultiLine"
                                Rows="3" Width="100%" Height="75px"></asp:TextBox>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="dvCamposError" style="display: none;">
                <table width="100%">
                    <tr>
                        <td>Acción:
                        </td>
                        <td width="70%">
                            <asp:TextBox ID="txtaccion1" runat="server" disabled="disabled" Width="100%"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>

                        <td>Codigo:</td>
                        <td>Código:
                        </td>
                        <td>
                            <asp:TextBox ID="txtcodigo1" runat="server" disabled="disabled" Width="100%"> </asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>Nombre:
                        </td>
                        <td>
                            <asp:TextBox ID="txtnombre1" runat="server" disabled="disabled" Width="100%"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>Email:
                        </td>
                        <td>
                            <asp:TextBox ID="txtemail1" runat="server" disabled="disabled" Width="100%"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>Observaciones:</td>
                        <td>Observaciones:
                        </td>
                        <td>
                            <asp:TextBox ID="txtobservaciones1" runat="server" disabled="disabled" Width="100%"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>Area:</td>
                        <td>Área:
                        </td>
                        <td>
                            <asp:TextBox ID="txtarea1" runat="server" disabled="disabled" Width="100%"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>Estado de Registro:</td>
                        <td>Estado de Registro:
                        </td>
                        <td>
                            <asp:TextBox ID="txtmensaje1" runat="server" disabled="disabled" Wrap="true" TextMode="MultiLine"
                                Rows="3" Width="100%" Height="75px"></asp:TextBox>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </form>
</body>
</html>
