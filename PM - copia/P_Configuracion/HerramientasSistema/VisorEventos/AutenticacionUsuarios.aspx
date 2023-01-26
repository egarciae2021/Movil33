<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Configuracion_HerramientasSistema_VisorEventos_AutenticacionUsuarios" Codebehind="AutenticacionUsuarios.aspx.vb" %>

<%@ Register src="../../../Common/Controles/ExportarExcelGenerico.ascx" tagname="ExportarExcel" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link  href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
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
    <script src="../../../Common/Scripts/aLiteral.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="AutenticacionUsuarios.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">

            <table border="0" align="center">
                <tr>
                    <td>
                        <span style="font-size: 12px;"><b>Última Autenticación de Usuarios</b></span>
                    </td>
                </tr>
                <tr>
                    <td>
                        
                    </td>
                </tr>
                <tr>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    Última autenticación desde hace:
                                </td>
                                <td>
                                    <asp:TextBox ID="txtCantidad" Width="20px" runat="server" Text="1" MaxLength="2"></asp:TextBox>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlTipo" runat="server" Width="120px">
                                        <%--<asp:ListItem Value="dtFecHor" Text="Fecha Hora"></asp:ListItem>--%>
                                        <asp:ListItem Value="day" Text="Días"></asp:ListItem>
                                        <asp:ListItem Value="week" Text="Semanas"></asp:ListItem>
                                        <asp:ListItem Value="month" Text="Meses" Selected="True"></asp:ListItem>
                                        <asp:ListItem Value="year" Text="Años"></asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                                <td>
                                    <div id="btnBuscar" class="button" style="margin: auto;">
                                        <table border="0" cellpadding ="0" cellspacing ="0">
                                            <tr>
                                                <td>    
                                                    <img src="../../../Common/Images/Mantenimiento/Busqueda.png" alt="" width="16px" />
                                                </td>
                                                <td>
                                                    Buscar
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>

                                <td>
                                    <uc1:exportarexcel ID="eeAutenticacion" runat="server" />
                                </td>

                                <td style="width:350px;"></td>
                            </tr>
                        </table>   
                    </td>
                </tr>
                <tr>
                    <td align="right">
                        <%--<span style="font-style:italic;">(Doble clic para visualizar la Descripción)</span>--%> 
                   </td>
                </tr>
                <tr>
                    <td>
                        <table id="tbGrillaUsuarios"></table>
                        <div id="pagerGrillaUsuarios"></div>
                    </td>
                </tr>
            </table>
    </form>
</body>
</html>
