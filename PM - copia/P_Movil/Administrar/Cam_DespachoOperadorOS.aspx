<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Cam_DespachoOperadorOS" CodeBehind="Cam_DespachoOperadorOS.aspx.vb" %>

<%@ Register Src="../../Common/Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcelGenerico" TagPrefix="uc1" %>
<%@ Register Src="../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>

    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>

    <script src="../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>

    <link href="../../Common/Scripts/select2/select2.min.css" rel="stylesheet" />
    <script src="../../Common/Scripts/select2/select2.min.js" type="text/javascript"></script>

    <style type="text/css">
        .EstiloFactura {
            background-color: aliceblue;
            border: 0pt solid black;
        }

        .ui-widget-overlay {
            width: 100% !important;
            height: 100% !important;
        }
        #dvRecepcionEquipo {
            overflow: hidden !important;
        }
    </style>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Cam_DespachoOperadorOS.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfArchivo" runat="server" />
        <asp:HiddenField ID="hdfRutaCompleta" runat="server" />
        <asp:HiddenField ID="hdfCodCliente" runat="server" />
        <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
        <asp:HiddenField ID="hdfCampanaActiva" runat="server" />
        <asp:HiddenField ID="hdfOrdenServicio" runat="server" />
        <asp:HiddenField ID="hdfTipoLineaPerfil" runat="server" />
        <asp:HiddenField ID="hdfAdjuntoFactura" runat="server" />
        <div>
            <div class="ui-state-default ui-corner-all" style="padding: 6px;">
                <span class="ui-icon ui-icon-suitcase" style="float: left; margin: -2px 5px 0 0;"></span>
                Datos de Recepción
                <%--<div style="right: 15px; position: absolute; top: 13px;">
                    <img id="imgScreen" alt="" src="../../Common/Images/full_screen_open.png" style="cursor: pointer;" />
                </div>--%>
            </div>
            <table border="0" style="width: 100%;">
                <tr>
                    <td style="margin-right: 2px; padding-right: 2px; width: 40px;">Operador</td>
                    <td style="margin-right: 2px; padding-right: 2px;width: 120px;">
                        <asp:DropDownList ID="ddlOperador" runat="server"></asp:DropDownList></td>
                    <td style="margin-right: 2px; padding-right: 2px;width: 75px; text-align: right; display: none;">Tipo de Línea</td>
                    <td style="margin-right: 2px; padding-right: 2px;width: 120px; display: none;" >
                        <asp:DropDownList ID="ddlLineaTipo" runat="server"></asp:DropDownList></td>
                    <td style="display: none; margin-right: 2px; padding-right: 2px;">Tipo Familia</td>
                    <td class="" style="display: none; margin-right: 2px; padding-right: 2px;">
                        <asp:DropDownList ID="ddlTipoSolicitudFamilia" runat="server">
                            <asp:ListItem Text="<Seleccionar>" Value="-1"></asp:ListItem>
                            <asp:ListItem Text="Solicitudes" Value="1"></asp:ListItem>
                            <asp:ListItem Text="Pedidos" Value="2"></asp:ListItem>
                        </asp:DropDownList>
                    </td>
                    <td class="dvFamilia dvCampana" style="display: none; margin-right: 2px; padding-right: 2px;">Campaña</td>
                    <td class="dvFamilia dvCampana" style="display: none; margin-right: 2px; padding-right: 2px;">
                        <asp:DropDownList ID="ddlCampana" runat="server">
                            <asp:ListItem Text="<Seleccionar Operador>" Value="-1"></asp:ListItem>
                        </asp:DropDownList>
                    </td>
                    <td style="margin-right: 2px; padding-right: 2px;">
                        <asp:RadioButtonList ID="rblTipoIngreso" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Text="Importación" Value="I" Selected="True"></asp:ListItem>
                            <asp:ListItem Text="Manual" Value="M"></asp:ListItem>
                        </asp:RadioButtonList>
                    </td>
                    <td style="margin-right: 2px; padding-right: 2px;" align="right">
                        <div id="AgregarRegistro" style="display: none;" class="btnNormal">
                            <asp:Image ID="Image5" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Regresar.png" ToolTip="Agregar Registro" />
                            <a>Agregar Registro</a>
                        </div>
                        &nbsp;&nbsp;
                    </td>

                    <td align="right">
                        <div id="dvAcciones" style="margin-top: 1px;" align="right">
                            <table width="100%" align="right">
                                <tr style="text-align: right;">
                                    <td align="right">
                                        <div id="btnExportar" class="btnNormal">
                                            <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Exportar16.png" />
                                            <a>Exportar Plantilla</a>
                                        </div>
                                        <div id="btnGrabar" class="btnNormal" style="display: none;">
                                            <asp:Image ID="Image6" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                                            <a>Guardar</a>
                                        </div>
                                        <div id="btnCerrar" class="btnNormal">
                                            <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                                            <a>Cerrar</a>
                                        </div>
                                    </td>
                                    <td align="right">
                                        <div id="dvMsgResultado" style="display: none;">
                                            <asp:Label ID="lblMsgResultado" runat="server" Font-Size="14px" ForeColor="Red"></asp:Label>
                                            <div id="btnDetalleError" class="btnNormal">Detalle</div>
                                        </div>
                                    </td>
                                    <td align="right">
                                        <div id="dvExportarNoProcesados" style="display: none;" class="btnNormal">
                                            <asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Exportar16.png" />
                                            <a>Exportar Erróneos</a>
                                        </div>
                                        <div id="dvResultadoProcesados" style="display: none;" class="btnNormal">
                                            <asp:Image ID="Image4" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Exportar16.png" />
                                            <a>Exportar Procesados</a>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>


                    </td>
                </tr>
            </table>

            <div id="dvRecepcionEquipo" style="display: none; overflow: auto; width: 98%;" class="dvPanel ui-widget-content ui-corner-all">
                <div class="ui-state-default ui-corner-all" style="padding: 6px;">
                    <span class="ui-icon ui-icon-arrowthick-1-n" style="float: left; margin: -2px 5px 0 0;"></span>
                    Recepción de equipos
                </div>
                <div id="dvImportacion" style="overflow: auto; width: 98%;" class="dvPanel ui-widget-content ui-corner-all">
                    <table border="0" style="width: 98%;">
                        <tr id="trDatosFacturacion">
                            <td style="width: 100px;">Orden de Servicio</td>
                            <td>
                                <asp:TextBox ID="TxtOrdenServicio_Import" runat="server" Width="120px" MaxLength="50"></asp:TextBox>
                            </td>
                            <td style="width: 80px;">Numero Factura</td>
                            <td>
                                <asp:TextBox ID="TxtNumeroFactura_Import" runat="server" Width="150px" MaxLength="80"></asp:TextBox>
                            </td>
                            <td style="width: 80px;" align="right">Fecha Factura</td>
                            <td>
                                <asp:TextBox ID="TxtFechaFactura_Import" runat="server" Width="80"></asp:TextBox>
                            </td>
                            <td style="width: 50px;">Monto</td>
                            <td style="width: 100px;">
                                <asp:TextBox ID="TxtMontoFactura_Import" runat="server" Width="80px" MaxLength="15"></asp:TextBox>
                            </td>
                        </tr>
                        <tr id="trAdjuntoFacturacion">
                            <td style="width: 100px;">Adjuntar Facturación</td>
                            <td colspan="7">
                                <div id="dvAdjunto" runat="server">
                                    <iframe id="ifCargarArchivo_AdjuntoFact_Import" frameborder="0" style="padding: 0px; margin: 0px; height: 30px; width: 450px;" src="../../Common/Page/Adm_CargarArchivo.aspx?Formatos=pdf,zip,rar&FormatoTipo=&AdjuntarFactura=2"></iframe>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <asp:Label ID="LblNombreArchivoAdjunto_Import" runat="server" Text="" CssClass="lblDescargar"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="8" style="width: 500px;">
                                <iframe id="ifCargarDespacho" frameborder="0" style="padding: 0px; margin: 0px; height: 33px; width: 482px;"
                                    src="../../Common/Page/Adm_CargarArchivo.aspx?Formatos=xlsx,xls&FormatoTipo=Excel"></iframe>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblArchivoCargado" runat="server" Text="" CssClass="lblDescargar"></asp:Label>
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="dvCargaManual" style="display: none; overflow: auto; width: 99%;" class="dvPanel ui-widget-content ui-corner-all">
                    <table border="0" style="width: 100%;" cellpadding="0" cellspacing="0">

                        <tr>
                            <td style="text-align: right; width: 100px;">Orden Servicio: &nbsp;</td>
                            <td colspan="8">
                                <asp:DropDownList ID="ddlOrdenServicio" runat="server" Width="200px"></asp:DropDownList>
                            </td>
                        </tr>
                        <tr style="height: 5px;"></tr>
                        <tr class="DataOS">
                            <td></td>
                            <td align="right" class="EstiloFactura">Nro Factura:</td>
                            <td class="EstiloFactura">
                                <asp:TextBox ID="TxtNumeroFact" runat="server" Width="80px" MaxLength="80"></asp:TextBox>
                            </td>
                            <td class="EstiloFactura" align="right">Fecha Factura:</td>
                            <td class="EstiloFactura">
                                <asp:TextBox ID="txtFechaFactura" runat="server" Width="80"></asp:TextBox>
                            </td>
                            <td class="EstiloFactura" align="right">Monto:</td>
                            <td class="EstiloFactura">
                                <asp:TextBox ID="txtMontoFactura" runat="server" Width="80px" MaxLength="15"></asp:TextBox>
                            </td>
                            <td class="EstiloFactura">Adjuntar Factura</td>
                            <td class="EstiloFactura">
                                <div id="ifrmCargar" runat="server">
                                    <iframe id="ifCargarArchivo" frameborder="0"
                                        style="padding: 0px; margin: 0px; height: 30px; width: 450px;"
                                        src="../../Common/Page/Adm_CargarArchivo.aspx?Formatos=pdf,zip,rar&FormatoTipo=&AdjuntarFactura=1"></iframe>
                                </div>
                                <asp:Label ID="LblNombreArchivoAdjunto" runat="server" Text="" CssClass="lblDescargar"></asp:Label>
                            </td>
                        </tr>
                        <tr class="DataOS" style="height: 5px;"></tr>
                        <tr class="DataOS">
                            <td colspan="9">
                                <table id="gridIngreso">
                                </table>
                            </td>
                        </tr>

                        <%--<tr style="display: none;">
                        <td colspan="8">
                            <asp:Label ID="detalleReq" runat="server" Text="" ForeColor="#4297d7" Font-Size="11px"></asp:Label>
                        </td>
                        </tr>--%>
                        <%--<tr style="display: none;">
                            <td colspan="2">
                                <table>
                                    <tr>
                                        <td style="padding-left:0px;">
                                            <asp:Label ID="lblTipoIngreo_TipLin" runat="server"></asp:Label>
                                        </td>
                                        <td>
                                            <div id="dvInfoFamilia">
                                                <ttgInfo:ToolTipGenerico ID="ttgInfoPed" runat="server" Mensaje="Seleccione si va a ingresar un dispositivo para renovación/portabilidad." />
                                            </div>
                                            <div id="dvInfoStaff">
                                                <ttgInfo:ToolTipGenerico ID="ttgInfoSol" runat="server" Mensaje="Seleccione si va a ingresar un dispositivo para cambio, reparación o reposición." />
                                            </div>                                            
                                        </td>
                                        <td align="center">
                                            <asp:CheckBox ID="chkEsRenovacion" runat="server" Width="50"/>
                                        </td>
                                    </tr>
                                </table>
                            </td>                            
                            <td style="width:100px;" align="right">Línea</td>
                            <td style="width:120px;">
                               <asp:TextBox ID="txtLinea" runat="server" Width="150px" MaxLength="12"></asp:TextBox>
                            </td>

                            <td style="width:100px;" align="right">Serie</td>
                            <td style="width:200px;">
                                <asp:TextBox ID="TxtSerie" runat="server" Width="150px" MaxLength="50"></asp:TextBox>                                
                            </td>



                            <td align="right"  style="width:100px;" >Guía</td>
                            <td style="width:100px;">
                                <asp:TextBox ID="txtGuia" runat="server" Width="100px" MaxLength="20"></asp:TextBox>
                            </td>
                        </tr>


                        <tr style="display: none;">
                            <td style="width:100px;">Meses</td>
                            <td>
                                <asp:DropDownList ID="ddlMesesContrato" runat="server" Width="120px">
                                    <asp:ListItem Text="<Seleccione>" Value="-1"></asp:ListItem>
                                    <asp:ListItem Text="6" Value="6"></asp:ListItem>
                                    <asp:ListItem Text="12" Value="12"></asp:ListItem>
                                    <asp:ListItem Text="18" Value="18"></asp:ListItem>
                                    <asp:ListItem Text="24" Value="24"></asp:ListItem>
                                </asp:DropDownList>
                            </td>
                            <td align="right">Cuenta</td>
                            <td >
                                <asp:DropDownList ID="ddlCuenta" runat="server" Width="320px"></asp:DropDownList>
                            </td>
                            <td align="right">Modelo Dispositivo</td>
                            <td>
                                <asp:TextBox ID="txtModeloDispositivo" runat="server" Width="150px"></asp:TextBox>
                                <asp:HiddenField ID="hdfCodModeloDispositivo" runat="server" />
                            </td>
                            <td align="right">IMEI</td>
                            <td align="right"">
                                <asp:TextBox ID="txtIMEI" runat="server" Width="150px" MaxLength="15"></asp:TextBox>
                            </td>
                        </tr>

                        <tr style="display: none;">
                            <td>Fecha Inicio</td>
                            <td>
                                <asp:TextBox ID="txtFecIniContrato" runat="server" Width="120px"></asp:TextBox>
                            </td>
                            <td align="right">Observación de Ingreso</td>
                            <td>
                                <asp:TextBox ID="txtObservacion" runat="server" Width="320px" MaxLength="5000" Height="25px" TextMode="MultiLine" style="resize: none;"></asp:TextBox>
                            </td>
                            <td align="right" style="width:70px;">Descripción Modelo</td>
                            <td colspan="3" Width="6%">
                                <asp:TextBox ID="TxtDescripcion" runat="server" Width="340px" MaxLength="5000" Height="25px" TextMode="MultiLine" style="resize: none;"></asp:TextBox>
                            </td>
                        </tr>--%>
                    </table>

                </div>

                <div style="display: none;">

                    <table id="tblCargaDespacho"></table>

                </div>
                <div id="dvCargaDespachoPagina"></div>

            </div>
        </div>
        <uc1:ExportarExcelGenerico ID="eegExportar" runat="server" OcultarDiseno="true" />
        <div id="dvDetalleErrorImportacion" style="display: none;">
            Ha ocurrido un error durante la lectura del archivo de importación, en la siguiente lista se muestran las causas mas comunes que originan este error:
            <ul>
                <li><b>No se está cargando en archivo correcto:</b>&nbsp;Asegúrese de que está cargando una plantilla de ingreo a almacén.</li>
                <li><b>Alguno de los formatos de las columnnas de la plantilla no son correctos:</b>&nbsp;Como por ejemplo los formatos de fecha, IMEI o número.</li>
                <li><b>Algunas de las rutas no está correctamente configurada:</b></li>
            </ul>
            Para determinar la causa exacta del error, puede revisar el archivo de log de importación en la siguiente ruta: <span id="spRutaLogImportacion" runat="server" style="color: #443cb3; font-weight: bold;"></span>
        </div>


        <div id="dvIngreso_Observacion" style="display: none;">
            <textarea id="txtIngresoObservacion" style="width: 500px; height: 100px;" cols="40" rows="5"></textarea>
        </div>

    </form>
</body>
</html>
