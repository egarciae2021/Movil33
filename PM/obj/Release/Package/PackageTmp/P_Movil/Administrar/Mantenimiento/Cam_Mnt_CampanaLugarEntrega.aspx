<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Cam_Mnt_CampanaLugarEntrega" Codebehind="Cam_Mnt_CampanaLugarEntrega.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/jqGrid/ui.jqgrid.css" />
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" />
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/KendoUI/kendo.common.min.css" />
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" />

    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
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
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Cam_Mnt_CampanaLugarEntrega.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfIdCampana" runat="server" />
<%--        <div class="ui-widget-content ui-corner-all" style="padding:0px; margin:0px; background-image:none; overflow: auto;">--%>
            <table border="0">
                <tr>
                    <td style="width:60px">
                        <asp:Label ID="lblFiltro" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
                    </td> 
                    <td rowspan="2" valign="middle" style="width:200px">
                        En:&nbsp;
                        <asp:DropDownList ID="ddlBusqueda" runat="server" style="margin-left:15px; font-weight:normal;" Width="150px">
                            <asp:ListItem Value="1">Oficina</asp:ListItem>
                            <asp:ListItem Value="2">Dirección</asp:ListItem>
                            <asp:ListItem Value="3">Distribuidora</asp:ListItem>
                        </asp:DropDownList>
                    </td>
                    <td rowspan="2" valign="middle" style="width:400px">
                        Filtrar:&nbsp;
                        <asp:TextBox ID="txtOficina" runat="server" Width="300px"></asp:TextBox>
                        <asp:DropDownList ID="ddlCampana" runat="server" style="margin-left:15px; font-weight:normal;" Width="400px">
                        </asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                </tr>
            </table>
<%--        <br />--%>
        <%--<div id="dvCampo" class="dvPanel"  style="overflow: auto;">--%>
            <table cellpadding="0" cellspacing="0">
                <tr>
                    <td>
                        <table id="tblLugarEntrega"></table>
                        <div id="pagerLugarEntrega"></div>
                    </td>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <div id="btnAgregarLugarEntrega" class="btnNormal" runat="server" style="width:100px;">                        
                                        <asp:Image ID="imgAgregarLugarEntrega" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                        <a>Agregar</a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>                    
                                    <div id="btnEditarLugarEntrega" class="btnNormal" runat="server" style="width:100px;">
                                        <asp:Image ID="imgEditarLugarEntrega" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                        <a>Editar</a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div id="btnQuitarLugarEntrega" class="btnNormal" runat="server" style="width:100px;">
                                        <asp:Image ID="imgQuitarLugarEntrega" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                        <a>Quitar</a>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
<%--        </div>--%>
        <%--</div>--%>
        <%--<br />--%>
        <div id="dvEleccionLugarEntrega" style="display: none; resizable: false;">
