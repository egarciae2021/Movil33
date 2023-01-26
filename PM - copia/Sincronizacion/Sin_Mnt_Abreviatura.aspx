<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Sin_Mnt_Abreviatura.aspx.vb" Inherits=".Sin_Mnt_Abreviatura" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register Src="../Common/Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcel"
    TagPrefix="eeg" %>
<%@ Register Src="../Common/Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcel2"
    TagPrefix="eeg2" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
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
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <script src="Sin_Mnt_Abreviatura.js" type="text/javascript"></script>

</head>
<body>
   <form id="form1" runat="server">
    <asp:HiddenField ID="hdfCodAbreviatura" runat="server" />
    <asp:HiddenField ID="hdfEstado" runat="server" />
    <div id="dvGridListado" style="width: 100%; overflow: hidden">
        <table class="dvPanel" width="100%">
            <tr class="trToolBar" align="center" style="margin: 0px !important; padding: 0px !important;
                overflow: auto;">
                <td align="left">
                    <div class="dvPanel" style="margin: 0px !important; padding: 0px !important; overflow: hidden;">
                        <table border="0" width="100%">
                            <tr>
                                <td>
                                    <table id="tblAccionesAbreviatura" runat="server" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <div id="btnAgregarAbreviatura" class="btnNormal" runat="server" title="Nuevo" click="AgregarRegistroC">
                                                    <asp:Image ID="imgAgregarC" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                </div>
                                            </td>
                                            <td>
                                                <div id="btnEditarAbreviatura" class="btnNormal" runat="server" title="Editar Seleccionado" click="EditarRegistroC">
                                                    <asp:Image ID="imgEditarC" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                                </div>
                                            </td>
                                            <td>
                                                <div id="btnEliminarAbreviatura" class="btnNormal" runat="server" title="Eliminar Seleccionados" click="EliminarRegistroC">
                                                    <asp:Image ID="imgEliminar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" />
                                                </div>
                                            </td>
                                            <td>
                                                <div id="btnExportarCodigo" class="btnNormals" runat="server" title="Exportar a Excel" style="display: none;">
                                                    <eeg:ExportarExcel ID="eeListado" runat="server" Visible="true" />
                                                </div>
                                                <td>
                                                    <div id="btnCambiarCodigo" class="btnNormal" runat="server" title="Eliminar Seleccionados"
                                                        click="CambiarCodigo"  style="display: none;">
                                                        <asp:Image ID="ImgCambiar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Cambio.png" />
                                                    </div>
                                                </td>
                                                <td style="width: 100px;">
                                                </td>
                                                <td style="width: 40px;">
                                                  Buscar:
                                                </td>
                                                <td valign="middle" style="text-align: right;">
                                                    <asp:TextBox ID="txtBusquedaAbreviatura" runat="server" Text="" Style="margin-left: 15px; font-weight: normal;" Width="250px" MaxLength="50">
                                                    </asp:TextBox>
                                                </td>
                                                <td>
                                                    <div id="btnBuscarAbreviatura" class="btnNormal" runat="server" title="Buscar" click="BuscarAbreviatura">
                                                        <asp:Image ID="imgBuscarCodigo" runat="server" ImageUrl="~/Common/Images/Mantenimiento/buscar.png" />
                                                    </div>
                                                </td>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <table id="grid">
                    </table>
                    <div id="pager">
                    </div>
                </td>
            </tr>
        </table>
    </div>

    <div id="dvMantenimiento" style="width: 100%; overflow: hidden; display: none;">
      <div class="dvPanel" style="overflow: auto;">
        <table width="100%">
            <tr id="trCodigo" runat="server">
                <td class="TituloMant">
                    Código
                </td>
                <td class="ValorMant">
                    <asp:TextBox ID="txtCodigo" runat="server" MaxLength="15" Width="70px"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="TituloMant">
                    Descripción
                </td>
                <td class="ValorMant">
                    <asp:TextBox ID="txtDescripcion" runat="server" MaxLength="50" Width="300px"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    Abreviatura
                </td>
                <td>
                    <asp:TextBox ID="txtAbreviatura" runat="server" MaxLength="15" Width="300px"></asp:TextBox>
                </td>
            </tr>
            <tr id="trEstado" runat="server">
               <td class="TituloMant" id="tdEstado" style="display:none;">
                    Estado
                </td>
                <td class="ValorMant">
                    <asp:CheckBox Text="Activo" ID="chActivo" runat="server" MaxLength="50" Width="199px" AutoPostBack="false"></asp:CheckBox>
                </td>
            </tr>
        </table>
      </div>
      <div style="margin-top:2px;">
        <div id="btnGuardar" class="btnNormal">
            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
            <a>Guardar</a>
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
