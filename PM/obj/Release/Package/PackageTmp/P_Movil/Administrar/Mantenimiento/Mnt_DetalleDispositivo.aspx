<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Mnt_DetalleDispositivo" Codebehind="Mnt_DetalleDispositivo.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
	<script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Mnt_DetalleDispositivo.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
    
    <style type="text/css">
        .style1
        {
            height: 23px;
        }
    </style>    
</head>
<body ><%--style="overflow-y: hidden;"--%>
    <form id="form1" runat="server">
    <asp:HiddenField runat="server" ID="hdfTieneLinea" />
    <div class="dvPanel">
        <table style="width: 100%;">
            <tr>
                <td style="vertical-align:top;">
                    <table>
                        <tr>
                            <td class="" style="text-align:center;">
                                <asp:Label ID="lblIMEI" runat="server" Text="" Font-Bold="true"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td class="" style="text-align:center;">
                                <asp:Label ID="lblModeloDispositivo" runat="server" Text=""></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img id="imgImagen" alt="Imagen" src="" runat="server"/>
                            </td>
                        </tr>
                    </table>
                </td>
                <td>
                    <table id="tbCamposDinamicos" runat="server">
                        <tr>
                            <td colspan="2">
                                <asp:Label ID="lblTituloAsignacion" runat="server" Text="Asignación de equipo" Font-Bold="true"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td style="/*width: 200px;*/">
                                <asp:Label ID="lblUltimaFechaCambioTitulo" runat="server" Text="Última fecha de cambio"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblUltimaFechaCambio" runat="server" Text=""></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblNumeroMesesCambioTitulo" runat="server" Text="Tiempo necesario para cambiar equipo(Meses)"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblNumeroMesesCambio" runat="server" Text=""></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblProximaFechaCambioTitulo" runat="server" Text="Puede cambiar su equipo desde"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblProximaFechaCambio" runat="server" Text=""></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblNumeroTitulo" runat="server" Text="Línea"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblNumero" runat="server" Text=""></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblPlanAsignado" runat="server" Text="Plan Asignado"></asp:Label>
                            </td>
                        </tr>	
                        <tr>
                            <td>
                                <asp:Label ID="lblPlan" runat="server" Text=""></asp:Label>
                            </td>
                        </tr>
                        <tr style="display:none;">
                            <td>
                                <asp:Label ID="lblRPMTitulo" runat="server" Text="# RPM"></asp:Label>
                            </td>
                        </tr>
                        <tr style="display:none;">
                            <td>
                                <asp:Label ID="lblRPM" runat="server" Text=""></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblMinutosAsignadosTitulo" runat="server" Text="Minutos Asignados"></asp:Label>
                            </td>
                        </tr>	
                        <tr>
                            <td>
                                <asp:Label ID="lblMinutosAsignados" runat="server" Text=""></asp:Label>
                            </td>
                        </tr>
                        <tr id="trPenalidad" runat="server" style="display:none;">
                            <td>
                                <asp:Label ID="lblPenalidadCambioTitulo" runat="server" Text="Penalidad por cambio de equipo"></asp:Label>
                            </td>
                        </tr>	
                        <tr>
                            <td>
                                <asp:Label ID="lblPenalidadCambio" runat="server" Text=""></asp:Label>
                            </td>
                        </tr>
                        <!--Inicio del detalle de equipo-->
                        
                    </table>
                </td>
            </tr>
        </table>
        <table style="width: 100%">
            <tbody>
                <tr>
                    <td>
                        <table id="tbCamposDinamicosDetalle" style="width: 100%" runat="server">
                            <tbody>
                                <tr>
				                    <td colspan="2">
					                    <div class="ui-widget-content ui-helper-clearfix" style="margin: 0.6em .0em;height:0.01em;"></div>
				                    </td>
			                    </tr>
                                <tr>
                                    <td colspan="2">
                                        <asp:Label ID="Label1" runat="server" Text="Detalles de modelo del equipo" Font-Bold="true"></asp:Label>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
        <%--                                <div style="overflow:auto; height:150px; margin:0px; padding:0px;">--%>
                                            <table id="tbDetalleModeloDispositivo" runat="server">
                                                <tr>
                                                    <td class="style1">
                                                        <asp:Label ID="lblEstadoTitulo" runat="server" Text="Estado"></asp:Label>
                                                    </td>
                                                    <td class="style1">
                                                        <asp:Label ID="lblEstado" runat="server" Text=""></asp:Label>
                                                    </td>
                                                </tr>
                                            </table>
        <%--                                </div>   --%>                         
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" >
                                        <div id="pnlAsignacion" style="width:100%; margin-bottom:15px;">
                                            <div  style="width:100%; height:15px; font-weight:bold; border-bottom: 1px solid #a6c9e2;">Asignación</div>
                                            <div style="width:100%; height:15px; border-bottom: 1px solid #a6c9e2;">
                                              <div style="width:59%;float:left;">Descripción</div>
                                              <div style="width:10%;float:left;">Unid. Med.</div>
                                              <div style="width:29%;float:left; text-align:right;">Cant</div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <%--<asp:Label ID="lblMensaje" runat="server" Text="* El pago de penalidad será descontado vía planilla."></asp:Label>--%>
                                        <asp:Label ID="lblMensaje" runat="server" Text=""></asp:Label>
                                    </td>
                                </tr>
                                <tr>
				                    <td colspan="2">
					                    <div class="ui-widget-content ui-helper-clearfix" style="margin: 0.6em .0em;height:0.01em;"></div>
				                    </td>
			                    </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </form>
</body>
</html>
