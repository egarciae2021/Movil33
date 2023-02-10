<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_NuevaSolicitud"
    CodeBehind="Adm_NuevaSolicitud.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register Src="../../Common/Controles/BusquedaPrincipal.ascx" TagName="BusquedaPrincipal"
    TagPrefix="uc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/galleriffic-2.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <%--<script src="../../Content/js/shared/jquery-1.9.1.js" type="text/javascript"></script>--%>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.button.js"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../Common/Scripts/jquery.uniform.min.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jquery.history.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jquery.galleriffic.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jquery.opacityrollover.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jquery.uniform.min.js"></script>
    <%--<script src="../../Content/js/shared/kendo/v2014.3.1119/kendo.web.min.js" type="text/javascript"></script>--%>
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <script>
        window.MSPointerEvent = null;
        window.PointerEvent = null;
    </script>

    <script id="DetailTemplate" type="text/x-kendo-tmpl">
        <div class="tabstrip">
            <ul>
                <li>Datos</li>
                <li>Políticas</li>
            </ul>
            <div class="Datos">
                <ul>
                    <li><label>RPM: </label>#:data.rpm#</li>
                    <li><label>Estado: </label>#:data.estado#</li>
                    <li><label>Minutos Asignados: </label>#:data.minutos#</li>
                </ul>
            </div>
            <div class="Politicas">
                <ul>
                    <li><label>Última fecha de cambio: </label>#:data.ultfeccambio#</li>
                    <li><label>Tiempo necesario para cambiar de equipo (meses): </label>#:data.tnecesario#</li>
                    <li><label>Puede cambiar su equipo desde: </label>#:data.cambiodesde#</li>
                </ul>
            </div>
        </div>
    </script>
    <script id="DetailTemplate1_2" type="text/x-kendo-template">
        <div class="tabDatos">
            <ul>
                <li>Nunc tincidunt</li>
                <li>Proin dolor</li>
                <li>Aenean lacinia</li>
            </ul>
            <div id="tabs-1">
                <p>Proin elit arcu, rutrum commodo, vehicula tempus, commodo a, risus. Curabitur nec arcu. Donec sollicitudin mi sit amet mauris. Nam elementum quam ullamcorper ante. Etiam aliquet massa et lorem. Mauris dapibus lacus auctor risus. Aenean tempor ullamcorper leo. Vivamus sed magna quis ligula eleifend adipiscing. Duis orci. Aliquam sodales tortor vitae ipsum. Aliquam nulla. Duis aliquam molestie erat. Ut et mauris vel pede varius sollicitudin. Sed ut dolor nec orci tincidunt interdum. Phasellus ipsum. Nunc tristique tempus lectus.</p>
            </div>
            <div id="tabs-2">
                <p>Morbi tincidunt, dui sit amet facilisis feugiat, odio metus gravida ante, ut pharetra massa metus id nunc. Duis scelerisque molestie turpis. Sed fringilla, massa eget luctus malesuada, metus eros molestie lectus, ut tempus eros massa ut dolor. Aenean aliquet fringilla sem. Suspendisse sed ligula in ligula suscipit aliquam. Praesent in eros vestibulum mi adipiscing adipiscing. Morbi facilisis. Curabitur ornare consequat nunc. Aenean vel metus. Ut posuere viverra nulla. Aliquam erat volutpat. Pellentesque convallis. Maecenas feugiat, tellus pellentesque pretium posuere, felis lorem euismod felis, eu ornare leo nisi vel felis. Mauris consectetur tortor et purus.</p>
            </div>
            <div id="tabs-3">
                <p>Mauris eleifend est et turpis. Duis id erat. Suspendisse potenti. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum erat, eu congue orci lorem eget lorem. Vestibulum non ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sodales. Quisque eu urna vel enim commodo pellentesque. Praesent eu risus hendrerit ligula tempus pretium. Curabitur lorem enim, pretium nec, feugiat nec, luctus a, lacus.</p>
                <p>Duis cursus. Maecenas ligula eros, blandit nec, pharetra at, semper at, magna. Nullam ac lacus. Nulla facilisi. Praesent viverra justo vitae neque. Praesent blandit adipiscing velit. Suspendisse potenti. Donec mattis, pede vel pharetra blandit, magna ligula faucibus eros, id euismod lacus dolor eget odio. Nam scelerisque. Donec non libero sed nulla mattis commodo. Ut sagittis. Donec nisi lectus, feugiat porttitor, tempor ac, tempor vitae, pede. Aenean vehicula velit eu tellus interdum rutrum. Maecenas commodo. Pellentesque nec elit. Fusce in lacus. Vivamus a libero vitae lectus hendrerit hendrerit.</p>
            </div>
        </div>
    </script>
    <script id="DetailTemplate1" type="text/x-kendo-tmpl">
        <div>
            <table border="1px" cellspacing="0px" cellpadding="0px" width="600px">
                <tr><td align="center" style="width:30%;">Datos</td><td align="center" style="width:50%;">Politicas</td></tr>
                <tr>
                    <td>
                        <table border="1px" cellspacing="0px" cellpadding="0px" width="200px">
                            <tr><td>IMEI de dispositivo:</td>   <td>#:data.codIMEI#</td></tr>
                            <tr><td>Número RPM:</td>                   <td>#:data.rpm#</td></tr>
                            <tr><td>Minutos Asignados:</td>     <td>#:data.minutos# minutos</td></tr>
                            <tr><td>Costo Reposición / Penalidad:</td>      <td>#:(data.costoRepo != '' || data.costoRepo == 0) ? oCulturaLocal.Moneda.vcSimMon + ' ' + data.costoRepo : 'No se ha podido calcular'#</td></tr>
                        </table>
                    </td>
                    <td>
                        <table border="1px" cellspacing="0px" cellpadding="0px" width="400px">
                            <tr><td>Última fecha de cambio:</td>                            <td>#:data.ultfeccambio#</td></tr>
                            <tr><td>Tiempo necesario para cambiar de equipo (meses):</td>   <td>#:data.tnecesario#</td></tr>
                            <tr><td>Puede cambiar su equipo desde:</td>                     <td>#:data.cambiodesde#</td></tr>
                            <tr><td>Meses de Contrato</td>                                  <td>#:data.MesesContrato#</td></tr>
                        </table>
                    </td>
                </tr>
        </table>
        </div>
    </script>
    <script id="DetailTemplate2" type="text/x-kendo-tmpl">
        <div class="tabstrip">
            <cc1:TabJQ ID="tabDetalle" runat="server">
                <cc1:ContenedorTabJQ ID="tabDetalleDatos" Titulo="Datos">
                    <ul>
                        <li><label>RPM: </label>#:data.rpm#</li>
                        <li><label>Estado: </label>#:data.estado#</li>
                        <li><label>Minutos Asignados: </label>#:data.minutos#</li>
                    </ul>
                </cc1:ContenedorTabJQ>
                <cc1:ContenedorTabJQ ID="tabDetallePoliticas" Titulo="Politicas">
                    <ul>
                        <li><label>Última fecha de cambio: </label>#:data.ultfeccambio#</li>
                        <li><label>Tiempo necesario para cambiar de equipo (meses): </label>#:data.tnecesario#</li>
                        <li><label>Puede cambiar su equipo desde: </label>#:data.cambiodesde#</li>
                    </ul>            
                </cc1:ContenedorTabJQ>
            </cc1:TabJQ>
        </div>
    </script>
    <script id="RowTemplate1" type="text/x-kendo-tmpl">
	    <tr>
		    <td style="font-size:12px; vertical-align:middle; width:10%;">
                <b>#: data.numero #</b>
            </td>
            <td style="width:40%;">
                <table style="width: 100%;">
                    <tr><td style="width: 50px;"><b>Modelo:</b> </td><td>#:data.modelo#</td></tr>
                    <tr><td><b>rpm</b>                          </td><td>#:data.rpm#</td></tr>
                    <tr><td><b>Estado</b>                       </td><td>#:data.estado#</td></tr>
                </table>
		    </td>
            <td style="width:45%;">
                <table style="width: 100%;">
                    <tr><td style="width: 270px;"><b>Ultima fecha de cambio</b>     </td><td>#:ultfeccambio#</td></tr>
                    <tr><td><b>Tiempo Necesario para cambiar de equipo (meses)</b>  </td><td>#:tnecesario#</td></tr>
                    <tr><td><b>Puede cambiar su equipo desde</b>                    </td><td>#:cambiodesde#</td></tr>
                    <tr><td><b>Minutos Asignados</b>                                </td><td>#:minutos#</td></tr>
                </table>
            </td>
            <td style="width:15%;">
                <asp:Image runat="server" Style="height: 40px" ImageUrl="#:data.imgmodelo#" />
		    </td>
	    </tr>
    </script>
    <script id="RowTemplate" type="text/x-kendo-tmpl">
	    <tr class="k-master-row">
            <td class="k-hierarchy-cell"><a class="k-icon k-plus" href="\\#" tabindex="-1"></a></td>
		    <td style="font-size:12px; vertical-align:middle; width:25%;">
                <b>#:data.numero#</b>
            </td>
            <td style="width:40%;">
                #:data.modelo# <label style="font-size:smaller; color:Gray;">#:data.vcNomEst#</label>
		    </td>
            <td style="width:20%;">
                #:data.plan#
            </td>
            <td style="width:15%;" align="center">
                <asp:Image runat="server" Style="height: 40px" ImageUrl="#:data.imgmodelo#" />
		    </td>
	    </tr>
    </script>
    <script id="RowTemplateServicio" type="text/x-kendo-tmpl">
        <tr id="tr-#:data.codigo#" class="fila ">
            <td>
                <label></label>
            </td>
            <td>
                <label></label>
            </td>
            <td align="center">
                <input type="checkbox" runat="server" />
            </td>
            <td align="right">
                <label></label>
            </td>
        </tr>
    </script>
    <script id="altRowTemplateServicio" type="text/x-kendo-tmpl">
        <tr id="tr-#:data.codigo#" class="fila k-alt">
            <td>
                #:data.codigo#
            </td>
            <td>
                <label ></label>
            </td>
            <td>
                #:data.descripcion#
            </td>
            <td align="center">
                <input type="checkbox" runat="server" />
            </td>
            <td align="right">
                #:data.costo#
            </td>
        </tr>
    </script>

    <style>
        .k-grid-des {
            background: -moz-linear-gradient(top, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%);
            background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.05)), color-stop(100%,rgba(0,0,0,0.15)));
            background: -webkit-linear-gradient(top, rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
            background: -o-linear-gradient(top, rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
            background: -ms-linear-gradient(top, rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
            background: linear-gradient(to bottom, rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
        }

            .k-grid-des .k-alt {
                background: -moz-linear-gradient(top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%);
                background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.2)), color-stop(100%,rgba(0,0,0,0.1)));
                background: -webkit-linear-gradient(top, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
                background: -o-linear-gradient(top, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
                background: -ms-linear-gradient(top, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
                background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
            }

        input[type=text]::-ms-clear {
            display: none;
        }
        .ui-widget-overlay { 
            height: 100% !important; 
            width: 100% !important;
        }

        /*Edgar Garcia 10022023 clase para el toogle tip*/
        label[title]:hover:after {
              content: attr(title);
              position: absolute;
              padding: 4px 8px;
              background-color: #Faf850;
              color: black;
              white-space: nowrap;
              z-index: 20;
             box-shadow: gray 5px 5px 5px; 
 
            }



    </style>
</head>
<body>
    <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Adm_NuevaSolicitud.js")%>" type="text/javascript"></script>
    <form id="form1" runat="server" autocomplete="off">
        <asp:HiddenField ID="hdfGaleria" runat="server" />
        <asp:HiddenField ID="hdfCodEmpleado" runat="server" />
        <asp:HiddenField ID="hdfCodEmpleadoAutenticado" runat="server" />
        <asp:HiddenField ID="hdfCodIntEmp" runat="server" />
        <asp:HiddenField ID="hdfPerfilesEmpleado" runat="server" />
        <%--Especialista multiple--%>
        <asp:HiddenField ID="hdfSolicitudMultipleEspecialista" runat="server" />
        <%--Perfiles--%>
        <asp:HiddenField ID="hdfLineaSel" runat="server" />
        <asp:HiddenField ID="hdfCodImeiSel" runat="server" />
        <asp:HiddenField ID="hdfAdmin" runat="server" />
        <asp:HiddenField ID="hdfJefeArea" runat="server" />
        <asp:HiddenField ID="hdfCodModDisActual" runat="server" />
        <asp:HiddenField ID="hdfCodModDis" runat="server" />
        <asp:HiddenField ID="hdfCuentaLinea" runat="server" />
        <asp:HiddenField ID="hdfTipoSolicitud" runat="server" />
        <asp:HiddenField ID="hdfServicioSelect" runat="server" />
        <asp:HiddenField ID="hdfGrupOrigEmp" runat="server" />
        <asp:HiddenField ID="hdfCodigoOperador" runat="server" />
        <asp:HiddenField ID="hdfNombreOperador" runat="server" />
        <asp:HiddenField ID="hdfPlanLineaSel" runat="server" />
        <asp:HiddenField ID="hdfCodPlanSel" runat="server" />
        <asp:HiddenField ID="hdfSepDecimal" runat="server" />
        <asp:HiddenField ID="hdfSepMiles" runat="server" />
        <asp:HiddenField ID="hdfNumDecimales" runat="server" />
        <asp:HiddenField ID="hdfCostoReposicion" runat="server" />
        <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
        <%--Com--%>
        <asp:HiddenField ID="hdfEsModal" runat="server" />
        <asp:HiddenField ID="hdfDefTipoSolicitud" runat="server" />
        <asp:HiddenField ID="hdfEsCulminada" runat="server" />
        <asp:HiddenField ID="hdfMostrarAgregarEmpleado" runat="server" />

        <asp:HiddenField ID="hdfNumeroIngresado" runat="server" />

        <div id="dvContenido" class="dvPanel">
            <table width="100%">
                <tr>
                    <td style="width: 80px;" runat="server" id="tdNombreEmpleado1">Empleado
                    </td>
                    <td style="width: 270px;" runat="server" id="tdNombreEmpleado2">
                        <asp:Label ID="lblEmpleado" runat="server" Text=""></asp:Label>
                        <asp:TextBox ID="txtEmpleado" runat="server" Width="250px"></asp:TextBox>
                        <div id="dvContenedorControlBP" runat="server">
                            <uc1:BusquedaPrincipal ID="bpEmpleado" runat="server" Visible="false" />
                        </div>
                        <asp:Label ID="lblMensaje" runat="server"></asp:Label>
                    </td>
                    <td style="width: 40px;" runat="server" id="tdNombreEmpleado3">
                        <div id="btnBusquedaEmpleado" runat="server" title="Buscar Empleado" class="btnNormal">
                            <asp:Image ID="Image1" runat="server" Style="width: 14px" ImageUrl="~/Common/Images/lup.png" />
                        </div>
                    </td>
                    <td style="width: 150px;">
                        <div id="btnAgregarEmpleado" class="btnNormal" <%--style="width: 40px;"--%> title="Agregar Empleado" style="display: none;">
                            <asp:Image ID="imgAgregarEmpleado" runat="server" ToolTip="Agregar Empleado" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                        </div>

                    </td>

                    <td style="width: 90px;">Tipo Solicitud
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlTipoSolicitud" runat="server" Width="235px">
                        </asp:DropDownList>

                         <asp:label ID="LabelDescripcion" runat="server" Style="padding-left:10px" >1213</asp:label><%--Edgar Garcia 10022023--%>
                    </td>  
                    <%--<td>
                    Meses:
                </td>
                <td>
                    <asp:DropDownList ID="ddlMeses" runat="server"></asp:DropDownList>
                </td>--%>
                </tr>
                <%--<tr><td colspan="5" style="height:10px;"></td></tr>--%>
                <tr>
                    <td id="tdTabs" colspan="6"><%--style="height:100%; --%>
                        <div id="dvTabs" runat="server" style="display: none; margin-right: 5px;">
                            <cc1:TabJQ ID="tbSolicitud" runat="server" Style="width: 100%;">
                                <%--height: 375px;--%>
                            </cc1:TabJQ>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="6">
                        <table style="width: 100%;">
                            <tr>
                                <td>
                                    <asp:Label ID="lblMensajeVerificacion" runat="server" Font-Size="12px" ForeColor="#0002BD" Font-Bold="true"></asp:Label>
                                </td>
                                <td id="tdEstadosCreacion" style="display: none;">
                                    <div id="dvCreacionEstado" runat="server" style="display: none;">
                                        <asp:Label ID="lblCreacionEstado" runat="server"></asp:Label>
                                        <asp:DropDownList ID="ddlEstadoCreacion" runat="server"></asp:DropDownList>
                                        <asp:Label ID="lblMensajeEstado" runat="server" Style="color: #093659; font-size: 12px; font-weight: bold;" Text="Solicitud lista para iniciar el proceso respectivo."></asp:Label>
                                    </div>
                                </td>
                                <td style="text-align: right;">
                                    <div id="btnEquiSol" runat="server" class="btnNormal" style="width: 150px;">
                                        <asp:Image ID="Image5" runat="server" Style="width: 14px; vertical-align: bottom;"
                                            ImageUrl="~/Common/Images/Mantenimiento/VerDetalle.png" />
                                        Ver Detalle
                                    </div>
                                    <div id="btnAtras" runat="server" class="btnNormal" style="width: 100px;">
                                        <asp:Image ID="Image2" runat="server" Style="width: 14px; vertical-align: bottom;"
                                            ImageUrl="~/Common/Images/arrow_left.png" />
                                        Atrás
                                    </div>
                                    <div id="btnSiguiente" runat="server" class="btnNormal" style="width: 100px;">
                                        Siguiente
                                    <asp:Image ID="Image3" runat="server" Style="width: 14px; vertical-align: bottom;"
                                        ImageUrl="~/Common/Images/arrow_right.png" />
                                    </div>
                                    <div id="btnFinalizar" runat="server" class="btnNormal" style="width: 100px;">
                                        <asp:Image ID="Image4" runat="server" Style="width: 14px; vertical-align: bottom;"
                                            ImageUrl="~/Common/Images/save.ico" />
                                        Finalizar
                                    </div>
                                    <div id="btnCancelar" runat="server" class="btnNormal">
                                        <asp:Image ID="Image6" runat="server" Style="width: 14px; vertical-align: bottom;"
                                            ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                                        Cerrar
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        <div id="divDispositivos" style="display: none;">
            <table>
                <tr>
                    <td>
                        <div id="grillaDispositivos">
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="divGaleria" style="display: none; overflow: auto;">
            <iframe id="ifGaleria" runat="server" width="100%" height="327px" style="margin: 0px; padding: 0px; overflow: hidden; overflow: none;"
                frameborder="0"></iframe>
            <%--367px--%>
        </div>
        <div id="divSolicitudPersonalizada" style="display: none; overflow: auto;">
            <iframe id="ifSolPer" runat="server" width="100%" height="200px" style="margin: 0px; padding: 0px;"
                frameborder="0"></iframe>
        </div>
        <div id="divServicios1" style="display: none;">
            <table style="width: 100%;">
                <tr>
                    <td style="width: 444px;">
                        <table>
                            <tr>
                                <td style="width: 120px; height: 30px;">Linea Seleccionada:
                                </td>
                                <td>
                                    <asp:Label ID="lblLineaSel" runat="server"></asp:Label>
                                </td>
                            </tr>
                            <tr id="trServicioSeleccionado" runat="server">
                                <td>Servicio seleccionado
                                </td>
                                <td>
                                    <asp:Label ID="lblServSeleccionado" runat="server"></asp:Label>
                                </td>
                            </tr>
                            <%--<tr>
                <td>Modelo de Dispositivo: </td><td><asp:Label ID="lblModDispSel" runat="server"></asp:Label></td>
            </tr>--%>
                            <tr id="trTipoServicio" runat="server">
                                <td style="height: 30px;">
                                    <asp:Label ID="Label1" runat="server">Tipo Servicio</asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlTipoServicio" runat="server" Width="200px">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr id="trServicio" runat="server">
                                <td>
                                    <asp:Label ID="lblNuevoServicio" runat="server">Servicio</asp:Label>
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlServicio" runat="server" Width="200px">
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr id="trIlimitado" runat="server">
                                <td>
                                    <asp:Label ID="Label2" runat="server">Servicio Ilimitado</asp:Label>
                                </td>
                                <td>
                                    <asp:CheckBox ID="chkIlimitado" runat="server" />
                                </td>
                            </tr>
                            <tr id="trCantidad" runat="server">
                                <td>
                                    <asp:Label ID="Label3" runat="server">Cantidad</asp:Label>
                                    <asp:Label ID="lblValorCatnidad" runat="server"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtCatnidadSolicitada" runat="server" MaxLength="10"></asp:TextBox>
                                </td>
                            </tr>
                            <tr id="trMotivo">
                                <td>Motivo
                                </td>
                                <td>
                                    <asp:TextBox ID="txtMotivoActivacion" runat="server" Width="290px" TextMode="MultiLine"
                                        Rows="4" Height="66px" Style="resize: none;" MaxLength="144"></asp:TextBox>
                                </td>
                            </tr>
                            <tr id="trTiempo">
                                <td>Tiempo Solicitado
                                </td>
                                <td>
                                    <asp:RadioButton ID="rbtTemporal" GroupName="gnTiempo" Text="Temporal" runat="server" />
                                    <asp:RadioButton ID="rbtPermanente" GroupName="gnTiempo" Text="Permanente" runat="server" />
                                </td>
                            </tr>
                            <tr id="trFechaInicial">
                                <td>Fecha Inicial
                                </td>
                                <td>
                                    <asp:TextBox ID="txtFechaInicial" runat="server" CssClass="txtFecha"></asp:TextBox>
                                </td>
                            </tr>
                            <tr id="trFechaFinal">
                                <td>Fecha Final
                                </td>
                                <td>
                                    <asp:TextBox ID="txtFechaFinal" runat="server" CssClass="txtFecha"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td align="right" valign="top">
                        <div>
                            <h3>
                                <asp:Label ID="lblTituloGrillaServ" runat="server"></asp:Label></h3>
                        </div>
                        <div id="tbServActuales" runat="server" style="width: 400px;">
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="divServicios" style="display: none;">
            <table width="100%">
                <tr>
                    <td style="width: 80px;">
                        <b>Línea</b>
                    </td>
                    <td>
                        <asp:Label ID="lblLinea" runat="server" CssClass="lbl"></asp:Label>
                    </td>
                    <td style="width: 100px;">
                        <b>Grupo de Empleado</b>
                    </td>
                    <td>
                        <asp:Label ID="lblGrupoOrigen" runat="server" CssClass="lbl"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <b>Operador</b>
                    </td>
                    <td>
                        <asp:Label ID="lblOperador" runat="server" CssClass="lbl"></asp:Label>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="4">
                        <table id="tbServicios">
                            <%--<tr>
                            <td>Servicios</td>
                            <td>Activar</td>
                            <td>Costo</td>
                        </tr>--%>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        <div id="divDocAdjuntos" style="display: none;">
            <table width="100%">
                <tr>
                    <%--<td valign="top" style="width:300px;">
                    <table width="100%">
                        <tr><td style="height:60px;"></td></tr>
                        <tr><td><b>Cantidad máxima de archivos</b></td></tr>
                        <tr><td><label id="lblAdjuntosValidCantidad" style="padding-left:20px; " >2 archivos</label></td></tr>
                        <tr><td style="height:10px;"></td></tr>
                        <tr><td><b>Extensiones permitidas</b></td></tr>
                        <tr><td><label id="lblAdjutnosValidExtensiones" style="padding-left:20px;">pdf,txt,jpg</label></td></tr>
                        <tr><td style="height:10px;"></td></tr>
                        <tr><td><b>Tipo validación de tamaño de archivo</b></td></tr>
                        <tr><td><label id="lblAdjuntosValidTamanoTipo" style="padding-left:20px;">Total</label></td></tr>
                        <tr><td style="height:10px;"></td></tr>
                        <tr><td><b>Tamaño máximo permitido según tipo</b></td></tr>
                        <tr><td><label id="lblAdjutnosValidTamanoMax" style="padding-left:20px;">3 mb</label></td></tr>
                    </table>
                </td>--%>
                    <td align="center" style="width: 800;" colspan="6">
                        <iframe id="ifDocAdjuntos" runat="server" src="Adm_AdjuntarArchivos.aspx?pagOri=NuevaSolicitud&estSol=0"
                            width="430" height="330" style="margin: 0px; padding: 0px;" frameborder="0"></iframe>
                    </td>
                </tr>
                <tr>
                    <td>
                        <b>Cantidad máxima de archivos: </b>
                        <label id="lblAdjuntosValidCantidad" style="padding-right: 10px;" />
                    </td>
                    <td>
                        <b>Extensiones permitidas: </b>
                        <label id="lblAdjutnosValidExtensiones" style="padding-right: 10px;" />
                    </td>
                    <td>
                        <b>Tamaño máximo permitido: </b>
                        <label id="lblAdjutnosValidTamanoMax" />
                        <%-- (<label id="lblAdjuntosValidTamanoTipo" />)--%>
                    </td>
                </tr>
            </table>
        </div>
        <div id="divCondiciones" style="display: none;">
            <div class="ui-state-default ui-corner-all" style="padding: 1px;">
                <table cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="width: 20px;">
                            <span class="ui-icon ui-icon-suitcase" style="float: left; margin: -2px 5px 0 0;"></span>
                        </td>
                        <td>
                            <asp:Label ID="lblPrevisualizacionCab" runat="server" Text="Condiciones de Solicitud" Font-Bold="true" Font-Size="Small"></asp:Label>
                        </td>
                        <td style="width: 150px;" align="right">
                            <div id="btnDescargar" class="btnNormal" style="height: 26px; float: left;">
                                <img alt="Descargar" src="../../Common/Images/Importar.ico" height="16px" width="16px" style="margin-top: -3px; vertical-align: center;" />
                                <a>Descargar</a>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <%--<table>
            <tr>
                <td align="center">
                    <h3>
                        Condiciones de Solicitud</h3>
                    <asp:TextBox ID="txtCondiciones" runat="server" TextMode="MultiLine" ReadOnly="true"
                        Width="500px" Height="225px" Style="resize: none;"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="radio" name="condic" id="chk-acuerdo" value="chk1" />
                    <label id="lblAcuerdo" for="chk-acuerdo">
                        Estoy de acuerdo con las condiciones.</label>
                    <br />
                    <input type="radio" name="condic" id="chk-desacuerdo" value="chk2" />
                    <label id="lblDesacuerdo" for="chk-desacuerdo">
                        No estoy de acuerdo con las condiciones.</label>
                </td>
            </tr>
        </table>--%>
            <div>
                <iframe id="ifCondiciones" frameborder="0" style="padding: 0px; margin: 0px; height: 500px; width: 100%;"></iframe>
            </div>
            <div style="float: right">
                <table>
                    <tr>
                        <td>
                            <input type="radio" name="condic" id="chk-acuerdo" value="chk1" />
                            <label id="lblAcuerdo" for="chk-acuerdo">Estoy de acuerdo con las condiciones.</label>
                        </td>
                        <td style="width: 50px;"></td>
                        <td>
                            <input type="radio" name="condic" id="chk-desacuerdo" value="chk2" />
                            <label id="lblDesacuerdo" for="chk-desacuerdo">No estoy de acuerdo con las condiciones.</label>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div id="divMensaje" style="display: none;">
            <table width="100%">
                <tr>
                    <td align="center">
                        <asp:Label ID="lblTituloMensaje" runat="server" Text="Motivo De Solicitud" Font-Bold="True" Font-Size="13px"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <asp:TextBox ID="txtMensaje" runat="server"></asp:TextBox>
                        <%--Height="240px"--%>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div id="dvMensajeObligatorio" runat="server" style="display: none; float: left;">
                            El motivo es obligatorio, ingrese por lo menos&nbsp;<asp:Label ID="lblMensajeValidCant" runat="server"></asp:Label>&nbsp;<asp:Label ID="lblMensajeValidTipo" runat="server"></asp:Label>.
                        </div>
                        <div id="btnLimpiarMensaje" runat="server" class="btnNormal" style="float: left; display: none;">
                            <asp:Image ID="Image7" runat="server" Style="width: 14px; vertical-align: bottom;"
                                ImageUrl="~/Common/Images/Mantenimiento/Borrar.png" />
                            Limpiar mensaje
                        </div>
                        <div style="float: right;">
                            Número de&nbsp;<asp:Label ID="lblMensajeValidTipo2" runat="server"></asp:Label>
                            &nbsp;<asp:Label ID="lblNumWordCaracMensaje" runat="server" Text="0"></asp:Label>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="divDispSolicitado" runat="server" style="display: none; padding: 0; overflow: hidden">
            <div>
                <table style="padding-left: 20px; padding-bottom: 5px;">
                    <tr>
                        <td style="width: 120px;">Codigo</td>
                        <td>
                            <asp:TextBox ID="txtCodigo" runat="server" Width="200" ReadOnly="true"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>Tipo Solicitud</td>
                        <td>
                            <asp:TextBox ID="txtTipo" runat="server" Width="200" ReadOnly="true"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>Fecha Creación</td>
                        <td>
                            <asp:TextBox ID="txtFechaCreacion" runat="server" Width="200" ReadOnly="true"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>Estado Actual</td>
                        <td>
                            <asp:TextBox ID="txtEstadoActual" runat="server" Width="200" ReadOnly="true"></asp:TextBox>
                        </td>
                    </tr>
                    <tr id="trModeloSolicitado" style="display: none;">
                        <td>Modelo Solicitado</td>
                        <td></td>
                    </tr>
                </table>
            </div>
            <div id="dvModeloSolicitado" style="display: none;">
                <iframe id="ifEquipoSolic" height="280px" width="500px" frameborder="0"></iframe>
            </div>
        </div>
        <div id="divPlanes" style="display: none;">
            <br />
            <table width="100%">
                <tr>
                    <td valign="top" style="width: 310px;">
                        <table width="300px">
                            <tr>
                                <td colspan="2">
                                    <b>Datos del plan:</b>
                                </td>
                            </tr>
                            <tr id="trLineaAmpliacion" style="display: none;">
                                <td>Linea:
                                </td>
                                <td>
                                    <asp:Label ID="lblLineaAmp" runat="server" Width="200px"></asp:Label>
                                </td>
                            </tr>
                            <tr id="trPlanActual" style="display: none;">
                                <td>Plan Actual:
                                </td>
                                <td>
                                    <asp:Label ID="lblPlanActual" runat="server" Width="200px"></asp:Label>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 80px;">Operador:
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlOperador" runat="server" Width="210px">
                                    </asp:DropDownList>
                                    <asp:Label ID="lblOperadorLinea" runat="server" Width="200px"></asp:Label>
                                </td>
                            </tr>
                            <%--<tr>
                            <td>
                                Planes:
                            </td>
                            <td>
                                <asp:TextBox ID="txtPlan" runat="server" Width="200px"></asp:TextBox>
                                
                            </td>
                        </tr>--%>
                            <tr>
                                <td>Planes:
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlPlan" runat="server" Width="210px">
                                    </asp:DropDownList>
                                    <asp:HiddenField ID="hdfCodPlan" runat="server" />
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="padding-top: 20px;">
                                    <b>Costo de modelo según el operador:</b>
                                </td>
                            </tr>
                            <tr>
                                <td>Modelo:
                                </td>
                                <td>
                                    <asp:TextBox ID="txtModeloSeleccionado" runat="server" Width="200" ReadOnly="true"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td>Precio:
                                </td>
                                <td>
                                    <asp:TextBox ID="txtCostoModelo" runat="server" Width="200" ReadOnly="true"></asp:TextBox>
                                </td>
                            </tr>
                            <tr style="display: none;">
                                <td colspan="2">
                                    <asp:Label ID="lblAdvertenciaPlan" runat="server">* El costo referencial del equipo se calculará de acuerdo al operador que haya seleccionado en esta pestaña</asp:Label>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td>
                        <div id="trDetalle" style="display: none;">
                            <cc1:BarraNavegacionJQ ID="bnPlan" runat="server">
                                <cc1:PanelBarraNavegacion ID="pbnDetallePlan" runat="server" Titulo="Detalle Plan"
                                    MostrarIcono="false" Mostrar="true" Width="100%" Height="250px">
                                    <cc1:ItemBarraNavegacion ID="ItemBarraNavegacion1" runat="server" Activo="true" Click=""
                                        Font-Bold="false" Seleccionable="false" UrlIco="">
                                        <table width="100%">
                                            <tr>
                                                <td style="width: 100px;">Nombre:
                                                </td>
                                                <td>
                                                    <asp:Label ID="lblNombrePlan" runat="server"></asp:Label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Monto Total:
                                                </td>
                                                <td>
                                                    <asp:Label ID="lblMontoTotal" runat="server"></asp:Label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top">Descripción:
                                                </td>
                                                <td id="lblDescripcionPlan">
                                                    <%--<asp:Label ID="lblDescripcionPlan" runat="server"></asp:Label>--%>
                                                </td>
                                            </tr>
                                        </table>
                                        <div class="ui-widget-content ui-helper-clearfix" style="margin: 0.6em .0em; height: 0.01em;">
                                        </div>
                                        Sub Planes:
                                    <br />
                                        <table id="tbSubPlanes">
                                        </table>
                                    </cc1:ItemBarraNavegacion>
                                </cc1:PanelBarraNavegacion>
                            </cc1:BarraNavegacionJQ>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="divPlanes1" style="display: none;">
            <label style="font-size: smaller; color: Gray;"></label>
        </div>
        <div id="divSeleccionEmpleado" runat="server" style="display: none; padding: 0px; margin: 0px;">
            <iframe id="ifSeleccionEmpleado" frameborder="0" style="padding: 0px; margin: 0px; overflow: hidden;" scrolling="no"
                width="740px" height="470px"></iframe>
        </div>
        <div id="MsgConfirmacionAvance" runat="server" style="display: none;">
            Ud. va a generar una Solicitud de Equipo sin Línea, ¿Desea continuar?
        <br />
            <br />
            Para generar una solicitud de Equipo con línea, seleccione el check "Solicitar Equipo
        con Línea".
        </div>
        <div id="divResumen" style="display: none; height: 315px;">
            <div id="divFinanciamiento" class="dvPanel" style="padding-top: 5px; margin-top: 7px;">
                <table id="tbFinanciamiento">
                    <tr>
                        <td colspan="2" style="padding-left: 100px; padding-bottom: 7px;">
                            <label>Datos financiamiento</label>
                            <%--&nbsp;
                        <asp:Label ID="lblNombreFinanc" runat="server"></asp:Label>
                        <asp:HiddenField ID="hdfIdFInanciamiento" runat="server" />
                        <img id="imgInfoFinanciamiento" title="Ver detalle" class="imgBtn" 
                        src="../../../Common/Images/Mantenimiento/VerDetalle.png" />--%>
                        </td>
                    </tr>
                    <tr id="trMontoFijo">
                        <td style="width: 150px;">Monto de solicitud</td>
                        <td>
                            <asp:TextBox ID="txtMonto" runat="server"></asp:TextBox>
                            <asp:Label ID="lblMontoReferencial" runat="server"></asp:Label>
                        </td>
                    </tr>
                    <tr id="trFinanciamiento">
                        <td>Financiamiento
                        </td>
                        <td>
                            <asp:TextBox ID="txtNombreFinanc" runat="server" ReadOnly="true" Width="300"></asp:TextBox>
                            <asp:HiddenField ID="hdfIdFInanciamiento" runat="server" />
                            <img id="imgInfoFinanciamiento" title="Ver detalle" class="imgBtn"
                                src="../../Common/Images/Mantenimiento/VerDetalle.png" />
                        </td>
                    </tr>
                    <tr id="trMesesCuotas">
                        <td style="width: 150px;">Cuotas de pago</td>
                        <td>
                            <asp:TextBox ID="txtMesesCuotas" runat="server" MaxLength="4"></asp:TextBox>
                            <asp:Label ID="lblMesesCuotas" runat="server" Font-Italic="true"></asp:Label>
                        </td>
                    </tr>
                    <tr id="trPeriodoGracia">
                        <td style="width: 150px;">Periodo de Gracia</td>
                        <td>
                            <asp:TextBox ID="txtPeriodoGracia" runat="server" MaxLength="4"></asp:TextBox>
                            <asp:Label ID="lblPeriodoGracia" runat="server"></asp:Label>
                        </td>
                    </tr>
                </table>
            </div>
            <div style="height: 10px;"></div>
            <div id="divResumenDatos" class="dvPanel" style="overflow: auto;">
                <%--height:175px;--%>
                <table id="tbResumenSolicitud">
                    <tr>
                        <td colspan="2" style="padding-left: 100px; padding-bottom: 7px;">
                            <label>Resumen</label>
                        </td>
                    </tr>
                    <tr id="trDispositivos" style="display: none;">
                        <td style="width: 150px;">
                            <asp:Label ID="lblDispositivo" runat="server" Text="Dispositivo seleccionado"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtDispositivoValor" runat="server" Width="440" ReadOnly="true"></asp:TextBox>
                        </td>
                    </tr>
                    <tr id="trGaleria" style="display: none;">
                        <td>
                            <asp:Label ID="lblGaleriaTitulo" runat="server" Text="Modelo Seleccionado"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtGaleriaValor" runat="server" Width="440" ReadOnly="true"></asp:TextBox>
                        </td>
                    </tr>
                    <tr id="trOperador" style="display: none;">
                        <td>
                            <asp:Label ID="lblOperadorTitulo" runat="server" Text="Operador"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtOperadorValor" runat="server" Width="440" ReadOnly="true"></asp:TextBox>
                        </td>
                    </tr>
                    <tr id="trAmpPlanActual" style="display: none;">
                        <td>
                            <asp:Label ID="lblAmpPlanActualTitulo" runat="server" Text="Plan actual"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtAmpPlanActualValor" runat="server" Width="440px"></asp:TextBox>
                        </td>
                    </tr>
                    <tr id="trCuenta" style="display: none;">
                        <td>
                            <asp:Label ID="lblCuentaTitulo" runat="server" Text="Cuenta"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtCuentaValor" runat="server" Width="440" ReadOnly="true"></asp:TextBox>
                        </td>
                    </tr>
                    <tr id="trPaquetes" style="display: none;">
                        <td>
                            <asp:Label ID="lblPaquetesTitulo" runat="server" Text="Paquetes Ampliación"></asp:Label>
                        </td>
                        <td>
                            <asp:ListBox ID="lstPaquetesValor" runat="server" Width="450" Enabled="false" Rows="2"></asp:ListBox>
                            <asp:Label ID="lblPaquetesValor" runat="server" Text="No se ha ampliado ningún servicio" Style="display: none;"></asp:Label>
                        </td>
                    </tr>
                    <tr id="trCostoTotal" style="display: none;">
                        <td>
                            <asp:Label ID="lblCostoTotalTitulo" runat="server" Text="Costo Total"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtCostoTotalValor" runat="server" Width="440" ReadOnly="true"></asp:TextBox>
                        </td>
                    </tr>
                    <tr id="trPlanes" style="display: none;">
                        <td>
                            <asp:Label ID="lblPlanesTitulo" runat="server" Text="Plan seleccionado"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtPlanValor" runat="server" Width="440" ReadOnly="true"></asp:TextBox>
                            <asp:Label ID="lblPlanValor" runat="server" Text="No se ha seleccionado ningún plan nuevo" Style="display: none;"></asp:Label>
                        </td>
                    </tr>
                    <tr id="trServicios" style="display: none;">
                        <td>
                            <asp:Label ID="lblServiciosTitulo" runat="server" Text="Servicios"></asp:Label>
                        </td>
                        <td>
                            <asp:ListBox ID="lstServiciosValor" runat="server" Width="450px"></asp:ListBox>
                        </td>
                    </tr>
                    <tr id="trMensaje" style="display: none;">
                        <td style="width: 150px; vertical-align: top;">
                            <asp:Label ID="lblMensajeTitulo" runat="server" Text="Descripción"></asp:Label>
                        </td>
                        <td>
                            <div id="dvMensajeValor" runat="server">
                                <asp:TextBox ID="txtMensajeValor" runat="server" ReadOnly="true" Rows="4" TextMode="MultiLine" Width="450px" resize="false" Height="120px" Enabled="false"></asp:TextBox>
                            </div>
                            <asp:Label ID="lblMensajeValor" runat="server" Text="No ha ingresado ninguna descripcion." Style="display: none;"></asp:Label>
                        </td>
                    </tr>
                    <tr id="trDocAdjuntos" style="display: none;">
                        <td>
                            <asp:Label ID="lblDocAdjuntosTitulo" runat="server" Text="Archivos adjuntos"></asp:Label>
                        </td>
                        <td>
                            <asp:ListBox ID="lstDocAdjuntosValor" runat="server" Width="440px" Enabled="false" Rows="2"></asp:ListBox>
                            <asp:Label ID="lblDocAdjuntosValor" runat="server" Text="No se ha adjuntado ningún archivo." Style="display: none;"></asp:Label>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div id="divPaquetes" style="display: none; height: 315;">
            <table>
                <tr>
                    <td valign="top" style="width: 310px;">
                        <table width="300px">
                            <tr>
                                <td style="width: 80px;">Modelo</td>
                                <td>
                                    <asp:TextBox ID="txtAmpModeloDispositivo" runat="server" ReadOnly="true" Width="258px"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td>Operador</td>
                                <td>
                                    <asp:TextBox ID="txtAmpOperado" runat="server" ReadOnly="true" Width="258px"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td>Línea</td>
                                <td>
                                    <asp:TextBox ID="txtAmpLinea" runat="server" ReadOnly="true" Width="258px"></asp:TextBox>
                                </td>
                            </tr>
                            <tr class="AmpPlanes" style="display: none">
                                <td>Plan Actual</td>
                                <td>
                                    <asp:TextBox ID="txtAmpPlanActual" runat="server" ReadOnly="true" Width="258px"></asp:TextBox>
                                </td>
                            </tr>
                            <tr class="AmpPlanes" style="display: none;">
                                <td>Planes</td>
                                <td>
                                    <asp:DropDownList ID="ddlAmpPlanes" runat="server" Width="268px"></asp:DropDownList>
                                </td>
                            </tr>
                            <tr class="AmpPaquetes" style="display: none;">
                                <td>Cuenta</td>
                                <td>
                                    <asp:TextBox ID="txtAmpCuenta" runat="server" Width="258px" ReadOnly="true"></asp:TextBox>
                                </td>
                            </tr>
                            <tr class="AmpPaquetes" style="display: none;">
                                <td colspan="2">
                                    <table id="tblServicio"></table>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="width: 15px" align="center">
                        <div id="linFiltro2" class="ui-widget-content ui-helper-clearfix" style="margin: 0.5em .5em; height: 25em; width: 0.01em;"></div>
                    </td>
                    <td valign="top">
                        <div id="trAmpDetalle" style="display: none;">
                            <cc1:BarraNavegacionJQ ID="bnAmpPlan" runat="server">
                                <cc1:PanelBarraNavegacion ID="pbnAmpDetallePlan" runat="server" Titulo="Detalle Plan"
                                    MostrarIcono="false" Mostrar="true" Width="100%" Height="250px">
                                    <cc1:ItemBarraNavegacion ID="ItemBarraNavegacion2" runat="server" Activo="true" Click=""
                                        Font-Bold="false" Seleccionable="false" UrlIco="">
                                        <table width="100%">
                                            <tr>
                                                <td style="width: 100px;">Nombre:
                                                </td>
                                                <td>
                                                    <asp:Label ID="lblAmpNombrePlan" runat="server"></asp:Label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Monto Total:
                                                </td>
                                                <td>
                                                    <asp:Label ID="lblAmpMontoTotal" runat="server"></asp:Label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top">Descripción:
                                                </td>
                                                <td id="Td1">
                                                    <%--<asp:Label ID="lblDescripcionPlan" runat="server"></asp:Label>--%>
                                                </td>
                                            </tr>
                                        </table>
                                        <div class="ui-widget-content ui-helper-clearfix" style="margin: 0.6em .0em; height: 0.01em;">
                                        </div>
                                        Sub Planes:
                                    <br />
                                        <table id="tbAmpSubPlanes">
                                        </table>
                                    </cc1:ItemBarraNavegacion>
                                </cc1:PanelBarraNavegacion>
                            </cc1:BarraNavegacionJQ>
                        </div>
                        <div id="trAmpDetServ" style="display: none;" class="AmpPaquetes">
                            <table>
                                <tr>
                                    <td colspan="3" align="center">
                                        <b>Agregar paquetes de ampliación</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Tipo
                                    </td>
                                    <td colspan="2">
                                        <asp:DropDownList ID="ddlTipoServicioAmp" runat="server" Width="120">
                                        </asp:DropDownList>
                                        <div style="float: right;">
                                            Servicios&nbsp;&nbsp;
                                        <asp:DropDownList ID="ddlServCuentaTipo" runat="server" Width="150">
                                            <asp:ListItem Value="-2" Text="<Seleccione Tipo>"></asp:ListItem>
                                        </asp:DropDownList>
                                        </div>
                                    </td>
                                </tr>
                                <tr style="display: none;">
                                    <td colspan="2" style="padding-top: 5px;">
                                        <asp:HiddenField ID="hdfAmpCodServ" runat="server" />
                                        <asp:HiddenField ID="hdfAmpCodIlimitado" runat="server" />
                                        <asp:HiddenField ID="hddAmpTipoServicio" runat="server" />
                                        Paquetes para el servicio:&nbsp;
                                    <asp:Label ID="lblAmpNombreServ" runat="server"></asp:Label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Paquetes
                                    </td>
                                    <td style="padding-top: 8px;">
                                        <asp:DropDownList ID="ddlAmpPaquetes" runat="server" Width="300px"></asp:DropDownList>
                                    </td>
                                    <td align="right" valign="bottom">
                                        <img id="imgAgregarPaquete" title="Agregar" class="imgBtn" src="../../Common/Images/Mantenimiento/add_16x16.gif" />
                                        <img id="imgQuitarPaquete" title="Quitar" class="imgBtn" src="../../Common/Images/Mantenimiento/Cancelar.png" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3" style="padding-top: 8px;">
                                        <table id="tbAmpPaquetes"></table>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <div style="width: 400px;">
                                            <label style="color: #4297d7; font-size: 11px; font-weight: bold; font-style: italic; width: 400px; padding-top: 8px;">
                                                La cantidad y costo del servicio serán reemplazado por la cantidad y costo del paquete seleccionado
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
            </table>

        </div>
        <div id="divInfoFinanciamiento" style="display: none; overflow: hidden;">
            <iframe id="ifInfoFinanciamiento" runat="server" style="margin: 0px; padding: 0px;" frameborder="0"></iframe>
        </div>
        <div id="divMsgConfirmar" style="display: none;">
            <asp:Label ID="lblMsjConfirmacion" runat="server"></asp:Label>
        </div>
        <div id="divMsgConfirmarPaquete" style="display: none;">
            <asp:Label ID="lblMsjConfirmUpdPaquete" runat="server"></asp:Label>
        </div>
        <div id="divMsgConfirmarCostoExtra" style="display: none;">
            <asp:Label ID="lblCostExt_Msj" runat="server">
        Ud. no ha cumplido con el tiempo de contrato del dispositivo pero puede acceder a un cambio de equipo pagando una penalidad por el tiempo restante del contrato.
            </asp:Label>
            <br />
            <br />
            &nbsp;&nbsp;&nbsp;Fecha fin de contrato:
            <asp:Label ID="lblCostExt_Det1" runat="server"></asp:Label><br />
            &nbsp;&nbsp;&nbsp;Penalidad por tiempo:
            <asp:Label ID="lblCostExt_Det2" runat="server"></asp:Label><br />
            <br />
            ¿Desea crear la solicitud?
        </div>
        <div id="divMsjRefrescarPaquetes" style="display: none;">
            Se eliminarán los paquetes seleccionados.
        </div>
    </form>
</body>
</html>
