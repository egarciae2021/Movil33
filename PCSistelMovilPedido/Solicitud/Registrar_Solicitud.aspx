<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Registrar_Solicitud.aspx.vb" Inherits="WebSiteCliente.Registrar_Solicitud" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <%--<link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>--%>

    <link href="../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <%--<link href="../../Common/Styles/KendoUI/kendo.default.min.css" rel="stylesheet" type="text/css" />--%>
    <%--<link rel="stylesheet" href="../../Common/Styles/basic.css" type="text/css" /><%-- galleriffic--%>
    <%--<link href="../../Common/Styles/white.css" rel="stylesheet" type="text/css" /><%-- galleriffic--%>
    <%--<link href="../../Common/Styles/galleriffic-5.css" rel="stylesheet" type="text/css" /><%-- galleriffic--%>
    <link href="../Common/Styles/galleriffic-2.css" rel="stylesheet" type="text/css" /><%-- galleriffic--%>

    <script src="../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript" ></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript" ></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript" ></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript" ></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script> <%-- uniform --%>
    <script src="../Common/Scripts/jquery.history.js" type="text/javascript"></script><%-- galleriffic--%>
	<script src="../Common/Scripts/jquery.galleriffic.js" type="text/javascript"></script><%-- galleriffic--%>
	<script src="../Common/Scripts/jquery.opacityrollover.js" type="text/javascript"></script><%-- galleriffic--%>

    <script src="../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/KendoUI/kendo.editor.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/KendoUI/kendo.tabstrip.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>

    <%--<script src="../../Common/Scripts/KendoUI/js/jquery.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/js/kendo.all.min.js" type="text/javascript"></script>--%>
    
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../Pedido/Pedido.css" rel="stylesheet" type="text/css" />
    <meta http-equiv="Content-Type" content="text/html; charset=windows-1252" />
    <meta name="Generator" content="Microsoft Word 15 (filtered)" />

    <script src="Registrar_Solicitud.js" type="text/javascript"></script>

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
    <script id="DetailTemplate1" type="text/x-kendo-tmpl">
        <div class="tabstrip">
            <table border="1px" cellspacing="0px" cellpadding="0px" width="600px">
                <tr><td align="center" style="width:30%;">Datos</td><td align="center" style="width:50%;">Politicas</td></tr>
                <tr>
                    <td>
                        <table border="1px" cellspacing="0px" cellpadding="0px" width="200px">
                            <tr><td>RPM:</td>               <td>#:data.rpm#</td></tr>
                            <tr><td>Estado:</td>            <td>#:data.estado#</td></tr>
                            <tr><td>Minutos Asignados:</td> <td>#:data.minutos#</td></tr>
                        </table>
                    </td>
                    <td>
                        <table border="1px" cellspacing="0px" cellpadding="0px" width="400px">
                            <tr><td>Última fecha de cambio:</td>                            <td>#:data.ultfeccambio#</td></tr>
                            <tr><td>Tiempo necesario para cambiar de equipo (meses):</td>   <td>#:data.tnecesario#</td></tr>
                            <tr><td>Puede cambiar su equipo desde:</td>                     <td>#:data.cambiodesde#</td></tr>
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
                #:data.modelo#
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
                #:data.codigo#
            </td>
            <td>
                <label ></label>
            </td>
            <td align="center">
                <input type="checkbox" runat="server" />
            </td>
            <td align="right">
                <label>#:data.costo#</label>
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
    <%--<script id="chkTemplate" type="text/x-kendo-tmpl">
        # if (activar == 'True') { #
            #= <input id="chk-#:data.codigo#" type="checkbox" runat="server" checked="checked" /> #
        # } else {
            #= <input id="chk-#:data.codigo#" type="checkbox" runat="server" /> #
    </script>--%>
    <%--<style scoped>
        .k-detail-cell .k-tabstrip .k-content {
            padding: 0.2em;
        }
    </style>--%>
    <style>
        .k-grid-des {
            background: -moz-linear-gradient(top,  rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%);
            background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.05)), color-stop(100%,rgba(0,0,0,0.15)));
            background: -webkit-linear-gradient(top,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
            background: -o-linear-gradient(top,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
            background: -ms-linear-gradient(top,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
            background: linear-gradient(to bottom,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
        }
        .k-grid-des .k-alt {
            background: -moz-linear-gradient(top,  rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%);
            background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.2)), color-stop(100%,rgba(0,0,0,0.1)));
            background: -webkit-linear-gradient(top,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
            background: -o-linear-gradient(top,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
            background: -ms-linear-gradient(top,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
            background: linear-gradient(to bottom,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
        }
    </style>

    <style scoped>
        #organizer {
            width: 300px;
            margin: 0 auto;
            padding: 47px 0 0 0;
            background: url('../Common/Images/orgHead.png') transparent no-repeat 0 0;
        }
        #bottom {
            width: 300px;
            height: 90px;
            background: url('../Common/Images/orgFoot.png') transparent no-repeat 0 0;
        }
        .teamMate:after {
            content: ".";
            display: block;
            height: 0;
            line-height: 0;
            clear: both;
            visibility: hidden;
        }
        .teamMate h2 {
            font-size: 1.4em;
            font-weight: normal;
            padding-top: 20px;
        }
        .teamMate p {
            margin: 5px 0;
        }
        .teamMate img {
            float: left;
            margin: 5px 15px 5px 5px;
            border: 1px solid #ccc;
            height: 85px;
            width: 90px
        }
        
        .teamMateR img {
            float: right;
            margin: 5px 15px 5px 5px;
            border: 1px solid #ccc;
            height: 85px;
            width: 90px
        }
        .miTabla{
            border-collapse:collapse;
            width:99%;
            margin: 0 auto;
        }
        
        .miTabla td{
            padding: 4px;
            border: 0px solid #aeaaaa;
            left: 5%;
        }        
        
    </style>

</head>
<body>
    <form id="form1" runat="server" autocomplete="off">
    <asp:HiddenField ID="hdfGaleria" runat="server" />
    <asp:HiddenField ID="hdfCodEmpleado" runat="server" />
    <asp:HiddenField ID="hdfLineaSel" runat="server" />
    <asp:HiddenField ID="hdfCodImeiSel" runat="server" />
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfCodModDisActual" runat="server" />
    <asp:HiddenField ID="hdfCodModDis" runat="server" />
    <asp:HiddenField ID="hdfCuentaLinea" runat="server" />
    <asp:HiddenField ID="hdfTipoSolicitud" runat="server" />
    <asp:HiddenField ID="hdfServicioSelect" runat="server" />
    <asp:HiddenField ID="hdfGrupOrigEmp" runat="server" />
    <asp:HiddenField ID="hdfCodigoOperador" runat="server" />
    <asp:HiddenField ID="hdfNombreOperador" runat="server" />
    <asp:HiddenField ID="hdfPlanLineaSel" runat="server" />

    <asp:HiddenField ID="hdfSepDecimal" runat="server" />
    <asp:HiddenField ID="hdfSepMiles" runat="server" />
    <asp:HiddenField ID="hdfNumDecimales" runat="server" />

    <%--style="height:495px;"--%>
    <div id="dvContenido" class="dvPanel">
        <table width="100%">
            <tr>
                <td style="width:80px;">Empleado</td>
                <td style="width:270px;">
                    <asp:Label ID="lblEmpleado" runat="server" Text=""></asp:Label>
                    <asp:TextBox ID="txtEmpleado" runat="server" Width="250px"></asp:TextBox>
                    <asp:Label ID="lblMensaje" runat="server"></asp:Label>
                </td>
                <td style="width:150px;">
                    <%--<div id="btnBusquedaEmpleado" runat="server" title="Buscar Empleado" class="btnNormal">
                        <asp:Image ID="Image1" runat="server" Style="width: 14px" ImageUrl="~/Common/Images/Solicitudes/lup.png" />
                    </div>--%>
                </td>
                <td style="width:130px;">
                    Tipo de Solicitud
                </td>
                <td>
                    <asp:DropDownList ID="ddlTipoSolicitud" runat="server" Width="235px"></asp:DropDownList>
                </td>
                <%--<td>
                    Meses:
                </td>
                <td>
                    <asp:DropDownList ID="ddlMeses" runat="server"></asp:DropDownList>
                </td>--%>
            </tr>
            <tr><td colspan="5" style="height:10px;"></td></tr>
            <tr>
                <td id="tdTabs" colspan="5" style="height:400px;">
                    <div id="divTabs" class="navtaps">
                    </div>
                    <div id="detalleTabs" runat="server">
                        <div id="divDispositivos" style="display:none; height:367px;">
                            <table>
                                <tr>
                                    <td>
                                        <div id="grillaDispositivos"></div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div id="divGaleria" style="display:none; overflow:auto;">
                            <iframe id="ifGaleria" runat="server" width="100%" height="367px"
                                style="margin:0px; padding:0px;" frameborder="0"></iframe>
                        </div>
                        <div id="divDocAdjuntos" style="display:none;">
                            <table width="100%">
                                <tr>
                                    <td align="center" style="width:800px;">
                                        <iframe id="ifDocAdjuntos" runat="server" src="Adm_AdjuntarArchivos.aspx?pagOri=NuevaSolicitud" width="430" height="361"
                                            style="margin:0px; padding:0px;" frameborder="0"></iframe>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div id="divMensaje" style="display:none;">
                            <table width="100%">
                                <tr>
                                    <td align="center">
                                        <asp:Label ID="lblTituloMensaje" runat="server" Text="Motivo de Reparación"></asp:Label>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <asp:TextBox ID="txtMensaje" runat="server" Height="300px"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div id="divPlanes" style="display:none;">
                            <br />
                            <table width="100%">
                                <tr>
                                    <td valign="top" style="width:310px;">
                                        <table width="300px">
                                            <tr id="trLineaAmpliacion" style="display:none;">
                                                <td>
                                                    Linea:
                                                </td>
                                                <td>
                                                    <asp:Label ID="lblLineaAmp" runat="server" Width="200px"></asp:Label>
                                                </td>
                                            </tr>
                                            <tr id="trPlanActual" style="display:none;">
                                                <td>
                                                    Plan Actual:
                                                </td>
                                                <td>
                                                    <asp:Label ID="lblPlanActual" runat="server" Width="200px"></asp:Label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width:80px;">
                                                    Operador:
                                                </td>
                                                <td>
                                                    <asp:DropDownList ID="ddlOperador" runat="server" Width="210px"></asp:DropDownList>
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
                                                <td>
                                                    Planes:
                                                </td>
                                                <td>
                                                    <asp:DropDownList ID="ddlPlan" runat="server" Width="210px"></asp:DropDownList>
                                                    <asp:HiddenField ID="hdfCodPlan" runat="server" />
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td>
                                        <div id="trDetalle" style="display:none;">
                                            <cc1:BarraNavegacionJQ ID="bnPlan" runat="server">
                                                <cc1:PanelBarraNavegacion ID="pbnDetallePlan" runat="server" Titulo="Detalle Plan" MostrarIcono="false" Mostrar="true" Width="100%" Height="275px">
                                                    <cc1:ItemBarraNavegacion ID="ItemBarraNavegacion1" runat="server" Activo="true" Click="" Font-Bold="false" Seleccionable="false" UrlIco="">
                                                        <table width="100%">
                                                            <tr>
                                                                <td style="width:100px;">
                                                                    Nombre:
                                                                </td>
                                                                <td>
                                                                    <asp:Label ID="lblNombrePlan" runat="server"></asp:Label>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    Monto Total:
                                                                </td>
                                                                <td>
                                                                    <asp:Label ID="lblMontoTotal" runat="server"></asp:Label>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td valign="top">
                                                                    Descripcion:
                                                                </td>
                                                                <td id="lblDescripcionPlan">
                                                                    <%--<asp:Label ID="lblDescripcionPlan" runat="server"></asp:Label>--%>
                                                                </td>
                                                            </tr>
                                        
                                                        </table>
                                                        <div class="ui-widget-content ui-helper-clearfix" style="margin: 0.6em .0em;height:0.01em;"></div>
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
                        <div id="divServicios" style="display:none;">
                            <table width="500px">
                                <tr>
                                    <td style="width:120px;">
                                        Línea
                                    </td>
                                    <td>
                                        <asp:Label ID="lblLinea" runat="server" CssClass="lbl"></asp:Label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Operador
                                    </td>
                                    <td>
                                        <asp:Label ID="lblOperador" runat="server" CssClass="lbl"></asp:Label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Grupo de Origen
                                    </td>
                                    <td>
                                        <asp:Label ID="lblGrupoOrigen" runat="server" CssClass="lbl"></asp:Label>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
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
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="5" style="text-align:right;">
                    <asp:Label ID="lblMensajeVerificacion" runat="server" Font-Size="14px" ForeColor="Red"></asp:Label>
                    <div id="btnEquiSol" runat="server" class="k-button" style="width:150px;">
                        <asp:Image ID="Image5" runat="server" Style="width: 14px; vertical-align:bottom;" 
                            ImageUrl="~/Common/Images/Solicitudes/VerDetalle.png" />
                        Equipo Solicitado
                    </div>
                    <div id="btnAtras" runat="server" class="k-button" style="width:100px; height: 26px;    ">
                        <asp:Image ID="Image2" runat="server" Style="width: 14px; vertical-align:bottom;" 
                            ImageUrl="~/Common/Images/Solicitudes/arrow_left.png" />
                        Atras
                    </div>
                    <div id="btnSiguiente" runat="server" class="k-button" style="width:100px;">
                        Siguiente
                        <asp:Image ID="Image3" runat="server" Style="width: 14px; vertical-align: bottom;" 
                            ImageUrl="~/Common/Images/Solicitudes/arrow_right.png" />
                    </div>
                    <div id="btnFinalizar" runat="server" class="k-button" style="width:100px;">
                        <asp:Image ID="Image4" runat="server" Style="width: 14px; vertical-align: bottom;" 
                            ImageUrl="~/Common/Images/Solicitudes/save.ico" />
                        Finalizar
                    </div>
                </td>
            </tr>
        </table>
    </div>
    
    <div id="divServicios1" style="display:none;">
        <table style="width:100%;"><tr><td style="width:444px;">
        <table>
            <tr>
                <td style="width:120px; height:30px;">
                    Linea Seleccionada:
                </td>
                <td>
                    <asp:Label ID="lblLineaSel" runat="server"></asp:Label>
                </td>
            </tr>
            <tr id="trServicioSeleccionado" runat="server">
                <td>
                    Servicio seleccionado
                </td>
                <td>
                    <asp:Label ID="lblServSeleccionado" runat="server"></asp:Label>
                </td>
            </tr>
            <%--<tr>
                <td>Modelo de Dispositivo: </td><td><asp:Label ID="lblModDispSel" runat="server"></asp:Label></td>
            </tr>--%>
            <tr id="trTipoServicio" runat="server">
                <td style="height:30px;">
                    <asp:Label ID="Label1" runat="server">Tipo Servicio</asp:Label>
                </td>
                <td>
                    <asp:DropDownList ID="ddlTipoServicio" runat="server" Width="200px"></asp:DropDownList>
                </td>
            </tr>
            <tr id="trServicio" runat="server">
                <td>
                    <asp:Label ID="lblNuevoServicio" runat="server">Servicio</asp:Label>
                </td>
                <td>
                    <asp:DropDownList ID="ddlServicio" runat="server" Width="200px"></asp:DropDownList>
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
                    <asp:Label ID="lblValorCatnidad" runat="server" ></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtCatnidadSolicitada" runat="server" MaxLength="10"></asp:TextBox>
                </td>
            </tr>
            <tr id="trMotivo">
                <td>Motivo</td> 
                <td><asp:TextBox ID="txtMotivoActivacion" runat="server" Width="290px" TextMode="MultiLine" Rows="4" 
                    Height="66px" style="resize: none;" MaxLength="144"></asp:TextBox>
                </td>
            </tr>
            <tr id="trTiempo">
                <td>Tiempo Solicitado</td>
                <td>
                    <asp:RadioButton ID="rbtTemporal" GroupName="gnTiempo" Text="Temporal" runat="server"/>
                    <asp:RadioButton ID="rbtPermanente" GroupName="gnTiempo" Text="Permanente" runat="server"/>
                </td>
            </tr>
            <tr id="trFechaInicial">
                <td>Fecha Inicial</td>
                <td><asp:TextBox ID="txtFechaInicial" runat="server" CssClass="txtFecha"></asp:TextBox>
                </td>
            </tr>
            <tr id="trFechaFinal">
                <td>Fecha Final</td>
                <td><asp:TextBox ID="txtFechaFinal" runat="server" CssClass="txtFecha"></asp:TextBox>
                </td>
            </tr>
        </table>
        </td>
        <td align="right" valign="top">
            <div><h3><asp:Label ID="lblTituloGrillaServ" runat="server"></asp:Label></h3></div>
            <div id="tbServActuales" runat="server" style="width:400px;"></div>
        </td></tr></table>
    </div>
    <div id="divCodiciones" style="display:none;">
        <table>
            <tr>
                <td>
                    <h3>Codiciones de Solicitud de Dispositivo</h3>
                    <asp:TextBox ID="txtCondiciones" runat="server" TextMode="MultiLine" ReadOnly="true" 
                        Width="500px" Height="320px" style="resize: none;"></asp:TextBox>
                </td>
            </tr>
        </table>
    </div>
    <div id="divDispSolicitado" runat="server" style="display:none; padding:0;">
        <iframe id="ifEquipoSolic" height="280px" width="500px" frameborder="0"></iframe>
    </div>
    <div id="divPlanes1" style="display:none;">
    
    </div>
    <div id="divSeleccionEmpleado" runat="server" style="display:none;">
        <iframe id="ifSeleccionEmpleado" frameborder="0" style="padding:0px; margin:0px;"
            width="525px" height="460px"></iframe>
    </div>
    <div id="MsgConfirmacionAvance" runat="server" style="display:none;">
        Ud. va a generar una Solicitud de Equipo sin Línea, ¿Desea continuar?
        <br /><br />
        Para generar una solicitud de Equipo con línea, seleccione el check "Solicitar Equipo con Línea".
    </div>
    </form>
</body>
</html>
