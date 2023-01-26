<%@ Page Language="VB" AutoEventWireup="false"
    Inherits="P_Movil_AdministrarTickets_AdmTck_RegistrarTicket" Codebehind="AdmTck_RegistrarTicket.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/ajaxupload.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <%--<script src="AdmTck_RegistrarTicket.js" type="text/javascript"></script>--%>
    <style type="text/css">
    
    #btnBuscar img
    {
        width:100%;
        height:100%;
        max-width:100%;    
    }
    
    #btnBuscar:hover
    {
        cursor:pointer;
    }
    
    </style>
</head>
<body text="...">
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("AdmTck_RegistrarTicket.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfIdTecnico" runat="server" />
    <asp:HiddenField ID="hdfEsOk" runat="server" />
    <asp:HiddenField ID="hdfIdAtencion" runat="server" />
        
        <div id="divMsgConfirmacionDeleteFile" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            ¿Desea eliminar este archivo?
        </div>

    <div id="global">
        <div id="dvCargando" class="dvCargando">
        </div>

        <div>
            <br />
            <label><i>Tenga en cuenta que aquí solo debe reportar inconvenientes o consultas sobre la plataforma. Si desea registrar requerimientos relacionados a la gestión de líneas o dispositivos, porfavor realizarlo a través de la opción "Solicitudes".</i></label>
        </div>

        <div id="Div1" runat="server" class="dvPanel" style="overflow: auto;">

            <br />
<%--            <div style="text-align: center; font-size: medium;">
                <a>Registro tickets</a></div>--%>
            <table id="Table1" runat="server">
                <tr class="EsUsuario">
                    <td style="text-align: left;" >
                        <a>Usuario</a>
                    </td>
                    <td width="10">
                    </td>
                    <td>
                        <asp:TextBox ID="txtUsuario" runat="server" Width="300px" ReadOnly="True"></asp:TextBox>
                    </td>
                    <td>
                        <div id="btnBuscar" style="width:25px; height:25px; float:left;">
                            <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/busqueda_generico.png"/>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left;" >
                        <a>Tipo</a>
                    </td>
                    <td width="10">
                    </td>
                    <td colspan="2">
                        <asp:DropDownList ID="ddlTipo2" runat="server" width="310px">
                        </asp:DropDownList>
                    </td>
                    <td width="10">
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left;" >
                        <a>Acerca de</a>
                    </td>
                    <td width="10">
                    </td>
                    <td colspan="2">
                        <asp:DropDownList ID="ddlTipo" runat="server" width="310px">
                            <asp:ListItem Value="-1">---Seleccione----</asp:ListItem>
                        </asp:DropDownList>
                    </td>
                    <td width="10">
                    </td>
                </tr>
                <tr id="trMedioContacto" class="EsUsuario">
                    <td style="text-align: right;" >
                        <a>Medio de contacto</a>
                    </td>
                    <td width="10">
                    </td>
                    <td colspan="2">
                        <asp:DropDownList ID="ddlMedioContacto" runat="server" width="310px">
                        </asp:DropDownList>
                    </td>
                    <td width="10">
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left;" >
                        <a>Asunto</a>
                    </td>
                    <td width="10">
                    </td>
                    <td colspan="2">
                        <asp:TextBox ID="txtAsunto" runat="server" Width="300px" MaxLength="50" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                    </td>
                    <td width="10">
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left;" >
                        <a>Descripción</a>
                    </td>
                    <td width="10">
                    </td>
                    <td colspan="2">
                        <asp:TextBox ID="txtDescripcion" runat="server" Width="300px" Height="100px" TextMode="MultiLine" MaxLength="500" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                    </td>
                    <td width="10">
                    </td>
                </tr>
                <tr>
                    <td class="tdEtiqueta" valign="top">
                        <asp:Label ID="lblAdjuntos" runat="server" Text="Adjunto"></asp:Label>
                    </td>
                    <td width="10">
                    </td>
                    <td colspan="2">
                        <%--<iframe id="ifAdjuntoTicket" frameborder="0" style="width: 410px; height: 175px; padding: 0px; margin: 0px; display: none;"></iframe>--%>

                        
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

                    </td>
                </tr>
                <tr style="display:none !important;" class="EsUsuario">
                    <td>
                        Asignarme Ticket
                    </td>
                    <td width="10">
                    </td>
                    <td>
                        <asp:CheckBox ID="chkAsignarme" runat="server" />
                    </td>
                    <td width="10">
                    </td>
                </tr>
<%--                <tr>
                    <td colspan="4" height="30px">
                    </td>
                </tr>
                <tr>
                    <td colspan="4" align="center">
                        <div id="btnRegistrar">
                            <a>Registrar ticket</a>
                        </div>
                    </td>
                </tr>--%>
            </table>
        </div>

        <div style="text-align:left; padding-top: 12px;">
            <div id="btnRegistrar" class="btnNormal" <%--style="float: right;"--%>>
                <asp:Image ID="imgGuardarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                <a>Registrar ticket</a>
            </div>
<%--            <div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                <a>Cerrar</a>
            </div>--%>
        </div> 

        <div id="dvArea" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifArea" width="730" height="420" frameborder="0" style="padding: 0px;
                margin: 0px;"></iframe>
        </div>
    </div>
    </form>
</body>
</html>
