<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Mnt_Linea" CodeBehind="Mnt_Linea.aspx.vb" %>

<%@ Register Src="../../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>
<%@ Register Src="../../../Common/Controles/ToolTipGenerico_red.ascx" TagName="ToolTipGenerico_red" TagPrefix="ttgInfo" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register Src="../../../Common/Controles/BusquedaPrincipal.ascx" TagName="BusquedaPrincipal" TagPrefix="uc1" %>
<%@ Register Src="~/Common/Controles/ToolTipGenerico_red.ascx" TagPrefix="uc1" TagName="ToolTipGenerico_red" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />

    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>

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
    <script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.accordion.js"></script>
    <%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/jqGrid/ui.jqgrid.css" />
    <%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <%--(Se cruza con el Base del BusquedaPrincipal)--%>
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

    <link href="../../../Common/Scripts/select2/select2.min.css" rel="stylesheet" />
    <script src="../../../Common/Scripts/select2/select2.min.js" type="text/javascript"></script>


    <style type="text/css">
        body {
            overflow-y: hidden;
            overflow-x: hidden;
        }

        .no-close .ui-dialog-titlebar-close {
            display: none !important;
        }

        .k-combobox {
            padding: 0px !important;
            border: 0px solid rgb(221, 221, 221) !important;
        }

        .k-state-hover {
            border-color: transparent !important;
        }

        .k-dropdown-wrap {
            height: 22px !important;
        }

        .k-select {
            height: 18px !important;
            width: 24px !important;
        }
    </style>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Mnt_Linea.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfParametros" runat="server" Value="" />
        <asp:HiddenField ID="hdfValores" runat="server" />
        <asp:HiddenField ID="hdfLinea" runat="server" />
        <asp:HiddenField ID="hdfPerFac" runat="server" />
        <asp:HiddenField ID="hdfAsigCred" runat="server" />
        <asp:HiddenField ID="hdfServicio" runat="server" />
        <asp:HiddenField ID="hdfEmplResponsable" runat="server" />
        <asp:HiddenField ID="hdfCodCliente" runat="server" />
        <asp:HiddenField ID="hdfLineaTipo" runat="server" />
        <asp:HiddenField ID="hdfCodCuenta" runat="server" />
        <asp:HiddenField ID="hdfCodSuc" runat="server" />
        <asp:HiddenField ID="hdfCodPlan" runat="server" />
        <asp:HiddenField ID="hdfOperador" runat="server" />
        <asp:HiddenField ID="hdfAccion" runat="server" />
        <asp:HiddenField ID="hdfLineaTipoTemp" runat="server" />
        <asp:HiddenField ID="hdfLineaPlanTemp" runat="server" />
        <asp:HiddenField ID="hdfLineaCuentaTemp" runat="server" />
        <asp:HiddenField ID="hdfLineaOperadorTemp" runat="server" />
        <asp:HiddenField ID="hdfGrupoOrigTemp" runat="server" />
        <asp:HiddenField ID="hdfMonTotCta" runat="server" />
        <asp:HiddenField ID="hdfCanTotCta" runat="server" />
        <asp:HiddenField runat="server" ID="hdfCodSituacion" />
        <asp:HiddenField ID="hdfEstadoLinea" runat="server" />
        <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
        <asp:HiddenField ID="hdfAddEmpl" runat="server" />
        <asp:HiddenField ID="hdfAddDispositivo" runat="server" />
        <asp:HiddenField ID="hdfFechaAsignacionEmpleado" runat="server" />
        <asp:HiddenField ID="hdfFechaAsignacionDispositivo" runat="server" />

        <asp:HiddenField ID="hdfTipoServicioDispositivo" runat="server" />
        <asp:HiddenField ID="hdfTipoServicioCuenta" runat="server" />
        <asp:HiddenField ID="hdfTipoServicioPlan" runat="server" />
        <asp:HiddenField ID="hdfPermitirGuardarTipSer" runat="server" />

        <asp:HiddenField ID="hdfAreaFacturacion" runat="server" />
        <asp:HiddenField ID="hdfIdAreaSel" runat="server" /> 
        <asp:HiddenField ID="hdfEsPlanRoaming" runat="server" />


        <asp:HiddenField ID="hdfValidacionTipoServicio" runat="server" />

        <div id="dvCargando" class="dvCargando"></div>

        <%--EDGAR GARCIA 07112021--%>
         <%--<div id="SubdvCampo_Empl" runat="server" title="Crear usuario" style="width:100%; height:100%;display:none">
              <iframe frameborder="0" id="Empl_data" width="450px" height="500px" scrolling="yes" style="width:100%;height:100%"></iframe>               
          </div>--%>
            <%--<div id="Blockparent" class="ui-widget-overlay" style="position:absolute;width:100%; height:300%;z-index:2;display:none;overflow:auto">
            </div> --%>


        <div id="dvCampo" class="dvPanel" style="overflow: auto;">
            <table id="tbCamposDinamicos" runat="server" border="0">
                <tr>
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblNumero" runat="server" Text="Número"></asp:Label>
                    </td>
                    <td class="">
                        <asp:TextBox ID="txtNumero" runat="server" Width="150px" MaxLength="35"></asp:TextBox>
                    </td>
                </tr>
                <tr style="display: none;">
                    <td>
                        <asp:Label ID="lblTipoLinea" runat="server" Text="Tipo Línea"></asp:Label>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlLineaTipo" runat="server" Width="308px"></asp:DropDownList>
                    </td>
                </tr>

                <tr>
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblEmpleado" runat="server" Text="Empleado"></asp:Label>
                    </td>
                    <td class="">
                        <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <asp:TextBox ID="txtEmpleado" runat="server" Width="300px"></asp:TextBox>
                                    <asp:HiddenField ID="hdfCodEmpleado" runat="server" />
                                    <asp:HiddenField ID="hdfEstadoEmpleado" runat="server" />
                                    &nbsp;
                                </td>
                                <td>
                                    <div id="btnAgregar" class="btnNormal" runat="server" title="Agregar Empleado">
                                        <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr id="trFechaAsignacionEmpleado" runat="server" style="display: none;">
                    <td class="tdEtiqueta">
                        <asp:Label ID="LblAsignacionEmpleado" runat="server" Text=""></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtFechaAsignacionEmpleado" runat="server"></asp:TextBox>
                        <div id="btnEditarFechaAsignacionEmpl" class="btnNormal" style="display: none;">
                            <asp:Label ID="txtEditarFechaAsignacionEmpl" runat="server" Text="Editar"></asp:Label>
                        </div>
                    </td>
                </tr>

                <tr id="trTiltuloCentroCosto" style="height: 25px;" >
                    <td>
                        <asp:Label ID="lblCentroCostoTitulo" runat="server" Text="Centro Costo"></asp:Label>
                    </td>
                    <td>
                        <asp:Label ID="lblCentroCosto" runat="server" Text="" Font-Bold="true"></asp:Label>
                    </td>
                </tr>
                <tr id="trGrupoOrigen" style="display: none;height: 25px;" >
                    <td>
                        <asp:Label ID="lblGrupoOrigenTitulo" runat="server" Text="Grupo Empleado"></asp:Label>
                    </td>
                    <td>
                        <asp:Label ID="lblGrupoOrigen" runat="server" Font-Bold="true"></asp:Label>
                        <asp:HiddenField ID="hdfCodGrupoOrigen" runat="server" />
                    </td>
                </tr>
                <tr id="filaSucursal">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblSucursal" runat="server" Text="Sucursal"></asp:Label>
                    </td>
                    <td class="">
                        <asp:TextBox ID="txtSucursal" runat="server" Width="300px"></asp:TextBox>
                        <asp:HiddenField ID="hdfCodSucursal" runat="server" />
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


                <%--EDGAR GARCIA 22/07/2022 --%>
                <tr  id="trSIMVisible" runat="server">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblSimCard" runat="server" Text="SimCard"></asp:Label>
                    </td>
                    <td class="">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="margin-left: -15px; float: left;">
                                    <div id="Div2" runat="server" style="display: none;">
                                        <uc1:ToolTipGenerico_red runat="server" ID="ttgInfoSimCard" />
                                    </div>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlSimCard" runat="server" Width="308px"></asp:DropDownList>
                                    <asp:Label ID="lblMsgSimCard" runat="server"></asp:Label>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>


                <tr>
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblOperador" runat="server" Text="Operador"></asp:Label>
                    </td>
                    <td class="">
                        <asp:DropDownList ID="ddlOperador" runat="server" Width="308px">
                            <asp:ListItem Value="-1" Text="<Seleccionar>"></asp:ListItem>
                        </asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblCuenta" runat="server" Text="Cuenta"></asp:Label>
                    </td>
                    <td class="">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="margin-left: -15px; float: left;">
                                    <div id="dvToolTipRed_c" runat="server" style="display: none;">
                                        <uc1:ToolTipGenerico_red runat="server" ID="ttgInfoCuentaRed" />
                                    </div>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlCuenta" runat="server" Width="308px"></asp:DropDownList>
                                    <asp:Label ID="lblMsgCuenta" runat="server"></asp:Label>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td class="tdEtiqueta">
                        <asp:Label ID="Label1" runat="server" Text="Sucursal"></asp:Label>
                    </td>
                    <td class="">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="margin-left: -15px; float: left;">
                                    <div id="Div1" runat="server" style="display: none;">
                                        <uc1:ToolTipGenerico_red runat="server" ID="ToolTipGenerico_red1" />
                                    </div>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlSucursal" runat="server" Width="308px"></asp:DropDownList>
                                    <asp:Label ID="lblMsgSucursal" runat="server"></asp:Label>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trPlan" runat="server" style="display: none;">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblPlan" runat="server" Text="Plan"></asp:Label>
                    </td>
                    <td class="">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="margin-left: -15px; float: left;">
                                    <div id="dvToolTipRed_p" runat="server" style="display: none;">
                                        <uc1:ToolTipGenerico_red runat="server" ID="ttgInfoPlanRed" />
                                    </div>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlPlan" runat="server" Width="308px"></asp:DropDownList>
                                </td>
                                <td style="padding-left: 5px;">
                                    <img id="imgDetallePlan" alt="" src="../../../Common/Images/Mantenimiento/VerDetalle.png" class="imgBtn" />
                                </td>
                                <td>
                                    <asp:Label ID="lblMsgPlan" runat="server"></asp:Label>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trCampana" class="Family" style="display: none;" runat="server">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblCampana" runat="server" Text="Campaña"></asp:Label>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlCampana" runat="server" Width="308px"></asp:DropDownList>
                        <asp:Label ID="LblFechaCampana" runat="server" Font-Bold="True" Font-Size="X-Small"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblFechaAlta" runat="server" Text="Fecha Alta"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtFechaAlta" runat="server"></asp:TextBox>
                        <div id="btnEditarFechaAlta" class="btnNormal" style="display: none;">
                            <asp:Label ID="txtEditarFechaAlta" runat="server" Text="Editar"></asp:Label>
                        </div>
                    </td>
                </tr>
                <tr id="trFechaInicio" runat="server">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblInicioContrato" runat="server" Text="Inicio contrato"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtFechaInicioContrato" runat="server"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trMesesContrato" runat="server">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblMeses" runat="server" Text="Meses contrato"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtMesesContrato" runat="server" MaxLength="2" Width="30" onkeypress="if(event.keyCode<48 || event.keyCode>57)event.returnValue=false;"></asp:TextBox>
                        <asp:RegularExpressionValidator ID="RegularExpressionValidator1"
                            ControlToValidate="txtMesesContrato" runat="server"
                            ErrorMessage="Solo se permiten números"
                            ValidationExpression="\d+">
                        </asp:RegularExpressionValidator>
                        <%--<asp:DropDownList ID="ddlMesesContrato" runat="server" Width="100">
                            <asp:ListItem Value="-1" Text="<Seleccionar>"></asp:ListItem>
                            <asp:ListItem Value="6" Text="6"></asp:ListItem>
                            <asp:ListItem Value="12" Text="12"></asp:ListItem>
                            <asp:ListItem Value="18" Text="18"></asp:ListItem>
                            <asp:ListItem Value="24" Text="24"></asp:ListItem>
                        </asp:DropDownList>--%>
                    </td>
                </tr>
                <tr>
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblDispositivo" runat="server" Text="Dispositivo"></asp:Label>
                    </td>
                    <td class="">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="margin-left: -15px; float: left;">
                                    <div id="dvToolTipRed_d" runat="server" style="display: none;">
                                        <uc1:ToolTipGenerico_red runat="server" ID="ttgInfoDispositivoRed" />
                                    </div>
                                </td>
                                <td>
                                    <asp:TextBox ID="txt_Dispositivos" runat="server" Width="300px" Style="text-transform: uppercase;"></asp:TextBox>
                                    <asp:HiddenField ID="hdfCodDispositivos" runat="server" />
                                    <asp:DropDownList ID="ddlDispositivo" runat="server" Width="200px" Style="display: none;"></asp:DropDownList>
                                    &nbsp;
                               </td> 
                                <td>
                                    <div id="btnAgregarDispositivo" class="btnNormal" runat="server" title="Agregar Dispositivo">
                                        <asp:Image ID="imgAgregarDispositivo" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                    </div>
                                </td>
                                <td style="padding-left: 5px;">
                                    <img id="imgDetalleDispositivo" alt="" src="../../../Common/Images/Mantenimiento/VerDetalle.png" class="imgBtn" />
                                </td>
                                <td style="padding-left: 5px;">
                                    <div id="dvToolTip" runat="server">
                                        <ttgInfo:ToolTipGenerico ID="ttgInfoDispositivo" runat="server" />
                                    </div>
                                </td>
                                <td>
                                    <asp:Label ID="lblMsgDispositivos" runat="server"></asp:Label>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr id="trFechaAsignacionDispositivo" runat="server" style="display: none;">
                    <td class="tdEtiqueta">
                        <asp:Label ID="LblAsignacionDispositivo" runat="server" Text="Asignación Dispositivo"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtFechaAsignacionDispositivo" runat="server"></asp:TextBox>
                        <div id="btnEditarFechaAsignacionDisp" class="btnNormal" style="display: none;">
                            <asp:Label ID="txtEditarFechaAsignacionDisp" runat="server" Text="Editar"></asp:Label>
                        </div>
                    </td>
                </tr>

                <tr id="trPeriodo" runat="server" style="display: none;">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblPeriodoFacturacion" runat="server" Text="Periodo de facturación"></asp:Label>
                    </td>
                    <td class="">
                        <asp:DropDownList ID="ddlDiaInicial" runat="server"></asp:DropDownList>
                        -
                        <asp:Label ID="lblDiaFinal" runat="server" Text=""></asp:Label>
                    </td>
                </tr>
                <tr id="trMonto" runat="server" style="display: none;">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblMonto" runat="server" Text="Monto" Width="150px"></asp:Label>
                    </td>
                    <td class="">
                        <asp:TextBox ID="txtMonto" runat="server" Text="0.00" Enabled="False"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trSituacion" runat="server" style="display: none;">
                    <td>
                        <asp:Label ID="lblEstadoLinea" runat="server" Text="Situación"></asp:Label>
                    </td>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <asp:Label ID="lblSituacion" runat="server" Font-Bold="true" Width="130"></asp:Label>
                                    <asp:HiddenField ID="hdfSituacion" runat="server" />
                                </td>
                                <td>
                                    <div id="dvDarBaja" runat="server">
                                        <asp:CheckBox ID="chkDarBaja" runat="server" />
                                        &nbsp;&nbsp;
                                        <asp:Label ID="lblBajaCon" runat="server"></asp:Label>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trEstado" runat="server">
                    <td class="tdEtiqueta">Activo
                    </td>
                    <td class="">
                        <asp:CheckBox ID="chkEstado" runat="server" />
                    </td>
                </tr>
            </table>
            <div id="dvAsignacion" runat="server" style="display: none;">
                <table>
                    <tr>
                        <td>
                            <table id="tblServicio">
                            </table>
                        </td>
                        <td>
                            <table>
                                <tr id="trInformacionServicios" runat="server">
                                    <td align="left">
                                        <ttgInfo:ToolTipGenerico ID="ttgInfoServicios" runat="server" Mensaje="Los servicios de esta líneas no estan siendo considerados en el total de la bolsa" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id="btnAgregarServicio" class="btnNormal" style="width: 110px;">
                                            <asp:Image ID="imgAgregarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                            <a>Agregar                                       
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id="btnModificarServicio" class="btnNormal" style="width: 110px;">
                                            <asp:Image ID="imgModificarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                            <a>Modificar</a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id="btnEliminarServicio" class="btnNormal" style="width: 110px;">
                                            <asp:Image ID="imgEliminarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                            <a>Quitar</a>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="dvAsignacion1" style="display: none;">
                <iframe id="ifServicios" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
            </div>
            <div style="height: 10px"></div>
            <div id="dvContAcordeon">
                <cc1:AccordionJQ ID="AccordionJQ1" runat="server" CssClass="accordion">
                    <cc1:ContenedorAccodion ID="AcordionServicios" Texto="Servicios Adicionales">
                        <div id="dvMensajeOperadorXSeleccionar" runat="server" style="display: none;">
                            <asp:Label ID="lblMensaje2" runat="server" Text="Debe seleccionar un Operador para poder visualizar los Servicios Adicionales"></asp:Label>
                        </div>
                        <div id="dvMensajeOperadorSeleccionado" runat="server" style="display: none;">
                            <asp:Label ID="lblMensaje3" runat="server" Text="El Operador seleccionado no cuenta con Servicios Adicionales"></asp:Label>
                        </div>

                        <table id="tbAgregarServicios" runat="server" border="0">
                            <tr>
                                <td>
                                    <table id="tbServiciosAdicionales">
                                    </table>
                                    <div id="tbServiciosAdicionalesPager"></div>
                                </td>
                            </tr>
                        </table>
                    </cc1:ContenedorAccodion>
                </cc1:AccordionJQ>
            </div>
            <br />
            <div id="divDetalleServicio" style="display: none;">
                <span class="ui-icon ui-icon-alert" style="float: left;"></span>
                <span id="lblDetalleServicio"></span>
            </div>
        </div>
        <div id="divServicios" style="display: none;">
            <table>


                <tr class="trNuevo">
                    <td>Sub Cuentas
                        <%--Tipo servicio:--%>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlTipoServicio" runat="server" Width="200px"></asp:DropDownList>
                        <asp:Label ID="LblTipoServicio" runat="server" Text="" Style="display: none;"></asp:Label>
                    </td>
                </tr>
                <tr class="trNuevo">
                    <td>Servicio:
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlServicio" runat="server" Width="200px"></asp:DropDownList>
                        <asp:Label ID="LblCanTotalMinutosXBolsa" runat="server" Text="" Font-Bold="true"></asp:Label>
                    </td>
                </tr>
                <tr id="CantAsig" style="display: none;">
                    <td></td>
                    <td>
                        <asp:Label ID="LblTextoServicio" runat="server" Text="" Font-Bold="true"></asp:Label>
                        <asp:Label ID="LblCantAsignada" runat="server" Text="" Font-Bold="true"></asp:Label>
                        <asp:Label ID="LblCantidad" runat="server" Text="" Font-Bold="true" Style="display: none;"></asp:Label>
                    </td>
                </tr>
                <tr class="trEditar" style="display: none;">
                    <td>Servicio:
                    </td>
                    <td>
                        <asp:Label ID="lblServicio" runat="server" Text=""></asp:Label>
                    </td>
                </tr>
                <tr id="trIlimitado">
                    <td>Servicio ilimitado:
                    </td>
                    <td>
                        <asp:CheckBox ID="chkServicioIlimitado" runat="server" Enabled="false" />
                    </td>
                </tr>
                <tr id="trCantidad">
                    <td>
                        <asp:Label ID="LblTextoTipSer" runat="server" Text="Cantidad/Minutos:"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtCantidadServicio" runat="server" MaxLength="7" z-index="-10000000"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trTipoAsignacion">
                    <td>
                        <asp:Label ID="LblTipoAsignacion" runat="server" Text="" Font-Bold="true"></asp:Label></td>
                    <td>
                        <asp:CheckBox ID="chkTipoAsignacion" runat="server" />
                    </td>
                </tr>
                <tr id="trMontoServicio">
                    <td>
                        <asp:Label ID="LblMontoAsignacdo" runat="server" Text="Monto Asignado:"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtMontoAsignado" runat="server" MaxLength="7" z-index="-10000000"></asp:TextBox>
                    </td>
                </tr>


            </table>
            <br />
            <div style="text-align: right;">
                <div id="btnGuardarServicio" class="btnNormal">
                    <asp:Image ID="imgGuardarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                    <a>Agregar</a>
                </div>
                <div id="btnCerrarServicio" class="btnNormal">
                    <asp:Image ID="imgCerrarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    <a>Cerrar</a>
                </div>
            </div>
        </div>
        <div id="divMsgConfirmacionCambioDispositivo" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <%--Se procederá a liberar el Dispositivo de la Línea por que no está dentro del grupo de Empleado o no está asignado al Empleado seleccionado. <br /><br />--%>
            Se prodecerá a liberar el <b>Dispositivo</b> de la Línea por que no es compatible con el&nbsp;<b><label id="lblFiltroCambiado"></label></b>&nbsp;seleccionado.
            <br />
            <br />
            ¿Desea continuar?
        </div>
        <div id="dviMsgConfirmacionCambioTipoLinea" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <label id="lblMsgForCuentaDispositivo" style="display: none;">
                Al cambiar el <b>"Tipo de Línea"</b> deberá volver a seleccionar una <b>"Cuenta"</b> y un <b>"Dispositivo"</b>.
            </label>
            <label id="lblMsgForDispositivo" style="display: none;">
                Al cambiar el <b>"Tipo de Línea"</b> deberá volver a seleccionar un <b>"Dispositivo"</b>.
            </label>
            <label id="lblMsgForCuenta" style="display: none;">
                Al cambiar el <b>"Tipo de Línea"</b> deberá volver a seleccionar una <b>"Cuenta"</b>.
            </label>
            <%--Se prodecerá a liberar el Dispositivo de la Línea por que no es compatible con el "Tipo de Línea" seleccionado.--%>
            <br />
            <br />
            ¿Desea continuar?
        </div>
        <div id="divMsgModeloNoExisteGrupoOrigenEmpleadoSeleccionado" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            El Modelo seleccionado no pertenece al Grupo Empleado Asignado, Si desea puede agregar el Modelo al Grupo Empleado 
            <b><span id="spanGRUORI"></span></b>.
        </div>

        <div id="dvDetalleDispositivo" style="display: none; width: 475px; height: 350px; overflow-y: hidden;">
            <iframe id="ifDetalleDispositivo" frameborder="0" width="475px" height="330px"></iframe>
        </div>
        <div id="dvDetallePlan" style="display: none; width: 430px; height: 350px;">
            <iframe id="ifDetallePlan" frameborder="0" width="420px" height="330px"></iframe>
        </div>

