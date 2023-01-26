<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Cam_PedidosVisor" Codebehind="Cam_PedidosVisor.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register src="../../Common/Controles/BusquedaPrincipal.ascx" tagname="BusquedaPrincipal" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../Common/Styles/Principal.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/ui.dropdownchecklist-1.4-min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Cam_PedidosVisor.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField runat="server" ID="hdfIdCampana" />
        <asp:HiddenField runat="server" ID="hdfSituacion" />
        <div id="divConfirmacion" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            La generación de este reporte puede tardar varios minutos. ¿Desea continuar?
        </div>
<%--        <div id="divConfirmacionCancelar" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            ¿Está seguro que desa cancelar los pedidos seleccionados?
        </div>--%>
        <div id="dvContAcordeon" align="left" >
            <cc1:AccordionJQ ID="AccordionJQ1" runat="server" EnableViewState="true" CssClass="accordion" style="overflow:none;" TabIndex="0">
                <cc1:ContenedorAccodion Texto="Filtros" ID="accFiltros">
<%--                    <div class="dvPanel" style="margin-bottom:5px;">--%>
                        <table >
                            <tr>
                                <td class="tdEtiqueta" style="width:60px;">Código pedido:</td>
                                <td colspan="4">
                                    <asp:TextBox ID="txtCodPedido" runat="server" Width="225px" MaxLength="25"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdEtiqueta" style="width:60px;">Operador:</td>
                                <td>
                                    <asp:DropDownList ID="ddlOperador" runat="server" Width="235px"></asp:DropDownList>
                                </td>
                                <td style="width:70px;"></td>
                                <td class="tdEtiqueta" style="width:80px;">Campaña:</td>
                                <td>
                                    <asp:DropDownList ID="ddlCampana" runat="server" Width="235px"></asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdEtiqueta" style="width:60px;">Situación:</td>
                                <td>
                                    <asp:DropDownList ID="ddlSituacion" runat="server" Width="235px"></asp:DropDownList>
                                </td>
                                <td></td>
                                <td class="tdEtiqueta" style="width:80px;">Estado:</td>
                                <td>
                                    <asp:DropDownList ID="ddlEstado" runat="server"></asp:DropDownList>
                                </td>                            
                            </tr>
                            <tr>
                                <td class="tdEtiqueta" style="width:60px;">Área:</td>
                                <td>
                                    <asp:TextBox ID="txtArea" runat="server" Width="225px"></asp:TextBox>
                                    <asp:HiddenField ID="hdfCodAreaBusqueda" runat="server"/>
                                    <asp:HiddenField ID="hdfCodIntArea" runat="server" />                        
                                    <asp:HiddenField ID="HiddenField1" runat="server" />
                                </td>
                                <td></td>
                                <td class="tdEtiqueta" style="width:80px;">Centro Costo:</td>
                                <td>
                                    <asp:TextBox ID="txtCentroCosto" runat="server" Width="225px"></asp:TextBox>
                                    <asp:HiddenField ID="hdfCCOBusqueda" runat="server"/>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdEtiqueta" style="width:80px;">Oficina:</td>
                                <td>
                                    <div id="dvOficinaBusqueda">
                                        <uc1:BusquedaPrincipal ID="bpOficina" runat="server" Ancho="200"/>
                                    </div>
                                </td>
                                <td></td>
                                <td class="tdEtiqueta" style="width:80px;">Cuenta:</td>
                                <td>
                                    <asp:DropDownList ID="ddlCuenta" runat="server" Width="235px"></asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdEtiqueta" style="width:80px;">Empleado</td>
                                <td>
                                    <asp:TextBox ID="txtEmpleado" runat="server" Width="225px"></asp:TextBox>
                                    <asp:HiddenField ID="hdfCodEmpleado" runat="server" />
                                </td>
                                <td></td>
                                <td class="tdEtiqueta" style="width:80px;">Periodo:</td>
                                <td>
                                    <asp:TextBox ID="txtFechaInicio" runat="server" Width="70px" CssClass="DATE" ReadOnly="true"></asp:TextBox>
                                    <img id="imgBorrarFechaInicio" alt="" src="../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <asp:TextBox ID="txtFechaFin" runat="server" Width="70px" CssClass="DATE" ReadOnly="true"></asp:TextBox>
                                    <img id="imgBorrarFechaFin" alt="" src="../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>&nbsp;&nbsp;&nbsp;
                                </td>
                            </tr>
                        </table>
                        <div id="btnBuscar" class="btnNormal">
                            <asp:Image ID="Image1" runat="server" Style="width: 16px" ImageUrl="~/Common/Images/lup.png" title="Buscar"/>
                            <a>Filtrar</a>
                        </div> 
