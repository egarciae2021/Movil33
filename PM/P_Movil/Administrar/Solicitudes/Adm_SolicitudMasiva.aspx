<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Adm_SolicitudMasiva.aspx.vb" Inherits=".Adm_SolicitudMasiva" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Content/css/shared/nifty.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="jexcel/jquery.jexcel.min.css" type="text/css" />
    <link href="jexcel/jquery.jcalendar.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="jexcel/jquery.jdropdown.min.css" type="text/css" />
    <link rel="stylesheet" href="jexcel/spectrum.min.css" type="text/css" />
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Material+Icons" />
    <link href="../../../Content/css/shared/font-awesome.min.css" rel="stylesheet" />
</head>
<body>
    <link href="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Adm_SolicitudMasiva.css")%>" rel="stylesheet" />
    <div id="my"></div>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("jexcel/jquery.jexcel.js")%>" type="text/javascript"></script>
    <script src="jexcel/jquery.jcalendar.js"></script>
    <script src="jexcel/jquery.jdropdown.js"></script>
    <script src="jexcel/spectrum.min.js"></script>

    <script>
        javascript: (function () {
            if ($.browser.msie || $.browser.version == "11.0") {
                var el = document.createElement("script");
                el.src = "../../../Content/js/shared/bluebird.min.js";
                document.body.appendChild(el);
            }
        })();
    </script>

    <div id="dvMensajeDefault" style="display: none;">
       <h3> Debe ingresar datos básicos como: Cuentas, Planes, Modelos.</h3>
    </div>

    <form id="form1" runat="server">
        <div id="dvGenerarOS" style="display: none;">
            <table>
                <tr>
                    <td style="width: 130px;">Nro. Orden de Servicio</td>
                    <td>
                        <asp:TextBox ID="txtNroOrdenServicio" runat="server" Width="100px"></asp:TextBox>
                        <span id="lblNroOrdenServicioAnterior" style="font-family: Tahoma; color: darkblue; font-size: 11px;"></span>
                    </td>
                </tr>
                <tr>
                    <td>Descripción</td>
                    <td>
                        <asp:TextBox ID="txtDescripcionOS" runat="server" Width="460px" TextMode="MultiLine"></asp:TextBox></td>
                </tr>
                <tr>
                    <td>Administrador Contrato</td>
                    <td>
                        <asp:TextBox ID="txtAdministradorContrato" runat="server" Width="460px"></asp:TextBox></td>
                </tr>
                <tr>
                    <td>Cargo Administrador</td>
                    <td>
                        <asp:TextBox ID="txtCargoAdministradorContrato" runat="server" Width="460px"></asp:TextBox></td>
                </tr>
            </table>
        </div>


        <div id="dvGenerarResguardo" style="display: none;">
            <table border="0" width="100%">
                <tr>
                    <td style="width: 100px; text-align: right;">Factura:</td>
                    <td>
                        <asp:TextBox ID="txtFactura" runat="server" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Nro. Consecutivo:</td>
                    <td>
                        <asp:TextBox ID="txtNroConsecutivo" runat="server" Width="100px"></asp:TextBox>
                        <span id="lblNroConsecutivoAnterior" style="font-family: Tahoma; color: darkblue; font-size: 11px;"></span>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Tipo Servicio:</td>
                    <td>
                        <asp:DropDownList ID="ddlTipoServicio" Width="100px" runat="server">
                            <asp:ListItem Value="1" Text="CELULAR"></asp:ListItem>
                            <asp:ListItem Value="2" Text="TABLET"></asp:ListItem>
                            <asp:ListItem Value="3" Text="BAM"></asp:ListItem>
                            <asp:ListItem Value="4" Text="CHIP"></asp:ListItem>
                            <asp:ListItem Value="5" Text="BLACKBERRY"></asp:ListItem>
                            <asp:ListItem Value="6" Text="RADIOLOCALIZACIÓN"></asp:ListItem>
                            <asp:ListItem Value="7" Text="ROAMING"></asp:ListItem>
                        </asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Costo (S/IVA):</td>
                    <td>
                        <asp:TextBox ID="txtCosto" runat="server" Style="text-align: right;" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Marca:</td>
                    <td>
                        <asp:TextBox ID="txtMarca" runat="server" Enabled="false" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Modelo:</td>
                    <td>
                        <asp:TextBox ID="txtModelo" runat="server" Enabled="false" Width="100px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Nro Servicio:</td>
                    <td>
                        <asp:TextBox ID="txtNroServicio" runat="server" Enabled="false" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">IMEI:</td>
                    <td>
                        <asp:TextBox ID="txtIMEI" runat="server" Enabled="false" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">SIM:</td>
                    <td>
                        <asp:TextBox ID="txtSIM" runat="server" Width="100px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">PIN:</td>
                    <td>
                        <asp:TextBox ID="txtPIN" runat="server" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;"></td>
                    <td></td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;"></td>
                    <td></td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Accesorios:</td>
                    <td>
                        <asp:CheckBoxList ID="chkAccesorios" runat="server">
                            <asp:ListItem Value="HAND" Text="HAND SET"></asp:ListItem>
                            <asp:ListItem Value="BATE" Text="BATERIA LITIO"></asp:ListItem>
                            <asp:ListItem Value="ADAP" Text="ADAPTADOR CA"></asp:ListItem>
                            <asp:ListItem Value="AUDI" Text="AUDIFONO"></asp:ListItem>
                            <asp:ListItem Value="USB" Text="CABLE USB"></asp:ListItem>
                            <asp:ListItem Value="MANU" Text="MANUAL OPERACIÓN"></asp:ListItem>
                        </asp:CheckBoxList>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;"></td>
                    <td></td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;"></td>
                    <td></td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Observaciones:</td>
                    <td colspan="7">
                        <asp:TextBox ID="txtObservaciones" runat="server" Height="50px" TextMode="MultiLine" Width="755px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Administrador Contrato:</td>
                    <td colspan="7">
                        <asp:TextBox ID="txtAdministradorContratoVale" runat="server" Width="755px"></asp:TextBox>
                    </td>
                </tr>
            </table>
        </div>

    </form>

    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Adm_SolicitudMasivaGrilla.js")%>" type="text/javascript"></script>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Adm_SolicitudMasiva.js")%>" type="text/javascript"></script>
    <div id="dvMsgAlerta" style="display: none;">
        <div id="dvContenidoAlerta"></div>
    </div>
    <iframe id="ifReporteFormato" frameborder="0" style="margin: 0px; padding: 0px; display: none;" width="100%" height="470px"></iframe>

</body>
</html>
