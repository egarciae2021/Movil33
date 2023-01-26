<%@ Page Language="VB" AutoEventWireup="false" Inherits="General_Administrar_Mantenimiento_Mnt_Principal" CodeBehind="Mnt_Principal.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register Src="../../../Common/Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcelGenerico" TagPrefix="uc1" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register Src="../../../Common/Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcel" TagPrefix="eeg" %>
<%@ Register Src="../../../Common/Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcel2" TagPrefix="eeg2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/dhtmlxtree.css" rel="stylesheet" type="text/css" />
    <link rel="STYLESHEET" type="text/css" href="../../../Common/Scripts/dhtmlxGrid/codebase/dhtmlxgrid.css" />
    <link href="../../../Common/Scripts/dhtmlxGrid/codebase/skins/dhtmlxgrid_dhx_skyblue.css"
        rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/dhtmlx/dhtmlxcommon.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/dhtmlx/dhtmlxtree.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/dhtmlx/ext/dhtmlxtree_json.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <%--        <script src="../../../Common/Scripts/dhtmlxGrid/codebase/dhtmlxcommon.js" type="text/javascript" ></script>
    --%><script src="../../../Common/Scripts/dhtmlxGrid/codebase/dhtmlxgrid.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/dhtmlxGrid/codebase/dhtmlxgridcell.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/dhtmlxGrid/codebase/ext/dhtmlxgrid_drag.js" type="text/javascript"></script>
    <style type="text/css">
        #ActualizarGeneral:hover {
            cursor: pointer;
            box-shadow: 0px 0px 5px gray;
        }

        body {
            overflow-y: hidden;
        }
    </style>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Mnt_Principal.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfCodOrgaSeleccionado" runat="server" />
        <asp:HiddenField ID="hdfRemoverAnexo" runat="server" Value="false" />
        <asp:HiddenField ID="hdfRemoverCodigo" runat="server" Value="false" />

        <asp:HiddenField ID="hdfCamposTablaResponsable" runat="server" />

        <div style="width: 20px; height: 20px; position: absolute; bottom: 5px; left: 15px;">
            <span id="ActualizarGeneral" style="border: 1px solid skyblue; border-radius: 3px; display: none;" class="ui-icon ui-icon-refresh"></span>
        </div>

        <div>
            <table width="100%" border="0">
                <tr>
                    <td width="470px" style="vertical-align: top;">
                        <table border="0">
                            <tr>
                                <td>Nombre:</td>
                                <td>
                                    <input type="text" id="txtArea" style="width: 283px;" maxlength="35" />(Enter)</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <asp:RadioButtonList ID="rblBusqueda" runat="server" RepeatDirection="Horizontal">
                                        <asp:ListItem Text="Área" Value="1" Selected="True"></asp:ListItem>
                                        <asp:ListItem Text="Empleado" Value="2"></asp:ListItem>
                                        <asp:ListItem Text="Responsable De Área (Directa)" Value="3"></asp:ListItem>
                                    </asp:RadioButtonList>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <table style="width: 100%;" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <label>
                                                    <input type="checkbox" id="chkIncluirDependencia" value="value" checked="checked" />
                                                    Incluir Dependencias (Máx. 1,000 emp.)</label>
                                            </td>
                                            <td rowspan="2" style="text-align: right;">
                                                <asp:HiddenField ID="hfMaximoNivel" runat="server" />
                                                <asp:HiddenField ID="hfMaximoNivelConfigurado" runat="server" />                                                
                                                Nivel m&aacute;ximo:                                                
                                                <select id="cboNivelMaximo">
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: left;">
                                                <label>
                                                    <input type="checkbox" id="chkEmpleadoLineaDispositivo" value="value" checked="checked" />
                                                    Empleados con Líneas/Equipos</label>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div class="dhtmlxTree dvPanel" id="dvOrganizacion" style="width: 400px; height: 300px; overflow: auto;">
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="tabla_auditoria" width="70%" valign="top">
                        <table width="100%" border="0">
                            <tr>
                                <td style="width: 30px;" rowspan="2">
                                    <b>Área:</b>
                                </td>
                                <td align="left" style="font-size: 12px; width: 400px;" rowspan="2">
                                    <span id="lblAreaSeleccionada">(Seleccione un &aacute;rea)</span>
                                    <span id="lblTotalEmpleados"></span>
                                </td>
                                <td align="right" style="width: 50px;">Empleado:
                                </td>
                                <td align="left" width="205px">
                                    <asp:TextBox ID="txtBuscarEmpleado" Width="205px" runat="server" MaxLength="35"></asp:TextBox>
                                </td>
                                <td align="left" width="30px">(Enter)
                                </td>
                                <%--<td width="90px">
                                    <table style="width: 100%;">
                                        <tr>
                                            <td>
                                                <div id="btnAgregarEmpleado" class="btnNormal" style="width: 40px;" title="Agregar Empleado">
                                                    <asp:Image ID="imgAgregarEmpleado" runat="server" ToolTip="Agregar Empleado" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                </div>
                                            </td>
                                            <td>
                                                <uc1:ExportarExcelGenerico ID="eegLlamada" runat="server" style="width: 40px !important; height: 26px !important;" title="Exportar a excel" />
                                            </td>
                                        </tr>
                                    </table>
                                    <%--<div id="btnExportarExcel" class="btnNormal" style="width: 40px;" title ="Exportar a excel">
                                    <asp:Image ID="imExportar" runat="server" ToolTip="Exportar a excel" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png" />
                                </div>
                                </td>--%>
                            </tr>
                            <tr >
                                <td <%--width="90px"--%> colspan="5">
                                    <table style="width: 98%;" >
                                        <tr align="right">
                                            <td colspan="2" width="50px" id="tdAgregarEmpleado" runat="server">
                                                <div id="btnAgregarEmpleado" class="btnNormal" <%--style="width: 40px;"--%> title="Agregar Empleado">
                                                    <asp:Image ID="imgAgregarEmpleado" runat="server" ToolTip="Agregar Empleado" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                </div>
                                            </td>
                                            <td width="40px">
                                                <uc1:ExportarExcelGenerico ID="eegLlamada" runat="server" style="/*width: 40px !important;*/ height: 26px !important;" title="Exportar a excel" />
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="6">
                                    <cc1:TabJQ ID="tabTipos" runat="server" CssClass="tabs" Style="margin: 0px; padding: 0px;">
                                        <cc1:ContenedorTabJQ ID="tbEmpleado" Titulo="Empleados" CssClass="dvTabContenido">
                                            <div id="gridbox" style="width: 100%; height: 600px; background-color: white; overflow: hidden; margin-left: 0px;"></div>
                                            <cc1:TabJQ ID="tabInformativo" runat="server" CssClass="tabs" Style="margin: 0px; padding: 0px;">
                                                <cc1:ContenedorTabJQ ID="tbLineasDispositivo" Titulo="Líneas" CssClass="dvTabContenido">
                                                    <div id="gridbox_LineaDispositivo" style="width: 100%; height: 155px; background-color: white; overflow: hidden">
                                                    </div>
                                                </cc1:ContenedorTabJQ>
                                                <cc1:ContenedorTabJQ ID="tbLineasDispositivo_D" Titulo="Equipos" CssClass="dvTabContenido">
                                                    <div id="gridbox_LineaDispositivo_D" style="width: 100%; height: 155px; background-color: white; overflow: hidden">
                                                    </div>
                                                </cc1:ContenedorTabJQ>
                                                <%--<cc1:ContenedorTabJQ ID="tbAnexos" Titulo="Anexos" CssClass="dvTabContenido">
                                                <div id="gridbox_Anexos" style="width: 100%; height: 155px; background-color: white; overflow: hidden">

                                                </div>
                                            </cc1:ContenedorTabJQ>
                                            <cc1:ContenedorTabJQ ID="tbCodigos" Titulo="Códigos" CssClass="dvTabContenido">
                                                <div id="gridbox_Codigo" style="width: 100%; height: 155px; background-color: white; overflow: hidden">

                                                </div>
                                            </cc1:ContenedorTabJQ>--%>
                                                <%--<cc1:ContenedorTabJQ ID="tbSolicitudes" Visible="false" Titulo="Solicitudes" CssClass="dvTabContenido">
                                            </cc1:ContenedorTabJQ>
                                            <cc1:ContenedorTabJQ ID="tbIncidencias" Visible="false" Titulo="Incidencias" CssClass="dvTabContenido">
                                            </cc1:ContenedorTabJQ>--%>
                                            </cc1:TabJQ>
                                        </cc1:ContenedorTabJQ>
                                        <cc1:ContenedorTabJQ ID="tbResponsableArea" Titulo="Responsables de Área" CssClass="dvTabContenido">
                                            <div id="gdResponsable" style="width: 100%; height: 400px; background-color: white; overflow: hidden; margin-left: 0px;"></div>
                                        </cc1:ContenedorTabJQ>
                                    </cc1:TabJQ>



                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</body>
</html>
