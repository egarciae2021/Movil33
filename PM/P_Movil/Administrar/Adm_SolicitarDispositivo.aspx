<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_SolicitarDispositivo" Codebehind="Adm_SolicitarDispositivo.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
	<script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Adm_SolicitarDispositivo.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfNuevoDispositivo" runat="server" />
        <asp:HiddenField ID="hdfDispositivo" runat="server" />
        <asp:HiddenField ID="hdfSolicitud" runat="server" />
        <asp:HiddenField ID="hdfAdmin" runat="server" />

        <div id="dvContenido" class="dvPanel">
            <div>
                <asp:Label ID="lblTituloSolicitud" runat="server" Text=""></asp:Label>
            </div>
            <table>
                <tr>
                    <td style="width:60px;">
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
                    <td> <%--ADJUNTAR ARCHIVOS--%>
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
                                <cc1:ContenedorTabJQ Titulo="Equipo Actual">
                                    <iframe id="ifDetalleDispositivo" height="390px" width="500px" frameborder="0"></iframe>
                                </cc1:ContenedorTabJQ>
                                <cc1:ContenedorTabJQ Titulo="Equipo a Adquirir">
                                    <iframe id="ifNuevoEquipo" height="390px" width="500px" frameborder="0"></iframe>
                                </cc1:ContenedorTabJQ>
                            </cc1:TabJQ>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <input id="btnSolicitar" runat="server" type="button" value="" class="btnNormal"/>
                    </td>
                </tr>
            </table>
        </div>
        <div id="dvAdjuntar" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifAdjuntar" frameborder="0" style="padding: 0px; margin: 0px;" width="420px" height="370px"></iframe>
        </div>
    </form>
</body>
</html>