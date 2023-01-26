<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Mnt_NuevoDispositivo" Codebehind="Mnt_NuevoDispositivo.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
	<script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div class="dvPanel">
        <table>
            <tr>
                <td>
                    <table>
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
                    <table>								
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
                                <div style="overflow:auto; height:150px; margin:0px; padding:0px;">
                                    <table id="tbDetalleModeloDispositivo" runat="server">
                                        <tr>
                                            <td>
                                                <asp:Label ID="lblEstadoTitulo" runat="server" Text="Estado"></asp:Label>
                                            </td>
                                            <td>
                                                <asp:Label ID="lblEstado" runat="server" Text=""></asp:Label>
                                            </td>
                                        </tr>
                                    </table>
                                </div>                            
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <%--<asp:Label ID="lblMensaje" runat="server" Text="* el pago de penalidad será descontado vía planilla."></asp:Label> --%>
                                <asp:Label ID="lblMensaje" runat="server" Text=""></asp:Label> 
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
