<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="MDM_ConfiguraSincronizacion.aspx.vb" Inherits=".MDM_ConfiguraSincronizacion" %>

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

    <link href="../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/anytime.js" type="text/javascript"></script>

    <style type="text/css">
        .AnyTime-secs{
            display: none;
        }
    </style>

</head>
<body>
    <input type="hidden" id="txtfecha_" />
    <form id="form1" runat="server">
        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("MDM_ConfiguraSincronizacion.js")%>" type="text/javascript"></script>
        <div class="dvPanel" id="dvPrincipal">
            <table width="100%" border="0">                
                <tr>
                    <td>
                        <div class="dvPanel">
                            <table width="100%" border="0">
                                <tbody>
                                    <tr>
                                        <td>
                                            <label class="h6" style="margin-top: 0px;">Intervalos de Semaforización</label>
                                            <div class="col-xs-12 col-sm-12" style="margin-bottom: 10px;">
                                                <div class="form-group">
                                                    <label class="col-xs-3 control-label" for="demo-text-input">Tipo de intervalo:&nbsp</label>
                                                    <div class="col-xs-4">
                                                        <select name="ddlConfiguracion" id="ddlConfiguracion" style="width: 100%;" onchange="CambiaLeyendaColor()">
                                                            <option value="SEMANAS">Semanas</option>
                                                            <option value="DIAS">Días</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xs-12 col-sm-12" style="margin-bottom: 5px;">
                                                <div class="form-group">
                                                    <label class="col-xs-3 control-label" for="demo-text-input"><span class="fa fa-circle" style="font-size: 20px; color: #33FF3F"></span></label>
                                                    <div class="col-xs-2 col-sm-2">
                                                        <input type="text" id="txtVerde" runat="server" value="" style="width: 100%; text-align:center;"  />
                                                    </div>
                                                    <div class="col-xs-4 col-sm-4">
                                                        <label id="lblVerde" style="color:#878787; padding-top:5px;"></label>
                                                    </div>
                                                    <div class="col-xs-3 col-sm-3">
                                                        <asp:CheckBox ID="chkCorreoVerde" runat="server" /><span>&nbsp Enviar Correo</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xs-12 col-sm-12" style="margin-bottom: 5px;">
                                                <div class="form-group">
                                                    <label class="col-xs-3 control-label" for="demo-text-input"><span class="fa fa-circle" style="font-size: 20px; color: #FFF933"></span></label>
                                                    <div class="col-xs-2 col-sm-2">
                                                        <input type="text" id="txtAmarillo" runat="server" value="" style="width: 100%; text-align:center;"  />
                                                    </div>
                                                    <div class="col-xs-4 col-sm-4">
                                                        <label id="lblAmarillo" style="color:#878787; padding-top:5px;"></label>
                                                    </div>
                                                    <div class="col-xs-3 col-sm-3">
                                                        <asp:CheckBox ID="chkCorreoAmarillo" runat="server" /><span>&nbsp Enviar Correo</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xs-12 col-sm-12" style="margin-bottom: 5px;">
                                                <div class="form-group">
                                                    <label class="col-xs-3 control-label" for="demo-text-input"><span class="fa fa-circle" style="font-size: 20px; color: #FE9A00"></span></label>
                                                    <div class="col-xs-2 col-sm-2">
                                                        <input type="text" id="txtNaranaja" runat="server" value="" style="width: 100%; text-align:center;" />
                                                    </div>
                                                    <div class="col-xs-4 col-sm-4">
                                                        <label id="lblNaranja" style="color:#878787; padding-top:5px;"></label>
                                                    </div>
                                                    <div class="col-xs-3 col-sm-3">
                                                        <asp:CheckBox ID="chkCorreoNaranja" runat="server" /><span>&nbsp Enviar Correo</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xs-12 col-sm-12" style="margin-bottom: 5px;">
                                                <div class="form-group">
                                                    <label class="col-xs-3 control-label" for="demo-text-input"><span class="fa fa-circle" style="font-size: 20px; color: #FE2E00"></span></label>
                                                    <div class="col-xs-2 col-sm-2">
                                                        <input type="text" id="txtRojo" runat="server" value="" style="width: 100%; text-align:center;" />
                                                    </div>
                                                    <div class="col-xs-4 col-sm-4">
                                                        <label id="lblRojo" style="color:#878787; padding-top:5px;"></label>
                                                    </div>
                                                    <div class="col-xs-3 col-sm-3">
                                                        <asp:CheckBox ID="chkCorreoRojo" runat="server" /><span>&nbsp Enviar Correo</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xs-12 col-sm-12" style="margin-bottom: 5px;">
                                                <label id="lblGeneralCorreo" style="color: #878787; padding-top: 10px;"></label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label class="h6" style="margin-top: 10px;">Programación de alerta</label>
                                            <div class="col-xs-12 col-sm-12" style="margin-bottom: 2px;">
                                                <label id="lblInfoCorreo" style="color: #878787; padding-top: 10px;">* Registrar los correos separados por punto y coma(;)</label>
                                            </div>
                                            <div class="col-xs-12 col-sm-12" style="margin-bottom: 10px;">
                                                <div class="form-group">
                                                    <label class="col-xs-3 control-label" for="demo-text-input">Correo:&nbsp</label>
                                                    <div class="col-xs-7 col-sm-7">
                                                        <input type="text" id="txtCorreoEnvio" runat="server" value="" style="width: 100%;" />
                                                    </div>

                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-12">
                                                <div class="form-group">
                                                    <label class="col-xs-3 control-label" for="demo-text-input">Día y Hora:&nbsp</label>
                                                    <div class="col-xs-3">
                                                        <select name="ddlDiaEnvio" id="ddlDiaEnvio" style="width: 100%;">
                                                            <option value="LUNES">Lunes</option>
                                                            <option value="MARTES">Martes</option>
                                                            <option value="MIERCOLES">Miércoles</option>
                                                            <option value="JUEVES">Jueves</option>
                                                            <option value="VIERNES">Viernes</option>
                                                            <option value="SABADO">Sábado</option>
                                                            <option value="DOMINGO">Domingo</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-xs-4">
                                                        <asp:TextBox ID="txthora" runat="server" Width="100%" CssClass="txthora" Text="00:00:00"></asp:TextBox> &nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label class="h6" style="margin-top: 10px;">Programación de sincronización</label>
                                            <div class="col-xs-12 col-sm-12">
                                                <div class="form-group">
                                                    <label class="col-xs-3 control-label" for="demo-text-input">Día y Hora:&nbsp</label>
                                                    <div class="col-xs-3">
                                                        <select name="ddlDiaSincronizacion" id="ddlDiaSincronizacion" style="width: 100%;">
                                                            <option value="TODOS">Todos los días</option>
                                                            <option value="LUNES">Lunes</option>
                                                            <option value="MARTES">Martes</option>
                                                            <option value="MIERCOLES">Miércoles</option>
                                                            <option value="JUEVES">Jueves</option>
                                                            <option value="VIERNES">Viernes</option>
                                                            <option value="SABADO">Sábado</option>
                                                            <option value="DOMINGO">Domingo</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-xs-4">
                                                        <asp:TextBox ID="txtHoraSincronizacion" runat="server" Width="100%" CssClass="txthora" Text="00:00:00"></asp:TextBox> &nbsp;
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

            </table>
            
        </div>

        <div class="col-sm-12 col-xs-12">
            <p style="text-align: center; margin-top: 10px; margin-bottom: 15px;">
                <button type="button" id="btnGuardarConfig" onclick="GuardarConfiguracion()" class="btn btn-primary">
                    Guardar
                </button>
            </p>
        </div>
    </form>
</body>
</html>
