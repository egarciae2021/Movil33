<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Solicitudes_Adm_EditarSolicitudPersonalizada" CodeBehind="Adm_EditarSolicitudPersonalizada.aspx.vb" %>

<%@ Register Src="../../../Common/Controles/BusquedaPrincipal.ascx" TagName="BusquedaPrincipal" TagPrefix="uc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Content/css/shared/nifty.min.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/ajaxupload.js" type="text/javascript"></script>
    
    <style type="text/css">
        .ui-widget-overlay { 
            height: 100% !important; 
            width: 100% !important;
        }
    </style>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Adm_EditarSolicitudPersonalizada.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfTituloValeResguardo" runat="server" />
        <asp:HiddenField ID="hdfAdmin" runat="server" />
        <asp:HiddenField ID="hdfEnPausa" runat="server" />
        <asp:HiddenField ID="hdfMensajeTipoCierre" runat="server" />
        <asp:HiddenField ID="hfdUsaFinanciamiento" runat="server" />
        <asp:HiddenField ID="hfdBiCostoFijo" runat="server" />
        <asp:HiddenField ID="hdfTecnico" runat="server" />
        <asp:HiddenField ID="hdfResApr" runat="server" />
        <asp:HiddenField ID="hdfPropie" runat="server" />
        <asp:HiddenField ID="hdfUsuarioCreacion" runat="server" />
        <asp:HiddenField ID="hdfTecnicoResponsable" runat="server" />
        <asp:HiddenField ID="hdfTecnicoAsignado" runat="server" />
        <asp:HiddenField ID="hdfbiEnviarOperador" runat="server" />
        <asp:HiddenField ID="hdfCodEmp" runat="server" />
        <asp:HiddenField ID="hdfCodTipSol" runat="server" />
        <asp:HiddenField ID="hdfCodSol" runat="server" />
        <asp:HiddenField ID="hdfEstado" runat="server" />
        <asp:HiddenField ID="hdfEstado_Apr" runat="server" />
        <asp:HiddenField ID="hdfFraccionamiento" runat="server" />
        <asp:HiddenField ID="hdfFinaliza" runat="server" />
        <asp:HiddenField ID="hdfTabla" runat="server" />
        <asp:HiddenField ID="hdfMesesCuotas" runat="server" />
        <asp:HiddenField ID="hdfCodUsuarioCreacion" runat="server" />
        <asp:HiddenField ID="hdfEsResponsableTI" runat="server" />

        <asp:HiddenField ID="hdfSolicitudesMultipleEspecialista" runat="server" />

        <asp:HiddenField runat="server" ID="hdfNumMinCuo" />
        <asp:HiddenField runat="server" ID="hdfNumMaxCuo" />
        <asp:HiddenField runat="server" ID="hdfMinPerGra" />
        <asp:HiddenField runat="server" ID="hdfMaxPerGra" />
        <asp:HiddenField runat="server" ID="hdfTipoMonto" />

        <%--JHERRERA 20140805 Validación de montos para Cesión--%>
        <asp:HiddenField ID="hdfTipoCese" runat="server" />
        <asp:HiddenField ID="hdfMontoCese" runat="server" />
        <asp:HiddenField ID="hdfIGV" runat="server" />
        <asp:HiddenField ID="hdfBiEscalamiento" runat="server" />

        <asp:HiddenField ID="hdfAreaRequiereAutorizacion" runat="server" />
        <asp:HiddenField ID="hdfSolRequiereAutorizacion" runat="server" />
        <asp:HiddenField ID="hdfSolicitudAutorizada" runat="server" />
        <asp:HiddenField ID="hdfEsVistaAutorizador" runat="server" />
        <asp:HiddenField ID="hdfEsAutorizador" runat="server" />
        

        <%--        <div class='UploadDiv' style='display: inline-block; cursor: pointer; cursor: hand;'>
            <div id='upl_ArchivoAdjunto' class='VARBINARY imgButton' align='center' style='text-align:left;'>
                <table>
                    <tr>
                        <td style='text-align:left;'>
                            <img alt='' src='../../../Common/Images/Mantenimiento/SubirArchivo.png' width='16px' height='16px'/>
                        </td>
                        <td style='vertical-align:bottom; text-decoration:underline;'>Adjuntar Archivo</td>
                    </tr>
                </table>
            </div>
            <div style='text-decoration:underline;' id='file_ArchivoAdjunto'>
            </div>
        </div>
        --%>
        <%--<div style="width:100%; text-align:center;" >
        <asp:Label ID="lblNombreTipoSolicitud" runat="server" Font-Size="Medium" Font-Bold="true"></asp:Label>
       <%-- <div id="btnRefrescar" class="btnNormal" style="float:right;" runat="server">
            <asp:Image ID="imgRefrescar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Actualizar.png" ToolTip="Volver a cargar página"/>                    
        </div>
    </div>--%>
        <div style="overflow: auto; width: 100%; text-align: center;">
            <asp:Label ID="lblNombreTipoSolicitud" runat="server" Font-Size="Medium" Font-Bold="true"></asp:Label>

            <div id="divBtsGeneral" style="float: right;">
                <div id="btnRefrescar" class="btnNormal" style="float: right;" title="Voler a cargar página" runat="server">
                    <asp:Image ID="imgRefrescar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Actualizar.png" />
                </div>
                <div id="btnResumen" class="btnNormal" style="float: right;" title="Resumen">
                    <asp:Image ID="imgResumen" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Resumen_16x16.png" />
                    <%--<asp:Label ID="lblResumen" runat="server" Text="Resumen"></asp:Label>--%>
                </div>
                <div id="btnNotas" class="btnNormal" style="float: right;" title="Notas">
                    <asp:Image ID="imgNotas" runat="server" ImageUrl="~/Common/Images/Chat/write.png" />
                    <%--<asp:Label ID="lblNotas" runat="server" Text="Notas"></asp:Label>--%>
                </div>
                <table id="tbTipoPausa">
                    <tr>
                        <td id="tdTipoPausa">
                            <div id="divTipoPausa">
                                <span id="lblTiempoRestante" runat="server" style="font-size:Medium;font-weight:bold;"></span>
                                <span id="lblHabilitaEdicion" runat="server" style="display: none;"></span>
                                <asp:DropDownList ID="ddlTipoPausa" runat="server" Style=""></asp:DropDownList>

                                <div id="btnPausaReanuda" class="btnNormal" title="Pausar" style="display: none;">
                                    <asp:Label ID="Label2" runat="server" Text="Pausar"></asp:Label>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div style="float: right; font-style: italic; vertical-align: middle; margin-top: 10px; margin-right: 3px; display: none;"><span id="lblTextoRefrescar"></span></div>
        </div>

        <div id="dvCampo" class="dvPanel" style="overflow: auto; height: 419px; margin-top: 7px;">

            <table id="tbCamposDinamicos" runat="server" width="100%">
                <tr id="trCodigo">
                    <td  width="200px">Código de Solicitud</td>
                    <td>
                        <asp:Label ID="LblCodigo" runat="server" Font-Size="Medium" Font-Bold="true"></asp:Label>
                    </td>
                </tr>
                <tr id="trEstado_Apr">
                    <td>Estado de Solicitud</td>
                    <td>
                        <asp:Label ID="lblEstadoSolicitud" runat="server"></asp:Label>
                        <%--<asp:DropDownList ID="ddlFase" runat="server" Width="120px" Visible="false"></asp:DropDownList>--%>
                        <asp:DropDownList ID="ddlEstadoSolicitud" runat="server" Width="130px"></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trFraccionamiento" style="display: none;">
                    <td>Fraccionamiento</td>
                    <td>
                        <asp:DropDownList ID="ddlFraccionamiento" runat="server" Width="50px">
                            <%--Enabled="false"--%>
                            <asp:ListItem Value="0" Text="NO" Selected="True"></asp:ListItem>
                            <asp:ListItem Value="1" Text="SI"></asp:ListItem>
                        </asp:DropDownList>
                    </td>
                </tr>
                <%--<tr id="trMesesCuotas" style="display:none;">
                    <td>Cuotas en Meses</td>
                    <td>
                        <asp:DropDownList ID="ddlMesesCuotas" runat="server" Width="50px"></asp:DropDownList>
                    </td>
                </tr>--%>
                <tr id="trTipoMonto" style="display: none;">
                    <td>Tipo Monto</td>
                    <td>
                        <asp:DropDownList ID="ddlTipoMonto" runat="server">
                        </asp:DropDownList>
                        <asp:Label ID="lblTipoMontoDesc" runat="server"></asp:Label>
                    </td>
                </tr>
                <tr id="trMontoFijo" style="display: none;">
                    <td>Monto Fijo</td>
                    <td>
                        <asp:TextBox ID="txtMonto" runat="server" Width="54px" Enabled="false" MaxLength="11"></asp:TextBox>
                    </td>
                </tr>
                <%--<tr id="trFInanciamiento" runat="server" style="display: none;">
                    <td>
                        Financiamiento
                    </td>
                    <td>
                        <asp:TextBox ID="txtNombreFinanc" runat="server" ReadOnly="true" Width="300"></asp:TextBox>
                        <asp:HiddenField ID="hdfIdFInanciamiento" runat="server" />
                        <img id="imgInfoFinanciamiento" title="Ver detalle" class="imgBtn" src="../../../Common/Images/Mantenimiento/VerDetalle.png" />
                    </td>
                </tr>--%>
                <tr id="trFInanciamiento" runat="server" style="display: none;">
                    <td>Financiamiento
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlFinanciamiento" runat="server" Width="210px"></asp:DropDownList>
                        <img id="imgInfoFinanciamiento" title="Ver detalle" class="imgBtn" src="../../../Common/Images/Mantenimiento/VerDetalle.png" />
                    </td>
                </tr>
                <tr id="trMesesCuotas" style="display: none;">
                    <td>Cuotas</td>
                    <td>
                        <asp:TextBox ID="txtMesesCuotas" runat="server" Width="30px" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="lblMesesCuotas" runat="server"></asp:Label>
                    </td>
                </tr>
                <tr id="trPeriodoGracia" style="display: none;">
                    <td>Periodo Gracia</td>
                    <td>
                        <asp:TextBox ID="txtPeriodoGracia" runat="server" Width="30px"></asp:TextBox>
                        <asp:Label ID="lblPeriodoGracia" runat="server" Font-Italic="True"></asp:Label>
                    </td>
                </tr>

                <tr id="trAsignarA" style="display: none;">
                    <td>Asignar a Especialista</td>
                    <td>
                        <input type="checkbox" id="chkAsignarA" />
                    </td>
                </tr>
                <tr id="trTecnico" style="display: none;">
                    <td>Especialista Asignado</td>
                    <td>
                        <div id="dvTecnicoAsigndo" runat="server">
                            <uc1:BusquedaPrincipal ID="bpTecnicoAsignado" runat="server" />
                        </div>
                    </td>
                </tr>

                <tr id="trTecnicoCierre" style="display: none;">
                    <td>Especialista Cierre</td>
                    <td>
                        <div id="Div1" runat="server">
                            <asp:Label ID="lblTecnicoCierre" runat="server" />
                        </div>
                    </td>
                </tr>

                <tr id="trFechaAprobacion" style="display: none;">
                    <td>Fecha Aprobación
                    </td>
                    <td>
                        <asp:TextBox ID="txtFechaAprobacion" runat="server" Width="120px" onkeydown="return (event.keyCode!=8);"></asp:TextBox>
                        <img id="imgBorrarFechaAprobacion" alt="" src="../../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn" />
                    </td>
                </tr>

                <tr id="trMotivoRecAnu" runat="server" style="display: none;">
                    <td width="200px">
                        <asp:Label ID="lblMotivo" runat="server"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtMotivo" runat="server" Width="350" Height="60" Enabled="false" TextMode="MultiLine"></asp:TextBox>
                    </td>
                </tr>


            </table>





            <table runat="server" style="width: 100%; margin-top: 25px;" id="tbResumenCierre"  visible="false">
                <tr class="TipoCambioEquipo">
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
                    <td width="200px">
                        <asp:Label ID="lblTipoCierre" runat="server">Tipo cierre</asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtTipoCierre" runat="server" Width="442"  Enabled="false" Style="resize: none;"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td width="160px">
                        <asp:Label ID="Label3" runat="server">Motivo</asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="TxtMotivoCierre" runat="server" Width="442" Height="60" Enabled="false" TextMode="MultiLine"
                            Style="resize: none;"></asp:TextBox>
                    </td>
                </tr>

            </table>
        </div>



        <div id="dvAcciones" style="margin-top: 5px; text-align: left;">
            <div id="divBtsProceso" style="width: auto; float: left; margin-right: 20px;">
                <div id="btnGuardar" class="btnNormal" title="Guardar">
                    <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                    <asp:Label ID="lblBtnGuardar" runat="server" Text="Guardar"></asp:Label>
                </div>
                <div id="btnEliminar" class="btnNormal" style="display: none;" title="Eliminar">
                    <asp:Image ID="imgEliminar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/trash.png" />
                    <asp:Label ID="lblBtnEliminar" runat="server" Text="Eliminar"></asp:Label>
                </div>
                <div id="btnAsignar" class="btnNormal" title="Asignar">
                    <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Asignar.png" Width="16" Height="16" />
                    <asp:Label ID="lblBtnAsignar" runat="server" Text="Asignar"></asp:Label>
                </div>
            </div>

            <div id="divBtsOperador" style="width: auto; float: left; margin-right: 20px;">
                <div id="btnEnviarOperador" class="btnNormal" style="display: none;" title="Enviar a operador">
                    <asp:Image ID="imgEnviarOperador" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Export_2_16x16.png" Width="16px" Height="16px" />
                    <asp:Label ID="lblEnviarOperador" runat="server" Text="Enviar"></asp:Label>
                </div>
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

                <div id="btnValeResguardo" class="btnNormal" style="display: none;">
                    <asp:Image ID="Image3" runat="server" Width="16px" Height="16px" ImageUrl="~/Common/Images/pdf.png" />
                    <span id="aTituloValeResguardo">Vale Resguardo </span>
                </div>

                <div id="btnGuardarPrevio" class="btnNormal" style="display: none;" title="Guardar">
                    <asp:Image ID="imgGuardarPrevio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                    <asp:Label ID="lblBtnGuardarPrevio" runat="server" Text="Guardar"></asp:Label>
                </div>

                <div id="btnCerrar" class="btnNormal" style="display: none;" title="Cerrar">
                    <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    <%--<a>Cancelar</a>--%>
                    <asp:Label ID="lblBtnCerrar" runat="server" Text="Cerrar"></asp:Label>
                </div>
            </div>

            <div id="divBtnsAutorizacion" style="display: none; width: auto; float: right; margin-right: 20px;">
                <div id="btnSolicitarAutorizacion" class="btn btn-info" style="display: none;float: left;margin: 0px 5px;" title="Solicitar Autorización">
                    <asp:Label ID="lslBtnSolicitarAutorizacion" runat="server" Text="Solicitar Autorización"></asp:Label>
                </div>
                <div id="btnAutorizar" class="btn btn-success" style="display: none;float: left;margin: 0px 5px;" title="Autorizar Solicitud">
                    <asp:Label ID="lblBtnAutorizar" runat="server" Text="Autorizar"></asp:Label>
                </div>
                <div id="btnDenegar" class="btn btn-danger" style="display: none;float: left;margin: 0px 5px;" title="Denegar Autorización">
                    <asp:Label ID="lblBtnDenegar" runat="server" Text="Denegar"></asp:Label>
                </div>
            </div>
            
            <div id="divMensajeAutorizacion" runat="server" style="display: none; width: auto; float: right; margin-right: 20px;">
                <span id="lblMensajeEstadoAutorizacion" style="font-size:Medium;font-weight:bold;"></span>
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

            <div id="dvMensajeBotones" runat="server" style="display: none; float: right">
                <asp:Label ID="lblMensajeBotones" runat="server" Font-Size="13px" ForeColor="#0033cc" Font-Bold="true"></asp:Label>
            </div>
        </div>

        <div id="divInfoEmpleado" runat="server" style="display: none; overflow-x: hidden;">
            <iframe id="ifInfoEmpleado" frameborder="0" style="padding: 0px; margin: 0px;"
                width="560px" height="400px"></iframe>
        </div>
        <div id="divConEli" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            ¡Atención!, se eliminará de forma permanente la solicitud elegida y los elementos relacionados (Notas y seguimientos de Estado). ¿Desea continuar?
        </div>
        <div id="divConRec" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            ¿Está seguro que desa rechazar esta solicitud?
        </div>
        <div id="divConAnu" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            ¿Está seguro que desea anular esta solicitud?
        </div>
        <div id="dvRechazar" style="display: none;">
            <table>
                <tr>
                    <td>Comentarios</td>
                </tr>
                <tr>
                    <td>
                        <asp:TextBox ID="txtComentarios" runat="server" Width="460px" TextMode="MultiLine" MaxLength="2000"></asp:TextBox></td>
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
        <div id="divConPro" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <span id="divMensajeAtención">¡Atención!, Este proceso no podrá ser revertido y si la solicitud tiene un monto mayor a 0, se generará un cronograma de pagos para el empleado de la solicitud. ¿Desea continuar?</span> 
        </div>
        <div id="divMensajeCambioDeEstado" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            ¡Atención!, Se han detectado cambios en el formulario, por lo que se pasará la solicitud a estado en proceso. ¿Desea continuar?.
        </div>
        <div id="divConProEmpresa" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            ¡Atención!, Este proceso no podrá ser revertido y si la solicitud tiene un monto mayor a 0, se cargará el monto a la empresa. ¿Desea continuar?
        </div>
        <div id="dvNota" style="display: none;">
            <iframe id="ifNota" frameborder="0" style="padding: 0px; margin: 0px; height: 510px; width: 670px;"></iframe>
        </div>
        <div id="divInfoFinanciamiento" style="display: none; overflow: hidden;">
            <iframe id="ifInfoFinanciamiento" runat="server" style="margin: 0px; padding: 0px;" frameborder="0"></iframe>
        </div>
        <div id="divMsgConfirmar" style="display: none;">
            <asp:Label ID="lblMsjConfirmacion" runat="server"></asp:Label>
        </div>
        <div id="divResumen" style="display: none; width: 430px; height: 100%">
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
                        <asp:TextBox ID="txtComentProcesar" runat="server" Width="460px" TextMode="MultiLine" MaxLength="2000"></asp:TextBox></td>
                </tr>
            </table>
        </div>
        <div id="dvConfirmacionEnvioOperador" style="display: none;">
            <label id="lblMensajeEnvioOperador" style="padding-bottom: 8px;"></label>
            <div id="dvSeleccionOperador" runat="server" style="margin-top: 8px;">
                Seleccione el operador al que se le enviará el detalle de la solicitud.
            <br />
                <asp:DropDownList ID="ddlOperadorEnvio" runat="server" Style="margin-top: 5px;"></asp:DropDownList>
            </div>
        </div>
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

        <iframe id="ifReporteFormato" frameborder="0" style="margin: 0px; padding: 0px; display: none;" width="100%" height="470px"></iframe>

        <div id="dvGenerarResguardo" style="display: none;">
            <table border="0" width="100%">
                <tr>
                    <td style="width: 100px; text-align: right;">Factura:</td>
                    <td>
                        <asp:TextBox ID="txtFactura" runat="server" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Nro. Consecutivo:</td>
                    <td>
                        <asp:TextBox ID="txtNroConsecutivo" runat="server" Width="100px"></asp:TextBox>
                        <span id="lblNroConsecutivoAnterior" style="font-family: Tahoma; color: darkblue; font-size: 11px;"></span>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Tipo Servicio:</td>
                    <td>
                        <asp:DropDownList ID="ddlTipoServicio" Width="100px" runat="server">
                            <asp:ListItem Value="1" Text="CELULAR"></asp:ListItem>
                            <asp:ListItem Value="2" Text="TABLET"></asp:ListItem>
                            <asp:ListItem Value="3" Text="BAM"></asp:ListItem>
                            <asp:ListItem Value="4" Text="CHIP"></asp:ListItem>
                            <asp:ListItem Value="5" Text="BLACKBERRY"></asp:ListItem>
                            <asp:ListItem Value="6" Text="RADIOLOCALIZACIÓN"></asp:ListItem>
                            <asp:ListItem Value="7" Text="ROAMING"></asp:ListItem>
                        </asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Costo (S/IVA):</td>
                    <td>
                        <asp:TextBox ID="txtCosto" runat="server" Style="text-align: right;" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Marca:</td>
                    <td>
                        <asp:TextBox ID="txtMarca" runat="server" Enabled="false" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Modelo:</td>
                    <td>
                        <asp:TextBox ID="txtModelo" runat="server" Enabled="false" Width="100px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Nro Servicio:</td>
                    <td>
                        <asp:TextBox ID="txtNroServicio" runat="server" Enabled="false" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">IMEI:</td>
                    <td>
                        <asp:TextBox ID="txtIMEI" runat="server" Enabled="false" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">SIM:</td>
                    <td>
                        <asp:TextBox ID="txtSIM" runat="server" Width="100px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">PIN:</td>
                    <td>
                        <asp:TextBox ID="txtPIN" runat="server" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;"></td>
                    <td></td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;"></td>
                    <td></td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Accesorios:</td>
                    <td>
                        <asp:CheckBoxList ID="chkAccesorios" runat="server">
                            <asp:ListItem Value="HAND" Text="HAND SET"></asp:ListItem>
                            <asp:ListItem Value="BATE" Text="BATERIA LITIO"></asp:ListItem>
                            <asp:ListItem Value="ADAP" Text="ADAPTADOR CA"></asp:ListItem>
                            <asp:ListItem Value="AUDI" Text="AUDIFONO"></asp:ListItem>
                            <asp:ListItem Value="USB" Text="CABLE USB"></asp:ListItem>
                            <asp:ListItem Value="MANU" Text="MANUAL OPERACIÓN"></asp:ListItem>
                        </asp:CheckBoxList>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;"></td>
                    <td></td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;"></td>
                    <td></td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Observaciones:</td>
                    <td colspan="7">
                        <asp:TextBox ID="txtObservaciones" runat="server" Height="50px" TextMode="MultiLine" Width="755px"></asp:TextBox>
                    </td>
                </tr>
            </table>
        </div>

    </form>
</body>
</html>