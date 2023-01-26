<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Conciliar_CierreNota" CodeBehind="CierreNota.aspx.vb" %>

<%@ Register Src="~/Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqueryui/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqueryui/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqueryui/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqueryui/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/ajaxupload.js" type="text/javascript"></script>
    <style type="text/css">
        #UploadedFile div {
            display: inline-block;
        }
    </style>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("CierreNota.js")%>" type="text/javascript"></script>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("CierreNotaSignalR.js")%>" type="text/javascript"></script>
    <link href="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("CierreNota.css")%>" type="text/css" rel="Stylesheet" />
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfPeriodo" runat="server" />
        <asp:HiddenField ID="hdfUsuario" runat="server" />
        <asp:HiddenField ID="hdfCerrado" runat="server" />
        <asp:HiddenField ID="hdfEmpleadoActual" runat="server" />
        <asp:HiddenField ID="hdfOperador" runat="server" Value=""/>

        <table style="width: 100%;" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td style="width: 300px;" valign="top">
                    <div class="dvPanel" style="margin-right: 5px; margin-top: 7px; overflow: scroll; height: 478px;">
                        <asp:DataList ID="DataList1" runat="server" DataSourceID="odsEnlaces" RepeatColumns="1">
                            <ItemTemplate>
                                <div>
                                    <table id='Enlace_<%# Eval("CodEmpleado")%>' border="0" class="itemChat">
                                        <tr style="border-style: solid solid none solid; border-width: 1px 1px thin 1px; border-color: #C0C0C0;">
                                            <td rowspan="2" style="width: 25px;">
                                                <img src="images/user_1.png" alt="" />
                                            </td>
                                            <td>
                                                <asp:Label ID="lblRegistradoPor" Font-Size="12px" runat="server" Text='<%# Eval("Empleado")%>' Font-Bold="True"></asp:Label>
                                            </td>
                                        </tr>
                                        <tr style="border-style: none solid solid solid; border-width: thin 1px 1px 1px; border-color: #C0C0C0;">
                                            <td>
                                                <asp:Label ID="lblDetalle" runat="server" Text='<%# Eval("Empresa")%>'></asp:Label>
                                            </td>
                                        </tr>
                                        <div style="position:relative;">
                                            <div style="display: none;" id='dvChatContador_<%# Eval("CodEmpleado")%>' class="dvChatContador"></div>
                                        </div>
                                    </table>
                                </div>
                            </ItemTemplate>
                        </asp:DataList>
                        <asp:ObjectDataSource ID="odsEnlaces" runat="server" SelectMethod="ObtenerEnlacesOSD"
                            TypeName="VisualSoft.Suite80.BL.BL_MOV_Concilia">
                            <SelectParameters>
                            </SelectParameters>
                        </asp:ObjectDataSource>
                    </div>
                </td>
                <td valign="top">
                    <iframe id="ifNota" frameborder="0" style="padding: 0px; margin: 0px; height: 530px; width: 670px;"></iframe>
                </td>
            </tr>
        </table>
    </form>
</body>
</html>
