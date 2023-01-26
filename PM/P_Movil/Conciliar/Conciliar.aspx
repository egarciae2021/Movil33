<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Conciliar_Conciliar"
    EnableEventValidation="false" CodeBehind="Conciliar.aspx.vb" %>

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
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/cultures/kendo.culture.es-ES.min.js" type="text/javascript"></script>
</head>

<body>
    <link href="bootstrap-progressbar-3.3.4.min.css" rel="stylesheet" />
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Conciliar.js")%>" type="text/javascript"></script>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("ConciliarData.js")%>" type="text/javascript"></script>
    <link href="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Conciliar.css")%>" type="text/css" rel="Stylesheet" />

    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfLicencia" runat="server" />

        <asp:HiddenField ID="hdfbtSobreescribe" runat="server" Value="0" />
        <asp:HiddenField ID="hdfbtPregunto" runat="server" Value="0" />
        <asp:HiddenField runat="server" ID="hdfInCodCta" />
        <asp:HiddenField runat="server" ID="hdfbtTipoPla" Value="0" />
        <asp:HiddenField runat="server" ID="hdfCodPla" Value="-1" />
        <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
        <asp:HiddenField ID="hdfIdPerfil" runat="server" Value="-1" />
        <asp:HiddenField ID="hdfGenerico" runat="server" Value="" />

        <div id="dvCargando" class="dvCargando">
        </div>

        <div class="dvPanel ui-widget-content ui-corner-all">

            <table style="width: 100%;" border="0">
                <tr>
                    <td colspan="8">Seleccione el periodo y operador, luego de clic en "Procesar" para realizar el análisis de inconsistencias.
                    </td>
                </tr>
                <tr style="height: 15px;"></tr>
                <tr>
                    <td style="width: 50px; text-align: right;">Periodo:&nbsp;
                    </td>
                    <td style="width: 100px;">
                        <asp:TextBox ID="txtPeriodo" runat="server" CssClass="MESANHO" Width="90px" MaxLength="7"></asp:TextBox>
                    </td>
                    <td style="width: 50px; text-align: right;">Operador:&nbsp;
                    </td>
                    <td style="width: 150px;">
                        <asp:DropDownList ID="ddlOperador" runat="server" Width="130px"></asp:DropDownList>
                    </td>
                    <td style="width: 70px;">
                        <div id="btnConciliar" class="btnNormal">
                            <%--<asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Accesos/conciliar.png" />--%>
                            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Proceso.png" />
                            <a>Procesar</a>
                        </div>
                    </td>
                    <td id ="MsjTooltip" style="width: 20px; display: none;">
                        <ttgInfo:ToolTipGenerico ID="ttgInfoImpuesto" runat="server" Mensaje="Los montos visualizados no incluyen impuesto."/>
                    </td>
                    <td>
                        <span id="lblMensajeCierre"></span>
                    </td>
                    <td style="text-align: right;">
                        <div id="btnEnviarValidacion" style="display: none;" class="btnNormal">
                            <table>
                                <tr>
                                    <td>
                                        <asp:Image alt="Exportar" AlternateText="Exportar" ID="Image6"
                                            Width="16px" runat="server" ImageUrl="~/Common/Images/Mantenimiento/enviarcorreousuario.png" /></td>
                                    <td>Enviar Validación</td>
                                </tr>
                            </table>
                        </div>

                    </td>
                </tr>
                <tr style="height: 15px;"></tr>
                <tr id="trFilaConciliacion" style="display: none;">
                    <td colspan="8">
                        <div class="dvTabConciliacion">
                            <cc1:TabJQ ID="tbConciliacion" runat="server" CssClass="tabs" Style="margin: 0px; padding: 0px; width: 100%;">

                                <cc1:ContenedorTabJQ ID="tbAnalisisFyC" Titulo="Análisis Fact." CssClass="dvTabContenido">
                                    <div>
                                        <table id="table_AnalisisFyC" style="width: 100%;">
                                            <tr>
                                                <td style="padding: 10px;" valign="top"></td>
                                                <td valign="top">
                                                    <table>
                                                        <tr>
                                                            <td colspan="2">&nbsp;
                                                                <table style="width: 100%;" border="0">
                                                                    <tr>
                                                                        <td style="width: 25px;"></td>
                                                                        <td style="width: 50px;">Mostrar: </td>
                                                                        <td style="width: 120px;">
                                                                            <select id="cboFiltroConciliado_FyC">
                                                                                <option value="0">Todos</option>
                                                                                <option value="1">Conciliados</option>
                                                                                <option value="2">No Conciliados</option>
                                                                            </select>
                                                                        </td>
                                                                        <td style="width: 30px;"></td>
                                                                        <td style="width: 25px;">Número: </td>
                                                                        <td style="width: 25px;">
                                                                            <input type="text" name="name" maxlength="10" id="txtFiltroNumero_FyC" value="" style="text-align: right; width: 100px;" />
                                                                        </td>
                                                                        <td style="text-align: left; font-size: 10px; color: #878787;">(Presione Enter)</td>
                                                                        <td style="text-align: right; width: 100px;">

                                                                            <div id="btnDesconciliarFyC" class="btnNormal" style="width: 90px;">
                                                                                <table>
                                                                                    <tr>
                                                                                        <td>
                                                                                            <asp:Image alt="Cancelar" AlternateText="Cancelar" ID="Image7"
                                                                                                Width="16px" runat="server" ImageUrl="~/Common/Images/Mantenimiento/btnCancel.png" /></td>
                                                                                        <td>Cancelar</td>
                                                                                    </tr>
                                                                                </table>
                                                                            </div>
                                                                        </td>

                                                                        <td style="text-align: right; width: 100px;">
                                                                            <div id="btnConciliarFyC" class="btnNormal" style="width: 90px;">
                                                                                <table>
                                                                                    <tr>
                                                                                        <td>
                                                                                            <asp:Image alt="Conciliar" AlternateText="Conciliar" ID="Image1"
                                                                                                Width="16px" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Atender.png" /></td>
                                                                                        <td>Conciliar</td>
                                                                                    </tr>
                                                                                </table>
                                                                            </div>
                                                                        </td>
                                                                        <td style="text-align: right; width: 100px;">
                                                                            <div id="btnExportarFyC" class="btnNormal btnExportarExcel" style="width: 90px;">
                                                                                <table>
                                                                                    <tr>
                                                                                        <td>
                                                                                            <asp:Image alt="Exportar" AlternateText="Exportar" ID="Image12"
                                                                                                Width="16px" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png" /></td>
                                                                                        <td>Exportar</td>
                                                                                    </tr>
                                                                                </table>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td style="text-align: right; padding: 5px;"></td>
                                                        </tr>
                                                        <tr style="height: 5px;">
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <table id="grid_AnalisisFyC">
                                                                </table>
                                                                <div id="pager_grid_AnalisisFyC">
                                                                </div>
                                                                <p>
                                                                    <b>Análisis del archivo de Facturación (Reporte Fact.),
                                                    se comparan los montos indicados en cada hoja del archivo excel.</b>
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td valign="top"></td>
                                            </tr>

                                        </table>
                                    </div>
                                    <div class="MensajeSinDatos" id="lblMensaje_AnalisisFyC"></div>
                                </cc1:ContenedorTabJQ>

                                <cc1:ContenedorTabJQ ID="tbFyCCortes" Titulo="Fact. vs Cortes (5)" CssClass="dvTabContenido">
                                    <div>
                                        <table id="table_AnalisisFyCCortes" style="width: 100%;">
                                            <tr>
                                                <td style="padding: 10px;" valign="top">

                                                    <div style="font-size: 100%;" class="col-md-3 col-sm-3 col-xs-12 bg-white">
                                                        <div class="col-md-12 col-sm-12 col-xs-6">
                                                            <div>
                                                                <div id="lbl_Contador_MontosDiferentes" class="EstiloTituloError"></div>
                                                                <div class="">
                                                                    <div class="progress progress_sm" style="width: 76%;">
                                                                        <div id="pgr_Contador_MontosDiferentes" class="progress-bar bg-green" role="progressbar" data-transitiongoal="80" aria-valuenow="79" style="width: 90%;"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div id="lbl_Contador_CuentasFyC" class="EstiloTituloError"></div>
                                                                <div class="">
                                                                    <div class="progress progress_sm" style="width: 76%;">
                                                                        <div id="pgr_Contador_CuentasFyC" class="progress-bar bg-green" role="progressbar" data-transitiongoal="60" aria-valuenow="59" style="width: 95%;"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12 col-xs-6">
                                                            <div>
                                                                <div id="lbl_Contador_CuentasCortes" class="EstiloTituloError"></div>
                                                                <div class="">
                                                                    <div class="progress progress_sm" style="width: 76%;">
                                                                        <div id="pgr_Contador_CuentasCortes" class="progress-bar bg-green" role="progressbar" data-transitiongoal="40" aria-valuenow="39" style="width: 95%;"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </td>
                                                <td valign="top">
                                                    <table>
                                                        <tr>
                                                            <td colspan="2">&nbsp;
                                                                <table style="width: 100%;" border="0">
                                                                    <tr>
                                                                        <td style="width: 25px;"></td>
                                                                        <td style="width: 50px;">Mostrar: </td>
                                                                        <td style="width: 120px;">
                                                                            <select id="cboFiltroConciliado_FyCCorte">
                                                                                <option value="0">Todos</option>
                                                                                <option value="1">Conciliados</option>
                                                                                <option value="2">No Conciliados</option>
                                                                            </select>
                                                                        </td>
                                                                        <td style="width: 30px;"></td>
                                                                        <td style="width: 25px;">Cuenta: </td>
                                                                        <td style="width: 25px;">
                                                                            <input id="txtFiltroNumero_FyCCorte" type="text" name="name" value="" style="text-align: right;" />
                                                                        </td>
                                                                        <td style="text-align: left; font-size: 10px; color: #878787;">(Presione Enter)</td>
                                                                        <td style="text-align: right; width: 100px;">
                                                                            <div id="btnDesconciliarFyCCorte" class="btnNormal" style="width: 90px;">
                                                                                <table>
                                                                                    <tr>
                                                                                        <td>
                                                                                            <asp:Image alt="Cancelar" AlternateText="Cancelar" ID="Image13"
                                                                                                Width="16px" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Atender.png" /></td>
                                                                                        <td>Cancelar</td>
                                                                                    </tr>
                                                                                </table>
                                                                            </div>
                                                                        </td>
                                                                        <td style="text-align: right; width: 100px;">
                                                                            <div id="btnConciliarFyCCorte" class="btnNormal" style="width: 90px;">
                                                                                <table>
                                                                                    <tr>
                                                                                        <td>
                                                                                            <asp:Image alt="Conciliar" AlternateText="Conciliar" ID="Image2"
                                                                                                Width="16px" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Atender.png" /></td>
                                                                                        <td>Conciliar</td>
                                                                                    </tr>
                                                                                </table>
                                                                            </div>
                                                                        </td>
                                                                        <td style="text-align: right; width: 100px;">
                                                                            <div id="btnExportarFyCCorte" class="btnNormal btnExportarExcel" style="width: 90px;">
                                                                                <table>
                                                                                    <tr>
                                                                                        <td>
                                                                                            <asp:Image alt="Exportar" AlternateText="Exportar" ID="Image11"
                                                                                                Width="16px" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png" /></td>
                                                                                        <td>Exportar</td>
                                                                                    </tr>
                                                                                </table>
                                                                            </div>
                                                                        </td>

                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td style="text-align: right; padding: 5px;"></td>
                                                        </tr>
                                                        <tr style="height: 5px;">
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <table id="grid_AnalisisFyCVSCorte">
                                                                </table>
                                                                <div id="pager_grid_AnalisisFyCVSCorte">
                                                                </div>
                                                                <p>
                                                                    <b>Análisis del archivo de Facturación (Reporte Fact.) VS
                                                    el archivo de Cortes. Se comparan montos por cuentas de facturación.</b>
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td valign="top"></td>
                                            </tr>
                                        </table>

                                    </div>
                                    <div class="MensajeSinDatos" id="lblMensaje_AnalisisFyCCortes"></div>
                                </cc1:ContenedorTabJQ>

                                <cc1:ContenedorTabJQ ID="tbPlantaAdendum" Titulo="Inventario vs Adendum" CssClass="dvTabContenido">
                                    <div>
                                        <table id="table_AnalisisInventarioAdendum" style="width: 100%;">
                                            <tr>
                                                <td style="padding: 10px;" valign="top">

                                                    <div style="font-size: 100%;" class="col-md-3 col-sm-3 col-xs-12 bg-white">
                                                        <div class="col-md-12 col-sm-12 col-xs-6">
                                                            <div>
                                                                <div id="lbl_Contador_CuentasDiferentes" class="EstiloTituloError"></div>
                                                                <div class="">
                                                                    <div class="progress progress_sm" style="width: 76%;">
                                                                        <div id="pgr_Contador_CuentasDiferentes" class="progress-bar bg-green" role="progressbar" data-transitiongoal="80" aria-valuenow="79" style="width: 90%;"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div id="lbl_Contador_PlanesDiferentes" class="EstiloTituloError"></div>
                                                                <div class="">
                                                                    <div class="progress progress_sm" style="width: 76%;">
                                                                        <div id="pgr_Contador_PlanesDiferentes" class="progress-bar bg-green" role="progressbar" data-transitiongoal="60" aria-valuenow="59" style="width: 95%;"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12 col-xs-6">
                                                            <div>
                                                                <div id="lbl_Contador_EquipoDiferentes" class="EstiloTituloError"></div>
                                                                <div class="">
                                                                    <div class="progress progress_sm" style="width: 76%;">
                                                                        <div id="pgr_Contador_EquipoDiferentes" class="progress-bar bg-green" role="progressbar" data-transitiongoal="40" aria-valuenow="39" style="width: 95%;"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12 col-xs-6">
                                                            <div>
                                                                <div id="lbl_Contador_NumeroInventario" class="EstiloTituloError"></div>
                                                                <div class="">
                                                                    <div class="progress progress_sm" style="width: 76%;">
                                                                        <div id="pgr_Contador_NumeroInventario" class="progress-bar bg-green" role="progressbar" data-transitiongoal="40" aria-valuenow="39" style="width: 95%;"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12 col-xs-6">
                                                            <div>
                                                                <div id="lbl_Contador_NumeroAdendum" class="EstiloTituloError"></div>
                                                                <div class="">
                                                                    <div class="progress progress_sm" style="width: 76%;">
                                                                        <div id="pgr_Contador_NumeroAdendum" class="progress-bar bg-green" role="progressbar" data-transitiongoal="40" aria-valuenow="39" style="width: 95%;"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </td>
                                                <td valign="top">

                                                    <table>
                                                        <tr>
                                                            <td colspan="2">&nbsp;
                                                                <table style="width: 100%;" border="0">
                                                                    <tr>
                                                                        <td style="width: 25px;"></td>
                                                                        <td style="width: 50px;">Mostrar: </td>
                                                                        <td style="width: 120px;">
                                                                            <select id="cboFiltroConciliado_InventarioAdendum">
                                                                                <option value="0">Todos</option>
                                                                                <option value="1">Conciliados</option>
                                                                                <option value="2">No Conciliados</option>
                                                                            </select>
                                                                        </td>
                                                                        <td style="width: 30px;"></td>
                                                                        <td style="width: 25px;">Número: </td>
                                                                        <td style="width: 25px;">
                                                                            <input id="txtFiltroNumero_InventarioAdendum" type="text" name="name" value="" style="text-align: right;" />
                                                                        </td>
                                                                        <td style="text-align: left; font-size: 10px; color: #878787;">(Presione Enter)</td>
                                                                        <td style="text-align: right; width: 100px;">
                                                                            <div id="btnDesconciliarInventarioAdendum" class="btnNormal" style="width: 90px;">
                                                                                <table>
                                                                                    <tr>
                                                                                        <td>
                                                                                            <asp:Image alt="Cancelar" AlternateText="Cancelar" ID="Image14"
                                                                                                Width="16px" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Atender.png" /></td>
                                                                                        <td>Cancelar</td>
                                                                                    </tr>
                                                                                </table>
                                                                            </div>
                                                                        </td>
                                                                        <td style="text-align: right; width: 100px;">
                                                                            <div id="btnConciliarInventarioAdendum" class="btnNormal" style="width: 90px;">
                                                                                <table>
                                                                                    <tr>
                                                                                        <td>
                                                                                            <asp:Image alt="Conciliar" AlternateText="Conciliar" ID="Image9"
                                                                                                Width="16px" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Atender.png" /></td>
                                                                                        <td>Conciliar</td>
                                                                                    </tr>
                                                                                </table>
                                                                            </div>
                                                                        </td>
                                                                        <td style="text-align: right; width: 100px;">
                                                                            <div id="btnExportarInventarioAdendum" class="btnNormal btnExportarExcel" style="width: 90px;">
                                                                                <table>
                                                                                    <tr>
                                                                                        <td>
                                                                                            <asp:Image alt="Exportar" AlternateText="Exportar" ID="Image10"
                                                                                                Width="16px" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png" /></td>
                                                                                        <td>Exportar</td>
                                                                                    </tr>
                                                                                </table>
                                                                            </div>
                                                                        </td>

                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td style="text-align: right; padding: 5px;"></td>
                                                        </tr>
                                                        <tr style="height: 5px;">
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <table id="grid_AnalisisPlantaVSAdendum">
                                                                </table>
                                                                <div id="pager_grid_AnalisisPlantaVSAdendum">
                                                                </div>
                                                                <p>
                                                                    <b>Análisis del archivo Adendum VS
                                                    el inventario del sistema Gestión Móvil. Se comparan Cuentas (Padres), Planes, Equipos.</b>
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td valign="top"></td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="MensajeSinDatos" id="lblMensaje_AnalisisInventarioAdendum"></div>
                                </cc1:ContenedorTabJQ>

                                <cc1:ContenedorTabJQ ID="tbPlantaFyC" Titulo="Inventario vs Fact." CssClass="dvTabContenido">
                                    <%--<div style="margin: 20px 0px 0px 20px;">
                                        <ttgInfo:ToolTipGenerico ID="ttgInfoImpuesto" runat="server" Mensaje="Los montos visualizados incluyen impuesto."/>
                                    </div>--%>
                                    <div>
                                        <table id="table_AnalisisInventarioFyC" style="width: 100%;" border="0">
                                            <tr>
                                                <td style="padding: 10px; min-width: 235px;" valign="top">

                                                    <div style="font-size: 100%;" class="col-md-3 col-sm-3 col-xs-12 bg-white">
                                                        <div class="col-md-12 col-sm-12 col-xs-6">
                                                            <div>
                                                                <div id="lbl_Contador_MontoDiferente" class="EstiloTituloError"></div>
                                                                <div class="">
                                                                    <div class="progress progress_sm" style="width: 76%;">
                                                                        <div id="pgr_Contador_MontoDiferente" class="progress-bar bg-green" role="progressbar" data-transitiongoal="80" aria-valuenow="79" style="width: 70%;"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12 col-xs-6">
                                                            <div>
                                                                <div id="lbl_Contador_NumeroInventario2" class="EstiloTituloError"></div>
                                                                <div class="">
                                                                    <div class="progress progress_sm" style="width: 76%;">
                                                                        <div id="pgr_Contador_NumeroInventario2" class="progress-bar bg-green" role="progressbar" data-transitiongoal="40" aria-valuenow="39" style="width: 95%;"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12 col-xs-6">
                                                            <div>
                                                                <div id="lbl_Contador_NumeroFyC" class="EstiloTituloError"></div>
                                                                <div class="">
                                                                    <div class="progress progress_sm" style="width: 76%;">
                                                                        <div id="pgr_Contador_NumeroFyC" class="progress-bar bg-green" role="progressbar" data-transitiongoal="40" aria-valuenow="39" style="width: 95%;"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </td>
                                                <td valign="top">

                                                    <table>
                                                        <tr>
                                                            <td colspan="2">&nbsp;
                                                                <table style="width: 100%;" border="0">
                                                                    <tr>
                                                                        <td style="width: 25px;"></td>
                                                                        <td style="width: 50px;">Mostrar: </td>
                                                                        <td style="width: 120px;">
                                                                            <select id="cboFiltroConciliado_InventarioFyC">
                                                                                <option value="0">Todos</option>
                                                                                <option value="1">Conciliados</option>
                                                                                <option value="2">No Conciliados</option>
                                                                            </select>
                                                                        </td>
                                                                        <td style="width: 30px;"></td>
                                                                        <td style="width: 25px;">Número: </td>
                                                                        <td style="width: 25px;">
                                                                            <input id="txtFiltroNumero_InventarioFyC" type="text" name="name" value="" style="text-align: right;" />
                                                                        </td>
                                                                        <td style="text-align: left; font-size: 10px; color: #878787;">(Presione Enter)</td>
                                                                        <td style="text-align: right; width: 100px;">
                                                                            <div id="btnDesconciliarInventarioFyC" class="btnNormal" style="width: 90px;">
                                                                                <table>
                                                                                    <tr>
                                                                                        <td>
                                                                                            <asp:Image alt="Cancelar" AlternateText="Cancelar" ID="Image15"
                                                                                                Width="16px" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Atender.png" /></td>
                                                                                        <td>Cancelar</td>
                                                                                    </tr>
                                                                                </table>
                                                                            </div>
                                                                        </td>
                                                                        <td style="text-align: right; width: 100px;">
                                                                            <div id="btnConciliarInventarioFyC" class="btnNormal" style="width: 90px;">
                                                                                <table>
                                                                                    <tr>
                                                                                        <td>
                                                                                            <asp:Image alt="Conciliar" AlternateText="Conciliar" ID="Image8"
                                                                                                Width="16px" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Atender.png" /></td>
                                                                                        <td>Conciliar</td>
                                                                                    </tr>
                                                                                </table>
                                                                            </div>
                                                                        </td>
                                                                        <td style="text-align: right; width: 100px;">
                                                                            <div id="btnExportarInventarioFyC" class="btnNormal btnExportarExcel" style="width: 90px;">
                                                                                <table>
                                                                                    <tr>
                                                                                        <td>
                                                                                            <asp:Image alt="Exportar" AlternateText="Exportar" ID="Image3"
                                                                                                Width="16px" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png" /></td>
                                                                                        <td>Exportar</td>
                                                                                    </tr>
                                                                                </table>
                                                                            </div>
                                                                        </td>

                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td style="text-align: right; padding: 5px;"></td>
                                                        </tr>
                                                        <tr style="height: 5px;">
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <table id="grid_AnalisisPlantaVSFyC">
                                                                </table>
                                                                <div id="pager_grid_AnalisisPlantaVSFyC">
                                                                </div>
                                                                <p>
                                                                    <b>Análisis del archivo de facturación (Fact.) VS
                                                    el inventario del sistema Gestión Móvil. Se comparan los montos del plan por cada número telefónico.</b>
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>

                                                <td valign="top"></td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="MensajeSinDatos" id="lblMensaje_AnalisisInventarioFyC"></div>
                                </cc1:ContenedorTabJQ>

                                <cc1:ContenedorTabJQ ID="tbSolicitudesFyC" Titulo="Solicitudes vs Fact. (5)" CssClass="dvTabContenido">
                                    <div>
                                        <table id="table_AnalisisSolicitudFyC" style="width: 100%;" border="0">

                                            <tr>
                                                <td colspan="2">&nbsp;
                                                    <table style="width: 100%;">
                                                        <tr>
                                                            <td style="width: 25px;"></td>
                                                            <td style="width: 50px;">Mostrar: </td>
                                                            <td style="width: 120px;">
                                                                <select id="cboFiltroConciliado_SolicitudFyC">
                                                                    <option value="0">Todos</option>
                                                                    <option value="1">Conciliados</option>
                                                                    <option value="2">No Conciliados</option>
                                                                </select>
                                                            </td>
                                                            <td style="width: 30px;"></td>
                                                            <td style="width: 25px;">Número: </td>
                                                            <td style="width: 25px;">
                                                                <input id="txtFiltroNumero_SolicitudFyC" type="text" name="name" value="" style="text-align: right;" />
                                                            </td>
                                                            <td style="text-align: left; font-size: 10px; color: #878787;">(Presione Enter)</td>
                                                            <td style="text-align: right; width: 100px;">
                                                                <div id="btnDesconciliarSolicitudFyC" class="btnNormal" style="width: 90px;">
                                                                    <table>
                                                                        <tr>
                                                                            <td>
                                                                                <asp:Image alt="Cancelar" AlternateText="Cancelar" ID="Image16"
                                                                                    Width="16px" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Atender.png" /></td>
                                                                            <td>Cancelar</td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                            <td style="text-align: right; width: 100px;">
                                                                <div id="btnConciliarSolicitudFyC" class="btnNormal" style="width: 90px;">
                                                                    <table>
                                                                        <tr>
                                                                            <td>
                                                                                <asp:Image alt="Conciliar" AlternateText="Conciliar" ID="Image5"
                                                                                    Width="16px" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Atender.png" /></td>
                                                                            <td>Conciliar</td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                            <td style="text-align: right; width: 100px;">
                                                                <div id="btnExportarSolicitudFyC" class="btnNormal btnExportarExcel" style="width: 90px;">
                                                                    <table>
                                                                        <tr>
                                                                            <td>
                                                                                <asp:Image alt="Exportar" AlternateText="Exportar" ID="Image4"
                                                                                    Width="16px" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png" /></td>
                                                                            <td>Exportar</td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td style="text-align: right; padding: 5px;"></td>
                                            </tr>
                                            <tr style="height: 5px;">
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px;" valign="top"></td>
                                                <td valign="top" style="text-align: left;">
                                                    <table id="grid_AnalisisSolicitudesVSFyC">
                                                    </table>
                                                    <div id="pager_grid_AnalisisSolicitudesVSFyC">
                                                    </div>
                                                    <p>
                                                        <b>Análisis del archivo de facturación (Fact.) VS
                                                    las solicitudes generadas en el periodo actual. Se comparan los montos por cada número telefónico según las solicitudes.</b>
                                                    </p>
                                                </td>
                                                <td valign="top">

                                                    <table>
                                                        <tr>
                                                            <td></td>
                                                        </tr>
                                                        <tr style="height: 5px;"></tr>
                                                        <tr>
                                                            <td></td>
                                                        </tr>
                                                    </table>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px;" valign="top"></td>
                                                <td valign="top" style="text-align: right; padding: 7px;"></td>
                                            </tr>
                                        </table>
                                    </div>

                                    <div class="MensajeSinDatos" id="lblMensaje_AnalisisSolicitudFyC"></div>

                                </cc1:ContenedorTabJQ>

                            </cc1:TabJQ>
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

        <div id="dvDetalle" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifDetalle" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
        </div>
        <div id="divObservacionValidar" style="display: none;">

            <table style="width: 100%;">
                <tr>
                    <td style="text-align: right; width: 100px;" valign="top">Observación (adicional):
                    </td>
                    <td>
                        <asp:TextBox ID="txtObservacionCola" runat="server" TextMode="MultiLine" Height="200px" Width="500px"></asp:TextBox>
                    </td>
                </tr>
            </table>

        </div>

    </form>
</body>
</html>
