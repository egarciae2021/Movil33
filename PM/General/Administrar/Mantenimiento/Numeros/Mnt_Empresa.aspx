<%@ Page Language="VB" AutoEventWireup="false" Inherits="General_Administrar_Mantenimiento_Numeros_Mnt_Empresa" Codebehind="Mnt_Empresa.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="../../../../Common/Scripts/jquery-1.7.2.js"></script>
	<script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
	<script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
	<script type="text/javascript" src="../../../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script src="../../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Mnt_Empresa.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfCod" runat="server" />
    <div id="dvCargando" class="dvCargando"></div>
    <div class="dvPanel" style="overflow: auto;">
        <table width="100%">
            <tr>
                <td> 
                    <table width="100%">
                        <tr>
                            <td class="tdEtiqueta">
                                <asp:Label ID="lblCodigo" runat="server" Text="Código:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtCodigo" runat="server" Width="150px" MaxLength="15"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblRazonSocial" runat="server" Text="Razón social:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtRazonSocial" runat="server" Width="300px" MaxLength="35" onChange="validarEspaciosEnBlancoAlInicio()"></asp:TextBox>
                            </td>
                        </tr>
                        <tr id="trEstado" runat="server">
                            <td class="tdEtiqueta">
                                <asp:Label ID="lblActivo" runat="server" Text="Activo"></asp:Label>                                        
                            </td>
                            <td>
                                <asp:CheckBox ID="chkEstado" runat="server" Enabled="False" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    <br />
    <br />
    <div style="text-align:left;">
        <div id="btnGuardar" class="btnNormal">
                    <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                    <a>Guardar</a>
        </div>
        <div id="btnCerrar" class="btnNormal">
            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
            <a>Cerrar</a>
        </div>
    </div>
    </form>
</body>
</html>
