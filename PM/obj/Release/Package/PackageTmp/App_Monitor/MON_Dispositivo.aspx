<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="MON_Dispositivo.aspx.vb" Inherits=".MON_Dispositivo" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register TagPrefix="eeg" TagName="ExportarExcelGenerico" Src="~/Common/Controles/ExportarExcelGenerico.ascx" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jquery.contextmenu.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jqGrid443/jquery.jqGrid.min.js" type="text/javascript"></script>
    <link href="../Common/Scripts/dynaTree/ui.dynatree.css" rel="stylesheet" type="text/css" id="skinSheet" />
    <link href="../Content/css/shared/bootstrap.min.css" rel="stylesheet" />
    <link href="../Content/css/shared/nifty.min.css" rel="stylesheet" />
    <link href="../Content/css/shared/font-awesome.min.css" rel="stylesheet" />
    <link href="../Content/css/shared/nifty-demo-icons.min.css" rel="stylesheet" />
    <%--<script type="text/javascript" src="../Content/js/shared/jquery_1.7.2/bootstrap.min.js"></script>--%>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../Common/Scripts/dynaTree/jquery.dynatree-1.2.4.js" type="text/javascript"></script>

    <link href="../Common/Scripts/select2/select2.min.css" rel="stylesheet" />
    <script src="../Common/Scripts/select2/select2.min.js" type="text/javascript"></script>

</head>
<body>
    <form id="form1" runat="server">
        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("MON_Dispositivo.js")%>" type="text/javascript"></script>
        <div class="dvPanel" id="dvPrincipal">
            <table width="100%" border="0">
                <tr>
                    <td>
                        <div class="dvPanel">
                            <table width="100%" border="0">
                                <tbody>
                                <tr>                                    
                                    <td>
                                        <div class="col-xs-12 col-sm-3">
                                            <div class="form-group">
                                                <label class="col-xs-3 control-label" for="demo-text-input">Vista:&nbsp</label>
                                                <div class="col-xs-9">
                                                    <select name="ddlTipoVista" id="ddlTipoVista" style="width: 100%;">
                                                        <option value="1">Dispositivo</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-xs-12 col-sm-3">
                                            <div class="form-group">
                                                <label class="col-xs-3 control-label" for="demo-text-input">Buscar:&nbsp</label>
                                                <div class="col-xs-9">
                                                    <select name="ddlBusqueda" id="ddlBusqueda" style="width: 100%;">

                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-xs-12 col-sm-3">
                                            <div class="form-group">
                                                <label class="col-xs-3 control-label" for="demo-text-input">Filtrar:&nbsp</label>
                                                <div class="col-xs-9">
                                                    <input type="text" id="txtBusqueda" runat="server" value="" style="width: 100%;"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-xs-12 col-sm-3">
                                            <div class="form-group">
                                                <label class="col-xs-3 control-label" for="demo-text-input">Ver:&nbsp</label>
                                                <div class="col-xs-9">
                                                    <select name="ddlTipoVista" id="ddlTipoVista2" style="width: 100%;">
                                                        <option value="1">Administrados</option>
                                                        <option value="2">No administrados</option>
                                                        <option value="3">Todos</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-xs-12 col-sm-3">
                                            <div class="form-group">
                                                <div class="col-md-8">
                                                    <button id="btnGenerarCodigoMasivo" type="button" style="display:none; width: 100%" class="btn btn-primary">Generar Códigos Masivos</button>
                                                </div>
                                            </div>                                            
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="dvPanel" id="dvDispositivoLista" style="display: none;">
                            <table width="100%" border="0">
                                <tr style="height: 25px;">
                                    <td>
                                        <div id="dvDispo">
                                            <table id="tbDispositivo"></table>
                                            <div id="PaginadorDispositivo">
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="dvDispositivo" style="display:none; padding:0px; margin:0px;">
            <iframe id="ifDispositivo" frameborder="0" style="padding:0px; margin:0px;"></iframe>
        </div>
        <div id="dvAplicaciones" style="display:none; padding:0px; margin:0px;">
            <iframe id="ifAplicaciones" frameborder="0" style="padding:0px; margin:0px;"></iframe>
        </div>
        <div id="dvConfirmacion" style="display:none">
            <p>
                <asp:Label ID="Mensaje" Text="" runat="server"></asp:Label>
            </p>
            <span>¿Desea continuar?</span>
        </div>
    </form>
</body>
</html>
