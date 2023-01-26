<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_SolicitudReparacion" Codebehind="Adm_SolicitudReparacion.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
	<script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Adm_SolicitudReparacion.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
        <div class="ui-state-default ui-corner-all" style="padding:6px;">
            <span class="ui-icon ui-icon-person" style="float:left; margin:-2px 5px 0 0;"></span>
            Usuario
        </div>
        <table>
            <tr>
                <td>
                    <asp:Label ID="lblEmpleadoTitulo" runat="server" Text="Empleado"></asp:Label>
                </td>
                <td>
                    <asp:Label ID="lblEmpleado" runat="server" Text="" Visible="False"></asp:Label>
                    <asp:TextBox ID="txtEmpleado" runat="server" Width="300px"></asp:TextBox>
                    <asp:HiddenField ID="hdfCodEmpleado" runat="server" />                    
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="Label3" runat="server" Text="Centro de costo"></asp:Label>
                </td>
                <td>
                    <asp:Label ID="lblCentroCosto" runat="server" Text=""></asp:Label>             
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="Label5" runat="server" Text="Área"></asp:Label>
                </td>
                <td>
                    <asp:Label ID="lblArea" runat="server" Text=""></asp:Label>             
                </td>
            </tr>
        </table>
        <div class="ui-state-default ui-corner-all" style="padding:6px;">
            <span class="ui-icon ui-icon-circle-arrow-s" style="float:left; margin:-2px 5px 0 0;"></span>
            Equipos asociados
        </div>
        <table>
            <tr>
                <td valign="top">                
                    <div style="overflow:auto; height:300px; width:375px; margin:0px; padding:0px; text-align:center;" class="dvPanel">
                        <asp:Label ID="lblMensajeDispositivos" runat="server" Text="" Font-Bold="true" Font-Size="Large"></asp:Label>
                        <table id="tbDispositivos"></table>
                    </div>
                </td>
                <td>
                    <div id="dvDetalleDispositivo" class="dvPanel" style="padding: 3px; display:none; width: 450px;">
                        <iframe id="ifDetalleEquipo" height="300px" width="450px" frameborder="0"></iframe>
                    </div>
                </td>
            </tr>
        </table>
        <div id="dvGuardarSolicitud" style="display:none;">
            <asp:Label ID="Label1" runat="server" Text="Descripción del problema"></asp:Label>
            <br />
            <asp:TextBox ID="txtDescripcion" runat="server" TextMode="MultiLine" Width="370px" Height="100px" MaxLength="250"></asp:TextBox>     
            <br />       
            <div id="btnGuardar" class="btnNormal">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                <a>Guardar</a>
            </div>
        </div>
    </form>
</body>
</html>




