<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Mnt_Opcion" Codebehind="Mnt_Opcion.aspx.vb" %>

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
        <script src="Mnt_Opcion.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfOpcion" runat="server" />
        <div id="divItem" style="display:none;">
            <table>
            <%--class="trNuevo" "trEditar"--%>
                <tr >
                    <td class="tdEtiqueta">
                        Nombre Item:
                    </td>
                    <td>
                        <asp:TextBox ID="txtNombreItem" runat="server" MaxLength="50" Width="350px"></asp:TextBox>
                    </td>
                </tr>
                <tr class="trNuevo" >
                    <td>
                        Orden
                    </td>
                    <td>
                        <asp:TextBox ID="txtOrdenItem" Text="1" runat="server" MaxLength="2" Width="38px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        URL</td>
                    <td>
                        <asp:TextBox ID="txtURLItem" runat="server" MaxLength="250" Width="350px"></asp:TextBox>
                    </td>
                </tr>

                <tr>
                    <td class="tdEtiqueta">
                        Tipo Origen:
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlTipoOrigenItem" runat="server"></asp:DropDownList>
                    </td>
                </tr>

                <tr>
                    <td class="tdEtiqueta">
                        Nombre Tabla:
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlTablaOrigen" runat="server"></asp:DropDownList>
                        <asp:TextBox ID="txtTablaOrigen" runat="server" MaxLength="250" Width="155px"></asp:TextBox>
                    </td>
                </tr>
            </table>
            <br />
            <div style="text-align:right;">
                <div id="btnGuardarItem" class="btnNormal">
                    <asp:Image ID="imgGuardarItem" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"/>
                    <a>Agregar</a>
                </div>
                <div id="btnCerrarItem" class="btnNormal">
                    <asp:Image ID="imgCerrarItem" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                    <a>Cerrar</a>
                </div>
            </div>                        
        </div>
        <div class="dvPanel">
            <table>
                <tr>
                    <td class="tdEtiqueta">
                        Nombre Opcion:
                    </td>
                    <td>
                        <asp:TextBox ID="txtNombre" runat="server" MaxLength="50" Width="350px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        Orden
                    </td>
                    <td>
                        <asp:TextBox ID="txtOrden" runat="server" Text="1" MaxLength="2" Width="38px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        URL</td>
                    <td>
                        <asp:TextBox ID="txtUrl" runat="server" MaxLength="250" Width="599px"></asp:TextBox>
                    </td>
                </tr>

                <tr>
                    <td class="tdEtiqueta">
                        Tipo Origen:
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlTipoOrigen" runat="server"></asp:DropDownList>
                    </td>
                </tr>

                <tr>
                    <td class="tdEtiqueta">
                        Nombre Tabla:
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlTabla" runat="server"></asp:DropDownList>
                        <asp:TextBox ID="txtTabla" runat="server" MaxLength="250" Width="100px"></asp:TextBox>
                    </td>
                </tr>

            </table>
        </div>
        <table width="100%" border="0">
            <tr>
                <td>                        
                    <table>
                        <tr>
                            <td>                                
                                <table id="tblItem"></table>
                            </td>
                            <td>
                                <table>
                                    <tr>
                                        <td>
                                            <div id="btnAgregarItem" class="btnNormal" style="width:110px;">
                                                <asp:Image ID="imgAgregarItem" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"/>
                                                <a>Agregar</a>
                                            </div>                                                
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div id="btnModificarItem" class="btnNormal" style="width:110px;">
                                                <asp:Image ID="imgModificarItem" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif"/>
                                                <a>Modificar</a>
                                            </div>                                                
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div id="btnEliminarItem" class="btnNormal" style="width:110px;">
                                                <asp:Image ID="imgEliminarItem" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png"/>
                                                <a>Quitar</a>
                                            </div>                                                
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
                <td align="right" valign="middle" valign="bottom">
                    <div id="btnEliminarOpcion" class="btnNormal">
                        <asp:Image ID="imgEliminarSubPlan" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png"/>
                        <a>Eliminar Opcion</a>
                    </div>
                </td>
            </tr>
        </table>
    </form>
</body>
</html>
