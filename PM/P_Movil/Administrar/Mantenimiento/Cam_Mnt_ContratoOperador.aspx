<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Cam_Mnt_ContratoOperador" Codebehind="Cam_Mnt_ContratoOperador.aspx.vb" %>
<%@ Register Src="../../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/VistaModelo/MOV_CAM_Contrato.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/date.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="Cam_Mnt_ContratoOperador.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfCodigoContrato" runat="server"/>
        <asp:HiddenField ID="hdfCodigoConfiguracion" runat="server"/>
        <div id="dvContenido">
            <div id="dvCampos" class="dvPanel" style="overflow: auto;">
                <table id="tbCampos" width="100%">
                <%--data-bind="style: { display: IdContratoEditado() ? '' : 'none' }" --%>
                    <tr id="trEstado" data-bind="style: { display: IdContratoEditado() ? '' : 'none' }">                    
                        <td class="tdEtiqueta"  style="width: 150px">
                            <asp:Label ID="lblActivo" runat="server" text="Activo"></asp:Label>
                        </td>
                        <td>
                            <input id="chkVigente" type="checkbox" data-bind="checked: Vigente"/>
                        </td>
                    </tr>

                    <tr style="display:none;">
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblCodigoCab" runat="server" Text="Código de Contrato(Interno)"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtCodigo" runat="server" data-bind="value:Codigo, enable: Vigente" Width="150px"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblOperadorCab" runat="server" Text="Operador"></asp:Label>                        
                        </td>
                        <td class="">
                            <asp:DropDownList ID="ddlOperador" Width="310px" runat="server" data-bind="value: IdOperador, enable: Vigente"></asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblCodigoProveedorCab" runat="server" Text="Código de Contrato(Operador)"></asp:Label>
                        </td>
                        <td class="">
                            <asp:TextBox ID="txtCodigoProveedor" runat="server" data-bind="value:CodigoProveedor, enable: Vigente" Width="300px">
                            </asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblDescripcionCab" runat="server" Text="Descripción"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtDescripcion" TextMode="MultiLine" runat="server" data-bind="value:Descripcion, enable: Vigente" Width="410px" Height="130px" style="resize: none;"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblFechaInicioCab" runat="server" Text="Fecha Inicio"></asp:Label>
                        </td>
                        <td class="">
                            <asp:TextBox ID="txtFechaInicio" runat="server" CssClass="DATE" Width="80px" data-bind="value:FechaInicioAnsi, enable: Vigente">
                            </asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblFechaFinCab" runat="server" Text="Fecha Fin"></asp:Label>
                        </td>
                        <td class="">
                            <asp:TextBox ID="txtFechaFin" runat="server" CssClass="DATE" Width="80px" data-bind="value:FechaFinAnsi, enable: Vigente">
                            </asp:TextBox>
                        </td>
                    </tr>
                    <tr data-bind="style: { display: Duracion() < 0 || Duracion()==null || Duracion()==undefined ? 'none' : '' }">
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblDuracionCab" runat="server" Text="Duración(Meses)"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lblDuracion" runat="server" Text="" data-bind="text:Duracion"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblRutaContratoCab" runat="server" Text="Archivo Adjunto"></asp:Label>
                        </td>
                        <td class="" colspan="3" id="tdIfCargaImagen">
                            <table cellpadding="0" cellspacing="0"data-bind="style: { display: RutaContratoTemporal() ? '' : 'none' }">
                                <tr>
                                    <td>
                                        <asp:Label ID="lblRutaContrato" runat="server" Text="" CssClass="lblDescargar" 
                                                   data-bind="text:ArchivoOriginal, click:AbrirAdjunto">
                                        </asp:Label>
                                    </td>
                                    <td>
                                        &nbsp;
                                        <img id="btnEliminarContrato" alt="" src="../../../Common/Images/Mantenimiento/delete_16x16.gif" class="imgBtn" 
                                             title="Eliminar Adjunto" data-bind="click: QuitarAdjunto, style: { display: Vigente() ? '' : 'none' }"/>
                                    </td>
                                </tr>
                            </table>
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <iframe id="ifCargarImagen" frameborder="0" style="padding: 0px; margin: 0px; height: 33px; width:410px;" 
                                                src="../../../Common/Page/Adm_CargarArchivo.aspx?Formatos=&FormatoTipo=" 
                                                data-bind="style: { display: Vigente() ? '' : 'none' }">
                                        </iframe>
                                    </td>
                                    <td>
                                        <div id="dvInformacion" runat="server">
                                            <ttgInfo:ToolTipGenerico ID="ttgExtensiones" runat="server" Mensaje="Extensiones Permitidas: txt,doc,docx,xls,xlsx,pdf,jpg,png" />
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
<%--                    <tr data-bind="style: { display: IdContratoEditado() ? '' : 'none' }">
                        <td class="tdEtiqueta"  style="width: 150px">
                            <asp:Label ID="LblEstado" runat="server" text="Activo"></asp:Label>
                        </td>
                        <td>
                            <input id="chkEstado" type="checkbox" data-bind="checked: Vigente"/>
                        </td>
                    </tr>--%>

                </table>
                <cc1:TabJQ ID="tabContenido" runat="server" CssClass="tabs" Width="300px" style="margin: 0px; padding: 0px; display:none;">
                    <cc1:ContenedorTabJQ ID="tbTarifas" Titulo="Tarifas">
                        <div id="dvTarifas" style="height: 120px; width:290px; overflow:auto; padding:3px;"><br />
                            <table data-bind='visible: MOV_CAM_ContratoTarifa().length > 0'>
                                <tbody data-bind='foreach: MOV_CAM_ContratoTarifa'>
                                    <tr>
<%--                                        <td>
                                            <input id="chkActivo1" type="checkbox" data-bind="attr: { checked: Tarifa==-1 ? '' : 'checked' }"/>
                                        </td>--%>
                                        <td Width="100px">
                                            <asp:Label ID="lblServicio1" runat="server" data-bind='text: Descripcion'></asp:Label>
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtServicioValor1" runat="server" Width="100px" data-bind='value: Tarifa'></asp:TextBox>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </cc1:ContenedorTabJQ>
                    <cc1:ContenedorTabJQ ID="tbCantidades" Titulo="Cantidades">                    
                        <div id="dvCantidades" style="height: 120px; width:290px; overflow:auto; padding:3px;"><br />
                            <table data-bind='visible: MOV_CAM_ContratoCantidad().length > 0'>
                                <tbody data-bind='foreach: MOV_CAM_ContratoCantidad'>
                                    <tr>
<%--                                        <td>
                                            <input id="chkActivo2" type="checkbox" data-bind="attr: { checked: Cantidad==-1 ? '' : 'checked' }"/>
                                        </td>--%>
                                        <td Width="100px">
                                            <asp:Label ID="lblServicio2" runat="server" data-bind='text: Descripcion'></asp:Label>
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtServicioValor2" runat="server" Width="100px" data-bind='value: Cantidad'></asp:TextBox>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </cc1:ContenedorTabJQ>
                </cc1:TabJQ>
            </div>
            <div id="dvAcciones" style="margin-top:2px;">
                <div id="btnGuardar" class="btnNormal">
                    <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                    <a>Guardar</a>
                </div>
                <div id="btnCerrar" class="btnNormal">
                    <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    <a>Cerrar</a>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
