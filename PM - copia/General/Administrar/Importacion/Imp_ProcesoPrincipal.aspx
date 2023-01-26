<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Imp_ProcesoPrincipal.aspx.vb" Inherits="Imp_ProcesoPrincipal" %>
<%@ Register TagPrefix="cc1" Namespace="VisualSoft.Comun.LibreriaJQ" Assembly="VisualSoft.Comun.LibreriaJQ" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.locale-es.js" type="text/javascript"></script>
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
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>

    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Imp_ProcesoPrincipal.js" type="text/javascript"></script>

</head>
<body>
    <form id="form1" runat="server">
        <div id="dvCargando" class="dvCargando"></div>
        <table width="100%">
            <tr class="trToolBar" align="center">
                <td align="center">
                    <div id="toolbar" class="dvPanel" style="margin:0px !important; padding:0px !important;">
                        <table border="0" width="100%">
                            <tr>
                                <td style="width:80px; padding-left:20px;">
                                    <table id="tblAcciones" runat="server" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <div id="btnProceso" class="btnNormal" runat="server" title="Proceso" Click="ProcesoTarea" Url="Imp_ProcesoImportacion.aspx">
                                                    <asp:Image ID="ibnProceso" runat="server" ImageUrl="../../../Common/Images/Mantenimiento/Proceso.png" />                   
                                                </div>
                                            </td>
                                           <%-- <td>
                                                <div id="btnActualizar" class="btnNormal" runat="server" title="Actualizar" Click="Actualizartarea" Url="Imp_ActualizarRegistros.aspx">
                                                    <asp:Image ID="ibnActualizar" runat="server" ImageUrl="../../../Images/Update 16_x_16.png" />
                                                </div>
                                            </td>
                                            <td>
                                                <div id="btnEliminar" class="btnNormal" runat="server" title="Eliminar" Click="EliminarTarea" Url="Imp_EliminarRegistros.aspx">
                                                    <asp:Image ID="ibnEliminar" runat="server" ImageUrl="../../../Common/Images/Mantenimiento/delete_16x16.gif" />
                                                </div>
                                            </td>--%>

                                            <td>
                                                <div id="btnVisorTarea" class="btnNormal" runat="server" title="Visor de tareas" Click="VisorTareas" Url="Imp_VisorTareaImportacion.aspx">
                                                    <asp:Image ID="ibnVisorTarea" runat="server" ImageUrl="../../../Common/Images/Mantenimiento/Tarea.png" />
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>

        </table>
        <cc1:PanelSplitter width="100%" ID="PanelSplitter1" runat="server" BorderColor="LightGray" BorderStyle="Solid" BorderWidth="0px" style="overflow: hidden;">
                <cc1:TabJQ runat="server" ID="TabOpciones" CssClass="tabs" style="margin-top:1px;">
<%--                    <cc1:ContenedorTabJQ Titulo="Inicio" ActivoBotonCerrar="true" CssClass="tabHijo" style="overflow: hidden;">
                        <iframe id="ifInicial" class="ifContenido"></iframe>
                    </cc1:ContenedorTabJQ>--%>
                </cc1:TabJQ>
        </cc1:PanelSplitter>
    </form>
</body>
</html>
