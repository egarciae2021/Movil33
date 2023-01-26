<%@ Page Language="VB" AutoEventWireup="false" Inherits="General_Administrar_Mantenimiento_Mnt_Empleado"
    CodeBehind="Mnt_Empleado.aspx.vb" %>

<%@ Register Src="../../../Common/Controles/ControlBusquedaEnlace.ascx" TagName="ControlBusquedaEnlace" TagPrefix="uc1" %>

<%@ Register Src="../../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="uc2" %>
<%@ Register Src="../../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqueryui/jquery.ui.autocomplete.js" type="text/javascript"></script>
    <!--script type="text/javascript" src="../../../Common/Scripts/jquery.ui.spinner.js"></script-->
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <style type="text/css">
        #txtDNI {
            text-align: left !important;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfCodEmpleado" runat="server" />
        <asp:HiddenField ID="hdfParametros" runat="server" Value="" />
        <asp:HiddenField ID="hdfValores" runat="server" />
        <asp:HiddenField ID="hdfEstado" runat="server" />
        <asp:HiddenField ID="hdfCodCliente" runat="server" />
        <asp:HiddenField ID="hdfesInfo" runat="server" />
        <%--agregado 10-03-2014 - wapumayta--%>
        <asp:HiddenField ID="hdfCodCCOArea" runat="server" />
        <asp:HiddenField ID="hdfNomCCOArea" runat="server" />

        <asp:HiddenField ID="hdfIdUsuario" runat="server" />

        <asp:HiddenField ID="hdfView" runat="server" />
        
        <asp:HiddenField ID="hdfTipoLicencia" runat="server" />
        <asp:HiddenField ID="hdfOcultarCamposLigero" runat="server" />
        <asp:HiddenField ID="hdfTipoLinea" runat="server" />
        <asp:HiddenField ID="hdfIdArea" runat="server" />
        <asp:HiddenField ID="hdfEsSuperAdmin" runat="server" />

        <asp:HiddenField ID="hdfAreaFacturacion" runat="server" />
        <asp:HiddenField ID="hdfCantidadLineasEmpleado" runat="server" />
        <asp:HiddenField ID="hdfCodigoOrganizacionCuenta" runat="server" />

        <div id="dvCargando" class="dvCargando">
        </div>
        <div id="dvGlobal" style="display:none;">
            <div id="divMsgConfirmacionCCO" style="display: none;">
                <span class="ui-icon ui-icon-alert" style="float: left;"></span>
                Se esta modificando la Organización del Empleado, ¿Desea actualizar el Centro de Costo actual por la de la Organización?
            </div>
            <div class="dvPanel" style="overflow: auto;">
                <table width="100%" border="0"  id="tbCamposDinamicos" runat="server">
                    <tr style="display: none;" id="trAreaLlamadaExterna" class="trArea" runat="server">
                        <td class="TituloMant">Área
                        </td>
                        <td class="ValorMant">
                            <asp:TextBox ID="txtNombreArea" Enabled="false" runat="server" Width="300px" MaxLength="35"></asp:TextBox>
                            &nbsp;
                        </td>
                    </tr>
                    <tr id="trFilaArea" runat="server">
                        <td class="TituloMant">Área
                        </td>
                        <td class="ValorMant">
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="display: none;">
                                        <uc1:ControlBusquedaEnlace ID="cbeOrganizacion" runat="server"/>                                        
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtOrga" runat="server" Width="300px" ReadOnly="True"></asp:TextBox>
                                    </td>
                                    <td>&nbsp;
                                        <div id="btnAgregarOrga" class="btnNormal" runat="server" title="Seleccionar Organización">
                                            <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/buscar.png" />
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td class="TituloMant">
                            <asp:Label ID="lblCodigoEmpleado" runat="server"></asp:Label>
                        </td>
                        <td class="ValorMant" style="display: flex;">
                            <asp:TextBox ID="txtCodigo" runat="server" Width="150" MaxLength="15"></asp:TextBox>
                            &nbsp;
                            <div id="dvAutogenerado" runat="server">
                                <asp:CheckBox Text="" ID="ChkAutogenerado" runat="server"
                                    AutoPostBack="false"></asp:CheckBox>Autogenerado
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="TituloMant">Nombres
                        </td>
                        <td class="ValorMant">
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <asp:TextBox ID="txtNombre" runat="server" Width="300px" MaxLength="35"></asp:TextBox>
                                    </td>
                                    <td>
                                        <div id="BtnIrUsuario" class="btnNormal" runat="server" title="Ver credenciales de usuario" style="margin-left: 5px;">
                                            <asp:Image ID="imgUsuario" runat="server" ImageUrl="~/Common/Images/Mantenimiento/usuario.png" />
                                        </div>
                                    </td>
                                    <td id="filaTooltipIrUsuario">

                                        <uc2:ToolTipGenerico ID="ttIrUsuario" runat="server" />

                                    </td>
                                </tr>
                            </table>
                        </td>

                    </tr>
                    <tr id="trGrupoEmpleadoStaff">
                        <td class="TituloMant">Grupo Empleado
                        </td>
                        <td class="ValorMant">
                            <asp:TextBox ID="txtCodGrupoOrigen" runat="server" Width="300px"></asp:TextBox>
                            <asp:HiddenField ID="hdfCodGruOriBusqueda" runat="server" />
                        </td>
                    </tr>
                    <tr id="filaGrupoEmpleado" style="display: none;">
                        <td class="TituloMant">Grupo Empleado (FAMILIA)
                        </td>
                        <td class="ValorMant">
                            <asp:TextBox ID="txtCodGrupoFalmilia" runat="server" Width="300px"></asp:TextBox>
                            <asp:HiddenField ID="hdfCodGrupoFalmiliaBusqueda" runat="server" />
                        </td>
                    </tr>
                    <tr id="trSucursal">
                        <td class="TituloMant">Centro de Trabajo
                        </td>
                        <td class="ValorMant">
                            <asp:TextBox ID="txtCodSucursal" runat="server" Width="300px"></asp:TextBox>
                            <asp:HiddenField ID="hdfCodSucBusqueda" runat="server" />
                            &nbsp;
                        </td>
                    </tr>
                    <tr id="trCentroCosto">
                        <td class="TituloMant">Centro de Costos
                        </td>
                        <td class="ValorMant">
                            <asp:TextBox ID="txtCodCCO" runat="server" Width="300px"></asp:TextBox>
                            <asp:HiddenField ID="hdfCCOBusqueda" runat="server" />
                            &nbsp;
                        </td>
                    </tr>
                    <tr id="trOficina">
                        <td class="TituloMant">Oficina
                        </td>
                        <td class="ValorMant" style="vertical-align: top;">
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <asp:TextBox ID="txtOficina" runat="server" Width="300px" ReadOnly="True" onkeydown="return (event.keyCode!=8);"></asp:TextBox>
                                        <asp:HiddenField ID="hdfCodOficinaBusqueda" runat="server" />
                                        &nbsp;
                                    </td>
                                    <td>
                                        <div id="btnAgregar" class="btnNormal" runat="server" title="Agregar Oficina">
                                            <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/buscar.png" />
                                        </div>
                                        <div id="btnEliminar" class="btnNormal" runat="server" title="Eliminar Oficina">
                                            <asp:Image ID="imgEliminar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" />
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr id="trCorreoPer">
                        <td class="TituloMant">Correo Personal
                        </td>
                        <td class="ValorMant">
                            <asp:TextBox ID="txtMailPersonal" runat="server" Width="300px" MaxLength="250"></asp:TextBox>
                            &nbsp;
                        </td>
                    </tr>
                    <tr id="trCorreoJef">
                        <td class="TituloMant">Correo Jefatura
                        </td>
                        <td class="ValorMant">
                            <asp:TextBox ID="txtMailJefe" runat="server" Width="300px" MaxLength="250"></asp:TextBox>
                            &nbsp;
                        </td>
                    </tr>
                    <tr id="trUnidadFisica">
                        <td class="TituloMant">Ubicación Física
                        </td>
                        <td class="ValorMant">
                            <asp:TextBox ID="txtUbiFis" runat="server" Width="300px" MaxLength="35"></asp:TextBox>
                            &nbsp;
                        </td>
                    </tr>
                    <tr id="trInforAdicional">
                        <td class="TituloMant">Inf. Adicional
                        </td>
                        <td class="ValorMant">
                            <asp:TextBox ID="txtInfAdi" runat="server" Width="300px" MaxLength="35"></asp:TextBox>
                            &nbsp;
                        </td>
                    </tr>
                    <tr id="trDocumentoIdentidad" style="display: none;">
                        <td class="TituloMant">Documento de Identidad</td>
                        <td class="ValorMant">
                            <asp:TextBox ID="txtDNI" runat="server" Width="300px" MaxLength="8" Style="text-align: left !important;"></asp:TextBox>
                            &nbsp;
                        </td>
                    </tr>
                    <tr style="display: none;">
                        <td>Número de cuenta
                        </td>
                        <td>
                            <asp:TextBox ID="txtNroCuenta" runat="server" Width="300px" MaxLength="18" Style="text-align:left !important;"></asp:TextBox>
                        </td>
                    </tr>
                    <tr id="trSincronizacion" runat="server">
                        <td class="TituloMant" id="tdSincronizacion">Exonerar de la Sincronización
                        </td>
                        <td class="ValorMant">
                            <asp:CheckBox Text="" ID="ChkSincronizacion" runat="server" MaxLength="50" Width="199px"
                                AutoPostBack="false"></asp:CheckBox>
                        </td>
                    </tr>
                    <tr id="trEstado" runat="server">
                        <td class="TituloMant" id="tdEstado" style="display: none;">Estado
                        </td>
                        <td class="ValorMant">
                            <asp:CheckBox Text="Activo" ID="chActivo" runat="server" MaxLength="50" Width="199px"
                                AutoPostBack="false" Visible="false"></asp:CheckBox>
                        </td>
                    </tr>
                </table>
            </div>
            <br />
            <div style="margin-top: 2px;">
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
        <div id="dvSeleccionarOficina" style="display: none; overflow: hidden;" align="right">
            <iframe id="ifEleccionOficina" frameborder="0" style="padding: 0px; margin: 0px; height: 405px; width: 750px; overflow: hidden;"></iframe>
            <b>(Doble clic sobre un registro para seleccionar una Oficina)</b>
        </div>
        <div id="dvArea" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifArea" width="730" height="470" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
        </div>
        <div id="dvPaneusuario" style="display: none; overflow: hidden; width: 820px; height: 490px;" align="right">
            <iframe id="ifCredencialesUsuario" frameborder="0" style="padding: 0px; margin: 0px; height: 99%; width: 99%; overflow: hidden;"></iframe>
        </div>
        <div id="dvMsgAlertaPorLinea" style="display: none;"><span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <div id="dvContenidoAlertaPorLinea"></div>
        </div>

        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Mnt_Empleado.js")%>" type="text/javascript"></script>

    </form>
</body>
</html>
