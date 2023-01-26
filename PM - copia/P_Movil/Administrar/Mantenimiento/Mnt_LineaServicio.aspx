<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Mnt_LineaServicio" Codebehind="Mnt_LineaServicio.aspx.vb" %>

<%@ Register src="../../../Common/Controles/ToolTipGenerico.ascx" tagname="ToolTipGenerico" tagprefix="ttgInfo" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register src="../../../Common/Controles/BusquedaPrincipal.ascx" tagname="BusquedaPrincipal" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
    <%--***Inicio*** Agregado por RRAMOS --%>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqueryui/jquery.ui.autocomplete.js" type="text/javascript"></script>    
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.accordion.js"></script><%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/jqGrid/ui.jqgrid.css" /><%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script><%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script><%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <%--***Fin***  Agregado por RRAMOS--%>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
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
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/date.js" type="text/javascript"></script>    
    <script src="../../../Common/Scripts/jquery.cookie.js" type="text/javascript"></script>
    <script src="Mnt_LineaServicio.js" type="text/javascript"></script>    
</head>
<body style="margin-left: 0px;margin-right: 0px;">
    <form id="form1" runat="server">
    <div>
    <asp:HiddenField ID="hdfAsigCred" runat="server" />
    <asp:HiddenField ID="hdfLinea" runat="server" />
    <asp:HiddenField ID="hdfCodCuenta" runat="server" />
    <asp:HiddenField ID="hdfAccion" runat="server" />
    <asp:HiddenField ID="hdfServicio" runat="server" />
    <asp:HiddenField ID="hdfMonTotCta" runat="server" />
    <asp:HiddenField ID="hdfCanTotCta" runat="server" />
    <asp:HiddenField ID="hdfTipo" runat="server" />
    <asp:HiddenField ID="hdfSituacion" runat="server" />
    <asp:HiddenField ID="hdfinCodSol" runat="server" />
    <br />
    <div style="height:10px"></div>
        <%--    <div id="dvContAcordeon">
            <cc1:AccordionJQ ID="AccordionJQ1" runat="server" CssClass="accordion">
                <cc1:ContenedorAccodion ID="AcordionServicios"  Texto="Servicios Adicionales">
                    <div id="dvAsignacion" runat="server" style="display:none;">                          
                            <table>
                                <tr>
                                    <td>
                                        <table id="tblServicio">
                                        </table>
                                    </td>
                                    <td>
                                        <table>
                                            <tr id="trInformacionServicios" runat="server" >
                                                <td align="left">
                                                    <ttgInfo:ToolTipGenerico ID="ttgInfoServicios" runat="server" Mensaje="Los servicios de esta líneas no estan siendo considerados en el total de la bolsa" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div id="btnAgregarServicio" class="btnNormal" style="width:110px;">
                                                        <asp:Image ID="imgAgregarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"/>
                                                        <a>Agregar</a>
                                                    </div>                                                
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div id="btnModificarServicio" class="btnNormal" style="width:110px;">
                                                        <asp:Image ID="imgModificarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif"/>
                                                        <a>Modificar</a>
                                                    </div>                                                
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div id="btnEliminarServicio" class="btnNormal" style="width:110px;">
                                                        <asp:Image ID="imgEliminarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png"/>
                                                        <a>Quitar</a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                </cc1:ContenedorAccodion>
            </cc1:AccordionJQ>
    </div><br />
