<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Conciliar_Documentos"
    EnableEventValidation="false" CodeBehind="Documentos.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register Src="../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico"
    TagPrefix="ttgInfo" %>

<%@ Register TagPrefix="uc2" TagName="BusquedaPrincipal" Src="../../Common/Controles/BusquedaPrincipal_v2.ascx" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/cultures/kendo.culture.es-ES.min.js" type="text/javascript"></script>
    <link href="../../Common/Styles/bootstrap/css/bootstrap.css" rel="stylesheet" />
    <link href="../../Common/Icons/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
</head>
<body>
    <link href="bootstrap-progressbar-3.3.4.min.css" rel="stylesheet" />
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Documentos.js")%>" type="text/javascript"></script>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("CierreData.js")%>" type="text/javascript"></script>
    <link href="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Documentos.css")%>" type="text/css" rel="Stylesheet" />

    </script>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfLicencia" runat="server" />

        <asp:HiddenField ID="hdfbtSobreescribe" runat="server" Value="0" />
        <asp:HiddenField ID="hdfbtPregunto" runat="server" Value="0" />
        <asp:HiddenField runat="server" ID="hdfInCodCta" />
        <asp:HiddenField runat="server" ID="hdfbtTipoPla" Value="0" />
        <asp:HiddenField runat="server" ID="hdfCodPla" Value="-1" />
        <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
        <asp:HiddenField ID="hdfIdPerfil" runat="server" Value="-1" />
        <asp:HiddenField ID="hdfGenerico" runat="server" Value="" />

        <div id="dvCargando" class="dvCargando">
        </div>

        <cc1:AccordionJQ ID="AccordionJQ1" Width="100%" runat="server" CssClass="accordion">
            <cc1:ContenedorAccodion ID="AcordionFiltros" Texto="Filtros">

                <div id="dvFactura" style="display: none;">
                    <table>
                        <tr>
                            <td style="color: #003F59; vertical-align: middle; width: 70px; padding-right: 5px;">
                                <b><span id="lblFactura">Factura</span></b>
                            </td>
                            <td>
                                <div id="dvContenedorFactura" runat="server">
                                    <uc2:BusquedaPrincipal id="bpFactura" runat="server" ancho="358" />
                                </div>
                            </td>
                            <td>
                                <div id="btnQuitarFactura" class="btnNormal" runat="server" title="Quitar Factura">
                                    <asp:Image ID="imgQuitarFactura" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <asp:ListBox ID="lstFactura" runat="server" CssClass="MiLista" Width="520px" Height="76px" SelectionMode="Multiple"></asp:ListBox>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <div id="dvCuenta">
                    <table>
                        <tr>
                            <td style="color: #003F59; vertical-align: middle; width: 70px; padding-right: 5px;">
                                <b><span id="lblCuenta">Cuenta</span></b>
                            </td>
                            <td>
                                <div id="dvContenedorCuenta" runat="server">
                                    <uc2:BusquedaPrincipal id="bpCuenta" runat="server" ancho="358" />
                                </div>
                            </td>
                            <td>
                                <div id="btnQuitarCuenta" class="btnNormal" runat="server" title="Quitar Cuenta">
                                    <asp:Image ID="imgQuitarCuenta" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <asp:ListBox ID="lstCuenta" runat="server" CssClass="MiLista" Width="520px" Height="76px" SelectionMode="Multiple"></asp:ListBox>
                            </td>
                        </tr>
                    </table>
                </div>

            </cc1:ContenedorAccodion>

            <cc1:ContenedorAccodion ID="AcordionFiltros2" Texto="Reportes">

                <table style="width: 100%" border="0">
                    <tr>
                        <td style="width: 100px; text-align: right;">Periodo:&nbsp;
                        </td>
                        <td>
                            <asp:TextBox ID="txtPeriodo" runat="server" CssClass="MESANHO" Width="90px" MaxLength="7"></asp:TextBox>
                        </td>
                        <td style="width: 5px;"></td>
                        <td></td>
                    </tr>
                    <tr style="height: 15px;"></tr>
                    <tr>
                        <td style="width: 70px; text-align: right;">Seleccione:&nbsp;
                        </td>
                        <td style="width: 170px;">
                            <select id="cboReporte">
                                <option value="0">Reporte Conformidad</option>
                                <%--<option value="1">Reporte Bienes y Servicios</option>
                                <option value="2">Reporte Anexo</option>--%> 
                            </select>
                        </td>
                        <td style="width: 5px;"></td>
                        <td style="width: 250px; text-align: left;">
                            <div id="btnReporte" class="btnNormal">
                                <asp:Image ID="Image1" runat="server" Width="16px" Height="16px" ImageUrl="~/Common/Images/pdf.png" />
                                <%--<a>Reporte</a>--%>
                            </div>
                        </td>
                        <td></td>
                    </tr>
                    <tr style="height: 15px;"></tr>
                </table>

            </cc1:ContenedorAccodion>

        </cc1:AccordionJQ>


        <div id="divMsgConfirmacion" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <asp:Label ID="lblMensajeConfirmacion" runat="server" Text=""></asp:Label>
        </div>
        <asp:HiddenField ID="hfOperador_Origen" runat="server" />

        <iframe id="ifReporteFormato" frameborder="0" style="margin: 0px; padding: 0px; display: none;" width="100%" height="470px"></iframe>


        <div id="dvGenerarConformidad" style="display: none;">
            <table border="0" width="100%">
                <tr>
                    <td style="width: 100px; text-align: right;">Reporte Nro:</td>
                    <td>
                        <asp:TextBox ID="txtReporteNro" runat="server" Width="150px"></asp:TextBox><br />
                        <span id="lblNroConsecutivoAnterior" style="font-family: Tahoma; color: darkblue; font-size: 11px;"></span>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Tipo Servicio:</td>
                    <td>
                        <asp:DropDownList ID="ddlTipoServicio" Width="150px" runat="server">
                            <%--<asp:ListItem Value="1" Text="Celular"></asp:ListItem>
                            <asp:ListItem Value="2" Text="BB Datos"></asp:ListItem>
                            <asp:ListItem Value="3" Text="BAM"></asp:ListItem>
                            <asp:ListItem Value="4" Text="Radiolocalizador"></asp:ListItem>--%>
                        </asp:DropDownList>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Lugar:</td>
                    <td>
                        <asp:TextBox ID="txtLugar" runat="server" Width="250px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Fecha Recibo Solicitud:</td>
                    <td>
                        <asp:TextBox ID="txtFechaReciboSolicitud" CssClass="DIAMESANHO" runat="server" Style="text-align: right;" Width="150px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Fecha Formalización Contrato:</td>
                    <td>
                        <asp:TextBox ID="txtFechaFormalizacionContrato" CssClass="DIAMESANHO" runat="server" Width="150px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Fecha Recepción Contrato:</td>
                    <td>
                        <asp:TextBox ID="txtFechaRecepcionContrato" CssClass="DIAMESANHO" runat="server" Width="150px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Gerencia:</td>
                    <td>
                        <asp:TextBox ID="txtGerencia" runat="server" Height="40px" TextMode="MultiLine" Width="150px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">SubGerencia:</td>
                    <td>
                        <asp:TextBox ID="txtSubGerencia" runat="server" Height="40px" TextMode="MultiLine" Width="200px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Departamento:</td>
                    <td>
                        <asp:TextBox ID="txtDepartamento" runat="server" Height="40px" TextMode="MultiLine" Width="250px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Contrato:</td>
                    <td>
                        <asp:TextBox ID="txtContrato" runat="server" Width="150px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Solpe:</td>
                    <td>
                        <asp:TextBox ID="txtSolpe" runat="server" Width="150px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Orden Surtimiento:</td>
                    <td>
                        <asp:TextBox ID="txtOrdenSurtimiento" runat="server" Width="150px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Monto Contrato:</td>
                    <td>
                        <asp:TextBox ID="txtMontoContrato" Style="text-align: right;" runat="server" Width="150px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Monto OS:</td>
                    <td>
                        <asp:TextBox ID="txtMontoOS" Style="text-align: right;" runat="server" Width="150px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Pedido Asociado:</td>
                    <td>
                        <asp:TextBox ID="txtPedidoAsociado" runat="server" Width="150px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Razon Social:</td>
                    <td>
                        <asp:TextBox ID="txtRazonSocial" runat="server" Height="40px" TextMode="MultiLine" Width="150px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Clave Operador:</td>
                    <td>
                        <asp:TextBox ID="txtClaveOperador" runat="server" Width="150px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">RFC:</td>
                    <td>
                        <asp:TextBox ID="txtRFC" runat="server" Width="150px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Emitido por:</td>
                    <td>
                        <asp:TextBox ID="txtEmitidoNombre" runat="server" Height="40px" TextMode="MultiLine" Width="150px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Emitido Cargo:</td>
                    <td>
                        <asp:TextBox ID="txtEmitidoCargo" runat="server" Height="40px" TextMode="MultiLine" Width="200px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Emitido Fecha:</td>
                    <td>
                        <asp:TextBox ID="txtEmitidoFecha" runat="server" CssClass="DIAMESANHO" Width="150px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Proveedor:</td>
                    <td>
                        <asp:TextBox ID="txtProveedorNombre" runat="server" Height="40px" TextMode="MultiLine" Width="150px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Proveedor Cargo:</td>
                    <td>
                        <asp:TextBox ID="txtProveedorCargo" runat="server" Height="40px" TextMode="MultiLine" Width="200px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Proveedor Fecha:</td>
                    <td>
                        <asp:TextBox ID="txtProveedorFecha" runat="server" CssClass="DIAMESANHO" Width="150px"></asp:TextBox>
                    </td>
                </tr>

            </table>
        </div>

        <div id="dvGenerarBienesServicios" style="display: none;">
            <table border="0" width="100%">
                <tr>
                    <td style="width: 120px; text-align: right;">Consecutivo:</td>
                    <td style="width: 255px;">
                        <asp:TextBox ID="txtConsecutivo01_BS" runat="server" Width="100px"></asp:TextBox>
                        <asp:TextBox ID="txtConsecutivo02_BS" runat="server" Width="40px"></asp:TextBox>
                        <asp:TextBox ID="txtConsecutivo03_BS" Style="text-align: right;" runat="server" Width="40px"></asp:TextBox>
                        <br />
                        <span id="lblIdBienAnterior" style="font-family: Tahoma; color: darkblue; font-size: 11px;"></span>
                    </td>
                    <td style="width: 30px;"></td>
                    <td style="width: 110px; text-align: right;">Lugar/Fecha:</td>
                    <td>
                        <asp:TextBox ID="txtLugar_BS" runat="server" Width="250px"></asp:TextBox>
                    </td>
                </tr>

                <tr>
                    <td style="text-align: right;">SubDirección:</td>
                    <td>
                        <asp:TextBox ID="txtSubDireccion_BS" runat="server" Width="250px"></asp:TextBox>
                    </td>
                    <td style="width: 30px;"></td>
                    <td style="text-align: right;">Gerencia:</td>
                    <td>
                        <asp:TextBox ID="txtGerencia_BS" runat="server" Width="250px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: right;">Proveedor:</td>
                    <td>
                        <asp:TextBox ID="txtProveedor_BS" runat="server" Width="250px"></asp:TextBox>
                    </td>
                    <td style=""></td>
                    <td style="text-align: right;">Compromiso SAP:</td>
                    <td>
                        <asp:TextBox ID="txtCompromisoSAP_BS" runat="server" Width="250px"></asp:TextBox>
                    </td>
                </tr>

                <tr>
                    <td style="text-align: right;">Detalle Cabecera:</td>
                    <td colspan="4">
                        <asp:TextBox ID="txtDetalle01_BS" runat="server" Height="50px" TextMode="MultiLine" Width="645px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: right;">Partida del Pedido:</td>
                    <td>
                        <asp:TextBox ID="txtPartida_BS" runat="server" Width="100px"></asp:TextBox>
                    </td>
                    <td colspan="3"></td>
                </tr>
                <tr>
                    <td style="text-align: right;">Detalle Pie:</td>
                    <td colspan="4">
                        <asp:TextBox ID="txtDetalle02_BS" runat="server" Height="50px" TextMode="MultiLine" Width="645px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: right;">Responsable:</td>
                    <td>
                        <asp:TextBox ID="txtEmitidoNombre_BS" runat="server" Width="250px"></asp:TextBox>
                    </td>
                    <td></td>
                    <td style="text-align: right;">Cargo:</td>
                    <td>
                        <asp:TextBox ID="txtEmitidoCargo_BS" runat="server" Width="250px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: right;">Ficha:</td>
                    <td>
                        <asp:TextBox ID="txtEmitidoFicha_BS" runat="server" Width="250px"></asp:TextBox>
                    </td>
                    <td colspan="3"></td>
                </tr>
                <tr>
                    <td style="text-align: right;">Persona COPADE:</td>
                    <td colspan="4">
                        <asp:TextBox ID="txtPersonalCOPADE_BS" runat="server" Width="645px"></asp:TextBox>
                    </td>
                </tr>
            </table>
        </div>


        <div id="dvArea" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifArea" width="910" height="470" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
        </div>

    </form>
</body>
</html>
