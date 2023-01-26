<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Solicitudes_Adm_SeguridadSolicitud" Codebehind="Adm_SeguridadSolicitud.aspx.vb" %>
<%@ Register src="../../../Common/Controles/BusquedaPrincipal.ascx" tagname="BusquedaPrincipal" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <script src="Adm_SeguridadSolicitud.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfLinea" runat="server" />
    <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
    <div id="dvCampos" class="dvPanel" style="overflow: auto;">
        <table>
            <tr>
                <td style="width:90px;">Seguridad por:</td>
                <td style="width:135px;"><input type="radio" id ="rbtTipoSolicitud" title="Tipo de Solicitud" name="TipoSeleccion"/>Tipo de Solicitud    </td>
                <td style="width:85px;"><input type="radio" id ="rbtTecnico" title="Especialista" name="TipoSeleccion" checked="checked"/>Técnico</td>
                <td><input type="radio" id ="rbtGrupo" title="Grupo" name="TipoSeleccion" />Grupo</td>
            </tr>
            <tr>
                <td></td>
                <td > Asignar a:&nbsp;&nbsp; <asp:DropDownList ID="ddlTipo" runat="server" Width="73px" MaxLength="5">                   
                    <asp:ListItem Value="1">Especialista</asp:ListItem>
                    <asp:ListItem Value="2">Grupo</asp:ListItem>
                    </asp:DropDownList ></td>
             <%--   <td><input type="radio" id ="rbtSubSelTecnico" title="Técnico" name="SubSeleccion" />Técnico</td>
                <td><input type="radio" id ="rbtSubSelGrupo" title="Grupo" name="SubSeleccion" />Grupo</td>--%>
                <td></td>
            </tr>
            <tr>
                <td><span id="lblTipoSeleccion">Tipo de Solicitud</span></td>
                <td colspan="3">
                    <div id="dvContenedorControlBP" runat="server">
                        <uc1:BusquedaPrincipal ID="bpTecnico" runat="server"/>
                        <uc1:BusquedaPrincipal ID="bpGrupo" runat="server"/>
                        <uc1:BusquedaPrincipal ID="bpTipoSolicitud" runat="server"/>
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="4" style="margin-top:15px;"></td>
            </tr>
            <tr>
                <td colspan="4">
                    <table id="tbGrid"></table>
                </td>
            </tr>
        </table>
    </div>
    <br />
        <%--<div>Técnico Solicitud - Área</div>--%>
        <div class="dvPanel" style="overflow: auto; display: none;" id="dvTecnicoSolicitud">
            <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td>
                        <asp:HiddenField runat="server" ID="hdCodintTecnico" />
                        <asp:HiddenField runat="server" ID="hdCodOrgTecnico" />
                        <asp:HiddenField runat="server" ID="hdNomOrgTecnico" />
                        &nbsp;
                                            <div id="btnAgregarOrga2" class="btnNormal" style="width: 100px;" runat="server" title="Seleccionar Organización">
                                                <asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />&nbsp;Asociar Área
                                            </div>
                    </td>
                    <td>&nbsp;
                                            <div id="btnQuitaArea" class="btnNormal" style="width: 40px;" runat="server" title="Quitar Área">
                                                <asp:Image ID="Image7" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" />
                                            </div>
                    </td>

                </tr>
            </table>
            <br />
            <table id="tbGridSolicitudesArea">
            </table>
        </div>
                                
        <br />
    <div id="Div1" style="margin-top:5px; text-align:left;">
        <div id="btnGuardar" class="btnNormal">
            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
            <a>Guardar</a>
        </div>
        <%--<div id="btnCerrar" class="btnNormal">
            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
            <a>Cancelar</a>
        </div>--%>
    </div>

        <div id="dvArea" style="display: none; padding: 0px; margin: 0px;">
                <iframe id="ifArea" width="730" height="440" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
            </div>
    </form>
</body>
</html>
