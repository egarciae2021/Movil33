<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Configurar_Conf_DistribucionMinutosImportarExportar"
    CodeBehind="Conf_DistribucionMinutosImportarExportar.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="../../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jquery.MultiFile.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/Utilitario.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jquery.uniform.min.js"></script>
    <link type="text/css" rel="stylesheet" href="../../Common/Styles/Principal.css" />
    <link type="text/css" rel="stylesheet" href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" />
    <link type="text/css" rel="stylesheet" href="../../Common/Styles/KendoUI/kendo.common.min.css" />
    <link type="text/css" rel="stylesheet" href="../../Common/Styles/KendoUI/kendo.uniform.min.css" />
    <link type="text/css" rel="stylesheet" href="../../Common/Styles/KendoUI/kendo.common.min.css" />
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>
    <%--<script src="Adm_DistribucionMinutosImportarExportar.js" type="text/javascript"></script>--%>
    <script src="Conf_DistribucionMinutosImportarExportar.js" type="text/javascript"></script>
    <style>
        body
        {
            overflow-y: hidden !important;
        }
    </style>

    <%--<script type="text/javascript"></script>--%>
</head>
<body scroll="no">
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfArchivo" runat="server" />
    <asp:HiddenField ID="hdfValorIlimitado" runat="server" />
    <asp:HiddenField ID="hdfvcPeriodo" runat="server" />
    <asp:HiddenField ID="hdfvcCuenta" runat="server" />
    <asp:HiddenField ID="hdfvcModo" runat="server" />
    <asp:HiddenField ID="hdfFlagOmitir" runat="server" />
    <asp:HiddenField ID="hdfvcCodInt2" runat="server" />
    <asp:HiddenField ID="hdfEstadoPeriodo" runat="server" />
    <asp:HiddenField ID="hdf_ddlFil_Per" runat="server" />
    <asp:HiddenField ID="hdf_vcFil_Per" runat="server" />
    <asp:HiddenField ID="hdfCodBolPer" runat="server" />
    <asp:HiddenField ID="hdfGuidNom" runat="server" />
    <div id="dvImportar" runat="server" class="dvPanel" style="display: none; width: 95%;
        margin-bottom: 5px;">
        <table border="0" style="width: 100%">
            <tr>
                <td colspan="2">
                    <table width="100%" style="margin-top: -8px; margin-bottom: 10px;">
                        <tr>
                            <td colspan="2">
                                Acción de la importación
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-left: 15px;">
                                <input type="radio" id="rbtUpd" name="TipoAccionImport" runat="server" checked="True" />
                            </td>
                            <td>
                                <label id="lblUpd" for="rbtUpd">
                                    Líneas de la distribución no encontradas en el archivo quedarán con un valor asignado
                                    igual a cero (0).</label>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-left: 15px;">
                                <input type="radio" id="rbtNoUpd" name="TipoAccionImport" runat="server" />
                            </td>
                            <td>
                                <label id="lblNoUpd" for="rbtNoUpd">
                                    Sólo se actualizarán las líneas que se encuentren en el archivo a cargado.</label>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:FileUpload ID="fuArchivo" runat="server" accept=".xlsx" />
                    <%--<asp:RegularExpressionValidator ID="regexValidator" runat="server" ControlToValidate="fuArchivo" ErrorMessage="Only csv files are allowed" ValidationExpression="(.*\.([cC][sS][vV])$)"></asp:RegularExpressionValidator>--%>
                    <asp:Button ID="btnCargar" runat="server" Text="" />
                </td>
                <td>
                    <div id="btnCargarCli" class="btnNormal">
                        <asp:Image ID="imgCargar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                        <a>Importar</a>
                    </div>
                    <asp:Label ID="lblMensaje" runat="server" ForeColor="red" Text=""></asp:Label>
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
