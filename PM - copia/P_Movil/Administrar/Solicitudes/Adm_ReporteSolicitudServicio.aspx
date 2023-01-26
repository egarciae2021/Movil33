<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Solicitudes_Adm_ReporteSolicitudServicio" Codebehind="Adm_ReporteSolicitudServicio.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Adm_ReporteSolicitudEstado.js" type="text/javascript"></script>
    <script src="Adm_ReporteSolicitudServicio.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfArCodigo" runat="server" />
        <asp:HiddenField ID="hdfEstadoEnviado" runat="server" />
        <asp:HiddenField ID="hdfvcTab" runat="server" />
        <asp:HiddenField ID="hdfTipRepAct" runat="server" />
        <asp:HiddenField ID="hdfTipRepAmp" runat="server" />
        <asp:HiddenField ID="hdfEstadoSolicitud" runat="server" />
        <asp:HiddenField ID="hdfTipSol" runat="server" />
        <asp:HiddenField ID="hdfArchivosAdj" runat="server" />
        
        <div class="ui-widget-content ui-corner-all" style="padding:0px; margin:0px; background-image:none;">
            <table border="0">
                <tr>
                    <td style="width:60px" rowspan="2">
                        <asp:Label ID="lblFiltro" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
                    </td>
                    <td valign="middle" style="width:60px">Fechas:</td>
                    <td valign="middle" style="width:300px">
                        <asp:TextBox ID="txtFechaInicio" runat="server" Width="75px" ReadOnly="true" CssClass="txtFecha"></asp:TextBox>
                        <img id="imgBorrarFechaInicio" alt="" src="../../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>
                        &nbsp;-&nbsp;
                        <asp:TextBox ID="txtFechaFin" runat="server" Width="75px" ReadOnly="true" CssClass="txtFecha"></asp:TextBox>
                        <img id="imgBorrarFechaFin" alt="" src="../../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>
                    </td>
                    <td>
                        <div id="btnEnviarSol" class="btnNormal"><a>Enviar</a></div>
                    </td>
                    <td>
                        <div id="btnSalir" class="btnNormal"><a>Salir</a></div>
                    </td>
                </tr>
                <%--<tr>
                    <td valign="middle">Estado:</td>
                    <td valign="middle">
                        <asp:DropDownList ID="ddlEstado" runat="server"></asp:DropDownList>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        Tipo:
                        &nbsp;&nbsp;
                        <asp:DropDownList ID="ddlTipo" runat="server"></asp:DropDownList>
                    </td>
                </tr>--%>
            </table>
        </div>
        <div class="ui-widget-content ui-corner-all" style="padding:0px; margin:0px; background-image:none; margin-top:5px;">
            <cc1:TabJQ ID="tbSolicitud" runat="server" style="width:auto; height:auto">
                <cc1:ContenedorTabJQ Titulo="Solicitudes Activación" ID="tabAct">
                    <iframe id="IfReporteSolActivacion" height="390px" width="100%" style="height:590px;" frameborder="0"></iframe>
                </cc1:ContenedorTabJQ>
                <cc1:ContenedorTabJQ Titulo="Solicitudes Ampliación" ID="tabAmp">
                    <iframe id="ifReporteSolAmpliacion" height="390px" width="100%" style="height:590px;" frameborder="0"></iframe>
                </cc1:ContenedorTabJQ>
            </cc1:TabJQ>
            
        </div>
        <div id="dvEnviarReporte" runat="server" class="dvPanel" style="display:none;">
        <table>
            <tr>
                <td style="width:80px;">Tipo de envio</td>
                <td colspan="2">
                    <asp:RadioButtonList ID="rlstTipoDeEnvio" runat="server">
                        <asp:ListItem Value="1">Descargar Reporte</asp:ListItem>
                        <asp:ListItem Selected="True" Value="2">Enviar por correo</asp:ListItem>
                        <asp:ListItem Value="3">Ambos</asp:ListItem>
                    </asp:RadioButtonList>
                </td>
            </tr>
            <tr>
                <td>Adjuntos:</td>
                <td colspan="2">
                    <div id="dvAdjuntos"></div>
                </td>
            </tr>
            <tr>            
                <td colspan="3">
                    <div id="dvCorreo" >
                        <table>
                            <tr>
                                <td>
                                    <asp:Label ID="Label1" runat="server" Text="Asunto:"></asp:Label>                                    
                                </td>
                                <td>
                                    <asp:TextBox ID="txtAsunto" runat="server" Width="400px"></asp:TextBox>                                    
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="Label2" runat="server" Text="Correos:"></asp:Label>  
                                </td>
                                <td>
                                    <asp:TextBox ID="txtCorreo" runat="server" Width="400px"></asp:TextBox>  
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="Label3" runat="server" Text="Mensaje:"></asp:Label>  
                                </td>
                                <td>
                                    <asp:TextBox ID="txtCuerpo" runat="server" Width="400px" TextMode="MultiLine" Height="100px" style="resize: none;"></asp:TextBox>  
                                </td>
                            </tr>
                        </table>
                    </div>                    
                </td>
            </tr>
            <tr>
                <td colspan="3">
                    <div id="btnEnvioCorreo" class="btnNormal">
                        <asp:Image ID="imgEnvio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                        <a>Enviar</a>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
