<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Mnt_Caracteristica" Codebehind="Mnt_Caracteristica.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
	<link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="Mnt_Caracteristica.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfTamano" runat="server" Value=""/>
        <asp:HiddenField ID="hdfCaracteristica" runat="server" Value=""/>
        <div id="dvCargando" class="dvCargando"></div>
        <div class="dvPanel" style="overflow: auto;">
            <table>
                <tr id="trCampo" runat="server">
                    <td class="TituloMant">
                        Campo
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtCampo" runat="server" Width="300px" MaxLength="20"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="TituloMant">
                        Descripción
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtDescripcion" runat="server" Width="300px" MaxLength="50"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trTabla" runat="server">
                    <td class="TituloMant">
                        Tabla
                    </td>
                    <td class="ValorMant">
                        <asp:DropDownList ID="ddlTabla" runat="server" Width="249px"></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trTipoDato" runat="server">
                    <td class="TituloMant">
                        Tipo de dato
                    </td>
                    <td class="ValorMant">
                        <asp:DropDownList ID="ddlTipoDato" runat="server" Width="249px"></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trTamDat" runat="server">
                    <td class="TituloMant" id ="tdTamano">
                        Tamaño
                    </td>
                    <td class="ValorMant">
                        <asp:TextBox ID="txtTamanoDato" CssClass="txtBusqueda" runat="server" Width="300px" MaxLength="35"></asp:TextBox>
                        <span id="lblMensajeTamano"></span>

                        <div id="divPicklist" runat="server" style="display: none;">
                            <table>
                                <tr>
                                    <td>
                                        <select id="lstPicklist" size="4" multiple="multiple" style="width: 165px;">
                                        </select>
                                    </td>
                                    <td>
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr><td> <div id="btnPicklistAgregar" class="btnPicklist">Agregar</div> </td></tr>
                                            <tr><td> <div id="btnPicklistEditar" class="btnPicklist">Editar</div></td></tr>
                                            <tr><td> <div id="btnPicklistEliminar" class="btnPicklist">Eliminar</div></td></tr>
                                            <tr><td> <div id="btnPicklistSubir" class="btnPicklist">Subir</div></td></tr>
                                            <tr><td> <div id="btnPicklistBajar" class="btnPicklist">Bajar</div></td></tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div id="divValorPicklist" style="display:none;" >
                            <table>
                                <tr>
                                    <td colspan="2" id="tdTituloPicklist"></td>
                                </tr>
                                <tr>
                                    <td align="right">
                                        Etiqueta
                                    </td>
                                    <td>
                                        <input type="text" id="txtValorPicklist"  maxlength="15" style="width:200px" />
                                    </td>
                                </tr>
                                <tr height="8px"><td colspan="2"></td></tr>
                            </table>
                            <div style="text-align:right;">
                                <div id="btnGuardarPicklist" class="btnNormal">
                                    <asp:Image ID="imgGuardarItem" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                                    <a>Aceptar</a>
                                </div>
                                <div id="btnCerrarPicklist" class="btnNormal">
                                    <asp:Image ID="imgCerrarItem" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Cancelar.png"/>
                                    <a>Cancelar</a>
                                </div>
                            </div>                
                        </div>
                    </td>
                </tr>


                <tr id="trFormula" runat="server">
                    <td class="TituloMant" style="width:200px;">
                        Agregar a Fórmula
                    </td>
                    <td class="ValorMant">
                        <asp:CheckBox ID="chkFormula" runat="server" />
                        (Utilizado en 'Costo por Reposición')
                    </td>
                </tr>
                <tr id="trEstado" runat="server">
                    <td class="tdEtiqueta">
                        Activo
                    </td>
                    <td>
                        <asp:CheckBox ID="chkEstado" runat="server" />
                    </td>
                </tr>

                <tr id="trReporte" runat="server">
                    <td class="TituloMant" style="width:200px;">
                        Mostrar en Reporte
                    </td>
                    <td class="ValorMant">
                        <asp:CheckBox ID="chkReporte" runat="server" />
                        (Utilizado en 'Exportar Reporte de Facturacion')
                    </td>
                </tr>
            </table>
            <asp:Label ID="TextoActualizar" runat="server" style="color: red;">*Solo se podrá modificar las opciones de "Descripción", "Agregar a Fórmula" y "Mostrar en Reporte". </asp:Label>
        </div>
        </br>
        <div style="margin-top:2px;">
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