<%--        EDGAR GARCIA 04112022 agrege la clase btnGuardarSuspendido   txtGuardar--%>
        <div style="margin-top: 2px;"  id="btnsConfig">
            <table width="100%" id="btnsConfig2">
                <tr>
                    <td align="left">
                        <div id="btnGuardar" class="btnNormal">
                            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                            <a id="txtGuardar">Guardar</a>
                        </div>
                        <div id="btnCerrar" class="btnNormal">
                            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                            <a>Cerrar</a>
                        </div>
                        <div id="btnLiberarLinea" class="btnNormal" style="display: none;">
                            <asp:Image ID="imgLiberarLinea" runat="server" ImageUrl="~/Common/Images/Mantenimiento/mobile.png" Width="16px" Height="16px" />
                            <a>Liberar Línea</a>
                        </div>
                    </td>
                    <td align="right">
                        <asp:Label ID="lblMensajeLinea" runat="server" ForeColor="#4297d7" Font-Size="Medium" Font-Bold="true">
                        </asp:Label>
                        <asp:HiddenField ID="hdfMensajeLinea" runat="server" />
                    </td>
                </tr>
            </table>
        </div>
        <div id="dvAgregarEmpleado" style="display: none; overflow: hidden;" align="right">
            <iframe id="ifAgregarEmpleado" frameborder="0" style="padding: 0px; margin: 0px; height: 405px; width: 750px; overflow: hidden;"></iframe>
            <%--<b>(Doble clic sobre un registro para seleccionar una Oficina)</b>--%>
        </div>
        <div id="dvAgregarDispositivo" style="display: none; overflow: hidden;" align="right">
            <iframe id="ifAgregarDispositivo" frameborder="0" style="padding: 0px; margin: 0px; height: 100%; width: 750px; overflow: hidden;"></iframe>
            <%--<b>(Doble clic sobre un registro para seleccionar una Oficina)</b>--%>
        </div>

        <div id="MsgConfirmacionActivaLineaStaff" runat="server" style="display: none;">
            ¿Desea activar al dispositivo asociado a la línea?
        </div>

        <div id="MsgConfirmacionBajaLineaStaff" runat="server" style="display: none;">
            ¿Desea dar de baja al dispositivo asociado a la línea?
            <br />
            <br />
            Si la línea tiene un empleado asociado este seguirá asociado a la línea y al dispositivo si se ha dado de baja también.
        </div>
        <div id="MsgConfirmacionBajaLineaFamilia" runat="server" style="display: none;">
            El dispositivo asociado a la línea será dado de baja.
            <br />
            <br />
            Si la línea tiene un empleado asociado, este seguirá asociado a la línea y al dispositivo.
        </div>
        <div id="MsgConfirmacionCambioOperador" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <label id="lblMsgOperador" style="display: none;">
                Al cambiar el <b>"Operador"</b> se procederá a liberar los servicios asociados a la <b>"Línea"</b> y deberá volver a seleccionar una <b>"Cuenta"</b>.
            </label>
            <%--Se prodecerá a liberar el Dispositivo de la Línea por que no es compatible con el "Tipo de Línea" seleccionado.--%>
            <br />
            <br />
            ¿Desea continuar?
        </div>

        <div id="dvLiberarLinea" style="display: none; padding: 0px; margin: 0px;">
            <table>
                <tr style="height: 30px;">
                    <td style="width: 130px;" colspan="2">&nbsp;&nbsp;&nbsp;&nbsp;Si la línea tiene un empleado o dispositivo asociado, se puede liberar: </td>
                </tr>
                <tr>
                  <td style="width: 40px;"></td>
                  <td style="width: 440px;">
                      <asp:CheckBox ID="ChkLiberarEmpleado" runat="server" />Empleado
                  </td>
                </tr>
                <tr>
                  <td style="width: 40px;"></td>
                  <td style="width: 440px;">
                      <asp:CheckBox ID="ChkLiberarDispositivo" runat="server" />Dispositvo
                  </td>
                </tr>
            </table>

            <br />

            <div style="text-align: right;">
                <div id="btnAceptarPopup" class="btnNormal" runat="server" title="Liberar Linea" click="DescargarPlantilla">
                    <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                    <a>Aceptar</a>
                </div>
                <div id="btnCerrarPopup" class="btnNormal" runat="server" title="Cerrar" click="ClosePlantilla">
                    <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    <a>Cerrar</a>
                </div>
            </div>
        </div>



    </form>
</body>
</html>