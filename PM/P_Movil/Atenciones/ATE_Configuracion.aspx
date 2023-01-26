<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Atenciones_ATE_Configuracion" CodeBehind="ATE_Configuracion.aspx.vb" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register Src="../../Common/Controles/BusquedaPrincipal.ascx" TagName="BusquedaPrincipal" TagPrefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <%--kendo --%>
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/VistaModelo/MOV_CAM_FinanciamientoTipo.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/ajaxupload.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../../Common/ControlesJQuery/ColorPicker/css/colorpicker.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/ControlesJQuery/ColorPicker/css/layout.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/ControlesJQuery/ColorPicker/js/colorpicker.js" type="text/javascript"></script>
    <script src="../../Common/ControlesJQuery/ColorPicker/js/eye.js" type="text/javascript"></script>
    <script src="../../Common/ControlesJQuery/ColorPicker/js/utils.js" type="text/javascript"></script>
    <script src="../../Common/ControlesJQuery/ColorPicker/js/layout.js?ver=1.0.2" type="text/javascript"></script>
    <script src="ATE_Configuracion.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfddlGrupo" runat="server" Value="" />
        <asp:HiddenField ID="hdfddlGrupoActualizado" runat="server" Value="" />
        <asp:HiddenField ID="hdflstGrupo" runat="server" Value="" />
        <div id="dvContenido" runat="server">
        <div id="dvCampos" class="dvPanel" style="overflow: auto;">
            <cc1:AccordionJQ ID="AccordionJQ1" runat="server" EnableViewState="true" CssClass="accordion"
                Style="overflow: auto;" TabIndex="0">
                <cc1:ContenedorAccodion Texto="General" ID="accOpciones">
                    <div id="dvGeneral" class="dvTab">
                        <cc1:TabJQ ID="tabOpciones" runat="server" CssClass="tabs" Style="margin: 0px; padding: 0px;">
                            <cc1:ContenedorTabJQ ID="tbOpciones" Titulo="Opciones" CssClass="dvTabContenido">
                                <div id="dvOpciones" style="margin: 15px;" class="dvTab">
                                    <table>
                                        <tr>
                                            <td colspan="2">
                                                <table id="tbOpcion">
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <span style="font-style: italic; color: #2C5390;"><b>Nota: Para editar el registro dé
                                                    doble clic sobre el mismo.</b></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <table width="100%" border="0" id="tbDatosOpciones" style="display: none;">
                                                    <tr>
                                                        <td colspan="2">
                                                            <hr />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 120px;">
                                                            Descripción
                                                        </td>
                                                        <td>
                                                            <asp:TextBox ID="txtDesOpcion" runat="server" Width="360px" MaxLength="50" CssClass="CajaTexto"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Imagen
                                                        </td>
                                                        <td>
                                                            <div class="UploadDiv" style="display: inline-block;">
                                                                <div id="UploadStatusImagen">
                                                                </div>
                                                                <div id="UploadButtonImagen" align="center" class="imgBtn" style="text-align: left;">
                                                                    <table>
                                                                        <tr>
                                                                            <td style="text-align: left;">
                                                                                <img alt="" src="../../Common/Images/Mantenimiento/SubirArchivo.png" width="16px"
                                                                                    height="16px" />
                                                                            </td>
                                                                            <td style="vertical-align: bottom; text-decoration: underline;">
                                                                                Adjuntar Archivo
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                                <div id="UploadedFileImagen">
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Prefijo
                                                        </td>
                                                        <td>
                                                            <asp:TextBox ID="txtPrefijo" runat="server" Width="30px" MaxLength="3" CssClass="CajaTexto"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Color
                                                        </td>
                                                        <td>
                                                            <div id="colorSelector">
                                                                <div style="background-color: #0000FF; margin-top">
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Entidad
                                                        </td>
                                                        <td>
                                                            <asp:DropDownList ID="ddlEntidad" runat="server" Width="160px">
                                                            </asp:DropDownList>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Mostrar Opción
                                                        </td>
                                                        <td>
                                                            <asp:CheckBox ID="chkMosOpcOpcion" runat="server" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2" align="right">
                                                            <div style="margin-top: 5px; text-align: right;">
                                                                <div id="btnGuardarOpcion" class="btnNormal" style="width: 110px;">
                                                                    <asp:Image ID="imgGuardarOpcion" runat="server" ImageUrl="../../Common/Images/Mantenimiento/Guardar.png" />
                                                                    <a>Actualizar</a>
                                                                </div>
                                                                <div id="btnCancelarOpcion" class="btnNormal" style="width: 110px;">
                                                                    <asp:Image ID="imgCancelarOpcion" runat="server" ImageUrl="../../Common/Images/Mantenimiento/Salir.gif" />
                                                                    <a>Cancelar</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </cc1:ContenedorTabJQ>
                            <cc1:ContenedorTabJQ ID="tbModulos" Titulo="Módulos" CssClass="dvTabContenido">
                                <div id="dvModulos" style="margin: 15px;" class="dvTab">
                                    <table>
                                        <tr>
                                            <td>
                                                Descripción
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtDesModulo" runat="server" Width="360px" MaxLength="50" CssClass="CajaTexto"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 120px;">
                                                Opción
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlOpcModulo" runat="server" Width="200px">
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Oficina
                                            </td>
                                            <td>
                                                <div id="dvbpOfiModulo">
                                                    <uc1:BusquedaPrincipal ID="bpOfiModulo" RutaRaiz="../../" Contenedor="dvbpOfiModulo"
                                                        runat="server" />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Ubicación
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtUbiModulo" runat="server" Width="360px" MaxLength="50" CssClass="CajaTexto"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Estado
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlEstModulo" runat="server" Width="200px">
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Vigente
                                            </td>
                                            <td>
                                                <asp:CheckBox ID="chkVigModulo" runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" align="right">
                                                <div style="margin-top: 5px; text-align: right;">
                                                    <div id="btnAgregarModulo" class="btnNormal" style="width: 110px;">
                                                        <asp:Image ID="imgAgregarModulo" runat="server" ImageUrl="../../Common/Images/Mantenimiento/add_16x16.gif" />
                                                        <asp:Label ID="lblAgregarModulo" runat="server" Text="Agregar"></asp:Label>
                                                    </div>
                                                    <div id="btnQuitarModulo" class="btnNormal" style="width: 110px;">
                                                        <asp:Image ID="imgQuitarModulo" runat="server" ImageUrl="../../Common/Images/Mantenimiento/Quitar.png" />
                                                        <asp:Label ID="lblQuitarModulo" runat="server" Text="Quitar"></asp:Label>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <span style="font-style: italic; color: #2C5390;"><b>Nota: Para editar el registro dé
                                                    doble clic sobre el mismo.</b></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <table id="tbModulo">
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </cc1:ContenedorTabJQ>
                            <cc1:ContenedorTabJQ ID="tabOperador" Titulo="Operador" CssClass="dvTabContenido">
                                <div id="dvOperador" style="margin: 15px;" class="dvTab">
                                    <table>
                                        <tr>
                                            <td style="width: 120px;">
                                                Usuario
                                            </td>
                                            <td>
                                                <div id="dvbpUsuOperador">
                                                    <uc1:BusquedaPrincipal ID="bpUsuOperador" RutaRaiz="../../" Contenedor="dvbpUsuOperador"
                                                        runat="server" />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" align="right">
                                                <div style="margin-top: 5px; text-align: right;">
                                                    <div id="btnAgregarOperador" class="btnNormal" style="width: 110px;">
                                                        <asp:Image ID="imgAgregarOperador" runat="server" ImageUrl="../../Common/Images/Mantenimiento/add_16x16.gif" />
                                                        <a>Agregar</a>
                                                    </div>
                                                    <div id="btnQuitarOperador" class="btnNormal" style="width: 110px;">
                                                        <asp:Image ID="imgQuitarOperador" runat="server" ImageUrl="../../Common/Images/Mantenimiento/Quitar.png" />
                                                        <a>Quitar</a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" align="right">
                                                <table id="tbOperador">
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </cc1:ContenedorTabJQ>
                            <cc1:ContenedorTabJQ ID="tabVentanilla" Titulo="Ventanillas" CssClass="dvTabContenido">
                                <div id="dvVentanilla" style="margin: 15px;" class="dvTab">
                                    <table>
                                        <tr>
                                            <td>
                                                Código
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtDesVentanilla" runat="server" Width="25px" MaxLength="3" CssClass="CajaTexto"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Número
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtNumVentanilla" runat="server" MaxLength="2" Width="20px" CssClass="CajaTexto"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 150px;">
                                                Módulo
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlModVentanilla" runat="server" Width="320px">
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Opción
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlOpcVentanilla" runat="server" Width="320px">
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr style="display:none;">
                                            <td>
                                                Operador
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlOpeVentanilla" runat="server" Width="320px">
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Estado
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlEstVentanilla" runat="server" Width="320px">
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Automático
                                            </td>
                                            <td>
                                                <asp:CheckBox ID="chkAutVentanilla" runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Vigente
                                            </td>
                                            <td>
                                                <asp:CheckBox ID="chkVigVentanilla" runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" align="right">
                                                <div style="margin-top: 5px; text-align: right;">
                                                    <div id="btnAgregarVentanilla" class="btnNormal" style="width: 110px;">
                                                        <asp:Image ID="imgAgregarVentanilla" runat="server" ImageUrl="../../Common/Images/Mantenimiento/add_16x16.gif" />
                                                        <asp:Label ID="lblAgregarVentanilla" runat="server" Text="Agregar"></asp:Label>
                                                    </div>
                                                    <div id="btnQuitarVentanilla" class="btnNormal" style="width: 110px;">
                                                        <asp:Image ID="imgQuitarVentanilla" runat="server" ImageUrl="../../Common/Images/Mantenimiento/Quitar.png" />
                                                        <asp:Label ID="lblQuitarVentanilla" runat="server" Text="Quitar"></asp:Label>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <span style="font-style: italic; color: #2C5390;"><b>Nota: Para editar el registro dé
                                                    doble clic sobre el mismo.</b></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" align="right">
                                                <table id="tbVentanilla">
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </cc1:ContenedorTabJQ>
                            <cc1:ContenedorTabJQ ID="tabGrupoAtencion" Titulo="Grupos de Atención" CssClass="dvTabContenido">
                                <div id="dvGrupoAtencion" style="margin: 15px;" class="dvTab">
                                    <table>
                                        <tr>
                                            <td style="Width: 150px;">
                                                Descripción
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtDesGrupoAtencion" runat="server" Width="300px" MaxLength="50" CssClass="CajaTexto"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr ><%--style="display: none;"--%>
                                            <td>
                                                Grupos de Empleado
                                            </td>
                                            <td>
                                                <div id="dvbpGruEmpGrupoAtencion" style="float:left;">
                                                    <uc1:BusquedaPrincipal ID="bpGruEmpGrupoAtencion" RutaRaiz="../../" Contenedor="dvbpGruEmpGrupoAtencion" runat="server" />
                                                </div>
                                                <div>
                                                    <asp:Image ID="imgAgregarGrupo" runat="server" ImageUrl="../../Common/Images/Mantenimiento/add_16x16.gif" CssClass="imgBtn" ToolTip="Agregar rol" />
                                                    <asp:Image ID="imgQuitarGrupo" runat="server" ImageUrl="../../Common/Images/Mantenimiento/delete_16x16.gif" CssClass="imgBtn" ToolTip="Quitar rol" />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            </td>
                                            <td>
                                                <asp:ListBox ID="lstbGruposAgregados" runat="server" Height="150px" Width="310px">
                                                </asp:ListBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 100px;">
                                                Prefijo
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtPreGrupoAtencion" runat="server" Width="70px" MaxLength="10" CssClass="CajaTexto"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr style="display: none;">
                                            <td style="width: 150px;">
                                                Opciones
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlOpcGrupoAtencion" runat="server" Width="150px">
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Peso
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtPesGrupoAtencion" runat="server" Width="20px" MaxLength="2" CssClass="CajaTexto"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Vigente
                                            </td>
                                            <td>
                                                <asp:CheckBox ID="chkVigGrupoAtencion" runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" align="right">
                                                <div style="margin-top: 5px; text-align: right;">
                                                    <div id="btnAgregarGrupoAtencion" class="btnNormal" style="width: 110px;">
                                                        <asp:Image ID="imgAgregarGrupoAtencion" runat="server" ImageUrl="../../Common/Images/Mantenimiento/add_16x16.gif" />
                                                        <asp:Label ID="lblAgregarGrupoAtencion" runat="server" Text="Agregar"></asp:Label>
                                                    </div>
                                                    <div id="btnQuitarGrupoAtencion" class="btnNormal" style="width: 110px;">
                                                        <asp:Image ID="imgQuitarGrupoAtencion" runat="server" ImageUrl="../../Common/Images/Mantenimiento/Quitar.png" />
                                                        <asp:Label ID="lblQuitarGrupoAtencion" runat="server" Text="Quitar"></asp:Label>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <span style="font-style: italic; color: #2C5390;"><b>Nota: Para editar el registro dé
                                                    doble clic sobre el mismo.</b></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" align="right">
                                                <table id="tbGrupoAtencion">
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </cc1:ContenedorTabJQ>
                        </cc1:TabJQ>
                    </div>
                </cc1:ContenedorAccodion>
                <cc1:ContenedorAccodion Texto="Dispensador de Atenciones" ID="accDispensadorAtenciones">
                    <div id="dvDispensador" class="dvTab">
                        <cc1:TabJQ ID="tabDispensador" runat="server" CssClass="tabs" Style="margin: 0px;
                            padding: 0px;">
                            <cc1:ContenedorTabJQ ID="tbDispensadores" Titulo="Dispensadores" CssClass="dvTabContenido">
                                <div id="dvDispensadores" style="margin: 15px;" class="dvTab">
                                    <table>
                                        <tr>
                                            <td style="Width: 150px;">
                                                Código
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtCodDispensador" runat="server" Width="110px" CssClass="CajaTexto"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 150px;">
                                                Módulo
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlModDispensador" runat="server" Width="230px">
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr ><%--style="display: none;"--%>
                                            <td>
                                                Tipo Interfaz
                                            </td>
                                            <td>
                                                <div id="dvbpDispensadorAtencion" style="float:left;">
                                                    <uc1:BusquedaPrincipal ID="bpDispensadorAtencion" RutaRaiz="../../" Contenedor="dvbpDispensadorAtencion" runat="server" />
                                                </div>
                                                <div>
                                                    <asp:Image ID="imgAgregarTipoInterfazDispensador" runat="server" ImageUrl="../../Common/Images/Mantenimiento/add_16x16.gif" CssClass="imgBtn" ToolTip="Agregar rol" />
                                                    <asp:Image ID="imgQuitarTipoInterfazDispensador" runat="server" ImageUrl="../../Common/Images/Mantenimiento/delete_16x16.gif" CssClass="imgBtn" ToolTip="Quitar rol" />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            </td>
                                            <td>
                                                <asp:ListBox ID="lstbDispensadorAtencion" runat="server" Height="150px" Width="310px">
                                                </asp:ListBox>
                                            </td>
                                        </tr>
                                        <tr style="display: none;">
                                            <td>
                                                Tipo Físico de Identificación
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlTipFisIdeDispensador" runat="server" Width="120px">
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Estado
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlEstDispensador" runat="server" Width="230px">
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Tiene Impresora
                                            </td>
                                            <td>
                                                <asp:CheckBox ID="chkImpDispensador" runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Pantalla Táctil
                                            </td>
                                            <td>
                                                <asp:CheckBox ID="chkPanTacDispensador" runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" align="right">
                                                <div style="margin-top: 5px; text-align: right;">
                                                    <div id="btnAgregarDispensador" class="btnNormal" style="width: 110px;">
                                                        <asp:Image ID="imgAgregarDispensador" runat="server" ImageUrl="../../Common/Images/Mantenimiento/add_16x16.gif" />
                                                        <asp:Label ID="lblAgregarDispensador" runat="server" Text="Agregar"></asp:Label>
                                                    </div>
                                                    <div id="btnQuitarDispensador" class="btnNormal" style="width: 110px;">
                                                        <asp:Image ID="imgQuitarDispensador" runat="server" ImageUrl="../../Common/Images/Mantenimiento/Quitar.png" />
                                                        <asp:Label ID="lblQuitarDispensador" runat="server" Text="Quitar"></asp:Label>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <span style="font-style: italic; color: #2C5390;"><b>Nota: Para editar el registro dé
                                                    doble clic sobre el mismo.</b></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" align="right">
                                                <table id="tbDispensador">
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </cc1:ContenedorTabJQ>
                            <cc1:ContenedorTabJQ ID="tbGeneralDis" Titulo="General" CssClass="dvTabContenido">
                                <div id="dvGeneralDis" style="margin: 15px;" class="dvTab">
                                    <table>
                                        <tr>
                                            <td style="width: 150px;">
                                                Tipo de Identificación
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlTipIdeDispensador" runat="server">
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </cc1:ContenedorTabJQ>
                            <cc1:ContenedorTabJQ ID="tbPonderacion" Titulo="Ponderación" CssClass="dvTabContenido">
                                <div id="dvPonderacion" style="margin: 15px;" class="dvTab">
                                    <table>
                                        <tr>
                                            <td colspan="3">
                                                <asp:RadioButton ID="rbtSinPonderar" runat="server" Text="Sin Ponderar (La cual distribuirá la atención por orden de llegada)"
                                                    GroupName="Ponderacion" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3">
                                                <asp:RadioButton ID="rbtPonderado" runat="server" Text="Ponderado (Se asignaran pesos según el grupo de empleado que solicite la atención)"
                                                    GroupName="Ponderacion" />
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </cc1:ContenedorTabJQ>
                            <cc1:ContenedorTabJQ ID="tbOpcionDis" Titulo="Opciones" CssClass="dvTabContenido">
                                <div id="dvOpcionDis" style="margin: 15px;" class="dvTab">
                                    <table>
                                        <tr>
                                            <td style="width: 150px;">
                                                Número de Opciones
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtNumOpcOpciones" runat="server" Width="30px" MaxLength="2" CssClass="CajaTexto"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Número de Filas
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtNumFilOpciones" runat="server" Width="30px" MaxLength="1" CssClass="CajaTexto"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Número de Columnas
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtNumColOpciones" runat="server" Width="30px" MaxLength="1" CssClass="CajaTexto"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Orientación
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlOriOpciones" runat="server">
                                                    <asp:ListItem Text="<Seleccione>" Value="-1"></asp:ListItem>
                                                    <asp:ListItem Text="Horizontal" Value="horizontal"></asp:ListItem>
                                                    <asp:ListItem Text="Vertical" Value="vertical"></asp:ListItem>
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </cc1:ContenedorTabJQ>
                            <cc1:ContenedorTabJQ ID="tbMensajeDis" Titulo="Mensajes" CssClass="dvTabContenido">
                                <div id="dvMensajeDis" style="margin: 15px;" class="dvTab">
                                    <table>
                                        <tr>
                                            <td colspan="2" style="font-style: italic;">
                                                Este mensaje es el inicial a mostrar
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 150px;">
                                                Inicial
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtMsjIniDis" runat="server" Width="400px" MaxLength="250" CssClass="CajaTexto"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style="font-style: italic; padding-top: 7px;">
                                                Este mensaje se mostrará debajo del cuadro de ingreso del código/DNI del empleado
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Mensaje Opcional</td>
                                            <td>
                                                <asp:TextBox ID="txtMsjIniOpcDis" runat="server" Width="400px" MaxLength="100" CssClass="CajaTexto"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <%--                                <tr><td colspan="2" style="font-style:italic; padding-top:7px;">Este mensaje es el mensaje de bienvenida que se mostrará en el Dispensador de Atenciones después de haber ingresado el DNI o codigo de empleado para identificarse.</td></tr>                                <tr>
                                                <td>Bienvenida</td>
                                                <td><asp:TextBox ID="txtMsjBienvenida" runat="server"></asp:TextBox></td>
                                            </tr> --%>
                                        <tr>
                                            <td colspan="2" style="font-style: italic; padding-top: 7px;">
                                                Este mensaje es el que se mostrará como indicador de poder elegir las opciones mostradas
                                                (después de identificarse).
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>En Opciones a elegir</td>
                                            <td>
                                                <asp:TextBox ID="txtMsjOpcDis" runat="server" Width="400px" MaxLength="250" CssClass="CajaTexto"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style="font-style: italic; padding-top: 7px;">
                                                Este mensaje es el que se mostrará al imprimir el ticket de atención.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                En ticket impreso
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtMsjTicDis" runat="server" Width="400px" MaxLength="250" CssClass="CajaTexto"></asp:TextBox>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </cc1:ContenedorTabJQ>
                        </cc1:TabJQ>
                    </div>
                </cc1:ContenedorAccodion>
                <cc1:ContenedorAccodion Texto="Visualizador de Atenciones" ID="accVisualizador">
                    <div id="dvVisualizador" class="dvTab">
                        <cc1:TabJQ ID="tabVisualizador" runat="server" CssClass="tabs" Style="margin: 0px;
                            padding: 0px;">
                            <cc1:ContenedorTabJQ ID="tbVisualizadores" Titulo="Visualizadores" CssClass="dvTabContenido">
                                <div id="dvVisualizadores" style="margin: 15px;" class="dvTab">
                                    <table>
                                        <tr>
                                            <td>
                                                Código
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtCodVisualizador" runat="server" Width="110px" MaxLength="10" CssClass="CajaTexto"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Tipo de Visualizador
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlTipVisVisualizador" runat="server" Width="120px">
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 130px;">
                                                Módulo
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlModVisualizador" runat="server" Width="230px">
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Estado
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlEstVisualizador" runat="server" Width="230px">
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Vigente
                                            </td>
                                            <td>
                                                <asp:CheckBox ID="chkVigVisualizador" runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" align="right">
                                                <div style="margin-top: 5px; text-align: right;">
                                                    <div id="btnAgregarVisualizador" class="btnNormal" style="width: 110px;">
                                                        <asp:Image ID="imgAgregarVisualizador" runat="server" ImageUrl="../../Common/Images/Mantenimiento/add_16x16.gif" />
                                                        <asp:Label ID="lblAgregarVisualizador" runat="server" Text="Agregar"></asp:Label>
                                                    </div>
                                                    <div id="btnQuitarVisualizador" class="btnNormal" style="width: 110px;">
                                                        <asp:Image ID="imgQuitarVisualizador" runat="server" ImageUrl="../../Common/Images/Mantenimiento/Quitar.png" />
                                                        <asp:Label ID="lblQuitarVisualizador" runat="server" Text="Quitar"></asp:Label>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" align="right">
                                                <table id="tbVisualizador">
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </cc1:ContenedorTabJQ>
                            <cc1:ContenedorTabJQ ID="tbGeneralVis" Titulo="General" CssClass="dvTabContenido">
                                <div id="dvGeneralVis" style="margin: 15px;" class="dvTab">
                                    <table>
                                        <tr style="display: none;">
                                            <td style="width: 130px;">
                                                Número de Atenciones
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtNumAteAtenciones" runat="server" Width="30px" CssClass="CajaTexto"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr style="display: none;">
                                            <td>
                                                Número de Filas
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtNumFilAtenciones" runat="server" Width="30px" CssClass="CajaTexto"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr style="display: none;">
                                            <td>
                                                Número de Columnas
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtNumColAtenciones" runat="server" Width="30px" CssClass="CajaTexto"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr style="display: none;">
                                            <td>
                                                Orientación
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlOriHorVisualizador" runat="server">
                                                    <asp:ListItem Text="<Seleccione>" Value="-1"></asp:ListItem>
                                                    <asp:ListItem Text="Horizontal" Value="horizontal"></asp:ListItem>
                                                    <asp:ListItem Text="Vertical" Value="vertical"></asp:ListItem>
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 130px;">
                                                Tipo de Llamada
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlTipLlaVisualizador" runat="server" Width="250px">
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Tipo de Presentación
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlTipPreVisualizador" runat="server" Width="250px">
                                                    <asp:ListItem Text="<Ninguno>" Value=""></asp:ListItem>
                                                    <asp:ListItem Text="Imágen" Value="imagen"></asp:ListItem>
                                                    <asp:ListItem Text="Video" Value="video"></asp:ListItem>
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr style="display:none;">
                                            <td>
                                                Imprimir Ticket
                                            </td>
                                            <td>
                                                <asp:CheckBox ID="chkImpTicVisualizador" runat="server" />
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </cc1:ContenedorTabJQ>
                            <cc1:ContenedorTabJQ ID="tbMensajeVis" Titulo="Mensajes" CssClass="dvTabContenido">
                                <div id="dvMensajeVis" style="margin: 15px;" class="dvTab">
                                    <table>
                                        <tr>
                                            <td colspan="2" style="font-style: italic; padding-top: 7px;">
                                                Este mensaje es el que se mostrará como marquesina.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 170px;">
                                                En visualizador de atención
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtMsjVisualizador" runat="server" Width="400px" MaxLength="250" CssClass="CajaTexto"></asp:TextBox>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </cc1:ContenedorTabJQ>
                        </cc1:TabJQ>
                    </div>
                </cc1:ContenedorAccodion>
                <cc1:ContenedorAccodion Texto="Atenciones" ID="accAtenciones">
                    <div id="dvAtenciones" class="dvTab">
                        <cc1:TabJQ ID="tabAtenciones" runat="server" CssClass="tabs" Style="margin: 0px;
                            padding: 0px;">
                            <cc1:ContenedorTabJQ ID="tbGeneralAte" Titulo="General" CssClass="dvTabContenido">
                                <div id="dvGeneralAte" style="margin: 15px;" class="dvTab">
                                    <table>
                                        <tr>
                                            <td style="width: 230px;">
                                                Tiempo de Espera
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtTiempoEspera" runat="server" Width="50" MaxLength="3" CssClass="CajaTexto"></asp:TextBox>
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlUnidad" runat="server">
                                                    <asp:ListItem Text="Segundos" Value="segundos"></asp:ListItem>
                                                    <asp:ListItem Text="Minutos" Value="minutos"></asp:ListItem>
                                                    <asp:ListItem Text="Horas" Value="horas"></asp:ListItem>
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 120px;">
                                                Tiempo para retomar atención cancelada
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtTiempoRetAteCan" runat="server" Width="50" MaxLength="3" CssClass="CajaTexto"></asp:TextBox>
                                            </td>
                                            <td>
                                                Minutos
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </cc1:ContenedorTabJQ>
                        </cc1:TabJQ>
                    </div>
                </cc1:ContenedorAccodion>
            </cc1:AccordionJQ>
        </div>
        <br />
        <div id="dvBotones" style="margin-top: 5px; text-align: left;">
            <div id="btnGuardar" class="btnNormal">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="../../Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
            <%--<div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="../../Common/Images/Mantenimiento/Salir.gif" />
                <a>Cancelar</a>
            </div>--%>
        </div>
        </div>
        <div id="divConEliMod" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            ¡Atención!, existen elementos relacionados con el módulo elegido; si lo elimina, se podrá perder información de ventanillas, dispensadores o visualizadores. ¿Desea Continuar?.
        </div>
    </form>
</body>
</html>
