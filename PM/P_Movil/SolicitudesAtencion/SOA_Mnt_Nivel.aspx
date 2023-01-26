<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_SolicitudesAtencion_SOA_Mnt_Nivel" Codebehind="SOA_Mnt_Nivel.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="../../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.button.js"></script>
    <script src="../../Common/Scripts/jquery.cookie.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <script src="SOA_Mnt_Nivel.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfAdmin" runat="server" />
        <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
        <asp:HiddenField ID="hdfEmpleado" runat="server" />
        <asp:HiddenField ID="hdfIdTecnico" runat="server" />
        <asp:HiddenField ID="hdfIdNivel" runat="server" />

        <div class="dvPanel" >

            <table >
<%--                <tr>
                    <td align="center" colspan="2" style="font-weight:bold; font-size:10pt;" >Nivel</td>
                </tr>--%>
                <tr>                    
                    <td>Nombre</td>                
                    <td><asp:TextBox ID="txtNombre" runat="server" Width="200" MaxLength="50"></asp:TextBox></td>
                </tr>
                <tr>                    
                    <td>Descripción</td>                
                    <td><asp:TextBox ID="txtDescripcion" runat="server" Width="300" MaxLength="200"></asp:TextBox></td>
                </tr>
                <tr>                    
                    <td>Orden</td>                
                    <td><asp:TextBox ID="txtOrden" runat="server" Width="100" MaxLength="3" style="text-align:right;"></asp:TextBox></td>
                </tr>
<%--                <tr>
                    <td align="center" colspan="2"  ><div id="btnGuardar">Guardar</div></td>
                </tr>--%>
                <tr id="EsChkActivar">                    
                    <td >Activo</td>                                    
                    <td><asp:CheckBox ID="chkActivo" runat="server" /></td>
                </tr>
            </table>
            

        </div>

            <div style="text-align:left; padding-top: 12px">
                <div id="btnGuardar" class="btnNormal">
                    <asp:Image ID="imgGuardarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                    <a>Guardar</a>
                </div>
                <div id="btnCerrar" class="btnNormal">
                    <asp:Image ID="imgCerrarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                    <a>Cerrar</a>
                </div>
            </div> 
    </form>
</body>
</html>
