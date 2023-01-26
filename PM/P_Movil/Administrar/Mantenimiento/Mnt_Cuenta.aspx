<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Mnt_Cuenta" CodeBehind="Mnt_Cuenta.aspx.vb" %>

<%@ Register Src="../../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register Src="../../../Common/Controles/ControlBusquedaEnlace.ascx" TagName="ControlBusquedaEnlace" TagPrefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/calender/fullcalendar.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/date.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/ajaxupload.js" type="text/javascript"></script>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Mnt_Cuenta.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfCuenta" runat="server" />
        <asp:HiddenField ID="hdfCuentaAdjuntos" runat="server" />
        <asp:HiddenField ID="hdfSepMiles" runat="server" />
        <asp:HiddenField ID="hdfFormatoFechaCorta" runat="server" />
        <asp:HiddenField ID="hdfTotalLineas" runat="server" />
        <asp:HiddenField ID="hdfAsignacionCredito" runat="server" />
        <asp:HiddenField ID="hdfAsignacionCreditoEdicion" runat="server" />
        <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />

        <asp:HiddenField ID="hdfAreaFacturacion" runat="server" />
        <asp:HiddenField ID="hdfIdAreaSel" runat="server" />

        <div id="divMsgConfirmacion" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            ¿Desea cerrar esta subCuenta?
        </div>
        <div id="divMsgConfirmacionAsignacionCredito" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            Esta cuenta tiene linea(s) asociada(s) ¿Desea continuar con el cambio?
        </div>

        <div id="divMsgConfirmacionDeleteFile" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            ¿Desea eliminar este archivo?
        </div>
        
        <div id="divMsgConfirmarCambioOrganizacion" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            Se actualizarán todas las áreas de los empleados asociados a la cuenta seleccionada. ¿Desea continuar?
        </div>


        <div class="dvPanel" style="overflow: auto;">
            <table width="100%">
                <tr>
                    <td>
                        <table width="100%" id="tbCamposDinamicos" runat="server">
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblCodigo" runat="server" Text="Código"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtCodigo" runat="server" Width="150px" MaxLength="20"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblNombre" runat="server" Text="Nombre"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtNombre" runat="server" Width="300px" MaxLength="100"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblOperador" runat="server" Text="Operador"></asp:Label>
                                </td>
                                <td>
                                    <table>
                                        <tr>
                                            <td>
                                                <asp:DropDownList ID="ddlOperador" runat="server" Width="249px"></asp:DropDownList>
                                            </td>
                                            <td>
                                                <div id="dvInfoOpe" style="display: none;">
                                                    <ttgInfo:ToolTipGenerico ID="ttgInfoEditOpe" runat="server" Mensaje="No puede editar el campo Operador, la cuenta seleccionada tiene líneas asociadas." />
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr style="display: none;">
                                <td>
                                    <asp:Label ID="lblTipoLinea" runat="server" Text="Tipo"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlLineaTipo" runat="server" Width="249px"></asp:DropDownList>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <asp:Label ID="lblFechaInicioContrato" runat="server" Text="Fecha Inicio Contrato"></asp:Label>

                                </td>
                                <td>
                                    <asp:TextBox ID="txtFechaInicioContrato" runat="server" Width="80px" AutoPostBack="false" CssClass="txtFecha" MaxLength="100"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblFechaFinContrato" runat="server" Text="Fecha Fin Contrato"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtFechaFinContrato" runat="server" CssClass="txtFecha" AutoPostBack="false" Width="80px" MaxLength="100"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdEtiqueta" valign="top">
                                    <asp:Label ID="lblAcuerdos" runat="server" Text="Acuerdos"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtAcuerdos" runat="server" Width="300px" TextMode="MultiLine" Height="60px" MaxLength="500" onPaste="Paste_Event()"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdEtiqueta" valign="top">
                                    <asp:Label ID="lblAdjuntos" runat="server" Text="Adjuntos"></asp:Label>
                                </td>
                                <td>
                                    <iframe id="ifAdjuntoCuenta" frameborder="0" style="width: 440px; height: 175px; padding: 0px; margin: 0px; display: none;"></iframe>
                                </td>
                            </tr>
                            <tr id="trPeridoFacturacion">
                                <td>
                                    <asp:Label ID="lblPeriodoFacturacion" runat="server" Text="Tipo de facturación"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlPeriodoFacturacion" runat="server" Width="249px"></asp:DropDownList>
                                </td>
                            </tr>
                            <tr id="trPeriodo" runat="server">
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblFechaFacturacion" runat="server" Text="Día facturación"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlDiaInicial" runat="server" Width="50px" CssClass="k-edit"></asp:DropDownList>
                                    <%---
                                        <asp:Label ID="lblDiaFinal" runat="server" Text=""></asp:Label>--%>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblAsignacionCredito" runat="server" Text="Asignación de crédito"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlAsignacionCredito" runat="server" Width="249px"></asp:DropDownList>
                                </td>
                            </tr>
                            <tr class="dvAsignacion">
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblMontoCuenta" runat="server" Text="Monto de cuenta"></asp:Label>
                                </td>
                                <td>
                                    <asp:Label ID="lblMonto" runat="server" CssClass="lblNormal" Text="" Height="15px" Width="100px"></asp:Label>
                                </td>
                            </tr>

                            <tr>
                                <td class="tdEtiqueta">Organización
                                </td>
                                <td>
                                    <table border="0" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <uc1:ControlBusquedaEnlace ID="cbeOrganizacion" runat="server" />
                                            </td>
                                            <td>&nbsp;
                                                <div id="btnAgregarOrga" class="btnNormal" runat="server" title="Seleccionar Organización">
                                                    <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/buscar.png" />
                                                </div>
                                            </td>
                                            <td>
                                                <div id="btnQuitarOrganizacion" title="Quitar" style="height: 32px; width: 34px;"
                                                    class="btnNormal ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false">
                                                    <img alt="" src="../../../Common/Images/Mantenimiento/delete_16x16.gif">
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="LblTipoServicio" runat="server" Text="Tipo Servicio"></asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlTipoServicio" runat="server" Width="249px"></asp:DropDownList>
                                </td>
                            </tr>


                            <tr id="trEstado" runat="server">
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblActivo" runat="server" Text="Activo"></asp:Label>
                                </td>
                                <td>
                                    <asp:CheckBox ID="chkEstado" runat="server" />
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td align="right" valign="bottom" class="dvAsignacion">
                        <div id="btnAgregarSubCuenta" class="btnNormal">
                            <asp:Image ID="imgAgregarSubCuenta" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                            <a>Agregar SubCuenta</a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <br />
        <div class="dvAsignacion">
            <cc1:TabJQ ID="tbAsignacion" runat="server" CssClass="tabs" Style="margin: 0px; padding: 0px;"></cc1:TabJQ>
        </div>
        <br />
        <div style="text-align: left;">
            <div id="btnGuardar" class="btnNormal">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
            <div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cerrar</a>
            </div>
        </div>
        <div id="divMsgConfirmQuitarSubCuenta" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            La SubCuenta seleccionada no puede ser eliminada porque su Servicio(s) estan asociadas a determinadas líneas.
        </div>
        <div id="dvArea" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifArea" width="730" height="470" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
        </div>
    </form>
</body>
</html>
