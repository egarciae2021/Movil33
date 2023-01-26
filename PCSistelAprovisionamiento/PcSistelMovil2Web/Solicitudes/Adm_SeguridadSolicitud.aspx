<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Adm_SeguridadSolicitud.aspx.cs"
    Inherits="PcSistelMovil2Web.Solicitudes.Adm_SeguridadSolicitud" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Styles/Sitio.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/JqueryThemeRoller/redmond/jquery-ui-1.8.16.custom.css"
        rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/json2.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <link href="../Common/Styles/Principal2.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Adm_SeguridadSolicitud.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <%-- Modal tecnico --%>
    <div id="div_modal_tecnico" style="display: none; padding: 0px; margin: 0px; overflow-y: hidden;">
        <br />
        <label style="font-size: 9px;">
            Seleccione un registro que desee y haga click en aceptar</label>
        <table>
            <tr>
                <td>
                    <asp:Label runat="server" ID="Label1" CssClass="" Text="Buscar"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtbusqueda" runat="server" Width="400px" MaxLength="160"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <table id="grid">
                    </table>
                    <div id="pager">
                    </div>
                </td>
            </tr>
        </table>
        <div id="dvModalAcciones" style="float: right; margin-top: 0px;">
            <div id="btnAddTecnico" class="btnNormal" style="width: 80px;">
                <a style="font-size: 10px;">Aceptar</a>
            </div>
            <div id="btnCancelarTecnico" class="btnNormal" style="width: 80px;">
                <a style="font-size: 10px;">Cancelar</a>
            </div>
        </div>
    </div>
    <%-- Fin Modal tecnico--%>
    <div id="dvCampos" class="dvPanel" style="overflow: auto;">
        <table>
            <tr>
                <td style="width: 100px;">
                    Tipo de Selección
                </td>
                <td style="width: 65px;">
                    <input type="radio" id="rbtTipoSolicitud" title="Tipo de Solicitud" name="TipoSeleccion" checked="checked"  />Todos
                </td>
                <td style="width: 65px; display: none;">
                    <input type="radio" id="rbtGrupo" title="Grupo" name="TipoSeleccion" />Grupo
                </td>
                <td>
                    
                    <input type="radio" id="rbtTecnico" title="Técnico" name="TipoSeleccion" />Técnico
                </td>
            </tr>
            <tr id="trSubseleccion" style="display: none;">
                <td>
                    Subselección
                </td>
                <td>
                    <input type="radio" id="rbtSubSelTecnico" title="Técnico" name="SubSeleccion" />Técnico
                </td>
                <td>
                    <input type="radio" id="rbtSubSelGrupo" title="Grupo" name="SubSeleccion" style="display: none;" />Grupo
                </td>
                <td>
                </td>
            </tr>
            <tr id="trBusqueda">
                <td>
                    <span id="lblTipoSeleccion">Técnico</span>
                </td>
                <td colspan="3">
                    <asp:TextBox ID="txtresultado" runat="server" Width="240px" MaxLength="160"></asp:TextBox>
                    <div id="btnBuscar" class="btnNormal">
                        <img src="../Common/images/Mantenimiento/busqueda_generico.png" />
                    </div>
                    <div id="dvContenedorControlBP" runat="server">
                        <%-- <uc1:BusquedaPrincipal ID="bpTecnico" runat="server"/>
                        <uc1:BusquedaPrincipal ID="bpGrupo" runat="server"/>
                        <uc1:BusquedaPrincipal ID="bpTipoSolicitud" runat="server"/>--%>                        
                    </div>
                </td>
            </tr>
            <tr>
            
                <td colspan="4" style="margin-top: 15px;">
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    <table id="tbGrid">
                    </table>
                </td>
            </tr>
        </table>
    </div>
    <br />
    <div id="Div1" style="margin-top: 5px; text-align: left;">
        <div id="btnGuardar" class="btnNormal">
            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
            <a>Guardar</a>
        </div>
        <div id="btnCerrar" class="btnNormal">
            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
            <a>Cancelar</a>
        </div>
    </div>
    </form>
</body>
</html>
