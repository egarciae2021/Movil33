<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_SolicitudAmpliacionServicio" Codebehind="Adm_SolicitudAmpliacionServicio.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.button.js"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="Adm_SolicitudAmpliacionServicio.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfDispositivo" runat="server" />
        <asp:HiddenField ID="hdfUbicacionImagen" runat="server" />
        <asp:HiddenField ID="hdfCodCuenta" runat="server" />
        <asp:HiddenField ID="hdfSolicitud" runat="server" />
        <asp:HiddenField ID="hdfCodLinea" runat="server" />
        <asp:HiddenField ID="hdfAdmin" runat="server" />
        <asp:HiddenField ID="hdfServSerl" runat="server" />
        
        <div id="dvContenido" class="dvPanel">
            <div>
                <asp:Label ID="lblTituloSolicitud" runat="server" Text="Ampliación de Servicio"></asp:Label>
            </div>
            <table><tr><td>
            <table>
                <tr>
                    <td style="width:80px;">
                        <asp:Label ID="lblEmpleadoTitulo" runat="server" Text="Empleado"></asp:Label>
                    </td>
                    <td align="left">
                        <asp:Label ID="lblEmpleado" runat="server" Text=""></asp:Label>
                        <asp:TextBox ID="txtEmpleado" runat="server" Width="290px" onkeydown = "return (event.keyCode!=13);"></asp:TextBox>
                        <asp:HiddenField ID="hdfCodEmpleado" runat="server" />                    
                    </td>
                </tr>
                <tr align="left">
                    <td colspan="2" align="left">
                        <asp:Label ID="lblMensaje" runat="server" Text="" ForeColor="Red" Font-Bold="true"></asp:Label>
                    </td>
                </tr>
                <tr align="left">
                    <td>
                        <asp:Label ID="lblEquipoTitulo" runat="server" Text="Equipo"></asp:Label>
                    </td>
                    <td align="left">
                        <asp:DropDownList ID="ddlDispositivo" runat="server" Width="300px"></asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td> <%--agregado 02-09-2013--%>
                        <div id="btnAdjuntarArchivos" class="btnNormal">Adjuntar Archivos</div>
                        <asp:Label ID="lblNumeroAdjuntos" runat="server" Text="No se ha adjuntado ningún archivo"></asp:Label>                        
                    </td>
                </tr>
                <tr align="left">
			        <td colspan="2">
			            <div class="ui-widget-content ui-helper-clearfix" style="margin: 0.6em .0em;width:520px;height:0.008em;"></div>
			        </td>
                </tr>
                <tr id="trFrames" style="text-align:left;">
                    <td id="tdFrames" colspan="2" style="width:520px; height:420px;">
                        <div id="divTabs" runat="server">
                            <cc1:TabJQ ID="tbModelos" runat="server" style="width:520px; height:420">
                                <cc1:ContenedorTabJQ Titulo="Equipo Seleccionado">
                                    <iframe id="ifDetalleDispositivo" height="390px" width="500px" frameborder="0"></iframe>
                                </cc1:ContenedorTabJQ>
                            </cc1:TabJQ>
                        </div>
                    </td>
                </tr>
                <tr><td colspan="2"><div style="height:7px"></div></td></tr>
                <%--<tr id="trNuevoServicio0" runat="server">
                    <td>
                        <asp:Label ID="Label1" runat="server">Tipo Servicio</asp:Label>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlTipoServicio" runat="server" ></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trNuevoServicio1" runat="server">
                    <td>
                        <asp:Label ID="lblNuevoServicio" runat="server">Servicio</asp:Label>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlServicio" runat="server" ></asp:DropDownList>
                    </td>
                </tr>--%>
            </table>
      </td><td style="vertical-align:bottom;"><div style="padding-left:100px;">
            <table>
                <tr align="left">
			        <td colspan="2">
			            <div class="ui-widget-content ui-helper-clearfix" style="margin: 0.6em .0em;width:380px;height:0.008em;"></div>
			        </td>
                </tr>
                <tr id="trServicioSeleccionado">
                    <td>Servicio Seleccionado</td>
                    <td>
                        <asp:Label ID="lblServSeleccionado" runat="server"></asp:Label>
                    </td>
                </tr>
                <tr id="trCantidad1" runat="server">
                    <td>
                        <asp:Label ID="Label2" runat="server">Servicio Ilimitado</asp:Label>
                    </td>
                    <td>
                        <asp:CheckBox ID="chkIlimitado" runat="server" />
                    </td>
                </tr>
                <tr id="trCantidad2" runat="server">
                    <td>
                        <asp:Label ID="Label3" runat="server">Cantidad</asp:Label>
                        <asp:Label ID="lblValorCatnidad" runat="server" ></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtCatnidadSolicitada" runat="server" MaxLength="5"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trNuevoServicio2">
                    <td>Motivo</td> 
                    <td><asp:TextBox ID="txtMotivoActivacion" runat="server" Width="290px" TextMode="MultiLine" Rows="4" 
                        Height="66px" style="resize: none;" MaxLength="144"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="right">
                        <input id="btnSolicitar" runat="server" type="button" value="" class="btnNormal" />
                    </td>
                </tr>
            </table>
        </div></td></tr></table>
        </div>
        <div id="dvAdjuntar" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifAdjuntar" frameborder="0" style="padding: 0px; margin: 0px;" width="420px" height="370px"></iframe>
        </div>
    </form>
</body>
</html>
