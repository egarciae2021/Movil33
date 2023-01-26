    <%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Adm_ListadoSolicitudes.aspx.vb" Inherits="Adm_ListadoSolicitudes" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register Src="../../../Common/Controles/BusquedaPrincipal.ascx" TagName="BusquedaPrincipal" TagPrefix="uc1" %>
<%@ Register Src="../../../Common/Controles/ExportarExcelGenerico.ascx" TagName="ExportarExcelGenerico" TagPrefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="Adm_ListadoSolicitudes.css" rel="stylesheet" type="text/css" />

    <script src="../../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

</head>
<body style="overflow: hidden;">
    
    <form id="form1" runat="server">
        
        <asp:HiddenField ID="hdfTituloValeResguardo" runat="server" />
        <asp:HiddenField ID="hdfAdmin" runat="server" />
        <asp:HiddenField ID="hdfTecnico" runat="server" />
        <asp:HiddenField ID="hdfResApr" runat="server" />
        <asp:HiddenField ID="hdfDiaActual" runat="server" />
        <asp:HiddenField ID="hdfGruTipSol" runat="server" />
        <asp:HiddenField ID="hdfGruTipSolEdi" runat="server" />
        <asp:HiddenField ID="hdfGruTipSolEli" runat="server" />
        <asp:HiddenField ID="hdfSolicitudesMultipleEspecialista" runat="server"/>
        <asp:HiddenField ID="hdfEsResponsableDeArea" runat="server" />

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
        <asp:HiddenField ID="hdfIdSolicitud" runat="server" />

        <asp:HiddenField ID="hdfdaFechaIni" runat="server" />
        <asp:HiddenField ID="hdfdaFechaFin" runat="server" />
        <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
        <asp:HiddenField ID="hdfLicencia" runat="server" />
        <asp:HiddenField ID="hdfEsAdministradorSolicitud" runat="server" />
        <asp:HiddenField ID="hdfEsResponsableTI" runat="server" />
        <asp:HiddenField ID="hdfEsGestorSolicitudes" runat="server" />
        <asp:HiddenField ID="hdfLicenciaModulo" runat="server" />
        
        <asp:HiddenField ID="hdfMostrarOrdenServicio" runat="server" />
        
        <asp:HiddenField ID="hdfEsAutorizador" runat="server" />

