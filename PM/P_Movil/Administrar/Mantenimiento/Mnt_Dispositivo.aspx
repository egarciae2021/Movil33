<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Mnt_Dispositivo" Codebehind="Mnt_Dispositivo.aspx.vb" %>

<%@ Register src="../../../Common/Controles/ToolTipGenerico.ascx" tagname="ToolTipGenerico" tagprefix="ttgInfo" %>
<%@ Register Src="../../../Common/Controles/ToolTipGenerico_red.ascx" TagPrefix="ttgInfo" TagName="ToolTipGenerico_red" %>
<%@ Register Src="~/Common/Controles/ToolTipGenerico_red.ascx" TagPrefix="uc1" TagName="ToolTipGenerico_red" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
    <%--***Inicio*** Agregado por RRAMOS --%>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqueryui/jquery.ui.autocomplete.js" type="text/javascript"></script>    
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.accordion.js"></script><%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/jqGrid/ui.jqgrid.css" /><%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script><%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script><%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <%--***Fin***  Agregado por RRAMOS--%>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
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
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/calender/fullcalendar.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>    
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/date.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.cookie.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/ajaxupload.js" type="text/javascript"></script>
    <style type="text/css">
        .style1
        {
            width: 338px;
        }
    </style>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Mnt_Dispositivo.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfParametros" runat="server" Value=""/>
        <asp:HiddenField ID="hdfValores" runat="server" />
        <asp:HiddenField ID="hdfDispositivo" runat="server" />
        <asp:HiddenField ID="hdfCodCliente" runat="server" />
        <asp:HiddenField ID="hdfIMEI" runat="server" />
        <asp:HiddenField ID="hdfEstadoDispositivo" runat="server" />
        <asp:HiddenField ID="hdfEmplResponsable" runat="server" />
        <asp:HiddenField ID="hdfLineaTipoTemp" runat="server" />
        <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
        <asp:HiddenField ID="hdfOcultarCamposLigero" runat="server" />
        <asp:HiddenField ID="hdfFechaAsignacionLinea" runat="server" />

        <asp:HiddenField ID="hdfTipoServicioModelo" runat="server" />
        <asp:HiddenField ID="hdfTipoServicioCuenta" runat="server" />
        <asp:HiddenField ID="hdfPermitirGuardarTipSer" runat="server" />

        <asp:HiddenField runat="server" ID="hdfTipoLinea"/>
        <div id="dviMsgConfirmacionCambioTipoLinea" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            <label id="lblMsgForTipoCuenta" style="display:none;">
                Se procederá a liberar la <b>Línea</b> del <b>Dispositivo</b> por que no es compatible con el <b>"Tipo de Linea"</b> seleccionado.
            </label>
            <br /><br />
            ¿Desea continuar?
        </div>
        <div id="dvCargando" class="dvCargando"></div>

        <div id="dvCampo" class="dvPanel" style="overflow:auto;">
            <table id="tbCamposDinamicos" runat="server">
                <tr>
                    <td class="tdEtiqueta" style="width:120px;">
                        IMEI
                    </td>
                    <td class="style1">
                        <asp:TextBox ID="txtCodigo" runat="server" Width="150px" MaxLength="15" onchange="validarEspaciosEnBlancoAlInicio();" style="text-align: right"></asp:TextBox>
                        <%--onchange="validarEspaciosEnBlancoAlInicio();"--%>
                    </td>
                </tr>
                <tr>
                    <td class="tdEtiqueta">
                        Modelo
                    </td>
                    <td class="style1">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="margin-left: -15px; float: left;">
                                  <div id="dvToolTipRed_m" runat="server" style="display: none;">
                                      <%--<uc1:ToolTipGenerico_red runat="server" id="ttgInfoModeloRed" Mensaje="El tipo de servicio asociado a la cuenta de la línea no es compatible con el tipo de servicio asociado al modelo" />--%>
                                      <uc1:ToolTipGenerico_red runat="server" ID="ttgInfoModeloRed" />
                                  </div>
                                </td>
                                <td>
                                    <asp:TextBox ID="txt_Dispositivos" runat="server" Width="300px" style="text-transform: uppercase;"></asp:TextBox>
                                    <asp:HiddenField ID="hdfCodDispositivos" runat="server"/>
                                    <asp:DropDownList ID="ddlModelo" runat="server" style="display: none;"></asp:DropDownList>
                                </td>
                                <td>
                                    <div id="btnAgregarModeloDispositivo" class="btnNormal" runat="server" title="Agregar Modelo Dispositivo">
                                        <asp:Image ID="imgAgregarModeloDispositivo" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trTipoAdquision">                
                    <td>
                        <asp:Label ID="lblTipoAdquisicion" runat="server" Text="Tipo de Adquisición"></asp:Label>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlTipoAdquisicion" runat="server" Width="249px"></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trSoportaLinea">                
                    <td>
                        Soporta Línea&nbsp;</td>
                    <td class="">
                        <asp:DropDownList ID="ddlSopLin" runat="server" Width="70px">
                            <asp:ListItem Value="1">Si</asp:ListItem>
                            <asp:ListItem Value="0">No</asp:ListItem>
                        </asp:DropDownList>
                    </td>
                </tr>
                <tr id="trEmpleado" runat="server">                
                    <td>
                        <asp:Label ID="lblEmpleado" runat="server" Text="Empleado"></asp:Label>
                    </td>
                    <td class="">
                        <asp:TextBox ID="txtEmpleado" runat="server" Width="300px"></asp:TextBox>
                        <asp:HiddenField ID="hdfCodEmpleado" runat="server" />
                        <asp:HiddenField ID="hdfEstadoEmpleado" runat="server" />
                        <img id="imgBorrarEmpleado" alt="" src="../../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar empleado" class="imgBtn">
                    </td>
                </tr>
                <tr id="trEmplResponsable" style="display: none;" runat="server">                
                    <td>
                        <asp:Label ID="LblResponsable" runat="server" Text="Empleado Responsable : "></asp:Label> 
                    </td>
                    <td>
                      <table id="tblResponsable">
                      </table>
                    </td>
                </tr>
                <tr id="trTituloEmplResponsable" style="display: none;" runat="server">
                    <td colspan="2">
                        <asp:Label ID="LblResponsableTitulo" runat="server" Font-Bold="True"></asp:Label> 
                    </td>
                </tr>
                <tr id="trTipoLinea" style="display: none;">
                    <td>
                        <asp:Label ID="lblTipoLinea" runat="server" Text="Tipo"></asp:Label>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlLineaTipo" runat="server"  Width="249px"></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trCampana" style="display:none;">
                    <td>
                        Campaña
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlCampana" runat="server" Width="249px"></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trLinea" runat="server">
                    <td class="tdEtiqueta" style="width:120px;">
                        Línea
                    </td>
                    <td class="style1"> 
                       <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="margin-left: -15px; float: left;">
                                  <div id="dvToolTipRed_l" runat="server" style="display: none;">
                                      <%--<uc1:ToolTipGenerico_red runat="server" id="ttgInfoLineaRed" Mensaje="El tipo de servicio asociado al modelo no es compatible con el tipo de servicio asociado a la cuenta de la línea"/>--%>
                                      <uc1:ToolTipGenerico_red runat="server" ID="ttgInfoLineaRed" />
                                  </div>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlLinea" runat="server" Visible="False">
                                    </asp:DropDownList>
                                    <asp:HiddenField ID="hdfLineaActual" runat="server" />
                                    <asp:HiddenField ID="hdfIdTipoLineaActual" runat="server" />                        
                                    <asp:HiddenField ID="hdfNumLinea" runat="server" />
                                    <asp:Label ID="lblPlanLinea" runat="server" ></asp:Label>
                                    <table>
                                        <tr>
                                            <td>
                                                <asp:TextBox ID="txtLinea" runat="server" Width="180px"></asp:TextBox>
                                            </td>
                                            <td>
                                                <div id="dvInfoTipoLinea" runat="server" style="display:none;">
                                                    <ttgInfo:ToolTipGenerico ID="InfoTipoLinea" runat="server" Mensaje=""/>
                                                </div>
                                            </td>
                                            <td>
                                                <div id="dvInfoLinea" runat="server" style="display:none;">
                                                    <ttgInfo:ToolTipGenerico ID="infoLinea" runat="server" Mensaje=""/>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr id="trFechaAsignacionLinea" runat="server" style="display: none;">
                    <td class="tdEtiqueta">
                        <asp:Label ID="LblAsignacionDispositivo" runat="server" Text="Asignación Línea"></asp:Label>                        
                    </td>
                    <td>
                        <asp:TextBox ID="txtFechaAsignacionLinea" runat="server" ></asp:TextBox>
                        <div id="btnEditarFechaAsignacionLinea" class="btnNormal" style="display:none;">
                            <asp:Label ID="txtEditarFechaAsignacionLinea" runat="server" Text="Editar"></asp:Label>
                        </div>
                    </td>
                </tr>

                <tr id="trSerie" runat="server">
                    <td class="tdEtiqueta">
                        <asp:Label ID="Label1" runat="server" Text="Serie"></asp:Label>                        
                    </td>
                    <td>
                        <asp:TextBox ID="TxtSerie" runat="server" ></asp:TextBox>
                    </td>
                </tr>
                <tr id="trMonto" runat="server">
                    <td class="tdEtiqueta">
                        <asp:Label ID="LblMonto" runat="server" Text="Monto"></asp:Label>                        
                    </td>
                    <td>
                        <asp:TextBox ID="TxtMontoDispositivo" runat="server" ></asp:TextBox>
                    </td>
                </tr>
                <tr id="trMensaje">                
                    <td></td>
                    <td class="">
                        <asp:Label ID="lblMensaje" runat="server" Text="" ForeColor="Red" Font-Italic="true"></asp:Label>
                    </td>
                </tr>
                <tr id="trEstado" runat="server">
                    <td class="tdEtiqueta">
                        Activo
                    </td>
                    <td class="" >
                        <asp:CheckBox ID="chkEstado" runat="server" />
                    </td>
                </tr>
            </table>
        </div>

        <div style="margin-top:2px;">
            <div id="btnGuardar" class="btnNormal">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
            <div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cerrar</a>
            </div>
            <div id="btnLiberarDispositivo" class="btnNormal" style="display: none;">
                <asp:Image ID="imgLiberarDispositivo" runat="server" ImageUrl="~/Common/Images/Mantenimiento/mobile.png" Width="16px" Height="16px" />
                <a>Liberar Dispositivo</a>
            </div>
        </div>

        <div id="dvAgregarModeloDispositivo" style="display: none;" align="right">
            <iframe id="ifAgregarModeloDispositivo" frameborder="0" style="padding: 0px; margin: 0px; height: auto; width: 100%; overflow: hidden;"></iframe>
            <%--<b>(Doble clic sobre un registro para seleccionar una Oficina)</b>--%>
        </div>
    </form>
</body>
</html>