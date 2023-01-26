<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_AdministrarTickets_AdmTck_BolsaTicket"
    CodeBehind="AdmTck_BolsaTicket.aspx.vb" %>

<%@ Register Src="../../Common/Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcelGenerico"
TagPrefix="eeg" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="AdmTck_BolsaTicket.js" type="text/javascript"></script>
    <style type="text/css">
        .flotarIzquierda
        {
            float: left;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfIsModoCloud" runat="server" />
    <asp:HiddenField ID="hdfIdTecnico" runat="server" />
    <div id="global">
        <div>
            <div id="Div1" runat="server">
                <%--            <table>
                <tr>
                    <td>Nivel:</td>
                    <td> 
                    <asp:DropDownList ID="ddlNiveles" runat="server"></asp:DropDownList>
                    </td>
                </tr>
                
            </table>--%>
                <div id="dvFiltros" class="flotarIzquierda">
                    <div class="dvPanel flotarIzquierda" style="height: 20px; margin-right: 5px; margin-bottom: 5px;">
                        <span style="position: relative; top: -23px; left: 0px; background-color: White;
                            font-weight: bold;">Bolsas </span>
                        <asp:DropDownList ID="ddlNivel" runat="server" Style="margin-left: -36px;">
                        </asp:DropDownList>
                        <%--                <asp:DropDownList ID="ddlBolsa" runat="server" style="margin:0px;">
                </asp:DropDownList>--%>
                    </div>
                    <div class="dvPanel flotarIzquierda" style="height: 20px; margin-right: 5px; margin-bottom: 5px;">
                        <span style="position: relative; top: -23px; left: 0px; background-color: White;
                            font-weight: bold;">Tipos</span>
                        <asp:DropDownList ID="ddlTipo" runat="server" Style="margin-left: -36px;">
                        </asp:DropDownList>
                        <asp:DropDownList ID="ddlTipificacion" runat="server" Style="margin: 0px; display:none;">
                        </asp:DropDownList>
                    </div>
                    <div class="dvPanel flotarIzquierda" style="height: 20px; margin-right: 5px; margin-bottom: 5px;">
                        <span style="position: relative; top: -23px; left: 0px; background-color: White;
                            font-weight: bold;">Código Ticket</span>
                        <asp:TextBox ID="txtCodigoTicket" runat="server" Style="margin-left: -70px;" MaxLength="12"></asp:TextBox>
                    </div>
                    <div class="dvPanel flotarIzquierda" style="height: 20px; margin-right: 5px; margin-bottom: 5px;">
                        <span style="position: relative; top: -23px; left: 0px; background-color: White;
                            font-weight: bold;">Fecha</span> <span style="margin-left: -36px;">Inicio</span>
                        <asp:TextBox ID="txtFechaInicio" runat="server"></asp:TextBox>
                        <img id="imgBorrarFechaInicio" alt="" src="../../Common/Images/Mantenimiento/Borrar.png"
                            title="Limpiar fecha" class="imgBtn" style="margin-right: 7px;" />
                        <span>Fin</span>
                        <asp:TextBox ID="txtFechaFin" runat="server"></asp:TextBox>
                        <img id="imgBorrarFechaFin" alt="" src="../../Common/Images/Mantenimiento/Borrar.png"
                            title="Limpiar fecha" class="imgBtn" />
                    </div>
                    <div id="Div2" class="flotarIzquierda" style="  margin-right:5px; margin-bottom:5px; " runat="server">
                        <eeg:ExportarExcelGenerico ID="eegExcel" runat="server" />
                    </div>
                </div>
                <div style="clear: both;">
                </div>
                <div style="text-align: left;">
                    <div id="btnAsignar" class="btnNormal">
                        <asp:Image ID="imgGuardarServicio" runat="server" ImageUrl="~/Common/Images/asignar.png" />
                        <a>Asignar</a>
                    </div>
                    <%--            <div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cerrar</a>
            </div>--%>
                </div>
                <table>
                    <tr>
                        <td>
                            <table id="tbTickets" style="width: 950px">
                            </table>
                            <div id="pager">
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div id="dvBolsas" style="width: 250px; display: none;">
            <table>
                <tr>
                    <td>
                        Bolsas
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlBolsas_paraTomarCaso" runat="server" Width="200">
                        </asp:DropDownList>
                    </td>
                </tr>
            </table>
            <div style="text-align: right; padding-top: 12px">
                <div id="btnAsignar_conBolsa" class="btnNormal">
                    <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/asignar.png" />
                    <a>Asignar</a>
                </div>
                <div id="btnCerrar_conBolsa" class="btnNormal">
                    <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    <a>Cerrar</a>
                </div>
            </div>
        </div>
    </div>
    </form>
</body>
</html>
