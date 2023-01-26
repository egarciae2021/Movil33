<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Solicitudes_Adm_ProcesarSolicitud" CodeBehind="Adm_ProcesarSolicitud.aspx.vb" %>

<%@ Register Src="../../../Common/Controles/BusquedaPrincipal.ascx" TagName="BusquedaPrincipal" TagPrefix="uc1" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register Src="../../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />

    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />

    <script src="../../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/ajaxupload.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.editor.min.js" type="text/javascript"></script>
    <link href="../../../Common/Scripts/select2/select2.min.css" rel="stylesheet" />
    <script src="../../../Common/Scripts/select2/select2.min.js" type="text/javascript"></script>
    <style type="text/css">
        .k-content {
            height: 60px !important;
        }

        .ui-datepicker {
            z-index: 99999 !important;
        }
        .ui-widget-overlay { 
            height: 100% !important; 
            width: 100% !important;
        }
    </style>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Adm_ProcesarSolicitud.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfTituloValeResguardo" runat="server" />
        <asp:HiddenField ID="hdfUsaFinanciamiento" runat="server" />
        <asp:HiddenField ID="hdfBiMontoFijo" runat="server" />
        <asp:HiddenField runat="server" ID="hdfConciliacion" />
        <asp:HiddenField ID="hdfEnPausa" runat="server" />
        <asp:HiddenField runat="server" ID="hdfCodSol" />
        <asp:HiddenField runat="server" ID="hdfMensajeTipoCierre" />
        <asp:HiddenField runat="server" ID="hdfTipSol" />
        <asp:HiddenField runat="server" ID="hdfPlaSol" />
        <asp:HiddenField runat="server" ID="hdfPlaIni" />
        <asp:HiddenField runat="server" ID="hdfPlaAct" />
        <asp:HiddenField runat="server" ID="hdfModDisSol" />
        <asp:HiddenField runat="server" ID="hdfValidacion" />
        <asp:HiddenField runat="server" ID="hdfCodEstado" />
        <%--hiddens agregados 04/04/2014 - wapumayta (adaptacion a formato personalizadas)--%>
        <asp:HiddenField runat="server" ID="hdfAdmin" />
        <asp:HiddenField runat="server" ID="hdfTecnicoResponsable" />
        <asp:HiddenField runat="server" ID="hdfTecnico" />
        <asp:HiddenField runat="server" ID="hdfResApr" />
        <asp:HiddenField runat="server" ID="hdfPropie" />
        <asp:HiddenField runat="server" ID="hdfTecnicoAsignado" />
        <asp:HiddenField runat="server" ID="hdfCodEmp" />
        <asp:HiddenField runat="server" ID="hdfEstado" />
        <asp:HiddenField runat="server" ID="hdfEstado_Apr" />
        <asp:HiddenField runat="server" ID="hdfTabla" />
        <asp:HiddenField runat="server" ID="hdfCodTipSol" />
        <asp:HiddenField runat="server" ID="hdfMesesCuotas" />
        <asp:HiddenField runat="server" ID="hdfUsuarioCreacion" />
        <asp:HiddenField runat="server" ID="hdfNumMinCuo" />
        <asp:HiddenField runat="server" ID="hdfNumMaxCuo" />
        <asp:HiddenField runat="server" ID="hdfMinPerGra" />
        <asp:HiddenField runat="server" ID="hdfMaxPerGra" />
        <asp:HiddenField runat="server" ID="hdfFechaAprobacion" />
        <asp:HiddenField runat="server" ID="hdfNumAdjuntos" />
        <asp:HiddenField runat="server" ID="hdfTipoMonto" />
        <asp:HiddenField runat="server" ID="hdfIngAlm" />
        <asp:HiddenField runat="server" ID="hdfLicencia" />
        <asp:HiddenField runat="server" ID="hdfCuotas" />
        <asp:HiddenField runat="server" ID="hdfisEditCuota" />
        <asp:HiddenField ID="hdfBiEscalamiento" runat="server" />
        <asp:HiddenField ID="hdfbiEnviarOperador" runat="server" />

        <asp:HiddenField runat="server" ID="hdfFormatoAsignacion_Visible" />
        <asp:HiddenField runat="server" ID="hdfFormatoAsignacion_Editable" />
        <asp:HiddenField runat="server" ID="hdfFormatoAsignacion_Obligatorio" />
        <asp:HiddenField runat="server" ID="hdfOrdenServicio_Visible" />
        <asp:HiddenField runat="server" ID="hdfOrdenServicio_Editable" />
        <asp:HiddenField runat="server" ID="hdfOrdenServicio_Obligatorio" />

        <asp:HiddenField runat="server" ID="hdfValeResguardo_Visible" />
        <asp:HiddenField runat="server" ID="hdfValeResguardo_Editable" />
        <asp:HiddenField runat="server" ID="hdfValeResguardo_Obligatorio" />

        <asp:HiddenField runat="server" ID="hdfOperadorDefault" />

        <asp:HiddenField ID="hdfEsResponsableTI" runat="server" />

        <asp:HiddenField ID="hdfSolicitudesMultipleEspecialista" runat="server" />

        <div id="dvEscalarExterno" style="display: none;">
            <div style="width: 49%; margin-bottom: 10px; float: left;">
                <span>Elija Tipo de solicitud</span>
                <div style="clear: both; height: 10px;"></div>
                <asp:DropDownList ID="ddlTipoExterno" runat="server" Style="float: left; margin-left: 5px;">
                </asp:DropDownList>
            </div>
            <div id="dvSeleccionOperadorExterno" style="width: 49%; margin-bottom: 10px; float: left;" runat="server">
                <span>Elija un Operador</span>
                <div style="clear: both; height: 10px;"></div>
                <asp:DropDownList ID="ddlOperadorEnvioExterno" runat="server" Style="float: left; margin-left: 5px;"></asp:DropDownList>
            </div>
            <div style="clear: both; height: 5px;"></div>
            <span>Motivo de env&iacute;o a operador</span><br />
            <asp:TextBox ID="txtMotivoSol" runat="server" Height="150" Width="99%" TextMode="MultiLine"></asp:TextBox>
            <div id="btnRegistrarEscEx" class="btnNormal" style="float: right; margin-top: 10px;">
                Enviar a operador
            </div>
        </div>


        <div id="Capa" style="position: absolute; width: 100%; height: 100%; z-index: 9999; display: none; background-color: rgba(0, 0, 0, 0.3);"></div>
        <div id="divSolicitudFallo" runat="server" style="display: none;">
            <asp:Label ID="MsjSolicitudFallo" runat="server" ForeColor="#4297d7" Font-Size="14px" Font-Bold="true">
            La solicitud no se ha creado de manera correcta, comuníquese con su administrador
            </asp:Label>
        </div>
        <div style="overflow: auto; width: 100%; text-align: center;">
            <asp:Label ID="lblTipoSolicitud" runat="server" Font-Size="Medium" Font-Bold="true"></asp:Label>

            <div id="divBtsGeneral" style="float: right;">
                <div id="btnRefrescar" class="btnNormal" style="float: right;" title="Voler a cargar página">
                    <asp:Image ID="imgRefrescar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Actualizar.png" />
                </div>
                <div id="btnResumen" class="btnNormal" style="display: none; float: right;" title="Resumen">
                    <asp:Image ID="imgResumen" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Resumen_16x16.png" ToolTip="Resumen" />
                    <%--<asp:Label ID="lblResumen" runat="server" Text="Resumen"></asp:Label>--%>
                </div>
                <div id="btnNotas" class="btnNormal" style="float: right;" title="Notas">
                    <asp:Image ID="imgNotas" runat="server" ImageUrl="~/Common/Images/Chat/write.png" ToolTip="Notas" />
                    <%--<asp:Label ID="lblNotas" runat="server" Text="Notas"></asp:Label>--%>
                </div>
                <table id="tbTipoPausa">
                    <tr>
                        <td id="tdTipoPausa">
                            <div id="divTipoPausa">

                                <asp:DropDownList ID="ddlTipoPausa" runat="server" Style=""></asp:DropDownList>

                                <div id="btnPausaReanuda" class="btnNormal" style="display: none;" title="Pausar">
                                    <asp:Label ID="lblPausaReanuda" runat="server" Text="Pausar"></asp:Label>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>

            <div style="float: right; font-style: italic; vertical-align: middle; margin-top: 10px; margin-right: 3px; display: none;"><span id="lblTextoRefrescar"></span></div>
        </div>
        <div id="divProcesarSolicitud" runat="server" style="margin-top: 7px; overflow: auto; height: 400px;" class="dvPanel">

            <table cellspacing="0" cellpadding="2">
                <%--tr's agregados 04/04/2014 - wapumayta (adaptacion a formato personalizadas)--%>
                <tr id="trCodigo">
                    <td style="width: 160px;">Código de Solicitud
                    </td>
                    <td>
                        <asp:Label ID="lblCodigo" runat="server" Font-Size="Medium" Font-Bold="true"></asp:Label>
                    </td>
                </tr>
                <tr id="trEstado_Apr" style="height: 25px;">
                    <td>Estado de Solicitud</td>
                    <td>
                        <asp:Label ID="lblEstadoSolicitud" runat="server" Font-Bold="true" Font-Size="12px"></asp:Label>
                        <%--<asp:DropDownList ID="ddlFase" runat="server" Width="120px" Visible="false"></asp:DropDownList>--%>
                        <asp:DropDownList ID="ddlEstadoSolicitud" runat="server" Width="130px" Style="display: none;"></asp:DropDownList>
                    </td>
                </tr>
                <tr style="height: 25px;">
                    <td>Fecha de Creación</td>
                    <td>
                        <asp:Label ID="lblFechaCreacion" runat="server" Font-Bold="true"></asp:Label>
                    </td>
                </tr>
                <tr id="trArchivosAdjuntos" style="display: none;">
                    <td>Archivos Adjuntos
                    </td>
                    <td>
                        <asp:Label ID="lblArchivosAdjuntos" runat="server"></asp:Label>
                        <asp:Image ID="imgVerArchAdj" runat="server" ImageUrl="~/Common/Images/Mantenimiento/VerDetalle.png" ToolTip="Ver archivos" CssClass="imgBtn" />
                    </td>
                </tr>
                <tr id="trTipoMonto" style="display: none;">
                    <td>Tipo Monto</td>
                    <td>
                        <asp:DropDownList ID="ddlTipoMonto" runat="server">
                        </asp:DropDownList>
                        <asp:Label ID="lblTipoMontoDesc" runat="server"></asp:Label>
                    </td>
                </tr>
                <tr id="trMontoFijo">
                    <td>Monto Fijo</td>
                    <td style="padding-left: 0px;">
                        <table>
                            <tr>
                                <td style="padding-left: 0px;">
                                    <asp:TextBox ID="txtMonto" runat="server" Width="69px" MaxLength="8"></asp:TextBox>
                                </td>
                                <td id="tdMontoSugerido" runat="server" style="display: none;">
                                    <asp:Label ID="lblMontoSugerido" runat="server" ForeColor="#4297d7" Font-Size="12px" Font-Bold="true" onclick="fnEscribirMonto();" Style="cursor: pointer;" ToolTip="Click para escribir monto" />
                                    <asp:Label ID="lblMensajeMntSug" Text="(Monto sugerido para la solicitud)" runat="server" ForeColor="#4297d7" Font-Size="12px" Font-Bold="true" runat="server" />
                                </td>
                                <td id="tdMontoSugeridoMensaje" runat="server" style="display: none;">
                                    <ttgInfo:ToolTipGenerico ID="infMntSug" Mensaje="Precio calculado en base al modelo y operador(según plan) seleccioando." runat="server" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trFinanciamiento" runat="server">
                    <td>Financiamiento
                    </td>
                    <td>
                        <%--<asp:Label ID="lblNombreFinanc" runat="server"></asp:Label>
                        <asp:HiddenField ID="hdfIdFInanciamiento" runat="server" />--%>
                        <asp:DropDownList ID="ddlFinanciamiento" runat="server" Width="210px"></asp:DropDownList>
                        <img id="imgInfoFinanciamiento" title="Ver detalle" class="imgBtn" src="../../../Common/Images/Mantenimiento/VerDetalle.png" />
                    </td>
                </tr>
                <tr id="trMesesCuotas" runat="server">
                    <td>Cuotas</td>
                    <td>
                        <asp:TextBox ID="txtMesesCuotas" runat="server" Width="30px"></asp:TextBox>
                        <asp:Label ID="lblMesesCuotas" runat="server"></asp:Label>
                    </td>
                </tr>
                <tr id="trPeriodoGracia" runat="server">
                    <td>Periodo Gracia</td>
                    <td>
                        <asp:TextBox ID="txtPeriodoGracia" runat="server" Width="30px"></asp:TextBox>
                        <asp:Label ID="lblPeriodoGracia" runat="server" Font-Italic="True"></asp:Label>
                    </td>
                </tr>
                <tr id="trAsignarA" style="display: none;" runat="server">
                    <td>Asignar a Especialista</td>
                    <td>
                        <input type="checkbox" id="chkAsignarA" />
                    </td>
                </tr>
                <tr id="trTecnico" style="display: none;" runat="server">
                    <td>Técnico Especialista</td>
                    <td>
                        <div id="dvTecnicoAsigndo" runat="server">
                            <uc1:BusquedaPrincipal ID="bpTecnicoAsignado" runat="server" />
                        </div>
                    </td>
                </tr>
                <tr id="trFechaAprobacion" style="display: none;">
                    <td>Fecha Aprobación
                    </td>
                    <td>
                        <asp:TextBox ID="txtFechaAprobacion" runat="server" Width="120px" onkeydown="return (event.keyCode!=8);" ReadOnly="true"></asp:TextBox>
                        <img id="imgBorrarFechaAprobacion" alt="" src="../../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn" style="vertical-align: middle;" />
                    </td>
                </tr>
                <%--tr's agregados 04/04/2014 - wapumayta (adaptacion a formato personalizadas)--%>
                <tr id="trDescSolicitud" runat="server">
                    <td>Desc. Solicitud
                    </td>
                    <td>
                        <asp:TextBox ID="txtDescSol" runat="server" TextMode="MultiLine" Rows="3" Width="650" Height="60px"></asp:TextBox>
                        <div id="dvMensajeObligatorio" runat="server" style="display: none; float: left; color: #4297d7; font-size: 11px; font-weight: bold; font-style: italic;">
                            El motivo es obligatorio, ingrese por lo menos&nbsp;<asp:Label ID="lblMensajeValidCant" runat="server"></asp:Label>&nbsp;<asp:Label ID="lblMensajeValidTipo" runat="server"></asp:Label>.
                        </div>
                        <%--<div style="float:right; display:none;" id="dvNumWordCaracDesc" >
                        Número de&nbsp;<asp:Label ID="lblMensajeValidTipo2" runat="server"></asp:Label>
                        &nbsp;<asp:Label ID="lblNumWordCaracMensaje" runat="server" Text="0"></asp:Label>
                    </div>--%>
                    </td>
                </tr>
                <%--<tr>
                <td class="" width="110px">
                    Código Empleado
                </td>
                <td class="">
                    <asp:Label ID="lblCodEmpleado" runat="server" Text=""></asp:Label>
                </td>
            </tr>--%>
                <tr>
                    <td class="">Nombre Empleado
                    </td>
                    <td class="">
                        <%--<asp:Label ID="lblNomEmpleado" runat="server" Text=""></asp:Label>--%>
                        <asp:TextBox ID="txtNomEmpleado" runat="server" Width="300" ReadOnly="true"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trPlanSolicitado" runat="server" style="display: none;">
                    <td>Plan Solicitado
                    </td>
                    <td>
                        <%--<asp:Label ID="lblPlanSolicitado" runat="server"></asp:Label>--%>
                        <asp:TextBox ID="txtPlanSolicitado" runat="server" Width="300" ReadOnly="true"></asp:TextBox>
                        <asp:Label ID="lblNoPlan" runat="server" Text="Solicitud sin plan"></asp:Label>
                    </td>
                </tr>
                <tr id="trModeloSolicitado" runat="server">
                    <td>
                        <asp:Label ID="lblTituloModSol" runat="server" Text="Modelo Solicitado"></asp:Label>
                    </td>
                    <td>
                        <%--<asp:Label ID="lblModeloSolicitado" runat="server"></asp:Label>--%>
                        <asp:TextBox ID="txtModeloSolicitado" runat="server" Width="300" ReadOnly="true"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trAsignarEquiTemp" runat="server" style="display: none;">
                    <td>Asignar equipo temporal
                    </td>
                    <td>
                        <asp:CheckBox ID="chkAsignarEquiTemp" runat="server" Checked="false" />
                    </td>
                </tr>
                <tr id="trEquiposConLinea" style="display: none;" runat="server">
                    <td>Mostrar equipos con linea
                    </td>
                    <td>
                        <asp:CheckBox ID="chkEquiConLinea" runat="server" Checked="false" />
                    </td>
                </tr>
                <tr id="trModEquipoNue" style="display: none;">
                    <td style="padding-left: 0px;">
                        <table>
                            <tr>
                                <td style="padding-left: 0px;">
                                    <asp:Label ID="lblModeloEquipoNuevoCab" runat="server" Text="Modelo de equipo nuevo"></asp:Label>
                                </td>
                                <td>
                                    <ttgInfo:ToolTipGenerico ID="ttgInfoModelos" runat="server" Mensaje="Modelos de dispositivos disponibles asociados al grupo del empleado" />
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="">
                        <asp:Label ID="lblModeloEquipoNuevo" runat="server"></asp:Label>
                        <asp:DropDownList ID="ddlModeloEquipoNuevo" runat="server" Width="310px" AutoPostBack="False"></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trCuenta" runat="server">
                    <td>Cuenta</td>
                    <td>
                        <div id="DvCuenta" runat="server">
                            <uc1:BusquedaPrincipal ID="bqPplCuenta" runat="server" />
                        </div>
                    </td>
                </tr>
                <tr id="trIMEIEquipoNue" style="display: none;">
                    <td class="" style="padding-left: 0px;">
                        <table>
                            <tr>
                                <td style="padding-left: 0px;">
                                    <asp:Label ID="lblTituloImeiSel" runat="server" Text="IMEI Equipo nuevo"></asp:Label>
                                </td>
                                <td>
                                    <div id="dvInfoIMEIAutomatico" style="display: none;">
                                        <ttgInfo:ToolTipGenerico ID="ttgInfoIMEIAutomatico" runat="server"
                                            Mensaje='Dispositivo agregado desde el módulo "INGRESO ALMACÉN"' />
                                    </div>
                                </td>
                                <td id="tdAlerta" style="display: none;">
                                    <asp:Image ID="imgAlerta" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Alerta_16x16.png" Style="position: relative; left: 20px; cursor: pointer;" />
                                </td>
                            </tr>
                        </table>
                    </td>


                    <td class="">
                        <%--<asp:DropDownList ID="ddlEquipoNuevo" runat="server" Width="230px"></asp:DropDownList>--%>
                        <div id="btnBuscarIMEI" style="width: 115px;" class="btnNormal">Buscar Equipo</div>
                        <%--<asp:Label ID="lblIMEIElegido" runat="server" Text=""></asp:Label>--%>
                        <asp:TextBox ID="txtIMEIElegido" runat="server" Text="" Width="180" ReadOnly="true"></asp:TextBox>&nbsp;&nbsp;
                    <img id="imgBorrar_IMEI_Fin" runat="server" alt="" src="../../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar IMEI" class="imgBtn" style="display: none; vertical-align: middle;" />
                        <asp:Image ID="imgErrorIMEIElegido" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Alerta_16x16.png" Style="display: none;" />&nbsp;
                    <asp:Label ID="lblErrorIMEIElegido" runat="server" Font-Italic="True"></asp:Label>
                    </td>
                </tr>

                <tr id="trNumeroEquiTemp" runat="server" style="display: none;">
                    <td>Número de equipo temporal
                    </td>
                    <td>
                        <asp:TextBox ID="txtNumeroEquiTemp" runat="server" Width="300" ReadOnly="true" Text=""></asp:TextBox>
                    </td>
                </tr>
                <tr id="trNumero">
                    <td class="" style="padding-left: 0px;">
                        <table>
                            <tr>
                                <td style="padding-left: 0px;">Número de celular
                                </td>
                                <td>
                                    <div id="dvInfoLinea" runat="server" style="display: none;">
                                        <ttgInfo:ToolTipGenerico ID="ttgInfoLinea" runat="server" Mensaje="" />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="">
                        <%--<asp:Label ID="lblNumCelular" runat="server"></asp:Label>--%>
                        <asp:TextBox ID="txtNumCelular" runat="server" Width="300" ReadOnly="true"></asp:TextBox>
                        <div id="btnBuscarLinea" style="width: 115px; display: none;" class="btnNormal">
                            <asp:Label ID="lblBuscarLinea" runat="server" Text="Buscar Línea"></asp:Label>
                            <asp:HiddenField ID="hdfBuscarLinea" runat="server" Value="buscar" />
                        </div>
                        <%--<asp:Label ID="lblMsgNumero" runat="server" ></asp:Label>--%>
                        <asp:TextBox ID="txtMsgNumero" runat="server" ReadOnly="true" Width="180"></asp:TextBox>

                        <asp:DropDownList ID="ddlNumero" runat="server" Width="117"></asp:DropDownList>
                    </td>
                </tr>

                <tr class="TipoCambioEquipo" style="display: none;">
                    <td colspan="2">
                        <hr />
                    </td>
                </tr>
                <tr class="TipoCambioEquipo" style="display: none;">
                    <td colspan="2" style="font-weight: 600; font-size: 12px;">
                        <u>Equipo anterior</u>
                    </td>
                </tr>

                <tr id="trModEquipoAnt" runat="server">
                    <td style="padding-left: 15px;">
                        <asp:Label ID="lblModelo" runat="server" Text="Modelo"></asp:Label>
                    </td>
                    <td class="">
                        <asp:TextBox ID="txtModeloEquipoAnt" runat="server" Width="300" ReadOnly="true"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trIMEIEquipoAnt" runat="server">
                    <td style="padding-left: 15px;">
                        <asp:Label ID="lblIMEIEquipoAntCab" runat="server" Text="IMEI"></asp:Label>
                    </td>
                    <td class="">
                        <asp:TextBox ID="txtIMEIEquipoAnt" runat="server" Width="300" ReadOnly="true"></asp:TextBox>
                    </td>
                </tr>
                <tr class="TipoCambioEquipo" style="display: none; height: 5px;"></tr>
                <tr class="TipoCambioEquipo" style="display: none;">
                    <td style="padding-left: 15px; vertical-align: top;" rowspan="3">Acciones
                    </td>
                    <td>
                        <asp:HiddenField runat="server" ID="cboAccionEquipo_Valor" />
                        <div style="width: 50px; float: left; margin-top: 4px;">Equipo: &nbsp;</div>
                        <select id="cboAccionEquipo" style="width: 100px;">
                            <option value="Baja">Dar de Baja</option>
                            <option value="Liberar">Liberar</option>
                        </select>
                    </td>
                </tr>
                <tr class="TipoCambioEquipo" style="display: none;">
                    <td class="">
                        <asp:HiddenField runat="server" ID="cboAccionCuenta_Valor" />
                        <div style="width: 50px; float: left; margin-top: 4px;">Cuenta: &nbsp;</div>
                        <select id="cboAccionCuenta" style="width: 100px; float: left;">
                            <option value="Mantener">Mantener</option>
                            <option value="Cambiar">Cambiar</option>
                            <option value="Liberar">Liberar</option>
                        </select>
                        <div id="dvCambioEquipo_Cuenta" runat="server" style="display: none; float: left; margin-left: 5px;">
                            <asp:HiddenField runat="server" ID="bqCambioEquipo_Cuenta_value" />
                            <uc1:BusquedaPrincipal ID="bqCambioEquipo_Cuenta" runat="server" />
                        </div>
                    </td>
                </tr>
                <tr class="TipoCambioEquipo" style="display: none;">
                    <td class="">
                        <asp:HiddenField runat="server" ID="cboAccionPlan_Valor" />
                        <div style="width: 50px; float: left; margin-top: 4px;">Plan: &nbsp;</div>
                        <select id="cboAccionPlan" style="width: 100px; float: left;">
                            <option value="Mantener">Mantener</option>
                            <option value="Cambiar">Cambiar</option>
                            <option value="Liberar">Liberar</option>
                        </select>
                        <div id="dvCambioEquipo_Plan" runat="server" style="display: none; float: left; margin-left: 5px;">
                            <asp:HiddenField runat="server" ID="bqCambioEquipo_Plan_value" />
                            <uc1:BusquedaPrincipal ID="bqCambioEquipo_Plan" runat="server" />
                        </div>
                    </td>
                </tr>

                <tr class="TipoCambioEquipo" style="display: none;">
                    <td colspan="2">
                        <hr />
                    </td>
                </tr>

                <tr id="trIMEIEquipoEnt" style="display: none;">
                    <td class="">IMEI Equipo entregado
                    </td>
                    <td class="">
                        <div id="btnBuscarIMEIEnt" style="width: 104px;" class="btnNormal">Buscar Equipo</div>
                        <asp:TextBox ID="txtIMEIEnt" runat="server" Text="" Width="115" ReadOnly="true"></asp:TextBox>
                        <img id="imgBorrar_IMEIEnt" runat="server" alt="" src="../../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar IMEI" class="imgBtn" style="display: none; vertical-align: middle;" />
                        <asp:CheckBox ID="chkMismoIMEI" runat="server" Text="Mismo IMEI" />&nbsp;&nbsp;
                    <asp:Image ID="imgErrorIMEIEnt" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Alerta_16x16.png" Style="display: none;" />&nbsp;
                    <asp:Label ID="lblErrorIMEIEnt" runat="server" Font-Italic="True"></asp:Label>
                    </td>
                </tr>




                <%--Filas para solicitudes de servicios--%>
                <tr id="trServicioSolicitado" style="display: none;">
                    <td>Servicios</td>
                    <td>
                        <table id="tbServiciosSolicitud"></table>
                    </td>
                </tr>
                <tr id="trCantidadSolicitada" style="display: none;">
                    <td>Cantidad</td>
                    <td>
                        <asp:Label ID="lblCantidadSolicitada" runat="server"></asp:Label>
                        <%--<asp:TextBox = ID="txtCantidadNueva" runat="server"></asp:TextBox> nuevo--%>
                    </td>
                </tr>
                <tr id="trTiempoSolicitado" style="display: none;">
                    <td>Tiempo</td>
                    <td>
                        <asp:Label ID="lblTiempoSolicitado" runat="server"></asp:Label>
                    </td>
                </tr>
                <tr id="trMotivo" style="display: none;">
                    <td>
                        <asp:Label ID="lblMotivoSolServ" runat="server"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtMotivoSolServ" runat="server" ReadOnly="true" TextMode="MultiLine" Width="200px"
                            Height="40px" Style="resize: none;"></asp:TextBox>
                    </td>
                </tr>
                <%--Final solicitudes de servicios--%>
                <tr style="display: none;">
                    <td class="">
                        <asp:Label ID="lbltdMotivo" runat="server" Text="Motivo de reposición"></asp:Label>
                    </td>
                    <td class="">
                        <asp:DropDownList ID="ddlMotivoReposicion" runat="server" Width="100px"></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trObservacion" runat="server" style="display: none;">
                    <td>Observación
                    </td>
                    <td>
                        <asp:TextBox ID="txtObservacion" runat="server" TextMode="MultiLine"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trServiciosSolicitados" style="display: none;">
                    <td>Servicios solicitados
                    </td>
                    <td>
                        <table id="tbServSolic"></table>
                        <%--<div id="divServSolic"></div>--%>
                    </td>
                </tr>
                <tr id="trServiciosAmpliacion" style="display: none;">
                    <td>Servicios ampliación</td>
                    <td>
                        <table id="tbServAmpliacion"></table>
                    </td>
                </tr>
                <tr id="trServiciosAmpliacionEdit" style="display: none;">
                    <td style="padding-left: 0;">
                        <table>
                            <tr>
                                <td>Servicios ampliación</td>
                                <td style="padding-left: 0;">
                                    <ttgInfo:ToolTipGenerico ID="ttgInfoServiciosProcesar" runat="server" Mensaje="Se procesaran los servicios que estén seleccionados" />
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td>
                        <table id="tbServAmpliacionEdit"></table>
                    </td>
                </tr>
                <tr id="trPlanAmpInicial" style="display: none;">
                    <td>
                        <asp:Label ID="lblPlanAmpInicial" runat="server" Text="Plan Anterior"></asp:Label>
                    </td>
                    <td style="padding-left: 0px; padding-top: 0px;">
                        <table>
                            <tr>
                                <td style="padding-left: 0px; padding-top: 0px;">
                                    <asp:TextBox ID="txtPlanAmpInicial" runat="server" ReadOnly="true" Width="300"></asp:TextBox>
                                </td>
                                <td>
                                    <img id="imgDetPlanAnterior" alt="" src="../../../Common/Images/Mantenimiento/VerDetalle.png" class="imgBtn" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trPlanAmpSolicitado" style="display: none;">
                    <td style="padding-left: 0px; padding-top: 0px; padding-bottom: 0px;">
                        <table>
                            <tr>
                                <td style="padding-left: 0px; padding-top: 0px; padding-bottom: 0px;">
                                    <asp:Label ID="lblPlanAmpSolicitado" runat="server" Text="Plan Solicitado"></asp:Label>
                                </td>
                                <td>
                                    <div id="dvInfoPlanAmpSol">
                                        <ttgInfo:ToolTipGenerico ID="ttgInfoPlanAmpSol" runat="server" Mensaje="Este plan reemplazará al plan actual una vez procesada la solicitud." />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="padding-left: 0px; padding-top: 0px; padding-bottom: 0px;">
                        <table>
                            <tr>
                                <td style="padding-left: 0px; padding-top: 0px; padding-bottom: 0px;">
                                    <asp:TextBox ID="txtPlanAmpSolicitado" runat="server" ReadOnly="true" Width="300"></asp:TextBox>
                                </td>
                                <td>
                                    <img id="imgDetPlanSolicitado" alt="" src="../../../Common/Images/Mantenimiento/VerDetalle.png" class="imgBtn" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trPlanAmpActual" style="display: none;">
                    <td>
                        <asp:Label ID="lblPlanActual" runat="server" Text="Plan Actual"></asp:Label>
                    </td>
                    <td style="padding-left: 0px; padding-top: 0px;">
                        <table>
                            <tr>
                                <td style="padding-left: 0px; padding-top: 0px;">
                                    <asp:TextBox ID="txtPlanActualLinea" runat="server" ReadOnly="true" Width="300"></asp:TextBox>
                                </td>
                                <td>
                                    <img id="imgDetPlanActual" alt="" src="../../../Common/Images/Mantenimiento/VerDetalle.png" class="imgBtn" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trMontoTotalServAmp" style="display: none;">
                    <td style="padding-left: 0px; padding-top: 0px;">
                        <table>
                            <tr>
                                <td style="padding-left: 0px;">Monto total</td>
                                <%--<td>
                                <ttgInfo:ToolTipGenerico ID="ttfInforMontoTotalAmpliacion" runat="server" Mensaje="El costo total de los servicios agregados serán incluidos en su pago mensual" />
                            </td>--%>
                            </tr>
                        </table>
                    </td>
                    <td>
                        <asp:TextBox ID="txtMontoTotalServAmp" runat="server" ReadOnly="true" Width="100"></asp:TextBox>
                        <asp:Label ID="lblInfoMontoTotalAmpliacion" runat="server" ForeColor="#4297d7" Font-Size="11px" Font-Bold="true" Font-Italic="true"
                            Text="El costo total de los servicios agregados serán incluidos en su pago mensual"></asp:Label>
                    </td>
                </tr>
                <tr id="trLimiteCredito" style="display: none;">
                    <td>Límite de Crédito
                    </td>
                    <td>
                        <asp:TextBox ID="txtLimiteCredito" runat="server" MaxLength="8" Width="75"></asp:TextBox>
                    </td>
                </tr>





                <tr id="tfFechaEntrega">
                    <td class="">Fecha de Entrega
                    </td>
                    <td class="">
                        <asp:TextBox ID="txtFecha" runat="server" Width="75px" ReadOnly="true" CssClass="txtFecha"></asp:TextBox>
                        <img id="imgBorrarFechaEntrega" runat="server" alt="" src="../../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn" style="vertical-align: middle;" />
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="padding-left: 50px; padding-top: 7px; display: none;">Datos Asignados
                    </td>
                </tr>
                <tr id="trModeloAsignado" style="display: none;">
                    <td>Modelo Asignado
                    </td>
                    <td>
                        <asp:TextBox ID="txtModeloAsignado" runat="server" Width="300" ReadOnly="true"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trIMEIAsignado" style="display: none;">
                    <td>IMEI Asignado
                    </td>
                    <td>
                        <asp:TextBox ID="txtIMEIAsignado" runat="server" Width="300" ReadOnly="true"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trLineaAsignada" style="display: none;">
                    <td>Línea Asignada
                    </td>
                    <td>
                        <asp:TextBox ID="txtLineaAsignada" runat="server" Width="300" ReadOnly="true"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trPlanAsignado" style="display: none;">
                    <td>Plan Asignado
                    </td>
                    <td>
                        <asp:TextBox ID="txtPlanAsignado" runat="server" Width="300" ReadOnly="true"></asp:TextBox>
                    </td>
                </tr>


                <tr id="trColor" style="display: none;">
                    <td>Color</td>
                    <td>
                        <asp:TextBox ID="txtColor" runat="server" Width="300"></asp:TextBox></td>
                </tr>

                <tr id="trSeguro" style="display: none;">
                    <td>Seguro</td>
                    <td>
                        <asp:DropDownList ID="ddlSeguro" runat="server">
                            <asp:ListItem>SI</asp:ListItem>
                            <asp:ListItem>NO</asp:ListItem>
                        </asp:DropDownList>

                    </td>
                </tr>


                <tr id="trFormatoAsignacion" style="display: none;">
                    <td>Formato Asignación (pdf,zip,rar) <span id="FormatoAsignacion_Obligatorio" style="color: red;"></span>
                    </td>
                    <td>
                        <div class='UploadDiv' runat="server" id="UploadDiv_FormatoAsignacion" style='display: inline-block; cursor: hand !important;'>
                            <div id='upl_AdjuntoFormatoAsignacion' obj='AdjuntoFormatoAsignacion' oblig='false' tipdat='VARBINARY(MAX)'
                                vctipext='pdf,zip,rar' class='VARBINARY imgButton' align='center' style='text-align: left;'>
                                <table>
                                    <tr>
                                        <td style='text-align: left;'>
                                            <img alt='' src='../../../Common/Images/Mantenimiento/SubirArchivo.png' width='16px' height='16px' /></td>
                                        <td style='vertical-align: bottom; text-decoration: underline;'>Adjuntar Archivo</td>
                                    </tr>
                                </table>
                            </div>
                            <div style='text-decoration: underline;' id='file_AdjuntoFormatoAsignacion'></div>
                        </div>

                    </td>
                </tr>

                <tr id="trOrdenServicio" style="display: none;">
                    <td>Orden de Servicio (pdf,zip,rar) <span id="OrdenServicio_Obligatorio" style="color: red;"></span>
                    </td>
                    <td>
                        <div class='UploadDiv' runat="server" id="UploadDiv_OrdenServicio" style='display: inline-block; cursor: hand !important;'>
                            <div id='upl_AdjuntoOrdenServicio' obj='AdjuntoOrdenServicio' oblig='false' tipdat='VARBINARY(MAX)'
                                vctipext='pdf,zip,rar' class='VARBINARY imgButton' align='center' style='text-align: left;'>
                                <table>
                                    <tr>
                                        <td style='text-align: left;'>
                                            <img alt='' src='../../../Common/Images/Mantenimiento/SubirArchivo.png' width='16px' height='16px' /></td>
                                        <td style='vertical-align: bottom; text-decoration: underline;'>Adjuntar Archivo</td>
                                    </tr>
                                </table>
                            </div>
                            <div style='text-decoration: underline;' id='file_AdjuntoOrdenServicio'></div>
                        </div>

                    </td>
                </tr>

                <tr id="trValeResguardo" style="display: none;">
                    <td><span id="spTituloValeResguardo">Vale de Resguardo (pdf,zip,rar) </span><span id="ValeResguardo_Obligatorio" style="color: red;"></span>
                    </td>
                    <td>
                        <div class='UploadDiv' runat="server" id="UploadDiv_ValeResguardo" style='display: inline-block; cursor: hand !important;'>
                            <div id='upl_AdjuntoValeResguardo' obj='AdjuntoValeResguardo' oblig='false' tipdat='VARBINARY(MAX)'
                                vctipext='pdf,zip,rar' class='VARBINARY imgButton' align='center' style='text-align: left;'>
                                <table>
                                    <tr>
                                        <td style='text-align: left;'>
                                            <img alt='' src='../../../Common/Images/Mantenimiento/SubirArchivo.png' width='16px' height='16px' /></td>
                                        <td style='vertical-align: bottom; text-decoration: underline;'>Adjuntar Archivo</td>
                                    </tr>
                                </table>
                            </div>
                            <div style='text-decoration: underline;' id='file_AdjuntoValeResguardo'></div>
                        </div>

                    </td>
                </tr>


                
                <tr id="trFilaAdjuntoFinal">
                    <td><span id="">Adjuntar (pdf,zip,rar,xlsx) </span>
                    </td>
                    <td>
                        <div class='UploadDiv' runat="server" id="UploadDiv_ArchivoAdjuntoFinal" style='display: inline-block; cursor: pointer !important;'>
                            <div id='upl_ArchivoAdjuntoFinal' obj='ArchivoAdjuntoFinal' oblig='false' tipdat='VARBINARY(MAX)'
                                vctipext='pdf,zip,rar' class='VARBINARY imgButton' align='center' style='text-align: left;'>
                                <table>
                                    <tr>
                                        <td style='text-align: left;'>
                                            <img alt='' src='../../../Common/Images/Mantenimiento/SubirArchivo.png' width='16px' height='16px' /></td>
                                        <td style='vertical-align: bottom; text-decoration: underline;'>Adjuntar Archivo</td>
                                    </tr>
                                </table>
                            </div>
                            <div style='text-decoration: underline;' id='file_ArchivoAdjuntoFinal'></div>
                        </div>

                    </td>
                </tr>


                <tr id="" style="height: 15px;"></tr>
                <tr id="" style="">
                    <td><span style="color: red;">(*)</span> El dato es requerido.
                    </td>
                    <td></td>
                </tr>

            </table>

            <table runat="server" style="width: 100%;" id="tbResumenCierre" visible="false">
                <tr>
                    <td colspan="2">
                        <hr />
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="font-weight: 600; font-size: 12px;">
                        <u>Cierre de la Solicitud</u>
                    </td>
                </tr>
                <tr>
                    <td width="160px">
                        <asp:Label ID="lblTipoCierre" runat="server">Tipo cierre</asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtTipoCierre" runat="server" Width="442" Enabled="false" Style="resize: none;"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trMotivoRecAnu" runat="server" style="display: none;">
                    <td width="160px">
                        <asp:Label ID="lblMotivo" runat="server">Motivo</asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtMotivo" runat="server" Width="442" Height="60" Enabled="false" TextMode="MultiLine"
                            Style="resize: none;"></asp:TextBox>
                    </td>
                </tr>


            </table>

        </div>
        <div id="dvAcciones" runat="server" style="margin-top: 5px; text-align: left;">
            <div id="divBtsProceso" style="width: auto; float: left;">
                <div id="btnGuardar" class="btnNormal">
                    <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                    <%--<a>Procesar</a>--%>
                    <asp:Label ID="lblBtnGuardar" runat="server" Text="Guardar"></asp:Label>
                </div>
                <div id="btnEliminar" class="btnNormal" style="display: none;">
                    <asp:Image ID="imgEliminar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/trash.png" />
                    <asp:Label ID="lblBtnEliminar" runat="server" Text="Eliminar"></asp:Label>
                </div>
                <div id="btnAsignar" class="btnNormal">
                    <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Asignar.png" Width="16" Height="16" />
                    <asp:Label ID="lblBtnAsignar" runat="server" Text="Asignarme"></asp:Label>
                </div>
            </div>

            <div id="divBtsOperador" style="width: auto; float: left; margin-right: 20px;">
                <div id="btnEnviarOperador" class="btnNormal" style="display: none;" title="Enviar a operador">
                    <asp:Image ID="imgEnviarOperador" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Export_2_16x16.png" Width="16px" Height="16px" />
                    <asp:Label ID="lblEnviarOperador" runat="server" Text="Enviar"></asp:Label>
                </div>
                <%--<div id="btnFormatoOrdenServicio" class="btnNormal" style="display:none;" title="Orden de Servicio">
                <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/pdf.png" Width="16px" height="16px"/>
                <asp:Label ID="Label1" runat="server" Text="Orden Servicio"></asp:Label>
            </div>--%>
                <div id="btnDevueltoOperador" class="btnNormal" style="display: none;" title="Devuelto por operador">
                    <asp:Image ID="imgDevueltoOperador" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Import_2_16x16.png" Width="16px" Height="16px" />
                    <asp:Label ID="lblDevueltoOperador" runat="server" Text="Devuelto"></asp:Label>
                </div>
            </div>

            <div id="divBtsBasico" style="width: auto; float: left; margin-right: 20px;">

                <div id="btnDescargarFormatoAsignacion" class="btnNormal" style="display: none;" title="Descargar">
                    <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/pdf.png" />
                    <asp:Label ID="Label1" runat="server" Text="Formato Asignación"></asp:Label>
                </div>


                <div id="btnGuardarPrevio" class="btnNormal" style="display: none;" title="Guardar">
                    <asp:Image ID="imgGuardarPrevio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                    <asp:Label ID="lblBtnGuardarPrevio" runat="server" Text="Guardar"></asp:Label>
                </div>
                <div id="btnCerrar" class="btnNormal" style="display: none;">
                    <asp:Image ID="imgSalir" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" ToolTip="Cerrar" />
                    <%--<a>Salir</a>--%>
                    <asp:Label ID="lblBtnCerrar" runat="server" Text="Cerrar"></asp:Label>
                </div>
            </div>

            <%--<table id="tbTipoPausa">
                <tr>
                    <td id="tdTipoPausa">
                        <div id="divTipoPausa">
                                
                            <asp:DropDownList ID="ddlTipoPausa" runat="server" Style=""></asp:DropDownList>
                                
                            <div id="btnPausaReanuda" class="btnNormal" title="Pausar">
                                <asp:Label ID="lblPausaReanuda" runat="server" Text="Pausar"></asp:Label>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>--%>

            <div id="dvMensajeBotones" runat="server" style="display: none; float: right;">
                <asp:Label ID="lblMensajeBotones" runat="server" Font-Size="13px" ForeColor="#0033cc" Font-Bold="true"></asp:Label>
            </div>
        </div>

        <div id="divRechazarSolicitud" runat="server" style="display: none;">
            <table>
                <tr>
                    <td>Tipo solicitud
                    </td>
                    <td>
                        <asp:Label ID="lblTipoSolicitudR" runat="server"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td>Nombre empleado
                    </td>
                    <td>
                        <asp:Label ID="lblNombreEmplR" runat="server"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td>Observación
                    </td>
                    <td>
                        <asp:TextBox ID="txtObservacionR" runat="server" TextMode="MultiLine"></asp:TextBox>
                    </td>
                </tr>
            </table>
        </div>
        <div id="dvBuscarEquipo" style="display: none; background-color: White;">
            <table style="display: none;">
                <tr>
                    <td>Modelo</td>
                    <td>
                        <asp:DropDownList ID="ddlModeloEquipoBuscar" runat="server" Width="230px" AutoPostBack="False"></asp:DropDownList>
                    </td>
                    <td style="width: 15px;"></td>
                    <td>Tipo de Adquisición</td>
                    <td>
                        <asp:DropDownList ID="ddlTipoAdquisicion" runat="server" Width="" AutoPostBack="False"></asp:DropDownList>
                    </td>
                    <td></td>
                    <td>
                        <asp:TextBox ID="txtFechaPeriodoI" runat="server" Width="63px" ReadOnly="true" CssClass="txtFecha" Visible="false"></asp:TextBox>
                        <%--<img id="imgBorrarPerIni" alt="" src="../../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>--%>

                        <asp:TextBox ID="txtFechaPeriodoF" runat="server" Width="63px" ReadOnly="true" CssClass="txtFecha" Visible="false"></asp:TextBox>
                        <%--<img id="imgBorrarPerFin" alt="" src="../../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>--%>
                    </td>
                    <td style="width: 15px;"></td>
                </tr>
            </table>
            <div style="width: 100%;">
                <table id="tbEquipo"></table>
                <div id="pager_Equipo"></div>
            </div>
            <br />
            <div style="text-align: right; width: 100%;">
                <div id="btnElegirEquipo" class="btnNormal">
                    <a>Elegir</a>
                </div>
                <div id="btnCerrarBusqueda" class="btnNormal">
                    <a>Cerrar</a>
                </div>
            </div>
        </div>
        <div id="divConEli" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            ¡Atención!, se eliminará de forma permanente la solicitud elegida y los elementos relacionados (Notas y seguimientos de Estado). ¿Desea continuar?
        </div>
        <div id="divConRec" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            ¿Está seguro que desea rechazar esta solicitud?
        </div>
        <div id="divConAnu" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            ¿Está seguro que desea anular esta solicitud?
        <table id="trAccionIngresoAlmacen" style="display: none; margin-top: 5px;">
            <tr>
                <td>Esta solicitud ya cuenta con un ingreso a almacén. Deberá seleccionar una acción para el dispositivo ingresado.
                </td>
            </tr>
            <tr>
                <td style="padding-left: 15px;">
                    <asp:RadioButton runat="server" ID="rbtAnularIngreso" GroupName="AccionDispAlmacen" Text="Anular Ingreso en almacén" />
                </td>
            </tr>
            <tr>
                <td style="padding-left: 15px;">
                    <asp:RadioButton runat="server" ID="rbtActualizarDisp" GroupName="AccionDispAlmacen" Text="Dejar Dispositivo Disponible" />
                </td>
            </tr>
        </table>
        </div>
        <div id="dvRechazar" style="display: none;">
            <table>
                <tr>
                    <td>Comentarios</td>
                </tr>
                <tr>
                    <td>
                        <asp:TextBox ID="txtComentarios" runat="server" Width="460px" Heigh="216px" TextMode="MultiLine" MaxLength="2000"></asp:TextBox></td>
                </tr>
            </table>
        </div>
        <div id="dvPausar" style="display: none;">
            <table>
                <tr>
                    <td>Se ha detectado que la solicitud ha cambiado de estado, a continuación ingrese el motivo del cambio:</td>
                </tr>
                <tr>
                    <td><asp:TextBox id="txtComentariosPausa" runat="server" Width="460px" Height="130px" TextMode="MultiLine" MaxLength="2000"></asp:TextBox></td>
                </tr>
            </table>
        </div>
        <div id="divConMontoCero" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            ¡Atención!, Se está culminando esta solicitud con monto cero (0.00). ¿Desea continuar?
        </div>
        <div id="divConMontoSugerido" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            ¡Atención!, Se está culminando esta solicitud con un monto diferente al sugerido para la misma.
        <table style="margin-left: 30px; margin-top: 5px; margin-bottom: 5px;">
            <tr>
                <td style="width: 120px;"><b>Monto de la Solicitud</b></td>
                <td align="right">
                    <b>
                        <label id="lblMontoProcesar"></label>
                    </b>
                </td>
            </tr>
            <tr>
                <td>Monto Sugerido</td>
                <td align="right">
                    <label id="lblMontoSugeridoProcesar"></label>
                </td>
            </tr>
        </table>
            ¿Desea continuar?
        </div>
        <div id="divConPro" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <span id="divMensajeAtención">¡Atención!, Este proceso no podrá ser revertido y si la solicitud tiene un monto mayor a 0, se generará un cronograma de pagos para el empleado de la solicitud. ¿Desea continuar?</span> 
        </div>
        <div id="divConProEmpresa" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            ¡Atención!, Este proceso no podrá ser revertido y si la solicitud tiene un monto mayor a 0, se cargará el monto a la empresa. ¿Desea continuar?
        </div>
        <div id="dvNota" style="display: none;">
            <iframe id="ifNota" frameborder="0" style="padding: 0px; margin: 0px; height: 520px; width: 670px;"></iframe>
        </div>
        <div id="dvArchivosAdjuntos" runat="server" style="display: none;">
            <iframe id="ifDocAdjuntosBD" runat="server"
                width="415" height="330" style="margin: 0px; padding: 0px;" frameborder="0"></iframe>
            <table width="100%" id="trValidAdjuntos">
                <tr>
                    <td>
                        <b>Cant. máx.: </b>
                        <label id="lblAdjuntosValidCantidad" style="padding-right: 10px;" />
                    </td>
                    <td>
                        <b>Extens.: </b>
                        <label id="lblAdjutnosValidExtensiones" style="padding-right: 10px;" />
                    </td>
                    <td>
                        <b>Tam. máx.: </b>
                        <label id="lblAdjutnosValidTamanoMax" />
                        <%-- (<label id="lblAdjuntosValidTamanoTipo" />)--%>
                    </td>
                </tr>
            </table>
        </div>
        <div id="divInfoFinanciamiento" style="display: none; overflow: hidden;">
            <iframe id="ifInfoFinanciamiento" runat="server" style="margin: 0px; padding: 0px;" frameborder="0"></iframe>
        </div>
        <div id="divMsgConfirmar" style="display: none;">
            <asp:Label ID="lblMsjConfirmacion" runat="server"></asp:Label>
        </div>
        <div id="dvEditarServicioAmpliacion" style="display: none; width: 300px; height: 95px">
            <table width="100%">
                <tr>
                    <td colspan="2">Paquetes para el servicio:&nbsp;
                    <asp:Label ID="lblEditServ_Nombre" runat="server"></asp:Label>
                        <asp:HiddenField ID="hdfEditPaqueteAmp" runat="server" />
                    </td>
                </tr>
                <tr>
                    <td colspan="2"></td>
                </tr>
                <tr>
                    <td style="padding-top: 8px;">Paquetes: 
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlEditPaquetes" runat="server" Width="200"></asp:DropDownList>
                    </td>
                </tr>
                <%--<tr>
                <td colspan="2" align="right">
                    <div id="btnEditAceptar" class="btnNormal">
                        <asp:Image ID="imgEditAceptar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif"/>
                        <asp:Label ID="lblEditAceptar" runat="server" Text="Aceptar"></asp:Label>
                    </div>
                    <div id="btnEditCancelar" class="btnNormal">
                        <asp:Image ID="imgEditCancelar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                        <asp:Label ID="lblEditCancelar" runat="server" Text="Cancelar"></asp:Label>
                    </div>
                </td>
            </tr>--%>
            </table>
        </div>
        <div id="divMsgConfirValidPorTipo" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <asp:Label ID="lblMsjConfirmarProcAmp" runat="server">
            
            </asp:Label>
        </div>
        <div id="dvDetallePlan" style="display: none; width: 430px; height: 350px;">
            <iframe id="ifDetallePlan" frameborder="0" width="420px" height="330px"></iframe>
        </div>
        <div id="divConAsi" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            ¿Está seguro que desea asignarse esta solicitud?
        </div>
        <div id="divConAsiA" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            ¿Está seguro que desea asignar esta solicitud al especialista
            <label id="lblNombreTecAsig"></label>
            ?
        </div>
        <div id="dvBuscarLinea" style="display: none; overflow-x: hidden;">
            <table>
                <tr>
                    <td style="width: 150px;">Operador</td>
                    <td>
                        <asp:DropDownList ID="ddlOperador" runat="server" Width="210"></asp:DropDownList>
                        <asp:TextBox ID="txtOperador" runat="server" Width="200" ReadOnly="true"></asp:TextBox>
                        <asp:HiddenField ID="hdfOperador" runat="server" />
                    </td>
                </tr>
                <tr>
                    <td>Línea</td>
                    <td>
                        <asp:DropDownList ID="ddlLinea" runat="server" Width="210"></asp:DropDownList>
                        <asp:TextBox ID="txtLinea" runat="server" Width="200" ReadOnly="true"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>Cuenta</td>
                    <td>
                        <asp:TextBox ID="txtCuenta" runat="server" Width="200" ReadOnly="true"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>Tipo de Asiganción</td>
                    <td>
                        <asp:TextBox ID="txtTipoAsig" runat="server" Width="200" ReadOnly="true"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trSelLinPlan" style="display: none;">
                    <td>Plan</td>
                    <td>
                        <asp:DropDownList ID="ddlPlan" runat="server" Width="210"></asp:DropDownList>
                        <asp:TextBox ID="txtPlan" runat="server" Width="200" ReadOnly="true"></asp:TextBox>
                        <asp:HiddenField ID="hdfPlanProcesar" runat="server" />
                        <img id="imgDetPlanProcesar" alt="" src="../../../Common/Images/Mantenimiento/VerDetalle.png" class="imgBtn" />
                    </td>
                </tr>
                <tr id="trSelServLin" style="display: none;">
                    <td colspan="2">
                        <iframe id="ifLineaServicio" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
                    </td>
                </tr>
            </table>
        </div>
        <div id="divResumen" style="display: none; width: 430px; height: 100%;">
            <table>
                <tr>
                    <td>
                        <asp:TextBox ID="txtResumen" runat="server"></asp:TextBox>
                        <%--Height="240px"--%>
                    </td>
                </tr>
            </table>
        </div>
        <div id="dvComentProcesar" style="display: none;">
            <table>
                <tr>
                    <td>
                        <asp:Label Text="Tipo cierre:" runat="server" />
                        <asp:DropDownList ID="ddlTipoCierreSolicitud" runat="server" Style="margin-top: 5px;"></asp:DropDownList></td>

                </tr>
                <tr>
                    <td>Comentarios</td>
                </tr>
                <tr>
                    <td>
                        <asp:TextBox ID="txtComentProcesar" runat="server" Heigh="216px" Width="460px" TextMode="MultiLine" MaxLength="2000"></asp:TextBox></td>
                </tr>
            </table>
        </div>
        <div id="dvConfirmacionEnvioOperador" style="display: none;">
            <label id="lblMensajeEnvioOperador" style="padding-bottom: 8px;"></label>
            <div id="dvSeleccionOperador" style="margin-top: 8px;" runat="server">
                Seleccione el operador al que se le enviará el detalle de la solicitud.
            <br />
                <asp:DropDownList ID="ddlOperadorEnvio" runat="server" Style="margin-top: 5px;"></asp:DropDownList>
            </div>
        </div>
        <div id="dvAlertaSolicitudes" style="display: none;">
            <label id="lblMensajeAlertaSolicitudes" style="padding-bottom: 8px;"></label>
            <div id="Div1" style="margin-top: 8px;" runat="server">
                ¿Desea Continuar?
            </div>
        </div>
        <div id="DvMensajeAlert" runat="server" style="position: relative; width: 150px; border: 0px dotted gray; display: none; z-index: 9999; padding: 5px 5px 5px 0px; border-radius: 3px; box-shadow: 5px 5px 5px gray;"
            class="ui-state-highlight">
            <div style="height: 100%; float: left;">
                <span id="Span2" class="ui-icon ui-icon-triangle-1-w" style="float: left;"></span>
            </div>
            No puede asignar nuevo equipo ya que no cuenta con dispositivos disponibles.
        <div id="DvMiMensajeAlert" runat="server" style="width: 134px; float: left;">
        </div>
        </div>

        <%--        <div style="display: block; position: absolute; overflow: hidden; margin: 0px; padding: 0px; opacity: 0; direction: ltr; z-index: 9483; left: 165px; top: 479px; width: 105px; height: 22px; visibility: visible;">
            <input type="file" name="userfile" style="position: absolute; right: 0px; margin: 0px; padding: 0px; font-size: 480px;">
        </div>--%>

        <iframe id="ifReporteFormato" frameborder="0" style="margin: 0px; padding: 0px; display: none;" width="100%" height="470px"></iframe>

    </form>
</body>
</html>
