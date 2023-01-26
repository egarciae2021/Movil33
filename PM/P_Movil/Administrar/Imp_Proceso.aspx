<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Imp_Proceso"
    EnableEventValidation="false" CodeBehind="Imp_Proceso.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register Src="../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico"
    TagPrefix="ttgInfo" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.tabs.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.draggable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.resizable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.autocomplete.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.MultiFile.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <%--kendo --%>
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/cultures/kendo.culture.es-ES.min.js" type="text/javascript"></script>

</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfLicencia" runat="server" />
        <asp:HiddenField ID="hdfLicenciaModulo" runat="server" />

        <asp:HiddenField ID="hdfbtSobreescribe" runat="server" Value="0" />
        <asp:HiddenField ID="hdfbtPregunto" runat="server" Value="0" />
        <asp:HiddenField runat="server" ID="hdfInCodCta" />
        <asp:HiddenField runat="server" ID="hdfbtTipoPla" Value="0" />
        <asp:HiddenField runat="server" ID="hdfCodPla" Value="-1" />
        <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
        <asp:HiddenField ID="hdfIdPerfil" runat="server" Value="-1" />
        <asp:HiddenField ID="hdfConcilia" runat="server" Value="0" />
        
        <div id="dvCargando" class="dvCargando">
        </div>
        <%--        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>--%>
        <%--        <asp:UpdateProgress ID="udpProceso" runat="server" AssociatedUpdatePanelID="udpPlantilla">
            <ProgressTemplate>
                <div class=" dvCargando"></div>
            </ProgressTemplate>
        </asp:UpdateProgress>--%>

        <div id="BarraNavegacionJQ1" class="ui-accordion ui-widget ui-helper-reset" style="margin-left: 0px;">
            <div id="dvPerfil" style="display: none; text-align: right;">
                <table style="width: 100%;">
                    <tr>
                        <td>
                            <asp:Label ID="lblMensajePerfil" runat="server" Font-Size="11px" ForeColor="#0002BD" Font-Bold="true" Font-Italic="true"></asp:Label>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="BarraNavegacionJQ1_Panel1" runat="server" style="display: none;">
                <h3 class="ui-helper-reset ui-accordion-header ui-state-active ui-corner-top" style="width: 100%; margin-top: 7px; display: block;">
                    <a href="#BarraNavegacionJQ1_Panel1_O" style="cursor: default;">Tareas</a> <span
                        class='ui-icon ui-icon-circle-triangle-n' style="margin-left: 95%; display: none;"></span>
                    <input type="hidden" value="1" />
                </h3>
                <div id="BarraNavegacionJQ1_Panel1_O" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active"
                    runat="server" style="width: 100%; margin: 0px; padding: 0px; padding-top: 15px; padding-bottom: 10px; margin-top: -1px;">
                    <h4 id="BarraNavegacionJQ1_Panel1_O_Item1" runat="server" url="" title="" click=""
                        class="PanelBarraNavegacionItem">
                        <div style="font-weight: normal; padding-left: 10px; padding-right: 10px;">
                            <asp:RadioButtonList ID="rlstTarea" runat="server" RepeatDirection="Horizontal">
                                <asp:ListItem Selected="True" Value="3">Validar e importar</asp:ListItem>
                                <%--<asp:ListItem Value="2">Solo importar</asp:ListItem>--%>
                                <asp:ListItem Value="1">Solo validar</asp:ListItem>
                            </asp:RadioButtonList>
                        </div>
                    </h4>
                </div>
            </div>

            <div id="BarraNavegacionJQ1_Panel2" runat="server" style="display: none;">
                <h3 class="ui-accordion-header ui-helper-reset ui-state-active ui-corner-top" style="width: 100%; margin-top: 7px; display: block;">
                    <a href="#BarraNavegacionJQ1_Panel2_O" style="cursor: default;">Programación de importación</a>
                    <span class='ui-icon ui-icon-circle-triangle-n' style="margin-left: 95%; display: none;"></span>
                    <input type="hidden" value="1" />
                </h3>
                <div id="BarraNavegacionJQ1_Panel2_O" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active"
                    runat="server" style="width: 100%; margin: 0px; padding: 0px; padding-top: 15px; padding-bottom: 15px; margin-top: -1px;">
                    <h4 id="BarraNavegacionJQ1_Panel2_O_Item1" runat="server" url="" title="" click=""
                        class="PanelBarraNavegacionItem">
                        <div style="font-weight: normal; padding-left: 10px; padding-right: 10px;">
                            <table>
                                <tr>
                                    <td>
                                        <asp:RadioButtonList ID="rbProgramacion" runat="server" RepeatDirection="Horizontal">
                                            <asp:ListItem Selected="True" Value="0">Ahora</asp:ListItem>
                                            <asp:ListItem Value="1">Programado</asp:ListItem>
                                        </asp:RadioButtonList>
                                    </td>
                                    <td>
                                        <%--<asp:TextBox ID="txtFechaProgramacion" runat="server" CssClass="DATETIME"></asp:TextBox>--%>
                                        <asp:TextBox ID="txtFechaProgramacion" runat="server" CssClass="DATETIME" Width="150px"
                                            MaxLength="16"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </h4>
                </div>
            </div>
            <div id="BarraNavegacionJQ1_Panel3" runat="server" style="">
                <h3 class="ui-accordion-header ui-helper-reset ui-state-active ui-corner-top" style="width: 100%; margin-top: 7px; display: block;">
                    <a href="#BarraNavegacionJQ1_Panel3_O" style="cursor: default;">Proceso</a> <span
                        class='ui-icon ui-icon-circle-triangle-n' style="margin-left: 95%; display: none;"></span>
                    <input type="hidden" value="1" />
                </h3>
                <div id="BarraNavegacionJQ1_Panel3_O" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active"
                    runat="server" style="width: 100%; margin: 0px; padding: 0px; padding-top: 5px; padding-bottom: 5px; margin-top: -1px;">
                    <h4 id="BarraNavegacionJQ1_Panel3_O_Item1" runat="server" url="" title="" click=""
                        class="PanelBarraNavegacionItem">
                        <div style="font-weight: normal; padding-left: 10px; padding-right: 10px;">
                            <table runat="server" border="0">
                                <tr>
                                    <td>Operador
                                    </td>
                                    <td colspan="3">
                                        <asp:DropDownList ID="ddlOperador" runat="server" Width="200px">
                                        </asp:DropDownList>
                                        <%--<asp:DropDownList ID="ddlOperador" runat="server" AutoPostBack="True" Width="255px">    --ECONDEÑA 06/01/2016
                                    </asp:DropDownList>--%>
                                    </td>
                                </tr>
                                <tr style="display: none;">
                                    <td>Tipo de archivo
                                    </td>
                                    <td colspan="3">
                                        <asp:DropDownList ID="ddlExtensionArchivo" runat="server" Width="200px">
                                        </asp:DropDownList>
                                    </td>
                                </tr>
                                <tr style="display: none;">
                                    <td>Tipo Plantilla
                                    </td>
                                    <td>
                                        <asp:DropDownList ID="ddlTipoPlantilla" runat="server" Width="200px">
                                        </asp:DropDownList>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Plantilla
                                    </td>
                                    <td style="width: 100px;">
                                        <table>
                                            <tr>
                                                <td>
                                                    <asp:DropDownList ID="ddlPlantilla" EnableViewState="true" runat="server" Width="200px"></asp:DropDownList></td>
                                                <td id="tdInfoPlantilla" style="display: none;">
                                                    <ttgInfo:ToolTipGenerico ID="ttgInfoPlantilla" runat="server" />
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td style="text-align: right;">Extensión</td>
                                    <td>
                                        <table>
                                            <tr>
                                                <td>
                                                    <asp:TextBox ID="txtExtension" runat="server" Width="40px" MaxLength="5"></asp:TextBox>
                                                </td>
                                                <td>
                                                    <ttgInfo:ToolTipGenerico ID="ttgInfoExtension" runat="server" />
                                                </td>
                                            </tr>
                                        </table>
                                    </td>

                                </tr>
                                <tr id="tbCtaXXX" style="display: none">
                                    <td>Cuenta
                                    </td>
                                    <td style="width: 100px;">
                                        <table>
                                            <tr>
                                                <td>
                                                    <asp:TextBox ID="txtCuenta" runat="server" Width="150px"></asp:TextBox>
                                                </td>
                                                <td>
                                                    <ttgInfo:ToolTipGenerico ID="ttgInfoCuenta" runat="server" />
                                                </td>
                                            </tr>
                                        </table>

                                    </td>

                                </tr>
                                <tr id="trFilaTipoTelefonia" style="display: none;">
                                    <td>Tipo de Telefonía
                                    </td>
                                    <td colspan="3">
                                        <asp:DropDownList ID="ddlTipoTelefonia" runat="server" Width="200px">
                                        </asp:DropDownList>
                                    </td>
                                </tr>
                                <tr id="trFilaTipoLinea" style="display: none;">
                                    <td>Tipo de Línea
                                    </td>
                                    <td>
                                        <asp:CheckBoxList ID="chklstLineaTipo" runat="server" RepeatDirection="Horizontal">
                                        </asp:CheckBoxList>
                                    </td>
                                    <td colspan="2">
                                        <div id="btnGuardarPerfil" class="btnNormal">
                                            <asp:Image ID="imgGuardarPerfil" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                                            <a>Guardar Perfil</a>
                                        </div>
                                        <div id="btnAbrirPerfil" class="btnNormal">
                                            <asp:Image ID="imgAbrirPerfil" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                                            <a>Abrir Perfil</a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="#" onclick="VerHistorialPeriodo()" title="Lista de Periodos" style="text-decoration: none;">Periodo</a>
                                    </td>
                                    <td style="width: 100px;">
                                        <table>
                                            <tr>
                                                <td>
                                                    <asp:TextBox ID="txtPeriodo" runat="server" CssClass="MESANHO" Width="90px" MaxLength="7"></asp:TextBox>
                                                </td>
                                                <td>
                                                    <ttgInfo:ToolTipGenerico ID="ttgPeriodo" runat="server" />
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td style="width: 90px;">
                                        <%--                                        <asp:UpdatePanel ID="udpTCTitulo" runat="server">
                                            <ContentTemplate>--%>
                                        <div runat="server" id="dvTC" style="display: none;">
                                            Tipo de Cambio
                                        </div>
                                        <%--                                            </ContentTemplate>
                                            <Triggers>
                                                <asp:AsyncPostBackTrigger ControlID="ddlPlantilla" EventName="SelectedIndexChanged" />
                                            </Triggers>
                                        </asp:UpdatePanel>--%>
                                    </td>
                                    <td>
                                        <%--                                        <asp:UpdatePanel ID="udpTCtxt" runat="server">  
                                            <ContentTemplate>--%>
                                        <asp:TextBox ID="txtTipoCambio" runat="server" Width="40px" Style="display: none;" MaxLength="9"></asp:TextBox>
                                        <%--                                            </ContentTemplate>
                                            <Triggers>
                                                <asp:AsyncPostBackTrigger ControlID="ddlPlantilla" EventName="SelectedIndexChanged" />
                                            </Triggers>
                                        </asp:UpdatePanel>--%>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4">
                                        <%--                                        <asp:UpdatePanel ID="udpUnirBits" runat="server">
                                            <ContentTemplate>--%>
                                        <asp:CheckBox ID="chkUnirValoresBits" runat="server" Text="Unir los valores de bits enviados y recibidos como un solo consumo"
                                            Checked="True" />
                                        <asp:RadioButtonList ID="rbUnirValoresBits" runat="server" RepeatDirection="Horizontal"
                                            CssClass="NoVisible">
                                            <asp:ListItem Selected="True" Value="0">Bits enviados</asp:ListItem>
                                            <asp:ListItem Value="1">Bits recibidos</asp:ListItem>
                                        </asp:RadioButtonList>
                                        <%--                                            </ContentTemplate>
                                            <Triggers>
                                                <asp:AsyncPostBackTrigger ControlID="ddlPlantilla" EventName="SelectedIndexChanged" />
                                            </Triggers>
                                        </asp:UpdatePanel>--%>
                                    </td>
                                </tr>
                                <%--                                <tr>
                                    <td>
                                        <asp:CheckBox ID="chkServicioDefecto" runat="server" Text="Servicio por defecto" Checked="false"/>
                                    </td>
                                    <td colspan="3">
                                        <asp:DropDownList ID="ddlServicioDefecto" runat="server"></asp:DropDownList>                   
                                    </td>
                                </tr>--%>
                                <tr>
                                    <td style="width: 400px;">
                                        <asp:CheckBox ID="chkEmpleadoDefecto" runat="server" Text="Empleado por Defecto(Solo afectará a Líneas no Registradas)" Checked="false" />
                                    </td>
                                    <td colspan="3">
                                        <asp:TextBox ID="txtEmpleado" runat="server" Width="252px"></asp:TextBox>
                                        <asp:HiddenField ID="hdfCodEmpleado" runat="server" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <%--(Solo Afectará a las Líneas no Registradas)--%>
                                    </td>
                                    <td colspan="3"></td>
                                </tr>
                                <%--                                <tr>
                                    <td>
                                        <asp:CheckBox ID="chkActualizaCosto" runat="server" Text="Actualiza Costo Segun Planes" Checked="false"/>
                                    </td>
                                    <td colspan="3">
                                        
                                    </td>
                                </tr>--%>

                                   <tr>
                                    <td>Archivo
                                    </td>
                                    <td id="trFileUpload" colspan="3">
                                        <asp:HiddenField ID="hdfPassword" runat="server" />
                                        <asp:HiddenField ID="hdfCuentasArchivos" runat="server" />
                                        <%--<asp:FileUpload ID="fulArchivo" runat="server" multiple />--%>


                                        <div style="margin-bottom: 10px;">
                                            <table>
                                                <tr>
                                                    <td>                                                       
                                                        <label for="fulArchivo" class="btnNormal">Seleccione el archivo...</label>
                                                     <input id='fulArchivo' type='file' multiple style="display: none;" />
                                                    </td>
                                                    <td><ttgInfo:ToolTipGenerico ID="ttgTamanioArchivo" runat="server" /></td>
                                                    
                                                </tr>
                                            </table>                                        
                                        </div>


                                        <%--                                        <asp:UpdatePanel ID="udpGuardar" runat="server">
                                            <ContentTemplate>
                                            </ContentTemplate>
                                            <Triggers>
                                                <asp:AsyncPostBackTrigger ControlID="btnGuardarSer" EventName="Click" />
                                            </Triggers>
                                        </asp:UpdatePanel> --%>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td colspan="3">
                                        <div id="dvArchivos" class="dvPanel" style="display: none;">
                                            <table width="100%">
                                                <tr>
                                                    <td id="tdCuentaArchivo" align="center" style="width: 170px;">
                                                        <asp:Label ID="lblCuentaArchivo" runat="server" Text="Cuenta" style="font-weight:600;"></asp:Label>
                                                    </td>
                                                    <td align="center" style="width: 150px;">
                                                        <asp:Label ID="lblPassword" runat="server" Text="Contraseña" style="font-weight:600;"></asp:Label>
                                                    </td>
                                                    <td align="center">
                                                        <asp:Label ID="lblArchivoTitulo" runat="server" Text="Archivo" style="font-weight:600;"></asp:Label>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </h4>
                </div>
            </div>
        </div>
        <br />
        <div>
            <asp:Button ID="btnGuardarSer" runat="server" Text="" />
            <div id="btnGuardar" class="btnNormal">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
            <div id="btnCerrar" class="btnNormal" style="display: none;">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cerrar</a>
            </div>
        </div>
        <div id="dvNombrePerfil" style="display: none; padding: 0px; margin: 0px;">
            <br />
            <table width="100%" border="0">
                <tr>
                    <td width="15px"></td>
                    <td>
                        <asp:Label ID="lblTituloNombrePerfil" runat="server" Text=""></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td width="15px"></td>
                    <td>
                        <asp:TextBox ID="txtPerfil" Width="350px" runat="server"></asp:TextBox>
                    </td>
                </tr>
            </table>

        </div>
        <div id="dvMisPerfiles" style="display: none; padding: 0px; margin: 0px;">
            <%--<iframe id="ifMisPerfiles" width="410" height="300" frameborder="0" style="padding:0px; margin:0px;"></iframe>--%>
            <table id="tbPerfiles"></table>

            <br />

            <table width="100%" border="0" style="display: none;">
                <tr>
                    <td align="left">
                        <div id="btnQuitarReporte" class="btnNormal" runat="server">
                            <asp:Image ID="imgQuitar" runat="server" ImageUrl="~/Common/Images/remove.png" />
                            <a>Quitar</a>
                        </div>
                    </td>
                    <td>&nbsp;</td>
                    <td width="110px" align="right">
                        <div id="btnAceptar" class="btnNormal" runat="server">
                            <asp:Image ID="imgAceptar" runat="server" ImageUrl="~/Common/Images/Guardar.png" />
                            <a>Aceptar</a>
                        </div>
                    </td>
                    <td width="110px" align="right">
                        <div id="btnCancelar" class="btnNormal" runat="server">
                            <asp:Image ID="imgCancelar" runat="server" ImageUrl="~/Common/Images/Salir.gif" />
                            <a>Cancelar</a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="divMsgConfirmacion" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <asp:Label ID="lblMensajeConfirmacion" runat="server" Text=""></asp:Label>
        </div>
        <asp:HiddenField ID="hfOperador_Origen" runat="server" />
         <asp:HiddenField ID="hfTamanioMaximoAdjunto" Value="10" runat="server" />
    </form>

    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Imp_Proceso.js")%>" type="text/javascript"></script>

</body>

</html>
