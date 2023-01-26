<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MainAsistente.aspx.cs"
    Inherits="PcSistelMovil2Web.Asistente.MainAsistente" %>

<%@ Import Namespace="Web.GeneralMantenimiento" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Styles/Principal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jquery-1.7.1.js" type="text/javascript"></script>
    <link href="../Scripts/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <link href="../Styles/Sitio.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>

</head>
<body>
    <form id="form1" runat="server">
        <div id="dvMsgAlertaExterna" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <div id="dvContenidoAlertaExterna">
            </div>
        </div>
        <asp:HiddenField ID="hdfIdSolicitud" runat="server" />
        <div id="MainAsistente">
            <div id="MenuInstalacion" style="margin-left: 0px; margin-right: 0px; width: auto; margin-top: 0px; margin-bottom: 0px; height: 100%; padding: 0px;">
                <div id="Cabecera" style="width: 100%; height: 30px; display: none;">
                    <span style="float: left; margin-left: 10px; margin-top: 5px; margin-bottom: auto;">
                        <asp:Label ID="lblAsist" runat="server" Text="Asistente de Instalación" CssClass="label-default"
                            ForeColor="White" Font-Bold="True" Font-Names="Arial"></asp:Label>
                    </span>
                </div>
                <div id="MenuAsistenteizquierda" style="float: left;">
                    <br />
                    <div style="text-align: center;">
                        <asp:Label ID="Label1" runat="server" Text="Asistente de Aprovisionamiento" CssClass="lblMenu tituloPasos"></asp:Label>
                    </div>
                    <br />
                    <br />
                    <div id="divEmpresa" class="dvDetalleItem">
                        <div class="marca">
                            <asp:Label ID="Label2" runat="server" Text="1. Datos Empresa" CssClass="lblMenu"></asp:Label>
                            <img id="edit1" src="../Common/images/Mantenimiento/edit_16x16.gif" style="display: none;" />
                        </div>
                    </div>
                    <br />
                    <div id="DivContrato" class="dvDetalleItem">
                        <div class="marca">
                            <asp:Label ID="Label3" runat="server" Text="2. Información de Contrato" CssClass="lblMenu"></asp:Label>
                            <img id="edit2" src="../Common/images/Mantenimiento/edit_16x16.gif" style="display: none;" />
                        </div>
                    </div>
                    <br />
                    <div id="DivLicencia" class="dvDetalleItem">
                        <div class="marca">
                            <asp:Label ID="Label5" runat="server" Text="3. Información de Licencia y Dominio"
                                CssClass="lblMenu"></asp:Label>
                            <img id="edit3" src="../Common/images/Mantenimiento/edit_16x16.gif" style="display: none;" />
                        </div>
                    </div>
                    <br />
                    <div id="DivContacto" class="dvDetalleItem">
                        <div class="marca">
                            <asp:Label ID="Label4" runat="server" Text="4. Contactos Autorizados" CssClass="lblMenu"></asp:Label>
                            <img id="edit4" src="../Common/images/Mantenimiento/edit_16x16.gif" style="display: none;" />
                        </div>
                    </div>
                    <br />
                    <div id="DivSrvBD" class="dvDetalleItem">
                        <div class="marca">
                            <asp:Label ID="Label8" runat="server" Text="5. Servidor de BD" CssClass="lblMenu"></asp:Label>
                            <img id="edit5" src="../Common/images/Mantenimiento/edit_16x16.gif" style="display: none;" />
                        </div>
                    </div>
                    <br />
                    <div id="divSrvAPP" class="dvDetalleItem">
                        <div class="marca">
                            <asp:Label ID="Label9" runat="server" Text="6. Servidor de Aplicaciones" CssClass="lblMenu"></asp:Label>
                            <img id="edit6" src="../Common/images/Mantenimiento/edit_16x16.gif" style="display: none;" />
                        </div>
                    </div>
                    <br />
                    <div id="DivConsolidado" class="dvDetalleItem">
                        <div class="marca">
                            <asp:Label ID="Label6" runat="server" Text="7. Consolidado de Datos" CssClass="lblMenu"></asp:Label>
                            <img id="edit7" src="../Common/images/Mantenimiento/edit_16x16.gif" style="display: none;" />
                        </div>
                    </div>
                    <br />
                </div>
                <div id="MenuAsistenderecha" style="float: left; height: 100%; background: red important!;">
                    <iframe id="ifTemaAsistente" style="width: 100%; height: 100%; vertical-align: top; padding: 0px; margin: 0px;"
                        frameborder="0"></iframe>
                </div>
            </div>
        </div>
        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("MainAsistente.js") %>" type="text/javascript"></script>
    </form>
</body>
</html>
