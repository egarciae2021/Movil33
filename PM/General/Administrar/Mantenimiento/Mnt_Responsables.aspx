<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Mnt_Responsables.aspx.vb" Inherits=".Mnt_Responsables" %>

<%@ Register TagPrefix="uc" TagName="BusquedaPrincipal" Src="../../../Common/Controles/BusquedaPrincipal.ascx" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Mnt_Responsables.js")%>" type="text/javascript"></script>
    <link href="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Mnt_Responsables.css")%>" type="text/css" rel="Stylesheet" />
    <form id="form1" runat="server">

        <table border="0" style="width: 100%;">
            <tr>
                <td style="width: 360px;" valign="top">
                    <table>
                        <tr>
                            <td>
                                <table border="0" width="100%">
                                    <tr>
                                        <td>Nombre</td>
                                        <td>
                                            <input type="text" id="txtBuscar" style="width: 120px; padding: 4px; border: 1px solid rgb(221, 221, 221);"
                                                maxlength="35" class="ui-corner-all" />
                                        </td>
                                        <td>(Presione Enter)</td>
                                        <td style="width: 30px;">
                                            <div id="btnAgregarEmpleado" style="height: 28px; width: 30px;" class="btnNormal" runat="server">
                                                <asp:Image ID="imgGuardar" Style="margin-top: 0px; margin-left: -4px;" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                            </div>
                                            <div id="dvContenedorEmpleado" style="display: none;">
                                                <uc:BusquedaPrincipal ID="bpEmpleado" runat="server" Ancho="358" />
                                            </div>
                                        </td>
                                        <td style="width: 30px; text-align: right;">
                                            <div id="btnExportarResponsables" style="height: 28px; width: 30px;" class="btnNormal" runat="server">
                                                <asp:Image ID="Image1" Style="margin-top: 0px; margin-left: -4px;" runat="server" 
                                                    ImageUrl="~/Common/Images/Mantenimiento/Excel16.png"  Width="16px" />
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td valign="top">
                                <div id="dvResponsables" class="dvPanel ui-widget-content ui-corner-all"
                                    style="width: 330px; height: 505px; overflow: scroll; padding: 10px; background-image: none;">
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
                <td valign="top">

                    <table id="tbDetalleEmpleado" style="width: 95%; display: none;" border="0">
                        <tr>
                            <td colspan="2">
                                <div id="lblTituloEmpleado"></div>
                                <div style="width: 20px; height: 20px; position: absolute; top: 18px; right: 15px;">
                                    <span id="ActualizarGeneral" style="border: 1px solid skyblue; border-radius: 3px; display: none;" class="ui-icon ui-icon-refresh"></span>
                                </div>
                                <div style="width: 220px; height: 20px; position: absolute; top: 12px; right: 7px; visibility:hidden;">
                                    <table border="0" style="width: 100%;">
                                        <tr>
                                            <td style="font-weight: bold;">Tipo Responsable:</td>
                                            <td>
                                                <select id="cboTipoResponsable">
                                                    <option value="">(Seleccione)</option>
                                                    <option value="Enlace">Enlace</option>
                                                    <option value="Autorizador">Autorizador</option>
                                                    <option value="Ambos">Ambos</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="SubTituloPagina">DATOS</div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" id="tdDatosEmpleado"></td>
                        </tr>
                        <tr style="height: 15px;"></tr>
                        <tr>
                            <td>
                                <div class="SubTituloPagina">RESPONSABLE DE ...</div>
                            </td>
                            <td style="text-align: right; width: 40px;" valign="top">
                                <div id="btnAgregarOrganizacion" style="height: 28px; width: 30px;" class="btnNormal" runat="server">
                                    <asp:Image ID="imgAgregarOrganizacion" Style="margin-top: 0px; margin-left: -4px;" runat="server"
                                        ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" valign="top">
                                <div id="dvOrganizacion" class="dvPanel ui-widget-content ui-corner-all"
                                    style="width: 330px; height: 50px; overflow: scroll; padding: 10px; background-image: none;">
                                </div>
                            </td>
                        </tr>
                    </table>

                </td>
            </tr>
        </table>


        <div id="dvArea" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifArea" width="910" height="470" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
        </div>
        <div id="dvArea2" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifArea2" width="745" height="470" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
        </div>

        <div id="dvOrga" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifOrga" width="745" height="470" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
        </div>

    </form>
</body>
</html>
