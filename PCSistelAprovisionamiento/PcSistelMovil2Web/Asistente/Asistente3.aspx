<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Asistente3.aspx.cs" Inherits="PcSistelMovil2Web.Asistente3" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Styles/Sitio.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/JqueryThemeRoller/redmond/jquery-ui-1.8.16.custom.css"
        rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/json2.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../Common/Styles/Principal2.css" rel="stylesheet" type="text/css" />


    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Asistente3.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="dvMsgAlertaExterna" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <div id="dvContenidoAlertaExterna">
        </div>
    </div>
    <div>
        <div id="MenuInstalacion2" style="margin-left: 10px; margin-right: auto; margin-top: 10px;
            margin-right: 10px; margin-bottom: auto; width: auto;">
            <div class="Contenidomenu">
                <table class="tblasistente">
                    <tr>
                        <td colspan="3">
                            <label style="color: #084B8A">
                                Contactos Autorizados</label>
                        </td>
                    </tr>
                    <tr style="display: none;">
                        <td width="150px;">
                            <asp:Label ID="Label13" runat="server" Text="Id Titular :"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="idtit" runat="server" CssClass="form-control" ReadOnly="true"></asp:TextBox>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label ID="Label1" runat="server" Text="Nombre :"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="nombretit" runat="server" CssClass="" ReadOnly="true"></asp:TextBox>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label ID="Label2" runat="server" Text="Apellido :"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="apetit" runat="server" CssClass="form-control" ReadOnly="true"></asp:TextBox>
                        </td>
                        <td>
                        </td>
                    </tr>
                         <tr>
                        <td>
                            <asp:Label ID="Label6" runat="server" Text="Correo :"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtcorreo" runat="server" CssClass="form-control" ReadOnly="true"></asp:TextBox>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label ID="Label3" runat="server" Text="Usuario :"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="usuatit" runat="server" CssClass="form-control"></asp:TextBox>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr runat="server" style="display:none">
                        <td>
                            <asp:Label ID="Label4" runat="server" Text="Contraseña :"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="passtit" runat="server" CssClass="form-control"></asp:TextBox>
                        </td>
                        <td>
                        </td>
                    </tr>
                </table>
                <br />
                <div>
                 <asp:Label ID="Label5" runat="server" Font-Bold="true" Text="(Doble click para actualizar usuario)"></asp:Label>
                    <div id="btnADD" class="btnNormal">
                        <img src="../Common/images/Mantenimiento/add_16x16.gif" /></div>
                    <div id="btnDel" class="btnNormal" style="display:none;">
                        <img src="../Common/images/Mantenimiento/delete_16x16.gif" /></div>
                       
                    <br />
                    <table id="grid">
                    </table>
                    <div id="pgrid">
                    </div>
                </div>
                <br />
                <div id="btnatras" class="btnNormal">
                    <a>Atrás</a>
                    <img src="../Common/images/Mantenimiento/flecha_antes.png" /></div>
                <div id="btnsiguiente" class="btnNormal">
                    <a>Siguiente</a>
                    <img src="../Common/images/Mantenimiento/flecha_despues.png" /></div>
                <div id="btcancelar" class="btnNormal">
                    <a>Cancelar</a>
                    <img src="../Common/images/Mantenimiento/btnCancel.png" /></div>
                <%--     <button id="btnatrass" type="button" class="btn btn-primary">
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
