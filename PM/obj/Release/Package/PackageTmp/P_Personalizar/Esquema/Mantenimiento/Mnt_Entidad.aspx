<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Personalizar_Esquema_Mantenimiento_Mnt_Entidad" Codebehind="Mnt_Entidad.aspx.vb" %>

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
    <script src="Mnt_Entidad.js" type="text/javascript"></script>
    <script type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfOpcion" runat="server" />
    <asp:HiddenField ID="hdfEntidad" runat="server" />
    <div id="divProcedimientos" style="display: none;">
        <table width="100%">
            <tr>
                <td>
                    Tipo:
                </td>
                <td>
                    <asp:DropDownList ID="ddlTipoProcedimiento" Width="550px" runat="server">
                    </asp:DropDownList>
                </td>
            </tr>
            <tr>
                <td>
                </td>
                <td>
                    <asp:TextBox runat="server" ID="txtScript" Width="540px" Height="350px" TextMode="MultiLine"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                </td>
                <td align="right">
                    <div id="btnEjecutarSP" class="btnNormal" style="width: 110px;">
                        <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Actualizar.png" />
                        <a>Ejecutar</a>
                    </div>
                    <div id="btnCerrarSP" class="btnNormal" style="width: 110px;">
                        <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Cancelar.png" />
                        <a>Cerrar</a>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div id="divCampo" style="display: none;">
        <table>
            <%--class="trNuevo" "trEditar"--%>
            <tr class="trNuevo">
                <td class="tdEtiqueta">
                    Nombre Campo:
                </td>
                <td>
                    <asp:DropDownList ID="ddlCampos" runat="server">
                    </asp:DropDownList>
                </td>
            </tr>
            <tr class="otrocampo">
                <td>
                </td>
                <td class="tdEtiqueta">
                    <table>
                        <tr>
                            <td>
                                Tabla Base
                            </td>
                            <td>
                                <asp:DropDownList ID="ddlTablaBase" runat="server">
                                </asp:DropDownList>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Campo Foraneo
                            </td>
                            <td>
                                <asp:DropDownList ID="ddlCampoForaneo" runat="server" Width="150px">
                                </asp:DropDownList>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Tabla Destino
                            </td>
                            <td>
                                <asp:TextBox ID="txtTablaDestino" ForeColor="#9b9b9b" runat="server" ReadOnly="true"
                                    MaxLength="50" Width="150px"></asp:TextBox>
                                <asp:HiddenField ID="hfPrimaryKeyTR" runat="server" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Campo a Mostrar
                            </td>
                            <td>
                                <asp:DropDownList ID="ddlCampoMostrar" runat="server">
                                </asp:DropDownList>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr class="trNuevo">
                <td colspan="2">
                    <table>
                        <tr>
                            <td>
                                <asp:CheckBox ID="chkLlavePrimaria" runat="server" Enabled="false" Text=" Llave Primaria" />
                            </td>
                            <td>
                                <asp:CheckBox ID="chkIdentity" runat="server" Enabled="false" Text=" Identity" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td class="tdEtiqueta">
                    Descripción:
                </td>
                <td>
                    <asp:TextBox ID="txtDescripcionCampo" runat="server" MaxLength="50" Width="350px"></asp:TextBox>
                </td>
            </tr>
            <tr class="trNuevo">
                <td class="tdEtiqueta">
                    Alias:
                </td>
                <td>
                    <asp:TextBox ID="txtAlias" runat="server" MaxLength="50" Width="150px"></asp:TextBox>
                    (Debe ser &uacute;nico)
                </td>
            </tr>
            <tr class="trNuevo">
                <td>
                    Orden
                </td>
                <td>
                    <asp:TextBox ID="txtOrdenCampo" Text="1" runat="server" MaxLength="2" Width="38px"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <table width="100%">
                        <tr>
                            <td>
                                <asp:CheckBox ID="chkOrdenarCampo" runat="server" Text=" Ordenar" />
                            </td>
                            <td>
                                <asp:CheckBox ID="chkVisibleCampo" runat="server" Text=" Visible" />
                            </td>
                            <td>
                                <asp:CheckBox ID="chkEliminarDepedencia" runat="server" Text=" Elim. Dependencia" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:CheckBox ID="chkFiltrarCampo" runat="server" Text=" Filtrar" />
                            </td>
                            <td>
                                <asp:CheckBox ID="chkEliminarLogica" runat="server" Text=" Elim. L&oacute;gica" />
                            </td>
                            <td>
                                <asp:CheckBox ID="chkbtVig" runat="server" Text=" Usar en Listado" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    Largo
                </td>
                <td>
                    <asp:TextBox ID="txtLargoCampo" Text="150" runat="server" MaxLength="4" Width="38px"></asp:TextBox>
                </td>
            </tr>
            <%--<tr>
                    <td>
                        Valor Defecto
                    </td>
                    <td>
                        <asp:TextBox ID="txtPorDefecto" Text="0" runat="server" MaxLength="200" Width="150px"></asp:TextBox>
                    </td>
                </tr>--%>
            <tr>
                <td class="tdEtiqueta">
                    Tipo de Dato
                </td>
                <td>
                    <asp:DropDownList ID="ddlTipoDato" runat="server">
                    </asp:DropDownList>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <table class="tipologico">
                        <tr>
                            <td>
                                Valor Verdadero
                            </td>
                            <td>
                                <asp:TextBox ID="txtValorVerdadero" Text="SI" runat="server" MaxLength="100" Width="150px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Valor Falso
                            </td>
                            <td>
                                <asp:TextBox ID="txtValorFalso" Text="NO" runat="server" MaxLength="100" Width="150px"></asp:TextBox>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <br />
        <div style="text-align: right;">
            <div id="btnGuardarCampo" class="btnNormal">
                <asp:Image ID="imgGuardarCampo" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                <a>Agregar</a>
            </div>
            <div id="btnCerrarCampo" class="btnNormal">
                <asp:Image ID="imgCerrarItem" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cerrar</a>
            </div>
        </div>
    </div>
    <div class="dvPanel">
        <table>
            <tr>
                <td class="tdEtiqueta">
                    Tipo Origen:
                </td>
                <td>
                    <asp:DropDownList ID="ddlTipoOrigen" runat="server">
                    </asp:DropDownList>
                </td>
            </tr>
            <tr>
                <td class="tdEtiqueta">
                    Nombre Tabla:
                </td>
                <td>
                    <asp:DropDownList ID="ddlTabla" runat="server">
                    </asp:DropDownList>
                    <asp:Label runat="server" Font-Bold="true" ID="lblMensajeTabla"></asp:Label>
                </td>
            </tr>
            <tr>
                <td class="tdEtiqueta">
                    Descripción:
                </td>
                <td>
                    <asp:TextBox ID="txtDescripcion" runat="server" MaxLength="50" Width="350px"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    URL
                </td>
                <td>
                    <asp:TextBox ID="txtUrl" runat="server" MaxLength="250" Width="599px"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <table width="100%">
                        <tr>
                            <td>
                                <asp:CheckBox ID="chkNuevo" runat="server" Text=" Nuevo" />
                            </td>
                            <td>
                                <asp:CheckBox ID="chkEliminar" runat="server" Text=" Eliminar" />
                            </td>
                            <td>
                                <asp:CheckBox ID="chkImprimir" runat="server" Text=" Imprimir" />
                            </td>
                            <td>
                                <asp:CheckBox ID="chkOrdenar" runat="server" Text=" Ordenar" />
                            </td>
                            <td>
                                <asp:CheckBox ID="chkCampoDinamico" runat="server" Text=" Campos Dinamicos" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:CheckBox ID="chkEditar" runat="server" Text=" Editar" />
                            </td>
                            <td>
                                <asp:CheckBox ID="chkExportar" runat="server" Text=" Exportar" />
                            </td>
                            <td>
                                <asp:CheckBox ID="chkBuscar" runat="server" Text=" Buscar" />
                            </td>
                            <td>
                                <asp:CheckBox ID="chkOrdenarColumna" runat="server" Text=" Ordenar Columna" />
                            </td>
                            <td>
                                <asp:CheckBox ID="chkVigente" runat="server" Text=" Vigente" />
                            </td>
                        </tr>
                    </table>
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
                            <table id="tblCampo">
                            </table>
                        </td>
                        <td>
                            <table>
                                <tr>
                                    <td>
                                        <div id="btnAgregar" class="btnNormal" style="width: 110px;">
                                            <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                            <a>Agregar</a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id="btnModificar" class="btnNormal" style="width: 110px;">
                                            <asp:Image ID="imgModificar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                            <a>Modificar</a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id="btnEliminar" class="btnNormal" style="width: 110px;">
                                            <asp:Image ID="imgEliminar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                            <a>Quitar</a>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <br />
    <table border="0" width="100%">
        <tr>
            <td>
                <div style="text-align: left;">
                    <div id="btnGuardar" class="btnNormal">
                        <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                        <a>Guardar</a>
                    </div>
                </div>
            </td>
            <td>
                <div style="text-align: right;">
                    <div id="btnProcedimientos" class="btnNormal">
                        <asp:Image ID="imgProcedimientos" runat="server" ImageUrl="~/Common/Images/Mantenimiento/storep.png" />
                        <a>Scripts</a>
                    </div>
                </div>
            </td>
        </tr>
    </table>
    </form>
</body>
</html>
