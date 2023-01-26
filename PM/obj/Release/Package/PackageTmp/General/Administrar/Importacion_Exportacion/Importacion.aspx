<%@ Page Language="VB" AutoEventWireup="false" Inherits="General_Administrar_Importacion_Exportacion_Importacion" Codebehind="Importacion.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
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
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Importacion.js" type="text/javascript"></script>
    <style type="text/css">
        .dvCargando
        {
            background: url('../../../Common/Images/Mantenimiento/Cargando.gif') no-repeat right center;
            width: 64px;
            height: 64px;
            top: 50%;
            left: 50%;
            z-index: 20;
            position: fixed;
            display: none;
        }
    </style>
    <%--<script src="Mnt_CentroCosto.js" type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
    <div id="dvCargando" class="dvCargando">
    </div>
    <asp:HiddenField ID="hdfCodCliente" runat="server" />
    <asp:HiddenField ID="hdfEstado" runat="server" />
    <asp:HiddenField ID="hdfRutaArchivo" runat="server" />
    <asp:HiddenField ID="hdftab" runat="server" />
    <asp:HiddenField ID="hdfCodEnt" runat="server" />
    <div id="divMsgConfirmacion" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <asp:Label ID="lblMensajeConfirmacion" runat="server" Text=""></asp:Label>
    </div>
    <div>
        <table width="100%">
            <tr>
                <td>
                    <table>
                        <tr>
                            <td>
                                <asp:Label ID="lblPlantilla" runat="server" Text="Seleccione una Plantilla: "></asp:Label>
                                <asp:TextBox ID="txtPlantilla" Width="250px" runat="server"></asp:TextBox>
                                <asp:HiddenField ID="hdfCodPlantilla" runat="server" />
                            </td>
                        </tr>
                        <tr style="height:10px;"><td></td></tr>
                        <tr>
                            <td>
                                <asp:FileUpload ID="flUpload" runat="server" />
                                <asp:Button ID="btnCargar" runat="server" Text="Cargar" OnClientClick="return seleccionoPlantilla();"
                                    OnClick="btnCargar_Click" />
                                <asp:Button ID="btnEliminar" runat="server" Text="Eliminar" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table>
                        <tr>
                            <td colspan="2">
                                <table id="grid">
                                </table>
                                <div id="pager">
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    <div style="margin-top: 2px;">
        <div id="btnGuardar" class="btnNormal">
            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
            <a>Guardar</a>
        </div>
        <div id="btnCerrar" class="btnNormal">
            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
            <a>Cerrar</a>
        </div>
    </div>
    </form>
</body>
</html>