--%>
        <div id="dvAsignacion" runat="server" style="display:none;">                          
                <table>
                    <tr>
                        <td>
                            <table id="tblServicio">
                            </table>
                        </td>
                        <td>
                            <table>
                                <tr id="trInformacionServicios" runat="server" >
                                    <td align="left">
                                        <ttgInfo:ToolTipGenerico ID="ttgInfoServicios" runat="server" Mensaje="Los servicios de esta líneas no estan siendo considerados en el total de la bolsa" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id="btnAgregarServicio" class="btnNormal" style="width:110px;">
                                            <asp:Image ID="imgAgregarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"/>
                                            <asp:Label ID="LblTituloAgregar" runat="server" Text="" style="font-weight: bold;"></asp:Label><%--<a>Agregar</a>--%>
                                        </div>                                                
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id="btnModificarServicio" class="btnNormal" style="width:110px;">
                                            <asp:Image ID="imgModificarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif"/>
                                            <asp:Label ID="LblTituloEditar" runat="server" Text="" style="font-weight: bold;"></asp:Label><%--<a>Modificar</a>--%>
                                        </div>                                                
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id="btnEliminarServicio" class="btnNormal" style="width:110px;">
                                            <asp:Image ID="imgEliminarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png"/>
                                            <asp:Label ID="LblTituloQuitar" runat="server" Text="" style="font-weight: bold;"></asp:Label><%--<a>Quitar</a>--%>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>

        <div id="divServicios" style="display:none;">
            <table>
                <tr class="trNuevo">
                    <td>
                        Sub Cuentas
                        <%--Tipo servicio:--%>
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlTipoServicio" runat="server" Width="200px"></asp:DropDownList>
                        <asp:Label ID="LblTipoServicio" runat="server" Text="" Style="display: none;" ></asp:Label>
                    </td>
                </tr>
                <tr class="trNuevo">
                    <td>
                        Servicio:
                    </td>
                    <td>
                        <asp:DropDownList ID="ddlServicio" runat="server" Width="200px"></asp:DropDownList>
                        <asp:Label ID="LblCanTotalMinutosXBolsa" runat="server" Text="" Font-Bold="true"></asp:Label>
                    </td>
                </tr>
                <tr id="CantAsig" style="display:none;">
                  <td>                  
                  </td>
                  <td>
                    <asp:Label ID="LblTextoServicio" runat="server" Text="" Font-Bold="true"></asp:Label>
                    <asp:Label ID="LblCantAsignada" runat="server" Text="" Font-Bold="true"></asp:Label>
                    <asp:Label ID="LblCantidad" runat="server" Text="" Font-Bold="true" style="display:none;"></asp:Label>
                  </td>
                </tr>
                <tr class="trEditar" style="display:none;">
                    <td>
                        Servicio:
                    </td>
                    <td>
                        <asp:Label ID="lblServicio" runat="server" Text=""></asp:Label>
                    </td>
                </tr>
                <tr id="trIlimitado">
                    <td>
                        Servicio ilimitado:
                    </td>
                    <td>
                        <asp:CheckBox ID="chkServicioIlimitado" runat="server" Enabled="false"/>
                    </td>
                </tr>
                <tr id="trCantidad">
                    <td>
                        <asp:Label ID="LblTextoTipSer" runat="server" Text="Cantidad/Minutos:"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtCantidadServicio" runat="server" MaxLength="7" z-index="-10000000"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trTipoAsignacion">
                    <td><asp:Label ID="LblTipoAsignacion" runat="server" Text="" Font-Bold="true"></asp:Label></td>
                    <td>
                        <asp:CheckBox ID="chkTipoAsignacion" runat="server"/>&nbsp;&nbsp;
                        <asp:TextBox ID="txtMontoAsignado" runat="server" MaxLength="7" z-index="-10000000"  Width="100"></asp:TextBox>
                    </td>               
                </tr>
<%--                <tr id="trMontoServicio">
                    <td>
                        <asp:Label ID="LblMontoAsignacdo" runat="server" Text="Monto Asignado:"></asp:Label>
                    </td>
                    <td>
                        
                    </td>
                </tr>--%>
            </table>
            <br />
            <div style="text-align:right;">
                <div id="btnGuardarServicio" class="btnNormal">
                    <asp:Image ID="imgGuardarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"/>
                    <a>Agregar</a>
                </div>
                <div id="btnCerrarServicio" class="btnNormal">
                    <asp:Image ID="imgCerrarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                    <a>Cerrar</a>
                </div>
            </div>                        
        </div>    
    </div>
    </form>
</body>
</html>
