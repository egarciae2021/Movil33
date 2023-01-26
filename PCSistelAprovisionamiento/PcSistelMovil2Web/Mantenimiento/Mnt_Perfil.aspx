<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Mnt_Perfil.aspx.cs" Inherits="PcSistelMovil2Web.Mantenimiento.Mnt_Perfil" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Styles/Sitio.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/JqueryThemeRoller/redmond/jquery-ui-1.8.16.custom.css"
    rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />  
    <script src="../Scripts/json2.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>  
    <script src="../Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../Common/Styles/Principal2.css" rel="stylesheet" type="text/css" />
    <script src="Mnt_Perfil.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfParametros" runat="server" Value="" />
    <asp:HiddenField ID="hdfValores" runat="server" />
    <asp:HiddenField ID="hdfCodigo" runat="server" />
    <asp:HiddenField ID="hdfIdTemporizador" runat="server" />
    <!-- ==================================================================================
        MODULO DE SEGURIDAD
    ====================================================================================== -->
    <asp:HiddenField ID="hdf_idHoras" runat="server" />
    <!-- ==================================================================================    
    ====================================================================================== -->
       <div id="dvMsgAlertaExterna" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <div id="dvContenidoAlertaExterna">
        </div>
    </div>
       <%-- Modal usuario --%>
    <div id="div_modal_Usuario" style="display: none; padding: 0px; margin-left: 10px; overflow-y: hidden;">
        <br />
        <label style="font-size: 9px;">
            Seleccione un registro que desee y haga click en aceptar</label>
        <table>
            <tr>
                <td>
                    <asp:Label runat="server" ID="Label1" CssClass="" Text="Buscar"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtbusqueda" runat="server" Width="400px" MaxLength="160"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <table id="grid">
                    </table>
                    <div id="pager">
                    </div>
                </td>
            </tr>
        </table>
        <div id="dvModalAcciones" style="float: right; margin-top: 0px;">
            <div id="btnAddUsuario" class="btnNormal" style="width: 80px;">
                <a style="font-size: 10px;">Aceptar</a>
            </div>
            <div id="btnCancelar" class="btnNormal" style="width: 80px;">
                <a style="font-size: 10px;">Cancelar</a>
            </div>
        </div>
    </div>
    <%-- Fin Modal usuario--%>
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
                </td>
            </tr>

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
                                  <%--  <uc1:BusquedaPrincipal ID="bpBusquedaUsuarios" runat="server" />--%>
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
    
            </cc1:AccordionJQ>
        </div>
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
</body>
</html>