<%--                    </div>    --%>
                </cc1:ContenedorAccodion>
                <cc1:ContenedorAccodion Texto="Listado" ID="accListado">
                    <div id="dvAcciones" style="text-align:left;">
                        <div id="btnCancelar" class="btnNormal" style="width:140px;">
                            <asp:Image ID="imgCancelar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" />
                            <a>Cancelar Pedido</a>
                        </div>
                        <div id="btnExcel" class="btnNormal" style="width:100px;">
                            <asp:Image ID="imgExcel" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png" />
                            <a>Exportar</a>
                        </div>
                        <div id="btnImprimir" class="btnNormal" style="width:140px;">
                            <asp:Image ID="imgImprimir" runat="server" ImageUrl="~/Common/Images/Mantenimiento/print.ico" Width="16px" Height="16px"/>
                            <a>Vista Preliminar</a>
                        </div>
                        <div id="btnDeshacer" class="btnNormal" style="width:160px;">
                            <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Regresar.png" />
                            <a>Deshacer Despacho</a>
                        </div>
                    </div>
                    <div style="margin-top:5px; margin-bottom:5px;">
                        <table id="tbPedidos"></table>
                        <div id="pager"></div>
                    </div>
                </cc1:ContenedorAccodion>          
            </cc1:AccordionJQ>
        </div>
        <div id="dvExcel" style="display:none;">
            <iframe id="ifExcel" frameborder="0" style="padding: 0px; margin: 0px; height: 130px; width:350px;"></iframe>
        </div>
        <div id="dvVisPre" style="display:none;">
            <iframe id="ifVisPre" frameborder="0" style="padding: 0px; margin: 0px; height: 510px; width:900px;"></iframe>
        </div>
        <div id="dvSeg" style="display:none;">
            <iframe id="ifSeg" frameborder="0" style="padding: 0px; margin: 0px; height: 460px; width:705px;"></iframe>
        </div>
        <div id="dvSegDet" style="display:none;">
            <iframe id="ifSegDet" frameborder="0" style="padding: 0px; margin: 0px; height: 240px; width:670px;"></iframe>
        </div>
        <%--<div id="dvOfiCam" style="display:none;">
            <iframe id="ifOfiCam" frameborder="0" style="padding: 0px; margin: 0px; height: 110px; width:320px;"></iframe>
        </div>--%>
        <div id="dvOficinaCambio">
            <uc1:BusquedaPrincipal ID="bpOficinaCambio" runat="server" Ancho="200"/>
        </div>
        <div id="dvMsgConfirmaciónDeshacerDespachoDetalle" runat="server" style="display:none;">
            ¿Está seguro de deshacer este despacho?
            <br /><br />
            Si la situación es <b>"Nuevo"</b> se liberará la línea y el dispositivo del empleado. Si la situación es <b>"Renovación"</b> se volverá a asignar a la línea su dispositivo anterior, el dispositivo despachado quedará en estado <b>"Disponible (Reservado)"</b>
        </div>
        <div id="dvMsgConfirmaciónDeshacerDespacho" runat="server" style="display:none;">
            ¿Está seguro de deshacer el despacho?
            <br /><br />
            <%--Se liberará la línea y el dispositivo del empleado.--%>
            Al deshacer el despacho de los pedidos seleccionados, se liberarán los dispositivos y/o líneas de cada detalle despachado.
        </div>
        <div id="dvDeshacerDespacho" style="display:none;">
            <table>
                <tr>
                    <td>Comentarios</td>
                </tr>
                <tr>
                    <td><asp:TextBox id="txtComentarios" runat="server" Width="460px" TextMode="MultiLine"></asp:TextBox></td>
                </tr>
            </table>
        </div>
        <div id="dvMsgConfirmacionCancelarDespacho" runat="server" style="display:none;">
            Está selecccionando pedidos que ya han sido despachados total o parcialmente, ¿Desea deshacer el despacho de estos pedidos?
            <br /><br />
            Al deshacer el despacho de pedidos despachados se liberarán los dispositivos y/o líneas despachados en el detalle.
        </div>
        <div id="dvCancelarPedido" style="display:none;">
            <table>
                <tr>
                    <td>Comentarios</td>
                </tr>
                <tr>
                    <td><asp:TextBox id="txtComentariosCanPed" runat="server" Width="460px" TextMode="MultiLine"></asp:TextBox></td>
                </tr>
            </table>
        </div>
    </form>
</body>
</html>