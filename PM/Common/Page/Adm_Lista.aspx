<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_Lista"
    CodeBehind="Adm_Lista.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register Src="../Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcel"
    TagPrefix="eeg" %>
<%@ Register Src="../Controles/ImportarExcelGenerico.ascx" TagName="ImportarExcelGenerico"
    TagPrefix="uc1" %>
<%@ Register Src="../Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="uc2" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="../Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <%--<script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("../Scripts/Utilitario.js")%>" type="text/javascript"></script>--%>
    <script src="../Scripts/Utilitario.js" type="text/javascript"></script>
    <style type="text/css">
        .table-responsive {
            display: block;
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            -ms-overflow-style: -ms-autohiding-scrollbar;
        }

        .overflowNone {
            overflow: hidden !important;
        }


        #TabDetalle_TabJQ1 {
            display: block;
            width: 100%;
            /*overflow-x: auto;*/
            -webkit-overflow-scrolling: touch;
            -ms-overflow-style: -ms-autohiding-scrollbar;
        }



        .FilabtVig {
            /*color:Red;
            padding:5px;    */
            border: 0px;
        }

        .FilaCampanaActiva {
            background: #cdeb8b; /* Old browsers */
            background: -moz-linear-gradient(top, #cdeb8b 0%, #cdeb8b 100%); /* FF3.6+ */
            background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#cdeb8b), color-stop(100%,#cdeb8b)); /* Chrome,Safari4+ */
            background: -webkit-linear-gradient(top, #cdeb8b 0%,#cdeb8b 100%); /* Chrome10+,Safari5.1+ */
            background: -o-linear-gradient(top, #cdeb8b 0%,#cdeb8b 100%); /* Opera 11.10+ */
            background: -ms-linear-gradient(top, #cdeb8b 0%,#cdeb8b 100%); /* IE10+ */
            background: linear-gradient(to bottom, #cdeb8b 0%,#cdeb8b 100%); /* W3C */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#cdeb8b', endColorstr='#cdeb8b',GradientType=0 ); /* IE6-9 */
            font-weight: bolder;
        }

        td[aria-describedby="grid_vcNomOpe"] {
            text-align: center !important;
        }
    </style>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Adm_Lista.js")%>" type="text/javascript"></script>
    <div id="dvLeyendaCam2" style="position: absolute; right: 50px; bottom: 0px; z-index: 999999; display: none;">
        <div style="float: left; width: 10px; height: 10px; border: 1px solid black; border-radius: 5px;"
            class="FilaCampanaActiva">
        </div>
        <div style="float: left; margin-left: 5px; font-weight: lighter; font-size: small;">
            Campaña Activa
        </div>
    </div>
    <form id="form1" runat="server">
        <div id="dvCargando" class="dvCargando">
        </div>
        <asp:HiddenField ID="hdfvcTab" runat="server" />
        <asp:HiddenField ID="hdfEdicion" runat="server" />
        <asp:HiddenField ID="hdfActivo" runat="server" />
        <asp:HiddenField ID="hdfVer" runat="server" />
        <asp:HiddenField ID="hdfFal" runat="server" />
        <asp:HiddenField ID="hdfDesactivo" runat="server" />
        <asp:HiddenField ID="hdfElim" runat="server" />
        <asp:HiddenField ID="hdfVerdadero" runat="server" />
        <asp:HiddenField ID="hdfFalso" runat="server" />
        <asp:HiddenField ID="hdfCampBool" runat="server" />
        <asp:HiddenField ID="hdfinTipOri" runat="server" />
        <asp:HiddenField ID="hdfCodEntidad" runat="server" />
        <asp:HiddenField ID="hdfValorPorDefecto" runat="server" />
        <asp:HiddenField ID="hdfNumMaxNivel" runat="server" />
        <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
        <asp:HiddenField ID="hdfArchivo" runat="server" />
        <asp:HiddenField ID="hdfRutaCompleta" runat="server" />
        <asp:HiddenField ID="hdfLicencia" runat="server" />

        <div id="divMsgConfirmacion" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <asp:Label ID="lblMensajeConfirmacion" runat="server" Text=""></asp:Label>
        </div>
        <div id="divMsgSubConfirmacion" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <asp:Label ID="lblMensajeSubConfirmacion" runat="server" Text=""></asp:Label>
        </div>
        <div id="divAviso" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <asp:Label ID="lblAviso" runat="server" Width="200px" Text=""></asp:Label>
        </div>
        <div id="divMsjRestaurarLineas" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <asp:Label ID="lblMensajeActivarEmpleado" runat="server" Width="270px" Text="Los empleados por activar tenian lineas antes de ser dados de baja, ¿Desea restaurar las líneas de los empleados?."></asp:Label>
            <div id="dvLineasRestaurar" style="display: none; width: 280px; height: 60px; overflow: auto">
                <table id="tbLineasRestaurar" width="100%">
                </table>
            </div>
        </div>
        <cc1:TabJQ runat="server" ID="TabDetalle" CssClass="tabs" Style="margin-top: 1px;"
            BorderStyle="None" BorderWidth="0">
            <cc1:ContenedorTabJQ Titulo="Detalle" BorderStyle="None" BorderWidth="0">
                <table class="dvPanel" width="100%">
                    <tr class="trToolBar" align="center" style="margin: 0px !important; padding: 0px !important; overflow: auto;">
                        <td align="center">
                            <div id="toolbar" class="ui-widget-content ui-corner-all" style="margin: 0px !important; padding: 0px !important; overflow: hidden;">
                                <table border="0" width="100%">
                                    <tr>
                                        <%--<td style="width:200px; padding-right:10px;">
                                        <asp:Label ID="lblTituloOpciones" runat="server" Text="Opciones" CssClass="lblToolBAR"></asp:Label>
                                    </td>--%>
                                        <td>&nbsp;
                                        </td>
                                        <td style="width: 80px; padding-right: 10px;">
                                            <table id="tblAcciones" runat="server" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <div id="btnAgregar" class="btnNormal" runat="server" title="Nuevo" click="AgregarRegistro">
                                                            <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div id="btnEditar" class="btnNormal" runat="server" title="Editar Seleccionado"
                                                            click="EditarRegistro">
                                                            <asp:Image ID="imgEditar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div id="btnEditarSimple" class="btnNormal" runat="server" title="*Editar Seleccionado"
                                                            click="EditarRegistro">
                                                            <asp:Image ID="imgEditarSimple" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div id="btnEliminar" class="btnNormal" runat="server" title="Eliminar Seleccionados"
                                                            click="EliminarRegistro">
                                                            <asp:Image ID="imgEliminar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" />
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div id="btnVerDetalle" class="btnNormal" runat="server" title="Ver Seleccionados"
                                                            click="EditarRegistro">
                                                            <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/VerDetalle.png" />
                                                        </div>
                                                    </td>

                                                </tr>
                                            </table>
                                        </td>
                                        <td style="width: 40px; padding-right: 10px;">
                                            <table id="tblEstado" runat="server" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <div id="btnActivar" class="btnNormal" runat="server" title="Activar Seleccionados"
                                                            click="ActivarRegistro">
                                                            <asp:Image ID="imgActivar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Activar_16x16.png" />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td style="width: 40px; padding-right: 10px;">
                                            <table id="tblFiltroBusqueda" cellpadding="0" cellspacing="0" runat="server">
                                                <tr>
                                                    <td>
                                                        <div id="btnConfigurarFiltroRegistro" class="btnNormal" runat="server" title="Configurar filtro de registro"
                                                            click="ConfigurarFiltroRegistro">
                                                            <asp:Image ID="imgConfigurarFiltroRegistro" runat="server" ImageUrl="~/Common/Images/Mantenimiento/VistaDetalle.png" />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td>
                                            <table id="tblAvanzada" runat="server" cellpadding="0" cellspacing="0">
                                                <tr id="trAvanzada" runat="server">
                                                </tr>
                                            </table>
                                        </td>






                                        <td style="width: 80px; padding-right: 10px;" class="mobileHide">
                                            <table id="Table1" runat="server" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <div id="btnLiberacionLinea" class="btnNormal" runat="server" title="Liberar Empleado o Dispositivo de la(s) línea(s)" click="LiberarLinea">
                                                            <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/mobile.png" Width="16px" Height="16px" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div id="btnDownload" class="btnNormal" runat="server" title="Descargar Plantilla" click="DownloadPlantilla">
                                                            <asp:Image ID="imgDownload" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Download_16x16.png" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div id="btnUpload" class="btnNormal" runat="server" title="Subir Plantilla" click="UploadPlantilla">
                                                            <asp:Image ID="ImgUpload" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Upload_16x16.png" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div id="btnLiberacionDispositivo" class="btnNormal" runat="server" title="Liberar Empleado o Línea del dispositivo" click="LiberarDispositivo">
                                                            <asp:Image ID="ImageLiberacionDispositivo" runat="server" ImageUrl="~/Common/Images/Mantenimiento/mobile.png" Width="16px" Height="16px" />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>

                                        <td class="mobileHide">
                                            <table border="0" id="tblFiltro" runat="server">
                                                <tr>
                                                    <td style="width: 80px; height: 32px">
                                                        <asp:Label ID="lblFiltro" runat="server" Text="" CssClass="lblToolBAR"></asp:Label>
                                                    </td>
                                                    <td rowspan="2" valign="middle" style="width: 200px">
                                                    <asp:DropDownList ID="ddlBusqueda" runat="server" Style="margin-left: 15px; font-weight: normal;"
                                                        Width="150px">
                                                    </asp:DropDownList>
                                                    </td>
                                                    <td id="tdfiltro" rowspan="2" valign="middle" style="width: 220px">
                                                        <a id="lblfitxtfiltro">Filtrar:</a> &nbsp;
                                                    <asp:TextBox ID="txtBusqueda" CssClass="txtBusqueda" runat="server" Text="Valor a filtrar"
                                                        Style="margin-left: 15px; font-weight: normal;" Width="140px" MaxLength="200"></asp:TextBox>
                                                    </td>
                                                    <td id="tdfiltro2" valign="middle" style="width: 165px; display: none;">Hasta:&nbsp;   
                                                        <asp:TextBox ID="txtBusqueda2" CssClass="txtBusqueda" runat="server" Text=""
                                                            Style="margin-left: 15px; font-weight: normal;" Width="70px" MaxLength="200"></asp:TextBox>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td class="mobileHide">
                                            <div id="dvLeyendaCam" style="display: none;">
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <div style="float: left; width: 10px; height: 10px; border: 1px solid black; border-radius: 5px;"
                                                                class="FilaCampanaActiva">
                                                            </div>
                                                        </td>
                                                        <td style="font-weight: lighter; font-size: small;" width="140px">Campaña Activa
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
                    <tr>
                        <td>
                            <table id="grid">
                            </table>
                            <div id="pager">
                            </div>
                        </td>
                    </tr>
                </table>
            </cc1:ContenedorTabJQ>
        </cc1:TabJQ>
        <div id="divListado" style="display: none;">
        </div>
        <div id="dvColumna" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifColumna" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
        </div>

        <div id="dvHistorico" style="display: none; overflow: hidden;">
            <iframe id="ifHistorico" frameborder="0" style="padding: 0px; margin-left: -10px; margin: -10px; overflow: hidden"
                scrolling="no"></iframe>
        </div>

        <div id="dvImportacion" style="display: none; padding: 0px; margin: 0px; overflow-y: hidden;">
            <table cellpadding="0" cellspacing="0">
                <tr>
                    <%--<td>Seleccione Plantilla: </td>--%>
                    <td style="width: 440px;">
                        <iframe id="ifCargarPlantilla" frameborder="0" style="padding: 0px; margin: 0px; height: 105px; width: 482px;"
                            src="../../Common/Page/Adm_CargarArchivo.aspx?Formatos=.xls,.xlsx&FormatoTipo=Excel"></iframe>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblArchivoCargado" runat="server" Text="" CssClass="lblDescargar" Style="display: none;"></asp:Label>
                    </td>
                </tr>
            </table>
        </div>

        <div id="dvTipoDownload" style="display: none; padding: 0px; margin: 0px;">
            <table>
                <tr style="height: 30px;">
                    <td style="width: 130px;">Tipo de Descarga: </td>
                    <td style="width: 440px;">

                        <asp:RadioButtonList ID="rbtnTipoDescarga" CssClass="radioButtonList" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Value="1">Solo Plantilla</asp:ListItem>
                            <asp:ListItem Value="2">Plantilla con Datos</asp:ListItem>
                        </asp:RadioButtonList>

                    </td>
                </tr>
                <tr id="trNivel" style="display: none; height: 30px;">
                    <td style="width: 130px;">Niveles de la Organización: </td>
                    <td>
                        <asp:DropDownList ID="ddlNiveles" runat="server" Style="margin-left: 15px; font-weight: normal;" Width="180px">
                            <asp:ListItem Value="-1" Text="<Seleccionar>" Selected="True"></asp:ListItem>
                            <asp:ListItem Value="1">1</asp:ListItem>
                            <asp:ListItem Value="2">2</asp:ListItem>
                            <asp:ListItem Value="3">3</asp:ListItem>
                            <asp:ListItem Value="4">4</asp:ListItem>
                            <asp:ListItem Value="5">5</asp:ListItem>
                            <asp:ListItem Value="6">6</asp:ListItem>
                            <asp:ListItem Value="7">7</asp:ListItem>
                            <asp:ListItem Value="8">8</asp:ListItem>
                            <asp:ListItem Value="9">9</asp:ListItem>
                            <asp:ListItem Value="10">10</asp:ListItem>
                        </asp:DropDownList>
                    </td>
                </tr>
            </table>
            <br />
            <div style="text-align: right;">
                <div id="btnDescargarPlantillaRRHH" class="btnNormal" runat="server" title="Descargar Plantilla RRHH" click="DescargarPlantilla">
                    <asp:Image ID="imgGuardarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Download_16x16.png" />
                    <a>Descargar</a>
                </div>
                <div id="btnCerrarPlantillaRRHH" class="btnNormal" runat="server" title="Cerrar" click="ClosePlantilla">
                    <asp:Image ID="imgCerrarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    <a>Cerrar</a>
                </div>
            </div>
        </div>

        <div id="dvLiberarLinea" style="display: none;">
            <p>
                Si la línea tiene un empleado o dispositivo asociado, se puede liberar:
            </p>
            <ul style="list-style-type: none;">
                <li>
                    <asp:CheckBox ID="ChkLiberarEmpleado" runat="server" Text="Empleado" />
                </li>
                <li>
                    <asp:CheckBox ID="ChkLiberarDispositivo" runat="server" Text="Dispositvo" />
                </li>
            </ul>
            <span>¿Desea continuar?</span>

            <%--<div style="text-align: right;">
                <div id="btnAceptarPopup" class="btnNormal" runat="server" title="Liberar Linea" click="EnviarLineasALiberar">
                    <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                    <a>Aceptar</a>
                </div>
                <div id="btnCerrarPopup" class="btnNormal" runat="server" title="Cerrar" click="CerrarDialog">
                    <asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    <a>Cerrar</a>
                </div>
            </div>--%>
        </div>

        <div id="dvLiberarDispositivo" style="display: none;">
            <p>
                Si el dispositivo tiene un empleado o una línea asociada, se puede liberar:
            </p>
            <ul style="list-style-type: none;">
                <li>
                    <asp:CheckBox ID="chkLiberarEmpleado_deDispositivo" Text="Empleado" runat="server" />
                </li>
                <li>
                    <asp:CheckBox ID="chkLiberarLinea_deDispositivo" Text="Línea" runat="server" />
                </li>
            </ul>
            <span>¿Desea continuar?</span>
        </div>

        <div id="MsgConfirmacionDownloadPlantilla" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            <label id="lblMsgDownlaod" style="display: none;">
                Se prodecerá a descargar la Plantilla Sincronizador de RRHH.
            </label>
            <br />
            <br />
            ¿Desea continuar?
        </div>


        <div id="dvArea" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifArea" width="730" height="470" frameborder="0" style="padding: 0px; margin: 0px;"></iframe>
        </div>
        <iframe id="ifExcel" frameborder="0" style="padding: 0px; margin: 0px; display: none;"></iframe>
        <div id="dvFiltroRegistro" class="dvPanel" style="display: none; width: 75px; position: absolute;">
            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td>
                        <asp:RadioButton ID="rbtnActivos" runat="server" Text="Activos" GroupName="rbtnFiltroRegistro"
                            Checked="true" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:RadioButton ID="rbtnInactivos" runat="server" Text="Inactivos" GroupName="rbtnFiltroRegistro" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:RadioButton ID="rbtnTodos" runat="server" Text="Todos" GroupName="rbtnFiltroRegistro" />
                    </td>
                </tr>
            </table>
        </div>

        <ul id="ulListaReportes" runat="server" style="position: absolute;">
        </ul>

        <eeg:ExportarExcel ID="eeListado" runat="server" Visible="false" />
        <uc1:ImportarExcelGenerico ID="ExcelImport" runat="server" Visible="false" />
        <div id="MsgConfirmacionEliminarLinea" runat="server" style="display: none;">
            <%--¿Desea dar de baja los dispositivos asociados de las líneas de tipo "Staff" seleccionadas?--%>
            <%--¿Desea desactivar los registros de los dispositivos asociados a las líneas seleccionadas
        si las tuviera?--%>
            ¿Desea dar de baja a los dispositivos asociados a las líneas seleccionadas?
        <br />
            <br />
            <%--Los dispositivos asociados a las líneas del tipo "Familia" seleccionadas se darán de baja--%>
            <%--Los dispositivos asociados a las líneas seleccionadas del tipo "Staff" pueden darse de baja o liberarse--%>
            <%--Además; los empleados asociados a las líneas de <b>staff</b> seleccionadas, serán
        desvinculados de estas--%>
        </div>


    </form>
</body>
</html>
