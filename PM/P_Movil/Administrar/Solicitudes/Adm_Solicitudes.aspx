<%@ Page Language="VB" AutoEventWireup="false"
    Inherits="P_Movil_Administrar_Adm_Solicitudes" Codebehind="Adm_Solicitudes.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqueryui/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqueryui/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqueryui/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqueryui/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
<%--    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
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
    <script src="../../../Common/Scripts/jqGrid/grid.subgrid.js" type="text/javascript"></script>--%>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>


    <script type="text/javascript" src="Adm_Solicitudes.js"></script>
    <link rel="stylesheet" type="text/css" href="Adm_Solicitudes.css" />
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfNomUsuarioLogeado" runat="server" /> <%--agregado 19-09-2013 wapumayta --%>
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    <asp:HiddenField ID="hdfValidacion" runat="server" />

    <asp:HiddenField ID="hdf_nom" runat="server" />
   
    <asp:HiddenField ID="hdfIdSolicitud" runat="server" />
    <asp:HiddenField ID="hdfCodEmpleado" runat="server" />
    <asp:HiddenField ID="hdfCodModeloDis" runat="server" />
    <asp:HiddenField ID="hdfCodEstado" runat="server" />
    <asp:HiddenField ID="hdfCodTipo" runat="server" />
    <asp:HiddenField ID="hdfImeiAnt" runat="server" />
    <asp:HiddenField ID="hdfImeiNue" runat="server" />

    <asp:HiddenField ID=hdfImeiSel runat="server" />

    <%--hdf solicitud servicio--%>
    <asp:HiddenField ID="hdfCodDatSol" runat="server" />
    <asp:HiddenField ID="hdfFecIni" runat="server" />
    <asp:HiddenField ID="hdfFecFin" runat="server" />
    <asp:HiddenField ID="hdfMotivo" runat="server" />
    <asp:HiddenField ID="hdfEnvio" runat="server" />

    <%--hdf crear solicitud servicio --%>
    <asp:HiddenField ID ="hdfCodCuenta" runat="server" />

        <div id="principal">
            <div id="PnlVistas" class="dvPanel">
                Vista:<br />
                <div id="radioVistas">
                    <input type="radio" id="porTipo" name="radioVistas" checked="checked" /><label for="porTipo">Por
                        Tipo</label>
                    <input type="radio" id="porEstado" name="radioVistas" /><label for="porEstado">Por estado</label>
                </div>
                <div style="height:8px"></div>
                <div id="btnTipos">
                </div>
                <div id="btnEstados">
                </div>
            </div>
            <div id="PnlAcciones" class="dvPanel">
                Acciones:<br />
                <div id="btnCrear">
                    Crear
                </div>
                <div id="btnProcesar">
                    Procesar
                </div>
                <div id="btnAceptar" style="display:none;">
                    Aceptar
                </div>
                <div id="btnRechazar">
                    Rechazar
                </div><br />
                <div style="height:8px"></div>
                <asp:RadioButton ID="rbtNoEnvidas" GroupName="gnSolEnv" runat="server" Text="No Enviadas" Enabled="false"/>
                <asp:RadioButton ID="rbtElegir" GroupName="gnSolEnv" runat="server" Text="Elegir" Enabled="false" />
                
                <div id="btnEnviar" style="display:none;">Enviar</div>
                <br /><div style="height:8px"></div>
            </div>
            <div id="PnlReportes" class="dvPanel" style="margin-left:4px; height:67px;">
                Reportes:<br />
                <div id="btnAgrupadoEstado">
                    Agrupado por Estado
                </div>
            </div>
            <div style="clear: both;">
            </div>
            <div id="panelGeneral">
                <div id="PnlSoli" class="dvPanel">
                    <div id="soliBuscar" style="margin-bottom: 5px;">
                        <asp:TextBox ID="txtDatoSoli" runat="server" Width="170px"></asp:TextBox><asp:DropDownList
                            ID="ddlSoli" runat="server" Style="margin-left: 5px;">
                            <asp:ListItem Value="1">Celular</asp:ListItem>
                            <asp:ListItem Value="2">Código Empleado</asp:ListItem>
                            <asp:ListItem Value="3">Empleado</asp:ListItem>
                            <asp:ListItem Value="4">Fecha</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div id="solis">
                    </div>
                </div>
                <div id="PnlDetSoli" class="dvPanel">
                    <div id="PnlTituloDet">
                        <table border="0" cellpadding="1" cellspacing="0">
                            <tr>
                                <td>
                                    Empleado:
                                </td>
                                <td width="5px">
                                </td>
                                <td>
                                    <asp:TextBox ID="txtEmpleado" runat="server" Width="200px" Enabled="False"></asp:TextBox>
                                </td>
                                <td width="5px">
                                </td>
                                <td>
                                    Estado:
                                </td>
                                <td width="5px">
                                </td>
                                <td>
                                    <asp:TextBox ID="txtEstado" runat="server" Width="100px" Enabled="False"></asp:TextBox>
                                    <div id="btnAdjuntos" class="btnNormal" style="display: none;">
                                        <a>Adjuntos</a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Número:
                                </td>
                                <td width="5px">
                                </td>
                                <td>
                                    <asp:TextBox ID="txtNumero" runat="server" Width="200px" Enabled="False"></asp:TextBox>
                                </td>
                                <td width="5px">
                                </td>
                                <td>
                                    <asp:Label ID="lblDispAnt" runat="server" Text="Disp Ant:"></asp:Label>
                                </td>
                                <td width="5px">
                                </td>
                                <td>
                                    <asp:TextBox ID="txtDispAnt" runat="server" Width="200px" Enabled="False"></asp:TextBox>
                                    <asp:TextBox ID="txtServSolicitado" runat="server" Width="200px" Enabled="False"></asp:TextBox>
                                </td>
                            </tr>
                             <tr>
                                <td>
                                    Tipo:
                                </td>
                                <td width="5px">
                                </td>
                                <td>
                                    <asp:TextBox ID="txtTipo" runat="server" Width="100px" Enabled="False"></asp:TextBox>
                                </td>
                                <td width="5px">
                                </td>
                                <td>
                                    <asp:Label ID="lblDispNuevo" runat="server" Text="Disp Nuevo:"></asp:Label>
                                </td>
                                <td width="5px">
                                </td>
                                <td>
                                    <asp:TextBox ID="txtDispNuevo" runat="server" Width="200px" Enabled="False"></asp:TextBox>
                                    <asp:TextBox ID="txtCantidadSolicitada" runat="server" Width="200px" Enabled="False"></asp:TextBox>
                                </td>
                            </tr>
                            <%--<tr id="trServicio" style="display:none;">
                                <td>Tiempo</td>
                                <td>
                                    <asp:TextBox ID="txtTiempoSolicitado" runat="server"></asp:TextBox>
                                </td>
                                <td>Cantidad</td>
                                <td>
                                    <asp:TextBox ID="txtCantidadSolicitada" runat="server"></asp:TextBox>
                                </td>
                            </tr>--%>
                        </table>
                    </div>
                    <%--<div id="PnlAdjuntos" style="margin-bottom:8px;"></div>--%>
                    
                    <div id="PnlDetalles" class="dvPanel" >

                    </div>
                    <div id="PnlIngresoDetalle">
                        <asp:TextBox ID="txtDetalle" runat="server" Width="440"></asp:TextBox>
                        <div id="btnIngresarDetalle">
                            Enviar
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="dvAprobacion" class="dvPanel" style="display:none;">
            <table cellspacing="0" cellpadding="0">
                <tr>
                    <td class="" width="110px">
                        Código Empleado
                    </td>
                    <td class="">
                        <asp:Label ID="lblCodEmpleado" runat="server" Text=""></asp:Label>                        
                    </td>
                </tr>
                <tr>
                    <td class="">
                        Nombre Empleado
                    </td>
                    <td class="">
                        <asp:Label ID="lblNomEmpleado" runat="server" Text=""></asp:Label>  
                    </td>
                </tr>
                <tr>
                    <td class="">
                        Número de celular
                    </td>
                    <td class="">
                        <asp:Label ID="lblNumCelular" runat="server" Text=""></asp:Label>
                        <asp:DropDownList ID="ddlNumero" runat="server"></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trModEquipoAnt">
                    <td class="">
                        <asp:Label ID="lbltdModelo" runat="server" Text="Modelo de equipo anterior"></asp:Label>
                    </td>
                    <td class="">
                        <asp:Label ID="lblModeloEquipoAnt" runat="server" Text=""></asp:Label>
                    </td>
                </tr>
                <tr id="IMEIEquipoAnt">
                    <td class="">
                        <asp:Label ID="lblIMEIEquipoAntCab" runat="server" Text="IMEI Equipo anterior"></asp:Label>                        
                    </td>
                    <td class="">
                        <asp:Label ID="lblIMEIEquipoAnt" runat="server" Text=""></asp:Label>
                    </td>
                </tr>
                <%--Filas para solicitudes de servicios--%>
                <tr id="trServicioSolicitado" style="display:none;">
                    <td>Servicio</td>
                    <td>
                        <asp:Label ID="lblServSolicitado" runat="server"></asp:Label>
                    </td>
                </tr>
                <tr id="trCantidadSolicitada" style="display:none;">
                    <td>Cantidad</td>
                    <td>
                        <asp:Label ID="lblCantidadSolicitada" runat="server"></asp:Label>
                        <%--<asp:TextBox = ID="txtCantidadNueva" runat="server"></asp:TextBox> nuevo--%>
                    </td>
                </tr>
                <tr id="trTiempoSolicitado" style="display:none;">
                    <td>Tiempo</td>
                    <td>
                        <asp:Label ID="lblTiempoSolicitado" runat="server"></asp:Label>
                    </td>
                </tr>
                <tr id="trMotivo" style="display:none;">
                    <td>
                        <asp:Label ID="lblMotivoSolServ" runat="server"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtMotivoSolServ" runat="server" ReadOnly="true" TextMode="MultiLine" Width="200px"
                            Height="40px" style="resize: none;"></asp:TextBox>
                    </td>
                </tr>
                <%--Final solicitudes de servicios--%>
                <tr style="display:none;">
                    <td class="">
                        <asp:Label ID="lbltdMotivo" runat="server" Text="Motivo de reposición"></asp:Label>
                    </td>
                    <td class="">
                        <asp:DropDownList ID="ddlMotivoReposicion" runat="server" Width="100px"></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trMODEquipoNue">
                    <td class="">                        
                        <asp:Label ID="lblModeloEquipoNuevoCab" runat="server" Text="Modelo de equipo nuevo"></asp:Label>
                    </td>
                    <td class="">
                        <asp:Label ID="lblModeloEquipoNuevo" runat="server" Text="" Visible="false"></asp:Label>
                        <asp:DropDownList ID="ddlModeloEquipoNuevo" runat="server" Width="230px" AutoPostBack = "False"></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trIMEIEquipoNue">
                    <td class="">
                        <asp:Label ID="lblIMEIEquipoNueCab" runat="server" Text="IMEI Equipo nuevo"></asp:Label>
                    </td>
                    <td class="">
                        <%--<asp:DropDownList ID="ddlEquipoNuevo" runat="server" Width="230px"></asp:DropDownList>--%>
                        <div id="btnBuscarIMEI">Buscar Equipo</div>
                        <asp:Label ID="lblIMEIElegido" runat="server" Text=""></asp:Label>
                    </td>
                </tr>
                <tr id="tfFechaEntrega">
                    <td class=""> 
                        Fecha de Entrega
                    </td>
                    <td class="">
                        <asp:TextBox ID="txtFecha" runat="server" Width="75px" ReadOnly="true" CssClass="txtFecha"></asp:TextBox>
                        <img id="imgBorrarFecha" alt="" src="../../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>
                    </td>
                </tr>
                <tr>
                    <td colspan="2"> 
                        <br />                       
                        <div id="btnGuardar" class="btnNormal">
                            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                            <a>Procesar</a>
                        </div>
                        <div id="btnSalir" class="btnNormal">
                            <asp:Image ID="imgSalir" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                            <a>Salir</a>
                        </div>
                    </td>
                </tr>  
            </table>
        </div>

        <div id="dvRechazo" class="dvPanel" style="display:none;">
            <table cellspacing="0" cellpadding="0">
                <tr>
                    <td class="" width="110px">
                        Código Empleado
                    </td>
                    <td class="">
                        <asp:Label ID="lblCodEmpleadoR" runat="server" Text=""></asp:Label>                        
                    </td>
                </tr>
                <tr>
                    <td class="">
                        Nombre Empleado
                    </td>
                    <td class="">
                        <asp:Label ID="lblNomEmpleadoR" runat="server" Text=""></asp:Label>  
                    </td>
                </tr>
                <tr>
                    <td class="">
                        Observaciones
                    </td>
                    <td class="">
                        <asp:TextBox ID="txtObservaciones" runat="server" Width="220px" TextMode="MultiLine" Height="42px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td colspan="2"> 
                        <br />                       
                        <div id="btnGuardarR" class="btnNormal">
                            <asp:Image ID="imgGuardarR" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                            <a>Guardar</a>
                        </div>
                        <div id="btnSalirR" class="btnNormal">
                            <asp:Image ID="imgSalirR" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                            <a>Salir</a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <div id="dvCrear" class="dvPanel" style="display:none;">
            <table cellspacing="0" cellpadding="0">
                <tr>
                    <td class="">
                        Tipo de Solicitud
                    </td>
                    <td class="">
                        <asp:DropDownList ID="ddlTipoSolicitud" runat="server" Width="100px"></asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td class="" width="110px">
                        Empleado
                    </td>
                    <td class="">
                        <asp:TextBox ID="txtEmpleadoNuevo" runat="server" Width="220px"></asp:TextBox>
                        <asp:HiddenField ID="hdfCodEmpleadoNuevo" runat="server" /> 
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td class="">
                        <asp:Label ID="lblMensaje" runat="server" Text="" ForeColor="Red" Font-Bold="true"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td class="">
                        <asp:Label ID="lblEquipo" runat="server" Text="Equipo"></asp:Label>
                    </td>
                    <td class="">
                        <asp:DropDownList ID="ddlEquipo" runat="server" Width="230px"></asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td class="">
                        Número de celular
                    </td>
                    <td class="">
                        <asp:Label ID="lblNumeroC" runat="server" Text=""></asp:Label>
                        <asp:DropDownList ID="ddlNumeroC" runat="server"></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trCModEquipoNuevo">
                    <td class="">
                        Modelo de equipo nuevo
                    </td>
                    <td class="">
                        <asp:DropDownList ID="ddlModeloEquipoNuevoC" runat="server" Width="230px" AutoPostBack = "False"></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trCIMEIEquipoNuevo">
                    <td class="">
                        IMEI Equipo nuevo
                    </td>
                    <td class="">
                        <%--<asp:DropDownList ID="ddlEquipoNuevoC" runat="server" Width="230px" ></asp:DropDownList>--%>
                        <asp:Label ID="lblIMEINuevo" runat="server" Text=""></asp:Label>
                        <div id="btnBuscarEquipo">Buscar Equipo</div>
                    </td>
                </tr>
                <%--Campos para servicio nuevo--%>
                <tr id="trTipoServicio" runat="server" style="display:none;">
                    <td>
                        <asp:Label ID="Label1" runat="server">Tipo Servicio</asp:Label>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlTipoServicio" runat="server" ></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trServicio" runat="server" style="display:none;">
                    <td>
                        <asp:Label ID="lblNuevoServicio" runat="server">Servicio</asp:Label>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlServicio" runat="server" ></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trServiciosActuales" runat="server" style="display:none;">
                    <td>
                        <asp:Label ID="Label2" runat="server">Servicios Actuales</asp:Label>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlServActuales" runat="server" ></asp:DropDownList>
                        <%--<asp:Label ID="lblCatServActual" runat="server"></asp:Label>--%>
                    </td>
                </tr>
                <%--<tr id="trIlimitado" runat="server" style="display:none;">
                    <td>
                        <asp:Label ID="Label2" runat="server">Servicio Ilimitado</asp:Label>
                    </td>
                    <td>
                        <asp:CheckBox ID="chkIlimitado" runat="server" />
                    </td>
                </tr>--%>
                <tr id="trCantidad" runat="server" style="display:none;">
                    <td>
                        <asp:Label ID="Label3" runat="server">Cantidad</asp:Label>
                        <asp:Label ID="lblValorCatnidad" runat="server" ></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtCatnidadSolicitada" runat="server" MaxLength="5"></asp:TextBox>
                        <asp:CheckBox ID="chkIlimitado" runat="server" Text="Ilimitado"/>
                    </td>
                </tr>
                <tr id="trMotivoActivacion" style="display:none;">
                    <td>Motivo</td> 
                    <td><asp:TextBox ID="txtMotivoActivacion" runat="server" Width="220px" TextMode="MultiLine" Rows="2" 
                        Height="44px" style="resize: none;" MaxLength="144"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trTiempoActivacion" style="display:none;">
                    <td>Tiempo Solicitado</td>
                    <td>
                        <%--<asp:RadioButton ID="rbtTemporal" GroupName="gnTiempo" Text="Temporal" runat="server"/>
                        <asp:RadioButton ID="rbtPermanente" GroupName="gnTiempo" Text="Permanente" runat="server"/>--%>
                        <asp:TextBox ID="txtFechaInicial" runat="server" CssClass="txtFecha" Width="60px"></asp:TextBox>
                        <asp:TextBox ID="txtFechaFinal" runat="server" CssClass="txtFecha" Width="60px"></asp:TextBox>
                        <asp:CheckBox ID="chkPermanente" runat="server" Text="Permanente"/>
                        <%--<asp:Label ID="lblCTiempoSolicitado" runat="server"></asp:Label>--%>
                    </td>
                </tr>
                <%--<tr id="trFechaInicial" style="display:none;">
                    <td>Fecha Inicial</td>
                    <td><asp:TextBox ID="txtFechaInicial" runat="server" CssClass="txtFecha"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trFechaFinal" style="display:none;">
                    <td>Fecha Final</td>
                    <td><asp:TextBox ID="txtFechaFinal" runat="server" CssClass="txtFecha"></asp:TextBox>
                    </td>
                </tr>--%>
                <%--fin campo servicios--%>
                <tr id="trFechaEntrega">
                    <td class="">
                        Fecha de Entrega
                    </td>
                    <td class="">
                        <asp:TextBox ID="txtFechaEntregaC" runat="server" Width="75px" ReadOnly="true" CssClass="txtFecha"></asp:TextBox>
                        <img id="imgBorrarFechaEntregaC" alt="" src="../../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>
                    </td>
                </tr>
                <tr>
                    <td colspan="2"> 
                        <br />                       
                        <div id="btnGuardarC" class="btnNormal">
                            <asp:Image ID="imgGuardarC" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                            <a>Guardar</a>
                        </div>
                        <div id="btnSalirC" class="btnNormal">
                            <asp:Image ID="imgSalirC" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                            <a>Salir</a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="dvBuscarEquipo" style="display:none;background-color:White;">
            <table>
                <tr>
                    <td>Modelo</td>
                    <td>
                        <asp:DropDownList ID="ddlModeloEquipoBuscar" runat="server" Width="230px" AutoPostBack = "False"></asp:DropDownList>                    
                    </td>
                    <td style="width:15px;"></td>
                    <td>Tipo de Adquisición</td>
                    <td>
                        <asp:DropDownList ID="ddlTipoAdquisicion" runat="server" Width="" AutoPostBack = "False"></asp:DropDownList>                    
                    </td>
                    <td></td>
                    <td>
                        <asp:TextBox ID="txtFechaPeriodoI" runat="server" Width="63px" ReadOnly="true" CssClass="txtFecha" Visible="false"></asp:TextBox>
                        <%--<img id="imgBorrarPerIni" alt="" src="../../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>--%>
                          
                        <asp:TextBox ID="txtFechaPeriodoF" runat="server" Width="63px" ReadOnly="true" CssClass="txtFecha" Visible="false"></asp:TextBox>
                        <%--<img id="imgBorrarPerFin" alt="" src="../../../Common/Images/Mantenimiento/Borrar.png" title="Limpiar fecha" class="imgBtn"/>--%>
                    </td>
                    <td style="width:15px;"></td>
                </tr>
            </table>
            <div style="width:100%;">            
                <table id="tbEquipo"></table>
            </div>
            <br />
            <br />
            <div style="text-align:right;width:100%;">
                <div id="btnElegirEquipo" class="btnNormal">
                    <a>Elegir</a>
                </div>
                <div id="btnCerrarBusqueda" class="btnNormal">
                    <a>Cerrar</a>
                </div>
            </div>
        </div>
        <div id="dvAdjuntos" style="display:none; width:360px;">
            <table width="100%">
                <tr>
                    <td>
                        <div id="PnlAdjuntos" ></div>        
                    </td>
                </tr>
                <tr style="height:8px;"><td></td>
                </tr>
                <tr>
                    <td align="right">
                        <div id="btnCerrarAdjuntos" class="btnNormal">
                            <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                            <a>Cerrar</a>
                        </div>
                    </td>
                </tr>
            </table>
            
        </div>
        
        <div id="dvImprimir" style="display:none; padding:0px; margin:0px;"> <%--agregado 25-09-2013 wapumayta --%>
            <iframe id="ifAdjuntoDesc" frameborder="0" style="padding:0px; margin:0px;"></iframe>
        </div>
        
    </form>
</body>
</html>
