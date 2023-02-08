<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Solicitudes_Adm_SolicitudesConfiguracion" CodeBehind="Adm_SolicitudesConfiguracion.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register Src="../../../Common/Controles/BusquedaPrincipal.ascx" TagName="BusquedaPrincipal" TagPrefix="uc1" %>
<%@ Register Src="../../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <%--kendo --%>
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
    <script src="../../../Common/Scripts/jqueryui/jquery.ui.autocomplete.js" type="text/javascript"></script>
    <%--<script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>--%>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.combobox.min.js" type="text/javascript"></script>
    <%--<script src="../../../Common/Scripts/VistaModelo/MOV_CAM_FinanciamientoTipo.js" type="text/javascript"></script>--%>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/ajaxupload.js" type="text/javascript"></script>

    <style type="text/css">
        .ui-accordion-icons .ui-accordion-header a {
            padding-top: 5px !important;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfTamano" runat="server" Value="" />
        <asp:HiddenField ID="hdfCodTipSol" runat="server" Value="" />
        <asp:HiddenField ID="hdfNumSolicitudes" runat="server" Value="" />
        <asp:HiddenField ID="hdfPersonalizada" runat="server" />
        <asp:HiddenField ID="hdfCodSolSist" runat="server" />
        <asp:HiddenField ID="hdfTecnicoResponsable" runat="server" />
        <asp:HiddenField ID="hdfTecnicoResponsable_Act" runat="server" />
        <asp:HiddenField ID="hdIdRespUsuario" runat="server" />
        <asp:HiddenField ID="hdfSoportaEdicion" runat="server" />
        <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
        <div id="dvContenido" runat="server">
            <div id="dvCampos" class="dvPanel">
                <cc1:AccordionJQ ID="AccordionJQ1" runat="server" EnableViewState="true" CssClass="accordion" TabIndex="0">
                    <cc1:ContenedorAccodion Texto="Información General" ID="accInformacionGeneral" CssClass="acordionper">
                        <table width="100%">
                            <tr>
                                <td colspan="2">
                                    <asp:Label ID="lblMensajeError" runat="Server" ForeColor="Red"
                                        Font-Bold="False" Font-Italic="True"></asp:Label>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdEtiqueta" style="width: 190px;">
                                    <asp:Label ID="lblTabla" runat="server" Text="Nombre Tipo"></asp:Label>
                                </td>
                                <td>
                                    <table cellpadding="0px" cellspacing="0px">
                                        <tr>
                                            <td>
                                                <asp:TextBox ID="txtTabla" runat="server" Width="200px" MaxLength="20"></asp:TextBox></td>
                                            <td>
                                                <ttgInfo:ToolTipGenerico ID="ttgInfoNombre" runat="server" />
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblDescripcionTipo" runat="server" Text="Descripción Tipo"></asp:Label>
                                </td>
                                <td class="">
                                    <asp:TextBox ID="txtDescripcionTipo" runat="server" Width="200px" MaxLength="50"></asp:TextBox>
                                </td>
                            </tr>
                            <%--EDGAR GARCIA 06022023 SE AGREGA LA DESCRIPCION DE SOLICITUD--%>
                            <tr>
                                <td class="tdDescripcionSol">
                                    <asp:Label ID="LabelDescripcionsol" runat="server" Text="Descripción de la solicitud"></asp:Label>
                                </td>
                                <td class="">
                                    <asp:TextBox ID="TxtDescripcionsol" runat="server" Width="200px" MaxLength="50"></asp:TextBox>
                                </td>
                            </tr>

                            <tr style="display: none;">
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblFases" runat="server" Text="Fases"></asp:Label>
                                </td>
                                <td class="">
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <asp:ListBox ID="lstFases" runat="server" Height="150px" Width="210px" multiple="multiple"></asp:ListBox>
                                            </td>
                                            <td style="padding-left: 5px;">
                                                <div id="divFases">
                                                    <table width="100%" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td>
                                                                <div id="btnAgregarFase" class="btnFase">Agregar</div>
                                                            </td>
                                                        </tr>
                                                        <%--<tr><td> <div id="btnEditarFase" class="btnFase">Editar</div></td></tr>--%>
                                                        <tr>
                                                            <td>
                                                                <div id="btnEliminarFase" class="btnFase">Eliminar</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div id="btnSubirFase" class="btnFase">Subir</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div id="btnBajarFase" class="btnFase">Bajar</div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                                <div id="divValorFase" style="display: none;">
                                                    <table>
                                                        <tr>
                                                            <td colspan="2" id="tdTitulobtnFase"></td>
                                                        </tr>
                                                        <tr>
                                                            <td align="right">Etiqueta
                                                            </td>
                                                            <td>
                                                                <input type="text" id="txtValorFase" maxlength="15" style="width: 200px" />
                                                            </td>
                                                        </tr>
                                                        <tr height="8px">
                                                            <td colspan="2"></td>
                                                        </tr>
                                                    </table>
                                                    <div style="text-align: right;">
                                                        <div id="btnGuardarFase" class="btnNormal">
                                                            <asp:Image ID="imgGuardarFase" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                                                            <a>Aceptar</a>
                                                        </div>
                                                        <div id="btnCerrarFase" class="btnNormal">
                                                            <asp:Image ID="imgCerrarFase" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Cancelar.png" />
                                                            <a>Cancelar</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <%--<tr>
                                <td class="TituloMant" rowspan="2">
                                    <asp:Label ID="lblPerfil" runat="server" Text="Roles"></asp:Label>
                                </td>
                                <td class="ValorMant">
                                    <asp:DropDownList ID="ddlRoles" runat="server" Width="210px"></asp:DropDownList>
                                    <asp:Image ID="imgAgregarRol" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"
                                        CssClass="imgBtn" ToolTip="Agregar rol" />
                                    <asp:Image ID="imgQuitarRol" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif"
                                        CssClass="imgBtn" ToolTip="Quitar rol" />    
                                </td>
                            </tr>
                            <tr>
                                <td class="">
                                    <table id="tbRoles"></table>
                                </td>            
                            </tr>--%>
                            <tr>
                                <td class="TituloMant">
                                    <asp:Label ID="lblPrefijo" runat="server" Text="Prefijo Código"></asp:Label>
                                </td>
                                <td class="ValorMant">
                                    <asp:TextBox ID="txtPrefijo" runat="server" Width="40px" MaxLength="5"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td class="TituloMant">
                                    <asp:Label ID="lblCategoria" runat="server" Text="Categoría"></asp:Label>
                                </td>
                                <td class="ValorMant">
                                    <asp:DropDownList ID="ddlCategoria" runat="server" Width="210px" MaxLength="5"></asp:DropDownList>
                                </td>
                            </tr>
                            <tr style="display: none;">
                                <td class="TituloMant">
                                    <asp:Label ID="lblTipoLinea" runat="server" Text="Tipo de Línea"></asp:Label>
                                </td>
                                <td class="ValorMant">
                                    <asp:DropDownList ID="ddlLineaTipo" runat="server" Width="210px" MaxLength="5"></asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td class="TituloMant">Tipo De Producto</td>
                                <td class="ValorMant">
                                    <asp:CheckBoxList ID="cblTipoProducto" runat="server" RepeatDirection="Horizontal" Enabled="false"></asp:CheckBoxList>
                                    <asp:RadioButtonList ID="rblTipoProducto" runat="server" RepeatDirection="Horizontal" Visible="false"></asp:RadioButtonList>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label Text="Usa Financiamiento" runat="server" />
                                </td>
                                <td>
                                    <asp:CheckBox ID="chkUsaFinanciamiento" runat="server" />
                                </td>
                            </tr>

                            <tr id="trCobroDefecto" style="display: none;" runat="server">
                                <%--<td class="TituloMant">
                                    <asp:Label Text="Cobro por Defecto" runat="server" />
                                </td>
                                <td class="ValorMant">
                                    <asp:DropDownList ID="ddlCobroDefecto" runat="server" Width="210px" MaxLength="5"></asp:DropDownList>
                                </td>--%>
                            </tr>

                            <tr style="display: none;">
                                <td class="TituloMant">
                                    <asp:Label ID="lblFinanciamiento" runat="server" Text="Forma de Pago"></asp:Label>
                                </td>
                                <td class="ValorMant">
                                    <asp:DropDownList ID="ddlFinanciamiento" runat="server" Width="210px">
                                        <asp:ListItem Value="-2" Text="Seleccione Tipo de Línea"></asp:ListItem>
                                    </asp:DropDownList>
                                    <asp:Image ID="imgInfoFinanciamiento" runat="server" ImageUrl="~/Common/Images/Mantenimiento/VerDetalle.png"
                                        CssClass="imgBtn" ToolTip="Ver detalle" />
                                </td>
                            </tr>
                            <tr id="trEsDevolucion" style="display: none;" runat="server">
                                <td>
                                    <asp:Label ID="lblEsDevolucion" runat="server" Text="Es Devolución"></asp:Label>
                                </td>
                                <td>
                                    <asp:CheckBox ID="chkEsDevolucion" runat="server" />
                                </td>
                            </tr>
                            <tr id="trMontoFijo" style="display: none;" runat="server">
                                <td class="TituloMant">
                                    <asp:Label ID="lblMontoFijo" runat="server" Text="Monto Fijo"></asp:Label>
                                </td>
                                <td class="ValorMant">
                                    <asp:CheckBox ID="chkMontoFijo" runat="server"></asp:CheckBox>
                                </td>
                            </tr>
                            <tr id="trMonto" style="display: none;" runat="server">
                                <td class="TituloMant">
                                    <asp:Label ID="lblMonto" runat="server" Text="Monto"></asp:Label>
                                </td>
                                <td class="ValorMant">
                                    <asp:TextBox ID="txtMonto" runat="server" MaxLength="14" Style="width: 140px"></asp:TextBox>
                                </td>
                            </tr>
                            <%--<tr id="trFraccionamiento" style="display:none;" runat="server">
                                <td class="TituloMant">
                                    <asp:Label ID="lblFraccionamiento" runat="server" Text="Permite Fraccionar"></asp:Label>
                                </td>
                                <td class="ValorMant">
                                    <asp:DropDownList ID="ddlFraccionamiento" runat="server" >
                                        <asp:ListItem Value="0">NO</asp:ListItem>
                                        <asp:ListItem Value="1">SI</asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                            </tr>--%>
                            <tr id="trUsarDriver" style="display: none;">
                                <td class="TituloMant">
                                    <asp:Label ID="lblUsarDriver" runat="server" Text="Usar Driver"></asp:Label>
                                </td>
                                <td class="ValorMant">
                                    <asp:CheckBox ID="chkUsarDriver" runat="server"></asp:CheckBox>
                                </td>
                            </tr>
                            <tr>
                                <td class="TituloMant">
                                    <asp:Label ID="lblTecnicoResponsable" runat="server" Text="Especialista Responsable"></asp:Label>
                                </td>
                                <td class="ValorMant">
                                    <div id="dvContenedorTecRes" runat="server" style="float: left;">
                                        <uc1:BusquedaPrincipal ID="bpTecnicoResponsable" runat="server" />
                                    </div>
                                    <asp:Label ID="lblInforTecRes" runat="server" ForeColor="#4297d7" Font-Size="11px" Font-Bold="true" Font-Italic="true"
                                        Text=""></asp:Label>
                                </td>
                            </tr>
                            <tr id="trEscalar">
                                <td class="TituloMant">Escalar
                                </td>
                                <td class="ValorMant">
                                    <asp:DropDownList ID="ddlEscalar" runat="server" Width="53px">
                                        <asp:ListItem Text="SI" Value="1"></asp:ListItem>
                                        <asp:ListItem Text="NO" Value="0" Selected="True"></asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                            </tr>

                            <tr id="trEnviarOperador">
                                <td class="TituloMant">Requiere Envío al Operador
                                </td>
                                <td class="ValorMant">
                                    <asp:DropDownList ID="ddlEnviarOperador" runat="server" Width="53px">
                                        <asp:ListItem Text="SI" Value="1"></asp:ListItem>
                                        <asp:ListItem Text="NO" Value="0" Selected="True"></asp:ListItem>
                                    </asp:DropDownList>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label Text="Especialista Directo" runat="server" />
                                </td>
                                <td>
                                    <div id="dvContenedorTecDir" runat="server" style="float: left;">
                                        <uc1:BusquedaPrincipal ID="bpTecnicoDirecto" runat="server" />
                                    </div>
                                    <asp:HiddenField ID="hdfTecnicoDirecto" runat="server" />
                                </td>
                            </tr>
                            <tr id="trRefrescar" style="display: none;">
                                <td class="TituloMant">Mostrar botón "Refrescar"
                                </td>
                                <td class="ValorMant">
                                    <asp:DropDownList ID="ddlMosBotRef" runat="server" Width="53px">
                                        <asp:ListItem Text="SI" Value="1" Selected="True"></asp:ListItem>
                                        <asp:ListItem Text="NO" Value="0"></asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr id="trActivo" style="display: none;" runat="server">
                                <td class="TituloMant">Activo</td>
                                <td class="ValorMant">
                                    <asp:CheckBox ID="chkActivo" runat="server" />
                                </td>
                            </tr>
                        </table>
                    </cc1:ContenedorAccodion>
                    <cc1:ContenedorAccodion Texto="Atributos" ID="accAtributos">
                        <div id="dvFormulario" style="width: 540px;" class="dvTab" runat="server">
                            <table width="100%" border="0">
                                <tr id="trCampo" runat="server">
                                    <td class="TituloMant">Campo
                                    </td>
                                    <td class="ValorMant" colspan="2">
                                        <asp:TextBox ID="txtCampo" runat="server" Width="150px" MaxLength="35"></asp:TextBox>
                                        <asp:HiddenField ID="hdfCampoActivo" runat="server" />
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td class="TituloMant">Descripción
                                    </td>
                                    <td class="ValorMant" colspan="2">
                                        <asp:TextBox ID="txtDescripcion" runat="server" Width="200px" MaxLength="50"></asp:TextBox>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr id="trTipoDato" runat="server">
                                    <td class="TituloMant">Tipo de dato
                                    </td>
                                    <td class="ValorMant" colspan="2">
                                        <asp:DropDownList ID="ddlTipoDato" runat="server" Width="210px"></asp:DropDownList>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr id="trTamDat" runat="server">
                                    <td class="TituloMant" id="tdTamano">Tamaño
                                    </td>
                                    <td class="ValorMant">
                                        <asp:TextBox ID="txtTamanoDato" CssClass="txtBusqueda" runat="server" Width="200px" MaxLength="35"></asp:TextBox>
                                        <span id="lblMensajeTamano"></span>

                                        <div id="divPicklist" style="display: none;">
                                            <table>
                                                <tr>
                                                    <td>
                                                        <select id="lstPicklist" size="4" multiple="multiple" style="width: 165px;">
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <table id="tblPicklistButtons" width="100%" cellpadding="0" cellspacing="0">
                                                            <tr>
                                                                <td>
                                                                    <div id="btnPicklistAgregar" class="btnPicklist">Agregar</div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div id="btnPicklistEditar" class="btnPicklist">Editar</div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div id="btnPicklistEliminar" class="btnPicklist">
                                                                        <label id="lblPicklistEliminar">Eliminar</label>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div id="btnPicklistSubir" class="btnPicklist">Subir</div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div id="btnPicklistBajar" class="btnPicklist">Bajar</div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div id="divValorPicklist" style="display: none;">
                                            <table>
                                                <tr>
                                                    <td colspan="2" id="tdTituloPicklist"></td>
                                                </tr>
                                                <tr>
                                                    <td align="right">Etiqueta
                                                    </td>
                                                    <td>
                                                        <input type="text" id="txtValorPicklist" maxlength="18" style="width: 200px" />
                                                    </td>
                                                </tr>
                                                <tr height="8px">
                                                    <td colspan="2"></td>
                                                </tr>
                                            </table>
                                            <div style="text-align: right;">
                                                <div id="btnGuardarPicklist" class="btnNormal">
                                                    <asp:Image ID="imgGuardarItem" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                                                    <a>Aceptar</a>
                                                </div>
                                                <div id="btnCerrarPicklist" class="btnNormal">
                                                    <asp:Image ID="imgCerrarItem" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Cancelar.png" />
                                                    <a>Cancelar</a>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr id="trValLongMin" runat="server" style="display: none;">
                                    <td class="TituloMant">Longitud Mínima
                                    </td>
                                    <td class="ValorMant" colspan="2">
                                        <asp:TextBox ID="txtLongitudMin" CssClass="" runat="server" Width="200px" MaxLength="35"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr id="trValDat" runat="server" style="display: none;">
                                    <td class="TituloMant">Tipo de validación
                                    </td>
                                    <td class="ValorMant" colspan="2">
                                        <input id="chkValidaSoloTexto" type="checkbox" name="chkTipoValidacion" />
                                        <span>Solo texto</span>
                                        &nbsp;&nbsp;
                                        <input id="chkValidaSoloNumero" type="checkbox" name="chkTipoValidacion" />
                                        <span>Solo números</span>

                                    </td>
                                </tr>
                                <tr id="trReferencia" runat="server" style="display: none;">
                                    <td>Configuración Referencia
                                    </td>
                                    <td colspan="2">
                                        <div id="divReferencia" runat="server" class="dvPanel">
                                            <table width="100%">
                                                <tr>
                                                    <td style="width: 160px">Entidad referenciada</td>
                                                    <td>
                                                        <asp:DropDownList ID="ddlEntidadReferencia" runat="server" Width="200px"></asp:DropDownList>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>Atributo a mostrar </td>
                                                    <td>
                                                        <asp:DropDownList ID="ddlCampoEntidad" runat="server" Width="200px">
                                                            <asp:ListItem Value="-2">Seleccione Entidad</asp:ListItem>
                                                        </asp:DropDownList>
                                                    </td>
                                                </tr>

                                                <tr id="trPerAdic" runat="server" style="display: none;">
                                                    <td class="TituloMant">Permite adicionar 
                                                    </td>
                                                    <td class="ValorMant" colspan="2">
                                                        <input id="chkPermiteAdicionar" type="checkbox" name="chkPermiteAdicionar" />
                                                    </td>
                                                </tr>

                                                <%--<div class="ui-widget-content ui-helper-clearfix" style="margin: 0.6em .0em;height:0.01em;"></div>--%>
                                                <tr>
                                                    <td colspan="2">
                                                        <div class="ui-widget-content ui-helper-clearfix" style="margin: 0.6em .0em; height: 0.001em;"></div>
                                                        <b>Condiciones</b>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" id="tdCondiciones"></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="TituloMant"></td>
                                    <td align="right">
                                        <asp:Label ID="lblMsjGrillaCampos" runat="server" Text="(Doble click para actualizar un campo)" Font-Italic="true" ForeColor="Gray"></asp:Label>
                                        <div id="btnAgregar" class="btnNormal" style="width: 110px;">
                                            <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                            <%--<a>Agregar</a>--%>
                                            <asp:Label ID="lblBotonAgregar" runat="server" Text="Agregar"></asp:Label>
                                        </div>
                                        <div id="btnQuitar" class="btnNormal" style="width: 100px;">
                                            <asp:Image ID="imgQuitar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                            <%--<a>Quitar</a>--%>
                                            <asp:Label ID="lblBotonQuitar" runat="server" Text="Quitar"></asp:Label>
                                        </div>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <table id="tbCampos"></table>
                                    </td>
                                    <td>
                                        <table>
                                            <tr>
                                                <td>
                                                    <div id="btnSubir" class="btnNormal btnSubir">
                                                        <asp:Image ID="imgSubir" runat="server" ToolTip="Subir" ImageUrl="~/Common/Images/Mantenimiento/Ascendente.png" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div id="btnBajar" class="btnNormal btnBajar">
                                                        <asp:Image ID="imgBajar" runat="server" ToolTip="Bajar" ImageUrl="~/Common/Images/Mantenimiento/Descendente.png" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div id="dvCapturaDatos" style="width: 540px; display: none;" class="dvTab" runat="server">
                            <table id="tbDetalleContenido">
                            </table>
                        </div>
                        <div id="dvCapturaDatosConfiguracion" style="width: 90%; display: none; margin-top: 10px;" class="dvPanel" runat="server">

                            <div class="ui-state-default ui-corner-all" style="padding: 1px; height: 21px; vertical-align: middle;">
                                <table cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td style="padding-top: 3px;">
                                            <span class="ui-icon ui-icon-gear" style="float: left; margin: -2px 5px 0 0;"></span>
                                            <asp:Label ID="lblTituloConfiguracionContenido" runat="server"></asp:Label>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <table width="100%" cellpadding="0" cellspacing="0" style="padding-top: 7px;">
                                <tr class="trAdjuntos" style="display: none;">
                                    <td style="width: 200px; padding-left: 10px;">Cantidad de adjuntos</td>
                                    <td>
                                        <asp:TextBox ID="txtCantidadAdjuntos" runat="server" Width="100" MaxLength="4"></asp:TextBox>
                                        <asp:CheckBox ID="chkCantIlimitada_Adj" runat="server" Text="Sin Límite" Checked="false" />
                                        <label style="color: Gray; font-style: italic;">(Cantidad de adjuntos que se podrán agregar a la solicitud.)</label>
                                    </td>
                                </tr>
                                <tr class="trAdjuntos" style="display: none;">
                                    <td style="padding-left: 10px;">Extensiones permitidas</td>
                                    <td>
                                        <asp:TextBox ID="txtExtensionesPermitidas" runat="server" Width="100" MaxLength="40"></asp:TextBox>
                                        <asp:CheckBox ID="chkTodas_Adj" runat="server" Text="Todas" Checked="false" />
                                    </td>
                                </tr>
                                <tr class="trAdjuntos" style="display: none;">
                                    <td style="padding-left: 10px;">Tamaño máximo de adjuntos</td>
                                    <td>
                                        <asp:TextBox ID="txtTamano_Adj" runat="server" Width="100" MaxLength="10"></asp:TextBox>
                                        <asp:CheckBox ID="chkTamIlimitado_Adj" runat="server" Text="Sin Límite" Checked="false" />
                                    </td>
                                </tr>
                                <tr class="trAdjuntos" style="display: none;">
                                    <td style="padding-left: 10px;">Medida de validación de tamaño</td>
                                    <td>
                                        <asp:DropDownList ID="ddlTamMed_Adj" runat="server" Width="110">
                                            <asp:ListItem Value="-1" Text="Ninguna"></asp:ListItem>
                                            <asp:ListItem Value="KB" Text="KB"></asp:ListItem>
                                            <asp:ListItem Value="MB" Text="MB"></asp:ListItem>
                                            <asp:ListItem Value="GB" Text="GB"></asp:ListItem>
                                        </asp:DropDownList>
                                    </td>
                                </tr>
                                <tr class="trAdjuntos" style="display: none;">
                                    <td style="padding-left: 10px;">Tipo de validación de tamaño</td>
                                    <td>
                                        <asp:DropDownList ID="ddlTamTip_Adj" runat="server" Width="110">
                                            <%--<asp:ListItem Value="-1" Text="Ninguno"></asp:ListItem>
                                            <asp:ListItem Value="t" Text="Total"></asp:ListItem>
                                            <asp:ListItem Value="i" Text="Individual"></asp:ListItem>--%>
                                        </asp:DropDownList>
                                        <asp:Label ID="lblDescValidTamTipAdjunto" runat="server" ForeColor="Gray" Font-Italic="true"></asp:Label>
                                    </td>
                                </tr>
                                <tr class="trMensaje" style="display: none;">
                                    <td style="width: 200px; padding-left: 10px;">Tipo de validación</td>
                                    <td>
                                        <asp:DropDownList ID="ddlTipoValidMensaje" runat="server" Width="110">
                                            <%--<asp:ListItem Value="-1" Text="Seleccione..."></asp:ListItem>
                                            <asp:ListItem Value="c" Text="Caracteres"></asp:ListItem>
                                            <asp:ListItem Value="w" Text="Palabras"></asp:ListItem>--%>
                                        </asp:DropDownList>
                                        <asp:Label ID="lblDescTipoValidMensaje" runat="server" ForeColor="Gray" Font-Italic="true"></asp:Label>
                                    </td>
                                </tr>
                                <tr class="trMensaje" style="display: none;">
                                    <td style="padding-left: 10px;">Tamaño mínimo de mensaje</td>
                                    <td>
                                        <asp:TextBox ID="txtTamMensaje" runat="server" Width="100" MaxLength="3"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr class="trCondiciones" style="display: none;">
                                    <td style="width: 150px; padding-left: 10px; vertical-align: top; padding-top: 5px;">Archivo</td>
                                    <td style="padding-bottom: 12px;">
                                        <div class="UploadDiv" style="display: inline-block; float: left;">
                                            <div id="UploadStatus"></div>
                                            <div id="UploadButton" align="center" class="imgBtn" style="text-align: left;">
                                                <table>
                                                    <tr>
                                                        <td style="text-align: left;">
                                                            <img alt="" src="../../../Common/Images/Mantenimiento/SubirArchivo.png" width="16px" height="16px" />
                                                        </td>
                                                        <td style="vertical-align: bottom; text-decoration: underline;">Adjuntar Archivo (htm,html)</td>
                                                    </tr>
                                                </table>
                                            </div>
                                            <div id="UploadedFile"></div>
                                        </div>
                                        <div id="dvInfoAdjunto" style="float: left; display: none; vertical-align: bottom; margin-top: 3px;">
                                            <ttgInfo:ToolTipGenerico ID="ttgInfoAdjunto" runat="server" />
                                        </div>
                                    </td>
                                </tr>
                                <tr class="trCondiciones" style="display: none; padding-left: 10px;">
                                    <td colspan="2">
                                        <div class="ui-state-default ui-corner-all" style="padding: -150px; height: 21px; vertical-align: middle;">
                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td style="padding-top: 3px;">
                                                        <span class="ui-icon ui-icon-document" style="float: left; margin: -2px 5px 0 0;"></span>
                                                        <asp:Label ID="lblTituloCondiciones" runat="server" Text="Previsualización"></asp:Label>
                                                    </td>
                                                    <td style="width: 20px; text-align: right;">
                                                        <div id="btnAmpliar" class="imgBtn" style="height: 20px; float: left; display: none;" title="Ampliar">
                                                            <img alt="Ampliar" src="../../../Common/Images/Mantenimiento/Ampliar_15x15.png" style="margin-top: 3px;" />
                                                            <%--<a></a>--%>
                                                        </div>
                                                        <div id="btnReducir" class="imgBtn" style="height: 20px; float: left; display: none;" title="Reducir">
                                                            <img alt="Reducir" src="../../../Common/Images/Mantenimiento/Restaurar_15x15.png" style="margin-top: 3px;" />
                                                            <%--<a></a>--%>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="trCondiciones" style="display: none; padding-left: 10px;">
                                    <td colspan="2" style="padding-top: 7px;">
                                        <iframe id="ifCondiciones" frameborder="0" style="padding: 0px; margin: 0px; height: 0px; width: 100%;"></iframe>
                                    </td>
                                </tr>
                                <tr style="padding-top: 10px;">
                                    <td colspan="2" align="right" style="padding-top: 10px;">
                                        <div id="btnGuardarConfigConten" class="btnNormal" style="width: 100px;">
                                            <asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                                            <a>Guardar</a>
                                        </div>
                                        <div id="btnCancelarConfigConten" class="btnNormal" style="width: 100px;">
                                            <asp:Image ID="Image4" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                                            <a>Cancelar</a>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <br />
                    </cc1:ContenedorAccodion>
                    <cc1:ContenedorAccodion Texto="Parámetros" ID="accParametros">
                        <div id="dvParametros" style="margin-bottom: 5px;">
                            <table>
                                <tr>
                                    <%--<td>La creación de parámetros permitirá reemplazar datos de la solicitud en cualquiera de los correos a enviar. Por ejemplo, si creo un parámetro de clave "{empleado}" y valor "Empleado" y en Estados de Proceso configuro un envío de correo cada vez que una solicitud se cree con el texto: "Sr {empleado}, la solicitud fue creada exitosamente", el mensaje real que se enviará al empleado será el mismo pero el texto "{empleado}" será reemplazado por el nombre del empleado.</td>--%>
                                    <td>La activación de parámetros permitirá reemplazar datos de la solicitud en cualquiera de los correos a enviar. Por ejemplo, si activo el parámetro "Empleado" con clave "{empleado}" y en Estados de Proceso configuro un envío de correo cada vez que una solicitud se cree con el texto: "Sr {empleado}, la solicitud fue creada exitosamente" (la clave {empleado} puede ser agregada desde la lista de parámetros que aparece en cada configuración de mensajes, o sencillamente digitándola), el mensaje real que se enviará al empleado será el mismo pero el texto "{empleado}" será reemplazado por el nombre del empleado.</td>
                                </tr>
                                <tr style="height: 5px;">
                                    <td colspan="2"></td>
                                </tr>
                            </table>
                            <table width="500px">
                                <%--<tr>
                                    <td style="width:35px;">
                                        <asp:Label ID="lblClave" runat="server" Text="Clave:"></asp:Label>  
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtClave" runat="server" Width="200px" MaxLength="50"></asp:TextBox>  
                                    </td>
                                    <td></td>
                                </tr>--%>
                                <%--<tr>
                                    <td>
                                        <asp:Label ID="lblValor" runat="server" Text="Valor:"></asp:Label>  
                                    </td>
                                    <td>
                                        <asp:DropDownList ID="ddlValor" runat="server" Width="210px">
                                            <asp:ListItem Text="" Value="-1" Selected="True"></asp:ListItem>
                                        </asp:DropDownList>  
                                    </td>
                                    <td></td>
                                </tr>--%>
                                <%--<tr>
                                    <td class="TituloMant" colspan="3" align="right" >
                                        <asp:Label ID="Label7" runat="server" Text="(Doble click para actualizar un parametro)" Font-Italic="true" ForeColor="Gray"></asp:Label>
                                        <div id="btnAgregarParametro" class="btnNormal" style="width:100px;">
                                            <asp:Image ID="imgAgregarParametro" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                            <asp:Label ID="lblBotonAgregarParametro" runat="server" Text="Agregar"></asp:Label>
                                        </div>                                
                                        <div id="btnQuitarParametro" class="btnNormal" style="width:100px;">
                                            <asp:Image ID="imgQuitarParametro" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png"/>
                                            <asp:Label ID="lblBotonQuitarParametro" runat="server" Text="Quitar"></asp:Label>
                                        </div>                                
                                    </td>
                                </tr>--%>
                                <tr>
                                    <td colspan="3" style="padding-top: 5px;">
                                        <table id="tbParametros"></table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </cc1:ContenedorAccodion>
                    <cc1:ContenedorAccodion Texto="Estados de Aprobación" ID="accEstadosAprobacion">
                        <div id="dvAprobacion" class="dvTab">
                            <table border="0">

                                <tr>
                                    <td>
                                        <cc1:TabJQ ID="tabEstadoAprobacion" runat="server" CssClass="tabs" Style="margin: 0px; padding: 0px;">
                                            <cc1:ContenedorTabJQ ID="tbResponsable" Titulo="Responsable" CssClass="dvTabContenido">
                                                <div id="dvResponsableAprobacion" style="margin: 15px;" class="dvTab">
                                                    <table>
                                                        <tr>
                                                            <td colspan="3" style="font-style: italic;">El responsable será encargado de cambiar una solicitud en estado "Por Aprobar" al estado "Aprobada" o "Rechazada".
                                                            </td>
                                                        </tr>
                                                        <tr style="height: 5px;">
                                                            <td colspan="2"></td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 130px;">Tipo de Aprobación</td>
                                                            <td colspan="2">
                                                                <asp:CheckBox ID="chkRespPropietario" runat="server" Text="Propietario" />
                                                                <asp:CheckBox ID="chkRespUsuario" runat="server" Text="Usuario Específico" />
                                                                <asp:CheckBox ID="chkRespArea" runat="server" Text="Responsable de Área" />
                                                            </td>
                                                            <%--<td>
                                                                <asp:DropDownList ID="ddlTipoAprobacion" runat="server" Width="150px">
                                                                    <asp:ListItem Value="1" Text="Propietario" Selected = "True"></asp:ListItem>
                                                                    <asp:ListItem Value="2" Text="Usuario específico"></asp:ListItem>
                                                                    <asp:ListItem Value="3" Text="Responsable de Área"></asp:ListItem>
                                                                </asp:DropDownList>
                                                            </td>--%>
                                                        </tr>
                                                        <tr id="trUsuarioEspecifico" style="display: none;">
                                                            <td>Usuario</td>
                                                            <td style="width: 260px;" colspan="2">
                                                                <div id="dvContenedorRespUsuario" runat="server" style="float: left;">
                                                                    <uc1:BusquedaPrincipal ID="bpRespUsuario" runat="server" />
                                                                </div>
                                                                <%--<asp:TextBox ID="txtUsuarioEspecifico" runat="server" Width="277px" Enabled="false"></asp:TextBox>--%>
                                                            </td>
                                                            <%--<td>
                                                                <div id="btnEmpleado" class="btnNormal" runat="server">
                                                                    ...
                                                                </div>
                                                            </td>--%>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </cc1:ContenedorTabJQ>
                                            <cc1:ContenedorTabJQ ID="tbUmbralAprobacion" Titulo="Umbrales" CssClass="dvTabContenido">
                                                <div id="dvUmbralAprobacion" style="width: 540px; margin: 15px;" class="dvTab">
                                                    <table>
                                                        <tr>
                                                            <td>

                                                                <table>
                                                                    <tr>
                                                                        <td class="TituloMant">
                                                                            <asp:Label ID="lblMedida" runat="server" Text="Medida de Umbral"></asp:Label>
                                                                        </td>
                                                                        <td>
                                                                            <asp:DropDownList ID="ddlMedidaUmbral" runat="server" Width="210px">
                                                                            </asp:DropDownList>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-style: italic;">Los umbrales de aprobación se harán efecto en el cambio de estado "Por Aprobar" al estado "Aprobada" o "Rechazada".
                                                            </td>
                                                        </tr>
                                                        <tr style="height: 5px;">
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <asp:CheckBox ID="chkUmbralAprobacion" runat="Server" Text="Umbrales de aprobación" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div id="dvUmbralApr" style="display: none;">
                                                                    <table>
                                                                        <tr>
                                                                            <td style="width: 100px;">Valor Objetivo</td>
                                                                            <td style="text-align: left;">
                                                                                <asp:TextBox ID="txtValorObjetivoApr" runat="server" Width="40"></asp:TextBox>
                                                                                <%-- días--%>
                                                                                <asp:Label ID="lblMedida_1" runat="server" Text=""></asp:Label>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Valor Máximo</td>
                                                                            <td>
                                                                                <asp:TextBox ID="txtValorMaximoApr" runat="server" Width="40"></asp:TextBox>
                                                                                <%-- días--%>
                                                                                <asp:Label ID="lblMedida_2" runat="server" Text=""></asp:Label>
                                                                            </td>
                                                                        </tr>
                                                                        <tr style="height: 5px;">
                                                                            <td colspan="2"></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td colspan="2">
                                                                                <table>
                                                                                    <tr>
                                                                                        <td style="font-style: italic;"><span id="lblSemaforoApr1"></span></td>
                                                                                        <td colspan="3" style="margin-left: 10px;">
                                                                                            <img src='../../../Common/Images/Semaforos/Verde.png' /></td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td style="font-style: italic;"><span id="lblSemaforoApr2"></span></td>
                                                                                        <td colspan="3" style="margin-left: 10px;">
                                                                                            <img src='../../../Common/Images/Semaforos/Ambar.png' /></td>
                                                                                    </tr>
                                                                                    <tr style="font-style: normal;">
                                                                                        <td style="font-style: italic;"><span id="lblSemaforoApr3"></span></td>
                                                                                        <td style="margin-left: 10px;">
                                                                                            <img src='../../../Common/Images/Semaforos/Rojo.png' /></td>
                                                                                        <td>
                                                                                            <asp:CheckBox ID="chkEnviarCorreoUmbApr" runat="server" Text="Enviar Correo" /></td>
                                                                                        <td></td>
                                                                                        <%--<td>Enviar Correo</td>--%>

                                                                                          <%--EDGAR GARCIA 24112022 --%>
                                                                                         <td style="width:5px;" > </td>  
                                                                                         <td style="font-style: italic;"> 
                                                                                             
                                                                                              <asp:TextBox ID="TextBox1_1" runat="server" Width="40" disabled="true" MaxLength="4"></asp:TextBox>
                                                                                               <asp:Label ID="lblMedida_5" runat="server" Text=""></asp:Label>
                                                                                              <asp:Label  runat="server" Text=""> antes del valor máximo</asp:Label>
                                                                                         </td>     
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr style="height: 5px;">
                                                                            <td colspan="2"></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td colspan="2">
                                                                                <div id="dvMensajeUmbApr" style="display: none;">
                                                                                    <table>
                                                                                        <tr>
                                                                                            <td style="width: 100px;">
                                                                                                <asp:Label ID="lblCorreoUmbApr" runat="server" Text="Correos"></asp:Label></td>
                                                                                            <td colspan="2">Responsables;<asp:TextBox ID="txtCorreoUmbApr" runat="server" Width="280px" MaxLength="2000"></asp:TextBox></td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <asp:Label ID="lblAsuntoUmbApr" runat="server" Text="Asunto"></asp:Label></td>
                                                                                            <td>
                                                                                                <asp:TextBox ID="txtAsuntoUmbApr" runat="server" Width="355px" MaxLength="100"></asp:TextBox></td>
                                                                                            <td align="right">
                                                                                                <asp:DropDownList ID="ddlParametrosUmbApr" runat="server"></asp:DropDownList>
                                                                                                <div id="btnAgregarAsuntoUmbApr" class="btnNormal" style="float: right;" title="Agregar parámetro">
                                                                                                    <asp:Image ID="Image5" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <asp:Label ID="lblMensajeUmbApr" runat="server" Text="Mensaje"></asp:Label></td>
                                                                                            <td colspan="2">
                                                                                                <asp:TextBox ID="txtMensajeUmbApr_knd" runat="server" CssClass="kendoEditor" MaxLength="5000"></asp:TextBox>
                                                                                                <%--<asp:TextBox ID="txtMensajeUmbApr" runat="server" TextMode="MultiLine" Height="100px" width="500px" MaxLength="8000"></asp:TextBox>--%>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </cc1:ContenedorTabJQ>
                                            <cc1:ContenedorTabJQ ID="tbReglaAprobacion" Titulo="Reglas" CssClass="dvTabContenido">
                                                <div id="dvReglaAprobacion" style="width: 540px; margin: 15px;" class="dvTab">
                                                    <table width="100%">
                                                        <tr>
                                                            <td colspan="2">Seleccione reglas de aprobación por cada estado inicial.
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 120px;">Estado Inicial</td>
                                                            <td>
                                                                <asp:DropDownList ID="ddlEstadoIniReglaApr" runat="server"></asp:DropDownList>
                                                                <asp:Label ID="lblEstadoIniReglaAprMensaje" runat="server" ForeColor="Red" Font-Bold="False" Font-Italic="True"></asp:Label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">
                                                                <div class="ui-widget-content ui-helper-clearfix" style="margin: 0.6em .0em; height: 0.001em;"></div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Estado Automático</td>
                                                            <td>
                                                                <asp:CheckBox ID="chkEstadoAutomaticoApr" runat="server" /></td>
                                                        </tr>
                                                        <tr id="trReglaAprogacionCombo">
                                                            <td>Estado Final</td>
                                                            <td>
                                                                <asp:DropDownList ID="ddlEstadoFinReglaApr" runat="server"></asp:DropDownList>
                                                                <asp:Label ID="lblEstadoFinReglaAprMensaje" runat="server" ForeColor="Red" Font-Bold="False" Font-Italic="True"></asp:Label>
                                                            </td>
                                                        </tr>
                                                        <tr id="trReglaAprobacionLabel" style="height: 30px; vertical-align: bottom;">
                                                            <td colspan="2" style="font-style: italic;"><span id="lblMensajeEstApr"></span></td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </cc1:ContenedorTabJQ>
                                            <cc1:ContenedorTabJQ ID="tbMensajeAprobacion" Titulo="Mensaje" CssClass="dvTabContenido MsjApr">
                                                <div id="dvMensajeAprobacion" style="margin: 15px;" class="dvTab">
                                                    <table width="100%">
                                                        <tr>
                                                            <td colspan="2">Configure mensajes para cada estado.
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="TituloMant">
                                                                <asp:Label ID="lblEstadoAprobacion" runat="server" Text="Estados"></asp:Label>
                                                            </td>
                                                            <td colspan="2">
                                                                <asp:DropDownList ID="ddlEstadoAprobacion" runat="server" Width="210px"></asp:DropDownList>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">
                                                                <div class="ui-widget-content ui-helper-clearfix" style="margin: 0.6em .0em; height: 0.001em;"></div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="TituloMant">
                                                                <asp:Label ID="lblEnviarCorreoApr" runat="server" Text="Enviar Correo"></asp:Label>
                                                            </td>
                                                            <td class="ValorMant">
                                                                <asp:CheckBox ID="chkEnviarCorreoApr" runat="server"></asp:CheckBox>
                                                            </td>
                                                        </tr>
                                                        <tr style="height: 5px;">
                                                            <td colspan="2"></td>
                                                        </tr>
                                                    </table>
                                                    <div id="divCorreoAprobacion">
                                                        <table>
                                                            <tr>
                                                                <td colspan="3">
                                                                    <asp:Label ID="lblEnvioDeCorreoApr" runat="server" Text="Este mensaje será enviado cada vez que se cree una solicitud." Font-Italic="True"></asp:Label>
                                                                </td>
                                                            </tr>
                                                            <tr class="trAdjunto" style="display:none;">
                                                                 <td style="width: 80px;height:30px;">Adjuntar</td><td colspan="2"><div id="dvAdjuntosApr"></div></td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 80px;">
                                                                    <asp:Label ID="lblCorreoApr" runat="server" Text="Correos"></asp:Label></td>
                                                                <td style="width: 300px;">
                                                                    <asp:TextBox ID="txtCorreoApr" runat="server" Width="290" MaxLength="2000"></asp:TextBox></td>
                                                                <td style="text-align: left;">
                                                                    <asp:CheckBox ID="chkPropietarioCorApr" Text="Propietario" runat="server" />
                                                                    <asp:CheckBox ID="chkUsuarioEspecificoCorApr" Text="Usuario Específico" runat="server" />
                                                                    <asp:CheckBox ID="chkAreaCorApr" Text="Responsable de Área" runat="server" />
                                                                    <asp:CheckBox ID="chkTecnicoCorApr" Text="Especialista de la Solicitud" runat="server" />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <asp:Label ID="lblAsuntoApr" runat="server" Text="Asunto"></asp:Label></td>
                                                                <td>
                                                                    <asp:TextBox ID="txtAsuntoApr" runat="server" Width="290px" MaxLength="100"></asp:TextBox></td>
                                                                <td align="right">
                                                                    <table>
                                                                        <tr>
                                                                            <td>
                                                                                <ttgInfo:ToolTipGenerico ID="ttgInfoParametro_Apr" runat="server" />
                                                                            </td>
                                                                            <td>
                                                                                <asp:DropDownList ID="ddlParametrosApr" runat="server" Width="200px"></asp:DropDownList>&nbsp;
                                                                                <div id="btnAgregarAsuntoApr" class="btnNormal" style="float: right;" title="Agregar parámetro">
                                                                                    <asp:Image ID="imgAgregarAsuntoApr" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td valign="top">
                                                                    <asp:Label ID="lblMensajeApr" runat="server" Text="Mensaje"></asp:Label></td>
                                                                <td colspan="2">
                                                                    <asp:TextBox ID="txtMensajeApr_knd" runat="server" CssClass="kendoEditor" MaxLength="5000"></asp:TextBox>
                                                                    <%--<asp:TextBox ID="txtMensajeApr" runat="server" TextMode="MultiLine" Height="100px" MaxLength="8000"></asp:TextBox>--%>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                            </cc1:ContenedorTabJQ>
                                        </cc1:TabJQ>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </cc1:ContenedorAccodion>
                    <cc1:ContenedorAccodion Texto="Estados de Proceso" ID="accEstadosProceso">
                        <div id="dvProceso" class="dvTab">
                            <table>
                                <tr>
                                    <td class="TituloMant">
                                        <asp:Label ID="lblEstadoProceso" runat="server" Text="Estados de Proceso"></asp:Label>
                                    </td>
                                    <td>
                                        <table>
                                            <tr>
                                                <td>
                                                    <asp:DropDownList ID="ddlEstadoProceso" runat="server" Width="210px"></asp:DropDownList>
                                                    <asp:Label ID="lblEstadoIniReglaProMensaje" runat="server" ForeColor="Red" Font-Bold="False"
                                                        Font-Italic="True"></asp:Label>
                                                </td>
                                                <td>
                                                    <ttgInfo:ToolTipGenerico ID="ttgInfoEstado" runat="server" />
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <%--<td>
                                    <asp:DropDownList ID="ddlEstadoProceso" runat="server" Width="210px"></asp:DropDownList>
                                    <asp:Label ID="lblEstadoIniReglaProMensaje" runat="server" ForeColor="Red" Font-Bold="False" Font-Italic="True"></asp:Label>
                                </td>--%>
                                </tr>

                                <tr>
                                    <td class="TituloMant">
                                        <asp:Label ID="lblEnviarCorreoPro" runat="server" Text="Enviar Correo"></asp:Label>
                                    </td>
                                    <td class="ValorMant">
                                        <asp:CheckBox ID="chkEnviarCorreoPro" runat="server"></asp:CheckBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <cc1:TabJQ ID="tabEstadoProceso" runat="server" CssClass="tabs" Style="margin: 0px; padding: 0px;">
                                            <cc1:ContenedorTabJQ ID="tbCampo" Titulo="Campos" CssClass="dvTabContenido">
                                                <div id="dvCamposProceso" style="margin: 15px;" class="dvTab dvProceso">
                                                    <table>
                                                        <tr>
                                                            <td colspan="2">
                                                                <asp:Label ID="lblMsjCamEstPro" runat="server" Text="Esta configuración se verá reflejada solo cuando se cree la solicitud o cuando esta se encuentre en estado de aprobación 'Pendiente'." Font-Italic="True"></asp:Label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">
                                                                <table id="tbCamposEstadoProceso"></table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </cc1:ContenedorTabJQ>
                                            <cc1:ContenedorTabJQ ID="tbUmbralProceso" Titulo="Umbrales" CssClass="dvTabContenido">
                                                <div id="dvUmbralProceso" style="width: 540px; margin: 15px;" class="dvTab">
                                                    <table>
                                                        <tr>
                                                            <td class="TituloMant">
                                                                <asp:Label ID="lblMedida2" runat="server" Text="Medida de Umbral"></asp:Label>
                                                            </td>
                                                            <td>
                                                                <table>
                                                                    <tr>
                                                                        <td>
                                                                            <asp:DropDownList ID="ddlMedidaUmbral2" runat="server" Width="210px"></asp:DropDownList>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <br />
                                                    <table>

                                                        <tr>
                                                            <td style="font-style: italic;">
                                                                <div id="msjUmbProPendiente">Los umbrales de proceso se harán efecto en el cambio de estado "Pendiente" al estado "En Proceso".</div>
                                                                <div id="msjUmbProEnProceso" style="display: none;">Los umbrales de proceso se harán efecto en el cambio de estado "En Proceso" al estado "Culminada" o "Anulada".</div>
                                                                <div id="msjUmbProCulminada_Anulada" style="display: none;">Los estados "Culminada" y "Anulada" no tiene umbrales de proceso.</div>
                                                            </td>
                                                        </tr>
                                                        <tr style="height: 5px;">
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <asp:CheckBox ID="chkUmbralProceso" runat="Server" Text="Umbrales de Cambios de Estado" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div id="dvUmbralPro" style="display: none;">
                                                                    <table>
                                                                        <tr>
                                                                            <td style="width: 100px;">Valor Objetivo</td>
                                                                            <td>
                                                                                <asp:TextBox ID="txtValorObjetivoPro" runat="server" Width="40"></asp:TextBox>
                                                                                <asp:Label ID="lblMedida_3" runat="server" Text=""></asp:Label>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Valor Máximo</td>
                                                                            <td>
                                                                                <asp:TextBox ID="txtValorMaximoPro" runat="server" Width="40"></asp:TextBox>
                                                                                <asp:Label ID="lblMedida_4" runat="server" Text=""></asp:Label>
                                                                            </td>
                                                                        </tr>
                                                                        <tr style="height: 5px;">
                                                                            <td colspan="2"></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td colspan="2">
                                                                                <table>
                                                                                    <tr>
                                                                                        <td style="font-style: italic;"><span id="lblSemaforoPro1"></span></td>
                                                                                        <td colspan="3">
                                                                                            <img src='../../../Common/Images/Semaforos/Verde.png' /></td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td style="font-style: italic;"><span id="lblSemaforoPro2"></span></td>
                                                                                        <td colspan="3">
                                                                                            <img src='../../../Common/Images/Semaforos/Ambar.png' /></td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td style="font-style: italic;"><span id="lblSemaforoPro3"></span></td>
                                                                                        <td>
                                                                                            <img src='../../../Common/Images/Semaforos/Rojo.png' /></td>
                                                                                        <td>
                                                                                            <asp:CheckBox ID="chkEnviarCorreoUmbPro" runat="server" Text="Enviar Correo" /></td>
                                                                                        <%--EDGAR GARCIA 21112022 --%>
                                                                                         <td style="width:5px;" > </td>  
                                                                                         <td style="font-style: italic;"> 
                                                                                             
                                                                                              <asp:TextBox ID="TextBox6" runat="server" Width="40" disabled="true" MaxLength="4" ></asp:TextBox>
                                                                                               <asp:Label ID="Label6" runat="server" Text="" ></asp:Label>
                                                                                              <asp:Label  runat="server" Text=""> antes del valor máximo</asp:Label>
                                                                                         </td>    

                                                                                        <td style="font-style: normal;"></td>

                                                                                        <%--<td style="font-style:normal;">Enviar Correo</td>--%>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr style="height: 5px;">
                                                                            <td colspan="2"></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td colspan="2">
                                                                                <div id="dvMensajeUmbPro" style="display: none;">
                                                                                    <table>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <asp:Label ID="lblCorreoUmbPro" runat="server" Text="Correos"></asp:Label></td>
                                                                                            <td colspan="2">Especialista;
                                                                                                <asp:TextBox ID="txtCorreoUmbPro" runat="server" Width="302px" MaxLength="2000"></asp:TextBox></td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <asp:Label ID="lblAsuntoUmbPro" runat="server" Text="Asunto"></asp:Label></td>
                                                                                            <td>
                                                                                                <asp:TextBox ID="txtAsuntoUmbPro" runat="server" Width="355px" MaxLength="100"></asp:TextBox></td>
                                                                                            <td align="right">
                                                                                                <asp:DropDownList ID="ddlParametrosUmbPro" runat="server" Width="200px"></asp:DropDownList>&nbsp;
                                                                                        <div id="btnAgregarAsuntoUmbPro" class="btnNormal" style="float: right;" title="Agregar parámetro">
                                                                                            <asp:Image ID="Image6" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                                                        </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <asp:Label ID="lblMensajeUmbPro" runat="server" Text="Mensaje"></asp:Label></td>
                                                                                            <td colspan="2">
                                                                                                <asp:TextBox ID="txtMensajeUmbPro_knd" runat="server" CssClass="kendoEditor" MaxLength="5000"></asp:TextBox>
                                                                                                <%--<asp:TextBox ID="txtMensajeUmbPro" runat="server" TextMode="MultiLine" Height="100px" width="500px" MaxLength="8000"></asp:TextBox>--%>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </cc1:ContenedorTabJQ>
                                            <cc1:ContenedorTabJQ ID="tbReglaProceso" Titulo="Reglas" CssClass="dvTabContenido">
                                                <div id="dvReglaProceso" style="width: 540px; margin: 15px;" class="dvTab">
                                                    <table>
                                                        <tr>
                                                            <td style="width: 120px;">Estado Automático</td>
                                                            <td>
                                                                <asp:CheckBox ID="chkEstadoAutomaticoPro" runat="server" /></td>
                                                        </tr>
                                                        <tr id="trReglaProcesoCombo">
                                                            <td>Estado Final</td>
                                                            <td>
                                                                <asp:DropDownList ID="ddlEstadoFinReglaPro" runat="server"></asp:DropDownList></td>
                                                        </tr>
                                                        <tr id="trReglaProcesoLabel">
                                                            <td colspan="2" style="font-style: italic; height: 25px; vertical-align: bottom;"><span id="lblMensajeEstPro"></span></td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </cc1:ContenedorTabJQ>
                                            <cc1:ContenedorTabJQ ID="tbMensajeProceso" Titulo="Mensaje" CssClass="dvTabContenido">
                                                <div id="dvMensajeProceso" style="margin: 15px;" class="dvTab">
                                                    <table>
                                                        <tr>
                                                            <td colspan="3">
                                                                <asp:Label ID="lblEnvioDeCorreoPro" runat="server" Text="Este mensaje será enviado cada vez que se cree una solicitud." Font-Italic="True"></asp:Label>
                                                            </td>
                                                        </tr>
                                                        <tr class="trAdjunto" style="display:none;">
                                                            <td style="width: 80px;height:30px;">Adjuntar</td><td colspan="2"><div id="dvAdjuntosPro"></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <asp:Label ID="lblCorreoPro" runat="server" Text="Correos"></asp:Label></td>
                                                            <td style="width: 300px;">
                                                                <asp:TextBox ID="txtCorreoPro" runat="server" Width="290px" MaxLength="2000"></asp:TextBox></td>
                                                            <td style="text-align: left;">
                                                                <asp:CheckBox ID="chkPropietarioCorPro" Text="Propietario" runat="server" />
                                                                <asp:CheckBox ID="chkUsuarioEspecificoCorPro" Text="Usuario Específico" runat="server" />
                                                                <asp:CheckBox ID="chkAreaCorPro" Text="Responsable de Área" runat="server" />
                                                                <asp:CheckBox ID="chkTecnicoCorPro" Text="Especialista de solicitud" runat="server" />
                                                                <asp:CheckBox ID="chkTecnicos" Text="Especialistas" runat="server" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <asp:Label ID="lblAsuntoPro" runat="server" Text="Asunto"></asp:Label></td>
                                                            <td>
                                                                <asp:TextBox ID="txtAsuntoPro" runat="server" Width="290px" MaxLength="100"></asp:TextBox></td>
                                                            <td align="right">
                                                                <table>
                                                                    <tr>
                                                                        <td>
                                                                            <ttgInfo:ToolTipGenerico ID="ttgInfoParametro" runat="server" />
                                                                        </td>
                                                                        <td>
                                                                            <asp:DropDownList ID="ddlParametrosPro" runat="server" Width="200px"></asp:DropDownList>&nbsp;
                                                                        <div id="btnAgregarAsuntoPro" class="btnNormal" style="float: right;" title="Agregar parámetro">
                                                                            <asp:Image ID="imgAgregarAsuntoPro" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                                        </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <asp:Label ID="lblMensajePro" runat="server" Text="Mensaje"></asp:Label></td>
                                                            <td colspan="2">
                                                                <asp:TextBox ID="txtMensajePro_knd" runat="server" CssClass="kendoEditor" MaxLength="5000"></asp:TextBox>
                                                                <%--<asp:TextBox ID="txtMensajePro" runat="server" TextMode="MultiLine" Height="100px" MaxLength="8000"></asp:TextBox>--%>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </cc1:ContenedorTabJQ>


                                            <cc1:ContenedorTabJQ ID="tbActualizarProceso" Titulo="Actualizar" CssClass="dvTabContenido">



                                                <div id="dvActualizarProceso" style="width: 540px;" class="dvTab" runat="server">
                                                    <table width="100%" border="0">

                                                        <tr id="tr4" runat="server" style="">
                                                            <td colspan="2">
                                                                <div id="div4" runat="server" class="dvPanel">
                                                                    <table width="100%" border="0">
                                                                        <tr>
                                                                            <td style="width: 160px">Campo Solicitud</td>
                                                                            <td style="width: 150px">
                                                                                <asp:DropDownList ID="ddlCampoSolicitudOrigen" runat="server" Width="200px">
                                                                                    <asp:ListItem Value=""><Seleccione></asp:ListItem>
                                                                                    <asp:ListItem Value="F_vcCodEmp">Id Empleado</asp:ListItem>
                                                                                    <asp:ListItem Value="F_vcNumLin">Línea</asp:ListItem>
                                                                                    <asp:ListItem Value="F_inCodModDis">Id Modelo Dispositivo</asp:ListItem>
                                                                                    <asp:ListItem Value="P_inCodSol">Id Solicitud</asp:ListItem>
                                                                                    <asp:ListItem Value="vcCodigo">Código Solicitud</asp:ListItem>
                                                                                    <asp:ListItem Value="F_vcCodDis">Id Dispositivo</asp:ListItem>
                                                                                    <asp:ListItem Value="vcDesSol">Descripción Solicitud</asp:ListItem>
                                                                                    <asp:ListItem Value="F_vcCodPlan">Cod. Plan</asp:ListItem>
                                                                                    <asp:ListItem Value="dcMonto">Monto</asp:ListItem>
                                                                                    <asp:ListItem Value="vcResponsable">Id Responsable</asp:ListItem>
                                                                                    <asp:ListItem Value="inTecnicoAsignado">Id Especialista Asignado</asp:ListItem>
                                                                                    <asp:ListItem Value="daFechaPendienteApr">Fecha - Pendiente Aprobación</asp:ListItem>
                                                                                    <asp:ListItem Value="daFechaPorAprobarApr">Fecha - Por Aprobar</asp:ListItem>
                                                                                    <asp:ListItem Value="daFechaAprobadaApr">Fecha - Aprobado</asp:ListItem>
                                                                                    <asp:ListItem Value="daFechaRechazadaApr">Fecha - Rechazado</asp:ListItem>
                                                                                    <asp:ListItem Value="daFechaPendientePro">Fecha - Pendiente Proceso</asp:ListItem>
                                                                                    <asp:ListItem Value="daFechaEnProcesoPro">Fecha - En Proceso</asp:ListItem>
                                                                                    <asp:ListItem Value="daFechaCulminadaPro">Fecha - Culminado</asp:ListItem>
                                                                                    <asp:ListItem Value="daFechaAnuladaPro">Fecha - Anulado</asp:ListItem>
                                                                                    <asp:ListItem Value="FechaDespacho">Fecha - Despacho</asp:ListItem>
                                                                                </asp:DropDownList>
                                                                            </td>
                                                                            <td style="text-align: right; width: 150px;"></td>
                                                                            <td></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="width: 100px">Entidad (Destino)</td>
                                                                            <td style="width: 150px">
                                                                                <asp:DropDownList ID="ddlEntidadReferenciaDestino" runat="server" Width="200px"></asp:DropDownList>
                                                                            </td>
                                                                            <td style="text-align: right; width: 150px;">Atributo a actualizar </td>
                                                                            <td>
                                                                                <asp:DropDownList ID="ddlCampoEntidadDestino" runat="server" Width="200px">
                                                                                    <asp:ListItem Value="-2">Seleccione Entidad</asp:ListItem>
                                                                                </asp:DropDownList>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td colspan="4">
                                                                                <div class="ui-widget-content ui-helper-clearfix" style="margin: 0.6em .0em; height: 0.001em;"></div>
                                                                                <b>Condiciones</b>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td colspan="4" id="tdCondicionesDestino"></td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="right">
                                                                <asp:Label ID="lblMsjGrillaCamposDestino" runat="server" Text="" Font-Italic="true" ForeColor="Gray"></asp:Label>
                                                                <div id="btnAgregarDestino" class="btnNormal" style="width: 100px;">
                                                                    <asp:Image ID="imgAgregarDestino" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                                    <%--<a>Agregar</a>--%>
                                                                    <asp:Label ID="lblBotonAgregarDestino" runat="server" Text="Agregar"></asp:Label>
                                                                </div>
                                                                <div id="btnQuitarDestino" class="btnNormal" style="width: 100px;">
                                                                    <asp:Image ID="imgQuitarDestino" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                                                    <%--<a>Quitar</a>--%>
                                                                    <asp:Label ID="lblBotonQuitarDestino" runat="server" Text="Quitar"></asp:Label>
                                                                </div>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">
                                                                <table id="tbCamposDestino"></table>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                    </table>
                                                </div>



                                            </cc1:ContenedorTabJQ>



                                        </cc1:TabJQ>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </cc1:ContenedorAccodion>
                    <cc1:ContenedorAccodion ID="accEnvioCorreoOperador" Texto="Envío Correo Operador">
                        <table width="100%">
                            <tr>
                                <td colspan="2">Configure mensaje para el envío al operador.
                                </td>
                            </tr>
                            <tr>
                                <td class="TituloMant">Operador</td>
                                <td>
                                    <asp:DropDownList ID="ddlOperadorEnvio" runat="server"></asp:DropDownList>
                                    <asp:HiddenField ID="hdfIdMensajeOperador" runat="server" />
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div class="ui-widget-content ui-helper-clearfix" style="margin: 0.6em .0em; height: 0.001em;"></div>
                                </td>
                            </tr>
                            <tr>
                                <td>Enviar Correo</td>
                                <td>
                                    <asp:CheckBox ID="chkOperadorEnvio" runat="server" Enabled="false" />
                                </td>
                            </tr>
                        </table>

                        <table id="tbCorreoEnvioOperador" width="100%" style="display: none; margin-top: 10px;">
                            <tr>
                                <td colspan="3">
                                    <asp:Label ID="lblEnvioOperadorDetalle" runat="server" Text="Este correo se enviará cuando se ejecute la acción Enviar al Operador"></asp:Label>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 80px;">Tipo Mensaje</td>
                                <td colspan="2">
                                    <asp:DropDownList ID="ddlTipoMensaje" runat="server">
                                        <asp:ListItem Value="1" Text="Texto"></asp:ListItem>
                                        <asp:ListItem Value="2" Text="Archivo adjuntos"></asp:ListItem>
                                    </asp:DropDownList>
                                    <asp:Label ID="lblAdjuntoOperadorExtensiones" runat="server"></asp:Label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblCorreoEnvOper" runat="server" Text="Destinatario"></asp:Label></td>
                                <td style="width: 300px;">
                                    <asp:TextBox ID="txtCorreoEnvOper" runat="server" Width="290" MaxLength="2000"></asp:TextBox></td>
                                <td style="text-align: left;">
                                    <asp:CheckBox ID="chkUsuarioLogueado" runat="server" Text="Usuario Logueado" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:Label ID="lblAsuntoEnvOper" runat="server" Text="Asunto"></asp:Label></td>
                                <td>
                                    <asp:TextBox ID="txtAsuntoEnvOper" runat="server" Width="290" MaxLength="100"></asp:TextBox></td>
                                <td align="right">
                                    <table>
                                        <tr id="trParametros_EnvOper">
                                            <td>
                                                <ttgInfo:ToolTipGenerico ID="ttgInfoParametros_EnvOper" runat="server" />
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlParametrosEnvOper" runat="server" Width="200px"></asp:DropDownList>&nbsp;
                                                <div id="btnAgregarParametroEnvOper" class="btnNormal" style="float: right;" title="Agregar parámetro">
                                                    <asp:Image ID="Image7" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr id="tdTipoTexto">
                                <td>Mensaje</td>
                                <td colspan="2">
                                    <asp:TextBox ID="txtMensajeEnvioOper" runat="server" CssClass="kendoEditor"></asp:TextBox>
                                </td>
                            </tr>
                            <tr id="tdTipoAdjunto" style="display: none;">
                                <td>Adjuntar Archivo</td>
                                <td colspan="2">
                                    <asp:HiddenField ID="hdfArchivoCorreoOper" runat="server" />
                                    <asp:HiddenField ID="hdfExtensionCorreoper" runat="server" />
                                    <div class="UploadDiv" style="display: inline-block; float: left;">
                                        <div id="UploadStatus_EnvOper"></div>
                                        <div id="UploadButton_EnvOper" align="center" class="imgBtn" style="text-align: left;">
                                            <table>
                                                <tr>
                                                    <td style="text-align: left;">
                                                        <img alt="" src="../../../Common/Images/Mantenimiento/SubirArchivo.png" width="16px" height="16px" />
                                                    </td>
                                                    <td style="vertical-align: bottom; text-decoration: underline; cursor: pointer;">Adjuntar Archivo</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div id="UploadedFile_EnvOper"></div>
                                    </div>
                                    <%--<div style="float:left; vertical-align:bottom; margin-top:3px;" id="dvExtensiones">
                                        <table>
                                            <tr>
                                                <td style="text-align:left; font-style: italic;">
                                                  (Extensiones Permitidas: txt, doc, docx, xls, xlsx, pdf, jpg, png)
                                                </td>
                                            </tr>
                                        </table>
                                    </div>--%>
                                    <%--<div id="Div6" style="float:left; display:none; vertical-align:bottom; margin-top:3px;">
                                        <ttgInfo:ToolTipGenerico ID="ToolTipGenerico1" runat="server" />
                                    </div>--%>
                                </td>
                            </tr>
                        </table>
                    </cc1:ContenedorAccodion>
                </cc1:AccordionJQ>
            </div>
            <br />
            <div id="Div1" style="margin-top: 5px; text-align: left;">
                <div id="btnGuardar" class="btnNormal">
                    <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                    <a>Guardar</a>
                </div>
                <div id="btnCerrar" class="btnNormal">
                    <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    <a>Cancelar</a>
                </div>
            </div>
        </div>
        <div id="divInfoFinanciamiento" style="display: none; overflow: hidden;">
            <iframe id="ifInfoFinanciamiento" runat="server" style="margin: 0px; padding: 0px;" frameborder="0"></iframe>
        </div>
        <div id="dvArea" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifArea" width="730" height="470" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
        </div>
        <div id="dvSolicitudSistema" runat="server" style="display: none;">
            <div>
                Tipo de Solicitud: 
                <asp:Label ID="lblTipoSolicitud" runat="server"></asp:Label>
            </div>
            <table id="tbDetCaptura">
                <tr>
                    <td>Titulo</td>
                    <td align="center">Obligatorio</td>
                    <td align="center">Activo</td>
                </tr>
            </table>
            <div id="Div2" style="margin-top: 5px; text-align: left;">
                <div id="btnGuardarSistema" class="btnNormal">
                    <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                    <a>Guardar</a>
                </div>
                <div id="btnCerrarSistema" class="btnNormal">
                    <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    <a>Cancelar</a>
                </div>
            </div>
        </div>
        <div id="divMsgConfirmQuitarCampo" style="display: none;">
            <%--<span class="ui-icon ui-icon-alert" style="float:left;"></span>--%>
            <%--Este campo está siendo usado como parámetro, se eliminará el parámetro asociado a este campo y deberá revisar la configuración de mensajes y eliminar manualmente el parámetro que se va a eliminar.--%>
            Este campo está siendo usado como parámetro; al eliminarlo o desactivarlo, también se desactivará el parámetro relacionado por lo que deberá modificar la configuración de mensajes.
            <br />
            <br />
            ¿Desea eliminar de todos modos?
        </div>
        <div id="divMsgConfirmQuitarCampoDestino" style="display: none;">
            <%--<span class="ui-icon ui-icon-alert" style="float:left;"></span>--%>
            <%--Este campo está siendo usado como parámetro, se eliminará el parámetro asociado a este campo y deberá revisar la configuración de mensajes y eliminar manualmente el parámetro que se va a eliminar.--%>
            <br />
            ¿Desea eliminar?
        </div>
        <div id="divValorCondicion" style="display: none;">
            <table width="100%">
                <tr>
                    <td colspan="2">
                        <label>Elija entre un valor estático, dinámico o un campo de la soliciud para la condición </label>
                        <label id="lblMsjSelecValor"></label>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="padding-top: 15px;">
                        <input type="radio" id="rbtCampoTipSol" name="rbtTipoValor" value="3" checked="checked" />
                        <label for="rbtCampoTipSol">Campo de la Solicitud</label>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 40px">Campo
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlCampoTipSol" runat="server" Width="210px">
                            <asp:ListItem Text="" Value="-1" Selected="True"></asp:ListItem>
                        </asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="padding-top: 15px;">
                        <input type="radio" id="rbtValorEstatico" name="rbtTipoValor" value="1" />
                        <label for="rbtValorEstatico">Valor Estátitico</label>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 40px; margin-left: 40px; border-left: 40px;">Valor   
                    </td>
                    <td>
                        <asp:TextBox ID="txtValorEstatico" runat="server" Width="200px" disabled="true"></asp:TextBox>
                    </td>
                    <%--<tr>
                    <td colspan="2" style="padding-top:15px;">
                        Si el "Campo Entidad" es una entidad relacionada a una tabla, deberá ingresar el código correspondiente, si no conoce el códgio, prueba terminar la condición usando la opción "Valor Dinámico"
                    </td>
                </tr>--%>
                </tr>
                <tr>
                    <td colspan="2">
                        <label id="lblMsjValorEstatico"></label>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="padding-top: 15px;">
                        <input type="radio" id="rbtValorDinamico" name="rbtTipoValor" value="2" />
                        <label for="rbtValorDinamico">Valor Dinámico</label>
                        &nbsp;&nbsp;<label id="lblEntidadRelacionada"></label>
                    </td>
                </tr>
                <tr style="display: none">
                    <td style="padding-left: 40px; margin-left: 40px; border-left: 40px;">Entidad
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlEntidadRelacion" runat="server" Width="210px" disabled="true"></asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 40px; margin-left: 40px; border-left: 40px;">Campo
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlCampoRelacion" runat="server" Width="210px" disabled="true"></asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 40px; margin-left: 40px; border-left: 40px;">Valor
                    </td>
                    <td>
                        <asp:TextBox ID="txtValorCampoRelacion" runat="server" Width="200px" disabled="true"></asp:TextBox>
                        <asp:HiddenField ID="hdfValorCampoRelacion" runat="server" />
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="right" style="padding-top: 25px;">
                        <div id="btnAgregarValorCondicion" class="btnNormal">
                            <%--<asp:Image ID="imgAceptarVC" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />--%>
                            <asp:Label ID="lblBtnAceptarCondicion" runat="server" Text="Aceptar"></asp:Label>
                        </div>
                        <div id="btnCancelarValorCondicion" class="btnNormal">
                            <%--<asp:Image ID="imgCancelarVC" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />--%>
                            <asp:Label ID="lblBtnCancelarCondicion" runat="server" Text="Cancelar"></asp:Label>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="divValorCondicionDestino" style="display: none;">
            <table width="100%">
                <tr>
                    <td colspan="2">
                        <label>Elija entre un valor estático, dinámico o un campo de la soliciud para la condición </label>
                        <label id="lblMsjSelecValorDestino"></label>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="padding-top: 15px;">
                        <input type="radio" id="rbtCampoTipSolDestino" name="rbtTipoValorDestino" value="3" checked="checked" />
                        <label for="rbtCampoTipSolDestino">Campo de la Solicitud</label>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 40px">Campo
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlCampoTipSolDestino" runat="server" Width="210px">
                            <asp:ListItem Text="" Value="-1" Selected="True"></asp:ListItem>
                        </asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="padding-top: 15px;">
                        <input type="radio" id="rbtValorEstaticoDestino" name="rbtTipoValorDestino" value="1" />
                        <label for="rbtValorEstaticoDestino">Valor Estátitico</label>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 40px; margin-left: 40px; border-left: 40px;">Valor   
                    </td>
                    <td>
                        <asp:TextBox ID="txtValorEstaticoDestino" runat="server" Width="200px" disabled="true"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <label id="lblMsjValorEstaticoDestino"></label>
                    </td>
                </tr>
                <%--<tr>
                    <td colspan="2" style="padding-top: 15px;">
                        <input type="radio" id="rbtValorDinamicoDestino" name="rbtTipoValorDestino" value="2" />
                        <label for="rbtValorDinamicoDestino">Valor Dinámico</label>
                        &nbsp;&nbsp;<label id="lblEntidadRelacionadaDestino"></label>
                    </td>
                </tr>
                <tr style="display: none">
                    <td style="padding-left: 40px; margin-left: 40px; border-left: 40px;">Entidad
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlEntidadRelacionDestino" runat="server" Width="210px" disabled="true"></asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 40px; margin-left: 40px; border-left: 40px;">Campo
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlCampoRelacionDestino" runat="server" Width="210px" disabled="true"></asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left: 40px; margin-left: 40px; border-left: 40px;">Valor
                    </td>
                    <td>
                        <asp:TextBox ID="txtValorCampoRelacionDestino" runat="server" Width="200px" disabled="true"></asp:TextBox>
                        <asp:HiddenField ID="hdfValorCampoRelacionDestino" runat="server" />
                    </td>
                </tr>--%>
                <tr>
                    <td colspan="2" align="right" style="padding-top: 25px;">
                        <div id="btnAgregarValorCondicionDestino" class="btnNormal">
                            <asp:Label ID="Label4" runat="server" Text="Aceptar"></asp:Label>
                        </div>
                        <div id="btnCancelarValorCondicionDestino" class="btnNormal">
                            <asp:Label ID="Label5" runat="server" Text="Cancelar"></asp:Label>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="dvConfirmacionDevolucion" style="display: none;">
            Algunas solicitudes generarán conflictos si se realiza este cambio.<br />
            Solicitudes afectadas :
            <label id="lblSolicitudDevolucion"></label>
            <br />
            <br />
            Para continuar con el cambio deberá devolver todas la solicitudes al estado de Aprobación <b>Pendiente</b> y al estado de Proceso <b>Pendiente</b>.
            <br />
            <br />
            ¿Desea continuar con el cambio?
        </div>
        <div id="dvEnvioCorreoDevolucion" style="display: none;">
            <cc1:TabJQ ID="tabCorreoDevolucion" runat="server" CssClass="tabs" Style="margin: 0px; padding: 0px;">
                <cc1:ContenedorTabJQ ID="tbListaSolAfec" Titulo="Lista" CssClass="dvTabContenido" Width="500" Height="300">
                    <table>
                        <tr>
                            <td style="padding-top: 7px;">
                                <label>
                                    Busqueda por Codigo/Nombre Empl:
                                </label>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <asp:TextBox ID="txtBusquedaSolDev" runat="server" Width="265"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-top: 7px;">
                                <table id="tblSolicitudesAfectadas">
                                </table>
                                <div id="pagerSolDev"></div>
                            </td>
                        </tr>
                    </table>
                </cc1:ContenedorTabJQ>
                <cc1:ContenedorTabJQ ID="tbParametrosCorDev" Titulo="Parámetros" CssClass="dvTabContenido" Width="500" Height="300">
                    <table>
                        <tr>
                            <td style="padding-bottom: 7px; padding-top: 7px;">
                                <asp:Label ID="lblInfoParamCorDev" runat="server"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table id="tblParametrosCorDev">
                                </table>
                            </td>
                        </tr>
                    </table>
                </cc1:ContenedorTabJQ>
                <cc1:ContenedorTabJQ ID="tbMensajeCorDev" Titulo="Mensaje" CssClass="dvTabContenido" Width="490" Height="300">
                    <table width="100%">
                        <tr>
                            <td>
                                <asp:DropDownList ID="ddlTipoDestinatario" runat="server"></asp:DropDownList>
                            </td>
                            <td style="padding-bottom: 7px; padding-top: 7px;" align="right">
                                <asp:CheckBox ID="chkEnvioCorDev" runat="server" Checked="true"
                                    Text="Enviar correo" />
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 120px;">Destinatarios:</td>
                            <td>
                                <%--<asp:TextBox ID="txtDestinatariosCorDev" runat="server" Width="340" ReadOnly="true"
                                Text="{CorreoEmpleado}"></asp:TextBox>--%>
                                <label id="lblchkPropietario">
                                    <input type="checkbox" id="chkPropietario" style="display: none;" />Propietario</label>
                                <label id="lblchkRespAprobacion">
                                    <input type="checkbox" id="chkRespAprobacion" style="display: none;" />Resp. Aprobación</label>
                                <label id="lblchkTecAsignado">
                                    <input type="checkbox" id="chkTecAsignado" />Téc. Asignado</label>
                                <label id="lblchkTecResponsable">
                                    <input type="checkbox" id="chkTecResponsable" />Téc. Responsable</label>
                                <label id="lblchkAdministrador">
                                    <input type="checkbox" id="chkAdministrador" />Administrador</label>
                            </td>
                        </tr>
                        <tr>
                            <td>Asunto:</td>
                            <td>
                                <asp:TextBox ID="txtAsuntoCorDev" runat="server" Width="340" Text="Solicitud {Codigo} devuelta">                                    
                                </asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">Contenido del correo:
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <asp:TextBox ID="txtMensajeCorDev" runat="server" TextMode="MultiLine"
                                    Width="465" Rows="10" Style="resize: none;">
                                </asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="font-style: italic; padding-top: 7px;">Detalles de parámetros usados en el correo en la pestaña "Parámetros":
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" align="right" style="padding-top: 10px;">
                                <asp:Label ID="lblAdvertenciaCorDev" runat="server" ForeColor="#4297d7" Font-Size="11px"
                                    Font-Bold="true" Style="display: none;">No se enviará ningún correo a los <b>Propietarios</b></asp:Label>
                            </td>
                        </tr>
                    </table>
                </cc1:ContenedorTabJQ>
            </cc1:TabJQ>
        </div>
        <div id="dvConfirmacionGuardarDevolucion" style="display: none;">
            Se guardará la nueva configuración del tipo de solicitud y se enviarán los corres configurados a los interesados de todas las solicitudes que serán devueltas debido al cambio.            
            <br />
            <br />
            ¿Desea continuar?
        </div>
        <div id="dvConfirmacionUsuarioEspecifico" style="display: none;">
            Se le asignará el perfil "Responsable De Aprobación" al empleado seleccionado si este no cuenta con dicho perfil.
            <br />
            <br />
            ¿Desea continuar?
        </div>



        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Adm_SolicitudesConfiguracion.js") %>" type="text/javascript"></script>
        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Adm_SolicitudesConfiguracionActualizar.js") %>" type="text/javascript"></script>

    </form>

    </body>
</html>