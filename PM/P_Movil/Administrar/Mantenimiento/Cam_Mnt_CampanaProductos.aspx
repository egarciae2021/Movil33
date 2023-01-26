<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Cam_Mnt_CampanaProductos" Codebehind="Cam_Mnt_CampanaProductos.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/jqGrid/ui.jqgrid.css" />
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" />
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/KendoUI/kendo.common.min.css" />
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" />

    <script type="text/javascript" src="../../../Common/Scripts/json2.js" ></script>
    <script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js" ></script>
    <script type="text/javascript" src="../../../Common/Scripts/knockout-2.3.0.js" ></script>
    <script type="text/javascript" src="../../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" ></script>
    <script type="text/javascript" src="../../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" ></script>
    <script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery-ui.js" ></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" ></script>
    <script type="text/javascript" src="../../../Common/Scripts/jquery.uniform.min.js" ></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" ></script>
    <script type="text/javascript" src="../../../Common/Scripts/Utilitario.js" ></script>

    <script type="text/javascript" src="../../../Common/Scripts/KendoUI/kendo.web.min.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/KendoUI/kendo.datepicker.min.js"></script>
        
    <script type="text/javascript" src="Cam_Mnt_CampanaProductos.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="ui-widget-content ui-corner-all" style="padding:0px; margin:0px; background-image:none; overflow: auto; display:none;">
        <table>
            <tr>
                <td style="width:100px;">Campaña Activa: </td>
                <td>
                    <asp:DropDownList ID="ddlCampanaActiva" runat="server" Width="300px"></asp:DropDownList>
                </td>
            </tr>
        </table>
        </div>
<%--      <br />--%>
<%--      <div class="ui-widget-content ui-corner-all" style="padding:0px; margin:0px; background-image:none; overflow: auto;">--%>
        <table border="0" style="margin-left:10px;">
            <tr>
                <td style="width:60px">
                    <asp:Label ID="lblFiltro" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
                </td> 
                <td rowspan="2" valign="middle" style="width:200px">
                    En:&nbsp;
                    <asp:DropDownList ID="ddlBusquedaProd" runat="server" style="margin-left:15px; font-weight:normal;" Width="150px">
                        <asp:ListItem Value="vcProd">Producto</asp:ListItem>
                        <asp:ListItem Value="vcTipo">Tipo Producto</asp:ListItem>
                    </asp:DropDownList>
                </td>
                <td rowspan="2" valign="middle" style="width:350px">
                    Filtrar:&nbsp;
                    <asp:TextBox ID="txtBusquedaProducto" CssClass="txtBusqueda" runat="server" Text="Valor a filtrar" style="margin-left:15px; font-weight:normal;" 
                                    width="280px" MaxLength="200"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
        </table>
        <table>
            <tr>
                <td>
                    <table id="tblProductos"></table>
                    <div id="pagerProductos"></div>
                </td>
                <td>
                    <table>
                        <tr>
                            <td>
                                <div id="btnAgregarProductos" class="btnNormal" runat="server" style="width:140px;">
                                    <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                    <a>Agregar</a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div id="btnEditarProductos" class="btnNormal" runat="server" style="width:140px;">
                                    <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                    <a>Editar</a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>                    
                                <div id="btnQuitarProductos" class="btnNormal" runat="server" style="width:140px;">
                                    <asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                    <a>Quitar</a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>                    
                                <div id="btnMostrarPrecios" class="btnNormal" runat="server" style="width:140px;">
                                    <table>
                                        <tr>
                                            <td>
                                                <%--<asp:Image ID="Image4" runat="server" ImageUrl="~/Common/Images/Mantenimiento/BuscarDetalle.gif" />--%>
                                                <asp:Image ID="Image11" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Busqueda.png" Width="16px" Height="16px" />
                                            </td>
                                            <td>
                                                <a>Mostrar Precios</a>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblMensaje" runat="server" 
                        Text="* Agregue por lo menos un plan asociado a cada equipo para poder verlo en el módulo de pedidos." 
                        ForeColor="Red" Font-Bold="True" Font-Italic="True"></asp:Label>
                </td>
            </tr>
        </table>
