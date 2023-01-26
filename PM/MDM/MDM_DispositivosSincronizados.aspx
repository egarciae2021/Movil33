<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="MDM_DispositivosSincronizados.aspx.vb" Inherits=".MDM_DispositivosSincronizados" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register TagName="ExportarExcel" Src="~/Common/Controles/ExportarExcelGenerico.ascx"
    TagPrefix="eeg" %>

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
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("MDM_DispositivosSincronizados.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfPerfiles" runat="server" Value=""/>
        <asp:HiddenField ID="hdfIdDominio" runat="server" Value=""/>
        <asp:HiddenField ID="hdfIdGateway" runat="server" Value=""/>
        <div class="dvPanel" id="dvPrincipal">
            <table width="100%" border="0">
                <tr>
                    <td>
                        <div class="dvPanel">
                            <table width="100%" border="0">
                                <tbody>
                                    <tr>
                                        <%--<td style="width: 40px; padding-right: 10px;">--%>
                                        <td style="width: 40px; padding-right: 10px;">
                                            <div class="form-group col-md-2" style="margin-bottom: 0px;">                                               

                                                <table id="TableBtn" runat="server" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td>
                                                            <table id="tblAvanzada" runat="server" cellpadding="0" cellspacing="0">
                                                                <tr id="trAvanzada" runat="server">
                                                                </tr>
                                                            </table>
                                                        </td>
                                                        <td>
                                                            <div id="btnConfigurar" class="btnNormal" runat="server" title="Configurar Semáforización" click="fnConfiguracionSemaforo">
                                                                <asp:Image ID="imgDownload" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Configurar.png" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                            
                                        </td>
                                        <td>
                                            <div class="form-group col-xs-12 col-sm-4" style="margin-bottom: 0px;">
                                                <div class="col-md-2" style="padding-top:10px ">
                                                    <label class="col-xs-2 control-label" for="demo-text-input">Filtro:&nbsp</label>
                                                </div>

                                                <div class="col-md-6 col-sm-8 col-xs-8">
                                                    <div class="control-label" style="text-align: left">
                                                        <select class="form-control" id="ddlBusqueda" name="ddlBusqueda" style="width: 100%;">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-group col-xs-12 col-sm-4" style="margin-bottom: 0px;">
                                                <div class="col-md-2" style="padding-top:10px ">
                                                    <label class="col-xs-2 control-label" for="demo-text-input">Buscar:&nbsp</label>
                                                </div>

                                                <div class="col-md-6 col-sm-8 col-xs-8">
                                                    <div class="control-label" style="text-align: left">
                                                        <input class="form-control" type="text" id="txtBusqueda" runat="server" value="" style="width: 100%;" />
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
                        <div class="dvPanel" id="dvDispositivoSincronizados" style="display:none;">
                            <table width="100%" border="0">
                                <tr style="height: 25px;">
                                    <td>
                                        <div id="dvModelo">
                                            <table id="tbDispositivos"></table>
                                            <div id="PaginadorModelo">
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

        <div id="dvConfiguracion" style="display:none; padding:0px; margin:0px;">
            <iframe id="ifAplicaciones" frameborder="0" style="padding:0px; margin:0px;"></iframe>
        </div>
        
        <div id="dvConfirmacion" style="display:none">
            <p>
                <asp:Label ID="Mensaje" Text="" runat="server"></asp:Label>
            </p>
            <span>¿Desea continuar?</span>
        </div>
        <iframe id="ifExcel" frameborder="0" style="padding: 0px; margin: 0px; display: none;"></iframe>

        <eeg:ExportarExcel ID="eeListado" runat="server" Visible="false" />
    </form>
</body>
</html>
