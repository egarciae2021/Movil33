<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="MenuConsultas.ascx.cs" Inherits="PcSistelMovil2Web.Common.Controles.MenuConsultas" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<cc1:TabJQ runat="server" ID="TabDetalle" CssClass="tabs" Style="margin-top: 1px;">
            <cc1:ContenedorTabJQ Titulo="Detalle">
                <table width="100%">
                    <tr class="trToolBar" align="center">
                        <td align="center">
                            <div id="toolbar" class="dvPanel" style="margin: 0px !important; padding: 0px !important;">
                                <table id="tbGeneral" width="100%">
                                    <tr>
                                        <td>
                                        </td>
                                        <td style="padding-right: 5px;">
                                            <table id="tblAcciones" runat="server" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <div id="btnAgregar" class="btnNormal" runat="server" title="Nuevo">
                                                            <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div runat="server" id="btnEditar" class="btnNormal" runat="server" title="Editar">
                                                            <asp:Image ID="imgEditar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div runat="server" id="btnEliminar" class="btnNormal" runat="server" title="Eliminar">
                                                            <asp:Image ID="imgEliminar" runat="server" ImageUrl="../Common/Images/Mantenimiento/delete_16x16.gif" />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td runat="server" id="tdvista" style="width: 100px; padding-right: 5px;" visible="false">
                                            <table id="tbVista" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <div id="btnVista" class="btnNormal" runat="server" title="Elija un tipo de vista"
                                                            click="ConfigurarFiltroRegistro">
                                                            <asp:Image ID="imgVista" runat="server" ImageUrl="../Common/Images/Mantenimiento/Views.png" />
                                                        </div>
                                                    </td>
                                                    <td style="width: 95px; text-align: left; padding-left: 1px;">
                                                        <span runat="server" id="lblVista">Mis Solicitudes</span>
                                                    </td>
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
                                                    </td>
                                                    <td>
                                                        <div id="btnAutDesPDF" class="btnNormal" runat="server" title="Descargar pdf de autorización de descuento"
                                                            style="height: 24px;">
                                                            <asp:Image ID="imgAutDesPDF" runat="server" ImageUrl="../Common/Images/Mantenimiento/Pdf_hover.png"
                                                                Height="16px" Width="16px" />
                                                        </div>
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
                                                    <td>En</td>
                                                    <td valign="middle" style="width: 170px;">
                                                        <asp:DropDownList ID="ddlFiltro" runat="server" Width="150px">
                                                            <asp:ListItem Value="IdTipoSolicitud" Text="Código"></asp:ListItem> 
                                                            <asp:ListItem Value="Descripcion" Text="Descripción"></asp:ListItem>                                                        
                                                            <asp:ListItem Value="EsActivo" Text="Estado"></asp:ListItem>
                                                            <asp:ListItem Value="Prefijo" Text="Prefijo"></asp:ListItem>
                                                            <asp:ListItem Value="TecnicoAsignado" Text="Técnico Responsable"></asp:ListItem>
                                                        </asp:DropDownList>
                                                    </td>
                                                    <td rowspan="2" valign="middle" style="width: 40px">
                                                       Filtrar
                                                    </td>
                                                    <td style="width: 250px; text-align: left;">
                                                      
                                                            <asp:TextBox ID="txtFiltro" runat="server" Width="160px"></asp:TextBox>
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