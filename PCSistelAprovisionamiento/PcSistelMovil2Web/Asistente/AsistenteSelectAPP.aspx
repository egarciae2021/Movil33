<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AsistenteSelectAPP.aspx.cs"
    Inherits="PcSistelMovil2Web.Asistente.AsistenteSelectAPP" %>

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
    <script src="../Common/Scripts/FusionCharts/FusionCharts.js" type="text/javascript"></script>
    <script src="../Common/Scripts/FusionCharts/FusionCharts.jqueryplugin.js" type="text/javascript"></script>
    <script src="../Common/Scripts/FusionCharts/FusionCharts.HC.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="AsistenteSelectAPP.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfServerAdmin" runat="server" Value = "0" />
    <asp:HiddenField ID="hdfServerPedidos" runat="server" Value = "0" />
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
                                Selección de Servidor Aplicaciones</label>
                        </td>
                    </tr>
                </table>
                <asp:Label ID="Label5" runat="server" Text="(click para Seleccionar Servidor)"></asp:Label>
                <table style="width: 100%">
                  <tr>
                    <td>
                      <table style="width: 50%; text-align: left;">
                        <tr>
                            <td>
                                <div id="chartcontainer" class="" style="padding: 5px 0px 0px 0px;">
                                </div>
                            </td>
                        </tr>
                      </table>
                      <asp:Label ID="Label1" runat="server" Text="Seleccione Instancia del Admin :"></asp:Label>
                      <asp:DropDownList ID="ddlInstanciaAPP" runat="server" CssClass="">
                      </asp:DropDownList>
                    </td>

                    <td style="display: none;">
                      <table style="width: 50%;">
                        <tr>
                            <td>
                                <div id="chartcontainerWeb" class="" style="padding: 5px 0px 0px 0px;">
                                </div>
                            </td>
                        </tr>
                      </table>
                      <asp:Label ID="Label2" runat="server" Text="Seleccione Instancia de Pedido :"></asp:Label>
                      <asp:DropDownList ID="ddlInstanciaWEB" runat="server" CssClass="">
                      </asp:DropDownList>                    
                    </td>

                  </tr>
                </table>

                <%-- <asp:Label ID="Label1" runat="server" Text="Servidor seleccionado:   "></asp:Label>
                <asp:Label ID="lblInstancia" runat="server" Text="Ninguno" Font-Bold="True" 
                    ForeColor="#0066CC"></asp:Label>--%>

                <br />
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
            </div>
        </div>
    </div>
    </form>
</body>
</html>
