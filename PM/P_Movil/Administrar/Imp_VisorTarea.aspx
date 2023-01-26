<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Imp_VisorTarea" Codebehind="Imp_VisorTarea.aspx.vb" %>
<%@ Register Src="../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link  href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.timer.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Imp_VisorTarea.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
        <%--<div id="dvCargando" class="dvCargando"></div>--%>
        <div id="divMsgConfirmacionAhora" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>¡Se procesará esta cola ahora!, ¿Desea continuar?
        </div>
        <div id="divMsgConfirmacion" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>¡Se reprocesará esta cola!, ¿Desea continuar?
        </div>
        <div id="divMsgConfirmacionEliminar" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>¡Se eliminará la cola seleccionada!, ¿Desea continuar?
        </div>
        <div id="divMsgConfirmacionCancelacionProceso" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>¡Se Cancelará el Proceso de la cola seleccionada!, ¿Desea continuar?
        </div>

        <div class="dvPanel" style="overflow:auto;text-align:center;" >
            <table>
                <tr>
                    <td>
                        Operador:
                        <asp:DropDownList ID="ddlOperador" runat="server" Width="170px"></asp:DropDownList>                    
                    </td>
                    <td style="width: 20px;"></td>
                    <td>
                        Estado:
                        <asp:DropDownList ID="ddlEstado" runat="server" Width="170px"></asp:DropDownList>
                    </td>
                    <td style="width: 20px;"></td>
                    <td>
                        Tarea:
                        <asp:DropDownList ID="ddlTarea" runat="server" Width="170px"></asp:DropDownList>
                    </td>
                </tr>
            </table>
        </div>
        <br />
        <div class="dvPanel" style="overflow:auto;" >
            <table id="tbTareas"></table>
        </div>
        <br />
        <div id="dvDetalle" class="dvPanel" style="padding:10px; overflow:auto;text-align:right;" >
            <asp:HiddenField ID="hdfinCodCol" runat="server" />
            <table border="0">
                <tr>
                    <td style="width: 120px;">Fecha de creación:</td>
                    <td colspan="4" style="text-align:left;">
                        <asp:Label ID="lblFechaCreacion" runat="server" Text=""></asp:Label>
                    </td>
                    <td style="text-align:center;" id="tdTituloArchivo">
                        <asp:Label ID="lblTituloArchivo" runat="server" Text="Archivos"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td>Fecha de ejecución:</td>
                    <td colspan="4" style="text-align:left;">
                        <asp:Label ID="lblFechaEjecucion" runat="server" Text=""></asp:Label>
                    </td>
                    <td rowspan="8" id="tdArchivo">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <asp:ListBox ID="lstArchivo" runat="server" Width="550px" Height="150px"></asp:ListBox>
                    </td>
                </tr>
                <tr>
                    <td>Fecha de Finalización:</td>
                    <td colspan="4" style="text-align:left;">
                        <asp:Label ID="lblFechaFinalizacion" runat="server" Text=""></asp:Label>
                    </td>
                </tr>
                <tr id="trProcesado">
                    <td>Procesados:</td>
                    <td style="text-align:left;" id="tdProcesados">
                        <asp:Label ID="lblProcesado" runat="server" Text="" Font-Bold="true" Font-Underline="true"></asp:Label>
                    </td>
                    <td style="text-align:left; display:none;" id="tdArchivoProcesados">
                        <asp:Label ID="lblArchivoProcesado" runat="server" Text="" Font-Bold="true" Font-Underline="true"></asp:Label>
                    </td>

                    <td colspan="3"></td>
                </tr>

                <tr id="trNoValidado">
                    <td>No Validado:</td>
                    <td style="text-align:left;"  id="tdNoValidado">
                        <asp:Label ID="LblNoValidado" runat="server" Text="" Font-Bold="true" Font-Underline="true"></asp:Label>
                    </td>
                    <td style="text-align:left; display:none;" id="tdArchivoNoValidado">
                        <asp:Label ID="LblArchivoNoValidado" runat="server" Text="" Font-Bold="true" Font-Underline="true"></asp:Label>
                    </td>
                    <td>Errados:</td>
                    <td style="text-align:left;" id="tdErrado">
                        <asp:Label ID="lblErrado" runat="server" Text="" Font-Bold="true" Font-Underline="true"></asp:Label>
                    </td>
                    <td style="text-align:left; display:none;" id="tdArchivoErrado">
                        <asp:Label ID="lblArchivoErrado" runat="server" Text="" Font-Bold="true" Font-Underline="true"></asp:Label>
                    </td>
                    <td>
                        <table>
                            <tr>
                                <td id="tdErrores" style="display: none;">
                                    <img style="float:left; cursor: pointer;" alt="" src="../../General/Uploads/resources/download.png" id="btnDescargar">
                                </td>
                                <td>
                                    <ttgInfo:ToolTipGenerico ID="ttgInfoSeleccion" runat="server" /> 
                                    <ttgInfo:ToolTipGenerico ID="ttgInfoDescargarImportacionPlantilla" runat="server" /> 
                                    <ttgInfo:ToolTipGenerico ID="ttgInfoDescargar" runat="server" /> 
                                </td>
                            </tr>
                        </table>           
                    </td>
                </tr>

                <tr id="trDuplicado">
                    <td>Duplicados:</td>
                    <td style="text-align:left;" id="tdDuplicado">
                        <asp:Label ID="lblDuplicado" runat="server" Text="" Font-Bold="true" Font-Underline="true"></asp:Label>
                    </td>
                    <td style="text-align:left; display:none;" id="tdArchivoDuplicado">
                        <asp:Label ID="lblArchivoDuplicado" runat="server" Text="" Font-Bold="true" Font-Underline="true"></asp:Label>
                    </td>
                    <td style="width: 120px;">&nbsp;&nbsp;Líneas no Registradas:</td>
                    <td style="text-align:left; width: auto;"  >
                        <asp:Label ID="lblLineasNoRegistradas" runat="server" Text="" Font-Bold="true" Font-Underline="true"></asp:Label>
                    </td>
                     <td colspan="2">
                         <table>
                            <tr>
                                <td id="tderportartxt" style="display:none" >
                                    <img style="float:left; cursor: pointer;" alt="" src="../../General/Uploads/resources/download.png" id="btnDescargartxt">
                                </td> 
                            </tr>
                        </table> 
                     </td>
                </tr>
                <tr id="trExcluidos">
                    <td>Excluidos:</td>
                    <td style="text-align:left;" id="td1">
                        <asp:Label ID="lblExcluidos" runat="server" Text="" Font-Bold="true" Font-Underline="true"></asp:Label>
                    </td>
                    <td></td>
                    <td style="text-align:left;" colspan="2" id="td3"> 
                    </td>
                </tr>
                <tr id="trRestante">
                    <td>Restante:</td>
                    <td style="text-align:left;" id="tdRestante">
                        <asp:Label ID="lblRestante" runat="server" Text="" Font-Bold="true" Font-Underline="true"></asp:Label>
                    </td>
                    <td style="text-align:left; display:none;" id="tdArchivoRestante">
                        <asp:Label ID="lblArchivoRestante" runat="server" Text="" Font-Bold="true" Font-Underline="true"></asp:Label>
                    </td>
                    <td>Total:</td>
                    <td style="text-align:left;" colspan="2" id="tdTotal"> 
                        <asp:Label ID="lblTotal" runat="server" Text="" Font-Bold="true" Font-Underline="true"></asp:Label>
                    </td>
                    <td  colspan="2"  style="text-align:left; display:none;" id="tdArchivoTotal">
                        <asp:Label ID="lblArchivoTotal" runat="server" Text="" Font-Bold="true" Font-Underline="true"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td>Operador(es):</td>
                    <td style="text-align:left; width: 120px;">
                        <asp:Label ID="lblOperador" runat="server" Text=""></asp:Label>
                    </td>
                    <td>Periodo:</td>
                    <td style="text-align:left;" colspan="2">
                        <asp:Label ID="lblPeriodo" runat="server" Text=""></asp:Label>
                    </td>
                </tr>
                <tr style="height: 30px;">
                    <td>Observaciones:</td>
                    <td colspan="5" style="text-align:left;" id="tdObservacion">
                        <asp:Label ID="lblObservacion" runat="server" Text="" Width="200px" ></asp:Label>                        
                    </td>
                                       
                    <td colspan="2" style="text-align:left; display: none;" id="tdArchivoObservacion">
                        <asp:Label ID="lblArchivoObservacion" runat="server" Text=""></asp:Label>
                    </td>
                </tr>
                <tr style="height: 30px;" id="tdDescargarLog">
                    <td>Descargar log:</td>
                    <td colspan="5" style ="text-align:left">                        
                        <img style="float:left; cursor: pointer;" class="btnNormal" alt="" src="../../General/Uploads/resources/download.png" id="imgObservacion">
                </tr> 
                <tr>
                    <td></td>
                    <td colspan="5" align="left">
                        <div id="btnDetalle" class="btnNormal">
                            <asp:Image ID="imgDetalle" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Todo.png" />
                            <a>Ver detalles de proceso</a>
                        </div>
                    </td>
                </tr>
            </table>            
        </div>
        <div id="dvProgramacion" style="display:none;">
            <table>
                <tr>
                    <td>
                        <asp:RadioButtonList ID="rbProgramacion" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Selected="True" Value="0">Ahora</asp:ListItem>
                            <asp:ListItem Value="1">Programado</asp:ListItem>
                        </asp:RadioButtonList>                                
                    </td>
                    <td>
                        <asp:TextBox ID="txtFechaProgramacion" runat="server" CssClass="DATETIME"></asp:TextBox>
                    </td>
                </tr>
            </table>
        </div>
        <div id="dvRegistroLinea" style="display:none;padding:0px; margin:0px;">
            <iframe id="if1" width="530" height="370" frameborder="0" style="padding:0px; margin:0px;" ></iframe>
        </div>
        <div id="dvRegistroServicio" style="display:none;padding:0px; margin:0px; overflow: hidden;">
            <iframe id="if2" width="530" height="380" frameborder="0" style="padding:0px; margin:0px;" ></iframe>
        </div>




        <div id="dvDetalleProceso" style="display:none;">
            <table class="dvPanel" width="430px">
                <tr>
                    <td class="tdTareaOriginal" style="text-align:right;">Tarea Original</td> 
                    <td class="tdTareaOriginal" style="padding-right:20px;">
                        <asp:Label ID="lblTareaOriginal" runat="server" Text="" Font-Bold="true"></asp:Label>
                    </td>
                    <td class="tdProgramacionOriginal" style="text-align:right;">Programación Original</td>
                    <td class="tdProgramacionOriginal">
                        <asp:Label ID="lblProgramacionOriginal" runat="server" Text="" Font-Bold="true"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td class="tdTipoArchivo" style="text-align:right;">Tipo de Archivo</td>
                    <td class="tdTipoArchivo" style="padding-right:20px;">
                        <asp:Label ID="lblTipoArchivo" runat="server" Text="" Font-Bold="true"></asp:Label>
                    </td>
                    <td class="tdNumeroPlantilla" style="text-align:right;">Número de Plantilla</td>
                    <td class="tdNumeroPlantilla">
                        <asp:Label ID="lblNumeroPlantilla" runat="server" Text="" Font-Bold="true"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td class="tdExtensionArchivo" style="text-align:right;">Extensión de Archivo</td>
                    <td class="tdExtensionArchivo" style="padding-right:20px;">
                        <asp:Label ID="lblExtensionArchivo" runat="server" Text="" Font-Bold="true"></asp:Label>
                    </td>
                    <td class="tdTipoTelefonia" style="text-align:right;">Tipo de Telefonía</td>
                    <td class="tdTipoTelefonia">
                        <asp:Label ID="lblTipoTelefonia" runat="server" Text="" Font-Bold="true"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td class="tdUnirBitsEnvRec" style="text-align:right;">Unir Val. Bits Env./Rec.</td>
                    <td class="tdUnirBitsEnvRec">
                        <asp:Label ID="lblUnirBitsEnvRec" runat="server" Text="" Font-Bold="true"></asp:Label>
                    </td>
<%--                    <td class="tdActualizaCosto" style="text-align:right;">Actualiza Costo</td>
                    <td class="tdActualizaCosto">
                        <asp:Label ID="lblActualizaCosto" runat="server" Text="" Font-Bold="true"></asp:Label>
                    </td>
                </tr>  
                <tr>
                    <td class="tdServDefecto" style="text-align:right;">Servicio por Defecto</td>
                    <td class="tdServDefecto" style="padding-right:20px;">
                        <asp:Label ID="lblServDefecto" runat="server" Text="" Font-Bold="true"></asp:Label>
                    </td>--%>
                    <td class="tdEmpleadoDefecto" style="text-align:right;">Empleado por Defecto</td>
                    <td class="tdEmpleadoDefecto">
                        <asp:Label ID="lblEmpleadoDefecto" runat="server" Text="" Font-Bold="true"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td class="tdTipoCambio" style="text-align:right;">Tipo de Cambio</td>
                    <td class="tdTipoCambio" style="padding-right:20px;">
                        <asp:Label ID="lblTipoCambio" runat="server" Text="" Font-Bold="true"></asp:Label>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</body>
</html>
