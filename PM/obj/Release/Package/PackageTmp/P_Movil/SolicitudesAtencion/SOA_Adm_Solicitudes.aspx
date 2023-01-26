<%@ Page Language="VB" AutoEventWireup="false"
    Inherits="P_Movil_SolicitudesAtencion_SOA_Adm_Solicitudes" CodeBehind="SOA_Adm_Solicitudes.aspx.vb" %>

<%@ Register Src="../../Common/Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcelGenerico"
    TagPrefix="eeg" %>

<%@ Register Src="../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/ajaxupload.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

</head>
<body>
    <link href="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("SOA_Adm_Solicitudes.css")%>" rel="stylesheet" type="text/css" />
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("SOA_Adm_Solicitudes.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfAdmin" runat="server" />
        <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
        <asp:HiddenField ID="hdfEmpleado" runat="server" />
        <asp:HiddenField ID="hdfIdTecnico" runat="server" />
        <asp:HiddenField ID="hdfEsUsuario" runat="server" />
        <asp:HiddenField ID="hdfMostrarMsjPrivado" runat="server" />
        <div id="global">
            <br />
            <div id="dvFiltros" class="flotarIzquierda">
                <div id="filtroTec" class="dvPanel flotarIzquierda usu" style="height: 20px; margin-right: 5px; margin-bottom: 5px;" runat="server">
                    <span style="position: relative; top: -23px; left: 0px; background-color: White; font-weight: bold;">Especialista </span>
                    <asp:DropDownList ID="ddlTecnicos" runat="server" Style="margin-left: -36px;">
                    </asp:DropDownList>
                </div>

                <div class="dvPanel flotarIzquierda usu" style="height: 20px; margin-right: 5px; margin-bottom: 5px;">
                    <span style="position: relative; top: -23px; left: 0px; background-color: White; font-weight: bold;">Bolsas </span>
                    <asp:DropDownList ID="ddlNivel" runat="server" Style="margin-left: -36px;">
                    </asp:DropDownList>
                    <asp:DropDownList ID="ddlBolsa" runat="server" Style="margin: 0px;">
                    </asp:DropDownList>
                </div>
                <div class="dvPanel flotarIzquierda" style="height: 20px; margin-right: 5px; margin-bottom: 5px;">
                    <span style="position: relative; top: -23px; left: 0px; background-color: White; font-weight: bold;">Estados</span>
                    <asp:DropDownList ID="ddlEstado" runat="server" Style="margin-left: -36px;">
                        <asp:ListItem>Todos</asp:ListItem>
                        <asp:ListItem Selected="True" Value="|ACT|">Activo</asp:ListItem>
                        <asp:ListItem Value="|AYU|">Ayuda</asp:ListItem>
                        <asp:ListItem Value="|ESC|">Escalado</asp:ListItem>
                        <asp:ListItem Value="|EXT|">Externo</asp:ListItem>
                        <asp:ListItem Value="|ATE|">Atendido</asp:ListItem>
                        <asp:ListItem Value="|RES|">Resuelto</asp:ListItem>
                        <asp:ListItem Value="|ANU|">Anulado</asp:ListItem>
                        <asp:ListItem Value="|DEV|">Devuelto</asp:ListItem>
                    </asp:DropDownList>
                </div>
                <div class="dvPanel flotarIzquierda" style="height: 20px; margin-right: 5px; margin-bottom: 5px;">
                    <span style="position: relative; top: -23px; left: 0px; background-color: White; font-weight: bold;">Tipos</span>
                    <asp:DropDownList ID="ddlTipo" runat="server" Style="margin-left: -36px;">
                    </asp:DropDownList>

                    <asp:DropDownList ID="ddlTipificacion" runat="server" Style="margin: 0px; display: none;">
                    </asp:DropDownList>
                </div>
                <div id="dvFiltroDato" class="dvPanel flotarIzquierda" style="height: 20px; margin-right: 5px; margin-bottom: 5px;">
                    <span id="spanTipoFiltro" style="position: relative; top: -23px; left: 0px; background-color: White; font-weight: bold;">Datos</span>
                    <asp:DropDownList ID="ddlTipoFiltro" runat="server" Style="margin-left: -32px;" class="usu">
                        <asp:ListItem Text="Código Ticket" Value="1" />
                        <asp:ListItem Text="Código Empleado" Value="2" />
                        <asp:ListItem Text="Nombre Empleado" Value="3" />
                    </asp:DropDownList>
                    <asp:TextBox ID="txtCodigoTicket" runat="server" MaxLength="30" Width="150"></asp:TextBox>
                </div>
                <div class="dvPanel flotarIzquierda" style="height: 20px; margin-right: 5px; margin-bottom: 5px;">
                    <span style="position: relative; top: -23px; left: 0px; background-color: White; font-weight: bold;">Fecha</span>

                    <span style="margin-left: -36px;">Inicio</span>
                    <asp:TextBox ID="txtFechaInicio" runat="server"></asp:TextBox>
                    <img id="imgBorrarFechaInicio" alt="" src="../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn" style="margin-right: 7px;" />
                    <span>Fin</span>
                    <asp:TextBox ID="txtFechaFin" runat="server"></asp:TextBox>
                    <img id="imgBorrarFechaFin" alt="" src="../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn" />

                </div>
                <div id="Div1" class="flotarIzquierda" style="margin-right: 5px; margin-bottom: 5px;" runat="server">
                    <eeg:ExportarExcelGenerico ID="eegExcel" runat="server" />
                </div>
            </div>
            <div style="clear: both;"></div>
            <div id="dvPanelControl" class="usu">

                <div id="btnAyuda"  class="btnNormal flotarIzquierda btnControles" >
                    <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/SolicitarAyuda.png" />
                    <a>Solicitar Ayuda</a>
                </div>
                <div id="btnEscalar" class="btnNormal flotarIzquierda btnControles">
                    <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/EscalarSolicitud.png" />
                    <a>Escalar Incidencia</a>
                </div>
                <div id="btnCerrar" class="btnNormal flotarIzquierda btnControles">
                    <asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/Mantenimiento/CerrarSolicitud.png" />
                    <a>Cerrar Incidencia</a>
                </div>
                <asp:CheckBox ID="chkFiltro" runat="server" Text="Mostrar filtro" Checked="True" />

            </div>
            <div style="clear: both; height: 10px;">
            </div>
            <div id="dvDatosGrilla" style="display: none;">
                <table id="gridSolicitud">
                </table>
                <div id="pagerSolicitud">
                </div>
            </div>
            <div id="dvSinDatos" style="display: none;">
                <span style="font-size: 14px; font-weight: 600;">No se encontraron incidencias.</span>
            </div>

        </div>
        <div id="dvCerrar">
            <div style="width: 99%; margin-bottom: 10px;">
                <span>Elija motivo de cierre:</span><br />
                <ul>
                    <li>
                        <input id="rbResuelto" name="rbCerrar" type="radio" checked="checked" /><span>Resuelto</span>
                    </li>
                    <li id="liDevuelto">
                        <input id="rbDevuelto" name="rbCerrar" type="radio" /><span>Devuelto</span>
                    </li>
                    <li>
                        <input id="rbAnulado" name="rbCerrar" type="radio" /><span>Anulado</span> </li>
                </ul>
            </div>
            <span>Descripción de cierre:</span><br />
            <asp:TextBox ID="txtConclucion" runat="server" Height="150" Width="99%" TextMode="MultiLine"></asp:TextBox>
            <div id="btnRegistrarCierre" class="boton" style="float: right; margin-top: 10px;">
                Cerrar Solicitud
            </div>
        </div>
        <div id="dvEscalar">
            <div style="width: 99%; margin-bottom: 10px;">
                <span>Elija bolsa a escalar</span><br />
                <asp:DropDownList ID="ddlBolsasEscalables" runat="server">
                </asp:DropDownList>
            </div>
            <span>Descripción de escalada</span><br />
            <asp:TextBox ID="txtDeescripcionEscalamiento" runat="server" Height="150" Width="99%" TextMode="MultiLine"></asp:TextBox>
            <div id="btnRegistrarEscalamiento" class="boton" style="float: right; margin-top: 10px;">
                Escalar Solicitud
            </div>
        </div>
        <div id="dvConversacion">

            <div class="dvPanel flotarIzquierda usu" style="height: 20px; margin-right: 5px; margin-bottom: 5px; margin-left: 0px;">
                <span style="position: relative; top: -23px; left: 0px; background-color: White; font-weight: bold;">Origen de notas </span>
                <asp:DropDownList ID="ddlOrigen" runat="server" Style="margin-left: -90px;">
                    <asp:ListItem Value="0">Cliente</asp:ListItem>
                    <asp:ListItem Value="1">Escalamiento</asp:ListItem>
                </asp:DropDownList>
            </div>
            <div id="dvMensajes" class="dvPanel">
                <div class="dvNotaContenedor">
                    <div class="tituloNota">
                        <div class="imagenNota"></div>
                        <div class="subTituloNota">
                            Nota creada el 21/01/2014 a las 9:02 AM por administrador
                        </div>
                    </div>
                    <div style="clear: both; height: 5px;"></div>
                    <div class="mensajeNota">
                        sdfdsf dsf sdf dsf ds fds fds fds fds fdfs 
                    </div>
                </div>
            </div>
            <div id="dvEscribir">
                <div id="dvEnviar" style="width: 100%;float: left;">
                    <asp:TextBox ID="txtNotaEnviar" runat="server" Width="580px"></asp:TextBox>
                    <div id="btnRegistraNota" class="boton" style="float: right; width: 70px; margin-right: 10px;">
                        Enviar
                    </div>
                </div>
                <div style="width: 100%;float: left;">
                    <div id="dvEnviarCorreo" class="usu1" style="float: right; margin-right: 10px;">
                        <asp:CheckBox ID="chkEnviarCorreo" runat="server" Text="Enviar Correo" />
                    </div>
                    <div id="dvEnvioSupervisor" class="usu" style="float: right; margin-right: 10px;">
                        <asp:CheckBox ID="chkMostrarOnlyMsjSupervi" runat="server" Text="Mostrar solo mensajes de supervisor" />
                        <asp:CheckBox ID="chkEnvioSupervisor" runat="server" Text="Mensaje para supervisor" />
                    </div>

                </div>
                <div id="pnlAdjuntar" style="width: 100%; padding-left: 0px;float: left;">

                    <div id="UploadStatus"></div>
                    <div id="UploadButton" align="center" class="imgBtn" style="text-align: left;">
                        <table>
                            <tr>
                                <td style="text-align: left;">
                                    <img alt="" src="../../Common/Images/Mantenimiento/SubirArchivo.png" width="16px" height="16px" />
                                </td>
                                <td style="vertical-align: bottom; text-decoration: underline;">Adjuntar Archivo</td>
                            </tr>
                        </table>
                    </div>
                    <div id="UploadedFile"></div>

                </div>
            </div>
        </div>
        <div id="dvAyuda">
            <p>Se <span style="font-weight: bold;" id="spanActivar"></span>ayuda para ticket <span style="font-weight: bold;" id="spanActivarCod"></span></p>
            <div style="text-align: right; padding-top: 12px">
                <div id="btnActivarAyuda" class="btnNormal">
                    <asp:Image ID="imgGuardarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                    <a>Guardar</a>
                </div>
                <div id="btnCerrarActivarAyuda" class="btnNormal">
                    <asp:Image ID="imgCerrarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    <a>Cerrar</a>
                </div>
            </div>
        </div>

        <div id="dvDialogoTipoEscalmiento">
            <p>Elija el tipo de escalamiento que desee</p>
            <div id="btnInterno" class="boton" style="float: left; margin-top: 10px; margin-left: 30px;">Interno</div>
            <div id="btnExterno" class="boton" style="float: left; margin-top: 10px; margin-left: 30px;">Externo</div>
        </div>
        <div id="dvEscalarExterno">
            <div style="width: 99%; margin-bottom: 10px;">
                <span>Elija bolsa a escalar</span>
                <div style="clear: both; height: 10px;"></div>
                <asp:DropDownList ID="ddlTiposExternos" runat="server" Style="float: left; margin-left: 5px;">
                </asp:DropDownList>
                <asp:DropDownList ID="ddlTipificacionExterna" runat="server" Style="float: left; margin-left: 20px;">
                </asp:DropDownList>
            </div>
            <div style="clear: both; height: 5px;"></div>
            <span>Descripción de escalamiento externo</span><br />
            <asp:TextBox ID="txtDscExerno" runat="server" Height="150" Width="99%" TextMode="MultiLine"></asp:TextBox>
            <div id="btnRegistrarEscEx" class="boton" style="float: right; margin-top: 10px;">
                Escalar Solicitud
            </div>
        </div>
    </form>
</body>
</html>
