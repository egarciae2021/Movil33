<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_CambioDispositivo" Codebehind="Adm_CambioDispositivo.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
	<link rel="stylesheet" href="../../Common/Styles/basic.css" type="text/css" /><%-- galleriffic--%>
    <link href="../../Common/Styles/white.css" rel="stylesheet" type="text/css" /><%-- galleriffic--%>
    <link href="../../Common/Styles/galleriffic-5.css" rel="stylesheet" type="text/css" /><%-- galleriffic--%>
	<script type="text/javascript" src="../../Common/Scripts/jquery-1.7.2.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.button.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.position.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.mouse.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.draggable.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.resizable.js"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.autocomplete.js" type="text/javascript"></script>
	<script type="text/javascript" src="../../Common/Scripts/jquery.history.js"></script><%-- galleriffic--%>
	<script type="text/javascript" src="../../Common/Scripts/jquery.galleriffic.js"></script><%-- galleriffic--%>
	<script type="text/javascript" src="../../Common/Scripts/jquery.opacityrollover.js"></script><%-- galleriffic--%>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Adm_CambioDispositivo.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfLinea" runat="server" />
    <asp:HiddenField ID="hdfGaleria" runat="server" />
    <asp:HiddenField ID="hdfListaUbi" runat="server" /> <%--agregado 04-09-2013--%>
    <div id="dvCargando" class="dvCargando"></div>
    <div id="divSeguridad" runat="server" style="display:none;">
        <div>
            <table>
                <tr>
                    <td>
                        Usuario:
                    </td>
                    <td>
                        <asp:Label ID="lblEmpleado" runat="server" Text=""></asp:Label>
                        <asp:TextBox ID="txtEmpleado" runat="server" Width="200px"></asp:TextBox>
                        <asp:HiddenField ID="hdfCodEmpleado" runat="server" />
                    </td>
                </tr>
            </table>
        </div>
        <div>
            <table>
                <tr>
                    <td>
                        <asp:Image ID="imgLogoSeguridad" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Seguridad.png"/>
                    </td>
                    <td>
                        Ingrese su numero de celular:
                    </td>
                    <td>
                        <asp:TextBox ID="txtNumero" runat="server" Width="100px"></asp:TextBox>
                    </td>
                    <td>
                        <div id="btnIngresar" class="btnNormal">
                            <asp:Image ID="imgIngresar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Ingresar.gif"/>
                            <a>Ingresar</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                    </td>
                    <td>
                        <asp:Label ID="lblMensaje" runat="server" Text="" ForeColor="Red" Font-Bold="true"></asp:Label>                        
                    </td>
                    <td>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    
	<div id="container" runat="server">
		<h2>Seleccione el modelo de su gusto</h2>

		<!-- Start Advanced Gallery Html Containers -->				
		<div class="navigation-container">
			<div id="thumbs" class="navigation">
				<a class="pageLink prev" style="visibility: hidden;" href="#" title="Pagina Anterior"></a>
					<ul id="ulGaleria" runat="server" class="thumbs noscript">

				    </ul>
				<a class="pageLink next" style="visibility: hidden;" href="#" title="Siguiente pagina"></a>
			</div>
		</div>
		<div class="content">
			<div class="slideshow-container">
				<div id="controls" class="controls"></div>
				<div id="loading" class="loader"></div>
				<div id="slideshow" class="slideshow"></div>
			</div>
			<div id="caption" class="caption-container">
				<div class="photo-index"></div>
			</div>
		</div>
		<!-- End Gallery Html Containers -->
		<div style="clear: both;"></div>
	</div>

    <div id="divEnvio" runat="server">
        <table>
            <tr>
                <td>
                    Enviar solicitud de cambio de equipo con el equipo visualizado
                </td>
                <td>
                    <div id="btnEnviarSolicitud" class="btnNormal">
                        <asp:Image ID="imgEnviarSolicitud" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Enviar.gif"/>
                        <a>Enviar</a>
                    </div>


                    <div id="btnCancelar" class="btnNormal">
                        <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Cancelar.png"/>
                        <a>Cancelar</a>
                    </div>

                    
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
