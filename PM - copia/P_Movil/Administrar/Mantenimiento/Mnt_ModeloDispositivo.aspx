<%@ Page Language="VB" AutoEventWireup="false"
    Inherits="P_Movil_Administrar_Mantenimiento_Mnt_ModeloDispositivo" EnableEventValidation="false" Codebehind="Mnt_ModeloDispositivo.aspx.vb" %>

<%@ Register Src="../../../Common/Controles/BusquedaPrincipal.ascx" TagName="BusquedaPrincipal" TagPrefix="uc1" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <%--<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.button.js"></script>--%>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/ajaxupload.js" type="text/javascript"></script>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Mnt_ModeloDispositivo.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfCodCliente" runat="server" />
    <asp:HiddenField ID="hdfParametros" runat="server" Value="" />
    <asp:HiddenField ID="hdfValores" runat="server" />
    <asp:HiddenField ID="hdfModeloDispositivo" runat="server" /> <%-- Codigo de modelo dispositvo --%>
    <asp:HiddenField ID="hdfddlGrupo" runat="server" Value="" />
    <asp:HiddenField ID="hdfddlGrupoActualizado" runat="server" Value="" />
    <asp:HiddenField ID="hdflstGrupo" runat="server" Value="" />
    <asp:HiddenField ID="hdfOperadores" runat="server" Value="" />
    <asp:HiddenField ID="hdfArchivo" runat="server" /><%-- Codigo para nombre de nueva imagen de dispostivo --%>
    <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
    <asp:HiddenField ID="hdfOcultarCamposLigero" runat="server" />
    <asp:HiddenField ID="hdfTipoLinea" runat="server" />
    <div id="dvCargando" class="dvCargando">
    </div>
    <div id="dvCampo" class="dvPanel" style="overflow: auto;">
        <table id="tbCamposDinamicos" runat="server" width="682px" border="0">
            <tr>
                <td class="tdTitulo">
                    Nombre
                </td>
                <td class="">
                    <asp:TextBox ID="txtNombre" runat="server" Width="390px" MaxLength="100"></asp:TextBox>
                </td>
            </tr>
            <tr id="trDescripcion">
                <td class="tdTitulo">
                    Descripción
                </td>
                <td>
                    <asp:TextBox ID="txtDescripcion" runat="server" Width="400px" Height="200" ></asp:TextBox>
                </td>
            </tr>
            <tr>                
                <td class="tdTitulo">
                    Tipo 
                </td>
                <td class="">
                    <asp:DropDownList ID="ddlTipo" runat="server" Width="300px"></asp:DropDownList>
                </td>
            </tr>
            <tr>                
                <td class="tdTitulo">
                    Tipo de Servicio
                </td>
                <td class="">
                    <asp:DropDownList ID="ddlTipoServicio" runat="server" Width="300px"></asp:DropDownList>
                </td>
            </tr>
            <tr id="trRoles">
              <td class="tdTitulo"></td>
              <td class="">
                <cc1:BarraNavegacionJQ ID="BarraNavegacionJQ1" runat="server">
                  <cc1:PanelBarraNavegacion ID="PanelBarraNavegacion1" runat="server" Titulo="Agregar Roles" MostrarIcono="true" Mostrar="true" Width="450px" Height="220px">
                    <cc1:ItemBarraNavegacion ID="ItemBarraNavegacion1" runat="server" Activo="true" Click="" Font-Bold="false" Seleccionable="false" UrlIco="">
                      <table>
                          <tr>
                              <td class="tdTitulo">
                                  Grupo de Empleado
                              </td>
                              <td class="">
                                  <asp:DropDownList ID="ddlRoles" runat="server" Width="270px"></asp:DropDownList>
                                  <asp:Image ID="imgAgregarRol" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" CssClass="imgBtn" ToolTip="Agregar rol" />
                                  <asp:Image ID="imgQuitarRol" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" CssClass="imgBtn" ToolTip="Quitar rol" />
                              </td>
                          </tr>
                      </table>
                      <div class="ui-widget-content ui-helper-clearfix" style="margin: 0.6em .0em;height:0.01em;"></div>
                      <table style="width: 100%;">
                        <tr>
                            <td class="" align="center">
                                <asp:ListBox ID="lstbRolesAgregados" runat="server" Height="155px" Width="350px">
                                </asp:ListBox>
                            </td>            
                        </tr>                      
                      </table>
                    </cc1:ItemBarraNavegacion>
                  </cc1:PanelBarraNavegacion>
                </cc1:BarraNavegacionJQ>
              </td>            
            </tr>

            <tr id="trOperador">
                <td class="tdTitulo"></td>
                <td class="">
                    <cc1:BarraNavegacionJQ ID="bnValoresOperador" runat="server">
                        <cc1:PanelBarraNavegacion ID="pbnMovil" runat="server" Titulo="Información por Operador" MostrarIcono="true" Mostrar="true" Width="450px" Height="180px">
                            <cc1:ItemBarraNavegacion ID="ItemBarraNavegacion2" runat="server" Activo="true" Click="" Font-Bold="false" Seleccionable="false" UrlIco="">
                                <table>
                                    <tr>
                                        <td class="tdTitulo">
                                            &nbsp;&nbsp;&nbsp;&nbsp;Operador
                                        </td>
                                        <td class="">
                                            <asp:DropDownList ID="ddlOperador" runat="server" Width="300px"></asp:DropDownList>
                                        </td>
                                    </tr>
                                </table>
                                <div class="ui-widget-content ui-helper-clearfix" style="margin: 0.6em .0em;height:0.01em;"></div>
                                <table id="tbCamposOperador" runat="server" style="padding-left:10px; margin-right:10px;">
                                </table>
                            </cc1:ItemBarraNavegacion>
                        </cc1:PanelBarraNavegacion>
                    </cc1:BarraNavegacionJQ>
                </td>            
            </tr>
            <tr id="trImagen">
                <td class="tdTitulo"></td>
                <td>
                    <div style="margin-left: -9px;">
                    <iframe id="ifCargarImagen" frameborder="0" style="padding: 0px; margin: 0px;" width="470px" height="220px">
                    </iframe>
                    </div>
                </td>
            </tr>
            <tr style="display: none;">
                <td></td>
                <td>
                    <div id="btnModelosPlan" class="btnNormal">
                        <asp:Image ID="imgAsociarPlan" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Celular_16x16.png"/>
                        <a>Asociar Planes</a>
                    </div>                
                </td>
            </tr>
             <tr>
                <td>
                    Marca
                </td>
                <td>
                    <div id="dvMarca" runat="server">
                        <uc1:BusquedaPrincipal ID="bpMarca" runat="server" />
                    </div>
                </td>
            </tr>
            
            <tr>
                <td>
                    Tipo de Chip
                </td>
                <td>
                    <asp:DropDownList ID="ddlTipoChip" runat="server" Width="200"></asp:DropDownList>
                </td>
            </tr>
            <tr id="trEstado" runat="server">
                <td class="tdTitulo">
                    Activo
                </td>
                <td>
                    <asp:CheckBox ID="chkEstado" runat="server" />
                </td>
            </tr>
        </table>
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
    <div id="dvModelosPlan" style="display:none;">
        &nbsp;<asp:TextBox ID="txt_Planes" runat="server" Width="440px" style="text-transform: uppercase;" MaxLength="80"></asp:TextBox>
        <asp:HiddenField ID="hdfCodPlanes" runat="server" />
        <asp:HiddenField ID="hdfNomPlanes" runat="server" />
        <div id ="divPicklist" >
            <table>
                <tr>
                    <td>
                        <select id="lstPicklist" size="4" multiple="multiple" style="width: 365px;">
                        </select>
                    </td>
                    <td valign="top">
                        <table width="100%" cellpadding="0" cellspacing="0">
                            <tr><td> <div id="btnPicklistAgregar" class="btnPicklist">Agregar</div> </td></tr>
                            <tr><td> <div id="btnPicklistEliminar" class="btnPicklist">Eliminar</div></td></tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    </form>
</body>
</html>
