<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Mnt_DetalleDispositivoServicio" Codebehind="Mnt_DetalleDispositivoServicio.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>    
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>  
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>  
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script> 
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="Mnt_DetalleDispositivoServicio.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>

</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfServicio" runat="server" />
    <asp:HiddenField ID="hdfServ" runat="server" />
    <div class="dvPanel">
        <table>
            <tr>
                <td>
                    <table>
                        <tr>
                            <td class="" style="text-align:center;">
                                <asp:Label ID="lblModeloDispositivo" runat="server" Text="">
                                    <asp:li
                                </asp:Label>
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
                                <asp:Label ID="lblTituloAsignacion" runat="server" Text="Asignación de equipo" Font-Bold="true"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblNumeroTitulo" runat="server" Text="Número"></asp:Label>
                            </td>
                            <td>
                                <asp:Label ID="lblNumero" runat="server" Text=""></asp:Label>
                            </td>
                        </tr>			
                        <tr>
                            <td>
                                <asp:Label ID="lblRPMTitulo" runat="server" Text="# RPM"></asp:Label>
                            </td>
                            <td>
                                <asp:Label ID="lblRPM" runat="server" Text=""></asp:Label>
                            </td>
                        </tr>			
                        <tr>
                            <td>
                                <asp:Label ID="lblMinutosAsignadosTitulo" runat="server" Text="Minutos Asignados"></asp:Label>
                            </td>
                            <td>
                                <asp:Label ID="lblMinutosAsignados" runat="server" Text=""></asp:Label>
                            </td>
                        </tr>			
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
                            </td>
                        </tr>
                        <tr>
				            <td colspan="2">
					            <div class="ui-widget-content ui-helper-clearfix" style="margin: 0.6em .0em;height:0.01em;"></div>
				            </td>
			            </tr>
                        <tr>
                            <td colspan="2">
                                <asp:Label ID="Label2" runat="server" Text="Servicios del dispositivo" Font-Bold="true"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <table id="tblServicio"></table>
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
