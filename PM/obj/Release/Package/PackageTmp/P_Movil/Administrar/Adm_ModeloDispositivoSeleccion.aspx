<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_ModeloDispositivoSeleccion" Codebehind="Adm_ModeloDispositivoSeleccion.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Adm_ModeloDispositivoSeleccion.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfCampana" runat="server" />
        <div style="margin-left:10px;">
            <div class="dvPanel ui-widget-content ui-corner-all">
                <b>
                    Filtros
                </b>
                <table>
                    <tr>
                        <td>
                            <asp:Label ID="Label3" runat="server" Text="Nombre"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtNombre" runat="server" Width="200px"></asp:TextBox>
                        </td>
                        <td></td>
                        <td>
                            <asp:Label ID="Label5" runat="server" Text="Tipo Servicio"></asp:Label>
                        </td>
                        <td>
                            <asp:DropDownList ID="ddlTipoServicio" runat="server" Width="200px"></asp:DropDownList>
                        </td>
                    </tr>
                </table>            
            </div>
            <table id="tblSeleccionModelo"></table>
            <div style="margin-top:5px; margin-bottom:5px; text-align:right;">
                <div id="btnAgregarSeleccion" class="btnNormal" style="margin-top:5px;">
                    <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                    <a>Agregar Selección</a>
                </div>
                <div id="btnCerrar" class="btnNormal">
                    <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    <a>Cerrar</a>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
