<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Facturacion_Mantenimiento_Fac_CesesNuevo" CodeBehind="Mnt_CesesEmpleadosNuevo.aspx.vb" %>

<%@ Register Src="../../../Common/Controles/BusquedaPrincipal.ascx" TagName="BusquedaPrincipal" TagPrefix="uc1" %>
<%@ Register Src="../../../Common/Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcelGenerico" TagPrefix="eeg" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js"
        type="text/javascript"></script>
    <link href="~/P_Movil/Facturacion/Consultar/Con_Fac_CronogramaPagos.css" rel="stylesheet"
        type="text/css" />
    <script src="Mnt_CesesEmpleadosNuevo.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfCodigo" runat="server" />
    <asp:HiddenField ID="hdfEstado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfinTipOri" runat="server" />
    <asp:HiddenField ID="hdfTecnicoResponsable" runat="server" />
    <asp:HiddenField ID="hdfTipoCese" runat="server" />
    <asp:HiddenField ID="hdfHayResTec" runat="server" />
    <asp:HiddenField ID="hdfHayResApr" runat="server" />
    <asp:HiddenField runat="server" ID="hdfValidaConf"/>
    <asp:HiddenField runat="server" ID="hdfCodCese"/>
    <asp:HiddenField runat="server" ID="hdfTemp"/>
    <asp:HiddenField runat="server" ID="hdfNomEmp"/>
    <div id="dvCargando" class="dvCargando">
    </div>
    <div class="dvPanel" style="overflow: auto;">

        <table id="tb0" width="100%">
            <tr>
                <td>
                    <table width="100%" border="0">
                        <%--                        <tr>
                            <td class="style1">
                                <asp:Label ID="lblEmpleado" runat="server" Text="Empleado:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtEmpleado" runat="server" Width="300px" MaxLength="150"></asp:TextBox>
                            </td>
                        </tr>--%>
                        <tr>
                            <td class="style1" style="width: 80px;">
                                <asp:Label ID="Label3" runat="server" Text="Empleado:"></asp:Label>
                            </td>
                            <td>
                                <div id="dvContenedorTecRes" runat="server">
                                    <uc1:BusquedaPrincipal ID="bpTecnicoResponsable" runat="server" Ancho="377"/>
                                    <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
                                </div>
                            </td>
                        </tr>
                        <%--<tr id="tr2" runat="server">
                            <td class="style1" style="width: 80px;">
                                <asp:Label ID="lblTipoCese" runat="server" Text="Tipo de Cese:"></asp:Label>
                            </td>
                            <td>
                                <asp:DropDownList ID="ddlTipoCese" runat="server" Width="309px">
                                </asp:DropDownList>
                            </td>
                        </tr>--%>
                        <tr id="trTipoFuente" runat="server">
                            <td class="style1">
                                <asp:Label ID="lblNombreTipoFuente" runat="server" Text="Fecha de Cese:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtFechaCese" runat="server" Width="100px" MaxLength="100" Class="bordeui"></asp:TextBox>
                            </td>
                        </tr>
                        <tr id="tr1" runat="server">
                            <td class="style1">
                                <asp:Label ID="Label1" runat="server" Text="Descripción:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtDescripcion" runat="server" Width="400px" MaxLength="150" 
                                    TextMode="MultiLine" Style="resize: none;"></asp:TextBox>
                            </td>
                        </tr>
                        <tr id="tr3" runat="server">
                            <td class="style1">
                                <asp:Label ID="lblFechaPago" runat="server" Text="Fecha Actual:" ></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtFechaPago" runat="server" Width="100px" MaxLength="10" Class="bordeui"></asp:TextBox>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        
        <div id="dvLineasEmpleado" style="display: none;">
            <%--<table id="tb1" width="100%">
                <tr>
                    <td>--%>
                        <table width="100%">
                            <tr>
                                <td style="width: 80px; vertical-align:top;padding-left:4px;">
                                    <asp:Label ID="Label5" runat="server" Text="Líneas:" ></asp:Label>
                                </td>
                                <td>
                                    <table id="tbLineasEmp"></table>
                                    <div id="pgGrid"></div>
                                </td>    
                            </tr>
                            <tr>
                                <td style="width: 80px;"></td>
                                <td>
                                    <asp:Label runat="server" ID="Label6" ForeColor="#CC0000" Font-Size="10px">
                                            * Las solicitudes que no sean culminadas a la fecha de cese, serán rechazadas o anuladas (según sus estados de proceso y aprobación) y los dispositivos y líneas de staff (incluso los que estén por despachar).
                                    </asp:Label>
                                </td>
                            </tr>
                        </table>
                   <%-- </td>
                
                </tr>
            </table>--%>
        </div>

        <div id="dvLineas" style="display: block;">
            <%--<table id="tb2" width="100%">
                <tr>
                    <td>--%>
                        <table width="100%">
                            <tr>
                                <td style="width: 80px; vertical-align:top;padding-left:4px;">
                                    <asp:Label ID="lblLineas" runat="server" Text="Líneas:" ></asp:Label>
                                </td>
                                <td>
                                    <table id="tbLineas"></table>
                                    <div id="pgLineas"></div>
                                </td>    
                            </tr>
                            <tr>
                                <td style="width: 80px;"></td>
                                <td>
                                    <asp:Label runat="server" ID="lblCondicion" ForeColor="#CC0000" Font-Size="10px">
                                            * Las solicitudes que no sean culminadas a la fecha de cese, serán rechazadas o anuladas (según sus estados de proceso y aprobación) y los dispositivos y líneas de staff (incluso los que estén por despachar).
                                    </asp:Label>
                                </td>
                            </tr>
                        </table>
                    <%--</td>
                
                </tr>
            </table> --%>   
        </div>
        
        <%--<br />--%>
        <%--<table width="100%" cellpadding="0" cellspacing="0">
            <tr style="height: 30px;">
                <td style="width: 80px;padding-left:6px;"></td>
                <td>--%>
                    <div id="dvEmitir" style="margin-top:5px; margin-left:87px;">
                        <asp:CheckBox ID="chkEmitir" runat="server" Text="Emitir Comprobantes" />            
                    </div>
                <%--</td>
            </tr>
        </table>--%>
        <div id="dvContenedorTecTrans" style="display: none;" runat="server">
            <uc1:BusquedaPrincipal ID="bpTecnicoTransferido" runat="server" />
        </div>
        <div id="dvDeudas">
            <%--<table id="tb3" width="100%">
                <tr>
                    <td>--%>
                        <table width="100%">
                            <tr>
                                <td style="width: 80px; vertical-align:top; padding-left:4px;">
                                    <asp:Label ID="lblDeudas" runat="server" Text="Deudas:" ></asp:Label>
                                </td>
                                <td style="padding-left:1px;">
                                    <table id="tbDeudas"></table>
                                    <div id="pgDeudas"></div>
                                </td>    
                            </tr>
                        </table>
                    <%--</td>
                </tr>
            </table>--%>    
        </div>
        
