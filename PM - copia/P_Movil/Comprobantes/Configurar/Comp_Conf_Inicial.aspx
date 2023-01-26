<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Comp_Conf_Inicial.aspx.vb"
    Inherits="Comp_Conf_Inicial" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register Src="../../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico"
    TagPrefix="ttgInfo" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <link href="../../../Common/Styles/ui.spinner.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/ui.spinner.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Comp_Conf_Inicial.js" type="text/javascript"></script>
    <style type="text/css">
        .style1
        {
            width: 143px;
        }
        .style2
        {
            width: 170px;
        }
        
        .tdEtiqueta
        {
            width: 200px !important;
        }
        .spinner
        {
            font-weight: bold;
            width: 24px;
            overflow: hidden;
            border: 1px outset;
            font-size: 5pt;
        }
        .style10
        {
            width: 90px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfIdComprobanteConf" runat="server" />
    <div class="dvPanel" style="overflow: auto;">
        <h3 style="padding: 0px; margin-top: -5px; color: #E1701F">
            Valores Iniciales</h3>
        <table style="margin-left: 15px;">
            <tr height="20px">
                <td valign="top" class="tdEtiqueta" style="width: 200px;">
                    <b style="font-size: 12px; color: black">Comprobante de Pago</b>
                </td>
            </tr>
            <tr>
                <td class="style1" style="width: 200px;">
                    <asp:Label ID="lblserieCP" runat="server" Text="N° de Serie"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtSerieCP" runat="server" Width="70px" MaxLength="4"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="style1">
                    <asp:Label ID="lblCorrelativoCP" runat="server" Text="N° Correlativo"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtCorrelativoCP" runat="server" Width="100px" MaxLength="10"></asp:TextBox>
                </td>
            </tr>
        </table>
        <br />
        <table style="margin-left: 15px;">
            <tr height="20px">
                <td valign="top" class="tdEtiqueta">
                    <b style="font-size: 12px; color: black">Notas de Crédito</b>
                </td>
            </tr>
            <tr>
                <td class="style1" style="width: 200px;">
                    <asp:Label ID="Label1" runat="server" Text="N° de Serie"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtSerieNT" runat="server" Width="70px" MaxLength="4"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="style1">
                    <asp:Label ID="Label2" runat="server" Text="N° Correlativo"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtCorrelativoNT" runat="server" Width="100px" MaxLength="10"></asp:TextBox>
                </td>
            </tr>
        </table>
    </div>
    <br />
    <div class="dvPanel" style="overflow: auto;">
        <h3 style="padding: 0px; margin-top: -5px; color: #E1701F">
            Cobros por documento</h3>
        <table width="600px" style="margin-left: 15px;">
            <tr>
                <td class="" style="width: 200px;">
                    <b style="font-size: 12px;">Tipo Producto</b>
                </td>
                <td class="">
                    <b style="font-size: 12px;">N° de Cuotas</b>
                </td>
            </tr>
            <tr>
                <td class="">
                    <asp:Label ID="Label4" runat="server" Text="Comprobantes de Equipo"></asp:Label>
                </td>
                <td class="">
                    <asp:TextBox ID="txtComproEq" runat="server" Width="50px" MaxLength="1"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="">
                    <asp:Label ID="Label3" runat="server" Text="Comprobantes de Servicio"></asp:Label>
                </td>
                <td class="">
                    <asp:TextBox ID="txtComproSrv" runat="server" Width="50px" MaxLength="1"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="">
                    <asp:Label ID="Label5" runat="server" Text="Notas de Crédito"></asp:Label>
                </td>
                <td class="">
                    <asp:TextBox ID="txtNotaCre" runat="server" Width="50px" MaxLength="1"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <div id="dvCondiciones" style="padding-left: 10px; padding-top: 8px; display: none;
                        font-weight: bold;">
                        <asp:Label runat="server" ID="lblCondicion" ForeColor="#CC0000" Font-Size="10px">
                            * Existen Comprobantes de Pago emitidos que aún no han sido cobrados. Para cambiar de configuración <br />de los cobros por documento, se requiere no tener cobros pendientes de pago.
                        </asp:Label>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <br />
    <div class="dvPanel" style="overflow: auto;">
        <h3 style="padding: 0px; margin-top: -5px; color: #E1701F">
            General</h3>
        <table style="margin-left: 15px;">
            <tr>
                <td class="style2" style="width: 200px;">
                    <asp:Label ID="Label6" runat="server" Text="Establecer margen de conciliación"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtMargen" runat="server" ReadOnly="true" Width="50px"></asp:TextBox>
                    <asp:Label ID="Label8" runat="server" Text="%"></asp:Label>
                </td>
            </tr>
            <tr>
                <td class="style2" style="width: 200px;">
                    <asp:Label ID="Label11" runat="server" Text="Restringir el dar de bajas a líneas desde Mantenimiento"></asp:Label>
                </td>
                <td>
                    <asp:CheckBox ID="chkLineaBaja" runat="server" Text="" />
                </td>
            </tr>
            <tr>
                <td class="tdEtiqueta" style="width: 200px; vertical-align: top;">
                    <div id="idlogo" style="margin-top: 20px; width: 200px;">
                        <asp:Label ID="Label7" runat="server" Text="Ingrese firma digital"></asp:Label>
                    </div>
                </td>
                <td>
                    <iframe id="ifCargaIcono" frameborder="0" style="padding: 0px; margin: 0px; margin-left: 0px;"
                        width="500px" height="120px;"></iframe>
                    <%--<iframe id="ifCargaIcono" frameborder="0" style="padding: 0px; margin: 0px; height: 33px; width:482px;" 
                                        src="../../../Common/Page/Adm_CargarArchivo.aspx?Formatos=&FormatoTipo=">
                                </iframe> --%>
                </td>
            </tr>
        </table>
    </div>
    <br />
  <%--  <div class="dvPanel" style="overflow: none;">
        <h3 style="padding: 0px; margin-top: -5px; color: #E1701F">
            Firma</h3>
        <table style="margin-left: 15px; margin-top: -25px;">
        </table>
    </div>--%>
    <br />
    <div class="dvPanel" style="overflow: auto;">
        <h3 style="padding: 0px; margin-top: -5px; color: #E1701F">
            Configuración de Servicio</h3>
        <table style="margin-left: 15px;">
            <tr>
                <td class="style2" style="width: 200px;">
                    <asp:Label ID="Label9" runat="server" Text="Días útiles"></asp:Label>
                </td>
                <td>
                    <asp:CheckBox ID="chkLunUtil" runat="server" Text="Lunes" />&nbsp;
                    <asp:CheckBox ID="chkMarUtil" runat="server" Text="Martes" />&nbsp;
                    <asp:CheckBox ID="chkMierUtil" runat="server" Text="Miercoles" />&nbsp;
                    <asp:CheckBox ID="chkJueUtil" runat="server" Text="Jueves" />&nbsp;
                    <asp:CheckBox ID="chkVierUtil" runat="server" Text="Viernes" />&nbsp;
                    <asp:CheckBox ID="chkSabUtil" runat="server" Text="Sábado" />&nbsp;
                    <asp:CheckBox ID="chkDomUtil" runat="server" Text="Domingo" />&nbsp;
                </td>
            </tr>
            <tr>
                <td class="style2" style="width: 200px;">
                    <asp:Label ID="Label10" runat="server" Text="Considerar Feriados como útil"></asp:Label>
                </td>
                <td>
                    <asp:CheckBox ID="chkFeriadoUtil" runat="server" Text="" />
                </td>
            </tr>
        </table>
        <br/><br/>
        <h3 style="padding: 0px; margin-top: -5px; color: #E1701F">
            Eliminar historial archivos procesados</h3>
        <table style="margin-left: 15px;">
            <tr>
                <td class="style2" style="width: 200px;">
                    <asp:Label ID="Label12" runat="server" Text="Archivos anteriores a"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtDiasEliminacion" MaxLength="3" runat="server" ReadOnly="False" Width="50px"></asp:TextBox>
                    <asp:Label ID="lblDias" runat="server" Text="días"></asp:Label>
                </td>
            </tr>
        </table>
    </div>
    <br />
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
    </form>
</body>
</html>
