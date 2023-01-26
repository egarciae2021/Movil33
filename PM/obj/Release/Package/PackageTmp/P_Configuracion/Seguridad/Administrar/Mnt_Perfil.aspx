<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Configuracion_Seguridad_Administrar_Mnt_Perfil" Codebehind="Mnt_Perfil.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register src="../../../Common/Controles/BusquedaPrincipal.ascx" tagname="BusquedaPrincipal" tagprefix="uc1" %>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.button.js"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqueryui/jquery.ui.autocomplete.js" type="text/javascript"></script>    
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.accordion.js"></script>
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/jqGrid/ui.jqgrid.css" />
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <%--<script src="../../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>--%> <%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <script src="../../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>  
    <script src="../../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.cookie.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../../../Common/Scripts/dynaTree/ui.dynatree.css" rel="stylesheet" type="text/css" id="skinSheet"/>
    <script src="../../../Common/Scripts/dynaTree/jquery.dynatree-1.2.4.js" type="text/javascript"></script>    
    <%--<script src="Mnt_Perfil.js" type="text/javascript"></script>   --%> 
    
    
    <!-- ==================================================================================
        MODULO DE SEGURIDAD
    ====================================================================================== -->
    <style type="text/css">
        .css_fondoHorario
        {
            background-color: #F2F2F2;
        }
        .paddingDerecha
        {
            padding-right:10px;    
        }
        
        .esTemporizadorActivo
        {
            display:none;    
        }

        .ui-jqgrid-bdiv {
            overflow-x: hidden !important;
        }
        .ui-th-column, .ui-jqgrid .ui-jqgrid-htable th.ui-th-column {
            /*width: 22px !important;*/
        }

        #tbNumeros3_Horario_vcDia {
            width: 70px !important;
        }

    </style>
    <!-- ==================================================================================
    ====================================================================================== -->
</head>
<body>

    <table id="tree"><tr><td/></tr></table>

    <form id="form1" runat="server">
    
    <asp:HiddenField ID="hdfParametros" runat="server" Value="" />
    <asp:HiddenField ID="hdfValores" runat="server" />
    <asp:HiddenField ID="hdfCodigo" runat="server" />
    <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
    <asp:HiddenField ID="hdfIdTemporizador" runat="server" />

    <!-- ==================================================================================
        MODULO DE SEGURIDAD
    ====================================================================================== -->
    <asp:HiddenField ID="hdf_idHoras" runat="server" />
    <!-- ==================================================================================    
    ====================================================================================== -->

    <div id="dvCargando" class="dvCargando">
    </div>

    <div class="dvPanel" style="overflow: auto;">
        <table>
            <tr>
                <td>
                    <asp:Label ID="lblNombre" runat="server" Text="Nombre Perfil: "></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtNombre" runat="server" MaxLength="100" Width="300px" onKeydown="return (event.keyCode!=13);"></asp:TextBox>
                   <%-- onkeydown = "return (event.keyCode!=13);--%>
                </td>
            </tr>