<%--            <div class="dvPanel">
               <b>Seleccionar Oficina</b>
            </div>--%>
            <div class="dvPanel" style="margin-bottom:3px;">
              <table id="tblEleccionLugarEntrega"></table>
              <div id="pager"></div>
            </div>
            <div id="dvEdicionLugarEntrega" style="margin-bottom:3px;">
                <div class="dvPanel">
                    <table cellpadding="0" cellspacing="0" style="padding-left: 75px; width: 90%">
                        <tr style="margin-bottom:10px;">
                            <td colspan="4" style="text-align: center; font-weight:bold; font-size:x-small;">
                              Ingresar Datos de Lugar de Entrega
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblPersonaContactoCab" runat="server" Text="Persona Contacto:"></asp:Label>
                            </td>
                            <td colspan="3">
                                <asp:TextBox ID="txtPersonaContacto" runat="server" Width="470px" MaxLength="200"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="lblTelefonoContactoCab" runat="server" Text="Teléfono Contacto:"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtTelefonoContacto" runat="server" Width="110px" style="text-align: right;" MaxLength="50"></asp:TextBox>
                            </td>
                            <td>
                                <asp:Label ID="lblRepartoDirectoCab" runat="server" Text="Reparto Directo:"></asp:Label>
                            </td>
                            <td>
                                <input id="chkRepartoDirecto" type="checkbox" />
                            </td>
                        </tr>
                        <tr id="trOficina" style="display:none;">
                            <td>
                                <asp:Label ID="lblOficinaDistribuidora" runat="server" Text="Oficina Distribuidora:"></asp:Label>
                            </td>
                            <td>
                                <asp:DropDownList ID="ddlOficinaDistribuidora" runat="server" Width="200px"></asp:DropDownList>
                            </td>

                            <td>
                                <asp:Label ID="lblTipoEnvioCab" runat="server" Text="Tipo Envío:"></asp:Label>
                            </td>
                            <td>
                                <asp:DropDownList ID="ddlTipoEnvio" runat="server" Width="125px">
                                    <asp:ListItem Value="-1" Selected="True">Seleccione....</asp:ListItem>
                                    <asp:ListItem Value="L" >Local</asp:ListItem>
                                    <asp:ListItem Value="R" >Remoto</asp:ListItem>
                                </asp:DropDownList>
                            </td>
                        </tr>
                        <tr style="display:none;">
                            <td>
                                <asp:Label ID="lblFechaRecojoIni" runat="server" Text="Fecha Inicio de Recojo :"></asp:Label>
                            </td>
                            <td class="">
                                <asp:TextBox ID="txtFechaInicio" runat="server" CssClass="DATE" Width="100px" Text="01/12/2013"></asp:TextBox>
                            </td>
                            <td>
                                <asp:Label ID="lblFechaRecojoFin" runat="server" Text="Fecha Final de Recojo :"></asp:Label>
                            </td>
                            <td class="">
                                <asp:TextBox ID="txtFechaFin" runat="server" CssClass="DATE" Width="100px" Text="01/12/2013"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="display:none;">
                                <asp:Label ID="lblCapacidadAtencion" runat="server" Text="Capacidad de Atención :"></asp:Label>
                            </td>
                            <td style="display:none;">
                                <asp:TextBox ID="txtCapacidad" runat="server" Width="100px" style="text-align: right;" MaxLength="6"></asp:TextBox>
                            </td>
                            <td style="display:none;">
                                <asp:Label ID="lblHorarioCab" runat="server" Text="Horario:"></asp:Label>
                            </td>
                            <td style="display:none;">
                                <asp:TextBox ID="txtHorario" runat="server" Width="190px" MaxLength="100"></asp:TextBox>
                            </td>
                        </tr>
                    </table>
                        
                </div>            
            </div>
            <div id="btnAgregarSeleccion" class="btnNormal" runat="server">
                <asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
            <div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Salir</a>
            </div>
        </div>
        <div id="divEdicionLugarE" style="display: none;">
          <div class="dvPanel">
             <table>
                <tr>
                    <td>
                        <asp:Label ID="lblOficinaCab" runat="server" Text="Oficina:"></asp:Label>
                    </td>
                    <td colspan="3">
                        <asp:Label ID="lblOficina" runat="server" Text="" Font-Bold="true"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblPersonaContactoE" runat="server" Text="Persona Contacto:"></asp:Label>
                    </td>
                    <td colspan="3">
                        <asp:TextBox ID="txtPersonaContactoE" runat="server" Width="455px" MaxLength="200"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblHorarioE" runat="server" Text="Horario:"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtHorarioE" runat="server" Width="190px" MaxLength="100"></asp:TextBox>
                    </td>
                    <td>
                        <asp:Label ID="lblTelefonoContactoE" runat="server" Text="Teléfono Contacto:"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtTelefonoContactoE" runat="server" Width="130px" style="text-align: right;" MaxLength="25"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblOficinaDistribuidoraE" runat="server" Text="Oficina Distribuidora:"></asp:Label>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlOficinaDistribuidoraE" runat="server" Width="200px"></asp:DropDownList>
                    </td>
                    <td>
                        <asp:Label ID="lblTipoEnvioE" runat="server" Text="Tipo Envío:"></asp:Label>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlTipoEnvioE" runat="server" Width="140px">
                            <asp:ListItem Value="-1" Selected="True">Seleccione....</asp:ListItem>
                            <asp:ListItem Value="L" >Local</asp:ListItem>
                            <asp:ListItem Value="R" >Remoto</asp:ListItem>
                        </asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="FechaInicioE" runat="server" Text="Fecha Inicio de Recojo :"></asp:Label>
                    </td>
                    <td class="">
                        <asp:TextBox ID="txtFechaInicioE" runat="server" CssClass="DATE" Width="100px" Text="" MaxLength="10"></asp:TextBox>
                    </td>
                    <td>
                        <asp:Label ID="lblFechaFinE" runat="server" Text="Fecha Final de Recojo :"></asp:Label>
                    </td>
                    <td class="">
                        <asp:TextBox ID="txtFechaFinE" runat="server" CssClass="DATE" Width="100px" Text="" MaxLength="10"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblCapacidadE" runat="server" Text="Capacidad de Atención :"></asp:Label>
                    </td>
                    <td class="">
                        <asp:TextBox ID="txtCapacidadE" runat="server" Width="100px" style="text-align: right;" MaxLength="6"></asp:TextBox>
                    </td>
                    <td>
                        <asp:Label ID="lblRepartoDirectoE" runat="server" Text="Reparto Directo:"></asp:Label>
                    </td>
                    <td>
                        <input id="chkRepartoDirectoE" type="checkbox" />      
                    </td>
                </tr>
            </table>
          </div><br />
          <div class="dvPanel"> 
            <div id="btnAceptarEdicionLugarEntrega" class="btnNormal" runat="server">
                <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
            <div id="btnCerrarEdicion" class="btnNormal">
                <asp:Image ID="Image4" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Salir</a>
            </div>
          </div>
        <div id="divMsgConfirmacionAhora" style="display: none;">
            <table width="100%">
                <tr>
                    <td colspan="2">
                        <span class="ui-icon ui-icon-alert" style="float:left;"></span>
                        Las siguientes oficinas <b><span id="lblMsg2"></span></b> ya se encuentran registradas.
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <span class="ui-icon ui-icon-help" style="float:left;"></span>
                        ¿Desea reemplazar los Datos de las siguientes Oficinas <b><span id="lblMsg1"></span></b> ?
                    </td>
                </tr>
            </table>
        </div>
        <div id="divMsgConfirmacionLugarEnt" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            <%--¡Al ser quitado, este grupo empleado no tendrá acceso para realizar solicitudes!, ¿Desea continuar?--%>
            Se quitara este lugar de entrega de la actual campaña(Tendra que guardar para mantener los cambios de forma permanente). ¿Desea continuar?
        </div>

        </div>
    </form>
</body>
</html>
