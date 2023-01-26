<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_SolicitudesAtencion_SOA_Mnt_Tipo" Codebehind="SOA_Mnt_Tipo.aspx.vb" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("SOA_Mnt_Tipo.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfIdTecnico" runat="server" />
    <asp:HiddenField ID="hdfIdTipo" runat="server" />
    <div id="dvCampos" class="dvPanel" style="overflow: auto;">
        <cc1:AccordionJQ ID="AccordionJQ1" runat="server" EnableViewState="true" CssClass="accordion" style="overflow:auto;" TabIndex="0">
            <cc1:ContenedorAccodion Texto="Información General" ID="accInformacionGeneral">
                <table>
                    <tr>
                        <td>Nombre</td>
                        <td><asp:TextBox ID="txtNombre" runat="server" Width="200"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td>Descripción</td>
                        <td><asp:TextBox ID="txtDescripcion" runat="server" Width="300"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td>Canal de atención</td>
                        <td><asp:DropDownList ID="ddlBolsasParaAsignar" runat="server" Width="310"></asp:DropDownList>
                            <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" CssClass="imgBtn" ToolTip="Agregar" />
                            <asp:Image ID="imgQuitar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" CssClass="imgBtn" ToolTip="Quitar" />                        </td>
                    </tr>
                    <tr>
                        <td>Canal de atención asignados</td>
                        <td><asp:ListBox ID="ddlBolsasAsignadas" runat="server" Width="310"></asp:ListBox></td>
                    </tr>
                    <tr>
                        <td>Mostrar Campaña Actual</td>
                        <td><asp:CheckBox ID="chkMostrarCamActual" runat="server" /></td>
                    </tr>
                    <tr>
                        <td>Mostrar en administrador</td>
                        <td><asp:CheckBox ID="chkMostrarAdmin" runat="server" /></td>
                    </tr>
                    <tr id="EsChkActivar" runat="server">                    
                        <td>Activo</td>
                        <td><asp:CheckBox ID="chkActivo" runat="server" /></td>
                    </tr>
                </table>
            </cc1:ContenedorAccodion>
            <cc1:ContenedorAccodion Texto="Tipificación" ID="accTipificacion">
                <div id="dvTipificacion" style="margin-bottom:5px;" >
                    <table>
                        <tr>
                            <td>Nombre</td>
                            <td><asp:TextBox ID="txtNombreTipificacion" runat="server" Width="170" MaxLength="50"></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td>Descripcion</td>
                            <td><asp:TextBox ID="txtDescripcionTipificacion" runat="server" Width="270" MaxLength="50"></asp:TextBox></td>
                        </tr>
                        <tr>
                            <td colspan="2" align="right">
                                <asp:Label ID="lblMsjTipificacion" runat="server" Text="(Doble click para actualizar una tipificación)" Font-Italic="true" ForeColor="Gray"></asp:Label>
                                <div id="btnAgregarTipificacion" class="btnNormal" style="width:100px;">
                                    <asp:Image ID="imgAgregarTipificacion" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                    <asp:Label ID="lblAgregarTipificacion" runat="server" Text="Agregar"></asp:Label>
                                </div>                                
                                <div id="btnQuitarTipificacion" class="btnNormal" style="width:100px;">
                                    <asp:Image ID="imgQuitarTipificacion" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png"/>
                                    <asp:Label ID="lblQuitarTipificacion" runat="server" Text="Quitar"></asp:Label>
                                </div>
                             </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <table id="gridTipificacion"></table>
                            </td>
                        </tr>
                    </table>
                </div>
            </cc1:ContenedorAccodion>
            <cc1:ContenedorAccodion Texto="Parámetros" ID="accParametros">
                <div id="dvParametros" style="margin-bottom:5px;">
                    <table>
                        <tr>
                            <td>La creación de parámetros permitirá reemplazar datos de la incidencia en cualquiera de los correos a enviar. Por ejemplo, si creo un parámetro de clave "{empleado}" y valor "Empleado" y en Configuración Por Estados (Mensaje) configuro un envío de correo cada vez que una incidencia se cree, con el texto: "Sr {empleado}, la solicitud fue creada exitosamente", el mensaje real que se enviará al empleado será el mismo pero el texto "{empleado}" será reemplazado por el nombre del empleado.
                            </td>
                        </tr>
                        <tr style="height: 5px;">
                            <td colspan="2"></td>
                        </tr>
                    </table>
                    <table width="500px">
                        <tr>
                            <td style="width:35px;">
                                <asp:Label ID="lblClave" runat="server" Text="Clave:"></asp:Label>  
                            </td>
                            <td>
                                <asp:TextBox ID="txtClave" runat="server" Width="200px" MaxLength="50"></asp:TextBox>  
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblValor" runat="server" Text="Valor:"></asp:Label>  
                            </td>
                            <td>
                                <asp:DropDownList ID="ddlValor" runat="server" Width="210px">
                                    <asp:ListItem Text="" Value="-1" Selected="True"></asp:ListItem>
                                </asp:DropDownList>  
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="TituloMant" colspan="3" align="right" >
                                <asp:Label ID="Label7" runat="server" Text="(Doble click para actualizar un parametro)" Font-Italic="true" ForeColor="Gray"></asp:Label>
                            <%--</td>
                            <td align="right" width="220px">--%>
                                <div id="btnAgregarParametro" class="btnNormal" style="width:100px;">
                                    <asp:Image ID="imgAgregarParametro" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                    <%--<a>Agregar</a>--%>
                                    <asp:Label ID="lblBotonAgregarParametro" runat="server" Text="Agregar"></asp:Label>
                                </div>                                
                                <div id="btnQuitarParametro" class="btnNormal" style="width:100px;">
                                    <asp:Image ID="imgQuitarParametro" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png"/>
                                    <%--<a>Quitar</a>--%>
                                    <asp:Label ID="lblBotonQuitarParametro" runat="server" Text="Quitar"></asp:Label>
                                </div>                                
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="padding-top:5px;">
                                <table id="tbParametros"></table>
                            </td>
                        </tr>
                    </table>
                </div>
            </cc1:ContenedorAccodion>
            <cc1:ContenedorAccodion Texto="Configuración Por Estados" ID="accConfiguracionEstados">
                <div id="dvEstados" style="width:540px;" class="dvTab">
                    <table border="0">
                        <tr>
                            <td class="TituloMant" style="width:80px;">
                                <asp:Label ID="lblEstado" runat="server" Text="Estados"></asp:Label>
                            </td>
                            <td>
                                <asp:DropDownList ID="ddlEstado" runat="server" Width="210px"></asp:DropDownList>
                            </td>
                        </tr>
                        <tr>
                            <td class="TituloMant">
                                <asp:Label ID="lblEnviarCorreo" runat="server" Text="Enviar Correo"></asp:Label>
                            </td>
                            <td class="ValorMant">
                                <asp:CheckBox ID="chkEnviarCorreo" runat="server"></asp:CheckBox>
                            </td>
                        </tr>
