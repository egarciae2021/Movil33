<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Asistente4.aspx.cs" Inherits="PcSistelMovil2Web.Asistente4" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
        <link href="../Styles/Bootstrap/css/bootstrap3.css" rel="stylesheet" type="text/css" />

    <link href="../Styles/Sitio.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jquery-1.7.1.js" type="text/javascript"></script>
    <link href="../Scripts/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>

    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Asistente4.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
           <div id="dvMsgAlertaExterna" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <div id="dvContenidoAlertaExterna">
        </div>
    </div>
    <div>
    <div id="MenuInstalacion2" style="margin-left: 10px; margin-right: auto; margin-top: 10px; margin-right:10px; margin-bottom: auto; width: auto;">
            <div class="Contenidomenu" >
            <table class="tblasistente">
                <tr>
                    <td colspan="3">
                        <label style="color: #084B8A">
                            Información de Licencia y Servicio</label>
                    </td>
                </tr>
               <tr>
                    <td>
                        <label for="Tipolicencia">
                            Tipo Licencia:</label>
                    </td>
                    <td>
                        <asp:DropDownList ID="Tipolicencia" runat="server" CssClass="form-control">
                            <asp:ListItem Value="1">Básico</asp:ListItem>
                            <asp:ListItem Value="2">Estándar</asp:ListItem>
                            <asp:ListItem Value="3">Premium</asp:ListItem>
                        </asp:DropDownList>               
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="nombredominio">
                            Dominio:</label>
                    </td>
                    <td>
                     <asp:TextBox ID="nombredominio" runat="server" CssClass="form-control"></asp:TextBox>                      
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="nombreservapp">
                            Servidor APP:</label>
                    </td>
                    <td>
                        <asp:DropDownList ID="nombreservapp" runat="server" CssClass="form-control">
                            <asp:ListItem Value="1">Móvil</asp:ListItem>
                            <asp:ListItem Value="2">76</asp:ListItem>
                        </asp:DropDownList>               
                    </td>
                    <td>
                    </td>
                </tr>
                      <tr>
                    <td>
                        <label for="nombreservbd">
                            Servidor BD:</label>
                    </td>
                    <td>
                        <asp:DropDownList ID="nombreservbd" runat="server" CssClass="form-control">
                            <asp:ListItem Value="1">srvMóvil</asp:ListItem>
                            <asp:ListItem Value="2">srv76</asp:ListItem>
                        </asp:DropDownList>               
                    </td>
                    <td>
                    </td>
                </tr>
            </table>
            <br />
                    <div id="btnatras" class="btnNormal"><a>Atrás</a> <img src="../Common/images/Mantenimiento/flecha_antes.png" /></div>  
                    <div id="btnsiguiente" class="btnNormal"><a>Siguiente</a> <img src="../Common/images/Mantenimiento/flecha_despues.png" /></div>
                    <div id="btcancelar" class="btnNormal"><a>Cancelar</a> <img src="../Common/images/Mantenimiento/btnCancel.png" /></div> 

 <%--               <button id="btnatras" type="button" class="btn btn-primary">
                            Atrás</button>
                        <button id="btnsiguiente" type="button" class="btn btn-primary">
                            Siguiente</button>
                        <button id="btcancelar" type="button" class="btn btn-primary">
                            Cancelar</button>--%>
                </div>
        </div>
    </div>
    </form>
</body>
</html>
