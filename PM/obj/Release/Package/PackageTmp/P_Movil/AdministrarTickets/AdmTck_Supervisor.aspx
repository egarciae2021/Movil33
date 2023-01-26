<%@ Page Language="VB" AutoEventWireup="false"
    Inherits="P_Movil_AdministrarTickets_AdmTck_Supervisor" Codebehind="AdmTck_Supervisor.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
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
    <script src="AdmTck_Supervisor.js" type="text/javascript"></script>
        <style type="text/css">
       .msm,#divAtras
       {
        background: rgb(242,249,254); /* Old browsers */
        /* IE9 SVG, needs conditional override of 'filter' to 'none' */
        background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2YyZjlmZSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNkNmYwZmQiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
        background: -moz-linear-gradient(left,  rgba(242,249,254,1) 0%, rgba(214,240,253,1) 100%); /* FF3.6+ */
        background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgba(242,249,254,1)), color-stop(100%,rgba(214,240,253,1))); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(left,  rgba(242,249,254,1) 0%,rgba(214,240,253,1) 100%); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(left,  rgba(242,249,254,1) 0%,rgba(214,240,253,1) 100%); /* Opera 11.10+ */
        background: -ms-linear-gradient(left,  rgba(242,249,254,1) 0%,rgba(214,240,253,1) 100%); /* IE10+ */
        background: linear-gradient(to right,  rgba(242,249,254,1) 0%,rgba(214,240,253,1) 100%); /* W3C */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f2f9fe', endColorstr='#d6f0fd',GradientType=1 ); /* IE6-8 */   
        border-radius: 20px;
        }   
        
        .msm:hover,#divAtras:hover
       {
        background: rgb(73,192,240); /* Old browsers */
        /* IE9 SVG, needs conditional override of 'filter' to 'none' */
        background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzQ5YzBmMCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMyY2FmZTMiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
        background: -moz-linear-gradient(left,  rgba(73,192,240,1) 0%, rgba(44,175,227,1) 100%); /* FF3.6+ */
        background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgba(73,192,240,1)), color-stop(100%,rgba(44,175,227,1))); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(left,  rgba(73,192,240,1) 0%,rgba(44,175,227,1) 100%); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(left,  rgba(73,192,240,1) 0%,rgba(44,175,227,1) 100%); /* Opera 11.10+ */
        background: -ms-linear-gradient(left,  rgba(73,192,240,1) 0%,rgba(44,175,227,1) 100%); /* IE10+ */
        background: linear-gradient(to right,  rgba(73,192,240,1) 0%,rgba(44,175,227,1) 100%); /* W3C */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#49c0f0', endColorstr='#2cafe3',GradientType=1 ); /* IE6-8 */
        border-radius: 5px;
        
        }   
        #divAtras:hover
        {
            cursor:pointer;
        }
   
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <div id="divTecnicos">
        <div id="Div1" runat="server" class="dvPanel">
            <div style="text-align: center; font-size: medium; margin-bottom: 20px;">
                <a>Especialista</a></div>
            <table align="center">
                <%--<tr>
                    <td align="center">
                        <span style="float: left; font-family: Arial; margin-right: 10px;">Ordenar por:
                        </span>
                        <div id="radio" style="float: left;">
                            <input type="radio" id="radio1" name="radio" checked="checked" /><label for="radio1">Fecha</label>
                            <input type="radio" id="radio2" name="radio" /><label for="radio2">Prioridad</label>
                            <input type="radio" id="radio3" name="radio" /><label for="radio3">SLA por culminar</label>
                        </div>
                    </td>
                </tr>--%>
                <tr>
                    <td align="center">
                        <table id="tbTecnicos">
                        </table>
                        <div id="pager">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <div id="btnSeguimiento">
                            <a>Seguimiento</a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div id="divSeguimiento" style="display: none;">
        <div>
            <div id="dvCargando" class="dvCargando">
            </div>
            <div id="pnlInformacion" class="dvPanel" style="width: 95%; height: 10%; position: absolute;
                left: 5px; top: 5px; box-shadow: 0px 10px 25px gray;">
                <div id="divAtras" style="float: left; width: 32px; height: 32px; background-color: transparent; margin-top:10px; box-shadow: 5px 5px 5px gray; border-radius:10px;">
                    <img src="../../Images/Tickets/Back.png" alt="Usuario desconectado" />
                </div>
            </div>
            <div id="pnlticket" class="dvPanel" style="width: 35%; height: 80%; position: absolute;
                left: 5px; top: 16%; box-shadow: 0px 10px 25px gray;">
                <div style="width: 100%; height: 20px; position: relative; left: 0px; top: 0px;">
                    <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%">
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
                </div>
                <div style="width: 100%; height: 90%; background-color: transparent; overflow: scroll;
                    margin-top: 20px" id="panelTickets">
                </div>
            </div>
            <div id="pnlPrincipaldetalle" class="dvPanel" style="width: 57%; height: 80%; position: absolute;
                left: 38%; top: 16%; display: none; box-shadow: 0px 10px 25px gray;">
                <div id="pnlHeadDetalle" style="width: 95%; height: 40px; position: relative; left: 0px;
                    top: 0px; margin-bottom: 10px;" class="dvPanel">
                </div>
                <div id="pnlDetalle" style="width: 95%; height: 65%; margin-bottom: 10px; overflow: scroll;"
                    class="dvPanel">
                </div>
                <div style="width: 100%; height: 20px; position: relative; left: 0px; top: 0px;">
                    <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%">
                        <tr>
                            <td align="right" width="82%">
                                <asp:TextBox ID="txtDescripcionDetalle" runat="server" Width="100%"></asp:TextBox>
                            </td>
                            <td align="center" width="15%">
                                <div id="btnRegistrarDetalle">
                                    Enviar
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div id="dialog-anular" style="display: none;" title="Anular ticket">
            <p>
                <span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px 50px 0;">
                </span>seguro de anular el ticket con código <b style="font-size: 12pt"></b>
            </p>    
        </div>
        <div id="dialog-cerrar" style="display: none;" title="Cerrar ticket">
            <p>
                <span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px 50px 0;">
                </span>seguro de cerrar el ticket con código <b style="font-size: 12pt"></b>
            </p>
        </div>
        <div id="dialog-ayuda" style="display: none;" title="Solicitar ayuda a supervisor">
            <p>
                <span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px 50px 0;">
                </span>seguro obtener ayuda de su supervisor del ticket con código <b style="font-size: 12pt">
                </b>
            </p>
        </div>
    </div>
    </form>
</body>
</html>
