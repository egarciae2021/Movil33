<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Mnt_Usuario.aspx.cs" Inherits="PcSistelMovil2Web.Mantenimiento.Mnt_Usuario" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register Src="../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico"
    TagPrefix="ttgInfo" %>
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
    <link href="../Common/Scripts/dynaTree/ui.dynatree.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/dynaTree/jquery.dynatree-1.2.4.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../Common/Styles/Principal2.css" rel="stylesheet" type="text/css" />
    <script src="Mnt_Usuario.js" type="text/javascript"></script>
    <style type="text/css">
        .css_fondoHorario
        {
            background-color: #F2F2F2;
        }
        .style1
        {
            text-align: right;
        }
        .style2
        {
            width: 200px;
        }
        .paddingDerecha
        {
            padding-right: 10px;
        }
        .esTemporizadorActivo
        {
            display: none;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfCodOperador" runat="server" />
    <asp:HiddenField ID="hdfCodigo" runat="server" />
    <asp:HiddenField ID="hdfCodCliente" runat="server" />
    <asp:HiddenField ID="hdfEsTecResp" runat="server" />
    <!-- ==================================================================================
        MODULO DE SEGURIDAD - error 1505
    ====================================================================================== -->
    <asp:HiddenField ID="hdf_esAdmin" runat="server" />
    <!-- ==================================================================================    
    ====================================================================================== -->
    <asp:HiddenField ID="hdfEsllamadaExterna" runat="server" />
    <div id="dvCargando" class="dvCargando">
    </div>
    <div id="dvMsgAlertaExterna" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <div id="dvContenidoAlertaExterna">
        </div>
    </div>
           <%-- Modal usuario --%>
    <div id="div_modal_Operador" style="display: none; padding: 0px; margin-left: 10px; overflow-y: hidden;">
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
            <div id="btnAsignarOperador" class="btnNormal" style="width: 80px;">
                <a style="font-size: 10px;">Aceptar</a>
            </div>
            <div id="btnCancelar" class="btnNormal" style="width: 80px;">
                <a style="font-size: 10px;">Cancelar</a>
            </div>
        </div>
    </div>
    <%-- Fin Modal Operador--%>
    <div class="" style="overflow: auto;">
        <div id="dvContAcordeon">
            <cc1:AccordionJQ ID="AccordionJQ1" runat="server" CssClass="accordion">
                <cc1:ContenedorAccodion Texto="Cuenta">
                    <table border="0" width="100%">
                        <tr>
                            <td colspan="2">
                                <table border="0" width="400px">
                                    <tr>
                                        <td align="left" style="width: 140px;">
                                            Usuario:&nbsp;
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtvcUsu" runat="server" Width="200px" MaxLength="90"></asp:TextBox>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr id="filaContrasena">
                                        <td align="left">
                                            Contraseña:&nbsp;
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtvcPas" TextMode="Password" runat="server" Width="200px" MaxLength="200"></asp:TextBox>
                                        </td>
                                        <td id="filaCheckEditar">
                                            <asp:CheckBox ID="chEditar" runat="server" Text="Editar" />
                                        </td>
                                    </tr>
                                    <tr id="trFilaConfirmar">
                                        <td align="left">
                                            Confirmar Contraseña:&nbsp;
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtConfirmarContrasena" TextMode="Password" runat="server" Width="200px" MaxLength="200"></asp:TextBox>
                                        </td>
                                        <td>
                                            <%--<asp:CheckBox ID="CheckBox1" runat="server" Text="Editar" />--%>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="width: 90px;">
                                            Nombre:&nbsp;
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtnombre" runat="server" Width="200px" MaxLength="90"></asp:TextBox>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="width: 90px;">
                                            Apellidos:&nbsp;
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtape" runat="server" Width="200px" MaxLength="90"></asp:TextBox>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr id="trFilaCorreo">
                                        <td align="left">
                                            Correo:&nbsp;
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtCorreo" runat="server" Width="200px" MaxLength="200"></asp:TextBox>
                                        </td>
                                        <td>                                            
                                        </td>
                                    </tr>
                                    <tr id="trFilaConfirmarCorreo">
                                        <td align="left">
                                            Confirmar Correo:&nbsp;
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtConfirmarCorreo" runat="server" Width="200px" MaxLength="200"></asp:TextBox>
                                        </td>
                                        <td>                                            
                                        </td>
                                    </tr>
                                    <tr id="trEstado" runat="server">
                                          <td align="left" style="width: 90px;">
                                            Activo
                                        </td>
                                        <td>
                                            <asp:CheckBox ID="chkEstado" runat="server" Checked="true" />
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="height: 30px;">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="width: 700px;">
                                <b>Vincular Operador</b>
                            </td>
                        </tr>
                        <tr class="esLlamadaExterna">
                            <td valign="middle" align="left"  style="width: 140px;">
                                Operador:&nbsp;
                            </td>
                            <td valign="top">
                                <table border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:TextBox ID="txtoperador" runat="server" Width="350px" ReadOnly="true"></asp:TextBox>
                                            &nbsp;
                                        </td>
                                        <td>
                                            <div id="BtnAddOperador" class="btnNormal" style="width: 40px;" runat="server" title="Seleccionar Organización">
                                                <asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/Mantenimiento/buscar.png" />
                                            </div>
                                        </td>
                                        <td>
                                            <div id="btnQuitarOperador" class="btnNormal" runat="server" style="width: 80px; display:none;">
                                                <table border="0" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td>
                                                            <asp:Image ID="imgQuitarOperador" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
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
                    </table>
                </cc1:ContenedorAccodion>
                <cc1:ContenedorAccodion Texto="Información de acceso" Visible="false">
                    <table border="0">
                        <tr>
                            <td class="style1">
                                Fecha de acceso actual:&nbsp;
                            </td>
                            <td>
                                <asp:Label ID="lblAcceso" runat="server" Text="" Style="color: #0000FF"></asp:Label>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td class="style1">
                                Fecha de acceso anterior a la actual:&nbsp;
                            </td>
                            <td>
                                <asp:Label ID="lblUltAcceso" runat="server" Text="" Style="color: #0000FF"></asp:Label>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td class="style1">
                                # Intentos forzados al sistema:&nbsp;
                            </td>
                            <td>
                                <asp:Label ID="lblIntentos" runat="server" Text="0" Style="color: #0000FF"></asp:Label>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr id="filaBloqueo">
                            <td>
                            </td>
                            <td>
                                <asp:CheckBox ID="chBloqueo" runat="server" Text="Cuenta Bloqueada" />
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td class="style1">
                                Fecha de &uacute;ltimo bloqueo:&nbsp;
                            </td>
                            <td>
                                <asp:Label ID="lblBloqueo" runat="server" Text="" Style="color: #0000FF"></asp:Label>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr id="filaReiniciar">
                            <td>
                            </td>
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
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td class="style1">
                                Fecha de &uacute;ltimo reinicio de clave:&nbsp;
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
                            <td class="style1">
                                Fecha de &uacute;ltimo cambio de clave:&nbsp;
                            </td>
                            <td>
                                <asp:Label ID="lblFecUltCla" runat="server" Text="" Style="color: #0000FF"></asp:Label>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td class="style1">
                                &nbsp;
                            </td>
                            <td>
                                &nbsp;
                            </td>
                            <td>
                            </td>
                        </tr>
                    </table>
                </cc1:ContenedorAccodion>
                <cc1:ContenedorAccodion Texto="Perfiles">
                    <div id="divTreePerfil">
                    </div>
                    <div id="dvMensaje1" style="display: none;">
                        <asp:Label ID="lblEsTecResp" runat="server" ForeColor="Red" Font-Bold="False" Font-Italic="True"></asp:Label>
                    </div>
                    <div id="dvMensaje2" style="display: none;">
                        <asp:Label ID="lblEsResApro" runat="server" ForeColor="Red" Font-Bold="False" Font-Italic="True"></asp:Label>
                    </div>
                </cc1:ContenedorAccodion>
            </cc1:AccordionJQ>
        </div>
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
        &nbsp;</p>
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
