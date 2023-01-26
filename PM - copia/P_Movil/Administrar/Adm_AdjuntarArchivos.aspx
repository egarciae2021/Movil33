<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_AdjungarArchivos" Codebehind="Adm_AdjuntarArchivos.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../../Common/Styles/jqGrid/ui.jqgrid.css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/grid.base.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/grid.common.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/grid.formedit.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/jquery.fmatter.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/JsonXml.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/jqDnR.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/jqModal.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/grid.jqueryui.js"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Adm_AdjuntarArchivos.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfTipoSolicitud" runat="server" />
    <asp:HiddenField ID="hdfCodTemp" runat="server" />
    <asp:HiddenField ID="hdfArchivoAdjunto" runat="server" />
    <asp:HiddenField ID="hdfAdjuntosActuales" runat="server" />
    <asp:HiddenField ID="hdfOrigen" runat="server" />

    <asp:HiddenField ID="hdfEstSolicitud" runat="server" /> <%--creación=0 o edición=1--%>
    <asp:HiddenField ID="hdfCodsol" runat="server" /> <%-- codigo de la solicitud si el estado es 1 --%>
    <asp:HiddenField ID="hdfEditable" runat="server" /> <%--editable=1 permite editar y quitar --%>
    <asp:HiddenField ID="hdfObligatorio" runat="server" /> <%--obligatorio=1 validar el ingreso de por lo menos 1 archivo --%>

    <asp:HiddenField runat="server" ID="hdfCanMax" />
    <asp:HiddenField runat="server" ID="hdfExtPer" />
    <asp:HiddenField runat="server" ID="hdfTamTip" />
    <asp:HiddenField runat="server" ID="hdfTamMax" />
    <asp:HiddenField runat="server" ID="hdfTamMed" />
    <div>
        <div id="dvCargando" class="dvCargando">
        </div>
        <div >
            <div style="text-align: center; font-size: medium; display:none;"><a>Adjuntar Archivos</a></div>
            <table>
                <tr id="tdCargarArchivo" runat="server">
                    <td>
                        <%--<asp:FileUpload ID="fuAdjuntar" runat="server" />
                        <asp:Button ID="btnSubir" CssClass="btnNormal" Text="Subir" runat="server"/>--%>
                        <div >
                            <iframe id="ifCargarArchivo" frameborder="0" style="padding-top: 0px; padding-bottom: 0px; margin: 0px;"
                                width="400px" height="55px"></iframe>
                        </div>
                    </td>
                </tr>
                <%--<tr>
                    <td colspan="2">
                        <iframe id="ifCargarImagen" frameborder="0" style="padding: 0px; margin: 0px; height: 33px; width:482px;" 
                                src="../../../Common/Page/Adm_CargarArchivo.aspx?Formatos=&FormatoTipo=" >
                        </iframe>
                    </td>
                </tr>--%>
                <tr>
                    <td class="style1">
                        <asp:Label ID="lblEstado" runat="server"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div id="dvListaAdj">
                            <table id="tblAdjuntos"></table>
                            <div id="pager"></div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td> <div style="height:5px"></div></td>
                </tr>
                <tr>
                    <td align="right">
                        <div id="btnQuitar" class="btnNormal" runat="server">
                            <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png"/>
                            <a>Quitar Adjunto</a>
                        </div>
                        <div id="btnListo" class="btnNormal" runat="server">
                            <asp:Image ID="imgGuardarItem" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                            <a><asp:Label ID="lblListo" runat="server"></asp:Label></a>
                        </div>
                        <div id="btnCancelar" class="btnNormal" runat="server">
                            <asp:Image ID="imgCerrarItem" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                            <a>Cerrar</a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div id="divConQui" style="display:none;">
        <span class="ui-icon ui-icon-alert" style="float:left;"></span>
        Este archivo se quitará permanentemente de la solicitud y no habrá manera de recuperarlo. ¿Está seguro que desea continuar con la eliminación?
    </div>
    </form>
</body>
</html>