<%--            <tr>
                <td>
                    &nbsp;
                </td>
                <td>
                    &nbsp;
                </td>
            </tr>--%>
        </table>
      </div>
        <div style="height:10px"></div>
        <div id="dvContAcordeon">
            <cc1:AccordionJQ ID="AccordionJQ1" runat="server" CssClass="accordion">
                <cc1:ContenedorAccodion Texto="Accesos">
                    <table id="btTreeGridAccesos">
                        <tr><td/></tr>
                    </table>
                </cc1:ContenedorAccodion>

                <%--<cc1:ContenedorAccodion Texto="Usuarios">
                    <div id="divTreeUsuarios" style="height:270px">
                    </div>
                </cc1:ContenedorAccodion>--%>
                <%--<cc1:ContenedorAccodion Texto="Usuarios">
                    <table>
                        <tr>
                            <td>
                                <div id="dvDatosSeleccion" style="width:100%; text-align:center; font-weight:bold;" runat="server">
                                    Usuarios disponibles
                                </div>
                                <asp:ListBox ID="lstResultado" runat="server" Height="298px" Width="250px" SelectionMode="Multiple" style="color: #222222;"></asp:ListBox>
                            </td>
                            <td id="tdControles" runat="server" style="width:40px;">
                                <div id="btnDerecha" class="btnNormal" runat="server" style="width:40px;">
                                    <asp:Label ID="Label1" runat="server" ToolTip="Agregar" Text=">"></asp:Label>
                                </div>
                                <div id="btnIzquierda" class="btnNormal" runat="server" style="width:40px;">
                                    <asp:Label ID="Label2" runat="server" ToolTip="Quitar" Text="<"></asp:Label>
                                </div>
                                <div id="btnDerechaTodo" class="btnNormal" runat="server" style="width:40px;">
                                    <asp:Label ID="Label3" runat="server" ToolTip="Agregar todo" Text=">>"></asp:Label>
                                </div>
                                <div id="btnIzquierdaTodo" class="btnNormal" runat="server" style="width:40px;">
                                    <asp:Label ID="Label4" runat="server" ToolTip="Quitar todo" Text="<<"></asp:Label>
                                </div>                        
                            </td>
                            <td id="tdDatosSeleccionados" runat="server">
                                <div id="dvDatosSeleccionados" style="width:100%; text-align:center; font-weight:bold;">
                                    Usuarios seleccionados
                                </div>
                                <asp:ListBox ID="lstSeleccionados" runat="server" Height="298px" Width="250px" SelectionMode="Multiple" style="color: #222222;"></asp:ListBox>
                            </td>
                            <td valign="top" style="width:400px;" align="right">
                                <asp:TextBox ID="txtBusqueda" runat="server" Width="150px"></asp:TextBox>
                                <div id="btnBuscar" class="btnNormal" runat="server">
                                    <asp:Image ID="imgBuscar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/lupa_16x16.png" />
                                    <a>Busqueda</a>
                                </div>

                                <div id="dvProcesando" runat="server" style="display:none; margin-top:100px;">
                                    <asp:Label ID="lblProcesando" runat="server"></asp:Label>
                                </div>
                            </td>
                        </tr>
                    </table>
                </cc1:ContenedorAccodion>--%>


                <%--Tipo de Grupo por Perfil--%>
                <%--<cc1:ContenedorAccodion id="contenedorDash" texto=""> 
                    <table style="display: none;">
                        <tr>
                            <td><b>General</b></td>
                            <td>
                                <asp:DropDownList ID="ddlTipoGeneral" runat="server"></asp:DropDownList>
                            </td>
                        </tr>
                        <tr id="dvDashboardMovil" style="display: none;">
                            <td><b><asp:Label ID="lblDashMovil" runat="server" Text=""></asp:Label></b></td>
                            <td>
                                <asp:DropDownList ID="ddlDashMovil" runat="server"></asp:DropDownList>
                            </td>
                        </tr>
                        <tr id="dvDashboardEmpleado" style="display: none;">
                            <td><b><asp:Label ID="LblDashEmpleado" runat="server" Text=""></asp:Label></b></td>
                            <td>
                                <asp:DropDownList ID="ddlDashEmpleado" runat="server"></asp:DropDownList>
                            </td>
                        </tr>
                        <tr id="dvAnalisisConsumo" style="display: none;">
                            <td><b><asp:Label ID="LblConsumo" runat="server" Text=""></asp:Label></b></td>
                            <td>
                                <asp:DropDownList ID="ddlConsumo" runat="server"></asp:DropDownList>
                            </td>
                        </tr>
                    </table>--%>
                  <%--<div id="dvDashboardMovil">
                    <table class="esDashMovil" id="tblDashMovil">
                      <tr>
                        <td><b><asp:Label ID="lblDashMovil" runat="server" Text=""></asp:Label></b></td>
                        <td>
                          <asp:DropDownList ID="ddlDashMovil" runat="server">
                          </asp:DropDownList>
                        </td>
                      </tr>
                    </table>
                  </div>--%>
                  <%--<div id="dvDashboardEmpleado">
                    <table class="esDashMovil" id="tblDashEmpleado">
                      <tr>
                        <td><b><asp:Label ID="LblDashEmpleado" runat="server" Text=""></asp:Label></b></td>
                        <td>
                          <asp:DropDownList ID="ddlDashEmpleado" runat="server">
                          </asp:DropDownList>
                        </td>
                      </tr>
                    </table>
                  </div>--%>
                  <%--<div id="dvAnalisisConsumo">
                    <table class="esDashMovil" id="tblConsumo">
                      <tr>
                        <td><b><asp:Label ID="LblConsumo" runat="server" Text=""></asp:Label></b></td>
                        <td>
                          <asp:DropDownList ID="ddlConsumo" runat="server">
                          </asp:DropDownList>
                        </td>
                      </tr>
                    </table>
                  </div>--%>
                <%--</cc1:ContenedorAccodion>--%>

                <cc1:ContenedorAccodion id="contenedorDash" texto="Tipo de Grupo por Perfil">
                    <table>
                        <tr>
                            <td><b>General</b></td>
                            <td>
                                <asp:DropDownList ID="ddlTipoGeneral" runat="server"></asp:DropDownList>
                            </td>
                            <td style="width:20px;"></td>
                            <td><b>Vista Dashboard</b></td>
                            <td>  
                                <asp:DropDownList ID="ddlTipoVistaDash" runat="server">
                                    <asp:ListItem Text="-- Ambos --" Value="0" ></asp:ListItem>
                                    <asp:ListItem Text="Costo" Value="1" ></asp:ListItem>
                                    <asp:ListItem Text="Consumo" Value="2" ></asp:ListItem>
                                  </asp:DropDownList> 
                            </td>
                        </tr>
                        <tr id="dvDashboardMovil" style="display: none;">
                            <td><b><asp:Label ID="lblDashMovil" runat="server" Text=""></asp:Label></b></td>
                            <td>
                                <asp:DropDownList ID="ddlDashMovil" runat="server"></asp:DropDownList>
                            </td>
                        </tr>
                        <tr id="dvDashboardEmpleado" style="display: none;">
                            <td><b><asp:Label ID="LblDashEmpleado" runat="server" Text=""></asp:Label></b></td>
                            <td>
                                <asp:DropDownList ID="ddlDashEmpleado" runat="server"></asp:DropDownList>
                            </td>
                        </tr>
                        <tr id="dvAnalisisConsumo" style="display: none;">
                            <td><b><asp:Label ID="LblConsumo" runat="server" Text=""></asp:Label></b></td>
                            <td>
                                <asp:DropDownList ID="ddlConsumo" runat="server"></asp:DropDownList>
                            </td>
                        </tr>
                    </table>
                </cc1:ContenedorAccodion>


                <cc1:ContenedorAccodion ID="AcordionUsuarios" Texto="Usuarios" >
                    <div id="dvMensajeUsuarios" runat="server" style="display:none;">
                        <asp:Label ID="lblMensajeUsuarios" runat="server" Text="Debe grabar el perfil antes de agregar usuarios"></asp:Label>
                    </div>
                    <table id="tbAgregarUsuarios" runat="server" border="0">
                        <tr>
                            <td style="vertical-align:text-top; vertical-align: top;">
                                <div id="dvUsuariosCabecera" runat="server" class="dvPanel" style=" height:30px; margin-right:5px; margin-bottom:5px;" >

                                <table border="0" cellpadding="0" cellspacing ="1">
                                    <tr>
                                        <td>
                                            <div id="btnAgregar" class="btnNormal" runat="server" title="Agregar">
                                                <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                            </div>
                                        </td>
                                        <td>
                                            <div id="btnEliminar" class="btnNormal" runat="server" title="Quitar">
                                                <asp:Image ID="imgEliminar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" />
                                            </div>
                                        </td>
                                        <td>
                                            <span style="padding-left:105px;">Buscar:&nbsp;</span>
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtBuscarUsuario" runat="server" Width="380px" MaxLength="75"></asp:TextBox>
                                        </td>
                                        <td>
                                            &nbsp;
                                            <div id="btnBusquedaUsuario" class="btnNormal" runat="server">
                                                <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/lupa_16x16.png" />
                                            </div>
                                        </td>
                                        <td>
                                             <label id="lblResultado" style="width:100px; color:Red; padding-left:50px; display:none;""></label>
                                        </td>
                                    </tr>
                                </table>
                                                                   
                                </div>
                                <div id="dvBusquedaUsuarios" runat="server" style="display:none;">
                                    <uc1:BusquedaPrincipal ID="bpBusquedaUsuarios" runat="server" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table id="tbUsuarios">
                                </table>
                                <div id="tbUsuarioPager"></div>
                            </td>
                        </tr>
                    </table>
                </cc1:ContenedorAccodion>
    
                <cc1:ContenedorAccodion  texto="Horarios de Acceso al Sistema">
                        <br />
                            <table id="tbNumeros3">
                            </table> <a href="#" class="btnNormal" onclick="QuitarTodos()">Quitar Todos </a>
                        <br />
                </cc1:ContenedorAccodion>

                <cc1:ContenedorAccodion  texto="Temporizador" >
                    <div>
                        <table>
                            <tr>
                                <td class="paddingDerecha">Activar Temporizador</td>
                                <td>
                                    <asp:CheckBox ID="chkActivarTemporizador" runat="server" />
                                </td>
                            </tr>
                        </table>
                        <div style="clear:both;"></div>
                        <table class="esTemporizadorActivo" id="tblTemporizador">
                            <tr >
                                <td class="paddingDerecha">Temporizador</td>
                                <td>
                                    <asp:DropDownList ID="ddlTemporizador" runat="server">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr >
                                <td class="paddingDerecha">Tiempo</td>
                                <td>
                                    <asp:TextBox ID="txtTiempoTemporizador" runat="server" style="text-align:right" ReadOnly="True"></asp:TextBox>(Minutos)
                                </td>
                            </tr> 
                            <tr >
                                <td class="paddingDerecha">Reiniciar</td>
                                <td>
                                    <asp:CheckBox ID="chkReiniciarTemporizado" runat="server" Enabled="False" />
                                </td>
                            </tr> 
                        </table>
                        <div id="mensajeTemporizador" style="display:none; float:left; color:Red;">No hay temporizadores creados</div>
                    </div>
                </cc1:ContenedorAccodion>
    
            </cc1:AccordionJQ>
        </div>
        <%--<div style="height:10px"></div>
        <div id="Div1">
            <cc1:AccordionJQ ID="AccordionJQ2" runat="server" CssClass="accordion">
                <cc1:ContenedorAccodion Texto="Usuarios">
                    <div id="divTreeUsuarios" style="height:170px">
                    </div>
                </cc1:ContenedorAccodion>
            </cc1:AccordionJQ>
        </div>--%>
        <br />
    <div style="margin-top: 2px;">
        <div id="btnGuardar" class="btnNormal">
            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
            <a id="abtnGuardar">Guardar</a>
        </div>
        <div id="btnCerrar" class="btnNormal">
            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
            <a id="abtnCerrar">Cerrar</a>
        </div>
    </div>
    <div id="MsgConfirmacionEliminar" runat="server" style="display: none;">
        ¿Desea eliminar el usuario del perfil?
        <br /><br />
        <asp:Label ID="lblPDConfirmacion" runat="server"></asp:Label>
    </div>
    </form>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Mnt_Perfil.js")%>" type="text/javascript"></script>
</body>
    
</html>
