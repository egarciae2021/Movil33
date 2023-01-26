<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Adm_Lista.aspx.cs" Inherits="PcSistelMovil2Web.Common.Page.Adm_Lista" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register Src="../../Common/Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcelGenerico"
    TagPrefix="eeg" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../Common/Styles/JqueryThemeRoller/redmond/jquery-ui-1.8.16.custom.css"
        rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Scripts/jqGrid/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../../Common/Styles/Principal2.css" rel="stylesheet" type="text/css" />
    <script src="Adm_Lista.js" type="text/javascript"></script>



</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="HiddenField1" runat="server" />
    <asp:HiddenField ID="hdfEdicion" runat="server" />
    <asp:HiddenField ID="hdfActivo" runat="server" />
    <asp:HiddenField ID="hdfDesactivo" runat="server" />
    <asp:HiddenField ID="hdfElim" runat="server" />
    <asp:HiddenField ID="hdfVerdadero" runat="server" />
    <asp:HiddenField ID="hdfFalso" runat="server" />
    <asp:HiddenField ID="hdfCampBool" runat="server" />
    <asp:HiddenField ID="hdfinTipOri" runat="server" />
    <asp:HiddenField ID="hdfCodEntidad" runat="server" />
    <asp:HiddenField ID="hdfValorPorDefecto" runat="server" />
    <asp:HiddenField ID="hdfNumMaxNivel" runat="server" />
    <div id="divMsgConfirmacion" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <asp:Label ID="lblMensajeConfirmacion" runat="server" Text=""></asp:Label>
    </div>
    <div id="divAviso" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <asp:Label ID="lblAviso" runat="server" Width="200px" Text=""></asp:Label>
    </div>
    <asp:HiddenField ID="hdfvcTab" runat="server" />
     <asp:HiddenField ID="hdfBotonAgregar" runat="server" />
    <div id="dvMsgAlertaExterna" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <div id="dvContenidoAlertaExterna">
        </div>
    </div>
    <div>
        <cc1:TabJQ runat="server" ID="TabDetalle" CssClass="tabs" Style="margin-top: 1px;">
            <cc1:ContenedorTabJQ ID="tabContenido" Titulo="Detalle" runat="server">
                <table width="100%">
                    <tr class="trToolBar" align="center">
                        <td align="center">
                            <div id="toolbar" class="dvPanel" style="margin: 0px !important; padding: 0px !important;">
                                <table id="tbGeneral" width="100%">
                                    <tr>
                                        <td>
                                        </td>
                                        <td style="padding-right: 0px;">
                                            <table id="tblAcciones" runat="server" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <div id="btnAgregar" class="btnNormal" runat="server" title="Nuevo" click="AgregarRegistro">
                                                            <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div id="btnEditar" class="btnNormal" runat="server" title="Editar Seleccionado"
                                                            click="EditarRegistro">
                                                            <asp:Image ID="imgEditar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div id="btnEliminar" class="btnNormal" runat="server" title="Eliminar Seleccionados"
                                                            click="EliminarRegistro">
                                                            <asp:Image ID="imgEliminar" runat="server" ImageUrl="../../Common/Images/Mantenimiento/delete_16x16.gif" />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                            <td style="width: 40px; padding-right: 10px;">
                                                <table id="tblEstado" runat="server" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td>
                                                            <div id="btnActivar" class="btnNormal" runat="server" title="Activar Seleccionados"
                                                                click="ActivarRegistro">
                                                                <asp:Image ID="imgActivar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Activar_16x16.png" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </td>
                                
                                   <td style="width: 40px; padding-right: 10px;">
                                        <table id="tblFiltroBusqueda" cellpadding="0" cellspacing="0" runat="server">
                                            <tr>
                                                <td>
                                                    <div id="btnConfigurarFiltroRegistro" class="btnNormal" runat="server" title="Configurar filtro de registro"
                                                        click="ConfigurarFiltroRegistro">
                                                        <asp:Image ID="imgConfigurarFiltroRegistro" runat="server" ImageUrl="~/Common/Images/Mantenimiento/VistaDetalle.png" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td>
                                        <table id="tblAvanzada" runat="server" cellpadding="0" cellspacing="0">
                                            <tr id="trAvanzada" runat="server">
                                            </tr>
                                        </table>
                                    </td>
                                        <td style="width: 5px;">
                                        </td>
                                        <td style="width: 20px; padding-right: 5px;">
                                            <table id="tbExportar" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <%-- <uc1:ExportarExcelGenerico ID="eegSolicitudes" runat="server" />--%>
                                                        <eeg:ExportarExcelGenerico ID="eeListado" runat="server" Visible="true" />
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td style="padding-right: 5px;">
                                            <table border="0">
                                                <tr>
                                                    <td style="width: 40px; height: 32px">
                                                        <asp:Label ID="lblFiltro" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
                                                    </td>
                                                    <td>
                                                        En
                                                    </td>
                                                    <td valign="middle" style="width: 170px;">
                                                        <asp:DropDownList ID="ddlBusqueda" runat="server" Width="150px">
                                                        </asp:DropDownList>
                                                    </td>
                                                    <td rowspan="2" valign="middle" style="width: 220px">
                                                        Filtrar:&nbsp;
                                                        <asp:TextBox ID="txtBusqueda" CssClass="txtBusqueda" runat="server" Text="Valor a filtrar"
                                                            Style="margin-left: 15px; font-weight: normal;" Width="140px" MaxLength="200"></asp:TextBox>
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
                            <table id="grid" runat="server">
                            </table>
                            <div id="pager">
                            </div>
                        </td>
                    </tr>
                </table>
            </cc1:ContenedorTabJQ>
        </cc1:TabJQ>

         <div id="divListado" style="display: none;">
    </div>
    <div id="dvColumna" style="display: none; padding: 0px; margin: 0px;">
        <iframe id="ifColumna" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
    </div>
    <div id="dvFiltroRegistro" class="dvPanel" style="display: none; width: 75px;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>
                    <asp:RadioButton ID="rbtnActivos" runat="server" Text="Activos" GroupName="rbtnFiltroRegistro"
                        Checked="true" />
                </td>
            </tr>
            <tr>
                <td>
                    <asp:RadioButton ID="rbtnInactivos" runat="server" Text="Inactivos" GroupName="rbtnFiltroRegistro" />
                </td>
            </tr>
            <tr>
                <td>
                    <asp:RadioButton ID="rbtnTodos" runat="server" Text="Todos" GroupName="rbtnFiltroRegistro" />
                </td>
            </tr>
        </table>
    </div>
    </div>
    </form>
</body>
</html>
