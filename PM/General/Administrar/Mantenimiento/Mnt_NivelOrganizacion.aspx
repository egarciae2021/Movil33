<%@ Page Language="VB" AutoEventWireup="false" Inherits="General_Administrar_Mantenimiento_Mnt_NivelOrganizacion" Codebehind="Mnt_NivelOrganizacion.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
	<script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Mnt_NivelOrganizacion.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server" enctype="multipart/form-data">
    <asp:HiddenField ID="hdfParametros" runat="server" Value=""/>
    <asp:HiddenField ID="hdfValores" runat="server" />
    <asp:HiddenField ID="hdfEstado" runat="server" />
    <asp:HiddenField runat="server" ID="hdfArchivo" Value="0" />
    <asp:HiddenField runat="server" ID="hdfCodigo" Value="0" />
    <asp:HiddenField ID="hdfEstadoNiv" runat="server" />

    <asp:HiddenField ID="hdfImageUrl" runat="server" /> <%--agregado 20-09-2013 wapumayta --%>
    <asp:HiddenField ID="hdfLoad" runat="server" /> <%--agregado 20-09-2013 wapumayta --%>

    <div id="dvCargando" class="dvCargando"></div>
    <div class="dvPanel" style="overflow: auto;">
        <table width="100%">
            <tr>
                <td class="TituloMant">
                    Nombre
                </td>
                <td class="ValorMant">
                    <asp:TextBox ID="txtNombre" runat="server" Width="300px" MaxLength="35"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="TituloMant">
                    Ícono
                </td>
                <td class="ValorMant">
                    <%--<asp:Image runat="server" ID="imgIcono" Visible="false" Height="40px" Width="40px"/>
                    <asp:FileUpload runat="server" ID="flUpload" Visible="false" />
                    <asp:RequiredFieldValidator runat="server" ID="rfv1" ControlToValidate="flUpload" Text="*"></asp:RequiredFieldValidator>
                &nbsp;<asp:Button ID="btnsubir" runat="server" Text="Subir" />
                &nbsp;<asp:Button ID="btneliminar" runat="server" Text="Eliminar" Visible ="false" />--%>
                    <iframe id="ifCargaIcono" frameborder="0" style="padding: 0px; margin: 0px;" width="400px" height="70px" ></iframe>
                </td>
            </tr>
            <tr>
                <td><asp:Label runat="server" ID="lblmensaje"></asp:Label></td>
            </tr>
            <tr>
               <%-- <td class="TituloMant">
                    Estado
                </td>--%>
                <td class="ValorMant">
                    <asp:CheckBox Text="Activo" ID="chActivo" runat="server" MaxLength="50" 
                        Width="199px" AutoPostBack="True" Visible=false></asp:CheckBox>
                </td>
            </tr>
        </table>
    </div><br />
    <div style="height:10px;"></div>
    <div style="margin-top:2px;">
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