<%--<%--        Edgar Garcia 11112022 notas x perfil--%>
        <asp:hiddenfield id="hdfinsertar" runat="server" />
        <asp:hiddenfield id="hdfactivar" runat="server" />
        <asp:hiddenfield id="hdfeliminar" runat="server" />
        <asp:hiddenfield id="hdfexportar" runat="server" />
        <asp:hiddenfield id="hdfimportar" runat="server" />
        
    


        <cc1:TabJQ runat="server" ID="TabDetalle" CssClass="tabs" Style="margin-top: 1px;">
            <cc1:ContenedorTabJQ Titulo="Detalle">
                <table width="100%">
                    <tr class="trToolBar">
                        <td>
                            <div id="toolbar" class="row dvPanel" style="margin: 0px !important; padding: 0px !important;">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                        <table id="tblAcciones" runat="server" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <div id="btnAgregar" class="btnNormal" runat="server" title="Nuevo">
                                                        <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div id="btnAgregarMasivo" class="btnNormal" runat="server" title="Nuevo (Masivo)">
                                                        <asp:Image ID="imgAgregarMasivo" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16_masivo.png" />
                                                    </div>
                                                </td>
                                                <td id="tdNoEstandar" runat="server">
                                                    <div id="btnMasivo" class="btnNormal" runat="server" title="Masivo">
                                                        <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/multiple.png" Width="16px" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div id="btnEditar" class="btnNormal" runat="server" title="Editar">
                                                        <asp:Image ID="imgEditar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div id="btnProcesar" class="btnNormal" runat="server" title="Culminar">
                                                        <asp:Image ID="imgProcesar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Proceso.png" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div id="btnSubirFormato" class="btnNormal" style="display: none;" runat="server" title="Subir archivo">
                                                        <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/EscalarSolicitud.png" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div id="btnOrdenServicio" class="btnNormal aFormato" runat="server" title="Orden de Servicio">
                                                        <asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/pdf.png" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div id="dvFormatos" runat="server">
                                                    </div>
                                                </td>
                                                <td>
                                                    <div id="btnVerDetalle" class="btnNormal" runat="server" title="Ver Detalle">
                                                        <asp:Image ID="imgVerDetalle" runat="server" ImageUrl="~/Common/Images/Mantenimiento/VerDetalle.png" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div id="btnEliminar" class="btnNormal" runat="server" title="Eliminar">
                                                        <asp:Image ID="imgEliminar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="col-lg-1 col-md-2 col-sm-3 col-xs-3" style="min-width: 115px;">
                                        <table id="tbVista" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <div id="btnVista" class="btnNormal" runat="server" title="Elija un tipo de vista" click="ConfigurarFiltroRegistro">
                                                        <asp:Image ID="imgVista" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Views.png" />
                                                    </div>
                                                </td>
                                                <td style="min-width: 80px; text-align: left; padding-left: 1px;">
                                                    <span id="lblVista">Mis Solicitudes</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div id="dvAprobarRechazarAsignar" class="col-lg-1 col-md-1 col-sm-2 col-xs-6">
                                        <table id="tbAprobar" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <div id="btnAprobar" class="btnNormal" runat="server" title="Aprobar">
                                                        <asp:Image ID="imgAprobar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Aprobar.png" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div id="btnRechazar" class="btnNormal" runat="server" title="Rechazar">
                                                        <asp:Image ID="imgRechazar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Rechazar.png" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div id="btnAsignar" class="btnNormal" runat="server" title="Asignarme" style="height: 30px;">
                                                        <asp:Image ID="imgAsignar" runat="server" Style="margin-top: -2px;" ImageUrl="~/Common/Images/Mantenimiento/Asignar.png" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div id="btnAsignarA" class="btnNormal" runat="server" title="Asignar solicitudes a" style="height: 30px;">
                                                        <asp:Image ID="imgAsignarA" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Atender.png" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div id="btnReasignarA" class="btnNormal" runat="server" title="Asignar solicitudes a" style="height: 30px;">
                                                        <asp:Image ID="imgReasignarA" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Atender.png" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="col-lg-1 col-md-2 col-sm-3 col-xs-6" style="min-width: 125px;">
                                        <table id="tbExportar" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="width: 20px;">
                                                    <div id="btnValeResguardo" class="btnNormal" title="Vale Resguardo" runat="server">
                                                        <asp:Image ID="Image5" runat="server" ImageUrl="~/Common/Images/pdf.png" Height="16px" Width="16px" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <uc1:ExportarExcelGenerico ID="eegSolicitudes" runat="server" />
                                                    <%--<div id="btnExportar" class="btnNormal" runat="server" title="Exportar">
                                                        <asp:Image ID="imgExportar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png" />
                                                    </div>  --%>                          
                                                </td>
                                                <td>
                                                    <div id="btnAutDesPDF" class="btnNormal" runat="server" title="Descargar pdf de autorización de descuento" style="height: 32px;">
                                                        <asp:Image ID="imgAutDesPDF" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Pdf_hover.png" Height="16px" Width="16px" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <%--                                                        <div id="btnReporte" class="btnNormal" runat="server" title="Reportes" style="height: 24px;" url="" click="MostrarReportes" role="button" aria-disabled="false">
                                                        <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Sumario/GEN.png" Height="16px" Width="16px" />
                                                    </div>--%>
                                                    <div id="dvReportes" runat="server">
                                                    </div>
                                                    <%--                                                      <div id="btnReporte" class="btnNormal ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right" runat="server" title="Reportes" url="" click="MostrarReportes" role="button" aria-disabled="false">
                                                    <span class="ui-button-text" style="padding: 4px; width: 22px;">
                                                      <img src="~/Common/Images/Sumario/GEN.png" width="16" height="16">
                                                    </span>
                                                  </div>--%>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div id="dvFiltro" class="row col-lg-4 col-md-5 col-sm-12 col-xs-12">
                                        <div class="col-lg-6 col-md-6 col-sm-3 col-xs-6">
                                            <div style="height: 34px; display: flex; align-items: center;">
                                                <asp:Label ID="lblFiltro" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
                                                <asp:DropDownList ID="ddlFiltro" runat="server" Width="150px">
                                                </asp:DropDownList>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-9 col-xs-6">
                                            <div style="height: 34px; display: flex; align-items: center; float: right; width: 100%;">
                                                <div id="dvFiltrar" style="float:left; width: 45px;">Filtrar:</div>
                                                <div id="divCodigo" style="float:left; width: 100%;">
                                                    <asp:TextBox ID="txtCodigo" runat="server" style="width:calc(100% - 12px);"></asp:TextBox>
                                                </div>
                                                <div id="divFecha" style="float:left; width: 100%;">
                                                    <asp:TextBox ID="txtFechaIni" runat="server" Width="90px" ToolTip="Fecha Inicio" ReadOnly="True"></asp:TextBox>
                                                    - 
                                                    <asp:TextBox ID="txtFechaFin" runat="server" Width="90px" ToolTip="Fecha Fin" ReadOnly="True"></asp:TextBox>
                                                </div>
                                                <div id="divEmpleado" style="float:left; width: 100%;">
                                                    <asp:TextBox ID="txtEmpleado" runat="server" style="width:calc(100% - 12px);"></asp:TextBox>
                                                </div>
                                                <div id="divOrdenServicio" style="float:left; width: 100%;">
                                                    <asp:TextBox ID="txtOrdenServicioFiltro" runat="server" style="width:calc(100% - 12px);"></asp:TextBox>
                                                </div>
                                                <div style="float: left; width: 100%;" id="divTipoSolicitud">
                                                    <asp:DropDownList ID="ddlTipo" runat="server" style="width:calc(100% - 12px);"></asp:DropDownList>
                                                </div>
                                                <div style="float: left; display: none; width: 100%;" id="divTipoSolicitudTec">
                                                    <asp:DropDownList ID="ddlTipoTec" runat="server" style="width:calc(100% - 12px);"></asp:DropDownList>
                                                </div>
                                                <div style="float: left; display: none; width: 100%;" id="divTipoSolicitudResApr">
                                                    <asp:DropDownList ID="ddlTipoResApr" runat="server" style="width:calc(100% - 12px);"></asp:DropDownList>
                                                </div>
                                                <div style="float: left; display: none; width: 100%;" id="divEstadoApr">
                                                    <asp:DropDownList ID="ddlEstadoApr" runat="server" style="width:calc(100% - 12px);"></asp:DropDownList>
                                                </div>
                                                <div style="float: left; display: none; width: 100%;" id="divEstadoPro">
                                                    <asp:DropDownList ID="ddlEstadoPro" runat="server" style="width:calc(100% - 12px);"></asp:DropDownList>
                                                </div>
                                                <div style="float: left; display: none; width: 100%;" id="divEspecialistaProc">
                                                    <asp:TextBox ID="txtEspecialista" runat="server" style="width:calc(100% - 12px);"></asp:TextBox>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <%--<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                                    </div>--%>
                                    <div id="tdFecha" class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                        <div id="divRangoFecha" style="float: right;">
                                            <table border="0">
                                                <tr>
                                                    <td style="width: 55px;">
                                                        <b>Fechas:   </b>
                                                    </td>
                                                    <td style="height: 32px">
                                                        <asp:TextBox ID="txtRangoFechaIni" runat="server" Width="72px" ToolTip="Fecha Inicio" ReadOnly="True"></asp:TextBox>
                                                        - 
                                                <asp:TextBox ID="txtRangoFechaFin" runat="server" Width="72px" ToolTip="Fecha Fin" ReadOnly="True"></asp:TextBox>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div align="left" style="display: none;">
                                            <asp:CheckBox ID="chkSolNoVista" runat="server" Checked="false" />Solicitudes No Vistas
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="dvDatosGrilla" style="display: none; width: 100%;">
                                <table id="grid"></table>
                                <div id="pager"></div>
                            </div>
                            <div id="dvSinDatos" style="display: none;">
                                <span style="font-size: 14px; font-weight: 600;">No se encontraron solicitudes.</span>
                            </div>

                        </td>
                    </tr>
                </table>
            </cc1:ContenedorTabJQ>
        </cc1:TabJQ>


        <ul id="ulListaFormatos" runat="server" style="position: absolute;">
        </ul>

        <ul id="ulListaReportes" runat="server" style="position: absolute;">
        </ul>

        <div style="margin-top: 5px;">
        </div>
        <div id="dvNota" style="display: none;">
            <iframe id="ifNota" frameborder="0" style="padding: 0px; margin: 0px; height: 480px; width: 670px;"></iframe>
        </div>
        <div id="divHisOpe" style="display: none; margin-right: 0px; padding-right: 0px;">
            <iframe id="ifHisOpe" frameborder="0" style="padding: 0px; margin: 0px; height: 270px; width: 430px;"></iframe>
        </div>
        <div id="divConRec" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            ¿Está seguro que desea rechazar las solicitudes seleccionadas?
        </div>
        <div id="divConApr" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            ¿Está seguro que desea aprobar las solicitudes seleccionadas?
        </div>
        <div id="divConAsi" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            ¿Está seguro que desea asignarse las solicitudes seleccionadas?
        </div>
        <div id="divConAsiSolA" style="display: none;">
            <table>
                <tr>
                    <td>Especialista Responsable</td>
                    <td></td>
                </tr>
            </table>
        </div>
        <div id="divConEli" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>
            ¡Atención!, se eliminará de forma permanente la solicitud elegida y los elementos relacionados (Notas y seguimientos de Estado). ¿Desea continuar?
        </div>
        <div id="dvRechazar" style="display: none;">
            <table>
                <tr>
                    <td>Comentarios</td>
                </tr>
                <tr>
                    <td>
                        <asp:TextBox ID="txtComentarios" runat="server" Width="460px" TextMode="MultiLine" MaxLength="2000"></asp:TextBox></td>
                </tr>
            </table>
        </div>
        <div id="dvVistas" class="dvPanel" style="display: none; width: 140px;">
            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr id="trGeneral">
                    <td>
                        <asp:RadioButton ID="rbtGeneral" runat="server" Text="General" GroupName="rbtnVistas" Checked="true" /></td>
                </tr>
                <tr id="trPendiente">
                    <td>
                        <asp:RadioButton ID="rbtPendiente" runat="server" Text="Mis Pendientes" GroupName="rbtnVistas" ToolTip="Lista todas las solicitudes por culminar del usuario logueado" /></td>
                </tr>
                <tr id="trPorAprobar" style="display: none;">
                    <td>
                        <asp:RadioButton ID="rbtPorAprobar" runat="server" Text="Por Aprobar" GroupName="rbtnVistas" /></td>
                </tr>
                <tr id="trAprobada" style="display: none;">
                    <td>
                        <asp:RadioButton ID="rbtAprobada" runat="server" Text="Aprobadas" GroupName="rbtnVistas" /></td>
                </tr>
                <tr id="trRechazada" style="display: none;">
                    <td>
                        <asp:RadioButton ID="rbtRechazada" runat="server" Text="Rechazadas" GroupName="rbtnVistas" /></td>
                </tr>
                <tr id="trPorAsignar" style="display: none;">
                    <td>
                        <asp:RadioButton ID="rbtPorAsignar" runat="server" Text="Por Asignar" GroupName="rbtnVistas" /></td>
                </tr>
                <tr id="trEnProceso" style="display: none;">
                    <td>
                        <asp:RadioButton ID="rbtEnProceso" runat="server" Text="En Proceso" GroupName="rbtnVistas" /></td>
                </tr>
                <tr id="trCulminada" style="display: none;">
                    <td>
                        <asp:RadioButton ID="rbtCulminada" runat="server" Text="Culminadas" GroupName="rbtnVistas" /></td>
                </tr>
                <tr id="trAnulada" style="display: none;">
                    <td>
                        <asp:RadioButton ID="rbtAnulada" runat="server" Text="Anuladas" GroupName="rbtnVistas" /></td>
                </tr>
                
                <tr id="trPorAutorizar" style="display: none;">
                    <td>
                        <asp:RadioButton ID="rbtPorAutorizar" runat="server" Text="Por Autorizar" GroupName="rbtnVistas" /></td>
                </tr>

                <tr>
                    <td>
                        <hr />
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:RadioButton ID="rbtNotasPorRevisar" runat="server" Text="Notas por revisar" GroupName="rbtnVistas" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:RadioButton ID="rbtSolicitudesNoVistas" runat="server" Text="Solicitudes no vistas" GroupName="rbtnVistas" />
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
            <uc1:BusquedaPrincipal ID="bpTecRes" runat="server" Ancho="200" />
        </div>

        <div id="dvGenerarOS" style="display: none;">
            <table>
                <tr>
                    <td style="width: 130px;">Nro. Orden de Servicio</td>
                    <td>
                        <asp:TextBox ID="txtNroOrdenServicio" runat="server" Width="100px"></asp:TextBox>
                        <span id="lblNroOrdenServicioAnterior" style="font-family: Tahoma; color: darkblue; font-size: 11px;"></span>
                    </td>
                </tr>
                <tr>
                    <td>Tipo de Servicio</td>
                    <td>
                        <asp:DropDownList ID="ddlTipoServicio" Width="180px" runat="server">
                            <asp:ListItem Value="1" Text="CELULAR"></asp:ListItem>
                            <asp:ListItem Value="2" Text="TABLET"></asp:ListItem>
                            <asp:ListItem Value="3" Text="BAM"></asp:ListItem>
                            <asp:ListItem Value="4" Text="CHIP"></asp:ListItem>
                            <asp:ListItem Value="5" Text="BLACKBERRY"></asp:ListItem>
                            <asp:ListItem Value="6" Text="RADIOLOCALIZACIÓN"></asp:ListItem>
                            <asp:ListItem Value="7" Text="ROAMING"></asp:ListItem>
                        </asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td>Tipo de Movimiento</td>
                    <td>
                        <asp:DropDownList ID="ddlTipoMovimiento" runat="server" Width="180px">
                            <asp:ListItem Value="2" Text="Alta"></asp:ListItem>
                            <asp:ListItem Value="11" Text="Baja"></asp:ListItem>
                            <asp:ListItem Value="15" Text="Cambio Número"></asp:ListItem>
                            <asp:ListItem Value="14" Text="Cambio Plan"></asp:ListItem>
                            <asp:ListItem Value="4" Text="Reparación de equipo"></asp:ListItem>
                            <asp:ListItem Value="3" Text="Reposición de equipo"></asp:ListItem>
                            <asp:ListItem Value="13" Text="Interrupción del Servicio"></asp:ListItem>
                            <asp:ListItem Value="-1" Text="Problemas de Clone"></asp:ListItem>
                            <asp:ListItem Value="-2" Text="Activación Cal"></asp:ListItem>
                            <asp:ListItem Value="-3" Text="Otro"></asp:ListItem>
                        </asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td>Descripción</td>
                    <td>
                        <asp:TextBox ID="txtDescripcionOS" runat="server" Width="460px" TextMode="MultiLine"></asp:TextBox></td>
                </tr>
                <tr>
                    <td>Origen de Solicitud</td>
                    <td>
                        <asp:TextBox ID="txtOrigenSolicitud" runat="server" Width="460px"></asp:TextBox></td>
                </tr>
                <tr>
                    <td>Fecha Inicio</td>
                    <td>
                        <asp:TextBox ID="txtFechaHoraInicioOS" runat="server" Width="100px"></asp:TextBox>
                        <asp:TextBox ID="txtHoraInicioOS" runat="server" Width="40px"></asp:TextBox>
                        (HH:MM)
                    </td>
                </tr>
            </table>
        </div>


        <iframe id="ifReporteFormato" frameborder="0" style="margin: 0px; padding: 0px; display: none;" width="100%" height="470px"></iframe>

        <div id="dvGenerarResguardo" style="display: none;">
            <table border="0" width="100%">
                <tr>
                    <td style="width: 100px; text-align: right;">Factura:</td>
                    <td>
                        <asp:TextBox ID="txtFactura" runat="server" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Nro. Consecutivo:</td>
                    <td>
                        <asp:TextBox ID="txtNroConsecutivo" runat="server" Width="100px"></asp:TextBox>
                        <span id="lblNroConsecutivoAnterior" style="font-family: Tahoma; color: darkblue; font-size: 11px;"></span>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Tipo Servicio:</td>
                    <td>
                        <asp:DropDownList ID="DropDownList1" Width="100px"  runat="server">
                            <asp:ListItem Value="1" Text="CELULAR"></asp:ListItem>
                            <asp:ListItem Value="2" Text="TABLET"></asp:ListItem>
                            <asp:ListItem Value="3" Text="BAM"></asp:ListItem>
                            <asp:ListItem Value="4" Text="CHIP"></asp:ListItem>
                            <asp:ListItem Value="5" Text="BLACKBERRY"></asp:ListItem>
                            <asp:ListItem Value="6" Text="RADIOLOCALIZACIÓN"></asp:ListItem>
                            <asp:ListItem Value="7" Text="ROAMING"></asp:ListItem>
                        </asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Costo (S/IVA):</td>
                    <td>
                        <asp:TextBox ID="txtCosto" runat="server" style="text-align: right;" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Marca:</td>
                    <td>
                        <asp:TextBox ID="txtMarca" runat="server" Enabled="false" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">Modelo:</td>
                    <td>
                        <asp:TextBox ID="txtModelo" runat="server" Enabled="false"  Width="100px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Nro Servicio:</td>
                    <td>
                        <asp:TextBox ID="txtNroServicio" runat="server" Enabled="false" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">IMEI:</td>
                    <td>
                        <asp:TextBox ID="txtIMEI" runat="server" Enabled="false" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;">SIM:</td>
                    <td>
                        <asp:TextBox ID="txtSIM" runat="server" Width="100px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">PIN:</td>
                    <td>
                        <asp:TextBox ID="txtPIN" runat="server" Width="100px"></asp:TextBox>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;"></td>
                    <td>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;"></td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Accesorios:</td>
                    <td>
                        <asp:CheckBoxList ID="chkAccesorios" runat="server">
                             <asp:ListItem  Value="HAND" Text="HAND SET"></asp:ListItem>
                             <asp:ListItem  Value="BATE" Text="BATERIA LITIO"></asp:ListItem>
                             <asp:ListItem  Value="ADAP" Text="ADAPTADOR CA"></asp:ListItem>
                             <asp:ListItem  Value="AUDI" Text="AUDIFONO"></asp:ListItem>
                             <asp:ListItem  Value="USB"  Text="CABLE USB"></asp:ListItem>
                             <asp:ListItem  Value="MANU" Text="MANUAL OPERACIÓN"></asp:ListItem>
                        </asp:CheckBoxList>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;"></td>
                    <td>
                    </td>
                    <td style="width: 50px;"></td>
                    <td style="width: 100px; text-align: right;"></td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Observaciones:</td>
                    <td colspan="7">
                        <asp:TextBox ID="txtObservaciones" runat="server" Height="50px" TextMode="MultiLine" Width="755px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px; text-align: right;">Administrador Contrato:</td>
                    <td colspan="7">
                        <asp:TextBox ID="txtAdministradorContrato" runat="server" Width="755px"></asp:TextBox>
                    </td>
                </tr>
            </table>
        </div>

    </form>

</body>
</html>
<script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Adm_ListadoSolicitudes.js")%>" type="text/javascript"></script>