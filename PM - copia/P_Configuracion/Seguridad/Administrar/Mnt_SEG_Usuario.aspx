<%@ Page Language="VB" AutoEventWireup="false" Inherits="_Mnt_SEG_Usuario" CodeBehind="Mnt_SEG_Usuario.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register Src="../../../Common/Controles/ControlBusquedaEnlace.ascx" TagName="ControlBusquedaEnlace" TagPrefix="uc1" %>
<%@ Register Src="../../../Common/Controles/ControlBusquedaEnlace.ascx" TagName="ControlBusquedaEnlace" TagPrefix="uc2" %>
<%@ Register Src="../../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.accordion.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.button.js"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.draggable.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.cookie.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqueryui/jquery.ui.autocomplete.js" type="text/javascript"></script>
    <link href="../../../Common/Scripts/dynaTree/ui.dynatree.css" rel="stylesheet" type="text/css" id="skinSheet">
    <script src="../../../Common/Scripts/dynaTree/jquery.dynatree-1.2.4.js" type="text/javascript"></script>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <style type="text/css">
        .css_fondoHorario {
            background-color: #F2F2F2;
        }

        .style1 {
            text-align: right;
        }

        .style2 {
            width: 200px;
        }

        .paddingDerecha {
            padding-right: 10px;
        }

        .esTemporizadorActivo {
            display: none;
        }

        .no-close .ui-dialog-titlebar-close {
            display: none;
        }

        .ui-jqgrid-bdiv {
            overflow-x: hidden !important;
        }

        #tbNumeros3_Horario_in1, #tbNumeros3_Horario_in2, #tbNumeros3_Horario_in3, #tbNumeros3_Horario_in4, #tbNumeros3_Horario_in5, #tbNumeros3_Horario_in6,
        #tbNumeros3_Horario_in7, #tbNumeros3_Horario_in8, #tbNumeros3_Horario_in9, #tbNumeros3_Horario_in10, #tbNumeros3_Horario_in11, #tbNumeros3_Horario_in12,
        #tbNumeros3_Horario_in13, #tbNumeros3_Horario_in14, #tbNumeros3_Horario_in15, #tbNumeros3_Horario_in16, #tbNumeros3_Horario_in17, #tbNumeros3_Horario_in18,
        #tbNumeros3_Horario_in19, #tbNumeros3_Horario_in20, #tbNumeros3_Horario_in21, #tbNumeros3_Horario_in22, #tbNumeros3_Horario_in23, #tbNumeros3_Horario_in24 {
            width: 22px !important;
        }

        #tbGridSolicitudes_chkLeer, #tbGridSolicitudes_chkCrear, #tbGridSolicitudes_chkEditar, #tbGridSolicitudes_chkEliminar  {
            width: 61px !important;
        }

        #tbNumeros3_Horario_vcDia {
            width: 70px !important;
        }
    </style>

    <style type="text/css">
        .ui-accordion-icons .ui-accordion-header a{
            padding-top:5px !important;
        }

    </style>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Mnt_SEG_Usuario.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server" autocomplete="off">
        <asp:HiddenField ID="hdfCodigo" runat="server" />
        <asp:HiddenField ID="hdfArchivo" runat="server" />
        <asp:HiddenField ID="hdfNombreArchivo" runat="server" />
        <asp:HiddenField ID="hdfCodCliente" runat="server" />
        <asp:HiddenField ID="hdfEsTecResp" runat="server" />
        <asp:HiddenField ID="hdfEsResApro" runat="server" />
        <!-- ==================================================================================
        MODULO DE SEGURIDAD - error 1505
    ====================================================================================== -->
        <asp:HiddenField ID="hdf_esLDAP" runat="server" />
        <asp:HiddenField ID="hdf_esAdmin" runat="server" />
        <asp:HiddenField ID="hdf_idHoras" runat="server" />
        <asp:HiddenField ID="hdf_flagCargaHorario" runat="server" Value="0" />
        <!-- ==================================================================================    
    ====================================================================================== -->
        <asp:HiddenField ID="hdfEsllamadaExterna" runat="server" />

        <asp:HiddenField ID="hdfIdTemporizador" runat="server" />
        <asp:HiddenField ID="hdfIdPerfilTemporizador" runat="server" />
        <asp:HiddenField ID="hdfPerfilesOcultos" runat="server" />

        <div id="dvCargando" class="dvCargando">
        </div>
        <div class="" style="overflow: none;">
            <div id="dvContAcordeon">
                <cc1:AccordionJQ ID="AccordionJQ1" runat="server" CssClass="accordion">
                    <cc1:ContenedorAccodion Texto="Cuenta">
                        <table border="0" width="100%">
                            <tr>
                                <td colspan="2">
                                    <table border="0" width="700px">
                                        <tr>
                                            <td colspan="8">
                                                <b>Cuenta de Usuario</b>
                                            </td>
                                        </tr>
                                        <tr height="10px">
                                            <td colspan="3"></td>
                                            <td width="30px"></td>
                                            <td rowspan="4" valign="top">
                                                <table border="0" id="tbImagen">
                                                    <tr>
                                                        <td valign="top"></td>
                                                        <td valign="top">Imagen: &nbsp;
                                                        </td>
                                                        <td>
                                                            <iframe id="ifrCargaImagen" frameborder="0" style="padding: 0px; margin: 0px;" width="320px;" height="100px;"></iframe>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="right">Usuario:&nbsp;
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtvcUsu" runat="server" Width="200px" MaxLength="90"></asp:TextBox>
                                            </td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr id="filaContrasena">
                                            <td align="right">Contraseña:&nbsp;
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtvcPas" TextMode="Password" runat="server" Width="200px" MaxLength="200"></asp:TextBox>
                                            </td>
                                            <td id="filaCheckEditar">
                                                <asp:CheckBox ID="chEditar" runat="server" Text="Editar" />
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr id="filaConfirmar">
                                            <td align="right">Confirmar:&nbsp;
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtConfirmar" TextMode="Password" runat="server" Width="200px" MaxLength="200"></asp:TextBox>
                                            </td>
                                            <td>
                                                <%--<asp:CheckBox ID="CheckBox1" runat="server" Text="Editar" />--%>
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="width: 700px;">
                                    <b>Vincular Organización</b>
                                </td>
                            </tr>
                            <tr class="esLlamadaExterna">
                                <td valign="middle" align="right">Empleado:&nbsp;
                                </td>
                                <td valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <asp:ListBox ID="lstEmpleado" runat="server" Width="350px" Height="22px"></asp:ListBox>
                                                &nbsp;
                                            </td>
                                            <td>
                                                <div id="btnEmpleado" class="btnNormal" runat="server" style="width: 40px;">
                                                    ...
                                                </div>
                                            </td>
                                            <td>
                                                <div id="btnQuitarEmpleado" class="btnNormal" runat="server" style="width: 80px;">
                                                    <table border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td>
                                                                <asp:Image ID="imgQuitarEmpleado" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                                            </td>
                                                            <td>
                                                                <a>&nbsp;Quitar</a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <%--<tr>
                            <td align="right" style="width: 100px;">
                                Area:&nbsp;
                            </td>
                            <td>
                                <asp:TextBox ID="txtCodInt" runat="server" Width="340px"></asp:TextBox>
                                <asp:HiddenField ID="hdfCodIntBusqueda" runat="server" />
                            </td>
                        </tr>--%>
                            <tr>
                                <td align="right">
                                    <table>
                                        <tr>
                                            <td>
                                                <ttgInfo:ToolTipGenerico ID="ttgInfoArea" runat="server" />
                                            </td>
                                            <td>Área:&nbsp;
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td>
                                    <table border="0" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <%--<uc1:ControlBusquedaEnlace ID="cbeOrganizacion" runat="server" />--%>
                                                <div id="contenedor_cbeOrganizacion">

                                                    <asp:HiddenField ID="TextBoxNombreAreas" runat="server" ></asp:HiddenField>
                                                    <asp:HiddenField ID="TextBoxCodigoAreas" runat="server" ></asp:HiddenField>

	                                                <div class="ui-corner-all lu" style="width: 348px;display:block;">   
		                                                <span id="cbeOrganizacion_spControl">
			                                                <%--<span class="lui">FEMSA COMERCIO</span>
			                                                <br>--%>
		                                                </span>   
		                                                <input id="cbeOrganizacion_hdControl" type="hidden" value="">
	                                                </div>
                                                </div>
                                            </td>
                                            <td>&nbsp;
                                            <div id="btnAgregarOrga" class="btnNormal" style="width: 40px;" runat="server" title="Seleccionar Organización">
                                                <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/buscar.png" />
                                            </div>
                                            </td>
                                            <td>
                                                <div id="btnQuitarOrganizacion" class="btnNormal" runat="server" style="width: 80px;">
                                                    <table border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td>
                                                                <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                                            </td>
                                                            <td>
                                                                <a>&nbsp;Quitar</a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="right">Sucursal:&nbsp;
                                </td>
                                <td>
                                    <asp:TextBox ID="txtCodSuc" runat="server" Width="340px"></asp:TextBox>
                                    <asp:HiddenField ID="hdfCodSucBusqueda" runat="server" />
                                </td>
                            </tr>
                            <%--<tr>
                            <td>
                                <asp:Label ID="lblvcNom" runat="server" Text="Nombre"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtvcNom" runat="server" Width="250px" MaxLength="50"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblDni" runat="server" Text="DNI" />
                            </td>
                            <td>
                                <asp:TextBox ID="txtDni" runat="server" Width="70px" MaxLength="8" />
                            </td>
                        </tr>--%>
                            <tr class="esLlamadaExterna">
                                <td align="right">Correo:&nbsp;
                                </td>
                                <td>
                                    <asp:TextBox ID="txtCorreo" runat="server" Enabled="false" Width="340px" MaxLength="50" />
                                    <div id="btnEditarCorreo" class="btnNormal" style="display: none;">
                                        <asp:Label ID="txtEditarCorreo" runat="server" Text="Editar"></asp:Label>
                                    </div>
                                </td>
                            </tr>

                            <tr class="esConfirmPas" style="display: none;" runat="server" id="esConfirmPas">
                                <td align="right">Confirmar:&nbsp;
                                </td>
                                <td>
                                    <asp:TextBox ID="txtConfirmacionCorreo" runat="server" Enabled="false" Width="340px" MaxLength="50" />
                                </td>
                            </tr>

                            <tr style="height: 10px;">
                                <td></td>
                                <td></td>
                            </tr>
                            <tr style="display: none;">
                                <td>
                                    <asp:Label ID="lblF_vcCodEmp" runat="server" Text="" ToolTip="hola"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtF_vcCodEmp" runat="server" Width="250px" ClientIDMode="Static"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td>&nbsp;
                                </td>
                                <td>&nbsp;
                                </td>
                            </tr>
                        </table>
                    </cc1:ContenedorAccodion>
                    <cc1:ContenedorAccodion Texto="Información de acceso">
                        <table border="0">
                            <tr>
                                <td class="style1">Fecha de acceso actual:&nbsp;
                                </td>
                                <td>
                                    <asp:Label ID="lblAcceso" runat="server" Text="" Style="color: #0000FF"></asp:Label>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td class="style1">Fecha de acceso anterior a la actual:&nbsp;
                                </td>
                                <td>
                                    <asp:Label ID="lblUltAcceso" runat="server" Text="" Style="color: #0000FF"></asp:Label>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td class="style1"># Intentos forzados al sistema:&nbsp;
                                </td>
                                <td>
                                    <asp:Label ID="lblIntentos" runat="server" Text="0" Style="color: #0000FF"></asp:Label>
                                </td>
                                <td></td>
                            </tr>
                            <tr id="filaBloqueo">
                                <td></td>
                                <td>
                                    <asp:CheckBox ID="chBloqueo" runat="server" Text="Cuenta Bloqueada" />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td class="style1">Fecha de &uacute;ltimo bloqueo:&nbsp;
                                </td>
                                <td>
                                    <asp:Label ID="lblBloqueo" runat="server" Text="" Style="color: #0000FF"></asp:Label>
                                </td>
                                <td></td>
                            </tr>
                            <tr id="filaReiniciar">
                                <td></td>
                                <td align="left">
                                    <table>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chReiniciar" runat="server" Text="Reiniciar Clave" />
                                                <ttgInfo:ToolTipGenerico ID="tpInfoReinicio" runat="server" />
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td class="style1">Fecha de &uacute;ltimo reinicio de clave:&nbsp;
                                </td>
                                <td class="style2">
                                    <asp:Label ID="lblFecRei" runat="server" Text="" Style="color: #0000FF"></asp:Label>
                                </td>
                                <td>
                                    <a id="btnHorario" href="#" onclick="Horario_AccesoSistema()" class="btnNormal">Horarios
                                    de Acceso al Sistema </a>
                                </td>
                            </tr>
                            <tr>
                                <td class="style1">Fecha de &uacute;ltimo cambio de clave:&nbsp;
                                </td>
                                <td>
                                    <asp:Label ID="lblFecUltCla" runat="server" Text="" Style="color: #0000FF"></asp:Label>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td class="style1">&nbsp;
                                </td>
                                <td>&nbsp;
                                </td>
                                <td></td>
                            </tr>
                            <tr id="trEstado" runat="server">
                                <td class="style1">Activo
                                </td>
                                <td>
                                    <asp:CheckBox ID="chkEstado" runat="server" Checked="true" />
                                </td>
                                <td></td>
                            </tr>

                            <tr id="trDobleFactor" runat="server">
                                <td class="style1">Doble Factor
                                </td>
                                <td>
                                    <asp:CheckBox ID="chkDobleFactor" runat="server" Checked="true" />
                                </td>
                                <td></td>
                            </tr>
                        </table>
                    </cc1:ContenedorAccodion>
                    <%--
                <cc1:ContenedorAccodion Texto="Credenciales">
                </cc1:ContenedorAccodion>--%>
                    <cc1:ContenedorAccodion Texto="Perfiles">
                        <table border="0">
                            <tr><td colspan="4"><asp:Label ID="lblNotaPaginaPrincipal" runat="server" Text="*Nota: Para que la página principal funcione el usuario deberá de tener permisos de acuerdo al perfil seleccionado." style="color:Red;font-weight:normal;font-style:italic;"></asp:Label></td></tr>
                            <tr>
                                <td style="font-weight: bold;">
                                    Página Inicial:&nbsp;
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Nivel:&nbsp;</label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlNivelProducto" runat="server" Width="150"></asp:DropDownList>
                                </td>
                                <td>
                                    <label>Página:&nbsp;</label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlPaginaPrincipal" runat="server" Width="300"></asp:DropDownList>
                                </td>
                            </tr>
                        </table>
                        <cc1:AccordionJQ ID="accOpcionesGenerales" runat="server" CssClass="accordion">
                            <cc1:ContenedorAccodion Texto="Opciones">
                                <div id="divTreePerfil">
                                </div>
                                <div id="dvMensaje1" style="display: none;">
                                    <asp:Label ID="lblEsTecResp" runat="server" ForeColor="Red" Font-Bold="False" Font-Italic="True"></asp:Label>
                                </div>
                                <div id="dvMensaje2" style="display: none;">
                                    <asp:Label ID="lblEsResApro" runat="server" ForeColor="Red" Font-Bold="False" Font-Italic="True"></asp:Label>
                                </div>
                            </cc1:ContenedorAccodion>
                            <cc1:ContenedorAccodion Texto="Solicitudes">
                                <table id="tbGridSolicitudes">
                                </table>
                                <br />
                            <%--<div>Técnico Solicitud - Área</div>--%>
                                <table border="0" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <%--<td>
                                                <uc2:ControlBusquedaEnlace ID="ControlBusquedaEnlace" runat="server" />
                                            </td>--%>
                                            <td>
                                                <asp:HiddenField runat="server" ID="hdCodintTecnico" />
                                                <asp:HiddenField runat="server" ID="hdCodOrgTecnico" />
                                                <asp:HiddenField runat="server" ID="hdNomOrgTecnico" />
                                                &nbsp;
                                            <div id="btnAgregarOrga2" class="btnNormal" style="width: 100px;" runat="server" title="Seleccionar Organización">
                                                <asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />&nbsp;Asociar Área
                                            </div>
                                            </td>
                                            <%--<td>&nbsp;
                                            <div id="btnAgregaArea" class="btnNormal" style="width: 40px;" runat="server" title="Agregar Área">
                                                <asp:Image ID="Image6" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                            </div>
                                            </td>--%>
                                            <td>&nbsp;
                                            <div id="btnQuitaArea" class="btnNormal" style="width: 40px;" runat="server" title="Quitar Área">
                                                <asp:Image ID="Image7" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" />
                                            </div>
                                            </td>

                                            <%--<td>
                                                <div id="Div2" class="btnNormal" runat="server" style="width: 80px;">
                                                    <table border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td>
                                                                <asp:Image ID="Image4" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                            </td>
                                                            <td>
                                                                <a>&nbsp;Quitar</a>
                                                            </td>
                                                            <td>
                                                                <asp:Image ID="Image5" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" />
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </td>--%>
                                        </tr>
                                    </table>
                                <br />
                                <table id="tbGridSolicitudesArea">
                                </table>

                            </cc1:ContenedorAccodion>

                            <cc1:ContenedorAccodion Texto="Incidencias">
                                <asp:HiddenField ID="hdfIdTecnicoSupervisor" runat="server" />
                                <table>
                                    <tr>
                                        <td>Usuario Supervisor
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtUsuarioSupervisor" runat="server" Width="348" ReadOnly="True"></asp:TextBox>
                                        </td>
                                        <td>
                                            <asp:Image ID="imgBuscarUsuarioSupervisor" AlternateText="Buscar" runat="server"
                                                CssClass="imgBtn" ImageUrl="~/Common/Images/Mantenimiento/busqueda_generico.png" />
                                            <asp:Image ID="imgBuscarUsuarioSupervisorBorrar" AlternateText="Limpiar" runat="server"
                                                CssClass="imgBtn" ImageUrl="~/Common/Images/Mantenimiento/Borrar.png" />
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Bolsas para asignar
                                        </td>
                                        <td colspan="3">
                                            <asp:DropDownList ID="ddlNiveles" runat="server" Width="150">
                                            </asp:DropDownList>
                                            <asp:DropDownList ID="ddlBolsasParaAsinar" runat="server" Style="margin-left: 5px;"
                                                Width="200">
                                            </asp:DropDownList>
                                            <asp:Image ID="imgAgregarBolsa" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"
                                                CssClass="imgBtn" ToolTip="Agregar" />
                                            <asp:Image ID="imgQuitarBolsa" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif"
                                                CssClass="imgBtn" ToolTip="Quitar" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Bolsas Asignadas
                                        </td>
                                        <td colspan="3">
                                            <asp:ListBox ID="ddlBolsasAsignadas" runat="server" Width="359"></asp:ListBox>
                                        </td>
                                    </tr>
                                </table>
                            </cc1:ContenedorAccodion>
                            <cc1:ContenedorAccodion Texto="Atenciones">
                                <table>
                                    <tr>
                                        <td>
                                            <asp:CheckBox ID="chkAtenciones_EsOperador" Text="Es Operador" runat="server" />
                                            <asp:HiddenField ID="hdIdOperadorAtencion" runat="server" />
                                        </td>
                                    </tr>
                                </table>
                            </cc1:ContenedorAccodion>
                            <cc1:ContenedorAccodion Texto="Temporizador">
                                <div>
                                    <table style="display: none;">
                                        <tr>
                                            <td class="paddingDerecha">Mostrar Temporizador</td>
                                            <td>
                                                <asp:CheckBox ID="chkActivarTemporizador" runat="server" Enabled="False" />
                                            </td>
                                        </tr>
                                    </table>
                                    <div style="clear: both;"></div>
                                    <table class="esTemporizadorActivo">
                                        <tr>
                                            <td class="paddingDerecha">Temporizador</td>
                                            <td>
                                                <asp:DropDownList ID="ddlTemporizador" runat="server">
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="paddingDerecha">Tiempo</td>
                                            <td>
                                                <asp:TextBox ID="txtTiempoTemporizador" runat="server" Style="text-align: right" ReadOnly="True"></asp:TextBox>(Minutos)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="paddingDerecha">Reiniciar</td>
                                            <td>
                                                <asp:CheckBox ID="chkReiniciarTemporizado" runat="server" Enabled="False" />
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </cc1:ContenedorAccodion>
                        </cc1:AccordionJQ>
                    </cc1:ContenedorAccodion>

                    <%--<cc1:ContenedorAccodion Texto="Grupos">
                    <div id="divTreeGrupo">
                    </div>
                </cc1:ContenedorAccodion>--%>
                    <%--<cc1:ContenedorAccodion Texto="Acceso">
                    <div id="dvCodInt">
                        <table border="0">
                            
                            <tr>
                            </tr>
                        </table>
                    </div>
                </cc1:ContenedorAccodion>--%>
                </cc1:AccordionJQ>
            </div>
            <div id="dvArea" style="display: none; padding: 0px; margin: 0px;">
                <iframe id="ifArea" width="100%" height="100%" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
            </div>
            <!-- =====================================================================================================================
        MODULO DE SEGURIDAD 
    =====================================================================================================================-->
            <div id="Mod_HorarioAcceso" style="display: none;">
                <br />
                <center>
                    <table id="tbNumeros3">
                    </table>
                </center>
            </div>
            <!-- =====================================================================================================================        
    =====================================================================================================================-->
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
        <p>
            &nbsp;
        </p>
        <div id="divConQuitarPerfilTecSol" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>Al quitar el perfil&nbsp;<label
                id="lblNombrePerfilTecSol"></label>&nbsp;eliminará la configuración de "Seguridad
        por Tipo" para el usuario,
        <br />
            <br />
            ¿Desea quitar el perfil?
        </div>
        <%--<div id="dvConfirmQuitarTemporizador" style="display:none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        El temporizador actual está asociado a este perfil, si quita el perfil deberá seleccionar otro temporizador.
        <br />
        <br />
        ¿Desea quitar el perfil y el temporizador?
    </div>--%>
    </form>
</body>
</html>
