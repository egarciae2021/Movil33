<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Adm_Lista.aspx.vb" Inherits="Adm_Lista" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register Src="../Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcel"
    TagPrefix="eeg" %>
<%@ Register Src="../Controles/ImportarExcelGenerico.ascx" TagName="ImportarExcelGenerico"
    TagPrefix="uc1" %>
<%@ Register Src="../Controles/BusquedaPrincipal.ascx" TagName="BusquedaPrincipal"
    TagPrefix="uc3" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../../Styles/Principal.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/JqueryThemeRoller/redmond/jquery-ui-1.8.16.custom.css" rel="stylesheet"
        type="text/css" />
    <script src="Adm_Lista.js" type="text/javascript"></script>
    <style type="text/css">
        .FilabtVig
        {
            /*color:Red;
            padding:5px;    */
            border: 0px;
        }
        
        .FilaCampanaActiva
        {
            background: #cdeb8b; /* Old browsers */
            background: -moz-linear-gradient(top,  #cdeb8b 0%, #cdeb8b 100%); /* FF3.6+ */
            background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#cdeb8b), color-stop(100%,#cdeb8b)); /* Chrome,Safari4+ */
            background: -webkit-linear-gradient(top,  #cdeb8b 0%,#cdeb8b 100%); /* Chrome10+,Safari5.1+ */
            background: -o-linear-gradient(top,  #cdeb8b 0%,#cdeb8b 100%); /* Opera 11.10+ */
            background: -ms-linear-gradient(top,  #cdeb8b 0%,#cdeb8b 100%); /* IE10+ */
            background: linear-gradient(to bottom,  #cdeb8b 0%,#cdeb8b 100%); /* W3C */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#cdeb8b', endColorstr='#cdeb8b',GradientType=0 ); /* IE6-9 */
            font-weight: bolder;
        }
        
        #form1
        {
            font-weight: 700;
        }
    </style>
</head>
<body>
    <div id="dvMsgAlertas" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <div id="dvContenidoAlertas">
        </div>
    </div>
    <div id="dvLeyendaCam" style="position: absolute; right: 50px; bottom: 0px; z-index: 999999;
        display: none;">
        <div style="float: left; width: 10px; height: 10px; border: 1px solid black; border-radius: 5px;"
            class="FilaCampanaActiva">
        </div>
        <div style="float: left; margin-left: 5px; font-weight: lighter; font-size: small;">
            Campaña Activa
        </div>
    </div>
    <form id="form1" runat="server">
    <div id="dvCargando" class="dvCargando">
    </div>
    <asp:HiddenField ID="hdfvcTab" runat="server" />
    <asp:HiddenField ID="hdfEdicion" runat="server" />
    <asp:HiddenField ID="hdfActivo" runat="server" />
    <asp:HiddenField ID="hdfDesactivo" runat="server" />
    <asp:HiddenField ID="hdfElim" runat="server" />
    <asp:HiddenField ID="hdfVerdadero" runat="server" />
    <asp:HiddenField ID="hdfFalso" runat="server" />
    <asp:HiddenField ID="hdfCampBool" runat="server" />
    <asp:HiddenField ID="hdfinTipOri" runat="server" />
    <asp:HiddenField ID="hdfCodEntidad" runat="server" />
    <asp:HiddenField ID="hdfValorPorDefecto" runat="server" />
    <asp:HiddenField ID="hdfNumMaxNivel" runat="server" />
    <div id="divMsgConfirmacion" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <asp:Label ID="lblMensajeConfirmacion" runat="server" Text=""></asp:Label>
    </div>
    <div id="divAviso" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <asp:Label ID="lblAviso" runat="server" Width="200px" Text=""></asp:Label>
    </div>
    <div id="divMsjRestaurarLineas" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <asp:Label ID="lblMensajeActivarEmpleado" runat="server" Width="270px" Text="Los empleados por activar tenian lineas antes de ser dados de baja, ¿Desea restaurar las líneas de los empleados?."></asp:Label>
        <div id="dvLineasRestaurar" style="display: none; width: 280px; height: 60px; overflow: auto">
            <table id="tbLineasRestaurar" width="100%">
            </table>
        </div>
    </div>
    <cc1:TabJQ runat="server" ID="TabDetalle" CssClass="tabs" Style="margin-top: 1px;"
        BorderStyle="None" BorderWidth="0">
        <cc1:ContenedorTabJQ BorderStyle="None" BorderWidth="0" ID="ctListado">
            <table class="dvPanel" width="100%">
                <tr class="trToolBar" align="center" style="margin: 0px !important; padding: 0px !important;
                    overflow: auto;">
                    <td align="center">
                        <div id="toolbar" class="dvPanel" style="margin: 0px !important; padding: 0px !important;
                            overflow: hidden;">
                            <table border="0" width="100%">
                                <tr>
                                    <%--<td style="width:200px; padding-right:10px;">
                                        <asp:Label ID="lblTituloOpciones" runat="server" Text="Opciones" CssClass="lblToolBAR"></asp:Label>
                                    </td>--%>
                                    <td>
                                        &nbsp;
                                    </td>
                                    <td style="width: 80px; padding-right: 10px;">
                                        <table id="tblAcciones" runat="server" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <div id="btnAgregar" class="btnNormal" runat="server" title="Nuevo" click="AgregarRegistro">
                                                        <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div id="btnEditar" class="btnNormal" runat="server" title="Editar Seleccionado"
                                                        click="EditarRegistro">
                                                        <asp:Image ID="imgEditar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div id="btnEliminar" class="btnNormal" runat="server" title="Eliminar Seleccionados"
                                                        click="EliminarRegistro">
                                                        <asp:Image ID="imgEliminar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td style="width: 40px; padding-right: 10px;">
                                        <table id="tblEstado" runat="server" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <div id="btnActivar" class="btnNormal" runat="server" title="Activar Seleccionados"
                                                        click="ActivarRegistro">
                                                        <asp:Image ID="imgActivar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Activar_16x16.png" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td style="width: 40px; padding-right: 10px;">
                                        <table id="tblFiltroBusqueda" cellpadding="0" cellspacing="0" runat="server">
                                            <tr>
                                                <td>
                                                    <div id="btnConfigurarFiltroRegistro" class="btnNormal" runat="server" title="Configurar filtro de registro"
                                                        click="ConfigurarFiltroRegistro">
                                                        <asp:Image ID="imgConfigurarFiltroRegistro" runat="server" ImageUrl="~/Common/Images/Mantenimiento/VistaDetalle.png" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td>
                                        <table id="tblAvanzada" runat="server" cellpadding="0" cellspacing="0">
                                            <tr id="trAvanzada" runat="server">
                                            </tr>
                                        </table>
                                    </td>
                                    <td>
                                        <table border="0" id="tblFiltro" runat="server">
                                            <tr>
                                                <td style="width: 80px; height: 32px">
                                                    <asp:Label ID="lblFiltro" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
                                                </td>
                                                <td rowspan="2" valign="middle" style="width: 200px">
                                                    En:&nbsp;
                                                    <asp:DropDownList ID="ddlBusqueda" runat="server" Style="margin-left: 15px; font-weight: normal;"
                                                        Width="150px">
                                                    </asp:DropDownList>
                                                </td>
                                                <td rowspan="2" valign="middle" style="width: 220px">
                                                    Filtrar:&nbsp;
                                                    <asp:TextBox ID="txtBusqueda" CssClass="txtBusqueda" runat="server" Text="Valor a filtrar"
                                                        Style="margin-left: 15px; font-weight: normal;" Width="140px" MaxLength="200"></asp:TextBox>
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
                        <table id="grid">
                        </table>
                        <div id="pager">
                        </div>
                    </td>
                </tr>
            </table>
        </cc1:ContenedorTabJQ>
    </cc1:TabJQ>
    <div id="divListado" style="display: none;">
    </div>
    <div id="dvColumna" style="display: none; padding: 0px; margin: 0px;">
        <iframe id="ifColumna" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
    </div>
    <div id="dvArea" style="display: none; padding: 0px; margin: 0px;">
        <iframe id="ifArea" width="730" height="470" frameborder="0" style="padding: 0px;
            margin: 0px;"></iframe>
    </div>
    <div id="dvSucursal" style="display: none; padding: 0px; margin: 0px;">
        <iframe id="ifSucursal" width="460" height="350" frameborder="0" style="padding: 0px;
            margin: 0px;"></iframe>
    </div>
    <div id="dvBusquedaOrganizacion" runat="server" style="display: none;">
        <uc3:BusquedaPrincipal ID="bpBusquedaOrganizacion" runat="server" />
    </div>
    <iframe id="ifExcel" frameborder="0" style="padding: 0px; margin: 0px; display: none;">
    </iframe>
    <div id="dvFiltroRegistro" class="dvPanel" style="display: none; width: 75px;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>
                    <asp:RadioButton ID="rbtnActivos" runat="server" Text="Activos" GroupName="rbtnFiltroRegistro"
                        Checked="true" />
                </td>
            </tr>
            <tr>
                <td>
                    <asp:RadioButton ID="rbtnInactivos" runat="server" Text="Inactivos" GroupName="rbtnFiltroRegistro" />
                </td>
            </tr>
            <tr>
                <td>
                    <asp:RadioButton ID="rbtnTodos" runat="server" Text="Todos" GroupName="rbtnFiltroRegistro" />
                </td>
            </tr>
        </table>
    </div>
    <%--        <ul id="ui-id-1" class="ui-menu ui-widget ui-widget-content ui-corner-all" role="menu" tabindex="0" aria-activedescendant="ui-id-4" style="display: block; top: 34px; left: 115.703125px;">
		    <li class="ui-menu-item" role="presentation">
                <img src="yh" style="float:left;">
                <a href="#" id="ui-id-27" tabindex="-1" role="" style="margin-left:0px; margin-top:0px; padding-top:0px;" class="">Open...</a>
            </li>
		    <li class="ui-menu-item" role="presentation"><a href="#" id="ui-id-3" class="ui-corner-all ui-state-focus" tabindex="-1" role="menuitem">Save</a></li>
		    <li class="ui-menu-item" role="presentation"><a href="#" id="ui-id-4" class="ui-corner-all" tabindex="-1" role="menuitem">Delete</a></li>
	    </ul>--%>
    <ul id="ulListaReportes" runat="server">
        <%-- <li><a href="#">Open...</a></li>
            <li><a href="#">Save</a></li>
            <li><a href="#">Delete</a></li> --%>
    </ul>
    <eeg:ExportarExcel ID="eeListado" runat="server" Visible="false" />
    <uc1:ImportarExcelGenerico ID="ExcelImport" runat="server" Visible="false" />
    <div id="MsgConfirmacionEliminarLinea" runat="server" style="display: none;">
        <%--¿Desea dar de baja los dispositivos asociados de las líneas de tipo "Staff" seleccionadas?--%>
        ¿Desea desactivar los registros de los dispositivos asociados a las líneas seleccionadas
        si las tuviera?
        <br />
        <br />
        <%--Los dispositivos asociados a las líneas del tipo "Familia" seleccionadas se darán de baja--%>
        <%--Los dispositivos asociados a las líneas seleccionadas del tipo "Staff" pueden darse de baja o liberarse--%>
        Los empleados asociados a las líneas seleccionadas serán desvinculados de estas
    </div>
    </form>
</body>
</html>
