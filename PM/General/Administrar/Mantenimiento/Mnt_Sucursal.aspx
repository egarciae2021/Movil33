<%@ Page Language="VB" AutoEventWireup="false" Inherits="General_Administrar_Mantenimiento_Mnt_Sucursal" Codebehind="Mnt_Sucursal.aspx.vb" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqueryui/jquery.ui.autocomplete.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Mnt_Sucursal.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfCompania" runat="server" />
        <asp:HiddenField ID="hdfPais" runat="server" />
         <asp:HiddenField ID="hdfCiudad" runat="server" />
         <asp:HiddenField ID="hdfSucursal" runat="server" />
            <div class="dvPanel" style="overflow: auto;">
                <table width="100%">
                    <tr>
                        <td>                    
                            <table width="100%">
                                <tr>
                                    <td class="tdEtiqueta">                                        
                                        <asp:Label ID="lblCodigo" runat="server" Text="Código"></asp:Label>
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtCodigo" runat="server" Width="150px" MaxLength="15" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdEtiqueta">
                                        <asp:Label ID="lblNombre" runat="server" Text="Nombre"></asp:Label>                                        
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtNombre" runat="server" Width="300px" MaxLength="35" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdEtiqueta">
                                        Operador</td>
                                    <td>
                                        <asp:TextBox ID="txtOperador" runat="server" Width="300px" MaxLength="35" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdEtiqueta">
                                        País</td>
                                    <td>
                                        <asp:TextBox ID="txtPais" runat="server" Width="300px" MaxLength="35" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdEtiqueta">
                                        Ciudad</td>
                                    <td>
                                        <asp:TextBox ID="txtCiudad" runat="server" Width="300px" MaxLength="35" onChange="validarEspaciosEnBlancoAlInicio(this.id)"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr id="trEstado" runat="server">
                                    <td class="tdEtiqueta">
                                        <asp:Label ID="lblActivo" runat="server" Text="Activo"></asp:Label>                                        
                                    </td>
                                    <td>
                                        <asp:CheckBox ID="chkEstado" runat="server"/>
                                    </td>
                                </tr>                                                               
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            <br />
            <div class="dvAsignacion">
                <cc1:TabJQ ID="tbAsignacion" runat="server" CssClass="tabs" style="margin: 0px; padding: 0px;"></cc1:TabJQ>            
            </div>
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
