<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_AdministrarTickets_AdmTck_PanelAdministracion"
    CodeBehind="AdmTck_PanelAdministracion.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.timer.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/socket.io.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <%--<link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
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
    <script src="../../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>   --%>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="AdmTck_PanelAdministracion.js" type="text/javascript"></script>
    <style type="text/css">
        ul
        {
            list-style: none;
            display: inline;
        }
        
        li
        {
            display: inline;
        }
        .msm
        {
            background: rgb(242,249,254); /* Old browsers */ /* IE9 SVG, needs conditional override of 'filter' to 'none' */
            background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2YyZjlmZSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNkNmYwZmQiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
            background: -moz-linear-gradient(left,  rgba(242,249,254,1) 0%, rgba(214,240,253,1) 100%); /* FF3.6+ */
            background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgba(242,249,254,1)), color-stop(100%,rgba(214,240,253,1))); /* Chrome,Safari4+ */
            background: -webkit-linear-gradient(left,  rgba(242,249,254,1) 0%,rgba(214,240,253,1) 100%); /* Chrome10+,Safari5.1+ */
            background: -o-linear-gradient(left,  rgba(242,249,254,1) 0%,rgba(214,240,253,1) 100%); /* Opera 11.10+ */
            background: -ms-linear-gradient(left,  rgba(242,249,254,1) 0%,rgba(214,240,253,1) 100%); /* IE10+ */
            background: linear-gradient(to right,  rgba(242,249,254,1) 0%,rgba(214,240,253,1) 100%); /* W3C */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f2f9fe', endColorstr='#d6f0fd',GradientType=1 ); /* IE6-8 */
            border-radius: 7px;
        }
        .msm:hover
        {
            background: rgb(73,192,240); /* Old browsers */ /* IE9 SVG, needs conditional override of 'filter' to 'none' */
            background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzQ5YzBmMCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMyY2FmZTMiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
            background: -moz-linear-gradient(left,  rgba(73,192,240,1) 0%, rgba(44,175,227,1) 100%); /* FF3.6+ */
            background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgba(73,192,240,1)), color-stop(100%,rgba(44,175,227,1))); /* Chrome,Safari4+ */
            background: -webkit-linear-gradient(left,  rgba(73,192,240,1) 0%,rgba(44,175,227,1) 100%); /* Chrome10+,Safari5.1+ */
            background: -o-linear-gradient(left,  rgba(73,192,240,1) 0%,rgba(44,175,227,1) 100%); /* Opera 11.10+ */
            background: -ms-linear-gradient(left,  rgba(73,192,240,1) 0%,rgba(44,175,227,1) 100%); /* IE10+ */
            background: linear-gradient(to right,  rgba(73,192,240,1) 0%,rgba(44,175,227,1) 100%); /* W3C */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#49c0f0', endColorstr='#2cafe3',GradientType=1 ); /* IE6-8 */
            border-radius: 7px;
        }
        
        
        .leftButton
        {
            margin-left: 50px !important;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfGuid" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeadoNombre" runat="server" />
    <asp:HiddenField ID="hdfIdTecnico" runat="server" />
    <div>
        <div id="dvCargando" class="dvCargando">
        </div>
        <%--<div id="pnlInformacion" class="dvPanel" style="width: 95%; height: 10%; position: absolute;
            left: 5px; top: 5px; box-shadow: 0px 10px 25px gray; display:none;">
            <div id="divIconoSesion" style="float: left; width: 48px; height: 48px; background-color: transparent;">
                <img src="../../Images/Tickets/UsuarioDesconectado.png" alt="Usuario desconectado" />
            </div>
        </div>--%>
        <div id="pnlticket" class="dvPanel" style="width: 230px; height: 85%; position: absolute;
            left: 4px; top: 4px; box-shadow: 0px 0px 4px gray; overflow-x: hidden;">
            <div style="width: 100%; height: 20px; position: relative; left: 0px; top: 0px;">
                <table style="display: none;" border="0" cellpadding="0" cellspacing="0" align="center"
                    width="100%">
                    <tr>
                        <td align="right" width="50%">
                            <asp:TextBox ID="txtBuscaTicket" runat="server" Width="100%"></asp:TextBox>
                        </td>
                        <td align="right" width="50%">
                            <asp:DropDownList ID="ddlBuscaTicket" runat="server" Width="90%">
                                <asp:ListItem Value="0">Código</asp:ListItem>
                                <asp:ListItem Value="1">Asunto</asp:ListItem>
                                <asp:ListItem Value="2">Descripción</asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%">
                    <tr>
                        <td align="right" width="90%">
                            <asp:TextBox ID="txtBuscaUsuario" runat="server" Width="220px"></asp:TextBox>
                        </td>
                    </tr>
                </table>
            </div>
            <div style="display: none; width: 100%; height: 90%; background-color: transparent;
                overflow: scroll; overflow-x: hidden; margin-top: 20px" id="panelTickets">
            </div>
            <div style="width: 100%; height: 90%; background-color: transparent; overflow: scroll;
                overflow-x: hidden; margin-top: 7px" id="panelTickets2">
            </div>
        </div>
        <div id="pnlPrincipaldetalle" class="dvPanel" style="height: 85%; position: absolute;
            right: 0px; top: 4px; display: none; box-shadow: 0px 0px 4px gray;">
            <asp:DropDownList ID="ddlTickets" runat="server">
            </asp:DropDownList>
            <div id="pnlHeadDetalle" style="font-size: 10px; width: 95%; position: relative;
                left: 0px; top: 0px; margin-top: 10px; margin-bottom: 10px;" class="dvPanel">
            </div>
            <div id="pnlDetalle" style="width: 95%; height: 68%; margin-bottom: 10px; overflow: scroll;"
                class="dvPanel">
            </div>
            <div style="width: 100%; height: 20px; position: relative; left: 0px; top: 0px;">
                <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%">
                    <tr>
                        <td align="right">
                            <asp:TextBox ID="txtDescripcionDetalle" runat="server" Width="100%" Height="50px"
                                TextMode="MultiLine"></asp:TextBox>
                        </td>
                        <td align="center" width="130px">
                            <div id="btnRegistrarDetalle">
                                Enviar
                            </div>
                            <div id="btnCerrarTicket">
                                Cerrar
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div id="btnbolsa" style="display: none; width: 20px; height: 40px; position: absolute;
            left: 98%; top: 40%;">
            <%--            <p>
                B
                <br />
                O<br />
                L<br />
                S<br />
                A</p>--%>
        </div>
        <div id="btnChat" style="display: none; width: 20px; height: 40px; position: absolute;
            left: 98%; top: 35%; text-align: left;">
            <%--            <p>
                C
                <br />
                H<br />
                A<br />
                T</p>--%>
        </div>
        <div id="panelChat" class="dvPanel" style="display: none; width: 200px; height: 94%;
            position: absolute; left: 100%; top: 5px; box-shadow: 0px 10px 25px gray;">
            <div id="btnCerrarPanelChat" style="width: 98%; height: 30px; margin-bottom: 30px">
                chat
            </div>
            <div id="btnIniciarSesion" style="width: 98%; height: 30px; margin-bottom: 30px">
                <span>Iniciar sesión</span>
            </div>
        </div>
    </div>
    <div id="dialog-anular" style="display: none;" title="Anular ticket">
        <p>
            <span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px 50px 0;">
            </span>Seguro de anular el Ticket con Código <b style="font-size: 12pt"></b>
        </p>
    </div>
    <div id="dialog-cerrar" style="display: none;" title="Cerrar ticket">
        <p>
            <span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px 50px 0;">
            </span>Seguro de cerrar el Ticket con Código: <b style="font-size: 12pt"></b>
        </p>
    </div>
    <div id="dialog-ayuda" style="display: none;" title="Solicitar ayuda a supervisor">
        <p>
            <span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px 50px 0;">
            </span>Seguro obtener ayuda de su supervisor del Ticket con Código <b style="font-size: 12pt">
            </b>
        </p>
    </div>
    <div id="dvArea" style="display: none; padding: 0px; margin: 0px;">
        <iframe id="ifArea" width="740" height="470" frameborder="0" style="padding: 0px;
            margin: 0px;"></iframe>
    </div>
    <div id="dvCerrar" style="display: none;">
        <div style="width: 99%; margin-bottom: 10px;">
            <span>Elija motivo de cierre:</span><br />
            <ul>
                <li>
                    <input id="rbResuelto" name="rbCerrar" type="radio" checked="checked" /><span>Resuelto</span>
                </li>
                <li>
                    <input id="rbAnulado" name="rbCerrar" type="radio" /><span>Anulado</span> </li>
            </ul>
        </div>
        <span>Descripcion de cierre:</span><br />
        <asp:TextBox ID="txtConclusion" runat="server" Height="150" Width="99%" TextMode="MultiLine"></asp:TextBox>
        <div id="btnRegistrarCierre" class="btnNormal" style="margin-left: 140px; margin-top: 10px;">
            Cerrar Solicitud</div>
    </div>
    </form>
</body>
</html>
