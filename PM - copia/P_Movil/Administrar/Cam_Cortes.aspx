<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_CAM_Cortes" Codebehind="Cam_Cortes.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register src="../../Common/Controles/PermisoAdministrador.ascx" tagname="PermisoAdministrador" tagprefix="pa" %>

<%@ Register src="../../Common/Controles/ExportarExcelGenerico.ascx" tagname="ExportarExcelGenerico" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <%--<script src="Cam_Cortes.js" type="text/javascript"></script>--%>
    <script src="Cam_Cortes.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfvcTab" runat="server" />
        <cc1:TabJQ runat="server" ID="TabDetalle" CssClass="tabs" style="margin-top:1px;">
            <cc1:ContenedorTabJQ Titulo="Detalle">
                <table width="100%">
                    <tr class="trToolBar" align="center">
                        <td align="center">
                            <div id="toolbar" class="ui-widget-content ui-corner-all" style="margin:0px !important; padding:0px !important;">
                                <table border="0" width="100%">
                                    <tr>
                                        <td></td>
                                        <td style="width:80px; padding-right:10px;">
                                            <table id="tblAcciones" runat="server" class="tblBotones" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <div id="btnAgregar" class="btnNormal" runat="server" title="Nuevo">
                                                            <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div id="btnEditar" class="btnNormal" runat="server" title="Editar">
                                                            <asp:Image ID="imgEditar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                                        </div>                            
                                                    </td>
                                                    <td>
                                                        <div id="btnCancelar" class="btnNormal" runat="server" title="Cancelar">
                                                            <asp:Image ID="imgCancelar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Cancelar.png" />
                                                        </div>                            
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td style="width:30px; padding-right:10px;">
                                            <table id="tblReporte" runat="server" class="tblBotones" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <div id="btnReporte" class="btnNormal" runat="server" title="Reportes">
                                                            <asp:Image ID="imgReporte" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png" />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td style="width:80px; padding-right:20px;">
                                            <table id="tblCorreo" runat="server" class="tblBotones" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <div id="btnEnviarOperador" class="btnNormal" runat="server" title="Enviar al Operador">
                                                            <asp:Image ID="imgEnviar" runat="server" ImageUrl="~/Common/Images/EnviarArchivo.png" Width="16px" Height="16px"/>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div id="btnEnviarUsuario" class="btnNormal" runat="server" title="Enviar Correo Usuario">
                                                            <asp:Image ID="imgEnviarUsuario" runat="server" ImageUrl="~/Common/Images/Mantenimiento/enviarcorreousuario.png" />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td style="width:50px; padding-right:10px;"></td>
                                        <td>
                                            <table border="0">
                                                <tr>
                                                    <td style="width:80px; height:32px" >
                                                        <asp:Label ID="lblFiltro" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
                                                    </td>
                                                    <td rowspan="2" valign="middle" style="width:250px;">
                                                        Campaña:&nbsp;
                                                        <asp:DropDownList ID="ddlCampana" runat="server" Width="170px"></asp:DropDownList>
                                                    </td>
                                                    <td rowspan="2" valign="middle" style="width:250px">
                                                        Operador:&nbsp;
                                                        <asp:DropDownList ID="ddlOperador" runat="server" Width="170px"></asp:DropDownList>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table id="grid"></table>
                            <div id="pager"></div>
                        </td>
                    </tr>
                </table>
            </cc1:ContenedorTabJQ>
        </cc1:TabJQ>
        
        <div style="margin-top:5px;">
        </div>
        <div id="dvEnvio" style="display:none;">
            <iframe id="ifEnvio" frameborder="0" style="padding: 0px; margin: 0px; height: 260px; width:500px;"></iframe>
        </div>
        <div id="dvDetalle" style="display:none;">
            <iframe id="ifDetalle" frameborder="0" style="padding: 0px; margin: 0px; height: 240px; width:430px;"></iframe>
        </div>
<%--        <div id="dvReporte" style="display:none;">
            <iframe id="ifReporte" frameborder="0" style="padding: 0px; margin: 0px; height: 0px; width:0px; display:none;"></iframe>
        </div>--%>
        <div id="dvOpcionRenovacion" style="display:none;">
            <asp:RadioButtonList ID="rblstRenovacion" runat="server" RepeatDirection="Horizontal">
                <asp:ListItem Text="Con Equipo" Value="True" Selected="True"></asp:ListItem>
                <asp:ListItem Text="Sin Equipo" Value="False"></asp:ListItem>
            </asp:RadioButtonList>
        </div>
        <div id="dvPermisoAdministrador" style="display:none;">
            <table>
                <tr>
                    <td>
                        Usuario:
                    </td>
                    <td>
                        <asp:TextBox ID="txtUsuarioPermisoAdministrador" runat="server" Text="Administrador"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        Password:
                    </td>
                    <td>
                        <asp:TextBox ID="txtPasswordPermisoAdministrador" runat="server" TextMode="Password"></asp:TextBox>
                    </td>
                </tr>
            </table>
        </div>
        <uc1:ExportarExcelGenerico ID="eegReporte" runat="server" OcultarDiseno="true"/>
    </form>
</body>
</html>