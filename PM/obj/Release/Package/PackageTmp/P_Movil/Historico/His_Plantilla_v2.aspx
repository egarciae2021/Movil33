<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Historico_His_Plantilla_v2" CodeBehind="His_Plantilla_v2.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../../Common/Styles/jqGrid/ui.jqgrid.css" />
    <script type="text/javascript" src="../../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/grid.base.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/grid.common.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/grid.formedit.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/jquery.fmatter.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/JsonXml.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/jqDnR.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/jqModal.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/grid.jqueryui.js"></script>

    <script src="../../Common/Scripts/Ie8JS.js" type="text/javascript"></script>

    <script type="text/javascript" src="../../Common/Scripts/Utilitario.js"></script>

    <%--<script type="text/javascript" src="../../Common/Scripts/FusionCharts/FusionCharts.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/FusionCharts/FusionCharts.jqueryplugin.js"></script>--%>
    <link href="../DashBoard/DashBoard_Global.css" rel="stylesheet" type="text/css" />
    <%--<script src="His_Plantilla.js" type="text/javascript"></script>--%>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("../../Content/js/shared/FusionCharts/3.13.3/fusioncharts.js")%>" type="text/javascript"></script>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("His_Plantilla_v2.js")%>" type="text/javascript"></script>

    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfAdmin" runat="server" />
        <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
        <asp:HiddenField ID="hdfEmpleado" runat="server" />
        <asp:HiddenField ID="hdf_Tabla" runat="server" />
        <asp:HiddenField ID="hdf_P_Codigo" runat="server" />
        <asp:HiddenField ID="hdf_F_Codigo" runat="server" />
        <asp:HiddenField ID="hdf_Desc" runat="server" />
        <asp:HiddenField ID="hdf_F_Desc" runat="server" />
        <asp:HiddenField ID="hdf_conFiltro" runat="server" />

        <asp:HiddenField ID="hdf_Sucursal" runat="server" />

        <%--Configuracion Regional--%>
        <asp:HiddenField ID="hdfNumDec" runat="server" />
        <asp:HiddenField ID="hdfSimDec" runat="server" />
        <asp:HiddenField ID="hdfSimMil" runat="server" />
        <asp:HiddenField ID="hdfNomMon" runat="server" />
        <asp:HiddenField ID="hdfSimMon" runat="server" />
        <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
        <div id="dvCargando" class="dvCargando">
        </div>
        <span id="btnMostrarPanel" class="ui-icon ui-icon-circle-triangle-n" style="position: absolute; right: 200px; top: 0px; display: none;"></span>
        <div id="gen" style="width: 100%; margin: auto;">

            <div id="pnlTap">
                <%--                <div  class="CuerpoTap esPrimerTap">
                    <div id="TapTotal"  class="Tap ui-state-active"  style="width: 150px; text-align: center;"><span class="textTab">Total</span></div>
                </div>
                <div  class="CuerpoTap">
                    <div id="TapLlamadas" class="Tap TapNoSelecionado" style="width: 150px; text-align: center;"><span class="textTab">Llamadas</span></div>
                </div>
                <div  class="CuerpoTap">
                    <div id="TabMensajes"  class="Tap TapNoSelecionado" style="width: 150px; text-align: center;"><span class="textTab">Mensajes</span></div>
                </div>
                <div  class="CuerpoTap">
                    <div id="TabNavegacion" class="Tap TapNoSelecionado" style="width: 150px; text-align: center;"><span class="textTab">Navegación</span></div>
                </div>--%>
            </div>
            <div style="border-top: 1px solid skyblue; z-index: 0; clear: both; width: 100%; margin-bottom: 8px;"></div>
            <div id="panelBusqueda" style="float: left; width: 100%; height: 30px; margin-bottom: 5px;">
                <table border="0" cellpadding="0" cellspacing="3" style="width: 100%;">
                    <tr>
                        <td style="display: none !important; width: 100px;" >
                            <div id="radioPorMaestro" style="float: left;">
                                <input type="radio" id="radio7" name="radioPorMaestro" /><label for="radio7">Todos</label>
                                <input type="radio" id="radio8" name="radioPorMaestro" checked="checked" /><label for="radio8">Trans</label>
                            </div>
                        </td>
                        <td style="width: 110px;">
                            <div id="radio" style="float: left; ">
                                <input type="radio" id="radio1" name="radio" /><label for="radio1">Años</label>
                                <input type="radio" id="radio2" name="radio" checked="checked" /><label for="radio2">Meses</label>
                            </div>
                        </td>
                        <td align="center" style="width: 155px;">
                            <asp:Label ID="lblPor" runat="server" Text="Últimos Meses:" Style="margin-right: 5px"></asp:Label>
                            <select id="selectPor">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3" selected="selected">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </td>
                        <td id="filaServicio" style="display: none; width: 230px;">
                            <asp:Label ID="lblServicio" runat="server" Text="Servicio:" Style="margin-left: 5px;"></asp:Label>
                            <select id="selectServicio" style="width: 170px;">
                                <option value="Total" selected="selected">Total</option>
                            </select>
                        </td>
                        <td style="width: 130px;">
                            <asp:Label ID="lblTipo" runat="server" Text="Tipo:" Style="margin-left: 5px;"></asp:Label>
                            <select id="selectTipo">
                                <option value="LLAMADAS" selected="selected">Cantidad</option>
                            </select>
                        </td>
                        <td style="width: 160px;">
                            <asp:Label ID="lblTelefonia" runat="server" Text="Telefonía:" Style="margin-left: 5px;"></asp:Label>
                            <select id="selectTelefonia">
                                <option value="SAL" selected="selected">Salientes</option>
                                <option value="ENT">Entrantes</option>
                            </select>
                        </td>
                        <td id="filaNivel" style="width: 185px;">
                            <asp:Label ID="lblNivel" runat="server" Text="Nivel:" Style="margin-left: 0px;"></asp:Label>
                            <asp:DropDownList ID="ddlNivel" runat="server">
                            </asp:DropDownList>
                        </td>
                        <%--</tr><tr>--%>
                        <td align="center" style="width: 50px;">
                            <div id="btnBuscar">
                                <asp:Image ID="Image1" runat="server" Style="width: 14px" ImageUrl="~/Common/Images/lup.png" />
                            </div>
                        </td>
                        <td></td>
                        <td style="width: 210px;">
                            <asp:TextBox ID="txtFiltro" runat="server" Width="200" disabled="disabled"></asp:TextBox>
                        </td>
                        <td style="width: 5px;"></td>
                        <td align="left" style="width: 20px;">
                            <div id="btnExportar" runat="server" title="Exportar a Excel">
                                <asp:Image ID="imgExportar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png" Width="16px" Height="16px" />
                            </div>
                            <div id="btnExportarImagen" runat="server" title="Exportar Imagen">
                                <asp:Image ID="imgExportarImagen" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Exportar16.png" Width="16px" Height="16px" />
                            </div>
                        </td>

                    </tr>
                </table>

                <div id="lblMensaje" style="display: none; font-size: medium; color: Gray;">
                    No hay datos para mostrar.
                </div>
            </div>
            <div style="width: 100%; clear: both; height: 20px;"></div>
            <%--        <div id="pnlTotal" class="pnlCuerpoTapGen">
        </div>
        <div id="pnlLlamadas" class="esNoVisible pnlCuerpoTapGen">--%>
            <div id="general" align="center">
                <div id="grids" align="center" style="width: 620px; border: 0px dotted gray;">
                </div>
                <div style="width: 100%; clear: both; height: 20px;"></div>

                <div id="gridsTotal" align="center" style="width: 620px; border: 0px dotted gray; display: none;">
                </div>
                <div style="width: 100%; clear: both; height: 20px;"></div>

                <div id="charts" align="center" style="width: 900px; border: 0px dotted gray;">



                    <div style="border: 0px dotted gray;" align="center">
                        <div id="pnlFiltroChart">
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <%--<td>
                                        <div style="width: 80px;">Tipo de gráfico :</div>

                                    </td>
                                    <td>
                                        <select id="ddlTipoChart-1" style="margin: 10px;">
                                        </select>
                                    </td>
                                    <td></td>
                                    <td></td>--%>
                                    <td>
                                        <div style="width: 80px; display: none;">Tipo de Vista :</div>
                                    </td>
                                    <td>
                                        <select id="ddlTipoVista" style="margin: 10px; display: none;">
                                            <option value="1">Por Mes</option>
                                            <option value="2">Por Total</option>
                                        </select>
                                    </td>
                                    <td>
                                        <div id="RadioChar-1" style="display: none; width: 400px;">
                                            <input type="radio" id="radio3" name="RadioChar-1" /><label for="radio3">Servicio por Periodo</label>
                                            <input type="radio" id="radio4" name="RadioChar-1" checked="checked" /><label for="radio4">Periodo por Servicio</label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div id="chart-1">
                        </div>
                    </div>

                    <%--<div style="float: right;">
                    <div>
                        <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    Tipo de gráfico :<select id="ddlTipoChart-2" style="margin: 10px;">
                                    </select>
                                </td>
                                <td>
                                    <div id="RadioChar-2" style="display: none;">
                                        <input type="radio" id="radio5" name="RadioChar-2" /><label for="radio5">Ser X Per</label>
                                        <input type="radio" id="radio6" name="RadioChar-2" checked="checked" /><label for="radio6">Per
                                            X Ser</label>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div id="chart-2">
                    </div>
                </div>--%>
                </div>
            </div>
            <%--        </div>
        <div id="pnlMensajes" class="esNoVisible pnlCuerpoTapGen">
        </div>
        <div id="pnlNavegacion" class="esNoVisible pnlCuerpoTapGen">
        </div>--%>
        </div>
        <div id="menu" style="width: 150px; height: 200px; border: 0px dotted gray; display: none; position: absolute; z-index: 10000;">
            <div class="boton" id="CODINT_VC-NOMBREORG" style="width: 120px; margin: 0px 20px;">
                Organización
            </div>
            <div class="boton" id="CODEMPLEADO_VC-NOMEMPLEADO" style="width: 120px; margin: 0px 20px;">
                Empleados
            </div>
            <div class="boton" id="CODSUC-NOMSUC" style="width: 120px; margin: 0px 20px;">
                Sucursales
            </div>
            <div class="boton" id="codext-NOMEMPLEADO" style="width: 120px; margin: 0px 20px;">
                Líneas
            </div>
            <div class="boton" id="CODCIA-NOMCIA" style="width: 120px; margin: 0px 20px;">
                Operador
            </div>
            <div class="boton" id="CODPAI-NOMPAI" style="width: 120px; margin: 0px 20px;">
                Pais
            </div>
            <div class="boton" id="CODCIU-NOMCIU" style="width: 120px; margin: 0px 20px;">
                Ciudad
            </div>
            <div class="boton" id="CODSRV-NOMSRV" style="width: 120px; margin: 0px 20px;">
                Servicios
            </div>
            <div class="boton" id="CODCCO_VC-NOMCCO" style="width: 120px; margin: 0px 20px;">
                Centro de costos
            </div>
            <div class="boton" id="NUMERO-DESCRIPCION" style="width: 120px; margin: 0px 20px 20px 20px;">
                Números
            </div>
        </div>
        <div id="descEle" class="dvPanel ui-state-active" style="width: 100px; margin: 20px 20px 0px 20px; position: absolute; display: none; z-index: 10001;">
            <span id="eleEle"></span>&nbsp de <span id="eleSelec"></span>&nbsp en el periodo
        <span id="elePer"></span>&nbsp de servicio <span id="eleSer"></span>
        </div>
        <div id="hisFil" class="dvPanel" style="width: 900px; height: 600px; display: none; margin: auto; box-shadow: 10px 10px 10px gray;">
            <%--<div id="hisFilTit" class="ui-state-default ui-corner-all" style="width: 890px; height: 20px;
            border: 0px dotted gray;">--%>
            <div id="toolbar" class="ui-widget-header ui-corner-all" style="width: 890px; float: right;">
                <div id="CloseHisFil" style="width: 10px; height: 10px; float: right;">Salir</div>
                <%--<span id="CloseHisFil" class="ui-icon ui-icon-circle-close" style="float: right;">
            </span>--%>
                <div id="end" style="float: right; margin-right: 30px;">Ultimo Historico</div>
                <div id="forward" style="float: right;">Siguiente Historico</div>
                <div id="rewind" style="float: right;">Historico Anterior</div>
                <div id="beginning" style="float: right;">Primer Historico</div>
                <span id="elecod" style="display: none;"></span><span id="content" style="font-size: 10pt; float: left;"></span>
            </div>
            <%--<div id="eliChart" style="position: absolute; left: 50%; top: 65px; width: 10px; height: 10px; border: 0px dotted gray; background-color: Black; z-index: 10002;">
                Eliminar estadistica
            </div>--%>
            <%--  </div>--%>
            <div id="hisFilBody" style="width: 890px; height: 570px; border: 0px dotted gray; overflow-x: scroll;">
            </div>
        </div>
        <iframe id="ifExcel" frameborder="0" style="padding: 0px; margin: 0px; display: none;"></iframe>
        <%--agregado 14-10-2013 wapumayta iframe para exportacion--%>
        <div id="divExportarImagenes" style="display: none;">
            <table width="100%">
                <tr>
                    <td align="center">
                        <b>Gráficos mostrados en la página</b>
                    </td>
                </tr>
                <tr>
                    <td id="tdReportesGraficos" runat="server"></td>
                </tr>
                <tr>
                    <td align="right">
                        <div id="btnDescargarSelec" runat="server">
                            Descargar
                        </div>
                        <div id="btnCerrarDialogDesc" runat="server">
                            Cerrar
                        </div>
                        <%--<div id="btnDescargarTodas" runat="server">
                        Descargar Todas
                    </div>--%>
                    </td>
                </tr>
            </table>
        </div>
        <iframe id="Iframe1" frameborder="0" style="padding: 0px; margin: 0px; display: none;"></iframe>
        <%--agregado 14-10-2013 wapumayta iframe para exportacion--%>
        <div id="div1" style="display: none;">
            <table width="100%">
                <tr>
                    <td align="center">
                        <b>Gráficos mostrados en la página</b>
                    </td>
                </tr>
                <tr>
                    <td id="td1" runat="server"></td>
                </tr>
                <tr>
                    <td align="right">
                        <div id="Div2" runat="server">
                            Descargar
                        </div>
                        <div id="Div3" runat="server">
                            Cerrar
                        </div>
                        <%--<div id="btnDescargarTodas" runat="server">
                        Descargar Todas
                    </div>--%>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</body>
</html>
