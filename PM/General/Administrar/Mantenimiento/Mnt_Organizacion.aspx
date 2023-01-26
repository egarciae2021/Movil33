<%@ Page Language="VB" AutoEventWireup="false" Inherits="General_Administrar_Mantenimiento_Mnt_Organizacion"
    CodeBehind="Mnt_Organizacion.aspx.vb" %>

<%@ Register Src="../../../Common/Controles/BusquedaPrincipal.ascx" TagName="BusquedaPrincipal" TagPrefix="uc1" %>
<%@ Register Src="../../../Common/Controles/ControlBusquedaEnlace.ascx" TagName="ControlBusquedaEnlace" TagPrefix="uc1" %>
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
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Entidades/ENT_MOV_IMP_Criterio.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/ajaxupload.js" type="text/javascript"></script>   
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Mnt_Organizacion.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfParametros" runat="server" Value="" />
    <asp:HiddenField ID="hdfValores" runat="server" />
    <asp:HiddenField ID="hdfEstado" runat="server" />
    <asp:HiddenField ID="hdfEstadoORGA" runat="server" />
    <asp:HiddenField ID="hdfCodCliente" runat="server" />
    <asp:HiddenField ID="hdfCodInt2" runat="server" />
    <asp:HiddenField ID="hdfCodInt2Anterior" runat="server" />
    <div id="dvCargando" class="dvCargando">
    </div>
    <div class="dvPanel" style="overflow: auto;">
        <table width="100%" border="0"  id="tbCamposDinamicos" runat="server">
            <tr id="NivAreaSuperior">
                <td class="TituloMant">
                    Área superior
                </td>
                <td class="" colspan="2">
                    <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td>
                                <uc1:ControlBusquedaEnlace ID="cbeOrganizacion" runat="server" />
                            </td>
                            <td>
                                &nbsp;
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
                    Código área
                </td>
                <td class="ValorMant">
                    <asp:TextBox ID="txt_codorg" runat="server" Width="150px" MaxLength="15"></asp:TextBox>
                </td>
            </tr>
            <tr style="display:none;">
                <td class="TituloMant">
                    Nivel del área
                </td>
                <td class="">
                    <asp:TextBox ID="txt_nivelorga" runat="server" Width="300px"></asp:TextBox>
                    <asp:HiddenField ID="hdfCodNivOrgBusqueda" runat="server" />
                </td>
            </tr>
            <tr>
                <td class="TituloMant">
                    Nombre
                </td>
                <td class="ValorMant">
                    <asp:TextBox ID="txt_nombre" runat="server" Width="300px" MaxLength="100"></asp:TextBox>
                </td>
            </tr>
            <%--<tr style="display:none;">
                <td class="TituloMant">
                    Área superior
                </td>
                <td class="">
                    <asp:TextBox ID="txt_orga" runat="server" Width="300px"></asp:TextBox>
                    <asp:HiddenField ID="hdfCodOrgBusqueda" runat="server" />
                </td>
            </tr>--%>
            <tr>
                <td class="TituloMant">
                    Centro de costos
                </td>
                <td class="">
                    <asp:TextBox ID="txtCodCCO" runat="server" Width="300px"></asp:TextBox>
                    <asp:HiddenField ID="hdfCCOBusqueda" runat="server" />
                </td>
            </tr>
            <tr>
                <td class="TituloMant">
                    Correo principal
                </td>
                <td class="ValorMant">
                    <asp:TextBox ID="txt_correo1" runat="server" Width="300px" MaxLength="250"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="TituloMant">
                    Correo alternativo
                </td>
                <td class="ValorMant">
                    <asp:TextBox ID="txt_correo2" runat="server" Width="300px" MaxLength="250"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="TituloMant" valign="top">
                    Responsable de &Aacute;rea
                    <ttgInfo:ToolTipGenerico ID="ttgInfoResponsableArea" runat="server" />
                </td>
                <td class="TituloMant">
                    <asp:ListBox ID="lstEncargado" runat="server" Width="310px" Height="220px" SelectionMode="Multiple">
                    </asp:ListBox>
                </td>
                <td>
                    <table>
                        <tr>
                            <td>
                                <div id="btnAgregarEmpleado" class="btnNormal" runat="server" style="width: 160px;">
                                    <asp:Image ID="imgAgregarEmpleado" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                    <a>Agregar Encargado</a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div id="btnQuitarEmpleado" class="btnNormal" runat="server" style="width: 160px;">
                                    <asp:Image ID="imgQuitarEmpleado" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                    <a>Quitar Encargado</a>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <%--<tr id="trAutorizador" style="display: none;">
                <td class="TituloMant" valign="top">
                    Responsable de Autorización
                </td>
                <td class="TituloMant">
                    <asp:ListBox ID="lstAutorizadores" runat="server" Width="310px" Height="80px" SelectionMode="Multiple">
                    </asp:ListBox>
                </td>
                <td>
                    <table>
                        <tr>
                            <td>
                                <div id="btnAgregarAutorizador" class="btnNormal" runat="server" style="width: 160px;">
                                    <a>Agregar Autorizador</a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div id="btnQuitarAutorizador" class="btnNormal" runat="server" style="width: 160px;">
                                    <a>Quitar Autorizador</a>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>--%>

            <%--            <tr>
                <td class="TituloMant">
                    Encargado
                </td>
                <td class="ValorMant">
                    <asp:ListBox ID="lstEmpleado" runat="server" Width="310px" Height="100px"></asp:ListBox>
                    <div id="btnAgregarEmpleado" class="btnNormal" runat="server" style="width:180px;">                        
                        <asp:Image ID="imgAgregarGrupo" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                        <a>Agregar Empleado</a>
                    </div><br />
                    <div id="btnQuitarEmpleado" class="btnNormal" runat="server" style="width:180px;">
                        <asp:Image ID="imgQuitarGrupo" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                        <a>Quitar Empleado</a>
                    </div>
                </td>
            </tr>--%>
            <tr id="trEstado" runat="server">
                <td class="TituloMant" id="tdEstado" style="display: none;">
                    Estado
                </td>
                <td class="ValorMant">
                    <asp:CheckBox Text="Activo" ID="chActivo" runat="server" MaxLength="50" Width="199px"
                        AutoPostBack="false" Visible="false"></asp:CheckBox>
                </td>
            </tr>
            <tr style="display: none;">
                <td class="TituloMant">
                    Nivel
                </td>
                <td class="ValorMant">
                    <uc1:BusquedaPrincipal ID="bpNivel" runat="server" />
                </td>
            </tr>
            <tr style="display: none;">
                <td class="TituloMant">
                    Centro de Costos
                </td>
                <td class="ValorMant">
                    <uc1:BusquedaPrincipal ID="bpCentroCosto" runat="server" />
                    <input id="btnValor" type="button" value="Mostrar" />
                </td>
            </tr>
        </table>
        <br />
    </div>
    <br />
    <div id="dvArea" style="display: none; padding: 0px; margin: 0px;">
        <iframe id="ifArea" width="730" height="470" frameborder="0" style="padding: 0px;
            margin: 0px;"></iframe>
    </div>
    <div id="dvResponsablesAutorizacion" style="display: none; padding: 0px; margin: 0px;">
        <div id="ResAutorizacion" style="width: 100%; padding: 5px 0px;">
            <table>
                <tr>
                    <td id="tdDatosSeleccionAutorizador" runat="server">
                        <div id="dvDatosSeleccion" style="width: 100%; text-align: center; font-weight: bold;" runat="server">Responsables de área</div>
                        <asp:ListBox ID="lstResultadoAutorizador" runat="server" Height="195px" Width="270px" SelectionMode="Multiple" Style="color: #222222;"></asp:ListBox>
                    </td>
                    <td id="tdControlesAutorizador" runat="server" style="width: 40px;">
                        <div id="btnDerechaAutorizador" class="btnNormal" runat="server" style="width: 40px;">
                            <a>></a>
                        </div>
                        <div id="btnIzquierdaAutorizador" class="btnNormal" runat="server" style="width: 40px;">
                            <a><</a>
                        </div>
                        <div id="btnDerechaTodoAutorizador" class="btnNormal" runat="server" style="width: 40px;">
                            <a>>></a>
                        </div>
                        <div id="btnIzquierdaTodoAutorizador" class="btnNormal" runat="server" style="width: 40px;">
                            <a><<</a>
                        </div>
                    </td>
                    <td id="tdDatosSeleccionadosAutorizador" runat="server">
                        <div style="width: 100%; text-align: center; font-weight: bold;">
                            Datos seleccionados
                        </div>
                        <asp:ListBox ID="lstSeleccionadosAutorizador" runat="server" Height="195px" Width="270px" SelectionMode="Multiple" Style="color: #222222;"></asp:ListBox>
                    </td>
                </tr>
            </table>
        </div>
        <div style="width: 100%; margin-top: 2px;">
            <div style="width: 135px;position: absolute; right: 0px;">
                <div id="btnAceptarAutorizador" class="btnNormal">
                    <a>Guardar</a>
                </div>
                <div id="btnCerrarAutorizador" class="btnNormal">
                    <a>Cerrar</a>
                </div>
            </div>
        </div>
    </div>

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
    </form>
</body>
</html>
