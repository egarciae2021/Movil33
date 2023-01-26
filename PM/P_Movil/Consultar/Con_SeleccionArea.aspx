<%@ Page Language="VB" AutoEventWireup="false" EnableEventValidation="false" Inherits="P_Movil_Consultar_Con_SeleccionArea" CodeBehind="Con_SeleccionArea.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/dhtmlxtree.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/dhtmlx/dhtmlxcommon.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/dhtmlx/dhtmlxtree.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/dhtmlx/ext/dhtmlxtree_json.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <%--<script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("./Con_SeleccionArea.js")%>" type="text/javascript"></script>--%>
    <script src="Con_SeleccionArea.js?V=1.11" type="text/javascript"></script>
</head>
<body style="overflow: hidden;">
    <form id="form1" runat="server">
        <div id="dvCargando" class="dvCargando"></div>
        <asp:HiddenField ID="hdfTipo" runat="server" />
        <asp:HiddenField ID="hdfMultiple" runat="server" />
        <asp:HiddenField ID="hdfEmpleado" runat="server" />
        <asp:HiddenField ID="hdfUnPanel" runat="server" />
        <asp:HiddenField ID="hdfPerResApr" runat="server" />
        <asp:HiddenField ID="hdfInCodTip" runat="server" />
        <asp:HiddenField ID="hdfEsResponsable" runat="server" />
        <table border="0">
            <tr>
                <td id="tdOpciones" runat="server">
                    <cc1:TabJQ ID="TabOpciones" runat="server" CssClass="tabs" Style="margin: 0px; padding: 0px;">
                        <cc1:ContenedorTabJQ ID="dvOrganizacionC" Titulo="Organización" Height="100%" Width="100%">
                            <table>
                                <tr>
                                    <td>
                                        <div class="dhtmlxTree dvPanel" id="dvOrganizacion" style="width: 260px; overflow: auto;"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:CheckBox ID="chkIncluirDependencia" runat="server" Text="Incluir información de dependecia" /><br />
                                        <span style="margin-left: 18px; font-size: 10px; color: #1E496B;">(Sólo se muestran los primeros 10,000 registros)</span>
                                    </td>
                                </tr>
                            </table>
                        </cc1:ContenedorTabJQ>
                        <cc1:ContenedorTabJQ ID="ctbBusquedaAvanzada" Titulo="Búsqueda avanzada" Height="100%" Width="100%">
                            <br />
                            <table >
                                <tr>
                                    <td colspan="2">
                                        <table id="tbFiltroTipo" style="display: none; width: 100%;">
                                            <tr>
                                                <td colspan="3">Seleccione el tipo de búsqueda:</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 33%;">
                                                    <input type="radio" id="optEmpleado" checked="checked" name="tipobusqueda" value="1" />
                                                    <label for="optEmpleado">Empleado</label>
                                                </td>
                                                <td style="width: 33%;">
                                                    <input type="radio" id="optLinea" name="tipobusqueda" value="2" />
                                                    <label for="optLinea">Línea</label>
                                                </td>
                                                <td style="width: 33%;">
                                                    <input type="radio" id="optDispositivo" name="tipobusqueda" value="3" />
                                                    <label for="optDispositivo">IMEI</label>
                                                </td>
                                            </tr>
                                            <tr style="height: 10px;"></tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 155px">
                                        <asp:TextBox ID="txtBusqueda" runat="server" MaxLength="50" ></asp:TextBox>
                                    </td>
                                    <td>
                                        <div id="btnBuscar" class="btnNormal" runat="server">
                                            <asp:Image ID="imgBuscar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/lupa_16x16.png" />
                                            <a>Búsqueda</a>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                        </cc1:ContenedorTabJQ>
                    </cc1:TabJQ>
                </td>
                <td id="tdDatosSeleccion" runat="server">
                    <div id="dvDatosSeleccion" style="width: 100%; text-align: center; font-weight: bold;" runat="server"></div>
                    <asp:ListBox ID="lstResultado" runat="server" Height="380px" Width="270px" SelectionMode="Multiple" Style="color: #222222;"></asp:ListBox>
                </td>
                <td id="tdControles" runat="server" style="width: 40px;">
                    <div id="btnDerecha" class="btnNormal" runat="server" style="width: 40px;">
                        <a>></a>
                    </div>
                    <div id="btnIzquierda" class="btnNormal" runat="server" style="width: 40px;">
                        <a><</a>
                    </div>
                    <div id="btnDerechaTodo" class="btnNormal" runat="server" style="width: 40px;">
                        <a>>></a>
                    </div>
                    <div id="btnIzquierdaTodo" class="btnNormal" runat="server" style="width: 40px;">
                        <a><<</a>
                    </div>
                </td>
                <td id="tdDatosSeleccionados" runat="server">
                    <div style="width: 100%; text-align: center; font-weight: bold;">
                        Datos seleccionados
                    </div>
                    <asp:ListBox ID="lstSeleccionados" runat="server" Height="380px" Width="270px" SelectionMode="Multiple" Style="color: #222222;"></asp:ListBox>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="dvEstado" runat="server" class="dvPanel">
                        <asp:Label ID="lblEtiquetaVer" runat="server" Text="Ver"></asp:Label>&nbsp;
                            <asp:DropDownList ID="ddlEstado" runat="server">
                                <asp:ListItem Value="-1" Text="Todos"></asp:ListItem>
                                <asp:ListItem Value="1" Text="Vigentes" Selected="True"></asp:ListItem>
                            </asp:DropDownList>
                    </div>
                </td>
                <td colspan="3" align="right">
                    <table>
                        <tr>
                            <td style="text-align: left;" valign="top"></td>
                            <td>
                                <div id="btnAceptar" class="btnNormal" runat="server">
                                    <asp:Image ID="imgAceptar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                                    <a>Aceptar</a>
                                </div>
                            </td>
                            <td>
                                <div id="btnCancelar" class="btnNormal" runat="server">
                                    <asp:Image ID="imgCancelar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                                    <a>Cancelar</a>
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
