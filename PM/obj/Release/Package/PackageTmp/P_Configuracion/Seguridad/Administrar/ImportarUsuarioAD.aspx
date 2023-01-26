<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Configuracion_Seguridad_Administrar_ImportarUsuarioAD"
    CodeBehind="ImportarUsuarioAD.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-ES.min.js"
        type="text/javascript"></script>
    <link type="text/css" rel="stylesheet" href="../../../Common/Styles/KendoUI/kendo.common.min.css" />
    <link type="text/css" rel="stylesheet" href="../../../Common/Styles/KendoUI/kendo.uniform.min.css" />
    <link type="text/css" rel="stylesheet" href="../../../Common/Styles/KendoUI/kendo.common.min.css" />
    <link type="text/css" rel="stylesheet" href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" />
    <script type="text/javascript" src="../../../Common/Scripts/jquery.uniform.min.js"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>
    <script src="ImportarUsuarioAD.js" type="text/javascript"></script>
    <style>
        .ui-jqgrid .ui-jqgrid-bdiv
        {
            position: relative;
            margin: 0em;
            padding: 0; /*overflow: auto;*/
            overflow-x: hidden;
            overflow-y: auto;
            text-align: left;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <center>
        <cc1:TabJQ ID="tabOpciones" runat="server" CssClass="tabs" Style="margin: 0px; padding: 0px;
            width: 955px">
            <cc1:ContenedorTabJQ ID="tabAD" Titulo="Directorio Activo" CssClass="dvTabContenido">
                <!-- ============================================================================================
                DIRECTORIO ACTIVO
            ============================================================================================ -->
                <div>
                    <table border="0" style="margin: 10px; padding: 10px;">
                        <tr>
                            <td colspan="2">
                                <span style="font-size: 14px;"><b>Importar Usuarios desde el Directorio Activo:</b></span>
                            </td>
                        </tr>
                        <tr height="10px">
                            <td colspan="2">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="width: 100px;">
                                Directorio Origen:
                            </td>
                            <td style="width: 800px;">
                                <input type="text" id="txtDirectorioOrigen" runat="server" style="width: 300px" readonly="readonly" />
                            </td>
                        </tr>
                        <tr>
                            <td align="right" style="width: 100px;">
                            </td>
                            <td>
                                <div id="btnMostrarUsuarios" class="btnNormal">
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Organizacion/empleado.ico"
                                                    Width="16px" />
                                            </td>
                                            <td>
                                                &nbsp;<a id="abtnGuardar">Mostrar Usuarios</a>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr height="10px">
                            <td colspan="2">
                            </td>
                        </tr>
                        <tr>
                            <td align="right">
                            </td>
                            <td style="width: 800px;" id="tdUsuarios">
                                <table id="tblCampo">
                                </table>
                                <br />
                                <div id="divImportarUsuarios" class="btnNormal">
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <asp:Image ID="Image4" runat="server" ImageUrl="~/Common/Images/Mantenimiento/import.png"
                                                    Width="16px" />
                                            </td>
                                            <td>
                                                &nbsp;<a id="a1">Importar Usuarios Seleccionados</a>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="divCredencial" style="display: none;">
                    <table width="100%" border="0" style="width: 310px;">
                        <tr>
                            <td align="right">
                                Usuario:
                            </td>
                            <td>
                                <asp:TextBox ID="txtUsuario" runat="server" Width="200px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td align="right">
                                Contraseña:
                            </td>
                            <td>
                                <asp:TextBox ID="txtPassword" TextMode="Password" runat="server" Width="200px"></asp:TextBox>
                            </td>
                        </tr>
                        <tr height="10px">
                            <td colspan="2">
                            </td>
                        </tr>
                        <tr>
                            <td align="center" colspan="2">
                                <div id="btnAceptarCredencial" class="btnNormal">
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Seguridad.png"
                                                    Width="16px" />
                                            </td>
                                            <td>
                                                &nbsp;<a>Aceptar</a>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div id="btnCerrarCredencial" class="btnNormal">
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Cancelar.png"
                                                    Width="16px" />
                                            </td>
                                            <td>
                                                &nbsp;<a>Cerrar</a>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="divCargando" style="display: none;">
                    <table width="100%" border="0">
                        <tr>
                            <td align="center">
                                <asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Cargando.gif" />
                            </td>
                        </tr>
                    </table>
                </div>
            </cc1:ContenedorTabJQ>
            <%--<cc1:ContenedorTabJQ ID="tabUsu" Titulo="Excel" CssClass="dvTabContenido" Height="100%" Visible="false">
            <iframe id="ifrCargaUsuario" frameborder="0" style="padding: 0px; margin: 0px;" width="100%" height="100%"></iframe>
        </cc1:ContenedorTabJQ>--%>
        </cc1:TabJQ>
    </center>
    </form>
</body>
</html>
