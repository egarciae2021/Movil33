<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Imp_VisorTareaImportacion.aspx.vb" Inherits="Imp_VisorTareaImportacion" %>
<%@ Register TagPrefix="ttgInfo" TagName="ToolTipGenerico" Src="~/Common/Controles/ToolTipGenerico.ascx" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link  href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.timer.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Imp_VisorTareaImportacion.js" type="text/javascript"></script>

</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField runat="server" ID="hdfRutaArcError"/>
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
                    <td style="display: none">
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
            <table border="0" width="80%">
                <tr>
                    <td style="width: 120px;">Fecha de creación:</td>
                    <td colspan="4" style="text-align:left; width: 150px;">
                        <asp:Label ID="lblFechaCreacion" runat="server" Text=""></asp:Label>
                    </td>
                    <td style="text-align:center; width: 200px;" id="tdTituloArchivo">
                        <asp:Label ID="lblTituloArchivo" runat="server" Text="Archivos"></asp:Label>
                    </td>
                    <td style="width: 120px;"></td>
                </tr>
                <tr>
                    <td>Fecha de ejecución:</td>
                    <td colspan="4" style="text-align:left;">
                        <asp:Label ID="lblFechaEjecucion" runat="server" Text=""></asp:Label>
                    </td>
                    <td rowspan="7" id="tdArchivo">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <asp:ListBox ID="lstArchivo" runat="server" Width="350px" Height="150px"></asp:ListBox>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>Fecha de Finalización:</td>
                    <td colspan="4" style="text-align:left;">
                        <asp:Label ID="lblFechaFinalizacion" runat="server" Text=""></asp:Label>
                    </td>
                    <td rowspan="2" style="width: 190px;">
                        <div id="btnDetalle" class="btnNormal" style="width: 130px;">
                            <asp:Image ID="imgDetalle" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Todo.png" />
                            <a>Ver detalles</a>
                        </div>
                    </td>
                </tr>
                <tr id="trProcesado">
                    <td>Procesados:</td>
                    <td style="text-align:left; width: 30px;" id="tdProcesados">
                        <asp:Label ID="lblProcesado" runat="server" Text="" Font-Bold="true" Font-Underline="true"></asp:Label>
                    </td>
                    <td style="text-align:left; display:none; width: 60px;" id="tdArchivoProcesados">
                        <asp:Label ID="lblArchivoProcesado" runat="server" Text="" Font-Bold="true" Font-Underline="true"></asp:Label>
                    </td>

                    <td colspan="3"></td>
                    <%--<td></td>--%>
                </tr>

                <tr id="trNoValidado" style="height: 30px;">
                    <td>Errados:</td>
                    <td style="text-align:left;" id="tdErrado">
                        <asp:Label ID="lblErrado" runat="server" Text="" Font-Bold="true" Font-Underline="true"></asp:Label>
                    </td>
                    <td style="text-align:left; display: none; width: 30px;" id="tdArchivoErrado">
                        <asp:Label ID="lblArchivoErrado" runat="server" Text="" Font-Bold="true" Font-Underline="true"></asp:Label>
                    </td>
                    <td colspan="3" style="width: 30px;">
                        <table>
                            <tr>
                                <td id="tdErrores" style="display: none;">
                                    <img style="float:left; cursor: pointer; width: 16px;" class="btnNormal" alt="" 
                                        src="../../../P_Movil/../General/Uploads/resources/download.png" 
                                        id="btnDescargar">
                                </td>
                                <td>
                                    <ttgInfo:ToolTipGenerico ID="ttgInfoSeleccion" runat="server" /> 
                                    <ttgInfo:ToolTipGenerico ID="ttgInfoDescargar" runat="server" /> 
                                </td>
                            </tr>
                        </table>           
                    </td>
                    <td></td>
                </tr>

                <tr id="trDuplicado">
                    <td>Duplicados:</td>
                    <td style="text-align:left;" id="tdDuplicado">
                        <asp:Label ID="lblDuplicado" runat="server" Text="" Font-Bold="true" Font-Underline="true"></asp:Label>
                    </td>
                    <td style="text-align:left; display:none;" id="tdArchivoDuplicado">
                        <asp:Label ID="lblArchivoDuplicado" runat="server" Text="" Font-Bold="true" Font-Underline="true"></asp:Label>
                    </td>
                    <td colspan="3"></td>
                    <td rowspan="2">
                        <div id="btnDetalleLog" class="btnNormal" style="width: 130px;">
                            <asp:Image ID="imgDetalleLog" runat="server" ImageUrl="../../../P_Movil/../General/Uploads/resources/download.png" />
                            <a>Ver log</a>
                        </div> 
                    </td>
                </tr>
            <%--    <tr id="trExcluidos">
                    <td>Excluidos:</td>
                    <td style="text-align:left;" id="td1">
                        <asp:Label ID="lblExcluidos" runat="server" Text="" Font-Bold="true" Font-Underline="true"></asp:Label>
                    </td>
                    <td></td>
                    <td style="text-align:left;" colspan="2" id="td3"> 
                    </td>
                </tr>--%>
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
                    <%--<td></td>--%>
                </tr>
                <tr>
                    <td>Operador:</td>
                    <td colspan="4" style="text-align:left;">
                        <asp:Label ID="lblOperador" runat="server" Text=""></asp:Label>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>Observaciones:</td>
                    <td colspan="5" style="text-align:left; width: 150px;" id="tdObservacion">
                        <asp:Label ID="lblObservacion" runat="server" Text=""></asp:Label>
                    </td>
                    <td colspan="2" style="text-align:left; display: none;" id="tdArchivoObservacion">
                        <asp:Label ID="lblArchivoObservacion" runat="server" Text=""></asp:Label>
                    </td>
                    
                </tr>

            </table>
        </div>
        
                <div id="dvDetalleTarea" style="display:none;">
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
                    <td class="tdNumeroPlantilla" style="text-align:right;">Nombre de Plantilla</td>
                    <td class="tdNumeroPlantilla">
                        <asp:Label ID="lblNumeroPlantilla" runat="server" Text="" Font-Bold="true"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td class="tdExtensionArchivo" style="text-align:right;">Extensión de Archivo</td>
                    <td class="tdExtensionArchivo" style="padding-right:20px;">
                        <asp:Label ID="lblExtensionArchivo" runat="server" Text="" Font-Bold="true"></asp:Label>
                    </td>
                   
                </tr>
     
            </table>
        </div>
        <br />
    <div id="dvDetalleProceso" style="display: none; width:700px;">
        <table id="tbLog">
        </table>
        <div id="btnArchivoNoProce" class="imgBtn" style="text-align:right">
            <table align="right">
                <tr>
                    <td style="text-align:right;">
                        <img alt="" src="../../../Common/Images/Mantenimiento/BajarArchivo.png" width="16px" height="16px"/>    
                    </td>
                    <td style="vertical-align:bottom; text-decoration:underline; cursor: pointer;">Descargar Log..</td>
                </tr>
            </table>
        </div>
    </div>
    <iframe id="my_iframe" style="display:none;"></iframe>
    
    </form>
</body>
</html>
