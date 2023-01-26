<%@ Page Language="VB" AutoEventWireup="false" Inherits="General_Administrar_Mantenimiento_Mnt_GrupoOrigen" Codebehind="Mnt_GrupoOrigen.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register src="../../../Common/Controles/BusquedaPrincipal.ascx" tagname="BusquedaPrincipal" tagprefix="uc1" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
	<script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script><%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>    
	<script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.accordion.js"></script><%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/jqGrid/ui.jqgrid.css" /><%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script><%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script><%--(Se cruza con el Base del BusquedaPrincipal)--%>    
    <script src="../../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>  
    <script src="../../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.cookie.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script> <%--(Se cruza con el Base del BusquedaPrincipal)--%>    
    <link href="../../../Common/Scripts/dynaTree/ui.dynatree.css" rel="stylesheet" type="text/css" id="skinSheet"/>    
    <script src="../../../Common/Scripts/dynaTree/jquery.dynatree-1.2.4.js" type="text/javascript"></script>       
    <script src="Mnt_GrupoOrigen.js" type="text/javascript"></script> 
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfParametros" runat="server" Value=""/>
    <asp:HiddenField ID="hdfValores" runat="server" />
    <asp:HiddenField ID="hdfEstado" runat="server" />
    <asp:HiddenField ID="hdfTipoLineaAnterior" runat="server" />
    <asp:HiddenField ID="hdfEstadoGruOri" runat="server" />
    <asp:HiddenField ID="hdfGrupoOrigen" runat="server" />
    <asp:HiddenField ID="hdfTipoLinea" runat="server" />
    <asp:HiddenField ID="hdfEditarTipoLinea" runat="server" />
    <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />

    <div id="divMsgCambioTipoLinea" style="display:none;">
        <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            No puede cambiar el "Tipo de Línea" al Grupo <b><span id="spanGruOri"></span></b> ya que tiene dependencia(s) con: <b><span id="spanDepencia"></span></b>
        <br />
    </div>

    <div id="dvCargando" class="dvCargando"></div>
    <div class="dvPanel" style="overflow: auto;">
        <table width="100%">
            <tr id="trCodigo" runat="server">
                <td class="TituloMant">
                    Código
                </td>
                <td class="ValorMant">
                    <asp:TextBox ID="txtCodigo" runat="server" MaxLength="15" Width="70px"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="TituloMant">
                    Nombre
                </td>
                <td class="ValorMant">
                    <asp:TextBox ID="txtNombre" runat="server" MaxLength="35" Width="300px"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    Tipo Linea
                </td>
                <td>
                    <asp:DropDownList ID="ddlTipoLin" runat="server" Width="310px"></asp:DropDownList>
                </td>
            </tr>
            <tr id="trEstado" runat="server">
               <td class="TituloMant" id="tdEstado" style="display:none;">
                    Estado
                </td>
                <td class="ValorMant">
                    <asp:CheckBox Text="Activo" ID="chActivo" runat="server" MaxLength="50" 
                        Width="199px" AutoPostBack="false" Visible="false"></asp:CheckBox>
                </td>
            </tr>
        </table>
    </div>

    <div style="height:10px"></div>
        <div id="dvContAcordeon">
            <cc1:AccordionJQ ID="AccordionJQ1" runat="server" CssClass="accordion">
                <cc1:ContenedorAccodion ID="AcordionModelos"  Texto="Modelos Dispositivos">
                    <div id="dvMensajeModelos" runat="server" style="display:none;">
                        <asp:Label ID="lblMensajeModelos" runat="server" Text="Debe grabar el Grupo Empleado antes de agregar Modelos"></asp:Label>
                    </div>
                    <table id="tbAgregarModelos" runat="server" border="0">
                        <tr>
                            <td>
                                <div id="dvModelosCabecera" runat="server" class="dvPanel" style=" height:30px; margin-right:5px; margin-bottom:5px;" >
                                    <%--<span style="position:relative; top:-30px; left:0px; background-color:White; font-weight:bold;"> Acciones </span>--%>
                                    <table border="0" cellpadding="0" cellspacing ="1">
                                      <tr>
                                        <td>
                                            <div id="btnAgregarModelo" class="btnNormal" runat="server" title="Agregar">
                                                <asp:Image ID="imgAgregarModelo" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                            </div>
                                        </td>
                                        <td>
                                            <div id="btnEliminarModelo" class="btnNormal" runat="server" title="Quitar">
                                                <asp:Image ID="imgEliminarModelo" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" />
                                            </div>
                                        </td>
                                        <td>
                                            <span style="padding-left:180px;">Buscar</span>
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtBuscarModelos" runat="server" Width="300px" MaxLength="75"></asp:TextBox>
                                        </td>
                                        <td>
                                            <div id="btnBusquedaModelos" class="btnNormal" runat="server">
                                                <asp:Image ID="Image4" runat="server" ImageUrl="~/Common/Images/Mantenimiento/lupa_16x16.png" />
                                            </div>
                                        </td>
                                        <td>
                                        <%--<asp:Label ID="lblResultado" runat="server"  >FAEFAEFWASEF</asp:Label>--%>
                                            <label id="lblResultadoModelos" style="width:100px; color:Red; padding-left:50px; display:none;""></label>                                
                                        </td>
                                      </tr>
                                    </table>    
                                </div>
                                <div id="dvBusquedaModelos" runat="server" style="display:none;">
                                    <uc1:BusquedaPrincipal ID="bpBusquedaModelos" runat="server" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table id="tbModelos">
                                </table>
                                <div id="tbModelosPager"></div>
                            </td>
                        </tr>
                    </table>
                </cc1:ContenedorAccodion>
                <cc1:ContenedorAccodion ID="AcordionEmpleados" Texto="Empleados" >
                    <div id="dvMensajeEmpleados" runat="server" style="display:none;">
                        <asp:Label ID="lblMensajeEmpleados" runat="server" Text="Debe grabar el Grupo Empleado antes de agregar Empleados"></asp:Label>
                    </div>
                    <table id="tbAgregarEmpleados" runat="server">
                        <tr>
                            <td>
                                <div id="dvEmpleadosCabecera" runat="server" class="dvPanel" style=" height:30px; margin-right:5px; margin-bottom:5px;" >
                                  <table>
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
                                        <span style="padding-left:180px;">Buscar</span>
                                      </td>
                                      <td>
                                        <asp:TextBox ID="txtBuscarEmpleado" runat="server" Width="300px" MaxLength="75"></asp:TextBox>
                                      </td>
                                      <td>
                                        <div id="btnBusquedaEmpleado" class="btnNormal" runat="server">
                                            <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/lupa_16x16.png" />
                                        </div>
                                      </td>
                                      <td>
                                        <label id="lblResultado" style="width:100px; color:Red; padding-left:50px; display:none;"></label>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                                <div id="dvBusquedaEmpleados" runat="server" style="display:none;">
                                    <uc1:BusquedaPrincipal ID="bpBusquedaEmpleados" runat="server" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table id="tbEmpleados">
                                </table>
                                <div id="tbEmpleadoPager"></div>
                            </td>
                        </tr>
                    </table>
                </cc1:ContenedorAccodion>
                <cc1:ContenedorAccodion ID="AcordionPaquetesAmpliacion" Texto="Paquetes de Ampliación">
                    <div id="dvMensajePaquetes" runat="server" style="display:none;">
                        <asp:Label ID="lblMensajePaquetes" runat="server" Text="Debe grabar el Grupo Empleado antes de agregar un paquete de ampliación"></asp:Label>
                    </div>
                    <table id="tbAgregarPaquetes" runat="server">
                        <tr>
                            <td>
                                <div id="dvPaquetesCabecera" runat="server" class="dvPanel" style=" height:30px; margin-right:5px; margin-bottom:5px;" >
                                    <table>
                                        <tr>
                                            <td>
                                                <div id="btnAgregarPaquetes" class="btnNormal" runat="server" title="Agregar">
                                                    <asp:Image ID="imgAgregarPaquetes" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />    
                                                </div>
                                            </td>
                                            <td>
                                                <div id="btnEliminarPaquetes" class="btnNormal" runat="server" title="Quitar">
                                                    <asp:Image ID="imgQuitarPaquetes" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" />
                                                </div>
                                            </td>
                                            <td>
                                                <span style="padding-left:180px;">Buscar</span>
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtBuscarPaquete" runat="server" Width="300px" MaxLength="75"></asp:TextBox>
                                            </td>
                                            <td>
                                                <div id="btnBusquedaPaquete" class="btnNormal" runat="server">
                                                    <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/lupa_16x16.png" />
                                                </div>
                                            </td>
                                            <td>
                                                <label id="lblResultadoPaquetes" style="width:100px; color:Red; padding-left:50px; display:none;"></label>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div id="dvBusquedaPaquetes" runat="server" style="display:none;">
                                    <uc1:BusquedaPrincipal ID="bpBusquedaPaquetes" runat="server" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table id="tbPaquetes">
                                </table>
                                <div id="tbPaquetesPager"></div>
                            </td>
                        </tr>
                    </table>
                </cc1:ContenedorAccodion>
            </cc1:AccordionJQ>
        </div>
        <br />

        <div id="divMsgConfirmacioDeleteModelo" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            ¿Desea eliminar el Modelo seleccionado?
        </div>

        <div id="divMsgConfirmacioDeleteEmpleado" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            ¿Desea eliminar el Empleado seleccionado?
        </div>
        <div id="divMsgConfirmacionDeletePaquete" style="display:none;">
        <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            ¿Desea eliminar el Paquete de Ampliación seleccionado?
        </div>

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
    </form>
</body>
</html>
