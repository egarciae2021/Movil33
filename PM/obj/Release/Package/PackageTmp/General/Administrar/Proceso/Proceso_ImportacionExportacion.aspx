<%@ Page Language="VB" AutoEventWireup="false"
    Inherits="General_Administrar_Proceso_Proceso_ImportacionExportacion" Codebehind="Proceso_ImportacionExportacion.aspx.vb" %>

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
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.autocomplete.js" type="text/javascript"></script>
    <%--<script src="../../../Common/Scripts/jquery.fileupload.js" type="text/javascript"></script>--%>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Proceso_ImportacionExportacion.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfEntidad" runat="server" />
    <asp:HiddenField ID="hdfTabla" runat="server" />
    <asp:HiddenField ID="hdfPlantilla" runat="server" />
    <asp:HiddenField ID="hdfContador" runat="server" />
    <asp:HiddenField ID="hdfLongRuta" runat="server" />
    <asp:HiddenField ID="hdfRuta" runat="server" />
    <div id="dvCargando" class="dvCargando">
    </div>
    <div id="PanelPlantilla">
        <table>
            <tr>
                <td>
                    <asp:Label ID="lblTitulo" Text="Listado de Plantillas por Entidad" runat="server">
                    </asp:Label>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:RadioButtonList ID="rdblPlantillas" CssClass="radioLista" runat="server">
                    </asp:RadioButtonList>
                </td>
            </tr>
            <tr>
                <td>
                    <div style="text-align: left;">
                        <div id="btnContinuar" class="btnNormal">
                            <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Accesos/ContinuarProceso.png" />
                            <a>Continuar Proceso</a>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <br />
    <div id="PanelImportacion">
        <div>
            <table>
                <tr>
                    <td>
                        <table>
                            <tr>
                                <td colspan="2">
                                    <div id="tituloproceso" runat="server">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:FileUpload ID="flUpload" runat="server" />
                                </td>
                                <td>
                                    &nbsp;&nbsp;&nbsp;
                                    <asp:Button ID="btnCargar" runat="server" Text="Cargar" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        <br />
    </div>
    </form>
</body>
</html>
