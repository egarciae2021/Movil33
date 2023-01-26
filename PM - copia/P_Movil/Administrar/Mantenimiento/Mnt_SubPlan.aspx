<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Mnt_SubPlan" Codebehind="Mnt_SubPlan.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
        <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
        <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
        <link href="../../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
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
        <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
        <script src="Mnt_SubPlan.js" type="text/javascript"></script>
        <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfSubPlan" runat="server" />
        <div id="divServicios" style="display:none;">
            <table>
                <tr class="trNuevo">
                    <td>
                        Tipo servicio:
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlTipoServicio" runat="server" Width="200px"></asp:DropDownList>
                    </td>
                </tr>
                <tr class="trNuevo">
                    <td>
                        Servicio:
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlServicio" runat="server" Width="200px"></asp:DropDownList>
                    </td>
                </tr>
                <tr class="trEditar" style="display:none;">
                    <td>
                        Servicio:
                    </td>
                    <td>
                        <asp:Label ID="lblServicio" runat="server" Text=""></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td>
                        Servicio ilimitado:
                    </td>
                    <td>
                        <asp:CheckBox ID="chkServicioIlimitado" runat="server" />
                    </td>
                </tr>
                <tr id="trCantidad">
                    <td>
                        <asp:Label ID="lblTituloCantidadServicio" runat="server" Text="Cantidad"></asp:Label>
                        <asp:Label ID="lblUnidadTituloCantidadServicio" runat="server" Text=":"></asp:Label>                 
                    </td>
                    <td>
                        <asp:TextBox ID="txtCantidadServicio" runat="server" MaxLength="7" Width="70px"></asp:TextBox>                    
                    </td>
                </tr>
            </table>
            <br />
            <div style="text-align:right;">
                <div id="btnGuardarServicio" class="btnNormal">
                    <asp:Image ID="imgGuardarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"/>
                    <a>Agregar</a>
                </div>
                <div id="btnCerrarServicio" class="btnNormal">
                    <asp:Image ID="imgCerrarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                    <a>Cerrar</a>
                </div>
            </div>
        </div>

        <div class="dvPanel">
            <table>
                <tr>
                    <td>
                        Nombre:
                    </td>
                    <td>
                        <asp:TextBox ID="txtNombre" runat="server" Width="200px" MaxLength="50"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        Descripción:
                    </td>
                    <td>
                        <asp:TextBox ID="txtDescripcion" runat="server" Width="300px" MaxLength="150"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="LblMonto" runat="server" Text="Monto"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtMonto" runat="server" Width="100px" MaxLength="9"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblTituloCantidad" runat="server" Text="Cantidad"></asp:Label>
                        <asp:Label ID="lblUnidadTituloCantidad" runat="server" Text=":"></asp:Label>
                    </td>
                    <td>
                        <asp:Label ID="lblCantidad" runat="server" CssClass="lblNormal" Text="" Height="15px" Width="100px"></asp:Label>
                    </td>
                </tr>
            </table>
        </div>                     
        <table width="100%">
            <tr>
                <td>
                    <table id="tblServicio"></table>
                </td>
                <td>
                    <table>
                        <tr>
                            <td>
                                <div id="btnAgregarServicio" class="btnNormal" style="width:110px;">
                                    <asp:Image ID="imgAgregarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"/>
                                    <a>Agregar</a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div id="btnModificarServicio" class="btnNormal" style="width:110px;">
                                    <asp:Image ID="imgModificarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif"/>
                                    <a>Modificar</a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div id="btnEliminarServicio" class="btnNormal" style="width:110px;">
                                    <asp:Image ID="imgEliminarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png"/>
                                    <a>Quitar</a>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </form>
</body>
</html>
