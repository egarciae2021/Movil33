<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Cam_Mnt_Financiamiento"
    CodeBehind="Cam_Mnt_Financiamiento.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/knockout.validation.min.js"
        type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.combobox.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/VistaModelo/MOV_CAM_FinanciamientoTipo.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Cam_Mnt_Financiamiento.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfIdTipoFinanciamiento" runat="server" />
    <asp:HiddenField ID="hdfTipoFinancSituacion" runat="server" />
    <asp:HiddenField ID="hdfIdCliente" runat="server" />
    <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
    <div id="dvContenido">
        <div id="dvCampos" class="dvPanel" style="overflow: auto;">
            <table>
                <tr style="display: none;">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblActivo" runat="server" Text="Activo"></asp:Label>
                    </td>
                    <td>
                        <input id="chkEstado" type="checkbox" data-bind="checked: IdEstado" />
                    </td>
                </tr>
                <tr>
                    <td class="tdEtiqueta">
                        <asp:Label ID="txtCodigoCab" runat="server" Text="Código"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtCodigo" runat="server" MaxLength="25" data-bind="value:Codigo, enable: IdEstado"
                            Width="195"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="tdEtiqueta">
                        <asp:Label ID="txtDescripcionCab" runat="server" Text="Descripción"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtDescripcion" TextMode="MultiLine" runat="server" MaxLength="1000"
                            data-bind="value:Descripcion, enable: IdEstado" Width="400px" Height="100px"
                            Style="resize: none;"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="tdEtiqueta">
                        <asp:Label ID="txtDescripcionCortaCab" runat="server" Text="Descripción Corta"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtDescripcionCorta" runat="server" MaxLength="20" Width="195" data-bind="value:DescripcionCorta, enable: IdEstado"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblTipoLinea" runat="server" Text="Tipo Línea"></asp:Label>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlLineaTipo" runat="server" Width="249px" data-bind="value:inCodTip, enable: IdEstado">
                        </asp:DropDownList>
                    </td>
                </tr>
                <tr id="trPagoContadoCab">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblPagoContadoCab" runat="server" Text="Pago Contado"></asp:Label>
                    </td>
                    <td>
                        <input id="chkPagoContado" type="checkbox" data-bind="checked:PagoContado, enable: IdEstado" />
                    </td>
                </tr>
                <tr id="trPagoContadoDefinicion">
                    <td class="tdEtiqueta" colspan="2">
                        <div style="font-size: 8pt; margin-top: 3px; padding-left: 50px;">
                            <label>
                                <input type="radio" name="rblstPagoContado" value="1" />
                                <span>Definir Cuotas de Financiamiento por rango</span>
                            </label>
                            <br />
                            <label>
                                <input type="radio" name="rblstPagoContado" value="2" />
                                <span>Definir Cuotas de Financiamiento Predefinido</span>
                            </label>
                            <br />
                            <label>
                                <input type="radio" name="rblstPagoContado" value="3" />
                                <span>Definir Meses de Financiamiento Predefinido</span>
                            </label>
                            <%--<label>
                                    <input type="radio" name="rblstPagoContado" value="4"/>
                                    <span>Definido por usuario</span>
                                </label>--%>
                        </div>
                    </td>
                </tr>
                <tr id="trPagoContadoDefinicionRango" style="display: none;">
                    <td colspan="2">
                        <table style="padding-left: 50px;">
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="Label1" runat="server" Text="Mínimo de cuotas"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtPagoContadoMinimo" runat="server" MaxLength="2" data-bind='value: MinimoCuotas, enable: IdEstado'
                                        Width="50px" Style="text-align: right;"></asp:TextBox>
                                </td>
                                <td style="width: 20px;">
                                </td>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="Label5" runat="server" Text="Máximo de cuotas"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtPagoContadoMaximo" runat="server" MaxLength="2" data-bind='value: MaximoCuotas, enable: IdEstado'
                                        Width="50px" Style="text-align: right;"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trPagoContadoDefinicionPredefinido" style="display: none;">
                    <td colspan="2">
                        <table style="padding-left: 50px;">
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="Label6" runat="server" Text="Número de Cuotas"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtPagonContado" runat="server" MaxLength="2" data-bind='value: Cuotas, enable: IdEstado'
                                        Width="50px" Style="text-align: right;"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trPagoContadoDefinicionMeses1" style="display: none;">
                    <td colspan="2">
                        <table style="padding-left: 50px;">
                            <tr>
                                <td class="tdEtiqueta" style="width: 200px;">
                                    <asp:Label ID="Label8" runat="server" Text="Meses Pago de Cuotas"></asp:Label>
                                </td>
                                <td>
                                    <%--<asp:DropDownList ID="ddlMesesPagoCuotas" runat="server" Width="200px"></asp:DropDownList>--%>
                                    <div id="dvMesesPagoCuotas"><asp:TextBox ID="ddlMesesPagoCuotas" runat="server" Width="200px"></asp:TextBox></div>
                                    <div id="dvTexMesesPagoCuotas" style="display:none;"><asp:TextBox ID="txtMesesPagoCuotas" runat="server" disabled="true"></asp:TextBox></div>
                                </td>
                            </tr>
                            <%--<tr>
                                    <td class="tdEtiqueta" rowspan="2">
                                        <asp:Label ID="Label7" runat="server" text="Meses Pago de Cuotas"></asp:Label>
                                    </td>
                                    <td>
                                        <asp:DropDownList ID="ddlMesePagoContado" runat="server" Width="200px">
                                            <asp:ListItem Value="-1">&lt;Seleccione...&gt;</asp:ListItem>
                                            <asp:ListItem Value="1">Enero</asp:ListItem>
                                            <asp:ListItem Value="2">Febrero</asp:ListItem>
                                            <asp:ListItem Value="3">Marzo</asp:ListItem>
                                            <asp:ListItem Value="4">Abril</asp:ListItem>
                                            <asp:ListItem Value="5">Mayo</asp:ListItem>
                                            <asp:ListItem Value="6">Junio</asp:ListItem>
                                            <asp:ListItem Value="7">Julio</asp:ListItem>
                                            <asp:ListItem Value="8">Agosto</asp:ListItem>
                                            <asp:ListItem Value="9">Setiembre</asp:ListItem>
                                            <asp:ListItem Value="10">Octubre</asp:ListItem>
                                            <asp:ListItem Value="11">Noviembre</asp:ListItem>
                                            <asp:ListItem Value="12">Diciembre</asp:ListItem>
                                        </asp:DropDownList>
                                        <asp:Image ID="imgAgregarMesPagoContado" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"
                                            CssClass="imgBtn" ToolTip="Agregar" />
                                        <asp:Image ID="imgQuitarMesPagoContado" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif"
                                            CssClass="imgBtn" ToolTip="Quitar" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <asp:ListBox ID="lstMesesPagoContado" runat="server" Width="200px" Height="100px"></asp:ListBox>
                                    </td>       
                                </tr>--%>
                        </table>
                    </td>
                </tr>
                <tr id="trPagoContadoDefinicionMeses2" style="display: none;">
                    <%--<td>
                            <asp:ListBox ID="lstMesesPagoContado" runat="server" Width="200px" Height="100px"></asp:ListBox>
                        </td>--%>
                </tr>
                <tr id="trPeriodoGracia">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblPeriodoGraciaCab" runat="server" Text="Período de Gracia"></asp:Label>
                    </td>
                    <td>
                        <input id="chkPeriodoGracia" type="checkbox" data-bind="checked:PeriodoGracia, enable: IdEstado" />
                    </td>
                </tr>
                <tr id="trPeriodoGraciaNota" style="display: none;">
                    <td class="tdEtiqueta" colspan="2" style="font-style: italic;">
                        Nota: El periodo de gracia comenzará luego de la generación de la próxima cuenta
                        de cobro
                    </td>
                </tr>
                <tr id="trPeriodoGraciaDefinicion" style="display: none;">
                    <td class="tdEtiqueta" colspan="2">
                        <div style="font-size: 8pt; margin-top: 3px; padding-left: 50px;">
                            <label>
                                <input type="radio" name="rblstTipoPeriodoGracia" value="1" />
                                <span>Definir Período de Gracia por rango</span>
                            </label>
                            <br />
                            <label>
                                <input type="radio" name="rblstTipoPeriodoGracia" value="2" />
                                <span>Definir Período de Gracia Predefinido</span>
                            </label>
                        </div>
                    </td>
                </tr>
                <tr id="trMaximoMesesPeriodoGracia" style="display: none;">
                    <td colspan="2">
                        <table style="padding-left: 50px;">
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblMinimoMesesPeriodoGraciaCab" runat="server" Text="Mínimo Meses"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtMinimoMesesPeriodoGracia" runat="server" MaxLength="2" data-bind='value: MinimoMesesPeriodoGracia, enable: IdEstado'
                                        Width="50px" Style="text-align: right;"></asp:TextBox>
                                </td>
                                <td style="width: 20px;">
                                </td>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblMaximoMesesPeriodoGraciaCab" runat="server" Text="Máximo Meses"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtMaximoMesesPeriodoGracia" runat="server" MaxLength="2" data-bind='value: MaximoMesesPeriodoGracia, enable: IdEstado'
                                        Width="50px" Style="text-align: right;"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trMesesPeriodoGracia" style="display: none;">
                    <td colspan="2">
                        <table style="padding-left: 50px;">
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblMesesPeriodoGraciaCab" runat="server" Text="Meses Período Gracia"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtMesesPeriodoGracia" runat="server" MaxLength="2" data-bind='value: MesesPeriodoGracia, enable: IdEstado'
                                        Width="50px" Style="text-align: right;"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trCuotasDobles">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblCuotasDoblesCab" runat="server" Text="Cuotas Dobles"></asp:Label>
                    </td>
                    <td>
                        <input id="chkCuotasDobles" type="checkbox" data-bind="checked:CuotasDobles, enable: IdEstado" />
                    </td>
                </tr>
                <tr id="trMes" style="display: none;">
                    <td colspan="2">
                        <table style="padding-left: 50px;">
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblMesesCuotasDobles" runat="server" Text="Meses Cuotas Dobles"></asp:Label>
                                </td>
                                <td>
                                    <%--<asp:DropDownList ID="ddlMesesCuotasDobles" runat="server" Width="200px"></asp:DropDownList>--%>
                                    <asp:TextBox ID="ddlMesesCuotasDobles" runat="server" Width="200px"></asp:TextBox>
                                </td>
                            </tr>
                            <%--<tr>
                                    <td class="tdEtiqueta" rowspan="2">
                                        <asp:Label ID="lblMesesCuotasDobles" runat="server" text="Meses Cuotas Dobles"></asp:Label>
                                    </td>
                                    <td>
                                        <asp:DropDownList ID="ddlMes" runat="server" Width="200px">
                                            <asp:ListItem Value="-1">&lt;Seleccione...&gt;</asp:ListItem>
                                            <asp:ListItem Value="1">Enero</asp:ListItem>
                                            <asp:ListItem Value="2">Febrero</asp:ListItem>
                                            <asp:ListItem Value="3">Marzo</asp:ListItem>
                                            <asp:ListItem Value="4">Abril</asp:ListItem>
                                            <asp:ListItem Value="5">Mayo</asp:ListItem>
                                            <asp:ListItem Value="6">Junio</asp:ListItem>
                                            <asp:ListItem Value="7">Julio</asp:ListItem>
                                            <asp:ListItem Value="8">Agosto</asp:ListItem>
                                            <asp:ListItem Value="9">Setiembre</asp:ListItem>
                                            <asp:ListItem Value="10">Octubre</asp:ListItem>
                                            <asp:ListItem Value="11">Noviembre</asp:ListItem>
                                            <asp:ListItem Value="12">Diciembre</asp:ListItem>
                                        </asp:DropDownList>
                                        <asp:Image ID="imgAgregarMes" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"
                                            CssClass="imgBtn" ToolTip="Agregar" />
                                        <asp:Image ID="imgQuitarMes" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif"
                                            CssClass="imgBtn" ToolTip="Quitar" />
                                    </td>        
                                </tr>
                                <tr>
                                    <td>
                                        <asp:ListBox ID="lstbMesesCuotasDobles" runat="server" Width="200px" Height="100px"></asp:ListBox>
                                    </td>        
                                </tr>--%>
                        </table>
                    </td>
                </tr>
                <tr id="trMesesCuotasDobles" style="display: none;">
                    <%--<td>
                            <asp:ListBox ID="lstbMesesCuotasDobles" runat="server" Width="200px" Height="100px"></asp:ListBox>
                        </td>--%>
                </tr>
                <tr id="trCuotaQuincena">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblCuotaQuincenaCab" runat="server" Text="Cuota Quincena"></asp:Label>
                    </td>
                    <td>
                        <%--<asp:TextBox ID="txtCuotaQuincena" runat="server" MaxLength="8" data-bind="value:CuotaQuincena, enable: IdEstado"></asp:TextBox>--%>
                        <input id="chkCuotaQuincena" type="checkbox" data-bind="checked:CuotaQuincena, enable: IdEstado" />
                    </td>
                </tr>
                <tr id="trCuotaQuincenaDefinicion" style="display: none;">
                    <td class="tdEtiqueta" colspan="2">
                        <div style="font-size: 8pt; margin-top: 3px; padding-left: 50px;">
                            <label>
                                <input type="radio" name="rblstTipoCuotaQuincena" value="1" />
                                <span>Definir Porcentaje Cuota de Primera Quincena por rango</span>
                            </label>
                            <br />
                            <label>
                                <input type="radio" name="rblstTipoCuotaQuincena" value="2" />
                                <span>Definir Porcentaje Cuota de Primera Quincena Predefinido</span>
                            </label>
                        </div>
                    </td>
                </tr>
                <tr id="trPorcentajeMaximoCuotaPrimeraQuincena" style="display: none;">
                    <td colspan="2">
                        <table style="padding-left: 50px;">
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="Label3" runat="server" Text="Mínimo Porcentaje"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtMinimoCuotaPrimeraQuincena" runat="server" MaxLength="5" data-bind='value: MinimoCuotaPrimeraQuincena, enable: IdEstado'
                                        Style="text-align: right;" Width="30px"></asp:TextBox>
                                </td>
                                <td style="width: 20px;">
                                </td>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="Label4" runat="server" Text="Máximo Porcentaje"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtMaximoCuotaPrimeraQuincena" runat="server" MaxLength="5" data-bind='value: MaximoCuotaPrimeraQuincena, enable: IdEstado'
                                        Style="text-align: right;" Width="30px"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trPorcentajeCuotaPrimeraQuincena" style="display: none;">
                    <td colspan="2">
                        <table style="padding-left: 50px;">
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="Label2" runat="server" Text="Porcentaje Primera Quincena"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtCuotaPrimeraQuincena" runat="server" MaxLength="5" data-bind='value: CuotaPrimeraQuincena, enable: IdEstado'
                                        Style="text-align: right;" Width="30px"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trIntereses" runat="server">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblInteresCab" runat="server" Text="Interés"></asp:Label>
                    </td>
                    <td>
                        <input id="chkInteres" type="checkbox" data-bind="checked:Interes, enable: IdEstado" />
                    </td>
                </tr>
                <tr id="trTipoInteres" style="display: none;">
                    <td colspan="2">
                        <table style="padding-left: 50px;">
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblTipoInteresCab" runat="server" Text="Tipo de Interés"></asp:Label>
                                </td>
                                <td>
                                    <div style="font-size: 8pt; margin-top: 3px;" data-bind='foreach: lstTipoInteres'>
                                        <label>
                                            <input type="radio" name="rblstTipoInteres" data-bind='value: valor, checked: $parent.TipoInteres' /><span
                                                data-bind='text: texto'></span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trTasaInteres" style="display: none;">
                    <td colspan="2">
                        <table style="padding-left: 50px;">
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblTasaInteresCab" runat="server" Text="Tasa de Interés"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtTasaInteres" runat="server" MaxLength="5" data-bind='value: TasaInteres, enable: IdEstado'
                                        Width="30px" Style="text-align: right;"></asp:TextBox>%
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        <div id="dvAcciones" style="margin-top: 2px;">
            <table width="100%">
                <tr>
                    <td align="left">
                        <div id="btnGuardar" class="btnNormal">
                            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                            <a>Guardar</a>
                        </div>
                        <div id="btnCerrar" class="btnNormal">
                            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                            <a>Cerrar</a>
                        </div>        
                    </td>
                    <td align="right">
                        <div id="dvMensaje" style="display:none;">
                            <asp:Label ID="lblMensaje" runat="server" ForeColor="#4297d7" Font-Size="15px" Font-Bold="true" ></asp:Label>
                        </div>        
                    </td>
                </tr>
            </table>
        </div>
    </div>
    </form>
</body>
</html>
