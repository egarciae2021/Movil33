<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Mnt_List_Orden_Servicio.aspx.vb" Inherits=".Mnt_List_Orden_Servicio" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../../../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>    
    <script src="../../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js"  type="text/javascript"></script>
    <script src="../../../../Common/Scripts/date.js"  type="text/javascript"></script>
    <script src="../../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Mnt_List_Orden_Servicio.js" type="text/javascript"></script>
    <style type="text/css">
        .dvCargandoMnt
        {
            background: url('../../../../Common/Images/Mantenimiento/Cargando.gif') no-repeat right center;
            width: 64px;
            height: 64px;
            top: 36%;
            left: 50%;
            z-index: 20;
            position: fixed;
            display: block;
        }
        .style1
        {
            text-align: right;
        }

        .demo-section label {
            display: block;
            margin: 15px 0 5px 0;
        }

        .k-multiselect {
            padding: 0px !important;
            border: 1px solid rgb(221, 221, 221) !important;
        }


    </style>
</head>
<body>
    <div id="dvCargandoMnt" class="dvCargandoMnt">
    </div>
    <form id="form1" runat="server">
     <asp:HiddenField ID="hdfOpcionPrincipal" runat="server" />
     <asp:HiddenField ID="hdfdaFechaIni" runat="server" />
     <asp:HiddenField ID="hdfdaFechaFin" runat="server" />
    <div class="dvPanel" style="overflow: auto;">
        <table align="center" width="90%">
            <tr>
                <td class="style1">
                    Tipo Solicitud:</td>
                <td>
                    <asp:DropDownList ID="ddlTipoSolicitud" runat="server" Width="330px" multiple="multiple" data-placeholder="Seleccione Tipo Solicitud...">
                    </asp:DropDownList>
                </td>
                <td style="text-align: right">
                    <strong>&nbsp;&nbsp;&nbsp; </strong>Organización:
                </td>
                <td>
                    <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td>
                                <asp:TextBox ID="txtNomOrganizacion" ReadOnly="true" runat="server" Width="330px" Text=" <Todos>" Height="20px"></asp:TextBox>
                                <asp:HiddenField ID="hdfCodOrganizacion" runat="server" Value="-1" />
                            </td>
                            <td>
                                &nbsp;
                                <div id="btnAgregarOrga" class="btnNormal" runat="server" title="Seleccionar Organización">
                                    <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/buscar.png" />
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
                <td>

                </td>
            </tr>
            <tr>
                <td style="text-align: right">
                    Usuario:
                </td>
                <td>
                    <asp:DropDownList ID="ddlUsuario" runat="server" Width="330px" multiple="multiple" data-placeholder="Seleccione Usuario...">
                    </asp:DropDownList>
                </td>
                <td>
                    &nbsp; Rango de Fecha
                </td>
                <td>
                    De : <asp:TextBox ID="txtFechaIni" runat="server" Width="90px" ToolTip="Fecha Inicio" ReadOnly="True"></asp:TextBox>
                    &nbsp; &nbsp; &nbsp; - &nbsp; &nbsp; &nbsp;
                    Hasta: <asp:TextBox ID="txtFechaFin" runat="server" Width="90px" ToolTip="Fecha Fin" ReadOnly="True"></asp:TextBox>
                </td>
                <td>
                    <div id="btnMostrar" class="btnNormal" runat="server" title="Mostrar Reporte">
                        <asp:Image ID="imgBuscar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/FiltroAgregar_16x16.png" />
                        <a>Mostrar Reporte</a>
                    </div>
                </td>
            </tr>
            <tr style="display: none;">
                <td style="text-align: right">
                    Estados de Aprobación:
                </td>
                <td style="text-align: left">
                    <asp:DropDownList ID="ddlEstadoAprobacion" runat="server"  Width="330px" multiple="multiple" data-placeholder="Seleccione Estados de Aprobación...">
                    </asp:DropDownList>
                </td>
                <td style="text-align: right">
                    Estados de Proceso:
                </td>
                <td>
                    <asp:DropDownList ID="ddlEstadoProceso" runat="server"  Width="330px" multiple="multiple" data-placeholder="Seleccione Estados de Proceso...">
                    </asp:DropDownList>
                </td>
                <td>
                   <div id="btnLimpiar" class="btnNormal" runat="server" title="Limpiar" style="display: none; width: 138.06px">
                        <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Borrar.png" />
                        <a>Limpiar</a>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div class="dvPanel" style="overflow: auto; text-align: center; margin-top: 5px">
        <iframe id="ifReporteDevExpress" frameborder="0" style="padding: 0px; margin: 0px;
            width: 1024px;"></iframe>
    </div>
    <div id="dvArea" style="display: none; padding: 0px; margin: 0px;">
        <iframe id="ifArea" width="730" height="470" frameborder="0" style="padding: 0px;
            margin: 0px;"></iframe>
    </div>
    </form>
</body>
</html>
