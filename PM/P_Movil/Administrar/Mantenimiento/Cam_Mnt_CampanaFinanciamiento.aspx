<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Cam_Mnt_CampanaFinanciamiento"
    CodeBehind="Cam_Mnt_CampanaFinanciamiento.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/jqGrid/ui.jqgrid.css" />
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" />
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/KendoUI/kendo.common.min.css" />
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" />
    <script type="text/javascript" src="../../../Common/Scripts/json2.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/knockout-2.3.0.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/KnockoutValidation/knockout.validation.min.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/KnockoutValidation/Localization/es-ES.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jquery.uniform.min.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/Utilitario.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/KendoUI/kendo.web.min.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/KendoUI/kendo.datepicker.min.js"></script>
    <script type="text/javascript" src="Cam_Mnt_CampanaFinanciamiento.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <%--<asp:HiddenField ID="hdfAdd" runat="server" />--%>
    <asp:HiddenField ID="hdfTipFinanc" runat="server" />
    <div class="ui-widget-content ui-corner-all" style="padding: 0px; margin: 0px; background-image: none;
        overflow: auto; display: none;">
        <table>
            <tr>
                <td style="width: 100px;">
                    Campaña Activa:
                </td>
                <td>
                    <asp:DropDownList ID="ddlCampanaActiva" runat="server" Width="300px">
                    </asp:DropDownList>
                </td>
                <%--<td>
                        Prueba Meses: 
                        <asp:DropDownList ID="ddlMeses" runat="server" Width="200px"></asp:DropDownList>
                    </td>--%>
            </tr>
        </table>
    </div>
    <%--   <br />--%>
    <%--        <div class="ui-widget-content ui-corner-all" style="padding:0px; margin:0px; background-image:none;  overflow: auto;">--%>
    <table border="0">
        <tr>
            <td style="width: 60px">
                <asp:Label ID="lblFiltro" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
            </td>
            <td rowspan="2" valign="middle" style="width: 200px">
                En:&nbsp;
                <asp:DropDownList ID="ddlBusquedaFinan" runat="server" Style="margin-left: 15px;
                    font-weight: normal;" Width="150px">
                    <asp:ListItem Value="vcDesc">Descripción</asp:ListItem>
                    <asp:ListItem Value="vcCod">Código</asp:ListItem>
                </asp:DropDownList>
            </td>
            <td rowspan="2" valign="middle" style="width: 420px">
                Filtrar:&nbsp;
                <asp:TextBox ID="txtBusquedaFinanciamiento" CssClass="txtBusqueda" runat="server"
                    Text="Valor a filtrar" Style="margin-left: 15px; font-weight: normal;" Width="250px"
                    MaxLength="200"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td>
                <%--20160705 1755--%>
                <%-- id_financ:<input type="text" name="id_financ" id="id_financ" value="" /><br />
                        def_value<input type="text" name="def_value" id="def_value" value="" /><br />
                        id_campana<input type="text" name="id_campana" id="id_campana" value="" /><br />

                        <input type="text" name="cat_value" id="cat_value" value=" " />--%>
                <%--<asp:HiddenField ID="id_financ" runat="server" Value="" />
                        <asp:HiddenField ID="def_value" runat="server" Value="" />
                        <asp:HiddenField ID="cat_value" runat="server" Value="" />--%>
            </td>
        </tr>
    </table>
    <table>
        <tr>
            <td>
                <table id="tblFinanciamiento">
                </table>
                <div id="pagerFinanciamiento">
                </div>
            </td>
            <td>
                <table>
                    <tr>
                        <td>
                            <div id="btnAgregarFinanciamiento" class="btnNormal" runat="server" style="width: 100px;">
                                <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                <a>Agregar</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="btnEditarFinanciamiento" class="btnNormal" runat="server" style="width: 100px;">
                                <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                <a>Editar</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="btnQuitarFinanciamiento" class="btnNormal" runat="server" style="width: 100px;">
                                <asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                <a>Quitar</a>
                            </div>
                        </td>
                        <td>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <%--        </div>--%>
    <div id="divMsgConfirmacionFinanciamiento" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>¿Desea eliminar
        los Financiamientos seleccionados?
    </div>
    <div id="divAgregarFinanciamiento" style="display: none;">
        <table width="100%">
            <tr id="trTipoFinanc">
                <td>
                    <table id="tbTipoFinanc">
                    </table>
                    <div id="pagerFinanc">
                    </div>
                </td>
            </tr>
        </table>
        <div id="divTipoFinacDetalles" class="ui-widget-content ui-corner-all" style="padding: 0px;
            margin: 0px; overflow: auto; display: none;">
            <table width="100%">
                <tr class="trFinanciamiento">
                    <td>
                        FINANCIAMIENTO:
                    </td>
                </tr>
                <tr class="trFinanciamiento">
                    <td>
                        <table style="padding-left: 50px;">
                            <tr>
                                <td style="width: 150px;">
                                    <asp:Label ID="lblDefFinanciamiento" runat="server"></asp:Label>
                                </td>
                                <td>
                                    <asp:Label ID="lblDatosFinanciamiento" runat="server"></asp:Label>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="trPeriodoGracia">
                    <td style="width: 160px">
                        PERIODO DE GRACIA:
                    </td>
                </tr>
                <tr class="trPeriodoGracia">
                    <td>
                        <table style="padding-left: 50px;">
                            <tr>
                                <td style="width: 150px;">
                                    <asp:Label ID="lblDefPeriodoGracia" runat="server"></asp:Label>
                                </td>
                                <td>
                                    <asp:Label ID="lblDatosPeriodoGracia" runat="server"></asp:Label>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="trCuotasDobles">
                    <td>
                        CUOTAS DOBLES:
                    </td>
                </tr>
                <tr class="trCuotasDobles">
                    <td>
                        <table style="padding-left: 50px;">
                            <tr>
                                <td style="width: 150px;">
                                    <asp:Label ID="lblDefCuotasDobles" runat="server"></asp:Label>
                                </td>
                                <td>
                                    <asp:Label ID="lblDatosCuotasDobles" runat="server"></asp:Label>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="trCuotaQuincena">
                    <td>
                        CUOTA QUINCENA:
                    </td>
                </tr>
                <tr class="trCuotaQuincena">
                    <td>
                        <table style="padding-left: 50px;">
                            <tr>
                                <td style="width: 150px;">
                                    <asp:Label ID="lblDefCuotaQuincena" runat="server"></asp:Label>
                                </td>
                                <td>
                                    <asp:Label ID="lblDatosCuotaQuincena" runat="server"></asp:Label>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="trIntereses">
                    <td>
                        INTERESES:
                    </td>
                </tr>
                <tr id="trTasaInteres" class="trIntereses">
                    <td>
                        <table style="padding-left: 50px;">
                            <tr>
                                <td style="width: 150px;">
                                    Tipo Interes:
                                </td>
                                <td>
                                    <asp:Label ID="lblTipoInteres" runat="server"></asp:Label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Tasa Interes:
                                </td>
                                <td>
                                    <asp:Label ID="lblTasaInteres" runat="server" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        <table width="100%">
            <tr>
                <td align="right">
                    <div id="btnGrabarFinanc" class="btnNormal" runat="server" style="width: 90px;">
                        <asp:Image ID="Image7" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                        <a>Grabar</a>
                    </div>
                    <div id="btnCerrarDialogFinanc" class="btnNormal" runat="server" style="width: 90px;">
                        <asp:Image ID="Image8" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                        <a>Cerrar</a>
                    </div>
                </td>
            </tr>
        </table>
    </div>







    <%--jbalmaceda--%>
    <div id="div_ModificarFinanciamiento" style="display: none">
        <table>
            <tr>
                <td>
                    <label>Por Defecto:</label><input type="checkbox" name="chk_isDefault_Modifica" id="chk_isDefault_Modifica" />
                    <label>
                        Categor&iacute;a:</label>
                    <select name="slct_cat" id="slct_cat">
                        <option value="E">Equipo</option>
                        <option value="C">Chip</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    &nbsp;
                </td>
            </tr>
            
            <tr>
                <td>
                    <div id="dv_updateFinan" class="btnNormal" runat="server" style="width: 102px;">
                        <asp:Image ID="Image4" runat="server" ImageUrl="~/Common/Images/Mantenimiento/actualizar.png" style="text-align:center" />
                        <a>Actualizar</a>
                    </div>
                    <div id="dv_cancelFinan" class="btnNormal" runat="server" style="width: 90px;">
                        <asp:Image ID="Image5" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                        <a>Cerrar</a>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