<%--        <br/>--%>
        <%--        <div id="grdDeudas">
        </div>--%>
        
        <table>
            <tr>
                <td style="width: 80px; vertical-align:top;padding-left:4px;"><asp:Label ID="lblResumen" runat="server" Text="Resumen:" ></asp:Label></td>
                <td>
                    <div id="Info" class="pMedium">
                        <p>
                            En Nuevos Soles</p>
                        <ul>
                            <li>
                                <div>
                                    <table id="tbDetalles">
                                        <tr class="Alto">
                                            <td align="center" class="cSubTitulo">
                                                Estado de cuenta anterior
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="vertical-align: bottom; text-align: right;">
                                                <asp:Label ID="lblECAnt" runat="server" Text="(Desconocido)"></asp:Label>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </li>
                            <li>
                                <div class="signo">
                                    -</div>
                            </li>
                            <li>
                                <div>
                                    <table>
                                        <tr class="Alto">
                                            <td class="cSubTitulo">
                                                Pagos/Abonos (*)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="vertical-align: bottom; text-align: right;">
                                                <asp:Label ID="lblPagos" runat="server" Text="(Desconocido)"></asp:Label>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </li>
                            <li>
                                <div class="signo">
                                    +</div>
                            </li>
                            <li>
                                <div>
                                    <table>
                                        <tr class="Alto">
                                            <td class="cSubTitulo">
                                                Consumos/Cargos (*)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="vertical-align: bottom; text-align: right;">
                                                <asp:Label ID="lblConsumos" runat="server" Text="(Desconocido)"></asp:Label>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </li>
                            <li>
                                <div class="signo">
                                    +</div>
                            </li>
                            <li>
                                <div>
                                    <table>
                                        <tr class="Alto">
                                            <td class="cSubTitulo">
                                                Cuotas Programadas (**)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="vertical-align: bottom; text-align: right;">
                                                <asp:Label ID="lblCuotasFinan" runat="server" Text="(Desconocido)"></asp:Label>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </li>
                            <%--<li class="ocul">
                                <div class="signo">
                                    -</div>
                            </li>
                            <li class="ocul">
                                <div>
                                    <table>
                                        <tr class="Alto">
                                            <td class="cSubTitulo">
                                                Pago al Operador
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="vertical-align: bottom; text-align: right;">
                                                <asp:Label ID="lblPagoOperador" runat="server" Text="(Desconocido)"></asp:Label>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </li>--%>
                            <li>
                                <div class="signo">
                                    +</div>
                            </li>
                            <li>
                                <div>
                                    <table>
                                        <tr class="Alto">
                                            <td class="cSubTitulo">
                                                Penalidades
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="vertical-align: bottom; text-align: right;">
                                                <asp:Label ID="lblPenalidades" runat="server" Text="(Desconocido)"></asp:Label>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </li>
                            <li>
                                <div class="signo">
                                    =</div>
                            </li>
                            <li>
                                <div>
                                    <table>
                                        <tr class="Alto">
                                            <td class="Monto">
                                                Deuda Total Antes de Cesar
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="vertical-align: bottom; text-align: right;">
                                                <asp:Label ID="lblMontoTotal" runat="server" Text="(Desconocido)"></asp:Label>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <asp:Label runat="server" ID="Label2" ForeColor="#CC0000" Font-Size="10px">
                            (*)&nbsp; Cargos y/o Abonos del periodo en curso                         
                        </asp:Label><br/>
                        <asp:Label runat="server" ID="Label4" ForeColor="#CC0000" Font-Size="10px">
                            (**) Cargos programados de los siguientes periodos
                        </asp:Label>
                    </div>                  
                </td>
            </tr>
        </table>

        
        
        <table>
            <tr style="padding-top: 20px;">
                <td>
                    <br />
                    <asp:Label id="lblMensaje" runat="server" style="color:Red;font-weight:normal;font-style:italic;" Font-Size="11px"></asp:Label>
                </td>
            </tr>
            <tr style="padding-top: 20px;">
                <td colspan="2">
                    <br />
                    <div style="text-align: left;">
                        <div id="btnGuardar" class="btnNormal">
                            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                            <a>Guardar</a>
                        </div>
                        <div id="btnCerrar" class="btnNormal">
                            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                            <a>Cancelar</a>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
        <br />
        <div id="dvFechas">
            <table width="100%">
                <tr>
                    <td align="left" style="color: #CC0000;">
                        <b><span id="spMensaje"></span></b>
                    </td>
                </tr>
            </table>
        </div>
        

        <%--        <div id="btnGuardar" class="k-button">
            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
            <a>Guardar</a>
        </div>
        <div id="btnCerrar" class="k-button">
            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
            <a>Cerrar</a>
        </div>--%>
    </div>
        <div id="divMsgConfirmar" style="display:none;">
            <asp:Label id="lblMsjConfirmacion" runat="server"></asp:Label>
            ¿Desea proceder con el cese del empleado?
        </div>

        <div id="dvMsgSinEmitir" style="display:none;">
            <asp:Label id="lblMsjSinEmitir" runat="server"></asp:Label>
            Se generará el cese del empleado sin comprobantes asociados porque esta opción está desactivada.<br/>
            ¿Desea activarla?
        </div>
        <%--La  opción de emitir comprobantes está desactivada--%>
        <div id="dvVisPre" class="ui-widget-content ui-corner-all" style="padding: 0px; margin: 0px;background-image: none; display: none; margin-top: 5px;">
            <iframe id="ifReporte" height="720px" width="860px" frameborder="0"></iframe>
        </div>

        <div id="dvDetalleDeuda" style="display: none; width:700px;">
            <table>
                <%--<tr style="font-size:11px;">
                    <td style="width:120px;"><b>Empleado</b></td>
                    <td><asp:Label ID="lblEmpleado" runat="server"></asp:Label></td>
                </tr>--%>
                <tr style="font-size:11px;">
                    <td style="width:100px;"><b>Tipo Documento</b></td>
                    <td><asp:Label ID="lblTipoDocumento" runat="server"></asp:Label></td>
                </tr>
                <tr style="font-size:11px;">
                    <td><b>Tipo Motivo</b></td>
                    <td><asp:Label ID="lblMotivo" runat="server"></asp:Label></td>
                </tr>
                <tr style="height:5px;">
                    <td colspan="2" align="right">
                        <div id="btnExcel">
                            <eeg:ExportarExcelGenerico ID="eegCronogramas" runat="server" />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <table id="tbDetalleDeuda"></table>
                        <div id="pager"></div>    
                    </td>
                </tr>
            </table>
        </div>
    </form>
</body>
</html>