<%--        </div>--%>
        
        <div id="divMsgConfirmacionFinanciamiento" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            ¿Desea eliminar los productos seleccionados?
        </div>
        <div id="divAgregarProductos" style="display:none;">
            <table width="100%">
                <tr id="trTipoProducto">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td style="width:50px;">Tipo:</td>
                                <td style="width:160px;">
                                    <asp:DropDownList ID="ddlTipoProducto" runat="server" Width="140px"></asp:DropDownList>        
                                </td>
                                <td style="width:60px;">Nombre:</td>
                                <td>
                                    <asp:TextBox ID="txtNombreProd" CssClass="txtBusqueda" runat="server" Text="Valor a filtrar" 
                                        style="margin-left:15px; font-weight:normal;" width="180px" MaxLength="200"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trEntidad">
                    <td colspan="2">
                        <table id="tblEntidad"></table>
                        <div id="pagerEntidad"></div>
                    </td>
                </tr>
                <tr id="trTipoProd">
                    <td>
                        Tipo Prod:
                    </td>
                    <td>
                        <asp:TextBox ID="txtTipoProdSelect" runat="server" Enabled="false"></asp:TextBox>
                        <asp:HiddenField ID="hdfTipProdSelect" runat="server" />
                    </td>
                </tr>
                <tr id="trProducto">
                    <td>
                        Producto:
                    </td>
                    <td>
                        <asp:TextBox ID="txtProdSelect" runat="server" Width="300px" Enabled="false"></asp:TextBox>
                        <asp:HiddenField ID="hdfProdSelect" runat="server" />
                    </td>
                </tr>
                <tr>
                    <td style="width:90px;">
                        Precio: 
                    </td>
                    <td>
                        <asp:TextBox ID="txtPrecioProducto" runat="server" MaxLength="20"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        Cantidad Total: 
                    </td>
                    <td>
                        <asp:TextBox ID="txtCantidadTotal" runat="server" MaxLength="20"></asp:TextBox>
                        <asp:HiddenField ID="hdCantidadUsadaSelect" runat="server" />
                    </td>
                </tr>
                <tr id="trReservable">
                    <td>
                        Reservable:
                    </td>
                    <td>
                        <input id="chkReservable" type="checkbox"/>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="right">
                        <div id="btnGrabarProd" class="btnNormal" runat="server" style="width:90px;">
                            <asp:Image ID="Image7" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                            <a>Grabar</a>
                        </div>
                        <div id="btnCerrarDialog" class="btnNormal" runat="server" style="width:90px;">
                            <asp:Image ID="Image8" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                            <a>Salir</a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="divMsgConfirmInsertarExistente" style="display:none;">
            <table width="100%">
                <tr>
                    <td colspan="2">
                        <span class="ui-icon ui-icon-alert" style="float:left;"></span>
                        Los siguientes <asp:Label ID="lblMsg1" runat="server"></asp:Label> ya estan registrados.
                    </td>
                </tr>
                <tr>
                    <td style="width:40px;"></td>
                    <td>
                        <div id="divExistentes" runat="server">
                            <ul></ul>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <%--<span class="ui-icon ui-icon-help" style="float:left;"></span>--%>
                        ¿Desea reemplazar el monto Aprobado para estos <asp:Label ID="lblMsg2" runat="server"></asp:Label>?
                    </td>
                </tr>
            </table>
        </div>
        <div id="divPrecios" runat="server" style="display:none;">
            <table>
                <tr>
                    <td style="width:120px;">
                        Producto:
                    </td>
                    <td style="width:420px;">
                        <asp:Label ID="lblProducto" runat="server"></asp:Label>
                        <asp:HiddenField ID="hdfIdProducto" runat="server" />
                        <asp:HiddenField ID="hdfMeses" runat="server" />
                    </td>
                </tr>
                <tr id="trGrillaPrecios">
                    <td colspan="2">
                        <table id="tbPrecios"></table>
                    </td>
                </tr>
                <tr style="height:10px;">
                    <td colspan="2"></td>
                </tr>
                <tr id="trPlanProducto">
                    <td>Plan:</td>
                    <td>
                        <asp:TextBox ID="txtPlanProducto" runat="server" Width="200px"></asp:TextBox>&nbsp;&nbsp;<asp:CheckBox id="chkEsRenovacion" runat="server" Text="Es Renovación"/>
                        <asp:HiddenField ID="hdfPlanProducto" runat="server" />
                    </td>
                </tr>
                <tr id="trTieneEquivalente" style="display:none;">
                    <td>Tiene equivalente:</td>
                    <td><asp:CheckBox id="chkTieneEquivalente" runat="server"/></td>
                </tr>
                <tr id="trPlanEquivalente" style="display:none;">
                    <td>Plan Equivalente:</td>
                    <td>
                        <asp:TextBox ID="txtPlanEquivalente" runat="server" Width="200px"></asp:TextBox>
                        <asp:HiddenField ID="hdfPlanEquivalente" runat="server" />
                    </td>
                </tr>
                <tr id="trMesesContrato">
                    <td>
                        Meses Contrato:
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlMesesContrato" runat="server" Width="110px">
                            <asp:ListItem Value="-1" Text="--Seleccione--"></asp:ListItem>
                            <asp:ListItem Value="6" Text="6"></asp:ListItem>
                            <asp:ListItem Value="12" Text="12"></asp:ListItem>
                            <asp:ListItem Value="18" Text="18"></asp:ListItem>
                            <asp:ListItem Value="24" Text="24"></asp:ListItem>
                            <asp:ListItem Value="30" Text="30"></asp:ListItem>
                            <asp:ListItem Value="36" Text="36"></asp:ListItem>
                        </asp:DropDownList>
                    </td>
                </tr>
                <tr id="trPrecioContrato">
                    <td>
                        Precio:
                    </td>
                    <td>
                        <asp:TextBox ID="txtPrecioContrato" runat="server" Width="110px" MaxLength="18"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trEspacioBotones" style="height:2px;">
                    <td colspan="2"></td>
                </tr>
                <tr>
                    <td colspan="2" align="right">
                        <div id="btnQuitarPrecioProducto" class="btnNormal" runat="server" style="width:90px;">
                            <asp:Image ID="Image12" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                            <a>Quitar</a>
                        </div>
                        <div id="btnAgregarPrecioProducto" class="btnNormal" runat="server" style="width:110px;">
                            <asp:Image ID="Image4" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                            <a>Agregar</a>
                        </div>
                        <div id="btnEditarPreciosProducto" class="btnNormal" runat="server" style="width:90px;">
                            <asp:Image ID="Image5" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                            <a>Editar</a>
                        </div>
                        <div id="btnGuardarPreciosProducto" class="btnNormal" runat="server" style="width:90px;">
                            <asp:Image ID="Image10" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                            <a>Guardar</a>
                        </div>
                        <div id="btnCancelarEdicionPrecios" class="btnNormal" runat="server" style="width:100px;">
                            <asp:Image ID="Image9" runat="server" ImageUrl="~/Common/Images/Mantenimiento/btnCancel.png" />
                            <a>Cancelar</a>
                        </div>
                        <div id="btnSalirPreciosProducto" class="btnNormal" runat="server" style="width:90px;">
                            <asp:Image ID="Image6" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                            <a>Salir</a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="divMsgEliminarProductoPrecio" runat="server" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            ¿Desea eliminar el registro seleccionado?
        </div>
    </form>
</body>
</html>
