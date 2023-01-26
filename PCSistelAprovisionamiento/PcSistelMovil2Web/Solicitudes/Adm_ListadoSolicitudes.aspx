<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Adm_ListadoSolicitudes.aspx.cs"
    Inherits="PcSistelMovil2Web.Solicitudes.Adm_ListadoSolicitudes" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register Src="../Common/Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcelGenerico"
    TagPrefix="eeg" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/Sitio.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/JqueryThemeRoller/redmond/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/json2.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../Common/Styles/Principal2.css" rel="stylesheet" type="text/css" />
    <script src="Adm_ListadoSolicitudes.js" type="text/javascript"></script>
    <script src="../Common/Scripts/FusionCharts/FusionCharts.js" type="text/javascript"></script>
    <script src="../Common/Scripts/FusionCharts/FusionCharts.jqueryplugin.js" type="text/javascript"></script>
    <script src="../Common/Scripts/FusionCharts/FusionCharts.HC.js" type="text/javascript"></script>
    <script src="../Common/Scripts/date.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jquery.datepicker.es.js" type="text/javascript"></script>
    <link href="../Styles/component.css" rel="stylesheet" type="text/css" />
    <script src="../Common/Scripts/jquery.timer.js" type="text/javascript"></script>
    <style type="text/css">
        .EstiloBotonImportacion
        {
            color: #1d5987;
            border: 2px;
            background-color: #dfeffc;
            border-color: #79b7e7;
            font-weight: bold;
            border-style: solid;
            padding: 4px;
            font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;
            font-size: 11px !important;
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
        }
        
        #gview_gridCuentasImportacion div.ui-jqgrid-bdiv
        {
            overflow-x: hidden !important;
        }
        
        .pgGrilla
        {
            height: 16px !important;
        }
        
        .ui-progressbar-value
        {
            height: 16px !important;
            background-image: url(../../Common/images/Mantenimiento/pbar-ani.gif);
        }
        
        #dvContenidoAlertaExterna
        {
            font-size: 100% !important;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div id="dvMsgAlerta" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <div id="dvContenidoAlerta">
        </div>
    </div>

    <asp:HiddenField ID="Hdf_IdUsuario" runat="server" />
    <asp:HiddenField ID="Hdf_IdDominioCuenta" runat="server" />
    <asp:HiddenField ID="Hdf_IdSuscripcionCuenta" runat="server" />
    <asp:HiddenField ID="hdf_tamanioimportacion" runat="server" />
    <asp:HiddenField ID="hdf_MaximoProcesamiento" runat="server" />
    <asp:HiddenField ID="hdTamanioBaseMovil_MB" runat="server" />
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfTecnico" runat="server" />
    <asp:HiddenField ID="hdfResApr" runat="server" />
    <asp:HiddenField ID="hdfOperador" runat="server" />
    <asp:HiddenField ID="hdfGruTipSol" runat="server" />
    <asp:HiddenField ID="hdfGruTipSolEdi" runat="server" />
    <asp:HiddenField ID="hdfGruTipSolEli" runat="server" />
    <asp:HiddenField ID="hdfResAprTipSol" runat="server" />
    <asp:HiddenField ID="hdfUsuTipSolCre" runat="server" />
    <asp:HiddenField ID="hdfUsuTipSolEdi" runat="server" />
    <%--<asp:HiddenField ID="hdfUsuTipSolEli" runat="server" />--%>
    <asp:HiddenField ID="hdfTecResSol" runat="server" />
    <asp:HiddenField ID="hdfvcTab" runat="server" />
    <%--        <asp:HiddenField ID="hdfCodEmpleado" runat="server" />
        <asp:HiddenField ID="hdfGrupOrigEmp" runat="server" />--%>
    <asp:HiddenField ID="hdfBusquedaIni" runat="server" />
    <asp:HiddenField ID="hdfIsAccessAdd" runat="server" />
    <asp:HiddenField ID="hdfdaFechaIni" runat="server" />
    <asp:HiddenField ID="hdfdaFechaFin" runat="server" />
    <asp:HiddenField ID="hdfIsActive_2" runat="server" Value = "0" />
    <asp:HiddenField ID="hdfIsActive_1" runat="server" Value = "0" />

    <div id="dvMsgAlertaExterna" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <div id="dvContenidoAlertaExterna">
        </div>
    </div>
    <div id="dvSubirArchivo" style="display: none; overflow: hidden;">
        <table>
            <tr>
                <td>
                    <iframe id="ifcargarExcel" frameborder="0" style="padding: 0px; margin: 0px; border: 0px solid #a6c9e2;"
                        width="330px" height="170px;" scrolling="no"></iframe>
                </td>
            </tr>
        </table>
    </div>
    <cc1:TabJQ runat="server" ID="TabDetalle" CssClass="tabs" Style="margin-top: 1px; display: none;">
        <cc1:ContenedorTabJQ Titulo="Detalle">
            <table width="100%">
                <tr class="trToolBar" align="center">
                    <td align="center">
                        <div id="toolbar" class="dvPanel" style="margin: 0px !important; padding: 0px !important;">
                            <table id="tbGeneral" width="100%">
                                <tr>

                                    <td style="padding-right: 5px; width: 100px;">
                                        <table id="tblAcciones" runat="server" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <div id="btnAgregar" class="btnNormal" runat="server" title="Nuevo" visible="false">
                                                        <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div runat="server" id="btnEditar" class="btnNormal" title="Editar" visible="false">
                                                        <asp:Image ID="imgEditar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div runat="server" id="btnProcesar" class="btnNormal" title="Procesar" visible="false">
                                                        <asp:Image ID="imgProcesar" runat="server" ImageUrl="../Common/Images/Mantenimiento/Proceso.png" />
                                                    </div>
                                                    <div runat="server" id="btnEnviar" class="btnNormal" title="Enviar" visible="false">
                                                        <asp:Image ID="Image1" runat="server" ImageUrl="../Common/Images/Mantenimiento/Aprobar.png" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div runat="server" id="btnVerDetalle" class="btnNormal" title="Ver Detalle" visible="false">
                                                        <asp:Image ID="imgVerDetalle" runat="server" ImageUrl="../Common/Images/Mantenimiento/VerDetalle.png" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div runat="server" id="btnEnviarCorreoCliente" style="display: none;" class="btnNormal"
                                                        runat="server" title="Enviar correo Cliente">
                                                        <asp:Image ID="imgEnviarCorreoCliente" runat="server" ImageUrl="../Common/Images/Mantenimiento/enviarcorreousuario.png" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div runat="server" id="btnEliminar" class="btnNormal" title="Eliminar" visible="false">
                                                        <asp:Image ID="imgEliminar" runat="server" ImageUrl="../Common/Images/Mantenimiento/delete_16x16.gif" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>


                                    <td runat="server" id="tdvista" style="width: 100px; padding-right: 5px;">
                                        <table id="tbVista" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <div id="btnVista" class="btnNormal" runat="server" title="Elija un tipo de vista" click="ConfigurarFiltroRegistro">
                                                        <asp:Image ID="imgVista" runat="server" ImageUrl="../Common/Images/Mantenimiento/Views.png" />
                                                    </div>
                                                </td>
                                                <td style="width: 95px; text-align: left; padding-left: 1px;">
                                                    <span runat="server" id="lblVista">Mis Solicitudes</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>


                                    <td style="width: 5px;">
                                    </td>
                                    <td>
                                        <table>
                                            <tr>
                                                <td>
                                                    <table id="tblSubirArchivo" runat="server" visible="false">
                                                        <tr>
                                                            <td>
                                                                <div id="btnSubir" class="btnNormal" runat="server" title="Cargar Solicitud" visible="false">
                                                                    <asp:Image ID="Image2" runat="server" ImageUrl="../Common/Images/Mantenimiento/abrir.png" />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span runat="server" id="Span1">Cargar Solicitudes</span>
                                                            </td>
                                                            <td style="width: 5px;">
                                                            </td>
                                                            <td>
                                                                <div class="btnNormal" id="bdDescargarPlantilla" title="Descargar plantilla de Solicitud">
                                                                    <img src="../Common/images/Mantenimiento/BajarArchivo.png" /></div>
                                                            </td>
                                                            <td>
                                                                <span runat="server" id="Span2">Descargar Plantilla</span>
                                                            </td>
                                                            <td style="width: 5px;">
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>
                                                <table id="Table1" runat="server"  >
                                                        <tr>
                                                            <td>
                                                                <div class="btnNormal" id="btnVerActualizarEstado" title="Actualizar Estado">
                                                                    <img src="../Common/images/Mantenimiento/BajarArchivo.png" /></div>
                                                            </td>
                                                            <td>
                                                                <span runat="server" id="Span3">Actualizar Estado</span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>

                                    <td style="padding-right: 10px;">
                                        <table runat="server" id="tbAprobar" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <div id="btnAprobar" class="btnNormal" runat="server" title="Aprobar" visible="false">
                                                        <asp:Image ID="imgAprobar" runat="server" ImageUrl="../Common/Images/Mantenimiento/Aprobar.png" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div id="btnRechazar" class="btnNormal" runat="server" title="Rechazar" visible="false">
                                                        <asp:Image ID="imgRechazar" runat="server" ImageUrl="../Common/Images/Mantenimiento/Rechazar.png" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div id="btnAsignar" class="btnNormal" runat="server" title="Asignarme una Solicitud"
                                                        style="height: 24px;" visible="false">
                                                        <asp:Image ID="imgAsignar" runat="server" Style="margin-top: -2px;" ImageUrl="~/Common/Images/Mantenimiento/Asignar.png" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <span runat="server" id="lblAsignarme" style="padding-left: 10px;">Asignarme</span>
                                                </td>
                                                <td>
                                                    <div id="btnAsignarA" class="btnNormal" runat="server" title="Asignar solicitudes a"
                                                        style="height: 24px;" visible="false">
                                                        <asp:Image ID="imgAsignarA" runat="server" ImageUrl="../Common/Images/Mantenimiento/Atender.png" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div id="btnReasignarA" class="btnNormal" runat="server" title="Asignar solicitudes a"
                                                        style="height: 24px;" visible="false">
                                                        <asp:Image ID="imgReasignarA" runat="server" ImageUrl="../Common/Images/Mantenimiento/Atender.png" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td style="padding-right: 2px;">
                                    </td>
<%--                                </tr>

                                <tr>--%>
                                    <td colspan="8">
                                        <table border="0">
                                            <tr>
                                                <td style="width: 40px; height: 32px">
                                                    <asp:Label ID="lblFiltro" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
                                                </td>
                                                <td>
                                                    En:
                                                </td>
                                                <%--<td rowspan="2" valign="middle" style="width:190px;">--%>
                                                <td valign="middle" style="width: 145px;">
                                                    <asp:DropDownList ID="ddlFiltro" runat="server" Width="145px">
                                                        <asp:ListItem Value="1" Text="Código"></asp:ListItem>
                                                        <asp:ListItem Value="2" Text="Fecha"></asp:ListItem>
                                                        <%--<asp:ListItem Value="3" Text="Empleado"></asp:ListItem>--%>
                                                        <%-- <asp:ListItem Value="4" Text="Estados de Aprobación"></asp:ListItem>--%>
                                                        <asp:ListItem Value="5" Text="Estados de Proceso"></asp:ListItem>
                                                        <asp:ListItem Value="6" Text="Tipo de Solicitud"></asp:ListItem>
                                                        <%--<asp:ListItem Value="6" Text="--Por Revisar--"></asp:ListItem>--%>
                                                    </asp:DropDownList>
                                                </td>
                                                <td rowspan="2" valign="middle" style="width: 0px"> <%--style="width: 40px"--%>
                                                    <div id="dvFiltrar">
                                                        Filtrar:</div>
                                                </td>
                                                <td style="width: 215px; text-align: left;"><%-- style="width: 240px; text-align: left;" --%>
                                                    <div id="divCodigo">
                                                        <asp:TextBox ID="txtCodigo" runat="server" Width="140px"></asp:TextBox></div>
                                                    <div id="divFecha">
                                                        <asp:TextBox ID="txtFechaIni" runat="server" Width="90px" ToolTip="Fecha Inicio"
                                                            ReadOnly="True"></asp:TextBox>
                                                        -
                                                        <asp:TextBox ID="txtFechaFin" runat="server" Width="90px" ToolTip="Fecha Fin" ReadOnly="True"></asp:TextBox>
                                                    </div>
                                                    <div id="divEmpleado">
                                                        <asp:TextBox ID="txtEmpleado" runat="server" Width="160px"></asp:TextBox></div>
                                                    <div style="float: left;" id="divTipoSolicitud">
                                                        <asp:DropDownList ID="ddlTipo" runat="server" Width="155px">
                                                        </asp:DropDownList>
                                                    </div>
                                                    <div style="float: left; display: none;" id="divTipoSolicitudTec">
                                                        <asp:DropDownList ID="ddlTipoTec" runat="server" Width="155px">
                                                        </asp:DropDownList>
                                                    </div>
                                                    <div style="float: left; display: none;" id="divTipoSolicitudResApr">
                                                        <asp:DropDownList ID="ddlTipoResApr" runat="server" Width="155px">
                                                        </asp:DropDownList>
                                                    </div>
                                                    <div style="float: left; display: none;" id="divEstadoApr">
                                                        <asp:DropDownList ID="ddlEstadoApr" runat="server" Width="155px">
                                                        </asp:DropDownList>
                                                    </div>
                                                    <div style="float: left; display: none;" id="divEstadoPro">
                                                        <asp:DropDownList ID="ddlEstadoPro" runat="server" Width="155px">
                                                        </asp:DropDownList>
                                                    </div>
                                                </td>
                                                <td id="tdFecha" rowspan="2" valign="middle" style="width: 290px">
                                                    <div id="divRangoFecha">
                                                        <table border="0">
                                                            <tr>
                                                                <td style="height: 32px">
                                                                    <b>Rango de Fecha:</b>&nbsp;&nbsp;&nbsp;
                                                                </td>
                                                                <td style="height: 32px">
                                                                    <asp:TextBox ID="txtRangoFechaIni" runat="server" Width="70px" ToolTip="Fecha Inicio"
                                                                        ReadOnly="True"></asp:TextBox>
                                                                    -
                                                                    <asp:TextBox ID="txtRangoFechaFin" runat="server" Width="70px" ToolTip="Fecha Fin"
                                                                        ReadOnly="True"></asp:TextBox>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </td>
                                                <td style="padding-right: 5px;">
                                                    <table id="tbExportar" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td>
                                                                <div id="btnExportarExcel" class="btnNormals" runat="server" title="Exportar a Excel">
                                                                    <eeg:ExportarExcelGenerico ID="eeListado" runat="server" />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td align="left" runat="server" visible="false">
                                                    <asp:CheckBox ID="chkSolNoVista" runat="server" Checked="false" />Solicitudes No
                                                    Vistas
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table id="grid" runat="server">
                        </table>
                        <div id="pager">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table runat="server" id="tblLeyenda">
                            <tr>
                                <td style="width: 100px; height:10px;">
                                    <label id="Label5" style="font-size: 11px; font-weight: 300;">
                                        Leyenda de Colas :</label>
                                </td>
                                <td style="width: 20px;">
                                </td>
                                <td>
                                    <img src="../Common/images/Semaforos/Ambar_16x16.png" />
                                </td>
                                <td>
                                    <label id="Label1" style="font-size: 11px;">
                                        Pendiente</label>
                                </td>
                                <td style="width: 20px;">
                                </td>
                                <td>
                                    <img src="../Common/images/Semaforos/Azul_16x16.png" />
                                </td>
                                <td>
                                    <label id="Label2" style="font-size: 11px;">
                                        En proceso</label>
                                </td>
                                <td style="width: 20px;">
                                </td>
                                <td>
                                    <img src="../Common/images/Semaforos/Rojo_16x16.png" />
                                </td>
                                <td>
                                    <label id="Label3" style="font-size: 11px;">
                                        Error</label>
                                </td>
                                <td style="width: 20px;">
                                </td>
                                <td>
                                    <img src="../Common/images/Semaforos/Verde_16x16.png" />
                                </td>
                                <td>
                                    <label id="Label4" style="font-size: 11px;">
                                        Culminada</label>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </cc1:ContenedorTabJQ>
    </cc1:TabJQ>
    <%--Fin del tab contenedor--%>
    <div style="margin-top: 5px;">
    </div>
    <div id="dvNota" style="display: none;">
        <iframe id="ifNota" scrolling="no" frameborder="0" style="padding: 0px; margin: 0px;
            height: 470px; width: 670px;"></iframe>
    </div>
    <div id="dvCola" style="display: none; overflow: hidden;">
        <iframe id="ifCola" frameborder="0" style="padding: 0px; margin-left: -10px; overflow: hidden"
            scrolling="no"></iframe>
    </div>
    <div id="divConRec" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>¿Está seguro que
        desea rechazar las solicitudes seleccionadas?
    </div>
    <div id="divConApr" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>¿Está seguro que
        desea aprobar las solicitudes seleccionadas?
    </div>
    <div id="divConAsi" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>¿Está seguro que
        desea asignarse las solicitudes seleccionadas?
    </div>
    <div id="divEnviarSolicitud" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>¿Está seguro que
        desea Enviar la Solicitud?
    </div>
    <div id="divUpgrade" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>¿Está seguro que
        desea Procesar la solicitud de Upgrade de licencia?
    </div>
    <div id="divConAsiSolA" style="display: none;">
        <table>
            <tr>
                <td>
                    Técnico Responsable
                </td>
                <td>
                </td>
            </tr>
        </table>
    </div>
    <div id="divConEli" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>¡Atención!, se eliminará
        de forma permanente la solicitud elegida y los elementos relacionados (Notas y seguimientos
        de Estado). ¿Desea continuar?
    </div>
    <div id="dvRechazar" style="display: none;">
        <table>
            <tr>
                <td>
                    Comentarios
                </td>
            </tr>
            <tr>
                <td>
                    <asp:TextBox ID="txtComentarios" runat="server" Width="460px" TextMode="MultiLine"
                        MaxLength="2000"></asp:TextBox>
                </td>
            </tr>
        </table>
    </div>
    <div id="dvVistas" class="dvPanel" style="display: none; width: 92px;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr id="trGeneral">
                <td>
                    <asp:RadioButton ID="rbtGeneral" runat="server" Text="General" GroupName="rbtnVistas"
                        Checked="true" />
                </td>
            </tr>
            <tr runat="server" id="trPendiente" visible="false">
                <td>
                    <asp:RadioButton ID="rbtPendiente" runat="server" Text="Mis Pendientes" GroupName="rbtnVistas" />
                </td>
            </tr>
            <tr runat="server" id="trPorAprobar" visible="false" style="display: none;">
                <td>
                    <asp:RadioButton ID="rbtPorAprobar" runat="server" Text="Por Aprobar" GroupName="rbtnVistas" />
                </td>
            </tr>
            <tr runat="server" id="trAprobada" visible="false" style="display: none;">
                <td>
                    <asp:RadioButton ID="rbtAprobada" runat="server" Text="Aprobadas" GroupName="rbtnVistas" />
                </td>
            </tr>
            <tr runat="server" id="trRechazada" visible="false" style="display: none;">
                <td>
                    <asp:RadioButton ID="rbtRechazada" runat="server" Text="Rechazadas" GroupName="rbtnVistas" />
                </td>
            </tr>
            <tr runat="server" id="trPorAsignar" visible="false" style="display: none;">
                <td>
                    <asp:RadioButton ID="rbtPorAsignar" runat="server" Text="Por Asignar" GroupName="rbtnVistas" />
                </td>
            </tr>
            <tr runat="server" id="trEnProceso" visible="false" style="display: none;">
                <td>
                    <asp:RadioButton ID="rbtEnProceso" runat="server" Text="En Proceso" GroupName="rbtnVistas" />
                </td>
            </tr>
            <tr runat="server" id="trCulminada" visible="false" style="display: none;">
                <td>
                    <asp:RadioButton ID="rbtCulminada" runat="server" Text="Culminadas" GroupName="rbtnVistas" />
                </td>
            </tr>
            <tr runat="server" id="trAnulada" visible="false" style="display: none;">
                <td>
                    <asp:RadioButton ID="rbtAnulada" runat="server" Text="Anuladas" GroupName="rbtnVistas" />
                </td>
            </tr>
            <%--                <tr><td>
                    <input type="radio" id="rbtGeneral"  name="rbtnVistas" checked/>
                    <span id="lblGeneral">General</span>
                </td></tr>
                <tr><td>
                    <input type="radio" ID="rbtPendiente" runat="server" Text="Pendientes" name="rbtnVistas"/>
                    <span id="lblPendiente">Pendientes</span>
                </td></tr>
                <tr><td><input type="radio" ID="rbtPorAprobar" runat="server" Text="Por Aprobar" name="rbtnVistas"/></td></tr>
                <tr><td><input type="radio" ID="rbtAprobada" runat="server" Text="Aprobadas" name="rbtnVistas"/></td></tr>
                <tr><td><input type="radio" ID="rbtRechazada" runat="server" Text="Rechazadas" name="rbtnVistas"/></td></tr>
                <tr><td><input type="radio" ID="rbtPorAsignar" runat="server" Text="Por Asignar" name="rbtnVistas"/></td></tr>
                <tr><td><input type="radio" ID="rbtEnProceso" runat="server" Text="En Proceso" name="rbtnVistas"/></td></tr>
                <tr><td><input type="radio" ID="rbtCulminada" runat="server" Text="Culminadas" name="rbtnVistas"/></td></tr>
                <tr><td><input type="radio" ID="rbtAnulada" runat="server" Text="Anuladas" name="rbtnVistas"/></td></tr>--%>
        </table>
    </div>
    <div id="divMsgConfirmar" style="display: none;">
        <asp:Label ID="lblMsjConfirmacion" runat="server"></asp:Label>
    </div>
    <div id="dvTecRes">
        <%-- <uc1:BusquedaPrincipal ID="bpTecRes" runat="server" Ancho="200"/>--%>
    </div>
    <div>
    </div>
    <div id="dvActualizarEstado" style="display: none;">
        El estado actual de la suscripción es <label id="lblNombreEstadoActual" style="font-weight: bold;"></label>.<br /><br />
        Lista de tareas restantes:<br/><br/>
        &nbsp;&nbsp;&nbsp;<asp:DropDownList ID="ddlTareasRestantes" runat="server"></asp:DropDownList>
        <%--<label id="lblNombreEstadoNuevo" style="font-weight: bold;"></label>--%>
        <br /><br />
        Al cambiar el estado está confirmando que la tarea seleccionada ya ha sido realizada.        
    </div>
    <div id="divMasivo" style="display: none;">
        <br />
        <div id="btnAsignarMasivo" class="btnNormalMasivo" style="width: 120px;">
            <div class="btnDivMasivo" style="margin: 5px;">
                Asignar valores
            </div>
        </div>
        <br />
        <br />
        <table id="gridMasivo" runat="server">
        </table>
        <div id="pagerMasivo">
        </div>
        <br />
        <div id="dvAcciones" style="margin-left: 5px; text-align: right;">
            <div id="btnProcesarMasivo" class="btnNormalMasivo" style="width: 100px;">
                <div class="btnDivMasivo">
                    <asp:Image ID="Image3" runat="server" CssClass="btnImgMasivo" ImageUrl="~/Common/images/Mantenimiento/Procesar.png" />
                    Procesar
                </div>
            </div>
            <div id="btnCerrarMasivo" class="btnNormalMasivo" style="width: 100px;">
                <div class="btnDivMasivo">
                    <asp:Image ID="Image4" runat="server" CssClass="btnImgMasivo" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    Cerrar
                </div>
            </div>
        </div>
    </div>
    <div id="divMasivoTitulares" style="display: none;">
        <br />
        <table id="gridMasivoTitulares" runat="server">
        </table>
        <div id="pagerMasivoTitulares">
        </div>
        <br />
        <div id="dvAccionesTitulares" style="margin-left: 5px; text-align: right;">
            <div id="btnGuardarMasivoTitulares" class="btnNormalMasivo" style="width: 100px;">
                <div class="btnDivMasivo">
                    <asp:Image ID="Image5" runat="server" CssClass="btnImgMasivo" ImageUrl="~/Common/images/Mantenimiento/Procesar.png" />
                    Guardar
                </div>
            </div>
            <div id="btnCerrarMasivoTitulares" class="btnNormalMasivo" style="width: 100px;">
                <div class="btnDivMasivo">
                    <asp:Image ID="Image6" runat="server" CssClass="btnImgMasivo" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    Cerrar
                </div>
            </div>
        </div>
    </div>
    <div id="divAsignarValores" style="display: none;">
        <div id="dvContAcordeon">
            <cc1:AccordionJQ ID="AccordionJQ1" runat="server" CssClass="accordion">

                <cc1:ContenedorAccodion Texto="Servidor de Aplicaciones - Admin">
                    <input type="checkbox" id="chkAsignarServidorAPP" />Asignar Servidor de Aplicaciones.
                    <table>
                        <tr>
                            <td style="vertical-align: top; width: 50%">                                
                                <div id="divServidoresAPP">
                                </div>
                                <div id="divServidoresAPP_Instancia">
                                    Seleccione Instancia APP: &nbsp;
                                    <select id="cboInstanciaAPP">
                                    </select>
                                    <div id="divServidorAPPSeleccionado" style="display: inline;">
                                    </div>
                                </div>
                            </td>
                        </tr>                        
                    </table>
                </cc1:ContenedorAccodion>

                <cc1:ContenedorAccodion Texto="Servidor de Aplicaciones - Pedidos">
                    <input type="checkbox" id="chkAsignarServidorPedidos" />Asignar Servidor de Aplicaciones.
                    <table id="tbPedidos">
                        <tr>
                            <td style="vertical-align: top; width: 50%">                                
                                <div id="divServidoresWEB">
                                </div>
                                <div id="divServidoresWEB_Instancia">
                                    Seleccione Instancia Pedidos: &nbsp;
                                    <select id="cboInstanciaWEB">
                                    </select>
                                    <div id="divServidorWEBSeleccionado" style="display: inline;">
                                    </div>
                                </div>
                            </td>
                        </tr>                        
                    </table>
                </cc1:ContenedorAccodion>


                <cc1:ContenedorAccodion Texto="Servidor de Base de Datos">
                    <input type="checkbox" id="chkAsignarServidorBD" />Asignar Servidor de Base de Datos.
                    <table width="100%">
                        <tr>
                            <td style="vertical-align: top; width: 50%">
                                <div id="divServidoresBD">
                                </div>
                                <div id="divServidoresBD_Instancia">
                                    Seleccione Instancia BD: &nbsp;
                                    <select id="cboInstanciaBD">
                                    </select>
                                    <div id="divServidorSeleccionado" style="display: inline;">
                                    </div>
                                </div>
                            </td>                  
                        </tr>
                        <tr>
                            <td style="width: 100%">
                                <div id="divEspacioRequerido">
                                </div>
                            </td>
                        </tr>
                    </table>
                </cc1:ContenedorAccodion>


                <cc1:ContenedorAccodion Texto="Usuario">
                    <table>
                        <tr>
                            <td colspan="2">
                                <input type="checkbox" id="chkAsignarUsuario" />Asignar usuario
                            </td>
                        </tr>
                        <tr class="tdAsignaUsuario">
                            <td valign="middle" style="width: 65%;">
                                <select id="cboAsignarCampo">
                                    <option value="{Nombre}">Nombre</option>
                                    <option value="{ApellidoPaterno}">Apellido Paterno</option>
                                    <option value="{ApellidoMaterno}">Apellido Materno</option>
                                    <option value="{PrimerCaracterNombre}">Primer caracter Nombre</option>
                                    <option value="{PrimerCaracterApellidoPaterno}">Primer caracter Paterno</option>
                                    <option value="{PrimerCaracterApellidoMaterno}">Primer caracter Materno</option>
                                </select>
                                <div id="btnAsignarCampo" class="btnNormal" runat="server" title="Nuevo">
                                    <asp:Image ID="Image9" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                </div>
                            </td>
                            <td rowspan="2" valign="middle" style="width: 35%; text-align: center;">
                                <div style="text-align: left;" id="tdoptAplicar">
                                    <input type="radio" id="optAplicarTitSin" name="goptAplicar" value="1" />Aplicar
                                    a todos los titulares sin usuario.
                                    <br />
                                    <input type="radio" id="optAplicarTitGeneral" name="goptAplicar" value="2" />Aplicar
                                    a todos los titulares.
                                </div>
                            </td>
                        </tr>
                        <tr class="tdAsignaUsuario">
                            <td>
                                <br />
                                Usuario:
                                <input type="text" id="txtUsuario" style="width: 350px" class="classValidaCaracterEspecial" />
                            </td>
                        </tr>
                    </table>
                </cc1:ContenedorAccodion>
                <cc1:ContenedorAccodion Texto="Contrato">
                    <table>
                        <tr>
                            <td colspan="2">
                                <input type="checkbox" id="chkAsignarContrato" />Asignar contrato
                            </td>
                        </tr>
                        <tr id="tdContrato">
                            <td>
                                Contrato:
                            </td>
                            <td>
                                <asp:DropDownList ID="cbocontrato" runat="server">
                                </asp:DropDownList>
                            </td>
                        </tr>
                    </table>
                </cc1:ContenedorAccodion>
                <cc1:ContenedorAccodion Texto="Portal Origen">
                    <table>
                        <tr>
                            <td colspan="2">
                                <input type="checkbox" id="chkAsignarPortal" />Asignar Portal Origen
                            </td>
                        </tr>
                        <tr id="tdPotal">
                            <td>
                                Portal:
                            </td>
                            <td>
                                <asp:DropDownList ID="ddlPortal" runat="server">
                                </asp:DropDownList>
                            </td>
                        </tr>
                    </table>
                </cc1:ContenedorAccodion>
            </cc1:AccordionJQ>
        </div>
        <br />
        <div id="dvAccionesAsignar" style="margin-left: 5px; text-align: right;">
            <div id="btnAplicarAsignar" class="btnNormalMasivo" style="width: 100px;">
                <div class="btnDivMasivo">
                    <asp:Image ID="Image7" runat="server" CssClass="btnImgMasivo" ImageUrl="~/Common/images/Mantenimiento/Procesar.png" />
                    Aplicar
                </div>
            </div>
            <div id="btnCerrarAplicar" class="btnNormalMasivo" style="width: 100px;">
                <div class="btnDivMasivo">
                    <asp:Image ID="Image8" runat="server" CssClass="btnImgMasivo" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    Cerrar
                </div>
            </div>
        </div>
    </div>


    </form>
</body>
</html>