<%--                        <tr style="height: 2px;">
                            <td colspan="2"></td>
                        </tr>--%>
                        <tr>
                            <td colspan="2">
                                <cc1:TabJQ ID="tabEstados" runat="server" CssClass="tabs" style="margin: 0px; padding: 0px;">
                                    <cc1:ContenedorTabJQ ID="tbUmbral" Titulo="Umbrales" CssClass="dvTabContenido">
                                        <div id="dvUmbral" style="width:540px; margin: 15px;" class="dvTab">
                                            <table>
                                                <tr>
                                                    <td style="font-style:italic;"> 
                                                        <div id="msjUmbPendiente" >El umbral se hará efecto en el cambio de estado "Pendiente" al estado "Activo".</div>
                                                        <div id="msjUmbActivo" style="display:none;" >El umbral se hará efecto en el cambio de estado "Activo" al estado "Resuelto", "Anulado", "Devuelto" o "Atendido".</div>
                                                        <div id="msjUmbSinUmbral" style="display:none;" >El estado [estado] no tiene umbral.</div>
                                                    </td>
                                                </tr>
                                                <tr style="height: 5px;">
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td><asp:CheckBox ID="chkUmbral" runat="Server" Text="Activar umbral"/></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                    <div id="dvValorUmbral" style="display:none;">
                                                        <table>
                                                            <tr>
                                                                <td style="width:100px;">Valor Objetivo</td>
                                                                <td style="text-align:left;">
                                                                    <asp:TextBox ID="txtValorObjetivo" runat="server" Width="17" MaxLength="2"></asp:TextBox> días
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Valor Máximo</td>
                                                                <td>
                                                                    <asp:TextBox ID="txtValorMaximo" runat="server" Width="17" MaxLength="2"></asp:TextBox> días
                                                                </td>
                                                            </tr>
                                                            <tr style="height: 5px;">
                                                                <td colspan="2"></td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2">
                                                                    <table style="font-style:italic;">
                                                                        <tr>
                                                                            <td><span id="lblSemaforo1"></span></td>
                                                                            <td colspan="3" style="margin-left:10px;"><img src="../../Common/Images/Semaforos/Verde.png" /></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td><span id="lblSemaforo2"></span></td>
                                                                            <td colspan="3" style="margin-left:10px;"><img src="../../Common/Images/Semaforos/Ambar.png" /></td>
                                                                        </tr>
                                                                        <tr style="font-style:normal;">
                                                                            <td style="font-style:italic;"><span id="lblSemaforo3"></span></td>
                                                                            <td style="margin-left:10px;"><img src="../../Common/Images/Semaforos/Rojo.png" /></td>
                                                                            <td><asp:CheckBox ID="chkEnviarCorreoUmb" runat="server"/></td>
                                                                            <td>Enviar Correo</td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr style="height: 5px;">
                                                                <td colspan="2"></td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2">
                                                                    <div id="dvMensajeUmb" style="display:none;">
                                                                        <table>
                                                                            <tr>
                                                                                <td style="width:100px;"><asp:Label ID="lblCorreoUmb" runat="server" Text="Correos"></asp:Label></td>
                                                                                <td>Especialista;<asp:TextBox ID="txtCorreoUmb" runat="server" Width="306px" MaxLength="2000"></asp:TextBox></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><asp:Label ID="lblAsuntoUmb" runat="server" Text="Asunto"></asp:Label></td>
                                                                                <td><asp:TextBox ID="txtAsuntoUmb" runat="server" Width="355px" MaxLength="100"></asp:TextBox></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><asp:Label ID="lblMensajeUmb" runat="server" Text="Mensaje"></asp:Label></td>
                                                                                <td><asp:TextBox ID="txtMensajeUmb" runat="server" TextMode="MultiLine" Height="100px" width="500px" MaxLength="8000"></asp:TextBox></td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </cc1:ContenedorTabJQ>
                                    <cc1:ContenedorTabJQ ID="tabMensaje" Titulo="Mensaje" CssClass="dvTabContenido Msj">
                                        <div id="dvMensaje" style="margin:15px;" class="dvTab">
                                            <div id="divCorreo">
                                                <table>
                                                    <tr>
                                                        <td colspan="3">
                                                            <asp:Label ID="lblEnvioDeCorreo" runat="server" Text="Este mensaje será enviado cada vez que se cree una solicitud." Font-Italic="True"></asp:Label>  
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width:80px;"><asp:Label ID="lblCorreo" runat="server" Text="Correos"></asp:Label></td>
                                                        <td style="width:370px;"><asp:TextBox ID="txtCorreo" runat="server" Width="350" MaxLength="2000"></asp:TextBox></td>
                                                        <td style="text-align:left;">
                                                            <asp:CheckBox ID="chkPropietarioCor" Text="Propietario" runat="server"/>
                                                            <asp:CheckBox ID="chkTecnicoCor" text = "Especialista asignado" runat="server"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><asp:Label ID="lblAsunto" runat="server" Text="Asunto"></asp:Label></td>
                                                        <td colspan="2"><asp:TextBox ID="txtAsunto" runat="server" Width="350px" MaxLength="100"></asp:TextBox></td>
                                                    </tr>
                                                    <tr>
                                                        <td valign="top"><asp:Label ID="lblMensaje" runat="server" Text="Mensaje"></asp:Label></td>
                                                        <td colspan="2"><asp:TextBox ID="txtMensaje" runat="server" TextMode="MultiLine" Height="100px" MaxLength="8000"></asp:TextBox></td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </cc1:ContenedorTabJQ>
                                </cc1:TabJQ>
                            </td>
                        </tr>
                    </table>
                </div>
            </cc1:ContenedorAccodion>
        </cc1:AccordionJQ> 
    </div>
    <div style="text-align: left; padding-top: 12px">
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
