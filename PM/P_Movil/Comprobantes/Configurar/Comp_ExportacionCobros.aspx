<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Comp_ExportacionCobros.aspx.vb"
    Inherits=".Comp_ExportacionCobros" %>

    <%@ Register Src="../../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <link href="../../../Common/Styles/jquery.datetimepicker.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery.datetimepicker.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Comp_ExportacionCobros.js" type="text/javascript"></script>
    <style type="text/css">
        .tdEtiquetaComprobante
        {
            width: 100px;
        }
        .tblTitulos
         {
            font-family: Arial, Helvetica, Verdana !important;font-size:11px !important;
            padding: 0px; margin-top: -5px; color: black;
         }
        
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfCod" runat="server" />
    <asp:HiddenField ID="hdfinTipOri" runat="server" />
    <asp:HiddenField ID="hdfProceso_Origen" runat="server" />
    <asp:HiddenField ID="hdfProceso_Destino" runat="server" />
    <asp:HiddenField ID="hdfPlantilla" runat="server" />
    <asp:HiddenField ID="hdfPlantillaD" runat="server" />
    <div id="dvCargando" class="dvCargando">
    </div>
    <div class="dvPanel" style="overflow: auto; width: 700px;">
           <table> <tr> <td><h4 class="tblTitulos"> Cargo de Comprobante de Equipo  </h4> </td> <td valign="top" style="width:500px;"> <div style="float:right; display: none;"><ttgInfo:ToolTipGenerico ID="ttgInfoTipos" runat="server" /></div></td> </tr></table>
        <table runat="server" id="tblEquipo" style="font-family: Arial, Helvetica, Verdana !important;font-size:11px !important;">
        </table>
        <br />
        <hr style="width: 90%; background-color: #A6C9E2; height: 2px; border: 0;" />
        <br />
        <h4 style="padding: 0px; margin-top: -5px; color: black" class="tblTitulos">
             Cargo de Comprobante de Servicio</h4>
        <table runat="server" id="tblServicio" style="font-family: Arial, Helvetica, Verdana !important;font-size:11px !important;">
        </table>
        <br />
        <hr style="width: 90%; background-color: #A6C9E2; height: 2px; border: 0;" />
        <br />
        <h4 style="padding: 0px; margin-top: -5px; color: black" class="tblTitulos">
            Abono de Nota de Crédito</h4>
        <table runat="server" id="tblNotaCredito" style="font-family: Arial, Helvetica, Verdana !important;font-size:11px !important;">
        </table>
    </div>
    <br />
    <div class="dvPanel" style="overflow: auto; width: 700px;">
       <h4 style="padding: 0px; margin-top: -5px; color: black" class="tblTitulos">
                Destino de Exportación</h4>
        <div id="dvPlantillaModal" style="display:none;">         
            <table>
                <tr>
                    <td>
                        <asp:Label ID="lblFuente" runat="server" Text="Fuente"></asp:Label>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlTipoFuente_D" runat="server" Width="260px">
                        </asp:DropDownList>
                    </td>
                </tr>
                <tr class="medio" style="display: none">
                    <td>
                        <asp:Label ID="Label1" runat="server" Text="Medio"></asp:Label>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlMedio_D" runat="server" Width="260px">
                        </asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span id="Span7">Ubicación de Importación</span>
                    </td>
                    <td colspan="2" class="auto-style2">
                        <asp:DropDownList ID="ddlUbicacion_D" runat="server" Width="260px">
                        </asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="Label2" runat="server" Text="Plantilla"></asp:Label>
                    </td>
                    <td colspan="2" class="auto-style2">
                        <asp:DropDownList ID="ddlPlantilla_D" runat="server" Width="260px">
                        </asp:DropDownList>
                        <div id="btnPlantilla" class="btnNormal">
                            ...</div>
                    </td>
                </tr>
            </table>
        </div>
          <div id="btnMostrarPlantilla" class="btnNormal" style="margin-left:610px; margin-bottom:5px;"><img src="../../../Common/Images/Mantenimiento/add_16x16.gif" />Agregar
        </div>
        <table id="grid" runat="server">
        </table>
        <div id="pager">
        </div>
    </div>
    <br />
    <div class="dvPanel" style="overflow: auto; width: 700px;" title="Puede ingresar más de un email separados por ';'">
        <h4 style="padding: 0px; margin-top: -5px; color: black" class="tblTitulos">
                Notificación de ejecución de exportación</h4>
        <table style="font-family: Arial, Helvetica, Verdana !important;font-size:11px !important;">
            <tr>
                <td class="auto-style2">
                    <asp:Label ID="lblCorreo" runat="server" Text="Correo(s)"></asp:Label>
                </td>
                <td style="padding-left: 15px;">
                    <asp:TextBox runat="server" ID="txtCorreo" Width="500px" ToolTip="Puede ingresar más de un email separados por ';'"></asp:TextBox>
                </td>
                <td>
                    <ttgInfo:ToolTipGenerico ID="ttgInfoCorreo" runat="server" />
                </td>
            </tr>
        </table>
    </div>
    <br/>
    <div style="text-align: left;">
        <div id="btnGuardar" class="btnNormal">
            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
            <a>Guardar</a>
        </div>
        <div id="btnCerrar" class="btnNormal">
            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
            <a>Cerrar</a>
        </div>
    </div>
    <div id="PanelCampos" style="overflow: auto; width: 600px; display: none;">
        <table id="grPlantilla" runat="server">
        </table>
        <div id="pager2">
        </div>
    </div>
    </form>
</body>
</html>
